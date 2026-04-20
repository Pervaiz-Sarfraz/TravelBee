import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsHeartFill, BsArrowRight } from 'react-icons/bs';
import { useAuth } from '../context/AuthContext';
import DestinationCard from '../Components/DestinationCard';
import api from '../api/client';

export default function WishlistPage() {
  const { user }  = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    api.get('/wishlist')
      .then(({ data }) => setWishlist(data.wishlist))
      .catch(() => setWishlist([]))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center text-center px-4">
        <div>
          <p className="text-6xl mb-4 animate-float inline-block">🔐</p>
          <h2 className="font-display text-2xl text-ocean-800 font-bold mb-2">Please Sign In</h2>
          <p className="text-ocean-400 mb-6">Log in to view and manage your saved destinations.</p>
          <Link to="/" className="px-6 py-3 bg-ocean-600 text-white rounded-full font-semibold hover:bg-ocean-500 transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-ocean-gradient py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <BsHeartFill className="text-red-400 text-3xl" />
          </motion.div>
          <div>
            <motion.h1 initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
              className="font-display text-white text-3xl sm:text-4xl font-bold">
              My Wishlist
            </motion.h1>
            <p className="text-white/55 mt-0.5 text-sm sm:text-base">Your saved dream destinations</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="h-52 sm:h-56 skeleton" />
                <div className="p-4 bg-white border border-ocean-50 rounded-b-2xl space-y-2">
                  <div className="h-4 skeleton rounded-full w-3/4" />
                  <div className="h-3 skeleton rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-20 sm:py-24">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <BsHeartFill className="text-ocean-200 text-6xl mx-auto" />
            </motion.div>
            <h3 className="font-display text-xl sm:text-2xl text-ocean-800 font-bold mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-ocean-400 mb-6 text-sm sm:text-base">
              Browse destinations and tap ♡ to save your favourites.
            </p>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-600 text-white rounded-full font-semibold hover:bg-ocean-500 transition-colors group"
            >
              Explore Destinations <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <>
            <p className="text-ocean-400 text-sm mb-6 sm:mb-8">
              {wishlist.length} saved destination{wishlist.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {wishlist.map((dest, i) => (
                <DestinationCard key={dest._id} destination={dest} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
