"use client";

import { useContext } from "react";
import ContextTest from "../components/UserContext";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { user, logout, updateFavPPProvider } = useContext(ContextTest);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    console.log("logging out");
    router.push("/");
  };

  const handleUpdatePP = async (provider) => {
    await updateFavPPProvider(provider);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      {user ? (
        <div className="bg-white p-6 rounded shadow mt-4">
          <h2 className="text-2xl text-gray-700 font-bold mb-4">User Information</h2>
          <p className="text-lg text-gray-700">Email: {user.email}</p>
          <p className="text-lg text-gray-700">Username: {user.username}</p>
          <p className="text-lg text-gray-700">Role: {user.role}</p>
          <p className="text-lg text-gray-700">Promo: {user.promo}</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-lg text-gray-700 mb-2">
          Loading user information...
        </p>
      )}
    </div>
  );
}
