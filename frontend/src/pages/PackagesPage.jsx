import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsStarFill, BsClock, BsPeopleFill, BsArrowRight } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import api from '../api/client';

const CATEGORIES = ['All','Honeymoon','Adventure','Luxury','Family','Budget','Solo'];

function PackageCardFull({ pkg, index }) {
  const image = pkg.images?.[0] || pkg.destination?.images?.[0]
    || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75';
  const discount = pkg.originalPrice
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl overflow-hidden border border-ocean-50 shadow-sm hover:shadow-card-hover transition-all duration-400 flex flex-col"
    >
      <div className="relative h-52 sm:h-60 overflow-hidden">
        <motion.img
          src={image} alt={pkg.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-ocean-700">
          {pkg.category}
        </span>
        {discount && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-coral text-white rounded-full text-xs font-bold">
            {discount}% OFF
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs">
          <MdLocationOn className="text-seafoam" />
          {pkg.destination?.country || pkg.destinationName}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-ocean-800 text-lg sm:text-xl mb-2">{pkg.title}</h3>
        <p className="text-ocean-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{pkg.description}</p>

        <div className="flex items-center gap-3 sm:gap-4 text-xs text-ocean-400 mb-4 flex-wrap">
          <span className="flex items-center gap-1.5"><BsClock className="text-wave" />{pkg.duration} days</span>
          <span className="flex items-center gap-1.5"><BsPeopleFill className="text-wave" />Max {pkg.maxGuests}</span>
          <span className="flex items-center gap-1.5"><BsStarFill className="text-gold" />{pkg.rating}</span>
        </div>

        {pkg.includes?.length > 0 && (
          <ul className="mb-4 space-y-1 border-t border-ocean-50 pt-3">
            {pkg.includes.slice(0, 4).map((item) => (
              <li key={item} className="text-xs text-ocean-500 flex items-center gap-1.5">
                <span className="text-wave font-bold">✓</span> {item}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-ocean-50 mt-auto">
          <div>
            {pkg.originalPrice && (
              <p className="text-xs text-ocean-300 line-through">${pkg.originalPrice.toLocaleString()}</p>
            )}
            <p className="text-ocean-800 font-bold text-xl">
              ${pkg.price.toLocaleString()}
              <span className="text-ocean-400 text-xs font-normal"> /person</span>
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/bookings"
              className="flex items-center gap-1.5 px-4 py-2 bg-ocean-600 hover:bg-ocean-500 text-white text-sm font-semibold rounded-full transition-colors"
            >
              Book <BsArrowRight />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PackagesPage() {
  const [packages,        setPackages]       = useState([]);
  const [loading,         setLoading]        = useState(true);
  const [activeCategory,  setActiveCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    const params = activeCategory !== 'All' ? `?category=${activeCategory}` : '';
    api.get(`/packages${params}`)
      .then(({ data }) => setPackages(data.packages))
      .catch(() => setPackages([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-ocean-gradient py-14 sm:py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(circle at 30% 60%, hsl(190,65%,42%) 0%, transparent 60%)' }}
        />
        <div className="relative z-10">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            className="text-seafoam font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            All-Inclusive Packages
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
            className="font-display text-white text-3xl sm:text-5xl font-bold mb-3">
            Curated Travel Packages<span className="text-seafoam">.</span>
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
            className="text-white/80 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mt-2">
            Everything handled — flights, hotels, experiences. Simply arrive and explore.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        {/* Category tabs — horizontal scroll on mobile */}
        <div className="flex gap-2 mb-8 sm:mb-10 overflow-x-auto scroll-hide pb-2">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all ${
                activeCategory === cat
                  ? 'bg-ocean-600 text-white shadow-md shadow-ocean-600/20'
                  : 'bg-ocean-50 text-ocean-600 hover:bg-ocean-100'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white border border-ocean-50">
                <div className="h-52 sm:h-60 skeleton" />
                <div className="p-5 space-y-3">
                  <div className="h-4 skeleton rounded-full w-3/4" />
                  <div className="h-3 skeleton rounded-full w-full" />
                  <div className="h-3 skeleton rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-24 text-ocean-400">
            <p className="text-4xl mb-3">🗺️</p>
            <p className="text-lg font-medium">No packages in this category</p>
            <p className="text-sm mt-1">Try selecting a different category above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {packages.map((pkg, i) => (
              <PackageCardFull key={pkg._id} pkg={pkg} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
