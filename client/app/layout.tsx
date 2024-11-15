"use client";

import Header from "./components/AppHeader";
import Footer from "./components/AppFooter";
import "../styles/globals.css";
import { ContextProvider } from "./components/contexts/UserContext";
import { useEffect, useContext } from "react";
import ContextTest from "./components/contexts/UserContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
//useContext need to be called within a component that's wrapped by the ContextProvider
function Content({ children }) {
  const { user } = useContext(ContextTest);

  useEffect(() => {
    console.log(user);
    if (user && user.theme) {
      document.documentElement.classList.remove('theme-Light', 'theme-Dark');
      document.documentElement.classList.add(`theme-${user.theme}`);
      console.log(`theme-${user.theme}`);
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
