import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import header from "../../../locales/header.json";
import Context from "../contexts/UserContext";

/**
 * SearchInput component renders a search input field that updates the URL with the search query.
 *
 * @returns {JSX.Element} A search input element with a clear button.
 */
const SearchInput = () => {
  const [searchText, setSearchText] = useState(""); // State to store the search text.
  const router = useRouter();
  const [text, setText] = useState(header.english); // State to store the localized text.
  const { user } = useContext(Context);

  useEffect(() => {
    // Update the localized text based on the user's language preference.
    if (user.language === "french") {
      setText(header.french);
    } else {
      setText(header.english);
    }
  }, [user]);

  const handleClearSearch = () => {
    setSearchText(""); // Clear the search text.
  };

  return (
    <div className="relative flex items-center lg:ml-4 sm:mr-0 mr-2">
      <span className="absolute ml-4 leading-none -translate-y-1/2 top-1/2 p-blue ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* SVG path for the search icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </span>
      <input
        className="block w-full min-w-[70px] py-3 pl-12 pr-4 text-base font-medium leading-normal navbar border border-solid outline-none appearance-none placeholder:p-blue peer text-stone-500 border-stone-200 bg-clip-padding rounded-2xl shadow"
        placeholder={text.search} // Placeholder text based on the user's language.
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value); // Update the search text state.
          router.push(`/search/${encodeURIComponent(e.target.value)}`); // Navigate to the search results page.
        }}
      />
      {searchText && (
        <span
          onClick={handleClearSearch} // Clear the search text when the clear button is clicked.
          className="absolute right-0 left-auto mr-4 leading-none -translate-y-1/2 top-1/2 hover:text-primary p-blue cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {/* SVG path for the clear icon */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default SearchInput;
