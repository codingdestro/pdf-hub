import Link from "next/link";
import React from "react";

const quickLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Extract Pages",
    url: "/",
  },
  {
    name: "Remove Pages",
    url: "/",
  },
];

const connectLinks = [
  {
    name: "twitter",
    url: "/",
  },
  {
    name: "intagram",
    url: "/",
  },
  {
    name: "github",
    url: "/",
  },
  {
    name: "facebook",
    url: "/",
  },
];

const Footer = () => {
  return (
    <section className="p-9 mn-h[40vh] bg-gray-700/10 border-t-amber-300 border-t-8" id="about">
      <div className="flex flex-wrap items-start justify-center gap-y-5 gap-x-[20%]">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="font-bold text-2xl">Quick Links</h1>
          <ul className="text-center">
            {quickLinks.map((ele, idx) => (
              <li key={idx} className="py-1">
                <Link href={ele.url} className="hover:underline">{ele.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="font-bold text-2xl">Connect</h1>
          <ul className="text-center capitalize">
            {connectLinks.map((ele, idx) => (
              <li key={idx} className="py-1">
                <Link href={ele.url} className="hover:underline">{ele.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center py-9 text-sm font-semibold">
        © 2025 Luxe Editor. All rights reserved.
      </div>
    </section>
  );
};

export default Footer;
