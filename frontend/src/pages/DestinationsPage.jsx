import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdTune, MdClose } from 'react-icons/md';
import DestinationCard from '../Components/DestinationCard';
import api from '../api/client';

const CATEGORIES = ['All','Beach','Island','Mountain','City','Adventure','Cultural'];
const CONTINENTS = ['All','Asia','Europe','Americas','Caribbean','Oceania','Africa'];

export default function DestinationsPage() {
  const [searchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [total,        setTotal]        = useState(0);
  const [pages,        setPages]        = useState(1);
  const [currentPage,  setCurrentPage]  = useState(1);
  const [showFilters,  setShowFilters]  = useState(false);

  const [filters, setFilters] = useState({
    search:    searchParams.get('search') || '',
    category:  '',
    continent: '',
  });

  const fetchDestinations = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: currentPage, limit: 9 });
      if (filters.search)                            params.set('search',   filters.search);
      if (filters.category && filters.category !== 'All')   params.set('category', filters.category);
      if (filters.continent && filters.continent !== 'All') params.set('continent',filters.continent);
      const { data } = await api.get(`/destinations?${params.toString()}`);
      setDestinations(data.destinations);
      setTotal(data.total);
      setPages(data.pages);
    } catch {
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => { fetchDestinations(); }, [fetchDestinations]);

  const handleSearch = (e) => { e.preventDefault(); setCurrentPage(1); fetchDestinations(); };

  const setFilter = (key, val) => {
    setFilters((f) => ({ ...f, [key]: val }));
    setCurrentPage(1);
  };

  const activeFilterCount = [
    filters.category  && filters.category  !== 'All',
    filters.continent && filters.continent !== 'All',
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Header */}
      <div className="bg-ocean-gradient py-14 sm:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(circle at 70% 50%, hsl(175,50%,62%) 0%, transparent 60%)' }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            className="text-seafoam font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            Explore the World
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
            className="font-display text-white text-4xl sm:text-5xl font-bold mb-3">
            All Destinations<span className="text-seafoam">.</span>
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
            className="text-white/80 text-base sm:text-lg mb-8">
            {total} extraordinary places to discover
          </motion.p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex max-w-xl mx-auto rounded-full overflow-hidden shadow-xl">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              placeholder="Search destinations..."
              className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 text-sm bg-white text-ocean-800 placeholder-ocean-400 outline-none min-w-0"
            />
            <button type="submit" className="px-5 sm:px-6 py-3.5 sm:py-4 bg-wave hover:bg-seafoam text-white transition-colors shrink-0">
              <AiOutlineSearch size={20} />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        {/* Filter bar */}
        <div className="mb-6 sm:mb-8">
          {/* Category pills — horizontal scroll on mobile */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium shrink-0 transition-colors ${
                showFilters || activeFilterCount > 0
                  ? 'border-ocean-600 bg-ocean-600 text-white'
                  : 'border-ocean-200 text-ocean-600 hover:bg-ocean-50'
              }`}
            >
              <MdTune />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-white text-ocean-600 rounded-full w-4 h-4 text-xs flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex gap-2 overflow-x-auto scroll-hide pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter('category', cat === 'All' ? '' : cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                    (cat === 'All' && !filters.category) || filters.category === cat
                      ? 'bg-ocean-600 text-white'
                      : 'bg-ocean-50 text-ocean-600 hover:bg-ocean-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Expanded continent filter */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 flex-wrap py-3 border-t border-ocean-50">
                  <span className="text-sm text-ocean-400 font-semibold shrink-0">Continent:</span>
                  {CONTINENTS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setFilter('continent', c === 'All' ? '' : c)}
                      className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                        (c === 'All' && !filters.continent) || filters.continent === c
                          ? 'bg-wave text-white'
                          : 'bg-ocean-50 text-ocean-600 hover:bg-ocean-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => { setFilter('category',''); setFilter('continent',''); }}
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium"
                    >
                      <MdClose size={14} /> Clear all
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="h-52 sm:h-56 skeleton" />
                <div className="p-4 bg-white border border-ocean-50 rounded-b-2xl space-y-2">
                  <div className="h-4 skeleton rounded-full w-3/4" />
                  <div className="h-3 skeleton rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-24 text-ocean-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-lg font-medium">No destinations found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {destinations.map((dest, i) => (
              <DestinationCard key={dest._id} destination={dest} index={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-10 sm:mt-12 flex-wrap">
            {[...Array(pages)].map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition-all ${
                  currentPage === i + 1
                    ? 'bg-ocean-600 text-white'
                    : 'bg-ocean-50 text-ocean-600 hover:bg-ocean-100'
                }`}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
