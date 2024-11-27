import { useRouter } from "next/navigation";
//import { useState } from "react";

const NotificationButton = () => {
  const router = useRouter();
  //const [newNotif, setNewNotif] = useState(true);
  const newNotif = true;

  return (
    <div className="relative flex items-center ml-2 lg:ml-4">
      {newNotif ? (
        <>
          {/* Ping Effect */}
          <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full animate-ping"></span>
          {/* Static Badge for Consistent Dot */}
          <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </>
      ) : null}
      <button
        className="flex items-center justify-center w-12 h-12 text-base font-medium leading-normal text-center transition-colors duration-150 ease-in-out navbar shadow border border-solid rounded-2xl text-stone-500 border-stone-200"
        onClick={() => {
          console.log("Notification");
          router.push("/notification");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default NotificationButton;
