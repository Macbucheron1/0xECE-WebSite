import React, { useContext } from "react";
import OtherContext from "../../contexts/OtherContext";

const OtherSocialLink = () => {
  const { visitedUser } = useContext(OtherContext);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <a
        className={`bg-gray-800 p-4 rounded-lg transition-colors ${
          !visitedUser.linkedin_url
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-700"
        }`}
        href={visitedUser.linkedin_url || "#"}
        target={visitedUser.linkedin_url ? "_blank" : "_self"}
        aria-disabled={!visitedUser.linkedin_url}
        title={
          !visitedUser.linkedin_url ? "The user has not set this link yet!" : ""
        }
      >
        <img
          src="/img/linkedin.png"
          alt="Linkedin"
          className="w-16 h-16 mx-auto object-contain"
        />
      </a>
      <a
        className={`bg-gray-800 p-4 rounded-lg transition-colors ${
          !visitedUser.rootme_url
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-700"
        }`}
        href={visitedUser.rootme_url || "#"}
        target={visitedUser.rootme_url ? "_blank" : "_self"}
        aria-disabled={!visitedUser.rootme_url}
        title={
          !visitedUser.rootme_url ? "The user has not set this link yet!" : ""
        }
      >
        <img
          src="/img/rootme.png"
          alt="RootMe"
          className="w-16 h-16 mx-auto object-contain"
        />
      </a>
      <a
        className={`bg-gray-800 p-4 rounded-lg transition-colors ${
          !visitedUser.htb_url
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-700"
        }`}
        href={visitedUser.htb_url || "#"}
        target={visitedUser.htb_url ? "_blank" : "_self"}
        aria-disabled={!visitedUser.htb_url}
        title={
          !visitedUser.htb_url ? "The user has not set this link yet!" : ""
        }
      >
        <img
          src="/img/htb.png"
          alt="HTB"
          className="w-16 h-16 mx-auto object-contain"
        />
      </a>
      <a
        className={`bg-gray-800 p-4 rounded-lg transition-colors ${
          !visitedUser.tryhackme_url
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-700"
        }`}
        href={visitedUser.tryhackme_url || "#"}
        target={visitedUser.tryhackme_url ? "_blank" : "_self"}
        aria-disabled={!visitedUser.tryhackme_url}
        title={
          !visitedUser.tryhackme_url
            ? "The user has not set this link yet!"
            : ""
        }
      >
        <img
          src="/img/tryhackme.png"
          alt="TryHackMe"
          className="w-16 h-16 mx-auto object-contain"
        />
      </a>
    </div>
  );
};

export default OtherSocialLink;
