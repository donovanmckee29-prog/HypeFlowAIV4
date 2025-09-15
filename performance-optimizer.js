// Performance Optimizer for Infinity AI Platform
window.InfinityPerformance = {
    // Performance monitoring
    metrics: {
        pageLoadTime: 0,
        renderTime: 0,
        memoryUsage: 0,
        networkLatency: 0
    },

    // Initialize performance monitoring
    init: function() {
        this.startPerformanceMonitoring();
        this.optimizeImages();
        this.enableLazyLoading();
        this.setupCaching();
        this.optimizeAnimations();
        console.log('🚀 Performance optimizer initialized');
    },

    // Start performance monitoring
    startPerformanceMonitoring: function() {
        // Monitor page load time
        window.addEventListener('load', () => {
            this.metrics.pageLoadTime = performance.now();
            console.log(`📊 Page loaded in ${this.metrics.pageLoadTime.toFixed(2)}ms`);
        });

        // Monitor memory usage
        if (performance.memory) {
            setInterval(() => {
                this.metrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
                if (this.metrics.memoryUsage > 100) { // Alert if memory usage > 100MB
                    console.warn('⚠️ High memory usage detected:', this.metrics.memoryUsage.toFixed(2) + 'MB');
                }
            }, 30000); // Check every 30 seconds
        }

        // Monitor network performance
        this.monitorNetworkPerformance();
    },

    // Monitor network performance
    monitorNetworkPerformance: function() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            this.metrics.networkLatency = connection.rtt;
            
            // Adjust performance based on connection speed
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                this.enableLowBandwidthMode();
            }
        }
    },

    // Enable low bandwidth mode
    enableLowBandwidthMode: function() {
        console.log('📱 Low bandwidth mode enabled');
        
        // Disable heavy animations
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        
        // Reduce image quality
        this.optimizeImages(true);
        
        // Disable auto-refresh
        this.disableAutoRefresh();
    },

    // Optimize images
    optimizeImages: function(lowBandwidth = false) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for better performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add error handling
            img.addEventListener('error', () => {
                img.style.display = 'none';
            });
            
            // Optimize for low bandwidth
            if (lowBandwidth) {
                img.style.filter = 'blur(1px)';
                img.style.transform = 'scale(0.95)';
            }
        });
    },

    // Enable lazy loading
    enableLazyLoading: function() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    },

    // Setup caching
    setupCaching: function() {
        // Cache API responses
        const cache = new Map();
        
        // Override fetch to add caching
        const originalFetch = window.fetch;
        window.fetch = async function(url, options) {
            const cacheKey = url + JSON.stringify(options);
            
            if (cache.has(cacheKey)) {
                return cache.get(cacheKey);
            }
            
            const response = await originalFetch(url, options);
            cache.set(cacheKey, response);
            
            // Clear cache after 5 minutes
            setTimeout(() => cache.delete(cacheKey), 300000);
            
            return response;
        };
    },

    // Optimize animations
    optimizeAnimations: function() {
        // Use CSS transforms instead of changing layout properties
        const style = document.createElement('style');
        style.textContent = `
            .cyber-card {
                will-change: transform;
                transform: translateZ(0);
            }
            
            .quantum-btn {
                will-change: transform;
                transform: translateZ(0);
            }
            
            .glass-morphism {
                will-change: transform;
                transform: translateZ(0);
            }
        `;
        document.head.appendChild(style);
    },

    // Disable auto-refresh for low bandwidth
    disableAutoRefresh: function() {
        // Clear any existing intervals
        const intervals = window.performance.getEntriesByType('measure');
        intervals.forEach(interval => {
            if (interval.name.includes('refresh')) {
                clearInterval(interval.startTime);
            }
        });
    },

    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for performance
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Optimize scroll performance
    optimizeScroll: function() {
        let ticking = false;
        
        const updateScroll = () => {
            // Update scroll-dependent elements
            const scrollY = window.scrollY;
            document.documentElement.style.setProperty('--scroll-y', scrollY + 'px');
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    },

    // Optimize resize performance
    optimizeResize: function() {
        const debouncedResize = this.debounce(() => {
            // Update responsive elements
            const width = window.innerWidth;
            document.documentElement.style.setProperty('--viewport-width', width + 'px');
        }, 250);
        
        window.addEventListener('resize', debouncedResize);
    },

    // Preload critical resources
    preloadCriticalResources: function() {
        const criticalResources = [
            'https://cdn.jsdelivr.net/npm/chart.js',
            'https://unpkg.com/lottie-web@5.12.2/build/player/lottie.min.js'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'script';
            document.head.appendChild(link);
        });
    },

    // Optimize React rendering
    optimizeReactRendering: function() {
        // Add React.memo for components that don't need to re-render often
        if (window.React) {
            const originalCreateElement = window.React.createElement;
            window.React.createElement = function(type, props, ...children) {
                // Add performance hints for frequently rendered components
                if (type && typeof type === 'function') {
                    const componentName = type.name || 'Anonymous';
                    if (componentName.includes('Card') || componentName.includes('Button')) {
                        props = { ...props, 'data-perf-hint': 'frequent-render' };
                    }
                }
                return originalCreateElement.call(this, type, props, ...children);
            };
        }
    },

    // Get performance report
    getPerformanceReport: function() {
        const report = {
            ...this.metrics,
            timestamp: new Date(),
            userAgent: navigator.userAgent,
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            } : null,
            memory: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
            } : null
        };
        
        console.log('📊 Performance Report:', report);
        return report;
    },

    // Cleanup function
    cleanup: function() {
        // Remove event listeners
        window.removeEventListener('load', this.startPerformanceMonitoring);
        window.removeEventListener('scroll', this.optimizeScroll);
        window.removeEventListener('resize', this.optimizeResize);
        
        // Clear intervals
        const intervals = window.performance.getEntriesByType('measure');
        intervals.forEach(interval => clearInterval(interval.startTime));
        
        console.log('🧹 Performance optimizer cleaned up');
    }
};

// Initialize performance optimizer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.InfinityPerformance.init();
    });
} else {
    window.InfinityPerformance.init();
}
