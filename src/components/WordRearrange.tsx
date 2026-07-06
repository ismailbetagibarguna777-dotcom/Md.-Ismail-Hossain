import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, ChevronLeft, Award, RotateCcw, ArrowRight, CheckCircle2, Lock, Sparkles, HelpCircle } from 'lucide-react';
import { BENGALI_REARRANGE_WORDS_DATA, RearrangeWordItem } from '../data/rearrangeWords';
import { getEmojiImage } from '../utils';

// Simple confetti particle generator for correct answers
function SparkleBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {[...Array(24)].map((_, i) => {
        const angle = (i * 360) / 24;
        const radius = Math.random() * 120 + 80;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        const colors = ['#38bdf8', '#34d399', '#f43f5e', '#fbbf24', '#a78bfa', '#ec4899'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, Math.random() * 1.5 + 0.5, 0],
              x: x,
              y: y,
              opacity: [1, 1, 0]
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full"
            style={{ backgroundColor: randomColor }}
          />
        );
      })}
    </div>
  );
}

interface WordRearrangeProps {
  speak: (text: string) => void;
  playWhooshSound?: () => void;
}

export function WordRearrange({ speak, playWhooshSound }: WordRearrangeProps) {
  // Game states
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [shuffledPool, setShuffledPool] = useState<{ id: string; letter: string }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  
  // Scores state: maps phase ID (1-20) to highest completed word count
  const [scores, setScores] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('bangla_rearrange_scores');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  // Track completed words within current level session
  const [sessionCompleted, setSessionCompleted] = useState<Set<number>>(() => new Set());

  // Total words completed overall
  const totalScore = useMemo(() => {
    return Object.values(scores).reduce((acc: number, curr: number) => acc + curr, 0);
  }, [scores]);

  // Filter 200 words into distinct phases (10 words per phase)
  const phases = useMemo(() => {
    const pList = [];
    for (let p = 1; p <= 20; p++) {
      const pWords = BENGALI_REARRANGE_WORDS_DATA.filter(w => w.phase === p);
      pList.push({
        phase: p,
        title: pWords[0]?.phaseTitle || `ধাপ ${p}`,
        words: pWords,
        highScore: scores[p] || 0
      });
    }
    return pList;
  }, [scores]);

  // Current active word list
  const activeWords = useMemo(() => {
    if (selectedPhase === null) return [];
    return BENGALI_REARRANGE_WORDS_DATA.filter(w => w.phase === selectedPhase);
  }, [selectedPhase]);

  const currentWord = useMemo<RearrangeWordItem | null>(() => {
    if (!activeWords.length || currentWordIndex >= activeWords.length) return null;
    return activeWords[currentWordIndex];
  }, [activeWords, currentWordIndex]);

  // Handle setting/resetting of spelling pool
  const initializeWord = (wordItem: RearrangeWordItem) => {
    setPlacedLetters(Array(wordItem.parts.length).fill(''));
    setIsCorrect(false);
    setShowCelebration(false);
    setImageError(false);
    
    // Create pool with unique IDs to allow same letter multiple times
    const pool = wordItem.parts.map((letter, idx) => ({
      id: `${letter}-${idx}`,
      letter
    }));
    
    // Shuffle the pool securely and verify it's not already correct
    let shuffled = [...pool].sort(() => Math.random() - 0.5);
    let attempts = 0;
    while (
      shuffled.map(item => item.letter).join('') === wordItem.word &&
      shuffled.length > 1 &&
      attempts < 10
    ) {
      shuffled = [...pool].sort(() => Math.random() - 0.5);
      attempts++;
    }
    
    setShuffledPool(shuffled);
    // Speak word upon starting
    speak(wordItem.word);
  };

  // Setup word when current word changes
  useEffect(() => {
    if (currentWord) {
      initializeWord(currentWord);
    }
  }, [currentWord]);

  // Check if placement matches original word
  const checkSpelling = (currentPlacements: string[]) => {
    if (!currentWord) return;
    const spelled = currentPlacements.join('');
    
    if (spelled === currentWord.word) {
      setIsCorrect(true);
      setShowCelebration(true);
      speak("চমৎকার! সঠিক শব্দ হয়েছে: " + currentWord.word);
      
      // Update session sets
      setSessionCompleted(prev => {
        const next = new Set(prev);
        next.add(currentWord.id);
        
        // Save score to persistent high scores
        if (selectedPhase !== null) {
          const currentPhaseWords = BENGALI_REARRANGE_WORDS_DATA.filter(w => w.phase === selectedPhase);
          const completedInThisPhase = currentPhaseWords.filter(w => next.has(w.id)).length;
          
          setScores(oldScores => {
            const previousHighScore = oldScores[selectedPhase] || 0;
            if (completedInThisPhase > previousHighScore) {
              const updated = { ...oldScores, [selectedPhase]: completedInThisPhase };
              localStorage.setItem('bangla_rearrange_scores', JSON.stringify(updated));
              return updated;
            }
            return oldScores;
          });
        }
        return next;
      });
    }
  };

  // Add a letter to first empty placed slot
  const handleSelectPoolLetter = (tile: { id: string; letter: string }) => {
    if (isCorrect) return;
    
    // Play subtle audio whoosh if provided
    if (playWhooshSound) playWhooshSound();

    const emptyIdx = placedLetters.indexOf('');
    if (emptyIdx !== -1) {
      const nextPlaced = [...placedLetters];
      nextPlaced[emptyIdx] = tile.letter;
      setPlacedLetters(nextPlaced);
      
      // Remove from pool
      setShuffledPool(prev => prev.filter(item => item.id !== tile.id));
      
      // Check spelling if no empty slots remain
      if (nextPlaced.indexOf('') === -1) {
        checkSpelling(nextPlaced);
      }
    }
  };

  // Return placed letter back to the pool
  const handleRemovePlacedLetter = (index: number) => {
    if (isCorrect || !placedLetters[index]) return;
    
    if (playWhooshSound) playWhooshSound();

    const returnedLetter = placedLetters[index];
    const nextPlaced = [...placedLetters];
    nextPlaced[index] = '';
    setPlacedLetters(nextPlaced);

    // Return to pool with a unique ID
    setShuffledPool(prev => [...prev, {
      id: `${returnedLetter}-${Date.now()}-${Math.random()}`,
      letter: returnedLetter
    }]);
  };

  const handleResetWord = () => {
    if (currentWord) {
      initializeWord(currentWord);
    }
  };

  const handleNextWord = () => {
    if (selectedPhase === null) return;
    if (currentWordIndex < activeWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      // Completed all 10 words of the phase! Back to overview.
      setSelectedPhase(null);
    }
  };

  return (
    <div className="w-full text-slate-100 select-none">
      {/* Overview scoreboard badge */}
      <div className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md border border-[#30363d] rounded-2xl px-5 py-4 mb-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500/10 p-2.5 rounded-xl border border-teal-500/20 text-teal-400">
            <Award className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-200">শব্দ সাজানো স্কোরবোর্ড</h2>
            <p className="text-[11px] text-slate-400">২০০ শব্দের চ্যালেঞ্জিং লেভেল শেষ করো</p>
          </div>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] px-4 py-2 rounded-xl text-center">
          <div className="text-[10px] uppercase tracking-wider font-black text-teal-400">মোট স্কোর</div>
          <div className="text-xl sm:text-2xl font-black text-white">{totalScore} <span className="text-xs text-slate-500">/ ২০০</span></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedPhase === null ? (
          /* Level Grid Selection (20 Phases) */
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="text-center max-w-xl mx-auto space-y-2 py-2">
              <span className="bg-indigo-500/10 text-indigo-400 text-xs font-black px-3.5 py-1.5 rounded-full border border-indigo-500/20">
                ⭐ নতুন টাস্ক: বর্ণ দিয়ে শব্দ তৈরি
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">বর্ণ দিয়ে শব্দ সাজানো (Rearrange)</h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                সহজ থেকে কঠিন স্তরে ২০০ বাংলা শব্দ সাজানো আছে। প্রতি ধাপে ১০টি করে শব্দ থাকবে। ছবির সাহায্য নিয়ে এলোমেলো বর্ণগুলো সাজিয়ে শব্দ তৈরি করো!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {phases.map((ph, idx) => {
                const isUnlocked = idx === 0 || phases[idx - 1].highScore >= 5; // Unlocks as long as previous level has at least 5 stars/words solved
                return (
                  <motion.div
                    key={ph.phase}
                    whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
                    whileTap={isUnlocked ? { scale: 0.98 } : {}}
                    onClick={() => {
                      if (isUnlocked) {
                        setSelectedPhase(ph.phase);
                        setCurrentWordIndex(0);
                      } else {
                        speak("এই ধাপটি লক করা আছে। পূর্ববর্তী ধাপে অন্তত ৫টি শব্দ সঠিক সমাধান করো!");
                      }
                    }}
                    className={`relative p-4 rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                      isUnlocked 
                        ? 'bg-[#161b22] border-[#30363d] hover:border-teal-500/50 shadow-md hover:shadow-teal-950/20' 
                        : 'bg-[#0d1117]/80 border-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {/* Glowing Accent Side-Ribbon */}
                    {isUnlocked && (
                      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${
                        idx < 4 ? 'from-green-400 to-emerald-600' :
                        idx < 8 ? 'from-teal-400 to-cyan-600' :
                        idx < 12 ? 'from-indigo-400 to-blue-600' :
                        idx < 16 ? 'from-amber-400 to-orange-600' :
                        'from-rose-400 to-pink-600'
                      }`} />
                    )}

                    <div className="flex items-start justify-between">
                      <div className="space-y-1 pl-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                            isUnlocked ? 'bg-slate-800 text-teal-400' : 'bg-slate-900 text-slate-600'
                          }`}>
                            ধাপ - {ph.phase}
                          </span>
                          {ph.highScore === 10 && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          )}
                        </div>
                        <h3 className={`text-sm sm:text-base font-black ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                          {ph.title}
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          শব্দ পরিসর: {idx * 10 + 1} - {idx * 10 + 10}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {isUnlocked ? (
                          <div className="text-right">
                            <div className="text-xs font-bold text-slate-300">সমাধান</div>
                            <div className="text-sm font-black text-teal-400">{ph.highScore} / ১০</div>
                          </div>
                        ) : (
                          <Lock className="w-5 h-5 text-slate-700 mt-2 mr-2" />
                        )}
                      </div>
                    </div>

                    {/* Progress Bar inside card */}
                    {isUnlocked && (
                      <div className="mt-3.5 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-teal-400 transition-all duration-500" 
                          style={{ width: `${(ph.highScore / 10) * 100}%` }}
                        />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* Active Word Arrange Puzzle Panel */
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl mx-auto bg-[#161b22] border border-[#30363d] rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Celebration Effect */}
            <SparkleBurst active={showCelebration} />

            {/* Header row */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#30363d]/50">
              <button
                onClick={() => {
                  if (playWhooshSound) playWhooshSound();
                  setSelectedPhase(null);
                }}
                className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>সব ধাপ</span>
              </button>
              
              <div className="text-center">
                <span className="text-xs uppercase tracking-wider font-black text-teal-400 block">
                  ধাপ {selectedPhase}: শব্দ {currentWordIndex + 1} / ১০
                </span>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                  {phases[selectedPhase - 1].title}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-black bg-teal-500/10 text-teal-400 px-3 py-1.5 rounded-xl border border-teal-500/25">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span>স্কোর: {phases[selectedPhase - 1].highScore}/১০</span>
              </div>
            </div>

            {currentWord && (
              <div className="space-y-6 sm:space-y-8">
                {/* Main panel - image and target slots */}
                <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
                  
                  {/* Left: Illustration Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-3xl blur opacity-30 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center overflow-hidden p-4">
                      
                      {/* Image render or emoji fallback */}
                      {!imageError ? (
                        <img
                          src={getEmojiImage(currentWord.emoji, 128)}
                          alt={currentWord.word}
                          referrerPolicy="no-referrer"
                          onError={() => setImageError(true)}
                          className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-2xl animate-bounce"
                          style={{ animationDuration: '3s' }}
                        />
                      ) : (
                        <div 
                          className="text-6xl sm:text-7xl select-none animate-bounce flex items-center justify-center"
                          style={{ animationDuration: '3s' }}
                        >
                          {currentWord.emoji}
                        </div>
                      )}

                      {/* Speaking TTS button overlay */}
                      <button
                        onClick={() => speak(currentWord.word)}
                        className="absolute bottom-2.5 right-2.5 bg-teal-500 hover:bg-teal-600 p-2.5 rounded-2xl shadow-lg border border-teal-400/20 text-white transition active:scale-90"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>

                      {/* Hint English title overlay */}
                      <div className="absolute top-2 px-2.5 py-0.5 bg-slate-900/80 border border-[#30363d] text-[10px] font-black text-slate-300 rounded-full">
                        {currentWord.english}
                      </div>
                    </div>
                  </div>

                  {/* Right: Answer Slots & Progress */}
                  <div className="flex-1 w-full text-center md:text-left space-y-4">
                    <div>
                      <h4 className="text-xs text-slate-400 uppercase tracking-widest font-black">সঠিক বানানে সাজাও</h4>
                      <p className="text-xs text-slate-500 mt-1">বর্ণগুলোতে ক্লিক করো সঠিক ক্রমে সাজাতে</p>
                    </div>

                    {/* Target Answer Slots */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3 py-2">
                      {placedLetters.map((letter, idx) => (
                        <motion.div
                          key={`placed-${idx}`}
                          onClick={() => handleRemovePlacedLetter(idx)}
                          whileHover={letter ? { scale: 1.05 } : {}}
                          whileTap={letter ? { scale: 0.95 } : {}}
                          className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center font-black text-base sm:text-xl cursor-pointer transition-all ${
                            letter 
                              ? 'bg-gradient-to-br from-teal-500 to-indigo-600 border-teal-400 text-white shadow-md shadow-teal-950/20' 
                              : 'bg-slate-900/60 border-dashed border-[#30363d] text-slate-600 hover:border-slate-500'
                          }`}
                        >
                          {letter || '?' }
                        </motion.div>
                      ))}
                    </div>

                    {/* Help/Hint button if they get stuck */}
                    <div className="flex items-center justify-center md:justify-start gap-2 text-[11px] text-slate-400 bg-slate-900/40 border border-slate-800/60 p-2.5 rounded-xl">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      <span>তুমি ভুল সাজালে বর্ণে ট্যাপ করে তা পুনরায় পুলে ফেরত নিতে পারো।</span>
                    </div>
                  </div>
                </div>

                {/* Pool of Shuffled Letters */}
                <div className="space-y-3 bg-[#0d1117] border border-[#30363d]/40 rounded-2xl p-4 text-center">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">এলোমেলো বর্ণমালা</div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3 py-1">
                    <AnimatePresence>
                      {shuffledPool.map((tile) => (
                        <motion.button
                          key={tile.id}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, y: -20, opacity: 0 }}
                          whileHover={{ scale: 1.12, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSelectPoolLetter(tile)}
                          className="px-4 py-3 sm:px-5 sm:py-4 bg-gradient-to-b from-[#1c212c] to-[#161b22] hover:from-slate-800 hover:to-slate-900 border border-[#30363d] hover:border-indigo-500 text-white rounded-2xl font-black text-lg sm:text-2xl shadow-md min-w-[50px] sm:min-w-[64px]"
                        >
                          {tile.letter}
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer Controls / Celebration banner */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    onClick={handleResetWord}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-3 rounded-2xl border border-slate-700 text-xs sm:text-sm font-black transition active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>পুনরায় শুরু</span>
                  </button>

                  <div className="flex-1" />

                  {isCorrect ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
                    >
                      <span className="text-xs sm:text-sm font-black text-green-400 flex items-center gap-1.5 animate-bounce">
                        🎉 দারুণ! অসাধারণ সমাধান!
                      </span>
                      <button
                        onClick={handleNextWord}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-emerald-950/20 transition active:scale-95"
                      >
                        <span>{currentWordIndex < activeWords.length - 1 ? 'পরবর্তী শব্দ' : 'ধাপ সমাপ্ত!'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <div className="text-xs text-slate-400 font-bold text-center sm:text-right w-full sm:w-auto">
                      ছবি দেখে সঠিক বানানটি পূর্ণ করো
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
