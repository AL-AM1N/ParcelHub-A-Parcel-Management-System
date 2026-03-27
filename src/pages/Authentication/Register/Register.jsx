import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        // update userinfo in the database

        const userInfo = {
          email: data.email,
          role: "user", // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            console.log("profile name pic updated");
            navigate(from);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);

    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    const res = await axios.post(imageUploadUrl, formData);

    //console.log(res.data.data.url);
    setProfilePic(res.data.data.url);
  };

  return (
    <div>
      <div className="card w-full max-w-sm">
        <h1 className="text-4xl font-bold">Create an account!</h1>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* name field */}
              <label className="label">Your Name</label>
              <input
                type="text"
                {...register("name", {
                  required: true,
                })}
                className="input  w-full"
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
              {/* profile picture field */}
              <label className="label">Your Profile Picture</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="input  w-full"
                placeholder="Your Name"
              />

              {/* email field */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                })}
                className="input  w-full"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}

              {/* password field */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                className="input w-full"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">Password must be 6 charecters</p>
              )}

              <button className="btn btn-primary text-black mt-4">
                Register
              </button>
            </fieldset>
            <p className="link link-hover">
              <small className="text-cyan-400 font-bold">
                Already have an account!
                <Link to="/login" className="btn btn-link">
                  Login
                </Link>
              </small>
            </p>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
