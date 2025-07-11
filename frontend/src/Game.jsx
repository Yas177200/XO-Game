import { useState, useEffect } from 'react'
import './Game.css'

function App() {
  const [turn, setTurn] = useState('O');
  const [winner, setWinner] = useState('')
  const [board, setBoard] = useState(
    [
      [null,null,null],
      [null,null,null],
      [null,null,null]
  ]);
  const checkWin = (board) => {
    board.map((r, ri)=>
      r.map((c, ci)=>{
        // check for horizontal win: 
        if (
          board[ri][0] !== null && 
          board[ri][0] === board[ri][1] &&
          board[ri][0] === board[ri][2])
          {
            setWinner(`${turn}`); 
          }
        // check for vertical win: 
        if (
          board[0][ci] !== null && 
          board[0][ci] === board[1][ci] &&
          board[0][ci] === board[2][ci])
          {
            setWinner(`${turn}`); 
          }
        // check for diagonal win: 
        if (
          board[1][1] !== null && 
          board[1][1] === board[0][0] &&
          board[1][1] === board[2][2] ||
          board[1][1] !== null && 
          board[1][1] === board[0][2] &&
          board[1][1] === board[2][0])
          {
            setWinner(`${turn}`); 
          }
      })
    )
    if (turn === 'X') setTurn('O');
    else setTurn('X');
  }

  const updateCell = (row, col, value) => {
    if (board[row][col] || winner) return;
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => [...row]); 
      newBoard[row][col] = value;
      return newBoard;
    });
  };

  const handleCellClick = (r, c) => {
    updateCell(r, c, turn)
  }

  useEffect(() => {
    checkWin(board);
  }, [board]);

  useEffect(() => {
    if (winner) {
      alert(`Player ${winner} won!`);
    }
  }, [winner]);




  return (
    <>

    <div className='board-container'>
      {board.flatMap((row, r)=>
        row.map((cell, c)=> (
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

    </>
  )
}

export default App
