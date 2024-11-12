import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { supabase } from "../../utils/supabaseClient";
import ContextUser from "./UserContext";
import { useContext } from "react";

interface LoginModalProps {
  onClose: () => void;
}

/**
 * A modal component for user login using OAuth providers (Discord and GitHub).
 *
 * @component
 * @param {LoginModalProps} props - The properties for the LoginModal component.
 * @param {Function} props.onClose - Function to be called when the modal is closed.
 *
 * @example
 * <LoginModal onClose={handleClose} />
 *
 * @returns {JSX.Element} The rendered LoginModal component.
 */
const LoginModal = ({ onClose }) => {
  const { user } = useContext(ContextUser);
  /**
   * Handles the login process using OAuth with the specified provider.
   *
   * @param provider - The OAuth provider to use for login. Can be either "discord" or "github".
   * @returns A promise that resolves when the login process is complete.
   * @throws Will log an error message if the login process fails.
   */
  const handleLogin = async (provider: "discord" | "github") => {
    if (provider === "discord") {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          scopes: "identify email guilds guilds.members.read",
        },
      });
      if (error) {
        console.error(`Error logging in with ${provider}:`, error.message);
      } 
    } else if (provider === "github") {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider });
        if (error) {
          console.error(`Error logging in with ${provider}:`, error.message);
        }
      } catch (err) {
        console.error("OAuth login error:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        {/* Discord Login Button */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4 flex items-center justify-center w-full"
          onClick={() => handleLogin("discord")}
        >
          <FontAwesomeIcon icon={faDiscord} className="mr-2" />
          Login with Discord
        </button>

        {/* GitHub Login Button */}
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded flex items-center justify-center w-full"
          onClick={() => handleLogin("github")}
        >
          <FontAwesomeIcon icon={faGithub} className="mr-2" />
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
