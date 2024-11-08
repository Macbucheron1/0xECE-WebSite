"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import Link from 'next/link';

export default function WriteUp({ params }) {
  const { writeUpsId } = params;
  const [writeUp, setWriteUp] = useState(null);
  const [notFound, setNotFound] = useState(false);

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
      <div className="p-6 min-h-full flex items-center justify-center">
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
      <div className="p-6 min-h-full flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-6 min-h-full">
      <h2 className="wt-title mb-6">{writeUp.title}</h2>
      <p className="text-lg p-gray">{writeUp.type}</p>
      <p className="card-text text-right">
        {writeUp.username} - {formatDate(writeUp.date)}
      </p>
      <div className="mt-4">
        {writeUp.content}
      </div>
    </div>
  );
}