import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPen,
  faInfoCircle,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import header from "../../../locales/header.json";
import { useState, useEffect, useContext } from "react";
import Context from "../contexts/UserContext";

interface NavMenuProps {
  isNavOpen: boolean;
}

/**
 * NavMenu component renders a navigation menu with localized text based on user language.
 * @param {NavMenuProps} props - The properties object.
 * @param {boolean} props.isNavOpen - Indicates if the navigation menu is open.
 * @returns {JSX.Element} The rendered navigation menu.
 */
const NavMenu = ({ isNavOpen }: NavMenuProps) => {
  const pathname = usePathname();
  const [text, setText] = useState(header.english);
  const { user } = useContext(Context);

  // Effect to update text content when user language changes
  useEffect(() => {
    if (user.language === "french") {
      setText(header.french);
    } else {
      setText(header.english);
    }
  }, [user]);

  return (
    <nav className={`${isNavOpen ? "animate-slideIn" : "animate-slideOut"}`}>
      <ul className="flex flex-col font-medium space-y-2">
        <li className="">
          <Link
            href="/"
            className={`px-2 py-1 flex items-center ${
              pathname === "/" ? "p-blue" : "navMenu"
            }`}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            {text.home}
          </Link>
        </li>
        <li className="">
          <Link
            href="/writeUps"
            className={`px-2 py-1 flex items-center ${
              pathname === "/writeUps" ? "p-blue" : "navMenu"
            }`}
          >
            <FontAwesomeIcon icon={faPen} className="mr-2" />
            {text.writeups}
          </Link>
        </li>
        <li className="">
          <Link
            href="/about"
            className={`px-2 py-1 flex items-center ${
              pathname === "/about" ? "p-blue" : "navMenu"
            }`}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            {text.about}
          </Link>
        </li>
        <li className="">
          <Link
            href="/contacts"
            className={`px-2 py-1 flex items-center ${
              pathname === "/contacts" ? "p-blue" : "navMenu"
            }`}
          >
            <FontAwesomeIcon icon={faAddressBook} className="mr-2" />
            {text.contacts}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
