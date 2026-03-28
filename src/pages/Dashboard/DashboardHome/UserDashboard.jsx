import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaTruck,
} from "react-icons/fa";
import Loading from "../../../components/Loading";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["user-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  // stats
  const total = parcels.length;
  const delivered = parcels.filter(
    (p) => p.delivery_status === "delivered"
  ).length;

  const inTransit = parcels.filter(
    (p) => p.delivery_status === "in_transit"
  ).length;

  const pending = parcels.filter(
    (p) => p.delivery_status === "not_collected"
  ).length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        📦 My Dashboard
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        
        {/* Total */}
        <div className="card bg-blue-100 text-blue-600">
          <div className="card-body flex flex-row items-center gap-4">
            <FaBoxOpen size={24} />
            <div>
              <p>Total</p>
              <h2 className="text-2xl font-bold">{total}</h2>
            </div>
          </div>
        </div>

        {/* Delivered */}
        <div className="card bg-green-100 text-green-600">
          <div className="card-body flex flex-row items-center gap-4">
            <FaCheckCircle size={24} />
            <div>
              <p>Delivered</p>
              <h2 className="text-2xl font-bold">
                {delivered}
              </h2>
            </div>
          </div>
        </div>

        {/* In Transit */}
        <div className="card bg-yellow-100 text-yellow-600">
          <div className="card-body flex flex-row items-center gap-4">
            <FaTruck size={24} />
            <div>
              <p>In Transit</p>
              <h2 className="text-2xl font-bold">
                {inTransit}
              </h2>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="card bg-gray-100 text-gray-600">
          <div className="card-body flex flex-row items-center gap-4">
            <FaBoxOpen size={24} />
            <div>
              <p>Pending</p>
              <h2 className="text-2xl font-bold">
                {pending}
              </h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;