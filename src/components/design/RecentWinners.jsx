import React from "react";

const RecentWinners = () => {
  const winners = [
    {
      id: 1,
      name: "Leroy Roy",
      date: "01.08.2019",
      amount: "0.099 ETH",
      ticketNumber: "#5747e75482",
    },
    {
      id: 2,
      name: "Jeff Mack",
      date: "01.08.2019",
      amount: "0.099 ETH",
      ticketNumber: "#5747e75482",
    },
    {
      id: 3,
      name: "Neal Morris",
      date: "01.08.2019",
      amount: "0.099 ETH",
      ticketNumber: "#5747e75482",
    },
  ];

  return (
    <div className="bg-navy-900 px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h3 className="text-red-500 text-lg font-semibold mb-4">
            TRY TO CHECK OUT OUR
          </h3>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
            RECENT WINNERS
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-3xl mx-auto">
            We update our site regularly; more and more winners are added every
            day! To locate the most recent winner's information
          </p>
        </div>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {winners.map((winner) => (
            <div
              key={winner.id}
              style={{
                backgroundImage: `url('./src/assets/benefits/card-1.svg')`,
              }}
              className="bg-navy-800 rounded-lg p-6 transition-transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {winner.name}
                  </h3>
                  <p className="text-gray-400">{winner.date}</p>
                </div>
                <span className="text-gray-500 text-sm">
                  {winner.ticketNumber}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-500 text-xl font-bold">
                  {winner.amount}
                </span>
                <div className="w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            className="w-1/2 py-4 rounded-xl text-lg font-bold transition-all duration-200
                        bg-gradient-to-r from-yellow-200 to-yellow-100 
                        text-gray-900 hover:opacity-90 disabled:opacity-50 
                        disabled:cursor-not-allowed"
          >
            VIEW ALL
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentWinners;
