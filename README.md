# HypeFlow AI Pro - The Ultimate Sports Card Investment Platform

A comprehensive React-based platform for AI-powered sports card analysis, market scanning, and investment guidance.

## Features

- **AI Grader**: Upload card images for instant grade predictions with subgrade analysis
- **Market Scanner**: Real-time market data with AI-powered investment recommendations
- **AI Oracle**: Conversational AI for card analysis and investment advice
- **Portfolio Center**: Track holdings with live ROI calculations and performance analytics
- **Investment Compass**: Weekly top picks and investment strategies
- **Collector Arena**: Gamified trading and competitive features
- **Futurecasting Engine**: AI predictions for emerging collectibles and trends

## Tech Stack

- **Frontend**: React 18, React Router v6, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Testing**: Cypress (E2E), Jest + React Testing Library (Unit)
- **API**: RESTful APIs with mock data for development

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd HypeFlowAIV3-1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Start the API server (in a separate terminal):
```bash
npm run server
```

The application will be available at `http://localhost:3000` and the API at `http://localhost:3001`.

## How to Run Tests

### Unit Tests (Jest + React Testing Library)

Run all unit tests:
```bash
npm run test:unit
```

Run tests in watch mode:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

### E2E Tests (Cypress)

Run E2E tests headlessly:
```bash
npm run test:e2e
```

Open Cypress Test Runner:
```bash
npm run cypress:open
```

### Run All Tests

Run both unit and E2E tests:
```bash
npm run test:all
```

## Test Coverage

The project maintains comprehensive test coverage:

- **Unit Tests**: Component rendering, API integration, business logic
- **E2E Tests**: Full user workflows, navigation, feature functionality
- **API Tests**: Mock endpoints and data validation

### Coverage Thresholds

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── NavBar.jsx      # Main navigation component
│   └── __tests__/      # Component unit tests
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── GraderPage.jsx
│   ├── MarketPage.jsx
│   ├── OraclePage.jsx
│   ├── PortfolioPage.jsx
│   ├── CompassPage.jsx
│   ├── ArenaPage.jsx
│   ├── FuturecastPage.jsx
│   └── __tests__/      # Page unit tests
├── services/           # API service layer
│   └── api.js
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
├── App.js              # Main app component
├── App.css             # Global styles
└── index.js            # App entry point

cypress/
├── e2e/                # E2E test specs
│   ├── navigation_spec.cy.js
│   └── functionality_spec.cy.js
├── fixtures/           # Test data and files
└── support/            # Cypress support files

server.js               # Express API server
```

## API Endpoints

### Grader API
- `GET /api/grader/schema` - Get grading schema
- `POST /api/grader/predict` - Analyze card image

### Market API
- `GET /api/market/top-picks` - Get top investment picks
- `GET /api/market/listings` - Get filtered market listings
- `GET /api/market/data/:cardId` - Get specific card data

### Oracle API
- `POST /api/oracle/query` - Submit question to AI Oracle
- `GET /api/oracle/history` - Get conversation history

### Portfolio API
- `GET /api/portfolio/value` - Get portfolio value metrics
- `GET /api/portfolio/items` - Get portfolio holdings
- `POST /api/portfolio/items` - Add new holding
- `PUT /api/portfolio/items/:id` - Update holding
- `DELETE /api/portfolio/items/:id` - Remove holding

### Compass API
- `GET /api/compass/weekly` - Get weekly top picks
- `GET /api/compass/playbooks` - Get investment strategies

### Arena API
- `GET /api/arena/leaderboard` - Get user rankings
- `GET /api/arena/challenges` - Get available challenges
- `POST /api/arena/actions` - Submit user action

### Futurecast API
- `GET /api/futurecast/predictions` - Get AI predictions
- `GET /api/futurecast/trends` - Get market trends

## Development

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- Jest for unit testing
- Cypress for E2E testing

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deployment

The app is configured for deployment on platforms like Vercel, Netlify, or any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.