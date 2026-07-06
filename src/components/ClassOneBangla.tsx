import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  User,
  PenTool,
  Music,
  Smile,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Palette,
  Trash2,
  Sparkles,
  Award,
  BookOpenCheck,
  Check,
  Gamepad2,
  Clock,
  Timer,
  Trophy,
  School,
  Users,
  Sun,
  Moon,
  Coffee,
  Heart
} from 'lucide-react';
import { playSuccessSound, playWhooshSound } from '../App';
import { Lessons10to17SubTab } from './Lessons10to17SubTab';

// Convert number to Bengali
const toBengaliNum = (num: number): string => {
  const digits: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return num.toString().split('').map(d => digits[d] || d).join('');
};

interface ClassOneBanglaProps {
  speak: (text: string) => Promise<void> | void;
}

export default function ClassOneBangla({ speak }: ClassOneBanglaProps) {
  const [activeTab, setActiveTab] = useState<'intro' | 'drawing' | 'school' | 'friends' | 'drawing5' | 'lesson6' | 'lessons10to13' | 'counting' | 'poems' | 'stories' | 'activities'>('intro');

  // Play a sound when switching sub-chapters
  const handleTabChange = (tab: 'intro' | 'drawing' | 'school' | 'friends' | 'drawing5' | 'lesson6' | 'lessons10to13' | 'counting' | 'poems' | 'stories' | 'activities') => {
    playWhooshSound();
    setActiveTab(tab);
    if (tab === 'intro') speak("আমার পরিচয়");
    if (tab === 'drawing') speak("এসো আঁকি ও রঙ করি");
    if (tab === 'school') speak("আমি ও আমার বিদ্যালয়");
    if (tab === 'friends') speak("আমি ও আমার সহপাঠীরা");
    if (tab === 'drawing5') speak("আঁকাআঁকি");
    if (tab === 'lesson6') speak("আমরা কী কী করি");
    if (tab === 'lessons10to13') speak("বর্ণ শিখি, পাঠ ১০ থেকে ১৭");
    if (tab === 'counting') speak("ছবি দেখে সংখ্যা শিখি");
    if (tab === 'poems') speak("মজার ছড়া ও কবিতা");
    if (tab === 'stories') speak("গল্প ভান্ডার");
    if (tab === 'activities') speak("বইয়ের মজার অনুশীলন ও খেলা");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-16">
      {/* Visual Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 p-6 sm:p-10 rounded-3xl text-slate-950 text-center shadow-2xl relative overflow-hidden border border-emerald-400/20"
      >
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>

        <span className="bg-slate-950 text-teal-400 text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider mb-3 inline-block">
          জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)
        </span>
        <h1 className="text-3xl sm:text-5xl font-black mb-3 text-slate-950 flex items-center justify-center gap-2 drop-shadow-sm">
          আমার বাংলা বই 📖 <span className="text-xl sm:text-2xl bg-slate-950 text-white px-3 py-1 rounded-xl font-extrabold">প্রথম শ্রেণি</span>
        </h1>
        <p className="text-xs sm:text-sm font-bold opacity-90 max-w-2xl mx-auto">
          ছোট্ট বন্ধুদের জন্য নির্মিত চমৎকার বর্ণিল ও শিক্ষণীয় ডিজিটাল পাঠ্যবই। এখানে খেলার ছলে পরিচয় দেওয়া, চিত্রাঙ্কন, চমৎকার ছড়া ও সুন্দর গল্প পড়া যাবে!
        </p>
      </motion.div>

      {/* Chapter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 bg-slate-900/60 p-2 rounded-2xl border border-slate-800/40">
        <button
          onClick={() => handleTabChange('intro')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeTab === 'intro'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <User className="w-4 h-4" />
          <span>১. আমার পরিচয়</span>
        </button>

        <button
          onClick={() => handleTabChange('drawing')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeTab === 'drawing'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>২. এসো আঁকি ও রঙ করি</span>
        </button>

        <button
          onClick={() => handleTabChange('school')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeTab === 'school'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <School className="w-4 h-4" />
          <span>৩. আমি ও আমার বিদ্যালয়</span>
        </button>

        <button
          onClick={() => handleTabChange('friends')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeTab === 'friends'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>৪. আমি ও আমার সহপাঠীরা</span>
        </button>

        <button
          onClick={() => handleTabChange('drawing5')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeTab === 'drawing5'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>৫. আঁকাআঁকি (দাগ দিই ও রং করি)</span>
        </button>

        <button
          onClick={() => handleTabChange('lesson6')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeTab === 'lesson6'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>আমরা কী কী করি</span>
        </button>

        <button
          onClick={() => handleTabChange('lessons10to13')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeTab === 'lessons10to13'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>বর্ণ শিখি (পাঠ ১০-১৭) 🍎</span>
        </button>

        <button
          onClick={() => handleTabChange('counting')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeTab === 'counting'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Smile className="w-4 h-4" />
          <span>ছবি দেখে সংখ্যা শিখি</span>
        </button>

        <button
          onClick={() => handleTabChange('poems')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeTab === 'poems'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>ছড়া ও কবিতা</span>
        </button>

        <button
          onClick={() => handleTabChange('stories')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeTab === 'stories'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>গল্প ভান্ডার</span>
        </button>

        <button
          onClick={() => handleTabChange('activities')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeTab === 'activities'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>মজার অনুশীলন ও খেলা</span>
        </button>
      </div>

      {/* Main Container Body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'intro' && <MyIdentitySubTab speak={speak} />}
          {activeTab === 'drawing' && <DrawingSubTab speak={speak} />}
          {activeTab === 'school' && <SchoolSubTab speak={speak} />}
          {activeTab === 'friends' && <FriendsSubTab speak={speak} />}
          {activeTab === 'drawing5' && <Drawing5SubTab speak={speak} />}
          {activeTab === 'lesson6' && <Lesson6SubTab speak={speak} />}
          {activeTab === 'lessons10to13' && <Lessons10to17SubTab speak={speak} />}
          {activeTab === 'counting' && <CountingSubTab speak={speak} />}
          {activeTab === 'poems' && <PoemsSubTab speak={speak} />}
          {activeTab === 'stories' && <StoriesSubTab speak={speak} />}
          {activeTab === 'activities' && <ActivitiesSubTab speak={speak} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ===================================================================================================
   1. MY IDENTITY SUB TAB
   =================================================================================================== */
function MyIdentitySubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const [name, setName] = useState(() => localStorage.getItem('c1_identity_name') || '');
  const [roll, setRoll] = useState(() => localStorage.getItem('c1_identity_roll') || '');
  const [school, setSchool] = useState(() => localStorage.getItem('c1_identity_school') || '');
  const [favoriteSubject, setFavoriteSubject] = useState(() => localStorage.getItem('c1_identity_fav') || 'বাংলা');

  const saveIdentity = () => {
    localStorage.setItem('c1_identity_name', name);
    localStorage.setItem('c1_identity_roll', roll);
    localStorage.setItem('c1_identity_school', school);
    localStorage.setItem('c1_identity_fav', favoriteSubject);
    playSuccessSound();
    speak("আমার পরিচয়টি সুন্দরভাবে সংরক্ষিত হয়েছে!");
  };

  const handleSpeakIdentity = () => {
    const speakText = `আমার নাম ${name || 'অর্ক'}। আমি প্রথম শ্রেণিতে পড়ি। আমার রোল নম্বর ${roll ? toBengaliNum(parseInt(roll) || 0) : 'এক'}। আমার বিদ্যালয়ের নাম ${school || 'প্রাথমিক বিদ্যালয়'}। আমার প্রিয় বিষয় হলো ${favoriteSubject}।`;
    speak(speakText);
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-2xl rounded-full"></div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
            🏷️ পাঠ ১: আমার পরিচয়
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            তোমার নাম, রোল নম্বর এবং বিদ্যালয়ের নাম নিচে লেখো। তারপর স্পিকার বাটনে চাপ দিয়ে নিজের মুখে শোনো!
          </p>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 bg-slate-950/40 p-6 rounded-2xl border border-slate-800/60">
          <div>
            <label className="block text-xs font-black text-teal-400 uppercase tracking-wider mb-2">আমার নাম (Name)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: অর্ক রহমান"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-base font-bold focus:outline-none focus:border-teal-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-teal-400 uppercase tracking-wider mb-2">রোল নম্বর (Roll)</label>
              <input
                type="number"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                placeholder="যেমন: ১"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-base font-bold focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-teal-400 uppercase tracking-wider mb-2">প্রিয় বিষয় (Favorite Subject)</label>
              <select
                value={favoriteSubject}
                onChange={(e) => setFavoriteSubject(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-base font-bold focus:outline-none focus:border-teal-500 transition-all cursor-pointer"
              >
                <option value="বাংলা">বাংলা 📚</option>
                <option value="ইংরেজি">ইংরেজি ✏️</option>
                <option value="গণিত">গণিত 🔢</option>
                <option value="চিত্রাঙ্কন">চিত্রাঙ্কন 🎨</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-teal-400 uppercase tracking-wider mb-2">আমার বিদ্যালয়ের নাম (School Name)</label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="যেমন: কুসুমপুর সরকারি প্রাথমিক বিদ্যালয়"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-base font-bold focus:outline-none focus:border-teal-500 transition-all"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={saveIdentity}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-950/20 flex items-center gap-2 active:scale-95"
          >
            <span>সংরক্ষণ করো (Save)</span>
          </button>

          <button
            onClick={handleSpeakIdentity}
            className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold text-sm transition-all flex items-center gap-2 active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-teal-400" />
            <span>নিজের মুখে শোনো (Speak)</span>
          </button>
        </div>

        {/* Visual Mock Card representing School Book Page */}
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 p-6 sm:p-8 rounded-2xl text-center space-y-4 max-w-lg mx-auto shadow-inner relative">
          <div className="absolute top-3 left-3 w-3.5 h-3.5 rounded-full bg-rose-500/70"></div>
          <div className="absolute top-3 right-3 w-3.5 h-3.5 rounded-full bg-teal-500/70"></div>

          <h3 className="text-xl font-black text-amber-400">আমার ডিজিটাল ডায়েরি 📝</h3>
          <div className="text-left space-y-3 font-semibold text-slate-300 text-sm sm:text-base border-t border-slate-800/60 pt-4">
            <p>👋 আমার নাম: <span className="text-white font-black">{name || '___________'}</span></p>
            <p>🏫 আমি প্রথম শ্রেণিতে পড়ি।</p>
            <p>🔢 আমার রোল নম্বর: <span className="text-teal-400 font-black">{roll ? toBengaliNum(parseInt(roll) || 0) : '___'}</span></p>
            <p>🎒 বিদ্যালয়ের নাম: <span className="text-white font-bold">{school || '___________'}</span></p>
            <p>💖 প্রিয় বিষয়: <span className="text-amber-300 font-extrabold">{favoriteSubject}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================================================================================================
   2. DRAWING & COLORING SUB TAB
   =================================================================================================== */
function DrawingSubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const [selectedArt, setSelectedArt] = useState<'flag' | 'lily'>('flag');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#ef4444'); // Red initially
  const [brushSize, setBrushSize] = useState(12);

  const colors = [
    { name: 'Red', hex: '#ef4444', label: 'লাল' },
    { name: 'Green', hex: '#22c55e', label: 'সবুজ' },
    { name: 'Blue', hex: '#3b82f6', label: 'নীল' },
    { name: 'Yellow', hex: '#eab308', label: 'হলুদ' },
    { name: 'Orange', hex: '#f97316', label: 'কমলা' },
    { name: 'Pink', hex: '#ec4899', label: 'গোলাপি' },
    { name: 'White', hex: '#ffffff', label: 'সাদা' },
    { name: 'Eraser', hex: '#000000', label: 'মুছনি' }
  ];

  // Draw background template on canvas
  const drawTemplate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and set background
    ctx.fillStyle = '#0f172a'; // slate-900 background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; // faint template lines
    ctx.setLineDash([8, 6]); // dotted outline

    if (selectedArt === 'flag') {
      // 1. Bangladesh Flag Outline
      // Standard ratio is 10:6. Draw rectangle centered
      const w = 320;
      const h = 192;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      // Draw Flag pole
      ctx.beginPath();
      ctx.moveTo(x - 20, y - 20);
      ctx.lineTo(x - 20, y + h + 80);
      ctx.stroke();

      // Draw Outer Flag rectangle
      ctx.strokeRect(x, y, w, h);

      // Draw Red Circle in middle (shifted slightly to the left, ratio 20% left from center)
      const cx = x + (w * 0.45);
      const cy = y + (h / 2);
      const r = h * 0.35;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      // 2. Water Lily (শাপলা ফুল) Simple child Tracing Outline
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 30;

      // Center petal
      ctx.beginPath();
      ctx.moveTo(cx, cy - 110);
      ctx.quadraticCurveTo(cx - 35, cy - 50, cx, cy);
      ctx.quadraticCurveTo(cx + 35, cy - 50, cx, cy - 110);
      ctx.stroke();

      // Left petal
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.quadraticCurveTo(cx - 75, cy - 80, cx - 80, cy - 40);
      ctx.quadraticCurveTo(cx - 45, cy, cx, cy);
      ctx.stroke();

      // Right petal
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.quadraticCurveTo(cx + 75, cy - 80, cx + 80, cy - 40);
      ctx.quadraticCurveTo(cx + 45, cy, cx, cy);
      ctx.stroke();

      // Bottom support leaves
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.quadraticCurveTo(cx - 100, cy + 30, cx - 110, cy + 5);
      ctx.quadraticCurveTo(cx - 50, cy + 35, cx, cy);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.quadraticCurveTo(cx + 100, cy + 30, cx + 110, cy + 5);
      ctx.quadraticCurveTo(cx + 50, cy + 35, cx, cy);
      ctx.stroke();
    }

    ctx.setLineDash([]); // reset to solid line for drawing
  };

  useEffect(() => {
    drawTemplate();
  }, [selectedArt]);

  // Touch/Mouse draw Handlers
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // Map to actual canvas size
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor === '#000000' ? '#0f172a' : brushColor; // Black canvas eraser matches bg
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 sm:space-y-8 text-center">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
          🎨 পাঠ ২: এসো রঙ করি ও আঁকি
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          জাতীয় পতাকা অথবা শাপলা ফুলটি নির্বাচন করো। তারপর ডট চিহ্নিত দাগগুলোর উপরে সুন্দর করে এঁকে রঙ ভরাট করো!
        </p>
      </div>

      {/* Flag / Lily Select Switcher */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            playWhooshSound();
            setSelectedArt('flag');
            speak("জাতীয় পতাকা আঁকো");
          }}
          className={`px-5 py-2.5 rounded-xl font-black text-sm border flex items-center gap-2 transition-all ${
            selectedArt === 'flag'
              ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          🇧🇩 জাতীয় পতাকা (National Flag)
        </button>

        <button
          onClick={() => {
            playWhooshSound();
            setSelectedArt('lily');
            speak("শাপলা ফুল আঁকো");
          }}
          className={`px-5 py-2.5 rounded-xl font-black text-sm border flex items-center gap-2 transition-all ${
            selectedArt === 'lily'
              ? 'bg-rose-600 border-rose-400 text-white shadow-lg'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          🌸 শাপলা ফুল (Water Lily)
        </button>
      </div>

      {/* Editor Space */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
        {/* Colors & Controls Panel */}
        <div className="lg:col-span-3 flex flex-col gap-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60">
          <div className="text-left">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">রঙ নির্বাচন করো</span>
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    playWhooshSound();
                    setBrushColor(c.hex);
                    speak(c.label);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                    brushColor === c.hex
                      ? 'border-white scale-105 shadow-md bg-slate-800/80 text-white'
                      : 'border-slate-800 text-slate-400 hover:border-slate-700 bg-slate-900/40'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-slate-800 block mb-1 shadow-inner"
                    style={{ backgroundColor: c.hex === '#000000' ? '#334155' : c.hex }}
                  ></span>
                  <span className="text-[10px] font-black">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-left border-t border-slate-800/80 pt-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">তুলির সাইজ (Size)</span>
            <input
              type="range"
              min="5"
              max="28"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
          </div>

          <button
            onClick={() => {
              playWhooshSound();
              drawTemplate();
              speak("সব মুছে নতুন করে শুরু করা যাক");
            }}
            className="w-full py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 text-xs font-black transition-all flex items-center justify-center gap-2 mt-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>নতুন করে শুরু (Reset)</span>
          </button>
        </div>

        {/* Canvas Area */}
        <div className="lg:col-span-9 flex justify-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 w-full max-w-lg aspect-[4/3]">
            <canvas
              ref={canvasRef}
              width={500}
              height={380}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
              className="w-full h-full block cursor-crosshair touch-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================================================================================================
   3. PICTURE & NUMBER COUNTING SUB TAB
   =================================================================================================== */
function CountingSubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const [activeNumber, setActiveNumber] = useState<number>(1);

  const numbersData = [
    { num: 1, bengNum: '১', text: 'একটি পাখি', englishText: 'One bird', emoji: '🐦', countList: ['🐦'] },
    { num: 2, bengNum: '২', text: 'দুটি চোখ', englishText: 'Two eyes', emoji: '👀', countList: ['👁️', '👁️'] },
    { num: 3, bengNum: '৩', text: 'তিনটি কলম', englishText: 'Three pens', emoji: '🖋️', countList: ['🖋️', '🖋️', '🖋️'] },
    { num: 4, bengNum: '৪', text: 'চারটি আম', englishText: 'Four mangoes', emoji: '🥭', countList: ['🥭', '🥭', '🥭', '🥭'] },
    { num: 5, bengNum: '৫', text: 'পাঁচটি পুতুল', englishText: 'Five dolls', emoji: '🧸', countList: ['🧸', '🧸', '🧸', '🧸', '🧸'] },
    { num: 6, bengNum: '৬', text: 'ছয়টি তরমুজ', englishText: 'Six watermelons', emoji: '🍉', countList: ['🍉', '🍉', '🍉', '🍉', '🍉', '🍉'] },
    { num: 7, bengNum: '৭', text: 'সাতটি তারা', englishText: 'Seven stars', emoji: '⭐', countList: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
    { num: 8, bengNum: '৮', text: 'আটটি বেলুন', englishText: 'Eight balloons', emoji: '🎈', countList: ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈'] },
    { num: 9, bengNum: '৯', text: 'নয়টি ফুল', englishText: 'Nine flowers', emoji: '🌸', countList: ['🌸', '🌸', '🌸', '🌸', '🌸', '🌸', '🌸', '🌸', '🌸'] },
    { num: 10, bengNum: '১০', text: 'দশটি প্রজাপতি', englishText: 'Ten butterflies', emoji: '🦋', countList: ['🦋', '🦋', '🦋', '🦋', '🦋', '🦋', '🦋', '🦋', '🦋', '🦋'] }
  ];

  const handleSelectNumber = (item: typeof numbersData[0]) => {
    playWhooshSound();
    setActiveNumber(item.num);
    speak(`${item.bengNum}। ${item.text}`);
  };

  const activeData = numbersData.find((n) => n.num === activeNumber) || numbersData[0];

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
          🔢 পাঠ ৫১: সংখ্যা শিখি (১ থেকে ১০)
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          সংখ্যাগুলোতে ক্লিক করে তাদের বাংলা নাম ও ছবি গণনা শোনো!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left selector: grid of numbers */}
        <div className="md:col-span-4 grid grid-cols-5 md:grid-cols-2 gap-2 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60 shadow-inner">
          {numbersData.map((item) => (
            <button
              key={item.num}
              onClick={() => handleSelectNumber(item)}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all ${
                activeNumber === item.num
                  ? 'bg-gradient-to-br from-teal-500 to-emerald-600 border-teal-400 text-slate-950 font-black scale-105 shadow-lg shadow-teal-950/20'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <span className="text-3xl sm:text-4xl font-extrabold">{item.bengNum}</span>
              <span className="text-[10px] font-bold block mt-1 opacity-80 font-mono">({item.num})</span>
            </button>
          ))}
        </div>

        {/* Right view: large visual counting stage */}
        <div className="md:col-span-8 bg-slate-950/40 border border-slate-800/60 p-6 sm:p-10 rounded-3xl text-center flex flex-col justify-between min-h-[380px] relative overflow-hidden">
          {/* Sparkles background */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full"></div>
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-teal-500/5 blur-2xl rounded-full"></div>

          <div className="space-y-4">
            <span className="text-6xl sm:text-8xl font-black text-teal-400 drop-shadow-md animate-bounce inline-block">
              {activeData.bengNum}
            </span>
            <div>
              <h3 className="text-3xl sm:text-4xl font-black text-white">{activeData.text}</h3>
              <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mt-1 font-mono">
                {activeData.englishText}
              </p>
            </div>
          </div>

          {/* Interactive Bouncing emojis */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-8 max-w-lg mx-auto">
            {activeData.countList.map((emoji, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.25, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  playWhooshSound();
                  speak(`${toBengaliNum(index + 1)}`);
                }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500 flex items-center justify-center text-3xl sm:text-4xl shadow-md select-none transition-colors"
                title="গণনা করতে ট্যাপ করো"
              >
                {emoji}
              </motion.button>
            ))}
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-850 max-w-sm mx-auto text-xs text-slate-400 font-semibold flex items-center gap-2 justify-center">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>উপরে প্রতিটি ছবির উপর ক্লিক করে সংখ্যা গণনা শোনো! 🎈</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================================================================================================
   4. FUN POEMS & RHYMES SUB TAB
   =================================================================================================== */
function PoemsSubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const poems = [
    {
      title: "আতা গাছে তোতা পাখি",
      author: "ছড়া",
      illustration: "🍎🐦",
      theme: "from-amber-500/10 to-orange-500/5 border-amber-500/20 text-amber-300",
      bgGradient: "from-amber-500 to-orange-600",
      lines: [
        "আতা গাছে তোতা পাখি",
        "ডালিম গাছে মৌ।",
        "এত ডাকি তবু কথা",
        "কও না কেন বউ।"
      ],
      soundText: "আতা গাছে তোতা পাখি। ডালিম গাছে মৌ। এত ডাকি তবু কথা কও না কেন বউ।"
    },
    {
      title: "ইতল বিতল",
      author: "সুফিয়া কামাল",
      illustration: "🌧️🍄🐸",
      theme: "from-teal-500/10 to-cyan-500/5 border-teal-500/20 text-teal-300",
      bgGradient: "from-teal-500 to-cyan-600",
      lines: [
        "ইতল বিতল গাছের পাতা",
        "গাছের তলায় ব্যাঙের ছাতা।",
        "বৃষ্টি পড়ে ভাঙে ছাতা",
        "ডোবায় ডোবে ব্যাঙের মাথা।"
      ],
      soundText: "ইতল বিতল। সুফিয়া কামাল। ইতল বিতল গাছের পাতা, গাছের তলায় ব্যাঙের ছাতা। বৃষ্টি পড়ে ভাঙে ছাতা, ডোবায় ডোবে ব্যাঙের মাথা।"
    },
    {
      title: "ভোর হলো",
      author: "কাজী নজরুল ইসলাম",
      illustration: "🌅🌅🐓",
      theme: "from-rose-500/10 to-pink-500/5 border-rose-500/20 text-rose-300",
      bgGradient: "from-rose-500 to-pink-600",
      lines: [
        "ভোর হলো দোর খোলো",
        "খুকুমণি ওঠো রে!",
        "ঐ ডাকে জুঁই-শাখে",
        "ফুল-খুকি ছোটো রে!"
      ],
      soundText: "ভোর হলো দোর খোলো খুকুমণি ওঠো রে! ঐ ডাকে জুঁই শাখে ফুল খুকি ছোটো রে!"
    },
    {
      title: "মামার বাড়ি",
      author: "জসীমউদ্দীন",
      illustration: "🥭🏡👦👧",
      theme: "from-violet-500/10 to-indigo-500/5 border-violet-500/20 text-violet-300",
      bgGradient: "from-violet-500 to-indigo-600",
      lines: [
        "আয় ছেলেরা, আয় মেয়েরা",
        "ফুল তুলিতে যাই,",
        "ফুলের মালা গলায় দিয়ে",
        "মামার বাড়ি যাই।"
      ],
      soundText: "আয় ছেলেরা, আয় মেয়েরা ফুল তুলিতে যাই, ফুলের মালা গলায় দিয়ে মামার বাড়ি যাই।"
    }
  ];

  const [activePoemIndex, setActivePoemIndex] = useState(0);

  const handleSelectPoem = (idx: number) => {
    playWhooshSound();
    setActivePoemIndex(idx);
    speak(poems[idx].title);
  };

  const activePoem = poems[activePoemIndex];

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
          🎶 পাঠ ৮ ও ১৭: মজার ছড়া ও কবিতা
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          নিচের চমৎকার ও মিষ্টি ছড়াগুলো পড়ো এবং প্লে বাটন চেপে সুরের মতো আবৃত্তি শোনো!
        </p>
      </div>

      {/* Selector and Player Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left list of poems */}
        <div className="md:col-span-4 flex flex-col gap-2.5 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">কবিতা তালিকা</span>
          {poems.map((poem, idx) => (
            <button
              key={poem.title}
              onClick={() => handleSelectPoem(idx)}
              className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                activePoemIndex === idx
                  ? 'bg-gradient-to-r from-teal-500/15 to-emerald-500/5 border-teal-500/50 text-white'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div>
                <h4 className="font-extrabold text-base">{poem.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">লেখক: {poem.author}</p>
              </div>
              <span className="text-2xl">{poem.illustration.slice(0, 2)}</span>
            </button>
          ))}
        </div>

        {/* Right Poem Card Presentation */}
        <div className="md:col-span-8 bg-slate-950/40 border border-slate-800/60 p-6 sm:p-10 rounded-3xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-4xl select-none opacity-80">
            {activePoem.illustration}
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl font-black text-amber-400">{activePoem.title}</h3>
            <p className="text-sm text-slate-400 font-extrabold">{activePoem.author}</p>
          </div>

          {/* Lines block with nice typography */}
          <div className="py-6 space-y-3 bg-slate-900/30 p-6 rounded-2xl border border-slate-850/60 inline-block w-full max-w-md mx-auto">
            {activePoem.lines.map((line, index) => (
              <p key={index} className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                {line}
              </p>
            ))}
          </div>

          {/* Big Voice Button */}
          <div className="flex justify-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                speak(activePoem.soundText);
              }}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black flex items-center gap-3 shadow-lg shadow-teal-950/30 cursor-pointer animate-pulse"
            >
              <Volume2 className="w-5 h-5" />
              <span>ছড়া আবৃত্তি শোনো (Listen)</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================================================================================================
   5. CLASSIC INTERACTIVE STORIES SUB TAB
   =================================================================================================== */
function StoriesSubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const storiesList = [
    {
      id: 'boy_wolf',
      title: "বাঘ ও রাখাল (The Boy Who Cried Wolf)",
      description: "মিথ্যে কথা বললে কীভাবে বিপদ ঘটে সেই মজার রাখালের শিক্ষা!",
      banner: "🐅🧒🏡",
      slides: [
        {
          img: "🧒🌾🐂",
          text: "এক দেশে ছিল এক রাখাল। সে প্রতিদিন মাঠের কোণে গরু চরাত।",
          enText: "Once there lived a shepherd boy who grazed cows in the pasture."
        },
        {
          img: "🪈🎶☁️",
          text: "রাখাল ছেলেটি মাঠে বসে বাঁশি বাজাত। কিন্তু তার সময় ভালো কাটত না।",
          enText: "He played the flute, but he was often bored."
        },
        {
          img: "📢😮🏡",
          text: "একদিন সে মজা করার জন্য চিৎকার করল: 'বাঘ এসেছে, বাঘ এসেছে!'",
          enText: "One day he shouted for fun: 'Wolf! Wolf!'"
        },
        {
          img: "🏃🏃🏃🪵",
          text: "গ্রামের মানুষ লাঠিসোঁটা নিয়ে ছুটে এল। কিন্তু রাখাল হেসে বলল: 'আমি কেবল মজা করেছি!'",
          enText: "The villagers rushed to help, but he laughed saying: 'I was just joking!'"
        },
        {
          img: "🐅👹😱",
          text: "একদিন সত্যি সত্যিই বনের বড় বাঘ আসল। রাখাল ভয়ে কেঁদে চেঁচাল: 'বাঘ বাঘ বাঘ!'",
          enText: "Then one day, a real wolf came. The boy cried out in terror: 'Wolf! Wolf!'"
        },
        {
          img: "🤫🤫🤫",
          text: "কিন্তু গ্রামের মানুষ ভাবল রাখাল আবার মিথ্যে তামাশা করছে। কেউ আর তাকে বাঁচাতে আসল না!",
          enText: "But the villagers thought he was lying again. Nobody came to save him!"
        },
        {
          img: "🏆🍎✨",
          text: "শিক্ষা: কখনো মিথ্যে তামাশা করতে নেই, কারণ মিথ্যেবাদীকে বিপদের সময় কেউ বিশ্বাস করে না।",
          enText: "Moral: A liar is not believed even when they speak the truth."
        }
      ]
    },
    {
      id: 'ant_dove',
      title: "পিঁপড়া ও পায়রার গল্প (The Ant and the Dove)",
      description: "উপকার করলে কীভাবে অন্যের কাছ থেকে উপকার পাওয়া যায়!",
      banner: "🐜🕊️🍃",
      slides: [
        {
          img: "🐜🌊🌧️",
          text: "এক নদীর ধারে একটা ছোটো পিঁপড়া বাস করত। একদিন ঢেউয়ের ধাক্কায় পিঁপড়াটি পানিতে ভেসে গেল।",
          enText: "An ant lived near a river. One day a wave swept him into the water."
        },
        {
          img: "🕊️🌿🌳",
          text: "নদীর পাড়ে একটা বড় গাছে বসে থাকা পায়রা পিঁপড়াটির বিপদ দেখল এবং একটি পাতা ফেলে দিল।",
          enText: "A dove sitting on a nearby tree saw this and dropped a leaf into the water."
        },
        {
          img: "🐜🍃🧗",
          text: "পিঁপড়াটি পাতার ওপরে উঠে বসল এবং এভাবে প্রাণে রক্ষা পেল। তারা খুব ভালো বন্ধু হলো।",
          enText: "The ant climbed onto the leaf and floated safely to dry land."
        },
        {
          img: "👦🏹🕊️",
          text: "একদিন এক শিকারী এসে পায়রাটিকে লক্ষ্য করে তীর ধনুক তাক করল।",
          enText: "One day, a hunter arrived and aimed his bow at the dove."
        },
        {
          img: "🐜🦷🦵",
          text: "পিঁপড়াটি তা দেখে শিকারীর পায়ে খুব জোরে কামড় দিল। শিকারী ব্যথায় কেঁদে উঠল!",
          enText: "Seeing this, the ant bit the hunter's leg. The hunter cried out in pain!"
        },
        {
          img: "🕊️🚀🌤️",
          text: "তীর লক্ষ্যভ্রষ্ট হলো এবং পায়রাটি বিপদ বুঝতে পেরে ডানা মেলে আকাশে উড়ে পালাল।",
          enText: "The arrow missed, and the dove flew away safely into the sky."
        },
        {
          img: "🏆🍎✨",
          text: "শিক্ষা: ভালো কাজ করলে সব সময়ই ভালো ফল পাওয়া যায়। অন্যের সাহায্য করলে নিজেরও সাহায্য মেলে।",
          enText: "Moral: One good turn deserves another."
        }
      ]
    }
  ];

  const [selectedStoryId, setSelectedStoryId] = useState<string>('boy_wolf');
  const [slideIndex, setSlideIndex] = useState<number>(0);

  // 1. Timer & Session Tracker States
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [completedStories, setCompletedStories] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('class1_completed_stories');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [sessionCount, setSessionCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('class1_sessions_count');
      return stored ? parseInt(stored, 10) : 1;
    } catch {
      return 1;
    }
  });
  const [badgeAwarded, setBadgeAwarded] = useState<string | null>(null);

  const activeStory = storiesList.find((s) => s.id === selectedStoryId) || storiesList[0];

  // Tick the reading timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Convert seconds to readable Bengali MM:SS format
  const formatTime = (sec: number): string => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${toBengaliNum(mins)}:${toBengaliNum(secs)}`;
  };

  // Handle start of a new reading session
  const handleStartNewSession = () => {
    playSuccessSound();
    const nextSession = sessionCount + 1;
    setSessionCount(nextSession);
    localStorage.setItem('class1_sessions_count', nextSession.toString());
    setTimerSeconds(0);
    speak(`নতুন পড়া সেশন শুরু হয়েছে! সেশন নম্বর ${toBengaliNum(nextSession)}`);
  };

  // Handle progress reset
  const handleResetProgress = () => {
    playWhooshSound();
    if (confirm("আপনি কি সব অর্জিত মেডেল এবং সেশন হিস্টোরি মুছে আবার নতুন করে শুরু করতে চান?")) {
      playSuccessSound();
      setCompletedStories([]);
      setSessionCount(1);
      setTimerSeconds(0);
      localStorage.removeItem('class1_completed_stories');
      localStorage.setItem('class1_sessions_count', '1');
      speak("পড়ার অগ্রগতি সফলভাবে শূন্য করা হয়েছে। নতুন করে পড়া শুরু হোক!");
    }
  };

  // 2. Reading Room & Auto-Play States
  const [readingMode, setReadingMode] = useState<'slider' | 'room'>('slider');
  const [activeReadingLine, setActiveReadingLine] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState<number>(1.5);
  const [readLines, setReadLines] = useState<Record<string, boolean[]>>(() => {
    try {
      const stored = localStorage.getItem('class1_room_read_lines');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const autoPlayRef = useRef<boolean>(false);
  autoPlayRef.current = isAutoPlaying;

  // Persist read lines
  useEffect(() => {
    try {
      localStorage.setItem('class1_room_read_lines', JSON.stringify(readLines));
    } catch (e) {
      console.warn('Could not save readLines progress:', e);
    }
  }, [readLines]);

  const handleStopAutoPlay = () => {
    setIsAutoPlaying(false);
    autoPlayRef.current = false;
    speak(""); // will interrupt current speech synthesis
  };

  // Word-by-word reading states and handlers
  const [activeWordIndex, setActiveWordIndex] = useState<{ lineIndex: number; wordIndex: number } | null>(null);
  const [isWordPlaying, setIsWordPlaying] = useState<boolean>(false);
  const isWordPlayingRef = useRef<boolean>(false);
  isWordPlayingRef.current = isWordPlaying;

  const handleStopWordPlayback = () => {
    setIsWordPlaying(false);
    isWordPlayingRef.current = false;
    setActiveWordIndex(null);
    speak("");
  };

  const handlePlayWordByWord = async (lineIdx: number) => {
    playWhooshSound();
    handleStopAutoPlay();
    if (isWordPlaying) {
      handleStopWordPlayback();
      return;
    }

    setIsWordPlaying(true);
    isWordPlayingRef.current = true;
    setActiveReadingLine(lineIdx);

    const slide = activeStory.slides[lineIdx];
    const words = slide.text.split(/\s+/).filter(w => w.trim().length > 0);

    // Mark this line as read
    setReadLines((prev) => {
      const storyRead = prev[selectedStoryId] ? [...prev[selectedStoryId]] : new Array(activeStory.slides.length).fill(false);
      const nextRead = [...storyRead];
      nextRead[lineIdx] = true;
      return { ...prev, [selectedStoryId]: nextRead };
    });

    for (let i = 0; i < words.length; i++) {
      if (!isWordPlayingRef.current) break;
      setActiveWordIndex({ lineIndex: lineIdx, wordIndex: i });

      // Speak word with punctuation stripped
      const cleanWord = words[i].replace(/[।,?!]/g, '').trim();
      if (cleanWord) {
        try {
          await speak(cleanWord);
        } catch (e) {
          console.warn("Word speak failed:", e);
        }
      }

      if (!isWordPlayingRef.current) break;
      // Precise comfortable delay between words for child learners
      await new Promise((resolve) => setTimeout(resolve, 180));
    }

    setIsWordPlaying(false);
    isWordPlayingRef.current = false;
    setActiveWordIndex(null);
  };

  const playSequence = async (startIndex: number) => {
    setIsAutoPlaying(true);
    autoPlayRef.current = true;
    
    let start = startIndex;
    if (start >= activeStory.slides.length - 1) {
      start = 0;
    }

    for (let i = start; i < activeStory.slides.length; i++) {
      if (!autoPlayRef.current) break;
      setActiveReadingLine(i);
      
      // Mark this line as read
      setReadLines((prev) => {
        const storyRead = prev[selectedStoryId] ? [...prev[selectedStoryId]] : new Array(activeStory.slides.length).fill(false);
        const nextRead = [...storyRead];
        nextRead[i] = true;
        return { ...prev, [selectedStoryId]: nextRead };
      });

      // Play TTS for this line and wait for it to complete
      try {
        await speak(activeStory.slides[i].text);
      } catch (err) {
        console.warn("Speech playback error:", err);
      }

      if (!autoPlayRef.current) break;

      // Wait for specified auto-pause duration
      if (i < activeStory.slides.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, autoPlayInterval * 1000));
      }
    }
    setIsAutoPlaying(false);
  };

  const handleSelectStory = (id: string) => {
    playWhooshSound();
    handleStopAutoPlay();
    handleStopWordPlayback();
    setSelectedStoryId(id);
    setSlideIndex(0);
    setActiveReadingLine(null);
    const story = storiesList.find((s) => s.id === id);
    if (story) speak(story.title);
  };

  const navigateSlide = (dir: 'prev' | 'next') => {
    playWhooshSound();
    if (dir === 'prev') {
      setSlideIndex((prev) => (prev > 0 ? prev - 1 : activeStory.slides.length - 1));
    } else {
      setSlideIndex((prev) => (prev < activeStory.slides.length - 1 ? prev + 1 : 0));
    }
  };

  const markStoryAsCompleted = (storyId: string) => {
    if (!completedStories.includes(storyId)) {
      const updated = [...completedStories, storyId];
      setCompletedStories(updated);
      localStorage.setItem('class1_completed_stories', JSON.stringify(updated));
      
      // Open story badge popup!
      setBadgeAwarded(storyId);
      playSuccessSound();
      speak(`দারুণ খবর! আপনি "${activeStory.title.split(' (')[0]}" গল্পটি শেষ করেছেন এবং নতুন মেডেল পেয়েছেন!`);

      // If completed all, queue the master badge
      if (updated.length === storiesList.length) {
        setTimeout(() => {
          setBadgeAwarded('all');
          playSuccessSound();
          speak("অভিনন্দন! আপনি সবগুলো গল্প পড়ে ফেলেছেন এবং গল্পরাজ মেডেল অর্জন করেছেন!");
        }, 4500);
      }
    }
  };

  // Monitor slide change to trigger completion & award badges
  useEffect(() => {
    if (slideIndex === activeStory.slides.length - 1) {
      markStoryAsCompleted(selectedStoryId);
    }
  }, [slideIndex, selectedStoryId]);

  // Monitor line-by-line reading progress in Reading Room
  useEffect(() => {
    const storyRead = readLines[selectedStoryId];
    if (storyRead && storyRead.length === activeStory.slides.length && storyRead.every(Boolean)) {
      markStoryAsCompleted(selectedStoryId);
    }
  }, [readLines, selectedStoryId, activeStory]);

  const handleSpeakSlide = () => {
    const slide = activeStory.slides[slideIndex];
    if (slide) speak(slide.text);
  };

  const handleToggleManualRead = (idx: number) => {
    playSuccessSound();
    setReadLines((prev) => {
      const storyRead = prev[selectedStoryId] ? [...prev[selectedStoryId]] : new Array(activeStory.slides.length).fill(false);
      const nextRead = [...storyRead];
      nextRead[idx] = !nextRead[idx];
      return { ...prev, [selectedStoryId]: nextRead };
    });
  };

  const handlePlaySingleLine = async (idx: number) => {
    playWhooshSound();
    handleStopAutoPlay();
    setActiveReadingLine(idx);
    
    // Mark line as read
    setReadLines((prev) => {
      const storyRead = prev[selectedStoryId] ? [...prev[selectedStoryId]] : new Array(activeStory.slides.length).fill(false);
      const nextRead = [...storyRead];
      nextRead[idx] = true;
      return { ...prev, [selectedStoryId]: nextRead };
    });

    try {
      await speak(activeStory.slides[idx].text);
    } catch (err) {
      console.warn("Speech playback error:", err);
    }
  };

  const handleToggleMode = (mode: 'slider' | 'room') => {
    playWhooshSound();
    handleStopAutoPlay();
    handleStopWordPlayback();
    setReadingMode(mode);
    speak(mode === 'slider' ? "স্লাইড শো মোড" : "পড়ার ঘর মোড");
  };

  const activeSlide = activeStory.slides[slideIndex] || activeStory.slides[0];

  const BADGES = [
    {
      id: 'boy_wolf',
      title: "সত্যবাদী পাঠক",
      subtitle: "Truthful Reader",
      desc: '"বাঘ ও রাখাল" সম্পূর্ণ পড়ে অর্জিত।',
      emoji: "🐅",
      badgeBg: "from-amber-600 to-yellow-500",
      borderGlow: "border-amber-400 text-amber-300",
      unlocked: completedStories.includes('boy_wolf')
    },
    {
      id: 'ant_dove',
      title: "উপকারী বন্ধু",
      subtitle: "Helpful Friend",
      desc: '"পিঁপড়া ও পায়রার গল্প" সম্পূর্ণ পড়ে অর্জিত।',
      emoji: "🕊️",
      badgeBg: "from-teal-600 to-emerald-500",
      borderGlow: "border-teal-400 text-teal-300",
      unlocked: completedStories.includes('ant_dove')
    },
    {
      id: 'all',
      title: "গল্পের রাজা",
      subtitle: "King of Stories",
      desc: 'সবগুলো গল্প সম্পূর্ণ পড়ার মহৎ মাইলফলক!',
      emoji: "👑",
      badgeBg: "from-purple-600 via-pink-500 to-amber-500 animate-pulse",
      borderGlow: "border-pink-400 text-pink-300",
      unlocked: completedStories.length === storiesList.length
    }
  ];

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-8 shadow-xl space-y-8 relative">
      
      {/* 1. Bento Dashboard: Timer, Tracker & Badges Tray */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-950/30 p-5 rounded-2xl border border-slate-800/40">
        
        {/* Box A: Reading Clock */}
        <div className="flex flex-col justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center md:text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-500" />
              পড়ার টাইমার (Timer)
            </span>
            <span className="text-[10px] font-black text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/30">
              {isTimerRunning ? "সক্রিয়" : "বন্ধ"}
            </span>
          </div>
          <div className="text-3xl font-black text-[#f0f6fc] font-mono tracking-wider py-1.5 flex justify-center md:justify-start items-baseline gap-1">
            {formatTime(timerSeconds)}
            <span className="text-xs text-slate-500 font-sans font-bold">সেকেন্ড</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => { playWhooshSound(); setIsTimerRunning(!isTimerRunning); }}
              className={`flex-1 py-1 rounded text-xs font-bold transition-all border ${
                isTimerRunning 
                  ? 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-amber-500' 
                  : 'bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-slate-950'
              }`}
            >
              {isTimerRunning ? "থামুন (Pause)" : "চালু করুন (Start)"}
            </button>
            <button
              onClick={() => { playWhooshSound(); setTimerSeconds(0); }}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded text-xs text-slate-400 transition-all"
              title="টাইমার রিসেট"
            >
              রিসেট
            </button>
          </div>
        </div>

        {/* Box B: Session Tracker */}
        <div className="flex flex-col justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center md:text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-slate-500 flex items-center gap-1">
              <Timer className="w-3.5 h-3.5 text-teal-500" />
              সেশন ট্র্যাকার (Session Tracker)
            </span>
            <button 
              onClick={handleResetProgress}
              className="text-[10px] text-rose-500 font-bold hover:underline"
            >
              রিসেট অগ্রতি
            </button>
          </div>
          <div className="space-y-1 py-1">
            <div className="text-sm font-bold text-slate-300">
              বর্তমান সেশন: <span className="text-teal-400 font-extrabold text-base">#{toBengaliNum(sessionCount)}</span>
            </div>
            <div className="text-xs font-bold text-slate-400">
              পঠিত গল্প: <span className="text-emerald-400 font-black">{toBengaliNum(completedStories.length)}</span> / {toBengaliNum(storiesList.length)} টি
            </div>
          </div>
          <button
            onClick={handleStartNewSession}
            className="w-full mt-3 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 text-xs font-black rounded transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            নতুন সেশন শুরু (New Session)
          </button>
        </div>

        {/* Box C: Badge Tray */}
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center md:text-left">
          <span className="text-xs font-black text-slate-500 flex items-center justify-center md:justify-start gap-1 mb-2.5">
            <Trophy className="w-3.5 h-3.5 text-teal-500" />
            অর্জিত ডিজিটাল মেডেলসমূহ (Badges)
          </span>
          <div className="flex justify-center md:justify-start gap-3.5">
            {BADGES.map((b) => (
              <div 
                key={b.id} 
                className={`group relative flex flex-col items-center cursor-help`}
                title={`${b.title}: ${b.desc}`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 shadow-inner transition-all ${
                  b.unlocked 
                    ? `bg-gradient-to-tr ${b.badgeBg} ${b.borderGlow} scale-105` 
                    : 'bg-slate-950 border-slate-850 opacity-30 grayscale'
                }`}>
                  <span className="text-lg">{b.emoji}</span>
                </div>
                {b.unlocked && (
                  <div className="absolute -bottom-1 w-3 h-3 bg-emerald-500 rounded-full border border-slate-950 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-slate-950 font-black" />
                  </div>
                )}
                {/* Tooltip on Hover */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-10">
                  <div className="bg-slate-950 border border-slate-800 text-white p-2.5 rounded-lg text-left shadow-2xl min-w-[180px]">
                    <p className="text-xs font-black text-amber-400 flex items-center gap-1">
                      {b.unlocked ? "🔓" : "🔒"} {b.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{b.desc}</p>
                  </div>
                  <div className="w-2 h-2 bg-slate-950 border-b border-r border-slate-800 rotate-45 -mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
          📖 পাঠ ৯ ও ৪৬: সুন্দর বাংলা গল্প ভান্ডার
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          একটি গল্প নির্বাচন করো এবং স্লাইড পরিবর্তন করে পুরো গল্পটি শুনো ও মজাদার শিক্ষা নাও!
        </p>
      </div>

      {/* Story Selectors Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {storiesList.map((story) => {
          const isCompleted = completedStories.includes(story.id);
          return (
            <button
              key={story.id}
              onClick={() => handleSelectStory(story.id)}
              className={`px-5 py-3 rounded-xl font-black text-sm border flex items-center gap-2.5 transition-all ${
                selectedStoryId === story.id
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-black shadow-lg border-teal-400/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>{story.banner}</span>
              <span>{story.title.split(' (')[0]}</span>
              {isCompleted && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] border border-emerald-500/30">
                  পঠিত
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mode Switcher: Slideshow vs Reading Room */}
      <div className="flex justify-center pt-2">
        <div className="inline-flex bg-slate-950/40 p-1.5 rounded-2xl border border-slate-800/80 gap-1 shadow-inner">
          <button
            onClick={() => handleToggleMode('slider')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
              readingMode === 'slider'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>স্লাইড শো মোড (Slideshow)</span>
          </button>
          <button
            onClick={() => handleToggleMode('room')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
              readingMode === 'room'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>পড়ার ঘর মোড (Reading Room)</span>
          </button>
        </div>
      </div>

      {readingMode === 'slider' ? (
        /* Slider View */
        <div className="max-w-2xl mx-auto bg-slate-950/40 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden text-center min-h-[380px] flex flex-col justify-between">
          
          {/* Top Header: Slide Progress Badge */}
          <div className="flex items-center justify-between border-b border-slate-850/60 pb-3">
            <span className="text-[10px] font-black text-teal-400 tracking-widest block uppercase">ডিজিটাল স্টোরিবুক</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-400 text-xs font-black border border-slate-850">
              ধাপ {slideIndex + 1} / {activeStory.slides.length}
            </span>
          </div>

          {/* Art representation (Large emoji stage) */}
          <div className="text-7xl sm:text-8xl select-none py-6 animate-pulse filter drop-shadow-lg">
            {activeSlide.img}
          </div>

          {/* Narrative text block with interactive word-by-word highlights */}
          <div className="space-y-3">
            <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-1.5 py-1.5 leading-relaxed max-w-lg mx-auto">
              {activeSlide.text.split(/\s+/).filter(w => w.trim().length > 0).map((word, wIdx) => {
                const isWordHighlighted = activeWordIndex?.lineIndex === slideIndex && activeWordIndex?.wordIndex === wIdx;
                return (
                  <motion.span
                    key={wIdx}
                    onClick={() => {
                      playSuccessSound();
                      const cleanWord = word.replace(/[।,?!]/g, '').trim();
                      if (cleanWord) speak(cleanWord);
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className={`px-1.5 py-0.5 rounded cursor-pointer font-black text-xl sm:text-2xl transition-all select-none ${
                      isWordHighlighted
                        ? 'bg-amber-400 text-slate-950 scale-110 shadow-[0_0_12px_rgba(251,191,36,0.6)] border border-amber-300 ring-2 ring-amber-400/50'
                        : 'text-[#f0f6fc] hover:bg-slate-800 hover:text-teal-300'
                    }`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>
            <p className="text-xs font-semibold text-slate-400 italic font-mono max-w-md mx-auto">
              {activeSlide.enText}
            </p>
          </div>

          {/* Bottom controls: TTS audio player + pagination */}
          <div className="flex flex-col gap-4 max-w-md mx-auto pt-4 w-full">
            <div className="flex items-center justify-between gap-4 w-full">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateSlide('prev')}
                className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-white flex items-center justify-center shadow-md shrink-0 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex flex-wrap justify-center gap-2.5">
                {/* Full speech button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSpeakSlide}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-white font-extrabold flex items-center gap-2 shadow-inner"
                >
                  <Volume2 className="w-4 h-4 text-teal-400" />
                  <span className="text-xs">গল্প শোনো (Speak All)</span>
                </motion.button>

                {/* Word-by-word speech button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlayWordByWord(slideIndex)}
                  className={`px-4 py-2.5 rounded-xl border font-extrabold flex items-center gap-2 shadow-inner transition-all ${
                    isWordPlaying && activeWordIndex?.lineIndex === slideIndex
                      ? 'bg-amber-500 border-amber-400 text-slate-950'
                      : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-amber-400 hover:text-amber-300'
                  }`}
                >
                  {isWordPlaying && activeWordIndex?.lineIndex === slideIndex ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span className="text-xs">থামুন</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span className="text-xs">শব্দে শব্দে (Word-by-Word)</span>
                    </>
                  )}
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateSlide('next')}
                className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-white flex items-center justify-center shadow-md shrink-0 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
            
            <p className="text-[11px] text-slate-500 font-bold">
              💡 যেকোনো শব্দের উপর ক্লিক করে আলাদাভাবে তার উচ্চারণ শুনতে পারেন!
            </p>
          </div>

        </div>
      ) : (
        /* Interactive Reading Room View */
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress & Auto-Play Controls Panel */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Progress Bar & Text */}
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between text-xs font-black text-slate-400">
                  <span className="flex items-center gap-1">
                    🎯 পড়ার অগ্রগতি (Story Reading Progress)
                  </span>
                  <span className="text-teal-400 font-mono text-sm font-black">
                    {toBengaliNum(Object.values(readLines[selectedStoryId] || {}).filter(Boolean).length)} / {toBengaliNum(activeStory.slides.length)} টি লাইন পঠিত
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-850 p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(Math.max(0, Object.values(readLines[selectedStoryId] || {}).filter(Boolean).length) / activeStory.slides.length) * 100}%`
                    }}
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                  />
                </div>
              </div>

              {/* Reset progress for this story button */}
              <button
                onClick={() => {
                  playWhooshSound();
                  setReadLines((prev) => ({
                    ...prev,
                    [selectedStoryId]: new Array(activeStory.slides.length).fill(false)
                  }));
                  speak("এই গল্পের পড়ার অগ্রগতি মুছে দেওয়া হয়েছে। নতুন করে পড়া শুরু হোক!");
                }}
                className="self-start sm:self-center px-3 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-rose-400 hover:text-rose-300 font-bold rounded-lg transition-all flex items-center gap-1 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                অগ্রগতি রিসেট
              </button>
            </div>

            {/* Read-Along Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-850/60">
              <div className="flex items-center gap-3">
                {isAutoPlaying ? (
                  <button
                    onClick={handleStopAutoPlay}
                    className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-500 text-white font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Pause className="w-4 h-4" />
                    পড়া থামান (Stop Read-Along)
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      playSuccessSound();
                      const storyRead = readLines[selectedStoryId] || [];
                      const firstUnread = storyRead.indexOf(false);
                      playSequence(firstUnread !== -1 ? firstUnread : 0);
                    }}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    টানা গল্প শোনো (Auto Read-Along)
                  </button>
                )}
              </div>

              {/* Speed / Delay Slider */}
              <div className="flex items-center justify-between gap-3 bg-slate-950/40 p-2.5 rounded-xl border border-slate-850/50">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1 select-none shrink-0">
                  ⏱️ লাইন বিরতি:
                </span>
                <input
                  type="range"
                  min="0.5"
                  max="3.5"
                  step="0.5"
                  value={autoPlayInterval}
                  onChange={(e) => setAutoPlayInterval(parseFloat(e.target.value))}
                  className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <span className="text-xs font-black text-teal-400 font-mono tracking-wide shrink-0">
                  {toBengaliNum(autoPlayInterval)} সে.
                </span>
              </div>
            </div>
          </div>

          {/* Lines List */}
          <div className="space-y-4">
            {activeStory.slides.map((slide, index) => {
              const isLineActive = activeReadingLine === index;
              const storyRead = readLines[selectedStoryId] || [];
              const isLineCompleted = !!storyRead[index];

              return (
                <motion.div
                  key={index}
                  className={`relative p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-4 ${
                    isLineActive
                      ? 'border-teal-400 bg-teal-950/15 shadow-[0_0_20px_rgba(20,184,166,0.15)] ring-1 ring-teal-400 scale-[1.01]'
                      : 'border-slate-800 bg-slate-900/40 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Left Column: Emoji Badge + Progress Checkbox */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shadow-inner select-none">
                      {slide.img}
                    </div>

                    {/* Interactive Completion Checklist */}
                    <button
                      onClick={() => handleToggleManualRead(index)}
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${
                        isLineCompleted
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'border-slate-700 bg-slate-950 hover:border-slate-600'
                      }`}
                      title={isLineCompleted ? "পড়া হয়েছে" : "নিজে পড়ো ও টিক দাও"}
                    >
                      {isLineCompleted && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>
                  </div>

                  {/* Center Column: Story Text with interactive word-by-word highlights */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap gap-x-2 gap-y-1 py-1.5 leading-relaxed">
                      {slide.text.split(/\s+/).filter(w => w.trim().length > 0).map((word, wIdx) => {
                        const isWordHighlighted = activeWordIndex?.lineIndex === index && activeWordIndex?.wordIndex === wIdx;
                        return (
                          <motion.span
                            key={wIdx}
                            onClick={() => {
                              playSuccessSound();
                              const cleanWord = word.replace(/[।,?!]/g, '').trim();
                              if (cleanWord) speak(cleanWord);
                            }}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            className={`px-1 rounded cursor-pointer font-extrabold text-lg sm:text-xl transition-all select-none ${
                              isWordHighlighted
                                ? 'bg-amber-400 text-slate-950 scale-110 shadow-[0_0_10px_rgba(251,191,36,0.6)] border border-amber-300 ring-2 ring-amber-400/40'
                                : isLineActive
                                ? 'text-teal-300 hover:bg-slate-800/80 hover:text-teal-200'
                                : 'text-slate-100 hover:bg-slate-800/80 hover:text-teal-300'
                            }`}
                          >
                            {word}
                          </motion.span>
                        );
                      })}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium italic font-mono">
                      {slide.enText}
                    </p>
                  </div>

                  {/* Right Column: Speaker & Active Mascot indicator */}
                  <div className="flex flex-wrap items-center gap-2 self-end md:self-center shrink-0">
                    {isLineActive && (
                      <span className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800 text-[10px] font-black text-teal-300 uppercase tracking-wider animate-pulse">
                        👉 পড়ার বন্ধু (Mascot)
                      </span>
                    )}

                    {/* Speak full line */}
                    <button
                      onClick={() => handlePlaySingleLine(index)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                        isLineActive && !isWordPlaying
                          ? 'bg-teal-500 border-teal-400 text-slate-950'
                          : 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                      title="পুরো বাক্যটি শোনো (Speak All)"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {/* Word-by-word reader for this line */}
                    <button
                      onClick={() => handlePlayWordByWord(index)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                        isWordPlaying && activeWordIndex?.lineIndex === index
                          ? 'bg-amber-500 border-amber-400 text-slate-950 font-black'
                          : 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300'
                      }`}
                      title="শব্দে শব্দে শোনো (Word-By-Word)"
                    >
                      {isWordPlaying && activeWordIndex?.lineIndex === index ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Sparkles className="w-4 h-4 animate-pulse" />
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Education Moral Box */}
          <div className="p-6 bg-gradient-to-r from-amber-950/20 via-slate-900 to-amber-950/20 border border-amber-800/30 rounded-2xl text-center space-y-3 shadow-xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/40 text-amber-400 text-xs font-black">
              🏆 শিক্ষণীয় বাণী (Moral Lesson)
            </span>
            <p className="text-lg sm:text-xl font-black text-amber-200">
              {activeStory.slides[activeStory.slides.length - 1].text}
            </p>
          </div>
        </div>
      )}

      {/* 2. Celebration Modal Overlay */}
      <AnimatePresence>
        {badgeAwarded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center p-6 text-center rounded-3xl"
          >
            {/* Animated particles backing effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 select-none overflow-hidden">
              <span className="text-5xl animate-bounce absolute top-10 left-10">✨</span>
              <span className="text-4xl animate-pulse absolute bottom-12 right-12">🌟</span>
              <span className="text-5xl animate-bounce absolute top-1/4 right-8">🎉</span>
              <span className="text-3xl animate-pulse absolute bottom-1/3 left-16">💖</span>
            </div>

            {(() => {
              const b = BADGES.find(x => x.id === badgeAwarded) || BADGES[2]; // fallback to master badge if all
              return (
                <motion.div
                  initial={{ scale: 0.8, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 30 }}
                  className="max-w-md w-full bg-slate-900 border-2 border-teal-500/40 p-8 rounded-3xl shadow-2xl relative space-y-6"
                >
                  <Award className="w-10 h-10 text-teal-400 absolute top-4 left-4 opacity-40" />
                  
                  {/* Glowing Medallion */}
                  <div className="flex justify-center py-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 6 }}
                      className={`w-28 h-28 rounded-full bg-gradient-to-tr ${b.badgeBg} p-1 border-4 ${b.borderGlow} flex items-center justify-center shadow-2xl relative`}
                    >
                      <span className="text-5xl">{b.emoji}</span>
                      <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse scale-105" />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded bg-teal-950/50 text-teal-400 border border-teal-800 text-[10px] font-black uppercase tracking-widest">
                      নতুন ডিজিটাল মেডেল অর্জিত!
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">{b.title}</h3>
                    <p className="text-xs font-mono text-slate-500 italic uppercase">{b.subtitle}</p>
                  </div>

                  <p className="text-slate-300 text-sm max-w-xs mx-auto">
                    {b.desc} আপনার মেডেল বোর্ডে এটি সফলভাবে যুক্ত করা হয়েছে।
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={() => { playWhooshSound(); setBadgeAwarded(null); }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      অসাধারণ! ধন্যবাদ
                    </button>
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ===================================================================================================
   6. INTERACTIVE ACTIVITIES & GAMES SUB TAB
   =================================================================================================== */

function ActivitiesSubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const [activeGame, setActiveGame] = useState<'carsign' | 'vowelsort' | 'wordbuilder' | 'fillblanks' | 'leftright' | 'consonantsort' | 'poemmatch' | 'tuliroom' | 'dayssort' | 'wordchain'>('carsign');

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Game selector sub-bar */}
      <div className="flex flex-wrap justify-center gap-2 bg-slate-950/30 p-2.5 rounded-2xl border border-slate-800/40">
        <button
          onClick={() => { playWhooshSound(); setActiveGame('carsign'); speak("কারচিহ্ন মেলাও"); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeGame === 'carsign' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-900/20'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>১. কারচিহ্ন মেলানো</span>
        </button>

        <button
          onClick={() => { playWhooshSound(); setActiveGame('vowelsort'); speak("স্বরবর্ণ সাজাও"); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeGame === 'vowelsort' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-900/20'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>২. স্বরবর্ণ সাজানো</span>
        </button>

        <button
          onClick={() => { playWhooshSound(); setActiveGame('wordbuilder'); speak("ছবি ও শব্দ মেলাও"); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeGame === 'wordbuilder' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-900/20'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>৩. ছবি ও শব্দ মেলানো</span>
        </button>

        <button
          onClick={() => { playWhooshSound(); setActiveGame('fillblanks'); speak("শূন্যস্থান পূরণ"); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeGame === 'fillblanks' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-900/20'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>৪. শূন্যস্থান পূরণ</span>
        </button>

        <button
          onClick={() => { playWhooshSound(); setActiveGame('leftright'); speak("বাম ডান মিল করো"); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeGame === 'leftright' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-900/20'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>৫. বাম ও ডান মেলানো</span>
        </button>

        <button
          onClick={() => { playWhooshSound(); setActiveGame('consonantsort'); speak("ব্যঞ্জনবর্ণ সাজাও"); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeGame === 'consonantsort' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-900/20'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>ব্যঞ্জনবর্ণ সাজানো</span>
        </button>

        <button
          onClick={() => { playWhooshSound(); setActiveGame('poemmatch'); speak("ভোর হলো শব্দ মেলানো"); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeGame === 'poemmatch' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-900/20'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>ভোর হলো শব্দ মেলানো</span>
        </button>

        <button
          onClick={() => { playWhooshSound(); setActiveGame('tuliroom'); speak("তুলির ঘরের জিনিস মেলানো"); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeGame === 'tuliroom' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-900/20'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>তুলির ঘর মেলানো</span>
        </button>

        <button
          onClick={() => { playWhooshSound(); setActiveGame('dayssort'); speak("সাত দিন ক্রমানুসারে সাজাও"); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeGame === 'dayssort' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-900/20'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>সাত দিনের রেলগাড়ি</span>
        </button>

        <button
          onClick={() => { playWhooshSound(); setActiveGame('wordchain'); speak("শব্দ নিয়ে খেলা"); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
            activeGame === 'wordchain' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-900/20'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>শব্দ নিয়ে খেলা</span>
        </button>
      </div>

      {/* Game Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeGame}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-8 shadow-xl min-h-[400px]"
        >
          {activeGame === 'carsign' && <CarSignGame speak={speak} />}
          {activeGame === 'vowelsort' && <VowelSortGame speak={speak} />}
          {activeGame === 'wordbuilder' && <WordBuilderGame speak={speak} />}
          {activeGame === 'fillblanks' && <FillBlanksGame speak={speak} />}
          {activeGame === 'leftright' && <LeftRightGame speak={speak} />}
          {activeGame === 'consonantsort' && <ConsonantSortGame speak={speak} />}
          {activeGame === 'poemmatch' && <PoemMatchGame speak={speak} />}
          {activeGame === 'tuliroom' && <TuliRoomGame speak={speak} />}
          {activeGame === 'dayssort' && <DaysSortGame speak={speak} />}
          {activeGame === 'wordchain' && <WordChainGame speak={speak} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ===================================================================================================
   6.1. GAME 1: CAR SIGN MATCHING GAME
   =================================================================================================== */

function CarSignGame({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const CAR_SIGNS = [
    { vowel: 'আ', sign: 'া', name: 'আ-কার' },
    { vowel: 'ই', sign: 'ি', name: 'ই-কার' },
    { vowel: 'ঈ', sign: 'ী', name: 'ঈ-কার' },
    { vowel: 'উ', sign: 'ু', name: 'উ-কার' },
    { vowel: 'ঊ', sign: 'ূ', name: 'ঊ-কার' },
    { vowel: 'ঋ', sign: 'ৃ', name: 'ঋ-কার' },
    { vowel: 'এ', sign: 'ে', name: 'এ-কার' },
    { vowel: 'ঐ', sign: 'ৈ', name: 'ঐ-কার' },
    { vowel: 'ও', sign: 'ো', name: 'ও-কার' },
    { vowel: 'ঔ', sign: 'ৌ', name: 'ঔ-কার' }
  ];

  const [shuffledSigns, setShuffledSigns] = useState<{ vowel: string; sign: string; name: string }[]>([]);
  const [selectedVowel, setSelectedVowel] = useState<string | null>(null);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // vowel -> sign
  const [wobbleVowel, setWobbleVowel] = useState<string | null>(null);
  const [wobbleSign, setWobbleSign] = useState<string | null>(null);

  useEffect(() => {
    setShuffledSigns([...CAR_SIGNS].sort(() => Math.random() - 0.5));
  }, []);

  const resetGame = () => {
    playWhooshSound();
    setSelectedVowel(null);
    setSelectedSign(null);
    setMatches({});
    setShuffledSigns([...CAR_SIGNS].sort(() => Math.random() - 0.5));
    speak("চলো আবার খেলা শুরু করি!");
  };

  const handleVowelClick = (vowel: string) => {
    if (matches[vowel]) return;
    playWhooshSound();
    setSelectedVowel(vowel);

    // If a sign is already selected, check match
    if (selectedSign) {
      checkMatch(vowel, selectedSign);
    } else {
      speak(`${vowel}`);
    }
  };

  const handleSignClick = (sign: string) => {
    const isAlreadyMatched = Object.values(matches).includes(sign);
    if (isAlreadyMatched) return;

    playWhooshSound();
    setSelectedSign(sign);

    if (selectedVowel) {
      checkMatch(selectedVowel, sign);
    } else {
      const signObj = CAR_SIGNS.find(item => item.sign === sign);
      if (signObj) speak(signObj.name);
    }
  };

  const checkMatch = (vowel: string, sign: string) => {
    const correctPair = CAR_SIGNS.find(item => item.vowel === vowel && item.sign === sign);
    if (correctPair) {
      playSuccessSound();
      setMatches(prev => ({ ...prev, [vowel]: sign }));
      setSelectedVowel(null);
      setSelectedSign(null);
      speak(`${vowel} কারে ${correctPair.name}`);
    } else {
      setWobbleVowel(vowel);
      setWobbleSign(sign);
      speak("ভুল হয়েছে, আবার চেষ্টা করো");
      setTimeout(() => {
        setWobbleVowel(null);
        setWobbleSign(null);
        setSelectedVowel(null);
        setSelectedSign(null);
      }, 600);
    }
  };

  const isGameOver = Object.keys(matches).length === CAR_SIGNS.length;

  return (
    <div className="space-y-6 text-center">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center justify-center gap-2">
          🎯 কারচিহ্ন মেলানো (Match Vowel to Sign)
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          বামের স্বরবর্ণের সাথে ডানের সঠিক কারচিহ্নটি মিলিয়ে মেলাও!
        </p>
      </div>

      {isGameOver ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950/40 p-8 rounded-2xl border border-teal-500/30 max-w-md mx-auto space-y-4"
        >
          <Award className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
          <h4 className="text-2xl font-black text-white">চমৎকার! দারুণ হয়েছে! 🎉</h4>
          <p className="text-sm text-slate-300">তুমি সবগুলো কারচিহ্ন সঠিকভাবে মিলিয়ে ফেলেছ!</p>
          <button
            onClick={resetGame}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-sm transition-all"
          >
            আবার খেলো (Play Again)
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto py-4">
          {/* Vowels column */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">স্বরবর্ণ (Vowels)</span>
            {CAR_SIGNS.map((item) => {
              const isMatched = !!matches[item.vowel];
              const isSelected = selectedVowel === item.vowel;
              const isWobbling = wobbleVowel === item.vowel;

              return (
                <motion.button
                  key={item.vowel}
                  onClick={() => handleVowelClick(item.vowel)}
                  animate={isWobbling ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`w-full py-3 px-4 rounded-xl font-black text-lg border transition-all flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 cursor-not-allowed'
                      : isSelected
                      ? 'bg-teal-500/20 border-teal-500 text-white scale-105 shadow-md shadow-teal-950/20'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{item.vowel}</span>
                  {isMatched && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* Signs column */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">কারচিহ্ন (Signs)</span>
            {shuffledSigns.map((item) => {
              const isMatched = Object.values(matches).includes(item.sign);
              const isSelected = selectedSign === item.sign;
              const isWobbling = wobbleSign === item.sign;

              return (
                <motion.button
                  key={item.sign}
                  onClick={() => handleSignClick(item.sign)}
                  animate={isWobbling ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`w-full py-3 px-4 rounded-xl font-black text-xl border transition-all flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 cursor-not-allowed'
                      : isSelected
                      ? 'bg-teal-500/20 border-teal-500 text-white scale-105 shadow-md shadow-teal-950/20'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-sans font-black">{item.sign}</span>
                  {isMatched && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================================================================================================
   6.2. GAME 2: VOWEL ORDER SORTING GAME
   =================================================================================================== */

function VowelSortGame({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const CORRECT_ORDER = ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'];

  const [shuffled, setShuffled] = useState<string[]>([]);
  const [placed, setPlaced] = useState<string[]>([]);
  const [wobbleIndex, setWobbleIndex] = useState<number | null>(null);

  const initGame = () => {
    setShuffled([...CORRECT_ORDER].sort(() => Math.random() - 0.5));
    setPlaced([]);
    setWobbleIndex(null);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleLetterClick = (letter: string, index: number) => {
    const nextExpectedLetter = CORRECT_ORDER[placed.length];
    if (letter === nextExpectedLetter) {
      playSuccessSound();
      setPlaced(prev => [...prev, letter]);
      setShuffled(prev => prev.filter((_, i) => i !== index));
      speak(letter);
    } else {
      setWobbleIndex(index);
      speak("ভুল হয়েছে, বর্ণমালার ক্রমানুসারে সাজাও");
      setTimeout(() => setWobbleIndex(null), 500);
    }
  };

  const isCompleted = placed.length === CORRECT_ORDER.length;

  return (
    <div className="space-y-6 text-center">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center justify-center gap-2">
          🎯 স্বরবর্ণ সাজানো (Alphabet Ordering Game)
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          অ থেকে ঔ পর্যন্ত স্বরবর্ণগুলো ক্রমানুসারে একটি একটি করে ক্লিক করে সাজাও!
        </p>
      </div>

      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950/40 p-8 rounded-2xl border border-teal-500/30 max-w-md mx-auto space-y-4"
        >
          <Award className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
          <h4 className="text-2xl font-black text-white">বিজয় অর্জন! 🏆</h4>
          <p className="text-sm text-slate-300">তুমি দারুণভাবে সবগুলো স্বরবর্ণ ক্রমানুসারে সাজিয়ে ফেলেছ!</p>
          <button
            onClick={initGame}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-sm transition-all"
          >
            আবার খেলো (Play Again)
          </button>
        </motion.div>
      )}

      {/* Target slots */}
      <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800/80 max-w-xl mx-auto space-y-4">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">তোমার সাজানো স্বরবর্ণ</span>
        <div className="flex flex-wrap justify-center gap-2 min-h-[50px] items-center">
          {CORRECT_ORDER.map((letter, index) => {
            const hasPlaced = placed[index] === letter;
            return (
              <div
                key={index}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-black text-lg border transition-all ${
                  hasPlaced
                    ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border-emerald-500 text-white scale-105 shadow-inner'
                    : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
                }`}
              >
                {hasPlaced ? letter : ''}
              </div>
            );
          })}
        </div>
      </div>

      {/* Shuffled pool of letters */}
      {!isCompleted && (
        <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-850 max-w-xl mx-auto">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">নিচের স্বরবর্ণগুলো ক্লিক করো</span>
          <div className="flex flex-wrap justify-center gap-3">
            {shuffled.map((letter, index) => {
              const isWobbling = wobbleIndex === index;
              return (
                <motion.button
                  key={index}
                  onClick={() => handleLetterClick(letter, index)}
                  animate={isWobbling ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500 text-white font-black text-xl flex items-center justify-center transition-all shadow-md active:scale-90"
                >
                  {letter}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================================================================================================
   6.3. GAME 3: WORD BUILDER / IMAGE-WORD MATCHING
   =================================================================================================== */

function WordBuilderGame({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const PICTURE_WORDS = [
    { id: '1', emoji: '📖', word: 'বই', spelling: 'ব-ই' },
    { id: '2', emoji: '🦢', word: 'বক', spelling: 'ব-ক' },
    { id: '3', emoji: '🪜', word: 'মই', spelling: 'ম-ই' },
    { id: '4', emoji: '🥛', word: 'মগ', spelling: 'ম-গ' },
    { id: '5', emoji: '🥭', word: 'আম', spelling: 'আ-ম' },
    { id: '6', emoji: '🐦', word: 'পাখি', spelling: 'পা-খি' }
  ];

  const [shuffledImages, setShuffledImages] = useState<any[]>([]);
  const [shuffledWords, setShuffledWords] = useState<any[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wobbleImageId, setWobbleImageId] = useState<string | null>(null);
  const [wobbleWordId, setWobbleWordId] = useState<string | null>(null);

  const initGame = () => {
    setSelectedImageId(null);
    setSelectedWordId(null);
    setMatchedIds([]);
    setShuffledImages([...PICTURE_WORDS].sort(() => Math.random() - 0.5));
    setShuffledWords([...PICTURE_WORDS].sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleImageClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    playWhooshSound();
    setSelectedImageId(id);

    if (selectedWordId) {
      checkMatch(id, selectedWordId);
    } else {
      const item = PICTURE_WORDS.find(x => x.id === id);
      if (item) speak("এই ছবিটির নাম কি?");
    }
  };

  const handleWordClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    playWhooshSound();
    setSelectedWordId(id);

    if (selectedImageId) {
      checkMatch(selectedImageId, id);
    } else {
      const item = PICTURE_WORDS.find(x => x.id === id);
      if (item) speak(item.word);
    }
  };

  const checkMatch = (imgId: string, wrdId: string) => {
    if (imgId === wrdId) {
      playSuccessSound();
      setMatchedIds(prev => [...prev, imgId]);
      setSelectedImageId(null);
      setSelectedWordId(null);
      const matchedItem = PICTURE_WORDS.find(x => x.id === imgId);
      if (matchedItem) {
        speak(`${matchedItem.word}। ${matchedItem.spelling} ${matchedItem.word}`);
      }
    } else {
      setWobbleImageId(imgId);
      setWobbleWordId(wrdId);
      speak("ভুল হয়েছে, সঠিক ছবি ও শব্দ মেলাও");
      setTimeout(() => {
        setWobbleImageId(null);
        setWobbleWordId(null);
        setSelectedImageId(null);
        setSelectedWordId(null);
      }, 500);
    }
  };

  const isCompleted = matchedIds.length === PICTURE_WORDS.length;

  return (
    <div className="space-y-6 text-center">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center justify-center gap-2">
          🎯 ছবি ও শব্দ মেলানো (Picture to Word Builder)
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          বইয়ের ছবি দেখে ছবির সাথে সঠিক বাংলা শব্দটির মিল করো!
        </p>
      </div>

      {isCompleted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950/40 p-8 rounded-2xl border border-teal-500/30 max-w-md mx-auto space-y-4"
        >
          <Award className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
          <h4 className="text-2xl font-black text-white">দারুণ বিজয়! 🎉</h4>
          <p className="text-sm text-slate-300">তুমি সবগুলো ছবি ও শব্দ সঠিকভাবে মিলিয়ে ফেলেছ!</p>
          <button
            onClick={initGame}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-sm transition-all"
          >
            আবার খেলো (Play Again)
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto py-4">
          {/* Images column */}
          <div className="space-y-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">ছবি (Pictures)</span>
            {shuffledImages.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedImageId === item.id;
              const isWobbling = wobbleImageId === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleImageClick(item.id)}
                  animate={isWobbling ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`w-full py-4 rounded-2xl border text-4xl flex items-center justify-center transition-all relative ${
                    isMatched
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'bg-teal-500/20 border-teal-500 scale-105 shadow-md shadow-teal-950/20'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{item.customEmoji || item.emoji}</span>
                  {isMatched && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-slate-950" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Words column */}
          <div className="space-y-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">শব্দ (Words)</span>
            {shuffledWords.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedWordId === item.id;
              const isWobbling = wobbleWordId === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleWordClick(item.id)}
                  animate={isWobbling ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`w-full py-4 rounded-2xl border text-xl font-bold flex items-center justify-center transition-all relative ${
                    isMatched
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-50 cursor-not-allowed text-emerald-400'
                      : isSelected
                      ? 'bg-teal-500/20 border-teal-500 scale-105 shadow-md shadow-teal-950/20 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{item.word}</span>
                  {isMatched && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-slate-950" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================================================================================================
   6.4. GAME 4: FILL IN THE BLANKS
   =================================================================================================== */

function FillBlanksGame({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const QUESTIONS = [
    {
      sentence: "উড়ে উড়ে যায় ________",
      options: ["পাখি", "বাড়ি"],
      correct: "পাখি",
      translation: "The bird flies away",
      soundText: "উড়ে উড়ে যায় পাখি।"
    },
    {
      sentence: "জলে ভাসে ________",
      options: ["ঘড়ি", "মাছ"],
      correct: "মাছ",
      translation: "Fish floats in water",
      soundText: "জলে ভাসে মাছ।"
    },
    {
      sentence: "মেঘ উড়ে ________",
      options: ["যায়", "চায়"],
      correct: "যায়",
      translation: "The cloud flies away",
      soundText: "মেঘ উড়ে যায়।"
    },
    {
      sentence: "পাখি গায় ________",
      options: ["গান", "ধান"],
      correct: "গান",
      translation: "The bird sings a song",
      soundText: "পাখি গায় গান।"
    },
    {
      sentence: "আজ অনেক ________। খুব গরম লাগছে।",
      options: ["রোদ", "মেঘ"],
      correct: "রোদ",
      translation: "Today is very sunny. It feels very hot.",
      soundText: "আজ অনেক রোদ। খুব গরম লাগছে।"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnsweredCorrectly(null);
    setScore(0);
    setIsFinished(false);
    speak("চলো বাক্য পূরণ করি!");
  };

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    const q = QUESTIONS[currentIndex];
    if (option === q.correct) {
      playSuccessSound();
      setIsAnsweredCorrectly(true);
      setScore(prev => prev + 1);
      speak(`সঠিক! ${q.soundText}`);
    } else {
      setIsAnsweredCorrectly(false);
      speak("ভুল হয়েছে, আবার চেষ্টা করো!");
    }
  };

  const handleNext = () => {
    playWhooshSound();
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnsweredCorrectly(null);
    } else {
      setIsFinished(true);
      speak(`খেলা শেষ হয়েছে। তোমার মোট স্কোর ${score}`);
    }
  };

  const currentQ = QUESTIONS[currentIndex];

  return (
    <div className="space-y-6 text-center">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center justify-center gap-2">
          🎯 বাক্য পূরণ করো (Fill in the Blanks)
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          বইয়ের লাইনগুলো সম্পূর্ণ করতে শূন্যস্থানে সঠিক শব্দটি নির্বাচন করো!
        </p>
      </div>

      {isFinished ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950/40 p-8 rounded-2xl border border-teal-500/30 max-w-md mx-auto space-y-4"
        >
          <Award className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
          <h4 className="text-2xl font-black text-white">অভিনন্দন! 🎓</h4>
          <p className="text-sm text-slate-300">তুমি সফলভাবে বাক্য পূরণ সম্পন্ন করেছ!</p>
          <p className="text-lg font-bold text-teal-400">তোমার প্রাপ্ত পয়েন্ট: {score} / {QUESTIONS.length}</p>
          <button
            onClick={resetGame}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-sm transition-all"
          >
            আবার খেলো (Play Again)
          </button>
        </motion.div>
      ) : (
        <div className="bg-slate-950/40 border border-slate-800/60 p-6 sm:p-10 rounded-2xl max-w-lg mx-auto space-y-6">
          <div className="flex justify-between text-xs text-slate-500 font-bold border-b border-slate-850 pb-3">
            <span>প্রশ্ন {currentIndex + 1} / {QUESTIONS.length}</span>
            <span>স্কোর: {score}</span>
          </div>

          <div className="py-4 space-y-2">
            <h4 className="text-2xl sm:text-3xl font-black text-white leading-relaxed animate-pulse">
              {currentQ.sentence.replace("________", selectedOption && isAnsweredCorrectly ? selectedOption : "______")}
            </h4>
            <p className="text-xs text-slate-400 font-mono italic">{currentQ.translation}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {currentQ.options.map((option) => {
              const isSelected = selectedOption === option;
              const isCorrectOption = option === currentQ.correct;

              let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
              if (selectedOption !== null) {
                if (isSelected) {
                  btnStyle = isAnsweredCorrectly
                    ? "bg-emerald-950/50 border-emerald-500 text-emerald-400 scale-105"
                    : "bg-rose-950/50 border-rose-500 text-rose-400";
                } else if (isCorrectOption) {
                  btnStyle = "bg-emerald-950/30 border-emerald-500/50 text-emerald-400/80";
                } else {
                  btnStyle = "bg-slate-950 border-slate-900 text-slate-600 opacity-50";
                }
              }

              return (
                <button
                  key={option}
                  disabled={selectedOption !== null}
                  onClick={() => handleOptionClick(option)}
                  className={`py-3 rounded-xl border text-lg font-black transition-all ${btnStyle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 border-t border-slate-850"
            >
              <button
                onClick={handleNext}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-sm transition-all shadow-md"
              >
                {currentIndex < QUESTIONS.length - 1 ? "পরবর্তী প্রশ্ন (Next)" : "ফলাফল দেখো (Results)"}
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

/* ===================================================================================================
   6.5. GAME 5: LEFT AND RIGHT MATCH LINE GAME
   =================================================================================================== */

function LeftRightGame({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const PAIRS = [
    { left: 'নদী', right: 'নৌকা', speech: 'নদীতে চলে নৌকা' },
    { left: 'পাখি', right: 'গান', speech: 'পাখি গায় গান' },
    { left: 'সবুজ', right: 'পাতা', speech: 'সবুজ পাতা' },
    { left: 'ঝড়', right: 'বাতাস', speech: 'ঝড়ে বাতাস বয়' },
    { left: 'ঘুম', right: 'বিছানা', speech: 'ঘুমাই বিছানায়' }
  ];

  const [shuffledLeft, setShuffledLeft] = useState<string[]>([]);
  const [shuffledRight, setShuffledRight] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // left -> right
  const [wobbleLeft, setWobbleLeft] = useState<string | null>(null);
  const [wobbleRight, setWobbleRight] = useState<string | null>(null);

  const initGame = () => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatches({});
    setShuffledLeft([...PAIRS].map(p => p.left).sort(() => Math.random() - 0.5));
    setShuffledRight([...PAIRS].map(p => p.right).sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleLeftClick = (item: string) => {
    if (matches[item]) return;
    playWhooshSound();
    setSelectedLeft(item);

    if (selectedRight) {
      checkMatch(item, selectedRight);
    } else {
      speak(item);
    }
  };

  const handleRightClick = (item: string) => {
    const isMatched = Object.values(matches).includes(item);
    if (isMatched) return;
    playWhooshSound();
    setSelectedRight(item);

    if (selectedLeft) {
      checkMatch(selectedLeft, item);
    } else {
      speak(item);
    }
  };

  const checkMatch = (l: string, r: string) => {
    const correctPair = PAIRS.find(p => p.left === l && p.right === r);
    if (correctPair) {
      playSuccessSound();
      setMatches(prev => ({ ...prev, [l]: r }));
      setSelectedLeft(null);
      setSelectedRight(null);
      speak(`${l}... ${r}। ${correctPair.speech}`);
    } else {
      setWobbleLeft(l);
      setWobbleRight(r);
      speak("ভুল হয়েছে, আবার মেলাও");
      setTimeout(() => {
        setWobbleLeft(null);
        setWobbleRight(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
    }
  };

  const isCompleted = Object.keys(matches).length === PAIRS.length;

  return (
    <div className="space-y-6 text-center">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center justify-center gap-2">
          🎯 বাম-ডান মিল করো (Left-Right Word Matcher)
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          বামপাশের শব্দের সাথে মিল রেখে ডানপাশের সঠিক সম্পর্কযুক্ত শব্দটি নির্বাচন করো!
        </p>
      </div>

      {isCompleted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950/40 p-8 rounded-2xl border border-teal-500/30 max-w-md mx-auto space-y-4"
        >
          <Award className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
          <h4 className="text-2xl font-black text-white">অসাধারণ হয়েছে! 🌟</h4>
          <p className="text-sm text-slate-300">তুমি সবগুলো সম্পর্কযুক্ত शब्द সফলভাবে মিলিয়ে ফেলেছ!</p>
          <button
            onClick={initGame}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-sm transition-all"
          >
            আবার খেলো (Play Again)
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto py-4">
          {/* Left Column */}
          <div className="space-y-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">বাম দিক (Left)</span>
            {shuffledLeft.map((item) => {
              const isMatched = !!matches[item];
              const isSelected = selectedLeft === item;
              const isWobbling = wobbleLeft === item;

              return (
                <motion.button
                  key={item}
                  onClick={() => handleLeftClick(item)}
                  animate={isWobbling ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-base sm:text-lg border transition-all flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-50 cursor-not-allowed text-emerald-400'
                      : isSelected
                      ? 'bg-teal-500/20 border-teal-500 scale-105 shadow-md shadow-teal-950/20 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{item}</span>
                  {isMatched && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">ডান দিক (Right)</span>
            {shuffledRight.map((item) => {
              const isMatched = Object.values(matches).includes(item);
              const isSelected = selectedRight === item;
              const isWobbling = wobbleRight === item;

              return (
                <motion.button
                  key={item}
                  onClick={() => handleRightClick(item)}
                  animate={isWobbling ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-base sm:text-lg border transition-all flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-50 cursor-not-allowed text-emerald-400'
                      : isSelected
                      ? 'bg-teal-500/20 border-teal-500 scale-105 shadow-md shadow-teal-950/20 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{item}</span>
                  {isMatched && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================================================================================================
   6.6. GAME 6: CONSONANT SORT GAME (ব্যঞ্জনবর্ণ সাজানো)
   =================================================================================================== */
function ConsonantSortGame({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const CORRECT_ORDER = ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ'];
  const [scrambled, setScrambled] = useState<string[]>([]);
  const [placed, setPlaced] = useState<(string | null)[]>(Array(10).fill(null));
  const [hasWon, setHasWon] = useState(false);

  const initGame = () => {
    const shuffled = [...CORRECT_ORDER].sort(() => Math.random() - 0.5);
    setScrambled(shuffled);
    setPlaced(Array(10).fill(null));
    setHasWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handlePlaceLetter = (letter: string) => {
    playWhooshSound();
    speak(letter);
    
    const nextIdx = placed.findIndex(item => item === null);
    if (nextIdx === -1) return;

    if (letter === CORRECT_ORDER[nextIdx]) {
      const newPlaced = [...placed];
      newPlaced[nextIdx] = letter;
      setPlaced(newPlaced);

      setScrambled(prev => prev.filter(l => l !== letter));

      if (nextIdx === 9) {
        setHasWon(true);
        playSuccessSound();
        speak("চমৎকার! তুমি সবগুলো ব্যঞ্জনবর্ণ সঠিক নিয়মে সাজিয়ে ফেলেছ!");
      }
    } else {
      speak("ভুল হয়েছে, আবার চেষ্টা করো!");
    }
  };

  return (
    <div className="space-y-6 text-center max-w-2xl mx-auto">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-amber-400">🎨 পাঠ ২৫: ব্যঞ্জনবর্ণ সাজানো</h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          ক থেকে ঞ পর্যন্ত ব্যঞ্জনবর্ণগুলো উল্টোপাল্টা আছে। সঠিক ক্রমে একটির পর একটি ক্লিক করে সাজাও!
        </p>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 p-4 bg-slate-950/40 rounded-2xl border border-slate-800/60 min-h-[70px] items-center justify-center">
        {CORRECT_ORDER.map((correctLetter, idx) => {
          const letter = placed[idx];
          return (
            <div
              key={idx}
              className={`aspect-square sm:h-12 flex flex-col items-center justify-center rounded-xl border-2 font-black text-lg transition-all ${
                letter 
                  ? 'bg-emerald-500 border-emerald-400 text-slate-950 scale-105'
                  : 'bg-slate-900/40 border-dashed border-slate-800 text-slate-600'
              }`}
            >
              {letter || toBengaliNum(idx + 1)}
            </div>
          );
        })}
      </div>

      {hasWon ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-emerald-950/20 border border-emerald-500/40 p-6 rounded-2xl space-y-4"
        >
          <Trophy className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
          <h4 className="text-lg font-black text-emerald-400">🎉 অভিনন্দন! তুমি জিতে গেছ! 🎉</h4>
          <p className="text-xs text-slate-300">ক খ গ ঘ ঙ চ ছ জ ঝ ঞ সঠিক ক্রমে সাজানো হয়েছে।</p>
          <button
            onClick={initGame}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-xs transition-all"
          >
            আবার খেলো (Play Again)
          </button>
        </motion.div>
      ) : (
        <div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">নিচের বর্ণগুলোতে ক্লিক করো:</span>
          <div className="flex flex-wrap justify-center gap-3">
            {scrambled.map((letter) => (
              <motion.button
                key={letter}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlaceLetter(letter)}
                className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500 text-white font-black text-xl flex items-center justify-center transition-all shadow-md active:bg-slate-800"
              >
                {letter}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================================================================================================
   6.7. GAME 7: MORNING POEM MATCH GAME (ভোর হলো শব্দ মেলানো)
   =================================================================================================== */
function PoemMatchGame({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const PAIRS = [
    { left: 'চাঁদ', right: 'মামা', speech: 'চাঁদ মামা' },
    { left: 'খুলি', right: 'হাল', speech: 'খুলি হাল' },
    { left: 'চোখ', right: 'খুলল', speech: 'চোখ খুলল' },
    { left: 'টিপ', right: 'কপালে', speech: 'টিপ কপালে' }
  ];

  const [shuffledLeft, setShuffledLeft] = useState<string[]>([]);
  const [shuffledRight, setShuffledRight] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [hasWon, setHasWon] = useState(false);

  const initGame = () => {
    setShuffledLeft([...PAIRS.map(p => p.left)].sort(() => Math.random() - 0.5));
    setShuffledRight([...PAIRS.map(p => p.right)].sort(() => Math.random() - 0.5));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatches({});
    setHasWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleLeftClick = (item: string) => {
    if (matches[item]) return;
    playWhooshSound();
    speak(item);
    setSelectedLeft(item);

    if (selectedRight) {
      checkMatch(item, selectedRight);
    }
  };

  const handleRightClick = (item: string) => {
    if (Object.values(matches).includes(item)) return;
    playWhooshSound();
    speak(item);
    setSelectedRight(item);

    if (selectedLeft) {
      checkMatch(selectedLeft, item);
    }
  };

  const checkMatch = (leftVal: string, rightVal: string) => {
    const pair = PAIRS.find(p => p.left === leftVal && p.right === rightVal);
    if (pair) {
      playSuccessSound();
      speak(pair.speech);
      const newMatches = { ...matches, [leftVal]: rightVal };
      setMatches(newMatches);
      setSelectedLeft(null);
      setSelectedRight(null);

      if (Object.keys(newMatches).length === PAIRS.length) {
        setHasWon(true);
        playSuccessSound();
        speak("বাহ! দারুণ! তুমি সব শব্দ জোড়া মিলিয়ে ফেলেছ!");
      }
    } else {
      speak("মিলল না, অন্য আরেকটি চেষ্টা করো!");
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  return (
    <div className="space-y-6 text-center max-w-xl mx-auto">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-amber-400">📖 পাঠ ১৭: দাগ টেনে মেলাই</h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          বইয়ের ছড়ার শব্দের সাথে শব্দ মিলিয়ে জোড়া তৈরি করো! বাম পাশের শব্দ সিলেক্ট করে ডান পাশের সঠিক শব্দে ক্লিক করো।
        </p>
      </div>

      {hasWon ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-emerald-950/20 border border-emerald-500/40 p-6 rounded-2xl space-y-4"
        >
          <Trophy className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
          <h4 className="text-lg font-black text-emerald-400">🎉 দারুণ হয়েছে! 🎉</h4>
          <p className="text-xs text-slate-300">তুমি সকল জোড়া সঠিক মেলাতে পেরেছ:</p>
          <div className="text-sm font-bold text-white space-y-1">
            <p>🌙 চাঁদ ➡️ মামা</p>
            <p>⛵ খুলি ➡️ হাল</p>
            <p>👁️ চোখ ➡️ খুলল</p>
            <p>🔴 টিপ ➡️ কপালে</p>
          </div>
          <button
            onClick={initGame}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-xs transition-all"
          >
            আবার খেলো (Play Again)
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-8 py-4">
          <div className="space-y-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">বাম শব্দ</span>
            {shuffledLeft.map((item) => {
              const isMatched = !!matches[item];
              const isSelected = selectedLeft === item;

              return (
                <button
                  key={item}
                  onClick={() => handleLeftClick(item)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-base border transition-all ${
                    isMatched
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-50 cursor-not-allowed text-emerald-400'
                      : isSelected
                      ? 'bg-teal-500/20 border-teal-500 scale-105 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">ডান শব্দ</span>
            {shuffledRight.map((item) => {
              const isMatched = Object.values(matches).includes(item);
              const isSelected = selectedRight === item;

              return (
                <button
                  key={item}
                  onClick={() => handleRightClick(item)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-base border transition-all ${
                    isMatched
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-50 cursor-not-allowed text-emerald-400'
                      : isSelected
                      ? 'bg-teal-500/20 border-teal-500 scale-105 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================================================================================================
   6.8. GAME 8: TULI'S ROOM MATCHING GAME (তুলির ঘর মেলানো)
   =================================================================================================== */
function TuliRoomGame({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const ROOM_ITEMS = [
    { name: 'বিছানা', emoji: '🛏️' },
    { name: 'টেবিল', emoji: '🪵' },
    { name: 'চেয়ার', emoji: '🪑' },
    { name: 'বই', emoji: '📖' },
    { name: 'বল', emoji: '⚽' },
    { name: 'ডালিম', emoji: '🍎' },
    { name: 'তবলা', emoji: '🥁' },
    { name: 'বাতি', emoji: '💡' },
    { name: 'ঘড়ি', emoji: '⏰' },
    { name: 'চশমা', emoji: '👓' }
  ];

  const [activeItemIdx, setActiveItemIdx] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const generateRound = (currentIdx: number) => {
    if (currentIdx >= ROOM_ITEMS.length) {
      setHasCompleted(true);
      playSuccessSound();
      speak("চমৎকার! তুমি তুলির ঘরের দশটি জিনিষেরই নাম চিনে ফেলেছ!");
      return;
    }

    const currentItem = ROOM_ITEMS[currentIdx];
    const distractors = ROOM_ITEMS
      .filter(item => item.name !== currentItem.name)
      .map(item => item.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const shuffledChoices = [currentItem.name, ...distractors].sort(() => Math.random() - 0.5);
    setOptions(shuffledChoices);
    setActiveItemIdx(currentIdx);
    speak(`ছবি দেখে সঠিক শব্দটি বেছে নাও! এই ছবিতে কী দেখতে পাচ্ছ?`);
  };

  const initGame = () => {
    setScore(0);
    setHasCompleted(false);
    generateRound(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleSelectOption = (choice: string) => {
    const correctName = ROOM_ITEMS[activeItemIdx].name;
    if (choice === correctName) {
      playSuccessSound();
      speak(`বাহ! সঠিক হয়েছে! এটি হলো ${correctName}`);
      setScore(prev => prev + 1);
      setTimeout(() => {
        generateRound(activeItemIdx + 1);
      }, 1200);
    } else {
      speak(`ভুল হয়েছে! আবার চেষ্টা করো।`);
    }
  };

  return (
    <div className="space-y-6 text-center max-w-xl mx-auto">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-amber-400">🏠 পাঠ ৬৮: তুলির ঘর</h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          তুলির ঘরে অনেক জিনিস আছে। ছবির জিনিসটি চিনে তার সঠিক বাংলা নামটি নির্বাচন করো!
        </p>
      </div>

      {hasCompleted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-emerald-950/20 border border-emerald-500/40 p-6 rounded-2xl space-y-4"
        >
          <Trophy className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
          <h4 className="text-lg font-black text-emerald-400">🎉 অভিনন্দন! 🎉</h4>
          <p className="text-xs text-slate-300">তুমি তুলির ঘরের ১০টি জিনিসের নাম সঠিকভাবে মিলিয়েছ। স্কোর: {toBengaliNum(score)}/১০</p>
          <button
            onClick={initGame}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-xs transition-all"
          >
            আবার খেলো (Play Again)
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6 bg-slate-950/40 p-6 rounded-2xl border border-slate-800/60 max-w-sm mx-auto">
          <div className="text-xs text-slate-400 font-extrabold flex justify-between">
            <span>অগ্রগতি: {toBengaliNum(activeItemIdx + 1)}/{toBengaliNum(ROOM_ITEMS.length)}</span>
            <span>স্কোর: {toBengaliNum(score)}</span>
          </div>

          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-5xl sm:text-6xl mx-auto shadow-inner select-none">
            {ROOM_ITEMS[activeItemIdx]?.emoji}
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelectOption(opt)}
                className="w-full py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500 hover:bg-slate-850/50 text-white font-bold text-base transition-all active:scale-95"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================================================================================================
   6.9. GAME 9: DAYS OF THE WEEK TRAIN GAME (সাত দিনের রেলগাড়ি)
   =================================================================================================== */
function DaysSortGame({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const DAYS = ['শনিবার', 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার'];
  const [shuffledDays, setShuffledDays] = useState<string[]>([]);
  const [train, setTrain] = useState<(string | null)[]>(Array(7).fill(null));
  const [hasWon, setHasWon] = useState(false);

  const initGame = () => {
    setShuffledDays([...DAYS].sort(() => Math.random() - 0.5));
    setTrain(Array(7).fill(null));
    setHasWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handlePlaceDay = (day: string) => {
    playWhooshSound();
    speak(day);

    const nextIdx = train.findIndex(item => item === null);
    if (nextIdx === -1) return;

    if (day === DAYS[nextIdx]) {
      const newTrain = [...train];
      newTrain[nextIdx] = day;
      setTrain(newTrain);

      setShuffledDays(prev => prev.filter(d => d !== day));

      if (nextIdx === 6) {
        setHasWon(true);
        playSuccessSound();
        speak("অসাধারণ! তুমি সাত দিনের রেলগাড়িটি সঠিকভাবে তৈরি করে ফেলেছ!");
      }
    } else {
      speak("এটি ভুল দিন! সপ্তাহের দিনগুলো শুরু হয় শনিবার দিয়ে, আবার চেষ্টা করো!");
    }
  };

  return (
    <div className="space-y-6 text-center max-w-3xl mx-auto">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-amber-400">🚂 পাঠ ৭৪-৭৫: সাত দিনের রেলগাড়ি</h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          সপ্তাহের ৭টি দিন ক্রমানুসারে (শনিবার থেকে শুরু করে) রেলগাড়ির কামরায় সাজাও!
        </p>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex items-center gap-2 justify-start sm:justify-center min-w-[600px] px-4 py-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center shadow-lg border border-indigo-400 shrink-0">
            <span className="text-2xl">🚂</span>
            <span className="text-[10px] font-black text-white leading-none">ইঞ্জিন</span>
          </div>

          {DAYS.map((correctDay, idx) => {
            const day = train[idx];
            return (
              <div key={idx} className="flex items-center gap-1 shrink-0">
                <div className="w-1.5 h-1 bg-slate-700"></div>
                <div
                  className={`w-20 h-16 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    day
                      ? 'bg-gradient-to-br from-teal-500 to-emerald-600 border-teal-400 text-slate-950 font-black scale-105'
                      : 'bg-slate-900 border-dashed border-slate-800 text-slate-600 font-bold'
                  }`}
                >
                  <span className="text-[10px] opacity-75">দিন {toBengaliNum(idx + 1)}</span>
                  <span className="text-xs sm:text-sm font-black">{day || '???'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {hasWon ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-emerald-950/20 border border-emerald-500/40 p-6 rounded-2xl space-y-4 max-w-md mx-auto"
        >
          <Trophy className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
          <h4 className="text-lg font-black text-emerald-400">🎉 অভিনন্দন! 🎉</h4>
          <p className="text-xs text-slate-300">রেলগাড়ি সম্পূর্ণ হয়েছে! শনিবার, রবিবার, সোমবার, মঙ্গলবার, বুধবার, বৃহস্পতিবার, শুক্রবার!</p>
          <button
            onClick={initGame}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-xs transition-all"
          >
            আবার খেলো (Play Again)
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">সঠিক দিনটি বেছে নাও:</span>
          <div className="flex flex-wrap justify-center gap-2.5">
            {shuffledDays.map((day) => (
              <button
                key={day}
                onClick={() => handlePlaceDay(day)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500 hover:text-white text-slate-300 font-bold text-sm transition-all active:scale-95"
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================================================================================================
   6.10. GAME 10: WORD CHAIN GAME (শব্দ নিয়ে খেলা)
   =================================================================================================== */
function WordChainGame({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const ROUNDS = [
    {
      chain: [
        { speaker: 'অভি', word: 'কলম', emoji: '🖊️' },
        { speaker: 'তুলি', word: 'ময়ূর', emoji: '🦚' },
        { speaker: 'রাফি', word: 'রাত', emoji: '🌃' },
        { speaker: 'মিলি', word: 'তাল', emoji: '🌴' }
      ],
      lastLetter: 'ল',
      options: [
        { word: 'লতা', isCorrect: true, emoji: '🌿', speech: 'লতা! ল দিয়ে লতা।' },
        { word: 'রস', isCorrect: false, emoji: '🥤', speech: 'না, রস র দিয়ে শুরু হয়।' },
        { word: 'ডাব', isCorrect: false, emoji: '🥥', speech: 'না, ডাব ড দিয়ে শুরু হয়।' }
      ],
      prompt: "এখন তোমার পালা! 'তাল' শব্দের শেষ অক্ষর 'ল'। 'ল' দিয়ে শুরু হওয়া সঠিক শব্দটি বেছে নাও:"
    },
    {
      chain: [
        { speaker: 'অভি', word: 'বক', emoji: '🦢' },
        { speaker: 'তুলি', word: 'কলা', emoji: '🍌' },
        { speaker: 'রাফি', word: 'আম', emoji: '🥭' }
      ],
      lastLetter: 'ম',
      options: [
        { word: 'মগ', isCorrect: true, emoji: '🥛', speech: 'মগ! ম দিয়ে মগ।' },
        { word: 'ঘর', isCorrect: false, emoji: '🏠', speech: 'না, ঘর ঘ দিয়ে শুরু হয়।' },
        { word: 'পথ', isCorrect: false, emoji: '🛣️', speech: 'না, পথ প দিয়ে শুরু হয়।' }
      ],
      prompt: "রাফি বলেছে 'আম'। আম শব্দের শেষ অক্ষর 'ম'। 'ম' দিয়ে শুরু হওয়া সঠিক শব্দটি বেছে নাও:"
    },
    {
      chain: [
        { speaker: 'অভি', word: 'ঘর', emoji: '🏠' },
        { speaker: 'তুলি', word: 'রস', emoji: '🥤' },
        { speaker: 'রাফি', word: 'সড়ক', emoji: '🛣️' }
      ],
      lastLetter: 'ক',
      options: [
        { word: 'কাক', isCorrect: true, emoji: '🐦', speech: 'কাক! ক দিয়ে কাক।' },
        { word: 'বক', isCorrect: false, emoji: '🦢', speech: 'না, বক ব দিয়ে শুরু হয়।' },
        { word: 'মই', isCorrect: false, emoji: '🪜', speech: 'না, মই ম দিয়ে শুরু হয়।' }
      ],
      prompt: "রাফি বলেছে 'সড়ক'। সড়ক শব্দের শেষ অক্ষর 'ক'। 'ক' দিয়ে শুরু হওয়া সঠিক শব্দটি বেছে নাও:"
    }
  ];

  const [currentRoundIdx, setCurrentRoundIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const activeRound = ROUNDS[currentRoundIdx];

  const initGame = () => {
    setCurrentRoundIdx(0);
    setScore(0);
    setHasCompleted(false);
    speak("চলো বইয়ের বন্ধুদের সাথে শব্দ নিয়ে খেলা খেলি!");
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleSelectOption = (opt: typeof ROUNDS[0]['options'][0]) => {
    if (opt.isCorrect) {
      playSuccessSound();
      speak(opt.speech + " অসাধারণ! তুমি শব্দ চেইন বাড়িয়ে দিয়েছ!");
      setScore(prev => prev + 1);

      setTimeout(() => {
        if (currentRoundIdx + 1 < ROUNDS.length) {
          setCurrentRoundIdx(prev => prev + 1);
        } else {
          setHasCompleted(true);
          playSuccessSound();
          speak("চমৎকার! তুমি বন্ধুদের সাথে সবগুলো রাউন্ডেই সঠিক শব্দ সাজিয়ে জিতে গেছ!");
        }
      }, 2500);
    } else {
      speak(opt.speech);
    }
  };

  return (
    <div className="space-y-6 text-center max-w-xl mx-auto">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-amber-400">🗣️ পাঠ ৮৮: শব্দ নিয়ে খেলা</h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          বন্ধুদের শব্দের শেষ অক্ষর দিয়ে নিজের সঠিক শব্দটি বেছে নিয়ে খেলার চেইনটি সম্পূর্ণ করো!
        </p>
      </div>

      {hasCompleted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-emerald-950/20 border border-emerald-500/40 p-6 rounded-2xl space-y-4"
        >
          <Trophy className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
          <h4 className="text-lg font-black text-emerald-400">🎉 অভিনন্দন! 🎉</h4>
          <p className="text-xs text-slate-300">তুমি শব্দ খেলায় অসাধারণ সাফল্য অর্জন করেছ! স্কোর: {toBengaliNum(score)}/{toBengaliNum(ROUNDS.length)}</p>
          <button
            onClick={initGame}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-xs transition-all"
          >
            আবার খেলো (Play Again)
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6 bg-slate-950/40 p-5 sm:p-6 rounded-2xl border border-slate-800/60 text-left">
          <div className="text-xs text-slate-400 font-extrabold flex justify-between mb-4 border-b border-slate-850 pb-2">
            <span>রাউন্ড: {toBengaliNum(currentRoundIdx + 1)}/{toBengaliNum(ROUNDS.length)}</span>
            <span>স্কোর: {toBengaliNum(score)}</span>
          </div>

          <div className="space-y-3 mb-6">
            {activeRound.chain.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-black text-teal-400">
                  {item.speaker[0]}
                </div>
                <div className="bg-slate-900 border border-slate-850/80 rounded-xl px-3 py-2 text-sm text-white flex items-center gap-2">
                  <span className="font-bold text-slate-400">{item.speaker}:</span>
                  <span className="font-black text-amber-400">{item.word}</span>
                  <span>{item.emoji}</span>
                </div>
                {index < activeRound.chain.length - 1 && (
                  <span className="text-slate-600 font-bold text-xs">➡️</span>
                )}
              </div>
            ))}

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-dashed border-slate-850">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-slate-950 font-black text-xs">
                তুমি
              </div>
              <div className="bg-teal-950/20 border border-teal-500/30 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-teal-300 font-bold animate-pulse">
                {activeRound.prompt}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {activeRound.options.map((opt) => (
              <button
                key={opt.word}
                onClick={() => handleSelectOption(opt)}
                className="p-3 bg-slate-900 border border-slate-800 hover:border-teal-500 rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="font-extrabold text-sm text-white">{opt.word}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================================================================================================
   7. PATH 3: MY SCHOOL SUB TAB (আমি ও আমার বিদ্যালয়)
   =================================================================================================== */
function SchoolSubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState<number | null>(null);
  const [friendName, setFriendName] = useState('');
  const [myName, setMyName] = useState(() => localStorage.getItem('c1_identity_name') || '');
  const playTimeoutRef = useRef<any>(null);

  const DIALOGUES = [
    { speaker: 'খুশি আপা', text: 'কেমন আছ সবাই?', emoji: '👩‍🏫', role: 'teacher' },
    { speaker: 'সবাই', text: 'ভালো আছি।', emoji: '👦👧', role: 'students' },
    { speaker: 'খুশি আপা', text: 'বিদ্যালয় কেমন লাগছে তোমাদের?', emoji: '👩‍🏫', role: 'teacher' },
    { speaker: 'রাফি ও তুলি', text: 'খুব ভালো লাগছে, আপা।', emoji: '👫', role: 'students' },
    { speaker: 'খুশি আপা', text: 'কত নতুন নতুন বন্ধু, তাই না? অনেক ভালো লাগবে। তোমার নাম কী?', emoji: '👩‍🏫', role: 'teacher' },
    { speaker: 'তপু', text: 'আমার নাম তপু।', emoji: '👦', role: 'student' },
    { speaker: 'খুশি আপা', text: 'তোমার নাম বলো।', emoji: '👩‍🏫', role: 'teacher' },
    { speaker: 'তুলি', text: 'আপা, আমার নাম তুলি।', emoji: '👧', role: 'student' },
    { speaker: 'খুশি আপা', text: 'এবার তোমরা একজন একজন করে নিজের নাম বলো।', emoji: '👩‍🏫', role: 'teacher' }
  ];

  // Stop auto play if component unmounts
  useEffect(() => {
    return () => {
      if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
    };
  }, []);

  const handleSpeakLine = async (index: number) => {
    if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
    setIsPlaying(false);
    setCurrentLine(index);
    playWhooshSound();
    await speak(`${DIALOGUES[index].speaker} বলেছেন: ${DIALOGUES[index].text}`);
  };

  const startAutoPlay = async () => {
    setIsPlaying(true);
    playWhooshSound();
    for (let i = 0; i < DIALOGUES.length; i++) {
      if (!isPlaying && i > 0) break; // Check state if cancelled
      setCurrentLine(i);
      await speak(`${DIALOGUES[i].speaker}: ${DIALOGUES[i].text}`);
      // Wait a little bit between lines
      await new Promise(resolve => {
        playTimeoutRef.current = setTimeout(resolve, 1500);
      });
    }
    setIsPlaying(false);
    setCurrentLine(null);
    playSuccessSound();
    speak("চমৎকার! পুরো কথোপকথনটি আমরা শুনলাম।");
  };

  const stopAutoPlay = () => {
    if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
    setIsPlaying(false);
    setCurrentLine(null);
    speak("থামানো হয়েছে।");
  };

  const handlePracticeIntroduction = () => {
    if (!friendName.trim()) {
      speak("দয়া করে তোমার সহপাঠীর নাম লেখো!");
      return;
    }
    const myText = myName ? myName : "আমি";
    const dialogue = `হ্যালো ${friendName}! আমি ${myText}। তোমার সাথে পরিচিত হয়ে খুব ভালো লাগলো! চলো আমরা একসাথে বিদ্যালয়ে নতুন নতুন অনেক কিছু শিখি আর খেলাধুলা করি।`;
    playSuccessSound();
    speak(dialogue);
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-2xl rounded-full"></div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <span className="px-3 py-1 text-xs font-black text-amber-400 bg-amber-950/40 rounded-full border border-amber-500/20 uppercase tracking-widest">পাঠ ৩</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 flex items-center justify-center gap-2">
            🏫 আমি ও আমার বিদ্যালয়
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            এসো খুশি আপা এবং বন্ধুদের সুন্দর কথাবার্তা শুনি ও নিজের নাম মুখে বলতে শিখি!
          </p>
        </div>

        {/* Classroom Interactive Graphic */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center">
          {/* Blackboard decoration */}
          <div className="w-full max-w-md bg-zinc-900 border-4 border-amber-950 rounded-lg p-3 text-center shadow-lg relative mb-6">
            <span className="text-[10px] uppercase font-bold text-amber-700 absolute top-1 left-1 bg-amber-950 px-1.5 rounded">ব্ল্যাকবোর্ড</span>
            <p className="text-lg sm:text-xl font-bold text-emerald-400 tracking-wide font-sans py-2">
              🎒 স্বাগতম প্রথম শ্রেণি! 🎒
            </p>
            <p className="text-xs text-slate-400">শুভ সকাল! আজ আমাদের ১ম দিন।</p>
          </div>

          {/* Quick interactive character cards */}
          <p className="text-xs text-amber-300 font-extrabold mb-3 flex items-center gap-1">👉 যেকোনো চরিত্রে ক্লিক করে তার গলার আওয়াজ শোনো:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg mb-4">
            <button
              onClick={() => {
                playWhooshSound();
                speak("আমি খুশি আপা। তোমাদের সবার নতুন শিক্ষক। কেমন আছো সবাই?");
              }}
              className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl flex flex-col items-center gap-1 transition-all group hover:border-teal-500"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">👩‍🏫</span>
              <span className="font-bold text-xs text-teal-300">খুশি আপা</span>
              <span className="text-[10px] text-slate-500">শিক্ষক</span>
            </button>

            <button
              onClick={() => {
                playWhooshSound();
                speak("আমি রাফি। চলো একসাথে নতুন ক্লাসে খেলি ও পড়ি!");
              }}
              className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl flex flex-col items-center gap-1 transition-all group hover:border-teal-500"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">👦</span>
              <span className="font-bold text-xs text-teal-300">রাফি</span>
              <span className="text-[10px] text-slate-500">সহপাঠী</span>
            </button>

            <button
              onClick={() => {
                playWhooshSound();
                speak("আমি তুলি। আমার নতুন স্কুল খুব ভালো লেগেছে!");
              }}
              className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl flex flex-col items-center gap-1 transition-all group hover:border-teal-500"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">👧</span>
              <span className="font-bold text-xs text-teal-300">তুলি</span>
              <span className="text-[10px] text-slate-500">সহপাঠী</span>
            </button>

            <button
              onClick={() => {
                playWhooshSound();
                speak("আমার নাম তপু। তোমাদের সাথে বন্ধু হতে চাই!");
              }}
              className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl flex flex-col items-center gap-1 transition-all group hover:border-teal-500"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">👶</span>
              <span className="font-bold text-xs text-teal-300">তপু</span>
              <span className="text-[10px] text-slate-500">সহপাঠী</span>
            </button>
          </div>
        </div>

        {/* Conversation Box */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-teal-400 flex items-center gap-2">
              💬 ক্লাসের কথোপকথন (Conversation)
            </h3>
            {isPlaying ? (
              <button
                onClick={stopAutoPlay}
                className="flex items-center gap-1 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs px-3 py-1.5 rounded-lg transition-all"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>থামাও (Stop)</span>
              </button>
            ) : (
              <button
                onClick={startAutoPlay}
                className="flex items-center gap-1 bg-teal-600 hover:bg-teal-500 text-slate-950 font-black text-xs px-3 py-1.5 rounded-lg transition-all shadow-md shadow-teal-950/30"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>সবগুলো শোনো (Play All)</span>
              </button>
            )}
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {DIALOGUES.map((item, idx) => {
              const isActive = currentLine === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSpeakLine(idx)}
                  className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-teal-950/30 border-teal-500 text-white scale-[1.01]'
                      : 'bg-slate-900/50 border-slate-850 text-slate-300 hover:border-slate-800 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shrink-0">
                    {item.emoji}
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-teal-400">{item.speaker}</span>
                      <Volume2 className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400 animate-pulse' : 'text-slate-500'}`} />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practical/Experiential exercise */}
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-black text-amber-400 flex items-center justify-center gap-1.5">
            🤝 সহপাঠীদের সাথে পরিচিত হই
          </h3>
          <p className="text-xs text-slate-400 text-center max-w-md mx-auto">
            তোমার ক্লাসের যেকোনো একজন বন্ধুর নাম নিচে লেখো। তারপর বাটনটিতে চাপ দিয়ে চমৎকার গলায় তাকে সম্ভাষণ জানাও!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center max-w-md mx-auto pt-2">
            <input
              type="text"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="যেমন: রাফি, আদিবা, সুবর্ণা..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm font-bold focus:outline-none focus:border-teal-500 transition-all text-center sm:text-left"
            />
            <button
              onClick={handlePracticeIntroduction}
              className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all active:scale-95 shadow-md flex items-center justify-center gap-1"
            >
              <Volume2 className="w-4 h-4" />
              <span>পরিচিত হই</span>
            </button>
          </div>
        </div>

        {/* Red Footer note from actual textbook */}
        <div className="text-center bg-rose-950/10 border border-rose-500/20 p-4 rounded-xl">
          <p className="text-xs font-black text-rose-400 tracking-wide">
            📌 সহপাঠীদের সাথে পরিচিত হই। নিজের নাম বলি। নাম জানতে চাই।
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===================================================================================================
   8. PATH 4: MY CLASSMATES SUB TAB (আমি ও আমার সহপাঠীরা)
   =================================================================================================== */
function FriendsSubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const CARDS_PAGE1 = [
    { id: 'tuli', name: 'তুলি', speech: 'আমার নাম তুলি।', emoji: '👧', color: 'from-pink-500/20 to-rose-500/20', borderColor: 'border-pink-500/30' },
    { id: 'rafi', name: 'রাফি', speech: 'আমার নাম রাফি।', emoji: '👦', color: 'from-blue-500/20 to-indigo-500/20', borderColor: 'border-blue-500/30' },
    { id: 'milli', name: 'মিলি', speech: 'আমার নাম মিলি।', emoji: '👩‍🦽', color: 'from-purple-500/20 to-fuchsia-500/20', borderColor: 'border-purple-500/30', note: 'সহযোগিতা ও বন্ধুভাবাপন্ন সহপাঠী' },
    { id: 'abhi', name: 'অভি', speech: 'আমার নাম অভি।', emoji: '🙋‍♂️', color: 'from-amber-500/20 to-orange-500/20', borderColor: 'border-amber-500/30' }
  ];

  const DIALOGUES_TALK = [
    { q: 'তোমার নাম কী?', a: 'আমার নাম রাফি।', qEmoji: '🙋‍♀️', aEmoji: '👦' },
    { q: 'তোমার নাম কী?', a: 'আমার নাম তুলি।', qEmoji: '🙋‍♂️', aEmoji: '👧' },
    { q: 'তোমার হাতে কী বই?', a: 'আমার বাংলা বই।', qEmoji: '👩', aEmoji: '📖' }
  ];

  const DIALOGUES_LISTEN = [
    { speaker: 'মিলি', text: 'তোমার নাম কী?', emoji: '👩‍🦽' },
    { speaker: 'অভি', text: 'আমার নাম অভি।', emoji: '🙋‍♂️' },
    { speaker: 'মিলি', text: 'আমরা একসাথে পড়ি।', emoji: '👩‍🦽' },
    { speaker: 'অভি', text: 'ওরাও আমাদের সাথে পড়ে?', emoji: '🙋‍♂️' },
    { speaker: 'মিলি', text: 'হ্যাঁ। ওরা হলো তুলি আর রাফি।', emoji: '👩‍🦽' },
    { speaker: 'অভি', text: 'আমরা একসাথে খেলব।', emoji: '🙋‍♂️' },
    { speaker: 'সবাই', text: 'ঠিক। ঠিক। আর একসাথে পড়ব।', emoji: '👫' }
  ];

  const handlePageChange = (page: 1 | 2) => {
    playWhooshSound();
    setCurrentPage(page);
    setActiveCard(null);
    if (page === 1) speak("পৃষ্ঠা এক: চলো পরিচিত হই");
    if (page === 2) speak("পৃষ্ঠা দুই: কথা বলি এবং শুনি ও বলি");
  };

  const handlePlayCard = (speech: string, id: string) => {
    playWhooshSound();
    setActiveCard(id);
    speak(speech);
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-2xl rounded-full"></div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <span className="px-3 py-1 text-xs font-black text-teal-400 bg-teal-950/40 rounded-full border border-teal-500/20 uppercase tracking-widest">পাঠ ৪</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
            🙋‍♀️ আমি ও আমার সহপাঠীরা
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            এসো সহপাঠী বন্ধুদের সাথে পরিচিত হই, তাদের পরিচয় জানি এবং একসাথে কথা বলি!
          </p>
        </div>

        {/* Page Slider Switch */}
        <div className="flex justify-center gap-4 bg-slate-950/50 p-2 rounded-2xl max-w-sm mx-auto border border-slate-800">
          <button
            onClick={() => handlePageChange(1)}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
              currentPage === 1
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            পৃষ্ঠা ১ (পরিচিতি)
          </button>
          <button
            onClick={() => handlePageChange(2)}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
              currentPage === 2
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            পৃষ্ঠা ২ (কথোপকথন)
          </button>
        </div>

        <AnimatePresence mode="wait">
          {currentPage === 1 ? (
            <motion.div
              key="page1"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-lg font-black text-rose-400">🎈 চলো পরিচিত হই (Let's get introduced!)</h3>
                <p className="text-xs text-slate-400 mt-1">বন্ধুদের উপর ক্লিক করে তাদের মুখ থেকে পরিচয় শোনো!</p>
              </div>

              {/* Characters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {CARDS_PAGE1.map((item) => {
                  const isActive = activeCard === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handlePlayCard(item.speech, item.id)}
                      className={`p-6 rounded-2xl border bg-gradient-to-br ${item.color} ${item.borderColor} flex items-center gap-4 text-left transition-all hover:scale-105 active:scale-95 ${
                        isActive ? 'ring-2 ring-teal-500 border-teal-400' : 'hover:border-slate-700'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-4xl shadow-inner shrink-0 relative">
                        {item.emoji}
                        {isActive && (
                          <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-teal-500 text-[10px] font-black text-slate-950 animate-bounce">
                            📢
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-black text-teal-400 tracking-widest block">সহপাঠী</span>
                        <h4 className="font-black text-white text-lg">{item.name}</h4>
                        {isActive ? (
                          <motion.p
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-xs font-bold text-amber-300 bg-slate-950/60 py-1 px-2.5 rounded-lg border border-amber-500/20 inline-block"
                          >
                            💬 "{item.speech}"
                          </motion.p>
                        ) : (
                          <p className="text-xs text-slate-400 font-bold">পরিচয় শুনতে ক্লিক করো</p>
                        )}
                        {item.note && <span className="text-[9px] text-teal-400/70 font-bold block pt-1">{item.note}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Flower badge matching book page number */}
              <div className="flex justify-center items-center gap-1.5 text-xs text-slate-500 font-extrabold pt-4">
                <span>পৃষ্ঠা</span>
                <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-black">
                  {toBengaliNum(4)}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="page2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Part 1: কথা বলি */}
              <div className="space-y-4">
                <div className="text-center border-b border-slate-800 pb-2">
                  <h3 className="text-lg font-black text-rose-400">🗣️ কথা বলি (Let's talk)</h3>
                  <p className="text-xs text-slate-400 mt-1">প্রশ্ন ও উত্তরের উপর ক্লিক করে কথোপকথনটি শোনো:</p>
                </div>

                <div className="grid grid-cols-1 gap-3 max-w-xl mx-auto">
                  {DIALOGUES_TALK.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        playWhooshSound();
                        speak(`প্রশ্ন: ${item.q}. উত্তর: ${item.a}`);
                      }}
                      className="p-4 bg-slate-950/40 hover:bg-slate-900 border border-slate-800/80 rounded-xl flex flex-col gap-2 transition-all cursor-pointer hover:border-teal-500/40 group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm shrink-0">{item.qEmoji}</span>
                        <p className="text-xs sm:text-sm font-black text-teal-400 tracking-wide">– {item.q}</p>
                      </div>
                      <div className="flex items-center gap-2 pl-4 border-l border-slate-800">
                        <span className="text-sm shrink-0">{item.aEmoji}</span>
                        <p className="text-xs sm:text-sm font-extrabold text-white">– {item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 2: শুনি ও বলি */}
              <div className="space-y-4 pt-4">
                <div className="text-center border-b border-slate-800 pb-2">
                  <h3 className="text-lg font-black text-rose-400">👂 শুনি ও বলি (Listen & Say)</h3>
                  <p className="text-xs text-slate-400 mt-1">মিলি ও অভির সুন্দর বন্ধুত্ব ও ক্লাসের কথা শোনো:</p>
                </div>

                <div className="space-y-3 max-w-xl mx-auto">
                  {DIALOGUES_LISTEN.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        playWhooshSound();
                        speak(`${item.speaker} বলেছেন: ${item.text}`);
                      }}
                      className="p-3 bg-slate-900/40 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-xl flex items-center gap-3 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <div className="w-9 h-9 bg-slate-950 border border-slate-800 flex items-center justify-center text-xl rounded-xl shrink-0">
                        {item.emoji}
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-teal-400">{item.speaker}</span>
                          <Volume2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 transition-colors" />
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white text-left">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flower badge matching book page number */}
              <div className="flex justify-center items-center gap-1.5 text-xs text-slate-500 font-extrabold pt-4">
                <span>পৃষ্ঠা</span>
                <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-black">
                  {toBengaliNum(5)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ===================================================================================================
   9. PATH 5: DRAWING SUB TAB (আঁকাআঁকি - দাগ দিই ও রং করি)
   =================================================================================================== */
function Drawing5SubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const [currentPage, setCurrentPage] = useState<1 | 2 | 3>(1);
  const [activeTool, setActiveTool] = useState<'brush' | 'eraser' | 'sticker' | 'fill'>('brush');
  const [brushColor, setBrushColor] = useState('#ef4444'); // default red
  const [brushSize, setBrushSize] = useState(8); // medium
  const [selectedAlphabet, setSelectedAlphabet] = useState<string>('অ');
  const [activeStickerPreset, setActiveStickerPreset] = useState<string | null>(null);
  const [stickers, setStickers] = useState<Array<{ id: number; x: number; y: number; emoji: string; size: number }>>([]);
  const [showColorGuide, setShowColorGuide] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const [gallery, setGallery] = useState<Array<{ id: number; image: string; page: number; time: string }>>(() => {
    try {
      return JSON.parse(localStorage.getItem('c1_gallery') || '[]');
    } catch {
      return [];
    }
  });
  
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<{ id: number; image: string; page: number; time: string } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Play instruction on mount
  useEffect(() => {
    speak("আঁকাআঁকি! দাগ মেলাই এবং নিজের পছন্দমতো রঙ করি! চলো ছবি আঁকা শুরু করি।");
  }, []);

  // Soft pop and bell sound effects purely generated with Web Audio API for interactive kid UI
  const playKidSound = (type: 'pop' | 'sparkle' | 'clear' | 'success') => {
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
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'sparkle') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(950, ctx.currentTime);
        osc.frequency.setValueAtTime(1250, ctx.currentTime + 0.05);
        osc.frequency.setValueAtTime(1550, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'clear') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'success') {
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.08);
          gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + idx * 0.08 + 0.25);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
        });
      }
    } catch (err) {
      console.warn("AudioContext failed:", err);
    }
  };

  // Background nursery tune player loop
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let timerId: any = null;
    
    if (isMusicPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtx = new AudioContextClass();
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        const scale = [349.23, 392.00, 440.00, 523.25, 587.33]; // F Major Pentatonic scale
        
        const playNextNote = () => {
          if (!audioCtx) return;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          
          osc.type = 'sine';
          const freq = scale[Math.floor(Math.random() * scale.length)];
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
          
          gain.gain.setValueAtTime(0, audioCtx.currentTime);
          gain.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
          
          osc.start();
          osc.stop(audioCtx.currentTime + 2.0);
          timerId = setTimeout(playNextNote, 1300 + Math.random() * 700);
        };
        
        playNextNote();
      } catch (err) {
        console.warn("Melody failed:", err);
      }
    }
    
    return () => {
      if (timerId) clearTimeout(timerId);
      if (audioCtx) {
        audioCtx.close().catch(() => {});
      }
    };
  }, [isMusicPlaying]);

  // Draw alphabet outline onto the canvas
  const drawAlphabetOutlineOnCanvas = (letter: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 380px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw solid dark gray border outline for children to color inside
    ctx.strokeStyle = '#475569'; // slate-600
    ctx.lineWidth = 14;
    ctx.strokeText(letter, 300, 310);

    // Draw bright inner line
    ctx.strokeStyle = '#cbd5e1'; // slate-300
    ctx.lineWidth = 8;
    ctx.strokeText(letter, 300, 310);

    ctx.restore();
  };

  // Stack-based Depth First Search (DFS) Flood Fill
  const floodFill = (startX: number, startY: number, fillColorHex: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Fast parse hex color to RGB
    let fillR = 239, fillG = 68, fillB = 68; // default red
    if (fillColorHex.startsWith('#')) {
      const hex = fillColorHex.slice(1);
      if (hex.length === 3) {
        fillR = parseInt(hex[0] + hex[0], 16);
        fillG = parseInt(hex[1] + hex[1], 16);
        fillB = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        fillR = parseInt(hex.slice(0, 2), 16);
        fillG = parseInt(hex.slice(2, 4), 16);
        fillB = parseInt(hex.slice(4, 6), 16);
      }
    }
    const fillA = 255;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const startXInt = Math.floor(startX);
    const startYInt = Math.floor(startY);
    const startIdx = (startYInt * width + startXInt) * 4;
    const startR = data[startIdx];
    const startG = data[startIdx + 1];
    const startB = data[startIdx + 2];
    const startA = data[startIdx + 3];

    // If already filled with target color, avoid infinite loop
    if (
      Math.abs(startR - fillR) < 8 &&
      Math.abs(startG - fillG) < 8 &&
      Math.abs(startB - fillB) < 8 &&
      Math.abs(startA - fillA) < 8
    ) {
      return;
    }

    // Stack holds pixel indices (y * width + x)
    const stack: number[] = [startYInt * width + startXInt];
    const visited = new Uint8Array(width * height);
    visited[startYInt * width + startXInt] = 1;

    const tolerance = 48; // balanced color similarity tolerance

    while (stack.length > 0) {
      const curr = stack.pop()!;
      const cx = curr % width;
      const cy = Math.floor(curr / width);

      const idx = curr * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      const isMatch =
        Math.abs(r - startR) < tolerance &&
        Math.abs(g - startG) < tolerance &&
        Math.abs(b - startB) < tolerance &&
        Math.abs(a - startA) < tolerance;

      if (isMatch) {
        data[idx] = fillR;
        data[idx + 1] = fillG;
        data[idx + 2] = fillB;
        data[idx + 3] = fillA;

        // East
        if (cx < width - 1) {
          const next = curr + 1;
          if (!visited[next]) {
            visited[next] = 1;
            stack.push(next);
          }
        }
        // West
        if (cx > 0) {
          const next = curr - 1;
          if (!visited[next]) {
            visited[next] = 1;
            stack.push(next);
          }
        }
        // South
        if (cy < height - 1) {
          const next = curr + width;
          if (!visited[next]) {
            visited[next] = 1;
            stack.push(next);
          }
        }
        // North
        if (cy > 0) {
          const next = curr - width;
          if (!visited[next]) {
            visited[next] = 1;
            stack.push(next);
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  // Clean canvas & stickers when page switches or selected alphabet changes
  useEffect(() => {
    if (currentPage === 3) {
      setStickers([]);
      drawAlphabetOutlineOnCanvas(selectedAlphabet);
    } else {
      clearCanvas(false);
      setStickers([]);
    }
  }, [currentPage, selectedAlphabet]);

  const COLOR_NAMES: Record<string, string> = {
    '#ef4444': 'লাল',
    '#3b82f6': 'নীল',
    '#10b981': 'সবুজ',
    '#eab308': 'হলুদ',
    '#f97316': 'কমলা',
    '#a855f7': 'বেগুনি',
    '#ec4899': 'গোলাপি',
    '#06b6d4': 'আকাশি'
  };

  const STICKERS_PRESETS = [
    { emoji: '🌟', label: 'তারা' },
    { emoji: '🎈', label: 'বেলুন' },
    { emoji: '🌸', label: 'ফুল' },
    { emoji: '☀️', label: 'সূর্য' },
    { emoji: '🦋', label: 'প্রজাপতি' },
    { emoji: '🐱', label: 'বিড়াল' },
    { emoji: '🍎', label: 'আপেল' },
    { emoji: '🎒', label: 'ব্যাগ' }
  ];

  // Canvas drawing logic
  const getCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    
    let clientX = 0;
    let clientY = 0;
    
    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (activeTool === 'sticker') return;
    const coords = getCoords(e);
    if (!coords) return;
    
    if (activeTool === 'fill') {
      floodFill(coords.x, coords.y, brushColor);
      playKidSound('sparkle');
      speak("রং ভরাট করা হলো");
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    
    if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }
    
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coords = getCoords(e);
    if (!coords) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Sticker Placement
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'sticker' || !activeStickerPreset) return;
    const coords = getCoords(e);
    if (!coords) return;
    
    const newSticker = {
      id: Date.now(),
      x: coords.x,
      y: coords.y,
      emoji: activeStickerPreset,
      size: brushSize * 4 + 20
    };
    
    setStickers(prev => [...prev, newSticker]);
    playKidSound('sparkle');
    
    const label = STICKERS_PRESETS.find(s => s.emoji === activeStickerPreset)?.label || 'স্টিকার';
    speak(label);
  };

  // Clear canvas board
  const clearCanvas = (speakAndSound = true) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (currentPage === 3) {
        drawAlphabetOutlineOnCanvas(selectedAlphabet);
      }
    }
    setStickers([]);
    if (speakAndSound) {
      playKidSound('clear');
      speak("সব পরিষ্কার করা হয়েছে");
    }
  };

  // Speak Instruction Guide
  const playGuideIntro = () => {
    if (currentPage === 1) {
      speak("পাঠ পাঁচ, আঁকাআঁকি। দাগ দিই ও রঙ করি। ছোট্ট বন্ধুরা, বামপাশের বেলুন, ঘুড়ি, ত্রিভুজ ও ফুলগুলোর ওপর সুন্দর করে পেন্সিল দিয়ে দাগ টানো এবং নিজের মনমতো রঙ দিয়ে সাজাও!");
    } else if (currentPage === 2) {
      speak("দাগ দিই ও রঙ করি। এখানে একটি বড় গোল হাসিমুখ সূর্য মামা আছে। সূর্য মামার গোল দাগ ও কোণাকুণি রশ্মিগুলোর ওপর সুন্দর করে এঁকে হলুদ ও কমলা রঙে সাজিয়ে তোলো!");
    } else {
      speak("বর্ণমালা রঙ করি! এখানে বাংলা বর্ণমালার বিভিন্ন বর্ণ আছে। নিজের পছন্দের বর্ণটি বাছাই করো, তারপর তুলি বা রং ভরাট বালতি দিয়ে বর্ণটি নিজের মনের মতো রঙে সাজাও!");
    }
  };

  // Save to Gallery
  const handleSaveToGallery = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Convert canvas image to data URL
    const image = canvas.toDataURL('image/png');
    const bndate = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('bn-BD');
    const newArt = { id: Date.now(), image, page: currentPage, time: bndate };
    
    const updated = [newArt, ...gallery].slice(0, 12);
    setGallery(updated);
    localStorage.setItem('c1_gallery', JSON.stringify(updated));
    playKidSound('success');
    speak("চমৎকার! তোমার সুন্দর আঁকা ছবিটি গ্যালারিতে সংরক্ষিত হয়েছে।");
  };

  // Delete from Gallery
  const handleDeleteArtwork = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = gallery.filter(item => item.id !== id);
    setGallery(updated);
    localStorage.setItem('c1_gallery', JSON.stringify(updated));
    playKidSound('clear');
    speak("ছবি মুছে ফেলা হয়েছে");
  };

  const handleColorSelect = (color: string) => {
    setBrushColor(color);
    if (activeTool !== 'fill' && activeTool !== 'eraser') {
      setActiveTool('brush');
    }
    playKidSound('pop');
    speak(COLOR_NAMES[color] + " রঙ");
  };

  const handleToolSelect = (tool: 'brush' | 'eraser' | 'fill') => {
    setActiveTool(tool);
    playKidSound('pop');
    if (tool === 'brush') {
      speak("আঁকিবুকি তুলি");
    } else if (tool === 'eraser') {
      speak("ইরেজার");
    } else if (tool === 'fill') {
      speak("রং ভরাট বালতি");
    }
  };

  const handleStickerSelect = (emoji: string) => {
    setActiveStickerPreset(emoji);
    setActiveTool('sticker');
    playKidSound('pop');
    const label = STICKERS_PRESETS.find(s => s.emoji === emoji)?.label || '';
    speak(label + " স্টিকার");
  };

  // Formula to draw the sun ray path matching image exactly
  const getSunRayPath = () => {
    const center = 300;
    const innerR = 125;
    const outerR = 195;
    const rayCount = 16;
    let path = '';
    for (let i = 0; i < rayCount; i++) {
      const angle1 = (i * 2 * Math.PI) / rayCount;
      const angle2 = ((i + 0.5) * 2 * Math.PI) / rayCount;
      const angle3 = ((i + 1) * 2 * Math.PI) / rayCount;
      
      const x1 = center + innerR * Math.cos(angle1);
      const y1 = center + innerR * Math.sin(angle1);
      const xPeak = center + outerR * Math.cos(angle2);
      const yPeak = center + outerR * Math.sin(angle2);
      const x2 = center + innerR * Math.cos(angle3);
      const y2 = center + innerR * Math.sin(angle3);
      
      if (i === 0) {
        path += `M ${x1},${y1} L ${xPeak},${yPeak} L ${x2},${y2}`;
      } else {
        path += ` L ${xPeak},${yPeak} L ${x2},${y2}`;
      }
    }
    path += ' Z';
    return path;
  };

  return (
    <div className="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#30363d] rounded-3xl p-4 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 blur-3xl rounded-full pointer-events-none"></div>

      {/* Chapter Title Block */}
      <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
        <span className="px-4 py-1.5 text-xs font-black text-rose-400 bg-rose-950/40 rounded-full border border-rose-500/25 uppercase tracking-wider animate-pulse">
          পাঠ ৫
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-400 to-teal-400 mt-2">
          🎨 আঁকাআঁকি ও রঙিন জগত
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-bold max-w-xl mx-auto leading-relaxed">
          এসো সোনা বন্ধুরা! রঙিন তুলি হাতে নিয়ে আমাদের ডটেড লাইনের ওপর হাত ঘুরিয়ে ছবি আঁকতে শিখি ও চমৎকার সাজাই!
        </p>

        {/* Listen Instruction & Gentle background music control */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <button
            onClick={playGuideIntro}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-900/90 hover:bg-slate-800 text-teal-400 border border-teal-500/30 hover:border-teal-500/60 rounded-full text-xs font-black transition-all active:scale-95 shadow-md shadow-teal-950/20"
          >
            <Volume2 className="w-4 h-4" />
            <span>কীভাবে খেলবো? শোনো (Instruction)</span>
          </button>

          <button
            onClick={() => {
              playKidSound('pop');
              setIsMusicPlaying(!isMusicPlaying);
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black transition-all active:scale-95 border shadow-md ${
              isMusicPlaying
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-900/90 text-slate-400 border-slate-800'
            }`}
          >
            <Music className={`w-4 h-4 ${isMusicPlaying ? 'animate-spin' : ''}`} />
            <span>{isMusicPlaying ? '🎵 গান বন্ধ করো (Stop Melody)' : '🎵 আঁকার মৃদু সুর (Nursery Music)'}</span>
          </button>
        </div>
      </div>

      {/* Pages Switcher Navigation Tabs */}
      <div className="flex justify-center gap-4 bg-slate-950/40 p-2 rounded-2xl max-w-lg mx-auto border border-slate-800 relative z-10">
        <button
          onClick={() => {
            playKidSound('pop');
            setCurrentPage(1);
            speak("প্রথম পৃষ্ঠা: আঁকাআঁকি ও লতা পাতা");
          }}
          className={`flex-1 flex flex-col items-center py-2.5 rounded-xl text-xs font-black transition-all ${
            currentPage === 1
              ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/20'
          }`}
        >
          <span className="text-lg">🎈🪁</span>
          <span>পৃষ্ঠা ১ (বইয়ের পৃষ্ঠা ৬)</span>
        </button>
        
        <button
          onClick={() => {
            playKidSound('pop');
            setCurrentPage(2);
            speak("দ্বিতীয় পৃষ্ঠা: হাসিমুখ সূর্য মামা");
          }}
          className={`flex-1 flex flex-col items-center py-2.5 rounded-xl text-xs font-black transition-all ${
            currentPage === 2
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/20'
          }`}
        >
          <span className="text-lg">☀️😎</span>
          <span>পৃষ্ঠা ২ (বইয়ের পৃষ্ঠা ৭)</span>
        </button>

        <button
          onClick={() => {
            playKidSound('pop');
            setCurrentPage(3);
            speak("তৃতীয় পৃষ্ঠা: বর্ণমালা রং করি");
          }}
          className={`flex-1 flex flex-col items-center py-2.5 rounded-xl text-xs font-black transition-all ${
            currentPage === 3
              ? 'bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 text-slate-950 shadow-lg scale-105'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/20'
          }`}
        >
          <span className="text-lg">📝🎨</span>
          <span>বর্ণমালা রং করি</span>
        </button>
      </div>

      {/* Main Drawing Studio Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-5xl mx-auto">
        
        {/* Left Side: Interactive Board (Canvas / SVG Tracing) */}
        <div className="lg:col-span-7 flex flex-col items-center space-y-4">
          
          <div className="text-center">
            <h3 className="text-sm font-black text-amber-300 bg-amber-950/30 px-4 py-1 rounded-full border border-amber-500/20 inline-block">
              {currentPage === 1 
                ? '✏️ বেলুন, ঘুড়ি ও ফুলগুলোর ডট মিলাও!' 
                : currentPage === 2 
                  ? '✏️ সূর্য মামার ডট মিলিয়ে রঙ করো!' 
                  : `✏️ বর্ণমালা '${selectedAlphabet}' সুন্দর করে রঙ করো!`}
            </h3>
          </div>

          {/* Elegant Classroom Slate Container */}
          <div className="w-full max-w-[460px] p-4 bg-amber-950 rounded-[36px] shadow-2xl border-8 border-amber-900 flex items-center justify-center relative group">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-900 border border-amber-800 text-amber-200 text-[9px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest shadow">
              চিত্রফলক (KIDS SLATE)
            </span>

            {/* The Canvas and Background Overlays */}
            <div className="relative w-full aspect-square bg-slate-900 rounded-[20px] overflow-hidden shadow-inner flex items-center justify-center">
              
              {/* Soft visual watercolor background top pattern */}
              <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none z-0"></div>

              {/* Translucent Color Guides (Scoffolding support for toddlers) */}
              {showColorGuide && (
                <div className="absolute inset-0 pointer-events-none z-0 select-none">
                  <svg viewBox="0 0 600 600" className="w-full h-full opacity-35">
                    {currentPage === 1 ? (
                      <>
                        {/* Balloon */}
                        <path d="M 160,70 C 90,70 80,210 160,260 L 155,270 L 165,270 Z" fill="#ef4444" />
                        <path d="M 195 375 L 185 385 L 215 385 Z" fill="#ef4444" />
                        {/* Kite */}
                        <path d="M 70,340 L 250,340 L 250,520 L 70,520 Z" fill="#3b82f6" />
                        <path d="M 160,520 L 145,540 L 175,540 Z" fill="#f59e0b" />
                        {/* Triangles */}
                        <path d="M 425,110 L 370,190 L 480,190 Z" fill="#10b981" />
                        <path d="M 370,190 L 315,270 L 425,270 Z" fill="#eab308" />
                        <path d="M 480,190 L 425,270 L 535,270 Z" fill="#f97316" />
                        <circle cx="345" cy="115" r="35" fill="#ec4899" />
                        <circle cx="505" cy="115" r="35" fill="#ec4899" />
                        {/* Flower */}
                        <circle cx="425" cy="415" r="15" fill="#eab308" />
                        <path d="M 425,415 C 380,360 330,400 425,415" fill="#a855f7" />
                        <path d="M 425,415 C 470,360 520,400 425,415" fill="#a855f7" />
                        <path d="M 425,415 C 330,430 380,510 425,415" fill="#a855f7" />
                        <path d="M 425,415 C 520,430 470,510 425,415" fill="#a855f7" />
                        {/* Waves */}
                        <path d="M 150,550 Q 140,530 150,520 Q 160,530 150,550" fill="#10b981" />
                        <path d="M 280,555 Q 270,535 280,525 Q 290,535 280,555" fill="#10b981" />
                        <path d="M 410,555 Q 400,535 410,525 Q 420,535 410,555" fill="#10b981" />
                      </>
                    ) : currentPage === 2 ? (
                      <>
                        <path d={getSunRayPath()} fill="#f97316" />
                        <circle cx="300" cy="300" r="125" fill="#eab308" />
                      </>
                    ) : (
                      <g fill={brushColor} opacity="0.15">
                        <text x="300" y="310" fontSize="380" fontFamily="'Inter', sans-serif" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                          {selectedAlphabet}
                        </text>
                      </g>
                    )}
                  </svg>
                </div>
              )}

              {/* The Dotted Vector Template (Interactive Drawing Overlay Back) */}
              <div className="absolute inset-0 pointer-events-none z-10 select-none">
                <svg viewBox="0 0 600 600" className="w-full h-full">
                  {currentPage === 1 ? (
                    <g stroke="#64748b" strokeWidth="3" strokeDasharray="8,8" fill="none">
                      {/* Balloon */}
                      <path d="M 160,70 C 90,70 80,210 160,260 L 155,270 L 165,270 Z" />
                      <path d="M 160,270 Q 155,290 165,310" strokeDasharray="4,4" />
                      {/* Kite */}
                      <path d="M 70,340 L 250,340 L 250,520 L 70,520 Z" />
                      <path d="M 70,340 L 250,520" strokeDasharray="4,4" />
                      <path d="M 250,340 L 70,520" strokeDasharray="4,4" />
                      <path d="M 160,520 L 145,540 L 175,540 Z" />
                      {/* Triangles */}
                      <path d="M 425,110 L 370,190 L 480,190 Z" />
                      <path d="M 370,190 L 315,270 L 425,270 Z" />
                      <path d="M 480,190 L 425,270 L 535,270 Z" />
                      <circle cx="345" cy="115" r="35" />
                      <circle cx="505" cy="115" r="35" />
                      {/* Flower */}
                      <circle cx="425" cy="415" r="15" />
                      <path d="M 425,415 C 380,360 330,400 425,415" />
                      <path d="M 425,415 C 470,360 520,400 425,415" />
                      <path d="M 425,415 C 330,430 380,510 425,415" />
                      <path d="M 425,415 C 520,430 470,510 425,415" />
                      {/* Waves */}
                      <path d="M 70,560 Q 150,540 230,560 T 390,560 T 530,560" strokeDasharray="5,5" />
                      <path d="M 150,550 Q 140,530 150,520 Q 160,530 150,550" />
                      <path d="M 280,555 Q 270,535 280,525 Q 290,535 280,555" />
                      <path d="M 410,555 Q 400,535 410,525 Q 420,535 410,555" />
                    </g>
                  ) : currentPage === 2 ? (
                    <g stroke="#64748b" strokeWidth="4" strokeDasharray="8,8" fill="none">
                      <circle cx="300" cy="300" r="110" />
                      <circle cx="300" cy="300" r="125" />
                      <path d={getSunRayPath()} />
                      <circle cx="255" cy="275" r="8" fill="#64748b" stroke="none" />
                      <circle cx="345" cy="275" r="8" fill="#64748b" stroke="none" />
                      <path d="M 260,330 Q 300,375 340,330" strokeWidth="5" strokeLinecap="round" />
                    </g>
                  ) : (
                    <g stroke="#64748b" strokeWidth="4" strokeDasharray="6,6" fill="none">
                      <text x="300" y="310" fontSize="380" fontFamily="'Inter', sans-serif" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                        {selectedAlphabet}
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* HTML5 Canvas Drawing Board Layer */}
              <canvas
                ref={canvasRef}
                width={600}
                height={600}
                onMouseDown={activeTool === 'sticker' ? handleCanvasClick : startDrawing}
                onMouseMove={activeTool === 'sticker' ? undefined : draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={activeTool === 'sticker' ? handleCanvasClick : startDrawing}
                onTouchMove={activeTool === 'sticker' ? undefined : draw}
                onTouchEnd={stopDrawing}
                className="absolute inset-0 z-20 w-full h-full cursor-crosshair bg-transparent touch-none"
              />

              {/* Placed Stickers Interactive Overlays */}
              <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden select-none">
                {stickers.map((st) => (
                  <div
                    key={st.id}
                    style={{
                      position: 'absolute',
                      left: `${(st.x / 600) * 100}%`,
                      top: `${(st.y / 600) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      fontSize: `${st.size}px`,
                      pointerEvents: 'auto',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setStickers(prev => prev.filter(item => item.id !== st.id));
                      playKidSound('clear');
                      speak("স্টিকার সরানো হয়েছে");
                    }}
                    title="স্টিকারটি মুছে দিতে ক্লিক করো"
                  >
                    <span className="active:scale-125 transition-transform inline-block drop-shadow-lg select-none">
                      {st.emoji}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alphabet selection strip for Page 3 */}
          {currentPage === 3 && (
            <div className="w-full max-w-[460px] bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800/80 space-y-2 relative z-10">
              <h4 className="text-[10px] uppercase font-black tracking-widest text-pink-400">📝 বর্ণমালা নির্বাচন করো (Choose Letter)</h4>
              <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-800">
                {[
                  'অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ',
                  'ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ',
                  'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন',
                  'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ'
                ].map((letter) => (
                  <button
                    key={letter}
                    onClick={() => {
                      playKidSound('pop');
                      setSelectedAlphabet(letter);
                      speak(letter);
                    }}
                    className={`flex-none w-11 h-11 rounded-xl text-base font-black transition-all flex items-center justify-center ${
                      selectedAlphabet === letter
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-slate-950 shadow-lg scale-110 border border-pink-400'
                        : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Book page decorative flower badge */}
          <div className="flex justify-center items-center gap-2 text-xs text-slate-400 font-extrabold select-none">
            <span>বইয়ের পৃষ্ঠা</span>
            <div className="w-9 h-9 rounded-full bg-rose-950 border border-rose-500/40 flex items-center justify-center text-rose-300 text-sm font-black animate-pulse shadow">
              {toBengaliNum(currentPage === 1 ? 6 : currentPage === 2 ? 7 : 8)}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Controls and Palette */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section 1: Drawing & Erasing Tools */}
          <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl space-y-3.5">
            <h4 className="text-xs uppercase font-black tracking-widest text-teal-400">🖌️ টুলস নির্বাচন (Tools)</h4>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleToolSelect('brush')}
                className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 font-black text-[10px] sm:text-xs transition-all ${
                  activeTool === 'brush'
                    ? 'bg-teal-500 text-slate-950 font-black shadow-lg scale-105'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <span className="text-xl">✏️</span>
                <span>আঁকিবুকি</span>
              </button>

              <button
                onClick={() => handleToolSelect('fill')}
                className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 font-black text-[10px] sm:text-xs transition-all ${
                  activeTool === 'fill'
                    ? 'bg-teal-500 text-slate-950 font-black shadow-lg scale-105'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <span className="text-xl">🪣</span>
                <span>রং ভরাট</span>
              </button>

              <button
                onClick={() => handleToolSelect('eraser')}
                className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 font-black text-[10px] sm:text-xs transition-all ${
                  activeTool === 'eraser'
                    ? 'bg-teal-500 text-slate-950 font-black shadow-lg scale-105'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <span className="text-xl">🧽</span>
                <span>ইরেজার</span>
              </button>

              <button
                onClick={() => clearCanvas(true)}
                className="p-2.5 bg-slate-900 hover:bg-rose-950/30 text-rose-300 hover:text-rose-200 border border-slate-800 hover:border-rose-500/20 rounded-xl flex flex-col items-center justify-center gap-1 font-black text-[10px] sm:text-xs transition-all active:scale-95"
              >
                <span className="text-xl">🗑️</span>
                <span>সব মুছুন</span>
              </button>
            </div>
          </div>

          {/* Section 2: Colors Palette */}
          <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs uppercase font-black tracking-widest text-amber-400">🎨 রং তুলি (Select Color)</h4>
              <span className="text-[10px] text-amber-400/80 font-black bg-amber-950/40 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                {COLOR_NAMES[brushColor] || 'কাস্টম'} রঙ
              </span>
            </div>

            <div className="grid grid-cols-5 gap-3 justify-items-center py-1">
              {Object.keys(COLOR_NAMES).map((color) => {
                const isActive = brushColor === color && (activeTool === 'brush' || activeTool === 'fill');
                return (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    style={{ backgroundColor: color }}
                    className={`w-9 h-9 rounded-full transition-all duration-150 transform active:scale-95 ${
                      isActive
                        ? 'ring-4 ring-white ring-offset-2 ring-offset-slate-950 scale-110 shadow-lg'
                        : 'hover:scale-105 border border-slate-800'
                    }`}
                    title={COLOR_NAMES[color]}
                  >
                    {isActive && (
                      <span className="flex items-center justify-center text-white text-xs drop-shadow-sm font-bold">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Custom Color Picker Button */}
              <div className={`relative w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 border border-slate-800 flex items-center justify-center cursor-pointer overflow-hidden shadow-md group ${
                !COLOR_NAMES[brushColor]
                  ? 'ring-4 ring-white ring-offset-2 ring-offset-slate-950 scale-110 shadow-lg'
                  : ''
              }`}>
                <span className="text-sm pointer-events-none group-hover:scale-110 transition-transform">🎨</span>
                <input
                  type="color"
                  value={brushColor}
                  onChange={(e) => {
                    const col = e.target.value;
                    setBrushColor(col);
                    if (activeTool !== 'fill' && activeTool !== 'eraser') {
                      setActiveTool('brush');
                    }
                    playKidSound('pop');
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  title="কাস্টম রঙ নির্বাচন করো"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Brush Line Thickness */}
          <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs uppercase font-black tracking-widest text-purple-400">📏 তুলির সাইজ (Brush Size)</h4>
            <div className="flex items-center gap-4 justify-around py-1">
              {[
                { size: 4, label: 'সরু', icon: '🔹' },
                { size: 8, label: 'মাঝারি', icon: '🔵' },
                { size: 16, label: 'মোটা', icon: '⚪' }
              ].map((b) => (
                <button
                  key={b.size}
                  onClick={() => {
                    playKidSound('pop');
                    setBrushSize(b.size);
                    speak(b.label + " তুলি");
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black border transition-all ${
                    brushSize === b.size
                      ? 'bg-purple-600 border-purple-400 text-white scale-105'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <span className="text-xs">{b.icon}</span>
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Magic Stickers Preset (Super fun for kids!) */}
          <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs uppercase font-black tracking-widest text-pink-400">⭐ ম্যাজিক স্টিকার (Tap to Place!)</h4>
            <p className="text-[10px] text-slate-400 font-bold">একটি স্টিকারে চাপ দাও, তারপর ছবির যেকোনো জায়গায় ক্লিক করে বসাও!</p>
            
            <div className="grid grid-cols-4 gap-2.5">
              {STICKERS_PRESETS.map((st) => {
                const isSelected = activeStickerPreset === st.emoji && activeTool === 'sticker';
                return (
                  <button
                    key={st.emoji}
                    onClick={() => handleStickerSelect(st.emoji)}
                    className={`p-2.5 rounded-xl text-2xl flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-pink-600 scale-110 shadow-lg border border-pink-400'
                        : 'bg-slate-900/80 hover:bg-slate-800 border border-slate-800'
                    }`}
                    title={st.label}
                  >
                    <span className="active:scale-125 transition-transform select-none">{st.emoji}</span>
                    <span className="text-[9px] font-black text-slate-400 mt-1 select-none">{st.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Educational Scaffolding Tools & Save Gallery */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs uppercase font-black tracking-widest text-emerald-400">💡 সাহায্যকারী অপশন (Scaffolding)</h4>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Show Fill Color Guide Scaffolding Toggle */}
              <button
                onClick={() => {
                  playKidSound('pop');
                  setShowColorGuide(!showColorGuide);
                  speak(showColorGuide ? "রঙিন গাইড বন্ধ করা হয়েছে" : "রঙিন গাইড চালু করা হয়েছে");
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black border transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                  showColorGuide
                    ? 'bg-amber-500 border-amber-400 text-slate-950'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <span>🎨</span>
                <span>{showColorGuide ? 'রঙিন গাইড বন্ধ' : 'রঙিন গাইড দেখাও'}</span>
              </button>

              {/* Save Artwork Button */}
              <button
                onClick={handleSaveToGallery}
                className="flex-1 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all active:scale-95 shadow-md flex items-center justify-center gap-1.5"
              >
                <span>💾</span>
                <span>গ্যালারিতে রাখো (Save)</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Section 6: User Saved Gallery List (Durable and engaging!) */}
      {gallery.length > 0 && (
        <div className="bg-slate-950/30 border border-slate-800/80 p-6 rounded-3xl space-y-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 flex items-center gap-1.5">
              🖼️ আমার চিত্রশালা (My Art Gallery)
            </h3>
            <span className="text-[10px] text-slate-500 font-extrabold uppercase">
              সর্বোচ্চ ১২টি ছবি রাখা যাবে
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {gallery.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedGalleryItem(art)}
                className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-2 cursor-pointer transition-all hover:scale-105 hover:border-teal-500/50 flex flex-col justify-between"
              >
                <div className="aspect-square w-full rounded-xl bg-slate-950 relative overflow-hidden flex items-center justify-center shadow-inner">
                  {/* Small absolute indicator for template page */}
                  <span className="absolute top-1 left-1 bg-slate-900/80 border border-slate-800 text-[8px] font-black text-amber-400 px-1.5 py-0.5 rounded z-10">
                    পৃষ্ঠা {toBengaliNum(art.page === 1 ? 6 : 7)}
                  </span>
                  {/* Canvas painting preview */}
                  <img
                    src={art.image}
                    alt="Artwork"
                    className="w-full h-full object-contain pointer-events-none z-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-950">
                  <span className="text-[9px] font-black text-slate-500">{art.time}</span>
                  <button
                    onClick={(e) => handleDeleteArtwork(art.id, e)}
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 transition-all"
                    title="ছবি মুছে ফেলো"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Art Masterpiece Expand Modal Popup */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGalleryItem(null)}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#161b22] border-2 border-emerald-500/30 p-6 sm:p-8 rounded-[32px] max-w-lg w-full text-center space-y-6 relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedGalleryItem(null)}
                className="absolute top-4 right-4 text-2xl w-8 h-8 rounded-full bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center transition-all border border-slate-800 hover:border-slate-700"
              >
                ✕
              </button>

              <div className="space-y-1">
                <span className="text-3xl">🎉🥳🎊</span>
                <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  অসাধারণ কাজ করেছ বন্ধু!
                </h3>
                <p className="text-xs text-slate-400">
                  সংরক্ষিত ছবি: পৃষ্ঠা {toBengaliNum(selectedGalleryItem.page === 1 ? 6 : 7)} (সময়: {selectedGalleryItem.time})
                </p>
              </div>

              {/* High Contrast Background board for preview */}
              <div className="aspect-square max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-2xl p-4">
                {/* SVG template preview rendered behind the artwork preview to make it complete */}
                <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
                  <svg viewBox="0 0 600 600" className="w-full h-full">
                    {selectedGalleryItem.page === 1 ? (
                      <g stroke="#94a3b8" strokeWidth="4" strokeDasharray="10,10" fill="none">
                        <path d="M 160,70 C 90,70 80,210 160,260 L 155,270 L 165,270 Z" />
                        <path d="M 70,340 L 250,340 L 250,520 L 70,520 Z" />
                        <path d="M 425,110 L 370,190 L 480,190 Z" />
                        <circle cx="345" cy="115" r="35" />
                        <circle cx="505" cy="115" r="35" />
                        <circle cx="425" cy="415" r="15" />
                      </g>
                    ) : (
                      <g stroke="#94a3b8" strokeWidth="4.5" strokeDasharray="10,10" fill="none">
                        <circle cx="300" cy="300" r="120" />
                        <path d="M 260,330 Q 300,375 340,330" />
                      </g>
                    )}
                  </svg>
                </div>
                <img
                  src={selectedGalleryItem.image}
                  alt="My Masterpiece"
                  className="w-full h-full object-contain relative z-10"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    playKidSound('success');
                    speak("চমৎকার ছবি! তোমার আঁকা সুন্দর ছবিটির জন্য অনেক অনেক ধন্যবাদ বন্ধু!");
                  }}
                  className="px-6 py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition-all active:scale-95 shadow-lg flex items-center justify-center gap-1.5 mx-auto"
                >
                  <Volume2 className="w-4 h-4 text-slate-950" />
                  <span>গর্ব করে শোনো (Listen Review)</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ===================================================================================================
   6. PATH 6: MY DAILY ROUTINES SUB TAB (আমরা কী কী করি)
   =================================================================================================== */

interface RoutineActivity {
  id: number;
  title: string;
  tip: string;
  speechText: string;
  colorClass: string;
  glowColor: string;
  bgAccent: string;
  emoji: string;
}

const ROUTINE_ACTIVITIES: RoutineActivity[] = [
  {
    id: 1,
    title: "দাঁত মাজি",
    tip: "খাবার খাওয়ার পর এবং সকালে ঘুম থেকে উঠে আমাদের নিয়মিত সুন্দর করে দাঁত মাজা উচিত।",
    speechText: "দাঁত মাজি। এসো বন্ধুরা, আমরা খাবার খাওয়ার পর এবং সকালে ঘুম থেকে উঠে নিয়মিত সুন্দর করে দাঁত মাজি। এটি দাঁতকে সুস্থ ও মজবুত রাখে।",
    colorClass: "from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-300 hover:border-blue-400",
    glowColor: "shadow-blue-500/20",
    bgAccent: "bg-blue-500/20",
    emoji: "🪥"
  },
  {
    id: 2,
    title: "হাত-মুখ ধুই",
    tip: "বাইরে থেকে এসে, খেলাধুলার পর এবং খাওয়ার আগে অবশ্যই সাবান দিয়ে ভালো করে হাত-মুখ ধুতে হবে।",
    speechText: "হাত-মুখ ধুই। বাইরে থেকে এসে, খেলাধুলার পর এবং খাওয়ার আগে অবশ্যই সাবান দিয়ে ভালো করে হাত-মুখ ধুতে হবে। এটি আমাদের জীবাণুমুক্ত রাখে।",
    colorClass: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300 hover:border-emerald-400",
    glowColor: "shadow-emerald-500/20",
    bgAccent: "bg-emerald-500/20",
    emoji: "🧼"
  },
  {
    id: 3,
    title: "গোসল করি",
    tip: "প্রতিদিন পরিষ্কার পানিতে সাবান মেখে গোসল করা ভালো। এতে শরীর মন দুই-ই সতেজ ও সুস্থ থাকে।",
    speechText: "গোসল করি। প্রতিদিন পরিষ্কার পানিতে সাবান মেখে গোসল করা ভালো। এতে শরীর মন দুই-ই সতেজ ও সুস্থ থাকে এবং ময়লা দূর হয়।",
    colorClass: "from-cyan-500/20 to-sky-500/10 border-cyan-500/30 text-cyan-300 hover:border-cyan-400",
    glowColor: "shadow-cyan-500/20",
    bgAccent: "bg-cyan-500/20",
    emoji: "🛁"
  },
  {
    id: 4,
    title: "খাবার খাই",
    tip: "নিয়মিত সময়ে পুষ্টিকর ও ঘরের তৈরি তাজা খাবার খাওয়া উচিত। খাওয়ার সময় গল্প বা তাড়াহুড়ো করবে না।",
    speechText: "খাবার খাই। নিয়মিত সময়ে পুষ্টিকর ও ঘরের তৈরি তাজা খাবার খাওয়া উচিত। খাওয়ার সময় গল্প বা তাড়াহুড়ো না করে চিবিয়ে খাওয়া স্বাস্থ্যের জন্য ভালো।",
    colorClass: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300 hover:border-amber-400",
    glowColor: "shadow-amber-500/20",
    bgAccent: "bg-amber-500/20",
    emoji: "🍽️"
  },
  {
    id: 5,
    title: "চুল আঁচড়াই",
    tip: "গোসল করার পর ও বাইরে যাওয়ার আগে চুল সুন্দর করে আঁচড়ানো উচিত। এতে আমাদের দেখতে পরিপাটি লাগে।",
    speechText: "চুল আঁচড়াই। গোসল করার পর ও বাইরে যাওয়ার আগে চুল সুন্দর করে আঁচড়ানো উচিত। এতে আমাদের দেখতে অত্যন্ত পরিপাটি ও লক্ষ্মী লাগে।",
    colorClass: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300 hover:border-purple-400",
    glowColor: "shadow-purple-500/20",
    bgAccent: "bg-purple-500/20",
    emoji: "🪮"
  },
  {
    id: 6,
    title: "খেলনা গোছাই",
    tip: "খেলাধুলা শেষ হওয়ার পর নিজের খেলনাগুলো নিজ দায়িত্বে সুন্দর করে গুছিয়ে বাক্সে বা তাকে রাখতে হয়।",
    speechText: "খেলনা গোছাই। খেলাধুলা শেষ হওয়ার পর নিজের খেলনাগুলো নিজ দায়িত্বে সুন্দর করে গুছিয়ে বাক্সে বা নির্দিষ্ট তাকে গুছিয়ে রাখতে হয়। এটি একটি অত্যন্ত ভালো অভ্যাস।",
    colorClass: "from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-300 hover:border-pink-400",
    glowColor: "shadow-pink-500/20",
    bgAccent: "bg-pink-500/20",
    emoji: "🧸"
  },
  {
    id: 7,
    title: "বই গোছাই",
    tip: "পড়াশোনা শেষ করে খাতা, কলম ও বই সুন্দর করে সাজিয়ে গুছিয়ে রাখবে। তাহলে পরে সহজেই খুঁজে পাবে।",
    speechText: "বই গোছাই। পড়াশোনা শেষ করে খাতা, কলম ও বই নিজের পড়ার টেবিলে সুন্দর করে সাজিয়ে গুছিয়ে রাখবে। তাহলে ঘরও সুন্দর থাকবে, বইও সহজে খুঁজে পাওয়া যাবে।",
    colorClass: "from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-300 hover:border-teal-400",
    glowColor: "shadow-teal-500/20",
    bgAccent: "bg-teal-500/20",
    emoji: "📚"
  }
];

interface RoutineQuestion {
  question: string;
  speakText: string;
  options: Array<{
    text: string;
    isCorrect: boolean;
    feedback: string;
  }>;
}

const ROUTINE_QUESTIONS: RoutineQuestion[] = [
  {
    question: "সকালে উঠে আমরা কী কী করি?",
    speakText: "সকালে উঠে আমরা কী কী করি? নিচে দেওয়া দুটি অপশন থেকে সঠিক কাজটি বেছে নাও তো বন্ধু!",
    options: [
      {
        text: "দাঁত মাজি ও হাত-মুখ ধুই",
        isCorrect: true,
        feedback: "একেবারে সঠিক! সকালে উঠে আমরা প্রথমে দাঁত মাজি ও হাত-মুখ ধুই।"
      },
      {
        text: "টিভি দেখি ও কার্টুন খেলি",
        isCorrect: false,
        feedback: "না সোনা বন্ধু, সকালে উঠে আগে দাঁত মাজা ও হাত-মুখ ধুয়ে পরিষ্কার হওয়াই ভালো অভ্যাস।"
      }
    ]
  },
  {
    question: "আমরা কেন হাত মুখ ধুই?",
    speakText: "আমরা কেন হাত মুখ ধুই? বল দেখি সোনা বন্ধুরা!",
    options: [
      {
        text: "শরীর ও হাত-মুখ পরিষ্কার ও জীবাণুমুক্ত রাখতে",
        isCorrect: true,
        feedback: "খুব সুন্দর! নিজেকে পরিষ্কার রাখতে ও রোগ-জীবাণু থেকে বাঁচতে আমরা হাত-মুখ ভালো করে ধুয়ে ফেলি।"
      },
      {
        text: "হাত-মুখে ধুলোবালি মাখানোর জন্য",
        isCorrect: false,
        feedback: "উহু বন্ধু, জীবাণু দূর করে হাত মুখ পরিষ্কার রাখতে আমরা হাত মুখ ধুয়ে থাকি।"
      }
    ]
  },
  {
    question: "আমরা কখন পড়তে বসি?",
    speakText: "আমরা কখন পড়তে বসি? বল দেখি বন্ধু!",
    options: [
      {
        text: "সকালে ও সন্ধ্যায় পড়ার সময়ে",
        isCorrect: true,
        feedback: "চমৎকার! সকালে ও সন্ধ্যায় মন দিয়ে পড়ার জন্য পড়া টেবিলে বসতে হয়।"
      },
      {
        text: "ঘুমানোর ঠিক আগে গভীর রাতে",
        isCorrect: false,
        feedback: "না বন্ধু, রাতে তাড়াতাড়ি ঘুমানো উচিত। পড়ার সঠিক সময় সকাল ও সন্ধ্যা।"
      }
    ]
  },
  {
    question: "আমরা কখন খেলা করি?",
    speakText: "আমরা কখন খেলা করি? সঠিক সময়টি বলতো দেখি!",
    options: [
      {
        text: "বিকালে খেলাধুলার সময়ে বন্ধুদের সাথে",
        isCorrect: true,
        feedback: "দারুণ! বিকালের পড়ন্ত মিষ্টি রোদে বন্ধুদের সাথে খেলাধুলা করা স্বাস্থ্যের জন্য অনেক ভালো।"
      },
      {
        text: "দুপুরে যখন অনেক রোদ ও গরম থাকে",
        isCorrect: false,
        feedback: "না বন্ধু, দুপুরের কড়া রোদের মধ্যে বাইরে খেলাধুলা করা ঠিক নয়। বিকালে খেলাধুলা করা উচিত।"
      }
    ]
  },
  {
    question: "আমরা কখন ঘুমাতে যাই?",
    speakText: "আমরা কখন ঘুমাতে যাই? বলতো সোনা বন্ধুরা!",
    options: [
      {
        text: "রাতে তাড়াতাড়ি ঘুমাতে যাই",
        isCorrect: true,
        feedback: "একদম ঠিক! রাতে তাড়াতাড়ি ঘুমিয়ে সকালে তাড়াতাড়ি ওঠা স্বাস্থ্যের জন্য খুবই ভালো!"
      },
      {
        text: "অনেক রাত করে জেগে কার্টুন দেখার পর",
        isCorrect: false,
        feedback: "না সোনা বন্ধু, রাত জেগে কার্টুন দেখা বা মোবাইল চালানো চোখের ও শরীরের জন্য অনেক ক্ষতিকর। রাতে তাড়াতাড়ি ঘুমানো উচিত।"
      }
    ]
  }
];

function Lesson6SubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [activeKid, setActiveKid] = useState<'rupa' | 'raju' | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<RoutineActivity | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [chosenOptionIdx, setChosenOptionIdx] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Intro message on mount
  useEffect(() => {
    speak("এসো বন্ধুরা! আমরা কী কী করি পাঠে তোমাদের স্বাগতম। চলো রাজু ও রূপার সাথে আমাদের প্রতিদিনের ভালো অভ্যাসগুলো শিখে নিই!");
  }, []);

  const playLocalSound = (type: 'pop' | 'sparkle' | 'success') => {
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
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.08);
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
        osc.frequency.setValueAtTime(1300, ctx.currentTime + 0.05);
        osc.frequency.setValueAtTime(1600, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'success') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        
        osc1.type = 'triangle';
        osc2.type = 'sine';
        
        osc1.frequency.setValueAtTime(523.25, ctx.currentTime); 
        osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); 
        osc1.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); 
        osc1.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.24); 
        
        osc2.frequency.setValueAtTime(261.63, ctx.currentTime); 
        osc2.frequency.setValueAtTime(329.63, ctx.currentTime + 0.08); 
        osc2.frequency.setValueAtTime(392.00, ctx.currentTime + 0.16); 
        osc2.frequency.setValueAtTime(523.25, ctx.currentTime + 0.24); 

        gain1.gain.setValueAtTime(0.12, ctx.currentTime);
        gain1.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        gain2.gain.setValueAtTime(0.1, ctx.currentTime);
        gain2.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.5);
        osc2.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      console.warn("Sound play failed", e);
    }
  };

  const handleActivityClick = (act: RoutineActivity) => {
    playLocalSound('pop');
    setSelectedActivity(act);
    speak(act.speechText);
  };

  const toggleCheckActivity = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (checkedIds.includes(id)) {
      playLocalSound('pop');
      updated = checkedIds.filter(item => item !== id);
    } else {
      playLocalSound('sparkle');
      updated = [...checkedIds, id];
      speak("দারুণ অভ্যাস!");
    }
    setCheckedIds(updated);

    if (updated.length === ROUTINE_ACTIVITIES.length) {
      setTimeout(() => {
        playLocalSound('success');
        setShowCelebration(true);
        speak("ওয়াও! অভিনন্দন বন্ধু! তুমি তোমার সবকটি ভালো দৈনিক কাজ সম্পন্ন করে ফেলেছ! তুমি একজন স্বাস্থ্য সচেতন ও পরিপাটি লক্ষ্মী সোনা বন্ধু!");
      }, 800);
    }
  };

  const handleKidGreeting = (kid: 'rupa' | 'raju') => {
    playLocalSound('sparkle');
    setActiveKid(kid);
    if (kid === 'rupa') {
      speak("হ্যালো বন্ধুরা! আমি রূপা। আজ আমি আমার প্রিয় বন্ধু রাজুর সাথে তোমাদের স্বাস্থ্যকর কাজগুলো শিখাবো। প্রতিদিন সকালে উঠে দাঁত মাজা, হাত-মুখ ধোয়া আমাদের দেহকে সুন্দর ও রোগমুক্ত রাখে!");
    } else {
      speak("হ্যালো ছোট্ট বন্ধুরা! আমি রাজু। প্রতিদিন পড়ার নির্দিষ্ট সময়ে পড়াশোনা করা আর বিকালে মন খুলে খেলাধুলা করা শরীর ও মনের জন্য খুবই ভালো। চলো রূপার সাথে আজ আমাদের ভালো অভ্যাসগুলো সম্পন্ন করি!");
    }
  };

  const handleOptionClick = (optIdx: number, isCorrect: boolean, feedback: string) => {
    setChosenOptionIdx(optIdx);
    if (isCorrect) {
      playLocalSound('success');
      setQuizScore(prev => prev + 1);
    } else {
      playLocalSound('pop');
    }
    speak(feedback);
  };

  const handleNextQuestion = () => {
    playLocalSound('pop');
    setChosenOptionIdx(null);
    if (currentQuestionIdx < ROUTINE_QUESTIONS.length - 1) {
      const nextIdx = currentQuestionIdx + 1;
      setCurrentQuestionIdx(nextIdx);
      speak(ROUTINE_QUESTIONS[nextIdx].speakText);
    } else {
      setIsQuizCompleted(true);
      playLocalSound('success');
      speak(`দারুণ কাজ! তুমি সবগুলো প্রশ্নের উত্তর দিয়েছ! তোমার মোট স্কোর হলো পাঁচ এর মধ্যে ${toBengaliNum(quizScore)}। খুব চমৎকার খেলেছো!`);
    }
  };

  const resetQuiz = () => {
    playLocalSound('sparkle');
    setCurrentQuestionIdx(0);
    setChosenOptionIdx(null);
    setQuizScore(0);
    setIsQuizCompleted(false);
    speak("চলো আমরা আবার কুইজ খেলি!");
  };

  const resetAllRoutines = () => {
    playLocalSound('sparkle');
    setCheckedIds([]);
    setSelectedActivity(null);
    setShowCelebration(false);
    speak("কাজগুলো আবার শুরু করার জন্য প্রস্তুত!");
  };

  const activeQuestion = ROUTINE_QUESTIONS[currentQuestionIdx];

  return (
    <div className="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#30363d] rounded-3xl p-4 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
        <span className="px-4 py-1.5 text-xs font-black text-cyan-400 bg-cyan-950/40 rounded-full border border-cyan-500/25 uppercase tracking-wider">
          পাঠ ৬ • আমরা কী কী করি
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 mt-2">
          🌸 আমাদের প্রতিদিনের কাজ ও কুইজ
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-bold max-w-xl mx-auto leading-relaxed">
          চলো রূপা ও রাজুর সাথে আমাদের সুস্থ ও চমৎকার থাকার প্রতিদিনের প্রয়োজনীয় কাজগুলো আনন্দের সাথে শিখে নিই!
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-slate-900/40 border border-slate-800 p-6 rounded-3xl relative z-10 text-center space-y-4">
        <h3 className="text-xs sm:text-sm uppercase font-black tracking-widest text-pink-400">
          👋 রূপা ও রাজুর সাথে পরিচিত হই (Click on them to say hello!)
        </h3>
        
        <div className="flex flex-wrap justify-center gap-8 items-center">
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleKidGreeting('rupa')}
            className={`w-36 p-4 rounded-2xl border cursor-pointer transition-all ${
              activeKid === 'rupa'
                ? 'bg-pink-500/10 border-pink-500 shadow-lg shadow-pink-500/20'
                : 'bg-slate-950/60 border-slate-850 hover:border-pink-500/40'
            }`}
          >
            <div className="w-20 h-20 mx-auto relative mb-3 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full overflow-hidden flex items-end justify-center border-2 border-pink-300 shadow">
              <div className="w-16 h-16 rounded-full bg-orange-100 relative top-2">
                <div className="absolute top-1 left-2 w-12 h-6 bg-slate-800 rounded-b-xl"></div>
                <div className="absolute top-1.5 left-2.5 w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                <div className="absolute top-1.5 right-2.5 w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                <div className="absolute top-3 left-4 w-4 h-1 bg-pink-500 rounded-full"></div>
              </div>
              <div className="absolute bottom-0 w-12 h-6 bg-rose-500 rounded-t-lg"></div>
            </div>
            
            <h4 className="text-sm font-black text-pink-300">রূপা (Rupa) 👧</h4>
            <span className="text-[10px] bg-pink-950/50 text-pink-400 px-2.5 py-0.5 rounded-full border border-pink-500/20 inline-block mt-2 font-bold">
              🦯 সহায়ক ক্রাচ
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleKidGreeting('raju')}
            className={`w-36 p-4 rounded-2xl border cursor-pointer transition-all ${
              activeKid === 'raju'
                ? 'bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/20'
                : 'bg-slate-950/60 border-slate-850 hover:border-blue-500/40'
            }`}
          >
            <div className="w-20 h-20 mx-auto relative mb-3 bg-gradient-to-b from-blue-300 to-blue-400 rounded-full overflow-hidden flex items-end justify-center border-2 border-blue-300 shadow">
              <div className="w-16 h-16 rounded-full bg-orange-100 relative top-2">
                <div className="absolute top-0.5 left-2 w-12 h-5 bg-slate-900 rounded-b-md"></div>
                <div className="absolute top-2 left-3 w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                <div className="absolute top-3.5 left-4.5 w-3 h-1 bg-blue-500 rounded-full"></div>
              </div>
              <div className="absolute bottom-0 w-12 h-6 bg-indigo-500 rounded-t-lg"></div>
            </div>
            
            <h4 className="text-sm font-black text-blue-300">রাজু (Raju) 👦</h4>
            <span className="text-[10px] bg-blue-950/50 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/20 inline-block mt-2 font-bold">
              👋 হাত নাড়ছে
            </span>
          </motion.div>

        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-slate-950/60 border border-slate-800 p-4 rounded-2xl relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-xs font-black text-teal-400 tracking-wider">🌟 দৈনিক কাজের অগ্রগতি (Routine Progress)</p>
          <p className="text-[11px] text-slate-400 font-bold">
            সবকটি ভালো অভ্যাস পূরণ করো আর জিতে নাও সুস্বাস্থ্যের চ্যাম্পিয়ন ট্রফি!
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <div className="w-full sm:w-48 h-3.5 bg-slate-900 rounded-full border border-slate-850 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${(checkedIds.length / ROUTINE_ACTIVITIES.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-black text-slate-300 min-w-[50px] text-right">
            {toBengaliNum(checkedIds.length)} / {toBengaliNum(ROUTINE_ACTIVITIES.length)} টি
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto relative z-10">
        
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm uppercase font-black tracking-wider text-emerald-400 flex items-center gap-1">
              ✨ আমার দৈনিক ভালো অভ্যাস (Click to read details & click checkmark to complete!)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ROUTINE_ACTIVITIES.map((act) => {
              const isChecked = checkedIds.includes(act.id);
              const isSelected = selectedActivity?.id === act.id;
              
              return (
                <div
                  key={act.id}
                  onClick={() => handleActivityClick(act)}
                  className={`bg-gradient-to-br ${act.colorClass} border rounded-2xl p-4 transition-all cursor-pointer relative overflow-hidden flex items-center justify-between group select-none shadow-md ${
                    isSelected ? 'ring-2 ring-emerald-400 shadow-lg scale-102' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${act.bgAccent} shadow-inner shrink-0 group-hover:scale-110 transition-transform`}>
                      {act.emoji}
                    </div>
                    
                    <div className="text-left space-y-1">
                      <h4 className="font-black text-sm text-slate-200">{act.title}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1 max-w-[150px] font-bold">
                        {act.tip}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => toggleCheckActivity(act.id, e)}
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                      isChecked
                        ? 'bg-yellow-400 border-yellow-300 text-slate-950 scale-105 shadow shadow-yellow-400/50'
                        : 'border-slate-700 bg-slate-950 hover:bg-slate-900 text-slate-500 hover:text-white'
                    }`}
                    title={isChecked ? "কাজটি সম্পন্ন হয়েছে" : "কাজটি সম্পন্ন করো"}
                  >
                    {isChecked ? (
                      <span className="text-xs font-black">⭐️</span>
                    ) : (
                      <Check className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-950/80 border-2 border-slate-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[160px]">
            {selectedActivity ? (
              <motion.div
                key={selectedActivity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{selectedActivity.emoji}</span>
                  <h4 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
                    {selectedActivity.title}
                  </h4>
                  <span className="ml-auto text-[9px] uppercase bg-teal-950/60 border border-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full font-black">
                    গুরুত্বপূর্ণ পরামর্শ
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-850">
                  {selectedActivity.tip}
                </p>

                <button
                  onClick={() => speak(selectedActivity.speechText)}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-900 hover:bg-slate-850 text-emerald-400 hover:text-white border border-emerald-500/20 rounded-full text-[10px] font-black transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>পুনরায় উচ্চারণ শোনো</span>
                </button>
              </motion.div>
            ) : (
              <div className="text-center space-y-2 py-6">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center mx-auto text-xl">
                  💡
                </div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">ভালো অভ্যাস স্পটলাইট</h4>
                <p className="text-[11px] text-slate-500 font-bold max-w-xs mx-auto">
                  বামদিকের যেকোনো অভ্যাসে ক্লিক করো। রাজু ও রূপা তোমাকে উচ্চারণ ও চমৎকার পরামর্শ পড়ে শোনাবে!
                </p>
              </div>
            )}
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs sm:text-sm uppercase font-black tracking-widest text-amber-400 flex items-center gap-1.5">
                🎤 শুনবো ও সঠিক উত্তর মেলাবো
              </h3>
              <span className="text-[9px] bg-amber-950/40 border border-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full font-black">
                প্রশ্ন {toBengaliNum(currentQuestionIdx + 1)} / {toBengaliNum(5)}
              </span>
            </div>

            {isQuizCompleted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4 py-4"
              >
                <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg shadow-amber-500/20 animate-bounce">
                  🏆
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-black text-amber-300">কুইজ সম্পন্ন হয়েছে!</h4>
                  <p className="text-xs font-bold text-slate-400">
                    তুমি ৫টি প্রশ্নের মধ্যে সঠিক উত্তর মিলিয়েছ:
                  </p>
                  <p className="text-2xl font-black text-emerald-400 mt-2">
                    {toBengaliNum(quizScore)} / {toBengaliNum(5)} টি!
                  </p>
                </div>

                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={resetQuiz}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-amber-400 hover:text-white border border-amber-500/20 text-xs font-black transition-all active:scale-95"
                  >
                    আবার খেলি (Play Again)
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-2xl text-left space-y-3 relative">
                  <p className="text-[10px] font-black uppercase text-amber-400/80">প্রশ্নটি মনোযোগ দিয়ে শোনো:</p>
                  <p className="text-sm sm:text-base font-black text-slate-200 leading-snug">
                    {activeQuestion.question}
                  </p>
                  
                  <button
                    onClick={() => speak(activeQuestion.speakText)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded-full text-[10px] font-black transition-all active:scale-95"
                  >
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>প্রশ্নটি শোনো (Listen)</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {activeQuestion.options.map((opt, oIdx) => {
                    const isChosen = chosenOptionIdx === oIdx;
                    const isCorrectOption = opt.isCorrect;
                    const showSuccess = chosenOptionIdx !== null && isCorrectOption;
                    const showFailure = isChosen && !isCorrectOption;

                    return (
                      <button
                        key={oIdx}
                        disabled={chosenOptionIdx !== null}
                        onClick={() => handleOptionClick(oIdx, opt.isCorrect, opt.feedback)}
                        className={`w-full p-3 rounded-2xl border text-left transition-all text-xs sm:text-sm font-bold flex items-center justify-between ${
                          showSuccess
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                            : showFailure
                              ? 'bg-rose-500/15 border-rose-500 text-rose-300'
                              : chosenOptionIdx !== null
                                ? 'bg-slate-950/20 border-slate-900 text-slate-600 opacity-60'
                                : 'bg-slate-900/50 border-slate-850 hover:border-amber-500/40 text-slate-300 hover:text-white'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {showSuccess && <span className="text-xs bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-black">সঠিক ✔</span>}
                        {showFailure && <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full font-black">আবার ভাবো ❌</span>}
                      </button>
                    );
                  })}
                </div>

                {chosenOptionIdx !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-2"
                  >
                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black text-xs sm:text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>{currentQuestionIdx < ROUTINE_QUESTIONS.length - 1 ? 'পরবর্তী প্রশ্ন (Next Question)' : 'ফলাফল দেখো (See Score)'}</span>
                      <ChevronRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      <div className="bg-emerald-950/10 border border-emerald-500/25 p-4 rounded-2xl text-center">
        <p className="text-xs text-emerald-400 font-black tracking-wide">
          📌 শিক্ষক ও অভিভাবক নির্দেশিকা: রূপা ও রাজুর মতো বন্ধুদের সুন্দর ছবিগুলোর মাধ্যমে স্বাস্থ্যসম্মত আচরণ বা ভালো অভ্যাসসমূহ অনুশীলনে উৎসাহিত করুন। শিশুর প্রতিদিনের রুটিন ও প্রশ্নগুলো আলোচনা করুন।
        </p>
      </div>

      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border-4 border-yellow-400 rounded-[32px] p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-yellow-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl"></div>

              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-300 flex items-center justify-center mx-auto text-4xl shadow-2xl shadow-yellow-500/30 border-2 border-yellow-200 animate-pulse">
                🏆
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">
                  সুস্বাস্থ্যের চ্যাম্পিয়ন!
                </h3>
                <span className="text-[10px] bg-emerald-950/50 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-black tracking-widest uppercase inline-block">
                  CHAMPION OF GOOD HEALTH
                </span>
                <p className="text-sm font-bold text-slate-300 leading-relaxed pt-2">
                  চমৎকার বন্ধু! তুমি আজকের সবকটি ভালো ও স্বাস্থ্যকর অভ্যাস সম্পন্ন করেছো। রূপা ও রাজু তোমার জন্য অনেক অনেক খুশি হয়েছে!
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {['⭐', '🌟', '✨', '🌟', '⭐'].map((emoji, index) => (
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
                  onClick={resetAllRoutines}
                  className="w-full py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-yellow-500/20 transition-all active:scale-95"
                >
                  আবার খেলি ও কাজ করি!
                </button>
                
                <button
                  onClick={() => setShowCelebration(false)}
                  className="w-full py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white font-black text-xs sm:text-sm transition-all"
                >
                  ফিরে যাই
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===================================================================================================
   10. PATH 10: ALPHABET SONG SUB TAB (বর্ণমালার গান - MULTIMEDIA INTERACTIVE AUDIO PLAYGROUND)
   =================================================================================================== */

interface SongStep {
  letter: string;
  lyricIndex: number;
  duration: number;
  note: number;
}

const SONG_LYRICS = [
  "অ আ ই ঈ – সুরের সাথে সুর মেলাই,",
  "উ ঊ ঋ এ – মিষ্টি মধুর ছড়া গাই।",
  "ঐ ও ঔ – মেলাবো চলো সবাই,",
  "ক খ গ ঘ ঙ – হেসে খেলি সারাদিন,",
  "চ ছ জ ঝ ঞ – পড়ার নেই কোনো ক্ষণ।",
  "ট ঠ ড ঢ ণ – বাজাবো মোরা ঢাক ঢোল,",
  "ত থ দ ধ ন – ফুল ফুটিবে গাছে গাছে,",
  "প ফ ব ভ ম – নদী বয় কলকল,",
  "য র ল শ ষ স হ – খুশিতে গাই একসাথে,",
  "ড় ঢ় য় ৎ ং ঃ ঁ – গেয়ে গান শেষ করি!"
];

const SONG_STEPS: SongStep[] = [
  // Segment 1: অ আ ই ঈ (Vowels Part 1)
  { letter: 'অ', lyricIndex: 0, duration: 1000, note: 261.63 }, // C4
  { letter: 'আ', lyricIndex: 0, duration: 1000, note: 293.66 }, // D4
  { letter: 'ই', lyricIndex: 0, duration: 1000, note: 329.63 }, // E4
  { letter: 'ঈ', lyricIndex: 0, duration: 1000, note: 349.23 }, // F4
  
  // Segment 2: উ ঊ ঋ এ (Vowels Part 2)
  { letter: 'উ', lyricIndex: 1, duration: 1000, note: 392.00 }, // G4
  { letter: 'ঊ', lyricIndex: 1, duration: 1000, note: 440.00 }, // A4
  { letter: 'ঋ', lyricIndex: 1, duration: 1000, note: 493.88 }, // B4
  { letter: 'এ', lyricIndex: 1, duration: 1000, note: 523.25 }, // C5
  
  // Segment 3: ঐ ও ঔ (Vowels Part 3)
  { letter: 'ঐ', lyricIndex: 2, duration: 1200, note: 392.00 }, // G4
  { letter: 'ও', lyricIndex: 2, duration: 1200, note: 440.00 }, // A4
  { letter: 'ঔ', lyricIndex: 2, duration: 1200, note: 523.25 }, // C5
  
  // Segment 4: ক খ গ ঘ ঙ (Consonants Part 1)
  { letter: 'ক', lyricIndex: 3, duration: 1000, note: 261.63 }, // C4
  { letter: 'খ', lyricIndex: 3, duration: 1000, note: 293.66 }, // D4
  { letter: 'গ', lyricIndex: 3, duration: 1000, note: 329.63 }, // E4
  { letter: 'ঘ', lyricIndex: 3, duration: 1000, note: 349.23 }, // F4
  { letter: 'ঙ', lyricIndex: 3, duration: 1000, note: 392.00 }, // G4
  
  // Segment 5: চ ছ জ ঝ ঞ (Consonants Part 2)
  { letter: 'চ', lyricIndex: 4, duration: 1000, note: 392.00 }, // G4
  { letter: 'ছ', lyricIndex: 4, duration: 1000, note: 440.00 }, // A4
  { letter: 'জ', lyricIndex: 4, duration: 1000, note: 493.88 }, // B4
  { letter: 'ঝ', lyricIndex: 4, duration: 1000, note: 523.25 }, // C5
  { letter: 'ঞ', lyricIndex: 4, duration: 1000, note: 587.33 }, // D5
  
  // Segment 6: ট ঠ ড ঢ ণ (Consonants Part 3)
  { letter: 'ট', lyricIndex: 5, duration: 1000, note: 523.25 }, // C5
  { letter: 'ঠ', lyricIndex: 5, duration: 1000, note: 493.88 }, // B4
  { letter: 'ড', lyricIndex: 5, duration: 1000, note: 440.00 }, // A4
  { letter: 'ঢ', lyricIndex: 5, duration: 1000, note: 392.00 }, // G4
  { letter: 'ণ', lyricIndex: 5, duration: 1000, note: 349.23 }, // F4
  
  // Segment 7: ত থ দ ধ ন (Consonants Part 4)
  { letter: 'ত', lyricIndex: 6, duration: 1000, note: 349.23 }, // F4
  { letter: 'থ', lyricIndex: 6, duration: 1000, note: 329.63 }, // E4
  { letter: 'দ', lyricIndex: 6, duration: 1000, note: 293.66 }, // D4
  { letter: 'ধ', lyricIndex: 6, duration: 1000, note: 261.63 }, // C4
  { letter: 'ন', lyricIndex: 6, duration: 1000, note: 293.66 }, // D4
  
  // Segment 8: প ফ ব ভ ম (Consonants Part 5)
  { letter: 'প', lyricIndex: 7, duration: 1000, note: 329.63 }, // E4
  { letter: 'ফ', lyricIndex: 7, duration: 1000, note: 349.23 }, // F4
  { letter: 'ব', lyricIndex: 7, duration: 1000, note: 392.00 }, // G4
  { letter: 'ভ', lyricIndex: 7, duration: 1000, note: 440.00 }, // A4
  { letter: 'ম', lyricIndex: 7, duration: 1000, note: 523.25 }, // C5
  
  // Segment 9: য র ল শ ষ স হ (Consonants Part 6)
  { letter: 'য', lyricIndex: 8, duration: 900,  note: 523.25 }, // C5
  { letter: 'র', lyricIndex: 8, duration: 900,  note: 493.88 }, // B4
  { letter: 'ল', lyricIndex: 8, duration: 900,  note: 440.00 }, // A4
  { letter: 'শ', lyricIndex: 8, duration: 900,  note: 392.00 }, // G4
  { letter: 'ষ', lyricIndex: 8, duration: 900,  note: 349.23 }, // F4
  { letter: 'স', lyricIndex: 8, duration: 900,  note: 329.63 }, // E4
  { letter: 'হ', lyricIndex: 8, duration: 900,  note: 392.00 }, // G4
  
  // Segment 10: ড় ঢ় য় ৎ ং ঃ ঁ (Modifiers & Finisher)
  { letter: 'ড়', lyricIndex: 9, duration: 900,  note: 261.63 }, // C4
  { letter: 'ঢ়', lyricIndex: 9, duration: 900,  note: 293.66 }, // D4
  { letter: 'য়', lyricIndex: 9, duration: 900,  note: 329.63 }, // E4
  { letter: 'ৎ', lyricIndex: 9, duration: 900,  note: 349.23 }, // F4
  { letter: 'ং', lyricIndex: 9, duration: 900,  note: 392.00 }, // G4
  { letter: 'ঃ', lyricIndex: 9, duration: 900,  note: 440.00 }, // A4
  { letter: 'ঁ', lyricIndex: 9, duration: 1400, note: 523.25 }  // C5 (held longer to resolve nicely)
];

const BENGALI_VOWELS = ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'];

function OldAlphabetSongSubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [tempo, setTempo] = useState<number>(1.0);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.15);
  const [activeTheme, setActiveTheme] = useState<'rainbow' | 'sunset' | 'ocean'>('rainbow');
  const [floatingNotes, setFloatingNotes] = useState<Array<{ id: number; char: string; left: number; delay: number; color: string }>>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const playTimerRef = useRef<any>(null);
  const bgArpeggioTimerRef = useRef<any>(null);
  const arpeggioStepRef = useRef<number>(0);

  // Play instruction on mount
  useEffect(() => {
    speak("এসো বন্ধুরা! আমরা একসাথে বর্ণমালার গান শুনি আর আনন্দের সাথে বাংলা বর্ণমালা শিখি!");
    return () => {
      stopSong();
    };
  }, []);

  // Soft sound effects generated via Web Audio API
  const playKidPop = (freq: number, type: 'sine' | 'triangle' = 'triangle', duration = 0.4, vol = 0.15) => {
    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol * volume, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.start();
      osc.stop(ctx.currentTime + duration + 0.1);
    } catch (e) {
      console.warn("Play pop tone failed:", e);
    }
  };

  // Run the background backing rhythm (arpeggio loops) when the song is playing
  useEffect(() => {
    if (isPlaying) {
      const chords = [
        [130.81, 164.81, 196.00], // C Major
        [174.61, 220.00, 261.63], // F Major
        [196.00, 246.94, 293.66], // G Major
        [130.81, 164.81, 196.00]  // C Major
      ];

      const playArpeggioNote = () => {
        const chordIndex = Math.floor(arpeggioStepRef.current / 4) % chords.length;
        const noteIndex = arpeggioStepRef.current % 3;
        const noteFreq = chords[chordIndex][noteIndex];
        
        // Play soft backing sine wave chords
        playKidPop(noteFreq, 'sine', 0.8, 0.08);

        // Periodically spawn floating music particle
        if (Math.random() > 0.4) {
          const noteChars = ['🎵', '🎶', '✨', '🎈', '⭐'];
          const colors = ['text-pink-400', 'text-yellow-400', 'text-cyan-400', 'text-emerald-400', 'text-purple-400'];
          const newNote = {
            id: Date.now() + Math.random(),
            char: noteChars[Math.floor(Math.random() * noteChars.length)],
            left: 10 + Math.random() * 80, // % from left
            delay: Math.random() * 0.5,
            color: colors[Math.floor(Math.random() * colors.length)]
          };
          setFloatingNotes(prev => [...prev.slice(-15), newNote]);
        }

        arpeggioStepRef.current++;
        // Adjust background tempo slightly based on user selector
        const interval = 450 / tempo;
        bgArpeggioTimerRef.current = setTimeout(playArpeggioNote, interval);
      };

      playArpeggioNote();
    } else {
      if (bgArpeggioTimerRef.current) clearTimeout(bgArpeggioTimerRef.current);
      setFloatingNotes([]);
    }

    return () => {
      if (bgArpeggioTimerRef.current) clearTimeout(bgArpeggioTimerRef.current);
    };
  }, [isPlaying, tempo, volume]);

  // Main Song Step player loop trigger
  const runNextStep = (stepIdx: number) => {
    if (stepIdx >= SONG_STEPS.length) {
      if (isLooping) {
        speak("চলো আমরা পুনরায় গানটি প্রথম থেকে শুরু করি!");
        runNextStep(0);
      } else {
        stopSong();
        speak("অসাধারণ! আমাদের পুরো বর্ণমালার গানটি অনেক সুন্দর করে শেষ হলো। চমৎকার কাজ করেছো বন্ধুরা!");
      }
      return;
    }

    setCurrentStep(stepIdx);
    const step = SONG_STEPS[stepIdx];

    // 1. Play the main visual key tone (bell)
    playKidPop(step.note, 'triangle', 1.0, 0.18);

    // 2. Vocalize the corresponding letter
    speak(step.letter);

    // 3. Setup next step trigger based on active note duration and user playback speed (tempo)
    const delay = step.duration / tempo;
    playTimerRef.current = setTimeout(() => {
      runNextStep(stepIdx + 1);
    }, delay);
  };

  const startSong = () => {
    playKidPop(523.25, 'triangle', 0.5, 0.2); // Start buzzer
    setIsPlaying(true);
    // Continue from last step or start from 0
    const startIdx = currentStep >= 0 && currentStep < SONG_STEPS.length - 1 ? currentStep + 1 : 0;
    runNextStep(startIdx);
  };

  const pauseSong = () => {
    setIsPlaying(false);
    if (playTimerRef.current) clearTimeout(playTimerRef.current);
    if (bgArpeggioTimerRef.current) clearTimeout(bgArpeggioTimerRef.current);
    speak("গানটি সাময়িক থামানো হয়েছে");
  };

  const stopSong = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
    arpeggioStepRef.current = 0;
    if (playTimerRef.current) clearTimeout(playTimerRef.current);
    if (bgArpeggioTimerRef.current) clearTimeout(bgArpeggioTimerRef.current);
  };

  const handleLetterClick = (letter: string, note: number) => {
    // Interactive Xylophone play: play the letter's note and pronounce it
    playKidPop(note, 'triangle', 1.2, 0.25);
    speak(letter);

    // If song is not running, we can temporarily highlight the letter
    if (!isPlaying) {
      const stepIdx = SONG_STEPS.findIndex(s => s.letter === letter);
      if (stepIdx >= 0) {
        setCurrentStep(stepIdx);
      }
    }
  };

  const activeStep = currentStep >= 0 ? SONG_STEPS[currentStep] : null;

  return (
    <div className="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#30363d] rounded-3xl p-4 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden">
      
      {/* Visual Floating Notes Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {floatingNotes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 500, scale: 0.6 }}
            animate={{ opacity: [0, 0.8, 0.8, 0], y: -100, scale: [0.6, 1.2, 1, 0.8], x: [0, Math.sin(note.id) * 30, Math.cos(note.id) * 30, 0] }}
            transition={{ duration: 5.5, ease: 'easeOut', delay: note.delay }}
            className={`absolute text-2xl font-black ${note.color}`}
            style={{ left: `${note.left}%`, bottom: '2%' }}
          >
            {note.char}
          </motion.div>
        ))}
      </div>

      {/* Decorative Neon Blobs */}
      <div className="absolute top-0 left-10 w-48 h-48 bg-pink-500/5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-teal-500/5 blur-3xl rounded-full pointer-events-none"></div>

      {/* Chapter Title block */}
      <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
        <span className="px-4 py-1.5 text-xs font-black text-emerald-400 bg-emerald-950/40 rounded-full border border-emerald-500/25 uppercase tracking-wider">
          পাঠ ১০ • আনন্দময় গান ও কবিতা
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 mt-2">
          🎼 वर्णমালার গান (Alphabet Melody)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-bold max-w-xl mx-auto leading-relaxed">
          গান গেয়ে বাংলা বর্ণমালা শিখি! প্রতিটি বর্ণ সুরের তালে তালে আলো ছড়াবে ও তোমাদের সুন্দর করে উচ্চারণ শেখাবে। চলো গানটি শুরু করি!
        </p>
      </div>

      {/* Main Grid & Multimedia boombox panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-5xl mx-auto relative z-10">
        
        {/* Left column: Visual Boombox Player Screen */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950/80 border-4 border-emerald-500/20 rounded-[32px] p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
            
            {/* Glossy overlay screen border effect */}
            <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 border border-emerald-500/30 text-emerald-300 text-[9px] font-black px-4 py-0.5 rounded-full uppercase tracking-widest shadow">
              গান প্লেয়ার (KIDS BOOMBOX)
            </div>

            {/* Glowing active karaoke screen container */}
            <div className="w-full aspect-video bg-zinc-950/90 rounded-2xl border-2 border-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden mt-2">
              
              {/* Dynamic Theme Background Glow */}
              <div className={`absolute inset-0 opacity-15 pointer-events-none transition-all duration-500 ${
                activeTheme === 'rainbow'
                  ? 'bg-gradient-to-tr from-pink-500 via-amber-500 to-cyan-500'
                  : activeTheme === 'sunset'
                    ? 'bg-gradient-to-tr from-rose-500 via-purple-600 to-orange-500'
                    : 'bg-gradient-to-tr from-blue-600 via-teal-500 to-cyan-400'
              }`}></div>

              {activeStep ? (
                <motion.div
                  key={activeStep.letter}
                  initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
                  animate={{ scale: [1, 1.1, 1], opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  className="space-y-2 relative z-10"
                >
                  {/* Giant Glowing spotlight active letter */}
                  <div className={`w-28 h-28 rounded-full bg-gradient-to-br flex items-center justify-center shadow-2xl border-4 text-slate-950 mx-auto transition-all ${
                    BENGALI_VOWELS.includes(activeStep.letter)
                      ? 'from-pink-500 to-rose-600 border-pink-400 shadow-pink-500/35 text-white'
                      : 'from-cyan-400 to-teal-500 border-cyan-300 shadow-cyan-500/35 text-slate-950'
                  }`}>
                    <span className="text-6xl font-black tracking-tighter filter drop-shadow">
                      {activeStep.letter}
                    </span>
                  </div>
                  
                  <span className="text-xs font-black tracking-widest text-emerald-400/90 uppercase block">
                    {BENGALI_VOWELS.includes(activeStep.letter) ? '🔴 স্বরবর্ণ (Vowel)' : '🔵 ব্যঞ্জনবর্ণ (Consonant)'}
                  </span>
                </motion.div>
              ) : (
                <div className="space-y-4 relative z-10 flex flex-col items-center">
                  {/* Retro Spinning Vinyl Disc when playing or static when paused */}
                  <div className={`w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-700 flex items-center justify-center shadow-inner relative ${
                    isPlaying ? 'animate-spin' : ''
                  }`} style={{ animationDuration: '6s' }}>
                    <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-950"></div>
                    </div>
                    {/* Retro radial grooves lines on disc */}
                    <div className="absolute inset-1 rounded-full border border-slate-800/40 pointer-events-none"></div>
                    <div className="absolute inset-4 rounded-full border border-slate-800/40 pointer-events-none"></div>
                    <div className="absolute inset-8 rounded-full border border-slate-800/40 pointer-events-none"></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-black text-slate-300">গানটি চালু করতে নিচের 'প্লে' বাটন চাপো!</p>
                    <p className="text-[10px] text-slate-500 font-bold">অথবা ডানের বর্ণমালায় ক্লিক করে বাজাও!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Micro-Progress Bar for Song Tracker */}
            <div className="w-full mt-5 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-black text-slate-500 px-1">
                <span>শুরু (Start)</span>
                <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded font-black">
                  অগ্রগতি: {toBengaliNum(currentStep >= 0 ? currentStep + 1 : 0)} / {toBengaliNum(50)}
                </span>
                <span>শেষ (End)</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full border border-slate-800 relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / SONG_STEPS.length) * 100}%` }}
                />
                {/* Cute little runner balloon pointer */}
                {currentStep >= 0 && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-yellow-400 border-2 border-slate-950 shadow flex items-center justify-center text-[8px] transition-all duration-300 pointer-events-none"
                    style={{ left: `calc(${((currentStep + 1) / SONG_STEPS.length) * 100}% - 9px)` }}
                  >
                    🎈
                  </div>
                )}
              </div>
            </div>

            {/* Primary Kid-Friendly Player Controls panel */}
            <div className="w-full mt-6 space-y-5">
              <div className="flex items-center justify-center gap-3.5">
                
                {/* Reset button */}
                <button
                  onClick={() => {
                    playKidPop(440, 'triangle', 0.2);
                    stopSong();
                    speak("গান পুনরায় প্রথম থেকে সেট করা হয়েছে");
                  }}
                  className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-full transition-all active:scale-90"
                  title="প্রথম থেকে শুরু করো (Reset)"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                {/* Main Play / Pause Button */}
                {isPlaying ? (
                  <button
                    onClick={pauseSong}
                    className="p-5.5 bg-rose-600 hover:bg-rose-500 text-white rounded-full transition-all active:scale-95 shadow-xl shadow-rose-900/30 border-2 border-rose-500/30 flex items-center justify-center"
                    title="সাময়িক থামাও (Pause)"
                  >
                    <Pause className="w-6 h-6 fill-white text-white" />
                  </button>
                ) : (
                  <button
                    onClick={startSong}
                    className="p-5.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-full transition-all active:scale-95 shadow-xl shadow-teal-950/40 border-2 border-emerald-400/20 flex items-center justify-center"
                    title="গান শুরু করো (Play)"
                  >
                    <Play className="w-6 h-6 fill-slate-950 text-slate-950" />
                  </button>
                )}

                {/* Stop button */}
                <button
                  onClick={() => {
                    playKidPop(350, 'sine', 0.3, 0.15);
                    stopSong();
                    speak("গান বন্ধ করা হয়েছে");
                  }}
                  className="p-3 bg-slate-900 hover:bg-rose-950/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/10 rounded-full transition-all active:scale-90"
                  title="গান পুরোপুরি বন্ধ করো (Stop)"
                >
                  {/* Square shape for Stop */}
                  <div className="w-5 h-5 bg-current rounded" />
                </button>

              </div>

              {/* Tempo / Playback Speed Controls */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">🏃 গতির নিয়ন্ত্রণ:</span>
                <div className="flex gap-1.5">
                  {[
                    { value: 0.75, label: 'ধীর' },
                    { value: 1.0, label: 'স্বাভাবিক' },
                    { value: 1.25, label: 'দ্রুত' }
                  ].map((t) => (
                    <button
                      key={t.value}
                      onClick={() => {
                        playKidPop(520, 'triangle', 0.1);
                        setTempo(t.value);
                        speak(`গতি ${t.label} করা হয়েছে`);
                      }}
                      className={`px-3 py-1 rounded-lg text-[10px] font-black border transition-all ${
                        tempo === t.value
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loop, Volume Slider & Theme Control Grid */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* Loop Toggle Button */}
                <button
                  onClick={() => {
                    playKidPop(440, 'triangle', 0.1);
                    setIsLooping(!isLooping);
                    speak(isLooping ? "লুপ বন্ধ করা হয়েছে" : "গানটি বারবার চলার জন্য লুপ চালু করা হয়েছে");
                  }}
                  className={`py-2 px-3 rounded-xl text-[10px] font-black border transition-all flex items-center justify-center gap-1.5 ${
                    isLooping
                      ? 'bg-teal-500 border-teal-400 text-slate-950'
                      : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-white'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isLooping ? '🔄 লুপ চালু (Loop On)' : '🔄 লুপ বন্ধ (Once)'}</span>
                </button>

                {/* Screen Theme Switcher Selector */}
                <select
                  value={activeTheme}
                  onChange={(e) => {
                    const themeValue = e.target.value as 'rainbow' | 'sunset' | 'ocean';
                    setActiveTheme(themeValue);
                    playKidPop(500, 'triangle', 0.1);
                  }}
                  className="bg-slate-900 border border-slate-850 text-slate-300 rounded-xl px-3 py-2 text-[10px] font-black focus:outline-none focus:border-emerald-500"
                >
                  <option value="rainbow">🎨 রঙধনু স্ক্রিন</option>
                  <option value="sunset">🌅 গোধূলি স্ক্রিন</option>
                  <option value="ocean">🌊 নীলিমা স্ক্রিন</option>
                </select>

              </div>

              {/* Volume Slider Block */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="0.4"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                  title="গানের সুরের ভলিউম"
                />
                <span className="text-[9px] text-slate-500 font-extrabold shrink-0">
                  {toBengaliNum(Math.round(volume * 250))}%
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* Right column: The 50 Interactive Alphabet Grid & Highlighted Lyrics Karaoke Box */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: The 50 Interactive Letters Playground Grid */}
          <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs uppercase font-black tracking-widest text-emerald-400 flex items-center gap-1">
                🎹 বর্ণমালা অর্কেস্ট্রা (Click any letter to play note!)
              </h4>
              <span className="text-[9px] text-pink-400 bg-pink-950/40 border border-pink-500/20 px-2 py-0.5 rounded-full font-bold">
                🔴 স্বরবর্ণ
              </span>
              <span className="text-[9px] text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded-full font-bold">
                🔵 ব্যঞ্জনবর্ণ
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 select-none">
              {SONG_STEPS.map((step, idx) => {
                const isActive = currentStep === idx;
                const isVowel = BENGALI_VOWELS.includes(step.letter);
                return (
                  <button
                    key={step.letter + idx}
                    onClick={() => handleLetterClick(step.letter, step.note)}
                    className={`h-11 rounded-xl font-black text-lg transition-all duration-150 relative flex items-center justify-center border shadow-inner ${
                      isActive
                        ? isVowel
                          ? 'bg-gradient-to-br from-pink-500 to-rose-600 border-pink-400 text-white scale-115 ring-2 ring-pink-400 ring-offset-2 ring-offset-slate-950 z-10 shadow-lg shadow-pink-500/20'
                          : 'bg-gradient-to-br from-cyan-400 to-teal-500 border-cyan-300 text-slate-950 scale-115 ring-2 ring-cyan-300 ring-offset-2 ring-offset-slate-950 z-10 shadow-lg shadow-cyan-500/20'
                        : isVowel
                          ? 'bg-slate-900/50 border-pink-500/15 text-pink-400 hover:text-white hover:bg-pink-600/10 hover:border-pink-500/40'
                          : 'bg-slate-900/50 border-cyan-500/15 text-cyan-400 hover:text-white hover:bg-cyan-600/10 hover:border-cyan-500/40'
                    }`}
                  >
                    <span>{step.letter}</span>
                    {/* Small dot indicating active pitch indicator */}
                    {isActive && (
                      <span className="absolute -bottom-1 w-2 h-2 rounded-full bg-white animate-ping"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Synced Lyrics Karaoke Highlighter Board */}
          <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-3xl space-y-4">
            <h4 className="text-xs uppercase font-black tracking-widest text-amber-400 flex items-center gap-1.5">
              🎤 গানের লিরিক্স (Karaoke Lyrics Tracker)
            </h4>
            
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 select-none font-sans">
              {SONG_LYRICS.map((line, lineIdx) => {
                const isActiveLine = activeStep ? activeStep.lyricIndex === lineIdx : false;
                
                return (
                  <div
                    key={lineIdx}
                    className={`p-3 rounded-2xl border transition-all ${
                      isActiveLine
                        ? 'bg-gradient-to-r from-amber-500/15 to-orange-500/5 border-amber-500 text-white font-black pl-5'
                        : 'bg-slate-900/20 border-slate-850 text-slate-500 font-bold'
                    }`}
                  >
                    <p className={`text-sm sm:text-base transition-colors ${
                      isActiveLine ? 'text-amber-300 font-black' : 'font-semibold'
                    }`}>
                      {line}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Educational Textbook instruction footer matching NCTB layout */}
          <div className="bg-emerald-950/10 border border-emerald-500/25 p-4 rounded-2xl text-center">
            <p className="text-xs text-emerald-400 font-black tracking-wide">
              📌 শিক্ষক ও অভিভাবক নির্দেশিকা: গানটি বারবার গেয়ে শিশুকে বর্ণমালার ক্রমানুসারে স্বরবর্ণ ও ব্যঞ্জনবর্ণগুলোর উচ্চারণ ও আকৃতি আত্মস্থ করতে সাহায্য করুন।
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

/* ===================================================================================================
   11. LESSONS 10 TO 13 SUB TAB: VOWEL LETTERS (অ, আ, ই, ঈ, উ, ঊ, ঋ)
   =================================================================================================== */
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

export function Lessons10to13SubTab({ speak }: { speak: (text: string) => Promise<void> | void }) {
  const [activeLesson, setActiveLesson] = useState<10 | 11 | 12 | 13>(10);
  const [lesson13Page, setLesson13Page] = useState<18 | 19>(18);
  const [canvasColor, setCanvasColor] = useState<string>('#ec4899'); // Default pink/fuchsia
  const [canvasSize, setCanvasSize] = useState<number>(14);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [showStrokeGuide, setShowStrokeGuide] = useState<boolean>(true);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);
  const [quizQuestionIdx, setQuizQuestionIdx] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Page 19 Specific States
  const [circledIndices, setCircledIndices] = useState<number[]>([]);
  const [slots, setSlots] = useState<({ letter: string; index: number } | null)[]>(Array(7).fill(null));
  const [sortingResult, setSortingResult] = useState<'correct' | 'incorrect' | null>(null);
  const [catMeowed, setCatMeowed] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Web Audio Sound Synthesizer
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

  // Lessons Data Definitions with lovely SVG Illustrations
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
              <path d="M85 96 L90 75 L95 96" stroke="#15803d" strokeWidth="3" fill="none" />
              <polygon points="25,80 75,80 90,65 40,65" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
              <polygon points="25,80 25,95 75,95 75,80" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
              <polygon points="75,80 75,95 90,80 90,65" fill="#c2410c" stroke="#9a3412" strokeWidth="1.5" />
              <ellipse cx="40" cy="88" rx="4" ry="2" fill="#9a3412" />
              <ellipse cx="60" cy="88" rx="4" ry="2" fill="#9a3412" />
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
              <path d="M25 48 L15 55 M35 45 L25 55 M85 45 L95 55 M75 48 L85 55" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
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
              <path d="M5 105 Q60 85 115 105" fill="#fef08a" opacity="0.5" />
              <path d="M25 110 Q70 95 115 110" fill="#fef08a" />
              <rect x="45" y="75" width="4" height="25" fill="#ca8a04" rx="1" />
              <rect x="53" y="75" width="4" height="25" fill="#a16207" rx="1" />
              <rect x="75" y="75" width="4" height="25" fill="#ca8a04" rx="1" />
              <rect x="83" y="75" width="4" height="25" fill="#a16207" rx="1" />
              <ellipse cx="65" cy="65" rx="20" ry="12" fill="#ca8a04" />
              <circle cx="65" cy="50" r="10" fill="#ca8a04" />
              <path d="M48 65 Q35 55 38 40 L34 36 L30 40 Q38 60 48 65 Z" fill="#ca8a04" />
              <circle cx="36" cy="40" r="1.5" fill="#000000" />
              <path d="M85 65 Q95 70 93 85" stroke="#a16207" strokeWidth="2.5" fill="none" strokeLinecap="round" />
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
              <circle cx="64" cy="84" r="3.5" fill="#e0f2fe" />
              <circle cx="106" cy="61" r="5" fill="#ffffff" />
              <circle cx="112" cy="66" r="4" fill="#e0f2fe" />
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
              <path d="M75 35 Q65 35 65 45 Q75 45 80 40 Q90 40 85 30 Z" fill="#94a3b8" />
              <line x1="70" y1="48" x2="67" y2="58" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
              <line x1="78" y1="48" x2="75" y2="58" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
              <circle cx="60" cy="95" r="5" fill="#f43f5e" />
              <circle cx="53" cy="90" r="4" fill="#fb7185" />
              <circle cx="67" cy="90" r="4" fill="#fb7185" />
              <circle cx="53" cy="100" r="4" fill="#fb7185" />
              <circle cx="67" cy="100" r="4" fill="#fb7185" />
              <circle cx="60" cy="95" r="2.5" fill="#fef08a" />
              <path d="M60 100 L60 118" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
              <path d="M60 108 Q68 106 66 112" fill="#15803d" />
            </svg>
          )
        }
      ],
      additionalSentences: [
        { text: "ফুল ফোটে পাখি গায়।" },
        { text: "বাংলাদেশে ছয়টি ঋতু।" }
      ]
    }
  };

  const activeData = lessonsData[activeLesson];
  const [activeLetter, setActiveLetter] = useState<string>(activeData.vowels[0]);

  // Update selected letter when switching lesson tabs or subpages
  useEffect(() => {
    setActiveLetter(lessonsData[activeLesson].vowels[0]);
    clearCanvas();
    setCircledIndices([]);
    setSlots(Array(7).fill(null));
    setSortingResult(null);
    setCatMeowed(false);
    
    // Trigger progress log
    const prevListens = parseInt(localStorage.getItem('bangla_mission_listen_count') || '0', 10);
    localStorage.setItem('bangla_mission_listen_count', (prevListens + 1).toString());

    if (activeLesson === 13 && lesson13Page === 19) {
      speak("পাঠ ১৩, পৃষ্ঠা ১৯। বর্ণ খুঁজে বের করি ও গোল দাগ দিই, এবং সাজিয়ে লিখি!");
    } else {
      speak(`${activeData.title}! ${activeData.subtitle}! ${activeData.instruction}`);
    }
  }, [activeLesson, lesson13Page]);

  // Handle letter switch inside the same lesson (e.g. অ to আ)
  const handleLetterTabSwitch = (lettr: string) => {
    playLocalSound('pop');
    setActiveLetter(lettr);
    clearCanvas();
    speak(lettr);
  };

  // Canvas Tracing Logic
  useEffect(() => {
    if (canvasRef.current) {
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

    // Reward drawing with chime, increment missions
    playLocalSound('sparkle');
    const prevDraws = parseInt(localStorage.getItem('bangla_mission_draw_count') || '0', 10);
    localStorage.setItem('bangla_mission_draw_count', (prevDraws + 1).toString());
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !contextRef.current) return;
    contextRef.current.clearRect(0, 0, 320, 320);
    playLocalSound('pop');
  };

  // Interactive Mini-game (Word-to-Letter matching challenge)
  const QUIZ_QUESTIONS = [
    { text: "অশোক ফুল কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "অ", options: ["অ", "আ", "ই", "ঋ"], illustration: "🌸" },
    { text: "আম মিষ্টি ফল! আম কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "আ", options: ["ই", "উ", "আ", "ঈ"], illustration: "🥭" },
    { text: "ইট দিয়ে বাড়ি বানাই! ইট কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "ই", options: ["ঈ", "ই", "উ", "ঋ"], illustration: "🧱" },
    { text: "ঈগল ওড়ে নীল আকাশে! ঈগল কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "ঈ", options: ["ই", "ঊ", "ঈ", "অ"], illustration: "🦅" },
    { text: "উট মরুভূমিতে হাঁটে! উট কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "উ", options: ["উ", "ঊ", "ঋ", "আ"], illustration: "🐫" },
    { text: "ঊর্মি মানে সাগরের ঢেউ! ঊর্মি কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "ঊ", options: ["উ", "ঊ", "ই", "অ"], illustration: "🌊" },
    { text: "আমাদের দেশে ছয়টি ঋতু! ঋতু কোন বর্ণ দিয়ে শুরু হয়?", correctAnswer: "ঋ", options: ["ঋ", "উ", "আ", "ঈ"], illustration: "🌿" }
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
      
      // Increment quiz logs
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
      // Completed all
      setShowCelebration(true);
      speak("অভিনন্দন সোনা বন্ধু! তুমি কুইজের সবকটি চমৎকার উত্তর সম্পন্ন করেছ এবং মেডেল জিতেছ!");
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

  // Tracing Reference letters template stroke orders
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
      default:
        return "";
    }
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-4 sm:p-8 shadow-xl space-y-8 relative overflow-hidden">
      
      {/* Visual Accent Blurs */}
      <div className="absolute top-0 right-10 w-64 h-64 bg-teal-500/5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-pink-500/5 blur-3xl rounded-full pointer-events-none"></div>

      {/* Title */}
      <div className="text-center space-y-2">
        <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded-full tracking-widest inline-block">
          📖 স্বরবর্ণ পাঠ (Vowels) • NCTB
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white flex items-center justify-center gap-2">
          🍎 বর্ণ শিখি ও লিখন অনুশীলন (পাঠ ১০ - ১৩)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-semibold">
          ছবি দেখে শুনি ও বলি, সুন্দর করে বর্ণের উপর হাত ঘোরাই এবং মজার কুইজ খেলে পুরস্কার জিতি!
        </p>
      </div>

      {/* Lesson Selector Row */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-slate-950/40 p-2 rounded-2xl border border-slate-800/40 max-w-2xl mx-auto">
        {([10, 11, 12, 13] as const).map((num) => (
          <button
            key={num}
            onClick={() => {
              playLocalSound('pop');
              setActiveLesson(num);
              if (num !== 13) {
                setLesson13Page(18);
              }
            }}
            className={`flex-1 min-w-[100px] px-3 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              activeLesson === num
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg scale-102'
                : 'bg-slate-900/50 text-slate-400 hover:text-white border border-slate-800/40'
            }`}
          >
            পাঠ {toBengaliNum(num)} ({num === 10 ? "অ আ" : num === 11 ? "ই ঈ" : num === 12 ? "উ ঊ" : "ঋ"})
          </button>
        ))}
      </div>

      {/* Lesson 13 Page Sub-Tabs */}
      {activeLesson === 13 && (
        <div className="flex justify-center gap-3 bg-slate-950/40 p-1.5 rounded-2xl border border-slate-800/40 max-w-md mx-auto">
          <button
            onClick={() => {
              playLocalSound('pop');
              setLesson13Page(18);
            }}
            className={`flex-1 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              lesson13Page === 18
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'bg-slate-900/50 text-slate-400 hover:text-white'
            }`}
          >
            ঋ শিখি (পৃষ্ঠা ১৮)
          </button>
          <button
            onClick={() => {
              playLocalSound('pop');
              setLesson13Page(19);
            }}
            className={`flex-1 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              lesson13Page === 19
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'bg-slate-900/50 text-slate-400 hover:text-white'
            }`}
          >
            অনুশীলন ও সাজিয়ে লিখি (পৃষ্ঠা ১৯)
          </button>
        </div>
      )}

      {/* Lesson Body Grid / Page 19 Custom Layout */}
      {activeLesson === 13 && lesson13Page === 19 ? (
        <div className="space-y-8 animate-fade-in">
          
          {/* Section 1: Circle the letters */}
          <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl space-y-6">
            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-base sm:text-lg font-black text-amber-400 flex items-center justify-center sm:justify-start gap-2">
                <span className="bg-amber-950 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-xl text-xs">ধাপ ১</span>
                <span>বর্ণ খুঁজে বের করি ও গোল দাগ দিই (Find & Circle)</span>
              </h3>
              <p className="text-xs text-slate-400 font-bold ml-1">
                নিচের স্বরবর্ণগুলোতে ক্লিক করে গোল দাগ দাও এবং তাদের চমৎকার উচ্চারণ শোনো!
              </p>
            </div>

            {/* Circular bubble container */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 py-4">
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
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-black transition-all ${
                      isCircled
                        ? 'bg-rose-500/10 text-rose-400 border-transparent shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                        : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {letter}
                    
                    {/* Animated hand-drawn circle SVG overlay */}
                    {isCircled && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none text-rose-500" viewBox="0 0 100 100">
                        <motion.ellipse
                          cx="50"
                          cy="50"
                          rx="44"
                          ry="38"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, rotate: -5 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          transform="rotate(-5, 50, 50)"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  playLocalSound('sparkle');
                  setCircledIndices([]);
                  speak("সব গোল দাগ মুছে ফেলা হয়েছে!");
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs font-black text-slate-400 hover:text-white transition-all active:scale-95 animate-fade-in"
              >
                সব গোল মুছুন (Reset Circles)
              </button>
            </div>
          </div>

          {/* Section 2: Arrange & Write */}
          <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl space-y-6">
            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-base sm:text-lg font-black text-teal-400 flex items-center justify-center sm:justify-start gap-2">
                <span className="bg-teal-950 text-teal-400 border border-teal-500/20 px-2.5 py-1 rounded-xl text-xs">ধাপ ২</span>
                <span>সাজিয়ে লিখি (Arrange Vowels in Correct Order)</span>
              </h3>
              <p className="text-xs text-slate-400 font-bold ml-1">
                নিচের এলোমেলো স্বরবর্ণগুলোতে ক্লিক করে সঠিক ধারাবাহিকতায় (অ থেকে ঋ) সাজাও:
              </p>
            </div>

            {/* Jumbled scrambled letter buttons */}
            <div className="space-y-4">
              <p className="text-[10px] text-amber-500 font-black tracking-widest uppercase text-center">এলোমেলো বর্ণমালা (Click to place):</p>
              <div className="flex flex-wrap justify-center gap-3">
                {["ই", "ঊ", "অ", "ঈ", "আ", "উ", "ঋ"].map((letter, index) => {
                  const isPlaced = slots.some(s => s?.index === index);
                  return (
                    <button
                      key={index}
                      disabled={isPlaced && sortingResult === 'correct'}
                      onClick={() => {
                        const slotIdx = slots.findIndex(s => s?.index === index);
                        if (slotIdx !== -1) {
                          // Remove
                          playLocalSound('pop');
                          const newSlots = [...slots];
                          newSlots[slotIdx] = null;
                          setSlots(newSlots);
                          setSortingResult(null);
                        } else {
                          // Place in first empty slot
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
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl text-xl sm:text-2xl font-black transition-all flex items-center justify-center ${
                        isPlaced
                          ? 'bg-slate-950 text-slate-700 border-dashed border-slate-850 cursor-pointer hover:bg-slate-900 hover:text-slate-500'
                          : 'bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-teal-500/40 text-slate-200 hover:scale-105 active:scale-95 shadow-md'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Slots Row */}
            <div className="space-y-4 pt-4 border-t border-slate-900">
              <p className="text-[10px] text-emerald-400 font-black tracking-widest uppercase text-center">খাতা / খালি ঘর (Alphabetical Order):</p>
              
              <div className="grid grid-cols-7 gap-1.5 sm:gap-3 max-w-2xl mx-auto">
                {slots.map((slot, index) => {
                  const correctOrder = ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ'];
                  const isCorrect = slot && slot.letter === correctOrder[index];
                  
                  return (
                    <div key={index} className="space-y-1.5 text-center">
                      <motion.div
                        onClick={() => {
                          if (slot && sortingResult !== 'correct') {
                            playLocalSound('pop');
                            const newSlots = [...slots];
                            newSlots[index] = null;
                            setSlots(newSlots);
                            setSortingResult(null);
                          }
                        }}
                        animate={sortingResult === 'incorrect' && !isCorrect ? { x: [-4, 4, -4, 4, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className={`aspect-square w-full rounded-xl border-2 flex items-center justify-center text-lg sm:text-2xl font-black transition-all relative ${
                          slot
                            ? sortingResult === 'correct'
                              ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400'
                              : sortingResult === 'incorrect'
                                ? isCorrect
                                  ? 'bg-emerald-950/20 border-emerald-600/60 text-emerald-500'
                                  : 'bg-rose-950/40 border-rose-500 text-rose-400'
                                : 'bg-slate-900 border-slate-700 text-white cursor-pointer hover:border-rose-400/50'
                            : 'border-dashed border-slate-800 bg-slate-950/60 text-slate-600'
                        }`}
                      >
                        {slot ? slot.letter : ''}
                        
                        {/* Alphabet help shadow hints ONLY if incorrect or empty */}
                        {!slot && (
                          <span className="absolute text-[9px] sm:text-xs text-slate-850 pointer-events-none font-bold uppercase select-none">
                            ঘর {toBengaliNum(index + 1)}
                          </span>
                        )}
                      </motion.div>
                      <span className="text-[10px] text-slate-500 font-extrabold block">
                        {toBengaliNum(index + 1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Control Buttons for sorting */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <button
                onClick={resetSorting}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-black transition-all active:scale-95"
              >
                আবার সাজাই (Reset Slots)
              </button>
              
              <button
                disabled={slots.includes(null)}
                onClick={() => {
                  const answerOrder = slots.map(s => s ? s.letter : '');
                  const correctOrder = ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ'];
                  const allCorrect = answerOrder.every((val, idx) => val === correctOrder[idx]);

                  if (allCorrect) {
                    playLocalSound('success');
                    speak("অসাধারণ সোনামণি! তুমি সবকটি বর্ণ চমৎকারভাবে সাজিয়ে লিখেছ!");
                    setSortingResult('correct');
                    
                    // Award celebration triggers
                    const prevQuiz = parseInt(localStorage.getItem('bangla_mission_quiz_count') || '0', 10);
                    localStorage.setItem('bangla_mission_quiz_count', (prevQuiz + 1).toString());
                  } else {
                    playLocalSound('incorrect');
                    speak("ইস্! সাজানোটা ঠিক হয়নি বন্ধু। আবার চেষ্টা করো!");
                    setSortingResult('incorrect');
                  }
                }}
                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95 shadow-md ${
                  slots.includes(null)
                    ? 'bg-slate-900 text-slate-600 border border-slate-850 cursor-not-allowed'
                    : 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black hover:scale-102'
                }`}
              >
                পরীক্ষা করো (Verify Order)
              </button>
            </div>

            {sortingResult === 'correct' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl text-center space-y-2 max-w-md mx-auto"
              >
                <span className="text-3xl">🏆🏅👑</span>
                <h4 className="text-sm font-black text-emerald-400">অপূর্ব হয়েছে সোনামণি বন্ধু!</h4>
                <p className="text-xs text-slate-300">
                  তুমি সঠিকভাবে সব স্বরবর্ণ সাজিয়ে ক্রমানুসারে লিখতে পেরেছ! তোমাকে জানাই অনেক অভিনন্দন! 💖
                </p>
              </motion.div>
            )}
          </div>

          {/* Section 3: Interactive Illustration and Textbook Page footer */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Vector Illustration of Kids & Cat */}
            <div className="md:col-span-7 bg-slate-950/40 border border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center justify-center gap-1">
                  <Smile className="w-4 h-4" />
                  <span>এসো বন্ধুদের সাথে আঁকাআঁকি করি!</span>
                </h4>
                <p className="text-[11px] text-slate-400 font-bold">
                  নিচের বিড়ালটিতে ক্লিক করে তার সুন্দর আওয়াজ শোনো!
                </p>
              </div>

              {/* The SVG Artwork */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-950 flex items-center justify-center">
                <svg viewBox="0 0 400 240" className="w-full max-w-sm drop-shadow-lg">
                  {/* Grass background ellipse */}
                  <ellipse cx="200" cy="190" rx="160" ry="35" fill="#1b2e22" opacity="0.6" />
                  
                  {/* Left Child (Boy) */}
                  <g transform="translate(90, 120)">
                    {/* Pants */}
                    <path d="M-20 40 L20 40 L15 65 L-15 65 Z" fill="#1d4ed8" />
                    {/* Shirt */}
                    <path d="M-25 0 L25 0 L30 40 L-30 40 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                    {/* Head */}
                    <circle cx="0" cy="-25" r="18" fill="#fbcfe8" />
                    {/* Hair */}
                    <path d="M-19 -25 C-12 -42 12 -42 19 -25 C10 -35 -10 -35 -19 -25" fill="#0f172a" />
                    {/* Eyes */}
                    <circle cx="-6" cy="-25" r="1.5" fill="#0f172a" />
                    <circle cx="6" cy="-25" r="1.5" fill="#0f172a" />
                    {/* Smile */}
                    <path d="M-4 -17 Q0 -13 4 -17" stroke="#e11d48" strokeWidth="2" fill="none" />
                    {/* Hands drawing */}
                    <line x1="-20" y1="15" x2="-8" y2="45" stroke="#fbcfe8" strokeWidth="6" strokeLinecap="round" />
                    <line x1="20" y1="15" x2="8" y2="45" stroke="#fbcfe8" strokeWidth="6" strokeLinecap="round" />
                  </g>

                  {/* Right Child (Girl) */}
                  <g transform="translate(310, 120)">
                    {/* Skirt */}
                    <path d="M-20 40 L20 40 L25 65 L-25 65 Z" fill="#0369a1" />
                    {/* Shirt */}
                    <path d="M-25 0 L25 0 L30 40 L-30 40 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                    {/* Head */}
                    <circle cx="0" cy="-25" r="18" fill="#ffe4e6" />
                    {/* Hair */}
                    <path d="M-19 -25 C-12 -42 12 -42 19 -25 C10 -35 -10 -35 -19 -25" fill="#1e293b" />
                    {/* Ponytail */}
                    <path d="M16 -23 C25 -20 28 -5 23 10" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    {/* Eyes */}
                    <circle cx="-6" cy="-25" r="1.5" fill="#0f172a" />
                    <circle cx="6" cy="-25" r="1.5" fill="#0f172a" />
                    {/* Smile */}
                    <path d="M-4 -17 Q0 -13 4 -17" stroke="#e11d48" strokeWidth="2" fill="none" />
                    {/* Hands drawing */}
                    <line x1="-20" y1="15" x2="-8" y2="45" stroke="#ffe4e6" strokeWidth="6" strokeLinecap="round" />
                    {/* Waving Hand */}
                    <line x1="20" y1="15" x2="35" y2="-5" stroke="#ffe4e6" strokeWidth="6" strokeLinecap="round" />
                  </g>

                  {/* Open drawing books on the floor */}
                  <g transform="translate(200, 175)">
                    {/* Left Book */}
                    <polygon points="-70,-5 -15,-12 -20,15 -75,20" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                    <path d="M-60,3 L-30,0" stroke="#94a3b8" strokeWidth="1" />
                    <text x="-58" y="14" fill="#ea580c" className="text-[8px] font-black">অ আ</text>

                    {/* Right Book */}
                    <polygon points="-15,-12 40,-5 35,20 -20,15" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                    <path d="M-2,0 L28,3" stroke="#94a3b8" strokeWidth="1" />
                    <text x="2" y="14" fill="#0284c7" className="text-[8px] font-black">ঋতু</text>
                  </g>

                  {/* Interactive Cat in the Center */}
                  <g
                    transform="translate(200, 150)"
                    onClick={() => {
                      playLocalSound('sparkle');
                      setCatMeowed(true);
                      speak("মিউ! মিউ! চলো একসাথে অ আ শিখি!");
                      setTimeout(() => setCatMeowed(false), 1200);
                    }}
                    className="cursor-pointer group"
                  >
                    {/* Glow effect on hover */}
                    <ellipse cx="0" cy="15" rx="22" ry="18" fill="#facc15" opacity="0" className="group-hover:opacity-10 transition-all" />
                    
                    {/* Cat body */}
                    <ellipse cx="0" cy="15" rx="16" ry="13" fill="#64748b" className="transition-all group-hover:fill-slate-400" />
                    {/* Cat head */}
                    <circle cx="0" cy="-3" r="10" fill="#64748b" className="transition-all group-hover:fill-slate-400" />
                    
                    {/* Speech bubble when cat meows */}
                    {catMeowed && (
                      <g transform="translate(0, -32)" className="animate-bounce">
                        <rect x="-35" y="-14" width="70" height="20" fill="#fef08a" rx="6" />
                        <polygon points="0,6 -4,1 4,1" fill="#fef08a" />
                        <text x="0" y="0" textAnchor="middle" fill="#854d0e" className="text-[8px] font-black">মিউ! মিউ! 🐾</text>
                      </g>
                    )}

                    {/* Cat ears */}
                    <polygon points="-8,-10 -3,-13 -1,-7" fill="#475569" />
                    <polygon points="8,-10 3,-13 1,-7" fill="#475569" />
                    {/* Cat eyes */}
                    <circle cx="-3" cy="-3" r="1" fill="#facc15" />
                    <circle cx="3" cy="-3" r="1" fill="#facc15" />
                    {/* Cat nose */}
                    <polygon points="-1,0 1,0 0,1.5" fill="#f43f5e" />
                    {/* Cat tail */}
                    <path d="M12,20 C22,20 20,8 16,-1" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Page info and instruction footer matching NCTB layout */}
            <div className="md:col-span-5 bg-amber-950/10 border border-amber-500/20 p-5 rounded-3xl space-y-4">
              <span className="text-3xl inline-block">🌸🌺🌼</span>
              <h4 className="text-sm font-black text-amber-400">পাঠ্যবইয়ের অনুশীলনী (পৃষ্ঠা ১৯)</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                এই অংশটি জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) প্রণীত প্রথম শ্রেণীর বাংলা পাঠ্যবইয়ের ১৯ নম্বর পৃষ্ঠার অনুকরণে তৈরি। 
              </p>
              <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                <p className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wide mb-1">🎯 শিক্ষণ অর্জন:</p>
                <ul className="text-[10px] text-slate-400 space-y-1 font-bold">
                  <li>• অ থেকে ঋ পর্যন্ত স্বরবর্ণগুলো চেনা ও গোল দাগ দেওয়া</li>
                  <li>• স্বরবর্ণগুলোর সঠিক ধারাবাহিকতা বজায় রেখে সাজিয়ে লেখা</li>
                </ul>
              </div>
              <p className="text-[10px] text-slate-500 font-bold italic">
                * বিড়ালটিতে ক্লিক করলে বিড়াল ডাকবে এবং মজার বাংলা বলবে!
              </p>
            </div>

          </div>

        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Words and Audio Listening Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-3xl space-y-4">
              <h3 className="text-sm font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
                <Volume2 className="w-4 h-4" />
                <span>১. শুনি ও বলি (Listen & Speak)</span>
              </h3>

              {/* Vowels cards inside the lesson */}
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

              {/* Additional Text / Explanations based on the 4 textbook pages */}
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
                    <div className="pt-2 text-center animate-fade-in">
                      <p className={`text-xs font-black ${quizCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {quizCorrect ? "🎉 চমৎকার! তোমার উত্তর সঠিক হয়েছে!" : "❌ ইস্! ভুল হয়েছে বন্ধু। পরেরবার চেষ্টা করো!"}
                      </p>
                      <button
                        onClick={nextQuizQuestion}
                        className="mt-3 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-black transition-all shadow-md active:scale-95 inline-flex items-center gap-1"
                      >
                        <span>পরবর্তী প্রশ্ন</span>
                        <ChevronRight className="w-3.5 h-3.5" />
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
                
                {/* Reference Letter Dashed Guidelines SVG Layer */}
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

    </div>
  );
}


