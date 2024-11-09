"use client";
import { useEffect, useState, useContext } from "react";
import { supabase } from "../../../utils/supabaseClient";
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import ContextTest from "../../components/UserContext";

export default function WriteUp({ params }) {
  const { writeUpsId } = params;
  const [writeUp, setWriteUp] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [comments, setComments] = useState([]); // Initialise les commentaires
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;
  const [commentContent, setCommentContent] = useState('');
  const { user } = useContext(ContextTest);
  const [errorMessage, setErrorMessage] = useState('');

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

  const fetchComments = async () => {
    const start = (currentPage - 1) * commentsPerPage;
    const end = start + commentsPerPage - 1;
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('writeup_id', writeUpsId)
      .order('date', { ascending: false })
      .range(start, end);
    if (error) {
      console.log(error);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchWriteUp();
  }, [writeUpsId]); //permets de recharger le write-up si l'id change

  useEffect(() => {
    fetchComments();
  }, [writeUpsId, currentPage]); // Recharge les commentaires lorsque l'ID ou la page change

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

  const nextPage = () => {
    if (comments.length === commentsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePublish = async () => {
    if (user && user.id) {
      const { error } = await supabase.from('comments').insert({
        content: commentContent,
        username: user.username,
        date: new Date().toISOString(),
        writeup_id: writeUpsId,
      });
      if (error) {
        console.log(error);
      } else {
        setCommentContent('');
        fetchComments(); // Met à jour la liste des commentaires
      }
    } else {
      setErrorMessage('Veuillez vous connecter pour publier un commentaire');
    }
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
          <h1 className="text-2xl font-bold p-blue text-left my-4">Commentaires</h1>
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Saisissez votre commentaire..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            maxLength={200}
          ></textarea>
          {commentContent.length >= 200 && (
            <p className="text-red-500">Vous avez atteint la taille maximale de commentaire.</p>
          )}
          <p className="p-gray">{200 - commentContent.length} caractères restants.</p>
          <button className="button float-right" onClick={handlePublish}>Publier</button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <div className="mt-8">
          {comments.map((comment) => (
            <div key={comment.id} className="p-2 border-b">
              <p><strong>{comment.username}</strong> - {formatDate(comment.date)}</p>
              <p>{comment.content}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="font-bold p-gray text-center mt-16">Aucun commentaire pour le moment.</p>
          )}
          {comments.length > 0 && (
            <div className="flex justify-between mt-4">
              <button onClick={prevPage} disabled={currentPage === 1}>
                &larr; Précédent
              </button>
              <span>Page {currentPage}</span>
              <button onClick={nextPage} disabled={comments.length < commentsPerPage}>
                Suivant &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

