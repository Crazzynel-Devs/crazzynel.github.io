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
    if (!livesDisplay) {
      const difficultySelector = document.getElementById('difficulty-selector');
      const display = document.createElement('div');
      display.id = 'lives-display';
      display.textContent = `Vies: ${this.lives}`;
      difficultySelector.insertAdjacentElement('afterend', display);
    } else {
      livesDisplay.textContent = `Vies: ${this.lives}`;
    }
  }

  initializeBoard() {
    const table = document.getElementById('sudoku-board');
    table.addEventListener('input', (e) => {
      if (e.target.tagName === 'TD') {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        const value = parseInt(e.target.textContent) || 0;
        this.board[row][col] = value;
        this.validateBoard();
      }
    });
  }

  initializeEvents() {
    document.getElementById('generate-button').addEventListener('click', () => this.generateNewPuzzle());
    document.getElementById('solve-button').addEventListener('click', () => this.solvePuzzle());
  }

  generateNewPuzzle() {
    this.clearBoard();
    this.lives = 5;
    this.gameOver = false;
    this.updateLivesDisplay();

    // Generate complete solution first
    this.generateBase();
    this.solution = this.board.map(row => [...row]);

    // Remove numbers based on difficulty
    const difficulty = document.getElementById('difficulty').value;
    const cellsToRemove = {
      easy: 40,
      medium: 50,
      hard: 60
    }[difficulty];

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
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }

    // Check box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  }

  validateBoard() {
    if (this.gameOver) return;

    const currentCell = event.target;
    if (!currentCell || !currentCell.textContent) return;

    const row = parseInt(currentCell.dataset.row);
    const col = parseInt(currentCell.dataset.col);
    const value = parseInt(currentCell.textContent);

    if (value) {
      if (this.solution && value !== this.solution[row][col]) {
        this.lives--;
        this.updateLivesDisplay();
        currentCell.classList.add('invalid');

        if (this.lives <= 0) {
          this.gameOver = true;
          alert('Game Over! Vous avez perdu toutes vos vies!');
          cells.forEach(cell => cell.contentEditable = 'false');
        }
      } else {
        currentCell.classList.remove('invalid');
        currentCell.classList.add('initial');
        currentCell.contentEditable = 'false';
      }
    }
  }

  getRow(row) {
    return this.board[row];
  }

  getColumn(col) {
    return this.board.map(row => row[col]);
  }

  getBox(boxRow, boxCol) {
    const values = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        values.push(this.board[boxRow * 3 + i][boxCol * 3 + j]);
      }
    }
    return values;
  }

  hasValidationError(values) {
    const numbers = new Map();
    for (const value of values) {
      if (value !== 0) {
        if (numbers.has(value)) return true;
        numbers.set(value, true);
      }
    }
    return false;
  }

  displayBoard() {
    const cells = document.querySelectorAll('#sudoku-board td');
    cells.forEach(cell => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      const value = this.board[row][col];
      cell.textContent = value || '';
      cell.contentEditable = value === 0 ? 'true' : 'false';
      cell.className = value === 0 ? '' : 'initial';
    });
  }

  solvePuzzle() {
    if (this.solution) {
      this.board = this.solution.map(row => [...row]);
      this.displayBoard();
      this.stopTimer();
    }
  }

  clearBoard() {
    this.board = Array(9).fill().map(() => Array(9).fill(0));
    this.solution = null;
    this.lives = 5;
    this.gameOver = false;
    this.updateLivesDisplay();
    this.displayBoard();
    this.stopTimer();
    this.timer = 0;
    document.getElementById('timer').textContent = 'Temps: 00:00';
  }

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.timer++;
      const minutes = Math.floor(this.timer / 60).toString().padStart(2, '0');
      const seconds = (this.timer % 60).toString().padStart(2, '0');
      document.getElementById('timer').textContent = `Temps: ${minutes}:${seconds}`;
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}

window.addEventListener('load', () => {
  const game = new SudokuGame();
  game.generateNewPuzzle();
});