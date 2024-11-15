"use client";

import contact from "../../locales/contact.json";
import { useState, useContext, useEffect } from "react";
import ContextTest from "../components/contexts/UserContext";

export default function Contacts() {
  const { user } = useContext(ContextTest);
  const [text, setText] = useState(contact.english);

  useEffect(() => {
    if (user.language === "french") {
      setText(contact.french);
    } else {
      setText(contact.english);
    }
  }, [user]);

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="wt-title mb-4">{text.title}</h2>
      <form className="w-full max-w-lg">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 p-blue"
            htmlFor="name"
          >
            {text.nameLabel}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder={text.namePlaceholder}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 p-blue"
            htmlFor="email"
          >
            {text.emailLabel}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder={text.emailPlaceholder}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 p-blue"
            htmlFor="message"
          >
            {text.messageLabel}
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            placeholder={text.messagePlaceholder}
            rows={4}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            {text.sendButton}
          </button>
        </div>
      </form>
    </div>
  );
}
