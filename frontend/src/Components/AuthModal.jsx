import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';
import { MdOutlineEmail, MdOutlineLock, MdOutlinePerson } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin]   = useState(true);
  const [loading, setLoading]   = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login, register }     = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success('Welcome back!');
      } else {
        await register(formData.name, formData.email, formData.password);
        toast.success('Account created successfully!');
      }
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ocean-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-ocean-100"
          >
            {/* Header */}
            <div className="py-8 px-8 text-center bg-ocean-100/50 border-b border-ocean-50">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-ocean-100 text-ocean-400 transition-colors"
              >
                <HiOutlineX size={20} />
              </button>
              <h2 className="font-display text-2xl font-bold text-ocean-800 mb-2">
                {isLogin ? 'Welcome Back' : 'Join TravelBee'}
              </h2>
              <p className="text-ocean-400 text-sm">
                {isLogin ? 'Enter your details to continue your journey' : 'Start your luxury travel experience today'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              {!isLogin && (
                <div className="relative">
                  <MdOutlinePerson className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-300 text-xl" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-ocean-50 border border-ocean-100 rounded-xl text-sm text-ocean-800 placeholder-ocean-300 focus:outline-none focus:border-wave transition-colors"
                  />
                </div>
              )}

              <div className="relative">
                <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-300 text-xl" />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-ocean-50 border border-ocean-100 rounded-xl text-sm text-ocean-800 placeholder-ocean-300 focus:outline-none focus:border-wave transition-colors"
                />
              </div>

              <div className="relative">
                <MdOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-300 text-xl" />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-ocean-50 border border-ocean-100 rounded-xl text-sm text-ocean-800 placeholder-ocean-300 focus:outline-none focus:border-wave transition-colors"
                />
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-xs text-wave font-medium hover:underline">
                    Forgot Password?
                  </button>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-ocean-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-ocean-500 transition-all duration-300 disabled:opacity-60 flex items-center justify-center btn-glow"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </motion.button>

              <div className="pt-4 text-center">
                <p className="text-ocean-400 text-sm">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-wave font-bold hover:underline"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
