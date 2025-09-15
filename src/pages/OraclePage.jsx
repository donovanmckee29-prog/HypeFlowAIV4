import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { oracleAPI } from '../services/api';

export default function OraclePage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModule, setSelectedModule] = useState('general');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [aiMemory, setAiMemory] = useState({
    previousQuestions: [],
    userInterests: [],
    portfolioContext: [],
    learningInsights: []
  });
  const [showMemory, setShowMemory] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversation history on mount
  useEffect(() => {
    loadConversationHistory();
  }, []);

  const loadConversationHistory = async () => {
    try {
      const response = await oracleAPI.getHistory();
      setConversationHistory(response.data);
    } catch (err) {
      console.error('Failed to load conversation history:', err);
    }
  };

  const getOracleResponse = async (question, module = 'general') => {
    try {
      const response = await oracleAPI.query(question, { module });
      return response.data;
    } catch (err) {
      console.error('Oracle query error:', err);
      return {
        statement: "I'm having trouble processing your request right now. Please try again.",
        confidence: 0,
        timeframe: "Unknown",
        rationale: "API error occurred",
        evidence: [],
        actions: []
      };
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setError(null);

    try {
      const oracleResponse = await getOracleResponse(inputMessage, selectedModule);
      
      // Update AI memory
      setAiMemory(prev => ({
        ...prev,
        previousQuestions: [...prev.previousQuestions.slice(-9), {
          question: inputMessage,
          module: selectedModule,
          timestamp: new Date(),
          context: selectedModule
        }]
      }));

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'oracle',
        message: oracleResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError('Failed to get AI response. Please try again.');
      console.error('Send message error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setError(null);
  };

  const aiModules = [
    { id: 'general', name: 'General Oracle', icon: '🌌', description: 'Ask anything about cards' },
    { id: 'predictive', name: 'Predictive Engine', icon: '🔮', description: 'Future price predictions' },
    { id: 'market', name: 'Market Analysis', icon: '📊', description: 'Market trends and data' },
    { id: 'coach', name: 'AI Coach', icon: '🎓', description: 'Learn investment strategies' },
    { id: 'synergy', name: 'Synergy Alerts', icon: '⚡', description: 'Find related opportunities' }
  ];

  const quickQuestions = [
    "Should I buy Luka Prizm Silver?",
    "What about Wembanyama rookie cards?",
    "Is Mahomes a good investment?",
    "What are the top trends right now?",
    "Which cards should I avoid?",
    "Show me market analysis",
    "Teach me about grading",
    "Find synergy opportunities"
  ];

  return (
    <div className="oracle-root min-h-screen container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          🌌 AI Oracle
        </h1>

        {/* AI Modules */}
        <div className="glass-card mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">AI Modules & Quick Questions</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {aiModules.map((module) => (
              <button
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                className={`p-4 rounded-lg text-center transition-all ${
                  selectedModule === module.id
                    ? 'bg-purple-500/20 border-2 border-purple-400'
                    : 'bg-gray-700/50 hover:bg-gray-600/50'
                }`}
              >
                <div className="text-3xl mb-2">{module.icon}</div>
                <div className="text-sm font-bold text-white">{module.name}</div>
                <div className="text-xs text-gray-400">{module.description}</div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMemory(!showMemory)}
                className="btn btn-secondary"
              >
                {showMemory ? 'Hide' : 'Show'} AI Memory
              </button>
              <button
                onClick={clearConversation}
                className="btn btn-danger"
              >
                Clear Chat
              </button>
            </div>
            
            <div className="text-sm text-gray-400">
              Module: {aiModules.find(m => m.id === selectedModule)?.name}
            </div>
          </div>
        </div>

        {/* AI Memory Panel */}
        {showMemory && (
          <motion.div 
            className="glass-card mb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-purple-400 mb-4">AI Memory Panel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-bold text-white mb-2">Recent Questions</h4>
                <div className="space-y-2">
                  {aiMemory.previousQuestions.slice(-5).map((q, index) => (
                    <div key={index} className="text-sm text-gray-300 p-2 bg-gray-800/50 rounded">
                      {q.question}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-md font-bold text-white mb-2">Learning Insights</h4>
                <div className="text-sm text-gray-300">
                  AI is learning from your interactions to provide better, more personalized responses.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Questions */}
        <div className="glass-card mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Quick Questions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="p-3 text-sm bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-left transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="glass-card neon-purple">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Chat with AI Oracle</h2>
          
          {/* Messages */}
          <div className="h-96 overflow-y-auto mb-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <div className="text-4xl mb-4">🌌</div>
                <p>Ask me anything about sports cards, market trends, or investment strategies!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    {message.sender === 'oracle' && typeof message.message === 'object' ? (
                      <div>
                        <div className="font-bold text-purple-400 mb-2">
                          {message.message.statement}
                        </div>
                        <div className="text-sm text-gray-300 mb-2">
                          Confidence: {Math.round(message.message.confidence * 100)}%
                        </div>
                        <div className="text-sm text-gray-300 mb-2">
                          {message.message.rationale}
                        </div>
                        {message.message.evidence && message.message.evidence.length > 0 && (
                          <div className="mt-2">
                            <div className="text-xs font-bold text-cyan-400 mb-1">Evidence:</div>
                            {message.message.evidence.map((evidence, index) => (
                              <div key={index} className="text-xs text-gray-300">
                                • {evidence.finding} ({Math.round(evidence.confidence * 100)}%)
                              </div>
                            ))}
                          </div>
                        )}
                        {message.message.actions && message.message.actions.length > 0 && (
                          <div className="mt-2 flex gap-1">
                            {message.message.actions.map((action, index) => (
                              <button
                                key={index}
                                className="text-xs bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded"
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>{message.message}</div>
                    )}
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-pulse">🌌</div>
                    <span>AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Error State */}
          {error && (
            <div className="error-state mb-4">
              <p>{error}</p>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask the AI Oracle anything about sports cards..."
              className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-400 focus:outline-none"
              disabled={isTyping}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="btn"
            >
              {isTyping ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
