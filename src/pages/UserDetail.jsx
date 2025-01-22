import React, { useEffect, useState } from "react";
import { Calendar, Ticket, Wallet } from "lucide-react";
import api from "../services/api.interceptor";
import EditUserDetailModal from "../components/EditUserDetailModal";
import { FaEdit } from "react-icons/fa"; // Import the edit icon

const UserDetail = ({ data }) => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    fetchTicketDetails();
  }, []);

  const fetchTicketDetails = async () => {
    try {
      await api
        .post("/user-tickets")
        .then((res) => {
          setTicketDetails(res?.data?.result);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const userData = {
    walletBalance: "0 EURO",
    totalTickets: data?.ticketCount,
    upcomingDraws: [
      {
        id: 1,
        date: "Jan 15, 2025",
        prize: "2.5 ETH",
        ticketsOwned: 3,
      },
      {
        id: 2,
        date: "Jan 20, 2025",
        prize: "3.0 ETH",
        ticketsOwned: 5,
      },
    ],
  };

  return (
    <div className="bg-white px-4 pt-[60px]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center md:mb-18 mb-20">
          <button
            className="bg-blue-600 text-white px-4 py-2 absolute md:top-20 top-28 right-3 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="hidden md:inline font-extralight">Edit Profile</span>{" "}
            {/* Hide text on small screens */}
            <span className="inline md:hidden">
              <FaEdit /> {/* Icon only on smaller screens */}
            </span>
          </button>
        </div>
        {/* Header Section */}
        <div className="text-center mb-12">
          <h3 className="text-blue-600 text-xl capitalize font-medium mb-2">
            {data?.name}
          </h3>
          <h2 className="text-gray-900 text-3xl font-semibold mb-3">
            Your Profile Details
          </h2>
          <p className="text-gray-600 text-sm">{data?.email}</p>
        </div>

        {/* Edit Button to Open Modal */}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Wallet Balance",
              value: userData.walletBalance,
              subtitle: "Available for tickets",
              icon: <Wallet className="w-4 h-4 text-blue-600" />,
            },
            {
              title: "Total Tickets",
              value: userData.totalTickets,
              subtitle: "Tickets purchased",
              icon: <Ticket className="w-4 h-4 text-blue-600" />,
            },
            {
              title: "Next Draw",
              value: userData.upcomingDraws[0].date,
              subtitle: `Prize pool: ${userData.upcomingDraws[0].prize}`,
              icon: <Calendar className="w-4 h-4 text-blue-600" />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-slate-10 rounded-lg p-6 border shadow-2xl border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-900 text-lg font-medium mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{stat.subtitle}</p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-500 text-xl font-medium">
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Render the EditUserDetailModal component */}
        <EditUserDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userData={data}
        />
      </div>
    </div>
  );
};

export default UserDetail;
