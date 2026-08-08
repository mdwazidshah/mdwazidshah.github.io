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
