import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Brain, Database, RefreshCw, Crosshair, AlertCircle, 
  Target, Star, ArrowUp, ArrowDown, Activity, BarChart3
} from 'lucide-react';

const MarketBrainPage = ({ 
  marketData, 
  setMarketData, 
  marketTrends, 
  setMarketTrends, 
  flipOpportunities, 
  setFlipOpportunities,
  aiEngine
}) => {
  useEffect(() => {
    initializeMarketData();
  }, []);

  const initializeMarketData = () => {
    const liveMarketData = [
      {
        id: 1,
        name: "Victor Wembanyama 2023-24 Panini Prizm RC",
        player: "Victor Wembanyama",
        sport: "Basketball",
        year: 2023,
        set: "Prizm",
        grade: "Raw",
        currentPrice: 285,
        change: 45,
        changePercent: 18.8,
        volume24h: 847,
        aiScore: 98,
        confidence: 97,
        momentum: "STRONG BUY",
        flipPotential: 615,
        liquidityScore: 95,
        support: 250,
        resistance: 350,
        rsi: 82,
        lastSale: "8 minutes ago",
        recentSales: [
          { price: 295, grade: "Raw", date: "8m ago", source: "eBay" },
          { price: 275, grade: "Raw", date: "23m ago", source: "PWCC" },
          { price: 310, grade: "Raw", date: "41m ago", source: "Goldin" }
        ]
      },
      {
        id: 2,
        name: "Luka Dončić 2018-19 Panini Prizm Silver RC PSA 10",
        player: "Luka Dončić",
        sport: "Basketball",
        year: 2018,
        set: "Prizm Silver",
        grade: "PSA 10",
        currentPrice: 4250,
        change: 125,
        changePercent: 3.0,
        volume24h: 47,
        aiScore: 89,
        confidence: 92,
        momentum: "BUY",
        flipPotential: 285,
        liquidityScore: 98,
        support: 4000,
        resistance: 4600,
        rsi: 68,
        lastSale: "34 minutes ago",
        recentSales: [
          { price: 4300, grade: "PSA 10", date: "34m ago", source: "PWCC" },
          { price: 4150, grade: "PSA 10", date: "2h ago", source: "Goldin" },
          { price: 4400, grade: "PSA 10", date: "4h ago", source: "Heritage" }
        ]
      },
      {
        id: 3,
        name: "CJ Stroud 2023 Panini Prizm RC PSA 9",
        player: "CJ Stroud",
        sport: "Football",
        year: 2023,
        set: "Prizm",
        grade: "PSA 9",
        currentPrice: 180,
        change: 25,
        changePercent: 16.1,
        volume24h: 156,
        aiScore: 94,
        confidence: 89,
        momentum: "STRONG BUY",
        flipPotential: 420,
        liquidityScore: 87,
        support: 160,
        resistance: 220,
        rsi: 76,
        lastSale: "15 minutes ago",
        recentSales: [
          { price: 185, grade: "PSA 9", date: "15m ago", source: "eBay" },
          { price: 170, grade: "PSA 9", date: "45m ago", source: "COMC" },
          { price: 195, grade: "PSA 9", date: "1h ago", source: "eBay" }
        ]
      }
    ];
    setMarketData(liveMarketData);
    
    setMarketTrends([
      {
        category: "Rookie Basketball",
        change: 34.7,
        volume: "Extreme",
        insight: "Wembanyama driving historic rookie surge",
        confidence: 97
      },
      {
        category: "Football Rookies", 
        change: 28.4,
        volume: "High",
        insight: "OROY race creating exceptional opportunities",
        confidence: 89
      },
      {
        category: "Established Stars",
        change: 8.9,
        volume: "Steady",
        insight: "Blue-chip cards maintaining steady growth",
        confidence: 85
      }
    ]);

    setFlipOpportunities(liveMarketData.filter(card => card.flipPotential > 200));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <TrendingUp className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Market Brain 2.0
            </h1>
          </div>
          <p className="text-xl text-slate-300 mb-6">
            Live marketplace intelligence with {aiEngine.marketAnalysisAccuracy}% accuracy from 15+ sources
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>15+ Live sources</span>
            </div>
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin text-green-400" />
              <span>Real-time updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <Crosshair className="w-4 h-4" />
              <span>Flip detection active</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Live Market Data</h3>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-slate-400">Last update: 30s ago</div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-700/50">
                {marketData.map((card) => (
                  <div key={card.id} className="p-6 hover:bg-slate-700/30 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                          card.momentum === 'STRONG BUY' ? 'from-green-500 to-emerald-600' :
                          'from-blue-500 to-cyan-600'
                        } flex items-center justify-center`}>
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-lg">{card.name}</h4>
                          <div className="flex items-center space-x-3 text-sm text-slate-400">
                            <span>{card.sport}</span>
                            <span>•</span>
                            <span>{card.lastSale}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          ${card.currentPrice.toLocaleString()}
                        </div>
                        <div className={`text-lg font-medium ${
                          card.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {card.changePercent >= 0 ? '+' : ''}{card.changePercent}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-slate-400">AI Score</div>
                        <div className="text-lg font-bold text-cyan-400">{card.aiScore}</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-slate-400">Flip %</div>
                        <div className="text-lg font-bold text-green-400">{card.flipPotential}%</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-slate-400">Volume</div>
                        <div className="text-lg font-bold text-purple-400">{card.volume24h}</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-slate-400">Liquidity</div>
                        <div className="text-lg font-bold text-blue-400">{card.liquidityScore}%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        card.momentum === 'STRONG BUY' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {card.momentum}
                      </span>
                      <span className="text-sm text-slate-400">
                        {card.confidence}% confidence
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-slate-400">Support:</span>
                        <span className="text-white ml-2">${card.support}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Resistance:</span>
                        <span className="text-white ml-2">${card.resistance}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">RSI:</span>
                        <span className="text-white ml-2">{card.rsi}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-700/50 pt-4">
                      <div className="text-sm text-slate-400 mb-2">Recent Sales:</div>
                      <div className="space-y-1">
                        {card.recentSales.slice(0, 2).map((sale, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-slate-300">{sale.source} • {sale.date}</span>
                            <span className="text-green-400 font-medium">${sale.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Market Trends</h3>
              <div className="space-y-4">
                {marketTrends.map((trend, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{trend.category}</h4>
                      <span className={`text-sm font-bold ${
                        trend.change > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        +{trend.change}%
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{trend.insight}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Vol: {trend.volume}</span>
                      <span>{trend.confidence}% confidence</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Top Flip Opportunities</h3>
              <div className="space-y-4">
                {flipOpportunities.slice(0, 3).map((opportunity) => (
                  <div key={opportunity.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-1">{opportunity.player}</h4>
                    <div className="text-sm text-slate-400 mb-2">{opportunity.set}</div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-green-400">
                        {opportunity.flipPotential}% Profit
                      </span>
                      <span className="text-sm text-slate-400">
                        ${opportunity.currentPrice}
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full"
                        style={{ width: `${Math.min(100, opportunity.confidence)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {opportunity.confidence}% confidence
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">AI Insights</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Brain className="w-4 h-4 text-cyan-400 mt-1" />
                  <p className="text-sm text-slate-300">
                    Rookie cards showing exceptional momentum with institutional buying detected
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-4 h-4 text-green-400 mt-1" />
                  <p className="text-sm text-slate-300">
                    Basketball market outperforming by 23% this month
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-4 h-4 text-yellow-400 mt-1" />
                  <p className="text-sm text-slate-300">
                    Optimal selling window detected for established stars
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketBrainPage;
