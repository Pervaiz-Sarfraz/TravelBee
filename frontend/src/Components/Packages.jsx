import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsArrowRight, BsStarFill, BsClock, BsPeopleFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import api from '../api/client';

function PackageCard({ pkg, index }) {
  const image = pkg.images?.[0]
    || pkg.destination?.images?.[0]
    || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75';
  const discount = pkg.originalPrice
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl overflow-hidden bg-white border border-ocean-50 shadow-sm hover:shadow-card-hover transition-shadow duration-400"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <motion.img
          src={image}
          alt={pkg.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Category */}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-ocean-700">
          {pkg.category}
        </span>

        {/* Discount badge */}
        {discount && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-coral text-white rounded-full text-xs font-bold">
            {discount}% OFF
          </span>
        )}

        {/* Location */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs">
          <MdLocationOn className="text-seafoam shrink-0" />
          {pkg.destination?.country || pkg.destinationName}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        <h3 className="font-display font-semibold text-ocean-800 text-base sm:text-lg leading-snug mb-2">
          {pkg.title}
        </h3>

        <div className="flex items-center gap-3 sm:gap-4 text-xs text-ocean-400 mb-3 flex-wrap">
          <span className="flex items-center gap-1.5">
            <BsClock className="text-wave" />
            {pkg.duration} days
          </span>
          <span className="flex items-center gap-1.5">
            <BsPeopleFill className="text-wave" />
            Up to {pkg.maxGuests}
          </span>
          <span className="flex items-center gap-1.5">
            <BsStarFill className="text-gold" />
            {pkg.rating}
          </span>
        </div>

        {/* Includes */}
        {pkg.includes?.slice(0, 3).length > 0 && (
          <ul className="mb-4 space-y-0.5">
            {pkg.includes.slice(0, 3).map((item) => (
              <li key={item} className="text-xs text-ocean-500 flex items-center gap-1.5">
                <span className="text-wave font-bold">✓</span> {item}
              </li>
            ))}
          </ul>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between border-t border-ocean-50 pt-4">
          <div>
            {pkg.originalPrice && (
              <p className="text-xs text-ocean-300 line-through">${pkg.originalPrice.toLocaleString()}</p>
            )}
            <p className="text-ocean-800 font-bold text-lg sm:text-xl">
              ${pkg.price.toLocaleString()}
              <span className="text-ocean-400 text-xs font-normal"> /person</span>
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              to={`/packages`}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-ocean-600 hover:bg-ocean-500 text-white text-xs sm:text-sm font-semibold rounded-full transition-colors"
            >
              Book Now <BsArrowRight />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    api.get('/packages?featured=true&limit=3')
      .then(({ data }) => setPackages(data.packages))
      .catch(() => setPackages([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-pad px-4 bg-sand py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-wave font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
              Curated Tour Packages
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-ocean-800 font-bold">
              All-Inclusive Experiences
            </h2>
            <p className="text-ocean-400 mt-2 max-w-md text-sm sm:text-base">
              Everything taken care of — flights, stays, experiences. Just pack and go.
            </p>
          </motion.div>
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-ocean-600 font-semibold text-sm hover:text-ocean-800 transition-colors group shrink-0"
          >
            View all packages <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white border border-ocean-50">
                <div className="h-48 sm:h-52 skeleton" />
                <div className="p-5 space-y-2">
                  <div className="h-4 skeleton rounded-full w-3/4" />
                  <div className="h-3 skeleton rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-16 text-ocean-400">
            <p className="text-4xl mb-3">✈️</p>
            <p className="font-semibold">No packages available yet.</p>
            <p className="text-sm mt-1">Our team is curating amazing experiences for you.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg._id} pkg={pkg} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
