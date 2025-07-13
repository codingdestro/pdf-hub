"use client";
import Link from "next/link";
import React from "react";

const navlinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/#about",
  },
  {
    name: "Services",
    href: "/#services",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Nav = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="w-full flex items-center justify-between px-5 py-3 border">
      <Link href={"/"} className="text-2xl font-bold">Luxe</Link>

      <div className="hidden sm:block">
        {navlinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-gray-700 hover:text-gray-900 hover:underline px-5 py-2 rounded-md text-sm font-medium"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="relative sm:hidden">
        <div className="fixed top-0 right-0 z-50 w-full flex flex-col items-end space-y-2">
          <button
            className="cursor-pointer text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md p-2 mt-2 mr-2 "
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div
            className={`${!isOpen ? "hidden" : "flex"} border h-screen flex-col bg-white p-5 w-48 shadow-lg`}
          >
            {navlinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
