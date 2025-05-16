"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

type TProps = {
  status: "loading" | "idle" | "success";
  text: string;
};

const LoadingButton = ({ status, text }: TProps) => {
  const [delay, setDelay] = useState(false);

  useEffect(() => {
    if (!delay) {
      setTimeout(() => setDelay(true), 3000);
    }
  }, []); //eslint-disable-line

  if (delay) {
    <Button className="rounded-md px-5 py-2 bg-blue-400 cursor-pointer relative flex items-center justify-center">
      done!
    </Button>;
  }

  return (
    <div>
      <Button className="rounded-md px-5 py-2 bg-blue-400 cursor-pointer relative flex items-center justify-center">
        {status == "loading" && (
          <div className="absolute animate-spin">
            <LoaderCircle className="white" />
          </div>
        )}
        <span
          className={`${status == "loading" ? "opacity-0" : "opacity-100"}`}
        >
          {text}
        </span>
      </Button>
    </div>
  );
};

export default LoadingButton;
