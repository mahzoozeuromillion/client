import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import ButtonGradient from "../assets/svg/ButtonGradient";

import Section from "../components/Section";
import api from "../services/api.interceptor";
import { useCart } from "../context/CartContext";

const stripePromise = loadStripe(
  "pk_test_51QdxrrBXLQ8mh6EAbVVNFcC5lW9qbqQWJdfR4VZBph7K13vz2nbrclhAnE0NSOpOgooJqBAUBQlQj0uF6rlAQJYZ00iiVS72g6"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.async = true;
    script.onload = () => console.log("Stripe.js loaded");
    script.onerror = () => console.error("Failed to load Stripe.js");
    document.body.appendChild(script);
  }, []);

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    console.log("error", error);

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };
  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className=" mx-auto p-6 bg-navy-800 border border-navy-700 rounded-xl shadow-2xl"
    >
      {/* Wrap PaymentElement in a styled container */}
      <div className="mb-8 bg-navy-700 rounded-lg ">
        <PaymentElement
          id="payment-element"
          className="w-full"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#fff",
                "::placeholder": {
                  color: "#94a3b8",
                },
              },
              invalid: {
                color: "#ef4444",
              },
            },
          }}
        />
      </div>

      <button
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-4 rounded-xl text-lg font-bold transition-all duration-200
                        bg-gradient-to-r from-yellow-200 to-yellow-100 
                        text-gray-900 hover:opacity-90 
                         disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:from-red-500 disabled:hover:to-red-600
                         flex items-center justify-center"
      >
        {/* PROCEED TO CHECKOUT
      </button> */}
        {/* <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white 
    py-4 px-6 rounded-lg font-medium text-base
    hover:from-red-600 hover:to-red-700 
    transition-all duration-200 
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:from-red-500 disabled:hover:to-red-600
    flex items-center justify-center"
      > */}
        <span id="button-text" className="flex items-center gap-3">
          {isProcessing ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Processing payment...</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Secure Payment</span>
            </>
          )}
        </span>
      </button>

      {message && (
        <div
          id="payment-message"
          className="mt-6 p-4 rounded-lg text-sm border

        flex items-center gap-2"
        >
          <svg
            className="w-5 h-5 text-red-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{message}</span>
        </div>
      )}
    </form>
  );
};

const Checkout = () => {
  const { items } = useCart();

  const [clientSecret, setClientSecret] = useState("");
  const [drawId, setDrawId] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch active draw ID
  const fetchDrawId = async () => {
    try {
      const response = await api.get("/draw/active-draw");
      setDrawId(response?.data?.result?._id || "");
    } catch (err) {
      console.error("Error fetching draw ID:", err);
    }
  };

  // Make payment intent when drawId is available
  const makePaymentIntent = async () => {
    if (!drawId) return; // Avoid making the request if drawId is not available
    try {
      setLoading(true);
      let numbers = [];

      items?.map((item) => {
        numbers.push(item.numbers);
      });

      const payload = {
        numberSets: numbers,
        drawId,
      };

      const response = await api.post("/purchaseTicket", payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(
        "Payment intent response:",
        response?.data?.paymentIntent?.clientSecret
      );
      setClientSecret(response?.data?.paymentIntent?.clientSecret || "");
    } catch (err) {
      console.error("Error creating payment intent:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial draw ID fetch
  useEffect(() => {
    fetchDrawId();
  }, []);

  // Trigger payment intent creation when drawId updates
  useEffect(() => {
    makePaymentIntent();
  }, [drawId]);

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Section
          className="pt-[6rem] -mt-[5.25rem]"
          crosses
          crossesOffset="lg:translate-y-[5.25rem]"
          customPaddings
          id="hero"
        >
          <div className="container min-h-screen px-4 mx-auto">
            <div className="max-w-2xl mx-auto mt-12 mb-2 flex justify-center  flex-col">
              <h1 className="text-3xl font-bold text-white mb-8 text-center">
                Secure Checkout
              </h1>
              {loading ? (
                <div className="flex items-center justify-center gap-3 text-gray-400">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Preparing checkout...</span>
                </div>
              ) : clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <div className="text-center p-6 bg-navy-800 rounded-lg border border-navy-700">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-400">
                    Unable to process payment at this time. Please try again
                    later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Section>
      </div>
      <ButtonGradient />
    </>
  );
};

export default Checkout;
