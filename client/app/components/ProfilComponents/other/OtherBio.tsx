import React, { useContext } from "react";
import OtherContext from "../../OtherContext";

const OtherBio = () => {
  const { visitedUser } = useContext(OtherContext);

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">Bio</h2>
      {visitedUser.bio !== null ? (
        <div dangerouslySetInnerHTML={{ __html: visitedUser.bio }} />
      ) : (
        <p className="text-gray-400">The user has not set a bio yet !</p>
      )}
    </div>
  );
};

export default OtherBio;
