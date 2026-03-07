import React from "react";
import Marquee from "react-fast-marquee";
import logo1 from "../../../assets/brands/amazon.png"
import logo2 from "../../../assets/brands/amazon_vector.png"
import logo3 from "../../../assets/brands/casio.png"
import logo4 from "../../../assets/brands/moonstar.png"
import logo5 from "../../../assets/brands/randstad.png"
import logo6 from "../../../assets/brands/star.png"
import logo7 from "../../../assets/brands/start_people.png"

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7]

const ClientLogosMarquee = () => {
  return (
    <section className="py-14 bg-[#EAECED]">
      <div className="max-w-6xl mx-auto px-4 mb-10 text-center">
        <p className="text-primary font-bold mt-2 ">
          We've helped thousands of sales teams
        </p>
      </div>

      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-24 flex items-center justify-center">
            <img
              src={logo}
              alt="company logo"
              className="h-6 object-contain transition duration-300"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ClientLogosMarquee;
