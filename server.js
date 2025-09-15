const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Mock data generators
const generateMockMarketData = () => [
  {
    id: 1,
    name: "Luka Dončić Prizm Silver PSA 9",
    sport: "🏀",
    change: 12.5,
    price: 1200,
    roi: "Medium",
    ai: "Strong buy signal",
    volume: "High",
    trend: "up",
    category: "basketball",
    aiScore: 87,
    risk: "Medium",
    timeframe: "3-6 months",
    recentSales: [
      { grade: "PSA 10", price: 4200, date: "2024-01-12", source: "PWCC" },
      { grade: "PSA 9", price: 1200, date: "2024-01-15", source: "eBay" }
    ],
    priceTarget: 1350,
    support: 1000,
    resistance: 1400,
    volatility: "Medium",
    marketCap: 2400000
  }
];

// API Routes
app.get('/api/grader/schema', (req, res) => {
  res.json({
    companies: ['PSA', 'BGS', 'SGC', 'TAG'],
    subgrades: ['centering', 'corners', 'edges', 'surface']
  });
});

app.post('/api/grader/predict', upload.single('image'), (req, res) => {
  const subgrades = {
    centering: Math.random() * 0.4 + 0.6,
    corners: Math.random() * 0.4 + 0.6,
    edges: Math.random() * 0.4 + 0.6,
    surface: Math.random() * 0.4 + 0.6
  };
  
  const avgGrade = Object.values(subgrades).reduce((a, b) => a + b, 0) / 4;
  let predictedGrade = avgGrade >= 0.95 ? "10" : avgGrade >= 0.9 ? "9" : "8";
  
  res.json({
    predicted_grade: `PSA ${predictedGrade}`,
    confidence: Math.round(avgGrade * 100),
    subgrades: subgrades,
    all_predictions: [
      { company: 'PSA', grade: `PSA ${predictedGrade}`, confidence: avgGrade, fee: 50, timeline: '2-4 weeks' }
    ]
  });
});

app.get('/api/market/top-picks', (req, res) => {
  res.json(generateMockMarketData());
});

app.get('/api/portfolio/value', (req, res) => {
  res.json({
    totalValue: 47250,
    totalCost: 35200,
    roi: 34.2,
    monthlyChange: 8.5
  });
});

app.get('/api/portfolio/items', (req, res) => {
  res.json([
    {
      id: 1,
      name: "Luka Prizm Silver",
      sport: "🏀",
      quantity: 2,
      cost: 2000,
      currentValue: 1200,
      change: 20,
      grade: "PSA 9",
      trend: "up"
    }
  ]);
});

app.post('/api/oracle/query', (req, res) => {
  res.json({
    statement: "AI analysis based on your question",
    confidence: 0.85,
    timeframe: "3-6 months",
    rationale: "Based on current market data",
    evidence: [],
    actions: []
  });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});