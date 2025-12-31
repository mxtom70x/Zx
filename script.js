// ==================== SECURITY ENHANCEMENTS ====================

// Prevent right-click (context menu)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showSecurityAlert("Context menu disabled!");
});

// Prevent text selection
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Prevent dragging of images
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        showSecurityAlert("Image protection active!");
    }
});

// Prevent keyboard shortcuts for developer tools
document.addEventListener('keydown', function(e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S
    if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
        (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
        (e.ctrlKey && e.keyCode === 83)    // Ctrl+S
    ) {
        e.preventDefault();
        showSecurityAlert("Developer tools are restricted!");
        return false;
    }
});

// Detect if DevTools is open (advanced detection)
let devtoolsOpen = false;
const threshold = 160;
const devToolsChecker = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if ((widthThreshold || heightThreshold) && !devtoolsOpen) {
        devtoolsOpen = true;
        showSecurityAlert("⚠️ SECURITY VIOLATION DETECTED!");
        // Show warning screen
        const warningHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: black;
                color: red;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: 'Orbitron', sans-serif;
                font-size: 24px;
                text-align: center;
                z-index: 9999;
                padding: 20px;
            ">
                <div>
                    ⚠️ SECURITY VIOLATION DETECTED ⚠️<br><br>
                    Developer tools are not allowed!<br>
                    <span style="color: #00ff00; font-size: 18px;">
                        This site is protected by ZX BOSS security system
                    </span><br><br>
                    <span style="color: #ccc; font-size: 16px;">
                        Page will refresh in 5 seconds...
                    </span>
                </div>
            </div>
        `;
        
        const warningDiv = document.createElement('div');
        warningDiv.innerHTML = warningHTML;
        document.body.appendChild(warningDiv);
        
        setTimeout(() => {
            location.reload();
        }, 5000);
    }
};

// Check for DevTools periodically
setInterval(devToolsChecker, 1000);

// Also check on resize
window.addEventListener('resize', devToolsChecker);

// Security alert function
function showSecurityAlert(message) {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 0, 0, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-family: 'Share Tech Mono', monospace;
        z-index: 9999;
        border: 2px solid #ff0000;
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
        animation: fadeInOut 3s forwards;
        max-width: 300px;
        word-wrap: break-word;
    `;
    alert.textContent = "⚠️ " + message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// ==================== INFINITE AUDIO SYSTEM (MP3) ====================

// Enhanced audio system for infinite MP3 playback
function initInfiniteAudio() {
    const audio = document.getElementById('bgAudio');
    const audioToggle = document.getElementById('audioToggle');
    const audioIcon = document.getElementById('audioIcon');
    
    // Force audio to loop infinitely
    audio.loop = true;
    
    // Set volume to 50% by default (so it's not too loud)
    audio.volume = 0.5;
    
    // Try to play audio immediately
    const playAudio = () => {
        audio.play()
            .then(() => {
                console.log("MP3 Audio started playing infinitely");
                // Ensure it keeps playing forever
                audio.addEventListener('ended', function() {
                    console.log("MP3 Audio ended, restarting...");
                    this.currentTime = 0;
                    this.play().catch(e => console.log("Couldn't restart MP3:", e));
                });
                
                // Show audio status
                if (audioToggle && audioIcon) {
                    audioIcon.className = 'fas fa-volume-up';
                    audioToggle.title = "Click to mute";
                }
            })
            .catch(error => {
                console.log("MP3 Autoplay prevented, waiting for user interaction:", error);
                
                // Try on any user interaction
                const playOnInteraction = () => {
                    audio.play()
                        .then(() => {
                            console.log("MP3 Audio started after user interaction");
                            // Remove listeners once started
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
                
                // Add multiple interaction listeners
                document.addEventListener('click', playOnInteraction, { once: true });
                document.addEventListener('keydown', playOnInteraction, { once: true });
                document.addEventListener('touchstart', playOnInteraction, { once: true });
                
                // Show muted icon until audio starts
                if (audioToggle && audioIcon) {
                    audioIcon.className = 'fas fa-volume-mute';
                    audioToggle.title = "Click to enable sound";
                }
            });
    };
    
    // Start audio
    playAudio();
    
    // Add additional safety: restart audio if it stops
    const audioMonitor = setInterval(() => {
        if (audio.paused && !audio.muted) {
            console.log("MP3 Audio was paused, restarting...");
            audio.play().catch(e => {
                console.log("Couldn't restart MP3:", e);
                // If it keeps failing, try to reset
                if (audio.readyState === 4) { // HAVE_ENOUGH_DATA
                    audio.currentTime = 0;
                    audio.play().catch(e2 => console.log("Reset also failed:", e2));
                }
            });
        }
    }, 3000);
    
    // Toggle mute functionality
    if (audioToggle && audioIcon) {
        audioToggle.addEventListener('click', function() {
            if (audio.muted) {
                audio.muted = false;
                audioIcon.className = 'fas fa-volume-up';
                audioToggle.title = "Click to mute";
                // Try to play if it's paused
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
    
    // Return the monitor interval ID in case we need to clear it
    return audioMonitor;
}

// ==================== MATRIX RAIN EFFECT ====================

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
        
        // Remove character after animation
        setTimeout(() => {
            if (char.parentNode === matrixRain) {
                char.remove();
            }
        }, 8000);
    }
    
    // Create matrix characters periodically
    setInterval(createMatrixChar, 100);
    
    // Add initial characters
    for (let i = 0; i < 50; i++) {
        setTimeout(createMatrixChar, i * 100);
    }
}

// ==================== MAIN INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('mainContent');
    
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
            
            // Force audio to play (additional attempt after page loads)
            setTimeout(() => {
                const audio = document.getElementById('bgAudio');
                if (audio.paused) {
                    console.log("Final MP3 audio attempt after page load");
                    audio.play().catch(e => {
                        console.log("Final MP3 audio attempt failed:", e);
                    });
                }
            }, 1000);
            
        }, 1000);
    }, 3000);
    
    // Additional audio start attempts on various events
    const startAudioEvents = ['click', 'scroll', 'mousemove', 'keydown', 'touchstart'];
    startAudioEvents.forEach(event => {
        document.addEventListener(event, function startAudio() {
            const audio = document.getElementById('bgAudio');
            if (audio.paused) {
                audio.play().catch(e => console.log("Event-based MP3 audio start failed:", e));
            }
            // Remove listener after first successful attempt
            document.removeEventListener(event, startAudio);
        }, { once: true });
    });
});

// ==================== ADDITIONAL SECURITY ====================

// Prevent iframe embedding
if (window.top !== window.self) {
    window.top.location = window.self.location;
}

// Detect copy attempts
document.addEventListener('copy', function(e) {
    showSecurityAlert("Copying is disabled!");
    e.preventDefault();
});

// Detect cut attempts
document.addEventListener('cut', function(e) {
    showSecurityAlert("Cutting is disabled!");
    e.preventDefault();
});

// Detect paste attempts
document.addEventListener('paste', function(e) {
    showSecurityAlert("Pasting is disabled!");
    e.preventDefault();
});

// Page visibility change detection (tab switching)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log("User switched tabs");
    } else {
        // User came back to tab - ensure audio is playing
        const audio = document.getElementById('bgAudio');
        if (audio.paused && !audio.muted) {
            audio.play().catch(e => console.log("Couldn't resume MP3 after tab switch:", e));
        }
    }
});

// ==================== AUDIO PERSISTENCE SYSTEM ====================

// Keep audio playing no matter what
window.addEventListener('beforeunload', function() {
    const audio = document.getElementById('bgAudio');
    // Try to keep playing even during page unload
    if (!audio.paused) {
        audio.play().catch(e => console.log("Playing MP3 during unload"));
    }
});

// Resume audio when page becomes visible again
document.addEventListener('visibilitychange', function() {
    const audio = document.getElementById('bgAudio');
    if (!document.hidden && audio.paused && !audio.muted) {
        setTimeout(() => {
            audio.play().catch(e => console.log("Resuming MP3 after visibility change:", e));
        }, 100);
    }
});

// Audio error recovery
const audio = document.getElementById('bgAudio');
audio.addEventListener('error', function(e) {
    console.error("MP3 Audio error:", e);
    // Try to recover by reloading the audio
    setTimeout(() => {
        audio.load();
        audio.play().catch(e => console.log("Recovery attempt failed:", e));
    }, 2000);
});

// Network recovery for audio
window.addEventListener('online', function() {
    const audio = document.getElementById('bgAudio');
    if (audio.paused && !audio.muted) {
        audio.play().catch(e => console.log("Couldn't resume MP3 after network recovery:", e));
    }
});

console.log("ZX BOSS Security System Activated ✅");
console.log("Infinite MP3 Audio System Initialized 🔊");
console.log("MP3 format supported: YES");