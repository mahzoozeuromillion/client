import { useEffect, useState } from "react";

import NumberLineSelector from "./design/NumberLineSelector";
import CountdownDisplay from "./design/Timer";
import api from "@/services/api.interceptor";

const Ticket = ({ className = "" }) => {
  const [details, setDetails] = useState(null); // State to store the fetched data.
  const [loading, setLoading] = useState(true); // State to manage loading status.
  const [error, setError] = useState(null); // State to manage errors.

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get("/upcoming-draw");
      setDetails(response.data); // Set the fetched data into state.
    } catch (err) {
      setError("Failed to fetch details."); // Set an error message if the request fails.
    } finally {
      setLoading(false); // Ensure loading is set to false after the request.
    }
  };
  useEffect(() => {
    fetchDetails(); // Fetch details on component mount.
  }, []);

  console.log(details);

  if (loading) return <div className={`loading ${className}`}>Loading...</div>;
  if (error) return <div className={`error ${className}`}>{error}</div>;

  return (
    <div
      className={`bg-gradient-to-b from-yellow-200 via-cyan-200 to-blue-400 rounded-xl ${className}`}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="lg:flex gap-12 items-start md:p-6">
          {/* Left Section */}
          <div className="lg:w-1/2 lg:border-r lg:border-blue-400/20 lg:pr-8">
            {/* Logo section */}
            <div className="mb-12 flex justify-center lg:justify-start">
              <img className="w-40 md:w-48 h-auto" />
            </div>

            {/* Counter section */}
            <div className="mb-8 p-6 rounded-[2.4375rem] bg-blue-500/10 backdrop-blur-sm">
              <h4 className="h4 mb-4 text-center font-semibold text-blue-600">
                Lottery Draw Starts In:
              </h4>
              <p className="body-2 text-center text-blue-700 font-bold text-xl md:text-6xl">
                <CountdownDisplay initialSeconds={details?.result?.date} />
              </p>
            </div>

            {/* Jackpot section */}
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-blue-600 drop-shadow-lg">
                TOP PRIZE
              </h2>
              <span className="text-2xl text-blue-600">(5 NUMBER MATCH)</span>
              <div className="flex-col space-y-2">
                <span className="text-3xl font-bold text-blue-600">EURO</span>
                <span className="text-5xl sm:text-6xl xl:text-7xl text-blue-600 drop-shadow-lg">
                  10 MILLION
                </span>
              </div>
            </div>

            {/* Lucky Chance Draw section */}
            <div className="bg-blue-500 p-6 sm:p-8 rounded-2xl mb-8 text-center transform hover:scale-105 transition-transform duration-300 border border-blue-400/30 backdrop-blur-sm">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                SECOND PRICE (4 NUMBER MATCH)
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                EURO 1 MILLION
              </p>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4"></h3>
              <p className="text-lg text-white mt-2">
                (3 NUMBER MATCH) RETURN TICKET AMOUNT
              </p>
            </div>

            {/* Entry price */}
            <div className="text-center mb-8">
              <p className="text-xl sm:text-2xl text-blue-600 font-bold">
                Check Our Prizes
              </p>
            </div>

            {/* Play button */}
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-600 font-bold py-4 px-8 rounded-full text-xl sm:text-2xl shadow-lg transform hover:-translate-y-1 transition-all duration-200">
              BUY NOW
            </button>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">
                    Buy A Ticket Quickly
                  </h3>
                </div>
                <NumberLineSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
