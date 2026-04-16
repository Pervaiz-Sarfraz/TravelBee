import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube,
} from 'react-icons/fa';
import { MdOutlineExplore, MdOutlineEmail, MdOutlineKeyboardArrowUp, MdOutlineArrowDropDown } from 'react-icons/md';
import toast from 'react-hot-toast';

const footerLinks = {
  Explore: [
    { label: 'Destinations', to: '/destinations' },
    { label: 'Packages',     to: '/packages'      },
    { label: 'About Us',     to: '/about'          },
    { label: 'Travel Blog',  to: '#'              },
  ],
  Support: [
    { label: 'FAQ',           to: '#' },
    { label: 'Contact Us',    to: '#' },
    { label: 'Careers',       to: '#' },
    { label: 'Partnerships',  to: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy',  to: '#' },
    { label: 'Terms of Service',to: '#' },
    { label: 'Cookie Policy',   to: '#' },
  ],
};

const socials = [
  { icon: <FaFacebook />,  href: '#', label: 'Facebook'  },
  { icon: <FaTwitter />,   href: '#', label: 'Twitter'   },
  { icon: <FaInstagram />, href: '#', label: 'Instagram' },
  { icon: <FaPinterest />, href: '#', label: 'Pinterest' },
  { icon: <FaYoutube />,   href: '#', label: 'YouTube'   },
];

function AccordionSection({ title, links }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 sm:border-none">
      <button
        className="w-full flex items-center justify-between py-4 sm:py-0 sm:cursor-default text-white font-semibold text-sm sm:mb-4"
        onClick={() => setOpen(!open)}
      >
        {title}
        <MdOutlineArrowDropDown
          className={`text-white/50 text-xl sm:hidden transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {(open ) && (
          <motion.ul
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
            className="overflow-hidden sm:!h-auto sm:!opacity-100 space-y-2.5 pb-4 sm:pb-0"
          >
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-white/45 hover:text-seafoam text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {/* Always visible on sm+ */}
      <ul className="hidden sm:block space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-white/70 hover:text-seafoam text-sm transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email,     setEmail]     = useState('');
  const [showTop,   setShowTop]   = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('🌊 Subscribed! Welcome to the VoyageWave community.');
    setEmail('');
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* ── Back to top ── */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showTop ? 'visible' : ''}`}
        aria-label="Back to top"
      >
        <MdOutlineKeyboardArrowUp size={22} />
      </button>

      <footer className="bg-dark text-white">
        {/* Newsletter bar */}
        <div className="border-b border-white/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
            <div className="shrink-0">
              <p className="text-seafoam font-semibold text-xs uppercase tracking-widest mb-1">Newsletter</p>
              <h3 className="font-display text-xl sm:text-2xl font-bold">Inspiration. Delivered Monthly.</h3>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full sm:max-w-sm gap-2">
              <div className="relative flex-1">
                <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/12 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-seafoam transition-colors"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 sm:px-5 py-3 bg-wave hover:bg-seafoam text-white font-semibold rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-0 sm:gap-10">
            {/* Brand */}
            <div className="col-span-1 sm:col-span-2 mb-8 sm:mb-0">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-ocean-600 flex items-center justify-center">
                  <MdOutlineExplore className="text-white text-lg" />
                </div>
                <span className="font-display font-bold text-xl">
                  Voyage<span className="text-wave">Wave</span>
                </span>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                Crafting unforgettable travel experiences to the world's most extraordinary destinations since 2004.
              </p>
              {/* Socials */}
              <div className="flex gap-3 mt-6">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-wave flex items-center justify-center text-white/55 hover:text-white transition-colors duration-200"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Accordion link columns */}
            <div className="col-span-1 sm:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-8">
              {Object.entries(footerLinks).map(([title, links]) => (
                <AccordionSection key={title} title={title} links={links} />
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/8 mt-10 sm:mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} VoyageWave. All rights reserved.
            </p>
            <p className="text-white/60 text-xs">
              Made with ♡ for passionate travelers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
