// assets/js/suite-logique.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Éléments du DOM
    const startBtn = document.getElementById('start-btn');
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const sequenceEl = document.getElementById('sequence-display');
    const scoreEl = document.getElementById('score');
    const timeEl = document.getElementById('time-left');
    const feedbackEl = document.getElementById('feedback-msg');

    // Variables de jeu
    let score = 0;
    let timeLeft = 60;
    let timerInterval;
    let currentResult = 0;
    let isPlaying = false;

    // --- FONCTIONS ---

    function startGame() {
        score = 0;
        timeLeft = 60;
        isPlaying = true;
        
        scoreEl.innerText = score;
        timeEl.innerText = timeLeft;
        feedbackEl.innerText = "";
        startBtn.style.display = "none";
        
        answerInput.disabled = false;
        submitBtn.disabled = false;
        answerInput.value = "";
        answerInput.focus();

        generateSequence();
        
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            timeEl.innerText = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        isPlaying = false;
        clearInterval(timerInterval);
        
        answerInput.disabled = true;
        submitBtn.disabled = true;
        
        sequenceEl.innerText = "Terminé !";
        feedbackEl.innerHTML = `Score final : <span style="color:white">${score}</span>`;
        feedbackEl.className = "";
        
        startBtn.innerText = "Rejouer";
        startBtn.style.display = "block";
    }

    function generateSequence() {
        const type = Math.random(); // Choix aléatoire du type de suite
        let seq = [];
        let start = Math.floor(Math.random() * 10) + 1; // Nombre de départ
        let step = Math.floor(Math.random() * 5) + 1; // Raison (pas)

        // Type 1 : Suite Arithmétique (+n) - 60% de chance
        if (type < 0.6) {
            for (let i = 0; i < 4; i++) {
                seq.push(start + (i * step));
            }
            currentResult = start + (4 * step);
        } 
        // Type 2 : Suite Géométrique (x n) - 20% de chance
        else if (type < 0.8) {
            step = Math.floor(Math.random() * 2) + 2; // x2 ou x3 max pour pas exploser
            start = Math.floor(Math.random() * 3) + 1; // Petit départ
            for (let i = 0; i < 4; i++) {
                seq.push(start * Math.pow(step, i));
            }
            currentResult = start * Math.pow(step, 4);
        }
        // Type 3 : Suite "Carré" (n²) - 20% de chance
        else {
            start = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < 4; i++) {
                let n = start + i;
                seq.push(n * n);
            }
            let nextN = start + 4;
            currentResult = nextN * nextN;
        }

        // Affichage : "2, 4, 6, 8, ..."
        sequenceEl.innerText = seq.join("  ➜  ") + "  ➜  ";
    }

    function checkAnswer() {
        if (!isPlaying) return;

        const playerAnswer = parseInt(answerInput.value);

        if (playerAnswer === currentResult) {
            score++;
            scoreEl.innerText = score;
            feedbackEl.innerText = "Bravo !";
            feedbackEl.className = "correct";
            generateSequence();
        } else {
            feedbackEl.innerText = "Raté !";
            feedbackEl.className = "wrong";
        }
        
        answerInput.value = "";
        answerInput.focus();
    }

    // --- ÉVÉNEMENTS ---
    if (startBtn) startBtn.addEventListener('click', startGame);
    if (submitBtn) submitBtn.addEventListener('click', checkAnswer);
    if (answerInput) {
        answerInput.addEventListener('keydown', (e) => {
            if (e.key === "Enter") checkAnswer();
        });
    }
});