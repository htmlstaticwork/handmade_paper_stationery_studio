document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon (Menu / X)
            const isMenuOpen = navLinks.classList.contains('active');
            mobileMenuBtn.innerHTML = isMenuOpen
                ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
        });
    }

    // 2. Dark Mode Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const root = document.documentElement;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            if (newTheme === 'dark') {
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                root.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    });

    // 3. RTL Toggle
    const rtlToggles = document.querySelectorAll('.rtl-toggle');

    // Check saved direction
    const savedDir = localStorage.getItem('dir') || 'ltr';
    if (savedDir === 'rtl') {
        root.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentDir = root.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';

            root.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    });

    // 4. Scroll Stagger Animation (Anti-Gravity)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If it's a direct element
                if (entry.target.classList.contains('stagger-item')) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }

                // If it's a container with stagger items
                const children = entry.target.querySelectorAll('.stagger-item:not(.in-view)');
                if (children.length > 0) {
                    children.forEach((child, index) => {
                        // Apply staggered delay (0.1s each)
                        child.style.transitionDelay = `${index * 100}ms`;

                        // Force reflow before adding class to ensure transition runs
                        void child.offsetWidth;
                        child.classList.add('in-view');
                    });
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe containers directly
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
        staggerObserver.observe(container);
    });

    // Observe loose individual items
    const looseItems = document.querySelectorAll('.stagger-item:not(.stagger-container .stagger-item)');
    looseItems.forEach(item => {
        staggerObserver.observe(item);
    });

    // 5. Ink Bleed Reveal (Hero Text)
    const inkBleedElement = document.querySelector('.hero-content h1');
    if (inkBleedElement) {
        // SVG mask animation starts on document load, but we'll fade it in
        setTimeout(() => {
            inkBleedElement.style.opacity = '1';
        }, 100);
    }

    // Password toggles (for Login/Register pages)
    const pwdToggles = document.querySelectorAll('.pwd-toggle');
    pwdToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const input = e.currentTarget.previousElementSibling;
            if (input && input.type === 'password') {
                input.type = 'text';
                e.currentTarget.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>';
            } else if (input) {
                input.type = 'password';
                e.currentTarget.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
            }
        });
    });

    // 6. Move to Top Button
    const moveToTopBtn = document.querySelector('.move-to-top');

    if (moveToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                moveToTopBtn.classList.add('active');
            } else {
                moveToTopBtn.classList.remove('active');
            }
        });

        moveToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Shop Filter Toggle (Mobile/Tablet)
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    const filterSidebar = document.querySelector('.filter-sidebar');

    if (filterToggleBtn && filterSidebar) {
        filterToggleBtn.addEventListener('click', () => {
            filterSidebar.classList.toggle('active');

            const isOpen = filterSidebar.classList.contains('active');
            filterToggleBtn.innerHTML = isOpen
                ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Hide Filters'
                : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg> Show Filters';
        });
    }
});

