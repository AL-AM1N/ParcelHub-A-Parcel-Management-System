import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [loadingRiders, setLoadingRiders] = useState(false);
  const [selectedRider, setSelectedRider] = useState("");

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableparcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?payment_status=paid&delivery_status=not_collected",
      );
      // sort oldest first
      return res.data.sort(
        (a, b) => new Date(a.creation_date) - new Date(b.creation_date),
      );
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  const openAssignModal = async (parcel) => {
    setSelectedParcel(parcel);
    setLoadingRiders(true);
    setRiders([]);

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

      <table className="table table-zebra">
        {/* Table Head */}
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
              {/* Index */}
              <td>{index + 1}</td>

              {/* Title */}
              <td>{parcel.title}</td>

              {/* Type */}
              <td>
                <span
                  className={`badge ${
                    parcel.type === "document" ? "badge-info" : "badge-warning"
                  }`}
                >
                  {parcel.type}
                </span>
              </td>

              {/* Sender */}
              <td>
                <div className="text-sm">
                  <p className="font-semibold">{parcel.senderName}</p>
                  <p className="text-gray-500">{parcel.senderCenter}</p>
                </div>
              </td>

              {/* Receiver */}
              <td>
                <div className="text-sm">
                  <p className="font-semibold">{parcel.receiverName}</p>
                  <p className="text-gray-500">{parcel.receiverCenter}</p>
                </div>
              </td>

              {/* Cost */}
              <td className="font-semibold">৳{parcel.cost}</td>

              {/* Created Date */}
              <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>

              {/* Status */}
              <td>
                <span className="badge badge-warning">Not Collected</span>
              </td>

              {/* Action */}
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

      {/* ASSIGN RIDER MODAL */}
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

              {/* 🔄 Loading */}
              {loadingRiders ? (
                <div className="flex justify-center py-6">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <>
                  {/* Rider Select */}
                  <select
                    className="select select-bordered w-full"
                    value={selectedRider}
                    onChange={(e) => setSelectedRider(e.target.value)}
                  >
                    <option value="">Select Rider</option>

                    {riders.map((rider) => (
                      <option key={rider._id} value={rider.email}>
                        {rider.name} ({rider.phone})
                      </option>
                    ))}
                  </select>

                  {/* No rider */}
                  {riders.length === 0 && (
                    <p className="text-red-500 text-sm mt-2">
                      No eligible riders found in this district
                    </p>
                  )}
                </>
              )}

              {/* Actions */}
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>

                <button
                  disabled={!selectedRider}
                  onClick={async () => {
                    try {
                      // ⭐ PATCH request (Assign rider)
                      await axiosSecure.patch(
                        `/parcels/${selectedParcel._id}/assign`,
                        {
                          rider_id: selectedRider._id,
                          rider_name: selectedRider.name,
                          rider_email: selectedRider.email,
                        },
                      );

                      Swal.fire(
                        "Success",
                        "Rider assigned successfully!",
                        "success",
                      );

                      document.getElementById("assignModal").close();
                    } catch (err) {
                      console.error(err);
                      Swal.fire("Error", "Failed to assign rider", "error");
                    }
                  }}
                  className="btn btn-success"
                >
                  Confirm Assign
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>

      {/* Empty State */}
      {parcels.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No parcels available for rider assignment
        </p>
      )}
    </div>
  );
};

export default AssignRider;
