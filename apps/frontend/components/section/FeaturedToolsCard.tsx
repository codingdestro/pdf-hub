import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  url: string;
  title: string;
}

const FeaturedToolsCard = ({ url, title }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center border rounded-lg shadow-md p-5 space-y-3 w-[340px] h-9/12 box-border">
      <Image src={url} alt="Merge PDF Icon" width={90} height={90} />
      <p className="text-sm text-center">{title}</p>
      <Button>Try Now</Button>
    </div>
  );
};

export default FeaturedToolsCard;
