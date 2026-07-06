import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Award, Flame, BookOpen, PenTool, Brain, Sparkles, Volume2, Star, VolumeX, CheckCircle, Lock, Play } from 'lucide-react';

interface Badge {
  id: string;
  bnTitle: string;
  enTitle: string;
  emoji: string;
  description: string;
  requirementText: string;
  colorClass: string;
  glowColor: string;
  speechText: string;
  checkUnlocked: (stats: {
    streak: number;
    listenCount: number;
    drawCount: number;
    quizCount: number;
    listenedWordsCount: number;
  }) => boolean;
}

const BADGES: Badge[] = [
  {
    id: 'vowel_master',
    bnTitle: "স্বরবর্ণের রাজা",
    enTitle: "Vowel Master",
    emoji: "👑",
    description: "স্বরবর্ণগুলো সুন্দর করে শিখে এবং অনুশীলন করে এই রাজকীয় ব্যাজটি অর্জন করা যায়।",
    requirementText: "৩টি বর্ণ শুনুন অথবা লিখুন",
    colorClass: "from-amber-500 via-orange-500 to-yellow-500 text-amber-100 border-amber-500/40",
    glowColor: "shadow-amber-500/20",
    speechText: "সাবাশ সোনামণি! তুমি স্বরবর্ণের রাজা ব্যাজটি অর্জন করেছ! তুমি স্বরবর্ণগুলো খুব চমৎকারভাবে শিখেছ।",
    checkUnlocked: (stats) => stats.listenCount >= 3 || stats.drawCount >= 1 || stats.listenedWordsCount >= 3
  },
  {
    id: 'vocab_explorer',
    bnTitle: "শব্দ গবেষক",
    enTitle: "Vocabulary Explorer",
    emoji: "🔍",
    description: "নতুন নতুন বাংলা শব্দ ও তাদের ছবি খুঁজে দেখে এই অনুসন্ধানকারী ব্যাজটি আনলক করো!",
    requirementText: "৫টি ভিন্ন শব্দ শুনে শেখা",
    colorClass: "from-emerald-500 via-teal-500 to-cyan-500 text-emerald-100 border-emerald-500/40",
    glowColor: "shadow-emerald-500/20",
    speechText: "দারুণ বন্ধু! তুমি শব্দ গবেষক ব্যাজটি অর্জন করেছ! বাংলা শব্দের জগত আরও বেশি করে ঘুরে দেখো!",
    checkUnlocked: (stats) => stats.listenedWordsCount >= 5
  },
  {
    id: 'drawing_maestro',
    bnTitle: "তুলির যাদুকর",
    enTitle: "Drawing Maestro",
    emoji: "🎨",
    description: "বর্ণের ওপর ডটেড রেখা টেনে নিখুঁতভাবে সুন্দর বাংলা বর্ণ এঁকে এই সৃজনশীল ব্যাজটি লাভ করো।",
    requirementText: "৩টি বর্ণ ডটেড বা স্বাধীনভাবে আঁকা",
    colorClass: "from-pink-500 via-fuchsia-500 to-purple-500 text-pink-100 border-pink-500/40",
    glowColor: "shadow-pink-500/20",
    speechText: "অসাধারণ! তুমি তুলির যাদুকর ব্যাজটি জয় করেছ। তোমার আঁকা বর্ণগুলো চমৎকার হয়েছে!",
    checkUnlocked: (stats) => stats.drawCount >= 3
  },
  {
    id: 'quiz_champion',
    bnTitle: "কুইজ বিজয়ী",
    enTitle: "Quiz Champion",
    emoji: "🏆",
    description: "বাংলা স্বরবর্ণ ও ব্যঞ্জনবর্ণের মজার কুইজে সঠিক উত্তর মেলালে অর্জিত হয় এই ট্রফিটি।",
    requirementText: "৩টি কুইজ খেলে সঠিক উত্তর দেওয়া",
    colorClass: "from-indigo-500 via-blue-500 to-cyan-500 text-indigo-100 border-indigo-500/40",
    glowColor: "shadow-indigo-500/20",
    speechText: "দারুণ বুদ্ধিমান! তুমি কুইজ বিজয়ী ব্যাজটি আনলক করেছ। কুইজে তোমার সবকটি উত্তর সঠিক ছিল!",
    checkUnlocked: (stats) => stats.quizCount >= 3
  },
  {
    id: 'streak_star',
    bnTitle: "স্ট্রিক স্টার",
    enTitle: "Streak Star",
    emoji: "🔥",
    description: "প্রতিদিন নিয়মিত পড়াশোনা বজায় রেখে তোমার শিক্ষণ ধারা (Streak) সচল রাখলে এই মেডেলটি পাবে।",
    requirementText: "২ বা তার বেশি দিনের স্ট্রিক বজায় রাখা",
    colorClass: "from-red-500 via-orange-500 to-rose-500 text-rose-100 border-red-500/40",
    glowColor: "shadow-red-500/20",
    speechText: "অভিনন্দন সোনামণি! তুমি নিয়মিত পড়াশোনা করে স্ট্রিক স্টার ব্যাজটি অর্জন করেছ। এভাবে এগিয়ে যাও!",
    checkUnlocked: (stats) => stats.streak >= 2
  },
  {
    id: 'alphabet_conqueror',
    bnTitle: "বর্ণের জাদুকর",
    enTitle: "Alphabet Conqueror",
    emoji: "🦄",
    description: "আজকের সবকটি দৈনিক মিশন সফলভাবে শেষ করে সেরা শিক্ষার্থীর খেতাবটি অর্জন করো!",
    requirementText: "আজকের গোল্ডেন মিশন ব্যাজ জেতা",
    colorClass: "from-purple-500 via-indigo-600 to-pink-500 text-purple-100 border-purple-500/40 animate-pulse",
    glowColor: "shadow-purple-500/30",
    speechText: "ওয়াও! অভিনন্দন চ্যাম্পিয়ন! তুমি সেরা মিশন ব্যাজ বর্ণের জাদুকর জয় করেছ! আজ তুমি সবার সেরা!",
    checkUnlocked: (stats) => stats.listenCount >= 5 && stats.drawCount >= 3 && stats.quizCount >= 1
  }
];

interface ProgressDashboardProps {
  speak: (text: string) => Promise<void> | void;
  onNavigateToMode?: (mode: string) => void;
}

export default function LearningProgressDashboard({ speak, onNavigateToMode }: ProgressDashboardProps) {
  // Stats states derived from localStorage
  const [stats, setStats] = useState({
    streak: 0,
    listenCount: 0,
    drawCount: 0,
    quizCount: 0,
    listenedWordsCount: 0
  });

  const [claimedBadges, setClaimedBadges] = useState<string[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [activeMascotQuote, setActiveMascotQuote] = useState<string>("স্বাগতম বন্ধু! তোমার সফল পড়াশোনার মেডেলগুলো এই ড্যাশবোর্ডে সযত্নে রাখা আছে। চলো লক্ষ্য পূরণ করি!");
  const [celebrationBadge, setCelebrationBadge] = useState<Badge | null>(null);

  // Load stats from localStorage on mount
  useEffect(() => {
    try {
      const storedStreak = parseInt(localStorage.getItem('bangla_learning_streak') || '0', 10);
      const storedListen = parseInt(localStorage.getItem('bangla_mission_listen_count') || '0', 10);
      const storedDraw = parseInt(localStorage.getItem('bangla_mission_draw_count') || '0', 10);
      const storedQuiz = parseInt(localStorage.getItem('bangla_mission_quiz_count') || '0', 10);
      
      let wordsCount = 0;
      const storedWordsStr = localStorage.getItem('bangla_listened_words');
      if (storedWordsStr) {
        const wordsArray = JSON.parse(storedWordsStr);
        if (Array.isArray(wordsArray)) {
          wordsCount = wordsArray.length;
        }
      }

      setStats({
        streak: storedStreak,
        listenCount: storedListen,
        drawCount: storedDraw,
        quizCount: storedQuiz,
        listenedWordsCount: wordsCount
      });

      // Load claimed badges
      const savedClaims = localStorage.getItem('bangla_claimed_badges');
      if (savedClaims) {
        setClaimedBadges(JSON.parse(savedClaims));
      }
    } catch (e) {
      console.error("Failed to load stats for progress dashboard", e);
    }

    speak("তোমার অর্জিত মেডেল এবং পড়াশোনার ড্যাশবোর্ডে স্বাগতম! চলো দেখি আজ আমরা কী কী মেডেল আনলক করতে পেরেছি!");
  }, []);

  // Web Audio Synth sounds
  const playSound = (type: 'pop' | 'sparkle' | 'success') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      if (type === 'pop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'sparkle') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.05);
        osc.frequency.setValueAtTime(1500, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'success') {
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // Major C chord
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
          gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.06);
          gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + idx * 0.06 + 0.35);
          osc.start(ctx.currentTime + idx * 0.06);
          osc.stop(ctx.currentTime + idx * 0.06 + 0.4);
        });
      }
    } catch (e) {
      console.warn("Sound play failed", e);
    }
  };

  const handleBadgeClick = (badge: Badge) => {
    playSound('pop');
    setSelectedBadge(badge);
    const isUnlocked = badge.checkUnlocked(stats);
    
    if (isUnlocked) {
      setActiveMascotQuote(`দারুণ সোনা বন্ধু! তুমি "${badge.bnTitle}" ব্যাজটি অর্জন করার যোগ্যতা অর্জন করেছো!`);
      speak(badge.speechText);
    } else {
      setActiveMascotQuote(`এই ব্যাজটি এখনো লক করা আছে বন্ধু। এটি পেতে তোমাকে ${badge.requirementText} করতে হবে। চলো চেষ্টা করি!`);
      speak(`ঐ ব্যাজটি লক করা আছে সোনামণি। এটি পেতে তোমাকে ${badge.requirementText} করতে হবে।`);
    }
  };

  const claimBadge = (badge: Badge) => {
    if (claimedBadges.includes(badge.id)) return;
    playSound('success');
    
    const updated = [...claimedBadges, badge.id];
    setClaimedBadges(updated);
    localStorage.setItem('bangla_claimed_badges', JSON.stringify(updated));
    setCelebrationBadge(badge);
    speak(`সাবাশ বন্ধু! তুমি সফলভাবে "${badge.bnTitle}" ব্যাজটি দাবি করেছ এবং সুস্বাদু চকলেট মেডেল জিতে নিয়েছ!`);
  };

  const resetAllDashboardClaims = () => {
    playSound('sparkle');
    setClaimedBadges([]);
    localStorage.removeItem('bangla_claimed_badges');
    speak("ড্যাশবোর্ডের সমস্ত দাবি রিসেট করা হয়েছে। এসো নতুন করে মেডেল অর্জন করি!");
  };

  // Convert numbers to Bengali format
  const toBengaliNum = (num: number): string => {
    const digits: Record<string, string> = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
      '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
    };
    return num.toString().split('').map(d => digits[d] || d).join('');
  };

  return (
    <div className="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#30363d] rounded-3xl p-4 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>

      {/* Hero Title & Motivation Banner */}
      <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
        <span className="px-4 py-1.5 text-xs font-black text-amber-400 bg-amber-950/40 rounded-full border border-amber-500/25 uppercase tracking-wider">
          🏆 মেডেল ও লার্নিং ড্যাশবোর্ড (Badges)
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 mt-2">
          🌟 আমার শিক্ষণ মেডেল গ্যালারি
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-bold max-w-xl mx-auto leading-relaxed">
          তুমি পড়ার সময় কতটুকু অগ্রগতি পেয়েছ তা মেলাও! প্রতিটি নতুন মিশন সফলভাবে শেষ করলে নতুন মেডেল আনলক হবে।
        </p>
      </div>

      {/* Mascot Section */}
      <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative z-10 flex flex-col md:flex-row items-center gap-6 shadow-inner">
        {/* Animated Mascot (Cute Tiger) */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-28 h-28 shrink-0 cursor-pointer bg-gradient-to-b from-amber-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-amber-300 shadow-xl"
          onClick={() => {
            playSound('sparkle');
            speak("হ্যালো বন্ধু! আমি তোমাদের বাঘ মামা! আমি তোমাদের মেডেল দেখতে অনেক পছন্দ করি। নতুন বর্ণ এবং শব্দ পড়ো আর ব্যাজগুলো দাবি করো!");
          }}
        >
          {/* Tiger Mascot Facial details using pure CSS */}
          <div className="text-5xl">🐯</div>
          <div className="absolute -top-1 -right-1 bg-yellow-400 text-slate-950 font-black px-2 py-0.5 text-[10px] rounded-full border border-white uppercase tracking-wider shadow">
            ম্যাসকট
          </div>
        </motion.div>

        {/* Speech Bubble */}
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="relative bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            {/* Speech bubble arrow pointer */}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-slate-950 border-l border-b border-slate-800 rotate-45 hidden md:block"></div>
            <p className="text-sm sm:text-base font-black text-slate-200 leading-relaxed">
              "{activeMascotQuote}"
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <button
              onClick={() => {
                playSound('pop');
                speak("হ্যালো বন্ধু! আমি তোমাদের বাঘ মামা! আমি তোমাদের মেডেল দেখতে অনেক পছন্দ করি। নতুন বর্ণ এবং শব্দ পড়ো আর ব্যাজগুলো দাবি করো!");
              }}
              className="flex items-center gap-1 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded-full text-[10px] font-black transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>ম্যাসকটের কথা শোনো</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid Stats Section */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        
        {/* Stat 1: Streak */}
        <div className="bg-gradient-to-br from-[#1b1e22] to-[#0d1117] border border-red-500/25 p-4 rounded-2xl flex flex-col justify-between space-y-2 group hover:border-red-500/50 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-black text-red-400 tracking-wider uppercase">লার্নিং স্ট্রিক</span>
            <div className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center text-red-400">
              <Flame className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">{toBengaliNum(stats.streak)} দিন</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1">টানা পড়াশোনার ধারা</p>
          </div>
        </div>

        {/* Stat 2: Words Listened */}
        <div className="bg-gradient-to-br from-[#1b1e22] to-[#0d1117] border border-emerald-500/25 p-4 rounded-2xl flex flex-col justify-between space-y-2 group hover:border-emerald-500/50 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-black text-emerald-400 tracking-wider uppercase">পড়া শব্দ</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">{toBengaliNum(stats.listenedWordsCount)} টি</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1">মোট শোনা ও পড়া শব্দ</p>
          </div>
        </div>

        {/* Stat 3: Drawings Completed */}
        <div className="bg-gradient-to-br from-[#1b1e22] to-[#0d1117] border border-pink-500/25 p-4 rounded-2xl flex flex-col justify-between space-y-2 group hover:border-pink-500/50 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-black text-pink-400 tracking-wider uppercase">আঁকা বর্ণ</span>
            <div className="w-7 h-7 rounded-lg bg-pink-500/15 flex items-center justify-center text-pink-400">
              <PenTool className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">{toBengaliNum(stats.drawCount)} টি</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1">বর্ণের ট্রেসিং অনুশীলন</p>
          </div>
        </div>

        {/* Stat 4: Quizzes Played */}
        <div className="bg-gradient-to-br from-[#1b1e22] to-[#0d1117] border border-indigo-500/25 p-4 rounded-2xl flex flex-col justify-between space-y-2 group hover:border-indigo-500/50 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-black text-indigo-400 tracking-wider uppercase">সঠিক কুইজ</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">{toBengaliNum(stats.quizCount)} টি</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1">সঠিক সমাধানকৃত কুইজ</p>
          </div>
        </div>

      </div>

      {/* Badges Shelf Layout */}
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-slate-200 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>অর্জিত ও আনলক করা মেডেলসমূহ ({toBengaliNum(claimedBadges.length)} / {toBengaliNum(BADGES.length)})</span>
          </h3>
          <button
            onClick={resetAllDashboardClaims}
            className="text-[10px] bg-slate-900 hover:bg-slate-800 border border-slate-850 px-3 py-1 rounded-full text-slate-400 font-bold transition-all"
          >
            মেডেল রিসেট করুন
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BADGES.map((b) => {
            const isConditionMet = b.checkUnlocked(stats);
            const isClaimed = claimedBadges.includes(b.id);
            const isSelected = selectedBadge?.id === b.id;

            return (
              <div
                key={b.id}
                onClick={() => handleBadgeClick(b)}
                className={`border-2 rounded-[24px] p-5 transition-all cursor-pointer relative overflow-hidden select-none flex flex-col justify-between min-h-[200px] shadow-lg ${
                  isClaimed
                    ? `bg-gradient-to-b ${b.colorClass} border-transparent ${b.glowColor} scale-102 hover:scale-105`
                    : isConditionMet
                    ? 'bg-[#1b2a22] border-emerald-500/60 shadow-lg shadow-emerald-500/5 hover:border-emerald-400'
                    : 'bg-[#161b22]/80 border-[#30363d] opacity-75 hover:opacity-100 hover:border-slate-700'
                } ${isSelected ? 'ring-2 ring-amber-400' : ''}`}
              >
                {/* Background Sparkles for Claimed/Unlocked Badges */}
                {isConditionMet && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-xl rounded-full"></div>
                )}

                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    {/* Badge Emoji */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner ${
                      isClaimed 
                        ? 'bg-white/15 animate-bounce' 
                        : isConditionMet 
                        ? 'bg-emerald-950/50 text-emerald-300' 
                        : 'bg-slate-900 text-slate-500'
                    }`}>
                      {isClaimed ? b.emoji : isConditionMet ? b.emoji : "🔒"}
                    </div>

                    {/* Status Badge Tag */}
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      isClaimed
                        ? 'bg-white/20 border-white/30 text-white shadow-md'
                        : isConditionMet
                        ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-950/60 border-slate-800 text-slate-500'
                    }`}>
                      {isClaimed ? "অর্জিত 🎉" : isConditionMet ? "দাবি করুন 💎" : "লক করা"}
                    </span>
                  </div>

                  <div className="text-left space-y-1">
                    <h4 className={`text-base font-black ${isClaimed ? 'text-white' : 'text-slate-200'}`}>
                      {b.bnTitle}
                    </h4>
                    <p className={`text-[10px] font-bold ${isClaimed ? 'text-white/80' : 'text-slate-400'}`}>
                      {b.enTitle}
                    </p>
                    <p className={`text-[11px] leading-relaxed font-semibold mt-1.5 ${isClaimed ? 'text-white/90' : 'text-slate-400'}`}>
                      {b.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  {/* Dynamic Progress indicator */}
                  <div className="text-left">
                    <p className={`text-[9px] font-black uppercase ${isClaimed ? 'text-white/60' : 'text-slate-500'}`}>
                      শর্ত:
                    </p>
                    <p className={`text-[10px] font-extrabold ${isClaimed ? 'text-white/90' : 'text-slate-300'}`}>
                      {b.requirementText}
                    </p>
                  </div>

                  {/* Claim Button or Lock Icon */}
                  {isClaimed ? (
                    <div className="flex items-center gap-1 text-white text-xs font-black">
                      <CheckCircle className="w-4 h-4 fill-white text-emerald-600" />
                      <span>সংগৃহীত</span>
                    </div>
                  ) : isConditionMet ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        claimBadge(b);
                      }}
                      className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-yellow-400/20 active:scale-95 transition-all flex items-center gap-1"
                    >
                      <span>দাবি করি</span>
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-[#8b949e] text-xs font-black">
                      <Lock className="w-3.5 h-3.5" />
                      <span>অনুশীলন করো</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested path navigation panel */}
      <div className="max-w-4xl mx-auto bg-slate-950/60 border border-slate-850 p-5 rounded-3xl space-y-3 relative z-10 text-center md:text-left">
        <h4 className="text-xs sm:text-sm uppercase font-black text-emerald-400 tracking-wider">
          💡 মেডেল অর্জনের জন্য দ্রুত নেভিগেশন (Jump to Learning Modules)
        </h4>
        <p className="text-xs text-slate-400 font-bold">
          যেকোনো অপশনে ক্লিক করে দ্রুত সেটিতে চলে যাও, চমৎকারভাবে অনুশীলন করো আর নতুন মেডেল দাবি করো!
        </p>

        <div className="flex flex-wrap gap-2.5 justify-center md:justify-start pt-1.5">
          <button
            onClick={() => onNavigateToMode?.('learn')}
            className="px-3.5 py-1.5 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] rounded-xl text-xs font-black text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>বর্ণ শিখি (Vowel & Consonants)</span>
          </button>
          
          <button
            onClick={() => onNavigateToMode?.('words')}
            className="px-3.5 py-1.5 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] rounded-xl text-xs font-black text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>শব্দ শিখি (Vocabulary Explorer)</span>
          </button>

          <button
            onClick={() => onNavigateToMode?.('dotted')}
            className="px-3.5 py-1.5 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] rounded-xl text-xs font-black text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <PenTool className="w-3.5 h-3.5 text-pink-400" />
            <span>বর্ণ আঁকা (Trace & Draw Letters)</span>
          </button>

          <button
            onClick={() => onNavigateToMode?.('quiz')}
            className="px-3.5 py-1.5 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] rounded-xl text-xs font-black text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            <span>কুইজ খেলি (Challenge Quiz)</span>
          </button>
        </div>
      </div>

      {/* Teacher / Parent Guide Section */}
      <div className="bg-amber-950/10 border border-amber-500/25 p-4 rounded-2xl text-center">
        <p className="text-xs text-amber-400 font-black tracking-wide">
          📌 শিক্ষক ও অভিভাবক নির্দেশিকা: ড্যাশবোর্ডের লার্নিং মেডেলগুলো বাচ্চার সক্রিয় অংশগ্রহণ নিশ্চিত করে। ব্যাজগুলো দাবি করার চমৎকার বেল ও চুন-কার্ড সাউন্ড শুনুন এবং সঠিক উচ্চারণের সাথে শিশুকে অনুপ্রাণিত করুন।
        </p>
      </div>

      {/* Claimed Badge Celebration Overlay Modal */}
      <AnimatePresence>
        {celebrationBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#161b22] border-4 border-yellow-400 rounded-[32px] p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Confetti / Sparkle glow background */}
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-yellow-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl"></div>

              {/* Animated Giant Badge Medal */}
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, repeatType: "reverse" }}
                className={`w-24 h-24 rounded-full bg-gradient-to-tr ${celebrationBadge.colorClass} flex items-center justify-center mx-auto text-5xl shadow-2xl shadow-yellow-500/30 border-2 border-yellow-200`}
              >
                {celebrationBadge.emoji}
              </motion.div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">
                  {celebrationBadge.bnTitle}
                </h3>
                <span className="text-[10px] bg-emerald-950/50 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-black tracking-widest uppercase inline-block">
                  {celebrationBadge.enTitle} Unlocked
                </span>
                <p className="text-sm font-bold text-slate-300 leading-relaxed pt-2">
                  অসাধারণ সোনামণি! তুমি আজ পড়াশোনার লক্ষ্যে নতুন এক ধাপ স্পর্শ করেছ। এই ব্যাজটি তোমার কৃতিত্বের গৌরব বাড়াবে!
                </p>
              </div>

              {/* Beautiful bounce indicator */}
              <div className="flex justify-center gap-2">
                {['⭐', '🌟', '🍫', '🌟', '⭐'].map((emoji, index) => (
                  <motion.span
                    key={index}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.2 }}
                    className="text-2xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => setCelebrationBadge(null)}
                  className="w-full py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-yellow-500/20 transition-all active:scale-95"
                >
                  দারুণ! বন্ধ করি
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
