import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const {signIn} = useAuth();
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const from = location.state?.from || '/';


  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
    .then(result => {
      console.log(result.user);
      navigate(from);
    })
    .catch(error => {
      console.log(error);
    })
  };

  return (
    <div className="card w-full max-w-sm">
      <h1 className="text-5xl font-bold">Please Login</h1>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              className="input"
              placeholder="Password"
            />

            {/* handleding errors */}
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password id required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password must be 6 charecters</p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary text-black mt-4">Login</button>
          </fieldset>
          <p className="link link-hover">
                <small className="text-cyan-400 font-bold">
              New to this website?
                <Link to="/register" className="btn btn-link">Register</Link>
              </small>
            </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
