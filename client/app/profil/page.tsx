"use client";

import { useContext } from "react";
import ContextTest from "../components/UserContext";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/navigation";

const roleNames = {
  "1227192380118138901": "Membre",
  "1225487330228310126": "Bureau",
  "1227564151946084363": "President",
};

const promoNames = {
  "1296446288614789162": "ing1",
  "1296446375768096768": "ing2",
  "1296446419556630619": "ing3",
  "1296446455485304853": "ing4",
  "1296446491119849603": "ing5",
  "1296806777983205470": "Bachelor1",
  "1296807354834223205": "Bachelor2",
  "1296807400501673994": "Bachelor3",
};

export default function UserProfile() {
  const { user, logout, updateFavPPProvider } = useContext(ContextTest);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    console.log("logging out");
    router.push("/");
  };

  const handleLink = async (linkingWith: string) => {
    if (linkingWith === "github") {
      const { data, error } = await supabase.auth.linkIdentity({
        provider: "github",
      });
      if (error) {
        console.error("Error linking account with github:", error.message);
      }
      console.log("linked with github: ", data);
    } else if (linkingWith === "discord") {
      const { data, error } = await supabase.auth.linkIdentity({
        provider: "discord",
        options: {
          scopes: "identify email guilds guilds.members.read",
        },
      });
      if (error) {
        console.error("Error linking account with discord:", error.message);
      }
    }
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
          {!user.connected_with_discord || !user.connected_with_github ? (
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              onClick={() =>
                handleLink(user.connected_with_discord ? "github" : "discord")
              }
            >
              Link {user.connected_with_discord === true ? "Github" : "Discord"}
            </button>
          ) : (
            <>
              <button
                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
                onClick={() => handleUpdatePP("gravatar")}
              >
                Use gravatar profile picture
              </button>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleUpdatePP("discord")}
              >
                Use Discord profile picture
              </button>
              <button
                className="mt-4 bg-cyan-500 text-white px-4 py-2 rounded"
                onClick={() => handleUpdatePP("github")}
              >
                Use Github profile picture
              </button>
            </>
          )}
        </div>
      ) : (
        <p className="text-lg text-gray-700 mb-2">
          Loading user information...
        </p>
      )}
    </div>
  );
}
