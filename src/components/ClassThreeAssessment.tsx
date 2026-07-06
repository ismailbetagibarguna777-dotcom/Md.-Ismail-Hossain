import React, { useState, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Printer, BookOpen, User, Calendar, Award, CheckCircle2, 
  XCircle, AlertCircle, HelpCircle, ChevronRight, ChevronLeft, 
  Volume2, Eye, EyeOff, RotateCcw, Sparkles, Check, X, FileText,
  Download, FileDown
} from 'lucide-react';
import { getApiUrl } from '../lib/api';

interface AssessmentTool {
  id: number;
  title: string;
  letters: string[];
  words: string[];
  sentences: string[];
  passage: string;
  questions: {
    q: string;
    ans: string;
  }[];
}

const ASSESSMENT_TOOLS_DATA: AssessmentTool[] = [
  {
    id: 1,
    title: "মূল্যায়ন টুলস ১",
    letters: [
      'ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'জ', 'ঞ', 'ট', 'ঠ', 'ড', 'ঢ',
      'ণ', 'ত', 'থ', 'ফ', 'ব', 'ভ', 'ম', 'র', 'ল', 'শ', 'ষ', 'স'
    ],
    words: ['বই', 'পাখি', 'অন্যান্য', 'কলম', 'ফুল', 'স্কুল', 'আকাশ', 'গাছ', 'হাত', 'आनন্দ'],
    sentences: [
      "আমার নাম রহিম। আমি স্কুলে যাই।",
      "গাছে অনেক পাখি বসে আছে।",
      "মা বাজার থেকে ফল কিনে আনলেন।"
    ],
    passage: "রহিমের একটি ছোট বাগান আছে। বাগানে সে গোলাপ, জবা ও গাঁদা ফুলের গাছ লাগিয়েছে। প্রতিদিন সকালে সে গাছে পানি দেয়। ফুল ফুটলে সে খুব খুশি হয়। একদিন তার বাগানে একটি সুন্দর প্রজাপতি এসে বসল। রহিম প্রজাপতির ছবি তুলল।",
    questions: [
      { q: "রহিমের বাগানে কী কী ফুলের গাছ আছে?", ans: "গোলাপ, জবা ও গাঁদা ফুল।" },
      { q: "বাগানে কী এসে বসেছিল?", ans: "একটি সুন্দর প্রজাপতি।" }
    ]
  },
  {
    id: 2,
    title: "মূল্যায়ন টুলস ২",
    letters: [
      'অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ', 'ক',
      'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড'
    ],
    words: ['নদী', 'মেঘ', 'সূর্য', 'বাতাস', 'খেলা', 'সকাল', 'সবুজ', 'পাহাড়', 'স্বপ্ন', 'সুন্দর'],
    sentences: [
      "নদী বয়ে চলেছে সাগরের দিকে।",
      "আমরা প্রতিদিন সকালে একসাথে খেলি।",
      "আকাশে মেঘ ডাকলে বৃষ্টি নামে।"
    ],
    passage: "আমাদের দেশে ছয়টি ঋতু আছে। প্রতিটি ঋতুতে প্রকৃতির রূপ বদলে যায়। বর্ষাকালে আকাশে কালো মেঘের ঘনঘটা দেখা দেয়। ঝমঝম করে বৃষ্টি পড়ে। মাঠ-ঘাট পানিতে থৈ থৈ করে। ব্যাঙেরা মনের সুখে ডাকে। কদম ফুল ফুটে চারদিক সুবাসিত করে।",
    questions: [
      { q: "আমাদের দেশে কয়টি ঋতু আছে?", ans: "ছয়টি ঋতু।" },
      { q: "বর্ষাকালে কোন ফুল ফুটে সুবাস ছড়ায়?", ans: "কদম ফুল।" }
    ]
  },
  {
    id: 3,
    title: "মূল্যায়ন টুলস ৩",
    letters: [
      'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র',
      'ল', 'শ', 'ষ', 'স', 'হ', 'ড়', 'ঢ়', 'য়', 'ৎ', 'ং', 'ঃ', 'ঁ'
    ],
    words: ['দেশ', 'লাল', 'নীল', 'মাছ', 'বাগান', 'প্রজাপতি', 'গোলাপ', 'পানি', 'ছবি', 'খুশি'],
    sentences: [
      "আমাদের দেশ সবুজে ঘেরা সুন্দর একটি দেশ।",
      "বাগানে নানা রকমের রঙিন ফুল ফুটেছে।",
      "বাবা বাজার থেকে মিষ্টি নিয়ে এসেছেন।"
    ],
    passage: "রনি ও তুলি দুই ভাইবোন। তারা প্রতিদিন বিকেলে মাঠের এক কোণে ফুলের চারা লাগায়। চারাগুলোতে নিয়ম করে সকালে ও বিকেলে পানি দেয়। আজ রনি দেখল কচি ডগায় লাল গোলাপ কুঁড়ি এসেছে। সে আনন্দে লাফিয়ে উঠল আর তুলিকে ডেকে দেখাল।",
    questions: [
      { q: "রনি ও তুলি কখন ফুলের চারা লাগায়?", ans: "প্রতিদিন বিকেলে।" },
      { q: "কচি ডগায় কোন ফুলের কুঁড়ি এসেছে?", ans: "লাল গোলাপ ফুলের কুঁড়ি।" }
    ]
  },
  {
    id: 4,
    title: "মূল্যায়ন টুলস ৪",
    letters: [
      'ক', 'গ', 'চ', 'জ', 'ট', 'ড', 'ত', 'দ', 'ন', 'প', 'ব', 'ম',
      'য', 'র', 'ল', 'শ', 'স', 'হ', 'ড়', 'য়', 'ক্ত', 'গ্গ', 'ঙ্ক', 'ঙ্গ'
    ],
    words: ['বর্ষা', 'ইলিশ', 'নদী', 'নৌকা', 'মাঝি', 'ঢেউ', 'জাল', 'উজান', 'মাছ', 'জীবন'],
    sentences: [
      "ইলিশ আমাদের জাতীয় মাছ।",
      "জেলেরা নদীতে জাল দিয়ে মাছ ধরে।",
      "বর্ষাকালে নদী পানিতে ভরে যায়।"
    ],
    passage: "গ্রামের পাশে ছোট্ট একটি পাহাড় আছে। পাহাড়ের বুক চিরে একটি ঝরনা বয়ে চলেছে। ঝরনার পানি কাচের মতো পরিষ্কার। পাহাড়ের গায়ে সবুজ চাদরের মতো ঘন বন। বনে নানা রকমের পাখি ডাকে। হরিণগুলো ঝরনার ঠাণ্ডা পানি খেতে আসে।",
    questions: [
      { q: "ঝরনাটি কোথা থেকে বয়ে চলেছে?", ans: "পাহাড়ের বুক চিরে।" },
      { q: "ঝরনার পানি খেতে কারা আসে?", ans: "হরিণগুলো।" }
    ]
  },
  {
    id: 5,
    title: "মূল্যায়ন টুলস ৫",
    letters: [
      'খ', 'ঘ', 'ছ', 'ঝ', 'ঠ', 'ঢ', 'থ', 'ধ', 'ফ', 'ভ', 'ষ', 'ক্ষ',
      'জ্ঞ', 'ত্ন', 'ন্দ', 'ষ্ট', 'চ্ছ', 'ল্প', 'ষ্ঠ', 'প্ত', 'দ্ধ', 'ন্স', 'ম্প', 'ম্ভ'
    ],
    words: ['বীর', 'যুদ্ধ', 'দেশ', 'স্বাধীন', 'পতাকা', 'লাল', 'সবুজ', 'শহীদ', 'ভাষা', 'চেতনা'],
    sentences: [
      "আমরা আমাদের স্বাধীন দেশকে খুব ভালোবাসি।",
      "লাল-সবুজ পতাকা আমাদের বড় অহংকার।",
      "ভাষার জন্য যারা জীবন দিয়েছেন তারা অমর।"
    ],
    passage: "বাঙালিরা যুদ্ধ করে বীরের মতো এদেশ স্বাধীন করেছে। একাত্তর সালে লাখো মানুষের আত্মত্যাগে জন্ম হয়েছে বাংলাদেশের। আমাদের জাতীয় পতাকার রঙ লাল ও সবুজ। সবুজ জমিনে লাল বৃত্তটি শহীদদের রক্তের স্মারক। আমরা আমাদের পতাকাকে সম্মান করি।",
    questions: [
      { q: "কত সালে লাখো মানুষের ত্যাগে বাংলাদেশ স্বাধীন হয়েছে?", ans: "একাত্তর সালে (১৯৭১ সালে)।" },
      { q: "জাতীয় পতাকার লাল বৃত্তটি কিসের স্মারক?", ans: "শহীদদের রক্তের স্মারক।" }
    ]
  },
  {
    id: 6,
    title: "মূল্যায়ন টুলস ৬",
    letters: [
      'ক', 'খ', 'গ', 'ঘ', 'চ', 'ছ', 'জ', 'ঝ', 'ট', 'ঠ', 'ড', 'ঢ',
      'ত', 'থ', 'দ', 'ধ', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল'
    ],
    words: ['জঙ্গল', 'বাঘ', 'হরিণ', 'বানর', 'সিংহ', 'পাখি', 'শেয়াল', 'বন', 'ভালুক', 'ময়ূর'],
    sentences: [
      "সুন্দরবনে অনেক রয়েল বেঙ্গল টাইগার থাকে।",
      "বনের হরিণগুলো ঘাস খাচ্ছে আর খেলছে।",
      "ডালে বসে কোকিল মিষ্টি সুরে গান গায়।"
    ],
    passage: "সুন্দরবনে নানা রঙের বৈচিত্র্যময় পাখি দেখা যায়। এদের মধ্যে দোয়েল আমাদের জাতীয় পাখি। বনের এক পাশে বানরেরা গাছের ডালে ঝুলছে। বাঘের গর্জন শুনলে হরিণগুলো সতর্ক হয়ে ছুটে পালায়। কাঠবিড়ালি চটপটে পায়ে আম গাছের ডালে উঠছে আর ফল খাচ্ছে।",
    questions: [
      { q: "আমাদের জাতীয় পাখির নাম কী?", ans: "দোয়েল।" },
      { q: "বাঘের গর্জন শুনলে কারা সতর্ক হয়ে পালায়?", ans: "হরিণগুলো।" }
    ]
  },
  {
    id: 7,
    title: "মূল্যায়ন টুলস ৭",
    letters: [
      'শ', 'ষ', 'স', 'হ', 'ড়', 'ঢ়', 'য়', 'ৎ', 'ং', 'ঃ', 'ঁ', 'ক',
      'ত', 'ম', 'ন', 'প', 'ল', 'র', 'ব', 'স', 'ক', 'চ', 'জ', 'দ'
    ],
    words: ['চাষী', 'ধান', 'সোনালী', 'ফসল', 'মাঠ', 'রোদ', 'বৃষ্টি', 'কৃষক', 'সোনার', 'বাংলা'],
    sentences: [
      "সোনার ফসল যখন মাঠে দোলে তখন কৃষক হাসে।",
      "আমাদের গ্রামে একটি নদী আঁকাবাঁকা হয়ে বয়ে গেছে।",
      "বৃষ্টি হলে মাটির মিষ্টি গন্ধ চারদিকে ছড়ায়।"
    ],
    passage: "শরতের নীল আকাশে সাদা মেঘের ভেলা ভেসে বেড়ায়। বিলের জলে সাদা ও লাল শাপলা ফুল ফোটে। এই ফুল দেখতে দারুণ চমৎকার লাগে। শাপলা আমাদের জাতীয় ফুল। সকালের রোদে শাপলা ফুলের ওপর শিশিরবিন্দু মুক্তোর মতো চকচক করে।",
    questions: [
      { q: "শরতের আকাশে কোন মেঘের ভেলা ভেসে বেড়ায়?", ans: "সাদা মেঘের ভেলা।" },
      { q: "আমাদের জাতীয় ফুলের নাম কী?", ans: "শাপলা ফুল।" }
    ]
  },
  {
    id: 8,
    title: "মূল্যায়ন টুলস ৮",
    letters: [
      'অ', 'আ', 'ই', 'উ', 'এ', 'ও', 'ক', 'গ', 'চ', 'জ', 'ত', 'দ',
      'ন', 'প', 'ব', 'ম', 'র', 'ল', 'স', 'হ', 'ড়', 'ক্ষ', 'জ্ঞ', 'ন্দ'
    ],
    words: ['স্বাস্থ্য', 'ব্যায়াম', 'পানি', 'সাবান', 'হাত', 'পরিষ্কার', 'খাবার', 'ঘুম', 'শরীর', 'নিয়ম'],
    sentences: [
      "সুস্থ থাকতে হলে নিয়মিত পরিষ্কার পরিচ্ছন্ন থাকা জরুরি।",
      "খাওয়ার আগে ভালো করে হাত ধোয়া উচিত।",
      "প্রতিদিন রাতে তাড়াতাড়ি ঘুমানো স্বাস্থ্যের জন্য ভালো।"
    ],
    passage: "নিয়মিত হাত পরিষ্কার রাখা স্বাস্থ্যের জন্য খুব উপকারী। খাওয়ার পূর্বে ও শৌচাগার ব্যবহারের পরে সাবান দিয়ে হাত ধোয়া উচিত। অপরিষ্কার হাতে জীবাণু থাকে যা আমাদের শরীরে প্রবেশ করে রোগ সৃষ্টি করে। সুস্থ থাকতে পুষ্টিকর খাবার খেতে হবে।",
    questions: [
      { q: "খাওয়ার পূর্বে ও শৌচাগার ব্যবহারের পর কী দিয়ে হাত ধোয়া উচিত?", ans: "সাবান দিয়ে।" },
      { q: "অপরিষ্কার হাতে কী থাকে যা রোগ সৃষ্টি করে?", ans: "রোগ সৃষ্টিকারী জীবাণু।" }
    ]
  },
  {
    id: 9,
    title: "মূল্যায়ন টুলস ৯",
    letters: [
      'ক', 'খ', 'গ', 'ঘ', 'চ', 'জ', 'ট', 'ঠ', 'ত', 'দ', 'ন', 'প',
      'ব', 'ভ', 'ম', 'র', 'ল', 'শ', 'স', 'হ', 'ড়', 'য়', 'ক্ত', 'ন্দ'
    ],
    words: ['গ্রাম', 'পথ', 'ধানক্ষেত', 'বাঁশঝাড়', 'রাখাল', 'বাঁশি', 'সুর', 'আকাশ', 'মাঠ', 'মেলা'],
    sentences: [
      "রাখাল মাঠে গরু চড়ায় আর মধুর বাঁশি বাজায়।",
      "বৈঠকখানায় বসে দাদু আমাদের রূপকথার গল্প শোনান।",
      "দিঘির জলে হাঁসগুলো মনের সুখে সাঁতার কাটে।"
    ],
    passage: "দিঘির পাড়ে একটি বিশাল বটগাছ ছিল। বটগাছের ডালে ঝুলছিল একটি বাবুই পাখির বাসা। বাবুই পাখি সুন্দর করে ঘাস দিয়ে বাসা বোনে। তাই একে তাঁতি পাখিও বলা হয়। একদিন বড় ঝড় হলো, কিন্তু বাবুই পাখির বাসাটি একটুও নষ্ট হলো না।",
    questions: [
      { q: "বাবুই পাখিকে কেন তাঁতি পাখি বলা হয়?", ans: "কারণ বাবুই পাখি চমৎকার কারিগরি দক্ষতায় ঘাস দিয়ে সুন্দর বাসা বোনে।" },
      { q: "বড় ঝড়ে বাবুই পাখির বাসার কী অবস্থা হয়েছিল?", ans: "বাসাটি একটুও নষ্ট হয়নি।" }
    ]
  },
  {
    id: 10,
    title: "মূল্যায়ন টুলс ১০",
    letters: [
      'ক', 'গ', 'চ', 'জ', 'ট', 'ড', 'ত', 'দ', 'ন', 'প', 'ব', 'ম',
      'য', 'র', 'ল', 'শ', 'স', 'হ', 'ড়', 'য়', 'ক্ষ', 'জ্ঞ', 'ল্ড', 'প্ট'
    ],
    words: ['বিজ্ঞান', 'জগত', 'চন্দ্র', 'তারা', 'সূর্য', 'পৃথিবী', 'আকাশ', 'মহাকাশ', 'রকেট', 'জাদুকর'],
    sentences: [
      "বিজ্ঞান আমাদের জীবনকে অনেক সহজ করে দিয়েছে।",
      "পৃথিবী সূর্যের চারদিকে অবিরাম ঘুরে চলেছে।",
      "চাঁদ রাতের আকাশে রূপালি আলো ছড়িয়ে দেয়।"
    ],
    passage: "রবিন বড় হয়ে বিজ্ঞানী হতে চায়। সে রাতে ছাদের ওপরে শুয়ে আকাশের তারা দেখে। তার কাছে মহাকাশ এক বড় রহস্যের নাম। সে মনে করে একদিন সে রকেটে চড়ে চাঁদের দেশে যাবে। চাঁদের মাটি কেমন তা নিজ হাতে ছুঁয়ে দেখবে। সে নিয়মিত বিজ্ঞান বই পড়ে।",
    questions: [
      { q: "রবিন বড় হয়ে কী হতে চায়?", ans: "বিজ্ঞানী হতে চায়।" },
      { q: "রবিন রকেটে চড়ে কোথায় যেতে চায়?", ans: "চাঁদের দেশে যেতে চায়।" }
    ]
  }
];

interface ClassThreeAssessmentProps {
  speak: (text: string) => void;
}

export function ClassThreeAssessment({ speak }: ClassThreeAssessmentProps) {
  const [assessmentTools, setAssessmentTools] = useState<AssessmentTool[]>(ASSESSMENT_TOOLS_DATA);
  const [selectedToolIndex, setSelectedToolIndex] = useState<number>(0);
  const [showAiTutor, setShowAiTutor] = useState<boolean>(false);
  
  // AI Generator States
  const [aiTopic, setAiTopic] = useState('');
  const [aiCustomTitle, setAiCustomTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  
  // AI Chat States
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'model'; text: string }>>([
    { role: 'model', text: 'স্বাগতম! আমি আপনার স্মার্ট এআই টিউটর (Specialist)। আমি আপনাকে FLN পঠন দক্ষতা যাচাই ও শিক্ষার্থীদের রিডিং লেভেল উন্নয়নে বিভিন্ন বাস্তবসম্মত পরামর্শ দিয়ে সাহায্য করতে পারি। নিচে আপনার প্রশ্নটি লিখুন!' }
  ]);
  const [isChatting, setIsChatting] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Assessment Form Metadata
  const [schoolName, setSchoolName] = useState('তিলোকী সরকারি প্রাথমিক বিদ্যালয়');
  const [studentName, setStudentName] = useState('');
  const [studentRoll, setStudentRoll] = useState('');
  const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [evaluatorName, setEvaluatorName] = useState('');

  // Individual evaluation states for current tool
  // Letter Grid Assessment mapping (ID of letter -> true/false/neutral)
  const [letterResults, setLetterResults] = useState<Record<string, 'pass' | 'fail' | 'none'>>({});
  
  // Word Assessment mapping
  const [wordResults, setWordResults] = useState<Record<string, 'pass' | 'fail' | 'none'>>({});

  // Sentence Assessment (yes/no)
  const [sentenceResults, setSentenceResults] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false
  });

  // Questions correct mapping
  const [questionResults, setQuestionResults] = useState<Record<number, boolean>>({
    0: false,
    1: false
  });

  // Manual evaluation override
  const [manualLevel, setManualLevel] = useState<number | null>(null);

  const activeTool = assessmentTools[selectedToolIndex];

  // Helper values calculated dynamically
  const lettersPassedCount = useMemo(() => {
    return activeTool.letters.filter((_, idx) => {
      const key = `${selectedToolIndex}-letter-${idx}`;
      return letterResults[key] === 'pass';
    }).length;
  }, [letterResults, activeTool, selectedToolIndex]);

  const wordsPassedCount = useMemo(() => {
    return activeTool.words.filter((_, idx) => {
      const key = `${selectedToolIndex}-word-${idx}`;
      return wordResults[key] === 'pass';
    }).length;
  }, [wordResults, activeTool, selectedToolIndex]);

  const sentencesPassedAll = useMemo(() => {
    return Object.values(sentenceResults).every(v => v === true);
  }, [sentenceResults]);

  const questionsPassedAll = useMemo(() => {
    return Object.values(questionResults).every(v => v === true);
  }, [questionResults]);

  // Automatic Level Evaluator (FLN National standard criteria)
  const calculatedLevel = useMemo(() => {
    if (manualLevel !== null) return manualLevel;

    // Standard assessment matrix:
    // Level 1: Under letters (if read <= 10 letters and cannot read words)
    // Level 2: Can read letters/words (if read > 10 letters or any words, but not all sentences fluently)
    // Level 3: Can read sentences fluently, but fails passage comprehension
    // Level 4: Can read passage fluently and understand questions perfectly (Pro)

    const canReadPassage = sentencesPassedAll; // passage consists of continuous sentences
    const canUnderstand = questionsPassedAll;

    if (canReadPassage && canUnderstand && wordsPassedCount >= 8) {
      return 4; // স্তর-৪: অনুচ্ছেদ সাবলীলভাবে পড়ে বোধগম্য হয়েছে (দক্ষ)
    }
    if (canReadPassage || sentencesPassedAll) {
      return 3; // স্তর-৩: বাক্য পড়তে পারে
    }
    if (wordsPassedCount > 0 || lettersPassedCount > 5) {
      return 2; // স্তর-২: অক্ষর/শব্দ পড়তে পারে
    }
    return 1; // স্তর-১: অক্ষর পরিচিতি নেই
  }, [lettersPassedCount, wordsPassedCount, sentencesPassedAll, questionsPassedAll, manualLevel]);

  // Reset current evaluation form
  const handleResetEvaluation = () => {
    if (confirm("আপনি কি নিশ্চিত যে বর্তমান মূল্যায়ন ফলাফলগুলো রিসেট করতে চান?")) {
      const updatedLetters = { ...letterResults };
      activeTool.letters.forEach((_, idx) => {
        updatedLetters[`${selectedToolIndex}-letter-${idx}`] = 'none';
      });
      setLetterResults(updatedLetters);

      const updatedWords = { ...wordResults };
      activeTool.words.forEach((_, idx) => {
        updatedWords[`${selectedToolIndex}-word-${idx}`] = 'none';
      });
      setWordResults(updatedWords);

      setSentenceResults({ 0: false, 1: false, 2: false });
      setQuestionResults({ 0: false, 1: false });
      setManualLevel(null);
      setStudentName('');
      setStudentRoll('');
      setEvaluatorName('');
      speak("ফলাফল রিসেট করা হয়েছে");
    }
  };

  // Toggle Letter State: none -> pass -> fail -> none
  const toggleLetter = (idx: number) => {
    const key = `${selectedToolIndex}-letter-${idx}`;
    const current = letterResults[key] || 'none';
    let next: 'none' | 'pass' | 'fail' = 'none';
    if (current === 'none') {
      next = 'pass';
      speak(activeTool.letters[idx]);
    } else if (current === 'pass') {
      next = 'fail';
    } else {
      next = 'none';
    }
    setLetterResults(prev => ({ ...prev, [key]: next }));
  };

  // Toggle Word State: none -> pass -> fail -> none
  const toggleWord = (idx: number) => {
    const key = `${selectedToolIndex}-word-${idx}`;
    const current = wordResults[key] || 'none';
    let next: 'none' | 'pass' | 'fail' = 'none';
    if (current === 'none') {
      next = 'pass';
      speak(activeTool.words[idx]);
    } else if (current === 'pass') {
      next = 'fail';
    } else {
      next = 'none';
    }
    setWordResults(prev => ({ ...prev, [key]: next }));
  };

  const toggleSentence = (idx: number) => {
    setSentenceResults(prev => {
      const nextVal = !prev[idx];
      if (nextVal) {
        speak(activeTool.sentences[idx]);
      }
      return { ...prev, [idx]: nextVal };
    });
  };

  const toggleQuestion = (idx: number) => {
    setQuestionResults(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // HTML Print Handler for Current Tool / Booklet
  const handlePrint = (mode: 'current' | 'all') => {
    speak(mode === 'current' ? "বর্তমান মূল্যায়ন পেজ প্রিন্ট লেআউট তৈরি হচ্ছে" : "১০টি মূল্যায়ন পেজ প্রিন্ট লেআউট তৈরি হচ্ছে");
    document.body.classList.remove('print-mode-current', 'print-mode-all');
    document.body.classList.add(`print-mode-${mode}`);
    
    const handleAfterPrint = () => {
      document.body.classList.remove('print-mode-current', 'print-mode-all');
      window.removeEventListener('afterprint', handleAfterPrint);
    };
    window.addEventListener('afterprint', handleAfterPrint);
    
    // Add print class helper and call window.print
    const printWindow = window.print;
    if (printWindow) {
      setTimeout(() => {
        printWindow();
      }, 250);
    }
  };

  // HTML Offline Export and Download Handler
  const handleDownloadHTML = (mode: 'current' | 'all') => {
    speak(mode === 'current' ? "বর্তমান মূল্যায়ন বুকলেট ডাউনলোড ফাইল তৈরি হচ্ছে" : `${assessmentTools.length}টি মূল্যায়ন বুকলেট ডাউনলোড ফাইল তৈরি হচ্ছে`);
    
    const toolsToExport = mode === 'current' 
      ? [assessmentTools[selectedToolIndex]] 
      : assessmentTools;

    const pagesHtml = toolsToExport.map((tool) => {
      const lettersRow1 = tool.letters.slice(0, 12).map(l => `<td class="border border-black p-2 font-bold text-center">${l}</td>`).join('');
      const lettersRow2 = tool.letters.slice(12, 24).map(l => `<td class="border border-black p-2 font-bold text-center">${l}</td>`).join('');
      
      const wordsRow1 = tool.words.slice(0, 5).map(w => `<td class="border border-black p-2 font-bold text-center">${w}</td>`).join('');
      const wordsRow2 = tool.words.slice(5, 10).map(w => `<td class="border border-black p-2 font-bold text-center">${w}</td>`).join('');
      
      const sentencesList = tool.sentences.map((s, sIdx) => `
        <div class="flex gap-2">
          <span>${sIdx + 1}.</span>
          <span>${s}</span>
        </div>
      `).join('');

      const questionsList = tool.questions.map((qItem, qIdx) => `
        <div class="border-b border-gray-300 pb-2">
          <div><strong>প্রশ্ন ${qIdx + 1}:</strong> ${qItem.q}</div>
          <div class="text-gray-600 mt-1 text-[11px]">উত্তর সঠিক হয়েছে কি? হ্যাঁ / না</div>
        </div>
      `).join('');

      return `
        <div class="print-page border border-gray-300 rounded-2xl p-8 bg-white text-black mb-8 shadow-sm">
          <!-- Image & Banner Header -->
          <div class="flex justify-between items-center border-b-2 border-black pb-4 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 border border-black rounded-md flex items-center justify-center font-bold text-xl bg-gray-50">
                ক
              </div>
              <div>
                <h1 class="text-xl font-extrabold tracking-tight" style="font-weight: 900;">
                  FLN দক্ষতা যাচাই – জুন/২০২৬
                </h1>
                <p class="text-xs font-bold mt-0.5 text-gray-700">
                  তৃতীয় শ্রেণি বাংলা রিডিং দক্ষতা যাচাই মূল্যায়ন বুকলেট
                </p>
              </div>
            </div>
            
            <div class="text-right">
              <span class="border-2 border-black font-extrabold text-xs px-3 py-1 rounded-full bg-gray-50">
                ${tool.title}
              </span>
            </div>
          </div>

          <!-- Student Metadata Form Grid -->
          <div class="grid grid-cols-2 gap-y-3 gap-x-6 border-b border-gray-400 pb-4 mb-4 text-xs font-bold">
            <div>
              বিদ্যালয়ের নাম: <span class="border-b border-dotted border-black px-2">${schoolName || '..........................................................'}</span>
            </div>
            <div>
              যাচাইয়ের তারিখ: <span class="border-b border-dotted border-black px-2">${assessmentDate || '........................................'}</span>
            </div>
            <div>
              শিক্ষার্থীর নাম: <span class="border-b border-dotted border-black px-2">${studentName || '..........................................................'}</span>
            </div>
            <div>
              রোল নং: <span class="border-b border-dotted border-black px-2">${studentRoll || '........................................'}</span>
            </div>
          </div>

          <!-- Instruction Box -->
          <div class="border border-black p-3 bg-gray-50 rounded mb-4 text-[11px] leading-relaxed text-gray-800">
            <strong>[পরীক্ষকের জন্য নির্দেশনা:</strong> শিক্ষার্থীকে নিচের অংশগুলো ক্রমান্বয়ে পড়তে বলুন। যেই ঘরে শিক্ষার্থী সাবলীলভাবে পড়তে সক্ষম হবে, ঠিক তার আগের ঘরকে তার দক্ষতার স্তর হিসেবে নির্ধারণ করুন।<strong>]</strong>
          </div>

          <!-- Part 1: Letters Grid -->
          <div class="mb-4">
            <div class="flex justify-between items-center border-b border-black pb-1.5 mb-2 text-xs font-bold">
              <span>টুলস ১: অক্ষর পরিচিতি (নিচের অক্ষরগুলো নির্দেশ করে যেকোনো ক্রমে পড়তে বলুন):</span>
              <span>সঠিকভাবে পড়ছে: ______ / ২০</span>
            </div>

            <table class="w-full border-collapse border border-black text-center text-sm font-bold">
              <tbody>
                <tr class="h-9">
                  ${lettersRow1}
                </tr>
                <tr class="h-9">
                  ${lettersRow2}
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Part 2: Words list -->
          <div class="mb-4">
            <div class="flex justify-between items-center border-b border-black pb-1.5 mb-2 text-xs font-bold">
              <span>টুলস ২: শব্দ পড়া (নিচের শব্দগুলো পড়তে বলুন):</span>
              <span>সঠিকভাবে পড়ছে: ______ / ১০</span>
            </div>

            <table class="w-full border-collapse border border-black text-center text-xs font-bold">
              <tbody>
                <tr class="h-9">
                  ${wordsRow1}
                </tr>
                <tr class="h-9">
                  ${wordsRow2}
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Part 3: Sentences list -->
          <div class="mb-4">
            <div class="flex justify-between items-center border-b border-black pb-1.5 mb-2 text-xs font-bold">
              <span>টুলস ৩: বাক্য পড়া (নিচের বাক্যগুলো পড়তে বলুন):</span>
              <span>সাবলীলভাবে পড়তে পেরেছে: হ্যাঁ / না</span>
            </div>

            <div class="space-y-1.5 text-xs font-bold pl-2 leading-relaxed">
              ${sentencesList}
            </div>
          </div>

          <!-- Part 4: Passage & Questions -->
          <div class="mb-4 border-t border-black pt-3">
            <div class="border-b border-black pb-1.5 mb-2 text-xs font-bold">
              টুলস ৪: অনুচ্ছেদ পড়া ও বোধগম্যতা (নিচের অনুচ্ছেদটি পড়তে বলুন, তারপর প্রশ্নগুলো জিজ্ঞাসা করুন):
            </div>

            <div class="grid grid-cols-12 gap-4 items-start">
              <div class="col-span-7 border border-black p-3 rounded text-xs leading-relaxed font-bold bg-white min-h-[100px]">
                ${tool.passage}
              </div>

              <div class="col-span-5 space-y-3 text-[10px] font-bold">
                ${questionsList}
              </div>
            </div>
          </div>

          <!-- Final Assessment Level Status Checkboxes -->
          <div class="border-2 border-black p-4 rounded mb-4 mt-4 bg-gray-50 font-bold">
            <div class="text-center text-xs font-extrabold border-b border-black pb-2 mb-3">
              চূড়ান্ত মূল্যায়ন (যেকোনো একটি স্তরে টিক দিন)
            </div>

            <div class="grid grid-cols-2 gap-y-2.5 text-xs font-bold">
              <div class="flex items-center gap-2">
                <span class="w-4 h-4 border border-black rounded inline-block bg-white"></span>
                <span>স্তর-১: অক্ষর পরিচিতি নেই ❌</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-4 h-4 border border-black rounded inline-block bg-white"></span>
                <span>স্তর-৩: বাক্য পড়তে পারে ✏️</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-4 h-4 border border-black rounded inline-block bg-white"></span>
                <span>স্তর-২: অক্ষর/শব্দ পড়তে পারে 📖</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-4 h-4 border border-black rounded inline-block bg-white"></span>
                <span>স্তর-৪: অনুচ্ছেদ সাবলীলভাবে পড়ে বোধগম্য হয়েছে (দক্ষ) 🏆</span>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-between items-center border-t border-gray-400 pt-3 text-[10px] text-gray-500 mt-4">
            <span>যাচাইকারীর নাম ও স্বাক্ষর: ___________________________</span>
            <span>FLN Assessment Booklet</span>
          </div>
        </div>
      `;
    }).join('<br style="page-break-after: always; clear: both;" />');

    const fullHtml = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <title>তৃতীয় শ্রেণি বাংলা রিডিং মূল্যায়ন বুকলেট</title>
  <style>
    body { font-family: 'Calibri', 'Arial', sans-serif; }
    p, td { line-height: 1.4; }
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>`;

    const blob = new Blob(['\ufeff' + fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = mode === 'current' 
      ? `Class_3_Bangla_FLN_Booklet_Tool_${assessmentTools[selectedToolIndex].id}.html`
      : `Class_3_Bangla_FLN_All_${assessmentTools.length}_Booklets.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Word Offline Export and Download Handler
  const handleDownloadWord = (mode: 'current' | 'all') => {
    speak(mode === 'current' ? "বর্তমান মূল্যায়ন বুকলেট ওয়ার্ড ফাইল তৈরি হচ্ছে" : `${assessmentTools.length}টি মূল্যায়ন বুকলেট ওয়ার্ড ফাইল তৈরি হচ্ছে`);
    
    const toolsToExport = mode === 'current' 
      ? [assessmentTools[selectedToolIndex]] 
      : assessmentTools;

    const pagesHtml = toolsToExport.map((tool) => {
      const lettersRow1 = tool.letters.slice(0, 12).map(l => `<td style="border: 1px solid black; padding: 8px; font-weight: bold; text-align: center;">${l}</td>`).join('');
      const lettersRow2 = tool.letters.slice(12, 24).map(l => `<td style="border: 1px solid black; padding: 8px; font-weight: bold; text-align: center;">${l}</td>`).join('');
      
      const wordsRow1 = tool.words.slice(0, 5).map(w => `<td style="border: 1px solid black; padding: 8px; font-weight: bold; text-align: center;">${w}</td>`).join('');
      const wordsRow2 = tool.words.slice(5, 10).map(w => `<td style="border: 1px solid black; padding: 8px; font-weight: bold; text-align: center;">${w}</td>`).join('');
      
      const sentencesList = tool.sentences.map((s, sIdx) => `
        <p style="margin: 5px 0; font-size: 11pt;"><strong>${sIdx + 1}.</strong> ${s}</p>
      `).join('');

      const questionsList = tool.questions.map((qItem, qIdx) => `
        <div style="border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 5px;">
          <p style="margin: 0; font-size: 10pt;"><strong>প্রশ্ন ${qIdx + 1}:</strong> ${qItem.q}</p>
          <p style="margin: 3px 0 0 0; color: #666; font-size: 9pt;">উত্তর সঠিক হয়েছে কি? হ্যাঁ / না</p>
        </div>
      `).join('');

      return `
        <div style="font-family: 'Calibri', 'Arial', sans-serif; margin-bottom: 40px; padding: 20px; border: 1px solid #ccc; background-color: #ffffff; color: #000000;">
          <!-- Image & Banner Header -->
          <table style="width: 100%; border: none; border-bottom: 2px solid black; padding-bottom: 10px; margin-bottom: 15px;">
            <tr>
              <td style="border: none; width: 70%; vertical-align: middle;">
                <h1 style="font-size: 18pt; font-weight: bold; margin: 0; color: #000;">FLN পঠন দক্ষতা যাচাই মূল্যায়ন বুকলেট</h1>
                <p style="font-size: 10pt; margin: 5px 0 0 0; color: #333;">তৃতীয় শ্রেণি বাংলা রিডিং দক্ষতা যাচাই মূল্যায়ন বুকলেট</p>
              </td>
              <td style="border: none; text-align: right; width: 30%; vertical-align: middle;">
                <span style="border: 2px solid black; font-weight: bold; font-size: 11pt; padding: 5px 10px; background-color: #f0f0f0;">
                  ${tool.title}
                </span>
              </td>
            </tr>
          </table>

          <!-- Student Metadata Form Grid -->
          <table style="width: 100%; border: none; font-size: 10pt; font-weight: bold; margin-bottom: 15px;">
            <tr>
              <td style="border: none; padding: 4px; width: 50%;">
                বিদ্যালয়ের নাম: <span style="border-b: 1px dotted black;">${schoolName || '..........................................................'}</span>
              </td>
              <td style="border: none; padding: 4px; width: 50%;">
                যাচাইয়ের তারিখ: <span style="border-b: 1px dotted black;">${assessmentDate || '........................................'}</span>
              </td>
            </tr>
            <tr>
              <td style="border: none; padding: 4px; width: 50%;">
                শিক্ষার্থীর নাম: <span style="border-b: 1px dotted black;">${studentName || '..........................................................'}</span>
              </td>
              <td style="border: none; padding: 4px; width: 50%;">
                রোল নং: <span style="border-b: 1px dotted black;">${studentRoll || '........................................'}</span>
              </td>
            </tr>
          </table>

          <!-- Instruction Box -->
          <div style="border: 1px solid black; padding: 10px; background-color: #f9f9f9; font-size: 10pt; margin-bottom: 15px; line-height: 1.4;">
            <strong>[পরীক্ষকের জন্য নির্দেশনা:</strong> শিক্ষার্থীকে নিচের অংশগুলো ক্রমান্বয়ে পড়তে বলুন। যেই ঘরে শিক্ষার্থী সাবলীলভাবে পড়তে সক্ষম হবে, ঠিক তার আগের ঘরকে তার দক্ষতার স্তর হিসেবে নির্ধারণ করুন।<strong>]</strong>
          </div>

          <!-- Part 1: Letters Grid -->
          <div style="margin-bottom: 15px;">
            <p style="font-weight: bold; font-size: 11pt; border-bottom: 1px solid black; padding-bottom: 3px; margin-bottom: 8px;">
              টুলস ১: অক্ষর পরিচিতি (নিচের অক্ষরগুলো নির্দেশ করে যেকোনো ক্রমে পড়তে বলুন) [সঠিকভাবে পড়ছে: ______ / ২০]
            </p>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
              <tr>
                ${lettersRow1}
              </tr>
              <tr>
                ${lettersRow2}
              </tr>
            </table>
          </div>

          <!-- Part 2: Words list -->
          <div style="margin-bottom: 15px;">
            <p style="font-weight: bold; font-size: 11pt; border-bottom: 1px solid black; padding-bottom: 3px; margin-bottom: 8px;">
              টুলস ২: শব্দ পড়া (নিচের শব্দগুলো পড়তে বলুন) [সঠিকভাবে পড়ছে: ______ / ১০]
            </p>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
              <tr>
                ${wordsRow1}
              </tr>
              <tr>
                ${wordsRow2}
              </tr>
            </table>
          </div>

          <!-- Part 3: Sentences list -->
          <div style="margin-bottom: 15px;">
            <p style="font-weight: bold; font-size: 11pt; border-bottom: 1px solid black; padding-bottom: 3px; margin-bottom: 8px;">
              টুলস ৩: বাক্য পড়া (নিচের বাক্যগুলো পড়তে বলুন) [সাবলীলভাবে পড়তে পেরেছে: হ্যাঁ / না]
            </p>
            <div style="padding-left: 10px;">
              ${sentencesList}
            </div>
          </div>

          <!-- Part 4: Passage & Questions -->
          <div style="margin-bottom: 15px; border-top: 1px solid black; padding-top: 10px;">
            <p style="font-weight: bold; font-size: 11pt; margin-bottom: 8px;">
              টুলস ৪: অনুচ্ছেদ পড়া ও বোধগম্যতা (নিচের অনুচ্ছেদটি পড়তে বলুন, তারপর প্রশ্নগুলো জিজ্ঞাসা করুন):
            </p>
            <table style="width: 100%; border: none;">
              <tr>
                <td style="border: 1px solid black; padding: 10px; width: 55%; vertical-align: top; line-height: 1.6; font-size: 11pt; font-weight: bold; background-color: #ffffff;">
                  ${tool.passage}
                </td>
                <td style="border: none; padding-left: 15px; width: 45%; vertical-align: top;">
                  ${questionsList}
                </td>
              </tr>
            </table>
          </div>

          <!-- Final Levels -->
          <div style="border: 2px solid black; padding: 10px; margin-top: 20px; background-color: #f5f5f5;">
            <p style="text-align: center; font-weight: bold; font-size: 11pt; border-bottom: 1px solid black; padding-bottom: 5px; margin: 0 0 10px 0;">
              চূড়ান্ত মূল্যায়ন (যেকোনো একটি স্তরে টিক দিন)
            </p>
            <table style="width: 100%; border: none; font-size: 10pt;">
              <tr>
                <td style="border: none; padding: 4px; width: 50%;">[  ] স্তর-১: অক্ষর পরিচিতি নেই ❌</td>
                <td style="border: none; padding: 4px; width: 50%;">[  ] স্তর-৩: বাক্য পড়তে পারে ✏️</td>
              </tr>
              <tr>
                <td style="border: none; padding: 4px; width: 50%;">[  ] স্তর-২: অক্ষর/শব্দ পড়তে পারে 📖</td>
                <td style="border: none; padding: 4px; width: 50%;">[  ] স্তর-৪: অনুচ্ছেদ সাবলীলভাবে পড়ে বোধগম্য হয়েছে (দক্ষ) 🏆</td>
              </tr>
            </table>
          </div>

          <!-- Footer -->
          <table style="width: 100%; border: none; margin-top: 30px; font-size: 10pt;">
            <tr>
              <td style="border: none; border-top: 1px dashed #777; padding-top: 10px; width: 70%;">
                যাচাইকারীর নাম ও স্বাক্ষর: __________________________________________________
              </td>
              <td style="border: none; border-top: 1px dashed #777; padding-top: 10px; text-align: right; width: 30%; font-style: italic; color: #555;">
                FLN Assessment Booklet
              </td>
            </tr>
          </table>
        </div>
      `;
    }).join('<br style="page-break-after: always; clear: both;" />');

    const fullHtmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <title>তৃতীয় শ্রেণি বাংলা রিডিং মূল্যায়ন বুকলেট</title>
  <style>
    body { font-family: 'Calibri', 'Arial', sans-serif; }
    p, td { line-height: 1.4; }
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>`;

    // Package as a Word DOC via Blob
    const blob = new Blob(['\ufeff' + fullHtmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = mode === 'current' 
      ? `Class_3_Bangla_FLN_Booklet_Tool_${assessmentTools[selectedToolIndex].id}.doc`
      : `Class_3_Bangla_FLN_All_${assessmentTools.length}_Booklets.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Custom Tool Generator Handler
  const handleGenerateAssessmentTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) {
      setAiError("অনুগ্রহ করে একটি বিষয় বা থিম লিখুন");
      return;
    }
    
    setIsGenerating(true);
    setAiError(null);
    speak("আপনার কাস্টম মূল্যায়ন বুকলেটটি তৈরি করতে এআই টিউটর কাজ করছে, অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।");

    try {
      const response = await fetch(getApiUrl("/api/generate-assessment-tool"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic,
          title: aiCustomTitle || undefined
        })
      });

      if (!response.ok) {
        throw new Error("টুলস তৈরিতে সার্ভারে কোনো সমস্যা হয়েছে।");
      }

      const newToolData = await response.json();
      
      const nextId = assessmentTools.length + 1;
      const newTool: AssessmentTool = {
        id: nextId,
        title: newToolData.title || `কাস্টম মূল্যায়ন টুলস ${nextId}`,
        letters: newToolData.letters || [],
        words: newToolData.words || [],
        sentences: newToolData.sentences || [],
        passage: newToolData.passage || "",
        questions: newToolData.questions || []
      };

      setAssessmentTools(prev => [...prev, newTool]);
      setSelectedToolIndex(assessmentTools.length); // Select the newly created tool
      setShowAiTutor(false);
      
      // Reset generator form
      setAiTopic('');
      setAiCustomTitle('');
      speak("অসাধারণ! আপনার কাস্টম পঠন মূল্যায়ন বুকলেটটি সফলভাবে তৈরি হয়েছে এবং এটি ডিজিটাল বোর্ডে যুক্ত করা হয়েছে।");
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "টুলস তৈরি করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      speak("দুঃখিত, কাস্টম বুকলেট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsGenerating(false);
    }
  };

  // Send message to AI Tutor Chatbot
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isChatting) return;

    const userMsg = chatMessage.trim();
    setChatMessage('');
    setChatError(null);
    setIsChatting(true);
    
    // Optimistic update
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);

    try {
      const response = await fetch(getApiUrl("/api/ai-tutor-chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: chatHistory.filter(h => h.text !== '')
        })
      });

      if (!response.ok) {
        throw new Error("এআই টিউটরের সাথে যোগাযোগ করা যায়নি।");
      }

      const data = await response.json();
      setChatHistory(prev => [...prev, { role: 'model', text: data.text }]);
      speak(data.text);
    } catch (err: any) {
      console.error(err);
      setChatError("দুঃখিত, উত্তর পেতে কোনো সমস্যা হয়েছে।");
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-3xl p-4 sm:p-8 shadow-2xl relative text-white">
      
      {/* CSS PRINT COMPATIBLE STYLING EMULATION IN THE WEB DOCUMENT */}
      <style>{`
        #print-area-wrapper {
          display: none !important;
        }
        @media print {
          /* Hide the interactive React application root to prevent blank pages & double rendering */
          #root {
            display: none !important;
          }
          
          #print-area-wrapper {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          #print-area-wrapper * {
            visibility: visible !important;
          }
          
          /* If current print mode is active, hide other pages */
          body.print-mode-current .print-all-target {
            display: none !important;
          }
          
          .print-break-page {
            page-break-after: always !important;
            page-break-inside: avoid !important;
            min-height: 297mm !important;
            width: 210mm !important;
            padding: 12mm 15mm !important;
            box-sizing: border-box !important;
            background: white !important;
            color: black !important;
            border: none !important;
            margin: 0 auto !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* WEB VIEW HEADER */}
      <div className="no-print flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#21262d] pb-6 mb-6">
        <div>
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
            Class 3 FLN Assessment
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-400 to-purple-400 mt-2">
            📖 তৃতীয় শ্রেণী বাংলা পঠন মূল্যায়ন টুলস
          </h2>
          <p className="text-[#8b949e] text-xs sm:text-sm mt-1">
            জাতীয় পঠন দক্ষতা যাচাই (FLN) কাঠামোর ওপর ভিত্তি করে ১০টি প্রমিত মূল্যায়ন বুকলেট।
          </p>
        </div>

        {/* PRINT ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* PDF/HTML Downloads */}
          <button
            onClick={() => handleDownloadHTML('current')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
            title="বর্তমান পৃষ্ঠাটি প্রিন্ট-ফ্রেন্ডলি HTML/PDF ফরম্যাটে ডাউনলোড করুন"
          >
            <Download className="w-4 h-4" />
            <span>বর্তমান পেজ (A4 PDF)</span>
          </button>
          
          <button
            onClick={() => handleDownloadHTML('all')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
            title="১০টি বুকলেট একসাথে প্রিন্ট-ফ্রেন্ডলি HTML/PDF ফরম্যাটে ডাউনলোড করুন"
          >
            <FileDown className="w-4 h-4" />
            <span>১০টি টুলস (A4 PDF)</span>
          </button>

          {/* Microsoft Office Word Downloads */}
          <button
            onClick={() => handleDownloadWord('current')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black text-xs sm:text-sm rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
            title="শিক্ষকদের কাস্টমাইজেশনের জন্য বর্তমান পৃষ্ঠাটি Microsoft Word (.doc) ফরম্যাটে ডাউনলোড করুন"
          >
            <FileText className="w-4 h-4" />
            <span>বর্তমান পেজ (MS Word)</span>
          </button>
          
          <button
            onClick={() => handleDownloadWord('all')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-indigo-700 to-violet-700 text-white font-black text-xs sm:text-sm rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
            title="শিক্ষকদের কাস্টমাইজেশনের জন্য ১০টি বুকলেট একসাথে Microsoft Word (.doc) ফরম্যাটে ডাউনলোড করুন"
          >
            <FileText className="w-4 h-4" />
            <span>১০টি টুলস (MS Word)</span>
          </button>

          <button
            onClick={() => handlePrint('current')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2.5 bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] hover:bg-[#21262d] text-gray-300 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>সরাসরি প্রিন্ট</span>
          </button>
        </div>
      </div>

      {/* TOP STEP NAVIGATION FOR 10+ TOOLS AND AI TUTOR */}
      <div className="no-print mb-8 overflow-x-auto pb-2 flex gap-2 scrollbar-thin items-center">
        {assessmentTools.map((tool, idx) => {
          const isActive = selectedToolIndex === idx && !showAiTutor;
          return (
            <button
              key={tool.id}
              onClick={() => {
                setSelectedToolIndex(idx);
                setShowAiTutor(false);
                speak(`টুলস ${tool.id}`);
              }}
              className={`flex-shrink-0 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500 to-sky-500 text-white border-transparent shadow-lg shadow-teal-950/20 scale-105 font-black'
                  : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:border-[#8b949e]'
              }`}
            >
              টুলস {tool.id}
            </button>
          );
        })}

        {/* SPECIAL AI TUTOR WORKSPACE BUTTON AFTER TOOL 10 */}
        <button
          onClick={() => {
            setShowAiTutor(true);
            speak("স্মার্ট এআই টিউটর জেনারেটর চালু করা হয়েছে।");
          }}
          className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border cursor-pointer flex items-center gap-1.5 ${
            showAiTutor
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white border-transparent shadow-lg shadow-purple-950/25 scale-105 font-black animate-pulse'
              : 'bg-purple-950/20 text-purple-300 border-purple-900/40 hover:border-purple-500 hover:bg-purple-950/30'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>🤖 এআই স্মার্ট টিউটর (টুল মেকার)</span>
        </button>
      </div>

      {/* DYNAMIC FORM / METADATA HEADER */}
      <div className="no-print bg-[#161b22] border border-[#30363d] rounded-2xl p-4 sm:p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#8b949e] font-bold flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            বিদ্যালয়ের নাম:
          </label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#8b949e] font-bold flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-sky-400" />
            শিক্ষার্থীর নাম:
          </label>
          <input
            type="text"
            placeholder="নাম লিখুন..."
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#8b949e] font-bold flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            রোল নম্বর:
          </label>
          <input
            type="text"
            placeholder="রোল..."
            value={studentRoll}
            onChange={(e) => setStudentRoll(e.target.value)}
            className="bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#8b949e] font-bold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            যাচাইয়ের তারিখ:
          </label>
          <input
            type="date"
            value={assessmentDate}
            onChange={(e) => setAssessmentDate(e.target.value)}
            className="bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      {/* EXAMINER DIRECTION HINT BOX */}
      <div className="no-print bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl mb-8 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-blue-300 text-xs uppercase tracking-wide block mb-1">
            [পরীক্ষকের জন্য নির্দেশনা]
          </span>
          <p className="text-[#c9d1d9] text-xs leading-relaxed">
            শিক্ষার্থীকে নিচের অংশগুলো ক্রমান্বয়ে পর পর পড়তে বলুন। যেই ঘরে শিক্ষার্থী সাবলীলভাবে পড়তে সক্ষম হবে, ঠিক তার আগের ঘরকে তার দক্ষতার স্তর হিসেবে নির্ধারণ করুন। প্রতিটি ভুল বা সঠিক উচ্চারণ ডিজিটাল বোর্ডে ট্যাপ বা ক্লিক করে মূল্যায়ন করতে পারেন।
          </p>
        </div>
      </div>

      {/* ================= SMART AI TUTOR WORKSPACE OR INTERACTIVE DIGITAL TESTING BOARD ================= */}
      {showAiTutor ? (
        <div className="no-print bg-[#161b22] border-2 border-purple-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden space-y-6 text-white">
          {/* Ambient Purple Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-[#21262d] pb-6 mb-2">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-950/30 text-white text-2xl">
                🤖
              </div>
              <div>
                <span className="bg-purple-950/50 border border-purple-800/60 text-purple-400 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  FLN AI Specialist Tutor
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 mt-1">
                  স্মার্ট এআই টিউটর (ইন্সট্যান্ট টুলস মেকার)
                </h3>
              </div>
            </div>
            
            <button
              onClick={() => {
                setShowAiTutor(false);
                speak("মূল্যায়ন বোর্ডে ফিরে যাচ্ছি");
              }}
              className="px-4 py-2 bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] hover:border-[#8b949e] text-[#c9d1d9] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>মূল্যায়ন বোর্ডে ফিরুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Form & Interaction */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-purple-400">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="font-extrabold text-xs sm:text-sm">নতুন প্রমিত মূল্যায়ন টুলস তৈরি করুন</span>
                </div>
                
                <p className="text-[#8b949e] text-xs leading-relaxed">
                  টুলস ১, টুলস ২ ও টুলস ১০ এর আদলে হুবহু একটি নতুন পঠন দক্ষতা যাচাই বুকলেট instantly তৈরি করতে নিচের যেকোনো একটি থিমে ক্লিক করুন অথবা আপনার নিজস্ব থিম লিখে জেনারেট বাটনে চাপ দিন।
                </p>

                {/* Theme presets pills */}
                <div className="space-y-2">
                  <label className="text-[11px] text-[#8b949e] font-bold block">জনপ্রিয় থিম সাজেশন্স (ক্লিক করলেই বসে যাবে):</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { text: "আমাদের গ্রাম ও নদীমাতৃক দেশ", emoji: "🌾" },
                      { text: "স্বাধীন বাংলাদেশ ও বিজয় দিবস", emoji: "🇧🇩" },
                      { text: "মহাকাশ যাত্রা ও রকেট বিজ্ঞান", emoji: "🚀" },
                      { text: "বর্ষার নদী ও মাঝির গান", emoji: "⛵" },
                      { text: "গাছপালা ও আমাদের প্রিয় ফলের বাগান", emoji: "🌳" },
                      { text: "স্বাস্থ্য রক্ষা ও নিয়মিত হাত ধোয়া", emoji: "🧼" }
                    ].map((themeItem, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setAiTopic(themeItem.text);
                          setAiCustomTitle(`কাস্টম মূল্যায়ন – ${themeItem.text}`);
                          speak(`${themeItem.text} থিম সিলেক্ট করা হয়েছে`);
                        }}
                        className="px-3 py-1.5 bg-[#161b22] hover:bg-purple-950/20 border border-[#30363d] hover:border-purple-500/50 rounded-xl text-xs text-gray-300 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>{themeItem.emoji}</span>
                        <span>{themeItem.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form fields */}
                <form onSubmit={handleGenerateAssessmentTool} className="space-y-4 pt-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#8b949e] font-bold">
                      টুলসের মূল বিষয় বা থিম (বাংলায় লিখুন):
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: আমাদের পরিবেশ ও বনায়ন..."
                      value={aiTopic}
                      onChange={(e) => {
                        setAiTopic(e.target.value);
                        setAiCustomTitle(`কাস্টম মূল্যায়ন – ${e.target.value}`);
                      }}
                      className="bg-[#161b22] border border-[#30363d] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#8b949e] font-bold">
                      টুলসের শিরোনাম (ঐচ্ছিক):
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: কাস্টম পঠন মূল্যায়ন..."
                      value={aiCustomTitle}
                      onChange={(e) => setAiCustomTitle(e.target.value)}
                      className="bg-[#161b22] border border-[#30363d] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors w-full"
                    />
                  </div>

                  {aiError && (
                    <div className="p-3 bg-rose-950/20 border border-rose-500/30 text-rose-400 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      <span>{aiError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isGenerating}
                    className={`w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-black text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                      isGenerating ? 'opacity-70 cursor-not-allowed animate-pulse' : 'hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>এআই টিউটর বুকলেটটি তৈরি করছে...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300 animate-bounce" />
                        <span>🤖 কাস্টম বুকলেট তৈরি করুন (ইন্সট্যান্ট)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: AI Tutor Educational Guidelines */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 space-y-4 h-full flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-amber-400 flex items-center gap-1.5 mb-3 border-b border-[#21262d] pb-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    শিক্ষাবিদ টিপস ও মূল্যায়ন নীতি
                  </h4>
                  <ul className="space-y-3 text-xs text-gray-300 leading-relaxed">
                    <li className="flex gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>প্রমিত মান বজায়:</strong> এআই টিউটর প্রতিটি কাস্টম টুলের জন্য হুবহু ২০টি বর্ণ/যুক্তবর্ণ, ১০টি শব্দ, ৩টি বাক্য এবং একটি ৪-৫ লাইনের অনুচ্ছেদ সহ ২টি বোধগম্যতা প্রশ্ন তৈরি করে।</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>শিক্ষার্থীর স্তরভিত্তিক যাচাই:</strong> তৈরি করা প্রতিটি বুকলেটে পর্যায়ক্রমে সহজ থেকে কঠিন স্তরে মূল্যায়ন সাজানো থাকে যা ক্লাস ৩ এর জন্য জাতীয় FLN স্ট্যান্ডার্ড পরিমাপ নিশ্চিত করে।</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>ইন্টারেক্টিভ ডিজিটাল স্কোরিং:</strong> বুকলেটটি তৈরি হওয়ার সাথে সাথে তা মূল্যায়ন বোর্ডে যুক্ত হবে। বোর্ডে প্রতিটি ভুল বা সঠিক পাঠ চিহ্নিত করে সাথে সাথেই শিক্ষার্থীর স্তর স্বয়ংক্রিয়ভাবে হিসেব করা যাবে।</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#0d1117] border border-purple-900/30 p-4 rounded-xl mt-4 text-[11px] text-purple-300/90 leading-relaxed">
                  <strong>💬 টিউটর বাণী:</strong> "ভাষা শুধু মুখস্থ করার বিষয় নয়, এটি আনন্দের একটি মাধ্যম। কাস্টম বুকলেট দিয়ে নতুন নতুন মজার বিষয়ে যাচাই করলে শিশুর ভয় কেটে যায় এবং পড়ার আগ্রহ কয়েকگونه বেড়ে যায়।"
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-print space-y-8">
        
        {/* SECTION 1: LETTERS GRID */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#21262d] pb-4 mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-black text-amber-400 flex items-center gap-2">
                <span className="bg-amber-950/50 border border-amber-800/40 text-amber-400 w-7 h-7 rounded-lg flex items-center justify-center text-xs">
                  ১
                </span>
                টুলস ১: অক্ষর পরিচিতি
              </h3>
              <p className="text-[#8b949e] text-xs mt-1">
                নিচের অক্ষরগুলো নির্দেশ করে শিক্ষার্থীকে পর্যায়ক্রমে যেকোনো ক্রমে পড়তে বলুন।
              </p>
            </div>
            
            <div className="bg-[#0d1117] border border-[#30363d] px-4 py-2 rounded-xl flex items-center gap-2">
              <span className="text-xs text-[#8b949e] font-semibold">সঠিকভাবে পড়ছে:</span>
              <span className="text-sm font-black text-amber-400">{lettersPassedCount} / ২০</span>
            </div>
          </div>

          {/* LETTERS RENDERING */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {activeTool.letters.map((letter, idx) => {
              const key = `${selectedToolIndex}-letter-${idx}`;
              const state = letterResults[key] || 'none';
              return (
                <button
                  key={idx}
                  onClick={() => toggleLetter(idx)}
                  className={`py-3 rounded-xl font-bold font-sans text-lg border transition-all cursor-pointer select-none flex flex-col items-center justify-center gap-1 ${
                    state === 'pass'
                      ? 'bg-emerald-950/30 border-emerald-500 text-emerald-400'
                      : state === 'fail'
                      ? 'bg-rose-950/30 border-rose-500 text-rose-400'
                      : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e] text-[#f0f6fc]'
                  }`}
                >
                  <span className="text-xl font-black">{letter}</span>
                  <div className="flex items-center gap-1 text-[10px]">
                    {state === 'pass' && <Check className="w-3 h-3" />}
                    {state === 'fail' && <X className="w-3 h-3" />}
                    {state === 'none' && <span className="text-gray-600 font-mono">?</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: WORDS LIST */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#21262d] pb-4 mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-black text-emerald-400 flex items-center gap-2">
                <span className="bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 w-7 h-7 rounded-lg flex items-center justify-center text-xs">
                  ২
                </span>
                টুলস ২: শব্দ পড়া
              </h3>
              <p className="text-[#8b949e] text-xs mt-1">
                নিচের শব্দগুলো শিক্ষার্থীকে মনোযোগ দিয়ে স্পষ্টভাবে রিডিং পড়তে বলুন।
              </p>
            </div>

            <div className="bg-[#0d1117] border border-[#30363d] px-4 py-2 rounded-xl flex items-center gap-2">
              <span className="text-xs text-[#8b949e] font-semibold">সঠিকভাবে পড়ছে:</span>
              <span className="text-sm font-black text-emerald-400">{wordsPassedCount} / ১০</span>
            </div>
          </div>

          {/* WORDS RENDERING */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {activeTool.words.map((word, idx) => {
              const key = `${selectedToolIndex}-word-${idx}`;
              const state = wordResults[key] || 'none';
              return (
                <button
                  key={idx}
                  onClick={() => toggleWord(idx)}
                  className={`py-3.5 px-3 rounded-xl font-bold text-base border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    state === 'pass'
                      ? 'bg-emerald-950/30 border-emerald-500 text-emerald-400'
                      : state === 'fail'
                      ? 'bg-rose-950/30 border-rose-500 text-rose-400'
                      : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e] text-[#f0f6fc]'
                  }`}
                >
                  <span className="font-sans font-extrabold text-lg tracking-wide">{word}</span>
                  <div className="flex items-center gap-1 text-[10px]">
                    {state === 'pass' && <span className="bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-black text-[9px]">সঠিক</span>}
                    {state === 'fail' && <span className="bg-rose-500 text-slate-950 px-1.5 py-0.5 rounded font-black text-[9px]">ভুল</span>}
                    {state === 'none' && <span className="text-gray-500 font-mono text-[9px]">চিহ্নিত করুন</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: SENTENCES READING */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 sm:p-6">
          <div className="border-b border-[#21262d] pb-4 mb-4">
            <h3 className="text-base sm:text-lg font-black text-sky-400 flex items-center gap-2">
              <span className="bg-sky-950/50 border border-sky-800/40 text-sky-400 w-7 h-7 rounded-lg flex items-center justify-center text-xs">
                ৩
              </span>
              টুলস ৩: বাক্য পড়া
            </h3>
            <p className="text-[#8b949e] text-xs mt-1">
              নিচের বাক্যগুলো সাবলীলভাবে পড়ার জন্য বলুন। রিডিং পড়ার ধরণ অনুযায়ী হ্যাঁ বা না নির্ধারণ করুন।
            </p>
          </div>

          {/* SENTENCES LIST */}
          <div className="space-y-3.5">
            {activeTool.sentences.map((sentence, idx) => {
              const isPassed = sentenceResults[idx] || false;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-colors ${
                    isPassed ? 'bg-sky-950/10 border-sky-500/40' : 'bg-[#0d1117] border-[#30363d]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-extrabold text-sky-400 bg-sky-950/50 border border-sky-800/40 w-6 h-6 rounded-md flex items-center justify-center text-xs mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="font-sans font-bold text-[#f0f6fc] text-base leading-relaxed">
                      {sentence}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speak(sentence)}
                      className="p-2 bg-[#161b22] hover:bg-[#21262d] rounded-lg border border-[#30363d] text-[#8b949e] hover:text-white transition-colors cursor-pointer"
                      title="উচ্চারণ শুনুন"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleSentence(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isPassed
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:border-sky-500'
                      }`}
                    >
                      {isPassed ? '✓ সাবলীল' : '✗ অসাবলীল'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: PASSAGE & COMPREHENSION QUESTIONS */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 sm:p-6">
          <div className="border-b border-[#21262d] pb-4 mb-4">
            <h3 className="text-base sm:text-lg font-black text-purple-400 flex items-center gap-2">
              <span className="bg-purple-950/50 border border-purple-800/40 text-purple-400 w-7 h-7 rounded-lg flex items-center justify-center text-xs">
                ৪
              </span>
              টুলস ৪: অনুচ্ছেদ পড়া ও বোধগম্যতা
            </h3>
            <p className="text-[#8b949e] text-xs mt-1">
              নিচের অনুচ্ছেদটি শিক্ষার্থীকে পড়তে বলুন। পড়া শেষে তাকে পাশে দেওয়া প্রশ্নগুলো ক্রমান্বয়ে করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Passage Text */}
            <div className="lg:col-span-7 bg-[#0d1117] border border-[#30363d] p-5 rounded-2xl relative">
              <span className="absolute top-3 right-3 bg-purple-950/60 border border-purple-800/40 text-purple-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                পঠন অনুচ্ছেদ
              </span>
              <p className="font-sans font-bold text-[#f0f6fc] text-lg leading-loose tracking-wide mt-2">
                {activeTool.passage}
              </p>
              <button
                onClick={() => speak(activeTool.passage)}
                className="mt-4 px-4 py-2 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] rounded-xl text-xs font-bold text-purple-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>পুরো অনুচ্ছেদ শুনুন</span>
              </button>
            </div>

            {/* Evaluation Questions */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-xs text-[#8b949e] font-extrabold uppercase tracking-wider">
                বোধগম্যতা মূল্যায়ন প্রশ্নাবলী:
              </h4>

              {activeTool.questions.map((item, idx) => {
                const isCorrectAns = questionResults[idx] || false;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      isCorrectAns ? 'bg-purple-950/10 border-purple-500/40' : 'bg-[#0d1117] border-[#30363d]'
                    }`}
                  >
                    <span className="text-[10px] font-bold bg-[#161b22] px-2 py-0.5 rounded-full text-purple-400 border border-[#30363d]">
                      প্রশ্ন {idx + 1}
                    </span>
                    <p className="font-sans font-extrabold text-[#f0f6fc] text-sm mt-2">
                      {item.q}
                    </p>
                    <p className="text-[#8b949e] text-xs mt-1 italic">
                      নমুনা উত্তর: {item.ans}
                    </p>

                    <div className="mt-3.5 flex justify-end gap-2">
                      <button
                        onClick={() => toggleQuestion(idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isCorrectAns
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:border-purple-500'
                        }`}
                      >
                        {isCorrectAns ? '✓ উত্তর সঠিক' : '✗ উত্তর ভুল/অসম্পূর্ণ'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FINAL EVALUATION STATUS SUMMARY CARD */}
        <div className="bg-gradient-to-br from-[#1d2433] to-[#121824] border-2 border-teal-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Award className="w-32 h-32 text-teal-400" />
          </div>

          <h3 className="text-base sm:text-lg font-black text-teal-400 flex items-center gap-2 mb-4 border-b border-[#21262d] pb-3">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            চূড়ান্ত মূল্যায়ন (সর্বশেষ অর্জিত স্তর)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Level 1 Card */}
            <div
              onClick={() => setManualLevel(1)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                calculatedLevel === 1
                  ? 'bg-rose-950/20 border-rose-500 text-white shadow-lg'
                  : 'bg-[#0d1117]/60 border-[#30363d] text-gray-400'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase font-bold text-rose-400">স্তর - ১</span>
                {calculatedLevel === 1 && <Check className="w-4 h-4 text-rose-400" />}
              </div>
              <h4 className="font-extrabold text-sm mb-1 text-white">অক্ষর পরিচিতি নেই</h4>
              <p className="text-[11px] text-[#8b949e]">বর্ণমালা চিনতে বা উচ্চারণ করতে পুরোপুরি ব্যর্থ হয়েছে।</p>
            </div>

            {/* Level 2 Card */}
            <div
              onClick={() => setManualLevel(2)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                calculatedLevel === 2
                  ? 'bg-amber-950/20 border-amber-500 text-white shadow-lg'
                  : 'bg-[#0d1117]/60 border-[#30363d] text-gray-400'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase font-bold text-amber-400">স্তর - ২</span>
                {calculatedLevel === 2 && <Check className="w-4 h-4 text-amber-400" />}
              </div>
              <h4 className="font-extrabold text-sm mb-1 text-white">অক্ষর/শব্দ পড়তে পারে</h4>
              <p className="text-[11px] text-[#8b949e]">অক্ষর চিনে পড়তে পারে এবং দু-একটি সহজ শব্দ ভাঙতে সক্ষম।</p>
            </div>

            {/* Level 3 Card */}
            <div
              onClick={() => setManualLevel(3)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                calculatedLevel === 3
                  ? 'bg-sky-950/20 border-sky-500 text-white shadow-lg'
                  : 'bg-[#0d1117]/60 border-[#30363d] text-gray-400'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase font-bold text-sky-400">স্তর - ৩</span>
                {calculatedLevel === 3 && <Check className="w-4 h-4 text-sky-400" />}
              </div>
              <h4 className="font-extrabold text-sm mb-1 text-white">বাক্য পড়তে পারে</h4>
              <p className="text-[11px] text-[#8b949e]">সহজ ও সরল বাক্যগুলো সাবলীল গতিতে পড়ে শেষ করতে পারছে।</p>
            </div>

            {/* Level 4 Card */}
            <div
              onClick={() => setManualLevel(4)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                calculatedLevel === 4
                  ? 'bg-emerald-950/20 border-emerald-500 text-white shadow-lg'
                  : 'bg-[#0d1117]/60 border-[#30363d] text-gray-400'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400">স্তর - ৪</span>
                {calculatedLevel === 4 && <Check className="w-4 h-4 text-emerald-400 animate-bounce" />}
              </div>
              <h4 className="font-extrabold text-sm mb-1 text-white">সাবলীল ও দক্ষ পঠনকারী</h4>
              <p className="text-[11px] text-[#8b949e]">অনুচ্ছেদ সুন্দরভাবে রিডিং পড়ে তার ভেতরের অর্থ বুঝাতে পেরেছে।</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-[#21262d] pt-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-[#8b949e] font-bold">যাচাইকারীর নাম ও স্বাক্ষর:</span>
              <input
                type="text"
                placeholder="শিক্ষক / যাচাইকারীর নাম..."
                value={evaluatorName}
                onChange={(e) => setEvaluatorName(e.target.value)}
                className="bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              onClick={handleResetEvaluation}
              className="px-4 py-2 bg-rose-950/30 border border-rose-900/30 hover:border-rose-500/50 text-rose-400 hover:text-rose-300 font-bold text-xs rounded-xl flex items-center gap-1 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>মূল্যায়ন ফর্ম রিসেট করুন</span>
            </button>
          </div>
        </div>

      </div>
      )}

      {/* ========================================================= */}
      {/* ================= PRINT AREA WRAPPER ==================== */}
      {/* ========================================================= */}
      {/* Render directly inside document.body via React Portal to prevent blank pages from parent layouts */}
      {createPortal(
        <div id="print-area-wrapper">
        
        {assessmentTools.map((tool, tIdx) => {
          // If printing current mode, only show the selected tool
          // Otherwise print all tools
          const isCurrentSelected = selectedToolIndex === tIdx;
          return (
            <div
              key={tool.id}
              className={`print-page print-break-page border border-gray-300 rounded-lg p-6 bg-white text-black font-serif ${
                isCurrentSelected ? 'print-current-target' : 'print-all-target'
              }`}
              style={{
                fontFamily: 'serif',
                color: '#000000',
                backgroundColor: '#ffffff'
              }}
            >
              {/* Image & Banner Header */}
              <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-black rounded-md flex items-center justify-center font-bold text-xl">
                    ক
                  </div>
                  <div>
                    <h1 className="text-xl font-extrabold tracking-tight" style={{ fontWeight: 900 }}>
                      FLN দক্ষতা যাচাই – জুন/২০২৬
                    </h1>
                    <p className="text-xs font-bold mt-0.5">
                      তৃতীয় শ্রেণি বাংলা রিডিং দক্ষতা যাচাই মূল্যায়ন বুকলেট
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="border-2 border-black font-extrabold text-xs px-2 py-0.5 rounded-full">
                    {tool.title}
                  </span>
                </div>
              </div>

              {/* Student Metadata Form Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 border-b border-gray-400 pb-4 mb-4 text-xs font-bold">
                <div>
                  বিদ্যালয়ের নাম: <span className="border-b border-dotted border-black px-2">{schoolName || '..........................................................'}</span>
                </div>
                <div>
                  যাচাইয়ের তারিখ: <span className="border-b border-dotted border-black px-2">{assessmentDate || '........................................'}</span>
                </div>
                <div>
                  শিক্ষার্থীর নাম: <span className="border-b border-dotted border-black px-2">{studentName || '..........................................................'}</span>
                </div>
                <div>
                  রোল নং: <span className="border-b border-dotted border-black px-2">{studentRoll || '........................................'}</span>
                </div>
              </div>

              {/* Instruction Box */}
              <div className="border border-black p-3 bg-gray-100 rounded mb-4 text-[10px] leading-relaxed">
                <strong>[পরীক্ষকের জন্য নির্দেশনা:</strong> শিক্ষার্থীকে নিচের অংশগুলো ক্রমান্বয়ে পড়তে বলুন। যেই ঘরে শিক্ষার্থী সাবলীলভাবে পড়তে সক্ষম হবে, ঠিক তার আগের ঘরকে তার দক্ষতার স্তর হিসেবে নির্ধারণ করুন।<strong>]</strong>
              </div>

              {/* Part 1: Letters Grid */}
              <div className="mb-4">
                <div className="flex justify-between items-center border-b border-black pb-1.5 mb-2 text-xs font-bold">
                  <span>টুলস ১: অক্ষর পরিচিতি (নিচের অক্ষরগুলো নির্দেশ করে যেকোনো ক্রমে পড়তে বলুন):</span>
                  <span>সঠিকভাবে পড়ছে: ______ / ২০</span>
                </div>

                <table className="w-full border-collapse border border-black text-center text-sm font-bold">
                  <tbody>
                    <tr className="h-9">
                      {tool.letters.slice(0, 12).map((l, i) => (
                        <td key={i} className="border border-black w-1/12">{l}</td>
                      ))}
                    </tr>
                    <tr className="h-9">
                      {tool.letters.slice(12, 24).map((l, i) => (
                        <td key={i} className="border border-black w-1/12">{l}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Part 2: Words list */}
              <div className="mb-4">
                <div className="flex justify-between items-center border-b border-black pb-1.5 mb-2 text-xs font-bold">
                  <span>টুলস ২: শব্দ পড়া (নিচের শব্দগুলো পড়তে বলুন):</span>
                  <span>সঠিকভাবে পড়ছে: ______ / ১০</span>
                </div>

                <table className="w-full border-collapse border border-black text-center text-xs font-bold">
                  <tbody>
                    <tr className="h-9">
                      {tool.words.slice(0, 5).map((w, i) => (
                        <td key={i} className="border border-black w-1/5">{w}</td>
                      ))}
                    </tr>
                    <tr className="h-9">
                      {tool.words.slice(5, 10).map((w, i) => (
                        <td key={i} className="border border-black w-1/5">{w}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Part 3: Sentences list */}
              <div className="mb-4">
                <div className="flex justify-between items-center border-b border-black pb-1.5 mb-2 text-xs font-bold">
                  <span>টুলস ৩: বাক্য পড়া (নিচের বাক্যগুলো পড়তে বলুন):</span>
                  <span>সাবলীলভাবে পড়তে পেরেছে: হ্যাঁ / না</span>
                </div>

                <div className="space-y-1.5 text-xs font-bold pl-2">
                  {tool.sentences.map((s, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span>{idx + 1}.</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 4: Passage & Questions */}
              <div className="mb-4 border-t border-black pt-3">
                <div className="border-b border-black pb-1.5 mb-2 text-xs font-bold">
                  টুলস ৪: অনুচ্ছেদ পড়া ও বোধগম্যতা (নিচের অনুচ্ছেদটি পড়তে বলুন, তারপর প্রশ্নগুলো জিজ্ঞাসা করুন):
                </div>

                <div className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-7 border border-black p-3 rounded text-xs leading-relaxed font-bold">
                    {tool.passage}
                  </div>

                  <div className="col-span-5 space-y-3 text-[10px] font-bold">
                    {tool.questions.map((qItem, qIdx) => (
                      <div key={qIdx} className="border-b border-gray-300 pb-1.5">
                        <div><strong>প্রশ্ন {qIdx + 1}:</strong> {qItem.q}</div>
                        <div className="text-gray-600 mt-0.5">উত্তর সঠিক হয়েছে কি? হ্যাঁ / না</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Final Assessment Level Status Checkboxes */}
              <div className="border-2 border-black p-4 rounded mb-4 mt-4">
                <div className="text-center text-xs font-extrabold border-b border-black pb-2 mb-3">
                  চূড়ান্ত মূল্যায়ন (যেকোনো একটি স্তরে টিক দিন)
                </div>

                <div className="grid grid-cols-2 gap-y-2.5 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border border-black rounded inline-block"></span>
                    <span>স্তর-১: অক্ষর পরিচিতি নেই ❌</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border border-black rounded inline-block"></span>
                    <span>স্তর-৩: বাক্য পড়তে পারে ✏️</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border border-black rounded inline-block"></span>
                    <span>স্তর-২: অক্ষর/শব্দ পড়তে পারে 📖</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border border-black rounded inline-block"></span>
                    <span>স্তর-৪: অনুচ্ছেদ সাবলীলভাবে পড়ে বোধগম্য হয়েছে (দক্ষ) 🏆</span>
                  </div>
                </div>
              </div>

              {/* Signature Line Footer */}
              <div className="flex justify-between items-center text-xs font-bold mt-6 pt-4 border-t border-dashed border-gray-400">
                <div>
                  যাচাইকারীর নাম ও স্বাক্ষর: <span className="border-b border-dotted border-black px-4">{evaluatorName || '..........................................................'}</span>
                </div>
                <div className="text-[10px] text-gray-500 italic">
                  FLN Assessment Booklet, 2026
                </div>
              </div>

            </div>
          );
        })}

      </div>,
      document.body
    )}

    </div>
  );
}
