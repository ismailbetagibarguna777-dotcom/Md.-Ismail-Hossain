import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlphabetItem } from '../types';
import { Icon } from './Icon';
import { getEmojiImage } from '../utils';

interface StrokeMarker {
  x: number;
  y: number;
  number: number;
  angle: number;
  label: string;
}

interface LetterDetailModalProps {
  selectedLetter: AlphabetItem;
  isSpeaking: boolean;
  getSentence: (letter: AlphabetItem, word?: any) => string;
  speak: (text: string) => void;
  onClose: () => void;
  getLetterMarkers: (letter: string) => StrokeMarker[];
  onWordClick: (item: AlphabetItem, word: any) => void;
  listenedWords: Record<string, string[]>;
}

export function LetterDetailModal({
  selectedLetter,
  isSpeaking,
  getSentence,
  speak,
  onClose,
  getLetterMarkers,
  onWordClick,
  listenedWords
}: LetterDetailModalProps) {
  const [showStroke, setShowStroke] = useState(false);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0d1117]/90 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.8, y: 60, rotateX: 10 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.8, y: 60, rotateX: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0d1117] border border-[#30363d] rounded-[2rem] sm:rounded-[3rem] overflow-hidden w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <div className={`p-6 sm:p-12 text-center relative ${selectedLetter.color}`}>
          {/* Subtle dark overlay to make gradient look premium */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

          <button
            onClick={onClose}
            className="absolute top-4 left-4 sm:top-5 sm:left-5 p-2 sm:p-3 bg-black/30 text-white backdrop-blur-sm rounded-full hover:bg-black/55 transition-all shadow-lg z-10"
          >
            <Icon name="X" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (selectedLetter.words && selectedLetter.words[0]) {
                onWordClick(selectedLetter, selectedLetter.words[0]);
              } else {
                speak(getSentence(selectedLetter));
              }
            }}
            className={`absolute top-4 right-4 sm:top-5 sm:right-5 p-2 sm:p-3 bg-black/30 text-white backdrop-blur-sm rounded-full hover:bg-black/55 transition-all shadow-lg z-10 ${isSpeaking ? 'speaking' : ''}`}
          >
            <Icon name="Volume2" className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Stroke Order Toggle switch */}
          <div className="relative z-10 flex justify-center mb-4 sm:mb-6 mt-10">
            <button
              onClick={() => {
                setShowStroke(!showStroke);
                speak(showStroke ? "বর্ণ" : "লিখার নিয়ম");
              }}
              className={`px-5 py-2.5 rounded-full font-black text-xs sm:text-sm flex items-center gap-2 border transition-all shadow-md cursor-pointer ${
                showStroke 
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 border-teal-300 shadow-teal-500/20' 
                  : 'bg-black/30 text-slate-300 border-white/10 hover:bg-black/45'
              }`}
            >
              <Icon name="PenTool" className={`w-4 h-4 ${showStroke ? 'animate-bounce' : ''}`} />
              <span>{showStroke ? 'লিখার নিয়ম বন্ধ করুন ✖️' : 'লিখার নিয়ম শিখুন ✍️'}</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!showStroke ? (
              <motion.span
                key="static-letter"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="block text-[8rem] sm:text-[14rem] font-black leading-none drop-shadow-2xl mb-4 sm:mb-8 select-none text-white relative z-10 cursor-pointer"
                onClick={() => speak(selectedLetter.letter)}
              >
                {selectedLetter.letter}
              </motion.span>
            ) : (
              <motion.div
                key="stroke-letter"
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
                className="relative w-48 h-48 sm:w-72 sm:h-72 mx-auto mb-4 sm:mb-8 flex items-center justify-center select-none z-10 bg-slate-950/60 rounded-3xl p-4 border border-white/5 shadow-inner"
              >
                <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="strokeRainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2dd4bf" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Background */}
                  <line x1="100" y1="0" x2="100" y2="200" stroke="#334155" strokeWidth="0.8" strokeDasharray="3,3" />
                  <line x1="0" y1="100" x2="200" y2="100" stroke="#334155" strokeWidth="0.8" strokeDasharray="3,3" />

                  {/* Faint background outline */}
                  <text
                    x="50%"
                    y="55%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="sans-serif"
                    fontSize="120"
                    fontWeight="900"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  >
                    {selectedLetter.letter}
                  </text>

                  {/* Main animated letter */}
                  <motion.text
                    initial={{ fillOpacity: 0 }}
                    animate={{ fillOpacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    x="50%"
                    y="55%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="sans-serif"
                    fontSize="120"
                    fontWeight="900"
                    fill="url(#strokeRainbow)"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.5"
                  >
                    {selectedLetter.letter}
                  </motion.text>

                  {/* Stroke markers */}
                  {getLetterMarkers(selectedLetter.letter).map((marker, index, arr) => {
                    const colors = [
                      { bg: '#ef4444', border: '#fee2e2' }, // Red
                      { bg: '#3b82f6', border: '#dbeafe' }, // Blue
                      { bg: '#10b981', border: '#d1fae5' }, // Emerald
                      { bg: '#f59e0b', border: '#fef3c7' }, // Amber
                      { bg: '#8b5cf6', border: '#ede9fe' }, // Purple
                    ];
                    const color = colors[index % colors.length];
                    return (
                      <g key={index}>
                        {/* Animated Connection helper lines */}
                        {index > 0 && (
                          <motion.line
                            x1={arr[index - 1].x}
                            y1={arr[index - 1].y}
                            x2={marker.x}
                            y2={marker.y}
                            stroke={colors[(index - 1) % colors.length].bg}
                            strokeWidth="1.5"
                            strokeDasharray="3,3"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.5 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                          />
                        )}

                        {/* Outer animated pulsing ring */}
                        <motion.circle
                          cx={marker.x}
                          cy={marker.y}
                          r="14"
                          fill="none"
                          stroke={color.bg}
                          strokeWidth="1.5"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.4, 1, 0.4] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.8,
                            delay: index * 0.3,
                          }}
                          style={{ transformOrigin: `${marker.x}px ${marker.y}px` }}
                        />
                        
                        {/* Outer glowing border */}
                        <circle
                          cx={marker.x}
                          cy={marker.y}
                          r="9"
                          fill={color.bg}
                          stroke={color.border}
                          strokeWidth="2"
                        />

                        {/* Text number */}
                        <text
                          x={marker.x}
                          y={marker.y + 0.5}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="10"
                          fontWeight="900"
                          fill="#ffffff"
                        >
                          {marker.number}
                        </text>

                        {/* Animated Direction Indicator Arrow */}
                        <motion.g
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.1 }}
                          style={{ transformOrigin: `${marker.x}px ${marker.y}px` }}
                        >
                          <text
                            x={marker.x + (marker.angle === 0 ? 15 : marker.angle === 180 ? -15 : 0)}
                            y={marker.y + 0.5 + (marker.angle === 90 ? 15 : marker.angle === -45 ? -11 : 0)}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="12"
                            fill="#14b8a6"
                            className="font-bold animate-pulse"
                          >
                            {marker.label}
                          </text>
                        </motion.g>
                      </g>
                    );
                  })}
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#161b22] border border-[#30363d] p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] text-[#c9d1d9] shadow-2xl relative z-10"
          >
            <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-3 sm:mb-6 relative flex items-center justify-center overflow-hidden bg-black/20 rounded-2xl p-3 border border-[#30363d]">
              {selectedLetter.words[0]?.img ? (
                <img
                  src={selectedLetter.words[0]?.img}
                  alt={selectedLetter.words[0]?.word}
                  className="w-full h-full object-contain drop-shadow-xl"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const sibling = target.nextSibling as HTMLElement;
                    if (sibling) {
                      sibling.classList.remove('hidden');
                      sibling.classList.add('block');
                    }
                  }}
                />
              ) : null}
              <img
                src={getEmojiImage(selectedLetter.words[0]?.emoji || '📚', 256)}
                alt={selectedLetter.words[0]?.word}
                className={`w-24 h-24 sm:w-36 sm:h-36 object-contain ${selectedLetter.words[0]?.img ? 'hidden' : 'block'}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = "text-5xl sm:text-6xl select-none animate-pulse";
                    fallback.textContent = selectedLetter.words[0]?.emoji || '📚';
                    parent.appendChild(fallback);
                    target.style.display = 'none';
                  }
                }}
              />
            </div>
            <h3 className="text-3xl sm:text-6xl font-black mb-2 leading-tight text-[#f0f6fc]">
              {selectedLetter.words[0]?.word || ''}
            </h3>
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#30363d]">
              <p className="text-xs sm:text-base text-[#8b949e] font-medium leading-relaxed mb-3">
                ✨ এই বর্ণ দিয়ে "{selectedLetter.words[0]?.word}" শব্দটি হয়
              </p>

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-dashed border-[#30363d]">
                <p className="text-[10px] sm:text-xs text-[#8b949e] font-bold mb-2 sm:mb-3">
                  📖 আরও শব্দ শিখুন (ক্লিক করে শুনুন)
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                  {selectedLetter.words.slice(1, 4).map((w, i) => {
                    const isListened = (listenedWords[selectedLetter.id] || []).includes(w.word);
                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onWordClick(selectedLetter, w);
                        }}
                        className={`border px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isListened 
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40 shadow-sm shadow-emerald-500/10' 
                            : 'bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:border-slate-500'
                        }`}
                      >
                        <img
                          src={getEmojiImage(w.emoji, 32)}
                          className="w-3.5 h-3.5"
                          alt=""
                          referrerPolicy="no-referrer"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span>{w.word}</span>
                        {isListened ? (
                          <Icon name="Check" className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Icon name="Volume2" className="w-3 h-3 text-slate-500" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}


