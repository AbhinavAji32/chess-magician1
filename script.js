// Wait until the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the chessboard container element
    const chessboard = document.getElementById('chessboard');

    // Define the starting positions of major pieces (rooks, knights, etc.)
    const blackMajorPieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
    const whiteMajorPieces = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];

    // Create an 8x8 chessboard
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            // Create a tile (square) for each position
            const tile = document.createElement('div');
            tile.classList.add('tile');
            
            // Alternate between white and black tiles
            tile.classList.add((row + col) % 2 === 0 ? 'white-tile' : 'black-tile');
            
            // Give each tile a unique ID (e.g., "0-0" to "7-7")
            tile.id = ${row}-${col};

            // Place pieces on their starting positions
            if (row === 0) {
                // Black back row (rooks, knights, bishops, etc.)
                tile.textContent = blackMajorPieces[col];
            } else if (row === 1) {
                // Black pawns
                tile.textContent = '♟';
            } else if (row === 6) {
                // White pawns
                tile.textContent = '♙';
            } else if (row === 7) {
                // White back row
                tile.textContent = whiteMajorPieces[col];
        }

            // Add the tile to the chessboard
            chessboard.appendChild(tile);
        }
    }
});
