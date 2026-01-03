// assets/js/sudoku.js

class SudokuGame {
    constructor() {
        this.board = Array(9).fill().map(() => Array(9).fill(0));
        this.solution = null;
        this.timer = 0;
        this.timerInterval = null;
        this.lives = 5;
        this.gameOver = false;
        
        this.initializeBoard();
        this.initializeEvents();
        this.updateLivesDisplay();
    }
  
    updateLivesDisplay() {
        const livesDisplay = document.getElementById('lives-display');
        if (livesDisplay) {
            livesDisplay.textContent = `❤️ Vies: ${this.lives}`;
        }
    }
  
    initializeBoard() {
        const table = document.getElementById('sudoku-board');
        if (table) {
            table.addEventListener('input', (e) => this.validateBoard(e));
            // Empêcher les lettres, n'autoriser que les chiffres 1-9
            table.addEventListener('keydown', (e) => {
                if (e.target.tagName === 'TD' && e.target.isContentEditable) {
                    const key = e.key;
                    // Autoriser chiffres 1-9, Backspace, Arrow keys, Tab
                    const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete'];
                    if (!allowed.includes(key) && (isNaN(key) || key === '0' || key === ' ')) {
                        e.preventDefault();
                    }
                    // Limiter à 1 caractère
                    if (!allowed.includes(key) && e.target.textContent.length > 0) {
                       e.preventDefault();
                       e.target.textContent = key; // Remplace si déjà rempli
                       this.validateBoard({ target: e.target }); // Force validation
                    }
                }
            });
        }
    }
  
    initializeEvents() {
        const genBtn = document.getElementById('generate-button');
        const solveBtn = document.getElementById('solve-button');
        
        if(genBtn) genBtn.addEventListener('click', () => this.generateNewPuzzle());
        if(solveBtn) solveBtn.addEventListener('click', () => this.solvePuzzle());
    }
  
    generateNewPuzzle() {
        this.clearBoard();
        this.lives = 5;
        this.gameOver = false;
        this.updateLivesDisplay();
    
        this.generateBase();
        this.solution = this.board.map(row => [...row]);
    
        const difficulty = document.getElementById('difficulty').value;
        const cellsToRemove = { easy: 30, medium: 45, hard: 55 }[difficulty] || 30; // Ajusté pour le fun
    
        this.removeNumbers(cellsToRemove);
        this.displayBoard();
        this.startTimer();
    }
  
    generateBase() {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.board[0] = this.shuffle([...numbers]);
        this.solveSudoku(this.board);
    }
  
    removeNumbers(count) {
        const positions = this.shuffle(Array(81).fill().map((_, i) => i));
        for (let i = 0; i < count; i++) {
            const pos = positions[i];
            const row = Math.floor(pos / 9);
            const col = pos % 9;
            this.board[row][col] = 0;
        }
    }
  
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
  
    solveSudoku(board) {
        const empty = this.findEmptyCell(board);
        if (!empty) return true;
    
        const [row, col] = empty;
        for (let num = 1; num <= 9; num++) {
            if (this.isValid(board, row, col, num)) {
                board[row][col] = num;
                if (this.solveSudoku(board)) return true;
                board[row][col] = 0;
            }
        }
        return false;
    }
  
    findEmptyCell(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) return [row, col];
            }
        }
        return null;
    }
  
    isValid(board, row, col, num) {
        for (let x = 0; x < 9; x++) if (board[row][x] === num) return false;
        for (let x = 0; x < 9; x++) if (board[x][col] === num) return false;
        
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] === num) return false;
            }
        }
        return true;
    }
  
    validateBoard(event) {
        if (this.gameOver || !event || !event.target) return;
    
        const currentCell = event.target;
        if (currentCell.tagName !== 'TD') return;

        // Nettoyage de l'entrée (supprimer espaces ou non-chiffres)
        const text = currentCell.textContent.replace(/[^1-9]/g, '').substring(0, 1);
        if (currentCell.textContent !== text) {
            currentCell.textContent = text; // Force le chiffre propre
        }

        const row = parseInt(currentCell.dataset.row);
        const col = parseInt(currentCell.dataset.col);
        const value = parseInt(text);
    
        if (value) {
            if (this.solution && value !== this.solution[row][col]) {
                this.lives--;
                this.updateLivesDisplay();
                currentCell.classList.add('invalid');
                // Animation CSS
                currentCell.style.animation = 'none';
                currentCell.offsetHeight; /* trigger reflow */
                currentCell.style.animation = 'shake 0.3s';
    
                if (this.lives <= 0) {
                    this.gameOver = true;
                    this.stopTimer();
                    alert('Game Over! Vous avez perdu toutes vos vies!');
                    const cells = document.querySelectorAll('#sudoku-board td');
                    cells.forEach(cell => cell.contentEditable = 'false');
                }
            } else {
                currentCell.classList.remove('invalid');
                currentCell.classList.add('initial'); // Marquer comme bon/fixe
                currentCell.contentEditable = 'false'; // Verrouiller la case correcte
                
                // Vérifier la victoire
                this.checkWin();
            }
        }
    }

    checkWin() {
        const cells = document.querySelectorAll('#sudoku-board td');
        let filled = 0;
        cells.forEach(c => {
            if(c.textContent !== '') filled++;
        });
        if(filled === 81 && this.lives > 0) {
            this.stopTimer();
            alert("Félicitations ! Vous avez gagné ! 🎉");
            this.gameOver = true;
        }
    }
  
    displayBoard() {
        const cells = document.querySelectorAll('#sudoku-board td');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const value = this.board[row][col];
            
            cell.textContent = value || '';
            cell.classList.remove('invalid', 'initial');
            
            if (value !== 0) {
                cell.contentEditable = 'false';
                cell.classList.add('initial');
            } else {
                cell.contentEditable = 'true';
            }
        });
    }
  
    solvePuzzle() {
        if (this.solution) {
            if(confirm("Voulez-vous vraiment voir la solution ? Cela termine la partie.")) {
                this.board = this.solution.map(row => [...row]);
                this.displayBoard();
                this.stopTimer();
                this.gameOver = true;
            }
        }
    }
  
    clearBoard() {
        this.board = Array(9).fill().map(() => Array(9).fill(0));
        this.solution = null;
        this.displayBoard();
        this.stopTimer();
        const t = document.getElementById('timer');
        if(t) t.textContent = '⏱️ 00:00';
    }
  
    startTimer() {
        this.stopTimer();
        this.timer = 0;
        this.timerInterval = setInterval(() => {
            this.timer++;
            const minutes = Math.floor(this.timer / 60).toString().padStart(2, '0');
            const seconds = (this.timer % 60).toString().padStart(2, '0');
            const t = document.getElementById('timer');
            if(t) t.textContent = `⏱️ ${minutes}:${seconds}`;
        }, 1000);
    }
  
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
  }
  
  // Lancer le jeu au chargement
  window.addEventListener('load', () => {
      const game = new SudokuGame();
      game.generateNewPuzzle();
  });