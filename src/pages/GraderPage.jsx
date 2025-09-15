import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { graderAPI } from '../services/api';

export default function GraderPage() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedGradingCompany, setSelectedGradingCompany] = useState('PSA');
  const [gradingHistory, setGradingHistory] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCard = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setError(null);

    try {
      // Simulate progressive analysis
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Call API
      const response = await graderAPI.predict(uploadedImage);
      const result = response.data;

      // Add to grading history
      setGradingHistory(prev => [{
        id: Date.now(),
        image: uploadedImage,
        grade: result.predicted_grade,
        confidence: result.confidence,
        timestamp: new Date()
      }, ...prev.slice(0, 4)]);

      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to analyze card. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(100);
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

  return (
    <div className="grader-root min-h-screen container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          🔬 Quantum AI Grader
        </h1>

        {/* Upload Section */}
        <div className="glass-card neon-cyan mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Upload Card Image</h2>
          
          <div className="text-center">
            {uploadedImage ? (
              <div className="mb-6">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded card" 
                  className="max-w-xs mx-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-400 mt-2">Image uploaded successfully</p>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-cyan-400 rounded-lg p-12 cursor-pointer hover:bg-cyan-400/10 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-6xl mb-4">📷</div>
                <p className="text-lg text-gray-300 mb-2">Click to upload card image</p>
                <p className="text-sm text-gray-400">Supports JPG, PNG, WebP formats</p>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              aria-label="Upload card image"
            />
            
            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-secondary"
                disabled={isAnalyzing}
              >
                {uploadedImage ? 'Change Image' : 'Select Image'}
              </button>
              
              <button
                onClick={analyzeCard}
                disabled={!uploadedImage || isAnalyzing}
                className="btn"
              >
                {isAnalyzing ? '🔬 Analyzing...' : '🚀 Analyze Card'}
              </button>
            </div>
          </div>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <motion.div 
            className="glass-card neon-cyan mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">🔬 AI Analysis in Progress</h2>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-4 animate-spin">🔍</div>
                <div className="text-lg text-white mb-2">Analyzing card condition...</div>
                <div className="text-sm text-gray-400">Using advanced computer vision and machine learning</div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-cyan-400">
                {Math.round(analysisProgress)}% Complete
              </div>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            className="error-state mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-lg font-bold mb-2">Analysis Failed</h3>
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="btn"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Results Section */}
        {analysisResult && (
          <motion.div 
            className="glass-card neon-cyan mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Analysis Results</h2>
            
            {/* Predicted Grade */}
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-white mb-2">
                {analysisResult.predicted_grade}
              </div>
              <div className="text-lg text-cyan-400 mb-2">
                Confidence: {analysisResult.confidence}%
              </div>
              <div className="text-sm text-gray-400">
                AI-Predicted Grade
              </div>
            </div>

            {/* Subgrade Breakdown */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Subgrade Analysis</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(analysisResult.subgrades || {}).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">
                      {Math.round(value * 10)}
                    </div>
                    <div className="text-sm text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        style={{ width: `${value * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Predictions */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">All Company Predictions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {analysisResult.all_predictions?.map((prediction, index) => (
                  <div key={index} className="glass-card p-4">
                    <div className="text-lg font-bold text-white mb-2">
                      {prediction.company}
                    </div>
                    <div className="text-2xl font-bold text-cyan-400 mb-1">
                      {prediction.grade}
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      Confidence: {Math.round(prediction.confidence * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      Fee: {formatCurrency(prediction.fee)} • {prediction.timeline}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Analysis */}
            {analysisResult.market_analysis && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Market Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-2">Current Value</h4>
                    <div className="text-3xl font-bold text-white">
                      {formatCurrency(analysisResult.market_analysis.current_value)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-2">Price Trend</h4>
                    <div className="text-2xl font-bold text-green-400">
                      {analysisResult.market_analysis.price_trend}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Insights */}
            {analysisResult.ai_insights && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">AI Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-2">Key Strengths</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {analysisResult.ai_insights.key_strengths?.map((strength, index) => (
                        <li key={index}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-orange-400 mb-2">Areas for Improvement</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {analysisResult.ai_insights.areas_for_improvement?.map((area, index) => (
                        <li key={index}>• {area}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Grading History */}
        {gradingHistory.length > 0 && (
          <motion.div 
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Recent Grading History</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {gradingHistory.map((item) => (
                <div key={item.id} className="text-center">
                  <img 
                    src={item.image} 
                    alt="Graded card" 
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <div className="text-sm font-bold text-white">{item.grade}</div>
                  <div className="text-xs text-gray-400">{item.confidence}%</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
