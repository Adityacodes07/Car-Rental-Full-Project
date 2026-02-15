import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 px-4">
      
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold
        bg-gradient-to-r from-sky-600 to-blue-600
        bg-clip-text text-transparent">
        Never Miss a Deal!
      </h1>

      {/* Subtitle */}
      <p className="md:text-lg text-sm text-gray-500 max-w-xl pb-6">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>

      {/* Form */}
      <form className="
        flex items-center
        max-w-2xl w-full
        h-12 md:h-14
        bg-white
        rounded-full
        border border-sky-200
        shadow-sm hover:shadow-md
        transition-all duration-300
      ">
        <input
          type="email"
          required
          placeholder="Enter your email address"
          className="
            flex-1 h-full
            px-5
            text-gray-600 text-sm md:text-base
            bg-transparent outline-none
            rounded-l-full
            placeholder:text-gray-400
          "
        />

        <button
          type="submit"
          className="
            h-full
            px-6 md:px-10
            text-white font-semibold
            rounded-full
            bg-gradient-to-r from-sky-500 to-blue-600
            hover:shadow-lg hover:shadow-sky-300
            hover:scale-105
            transition-all duration-300
            active:scale-95
          "
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
