// Theme Handling
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun');
const moonIcon = document.querySelector('.moon');

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle && sunIcon && moonIcon) {
        if (theme === 'light') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
};

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

// Apps directory has a few dark-only inline styles; keep them aligned with the shared theme tokens.
if (document.querySelector('.apps-container')) {
    const appsThemeStyles = document.createElement('style');
    appsThemeStyles.textContent = `
        :root[data-theme="light"] body {
            background: radial-gradient(circle at top left, rgba(16, 185, 129, 0.08), transparent 26%),
                        radial-gradient(circle at bottom right, rgba(52, 211, 153, 0.07), transparent 28%),
                        var(--bg-main) !important;
        }
        :root[data-theme="light"] .topbar {
            background: rgba(255, 255, 255, 0.82) !important;
            border-color: var(--border) !important;
            box-shadow: 0 10px 28px rgba(17, 24, 39, 0.06) !important;
        }
        :root[data-theme="light"] .app-card {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(249, 250, 251, 0.98)) !important;
            border-color: var(--border) !important;
            box-shadow: 0 12px 28px rgba(17, 24, 39, 0.07) !important;
        }
        :root[data-theme="light"] .app-card:hover {
            box-shadow: 0 18px 34px rgba(17, 24, 39, 0.11) !important;
        }
        :root[data-theme="light"] .app-icon {
            background: var(--bg-card) !important;
            border-color: var(--border) !important;
        }
        :root[data-theme="light"] .btn.secondary {
            background: rgba(255, 255, 255, 0.78) !important;
            border-color: var(--border) !important;
            color: var(--text-main) !important;
        }
    `;
    document.head.appendChild(appsThemeStyles);
}

// Active link highlighting
const navLinks = document.querySelectorAll('.nav-links a');
if (navLinks.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Reveal Effect
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, observerOptions);

const revealElements = document.querySelectorAll('.service-card, .hero-text, .section-header, .visual-card, .contact-card');
revealElements.forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
});

// Simple Typewriter effect for Hero
const heroTitle = document.querySelector('.hero-text h1');
if (heroTitle) {
    const titles = ['Architecting Scalable Systems', 'Deploying Intelligent Code', 'Building Mobile Apps'];
    let idx = 0;
    
    setInterval(() => {
        idx = (idx + 1) % titles.length;
        heroTitle.style.opacity = 0;
        setTimeout(() => {
            let newText = titles[idx];
            newText = newText.replace('Scalable', '<span class="gradient-text">Scalable</span>')
                             .replace('Intelligent', '<span class="gradient-text">Intelligent</span>')
                             .replace('Mobile', '<span class="gradient-text">Mobile</span>');
            heroTitle.innerHTML = newText;
            heroTitle.style.opacity = 1;
        }, 500);
    }, 4000);
    heroTitle.style.transition = 'opacity 0.5s ease';
}

console.log('Ansar Portfolio Loaded Successfully 🚀');
