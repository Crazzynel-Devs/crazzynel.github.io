// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;
const navItems = document.querySelectorAll('.nav-links a');

// Initialize menu state
hamburger.setAttribute('aria-label', 'Menu');
hamburger.setAttribute('aria-expanded', 'false');
hamburger.setAttribute('role', 'button');

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

hamburger.addEventListener('click', toggleMenu);

navItems.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Fermer le menu avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu();
    }
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

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Add smooth scrolling for anchor links
navItems.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            }
        }
    });
});

// Set active menu item based on current section
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
        if (href === '#' + currentSection) {
            item.parentElement.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveMenuItem);

document.addEventListener('DOMContentLoaded', function() {
    const TOTAL_IMAGES = 35;
    const IMAGES_PER_LOAD = 12;
    let currentItems = 0;

    const gallery = document.getElementById('gallery');
    const loadMoreBtn = document.getElementById('loadMore');

    function loadItems() {
        const fragment = document.createDocumentFragment();
        const end = Math.min(currentItems + IMAGES_PER_LOAD, TOTAL_IMAGES);

        for (let i = currentItems; i < end; i++) {
            const img = document.createElement('img');
            img.src = `PSL/PSL${i+1}.jpg`;
            img.alt = `Image PSL ${i+1}`;
            img.className = 'gallery-img';
            fragment.appendChild(img);
        }

        gallery.appendChild(fragment);
        currentItems += IMAGES_PER_LOAD;

        if (currentItems >= TOTAL_IMAGES) {
            loadMoreBtn.style.display = 'none';
        }
    }

    loadMoreBtn.addEventListener('click', loadItems);
    loadItems(); // Charger les premiers éléments
});