import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPen,
  faInfoCircle,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import header from "../../../locales/header.json"
import { useState, useEffect, useContext } from "react";
import Context from "../contexts/UserContext";

interface NavMenuProps {
  isNavOpen: boolean;
}

const NavMenu = ({ isNavOpen }: NavMenuProps) => {
  const pathname = usePathname();
  const [text, setText] = useState(header.english);
  const { user } = useContext(Context);

  useEffect(() => {
    if (user.language === "french") {
      setText(header.french);
    } else {
      setText(header.english);
    }
  }, [user]);

  return (
    <nav className={isNavOpen ? "animate-slideIn" : "animate-slideOut"}>
      <ul className="flex flex-col font-medium space-y-2">
        <li className="">
          <Link
            href="/"
            className={`text-black px-2 py-1 flex items-center ${
              pathname === "/" ? "text-blue-500" : "hover:text-blue-300"
            }`}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            {text.home}
          </Link>
        </li>
        <li className="">
          <Link
            href="/writeUps"
            className={`text-black px-2 py-1 flex items-center ${
              pathname === "/writeUps" ? "text-blue-500" : "hover:text-blue-300"
            }`}
          >
            <FontAwesomeIcon icon={faPen} className="mr-2" />
            {text.writeups}
          </Link>
        </li>
        <li className="">
          <Link
            href="/about"
            className={`text-black px-2 py-1 flex items-center ${
              pathname === "/about" ? "text-blue-500" : "hover:text-blue-300"
            }`}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            {text.about}
          </Link>
        </li>
        <li className="">
          <Link
            href="/contacts"
            className={`text-black px-2 py-1 flex items-center ${
              pathname === "/contacts" ? "text-blue-500" : "hover:text-blue-300"
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
