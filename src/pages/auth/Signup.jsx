import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { authcon } from "./authContext";
import axios from "axios";
const Signup = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { setLogin } = useContext(authcon);
  const handleInput = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const SignupAccount = async (e) => {
    e.preventDefault();
    try {
      const resq = await axios.post(
        "http://127.0.0.1:4000/api/v1/user/register",
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
      <form onSubmit={SignupAccount} className="p-9 bg flex flex-col gap-7">
        <h1 className="text-white text-center text-2xl">
          Create your account.
        </h1>
        <div className="flex flex-col gap-4">
          <label className="text-white" htmlFor="email">
            Username{" "}
          </label>
          <input
            className="px-2 py-1 outline-0 border-0"
            type="text"
            name="username"
            onChange={handleInput}
          />
        </div>
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
        <div className="flex flex-col gap-4">
          <label className="text-white" htmlFor="email">
            Confirm-Password{" "}
          </label>
          <input
            className="px-2 py-1 outline-0 border-0"
            type="password"
            name="cpassword"
            onChange={handleInput}
          />
        </div>
        <p className="text-red-500 text-center">{error && error}</p>
        <button className="py-2 px-4 text-[18px]  bg-yellow-500 rounded-md">
          Create account
        </button>
        <h1 className="text-white flex items-center justify-center gap-3">
          Already have account?
          <h1
            className="text-yellow-500 cursor-pointer"
            onClick={() => setLogin(true)}
          >
            Login
          </h1>
        </h1>
      </form>
    </>
  );
};

export default Signup;
