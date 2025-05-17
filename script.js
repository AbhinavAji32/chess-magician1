document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    
    // Loop to create 8x8 chessboard tiles
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const tile = document.createElement('div'); // Creates a new tile
            tile.classList.add('tile'); // Adds the 'tile' class
            
            // Alternates between black and white tiles
            if ((row + col) % 2 === 0) {
                tile.classList.add('white-tile');
            } else {
                tile.classList.add('black-tile');
            }
            
            tile.id = ${row}-${col}; // Gives each tile a unique ID (e.g., "0-0", "3-4")
            chessboard.appendChild(tile); // Adds the tile to the chessboard
        }
    }
    
    // TODO: Add chess pieces and movement logic later
});
