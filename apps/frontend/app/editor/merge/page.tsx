"use client";
import UploadMultipleFilesButton from "@/components/UploadMultipleFilesButton";
import React from "react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [isFileSelected, setIsFileSelected] = React.useState(false);
  return (
    <div className="flex flex-col items-center p-4 gap-2">
      <h1 className="text-2xl font-bold mb-4">Merge PDF Files</h1>
      <p className="mb-4 ">
        Here you can upload multiple PDF files to merge them into a single
        document.
      </p>
      <UploadMultipleFilesButton
        onFilesSelected={(files) => {
          setIsFileSelected(files.length > 0);
        }}
      />
      <Button
        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors ${isFileSelected ? "" : "opacity-50 cursor-not-allowed"}`}
      >
        Merge Files
      </Button>
      <p className="mt-4 text-sm text-gray-500">
        Note: You can upload multiple PDF files to merge.
      </p>
    </div>
  );
};

export default Page;
