import { useEffect, useState, useCallback, useContext, use } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "./LoginModal";
import ContextTest from "../contexts/UserContext";
import Link from "next/link";

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
  const { user, login } = useContext(ContextTest);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actualPP, setActualPP] = useState<string>("/img/inconnu.png");

  const handleButtonClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
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
