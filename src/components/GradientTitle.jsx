import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const HomePageImage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex items-center">
      <img
        src="public/Mahzooz3.png"
        alt="Mahzooz"
        className={
          isScrolled
            ? "h-20 w-20 object-contain transition-all duration-300"
            : "h-[120px] w-[120px] object-contain transition-all duration-300"
        }
      />
    </div>
  );
};

const OtherPageImage = () => (
  <div className="flex items-center">
    <img
      src="public/Mahzooz3.png"
      alt="Mahzooz"
      className="h-20 w-20 object-contain"
    />
  </div>
);

const GradientTitle = () => {
  const location = useLocation();

  return location.pathname === "/" ? <HomePageImage /> : <OtherPageImage />;
};

export default GradientTitle;
