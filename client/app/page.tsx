"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  {/* Récupération des témoignages depuis la base de données */}
  const [testimonials, setTestimonials] = useState([]);
  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from('testimonials').select('*');
    if (error) {
      console.error(error);
    } else {
      setTestimonials(data);
    }
  };
  useEffect(() => {
    fetchTestimonials();
  }, []);

  {/* Récupération de l'utilisateur connecté */}
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Fetch the initial user state
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  });
  
  {/* Création d'un témoignage */}
  const createTestimonial = async () => {
    const { error } = await supabase.from('testimonials').insert([
      {
        username: user.user_metadata.name,    //Discord username
        message: 'Votre message ici',
        image_url: user.user_metadata.avatar_url,
        name: 'Votre nom',
      },
    ]);
    if (error) {
      console.error(error);
    } else {
      fetchTestimonials();
    }
  };

  // Modifier la configuration du slider
  const settings = {  
    dots: true,
    infinite: testimonials.length > 3,  // Désactive le défilement infini s'il y a moins de 3 témoignages
    speed: 500,
    slidesToShow: Math.min(3, testimonials.length), // Limite le nombre de slides au nombre de témoignages disponibles
    slidesToScroll: 1,
    autoplay: testimonials.length > 3,  // Désactive l'autoplay s'il y a moins de 3 témoignages
    autoplaySpeed: 3000,
    responsive: [       
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, testimonials.length),
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      {/* Logo et Titre */}
      <header className="flex flex-col items-center my-0 md:flex-row md:justify-between">
        <img src="/img/logo_0xECE.png" alt="Logo" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 mb-4 md:mb-0" />
        <div className="text-center md:flex-1">
          <h1 className="text-6xl font-bold">Bienvenue chez 0xECE</h1>
          <p className="text-gray-400">Association de cybersécurité de l'ECE Paris</p>
        </div>
      </header>

      {/* Présentation de l'Association */}
      <section className="my-32 flex flex-col md:flex-row lg:mx-32">
        <div className="md:w-1/2 lg:w-2/5 p-4">
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">Présentation de l'association</h2>
          <p className="text-gray-300 text-justify">
          L'association 0xECE de l'école ECE Paris regroupe une communauté de passionnés de cybersécurité désireux de développer leurs compétences et d'explorer les multiples facettes de la sécurité informatique. Notre mission principale est de promouvoir l'apprentissage continu, la collaboration entre étudiants, et l'innovation en matière de cybersécurité. À travers la participation régulière à des compétitions de type Capture The Flag (CTF), nous mettons en pratique des techniques de défense et d'attaque, apprenons à identifier et exploiter des vulnérabilités, et développons une expertise qui nous prépare aux défis de demain.
          </p>
        </div>
        <div className="md:w-1/2 lg:w-3/5 p-4">
          <img src="/img/ctf.png" alt="Image de l'association" className="rounded-lg shadow-lg w-full h-auto" />
        </div>
      </section>

      {/* Valeurs (Cybersécurité, Apprentissage, Collaboration) */}
      <section className="my-32 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <img src="/img/bouclier_cyber.png" alt="Cybersécurité" className="mx-auto h-32 w-32 mb-4" />
          <h3 className="text-2xl font-bold text-blue-400">Cybersécurité</h3>
          <p className="text-gray-400">Protection et défense informatique</p>
        </div>
        <div className="text-center">
          <img src="/img/cerveau.png" alt="Apprentissage" className="mx-auto h-32 w-32 mb-4" />
          <h3 className="text-2xl font-bold text-blue-400">Apprentissage</h3>
          <p className="text-gray-400">Formation continue en cybersécurité</p>
        </div>
        <div className="text-center">
          <img src="/img/serrage_main.png" alt="Collaboration" className="mx-auto h-32 w-32 mb-4" />
          <h3 className="text-2xl font-bold text-blue-400">Collaboration</h3>
          <p className="text-gray-400">Travail d'équipe et partage de connaissances</p>
        </div>
      </section>

      {/* En Chiffres */}
      <section className="my-32 text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">En Chiffres</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-blue-400">50+</p>
            <p className="text-gray-400">CTFs</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-blue-400">80+</p>
            <p className="text-gray-400">Membres Actifs</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-blue-400">150+</p>
            <p className="text-gray-400">Write-ups</p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="my-32">
        <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center">Témoignages</h2>
        <div className="max-w-6xl mx-auto px-4">
          {testimonials.length > 0 ? (
            <Slider {...settings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.username} className="px-4">
                  <div className="bg-gray-800 p-6 rounded-lg shadow h-96 flex flex-col max-w-sm mx-auto">
                    <img
                      src={testimonial.image_url} 
                      alt="Témoignage"
                      className="w-32 h-32 mx-auto rounded-lg mb-4 object-cover"
                    />
                    <p className="text-lg italic text-gray-300 flex-grow">
                      "{testimonial.message}"
                    </p>
                    <p className="text-right mt-4 text-blue-400 font-bold">
                      {testimonial.name}- Promo 
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-gray-400">Aucun témoignage disponible pour le moment.</p>
          )}
          
        </div>
        {user && (
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            onClick={createTestimonial}
          >
            Ajouter un témoignage
          </button>
        )}
      </section>
    </div>
  );
}





















