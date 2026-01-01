
// ==================== ADVANCED BOT DETECTION ====================

// Enhanced bot detection
const detectScrapingTools = () => {
    const redFlags = [];
    
    // 1. Check for automation properties
    if (navigator.webdriver === true) {
        redFlags.push('WebDriver detected (Selenium/PhantomJS)');
    }
    
    // 2. Check for headless browsers
    if (navigator.plugins.length === 0) {
        redFlags.push('No plugins detected (headless browser)');
    }
    
    // 3. Check for common automation patterns
    const userAgent = navigator.userAgent.toLowerCase();
    const automationPatterns = [
        'headless', 'phantom', 'selenium', 'puppeteer', 'playwright',
        'cheerio', 'scrapy', 'beautifulsoup', 'curl', 'wget', 'python',
        'node-fetch', 'axios', 'request', 'got', 'superagent'
    ];
    
    automationPatterns.forEach(pattern => {
        if (userAgent.includes(pattern)) {
            redFlags.push(`Automation tool detected: ${pattern}`);
        }
    });
    
    // 4. Check for development tools
    if (window.outerWidth - window.innerWidth > 200 || 
        window.outerHeight - window.innerHeight > 200) {
        redFlags.push('Developer tools detected');
    }
    
    // 5. Check for common scraper headers
    const headers = {
        'accept': 'text/html',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'upgrade-insecure-requests': '1'
    };
    
    // 6. Behavioral detection
    const mouseMovePattern = () => {
        let mouseMoves = 0;
        document.addEventListener('mousemove', () => {
            mouseMoves++;
            if (mouseMoves > 100) { // Real users move mouse more
                sessionStorage.setItem('humanBehavior', 'true');
            }
        });
        
        setTimeout(() => {
            if (!sessionStorage.getItem('humanBehavior') && mouseMoves < 10) {
                redFlags.push('Suspicious mouse behavior (bot-like)');
            }
        }, 3000);
    };
    
    mouseMovePattern();
    
    return redFlags.length > 2; // If more than 2 red flags, likely a bot
};

// ==================== TRAP SYSTEM ====================

// Create honey traps for scrapers
const setupHoneyTraps = () => {
    // 1. Create invisible links that only scrapers would follow
    const honeyTrapLinks = [
        { href: '/admin', text: 'Admin Panel' },
        { href: '/wp-admin', text: 'WordPress Admin' },
        { href: '/database', text: 'Database Backup' },
        { href: '/config.json', text: 'Configuration File' },
        { href: '/.env', text: 'Environment Variables' }
    ];
    
    honeyTrapLinks.forEach(trap => {
        const link = document.createElement('a');
        link.href = trap.href;
        link.textContent = trap.text;
        link.style.cssText = `
            position: absolute;
            left: -9999px;
            top: -9999px;
            color: transparent;
            font-size: 1px;
        `;
        link.onclick = function(e) {
            e.preventDefault();
            // Redirect to fake error page
            window.location.href = '403.html';
            return false;
        };
        document.body.appendChild(link);
    });
    
    // 2. Create fake data for scrapers
    const fakeDataDiv = document.createElement('div');
    fakeDataDiv.id = 'fake-sensitive-data';
    fakeDataDiv.style.cssText = `
        display: none;
        position: absolute;
        left: -9999px;
    `;
    fakeDataDiv.innerHTML = `
        <!-- Fake sensitive data for scrapers -->
        <div class="fake-credentials">
            <h3>Admin Credentials</h3>
            <p>Username: admin</p>
            <p>Password: ZX@BOSS#2024!</p>
            <p>API Key: sk_live_51Hq7ZKJzQ8X8X8X8X8X8X8X</p>
            <p>Database URL: mongodb+srv://admin:password@cluster0.mongodb.net/zx-boss</p>
        </div>
        <div class="fake-endpoints">
            <h3>API Endpoints</h3>
            <p>/api/v1/users</p>
            <p>/api/v1/payments</p>
            <p>/api/v1/admin/backup</p>
            <p>/wp-json/wp/v2/users</p>
        </div>
    `;
    document.body.appendChild(fakeDataDiv);
    
    // 3. Monitor for access to fake data
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && 
                mutation.attributeName === 'style' &&
                fakeDataDiv.style.display !== 'none') {
                // Fake data accessed - redirect to error
                window.location.href = '403.html';
            }
        });
    });
    
    observer.observe(fakeDataDiv, { attributes: true });
};

// ==================== AD PROTECTION ====================

// Check if ads are blocked (scrapers often block ads)
const checkAdBlock = () => {
    const testAd = document.createElement('div');
    testAd.className = 'adsbox';
    testAd.style.cssText = `
        width: 1px;
        height: 1px;
        position: absolute;
        left: -100px;
        top: -100px;
        visibility: hidden;
    `;
    document.body.appendChild(testAd);
    
    setTimeout(() => {
        const styles = window.getComputedStyle(testAd);
        if (styles.display === 'none' || 
            styles.visibility === 'hidden' || 
            styles.height === '0px') {
            return true; // Ad blocker detected
        }
        return false;
    }, 100);
};

// ==================== MAIN SECURITY INITIALIZATION ====================

// Enhanced security initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('ZX BOSS Security System Initializing... 🔒');
    
    // Run all security checks
    const isScraper = detectScrapingTools();
    const isAdBlocked = checkAdBlock();
    
    // If bot detected, show fake error
    if (isScraper || isAdBlocked) {
        console.log('⚠️ Scraper/Bot detected! Redirecting to fake error page...');
        setTimeout(() => {
            window.location.href = '403.html';
        }, 2000);
        return; // Stop execution for bots
    }
    
    // Setup honey traps for scrapers
    setupHoneyTraps();
    
    // Continue with normal loading for real users
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('mainContent');
    const matrixRain = document.getElementById('matrixRain');
    
    // Initialize Matrix Rain
    initMatrixRain();
    
    // Show main content after loading
    setTimeout(function() {
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
            
            // Initialize Infinite Audio System for MP3
            const audioMonitor = initInfiniteAudio();
            
            // Force audio to play
            setTimeout(() => {
                const audio = document.getElementById('bgAudio');
                if (audio.paused) {
                    console.log("Final MP3 audio attempt");
                    audio.play().catch(e => console.log("Audio play failed:", e));
                }
            }, 1000);
            
        }, 1000);
    }, 3000);
});

// ==================== REST OF YOUR EXISTING CODE ====================

// Keep all your existing functions (initMatrixRain, initInfiniteAudio, etc.)
// Just add the new functions above and modify the DOMContentLoaded event

// Your existing initMatrixRain function
function initMatrixRain() {
    const matrixRain = document.getElementById('matrixRain');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*';
    
    function createMatrixChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
        char.style.left = Math.random() * 100 + 'vw';
        char.style.animationDuration = (Math.random() * 5 + 3) + 's';
        char.style.fontSize = (Math.random() * 10 + 14) + 'px';
        char.style.opacity = Math.random() * 0.7 + 0.3;
        char.style.color = Math.random() > 0.5 ? '#00ff00' : '#00aa00';
        matrixRain.appendChild(char);
        
        setTimeout(() => {
            if (char.parentNode === matrixRain) {
                char.remove();
            }
        }, 8000);
    }
    
    setInterval(createMatrixChar, 100);
    
    for (let i = 0; i < 50; i++) {
        setTimeout(createMatrixChar, i * 100);
    }
}

// Your existing initInfiniteAudio function
function initInfiniteAudio() {
    const audio = document.getElementById('bgAudio');
    const audioToggle = document.getElementById('audioToggle');
    const audioIcon = document.getElementById('audioIcon');
    
    audio.loop = true;
    audio.volume = 0.5;
    
    const playAudio = () => {
        audio.play()
            .then(() => {
                console.log("MP3 Audio started");
                audio.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play().catch(e => console.log("Couldn't restart MP3:", e));
                });
                
                if (audioToggle && audioIcon) {
                    audioIcon.className = 'fas fa-volume-up';
                    audioToggle.title = "Click to mute";
                }
            })
            .catch(error => {
                console.log("Autoplay prevented:", error);
                
                const playOnInteraction = () => {
                    audio.play()
                        .then(() => {
                            console.log("MP3 Audio started after interaction");
                            document.removeEventListener('click', playOnInteraction);
                            document.removeEventListener('keydown', playOnInteraction);
                            document.removeEventListener('touchstart', playOnInteraction);
                            
                            if (audioToggle && audioIcon) {
                                audioIcon.className = 'fas fa-volume-up';
                                audioToggle.title = "Click to mute";
                            }
                        })
                        .catch(e => console.log("Still blocked:", e));
                };
                
                document.addEventListener('click', playOnInteraction, { once: true });
                document.addEventListener('keydown', playOnInteraction, { once: true });
                document.addEventListener('touchstart', playOnInteraction, { once: true });
                
                if (audioToggle && audioIcon) {
                    audioIcon.className = 'fas fa-volume-mute';
                    audioToggle.title = "Click to enable sound";
                }
            });
    };
    
    playAudio();
    
    setInterval(() => {
        if (audio.paused && !audio.muted) {
            audio.play().catch(e => console.log("Couldn't restart MP3:", e));
        }
    }, 3000);
    
    if (audioToggle && audioIcon) {
        audioToggle.addEventListener('click', function() {
            if (audio.muted) {
                audio.muted = false;
                audioIcon.className = 'fas fa-volume-up';
                audioToggle.title = "Click to mute";
                if (audio.paused) {
                    audio.play().catch(e => console.log("Couldn't unmute:", e));
                }
            } else {
                audio.muted = true;
                audioIcon.className = 'fas fa-volume-mute';
                audioToggle.title = "Click to unmute";
            }
        });
    }
}

// Keep all your existing security functions...
// (right-click prevention, copy protection, dev tools detection, etc.)
