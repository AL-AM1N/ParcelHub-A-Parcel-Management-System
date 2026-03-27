import React from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-teal-900">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">

        {/* 1 */}
        <div className="bg-base-100 border-base-300 collapse border">
          <input type="checkbox" className="peer" />

          <div className="collapse-title flex justify-between items-center bg-primary text-black peer-checked:bg-secondary peer-checked:text-secondary-content">
            <span>How do I book a parcel delivery?</span>
            <FaChevronDown className="transition-transform duration-300 peer-checked:rotate-180" />
          </div>

          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            Simply go to the "Send Parcel" page, fill in sender and receiver
            details, choose your service center, and confirm your booking in a
            few easy steps.
          </div>
        </div>

        {/* 2 */}
        <div className="bg-base-100 border-base-300 collapse border">
          <input type="checkbox" className="peer" />

          <div className="collapse-title flex justify-between items-center bg-primary text-black peer-checked:bg-secondary peer-checked:text-secondary-content">
            <span>How can I track my parcel?</span>
            <FaChevronDown className="transition-transform duration-300 peer-checked:rotate-180" />
          </div>

          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            After booking, you will receive a tracking ID. Use that ID in the
            tracking section to see real-time updates of your parcel delivery
            status.
          </div>
        </div>

        {/* 3 */}
        <div className="bg-base-100 border-base-300 collapse border">
          <input type="checkbox" className="peer" />

          <div className="collapse-title flex justify-between items-center bg-primary text-black peer-checked:bg-secondary peer-checked:text-secondary-content">
            <span>What payment methods are available?</span>
            <FaChevronDown className="transition-transform duration-300 peer-checked:rotate-180" />
          </div>

          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            We support online payments as well as cash on delivery (COD). You
            can choose your preferred payment option during checkout.
          </div>
        </div>

        {/* 4 */}
        <div className="bg-base-100 border-base-300 collapse border">
          <input type="checkbox" className="peer" />

          <div className="collapse-title flex justify-between items-center bg-primary text-black peer-checked:bg-secondary peer-checked:text-secondary-content">
            <span>How long does delivery take?</span>
            <FaChevronDown className="transition-transform duration-300 peer-checked:rotate-180" />
          </div>

          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            Delivery time depends on distance and service type. داخل city usually
            takes 1–2 days, while outside city deliveries may take 2–4 days.
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;