import React from "react";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 py-8 font-inter">
      <div
        className="container mx-auto px-4"
        style={{
          fontFamily: "footerFont, sans-serif", // Apply the custom font here
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div>
              <a href="#" className="hover:text-white text-sm font-light">
                About Us
              </a>
            </div>
            <div>
              <a href="#" className="hover:text-white text-sm font-light">
                How to Play
              </a>
            </div>
            <div>
              <a href="#" className="hover:text-white text-sm font-light">
                Frequently Asked Questions
              </a>
            </div>
          </div>

          {/* Middle Links Section */}
          <div className="space-y-4">
            <div>
              <a href="#" className="hover:text-white text-sm font-light">
                Terms & Conditions
              </a>
            </div>
            <div>
              <a href="#" className="hover:text-white text-sm font-light">
                Privacy Notice
              </a>
            </div>
            <div>
              <a href="#" className="hover:text-white text-sm font-light">
                Play Responsibly
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span className="text-sm font-light">
                Support@mahzoozeuromillion.in
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a7 7 0 0 0-7-7v2a5 5 0 0 1 5 5z" />
              </svg>
              <span className="text-sm font-light">8002365</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span className="text-sm font-light">Live Customer Service</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 justify-start md:justify-end">
            <a
              href="#"
              className="bg-gray-500 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-600"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-gray-500 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-600"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
              </svg>
            </a>
            <a
              href="#"
              className="bg-gray-500 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-600"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-gray-500 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-600"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-gray-500 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-600"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-600">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="text-xs font-light">
              © THE GAME L.L.C. 2025 Licensed by the GCGRA.
            </span>
          </div>

          <div className="flex flex-col items-end">
            <div className="mb-2">
              <img src="/src/assets/18.png" alt="18+ Only" className="h-12" />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs font-light">
                <div>
                  You must be 18 years or older to register and use this
                  platform.
                </div>
                <div>
                  Individuals from restricted jurisdictions are not permitted to
                  register or use this platform.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-light">Version 1.0.4</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-light">En</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
