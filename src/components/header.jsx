import React from "react";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 p-4 bg-gray-800 shadow-md">
      <div className="container flex items-center justify-between mx-auto">
        <div className="text-xl font-bold text-white" href="#">BrandLogo</div>
        <div className="hidden space-x-6 md:flex">
          <a href="/" className="text-gray-300 hover:text-white">Home</a>
          <a href="/services" className="text-gray-300 hover:text-white">Services</a>
          <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
          <a href="/about" className="text-gray-300 hover:text-white">About</a>
          <a href="/login" className="text-gray-300 hover:text-white">Login</a>
        </div>
      </div>
    </nav>
  );
}