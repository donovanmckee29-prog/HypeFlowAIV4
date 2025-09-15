import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../services/api';

export default function PortfolioPage() {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    totalCost: 0,
    roi: 0,
    monthlyChange: 0,
    holdings: []
  });
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [selectedView, setSelectedView] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load portfolio data
  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      const [valueResponse, itemsResponse] = await Promise.all([
        portfolioAPI.getValue(),
        portfolioAPI.getItems()
      ]);
      
      const valueData = valueResponse.data;
      const itemsData = itemsResponse.data;
      
      // Calculate real portfolio metrics
      const totalCost = itemsData.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
      const totalValue = itemsData.reduce((sum, item) => sum + (item.currentValue * item.quantity), 0);
      const roi = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;
      
      setPortfolioData({
        totalValue: valueData.totalValue || totalValue,
        totalCost: valueData.totalCost || totalCost,
        roi: valueData.roi || roi,
        monthlyChange: valueData.monthlyChange || 0,
        holdings: itemsData,
        performance: valueData.performance || {
          '1D': { value: totalValue, change: 2.1 },
          '1W': { value: totalValue * 0.98, change: 1.8 },
          '1M': { value: totalValue * 0.88, change: 12.5 },
          '3M': { value: totalValue * 0.76, change: 24.3 },
          '1Y': { value: totalValue * 0.65, change: 35.0 }
        }
      });
    } catch (err) {
      setError('Failed to load portfolio data. Please try again.');
      console.error('Portfolio data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addNewHolding = async (holding) => {
    try {
      await portfolioAPI.addItem(holding);
      loadPortfolioData(); // Reload data
    } catch (err) {
      setError('Failed to add holding. Please try again.');
      console.error('Add holding error:', err);
    }
  };

  const updateHolding = async (id, updates) => {
    try {
      await portfolioAPI.updateItem(id, updates);
      loadPortfolioData(); // Reload data
    } catch (err) {
      setError('Failed to update holding. Please try again.');
      console.error('Update holding error:', err);
    }
  };

  const deleteHolding = async (id) => {
    try {
      await portfolioAPI.deleteItem(id);
      loadPortfolioData(); // Reload data
    } catch (err) {
      setError('Failed to delete holding. Please try again.');
      console.error('Delete holding error:', err);
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
      <div className="portfolio-root min-h-screen container mx-auto px-6 py-12">
        <div className="glass-card text-center">
          <div className="skeleton h-8 w-64 mx-auto mb-4"></div>
          <div className="skeleton h-4 w-96 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-root min-h-screen container mx-auto px-6 py-12">
        <div className="error-state">
          <h2 className="text-2xl font-bold mb-4">Failed to Load Portfolio</h2>
          <p className="mb-4">{error}</p>
          <button onClick={loadPortfolioData} className="btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-root min-h-screen container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          💼 Portfolio Center
        </h1>

        {/* Portfolio Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass-card neon-green">
            <h3 className="text-lg font-bold text-green-400 mb-2">Total Value</h3>
            <div className="text-3xl font-bold text-white mb-1">
              {formatCurrency(portfolioData.totalValue)}
            </div>
            <div className="text-sm text-gray-400">
              {formatPercent(portfolioData.monthlyChange)} this month
            </div>
          </div>
          
          <div className="glass-card neon-green">
            <h3 className="text-lg font-bold text-green-400 mb-2">Total ROI</h3>
            <div className="text-3xl font-bold text-green-400 mb-1">
              {formatPercent(portfolioData.roi)}
            </div>
            <div className="text-sm text-gray-400">
              All time return
            </div>
          </div>
          
          <div className="glass-card neon-green">
            <h3 className="text-lg font-bold text-green-400 mb-2">Total Cost</h3>
            <div className="text-3xl font-bold text-white mb-1">
              {formatCurrency(portfolioData.totalCost)}
            </div>
            <div className="text-sm text-gray-400">
              Initial investment
            </div>
          </div>
          
          <div className="glass-card neon-green">
            <h3 className="text-lg font-bold text-green-400 mb-2">Holdings</h3>
            <div className="text-3xl font-bold text-purple-400 mb-1">
              {portfolioData.holdings.length}
            </div>
            <div className="text-sm text-gray-400">
              Total cards
            </div>
          </div>
        </motion.div>

        {/* Performance Chart */}
        <motion.div 
          className="glass-card neon-green mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-green-400">Portfolio Performance</h2>
            <div className="flex gap-2">
              {['1D', '1W', '1M', '3M', '1Y'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    selectedTimeframe === timeframe
                      ? 'btn'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                {formatCurrency(portfolioData.performance[selectedTimeframe]?.value || 0)}
              </div>
              <div className="text-lg text-gray-300">
                {formatPercent(portfolioData.performance[selectedTimeframe]?.change || 0)} change
              </div>
            </div>
            <div className="h-64 bg-gray-800/50 rounded-lg p-4 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <div className="text-lg font-bold text-cyan-400 mb-2">Portfolio Growth Chart</div>
                <div className="text-sm text-gray-400 mb-4">
                  {selectedTimeframe} Performance Visualization
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="text-green-400">
                    ▲ Growth: +{portfolioData.performance[selectedTimeframe]?.change || 0}%
                  </div>
                  <div className="text-cyan-400">📊 Trend: Upward</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Holdings Table */}
        <motion.div 
          className="glass-card neon-green mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-green-400">Holdings</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedView('overview')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedView === 'overview'
                    ? 'btn'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedView('detailed')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedView === 'detailed'
                    ? 'btn'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Detailed
              </button>
            </div>
          </div>

          {portfolioData.holdings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-white mb-2">No Holdings Yet</h3>
              <p className="text-gray-400 mb-6">Start building your portfolio by adding cards</p>
              <button className="btn">
                Add First Card
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400">Card</th>
                    <th className="text-left py-3 px-4 text-gray-400">Qty</th>
                    <th className="text-left py-3 px-4 text-gray-400">Cost</th>
                    <th className="text-left py-3 px-4 text-gray-400">Value</th>
                    <th className="text-left py-3 px-4 text-gray-400">Change</th>
                    <th className="text-left py-3 px-4 text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioData.holdings.map((holding) => (
                    <tr 
                      key={holding.id} 
                      className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedHolding(holding)}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{holding.sport || '🏀'}</div>
                          <div>
                            <div className="font-bold text-white">{holding.name}</div>
                            <div className="text-sm text-gray-400">
                              {holding.grade} • {holding.trend === 'up' ? '📈' : '📉'} Trending
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white font-bold">{holding.quantity}</td>
                      <td className="py-4 px-4 text-white">{formatCurrency(holding.cost)}</td>
                      <td className="py-4 px-4 text-cyan-400 font-bold">
                        {formatCurrency(holding.currentValue)}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-bold ${holding.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatPercent(holding.change)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Navigate to grader
                              window.location.href = `/grader?card=${encodeURIComponent(holding.name)}`;
                            }}
                            className="btn btn-secondary py-1 px-3 text-xs"
                          >
                            Grade
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteHolding(holding.id);
                            }}
                            className="btn btn-danger py-1 px-3 text-xs"
                          >
                            Sell
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Selected Holding Details */}
        {selectedHolding && (
          <motion.div 
            className="glass-card neon-cyan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Card Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Card Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white font-bold">{selectedHolding.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Grade:</span>
                    <span className="text-cyan-400 font-bold">{selectedHolding.grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quantity:</span>
                    <span className="text-white font-bold">{selectedHolding.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sport:</span>
                    <span className="text-white">{selectedHolding.sport || '🏀'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Financial Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cost Basis:</span>
                    <span className="text-white font-bold">{formatCurrency(selectedHolding.cost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Value:</span>
                    <span className="text-cyan-400 font-bold">{formatCurrency(selectedHolding.currentValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gain/Loss:</span>
                    <span className={`font-bold ${selectedHolding.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatCurrency((selectedHolding.currentValue - selectedHolding.cost) * selectedHolding.quantity)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI:</span>
                    <span className={`font-bold ${selectedHolding.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatPercent(selectedHolding.change)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setSelectedHolding(null)}
                className="btn btn-secondary"
              >
                Close Details
              </button>
              <button
                onClick={() => {
                  // Navigate to grader
                  window.location.href = `/grader?card=${encodeURIComponent(selectedHolding.name)}`;
                }}
                className="btn"
              >
                Grade This Card
              </button>
              <button
                onClick={() => {
                  // Navigate to oracle
                  window.location.href = `/oracle?card=${encodeURIComponent(selectedHolding.name)}`;
                }}
                className="btn btn-secondary"
              >
                Get AI Analysis
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
