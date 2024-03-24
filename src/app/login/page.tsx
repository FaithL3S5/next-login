"use client";

import DarkModeToggleButton from "@/components/DarkModeToggleButton";
import Loader from "@/components/Loader";
import { UserData } from "@/globalredux/features/user/userSlice";
import { useAppSelector } from "@/globalredux/hooks";
import { encrypt, hasEmptyValue } from "@/reusables/helper";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

type pageProps = {};

const Page: React.FC<pageProps> = () => {
  const router = useRouter();

  // Get the user data from Redux store
  const user = useAppSelector((state) => state.user.user);

  // State variables for form handling
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userData, setUserData] = useState<Partial<UserData>>({
    nama: "",
    password: "",
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Handler function to update the state when input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update only the field that changed
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check for empty fields in user data
    const isUserDataEmpty = hasEmptyValue(userData);
    if (isUserDataEmpty[0]) {
      setError(`Invalid value on ${isUserDataEmpty[1].toUpperCase()}`);
      setIsSubmitting(false);
      return;
    }

    // Validate user credentials
    if (userData.nama !== user.nama || userData.password !== user.password) {
      setError("Invalid credentials");
      setIsSubmitting(false);
      return;
    }

    setError("");

    // Set session cookie upon successful login
    const expires = new Date(Date.now() + 60 * 1000);
    const session = await encrypt({ user, expires });
    setCookie("session", session, {
      expires,
      httpOnly: false,
      sameSite: "lax",
      secure: false,
    });

    // Redirect to profile page
    router.push("/profile");

    setIsSubmitting(false);
  };

  // Check if it's the user's first visit and redirect to register page if true
  useEffect(() => {
    const isFirstVisit = getCookie("isFirstVisit");

    if (!isFirstVisit) {
      setCookie("isFirstVisit", "false", {
        httpOnly: false,
        sameSite: "lax",
        secure: false,
      });

      router.push("/register");
    }
  }, []);

  return (
    <div className="grid grid-cols-2 h-screen w-screen">
      {/* Blue Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="flex bg-blue-900 dark:bg-orange-600 h-full items-center justify-center">
          {/* Donut Top Left */}
          <div className="absolute top-[-20rem] left-[-20rem] h-[40rem] w-[40rem] bg-transparent">
            {/* Outer circle */}
            <div className="h-full w-full rounded-full bg-neutral-50 opacity-5"></div>
            {/* Inner circle */}
            <div className="absolute inset-[11rem] h-58 w-58 rounded-full bg-blue-900 dark:bg-orange-600"></div>
          </div>
          {/* Content */}
          <div className="flex flex-col items-center gap-4">
            {/* Image and Title */}
            <div className="text-center">
              <Image src="/stone.jpg" width={400} height={400} alt="" />
            </div>
            <h2 className="text-center text-6xl font-bold text-white">LOREM</h2>
            {/* Text Carousel */}
            {/* Placeholder text */}
            <div className="text-center w-[50%] text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </div>
            {/* Text Carousel control */}
            {/* How to implement? */}
          </div>
          {/* Rectangles Bot Right */}
          <div className="absolute bottom-[-28rem] left-[40rem] h-[40rem] w-[40rem] bg-transparent">
            <div className="h-40 w-30 bg-neutral-50 opacity-5 rotate-[20deg]"></div>
          </div>
          <div className="absolute bottom-[-34rem] left-[30rem] h-[40rem] w-[40rem] bg-transparent">
            <div className="h-40 w-30 bg-neutral-50 opacity-5 rotate-[20deg]"></div>
          </div>
        </div>
      </div>

      {/* White Section */}
      <div className="relative overflow-hidden">
        {/* Dark mode toggle button */}
        <div className="absolute top-0 right-0 text-black mt-4 mr-4">
          <DarkModeToggleButton />
        </div>
        {/* Form Section */}
        <div className="flex bg-neutral-50 h-full items-center justify-center">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Title and Instruction */}
            <h2 className="text-6xl font-bold text-blue-900 dark:text-orange-600">
              Silahkan Login
            </h2>
            <div className="text-left text-gray-500">
              Masukkan username dan password Anda untuk masuk.
            </div>
            {/* Username Input */}
            <div>
              <label
                htmlFor="nama"
                className="block text-sm  leading-6 text-gray-500 font-bold"
              >
                Username
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  className="block w-full h-14 bg-transparent rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Username Anda..."
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold leading-6 text-gray-500"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password type
                  name="password"
                  id="password"
                  className="block w-full h-14 bg-transparent rounded-full border-0 py-1.5 pl-7 pr-14 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password Anda..."
                  onChange={handleInputChange}
                />
                {/* Password visibility toggle */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-8 text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEye className="text-blue-900 dark:text-orange-600" />
                  ) : (
                    <FaEye />
                  )}
                  {/* Toggle eye icon */}
                </button>
              </div>
            </div>
            {/* Error message */}
            <p
              className={`${
                error.length < 1 ? "invisible" : ""
              } text-red-500 text-sm font-bold mt-1 text-center`}
            >
              {error}
            </p>
            {/* Login Button and Register */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex mt-8 text-center justify-center items-center w-full h-14 bg-blue-200 dark:bg-orange-100 rounded-full border-0 text-blue-900 dark:text-orange-600 font-bold ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {isSubmitting ? <Loader h="h-8" w="w-8" /> : "Masuk Sekarang"}
            </button>
            <div className="text-gray-500 text-center">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-bold text-blue-900 dark:text-orange-600"
              >
                Daftar Sekarang
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Page;
