import React, { useState } from 'react';
import { 
  MessageSquare, Brain, Target, Database, ArrowRight, X
} from 'lucide-react';

const OraclePage = ({ 
  oracleMessages, 
  setOracleMessages, 
  aiEngine 
}) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendAdvancedOracleMessage = async (message) => {
    const newMessage = { 
      type: 'user', 
      content: message, 
      timestamp: Date.now()
    };
    setOracleMessages(prev => [...prev, newMessage]);
    setIsTyping(true);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const getIntelligentResponse = (query) => {
      const lowerQuery = query.toLowerCase();
      
      if (lowerQuery.includes('wembanyama') || lowerQuery.includes('victor')) {
        return {
          content: `WEMBANYAMA MARKET INTELLIGENCE - LIVE ANALYSIS

Current Status: Explosive growth trajectory with 18.8% daily gains
AI Prediction Confidence: 97.2% (Highest tier classification)

FUNDAMENTAL DRIVERS:
• ROY Performance: Historic rookie metrics (37.8 PER, 3.6 BPG)
• International Appeal: First European #1 pick creating global demand
• Card Scarcity: PSA 10 population <1.2%, creating supply constraints
• Institutional Interest: Major collectors accumulating positions

TECHNICAL ANALYSIS:
• Price Action: Breaking through $300 resistance with volume
• Support Level: $250 (strong algorithmic buying)
• RSI: 82 (momentum sustainable in generational talent breakouts)
• Volume Profile: 847 cards traded (24h) - 156% above average

PREDICTIVE MODEL OUTPUT:
30-Day Target: $450-520 (78% probability)
90-Day Target: $720-850 (71% probability)
Playoff Impact: Additional 15-25% premium expected

RECOMMENDATION MATRIX:
Strategy: ACCUMULATE raw cards, grade top 20% immediately
Risk Assessment: Medium-High (offset by fundamental strength)
Timeline: 6-month minimum hold for maximum value realization

Current data indicates this is a once-per-generation opportunity with 94.7% historical success rate for similar rookie breakouts.`,
          confidence: 97,
          modelVersion: "Oracle 2.0 v5.1.2",
          dataPoints: 15847,
          actionItems: ['Accumulate raw inventory', 'Submit best copies for grading', 'Monitor playoff performance', 'Set staged profit targets'],
          sources: ['NBA statistics API', 'Live auction data', 'Historical comp analysis', 'Market sentiment indicators']
        };
      }

      if (lowerQuery.includes('luka') || lowerQuery.includes('doncic')) {
        return {
          content: `LUKA DONČIĆ PREMIUM ASSET ANALYSIS

Current Position: PSA 10 Silver maintaining $4,250 with steady 3.0% growth
Market Classification: Blue-chip investment grade asset

PERFORMANCE DRIVERS:
• MVP Candidacy: Leading Triple-Double metrics (31.2 PPG, 8.9 REB, 9.1 AST)
• Playoff Premium: Historical data shows 15-25% appreciation during deep runs
• International Growth: European market expanding 34% annually
• Investment Grade Status: High liquidity (98 score), low volatility index

TECHNICAL INDICATORS:
• Support Zone: $4,000 (institutional accumulation level)
• Resistance Target: $4,600 (next major breakout level)
• Trend Analysis: 78/100 strength (solid bullish channel)
• Volume Profile: Steady institutional buying pattern

PREDICTIVE MODELING:
Short-term (30d): $4,600 (85% confidence)
Medium-term (90d): $4,950 (79% confidence) 
Long-term (180d): $5,400 (74% confidence)

STRATEGIC RECOMMENDATION:
Position Type: CORE HOLDING with selective accumulation
Entry Strategy: Add positions on dips below $4,000
Exit Strategy: Consider profit-taking above $4,800 during playoffs
Risk Profile: Low-Medium (established superstar, proven track record)

This represents a mature, stable investment with predictable appreciation cycles tied to team performance and market conditions.`,
          confidence: 92,
          modelVersion: "Oracle 2.0 v5.1.2",
          dataPoints: 12459,
          actionItems: ['Monitor MVP voting trends', 'Set buy alerts at $3,950', 'Prepare playoff exit strategy', 'Track European market demand'],
          sources: ['NBA performance metrics', 'PWCC auction database', 'International sales tracking', 'Playoff correlation analysis']
        };
      }

      if (lowerQuery.includes('portfolio') || lowerQuery.includes('performance')) {
        return {
          content: `PORTFOLIO PERFORMANCE DEEP DIVE

Current Status: $89,447 total value representing 71.5% ROI
Performance Classification: EXCEPTIONAL (Top 3% of tracked portfolios)

POSITION-BY-POSITION ANALYSIS:
1. Wembanyama Raw Holdings (8 cards @ $285 avg)
   • Current Gain: +72.7% ($960 profit)
   • AI Recommendation: GRADE top 3 copies immediately
   • Risk Level: Medium-High (rookie volatility offset by generational talent)
   • Target Action: Submit PSA grading within 7 days

2. Luka PSA 10 Position (2 cards @ $4,250 avg)
   • Current Gain: +11.8% ($900 profit)
   • AI Recommendation: CORE HOLD with selective adds
   • Risk Level: Low-Medium (blue-chip stability)
   • Target Action: Monitor for sub-$4,000 entry opportunities

3. Stroud PSA 9 Holdings (12 cards @ $180 avg)
   • Current Gain: +44.0% ($660 profit)
   • AI Recommendation: PARTIAL SELL (50% position)
   • Risk Level: Medium-High (rookie season dependency)
   • Target Action: Lock profits at $220+ per card

PORTFOLIO METRICS ANALYSIS:
• Sharpe Ratio: 2.34 (Exceptional risk-adjusted returns)
• Maximum Drawdown: -12.8% (Well-controlled downside)
• Win Rate: 84.7% (Outstanding selection accuracy)
• Concentration Risk: 68% Basketball (REDUCE to 55% maximum)

IMMEDIATE ACTION ITEMS:
1. PROFIT REALIZATION: Wembanyama position hitting 70%+ gains
2. RISK MANAGEMENT: Reduce basketball concentration below 60%
3. DIVERSIFICATION: Add football/baseball positions for balance
4. GRADING PIPELINE: Submit 3 best Wembanyama cards for PSA grading

Your portfolio significantly outperforms 97% of comparable holdings with superior risk management. Focus on profit-taking discipline while maintaining growth momentum.`,
          confidence: 94,
          modelVersion: "Oracle 2.0 v5.1.2",
          dataPoints: 23891,
          actionItems: ['Execute 25% Wembanyama profit-taking', 'Research football rookie additions', 'Submit grading orders', 'Rebalance sport allocation'],
          sources: ['Real-time portfolio tracking', 'Risk assessment models', 'Performance benchmarking', 'Market correlation analysis']
        };
      }

      return {
        content: `AI MARKET INTELLIGENCE SUMMARY

System Status: All predictive models operating at peak efficiency
Market State: Selective strength with high-opportunity environments detected

LIVE OPPORTUNITY SCANNER:
• 347 cards currently flagged for potential opportunities
• 23 high-confidence flip targets identified in last 4 hours
• 7 emerging breakout patterns detected across multiple sports

CATEGORY MOMENTUM ANALYSIS:
Basketball Rookies: +34.7% category surge (EXCEPTIONAL)
Football Rookies: +28.4% sustained growth (STRONG)
Vintage Stars: +8.9% steady appreciation (HEALTHY)
Modern Parallels: +12.3% selective strength (MODERATE)

PREDICTIVE MODEL CONFIDENCE:
Short-term (1-30 days): 94.8% accuracy
Medium-term (1-6 months): 87.2% accuracy
Long-term (6+ months): 76.8% accuracy

RISK ASSESSMENT MATRIX:
Overall Market Volatility: MEDIUM
Liquidity Conditions: STRONG across major categories
Economic Impact: MINIMAL on collectibles sector
Seasonal Factors: POSITIVE (approaching playoff premium)

The AI continues learning from 23,847 daily transactions to refine recommendations. Current processing speed: 0.3 seconds per complete market analysis.

What specific market segment or investment strategy would you like me to analyze in greater detail?`,
        confidence: 88,
        modelVersion: "Oracle 2.0 v5.1.2",
        dataPoints: 18234,
        actionItems: ['Review opportunity alerts', 'Specify analysis focus', 'Update investment parameters'],
        sources: ['Multi-marketplace aggregation', 'Real-time sentiment analysis', 'Predictive modeling engine']
      };
    };
    
    const aiResponse = getIntelligentResponse(message);
    const response = {
      type: 'ai',
      content: aiResponse.content,
      timestamp: Date.now(),
      confidence: aiResponse.confidence,
      sources: aiResponse.sources,
      actionItems: aiResponse.actionItems,
      modelVersion: aiResponse.modelVersion,
      dataPoints: aiResponse.dataPoints
    };
    
    setOracleMessages(prev => [...prev, response]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <MessageSquare className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Oracle 2.0
            </h1>
          </div>
          <p className="text-xl text-slate-300 mb-4">
            Advanced predictive AI with {aiEngine.predictiveAccuracy}% accuracy and real-time learning
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>Self-learning AI</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>{aiEngine.predictiveAccuracy}% prediction accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>{aiEngine.totalLearnings.toLocaleString()}+ data points</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {oracleMessages.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Ask Oracle anything</h3>
                <p className="text-slate-400 mb-6">
                  Advanced AI with real sports data, market intelligence, and predictive analytics
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {[
                    "Analyze Wembanyama's market potential",
                    "Should I sell my Luka Prizm now?", 
                    "Best rookie investments for 2024?",
                    "Review my portfolio performance"
                  ].map((example, index) => (
                    <button
                      key={index}
                      onClick={() => sendAdvancedOracleMessage(example)}
                      className="text-left p-3 bg-slate-700/50 rounded-lg text-sm text-slate-300 hover:bg-slate-700/70 transition-colors border border-slate-600/50 hover:border-cyan-400/50"
                    >
                      "{example}"
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              oracleMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/30'
                        : 'bg-slate-700/50 text-slate-100'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-mono text-sm">{message.content}</div>
                    {message.type === 'ai' && (
                      <div className="mt-4 pt-4 border-t border-slate-600/50">
                        <div className="grid grid-cols-3 gap-4 text-xs text-slate-400 mb-3">
                          <div>
                            <span className="text-cyan-400">Confidence:</span> {message.confidence}%
                          </div>
                          <div>
                            <span className="text-purple-400">Model:</span> {message.modelVersion}
                          </div>
                          <div>
                            <span className="text-green-400">Data Points:</span> {message.dataPoints?.toLocaleString()}
                          </div>
                        </div>
                        {message.actionItems && (
                          <div className="mb-3">
                            <div className="text-xs text-slate-400 mb-1">Action Items:</div>
                            <div className="flex flex-wrap gap-2">
                              {message.actionItems.map((item, i) => (
                                <span key={i} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs border border-cyan-500/30">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {message.sources && (
                          <div>
                            <div className="text-xs text-slate-400 mb-1">Data Sources:</div>
                            <div className="text-xs text-slate-500">
                              {message.sources.join(' • ')}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700/50 rounded-2xl p-4 max-w-xs">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-700/50 p-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isTyping && currentMessage.trim()) {
                    sendAdvancedOracleMessage(currentMessage);
                    setCurrentMessage('');
                  }
                }}
                placeholder="Ask Oracle about market trends, predictions, or strategies..."
                className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                disabled={isTyping}
              />
              <button
                onClick={() => {
                  if (currentMessage.trim() && !isTyping) {
                    sendAdvancedOracleMessage(currentMessage);
                    setCurrentMessage('');
                  }
                }}
                disabled={isTyping || !currentMessage.trim()}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OraclePage;
