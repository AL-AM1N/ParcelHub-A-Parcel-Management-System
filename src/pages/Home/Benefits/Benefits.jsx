import React from "react";

import tracking from "../../../assets/benefits/tracing.png";
import support from "../../../assets/benefits/support.png";



const features = [
  {
    img: tracking,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    img: support,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    img: support,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 bg-[#EAECED] border-t border-b border-dashed border-teal-700">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6"
          >
            {/* Image */}
            <div className="w-40 flex justify-center">
              <img
                src={feature.img}
                alt={feature.title}
                className="w-full object-contain"
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block border-l-2 border-dashed border-teal-700 h-24"></div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold text-teal-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;