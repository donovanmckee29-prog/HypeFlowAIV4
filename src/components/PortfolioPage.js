import React, { useState, useEffect } from 'react';
import { 
  Wallet, TrendingUp, ArrowUp, Star, Target, RefreshCw, CheckCircle, 
  AlertCircle, Activity, BarChart3, PieChart, LineChart
} from 'lucide-react';

const PortfolioPage = ({ 
  portfolioData, 
  setPortfolioData 
}) => {
  useEffect(() => {
    initializePortfolioData();
  }, []);

  const initializePortfolioData = () => {
    const portfolio = {
      totalValue: 89447,
      totalCost: 52150,
      totalGain: 37297,
      totalGainPercent: 71.5,
      dayChange: 1247,
      dayChangePercent: 1.42,
      performanceMetrics: {
        sharpeRatio: 2.34,
        maxDrawdown: -12.8,
        winRate: 84.7,
        avgHoldingPeriod: 156,
        totalROI: 71.5,
        annualizedReturn: 47.2,
        volatility: 18.3,
        beta: 0.89
      },
      items: [
        {
          id: 1,
          name: "Victor Wembanyama 2023 Prizm RC Raw",
          player: "Victor Wembanyama",
          sport: "Basketball",
          quantity: 8,
          avgCost: 165,
          currentPrice: 285,
          totalValue: 2280,
          totalCost: 1320,
          gain: 960,
          gainPercent: 72.7,
          aiRecommendation: "GRADE & HOLD",
          aiConfidence: 96,
          targetPrice: 450,
          riskLevel: "High",
          liquidityScore: 95
        },
        {
          id: 2,
          name: "Luka Dončić 2018 Prizm Silver PSA 10",
          player: "Luka Dončić", 
          sport: "Basketball",
          quantity: 2,
          avgCost: 3800,
          currentPrice: 4250,
          totalValue: 8500,
          totalCost: 7600,
          gain: 900,
          gainPercent: 11.8,
          aiRecommendation: "HOLD",
          aiConfidence: 92,
          targetPrice: 4800,
          riskLevel: "Medium",
          liquidityScore: 98
        },
        {
          id: 3,
          name: "CJ Stroud 2023 Prizm RC PSA 9",
          player: "CJ Stroud",
          sport: "Football", 
          quantity: 12,
          avgCost: 125,
          currentPrice: 180,
          totalValue: 2160,
          totalCost: 1500,
          gain: 660,
          gainPercent: 44.0,
          aiRecommendation: "PARTIAL SELL",
          aiConfidence: 89,
          targetPrice: 220,
          riskLevel: "Medium-High",
          liquidityScore: 87
        }
      ],
      alerts: [
        {
          type: "profit_target",
          message: "Wembanyama position hitting 70%+ gains - Consider profit taking",
          urgency: "high",
          timestamp: Date.now() - 900000,
          action: "Grade best 3 copies, sell 25% position"
        },
        {
          type: "market_opportunity",
          message: "Stroud showing OROY momentum - Optimal exit window",
          urgency: "medium", 
          timestamp: Date.now() - 1800000,
          action: "Sell 50% position above $200"
        }
      ],
      diversification: {
        bySport: { Basketball: 68, Football: 24, Baseball: 8 },
        byYear: { "2018": 42, "2023": 58 },
        byRisk: { High: 25, Medium: 60, Low: 15 }
      }
    };
    setPortfolioData(portfolio);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Wallet className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Portfolio Tracker 2.0
            </h1>
          </div>
          <p className="text-xl text-slate-300 mb-6">
            Professional portfolio management with real-time valuations and AI insights
          </p>
        </div>

        {portfolioData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-slate-400">Total Value</h3>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white">${portfolioData.totalValue.toLocaleString()}</div>
                <div className="text-green-400 text-sm">+${portfolioData.dayChange.toLocaleString()} today</div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-slate-400">Total Gain</h3>
                  <ArrowUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-green-400">+${portfolioData.totalGain.toLocaleString()}</div>
                <div className="text-green-400 text-sm">+{portfolioData.totalGainPercent}%</div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-slate-400">Sharpe Ratio</h3>
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-white">{portfolioData.performanceMetrics.sharpeRatio}</div>
                <div className="text-slate-400 text-sm">Excellent risk-adjusted returns</div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-slate-400">Win Rate</h3>
                  <Target className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white">{portfolioData.performanceMetrics.winRate}%</div>
                <div className="text-cyan-400 text-sm">Outstanding success rate</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                  <div className="p-6 border-b border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">Current Holdings</h3>
                      <div className="flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4 text-green-400 animate-spin" />
                        <span className="text-sm text-slate-400">Live pricing</span>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-700/50">
                    {portfolioData.items.map((item) => (
                      <div key={item.id} className="p-6 hover:bg-slate-700/30 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                              item.sport === 'Basketball' ? 'from-orange-500 to-red-600' :
                              item.sport === 'Football' ? 'from-green-500 to-emerald-600' :
                              'from-blue-500 to-cyan-600'
                            } flex items-center justify-center`}>
                              <span className="text-white font-bold">
                                {item.sport === 'Basketball' ? '🏀' : item.sport === 'Football' ? '🏈' : '⚾'}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white text-lg">{item.name}</h4>
                              <div className="flex items-center space-x-3 text-sm text-slate-400">
                                <span>Qty: {item.quantity}</span>
                                <span>•</span>
                                <span>Avg Cost: ${item.avgCost}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-xl font-bold text-white">
                              ${item.totalValue.toLocaleString()}
                            </div>
                            <div className={`text-lg font-medium ${
                              item.gainPercent >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {item.gainPercent >= 0 ? '+' : ''}{item.gainPercent.toFixed(1)}%
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                            <div className="text-xs text-slate-400">Current Price</div>
                            <div className="text-sm font-bold text-white">${item.currentPrice}</div>
                          </div>
                          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                            <div className="text-xs text-slate-400">Target Price</div>
                            <div className="text-sm font-bold text-cyan-400">${item.targetPrice}</div>
                          </div>
                          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                            <div className="text-xs text-slate-400">Liquidity</div>
                            <div className="text-sm font-bold text-blue-400">{item.liquidityScore}%</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                              item.aiRecommendation.includes('SELL') ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                              item.aiRecommendation.includes('BUY') ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                              'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            }`}>
                              {item.aiRecommendation}
                            </span>
                            <span className="text-sm text-slate-400">
                              {item.aiConfidence}% confidence
                            </span>
                          </div>
                          <div className="text-sm text-slate-300">
                            Risk: {item.riskLevel}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    {Object.entries(portfolioData.performanceMetrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-slate-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {typeof value === 'number' ? 
                            (key.includes('Percent') || key.includes('Return') || key.includes('Rate') || key === 'totalROI' ? 
                              `${value}%` : value) : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Portfolio Alerts</h3>
                  <div className="space-y-3">
                    {portfolioData.alerts.map((alert, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        alert.urgency === 'high' ? 'bg-red-500/10 border-red-500' :
                        'bg-yellow-500/10 border-yellow-500'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <span className={`text-sm font-medium ${
                            alert.urgency === 'high' ? 'text-red-400' : 'text-yellow-400'
                          }`}>
                            {alert.type.replace(/_/g, ' ').toUpperCase()}
                          </span>
                          <span className="text-xs text-slate-500">
                            {Math.floor((Date.now() - alert.timestamp) / 60000)}m ago
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{alert.message}</p>
                        <div className="text-xs text-slate-400">{alert.action}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Diversification</h3>
                  <div className="space-y-4">
                    {Object.entries(portfolioData.diversification).map(([category, breakdown]) => (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-slate-400 mb-2 capitalize">
                          {category.replace('by', 'By ')}
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(breakdown).map(([item, percentage]) => (
                            <div key={item} className="flex items-center justify-between">
                              <span className="text-sm text-slate-300">{item}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-12 bg-slate-600 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-slate-400 w-10 text-right">{percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
