import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 w-full p-4 text-white bg-gray-800">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold"><a href="/">Phoenix Surveys</a></h1>
        {/*
        when user is logged in:
        change the phoenix survey text to a home icon that links to the dashboard
        survey icon with dropdown for creating new survey and viewing surveys
        dropdown options:
        - public surveys
        - create new survey
        - view my surveys
        - view responses
        profile icon with dropdown for account settings and logout
        dropdown options:
        - profile
        - logout
        */}
      </div>
    </header>
  );
}