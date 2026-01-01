
// ==================== GENTLE BOT DETECTION ====================
// Only triggers for CLEAR bots, not normal users

function isLikelyBot() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    // VERY SPECIFIC bot patterns only
    const clearBotPatterns = [
        'headlesschrome', 
        'phantomjs',
        'selenium',
        'puppeteer',
        'playwright',
        'cheerio',
        'scrapy',
        'crawler',
        'spider'
    ];
    
    // Count bot signals
    let botScore = 0;
    
    // Check for CLEAR automation tools
    clearBotPatterns.forEach(pattern => {
        if (userAgent.includes(pattern)) botScore += 3;
    });
    
    // Check for multiple bot-like characteristics
    if (navigator.webdriver === true) botScore += 2;
    if (navigator.plugins.length === 0) botScore += 1;
    if (navigator.languages.length === 0) botScore += 1;
    
    // Only redirect if STRONG evidence (score >= 4)
    if (botScore >= 4) {
        console.log("Clear bot detected, redirecting to fake page");
        setTimeout(() => {
            window.location.href = 'fake-403.html';
        }, 1000);
        return true;
    }
    
    return false;
}

// ==================== HUMAN-FRIENDLY SECURITY ====================

document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('mainContent');
    
    // Check for bots AFTER page loads (no false positives)
    setTimeout(() => {
        if (!isLikelyBot()) {
            // HUMAN DETECTED - Show everything
            console.log("Human visitor detected, showing full site");
            
            // Show main content
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
                
                // Start audio
                initAudio();
                
                // Start matrix rain
                initMatrixRain();
                
                // Show ALL ads (for humans)
                showAllAds();
            }, 1000);
        }
        // If bot, it will auto-redirect via isLikelyBot()
    }, 2000);
});

// ==================== ALL YOUR ORIGINAL FEATURES ====================

function initAudio() {
    const audio = document.getElementById('bgAudio');
    audio.volume = 0.3;
    
    // Try to play
    audio.play().catch(e => {
        // Wait for user interaction
        document.addEventListener('click', () => {
            audio.play().catch(e2 => console.log("Audio blocked"));
        }, { once: true });
    });
    
    // Loop forever
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    });
}

function initMatrixRain() {
    const matrixRain = document.getElementById('matrixRain');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*';
    
    function createChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
        char.style.left = Math.random() * 100 + 'vw';
        char.style.animationDuration = (Math.random() * 5 + 3) + 's';
        char.style.opacity = Math.random() * 0.5 + 0.2;
        matrixRain.appendChild(char);
        
        setTimeout(() => char.remove(), 8000);
    }
    
    setInterval(createChar, 100);
}

function showAllAds() {
    // Show all ad containers
    const adContainers = document.querySelectorAll('[id^="adContainer"]');
    adContainers.forEach(ad => {
        ad.style.display = 'block';
        ad.style.opacity = '1';
    });
}

// ==================== MINIMAL PROTECTION (No false positives) ====================

// Only prevent obvious bot behavior
document.addEventListener('contextmenu', function(e) {
    // Allow right-click for humans
    // Only block if it's a rapid series of right-clicks (bot behavior)
    if (window.rightClickCount && window.rightClickCount > 5) {
        e.preventDefault();
        return;
    }
    
    if (!window.rightClickCount) window.rightClickCount = 0;
    window.rightClickCount++;
    setTimeout(() => window.rightClickCount--, 2000);
});

// Allow copy/paste for humans
// Only log excessive copying (might be scraping)
let copyCount = 0;
document.addEventListener('copy', function() {
    copyCount++;
    if (copyCount > 10) {
        console.log("Excessive copying detected - might be scraper");
        // Could redirect to fake page after too much copying
        if (copyCount > 50) {
            window.location.href = 'fake-403.html';
        }
    }
});
