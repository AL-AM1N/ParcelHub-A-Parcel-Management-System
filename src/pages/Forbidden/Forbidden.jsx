import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center bg-white p-10 rounded-2xl shadow-md max-w-md w-full">
        
        {/* Icon */}
        <div className="text-6xl mb-4">🚫</div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-red-500 mb-2">
          403 Forbidden
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link to="/">
            <button className="btn w-full bg-lime-400 border-none text-black hover:bg-lime-500">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;