import { useState, useEffect } from 'react';
import './Game.css';

function App() {
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState();
  const [isDraw, setIsDraw] = useState(false);
  const [winLine, setWinLine] = useState(null);
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  const updateCell = (row, col, value) => {
    if (board[row][col] || winner) return;
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => [...row]);
      newBoard[row][col] = value;
      return newBoard;
    });
  };

  const handleCellClick = (r, c) => {
    updateCell(r, c, turn);
  };

  const checkWinOrDraw = (board) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        setWinner(board[i][0]);
        setWinLine({ type: 'row', index: i });
        return;
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
        setWinner(board[0][i]);
        setWinLine({ type: 'col', index: i });
        return;
      }
    }
    // Check diagonals
    if (
      board[1][1] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      setWinner(board[1][1]);
      setWinLine({ type: 'diag', direction: 'main' }); 
      return;
    }
    if (
      board[1][1] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      setWinner(board[1][1]);
      setWinLine({ type: 'diag', direction: 'anti' }); 
      return;
    }

    // Check for draw 
    const allFilled = board.every(row => row.every(cell => cell !== null));
    if (allFilled) {
      setIsDraw(true);
    } else {
      setTurn(prev => (prev === 'X' ? 'O' : 'X')); 
    }
  };

  useEffect(() => {
    if (!winner) {
      checkWinOrDraw(board); 
    }
  }, [board]);



  const resetGame = () => {
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
    setWinner(undefined);
    setWinLine(null);
    setIsDraw(false);
    setTurn('O');
  };

  return (
    <>
      <header>
        <h1>Tic Tac Toe</h1>
      </header>

      <div className='board-container'>
        {winLine && (
          <div
            className={`win-line ${
              winLine.type === 'diag'
                ? `diag-${winLine.direction}`
                : `${winLine.type}-${winLine.index}`
            }`}
          />
        )}

        {board.flatMap((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className='cell'
              onClick={() => handleCellClick(r, c)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      {(winner || isDraw) && (
        <div className="popup">
          {winner ? `🎉 Player ${winner} wins!` : '🤝 It’s a draw!'}
        </div>
      )}

    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <button onClick={resetGame} style={{ padding: '10px 20px', fontSize: '1rem' }}>
        New Game
      </button>
    </div>

    </>
  );
}

export default App;
