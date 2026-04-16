import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineFlightTakeoff, MdOutlineBeachAccess } from 'react-icons/md';
import { BsStarFill, BsArrowDown } from 'react-icons/bs';
import beachVid from '../assets/beachVid.mp4';

const stats = [
  { icon: <MdOutlineFlightTakeoff />, value: '150+',  label: 'Destinations' },
  { icon: <BsStarFill />,             value: '4.9★',  label: 'Avg. Rating'  },
  { icon: <MdOutlineBeachAccess />,   value: '50k+',  label: 'Happy Travelers' },
];

const POPULAR = ['Bali', 'Maldives', 'Santorini', 'Bora Bora', 'Kyoto'];

export default function Hero() {
  const [query,    setQuery]    = useState('');
  const [focused,  setFocused]  = useState(false);
  const navigate   = useNavigate();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY   = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/destinations?search=${encodeURIComponent(query)}`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] min-h-[580px] overflow-hidden"
    >
      {/* Parallax video */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 scale-110"
      >
        <video
          src={beachVid}
          className="w-full h-full object-cover"
          autoPlay loop muted playsInline
        />
      </motion.div>

      {/* Layered gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/50 via-ocean-900/25 to-ocean-900/80 z-[1]" />
      {/* Radial centre glow */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(100,210,200,0.08) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center pt-16 px-4 sm:px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium"
        >
          <BsStarFill className="text-gold text-xs" />
          Award-Winning Travel Experiences
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-white font-bold leading-[1.1] max-w-3xl text-responsive-3xl"
        >
          Discover the World's{' '}
          <span className="italic text-gradient">Hidden</span> Wonders
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-white/90 text-base sm:text-lg max-w-xl leading-relaxed px-4"
        >
          Curated luxury travel experiences to the world's most breathtaking destinations.
        </motion.p>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className={`mt-6 flex items-center w-full max-w-xl rounded-full overflow-hidden transition-all duration-300 shadow-xl ${
            focused ? 'ring-2 ring-seafoam/50' : ''
          }`}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Where do you want to go?"
            className="flex-1 px-5 py-3.5 sm:py-4 text-sm bg-white text-ocean-800 placeholder-ocean-400 outline-none font-sans min-w-0"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 sm:px-6 py-3.5 sm:py-4 bg-ocean-600 hover:bg-ocean-500 text-white flex items-center gap-2 font-semibold text-sm transition-colors shrink-0"
          >
            <AiOutlineSearch size={18} />
            <span className="hidden sm:inline">Search</span>
          </motion.button>
        </motion.form>

        {/* Popular tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mt-4 flex flex-wrap justify-center gap-2"
        >
          {POPULAR.map((place) => (
            <motion.button
              key={place}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/destinations?search=${place}`)}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 text-xs transition-colors backdrop-blur-sm"
            >
              {place}
            </motion.button>
          ))}
        </motion.div>


      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85 }}
        className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5 sm:pb-6"
      >
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl px-4 sm:px-8 py-3 sm:py-4 flex justify-around items-center overflow-x-auto scroll-hide gap-4">
            {stats.map((stat, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-2.5 text-white shrink-0">
                  <div className="text-seafoam text-xl">{stat.icon}</div>
                  <div>
                    <p className="font-bold text-base sm:text-lg leading-none">{stat.value}</p>
                    <p className="text-white/70 text-[10px] sm:text-xs">{stat.label}</p>
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-8 bg-white/15 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
