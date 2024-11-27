"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * SearchPage component redirects the user to the home page.
 *
 * @returns {null} This component does not render anything.
 */
const SearchPage = () => {
  /**
   * Router instance for navigation.
   */
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page on component mount
    router.push("/");
  }, [router]);

  return null;
};

export default SearchPage;
