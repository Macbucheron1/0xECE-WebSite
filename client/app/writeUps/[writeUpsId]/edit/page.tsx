"use client";

import { useEffect, useState, useContext } from "react";
import { supabase } from "../../../../utils/supabaseClient";
import Link from "next/link";
import ContextTest from "../../../components/contexts/UserContext";

/**
 * React component for editing an existing write-up.
 * Allows the author to modify the write-up's content and title.
 * @param {Object} params - The parameters passed to the component.
 * @param {string} params.writeUpsId - The ID of the write-up to edit.
 */
export default function EditWriteUp({ params }) {
  const { writeUpsId } = params;
  // State to store the current write-up data
  const [writeUp, setWriteUp] = useState(null);
  const { user } = useContext(ContextTest);
  // State to manage form inputs
  const [formData, setFormData] = useState({
    ctfName: "",
    challengeName: "",
    content: "",
  });
  // State for error messages
  const [errorMessage, setErrorMessage] = useState("");
  // State to determine if the current user is the author
  const [isAuthor, setIsAuthor] = useState(false);

  // Fetch the write-up data from the database
  const fetchWriteUp = async () => {
    const { data, error } = await supabase
      .from("writeups")
      .select("*")
      .eq("id", writeUpsId)
      .single();
    if (error || !data) {
      console.log(error);
    } else {
      setWriteUp(data);
      // Split the title into CTF name and challenge name
      const [ctf, challenge] = data.title.split(":");
      setFormData({
        ctfName: ctf.trim(),
        challengeName: challenge.trim(),
        content: data.content,
      });
    }
  };

  // Check if the current user is the author of the write-up
  const checkAuthor = () => {
    if (user && writeUp) {
      setIsAuthor(user.id === writeUp.user_uid);
    }
  };

  // Use effects to fetch write-up and check author status
  useEffect(() => {
    fetchWriteUp();
  }, [writeUpsId]);

  useEffect(() => {
    checkAuthor();
  }, [user, writeUp]);

  if (!isAuthor) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <p>Vous n&apos;êtes pas autorisé à modifier ce write-up.</p>
          <Link href="/writeUps">
            <button className="button my-8">Retour</button>
          </Link>
        </div>
      </div>
    );
  }

  // Handle the update of the write-up in the database
  const handleUpdate = async () => {
    const { ctfName, challengeName, content } = formData;
    const title = `${ctfName}: ${challengeName}`;
    const { error } = await supabase
      .from("writeups")
      .update({
        title: title,
        content: content,
        date: new Date().toISOString(),
      })
      .eq("id", writeUpsId);
    if (error) {
      console.log(error);
      setErrorMessage("Erreur lors de la mise à jour du write-up.");
    } else {
      window.location.href = `/writeUps/${writeUpsId}`;
    }
  };

  return (
    <div className="p-6 overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center my-8">
          <Link href={`/writeUps/${writeUpsId}`}>
            <button className="button">Retour</button>
          </Link>
        </div>
        <h2 className="wt-title mb-6">Modifier le Write-Up</h2>
        <form>
          <label className="block mb-2">Nom du CTF</label>
          <input
            type="text"
            value={formData.ctfName}
            onChange={(e) =>
              setFormData({ ...formData, ctfName: e.target.value })
            }
            maxLength={30}
            className="input"
            placeholder="Hack The Box"
            required
          />
          {formData.ctfName.length === 30 && (
            <p className="text-red-500">
              La limite de 30 caractères est atteinte.
            </p>
          )}
          <p className="p-gray text-sm mb-4">
            {30 - formData.ctfName.length} caractères restants.
          </p>

          <label className="block mb-2">Nom du Challenge</label>
          <input
            type="text"
            value={formData.challengeName}
            onChange={(e) =>
              setFormData({ ...formData, challengeName: e.target.value })
            }
            maxLength={30}
            className="input"
            placeholder="Eternal Blue"
            required
          />
          {formData.challengeName.length === 30 && (
            <p className="text-red-500">
              La limite de 30 caractères est atteinte.
            </p>
          )}
          <p className="p-gray text-sm mb-4">
            {30 - formData.challengeName.length} caractères restants.
          </p>

          <label className="block mb-2">Contenu</label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            maxLength={7000}
            className="input"
            rows={10}
            required
          ></textarea>
          {formData.content.length === 7000 && (
            <p className="text-red-500">
              La limite de 7000 caractères est atteinte.
            </p>
          )}
          <p className="p-gray text-sm mb-4">
            {7000 - formData.content.length} caractères restants.
          </p>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div className="flex justify-end">
            <button
              type="button"
              className="text-white font-semibold py-2 px-4 rounded mr-6 bg-gray-700 hover:bg-gray-600"
              onClick={() => (window.location.href = `/writeUps/${writeUpsId}`)}
            >
              Annuler
            </button>
            <button type="button" className="button" onClick={handleUpdate}>
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
