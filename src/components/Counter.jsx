import Button from "./Button";
import Heading from "./Heading";
import Section from "./Section";
import Tagline from "./Tagline";
import { roadmap } from "../constants";
import { check2, grid, loading1 } from "../assets";
import { Gradient } from "./design/Roadmap";
import CountdownDisplay from "./design/Timer";
import Ticket from "../components/Ticket";

const Counter = () => {
  const item = roadmap[0];
  return (
    <div className="overflow-hidden" id="roadmap">
      <div className="container mt-10">
        <Ticket className="md:-mt-10 mt-10 mb-10" />
      </div>
    </div>
  );
};

export default Counter;
