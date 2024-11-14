"use client";

import { useContext, useEffect, useState } from "react";
import ContextTest from "../../components/contexts/UserContext";
import User from "../../components/ProfilComponents/user/User";
import OtherUser from "../../components/ProfilComponents/other/OtherUser";
import { ContextProvider } from "../../components/contexts/OtherContext";
import Loader from "../../components/Loader";

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
    return <Loader />;
  }
}
