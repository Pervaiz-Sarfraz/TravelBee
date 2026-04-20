import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { MdTravelExplore, MdStar, MdPeople, MdVerified } from 'react-icons/md';

const team = [
  { name: 'Elena Rivera',   role: 'CEO & Founder',          avatar: 'https://i.pravatar.cc/120?img=49' },
  { name: 'James Thornton', role: 'Head of Travel Curation', avatar: 'https://i.pravatar.cc/120?img=12' },
  { name: 'Aiko Yamamoto',  role: 'Customer Experience',     avatar: 'https://i.pravatar.cc/120?img=25' },
  { name: 'Carlos Mendez',  role: 'Partnerships Director',   avatar: 'https://i.pravatar.cc/120?img=68' },
];

const milestones = [
  { year: '2004', event: 'TravelBee founded in Barcelona, Spain' },
  { year: '2008', event: 'Expanded to 50+ global destinations' },
  { year: '2014', event: 'Launched all-inclusive luxury packages' },
  { year: '2018', event: 'Hit 10,000 happy traveler milestone' },
  { year: '2022', event: 'Named #1 Boutique Travel Agency (Global Awards)' },
  { year: '2024', event: 'Serving 50,000+ travelers across 150 destinations' },
];

const values = [
  { icon: <MdTravelExplore size={32} />, title: 'Authentic Exploration', desc: 'We go beyond tourist traps — curating experiences that connect you to the true spirit of each destination.' },
  { icon: <MdStar size={32} />,          title: 'Uncompromising Quality', desc: 'Every hotel, guide, and experience is personally vetted by our team of expert travel curators.' },
  { icon: <MdPeople size={32} />,         title: 'People First',           desc: 'Our 24/7 concierge team is always one call away — before, during, and after your journey.' },
  { icon: <MdVerified size={32} />,       title: 'Sustainable Travel',     desc: "We partner only with eco-conscious operators who share our commitment to protecting the world's wonders." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="bg-ocean-gradient py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, hsl(190,65%,42%) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(175,50%,62%) 0%, transparent 50%)' }}
        />
        <div className="relative max-w-3xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-seafoam font-semibold text-sm uppercase tracking-widest mb-3">
            Our Story
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-white text-5xl lg:text-6xl font-bold mb-5">
            We Live to<br /><span className="italic text-seafoam">Tell Your Story</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            Founded in 2004, TravelBee has spent two decades crafting journeys that transform ordinary holidays into extraordinary memories.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-sand border-b border-ocean-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '150+',  label: 'Destinations' },
            { value: '50k+',  label: 'Happy Travelers' },
            { value: '4.9★',  label: 'Average Rating' },
            { value: '20 yrs',label: 'Of Excellence' },
          ].map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="font-display text-4xl font-bold text-ocean-700">{stat.value}</p>
              <p className="text-ocean-400 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-wave font-semibold text-sm uppercase tracking-widest mb-2">What We Stand For</p>
            <h2 className="font-display text-4xl text-ocean-800 font-bold">Our Core Values</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-7 rounded-2xl border border-ocean-100 hover:border-wave/40 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-ocean-50 flex items-center justify-center text-ocean-600 mb-5">
                  {v.icon}
                </div>
                <h3 className="font-display font-semibold text-ocean-800 text-lg mb-2">{v.title}</h3>
                <p className="text-ocean-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-ocean-50">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-wave font-semibold text-sm uppercase tracking-widest mb-2">Our Journey</p>
            <h2 className="font-display text-4xl text-ocean-800 font-bold">Two Decades of Excellence</h2>
          </motion.div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-ocean-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={m.year}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start pl-12 relative">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-ocean-600 border-4 border-white shadow flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-seafoam" />
                  </div>
                  <div>
                    <span className="text-wave font-bold text-sm">{m.year}</span>
                    <p className="text-ocean-700 font-medium mt-0.5">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-wave font-semibold text-sm uppercase tracking-widest mb-2">Meet the Team</p>
            <h2 className="font-display text-4xl text-ocean-800 font-bold">The People Behind the Magic</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center group">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-ocean-100 group-hover:ring-wave transition-all">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-semibold text-ocean-800">{member.name}</p>
                <p className="text-ocean-400 text-xs mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-ocean-gradient text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-white text-4xl font-bold mb-4">Ready to Travel With Us?</h2>
          <p className="text-white/85 text-base max-w-md mx-auto mb-8">
            Join 50,000+ travelers who've trusted TravelBee with their most important moments.
          </p>
          <Link to="/destinations"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ocean-800 font-bold rounded-full hover:bg-seafoam hover:text-white transition-all duration-300 group shadow-xl">
            Start Exploring <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
