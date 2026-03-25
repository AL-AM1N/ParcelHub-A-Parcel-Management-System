import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  // fetch completed parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completed-deliveries", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed-parcels?email=${email}`
      );
      return res.data;
    },
  });

  // earning logic
  const calculateEarning = (parcel) => {
    const cost = Number(parcel.cost);
    return parcel.senderCenter === parcel.receiverCenter
      ? cost * 0.8
      : cost * 0.3;
  };

  // helper dates
  const now = new Date();
  const today = new Date().toDateString();

  const startOfWeek = new Date();
  startOfWeek.setDate(now.getDate() - now.getDay());

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const startOfYear = new Date(now.getFullYear(), 0, 1);

  // calculations
  let total = 0;
  let cashedOut = 0;
  let pending = 0;

  let todayEarning = 0;
  let weekEarning = 0;
  let monthEarning = 0;
  let yearEarning = 0;

  parcels.forEach((parcel) => {
    const earning = calculateEarning(parcel);
    const deliveredDate = new Date(parcel.delivered_at);

    total += earning;

    if (parcel.cashout_status === "cashed_out") {
      cashedOut += earning;
    } else {
      pending += earning;
    }

    // today
    if (deliveredDate.toDateString() === today) {
      todayEarning += earning;
    }

    // this week
    if (deliveredDate >= startOfWeek) {
      weekEarning += earning;
    }

    // this month
    if (deliveredDate >= startOfMonth) {
      monthEarning += earning;
    }

    // this year
    if (deliveredDate >= startOfYear) {
      yearEarning += earning;
    }
  });

  if (isLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">My Earnings</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded-xl">
          <h3 className="text-gray-500">Total Earnings</h3>
          <p className="text-xl font-bold text-green-600">
            ${total.toFixed(2)}
          </p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h3 className="text-gray-500">Cashed Out</h3>
          <p className="text-xl font-bold text-blue-600">
            ${cashedOut.toFixed(2)}
          </p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-xl font-bold text-orange-600">
            ${pending.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow p-4 rounded-xl">
          <h3 className="text-gray-500">Today</h3>
          <p className="font-bold">${todayEarning.toFixed(2)}</p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h3 className="text-gray-500">This Week</h3>
          <p className="font-bold">${weekEarning.toFixed(2)}</p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h3 className="text-gray-500">This Month</h3>
          <p className="font-bold">${monthEarning.toFixed(2)}</p>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h3 className="text-gray-500">This Year</h3>
          <p className="font-bold">${yearEarning.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default MyEarnings;