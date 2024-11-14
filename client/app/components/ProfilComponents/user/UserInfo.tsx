import { useState, useContext, useEffect } from "react";
import ContextTest from "../../UserContext";

interface UserInfoProps {
  promoOptions: string[];
}

const UserInfo = ({
  promoOptions,
}: UserInfoProps) => {
  const { user, updatePromo } = useContext(ContextTest);
  const [promo, setPromo] = useState(null);

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
    <div className="bg-gray-800 rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">
        User Information
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-gray-400 block mb-1">Email</label>
          <p>{user.email}</p>
        </div>

        <div>
          <label className="text-gray-400 block mb-1">Role</label>
          <p>{user.role}</p>
        </div>

        <div>
          <label className="text-gray-400 block mb-1">Promo</label>
          <select
            value={promo}
            onChange={handlePromoChange}
            className="bg-gray-700 rounded px-3 py-2 w-full max-w-xs"
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
