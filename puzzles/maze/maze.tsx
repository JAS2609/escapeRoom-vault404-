import React, { useState, useEffect,useMemo,useRef } from 'react';

const COLS = 27;
const ROWS = 37;




const MazeGame = ({ onComplete }: { onComplete: () => void }) => {
  const [position, setPosition] = useState({ x: 1, y: 1 });
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
const pressStartTime = useRef<number | null>(null);
const pressDir = useRef<{ dx: number; dy: number } | null>(null);

  const getCellSize = () => {
  if (window.innerWidth < 500) return 10;  
  if (window.innerWidth < 768) return 12;   
  if (window.innerWidth < 1024) return 14;  
  return 10;                                
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

  


const generateMaze = () => {
  return [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1],
    [1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1],
    [1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1],
    [1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
    [1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
    [1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];
};


const maze = useMemo(() => generateMaze(), []);


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
const moveUntilBlocked = (dx: number, dy: number) => {
  let x = position.x;
  let y = position.y;

  while (true) {
    const nx = x + dx;
    const ny = y + dy;

    if (
      nx < 0 || nx >= COLS ||
      ny < 0 || ny >= ROWS ||
      maze[ny][nx] === 1
    ) break;

    x = nx;
    y = ny;

    if (maze[ny][nx] === 3) {
      onComplete();
      break;
    }
  }

  setPosition({ x, y });
};

const handlePressStart = (dx: number, dy: number) => {
  pressStartTime.current = Date.now();
  pressDir.current = { dx, dy };
};

const handlePressEnd = () => {
  if (!pressStartTime.current || !pressDir.current) return;

  const heldTime = Date.now() - pressStartTime.current;
  const { dx, dy } = pressDir.current;

  if (heldTime >= 1500) {
    moveUntilBlocked(dx, dy);  // long press
  } else {
    handleMove(dx, dy);        // short press
  }

  pressStartTime.current = null;
  pressDir.current = null;
};

useEffect(() => {
  return () => {
    pressStartTime.current = null;
    pressDir.current = null;
  };
}, []);



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
         
          <img 
            src="/maze.png"
            alt="Maze background"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: COLS * cellSize,
              height: ROWS * cellSize,
              objectFit: 'cover',
              opacity: 1,
              pointerEvents: 'none',
              zIndex:5
            }}
          />
          
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
                    opacity: isPlayer ? 0 : 1,
                    backgroundColor: cell === 1 ? 'rgba(71, 85, 105, 0.3)' : 'transparent',
                    zIndex: 1
                  }}
                >
                  {cell === 2 && !isPlayer && (
                    <div 
                      className="bg-green-500 rounded-full shadow-md shadow-green-400/50 border border-green-400"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: cellSize - 2,
                        height: cellSize - 2,
                        zIndex: 2
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
                        height: cellSize + 2,
                        zIndex: 2
                      }}
                    />
                  )}
                </div>
              );
            })
          )}
          
          <div 
            className="bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-500/50 border-2 border-cyan-600"
            style={{
              position: 'absolute',
              left: position.x * cellSize,
              top: position.y * cellSize,
              width: cellSize + 2,
              height: cellSize + 2,
              transform: 'translate(-1px, -1px)',
              zIndex: 10
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 pb-2">
        <div className="text-cyan-300 text-xs mb-1 font-medium">
          PC: Arrow keys or WASD | Mobile: Swipe
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <button 
            onClick={() => handleMove(0, -1)}    
            onMouseDown={() => handlePressStart(0, -1)}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={() => handlePressStart(0, -1)}
            onTouchEnd={handlePressEnd}
            className="w-14 h-14 bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-800 hover:from-cyan-500 hover:via-blue-600 hover:to-slate-700 rounded-xl border-2 border-cyan-500/40 text-cyan-300 text-3xl font-bold shadow-xl shadow-cyan-500/30 active:scale-95 transition-all hover:shadow-cyan-400/50 hover:border-cyan-400/60"
          >
            ↑
          </button>
          <div className="flex gap-1.5">
            <button 
               onClick={() => handleMove(-1, 0)}    
            onMouseDown={() => handlePressStart(-1, 0)}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={() => handlePressStart(-1, 0)}
            onTouchEnd={handlePressEnd} 
              className="w-14 h-14 bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-800 hover:from-cyan-500 hover:via-blue-600 hover:to-slate-700 rounded-xl border-2 border-cyan-500/40 text-cyan-300 text-3xl font-bold shadow-xl shadow-cyan-500/30 active:scale-95 transition-all hover:shadow-cyan-400/50 hover:border-cyan-400/60"
            >
              ←
            </button>
            <div className="w-14 h-14" />
            <button 
               onClick={() => handleMove(1, 0)}    
             onMouseDown={() => handlePressStart(1, 0)}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={() => handlePressStart(1, 0)}
            onTouchEnd={handlePressEnd}
              className="w-14 h-14 bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-800 hover:from-cyan-500 hover:via-blue-600 hover:to-slate-700 rounded-xl border-2 border-cyan-500/40 text-cyan-300 text-3xl font-bold shadow-xl shadow-cyan-500/30 active:scale-95 transition-all hover:shadow-cyan-400/50 hover:border-cyan-400/60"
            >
              →
            </button>
          </div>
          <button 
            onClick={() => handleMove(0, 1)}    
            onMouseDown={() => handlePressStart(0, 1)}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={() => handlePressStart(0, 1)}
            onTouchEnd={handlePressEnd} 
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