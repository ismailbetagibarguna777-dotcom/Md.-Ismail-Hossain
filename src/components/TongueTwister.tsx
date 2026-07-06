import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './Icon';

interface TongueTwisterProps {
  speak: (text: string) => void;
}

interface Twister {
  id: number;
  text: string;
}

interface TwisterLevel {
  level: number;
  title: string;
  bnTitle: string;
  difficulty: 'খুব সহজ' | 'সহজ' | 'মাঝারি' | 'কঠিন' | 'খুব কঠিন';
  color: string;
  textColor: string;
  bgGrad: string;
  icon: string;
  twisters: Twister[];
}

const TONGUE_TWISTERS: TwisterLevel[] = [
  {
    level: 1,
    title: "Level 1: Very Easy",
    bnTitle: "স্তর–১ : খুব সহজ",
    difficulty: "খুব সহজ",
    color: "from-emerald-500 to-green-600",
    textColor: "text-emerald-400",
    bgGrad: "from-emerald-950/40 via-slate-900/90 to-slate-950",
    icon: "🟢",
    twisters: [
      { id: 1, text: "পাখি পাকা পেঁপে খায়।" },
      { id: 2, text: "কাঁচা গাব, পাকা গাব।" },
      { id: 3, text: "লাল রিল, নীল রিল।" },
      { id: 4, text: "পুটি মাছে কুটি কাঁটা।" },
      { id: 5, text: "বাঘে বক বকে, বকে বাঘ বকে।" },
      { id: 6, text: "কাক কালো, কোকিল কালো।" },
      { id: 7, text: "জলে জলে জল্লাদ ঘোরে।" },
      { id: 8, text: "চাচা ছ্যাঁচা বেড়া চাঁচে।" },
      { id: 9, text: "শেয়াল শেয়াল শেয়াল, এক্কেবারে দেয়াল।" },
      { id: 10, text: "টাটকা তেলে তাজা তরকারি।" },
      { id: 11, text: "গরু ঘাস খায়।" },
      { id: 12, text: "খোকা খই খায়।" },
      { id: 13, text: "খুকি ক্ষীর খায়।" },
      { id: 14, text: "টুনটুনি টুকটুক করে।" },
      { id: 15, text: "বাবু বেল বাজায়।" },
      { id: 16, text: "বুলবুলি বকুলবনে বসে।" },
      { id: 17, text: "দাদু দই দিয়ে ডাল খেল।" },
      { id: 18, text: "মামা মোম মুছল।" },
      { id: 19, text: "পিঁপড়ে পাতা পেল।" },
      { id: 20, text: "গুবরে পোকা গুনগুন করে।" }
    ]
  },
  {
    level: 2,
    title: "Level 2: Easy",
    bnTitle: "স্তর–২ : সহজ",
    difficulty: "সহজ",
    color: "from-cyan-500 to-blue-600",
    textColor: "text-cyan-400",
    bgGrad: "from-cyan-950/40 via-slate-900/90 to-slate-950",
    icon: "🔵",
    twisters: [
      { id: 21, text: "বড়ো বনের বড়ো বানর বড়ো গাছ ভাঙে।" },
      { id: 22, text: "শশী শশার শাঁস শুঁকে।" },
      { id: 23, text: "সাত সাপ সাত সিঁড়ি সরে।" },
      { id: 24, text: "সাত শালিক শিস দেয়।" },
      { id: 25, text: "ঝড়ে ঝরা ঝাউ ঝমঝম ঝরে।" },
      { id: 26, text: "ঝিনুক ঝোপে ঝুলে।" },
      { id: 27, text: "খোকা খড় কেটে খড়ের গাদা করল।" },
      { id: 28, text: "গগনে গাঙচিল ঘোরে।" },
      { id: 29, text: "দুধ দিয়ে দই বানায়।" },
      { id: 30, text: "ফটিক ফটাফট ফিতা কাটে।" },
      { id: 31, text: "ভোলা ভাবল ভেবে ভেবে।" },
      { id: 32, text: "রাজার রাজ্যে রাজা রাজত্ব করে।" },
      { id: 33, text: "নীল নৌকায় নয়জন নাবিক।" },
      { id: 34, text: "কুমির কুমড়ো কুটল।" },
      { id: 35, text: "খরগোশ খুশি হয়ে খড় খেল।" },
      { id: 36, text: "কাক কা কা করে।" },
      { id: 37, text: "বক বক করে বক।" },
      { id: 38, text: "পেঁচা পেঁপে পছন্দ করে।" },
      { id: 39, text: "চড়ুই চঞ্চল চঞ্চু চালায়।" },
      { id: 40, text: "মাছ মিষ্টি মশলা মাখে।" }
    ]
  },
  {
    level: 3,
    title: "Level 3: Medium",
    bnTitle: "স্তর–৩ : মাঝারি",
    difficulty: "মাঝারি",
    color: "from-amber-500 to-orange-600",
    textColor: "text-amber-400",
    bgGrad: "from-amber-950/40 via-slate-900/90 to-slate-950",
    icon: "🟡",
    twisters: [
      { id: 41, text: "ছয় ছাতা ছিঁড়ে ছয়জন ছাতা সেলাই করল।" },
      { id: 42, text: "তপ্ত তাওয়ায় তিলতেলের তেল টগবগ করে।" },
      { id: 43, text: "ত্রিশটি তিতির তৃষ্ণায় তটস্থ।" },
      { id: 44, text: "ধনঞ্জয় ধনুক ধরে ধনীদের ধমক দিল।" },
      { id: 45, text: "ব্রজের ব্রাহ্মণ ব্রোঞ্জের ব্রেসলেট ব্রাশ করল।" },
      { id: 46, text: "ক্ষুদ্র ক্ষেতে ক্ষুদে কৃষক কাজ করে।" },
      { id: 47, text: "ক্লান্ত ক্লার্ক ক্লিপ ক্লিপ করল।" },
      { id: 48, text: "ট্রেনের ট্র্যাকে ট্রলি চলে।" },
      { id: 49, text: "প্রভাতে প্রভা প্রার্থনা পড়ে।" },
      { id: 50, text: "গ্রন্থাগারের গ্রন্থ গুছিয়ে গ্রন্থাগারিক রাখলেন।" },
      { id: 51, text: "রবি রঙিন রুমালে রসগোল্লা রাখল।" },
      { id: 52, text: "বাবুল বাঁশ বেয়ে বাড়ি গেল।" },
      { id: 53, text: "টিয়া টক তেঁতুল তুলে।" },
      { id: 54, text: "নন্দন নদীর নীল নৌকা নাড়ল।" },
      { id: 55, text: "সুধা সুতো সেলাই করে।" },
      { id: 56, text: "মিঠু মিষ্টি মুখে মুড়ি মাখে।" },
      { id: 57, text: "ঝুমা ঝুড়িতে ঝিঙে জমায়।" },
      { id: 58, text: "কণা কলসি কাঁখে করে।" },
      { id: 59, text: "ফুল ফোটে ফাগুনে।" },
      { id: 60, text: "বৃষ্টি ভেজা বাঁশবনে বাতাস বয়।" }
    ]
  },
  {
    level: 4,
    title: "Level 4: Hard",
    bnTitle: "স্তর–৪ : কঠিন",
    difficulty: "কঠিন",
    color: "from-pink-500 to-rose-600",
    textColor: "text-pink-400",
    bgGrad: "from-rose-950/40 via-slate-900/90 to-slate-950",
    icon: "🟠",
    twisters: [
      { id: 61, text: "শ্রাবণের শ্রাবণধারায় শ্রোতা শ্রবণ করল।" },
      { id: 62, text: "স্বর্ণস্বপ্ন স্বভাবে স্বতন্ত্র।" },
      { id: 63, text: "দৃঢ় দৃষ্টিতে দৃশ্য দেখা দরকার।" },
      { id: 64, text: "প্রজ্ঞাবান প্রভাষক প্রাঞ্জল প্রবন্ধ পড়লেন।" },
      { id: 65, text: "ক্ষণে ক্ষণে ক্ষুধার্ত ক্ষুদে ক্ষেতে যায়।" },
      { id: 66, text: "তৃষ্ণার্ত তিতির তেঁতুলতলায় দাঁড়ায়।" },
      { id: 67, text: "ব্রতচারী ব্রাহ্মণ ব্রত পালন করেন।" },
      { id: 68, text: "গ্রামগঞ্জের গৃহস্থ গম গুছিয়ে রাখে।" },
      { id: 69, text: "চঞ্চল চড়ুই চঞ্চু চালিয়ে চাল কুড়ায়।" },
      { id: 70, text: "শীতের সকালে শিশিরভেজা শিউলি ঝরে।" },
      { id: 71, text: "পঞ্চ পণ্ডিত পঞ্চম পুঁথি পড়লেন।" },
      { id: 72, text: "সুশীল সুদর্শন সুন্দর স্বরে সুর তোলে।" },
      { id: 73, text: "নীল নদীর নৌকা নোঙর নাড়ল।" },
      { id: 74, text: "ঝকঝকে ঝর্ণার জল ঝিলমিল করে।" },
      { id: 75, text: "ফড়িং ফড়ফড়িয়ে ফুলে বসল।" },
      { id: 76, text: "ভোরবেলায় ভোলা ভিজে ভাত খেল।" },
      { id: 77, text: "গঙ্গার ঘাটে ঘুঘু ঘোরে।" },
      { id: 78, text: "কিশোর কাককে কলা খাওয়ায়।" },
      { id: 79, text: "ময়না মিষ্টি মুখে মুগ্ধ গান গায়।" },
      { id: 80, text: "টগরতলায় টগবগে টগর ফুটেছে।" }
    ]
  },
  {
    level: 5,
    title: "Level 5: Very Hard",
    bnTitle: "স্তর–৫ : খুব কঠিন",
    difficulty: "খুব কঠিন",
    color: "from-purple-500 to-fuchsia-600",
    textColor: "text-fuchsia-400",
    bgGrad: "from-fuchsia-950/40 via-slate-900/90 to-slate-950",
    icon: "🔴",
    twisters: [
      { id: 81, text: "রক্তাক্ত রক্তকরবীর রক্তরঙা রূপ।" },
      { id: 82, text: "ক্ষিপ্র ক্ষত্রিয় ক্ষুরধার ক্ষেপণাস্ত্র ক্ষেপণ করল।" },
      { id: 83, text: "ত্রয়োদশ ত্রাণকর্তা ত্রিভুজ ত্রস্ত করল।" },
      { id: 84, text: "শ্রেষ্ঠ শিক্ষক শ্রেণিশিক্ষার্থীদের শ্রদ্ধা শেখান।" },
      { id: 85, text: "স্ফটিক স্বচ্ছ স্বপ্ন স্বর্ণসম।" },
      { id: 86, text: "ব্রহ্মপুত্রের ব্রহ্মচারী ব্রহ্মজ্ঞান বললেন।" },
      { id: 87, text: "দৃষ্টান্ত দিয়ে দৃঢ় দৃষ্টিভঙ্গি তৈরি হয়।" },
      { id: 88, text: "গ্রন্থপ্রেমী গ্রন্থসংগ্রাহক গ্রন্থাগারে গেলেন।" },
      { id: 89, text: "ক্লিষ্ট ক্লান্ত ক্লাবকর্মী ক্লাস শেষ করল।" },
      { id: 90, text: "ট্রাফিক ট্রলির ট্র্যাক ট্রেন থামাল।" },
      { id: 91, text: "স্থির স্থপতি স্থাপত্য স্থাপন করেন।" },
      { id: 92, text: "স্মৃতিসৌধ স্মরণে স্মৃতি সংরক্ষণ করে।" },
      { id: 93, text: "স্নিগ্ধ স্নানে স্নেহভরা সকাল।" },
      { id: 94, text: "স্পষ্ট স্পন্দনে স্পৃহা সৃষ্টি হয়।" },
      { id: 95, text: "স্কন্ধে স্কুলব্যাগ স্কাউট স্কাউটিং শেখে।" },
      { id: 96, text: "স্টেশনের স্টলে স্টিলের স্ট্যান্ড রাখা।" },
      { id: 97, text: "প্রজ্ঞাপূর্ণ প্রবন্ধ প্রাঞ্জলভাবে প্রকাশ পেল।" },
      { id: 98, text: "ক্ষুদ্র ক্ষুদ্র ক্ষণে ক্ষণে ক্ষয় হয়।" },
      { id: 99, text: "শ্রুতিমধুর শ্রুতি শ্রোতাদের শ্রদ্ধা জাগায়।" },
      { id: 100, text: "ত্রিশটি তৃষ্ণার্ত তিতির তেঁতুলতলায় তপ্ত তাওয়ায় তিলতেলের তেল টগবগ করতে করতে তৃষ্ণায় তটস্থ হয়ে তেঁতুল তুলতে তৎপর হলো।" }
    ]
  }
];

export const TongueTwister: React.FC<TongueTwisterProps> = ({ speak }) => {
  const [selectedLevelIdx, setSelectedLevelIdx] = useState<number>(0);
  const [activeTwisterId, setActiveTwisterId] = useState<number | null>(null);
  const [speakSpeed, setSpeakSpeed] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Track mini-game speed accomplishments (how many times they successfully read fast)
  const [practiceStatus, setPracticeStatus] = useState<Record<number, [boolean, boolean, boolean]>>({});
  
  // Audio recorder mimic state
  const [recordingId, setRecordingId] = useState<number | null>(null);
  const [recordTimer, setRecordTimer] = useState<number>(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);

  const level = TONGUE_TWISTERS[selectedLevelIdx];

  const handleLevelChange = (idx: number) => {
    setSelectedLevelIdx(idx);
    speak(`${TONGUE_TWISTERS[idx].bnTitle}`);
  };

  const handleSpeak = (id: number, text: string) => {
    setActiveTwisterId(id);
    speak(text);
    // Visual feedback timer
    setTimeout(() => {
      setActiveTwisterId(null);
    }, 3000);
  };

  const togglePracticeStep = (twisterId: number, stepIdx: 0 | 1 | 2) => {
    const current = practiceStatus[twisterId] || [false, false, false];
    const updated = [...current] as [boolean, boolean, boolean];
    updated[stepIdx] = !updated[stepIdx];
    
    setPracticeStatus({
      ...practiceStatus,
      [twisterId]: updated
    });

    if (updated[stepIdx]) {
      if (stepIdx === 0) {
        speak("চমৎকার! ১ম বার সফল!");
      } else if (stepIdx === 1) {
        speak("খুব ভালো! ২য় বার সফল!");
      } else if (stepIdx === 2) {
        speak("অসাধারণ! ৩য় বার দ্রুততম সময়ে সফল! তুমি বিজয়ী!");
      }
    }
  };

  const startMimicRecord = (id: number, text: string) => {
    if (recordingId === id) {
      // Stop recording
      if (recordingInterval) clearInterval(recordingInterval);
      setRecordingInterval(null);
      setRecordingId(null);
      setRecordTimer(0);
      speak("দারুণ হয়েছে! তোমার উচ্চারণ একদম নির্ভুল হয়েছে!");
    } else {
      // Stop any other active recording
      if (recordingInterval) clearInterval(recordingInterval);
      
      speak("শুরু করো! জোরে জোরে বলো!");
      setRecordingId(id);
      setRecordTimer(0);
      const interval = setInterval(() => {
        setRecordTimer(prev => prev + 1);
      }, 1000);
      setRecordingInterval(interval);
    }
  };

  // Convert English digit to Bengali Digit
  const toBengaliNumber = (num: number | string): string => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/[0-9]/g, (w) => bnDigits[parseInt(w)]);
  };

  const filteredTwisters = level.twisters.filter(t => 
    t.text.includes(searchQuery) || toBengaliNumber(t.id).includes(searchQuery) || t.id.toString().includes(searchQuery)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-2 text-left">
      {/* Dynamic Intro Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 rounded-3xl bg-slate-900/60 border border-slate-700/50 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-8xl">
          🗣️
        </div>
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 flex items-center gap-2.5 mb-2">
            <span>👅</span>
            <span>টাং টুইস্টার (জিহ্ব মোচড় খেলা)</span>
          </h2>
          <p className="text-[#8b949e] text-xs sm:text-sm leading-relaxed max-w-3xl">
            শতভাগ উচ্চারণ জড়তা দূর করতে এবং গড়গড় করে নির্ভুল বাংলা পড়তে ১০০টি মজার টাং টুইস্টার সহজ থেকে ধাপে ধাপে কঠিন ক্রমানুসারে সাজানো হয়েছে। প্রতিটি টুইস্টার ৩ বার দ্রুত উচ্চারণ করার চ্যালেঞ্জ নাও এবং উচ্চারণ সুন্দর করো!
          </p>
        </div>

        {/* Informational Guidelines / Educational Box */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-2xl bg-slate-950/40 border border-emerald-500/20 flex items-start gap-2.5">
            <span className="text-base sm:text-lg">📢</span>
            <div>
              <h4 className="text-xs font-bold text-emerald-400">শুনুন ও বুঝুন</h4>
              <p className="text-[10px] sm:text-xs text-slate-300">প্রথমে স্পিকার বাটনে ক্লিক করে সঠিক উচ্চারণটি ভালো করে শুনে নাও।</p>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/40 border border-indigo-500/20 flex items-start gap-2.5">
            <span className="text-base sm:text-lg">⏱️</span>
            <div>
              <h4 className="text-xs font-bold text-indigo-400">গতি বৃদ্ধি চ্যালেঞ্জ</h4>
              <p className="text-[10px] sm:text-xs text-slate-300">ধীরে শুরু করে ৩ বার খুব দ্রুত বলার চেষ্টা করো। চেকবক্সে টিক দাও!</p>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/40 border border-fuchsia-500/20 flex items-start gap-2.5">
            <span className="text-base sm:text-lg">🎯</span>
            <div>
              <h4 className="text-xs font-bold text-fuchsia-400">স্পর্শকাতর বর্ণ শিক্ষা</h4>
              <p className="text-[10px] sm:text-xs text-slate-300">শ, ষ, স এবং র, ড়, ঢ় উচ্চারণের পার্থক্যগুলো সাবলীল করো।</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Level Selection Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-6 justify-center">
        {TONGUE_TWISTERS.map((lvl, idx) => {
          const isActive = selectedLevelIdx === idx;
          return (
            <motion.button
              key={lvl.level}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLevelChange(idx)}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all border shadow-md cursor-pointer ${
                isActive 
                  ? `bg-gradient-to-r ${lvl.color} text-white border-transparent scale-105 shadow-xl` 
                  : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d] hover:border-indigo-500/40'
              }`}
            >
              <span>{lvl.icon}</span>
              <span className="hidden sm:inline">{lvl.bnTitle}</span>
              <span className="sm:hidden">{lvl.difficulty}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="mb-6 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="নম্বর বা শব্দ লিখে টাং টুইস্টার খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161b22] border border-[#30363d] focus:border-indigo-500 rounded-2xl px-4 py-3 pl-10 text-white text-xs sm:text-sm outline-none transition-all placeholder:text-gray-500 font-bold"
          />
          <div className="absolute left-3.5 top-3.5 text-gray-500">
            <Icon name="Search" className="w-4 h-4" />
          </div>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white"
            >
              <Icon name="X" className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTwisters.map((twister, i) => {
            const isPlaying = activeTwisterId === twister.id;
            const isRecording = recordingId === twister.id;
            const [step1, step2, step3] = practiceStatus[twister.id] || [false, false, false];
            const isDoneAll = step1 && step2 && step3;

            return (
              <motion.div
                key={twister.id}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.3) }}
                className={`p-5 rounded-3xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                  isDoneAll 
                    ? 'bg-slate-900/80 border-amber-500/40 shadow-amber-950/20 shadow-lg' 
                    : isPlaying
                    ? 'bg-indigo-950/30 border-indigo-500/80 shadow-indigo-950/40 shadow-lg'
                    : isRecording
                    ? 'bg-rose-950/30 border-rose-500/80 shadow-rose-950/40 shadow-lg animate-pulse'
                    : 'bg-[#161b22]/95 border-[#30363d] hover:border-indigo-500/30'
                }`}
              >
                {/* Level badge inside card */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl pointer-events-none" />

                {/* Card Header Info */}
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    isDoneAll 
                      ? 'bg-amber-400/10 text-amber-300 border border-amber-500/20' 
                      : level.difficulty === 'খুব সহজ' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        level.difficulty === 'সহজ' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                        level.difficulty === 'মাঝারি' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        level.difficulty === 'কঠিন' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20'
                  }`}>
                    টুইস্টার #{toBengaliNumber(twister.id)}
                  </span>

                  {isDoneAll && (
                    <span className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                      <span>🏆 সেরা পাঠক!</span>
                    </span>
                  )}
                </div>

                {/* Tongue Twister Text display */}
                <div className="my-3">
                  <p className={`text-lg sm:text-xl font-bold leading-relaxed text-[#f0f6fc] tracking-wide select-all ${
                    isPlaying ? 'scale-101 text-indigo-300 transition-all' : ''
                  }`}>
                    {twister.text}
                  </p>
                </div>

                {/* Soundwave simulation when playing or recording */}
                <AnimatePresence>
                  {(isPlaying || isRecording) && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 16 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-1 my-2 justify-center"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bar) => (
                        <motion.div
                          key={bar}
                          animate={{ 
                            height: isPlaying ? [4, 16, 4] : [4, 24, 4]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 0.4 + (bar % 3) * 0.15,
                            ease: "easeInOut"
                          }}
                          className={`w-1 rounded-full ${isRecording ? 'bg-rose-500' : 'bg-indigo-400'}`}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Speed training mini-game (৩ বার বলো!) */}
                <div className="mt-4 p-3 bg-slate-950/40 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                      <span>⚡</span> ৩ বার দ্রুততম সময়ে বলো:
                    </span>
                    <span className="text-[10px] text-indigo-400 font-bold">উচ্চারণ স্পষ্ট করো</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { idx: 0, label: "১ম বার" },
                      { idx: 1, label: "২য় বার" },
                      { idx: 2, label: "৩য় বার 🚀" }
                    ].map((step) => {
                      const activeStep = step.idx === 0 ? step1 : step.idx === 1 ? step2 : step3;
                      return (
                        <button
                          key={step.idx}
                          onClick={() => togglePracticeStep(twister.id, step.idx as 0 | 1 | 2)}
                          className={`py-1.5 px-2 rounded-xl text-[10px] font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                            activeStep 
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/40 font-black' 
                              : 'bg-[#21262d]/60 text-gray-400 border border-slate-800 hover:bg-[#30363d]/60 hover:text-[#f0f6fc]'
                          }`}
                        >
                          <span>{activeStep ? "⭐" : "⚪"}</span>
                          <span>{step.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Action Button Bar */}
                <div className="flex items-center gap-2.5 mt-4 pt-1 border-t border-slate-800/60">
                  {/* Speak button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSpeak(twister.id, twister.text)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isPlaying 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d]'
                    }`}
                  >
                    <Icon name={isPlaying ? "Square" : "Volume2"} className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                    <span>{isPlaying ? "শুনছি..." : "শুনুন"}</span>
                  </motion.button>

                  {/* Speech input test mimicking microphone */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startMimicRecord(twister.id, twister.text)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isRecording 
                        ? 'bg-rose-600 text-white shadow-lg' 
                        : 'bg-emerald-950/20 text-emerald-400 hover:bg-emerald-900/20 border border-emerald-500/20'
                    }`}
                  >
                    <Icon name={isRecording ? "Square" : "Mic"} className={`w-4 h-4 ${isRecording ? 'animate-bounce' : ''}`} />
                    <span>{isRecording ? `বলছি (${toBengaliNumber(recordTimer)} সেঃ)` : "আমি বলব"}</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredTwisters.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400 font-bold bg-[#161b22] border border-[#30363d] rounded-3xl">
            <p className="text-lg">❌ কোনো টাং টুইস্টার পাওয়া যায়নি!</p>
            <p className="text-xs text-gray-500 mt-1">অন্য কোনো নম্বর বা বানান দিয়ে খুঁজুন।</p>
          </div>
        )}
      </div>

      {/* Level stats and completion rewards bottom segment */}
      <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-fuchsia-950/40 border-2 border-indigo-500/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full flex items-center justify-center text-2xl shadow-inner">
            🏆
          </div>
          <div>
            <h4 className="text-sm font-black text-white">উচ্চারণ চ্যাম্পিয়নশিপ পদক!</h4>
            <p className="text-[11px] text-slate-300">যেকোনো ৫টি টাং টুইস্টারে ৩ বার দ্রুত বলার চ্যালেঞ্জ সম্পন্ন করে উচ্চারণ বিজয়ী পদক অর্জন করো।</p>
          </div>
        </div>
        <div className="bg-[#161b22]/90 border border-slate-700/60 px-5 py-2.5 rounded-2xl flex items-center gap-4">
          <div className="text-center">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">অর্জিত পয়েন্ট</span>
            <span className="text-xl font-black text-amber-300">৫০০ ★</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">মোট সম্পন্ন</span>
            <span className="text-xl font-black text-indigo-300">
              {toBengaliNumber(Object.values(practiceStatus).filter(s => s[0] && s[1] && s[2]).length)} / {toBengaliNumber(20)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
