import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { authcon } from "./authContext";
import axios from "axios";

const Login = () => {
  const { setLogin } = useContext(authcon);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const LoginHandler = async (e) => {
    e.preventDefault();
    try {
      const resq = await axios.post(
        "http://127.0.0.1:4000/api/v1/user/login",
        data
      );

      console.log(resq);
      setError(resq.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={LoginHandler} className="p-9 bg flex flex-col gap-7">
        <h1 className="text-white text-center text-2xl">
          Login into your account.
        </h1>
        <div className="flex flex-col gap-4">
          <label className="text-white" htmlFor="email">
            Email{" "}
          </label>
          <input
            className="px-2 py-1 outline-0 border-0"
            type="email"
            name="email"
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-white" htmlFor="email">
            Password{" "}
          </label>
          <input
            className="px-2 py-1 outline-0 border-0"
            type="password"
            name="password"
            onChange={handleInput}
          />
        </div>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="rem" />
            <label htmlFor="rem">Remember me?</label>
          </div>
          <NavLink className="text-yellow-400" to="#">
            Forgot password?
          </NavLink>
        </div>
        <p className="text-red-500 text-center">{error && error}</p>

        <button className="py-2 px-4 text-[18px]  bg-yellow-500 rounded-md">
          Login
        </button>
        <h1 className="text-white flex items-center justify-center gap-3">
          Dont' have account?
          <h1
            onClick={() => {
              setLogin(false);
            }}
            className="text-yellow-500 cursor-pointer"
          >
            Signup
          </h1>
        </h1>
      </form>
    </>
  );
};

export default Login;
