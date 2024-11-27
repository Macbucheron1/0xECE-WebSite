"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabaseClient";
import ContextTest from "../../components/contexts/UserContext";
import writeups from "../../../locales/writeups.json";

/**
 * React component for publishing a new write-up.
 * Allows users to input write-up details and submit them to the database.
 */
export default function PublishWriteUp() {
  const router = useRouter();
  const { user } = useContext(ContextTest);
  // State to manage form inputs
  const [formData, setFormData] = useState({
    ctfName: "",
    challengeName: "",
    type: "",
    writeUp: "",
  });
  // State to control the display of the confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false);
  // State to handle localized text based on user language
  const [text, setText] = useState(writeups.english);

  // Update localized text when user language changes
  useEffect(() => {
    if (user.language === "french") {
      setText(writeups.french);
    } else {
      setText(writeups.english);
    }
  }, [user]);

  /**
   * Handles the submission of the write-up form.
   * Validates input and inserts new write-up into the database.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const publishWriteUp = async (e) => {
    e.preventDefault();
    const { ctfName, challengeName, type, writeUp } = formData;
    // Validate that all required fields are filled
    if (!ctfName || !challengeName || !type || !writeUp) {
      alert(text.newAlert);
      return;
    }
    // Combine CTF name and challenge name to create the title
    const title = ctfName + ": " + challengeName;
    const { data, error } = await supabase.from("writeups").insert([
      {
        title: title,
        type: type,
        content: writeUp,
        username: user.username,
        user_uid: user.id,
        date: new Date().toISOString(),
      }, // INSERT INTO writeups (title, type, content, username, date) VALUES (title, type, writeUp, user.username, NOW())
    ]);
    if (error) {
      console.log(error);
    } else {
      // Show confirmation message upon successful submission
      setShowConfirmation(true);
      console.log(data);
    }
  };

  return (
    <div className="p-6 overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <h2 className="wt-title mb-6">{text.newTitle}</h2>
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="card text-center">
              <p className="p-gray mb-4">{text.newSuccess}</p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => router.push("/writeUps")}
              >
                {text.newQuit}
              </button>
            </div>
          </div>
        )}
        {!showConfirmation && (
          <form onSubmit={publishWriteUp}>
            <div className="mb-4">
              <label className="p-blue mb-2">{text.newUsername}</label>
              <input
                type="text"
                className="input"
                value={user?.username || ""}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="p-blue mb-2">{text.newCTF}</label>
              <input
                type="text"
                className="input"
                value={formData.ctfName}
                onChange={(e) =>
                  setFormData({ ...formData, ctfName: e.target.value })
                }
                maxLength={30}
                placeholder="Hack The Box"
                required
              />
              {formData.ctfName.length === 30 && (
                <p className="text-red-500">{text.newCTFMaxSize}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="p-blue mb-2">{text.newChallenge}</label>
              <input
                type="text"
                className="input"
                value={formData.challengeName}
                onChange={(e) =>
                  setFormData({ ...formData, challengeName: e.target.value })
                }
                maxLength={30}
                placeholder="Eternal Blue"
                required
              />
              {formData.challengeName.length === 30 && (
                <p className="text-red-500">{text.newChallengeMaxSize}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="p-blue mb-2">Type</label>
              <input
                type="text"
                className="input"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                maxLength={30}
                placeholder="Forensic"
                required
              />
              {formData.type.length === 30 && (
                <p className="text-red-500">{text.newTypeMaxSize}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block p-blue mb-2">Write-up (Markdown)</label>
              <textarea
                className="input"
                rows={10}
                value={formData.writeUp}
                onChange={(e) =>
                  setFormData({ ...formData, writeUp: e.target.value })
                }
                maxLength={7000}
                required
              ></textarea>
              {formData.writeUp.length === 7000 && (
                <p className="text-red-500">{text.newTextMaxSize}</p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                className="text-white font-semibold py-2 px-4 rounded mr-6 bg-gray-700 hover:bg-gray-600"
                type="button"
                onClick={() => router.push("/writeUps")}
              >
                {text.newCancelButton}
              </button>
              <button className="button" type="submit">
                {text.newSubmitButton}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
