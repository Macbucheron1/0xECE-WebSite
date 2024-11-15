"use client";

import { useState, useContext, useEffect } from "react";
import ContextTest from "../../contexts/UserContext";
import userProfil from "../../../../locales/userProfil.json";

const ProfilModal = ({ isOpen, onClose, newLinkProvider }) => {
  const [linkValue, setLinkValue] = useState("");
  const { user } = useContext(ContextTest);
  const [text, setText] = useState(userProfil.english);

  useEffect(() => {
    if (user.language === "french") {
      setText(userProfil.french);
    } else {
      setText(userProfil.english);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (newLinkProvider === "linkedin") {
        setLinkValue(user.linkedin_url || "");
      } else if (newLinkProvider === "rootme") {
        setLinkValue(user.rootme_url || "");
      } else if (newLinkProvider === "tryhackme") {
        setLinkValue(user.tryhackme_url || "");
      } else if (newLinkProvider === "htb") {
        setLinkValue(user.htb_url || "");
      }
    }
  }, []);

  const handleModalClose = () => {
    onClose(linkValue);
    setLinkValue("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="card">
        <h2 className="text-xl p-white font-semibold mb-4">{text.linkTitle}</h2>
        <input
          type="text"
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
          className="input mb-4"
          placeholder={text.linkBody}
        />
        <button
          onClick={handleModalClose}
          className="button"
        >
          {text.linkSubmit}
        </button>
      </div>
    </div>
  );
};

export default ProfilModal;
