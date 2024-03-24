"use client";

import { usePathname } from "next/navigation";
import React from "react";
import DarkModeToggleButton from "./DarkModeToggleButton";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const pathName = usePathname();

  const showHeader = pathName === "/register" || pathName === "/profile";

  return (
    <>
      {showHeader && (
        <div className="flex justify-end m-4">
          <DarkModeToggleButton />
        </div>
      )}
    </>
  );
};
export default Header;
