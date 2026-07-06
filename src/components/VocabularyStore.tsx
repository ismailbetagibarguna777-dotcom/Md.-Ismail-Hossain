import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Award, 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowLeft, 
  Trophy, 
  Gamepad2, 
  Check, 
  HelpCircle,
  VolumeX,
  Sparkles,
  ChevronRight,
  BookMarked,
  ExternalLink,
  AlertCircle,
  Wrench,
  Info,
  Search,
  ArrowUpDown,
  SlidersHorizontal,
  X,
  Maximize2,
  Filter
} from 'lucide-react';
import { vocabLevels, VocabLevel, WordItem } from '../data/vocabData';
import { playSuccessSound, playWhooshSound } from '../App';
import { getApiUrl } from '../lib/api';

interface WordExtraDetails {
  synonyms: string[];
  antonyms: string[];
  sentence: string;
  kidDefinition: string;
  englishTerm: string;
  unsplashId?: string;
}

const vocabDetailsMap: Record<string, WordExtraDetails> = {
  "কল": {
    synonyms: ["ট্যাপ", "পানির নল"],
    antonyms: ["উৎস", "সাগর"],
    sentence: "পানির কলটি আলতো করে ঘোরালে জল পড়ে।",
    kidDefinition: "পানির কল হলো এমন একটি যন্ত্র যা দিয়ে ঘরে সহজে পরিষ্কার পানি পাওয়া যায়।",
    englishTerm: "water tap",
    unsplashId: "photo-1585671952327-0ec405cc8f2a"
  },
  "ফল": {
    synonyms: ["শস্য", "মিষ্টি মেওয়া"],
    antonyms: ["ফুল", "শিকড়"],
    sentence: "সকালে একটি পাকা মিষ্টি ফল খাওয়া স্বাস্থ্যের জন্য অনেক ভালো।",
    kidDefinition: "ফল হলো গাছের মিষ্টি ও পুষ্টিকর অংশ যা আমাদের শক্তি দেয় এবং রোগ প্রতিরোধ করে।",
    englishTerm: "fruit",
    unsplashId: "photo-1610832958506-ee56336191d1"
  },
  "জল": {
    synonyms: ["पानी", "বারি", "সলিল"],
    antonyms: ["আগুন", "অনল"],
    sentence: "খেলাধুলার পর এক গ্লাস পরিষ্কার জল পান করা উচিত।",
    kidDefinition: "জল বা পানি হলো জীবন। আমাদের তৃষ্ণা মেটাতে এবং শরীর সুস্থ রাখতে জল প্রয়োজন।",
    englishTerm: "water",
    unsplashId: "photo-1548826879-189bc7503c94"
  },
  "বন": {
    synonyms: ["অরণ্য", "জঙ্গল", "কানন"],
    antonyms: ["মরুভূমি", "শহর"],
    sentence: "সুন্দরবনে অনেক বড় বড় গাছ আর সুন্দর সুন্দর হরিণ থাকে।",
    kidDefinition: "বন হলো এমন একটি প্রাকৃতিক স্থান যেখানে একসাথে প্রচুর গাছপালা এবং বন্যপ্রাণী থাকে।",
    englishTerm: "forest",
    unsplashId: "photo-1441974231531-c6227db76b6e"
  },
  "মন": {
    synonyms: ["হৃদয়", "অন্তর", "চিত্ত"],
    antonyms: ["দেহ", "শরীর"],
    sentence: "আজ আমার মন খুব খুশিতে গান গেয়ে উঠছে!",
    kidDefinition: "মন হলো আমাদের ভেতরের অনুভূতি ও চিন্তা করার ক্ষমতা, যা দিয়ে আমরা আনন্দ বা দুঃখ পাই।",
    englishTerm: "mind",
    unsplashId: "photo-1507525428034-b723cf961d3e"
  },
  "জন": {
    synonyms: ["মানুষ", "লোক", "ব্যক্তি"],
    antonyms: ["পশু", "একাকীত্ব"],
    sentence: "সবাই মিলে দশ জন এক সাথে মাঠে খেলতে গেল।",
    kidDefinition: "জন বলতে যেকোনো মানুষকে বোঝায়, যেমন তোমার বন্ধু বা পরিবারের কোনো সদস্য।",
    englishTerm: "people",
    unsplashId: "photo-1511632765486-a01980e01a18"
  },
  "পথ": {
    synonyms: ["রাস্তা", "সড়ক", "সরণি"],
    antonyms: ["বিপথ", "বাঁধ"],
    sentence: "সবুজ ঘাসে ঘেরা পথ দিয়ে আমরা হেঁটে স্কুলে যাই।",
    kidDefinition: "পথ হলো রাস্তা বা চলার জায়গা যা দিয়ে আমরা এক জায়গা থেকে অন্য জায়গায় যাই।",
    englishTerm: "road",
    unsplashId: "photo-1470071459604-3b5ec3a7fe05"
  },
  "ঘর": {
    synonyms: ["বাসา", "গৃহ", "আলয়"],
    antonyms: ["বাহির", "আকাশ"],
    sentence: "আমাদের ছোট্ট ঘরটি সবসময় হাসি-আনন্দে ভরে থাকে।",
    kidDefinition: "ঘর হলো এমন একটি নিরাপদ আশ্রয় যেখানে আমরা আমাদের পরিবারের সবার সাথে একসাথে থাকি।",
    englishTerm: "home",
    unsplashId: "photo-1513694203232-719a280e022f"
  },
  "হাত": {
    synonyms: ["হস্ত", "কর"],
    antonyms: ["পা", "পদ"],
    sentence: "খাওয়ার আগে সাবান দিয়ে দুই হাত খুব ভালো করে ধুতে হয়।",
    kidDefinition: "হাত হলো আমাদের শরীরের এমন এক অংশ যা দিয়ে আমরা খাই, লিখি, খেলি ও কাজ করি।",
    englishTerm: "hand",
    unsplashId: "photo-1516627145497-ae6968895b74"
  },
  "নখ": {
    synonyms: ["নখর"],
    antonyms: ["চুল"],
    sentence: "নখ সবসময় পরিষ্কার রাখলে পেটে কোনো জীবাণু যায় না।",
    kidDefinition: "নখ হলো আমাদের আঙুলের মাথার শক্ত অংশ যা আঙুলকে আঘাত থেকে রক্ষা করে।",
    englishTerm: "nail",
    unsplashId: "photo-1519014816548-bf5fe059798b"
  },
  "মুখ": {
    synonyms: ["বদন", "মুখমণ্ডল"],
    antonyms: ["পিঠ"],
    sentence: "ওর মিষ্টি মুখের মিষ্টি হাসি সবার মন জয় করে নেয়।",
    kidDefinition: "মুখ দিয়ে আমরা সুস্বাদু খাবার খাই, কথা বলি এবং আমাদের মিষ্টি হাসি প্রকাশ করি।",
    englishTerm: "mouth",
    unsplashId: "photo-1503919545889-aef636e10ad4"
  },
  "বল": {
    synonyms: ["গোলক", "খেলার বল"],
    antonyms: ["ব্যাট"],
    sentence: "লাল রঙের বলটি নিয়ে বন্ধুরা মিলে অনেক মজা করে খেলছি।",
    kidDefinition: "বল হলো খেলার একটি গোল খেলনা যা আমরা কিক করি, ছুড়ে মারি বা ক্যাচ ধরি।",
    englishTerm: "ball",
    unsplashId: "photo-1587280501635-68a0e82cd5ff"
  },
  "কলম": {
    synonyms: ["লেখনী"],
    antonyms: ["খাতা", "পেন্সিল"],
    sentence: "নতুন কলম দিয়ে আমি খাতায় সুন্দর করে আমার নাম লিখলাম।",
    kidDefinition: "কলম হলো লেখার একটি চমৎকার সরঞ্জাম যাতে কালি থাকে এবং যা দিয়ে আমরা মনের কথা খাতায় লিখি।",
    englishTerm: "pen",
    unsplashId: "photo-1583485088034-697b5bc54ccd"
  },
  "কমল": {
    synonyms: ["পদ্ম", "শতদল", "উৎপল"],
    antonyms: ["কাঁটা", "গোলাপ"],
    sentence: "বিলে অনেক সুন্দর সুন্দর গোলাপি রঙের কমল ফুটে আছে।",
    kidDefinition: "কমল বা পদ্ম হলো এমন একটি সুন্দর ফুল যা সাধারণত পানিতে বা বিলে ফোটে।",
    englishTerm: "lotus",
    unsplashId: "photo-1502082553048-f009c37129b9"
  },
  "গগন": {
    synonyms: ["আকাশ", "আসম্বর", "অম্বল"],
    antonyms: ["ধরণী", "পাতাল"],
    sentence: "নীল গগনে ছোট ছোট পাখি মনের সুখে উড়ে বেড়াচ্ছে।",
    kidDefinition: "গগন বা আকাশ হলো আমাদের মাথার ওপরে থাকা অসীম নীল ছাদ যেখানে সূর্য, চাঁদ ও তারা থাকে।",
    englishTerm: "sky",
    unsplashId: "photo-1506744038136-46273834b3fb"
  },
  "কদম": {
    synonyms: ["কদম্ব ফুল"],
    antonyms: ["গোলাপ"],
    sentence: "বর্ষাকালে হলুদ রঙের গোল গোল কদম ফুল ফোটে।",
    kidDefinition: "কদম হলো গোল বলের মতো দেখতে একটি হলুদ-সাদা ফুল যা বর্ষাকালে অনেক ফোটে।",
    englishTerm: "flower",
    unsplashId: "photo-1567306226416-28f0efdc88ce"
  },
  "দশ": {
    synonyms: ["দশক"],
    antonyms: ["এক"],
    sentence: "আমার দুই হাতে মোট দশটি মিষ্টি আঙুল রয়েছে।",
    kidDefinition: "দশ হলো একটি মজার গণিত সংখ্যা যা নয় এর পরে এবং এগারো এর আগে আসে।",
    englishTerm: "ten",
    unsplashId: "photo-1596495578065-6e0763fa1141"
  },
  "সব": {
    synonyms: ["সকল", "সবাই", "সমগ্র"],
    antonyms: ["কেউ না", "কিছু"],
    sentence: "আমরা সব বন্ধুরা মিলে মাঠে আনন্দ করছি।",
    kidDefinition: "সব মানে যেখানে কোনো কিছুই বাদ যায় না, সবকিছু বা সবাইকে একসাথে বোঝায়।",
    englishTerm: "all",
    unsplashId: "photo-1511632765486-a01980e01a18"
  },
  "নদ": {
    synonyms: ["নদী", "তটিনী", "তরঙ্গিনী"],
    antonyms: ["সাগর", "মরুभूमि"],
    sentence: "নদের দুই পাড়ে সবুজ ঘাস আর কাশফুল মাথা দোলায়।",
    kidDefinition: "নদ বা নদী হলো জল বয়ে চলার একটি দীর্ঘ প্রাকৃতিক পথ যা পাহাড় থেকে সাগরে গিয়ে মেষে।",
    englishTerm: "river",
    unsplashId: "photo-1470071459604-3b5ec3a7fe05"
  },
  "রস": {
    synonyms: ["মিষ্টি রস", "জুস", "নির্যাস"],
    antonyms: ["শুকনো", "তেতো"],
    sentence: "খেজুরের মিষ্টি রস খেতে শীতের সকালে খুব ভালো লাগে।",
    kidDefinition: "রস হলো ফল বা মিষ্টি উদ্ভিদের সুস্বাদু তরল অংশ যা আমাদের তৃপ্তি দেয়।",
    englishTerm: "juice",
    unsplashId: "photo-1613478223719-2ab802602423"
  },
  "পড়": {
    synonyms: ["অধ্যয়ন করা", "পাঠ করা"],
    antonyms: ["লেখা"],
    sentence: "বই পড়লে আমরা অনেক নতুন নতুন মজার জিনিস জানতে পারি।",
    kidDefinition: "পড়া হলো বই বা অক্ষরের দিকে তাকিয়ে তার চমৎকার অর্থ বোঝার এবং জ্ঞান অর্জন করার সুন্দর অভ্যাস।",
    englishTerm: "reading",
    unsplashId: "photo-1512820790803-83ca734da794"
  },
  "লিখ": {
    synonyms: ["কলম চালানো", "লিপিবদ্ধ করা"],
    antonyms: ["পড়া"],
    sentence: "আমার ডায়রিতে আমি রোজ মিষ্টি মনের কথা লিখি।",
    kidDefinition: "লেখা হলো মনের সুন্দর চিন্তাগুলোকে পেন্সিল বা কলম দিয়ে কাগজের পাতায় ফুটিয়ে তোলা।",
    englishTerm: "writing",
    unsplashId: "photo-1455390582262-044cdead277a"
  }
};

const getWordDetails = (item: WordItem) => {
  const custom = vocabDetailsMap[item.word];
  
  let englishTerm = "learning";
  if (item.meaning) {
    const match = item.meaning.match(/\(([^)]+)\)/);
    if (match && match[1]) {
      englishTerm = match[1].trim();
    }
  }

  let cleanMeaning = item.meaning || "সহজ শব্দ";
  cleanMeaning = cleanMeaning.replace(/\([^)]+\)/, '').trim();

  const details = {
    word: item.word,
    meaning: cleanMeaning,
    englishTerm: custom?.englishTerm || englishTerm,
    synonyms: custom?.synonyms || [cleanMeaning, "সহজ প্রকাশ"],
    antonyms: custom?.antonyms || ["অন্য শব্দ", "ভিন্ন রূপ"],
    sentence: custom?.sentence || `আমরা প্রতিদিন '${item.word}' শব্দটি দিয়ে মনের সুন্দর ভাব প্রকাশ করতে পারি।`,
    kidDefinition: custom?.kidDefinition || `এটি একটি খুবই সুন্দর শব্দ, যার অর্থ হলো '${cleanMeaning}'। এটি আমাদের সুন্দর বাংলা ভাষার অংশ।`,
    imageUrl: ""
  };

  if (custom?.unsplashId) {
    details.imageUrl = `https://images.unsplash.com/photo-${custom.unsplashId}?auto=format&fit=crop&w=600&q=80`;
  } else {
    details.imageUrl = `https://images.unsplash.com/featured/600x450/?${encodeURIComponent(details.englishTerm)},illustration,cute,child`;
  }

  return details;
};

const getDynamicBreakdown = (item: WordItem) => {
  if (item.breakdown) return item.breakdown;
  return item.word.split('').map(char => {
    if (char === '্') return '্ (হসন্ত)';
    return char;
  }).join(' + ');
};

interface VocabularyStoreProps {
  speak: (text: string) => Promise<any>;
  isAudioMuted: boolean;
  speechEngine?: 'google' | 'browser';
  setSpeechEngine?: (engine: 'google' | 'browser') => void;
}

export default function VocabularyStore({ speak, isAudioMuted, speechEngine = 'browser', setSpeechEngine }: VocabularyStoreProps) {
  const [selectedLevel, setSelectedLevel] = useState<VocabLevel | null>(null);
  const [activeSubLevelIndex, setActiveSubLevelIndex] = useState<number>(0);
  const [isReadingAll, setIsReadingAll] = useState<boolean>(false);
  const [currentlyReadingWord, setCurrentlyReadingWord] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<boolean>(false);
  const [flashcardMode, setFlashcardMode] = useState<boolean>(false);
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState<number>(0);
  const [flashcardAutoPlay, setFlashcardAutoPlay] = useState<boolean>(false);
  const [gameState, setGameState] = useState<{
    score: number;
    questionCount: number;
    currentWord: WordItem | null;
    options: string[];
    feedback: 'correct' | 'wrong' | null;
    selectedOption: string | null;
  }>({
    score: 0,
    questionCount: 0,
    currentWord: null,
    options: [],
    feedback: null,
    selectedOption: null,
  });

  // Diagnostics & Troubleshooting states
  const [showDiagnostics, setShowDiagnostics] = useState<boolean>(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testError, setTestError] = useState<string>('');

  // Word Sorting & Filtering states
  const [sortBy, setSortBy] = useState<'default' | 'difficulty' | 'length' | 'alphabetical'>('default');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Listened words progress state
  const [listenedWords, setListenedWords] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('vocab_listened_words');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Detailed learning statistics per word (listened/identified counts)
  const [wordStats, setWordStats] = useState<Record<string, { listenedCount: number; correctCount: number }>>(() => {
    try {
      const saved = localStorage.getItem('vocab_word_stats');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const updateWordStats = (word: string, type: 'listened' | 'correct') => {
    setWordStats((prev) => {
      const current = prev[word] || { listenedCount: 0, correctCount: 0 };
      const next = {
        ...prev,
        [word]: {
          listenedCount: type === 'listened' ? current.listenedCount + 1 : current.listenedCount,
          correctCount: type === 'correct' ? current.correctCount + 1 : current.correctCount,
        }
      };
      try {
        localStorage.setItem('vocab_word_stats', JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save progress stats:", e);
      }
      return next;
    });
  };

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (flashcardMode && flashcardAutoPlay) {
      const activeSubLevel = selectedLevel?.subLevels[activeSubLevelIndex];
      const wordsList = activeSubLevel ? activeSubLevel.words : [];
      if (wordsList.length === 0) return;

      const currentWord = wordsList[activeFlashcardIndex];
      if (currentWord) {
        setCurrentlyReadingWord(currentWord.word);
        speak(currentWord.word).finally(() => {
          setCurrentlyReadingWord(null);
        });
        if (selectedLevel) {
          markAsListened(selectedLevel.level, activeSubLevelIndex, currentWord.word);
        }
      }

      autoPlayTimerRef.current = setTimeout(() => {
        setActiveFlashcardIndex((prev) => {
          if (prev < wordsList.length - 1) {
            return prev + 1;
          } else {
            setFlashcardAutoPlay(false);
            return 0;
          }
        });
      }, 5000);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [flashcardMode, flashcardAutoPlay, activeFlashcardIndex, activeSubLevelIndex, selectedLevel]);

  const handleFlashcardNavigate = (dir: 'prev' | 'next') => {
    playWhooshSound();
    const activeSubLevel = selectedLevel?.subLevels[activeSubLevelIndex];
    const wordsList = activeSubLevel ? activeSubLevel.words : [];
    if (wordsList.length === 0) return;

    if (dir === 'prev') {
      setActiveFlashcardIndex((prev) => (prev > 0 ? prev - 1 : wordsList.length - 1));
    } else {
      setActiveFlashcardIndex((prev) => (prev < wordsList.length - 1 ? prev + 1 : 0));
    }
  };

  // Modal states for word detail view and lightbox
  const [selectedWordForModal, setSelectedWordForModal] = useState<WordItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const [generatedSentenceData, setGeneratedSentenceData] = useState<Record<string, { sentence: string; kidDefinition: string; synonyms: string[]; antonyms: string[] }>>({});
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [flippedWords, setFlippedWords] = useState<Record<string, boolean>>({});

  const toggleWordFlip = (word: string) => {
    setFlippedWords(prev => ({
      ...prev,
      [word]: !prev[word]
    }));
  };

  const fetchGeneratedSentence = async (item: WordItem) => {
    if (generatedSentenceData[item.word]) return;

    setIsGenerating(true);
    try {
      const details = getWordDetails(item);
      const res = await fetch(getApiUrl("/api/generate-sentence"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: item.word,
          meaning: item.meaning,
          englishTerm: details.englishTerm,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.sentence) {
          setGeneratedSentenceData(prev => ({
            ...prev,
            [item.word]: {
              sentence: data.sentence,
              kidDefinition: data.kidDefinition || details.kidDefinition,
              synonyms: data.synonyms || details.synonyms,
              antonyms: data.antonyms || details.antonyms,
            }
          }));
        }
      }
    } catch (err) {
      console.error("Error generating dynamic sentence:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (selectedWordForModal) {
      fetchGeneratedSentence(selectedWordForModal);
    }
  }, [selectedWordForModal]);

  const markAsListened = (levelNum: number, subIndex: number, word: string) => {
    updateWordStats(word, 'listened');
    const key = `${levelNum}_${subIndex}_${word}`;
    setListenedWords((prev) => {
      if (prev[key]) return prev;
      const next = { ...prev, [key]: true };
      try {
        localStorage.setItem('vocab_listened_words', JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save progress:", e);
      }
      return next;
    });
  };

  const clearProgress = () => {
    if (window.confirm('আপনি কি এই শব্দ ভান্ডারের সব শেখার অগ্রগতি মুছে নতুন করে শুরু করতে চান?')) {
      try {
        localStorage.removeItem('vocab_listened_words');
        localStorage.removeItem('vocab_word_stats');
        setListenedWords({});
        setWordStats({});
        playSuccessSound();
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Helper to calculate word complexity (as difficulty metric for kids)
  const getWordComplexity = (word: string): number => {
    let score = word.length * 10;
    if (word.includes('্')) {
      score += 50; // Joint letter (যুক্তবর্ণ) is considerably harder
    }
    // Specific compound/difficult diacritics
    const complexChars = ['ী', 'ূ', 'ৈ', 'ৌ', 'ৃ', 'ং', 'ঃ', 'ঁ', '্র', '্য'];
    for (const char of complexChars) {
      if (word.includes(char)) {
        score += 15;
      }
    }
    return score;
  };

  const getSortedWords = (): WordItem[] => {
    let list = [...(selectedLevel?.subLevels[activeSubLevelIndex]?.words || [])];

    // Search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(item => 
        item.word.toLowerCase().includes(q) || 
        (item.meaning && item.meaning.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'default') {
      return sortOrder === 'asc' ? list : list.reverse();
    }

    list.sort((a, b) => {
      if (sortBy === 'difficulty') {
        const diffA = getWordComplexity(a.word);
        const diffB = getWordComplexity(b.word);
        return sortOrder === 'asc' ? diffA - diffB : diffB - diffA;
      } else if (sortBy === 'length') {
        const lenA = a.word.length;
        const lenB = b.word.length;
        if (lenA !== lenB) {
          return sortOrder === 'asc' ? lenA - lenB : lenB - lenA;
        }
        return a.word.localeCompare(b.word, 'bn');
      } else if (sortBy === 'alphabetical') {
        return sortOrder === 'asc' 
          ? a.word.localeCompare(b.word, 'bn') 
          : b.word.localeCompare(a.word, 'bn');
      }
      return 0;
    });

    return list;
  };

  const getDifficultyLabel = (word: string) => {
    const score = getWordComplexity(word);
    if (score <= 25) return { label: 'সহজ 🟢', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' };
    if (score <= 50) return { label: 'মাঝারি 🟡', color: 'text-amber-400 border-amber-500/20 bg-amber-500/5' };
    return { label: 'কঠিন 🔴', color: 'text-rose-400 border-rose-500/20 bg-rose-500/5' };
  };

  const runSoundTest = async () => {
    setTestStatus('testing');
    setTestError('');
    try {
      // Attempt to play a simple word
      await speak("আমার সোনার বাংলা");
      setTestStatus('success');
      playSuccessSound();
    } catch (err: any) {
      console.error("Sound test failed:", err);
      setTestStatus('error');
      setTestError(err?.message || "browser audio context blocked");
    }
  };

  const readAllTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isReadingAllRef = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      stopReadingAll();
    };
  }, []);

  const handleWordClick = async (word: string) => {
    setCurrentlyReadingWord(word);
    if (selectedLevel) {
      markAsListened(selectedLevel.level, activeSubLevelIndex, word);
    }
    await speak(word);
    setCurrentlyReadingWord(null);

    // Find the word details and open the modal
    const wordList = selectedLevel?.subLevels[activeSubLevelIndex]?.words || [];
    const item = wordList.find(w => w.word === word);
    if (item) {
      setSelectedWordForModal(item);
      playSuccessSound();
    }
  };

  const handleCardClick = async (word: string) => {
    setCurrentlyReadingWord(word);
    if (selectedLevel) {
      markAsListened(selectedLevel.level, activeSubLevelIndex, word);
    }
    await speak(word);
    setCurrentlyReadingWord(null);
    toggleWordFlip(word);
  };

  const startReadingAll = async (words: WordItem[]) => {
    if (isReadingAllRef.current) {
      stopReadingAll();
      return;
    }
    isReadingAllRef.current = true;
    setIsReadingAll(true);
    playWhooshSound();

    for (let i = 0; i < words.length; i++) {
      if (!isReadingAllRef.current) break;
      const word = words[i].word;
      setCurrentlyReadingWord(word);
      if (selectedLevel) {
        markAsListened(selectedLevel.level, activeSubLevelIndex, word);
      }
      await speak(word);
      
      if (!isReadingAllRef.current) break;
      // Short delay before reading next word
      await new Promise<void>((resolve) => {
        readAllTimeoutRef.current = setTimeout(() => resolve(), 800);
      });
    }
    setCurrentlyReadingWord(null);
    setIsReadingAll(false);
    isReadingAllRef.current = false;
  };

  const stopReadingAll = () => {
    isReadingAllRef.current = false;
    if (readAllTimeoutRef.current) {
      clearTimeout(readAllTimeoutRef.current);
    }
    setIsReadingAll(false);
    setCurrentlyReadingWord(null);
  };

  // --- GAME LOGIC ---
  const startNewGame = () => {
    if (!selectedLevel) return;
    playWhooshSound();
    setGameMode(true);
    generateNewQuestion(selectedLevel, 0);
  };

  const generateNewQuestion = (level: VocabLevel, currentScore: number) => {
    // Collect all words in this level
    const allWords = level.subLevels.flatMap(sub => sub.words);
    if (allWords.length === 0) return;

    // Pick a random word
    const correctWord = allWords[Math.floor(Math.random() * allWords.length)];
    
    // Generate options
    const optionsSet = new Set<string>();
    optionsSet.add(correctWord.word);

    // Add some random distractors
    while (optionsSet.size < 4 && optionsSet.size < allWords.length) {
      const distractor = allWords[Math.floor(Math.random() * allWords.length)].word;
      optionsSet.add(distractor);
    }

    // Convert back to array and shuffle
    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    setGameState({
      score: currentScore,
      questionCount: gameState.questionCount + 1,
      currentWord: correctWord,
      options,
      feedback: null,
      selectedOption: null,
    });

    // Speak the target word for the child to listen
    setTimeout(() => {
      speak(correctWord.word);
    }, 400);
  };

  const handleOptionSelect = (option: string) => {
    if (gameState.feedback !== null) return; // Prevent double clicks
    
    const isCorrect = option === gameState.currentWord?.word;
    setGameState(prev => ({
      ...prev,
      selectedOption: option,
      feedback: isCorrect ? 'correct' : 'wrong',
    }));

    if (isCorrect) {
      playSuccessSound();
      setGameState(prev => ({ ...prev, score: prev.score + 1 }));
      if (gameState.currentWord) {
        updateWordStats(gameState.currentWord.word, 'correct');
      }
    } else {
      // Gentle vibration pattern if supported
      if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(100);
      }
    }

    // Move to next question after a brief delay
    setTimeout(() => {
      if (selectedLevel) {
        generateNewQuestion(selectedLevel, isCorrect ? gameState.score + 1 : gameState.score);
      }
    }, 1500);
  };

  const replayWord = () => {
    if (gameState.currentWord) {
      speak(gameState.currentWord.word);
    }
  };

  // Exit back to level select or clear state
  const exitLevel = () => {
    playWhooshSound();
    stopReadingAll();
    setSelectedLevel(null);
    setGameMode(false);
    setFlashcardMode(false);
    setFlashcardAutoPlay(false);
    setActiveFlashcardIndex(0);
    setActiveSubLevelIndex(0);
    setSortBy('default');
    setSortOrder('asc');
    setSearchQuery('');
  };

  // Calculate total words and total listened across all levels
  const grandTotalWords = vocabLevels.reduce((acc, lvl) => {
    return acc + lvl.subLevels.reduce((sum, sub) => sum + sub.words.length, 0);
  }, 0);

  let grandListenedCount = 0;
  vocabLevels.forEach((lvl) => {
    lvl.subLevels.forEach((sub, subIdx) => {
      sub.words.forEach((w) => {
        const key = `${lvl.level}_${subIdx}_${w.word}`;
        if (listenedWords[key]) {
          grandListenedCount++;
        }
      });
    });
  });

  const grandProgressPercent = grandTotalWords > 0 ? Math.round((grandListenedCount / grandTotalWords) * 100) : 0;

  return (
    <div className="VocabularyStore w-full max-w-6xl mx-auto px-4 py-6 text-slate-100 font-sans select-none" id="vocab-store-container">
      <h3 className="sr-only">শব্দ ভান্ডার</h3>
      <AnimatePresence mode="wait">
        {!selectedLevel ? (
          // LEVEL GRID VIEW
          <motion.div
            key="level-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Header info */}
            <div className="text-center space-y-3">
              <span className="bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-extrabold tracking-widest px-4 py-1.5 rounded-full uppercase inline-flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> ৫ থেকে ১০ বছরের শিশুদের জন্য
              </span>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                পড়াশোনা হোক আনন্দের! এখানে ৩৫টি বর্ণাঢ্য লেভেলে রয়েছে শত শত মিষ্টি বাংলা শব্দ। 
                প্রতিটি শব্দের সঠিক উচ্চারণ শুনতে ক্লিক করো এবং মজার গেম খেলে নিজের স্কোর বাড়াও!
              </p>

              {/* Grand Progress Tracker Banner */}
              {grandListenedCount > 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md mx-auto bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-lg mt-4 flex flex-col gap-2 text-left"
                >
                  <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1">🌟 সম্পূর্ণ শব্দ ভান্ডার শেখার অগ্রগতি:</span>
                    <span className="text-teal-400 font-black">{grandListenedCount} / {grandTotalWords} শব্দ</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950/80 rounded-full overflow-hidden border border-slate-800/80 p-[1px]">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 via-cyan-400 to-indigo-500 transition-all duration-700"
                      style={{ width: `${grandProgressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                    <span>{grandProgressPercent}% সম্পন্ন</span>
                    <button
                      onClick={clearProgress}
                      className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 uppercase tracking-wider text-[9px] font-black cursor-pointer"
                    >
                      🔄 অগ্রগতি রিসেট করুন
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* SOUND TROUBLESHOOTING & DIAGNOSTICS WIDGET */}
            <div className="max-w-4xl mx-auto bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    <Volume2 className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-100 flex items-center gap-2">
                      🔊 বাংলা শব্দ শুনতে সমস্যা হচ্ছে? 
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">
                      আইফ্রেম বা ব্রাউজার সিকিউরিটির কারণে শব্দ না শুনলে মাত্র ১টি ক্লিকেই সমাধান করুন!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDiagnostics(!showDiagnostics)}
                  className="px-4 py-2 bg-indigo-600/90 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl transition-all flex items-center gap-2 border border-indigo-400/20 shadow-md"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  {showDiagnostics ? "গাইড বন্ধ করুন" : "সমাধান ও সাউন্ড টেস্ট করুন"}
                </button>
              </div>

              {/* Collapsible Content */}
              <AnimatePresence>
                {showDiagnostics && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-6 pt-5 border-t border-slate-800/80 space-y-6"
                  >
                    {/* Diagnostic Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      
                      {/* Step 1: Open in New Tab */}
                      <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 relative">
                        <div className="absolute -top-3 left-4 bg-indigo-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-md text-white">
                          ধাপ ১ (সবচেয়ে সেরা)
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-indigo-300 mt-2 flex items-center gap-1.5">
                          <ExternalLink className="w-4 h-4" /> নতুন ট্যাবে অ্যাপটি খুলুন
                        </h4>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2">
                          গুগল এআই স্টুডিওর বিল্ট-ইন প্রিভিউ স্ক্রিনটি একটি সুরক্ষিত আইফ্রেম। অনেক ব্রাউজার আইফ্রেমের ভেতরে সরাসরি সাউন্ড প্লে ব্লক করে দেয়। ওপরের ডান কোনায় থাকা <strong className="text-slate-200">"Open in a new tab" ↗️</strong> বাটনে ক্লিক করে অ্যাপটি নতুন ট্যাবে চালু করলেই সব সাউন্ড ম্যাজিকের মতো সচল হবে!
                        </p>
                      </div>

                      {/* Step 2: Toggle Audio Engine */}
                      <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 relative">
                        <div className="absolute -top-3 left-4 bg-teal-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-md text-white">
                          ধাপ ২
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-teal-300 mt-2 flex items-center gap-1.5">
                          <Info className="সাউন্ড ইঞ্জিন পরিবর্তন" /> সাউন্ড ইঞ্জিন পরিবর্তন
                        </h4>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2 mb-4">
                          আপনার ব্রাউজার অনুযায়ী কোন ইঞ্জিনটি ভালো কাজ করছে তা বেছে নিন:
                        </p>
                        
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => setSpeechEngine && setSpeechEngine('browser')}
                            className={`px-3 py-2 rounded-lg text-left text-xs font-bold transition-all flex items-center justify-between border ${
                              speechEngine === 'browser'
                                ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span>Offline Browser Speech (অফলাইন)</span>
                            {speechEngine === 'browser' && <Check className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => setSpeechEngine && setSpeechEngine('google')}
                            className={`px-3 py-2 rounded-lg text-left text-xs font-bold transition-all flex items-center justify-between border ${
                              speechEngine === 'google'
                                ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span>Google Online TTS (গুগল অনলাইন)</span>
                            {speechEngine === 'google' && <Check className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Step 3: Diagnostic Sound Test */}
                      <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 relative flex flex-col justify-between">
                        <div>
                          <div className="absolute -top-3 left-4 bg-purple-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-md text-white">
                            ধাপ ৩
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-purple-300 mt-2 flex items-center gap-1.5">
                            <Volume2 className="w-4 h-4" /> সাউন্ড টেস্ট করুন
                          </h4>
                          <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2">
                            নিচের বোতামটি চেপে টেস্ট করে দেখুন শব্দ শোনা যায় কিনা। এটি সরাসরি "আমার সোনার বাংলা" বাক্যটি উচ্চারণ করবে।
                          </p>
                        </div>

                        <div className="mt-4 pt-2 border-t border-slate-800/40 flex flex-col gap-2">
                          <button
                            onClick={runSoundTest}
                            disabled={testStatus === 'testing'}
                            className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white rounded-xl shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {testStatus === 'testing' ? (
                              <>
                                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                সাউন্ড বাজানো হচ্ছে...
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5" />
                                টেস্ট সাউন্ড বাজান
                              </>
                            )}
                          </button>

                          {/* Live Diagnostic Status Feed */}
                          {testStatus !== 'idle' && (
                            <div className="mt-2 text-[11px] font-semibold text-center">
                              {testStatus === 'success' && (
                                <span className="text-emerald-400 flex items-center justify-center gap-1">
                                  <Check className="w-3 h-3" /> সাউন্ড প্লে সফল হয়েছে!
                                </span>
                              )}
                              {testStatus === 'error' && (
                                <span className="text-rose-400 flex flex-col gap-0.5 items-center justify-center leading-normal">
                                  <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> ব্রাউজার সাউন্ড ব্লক করেছে!</span>
                                  <span className="text-[10px] opacity-80 font-normal">দয়া করে "Open in a new tab" বাটনে ক্লিক করে নতুন উইন্ডোতে রান করুন।</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                    
                    {/* Device checklist notice */}
                    <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h5 className="text-xs font-bold text-slate-200">ডিভাইস ভলিউম এবং ব্রাউজার সেটিংস নিশ্চিত করুন</h5>
                        <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1 font-medium">
                          <li>নিশ্চিত করুন আপনার কম্পিউটার বা ফোনের স্পিকার চালু আছে এবং ভলিউম কমানো বা মিউট করা নেই।</li>
                          <li>স্ক্রিনের ওপরে থাকা <strong className="text-slate-300">"শব্দ চালু" (🔊 Sound Enabled)</strong> বোতামটিতে ক্লিক করে সেটি চালু আছে কিনা দেখে নিন।</li>
                          <li>গুগল ক্রোম বা সাফারির সাইট সেটিংসে গিয়ে অডিওর অনুমতি (Allow Audio/Sound) দেওয়া আছে কিনা দেখতে পারেন।</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Grid layout of 35 levels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
              {vocabLevels.map((lvl) => {
                const totalWordsCount = lvl.subLevels.reduce((acc, sub) => acc + sub.words.length, 0);
                
                // Calculate listened words for this level
                let lvlListenedCount = 0;
                lvl.subLevels.forEach((sub, subIdx) => {
                  sub.words.forEach((w) => {
                    const key = `${lvl.level}_${subIdx}_${w.word}`;
                    if (listenedWords[key]) {
                      lvlListenedCount++;
                    }
                  });
                });
                const lvlProgressPercent = totalWordsCount > 0 ? Math.round((lvlListenedCount / totalWordsCount) * 100) : 0;

                return (
                  <motion.div
                    key={lvl.level}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      playWhooshSound();
                      setSelectedLevel(lvl);
                      setActiveSubLevelIndex(0);
                    }}
                    className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-950 p-5 cursor-pointer shadow-xl transition-all hover:border-slate-700/60`}
                  >
                    {/* Corner gradient glow */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${lvl.theme} opacity-10 blur-xl rounded-full pointer-events-none`}></div>
                    
                    {/* Level Badge Header */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${lvl.theme} text-white font-black text-lg shadow-lg shadow-teal-950/20`}>
                        {lvl.level}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 tracking-wider flex items-center gap-1 bg-slate-800/40 px-2.5 py-1 rounded-full">
                        <BookMarked className="w-3 h-3 text-teal-400" /> {totalWordsCount}টি শব্দ
                      </span>
                    </div>

                    {/* Level Titles */}
                    <div className="mt-4 space-y-1.5">
                      <h3 className="text-lg font-black text-slate-100 tracking-wide flex items-center gap-1.5">
                        {lvl.title}
                        <ChevronRight className="w-4 h-4 text-slate-500 hover:text-slate-300 transition-colors" />
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold line-clamp-2 leading-relaxed min-h-[32px]">
                        {lvl.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-500">শেখার অগ্রগতি</span>
                        <span className="text-teal-400 font-black">{lvlListenedCount}/{totalWordsCount} শব্দ</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950/80 rounded-full overflow-hidden p-[1px] border border-slate-800/40">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${lvl.theme} transition-all duration-500`}
                          style={{ width: `${lvlProgressPercent}%` }}
                        />
                      </div>
                      {lvlProgressPercent === 100 && (
                        <div className="text-[9px] font-bold text-amber-400 flex items-center gap-1 mt-0.5 justify-end">
                          <span>🏆 ১০০% সম্পন্ন! (সব পড়া শেষ)</span>
                        </div>
                      )}
                    </div>

                    {/* Fun tags */}
                    <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between text-[11px] font-bold text-teal-400/90">
                      <span className="flex items-center gap-1">
                        <Volume2 className="w-3 h-3" /> সশব্দ উচ্চারণ
                      </span>
                      <span className="text-amber-400/90 flex items-center gap-1">
                        <Gamepad2 className="w-3 h-3" /> মজার গেম
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          // ACTIVE LEVEL DETAILED VIEW
          <motion.div
            key="active-level-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Navigation Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800/60 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <button
                  onClick={exitLevel}
                  className="p-3 bg-slate-800/80 border border-slate-700/50 hover:bg-slate-700/80 text-slate-200 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center"
                  title="লেভেলে ফিরে যাও"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-xs font-black rounded-full bg-gradient-to-r ${selectedLevel.theme} text-white uppercase shadow-sm`}>
                      লেভেল {selectedLevel.level}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                      {selectedLevel.title}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-teal-400 font-bold mt-1">
                    {selectedLevel.description}
                  </p>
                </div>
              </div>

              {/* Mode toggle selectors */}
              <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/40 shadow-inner">
                {/* 1. Study Grid Mode */}
                <button
                  onClick={() => {
                    playWhooshSound();
                    stopReadingAll();
                    setGameMode(false);
                    setFlashcardMode(false);
                    setFlashcardAutoPlay(false);
                  }}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm ${
                    !gameMode && !flashcardMode
                      ? 'bg-slate-800 text-white border border-slate-700/50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>শব্দমালা পড়ো</span>
                </button>

                {/* 2. Flashcard Mode */}
                <button
                  onClick={() => {
                    playWhooshSound();
                    stopReadingAll();
                    setGameMode(false);
                    setFlashcardMode(true);
                    setActiveFlashcardIndex(0);
                    setFlashcardAutoPlay(false);
                  }}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm ${
                    flashcardMode
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg border border-teal-400/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>ফ্ল্যাশকার্ড মোড 🎈</span>
                </button>

                {/* 3. Word Search Game Mode */}
                <button
                  onClick={() => {
                    playWhooshSound();
                    stopReadingAll();
                    setGameMode(true);
                    setFlashcardMode(false);
                    setFlashcardAutoPlay(false);
                    startNewGame();
                  }}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm ${
                    gameMode
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black shadow-lg border border-amber-400/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                  }`}
                >
                  <Gamepad2 className="w-4 h-4 text-amber-500" />
                  <span>শব্দ খোঁজো গেম! 🎮</span>
                </button>
              </div>
            </div>

            {/* Main view screens */}
            {flashcardMode ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/85 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden animate-fade-in"
              >
                {/* Bubble backgrounds */}
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-teal-500/5 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/5 blur-3xl rounded-full"></div>

                {/* SubLevel Indicator & Auto Play controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                    </span>
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">সহজ উপায়ে শব্দ শিক্ষা</span>
                      <span className="text-sm font-black text-slate-200">
                        কার্ড {activeFlashcardIndex + 1} / {selectedLevel.subLevels[activeSubLevelIndex]?.words.length || 0}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Auto-play Button */}
                    <button
                      onClick={() => {
                        playWhooshSound();
                        setFlashcardAutoPlay(!flashcardAutoPlay);
                      }}
                      className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2 border transition-all ${
                        flashcardAutoPlay 
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950' 
                          : 'bg-slate-850 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${flashcardAutoPlay ? 'animate-spin' : ''}`} />
                      <span>{flashcardAutoPlay ? 'অটো-প্লে চলছে (Stop Auto)' : 'অটো-প্লে শুরু করো (Auto Play)'}</span>
                    </button>
                  </div>
                </div>

                {/* Flashcard Body */}
                {(() => {
                  const activeSubLevel = selectedLevel.subLevels[activeSubLevelIndex];
                  if (!activeSubLevel) return <p className="text-slate-400 font-bold">কোনো শব্দ পাওয়া যায়নি।</p>;
                  const currentWordItem = activeSubLevel.words[activeFlashcardIndex];
                  if (!currentWordItem) return <p className="text-slate-400 font-bold">শব্দ লোড হচ্ছে...</p>;

                  const details = getWordDetails(currentWordItem);
                  const stats = wordStats[currentWordItem.word] || { listenedCount: 0, correctCount: 0 };

                  return (
                    <div className="space-y-8">
                      {/* Interactive Card */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-950/40 p-6 sm:p-8 rounded-3xl border border-slate-800/80 relative overflow-hidden">
                        
                        {/* 1. Large Image Frame */}
                        <div className={`relative rounded-2xl overflow-hidden border aspect-[4/3] shadow-2xl group transition-all duration-300 bg-slate-950/80 ${
                          currentlyReadingWord === currentWordItem.word
                            ? 'border-teal-400 ring-4 ring-teal-400/50 scale-[1.01] shadow-teal-500/20'
                            : 'border-slate-800'
                        }`}>
                          <img
                            src={details.imageUrl}
                            alt={currentWordItem.word}
                            className={`w-full h-full object-cover transition-transform duration-700 ${
                              currentlyReadingWord === currentWordItem.word ? 'scale-105' : 'group-hover:scale-105'
                            }`}
                            referrerPolicy="no-referrer"
                          />
                          {currentlyReadingWord === currentWordItem.word && (
                            <div className="absolute inset-0 bg-teal-500/10 pointer-events-none mix-blend-overlay animate-pulse" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                          
                          {/* Top-Right Progress Badges */}
                          <div className="absolute top-3 right-3 flex items-center gap-1.5">
                            {stats.listenedCount > 0 && (
                              <span className="px-2.5 py-1 rounded-lg bg-teal-500/90 text-white text-xs font-black shadow-md flex items-center gap-1">
                                🎧 {stats.listenedCount}
                              </span>
                            )}
                            {stats.correctCount > 0 && (
                              <span className="px-2.5 py-1 rounded-lg bg-amber-500/90 text-slate-950 text-xs font-black shadow-md flex items-center gap-1">
                                ⭐ {stats.correctCount}
                              </span>
                            )}
                            {stats.listenedCount === 0 && stats.correctCount === 0 && (
                              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-400 text-xs font-black border border-slate-800 shadow-md">
                                🆕 নতুন
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 2. Text & Details Panel */}
                        <div className="space-y-6 text-left">
                          {/* Big Spoken Word Header */}
                          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60 pb-5">
                            <div>
                              <h1 className="text-6xl sm:text-7xl font-extrabold text-white tracking-wide vocab-word-text select-all">
                                {currentWordItem.word}
                              </h1>
                              <p className="text-sm font-black text-teal-400 mt-2 block tracking-wider uppercase font-mono">
                                English: {details.englishTerm}
                              </p>
                            </div>

                            {/* Huge Pronounce Speaker button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setCurrentlyReadingWord(currentWordItem.word);
                                speak(currentWordItem.word).finally(() => {
                                  setCurrentlyReadingWord(null);
                                });
                                markAsListened(selectedLevel.level, activeSubLevelIndex, currentWordItem.word);
                              }}
                              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-teal-950/40 cursor-pointer animate-pulse"
                            >
                              <Volume2 className="w-8 h-8" />
                            </motion.button>
                          </div>

                          {/* Details Info List */}
                          <div className="space-y-4">
                            {/* Definition */}
                            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850">
                              <span className="text-[10px] font-black text-slate-500 block mb-1 uppercase tracking-wider">সহজ অর্থ (Meaning)</span>
                              <p className="text-xl font-bold text-amber-400">
                                {details.meaning}
                              </p>
                            </div>

                            {/* Description / Kid definition */}
                            <div>
                              <span className="text-[10px] font-black text-slate-500 block mb-1 uppercase tracking-wider">ছোট্ট বন্ধুদের জন্য ব্যাখ্যা (For Kids)</span>
                              <p className="text-sm text-slate-300 font-semibold leading-relaxed">
                                {details.kidDefinition}
                              </p>
                            </div>

                            {/* Example Sentence */}
                            <div className="bg-slate-900/20 p-4 rounded-2xl border border-slate-850/60 relative pr-10">
                              <span className="text-[10px] font-black text-slate-500 block mb-1.5 uppercase tracking-wider">বাক্য তৈরি (Example Sentence)</span>
                              <p className="text-base font-extrabold text-[#f0f6fc] leading-relaxed">
                                {(() => {
                                  const parts = details.sentence.split(currentWordItem.word);
                                  return (
                                    <>
                                      {parts[0]}
                                      <span className="text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded-md border border-teal-500/20 shadow-sm inline-block">
                                        {currentWordItem.word}
                                      </span>
                                      {parts[1]}
                                    </>
                                  );
                                })()}
                              </p>
                              <button
                                onClick={() => {
                                  setCurrentlyReadingWord(`${currentWordItem.word}_sentence`);
                                  speak(details.sentence).finally(() => {
                                    setCurrentlyReadingWord(null);
                                  });
                                }}
                                className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                                title="বাক্য শোনো"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center justify-between max-w-md mx-auto pt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFlashcardNavigate('prev')}
                          className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-extrabold flex items-center gap-2 shadow-lg"
                        >
                          <ChevronRight className="w-5 h-5 rotate-180" />
                          <span>আগের কার্ড (Prev)</span>
                        </motion.button>

                        <div className="text-center font-black text-slate-400 text-sm">
                          {activeFlashcardIndex + 1} / {activeSubLevel.words.length}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFlashcardNavigate('next')}
                          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-extrabold flex items-center gap-2 shadow-lg shadow-teal-950/20"
                        >
                          <span>পরের কার্ড (Next)</span>
                          <ChevronRight className="w-5 h-5" />
                        </motion.button>
                      </div>

                    </div>
                  );
                })()}
              </motion.div>
            ) : gameMode ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-8 relative overflow-hidden"
              >
                {/* Bubble backgrounds */}
                <div className="absolute top-10 left-10 w-40 h-40 bg-amber-500/5 blur-3xl rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-rose-500/5 blur-3xl rounded-full"></div>

                {/* Score & Quest count */}
                <div className="flex items-center justify-between max-w-md mx-auto bg-slate-850/60 p-4 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-amber-400" />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">স্কোর (Score)</p>
                      <p className="text-xl font-black text-amber-400 mt-1">{gameState.score} পয়েন্ট</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">প্রশ্ন (Question)</p>
                    <p className="text-xl font-black text-slate-300 mt-1"># {gameState.questionCount}</p>
                  </div>
                </div>

                {/* Main Instruction */}
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                    মন দিয়ে শব্দ শুনো এবং সঠিকটি চাপো!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-bold">
                    (Listen carefully to the word and tap the correct option!)
                  </p>
                </div>

                {/* Play Sound Button */}
                <div className="flex justify-center py-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={replayWord}
                    className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-1 shadow-lg shadow-amber-950/30 flex items-center justify-center cursor-pointer group"
                  >
                    <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center text-amber-400 group-hover:text-amber-300 transition-colors">
                      <Volume2 className="w-10 h-10 animate-pulse" />
                      <span className="text-[10px] font-black uppercase mt-1 tracking-wider text-slate-400">শুনো (Listen)</span>
                    </div>
                  </motion.button>
                </div>

                {/* Multi-choice options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-4">
                  {gameState.options.map((opt, i) => {
                    const isSelected = gameState.selectedOption === opt;
                    const isCorrectOption = opt === gameState.currentWord?.word;
                    
                    let buttonStyle = "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-850 hover:border-slate-700";
                    if (gameState.feedback) {
                      if (isCorrectOption) {
                        buttonStyle = "bg-green-600 border-green-400 text-white shadow-lg shadow-green-950/30";
                      } else if (isSelected) {
                        buttonStyle = "bg-red-600 border-red-400 text-white shadow-lg shadow-red-950/30 animate-shake";
                      }
                    }

                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: gameState.feedback ? 1 : 1.03 }}
                        whileTap={{ scale: gameState.feedback ? 1 : 0.97 }}
                        onClick={() => handleOptionSelect(opt)}
                        disabled={gameState.feedback !== null}
                        className={`py-5 px-6 rounded-2xl border-2 text-2xl font-black tracking-wide transition-all duration-250 flex items-center justify-center gap-3 ${buttonStyle}`}
                      >
                        {opt}
                        {gameState.feedback && isCorrectOption && (
                          <Check className="w-6 h-6 text-white stroke-[4]" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Meaning Clue on correct */}
                <AnimatePresence>
                  {gameState.feedback === 'correct' && gameState.currentWord?.meaning && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-green-950/30 border border-green-500/20 max-w-md mx-auto p-3.5 rounded-xl text-green-300 text-xs sm:text-sm font-bold"
                    >
                      💡 অর্থ: <span className="text-white font-extrabold">{gameState.currentWord.meaning}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              // STUDY & READING MODE
              <div className="space-y-6">
                {/* SubLevel Selector Tabs */}
                {selectedLevel.subLevels.length > 1 && (
                  <div className="flex flex-wrap items-center gap-2 bg-slate-900/40 p-2 rounded-2xl border border-slate-800/40">
                    {selectedLevel.subLevels.map((sub, idx) => {
                      const totalSubWords = sub.words.length;
                      const listenedSubWords = sub.words.filter(w => listenedWords[`${selectedLevel.level}_${idx}_${w.word}`]).length;
                      const percent = totalSubWords > 0 ? Math.round((listenedSubWords / totalSubWords) * 100) : 0;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            playWhooshSound();
                            stopReadingAll();
                            setActiveSubLevelIndex(idx);
                          }}
                          className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 ${
                            activeSubLevelIndex === idx 
                              ? 'bg-slate-800 text-white shadow-inner border border-slate-700/50' 
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                          }`}
                        >
                          <span>{sub.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black border transition-all ${
                            percent === 100 
                              ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' 
                              : 'bg-teal-500/10 text-teal-300 border-teal-500/20'
                          }`}>
                            {listenedSubWords}/{totalSubWords}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Main Words Grid & Sound Panel */}
                <div className="bg-slate-900/30 border border-slate-800/50 rounded-3xl p-6 space-y-6">
                  {/* Action row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-5">
                    <div>
                      <h3 className="text-lg font-black text-slate-200">
                        {selectedLevel.subLevels[activeSubLevelIndex]?.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-bold mt-1">
                        নিচের শব্দগুলোতে ক্লিক করে চমৎকার উচ্চারণ ও বানান অনুশীলন করো।
                      </p>
                    </div>

                    {/* Read All Speaker Button */}
                    <button
                      onClick={() => startReadingAll(getSortedWords())}
                      className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 transition-all shadow-md border ${
                        isReadingAll 
                          ? 'bg-red-500/10 border-red-500/30 text-red-300' 
                          : 'bg-teal-500 border-teal-400 text-slate-950 font-black shadow-teal-950/20 hover:bg-teal-400'
                      }`}
                    >
                      {isReadingAll ? (
                        <>
                          <VolumeX className="w-5 h-5 animate-pulse" />
                          <span>পড়া থামাও (Stop)</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-5 h-5" />
                          <span>সশব্দে সব পড়ো (Read All)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Active SubLevel Progress Tracker */}
                  {(() => {
                    const activeSubLevel = selectedLevel.subLevels[activeSubLevelIndex];
                    if (!activeSubLevel) return null;
                    const totalSubWords = activeSubLevel.words.length;
                    const listenedSubWords = activeSubLevel.words.filter(w => listenedWords[`${selectedLevel.level}_${activeSubLevelIndex}_${w.word}`]).length;
                    const subPercent = totalSubWords > 0 ? Math.round((listenedSubWords / totalSubWords) * 100) : 0;
                    return (
                      <div className="bg-slate-950/20 p-4 rounded-2xl border border-slate-800/40 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-bold text-slate-300">
                          <span className="flex items-center gap-1.5">
                            📚 বর্তমান অংশের অগ্রগতি (Part Learning Progress):
                          </span>
                          <span className="text-teal-400 font-black">
                            {listenedSubWords} / {totalSubWords} শব্দ পড়া হয়েছে
                          </span>
                        </div>
                        <div className="w-full h-3 bg-slate-950/85 rounded-full overflow-hidden p-[1px] border border-slate-800/80">
                          <motion.div 
                            className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500 transition-all duration-500"
                            style={{ width: `${subPercent}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${subPercent}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                          <span>{subPercent}% সম্পন্ন</span>
                          {subPercent === 100 ? (
                            <span className="text-amber-400 flex items-center gap-1 animate-bounce font-black">🏆 অসাধারণ! এই অংশটি সব পড়া শেষ! 🎉</span>
                          ) : (
                            <span>সবগুলো শব্দ শুনে ১০০% পূর্ণ করো! ⭐</span>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Kids-friendly Sorting & Search Filter Controls */}
                  <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-4">
                    {/* Search Field */}
                    <div className="relative w-full lg:max-w-xs shrink-0">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-teal-400" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          stopReadingAll();
                          setSearchQuery(e.target.value);
                        }}
                        placeholder="শব্দ বা অর্থ খুঁজুন... (e.g. বই)"
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-900/90 border border-slate-800/80 focus:border-teal-500 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all shadow-inner"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            stopReadingAll();
                          }}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 text-xs font-black transition-colors"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Drop-down menu for Sorting */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end">
                      <label htmlFor="vocab-sort-select" className="text-xs font-black text-slate-400 flex items-center gap-1.5 shrink-0 mr-1 uppercase tracking-wider">
                        <ArrowUpDown className="w-3.5 h-3.5 text-teal-400 font-black animate-pulse" /> সাজাও (Sort By):
                      </label>
                      
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        {/* Visual Filter Funnel Icon */}
                        <div className="p-2.5 bg-slate-900/90 border border-slate-800/80 text-teal-400 rounded-xl flex items-center justify-center shadow-md shrink-0 hover:text-teal-300 transition-colors" title="সাজানোর ফিল্টার (Sort Filter)">
                          <Filter className="w-4 h-4 animate-pulse" />
                        </div>

                        <div className="relative flex-1 sm:w-56">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-teal-400">
                            <SlidersHorizontal className="w-4 h-4 animate-bounce" style={{ animationDuration: '3s' }} />
                          </div>
                          <select
                            id="vocab-sort-select"
                            value={sortBy}
                            onChange={(e) => {
                              playWhooshSound();
                              stopReadingAll();
                              setSortBy(e.target.value as any);
                            }}
                            className="w-full bg-slate-900/95 border border-slate-800/80 hover:border-teal-500/50 focus:border-teal-500 rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm font-extrabold text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all shadow-md appearance-none cursor-pointer"
                          >
                            <option value="default" className="bg-slate-950 text-slate-300 font-extrabold">📖 সাধারণ ক্রম (Default)</option>
                            <option value="difficulty" className="bg-slate-950 text-slate-300 font-extrabold">⚡ কঠিনতা (Difficulty Level)</option>
                            <option value="length" className="bg-slate-950 text-slate-300 font-extrabold">📐 শব্দের দৈর্ঘ্য (Word Length)</option>
                            <option value="alphabetical" className="bg-slate-950 text-slate-300 font-extrabold">🔤 ক-খ ক্রমানুসার (Alphabetical)</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-teal-400">
                            <span className="text-xs">▼</span>
                          </div>
                        </div>
                      </div>

                      {/* Direction Switcher (Ascending/Descending) */}
                      <button
                        onClick={() => {
                          playWhooshSound();
                          stopReadingAll();
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        }}
                        className="px-3.5 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-black transition-all hover:border-slate-700 flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                        title={sortOrder === 'asc' ? 'ছোট থেকে বড় / ক থেকে হ' : 'বড় থেকে ছোট / হ থেকে ক'}
                      >
                        {sortOrder === 'asc' ? (
                          <>
                            <span className="text-teal-400 text-sm">⬆️</span>
                            <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">আরোহী</span>
                          </>
                        ) : (
                          <>
                            <span className="text-teal-400 text-sm">⬇️</span>
                            <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">অবরোহী</span>
                          </>
                        )}
                      </button>

                      {/* Reset Sorting Criteria Button */}
                      {(sortBy !== 'default' || sortOrder !== 'asc') && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          onClick={() => {
                            playWhooshSound();
                            stopReadingAll();
                            setSortBy('default');
                            setSortOrder('asc');
                          }}
                          className="px-3.5 py-2.5 bg-rose-950/40 border border-rose-900/50 hover:border-rose-500/50 text-rose-300 hover:text-rose-100 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                          title="সাজানোর নিয়ম মুছে ফেলুন (Reset sorting)"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                          <span>রিসেট (Reset)</span>
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Word Cards Grid */}
                  {getSortedWords().length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12 px-6 bg-slate-950/40 rounded-3xl border border-dashed border-slate-800 flex flex-col items-center justify-center gap-3.5"
                    >
                      <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 text-slate-400 text-2xl">
                        🔍
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-300">কোনো শব্দ খুঁজে পাওয়া যায়নি!</h4>
                        <p className="text-xs text-slate-500 font-bold mt-1 max-w-sm mx-auto leading-relaxed">
                          আপনার টাইপ করা শব্দ বা অর্থের সাথে মিল রয়েছে এমন কোনো শব্দ নেই। দয়া করে অন্য বানান চেষ্টা করুন।
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          playWhooshSound();
                          setSearchQuery('');
                        }}
                        className="px-4 py-1.5 bg-slate-800 border border-slate-700 text-xs font-extrabold text-slate-300 hover:text-white rounded-lg transition-all active:scale-95"
                      >
                        খোঁজা বাতিল করুন
                      </button>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {getSortedWords().map((item, idx) => {
                        const isReadingThis = currentlyReadingWord === item.word;
                        const details = getWordDetails(item);
                        const wordSentence = generatedSentenceData[item.word]?.sentence || details.sentence;
                        const isFlipped = !!flippedWords[item.word];
                        return (
                          <div
                            key={item.word}
                            className="perspective-1000 w-full"
                            style={{ height: '250px' }}
                          >
                            <motion.div
                              layout
                              animate={{ rotateX: isFlipped ? 180 : 0 }}
                              whileHover={{ y: -5, scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 220, damping: 22 }}
                              className="w-full h-full relative transform-style-3d"
                            >
                              {/* Front Face */}
                              <div
                                onClick={() => handleCardClick(item.word)}
                                className={`absolute inset-0 backface-hidden flex flex-col items-center text-center justify-between p-4 pb-5 rounded-2xl border cursor-pointer shadow-xl vocab-glass-card word-card ${
                                  isReadingThis 
                                    ? 'bg-gradient-to-b from-teal-500/30 to-emerald-500/30 border-teal-400 shadow-teal-950/40 scale-105 is-reading' 
                                    : 'bg-slate-950/45 border-slate-800/80 hover:bg-slate-900/35 hover:border-slate-700/80'
                                }`}
                              >
                                {/* Glow halo backdrop effect */}
                                <div className="vocab-card-glow" />

                                {/* Shimmer light sweep flare effect */}
                                <div className="vocab-shimmer-sweep" />

                                {/* Dynamic pulsing wave animation overlay */}
                                {isReadingThis && (
                                  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-teal-500/10 animate-pulse" />
                                    <span className="absolute inset-0 rounded-2xl border border-teal-400/40 animate-ping opacity-75" style={{ animationDuration: '1.5s' }} />
                                    <span className="absolute inset-0 rounded-2xl border border-teal-400/20 animate-ping opacity-40" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                                  </div>
                                )}

                                {/* Interactive Sparkles Floating on Hover */}
                                <span className="hover-sparkle absolute top-2.5 right-4 text-xs select-none">✨</span>
                                <span className="hover-sparkle absolute bottom-2.5 left-4 text-[10px] select-none text-amber-400">⭐</span>

                                {/* Sequential Badge number */}
                                <span className="absolute top-2 left-2 text-[10px] font-black text-slate-500 group-hover:text-slate-400">
                                  {idx + 1}
                                </span>

                                {/* Sound wave effect or dynamic complexity/length badge */}
                                {isReadingThis ? (
                                    <div className="absolute top-2 right-2 flex items-center gap-0.5">
                                      <span className="w-1 h-3 bg-teal-400 rounded-full animate-audio-bar-1"></span>
                                      <span className="w-1 h-4 bg-teal-400 rounded-full animate-audio-bar-2"></span>
                                      <span className="w-1 h-3 bg-teal-400 rounded-full animate-audio-bar-3"></span>
                                    </div>
                                ) : (
                                  <>
                                    {sortBy === 'difficulty' && (
                                      <span className={`absolute top-2 right-2 px-1.5 py-0.5 border rounded text-[9px] font-black tracking-wide ${getDifficultyLabel(item.word).color}`}>
                                        {getDifficultyLabel(item.word).label}
                                      </span>
                                    )}
                                    {sortBy === 'length' && (
                                      <span className="absolute top-2 right-2 px-1.5 py-0.5 border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 rounded text-[9px] font-black tracking-wide">
                                        {item.word.length}টি বর্ণ
                                      </span>
                                    )}
                                  </>
                                )}

                                {/* Main Bangla Word & Visual Learning Thumbnail */}
                                <div className="flex-1 flex flex-col items-center justify-center gap-2 mt-4">
                                  {/* Visual Learning Thumbnail */}
                                  <div 
                                    className={`relative w-20 h-20 rounded-xl overflow-hidden border transition-all duration-300 shadow-md ${
                                      isReadingThis 
                                        ? 'border-teal-400 ring-4 ring-teal-400/50 scale-110 shadow-teal-500/30' 
                                        : 'border-slate-800/80 hover:border-slate-600'
                                    }`}
                                  >
                                    <img
                                      src={details.imageUrl}
                                      alt={item.word}
                                      className={`w-full h-full object-cover transition-transform duration-500 ${
                                        isReadingThis ? 'scale-110' : 'scale-100'
                                      }`}
                                      referrerPolicy="no-referrer"
                                    />
                                    {isReadingThis && (
                                      <div className="absolute inset-0 bg-teal-500/10 mix-blend-overlay animate-pulse" />
                                    )}
                                  </div>

                                  {/* Learning Progress Indicator */}
                                  <div className="flex items-center justify-center gap-1.5 mt-0.5">
                                    {(wordStats[item.word]?.listenedCount || 0) > 0 && (
                                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[9px] font-black" title="কতবার শুনেছ">
                                        🎧 {wordStats[item.word].listenedCount}
                                      </span>
                                    )}
                                    {(wordStats[item.word]?.correctCount || 0) > 0 && (
                                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[9px] font-black" title="কতবার সঠিক বলেছ">
                                        ⭐ {wordStats[item.word].correctCount}
                                      </span>
                                    )}
                                    {!(wordStats[item.word]?.listenedCount) && !(wordStats[item.word]?.correctCount) && (
                                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-slate-800/50 text-slate-400 text-[9px] font-bold">
                                        🆕 নতুন
                                      </span>
                                    )}
                                  </div>

                                  <span className={`text-3xl sm:text-4xl font-extrabold tracking-wide vocab-word-text inline-block transition-transform ${isReadingThis ? 'text-teal-300 scale-105' : 'text-white'}`}>
                                    {item.word}
                                  </span>
                                </div>

                                {/* Bottom Action Row with Flip and Speak */}
                                <div className="flex items-center justify-between w-full mt-2 pt-2 border-t border-slate-800/40 z-10 gap-2">
                                  <div className="flex-1 text-[10px] font-black text-teal-400/80 bg-teal-500/5 border border-teal-500/10 px-2 py-1 rounded-lg select-none hover:text-teal-300 transition-all text-center">
                                    অর্থ জানতে চাপুন 👆
                                  </div>
                                  <button
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      playSuccessSound();
                                      setCurrentlyReadingWord(item.word);
                                      await speak(item.word);
                                      setCurrentlyReadingWord(null);
                                    }}
                                    className="p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/25 hover:bg-teal-500/20 hover:border-teal-400/40 text-teal-300 hover:text-teal-200 transition-all active:scale-95 cursor-pointer flex items-center justify-center shrink-0"
                                    title="উচ্চারণ শুনুন (Speak)"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Back Face */}
                              <div
                                onClick={() => toggleWordFlip(item.word)}
                                className={`group absolute inset-0 backface-hidden flex flex-col justify-between p-4 pb-4 rounded-2xl border cursor-pointer shadow-lg bg-slate-950 border-slate-800/90 shadow-slate-950/80 word-card ${
                                  isReadingThis ? 'border-teal-500/60 shadow-teal-950/40 is-reading' : ''
                                }`}
                                style={{ transform: 'rotateX(180deg)' }}
                              >
                                {/* Back background subtle tint */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-teal-950/20 rounded-2xl -z-10" />

                                {/* Dynamic pulsing wave animation overlay */}
                                {isReadingThis && (
                                  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-teal-500/10 animate-pulse" />
                                    <span className="absolute inset-0 rounded-2xl border border-teal-400/30 animate-ping opacity-60" style={{ animationDuration: '1.5s' }} />
                                    <span className="absolute inset-0 rounded-2xl border border-teal-400/10 animate-ping opacity-30" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                                  </div>
                                )}

                                {/* Floating sparkles for kid friendly feel */}
                                <span className="absolute top-2 right-3 text-[10px] select-none text-teal-400">✨</span>

                                {/* Header: Pronunciation & Word Name */}
                                <div className="flex justify-between items-center w-full pb-1 border-b border-slate-800/40">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-black text-teal-400">
                                      {item.word}
                                    </span>
                                    {(wordStats[item.word]?.listenedCount || 0) > 0 && (
                                      <span className="text-[8px] text-teal-300 bg-teal-500/10 px-1 rounded" title="শোনার সংখ্যা">
                                        🎧 {wordStats[item.word].listenedCount}
                                      </span>
                                    )}
                                    {(wordStats[item.word]?.correctCount || 0) > 0 && (
                                      <span className="text-[8px] text-amber-300 bg-amber-500/10 px-1 rounded" title="সঠিক উত্তরের সংখ্যা">
                                        ⭐ {wordStats[item.word].correctCount}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[9px] font-extrabold text-slate-500">
                                    শব্দের অর্থ (Meaning)
                                  </span>
                                </div>

                                {/* Meaning or breakdown */}
                                <div className="flex-1 flex flex-col justify-center py-1.5">
                                  {item.breakdown ? (
                                    <div className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-black rounded-lg text-center leading-tight">
                                      {item.breakdown}
                                    </div>
                                  ) : (
                                    item.meaning && (
                                      <p className="text-[11px] text-slate-200 font-extrabold leading-snug text-center">
                                        {item.meaning}
                                      </p>
                                    )
                                  )}
                                </div>

                                {/* Kid friendly example sentence */}
                                <div className="bg-slate-950/60 px-2 py-1.5 rounded-xl border border-slate-800/30 mb-2 transition-all duration-300 transform group-hover:scale-105 group-hover:border-teal-500/30 group-hover:bg-teal-950/45 shadow-sm group-hover:shadow-teal-950/50">
                                  <p className="text-[9px] leading-relaxed text-emerald-300/90 font-black italic text-center leading-snug transition-colors duration-300 group-hover:text-emerald-200">
                                    💬 "{wordSentence}"
                                  </p>
                                </div>

                                {/* Interactive Action Buttons at the Bottom */}
                                <div className="flex items-center justify-between gap-1 w-full pt-1.5 border-t border-slate-800/30">
                                  {/* Speak pronunciation */}
                                  <button
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      playSuccessSound();
                                      setCurrentlyReadingWord(item.word);
                                      await speak(item.word);
                                      setCurrentlyReadingWord(null);
                                    }}
                                    className="p-1 px-1.5 rounded-lg bg-teal-500/10 border border-teal-500/25 hover:bg-teal-500/20 text-teal-300 text-[9px] font-black flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                                  >
                                    <Volume2 className="w-3 h-3" />
                                    <span>শুনুন</span>
                                  </button>

                                  {/* More details */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedWordForModal(item);
                                      playSuccessSound();
                                    }}
                                    className="p-1 px-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-[9px] font-black flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                                  >
                                    <Info className="w-3 h-3 text-slate-400" />
                                    <span>বিস্তারিত</span>
                                  </button>

                                  {/* Flip back */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      playWhooshSound();
                                      toggleWordFlip(item.word);
                                    }}
                                    className="p-1 px-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-200 text-[9px] font-black flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                    <span>উল্টাও</span>
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Word Detail Modal */}
      <AnimatePresence>
        {selectedWordForModal && (() => {
          const details = getWordDetails(selectedWordForModal);
          const dynamicBreakdown = getDynamicBreakdown(selectedWordForModal);
          const isReadingThis = currentlyReadingWord === selectedWordForModal.word;
          
          const generated = generatedSentenceData[selectedWordForModal.word];
          const sentence = generated?.sentence || details.sentence;
          const kidDefinition = generated?.kidDefinition || details.kidDefinition;
          const synonyms = generated?.synonyms || details.synonyms;
          const antonyms = generated?.antonyms || details.antonyms;
          const isReadingSentence = currentlyReadingWord === `${selectedWordForModal.word}_sentence`;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
              onClick={() => setSelectedWordForModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header Decoration Line */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-indigo-500 z-10" />

                {/* Close Button */}
                <button
                  onClick={() => {
                    playWhooshSound();
                    setSelectedWordForModal(null);
                  }}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/60 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Content - Scrollable */}
                <div className="p-6 overflow-y-auto space-y-6 pt-8 scrollbar-thin">
                  {/* Word Header */}
                  <div className="text-center space-y-2">
                    <span className="text-[10px] uppercase font-black tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full inline-block">
                      শব্দ পরিচিতি (Word Introduction)
                    </span>
                    <h3 className="text-5xl sm:text-6xl font-black text-white tracking-wide mt-2 drop-shadow-lg text-center select-text">
                      {selectedWordForModal.word}
                    </h3>
                    
                    {/* Spelling Breakdown */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950/50 rounded-xl border border-slate-800/60 text-xs text-slate-400 font-bold">
                      <span className="text-teal-400 text-[10px]">✏️ বানান বিশ্লেষণ:</span>
                      <span className="font-mono text-slate-300">{dynamicBreakdown}</span>
                    </div>
                  </div>

                  {/* Main Illustration Image */}
                  <div className={`relative rounded-2xl overflow-hidden border bg-slate-950/40 aspect-[4/3] group shadow-inner transition-all duration-350 ${
                    isReadingThis 
                      ? 'border-teal-400 ring-4 ring-teal-400/50 shadow-2xl shadow-teal-500/20 scale-[1.01]' 
                      : 'border-slate-800'
                  }`}>
                    <img
                      src={details.imageUrl}
                      alt={details.word}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isReadingThis ? 'scale-105' : 'group-hover:scale-105'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    {/* Light sweep gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Glowing highlight overlay when spoken */}
                    {isReadingThis && (
                      <div className="absolute inset-0 bg-teal-500/10 pointer-events-none mix-blend-overlay animate-pulse" />
                    )}

                    {/* Image zoom lightbox trigger button */}
                    <button
                      onClick={() => {
                        playWhooshSound();
                        setLightboxImage(details.imageUrl);
                      }}
                      className="absolute bottom-3 right-3 px-3 py-2 bg-slate-950/80 border border-slate-800 hover:border-slate-700/50 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-teal-400" />
                      <span>বড় করে দেখো (Full Screen)</span>
                    </button>

                    {/* Kid friendly badge */}
                    <div className="absolute top-3 left-3 bg-teal-500/20 backdrop-blur-md border border-teal-500/30 text-teal-300 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 animate-pulse" />
                      <span>মিষ্টি ছবি</span>
                    </div>
                  </div>

                  {/* Interactive Pronunciation Section */}
                  <div className="bg-gradient-to-r from-teal-500/10 to-indigo-500/10 rounded-2xl border border-teal-500/20 p-4 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-teal-400">উচ্চারণ শুনতে চাও? (Listen Here)</p>
                      <p className="text-[11px] font-bold text-slate-400">এই শব্দটির সঠিক উচ্চারণ শুনতে স্পীকার বোতামটিতে চাপো!</p>
                    </div>
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        playSuccessSound();
                        setCurrentlyReadingWord(selectedWordForModal.word);
                        await speak(selectedWordForModal.word);
                        setCurrentlyReadingWord(null);
                      }}
                      className={`relative w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 shadow-lg active:scale-95 cursor-pointer shrink-0 ${
                        isReadingThis 
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-400 border-teal-300 text-white animate-pulse'
                          : 'bg-slate-950 hover:bg-slate-900 border-slate-800 hover:border-teal-500/50 text-teal-400 hover:text-teal-300'
                      }`}
                    >
                      {isReadingThis ? (
                        <div className="flex items-center gap-0.5">
                          <span className="w-1 h-3 bg-white rounded-full animate-audio-bar-1"></span>
                          <span className="w-1 h-4 bg-white rounded-full animate-audio-bar-2"></span>
                          <span className="w-1 h-3 bg-white rounded-full animate-audio-bar-3"></span>
                        </div>
                      ) : (
                        <Volume2 className="w-6 h-6 animate-bounce" style={{ animationDuration: '2s' }} />
                      )}
                    </button>
                  </div>

                  {/* Meaning & Definition */}
                  <div className="space-y-3.5">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">সহজ অর্থ (Simple Meaning):</span>
                      <p className="text-sm font-extrabold text-slate-200 bg-slate-950/40 px-3.5 py-2.5 rounded-xl border border-slate-800/40 leading-relaxed">
                        📖 {details.meaning} {details.englishTerm && <span className="text-xs text-slate-500 font-mono">({details.englishTerm})</span>}
                      </p>
                    </div>

                    {/* Kid-friendly elaborate description */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">শিশুদের জন্য সহজ ব্যাখ্যা (Child-friendly Explanation):</span>
                        {isGenerating && (
                          <span className="text-[9px] font-extrabold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                            <Sparkles className="w-2.5 h-2.5" /> এআই তৈরি করছে...
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-300 bg-slate-950/20 px-3.5 py-3 rounded-xl border border-slate-800/30 leading-relaxed">
                        💡 {kidDefinition}
                      </p>
                    </div>
                  </div>

                  {/* Synonyms & Antonyms Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Synonyms */}
                    <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60 space-y-2">
                      <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest flex items-center gap-1">
                        🤝 সমার্থক শব্দ (Same Meaning):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {synonyms.map((s, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-teal-500/5 border border-teal-500/10 text-teal-300 text-xs font-black">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Antonyms */}
                    <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60 space-y-2">
                      <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-1">
                        ⚔️ বিপরীত শব্দ (Opposite Meaning):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {antonyms.map((a, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-500/5 border border-rose-500/10 text-rose-300 text-xs font-black">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Example Sentence */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">বাক্য গঠন (Example Sentence):</span>
                      {isGenerating && (
                        <span className="text-[9px] font-extrabold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                          <Sparkles className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '3s' }} /> এআই সুন্দর বাক্য সাজাচ্ছে...
                        </span>
                      )}
                    </div>
                    <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/60 text-center relative overflow-hidden group">
                      <div className="absolute top-1 left-2 text-2xl text-slate-800 font-serif">“</div>
                      <p className="text-sm font-extrabold text-teal-300 italic px-2 z-10 relative leading-relaxed">
                        {sentence}
                      </p>
                      <div className="absolute bottom-1 right-2 text-2xl text-slate-800 font-serif">”</div>
                      
                      {/* Speak Sentence Button */}
                      <div className="mt-3.5 flex justify-center">
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            playSuccessSound();
                            setCurrentlyReadingWord(`${selectedWordForModal.word}_sentence`);
                            await speak(sentence);
                            setCurrentlyReadingWord(null);
                          }}
                          className={`px-3 py-1.5 rounded-xl border text-[10px] font-black flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                            isReadingSentence
                              ? 'bg-gradient-to-r from-teal-500 to-emerald-400 border-teal-300 text-white animate-pulse'
                              : 'bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-teal-500/40 text-teal-400 hover:text-teal-300'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>বাক্যটি শুনুন (Listen Sentence)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Challenge Section */}
                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 text-center space-y-1.5">
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1">
                      ⭐ খুদে বন্ধুদের চ্যালেঞ্জ! (Quick Trivia Challenge)
                    </span>
                    <p className="text-xs font-bold text-slate-300">
                      {selectedWordForModal.word === "ফল" ? "তুমি আজ কী ফল খেয়েছ বল তো? 🍎" :
                       selectedWordForModal.word === "জল" ? "জল অপচয় করা কিন্তু একদম ভালো নয়! তুমি কী বলো? 💧" :
                       selectedWordForModal.word === "কলম" ? "তোমার পছন্দের কলম বা পেন্সিলের রঙ কী? ✏️" :
                       selectedWordForModal.word === "আকাশ" || selectedWordForModal.word === "গগন" ? "আজ আকাশ কি মেঘলা নাকি রোদ উজ্জ্বল? ☀️" :
                       `তুমি কি তোমার খাতায় '${selectedWordForModal.word}' শব্দটি সুন্দর করে লিখতে পারবে? ✍️`}
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-slate-950/40 border-t border-slate-800/50 flex justify-end gap-3 shrink-0">
                  <button
                    onClick={() => {
                      playWhooshSound();
                      setSelectedWordForModal(null);
                    }}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-black transition-all shadow active:scale-95 cursor-pointer"
                  >
                    বন্ধ করো ❌
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Full screen Lightbox Image View */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => {
                playWhooshSound();
                setLightboxImage(null);
              }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer shadow-lg z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full h-full max-h-[80vh] flex items-center justify-center rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt="Full screen example"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-slate-800"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
