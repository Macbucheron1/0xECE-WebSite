"use client";

import Header from "./components/AppHeader";
import Footer from "./components/AppFooter";
import "../styles/globals.css";
import { ContextProvider } from "./components/contexts/UserContext"; // Adjust the path as necessary

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <body className="flex flex-col min-h-100vh">
        <ContextProvider>
          <Header />
          <div className="page">
            <main className="mt-154px searchBar_invert:mt-100px">
              {children}
            </main>
          </div>
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}
