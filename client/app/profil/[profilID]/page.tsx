"use client";

import { useContext, useEffect, useState } from "react";
import ContextTest from "../../components/UserContext";
import { useRouter } from "next/navigation";
import ProfilModal from "../../components/ProfilComponents/user/ProfilModal";
import SocialLink from "../../components/ProfilComponents/user/SocialLink";
import UserInfo from "../../components/ProfilComponents/user/UserInfo";
import Bio from "../../components/ProfilComponents/user/Bio";
import User from "../../components/ProfilComponents/user/User";

export default function UserProfile({
  params,
}: {
  params: { profilID: string };
}) {
  const [isPageEditable, setIsPageEditable] = useState(false);
  const { user } = useContext(ContextTest);
  const [visitedUser, setVisitedUser] = useState(null);

  useEffect(() => {
    if (params.profilID == user.id) {
      // The user is visiting their own profile
      setVisitedUser(user);
      setIsPageEditable(true);
    }
  }, [user, params.profilID]);

  const router = useRouter();

  if (visitedUser) {
    if (isPageEditable) {
      return <User />;
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
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
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
