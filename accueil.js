// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Toggle menu function
function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
}

// Event Listeners
hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navLinks.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Prevent scroll when menu is open
function preventScroll(e) {
    if (body.classList.contains('menu-open')) {
        e.preventDefault();
    }
}

// Touch event listeners for mobile
document.addEventListener('touchmove', preventScroll, { passive: false });

// Clean up function to remove event listeners (good practice)
window.addEventListener('unload', () => {
    hamburger.removeEventListener('click', toggleMenu);
    document.removeEventListener('touchmove', preventScroll);
});
