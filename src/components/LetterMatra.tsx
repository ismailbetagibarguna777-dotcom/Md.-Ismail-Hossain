import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './Icon';

interface MatraLetter {
  char: string;
  type: 'full' | 'half' | 'none';
  isVowel: boolean;
  pronunciation: string;
  exampleWord: string;
  exampleWordMeaning?: string;
}

const ALL_MATRA_LETTERS: MatraLetter[] = [
  // Vowels (১১টি)
  { char: 'অ', type: 'full', isVowel: true, pronunciation: 'অ', exampleWord: 'অজগর', exampleWordMeaning: 'Python' },
  { char: 'আ', type: 'full', isVowel: true, pronunciation: 'আ', exampleWord: 'আম', exampleWordMeaning: 'Mango' },
  { char: 'ই', type: 'full', isVowel: true, pronunciation: 'ই', exampleWord: 'ইলিশ', exampleWordMeaning: 'Hilsa' },
  { char: 'ঈ', type: 'full', isVowel: true, pronunciation: 'ঈ', exampleWord: 'ঈগল', exampleWordMeaning: 'Eagle' },
  { char: 'উ', type: 'full', isVowel: true, pronunciation: 'উ', exampleWord: 'উট', exampleWordMeaning: 'Camel' },
  { char: 'ঊ', type: 'full', isVowel: true, pronunciation: 'ঊ', exampleWord: 'ঊষা', exampleWordMeaning: 'Dawn' },
  { char: 'ঋ', type: 'half', isVowel: true, pronunciation: 'ঋ', exampleWord: 'ঋষি', exampleWordMeaning: 'Sage' },
  { char: 'এ', type: 'none', isVowel: true, pronunciation: 'এ', exampleWord: 'একরঙা', exampleWordMeaning: 'Monochrome' },
  { char: 'ঐ', type: 'none', isVowel: true, pronunciation: 'ঐ', exampleWord: 'ঐরাবত', exampleWordMeaning: 'Elephant' },
  { char: 'ও', type: 'none', isVowel: true, pronunciation: 'ও', exampleWord: 'ওজন', exampleWordMeaning: 'Weight' },
  { char: 'ঔ', type: 'none', isVowel: true, pronunciation: 'ঔ', exampleWord: 'ঔষধ', exampleWordMeaning: 'Medicine' },

  // Consonants (৩৯টি)
  { char: 'ক', type: 'full', isVowel: false, pronunciation: 'ক', exampleWord: 'কলম', exampleWordMeaning: 'Pen' },
  { char: 'খ', type: 'half', isVowel: false, pronunciation: 'খ', exampleWord: 'খেলনা', exampleWordMeaning: 'Toy' },
  { char: 'গ', type: 'half', isVowel: false, pronunciation: 'গ', exampleWord: 'গাড়ি', exampleWordMeaning: 'Car' },
  { char: 'ঘ', type: 'full', isVowel: false, pronunciation: 'ঘ', exampleWord: 'ঘর', exampleWordMeaning: 'House' },
  { char: 'ঙ', type: 'none', isVowel: false, pronunciation: 'ঙ', exampleWord: 'ব্যাঙ', exampleWordMeaning: 'Frog' },
  { char: 'চ', type: 'full', isVowel: false, pronunciation: 'চ', exampleWord: 'চশমা', exampleWordMeaning: 'Glasses' },
  { char: 'ছ', type: 'full', isVowel: false, pronunciation: 'ছ', exampleWord: 'ছাতা', exampleWordMeaning: 'Umbrella' },
  { char: 'জ', type: 'full', isVowel: false, pronunciation: 'জ', exampleWord: 'জাহাজ', exampleWordMeaning: 'Ship' },
  { char: 'ঝ', type: 'full', isVowel: false, pronunciation: 'ঝ', exampleWord: 'ঝুড়ি', exampleWordMeaning: 'Basket' },
  { char: 'ঞ', type: 'none', isVowel: false, pronunciation: 'ঞ', exampleWord: 'মিঞা', exampleWordMeaning: 'Mian' },
  { char: 'ট', type: 'full', isVowel: false, pronunciation: 'ট', exampleWord: 'টমেটো', exampleWordMeaning: 'Tomato' },
  { char: 'ঠ', type: 'full', isVowel: false, pronunciation: 'ঠ', exampleWord: 'ঠেলাগাড়ি', exampleWordMeaning: 'Pushcart' },
  { char: 'ড', type: 'full', isVowel: false, pronunciation: 'ড', exampleWord: 'ডাব', exampleWordMeaning: 'Green Coconut' },
  { char: 'ঢ', type: 'full', isVowel: false, pronunciation: 'ঢ', exampleWord: 'ঢোল', exampleWordMeaning: 'Drum' },
  { char: 'ণ', type: 'half', isVowel: false, pronunciation: 'ণ', exampleWord: 'বীণা', exampleWordMeaning: 'Veena' },
  { char: 'ত', type: 'full', isVowel: false, pronunciation: 'ত', exampleWord: 'তরমুজ', exampleWordMeaning: 'Watermelon' },
  { char: 'থ', type: 'half', isVowel: false, pronunciation: 'থ', exampleWord: 'থালা', exampleWordMeaning: 'Plate' },
  { char: 'দ', type: 'full', isVowel: false, pronunciation: 'দ', exampleWord: 'দই', exampleWordMeaning: 'Yogurt' },
  { char: 'ধ', type: 'half', isVowel: false, pronunciation: 'ধ', exampleWord: 'ধান', exampleWordMeaning: 'Paddy' },
  { char: 'ন', type: 'full', isVowel: false, pronunciation: 'ন', exampleWord: 'নদী', exampleWordMeaning: 'River' },
  { char: 'প', type: 'half', isVowel: false, pronunciation: 'প', exampleWord: 'পাখি', exampleWordMeaning: 'Bird' },
  { char: 'ফ', type: 'full', isVowel: false, pronunciation: 'ফ', exampleWord: 'ফুল', exampleWordMeaning: 'Flower' },
  { char: 'ব', type: 'full', isVowel: false, pronunciation: 'ব', exampleWord: 'বই', exampleWordMeaning: 'Book' },
  { char: 'ভ', type: 'full', isVowel: false, pronunciation: 'ভ', exampleWord: 'ভালুক', exampleWordMeaning: 'Bear' },
  { char: 'ম', type: 'full', isVowel: false, pronunciation: 'ম', exampleWord: 'মই', exampleWordMeaning: 'Ladder' },
  { char: 'য', type: 'full', isVowel: false, pronunciation: 'য', exampleWord: 'যাঁতা', exampleWordMeaning: 'Grinding Stone' },
  { char: 'র', type: 'full', isVowel: false, pronunciation: 'র', exampleWord: 'রংধনু', exampleWordMeaning: 'Rainbow' },
  { char: 'ল', type: 'full', isVowel: false, pronunciation: 'ল', exampleWord: 'লেবু', exampleWordMeaning: 'Lemon' },
  { char: 'শ', type: 'half', isVowel: false, pronunciation: 'শ', exampleWord: 'শাপলা', exampleWordMeaning: 'Water Lily' },
  { char: 'ষ', type: 'full', isVowel: false, pronunciation: 'ষ', exampleWord: 'ষাঁড়', exampleWordMeaning: 'Bull' },
  { char: 'স', type: 'full', isVowel: false, pronunciation: 'স', exampleWord: 'সিংহ', exampleWordMeaning: 'Lion' },
  { char: 'হ', type: 'full', isVowel: false, pronunciation: 'হ', exampleWord: 'হাতী', exampleWordMeaning: 'Elephant' },
  { char: 'ড়', type: 'full', isVowel: false, pronunciation: 'ড়', exampleWord: 'পাহাড়', exampleWordMeaning: 'Mountain' },
  { char: 'ঢ়', type: 'full', isVowel: false, pronunciation: 'ঢ়', exampleWord: 'আষাঢ়', exampleWordMeaning: 'Asharh' },
  { char: 'য়', type: 'full', isVowel: false, pronunciation: 'য়', exampleWord: 'ময়ূর', exampleWordMeaning: 'Peacock' },
  { char: 'ৎ', type: 'none', isVowel: false, pronunciation: 'খণ্ড ত', exampleWord: 'শরৎ', exampleWordMeaning: 'Autumn' },
  { char: 'ং', type: 'none', isVowel: false, pronunciation: 'অনুস্বার', exampleWord: 'সিংহ', exampleWordMeaning: 'Lion' },
  { char: 'ঃ', type: 'none', isVowel: false, pronunciation: 'বিসর্গ', exampleWord: 'দুঃখ', exampleWordMeaning: 'Sorrow' },
  { char: 'ঁ', type: 'none', isVowel: false, pronunciation: 'চন্দ্রবিন্দু', exampleWord: 'চাঁদ', exampleWordMeaning: 'Moon' }
];

interface LetterMatraProps {
  speak: (text: string) => void;
}

const toBengaliNumber = (num: number): string => {
  const digits: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return num.toString().split('').map(d => digits[d] || d).join('');
};

const playSynthSound = (type: 'correct' | 'wrong' | 'celebrate' | 'pop') => {
  try {
    const isMuted = localStorage.getItem('isAudioMuted') === 'true' || localStorage.getItem('isQuizMuted') === 'true';
    if (isMuted) return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'correct') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.3);
      osc2.stop(ctx.currentTime + 0.3);
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'celebrate') {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
      });
    } else if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch (err) {
    console.warn('Audio Context sound failed:', err);
  }
};

export function LetterMatra({ speak }: LetterMatraProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'game' | 'quiz'>('learn');
  const [filterType, setFilterType] = useState<'all' | 'full' | 'half' | 'none'>('all');
  const [filterClass, setFilterClass] = useState<'all' | 'vowel' | 'consonant'>('all');
  const [selectedLetter, setSelectedLetter] = useState<MatraLetter | null>(null);

  // Particles
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; scale: number }[]>([]);

  // Matching Game States
  const [gameLetter, setGameLetter] = useState<MatraLetter | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameHighScore, setGameHighScore] = useState(() => Number(localStorage.getItem('matra_game_highscore') || 0));
  const [gameStreak, setGameStreak] = useState(0);
  const [gameFeedback, setGameFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Quiz States
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<{ question: string; options: string[]; correct: string; letter: MatraLetter }[]>([]);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Load first letter details by default
  useEffect(() => {
    if (!selectedLetter) {
      setSelectedLetter(ALL_MATRA_LETTERS[0]);
    }
  }, [selectedLetter]);

  // Handle setting up a new letter for the Match Game
  const setupNextGameLetter = () => {
    const randomIdx = Math.floor(Math.random() * ALL_MATRA_LETTERS.length);
    setGameLetter(ALL_MATRA_LETTERS[randomIdx]);
    setGameFeedback(null);
  };

  useEffect(() => {
    if (activeTab === 'game' && !gameLetter) {
      setupNextGameLetter();
    }
  }, [activeTab, gameLetter]);

  // Particle Generation
  const triggerParticles = (xPos = 0, yPos = -50) => {
    const colors = ['#10b981', '#f43f5e', '#3b82f6', '#eab308', '#a855f7', '#ff7849'];
    const newParticles = Array.from({ length: 24 }).map((_, i) => ({
      id: Date.now() + i,
      x: xPos + (Math.random() * 120 - 60),
      y: yPos + (Math.random() * -120 - 10),
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: Math.random() * 0.9 + 0.4
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };

  // Generate Quiz Session
  const generateQuizQuestions = () => {
    const shuffledPool = [...ALL_MATRA_LETTERS].sort(() => Math.random() - 0.5).slice(0, 10);
    const generated = shuffledPool.map((letter) => {
      const qTypes = [1, 2]; // 1: What matra is this letter? 2: Which type describes this?
      const chosenQType = qTypes[Math.floor(Math.random() * qTypes.length)];
      
      let question = '';
      let options: string[] = [];
      let correct = '';

      const typeLabels: Record<string, string> = {
        'full': 'পূর্ণমাত্রা (Full Matra)',
        'half': 'অর্ধমাত্রা (Half Matra)',
        'none': 'মাত্রাহীন (Matra-less)'
      };

      if (chosenQType === 1) {
        question = `"${letter.char}" বর্ণটি কোন মাত্রার অন্তর্ভুক্ত?`;
        correct = typeLabels[letter.type];
        options = Object.values(typeLabels);
      } else {
        question = `নিচের কোনটি একটি ${typeLabels[letter.type]} বর্ণ?`;
        correct = letter.char;
        
        // Pick 3 distractors of other types
        const distractors = ALL_MATRA_LETTERS
          .filter(l => l.type !== letter.type)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(l => l.char);

        options = [letter.char, ...distractors].sort(() => Math.random() - 0.5);
      }

      return {
        question,
        options,
        correct,
        letter
      };
    });

    setQuizQuestions(generated);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizStreak(0);
    setQuizSelectedOption(null);
    setQuizAnswered(false);
    setQuizCompleted(false);
  };

  useEffect(() => {
    if (activeTab === 'quiz') {
      generateQuizQuestions();
    }
  }, [activeTab]);

  // Speak letter detail
  const speakLetterDetail = (letter: MatraLetter) => {
    const typeBengali = 
      letter.type === 'full' ? 'পূর্ণ মাত্রা বিশিষ্ট বর্ণ' :
      letter.type === 'half' ? 'অর্ধ মাত্রা বিশিষ্ট বর্ণ' :
      'মাত্রাহীন বা মাত্রা ছাড়া বর্ণ';
    const textToSpeak = `${letter.char}! এটি একটি ${typeBengali}। উদাহরণ শব্দ: ${letter.exampleWord}!`;
    speak(textToSpeak);
    playSynthSound('pop');
  };

  // Match Game logic
  const handleGameBasketClick = (selectedType: 'full' | 'half' | 'none') => {
    if (!gameLetter || gameFeedback) return;

    const correctType = gameLetter.type;
    const isCorrect = selectedType === correctType;

    if (isCorrect) {
      const newScore = gameScore + 10;
      setGameScore(newScore);
      const newStreak = gameStreak + 1;
      setGameStreak(newStreak);

      if (newScore > gameHighScore) {
        setGameHighScore(newScore);
        localStorage.setItem('matra_game_highscore', String(newScore));
      }

      playSynthSound('correct');
      triggerParticles();
      
      const congratsSpeech = [
        `দারুণ সোনামণি! একদম সঠিক। ${gameLetter.char} একটি ${selectedType === 'full' ? 'পূর্ণমাত্রা' : selectedType === 'half' ? 'অর্ধমাত্রা' : 'মাত্রাহীন'} বর্ণ!`,
        `বাহ! চমৎকার হয়েছে! তোমার উত্তর সঠিক হয়েছে।`
      ];
      speak(congratsSpeech[Math.floor(Math.random() * congratsSpeech.length)]);
      setGameFeedback({
        isCorrect: true,
        message: `চমৎকার সঠিক উত্তর! "${gameLetter.char}" হলো ${selectedType === 'full' ? 'পূর্ণমাত্রা' : selectedType === 'half' ? 'অর্ধমাত্রা' : 'মাত্রাহীন'} বর্ণ।`
      });
    } else {
      setGameStreak(0);
      playSynthSound('wrong');
      const correctText = correctType === 'full' ? 'পূর্ণমাত্রা' : correctType === 'half' ? 'অর্ধমাত্রা' : 'মাত্রাহীন';
      speak(`উফ! একটু ভুল হয়ে গেল। ${gameLetter.char} আসলে একটি ${correctText} বর্ণ। কোনো ব্যাপার না, আবার চেষ্টা করো!`);
      setGameFeedback({
        isCorrect: false,
        message: `ভুল উত্তর সোনামণি! "${gameLetter.char}" আসলে একটি ${correctText} বর্ণ।`
      });
    }
  };

  // Quiz logic
  const handleQuizOptionClick = (option: string) => {
    if (quizAnswered) return;
    setQuizSelectedOption(option);
    setQuizAnswered(true);

    const currentQ = quizQuestions[quizIndex];
    const isCorrect = option === currentQ.correct;

    if (isCorrect) {
      setQuizScore(prev => prev + 10);
      setQuizStreak(prev => prev + 1);
      playSynthSound('correct');
      triggerParticles();
      speak("ওয়াও! সঠিক উত্তর হয়েছে সোনামণি!");
    } else {
      setQuizStreak(0);
      playSynthSound('wrong');
      speak(`ভুল উত্তর সোনামণি। সঠিক উত্তরটি হলো: ${currentQ.correct}`);
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex >= 9) {
      setQuizCompleted(true);
      playSynthSound('celebrate');
      const scorePercentage = (quizScore / 100) * 10;
      speak(`অভিনন্দন সোনামণি! মাত্রা কুইজ শেষ হয়েছে। তুমি ১০টির মধ্যে ${toBengaliNumber(scorePercentage)}টি সঠিক উত্তর দিয়েছ!`);
    } else {
      setQuizIndex(prev => prev + 1);
      setQuizSelectedOption(null);
      setQuizAnswered(false);
    }
  };

  // Filtered Letters list
  const filteredLetters = useMemo(() => {
    return ALL_MATRA_LETTERS.filter(letter => {
      const matchesType = filterType === 'all' || letter.type === filterType;
      const matchesClass = 
        filterClass === 'all' ? true :
        filterClass === 'vowel' ? letter.isVowel : !letter.isVowel;
      return matchesType && matchesClass;
    });
  }, [filterType, filterClass]);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-12">
      {/* Dynamic particles render */}
      <div className="relative pointer-events-none z-50">
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: p.scale }}
            animate={{ opacity: 0, x: p.x, y: p.y }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: p.color,
            }}
          />
        ))}
      </div>

      {/* Header Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-8 text-center mb-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-amber-500/10 to-rose-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-emerald-500/10 to-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <span className="bg-amber-950/45 text-amber-400 border border-amber-900/30 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-3">
          নতুন টাস্ক: বর্ণের মাত্রা শিক্ষা ✏️🌟
        </span>
        <h1 className="text-3xl sm:text-5xl font-black mb-3 text-[#f0f6fc] tracking-tight">
          বর্ণের মাত্রা শিখি 📖✨
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
          বাংলা বর্ণমালার স্বরবর্ণ ও ব্যঞ্জনবর্ণগুলোর ওপর যে মাত্রা বা রেখা থাকে, তা অনুযায়ী বর্ণগুলো ৩টি চমৎকার ভাগে বিভক্ত! 
          এখানে আমরা <span className="text-emerald-400 font-bold">পূর্ণমাত্রা (৩২টি)</span>, <span className="text-amber-400 font-bold">অর্ধমাত্রা (৮টি)</span> এবং <span className="text-rose-400 font-bold">মাত্রাহীন (১০টি)</span> বর্ণ খুব সহজে খেলার মাধ্যমে শিখবো।
        </p>

        {/* Tab Buttons Container */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mt-6">
          <button
            onClick={() => { setActiveTab('learn'); playSynthSound('pop'); speak("মাত্রা পরিচিতি ও অনুশীলন শুরু হলো"); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-black transition-all border ${
              activeTab === 'learn'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0d1117] border-transparent shadow-lg shadow-emerald-950/40 scale-105'
                : 'bg-[#0d1117] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d] hover:border-[#8b949e]'
            }`}
          >
            <Icon name="BookOpen" className="w-4 h-4" />
            <span>মাত্রা পরিচিতি 📖</span>
          </button>

          <button
            onClick={() => { setActiveTab('game'); playSynthSound('pop'); speak("মাত্রা মেলানো খেলা শুরু করা হলো"); setupNextGameLetter(); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-black transition-all border ${
              activeTab === 'game'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-[#0d1117] border-transparent shadow-lg shadow-amber-950/40 scale-105'
                : 'bg-[#0d1117] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d] hover:border-[#8b949e]'
            }`}
          >
            <Icon name="Gamepad2" className="w-4 h-4" />
            <span>মাত্রা মেলানো খেলা 🎮</span>
          </button>

          <button
            onClick={() => { setActiveTab('quiz'); playSynthSound('pop'); speak("মাত্রা কুইজ পরীক্ষা শুরু হলো"); generateQuizQuestions(); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-black transition-all border ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white border-transparent shadow-lg shadow-fuchsia-950/40 scale-105'
                : 'bg-[#0d1117] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d] hover:border-[#8b949e]'
            }`}
          >
            <Icon name="Trophy" className="w-4 h-4" />
            <span>মাত্রা পরীক্ষা কুইজ 🏆</span>
          </button>
        </div>
      </motion.div>

      {/* Tabs Content */}
      <AnimatePresence mode="wait">
        {/* TAB 1: LEARN TAB */}
        {activeTab === 'learn' && (
          <motion.div
            key="learn"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Side: Category Filters & Letters Bento Grid (7 columns on large) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Type Category Blocks */}
              <div className="grid grid-cols-3 gap-3">
                {/* Full Matra Intro Card */}
                <button
                  onClick={() => { setFilterType('full'); playSynthSound('pop'); speak("পূর্ণমাত্রার ৩২টি বর্ণ নিচে দেওয়া হলো"); }}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 text-center transition-all ${
                    filterType === 'full' 
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 scale-105 shadow-md shadow-emerald-950/35' 
                      : 'bg-[#161b22] border-[#30363d] text-slate-400 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-2 text-sm font-bold border border-emerald-500/20">
                    ৩২
                  </div>
                  <h3 className="font-extrabold text-xs sm:text-sm">পূর্ণমাত্রা 🟩</h3>
                  <div className="h-1 w-8 bg-emerald-500 mx-auto mt-1.5 rounded-full" />
                </button>

                {/* Half Matra Intro Card */}
                <button
                  onClick={() => { setFilterType('half'); playSynthSound('pop'); speak("অর্ধমাত্রার ৮টি বর্ণ নিচে দেওয়া হলো"); }}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 text-center transition-all ${
                    filterType === 'half' 
                      ? 'bg-amber-950/40 border-amber-500 text-amber-300 scale-105 shadow-md shadow-amber-950/35' 
                      : 'bg-[#161b22] border-[#30363d] text-slate-400 hover:border-amber-500/30'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2 text-sm font-bold border border-amber-500/20">
                    ৮
                  </div>
                  <h3 className="font-extrabold text-xs sm:text-sm">অর্ধমাত্রা 🟨</h3>
                  <div className="h-1 w-4 bg-amber-500 ml-auto mr-auto mt-1.5 rounded-full" />
                </button>

                {/* Matra-less Intro Card */}
                <button
                  onClick={() => { setFilterType('none'); playSynthSound('pop'); speak("মাত্রাহীন ১০টি বর্ণ নিচে দেওয়া হলো"); }}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 text-center transition-all ${
                    filterType === 'none' 
                      ? 'bg-rose-950/40 border-rose-500 text-rose-300 scale-105 shadow-md shadow-rose-950/35' 
                      : 'bg-[#161b22] border-[#30363d] text-slate-400 hover:border-rose-500/30'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-2 text-sm font-bold border border-rose-500/20">
                    ১০
                  </div>
                  <h3 className="font-extrabold text-xs sm:text-sm">মাত্রাহীন 🟥</h3>
                  <div className="h-0.5 w-8 bg-slate-600/30 mx-auto mt-2 rounded-full" />
                </button>
              </div>

              {/* Sub-Filters: Vowel / Consonant */}
              <div className="flex items-center justify-between bg-[#161b22] border border-[#30363d] rounded-2xl p-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => { setFilterClass('all'); playSynthSound('pop'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      filterClass === 'all' ? 'bg-[#21262d] text-white border border-slate-600' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    সকল বর্ণ ({toBengaliNumber(filteredLetters.length)})
                  </button>
                  <button
                    onClick={() => { setFilterClass('vowel'); playSynthSound('pop'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      filterClass === 'vowel' ? 'bg-[#21262d] text-emerald-400 border border-emerald-900/30' : 'text-slate-400 hover:text-emerald-400'
                    }`}
                  >
                    স্বরবর্ণ
                  </button>
                  <button
                    onClick={() => { setFilterClass('consonant'); playSynthSound('pop'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      filterClass === 'consonant' ? 'bg-[#21262d] text-amber-400 border border-amber-900/30' : 'text-slate-400 hover:text-amber-400'
                    }`}
                  >
                    ব্যঞ্জনবর্ণ
                  </button>
                </div>

                <button
                  onClick={() => { setFilterType('all'); setFilterClass('all'); playSynthSound('pop'); speak("সব রিসেট করা হলো"); }}
                  className="text-xs text-slate-500 hover:text-rose-400 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Icon name="RotateCcw" className="w-3 h-3" />
                  <span>রিসেট ফিল্টার</span>
                </button>
              </div>

              {/* Letters Grid Container */}
              <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-[#30363d]/50 pb-3">
                  <span className="font-bold">যেকোনো বর্ণে টাচ করে চমৎকার বিস্তারিত ও সাউন্ড শোনো:</span>
                  <span className="bg-slate-900 px-2 py-1 rounded-md text-[11px] font-mono border border-slate-800">
                    {toBengaliNumber(filteredLetters.length)}টি বর্ণ পাওয়া গেছে
                  </span>
                </div>

                {filteredLetters.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm font-bold space-y-2">
                    <Icon name="Search" className="w-8 h-8 text-slate-600 mx-auto" />
                    <p>কোনো বর্ণ খুঁজে পাওয়া যায়নি! ফিল্টার পরিবর্তন করো সোনামণি।</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 gap-3">
                    {filteredLetters.map((letter) => {
                      const isSelected = selectedLetter?.char === letter.char;
                      
                      let colorClasses = 'border-[#30363d] hover:border-slate-400 text-[#f0f6fc] hover:bg-[#1f2631]';
                      if (isSelected) {
                        if (letter.type === 'full') {
                          colorClasses = 'bg-emerald-950/60 border-emerald-400 text-emerald-300 ring-4 ring-emerald-500/20';
                        } else if (letter.type === 'half') {
                          colorClasses = 'bg-amber-950/60 border-amber-400 text-amber-300 ring-4 ring-amber-500/20';
                        } else {
                          colorClasses = 'bg-rose-950/60 border-rose-400 text-rose-300 ring-4 ring-rose-500/20';
                        }
                      } else {
                        // Unselected types subtle border glows
                        if (letter.type === 'full') colorClasses += ' hover:border-emerald-500/40';
                        else if (letter.type === 'half') colorClasses += ' hover:border-amber-500/40';
                        else colorClasses += ' hover:border-rose-500/40';
                      }

                      return (
                        <motion.button
                          key={letter.char}
                          onClick={() => { setSelectedLetter(letter); speakLetterDetail(letter); }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`h-14 sm:h-16 rounded-2xl border-2 font-black text-2xl sm:text-3xl flex items-center justify-center transition-all relative ${colorClasses}`}
                        >
                          <span>{letter.char}</span>
                          
                          {/* Mini visual indicator dot for matra type */}
                          <div className={`absolute bottom-1.5 w-2 h-2 rounded-full ${
                            letter.type === 'full' ? 'bg-emerald-500' :
                            letter.type === 'half' ? 'bg-amber-500' :
                            'bg-rose-500'
                          }`} />
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Interactive "Matra Showroom Dashboard" (5 columns on large) */}
            <div className="lg:col-span-5">
              <div className="sticky top-6">
                <AnimatePresence mode="wait">
                  {selectedLetter ? (
                    <motion.div
                      key={selectedLetter.char}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#161b22] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6 relative overflow-hidden"
                    >
                      {/* Decorative island glowing overlay */}
                      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] pointer-events-none opacity-30 ${
                        selectedLetter.type === 'full' ? 'bg-emerald-400' :
                        selectedLetter.type === 'half' ? 'bg-amber-400' :
                        'bg-rose-400'
                      }`} />

                      {/* Header Badge */}
                      <div className="flex justify-center">
                        <span className={`px-4.5 py-1.5 rounded-full border text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                          selectedLetter.type === 'full' ? 'bg-emerald-950/40 text-emerald-300 border-emerald-900/30' :
                          selectedLetter.type === 'half' ? 'bg-amber-950/40 text-amber-300 border-amber-900/30' :
                          'bg-rose-950/40 text-rose-300 border-rose-900/30'
                        }`}>
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            selectedLetter.type === 'full' ? 'bg-emerald-400 animate-pulse' :
                            selectedLetter.type === 'half' ? 'bg-amber-400 animate-pulse' :
                            'bg-rose-400 animate-pulse'
                          }`} />
                          {selectedLetter.type === 'full' ? 'পূর্ণমাত্রা বর্ণ' :
                           selectedLetter.type === 'half' ? 'অর্ধমাত্রা বর্ণ' :
                           'মাত্রাহীন বা মাত্রা ছাড়া বর্ণ'}
                        </span>
                      </div>

                      {/* Large Interactive Letter Stage */}
                      <div className="relative inline-flex items-center justify-center bg-[#0d1117] border border-[#30363d] w-48 h-48 sm:w-56 sm:h-56 rounded-full mx-auto shadow-inner group">
                        
                        {/* Dynamic Matra Stroke Highlighting (Super Educative!) */}
                        {selectedLetter.type === 'full' && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute top-11 sm:top-14 h-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.6)] z-20"
                            title="এই হলো পূর্ণমাত্রা রেখা!"
                          />
                        )}

                        {selectedLetter.type === 'half' && (
                          <motion.div
                            initial={{ width: 0, scaleX: 0 }}
                            animate={{ width: '25%', scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="absolute top-11 sm:top-14 right-12 sm:right-14 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.6)] z-20"
                            title="এটি কেবল ডানদিকে থাকা ছোট্ট অর্ধমাত্রা!"
                          />
                        )}

                        {selectedLetter.type === 'none' && (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.15, 1], opacity: [0, 0.4, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 rounded-full border-4 border-rose-500/30 z-10"
                          />
                        )}

                        {/* Interactive floating letters representing Matra tag */}
                        <div className="absolute top-3 text-[10px] sm:text-xs font-black text-slate-500 tracking-wider">
                          {selectedLetter.type === 'full' ? 'মাথার উপর পূর্ণ মাত্রা ✍️' :
                           selectedLetter.type === 'half' ? 'আংশিক মাত্রা বা অর্ধ মাত্রা ✏️' :
                           'কোনো মাত্রা বা দাগ নেই ❌'}
                        </div>

                        {/* Big Display Char */}
                        <span className="text-8xl sm:text-9xl font-black text-white select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform">
                          {selectedLetter.char}
                        </span>

                        {/* Sparkles on none matra */}
                        {selectedLetter.type === 'none' && (
                          <div className="absolute -top-1 -right-1 text-2xl animate-bounce">✨</div>
                        )}
                      </div>

                      {/* Info & Word Association */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-slate-400 font-bold">উচ্চারণ (Pronunciation)</p>
                          <h4 className="text-2xl font-black text-white">
                            "{selectedLetter.pronunciation}"
                          </h4>
                        </div>

                        {/* Educational Association Section */}
                        <div className="bg-[#0d1117] rounded-2xl p-4 border border-[#30363d] space-y-2.5">
                          <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest bg-amber-950/40 border border-amber-900/30 px-3 py-1 rounded-full inline-block">
                            সহজ শব্দে মনে রাখি
                          </span>
                          
                          <div className="flex justify-center items-center gap-4">
                            <div className="text-center">
                              <span className="text-xs text-slate-500 block">উদাহরণ শব্দ</span>
                              <span className="text-2xl font-black text-white">{selectedLetter.exampleWord}</span>
                            </div>
                            <div className="h-8 w-[1px] bg-slate-800" />
                            <div className="text-center">
                              <span className="text-xs text-slate-500 block">ইংরেজি অর্থ</span>
                              <span className="text-base font-extrabold text-slate-300">{selectedLetter.exampleWordMeaning || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Audio Trigger button */}
                        <button
                          onClick={() => speakLetterDetail(selectedLetter)}
                          className="w-full py-4.5 bg-gradient-to-r from-[#161b22] to-[#21262d] hover:to-[#30363d] border border-slate-700/60 hover:border-slate-500 rounded-2xl font-extrabold text-[#f0f6fc] text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                        >
                          <Icon name="Volume2" className="w-5 h-5 text-emerald-400 animate-bounce" />
                          <span>সুন্দর শব্দে শুনুন</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-8 text-center text-slate-500 font-bold h-64 flex items-center justify-center">
                      যেকোনো বর্ণ সিলেক্ট করে ম্যাজিক দেখো!
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: MATCHING GAME TAB */}
        {activeTab === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {/* Game Dashboard Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-3 text-center">
                <span className="text-[10px] text-slate-400 block font-bold">স্কোর (Score)</span>
                <span className="text-2xl font-black text-amber-400">{toBengaliNumber(gameScore)}</span>
              </div>
              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-3 text-center">
                <span className="text-[10px] text-slate-400 block font-bold">সেরা স্কোর (High Score)</span>
                <span className="text-2xl font-black text-emerald-400">{toBengaliNumber(gameHighScore)}</span>
              </div>
              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-3 text-center">
                <span className="text-[10px] text-slate-400 block font-bold">চলতি স্ট্রেইক (Streak)</span>
                <span className="text-2xl font-black text-pink-400 flex items-center justify-center gap-1">
                  <span>🔥</span>
                  <span>{toBengaliNumber(gameStreak)}</span>
                </span>
              </div>
            </div>

            {/* Main Game Stage */}
            {gameLetter && (
              <div className="bg-[#161b22] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-8 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/5 blur-[80px] pointer-events-none" />
                
                {/* Instruction and magical question tag */}
                <div className="space-y-1">
                  <span className="text-[11px] text-amber-400 font-extrabold uppercase tracking-widest bg-amber-950/40 border border-amber-900/30 px-3.5 py-1 rounded-full inline-block">
                    মাত্রা সনাক্তকরণ খেলা
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-300">
                    নিচের বর্ণটির মাত্রা অনুযায়ী সঠিক ঝুড়িতে ড্রপ করো বা টাচ করো!
                  </h2>
                </div>

                {/* The Floating Letter Bubble (Cloud Style) */}
                <motion.div
                  key={gameLetter.char}
                  initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  className="inline-flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-br from-[#0d1117] to-[#1f2631] border-4 border-amber-500/40 rounded-full shadow-lg relative cursor-pointer"
                  onClick={() => { playSynthSound('pop'); speak(`${gameLetter.char}`); }}
                  whileHover={{ scale: 1.06 }}
                >
                  <div className="absolute -top-1 -right-1 text-2xl">☁️</div>
                  <span className="text-7xl sm:text-8xl font-black text-white select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                    {gameLetter.char}
                  </span>
                  <div className="absolute bottom-2.5 text-[10px] text-slate-400 font-bold flex items-center gap-1 bg-slate-900/80 border border-slate-700/60 px-2 py-0.5 rounded-full">
                    <Icon name="Volume2" className="w-3.5 h-3.5 text-amber-400" />
                    <span>সাউন্ড</span>
                  </div>
                </motion.div>

                {/* Match Game Baskets Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Full Matra Basket */}
                  <motion.button
                    onClick={() => handleGameBasketClick('full')}
                    disabled={!!gameFeedback}
                    whileHover={{ y: -3, scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-5 bg-gradient-to-b from-[#1c2e24] to-[#0d1a12] border-2 border-emerald-500/45 rounded-2xl text-center space-y-1 shadow-md hover:border-emerald-400 disabled:opacity-60 transition-all cursor-pointer"
                  >
                    <span className="text-3xl block select-none">🧺🟩</span>
                    <h3 className="text-lg font-black text-emerald-300">পূর্ণমাত্রা ঝুড়ি</h3>
                    <p className="text-[11px] text-emerald-500/90 font-medium">উপরে পূর্ণ দাগ রয়েছে</p>
                  </motion.button>

                  {/* Half Matra Basket */}
                  <motion.button
                    onClick={() => handleGameBasketClick('half')}
                    disabled={!!gameFeedback}
                    whileHover={{ y: -3, scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-5 bg-gradient-to-b from-[#2e241c] to-[#1a120d] border-2 border-amber-500/45 rounded-2xl text-center space-y-1 shadow-md hover:border-amber-400 disabled:opacity-60 transition-all cursor-pointer"
                  >
                    <span className="text-3xl block select-none">🧺🟨</span>
                    <h3 className="text-lg font-black text-amber-300">অর্ধমাত্রা ঝুড়ি</h3>
                    <p className="text-[11px] text-amber-500/90 font-medium">উপরে অর্ধেক দাগ আছে</p>
                  </motion.button>

                  {/* Matra-less Basket */}
                  <motion.button
                    onClick={() => handleGameBasketClick('none')}
                    disabled={!!gameFeedback}
                    whileHover={{ y: -3, scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-5 bg-gradient-to-b from-[#2e1c24] to-[#1a0d12] border-2 border-rose-500/45 rounded-2xl text-center space-y-1 shadow-md hover:border-rose-400 disabled:opacity-60 transition-all cursor-pointer"
                  >
                    <span className="text-3xl block select-none">🧺🟥</span>
                    <h3 className="text-lg font-black text-rose-300">মাত্রাহীন ঝুড়ি</h3>
                    <p className="text-[11px] text-rose-500/90 font-medium">কোনো দাগ বা মাত্রা নেই</p>
                  </motion.button>
                </div>

                {/* Feedback overlay */}
                <AnimatePresence>
                  {gameFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-5 rounded-2xl border text-center space-y-3 ${
                        gameFeedback.isCorrect 
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' 
                          : 'bg-rose-950/40 border-rose-500 text-rose-300'
                      }`}
                    >
                      <div className="text-4xl">
                        {gameFeedback.isCorrect ? '🌟🏆🎉' : '💪❤️🌸'}
                      </div>
                      <h4 className="text-xl font-black">
                        {gameFeedback.message}
                      </h4>
                      <div>
                        <button
                          onClick={setupNextGameLetter}
                          className="px-8 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black rounded-xl transition-all shadow-md inline-flex items-center gap-2 hover:scale-105"
                        >
                          <span>পরবর্তী বর্ণ খেলি</span>
                          <Icon name="ArrowRight" className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: QUIZ TAB */}
        {activeTab === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            {quizCompleted ? (
              <motion.div
                key="quiz-completed-matra"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#161b22] border-2 border-amber-500/30 rounded-3xl p-8 text-center space-y-6 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 blur-[80px] pointer-events-none animate-pulse" />
                
                <div className="text-6xl sm:text-7xl select-none animate-bounce">🏆🎖️🌟</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-rose-400">
                  মাত্রা কুইজ সম্পন্ন হয়েছে!
                </h2>
                <p className="text-slate-300 text-base max-w-md mx-auto">
                  অসাধারণ সোনামণি! মাত্রা কুইজের ১০টি প্রশ্ন সফলভাবে শেষ করার জন্য তোমাকে অভিনন্দন!
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-4">
                  <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-4 text-center">
                    <span className="text-xs text-slate-400 block mb-1">মোট স্কোর (Score)</span>
                    <span className="text-3xl font-black text-amber-400">{toBengaliNumber(quizScore)}</span>
                  </div>
                  <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-4 text-center">
                    <span className="text-xs text-slate-400 block mb-1">সঠিক উত্তর (Accuracy)</span>
                    <span className="text-3xl font-black text-emerald-400">{toBengaliNumber(quizScore / 10)} / ১০</span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={generateQuizQuestions}
                    className="px-10 py-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-lg font-black rounded-2xl transition-all shadow-lg hover:scale-105 inline-flex items-center gap-2"
                  >
                    <Icon name="RefreshCw" className="w-5 h-5" />
                    <span>আবার কুইজ খেলি</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              quizQuestions.length > 0 && (
                <div className="bg-[#161b22] border-2 border-[#30363d] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
                  
                  {/* Visual Progress Bar (Requested Feature!) */}
                  <div className="space-y-3 border-b border-[#30363d]/50 pb-5">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-slate-300">
                      <span className="flex items-center gap-1.5 bg-fuchsia-950/40 text-fuchsia-300 border border-fuchsia-900/30 px-3 py-1.5 rounded-full text-[11px] sm:text-xs">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
                        </span>
                        কুইজ অগ্রগতি (১০টি প্রশ্ন)
                      </span>
                      <span className="text-amber-400 bg-amber-950/40 border border-amber-900/30 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-black">
                        {toBengaliNumber(quizIndex + 1)} / ১০টি প্রশ্ন
                      </span>
                    </div>
                    
                    {/* Progress Bar Track */}
                    <div className="w-full bg-[#0d1117] h-3.5 rounded-full overflow-hidden border border-[#30363d] p-[2px]">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((quizIndex + (quizAnswered ? 1 : 0)) / 10) * 100}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Question and BIG display letter */}
                  <div className="text-center space-y-4 py-3">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-[#0d1117] border border-[#30363d] rounded-full text-5xl font-black text-amber-400 shadow-md">
                      {quizQuestions[quizIndex].letter.char}
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-black text-white leading-relaxed max-w-xl mx-auto">
                      {quizQuestions[quizIndex].question}
                    </h2>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quizQuestions[quizIndex].options.map((option, idx) => {
                      const isSelected = quizSelectedOption === option;
                      const isCorrect = option === quizQuestions[quizIndex].correct;
                      
                      let buttonStyle = "bg-[#0d1117] border-[#30363d] hover:border-amber-500/40 text-slate-100 hover:bg-[#1f2631]";
                      if (quizAnswered) {
                        if (isCorrect) {
                          buttonStyle = "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-md shadow-emerald-950/30";
                        } else if (isSelected) {
                          buttonStyle = "bg-gradient-to-r from-rose-600 to-red-700 text-white border-rose-400 shadow-md shadow-rose-950/30";
                        } else {
                          buttonStyle = "bg-slate-900/40 border-[#21262d] text-slate-500 scale-95 opacity-50";
                        }
                      }

                      return (
                        <motion.button
                          key={idx}
                          onClick={() => handleQuizOptionClick(option)}
                          disabled={quizAnswered}
                          whileHover={!quizAnswered ? { scale: 1.02, y: -1 } : {}}
                          className={`p-4.5 rounded-2xl border-2 text-lg sm:text-xl font-black transition-all flex items-center justify-between group ${buttonStyle} cursor-pointer`}
                        >
                          <span className="flex-1 text-left">{option}</span>
                          <div className="flex-shrink-0 ml-2">
                            {quizAnswered && isCorrect && (
                              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-emerald-600">
                                <Icon name="Check" className="w-4 h-4 stroke-[4]" />
                              </div>
                            )}
                            {quizAnswered && isSelected && !isCorrect && (
                              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-rose-600">
                                <Icon name="X" className="w-4 h-4 stroke-[4]" />
                              </div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Feedbacks / Next Button overlay */}
                  <AnimatePresence>
                    {quizAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center text-center p-5 rounded-2xl border bg-[#0d1117]/80 backdrop-blur-md space-y-3 mt-4"
                      >
                        {quizSelectedOption === quizQuestions[quizIndex].correct ? (
                          <>
                            <div className="text-3xl animate-bounce">🏆🎉🎖️</div>
                            <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-emerald-400">
                              বাহ! সঠিক উত্তর হয়েছে সোনামণি!
                            </h3>
                          </>
                        ) : (
                          <>
                            <div className="text-3xl">🌸💪❤️</div>
                            <h3 className="text-xl font-black text-amber-400">
                              কোনো ব্যাপার না! আবার ট্রাই করো।
                            </h3>
                            <p className="text-slate-300 text-xs font-semibold">
                              সঠিক উত্তর ছিল: <span className="text-emerald-400 font-black">"{quizQuestions[quizIndex].correct}"</span>
                            </p>
                          </>
                        )}

                        <button
                          onClick={handleNextQuiz}
                          className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-sm font-black flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all mt-1 cursor-pointer"
                        >
                          <span>{quizIndex >= 9 ? 'ফলাফল দেখুন 🏆' : 'পরবর্তী প্রশ্ন'}</span>
                          <Icon name="ArrowRight" className="w-4 h-4" />
                        </button>
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
