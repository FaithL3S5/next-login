"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useAppDispatch } from "@/globalredux/hooks";
import { editUser } from "@/globalredux/features/user/userSlice";
import type { UserData } from "@/globalredux/features/user/userSlice";
import { hasEmptyValue } from "@/reusables/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

type pageProps = {};

const Page: React.FC<pageProps> = () => {
  const router = useRouter();

  // Redux dispatch function
  const dispatch = useAppDispatch();

  // State variables for form handling
  const [userData, setUserData] = useState<Partial<UserData>>({
    nama: "",
    phone: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // State variables for password visibility toggling
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  // Handler function to limit phone number input to 16 characters and allow only numbers
  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Limit to 16 characters
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    // Allow only numbers
    const newValue = value.replace(/[^\d]/g, "");
    // Update the input value
    e.target.value = newValue;

    const { name } = e.target;
    // Update only the field that changed
    setUserData({
      ...userData,
      [name]: value,
    });
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

  // Handler function for confirm password input change
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if passwords match
    if (userData.password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    // Check for empty fields in user data
    const isUserDataEmpty = hasEmptyValue(userData);
    if (isUserDataEmpty[0]) {
      setError(`Invalid value on ${isUserDataEmpty[1].toUpperCase()}`);
      setIsSubmitting(false);
      return;
    }

    // Clear error state
    setError("");

    // Dispatch action to edit user data
    dispatch(editUser(userData));

    // Redirect to login page
    router.push("/login");

    setIsSubmitting(false);
  };

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <div className="flex bg-blue-900 dark:bg-orange-600 h-full items-center justify-center">
          {/* Logo top left */}
          <div className="absolute top-0 left-0 h-[10rem] w-[26rem] ml-8 z-[999]">
            <Image src="/logo.png" width={480} height={320} alt="" />
          </div>
          {/* Donut Top Left */}
          <div className="absolute top-[-20rem] left-[-20rem] h-[40rem] w-[40rem] bg-transparent">
            <div className="h-full w-full rounded-full bg-neutral-50 opacity-5"></div>
            <div className="absolute inset-[11rem] h-58 w-58 rounded-full bg-blue-900 dark:bg-orange-600"></div>
          </div>
          {/* Regist form */}
          <form className="flex flex-col gap-4 z-[998]" onSubmit={handleSubmit}>
            <h2 className="text-6xl font-bold text-neutral-50 ">
              Daftarkan Akun
            </h2>
            <div className="text-left text-neutral-50">
              Daftar akun Anda dengan mengisi form di bawah.
            </div>
            {/* Nama Input */}
            <div>
              <label
                htmlFor="nama"
                className="block text-sm leading-6 text-neutral-50 font-bold"
              >
                Nama
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  className="block w-full h-14 bg-transparent rounded-full border-0 py-1.5 pl-7 pr-7 text-white ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Ketik nama Anda di sini..."
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Phone Input */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm leading-6 text-neutral-50 font-bold"
              >
                Nomor Handphone
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="block w-full h-14 bg-transparent rounded-full border-0 py-1.5 pl-7 pr-7 text-white ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Nomor handphone Anda"
                  onChange={handlePhoneInputChange}
                />
              </div>
            </div>
            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold leading-6 text-neutral-50"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password type
                  name="password"
                  id="password"
                  className="block w-full h-14 bg-transparent rounded-full border-0 py-1.5 pl-7 pr-14 text-white ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Masukkan password Anda"
                  onChange={handleInputChange}
                />
                {/* Toggle eye icon */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-8 text-gray-500 focus:outline-none"
                >
                  {showPassword ? <FaEye className="text-white" /> : <FaEye />}{" "}
                </button>
              </div>
            </div>
            {/* Password Confirm Input */}
            <div>
              <label
                htmlFor="password-confirm"
                className="block text-sm font-bold leading-6 text-neutral-50"
              >
                Konfirmasi Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showConfirmPassword ? "text" : "password"} // Toggle between text and password type
                  name="password-confirm"
                  id="password-confirm"
                  className="block w-full h-14 bg-transparent rounded-full border-0 py-1.5 pl-7 pr-14 text-white ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Masukkan kembali password Anda"
                  onChange={handleConfirmPasswordChange}
                  value={confirmPassword}
                />
                {/* Toggle eye icon */}
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-8 text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <FaEye className="text-white" />
                  ) : (
                    <FaEye />
                  )}{" "}
                </button>
              </div>
            </div>
            {/* error message */}
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
              className="flex justify-center items-center mt-2 text-center w-full h-14 bg-blue-200 dark:bg-orange-100 rounded-full border-0 text-blue-900 dark:text-orange-600 font-bold ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {isSubmitting ? <Loader h="h-8" w="w-8" /> : "Daftar Sekarang"}
            </button>
            <div className="text-neutral-50 text-center">
              Sudah punya akun?{" "}
              <Link href="/login" className="font-bold text-neutral-50">
                Login Sekarang
              </Link>
            </div>
          </form>
          {/* Rectangles Bot Right */}
          <div className="absolute bottom-[-18rem] right-[-14rem] h-[40rem] w-[40rem] bg-transparent">
            <div className="h-40 w-[50rem] bg-neutral-50 opacity-5 rotate-[20deg]"></div>
          </div>
          <div className="absolute bottom-[-24rem] right-[-5rem] h-[40rem] w-[40rem] bg-transparent">
            <div className="h-40 w-[50rem] bg-neutral-50 opacity-5 rotate-[20deg]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
