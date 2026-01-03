// assets/js/countdown.js

// --- CONFIGURATION DE LA DATE ICI ---
// Format : "Month Day, Year Hour:Minute:Second"
const eventDate = new Date("March 22, 2025 10:00:00").getTime();

const countdownTimer = setInterval(function() {

    const now = new Date().getTime();
    const distance = eventDate - now;

    // Si l'événement est terminé
    if (distance < 0) {
        clearInterval(countdownTimer);
        const countdownElement = document.getElementById("countdown");
        if (countdownElement) {
            // Message affiché quand c'est fini
            countdownElement.innerHTML = `
                <div class="event-finished">
                    <h3>L'événement est terminé !</h3>
                    <p>Merci à tous les participants.</p>
                </div>
            `;
        }
        return;
    }

    // Calculs du temps
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Affichage dans le HTML
    updateTime("days", days);
    updateTime("hours", hours);
    updateTime("minutes", minutes);
    updateTime("seconds", seconds);

}, 1000);

// Fonction utilitaire pour éviter les erreurs si l'élément n'existe pas encore
function updateTime(id, value) {
    const el = document.getElementById(id);
    if (el) {
        // Ajoute un '0' devant si le chiffre est < 10 (ex: 09)
        el.innerText = value < 10 ? "0" + value : value;
    }
}