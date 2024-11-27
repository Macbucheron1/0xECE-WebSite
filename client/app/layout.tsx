"use client";

import Header from "./components/AppHeader";
import Footer from "./components/AppFooter";
import "../styles/globals.css";
import { ContextProvider } from "./components/contexts/UserContext";
import { useEffect, useContext } from "react";
import ContextTest from "./components/contexts/UserContext";

/**
 * The root layout component that wraps around all pages.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The nested content to render.
 * @returns {JSX.Element} The root layout with header, content, and footer.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>0xECE</title>
      <link rel="icon" href="/img/logo_0xECE.png" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <ContextProvider>
        <body className="flex flex-col min-h-100vh">
          <Content>{children}</Content>
        </body>
      </ContextProvider>
    </html>
  );
}

/**
 * The content component that includes the main content, header, and footer.
 * Uses user context to set the theme dynamically.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The nested content to render.
 * @returns {JSX.Element} The content component.
 */
function Content({ children }) {
  const { user } = useContext(ContextTest);

  useEffect(() => {
    // Update the document's theme class based on the user's theme preference.
    if (user && user.theme) {
      document.documentElement.classList.remove('theme-Light', 'theme-Dark');
      document.documentElement.classList.add(`theme-${user.theme}`);
    }
  }, [user]);

  return (
    <>
      <Header />
      <div className="page">
        <main className="mt-154px searchBar_invert:mt-100px">{children}</main>
      </div>
      <Footer />
    </>
  );
}
