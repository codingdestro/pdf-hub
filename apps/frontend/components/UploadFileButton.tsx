"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Image from "next/image";

interface Props {
  onFileSelected?: (file: FileList) => void;
}

const UploadFileButton = ({ onFileSelected }: Props) => {
  return (
    <Label>
      <Input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files;
          if (!file || file.length === 0) return;
          console.log(file?.[0].name);
          onFileSelected?.(file);
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

export default UploadFileButton;
