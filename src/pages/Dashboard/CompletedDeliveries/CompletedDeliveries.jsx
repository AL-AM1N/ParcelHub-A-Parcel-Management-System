import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;
  const queryClient = useQueryClient();

  // fetch completed deliveries
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

  // calculate earnings
  const calculateEarning = (parcel) => {
    const cost = Number(parcel.cost);

    if (parcel.senderCenter === parcel.receiverCenter) {
      return cost * 0.8;
    } else {
      return cost * 0.3;
    }
  };

  // total earning
  const totalEarning = parcels.reduce(
    (sum, parcel) => sum + calculateEarning(parcel),
    0
  );

  // mutation for cashout
  const cashoutMutation = useMutation({
    mutationFn: async (parcelId) => {
      const res = await axiosSecure.patch(
        `/parcels/${parcelId}/cashout`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "completed-deliveries",
        email,
      ]);
      Swal.fire("Success", "Cashout completed", "success");
    },
    onError: () => {
      Swal.fire("Error", "Cashout failed", "error");
    },
  });

  //handle cashout
  const handleCashout = (parcel) => {
    if (parcel.cashout_status === "cashed_out") {
      return Swal.fire("Already Cashed Out", "", "info");
    }

    const earning = calculateEarning(parcel);

    Swal.fire({
      title: "Cashout this delivery?",
      text: `You will receive $${earning.toFixed(2)}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Cashout",
    }).then((result) => {
      if (result.isConfirmed) {
        cashoutMutation.mutate(parcel._id);
      }
    });
  };

  if (isLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Completed Deliveries
      </h2>

      {/* Total Earnings */}
      {/* <p className="mb-4 text-lg font-semibold">
        Total Earnings:{" "}
        <span className="text-green-600">
          ${totalEarning.toFixed(2)}
        </span>
      </p> */}

      {/* 📦 Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Tracking ID</th>
              <th>Receiver</th>
              <th>Picked At</th>
              <th>Delivered At</th>
              <th>Fee</th>
              <th>Earning</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel) => {
              const earning = calculateEarning(parcel);

              return (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.receiverName}</td>

                  <td>
                    {parcel.picked_at
                      ? new Date(
                          parcel.picked_at
                        ).toLocaleString()
                      : "N/A"}
                  </td>

                  <td>
                    {parcel.delivered_at
                      ? new Date(
                          parcel.delivered_at
                        ).toLocaleString()
                      : "N/A"}
                  </td>

                  <td>${parcel.cost}</td>

                  <td className="font-bold text-green-600">
                    ${earning.toFixed(2)}
                  </td>

                  <td>
                    {parcel.cashout_status === "cashed_out" ? (
                      <span className="badge badge-success">
                        Cashed Out
                      </span>
                    ) : (
                      <span className="badge badge-warning">
                        Pending
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => handleCashout(parcel)}
                      disabled={
                        parcel.cashout_status === "cashed_out" ||
                        cashoutMutation.isLoading
                      }
                      className="btn btn-primary text-black  btn-sm"
                    >
                      {parcel.cashout_status === "cashed_out"
                        ? "Cashed Out"
                        : cashoutMutation.isLoading
                        ? "Processing..."
                        : "Cashout"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {parcels.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No completed deliveries yet
        </p>
      )}
    </div>
  );
};

export default CompletedDeliveries;