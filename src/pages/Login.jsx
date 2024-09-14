import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import AuthService from "../appwrite/auth";
import { FaPaw } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setIsLoading(true);

    try {
      const session = await AuthService.login(data);
      if (session) {
        const userData = await AuthService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#C499F3] via-[#F2AFEF] to-[#7360DF]">
      <div className="mx-auto w-full max-w-lg bg-white rounded-2xl p-10 shadow-lg border border-gray-200">
        <div className="mb-6 flex justify-center">
          <FaPaw className="text-pink-500 text-5xl" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-800 leading-tight">
          Welcome Back to PetZone
        </h2>
        <p className="mt-2 text-center text-lg text-gray-600">
          Don't have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-pink-500 transition duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition duration-200 disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
              <p className="mt-4 text-lg font-semibold text-pink-500">Signing In...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;



