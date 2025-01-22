import api from "../services/api.interceptor";
import { createContext, useContext, useReducer, useEffect } from "react";

// Define initial state
const initialState = {
  token: null,
  userData: null,
};

console.log("initialState", initialState);
// Define action types
const SET_TOKEN = "SET_TOKEN";
const REMOVE_TOKEN = "REMOVE_TOKEN"; // Action to remove the token
const SET_USER_DATA = "SET_USER_DATA"; // Action to set user data

// Define reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        userData: null,
      };

    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

// Create context
const UserContext = createContext();

// Create provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Check if token is in localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: SET_TOKEN, payload: token });
      fetchUserDetails(token);
    }
  }, []);

  // Function to set the token and save it to localStorage
  const setToken = (token) => {
    localStorage.setItem("token", token);
    dispatch({ type: SET_TOKEN, payload: token });
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    dispatch({ type: REMOVE_TOKEN });
  };

  const fetchUserDetails = async () => {
    try {
      await api
        .post("/user-details")
        .then((res) => {
          dispatch({ type: SET_USER_DATA, payload: res?.data?.data?.result });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <UserContext.Provider value={{ token: state.token, setToken, removeToken }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
