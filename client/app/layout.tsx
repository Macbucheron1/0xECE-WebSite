"use client";

import Header from "./components/AppHeader";
import Footer from "./components/AppFooter";
import "../styles/globals.css";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <body className="flex flex-col min-h-100vh">
        <Header/>
        <div className="page">
          <main className="mt-154px searchBar_invert:mt-100px">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
