import React from "react";

export default function Footer() {
  return (
      <footer className="fixed bottom-0 w-full p-4 bg-gray-800">
        <div className="text-center text-white">
          &copy; {new Date().getFullYear()} Phoenix Surveys. All rights reserved.
          {/* Future footer links can go here */}
        </div>
      </footer>
  );
}

