// FixEngine.app - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .step-item, .pricing-card, .appliance-item').forEach(el => {
        observer.observe(el);
    });
    
    // Demo interface interactivity
    const demoInput = document.querySelector('.demo-text-input');
    const demoSubmitBtn = document.querySelector('.demo-submit-btn');
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    
    if (demoInput && demoSubmitBtn) {
        // Handle demo input
        demoInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                demoSubmitBtn.style.background = '#667eea';
                demoSubmitBtn.style.transform = 'scale(1.05)';
            } else {
                demoSubmitBtn.style.background = '#ccc';
                demoSubmitBtn.style.transform = 'scale(1)';
            }
        });
        
        // Handle demo submission
        demoSubmitBtn.addEventListener('click', function() {
            if (demoInput.value.length > 0) {
                // Simulate AI processing
                demoInput.disabled = true;
                demoSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    demoInput.disabled = false;
                    demoSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    showDemoResult();
                }, 2000);
            }
        });
    }
    
    // Handle suggestion clicks
    suggestionItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            if (demoInput) {
                demoInput.value = text;
                demoInput.dispatchEvent(new Event('input'));
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#28a745';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
    
    // Pricing card hover effects
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('featured') ? 'scale(1.05) translateY(-10px)' : 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('featured') ? 'scale(1.05)' : '';
        });
    });
    
    // Stats counter animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('K')) {
                        const num = parseInt(text.replace('K+', ''));
                        stat.textContent = '0';
                        animateCounter(stat, num, 2000);
                        setTimeout(() => {
                            stat.textContent = num + 'K+';
                        }, 2000);
                    } else if (text.includes('%')) {
                        const num = parseInt(text.replace('%', ''));
                        stat.textContent = '0';
                        animateCounter(stat, num, 2000);
                        setTimeout(() => {
                            stat.textContent = num + '%';
                        }, 2000);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // Phone mockup interaction
    const diagnosticSteps = document.querySelectorAll('.step');
    let currentStep = 0;
    
    function updateDiagnosticSteps() {
        diagnosticSteps.forEach((step, index) => {
            step.classList.remove('completed', 'active');
            if (index < currentStep) {
                step.classList.add('completed');
            } else if (index === currentStep) {
                step.classList.add('active');
            }
        });
        
        // Update confidence meter
        const confidenceFill = document.querySelector('.confidence-fill');
        if (confidenceFill) {
            const confidence = Math.min(70 + (currentStep * 8), 94);
            confidenceFill.style.width = confidence + '%';
            
            const confidenceLabel = document.querySelector('.confidence-label');
            if (confidenceLabel) {
                confidenceLabel.textContent = `Confidence: ${confidence}%`;
            }
        }
    }
    
    // Auto-advance diagnostic steps
    setInterval(() => {
        currentStep = (currentStep + 1) % diagnosticSteps.length;
        updateDiagnosticSteps();
    }, 3000);
    
    // Initialize diagnostic steps
    updateDiagnosticSteps();
    
    // Parallax effect for floating icons
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-icon');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Show demo result (simulated)
    function showDemoResult() {
        const mockup = document.querySelector('.demo-mockup');
        if (mockup) {
            // Create result overlay
            const resultOverlay = document.createElement('div');
            resultOverlay.className = 'demo-result-overlay';
            resultOverlay.innerHTML = `
                <div class="demo-result">
                    <div class="result-header">
                        <i class="fas fa-check-circle" style="color: #28a745; font-size: 2rem;"></i>
                        <h3>Problem Identified!</h3>
                    </div>
                    <div class="result-content">
                        <p><strong>Issue:</strong> Clogged drain filter</p>
                        <p><strong>Confidence:</strong> 94%</p>
                        <p><strong>Estimated Time:</strong> 15 minutes</p>
                        <div class="result-actions">
                            <button class="btn btn-primary btn-small">View Solution</button>
                            <button class="btn btn-outline btn-small" onclick="this.closest('.demo-result-overlay').remove()">Close</button>
                        </div>
                    </div>
                </div>
            `;
            
            resultOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 20px;
                z-index: 10;
            `;
            
            const resultDiv = resultOverlay.querySelector('.demo-result');
            resultDiv.style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 12px;
                text-align: center;
                max-width: 300px;
                margin: 0 1rem;
            `;
            
            mockup.style.position = 'relative';
            mockup.appendChild(resultOverlay);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (resultOverlay.parentNode) {
                    resultOverlay.remove();
                }
            }, 5000);
        }
    }
    
    // Add loading states to CTA buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Download') || btn.textContent.includes('Try')) {
            btn.addEventListener('click', function(e) {
                if (this.href === '#' || this.href.endsWith('#demo')) {
                    e.preventDefault();
                    
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                    this.style.pointerEvents = 'none';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.pointerEvents = '';
                        
                        // Show demo or redirect message
                        if (originalText.includes('Download')) {
                            alert('App download will be available soon! Sign up for early access.');
                        } else {
                            // Scroll to demo section
                            document.querySelector('#demo').scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 2000);
                }
            });
        }
    });
    
    // Add subtle animations to feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing effect after a delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 50);
        }
    }, 1000);
});

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Performance optimization: debounce scroll events
const debouncedScroll = debounce(function() {
    // Scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', debouncedScroll);