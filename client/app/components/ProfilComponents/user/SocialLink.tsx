
import React from 'react';

const SocialLink = ({ handleModaleOpen}) => {

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <button
        className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
        onClick={() => handleModaleOpen("linkedin")}
      >
        <img
          src="/img/linkedin.png"
          alt="Linkedin"
          className="w-16 h-16 mx-auto object-contain"
        />
      </button>
      <button
        className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
        onClick={() => handleModaleOpen("rootme")}
      >
        <img
          src="/img/rootme.png"
          alt="RootMe"
          className="w-16 h-16 mx-auto object-contain"
        />
      </button>
      <button
        className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
        onClick={() => handleModaleOpen("htb")}
      >
        <img
          src="/img/htb.png"
          alt="HTB"
          className="w-16 h-16 mx-auto object-contain"
        />
      </button>
      <button
        className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
        onClick={() => handleModaleOpen("tryhackme")}
      >
        <img
          src="/img/tryhackme.png"
          alt="TryHackMe"
          className="w-16 h-16 mx-auto object-contain"
        />
      </button>
    </div>
  );
};

export default SocialLink;