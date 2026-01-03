document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const loadMoreBtn = document.getElementById('loadMore');
    
    // Si on n'est pas sur la page galerie, on s'arrête là
    if (!gallery || !loadMoreBtn) return;

    const TOTAL_IMAGES = 35;
    const IMAGES_PER_LOAD = 12;
    let currentItems = 0;

    function loadItems() {
        const fragment = document.createDocumentFragment();
        const end = Math.min(currentItems + IMAGES_PER_LOAD, TOTAL_IMAGES);

        for (let i = currentItems; i < end; i++) {
            const img = document.createElement('img');
            // Le chemin magique corrigé : on remonte d'un dossier (..) pour aller dans assets
            img.src = `../assets/PSL/PSL${i+1}.jpg`; 
            img.alt = `Photo du salon ${i+1}`;
            img.className = 'gallery-img';
            img.loading = "lazy"; // Bonus: chargement progressif pour la vitesse
            fragment.appendChild(img);
        }

        gallery.appendChild(fragment);
        currentItems += IMAGES_PER_LOAD;

        if (currentItems >= TOTAL_IMAGES) {
            loadMoreBtn.style.display = 'none';
        }
    }

    loadMoreBtn.addEventListener('click', loadItems);
    
    // Chargement initial
    loadItems();
});