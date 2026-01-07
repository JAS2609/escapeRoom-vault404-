import React, { useState, useEffect,useMemo } from 'react';

const COLS = 41;
const ROWS = 25;




const MazeGame = ({ onComplete }: { onComplete: () => void }) => {
  const [position, setPosition] = useState({ x: 1, y: 1 });
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const getCellSize = () => {
  if (window.innerWidth < 500) return 4;  
  if (window.innerWidth < 768) return 6;   
  if (window.innerWidth < 1024) return 7;  
  return 8;                                
};

const [cellSize, setCellSize] = useState(getCellSize());
useEffect(() => {
  if (position.x === 3 && position.y === 3) {
    onComplete();
  }
}, []);
useEffect(() => {
  const onResize = () => setCellSize(getCellSize());
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);

  
  const MAZE_SEED = 12;

// const generateMaze = (seed: number) => {
//   let seedValue = seed;
//   const seededRandom = () => {
//     seedValue = (seedValue * 9301 + 49297) % 233280;
//     return seedValue / 233280;
//   };

//   const m = Array(ROWS).fill(null).map(() => Array(COLS).fill(1));

//   // ------------------
//   // 1) Perfect maze
//   // ------------------
//   const carve = (x: number, y: number) => {
//     const dirs = [[0, -2], [2, 0], [0, 2], [-2, 0]].sort(
//       () => seededRandom() - 0.5
//     );

//     for (let [dx, dy] of dirs) {
//       const nx = x + dx;
//       const ny = y + dy;

//       if (nx > 0 && nx < COLS - 1 && ny > 0 && ny < ROWS - 1 && m[ny][nx] === 1) {
//         m[ny][nx] = 0;
//         m[y + dy / 2][x + dx / 2] = 0;
//         carve(nx, ny);
//       }
//     }
//   };

//   m[1][1] = 0;
//   carve(1, 1);

//   // ------------------
//   // 2) Find solution path
//   // ------------------
//   const solution = new Set<string>();
//   const stack = [[1, 1]];
//   const parent = new Map<string, string>();

//   const key = (x: number, y: number) => `${x},${y}`;

//   while (stack.length) {
//     const [x, y] = stack.pop()!;
//     if (x === COLS - 2 && y === ROWS - 2) break;

//     for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
//       const nx = x + dx, ny = y + dy;
//       const k = key(nx, ny);
//       if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) continue;
//       if (m[ny][nx] !== 0) continue;
//       if (parent.has(k)) continue;

//       parent.set(k, key(x,y));
//       stack.push([nx, ny]);
//     }
//   }

//   // rebuild solution set
//   let cur = key(COLS - 2, ROWS - 2);
//   while (cur !== key(1,1)) {
//     solution.add(cur);
//     cur = parent.get(cur)!;
//   }
//   solution.add(key(1,1));

//   // ------------------
//   // 3) Add safe local loops
//   // ------------------
//   for (let y = 1; y < ROWS - 1; y++) {
//     for (let x = 1; x < COLS - 1; x++) {
//       if (m[y][x] !== 1) continue;
//       if (seededRandom() > 0.12) continue;

//       const up = m[y-1][x] === 0;
//       const down = m[y+1][x] === 0;
//       const left = m[y][x-1] === 0;
//       const right = m[y][x+1] === 0;

//       // Only open short local loops
//       if (!((up && down) || (left && right))) continue;

//       // Do not connect two different solution cells
//       let touchingSolutions = 0;
//       if (up && solution.has(key(x, y-1))) touchingSolutions++;
//       if (down && solution.has(key(x, y+1))) touchingSolutions++;
//       if (left && solution.has(key(x-1, y))) touchingSolutions++;
//       if (right && solution.has(key(x+1, y))) touchingSolutions++;

//       if (touchingSolutions <= 1) {
//         m[y][x] = 0;
//       }
//     }
//   }

//   // ------------------
//   // 4) Start / End
//   // ------------------
//   m[1][1] = 2;
//   m[ROWS - 2][COLS - 2] = 3;

//   return m;
// };
const generateMaze = () => {
  return [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
[1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
[1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
 [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
};


const maze = useMemo(() => generateMaze(), []);

 // const maze = useMemo(() => generateMaze(MAZE_SEED), []);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMove = (dx: number, dy: number) => {
   
    
    const newX = position.x + dx;
    const newY = position.y + dy;

    if (
      newX < 0 ||
      newX >= COLS ||
      newY < 0 ||
      newY >= ROWS ||
      maze[newY][newX] === 1
    ) {
      return;
    }

    setPosition({ x: newX, y: newY });

    if (maze[newY][newX] === 3) {
      onComplete();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: { key: string; preventDefault: () => void; }) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        handleMove(0, -1);
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleMove(0, 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handleMove(-1, 0);
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        handleMove(1, 0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [position]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    const threshold = 30;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > threshold) {
        handleMove(deltaX > 0 ? 1 : -1, 0);
      }
    } else {
      if (Math.abs(deltaY) > threshold) {
        handleMove(0, deltaY > 0 ? 1 : -1);
      }
    }

    setTouchStart(null);
  };
return (
    <div className="min-h-[600px] flex flex-col p-6 space-y-4 bg-gradient-to-br from-slate-900 to-blue-950">
      <div className="text-center space-y-2">
        <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 tracking-wide drop-shadow-lg">Navigate the Recognition</h3>
        <div className="flex items-center justify-center gap-4 text-cyan-200 text-sm">
          <span className="font-semibold">Time: {timeElapsed}s</span>
          {timeElapsed >= 20 && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-cyan-400 underline hover:text-cyan-300 transition-colors font-medium"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          )}
        </div>
        {showHint && (
          <p className="text-cyan-300 text-sm italic animate-pulse">
            This is recognition - follow the right path to emerge
          </p>
        )}
      </div>

      <div 
        className="flex-1 flex items-center justify-center overflow-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="relative bg-gradient-to-br from-slate-950 to-blue-950 p-2 rounded-2xl border-4 border-blue-700/40 shadow-2xl"
          style={{
            width: COLS * cellSize + 4,
            height: ROWS * cellSize + 4,
            boxShadow: '0 0 60px rgba(0,0,0,0.8), 0 0 100px rgba(59, 130, 246, 0.2)'
          }}
        >
          {maze.map((row, y) =>
            row.map((cell, x) => {
              const isPlayer = x === position.x && y === position.y;
              
              return (
                <div
                  key={`${x}-${y}`}
                  style={{
                    position: 'absolute',
                    left: x * cellSize,
                    top: y * cellSize,
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: cell === 1 ? '#475569' : '#0f172a'
                  }}
                >
                  {isPlayer && (
                    <div 
                      className="bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-500/50 border-2 border-cyan-600"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: cellSize + 2,
                        height:cellSize + 2
                      }}
                    />
                  )}
                  
                  {cell === 2 && !isPlayer && (
                    <div 
                      className="bg-green-500 rounded-full shadow-md shadow-green-400/50 border border-green-400"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: cellSize - 2,
                        height: cellSize - 2
                      }}
                    />
                  )}
                  
                  {cell === 3 && (
                    <div 
                      className="bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50 border-2 border-red-400"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: cellSize +2,
                        height: cellSize + 2
                      }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 pb-2">
        <div className="text-cyan-300 text-xs mb-1 font-medium">
          PC: Arrow keys or WASD | Mobile: Swipe
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <button 
            onClick={() => handleMove(0, -1)} 
            className="w-14 h-14 bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-800 hover:from-cyan-500 hover:via-blue-600 hover:to-slate-700 rounded-xl border-2 border-cyan-500/40 text-cyan-300 text-3xl font-bold shadow-xl shadow-cyan-500/30 active:scale-95 transition-all hover:shadow-cyan-400/50 hover:border-cyan-400/60"
          >
            ↑
          </button>
          <div className="flex gap-1.5">
            <button 
              onClick={() => handleMove(-1, 0)} 
              className="w-14 h-14 bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-800 hover:from-cyan-500 hover:via-blue-600 hover:to-slate-700 rounded-xl border-2 border-cyan-500/40 text-cyan-300 text-3xl font-bold shadow-xl shadow-cyan-500/30 active:scale-95 transition-all hover:shadow-cyan-400/50 hover:border-cyan-400/60"
            >
              ←
            </button>
            <div className="w-14 h-14" />
            <button 
              onClick={() => handleMove(1, 0)} 
              className="w-14 h-14 bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-800 hover:from-cyan-500 hover:via-blue-600 hover:to-slate-700 rounded-xl border-2 border-cyan-500/40 text-cyan-300 text-3xl font-bold shadow-xl shadow-cyan-500/30 active:scale-95 transition-all hover:shadow-cyan-400/50 hover:border-cyan-400/60"
            >
              →
            </button>
          </div>
          <button 
            onClick={() => handleMove(0, 1)} 
            className="w-14 h-14 bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-800 hover:from-cyan-500 hover:via-blue-600 hover:to-slate-700 rounded-xl border-2 border-cyan-500/40 text-cyan-300 text-3xl font-bold shadow-xl shadow-cyan-500/30 active:scale-95 transition-all hover:shadow-cyan-400/50 hover:border-cyan-400/60"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
};

export default MazeGame;