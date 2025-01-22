import ButtonGradient from "../assets/svg/ButtonGradient";

import Ticket from "../components/Ticket";

const TicketPage = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Ticket />
      </div>

      <ButtonGradient />
    </>
  );
};

export default TicketPage;
