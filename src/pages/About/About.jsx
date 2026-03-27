import React from "react";
import { FaShippingFast, FaUsers, FaMapMarkedAlt, FaShieldAlt } from "react-icons/fa";
import aboutImg from '../../assets/aboutImg.png'
import { Link } from "react-router";

const About = () => {
  return (
    <div className="space-y-6">

      {/* HERO SECTION */}
      <section className="bg-linear-to-r from-teal-900 to-teal-600 text-white py-20 px-4 rounded-4xl">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About ParcelHub
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            We simplify parcel delivery with fast, secure, and reliable logistics
            solutions across the country.
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <h2 className="text-3xl font-bold text-teal-900 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 mb-4">
            ParcelHub is a modern delivery platform designed to connect people
            and businesses with fast and reliable courier services. Whether you
            are sending documents or heavy parcels, we ensure safe handling and
            timely delivery.
          </p>
          <p className="text-gray-600">
            Our system provides real-time tracking, transparent pricing, and a
            seamless booking experience. We are committed to making logistics
            simple and efficient for everyone.
          </p>
        </div>

        {/* Right Image */}
        <div>
          <img
            src={aboutImg}
            alt="delivery"
            className="rounded-2xl "
          />
        </div>
      </section>

      {/* FEATURES / VALUES */}
      <section className="bg-gray-100 py-16 px-4 rounded-4xl">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-900">
            Why Choose Us
          </h2>
          <p className="text-gray-500 mt-2">
            We provide the best delivery experience with modern technology
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="card bg-base-100 shadow-md p-6 text-center">
            <FaShippingFast className="text-4xl text-teal-600 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-500 text-sm">
              Quick and reliable delivery service across all regions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 shadow-md p-6 text-center">
            <FaMapMarkedAlt className="text-4xl text-teal-600 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Live Tracking</h3>
            <p className="text-gray-500 text-sm">
              Track your parcel in real-time with accurate updates.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-100 shadow-md p-6 text-center">
            <FaShieldAlt className="text-4xl text-teal-600 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Secure Service</h3>
            <p className="text-gray-500 text-sm">
              Your parcel safety is our top priority at every step.
            </p>
          </div>

          {/* Card 4 */}
          <div className="card bg-base-100 shadow-md p-6 text-center">
            <FaUsers className="text-4xl text-teal-600 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Customer Support</h3>
            <p className="text-gray-500 text-sm">
              Dedicated support team ready to assist you anytime.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        <div className="bg-base-100 shadow-md rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-teal-900 mb-3">
            Our Mission
          </h3>
          <p className="text-gray-600">
            To deliver parcels quickly, safely, and affordably while ensuring
            excellent customer satisfaction through innovative logistics
            solutions.
          </p>
        </div>

        <div className="bg-base-100 shadow-md rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-teal-900 mb-3">
            Our Vision
          </h3>
          <p className="text-gray-600">
            To become the most trusted parcel delivery platform by providing
            seamless, technology-driven courier services nationwide.
          </p>
        </div>
      </section>

      
      {/* CTA */}
      <section className=" text-black py-14 text-center px-4">
        <h2 className="text-3xl font-bold mb-3">
          Ready to Send Your Parcel?
        </h2>
        <p className="mb-6 opacity-90">
          Book your delivery now and experience fast & secure service.
        </p>
        <Link to='/sendParcel'>
        <button className="btn btn-primary text-black border-none hover:bg-lime-500">
          Send Parcel Now
        </button>
        </Link>
      </section>

    </div>
  );
};

export default About;