"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import debounce from "lodash.debounce";
import "react-quill/dist/quill.snow.css";
import { useContext } from "react";
import ContextTest from "../../contexts/UserContext";
import userProfil from "../../../../locales/userProfil.json";
import DOMPurify from "dompurify";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Bio = () => {
  const [bio, setBio] = useState("");
  const { user, updateBio } = useContext(ContextTest);
  const [text, setText] = useState(userProfil.english);

  useEffect(() => {
    if (user.language === "french") {
      setText(userProfil.french);
    } else {
      setText(userProfil.english);
    }
  }, [user]);

  const updateBioInDatabase = async (value: string) => {
    // Replace this with your actual API call to update the bio in Supabase

    updateBio(value);
  };

  // Debounce the update function
  const debouncedUpdateBio = useCallback(
    debounce(updateBioInDatabase, 2000),
    []
  );

  const handleChange = (value: string) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    setBio(sanitizedValue);
    debouncedUpdateBio(sanitizedValue);
  };

  // When setting the initial bio
  useEffect(() => {
    if (user) {
      const sanitizedBio = DOMPurify.sanitize(user.bio);
      setBio(sanitizedBio);
    }
  }, [user]);

  return (
    <div className="card mb-4">
      <h2 className="text-xl font-semibold mb-4 p-blue">{text.biotTitle}</h2>
      <ReactQuill
        className="custom-quill"
        theme="snow"
        value={bio}
        onChange={handleChange}
        placeholder={text.bioBody}
      />
      <style>{`
        .custom-quill .ql-container {
          background-color: #1a202c;
          color: #f7fafc;
          border: none;
        }
        .custom-quill .ql-editor {
          min-height: 150px;
          background-color: var(--input-bg-color);
          color: var(--input-text-color);
          border: none;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }

        .custom-quill .ql-toolbar {
          background-color: var(--quill-toolbar-bg);
          border: none;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .custom-quill .ql-toolbar .ql-picker,
        .custom-quill .ql-toolbar .ql-stroke,
        .custom-quill .ql-toolbar .ql-fill {
          color: var(--text-color);
          fill: var(--quill-toolbar-bg);
          stroke: var(--text-color);
        }
      `}</style>
    </div>
  );
};

export default Bio;
