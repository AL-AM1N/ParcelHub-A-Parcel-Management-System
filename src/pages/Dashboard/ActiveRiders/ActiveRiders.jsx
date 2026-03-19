import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ActiveRider = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // fetch active riders
  const { data: riders = [], refetch, isLoading } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // deactivate rider
  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/riders/${id}/status`, {
        status: "rejected",
      });

      refetch();

      Swal.fire("Success", "Rider deactivated", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to deactivate rider", "error");
    }
  };

  // filter riders by name
  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name..."
        className="input input-bordered w-full max-w-xs mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Bike</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRiders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>
                  {rider.bikeBrand} ({rider.bikeNumber})
                </td>

                <td>
                  <button
                    onClick={() => handleDeactivate(rider._id)}
                    className="btn btn-error btn-sm"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRiders.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No riders found
        </p>
      )}
    </div>
  );
};

export default ActiveRider;