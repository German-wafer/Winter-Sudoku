❄️ Mini Sudoku
A lightweight, winter-themed 4x4 Sudoku web game built with pure JavaScript, HTML, and CSS! Switch seamlessly between Emoji mode and classic Number mode, choose your difficulty, track your completion time, and celebrate victories with a confetti animation.

🌟 Features
4x4 Grid Gameplay: Fast-paced Sudoku designed around 2x2 sub-grids.

Emoji & Number Modes: Toggle between festive winter emojis (❄️, 🌲, ☕, ☃️) and standard numbers (1, 2, 3, 4).

Procedural Puzzle Generator: Generates unique, valid puzzles dynamically for every new game.

Difficulty Levels:

Easy: 7 starting clues

Medium: 5 starting clues

Hard: 3 starting clues

Real-time Conflict Highlights: Automatically flags duplicate entries within rows, columns, or 2x2 blocks.

Visual Cell Highlighting: Emphasizes the selected cell along with its corresponding row and column.

Built-in Timer: Tracks completion time from the moment a new game begins.

Victory Celebration: Triggers a confetti animation upon successfully solving a puzzle without errors.

📁 Project Structure
Plaintext
mini-sudoku/
├── index.html     # Game markup & CDN library imports
├── style.css      # Custom CSS styling & layout
└── app.js         # Core game logic, puzzle generation & DOM manipulation
🚀 Getting Started
Clone or Download this repository to your local machine.

Ensure all three files (index.html, style.css, app.js) are located in the same directory.

Open index.html in any modern web browser—no additional setup, server, or build step required!

🎮 How to Play
Select a difficulty level (Easy, Medium, or Hard) or click New Game to generate a puzzle.

Click on any empty cell on the 4x4 board.

Use the bottom keypad to insert a symbol (1-4 or an Emoji) or click ❌ to clear an edited cell.

Fill the entire board so that every row, column, and 2x2 block contains each symbol exactly once.

🛠️ Technologies Used
HTML5: Semantic structure and layout controls.

CSS3: Custom CSS variables, CSS Grid layout, and smooth UI transitions.

JavaScript (ES6+): Pure vanilla JavaScript for game logic, dynamic DOM creation, event handling, and conflict validation.

Canvas-Confetti: Loaded via CDN for victory animation effects.
