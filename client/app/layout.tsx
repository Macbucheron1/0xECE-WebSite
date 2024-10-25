"use client";

import Header from "./components/AppHeader";
import Footer from "./components/AppFooter";
import "../styles/globals.css";
import { useEffect } from "react";
import { generateGravatarUrl } from "../utils/gravatar";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header
          userName="Mac"
          profilePictureUrl={generateGravatarUrl("nathan.deprat@edu.ece.fr")}
        />
        <div className="hacker-background flex-grow">
            <main className="bg-yellow-100 mt-16vh md:mt-11vh lg:mt-10vh"> 
            {children} 
            </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
