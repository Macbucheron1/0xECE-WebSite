import { useEffect, useContext } from "react";
import OtherContext from "../../OtherContext";
import OtherInfo from "./OtherInfo";
import OtherBio from "./OtherBio";
import OtherSocialLink from "./OtherSocialLink";
import { generateGravatarUrl } from "../../../../utils/gravatar";

const OtherUser = () => {
  const { visitedUser, fetchUser, setVisitedUser } = useContext(OtherContext);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (visitedUser) {
      if (!visitedUser.pp_url) {
        setVisitedUser({
          ...visitedUser,
          pp_url: generateGravatarUrl(visitedUser.email),
        });
      }
    }
  });

  if (visitedUser) {
    return (
      <div className="bg-gray-900 text-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Picture and Username Section */}
          <div className="bg-gray-800 rounded-lg p-6 mb-4">
            <div className="flex flex-col items-center mb-4">
              {/* Profile Picture Carousel */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-24 h-24">
                  <img
                    src={visitedUser.pp_url}
                    alt={`profile`}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Username */}
              <h2 className="text-2xl font-bold text-cyan-400">
                {visitedUser.username}
              </h2>
            </div>
          </div>

          {/* User Information Card */}
          <OtherInfo />

          {/* Bio Section */}
          <OtherBio />

          {/* Link Buttons */}
          <OtherSocialLink />
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <div className="bg-white p-6 rounded shadow mt-4">
          <h2 className="text-2xl text-gray-700 font-bold mb-4">
            User Information
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            Loading user information...
          </p>
        </div>
      </div>
    );
  }
};

export default OtherUser;
