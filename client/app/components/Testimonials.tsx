"use client";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import ContextTest from "./contexts/UserContext";
import home from "../../locales/home.json";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const { user } = useContext(ContextTest);
  const [actualPP, setActualPP] = useState<string>("/img/inconnu.png");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [text, setText] = useState(home.english);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from("testimonials").select("*");
    if (error) {
      console.error(error);
    } else {
      setTestimonials(data);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const checkUserTestimonial = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("testimonials")
          .select("user_uid")
          .eq("user_uid", user.id);
        if (error) {
          console.error(error);
        } else if (data.length === 0) {
          setHasSubmitted(false);
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

  const createTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setHasSubmitted(true);
      fetchTestimonials();
      setIsFormOpen(false);
      setName("");
      setMessage("");
    }
  };

  {/*Get the user's profile picture*/}
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

  {/*Get the number of slides to display based on the screen size*/}
  const getSlideCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2;  // md
      return 1; // sm
    }
    return 3; // default
  };

  const nextSlide = () => {
    const slideCount = getSlideCount();
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - slideCount ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => { 
    const slideCount = getSlideCount();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - slideCount : prevIndex - 1
    );
  };

  return (
    <section className="my-32">
      <h2 className="text-3xl font-bold mb-6 p-blue text-center">
        {text.Testimonials}
      </h2>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16"> 
        {testimonials.length > 0 ? (
          <div className="relative w-full">
            <div className="relative overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / getSlideCount())}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.user_uid}
                    className="w-full sm:w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
                  >
                    <div className="mx-auto max-w-sm sm:max-w-md md:max-w-md lg:max-w-sm card p-6 rounded-lg shadow flex flex-col h-[350px]">
                      <img
                        src={testimonial.image_url}
                        alt="Témoignage"
                        className="w-24 h-24 mx-auto rounded-lg mb-4 object-cover"
                      />
                      <p className="text-xl italic p-gray flex-grow overflow-y-auto break-words">
                        "{testimonial.message}"
                      </p>
                      <p className="text-2xl text-right mt-4 p-blue font-bold break-words">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button 
              className="absolute -left-8 sm:-left-10 md:-left-12 top-1/2 -translate-y-1/2 z-30 navbar p-2 rounded-full shadow"
              onClick={prevSlide}
            >
              ←
            </button>
            <button 
              className="absolute -right-8 sm:-right-10 md:-right-12 top-1/2 -translate-y-1/2 z-30 navbar p-2 rounded-full shadow"
              onClick={nextSlide}
            >
              →
            </button>
          </div>
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
  );
};

export default Testimonials;