import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useTrackingLogger from "../../../hooks/useTrackingLogger";
import useAuth from "../../../hooks/useAuth";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [loadingRiders, setLoadingRiders] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null); // ⭐ FIXED
  const { logTracking } = useTrackingLogger();
  const {user} = useAuth();
  
  // ✅ Load parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableparcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?payment_status=paid&delivery_status=not_collected"
      );
      return res.data.sort(
        (a, b) => new Date(a.creation_date) - new Date(b.creation_date)
      );
    },
  });

  // ✅ Mutation (Assign Rider)
  const assignMutation = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
      setSelectedRider(rider);
      const res = await axiosSecure.patch(
        `/parcels/${parcelId}/assign`,
        {
          riderId: rider._id,
          riderName: rider.name,
          riderEmail: rider.email,
        }
      );
      return res.data;
    },

    onSuccess: async() => {
      Swal.fire("Success", "Rider assigned successfully!", "success");
      
      //track rider assign
      await logTracking({
                  tracking_id: selectedParcel.tracking_id,
                  status: "rider_assigned",
                  details: `Assigned to ${selectedRider.name}`,
                  updated_by: user.email,
                });

      document.getElementById("assignModal").close();

      // 🔄 Refetch parcels
      queryClient.invalidateQueries(["assignableparcels"]);

      // reset state
      setSelectedParcel(null);
      setSelectedRider(null);
    },

    onError: () => {
      Swal.fire("Error", "Failed to assign rider", "error");
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  // ✅ Open modal + load riders
  const openAssignModal = async (parcel) => {
    setSelectedParcel(parcel);
    setLoadingRiders(true);
    setRiders([]);
    setSelectedRider(null);

    try {
      const res = await axiosSecure.get("/riders/available", {
        params: {
          district: parcel.senderCenter,
        },
      });

      setRiders(res.data);
    } catch (error) {
      console.error("Error fetching riders", error);
      Swal.fire("Error", "Failed to load riders", "error");
    } finally {
      setLoadingRiders(false);
      document.getElementById("assignModal").showModal();
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Assign Rider</h2>

      {/* TABLE */}
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200 text-base font-semibold">
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Cost</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>

              <td>{parcel.title}</td>

              <td>
                <span
                  className={`badge ${
                    parcel.type === "document"
                      ? "badge-info"
                      : "badge-warning"
                  }`}
                >
                  {parcel.type}
                </span>
              </td>

              <td>
                <div className="text-sm">
                  <p className="font-semibold">{parcel.senderName}</p>
                  <p className="text-gray-500">{parcel.senderCenter}</p>
                </div>
              </td>

              <td>
                <div className="text-sm">
                  <p className="font-semibold">{parcel.receiverName}</p>
                  <p className="text-gray-500">{parcel.receiverCenter}</p>
                </div>
              </td>

              <td className="font-semibold">৳{parcel.cost}</td>

              <td>
                {new Date(parcel.creation_date).toLocaleDateString()}
              </td>

              <td>
                <span className="badge badge-warning">
                  Not Collected
                </span>
              </td>

              <td>
                <button
                  onClick={() => openAssignModal(parcel)}
                  className="btn btn-sm btn-outline btn-primary text-black"
                >
                  Assign Rider
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      <dialog id="assignModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Assign Rider</h3>

          {selectedParcel && (
            <>
              <p className="text-sm mb-2">
                <strong>Parcel:</strong> {selectedParcel.title}
              </p>

              <p className="text-sm mb-4">
                <strong>District:</strong> {selectedParcel.senderCenter}
              </p>

              {/* LOADING */}
              {loadingRiders ? (
                <div className="flex justify-center py-6">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <>
                  {/* SELECT RIDER */}
                  <select
                    className="select select-bordered w-full"
                    value={selectedRider?._id || ""}
                    onChange={(e) => {
                      const rider = riders.find(
                        (r) => r._id === e.target.value
                      );
                      setSelectedRider(rider); // ⭐ FULL OBJECT
                    }}
                  >
                    <option value="">Select Rider</option>

                    {riders.map((rider) => (
                      <option key={rider._id} value={rider._id}>
                        {rider.name} ({rider.phone})
                      </option>
                    ))}
                  </select>

                  {/* NO RIDER */}
                  {riders.length === 0 && (
                    <p className="text-red-500 text-sm mt-2">
                      No eligible riders found in this district
                    </p>
                  )}
                </>
              )}

              {/* ACTIONS */}
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>

                <button
                  disabled={!selectedRider || assignMutation.isLoading}
                  onClick={() =>
                    assignMutation.mutate({
                      parcelId: selectedParcel._id,
                      rider: selectedRider,
                    })
                  }
                  className="btn btn-success"
                >
                  {assignMutation.isLoading
                    ? "Assigning..."
                    : "Confirm Assign"}
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>

      {/* EMPTY */}
      {parcels.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No parcels available for rider assignment
        </p>
      )}
    </div>
  );
};

export default AssignRider;