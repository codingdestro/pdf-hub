"use client";
import React from "react";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Image from "next/image";

interface Props {
  onFilesSelected?: (files: FileList) => void;
}

const UploadMultipleFilesButton = ({ onFilesSelected }: Props) => {
  return (
    <Label>
      <Input
        type="file"
        accept=".pdf"
        className="hidden"
        multiple
        onChange={(e) => {
          const file = e.target.files;
          if (!file || file.length < 2) {
            alert("Please select at least 2 files to upload.");
            return;
          }
          onFilesSelected?.(file);
        }}
      />
      <div className="flex flex-col items-center justify-center cursor-pointer p-4 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors gap-2">
        <Image
          src="/icons/pdf.png"
          alt="Upload Icon"
          width={48}
          height={48}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        />
        <span className="">Upload PDF</span>
      </div>
    </Label>
  );
};

export default UploadMultipleFilesButton;
