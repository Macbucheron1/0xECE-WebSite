import { useState, useEffect } from "react";

interface HeaderProps {
  userName: string;
  profilePictureUrl: string;
}

const Header = ({ userName, profilePictureUrl }: HeaderProps) => {
  const [searchText, setSearchText] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  const handleClearSearch = () => {
    setSearchText("");
  };

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 640);
  };

  useEffect(() => {
    // Set up event listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-wrap -mx-3 mb-5 rounded-lg fixed top-5 left-2 right-2 z-10">
      <div className="px-3 mb-6 mx-auto w-11/12 bg-white rounded-xl">
        <div className="bg-gray-100 sm:flex items-stretch justify-between grow lg:mb-0 py-5 px-5">
          {/* Conditional rendering based on screen size */}
          {isSmallScreen ? (
            <>
              {/* Search Bar First */}
              <div className="flex items-center lg:shrink-0 lg:flex-nowrap">
                <div className="relative flex items-center lg:ml-4 sm:mr-0 mr-2">
                  <span className="absolute ml-4 leading-none -translate-y-1/2 top-1/2 text-muted">
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
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </span>
                  <input
                    className="block w-full min-w-[70px] py-3 pl-12 pr-4 text-base font-medium leading-normal bg-white border border-solid outline-none appearance-none placeholder:text-secondary-dark peer text-stone-500 border-stone-200 bg-clip-padding rounded-2xl"
                    placeholder="Search..."
                    type="text"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      console.log(e.target.value);
                    }}
                  />
                  {searchText && (
                    <span
                      onClick={handleClearSearch}
                      className="absolute right-0 left-auto mr-4 leading-none -translate-y-1/2 top-1/2 hover:text-primary text-muted cursor-pointer"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </div>

              {/* Profile Info After */}
              <button
                className="bg-white flex items-center mb-5 mr-3 lg:mb-0 shadow rounded-full p-2 mt-5"
                onClick={() => console.log("Profile")}
              >
                <img
                  src={profilePictureUrl}
                  alt={`${userName}'s profile`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="my-0 flex text-dark font-semibold text-[1.35rem]/[1.2] flex-col justify-center hidden md:block">
                  {userName}
                </span>
              </button>
            </>
          ) : (
            <>
              {/* Profile Info First */}
              <button
                className="bg-white flex items-center mb-5 mr-3 lg:mb-0 shadow rounded-full p-2 mt-5"
                onClick={() => console.log("Profile")}
              >
                <img
                  src={profilePictureUrl}
                  alt={`${userName}'s profile`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="my-0 flex text-dark font-semibold text-[1.35rem]/[1.2] flex-col justify-center hidden md:block">
                  {userName}
                </span>
              </button>

              {/* Search Bar After */}
              <div className="flex items-center lg:shrink-0 lg:flex-nowrap">
                <div className="relative flex items-center lg:ml-4 sm:mr-0 mr-2">
                  <span className="absolute ml-4 leading-none -translate-y-1/2 top-1/2 text-muted">
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
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </span>
                  <input
                    className="block w-full min-w-[70px] py-3 pl-12 pr-4 text-base font-medium leading-normal bg-white border border-solid outline-none appearance-none placeholder:text-secondary-dark peer text-stone-500 border-stone-200 bg-clip-padding rounded-2xl"
                    placeholder="Search..."
                    type="text"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      console.log(e.target.value);
                    }}
                  />
                  {searchText && (
                    <span
                      onClick={handleClearSearch}
                      className="absolute right-0 left-auto mr-4 leading-none -translate-y-1/2 top-1/2 hover:text-primary text-muted cursor-pointer"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Hamburger Icon */}
          <div className="relative lg:hidden flex items-center sm:ml-2 ml-auto">
            <button
              className="flex items-center justify-center w-12 h-12 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out bg-transparent border border-solid shadow-none cursor-pointer rounded-2xl text-stone-500 border-stone-200 hover:text-primary"
              onClick={() => {
                document
                  .querySelector(".group\\/sidebar")
                  ?.classList.toggle("-translate-x-full");
                console.log("Menu");
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

          {/* Icons */}
          <div className="relative flex items-center ml-2 lg:ml-4">
            <button
              className="flex items-center justify-center w-12 h-12 text-base font-medium leading-normal text-center transition-colors duration-150 ease-in-out bg-transparent border border-solid shadow-none cursor-pointer rounded-2xl text-stone-500 border-stone-200 hover:text-primary"
              onClick={() => console.log("Notifications")}
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
                  d="M12 2.25v0c-4.125 0-7.5 3.375-7.5 7.5v5.25c0 2.25-1.5 4.125-3.375 4.125h20.25c-1.875 0-3.375-1.875-3.375-4.125V9.75c0-4.125-3.375-7.5-7.5-7.5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
