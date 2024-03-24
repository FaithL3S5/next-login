"use client";

import Loader from "@/components/Loader";
import { UserData, editUser } from "@/globalredux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/globalredux/hooks";
import {
  areObjectsEqual,
  encrypt,
  getSession,
  hasEmptyValue,
  logout,
} from "@/reusables/helper";
import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaRegCircleUser,
  FaPencil,
  FaArrowRight,
  FaGgCircle,
  FaEye,
} from "react-icons/fa6";
import { RiLogoutBoxFill } from "react-icons/ri";

type editUser = {
  nama: string;
  phone: string;
  oldPassword: string;
  newPassword: string;
};

type pageProps = {};

const Page: React.FC<pageProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const checkCurrentUser = async () => {
    const session = await getSession();

    if (!session) return;

    if (session && !areObjectsEqual(user, session.user)) {
      dispatch(editUser(session.user));
    }
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userData, setUserData] = useState<Partial<editUser>>({
    nama: user.nama,
    phone: user.phone,
    oldPassword: "",
    newPassword: "",
  });

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };

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
    // Use spread operator to update the state, preserving other values
    setUserData({
      ...userData,
      [name]: value, // Update only the field that changed
    });
  };

  // Handler function to update the state when input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Use spread operator to update the state, preserving other values
    setUserData({
      ...userData,
      [name]: value, // Update only the field that changed
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (userData.oldPassword !== user.password) {
      setError("Old password do not match our record");
      setIsSubmitting(false);
      return;
    }

    const isUserDataEmpty = hasEmptyValue(userData);

    if (isUserDataEmpty[0]) {
      setError(`Invalid value on ${isUserDataEmpty[1].toUpperCase()}`);
      setIsSubmitting(false);
      return;
    }
    // Passwords match, continue with form submission
    setError("");

    const newUserInfo = {
      nama: userData.nama,
      phone: userData.phone,
      password: userData.newPassword,
    };

    dispatch(editUser(newUserInfo));
    const expires = new Date(Date.now() + 60 * 1000);
    const session = await encrypt({ user: newUserInfo, expires });

    setCookie("session", session, {
      expires,
      httpOnly: false,
      sameSite: "lax",
      secure: false,
    });
    setIsSubmitting(false);
  };

  const logOut = async () => {
    const session = await getSession();

    if (!session) {
      dispatch(
        editUser({
          nama: "",
          phone: "",
          password: "",
        })
      );
      return;
    }

    dispatch(editUser(session.user));
    await logout();
    router.push("/login");
  };

  useEffect(() => {
    checkCurrentUser();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex bg-blue-900 dark:bg-orange-600 items-center justify-center">
          <div className="flex w-3/4 justify-between py-4">
            <div className="text-6xl text-gray-400">
              <FaGgCircle />
            </div>
            <div></div>
            <div className="text-6xl text-gray-400">
              <FaRegCircleUser />
            </div>
          </div>
        </div>
        <div className="flex bg-blue-900 dark:bg-orange-600 h-[5vh] border-solid border-t border-white justify-center items-center">
          <div className="invisible">banner</div>
        </div>
        <div className="flex flex-1 bg-neutral-50 text-black">
          <div className="w-3/4 mx-auto py-8">
            <div className="rounded-md bg-blue-900 dark:bg-orange-600 text-white items-center justify-center text-center space-y-2 py-6">
              <div className="text-4xl font-bold">LOREM</div>
              <div className="w-1/2 text-center mx-auto">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Laborum ipsam neque rem, accusamus esse similique aliquid
                placeat quo ex voluptatibus quam beatae, officia dolore corrupti
                optio inventore deleniti exercitationem molestias.
              </div>
            </div>
            <div className="flex justify-between items-center pl-8 mt-8">
              <div className="flex items-center justify-center text-lg font-bold gap-4">
                <div className="text-6xl text-gray-500">
                  <FaRegCircleUser />
                </div>
                <div>Noname</div>
              </div>
              <div>
                <button className="flex items-center justify-center rounded-full bg-blue-200 dark:bg-orange-100 py-4 px-12 text-blue-900 dark:text-orange-600 font-bold">
                  <span className="mr-2">
                    <FaPencil />
                  </span>{" "}
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="flex gap-12 pl-8 mt-[6rem]">
              <div className="w-1/4 h-[50rem] border-solid border-r border-black flex flex-col justify-between">
                <div>
                  <div className="flex items-center text-lg text-gray-500 gap-4">
                    <div className="text-2xl">
                      <FaRegCircleUser />
                    </div>
                    <div>Profile</div>
                  </div>
                </div>
                <Link href="/login" onClick={logOut}>
                  <div className="flex items-center text-lg text-red-500 gap-4 pb-12 pt-8 border-solid border-t border-gray-500 mr-10">
                    <div className="text-2xl">
                      <RiLogoutBoxFill />
                    </div>
                    <div>Logout</div>
                  </div>
                </Link>
              </div>
              <div className="w-full">
                <form
                  onSubmit={handleSubmit}
                  className="w-full bg-neutral-50 border-solid border border-gray rounded-md shadow-md py-8 px-12"
                >
                  <div className="flex items-center font-bold text-2xl border-solid border-b border-gray-300 pb-4">
                    <span className="mr-3">
                      <FaPencil />
                    </span>{" "}
                    Edit Profile
                  </div>
                  {/* Inputs... */}
                  {/* Nama Input */}
                  <div className="mt-8">
                    <label
                      htmlFor="nama"
                      className="block text-sm leading-6 text-gray-500 font-bold"
                    >
                      Nama
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="text"
                        name="nama"
                        id="nama"
                        value={userData.nama}
                        className="block w-full h-12 bg-transparent rounded-full border-0 py-1.5 pl-7 pr-7 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {/* Phone Input */}
                  <div className="mt-8">
                    <label
                      htmlFor="phone"
                      className="block text-sm leading-6 text-gray-500 font-bold"
                    >
                      No Handphone
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={userData.phone}
                        className="block w-full h-12 bg-transparent rounded-full border-0 py-1.5 pl-7 pr-7 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handlePhoneInputChange}
                      />
                    </div>
                  </div>
                  {/* Password Input */}
                  <div className="mt-8">
                    <label
                      htmlFor="oldPassword"
                      className="block text-sm font-bold leading-6 text-gray-500"
                    >
                      Old Password
                    </label>
                    <div className="relative mt-2">
                      <input
                        type={showOldPassword ? "text" : "password"} // Toggle between text and password type
                        name="oldPassword"
                        id="oldPassword"
                        className="block w-full h-12 bg-transparent rounded-full border-0 py-1.5 pl-7 pr-14 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        onClick={toggleOldPasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-8 text-gray-500 focus:outline-none"
                      >
                        {showOldPassword ? (
                          <FaEye className="text-blue-900 dark:text-orange-600" />
                        ) : (
                          <FaEye />
                        )}{" "}
                        {/* Toggle eye icon */}
                      </button>
                    </div>
                  </div>
                  {/* Password Input */}
                  <div className="mt-8">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-bold leading-6 text-gray-500"
                    >
                      New Password
                    </label>
                    <div className="relative mt-2">
                      <input
                        type={showNewPassword ? "text" : "password"} // Toggle between text and password type
                        name="newPassword"
                        id="newPassword"
                        className="block w-full h-12 bg-transparent rounded-full border-0 py-1.5 pl-7 pr-14 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        onClick={toggleNewPasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-8 text-gray-500 focus:outline-none"
                      >
                        {showNewPassword ? (
                          <FaEye className="text-blue-900 dark:text-orange-600" />
                        ) : (
                          <FaEye />
                        )}{" "}
                        {/* Toggle eye icon */}
                      </button>
                    </div>
                  </div>
                  {/* error message */}
                  <p
                    className={`${
                      error.length < 1 ? "invisible" : ""
                    } text-red-500 text-sm font-bold mt-8 text-center`}
                  >
                    {error}
                  </p>
                  {/* Edit Profile Button with Arrow */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center items-center rounded-full bg-blue-200 dark:bg-orange-100 py-4 px-12 mt-4 text-blue-900 dark:text-orange-600 font-bold"
                  >
                    {isSubmitting ? <Loader h="h-8" w="w-8" /> : "Edit Profile"}
                    <span className="ml-2">
                      <FaArrowRight />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-blue-900 dark:bg-orange-600 items-center justify-center pt-8 pb-16">
          <div className="w-3/4">
            <div className="text-gray-400 text-9xl">
              <FaGgCircle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
