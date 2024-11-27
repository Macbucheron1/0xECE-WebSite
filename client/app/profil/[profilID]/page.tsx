"use client";

import { useContext, useEffect, useState } from "react";
import ContextTest from "../../components/contexts/UserContext";
import User from "../../components/ProfilComponents/user/User";
import OtherUser from "../../components/ProfilComponents/other/OtherUser";
import { ContextProvider } from "../../components/contexts/OtherContext";
import Loader from "../../components/Loader";

/**
 * UserProfile component displays a user's profile page.
 * Determines if the profile is the user's own or another user's and renders accordingly.
 *
 * @param {object} params - The parameters object containing route parameters.
 * @param {string} params.profilID - The ID of the profile being visited.
 * @returns {JSX.Element} The profile page component.
 */
export default function UserProfile({
  params,
}: {
  params: { profilID: string };
}) {
  /**
   * State to determine if the page is editable by the current user.
   */
  const [isPageEditable, setIsPageEditable] = useState(false);

  /**
   * User context providing current user data.
   */
  const { user } = useContext(ContextTest);

  /**
   * State holding data of the visited user.
   */
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
      // Render the user's own profile with edit capabilities
      return <User />;
    } else {
      // Render another user's profile
      return (
        <ContextProvider id={params.profilID}>
          <OtherUser />
        </ContextProvider>
      );
    }
  } else {
    // Display a loading indicator while fetching data
    return <Loader />;
  }
}
