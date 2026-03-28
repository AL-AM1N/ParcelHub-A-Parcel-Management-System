import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return <Loading></Loading>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>

      <table className="table table-zebra">
        {/* Table Head */}
        <thead>
          <tr className="bg-base-200 text-base font-semibold">
            <th>#</th>
            <th>Parcel ID</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Paid At</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              {/* Index */}
              <td>{index + 1}</td>

              {/* Parcel ID */}
              <td className="text-xs break-all">{payment.parcelId}</td>

              {/* Transaction ID */}
              <td className="text-xs break-all font-medium">
                {payment.transactionId}
              </td>

              {/* Amount */}
              <td className="font-semibold">৳{payment.amount}</td>

              {/* Payment Method */}
              <td>
                <span className="badge badge-info">
                  {payment.paymentMethod}
                </span>
              </td>

              {/* Paid At */}
              <td>{new Date(payment.paid_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
