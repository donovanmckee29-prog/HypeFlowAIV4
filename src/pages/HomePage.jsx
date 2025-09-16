import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, LineChart, Briefcase, Search, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1c] to-[#121826] text-white flex flex-col">
      
      {/* 🔹 Navbar */}
      <header className="w-full flex justify-between items-center px-10 py-6 border-b border-white/10">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          ∞ Infinity Pro
        </h1>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link to="/market" className="hover:text-cyan-400 transition">Market Brain</Link>
          <Link to="/grader" className="hover:text-cyan-400 transition">AI Grader</Link>
          <Link to="/oracle" className="hover:text-cyan-400 transition">Oracle</Link>
          <Link to="/portfolio" className="hover:text-cyan-400 transition">Portfolio</Link>
        </nav>
      </header>

      {/* 🔥 Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-20 px-6 max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          The Singularity of Sports Card Intelligence
        </h1>
        <p className="mt-6 text-lg text-gray-300">
          Your all-in-one AI command center for grading, investing, and market prediction.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/grader">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-lg px-6 py-3 rounded-xl transition-colors">
              Get Started
            </button>
          </Link>
          <Link to="/market">
            <button className="bg-gray-800 hover:bg-gray-700 text-lg px-6 py-3 rounded-xl transition-colors">
              Learn More
            </button>
          </Link>
        </div>
      </motion.div>

      {/* 🚀 Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-20 max-w-6xl mx-auto">
        {[
          { title: "AI Grader", desc: "Nanoscopic precision beyond human eyes.", icon: <Brain size={32}/> , link: "/grader" },
          { title: "Market Brain", desc: "Next-gen market scanning & insights.", icon: <LineChart size={32}/> , link: "/market" },
          { title: "Player DNA", desc: "Career arc modeling & predictions.", icon: <Briefcase size={32}/> , link: "/dna" },
          { title: "AI Oracle", desc: "Weekly investment foresight.", icon: <Sparkles size={32}/> , link: "/oracle" },
          { title: "Portfolio Singularity", desc: "Manage and optimize your collection.", icon: <Search size={32}/> , link: "/portfolio" },
        ].map((f, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-b from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/20 transition"
          >
            <Link to={f.link}>
              <div className="flex items-center gap-3 mb-4">
                {f.icon}
                <h3 className="text-xl font-bold">{f.title}</h3>
              </div>
              <p className="text-gray-400">{f.desc}</p>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* 🔻 Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-400 text-sm">
        © 2025 Infinity Pro • All Rights Reserved
      </footer>
    </div>
  );
}
