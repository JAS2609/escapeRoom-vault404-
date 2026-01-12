'use client';
import { Unlock } from 'lucide-react';
import React, { useState, useEffect, useRef, ReactNode, JSX } from 'react';

function MiniGame4({ onComplete }: { onComplete: () => void }): JSX.Element {
  const [userCode, setUserCode] = useState(['', '', '']);
  const [showHints, setShowHints] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const hints = [
    {
      scene: 3,
      hint: "How Many difference did you spot? Remember, it's the number that counts!",
      answer: "4",
      position: 1
    },
    
    {
      scene: 8,
      hint: "How many digits was the numeric lock code you used to exit the maze?",
      answer: "2",
      position: 2
    },
    {
      scene: 9,
      hint: "How many hearts did you find in the painting?",
      answer: "6",
      position: 3
    },
  ];
  const correctCode = hints.map(h => h.answer[0].toUpperCase());

const handleSubmit = () => {
  const isCorrect = userCode.every((letter, idx) => letter === correctCode[idx]);
  if (isCorrect) {
    setTimeout(() => {
      onComplete();
    }, 1000);
  } else {
    setAttempts(prev => prev + 1);
    setIsWrong(true);
    setTimeout(() => setIsWrong(false), 500);
  }
};

const isComplete = userCode.every(letter => letter !== '');
const handleLetterChange = (index: number, value: string) => {
  const newCode = [...userCode];
  const char = value.toUpperCase().slice(0, 1);
  newCode[index] = char;
  setUserCode(newCode);
  if (char && index < inputRefs.current.length - 1) {
    inputRefs.current[index + 1]?.focus();
  }
};
const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Backspace' && !userCode[index] && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
  if (e.key === 'Enter' && isComplete) {
    handleSubmit();
  }
};


  return (
    <div className="flex flex-col h-full p-6 space-y-4 overflow-y-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">Final Code Challenge</h3>
        <p className="text-amber-200 text-sm md:text-base">
          Enter the 3-letter code using the first letter of each hint's answer
        </p>
        {attempts > 0 && (
          <p className="text-red-400 text-sm animate-pulse">
            Incorrect attempts: {attempts}
          </p>
        )}
      </div>

      <div className={`flex justify-center gap-3 md:gap-4 transition-all ${isWrong ? 'animate-shake' : ''}`}>
        {userCode.map((letter, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div className="text-yellow-400 font-bold text-xs md:text-sm">#{idx + 1}</div>
            <input
            ref={(el) => { inputRefs.current[idx] = el; }}
              type="numeric"
              maxLength={1}
              value={letter}
             onChange={(e) => handleLetterChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`w-14 h-14 md:w-16 md:h-16 text-center text-3xl md:text-4xl font-bold bg-gradient-to-br from-amber-800 to-amber-900 text-yellow-400 border-3 rounded-xl shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-500 uppercase transition-all ${
                isWrong ? 'border-red-500 ring-4 ring-red-500/50' : 'border-yellow-600'
              }`}
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setShowHints(!showHints)}
          className="text-yellow-400 underline hover:text-yellow-300 transition-colors text-sm md:text-base"
        >
          {showHints ? 'Hide Hints' : 'Show Hints from Your Journey'}
        </button>
      </div>

      {showHints && (
        <div className="space-y-3 animate-slideUp">
          {hints.map((hint, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-amber-950/80 to-amber-900/80 backdrop-blur-sm rounded-xl p-4 border-2 border-yellow-700/30 shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center font-bold text-amber-950 text-sm">
                  {hint.position}
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-xs text-yellow-400 font-semibold">Scene {hint.scene}</p>
                  <p className="text-amber-100 text-sm italic leading-relaxed">
                    "{hint.hint}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!isComplete}
        className={`relative w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:via-yellow-300 hover:to-yellow-400 text-amber-950 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 active:scale-95 flex items-center justify-center gap-2 border-3 border-yellow-300 shadow-xl overflow-hidden group ${
          !isComplete ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        <span className="text-lg md:text-xl relative z-10">Unlock Exit Door</span>
        <Unlock className="w-6 h-6 group-hover:rotate-12 transition-transform relative z-10" />
      </button>

      <p className="text-amber-300 text-xs text-center italic">
        It Is A Numeric Code
      </p>
    </div>
  );
};
export default MiniGame4;