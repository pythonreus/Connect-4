// if value === 0 : empty, if value === 1 : blue, else : red
        let board = [
            [0, 0, 0, 0, 0, 0, 0], // Row 1
            [0, 0, 0, 0, 0, 0, 0], // Row 2
            [0, 0, 0, 0, 0, 0, 0], // Row 3
            [0, 0, 0, 0, 0, 0, 0], // Row 4
            [0, 0, 0, 0, 0, 0, 0], // Row 5
            [0, 0, 0, 0, 0, 0, 0]  // Row 6
        ];

        let player = 1;

        function playerMove(player,col,board){
           for(let i = board.length - 1; i >= 0; i--){
                if(board[i][col] === 0){
                    board[i][col] = player;

                    drawBoard(board);

                    if(checkGameState(board)){
                        setTimeout(() => {
                            displayWinner(player);

                             setTimeout(() => {
                                removeWinner();
                                resetBoard(); // Clear the board after 100ms
                            }, 4000);

                        }, 100); // Delay to ensure the board is updated before alert
                    }
                    return true;
                }
           }
           alert("The column is full!");
           return false;
        }

        function displayWinner(player){
            let winnerDisplay = document.querySelector(".winner");
            player === 1 ? winnerDisplay.innerText = "Player 1 wins!" : winnerDisplay.innerText = "Player 2 wins!";

            winnerDisplay.style.display = "block";
        }

        function displayDraw(){
            let drawDisplay = document.querySelector(".draw");
            drawDisplay.innerText = "It's a Draw!";
            drawDisplay.style.display = "block";
        }

        function removeDraw(){
            document.querySelector(".draw").style.display = "none";
        }

        function removeWinner(){
            document.querySelector(".winner").style.display = "none";
        }

        function switchPlayer(){
            // if player is 1 then set player to 2 and vicw versa
            player = player === 1 ? 2 : 1;
            document.querySelector('.status').innerText = player === 1 ? "Player 1's Turn" : "Player 2's Turn";
        }

        function drawBoard(board){
            //creating the table
            const table = document.getElementById('grid-table');
            // Set the number of rows and columns
            const rows = 6;
            const cols = 7;

            // Clear the table before drawing
            table.innerHTML = '';

            //looping through the rows
            for(let iRow = 0 ; iRow < rows; iRow++){
                const row = document.createElement('tr');

                //looping through the columns
                for(let iCol = 0; iCol < cols; iCol++){
                    const cell = document.createElement('td'); // Create a new cell
                    const circleDiv = document.createElement('div'); // Create a new circle div
                    circleDiv.classList.add('circle'); // Add the 'circle' class to make it circular
                    cell.appendChild(circleDiv);

                    cell.addEventListener('click', () => {
                        if(playerMove(player,iCol,board)){
                            switchPlayer();
                        }
                           
                     });

                    if(board[iRow][iCol] === 1){
                        color = 'blue';
                    }else if(board[iRow][iCol] === 2){
                        color = 'red';
                    }else{
                        color = 'gray';
                    }
                    circleDiv.style.backgroundColor = color;

                    row.appendChild(cell);

                }
                table.appendChild(row);
            }
            

        }

        function checkGameState(board){
            return checkWinState(board);
        }

        function checkWinState(board){
            return checkRow(board) || checkCol(board) || checkDiag(board);
        }

        function checkDrawState(board){
            for(let i = 0; i < board.length; i++){
                for(let j = 0; j < board[0].length; j++){
                    if (board[i][j] === 0){
                        return false;
                    }
                }
            }
            return true;

        }

        function checkRow(board){
            for(let i = board.length - 1; i >= 0; i--){
                for(let j = 0; j <  board[i].length - 3; j++ ){
                    if (board[i][j] !== 0 && 
                        board[i][j] === board[i][j+1] && 
                        board[i][j] === board[i][j+2] && 
                        board[i][j] === board[i][j+3]) {
                        return true;
                    }
                }
            }
            return false;

        }

        function checkCol(board){
            for(let i = 0; i < board[0].length; i++){
                for(let j = 0; j < board.length - 3; j++ ){
                    if (board[j][i] !== 0 && 
                        board[j][i] === board[j+1][i] && 
                        board[j][i] === board[j+2][i] && 
                        board[j][i] === board[j+3][i]) {
                        return true;
                    }
                }
            }
            return false;


        }

        function checkDiag(board){
             // Check forward diagonals (bottom-left to top-right)
            for (let i = 3; i < 6; i++) {  // Start row at 3 because we need space for 4 pieces
                for (let j = 0; j < 4; j++) {  // Only go up to column 3 (so we have space for 4 pieces)
                    if (board[i][j] !== 0 &&  // Ensure the starting position is not empty
                        board[i][j] === board[i-1][j+1] &&  // Compare diagonal down-left to top-right
                        board[i][j] === board[i-2][j+2] && 
                        board[i][j] === board[i-3][j+3]) {
                        return true;  // Found a match
                    }
                }
            }

            // Check backward diagonals (top-left to bottom-right)
            for (let i = 0; i < 3; i++) {  // Start row at 0, up to row 2 for this type of diagonal
                for (let j = 0; j < 4; j++) {  // Only go up to column 3
                    if (board[i][j] !== 0 &&  // Ensure the starting position is not empty
                        board[i][j] === board[i+1][j+1] &&  // Compare diagonal top-left to bottom-right
                        board[i][j] === board[i+2][j+2] && 
                        board[i][j] === board[i+3][j+3]) {
                        return true;  // Found a match
                    }
                }
            }

            return false;  // No matching diagonals found

        }


        function resetBoard() {
            // Reset the board to initial state (6 rows and 7 columns with all zeros)
            board = [
                [0, 0, 0, 0, 0, 0, 0], // Row 1
                [0, 0, 0, 0, 0, 0, 0], // Row 2
                [0, 0, 0, 0, 0, 0, 0], // Row 3
                [0, 0, 0, 0, 0, 0, 0], // Row 4
                [0, 0, 0, 0, 0, 0, 0], // Row 5
                [0, 0, 0, 0, 0, 0, 0]  // Row 6
            ];

            player = 1;
            document.querySelector(".status").innerText = "Player 1's Turn";

            // Redraw the board with the new state (all zeros)
            drawBoard(board);
        }

        drawBoard(board);
        