import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabaseClient";
import { generateGravatarUrl } from "../../utils/gravatar";
import LoginModal from "./LoginModal";
import { DISCORD_CONFIG } from "../../config/discord";

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
const ProfileButton = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const discordTokenRef = useRef(null);
  const discordToken = 'qfT4h8FP2rvouRGcvJFuoZdg07tsKE';

  useEffect(() => {
    const fetchDiscordToken = async () => {
      const response = await fetch("/api/auth/discord/cookie");
      const data = await response.json();
      console.log(data.response);
      discordTokenRef.current = data.response;
    };

    fetchDiscordToken();
  }, []);

  /**
   * Fetches the user information when the component mounts and listens for authentication state changes.
   */
  useEffect(() => {
    const fetchUser = async () => {
      // First try to get existing Supabase session
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        return;
      }

      if (error) {
        console.error("Error fetching user:", error.message);
      }

      // If no Supabase user, check for Discord token
      console.log("Discord token:", discordToken);
      if (discordToken) {
        try {
          // Get Discord user info
          const discordResponse = await fetch(
            "https://discord.com/api/users/@me",
            {
              headers: { Authorization: `Bearer ${discordToken}` },
            }
          );
          const discordUser = await discordResponse.json();

          // Sign in to Supabase with Discord credentials
          const { data, error: signInError } =
            await supabase.auth.signInWithOAuth({
              provider: "discord",
              options: {
                token: discordToken,
                user_metadata: {
                  discord_user_id: discordUser.id,
                  discord_username: discordUser.username,
                },
              },
            });

          if (signInError) {
            console.error(
              "Error signing in with Discord:",
              signInError.message
            );
          } else if (data.user) {
            setUser(data.user);
          }
        } catch (err) {
          console.error("Error processing Discord token:", err);
        }
      }
    };

    fetchUser();
    /**
     * Subscribes to authentication state changes and updates the user state accordingly.
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (!user) {
    return (
      <>
        <button
          className="flex items-center justify-center w-12 h-12 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out bg-white border border-solid shadow cursor-pointer rounded-2xl text-stone-500 border-stone-200 hover:shadow-lg"
          onClick={() => (window.location.href = DISCORD_CONFIG.AUTH_URL())}
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
        {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
      </>
    );
  }

  const userName = user.user_metadata.full_name || user.email;
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
};

export default ProfileButton;
