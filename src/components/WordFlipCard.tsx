import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlphabetItem, WordItem } from '../types';
import { Icon } from './Icon';
import { getEmojiImage } from '../utils';
import { getWordDefinition } from '../data/wordDefinitions';
import { getApiUrl } from '../lib/api';

interface WordFlipCardProps {
  wordItem: WordItem;
  letterItem: AlphabetItem;
  onClick: () => void;
  isMastered?: boolean;
}

export function WordFlipCard({ wordItem, letterItem, onClick, isMastered = false }: WordFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiData, setAiData] = useState<{
    sentence: string;
    kidDefinition: string;
    synonyms: string[];
    antonyms: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    // Speak first
    onClick();
    // Toggle flip
    setIsFlipped(!isFlipped);
  };

  const speakSentence = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const fetchAiData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(getApiUrl('/api/generate-sentence'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: wordItem.word,
          meaning: '',
          englishTerm: ''
        })
      });
      if (!response.ok) {
        throw new Error('Failed to generate sentence');
      }
      const data = await response.json();
      setAiData(data);
    } catch (err: any) {
      console.error(err);
      setError('এআই শিক্ষকের সাথে সংযোগ করতে সমস্যা হচ্ছে 😢 আবার চেষ্টা করো!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAiModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // crucial to prevent flipping
    setIsAiModalOpen(true);
    if (!aiData) {
      fetchAiData();
    }
  };

  return (
    <div 
      className="w-full h-56 sm:h-76 focus:outline-none select-none" 
      style={{ perspective: '1200px' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={{
          scale: [1.02, 1.06, 1.02],
          transition: {
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileTap={{ scale: 0.96 }}
        onClick={handleClick}
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 140, damping: 14 }}
      >
        {/* FRONT FACE (Mystery Image Side) */}
        <div
          className={`absolute inset-0 w-full h-full bg-[#161b22] rounded-3xl shadow-xl flex flex-col overflow-hidden transition-all ${
            isMastered 
              ? 'border-2 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.25)] gold-shimmer-effect' 
              : 'border border-[#30363d]'
          }`}
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden' 
          }}
        >
          {/* Decorative glowing gradient effect for kids */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
            isMastered ? 'from-amber-400 via-yellow-300 to-amber-500' : 'from-teal-500 via-orange-500 to-pink-500'
          }`}></div>
          
          <div className="relative flex-1 bg-gradient-to-b from-[#1c212c] to-[#0d1117]/30 p-4 flex items-center justify-center overflow-hidden">
            {wordItem.img ? (
              <img
                src={wordItem.img}
                alt={wordItem.word}
                className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = getEmojiImage(wordItem.emoji, 128);
                }}
              />
            ) : (
              <img
                src={getEmojiImage(wordItem.emoji, 128)}
                alt={wordItem.word}
                className="w-20 h-20 sm:w-28 sm:h-28 object-contain drop-shadow-2xl"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="text-6xl select-none animate-pulse">${wordItem.emoji}</div>`;
                  }
                }}
              />
            )}

            {/* Glowing cartoon badge top-left */}
            <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-black rounded-full border shadow-sm flex items-center gap-1 ${
              isMastered 
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/35' 
                : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
            }`}>
              <span className={`animate-ping w-1.5 h-1.5 rounded-full inline-block ${
                isMastered ? 'bg-amber-400' : 'bg-orange-400'
              }`}></span>
              <span>বর্ণ: {letterItem.letter}</span>
            </div>

            {/* Interactive hint top-right */}
            <div className={`p-2 rounded-full border shadow ${
              isMastered 
                ? 'absolute top-3 right-3 bg-amber-500/15 border-amber-500/25' 
                : 'absolute top-3 right-3 bg-teal-500/10 border-teal-500/25'
            }`}>
              <Icon name="Volume2" className={`w-4 h-4 ${isMastered ? 'text-amber-400' : 'text-teal-400'}`} />
            </div>
          </div>

          {/* Child-friendly curiosity builder footer */}
          <div className={`p-3 text-center border-t flex items-center justify-center gap-1.5 transition-colors ${
            isMastered 
              ? 'bg-[#1a140e] border-amber-500/25 text-amber-300' 
              : 'bg-[#161b22] border-[#30363d]/50 text-slate-300'
          }`}>
            <span className="text-xs sm:text-sm font-black flex items-center gap-1">
              {isMastered ? (
                <>
                  <span>শিখেছো! ট্যাপ করো</span>
                  <span className="text-amber-400 animate-pulse">🌟</span>
                </>
              ) : (
                'এটা কী? ট্যাপ করো! 🤫'
              )}
            </span>
          </div>
        </div>

        {/* BACK FACE (Text Reveal & Pronunciation combination) */}
        <div
          className={`absolute inset-0 w-full h-full bg-gradient-to-b rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all ${
            isMastered 
              ? 'from-[#221a0f] to-[#0a0805] border-2 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
              : 'from-[#1b2230] to-[#0d1117] border-2 border-teal-500/40'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Card Back top banner */}
          <div className={`px-4 py-2 border-b flex items-center justify-between ${
            isMastered ? 'bg-[#1a140e] border-amber-500/20' : 'bg-[#161b22]/90 border-[#30363d]'
          }`}>
            <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1 ${
              isMastered ? 'text-amber-400' : 'text-orange-400'
            }`}>
              {isMastered ? '🏆 সম্পূর্ণ শিখেছো!' : '🎉 শব্দ শেখো!'}
            </span>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${
              isMastered ? 'bg-amber-500/10 border-amber-500/30' : 'bg-teal-500/10 border-teal-500/30'
            }`}>
              <Icon name="Sparkles" className={`w-3.5 h-3.5 ${isMastered ? 'text-amber-400' : 'text-teal-400'}`} />
            </span>
          </div>

          {/* Combined Image + Text representation */}
          <div className="flex-1 flex flex-col items-center justify-center p-3 text-center">
            {/* Small circular avatar preview */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 mb-2 rounded-full bg-slate-900/60 p-2 border border-slate-800/60 flex items-center justify-center shadow-inner relative transition-transform">
              <img
                src={wordItem.img || getEmojiImage(wordItem.emoji, 64)}
                alt={wordItem.word}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (wordItem.img && target.src !== getEmojiImage(wordItem.emoji, 64)) {
                    target.src = getEmojiImage(wordItem.emoji, 64);
                  } else {
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="text-3xl select-none">${wordItem.emoji}</div>`;
                    }
                  }
                }}
              />
            </div>

            {/* Giant Child-Friendly Word */}
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-none mb-1.5 drop-shadow-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-teal-200">
              {wordItem.word}
            </h3>

            {/* Easy-to-read Bengali phonetic/grammatical relationship sentence */}
            <div className="bg-slate-950/40 px-3 py-1 rounded-full border border-slate-800/50 inline-block mb-1.5">
              <p className="text-teal-400 text-[10px] sm:text-xs font-black leading-relaxed">
                {letterItem.letter} তে {wordItem.word}
              </p>
            </div>

            {/* Simple child-friendly definition */}
            <div className={`px-3 py-1 sm:py-1.5 bg-white/5 rounded-xl border border-white/5 max-w-[92%] text-center shadow-inner mb-2.5 transition-all duration-300 ${
              isMastered ? 'border-amber-500/10 bg-amber-500/5 text-amber-200/90' : 'text-slate-300/90'
            }`}>
              <p className="text-[10px] sm:text-xs font-semibold leading-normal">
                {aiData?.kidDefinition || getWordDefinition(wordItem.word)}
              </p>
            </div>

            {/* AI Teacher Interactive Button */}
            <button
              onClick={handleOpenAiModal}
              className="px-2.5 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-[10px] rounded-xl shadow-md transition-all flex items-center justify-center gap-1 border border-indigo-400/30 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>🤖 এআই শিক্ষক</span>
              <span className="bg-yellow-400 text-slate-950 px-1 py-0.1 rounded text-[8px] font-black animate-pulse">নতুন</span>
            </button>
          </div>

          {/* Action indicator footer */}
          <div className="p-2 bg-[#161b22] border-t border-[#30363d] flex items-center justify-center gap-1.5">
            <Icon name="Volume2" className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400">
              আবার শব্দ শুনতে স্পর্শ করো 🔊
            </span>
          </div>
        </div>
      </motion.div>

      {/* Elegant Kid-Friendly AI Lesson Modal Portal */}
      <AnimatePresence>
        {isAiModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              e.stopPropagation();
              setIsAiModalOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border-4 border-indigo-500 rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl relative text-left text-white overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 via-yellow-500 to-pink-500"></div>
              
              {/* Top background glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl animate-bounce">🤖</span>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300 leading-tight">
                      এআই সোনামণি শিক্ষক
                    </h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Gemini Powered Smart Teacher</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white p-1.5 rounded-full border border-slate-700/50 transition-colors shadow-sm"
                >
                  <Icon name="X" className="w-4 h-4" />
                </button>
              </div>

              {/* Loader */}
              {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="text-indigo-400"
                  >
                    <Icon name="Sparkles" className="w-10 h-10" />
                  </motion.div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white">এআই শিক্ষক চিন্তা করছেন...</h4>
                    <p className="text-[10px] text-slate-400 mt-1">সোনামণির জন্য চমৎকার বাক্য তৈরি হচ্ছে 💖</p>
                  </div>
                </div>
              ) : error ? (
                <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
                  <div className="text-3xl">😢</div>
                  <p className="text-xs font-semibold text-rose-300 px-4 leading-relaxed">{error}</p>
                  <button
                    onClick={fetchAiData}
                    className="mt-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] rounded-xl shadow-md transition-colors border border-indigo-400/30 flex items-center gap-1 cursor-pointer"
                  >
                    <Icon name="RefreshCw" className="w-3.5 h-3.5" />
                    <span>আবার চেষ্টা করো</span>
                  </button>
                </div>
              ) : aiData ? (
                <div className="space-y-4">
                  {/* Word Info Banner */}
                  <div className="bg-[#161b22] border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3 shadow-inner">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-700/40 text-3xl select-none shrink-0 shadow-md">
                      {wordItem.emoji}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white">{wordItem.word}</h4>
                      <p className="text-[10px] text-teal-400 font-bold">"{letterItem.letter}" দিয়ে শুরু হওয়া মিষ্টি শব্দ</p>
                    </div>
                  </div>

                  {/* Kid definition */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-yellow-400 uppercase tracking-widest flex items-center gap-1">
                      <span>💡 সহজ কথা (What it means)</span>
                    </span>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed bg-slate-950/40 border border-slate-800/40 p-3 rounded-2xl shadow-sm">
                      {aiData.kidDefinition}
                    </p>
                  </div>

                  {/* AI Sentence */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest flex items-center gap-1">
                      <span>✨ চমৎকার বাক্য (Sweet Sentence)</span>
                    </span>
                    <div className="bg-gradient-to-br from-[#1e1b4b]/60 to-[#0f172a]/60 border-2 border-indigo-500/20 p-3.5 rounded-2xl shadow-sm relative flex items-start gap-2.5">
                      <p className="text-xs sm:text-sm font-bold text-white leading-relaxed flex-1 pt-0.5">
                        {aiData.sentence}
                      </p>
                      <button
                        onClick={() => speakSentence(aiData.sentence)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer"
                        title="শুনুন"
                      >
                        <Icon name="Volume2" className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Synonyms & Antonyms */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {/* Synonyms */}
                    <div className="space-y-1">
                      <span className="text-[8px] font-black text-emerald-400 uppercase tracking-wider block">👭 একই রকম শব্দ</span>
                      <div className="flex flex-wrap gap-1">
                        {aiData.synonyms && aiData.synonyms.length > 0 ? (
                          aiData.synonyms.map((syn, i) => (
                            <button
                              key={i}
                              onClick={() => speakSentence(syn)}
                              className="px-1.5 py-0.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold text-[9px] rounded-md border border-emerald-500/20 transition-all flex items-center gap-0.5 cursor-pointer"
                            >
                              <span>{syn}</span>
                              <Icon name="Volume2" className="w-2.5 h-2.5 opacity-60" />
                            </button>
                          ))
                        ) : (
                          <span className="text-[9px] text-slate-500">নেই</span>
                        )}
                      </div>
                    </div>

                    {/* Antonyms */}
                    <div className="space-y-1">
                      <span className="text-[8px] font-black text-pink-400 uppercase tracking-wider block">⚔️ উল্টো শব্দ</span>
                      <div className="flex flex-wrap gap-1">
                        {aiData.antonyms && aiData.antonyms.length > 0 ? (
                          aiData.antonyms.map((ant, i) => (
                            <button
                              key={i}
                              onClick={() => speakSentence(ant)}
                              className="px-1.5 py-0.5 bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 font-bold text-[9px] rounded-md border border-pink-500/20 transition-all flex items-center gap-0.5 cursor-pointer"
                            >
                              <span>{ant}</span>
                              <Icon name="Volume2" className="w-2.5 h-2.5 opacity-60" />
                            </button>
                          ))
                        ) : (
                          <span className="text-[9px] text-slate-500">নেই</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Encouraging footer */}
                  <div className="text-center pt-2.5 text-[9px] text-slate-400 font-bold border-t border-slate-800">
                    তুমি চমৎকার করছ! পড়া শেষ হলে বন্ধ করে দাও 💖
                  </div>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
