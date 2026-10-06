# Winter Sudoku

4×4 Sudoku game. Play using classic numbers or emojis.

## Features

* **Different Modes:** toggle between Emojis and Numbers without losing progress.
* **Difficulty Selection:** Play on Easy, Medium, or Hard with varying numbers of starting clues.
* conflict detection for duplicate values in any row, column, or 2×2 box.
* active timer, cell highlighting, dynamic keypad, and victory confetti.

## How the Logic Works

*  The board is tracked internally as a 1D array of 16 indices (`0–15`).
*  Every placement checks $i \bmod 4$ (column), $\lfloor i / 4 \rfloor$ (row), and its corresponding 2×2 box quadrant for unique values `1–4`.
*  Board logic operates strictly on numbers `1–4`; the UI simply maps those values to emojis during render.

## Built with

* **HTML5**: Game layout & DOM elements
* **CSS3**: Card-based grid system & error animations
* **JavaScript**: Matrix state management, validation logic & timer

## What I Learned

* Keeping the game logic as plain numbers while switching display themes on top.
* Grid Index Math: Using array math (i % 4 and Math.floor(i / 4)) to calculate rows, columns, and sub-grids.
* Mapping individual cell indices to check for duplicates in each 2×2 box.
* Keeping track of original clues versus player inputs across board resets.


