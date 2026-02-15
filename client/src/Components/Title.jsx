import React from "react";

const Title = ({ title, subTitle, align = "center" }) => {
  return (
    <div
      className={`flex flex-col gap-3 mb-10
        ${
          align === "left"
            ? "items-start text-left"
            : "items-center text-center"
        }
      `}
    >
      {/* Main Title */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight
        bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
        {title}
      </h1>

      {/* Underline
       */}
      <div className="w-20 h-1 rounded-full bg-gradient-to-r from-sky-400 to-blue-500"></div>

      {/* Subtitle */}
      <p className="max-w-2xl text-gray-600 text-sm md:text-base leading-relaxed">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
