import NavMenu from './NavMenu';
import "../../styles/globals.css"

export default function Header() {
  return (
    <header className="bg-blue-500 p-4 sticky top-0">
      <h1 className="text-white text-3xl font-bold">WebTech-101</h1>
      <NavMenu />
    </header>
  );
}