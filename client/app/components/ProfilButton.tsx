import { generateGravatarUrl } from "../../utils/gravatar";
import { useRouter } from "next/navigation";

const ProfileButton = () => {
  const router = useRouter();
  const userName = "NathanDeprat";
  const profilePictureUrl = generateGravatarUrl("nathan.deprat@edu.ece.fr");

  return (
    <button
      className="bg-white flex items-center mr-3 shadow-md rounded-2xl p-2 hover:shadow-xl"
      onClick={() => {
        console.log("Profil");
        router.push(`/profil/${userName}`);
      }}
    >
      <img
        src={profilePictureUrl}
        alt={`${userName}'s profile`}
        className="w-10 h-10 rounded-full mr-0 lg:mr-2"
      />
      <span className="my-0 text-dark font-semibold text-[1.35rem]/[1.2] justify-center hidden lg:block mr-1 overflow-hidden">
        {userName}
      </span>
    </button>
  );
};

export default ProfileButton;
