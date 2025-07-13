import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import {ArrowRight} from "lucide-react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] bg-gray-100 text-center">
      <Image
        src="/icons/pdf-file-format.png"
        alt="PDF Editor Logo"
        width={150}
        height={150}
        className="mb-6"
      />
      <h1 className="text-xl sm:text-4xl font-bold capitalize">
        Effortless PDF Editing, Right in Your Browser
      </h1>
      <p className="text-sm sm:text-xl m-5">
        Edit, Convert, Merge, and Secure PDFs — All in One Powerful Platform
      </p>
      <Button>Login to start <ArrowRight></ArrowRight></Button>
    </div>
  );
};

export default Hero;
