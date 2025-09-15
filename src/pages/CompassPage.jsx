import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { compassAPI } from '../services/api';

export default function CompassPage() {
  const [weeklyPicks, setWeeklyPicks] = useState([]);
  const [playbooks, setPlaybooks] = useState([]);
  const [selectedPlaybook, setSelectedPlaybook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCompassData();
  }, []);

  const loadCompassData = async () => {
    try {
      setLoading(true);
      const [weeklyResponse, playbooksResponse] = await Promise.all([
        compassAPI.getWeekly(),
        compassAPI.getPlaybooks()
      ]);
      
      setWeeklyPicks(weeklyResponse.data);
      setPlaybooks(playbooksResponse.data);
    } catch (err) {
      setError('Failed to load compass data. Please try again.');
      console.error('Compass data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="compass-root min-h-screen container mx-auto px-6 py-12">
        <div className="glass-card text-center">
          <div className="skeleton h-8 w-64 mx-auto mb-4"></div>
          <div className="skeleton h-4 w-96 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="compass-root min-h-screen container mx-auto px-6 py-12">
        <div className="error-state">
          <h2 className="text-2xl font-bold mb-4">Failed to Load Compass Data</h2>
          <p className="mb-4">{error}</p>
          <button onClick={loadCompassData} className="btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="compass-root min-h-screen container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          🧭 Investment Compass
        </h1>

        {/* Weekly Top Picks */}
        <motion.div 
          className="glass-card neon-pink mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-pink-400 mb-6">Weekly Top Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyPicks.map((pick, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{pick.sport}</div>
                  <div className="text-2xl font-bold text-pink-400">#{index + 1}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{pick.name}</h3>
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  {formatCurrency(pick.price)}
                </div>
                <div className="text-sm text-gray-400 mb-4">{pick.description}</div>
                <div className="flex gap-2">
                  <button className="btn flex-1">Buy Now</button>
                  <button className="btn btn-secondary">Analyze</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Investment Playbooks */}
        <motion.div 
          className="glass-card neon-cyan"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Investment Playbooks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playbooks.map((playbook, index) => (
              <div 
                key={index} 
                className="glass-card p-6 cursor-pointer hover:scale-105 transition-all"
                onClick={() => setSelectedPlaybook(playbook)}
              >
                <div className="text-4xl mb-4">{playbook.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{playbook.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{playbook.description}</p>
                <div className="text-sm text-cyan-400">
                  Risk: {playbook.risk} • ROI: {playbook.expectedROI}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
