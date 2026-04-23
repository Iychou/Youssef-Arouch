const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initializeTerminal() {
    const terminalWindow = document.querySelector('.terminal-window');
    const terminalLines = document.querySelectorAll('.terminal-line.output');

    if (!terminalWindow) return;

    terminalWindow.addEventListener('mouseenter', () => {
        terminalLines.forEach((line) => {
            line.style.textShadow = '0 0 10px rgba(73, 232, 255, 0.45)';
        });
    });

    terminalWindow.addEventListener('mouseleave', () => {
        terminalLines.forEach((line) => {
            line.style.textShadow = '';
        });
    });
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            event.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

function createStars() {
    if (prefersReducedMotion) return;

    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    for (let i = 0; i < 80; i += 1) {
        const star = document.createElement('div');
        const size = Math.random() * 2.8 + 0.8;
        star.className = 'star';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${Math.random() * 0.55 + 0.25}`;
        star.style.setProperty('--twinkle-speed', `${Math.random() * 4 + 2}s`);
        starsContainer.appendChild(star);
    }

    for (let i = 0; i < 4; i += 1) {
        const meteor = document.createElement('div');
        meteor.className = 'shooting-star';
        meteor.style.top = `${Math.random() * 45 + 5}%`;
        meteor.style.left = `${Math.random() * 60 + 35}%`;
        meteor.style.animationDelay = `${Math.random() * 4}s`;
        meteor.style.animationDuration = `${Math.random() * 2 + 4.5}s`;
        starsContainer.appendChild(meteor);
    }
}

function initializeReveal() {
    const revealTargets = document.querySelectorAll(
        '.skill-item, .project-card, .stat-item, .education-card, .certificate-card, .info-item, .signature-card, .timeline-item, .lab-card'
    );
    if (!revealTargets.length || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.transitionDelay = `${Math.min(index * 40, 280)}ms`;
        observer.observe(element);
    });
}

function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    if (prefersReducedMotion) {
        counters.forEach((counter) => {
            const target = Number(counter.getAttribute('data-target')) || 0;
            counter.textContent = target.toString();
        });
        return;
    }

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const element = entry.target;
                const target = Number(element.getAttribute('data-target')) || 0;
                const duration = 1100;
                const startTime = performance.now();

                function update(now) {
                    const progress = Math.min((now - startTime) / duration, 1);
                    const value = Math.floor(progress * target);
                    element.textContent = value.toString();

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        element.textContent = target.toString();
                    }
                }

                requestAnimationFrame(update);
                counterObserver.unobserve(element);
            });
        },
        { threshold: 0.4 }
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });
}

function initializeTiltEffect(selector, maxTilt = 12) {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll(selector);
    cards.forEach((card) => {
        card.addEventListener('mousemove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            const rotateY = (x - 0.5) * maxTilt;
            const rotateX = (0.5 - y) * maxTilt;

            card.style.transform = `translateY(-10px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

function initializeHeroMotion() {
    if (prefersReducedMotion) return;

    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const terminalWindow = document.querySelector('.terminal-window');
    const auroraLayers = document.querySelectorAll('.aurora-layer');

    if (!hero || !heroContent) return;

    const motionState = {
        mouseX: 0,
        mouseY: 0,
        scrollDepth: 0
    };

    function applyHeroTransforms() {
        const rotateX = -motionState.mouseY * 8;
        const rotateY = motionState.mouseX * 10;

        heroContent.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(${motionState.scrollDepth.toFixed(2)}px)`;

        if (terminalWindow) {
            terminalWindow.style.transform = `translateZ(24px) rotateX(${(-motionState.mouseY * 6).toFixed(2)}deg) rotateY(${(motionState.mouseX * 8).toFixed(2)}deg) translateY(${(motionState.scrollDepth * 0.6).toFixed(2)}px)`;
        }

        auroraLayers.forEach((layer, index) => {
            const depth = index === 0 ? 22 : 30;
            layer.style.transform = `translate3d(${(-motionState.mouseX * depth).toFixed(2)}px, ${(-motionState.mouseY * depth).toFixed(2)}px, 0)`;
        });
    }

    hero.addEventListener('mousemove', (event) => {
        const rect = hero.getBoundingClientRect();
        motionState.mouseX = (event.clientX - rect.left) / rect.width - 0.5;
        motionState.mouseY = (event.clientY - rect.top) / rect.height - 0.5;
        applyHeroTransforms();
    });

    hero.addEventListener('mouseleave', () => {
        motionState.mouseX = 0;
        motionState.mouseY = 0;
        applyHeroTransforms();

        auroraLayers.forEach((layer) => {
            layer.style.transform = '';
        });
    });

    let ticking = false;
    let lastScrollY = 0;

    function updateParallax() {
        const heroHeight = hero.offsetHeight;
        if (lastScrollY < heroHeight) {
            motionState.scrollDepth = lastScrollY * 0.12;
            applyHeroTransforms();
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

function initializeActiveNav() {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-link');
    if (!sections.length || !links.length) return;

    let ticking = false;

    function updateActiveLink() {
        let currentSection = '';

        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        links.forEach((link) => {
            const isActive = link.getAttribute('href').slice(1) === currentSection;
            link.style.color = isActive ? 'var(--accent-color)' : 'var(--light-color)';
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateActiveLink);
            ticking = true;
        }
    });
}

function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = contactForm.querySelector('input[placeholder="Your Name"]').value.trim();
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        if (name && email && message) {
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#4CAF50';
            contactForm.reset();

            window.setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'var(--accent-color)';
            }, 2000);
        }
    });
}

function initializeCvModal() {
    const cvButton = document.getElementById('cvButton');
    const cvModal = document.getElementById('cvModal');
    const cvModalClose = document.querySelector('.cv-modal-close');

    if (!cvButton || !cvModal || !cvModalClose) return;

    cvButton.addEventListener('click', () => {
        cvModal.classList.add('active');
    });

    cvModalClose.addEventListener('click', () => {
        cvModal.classList.remove('active');
    });

    cvModal.addEventListener('click', (event) => {
        if (event.target === cvModal) {
            cvModal.classList.remove('active');
        }
    });
}

function initializePageFade() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.45s ease';

    window.setTimeout(() => {
        document.body.style.opacity = '1';
    }, 80);
}

document.addEventListener('DOMContentLoaded', () => {
    initializePageFade();
    initializeTerminal();
    initializeSmoothScroll();
    initializeMobileMenu();
    createStars();
    initializeReveal();
    initializeCounters();
    initializeHeroMotion();
    initializeTiltEffect('.project-card, .skill-item, .certificate-card, .education-card, .stat-item, .signature-card, .lab-card', 10);
    initializeActiveNav();
    initializeContactForm();
    initializeCvModal();
});
