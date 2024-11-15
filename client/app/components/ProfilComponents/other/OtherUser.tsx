import { useEffect, useContext, useState } from "react";
import OtherContext from "../../contexts/OtherContext";
import OtherInfo from "./OtherInfo";
import OtherBio from "./OtherBio";
import OtherSocialLink from "./OtherSocialLink";
import { generateGravatarUrl } from "../../../../utils/gravatar";
import otherProfil from "../../../../locales/otherProfil.json";
import UserContext from "../../contexts/UserContext";

const OtherUser = () => {
  const { visitedUser, fetchUser, setVisitedUser } = useContext(OtherContext);
  const { user } = useContext(UserContext);
  const [text, setText] = useState(otherProfil.english);

  useEffect(() => {
    if (user.language === "french") {
      setText(otherProfil.french);
    } else {
      setText(otherProfil.english);
    }
  }, [user]);

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
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Picture and Username Section */}
          <div className="card mb-4">
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
              <h2 className="text-2xl font-bold p-blue">
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
    // No user found
    return (
      <div className="px-6 py-11">
        <div className="max-w-4xl mx-auto flex justify-center items-center h-full">
          <h2 className="text-2xl font-bold p-white">{text.noUser}</h2>
        </div>
      </div>
    );
  }
};

export default OtherUser;
