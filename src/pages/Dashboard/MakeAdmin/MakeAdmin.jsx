import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // search user
  const handleSearch = async () => {
    if (!search) return;

    setLoading(true);
    try {
      const res = await axiosSecure.get(`/users/search?email=${search}`);
      setUsers(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to search users", "error");
    }
    setLoading(false);
  };

  // update role
  const handleRoleChange = async (user, newRole) => {
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `Make this user ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${user._id}/role`, {
        role: newRole,
      });

      Swal.fire("Success", `User is now ${newRole}`, "success");

      // update UI instantly
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, role: newRole } : u
        )
      );
    } catch (error) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Make Admin</h2>

      {/* Search Box */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by email or name..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch} className="btn btn-primary text-black">
          Search
        </button>
      </div>

      {loading && <span className="loading loading-bars loading-xl"></span>}

      {/* Table */}
      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-success"
                          : "badge-ghost"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td>
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() =>
                          handleRoleChange(user, "user")
                        }
                        className="btn btn-warning btn-sm"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleRoleChange(user, "admin")
                        }
                        className="btn btn-success btn-sm"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {users.length === 0 && !loading && (
        <p className="text-gray-500">No users found</p>
      )}
    </div>
  );
};

export default MakeAdmin;