import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function CreateSurvey() {
  return (
    <div>
      <Header />
      Survey name
      Survey description
      Questions
      - Question type (multiple choice, text, etc.)
      - Question text
      - Options (for multiple choice)
      Save button
      <Footer />
    </div>
  );
}