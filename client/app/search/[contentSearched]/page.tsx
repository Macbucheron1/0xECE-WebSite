"use client";

import { useEffect, useState, useContext } from "react";
import getSearchInfo from "../../../utils/getSearchInfo";
import Context from "../../components/contexts/UserContext";
import search from "../../../locales/search.json";

/**
 * SearchResults component displays the results of a search query.
 *
 * @param {object} params - The parameters object containing route parameters.
 * @param {string} params.contentSearched - The search query from the URL.
 * @returns {JSX.Element} The search results page.
 */
const SearchResults = ({ params }) => {
  /**
   * Decoded search query from URL parameters.
   */
  const query = decodeURI(params.contentSearched);

  /**
   * User context providing user data.
   */
  const { user } = useContext(Context);

  /**
   * State holding localized text based on user's language preference.
   */
  const [text, setText] = useState(search.english);

  useEffect(() => {
    // Update the text state when the user's language changes
    if (user.language === "french") {
      setText(search.french);
    } else {
      setText(search.english);
    }
  }, [user]);

  /**
   * State holding search results grouped into users, write-ups, and comments.
   */
  const [results, setResults] = useState({
    users: [],
    writeUps: [],
    comments: [],
  });

  /**
   * Loading state to indicate if results are being fetched.
   */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate fetching search results
    setTimeout(() => {
      getSearchInfo(query).then((data) => {
        setResults(data);
        setLoading(false);
      });
    }, 500);
  }, [query]);

  /**
   * Highlights the search query within the provided text.
   *
   * @param {string} text - The text to highlight within.
   * @param {string} query - The search query to highlight.
   * @returns {Array} An array of JSX elements with highlighted query.
   */
  const highlightText = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="text-red-600">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="text-gray-100">
      {/* Search Header */}
      <div className="text-center border-b border-gray-700 pb-6 pt-8">
        <div className="container mx-auto px-4">
          <h1 className="wt-title">{text.result}</h1>
          <p className="p-gray">
            {loading
              ? text.searching
              : `${text.resultFound1} ${
                results.users.length +
                results.writeUps.length +
                results.comments.length
              } ${text.resultFound2} "${query}"`}
          </p>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Users */}
            {results.users.length > 0 && (
              <div className="mb-8">
                <h2 className="p-white text-xl font-semibold mb-4">
                  {text.resultUser}
                </h2>
                <div className="space-y-4">
                  {results.users.map((user, index) => (
                    <div key={index} className="p-4 settings rounded break-words">
                      {/* Render user details */}
                      <a href={`/profil/${user.user_uid}`}>
                        {highlightText(user.username, query)}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WriteUps */}
            {results.writeUps.length > 0 && (
              <div className="mb-8">
                <h2 className="p-white text-xl font-semibold mb-4">
                  {text.resultWriteUps}
                </h2>
                <div className="space-y-4">
                  {results.writeUps.map((writeUp, index) => (
                    <div key={index} className="p-4 settings rounded break-words">
                      {/* Render writeUp details and console.log each */}
                      <a href={`/writeUps/${writeUp.id}`}>
                        {highlightText(writeUp.title, query)}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            {results.comments.length > 0 && (
              <div className="mb-8">
                <h2 className="p-white text-xl font-semibold mb-4">
                  {text.resultComments}
                </h2>
                <div className="space-y-4">
                  {results.comments.map((comment, index) => (
                    <div key={index} className="p-4 settings rounded break-words">
                      {/* Render comment details */}
                      <a
                        href={`/writeUps/${comment.writeup_id}#comment-${comment.id}`}
                      >
                        {highlightText(comment.content, query)}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
