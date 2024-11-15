"use client";

import { useState, useEffect, useCallback, use } from "react";
import dynamic from "next/dynamic";
import debounce from "lodash.debounce";
import "react-quill/dist/quill.snow.css";
import { useContext } from "react";
import ContextTest from "../../contexts/UserContext";
import userProfil from "../../../../locales/userProfil.json";

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
    setBio(value);
    debouncedUpdateBio(value);
  };

  useEffect(() => {
    if (user) {
      setBio(user.bio);
    }
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">
        {text.biotTitle}
      </h2>
      <ReactQuill
        className="custom-quill"
        theme="snow"
        value={bio}
        onChange={handleChange}
        placeholder={text.bioBody}
      />
      <style jsx global>{`
        .custom-quill .ql-toolbar {
          background-color: #2d3748; /* bg-gray-800 */
          border: none;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .custom-quill .ql-container {
          background-color: #1a202c; /* bg-gray-900 */
          color: #f7fafc; /* text-gray-100 */
          border: none;
        }
        .custom-quill .ql-editor {
          min-height: 150px;
          background-color: #1a202c;
          color: #f7fafc;
        }
        .custom-quill .ql-toolbar .ql-stroke {
          stroke: #f7fafc; /* text-gray-100 */
        }
        .custom-quill .ql-toolbar .ql-fill {
          fill: #f7fafc; /* text-gray-100 */
        }
      `}</style>
    </div>
  );
};

export default Bio;
