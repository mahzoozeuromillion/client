import { useEffect } from "react";
import ButtonGradient from "../assets/svg/ButtonGradient";

import HowItWorks from "../components/HowItWorks";

const HowItWorksPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <HowItWorks />
      </div>

      <ButtonGradient />
    </>
  );
};

export default HowItWorksPage;
