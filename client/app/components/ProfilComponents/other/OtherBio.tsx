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
    <div className="card mb-4">
      <h2 className="text-xl font-semibold mb-4 p-blue">Bio</h2>
      {visitedUser.bio !== null && visitedUser.bio !== "<p><br></p>" ? (
        <div className="p-white" dangerouslySetInnerHTML={{ __html: visitedUser.bio }} />
      ) : (
        <p className="text-gray-400">{text.noBio}</p>
      )}
    </div>
  );
};

export default OtherBio;
