// assets/js/memoire.js

document.addEventListener('DOMContentLoaded', () => {
    
    const board = document.querySelector('.board');
    const cloneTemplate = document.querySelector('.clone');
    const overlay = document.querySelector('.overlay');
    const resetBtn = document.querySelector('.reset-btn');
    const movesDisplay = document.getElementById('moves');
    const timeDisplay = document.getElementById('time');

    const tileOptions = ['erupt', 'ptero', 'tri', 'ahahah', 'egg', 'dino'];
    
    // État du jeu
    let state = {
        selections: [],
        boardLocked: false,
        matches: 0,
        moves: 0,
        time: 0,
        timerInterval: null
    };

    // Démarrer le jeu
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetGame();
        });
    }

    function startGame() {
        createBoard();
        startTimer();
    }

    function resetGame() {
        state.boardLocked = true;
        state.selections = [];
        state.matches = 0;
        state.moves = 0;
        state.time = 0;
        
        movesDisplay.textContent = 0;
        timeDisplay.textContent = 0;
        
        stopTimer();
        
        board.innerHTML = ''; // Vide le plateau
        overlay.classList.add('hidden');
        
        createBoard();
        startTimer();
    }

    function startTimer() {
        stopTimer();
        state.timerInterval = setInterval(() => {
            state.time++;
            timeDisplay.textContent = state.time;
        }, 1000);
    }

    function stopTimer() {
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
    }

    function createBoard() {
        // Double les cartes et mélange
        const tiles = shuffleArray([...tileOptions, ...tileOptions]);
        
        tiles.forEach((tileType, index) => {
            const tile = buildTile(tileType, index);
            board.appendChild(tile);
            
            // Animation d'apparition
            setTimeout(() => {
                tile.classList.add('visible');
            }, index * 50);
        });

        state.boardLocked = false;
    }

    function buildTile(option, id) {
        // Crée la structure HTML de la carte
        const tile = document.createElement('div');
        tile.classList.add('cube');
        tile.setAttribute('data-tile', option);
        tile.setAttribute('data-id', id);

        const faceFront = document.createElement('div');
        faceFront.classList.add('face', 'front');
        
        const faceBack = document.createElement('div');
        faceBack.classList.add('face', 'back');
        faceBack.textContent = '?'; // Point d'interrogation au dos

        tile.appendChild(faceFront);
        tile.appendChild(faceBack);

        tile.addEventListener('click', () => selectTile(tile));

        return tile;
    }

    function selectTile(selectedTile) {
        if (state.boardLocked || selectedTile.classList.contains('flipped') || selectedTile.classList.contains('matched')) return;

        selectedTile.classList.add('flipped');
        
        state.selections.push(selectedTile);

        if (state.selections.length === 2) {
            checkMatch();
        }
    }

    function checkMatch() {
        state.boardLocked = true;
        state.moves++;
        movesDisplay.textContent = state.moves;

        const card1 = state.selections[0];
        const card2 = state.selections[1];

        if (card1.dataset.tile === card2.dataset.tile) {
            // MATCH !
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                state.selections = [];
                state.boardLocked = false;
                state.matches++;

                if (state.matches === tileOptions.length) {
                    gameWon();
                }
            }, 600);
        } else {
            // PAS MATCH
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                state.selections = [];
                state.boardLocked = false;
            }, 1000);
        }
    }

    function gameWon() {
        stopTimer();
        setTimeout(() => {
            overlay.classList.remove('hidden');
        }, 500);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Lancement initial
    startGame();
});