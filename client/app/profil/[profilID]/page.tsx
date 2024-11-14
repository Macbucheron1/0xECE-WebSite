"use client";

import { useContext, useEffect, useState } from "react";
import ContextTest from "../../components/UserContext";
import User from "../../components/ProfilComponents/user/User";
import OtherUser from "../../components/ProfilComponents/other/OtherUser";
import { ContextProvider } from "../../components/OtherContext";

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
    } else {
      // The user is visiting someone else's profile
      setVisitedUser(true);

    }
  }, [user, params.profilID]);

  if (visitedUser) {
    if (isPageEditable) {
      return <User />;
    } else {
      return (
        <ContextProvider id={params.profilID}>
          <OtherUser />
        </ContextProvider>
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
