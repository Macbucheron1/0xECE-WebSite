/**
 * @file AppHeader.tsx
 * @description This file contains the `Header` component which is responsible for rendering the application's header.
 */

import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import NavMenu from "./HeaderComponents/NavMenu";
import NotificationButton from "./HeaderComponents/NotifButton";
import SettingsButton from "./HeaderComponents/SettingButton";
import HamburgerButton from "./HeaderComponents/HamburgerButton";
import SearchInput from "./HeaderComponents/SearchInput";
import ProfileButton from "./HeaderComponents/ProfilButton";

/**
 * Header component
 *
 * This component renders the header of the application, which includes a profile button, search input,
 * hamburger button, settings button, and notification button. It also manages the state and positioning
 * of a navigation menu.
 *
 * @returns {JSX.Element | null} The rendered header component or null if not on the client side.
 */
const Header = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 640px)" });
  const [isClient, setIsClient] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navMenuLeft, setNavMenuLeft] = useState(0);
  const [navMenuTop, setNavMenuTop] = useState(0);
  const hamburgerButtonRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  /**
   * Sets the `isClient` state to true once the component is mounted.
   */
  useEffect(() => {
    setIsClient(true);
  }, []);

  /**
   * Updates the position of the navigation menu based on the position of the hamburger button and header.
   */
  const updateNavMenuPosition = () => {
    if (hamburgerButtonRef.current && headerRef.current) {
      const hamburgerRect = hamburgerButtonRef.current.getBoundingClientRect();
      const headerRect = headerRef.current.getBoundingClientRect();
      setNavMenuLeft(hamburgerRect.left);
      setNavMenuTop(headerRect.bottom);
    }
  };

  /**
   * Updates the navigation menu position when the `isNavOpen` state changes.
   */
  useEffect(() => {
    updateNavMenuPosition();
  }, [isNavOpen]);

  /**
   * Adds an event listener to update the navigation menu position on window resize.
   * Removes the event listener when the component is unmounted.
   */
  useEffect(() => {
    window.addEventListener("resize", updateNavMenuPosition);
    return () => {
      window.removeEventListener("resize", updateNavMenuPosition);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={headerRef}
      className="flex flex-wrap -mx-3 rounded-lg fixed top-3 left-2 right-2 z-10"
    >
      <div className="px-2 mx-auto w-11/12 bg-gray-100 rounded-xl">
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
                <div ref={hamburgerButtonRef}>
                  <HamburgerButton
                    isNavOpen={isNavOpen}
                    setIsNavOpen={setIsNavOpen}
                  />
                </div>
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
                <div ref={hamburgerButtonRef}>
                  <HamburgerButton
                    isNavOpen={isNavOpen}
                    setIsNavOpen={setIsNavOpen}
                  />
                </div>
                <SettingsButton />
                <NotificationButton />
              </div>
            </>
          )}
        </div>
      </div>
      {isNavOpen ? (
        <div
          className="fixed pb-2 pl-2 pr-2 rounded-br-xl rounded-bl-xl bg-gray-100"
          style={{ left: navMenuLeft, top: navMenuTop }}
        >
          <NavMenu isNavOpen={isNavOpen} />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
