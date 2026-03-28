import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  FaTruck,
  FaCheckCircle,
  FaUserCheck,
} from "react-icons/fa";

const RiderDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // assigned + in transit
  const { data: activeParcels = [] } = useQuery({
    queryKey: ["rider-active", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/parcels?email=${user.email}`
      );
      return res.data;
    },
  });

  // completed
  const { data: completedParcels = [] } = useQuery({
    queryKey: ["rider-completed", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed-parcels?email=${user.email}`
      );
      return res.data;
    },
  });

  const assigned = activeParcels.filter(
    (p) => p.delivery_status === "rider_assigned"
  ).length;

  const inTransit = activeParcels.filter(
    (p) => p.delivery_status === "in_transit"
  ).length;

  const completed = completedParcels.length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        🚚 Rider Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Assigned */}
        <div className="card bg-purple-100 text-purple-600">
          <div className="card-body flex flex-row items-center gap-4">
            <FaUserCheck size={24} />
            <div>
              <p>Assigned</p>
              <h2 className="text-2xl font-bold">
                {assigned}
              </h2>
            </div>
          </div>
        </div>

        {/* In Transit */}
        <div className="card bg-blue-100 text-blue-600">
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

        {/* Completed */}
        <div className="card bg-green-100 text-green-600">
          <div className="card-body flex flex-row items-center gap-4">
            <FaCheckCircle size={24} />
            <div>
              <p>Completed</p>
              <h2 className="text-2xl font-bold">
                {completed}
              </h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RiderDashboard;