'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Lock, Unlock, Gamepad2, Trophy, Target, Volume2, VolumeX } from 'lucide-react';
import MiniGame1 from '../puzzles/difference/diff';
import MiniGame2 from '../puzzles/maze/maze';
import MiniGame3 from '../puzzles/findtheheart/heart';
import MiniGame4 from '../puzzles/finalcode/finalcode';
import Image from "next/image";

// const scenes = [
//   {
//     id: 1,
//     title: "The Prison Cell",
//     image: "/Frame1.svg?fit=crop&w=800&h=700",
//     story: "You wake up in a dimly lit prison cell. The cold stone walls echo with distant cries. Three of your friends are locked in separate cells. You must free them all to escape this nightmare.",
//     description: "Your journey begins here. Are you ready?",
//     buttonText: "Start Now",
//     dialogText: null,
//     layout: "start",
//     isUnlock: false,
//     gameComponent: null,
//     answer: null
//   },
//   {
//     id: 2,
//     title: "The First Lock",
//     image: "/Frame2.svg?fit=crop&w=800&h=600",
//     story: "You spot a rusty key hidden in the corner. Your first friend sees you approaching their cell door. Their eyes light up with hope.",
//     description: "Use the key you found to unlock the first cell.",
//     buttonText: "Unlock Cell",
//     dialogText: null,
//     layout: "single",
//     isUnlock: true,
//     gameComponent: MiniGame1,
//     answer: null
//   },
//   {
//     id: 3,
//     title: "First Friend Freed",
//     image: "/Frame3.svg?fit=crop&w=800&h=600",
//     story: "The lock clicks open! Your friend rushes out, grateful and relieved. They embrace you warmly.",
//     description: "One down, two to go.",
//     buttonText: "Continue",
//     dialogText: "Thank you! I thought I'd never get out.",
//     layout: "single",
//     isUnlock: false,
//     gameComponent: null,
//     answer: null
//   },
//   {
//     id: 4,
//     title: "A Cryptic Clue",
//     image: "/Frame4.svg?fit=crop&w=800&h=600",
//     story: "Your freed friend leans in close, whispering urgently about what they learned during their captivity.",
//     description: "Every word could be the key to survival.",
//     buttonText: "Listen Carefully",
//     dialogText: "The second cell's lock has a pattern: three turns left, two turns right. Remember this!",
//     layout: "single",
//     isUnlock: false,
//     gameComponent: null,
//     answer: "key"
//   },
//   {
//     id: 5,
//     title: "The Second Cell",
//     image: "/Frame5.svg?fit=crop&w=800&h=600",
//     story: "You approach the second cell. The lock is more complex, but you remember the pattern. Your friend inside watches anxiously.",
//     description: "Apply the pattern: three left, two right.",
//     buttonText: "Unlock Cell",
//     dialogText: null,
//     layout: "single",
//     isUnlock: true,
//     gameComponent: MiniGame2,
//     answer: null
//   },
//   {
//     id: 6,
//     title: "Second Friend Freed",
//     image: "/Frame6.svg?fit=crop&w=800&h=600",
//     story: "Another click! The second friend is free. The group is growing stronger. Together, you might actually make it out.",
//     description: "The odds are improving.",
//     buttonText: "Continue",
//     dialogText: null,
//     layout: "single",
//     isUnlock: false,
//     gameComponent: null,
//     answer: null
//   },
//   {
//     id: 7,
//     title: "A Warning",
//     image: "/Frame7.svg?fit=crop&w=800&h=600",
//     story: "Your second friend looks worried. They point toward the corridor where guard footsteps echo in the distance.",
//     description: "Time is running out.",
//     buttonText: "Continue",
//     dialogText: " The last cell has a voice-activated lock.You'll need to whisper the code:'Freedom'.",
//     layout: "single",
//     isUnlock: false,
//     gameComponent: null,
//     answer:"exit"
//   },
//   {
//     id: 8,
//     title: "The Final Cell",
//     image: "/Frame8.svg?fit=crop&w=800&h=600",
//     story: "You reach the last cell. Your final friend is inside, hope and fear mixing in their eyes. You whisper the code to the voice lock.",
//     description: "One last lock stands between you and freedom.",
//     buttonText: "Unlock Cell",
//     dialogText: null,
//     layout: "single",
//     isUnlock: true,
//     gameComponent: MiniGame3,
//     answer: null
//   },
//   {
//     id: 9,
//     title: "The Team Reunited",
//     image: "/Frame9.svg?fit=crop&w=800&h=600",
//     story: "The lock releases with a satisfying click. All three friends are now free! But something's wrong...",
//     description: "United at last, but is it over?",
//     buttonText: "Continue",
//     dialogText: "Thank you! But look... there's a document on the wall. Can you read what it says?",
//     layout: "single",
//     isUnlock: false,
//     gameComponent: null,
//     answer: "yes"
//   },
//   {
//     id: 10,
//     title: "The Exit Door",
//     image: "/Frame10.svg?fit=crop&w=800&h=600",
//     story: "You all stand before the massive exit door. The document revealed a final truth: you need to work together to open it.",
//     description: "Four friends, one door, one chance.",
//     buttonText: "Escape Together",
//     dialogText: "On three, we all push together. Ready? This is it!",
//     layout: "group",
//     isUnlock: false,
//     gameComponent: MiniGame4,
//     answer: null
//   },
//   {
//     id: 11,
//     title: "Freedom!",
//     image: "/Frame11.svg?fit=crop&w=800&h=600",
//     story: "The door swings open! Sunlight floods in, warm and bright. You made it. All of you made it. The nightmare is over.",
//     description: "You escaped! Well done!",
//     buttonText: "Restart Adventure",
//     dialogText: "We did it! We're finally free! Thank you for never giving up on us.",
//     layout: "single",
//     isUnlock: false,
//     gameComponent: null,
//     answer: null
//   }
// ];
const scenes = [
  {
    id: 1,
    title: "Digital Vault 404",
    image: "/scene1.2.png",
    story: " Someone has locked a memory here for you.",
    description: "",
    buttonText: "Start Journey",
    dialogText: null,
    layout: "start",
    isUnlock: false,
    gameComponent: null,
    answer: null
  },
  {
    id: 2,
    title: "Recipient Verification",
    image: "/Scene2.png",
    story: "This vault opens only for the person it was created for.",
    description: "",
    buttonText: "Proceed",
    dialogText: null,
    layout: "single",
    isUnlock: false,
    gameComponent: null,
    answer: null
  },
  {
    id: 3,
    title: "Hidden Clues",
    image: "/Scene3.png",
    story: "The sender hid clues in plain sight.",
    description: "",
    buttonText: "Analyze",
    dialogText: null,
    layout: "single",
    isUnlock: true,
    gameComponent: MiniGame1,
    answer: null
  },
  {
    id: 4,
    title: "Path Revealed",
    image: "/Scene4.1.png",
    story: "Pattern accepted. The vault responds to smart people.",
    description: "",
    buttonText: "Continue",
    dialogText: "",
    layout: "single",
    isUnlock: false,
    gameComponent: null,
    answer: "Pattern"
  },
  {
    id: 5,
    title: "Firewall Corridor",
    image: "/Scene5.png",
    story: "Who said reaching the message would be easy?",
    description: "",
    buttonText: "Navigate",
    dialogText: null,
    layout: "single",
    isUnlock: true,
    gameComponent: MiniGame2,
    answer: null
  },
  {
    id: 6,
    title: "Safe Passage",
    image: "/Scene6.png",
    story: "You made it through the gauntlet. The vault acknowledges your skill.",
    description: "",
    buttonText: "Continue",
    dialogText: null,
    layout: "single",
    isUnlock: false,
    gameComponent: null,
    answer: null
  },
  {
    id: 7,
    title: "Quiet Walk",
    image: "/Scene7.1.png",
    story: "The vault no longer tests your speed. It watches how you move forward.",
    description: "",
    buttonText: "Walk Forward",
    dialogText: "",
    layout: "single",
    isUnlock: false,
    gameComponent: null,
    answer: "Aware"
  },
  {
    id: 8,
    title: "Numeric Lock",
    image: "/Scene8.png",
    story: "A 2-digit numeric lock? But It won't open without the right signal.",
    description: "",
    buttonText: "Inspect Area",
    dialogText: null,
    layout: "single",
    isUnlock: false,
    gameComponent: null,
    answer: null
  },
  {
    id: 9,
    title: "Hidden in Plain Sight",
    image: "/Scene9.png",
    story: "Some things ask for care.",
    description: "",
    buttonText: "Count the Hearts",
    dialogText: null,
    layout: "single",
    isUnlock: true,
    gameComponent: MiniGame3,
    answer: null
  },
  {
    id: 10,
    title: "Lock Accepted",
    image: "/Scene10.png",
    story: " You noticed what others might miss",
    description: "",
    buttonText: "Continue",
    dialogText: "",
    layout: "single",
    isUnlock: false,
    gameComponent: null,
    answer: "Signal"
  },
  {
    id: 11,
    title: "Grand Chamber",
    image: "/Scene11.png",
    story: "You've reached the heart of the vault.",
    description: "",
    buttonText: "Approach Box",
    dialogText: null,
    layout: "single",
    isUnlock: false,
    gameComponent: null,
    answer: null
  },
  {
    id: 12,
    title: "Final Verification",
    image: "/Scene12.png",
    story: "One last step remains.",
    description: "",
    buttonText: "Open letter",
    dialogText: null,
    layout: "single",
    isUnlock: false,
    gameComponent:null,
    answer: null
  },
  {
    id: 13,
    title: "Letter",
    image: "/Scene13.png",
    story: "read carefully.",
    description: "",
    buttonText: "continue",
    dialogText: "",
    layout: "single",
    isUnlock: true,
    gameComponent: MiniGame4,
    answer: null
  },
  {
    id: 14,
    title: "Identity Confirmed",
    image: "/Scene14.png",
    story: "This was always meant for you.",
    description: "",
    buttonText: "Open",
    dialogText: "",
    layout: "single",
    isUnlock: false,
    gameComponent: null,
    answer: null
  },
  {
    id: 15,
    title: "The Message",
    image: "/Scene15.png",
    story: "They've been waiting for this moment.",
    description: "",
    buttonText: "Play Message",
    dialogText: "",
    layout: "single",
    isUnlock: false,
    gameComponent: null,
    answer: null
  },
  {
    id: 16,
    title: "Vault 404 Complete",
    image: "/Scene16.png",
    story: "The vault was designed for you.",
    description: "",
    buttonText: "Restart Journey",
    dialogText: "",
    layout: "single",
    isUnlock: false,
    gameComponent: null,
    answer: null
  }];

const EscapeRoom = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicOscillatorsRef = useRef<OscillatorNode[]>([]);
  const musicGainRef = useRef<GainNode | null>(null);
  const [laserProgress, setLaserProgress] = useState(0);
  const [isLaserActive, setIsLaserActive] = useState(false);
  const [colorScheme, setColorScheme] = useState<'blue' | 'red' | 'green' | 'golden'>('blue');
  const currentScene = scenes[currentSceneIndex];
  const [imageLoaded, setImageLoaded] = useState(false);

  const isLastScene = currentSceneIndex === scenes.length - 1;
  const [particles, setParticles] = useState<
    { left: string; top: string; delay: string; duration: string }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${10 + Math.random() * 20}s`,
      }))
    );
  }, []);
  useEffect(() => {
  const next = scenes[currentSceneIndex + 1];
  if (!next?.image) return;

  const img = new window.Image();
  img.src = next.image;
  setImageLoaded(false)
}, [currentSceneIndex]);


  const createBackgroundMusic = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      stopBackgroundMusic();

      musicGainRef.current = ctx.createGain();
      musicGainRef.current.gain.setValueAtTime(0.15, ctx.currentTime);
      musicGainRef.current.connect(ctx.destination);
      const notes = [
        [220, 261.63, 329.63],
        [146.83, 220, 293.66],
        [164.81, 246.94, 329.63],
        [220, 261.63, 329.63]
      ];
      
      let chordIndex = 0;
      
      const playChord = () => {
        if (!isMusicPlaying) return;
        
        const chord = notes[chordIndex % notes.length];
        
        chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + 2.5);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3);
          
          osc.connect(gain);
          if (musicGainRef.current) {
            gain.connect(musicGainRef.current);
          }
          
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 3);
          
          musicOscillatorsRef.current.push(osc);
        });
        
        chordIndex++;
        setTimeout(playChord, 3000);
      };
      
      playChord();
      
    } catch (error) {
      console.log('Audio not supported');
    }
  };
  const laserFiredRef = useRef<Set<number>>(new Set());

 useEffect(() => {
  const triggerLaser = (targetScheme: 'red' | 'green' | 'golden') => {
    if (laserFiredRef.current.has(currentSceneIndex)) return;
    laserFiredRef.current.add(currentSceneIndex);

    setIsLaserActive(true);
    setLaserProgress(0);

    const duration = 2000;
    const startTime = Date.now();

    const animateLaser = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setLaserProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animateLaser);
      } else {
        setColorScheme(targetScheme);
        setTimeout(() => setIsLaserActive(false), 500);
      }
    };
  

    requestAnimationFrame(animateLaser);
  };

  if (currentSceneIndex === 4) triggerLaser('red');
  if (currentSceneIndex === 6) triggerLaser('green');
  if (currentSceneIndex === 9) triggerLaser('golden');

}, [currentSceneIndex]);
 


  const colors = colorScheme === 'blue' ? {
    gradient: 'from-slate-950 via-slate-900 to-blue-950',
    cardGradient: 'from-slate-900 to-blue-950',
    border: 'border-blue-700/40',
    glow: 'rgba(59, 130, 246, 0.2)',
    text: 'text-blue-400',
    bgPattern: '%233b82f6',
    laserColor: '#ef4444',
    accentColor: 'blue',
  } : colorScheme === 'red' ? {
    gradient: 'from-slate-950 via-slate-900 to-red-950',
    cardGradient: 'from-slate-900 to-red-950',
    border: 'border-red-700/40',
    glow: 'rgba(239, 68, 68, 0.2)',
    text: 'text-red-400',
    bgPattern: '%23ef4444',
    laserColor: '#ef4444',
    accentColor: 'red',
  } : colorScheme === 'green' ? {
    gradient: 'from-slate-950 via-slate-900 to-emerald-950',
    cardGradient: 'from-slate-900 to-emerald-950',
    border: 'border-emerald-700/40',
    glow: 'rgba(16, 185, 129, 0.2)',
    text: 'text-emerald-400',
    bgPattern: '%2310b981',
    laserColor: '#10b981',
    accentColor: 'emerald',
  } : {
    gradient: 'from-slate-950 via-amber-950 to-yellow-950',
    cardGradient: 'from-amber-900 to-yellow-950',
    border: 'border-amber-600/40',
    glow: 'rgba(251, 191, 36, 0.3)',
    text: 'text-amber-400',
    bgPattern: '%23fbbf24',
    laserColor: '#fbbf24',
    accentColor: 'amber',
  };

  const stopBackgroundMusic = () => {
    musicOscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {}
    });
    musicOscillatorsRef.current = [];
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      setIsMusicPlaying(false);
      stopBackgroundMusic();
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    } else {
      setIsMusicPlaying(true);
    }
  };

  useEffect(() => {
    if (isMusicPlaying) {
      createBackgroundMusic();
    }
    return () => {
      stopBackgroundMusic();
    };
  }, [isMusicPlaying]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const playUnlockSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.frequency.setValueAtTime(800, now);
      osc1.frequency.exponentialRampToValueAtTime(200, now + 0.05);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc1.start(now);
      osc1.stop(now + 0.05);
      
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.setValueAtTime(300, now + 0.05);
      osc2.frequency.exponentialRampToValueAtTime(150, now + 0.15);
      gain2.gain.setValueAtTime(0.2, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc2.start(now + 0.05);
      osc2.stop(now + 0.15);
      
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.frequency.setValueAtTime(600, now + 0.15);
      osc3.frequency.exponentialRampToValueAtTime(100, now + 0.3);
      gain3.gain.setValueAtTime(0.25, now + 0.15);
      gain3.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc3.start(now + 0.15);
      osc3.stop(now + 0.3);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const playAmbientSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.4);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const handleGameComplete = () => {
    playUnlockSound();
    setShowGame(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSceneIndex(prev => prev + 1);
      setIsTransitioning(false);
    }, 800);
  };

  const handleNext = () => {
    if (currentScene.gameComponent && !showGame) {
      playUnlockSound();
      setShowGame(true);
      return;
    }

    if (currentScene.isUnlock) {
      playUnlockSound();
    } else {
      playAmbientSound();
    }

    if (isLastScene) {
      setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSceneIndex(-1);
          setShowGame(false);
          setIsTransitioning(false);
          laserFiredRef.current.clear();
          setColorScheme('blue');
        }, 500);
            }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSceneIndex(prev => prev + 1);
      setShowGame(false);
      setIsTransitioning(false);
    }, 500);
  };

  const GameComponent = currentScene.gameComponent;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-b ${colors.gradient} transition-all duration-1000`} />
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-1000"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${colors.bgPattern}' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={`w-3 h-full bg-gradient-to-b ${
                colorScheme === 'blue' ? 'from-blue-900 via-blue-800 to-slate-900' :
                colorScheme === 'red' ? 'from-red-900 via-red-800 to-slate-900' :
                colorScheme === 'green' ? 'from-emerald-900 via-emerald-800 to-slate-900' :
                'from-amber-900 via-yellow-800 to-slate-900'
              } shadow-2xl transition-all duration-1000`}
              style={{
                boxShadow: `inset 0 0 20px rgba(0,0,0,0.8), 0 0 30px ${colors.glow}`
              }}
            />
          ))}
        </div>
        <div className={`absolute top-20 left-10 w-40 h-40 ${
          colorScheme === 'blue' ? 'bg-blue-600/15' :
          colorScheme === 'red' ? 'bg-red-600/15' :
          colorScheme === 'green' ? 'bg-emerald-600/15' :
          'bg-amber-600/20'
        } rounded-full blur-3xl animate-pulse transition-all duration-1000`} />
        <div className={`absolute top-20 right-10 w-40 h-40 ${
          colorScheme === 'blue' ? 'bg-blue-500/15' :
          colorScheme === 'red' ? 'bg-red-500/15' :
          colorScheme === 'green' ? 'bg-emerald-500/15' :
          'bg-yellow-500/20'
        } rounded-full blur-3xl animate-pulse transition-all duration-1000`} style={{ animationDelay: '1s' }} />
        <div className={`absolute bottom-20 left-1/4 w-32 h-32 ${
          colorScheme === 'blue' ? 'bg-indigo-600/10' :
          colorScheme === 'red' ? 'bg-red-600/10' :
          colorScheme === 'green' ? 'bg-emerald-600/10' :
          'bg-amber-600/15'
        } rounded-full blur-2xl animate-pulse transition-all duration-1000`} style={{ animationDelay: '2s' }} />

        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-950/80 to-transparent" />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 ${
                colorScheme === 'blue' ? 'bg-blue-400/30' :
                colorScheme === 'red' ? 'bg-red-400/30' :
                colorScheme === 'green' ? 'bg-emerald-400/30' :
                'bg-amber-400/40'
              } rounded-full animate-pulse transition-all duration-1000`}
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        <div className="absolute top-0 left-20 w-2 h-32 bg-gradient-to-b from-blue-700 to-blue-800 opacity-40 rounded-full shadow-xl animate-pulse" />
        <div className="absolute top-0 right-20 w-2 h-32 bg-gradient-to-b from-blue-700 to-blue-800 opacity-40 rounded-full shadow-xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <button
        onClick={toggleMusic}
        className={`fixed top-6 left-6 z-50 bg-black/70 backdrop-blur-md ${colors.text} p-3 rounded-full border-2 ${colors.border} shadow-xl hover:scale-110 transition-all`}
        title={isMusicPlaying ? "Mute Music" : "Play Music"}
      >
        {isMusicPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </button>

      <div className="fixed top-0 left-0 right-0 h-2 bg-black/30 z-50 shadow-lg">
        <div 
          className={`h-full bg-gradient-to-r ${
            colorScheme === 'blue' ? 'from-blue-700 via-blue-600 to-blue-500' :
            colorScheme === 'red' ? 'from-red-700 via-red-600 to-red-500' :
            colorScheme === 'green' ? 'from-emerald-700 via-emerald-600 to-emerald-500' :
            'from-amber-700 via-yellow-600 to-amber-500'
          } transition-all duration-700 ease-out relative overflow-hidden`}
          style={{ width: `${((currentSceneIndex + 1) / scenes.length) * 100}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full absolute top-0 md:static md:top-auto md:transform-none  max-w-2xl transition-all duration-700 transform ${
          isTransitioning ? 'opacity-0 scale-90 blur-md rotate-2' : 'opacity-100 scale-100 blur-0 rotate-0'
        }`}>
          <div 
            className={`relative bg-gradient-to-b ${colors.cardGradient} rounded-3xl shadow-2xl overflow-hidden border-4 ${colors.border} transition-all duration-1000`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              boxShadow: `0 0 60px rgba(0,0,0,0.8), 0 0 100px ${colors.glow}`
            }}
          >
            {isLaserActive && (
              <div 
                className="absolute left-0 right-0 z-50 pointer-events-none"
                style={{
                  bottom: 0,
                  height: `${laserProgress * 100}%`,
                  background: `linear-gradient(to top, ${colors.laserColor}, transparent)`,
                  boxShadow: `0 0 40px ${colors.laserColor}, 0 0 80px ${colors.laserColor}`,
                  transition: 'none'
                }}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{
                    background: colors.laserColor,
                    boxShadow: `0 0 20px ${colors.laserColor}, 0 0 40px ${colors.laserColor}, 0 0 60px ${colors.laserColor}`,
                  }}
                />
              </div>
            )}

            {isHovering && !showGame && (
              <div
                className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${colors.glow.replace('0.2', '0.12')}, transparent 40%)`
                }}
              />
            )}

            <div className={`absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 ${colors.border} rounded-tl-3xl animate-pulse transition-all duration-1000`} />
            <div className={`absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 ${colors.border} rounded-tr-3xl animate-pulse transition-all duration-1000`} style={{ animationDelay: '0.5s' }} />
            <div className={`absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 ${colors.border} rounded-bl-3xl animate-pulse transition-all duration-1000`} style={{ animationDelay: '1s' }} />
            <div className={`absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 ${colors.border} rounded-br-3xl animate-pulse transition-all duration-1000`} style={{ animationDelay: '1.5s' }} />

            {showGame && GameComponent ? (
              <div className={`min-h-[calc(100vh-2rem)] bg-gradient-to-br ${colors.cardGradient} transition-all duration-1000`}>
                <GameComponent onComplete={handleGameComplete} />
              </div>
            ) : (
              <>
               <div className="relative min-h-[calc(100vh-2rem)] overflow-hidden">

               
                 <Image
                    key={currentScene.image}
                    src={currentScene.image}
                    alt={currentScene.title}
                    fill
                    priority={currentSceneIndex === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 768px"
                    onLoad={() => setImageLoaded(true)}
                    className={`object-cover transition-opacity duration-700 ease-in-out ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />



                  
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

                  <div className="absolute top-6 left-8 right-8 z-20">
                    <div className={`bg-black/80 backdrop-blur-xl rounded-2xl px-8 py-4 border-2 ${colors.border} shadow-2xl transition-all duration-1000 transform hover:scale-105`}
                      style={{ boxShadow: `0 0 30px ${colors.glow}` }}>
                      <h2 className={`text-4xl font-bold ${colors.text} text-center tracking-wide drop-shadow-2xl transition-all duration-1000`}>
                        {currentScene.title}
                      </h2>
                    </div>
                  </div>
                  <div className="absolute inset-x-8 bottom-8 z-20 space-y-5">
                    <div className={`bg-black/65 backdrop-blur-xl rounded-2xl p-4 border-2 ${colors.border} shadow-2xl transition-all duration-1000 transform hover:scale-[1.02]`}
                      style={{ boxShadow: `0 0 40px ${colors.glow}` }}>
                      <p className={`text-center ${colorScheme === 'blue' ? 'text-blue-100' : colorScheme === 'red' ? 'text-red-100' : colorScheme === 'green' ? 'text-emerald-100' : 'text-amber-100'} text-xl leading-relaxed italic font-serif transition-all duration-1000`}>
                        {currentScene.story}
                      </p>
                    </div>
                    {currentScene.description && (
                      <p className={`${colorScheme === 'blue' ? 'text-blue-300' : colorScheme === 'red' ? 'text-red-300' : colorScheme === 'green' ? 'text-emerald-300' : 'text-amber-300'} text-center font-semibold text-lg px-4 drop-shadow-lg transition-all duration-1000`}>
                        {currentScene.description}
                      </p>
                    )}
                    {currentScene.dialogText && (
                      <div className={`relative bg-gradient-to-br ${
                        colorScheme === 'blue' ? 'from-blue-50 to-blue-100 border-blue-700' :
                        colorScheme === 'red' ? 'from-red-50 to-red-100 border-red-700' :
                        colorScheme === 'green' ? 'from-emerald-50 to-emerald-100 border-emerald-700' :
                        'from-amber-50 to-yellow-100 border-amber-700'
                      } rounded-2xl p-6 border-3 shadow-2xl transition-all duration-1000 transform hover:scale-[1.02]`}>
                        <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br ${
                          colorScheme === 'blue' ? 'from-blue-50 to-blue-100 border-blue-700' :
                          colorScheme === 'red' ? 'from-red-50 to-red-100 border-red-700' :
                          colorScheme === 'green' ? 'from-emerald-50 to-emerald-100 border-emerald-700' :
                          'from-amber-50 to-yellow-100 border-amber-700'
                        } border-l-3 border-t-3 rotate-45 transition-all duration-1000`} />
                        <p className="relative text-slate-900 text-center font-medium text-lg leading-relaxed">
                          "{currentScene.dialogText}"
                        </p>
                        <div className="absolute -bottom-2 right-8 flex gap-1">
                          <div className={`w-2 h-2 ${
                            colorScheme === 'blue' ? 'bg-blue-700' :
                            colorScheme === 'red' ? 'bg-red-700' :
                            colorScheme === 'green' ? 'bg-emerald-700' :
                            'bg-amber-700'
                          } rounded-full animate-bounce transition-all duration-1000`} />
                          <div className={`w-2 h-2 ${
                            colorScheme === 'blue' ? 'bg-blue-700' :
                            colorScheme === 'red' ? 'bg-red-700' :
                            colorScheme === 'green' ? 'bg-emerald-700' :
                            'bg-amber-700'
                          } rounded-full animate-bounce transition-all duration-1000`} style={{ animationDelay: '0.1s' }} />
                          <div className={`w-2 h-2 ${
                            colorScheme === 'blue' ? 'bg-blue-700' :
                            colorScheme === 'red' ? 'bg-red-700' :
                            colorScheme === 'green' ? 'bg-emerald-700' :
                            'bg-amber-700'
                          } rounded-full animate-bounce transition-all duration-1000`} style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    )}

               
                    <button
                      onClick={handleNext}
                      className={`relative w-full bg-gradient-to-r ${
                        colorScheme === 'blue' ? 'from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 border-blue-400 hover:shadow-blue-600/40' :
                        colorScheme === 'red' ? 'from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:via-red-400 hover:to-red-500 border-red-400 hover:shadow-red-600/40' :
                        colorScheme === 'green' ? 'from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500 border-emerald-400 hover:shadow-emerald-600/40' :
                        'from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 border-amber-400 hover:shadow-amber-600/40'
                      } text-slate-950 font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-3 border-3 shadow-xl overflow-hidden group`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      {currentScene.isUnlock && <Unlock className="w-7 h-7 group-hover:rotate-12 transition-transform" />}
                      <span className="text-xl relative z-10">{currentScene.buttonText}</span>
                      <ChevronRight className="w-7 h-7 group-hover:translate-x-2 transition-transform relative z-10" />
                    </button>

                
                    {isLastScene && (
                      <div className="flex items-center justify-center gap-2 bg-black/60 backdrop-blur-md rounded-full py-3 px-6">
                        <div className={`w-2 h-2 ${colors.text.replace('text-', 'bg-')} rounded-full animate-ping`} />
                        <p className={`${colors.text} text-sm text-center animate-pulse font-medium`}>
                          Click to restart your adventure
                        </p>
                        <div className={`w-2 h-2 ${colors.text.replace('text-', 'bg-')} rounded-full animate-ping`} />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscapeRoom;