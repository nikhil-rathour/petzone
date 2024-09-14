import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Input from "../Components/Input";
import authService from "../appwrite/auth";
import { FaPaw, FaEnvelope, FaLock, FaUser } from "react-icons/fa";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-purple-100 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-6 text-white text-center">
          <FaPaw className="text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Welcome to PetZone</h2>
          <p className="mt-2 text-sm">Create your account and join our community!</p>
        </div>
        
        <div className="p-6 space-y-6">
          {error && <p className="text-red-600 text-center">{error}</p>}

          <form onSubmit={handleSubmit(create)} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              icon={<FaUser className="text-gray-400" />}
              {...register("name", { required: true })}
              className="bg-gray-50 text-gray-800 border focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200"
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              icon={<FaEnvelope className="text-gray-400" />}
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
              className="bg-gray-50 text-gray-800 border focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              icon={<FaLock className="text-gray-400" />}
              {...register("password", { required: true })}
              className="bg-gray-50 text-gray-800 border focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition duration-200 disabled:opacity-50 font-semibold text-lg shadow-md"
            >
              {isLoading ? "Creating Account..." : "Join PetZone"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-medium text-purple-600 hover:text-purple-500 transition duration-200"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
            <div className="animate-bounce">
              <FaPaw className="text-purple-500 text-5xl" />
            </div>
            <p className="mt-4 text-lg font-semibold text-purple-700">Creating your PetZone account...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;