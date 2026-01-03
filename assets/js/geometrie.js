// assets/js/geometrie.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Éléments
    const canvas = document.getElementById('geometry-canvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('start-btn');
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const questionEl = document.getElementById('geometry-question');
    const scoreEl = document.getElementById('score');
    const feedbackEl = document.getElementById('feedback-msg');

    let currentShape = null;
    let score = 0;
    let isPlaying = false;

    // Configuration du dessin
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#00A8FF'; // Couleur primaire
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';

    // --- FONCTIONS ---

    function generateShape() {
        // Nettoyer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Choisir une forme au hasard (0: Rectangle, 1: Triangle, 2: Cercle)
        const type = Math.floor(Math.random() * 3);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        if (type === 0) { // RECTANGLE
            const w = Math.floor(Math.random() * 6) + 4; // 4 à 10 cm
            const h = Math.floor(Math.random() * 5) + 3; // 3 à 8 cm
            const scale = 20; // Facteur de zoom pour le dessin

            // Dessin
            ctx.strokeRect(centerX - (w*scale)/2, centerY - (h*scale)/2, w*scale, h*scale);
            
            // Labels
            ctx.fillText(`${w} cm`, centerX, centerY + (h*scale)/2 + 20); // Largeur
            ctx.fillText(`${h} cm`, centerX + (w*scale)/2 + 15, centerY); // Hauteur

            currentShape = {
                answer: w * h,
                text: "Calculez l'aire du rectangle."
            };

        } else if (type === 1) { // TRIANGLE (Rectangle pour simplifier le calcul d'aire)
            const b = Math.floor(Math.random() * 6) + 4;
            const h = Math.floor(Math.random() * 6) + 4;
            const scale = 20;

            // Dessin
            ctx.beginPath();
            ctx.moveTo(centerX - (b*scale)/2, centerY + (h*scale)/2);
            ctx.lineTo(centerX - (b*scale)/2, centerY - (h*scale)/2);
            ctx.lineTo(centerX + (b*scale)/2, centerY + (h*scale)/2);
            ctx.closePath();
            ctx.stroke();

            // Labels
            ctx.fillText(`${b} cm`, centerX, centerY + (h*scale)/2 + 20); // Base
            ctx.fillText(`${h} cm`, centerX - (b*scale)/2 - 15, centerY); // Hauteur

            currentShape = {
                answer: (b * h) / 2,
                text: "Calculez l'aire du triangle rectangle."
            };

        } else { // CERCLE
            const r = Math.floor(Math.random() * 4) + 2; // 2 à 6 cm
            const scale = 25;

            // Dessin
            ctx.beginPath();
            ctx.arc(centerX, centerY, r*scale, 0, 2 * Math.PI);
            ctx.stroke();

            // Rayon
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + r*scale, centerY);
            ctx.setLineDash([5, 5]); // Pointillés
            ctx.stroke();
            ctx.setLineDash([]); // Reset

            // Label
            ctx.fillText(`r = ${r} cm`, centerX + (r*scale)/2, centerY - 10);

            // On demande le PERIMETRE ou l'AIRE (aléatoire)
            if (Math.random() > 0.5) {
                // Périmètre : 2 * pi * r
                currentShape = {
                    answer: 2 * Math.PI * r,
                    text: "Calculez la circonférence (périmètre). Arrondir à 2 chiffres.",
                    tolerance: 0.5
                };
            } else {
                // Aire : pi * r²
                currentShape = {
                    answer: Math.PI * r * r,
                    text: "Calculez l'aire du disque. Arrondir à 2 chiffres.",
                    tolerance: 0.5
                };
            }
        }

        questionEl.innerText = currentShape.text;
    }

    function startGame() {
        score = 0;
        scoreEl.innerText = score;
        feedbackEl.innerText = "";
        
        answerInput.disabled = false;
        submitBtn.disabled = false;
        startBtn.innerText = "Nouvelle Figure";
        
        generateShape();
        answerInput.value = "";
        answerInput.focus();
    }

    function checkAnswer() {
        if (!currentShape) return;

        const playerAns = parseFloat(answerInput.value.replace(',', '.')); // Gère virgule et point
        
        if (isNaN(playerAns)) return;

        // Tolérance pour les arrondis (surtout avec Pi)
        const tolerance = currentShape.tolerance || 0.1;
        const diff = Math.abs(playerAns - currentShape.answer);

        if (diff <= tolerance) {
            score += 10;
            scoreEl.innerText = score;
            feedbackEl.innerText = "Correct ! ✅";
            feedbackEl.className = "stat-box correct";
            
            // Nouvelle figure après délai
            setTimeout(() => {
                feedbackEl.innerText = "";
                answerInput.value = "";
                generateShape();
            }, 1000);
        } else {
            feedbackEl.innerText = `Faux ! Réponse : ${currentShape.answer.toFixed(2)}`;
            feedbackEl.className = "stat-box wrong";
        }
    }

    // --- ÉVÉNEMENTS ---
    startBtn.addEventListener('click', startGame);
    submitBtn.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === "Enter") checkAnswer();
    });

});