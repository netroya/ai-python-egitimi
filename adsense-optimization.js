// AdSense Optimization Script
// AI Python Eğitimi - AdSense Performance Optimizer

(function() {
    'use strict';
    
    // AdSense Configuration
    const ADSENSE_CONFIG = {
        publisherId: 'ca-pub-9023802833968711',
        slots: {
            header: '3838714977',
            content: '4515379030',
            sidebar: '2077956392',
            footer: '9486093631'
        },
        autoAds: true,
        lazyLoading: true
    };

    // Performance monitoring
    function trackAdPerformance() {
        // Track ad loading times
        const adLoadStart = performance.now();
        
        window.addEventListener('load', function() {
            const adLoadEnd = performance.now();
            const loadTime = adLoadEnd - adLoadStart;
            
            // Send to Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'adsense_load_time', {
                    'event_category': 'AdSense',
                    'event_label': 'Page Load',
                    'value': Math.round(loadTime)
                });
            }
        });
    }

    // AdSense Error Handling
    function handleAdErrors() {
        window.addEventListener('error', function(e) {
            if (e.target && e.target.tagName === 'INS' && e.target.className.includes('adsbygoogle')) {
                console.warn('AdSense Ad Error:', e);
                
                // Track ad errors
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'adsense_error', {
                        'event_category': 'AdSense',
                        'event_label': 'Ad Load Error',
                        'non_interaction': true
                    });
                }
            }
        });
    }

    // Optimize ad placement based on viewport
    function optimizeAdPlacement() {
        const ads = document.querySelectorAll('.adsbygoogle');
        
        // Check if ads are visible in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Track ad visibility
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'adsense_visible', {
                            'event_category': 'AdSense',
                            'event_label': 'Ad Visible',
                            'non_interaction': true
                        });
                    }
                }
            });
        }, { threshold: 0.5 });

        ads.forEach(ad => observer.observe(ad));
    }

    // Auto Ads Configuration
    function configureAutoAds() {
        if (ADSENSE_CONFIG.autoAds && typeof adsbygoogle !== 'undefined') {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: ADSENSE_CONFIG.publisherId,
                    enable_page_level_ads: true,
                    overlays: {bottom: true}
                });
            } catch (e) {
                console.warn('Auto Ads configuration error:', e);
            }
        }
    }

    // AdSense Revenue Optimization
    function optimizeRevenue() {
        // Dynamic ad refresh for better performance
        setInterval(() => {
            const visibleAds = document.querySelectorAll('.adsbygoogle[data-ad-status="filled"]');
            
            if (visibleAds.length > 0 && typeof gtag !== 'undefined') {
                gtag('event', 'adsense_refresh', {
                    'event_category': 'AdSense',
                    'event_label': 'Ad Refresh',
                    'value': visibleAds.length
                });
            }
        }, 30000); // Every 30 seconds
    }

    // Initialize optimization
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                trackAdPerformance();
                handleAdErrors();
                optimizeAdPlacement();
                configureAutoAds();
                optimizeRevenue();
            });
        } else {
            trackAdPerformance();
            handleAdErrors();
            optimizeAdPlacement();
            configureAutoAds();
            optimizeRevenue();
        }
    }

    // AdSense Status Checker
    function checkAdSenseStatus() {
        // Check if AdSense is loaded
        const checkInterval = setInterval(() => {
            if (typeof adsbygoogle !== 'undefined') {
                console.log('✅ AdSense loaded successfully');
                clearInterval(checkInterval);
                
                // Track successful load
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'adsense_loaded', {
                        'event_category': 'AdSense',
                        'event_label': 'Script Loaded'
                    });
                }
            }
        }, 1000);

        // Timeout after 10 seconds
        setTimeout(() => {
            clearInterval(checkInterval);
            if (typeof adsbygoogle === 'undefined') {
                console.warn('⚠️ AdSense failed to load');
            }
        }, 10000);
    }

    // Mobile optimization
    function optimizeForMobile() {
        if (window.innerWidth <= 768) {
            // Reduce ad frequency on mobile
            const mobileAds = document.querySelectorAll('.ad-zone-sidebar');
            mobileAds.forEach(ad => {
                ad.style.display = 'none';
            });
        }
    }

    // Page Speed Optimization
    function optimizePageSpeed() {
        // Lazy load ads that are not immediately visible
        const lazyAds = document.querySelectorAll('.adsbygoogle[data-lazy="true"]');
        
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ad = entry.target;
                    ad.removeAttribute('data-lazy');
                    
                    // Push to AdSense
                    try {
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    } catch (e) {
                        console.warn('Lazy ad load error:', e);
                    }
                    
                    lazyObserver.unobserve(ad);
                }
            });
        });

        lazyAds.forEach(ad => lazyObserver.observe(ad));
    }

    // Initialize everything
    init();
    checkAdSenseStatus();
    optimizeForMobile();
    optimizePageSpeed();

    // Export for debugging
    window.AdSenseOptimizer = {
        config: ADSENSE_CONFIG,
        trackPerformance: trackAdPerformance,
        checkStatus: checkAdSenseStatus
    };

})();