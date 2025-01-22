import LotteryActivity from "../components/design/LotteryActivity";
import Section from "../components/Section";
import ButtonGradient from "../assets/svg/ButtonGradient";
import UserDetail from "./UserDetail";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState, useCallback } from "react";
import Loader from "../components/Loader";
import api from "../services/api.interceptor";
import toast from "react-hot-toast";

const UserProfile = () => {
  const navigate = useNavigate();
  const { token } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  // Redirect to home if no token
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  console.log("userDetails", userDetails);

  // Fetch user details
  const fetchUserDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/user-details");
      setUserDetails(response?.data?.result);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching user details."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <div
          className="pt-[6rem] -mt-[5.25rem]"
          crosses
          crossesOffset="lg:translate-y-[5.25rem]"
          customPaddings
          id="hero"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {userDetails ? (
                <>
                  <UserDetail data={userDetails} />
                  <LotteryActivity data={userDetails} />
                </>
              ) : (
                <p className="h-screen flex items-center justify-center">
                  No user details available.
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <ButtonGradient />
    </>
  );
};

export default UserProfile;
