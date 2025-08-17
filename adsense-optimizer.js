
// AdSense Revenue Optimization Script
class AdSenseOptimizer {
    constructor() {
        this.adUnits = [];
        this.viewabilityThreshold = 0.5;
        this.init();
    }

    init() {
        this.trackAdPerformance();
        this.optimizeAdPlacements();
        this.setupLazyLoading();
        this.trackUserEngagement();
    }

    trackAdPerformance() {
        // Ad viewability tracking
        const ads = document.querySelectorAll('.adsbygoogle');
        
        ads.forEach((ad, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        console.log(`Ad ${index} viewed`);
                        gtag('event', 'ad_impression', {
                            'custom_parameter': `ad_unit_${index}`
                        });
                    }
                });
            }, { threshold: this.viewabilityThreshold });
            
            observer.observe(ad);
        });
    }

    optimizeAdPlacements() {
        // Dynamic ad placement based on user behavior
        const scrollPosition = () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > 25 && !this.midContentAdShown) {
                this.showMidContentAd();
                this.midContentAdShown = true;
            }
            
            if (scrollPercent > 75 && !this.exitIntentAdShown) {
                this.prepareExitIntentAd();
                this.exitIntentAdShown = true;
            }
        };

        window.addEventListener('scroll', scrollPosition);
    }

    setupLazyLoading() {
        // Lazy load ads for better performance
        const lazyAds = document.querySelectorAll('.adsbygoogle[data-lazy]');
        
        const adObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ad = entry.target;
                    ad.removeAttribute('data-lazy');
                    (adsbygoogle = window.adsbygoogle || []).push({});
                    adObserver.unobserve(ad);
                }
            });
        });

        lazyAds.forEach(ad => adObserver.observe(ad));
    }

    trackUserEngagement() {
        // High-value user tracking for CPC optimization
        let engagementScore = 0;
        let timeOnSite = 0;
        const startTime = Date.now();

        // Time tracking
        setInterval(() => {
            timeOnSite = Math.floor((Date.now() - startTime) / 1000);
            if (timeOnSite > 30) engagementScore += 1;
            if (timeOnSite > 120) engagementScore += 2;
            if (timeOnSite > 300) engagementScore += 3;
        }, 10000);

        // Interaction tracking
        ['click', 'scroll', 'keydown'].forEach(event => {
            document.addEventListener(event, () => {
                engagementScore += 0.1;
            });
        });

        // Send engagement data
        window.addEventListener('beforeunload', () => {
            gtag('event', 'user_engagement', {
                'engagement_score': engagementScore,
                'time_on_site': timeOnSite
            });
        });
    }

    showMidContentAd() {
        // Create additional ad unit for high-engagement users
        const contentSections = document.querySelectorAll('.content-section');
        if (contentSections.length > 2) {
            const midSection = contentSections[Math.floor(contentSections.length / 2)];
            const adDiv = document.createElement('div');
            adDiv.className = 'ad-zone-content dynamic-ad';
            adDiv.innerHTML = `
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-YOUR-PUBLISHER-ID"
                     data-ad-slot="DYNAMIC-AD-SLOT"
                     data-ad-format="auto"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            `;
            midSection.appendChild(adDiv);
        }
    }

    prepareExitIntentAd() {
        // Exit-intent ad for maximum revenue
        document.addEventListener('mouseout', (e) => {
            if (e.clientY < 0) {
                this.showExitIntentAd();
            }
        });
    }

    showExitIntentAd() {
        if (this.exitAdShown) return;
        this.exitAdShown = true;

        // Create overlay ad
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const adContainer = document.createElement('div');
        adContainer.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 500px;
            text-align: center;
        `;

        adContainer.innerHTML = `
            <h3>Bir Dakika!</h3>
            <p>Python öğrenmeye devam etmek istemez misiniz?</p>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-YOUR-PUBLISHER-ID"
                 data-ad-slot="EXIT-INTENT-AD-SLOT"
                 data-ad-format="auto"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="margin-top: 15px; padding: 10px 20px; background: #ccc; border: none; border-radius: 5px; cursor: pointer;">
                Kapat
            </button>
        `;

        overlay.appendChild(adContainer);
        document.body.appendChild(overlay);

        // Auto-close after 10 seconds
        setTimeout(() => {
            if (overlay.parentElement) {
                overlay.remove();
            }
        }, 10000);
    }
}

// Initialize optimizer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AdSenseOptimizer();
});

// High-CPC keyword density optimization
const highCPCKeywords = [
    'python öğrenme', 'yapay zeka eğitimi', 'programlama kursu',
    'makine öğrenmesi', 'ai eğitimi', 'sertifika programı',
    'online kurs', 'yazılım geliştirme', 'data science'
];

// Add keywords to meta for better ad targeting
const addKeywordTargeting = () => {
    const meta = document.createElement('meta');
    meta.name = 'google-adsense-platform-account';
    meta.content = 'ca-host-pub-YOUR-HOST-ID';
    document.head.appendChild(meta);
};

addKeywordTargeting();