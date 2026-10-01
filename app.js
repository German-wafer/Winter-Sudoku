const EMOJIS = ['❄️', '🌲', '☕', '☃️'];
let isEmojiMode = true;
let selectedCellIndex = null;

// Game State 
let solutionBoard = [];
let currentPuzzle = [];
let boardValues = [];

// Timer State
let timerInterval = null;
let secondsElapsed = 0;

// DOM elements
const boardElement = document.getElementById('board');
const keypadElement = document.getElementById('keypad');
const statusMsgElement = document.getElementById('status-msg');
const modeToggleBtn = document.getElementById('mode-toggle');
const newGameBtn = document.getElementById('new-game-btn');
const difficultySelect = document.getElementById('difficulty-select');
const timerDisplay = document.getElementById('timer-display');

// Helper: Turn number 1-4 into emoji or string
function getSymbol(value) {
    if (value === 0) return '';
    return isEmojiMode ? EMOJIS[value - 1] : value.toString();
}

// 1. Procedural Puzzle Generator
function generateNewPuzzle() {
    // Base solved 4x4 Sudoku board
    const baseBoard = [
        1, 2, 3, 4,
        3, 4, 1, 2,
        2, 1, 4, 3,
        4, 3, 2, 1
    ];

    //Randonly remap values 1-4
    const nums = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
    solutionBoard = baseBoard.map(n => nums[n - 1]);

    // Apply random row swaps withing 2x2 blocks
    if (Math.random() > 0.5) {
        for (let i = 0; i < 4; i++) {
            let temp = solutionBoard[i];
            solutionBoard[i] = solutionBoard[i + 4];
            solutionBoard[i + 4] = temp;
        }
    }

    // Mask out clues based on difficulty 
    const difficulty = difficultySelect ? difficultySelect.value : 'medium';
    let cluesCount = 7; // Easy
    if (difficulty === 'medium') cluesCount = 5;
    if (difficulty === 'hard') cluesCount = 3;

    currentPuzzle = [...solutionBoard];
    let indices = Array.from({ length: 16 }, (_, i) => i).sort(() => Math.random() - 0.5);
    let removed = 0;

    for (let idx of indices) {
        if (removed >= (16 - cluesCount)) break;
        currentPuzzle[idx] = 0;
        removed++;
    }

    boardValues = [...currentPuzzle];
    selectedCellIndex = null;
    statusMsgElement.textContent = 'Select a cell to begin!';
    startTimer();
    renderBoard();
}

//2. Timer Functions
function startTimer() {
    clearInterval(timerInterval);
    secondsElapsed = 0;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        secondsElapsed++;
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
    const secs = String(secondsElapsed % 60).padStart(2, '0');
    if (timerDisplay) {
        timerDisplay.textContent = `⏱️ ${mins}:${secs}`;
    }
}

//3. Conflict Detection
function findConflicts() {
    const conflicts = new Set();

    for (let i = 0; i < 16; i++) {
        const val = boardValues[i];
        if (val === 0) continue;

        const row = Math.floor(i / 4);
        const col = i % 4;
        const boxRow = Math.floor(row / 2);
        const boxCol = Math.floor(col / 2);

        for (let j = 0; j < 16; j++) {
            if (i === j) continue;
            const otherVal = boardValues[j];
            if (otherVal === 0) continue;

            const r2 = Math.floor(j / 4);
            const c2 = j % 4;
            const bR2 = Math.floor(r2 / 2);
            const bC2 = Math.floor(c2 / 2);

            // Same row, column, or 2x2 box duplicate
            if (val === otherVal && (row === r2 || col === c2 || (boxRow === bR2 && boxCol === bC2))) {
                conflicts.add(i);
                conflicts.add(j);
            }
        }
    }
    return conflicts;
}

//4. Render Board & Highlight States
function renderBoard() {
    boardElement.innerHTML = '';
    const conflicts = findConflicts();

    const selRow = selectedCellIndex !== null ? Math.floor(selectedCellIndex / 4) : null;
    const selCol = selectedCellIndex !== null ? selectedCellIndex % 4 : null;


    boardValues.forEach((val, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;

        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.dataset.row = row;
        cell.dataset.col = col;

        if (currentPuzzle[index] !== 0) {
            cell.classList.add('given');
        }

        // Highlight selected cell
        if (index === selectedCellIndex) {
            cell.classList.add('selected');
        }

        // Highlight row & col of selected cell 
        else if (selRow !== null && (row === selRow || col === selCol)) {
            cell.classList.add('related')
        }

        // Apply error highlight if conflicting 
        if (conflicts.has(index)) {
            cell.classList.add('error');
        }

        cell.textContent = getSymbol(val);
        cell.addEventListener('click', () => handleCellSelect(index));
        boardElement.appendChild(cell);
    });

    checkWinState(conflicts);
}

//5. Check Victory Condition
function checkWinState(conflicts) {
    if (boardValues.includes(0)) return; // Still empty cells

    if (conflicts.size === 0) {
        clearInterval(timerInterval);
        statusMsgElement.textContent = '🎉 You solved the Sudoku!';

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }
}

//Render Input Keypad
function renderKeypad() {
    keypadElement.innerHTML = '';

    for (let i = 1; i <= 4; i++) {
        const btn = document.createElement('button');
        btn.classList.add('key-btn');
        btn.textContent = getSymbol(i);
        btn.addEventListener('click', () => handleInput(i));
        keypadElement.appendChild(btn);
    }

    const eraseBtn = document.createElement('button');
    eraseBtn.classList.add('key-btn');
    eraseBtn.textContent = '❌';
    eraseBtn.addEventListener('click', () => handleInput(0));
    keypadElement.appendChild(eraseBtn);
}

// Handle cell selection
function handleCellSelect(index) {
    selectedCellIndex = index;
    renderBoard();
    statusMsgElement.textContent = `Selected Cell ${index + 1}`;
}

// Handle input placement
function handleInput(val) {
    if (selectedCellIndex === null) {
        statusMsgElement.textContent = 'Please select a cell first!';
        return;
    }
    if (currentPuzzle[selectedCellIndex] !== 0) {
        statusMsgElement.textContent = "You cant edit starting clues!";
        return;
    }

    boardValues[selectedCellIndex] = val;
    renderBoard();
}

// MOde Toggle Listener (Emoji vs Numbers)
if (modeToggleBtn) {
    modeToggleBtn.addEventListener('click', () => {
        isEmojiMode = !isEmojiMode;
        modeToggleBtn.textContent = isEmojiMode ? 'Mode: ❄️ Emoji' : 'Mode: 🔢 Numbers';
        renderBoard();
        renderKeypad();
    })
}

// Event listeners for New Game button and difficulty dropdown
if (newGameBtn) {
    newGameBtn.addEventListener('click', generateNewPuzzle);
}

if (difficultySelect) {
    difficultySelect.addEventListener('change', generateNewPuzzle)
}

generateNewPuzzle();
renderKeypad();