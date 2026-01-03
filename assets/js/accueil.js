// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;
const navItems = document.querySelectorAll('.nav-links a');

// Initialize menu state
if(hamburger) {
    hamburger.setAttribute('aria-label', 'Menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('role', 'button');
    hamburger.addEventListener('click', toggleMenu);
}

// Gestion du menu hamburger
function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    const isExpanded = navLinks.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
    
    // Prevent body scroll when menu is open
    body.style.overflow = isExpanded ? 'hidden' : '';
}

// Interactions Menu
navItems.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Fermer le menu quand on clique sur un lien ou en dehors
document.addEventListener('click', function(e) {
    if (navLinks && navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        toggleMenu();
    }
});

// Fermer le menu avec Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Close menu when window is resized
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Active menu item on scroll
function setActiveMenuItem() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.parentElement.classList.remove('active');
        const href = item.getAttribute('href');
        // Petit fix pour gérer les liens relatifs ../
        if (href && (href === '#' + currentSection || href.endsWith('#' + currentSection))) {
            item.parentElement.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveMenuItem);
// FIN DU FICHIER - J'ai supprimé tout le bloc "DOMContentLoaded" de la galerie