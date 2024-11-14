"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabaseClient";
import ContextTest from "../../components/contexts/UserContext";

export default function PublishWriteUp() {
    const router = useRouter();
    const [ctfName, setCtfName] = useState('');
    const [challengeName, setChallengeName] = useState('');
    const { user } = useContext(ContextTest);
    const [type, setType] = useState('');
    const [writeUp, setWriteUp] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const publishWriteUp = async (e) => {
        e.preventDefault();
        if (!ctfName || !challengeName || !type || !writeUp) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        const title= ctfName + ': ' + challengeName;
        const { data, error } = await supabase.from('writeups').insert([
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
            setShowConfirmation(true);
            console.log(data);
        }
    }
    

    return (
        <div className="p-6 overflow-x-hidden">
            <div className="max-w-3xl mx-auto">
                <h2 className="wt-title mb-6">Publier un write-up</h2>
                {showConfirmation && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                            <p className="text-white mb-4">Le write-up a été publié avec succès.</p>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={() => router.push('/writeUps')}
                            >
                                Quitter
                            </button>
                        </div>
                    </div>
                )}
                {!showConfirmation && (
                    <form onSubmit={publishWriteUp}>
                        <div className="mb-4">
                            <label className="p-blue mb-2">Nom d'utilisateur</label>
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-gray-700 p-gray"
                                value={user?.username || ''}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="p-blue mb-2">Nom du CTF</label>
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                value={ctfName}
                                onChange={(e) => setCtfName(e.target.value)}
                                maxLength={30}
                                placeholder="Hack The Box"
                                required
                            />
                            {ctfName.length === 30 && (
                                <p className="text-red-500">
                                    La limite de 30 caractères est atteinte.
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="p-blue mb-2">Nom du challenge</label>
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                value={challengeName}
                                onChange={(e) => setChallengeName(e.target.value)}
                                maxLength={30}
                                placeholder="Eternal Blue"
                                required
                            />
                            {challengeName.length === 30 && (
                                <p className="text-red-500">
                                    La limite de 30 caractères est atteinte.
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="p-blue mb-2">Type</label>
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                maxLength={30}
                                placeholder="Forensic"
                                required
                            />
                            {type.length === 30 && (
                                <p className="text-red-500">
                                    La limite de 30 caractères est atteinte.
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block p-blue mb-2">Write-up (Markdown)</label>
                            <textarea
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                rows={10}
                                value={writeUp}
                                onChange={(e) => setWriteUp(e.target.value)}
                                maxLength={7000}
                                required
                            ></textarea>
                            {writeUp.length === 7000 && (
                                <p className="text-red-500">
                                    La limite de 7000 caractères est atteinte.
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="text-white font-semibold py-2 px-4 rounded mr-6 bg-gray-700 hover:bg-gray-600"
                                type="button"
                                onClick={() => router.push('/writeUps')}
                            >
                                Annuler
                            </button>
                            <button
                                className="button"
                                type="submit"
                            >
                                Publier
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}