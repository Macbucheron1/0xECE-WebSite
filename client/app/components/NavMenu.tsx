import Link from "next/link";
import { usePathname } from "next/navigation";


export default function NavMenu() {
  const pathname = usePathname();


  return (
    <nav>
      <ul className="flex flex-col font-medium mt-4 space-y-1">
        <li className="">
          <Link href="/" className="text-black hover:text-gray-300">
            Home
          </Link>
        </li>
        <li className="">
          <Link href="/articles" className="text-black hover:text-gray-300">
            Articles
          </Link>
        </li>
        <li className="">
          <Link href="/about" className="text-black hover:text-gray-300">
            About
          </Link>
        </li>
        <li className="">
          <Link href="/contacts" className="text-black hover:text-gray-300">
            Contacts
          </Link>
        </li>
      </ul>
    </nav>
  );
}
