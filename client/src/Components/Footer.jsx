import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-sky-200 bg-gradient-to-b from-sky-50/40 to-white">
      
      {/* Main Footer */}
      <div className="text-gray-600 pt-12 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-wrap justify-between gap-12 md:gap-8">

          {/* Brand */}
          <div className="max-w-80">
            <div className="flex items-center gap-2 mb-4">
              <img src={assets.logo} alt="logo" className="h-9" />
              <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                CarRental
              </span>
            </div>

            <p className="text-sm leading-relaxed text-gray-500">
              Rent luxury cars at affordable prices. Experience the thrill of
              driving premium vehicles with ease and convenience.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-5">
              <a href="#">
                <img
                  src={assets.facebook_logo}
                  className="w-5 h-5 opacity-70 hover:opacity-100 hover:scale-110 transition-all"
                />
              </a>
              <a href="#">
                <img
                  src={assets.twitter_logo}
                  className="w-5 h-5 opacity-70 hover:opacity-100 hover:scale-110 transition-all"
                />
              </a>
              <a href="#">
                <img
                  src={assets.instagram_logo}
                  className="w-5 h-5 opacity-70 hover:opacity-100 hover:scale-110 transition-all"
                />
              </a>
              <a href="#">
                <img
                  src={assets.gmail_logo}
                  className="w-5 h-5 opacity-70 hover:opacity-100 hover:scale-110 transition-all"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-2 text-sm">
              {["Home", "Browse Cars", "List your Car", "About Us"].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-sky-600 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Resources
            </h2>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                "Help Center",
                "Terms of Service",
                "Privacy Policy",
                "Insurance",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-sky-600 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Contact
            </h2>
            <ul className="flex flex-col gap-2 text-sm">
              <li>9300 Luxury Car</li>
              <li>India, Madhya Pradesh</li>
              <li>Jabalpur · +91 59565 92565</li>
              <li>info@newCar.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-sky-200 flex flex-col md:flex-row gap-3 items-center justify-between text-sm">
          <p className="text-gray-500">
            © {new Date().getFullYear()} CarRental. All rights reserved.
          </p>

          <ul className="flex items-center gap-4">
            <li>
              <a href="#" className="hover:text-sky-600 transition-colors">
                Privacy
              </a>
            </li>
            <span className="text-gray-300">|</span>
            <li>
              <a href="#" className="hover:text-sky-600 transition-colors">
                Terms
              </a>
            </li>
            <span className="text-gray-300">|</span>
            <li>
              <a href="#" className="hover:text-sky-600 transition-colors">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
