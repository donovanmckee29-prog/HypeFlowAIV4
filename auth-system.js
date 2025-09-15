/**
 * Infinity Authentication & User Management System
 * Secure login, user profiles, and persistent memory
 */

class InfinityAuthSystem {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.userData = {
            profile: null,
            portfolio: [],
            gradingHistory: [],
            oracleChats: [],
            achievements: [],
            watchlist: [],
            preferences: {},
            subscription: 'free',
            stats: {
                totalValue: 0,
                totalROI: 0,
                gradingAccuracy: 0,
                predictionAccuracy: 0,
                rank: 0,
                badges: []
            }
        };
        this.encryptionKey = 'infinity-encryption-key-2024';
    }

    // User Registration
    async registerUser(email, password, username) {
        try {
            // Validate input
            if (!this.validateEmail(email)) {
                throw new Error('Invalid email format');
            }
            if (password.length < 8) {
                throw new Error('Password must be at least 8 characters');
            }
            if (username.length < 3) {
                throw new Error('Username must be at least 3 characters');
            }

            // Check if user exists
            const existingUser = this.getUserByEmail(email);
            if (existingUser) {
                throw new Error('User already exists');
            }

            // Create new user
            const userId = this.generateUserId();
            const hashedPassword = await this.hashPassword(password);
            
            const newUser = {
                id: userId,
                email,
                password: hashedPassword,
                username,
                createdAt: Date.now(),
                lastLogin: Date.now(),
                profile: {
                    avatar: this.generateAvatar(username),
                    bio: '',
                    location: '',
                    favoriteSports: [],
                    riskTolerance: 'medium',
                    investmentStyle: 'balanced'
                },
                portfolio: [],
                gradingHistory: [],
                oracleChats: [],
                achievements: [],
                watchlist: [],
                preferences: {
                    theme: 'dark',
                    notifications: true,
                    emailAlerts: true,
                    pushNotifications: true,
                    language: 'en'
                },
                subscription: 'free',
                stats: {
                    totalValue: 0,
                    totalROI: 0,
                    gradingAccuracy: 0,
                    predictionAccuracy: 0,
                    rank: 0,
                    badges: []
                },
                twoFactorEnabled: false,
                twoFactorSecret: null
            };

            // Save user to localStorage
            this.saveUser(newUser);
            
            // Set current user
            this.currentUser = newUser;
            this.isAuthenticated = true;
            this.userData = newUser;

            // Initialize AI learning for user
            if (window.InfinityAI) {
                window.InfinityAI.initializeUserProfile(userId, newUser);
            }

            return {
                success: true,
                user: newUser,
                message: 'Registration successful'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // User Login
    async loginUser(email, password) {
        try {
            const user = this.getUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }

            const isValidPassword = await this.verifyPassword(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }

            // Update last login
            user.lastLogin = Date.now();
            this.saveUser(user);

            // Set current user
            this.currentUser = user;
            this.isAuthenticated = true;
            this.userData = user;

            // Load user data into AI system
            if (window.InfinityAI) {
                window.InfinityAI.loadUserProfile(user.id, user);
            }

            return {
                success: true,
                user: user,
                message: 'Login successful'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // User Logout
    logoutUser() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.userData = {
            profile: null,
            portfolio: [],
            gradingHistory: [],
            oracleChats: [],
            achievements: [],
            watchlist: [],
            preferences: {},
            subscription: 'free',
            stats: {
                totalValue: 0,
                totalROI: 0,
                gradingAccuracy: 0,
                predictionAccuracy: 0,
                rank: 0,
                badges: []
            }
        };

        // Clear AI user data
        if (window.InfinityAI) {
            window.InfinityAI.clearUserProfile();
        }

        return { success: true, message: 'Logout successful' };
    }

    // Update User Profile
    updateUserProfile(updates) {
        if (!this.isAuthenticated) {
            return { success: false, error: 'Not authenticated' };
        }

        try {
            Object.assign(this.currentUser, updates);
            this.saveUser(this.currentUser);
            this.userData = this.currentUser;

            return { success: true, user: this.currentUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Add Portfolio Item
    addPortfolioItem(item) {
        if (!this.isAuthenticated) {
            return { success: false, error: 'Not authenticated' };
        }

        try {
            const portfolioItem = {
                id: this.generateId(),
                ...item,
                addedAt: Date.now(),
                currentValue: item.purchasePrice
            };

            this.currentUser.portfolio.push(portfolioItem);
            this.updatePortfolioStats();
            this.saveUser(this.currentUser);

            // Store interaction for AI learning
            if (window.InfinityAI) {
                window.InfinityAI.storeInteraction('portfolio_add', {
                    item: portfolioItem,
                    userId: this.currentUser.id
                }, {
                    success: true,
                    timestamp: Date.now()
                });
            }

            return { success: true, item: portfolioItem };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Add Grading History
    addGradingHistory(result) {
        if (!this.isAuthenticated) {
            return { success: false, error: 'Not authenticated' };
        }

        try {
            const gradingResult = {
                id: this.generateId(),
                ...result,
                timestamp: Date.now(),
                userId: this.currentUser.id
            };

            this.currentUser.gradingHistory.push(gradingResult);
            this.saveUser(this.currentUser);

            // Store interaction for AI learning
            if (window.InfinityAI) {
                window.InfinityAI.storeInteraction('grading_complete', {
                    result: gradingResult,
                    userId: this.currentUser.id
                }, {
                    success: true,
                    timestamp: Date.now()
                });
            }

            return { success: true, result: gradingResult };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Add Oracle Chat
    addOracleChat(chat) {
        if (!this.isAuthenticated) {
            return { success: false, error: 'Not authenticated' };
        }

        try {
            const chatEntry = {
                id: this.generateId(),
                ...chat,
                timestamp: Date.now(),
                userId: this.currentUser.id
            };

            this.currentUser.oracleChats.push(chatEntry);
            this.saveUser(this.currentUser);

            // Store interaction for AI learning
            if (window.InfinityAI) {
                window.InfinityAI.storeInteraction('oracle_chat', {
                    chat: chatEntry,
                    userId: this.currentUser.id
                }, {
                    success: true,
                    timestamp: Date.now()
                });
            }

            return { success: true, chat: chatEntry };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Add Achievement
    addAchievement(achievement) {
        if (!this.isAuthenticated) {
            return { success: false, error: 'Not authenticated' };
        }

        try {
            const achievementEntry = {
                id: this.generateId(),
                ...achievement,
                earnedAt: Date.now(),
                userId: this.currentUser.id
            };

            this.currentUser.achievements.push(achievementEntry);
            this.currentUser.stats.badges.push(achievement.badge);
            this.saveUser(this.currentUser);

            return { success: true, achievement: achievementEntry };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Update Portfolio Stats
    updatePortfolioStats() {
        if (!this.currentUser) return;

        const portfolio = this.currentUser.portfolio;
        const totalValue = portfolio.reduce((sum, item) => sum + (item.currentValue || item.purchasePrice), 0);
        const totalCost = portfolio.reduce((sum, item) => sum + item.purchasePrice, 0);
        const totalROI = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;

        this.currentUser.stats.totalValue = totalValue;
        this.currentUser.stats.totalROI = totalROI;
    }

    // Get User Data
    getUserData() {
        return this.isAuthenticated ? this.userData : null;
    }

    // Get Personalized Recommendations
    getPersonalizedRecommendations() {
        if (!this.isAuthenticated) {
            return { success: false, error: 'Not authenticated' };
        }

        try {
            const user = this.currentUser;
            const recommendations = {
                portfolio: this.generatePortfolioRecommendations(user),
                grading: this.generateGradingRecommendations(user),
                oracle: this.generateOracleRecommendations(user),
                market: this.generateMarketRecommendations(user)
            };

            return { success: true, recommendations };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Generate Portfolio Recommendations
    generatePortfolioRecommendations(user) {
        const recommendations = [];
        const portfolio = user.portfolio;

        if (portfolio.length === 0) {
            recommendations.push({
                type: 'portfolio',
                title: 'Start Your Portfolio',
                description: 'Add your first card to begin tracking your collection',
                action: 'add_card',
                priority: 'high'
            });
        } else if (portfolio.length < 5) {
            recommendations.push({
                type: 'portfolio',
                title: 'Diversify Your Portfolio',
                description: 'Consider adding cards from different sports or players',
                action: 'diversify',
                priority: 'medium'
            });
        }

        return recommendations;
    }

    // Generate Grading Recommendations
    generateGradingRecommendations(user) {
        const recommendations = [];
        const gradingHistory = user.gradingHistory;

        if (gradingHistory.length === 0) {
            recommendations.push({
                type: 'grading',
                title: 'Try AI Grader',
                description: 'Upload a card image to get instant grading predictions',
                action: 'grade_card',
                priority: 'high'
            });
        }

        return recommendations;
    }

    // Generate Oracle Recommendations
    generateOracleRecommendations(user) {
        const recommendations = [];
        const oracleChats = user.oracleChats;

        if (oracleChats.length === 0) {
            recommendations.push({
                type: 'oracle',
                title: 'Ask AI Oracle',
                description: 'Get personalized investment advice and market insights',
                action: 'ask_oracle',
                priority: 'high'
            });
        }

        return recommendations;
    }

    // Generate Market Recommendations
    generateMarketRecommendations(user) {
        const recommendations = [];
        const watchlist = user.watchlist;

        if (watchlist.length === 0) {
            recommendations.push({
                type: 'market',
                title: 'Build Your Watchlist',
                description: 'Add players and cards to track for investment opportunities',
                action: 'add_watchlist',
                priority: 'medium'
            });
        }

        return recommendations;
    }

    // Utility Functions
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    async hashPassword(password) {
        // Simple hash for demo - in production, use bcrypt
        return btoa(password + this.encryptionKey);
    }

    async verifyPassword(password, hashedPassword) {
        const hashed = await this.hashPassword(password);
        return hashed === hashedPassword;
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateId() {
        return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateAvatar(username) {
        const colors = ['#00d4ff', '#00ff88', '#ff6b6b', '#ffaa00', '#9c88ff'];
        const color = colors[username.length % colors.length];
        return `https://ui-avatars.com/api/?name=${username}&background=${color.replace('#', '')}&color=fff&size=100`;
    }

    getUserByEmail(email) {
        const users = this.getAllUsers();
        return users.find(user => user.email === email);
    }

    getAllUsers() {
        const users = localStorage.getItem('infinity-users');
        return users ? JSON.parse(users) : [];
    }

    saveUser(user) {
        const users = this.getAllUsers();
        const existingIndex = users.findIndex(u => u.id === user.id);
        
        if (existingIndex >= 0) {
            users[existingIndex] = user;
        } else {
            users.push(user);
        }
        
        localStorage.setItem('infinity-users', JSON.stringify(users));
    }

    // Check if user is authenticated
    isUserAuthenticated() {
        return this.isAuthenticated && this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Initialize from stored data
    initialize() {
        const storedUser = localStorage.getItem('infinity-current-user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                this.currentUser = user;
                this.isAuthenticated = true;
                this.userData = user;
                
                // Load user data into AI system
                if (window.InfinityAI) {
                    window.InfinityAI.loadUserProfile(user.id, user);
                }
            } catch (error) {
                console.error('Failed to load stored user:', error);
            }
        }
    }

    // Save current user to storage
    saveCurrentUser() {
        if (this.currentUser) {
            localStorage.setItem('infinity-current-user', JSON.stringify(this.currentUser));
        }
    }
}

// Global Auth System Instance
window.InfinityAuth = new InfinityAuthSystem();

// Initialize on page load
window.addEventListener('load', () => {
    window.InfinityAuth.initialize();
});

// Auto-save user data every 30 seconds
setInterval(() => {
    if (window.InfinityAuth.isUserAuthenticated()) {
        window.InfinityAuth.saveCurrentUser();
    }
}, 30000);

export default InfinityAuthSystem;
