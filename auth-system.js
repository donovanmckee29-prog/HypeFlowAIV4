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
            const twoFactorSecret = this.generate2FASecret();
            
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
                    investmentStyle: 'balanced',
                    experience: 'beginner',
                    goals: []
                },
                portfolio: [],
                gradingHistory: [],
                oracleChats: [],
                achievements: [],
                watchlist: [],
                investmentHistory: [],
                badges: [],
                preferences: {
                    theme: 'dark',
                    notifications: true,
                    emailAlerts: true,
                    pushNotifications: true,
                    language: 'en',
                    currency: 'USD',
                    timezone: 'UTC'
                },
                subscription: 'free',
                subscriptionExpiry: null,
                stats: {
                    totalValue: 0,
                    totalROI: 0,
                    gradingAccuracy: 0,
                    predictionAccuracy: 0,
                    rank: 0,
                    badges: [],
                    level: 1,
                    xp: 0,
                    streak: 0,
                    totalTrades: 0,
                    successfulPredictions: 0,
                    totalPredictions: 0
                },
                twoFactorEnabled: false,
                twoFactorSecret: twoFactorSecret,
                securityQuestions: [],
                loginAttempts: 0,
                lastFailedLogin: null,
                accountLocked: false,
                emailVerified: false,
                verificationToken: this.generateVerificationToken()
            };

            // Save user to localStorage
            this.saveUser(newUser);
            
            // Set current user
            this.currentUser = newUser;
            this.isAuthenticated = true;
            this.userData = newUser;

            // Initialize AI learning for user
            if (window.InfinityAI) {
                try {
                    window.InfinityAI.initializeUserProfile(userId, newUser);
                } catch (error) {
                    console.warn('Failed to initialize AI profile:', error);
                }
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
                try {
                    window.InfinityAI.loadUserProfile(user.id, user);
                } catch (error) {
                    console.warn('Failed to load AI profile:', error);
                }
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
            try {
                window.InfinityAI.clearUserProfile();
            } catch (error) {
                console.warn('Failed to clear AI profile:', error);
            }
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
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(password + this.encryptionKey);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (error) {
            // Fallback to base64 if crypto.subtle is not available
            return btoa(password + this.encryptionKey);
        }
    }

    async verifyPassword(password, hashedPassword) {
        try {
            const hashed = await this.hashPassword(password);
            return hashed === hashedPassword;
        } catch (error) {
            console.error('Password verification error:', error);
            return false;
        }
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

    // 2FA Methods
    generate2FASecret() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        let secret = '';
        for (let i = 0; i < 32; i++) {
            secret += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return secret;
    }

    generate2FAQRCode(secret, email) {
        const issuer = 'Infinity Sports Cards';
        const account = email;
        const otpauth = `otpauth://totp/${issuer}:${account}?secret=${secret}&issuer=${issuer}`;
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauth)}`;
    }

    generateTOTPCode(secret) {
        const epoch = Math.round(new Date().getTime() / 1000.0);
        const time = Math.floor(epoch / 30);
        const key = this.base32Decode(secret);
        const message = this.intToBytes(time);
        const hmac = this.hmacSHA1(key, message);
        const offset = hmac[hmac.length - 1] & 0xf;
        const code = ((hmac[offset] & 0x7f) << 24) |
                    ((hmac[offset + 1] & 0xff) << 16) |
                    ((hmac[offset + 2] & 0xff) << 8) |
                    (hmac[offset + 3] & 0xff);
        return (code % 1000000).toString().padStart(6, '0');
    }

    verify2FACode(secret, code) {
        const expectedCode = this.generateTOTPCode(secret);
        return code === expectedCode;
    }

    enable2FA(userId, code) {
        const user = this.getUserById(userId);
        if (!user) return { success: false, error: 'User not found' };

        if (this.verify2FACode(user.twoFactorSecret, code)) {
            user.twoFactorEnabled = true;
            this.saveUser(user);
            return { success: true, message: '2FA enabled successfully' };
        } else {
            return { success: false, error: 'Invalid 2FA code' };
        }
    }

    disable2FA(userId, code) {
        const user = this.getUserById(userId);
        if (!user) return { success: false, error: 'User not found' };

        if (this.verify2FACode(user.twoFactorSecret, code)) {
            user.twoFactorEnabled = false;
            this.saveUser(user);
            return { success: true, message: '2FA disabled successfully' };
        } else {
            return { success: false, error: 'Invalid 2FA code' };
        }
    }

    // Enhanced Security Methods
    generateVerificationToken() {
        return 'verify_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    verifyEmail(token) {
        const users = this.getAllUsers();
        const user = users.find(u => u.verificationToken === token);
        if (user) {
            user.emailVerified = true;
            user.verificationToken = null;
            this.saveUser(user);
            return { success: true, message: 'Email verified successfully' };
        }
        return { success: false, error: 'Invalid verification token' };
    }

    resetPassword(email) {
        const user = this.getUserByEmail(email);
        if (!user) return { success: false, error: 'User not found' };

        const resetToken = this.generateVerificationToken();
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
        this.saveUser(user);

        // In production, send email with reset link
        return { success: true, message: 'Password reset email sent', resetToken };
    }

    async updatePassword(resetToken, newPassword) {
        try {
            const users = this.getAllUsers();
            const user = users.find(u => u.resetToken === resetToken && u.resetTokenExpiry > Date.now());
            if (!user) return { success: false, error: 'Invalid or expired reset token' };

            user.password = await this.hashPassword(newPassword);
            user.resetToken = null;
            user.resetTokenExpiry = null;
            this.saveUser(user);

            return { success: true, message: 'Password updated successfully' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Utility Methods for 2FA
    base32Decode(str) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        const bits = [];
        for (let i = 0; i < str.length; i++) {
            const val = alphabet.indexOf(str[i].toUpperCase());
            if (val === -1) continue;
            for (let j = 4; j >= 0; j--) {
                bits.push((val >> j) & 1);
            }
        }
        const bytes = [];
        for (let i = 0; i < bits.length; i += 8) {
            let byte = 0;
            for (let j = 0; j < 8; j++) {
                if (bits[i + j]) byte |= 1 << (7 - j);
            }
            bytes.push(byte);
        }
        return new Uint8Array(bytes);
    }

    intToBytes(num) {
        const bytes = new Uint8Array(8);
        for (let i = 7; i >= 0; i--) {
            bytes[i] = num & 0xff;
            num >>>= 8;
        }
        return bytes;
    }

    hmacSHA1(key, message) {
        // Simplified HMAC-SHA1 implementation
        // In production, use a proper crypto library
        const blockSize = 64;
        const opad = new Uint8Array(blockSize);
        const ipad = new Uint8Array(blockSize);
        
        if (key.length > blockSize) {
            key = this.sha1(key);
        }
        
        for (let i = 0; i < blockSize; i++) {
            opad[i] = 0x5c;
            ipad[i] = 0x36;
        }
        
        for (let i = 0; i < key.length; i++) {
            opad[i] ^= key[i];
            ipad[i] ^= key[i];
        }
        
        const innerHash = this.sha1(this.concat(ipad, message));
        return this.sha1(this.concat(opad, innerHash));
    }

    sha1(data) {
        // Simplified SHA1 implementation
        // In production, use a proper crypto library
        return new Uint8Array(20); // Placeholder
    }

    concat(a, b) {
        const result = new Uint8Array(a.length + b.length);
        result.set(a);
        result.set(b, a.length);
        return result;
    }

    // Additional User Management
    getUserById(userId) {
        const users = this.getAllUsers();
        return users.find(user => user.id === userId);
    }

    updateUserStats(userId, stats) {
        const user = this.getUserById(userId);
        if (!user) return { success: false, error: 'User not found' };

        Object.assign(user.stats, stats);
        this.saveUser(user);
        return { success: true, stats: user.stats };
    }

    addBadge(userId, badge) {
        const user = this.getUserById(userId);
        if (!user) return { success: false, error: 'User not found' };

        if (!user.badges.includes(badge)) {
            user.badges.push(badge);
            user.stats.badges.push(badge);
            this.saveUser(user);
        }

        return { success: true, badges: user.badges };
    }

    // AI Learning Integration
    storeUserInteraction(type, data, outcome) {
        if (!this.isAuthenticated) return;

        const interaction = {
            type,
            data,
            outcome,
            timestamp: Date.now(),
            userId: this.currentUser.id
        };

        if (!this.currentUser.interactions) {
            this.currentUser.interactions = [];
        }
        this.currentUser.interactions.push(interaction);
        this.saveUser(this.currentUser);

        // Update AI learning system
        if (window.InfinityAI) {
            window.InfinityAI.learnFromInteraction(interaction);
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
