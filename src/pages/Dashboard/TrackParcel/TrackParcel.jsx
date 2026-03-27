import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const statusSteps = [
  { key: "parcel_created", label: "Parcel Created" },
  { key: "payment_done", label: "Payment Completed" },
  { key: "rider_assigned", label: "Rider Assigned" },
  { key: "in_transit", label: "Picked Up" },
  { key: "delivered", label: "Delivered" },
];

const TrackParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // get only user's parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
         My Parcels Tracking
      </h2>

      <div className="space-y-4 max-h-175 overflow-y-auto pr-2">
        {parcels.length === 0 && (
          <p className="text-gray-500 text-center">
            No parcels found
          </p>
        )}

        {parcels.map((parcel) => {
          // tracking query INSIDE map
          const { data: trackingData = [] } = useQuery({
            queryKey: ["tracking", parcel.tracking_id],
            queryFn: async () => {
              const res = await axiosSecure.get(
                `/trackings/${parcel.tracking_id}`
              );
              return res.data;
            },
          });

          const isCompleted = (statusKey) =>
            trackingData.some((t) => t.status === statusKey);

          const getDetails = (statusKey) =>
            trackingData.find((t) => t.status === statusKey)?.details;

          return (
            <div
              key={parcel._id}
              className="collapse collapse-arrow bg-base-100 border border-base-300"
            >
              <input type="checkbox" />

              {/* HEADER */}
              <div className="collapse-title flex justify-between items-center">
                <div>
                  <p className="font-semibold">{parcel.title}</p>
                  <p className="text-xs text-gray-500">
                    {parcel.tracking_id}
                  </p>
                </div>

                <span className="badge badge-outline text-xs">
                  {parcel.delivery_status}
                </span>
              </div>

              {/* CONTENT */}
              <div className="collapse-content">
                <div className="text-sm mb-4">
                  <p>
                    <strong>From:</strong> {parcel.senderCenter}
                  </p>
                  <p>
                    <strong>To:</strong> {parcel.receiverCenter}
                  </p>
                </div>

                {/* Timeline */}
                <div className="relative border-l-2 border-gray-200 pl-6 space-y-6">
                  {statusSteps.map((step, i) => {
                    const completed = isCompleted(step.key);

                    return (
                      <div key={i} className="relative">
                        <span
                          className={`absolute -left-3 top-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                            completed
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {completed ? "✓" : ""}
                        </span>

                        <div className="pl-5">
                          <p
                            className={`font-medium ${
                              completed
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </p>

                          {completed && (
                            <p className="text-xs text-gray-500">
                              {getDetails(step.key)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackParcel;