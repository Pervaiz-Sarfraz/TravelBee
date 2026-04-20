import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import DestinationCard from './DestinationCard';
import api from '../api/client';

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    api.get('/destinations?featured=true&limit=6')
      .then(({ data }) => setDestinations(data.destinations))
      .catch(() => setDestinations([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-pad px-4 bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-wave font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
              Featured Destinations
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-ocean-800 font-bold">
              Where Will You Go<span className="text-wave">?</span>
            </h2>
            <p className="text-ocean-400 mt-2 max-w-md text-sm sm:text-base">
              Handpicked by our travel experts — the world's most extraordinary places to visit.
            </p>
          </motion.div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-ocean-600 font-semibold text-sm hover:text-ocean-800 transition-colors group shrink-0"
          >
            View all destinations
            <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="h-52 sm:h-56 skeleton" />
                <div className="p-4 bg-white border border-ocean-50 space-y-2 rounded-b-2xl">
                  <div className="h-4 skeleton rounded-full w-3/4" />
                  <div className="h-3 skeleton rounded-full w-1/2" />
                  <div className="h-3 skeleton rounded-full w-1/3 mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-16 text-ocean-400">
            <p className="text-4xl mb-3">🌍</p>
            <p className="font-semibold">No featured destinations yet.</p>
            <p className="text-sm mt-1">Check back soon or explore all destinations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {destinations.map((dest, i) => (
              <DestinationCard key={dest._id} destination={dest} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
