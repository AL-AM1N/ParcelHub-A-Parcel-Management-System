import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaTruck,
  FaCheckCircle,
  FaUserCheck,
  FaBoxOpen,
  FaShippingFast,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveryStatus = [], isLoading } = useQuery({
    queryKey: ["parcelStatusCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels/delivery/status-count"
      );
      return res.data;
    },
  });

  // ✅ normalize status
  const normalizeStatus = (status) => status.replace("-", "_");

  // ✅ UI config
  const statusConfig = {
    in_transit: {
      title: "In Transit",
      icon: <FaTruck size={24} />,
      color: "bg-blue-100 text-blue-600",
      chartColor: "#3b82f6",
    },
    delivered: {
      title: "Delivered",
      icon: <FaCheckCircle size={24} />,
      color: "bg-green-100 text-green-600",
      chartColor: "#22c55e",
    },
    rider_assigned: {
      title: "Rider Assigned",
      icon: <FaUserCheck size={24} />,
      color: "bg-purple-100 text-purple-600",
      chartColor: "#a855f7",
    },
    not_collected: {
      title: "Not Collected",
      icon: <FaBoxOpen size={24} />,
      color: "bg-yellow-100 text-yellow-600",
      chartColor: "#eab308",
    },
    default: {
      title: "Unknown",
      icon: <FaShippingFast size={24} />,
      color: "bg-gray-100 text-gray-600",
      chartColor: "#9ca3af",
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ✅ total count
  const total = deliveryStatus.reduce(
    (sum, item) => sum + item.count,
    0
  );

  // ✅ prepare chart data
  const chartData = deliveryStatus.map((item) => {
    const key = normalizeStatus(item.status);
    const config = statusConfig[key] || statusConfig.default;

    return {
      name: config.title,
      value: item.count,
      color: config.chartColor,
    };
  });

  return (
    <div className="p-6">
      {/* 🔥 Total */}
      <div className="mb-6">
        <div className="card bg-gradient-to-r from-teal-400 to-green-400 text-white shadow-lg">
          <div className="card-body">
            <h2 className="text-xl font-semibold">Total Parcels</h2>
            <p className="text-3xl font-bold">{total}</p>
          </div>
        </div>
      </div>

      {/* 🔹 Grid + Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* 📊 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {deliveryStatus.map((item, index) => {
            const key = normalizeStatus(item.status);
            const config =
              statusConfig[key] || statusConfig.default;

            return (
              <div
                key={index}
                className="card bg-base-100 shadow-md"
              >
                <div className="card-body flex flex-row items-center gap-4">
                  <div
                    className={`p-4 rounded-full ${config.color}`}
                  >
                    {config.icon}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {config.title}
                    </h3>
                    <p className="text-2xl font-bold">
                      {item.count}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🥧 Pie Chart */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="text-lg font-bold mb-4">
              Delivery Status Distribution
            </h2>

            <div className="w-full h-[300px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminStats;