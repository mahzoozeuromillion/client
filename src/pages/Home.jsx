import LatestDrawResult from "../components/LatestDrawResult";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Counter from "../components/Counter";
import Hero from "../components/Hero";



const Home = () => {
  return (
    <>
      <div className="">
        <Hero />
        <Counter />
        {/* <Benefits /> */}

        {/* <HowItWorks /> */}
        <LatestDrawResult />
        {/* <RecentWinners /> */}
        {/* <Collaboration /> */}
        {/* <Services /> */}
        {/* <Pricing /> */}
        {/* <Roadmap /> */}
      </div>

      <ButtonGradient />
    </>
  );
};

export default Home;
