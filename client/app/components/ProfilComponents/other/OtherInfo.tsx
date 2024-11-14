import React, { useContext } from "react";
import OtherContext from "../../contexts/OtherContext";

const OtherInfo = () => {
  const { visitedUser } = useContext(OtherContext);

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">
        User Information
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-gray-400 block mb-1">Email</label>
          <p>{visitedUser.email}</p>
        </div>

        <div>
          <label className="text-gray-400 block mb-1">Role</label>
          <p>{visitedUser.role}</p>
        </div>

        <div>
          <label className="text-gray-400 block mb-1">Promo</label>
          {visitedUser.promo === null ? (
            <p>This user did not specify !</p>
          ) : (
            <p>{visitedUser.promo}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherInfo;
