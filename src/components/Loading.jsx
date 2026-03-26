import React from "react";
import { FaBox, FaTruck } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      {/* Animated Truck + Box */}
      <div className="relative w-64 h-20 overflow-hidden">
        {/* Road */}
        <div className="absolute bottom-0 w-full h-1 bg-base-300 rounded"></div>

        {/* Moving Truck */}
        <div className="absolute flex items-center gap-2 animate-[moveTruck_2.5s_linear_infinite]">
          <FaTruck className="text-4xl text-primary" />
          <FaBox className="text-2xl text-secondary animate-bounce" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-64">
        <progress className="progress progress-primary w-full"></progress>
      </div>

      {/* Status Text */}
      <p className="text-base-content/70 text-sm tracking-wide">
        Your parcel is on the way...
      </p>

      {/* Custom Animation */}
      <style>
        {`
          @keyframes moveTruck {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
