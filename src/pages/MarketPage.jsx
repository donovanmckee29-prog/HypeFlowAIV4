import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { marketAPI } from '../services/api';

export default function MarketPage() {
  const [marketData, setMarketData] = useState([]);
  const [liveData, setLiveData] = useState({
    marketCap: 2400000000,
    activeListings: 47832,
    avgROI: 28.5,
    hotStreak: 12
  });
  const [watchlist, setWatchlist] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('change');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load market data
  useEffect(() => {
    loadMarketData();
  }, []);

  const loadMarketData = async () => {
    try {
      setLoading(true);
      const response = await marketAPI.getTopPicks();
      setMarketData(response.data);
    } catch (err) {
      setError('Failed to load market data. Please try again.');
      console.error('Market data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = (cardId) => {
    setWatchlist(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      } else {
        return [...prev, cardId];
      }
    });
  };

  const handleCardClick = (card) => {
    setSelectedCard(selectedCard?.id === card.id ? null : card);
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getROIColor = (roi) => {
    switch (roi?.toLowerCase()) {
      case 'very high': return 'text-green-400';
      case 'high': return 'text-green-300';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredData = selectedFilter === 'all' 
    ? marketData 
    : marketData.filter(item => item.category === selectedFilter);

  const sortedData = [...filteredData].sort((a, b) => {
    switch(sortBy) {
      case 'change':
        return b.change - a.change;
      case 'price':
        return b.price - a.price;
      case 'volume':
        const volumeOrder = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        return volumeOrder[b.volume] - volumeOrder[a.volume];
      default:
        return 0;
    }
  });

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

  if (loading) {
    return (
      <div className="market-root min-h-screen container mx-auto px-6 py-12">
        <div className="glass-card text-center">
          <div className="skeleton h-8 w-64 mx-auto mb-4"></div>
          <div className="skeleton h-4 w-96 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="market-root min-h-screen container mx-auto px-6 py-12">
        <div className="error-state">
          <h2 className="text-2xl font-bold mb-4">Failed to Load Market Data</h2>
          <p className="mb-4">{error}</p>
          <button onClick={loadMarketData} className="btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="market-root min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="glass-card text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title mb-4">📈 Market Brain</h1>
            <p className="subtitle">
              AI-powered market scanning with real-time picks and trend analysis
            </p>
          </motion.div>

          {/* Market Overview */}
          <motion.div 
            className="stats-grid mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="stat-item">
              <div className="stat-value text-orange-400">{formatCurrency(liveData.marketCap)}</div>
              <div className="stat-label">Market Cap</div>
            </div>
            <div className="stat-item">
              <div className="stat-value text-white">{formatNumber(liveData.activeListings)}</div>
              <div className="stat-label">Active Listings</div>
            </div>
            <div className="stat-item">
              <div className="stat-value text-green-400">{liveData.avgROI}%</div>
              <div className="stat-label">Avg ROI</div>
            </div>
            <div className="stat-item">
              <div className="stat-value text-cyan-400">{liveData.hotStreak}</div>
              <div className="stat-label">Hot Streak</div>
            </div>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div 
            className="investment-card mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Smart Scanner</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <input
                type="text"
                placeholder="Search player, set, or year..."
                className="bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400"
              />
              <select className="bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white">
                <option value="">All Sports</option>
                <option value="basketball">Basketball</option>
                <option value="football">Football</option>
                <option value="baseball">Baseball</option>
                <option value="hockey">Hockey</option>
              </select>
              <select className="bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white">
                <option value="">All Graders</option>
                <option value="psa">PSA</option>
                <option value="bgs">BGS</option>
                <option value="sgc">SGC</option>
              </select>
              <select className="bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white">
                <option value="">Price Range</option>
                <option value="0-100">$0 - $100</option>
                <option value="100-500">$100 - $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000+">$1,000+</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button className="btn">Scan Market</button>
              <button className="btn btn-secondary">AI Picks Only</button>
              <button className="btn btn-secondary">Trending Up</button>
            </div>
          </motion.div>

        {/* Filters and Sorting */}
        <div className="glass-card mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedFilter === 'all' ? 'btn' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('basketball')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedFilter === 'basketball' ? 'btn' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Basketball
              </button>
              <button
                onClick={() => setSelectedFilter('football')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedFilter === 'football' ? 'btn' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Football
              </button>
              <button
                onClick={() => setSelectedFilter('baseball')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedFilter === 'baseball' ? 'btn' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Baseball
              </button>
            </div>
            
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
              >
                <option value="change">Sort by Change</option>
                <option value="price">Sort by Price</option>
                <option value="volume">Sort by Volume</option>
              </select>
            </div>
          </div>
        </div>

          {/* Market Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {sortedData.map((card, index) => (
              <motion.div
                key={card.id}
                className={`investment-card interactive-element ${
                  selectedCard?.id === card.id ? 'ring-2 ring-cyan-400' : ''
                }`}
                onClick={() => handleCardClick(card)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-5xl">{card.sport}</div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      card.risk === 'Low' ? 'bg-green-500/30 text-green-400 border border-green-500/50' :
                      card.risk === 'Medium' ? 'bg-yellow-500/30 text-yellow-400 border border-yellow-500/50' :
                      'bg-red-500/30 text-red-400 border border-red-500/50'
                    }`}>
                      {card.risk} Risk
                    </div>
                    <div className="text-3xl font-bold text-orange-400">
                      {card.aiScore}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">{card.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">
                      {formatCurrency(card.price)}
                    </div>
                    <div className="text-sm text-gray-400">Current Price</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${card.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {card.change >= 0 ? '+' : ''}{card.change}%
                    </div>
                    <div className="text-sm text-gray-400">24h Change</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className={`text-sm font-bold px-3 py-1 rounded-lg ${
                    card.roi === 'Very High' ? 'bg-green-500/20 text-green-400' :
                    card.roi === 'High' ? 'bg-green-500/10 text-green-300' :
                    card.roi === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {card.roi} ROI
                  </div>
                  <div className="text-sm text-gray-400">
                    {card.timeframe}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWatchlist(card.id);
                    }}
                    className={`btn flex-1 py-3 px-4 rounded-lg text-sm ${
                      watchlist.includes(card.id) ? 'btn-secondary' : ''
                    }`}
                  >
                    {watchlist.includes(card.id) ? '✓ Watchlist' : '+ Watchlist'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Navigate to Oracle with card context
                      window.location.href = `/oracle?card=${encodeURIComponent(card.name)}`;
                    }}
                    className="btn btn-secondary py-3 px-4 rounded-lg text-sm"
                  >
                    AI Analysis
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        {/* Selected Card Details */}
        {selectedCard && (
          <motion.div 
            className="glass-card neon-cyan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Card Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Price Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Price:</span>
                    <span className="text-white font-bold">{formatCurrency(selectedCard.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price Target:</span>
                    <span className="text-green-400 font-bold">{formatCurrency(selectedCard.priceTarget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Support:</span>
                    <span className="text-blue-400 font-bold">{formatCurrency(selectedCard.support)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Resistance:</span>
                    <span className="text-red-400 font-bold">{formatCurrency(selectedCard.resistance)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Recent Sales</h3>
                <div className="space-y-2">
                  {selectedCard.recentSales?.map((sale, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-400">{sale.grade} - {sale.source}</span>
                      <span className="text-white">{formatCurrency(sale.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">Price Trend Chart</h4>
              <div className="h-32 bg-gray-700 rounded flex items-center justify-center">
                <div className="text-gray-400">Chart visualization would go here</div>
              </div>
            </div>
          </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
