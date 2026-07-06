import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ONE_WORD_PHASE_1, 
  ONE_WORD_PHASE_2, 
  ONE_WORD_PHASE_3, 
  ALL_ONE_WORD_DATA,
  OneWordItem 
} from '../data/oneWordData';
import { Icon } from './Icon';

interface OneWordContractionProps {
  speak: (text: string) => void;
}

// Helper to convert numbers to Bengali numerals
const toBengaliNumber = (num: number): string => {
  const digits: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return num.toString().split('').map(d => digits[d] || d).join('');
};

// Custom synthesized audio feedback for young learners
const playSynthSound = (type: 'correct' | 'wrong' | 'celebrate') => {
  try {
    const isMuted = localStorage.getItem('isAudioMuted') === 'true' || localStorage.getItem('isQuizMuted') === 'true';
    if (isMuted) return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
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
      // Grand celebratory arpeggio fanfare
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
      });
    }
  } catch (err) {
    console.warn('Audio Context sound failed:', err);
  }
};

export function OneWordContraction({ speak }: OneWordContractionProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>('learn');
  const [selectedPhase, setSelectedPhase] = useState<1 | 2 | 3>(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Learning states
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState<Record<number, boolean>>({});

  // Quiz states
  const [quizPhase, setQuizPhase] = useState<1 | 2 | 3 | 'all'>('all');
  const [quizScore, setQuizScore] = useState(0);
  const [quizHistory, setQuizHistory] = useState<number[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [streak, setStreak] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('oneword_quiz_highscore') || 0);
  });

  // Load highscore
  useEffect(() => {
    localStorage.setItem('oneword_quiz_highscore', highScore.toString());
  }, [highScore]);

  // Handle phase items
  const phaseItems = useMemo(() => {
    if (selectedPhase === 1) return ONE_WORD_PHASE_1;
    if (selectedPhase === 2) return ONE_WORD_PHASE_2;
    return ONE_WORD_PHASE_3;
  }, [selectedPhase]);

  // Filter items for learning tab
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return phaseItems;
    return phaseItems.filter(
      item => 
        item.phrase.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.contraction.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [phaseItems, searchQuery]);

  // Get active items pool for the quiz based on quizPhase selection
  const quizPool = useMemo(() => {
    if (quizPhase === 1) return ONE_WORD_PHASE_1;
    if (quizPhase === 2) return ONE_WORD_PHASE_2;
    if (quizPhase === 3) return ONE_WORD_PHASE_3;
    return ALL_ONE_WORD_DATA;
  }, [quizPhase]);

  // Generate a random quiz question
  const currentQuestionItem = useMemo(() => {
    if (quizPool.length === 0) return null;
    // Use an index cycle or random based on history to avoid immediate repetition
    const index = currentQuizIndex % quizPool.length;
    return quizPool[index];
  }, [quizPool, currentQuizIndex]);

  // Generate 4 options (1 correct + 3 random distractors)
  const quizOptions = useMemo(() => {
    if (!currentQuestionItem) return [];
    const correct = currentQuestionItem.contraction;
    
    // Get all possible contractions from the pool except correct one
    const otherContractions = quizPool
      .map(item => item.contraction)
      .filter(c => c !== correct);
    
    // Shuffle other contractions and pick 3 using an unbiased Schwartzian transform
    const uniqueOthers = [...new Set(otherContractions)];
    const shuffledOthers = uniqueOthers
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    const distractors = shuffledOthers.slice(0, 3);
    
    // Combine correct and distractors, then shuffle properly
    return [correct, ...distractors]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }, [currentQuestionItem, quizPool]);

  // Generate confetti/particles for correct answer
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; scale: number }[]>([]);

  const spawnParticles = () => {
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#eab308', '#a855f7', '#ff7849'];
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50, // relative offsets
      y: Math.random() * -120 - 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: Math.random() * 0.8 + 0.5
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2500);
  };

  const spawnCelebrationParticles = () => {
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#eab308', '#a855f7', '#ff7849', '#ec4899', '#06b6d4'];
    let count = 0;
    
    // Create multiple bursts of beautiful celebratory confetti
    const interval = setInterval(() => {
      const burstIndex = count;
      const newParticles = Array.from({ length: 30 }).map((_, i) => ({
        id: Date.now() + burstIndex * 100 + i,
        x: Math.random() * 160 - 80, // wider screen coverage
        y: Math.random() * -180 - 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: Math.random() * 1.3 + 0.6
      }));
      setParticles(prev => [...prev, ...newParticles]);
      count++;
      if (count >= 5) {
        clearInterval(interval);
      }
    }, 400);

    // Fade and clear particles eventually
    setTimeout(() => {
      setParticles([]);
    }, 4500);
  };

  const speakPhrase = (item: OneWordItem) => {
    speak(`${item.phrase}, এক কথায় প্রকাশ হলো, ${item.contraction}`);
  };

  const handleRevealAll = () => {
    const nextRevealed: Record<number, boolean> = {};
    phaseItems.forEach(item => {
      nextRevealed[item.id] = true;
    });
    setIsRevealed(nextRevealed);
    speak("সবগুলো এক কথায় প্রকাশ উন্মোচন করা হলো!");
  };

  const handleHideAll = () => {
    setIsRevealed({});
    speak("সবগুলো এক কথায় প্রকাশ ঢেকে দেয়া হলো!");
  };

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer !== null) return; // Answered already
    
    setSelectedAnswer(option);
    const isCorrect = option === currentQuestionItem?.contraction;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
      const newScore = quizScore + 10;
      setQuizScore(newScore);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      setShowCelebration(true);
      spawnParticles();
      playSynthSound('correct');
      
      // Fun encouraging sounds/speech
      const sweetBengaliPraises = [
        "দারুণ হয়েছে! তোমার উত্তর সঠিক হয়েছে!",
        "বাহ! খুব চমৎকার হয়েছে!",
        "তুমি তো সুপারস্টার! দারুণ পারো!",
        "ওয়াও! একদম সঠিক উত্তর সোনামণি!",
        "চমৎকার! তুমি অনেক বুদ্ধিমান!"
      ];
      speak(sweetBengaliPraises[Math.floor(Math.random() * sweetBengaliPraises.length)]);
    } else {
      setStreak(0);
      playSynthSound('wrong');
      speak(`উফ! ভুল হয়েছে। সঠিক উত্তর হলো ${currentQuestionItem?.contraction}। কোনো ব্যাপার না, আবার চেষ্টা করো!`);
    }
  };

  const handleNextQuestion = () => {
    if (answeredCount >= 9) {
      setQuizCompleted(true);
      spawnCelebrationParticles();
      playSynthSound('celebrate');
      speak(`অভিনন্দন সোনামণি! কুইজ শেষ হয়েছে। তুমি ১০টির মধ্যে ${correctAnswersCount + (isAnswerCorrect ? 1 : 0)}টি সঠিক উত্তর দিয়েছ!`);
      return;
    }
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setShowCelebration(false);
    // Move to next index randomly
    setCurrentQuizIndex(prev => prev + 1);
    setAnsweredCount(prev => prev + 1);
  };

  const handleResetQuiz = () => {
    setQuizScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setShowCelebration(false);
    setAnsweredCount(0);
    setCorrectAnswersCount(0);
    setQuizCompleted(false);
    setCurrentQuizIndex(Math.floor(Math.random() * quizPool.length));
    speak("নতুন কুইজ শুরু করা হলো!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-slate-100" id="one-word-contraction-container">
      {/* Dynamic Confetti Particle Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, x: '50vw', y: '50vh', scale: 0.2 }}
              animate={{ 
                opacity: [1, 1, 0], 
                x: `calc(50vw + ${p.x}vw)`, 
                y: `calc(40vh + ${p.y}vh)`,
                scale: p.scale,
                rotate: 360 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              style={{
                position: 'absolute',
                width: '18px',
                height: '18px',
                borderRadius: Math.random() > 0.5 ? '50%' : '10%',
                backgroundColor: p.color,
                boxShadow: `0 0 12px ${p.color}`
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Header section */}
      <div className="text-center mb-8 space-y-3">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-amber-900/20 border border-purple-500/20 shadow-md mb-2"
        >
          <span className="text-xl">🌟</span>
          <span className="text-xs sm:text-sm font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-200">
            প্রাথমিক বাংলা ব্যাকরণ • আনন্দদায়ক পাঠ
          </span>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          এক কথায় প্রকাশ <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-rose-400 font-black">৩০০টি</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-medium">
          ছবির মতো সহজ ও আনন্দের সাথে ৩০০টি এক কথায় প্রকাশ পড়ো, শোনো এবং মজাদার কুইজ খেলে মেডেল সংগ্রহ করো!
        </p>

        {/* Tab selector */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => {
              setActiveTab('learn');
              speak("এসো পড়ি ও শিখি ট্যাব চালু করা হলো");
            }}
            className={`flex items-center gap-2 px-5 sm:px-8 py-3 rounded-2xl font-black text-sm sm:text-base transition-all border-2 ${
              activeTab === 'learn'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400 shadow-xl shadow-purple-950/40 scale-105'
                : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
            }`}
          >
            <Icon name="BookOpen" className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span>📖 পড়ি ও শিখি</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('quiz');
              speak("কুইজ খেলি ট্যাব চালু করা হলো");
            }}
            className={`flex items-center gap-2 px-5 sm:px-8 py-3 rounded-2xl font-black text-sm sm:text-base transition-all border-2 ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-amber-400 shadow-xl shadow-amber-950/40 scale-105'
                : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
            }`}
          >
            <Icon name="Trophy" className="w-5 h-5 text-yellow-300 animate-bounce" />
            <span>🎮 কুইজ খেলি</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* =================================== LEARN TAB =================================== */}
        {activeTab === 'learn' && (
          <motion.div
            key="learn-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Phase Selector & Controls */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Phases */}
                <div className="flex flex-wrap gap-2 sm:gap-3 w-full md:w-auto">
                  <button
                    onClick={() => {
                      setSelectedPhase(1);
                      setSearchQuery('');
                      speak("প্রথম পর্ব: ১ থেকে ১০০টি এক কথায় প্রকাশ সিলেক্ট করা হলো।");
                    }}
                    className={`flex-1 sm:flex-initial px-4 py-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                      selectedPhase === 1
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                        : 'bg-[#0d1117] text-[#8b949e] border-[#30363d] hover:bg-[#21262d]'
                    }`}
                  >
                    🌱 প্রথম পর্ব (১ - ১০০)
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPhase(2);
                      setSearchQuery('');
                      speak("দ্বিতীয় পর্ব: ১০১ থেকে ২০০টি এক কথায় প্রকাশ সিলেক্ট করা হলো।");
                    }}
                    className={`flex-1 sm:flex-initial px-4 py-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                      selectedPhase === 2
                        ? 'bg-pink-600 text-white border-pink-400 shadow-md'
                        : 'bg-[#0d1117] text-[#8b949e] border-[#30363d] hover:bg-[#21262d]'
                    }`}
                  >
                    🔥 দ্বিতীয় পর্ব (১০১ - ২০০)
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPhase(3);
                      setSearchQuery('');
                      speak("তৃতীয় পর্ব: ২০১ থেকে ৩০০টি এক কথায় প্রকাশ সিলেক্ট করা হলো।");
                    }}
                    className={`flex-1 sm:flex-initial px-4 py-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                      selectedPhase === 3
                        ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                        : 'bg-[#0d1117] text-[#8b949e] border-[#30363d] hover:bg-[#21262d]'
                    }`}
                  >
                    👑 তৃতীয় পর্ব (২০১ - ৩০০)
                  </button>
                </div>

                {/* Show/Hide Actions */}
                <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
                  <button
                    onClick={handleRevealAll}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs sm:text-sm font-bold hover:scale-105 transition-all shadow-md shadow-emerald-950/20"
                  >
                    🔓 সব দেখুন
                  </button>
                  <button
                    onClick={handleHideAll}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-gradient-to-r from-rose-600 to-red-700 text-white rounded-xl text-xs sm:text-sm font-bold hover:scale-105 transition-all shadow-md shadow-rose-950/20"
                  >
                    🔒 সব ঢাকুন
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="যেকোনো শব্দ বা বাক্য দিয়ে খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#0d1117] border-2 border-purple-500/20 focus:border-purple-500/80 rounded-2xl text-slate-100 placeholder-slate-500 outline-none transition-all text-sm sm:text-base shadow-inner"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <Icon name="XCircle" className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Total count badge */}
            <div className="flex justify-between items-center px-2">
              <span className="text-xs sm:text-sm text-slate-400 font-bold">
                মোট শব্দ সংখ্যা: <span className="text-purple-400">{toBengaliNumber(filteredItems.length)}</span> টি
              </span>
              <span className="text-xs sm:text-sm text-purple-300 font-extrabold animate-pulse">
                💡 কার্ডের ওপর ট্যাপ বা ক্লিক করে উত্তর দেখতে পাবে!
              </span>
            </div>

            {/* List / Grid of Cards */}
            {filteredItems.length === 0 ? (
              <motion.div 
                initial={{ scale: 0.95 }}
                className="p-12 text-center bg-[#161b22] border border-[#30363d] rounded-3xl"
              >
                <div className="text-5xl mb-3">🔍</div>
                <h3 className="text-xl font-bold text-white mb-1">কোনো মিল খুঁজে পাওয়া যায়নি!</h3>
                <p className="text-slate-400 text-sm">দয়া করে অন্য কোনো বাংলা শব্দ লিখে চেষ্টা করুন।</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((item, idx) => {
                  const revealed = isRevealed[item.id] || false;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(idx * 0.015, 0.3) }}
                      className="group relative flex flex-col sm:flex-row items-stretch bg-[#161b22] hover:bg-[#1c222b] border border-[#30363d] hover:border-purple-500/40 rounded-3xl overflow-hidden transition-all shadow-md hover:shadow-purple-950/20"
                    >
                      {/* Left Number Badge */}
                      <div className="flex items-center justify-between sm:justify-center px-4 py-3 sm:py-0 sm:w-16 bg-[#0d1117] border-b sm:border-b-0 sm:border-r border-[#30363d] font-mono text-sm font-black text-slate-400 group-hover:text-purple-400 group-hover:bg-purple-950/25 transition-all">
                        <span>{toBengaliNumber(item.id)}</span>
                        {/* Audio Speaker on Phone */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakPhrase(item);
                          }}
                          className="sm:hidden p-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
                        >
                          <Icon name="Volume2" className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Middle text area */}
                      <div 
                        onClick={() => {
                          setIsRevealed(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                          if (!revealed) {
                            speak(item.contraction);
                          }
                        }}
                        className="flex-1 p-5 space-y-3 cursor-pointer select-none"
                      >
                        <div className="text-slate-400 text-xs font-extrabold uppercase tracking-wide flex items-center gap-1.5">
                          <span>বাক্যাংশ বা বিবরণ:</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        </div>
                        <p className="text-lg sm:text-xl font-bold text-white leading-relaxed pr-8">
                          {item.phrase}
                        </p>

                        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between min-h-[4rem]">
                          <div>
                            <span className="text-[10px] text-slate-500 font-extrabold block uppercase tracking-wider mb-1">এক কথায় প্রকাশ:</span>
                            <AnimatePresence mode="wait">
                              {revealed ? (
                                <motion.span
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  className="inline-block px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-black text-xl sm:text-2xl shadow-md border border-white/10"
                                >
                                  {item.contraction}
                                </motion.span>
                              ) : (
                                <motion.span
                                  initial={{ opacity: 0.6 }}
                                  className="inline-flex items-center gap-1 text-sm font-black text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-xl group-hover:scale-105 transition-transform"
                                >
                                  <Icon name="Eye" className="w-3.5 h-3.5" />
                                  <span>উত্তর দেখুন</span>
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Sound button (Desktop/Tablet) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakPhrase(item);
                            }}
                            className="hidden sm:flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-purple-600 rounded-xl text-xs font-bold text-slate-300 hover:text-white border border-[#30363d] hover:border-transparent transition-all shadow-sm"
                          >
                            <Icon name="Volume2" className="w-3.5 h-3.5" />
                            <span>শুনুন</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* =================================== QUIZ TAB =================================== */}
        {activeTab === 'quiz' && (
          <motion.div
            key="quiz-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            {/* Highscore & Streak Dashboard */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-[#161b22] to-purple-950/20 border border-[#30363d] rounded-2xl p-4 text-center space-y-1">
                <span className="text-[10px] text-purple-400 font-extrabold uppercase">স্কোর (Score)</span>
                <p className="text-2xl sm:text-3xl font-black text-white">{toBengaliNumber(quizScore)}</p>
              </div>

              <div className="bg-gradient-to-br from-[#161b22] to-amber-950/20 border border-[#30363d] rounded-2xl p-4 text-center space-y-1 relative overflow-hidden">
                <div className="absolute top-1 right-1 animate-pulse">🔥</div>
                <span className="text-[10px] text-amber-400 font-extrabold uppercase">টানা সঠিক (Streak)</span>
                <p className="text-2xl sm:text-3xl font-black text-amber-400">{toBengaliNumber(streak)}</p>
              </div>

              <div className="bg-gradient-to-br from-[#161b22] to-pink-950/20 border border-[#30363d] rounded-2xl p-4 text-center space-y-1">
                <span className="text-[10px] text-pink-400 font-extrabold uppercase">সর্বোচ্চ স্কোর</span>
                <p className="text-2xl sm:text-3xl font-black text-pink-300">{toBengaliNumber(highScore)}</p>
              </div>
            </div>

            {/* Quiz Pool Range Selector */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs sm:text-sm font-bold text-slate-300">কুইজের পর্ব নির্বাচন করো:</span>
              <div className="flex gap-1.5 w-full sm:w-auto">
                {([1, 2, 3, 'all'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => {
                      setQuizPhase(p);
                      handleResetQuiz();
                      const phrases = {
                        1: "১ম পর্ব (১-১০০)",
                        2: "২য় পর্ব (১০১-২০০)",
                        3: "৩য় পর্ব (২০১-৩০০)",
                        all: "সবগুলো (৩০০টি)"
                      };
                      speak(`${phrases[p]} কুইজ শুরু করা হলো`);
                    }}
                    className={`flex-1 sm:flex-initial px-3 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                      quizPhase === p
                        ? 'bg-amber-500 text-white border-amber-400 shadow-md'
                        : 'bg-[#0d1117] text-slate-400 border-slate-800 hover:bg-[#21262d]'
                    }`}
                  >
                    {p === 'all' ? 'সব (১-৩০০)' : `পর্ব ${toBengaliNumber(p)}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz Box or Completion Screen */}
            {quizCompleted ? (
              <motion.div
                key="quiz-completed"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-[#161b22] border-2 border-amber-500/30 rounded-3xl p-8 text-center space-y-6 shadow-xl relative overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 blur-[80px] pointer-events-none animate-pulse" />
                
                {/* Animated Badge Header */}
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: [1.3, 0.9, 1.1, 1], rotate: 0 }}
                  transition={{ duration: 0.8, ease: "backOut" }}
                  className="text-6xl sm:text-7xl select-none"
                >
                  🏆🎉🎖️
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-rose-400"
                >
                  কুইজ সম্পন্ন হয়েছে!
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-slate-300 text-base max-w-md mx-auto"
                >
                  দারুণ খেলেছ সোনামণি! তোমার আজকের খেলার অর্জিত ফলাফল নিচে দেওয়া হলো:
                </motion.p>

                {/* Score Grid with staggered pop animation */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
                    className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-4 text-center hover:border-amber-500/35 transition-colors"
                  >
                    <span className="text-xs text-slate-400 block mb-1">মোট স্কোর (Score)</span>
                    <span className="text-3xl font-black text-amber-400 block">{toBengaliNumber(quizScore)}</span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                    className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-4 text-center hover:border-emerald-500/35 transition-colors"
                  >
                    <span className="text-xs text-slate-400 block mb-1">সঠিক উত্তর (Accuracy)</span>
                    <span className="text-3xl font-black text-emerald-400 block">{toBengaliNumber(correctAnswersCount)} / ১০</span>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="pt-6"
                >
                  <button
                    onClick={handleResetQuiz}
                    className="px-10 py-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-lg font-black rounded-2xl transition-all shadow-lg shadow-amber-950/40 hover:scale-105 inline-flex items-center gap-2"
                  >
                    <Icon name="RefreshCw" className="w-5 h-5 animate-spin" />
                    <span>আবার খেলি</span>
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              currentQuestionItem && (
                <div className="bg-[#161b22] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
                  
                  {/* Back Light Effect */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/5 blur-[80px] pointer-events-none" />

                  {/* VISUAL PROGRESS BAR */}
                  <div className="space-y-3 border-b border-[#30363d]/50 pb-5">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-slate-300">
                      <span className="flex items-center gap-1.5 bg-purple-950/40 text-purple-300 border border-purple-900/30 px-3 py-1.5 rounded-full text-[11px] sm:text-xs">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        কুইজ অগ্রগতি (১০টি প্রশ্ন)
                      </span>
                      <span className="text-amber-400 bg-amber-950/40 border border-amber-900/30 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-black">
                        {toBengaliNumber(answeredCount)} / ১০টি সম্পন্ন
                      </span>
                    </div>
                    
                    {/* Progress Bar Track */}
                    <div className="w-full bg-[#0d1117] h-3.5 rounded-full overflow-hidden border border-[#30363d] p-[2px]">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(answeredCount / 10) * 100}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-[#30363d] pb-4">
                    <span className="bg-amber-950/50 text-amber-400 border border-amber-900/45 px-3 py-1 rounded-full">
                      প্রশ্ন নম্বর: #{toBengaliNumber(currentQuestionItem.id)}
                    </span>
                    <div className="flex items-center gap-1 text-slate-400">
                      <span>ম্যাচিং গেম</span>
                      <Icon name="Target" className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                    </div>
                  </div>

                  {/* Question phrase */}
                  <div className="text-center space-y-3 py-4 flex flex-col items-center">
                    <span className="text-[11px] text-amber-400 font-extrabold uppercase tracking-widest bg-[#161b22] border border-amber-900/30 px-3.5 py-1 rounded-full">
                      এক কথায় প্রকাশ করো
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-relaxed max-w-xl text-center">
                      "{currentQuestionItem.phrase}"
                    </h2>
                    <p className="text-xs text-slate-400 font-medium">
                      উপরের বিবরণের জন্য সঠিক এক কথায় প্রকাশ শব্দটি নির্বাচন করো।
                    </p>
                  </div>

                  {/* Options Bento Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {quizOptions.map((option, idx) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrectKey = option === currentQuestionItem.contraction;
                      
                      let buttonStyle = "bg-[#0d1117] border-[#30363d] hover:border-amber-500/40 text-slate-100 hover:bg-[#1f2631]";
                      if (selectedAnswer !== null) {
                        if (isCorrectKey) {
                          buttonStyle = "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/30";
                        } else if (isSelected) {
                          buttonStyle = "bg-gradient-to-r from-rose-600 to-red-700 text-white border-rose-400 shadow-lg shadow-rose-950/30";
                        } else {
                          buttonStyle = "bg-slate-900/40 border-[#21262d] text-slate-500 scale-95 opacity-50";
                        }
                      }

                      return (
                        <motion.button
                          key={idx}
                          onClick={() => handleAnswerClick(option)}
                          disabled={selectedAnswer !== null}
                          whileHover={selectedAnswer === null ? { scale: 1.025, y: -2 } : {}}
                          whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                          className={`p-5 rounded-2xl border-2 text-xl sm:text-2xl font-black transition-all flex items-center justify-between group ${buttonStyle}`}
                        >
                          <span className="flex-1 text-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            {option}
                          </span>
                          
                          {/* Status Icon Indicator */}
                          <div className="flex-shrink-0 ml-2">
                            {selectedAnswer !== null && isCorrectKey && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-md">
                                <Icon name="Check" className="w-5 h-5 stroke-[4]" />
                              </motion.div>
                            )}
                            {selectedAnswer !== null && isSelected && !isCorrectKey && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-rose-600 shadow-md">
                                <Icon name="X" className="w-5 h-5 stroke-[4]" />
                              </motion.div>
                            )}
                            {selectedAnswer === null && (
                              <div className="w-6 h-6 rounded-full bg-[#1c222b] border border-slate-700 flex items-center justify-center text-xs text-slate-500 font-bold group-hover:bg-amber-500/20 group-hover:text-amber-400 group-hover:border-amber-500/45 transition-colors">
                                {toBengaliNumber(idx + 1)}
                              </div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Interactive Congratulations or Fail overlay message */}
                  <AnimatePresence>
                    {selectedAnswer !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center text-center p-5 rounded-2xl border bg-[#0d1117]/80 backdrop-blur-md space-y-3 mt-4"
                      >
                        {isAnswerCorrect ? (
                          <>
                            <div className="text-4xl sm:text-5xl animate-bounce">🏆🎉🎖️</div>
                            <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-emerald-400 to-teal-300 animate-pulse">
                              দারুণ সোনামণি! চমৎকার সঠিক উত্তর!
                            </h3>
                            <p className="text-slate-300 font-medium text-xs sm:text-sm">
                              তুমি অনেক বুদ্ধিমান। পরবর্তী প্রশ্নের জন্য প্রস্তুত হও!
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="text-4xl">💪❤️🌸</div>
                            <h3 className="text-2xl font-black text-amber-400">
                              কোনো ব্যাপার না সোনামণি!
                            </h3>
                            <p className="text-slate-300 font-medium text-xs sm:text-sm">
                              ভুল থেকেই আমরা শিখি। সঠিক উত্তরটি ছিল <span className="text-emerald-400 font-bold">"{currentQuestionItem.contraction}"</span>।
                            </p>
                          </>
                        )}

                        <div className="flex gap-3 w-full sm:w-auto pt-2">
                          <button
                            onClick={handleResetQuiz}
                            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all text-sm font-extrabold flex items-center justify-center gap-1.5"
                          >
                            <Icon name="RefreshCw" className="w-4 h-4" />
                            <span>পুনরায় শুরু</span>
                          </button>
                          
                          <button
                            onClick={handleNextQuestion}
                            className="flex-1 sm:flex-initial px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white transition-all text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 hover:scale-105"
                          >
                            <span>{answeredCount >= 9 ? 'ফলাফল দেখুন' : 'পরবর্তী প্রশ্ন'}</span>
                            <Icon name="ArrowRight" className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
