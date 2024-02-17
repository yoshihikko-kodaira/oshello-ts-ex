import styles from './index.module.css';
import React, { useState, useMemo } from 'react';

const Home = () => {

  const [turn, setTurn] = useState(1);

  const [board, setBoard] = useState(
    [
      [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
      [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
      [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
      [[0,0],[0,0],[0,0],[1,0],[2,0],[0,0],[0,0],[0,0]],
      [[0,0],[0,0],[0,0],[2,0],[1,0],[0,0],[0,0],[0,0]],
      [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
      [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
      [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    ]
  );


  const directions = [
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
  ];




  const handleCellClick = (x: number, y: number) => {
    const newArr = [...board];
    if (newArr[y][x][0] === 0) {
      for (const direction of directions) {
        for (let d = 1; d < 8; d++) {
          if(newArr[y+direction[0]*d]===undefined){
            break;
          }else{
            if(newArr[y+direction[0]*d][x +direction[1]*d][0]===undefined){
              break;
            }else if(newArr[y+direction[0]*d][x +direction[1]*d][0]===0){
              break;
            }else if(newArr[y+direction[0]*d][x +direction[1]*d][0]===turn){
              if(d>1){
                for(let back = d;back >= 0;back--){
                  newArr[y+direction[0]*back][x+direction[1]*back][0] =turn;
                }
                setBoard(newArr);
                setTurn(3 - turn);
                
              }
              break;
            }
          }

        }
      }
      

    }

    console.log(board)

  }



  return (
    <div className={styles.container}>
    <h1>{turn===1?"黒のターン":"白のターン"}</h1>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div onClick={() => handleCellClick(x, y)} className={styles.cell} key={`${x}-${y}`}>
              {cell[0]===1?<div className={styles.stone} style={{backgroundColor:"black"}} />:cell[0]===2?<div className={styles.stone} style={{backgroundColor:"white"}} />:<></>}
              
            </div>
          )))
        }
      </div>
    </div>
  );
};

export default Home;
