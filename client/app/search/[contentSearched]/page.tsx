"use client";

import { useEffect, useState } from "react";
import getSearchInfo from "../../../utils/getSearchInfo";

const SearchResults = ({ params }) => {
  const query = params.contentSearched;

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
      <div className="border-b border-gray-700 pb-6 pt-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">Search Results</h1>
          <p className="text-gray-400">
            {loading
              ? "Searching..."
              : `Found ${
                  results.users.length +
                  results.writeUps.length +
                  results.comments.length
                } results for "${query}"`}
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
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                <div className="space-y-4">
                  {results.users.map((user, index) => (
                    <div key={index} className="p-4 bg-gray-800 rounded">
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
                <h2 className="text-xl font-semibold mb-4">WriteUps</h2>
                <div className="space-y-4">
                  {results.writeUps.map((writeUp, index) => (
                    <div key={index} className="p-4 bg-gray-800 rounded">
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
                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                <div className="space-y-4">
                  {results.comments.map((comment, index) => (
                    <div key={index} className="p-4 bg-gray-800 rounded">
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
