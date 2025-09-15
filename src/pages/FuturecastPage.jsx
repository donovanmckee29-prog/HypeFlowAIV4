import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { futurecastAPI } from '../services/api';

export default function FuturecastPage() {
  const [predictions, setPredictions] = useState([]);
  const [trends, setTrends] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFuturecastData();
  }, []);

  const loadFuturecastData = async () => {
    try {
      setLoading(true);
      const [predictionsResponse, trendsResponse] = await Promise.all([
        futurecastAPI.getPredictions(),
        futurecastAPI.getTrends()
      ]);
      
      setPredictions(predictionsResponse.data);
      setTrends(trendsResponse.data);
    } catch (err) {
      setError('Failed to load futurecast data. Please try again.');
      console.error('Futurecast data error:', err);
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

  const formatPercent = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="futurecast-root min-h-screen container mx-auto px-6 py-12">
        <div className="glass-card text-center">
          <div className="skeleton h-8 w-64 mx-auto mb-4"></div>
          <div className="skeleton h-4 w-96 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="futurecast-root min-h-screen container mx-auto px-6 py-12">
        <div className="error-state">
          <h2 className="text-2xl font-bold mb-4">Failed to Load Futurecast Data</h2>
          <p className="mb-4">{error}</p>
          <button onClick={loadFuturecastData} className="btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="futurecast-root min-h-screen container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          🔮 Futurecasting Engine
        </h1>

        {/* Timeframe Selector */}
        <motion.div 
          className="glass-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex gap-2 justify-center">
            {['3M', '6M', '1Y', '2Y'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                  selectedTimeframe === timeframe
                    ? 'btn'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Predictions */}
        <motion.div 
          className="glass-card neon-cyan mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">AI Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions
              .filter(p => p.timeframe === selectedTimeframe)
              .map((prediction, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{prediction.sport}</div>
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                    prediction.confidence >= 80 ? 'bg-green-500/20 text-green-400' :
                    prediction.confidence >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {prediction.confidence}% Confidence
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{prediction.name}</h3>
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  {formatCurrency(prediction.currentPrice)}
                </div>
                <div className="text-sm text-gray-400 mb-4">{prediction.description}</div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Predicted Price:</span>
                    <span className="text-green-400 font-bold">
                      {formatCurrency(prediction.predictedPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expected Return:</span>
                    <span className="text-green-400 font-bold">
                      {formatPercent(prediction.expectedReturn)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timeline:</span>
                    <span className="text-cyan-400">{prediction.timeline}</span>
                  </div>
                </div>
                <button className="btn w-full">Add to Watchlist</button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trends */}
        <motion.div 
          className="glass-card neon-purple"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Market Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trends.map((trend, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{trend.name}</h3>
                  <div className={`text-2xl font-bold ${
                    trend.direction === 'up' ? 'text-green-400' : 
                    trend.direction === 'down' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {trend.direction === 'up' ? '📈' : 
                     trend.direction === 'down' ? '📉' : '➡️'}
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">{trend.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Impact:</span>
                    <span className="text-cyan-400 font-bold">{trend.impact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timeline:</span>
                    <span className="text-purple-400">{trend.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="text-green-400">{trend.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
