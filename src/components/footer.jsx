import React from "react";

export default function Footer() {
  return (
    <footer className="py-8 text-white bg-gray-800">
      <div className="container flex flex-col items-center justify-between px-4 mx-auto md:flex-row">
        <div className="mb-4 md:mb-0">
          <span className="text-xl font-bold">BrandName</span>
        </div>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:text-gray-400">About</a></li>
          <li><a href="#" className="hover:text-gray-400">Services</a></li>
          <li><a href="#" className="hover:text-gray-400">Contact</a></li>
        </ul>
        <div className="mt-4 text-sm md:mt-0">
          &copy; 2024 BrandName. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

