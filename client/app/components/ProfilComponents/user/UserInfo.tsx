import { useState, useContext, useEffect } from "react";
import ContextTest from "../../contexts/UserContext";
import userProfil from "../../../../locales/userProfil.json";

interface UserInfoProps {
  promoOptions: string[];
}

const UserInfo = ({ promoOptions }: UserInfoProps) => {
  const { user, updatePromo } = useContext(ContextTest);
  const [promo, setPromo] = useState(null);
  const [text, setText] = useState(userProfil.english);

  useEffect(() => {
    if (user.language === "french") {
      setText(userProfil.french);
    } else {
      setText(userProfil.english);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (user.promo) setPromo(user.promo);
      else setPromo(promoOptions[0]);
    }
  }, [user]);

  const handlePromoChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPromo(e.target.value);
    await updatePromo(e.target.value);
  };

  return (
    <div className="card mb-4">
      <h2 className="text-xl font-semibold mb-4 p-blue">
        {text.infoTitle}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">{text.infoEmail}</label>
          <p className="p-white">{user.email}</p>
        </div>

        <div>
          <label className="block mb-1">{text.infoRole}</label>
          <p className="p-white">{user.role}</p>
        </div>

        <div>
          <label className="block mb-1">{text.infoPromo}</label>
          <select
            value={promo}
            onChange={handlePromoChange}
            className="p-gray2 rounded px-3 py-2 w-full max-w-xs"
            disabled={user.connected_with_discord}
          >
            {promoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
