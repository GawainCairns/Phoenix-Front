import React from "react";

function Footer() {
  return (
    <div>
      <footer>
        <div className="fixed bottom-0 w-full p-4 text-center text-white bg-gray-800">
          &copy; {new Date().getFullYear()} Phoenix Surveys. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;