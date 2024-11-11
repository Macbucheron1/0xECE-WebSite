"use client";
import { useEffect, useState, useContext } from "react";
import { supabase } from "../../utils/supabaseClient";
import Link from 'next/link';
import ContextTest from "../components/UserContext";

export default function writeUps() {

  const [writeUps, setWriteUps] = useState([]); //initialise state
  const [currentPage, setCurrentPage] = useState(1);
  const writeUpsPerPage = 15;
  const { user } = useContext(ContextTest);

  const fetchWriteUps = async () => {
    const start = (currentPage - 1) * writeUpsPerPage;
    const end = start + writeUpsPerPage - 1;
    const { data, error } = await supabase.from('writeups').select('*').order('date', {ascending: false}).range(start, end); // SELECT * FROM writeups ORDER BY date DESC LIMIT 15 OFFSET 0
    if(error)
      console.log(error);
    else
      setWriteUps(data);
  }
  useEffect (() => {
    fetchWriteUps();
  }, [currentPage]); // Refetch when currentPage changes
  
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="p-6 min-h-full">
      <h2 className="wt-title mb-6">Write-ups</h2>
      {user && user.id && (
        <div className="flex justify-end">
        <Link href="/writeUps/new">
          <button className="button">Publier un write-up</button>
        </Link>
      </div>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {writeUps.map((writeUp) => (
          <Link
            key={writeUp.id}
            href={`/writeUps/${writeUp.id}`}
            className="card hover:bg-gray-100 sm:hover:bg-gray-100 md:hover:bg-gray-500"
          >
            <h3 className="p-blue text-xl font-bold">{writeUp.title}</h3>
            <p className="text-lg p-gray">{writeUp.type}</p>
            <p className="text-right">
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
          Précédent
        </button>
        <span className="text-lg font-semibold mx-4">
          Page {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={writeUps.length < writeUpsPerPage}
          className="button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}