import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Sparkles,
  Music,
  Heart,
  Smile,
  VolumeX,
  Compass,
  Star,
  Zap
} from 'lucide-react';

// Types
interface AlphabetItem {
  letter: string;
  word: string;
  emoji: string;
  lyric: string;
  frequency: number;
}

// Convert numbers to Bengali
const toBengaliNum = (num: number): string => {
  const digits: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return num.toString().split('').map(d => digits[d] || d).join('');
};

// Warm Pentatonic and Major scale frequencies for melodic sweetness
const vowelNotes = [
  261.63, // C4 (অ)
  293.66, // D4 (আ)
  329.63, // E4 (ই)
  349.23, // F4 (ঈ)
  392.00, // G4 (উ)
  440.00, // A4 (ঊ)
  493.88, // B4 (ঋ)
  523.25, // C5 (এ)
  587.33, // D5 (ঐ)
  659.25, // E5 (ও)
  698.46  // F5 (ঔ)
];

const consonantNotes = [
  261.63, 293.66, 329.63, 392.00, 440.00, // C4, D4, E4, G4, A4
  523.25, 587.33, 659.25, 783.99, 880.00, // C5, D5, E5, G5, A5
  1046.50, 1174.66, 1318.51, 1567.98, 1760.00, // C6, D6, E6, G6, A6
  // Repeat cyclically to cover all 39 letters
  261.63, 293.66, 329.63, 392.00, 440.00,
  523.25, 587.33, 659.25, 783.99, 880.00,
  1046.50, 1174.66, 1318.51, 1567.98, 1760.00,
  261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99
];

const vowels: AlphabetItem[] = [
  { letter: 'অ', word: 'অজগর', emoji: '🐍', lyric: 'অজগরটি আসছে তেড়ে', frequency: vowelNotes[0] },
  { letter: 'আ', word: 'আম', emoji: '🥭', lyric: 'আমটি আমি খাবো পেড়ে', frequency: vowelNotes[1] },
  { letter: 'ই', word: 'ইঁদুর', emoji: '🐀', lyric: 'ইঁদুর ছানা ভয়ে মরে', frequency: vowelNotes[2] },
  { letter: 'ঈ', word: 'ঈগল', emoji: '🦅', lyric: 'ঈগল পাখি পাছে ধরে', frequency: vowelNotes[3] },
  { letter: 'উ', word: 'উট', emoji: '🐫', lyric: 'উট চলেছে মুখটি তুলে', frequency: vowelNotes[4] },
  { letter: 'ঊ', word: 'ঊর্মি', emoji: '🌊', lyric: 'ঊর্মি হাসে সাগর কোলে', frequency: vowelNotes[5] },
  { letter: 'ঋ', word: 'ঋষি', emoji: '🧘', lyric: 'ঋষি মশাই বসেন ধ্যানে', frequency: vowelNotes[6] },
  { letter: 'এ', word: 'একতারা', emoji: '🪕', lyric: 'একতারাটি বাজে বাণে', frequency: vowelNotes[7] },
  { letter: 'ঐ', word: 'ঐরাবত', emoji: '🐘', lyric: 'ঐ দেখ ভাই চাঁদ উঠেছে', frequency: vowelNotes[8] },
  { letter: 'ও', word: 'ওল', emoji: '🥔', lyric: 'ওল খেও না ধরবে গলা', frequency: vowelNotes[9] },
  { letter: 'ঔ', word: 'ঔষধ', emoji: '💊', lyric: 'ঔষধ খেতে মিছে বলা', frequency: vowelNotes[10] }
];

const consonants: AlphabetItem[] = [
  { letter: 'ক', word: 'কাকাতুয়া', emoji: '🦜', lyric: 'কাকাতুয়ার মাথায় ঝুঁটি', frequency: consonantNotes[0] },
  { letter: 'খ', word: 'খরগোশ', emoji: '🐇', lyric: 'খরগোশটি লাফিয়ে চলে', frequency: consonantNotes[1] },
  { letter: 'গ', word: 'গরু', emoji: '🐄', lyric: 'গরু আমাদের দুধ দেয়', frequency: consonantNotes[2] },
  { letter: 'ঘ', word: 'ঘর', emoji: '🏠', lyric: 'ঘরটি মোদের অনেক সুন্দর', frequency: consonantNotes[3] },
  { letter: 'ঙ', word: 'ব্যাঙ', emoji: '🐸', lyric: 'ব্যাঙ ডাকে বর্ষাকালে', frequency: consonantNotes[4] },
  { letter: 'চ', word: 'চশমা', emoji: '👓', lyric: 'চশমা পরি চোখের আলোয়', frequency: consonantNotes[5] },
  { letter: 'ছ', word: 'ছাতা', emoji: '☂️', lyric: 'ছাতা মাথায় বৃষ্টি এলে', frequency: consonantNotes[6] },
  { letter: 'জ', word: 'জাহাজ', emoji: '🚢', lyric: 'জাহাজ ভাসে সাগর জলে', frequency: consonantNotes[7] },
  { letter: 'ঝ', word: 'ঝড়', emoji: '⛈️', lyric: 'ঝড় এলো ঐ মেঘের কোণে', frequency: consonantNotes[8] },
  { letter: 'ঞ', word: 'মিঞা', emoji: '👴', lyric: 'মিঞা ভাইয়ের দাড়ি দুলছে', frequency: consonantNotes[9] },
  { letter: 'ট', word: 'টিয়া', emoji: '🦜', lyric: 'টিয়া পাখির ঠোঁটটি লাল', frequency: consonantNotes[10] },
  { letter: 'ঠ', word: 'ঠাকুমা', emoji: '👵', lyric: 'ঠাকুমা ঐ গল্প শোনায়', frequency: consonantNotes[11] },
  { letter: 'ড', word: 'ডালিম', emoji: '🍎', lyric: 'ডালিম খেতে অনেক মিষ্টি', frequency: consonantNotes[12] },
  { letter: 'ঢ', word: 'ঢোলক', emoji: '🥁', lyric: 'ঢোলক বাজে তালে তালে', frequency: consonantNotes[13] },
  { letter: 'ণ', word: 'হরিণ', emoji: '🦌', lyric: 'হরিণ ছানা বনে ঘোরে', frequency: consonantNotes[14] },
  { letter: 'ত', word: 'তরমুজ', emoji: '🍉', lyric: 'তরমুজ ভরা রসালো ফল', frequency: consonantNotes[15] },
  { letter: 'থ', word: 'থালা', emoji: '🍽️', lyric: 'থালা ভরা খাবার খাই', frequency: consonantNotes[16] },
  { letter: 'দ', word: 'দই', emoji: '🥛', lyric: 'দই খেতে খুব ভালো লাগে', frequency: consonantNotes[17] },
  { letter: 'ধ', word: 'ধান', emoji: '🌾', lyric: 'ধান পেকেছে সোনালী মাঠে', frequency: consonantNotes[18] },
  { letter: 'ন', word: 'নদী', emoji: '🌊', lyric: 'নদী বয় মনের সুখে', frequency: consonantNotes[19] },
  { letter: 'প', word: 'পাখি', emoji: '🐦', lyric: 'পাখি উড়ে নীল আকাশে', frequency: consonantNotes[20] },
  { letter: 'ফ', word: 'ফুল', emoji: '🌸', lyric: 'ফুল ফোটে বাগানে বাগানে', frequency: consonantNotes[21] },
  { letter: 'ব', word: 'বই', emoji: '📚', lyric: 'বই পড়ি জ্ঞান বাড়ে', frequency: consonantNotes[22] },
  { letter: 'ভ', word: 'ভালুক', emoji: '🐻', lyric: 'ভালুক নাচে খোকার টানে', frequency: consonantNotes[23] },
  { letter: 'ম', word: 'ময়ূর', emoji: '🦚', lyric: 'ময়ূর নাচে পেখম মেলে', frequency: consonantNotes[24] },
  { letter: 'য', word: 'যাতা', emoji: '🎡', lyric: 'যাতাকল ঐ ঘোরে জোরে', frequency: consonantNotes[25] },
  { letter: 'র', word: 'রথ', emoji: '🎪', lyric: 'রথ চলে ঐ রাজার দেশে', frequency: consonantNotes[26] },
  { letter: 'ল', word: 'লাটিম', emoji: '🪀', lyric: 'লাটিম ঘোরে বনবনিয়ে', frequency: consonantNotes[27] },
  { letter: 'শ', word: 'শাপলা', emoji: '🪷', lyric: 'শাপলা ফোটে দিঘির জলে', frequency: consonantNotes[28] },
  { letter: 'ষ', word: 'ষাঁড়', emoji: '🐂', lyric: 'ষাঁড়টি চলে খেতের আল দিয়ে', frequency: consonantNotes[29] },
  { letter: 'স', word: 'সিংহ', emoji: '🦁', lyric: 'সিংহ মামা বনের রাজা', frequency: consonantNotes[30] },
  { letter: 'হ', word: 'হাঁস', emoji: '🦆', lyric: 'হাঁস ভাসে দিঘির জলে', frequency: consonantNotes[31] },
  { letter: 'ড়', word: 'পাহাড়', emoji: '⛰️', lyric: 'পাহাড় চূড়ায় বরফ জমে', frequency: consonantNotes[32] },
  { letter: 'ঢ়', word: 'আষাঢ়', emoji: '🌧️', lyric: 'আষাঢ় মাসে বৃষ্টি ঝরে', frequency: consonantNotes[33] },
  { letter: 'য়', word: 'ময়না', emoji: '🐦', lyric: 'ময়না পাখি মিষ্টি গায়', frequency: consonantNotes[34] },
  { letter: 'ৎ', word: 'মৎস্য', emoji: '🐟', lyric: 'মৎস্য ধরি নদীর জলে', frequency: consonantNotes[35] },
  { letter: 'ং', word: 'ফড়িং', emoji: '🦗', lyric: 'ফড়িং ওড়ে ঘাসের বনে', frequency: consonantNotes[36] },
  { letter: 'ঃ', word: 'দুঃখ', emoji: '😢', lyric: 'দুঃখ দিলে কষ্ট বাড়ে', frequency: consonantNotes[37] },
  { letter: 'ঁ', word: 'চাঁদ', emoji: '🌙', lyric: 'চাঁদ মামা ঐ আলো ছড়ায়', frequency: consonantNotes[38] }
];

// Aesthetic pastel and bright color combinations for kid-enjoyment
const cardColors = [
  'from-rose-500/10 to-pink-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20',
  'from-amber-500/10 to-yellow-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20',
  'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20',
  'from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20',
  'from-fuchsia-500/10 to-purple-500/10 border-fuchsia-500/20 text-fuchsia-400 hover:bg-fuchsia-500/20',
  'from-orange-500/10 to-red-500/10 border-orange-500/20 text-orange-400 hover:bg-orange-500/20',
  'from-indigo-500/10 to-violet-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20'
];

interface AlphabetSongSubTabProps {
  speak: (text: string) => Promise<void> | void;
}

export function AlphabetSongSubTab({ speak }: AlphabetSongSubTabProps) {
  const [activeSection, setActiveSection] = useState<'vowel' | 'consonant'>('vowel');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [instrument, setInstrument] = useState<'musicbox' | 'xylophone' | 'flute'>('musicbox');
  const [tempo, setTempo] = useState<number>(800); // ms per letter
  const [selectedLetter, setSelectedLetter] = useState<AlphabetItem | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Stop auto-player on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Set up Audio Context lazily on user gesture to avoid browser autoplay blocks
  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Create melodious child-friendly synth sound using Web Audio API
  const playChimeNode = (frequency: number) => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Configure instrument types
      if (instrument === 'musicbox') {
        // High, pure chime with quick attack and long sweet decay
        osc.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, ctx.currentTime);
        filter.Q.setValueAtTime(1, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      } else if (instrument === 'xylophone') {
        // Wood block resonant decay, slightly higher oscillator frequencies (harmonics)
        osc.type = 'sine';
        
        // Add subtle harmonic overlay
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(frequency * 2, ctx.currentTime);
        subGain.gain.setValueAtTime(0, ctx.currentTime);
        subGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
        subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start();
        subOsc.stop(ctx.currentTime + 0.3);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(frequency, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      } else {
        // Flute/Sine wave - smooth, ambient wind-like sound
        osc.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      }

      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Connect nodes
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) {
      console.error('Audio synthesizer error:', e);
    }
  };

  // Play beat click sound for background sequencer rhythm
  const playBeatSound = () => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (err) {}
  };

  const list = activeSection === 'vowel' ? vowels : consonants;

  // Handles playing an individual letter chime and speech
  const handleLetterClick = (item: AlphabetItem, idx: number) => {
    if (isPlaying) {
      stopSong();
    }
    setCurrentIndex(idx);
    setSelectedLetter(item);
    playChimeNode(item.frequency);
    speak(item.letter);
  };

  // Sequencer auto play logic
  const startSong = () => {
    getAudioContext(); // Warm up audio context
    setIsPlaying(true);
    
    // Choose start index
    let startIdx = currentIndex !== null && currentIndex < list.length - 1 ? currentIndex : 0;
    setCurrentIndex(startIdx);
    setSelectedLetter(list[startIdx]);

    // Initial beat trigger
    playBeatSound();
    playChimeNode(list[startIdx].frequency);
    speak(list[startIdx].letter);

    let nextIdx = startIdx;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      nextIdx = (nextIdx + 1) % list.length;
      setCurrentIndex(nextIdx);
      setSelectedLetter(list[nextIdx]);
      
      // Every beat, play standard rhythm tick
      playBeatSound();
      // Play melodic letter frequency
      playChimeNode(list[nextIdx].frequency);
      // Speak the letter
      speak(list[nextIdx].letter);
      
      // If completed full loop, stop
      if (nextIdx === list.length - 1) {
        setTimeout(() => {
          stopSong();
        }, tempo);
      }
    }, tempo);
  };

  const stopSong = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleReset = () => {
    stopSong();
    setCurrentIndex(null);
    setSelectedLetter(null);
  };

  const handleSectionSwitch = (section: 'vowel' | 'consonant') => {
    stopSong();
    setCurrentIndex(null);
    setSelectedLetter(null);
    setActiveSection(section);
    speak(section === 'vowel' ? "স্বরবর্ণ" : "ব্যঞ্জনবর্ণ");
  };

  return (
    <div id="alphabet-song-container" className="space-y-6 sm:space-y-8">
      {/* Decorative Floating Elements Header */}
      <div className="bg-gradient-to-r from-amber-400 via-pink-400 to-red-400 p-6 sm:p-8 rounded-3xl text-slate-900 text-center relative overflow-hidden shadow-xl border border-amber-300/30">
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="bg-white/20 p-3.5 rounded-full mb-3 shadow-inner"
          >
            <Music className="w-8 h-8 text-yellow-950" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 flex items-center gap-2">
            🎈 বর্ণমালার মজার গান 🎶
          </h1>
          <p className="text-xs sm:text-sm font-extrabold text-slate-900 max-w-lg mt-2 leading-relaxed">
            মজার সুরে গান গেয়ে এবং চমত্কার বাজনা বাজিয়ে সম্পূর্ণ স্বরবর্ণ ও ব্যঞ্জনবর্ণ শিখে নাও আনন্দের সাথে!
          </p>
        </div>
      </div>

      {/* Primary Section Switch Tab */}
      <div className="flex gap-4 p-2 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 max-w-md mx-auto">
        <button
          onClick={() => handleSectionSwitch('vowel')}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            activeSection === 'vowel'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-105'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Smile className="w-4 h-4" />
          <span>স্বরবর্ণ গান (১১টি)</span>
        </button>

        <button
          onClick={() => handleSectionSwitch('consonant')}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            activeSection === 'consonant'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>ব্যঞ্জনবর্ণ গান (৩৯টি)</span>
        </button>
      </div>

      {/* Smart Lyrics Karaoke Board & Sound Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Melodious Controls Panel */}
        <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 border border-slate-800 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-pink-400" />
              <span>মিউজিক প্লেয়ার সেটিংস</span>
            </h3>

            {/* Instrument Selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">বাজনা নির্বাচন (Instrument)</label>
              <div className="grid grid-cols-3 gap-2">
                {(['musicbox', 'xylophone', 'flute'] as const).map((inst) => (
                  <button
                    key={inst}
                    onClick={() => {
                      setInstrument(inst);
                      speak(inst === 'musicbox' ? "মিউজিক বক্স" : inst === 'xylophone' ? "জাইলোফোন" : "বাঁশি");
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-black transition-all border ${
                      instrument === inst
                        ? 'bg-pink-600/20 text-pink-400 border-pink-500/45'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    {inst === 'musicbox' && '🎵 বক্স'}
                    {inst === 'xylophone' && '🪵 কাঠের'}
                    {inst === 'flute' && '💨 বাঁশি'}
                  </button>
                ))}
              </div>
            </div>

            {/* Tempo Rhythms Selector */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <span>গানের গতি (Tempo)</span>
                <span className="text-pink-400">
                  {tempo === 1200 ? 'খুব ধীরে' : tempo === 800 ? 'স্বাভাবিক' : 'তাড়াতাড়ি'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1200, 800, 500].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTempo(t);
                      if (isPlaying) {
                        // Restart sequencer with new tempo
                        stopSong();
                        setTimeout(() => startSong(), 50);
                      }
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-black transition-all border ${
                      tempo === t
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    {t === 1200 && '🐢 ধীর'}
                    {t === 800 && '🐿️ সাধারণ'}
                    {t === 500 && '⚡ দ্রুত'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Player controls */}
          <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-800/60">
            <div className="flex gap-2">
              {isPlaying ? (
                <button
                  onClick={stopSong}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>থামাও (Pause)</span>
                </button>
              ) : (
                <button
                  onClick={startSong}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>গান বাজাও (Play Song)</span>
                </button>
              )}

              <button
                onClick={handleReset}
                className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 transition-all active:scale-95"
                title="শুরু থেকে করুন"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-[10px] text-slate-500 text-center font-bold">
              💡 টিপস: গান বাজানো হলে প্রতিটি বর্ণ ক্রমান্বয়ে একটি সুন্দর সুরের সাথে আলোকিত হবে!
            </p>
          </div>
        </div>

        {/* Dynamic Karaoke Lyrics Board */}
        <div className="lg:col-span-2 bg-gradient-to-br from-purple-950/20 to-indigo-950/20 backdrop-blur-md rounded-3xl p-6 border border-purple-500/10 flex flex-col items-center justify-center min-h-[220px] text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-2 right-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlaying ? 'bg-emerald-400' : 'bg-pink-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying ? 'bg-emerald-500' : 'bg-pink-500'}`}></span>
            </span>
          </div>

          <AnimatePresence mode="wait">
            {selectedLetter ? (
              <motion.div
                key={selectedLetter.letter}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="space-y-4 w-full"
              >
                {/* Big bouncing letter and emoji bubbles */}
                <div className="flex items-center justify-center gap-5">
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-20 h-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-4xl font-black text-white shadow-lg border border-white/20"
                  >
                    {selectedLetter.letter}
                  </motion.div>
                  
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="text-6xl bg-slate-950/40 p-3 rounded-full border border-slate-800"
                  >
                    {selectedLetter.emoji}
                  </motion.div>
                </div>

                {/* Word & Lyrics */}
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-amber-400 flex items-center justify-center gap-1.5">
                    <Star className="w-5 h-5 fill-current text-amber-400" />
                    <span>{selectedLetter.letter}-তে {selectedLetter.word}</span>
                  </h4>
                  
                  <p className="text-lg sm:text-2xl font-black text-white bg-slate-950/60 py-2.5 px-6 rounded-2xl border border-slate-800/80 inline-block max-w-full">
                    {selectedLetter.lyric}
                  </p>
                </div>

                {/* Speak Lyric Button */}
                <button
                  onClick={() => {
                    speak(selectedLetter.letter + " তে " + selectedLetter.word + "। " + selectedLetter.lyric);
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/20 text-purple-300 hover:text-white rounded-xl text-xs font-black transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>ছড়াটি পুরো আবৃত্তি শোনো</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <div className="text-5xl">🎶</div>
                <h4 className="text-lg font-black text-slate-300">বর্ণমালার ছড়া ও সুর</h4>
                <p className="text-xs text-slate-500 max-w-md">
                  যেকোনো বর্ণে ক্লিক করো সুর শোনার জন্য অথবা নিচে <span className="text-emerald-400 font-extrabold">"গান বাজাও"</span> ক্লিক করে সম্পূর্ণ বর্ণমালা একসাথে উপভোগ করো!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Dynamic Alphabet Interactive Grid */}
      <div className="bg-slate-900/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800/60">
          <h3 className="text-sm sm:text-base font-black text-slate-300 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>বর্ণমালা বোর্ড (স্পর্শ করে সুর বাজাও!)</span>
          </h3>
          <span className="text-xs text-slate-500 font-extrabold bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800">
            সর্বমোট {toBengaliNum(list.length)}টি বর্ণ
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {list.map((item, idx) => {
            const colorClass = cardColors[idx % cardColors.length];
            const isActive = currentIndex === idx;

            return (
              <motion.button
                key={item.letter}
                onClick={() => handleLetterClick(item, idx)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex flex-col items-center justify-between p-4 rounded-2xl border text-center transition-all min-h-[96px] bg-gradient-to-b ${
                  isActive
                    ? 'from-pink-500 to-rose-600 text-slate-950 border-white font-black scale-105 shadow-[0_0_20px_rgba(236,72,153,0.45)]'
                    : colorClass
                }`}
              >
                {/* Active Indicator Ring */}
                {isActive && (
                  <span className="absolute inset-0 rounded-2xl border-2 border-white animate-pulse pointer-events-none"></span>
                )}

                {/* Sequence Badge */}
                <span className={`text-[10px] font-extrabold absolute top-2.5 right-3 ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                  {toBengaliNum(idx + 1)}
                </span>

                {/* Big Beautiful Letter */}
                <span className="text-3xl font-black block mt-2.5">
                  {item.letter}
                </span>

                {/* Word Label */}
                <span className={`text-[10px] font-black ${isActive ? 'text-slate-950' : 'text-slate-400'} mt-1 block truncate w-full`}>
                  {item.word}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Musical Game Card: Matching Game / Singalong Instruction */}
      <div className="bg-gradient-to-r from-purple-950/20 via-pink-950/15 to-blue-950/20 border border-purple-500/20 rounded-3xl p-6 text-center space-y-3 shadow-lg">
        <span className="text-2xl">👩‍🏫</span>
        <h4 className="text-sm sm:text-base font-black text-pink-300">সোনামণিদের আনন্দের জন্য শিক্ষকের পরামর্শ</h4>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          শিশুরা বর্ণের সাথে মিল রেখে চমত্কার সব চিত্র এবং সুন্দর ছড়া শুনতে পারবে প্রতিটি বর্ণের স্পর্শে। সুরের তালে তালে নিজের মুখে বর্ণগুলো উচ্চারণ করতে সাহায্য করুন।
        </p>
      </div>

    </div>
  );
}
