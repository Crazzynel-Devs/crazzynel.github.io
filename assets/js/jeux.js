document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.game-card');
    
    cards.forEach((card, index) => {
        // État initial (caché et décalé vers le bas)
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s cubic-bezier(0.5, 0, 0, 1), transform 0.6s cubic-bezier(0.5, 0, 0, 1)';
        
        // Délai progressif (cascade)
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 100); // 100ms de décalage entre chaque carte
    });
});