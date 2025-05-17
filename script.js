document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');

    // Chess piece Unicode symbols
    const blackPieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
    const whitePieces = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];

    // Create the chessboard
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.classList.add((row + col) % 2 === 0 ? 'white-tile' : 'black-tile');
            tile.id = ${row}-${col};

            // Place pieces on the board
            if (row === 0) tile.textContent = blackPieces[col];       // Black back row
            else if (row === 1) tile.textContent = '♟';              // Black pawns
            else if (row === 6) tile.textContent = '♙';               // White pawns
            else if (row === 7) tile.textContent = whitePieces[col];  // White back row

            // Make tiles draggable
            tile.setAttribute('draggable', true);
            
            // Add event listeners for drag and drop
            tile.addEventListener('dragstart', dragStart);
            tile.addEventListener('dragover', dragOver);
            tile.addEventListener('drop', dragDrop);

            chessboard.appendChild(tile);
        }
    }

    // Store the dragged piece
    let draggedPiece = null;

    function dragStart(e) {
        draggedPiece = e.target;
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    function dragOver(e) {
        e.preventDefault(); // Necessary to allow dropping
    }

    function dragDrop(e) {
        e.preventDefault();
        const targetTile = e.target;
        
        // Only move if target is empty or contains opponent's piece
        if (targetTile.textContent === '' || 
            isOpponentPiece(draggedPiece.textContent, targetTile.textContent)) {
            targetTile.textContent = draggedPiece.textContent;
            draggedPiece.textContent = '';
        }
    }

    function isOpponentPiece(piece1, piece2) {
        // Check if one piece is white and the other is black
        return (piece1 === piece1.toUpperCase() && piece2 === piece2.toLowerCase()) ||
               (piece1 === piece1.toLowerCase() && piece2 === piece2.toUpperCase());
    }
});
    
