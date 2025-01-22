// Assuming you are using React and the @stripe/react-stripe-js library

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm2 = ({ drawId, ticketPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return; // Stripe.js has not loaded yet

    const cardElement = elements.getElement(CardElement);

    // Create a Payment Method using the card details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[Error]", error);
      return;
    }

    // Send payment method ID to backend to create a payment intent and complete the payment
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/purchase-ticket",
        {
          drawId,
          numbers: [1, 2, 3, 4, 5], // Example numbers selected by the user
          paymentMethodId: paymentMethod.id,
        }
      );

      if (data.error_code) {
        console.log("Payment failed", data.error_message);
      } else {
        console.log("Payment succeeded", data);
      }
    } catch (err) {
      console.error("Payment request failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm2;
