document.addEventListener('DOMContentLoaded', () => {
    
    // Éléments du DOM
    const startBtn = document.getElementById('start-btn');
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const questionEl = document.getElementById('question');
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
        
        // Reset affichage
        scoreEl.innerText = score;
        timeEl.innerText = timeLeft;
        feedbackEl.innerText = "";
        startBtn.style.display = "none"; // Cacher bouton démarrer
        
        // Activer les champs
        answerInput.disabled = false;
        submitBtn.disabled = false;
        answerInput.value = "";
        answerInput.focus();

        generateQuestion();
        
        // Lancer le chrono
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
        
        // Désactiver champs
        answerInput.disabled = true;
        submitBtn.disabled = true;
        
        questionEl.innerText = "Terminé !";
        feedbackEl.innerHTML = `Score final : <span style="color:white">${score}</span>`;
        feedbackEl.className = "";
        
        startBtn.innerText = "Rejouer";
        startBtn.style.display = "block";
    }

    function generateQuestion() {
        // Types d'opérations : 0 = addition, 1 = soustraction, 2 = multiplication
        const type = Math.floor(Math.random() * 3);
        let n1, n2, symbol;

        if (type === 0) { // Addition
            n1 = Math.floor(Math.random() * 50) + 1;
            n2 = Math.floor(Math.random() * 50) + 1;
            symbol = "+";
            currentResult = n1 + n2;
        } else if (type === 1) { // Soustraction (résultat positif)
            n1 = Math.floor(Math.random() * 50) + 10;
            n2 = Math.floor(Math.random() * n1); // n2 toujours plus petit que n1
            symbol = "-";
            currentResult = n1 - n2;
        } else { // Multiplication (tables 2 à 10)
            n1 = Math.floor(Math.random() * 9) + 2;
            n2 = Math.floor(Math.random() * 10) + 1;
            symbol = "×";
            currentResult = n1 * n2;
        }

        questionEl.innerText = `${n1} ${symbol} ${n2}`;
    }

    function checkAnswer() {
        if (!isPlaying) return;

        const playerAnswer = parseInt(answerInput.value);

        if (playerAnswer === currentResult) {
            // Bonne réponse
            score++;
            scoreEl.innerText = score;
            feedbackEl.innerText = "Bravo !";
            feedbackEl.className = "correct";
            generateQuestion();
        } else {
            // Mauvaise réponse
            feedbackEl.innerText = "Raté !";
            feedbackEl.className = "wrong";
        }
        
        answerInput.value = "";
        answerInput.focus();
    }

    // --- ÉVÉNEMENTS ---

    if (startBtn) startBtn.addEventListener('click', startGame);
    
    if (submitBtn) submitBtn.addEventListener('click', checkAnswer);

    // Valider avec la touche "Entrée"
    if (answerInput) {
        answerInput.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                checkAnswer();
            }
        });
    }
});