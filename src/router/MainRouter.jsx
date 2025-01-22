import { useRoutes } from "react-router-dom";
import PathConstants from "./paths";
import Home from "../pages/Home";
import NotFound from "../pages/404";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Cart from "../components/design/Cart";
import Checkout from "../pages/CheckOut";
import PastDrawings from "../pages/PastDrawings";
import UserProfile from "../pages/UserProfile";
import TicketPage from "../pages/Ticket";
import HowItWorksPage from "../pages/HowWorks";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swiper from "../components/swiper";
import AgeVerification from "../components/AgeVerification";
import Logout from "../pages/Logout";
import PaymentSuccess from "../pages/PaymentSuccess";
import CheckoutForm from "../pages/Checkout2";
import Return from "../pages/Return";

const Layout = ({ children }) => (
  <>
    <Header />
    <AgeVerification />
    <main>{children}</main>
    <Footer />
  </>
);

const MainRoute = () => {
  const routes = [
    {
      path: PathConstants.HOME,
      element: (
        <Layout>
          <Swiper />
          <Home />
        </Layout>
      ),
    },
    {
      path: PathConstants.RETURN,
      element: (
        <Layout>
          <Return />
        </Layout>
      ),
    },
    {
      path: PathConstants.CHECKOUT2,
      element: (
        <Layout>
          <CheckoutForm />
        </Layout>
      ),
    },
    {
      path: PathConstants.NOT_FOUND,
      element: (
        <Layout>
          <NotFound />,
        </Layout>
      ),
    },
    {
      path: PathConstants.LOGIN,
      element: (
        <Layout>
          <Login />,
        </Layout>
      ),
    },
    {
      path: PathConstants.SIGNUP,
      element: (
        <Layout>
          <SignUp />,
        </Layout>
      ),
    },
    {
      path: PathConstants.CART,
      element: (
        <Layout>
          <Cart />,
        </Layout>
      ),
    },
    {
      path: PathConstants.CHECKOUT,
      element: (
        <Layout>
          <Checkout />,
        </Layout>
      ),
    },
    {
      path: PathConstants.PAST_DRAWINGS,
      element: (
        <Layout>
          <PastDrawings />,
        </Layout>
      ),
    },
    {
      path: PathConstants.USER_PROFILE,
      element: (
        <Layout>
          <UserProfile />,
        </Layout>
      ),
    },
    {
      path: PathConstants.TICKET,
      element: (
        <Layout>
          <TicketPage />,
        </Layout>
      ),
    },
    {
      path: PathConstants.HOW_IT_WORKS,
      element: (
        <Layout>
          <HowItWorksPage />,
        </Layout>
      ),
    },
    {
      path: PathConstants.PAYMENT_SUCCESS,
      element: (
        <Layout>
          <PaymentSuccess />,
        </Layout>
      ),
    },
    {
      path: PathConstants.LOGOUT,
      element: <Logout />,
    },
  ];

  const element = useRoutes(routes);

  return element;
};

export default MainRoute;
