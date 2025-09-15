/**
 * Infinity Subscription & Monetization System
 * Handles subscription tiers, payments, and feature access
 */

class InfinitySubscriptionSystem {
    constructor() {
        this.subscriptionTiers = {
            free: {
                name: 'Free',
                price: 0,
                features: [
                    'Basic AI Grader (5 scans/day)',
                    'Basic AI Oracle (10 questions/day)',
                    'Portfolio tracking (up to 10 cards)',
                    'Basic market alerts',
                    'Community access'
                ],
                limits: {
                    dailyGradings: 5,
                    dailyOracleQuestions: 10,
                    portfolioCards: 10,
                    advancedFeatures: false,
                    prioritySupport: false,
                    apiAccess: false
                }
            },
            pro: {
                name: 'Pro',
                price: 29.99,
                features: [
                    'Unlimited AI Grader scans',
                    'Unlimited AI Oracle questions',
                    'Portfolio tracking (unlimited)',
                    'Advanced market alerts',
                    'AI Negotiator',
                    'Rarity Analyzer',
                    'Historical Simulation Engine',
                    'Cross-Market Analysis',
                    'Priority support',
                    'API access'
                ],
                limits: {
                    dailyGradings: -1, // unlimited
                    dailyOracleQuestions: -1, // unlimited
                    portfolioCards: -1, // unlimited
                    advancedFeatures: true,
                    prioritySupport: true,
                    apiAccess: true
                }
            },
            elite: {
                name: 'Elite',
                price: 99.99,
                features: [
                    'Everything in Pro',
                    'AR Viewer',
                    'Advanced AI Modules',
                    'Custom AI training',
                    'White-label solutions',
                    'Dedicated account manager',
                    'Custom integrations',
                    'Advanced analytics',
                    'Early access to new features',
                    '24/7 premium support'
                ],
                limits: {
                    dailyGradings: -1, // unlimited
                    dailyOracleQuestions: -1, // unlimited
                    portfolioCards: -1, // unlimited
                    advancedFeatures: true,
                    prioritySupport: true,
                    apiAccess: true,
                    arViewer: true,
                    customAI: true,
                    whiteLabel: true,
                    dedicatedSupport: true
                }
            }
        };

        this.paymentMethods = {
            stripe: {
                name: 'Stripe',
                enabled: true,
                publicKey: 'pk_test_...' // Replace with actual Stripe public key
            },
            paypal: {
                name: 'PayPal',
                enabled: true,
                clientId: '...' // Replace with actual PayPal client ID
            },
            crypto: {
                name: 'Cryptocurrency',
                enabled: true,
                supportedCoins: ['BTC', 'ETH', 'USDC']
            }
        };

        this.currentUser = null;
        this.isAuthenticated = false;
    }

    // Initialize with user data
    initialize(user) {
        this.currentUser = user;
        this.isAuthenticated = true;
    }

    // Get subscription tiers
    getSubscriptionTiers() {
        return this.subscriptionTiers;
    }

    // Get current user's subscription
    getCurrentSubscription() {
        if (!this.isAuthenticated || !this.currentUser) {
            return this.subscriptionTiers.free;
        }
        return this.subscriptionTiers[this.currentUser.subscription] || this.subscriptionTiers.free;
    }

    // Check if user has access to a feature
    hasFeatureAccess(feature) {
        const subscription = this.getCurrentSubscription();
        
        switch (feature) {
            case 'unlimited_gradings':
                return subscription.limits.dailyGradings === -1;
            case 'unlimited_oracle':
                return subscription.limits.dailyOracleQuestions === -1;
            case 'unlimited_portfolio':
                return subscription.limits.portfolioCards === -1;
            case 'advanced_features':
                return subscription.limits.advancedFeatures;
            case 'ar_viewer':
                return subscription.limits.arViewer;
            case 'custom_ai':
                return subscription.limits.customAI;
            case 'white_label':
                return subscription.limits.whiteLabel;
            case 'dedicated_support':
                return subscription.limits.dedicatedSupport;
            default:
                return false;
        }
    }

    // Check if user can perform an action
    canPerformAction(action) {
        const subscription = this.getCurrentSubscription();
        
        switch (action) {
            case 'grade_card':
                if (subscription.limits.dailyGradings === -1) return true;
                return this.getDailyUsage('gradings') < subscription.limits.dailyGradings;
            case 'ask_oracle':
                if (subscription.limits.dailyOracleQuestions === -1) return true;
                return this.getDailyUsage('oracle') < subscription.limits.dailyOracleQuestions;
            case 'add_portfolio_card':
                if (subscription.limits.portfolioCards === -1) return true;
                return this.getPortfolioCount() < subscription.limits.portfolioCards;
            default:
                return true;
        }
    }

    // Get daily usage for a feature
    getDailyUsage(feature) {
        if (!this.currentUser) return 0;
        
        const today = new Date().toDateString();
        const usageKey = `dailyUsage_${feature}_${today}`;
        return parseInt(localStorage.getItem(usageKey) || '0');
    }

    // Increment daily usage
    incrementDailyUsage(feature) {
        if (!this.currentUser) return;
        
        const today = new Date().toDateString();
        const usageKey = `dailyUsage_${feature}_${today}`;
        const currentUsage = parseInt(localStorage.getItem(usageKey) || '0');
        localStorage.setItem(usageKey, (currentUsage + 1).toString());
    }

    // Get portfolio count
    getPortfolioCount() {
        if (!this.currentUser) return 0;
        return this.currentUser.portfolio ? this.currentUser.portfolio.length : 0;
    }

    // Upgrade subscription
    async upgradeSubscription(tier, paymentMethod = 'stripe') {
        if (!this.isAuthenticated || !this.currentUser) {
            return { success: false, error: 'Not authenticated' };
        }

        try {
            // Simulate payment processing
            const paymentResult = await this.processPayment(tier, paymentMethod);
            
            if (paymentResult.success) {
                // Update user subscription
                this.currentUser.subscription = tier;
                this.currentUser.subscriptionStartDate = Date.now();
                this.currentUser.paymentMethod = paymentMethod;
                
                // Save user data
                if (window.InfinityAuth) {
                    window.InfinityAuth.updateUserProfile({
                        subscription: tier,
                        subscriptionStartDate: Date.now(),
                        paymentMethod: paymentMethod
                    });
                }

                // Store interaction for AI learning
                if (window.InfinityAI) {
                    window.InfinityAI.storeInteraction('subscription_upgrade', {
                        tier: tier,
                        paymentMethod: paymentMethod,
                        userId: this.currentUser.id
                    }, {
                        success: true,
                        timestamp: Date.now()
                    });
                }

                return {
                    success: true,
                    subscription: this.subscriptionTiers[tier],
                    message: `Successfully upgraded to ${tier} subscription`
                };
            } else {
                return {
                    success: false,
                    error: paymentResult.error
                };
            }
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Process payment
    async processPayment(tier, paymentMethod) {
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate payment success (in production, integrate with actual payment processors)
        const success = Math.random() > 0.1; // 90% success rate for demo

        if (success) {
            return {
                success: true,
                transactionId: 'txn_' + Date.now(),
                amount: this.subscriptionTiers[tier].price
            };
        } else {
            return {
                success: false,
                error: 'Payment failed. Please try again.'
            };
        }
    }

    // Cancel subscription
    async cancelSubscription() {
        if (!this.isAuthenticated || !this.currentUser) {
            return { success: false, error: 'Not authenticated' };
        }

        try {
            // Update user subscription to free
            this.currentUser.subscription = 'free';
            this.currentUser.subscriptionEndDate = Date.now();
            
            // Save user data
            if (window.InfinityAuth) {
                window.InfinityAuth.updateUserProfile({
                    subscription: 'free',
                    subscriptionEndDate: Date.now()
                });
            }

            // Store interaction for AI learning
            if (window.InfinityAI) {
                window.InfinityAI.storeInteraction('subscription_cancel', {
                    userId: this.currentUser.id
                }, {
                    success: true,
                    timestamp: Date.now()
                });
            }

            return {
                success: true,
                message: 'Subscription cancelled successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Get billing information
    getBillingInfo() {
        if (!this.isAuthenticated || !this.currentUser) {
            return null;
        }

        return {
            currentTier: this.currentUser.subscription,
            startDate: this.currentUser.subscriptionStartDate,
            endDate: this.currentUser.subscriptionEndDate,
            paymentMethod: this.currentUser.paymentMethod,
            nextBillingDate: this.getNextBillingDate(),
            amount: this.subscriptionTiers[this.currentUser.subscription].price
        };
    }

    // Get next billing date
    getNextBillingDate() {
        if (!this.currentUser || !this.currentUser.subscriptionStartDate) {
            return null;
        }

        const startDate = new Date(this.currentUser.subscriptionStartDate);
        const nextBilling = new Date(startDate);
        nextBilling.setMonth(nextBilling.getMonth() + 1);
        
        return nextBilling;
    }

    // Get usage statistics
    getUsageStats() {
        if (!this.currentUser) {
            return null;
        }

        const today = new Date().toDateString();
        const subscription = this.getCurrentSubscription();

        return {
            gradings: {
                used: this.getDailyUsage('gradings'),
                limit: subscription.limits.dailyGradings,
                unlimited: subscription.limits.dailyGradings === -1
            },
            oracle: {
                used: this.getDailyUsage('oracle'),
                limit: subscription.limits.dailyOracleQuestions,
                unlimited: subscription.limits.dailyOracleQuestions === -1
            },
            portfolio: {
                used: this.getPortfolioCount(),
                limit: subscription.limits.portfolioCards,
                unlimited: subscription.limits.portfolioCards === -1
            }
        };
    }

    // Get feature comparison
    getFeatureComparison() {
        const tiers = Object.keys(this.subscriptionTiers);
        const features = [
            'AI Grader Scans',
            'AI Oracle Questions',
            'Portfolio Cards',
            'Advanced Features',
            'AR Viewer',
            'Custom AI',
            'White Label',
            'Dedicated Support'
        ];

        return features.map(feature => {
            const comparison = {};
            tiers.forEach(tier => {
                const tierData = this.subscriptionTiers[tier];
                comparison[tier] = this.getFeatureValue(feature, tierData);
            });
            return { feature, ...comparison };
        });
    }

    // Get feature value for a tier
    getFeatureValue(feature, tierData) {
        switch (feature) {
            case 'AI Grader Scans':
                return tierData.limits.dailyGradings === -1 ? 'Unlimited' : `${tierData.limits.dailyGradings}/day`;
            case 'AI Oracle Questions':
                return tierData.limits.dailyOracleQuestions === -1 ? 'Unlimited' : `${tierData.limits.dailyOracleQuestions}/day`;
            case 'Portfolio Cards':
                return tierData.limits.portfolioCards === -1 ? 'Unlimited' : `${tierData.limits.portfolioCards} cards`;
            case 'Advanced Features':
                return tierData.limits.advancedFeatures ? '✓' : '✗';
            case 'AR Viewer':
                return tierData.limits.arViewer ? '✓' : '✗';
            case 'Custom AI':
                return tierData.limits.customAI ? '✓' : '✗';
            case 'White Label':
                return tierData.limits.whiteLabel ? '✓' : '✗';
            case 'Dedicated Support':
                return tierData.limits.dedicatedSupport ? '✓' : '✗';
            default:
                return '✗';
        }
    }

    // Check if user needs to upgrade for a feature
    needsUpgradeForFeature(feature) {
        if (!this.isAuthenticated || !this.currentUser) {
            return true;
        }

        const currentTier = this.currentUser.subscription;
        const currentTierData = this.subscriptionTiers[currentTier];
        
        // Check if current tier has the feature
        switch (feature) {
            case 'unlimited_gradings':
                return currentTierData.limits.dailyGradings !== -1;
            case 'unlimited_oracle':
                return currentTierData.limits.dailyOracleQuestions !== -1;
            case 'unlimited_portfolio':
                return currentTierData.limits.portfolioCards !== -1;
            case 'advanced_features':
                return !currentTierData.limits.advancedFeatures;
            case 'ar_viewer':
                return !currentTierData.limits.arViewer;
            case 'custom_ai':
                return !currentTierData.limits.customAI;
            case 'white_label':
                return !currentTierData.limits.whiteLabel;
            case 'dedicated_support':
                return !currentTierData.limits.dedicatedSupport;
            default:
                return false;
        }
    }

    // Get recommended tier for user
    getRecommendedTier() {
        if (!this.currentUser) {
            return 'free';
        }

        const usage = this.getUsageStats();
        const portfolioCount = this.getPortfolioCount();

        // If user is hitting limits, recommend upgrade
        if (usage.gradings.used >= usage.gradings.limit && usage.gradings.limit !== -1) {
            return 'pro';
        }
        if (usage.oracle.used >= usage.oracle.limit && usage.oracle.limit !== -1) {
            return 'pro';
        }
        if (portfolioCount >= usage.portfolio.limit && usage.portfolio.limit !== -1) {
            return 'pro';
        }

        // If user has high usage, recommend elite
        if (usage.gradings.used > 20 || usage.oracle.used > 50 || portfolioCount > 100) {
            return 'elite';
        }

        return 'free';
    }
}

// Global Subscription System Instance
window.InfinitySubscription = new InfinitySubscriptionSystem();

// Initialize when user is authenticated
window.addEventListener('load', () => {
    if (window.InfinityAuth && window.InfinityAuth.isUserAuthenticated()) {
        window.InfinitySubscription.initialize(window.InfinityAuth.getCurrentUser());
    }
});

export default InfinitySubscriptionSystem;
