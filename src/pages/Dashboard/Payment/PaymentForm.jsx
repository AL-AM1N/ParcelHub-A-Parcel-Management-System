import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState('');

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
          Pay for parcel pickup
        </button>
        {
            error && <p className="text-red-500">{error}</p>
        }
    </form>
  );
};

export default PaymentForm;
