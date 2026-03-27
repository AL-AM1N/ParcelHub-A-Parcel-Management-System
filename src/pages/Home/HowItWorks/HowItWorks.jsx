import React from "react";
import {
  FaBoxOpen,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaBoxOpen size={28} />,
      title: "Booking Pick & Drop",
      description:
        "Easily book your parcel pickup from your location.\nOur rider collects it and ensures fast delivery.\nNo need to visit any office physically.",
    },
    {
      icon: <FaMoneyBillWave size={28} />,
      title: "Cash on Delivery",
      description:
        "Receive payments securely with our COD system.\nWe collect cash from customers on your behalf.\nFast settlement directly to your account.",
    },
    {
      icon: <FaWarehouse size={28} />,
      title: "Delivery Hub",
      description:
        "Multiple delivery hubs across the country.\nEnsures faster sorting and dispatching.\nReliable and efficient parcel handling system.",
    },
    {
      icon: <FaBuilding size={28} />,
      title: "Booking SME & Corporate",
      description:
        "Special solutions for businesses and enterprises.\nBulk parcel handling with dedicated support.\nOptimized logistics for your company needs.",
    },
  ];

  return (
    <div className="py-16">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <p className="text-gray-500 mt-2">
          Simple and efficient parcel delivery process
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="card-body items-center text-center">
              {/* Icon */}
              <div className="p-4 rounded-full bg-lime-100 text-lime-600 mb-4">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 whitespace-pre-line">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;