
document.addEventListener('DOMContentLoaded', () => {
    // Menu hamburger
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            console.log('Menu toggled'); // Pour le débogage
        });

        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
        
        // Empêcher la fermeture du menu lorsqu'on clique à l'intérieur du menu
        navMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Fonction de décompte
    function updateCountdown() {
        const targetDate = new Date("March 22, 2025 10:00:00").getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }

    // Mettre à jour le décompte chaque seconde
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Carousel automatique
    const track = document.querySelector('.carousel-track');
    if (track) {
        const items = Array.from(track.children);
        let index = 0;

        function moveCarousel() {
            index = (index + 1) % items.length;
            if (window.innerWidth <= 576) {
                track.style.transform = `translateX(-${index * 100}%)`;
            } else {
                const itemWidth = items[0].getBoundingClientRect().width + 20; // 20px pour la marge
                track.style.transform = `translateX(-${index * itemWidth}px)`;
            }
        }

        setInterval(moveCarousel, 3000);
        
        // Ajouter un écouteur de redimensionnement pour ajuster le carousel
        window.addEventListener('resize', () => {
            index = 0; // Réinitialiser l'index lors du redimensionnement
            track.style.transform = 'translateX(0)';
        });
    }
});
