"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faGlobe } from "@fortawesome/free-solid-svg-icons";
import ContextTest from "../components/contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import settings from "../../locales/settings.json";

const SettingsPage = () => {
  const { user, updateTheme, udpateLanguage } = useContext(ContextTest);
  const [text, setText] = useState(settings.english);

  useEffect(() => {
    if (user.language === "french") {
      setText(settings.french);
    } else {
      setText(settings.english);
    }
  }, [user]);

  const toggleTheme = () => {
    updateTheme(user.theme === "Dark" ? "Light" : "Dark");
  };

  const handleLanguageChange = (lang) => {
    udpateLanguage(lang);
  };

  return (
    <div className={`min-h-screen p-8`}>
      <h1 className="text-2xl font-bold mb-6">{text.title}</h1>

      {/* Theme */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{text.theme}</h2>
        <div className="flex items-center">
          <button
            className={`mr-4 focus:outline-none ${
              user.theme === "Dark"
                ? "bg-[#232936] text-gray-400 hover:bg-[#2a3241]"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } rounded-md px-3 py-2 transition-colors`}
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
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{text.language}</h2>
        <button
          className={`bg-[#232936] rounded-lg px-4 py-2 flex items-center justify-between w-full focus:outline-none ${
            user.theme === "Dark"
              ? "text-gray-100 hover:bg-[#2a3241]"
              : "text-gray-800 bg-gray-200 hover:bg-gray-200"
          } transition-colors`}
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
