"use client";
import { useContext, useEffect, useState } from "react";
import { Carousel } from 'flowbite';
import type { CarouselItem, CarouselOptions, CarouselInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
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

  useEffect(() => {
    if (testimonials.length > 0) {
      const carouselElement: HTMLElement = document.getElementById('testimonials-carousel');
      
      const items: CarouselItem[] = testimonials.map((_, index) => ({
        position: index,
        el: document.getElementById(`testimonial-${index}`)
      }));

      const options: CarouselOptions = {
        defaultPosition: 0,
        interval: 3000,
        indicators: {
          activeClasses: 'bg-blue-600',
          inactiveClasses: 'bg-gray-400 hover:bg-blue-400',
          items: testimonials.map((_, index) => ({
            position: index,
            el: document.getElementById(`indicator-${index}`)
          }))
        }
      };

      const instanceOptions: InstanceOptions = {
        id: 'testimonials-carousel',
        override: true
      };

      const carousel: CarouselInterface = new Carousel(carouselElement, items, options, instanceOptions);
      carousel.cycle();

      return () => {
        // Cleanup if needed
      };
    }
  }, [testimonials]);

  return (
    <section className="my-32">
      <h2 className="text-3xl font-bold mb-6 p-blue text-center">
        {text.Testimonials}
      </h2>
      <div className="max-w-6xl mx-auto px-4">
        {testimonials.length > 0 ? (
          <div id="testimonials-carousel" className="relative w-full">
            <div className="relative h-96 overflow-hidden rounded-lg">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.user_uid}
                  id={`testimonial-${index}`}
                  className="hidden duration-700 ease-in-out"
                >
                  <div className="card p-6 rounded-lg shadow h-full flex flex-col max-w-sm mx-auto">
                    <img
                      src={testimonial.image_url}
                      alt="Témoignage"
                      className="w-32 h-32 mx-auto rounded-lg mb-4 object-cover"
                    />
                    <p className="text-lg italic p-gray flex-grow overflow-y-auto break-words">
                      "{testimonial.message}"
                    </p>
                    <p className="text-right mt-4 p-blue font-bold break-words mb-2">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  id={`indicator-${index}`}
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current={index === 0}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
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