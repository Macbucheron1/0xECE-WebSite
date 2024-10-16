import "../../styles/globals.css"

export default function NavMenu() {
  return (
    <nav className="mt-4">
      <ul className="flex space-x-4">
        <li><a href="/" className="text-white hover:text-gray-300">Home</a></li>
        <li><a href="/articles" className="text-white hover:text-gray-300">Articles</a></li>
        <li><a href="/about" className="text-white hover:text-gray-300">About</a></li>
        <li><a href="/contacts" className="text-white hover:text-gray-300">Contacts</a></li>
      </ul>
    </nav>
  );
}