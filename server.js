const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/infinity-cards';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Database Models
const cardSchema = new mongoose.Schema({
  player: String,
  card: String,
  grade: String,
  value: Number,
  roi: Number,
  confidence: Number,
  image: String,
  userId: String,
  createdAt: { type: Date, default: Date.now }
});

const portfolioSchema = new mongoose.Schema({
  userId: String,
  holdings: [{
    cardId: String,
    quantity: Number,
    purchasePrice: Number,
    currentValue: Number,
    roi: Number
  }],
  totalValue: Number,
  totalROI: Number,
  lastUpdated: { type: Date, default: Date.now }
});

const predictionSchema = new mongoose.Schema({
  player: String,
  card: String,
  currentValue: Number,
  predictedValue: Number,
  confidence: Number,
  timeframe: String,
  reasoning: String,
  createdAt: { type: Date, default: Date.now }
});

const Card = mongoose.model('Card', cardSchema);
const Portfolio = mongoose.model('Portfolio', portfolioSchema);
const Prediction = mongoose.model('Prediction', predictionSchema);

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'Infinity Sports Card Platform'
  });
});

// AI Grader API
app.post('/api/grader/analyze', async (req, res) => {
  try {
    const { image, gradingCompany } = req.body;
    
    // Simulate AI analysis
    const analysis = {
      grade: Math.floor(Math.random() * 4) + 7, // Grade 7-10
      subgrades: {
        centering: Math.floor(Math.random() * 3) + 8,
        corners: Math.floor(Math.random() * 3) + 7,
        edges: Math.floor(Math.random() * 3) + 7,
        surface: Math.floor(Math.random() * 3) + 8
      },
      confidence: 95 + Math.floor(Math.random() * 5),
      company: gradingCompany || 'PSA',
      recommendations: [
        'Card is in excellent condition',
        'Consider professional grading',
        'Store in protective case'
      ],
      value: Math.floor(Math.random() * 5000) + 1000
    };

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed' });
  }
});

// AI Oracle API
app.post('/api/oracle/query', async (req, res) => {
  try {
    const { query } = req.body;
    
    // Simulate AI response
    const response = {
      answer: `Infinity Analysis: ${query}`,
      confidence: 90 + Math.floor(Math.random() * 10),
      action: 'ANALYZE',
      timeframe: 'Immediate',
      risk: 'Low',
      data: {
        marketTrend: 'Rising',
        recommendation: 'BUY',
        confidence: 95
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Query failed' });
  }
});

// Portfolio API
app.get('/api/portfolio/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const portfolio = await Portfolio.findOne({ userId });
    
    if (!portfolio) {
      return res.json({
        userId,
        holdings: [],
        totalValue: 0,
        totalROI: 0,
        lastUpdated: new Date()
      });
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Portfolio fetch failed' });
  }
});

app.post('/api/portfolio/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { holdings, totalValue, totalROI } = req.body;
    
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId },
      { holdings, totalValue, totalROI, lastUpdated: new Date() },
      { upsert: true, new: true }
    );

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Portfolio update failed' });
  }
});

// Predictions API
app.get('/api/predictions', async (req, res) => {
  try {
    const predictions = await Prediction.find().sort({ createdAt: -1 }).limit(10);
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Predictions fetch failed' });
  }
});

app.post('/api/predictions', async (req, res) => {
  try {
    const prediction = new Prediction(req.body);
    await prediction.save();
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: 'Prediction creation failed' });
  }
});

// Market Data API
app.get('/api/market/trends', async (req, res) => {
  try {
    const trends = {
      nba: {
        trend: 'Rising',
        change: 15.2,
        topPlayers: ['Wembanyama', 'Luka', 'LeBron']
      },
      nfl: {
        trend: 'Stable',
        change: 8.7,
        topPlayers: ['Mahomes', 'Richardson', 'Stroud']
      },
      overall: {
        trend: 'Bullish',
        change: 12.4,
        confidence: 87
      }
    };

    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: 'Market data fetch failed' });
  }
});

// Investment Recommendations API
app.get('/api/recommendations', async (req, res) => {
  try {
    const recommendations = [
      {
        id: 1,
        player: 'Victor Wembanyama',
        card: '2023 Panini Prizm Silver PSA 10',
        currentPrice: 2400,
        predictedPrice: 4800,
        roi: 100,
        timeframe: '48 hours',
        risk: 'low',
        confidence: 94
      },
      {
        id: 2,
        player: 'Anthony Richardson',
        card: '2023 Panini Prizm Base PSA 10',
        currentPrice: 850,
        predictedPrice: 1700,
        roi: 100,
        timeframe: '1 week',
        risk: 'medium',
        confidence: 89
      }
    ];

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Recommendations fetch failed' });
  }
});

// Serve the main dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Catch all handler for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Infinity Platform running on port ${PORT}`);
  console.log(`🌐 Dashboard: http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/health`);
});

module.exports = app;
