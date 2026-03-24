import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ parcelId, status }) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/status`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["riderParcels"]);
    },
  });

  const handleStatusUpdate = (parcelId, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Mark parcel as ${newStatus.replace("_", " ")}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ parcelId, status: newStatus })
          .then(() => {
            Swal.fire("Updated!", "Parcel status updated.", "success");
          })
          .catch(() => {
            Swal.fire("Error", "Failed to update status", "error");
          });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Pending Deliveries</h2>

      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200 text-base font-semibold">
            <th>#</th>
            <th>Tracking ID</th>
            <th>Title</th>
            <th>Receiver</th>
            <th>Address</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              {/* Index */}
              <td>{index + 1}</td>

              {/* Tracking */}
              <td className="font-mono text-sm">{parcel.tracking_id}</td>

              {/* Title */}
              <td>{parcel.title}</td>

              {/* Receiver */}
              <td>
                <div className="text-sm">
                  <p className="font-semibold">{parcel.receiverName}</p>
                  <p className="text-gray-500">{parcel.receiverContact}</p>
                </div>
              </td>

              {/* Address */}
              <td>{parcel.receiverAddress}</td>

              {/* Cost */}
              <td className="font-semibold">৳{parcel.cost}</td>

              {/* Status */}
              <td>
                <span
                  className={`badge ${
                    parcel.delivery_status === "rider_assigned"
                      ? "badge-warning"
                      : parcel.delivery_status === "in_transit"
                        ? "badge-info"
                        : "badge-success"
                  }`}
                >
                  {parcel.delivery_status}
                </span>
              </td>

              {/* Actions */}
              <td>
                {/* PICKUP */}
                {parcel.delivery_status === "rider_assigned" && (
                  <button
                    onClick={() => handleStatusUpdate(parcel._id, "in_transit")}
                    className="btn btn-sm btn-warning text-black"
                  >
                    Picked Up
                  </button>
                )}

                {/* DELIVER */}
                {parcel.delivery_status === "in_transit" && (
                  <button
                    onClick={() => handleStatusUpdate(parcel._id, "delivered")}
                    className="btn btn-sm btn-success"
                  >
                    Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty */}
      {parcels.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No pending deliveries</p>
      )}
    </div>
  );
};

export default PendingDeliveries;
