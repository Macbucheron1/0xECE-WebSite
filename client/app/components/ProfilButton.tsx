import { memo, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabaseClient";
import { generateGravatarUrl } from "../../utils/gravatar";
import LoginModal from "./LoginModal";
import getFavPpProvider from "../../utils/getFavPpProvider";
/**
 * ProfileButton component renders a button that displays the user's profile picture and name if the user is logged in.
 * If the user is not logged in, it displays a sign-in button.
 *
 * The component uses Supabase for authentication and listens for authentication state changes.
 *
 *
 * @returns {JSX.Element} A button element that either shows the user's profile or a sign-in button.
 *
 * @dependencies
 * - `useRouter` from 'next/router'
 * - `useState` and `useEffect` from 'react'
 * - `supabase` for authentication
 * - `LoginModal` component
 *
 */
const ProfileButton = memo(() => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  /**
   * Fetches the user information when the component mounts and listens for authentication state changes.
   */
  useEffect(() => {
    // Fetch the initial user state
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        window.localStorage.setItem("provider", user.app_metadata.provider);
      }
    };

    fetchUser();

    // Set up auth state listener to update user state on changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const initial_provider = window.localStorage.getItem("provider");
        const number_of_providers =
          session?.user?.app_metadata.providers.length;
        window.localStorage.setItem("number_of_providers", number_of_providers);
        var writing_local_storage = false;
        if (
          (number_of_providers === 1 && initial_provider === "discord") ||
          (number_of_providers === 2 && initial_provider === "github")
        ) {
          writing_local_storage = true;
        }

        if (session?.user) {
          setUser(session.user); // Update user state when logged in
        } else {
          setUser(null); // Clear user state when logged out
        }

        if (writing_local_storage) {
          // Store tokens or remove them based on auth state
          if (session?.provider_token) {
            window.localStorage.setItem(
              "oauth_provider_token",
              session.provider_token
            );
          }
          if (session?.provider_refresh_token) {
            window.localStorage.setItem(
              "oauth_provider_refresh_token",
              session.provider_refresh_token
            );
          }
          if (event === "SIGNED_OUT") {
            window.localStorage.removeItem("oauth_provider_token");
            window.localStorage.removeItem("oauth_provider_refresh_token");
          }
        }
      }
    );
    // Clean up listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (!user) {
    return (
      <>
        <button
          className="flex items-center justify-center w-12 h-12 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out bg-white border border-solid shadow cursor-pointer rounded-2xl text-stone-500 border-stone-200 hover:shadow-lg"
          onClick={handleButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-dark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
        {isModalOpen && <LoginModal onClose={handleModalClose} />}
      </>
    );
  }

  const userName = user.user_metadata.full_name || user.user_metadata.user_name;
  const profilePictureUrl = generateGravatarUrl(user.email);  
  

  return (
    <button
      className="bg-white flex items-center mr-3 shadow-md rounded-2xl p-2 hover:shadow-lg"
      onClick={() => {
        console.log("Profil");
        router.push(`/profil/${userName}`);
      }}
    >
      <img
        src={profilePictureUrl}
        alt={`${userName}'s profile`}
        className="w-10 h-10 rounded-full mr-0 lg:mr-2"
      />
      <span className="my-0 text-dark font-semibold text-[1.35rem]/[1.2] justify-center hidden lg:block mr-1 overflow-hidden">
        {userName}
      </span>
    </button>
  );
});

export default ProfileButton;
