'use client'
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  url: string;
  title: string;
  link:string
}

const FeaturedToolsCard = ({ url, title ,link}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center border rounded-lg shadow-md p-5 space-y-3 w-[340px] h-[232px] box-border ">
      <Image src={url} alt="Merge PDF Icon" width={90} height={90} />
      <p className="text-sm text-center">{title}</p>
      <Link href={link}>
        <Button  className="w-full cursor-pointer">
          Use Tool
        </Button>
      </Link>
    </div>

  );
};

export default FeaturedToolsCard;
