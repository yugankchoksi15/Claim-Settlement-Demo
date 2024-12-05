"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginAPI } from "../api/ApiConfig/api";
import SmallLoadingSpinner from "../components/loader";
import { useRouter } from "next/navigation";
import "../CSS/login.css";

const SignUpPage = () => {
  const [loading, setloading] = useState(false);
  const router = useRouter();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik: any = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values: any) => {
      setloading(true);
      submitLogin(values);
    },
  });

  const submitLogin = async (values: any) => {
    try {
      const resp = await loginAPI(values); // API call
      if (resp) {
        localStorage.setItem("token", resp);
        router.push("/");
        setloading(false);

        setTimeout(() => {
          location.reload();
        }, 100);
      }
    } catch (error) {
      // Handle error (e.g., show a message to the user)
      setloading(false);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>

        <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
          <form
            className="max-w-lg w-full mx-auto"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-yellow-400">Login</h3>
            </div>

            {/* Email */}
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Email</label>
              <input
                name="email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                placeholder="Enter email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-2">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Password</label>
              <input
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                placeholder="Enter password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-2">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center mt-8">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 rounded"
                onChange={formik.handleChange}
              />
              <label
                htmlFor="remember-me"
                className="text-white ml-3 block text-sm"
              >
                I accept the{" "}
                <a
                  href="javascript:void(0);"
                  className="text-yellow-500 font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-transparent bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
              >
                {loading ? <SmallLoadingSpinner /> : "Login"}
              </button>
              <p className="text-sm text-white mt-8">
                don't have an account?{" "}
                <a
                  onClick={() => {router.push("/signup")}}
                  className="text-yellow-400 font-semibold hover:underline ml-1"
                >
                  Signup here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
