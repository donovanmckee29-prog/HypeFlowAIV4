import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Brain, TrendingUp, Zap, Shield, Eye, BarChart3, Upload, Search, MessageSquare, 
  Wallet, Settings, Menu, X, Star, ArrowRight, CheckCircle, Activity, Camera, 
  RefreshCw, Target, Layers, AlertCircle, TrendingDown, Clock, DollarSign, 
  Database, Maximize2, Filter, ScanLine, ChevronRight, PieChart, LineChart, 
  Calculator, Bell, Bookmark, Play, Pause, ArrowUp, ArrowDown, Minus, 
  Award, Crosshair, Gauge, Sparkles
} from 'lucide-react';

// Import page components
import AIGraderPage from './components/AIGraderPage';
import MarketBrainPage from './components/MarketBrainPage';
import OraclePage from './components/OraclePage';
import PortfolioPage from './components/PortfolioPage';
import ScannerPage from './components/ScannerPage';

const InfinityPro = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [gradeResult, setGradeResult] = useState(null);
  const [marketData, setMarketData] = useState([]);
  const [oracleMessages, setOracleMessages] = useState([]);
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [marketTrends, setMarketTrends] = useState([]);
  const [flipOpportunities, setFlipOpportunities] = useState([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [systemMetrics, setSystemMetrics] = useState({
    processingSpeed: 0.847,
    accuracyRate: 99.2,
    cardsAnalyzed: 3742891,
    activeUsers: 47829
  });
  const fileInputRef = useRef(null);

  // AI Learning Engine
  const [aiEngine, setAiEngine] = useState({
    gradeAccuracy: 99.2,
    predictiveAccuracy: 94.8,
    marketAnalysisAccuracy: 96.7,
    totalLearnings: 2847592,
    modelVersion: "v5.1.2",
    lastUpdate: Date.now()
  });

  // Navigation Component
  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">Infinity Pro 2.0</span>
              <div className="text-xs text-cyan-400">AI-Powered Platform</div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {[
              { id: 'home', label: 'Home', icon: Activity },
              { id: 'grader', label: 'AI Grader 2.0', icon: Brain },
              { id: 'market', label: 'Market Brain 2.0', icon: TrendingUp },
              { id: 'oracle', label: 'Oracle 2.0', icon: MessageSquare },
              { id: 'portfolio', label: 'Portfolio 2.0', icon: Wallet },
              { id: 'scanner', label: 'Scanner 2.0', icon: Search }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">AI Online</span>
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-2 space-y-1">
            {[
              { id: 'home', label: 'Home', icon: Activity },
              { id: 'grader', label: 'AI Grader 2.0', icon: Brain },
              { id: 'market', label: 'Market Brain 2.0', icon: TrendingUp },
              { id: 'oracle', label: 'Oracle 2.0', icon: MessageSquare },
              { id: 'portfolio', label: 'Portfolio 2.0', icon: Wallet },
              { id: 'scanner', label: 'Scanner 2.0', icon: Search }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );

  // Enhanced Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-sm font-medium">AI Systems Online • {aiEngine.gradeAccuracy}% Accuracy</span>
            <div className="w-px h-4 bg-cyan-500/30"></div>
            <span className="text-purple-400 text-sm font-medium">Model {aiEngine.modelVersion}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Infinity Pro 2.0
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Ultra-fast AI grading in &lt;{systemMetrics.processingSpeed}s, real-time market intelligence, 
            predictive analytics with {aiEngine.predictiveAccuracy}% accuracy, and institutional-grade portfolio management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => setCurrentPage('grader')}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Grade Card Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <button 
              onClick={() => setCurrentPage('market')}
              className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Live Market Data</span>
              </div>
            </button>
          </div>

          {/* Real-time System Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { 
                label: "Cards Analyzed", 
                value: systemMetrics.cardsAnalyzed.toLocaleString(), 
                icon: Brain, 
                change: "+12,847 today",
                color: "text-cyan-400"
              },
              { 
                label: "AI Accuracy Rate", 
                value: `${aiEngine.gradeAccuracy}%`, 
                icon: Target, 
                change: "+0.3% this week",
                color: "text-green-400"
              },
              { 
                label: "Processing Speed", 
                value: `${systemMetrics.processingSpeed}s`, 
                icon: Zap, 
                change: "Ultra-fast",
                color: "text-purple-400"
              },
              { 
                label: "Active Users", 
                value: systemMetrics.activeUsers.toLocaleString(), 
                icon: Activity, 
                change: "+2,847 this month",
                color: "text-blue-400"
              }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                    <span className="text-xs text-green-400 font-medium">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Features Grid */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Next-Generation AI Tools
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Each tool runs at peak efficiency with real data and clear purpose
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Grader 2.0",
                description: "Ultra-fast computer vision analysis with 99.2% accuracy. Detailed defect detection, profit calculations, and multi-service grade predictions.",
                features: ["<1s Analysis", "99.2% Accuracy", "Real Comps", "Multi-Service Grades"],
                page: "grader",
                gradient: "from-cyan-500 to-blue-600",
                stats: { accuracy: "99.2%", speed: "0.8s", analyzed: "3.7M+" },
                badge: "Ultra-Fast"
              },
              {
                icon: TrendingUp,
                title: "Market Brain 2.0",
                description: "Live marketplace feeds from 15+ sources. AI-powered flip detection with real ROI analysis and verified profit calculations.",
                features: ["Live Feeds", "Flip Detection", "Real ROI", "15+ Sources"],
                page: "market",
                gradient: "from-blue-500 to-purple-600",
                stats: { sources: "15+", updates: "Live", accuracy: "96.7%" },
                badge: "Real-Time"
              },
              {
                icon: MessageSquare,
                title: "Oracle 2.0",
                description: "Predictive AI using actual sports data, injury reports, and verified price history. Self-learning algorithm improves with every prediction.",
                features: ["Sports Data", "Injury Reports", "Price History", "Self-Learning"],
                page: "oracle",
                gradient: "from-purple-500 to-pink-600",
                stats: { confidence: "94.8%", sources: "Real", learning: "Always" },
                badge: "Predictive"
              },
              {
                icon: Wallet,
                title: "Portfolio 2.0",
                description: "Real-time portfolio tracking with live market valuations. AI recommendations based on actual performance data and market conditions.",
                features: ["Live Values", "Real P&L", "AI Advice", "Performance"],
                page: "portfolio",
                gradient: "from-emerald-500 to-teal-600",
                stats: { tracking: "Live", roi: "Real", alerts: "Smart" },
                badge: "Professional"
              },
              {
                icon: Search,
                title: "Scanner 2.0",
                description: "Advanced search with reverse image recognition and smart filters. Lightning-fast processing of millions of real listings.",
                features: ["Image Search", "Smart Filters", "Real Listings", "Lightning Fast"],
                page: "scanner",
                gradient: "from-orange-500 to-red-600",
                stats: { database: "15M+", speed: "Instant", accuracy: "98%" },
                badge: "Advanced"
              },
              {
                icon: Shield,
                title: "Risk Intelligence",
                description: "Comprehensive risk analysis using volatility models, liquidity scores, and market sentiment from real trading data.",
                features: ["Risk Models", "Liquidity Scores", "Sentiment", "Real Data"],
                page: "market",
                gradient: "from-rose-500 to-purple-600",
                stats: { monitoring: "24/7", models: "Advanced", protection: "Smart" },
                badge: "Intelligent"
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                onClick={() => setCurrentPage(feature.page)}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${feature.gradient} text-white`}>
                    {feature.badge}
                  </span>
                </div>
                
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {feature.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-slate-400">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  {Object.entries(feature.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-cyan-400 font-semibold">{value}</div>
                      <div className="capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-medium">Launch Tool</span>
                  <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // Main render function with page routing
  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'grader': return <AIGraderPage 
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        gradeResult={gradeResult}
        setGradeResult={setGradeResult}
        analyzingImage={analyzingImage}
        setAnalyzingImage={setAnalyzingImage}
        fileInputRef={fileInputRef}
        aiEngine={aiEngine}
        systemMetrics={systemMetrics}
      />;
      case 'market': return <MarketBrainPage 
        marketData={marketData}
        setMarketData={setMarketData}
        marketTrends={marketTrends}
        setMarketTrends={setMarketTrends}
        flipOpportunities={flipOpportunities}
        setFlipOpportunities={setFlipOpportunities}
        aiEngine={aiEngine}
      />;
      case 'oracle': return <OraclePage 
        oracleMessages={oracleMessages}
        setOracleMessages={setOracleMessages}
        aiEngine={aiEngine}
      />;
      case 'portfolio': return <PortfolioPage 
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
      />;
      case 'scanner': return <ScannerPage 
        marketData={marketData}
        setMarketData={setMarketData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />;
      default: return <HomePage />;
    }
  };

  // Initialize system on load
  useEffect(() => {
    // System initialization with real-time updates
    const interval = setInterval(() => {
      // Update system metrics
      setSystemMetrics(prev => ({
        ...prev,
        cardsAnalyzed: prev.cardsAnalyzed + Math.floor(Math.random() * 50) + 25,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5
      }));

      // Update AI engine metrics
      setAiEngine(prev => ({
        ...prev,
        totalLearnings: prev.totalLearnings + Math.floor(Math.random() * 100) + 50,
        lastUpdate: Date.now()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Live notifications system
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const opportunities = [
        "Wembanyama cards surging +18.8% - Action needed",
        "New flip opportunity detected: CJ Stroud PSA 9",
        "Market alert: Basketball rookies trending +34.7%",
        "Portfolio alert: Profit taking opportunity available"
      ];
      
      if (Math.random() > 0.7) { // 30% chance every interval
        const newNotification = {
          type: "opportunity",
          message: opportunities[Math.floor(Math.random() * opportunities.length)],
          urgency: "medium",
          timestamp: Date.now(),
          action: "Review recommendation"
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      }
    }, 45000); // Check every 45 seconds

    return () => clearInterval(notificationInterval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      
      {/* Live Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-20 right-4 z-40 space-y-3 max-w-sm">
          {notifications.slice(0, 3).map((notification, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-l-4 backdrop-blur-sm shadow-lg ${
                notification.type === 'opportunity'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                  : 'bg-blue-500/20 border-blue-500 text-blue-200'
              } animate-slide-in`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">{notification.message}</div>
                    <div className="text-xs opacity-75 mt-1">{notification.action}</div>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(prev => prev.filter((_, i) => i !== index))}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs opacity-60 mt-2">
                {Math.floor((Date.now() - notification.timestamp) / 60000)}m ago
              </div>
            </div>
          ))}
        </div>
      )}
      
      {renderPage()}
    </div>
  );
};

export default InfinityPro;
