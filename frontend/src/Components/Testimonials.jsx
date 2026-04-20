import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BsStarFill, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FaQuoteLeft } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const reviews = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'New York, USA',
    destination: 'Bora Bora',
    rating: 5,
    comment:
      'Absolutely magical. The overwater bungalow was unreal — waking up to that turquoise lagoon every morning felt like a dream. TravelBee handled every detail flawlessly from start to finish.',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    id: 2,
    name: 'James Thornton',
    location: 'London, UK',
    destination: 'Kyoto, Japan',
    rating: 5,
    comment:
      "Kyoto in cherry blossom season was breathtaking. The ryokan experience arranged by TravelBee was unlike anything we'd experienced. Truly one of life's highlights.",
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    id: 3,
    name: 'Camille Beaumont',
    location: 'Paris, France',
    destination: 'Maldives',
    rating: 5,
    comment:
      "We celebrated our anniversary in the Maldives and it was perfect in every way. The private island, the bioluminescent beach at night... TravelBee made the impossible possible.",
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
  {
    id: 4,
    name: 'Marco Ferretti',
    location: 'Milan, Italy',
    destination: 'Patagonia',
    rating: 5,
    comment:
      "I'd been dreaming of Patagonia for years and TravelBee delivered beyond expectations. The guided trek through Torres del Paine was the most spectacular thing I have ever witnessed.",
    avatar: 'https://i.pravatar.cc/80?img=68',
  },
];

const DRAG_THRESHOLD = 50;

export default function Testimonials() {
  const [current,   setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => { setDirection(-1); setCurrent((c) => (c - 1 + reviews.length) % reviews.length); };
  const next = () => { setDirection(1);  setCurrent((c) => (c + 1) % reviews.length); };

  const review = reviews[current];

  const slideVariants = {
    enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 60  : -60,  scale: 0.97 }),
    center: {         opacity: 1, x: 0,             scale: 1    },
    exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60,   scale: 0.97 }),
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -DRAG_THRESHOLD) next();
    if (info.offset.x >  DRAG_THRESHOLD) prev();
  };

  return (
    <section className="section-pad px-4 bg-ocean-900 overflow-hidden relative py-16 sm:py-24">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-wave/10 blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-seafoam/8 blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <p className="text-seafoam font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            Traveler Stories
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">
            Moments That Last a Lifetime
          </h2>
        </motion.div>

        {/* Review card — swipeable */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 select-none touch-pan-y"
            style={{ cursor: 'grab' }}
            whileDrag={{ cursor: 'grabbing', scale: 0.99 }}
          >
            {/* Quote icon */}
            <FaQuoteLeft className="text-seafoam/40 mb-4 w-10 h-10 sm:w-12 sm:h-12" />

            <p className="text-white text-base sm:text-xl leading-relaxed mb-8 sm:mb-10 italic">
              "{review.comment}"
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-seafoam/40"
                />
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">{review.name}</p>
                  <p className="text-white/80 text-xs">{review.location}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex gap-0.5 justify-end mb-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <BsStarFill key={i} className="text-gold text-xs" />
                  ))}
                </div>
                <p className="text-white/80 text-xs flex items-center gap-1 justify-end">
                  <MdLocationOn className="text-seafoam" />
                  {review.destination}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6 sm:mt-8">
          {/* Dots */}
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-seafoam' : 'w-2 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"
            >
              <BsChevronLeft />
            </motion.button>
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"
            >
              <BsChevronRight />
            </motion.button>
          </div>
        </div>

        {/* Swipe hint on touch */}
        <p className="text-center text-white/25 text-xs mt-4 sm:hidden">
          ← Swipe to navigate →
        </p>
      </div>
    </section>
  );
}
