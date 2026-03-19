import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  // fetch pending riders
  const { data: riders = [], refetch, isPending } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });
  
  if (isPending) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  // approve rider
  const handleDecision = async (id, action) => {

    const confirm = await Swal.fire({
        title:`${action === "approve" ? "approved" : "rejected"} Application?`,
        icon: "warning",
        showCancelButton:true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
    });

    if(!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/riders/${id}/status`, {
        status: action === "approve" ? "active" : "rejected",
      });
      refetch();
      Swal.fire("Success", `Rider ${action}d successfully`, "success");
    } catch (err) {
      Swal.fire("Error", "Could not update rider status", "error");
    }
  };

//   // cancel rider
//   const handleCancel = async (id) => {
//     try {
//       await axiosSecure.patch(`/riders/${id}`, {
//         status: "rejected",
//       });
//       refetch();
//     } catch (err) {
//       console.error(err);
//     }
//   };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Phone</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.phone}</td>
                <td>{new Date(rider.created_at).toLocaleDateString()}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleDecision(rider._id, "approve")}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleDecision(rider._id, "reject")}
                    className="btn btn-error btn-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="btn btn-info btn-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Rider Details</h3>

            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedRider.name}</p>
              <p><strong>Email:</strong> {selectedRider.email}</p>
              <p><strong>Phone:</strong> {selectedRider.phone}</p>
              <p><strong>Age:</strong> {selectedRider.age}</p>
              <p><strong>Region:</strong> {selectedRider.region}</p>
              <p><strong>District:</strong> {selectedRider.district}</p>
              <p><strong>NID:</strong> {selectedRider.nid}</p>
              <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
              <p><strong>Bike Number:</strong> {selectedRider.bikeNumber}</p>
              <p><strong>Additional Info:</strong> {selectedRider.additionalInfo}</p>
              <p><strong>Status:</strong> {selectedRider.status}</p>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setSelectedRider(null)}
                className="btn btn-outline"
              >
                Close
              </button>

              <button
                onClick={() => {
                  handleDecision(selectedRider._id, "approve");
                  setSelectedRider(null);
                }}
                className="btn btn-success"
              >
                Approve
              </button>

              <button
                onClick={() => {
                  handleDecision(selectedRider._id, "reject");
                  setSelectedRider(null);
                }}
                className="btn btn-error"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;