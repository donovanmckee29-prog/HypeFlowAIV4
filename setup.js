#!/usr/bin/env node

/**
 * Infinity Platform Setup Script
 * Sets up the development environment
 */

const fs = require('fs');
const path = require('path');

console.log('🌌 Setting up Infinity Platform...\n');

// Create .env file if it doesn't exist
if (!fs.existsSync('.env')) {
    const envContent = `# Infinity Platform Environment Variables
MONGODB_URI=mongodb://localhost:27017/infinity-cards
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
NODE_ENV=development

# AI Configuration
AI_LEARNING_RATE=0.01
AI_CONFIDENCE_THRESHOLD=0.8
AI_MEMORY_LIMIT=10000

# Email Configuration (for production)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# 2FA Configuration
TOTP_ISSUER=Infinity Sports Cards
TOTP_ALGORITHM=SHA1
TOTP_DIGITS=6
TOTP_PERIOD=30

# Market Data APIs (add your keys)
EBAY_API_KEY=your-ebay-api-key
STOCKX_API_KEY=your-stockx-api-key
PWCC_API_KEY=your-pwcc-api-key
TCGPLAYER_API_KEY=your-tcgplayer-api-key

# Redis Configuration (for production)
REDIS_URL=redis://localhost:6379

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp

# Security Configuration
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret-key
CORS_ORIGIN=http://localhost:3000
`;

    fs.writeFileSync('.env', envContent);
    console.log('✅ Created .env file with default configuration');
} else {
    console.log('ℹ️  .env file already exists');
}

// Create logs directory
if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
    console.log('✅ Created logs directory');
}

// Create uploads directory
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
    console.log('✅ Created uploads directory');
}

// Create data directory for local storage
if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
    console.log('✅ Created data directory');
}

// Create .gitignore if it doesn't exist
if (!fs.existsSync('.gitignore')) {
    const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# next.js build output
.next

# Nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Uploads
uploads/
data/

# AI Learning Data
ai-learning-data.json
infinity-ai-data.json

# Deployment
deployment-summary.json
`;

    fs.writeFileSync('.gitignore', gitignoreContent);
    console.log('✅ Created .gitignore file');
}

// Create package-lock.json if it doesn't exist
if (!fs.existsSync('package-lock.json')) {
    console.log('📦 Installing dependencies...');
    try {
        require('child_process').execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed');
    } catch (error) {
        console.log('⚠️  Failed to install dependencies. Please run "npm install" manually.');
    }
}

// Create initial AI learning data
const initialAIData = {
    models: {
        grading: {
            accuracy: 0.95,
            confidence: 0.9,
            learningData: []
        },
        market: {
            accuracy: 0.87,
            confidence: 0.85,
            learningData: []
        },
        portfolio: {
            accuracy: 0.82,
            confidence: 0.88,
            learningData: []
        },
        oracle: {
            accuracy: 0.91,
            confidence: 0.89,
            learningData: []
        }
    },
    userProfiles: {},
    interactions: [],
    timestamp: Date.now()
};

if (!fs.existsSync('ai-learning-data.json')) {
    fs.writeFileSync('ai-learning-data.json', JSON.stringify(initialAIData, null, 2));
    console.log('✅ Created initial AI learning data');
}

// Create sample data directory
if (!fs.existsSync('sample-data')) {
    fs.mkdirSync('sample-data');
    
    // Create sample portfolio data
    const samplePortfolio = [
        {
            id: 1,
            name: 'Luka Dončić Prizm Silver PSA 10',
            player: 'Luka Dončić',
            sport: 'NBA',
            purchasePrice: 2400,
            currentValue: 3600,
            quantity: 1,
            grade: 'PSA 10',
            condition: 'mint',
            purchaseDate: '2024-01-15',
            roi: 50,
            change: 1200
        },
        {
            id: 2,
            name: 'Victor Wembanyama Rookie PSA 10',
            player: 'Victor Wembanyama',
            sport: 'NBA',
            purchasePrice: 5000,
            currentValue: 7500,
            quantity: 1,
            grade: 'PSA 10',
            condition: 'mint',
            purchaseDate: '2024-01-10',
            roi: 50,
            change: 2500
        }
    ];
    
    fs.writeFileSync('sample-data/portfolio.json', JSON.stringify(samplePortfolio, null, 2));
    console.log('✅ Created sample data directory');
}

console.log('\n🎉 Infinity Platform Setup Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Update .env file with your configuration');
console.log('2. Start MongoDB: mongod');
console.log('3. Run the development server: npm run dev');
console.log('4. Open http://localhost:3000 in your browser');
console.log('5. Create your first account and start exploring!');

console.log('\n🔧 Configuration:');
console.log('- Edit .env file for environment variables');
console.log('- MongoDB should be running on localhost:27017');
console.log('- Default port is 3000 (change in .env if needed)');

console.log('\n📚 Documentation:');
console.log('- README.md for detailed setup instructions');
console.log('- API endpoints documented in server.js');
console.log('- Frontend components in HTML files');

console.log('\n🚀 Welcome to Infinity - The Singularity of Sports Card Intelligence!');
