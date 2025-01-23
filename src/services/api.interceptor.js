import axios from "axios";

// const BASE_URL = "https://tiktik.ap-southeast-2.elasticbeanstalk.com";
// const BASE_URL = "https://api.talkiyo.xyz";
// const BASE_URL = "http://127.0.0.1:3001/api/web";

const BASE_URL = "https://apis-rnho.onrender.com/api/web";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    // Get the access token from SecureStore
    const accessToken = localStorage.getItem("token");

    // If an access token exists, set the Authorization header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//     //   console.log("expired");
//     //   redirect("/");
//     //   window.location.replace("/");
//       return Promise.reject(error);
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
