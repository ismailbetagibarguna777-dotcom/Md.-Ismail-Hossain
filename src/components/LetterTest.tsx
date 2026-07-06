import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BENGALI_ALPHABET } from '../data';
import { AlphabetItem } from '../types';
import { Icon } from './Icon';
import { getEmojiImage } from '../utils';

// Visual particle burst for correct answers
function SparkleBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {[...Array(24)].map((_, i) => {
        const angle = (i * 360) / 24;
        const radius = Math.random() * 140 + 80;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        const colors = ['#f43f5e', '#34d399', '#60a5fa', '#fbbf24', '#c084fc', '#f472b6'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, Math.random() * 1.6 + 0.6, 0],
              x: x,
              y: y,
              opacity: [1, 1, 0]
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full shadow-lg"
            style={{ backgroundColor: randomColor }}
          />
        );
      })}
    </div>
  );
}

// Custom synthesized audio feedback for young learners
const playSynthSound = (type: 'correct' | 'wrong' | 'celebrate') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (type === 'correct') {
      // Cheerful high-pitch double tone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc2.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.2); // C6

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.3);
      osc2.stop(ctx.currentTime + 0.3);
    } else if (type === 'wrong') {
      // Soft gentle warning slide
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'celebrate') {
      // Short arpeggio fanfare
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.3);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
      });
    }
  } catch (err) {
    console.warn('Audio Context sound failed:', err);
  }
};

interface LetterTestProps {
  type: 'vowel' | 'consonant';
  speak: (text: string) => Promise<void>;
}

export const LetterTest: React.FC<LetterTestProps> = ({ type, speak }) => {
  const [gameMode, setGameMode] = useState<'find' | 'explore'>('find');
  const [shuffledLetters, setShuffledLetters] = useState<AlphabetItem[]>([]);
  const [targetLetter, setTargetLetter] = useState<AlphabetItem | null>(null);
  
  // Scoring / Stats
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const key = `bangla_letter_test_highscore_${type}`;
    return Number(localStorage.getItem(key) || '0');
  });

  // Level progress
  const [showConfetti, setShowConfetti] = useState(false);
  const [correctId, setCorrectId] = useState<string | null>(null);
  const [incorrectId, setIncorrectId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Interactive letter info panel (for explore mode and after a click in test mode)
  const [activeInfoLetter, setActiveInfoLetter] = useState<AlphabetItem | null>(null);
  const [isRoundComplete, setIsRoundComplete] = useState(false);
  const [hoveredLetterId, setHoveredLetterId] = useState<string | null>(null);
  const TOTAL_ROUND_QUESTIONS = 10;

  // Filter the full alphabet for correct type
  const rawLetters = useMemo(() => {
    return BENGALI_ALPHABET.filter(item => item.type === type);
  }, [type]);

  // Handle initialization and shuffle
  const startNewRound = () => {
    const shuffled = [...rawLetters].sort(() => Math.random() - 0.5);
    setShuffledLetters(shuffled);
    setIsRoundComplete(false);
    setScore(0);
    setQuestionsAnswered(0);
    setStreak(0);
    setCorrectId(null);
    setIncorrectId(null);
    setActiveInfoLetter(null);
    setErrorMessage('');

    // Select first target
    if (shuffled.length > 0) {
      const randomTarget = shuffled[Math.floor(Math.random() * shuffled.length)];
      setTargetLetter(randomTarget);
      playVoicePrompt(randomTarget.letter);
    }
  };

  // Select next target letter
  const pickNewTarget = (currentList: AlphabetItem[]) => {
    if (currentList.length === 0) return;
    const randomTarget = currentList[Math.floor(Math.random() * currentList.length)];
    setTargetLetter(randomTarget);
    setCorrectId(null);
    setIncorrectId(null);
    playVoicePrompt(randomTarget.letter);
  };

  // Text-To-Speech Prompt
  const playVoicePrompt = (letter: string) => {
    if (gameMode === 'find') {
      speak(`${letter} বর্ণটি কোথায়? খুঁজে বের করো!`);
    } else {
      speak(letter);
    }
  };

  // Run on mount or when type/mode changes
  useEffect(() => {
    startNewRound();
  }, [type, gameMode]);

  // Handle Letter Clicks
  const handleLetterClick = (item: AlphabetItem) => {
    // Read aloud the letter immediately as requested
    speak(item.letter);

    // 1. EXPLORE MODE: Just speak and display info card
    if (gameMode === 'explore') {
      setActiveInfoLetter(item);
      // Play name of first word if available after a brief pause so they don't overlap too harshly
      if (item.words && item.words.length > 0) {
        setTimeout(() => {
          speak(`${item.letter}-এ ${item.words[0].word}`);
        }, 1000);
      }
      return;
    }

    // 2. TEST / FIND IT MODE
    if (isRoundComplete || correctId !== null) return; // Prevent double clicking during success state

    if (targetLetter && item.id === targetLetter.id) {
      // CORRECT ANSWER!
      setCorrectId(item.id);
      playSynthSound('correct');
      setShowConfetti(true);
      setActiveInfoLetter(item);
      setScore(prev => prev + 1);
      setQuestionsAnswered(prev => prev + 1);
      
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highScore) {
        setHighScore(newStreak);
        localStorage.setItem(`bangla_letter_test_highscore_${type}`, String(newStreak));
      }

      // Check for round completion
      if (questionsAnswered + 1 >= TOTAL_ROUND_QUESTIONS) {
        setTimeout(() => {
          playSynthSound('celebrate');
          setIsRoundComplete(true);
          speak(`অভিনন্দন! তুমি দশটির মধ্যে ${score + 1}টি সঠিক উত্তর দিয়েছ!`);
        }, 1500);
      } else {
        // Proceed to next question after short delay
        setTimeout(() => {
          setShowConfetti(false);
          // Shuffle position occasionally to keep it challenging
          const reShuffled = [...shuffledLetters].sort(() => Math.random() - 0.5);
          setShuffledLetters(reShuffled);
          pickNewTarget(reShuffled);
        }, 2200);
      }
    } else {
      // INCORRECT ANSWER
      setIncorrectId(item.id);
      playSynthSound('wrong');
      setStreak(0);
      setErrorMessage(`না, ওটা তো '${item.letter}' বর্ণ! আরেকবার চেষ্টা করো! 💪`);
      
      // Delay incorrect helper voice slightly to let the immediate letter sound finish
      setTimeout(() => {
        speak(`আরেকবার চেষ্টা করো! ওটা তো ${item.letter}`);
      }, 1200);

      // Clear shake effect shortly
      setTimeout(() => {
        setIncorrectId(null);
      }, 1000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      {/* Decorative Top Accent */}
      <div className="text-center mb-8">
        <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase border shadow-md inline-flex items-center gap-1.5 ${
          type === 'vowel' 
            ? 'bg-rose-950/40 text-rose-300 border-rose-500/30' 
            : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
        }`}>
          <Icon name="Award" className="w-4 h-4 animate-bounce" />
          {type === 'vowel' ? 'স্বরবর্ণ পরিচিতি পরীক্ষা' : 'ব্যঞ্জনবর্ণ পরিচিতি পরীক্ষা'}
        </span>
      </div>

      {/* Mode Switches & Quick Stats Panel */}
      <div className="bg-[#11161d] border border-[#30363d] rounded-[2rem] p-6 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-between items-center relative z-10">
          
          {/* Mode Selector */}
          <div className="flex bg-[#161b22] border border-[#30363d] p-1.5 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => setGameMode('find')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                gameMode === 'find'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow-lg'
                  : 'text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              <Icon name="HelpCircle" className="w-4 h-4" />
              <span>খুঁজে বের করো 🔍</span>
            </button>
            <button
              onClick={() => setGameMode('explore')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                gameMode === 'explore'
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg'
                  : 'text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              <Icon name="Compass" className="w-4 h-4" />
              <span>স্পর্শ করে শেখো 🧭</span>
            </button>
          </div>

          {/* Dynamic Stat Badges */}
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {gameMode === 'find' && (
              <>
                <div className="bg-[#161b22] border border-[#30363d] px-4 py-2 rounded-2xl text-center">
                  <p className="text-[10px] text-[#8b949e] font-black uppercase tracking-wider">সঠিক উত্তর</p>
                  <p className="text-sm sm:text-base font-black text-[#f0f6fc]">{score} / {TOTAL_ROUND_QUESTIONS}</p>
                </div>
                
                <div className="bg-[#161b22] border border-amber-500/20 px-4 py-2 rounded-2xl text-center flex items-center gap-2">
                  <div className="w-7 h-7 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center">
                    <Icon name="Zap" className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-[#8b949e] font-black uppercase">ধারাবাহিক</p>
                    <p className="text-xs sm:text-sm font-black text-[#f0f6fc]">{streak} 🔥</p>
                  </div>
                </div>
              </>
            )}

            <div className="bg-[#161b22] border border-indigo-500/20 px-4 py-2 rounded-2xl text-center flex items-center gap-2">
              <div className="w-7 h-7 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center">
                <Icon name="Award" className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="text-[9px] text-[#8b949e] font-black uppercase">সেরা রেকর্ড</p>
                <p className="text-xs sm:text-sm font-black text-[#f0f6fc]">{highScore} 🔥</p>
              </div>
            </div>

            <button
              onClick={startNewRound}
              className="bg-[#161b22] border border-[#30363d] hover:bg-[#21262d] w-10 h-10 rounded-2xl flex items-center justify-center text-slate-300 transition-all cursor-pointer"
              title="নতুন করে শুরু করুন"
            >
              <Icon name="RotateCcw" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Level Progress Indicator */}
        {gameMode === 'find' && (
          <div className="mt-5 pt-4 border-t border-[#21262d] space-y-1.5">
            <div className="flex justify-between items-center text-xs font-black text-[#8b949e]">
              <span>অগ্রগতি (Progress)</span>
              <span>{questionsAnswered} / {TOTAL_ROUND_QUESTIONS}</span>
            </div>
            <div className="w-full h-3 bg-[#0d1117] rounded-full overflow-hidden border border-[#21262d]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(questionsAnswered / TOTAL_ROUND_QUESTIONS) * 100}%` }}
                className="h-full bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-emerald-500 rounded-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Game Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Shuffled Letter Board Grid (Left/Center Column) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#11161d] border border-[#30363d] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative">
            <SparkleBurst active={showConfetti} />

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm sm:text-base font-black text-[#f0f6fc] flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
                {gameMode === 'find' ? 'সঠিক বর্ণটি স্পর্শ করো! 👉' : 'যেকোনো বর্ণ স্পর্শ করে সঠিক উচ্চারণ শোনো 🔊'}
              </h3>
              
              <span className="text-[11px] font-black bg-slate-800 text-slate-400 px-3 py-1 rounded-full uppercase tracking-wider">
                এলোমেলো লেআউট
              </span>
            </div>

            {/* Letter Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-3 sm:gap-4 justify-center">
              {shuffledLetters.map((item) => {
                const isCorrectMatch = correctId === item.id;
                const isIncorrectMatch = incorrectId === item.id;
                const firstWord = item.words && item.words[0];

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredLetterId(item.id)}
                    onMouseLeave={() => setHoveredLetterId(null)}
                  >
                    <motion.button
                      whileHover={{ scale: 1.12, y: -4 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLetterClick(item)}
                      className={`w-full aspect-square rounded-3xl text-3xl sm:text-4xl font-black font-sans shadow-lg flex items-center justify-center transition-all cursor-pointer relative overflow-hidden select-none border-2 ${
                        isCorrectMatch
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-white text-white scale-105 z-20 shadow-green-950/40 ring-4 ring-green-500/40'
                          : isIncorrectMatch
                          ? 'bg-gradient-to-br from-rose-500 to-red-600 border-rose-400 text-white ring-4 ring-red-500/40'
                          : activeInfoLetter?.id === item.id
                          ? 'border-indigo-500 shadow-indigo-950/40 scale-105 z-10'
                          : 'border-[#30363d] hover:border-indigo-400'
                      }`}
                      style={{
                        // Use custom colors from data array for variety in explore mode
                        background: !isCorrectMatch && !isIncorrectMatch ? 'linear-gradient(135deg, #1f2937, #111827)' : undefined,
                        color: !isCorrectMatch && !isIncorrectMatch ? '#f3f4f6' : undefined
                      }}
                      animate={isIncorrectMatch ? { x: [-8, 8, -6, 6, 0] } : {}}
                      transition={isIncorrectMatch ? { duration: 0.4 } : undefined}
                    >
                      {/* Bubbly decorative inner reflection */}
                      <div className="absolute top-1 left-1.5 w-full h-1/2 bg-white/5 rounded-full pointer-events-none transform -skew-x-12" />
                      
                      <span>{item.letter}</span>

                      {/* Cute status tiny dots */}
                      {isCorrectMatch && (
                        <span className="absolute bottom-1 right-1 bg-white text-emerald-600 rounded-full p-0.5 shadow-md">
                          <Icon name="Check" className="w-3 h-3" />
                        </span>
                      )}
                    </motion.button>

                    {/* Popover picture showing on hover */}
                    <AnimatePresence>
                      {hoveredLetterId === item.id && firstWord && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.7, y: 15, x: '-50%' }}
                          animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
                          exit={{ opacity: 0, scale: 0.7, y: 15, x: '-50%' }}
                          transition={{ type: 'spring', damping: 15 }}
                          className="absolute bottom-full left-1/2 mb-4 z-40 pointer-events-auto"
                        >
                          <div className="bg-slate-900 border-2 border-indigo-500 p-2.5 rounded-2xl shadow-2xl flex flex-col items-center gap-1.5 min-w-[120px] relative">
                            {/* Zoomable Picture Wrapper */}
                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800 relative shadow-inner">
                              <img
                                src={firstWord.img || getEmojiImage(firstWord.emoji, 128)}
                                alt={firstWord.word}
                                className="w-full h-full object-cover transition-transform duration-300 ease-out cursor-zoom-in hover:scale-175 hover:rotate-2 z-50 rounded-lg"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  // Fallback to emoji if main img fails to load or is empty
                                  const target = e.target as HTMLImageElement;
                                  const fallbackSrc = getEmojiImage(firstWord.emoji, 128);
                                  if (target.src !== fallbackSrc) {
                                    target.src = fallbackSrc;
                                  }
                                }}
                              />
                            </div>
                            <span className="text-[11px] font-black text-[#f0f6fc] select-none text-center bg-slate-800/80 px-2 py-0.5 rounded-full">
                              {item.letter}-এ {firstWord.word}
                            </span>
                            {/* Little downward arrow indicator */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[6px] w-2.5 h-2.5 bg-slate-900 border-r-2 border-b-2 border-indigo-500 rotate-45" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Instructions / Dynamic Target Box (Right Column) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Target Prompter for Test Mode */}
          {gameMode === 'find' && !isRoundComplete && targetLetter && (
            <motion.div
              layout
              className="bg-[#11161d] border border-[#30363d] rounded-[2rem] p-6 text-center shadow-xl relative overflow-hidden flex flex-col items-center"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-emerald-500"></div>

              <span className="text-[10px] bg-indigo-950/50 border border-indigo-500/20 text-indigo-300 font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                খুঁজে বের করার নির্দেশ
              </span>

              <h4 className="text-base sm:text-lg font-black text-slate-300 mb-2">বলতো দেখি, নিচের বর্ণটি কোথায়?</h4>
              
              <div className="relative my-4">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => playVoicePrompt(targetLetter.letter)}
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-950/50 cursor-pointer border border-white/20"
                >
                  <Icon name="Volume2" className="w-10 h-10 animate-pulse" />
                </motion.button>
              </div>

              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-300">
                "{targetLetter.letter}"
              </span>

              <p className="text-xs text-[#8b949e] mt-2">
                শব্দ শুনতে গোল বোতামটিতে ট্যাপ করো
              </p>

              {/* Status or instruction hints */}
              <AnimatePresence mode="wait">
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-3 bg-rose-950/40 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-black w-full"
                  >
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Interactive Letter Info Panel (e.g. ক -> অজগর 🐍) */}
          <AnimatePresence>
            {activeInfoLetter && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-[#11161d] border border-[#30363d] rounded-[2rem] p-6 shadow-xl relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1.5 ${activeInfoLetter.color || 'bg-indigo-500'}`} />

                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">বর্ণের শব্দ উপহার 🎁</span>
                  <button 
                    onClick={() => setActiveInfoLetter(null)}
                    className="text-[#8b949e] hover:text-[#f0f6fc]"
                  >
                    <Icon name="X" className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black font-sans text-white border border-white/10 ${activeInfoLetter.color || 'bg-indigo-600'}`}>
                    {activeInfoLetter.letter}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#f0f6fc]">
                      {activeInfoLetter.letter} দিয়ে শব্দ
                    </h4>
                    <p className="text-xs text-slate-400">
                      স্পর্শ করো সঠিক উদাহরণ দেখতে
                    </p>
                  </div>
                </div>

                {/* Words display */}
                {activeInfoLetter.words && activeInfoLetter.words.length > 0 && (
                  <div className="mt-5 space-y-3">
                    {activeInfoLetter.words.slice(0, 3).map((w, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => speak(`${activeInfoLetter.letter}-এ ${w.word}`)}
                        className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-indigo-500 transition-all text-left text-xs sm:text-sm font-bold text-[#f0f6fc] cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl bg-slate-800 p-1.5 rounded-xl">{w.emoji || '📖'}</span>
                          <span className="font-extrabold text-[#f0f6fc]">{w.word}</span>
                        </div>
                        <Icon name="Volume2" className="w-4 h-4 text-[#8b949e]" />
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Guidelines Box */}
          <div className="bg-gradient-to-br from-[#11161d] to-[#161b22] border border-[#30363d] rounded-[2rem] p-5 shadow-md">
            <div className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-3 border border-amber-500/20">
              <Icon name="Sparkles" className="w-4 h-4" />
            </div>
            <h4 className="text-xs sm:text-sm font-black text-[#f0f6fc] mb-1">কীভাবে পরীক্ষা দিবে? 💡</h4>
            <p className="text-[11px] text-[#8b949e] leading-relaxed">
              ১. <strong>খুঁজে বের করো</strong> মুডে ভয়েস শুনে সঠিক বর্ণটি স্পর্শ করবে।<br />
              ২. প্রতি ভুল উত্তরে ধারাবাহিকতা (streak) শূন্য হয়ে যাবে কিন্তু ভয়ের কিছু নেই, চেষ্টা বজায় রাখো!<br />
              ৩. <strong>স্পর্শ করে শেখো</strong> মুডে বর্ণগুলোর উপর স্পর্শ করে তাদের সুন্দর সুন্দর বাংলা উচ্চারণ ও শব্দ শিখবে।
            </p>
          </div>
        </div>
      </div>

      {/* Round End / Success Celebration Overlay Modal */}
      <AnimatePresence>
        {isRoundComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0d1117]/90 z-50 flex items-center justify-center px-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#11161d] border-2 border-indigo-500 rounded-[2.5rem] p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
            >
              {/* Balloon sparkles background */}
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-emerald-500" />
              
              <div className="my-4 text-6xl">🏆</div>

              <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-indigo-300 to-emerald-400 mb-2">
                অসাধারণ পারফরম্যান্স!
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                তুমি সফলভাবে {TOTAL_ROUND_QUESTIONS}টি প্রশ্নের উত্তর দেওয়ার পরীক্ষা সম্পন্ন করেছ!
              </p>

              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 mb-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-bold">মোট সঠিক উত্তর:</span>
                  <span className="text-sm font-black text-green-400">{score} / {TOTAL_ROUND_QUESTIONS}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-bold">মোট প্রাপ্ত পয়েন্ট:</span>
                  <span className="text-sm font-black text-amber-400">{score * 10} 🌟</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-bold">সর্বোচ্চ ধারাবাহিকতা:</span>
                  <span className="text-sm font-black text-indigo-400">{streak} 🔥</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={startNewRound}
                  className="w-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm py-3.5 rounded-2xl shadow-lg transition-all cursor-pointer"
                >
                  আবার খেলো 🔄
                </button>
                <button
                  onClick={() => setIsRoundComplete(false)}
                  className="w-full bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] border border-[#30363d] font-black text-xs py-3 rounded-2xl transition-all cursor-pointer"
                >
                  ফিরে যাও 🔙
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
