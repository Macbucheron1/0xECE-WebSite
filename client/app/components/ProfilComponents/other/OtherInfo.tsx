import React, { useContext } from "react";
import OtherContext from "../../contexts/OtherContext";
import Context from "../../contexts/UserContext";
import otherProfil from "../../../../locales/otherProfil.json";
import { useState, useEffect } from "react";

const OtherInfo = () => {
  const { visitedUser } = useContext(OtherContext);
  const { user } = useContext(Context);
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
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">
        {text.infoTitle}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-gray-400 block mb-1">{text.infoEmail}</label>
          <p>{visitedUser.email}</p>
        </div>

        <div>
          <label className="text-gray-400 block mb-1">{text.infoRole}</label>
          <p>{visitedUser.role}</p>
        </div>

        <div>
          <label className="text-gray-400 block mb-1">{text.infoPromo}</label>
          {visitedUser.promo === null ? (
            <p>{text.noPromo}</p>
          ) : (
            <p>{visitedUser.promo}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherInfo;
