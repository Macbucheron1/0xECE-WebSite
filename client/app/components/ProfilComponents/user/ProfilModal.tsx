import { useState, useEffect, useContext } from "react";
import ContextTest from "../../UserContext";

const ProfilModal = ({ isOpen, onClose, newLinkProvider }) => {
  const [linkValue, setLinkValue] = useState("");
  const { user } = useContext(ContextTest);

  useEffect(() => {
    if (user) {
      if (newLinkProvider === "linkedin") {
        setLinkValue(user.linkedin_url || "");
      } else if (newLinkProvider === "rootme") {
        setLinkValue(user.rootme_url || "");
      } else if (newLinkProvider === "tryhackme") {
        setLinkValue(user.tryhackme_url || "");
      } else if (newLinkProvider === "htb") {
        setLinkValue(user.htb_url || "");
      }
    }
  }, []);

  const handleModalClose = () => {
    onClose(linkValue);
    setLinkValue("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Enter Link</h2>
        <input
          type="text"
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
          className="w-full bg-gray-700 p-2 rounded-lg mb-4"
          placeholder="Enter link..."
        />
        <button
          onClick={handleModalClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProfilModal;
