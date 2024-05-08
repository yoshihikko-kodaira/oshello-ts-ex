import { useEffect, useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turn, setTurn] = useState(1);
  const [cpu, setCpu] = useState(0);

  const [board, setBoard] = useState([
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [2, 0],
      [1, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
  ]);

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

  useEffect(() => {
    const newArr = [...board];
    const placeAble = [];
    let count: number;
    let whiteCount = 0;
    let BrackCount = 0;
    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 8; i++) {
        newArr[i][j][1] = 0;
        if (newArr[i][j][0] === 1) {
          BrackCount++;
        } else if (newArr[i][j][0] === 2) {
          whiteCount++;
        }

        if (newArr[i][j][0] === 0) {
          for (const direction of directions) {
            for (let d = 1; d < 8; d++) {
              if (newArr[i + direction[0] * d] === undefined) {
                break;
              } else {
                if (newArr[i + direction[0] * d][j + direction[1] * d] === undefined) {
                  break;
                } else if (newArr[i + direction[0] * d][j + direction[1] * d][0] === 0) {
                  break;
                } else if (newArr[i + direction[0] * d][j + direction[1] * d][0] === turn) {
                  if (d > 1) {
                    newArr[i][j][1] = 1;
                    count = 0;
                    placeAble.push([i, j]);
                  }
                  break;
                }
              }
            }
          }
        }
      }
      console.log('test');
    }
    setBoard(newArr);

    if (placeAble.length === 0) {
      count = 1;
      if (count === 1) {
        if (BrackCount > whiteCount) {
          console.log('Win Brack');
        } else if (whiteCount > BrackCount) {
          console.log('win white');
        } else {
          console.log('doro');
        }
        return;
      }
      setTurn(3 - turn);
    }
  }, [turn]);

  const handleCellClick = (x: number, y: number) => {
    const newArr = [...board];
    if (newArr[y][x][0] === 0) {
      for (const direction of directions) {
        for (let d = 1; d < 8; d++) {
          if (newArr[y + direction[0] * d] === undefined) {
            break;
          } else {
            if (newArr[y + direction[0] * d][x + direction[1] * d] === undefined) {
              break;
            } else if (newArr[y + direction[0] * d][x + direction[1] * d][0] === 0) {
              break;
            } else if (newArr[y + direction[0] * d][x + direction[1] * d][0] === turn) {
              if (d > 1) {
                for (let back = d; back >= 0; back--) {
                  newArr[y + direction[0] * back][x + direction[1] * back][0] = turn;
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

    //console.log(board)
  };

  return (
    <div className={styles.container}>
      <h1>{turn === 1 ? '黒のターン' : '白のターン'}</h1>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div onClick={() => handleCellClick(x, y)} className={styles.cell} key={`${x}-${y}`}>
              {cell[0] === 1 ? (
                <div className={styles.stone} style={{ backgroundColor: 'black' }} />
              ) : cell[0] === 2 ? (
                <div className={styles.stone} style={{ backgroundColor: 'white' }} />
              ) : (
                <></>
              )}
              {cell[1] === 1 ? (
                <div className={styles.placable} style={{ backgroundColor: 'gray' }} />
              ) : (
                <></>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
