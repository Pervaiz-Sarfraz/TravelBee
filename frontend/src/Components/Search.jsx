import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar3, BsPeopleFill, BsShieldCheck, BsAward } from 'react-icons/bs';
import { MdOutlineFlightTakeoff, MdOutlineBeachAccess, MdRestaurant } from 'react-icons/md';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const DESTINATIONS = [
  'Bora Bora','Maldives','Santorini','Amalfi Coast',
  'Bali','Machu Picchu','Kyoto','Antigua','Patagonia','Key West',
];

const features = [
  { icon: <BsAward />,              title: 'Award-Winning Service', desc: 'Top-rated for 20 years running'    },
  { icon: <MdOutlineFlightTakeoff />,title: 'All-Inclusive Flights', desc: 'Seamless door-to-door service'    },
  { icon: <MdRestaurant />,          title: 'Gourmet Dining',        desc: 'World-class cuisine included'      },
  { icon: <MdOutlineBeachAccess />,  title: 'Private Beach Access',  desc: 'Exclusive resort experiences'      },
];

export default function Search() {
  const [destination, setDestination] = useState('');
  const [checkIn,     setCheckIn]     = useState(null);
  const [checkOut,    setCheckOut]    = useState(null);
  const [adults,      setAdults]      = useState(2);
  const [loading,     setLoading]     = useState(false);
  const { user }  = useAuth();
  const navigate  = useNavigate();

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user)                          { toast.error('Please sign in to book'); return; }
    if (!destination || !checkIn || !checkOut) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      const { data } = await api.post('/bookings', {
        checkIn, checkOut,
        guests: { adults, children: 0 },
        specialRequests: `Destination: ${destination}`,
        totalPrice: 0,
      });
      toast.success(`🎉 Booking confirmed! Ref: ${data.booking?.bookingRef}`);
      navigate('/bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-pad px-4 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-wave font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3">
            Plan Your Journey
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-ocean-800 font-bold leading-snug mb-4">
            Luxury Getaways for<br />
            <span className="italic text-wave">Two People</span>
          </h2>
          <p className="text-ocean-500 leading-relaxed mb-8 max-w-lg text-sm sm:text-base">
            Experience the pinnacle of luxury travel. Our all‑inclusive packages feature premium
            accommodations, gourmet dining, and once‑in‑a‑lifetime experiences.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-ocean-50 flex items-center justify-center text-ocean-600 text-lg shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="font-semibold text-ocean-800 text-sm">{f.title}</p>
                  <p className="text-ocean-400 text-xs">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Booking widget */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="bg-ocean-gradient rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl shadow-ocean-600/20">
            {/* Offer banner */}
            <div className="flex items-center justify-between mb-6 bg-white/10 rounded-xl px-4 py-3">
              <div>
                <p className="text-white/80 text-xs">Limited time offer</p>
                <p className="text-white font-bold text-sm sm:text-base">Get an additional 10% off →</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-white/80 text-xs">Offer ends in</p>
                <p className="text-coral font-bold text-sm">12 Hours</p>
              </div>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              {/* Destination */}
              <div>
                <label className="text-white/90 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                  Destination
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-seafoam transition-colors"
                  required
                >
                  <option value="" disabled className="text-ocean-800">Select a destination</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d} value={d} className="text-ocean-800">{d}</option>
                  ))}
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: 'Check-In', value: checkIn, min: new Date(),
                    onChange: (d) => { setCheckIn(d); if (checkOut && d >= checkOut) setCheckOut(null); },
                  },
                  {
                    label: 'Check-Out', value: checkOut, min: checkIn || new Date(),
                    onChange: (d) => setCheckOut(d),
                  },
                ].map(({ label, value, min, onChange }) => (
                  <div key={label}>
                    <label className="text-white/90 text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <BsCalendar3 /> {label}
                    </label>
                    <DatePicker
                      selected={value}
                      onChange={onChange}
                      minDate={min}
                      placeholderText="mm/dd/yyyy"
                      className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder-white/40 focus:outline-none focus:border-seafoam"
                    />
                  </div>
                ))}
              </div>

              {/* Guests */}
              <div>
                <label className="text-white/90 text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <BsPeopleFill /> Guests
                </label>
                <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-7 h-7 rounded-full bg-white/20 text-white font-bold hover:bg-white/30 transition-colors"
                  >−</motion.button>
                  <span className="text-white font-medium flex-1 text-center text-sm">
                    {adults} Adult{adults > 1 ? 's' : ''}
                  </span>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setAdults(Math.min(10, adults + 1))}
                    className="w-7 h-7 rounded-full bg-white/20 text-white font-bold hover:bg-white/30 transition-colors"
                  >+</motion.button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-white text-ocean-800 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-seafoam hover:text-white transition-all duration-300 disabled:opacity-60 btn-glow text-sm sm:text-base"
              >
                <MdOutlineFlightTakeoff size={18} />
                {loading ? 'Processing...' : 'Check Rates & Book'}
              </motion.button>

              <p className="text-white/60 text-xs text-center flex items-center justify-center gap-1.5">
                <BsShieldCheck /> Secure booking · Free cancellation up to 48h
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
