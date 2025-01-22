import { useEffect, useState } from "react";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api.interceptor";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = validateForm();
    try {
      if (Object.keys(newErrors).length === 0) {
        await api
          .post("/login", formData)
          .then((res) => {
            setToken(res?.data?.result?.token);
            toast.success(res?.data?.message);
            const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
            sessionStorage.removeItem("redirectAfterLogin");
            navigate(redirectUrl || "/user-profile");
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message);
          });
      } else {
        setErrors(newErrors);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <div
        className="pt-[9rem] -mt-[5.25rem]"
        crosses
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings
        id="hero"
      >
        <div className="container min-h-screen px-4 mx-auto">
          <div className="max-w-md mx-auto mt-12 mb-2">
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 border border-gray-100">
              <div className="relative">
                {/* Decorative elements */}
                {/* <div className="absolute -top-1 -left-1 w-20 h-20 border-t-2 border-l-2 border-blue-500 rounded-tl-xl"></div>
                <div className="absolute -bottom-1 -right-1 w-20 h-20 border-b-2 border-r-2 border-blue-500 rounded-br-xl"></div> */}
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Sign in to your account</h1>
                    <p className="text-gray-500 text-sm mt-1">Welcome back! Please enter your details</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-blue-500 cursor-pointer border-gray-300 rounded focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                      </label>
                      <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className={`w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/30 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </span>
                      ) : (
                        'Sign in'
                      )}
                    </button>

                    <div className="text-center mt-6">
                      <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ButtonGradient />
    </div>
  );
};

export default Login;