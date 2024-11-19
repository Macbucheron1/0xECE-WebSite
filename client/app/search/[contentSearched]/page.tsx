"use client";

import { useEffect, useState, useContext } from "react";
import getSearchInfo from "../../../utils/getSearchInfo";
import Context from "../../components/contexts/UserContext";
import search from "../../../locales/search.json";

const SearchResults = ({ params }) => {
  const query = decodeURI(params.contentSearched);
  const { user } = useContext(Context);
  const [text, setText] = useState(search.english);

  useEffect(() => {
    if (user.language === "french") {
      setText(search.french);
    } else {
      setText(search.english);
    }
  }, [user]);

  // This is a placeholder for your actual search logic
  const [results, setResults] = useState({
    users: [],
    writeUps: [],
    comments: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Simulate fetching grouped results
      getSearchInfo(query).then((data) => {
        setResults(data);
      });
      setLoading(false);
    }, 500);
  }, [query]);

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
