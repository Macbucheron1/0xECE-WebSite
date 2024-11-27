// Import necessary modules from React and Supabase
import { createContext, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";

// Define the type for a visited user
/** Represents the data structure for a visited user.
 * @typedef {Object} visitedUser
 * @property {string | null} id - The unique identifier of the user.
 * @property {string | null} email - The email address of the user.
 * @property {string | null} username - The username of the user.
 * @property {string | null} pp_url - The profile picture URL.
 * @property {string | null} bio - The biography of the user.
 * @property {string | null} role - The role of the user.
 * @property {string | null} promo - Promotional code or information.
 * @property {string | null} linkedin_url - The LinkedIn profile URL.
 * @property {string | null} rootme_url - The Root Me profile URL.
 * @property {string | null} tryhackme_url - The TryHackMe profile URL.
 * @property {string | null} htb_url - The Hack The Box profile URL.
 * @property {boolean} email_visible - Indicates if the user's email is visible to others.
 */
type visitedUser = {
  id: string | null;
  email: string | null;
  username: string | null;
  pp_url: string | null;
  bio: string | null;
  role: string | null;
  promo: string | null;
  linkedin_url: string | null;
  rootme_url: string | null;
  tryhackme_url: string | null;
  htb_url: string | null;
  email_visible: boolean;
};

// Create a context to share the visited user's data across components
/** Context object to provide visited user data and related functions.
 * @type {React.Context}
 */
const Context = createContext<{
  visitedUser: visitedUser | null;
  setVisitedUser: (newVisitedUser: visitedUser) => void;
  fetchUser: () => void;
    }>({
      visitedUser: null,
      setVisitedUser: () => {},
      fetchUser: () => {},
    });

export default Context;

// Define the ContextProvider component to wrap child components
/** Provides the visited user context to child components.
 * @param {Object} props - The component properties.
 * @param {React.ReactNode} props.children - The child components.
 * @param {string} props.id - The ID of the user to fetch data for.
 * @returns {JSX.Element} The context provider with children components.
 */
export const ContextProvider = ({ children, id }) => {
  // State to hold the visited user's data
  const [visitedUser, setVisitedUser] = useState<visitedUser | null>(null);

  // Function to fetch the user's data from Supabase
  /** Fetches user data from the database and updates the state.
   * Retrieves data from 'user_personalization_info' table where 'user_uid' matches the provided ID.
   */
  const fetchUser = async () => {
    const { data, error } = await supabase
      .from("user_personalization_info")
      .select("*")
      .eq("user_uid", id)
      .single();

    if (error) {
      console.log("error", error); // Log any errors that occur during fetch
    } else {
      setVisitedUser(data); // Update the state with the fetched user data
    }
  };

  return (
    // Provide the visited user data and functions to the child components
    <Context.Provider
      value={{
        visitedUser: visitedUser,
        setVisitedUser: setVisitedUser,
        fetchUser: fetchUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};
