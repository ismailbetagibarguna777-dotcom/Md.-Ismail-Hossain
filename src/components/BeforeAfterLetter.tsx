import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlphabetItem } from '../types';
import { Icon } from './Icon';

interface BeforeAfterLetterProps {
  alphabetData: AlphabetItem[];
  speak: (text: string) => void;
  onSuccess: () => void;
}

export const BeforeAfterLetter: React.FC<BeforeAfterLetterProps> = ({
  alphabetData,
  speak,
  onSuccess,
}) => {
  // Mode selection: 'vowel' | 'consonant'
  const [activeTab, setActiveTab] = useState<'vowel' | 'consonant'>('vowel');

  // Filter letters based on type
  const lettersPool = useMemo(() => {
    return alphabetData.filter((item) => item.type === activeTab);
  }, [alphabetData, activeTab]);

  // Current target letters indices (we need elements that have both a predecessor and a successor)
  // For safety, index must be in range [1, pool.length - 2]
  const validMiddleIndices = useMemo(() => {
    if (lettersPool.length < 3) return [];
    return Array.from({ length: lettersPool.length - 2 }).map((_, i) => i + 1);
  }, [lettersPool]);

  // Game session states
  const [currentPoolIndex, setCurrentPoolIndex] = useState<number>(1);
  const [attempts, setAttempts] = useState<number>(0); // out of 3
  const [beforeFilled, setBeforeFilled] = useState<string | null>(null);
  const [afterFilled, setAfterFilled] = useState<string | null>(null);
  const [selectedGapFocus, setSelectedGapFocus] = useState<'before' | 'after'>('before');
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean | null } | null>(null);
  const [isRoundSolved, setIsRoundSolved] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Get active items
  const currentLetterItem = useMemo(() => {
    if (lettersPool.length === 0) return null;
    return lettersPool[currentPoolIndex] || lettersPool[1];
  }, [lettersPool, currentPoolIndex]);

  const correctBeforeLetter = useMemo(() => {
    if (lettersPool.length === 0 || currentPoolIndex <= 0) return '';
    return lettersPool[currentPoolIndex - 1]?.letter || '';
  }, [lettersPool, currentPoolIndex]);

  const correctAfterLetter = useMemo(() => {
    if (lettersPool.length === 0 || currentPoolIndex >= lettersPool.length - 1) return '';
    return lettersPool[currentPoolIndex + 1]?.letter || '';
  }, [lettersPool, currentPoolIndex]);

  // Option letters (5 unique letters including correctBefore and correctAfter + 3 random distractors)
  const [options, setOptions] = useState<string[]>([]);

  // Regenerate a question round
  const generateRound = (tabType?: 'vowel' | 'consonant') => {
    const activePool = alphabetData.filter((item) => item.type === (tabType || activeTab));
    if (activePool.length < 3) return;

    // Pick a random valid middle index
    const randomIndex = Math.floor(Math.random() * (activePool.length - 2)) + 1;
    setCurrentPoolIndex(randomIndex);

    const correctBefore = activePool[randomIndex - 1].letter;
    const correctAfter = activePool[randomIndex + 1].letter;
    const middleLetter = activePool[randomIndex].letter;

    // Distractors
    const others = activePool.filter(
      (item) =>
        item.letter !== correctBefore &&
        item.letter !== correctAfter &&
        item.letter !== middleLetter
    );

    // Shuffle and pick 3 distractors
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 3).map((item) => item.letter);

    // Assemble final 5 options and shuffle them
    const finalOptions = [correctBefore, correctAfter, ...distractors].sort(
      () => 0.5 - Math.random()
    );

    setOptions(finalOptions);
    setBeforeFilled(null);
    setAfterFilled(null);
    setSelectedGapFocus('before');
    setAttempts(0);
    setFeedback(null);
    setIsRoundSolved(false);
    setShowSolution(false);
  };

  // Run on tab switch or mount
  useEffect(() => {
    generateRound();
  }, [activeTab]);

  // Pronounce complete sequence
  const speakSequence = (before: string, middle: string, after: string) => {
    speak(`${before}, তারপরে ${middle}, তারপরে ${after}`);
  };

  // Handle option click
  const handleOptionClick = (letter: string) => {
    if (isRoundSolved || showSolution) return;

    speak(letter);

    if (selectedGapFocus === 'before') {
      setBeforeFilled(letter);
      // Auto switch focus to 'after' if empty
      if (!afterFilled) {
        setSelectedGapFocus('after');
      }
    } else {
      setAfterFilled(letter);
      // Auto switch focus to 'before' if empty
      if (!beforeFilled) {
        setSelectedGapFocus('before');
      }
    }
  };

  // Handle gap clicking
  const handleGapSelect = (gap: 'before' | 'after') => {
    setSelectedGapFocus(gap);
    speak(gap === 'before' ? 'আগের বর্ণ' : 'পরের বর্ণ');
  };

  // Clear specific gap
  const handleClearGap = (gap: 'before' | 'after') => {
    if (gap === 'before') {
      setBeforeFilled(null);
      setSelectedGapFocus('before');
    } else {
      setAfterFilled(null);
      setSelectedGapFocus('after');
    }
  };

  // Check the answer
  const handleCheckAnswer = () => {
    if (!beforeFilled || !afterFilled) {
      speak('দয়া করে আগের ও পরের দুটি বর্ণই নির্বাচন করো!');
      setFeedback({ text: 'আগের ও পরের দুটি ফাঁকা ঘরই পূরণ করো! 🧐', isCorrect: null });
      return;
    }

    const isBeforeCorrect = beforeFilled === correctBeforeLetter;
    const isAfterCorrect = afterFilled === correctAfterLetter;

    if (isBeforeCorrect && isAfterCorrect) {
      // SUCCESS!
      setIsRoundSolved(true);
      setFeedback({ text: 'অসাধারণ সোনামণি! একদম সঠিক উত্তর হয়েছে! 🎉🥳', isCorrect: true });
      speak('বাহ্! দারুণ হয়েছে! একদম সঠিক উত্তর হয়েছে! তুমি খুব বুদ্ধিমান!');
      onSuccess();
    } else {
      // INCORRECT
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);

      if (nextAttempts >= 3) {
        // Show correct answers on 4th attempt
        setShowSolution(true);
        setBeforeFilled(correctBeforeLetter);
        setAfterFilled(correctAfterLetter);
        setFeedback({
          text: `৩ বার ভুল উত্তর হয়েছে। সঠিক উত্তর হলো: ${correctBeforeLetter} এবং ${correctAfterLetter}`,
          isCorrect: false,
        });
        speak(`সঠিক উত্তরটি দেখে নাও সোনামণি। ${correctBeforeLetter} এর পরে ${currentLetterItem?.letter} এবং তারপরে ${correctAfterLetter}`);
      } else {
        setFeedback({
          text: `ভুল হয়েছে সোনামণি! আবার চেষ্টা করো। তোমার কাছে আরও ${3 - nextAttempts} বার সুযোগ আছে। ❌`,
          isCorrect: false,
        });
        speak('ভুল হয়েছে সোনামণি, আবার একটু ভেবে চেষ্টা করো!');
      }
    }
  };

  // Skip / Next
  const handleNextQuestion = () => {
    generateRound();
    speak('এসো পরের বর্ণটি খেলি!');
  };

  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative vector badges */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 sm:mb-8 border-b border-[#30363d]/60 pb-5">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 px-3 py-1.5 rounded-full text-teal-400 text-xs sm:text-sm font-black mb-1">
            <Icon name="Gamepad2" className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>নতুন খেলা: আগের ও পরের বর্ণ চিহ্নিতকরণ</span>
          </div>
          <p className="text-[#8b949e] text-xs sm:text-sm font-semibold">
            মাঝখানের বর্ণটির আগের এবং পরের সঠিক বর্ণটি ক্লিক করে মিলিয়ে নাও!
          </p>
        </div>

        {/* Tab Buttons (Vowel vs Consonant) */}
        <div className="bg-[#161b22] border border-[#30363d] p-1.5 rounded-2xl flex gap-1.5 shadow-inner">
          <button
            onClick={() => {
              setActiveTab('vowel');
              speak('স্বরবর্ণ খেলা নির্বাচন করা হয়েছে');
            }}
            className={`px-4 py-2 text-sm font-black rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'vowel'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                : 'text-[#8b949e] hover:text-[#f0f6fc]'
            }`}
          >
            🍎 স্বরবর্ণ
          </button>
          <button
            onClick={() => {
              setActiveTab('consonant');
              speak('ব্যঞ্জনবর্ণ খেলা নির্বাচন করা হয়েছে');
            }}
            className={`px-4 py-2 text-sm font-black rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'consonant'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-[#8b949e] hover:text-[#f0f6fc]'
            }`}
          >
            🥑 ব্যঞ্জনবর্ণ
          </button>
        </div>
      </div>

      {/* Game Stage Panel */}
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Heart/Attempt indicator */}
        <div className="flex items-center gap-3 mb-6 bg-[#161b22]/80 px-4 py-2 rounded-2xl border border-[#30363d]/50 shadow-inner">
          <span className="text-xs sm:text-sm text-[#8b949e] font-bold">সুযোগ অবশিষ্ট:</span>
          <div className="flex gap-1.5">
            {Array.from({ length: 3 }).map((_, idx) => {
              const isLost = idx < attempts;
              return (
                <motion.div
                  key={idx}
                  animate={isLost ? { scale: [1, 0.8, 1], opacity: 0.3 } : { scale: [1, 1.1, 1] }}
                  transition={{ repeat: isLost ? 0 : Infinity, duration: 2, delay: idx * 0.2 }}
                >
                  <Icon
                    name="Heart"
                    className={`w-5 h-5 ${isLost ? 'text-[#30363d] fill-[#30363d]' : 'text-rose-500 fill-rose-500'}`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Gaps Layout Frame */}
        <div className="w-full grid grid-cols-3 gap-3 sm:gap-6 items-center justify-center mb-8">
          
          {/* 1. BEFORE GAP CARD */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs text-[#8b949e] font-black uppercase tracking-wider mb-2">আগের বর্ণ</span>
            <motion.div
              whileHover={{ scale: isRoundSolved || showSolution ? 1 : 1.05 }}
              whileTap={{ scale: isRoundSolved || showSolution ? 1 : 0.95 }}
              onClick={() => handleGapSelect('before')}
              className={`w-20 h-20 sm:w-28 sm:h-28 rounded-3xl border-3 flex flex-col items-center justify-center relative transition-all shadow-xl group overflow-hidden ${
                isRoundSolved || showSolution ? '' : 'cursor-pointer'
              } ${
                selectedGapFocus === 'before' && !isRoundSolved && !showSolution
                  ? 'border-yellow-400 bg-yellow-400/10 ring-4 ring-yellow-400/20'
                  : beforeFilled
                  ? 'border-emerald-500 bg-[#161b22]'
                  : 'border-[#30363d] bg-[#161b22] hover:border-[#8b949e]'
              }`}
            >
              {beforeFilled ? (
                <span className="text-3xl sm:text-5xl font-black text-[#f0f6fc]">{beforeFilled}</span>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold text-yellow-400 animate-pulse">?</span>
                  <span className="text-[9px] sm:text-[10px] text-[#8b949e] font-medium mt-1">খালি ঘর</span>
                </div>
              )}

              {/* Clear button on active filled gap */}
              {beforeFilled && !isRoundSolved && !showSolution && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearGap('before');
                  }}
                  className="absolute -top-1 -right-1 bg-rose-500/20 hover:bg-rose-500 border border-rose-500/30 text-rose-400 hover:text-white p-1 rounded-full shadow transition-all scale-75 group-hover:scale-100"
                >
                  <Icon name="X" className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          </div>

          {/* 2. MIDDLE TARGET CARD */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs text-teal-400 font-black uppercase tracking-wider mb-2 animate-pulse">বর্তমান বর্ণ</span>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br ${
                currentLetterItem?.color || 'from-teal-500 to-emerald-600'
              } text-white flex flex-col items-center justify-center shadow-2xl relative border border-white/15`}
            >
              <span className="text-4xl sm:text-6xl font-black drop-shadow-lg">
                {currentLetterItem?.letter}
              </span>

              {/* Sound icon button */}
              <button
                onClick={() => speak(currentLetterItem?.letter || '')}
                className="absolute bottom-2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-1.5 rounded-full border border-white/10 shadow transition-all"
              >
                <Icon name="Volume2" className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>

          {/* 3. AFTER GAP CARD */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs text-[#8b949e] font-black uppercase tracking-wider mb-2">পরের বর্ণ</span>
            <motion.div
              whileHover={{ scale: isRoundSolved || showSolution ? 1 : 1.05 }}
              whileTap={{ scale: isRoundSolved || showSolution ? 1 : 0.95 }}
              onClick={() => handleGapSelect('after')}
              className={`w-20 h-20 sm:w-28 sm:h-28 rounded-3xl border-3 flex flex-col items-center justify-center relative transition-all shadow-xl group overflow-hidden ${
                isRoundSolved || showSolution ? '' : 'cursor-pointer'
              } ${
                selectedGapFocus === 'after' && !isRoundSolved && !showSolution
                  ? 'border-yellow-400 bg-yellow-400/10 ring-4 ring-yellow-400/20'
                  : afterFilled
                  ? 'border-emerald-500 bg-[#161b22]'
                  : 'border-[#30363d] bg-[#161b22] hover:border-[#8b949e]'
              }`}
            >
              {afterFilled ? (
                <span className="text-3xl sm:text-5xl font-black text-[#f0f6fc]">{afterFilled}</span>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold text-yellow-400 animate-pulse">?</span>
                  <span className="text-[9px] sm:text-[10px] text-[#8b949e] font-medium mt-1">খালি ঘর</span>
                </div>
              )}

              {/* Clear button on active filled gap */}
              {afterFilled && !isRoundSolved && !showSolution && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearGap('after');
                  }}
                  className="absolute -top-1 -right-1 bg-rose-500/20 hover:bg-rose-500 border border-rose-500/30 text-rose-400 hover:text-white p-1 rounded-full shadow transition-all scale-75 group-hover:scale-100"
                >
                  <Icon name="X" className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Helpful Tip Indicator */}
        {!isRoundSolved && !showSolution && (
          <div className="mb-6 flex items-center gap-1.5 bg-[#161b22] border border-yellow-500/20 px-3 py-1.5 rounded-full text-yellow-400 text-xs font-semibold">
            <Icon name="Lightbulb" className="w-3.5 h-3.5 animate-pulse" />
            <span>
              {selectedGapFocus === 'before'
                ? 'আগের ফাঁকা ঘরের জন্য নিচে থেকে একটি বর্ণ ক্লিক করো'
                : 'পরের ফাঁকা ঘরের জন্য নিচে থেকে একটি বর্ণ ক্লিক করো'}
            </span>
          </div>
        )}

        {/* Options Box (5 options) */}
        <div className="w-full bg-[#161b22] border border-[#30363d] p-5 sm:p-6 rounded-3xl shadow-xl text-center mb-8">
          <h4 className="text-sm font-bold text-[#8b949e] mb-4">নিচের বেলুনগুলো থেকে সঠিক বর্ণ দুটি বেছে নাও:</h4>
          
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {options.map((letter, idx) => {
              const colors = [
                'bg-gradient-to-br from-rose-500 to-pink-500',
                'bg-gradient-to-br from-amber-500 to-orange-500',
                'bg-gradient-to-br from-emerald-500 to-teal-500',
                'bg-gradient-to-br from-sky-500 to-indigo-500',
                'bg-gradient-to-br from-purple-500 to-fuchsia-500'
              ];
              const balloonColor = colors[idx % colors.length];

              const isUsed = beforeFilled === letter || afterFilled === letter;

              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: isUsed ? 1 : 1.1, y: isUsed ? 0 : -4 }}
                  whileTap={{ scale: isUsed ? 1 : 0.95 }}
                  onClick={() => handleOptionClick(letter)}
                  disabled={isUsed || isRoundSolved || showSolution}
                  className={`px-5 py-3 rounded-2xl text-white font-black text-2xl sm:text-3xl shadow-lg border border-white/10 flex items-center justify-center min-w-[65px] sm:min-w-[80px] h-[55px] sm:h-[70px] relative transition-all ${
                    isUsed
                      ? 'bg-[#30363d]/40 text-[#8b949e] border-transparent opacity-30 cursor-not-allowed scale-95'
                      : `${balloonColor} cursor-pointer hover:shadow-2xl hover:shadow-white/5`
                  }`}
                >
                  <span>{letter}</span>

                  {/* Little float bounce decoration inside active balloons */}
                  {!isUsed && (
                    <span className="absolute bottom-1 w-2.5 h-2.5 bg-white/20 rounded-full blur-xs"></span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Feedback Message Block */}
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`w-full p-4 rounded-2xl text-center mb-6 border font-black text-sm sm:text-base ${
                feedback.isCorrect === true
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : feedback.isCorrect === false
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
              }`}
            >
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* 1. Check answer button */}
          {!isRoundSolved && !showSolution && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckAnswer}
              className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-black px-8 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 text-base border border-teal-400/20"
            >
              <Icon name="CheckCircle" className="w-5 h-5 text-emerald-100" />
              <span>পরীক্ষা করো 🔍</span>
            </motion.button>
          )}

          {/* 2. Show correct answer sequence (only on success or failure showing solution) */}
          {(isRoundSolved || showSolution) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => speakSequence(correctBeforeLetter, currentLetterItem?.letter || '', correctAfterLetter)}
              className="bg-[#161b22] border border-[#30363d] hover:bg-[#21262d] text-[#f0f6fc] font-black px-6 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 text-sm"
            >
              <Icon name="Volume2" className="w-4 h-4 text-yellow-400" />
              <span>উচ্চারণ শোনো 🔊</span>
            </motion.button>
          )}

          {/* 3. Next / Skip button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextQuestion}
            className={`font-black px-8 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 text-base border transition-all ${
              isRoundSolved || showSolution
                ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white border-yellow-400/20'
                : 'bg-[#161b22] border-[#30363d] hover:bg-[#21262d] text-[#c9d1d9]'
            }`}
          >
            <span>{isRoundSolved || showSolution ? 'পরের প্রশ্ন 👉' : 'বাদ দাও ⏭️'}</span>
            <Icon name="ArrowRight" className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
