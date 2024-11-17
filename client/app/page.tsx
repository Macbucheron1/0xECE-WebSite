"use client";
import { useContext, useEffect, useState } from "react";
import ContextTest from "./components/contexts/UserContext";
import home from "../locales/home.json";
import Testimonials from "./components/Testimonials"; // Import the new Testimonials component

export default function Home() {
  const { user } = useContext(ContextTest);
  const [text, setText] = useState(home.english);

  useEffect(() => {
    if (user.language === "french") {
      setText(home.french);
    } else {
      setText(home.english);
    }
  }, [user]);


  return (
    <div className="p-6">
      {/* Logo et Titre */}
      <header className="flex flex-col items-center my-0 md:flex-row md:justify-between relative">
        <img
          src="/img/logo_0xECE.png"
          alt="Logo"
          className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 mb-4 md:mb-0"
        />
        <div className="text-center md:absolute md:left-1/2 md:-translate-x-1/2 md:w-full">
          <h1 className="text-5xl font-bold">{text.Title}</h1>
          <p className="text-xl p-gray">{text.SubTitle}</p>
        </div>
      </header>

      {/* Présentation de l'Association */}
      <section className="my-32 flex flex-col lg:flex-row mx-4 md:mx-8 lg:mx-16">
        <div className="w-full lg:w-2/5 p-4">
          <h2 className="text-3xl font-bold mb-4 text-center p-blue">
            {text.PresentationTitle}
          </h2>
          <p className="p-gray text-justify">{text.PresentationBody}</p>
        </div>
        <div className="w-full lg:w-3/5 p-4">
          <img
            src="/img/ctf.png"
            alt={text.imgAlt}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </section>

      {/* Valeurs (Cybersécurité, Apprentissage, Collaboration) */}
      <section className="my-32 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <img
            src="/img/bouclier_cyber.png"
            alt="Cybersécurité"
            className="mx-auto h-32 w-32 mb-4"
          />
          <h3 className="text-2xl font-bold p-blue">{text.ValueTitle1}</h3>
          <p className="p-gray">{text.ValueBody1}</p>
        </div>
        <div className="text-center">
          <img
            src="/img/cerveau.png"
            alt="Apprentissage"
            className="mx-auto h-32 w-32 mb-4"
          />
          <h3 className="text-2xl font-bold p-blue">{text.ValueTitle2}</h3>
          <p className="p-gray">{text.ValueBody2}</p>
        </div>
        <div className="text-center">
          <img
            src="/img/serrage_main.png"
            alt="Collaboration"
            className="mx-auto h-32 w-32 mb-4"
          />
          <h3 className="text-2xl font-bold p-blue">{text.ValueTitle3}</h3>
          <p className="p-gray">{text.ValueBody3}</p>
        </div>
      </section>

      {/* En Chiffres */}
      <section className="my-32 text-center">
        <h2 className="text-3xl font-bold mb-4 p-blue">{text.NumbersTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <p className="text-3xl font-bold p-blue">50+</p>
            <p className="p-gray">{text.NumberBody1}</p>
          </div>
          <div className="card">
            <p className="text-3xl font-bold p-blue">80+</p>
            <p className="p-gray">{text.NumberBody2}</p>
          </div>
          <div className="card">
            <p className="text-3xl font-bold p-blue">150+</p>
            <p className="p-gray">{text.NumberBody3}</p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <Testimonials /> 

      {/* "Rejoignez nous" Section */}
      <section className="my-32 text-center">
        <h2 className="text-3xl font-bold p-blue">{text.JoinUsTitle}</h2>
        <p className="p-gray mb-4 mt-4">{text.JoinUsBody}</p>
        {/* Bouton "Rejoindre" */}
        <a
          href="https://www.helloasso.com/associations/0xece/adhesions/inscription-chez-0xece"
          className="button"
        >
          {text.JoinUsButton}
        </a>
      </section>

    </div>
  );
}

{
  /*Pseudo code pour les temoignages*/
}
/*
ON PARCOURT LA LISTE DES TEMOIGNAGES
    ON LES AFFICHE DANS UN SLIDER
      CHAQUE TEMOIGNAGE CONTIENT UNE IMAGE, UN MESSAGE ET UN NOM
  SI L'UTILISATEUR EST CONNECTE ET N'A PAS ENCORE SOUMIS DE TEMOIGNAGE
    ON AFFICHE UN BOUTON "AJOUTER UN TEMOIGNAGE"
    SI LE BOUTON EST CLIQUE
    ON AFFICHE UN FORMULAIRE POUR AJOUTER UN TEMOIGNAGE
    LE FORMULAIRE CONTIENT UN CHAMP POUR LE NOM ET UN CHAMP POUR LE MESSAGE
    LE NOM EST LIMITE A 20 CARACTERES ET LE MESSAGE A 150 CARACTERES
    SI LE NOM OU LE MESSAGE DEPASSE LA LIMITE
      ON AFFICHE UN MESSAGE D'ERREUR
    SI LE FORMULAIRE EST SOUMIS
      ON VERIFIE QUE LE MESSAGE CONTIENT AU MOINS 10 CARACTERES ET LE NOM AU MOINS 3 CARACTERES
      SI LES CONDITIONS SONT RESPECTEES
        ON AJOUTE LE TEMOIGNAGE A LA BASE DE DONNEES
        SI L'AJOUT EST REUSSI
          ON MET A JOUR LA LISTE DES TEMOIGNAGES (SUR LE FRONTEND)
          ON AFFICHE UN MESSAGE DE SUCCES
*/
