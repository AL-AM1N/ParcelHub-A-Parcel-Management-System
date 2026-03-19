import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
const BeARider = () => {
  const { user } = useAuth();
  const centers = useLoaderData();
  const axiosSecure = useAxiosSecure();

  // Get unique regions
  const regions = [...new Set(centers.map((c) => c.region))];

  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const selectedRegion = watch("region");

  // Filter districts based on region
  const districts = centers.filter((c) => c.region === selectedRegion);

  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending", // ⭐ IMPORTANT
      created_at: new Date().toISOString(),
    };

    console.log(riderData);

    try {
      const res = await axiosSecure.post("/riders", riderData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your rider application is pending approval.",
        });
        reset();
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-teal-900">
          Be A Rider
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Name */}
          <div>
            <p>Name</p>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <p>Email</p>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Age */}
          <div>
            <p>Age</p>
            <input
              type="number"
              placeholder="Your Age"
              className="input input-bordered w-full"
              {...register("age", { required: true })}
            />
          </div>

          {/* Phone */}
          <div>
            <p>Phone Number</p>
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              {...register("phone", { required: true })}
            />
          </div>

          {/* NID */}
          <div>
            <p>National ID Card Number</p>
            <input
              type="text"
              placeholder="NID Number"
              className="input input-bordered w-full"
              {...register("nid", { required: true })}
            />
          </div>

          {/* Region */}
          <div>
            <p>Select Region</p>
            <select
              className="select select-bordered w-full"
              {...register("region", { required: true })}
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <p>Select District</p>
            <select
              className="select select-bordered w-full"
              {...register("district", { required: true })}
            >
              <option value="">Select District</option>

              {districts.map((d) => (
                <option key={d.city}>{d.city}</option>
              ))}
            </select>
          </div>

          {/* Bike Brand */}
          <div>
            <p>Bike Brand</p>
            <input
              type="text"
              placeholder="e.g. Yamaha, Honda"
              className="input input-bordered w-full"
              {...register("bikeBrand", { required: true })}
            />
          </div>

          {/* Bike Registration */}
          <div>
            <p>Bike Registration Number</p>
            <input
              type="text"
              placeholder="Bike Registration Number"
              className="input input-bordered w-full"
              {...register("bikeNumber", { required: true })}
            />
          </div>

          {/* Additional Info */}
          <div>
            <p>Additional Information</p>
            <textarea
              placeholder="Anything else..."
              className="textarea textarea-bordered w-full"
              {...register("additionalInfo")}
            />
          </div>

          {/* Submit */}
          <button className="btn bg-lime-400 border-none text-black w-full hover:bg-lime-500">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeARider;