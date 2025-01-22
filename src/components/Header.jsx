import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "../context/CartContext";
import GradientTitle from "./GradientTitle";
import { useUser } from "../context/UserContext";
import { IoExitOutline } from "react-icons/io5";

const Header = () => {
  const { items } = useCart();
  const { token } = useUser();
  const location = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if the current pathname is the root path
  const isRootPath = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    if (isRootPath) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (isRootPath) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isRootPath]);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 ${
        isRootPath
          ? scrolled
            ? "bg-white shadow-2xl"
            : "bg-transparent transition-colors"
          : "bg-white"
      } ${openNavigation ? "bg-white" : ""}`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 relative">
        <Link className="block w-[12rem] xl:mr-8" to="/">
          <GradientTitle />
        </Link>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-white/95 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div
            className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row"
            style={{
              fontFamily: "footerFont, sans-serif",
            }}
          >
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={handleClick}
                className={`block mt-0 relative font-code text-2xl uppercase ${
                  isRootPath
                    ? scrolled
                      ? "text-black"
                      : "text-white"
                    : "text-black"
                } ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 mt-0 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-extralight ${
                  item.url === location.pathname ? "lg:text-[#0078F5]" : ""
                } lg:leading-5 lg:hover:text-[#0078F5] xl:px-12`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        {token ? (
          <>
            <Link
              to="/user-profile"
              className={`button hidden mr-8 font-extralight transition-colors ${
                isRootPath
                  ? scrolled
                    ? "text-black"
                    : "text-white"
                  : "text-black"
              } hover:text-[#0078F5] lg:block`}
              style={{
                fontFamily: "footerFont, sans-serif",
              }}
            >
              Profile{" "}
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className={`button font-extralight hidden mr-8 transition-colors  ${
                isRootPath
                  ? scrolled
                    ? "text-black"
                    : "text-white"
                  : "text-black"
              } hover:text-[#0078F5] lg:block`}
              style={{
                fontFamily: "footerFont, sans-serif",
              }}
            >
              New account
            </Link>
            <Link
              to="/login"
              className={` mt-0 hidden button font-extralight  lg:flex  ${
                isRootPath
                  ? scrolled
                    ? "text-black"
                    : "text-white"
                  : "text-black"
              }`}
              style={{
                fontFamily: "footerFont, sans-serif", // Apply the custom font here
              }}
            >
              SIGN IN
            </Link>
          </>
        )}

        <Link to={"/cart"} className="cursor-pointer relative">
          <span className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 text-black text-xs font-bold flex items-center justify-center h-5 w-5 shadow-lg border border-black">
            {items.length}
          </span>
          <CiShoppingCart
            className={`ml-6 ${
              isRootPath
                ? scrolled
                  ? "text-black"
                  : "text-white"
                : "text-black"
            }`}
            size={30}
          />
        </Link>
        {token && (
          <Link to={"/logout"} className="cursor-pointer relative">
            <IoExitOutline
              className={`ml-6 ${
                isRootPath
                  ? scrolled
                    ? "text-black"
                    : "text-white"
                  : "text-black"
              }`}
              size={30}
            />
          </Link>
        )}

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
