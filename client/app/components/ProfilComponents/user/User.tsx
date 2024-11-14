import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import ContextTest from "../../contexts/UserContext";
import UserInfo from "./UserInfo";
import Bio from "./Bio";
import SocialLink from "./SocialLink";
import ProfilModal from "./ProfilModal";
import userProfil from "../../../../locales/userProfil.json";

const User = () => {
  const promoOptions = [
    "ing1",
    "ing2",
    "ing3",
    "ing4",
    "ing5",
    "Bachelor1",
    "Bachelor2",
    "Bachelor3",
  ];
  const [currentPPIndex, setCurrentPPIndex] = useState(0);
  const [availablePPs, setAvailablePPs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLinkProvider, setNewLinkProvider] = useState("");
  const router = useRouter();
  const { user, logout, updateFavPPProvider, updateLink } =
    useContext(ContextTest);
  const [text, setText] = useState(userProfil.english);

  useEffect(() => {
    if (user.language === "french") {
      setText(userProfil.french);
    } else {
      setText(userProfil.english);
    }
  }, [user]);

  // Set initial index based on favorite provider
  useEffect(() => {
    if (user && user.pp) {
      // Filter out null profile pictures and create an array of available ones
      const availablePPs = Object.entries(user.pp)
        .filter(([_, value]) => value !== null)
        .map(([provider, url]) => ({ provider, url }));

      setAvailablePPs(availablePPs);

      const favIndex = availablePPs.findIndex(
        (pp) => pp.provider === user.fav_pp_provider
      );
      if (favIndex !== -1) {
        setCurrentPPIndex(favIndex);
      }
    }
  }, [user]);

  const handleModaleOpen = (provider: string) => {
    setIsModalOpen(true);
    setNewLinkProvider(provider);
  };

  const handleModalClose = (newLinkValue: string) => {
    console.log("new link in the page: ", newLinkValue);
    updateLink(newLinkValue, newLinkProvider);
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleUpdatePP = async (provider: string) => {
    await updateFavPPProvider(provider);
  };

  const handlePrevPP = () => {
    setCurrentPPIndex((prev) => {
      const newIndex = prev === 0 ? availablePPs.length - 1 : prev - 1;
      handleUpdatePP(availablePPs[newIndex].provider);
      return newIndex;
    });
  };

  const handleNextPP = () => {
    setCurrentPPIndex((prev) => {
      const newIndex = prev === availablePPs.length - 1 ? 0 : prev + 1;
      handleUpdatePP(availablePPs[newIndex].provider);
      return newIndex;
    });
  };

  return (
    <div className="bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Picture and Username Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-4">
          <div className="flex flex-col items-center mb-4">
            {/* Profile Picture Carousel */}
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={handlePrevPP}
                className="text-2xl text-gray-400 hover:text-cyan-400 transition-colors"
              >
                ←
              </button>

              <div className="relative w-24 h-24">
                {availablePPs.length > 0 && (
                  <img
                    src={availablePPs[currentPPIndex].url}
                    alt={`${availablePPs[currentPPIndex].provider} profile`}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                )}
              </div>

              <button
                onClick={handleNextPP}
                className="text-2xl text-gray-400 hover:text-cyan-400 transition-colors"
              >
                →
              </button>
            </div>

            {/* Provider Label */}
            <div className="text-sm text-gray-400 mb-4">
              {availablePPs[currentPPIndex]?.provider.charAt(0).toUpperCase() +
                availablePPs[currentPPIndex]?.provider.slice(1)}
            </div>

            {/* Username */}
            <h2 className="text-2xl font-bold text-cyan-400">
              {user.username}
            </h2>
          </div>
        </div>

        {/* User Information Card */}
        <UserInfo promoOptions={promoOptions} />

        {/* Bio Section */}
        <Bio />

        {/* Link Buttons */}
        <SocialLink handleModaleOpen={handleModaleOpen} />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors"
        >
          {text.logoutButton}
        </button>
        {/* Modal Window */}
        {isModalOpen && (
          <ProfilModal
            newLinkProvider={newLinkProvider}
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default User;
