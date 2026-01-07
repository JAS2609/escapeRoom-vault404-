'use client';
import React, { useState, useEffect, useRef, ReactNode, JSX } from 'react';

function MiniGame1({ onComplete }: { onComplete: () => void }): JSX.Element {
  const [found, setFound] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [flashError, setFlashError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  
  const differences = [
    { id: 1, label: 'flowerPot', top: '61%', left: '47%', width: '6%',height: '6%' },
    { id: 2, label: 'Lamp', top: '50%', left: '71%', width: '8%', height: '4%' },
    { id: 3, label: 'fan', top: '24%', left: '50%', width: '9%', height: '6%' },
    { id: 4, label: 'pillow', top: '55%', left: '81%', width: '4%', height: '4%' },
  ];

  const handleCorrect = (id: number) => {
    if (found.includes(id)) return;

    const updated = [...found, id];
    setFound(updated);

    if (updated.length === differences.length) {
      setTimeout(() => {
        onComplete();
      }, 700);
    }
  };

  const handleMiss = () => {
    setMistakes(m => m + 1);
    setFlashError(true);
    setTimeout(() => setFlashError(false), 200);
};

return (
  <div className="flex flex-col h-full p-2 space-y-2">
  
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-yellow-400">Find 4 Differences</h3>
        <div className="flex items-center justify-center gap-4 text-amber-200">
          <span className="text-lg font-semibold">
            Found: {found.length} / {differences.length}
          </span>
          <span className="text-sm">Mistakes: {mistakes}</span>
        </div>
        {mistakes >= 3 && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-yellow-400 text-sm underline hover:text-yellow-300 transition-colors"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}
        {showHint && (
          <p className="text-amber-300 text-sm italic animate-slideUp">
            Look at all four corners and the center carefully!
          </p>
        )}
      </div>

  
      <div className="w-full max-w-md mx-auto">
        <div className="bg-black/40 rounded-full h-3 overflow-hidden border-2 border-yellow-600">
          <div 
            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-500 relative overflow-hidden"
            style={{ width: `${(found.length / differences.length) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>


     <div className="flex-1 grid grid-cols-1  gap-2 min-h-0">

       
        <div className="relative rounded-lg overflow-hidden border-2 border-yellow-600/30 shadow-xl h-[38vh] min-[500px]:h-auto">

          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-yellow-400 font-bold z-10">
            Original
          </div>
          <img
            src="/diffimg1.1.png"
            alt="Original"
           className="w-full h-full object-fill bg-black"

          />
        </div>

       <div
  className={`relative rounded-lg overflow-hidden border-2 shadow-xl transition-all h-[38vh] min-[500px]:h-auto ${
    flashError ? 'border-red-500 ring-4 ring-red-500/50' : 'border-yellow-600/30'
  }`}
  onClick={handleMiss}
>
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-yellow-400 font-bold z-10">
            Find Differences
          </div>
          <img
            src="/diffimg2.1.png"
            alt="Modified"
            className="w-full h-full object-fill bg-black"

          />

          {differences.map(diff => {
            const isFound = found.includes(diff.id);

            return (
              <button
                key={diff.id}
                aria-label={diff.label}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCorrect(diff.id);
                }}
                className={`absolute rounded-full transition-all duration-300 ${
                  isFound
                    ? 'bg-yellow-400/40 ring-4 ring-yellow-400 animate-pulse'
                    : 'bg-transparent hover:bg-yellow-400/10'
                }`}
                style={{
                  top: diff.top,
                  left: diff.left,
                  width: diff.width,
                  height: diff.height,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>
      </div>

      <p className="text-amber-300 text-xs text-center italic">
        Click on the right image where you spot a difference
      </p>
    </div>
    );
}

export default MiniGame1;