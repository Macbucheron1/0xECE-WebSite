"use client";

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavMenu from "./NavMenu";
import NotificationButton from "./NotifButton";
import SettingsButton from "./SettingButton";
import HamburgerButton from "./HamburgerButton";
import SearchInput from "./SearchInput";
import ProfileButton from "./ProfilButton";

const Header = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 640px)" });
  const [isClient, setIsClient] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-wrap -mx-3 mb-5 rounded-lg fixed top-3 left-2 right-2 z-10">
      <div className="px-2 mb-6 mx-auto w-11/12 bg-gray-100 rounded-xl">
        <div
          className={`bg-transparent sm:flex items-stretch justify-between grow lg:mb-0 py-4 px-5 ${
            isClient && isBigScreen ? "" : "space-y-3"
          }`}
        >
          {isClient && isBigScreen ? (
            <>
              {/* Search Bar top profile info bottom */}
              <ProfileButton />
              <div className="flex items-center lg:shrink-0 lg:flex-nowrap">
                <SearchInput />
                <HamburgerButton
                  isNavOpen={isNavOpen}
                  setIsNavOpen={setIsNavOpen}
                />
                <SettingsButton />
                <NotificationButton />
              </div>
            </>
          ) : (
            <>
              {/* Search Bar top profile info bottom */}
              <SearchInput />
              <div className="flex items-center lg:shrink-0 lg:flex-nowrap justify-between w-full ">
                <ProfileButton />
                <HamburgerButton
                  isNavOpen={isNavOpen}
                  setIsNavOpen={setIsNavOpen}
                />
                <SettingsButton />
                <NotificationButton />
              </div>
            </>
          )}
        </div>
        <div>{isNavOpen ? <NavMenu /> : null}</div>
      </div>
    </div>
  );
};

export default Header;
