import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill, BsStarFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import toast from 'react-hot-toast';

export default function DestinationCard({ destination, index = 0 }) {
  const { user, updateWishlist } = useAuth();

  const isWishlisted = user?.wishlist?.some(
    (w) => (w?._id || w) === destination._id
  );

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { toast.error('Please sign in to save destinations'); return; }
    try {
      if (isWishlisted) {
        await api.delete(`/wishlist/${destination._id}`);
        updateWishlist(destination._id, false);
        toast.success('Removed from wishlist');
      } else {
        await api.post(`/wishlist/${destination._id}`);
        updateWishlist(destination._id, true);
        toast.success('Saved to wishlist ♡');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const image = destination.images?.[0]
    || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="card-lift"
    >
      <Link
        to={`/destinations/${destination._id}`}
        className="group block rounded-2xl overflow-hidden bg-white border border-ocean-50 shadow-sm hover:shadow-card-hover transition-shadow duration-400"
      >
        {/* Image */}
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <motion.img
            src={image}
            alt={destination.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-ocean-700 shadow-sm">
              {destination.category}
            </span>
          </div>

          {/* Wishlist */}
          <motion.button
            onClick={toggleWishlist}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow transition-colors hover:bg-white"
          >
            {isWishlisted
              ? <BsHeartFill className="text-red-500 text-sm" />
              : <BsHeart className="text-ocean-600 text-sm" />
            }
          </motion.button>

          {/* Price */}
          <div className="absolute bottom-3 right-3">
            <span className="px-3 py-1 bg-ocean-600 text-white text-xs font-bold rounded-full shadow">
              From ${destination.pricePerNight}/night
            </span>
          </div>

          {/* Explore CTA */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
            <span className="px-5 py-1.5 bg-white text-ocean-800 text-xs font-bold rounded-full shadow-lg">
              Explore →
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-semibold text-ocean-800 text-base sm:text-lg leading-tight">
                {destination.name}
              </h3>
              <p className="flex items-center gap-1 text-ocean-400 text-xs mt-0.5">
                <MdLocationOn className="text-wave shrink-0" />
                {destination.country}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <BsStarFill className="text-gold text-xs" />
              <span className="text-ocean-700 text-sm font-semibold">{destination.rating}</span>
              <span className="text-ocean-400 text-xs">({destination.reviewCount})</span>
            </div>
          </div>

          {/* Tags */}
          {destination.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {destination.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-ocean-50 text-ocean-600 rounded-full text-xs capitalize">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
