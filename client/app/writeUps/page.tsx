"use client";
import { useEffect, useState, useContext } from "react";
import { supabase } from "../../utils/supabaseClient";
import Link from "next/link";
import ContextTest from "../components/contexts/UserContext";
import writeups from "../../locales/writeups.json";

/**
 * React component that displays a paginated list of write-ups.
 * Allows users to navigate between pages and create new write-ups if authenticated.
 */
export default function writeUps() {
  // State to store the list of write-ups
  const [writeUps, setWriteUps] = useState([]);
  // State to manage the current page number
  const [currentPage, setCurrentPage] = useState(1);
  // Number of write-ups displayed per page
  const writeUpsPerPage = 15;
  // Get the user object from context
  const { user } = useContext(ContextTest);
  // State to handle localized text based on user language
  const [text, setText] = useState(writeups.english);

  // Update localized text when user language changes
  useEffect(() => {
    if (user.language === "french") {
      setText(writeups.french);
    } else {
      setText(writeups.english);
    }
  }, [user]);

  /**
   * Fetches write-ups from the database based on the current page.
   * Uses Supabase to query the 'writeups' table.
   * Updates the 'writeUps' state with the fetched data.
   */
  const fetchWriteUps = async () => {
    const start = (currentPage - 1) * writeUpsPerPage;
    const end = start + writeUpsPerPage - 1;
    const { data, error } = await supabase
      .from("writeups")
      .select("*")
      .order("date", { ascending: false })
      .range(start, end); // SELECT * FROM writeups ORDER BY date DESC LIMIT 15 OFFSET 0
    if (error) console.log(error);
    else setWriteUps(data);
  };

  // Fetch write-ups when the component mounts or when currentPage changes
  useEffect(() => {
    fetchWriteUps();
  }, [currentPage]);

  /**
   * Formats a date string from ISO format to 'DD/MM/YYYY'.
   * @param {string} dateString - The ISO date string to format.
   * @returns {string} - The formatted date string.
   */
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-6 min-h-full flex flex-col">
      {" "}
      <h2 className="wt-title mb-6">Write-ups</h2>
      {user && user.id && (
        <div className="flex justify-end">
          <Link href="/writeUps/new">
            <button className="button">{text.mainPublishButton}</button>
          </Link>
        </div>
      )}
      <ul className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {writeUps.map((writeUp) => (
          <Link
            key={writeUp.id}
            href={`/writeUps/${writeUp.id}`}
            className="card hover:bg-gray-100 sm:hover:bg-gray-100 md:hover:bg-gray-500 flex flex-col"
          >
            <h3 className="p-blue text-xl font-bold break-words">
              {writeUp.title}
            </h3>
            <p className="text-lg p-gray break-words">{writeUp.type}</p>
            <div className="flex-grow"></div> {/* Spacer to push content up */}
            <p className="text-right mt-auto">
              {writeUp.username} - {formatDate(writeUp.date)}
            </p>
          </Link>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {text.mainPreviousButton}
        </button>
        <span className="text-lg font-semibold mx-4">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={writeUps.length < writeUpsPerPage}
          className="button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {text.mainNextButton}
        </button>
      </div>
    </div>
  );
}
