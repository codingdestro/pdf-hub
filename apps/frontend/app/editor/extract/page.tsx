"use client";
import { Button } from "@/components/ui/button";
import UploadFileButton from "@/components/UploadFileButton";
import React from "react";

const Page = () => {
  const [isFileSelected, setIsFileSelected] = React.useState(false);
  return (
    <div className="flex flex-col items-center p-4 gap-2">
      <h1 className="text-2xl font-bold mb-4">Extract Pages From PDF File</h1>
      <p className="mb-4 ">
        Here you can upload a PDF file to extract or remove specific pages from it.
      </p>
      <UploadFileButton
        onFileSelected={(files) => {
          setIsFileSelected(files.length > 0);
        }}
      />
      <div className="flex items-center justify-center gap-2  mt-4">
        <Button
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors ${isFileSelected ? "" : "opacity-50 cursor-not-allowed"}`}
        >
          Extract Pages
        </Button>
        <span className="text-gray-500 ">or</span>
        <Button
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors ${isFileSelected ? "" : "opacity-50 cursor-not-allowed"}`}
        >
          Remove Pages
        </Button>
      </div>
    </div>
  );
};

export default Page;
