"use client";

import contact from "../../locales/contact.json";
import { useState, useContext, useEffect } from "react";
import ContextTest from "../components/contexts/UserContext";

/**
 * Contacts component renders a contact form with localized text based on user language.
 * @returns {JSX.Element} The rendered contact form.
 */
export default function Contacts() {
  // Extract user context
  const { user } = useContext(ContextTest);
  // State to manage the text content based on language
  const [text, setText] = useState(contact.english);

  // Effect to update text content when user language changes
  useEffect(() => {
    if (user.language === "french") {
      setText(contact.french);
    } else {
      setText(contact.english);
    }
  }, [user]);

  return (
    <div className="p-6 overflow-x-hidden">
      <div className="max-w-xl mx-auto">
        <h2 className="wt-title mb-6">{text.title}</h2>
        <form>
          <div className="mb-4">
            <label className="p-blue mb-2">{text.nameLabel}</label>
            <input
              type="text"
              className="input"
              id="name"
              placeholder={text.namePlaceholder}
              required
            />
          </div>
          <div className="mb-4">
            <label className="p-blue mb-2">{text.emailLabel}</label>
            <input
              type="email"
              className="input"
              id="email"
              placeholder={text.emailPlaceholder}
              required
            />
          </div>
          <div className="mb-4">
            <label className="p-blue mb-2">{text.messageLabel}</label>
            <textarea
              className="input"
              id="message"
              placeholder={text.messagePlaceholder}
              rows={4}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button className="button" type="submit">
              {text.sendButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
