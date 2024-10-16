import Header from './components/AppHeader';
import Footer from './components/AppFooter';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow bg-blue-100'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
