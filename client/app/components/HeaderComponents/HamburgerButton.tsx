/** 
 * Props interface for HamburgerButton component.
 * @property {boolean} isNavOpen - Indicates if the navigation menu is open.
 * @property {(isOpen: boolean) => void} setIsNavOpen - Function to toggle the navigation menu.
 * @property {() => void} [onClose] - Optional callback when the menu is closed.
 */
interface HamburgerButtonProps {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
  onClose?: () => void;
}

/**
 * HamburgerButton component renders a button that toggles the navigation menu.
 * @param {HamburgerButtonProps} props - Props containing isNavOpen, setIsNavOpen, and optional onClose.
 * @returns {JSX.Element} The rendered HamburgerButton component.
 */
const HamburgerButton = ({ isNavOpen, setIsNavOpen }: HamburgerButtonProps) => {
  return (
    <div className="relative flex items-center ml-2 lg:ml-4">
      {/* Button to toggle navigation menu */}
      <button
        className="flex items-center justify-center w-12 h-12 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out navbar border border-solid shadow cursor-pointer rounded-2xl text-stone-500 border-stone-200"
        onClick={() => {
          console.log("Menu");
          setIsNavOpen(!isNavOpen);
        }}
      >
        <div className="relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all duration-200">
          {/* Animated icon when navigation is open */}
          <div
            className={`transform transition-all duration-300 overflow-hidden ${
              isNavOpen ? "translate-y-[14px]" : "-translate-y-5"
            }`}
          >
            {/* Upward arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 animate-bounce p-blue"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>

          {/* Animated icon when navigation is closed */}
          <div
            className={`flex flex-col justify-between transform transition-all duration-300 origin-center overflow-hidden ${
              isNavOpen ? "translate-y-6" : "-translate-y-3"
            }`}
          >
            {/* Hamburger menu icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 transform transition-all duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
};

export default HamburgerButton;
