// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Typing effect for bio text
    const typedTextElement = document.querySelector('.typed-text');
    const bioText = "Aspiring to be a Full Stack Developer/Software Engineer with a passion for innovation and technology. I am currently pursuing a Bachelor of Science in Information Technology with a specialization in Web and Mobile Application Development at FEU Institute of Technology.";

    let charIndex = 0;
    let isTyping = true;

    function typeText() {
        if (isTyping && charIndex < bioText.length) {
            typedTextElement.textContent += bioText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 25);
        } else if (charIndex === bioText.length) {
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            typedTextElement.appendChild(cursor);
        }
    }

    setTimeout(typeText, 1200);

    // Skill tags interactive effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.addEventListener('mouseenter', function () {
            this.style.animationDelay = `${index * 0.1}s`;
            this.style.animation = 'skill-bounce 0.6s ease';
        });

        tag.addEventListener('animationend', function () {
            this.style.animation = '';
        });
    });

    // Profile image floating animation
    const profileImage = document.querySelector('.profile-img');
    let isFloating = true;

    function startFloating() {
        if (isFloating && profileImage) {
            profileImage.style.animation = 'float-gentle 4s ease-in-out infinite';
        }
    }

    profileImage.addEventListener('mouseenter', function () {
        isFloating = false;
        this.style.animation = 'none';
    });

    profileImage.addEventListener('mouseleave', function () {
        isFloating = true;
        startFloating();
    });

    setTimeout(startFloating, 2000);

    // Particle animation
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle) => {
        particle.addEventListener('animationiteration', function () {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            this.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    });

    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
        }

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });

    // Button interactions and ripple effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.btn-icon');
            if (icon) {
                icon.style.transform = 'translateX(5px) scale(1.1)';
            }
        });

        button.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.btn-icon');
            if (icon) {
                icon.style.transform = 'translateX(0) scale(1)';
            }
        });

        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: enhanced-ripple 0.8s ease-out;
                pointer-events: none;
                z-index: 10;
            `;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });

    // Add ripple keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes enhanced-ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });

    // Easter egg: double-click effect on profile image
    let clickCount = 0;
    let clickTimer;

    profileImage.addEventListener('click', function () {
        clickCount++;

        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 500);
        } else if (clickCount === 2) {
            clearTimeout(clickTimer);
            this.style.transform = 'rotate(360deg) scale(1.2)';
            this.style.filter = 'hue-rotate(180deg)';

            // Optional sparkle function
            if (typeof createSparkles === 'function') {
                createSparkles(this);
            }

            setTimeout(() => {
                this.style.transform = '';
                this.style.filter = '';
            }, 1000);

            clickCount = 0;
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading animation class
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });
});
