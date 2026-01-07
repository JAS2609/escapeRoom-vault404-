'use client';
import React, { useState, JSX } from 'react';

function MiniGame3({ onComplete }: { onComplete: () => void }): JSX.Element {
  const [found, setFound] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [flashError, setFlashError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const hearts = [
    { id: 1, label: 'top-left-heart', top: '12%', left: '22%', width: '8%', height: '8%' },
    { id: 2, label: 'monitor-heart', top: '62%', left: '22%', width: '8%', height: '8%' },
    { id: 3, label: 'right-tower-heart', top: '30%', left: '61%', width: '7%', height: '7%' },
    { id: 4, label: 'sever-heart', top: '47%', left: '23%', width: '7%', height: '7%' },
    { id: 5, label: 'bottom-right-heart', top: '79%', left: '74%', width: '7%', height: '7%' },
    { id: 6, label: 'broken-heart', top: '85%', left: '67%', width: '2%', height: '2%' },
  ];

  const handleCorrect = (id: number) => {
    if (found.includes(id)) return;

    const updated = [...found, id];
    setFound(updated);

    if (updated.length === hearts.length) {
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
        <h3 className="text-2xl font-bold text-red-400">Count the Hearts</h3>
        <div className="flex items-center justify-center gap-4 text-red-200">
          <span className="text-lg font-semibold">
            Found: {found.length} / {hearts.length}
          </span>
          <span className="text-sm">Mistakes: {mistakes}</span>
        </div>
        {mistakes >= 3 && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-red-400 text-sm underline hover:text-red-300 transition-colors"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}
        {showHint && (
          <p className="text-red-300 text-sm italic animate-slideUp">
            Hearts are glowing in warm golden and cyan colors throughout the cyberpunk scene!
          </p>
        )}
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="bg-black/40 rounded-full h-3 overflow-hidden border-2 border-red-600">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-red-300 transition-all duration-500 relative overflow-hidden"
            style={{ width: `${(found.length / hearts.length) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 gap-2 min-h-0">
        <div
          className={`relative rounded-lg overflow-hidden border-2 shadow-xl transition-all h-[76vh] min-[500px]:h-auto ${
            flashError ? 'border-red-500 ring-4 ring-red-500/50' : 'border-red-600/30'
          }`}
          onClick={handleMiss}
        >
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-red-400 font-bold z-10">
            Find All Hearts
          </div>
          <img
            src="/hearts.png"
            alt="Cyberpunk Hearts"
            className="w-full h-full object-fill bg-black"
          />

          {hearts.map(heart => {
            const isFound = found.includes(heart.id);

            return (
              <button
                key={heart.id}
                aria-label={heart.label}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCorrect(heart.id);
                }}
                className={`absolute rounded-full transition-all duration-300 ${
                  isFound
                    ? 'bg-red-400/40 ring-4 ring-red-400 animate-pulse'
                    : 'bg-transparent hover:bg-red-400/10'
                }`}
                style={{
                  top: heart.top,
                  left: heart.left,
                  width: heart.width,
                  height: heart.height,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>
      </div>

      <p className="text-red-300 text-xs text-center italic">
        Click on each heart you find in the image ❤️
      </p>
    </div>
  );
}

export default MiniGame3;