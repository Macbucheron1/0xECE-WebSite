"use client"; // Enable client-side rendering

// Import necessary hooks and context
import { useState, useContext, useEffect } from "react";
import ContextTest from "../components/contexts/UserContext";
import about from "../../locales/about.json";

// Define the About page component
/** About page component that displays information about the application.
 * Adjusts content based on the user's selected language.
 * @returns {JSX.Element} The rendered About page.
 */
export default function About() {
  // Retrieve the current user from the UserContext
  const { user } = useContext(ContextTest);
  // State to hold the text content based on the selected language
  const [text, setText] = useState(about.english);

  // Update the text content when the user's language preference changes
  useEffect(() => {
    if (user.language === "french") {
      setText(about.french); // Set text to French content
    } else {
      setText(about.english); // Set text to English content
    }
  }, [user]); // Depend on 'user' to trigger the effect when 'user' changes

  return (
    <ul className="p-6">
      {/* Display the main title */}
      <h1 className="wt-title">{text.title}</h1>
      {/* First card with information */}
      <li className="card mt-8">
        <h1 className="p-blue text-xl font-bold mb-4">
          {text.firstCardTitle}
        </h1>
        <p className="text-lg p-gray mb-2">{text.firstCardText1}</p>
        <p className="text-lg p-gray">{text.firstCardText2}</p>
      </li>
      <li className="mt-4">
        <ul className="flex flex-col md:flex-row gap-6">
          {/* Second card with additional information */}
          <li className="card flex-grow">
            <h1 className="p-blue text-xl font-bold mb-4">
              {text.secondCardTitle}
            </h1>
            <p className="text-lg p-gray">{text.secondCardText}</p>
          </li>
          {/* Third card with more information */}
          <li className="card flex-grow">
            <h1 className="p-blue text-xl font-bold mb-4">
              {text.thirdCardTitle}
            </h1>
            <p className="text-lg p-gray">{text.thirdCardText}</p>
          </li>
        </ul>
      </li>
    </ul>
  );
}
