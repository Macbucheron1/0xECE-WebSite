interface HamburgerButtonProps {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
}

const HamburgerButton = ({ isNavOpen, setIsNavOpen }: HamburgerButtonProps) => {
  return (
    <div className="relative flex items-center ml-2">
      <button
        className="flex items-center justify-center w-12 h-12 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out bg-white border border-solid shadow cursor-pointer rounded-2xl text-stone-500 border-stone-200 hover:shadow-xl"
        onClick={() => {
          console.log("Menu");
          setIsNavOpen(!isNavOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default HamburgerButton;
