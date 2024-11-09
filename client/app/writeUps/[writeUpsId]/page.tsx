"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function WriteUp({ params }) {
  const { writeUpsId } = params;
  const [writeUp, setWriteUp] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [comments, setComments] = useState([
    "Commentaire 1",
    "Commentaire 2",
    "Commentaire 3",
    "Commentaire 4"
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const nextPage = () => {
    if (indexOfLastComment < comments.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (indexOfFirstComment > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const fetchWriteUp = async () => {
    const { data, error } = await supabase
      .from('writeups')
      .select('*')
      .eq('id', writeUpsId)
      .single(); //SELECT * FROM writeups WHERE id = writeUpsId
    if (error || !data) {
      console.log(error);
      setTimeout(() => {
        setNotFound(true);
      }, 3000); // Après 3 secondes, on affiche un message d'erreur
    } else {
      setWriteUp(data);
    }
  };

  useEffect(() => {
    fetchWriteUp();
  }, [writeUpsId]); //permets de recharger le write-up si l'id change

  if (notFound) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <p>Aucun write-up correspondant n'a été trouvé.</p>
          <Link href="/writeUps">
            <button className="button my-8">Retour</button>
          </Link>
        </div>
      </div>
    );
  }

  if (!writeUp) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-6 overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <Link href="/writeUps">
          <button className="button my-8">Retour</button>
        </Link>
        <h2 className="wt-title mb-6">{writeUp.title}</h2>
        <p className="text-lg p-gray">{writeUp.type}</p>
        <p className="text-lg p-gray">
          Username: {writeUp.username}
          <br />
          Date: {formatDate(writeUp.date)}
        </p>
        <div className="mt-4 markdown">
          <ReactMarkdown>
            {writeUp.content}
          </ReactMarkdown>
        </div>
        <div className="mt-8">
          <h3 className="text-left">Commentaires</h3>
          <textarea
            className="w-full p-2 mt-2 border rounded"
            placeholder="Saisissez votre commentaire..."
          ></textarea>
          <button className="button mt-2 float-right">Publier</button>
        </div>
        <div className="mt-8">
          {currentComments.map((comment, index) => (
            <div key={index} className="p-2 border-b">
              {comment}
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button onClick={prevPage} disabled={currentPage === 1}>
              &larr; Précédent
            </button>
            <button onClick={nextPage} disabled={indexOfLastComment >= comments.length}>
              Suivant &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

