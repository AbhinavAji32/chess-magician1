document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    let currentPlayer = 'white';
    let draggedPiece = null;

    // Initialize the board
    function initializeBoard() {
        const blackPieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
        const whitePieces = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                tile.classList.add((row + col) % 2 === 0 ? 'white-tile' : 'black-tile');
                tile.id = ${row}-${col};

                // Place pieces
                if (row === 0) tile.textContent = blackPieces[col];
                else if (row === 1) tile.textContent = '♟';
                else if (row === 6) tile.textContent = '♙';
                else if (row === 7) tile.textContent = whitePieces[col];

                // Add drag events
                tile.setAttribute('draggable', true);
                tile.addEventListener('dragstart', dragStart);
                tile.addEventListener('dragover', dragOver);
                tile.addEventListener('drop', dragDrop);
         tile.addEventListener('dragend', dragEnd);

                chessboard.appendChild(tile);
            }
        }
    }

    // Drag and drop functions
    function dragStart(e) {
        draggedPiece = e.target;
        e.dataTransfer.setData('text/plain', e.target.id);
        
        // Highlight possible moves
        if (isValidPiece(e.target.textContent)) {
            showPossibleMoves(e.target.textContent, e.target);
        }
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragDrop(e) {
        e.preventDefault();
        const targetTile = e.target;
        
        // Check if it's a valid move
        if (isValidMove(draggedPiece, targetTile)) {
            // Make the move
            targetTile.textContent = draggedPiece.textContent;
            draggedPiece.textContent = '';
            
            // Switch turns
            currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
            updateGameStatus();
        }
    }

    function dragEnd() {
        // Clear highlights
        document.querySelectorAll('.tile').forEach(tile => {
            tile.classList.remove('possible-move', 'capture-move');
        });
    }

    // Game logic functions
    function isValidPiece(piece) {
        if (!piece) return false;
        const pieceColor = piece === piece.toUpperCase() ? 'white' : 'black';
        return pieceColor === currentPlayer;
    }

    function isValidMove(fromTile, toTile) {
        if (!fromTile.textContent) return false;
        
        const piece = fromTile.textContent;
        const [fromRow, fromCol] = fromTile.id.split('-').map(Number);
        const [toRow, toCol] = toTile.id.split('-').map(Number);
        const pieceColor = piece === piece.toUpperCase() ? 'white' : 'black';
        const targetPiece = toTile.textContent;
        
        // Check if it's the player's piece
        if (pieceColor !== currentPlayer) return false;
        
        // Check if target is same color
        if (targetPiece && (targetPiece === targetPiece.toUpperCase()) === (piece === piece.toUpperCase())) {
         return false;
        }

        // Basic movement rules
        if (piece === '♙' || piece === '♟') { // Pawns
            const direction = piece === '♙' ? -1 : 1;
            
            // Forward move
            if (fromCol === toCol && !targetPiece) {
                // Single move forward
                if (toRow === fromRow + direction) return true;
                // Double move from starting position
                if ((piece === '♙' && fromRow === 6 && toRow === 4 && !document.getElementById('5-'+fromCol).textContent) || 
                    (piece === '♟' && fromRow === 1 && toRow === 3 && !document.getElementById('2-'+fromCol).textContent)) {
                    return true;
                }
            }
            // Capture
            if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow + direction && targetPiece) {
                return true;
            }
            return false;
        }
        
        // Add rules for other pieces here...
        return true; // Temporarily allow all other moves
    }

    function showPossibleMoves(piece, fromTile) {
       clearHighlights();
        
        if (!isValidPiece(piece)) return;
        
        const [fromRow, fromCol] = fromTile.id.split('-').map(Number);
        
        // Highlight all possible moves (simplified)
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const tile = document.getElementById(${row}-${col});
                if (isValidMove(fromTile, tile)) {
                    tile.classList.add(tile.textContent ? 'capture-move' : 'possible-move');
                }
            }
        }
    }

    function clearHighlights() {
        document.querySelectorAll('.tile').forEach(tile => {
            tile.classList.remove('possible-move', 'capture-move');
        });
    }

    function updateGameStatus() {
        document.getElementById('game-status').textContent = ${currentPlayer}'s turn;
    }

    // Initialize the game
    initializeBoard();
});
