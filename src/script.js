document.addEventListener('DOMContentLoaded', function() {

    // --- HAMBURGER MENU FOR MOBILE ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        // Toggle 'active' class on hamburger and nav menu
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Toggle ARIA attribute
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- SMOOTH SCROLLING FOR NAV LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- CONTACT FORM HANDLING ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const body = {
                name: data.get('name'),
                email: data.get('email'),
                message: data.get('message'),
                honeypot: data.get('bot-field'), // Honeypot
            };

            formStatus.textContent = 'Sending...';

            try {
                const response = await fetch('/api/submit-form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });

                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    form.reset();
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            }
        });
    }

    // --- THEME TOGGLE LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const root = document.documentElement;

    function setTheme(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            themeIcon.innerHTML = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="6" fill="#fbbf24"/>
                <g stroke="#fbbf24" stroke-width="2">
                    <line x1="12" y1="2" x2="12" y2="5"/>
                    <line x1="12" y1="19" x2="12" y2="22"/>
                    <line x1="2" y1="12" x2="5" y2="12"/>
                    <line x1="19" y1="12" x2="22" y2="12"/>
                    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
                    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
                    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
                </g>
            </svg>`;
            themeIcon.style.transform = 'rotate(-180deg)';
        } else {
            root.setAttribute('data-theme', 'light');
            themeIcon.innerHTML = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#2563eb"/>
            </svg>`;
            themeIcon.style.transform = 'rotate(0deg)';
        }
        localStorage.setItem('theme', theme);
    }

    function getPreferredTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    setTheme(getPreferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

});