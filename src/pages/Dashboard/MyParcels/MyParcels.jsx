import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  console.log(parcels);

  const handleView = (parcel) => {
    console.log("Parcel details:", parcel);
  };

  const handlePay = (id) => {
    console.log("Proceed to payment:", id);
    navigate(`/dashboard/payment/${id}`);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Delete",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/parcels/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Parcel deleted successfully.", "success");
        refetch();
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* Table Head */}
        <thead>
          <tr className="bg-base-200 text-base font-semibold">
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              {/* Index */}
              <td>{index + 1}</td>

              {/* Title */}
              <td className="font-medium">{parcel.title}</td>

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

              {/* Created Date */}
              <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>

              {/* Cost */}
              <td>৳{parcel.cost}</td>

              {/* Payment Status */}
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>

              {/* Actions */}
              <td className="space-x-2">
                <button
                  onClick={() => handleView(parcel)}
                  className="btn btn-sm btn-outline btn-info"
                >
                  Details
                </button>

                {parcel.payment_status === "unpaid" && (
                  <button
                    onClick={() => handlePay(parcel._id)}
                    className="btn btn-sm btn-outline btn-success"
                  >
                    Pay
                  </button>
                )}

                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
