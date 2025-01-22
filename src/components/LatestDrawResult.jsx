import { ArrowRight } from "lucide-react";

const LatestDrawResult = () => {
  const drawNumbers = [8, 11, 17, 20, 23];
  const matchResults = [
    { match: "5", winners: 0 },
    { match: "4", winners: 0 },
    { match: "3", winners: 0 },
  ];

  const luckyResults = [
    { ticket: "BY4934604", prize: "EUR 400,000" },
    { ticket: "AP1493831", prize: "EUR 400,000" },
    { ticket: "CP6663669", prize: "EUR 400,000" },
  ];

  return (
    <div
      className="w-full max-w-7xl mx-auto backdrop-blur-sm my-10"
      style={{
        borderRadius: "3rem",
        background: "linear-gradient(90deg, #0085FF, #00B2FF)",
        padding: "1px",
      }}
    >
      <div
        className="w-full h-full p-6 md:p-10 rounded-2xl"
        style={{
          backgroundColor: "white",
          borderRadius: "3rem",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-3xl font-bold text-blue-600">
            LATEST DRAW RESULT
          </h2>
          <button className="text-blue-500 hover:text-blue-600 flex items-center gap-2">
            More <ArrowRight size={20} />
          </button>
        </div>

        <div className="text-gray-500 mb-4">Saturday 22:00, 28/12/2024</div>

        {/* Draw Numbers */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center sm:justify-start">
          {drawNumbers.map((number, index) => (
            <div
              key={index}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-500 flex items-center justify-center text-xl sm:text-2xl font-bold text-white"
            >
              {number}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {matchResults.map((result, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <span className="text-gray-500">Match</span>{" "}
                  <span className="font-medium text-blue-600">
                    {result.match}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Winners</span>{" "}
                  <span className="font-medium text-blue-600">
                    {result.winners}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Lucky Chance Results */}
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-4">
              LUCKY CHANCE RESULTS
            </h3>
            <div className="space-y-4">
              {luckyResults.map((result, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium text-blue-600">
                    {result.ticket}
                  </span>
                  <span className="text-gray-500">{result.prize}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestDrawResult;
