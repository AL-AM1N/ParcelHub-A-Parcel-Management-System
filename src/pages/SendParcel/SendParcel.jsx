import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const parcelType = watch("type");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-10 shadow-sm">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-teal-900 mb-6">
          Send A Parcel
        </h1>

        <h2 className="text-lg font-semibold text-teal-900 mb-6">
          Enter your parcel details
        </h2>

        <div className="divider"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

          {/* Parcel Info */}
          <div>

            <div className="flex gap-8 mb-6">
              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                  className="radio radio-success"
                />
                <span>Document</span>
              </label>

              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: true })}
                  className="radio"
                />
                <span>Not-Document</span>
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="label">Parcel Name</label>
                <input
                  type="text"
                  placeholder="Parcel Name"
                  className="input input-bordered w-full"
                  {...register("title", { required: true })}
                />
              </div>

              {parcelType === "non-document" && (
                <div>
                  <label className="label">Parcel Weight (KG)</label>
                  <input
                    type="number"
                    placeholder="Parcel Weight (KG)"
                    className="input input-bordered w-full"
                    {...register("weight")}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="divider"></div>

          {/* Sender & Receiver */}
          <div className="grid md:grid-cols-2 gap-10">

            {/* Sender Info */}
            <div>
              <h3 className="font-semibold text-teal-900 mb-4">
                Sender Details
              </h3>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Sender Name"
                  className="input input-bordered w-full"
                  {...register("senderName", { required: true })}
                />

                <input
                  type="text"
                  placeholder="Sender Phone No"
                  className="input input-bordered w-full"
                  {...register("senderContact", { required: true })}
                />

                <select
                  className="select select-bordered w-full"
                  {...register("senderRegion", { required: true })}
                >
                  <option value="">Select Region</option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                </select>

                <select
                  className="select select-bordered w-full"
                  {...register("senderCenter", { required: true })}
                >
                  <option value="">Select Service Center</option>
                  <option>Dhaka Hub</option>
                  <option>Chittagong Hub</option>
                </select>

                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full"
                  {...register("senderAddress", { required: true })}
                />

                <textarea
                  placeholder="Pickup Instruction"
                  className="textarea textarea-bordered w-full"
                  {...register("pickupInstruction", { required: true })}
                />
              </div>
            </div>

            {/* Receiver Info */}
            <div>
              <h3 className="font-semibold text-teal-900 mb-4">
                Receiver Details
              </h3>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Receiver Name"
                  className="input input-bordered w-full"
                  {...register("receiverName", { required: true })}
                />

                <input
                  type="text"
                  placeholder="Receiver Contact No"
                  className="input input-bordered w-full"
                  {...register("receiverContact", { required: true })}
                />

                <select
                  className="select select-bordered w-full"
                  {...register("receiverRegion", { required: true })}
                >
                  <option value="">Select Region</option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                </select>

                <select
                  className="select select-bordered w-full"
                  {...register("receiverCenter", { required: true })}
                >
                  <option value="">Select Service Center</option>
                  <option>Dhaka Hub</option>
                  <option>Chittagong Hub</option>
                </select>

                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full"
                  {...register("receiverAddress", { required: true })}
                />

                <textarea
                  placeholder="Delivery Instruction"
                  className="textarea textarea-bordered w-full"
                  {...register("deliveryInstruction", { required: true })}
                />
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            * PickUp Time 4pm-7pm Approx.
          </p>

          <button className="btn bg-lime-400 border-none text-black hover:bg-lime-500">
            Proceed to Confirm Booking
          </button>

        </form>
      </div>
    </div>
  );
};

export default SendParcel;