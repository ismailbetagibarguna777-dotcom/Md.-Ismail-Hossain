import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, RotateCcw, ArrowRight, Award, Heart, CheckCircle2, 
  AlertCircle, HelpCircle, ChevronLeft, Search, BookOpen, 
  Trash2, Trophy, Star, Sparkles, Filter 
} from 'lucide-react';
import { BENGALI_REARRANGE_WORDS_DATA, RearrangeWordItem } from '../data/rearrangeWords';
import { getEmojiImage } from '../utils';

interface WordMatchingGameProps {
  speak: (text: string) => void;
  playWhooshSound?: () => void;
}

// Sparkle/celebration particle burst
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

export function WordMatchingGame({ speak, playWhooshSound }: WordMatchingGameProps) {
  // Main sub-tab: 'game' | 'wordbank'
  const [activeSubTab, setActiveSubTab] = useState<'game' | 'wordbank'>('game');

  // Game state
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [placedLetters, setPlacedLetters] = useState<(string | null)[]>([]);
  const [letterPool, setLetterPool] = useState<{ id: string; letter: string }[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ id: string; letter: string } | null>(null);
  
  // Game metrics
  const [lives, setLives] = useState<number>(3);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [consecutiveWins, setConsecutiveWins] = useState<number>(0);
  
  // Learned words (unlocked in gameplay)
  const [learnedWordIds, setLearnedWordIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('bangla_matching_learned_words');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  // High scores mapped by phase
  const [highScores, setHighScores] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('bangla_matching_scores');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  // Word Bank view filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPhase, setFilterPhase] = useState<number | 'all'>('all');
  const [animatingCardId, setAnimatingCardId] = useState<number | null>(null);

  // Unique phases based on data
  const phases = useMemo(() => {
    const pList = [];
    for (let p = 1; p <= 10; p++) {
      const pWords = BENGALI_REARRANGE_WORDS_DATA.filter(w => w.phase === p);
      if (pWords.length > 0) {
        pList.push({
          phase: p,
          title: pWords[0]?.phaseTitle || `ধাপ ${p}`,
          words: pWords,
          highScore: highScores[p] || 0
        });
      }
    }
    return pList;
  }, [highScores]);

  // Words inside selected phase
  const activeWords = useMemo(() => {
    if (selectedPhase === null) return [];
    return BENGALI_REARRANGE_WORDS_DATA.filter(w => w.phase === selectedPhase).slice(0, 10);
  }, [selectedPhase]);

  // Current word in game
  const currentWord = useMemo<RearrangeWordItem | null>(() => {
    if (!activeWords.length || currentWordIndex >= activeWords.length) return null;
    return activeWords[currentWordIndex];
  }, [activeWords, currentWordIndex]);

  // Initialize word spelling
  const initializeGame = (wordItem: RearrangeWordItem) => {
    setIsCorrect(false);
    setShowCelebration(false);
    setIsGameOver(false);
    setPlacedLetters(Array(wordItem.parts.length).fill(null));
    setWrongAttempts(0);

    const originalParts = wordItem.parts.map((l, idx) => ({
      id: `${l}-${idx}`,
      letter: l
    }));

    // Distractor letters list to make it educational
    const distractors = ['ম', 'ক', 'ল', 'র', 'ব', 'ত', 'স', 'ন', 'প', 'জা'];
    const filteredDistractors = distractors.filter(d => !wordItem.parts.includes(d));
    const extraTilesCount = wordItem.parts.length <= 3 ? 1 : 2;
    
    const extraParts = Array.from({ length: extraTilesCount }).map((_, idx) => {
      const randomLetter = filteredDistractors[Math.floor(Math.random() * filteredDistractors.length)];
      return {
        id: `extra-${randomLetter}-${idx}`,
        letter: randomLetter
      };
    });

    const combinedPool = [...originalParts, ...extraParts];
    // Shuffle the letter pool
    let shuffled = [...combinedPool].sort(() => Math.random() - 0.5);
    
    let attempts = 0;
    while (
      shuffled.map(item => item.letter).join('') === wordItem.word &&
      shuffled.length > 1 &&
      attempts < 10
    ) {
      shuffled = [...combinedPool].sort(() => Math.random() - 0.5);
      attempts++;
    }

    setLetterPool(shuffled);
    speak(wordItem.word);
  };

  // Trigger init on word index change
  useEffect(() => {
    if (currentWord) {
      initializeGame(currentWord);
    }
  }, [currentWord]);

  // Handle Drag Start
  const handleDragStart = (e: React.DragEvent, item: { id: string; letter: string }) => {
    setDraggedItem(item);
    if (playWhooshSound) playWhooshSound();
  };

  // Handle Drag Over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Drop action
  const handleDrop = (index: number) => {
    if (!draggedItem || isCorrect || isGameOver) return;
    
    const targetLetter = currentWord?.parts[index];
    
    if (draggedItem.letter === targetLetter) {
      const nextPlaced = [...placedLetters];
      nextPlaced[index] = draggedItem.letter;
      setPlacedLetters(nextPlaced);
      
      setLetterPool(prev => prev.filter(item => item.id !== draggedItem.id));
      setDraggedItem(null);
      if (playWhooshSound) playWhooshSound();
      
      checkCompletion(nextPlaced);
    } else {
      handleMistake();
    }
  };

  // Direct click / Tap-to-Place (extremely reliable fallback for touch screens)
  const handleTileTap = (item: { id: string; letter: string }) => {
    if (isCorrect || isGameOver || !currentWord) return;

    const correctSlotsForThisLetter = currentWord.parts
      .map((part, idx) => (part === item.letter ? idx : null))
      .filter((idx): idx is number => idx !== null);

    const firstAvailableIndex = correctSlotsForThisLetter.find(idx => placedLetters[idx] === null);

    if (firstAvailableIndex !== undefined) {
      const nextPlaced = [...placedLetters];
      nextPlaced[firstAvailableIndex] = item.letter;
      setPlacedLetters(nextPlaced);
      
      setLetterPool(prev => prev.filter(tile => tile.id !== item.id));
      if (playWhooshSound) playWhooshSound();
      
      checkCompletion(nextPlaced);
    } else {
      handleMistake();
    }
  };

  const handleMistake = () => {
    setWrongAttempts(prev => prev + 1);
    setLives(prev => {
      const nextLives = prev - 1;
      if (nextLives <= 0) {
        setIsGameOver(true);
        speak("ওহ নো! আবার চেষ্টা করো সোনামণি!");
      } else {
        speak("ভুল হয়েছে, আবার চেষ্টা করো!");
      }
      return nextLives;
    });
    setDraggedItem(null);
  };

  const checkCompletion = (currentPlacements: (string | null)[]) => {
    if (!currentWord) return;
    const isAllPlaced = currentPlacements.every(p => p !== null);
    
    if (isAllPlaced) {
      setIsCorrect(true);
      setShowCelebration(true);
      setConsecutiveWins(prev => prev + 1);
      speak("চমৎকার! সঠিক হয়েছে: " + currentWord.word);

      // Add to word bank
      setLearnedWordIds(prev => {
        if (!prev.includes(currentWord.id)) {
          const updated = [...prev, currentWord.id];
          localStorage.setItem('bangla_matching_learned_words', JSON.stringify(updated));
          return updated;
        }
        return prev;
      });

      // Save high score
      if (selectedPhase !== null) {
        setHighScores(prevScores => {
          const currentHighScore = prevScores[selectedPhase] || 0;
          const nextScore = Math.max(currentHighScore, currentWordIndex + 1);
          const updated = { ...prevScores, [selectedPhase]: nextScore };
          localStorage.setItem('bangla_matching_scores', JSON.stringify(updated));
          return updated;
        });
      }
    }
  };

  // Next word handler
  const handleNextWord = () => {
    if (currentWordIndex < activeWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      speak("অভিনন্দন! তুমি এই ধাপের সবগুলো শব্দ সঠিকভাবে মিলিয়েছ!");
      setSelectedPhase(null);
      setCurrentWordIndex(0);
    }
  };

  // Reset current word
  const handleResetWord = () => {
    setLives(3);
    if (currentWord) {
      initializeGame(currentWord);
    }
  };

  // Filtered learned words list for gallery
  const filteredLearnedWords = useMemo(() => {
    const matchedObjects = BENGALI_REARRANGE_WORDS_DATA.filter(w => learnedWordIds.includes(w.id));
    return matchedObjects.filter(item => {
      const matchSearch = searchQuery.trim() === '' || 
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.english.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchPhase = filterPhase === 'all' || item.phase === Number(filterPhase);
      
      return matchSearch && matchPhase;
    });
  }, [learnedWordIds, searchQuery, filterPhase]);

  // Word Bank Pronunciation Practice Play
  const playWordPronunciation = (wordItem: RearrangeWordItem) => {
    setAnimatingCardId(wordItem.id);
    speak(wordItem.word);
    setTimeout(() => {
      setAnimatingCardId(null);
    }, 1000);
  };

  // Reset/Clear word bank progression
  const handleResetWordBank = () => {
    if (confirm("আপনি কি নিশ্চিত যে আপনি আপনার শব্দভাণ্ডার খালি করতে চান?")) {
      setLearnedWordIds([]);
      localStorage.removeItem('bangla_matching_learned_words');
      speak("শব্দভাণ্ডার সফলভাবে খালি করা হয়েছে");
    }
  };

  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden text-white select-none">
      
      {/* Top Banner Navigation & Progress Dashboard */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-[#21262d] pb-6 mb-6">
        <div>
          <div className="flex items-center gap-3">
            {selectedPhase !== null && activeSubTab === 'game' && (
              <button
                onClick={() => setSelectedPhase(null)}
                className="p-2 bg-[#161b22] hover:bg-[#21262d] rounded-xl border border-[#30363d] text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400 flex items-center gap-2">
                🎯 ছবি দেখে শব্দ মেলানোর খেলা (Word Match)
              </h2>
              <p className="text-[#8b949e] text-xs sm:text-sm mt-1">
                ছবি দেখে বর্ণগুলো সাজিয়ে বাংলা শব্দ তৈরির রোমাঞ্চকর শিক্ষণীয় খেলা ও শব্দভাণ্ডার।
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Switcher between Game and Word Bank */}
        <div className="flex items-center gap-2 bg-[#161b22] p-1.5 rounded-2xl border border-[#30363d] w-full lg:w-auto">
          <button
            onClick={() => {
              setActiveSubTab('game');
              setSelectedPhase(null);
              speak("খেলা খেলুন");
            }}
            className={`flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'game'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>খেলা খেলুন</span>
          </button>
          
          <button
            onClick={() => {
              setActiveSubTab('wordbank');
              speak("আমার শব্দভাণ্ডার");
            }}
            className={`flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer relative ${
              activeSubTab === 'wordbank'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>আমার শব্দভাণ্ডার</span>
            {learnedWordIds.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0d1117] animate-pulse">
                {learnedWordIds.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* SUB TAB 1: ACTIVE DRAG-AND-DROP GAMEPLAY */}
      {activeSubTab === 'game' && (
        <>
          {selectedPhase !== null && (
            <div className="flex justify-between items-center bg-[#161b22] border border-[#30363d] px-4 py-2 rounded-2xl mb-6">
              <span className="text-sm font-bold text-teal-400 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                ধাপ {selectedPhase}: {phases.find(p => p.phase === selectedPhase)?.title}
              </span>
              
              <div className="flex items-center gap-4">
                {/* Lives counter */}
                <div className="flex items-center gap-1.5">
                  {[...Array(3)].map((_, idx) => (
                    <Heart
                      key={idx}
                      className={`w-5 h-5 transition-all ${
                        idx < lives ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Progress badge */}
                <div className="text-xs font-mono font-bold bg-teal-950/40 border border-teal-800/40 px-2.5 py-1 rounded-lg text-teal-400">
                  অগ্রগতি: {currentWordIndex + 1}/{activeWords.length}
                </div>
              </div>
            </div>
          )}

          {/* PHASE SELECTION SCREEN */}
          {selectedPhase === null ? (
            <div className="py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phases.map((p) => (
                  <motion.div
                    key={p.phase}
                    whileHover={{ scale: 1.015 }}
                    onClick={() => {
                      setSelectedPhase(p.phase);
                      setCurrentWordIndex(0);
                      setLives(3);
                      speak(p.title);
                    }}
                    className="bg-[#161b22] border border-[#30363d] hover:border-teal-500/50 p-5 rounded-2xl cursor-pointer transition-all flex justify-between items-center group shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-950/40 border border-teal-800/40 rounded-xl flex items-center justify-center text-teal-400 font-black text-lg">
                        {p.phase}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#f0f6fc] group-hover:text-teal-400 transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-xs text-[#8b949e] mt-1">
                          মোট শব্দ: {p.words.length} টি
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-xs text-[#8b949e]">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>সেরা স্কোর:</span>
                        <span className="font-bold text-white">{p.highScore}/১০</span>
                      </div>
                      <div className="text-xs bg-teal-950/20 text-teal-400 border border-teal-800/20 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        খেলুন ➔
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            /* ACTIVE GAME BOARD SCREEN */
            <div className="relative py-4 flex flex-col items-center">
              
              {/* Confetti celebration container */}
              <SparkleBurst active={showCelebration} />

              {currentWord && (
                <div className="w-full max-w-2xl flex flex-col items-center">
                  
                  {/* IMAGE WINDOW */}
                  <div className="relative mb-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-tr from-teal-900/30 to-sky-900/30 border-4 border-teal-500/40 rounded-full flex items-center justify-center p-6 shadow-xl relative group animate-bounce-slow"
                    >
                      <img
                        src={getEmojiImage(currentWord.emoji)}
                        alt={currentWord.word}
                        className="w-full h-full object-contain pointer-events-none drop-shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Pronounce Button Overlay */}
                      <button
                        onClick={() => speak(currentWord.word)}
                        className="absolute -bottom-2 -right-2 p-3 bg-teal-600 hover:bg-teal-500 border border-teal-400/40 rounded-full text-white shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  </div>

                  {/* TRANSLATION & INSTRUCTION HINT */}
                  <div className="text-center mb-6">
                    <h4 className="text-[#8b949e] uppercase tracking-widest text-xs font-mono font-bold">
                      ইংরেজি অর্থ (English Hint)
                    </h4>
                    <p className="text-xl sm:text-2xl font-extrabold text-teal-300 mt-1">
                      {currentWord.english}
                    </p>
                  </div>

                  {/* GAME OVER CARD OVERLAY */}
                  {isGameOver && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full bg-[#1c1c1e] border-2 border-red-500/30 p-6 rounded-2xl text-center mb-6 shadow-xl"
                    >
                      <div className="flex items-center justify-center gap-2 text-red-400 font-black text-xl mb-2">
                        <AlertCircle className="w-6 h-6" />
                        <span>খেলা শেষ (Game Over)</span>
                      </div>
                      <p className="text-[#8b949e] text-sm mb-4">
                        সোনা পাখি, তোমার ৩টি লাইফ শেষ হয়ে গিয়েছে। আবার চেষ্টা করে দেখো!
                      </p>
                      <button
                        onClick={handleResetWord}
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-500 font-bold rounded-xl flex items-center gap-2 mx-auto transition-all transform active:scale-95"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>পুনরায় চেষ্টা করুন</span>
                      </button>
                    </motion.div>
                  )}

                  {/* SUCCESS / COMPLETED CARD OVERLAY */}
                  {isCorrect && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full bg-teal-950/30 border border-teal-500/30 p-6 rounded-2xl text-center mb-6 shadow-xl"
                    >
                      <div className="flex items-center justify-center gap-2 text-emerald-400 font-black text-2xl mb-2">
                        <CheckCircle2 className="w-6 h-6" />
                        <span>চমৎকার হয়েছে! ({currentWord.word})</span>
                      </div>
                      <p className="text-[#8b949e] text-sm mb-4">
                        তুমি শব্দটির বানান একদম সঠিক তৈরি করেছো। এটি তোমার শব্দভাণ্ডারে যুক্ত হয়েছে!
                      </p>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => speak(currentWord.word)}
                          className="px-4 py-2 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer text-sm"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>উচ্চারণ শুনুন</span>
                        </button>
                        <button
                          onClick={handleNextWord}
                          className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer text-sm"
                        >
                          <span>পরবর্তী শব্দ</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* TARGET SPELLING PLACEMENT SLOTS */}
                  {!isGameOver && (
                    <div className="w-full flex justify-center items-center gap-3 mb-8">
                      {currentWord.parts.map((part, index) => {
                        const placed = placedLetters[index];
                        return (
                          <div
                            key={index}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(index)}
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${
                              placed
                                ? 'bg-teal-900/40 border-teal-500 text-white shadow-md'
                                : 'border-dashed border-[#30363d] bg-[#161b22]/30 text-transparent'
                            }`}
                          >
                            <AnimatePresence mode="popLayout">
                              {placed ? (
                                <motion.span
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.5, opacity: 0 }}
                                  className="text-xl sm:text-2xl font-black font-sans"
                                >
                                  {placed}
                                </motion.span>
                              ) : (
                                <span className="text-gray-600 text-sm font-mono">?</span>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* DRIFTING LETTER POOL TILES */}
                  {!isGameOver && !isCorrect && (
                    <div className="w-full">
                      <div className="text-center mb-3">
                        <p className="text-[#8b949e] text-xs font-semibold flex items-center justify-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
                          वर्णগুলো ড্র্যাগ করে বক্সে বসাও অথবা সরাসরি ট্যাপ করো:
                        </p>
                      </div>

                      <div className="flex flex-wrap justify-center gap-3 py-3">
                        <AnimatePresence>
                          {letterPool.map((tile) => (
                            <motion.div
                              key={tile.id}
                              layout
                              drag
                              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                              dragElastic={0.6}
                              onDragStart={(e) => handleDragStart(e as any, tile)}
                              draggable
                              onClick={() => handleTileTap(tile)}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileDrag={{ scale: 1.15, zIndex: 50, cursor: 'grabbing' }}
                              whileTap={{ scale: 0.95 }}
                              className="w-12 h-12 sm:w-14 sm:h-14 bg-[#21262d] border border-teal-500/30 hover:border-teal-400 rounded-xl flex items-center justify-center text-lg sm:text-xl font-bold font-sans shadow-md cursor-grab active:cursor-grabbing text-[#f0f6fc] hover:bg-teal-950/20 transition-all select-none"
                            >
                              {tile.letter}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* SUB TAB 2: UNLOCKED WORD BANK GALLERY */}
      {activeSubTab === 'wordbank' && (
        <div className="py-2">
          
          {/* Quick stats panel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-950/40 border border-teal-800/40 flex items-center justify-center text-teal-400">
                <Star className="w-6 h-6 fill-teal-400" />
              </div>
              <div>
                <h4 className="text-xs text-[#8b949e] font-semibold">আনলক করা শব্দ</h4>
                <p className="text-xl font-black text-white">{learnedWordIds.length} টি</p>
              </div>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-950/40 border border-sky-800/40 flex items-center justify-center text-sky-400">
                <Trophy className="w-6 h-6 fill-sky-400" />
              </div>
              <div>
                <h4 className="text-xs text-[#8b949e] font-semibold">মোট শব্দভাণ্ডার অগ্রগতি</h4>
                <p className="text-xl font-black text-white">
                  {Math.round((learnedWordIds.length / BENGALI_REARRANGE_WORDS_DATA.length) * 100)}%
                </p>
              </div>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-2xl flex items-center justify-center">
              {learnedWordIds.length > 0 ? (
                <button
                  onClick={handleResetWordBank}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-950/20 py-2.5 px-4 rounded-xl border border-red-900/30 hover:border-red-500/50 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>শব্দভাণ্ডার খালি করুন</span>
                </button>
              ) : (
                <p className="text-xs text-[#8b949e] text-center">
                  শব্দ শিখে ট্রফি অর্জন করো! 🏆
                </p>
              )}
            </div>
          </div>

          {/* Search and Filters bar */}
          <div className="flex flex-col md:flex-row gap-3 mb-6 bg-[#161b22] border border-[#30363d] p-4 rounded-2xl">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="শব্দ খুঁজুন (যেমন: আপেল, কলম, ইত্যাদি বা English text)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-sky-400" />
              <select
                value={filterPhase}
                onChange={(e) => setFilterPhase(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                <option value="all">সবগুলো ধাপের শব্দ</option>
                {phases.map((p) => (
                  <option key={p.phase} value={p.phase}>
                    ধাপ {p.phase}: {p.title.split(':')[1] || p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* GALLERY GRID */}
          {filteredLearnedWords.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredLearnedWords.map((item) => {
                  const isDancing = animatingCardId === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ 
                        scale: isDancing ? [1, 1.1, 0.95, 1.05, 1] : 1, 
                        opacity: 1,
                        y: isDancing ? -8 : 0
                      }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      onClick={() => playWordPronunciation(item)}
                      className={`bg-[#161b22] border-2 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer relative overflow-hidden group shadow-md select-none transition-colors ${
                        isDancing 
                          ? 'border-sky-400 bg-sky-950/20' 
                          : 'border-[#30363d] hover:border-sky-500/50 hover:bg-[#1a212c]'
                      }`}
                    >
                      {/* Phase Indicator on top-right */}
                      <span className="absolute top-1.5 right-2 bg-sky-950/60 text-sky-300 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                        ধাপ {item.phase}
                      </span>

                      {/* Emoji Icon Container */}
                      <div className="w-16 h-16 bg-[#0d1117] border border-[#30363d] rounded-full flex items-center justify-center p-3 mb-3 relative overflow-hidden group-hover:scale-110 transition-transform">
                        <img
                          src={getEmojiImage(item.emoji)}
                          alt={item.word}
                          className="w-full h-full object-contain pointer-events-none drop-shadow"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Bengali Word */}
                      <h3 className="font-sans font-black text-base sm:text-lg text-white mb-0.5 group-hover:text-sky-400 transition-colors">
                        {item.word}
                      </h3>

                      {/* English Meaning */}
                      <p className="text-[#8b949e] text-xs font-medium">
                        {item.english}
                      </p>

                      {/* Speaker Badge */}
                      <div className="mt-3 text-sky-400 bg-sky-950/30 p-1.5 rounded-full border border-sky-900/30 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            /* EMPTY GALLERY STATE */
            <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-[#161b22]/40 rounded-3xl border border-[#30363d]">
              <div className="w-20 h-20 bg-sky-950/40 border-2 border-dashed border-sky-800/40 rounded-full flex items-center justify-center text-sky-400 mb-4 animate-pulse">
                <BookOpen className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-[#f0f6fc] mb-1">
                {learnedWordIds.length === 0 ? "কোনো শব্দ শেখা হয়নি" : "কোনো মিল খুঁজে পাওয়া যায়নি"}
              </h3>
              <p className="text-[#8b949e] text-xs sm:text-sm max-w-md mb-6">
                {learnedWordIds.length === 0 
                  ? "সোনা পাখি, তুমি ছবি দেখে শব্দ মেলানোর খেলা খেলে একটি শব্দ মেলালে তা সাথে সাথে এই গ্যালারিতে জমা হবে!" 
                  : "আপনার খোঁজা শব্দের বানানের সাথে শব্দভাণ্ডারের কোনো মিল পাওয়া যায়নি। অন্য বানান দিয়ে খুঁজুন।"}
              </p>

              {learnedWordIds.length === 0 && (
                <button
                  onClick={() => {
                    setActiveSubTab('game');
                    setSelectedPhase(null);
                    speak("খেলা শুরু করুন");
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-sky-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer text-sm shadow-lg shadow-teal-950/30"
                >
                  <Trophy className="w-4 h-4" />
                  <span>খেলা শুরু করুন</span>
                </button>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
