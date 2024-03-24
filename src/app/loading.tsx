import Loader from "@/components/Loader";
import React from "react";

type loadingProps = {};

const Loading: React.FC<loadingProps> = () => {
  return (
    <div
      role="status"
      className="flex h-screen w-screen justify-center items-center text-center"
    >
      <Loader w="w-16" h="h-16" />
    </div>
  );
};
export default Loading;
