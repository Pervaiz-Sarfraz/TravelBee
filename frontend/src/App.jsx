import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AuthModal from './Components/AuthModal';
import CustomCursor from './Components/CustomCursor';
import PageTransition from './Components/PageTransition';
import Home from './pages/Home';
import DestinationsPage from './pages/DestinationsPage';
import PackagesPage from './pages/PackagesPage';
import BookingsPage from './pages/BookingsPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';

/* Scroll to top on every route change */
function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function AppLayout() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Navbar onAuthOpen={() => setAuthOpen(true)} />
      <ScrollTop />

      <PageTransition>
        <main>
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/packages"     element={<PackagesPage />} />
            <Route path="/bookings"     element={<BookingsPage />} />
            <Route path="/wishlist"     element={<WishlistPage />} />
            <Route path="/about"        element={<AboutPage />} />

            {/* 404 */}
            <Route path="*" element={
              <div className="min-h-screen flex flex-col items-center justify-center text-center pt-20 px-4">
                <p className="text-8xl mb-4 animate-float inline-block">🌊</p>
                <h1 className="font-display text-4xl text-ocean-800 font-bold mb-3">Lost at Sea?</h1>
                <p className="text-ocean-400 mb-8">This page doesn't exist. Let's get you back on course.</p>
                <a
                  href="/"
                  className="px-6 py-3 bg-ocean-600 text-white rounded-full font-semibold hover:bg-ocean-500 transition-colors shadow-glow-ocean"
                >
                  Back to Home
                </a>
              </div>
            } />
          </Routes>
        </main>
      </PageTransition>

      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'hsl(215, 40%, 10%)',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '14px',
            padding: '12px 16px',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: { iconTheme: { primary: 'hsl(175, 50%, 62%)', secondary: '#fff' } },
          error:   { iconTheme: { primary: 'hsl(15, 80%, 60%)',  secondary: '#fff' } },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
