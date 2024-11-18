"use client";
import { useEffect, useState, useContext } from "react";
import { supabase } from "../../../utils/supabaseClient";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import ContextTest from "../../components/contexts/UserContext";
import { useRouter } from "next/navigation"; // Import useRouter
import Loader from "../../components/Loader";
import writeups from "../../../locales/writeups.json";

export default function WriteUp({ params }) {
  const { writeUpsId } = params;
  const [writeUp, setWriteUp] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;
  const [formData, setFormData] = useState({ email: "", commentContent: "" });
  const { user } = useContext(ContextTest);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasMore, setHasMore] = useState(false); //allows to know if there are more comments to display
  const [isAuthor, setIsAuthor] = useState(false); // Add a state to store the author status
  const router = useRouter(); // Initialize useRouter
  const [actualPP, setActualPP] = useState<string>("/img/inconnu.png");
  const [text, setText] = useState(writeups.english);

  useEffect(() => {
    if (user.language === "french") {
      setText(writeups.french);
    } else {
      setText(writeups.english);
    }
  }, [user]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  const fetchWriteUp = async () => {
    const { data, error } = await supabase
      .from("writeups")
      .select("*")
      .eq("id", writeUpsId)
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
    const end = start + commentsPerPage; // Fetch one extra comment
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("writeup_id", writeUpsId)
      .order("date", { ascending: false })
      .range(start, end);
    if (error) {
      console.log(error);
    } else {
      if (data.length > commentsPerPage) {
        setHasMore(true);
        setComments(data.slice(0, commentsPerPage)); // Display only the required comments
      } else {
        setHasMore(false);
        setComments(data);
      }
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
    fetchWriteUp();
  }, [writeUpsId]); //permets de recharger le write-up si l'id change

  useEffect(() => {
    fetchComments();
  }, [writeUpsId, currentPage]); // Include currentPage as a dependency

  /*Check if the current user is the author */
  const checkAuthor = async () => {
    if (user && user.id) {
      const { data, error } = await supabase
        .from("writeups")
        .select("user_uid")
        .eq("id", writeUpsId)
        .single(); // SELECT user_uid FROM writeups WHERE id = writeUpsId
      if (error) {
        console.log(error);
      } else if (data.user_uid === user.id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const fetchAuthorStatus = async () => {
      const result = await checkAuthor();
      setIsAuthor(result);
    };
    fetchAuthorStatus();
  }, [user]); // Use useEffect to check if the user is the author

  if (notFound) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <p>{text.notFound}</p>
          <Link href="/writeUps">
            <button className="button my-8">{text.particularBackButton}</button>
          </Link>
        </div>
      </div>
    );
  }

  if (!writeUp) {
    return <Loader />;
  }

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  const nextPage = () => {
    if (hasMore) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //Publish a comment
  const handlePublish = async (e) => {
    e.preventDefault();
    if (formData.email.length > 100) {
      // Validate email length
      setErrorMessage(text.publishSizeError);
      return;
    }
    let username = user && user.username ? user.username : "Anonyme";
    let image_url = user && user.username ? actualPP : "/img/inconnu.png";
    let user_uid = user && user.username ? user.id : null;

    const { error } = await supabase.from("comments").insert({
      content: formData.commentContent,
      username: username,
      date: new Date().toISOString(),
      writeup_id: writeUpsId,
      image_url: image_url,
      user_uid: user_uid,
      email: formData.email, // Include email for non-logged-in users
    });
    if (error) {
      console.log(error);
    } else {
      setFormData({ email: "", commentContent: "" }); // Clear the form data
      fetchComments(); // Update the comments list
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("writeups")
      .delete()
      .eq("id", writeUpsId); // Delete the write-up from Supabase
    if (error) {
      console.log(error);
    } else {
      router.push("/writeUps"); // Redirect after deletion
    }
  };

  return (
    <div className="p-6 overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center my-8">
          <Link href="/writeUps">
            <button className="button">{text.particularBackButton}</button>
          </Link>
          {isAuthor && (
            <div>
              <button
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 mr-2"
                onClick={handleDelete}
              >
                {text.particularDeleteButton}
              </button>
              <Link href={`/writeUps/${writeUpsId}/edit`}>
                <button className="button">{text.particularEditButton}</button>
              </Link>
            </div>
          )}
        </div>
        <h2 className="wt-title mb-6">{writeUp.title}</h2>
        <p className="text-lg p-gray">
          {text.particularWritten}{" "}
          <Link
            href={`/profil/${writeUp.user_uid}`}
            className="p-blue underline"
          >
            {writeUp.username}
          </Link>
          <br />
          {text.particularDatePrefix} {formatDate(writeUp.date)}
        </p>
        <div className="mt-4 markdown">
          <ReactMarkdown>{writeUp.content}</ReactMarkdown>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-bold p-blue text-left my-4">
            {text.particularCommentary}
          </h1>
          <form onSubmit={handlePublish}>
            {user && !user.id && (
              <input
                type="email"
                className="input mb-2"
                placeholder={text.particularCommentaryEmailPlaceholder}
                value={formData.email}
                required
                maxLength={100} // Limit email to 100 characters
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            )}
            {formData.email.length >= 100 && (
              <p className="text-red-500 text-sm mb-4">
                {text.particularMaxCommentEmailSize}
              </p>
            )}
            <textarea
              className="input"
              placeholder={text.particularCommentaryTextPlaceholder}
              value={formData.commentContent}
              onChange={(e) =>
                setFormData({ ...formData, commentContent: e.target.value })
              }
              required
              maxLength={200}
            ></textarea>
            {formData.commentContent.length >= 200 && (
              <p className="text-red-500 text-sm">
                {text.paritcularMaxCommentTextSize}
              </p>
            )}
            <p className="p-gray text-sm">
              {200 - formData.commentContent.length} {text.particularCharaLeft}
            </p>
            <button type="submit" className="button float-right">
              {text.particularSubmitButton}
            </button>
          </form>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <div className="mt-16">
          {comments.map((comment) => (
            <div
              key={comment.id}
              id={`comment-${comment.id}`}
              className="card mt-4"
            >
              <div className="flex items-center">
                {comment.user_uid ? (
                  <Link href={`/profil/${comment.user_uid}`}>
                    <img
                      src={comment.image_url}
                      alt={`${comment.username}'s profile picture`}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                  </Link>
                ) : (
                  <img
                    src={comment.image_url}
                    alt={`${comment.username}'s profile picture`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                )}
                <p className="text-lg p-blue font-bold">
                  {comment.user_uid ? (
                    <Link
                      href={`/profil/${comment.user_uid}`}
                      className="p-blue underline"
                    >
                      {comment.username}
                    </Link>
                  ) : (
                    <span className="p-blue">{comment.username}</span>
                  )}
                </p>
              </div>
              <p className="break-words">{comment.content}</p>
              <p className="p-gray text-right">{formatDate(comment.date)}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="font-bold p-gray text-center mt-16">
              {text.particularNoCommentary}
            </p>
          )}
          {comments.length > 0 && (
            <div className="flex justify-between mt-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="button disabled:opacity-50 disabled:cursor-not-allowed "
              >
                &larr; {text.mainPreviousButton}
              </button>
              <span>Page {currentPage}</span>
              <button
                onClick={nextPage}
                disabled={!hasMore}
                className="button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {text.mainNextButton} &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
