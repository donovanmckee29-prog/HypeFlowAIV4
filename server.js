const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'online', 
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

app.get('/api/market-data', (req, res) => {
  // Mock market data - in production, this would connect to real APIs
  const marketData = [
    {
      id: 1,
      name: "Victor Wembanyama 2023-24 Panini Prizm RC",
      player: "Victor Wembanyama",
      sport: "Basketball",
      currentPrice: 285,
      change: 45,
      changePercent: 18.8,
      volume24h: 847,
      aiScore: 98,
      confidence: 97,
      momentum: "STRONG BUY"
    },
    {
      id: 2,
      name: "Luka Dončić 2018-19 Panini Prizm Silver RC PSA 10",
      player: "Luka Dončić",
      sport: "Basketball",
      currentPrice: 4250,
      change: 125,
      changePercent: 3.0,
      volume24h: 47,
      aiScore: 89,
      confidence: 92,
      momentum: "BUY"
    }
  ];
  
  res.json(marketData);
});

app.post('/api/grade-card', (req, res) => {
  // Mock AI grading - in production, this would use actual AI/ML models
  const { imageData } = req.body;
  
  const gradeResult = {
    processingTime: "0.247s",
    confidenceScore: 97.8,
    overallGrade: {
      psa: 9,
      bgs: 9.0,
      sgc: 9
    },
    subgrades: {
      corners: 9.0,
      edges: 8.5,
      surface: 9.2,
      centering: 8.5
    },
    marketAnalysis: {
      rawValue: 125,
      gradedValues: {
        psa8: 245,
        psa9: 485,
        psa10: 950
      },
      bestGradingOption: "PSA",
      profitPotential: 360
    }
  };
  
  res.json(gradeResult);
});

app.get('/api/portfolio/:userId', (req, res) => {
  // Mock portfolio data
  const portfolio = {
    totalValue: 89447,
    totalCost: 52150,
    totalGain: 37297,
    totalGainPercent: 71.5,
    cards: []
  };
  
  res.json(portfolio);
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Infinity Pro 2.0 server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/`);
  console.log(`🌐 React app served at http://localhost:${PORT}`);
});
