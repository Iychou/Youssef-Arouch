// Advanced Terminal Interactions
function initializeTerminal() {
    const terminalWindow = document.querySelector('.terminal-window');
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    if (!terminalWindow) return;

    // Hover glow effect
    terminalWindow.addEventListener('mouseenter', () => {
        terminalWindow.style.boxShadow = `
            0 25px 100px rgba(0, 0, 0, 0.7),
            0 0 100px rgba(0, 102, 255, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `;
    });

    terminalWindow.addEventListener('mouseleave', () => {
        terminalWindow.style.boxShadow = `
            0 25px 80px rgba(0, 0, 0, 0.6),
            0 0 50px rgba(0, 102, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
        `;
    });

    // Add interaction hint on hover
    terminalWindow.addEventListener('mouseenter', () => {
        terminalLines.forEach(line => {
            if (line.classList.contains('output')) {
                line.style.textShadow = '0 0 10px rgba(0, 102, 255, 0.5)';
            }
        });
    });

    terminalWindow.addEventListener('mouseleave', () => {
        terminalLines.forEach(line => {
            if (line.classList.contains('output')) {
                line.style.textShadow = 'none';
            }
        });
    });
}

// Initialize terminal on page load
window.addEventListener('load', initializeTerminal);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Animated background stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 2 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        starsContainer.appendChild(star);
    }
}

// Twinkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);

createStars();

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Parallax effect on scroll
let ticking = false;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

function updateParallax() {
    const heroImage = document.querySelector('.image-frame');
    if (heroImage && lastScrollY < window.innerHeight) {
        heroImage.style.transform = `translateY(${lastScrollY * 0.5}px)`;
    }
    ticking = false;
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = '#4CAF50';
            
            // Reset form
            contactForm.reset();
            
            // Restore button
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'var(--accent-color)';
            }, 2000);
        }
    });
}

// Add smooth animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Floating animation for elements
function addFloatingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
        }
        
        .floating {
            animation: float 3s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
}

addFloatingAnimation();

// Add floating class to image frame
const imageFrame = document.querySelector('.image-frame');
if (imageFrame) {
    imageFrame.classList.add('floating');
}

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--accent-color)';
        } else {
            link.style.color = 'var(--light-color)';
        }
    });
});

// Typing animation for hero title
function typeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;
    
    const speed = 50;
    
    function type() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 500);
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    // Comment out typing for now as it may be too slow
    // typeWriter();
});

// Smooth fade-in on page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mouse follow effect for skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// CV Modal functionality
const cvButton = document.getElementById('cvButton');
const cvModal = document.getElementById('cvModal');
const cvModalClose = document.querySelector('.cv-modal-close');

if (cvButton) {
    cvButton.addEventListener('click', () => {
        cvModal.classList.add('active');
    });
}

if (cvModalClose) {
    cvModalClose.addEventListener('click', () => {
        cvModal.classList.remove('active');
    });
}

// Close modal when clicking outside the content
cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
        cvModal.classList.remove('active');
    }
});

console.log('Portfolio script loaded successfully!');
