import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BsPerson, BsHeart } from 'react-icons/bs';
import { HiOutlineX } from 'react-icons/hi';
import { MdOutlineExplore, MdOutlineDashboard } from 'react-icons/md';
import { RiMenuLine } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Home',         to: '/',             emoji: '🏠' },
  { label: 'Destinations', to: '/destinations',  emoji: '🌍' },
  { label: 'Packages',     to: '/packages',      emoji: '✈️' },
  { label: 'About',        to: '/about',         emoji: '💼' },
];

export default function Navbar({ onAuthOpen }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isHome = location.pathname === '/';
  const dark   = scrolled || !isHome;

  return (
    <>
      {/* ── Main bar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          dark
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-ocean-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-18">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                dark ? 'bg-ocean-600' : 'bg-white/20 backdrop-blur-sm'
              }`}
            >
              <MdOutlineExplore className="text-white text-xl" />
            </motion.div>
            <span className={`font-display font-bold text-xl tracking-tight transition-colors hidden xs:block sm:block ${
              dark ? 'text-ocean-800' : 'text-white'
            }`}>
              Travel<span className={dark ? 'text-wave' : 'text-seafoam'}>Bee</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`overlay-animation text-sm font-medium transition-colors ${
                    dark
                      ? 'text-ocean-700 hover:text-ocean-500'
                      : 'text-white hover:text-white'
                  } ${location.pathname === link.to ? 'font-semibold' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/wishlist"
                  className={`p-2 rounded-full transition-colors ${
                    dark ? 'text-ocean-600 hover:bg-ocean-50' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <BsHeart size={18} />
                </Link>
                <div className="relative group">
                  <button className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${
                    dark
                      ? 'border-ocean-300 text-ocean-700 hover:bg-ocean-50'
                      : 'border-white/40 text-white hover:bg-white/10'
                  }`}>
                    <BsPerson size={16} />
                    {user.name.split(' ')[0]}
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-ocean-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-50">
                    <Link to="/bookings" className="block px-4 py-2.5 text-sm text-ocean-700 hover:bg-ocean-50">My Bookings</Link>
                    <Link to="/wishlist" className="block px-4 py-2.5 text-sm text-ocean-700 hover:bg-ocean-50">Wishlist</Link>
                    <hr className="border-ocean-100" />
                    <button onClick={logout} className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <motion.button
                onClick={onAuthOpen}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 btn-glow ${
                  dark
                    ? 'bg-ocean-600 text-white hover:bg-ocean-500 shadow-sm'
                    : 'bg-white text-ocean-800 hover:bg-white/90'
                }`}
              >
                Sign In
              </motion.button>
            )}
          </div>

          {/* Mobile: right-side icons + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            {user && (
              <Link to="/wishlist" className={`p-2 rounded-full ${dark ? 'text-ocean-600' : 'text-white'}`}>
                <BsHeart size={18} />
              </Link>
            )}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-lg transition-colors ${
                dark ? 'text-ocean-700 hover:bg-ocean-50' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiOutlineX size={24} /> : <RiMenuLine size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white md:hidden flex flex-col"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-ocean-50">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="w-8 h-8 rounded-full bg-ocean-600 flex items-center justify-center">
                  <MdOutlineExplore className="text-white text-lg" />
                </div>
                <span className="font-display font-bold text-xl text-ocean-800">
                  Travel<span className="text-wave">Bee</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full hover:bg-ocean-50 text-ocean-600 transition-colors"
              >
                <HiOutlineX size={22} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, ease: [0.16,1,0.3,1] }}
                  >
                    <Link
                      to={link.to}
                      className={`mobile-nav-link ${
                        location.pathname === link.to ? 'text-wave' : ''
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-2xl">{link.emoji}</span>
                      {link.label}
                      {location.pathname === link.to && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-wave" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Auth section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="mt-8 space-y-3"
              >
                {user ? (
                  <>
                    <Link
                      to="/bookings"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 w-full py-3 px-5 bg-ocean-50 text-ocean-700 rounded-2xl font-semibold text-sm"
                    >
                      <MdOutlineDashboard size={18} />
                      My Bookings
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="w-full py-3 px-5 bg-red-50 text-red-500 rounded-2xl font-semibold text-sm"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setMobileOpen(false); onAuthOpen(); }}
                    className="w-full py-4 bg-ocean-600 text-white rounded-2xl font-bold text-base btn-glow shadow-glow-ocean"
                  >
                    Sign In / Register
                  </button>
                )}
              </motion.div>
            </nav>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-ocean-50">
              <p className="text-ocean-300 text-xs text-center">© 2025 TravelBee · Crafted with ♡</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
