document.addEventListener('DOMContentLoaded', () => {
    // On récupère les éléments
    const img = document.querySelector('.program-image');
    const lightbox = document.getElementById('programLightbox');
    const lightboxImg = document.getElementById('img01');
    const closeBtn = document.querySelector('.close-lightbox');

    // Vérif de sécurité (si les éléments existent bien sur la page)
    if (img && lightbox && lightboxImg) {
        
        // 1. Ouvrir le zoom
        img.addEventListener('click', () => {
            lightbox.style.display = "flex"; // Affiche la boîte
            lightboxImg.src = img.src;       // Copie l'image
            document.body.style.overflow = "hidden"; // Bloque le scroll de la page derrière
        });

        // Fonction pour fermer
        const closeBox = () => {
            lightbox.style.display = "none";
            document.body.style.overflow = ""; // Réactive le scroll
        };

        // 2. Fermer avec la croix
        if (closeBtn) {
            closeBtn.addEventListener('click', closeBox);
        }

        // 3. Fermer en cliquant à côté de l'image (sur le noir)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeBox();
            }
        });

        // 4. Fermer avec la touche Echap (Pratique sur PC)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === "flex") {
                closeBox();
            }
        });
    }
});