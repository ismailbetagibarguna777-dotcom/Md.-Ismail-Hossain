import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  PenTool,
  Gamepad2,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Smile,
  Award,
  Sparkles,
  Palette
} from 'lucide-react';

const toBengaliNum = (num: number): string => {
  const digits: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return num.toString().split('').map(d => digits[d] || d).join('');
};

interface WordItem {
  word: string;
  letter: string;
  sentence: string;
  imageSvg: React.ReactNode;
}

interface AdditionalSentence {
  text: string;
}

interface LessonData {
  id: number;
  title: string;
  subtitle: string;
  vowels: string[];
  words: WordItem[];
  additionalSentences: AdditionalSentence[];
  instruction: string;
}

export function Lessons10to17SubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const [activeLesson, setActiveLesson] = useState<10 | 11 | 12 | 13 | 14 | 15 | 16 | 17>(10);
  const [lesson13Page, setLesson13Page] = useState<18 | 19>(18);
  const [lesson16Page, setLesson16Page] = useState<22 | 23>(22);
  const [canvasColor, setCanvasColor] = useState<string>('#ec4899');
  const [canvasSize, setCanvasSize] = useState<number>(14);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [showStrokeGuide, setShowStrokeGuide] = useState<boolean>(true);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);
  const [quizQuestionIdx, setQuizQuestionIdx] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Lesson 13 Page 19
  const [circledIndices, setCircledIndices] = useState<number[]>([]);
  const [slots, setSlots] = useState<({ letter: string; index: number } | null)[]>(Array(7).fill(null));
  const [sortingResult, setSortingResult] = useState<'correct' | 'incorrect' | null>(null);
  const [catMeowed, setCatMeowed] = useState<boolean>(false);

  // Lesson 16 Page 22 (Color game)
  const [selectedColorForPaint, setSelectedColorForPaint] = useState<string>('#a855f7');
  const [coloredLetters, setColoredLetters] = useState<Record<string, string>>({});

  // Lesson 16 Page 23
  const [circledVowelsL16, setCircledVowelsL16] = useState<Record<number, boolean>>({});
  const [slotsL16, setSlotsL16] = useState<({ letter: string; index: number } | null)[]>(Array(11).fill(null));
  const [sortingResultL16, setSortingResultL16] = useState<'correct' | 'incorrect' | null>(null);

  // Lesson 17 Poem states
  const [poemLineIdx, setPoemLineIdx] = useState<number>(-1);
  const [isPoemPlaying, setIsPoemPlaying] = useState<boolean>(false);
  const [frogJumped, setFrogJumped] = useState<boolean>(false);
  const [mushroomBroken1, setMushroomBroken1] = useState<boolean>(false);
  const [mushroomBroken2, setMushroomBroken2] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const playLocalSound = (type: 'pop' | 'sparkle' | 'success' | 'incorrect') => {
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
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.04);
        osc.frequency.setValueAtTime(1500, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else if (type === 'success') {
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
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
      } else if (type === 'incorrect') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {
      console.warn("Sound play failed", e);
    }
  };

  const lessonsData: Record<number, LessonData> = {
    10: {
      id: 10,
      title: "পাঠ ১০",
      subtitle: "বর্ণ শিখি : অ আ",
      vowels: ["অ", "আ"],
      instruction: "শুনি ও বলি, অ আ পড়া শিখি!",
      words: [
        {
          word: "অশোক",
          letter: "অ",
          sentence: "অশোক ফুল ফুটেছে ভাই।",
          imageSvg: (
            <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24">
              <path d="M10 80 Q50 60 110 50" stroke="#78350f" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M30 70 Q15 50 35 45 Q55 55 30 70 Z" fill="#15803d" />
              <path d="M60 62 Q50 40 70 35 Q90 50 60 62 Z" fill="#15803d" />
              <path d="M85 55 Q80 30 100 30 Q110 45 85 55 Z" fill="#16a34a" />
              <circle cx="45" cy="55" r="10" fill="#ea580c" opacity="0.9" />
              <circle cx="53" cy="48" r="8" fill="#dc2626" opacity="0.95" />
              <circle cx="38" cy="48" r="9" fill="#f97316" opacity="0.9" />
              <circle cx="46" cy="42" r="7" fill="#e11d48" opacity="0.9" />
              <circle cx="62" cy="45" r="9" fill="#ea580c" opacity="0.95" />
              <circle cx="45" cy="50" r="3" fill="#facc15" />
              <circle cx="53" cy="45" r="2.5" fill="#facc15" />
              <circle cx="39" cy="46" r="2.5" fill="#facc15" />
            </svg>
          )
        },
        {
          word: "আম",
          letter: "আ",
          sentence: "আম খেয়েছি। আতা চাই।",
          imageSvg: (
            <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24">
              <path d="M60 10 C60 25 50 30 50 40" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M50 30 Q20 15 35 5 Q60 10 50 30" fill="#15803d" />
              <path d="M50 40 C65 40 85 55 85 80 C85 105 65 115 50 115 C30 115 25 95 30 75 C35 55 42 40 50 40 Z" fill="url(#mangoGrad)" />
              <path d="M52 42 C62 42 78 52 78 72 C78 85 70 95 55 98 C50 90 45 75 52 42 Z" fill="#ea580c" opacity="0.3" />
              <defs>
                <linearGradient id="mangoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#facc15" />
                  <stop offset="60%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>
              </defs>
            </svg>
          )
        }
      ],
      additionalSentences: [
        { text: "অশোক একটি ফুলের নাম।" },
        { text: "আম একটি ফলের নাম।" }
      ]
    },
    11: {
      id: 11,
      title: "পাঠ ১১",
      subtitle: "বর্ণ শিখি : ই ঈ",
      vowels: ["ই", "ঈ"],
      instruction: "শুনি ও বলি, ই ঈ পড়া শিখি!",
      words: [
        {
          word: "ইট",
          letter: "ই",
          sentence: "ইট রয়েছে সবুজ ঘাসে।",
          imageSvg: (
            <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24">
              <path d="M10 100 Q60 85 110 100" stroke="#16a34a" strokeWidth="5" fill="none" />
              <path d="M15 98 L20 80 L28 97" stroke="#15803d" strokeWidth="3" fill="none" />
              <path d="M45 95 L50 72 L58 94" stroke="#15803d" strokeWidth="3" fill="none" />
              <polygon points="25,80 75,80 90,65 40,65" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
              <polygon points="25,80 25,95 75,95 75,80" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
              <polygon points="75,80 75,95 90,80 90,65" fill="#c2410c" stroke="#9a3412" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          word: "ঈগল",
          letter: "ঈ",
          sentence: "ঈগল ওড়ে ওই আকাশে।",
          imageSvg: (
            <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24">
              <ellipse cx="30" cy="30" rx="15" ry="8" fill="#38bdf8" opacity="0.2" />
              <ellipse cx="90" cy="40" rx="20" ry="10" fill="#38bdf8" opacity="0.2" />
              <path d="M20 50 Q45 25 60 55 Q75 25 100 50 Q75 60 60 65 Q45 60 20 50 Z" fill="#78350f" />
              <path d="M57 53 Q60 45 63 53 L68 55 Q63 58 60 55" fill="#eab308" />
              <circle cx="58" cy="51" r="1.5" fill="#ffffff" />
            </svg>
          )
        }
      ],
      additionalSentences: [
        { text: "ইট দিয়ে ঘর বানাই।" },
        { text: "ঈগল পাখি অনেক বড়।" }
      ]
    },
    12: {
      id: 12,
      title: "পাঠ ১২",
      subtitle: "বর্ণ শিখি : উ ঊ",
      vowels: ["উ", "ঊ"],
      instruction: "শুনি ও বলি, উ ঊ পড়া শিখি!",
      words: [
        {
          word: "উট",
          letter: "উ",
          sentence: "উট চলেছে দলে দলে।",
          imageSvg: (
            <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24">
              <path d="M25 110 Q70 95 115 110" fill="#fef08a" />
              <rect x="45" y="75" width="4" height="25" fill="#ca8a04" rx="1" />
              <rect x="75" y="75" width="4" height="25" fill="#ca8a04" rx="1" />
              <ellipse cx="65" cy="65" rx="20" ry="12" fill="#ca8a04" />
              <circle cx="65" cy="50" r="10" fill="#ca8a04" />
              <path d="M48 65 Q35 55 38 40 L34 36 L30 40 Q38 60 48 65 Z" fill="#ca8a04" />
            </svg>
          )
        },
        {
          word: "ঊর্মি",
          letter: "ঊ",
          sentence: "ঊর্মি দেখি সাগর জলে।",
          imageSvg: (
            <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24">
              <path d="M10 95 Q40 60 70 85 T110 65 L110 115 L10 115 Z" fill="#0284c7" />
              <path d="M10 100 Q45 75 75 95 T110 80 L110 115 L10 115 Z" fill="#0369a1" />
              <circle cx="70" cy="80" r="4" fill="#e0f2fe" />
              <circle cx="76" cy="83" r="5" fill="#ffffff" />
            </svg>
          )
        }
      ],
      additionalSentences: [
        { text: "উট একটা পশুর নাম।" },
        { text: "ঊর্মি মানে ঢেউ।" }
      ]
    },
    13: {
      id: 13,
      title: "পাঠ ১৩",
      subtitle: "বর্ণ শিখি : ঋ",
      vowels: ["ঋ"],
      instruction: "শুনি ও বলি, ঋ পড়া শিখি!",
      words: [
        {
          word: "ঋতু",
          letter: "ঋ",
          sentence: "ঋতু আসে ঋতু যায়।",
          imageSvg: (
            <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24">
              <circle cx="30" cy="30" r="12" fill="#f97316" />
              <circle cx="30" cy="30" r="9" fill="#facc15" />
              <circle cx="60" cy="95" r="5" fill="#f43f5e" />
              <path d="M60 100 L60 118" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )
        }
      ],
      additionalSentences: [
        { text: "ফুল ফোটে পাখি গায়।" },
        { text: "বাংলাদেশে ছয়টি ঋতু।" }
      ]
    },
    14: {
      id: 14,
      title: "পাঠ ১৪",
      subtitle: "বর্ণ শিখি : এ ঐ",
      vowels: ["এ", "ঐ"],
      instruction: "শুনি ও বলি, এ ঐ পড়া শিখি!",
      words: [
        {
          word: "একতারা",
          letter: "এ",
          sentence: "একতারা বাজে ওই।",
          imageSvg: (
            <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24">
              <path d="M60 10 L60 95" stroke="#b45309" strokeWidth="4" />
              <path d="M48 80 Q60 115 72 80 Z" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
              <line x1="53" y1="18" x2="67" y2="18" stroke="#78350f" strokeWidth="3" />
              <path d="M59 18 Q50 45 59 80" stroke="#cbd5e1" strokeWidth="1.5" />
              <path d="M42 75 Q60 62 78 75" stroke="#fbbf24" strokeWidth="2" fill="none" />
              <ellipse cx="60" cy="98" rx="4" ry="2" fill="#78350f" />
              <path d="M35 45 Q20 40 35 35" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M85 45 Q100 40 85 35" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.6" />
            </svg>
          )
        },
        {
          word: "ঐরাবত",
          letter: "ঐ",
          sentence: "ঐরাবত যায় কই?",
          imageSvg: (
            <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24">
              <ellipse cx="68" cy="72" rx="28" ry="22" fill="#475569" />
              <circle cx="38" cy="56" r="16" fill="#475569" />
              <rect x="46" y="86" width="10" height="22" fill="#334155" rx="2" />
              <rect x="76" y="86" width="10" height="22" fill="#334155" rx="2" />
              <path d="M32 68 Q18 72 10 56 Q6 46 12 46 Q14 53 22 60" fill="none" stroke="#475569" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M50 52 Q68 44 86 52 L80 68 Q68 74 56 68 Z" fill="#dc2626" />
              <circle cx="34" cy="52" r="2" fill="#ffffff" />
              <circle cx="34" cy="52" r="0.8" fill="#000000" />
            </svg>
          )
        }
      ],
      additionalSentences: [
        { text: "বাউলেরা একতারা বাজায়।" },
        { text: "ঐরাবত মানে হাতি।" }
      ]
    },
    15: {
      id: 15,
      title: "পাঠ ১৫",
      subtitle: "বর্ণ শিখি : ও ঔ",
      vowels: ["ও", "ঔ"],
      instruction: "শুনি ও বলি, ও ঔ পড়া শিখি!",
      words: [
        {
          word: "ওলকপি",
          letter: "ও",
          sentence: "ওলকপি খাও।",
          imageSvg: (
            <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24">
              <circle cx="60" cy="75" r="22" fill="#84cc16" />
              <path d="M60 53 Q50 30 45 15" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M60 53 Q65 32 75 18" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M50 65 Q30 50 20 40" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M70 65 Q90 52 100 42" stroke="#15803d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M45 15 C40 10 30 18 40 22 Z" fill="#22c55e" />
              <path d="M75 18 C80 12 90 20 80 25 Z" fill="#15803d" />
            </svg>
          )
        },
        {
          word: "ঔষধ",
          letter: "ঔ",
          sentence: "ঔষধ দাও।",
          imageSvg: (
            <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24">
              <rect x="35" y="45" width="26" height="48" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" rx="4" />
              <rect x="42" y="35" width="12" height="10" fill="#3b82f6" rx="1" />
              <rect x="37" y="58" width="22" height="20" fill="#dc2626" rx="2" />
              <circle cx="48" cy="68" r="4" fill="#ffffff" />
              <path d="M37 72 L59 72 L59 91 Q59 92 57 92 L39 92 Q37 92 37 91 Z" fill="#ef4444" opacity="0.4" />
              <rect x="68" y="55" width="22" height="40" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" rx="3" />
              <circle cx="74" cy="65" r="3" fill="#3b82f6" />
              <circle cx="84" cy="65" r="3" fill="#10b981" />
            </svg>
          )
        }
      ],
      additionalSentences: [
        { text: "ওলকপি খেতে মজা।" },
        { text: "অসুখ হলে ঔষধ খেতে হয়।" }
      ]
    },
    16: {
      id: 16,
      title: "পাঠ ১৬",
      subtitle: "স্বরবর্ণ",
      vowels: [],
      instruction: "পড়ি ও লিখি, সব স্বরবর্ণ অনুশীলন করি।",
      words: [],
      additionalSentences: []
    },
    17: {
      id: 17,
      title: "পাঠ ১৭",
      subtitle: "ইতল বিতল ছড়া",
      vowels: [],
      instruction: "এসো ছড়া শুনি ও মজা করি!",
      words: [],
      additionalSentences: []
    }
  };

  const activeData = lessonsData[activeLesson];
  const [activeLetter, setActiveLetter] = useState<string>('অ');

  useEffect(() => {
    if (activeLesson === 16) {
      setActiveLetter('');
    } else if (activeLesson === 17) {
      setActiveLetter('');
    } else if (activeData && activeData.vowels && activeData.vowels.length > 0) {
      setActiveLetter(activeData.vowels[0]);
    }
    clearCanvas();
    setCircledIndices([]);
    setSlots(Array(7).fill(null));
    setSortingResult(null);
    setCatMeowed(false);

    setColoredLetters({});
    setCircledVowelsL16({});
    setSlotsL16(Array(11).fill(null));
    setSortingResultL16(null);

    setPoemLineIdx(-1);
    setIsPoemPlaying(false);

    // Track statistics locally
    const prevListens = parseInt(localStorage.getItem('bangla_mission_listen_count') || '0', 10);
    localStorage.setItem('bangla_mission_listen_count', (prevListens + 1).toString());

    if (activeLesson === 13 && lesson13Page === 19) {
      speak("পাঠ ১৩, পৃষ্ঠা ১৯। বর্ণ খুঁজে বের করি ও গোল দাগ দিই, এবং সাজিয়ে লিখি!");
    } else if (activeLesson === 16) {
      if (lesson16Page === 22) {
        speak("পাঠ ১৬, পৃষ্ঠা ২২। স্বরবর্ণ পড়ি আর রং করি!");
      } else {
        speak("পাঠ ১৬, পৃষ্ঠা ২৩। শব্দগুলো শুনি ও স্বরবর্ণ খুঁজে বের করে গোল দাগ দিই এবং সাজিয়ে লিখি!");
      }
    } else if (activeLesson === 17) {
      speak("পাঠ ১৭। ইতল বিতল ছড়া, সুফিয়া কামাল। চলো গাছের নিচে ব্যাঙের ছাতা দেখি আর ছড়া পড়ি!");
    } else if (activeData) {
      speak(`${activeData.title}! ${activeData.subtitle}! ${activeData.instruction}`);
    }
  }, [activeLesson, lesson13Page, lesson16Page]);

  const handleLetterTabSwitch = (lettr: string) => {
    playLocalSound('pop');
    setActiveLetter(lettr);
    clearCanvas();
    speak(lettr);
  };

  useEffect(() => {
    if (canvasRef.current && activeLetter) {
      const canvas = canvasRef.current;
      canvas.width = 320;
      canvas.height = 320;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = canvasColor;
        ctx.lineWidth = canvasSize;
        contextRef.current = ctx;
      }
    }
  }, [canvasColor, canvasSize, activeLetter]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    nativeEvent.preventDefault();
    let clientX, clientY;
    if ('touches' in nativeEvent) {
      clientX = nativeEvent.touches[0].clientX;
      clientY = nativeEvent.touches[0].clientY;
    } else {
      clientX = nativeEvent.clientX;
      clientY = nativeEvent.clientY;
    }

    if (!canvasRef.current || !contextRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;
    nativeEvent.preventDefault();
    let clientX, clientY;
    if ('touches' in nativeEvent) {
      clientX = nativeEvent.touches[0].clientX;
      clientY = nativeEvent.touches[0].clientY;
    } else {
      clientX = nativeEvent.clientX;
      clientY = nativeEvent.clientY;
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    contextRef.current?.closePath();
    setIsDrawing(false);
    playLocalSound('sparkle');
    const prevDraws = parseInt(localStorage.getItem('bangla_mission_draw_count') || '0', 10);
    localStorage.setItem('bangla_mission_draw_count', (prevDraws + 1).toString());
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !contextRef.current) return;
    contextRef.current.clearRect(0, 0, 320, 320);
    playLocalSound('pop');
  };

  const QUIZ_QUESTIONS = [
    { text: "অশোক ফুল কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "অ", options: ["অ", "আ", "ই", "ঋ"], illustration: "🌸" },
    { text: "আম মিষ্টি ফল! আম কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "আ", options: ["ই", "উ", "আ", "ঈ"], illustration: "🥭" },
    { text: "ইট দিয়ে বাড়ি বানাই! ইট কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "ই", options: ["ঈ", "ই", "উ", "ঋ"], illustration: "🧱" },
    { text: "ঈগল ওড়ে নীল আকাশে! ঈগল কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "ঈ", options: ["ই", "ঊ", "ঈ", "অ"], illustration: "🦅" },
    { text: "উট মরুভূমিতে হাঁটে! উট কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "উ", options: ["উ", "ঊ", "ঋ", "আ"], illustration: "🐫" },
    { text: "ঊর্মি মানে সাগরের ঢেউ! ঊর্মি কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "ঊ", options: ["উ", "ঊ", "ই", "অ"], illustration: "🌊" },
    { text: "আমাদের দেশে ছয়টি ঋতু! ঋতু কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "ঋ", options: ["ঋ", "উ", "আ", "ঈ"], illustration: "🌿" },
    { text: "একতারা বাজে ওই! একতারা কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "এ", options: ["এ", "ঐ", "ও", "ঋ"], illustration: "🪕" },
    { text: "ঐরাবত মানে হাতি! ঐরাবত কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "ঐ", options: ["এ", "ঐ", "ও", "ঔ"], illustration: "🐘" },
    { text: "ওলকপি খাও! ওলকপি কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "ও", options: ["ও", "ঔ", "অ", "উ"], illustration: "🥦" },
    { text: "অসুখ হলে ঔষধ খেতে হয়! ঔষধ কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "ঔ", options: ["ও", "ঔ", "উ", "ঋ"], illustration: "🧪" }
  ];

  const handleQuizAnswer = (selected: string) => {
    if (quizAnswered) return;
    setQuizAnswered(true);
    const q = QUIZ_QUESTIONS[quizQuestionIdx];
    if (selected === q.correctAnswer) {
      setQuizCorrect(true);
      setQuizScore(prev => prev + 1);
      playLocalSound('success');
      speak("দারুণ হয়েছে! সঠিক উত্তর!");
      const prevQuiz = parseInt(localStorage.getItem('bangla_mission_quiz_count') || '0', 10);
      localStorage.setItem('bangla_mission_quiz_count', (prevQuiz + 1).toString());
    } else {
      setQuizCorrect(false);
      playLocalSound('incorrect');
      speak(`উফ্! ভুল উত্তর সোনা। সঠিক উত্তরটি হলো ${q.correctAnswer}।`);
    }
  };

  const nextQuizQuestion = () => {
    playLocalSound('pop');
    setQuizAnswered(false);
    setQuizCorrect(null);
    if (quizQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setQuizQuestionIdx(prev => prev + 1);
      speak(QUIZ_QUESTIONS[quizQuestionIdx + 1].text);
    } else {
      setShowCelebration(true);
      speak("অভিনন্দন সোনা বন্ধু! তুমি কুইজের সবকটি চমৎকার উত্তর সম্পন্ন করেছ!");
    }
  };

  const resetQuiz = () => {
    playLocalSound('sparkle');
    setQuizQuestionIdx(0);
    setQuizScore(0);
    setQuizAnswered(false);
    setQuizCorrect(null);
    setShowCelebration(false);
    speak("কুইজ নতুন করে শুরু হলো!");
  };

  const resetSorting = () => {
    playLocalSound('sparkle');
    setSlots(Array(7).fill(null));
    setSortingResult(null);
  };

  const resetSortingL16 = () => {
    playLocalSound('sparkle');
    setSlotsL16(Array(11).fill(null));
    setSortingResultL16(null);
  };

  const getLetterDashedPath = (letter: string) => {
    switch (letter) {
      case 'অ':
        return "M 160,70 C 90,70 80,200 160,250 C 240,200 240,140 160,140 L 260,140 L 260,280";
      case 'আ':
        return "M 130,70 C 70,70 60,200 130,250 C 200,200 200,140 130,140 L 220,140 L 220,280 M 260,70 L 260,280";
      case 'ই':
        return "M 100,80 Q 160,60 220,80 Q 160,110 160,160 Q 110,210 180,240 Q 240,160 220,120";
      case 'ঈ':
        return "M 100,80 Q 160,60 220,80 Q 160,110 160,160 Q 100,210 160,240 Q 230,160 220,100 M 170,100 Q 190,50 140,40";
      case 'উ':
        return "M 100,80 Q 160,65 220,80 Q 160,110 140,180 Q 110,230 180,240";
      case 'ঊ':
        return "M 100,80 Q 160,65 220,80 Q 160,110 140,180 Q 110,230 180,240 M 160,110 Q 180,50 130,40";
      case 'ঋ':
        return "M 90,140 L 140,140 L 115,190 L 165,190 L 140,240 L 190,240 M 190,120 L 190,260";
      case 'এ':
        return "M 130,120 Q 90,140 130,200 Q 180,240 180,140 M 130,200 L 180,260";
      case 'ঐ':
        return "M 130,120 Q 90,140 130,200 Q 180,240 180,140 M 130,200 L 180,260 M 150,110 Q 180,50 140,40";
      case 'ও':
        return "M 130,120 Q 90,160 140,240 Q 180,260 180,200 Q 180,140 130,140";
      case 'ঔ':
        return "M 130,120 Q 90,160 140,240 Q 180,260 180,200 Q 180,140 130,140 M 150,110 Q 180,50 140,40";
      default:
        return "";
    }
  };

  // Lesson 16 paint configuration
  const COLOR_LETTERS_L16 = [
    { char: 'আ', targetColor: '#a855f7', name: 'বেগুনি' },
    { char: 'ঈ', targetColor: '#3b82f6', name: 'নীল' },
    { char: 'ঋ', targetColor: '#06b6d4', name: 'আকাশি' },
    { char: 'উ', targetColor: '#10b981', name: 'সবুজ' },
    { char: 'ঐ', targetColor: '#eab308', name: 'হলুদ' },
    { char: 'ঔ', targetColor: '#f97316', name: 'কমলা' },
    { char: 'ঊ', targetColor: '#ef4444', name: 'লাল' }
  ];

  // Lesson 16 circle words
  const WORDS_CIRCLE_L16 = [
    { word: "অরুণ", target: "অ", parts: ["অ", "রু", "ণ"] },
    { word: "ঐরাবত", target: "ঐ", parts: ["ঐ", "রা", "ব", "ত"] },
    { word: "ঋতু", target: "ঋ", parts: ["ঋ", "তু"] },
    { word: "উট", target: "উ", parts: ["উ", "ট"] },
    { word: "ঔষধ", target: "ঔ", parts: ["ঔ", "ষ", "ধ"] }
  ];

  // Lesson 17 Poem recitation
  const POEM_LINES_L17 = [
    { text: "ইতল বিতল গাছের পাতা", speak: "ইতল বিতল গাছের পাতা" },
    { text: "গাছের তলায় ব্যাঙের ছাতা", speak: "গাছের তলায় ব্যাঙের ছাতা" },
    { text: "বৃষ্টি পড়ে ভাঙে ছাতা", speak: "বৃষ্টি পড়ে ভাঙে ছাতা" },
    { text: "ডোবায় ডোবে ব্যাঙের মাথা।", speak: "ডোবায় ডোবে ব্যাঙের মাথা।" },
    { text: "— সুফিয়া কামাল", speak: "লিখেছেন সুফিয়া কামাল" }
  ];

  const handlePoemRecite = async () => {
    if (isPoemPlaying) {
      setIsPoemPlaying(false);
      setPoemLineIdx(-1);
      return;
    }
    setIsPoemPlaying(true);
    playLocalSound('sparkle');
    for (let i = 0; i < POEM_LINES_L17.length; i++) {
      if (!isPoemPlaying) break;
      setPoemLineIdx(i);
      await speak(POEM_LINES_L17[i].speak);
      await new Promise(r => setTimeout(r, 600));
    }
    setIsPoemPlaying(false);
    setPoemLineIdx(-1);
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-4 sm:p-8 shadow-xl space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-10 w-64 h-64 bg-teal-500/5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-pink-500/5 blur-3xl rounded-full pointer-events-none"></div>

      {/* Lesson Chapter Title Block */}
      <div className="text-center space-y-2">
        <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded-full tracking-widest inline-block">
          📖 স্বরবর্ণ পাঠ ও মজার ছড়া (NCTB Primary Bangla)
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white flex items-center justify-center gap-2">
          {activeLesson === 16 ? "🍎 পাঠ ১৬ : স্বরবর্ণ" : activeLesson === 17 ? "☔ পাঠ ১৭ : ইতল বিতল ছড়া" : `🍎 বর্ণ শিখি : পাঠ ${toBengaliNum(activeLesson)}`}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-semibold">
          {activeLesson === 16
            ? "সবকটি স্বরবর্ণ পড়ি ও চমৎকার রঙ করি, বর্ণ খুঁজে বের করি ও সাজিয়ে লিখি!"
            : activeLesson === 17
              ? "মজার ছড়া শুনি, ঝুমঝুম বৃষ্টি দেখি, পাতা ও ব্যাঙের সাথে চমৎকার খেলা খেলি!"
              : "ছবি দেখে বর্ণ শিখি ও হাত ঘোরাই, এবং মজার খেলা খেলে পুরস্কার জিতি!"}
        </p>
      </div>

      {/* Primary Lessons Navigator Row */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 bg-slate-950/40 p-2 rounded-2xl border border-slate-800/40 max-w-3xl mx-auto">
        {([10, 11, 12, 13, 14, 15, 16, 17] as const).map((num) => (
          <button
            key={num}
            onClick={() => {
              playLocalSound('pop');
              setActiveLesson(num);
              if (num !== 13) setLesson13Page(18);
              if (num !== 16) setLesson16Page(22);
            }}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
              activeLesson === num
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-102'
                : 'bg-slate-900/50 text-slate-400 hover:text-white border border-slate-800/40'
            }`}
          >
            পাঠ {toBengaliNum(num)}
            <span className="text-[10px] block opacity-85 font-bold">
              {num === 10 ? "অ আ" : num === 11 ? "ই ঈ" : num === 12 ? "উ ঊ" : num === 13 ? "ঋ" : num === 14 ? "এ ঐ" : num === 15 ? "ও ঔ" : num === 16 ? "স্বরবর্ণ" : "ছড়া"}
            </span>
          </button>
        ))}
      </div>

      {/* Sub page toggle layout for Lesson 13 */}
      {activeLesson === 13 && (
        <div className="flex justify-center gap-3 bg-slate-950/40 p-1.5 rounded-2xl border border-slate-800/40 max-w-md mx-auto">
          <button
            onClick={() => { playLocalSound('pop'); setLesson13Page(18); }}
            className={`flex-1 px-4 py-1.5 rounded-xl text-xs font-black transition-all ${lesson13Page === 18 ? 'bg-pink-600 text-white shadow-md' : 'text-slate-400'}`}
          >
            ঋ শিখি (পৃষ্ঠা ১৮)
          </button>
          <button
            onClick={() => { playLocalSound('pop'); setLesson13Page(19); }}
            className={`flex-1 px-4 py-1.5 rounded-xl text-xs font-black transition-all ${lesson13Page === 19 ? 'bg-pink-600 text-white shadow-md' : 'text-slate-400'}`}
          >
            অনুশীলন ও সাজিয়ে লিখি (পৃষ্ঠা ১৯)
          </button>
        </div>
      )}

      {/* Sub page toggle layout for Lesson 16 */}
      {activeLesson === 16 && (
        <div className="flex justify-center gap-3 bg-slate-950/40 p-1.5 rounded-2xl border border-slate-800/40 max-w-md mx-auto">
          <button
            onClick={() => { playLocalSound('pop'); setLesson16Page(22); }}
            className={`flex-1 px-4 py-1.5 rounded-xl text-xs font-black transition-all ${lesson16Page === 22 ? 'bg-pink-600 text-white shadow-md' : 'text-slate-400'}`}
          >
            পড়ি ও রং করি (পৃষ্ঠা ২২)
          </button>
          <button
            onClick={() => { playLocalSound('pop'); setLesson16Page(23); }}
            className={`flex-1 px-4 py-1.5 rounded-xl text-xs font-black transition-all ${lesson16Page === 23 ? 'bg-pink-600 text-white shadow-md' : 'text-slate-400'}`}
          >
            অনুশীলন ও সাজিয়ে লিখি (পৃষ্ঠা ২৩)
          </button>
        </div>
      )}

      {/* MAIN LESSONS GRID AND CUSTOM VIEWS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeLesson}-${lesson13Page}-${lesson16Page}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* LESSON 13 PAGE 19 (CIRCLE VOWELS & SEQUENCE SORT GAME) */}
          {activeLesson === 13 && lesson13Page === 19 ? (
            <div className="space-y-8">
              {/* Step 1: Circle */}
              <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-3xl space-y-4">
                <h3 className="text-sm sm:text-base font-black text-amber-400 flex items-center gap-2">
                  <span className="bg-amber-950 px-2 py-0.5 rounded text-xs">ধাপ ১</span>
                  <span>বর্ণ খুঁজে গোল দাগ দিই (Find & Circle Vowels)</span>
                </h3>
                <div className="flex flex-wrap justify-center gap-3 py-2">
                  {["ই", "ঊ", "অ", "ঈ", "আ", "উ", "ঋ"].map((letter, index) => {
                    const isCircled = circledIndices.includes(index);
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          playLocalSound('pop');
                          if (isCircled) {
                            setCircledIndices(prev => prev.filter(i => i !== index));
                          } else {
                            setCircledIndices(prev => [...prev, index]);
                            speak(letter);
                          }
                        }}
                        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl font-black border transition-all ${
                          isCircled ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        {letter}
                        {isCircled && (
                          <svg className="absolute inset-0 w-full h-full pointer-events-none text-rose-500" viewBox="0 0 100 100">
                            <ellipse cx="50" cy="50" rx="42" ry="36" fill="none" stroke="currentColor" strokeWidth="4" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Sort */}
              <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-3xl space-y-4">
                <h3 className="text-sm sm:text-base font-black text-teal-400 flex items-center gap-2">
                  <span className="bg-teal-950 px-2 py-0.5 rounded text-xs">ধাপ ২</span>
                  <span>সাজিয়ে লিখি (Arrange in Alphabetical Order)</span>
                </h3>
                <div className="flex flex-wrap justify-center gap-3.5 py-2">
                  {["ই", "ঊ", "অ", "ঈ", "আ", "উ", "ঋ"].map((letter, index) => {
                    const isPlaced = slots.some(s => s?.index === index);
                    return (
                      <button
                        key={index}
                        disabled={isPlaced && sortingResult === 'correct'}
                        onClick={() => {
                          const sIdx = slots.findIndex(s => s?.index === index);
                          if (sIdx !== -1) {
                            const newSlots = [...slots];
                            newSlots[sIdx] = null;
                            setSlots(newSlots);
                            setSortingResult(null);
                          } else {
                            const emptyIdx = slots.indexOf(null);
                            if (emptyIdx !== -1) {
                              playLocalSound('pop');
                              speak(letter);
                              const newSlots = [...slots];
                              newSlots[emptyIdx] = { letter, index };
                              setSlots(newSlots);
                              setSortingResult(null);
                            }
                          }
                        }}
                        className={`w-11 h-11 rounded-xl text-lg font-black flex items-center justify-center transition-all ${
                          isPlaced ? 'bg-slate-950 text-slate-700 border border-dashed border-slate-800' : 'bg-slate-900 text-slate-200 border border-slate-800'
                        }`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>

                {/* Slots */}
                <div className="grid grid-cols-7 gap-2 max-w-xl mx-auto pt-3">
                  {slots.map((slot, idx) => (
                    <div key={idx} className="text-center space-y-1">
                      <div
                        onClick={() => {
                          if (slot && sortingResult !== 'correct') {
                            const newSlots = [...slots];
                            newSlots[idx] = null;
                            setSlots(newSlots);
                            setSortingResult(null);
                          }
                        }}
                        className={`aspect-square rounded-xl border-2 flex items-center justify-center text-lg font-black transition-all cursor-pointer ${
                          slot
                            ? sortingResult === 'correct'
                              ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400'
                              : 'bg-slate-900 border-slate-700 text-white'
                            : 'border-dashed border-slate-800 bg-slate-950/60'
                        }`}
                      >
                        {slot ? slot.letter : ''}
                      </div>
                      <span className="text-[10px] text-slate-500 font-extrabold">{toBengaliNum(idx + 1)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-2 pt-2">
                  <button onClick={resetSorting} className="px-3.5 py-1.5 bg-slate-900 text-slate-400 hover:text-white border border-slate-800 rounded-xl text-xs font-bold transition-all">
                    মুছুন (Reset)
                  </button>
                  <button
                    disabled={slots.includes(null)}
                    onClick={() => {
                      const answer = slots.map(s => s ? s.letter : '');
                      const correct = ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ'];
                      const isCorrect = answer.every((val, i) => val === correct[i]);
                      if (isCorrect) {
                        playLocalSound('success');
                        setSortingResult('correct');
                        speak("সাবাশ! সবকটি বর্ণ চমৎকারভাবে সাজিয়ে লিখেছ!");
                      } else {
                        playLocalSound('incorrect');
                        setSortingResult('incorrect');
                        speak("ইস্! ভুল হয়েছে বন্ধু। আবার চেষ্টা করো!");
                      }
                    }}
                    className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all ${slots.includes(null) ? 'bg-slate-900 text-slate-600' : 'bg-teal-500 text-slate-950 hover:scale-102'}`}
                  >
                    যাচাই করো (Verify)
                  </button>
                </div>
              </div>
            </div>
          ) : activeLesson === 16 ? (
            /* LESSON 16 VOWEL REVIEW BOARD */
            <div className="space-y-6">
              {lesson16Page === 22 ? (
                /* PAGE 22: READ & FILL COLOR BOARD */
                <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-3xl space-y-6">
                  {/* Part 1: Vowel Grid matching textbook */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-amber-400 flex items-center gap-1">
                      <span>🎤 স্বরবর্ণ পড়ি ও বলি:</span>
                    </h3>
                    <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
                      {['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'].map((char) => (
                        <button
                          key={char}
                          onClick={() => { playLocalSound('pop'); speak(char); }}
                          className="h-12 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-2xl text-xl font-black text-slate-200 transition-all active:scale-95"
                        >
                          {char}
                        </button>
                      ))}
                      <div className="h-12 bg-slate-950/20 border border-dashed border-slate-900/60 rounded-2xl"></div>
                    </div>
                  </div>

                  {/* Part 2: Paint letters game matching page 22 */}
                  <div className="pt-4 border-t border-slate-900 space-y-4">
                    <div className="text-center">
                      <h4 className="text-sm font-black text-indigo-400">🎨 পড়ি আর রং করি (Coloring Match Challenge)</h4>
                      <p className="text-[10px] text-slate-400 font-bold max-w-sm mx-auto mt-0.5">
                        নিচ থেকে রং নির্বাচন করে উপরের ডটেড বর্ণগুলোতে ক্লিক করো। বইয়ের সঠিক রঙের সাথে মিলিয়ে চমৎকার করে সাজাও!
                      </p>
                    </div>

                    {/* Color picker */}
                    <div className="flex justify-center gap-2.5 py-1">
                      {COLOR_LETTERS_L16.map((item) => (
                        <button
                          key={item.char}
                          onClick={() => { playLocalSound('pop'); setSelectedColorForPaint(item.targetColor); }}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColorForPaint === item.targetColor ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-85'}`}
                          style={{ backgroundColor: item.targetColor }}
                          title={item.name}
                        />
                      ))}
                    </div>

                    {/* Paint letters boxes */}
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 py-2">
                      {COLOR_LETTERS_L16.map((item) => {
                        const paintedColor = coloredLetters[item.char];
                        const isCorrect = paintedColor === item.targetColor;

                        return (
                          <button
                            key={item.char}
                            onClick={() => {
                              const newColors = { ...coloredLetters, [item.char]: selectedColorForPaint };
                              setColoredLetters(newColors);
                              if (selectedColorForPaint === item.targetColor) {
                                playLocalSound('success');
                                speak(`সাবাশ! তুমি ${item.char} বর্ণটি চমৎকার ${item.name} রঙে রাঙালে!`);
                              } else {
                                playLocalSound('pop');
                                speak(`হুম্ম! তুমি ${item.char} বর্ণে অন্য রং দিলে, বইয়ের রঙের সাথে মেলাও!`);
                              }
                            }}
                            className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black border-2 transition-all hover:scale-105"
                            style={{
                              borderColor: paintedColor || '#475569',
                              color: paintedColor || '#94a3b8',
                              backgroundColor: paintedColor ? `${paintedColor}15` : '#111827'
                            }}
                          >
                            {item.char}
                            {/* Correct Indicator Badge */}
                            {isCorrect && (
                              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-500 text-slate-950 text-[8px] font-black rounded-full flex items-center justify-center shadow">
                                ✔
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* PAGE 23: VOWELS CIRCLE WORDS AND ALL 11 SORT GAME */
                <div className="space-y-6">
                  {/* Step 1: Words and circle */}
                  <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-3xl space-y-4">
                    <h3 className="text-sm sm:text-base font-black text-amber-400 flex items-center gap-2">
                      <span className="bg-amber-950 px-2 py-0.5 rounded text-xs">ধাপ ১</span>
                      <span>শব্দ শুনি ও স্বরবর্ণে গোল দাগ দিই (Circle Vowels in Words)</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      {WORDS_CIRCLE_L16.map((item, idx) => {
                        const isCircleSolved = circledVowelsL16[idx];
                        return (
                          <div key={idx} className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl text-center space-y-3 shadow">
                            <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded font-black text-amber-500 uppercase">শব্দ {toBengaliNum(idx+1)}</span>
                            <div className="h-10 flex items-center justify-center text-lg font-black text-slate-200">
                              {item.parts.map((char, cIdx) => {
                                const isTarget = char === item.target;
                                return (
                                  <button
                                    key={cIdx}
                                    onClick={() => {
                                      if (isTarget) {
                                        playLocalSound('success');
                                        setCircledVowelsL16(prev => ({ ...prev, [idx]: true }));
                                        speak(`${item.target} খুঁজে পেয়েছ!`);
                                      } else {
                                        playLocalSound('pop');
                                        speak(char);
                                      }
                                    }}
                                    className={`relative px-1 mx-0.5 rounded ${isTarget && isCircleSolved ? 'text-rose-400 font-extrabold' : ''}`}
                                  >
                                    {char}
                                    {isTarget && isCircleSolved && (
                                      <svg className="absolute inset-x-0 -inset-y-1.5 w-full h-full pointer-events-none text-rose-500" viewBox="0 0 100 100">
                                        <ellipse cx="50" cy="50" rx="42" ry="40" fill="none" stroke="currentColor" strokeWidth="5.5" />
                                      </svg>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                            <button
                              onClick={() => { playLocalSound('pop'); speak(item.word); }}
                              className="w-full py-1 bg-slate-950 text-xs font-bold text-slate-300 rounded hover:text-teal-400 transition-all flex items-center justify-center gap-1"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>{item.word}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Full 11 sort game */}
                  <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-3xl space-y-4">
                    <h3 className="text-sm sm:text-base font-black text-teal-400 flex items-center gap-2">
                      <span className="bg-teal-950 px-2 py-0.5 rounded text-xs">ধাপ ২</span>
                      <span>সাজিয়ে লিখি (Arrange all Vowels in Alphabetical Order)</span>
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2 py-1">
                      {["আ", "ঋ", "উ", "ই", "ঊ", "ঐ", "ঈ", "ঔ", "অ", "এ", "ও"].map((letter, index) => {
                        const isPlaced = slotsL16.some(s => s?.index === index);
                        return (
                          <button
                            key={index}
                            disabled={isPlaced && sortingResultL16 === 'correct'}
                            onClick={() => {
                              const sIdx = slotsL16.findIndex(s => s?.index === index);
                              if (sIdx !== -1) {
                                const newSlots = [...slotsL16];
                                newSlots[sIdx] = null;
                                setSlotsL16(newSlots);
                                setSortingResultL16(null);
                              } else {
                                const emptyIdx = slotsL16.indexOf(null);
                                if (emptyIdx !== -1) {
                                  playLocalSound('pop');
                                  speak(letter);
                                  const newSlots = [...slotsL16];
                                  newSlots[emptyIdx] = { letter, index };
                                  setSlotsL16(newSlots);
                                  setSortingResultL16(null);
                                }
                              }
                            }}
                            className={`w-10 h-10 rounded-xl text-base font-black flex items-center justify-center transition-all ${isPlaced ? 'bg-slate-950 text-slate-800' : 'bg-slate-900 border border-slate-800 text-slate-200 hover:scale-105'}`}
                          >
                            {letter}
                          </button>
                        );
                      })}
                    </div>

                    {/* 11 Slots grid matching textbook 4-3-4 layout */}
                    <div className="space-y-3 max-w-md mx-auto pt-4">
                      {/* Row 1: 4 slots */}
                      <div className="grid grid-cols-4 gap-2">
                        {slotsL16.slice(0, 4).map((slot, i) => {
                          const idx = i;
                          return (
                            <div
                              key={idx}
                              onClick={() => { if (slot && sortingResultL16 !== 'correct') { const newSlots = [...slotsL16]; newSlots[idx] = null; setSlotsL16(newSlots); setSortingResultL16(null); } }}
                              className={`h-11 rounded-xl border-2 flex items-center justify-center text-lg font-black transition-all cursor-pointer ${slot ? sortingResultL16 === 'correct' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-700 text-white' : 'border-dashed border-slate-800 bg-slate-950/60'}`}
                            >
                              {slot ? slot.letter : ''}
                            </div>
                          );
                        })}
                      </div>

                      {/* Row 2: 3 slots */}
                      <div className="grid grid-cols-3 gap-2 px-10">
                        {slotsL16.slice(4, 7).map((slot, i) => {
                          const idx = i + 4;
                          return (
                            <div
                              key={idx}
                              onClick={() => { if (slot && sortingResultL16 !== 'correct') { const newSlots = [...slotsL16]; newSlots[idx] = null; setSlotsL16(newSlots); setSortingResultL16(null); } }}
                              className={`h-11 rounded-xl border-2 flex items-center justify-center text-lg font-black transition-all cursor-pointer ${slot ? sortingResultL16 === 'correct' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-700 text-white' : 'border-dashed border-slate-800 bg-slate-950/60'}`}
                            >
                              {slot ? slot.letter : ''}
                            </div>
                          );
                        })}
                      </div>

                      {/* Row 3: 4 slots */}
                      <div className="grid grid-cols-4 gap-2">
                        {slotsL16.slice(7, 11).map((slot, i) => {
                          const idx = i + 7;
                          return (
                            <div
                              key={idx}
                              onClick={() => { if (slot && sortingResultL16 !== 'correct') { const newSlots = [...slotsL16]; newSlots[idx] = null; setSlotsL16(newSlots); setSortingResultL16(null); } }}
                              className={`h-11 rounded-xl border-2 flex items-center justify-center text-lg font-black transition-all cursor-pointer ${slot ? sortingResultL16 === 'correct' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-700 text-white' : 'border-dashed border-slate-800 bg-slate-950/60'}`}
                            >
                              {slot ? slot.letter : ''}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-center gap-2 pt-3">
                      <button onClick={resetSortingL16} className="px-3.5 py-1.5 bg-slate-900 text-slate-400 hover:text-white border border-slate-800 rounded-xl text-xs font-bold transition-all">
                        মুছুন (Reset)
                      </button>
                      <button
                        disabled={slotsL16.includes(null)}
                        onClick={() => {
                          const answer = slotsL16.map(s => s ? s.letter : '');
                          const correct = ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'];
                          const isCorrect = answer.every((val, i) => val === correct[i]);
                          if (isCorrect) {
                            playLocalSound('success');
                            setSortingResultL16('correct');
                            speak("চমৎকার! তুমি সবকটি স্বরবর্ণ সঠিকভাবে সাজাতে পেরেছো!");
                          } else {
                            playLocalSound('incorrect');
                            setSortingResultL16('incorrect');
                            speak("ইস্! সাজানোটা ঠিক হয়নি বন্ধু। আবার চেষ্টা করো!");
                          }
                        }}
                        className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all ${slotsL16.includes(null) ? 'bg-slate-900 text-slate-600' : 'bg-teal-500 text-slate-950 hover:scale-102'}`}
                      >
                        যাচাই করো (Verify)
                      </button>
                    </div>

                    {sortingResultL16 === 'correct' && (
                      <div className="bg-emerald-950/30 border border-emerald-500/20 p-4 rounded-2xl text-center max-w-sm mx-auto space-y-1.5 animate-fade-in">
                        <span className="text-3xl">🏅🏆👑</span>
                        <h4 className="text-sm font-black text-emerald-400">অসাধারণ সোনা সোনামণি!</h4>
                        <p className="text-xs text-slate-300">
                          তুমি স্বরবর্ণের বড়ো চ্যালেঞ্জটি জয় করেছো! তুমি চ্যাম্পিয়ন মেডেল লাভ করেছ! 💖
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : activeLesson === 17 ? (
            /* LESSON 17 POEM SCREEN */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Rain animation SVG artwork */}
              <div className="lg:col-span-7 bg-slate-950/40 border border-slate-800 p-5 rounded-3xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                  <span className="text-xs text-indigo-400 font-black uppercase tracking-wider flex items-center gap-1">
                    ☔ ঝুমঝুম বর্ষা কাল (Rain Scene)
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">ছবিতে ক্লিক করে ব্যাঙ ও ছাতা নাড়াও!</span>
                </div>

                {/* The Stage */}
                <div className="relative aspect-video w-full bg-slate-900 border border-slate-950 rounded-2xl overflow-hidden flex items-center justify-center">
                  {/* Rain drops animation CSS */}
                  <div className="absolute inset-0 pointer-events-none z-10 opacity-40 overflow-hidden">
                    <div className="w-full h-full flex justify-around select-none">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-blue-400 rounded-full animate-bounce"
                          style={{
                            height: `${12 + Math.random() * 15}px`,
                            animationDuration: `${0.4 + Math.random() * 0.4}s`,
                            animationIterationCount: 'infinite'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Interactive SVG Scene */}
                  <svg viewBox="0 0 400 220" className="w-full max-w-sm drop-shadow-md relative z-0">
                    <defs>
                      <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#475569" />
                        <stop offset="100%" stopColor="#1e293b" />
                      </linearGradient>
                    </defs>

                    {/* Rainy Clouds */}
                    <path d="M 20,40 Q 50,15 80,40 Q 110,15 140,40 Q 170,20 190,50 L 10,50 Z" fill="url(#cloudGrad)" opacity="0.9" />
                    <path d="M 230,50 Q 260,20 290,50 Q 320,25 350,50 L 210,50 Z" fill="url(#cloudGrad)" opacity="0.7" />

                    {/* Background trees and hill */}
                    <ellipse cx="200" cy="180" rx="220" ry="40" fill="#14532d" />

                    {/* Big Leaf Tree on left */}
                    <g transform="translate(60, 110)">
                      <rect x="-8" y="0" width="16" height="70" fill="#78350f" rx="3" />
                      {/* Leaves layers matching the picture */}
                      <path d="M-40,10 Q0,-45 40,10 Z" fill="#15803d" />
                      <path d="M-30,-15 Q0,-65 30,-15 Z" fill="#16a34a" />
                    </g>

                    {/* Interactive Mushrooms (ব্যাঙের ছাতা) */}
                    <g
                      transform="translate(160, 160)"
                      onClick={() => { playLocalSound('pop'); setMushroomBroken1(!mushroomBroken1); }}
                      className="cursor-pointer"
                    >
                      <rect x="-3.5" y="0" width="7" height="22" fill="#e2e8f0" rx="1.5" />
                      <path
                        d="M-22,0 C-22,-20 22,-20 22,0 Z"
                        fill="#b45309"
                        className="transition-all duration-300"
                        style={{ transform: mushroomBroken1 ? 'scaleY(0.4) translateY(10px)' : 'none' }}
                      />
                      <circle cx="-10" cy="-6" r="2" fill="#fff" opacity="0.7" />
                      <circle cx="10" cy="-6" r="2" fill="#fff" opacity="0.7" />
                    </g>

                    <g
                      transform="translate(260, 165)"
                      onClick={() => { playLocalSound('pop'); setMushroomBroken2(!mushroomBroken2); }}
                      className="cursor-pointer"
                    >
                      <rect x="-3" y="0" width="6" height="18" fill="#e2e8f0" rx="1.5" />
                      <path
                        d="M-18,0 C-18,-16 18,-16 18,0 Z"
                        fill="#b45309"
                        className="transition-all duration-300"
                        style={{ transform: mushroomBroken2 ? 'scaleY(0.4) translateY(8px)' : 'none' }}
                      />
                    </g>

                    {/* Interactive Frog (ব্যাঙ) in pond on right */}
                    <ellipse cx="280" cy="190" rx="45" ry="14" fill="#0284c7" opacity="0.5" />
                    <g
                      transform="translate(280, 185)"
                      onClick={() => {
                        playLocalSound('sparkle');
                        setFrogJumped(true);
                        speak("প্যাঁক প্যাঁক! বৃষ্টি পড়েছে, ছাতা ভেঙেছে!");
                        setTimeout(() => setFrogJumped(false), 900);
                      }}
                      className="cursor-pointer group"
                    >
                      <g className="transition-all duration-300" style={{ transform: frogJumped ? 'translateY(-25px) scaleY(1.1)' : 'none' }}>
                        {/* Frog body */}
                        <ellipse cx="0" cy="0" rx="14" ry="10" fill="#22c55e" />
                        <circle cx="-5" cy="-8" r="4.5" fill="#22c55e" />
                        <circle cx="5" cy="-8" r="4.5" fill="#22c55e" />
                        <circle cx="-5" cy="-8" r="1.5" fill="#000" />
                        <circle cx="5" cy="-8" r="1.5" fill="#000" />
                        <path d="M-6,-2 Q0,4 6,-2" stroke="#ea580c" strokeWidth="2" fill="none" />
                        {/* Legs */}
                        <path d="M-13,4 Q-19,8 -10,10" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <path d="M13,4 Q19,8 10,10" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Poem lines */}
              <div className="lg:col-span-5 bg-slate-950/40 border border-slate-800 p-5 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-amber-400">📝 ছড়া আবৃত্তি শুনি:</h3>
                  <button
                    onClick={handlePoemRecite}
                    className={`px-3.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 border ${isPoemPlaying ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-indigo-600 border-indigo-500/20 text-white'}`}
                  >
                    {isPoemPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPoemPlaying ? "বন্ধ করুন" : "আবৃত্তি শোনো"}</span>
                  </button>
                </div>

                <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-950 text-center select-none">
                  <h4 className="text-lg font-black text-teal-400">ইতল বিতল</h4>
                  <p className="text-xs text-slate-400 font-bold">— সুফিয়া কামাল</p>
                  
                  <div className="space-y-2.5 pt-4">
                    {POEM_LINES_L17.slice(0, 4).map((line, lIdx) => (
                      <p
                        key={lIdx}
                        onClick={() => { playLocalSound('pop'); setPoemLineIdx(lIdx); speak(line.text); }}
                        className={`text-sm sm:text-base font-black py-1 cursor-pointer transition-all ${poemLineIdx === lIdx ? 'text-amber-300 scale-102 font-extrabold' : 'text-slate-300'}`}
                      >
                        {line.text}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Vocabulary card row matching Page 24 */}
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase">👇 ছবি দেখে শব্দ শিখি (Visual Cards):</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "পাতা", emoji: "🍃" },
                      { label: "ব্যাঙের ছাতা", emoji: "🍄" },
                      { label: "ব্যাঙ", emoji: "🐸" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => { playLocalSound('pop'); speak(item.label); }}
                        className="bg-slate-900 hover:bg-slate-850 p-2 border border-slate-800 rounded-xl text-center space-y-1 transition-all active:scale-95"
                      >
                        <span className="text-xl block">{item.emoji}</span>
                        <span className="text-[10px] font-black text-slate-200 block">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* LESSON 10-15: STANDARD WORD CARD & DRAWING TEMPLATE */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Words and Audio Listening Cards */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-3xl space-y-4">
                  <h3 className="text-sm font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
                    <Volume2 className="w-4 h-4" />
                    <span>১. শুনি ও বলি (Listen & Speak)</span>
                  </h3>

                  {/* Words cards inside the lesson */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeData.words.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-md group relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-4xl font-black text-teal-400 font-sans">{item.letter}</span>
                          <button
                            onClick={() => {
                              playLocalSound('pop');
                              speak(item.sentence);
                              try {
                                const storedWords = localStorage.getItem('bangla_listened_words') || '[]';
                                const wordsList = JSON.parse(storedWords);
                                if (Array.isArray(wordsList) && !wordsList.includes(item.word)) {
                                  wordsList.push(item.word);
                                  localStorage.setItem('bangla_listened_words', JSON.stringify(wordsList));
                                }
                              } catch (e) {}
                            }}
                            className="p-2 rounded-xl bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-all border border-teal-500/20 active:scale-95"
                            title="বাক্যটি শুনুন"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* SVG Illustration in the Center */}
                        <div className="h-28 flex items-center justify-center bg-slate-950/40 rounded-xl p-2 border border-slate-950">
                          {item.imageSvg}
                        </div>

                        <div className="text-center space-y-1 z-10">
                          <p className="text-lg font-black text-amber-300">{item.word}</p>
                          <p className="text-xs font-bold text-slate-300 leading-relaxed">{item.sentence}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Text / Explanations based on textbook pages */}
                  {activeData.additionalSentences.length > 0 && (
                    <div className="bg-[#1b251e] border border-emerald-500/20 p-4 rounded-2xl space-y-2">
                      <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">📝 পাঠ্যবইয়ের অতিরিক্ত পড়ি:</p>
                      <div className="space-y-1.5">
                        {activeData.additionalSentences.map((sent, sIdx) => (
                          <div
                            key={sIdx}
                            onClick={() => {
                              playLocalSound('pop');
                              speak(sent.text);
                            }}
                            className="flex items-center justify-between bg-slate-950/40 hover:bg-slate-950/80 border border-slate-850 px-3 py-2 rounded-xl cursor-pointer transition-all group"
                          >
                            <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                              {sent.text}
                            </span>
                            <Volume2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Vowels Quiz Mini Game inside the page */}
                <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-3xl space-y-4">
                  <h3 className="text-sm font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1.5">
                    <Gamepad2 className="w-4.5 h-4.5" />
                    <span>২. মজার বর্ণ মেলানো খেলা (Matching Game)</span>
                  </h3>

                  {!showCelebration ? (
                    <div className="space-y-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase">
                          প্রশ্ন {toBengaliNum(quizQuestionIdx + 1)} / {toBengaliNum(QUIZ_QUESTIONS.length)}
                        </span>
                        <span className="text-[10px] bg-indigo-950 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-bold">
                          স্কোর: {toBengaliNum(quizScore)}
                        </span>
                      </div>

                      <div className="text-center space-y-2 py-2">
                        <span className="text-5xl inline-block animate-bounce">{QUIZ_QUESTIONS[quizQuestionIdx].illustration}</span>
                        <p className="text-sm sm:text-base font-black text-slate-100">
                          {QUIZ_QUESTIONS[quizQuestionIdx].text}
                        </p>
                      </div>

                      {/* Question Options */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {QUIZ_QUESTIONS[quizQuestionIdx].options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            disabled={quizAnswered}
                            onClick={() => handleQuizAnswer(opt)}
                            className={`py-3 rounded-xl font-black text-lg transition-all ${
                              quizAnswered
                                ? opt === QUIZ_QUESTIONS[quizQuestionIdx].correctAnswer
                                  ? 'bg-emerald-500 text-slate-950 border-transparent'
                                  : 'bg-slate-950 text-slate-700 border-slate-900'
                                : 'bg-slate-950 text-slate-300 border border-slate-850 hover:bg-slate-900 hover:border-indigo-500/50'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      {/* Answer explanation indicator */}
                      {quizAnswered && (
                        <div className="pt-2 text-center">
                          <p className={`text-xs font-black ${quizCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {quizCorrect ? "🎉 চমৎকার! তোমার উত্তর সঠিক হয়েছে!" : "❌ ইস্! ভুল হয়েছে বন্ধু। পরেরবার চেষ্টা করো!"}
                          </p>
                          <button
                            onClick={nextQuizQuestion}
                            className="mt-3 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-black transition-all shadow-md active:scale-95 inline-flex items-center gap-1"
                          >
                            <span>পরবর্তী প্রশ্ন</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                      <span className="text-5xl">🏆🏅🎉</span>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-amber-400">সাবাশ সোনামণি!</h4>
                        <p className="text-xs text-slate-300">
                          তুমি চমৎকারভাবে সবকটি বর্ণ মেলানোর প্রশ্নের সমাধান করেছ! তোমার মোট স্কোর: {toBengaliNum(quizScore)} / {toBengaliNum(QUIZ_QUESTIONS.length)}
                        </p>
                      </div>
                      <div className="flex justify-center gap-2 pt-2">
                        <button
                          onClick={resetQuiz}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow transition-all"
                        >
                          আবার খেলি (Play Again)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Writing/Tracing Canvas Board */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-3xl space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                    <h3 className="text-sm font-black uppercase text-pink-400 tracking-wider flex items-center gap-1.5">
                      <PenTool className="w-4 h-4" />
                      <span>৩. লিখি ও হাত ঘোরাই (Trace & Draw)</span>
                    </h3>
                    
                    {/* Inner Vowels Switcher inside active lesson */}
                    <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                      {activeData.vowels.map((v) => (
                        <button
                          key={v}
                          onClick={() => handleLetterTabSwitch(v)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                            activeLetter === v
                              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Interactive Canvas Stage */}
                  <div className="relative aspect-square w-full max-w-[320px] mx-auto bg-slate-900 rounded-2xl border-2 border-slate-800/80 shadow-inner overflow-hidden select-none flex items-center justify-center">
                    {showStrokeGuide && (
                      <div className="absolute inset-0 pointer-events-none select-none opacity-25 flex items-center justify-center z-0">
                        <svg viewBox="0 0 320 320" className="w-full h-full">
                          <path
                            d={getLetterDashedPath(activeLetter)}
                            stroke="#cbd5e1"
                            strokeWidth="5"
                            strokeDasharray="8,8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Standard centered large letter rendering guide behind canvas */}
                    <div className="absolute pointer-events-none select-none text-[#1e293b] text-[180px] font-sans font-black z-0">
                      {activeLetter}
                    </div>

                    {/* Tracing Canvas */}
                    <canvas
                      ref={canvasRef}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="absolute inset-0 z-10 cursor-crosshair touch-none"
                    />
                  </div>

                  {/* Canvas Customization Panel Controls */}
                  <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-400">রঙ নির্বাচন করো:</span>
                      <div className="flex gap-2">
                        {['#ec4899', '#f43f5e', '#3b82f6', '#10b981', '#f59e0b'].map((color) => (
                          <button
                            key={color}
                            onClick={() => setCanvasColor(color)}
                            className={`w-6 h-6 rounded-full border transition-all ${
                              canvasColor === color ? 'ring-2 ring-white scale-110' : 'opacity-80'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-400">তুলির সাইজ:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="6"
                          max="26"
                          value={canvasSize}
                          onChange={(e) => setCanvasSize(parseInt(e.target.value, 10))}
                          className="accent-pink-500 h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-400 font-extrabold w-4">{toBengaliNum(canvasSize)}</span>
                      </div>
                    </div>

                    {/* Canvas Action Buttons */}
                    <div className="flex gap-2.5 pt-1">
                      <button
                        onClick={clearCanvas}
                        className="flex-1 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-black text-slate-300 transition-all active:scale-95"
                      >
                        মুছে ফেলো (Clear)
                      </button>
                      <button
                        onClick={() => {
                          playLocalSound('pop');
                          speak(activeLetter);
                        }}
                        className="flex-1 py-2 bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/20 rounded-xl text-xs font-black text-pink-400 transition-all active:scale-95"
                      >
                        উচ্চারণ শোনো (Listen)
                      </button>
                      <button
                        onClick={() => {
                          playLocalSound('pop');
                          setShowStrokeGuide(!showStrokeGuide);
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all border active:scale-95 ${
                          showStrokeGuide
                            ? 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                            : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        নির্দেশিকা {showStrokeGuide ? "বন্ধ" : "চালু"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Educational Textbook instruction footer matching NCTB layout */}
                <div className="bg-amber-950/10 border border-amber-500/25 p-4 rounded-2xl text-center">
                  <p className="text-[11px] text-amber-400 font-black tracking-wide leading-relaxed">
                    📌 অভিভাবক গাইডলাইন: পাঠ্যবই অনুসারে শিশুর বর্ণের গঠন ঠিক রাখার জন্য Canvas-এর পেছনে দেয়া ডটেড অক্ষরের উপর সুন্দরভাবে আঙুল বা মাউস দিয়ে নিখুঁতভাবে হাত ঘোরাতে সাহায্য করুন।
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
