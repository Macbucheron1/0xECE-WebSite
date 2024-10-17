"use client";

import Header from './components/AppHeader';
import Footer from './components/AppFooter';
import '../styles/globals.css';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    //generate the falling characters
    const container = document.querySelector('.hacker-background');
    if (container) {
      for (let i = 0; i < 400; i++) {
        const char = document.createElement('span');
        char.classList.add('character');
        char.textContent = String.fromCharCode(33 + Math.random() * 94); // Random ASCII character
        char.style.left = Math.random() * 100 + 'vw';
        char.style.animationDelay = Math.random() * 5 + 's';
        char.style.setProperty('--i', Math.random().toString());
        container.appendChild(char);
      }
    }
  }, []);

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className='hacker-background flex-grow'>
          <main> {children} </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
