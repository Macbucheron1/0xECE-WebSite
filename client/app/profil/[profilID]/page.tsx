"use client";

import { useContext, useEffect, useState } from "react";
import ContextTest from "../../components/UserContext";
import { supabase } from "../../../utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function UserProfile({ params }) {
  const [isPageEditable, setIsPageEditable] = useState(false);
  const { user, logout, updateFavPPProvider } = useContext(ContextTest);
  const [visitedUser, setVisitedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [promo, setPromo] = useState("Ing4");
  const promoOptions = ["Ing1", "Ing2", "Ing3", "Ing4", "Ing5"];
  const [currentPPIndex, setCurrentPPIndex] = useState(0);
  const [availablePPs, setAvailablePPs] = useState([]);

  // Set initial index based on favorite provider
  useEffect(() => {
    if (user && user.pp) {
      // Filter out null profile pictures and create an array of available ones
      const availablePPs = Object.entries(user.pp)
        .filter(([_, value]) => value !== null)
        .map(([provider, url]) => ({ provider, url }));

      setAvailablePPs(availablePPs);

      const favIndex = availablePPs.findIndex(
        (pp) => pp.provider === user.fav_pp_provider
      );
      if (favIndex !== -1) {
        setCurrentPPIndex(favIndex);
      }
    }
  }, [user]);

  useEffect(() => {
    if (params.profilID == user.id) {
      // The user is visiting their own profile
      setVisitedUser(user);
      setIsPageEditable(true);
    }
  }, [user, params.profilID]);

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleUpdatePP = async (provider) => {
    await updateFavPPProvider(provider);
  };

  const handlePrevPP = () => {
    setCurrentPPIndex((prev) => {
      const newIndex = prev === 0 ? availablePPs.length - 1 : prev - 1;
      handleUpdatePP(availablePPs[newIndex].provider);
      return newIndex;
    });
  };

  const handleNextPP = () => {
    setCurrentPPIndex((prev) => {
      const newIndex = prev === availablePPs.length - 1 ? 0 : prev + 1;
      handleUpdatePP(availablePPs[newIndex].provider);
      return newIndex;
    });
  };

  if (visitedUser) {
    if (isPageEditable) {
      return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Profile Picture and Username Section */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex flex-col items-center mb-4">
                {/* Profile Picture Carousel */}
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={handlePrevPP}
                    className="text-2xl text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    ←
                  </button>

                  <div className="relative w-24 h-24">
                    {availablePPs.length > 0 && (
                      <img
                        src={availablePPs[currentPPIndex].url}
                        alt={`${availablePPs[currentPPIndex].provider} profile`}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    )}
                  </div>

                  <button
                    onClick={handleNextPP}
                    className="text-2xl text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    →
                  </button>
                </div>

                {/* Provider Label */}
                <div className="text-sm text-gray-400 mb-4">
                  {availablePPs[currentPPIndex]?.provider
                    .charAt(0)
                    .toUpperCase() +
                    availablePPs[currentPPIndex]?.provider.slice(1)}
                </div>

                {/* Username */}
                <h2 className="text-2xl font-bold text-cyan-400">
                  {user.username}
                </h2>
              </div>
            </div>

            {/* User Information Card */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">User Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 block mb-1">Email</label>
                  <p className="text-cyan-400">macbucheron@outlook.fr</p>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Role</label>
                  <p>Membre</p>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Promo</label>
                  {isEditing ? (
                    <select
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      className="bg-gray-700 rounded px-3 py-2 w-full max-w-xs"
                    >
                      {promoOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>{promo}</span>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-sm text-cyan-400 hover:text-cyan-300"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Bio</h2>
              <textarea
                className="w-full bg-gray-700 rounded-lg p-4 min-h-[120px] text-gray-100 resize-none"
                placeholder="Write something about yourself..."
              />
            </div>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <button className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                Lien
              </button>
              <button className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                Projets
              </button>
              <button className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                CTF
              </button>
              <button className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                TP
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">User Profile</h1>
          <div className="bg-white p-6 rounded shadow mt-4">
            <h2 className="text-2xl text-gray-700 font-bold mb-4">
              User Information
            </h2>
            <p className="text-lg text-gray-700">Email: {user.email}</p>
            <p className="text-lg text-gray-700">Username: {user.username}</p>
            <p className="text-lg text-gray-700">Role: {user.role}</p>
            <p className="text-lg text-gray-700">Promo: {user.promo}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout_
            </button>
          </div>
        </div>
      );
    }
  } else {
    // loading page
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <div className="bg-white p-6 rounded shadow mt-4">
          <h2 className="text-2xl text-gray-700 font-bold mb-4">
            User Information
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            Loading user information...
          </p>
        </div>
      </div>
    );
  }
}
