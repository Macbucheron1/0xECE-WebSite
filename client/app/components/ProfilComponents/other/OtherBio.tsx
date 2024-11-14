import React, { useContext, useEffect, useState } from "react";
import OtherContext from "../../contexts/OtherContext";
import ContextTest from "../../contexts/UserContext";
import otherProfil from "../../../../locales/otherProfil.json";

const OtherBio = () => {
  const { visitedUser } = useContext(OtherContext);
  const { user } = useContext(ContextTest);
  const [text, setText] = useState(otherProfil.english);

  useEffect(() => {
    if (user.language === "french") {
      setText(otherProfil.french);
    } else {
      setText(otherProfil.english);
    }
  }, [user]);

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">Bio</h2>
      {visitedUser.bio !== null && visitedUser.bio !== "<p><br></p>" ? (
        <div dangerouslySetInnerHTML={{ __html: visitedUser.bio }} />
      ) : (
        <p className="text-gray-400">{text.noBio}</p>
      )}
    </div>
  );
};

export default OtherBio;
