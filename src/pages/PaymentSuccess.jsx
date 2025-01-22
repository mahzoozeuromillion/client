import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import api from "../services/api.interceptor";
import Section from "../components/Section";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const paymentIntentId = searchParams.get("payment_intent");
    const redirectStatus = searchParams.get("redirect_status");

    const verifyPayment = async () => {
      try {
        await api.post("/verify-payment/" + paymentIntentId).then((res) => {
          console.log("Payment verification response:", res);

          if (res.data.result.success) {
            setStatus("success");
          } else {
            setStatus("error");
            setError(res.data.result.error);
          }
        });
      } catch (err) {
        setStatus("error");
        setError("Failed to verify payment");
      }
    };

    if (paymentIntentId && redirectStatus === "succeeded") {
      verifyPayment();
    } else {
      setStatus("error");
      setError("Invalid payment status");
    }
  }, [searchParams]);

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Section
          className="pt-[12rem] -mt-[5.25rem]"
          crosses
          crossesOffset="lg:translate-y-[5.25rem]"
          customPaddings
          id="hero"
        >
          <div className="container h-screen px-4 mx-auto">
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
              {status === "loading" && (
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-black" />
                  <p>Verifying your payment...</p>
                </div>
              )}

              {status === "success" && (
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2 text-black">
                    Payment Successful!
                  </h2>
                  <p className="mb-4">
                    Your tickets have been purchased successfully.
                  </p>
                  <a
                    href="/user-profile"
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  >
                    View My Tickets
                  </a>
                </div>
              )}

              {status === "error" && (
                <div className="text-center">
                  <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2 text-black">
                    Payment Failed
                  </h2>
                  <p className="text-red-500 mb-4">{error}</p>
                  <a
                    href="/purchase-tickets"
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  >
                    Try Again
                  </a>
                </div>
              )}
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
