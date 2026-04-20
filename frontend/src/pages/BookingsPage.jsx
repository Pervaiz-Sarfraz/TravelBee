import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsArrowRight, BsStarFill, BsCalendar3, BsXCircle, BsPeopleFill } from 'react-icons/bs';
import { MdLocationOn, MdOutlineConfirmationNumber } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import toast from 'react-hot-toast';

const statusColors = {
  confirmed: 'bg-green-100  text-green-700',
  pending:   'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100    text-red-500',
  completed: 'bg-ocean-100  text-ocean-700',
};

function AuthGate({ message, icon }) {
  return (
    <div className="min-h-screen pt-32 flex items-center justify-center text-center px-4">
      <div>
        <p className="text-6xl mb-4 animate-float inline-block">{icon}</p>
        <h2 className="font-display text-2xl text-ocean-800 font-bold mb-2">Please Sign In</h2>
        <p className="text-ocean-400 mb-6">{message}</p>
        <Link to="/" className="px-6 py-3 bg-ocean-600 text-white rounded-full font-semibold hover:bg-ocean-500 transition-colors">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    api.get('/bookings')
      .then(({ data }) => setBookings(data.bookings))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await api.patch(`/bookings/${id}/cancel`);
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: 'cancelled' } : b));
      toast.success('Booking cancelled. Refund will be processed shortly.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cancel failed');
    }
  };

  if (!user) return <AuthGate icon="🔐" message="You need to be logged in to view your bookings." />;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-ocean-gradient py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            className="font-display text-white text-3xl sm:text-4xl font-bold">
            My Bookings
          </motion.h1>
          <p className="text-white/55 mt-1 text-sm sm:text-base">Manage and review your travel reservations</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 sm:h-36 rounded-2xl skeleton" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 sm:py-24">
            <p className="text-5xl mb-4">🌍</p>
            <h3 className="font-display text-xl sm:text-2xl text-ocean-800 font-bold mb-2">No bookings yet</h3>
            <p className="text-ocean-400 mb-6 text-sm sm:text-base">Your next adventure is just a few clicks away</p>
            <Link to="/destinations" className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-600 text-white rounded-full font-semibold hover:bg-ocean-500 transition-colors group">
              Explore Destinations <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, i) => {
              const dest   = booking.destination;
              const pkg    = booking.package;
              const nights = Math.ceil(
                (new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24)
              );
              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity:0, y:20 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white border border-ocean-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Mobile: stacked; Desktop: side-by-side */}
                  <div className="flex flex-col sm:flex-row">
                    {dest?.images?.[0] && (
                      <div className="sm:w-44 h-40 sm:h-auto shrink-0">
                        <img src={dest.images[0]} alt={dest.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 p-4 sm:p-5">
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div>
                          <h3 className="font-display font-semibold text-ocean-800 text-lg sm:text-xl">
                            {pkg?.title || dest?.name || 'Custom Booking'}
                          </h3>
                          {dest && (
                            <p className="text-ocean-400 text-xs sm:text-sm flex items-center gap-1 mt-0.5">
                              <MdLocationOn className="text-wave shrink-0" />
                              {dest.name}, {dest.country}
                            </p>
                          )}
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColors[booking.status]}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 text-xs text-ocean-500">
                        <span className="flex items-center gap-1.5">
                          <BsCalendar3 className="text-wave" />
                          {new Date(booking.checkIn).toLocaleDateString()} – {new Date(booking.checkOut).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BsStarFill className="text-gold" />
                          {nights} night{nights !== 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BsPeopleFill className="text-ocean-400" />
                          {booking.guests?.adults || 1} guest{booking.guests?.adults > 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MdOutlineConfirmationNumber className="text-ocean-400" />
                          <span className="font-mono font-semibold">{booking.bookingRef}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-ocean-50">
                        <p className="font-bold text-ocean-800 text-lg">
                          ${booking.totalPrice.toLocaleString()}
                          <span className="text-xs text-ocean-400 font-normal ml-1">total</span>
                        </p>
                        {booking.status === 'confirmed' && (
                          <motion.button
                            onClick={() => handleCancel(booking._id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
                          >
                            <BsXCircle /> Cancel
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
