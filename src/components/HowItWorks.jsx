import { howWorks } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";

const HowItWorks = () => {
  return (
    <div id="features" className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      <div className="flex flex-col items-center justify-center relative z-2 max-w-7xl mx-auto">
        <Heading
          className="text-center w-full md:max-w-md lg:max-w-2xl text-blue-600 mb-8 sm:mb-12"
          title={
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">
              How it works?
            </h2>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {howWorks.map((item, index) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full transform hover:scale-105 transition-transform duration-300"
              style={{
                backgroundImage: `linear-gradient(135deg, #0085FF, #00B2FF)`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[20rem] sm:min-h-[22rem] p-4 sm:p-6 lg:p-8 pointer-events-none">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
                  <span className="text-blue-600 font-bold text-lg sm:text-xl">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h5 className="text-xl sm:text-2xl font-bold text-blue-600 mb-3 sm:mb-4">
                    {item.title}
                  </h5>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                    {item.text}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={40}
                    height={40}
                    alt={item.title}
                    className="transform hover:rotate-12 transition-transform duration-300"
                  />
                  <div className="ml-auto flex items-center group">
                    <p className="font-code text-xs font-bold text-blue-600 uppercase tracking-wider mr-2">
                      Learn More
                    </p>
                    <Arrow className="text-blue-600 transform group-hover:translate-x-1 transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>

              {/* Background Effects */}
              {item.light && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-blue-500/10 to-blue-600/10 animate-pulse" />
              )}

              <div
                className="absolute inset-0.5 bg-white"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-20 bg-gradient-to-r from-blue-100 to-blue-50">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-75"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
