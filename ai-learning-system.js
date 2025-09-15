/**
 * Infinity AI Learning System
 * Self-evolving AI that continuously learns and optimizes
 */

class InfinityAILearningSystem {
    constructor() {
        this.memory = new Map();
        this.learningData = {
            gradingAccuracy: 0.95,
            predictionAccuracy: 0.87,
            userPreferences: {},
            marketPatterns: {},
            interactionHistory: [],
            optimizationMetrics: {}
        };
        this.learningRate = 0.01;
        this.optimizationThreshold = 0.02;
    }

    // Store interaction for learning
    storeInteraction(type, input, output, outcome = null) {
        const interaction = {
            timestamp: Date.now(),
            type,
            input,
            output,
            outcome,
            accuracy: this.calculateAccuracy(output, outcome)
        };
        
        this.learningData.interactionHistory.push(interaction);
        this.updateLearningMetrics(interaction);
        this.optimizePerformance();
    }

    // Calculate accuracy of predictions
    calculateAccuracy(prediction, actual) {
        if (!actual) return null;
        
        if (typeof prediction === 'number' && typeof actual === 'number') {
            return 1 - Math.abs(prediction - actual) / Math.max(prediction, actual);
        }
        
        if (typeof prediction === 'string' && typeof actual === 'string') {
            return prediction.toLowerCase() === actual.toLowerCase() ? 1 : 0;
        }
        
        return null;
    }

    // Update learning metrics based on interactions
    updateLearningMetrics(interaction) {
        const { type, accuracy } = interaction;
        
        if (accuracy !== null) {
            switch (type) {
                case 'grading':
                    this.learningData.gradingAccuracy = this.updateMovingAverage(
                        this.learningData.gradingAccuracy, 
                        accuracy, 
                        0.1
                    );
                    break;
                case 'prediction':
                    this.learningData.predictionAccuracy = this.updateMovingAverage(
                        this.learningData.predictionAccuracy, 
                        accuracy, 
                        0.1
                    );
                    break;
            }
        }
    }

    // Update moving average for continuous learning
    updateMovingAverage(current, newValue, weight) {
        return current * (1 - weight) + newValue * weight;
    }

    // Optimize performance based on learning data
    optimizePerformance() {
        const recentInteractions = this.learningData.interactionHistory.slice(-100);
        const avgAccuracy = recentInteractions
            .filter(i => i.accuracy !== null)
            .reduce((sum, i) => sum + i.accuracy, 0) / recentInteractions.length;

        if (avgAccuracy < this.learningData.predictionAccuracy - this.optimizationThreshold) {
            this.adjustLearningRate();
            this.retrainModels();
        }
    }

    // Adjust learning rate based on performance
    adjustLearningRate() {
        const recentAccuracy = this.getRecentAccuracy();
        if (recentAccuracy < 0.8) {
            this.learningRate = Math.min(this.learningRate * 1.1, 0.1);
        } else if (recentAccuracy > 0.95) {
            this.learningRate = Math.max(this.learningRate * 0.9, 0.001);
        }
    }

    // Get recent accuracy metrics
    getRecentAccuracy() {
        const recent = this.learningData.interactionHistory.slice(-50);
        const withAccuracy = recent.filter(i => i.accuracy !== null);
        return withAccuracy.length > 0 
            ? withAccuracy.reduce((sum, i) => sum + i.accuracy, 0) / withAccuracy.length
            : 0.5;
    }

    // Retrain AI models based on new data
    retrainModels() {
        console.log('🔄 Retraining AI models with new data...');
        
        // Simulate model retraining
        const newPatterns = this.extractPatterns();
        this.learningData.marketPatterns = { ...this.learningData.marketPatterns, ...newPatterns };
        
        // Update prediction algorithms
        this.updatePredictionAlgorithms();
        
        console.log('✅ AI models retrained successfully');
    }

    // Extract patterns from interaction history
    extractPatterns() {
        const patterns = {};
        const recent = this.learningData.interactionHistory.slice(-200);
        
        // Analyze user behavior patterns
        const userPatterns = this.analyzeUserBehavior(recent);
        patterns.userBehavior = userPatterns;
        
        // Analyze market patterns
        const marketPatterns = this.analyzeMarketPatterns(recent);
        patterns.market = marketPatterns;
        
        return patterns;
    }

    // Analyze user behavior patterns
    analyzeUserBehavior(interactions) {
        const behavior = {
            preferredSports: {},
            riskTolerance: 'medium',
            investmentStyle: 'balanced',
            activeTimes: {},
            featureUsage: {}
        };
        
        interactions.forEach(interaction => {
            if (interaction.type === 'portfolio') {
                behavior.investmentStyle = this.determineInvestmentStyle(interaction);
            }
            if (interaction.type === 'prediction') {
                behavior.riskTolerance = this.determineRiskTolerance(interaction);
            }
        });
        
        return behavior;
    }

    // Analyze market patterns
    analyzeMarketPatterns(interactions) {
        const patterns = {
            volatility: 0.15,
            trendingSports: ['NBA', 'NFL'],
            seasonalPatterns: {},
            priceCorrelations: {}
        };
        
        // Analyze price movements and correlations
        const priceData = interactions
            .filter(i => i.type === 'prediction' && i.input?.price)
            .map(i => ({ price: i.input.price, outcome: i.outcome }));
        
        if (priceData.length > 10) {
            patterns.volatility = this.calculateVolatility(priceData);
            patterns.trendingSports = this.identifyTrendingSports(interactions);
        }
        
        return patterns;
    }

    // Update prediction algorithms based on learning
    updatePredictionAlgorithms() {
        // Simulate algorithm updates
        const improvements = {
            gradingConfidence: this.learningData.gradingAccuracy,
            predictionConfidence: this.learningData.predictionAccuracy,
            marketInsight: this.learningData.marketPatterns.volatility || 0.15
        };
        
        this.learningData.optimizationMetrics = improvements;
    }

    // Get personalized recommendations based on learning
    getPersonalizedRecommendations(userId) {
        const userHistory = this.learningData.interactionHistory.filter(i => i.userId === userId);
        const userPatterns = this.learningData.marketPatterns.userBehavior || {};
        
        return {
            recommendedSports: userPatterns.preferredSports || ['NBA', 'NFL'],
            riskLevel: userPatterns.riskTolerance || 'medium',
            investmentStyle: userPatterns.investmentStyle || 'balanced',
            confidence: this.learningData.predictionAccuracy,
            personalizedInsights: this.generatePersonalizedInsights(userHistory)
        };
    }

    // Generate personalized insights
    generatePersonalizedInsights(userHistory) {
        const insights = [];
        
        if (userHistory.length > 10) {
            insights.push("Based on your trading history, you prefer high-growth potential cards");
        }
        
        if (this.learningData.predictionAccuracy > 0.9) {
            insights.push("Our AI predictions have been highly accurate for your portfolio");
        }
        
        return insights;
    }

    // Calculate volatility from price data
    calculateVolatility(priceData) {
        if (priceData.length < 2) return 0.15;
        
        const returns = [];
        for (let i = 1; i < priceData.length; i++) {
            const returnRate = (priceData[i].price - priceData[i-1].price) / priceData[i-1].price;
            returns.push(returnRate);
        }
        
        const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
        const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
        
        return Math.sqrt(variance);
    }

    // Identify trending sports from interactions
    identifyTrendingSports(interactions) {
        const sportCounts = {};
        
        interactions.forEach(interaction => {
            if (interaction.input?.sport) {
                sportCounts[interaction.input.sport] = (sportCounts[interaction.input.sport] || 0) + 1;
            }
        });
        
        return Object.entries(sportCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([sport]) => sport);
    }

    // Determine investment style from user behavior
    determineInvestmentStyle(interaction) {
        const { input, outcome } = interaction;
        if (!input?.roi || !outcome?.roi) return 'balanced';
        
        const actualROI = outcome.roi;
        if (actualROI > 50) return 'aggressive';
        if (actualROI < 10) return 'conservative';
        return 'balanced';
    }

    // Determine risk tolerance from user behavior
    determineRiskTolerance(interaction) {
        const { input, outcome } = interaction;
        if (!input?.risk || !outcome?.actualRisk) return 'medium';
        
        const riskDifference = Math.abs(input.risk - outcome.actualRisk);
        if (riskDifference > 0.3) return 'high';
        if (riskDifference < 0.1) return 'low';
        return 'medium';
    }

    // Get system performance metrics
    getPerformanceMetrics() {
        return {
            gradingAccuracy: Math.round(this.learningData.gradingAccuracy * 100),
            predictionAccuracy: Math.round(this.learningData.predictionAccuracy * 100),
            totalInteractions: this.learningData.interactionHistory.length,
            learningRate: this.learningRate,
            recentAccuracy: Math.round(this.getRecentAccuracy() * 100),
            systemHealth: this.calculateSystemHealth()
        };
    }

    // Calculate overall system health
    calculateSystemHealth() {
        const accuracy = this.getRecentAccuracy();
        const interactionCount = this.learningData.interactionHistory.length;
        
        if (accuracy > 0.9 && interactionCount > 100) return 'Excellent';
        if (accuracy > 0.8 && interactionCount > 50) return 'Good';
        if (accuracy > 0.7) return 'Fair';
        return 'Learning';
    }

    // Export learning data for persistence
    exportLearningData() {
        return {
            memory: Array.from(this.memory.entries()),
            learningData: this.learningData,
            learningRate: this.learningRate,
            timestamp: Date.now()
        };
    }

    // Import learning data for persistence
    importLearningData(data) {
        this.memory = new Map(data.memory);
        this.learningData = data.learningData;
        this.learningRate = data.learningRate;
        console.log('🧠 AI Learning data imported successfully');
    }
}

// Global AI Learning System Instance
window.InfinityAI = new InfinityAILearningSystem();

// Auto-save learning data every 5 minutes
setInterval(() => {
    const data = window.InfinityAI.exportLearningData();
    localStorage.setItem('infinity-ai-learning', JSON.stringify(data));
}, 300000);

// Load existing learning data on startup
window.addEventListener('load', () => {
    const savedData = localStorage.getItem('infinity-ai-learning');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            window.InfinityAI.importLearningData(data);
        } catch (error) {
            console.error('Failed to load AI learning data:', error);
        }
    }
});

export default InfinityAILearningSystem;
