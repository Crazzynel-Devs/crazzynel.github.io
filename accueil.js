// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Toggle menu function
function toggleMenu() {
    console.log('Toggle menu clicked'); // Debug log
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Update ARIA attributes
    const isExpanded = navLinks.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
}

// Add click event to hamburger
hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        toggleMenu();
    }
});

// Close menu when window is resized
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});