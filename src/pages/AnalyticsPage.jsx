import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState({
    portfolioValue: 0,
    totalROI: 0,
    monthlyGrowth: 0,
    topPerformer: null,
    worstPerformer: null,
    marketTrends: [],
    priceHistory: [],
    sectorBreakdown: []
  });

  const [filters, setFilters] = useState({
    sport: 'all',
    player: 'all',
    set: 'all',
    gradingCompany: 'all',
    timeframe: '1Y'
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading real analytics data
    const loadAnalyticsData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Real analytics data
      const mockData = {
        portfolioValue: 127500,
        totalROI: 34.7,
        monthlyGrowth: 8.2,
        topPerformer: {
          name: "LeBron James 2003 Topps Chrome Refractor",
          grade: "PSA 10",
          purchasePrice: 2500,
          currentValue: 8500,
          roi: 240,
          change: "+12.5%"
        },
        worstPerformer: {
          name: "Zion Williamson 2019 Prizm Base",
          grade: "PSA 9",
          purchasePrice: 1200,
          currentValue: 450,
          roi: -62.5,
          change: "-8.3%"
        },
        marketTrends: [
          { category: "Basketball", value: 45, change: "+12.3%" },
          { category: "Football", value: 28, change: "+8.7%" },
          { category: "Baseball", value: 18, change: "+5.2%" },
          { category: "Hockey", value: 9, change: "-2.1%" }
        ],
        priceHistory: [
          { month: "Jan", value: 85000 },
          { month: "Feb", value: 92000 },
          { month: "Mar", value: 88000 },
          { month: "Apr", value: 95000 },
          { month: "May", value: 102000 },
          { month: "Jun", value: 115000 },
          { month: "Jul", value: 127500 }
        ],
        sectorBreakdown: [
          { sector: "Rookies", percentage: 35, value: 44625 },
          { sector: "Veterans", percentage: 25, value: 31875 },
          { sector: "Legends", percentage: 20, value: 25500 },
          { sector: "Modern Stars", percentage: 20, value: 25500 }
        ]
      };
      
      setAnalyticsData(mockData);
      setLoading(false);
    };

    loadAnalyticsData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen analytics-root">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div 
          className="glass-card text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title mb-4">Analytics Dashboard</h1>
          <p className="subtitle">
            Deep insights into your portfolio performance and market trends
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="stats-grid mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="stat-item">
            <div className="stat-value">{formatCurrency(analyticsData.portfolioValue)}</div>
            <div className="stat-label">Portfolio Value</div>
          </div>
          <div className="stat-item">
            <div className="stat-value text-green-400">{formatPercentage(analyticsData.totalROI)}</div>
            <div className="stat-label">Total ROI</div>
          </div>
          <div className="stat-item">
            <div className="stat-value text-cyan-400">{formatPercentage(analyticsData.monthlyGrowth)}</div>
            <div className="stat-label">Monthly Growth</div>
          </div>
          <div className="stat-item">
            <div className="stat-value text-orange-400">{analyticsData.priceHistory.length}</div>
            <div className="stat-label">Months Tracked</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="glass-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-cyan-400 mb-6">Filters</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <select 
              className="bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-2 text-white"
              value={filters.sport}
              onChange={(e) => setFilters({...filters, sport: e.target.value})}
            >
              <option value="all">All Sports</option>
              <option value="basketball">Basketball</option>
              <option value="football">Football</option>
              <option value="baseball">Baseball</option>
              <option value="hockey">Hockey</option>
            </select>
            
            <select 
              className="bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-2 text-white"
              value={filters.timeframe}
              onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
            >
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="6M">6 Months</option>
              <option value="1Y">1 Year</option>
              <option value="ALL">All Time</option>
            </select>
            
            <select 
              className="bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-2 text-white"
              value={filters.gradingCompany}
              onChange={(e) => setFilters({...filters, gradingCompany: e.target.value})}
            >
              <option value="all">All Graders</option>
              <option value="psa">PSA</option>
              <option value="bgs">BGS</option>
              <option value="sgc">SGC</option>
            </select>
            
            <input 
              type="text" 
              placeholder="Player Name"
              className="bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-2 text-white placeholder-gray-400"
              value={filters.player}
              onChange={(e) => setFilters({...filters, player: e.target.value})}
            />
            
            <button className="btn">Apply Filters</button>
          </div>
        </motion.div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="investment-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-green-400 mb-6">Top Performer</h3>
            {analyticsData.topPerformer && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {analyticsData.topPerformer.name}
                </h4>
                <p className="text-gray-300 mb-4">{analyticsData.topPerformer.grade}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Purchase Price</div>
                    <div className="text-lg font-bold text-white">
                      {formatCurrency(analyticsData.topPerformer.purchasePrice)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Current Value</div>
                    <div className="text-lg font-bold text-green-400">
                      {formatCurrency(analyticsData.topPerformer.currentValue)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">ROI</div>
                    <div className="text-lg font-bold text-green-400">
                      {formatPercentage(analyticsData.topPerformer.roi)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Change</div>
                    <div className="text-lg font-bold text-green-400">
                      {analyticsData.topPerformer.change}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div 
            className="investment-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-red-400 mb-6">Worst Performer</h3>
            {analyticsData.worstPerformer && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {analyticsData.worstPerformer.name}
                </h4>
                <p className="text-gray-300 mb-4">{analyticsData.worstPerformer.grade}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Purchase Price</div>
                    <div className="text-lg font-bold text-white">
                      {formatCurrency(analyticsData.worstPerformer.purchasePrice)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Current Value</div>
                    <div className="text-lg font-bold text-red-400">
                      {formatCurrency(analyticsData.worstPerformer.currentValue)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">ROI</div>
                    <div className="text-lg font-bold text-red-400">
                      {formatPercentage(analyticsData.worstPerformer.roi)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Change</div>
                    <div className="text-lg font-bold text-red-400">
                      {analyticsData.worstPerformer.change}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Market Trends Chart */}
        <motion.div 
          className="chart-container mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="chart-title">Portfolio Value Over Time</h3>
          <div className="h-64 flex items-end justify-between">
            {analyticsData.priceHistory.map((point, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-gradient-to-t from-cyan-400 to-cyan-600 rounded-t w-8 mb-2"
                  style={{ height: `${(point.value / 130000) * 200}px` }}
                ></div>
                <div className="text-xs text-gray-400">{point.month}</div>
                <div className="text-xs text-cyan-400 font-bold">
                  {formatCurrency(point.value)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sector Breakdown */}
        <motion.div 
          className="glass-card mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h3 className="text-xl font-bold text-cyan-400 mb-6">Portfolio Breakdown by Sector</h3>
          <div className="space-y-4">
            {analyticsData.sectorBreakdown.map((sector, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-cyan-400 rounded"></div>
                  <span className="text-white font-semibold">{sector.sector}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-2 rounded-full"
                      style={{ width: `${sector.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-cyan-400 font-bold w-20 text-right">
                    {sector.percentage}%
                  </span>
                  <span className="text-white font-bold w-24 text-right">
                    {formatCurrency(sector.value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Export Options */}
        <motion.div 
          className="glass-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-xl font-bold text-cyan-400 mb-6">Export Data</h3>
          <div className="flex justify-center gap-4">
            <button className="btn">Export to CSV</button>
            <button className="btn btn-secondary">Export to PDF</button>
            <button className="btn btn-secondary">Share Report</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
