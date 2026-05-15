import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 w-full p-4 text-white bg-gray-800">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold"><a href="/">Phoenix Surveys</a></h1>
        <h2 className="text-lg"><a href="/login">Login</a></h2>
      </div>
    </header>
  );
}