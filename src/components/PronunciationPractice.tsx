import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './Icon';

interface PronunciationItem {
  text: string;
  transliteration?: string;
  translation?: string;
  category: 'alphabet' | 'words' | 'joint' | 'sentences';
  difficulty?: 'সহজ' | 'মাঝারি' | 'কঠিন';
}

const DEFAULT_PRACTICE_ITEMS: PronunciationItem[] = [
  // Vowels and Consonants
  { text: 'অ', transliteration: 'O', translation: 'First vowel of Bengali', category: 'alphabet', difficulty: 'সহজ' },
  { text: 'আ', transliteration: 'Aa', translation: 'Second vowel of Bengali', category: 'alphabet', difficulty: 'সহজ' },
  { text: 'ক', transliteration: 'Ko', translation: 'First consonant', category: 'alphabet', difficulty: 'সহজ' },
  { text: 'খ', transliteration: 'Kho', translation: 'Second consonant', category: 'alphabet', difficulty: 'সহজ' },
  { text: 'ঋ', transliteration: 'Ri', translation: 'Vocalic r', category: 'alphabet', difficulty: 'মাঝারি' },
  { text: 'ঞ', transliteration: 'Nyo', translation: 'Nasal sound', category: 'alphabet', difficulty: 'কঠিন' },
  { text: 'ঙ', transliteration: 'Ngo', translation: 'Velar nasal consonant', category: 'alphabet', difficulty: 'কঠিন' },

  // Simple Words
  { text: 'আম', transliteration: 'Aam', translation: 'Mango', category: 'words', difficulty: 'সহজ' },
  { text: 'ইলিশ', transliteration: 'Ilish', translation: 'Hilsa Fish (National Fish)', category: 'words', difficulty: 'সহজ' },
  { text: 'সোনার বাংলা', transliteration: 'Shonar Bangla', translation: 'Golden Bengal', category: 'words', difficulty: 'মাঝারি' },
  { text: 'স্বাগতম', transliteration: 'Shagotom', translation: 'Welcome', category: 'words', difficulty: 'মাঝারি' },
  { text: 'ধন্যবাদ', transliteration: 'Dhonnobad', translation: 'Thank you', category: 'words', difficulty: 'সহজ' },
  { text: 'বিদ্যালয়', transliteration: 'Biddaloy', translation: 'School', category: 'words', difficulty: 'কঠিন' },

  // Joint Letters / Conjuncts
  { text: 'পরীক্ষা', transliteration: 'Porikkha', translation: 'Exam', category: 'joint', difficulty: 'কঠিন' },
  { text: 'বিজ্ঞান', transliteration: 'Biggan', translation: 'Science', category: 'joint', difficulty: 'কঠিন' },
  { text: 'পৃষ্ঠা', transliteration: 'Prishtha', translation: 'Page', category: 'joint', difficulty: 'মাঝারি' },
  { text: 'কষ্ট', transliteration: 'Koshto', translation: 'Trouble/Pain', category: 'joint', difficulty: 'সহজ' },
  { text: 'ব্রাহ্মণ', transliteration: 'Bramhon', translation: 'Brahmin', category: 'joint', difficulty: 'কঠিন' },
  { text: 'উজ্জ্বল', transliteration: 'Ujjol', translation: 'Bright', category: 'joint', difficulty: 'মাঝারি' },

  // Sentences
  { text: 'আমি বাংলায় গান গাই', transliteration: 'Aami Banglay gaan gai', translation: 'I sing songs in Bengali', category: 'sentences', difficulty: 'সহজ' },
  { text: 'আমাদের দেশ বাংলাদেশ', transliteration: 'Aamader desh Bangladesh', translation: 'Our country is Bangladesh', category: 'sentences', difficulty: 'সহজ' },
  { text: 'ভাষা শহীদদের প্রতি বিনম্র শ্রদ্ধা', transliteration: 'Bhasha shohidder proti binomro shrodha', translation: 'Humble respects to language martyrs', category: 'sentences', difficulty: 'কঠিন' },
  { text: 'মেঘে মেঘে অনেক বেলা হলো', transliteration: 'Meghe meghe onek bela holo', translation: 'Time has passed by quietly', category: 'sentences', difficulty: 'মাঝারি' },
  { text: 'শিক্ষাই জাতির মেরুদণ্ড', transliteration: 'Shikkha-i jatir merudondo', translation: 'Education is the backbone of a nation', category: 'sentences', difficulty: 'কঠিন' }
];

function normalizeBangla(text: string): string {
  return text
    .replace(/[^\u0980-\u09FF]/g, '') // Keep only Bengali range
    .trim();
}

function getSimilarityRatio(str1: string, str2: string): number {
  const s1 = normalizeBangla(str1);
  const s2 = normalizeBangla(str2);
  if (!s1 || !s2) return 0;
  if (s1 === s2) return 100;
  
  // Calculate Levenshtein Distance
  const track = Array(s2.length + 1).fill(null).map(() =>
    Array(s1.length + 1).fill(null));
  for (let i = 0; i <= s1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= s2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  const distance = track[s2.length][s1.length];
  const maxLength = Math.max(s1.length, s2.length);
  return Math.round(((maxLength - distance) / maxLength) * 100);
}

const playSoundFeedback = (success: boolean) => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (success) {
      // Pleasant high-pitch double-chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.35); // C6
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc2.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.35); // E6
      
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.4);
      osc2.stop(ctx.currentTime + 0.4);
    } else {
      // Soft gentle reminder sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc.frequency.linearRampToValueAtTime(165, ctx.currentTime + 0.3); // E3
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (err) {
    console.warn('Audio Context feedback failed:', err);
  }
};

interface Props {
  speak: (text: string) => Promise<void>;
}

export const PronunciationPractice: React.FC<Props> = ({ speak }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'alphabet' | 'words' | 'joint' | 'sentences'>('all');
  const [practiceList, setPracticeList] = useState<PronunciationItem[]>(DEFAULT_PRACTICE_ITEMS);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [recognitionError, setRecognitionError] = useState('');
  const [customWord, setCustomWord] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  const recognitionRef = useRef<any>(null);

  const filteredItems = selectedCategory === 'all' 
    ? practiceList 
    : practiceList.filter(item => item.category === selectedCategory);

  const currentItem = filteredItems[currentItemIndex] || filteredItems[0] || null;

  useEffect(() => {
    // Reset output when item changes
    setTranscript('');
    setAccuracy(null);
    setFeedbackMsg('');
    setRecognitionError('');
  }, [currentItemIndex, selectedCategory, isCustomMode]);

  // Handle Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = 'bn-BD'; // Bengali (Bangladesh)
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setIsListening(true);
        setRecognitionError('');
        setTranscript('শুনছি, অনুগ্রহ করে বলুন...');
      };

      rec.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        
        const target = isCustomMode ? customWord : currentItem?.text;
        if (target) {
          const score = getSimilarityRatio(target, text);
          setAccuracy(score);
          
          if (score >= 80) {
            playSoundFeedback(true);
            setFeedbackMsg(score === 100 ? 'অসাধারণ! একদম নিখুঁত উচ্চারণ! 🌟' : 'দারুণ উচ্চারণ হয়েছে! সাবাশ! 👍');
          } else if (score >= 50) {
            playSoundFeedback(false);
            setFeedbackMsg('বেশ ভালো হয়েছে, আরেকটু স্পষ্ট করে চেষ্টা করুন! 🔄');
          } else {
            playSoundFeedback(false);
            setFeedbackMsg('আবার চেষ্টা করুন, উচ্চারণ স্পষ্ট রাখুন! 💪');
          }
        }
      };

      rec.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'no-speech') {
          setRecognitionError('কোনো আওয়াজ পাওয়া যায়নি। দয়া করে মাইক্রোফোনে কথা বলুন।');
        } else if (event.error === 'not-allowed') {
          setRecognitionError('মাইক্রোফোন ব্যবহারের অনুমতি দেওয়া নেই। ব্রাউজার সেটিং চেক করুন।');
        } else {
          setRecognitionError(`মাইক্রোফোন ত্রুটি: ${event.error}`);
        }
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    } else {
      setRecognitionError('আপনার ব্রাউজারটি স্পিচ রিকগনিশন সমর্থন করে না। গুগল ক্রোম ব্যবহার করুন।');
    }
  }, [currentItem, isCustomMode, customWord]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setRecognitionError('স্পিচ রিকগনিশন ইঞ্জিন লোড করা যায়নি।');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      setAccuracy(null);
      setFeedbackMsg('');
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Failed to start recognition:', err);
      }
    }
  };

  const playTargetSound = () => {
    const text = isCustomMode ? customWord : currentItem?.text;
    if (text) {
      speak(text);
    }
  };

  const handleNext = () => {
    if (filteredItems.length > 0) {
      setCurrentItemIndex((prev) => (prev + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (filteredItems.length > 0) {
      setCurrentItemIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleAddCustomWord = () => {
    if (!customWord.trim()) return;
    setIsCustomMode(true);
    setTranscript('');
    setAccuracy(null);
    setFeedbackMsg('');
    speak(`অনুশীলনের জন্য প্রস্তুত: ${customWord}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {[
          { id: 'all', label: 'সবগুলো 🌟', icon: 'Sparkles' },
          { id: 'alphabet', label: 'বর্ণমালা 🔠', icon: 'Grid' },
          { id: 'words', label: 'সহজ শব্দ 📖', icon: 'BookOpen' },
          { id: 'joint', label: 'যুক্তাক্ষর 🧩', icon: 'Zap' },
          { id: 'sentences', label: 'ছোট বাক্য 💬', icon: 'Volume2' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedCategory(tab.id as any);
              setCurrentItemIndex(0);
              setIsCustomMode(false);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm border transition-all cursor-pointer ${
              !isCustomMode && selectedCategory === tab.id
                ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white border-transparent shadow-lg shadow-fuchsia-950/25'
                : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
            }`}
          >
            <Icon name={tab.icon as any} className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}

        <button
          onClick={() => {
            setIsCustomMode(true);
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm border transition-all cursor-pointer ${
            isCustomMode
              ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white border-transparent shadow-lg'
              : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
          }`}
        >
          <Icon name="Plus" className="w-4 h-4" />
          <span>নিজের শব্দ লিখুন ✍️</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Practice Card & Controls */}
        <div className="md:col-span-2 space-y-6">
          <motion.div
            layout
            className="bg-[#11161d] border border-[#30363d] rounded-[2rem] p-6 sm:p-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Custom Input Mode */}
            {isCustomMode ? (
              <div className="space-y-4 mb-6">
                <span className="text-emerald-400 font-bold text-xs bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  কাস্টম অনুশীলন মোড
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customWord}
                    onChange={(e) => setCustomWord(e.target.value)}
                    placeholder="অনুশীলনের জন্য যেকোনো বাংলা শব্দ বা বাক্য টাইপ করুন..."
                    className="w-full bg-[#161b22] border border-[#30363d] rounded-2xl px-4 py-3 text-sm text-[#f0f6fc] placeholder-[#8b949e] focus:outline-none focus:border-emerald-500 font-bold transition-all"
                  />
                  <button
                    onClick={handleAddCustomWord}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 rounded-2xl shadow-lg transition-all cursor-pointer"
                  >
                    সেট করুন
                  </button>
                </div>
              </div>
            ) : (
              currentItem && (
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-fuchsia-400 font-bold text-xs bg-fuchsia-950/50 border border-fuchsia-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                      {currentItem.category === 'alphabet' ? 'বর্ণমালা' :
                       currentItem.category === 'words' ? 'সহজ শব্দ' :
                       currentItem.category === 'joint' ? 'যুক্তবর্ণ' : 'ছোট বাক্য'}
                    </span>
                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                      currentItem.difficulty === 'सहज' || currentItem.difficulty === 'সহজ'
                        ? 'text-green-400 bg-green-950/30 border-green-500/20'
                        : currentItem.difficulty === 'মাঝারি'
                        ? 'text-amber-400 bg-amber-950/30 border-amber-500/20'
                        : 'text-rose-400 bg-rose-950/30 border-rose-500/20'
                    }`}>
                      {currentItem.difficulty || 'মাঝারি'}
                    </span>
                  </div>

                  <span className="text-xs font-black text-[#8b949e]">
                    আইটেম {currentItemIndex + 1} / {filteredItems.length}
                  </span>
                </div>
              )
            )}

            {/* Target Display */}
            <div className="text-center py-6 sm:py-10 space-y-4">
              <h1 className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-indigo-300 to-emerald-400 select-all font-sans leading-normal">
                {isCustomMode ? (customWord || 'কাস্টম টেক্সট') : currentItem?.text}
              </h1>

              {/* Translation/Transliteration details */}
              {!isCustomMode && currentItem && (
                <div className="space-y-1">
                  {currentItem.transliteration && (
                    <p className="text-sm text-fuchsia-300 font-mono font-bold">
                      [{currentItem.transliteration}]
                    </p>
                  )}
                  {currentItem.translation && (
                    <p className="text-xs text-slate-400">
                      অর্থ: {currentItem.translation}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Listen / Play Controls */}
            <div className="flex justify-center gap-4 border-t border-[#21262d] pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={playTargetSound}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#161b22] border border-[#30363d] text-fuchsia-400 hover:text-white hover:bg-fuchsia-950/40 transition-all font-black text-xs cursor-pointer"
              >
                <Icon name="Volume2" className="w-5 h-5 text-fuchsia-500" />
                <span>সঠিক উচ্চারণ শুনুন</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Microphone Practice Box */}
          <div className="bg-[#11161d] border border-[#30363d] rounded-[2rem] p-6 sm:p-8 text-center shadow-xl space-y-6 relative overflow-hidden">
            <h3 className="text-sm sm:text-base font-black text-[#f0f6fc]">
              📢 আপনার উচ্চারণ যাচাই করুন
            </h3>

            {/* Large Mic Button */}
            <div className="flex justify-center items-center py-4">
              <div className="relative">
                <AnimatePresence>
                  {isListening && (
                    <>
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0.5 }}
                        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-fuchsia-600/30 rounded-full pointer-events-none"
                      />
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0.4 }}
                        animate={{ scale: [1, 2.3, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: 0.4 }}
                        className="absolute inset-0 bg-indigo-600/25 rounded-full pointer-events-none"
                      />
                    </>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={toggleListening}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-2xl relative z-10 transition-all border cursor-pointer ${
                    isListening
                      ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-transparent'
                      : 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white border-transparent hover:from-fuchsia-500 hover:to-indigo-500'
                  }`}
                >
                  <Icon name={isListening ? "Square" : "Mic"} className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#8b949e]">
              {isListening 
                ? 'এখন কথা বলুন... সিস্টেম শুনছে।' 
                : 'মাইক্রোফোন বোতামটি ক্লিক করে উচ্চারণ করতে থাকুন'}
            </p>

            {/* Live Audio Visualizer waves */}
            {isListening && (
              <div className="flex justify-center items-center gap-1.5 h-6">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 24, 4] }}
                    transition={{
                      duration: 0.6 + i * 0.08,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="w-1.5 rounded-full bg-gradient-to-t from-fuchsia-500 to-indigo-500"
                  />
                ))}
              </div>
            )}

            {/* Error Message */}
            {recognitionError && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-rose-950/30 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-bold"
              >
                ⚠️ {recognitionError}
              </motion.div>
            )}

            {/* Transcript & Comparison Output */}
            {transcript && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 sm:p-5 text-left space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-[#8b949e]">আপনার উচ্চারিত বাক্য:</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">Bangla Recognition</span>
                </div>
                <p className="text-base sm:text-lg font-black text-[#f0f6fc]">
                  "{transcript}"
                </p>

                {/* Accuracy Score Visualizer */}
                {accuracy !== null && (
                  <div className="pt-3 border-t border-[#21262d] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-400">উচ্চারণ মিল (Accuracy):</span>
                      <span className={`text-sm sm:text-base font-black ${
                        accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {accuracy}%
                      </span>
                    </div>

                    <div className="w-full h-3 bg-[#0d1117] rounded-full overflow-hidden border border-[#21262d]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${accuracy}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${
                          accuracy >= 80 
                            ? 'from-green-500 to-emerald-400' 
                            : accuracy >= 50 
                            ? 'from-amber-500 to-yellow-400' 
                            : 'from-rose-600 to-pink-500'
                        }`}
                      />
                    </div>

                    <p className={`text-xs font-black pt-1 ${
                      accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {feedbackMsg}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Sidebar Word Lists */}
        <div className="space-y-4">
          <div className="bg-[#11161d] border border-[#30363d] rounded-[2rem] p-5 shadow-xl relative overflow-hidden">
            <h3 className="text-xs sm:text-sm font-black text-[#f0f6fc] mb-3 flex items-center gap-2">
              <Icon name="List" className="w-4.5 h-4.5 text-fuchsia-400" />
              অনুশীলন তালিকা ({filteredItems.length})
            </h3>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {filteredItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentItemIndex(idx);
                    setIsCustomMode(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    !isCustomMode && currentItemIndex === idx
                      ? 'bg-gradient-to-r from-fuchsia-950/40 to-indigo-950/40 border-fuchsia-500 text-white shadow-md'
                      : 'bg-[#161b22]/70 border-[#21262d] text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#f0f6fc]'
                  }`}
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm sm:text-base font-extrabold truncate">{item.text}</span>
                    {item.transliteration && (
                      <span className="text-[10px] text-[#8b949e] font-mono mt-0.5 truncate">[{item.transliteration}]</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full border ${
                      item.difficulty === 'সহজ'
                        ? 'text-green-400 border-green-500/20 bg-green-950/20'
                        : item.difficulty === 'মাঝারি'
                        ? 'text-amber-400 border-amber-500/20 bg-amber-950/20'
                        : 'text-rose-400 border-rose-500/20 bg-rose-950/20'
                    }`}>
                      {item.difficulty}
                    </span>
                    <Icon name="ChevronRight" className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </button>
              ))}
            </div>

            {/* Pagination Controls */}
            {!isCustomMode && filteredItems.length > 0 && (
              <div className="flex gap-2 mt-4 border-t border-[#21262d] pt-4">
                <button
                  onClick={handlePrev}
                  className="flex-1 flex justify-center items-center py-2 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-slate-300 rounded-xl transition-all cursor-pointer"
                >
                  <Icon name="ChevronLeft" className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 flex justify-center items-center py-2 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-slate-300 rounded-xl transition-all cursor-pointer"
                >
                  <Icon name="ChevronRight" className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-[#11161d] to-[#161b22] border border-[#30363d] rounded-[2rem] p-5 shadow-md">
            <div className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-3 border border-amber-500/20">
              <Icon name="Sparkles" className="w-4 h-4 animate-spin-slow" />
            </div>
            <h4 className="text-xs sm:text-sm font-black text-[#f0f6fc] mb-1">প্র্যাকটিসের নিয়মাবলী 💡</h4>
            <p className="text-[11px] text-[#8b949e] leading-relaxed">
              ১. প্রথমে সঠিক উচ্চারণ বোতামে চাপ দিয়ে সঠিক আবৃত্তিটি শুনুন।<br />
              ২. মাইক্রোফোনে চাপ দিয়ে মুখের একদম কাছে স্পষ্ট ও স্বাভাবিকভাবে কথা বলুন।<br />
              ৩. আপনার উচ্চারণ ও বাংলা স্পিচ এআই মেলাবে এবং নির্ভুলতা পরিমাপ করবে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
