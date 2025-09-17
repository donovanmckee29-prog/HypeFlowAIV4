import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Database, Zap, Brain, Filter, Target, TrendingUp, 
  AlertCircle, CheckCircle, ArrowRight, Star, Activity
} from 'lucide-react';

const ScannerPage = ({ 
  marketData, 
  setMarketData, 
  searchQuery, 
  setSearchQuery,
  selectedCard,
  setSelectedCard
}) => {
  const [filters, setFilters] = useState({
    sport: '',
    minPrice: '',
    maxPrice: '',
    grade: '',
    trend: ''
  });
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    initializeScannerData();
  }, []);

  const initializeScannerData = () => {
    const scannerResults = [
      {
        id: 1,
        name: "Victor Wembanyama 2023-24 Panini Prizm RC",
        player: "Victor Wembanyama",
        sport: "Basketball",
        year: 2023,
        set: "Prizm",
        grade: "Raw",
        currentPrice: 285,
        changePercent: 18.8,
        aiScore: 98,
        flipPotential: 615,
        liquidityScore: 95,
        lastSale: "8 minutes ago"
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
        changePercent: 3.0,
        aiScore: 89,
        flipPotential: 285,
        liquidityScore: 98,
        lastSale: "34 minutes ago"
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
        changePercent: 16.1,
        aiScore: 94,
        flipPotential: 420,
        liquidityScore: 87,
        lastSale: "15 minutes ago"
      },
      {
        id: 4,
        name: "Anthony Richardson 2023 Panini Prizm RC Raw",
        player: "Anthony Richardson",
        sport: "Football",
        year: 2023,
        set: "Prizm",
        grade: "Raw",
        currentPrice: 85,
        changePercent: 24.5,
        aiScore: 76,
        flipPotential: 340,
        liquidityScore: 78,
        lastSale: "22 minutes ago"
      }
    ];
    setSearchResults(scannerResults);
    setMarketData(scannerResults);
  };

  const handleAdvancedSearch = useCallback((query, searchFilters) => {
    setSearchQuery(query);
    
    setTimeout(() => {
      const filteredResults = searchResults.filter(card => {
        const matchesQuery = !query || 
          card.name.toLowerCase().includes(query.toLowerCase()) ||
          card.player.toLowerCase().includes(query.toLowerCase()) ||
          card.sport.toLowerCase().includes(query.toLowerCase());
          
        const matchesFilters = Object.entries(searchFilters).every(([key, value]) => {
          if (!value) return true;
          switch(key) {
            case 'sport': return card.sport.toLowerCase() === value.toLowerCase();
            case 'minPrice': return card.currentPrice >= Number(value);
            case 'maxPrice': return card.currentPrice <= Number(value);
            case 'grade': return card.grade === value;
            default: return true;
          }
        });
        
        return matchesQuery && matchesFilters;
      });
      
      setMarketData(filteredResults);
    }, 300);
  }, [searchResults, setMarketData, setSearchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Search className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Scanner 2.0
            </h1>
          </div>
          <p className="text-xl text-slate-300 mb-6">
            Lightning-fast search with reverse image recognition and smart filters
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>15M+ card database</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Instant results</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>AI recommendations</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleAdvancedSearch(e.target.value, filters)}
                  placeholder="Player, card, or set..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Smart Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Sport</label>
                  <select 
                    value={filters.sport}
                    onChange={(e) => {
                      const newFilters = {...filters, sport: e.target.value};
                      setFilters(newFilters);
                      handleAdvancedSearch(searchQuery, newFilters);
                    }}
                    className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">All Sports</option>
                    <option value="basketball">Basketball</option>
                    <option value="football">Football</option>
                    <option value="baseball">Baseball</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Price Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => {
                        const newFilters = {...filters, minPrice: e.target.value};
                        setFilters(newFilters);
                        handleAdvancedSearch(searchQuery, newFilters);
                      }}
                      className="flex-1 p-2 bg-slate-700/50 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => {
                        const newFilters = {...filters, maxPrice: e.target.value};
                        setFilters(newFilters);
                        handleAdvancedSearch(searchQuery, newFilters);
                      }}
                      className="flex-1 p-2 bg-slate-700/50 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Grade</label>
                  <select 
                    value={filters.grade}
                    onChange={(e) => {
                      const newFilters = {...filters, grade: e.target.value};
                      setFilters(newFilters);
                      handleAdvancedSearch(searchQuery, newFilters);
                    }}
                    className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">All Grades</option>
                    <option value="Raw">Raw</option>
                    <option value="PSA 10">PSA 10</option>
                    <option value="PSA 9">PSA 9</option>
                    <option value="BGS 9.5">BGS 9.5</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Brain className="w-4 h-4 text-cyan-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-300">Based on market trends, consider exploring rookie basketball cards</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-4 h-4 text-green-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-300">Raw cards showing 34% higher flip potential this week</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="w-4 h-4 text-purple-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-300">QB rookies trending up 28% month-over-month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    Search Results ({marketData.length} found)
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-slate-400">AI filtered</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-700/50">
                {marketData.map((card) => (
                  <div 
                    key={card.id} 
                    className="p-6 hover:bg-slate-700/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedCard(card)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                          card.sport === 'Basketball' ? 'from-orange-500 to-red-600' :
                          card.sport === 'Football' ? 'from-green-500 to-emerald-600' :
                          'from-blue-500 to-cyan-600'
                        } flex items-center justify-center`}>
                          <span className="text-white text-xl">
                            {card.sport === 'Basketball' ? '🏀' : card.sport === 'Football' ? '🏈' : '⚾'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-lg">{card.name}</h4>
                          <div className="flex items-center space-x-3 text-sm text-slate-400">
                            <span>{card.sport}</span>
                            <span>•</span>
                            <span>{card.year}</span>
                            <span>•</span>
                            <span>{card.grade}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          ${card.currentPrice.toLocaleString()}
                        </div>
                        <div className={`text-sm font-medium ${
                          card.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {card.changePercent >= 0 ? '+' : ''}{card.changePercent.toFixed(1)}%
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
                        <div className="text-xs text-slate-400">Liquidity</div>
                        <div className="text-lg font-bold text-blue-400">{card.liquidityScore}%</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-slate-400">Last Sale</div>
                        <div className="text-sm font-medium text-slate-300">{card.lastSale}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          card.changePercent > 15 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          card.changePercent > 5 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                        }`}>
                          {card.changePercent > 15 ? 'Hot' : card.changePercent > 5 ? 'Rising' : 'Stable'}
                        </span>
                      </div>
                      <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm">
                        View Comps
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
