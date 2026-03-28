import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ get user role from backend
  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8 text-center">

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user?.photoURL || "https://i.ibb.co.com/2kR5zqL/user.png"}
                alt={userInfo.role || "user"}
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-teal-900">
          {user?.displayName || "No Name"}
        </h2>

        {/* Email */}
        <p className="text-gray-500 mt-1">{user?.email}</p>

        {/* Role */}
        <div className="mt-4 ">
          <span className="badge badge-primary badge-lg capitalize text-black">
            {userInfo?.role || "user"}
          </span>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Extra Info (optional) */}
        <p className="text-sm text-gray-500">
          Welcome to your dashboard. Manage your parcels, track deliveries, and
          explore services easily.
        </p>
      </div>
    </div>
  );
};

export default Profile;