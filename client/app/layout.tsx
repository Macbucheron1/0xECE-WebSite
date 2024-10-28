"use client";

import Header from "./components/AppHeader";
import Footer from "./components/AppFooter";
import "../styles/globals.css";
import { useEffect } from "react";
import { generateGravatarUrl } from "../utils/gravatar";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <body className="flex flex-col min-h-100vh">
        <Header
          userName="NathanDeprat"
          profilePictureUrl={generateGravatarUrl("nathan.deprat@edu.ece.fr")}
        />
        <div className="hacker-background flex-grow">
          <main className="bg-yellow-100 mt-154px searchBar_invert:mt-100px">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
