import React from "react";

const Login = () => {
  return (
    <form>
      <fieldset className="fieldset">
        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />
        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </form>
  );
};

export default Login;
