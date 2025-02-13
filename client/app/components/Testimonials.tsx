"use client";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import ContextTest from "./contexts/UserContext";
import home from "../../locales/home.json";

/**
 * Testimonials component that displays user testimonials and allows authenticated users to submit one.
 * @returns {JSX.Element} The rendered testimonials section.
 */
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const { user } = useContext(ContextTest);
  const [actualPP, setActualPP] = useState<string>("/img/inconnu.png");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [text, setText] = useState(home.english);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", message: "" });

  /**
   * Fetches testimonials from the database.
   */
  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from("testimonials").select("*");
    if (error) {
      console.error(error);
    } else {
      setTestimonials(data);
    }
  };

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Check if the user has already submitted a testimonial
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

  // Update text based on user's language preference
  useEffect(() => {
    if (user.language === "french") {
      setText(home.french);
    } else {
      setText(home.english);
    }
  }, [user]);

  /**
   * Handles the creation of a new testimonial.
   * @param {React.FormEvent} e - The form submission event.
   */
  const createTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("testimonials").insert([
      {
        user_uid: user.id,
        message: formData.message,
        image_url: actualPP,
        name: formData.name,
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      setHasSubmitted(true);
      fetchTestimonials();
      setIsFormOpen(false);
      setFormData({ name: "", message: "" });
    }
  };

  // Get the user's profile picture
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

  /**
   * Determines the number of slides to display based on the screen size.
   * @returns {number} The number of slides to display.
   */
  const getSlideCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // Large screens
      if (window.innerWidth >= 768) return 2;  // Medium screens
      return 1; // Small screens
    }
    return 3; // Default to 3
  };

  /**
   * Moves to the next slide in the testimonials carousel.
   */
  const nextSlide = () => {
    const slideCount = getSlideCount();
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - slideCount ? 0 : prevIndex + 1
    );
  };

  /**
   * Moves to the previous slide in the testimonials carousel.
   */
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
          // Testimonials Carousel
          <div className="relative w-full">
            <div className="relative overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / getSlideCount())}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
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
                        &quot;{testimonial.message}&quot;
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
          // Message when no testimonials are available
          <p className="text-center p-gray">{text.TestimonialsEmpty}</p>
        )}

        {user && user.id && !hasSubmitted && (
          <div className="flex justify-center mt-6">
            {!isFormOpen ? (
              // Button to open the testimonial submission form
              <button className="button" onClick={() => setIsFormOpen(true)}>
                {text.TestimonialsButton}
              </button>
            ) : (
              // Testimonial submission form
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
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      maxLength={20}
                      required
                    />
                    {formData.name.length === 20 && (
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
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      maxLength={150}
                      required
                    ></textarea>
                    {formData.message.length === 150 && (
                      <p className="text-red-500 text-sm">
                        {text.TestimonialsTextLimitation}
                      </p>
                    )}
                    <p className="p-gray text-sm">
                      {150 - formData.message.length} {text.TestimonialsLeftCharacters}
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