import React from 'react';
import Hero from '../Components/Hero';
import Destinations from '../Components/Destinations';
import Packages from '../Components/Packages';
import Search from '../Components/Search';
import Testimonials from '../Components/Testimonials';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsArrowRight, BsShieldCheck } from 'react-icons/bs';
import { MdOutlineBeachAccess, MdOutlineSecurity, MdStar, MdOutlineExplore } from 'react-icons/md';

const whyUs = [
  {
    icon: <MdStar size={28} />,
    title: 'Award-Winning Curation',
    desc: 'Every destination and package is hand-selected by our expert team for exceptional quality.',
    color: 'bg-gold/10 text-gold',
  },
  {
    icon: <MdOutlineSecurity size={28} />,
    title: 'Secure & Flexible Booking',
    desc: 'Book with confidence — free cancellations, travel insurance, and 24/7 support included.',
    color: 'bg-wave/10 text-wave',
  },
  {
    icon: <MdOutlineBeachAccess size={28} />,
    title: 'Exclusive Access',
    desc: 'Enjoy privileges unavailable to the general public — private islands, hidden gems, and VIP experiences.',
    color: 'bg-seafoam/10 text-seafoam',
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5, ease: [0.16,1,0.3,1] } }),
};

export default function Home() {
  return (
    <>
      <Hero />
      <Destinations />
      <Packages />

      {/* Why TravelBee */}
      <section className="section-pad px-4 bg-ocean-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <p className="text-wave font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="font-display text-3xl sm:text-4xl text-ocean-800 font-bold">
              Travel Without Compromise
            </h2>
            <p className="text-ocean-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
              Over 50,000 travelers trust TravelBee for life-changing experiences. Here's why.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-ocean-100 hover:shadow-card-hover transition-all duration-300 card-lift"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-5`}>
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-ocean-800 text-lg sm:text-xl mb-2">{item.title}</h3>
                <p className="text-ocean-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Search />
      <Testimonials />

      {/* CTA Banner */}
      <section className="section-pad px-4 relative overflow-hidden bg-ocean-gradient">
        {/* Decorative orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-seafoam/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-wave/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-seafoam font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3">
              Start Your Journey
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white font-bold mb-4 leading-tight">
              Ready for Your Next<br className="hidden sm:block" /> Adventure?
            </h2>
            <p className="text-white/60 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Browse over 150 curated destinations and find your perfect getaway.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/destinations"
                  className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-white text-ocean-800 font-bold rounded-full shadow-xl hover:shadow-2xl hover:bg-seafoam hover:text-white transition-all duration-300 group btn-glow"
                >
                  <MdOutlineExplore size={18} />
                  Explore Destinations
                  <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/packages"
                  className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  View Packages
                </Link>
              </motion.div>
            </div>
            <p className="text-white/30 text-xs mt-6 flex items-center justify-center gap-1.5">
              <BsShieldCheck /> Secure booking · No hidden fees · 24/7 support
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
