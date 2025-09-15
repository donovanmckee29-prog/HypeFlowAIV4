// Infinity Notification System
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.subscribers = [];
        this.isEnabled = true;
        this.soundEnabled = true;
        this.init();
    }

    init() {
        // Load notifications from localStorage
        this.loadNotifications();
        
        // Start monitoring for new notifications
        this.startMonitoring();
        
        // Setup sound notifications
        this.setupSound();
    }

    loadNotifications() {
        const saved = localStorage.getItem('infinity_notifications');
        if (saved) {
            this.notifications = JSON.parse(saved);
        } else {
            // Initialize with default notifications
            this.notifications = [
                {
                    id: 1,
                    type: 'price_alert',
                    title: 'Price Alert Triggered',
                    message: 'Luka Prizm Silver +23% today',
                    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
                    urgent: true,
                    read: false,
                    action: 'view_card',
                    data: { cardId: 'luka_prizm_silver', price: 1200 }
                },
                {
                    id: 2,
                    type: 'grading',
                    title: 'Grading Complete',
                    message: 'Your PSA submission ready',
                    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
                    urgent: false,
                    read: false,
                    action: 'view_submission',
                    data: { submissionId: 'psa_123', grade: 'PSA 9' }
                },
                {
                    id: 3,
                    type: 'market',
                    title: 'Market Update',
                    message: 'Basketball cards trending up',
                    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
                    urgent: false,
                    read: false,
                    action: 'view_market',
                    data: { category: 'basketball', trend: 'up' }
                },
                {
                    id: 4,
                    type: 'achievement',
                    title: 'New Achievement',
                    message: 'New badge: Grading Guru',
                    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
                    urgent: false,
                    read: true,
                    action: 'view_achievements',
                    data: { badge: 'grading_guru', level: 5 }
                },
                {
                    id: 5,
                    type: 'recommendation',
                    title: 'AI Recommendation',
                    message: '3 new AI picks available',
                    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                    urgent: false,
                    read: true,
                    action: 'view_recommendations',
                    data: { count: 3, category: 'basketball' }
                }
            ];
            this.saveNotifications();
        }
    }

    saveNotifications() {
        localStorage.setItem('infinity_notifications', JSON.stringify(this.notifications));
    }

    startMonitoring() {
        // Simulate real-time notifications
        setInterval(() => {
            this.generateRandomNotification();
        }, 30000); // Every 30 seconds

        // Monitor portfolio changes
        this.monitorPortfolioChanges();
        
        // Monitor market changes
        this.monitorMarketChanges();
    }

    generateRandomNotification() {
        if (!this.isEnabled) return;

        const notificationTypes = [
            {
                type: 'price_alert',
                title: 'Price Alert',
                message: 'Wembanyama RC Auto +15% in last hour',
                urgent: true,
                action: 'view_card',
                data: { cardId: 'wemby_rc', price: 3200 }
            },
            {
                type: 'market',
                title: 'Market Update',
                message: 'Basketball cards up 8% this week',
                urgent: false,
                action: 'view_market',
                data: { category: 'basketball', change: 8 }
            },
            {
                type: 'grading',
                title: 'Grading Update',
                message: 'Your BGS submission received',
                urgent: false,
                action: 'view_submission',
                data: { company: 'BGS', status: 'received' }
            },
            {
                type: 'achievement',
                title: 'Achievement Unlocked',
                message: 'Portfolio Master badge earned',
                urgent: false,
                action: 'view_achievements',
                data: { badge: 'portfolio_master', level: 10 }
            }
        ];

        const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const notification = {
            id: Date.now(),
            ...randomType,
            timestamp: new Date(),
            read: false
        };

        this.addNotification(notification);
    }

    addNotification(notification) {
        this.notifications.unshift(notification);
        
        // Keep only last 50 notifications
        if (this.notifications.length > 50) {
            this.notifications = this.notifications.slice(0, 50);
        }

        this.saveNotifications();
        this.notifySubscribers(notification);
        this.playNotificationSound();
    }

    notifySubscribers(notification) {
        this.subscribers.forEach(callback => {
            callback(notification);
        });
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    unsubscribe(callback) {
        this.subscribers = this.subscribers.filter(cb => cb !== callback);
    }

    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
        }
    }

    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.saveNotifications();
    }

    deleteNotification(notificationId) {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
        this.saveNotifications();
    }

    getUnreadCount() {
        return this.notifications.filter(n => !n.read).length;
    }

    getNotifications(limit = 10) {
        return this.notifications.slice(0, limit);
    }

    setupSound() {
        // Create audio context for notification sounds
        this.audioContext = null;
        this.initAudio();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    playNotificationSound() {
        if (!this.soundEnabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        } catch (e) {
            console.log('Could not play notification sound');
        }
    }

    monitorPortfolioChanges() {
        // Monitor for portfolio value changes
        let lastPortfolioValue = 0;
        
        setInterval(() => {
            // This would normally connect to your portfolio API
            const currentValue = 47250 + Math.random() * 1000 - 500;
            
            if (lastPortfolioValue > 0) {
                const change = ((currentValue - lastPortfolioValue) / lastPortfolioValue) * 100;
                
                if (Math.abs(change) > 5) { // 5% change threshold
                    this.addNotification({
                        id: Date.now(),
                        type: 'portfolio',
                        title: 'Portfolio Alert',
                        message: `Portfolio value ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change).toFixed(1)}%`,
                        urgent: Math.abs(change) > 10,
                        timestamp: new Date(),
                        read: false,
                        action: 'view_portfolio',
                        data: { change: change, value: currentValue }
                    });
                }
            }
            
            lastPortfolioValue = currentValue;
        }, 60000); // Check every minute
    }

    monitorMarketChanges() {
        // Monitor for significant market changes
        setInterval(() => {
            const marketChanges = [
                { category: 'basketball', change: 12, message: 'Basketball cards up 12% this week' },
                { category: 'football', change: -3, message: 'Football cards down 3% this week' },
                { category: 'baseball', change: 8, message: 'Baseball cards up 8% this week' }
            ];

            const randomChange = marketChanges[Math.floor(Math.random() * marketChanges.length)];
            
            if (Math.abs(randomChange.change) > 5) {
                this.addNotification({
                    id: Date.now(),
                    type: 'market',
                    title: 'Market Alert',
                    message: randomChange.message,
                    urgent: Math.abs(randomChange.change) > 10,
                    timestamp: new Date(),
                    read: false,
                    action: 'view_market',
                    data: { category: randomChange.category, change: randomChange.change }
                });
            }
        }, 120000); // Check every 2 minutes
    }

    enable() {
        this.isEnabled = true;
    }

    disable() {
        this.isEnabled = false;
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
    }

    clearAll() {
        this.notifications = [];
        this.saveNotifications();
    }
}

// Global notification system instance
window.InfinityNotifications = new NotificationSystem();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationSystem;
}
