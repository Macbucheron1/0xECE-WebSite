"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { useRouter } from "next/navigation";

/**
 * UserProfile component displays the profile information of the logged-in user.
 * It fetches the user data from Supabase on component mount and provides a logout functionality.
 *
 * @returns {JSX.Element} The rendered UserProfile component.
 */
export default function UserProfile({ params }) {
  const { username } = params;
  const [user, setUser] = useState(null);
  const router = useRouter();

  /**
   * Fetches the user data from Supabase on component mount.
   * If the user is not logged in, the user state will be null.
   * If the user is logged in, the user state will contain the user data.
   * If there is an error fetching the user data, an error message will be logged to the console.
   */
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(user);
      }
    };

    fetchUser();
  }, []);


  /**
   * Handles the logout functionality.
   * Calls the signOut method from the Supabase auth object.
   * Redirects the user to the home page after logout.
   * If there is an error logging out, an error message will be logged to the console.
   */
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      router.push("/"); // Redirect to the home page after logout
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      {user ? (
        <div className="bg-white p-6 rounded shadow mt-4">
          <h2 className="text-2xl font-bold mb-4">User Information</h2>
          <p className="text-lg text-gray-700">Email: {user.email}</p>
          <p className="text-lg text-gray-700">Username: {username}</p>
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
