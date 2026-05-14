import React from "react";

function Header() {
  return (
    <div>
      <header>
        <div className="fixed flex justify-between items-center z-50 top-0 left-0 right-0 w-full p-4 mb-5 mr-8 text-white bg-gray-800">
          <h1 className="text-2xl font-bold"><a href="/">Phoenix Surveys</a></h1>
          <h2 className="text-lg"><a href="/login">Login</a></h2>
        </div>
      </header>
    </div> 
  );
}

export default Header;