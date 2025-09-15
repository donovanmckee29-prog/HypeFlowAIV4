import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    level: 47,
    xp: 7300,
    maxXp: 10000,
    rank: "Oracle Master",
    portfolioValue: 0,
    roi: 0,
    totalCards: 0,
    gradedCards: 0
  });

  const [liveData, setLiveData] = useState({
    marketCap: 2400000000,
    activeListings: 47832,
    avgROI: 28.5,
    hotStreak: 12
  });

  const features = [
    {
      id: 'grader',
      name: 'Quantum AI Grader',
      description: 'Upload card images for instant grade predictions with subgrade analysis',
      icon: '🔬',
      color: 'neon-cyan',
      path: '/grader',
      status: 'active',
      stats: '23 cards graded'
    },
    {
      id: 'oracle',
      name: 'AI Oracle',
      description: 'Ask anything about cards, trends, or history with contextual AI',
      icon: '🌌',
      color: 'neon-purple',
      path: '/oracle',
      status: 'active',
      stats: '47 questions answered'
    },
    {
      id: 'portfolio',
      name: 'Portfolio Center',
      description: 'Track your holdings with live ROI and AI recommendations',
      icon: '💼',
      color: 'neon-green',
      path: '/portfolio',
      status: 'active',
      stats: '$47,250 portfolio'
    },
    {
      id: 'market',
      name: 'Market Scanner',
      description: 'Top 10 investments with AI commentary and real-time data',
      icon: '📈',
      color: 'neon-orange',
      path: '/market',
      status: 'active',
      stats: '10 hot picks'
    },
    {
      id: 'compass',
      name: 'Investment Compass',
      description: 'Weekly top picks with actionable investment strategies',
      icon: '🧭',
      color: 'neon-pink',
      path: '/compass',
      status: 'active',
      stats: '5 strategies'
    },
    {
      id: 'arena',
      name: 'Collector Arena',
      description: 'Gamified trading and competitive card collecting',
      icon: '⚔️',
      color: 'neon-purple',
      path: '/arena',
      status: 'active',
      stats: 'Rank #4'
    },
    {
      id: 'futurecast',
      name: 'Futurecasting Engine',
      description: 'Predicts rookies, emerging collectibles, and trends',
      icon: '🔮',
      color: 'neon-cyan',
      path: '/futurecasting',
      status: 'active',
      stats: '12 predictions'
    }
  ];

  // Load user stats from localStorage or API
  useEffect(() => {
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  }, []);

  const navigateToFeature = (path) => {
    console.log('Navigating to:', path);
    navigate(path);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <motion.div 
          className="glass-card text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold text-cyan-400 mb-6">
            THE FUTURE OF CARD INVESTING
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Harness the power of AI to dominate the sports card market with precision, intelligence, and foresight.
          </p>
        </motion.div>

        {/* Live Market Data */}
        <motion.div 
          className="glass-card neon-cyan mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Live Market Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {formatCurrency(liveData.marketCap)}
              </div>
              <div className="text-sm text-gray-400">Market Cap</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {formatNumber(liveData.activeListings)}
              </div>
              <div className="text-sm text-gray-400">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">
                {liveData.avgROI}%
              </div>
              <div className="text-sm text-gray-400">Avg ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-1">
                {liveData.hotStreak}
              </div>
              <div className="text-sm text-gray-400">Hot Streak</div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className={`glass-card feature-card p-6 rounded-xl ${feature.color} cursor-pointer hover:scale-105 transition-all duration-300`}
              onClick={() => navigateToFeature(feature.path)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-6xl">{feature.icon}</div>
                <div className="px-2 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                  ACTIVE
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.name}
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                {feature.description}
              </p>
              <div className="text-xs text-cyan-400 mb-4 font-bold">
                {feature.stats}
              </div>
              <button
                className="btn w-full py-3 px-4 rounded-lg text-sm font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToFeature(feature.path);
                }}
                aria-label={`Launch ${feature.name}`}
              >
                Launch Feature
              </button>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div 
            className="glass-card p-6 rounded-lg text-center neon-cyan hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigateToFeature('/grader')}
          >
            <div className="text-5xl mb-4">🔬</div>
            <h4 className="text-lg font-bold text-white mb-2">Grade Your Cards</h4>
            <p className="text-sm text-gray-400 mb-4">AI-powered grading analysis</p>
            <button 
              className="btn px-6 py-2 rounded-lg text-sm"
              onClick={(e) => {
                e.stopPropagation();
                navigateToFeature('/grader');
              }}
            >
              Start Grading
            </button>
          </div>
          
          <div 
            className="glass-card p-6 rounded-lg text-center neon-orange hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigateToFeature('/market')}
          >
            <div className="text-5xl mb-4">📊</div>
            <h4 className="text-lg font-bold text-white mb-2">Market Update</h4>
            <p className="text-sm text-gray-400 mb-4">Latest trends and analysis</p>
            <button 
              className="btn px-6 py-2 rounded-lg text-sm"
              onClick={(e) => {
                e.stopPropagation();
                navigateToFeature('/market');
              }}
            >
              View Report
            </button>
          </div>
          
          <div 
            className="glass-card p-6 rounded-lg text-center neon-green hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigateToFeature('/oracle')}
          >
            <div className="text-5xl mb-4">🎯</div>
            <h4 className="text-lg font-bold text-white mb-2">AI Recommendations</h4>
            <p className="text-sm text-gray-400 mb-4">3 new opportunities found</p>
            <button 
              className="btn px-6 py-2 rounded-lg text-sm"
              onClick={(e) => {
                e.stopPropagation();
                navigateToFeature('/oracle');
              }}
            >
              View Picks
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
