import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const {parcelId} = useParams();
  //console.log(parcelId)
  const axiosSecure = useAxiosSecure();

  const [error, setError] = useState('');

  const {isPending, data: parcelInfo = {}} = useQuery({
    queryKey:['parcels', parcelId],
    queryFn: async() => {
        const res = await axiosSecure.get(`/parcels/${parcelId}`);
        return res.data;
    }
  })

  if(isPending){
    return <span className="loading loading-bars loading-xl"></span>;
  }

  console.log(parcelInfo)
  const amount = parcelInfo.cost;

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement)

    if(card == null){
        return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card
    })

    if(error){
        console.log('error', error);
        setError(error.message);
    }
    else{
        setError('');
        console.log('payment method', paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
      <CardElement className="p-2 border rouded">
      </CardElement>
        <button className="btn btn-primary w-full text-black" type="submit" disabled={!stripe}>
          Pay ${amount}
        </button>
        {
            error && <p className="text-red-500">{error}</p>
        }
    </form>
  );
};

export default PaymentForm;
