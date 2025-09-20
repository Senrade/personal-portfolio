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

});