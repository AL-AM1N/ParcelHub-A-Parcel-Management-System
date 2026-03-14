import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2"; // ⭐ UPDATED
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2,7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
}


const SendParcel = () => {
  const centers = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ⭐ UPDATED: get unique regions from loader data
  const regions = [...new Set(centers.map((c) => c.region))];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const weight = watch("weight");

  // ⭐ UPDATED: filter service centers by region
  const senderCenters = centers.filter((c) => c.region === senderRegion);
  const receiverCenters = centers.filter((c) => c.region === receiverRegion);

  const onSubmit = async (data) => {
    console.log(data);

    let cost = 0;
    let breakdown = "";

    // ⭐ UPDATED: check if same city
    const sameCity = data.senderCenter === data.receiverCenter;

    if (data.type === "document") {
      cost = sameCity ? 60 : 80;
      breakdown = `Document Delivery\nBase Cost: ৳${cost}`;
    } else {
      const w = parseFloat(data.weight || 0);

      if (w <= 3) {
        cost = sameCity ? 110 : 150;
        breakdown = `Non-Document (≤3kg)\nBase Cost: ৳${cost}`;
      } else {
        const extraWeight = w - 3;
        const extraCost = extraWeight * 40;

        if (sameCity) {
          cost = 110 + extraCost;
        } else {
          cost = 150 + extraCost + 40;
        }

        breakdown = `
Non-Document (>3kg)

Base Cost: ৳${sameCity ? 110 : 150}
Extra Weight: ${extraWeight}kg × ৳40 = ৳${extraCost}
Outside City Extra: ৳${sameCity ? 0 : 40}

Total: ৳${cost}
`;
      }
    }

    // ⭐ UPDATED: SweetAlert pricing popup
    Swal.fire({
      title: "Delivery Cost Breakdown",
      text: breakdown,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Continue Editing",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: cost,
          created_by: user.email,
          payment_status: "unpaid",
          delivery_status: "not_collected",
          creation_date: new Date().toISOString(),
          tracking_id: generateTrackingID()
        };
        console.log(parcelData);
        axiosSecure.post('/parcels', parcelData)
        .then(res => {
          console.log(res.data);
          if(res.data.insertedId) {
            // redirect to the payment page
            Swal.fire({
              title:"Redirecting...",
              text:"Proceeding to payment gateway.",
              icon: "success",
              timer:1500,
              showConfirmButton:false,
            });
          }
        })
      }
      
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-14 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-teal-900 mb-6">Send A Parcel</h1>

        <h2 className="text-lg font-semibold text-teal-900 mb-6">
          Enter your parcel details
        </h2>

        <div className="divider"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <div>
            <div className="flex gap-10 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                  className="radio radio-success"
                />
                <span>Document</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
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
                <p className="mb-1 text-sm">Parcel Name</p>
                <input
                  type="text"
                  placeholder="Parcel Name"
                  className="input input-bordered w-full"
                  {...register("title", { required: true })}
                />
              </div>

              {parcelType === "non-document" && (
                <div>
                  <p className="mb-1 text-sm">Parcel Weight (KG)</p>
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

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-semibold text-teal-900 mb-4">
                Sender Details
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm">Sender Name</p>
                  <input
                    type="text"
                    placeholder="Sender Name"
                    className="input input-bordered w-full"
                    {...register("senderName", { required: true })}
                  />
                </div>

                <div>
                  <p className="mb-1 text-sm">Sender Phone No</p>
                  <input
                    type="text"
                    placeholder="Sender Phone No"
                    className="input input-bordered w-full"
                    {...register("senderContact", { required: true })}
                  />
                </div>

                <div>
                  <p className="mb-1 text-sm">Select Region</p>
                  <select
                    className="select select-bordered w-full"
                    {...register("senderRegion", { required: true })}
                  >
                    <option value="">Select Region</option>

                    {/* ⭐ UPDATED: dynamic region list */}
                    {regions.map((region) => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-1 text-sm">Select Service Center</p>

                  <select
                    className="select select-bordered w-full"
                    {...register("senderCenter", { required: true })}
                  >
                    <option value="">Select Service Center</option>

                    {/* ⭐ UPDATED: dynamic service centers */}
                    {senderCenters.map((center) => (
                      <option key={center.city}>{center.city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-1 text-sm">Address</p>
                  <input
                    type="text"
                    placeholder="Address"
                    className="input input-bordered w-full"
                    {...register("senderAddress", { required: true })}
                  />
                </div>

                <div>
                  <p className="mb-1 text-sm">Pickup Instruction</p>
                  <textarea
                    placeholder="Pickup Instruction"
                    className="textarea textarea-bordered w-full"
                    {...register("pickupInstruction", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-teal-900 mb-4">
                Receiver Details
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm">Receiver Name</p>
                  <input
                    type="text"
                    placeholder="Receiver Name"
                    className="input input-bordered w-full"
                    {...register("receiverName", { required: true })}
                  />
                </div>

                <div>
                  <p className="mb-1 text-sm">Receiver Contact No</p>
                  <input
                    type="text"
                    placeholder="Receiver Contact No"
                    className="input input-bordered w-full"
                    {...register("receiverContact", { required: true })}
                  />
                </div>

                <div>
                  <p className="mb-1 text-sm">Select Region</p>
                  <select
                    className="select select-bordered w-full"
                    {...register("receiverRegion", { required: true })}
                  >
                    <option value="">Select Region</option>

                    {/* ⭐ UPDATED */}
                    {regions.map((region) => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-1 text-sm">Select Service Center</p>

                  <select
                    className="select select-bordered w-full"
                    {...register("receiverCenter", { required: true })}
                  >
                    <option value="">Select Service Center</option>

                    {/* ⭐ UPDATED */}
                    {receiverCenters.map((center) => (
                      <option key={center.city}>{center.city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-1 text-sm">Address</p>
                  <input
                    type="text"
                    placeholder="Address"
                    className="input input-bordered w-full"
                    {...register("receiverAddress", { required: true })}
                  />
                </div>

                <div>
                  <p className="mb-1 text-sm">Delivery Instruction</p>
                  <textarea
                    placeholder="Delivery Instruction"
                    className="textarea textarea-bordered w-full"
                    {...register("deliveryInstruction", { required: true })}
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500">* PickUp Time 4pm-7pm Approx.</p>

          <button className="btn bg-lime-400 border-none text-black hover:bg-lime-500">
            Proceed to Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
