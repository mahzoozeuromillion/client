import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ButtonGradient from "../assets/svg/ButtonGradient";

import { Loader2 } from "lucide-react";
import Section from "../components/Section";
import api from "../services/api.interceptor";

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

  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [drawId, setDrawId] = useState("");
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/draw/active-draw");
        setDrawId(response?.data?.result?._id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    let payload = {
      numberSets: [
        {
          numbers: [1, 2, 3, 4, 5],
        },
        {
          numbers: [6, 7, 8, 9, 10],
        },
      ],
      drawId: drawId,
    };

    try {
      const response = await api.post("/purchaseTicket", {
        headers: {
          "Content-Type": "application/json",
        },
        ...payload,
      });

      const { clientSecret } = await response.json();

      console.log("clientSecret", clientSecret);

      setClientSecret(clientSecret);

      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: document.getElementById("name").value,
              email: document.getElementById("email").value,
            },
          },
        });

      if (paymentError) {
        setError(paymentError.message);
      } else if (paymentIntent.status === "succeeded") {
        clearCart();
        // Redirect to success page
        window.location.href = "/success";
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="bg-[#2A2A2A] p-6 rounded-xl border border-[#3A3A3A]">
        <h3 className="text-xl font-bold text-white mb-4">
          Contact Information
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-3 bg-[#1B1B1B] border border-[#3A3A3A] rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-3 bg-[#1B1B1B] border border-[#3A3A3A] rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-[#2A2A2A] p-6 rounded-xl border border-[#3A3A3A]">
        <h3 className="text-xl font-bold text-white mb-4">Payment Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Card Information
            </label>
            <div className="w-full px-4 py-3 bg-[#1B1B1B] border border-[#3A3A3A] rounded-lg">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#FFFFFF",
                      "::placeholder": {
                        color: "#6B7280",
                      },
                    },
                    invalid: {
                      color: "#EF4444",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-[#2A2A2A] p-6 rounded-xl border border-[#3A3A3A]">
        <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-300">
              <span>Line Numbers: {item.numbers.join(", ")}</span>
              <span>AED {item.price}</span>
            </div>
          ))}
          <div className="border-t border-[#3A3A3A] pt-4 mt-4">
            <div className="flex justify-between text-xl font-bold text-white">
              <span>Total</span>
              <span>AED {total}</span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-4 rounded-xl text-lg font-bold transition-all duration-200
          bg-gradient-to-r from-yellow-200 to-yellow-100 
          text-gray-900 hover:opacity-90 disabled:opacity-50 
          disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Processing...
          </>
        ) : (
          `Pay AED ${total}`
        )}
      </button>
    </form>
  );
};

const Checkout = () => {
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
            <div className="max-w-2xl mx-auto mt-12 mb-2">
              <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </div>
        </Section>
      </div>
      <ButtonGradient />
    </>
  );
};

export default Checkout;
