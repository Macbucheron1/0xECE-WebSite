"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { use, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import ContextTest from "./components/contexts/UserContext";
import home from "../locales/home.json";

export default function Home() {
  {
    /* Récupération des témoignages depuis la base de données */
  }
  const [testimonials, setTestimonials] = useState([]); //variable d'état pour stocker les témoignages
  const { user } = useContext(ContextTest);
  const [actualPP, setActualPP] = useState<string>("/img/inconnu.png");
  const [isFormOpen, setIsFormOpen] = useState(false); //variable d'état pour afficher ou masquer le formulaire
  const [name, setName] = useState(""); //variable d'état pour stocker le nom de l'utilisateur
  const [message, setMessage] = useState(""); //variable d'état pour stocker le message du témoignage
  const [hasSubmitted, setHasSubmitted] = useState(false); //variable d'état pour vérifier si l'utilisateur a déjà soumis un témoignage
  const [text, setText] = useState(home.english);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from("testimonials").select("*"); //SELECT * FROM testimonials
    if (error) {
      console.error(error);
    } else {
      setTestimonials(data); //stocker les témoignages dans la variable d'état
    }
  };
  useEffect(() => {
    fetchTestimonials(); //appel de la fonction fetchTestimonials lors du montage du composant
  }, []);

  /* Vérifier si l'utilisateur a déjà soumis un témoignage */
  useEffect(() => {
    const checkUserTestimonial = async () => {
      if (user && user.id) {
        const { data, error } = await supabase //SELECT user_uid FROM testimonials WHERE user_uid = user.id
          .from("testimonials")
          .select("user_uid")
          .eq("user_uid", user.id);
        if (error) {
          console.error(error);
        } else if (data.length === 0) {
          setHasSubmitted(false); //si l'utilisateur a déjà soumis un témoignage, mettre à jour la variable d'état
        } else {
          setHasSubmitted(true);
        }
      }
    };
    checkUserTestimonial();
  }, [user]);

  useEffect(() => {
    if (user.language === "french") {
      setText(home.french);
    } else {
      setText(home.english);
    }
  }, [user]);


  /* Création d'un témoignage */
  const createTestimonial = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from reloading the page
    const { error } = await supabase.from("testimonials").insert([
      {
        user_uid: user.id,
        message: message,
        image_url: actualPP,
        name: name,
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      setHasSubmitted(true); //mettre à jour la variable d'état pour indiquer que l'utilisateur a soumis un témoignage
      fetchTestimonials(); //mettre à jour la liste des témoignages
      setIsFormOpen(false); //masquer le formulaire
      setName("");
      setMessage("");
    }
  };

  useEffect(() => {
    if (user) {
      if (user.fav_pp_provider === "gravatar") {
        setActualPP(user.pp.gravatar);
      } else if (user.fav_pp_provider === "discord") {
        setActualPP(user.pp.discord);
      } else if (user.fav_pp_provider === "github") {
        setActualPP(user.pp.github);
      }
    }
  }, [user]);

  // Modifier la configuration du slider
  const settings = {
    dots: true,
    infinite: testimonials.length > 3, // Désactive le défilement infini s'il y a moins de 3 témoignages
    speed: 500,
    slidesToShow: Math.min(3, testimonials.length), // Limite le nombre de slides au nombre de témoignages disponibles
    slidesToScroll: 1,
    autoplay: testimonials.length > 3, // Désactive l'autoplay s'il y a moins de 3 témoignages
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, testimonials.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
      <section className="my-32">
        <h2 className="text-3xl font-bold mb-6 p-blue text-center">
          {text.Testimonials}
        </h2>
        <div className="max-w-6xl mx-auto px-4">
          {testimonials.length > 0 ? (
            <Slider {...settings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.user_uid} className="px-4">
                  <div className="card p-6 rounded-lg shadow h-96 flex flex-col max-w-sm mx-auto">
                    <img
                      src={testimonial.image_url}
                      alt="Témoignage"
                      className="w-32 h-32 mx-auto rounded-lg mb-4 object-cover"
                    />
                    <p className="text-lg italic p-gray flex-grow overflow-y-auto break-words">
                      "{testimonial.message}"
                    </p>
                    <p className="text-right mt-4 p-blue font-bold break-words">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center p-gray">{text.TestimonialsEmpty}</p>
          )}

          {user && user.id && !hasSubmitted && (
            <div className="flex justify-center mt-6">
              {!isFormOpen ? (
                <button className="button" onClick={() => setIsFormOpen(true)}>
                  {text.TestimonialsButton}
                </button>
              ) : (
                <div className="mt-4 card max-w-md mx-auto">
                  <h3 className="text-2xl font-bold mb-4 p-blue">
                    {text.TestimonialsButton}
                  </h3>
                  <form onSubmit={createTestimonial}>
                    <div className="mb-4">
                      <label className="block p-blue mb-2">
                        {text.TestimonialsName}
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={20}
                        required
                      />
                      {name.length === 20 && (
                        <p className="text-red-500">
                          {text.TestimonialsNameLimitation}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block p-blue mb-2">
                        {text.Testimonial}
                      </label>
                      <textarea
                        className="input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={150}
                        required
                      ></textarea>
                      {message.length === 150 && (
                        <p className="text-red-500 text-sm">
                          {text.TestimonialsTextLimitation}
                        </p>
                      )}
                      <p className="p-gray text-sm">
                        {150 - message.length} {text.TestimonialsLeftCharacters}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="mr-2 bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsFormOpen(false)}
                      >
                        {text.TestimonialsCancel}
                      </button>
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        {text.TestimonialsSubmit}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
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
