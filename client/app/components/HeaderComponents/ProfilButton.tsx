import { useEffect, useState, useCallback, useContext } from "react";
import LoginModal from "./LoginModal";
import ContextTest from "../contexts/UserContext";
import Link from "next/link";

/**
 * ProfileButton component renders a button that displays the user's profile picture and name if the user is logged in.
 * If the user is not logged in, it displays a sign-in button.
 *
 * The component uses Supabase for authentication and listens for authentication state changes.
 *
 * @returns {JSX.Element} A button element that either shows the user's profile or a sign-in button.
 */
const ProfileButton = () => {
  const { user, login } = useContext(ContextTest);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the login modal visibility.
  const [actualPP, setActualPP] = useState<string>("/img/inconnu.png"); // State to store the user's profile picture URL.

  const handleButtonClick = useCallback(() => {
    setIsModalOpen(true); // Open the login modal.
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false); // Close the login modal.
  }, []);

  useEffect(() => {
    login(); // Trigger the login function when the component mounts.
  }, []);

  useEffect(() => {
    // Update the profile picture URL based on the user's preferred provider.
    if (user) {
      if (user.fav_pp_provider === "gravatar") {
        setActualPP(user.pp.gravatar);
      } else if (user.fav_pp_provider === "discord") {
        setActualPP(user.pp.discord);
      } else if (user.fav_pp_provider === "github") {
        setActualPP(user.pp.github);
      }
    }
  }, [user]);

  if (!user.id) {
    // Render the sign-in button if the user is not logged in.
    return (
      <>
        <button
          className="flex items-center justify-center w-12 h-12 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out navbar border border-solid shadow cursor-pointer rounded-2xl text-stone-500 border-stone-200"
          onClick={handleButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-dark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* SVG path for the sign-in icon */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </button>
        {isModalOpen && <LoginModal onClose={handleModalClose} />} {/* Render the login modal if it is open. */}
      </>
    );
  }

  // Render the user's profile button if the user is logged in.
  return (
    <Link
      className="navbar flex items-center mr-3 shadow-md rounded-2xl p-2 hover:shadow-lg"
      href={`/profil/${user.id}`}
    >
      <img
        src={actualPP}
        alt={`${user.username}'s profile`}
        className="w-10 h-10 rounded-full mr-0 lg:mr-2"
      />
      <span className="my-0 text-dark font-semibold text-[1.35rem]/[1.2] justify-center hidden lg:block mr-1 overflow-hidden">
        {user.username}
      </span>
    </Link>
  );
};

export default ProfileButton;
