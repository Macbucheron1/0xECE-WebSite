"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faGlobe } from "@fortawesome/free-solid-svg-icons";
import ContextTest from "../components/contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import settings from "../../locales/settings.json";

/**
 * SettingsPage component renders the user settings page,
 * allowing users to toggle theme and language preferences.
 *
 * @returns {JSX.Element} The settings page component.
 */
const SettingsPage = () => {
  /**
   * Context providing user data and functions to update theme and language.
   */
  const { user, updateTheme, udpateLanguage } = useContext(ContextTest);

  /**
   * State holding localized text based on user's language preference.
   */
  const [text, setText] = useState(settings.english);

  useEffect(() => {
    // Update the text state when the user's language changes
    if (user.language === "french") {
      setText(settings.french);
    } else {
      setText(settings.english);
    }
  }, [user]);

  /**
   * Toggles the theme between 'Dark' and 'Light' modes.
   */
  const toggleTheme = () => {
    updateTheme(user.theme === "Dark" ? "Light" : "Dark");
  };

  /**
   * Updates the user's language preference.
   *
   * @param {string} lang - The new language to set ('english' or 'french').
   */
  const handleLanguageChange = (lang) => {
    udpateLanguage(lang);
  };

  return (
    <div className={`min-h-screen p-8 max-w-xl mx-auto`}>
      <h1 className="wt-title mb-6">{text.title}</h1>

      {/* Theme */}
      <div className="mb-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">{text.theme}</h2>
        <div className="flex items-center">
          <button
            className={`mr-4 focus:outline-none settings rounded-md px-3 py-2 transition-colors`}
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={user.theme === "Dark" ? faMoon : faSun}
              className="h-5 w-5"
            />
          </button>
          <span
            className={`${
              user.theme === "Dark" ? "text-gray-400" : "text-gray-700"
            }`}
          >
            {user.theme === "Dark" ? text.dark : text.light}
          </span>
        </div>
      </div>

      {/* Language */}
      <div className="mb-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">{text.language}</h2>
        <button
          className={`bg-[#232936] rounded-lg px-4 py-2 flex items-center justify-between w-full focus:outline-none settings transition-colors`}
          onClick={() =>
            handleLanguageChange(
              user.language === "english" ? "french" : "english"
            )
          }
        >
          <span>{user.language === "english" ? "English" : "Français"}</span>
          <FontAwesomeIcon icon={faGlobe} className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
