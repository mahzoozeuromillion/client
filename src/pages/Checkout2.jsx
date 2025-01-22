import { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import api from "../services/api.interceptor";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
const stripePromise = loadStripe(
  "pk_test_51QdxrrBXLQ8mh6EAbVVNFcC5lW9qbqQWJdfR4VZBph7K13vz2nbrclhAnE0NSOpOgooJqBAUBQlQj0uF6rlAQJYZ00iiVS72g6"
);

const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    const response = api.post("/create-checkout-session", {
      method: "POST",
    });

    return response.data.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

// const App = () => {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/checkout" element={<CheckoutForm />} />
//           <Route path="/return" element={<Return />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

export default CheckoutForm;
