import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import header from "../../../locales/header.json";
import Context from "../contexts/UserContext";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [text, setText] = useState(header.english);
  const { user } = useContext(Context);

  useEffect(() => {
    if (user.language === "french") {
      setText(header.french);
    } else {
      setText(header.english);
    }
  }, [user]);

  const handleClearSearch = () => {
    setSearchText("");
  };

  return (
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
        className="block w-full min-w-[70px] py-3 pl-12 pr-4 text-base font-medium leading-normal bg-white border border-solid outline-none appearance-none placeholder:text-secondary-dark peer text-stone-500 border-stone-200 bg-clip-padding rounded-2xl shadow hover:shadow-lg"
        placeholder={text.search}
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          router.push(`/search/${e.target.value}`);
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
  );
};

export default SearchInput;
