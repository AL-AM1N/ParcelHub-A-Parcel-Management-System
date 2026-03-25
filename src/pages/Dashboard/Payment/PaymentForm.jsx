import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useTrackingLogger from "../../../hooks/useTrackingLogger";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  //console.log(parcelId)
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { logTracking } = useTrackingLogger();

  const [error, setError] = useState("");

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  console.log(parcelInfo);
  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    // step-1: validate the card
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setError(error.message);
    } else {
      setError("");
      //console.log("payment method", paymentMethod);

      // step-2: create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents: amountInCents,
        parcelId,
      });

      //console.log('res from intent', res);

      const clientSecret = res.data.clientSecret;

      // step-3: confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment Success ✅");

          //IMPORTANT: save payment in DB
          console.log(result);

          const paymentData = {
            parcelId,
            email: user.email,
            amount,
            transactionId: result.paymentIntent.id,
            paymentMethod: result.paymentIntent.payment_method_types,
          };

          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.success) {
            console.log("payment successfully");

            Swal.fire({
              icon: "success",
              title: "Payment Successful 🎉",
              html: `
      <p>Your payment has been completed successfully.</p>
      <p><strong>Transaction ID:</strong> ${result.paymentIntent.id}</p>
    `,
              confirmButtonText: "Go to My Parcels",
            }).then(async (result) => {
              if (result.isConfirmed) {

                await logTracking({
                  tracking_id: parcelInfo.tracking_id,
                  status: "payment_done",
                  details: `Paid by ${user.displayName}`,
                  updated_by: user.email,
                });
                
                navigate("/dashboard/myParcels");
              }
            });
          }
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <CardElement className="p-2 border rouded"></CardElement>
      <button
        className="btn btn-primary w-full text-black"
        type="submit"
        disabled={!stripe}
      >
        Pay ${amount}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentForm;
