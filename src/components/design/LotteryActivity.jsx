import api from "../../services/api.interceptor";
import React, { useState, useEffect } from "react";

const LotteryActivity = () => {
  const [query, setQuery] = useState({ status: "active" });
  const [ticketDetails, setTicketDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    fetchTicketDetails();
  }, [query]);

  const fetchTicketDetails = async () => {
    try {
      const response = await api.post("/user-tickets", { query });
      setTicketDetails(response?.data?.result || []);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setQuery({ status: tab });
  };

  const getTabColors = (value) => {
    const colors = {
      active: "bg-green-600 text-white",
      expired: "bg-red-600 text-white",
      history: "bg-blue-600 text-white",
    };

    const hoverColors = {
      active: "hover:bg-green-100 text-green-700",
      expired: "hover:bg-red-100 text-red-700",
      history: "hover:bg-blue-100 text-blue-700",
    };

    return activeTab === value
      ? colors[value]
      : `bg-gray-100 ${hoverColors[value]}`;
  };

  const TabButton = ({ value, label }) => (
    <button
      className={`px-4 py-2 rounded-full transition-colors text-sm md:text-base whitespace-nowrap ${getTabColors(
        value
      )}`}
      onClick={() => handleTabChange(value)}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-2">
          {/* <h3
            className={`text-lg font-semibold mb-2 ${
              activeTab === "active"
                ? "text-green-600"
                : activeTab === "expired"
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {activeTab.toUpperCase()}
          </h3> */}
          <h1 className="text-gray-800 text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            LATEST ACTIVITIES
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            The worlds first truly fair and global lottery. Each player has the
            highest chances to win the <span className="text-yellow-600">JACKPOT</span>
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center  gap-2 md:gap-4 mb-8">
          <TabButton value="active" label="ACTIVE" />
          <TabButton value="expired" label="EXPIRED" />
          <TabButton value="history" label="HISTORY" />
        </div>

        {/* Activity Table */}
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {/* Table Container */}
          <div className="p-6">
            {/* Table Header - Hidden on mobile */}
            <div className="hidden md:grid md:grid-cols-3 text-sm mb-6">
              <div className="text-left pl-4 font-bold text-gray-700">
                TICKET ID
              </div>
              <div className="flex items-center justify-center font-bold text-gray-700">
                TICKET NUMBERS
              </div>
              <div className="text-right pr-4 font-bold text-gray-700">
                DRAW ID
              </div>
            </div>

            {/* Tickets List */}
            {ticketDetails && ticketDetails.length > 0 ? (
              <div className="space-y-2">
                {ticketDetails.map((ticket, index) => (
                  <div
                    key={index}
                    className="block md:grid md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    {/* Mobile Layout */}
                    <div className="md:hidden mb-2">
                      <div className="flex justify-between text-gray-600 text-xs mb-1 px-4">
                        <span>TICKET ID</span>
                        <span>DRAW ID</span>
                      </div>
                      <div className="flex justify-between px-4">
                        <span className="text-gray-800 font-semibold text-sm truncate">
                          {ticket?.ticketId || "Unknown"}
                        </span>
                        <span className="text-amber-600 font-semibold">
                          {"N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:block text-gray-800 font-semibold text-sm pl-4">
                      {ticket?.ticketId || "Unknown"}
                    </div>

                    {/* Numbers - Both Layouts */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-1 px-4">
                      {ticket?.numbers?.map((num, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-sm"
                        >
                          <span className="text-gray-800 text-xs md:text-sm font-bold">
                            {num}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Draw ID - Desktop Only */}
                    <div className="hidden md:block text-amber-600 font-semibold text-right pr-4">
                      {"N/A"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No tickets found in this category
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteryActivity;
