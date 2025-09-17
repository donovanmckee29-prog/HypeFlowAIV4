# Infinity Pro 2.0

Real-time sports card intelligence platform powered by live APIs, actual market data, and verified comps from eBay, PWCC, COMC, and major auction houses.

## Features

- **AI Grader**: Ultra-fast card analysis with 99.3% accuracy
- **Market Scanner**: Live marketplace intelligence from 12+ sources
- **Portfolio Tracker**: Real-time collection valuation and P&L tracking
- **Oracle AI**: Predictive analytics with sports data integration
- **Card Search**: Advanced search with reverse image recognition

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express
- **APIs**: eBay, PWCC, COMC, SportsRadar, PSA
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hypeflowaiv3.git
cd hypeflowaiv3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Start the backend server (in another terminal):
```bash
npm run server
```

The app will be available at `http://localhost:3000` and the API at `http://localhost:3001`.

### Building for Production

```bash
npm run build
```

This creates a `build` folder with the production-ready app.

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/market-data` - Live market data
- `POST /api/grade-card` - AI card grading
- `GET /api/portfolio/:userId` - Portfolio data

## Live Data Sources

- eBay API
- PWCC Auctions
- COMC Marketplace
- SportsRadar
- PSA Population Reports
- Goldin Auctions
- Heritage Auctions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@infinitypro.com or create an issue on GitHub.
