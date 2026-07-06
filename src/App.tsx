import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BENGALI_ALPHABET, KAR_SIGNS, KAR_WORDS_DATA, BENGALI_KAR_TEN_WORDS_DATA, BENGALI_KAR_CONJUNCT_WORDS_DATA, BENGALI_CONJUNCTS_USAGE_DATA, BENGALI_KAR_SENTENCES_DATA, BENGALI_PROGRESSIVE_SENTENCES, BENGALI_ANTONYMS, BENGALI_SADHU_CHOLIT, BENGALI_SYNONYMS } from './data';
import { BANGLA_STORIES, BanglaStory } from './data/stories';
import { JOINT_LETTERS_PAGES } from './data/jointLetters';
import { getEmojiImage } from './utils';
import { Icon } from './components/Icon';
import { Footer } from './components/Footer';
import { LetterDetailModal } from './components/DetailModals';
import { WordFlipCard } from './components/WordFlipCard';
const WordRearrange = React.lazy(() => import('./components/WordRearrange').then(m => ({ default: m.WordRearrange })));
const WordMatchingGame = React.lazy(() => import('./components/WordMatchingGame').then(m => ({ default: m.WordMatchingGame })));
const VocabularyStore = React.lazy(() => import('./components/VocabularyStore'));
const ClassOneBangla = React.lazy(() => import('./components/ClassOneBangla'));
const ClassWiseJointLetters = React.lazy(() => import('./components/ClassWiseJointLetters'));
const ClassThreeAssessment = React.lazy(() => import('./components/ClassThreeAssessment').then(m => ({ default: m.ClassThreeAssessment })));
const LearningProgressDashboard = React.lazy(() => import('./components/LearningProgressDashboard'));
const PronunciationPractice = React.lazy(() => import('./components/PronunciationPractice').then(m => ({ default: m.PronunciationPractice })));
const LetterTest = React.lazy(() => import('./components/LetterTest').then(m => ({ default: m.LetterTest })));
const TongueTwister = React.lazy(() => import('./components/TongueTwister').then(m => ({ default: m.TongueTwister })));
const LetterWordCircle = React.lazy(() => import('./components/LetterWordCircle').then(m => ({ default: m.LetterWordCircle })));
const Worksheet = React.lazy(() => import('./components/Worksheet').then(m => ({ default: m.Worksheet })));
const BeforeAfterLetter = React.lazy(() => import('./components/BeforeAfterLetter').then(m => ({ default: m.BeforeAfterLetter })));
const AlphabetSongSubTab = React.lazy(() => import('./components/AlphabetSongSubTab').then(m => ({ default: m.AlphabetSongSubTab })));
const OneWordContraction = React.lazy(() => import('./components/OneWordContraction').then(m => ({ default: m.OneWordContraction })));
const LetterMatra = React.lazy(() => import('./components/LetterMatra').then(m => ({ default: m.LetterMatra })));
const CodeEditor = React.lazy(() => import('./components/CodeEditor').then(m => ({ default: m.CodeEditor })));
import { AlphabetItem, KarSignItem, KarWordsGroup, QuizState, ConjunctUsageItem, KarSentencesGroup, KarSentenceItem, BanglaProgressiveSentence, BanglaProgressiveGroup, AntonymLevel, SadhuCholitLevel, SynonymLevel, SynonymItem } from './types';
import { generateTOTP, verifyTOTP } from './lib/totp';

const toBengaliNumber = (num: number): string => {
  const digits: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return num.toString().split('').map(d => digits[d] || d).join('');
};

export interface StrokeGuide {
  steps: string[];
  directions: string[];
  mascot: string;
  advice: string;
  strokeCount: number;
  funFact: string;
}

export function getStrokeGuide(letter: string): StrokeGuide {
  const guides: Record<string, Partial<StrokeGuide>> = {
    'অ': {
      steps: [
        'প্রথমে বাম থেকে ডানে সোজা মাত্রা দিন ➡️',
        'মাত্রা থেকে শুরু করে নিচে সুন্দর গোল বৃত্ত আঁকুন 🔄',
        'বৃত্ত থেকে ঘুরিয়ে নিচে নেমে ডানদিকে বাকিয়ে ওপরে তুলুন ⤴️',
        'সবশেষে ডান পাশে ওপর থেকে নিচে একটি সোজা খাড়া দাগ দিন ⬇️'
      ],
      directions: ['➡️', '🔄', '⤴️', '⬇️'],
      advice: 'প্রথমে ওপরের মাত্রা দাও, তারপর সুন্দর গোল করো সোনামণি!',
      funFact: 'স্বরবর্ণের প্রথম বর্ণ হলো "অ"! অজগর চলে হেলেদুলে!'
    },
    'আ': {
      steps: [
        'প্রথমে বাম থেকে ডানে সোজা মাত্রা দিন ➡️',
        'মাত্রা থেকে নিচে গোল বৃত্ত ঘুরিয়ে ডানদিকে ওপরে তুলুন (অ-এর মতো) 🔄',
        'ডান পাশে ওপর থেকে নিচে খাড়া দাগ দিন ⬇️',
        'তার সাথে ডানদিকে আকার (া) যুক্ত করুন ⬇️'
      ],
      directions: ['➡️', '🔄', '⬇️', '⬇️'],
      advice: '"অ" এর মতো লিখে পাশে একটি আকার জুড়ে দাও, হয়ে যাবে "আ"!',
      funFact: 'আম হলো ফলের রাজা! "আ" দিয়ে আম খেতে ভারী মজা!'
    },
    'ই': {
      steps: [
        'প্রথমে ওপরের সোজা মাত্রা দিন ➡️',
        'বামদিক থেকে গোল ঘুরিয়ে নিচে নেমে ওপরে গোল করুন 🔄',
        'সবশেষে মাথার ওপরে একটি সুন্দর উড়ানি বা লেজ এঁকে দিন ↗️'
      ],
      directions: ['➡️', '🔄', '↗️'],
      advice: 'মাথার ওপরের উড়ানিটি কিন্তু খুব চমৎকার, ওটা দিতে ভুলো না!',
      funFact: '"ই" দিয়ে ইলিশ ভাজা, খেতে ভারী মজা!'
    },
    'ঈ': {
      steps: [
        'প্রথমে বাম থেকে ডানে মাত্রা দিন ➡️',
        'নিচ থেকে ওপরে গোল করে নিচে নামুন, তারপর সোজা ওপরে উঠুন 🔄',
        'ডানদিকে বাকিয়ে নিচে নামুন ⬇️',
        'মাথার ওপরে সুন্দর উড়ানি এঁকে দিন ↗️'
      ],
      directions: ['➡️', '🔄', '⬇️', '↗️'],
      advice: 'ঈগলের মতো তীক্ষ্ণ চোখে সুন্দর করে ঈ লিখে ফেলো!',
      funFact: '"ঈ" দিয়ে ঈগল পাখি ওড়ে নীল আকাশে!'
    },
    'উ': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'মাত্রা থেকে শুরু করে নিচে গোল করে ডান পাশে ওপরে তুলুন 🔄',
        'মাথার ওপরে সুন্দর একটি উড়ানি বা ঝুঁটি দিন ↗️'
      ],
      directions: ['➡️', '🔄', '↗️'],
      advice: 'উটের মতো পিঠটা একটু গোল করে সুন্দর করে উ লেখো!',
      funFact: '"উ" দিয়ে উট চলেছে মরুর দেশে!'
    },
    'ঊ': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'উ-এর মতো গোল করে ডান পাশে ওপরে তুলুন 🔄',
        'নিচের দিকে আরেকটি ছোট বাঁক দিন ⬇️',
        'মাথার ওপরে সুন্দর ঝুঁটি বা উড়ানি এঁকে দিন ↗️'
      ],
      directions: ['➡️', '🔄', '⬇️', '↗️'],
      advice: 'উ-এর নিচে আরেকটি ছোট লেজ দিলে হয়ে যায় ঊ!',
      funFact: '"ঊ" দিয়ে ঊষা হাসে পুব আকাশে!'
    },
    'ঋ': {
      steps: [
        'কোনো মাত্রা নেই! বাম পাশে ছোট একটি ত্রিভুজাকৃতি করুন 📐',
        'নিচে নামিয়ে ওপরে উঠিয়ে ডান পাশে বাঁক দিন ↗️',
        'ডান পাশে একটি খাড়া দাগ দিন এবং অর্ধ-মাত্রা যোগ করুন ⬇️'
      ],
      directions: ['📐', '↗️', '⬇️'],
      advice: 'ঋ-এর কোনো মাত্রা হয় না, তাই ওপরের দাগ দেবে না!',
      funFact: '"ঋ" দিয়ে ঋষি বসে ধ্যান করেন বনে!'
    },
    'এ': {
      steps: [
        'কোনো মাত্রা নেই! বাম পাশে একটি ছোট বৃত্ত আঁকুন 🔄',
        'বৃত্ত থেকে ঘুরিয়ে ডানপাশে নিচে নেমে যান ↙️',
        'সবশেষে ডান পাশ থেকে সোজা ওপরে উঠিয়ে দিন ⬆️'
      ],
      directions: ['🔄', '↙️', '⬆️'],
      advice: 'একতারা যেমন সুন্দর, এ লিখতেও কিন্তু চমৎকার আনন্দ!',
      funFact: '"এ" দিয়ে একতারা বাজে সুরে সুরে!'
    },
    'ঐ': {
      steps: [
        'কোনো মাত্রা নেই! এ-এর মতো সুন্দর করে আঁকুন 🔄',
        'তার পিঠের ওপরে একটি সুন্দর উড়ানি বা ঝুঁটি জুড়ে দিন ↗️'
      ],
      directions: ['🔄', '↗️'],
      advice: 'এ-এর পিঠে চমৎকার একটি উড়ানি দিলে হয়ে যায় ঐ!',
      funFact: '"ঐ" দিয়ে ঐক্য গড়ে আমরা চলি একসাথে!'
    },
    'ও': {
      steps: [
        'কোনো মাত্রা নেই! ওপর থেকে শুরু করে গোল করে নিচে নামুন 🔄',
        'আবার ওপরে উঠে ডান পাশে বড় গোল করে দিন 🔄'
      ],
      directions: ['🔄', '🔄'],
      advice: 'ওজন মাপার যন্ত্রের মতো দুটো গোল সুন্দর করে মেলাও!',
      funFact: '"ও" দিয়ে ওল খেও না ধরবে গলা!'
    },
    'ঔ': {
      steps: [
        'কোনো মাত্রা নেই! ও-এর মতো সুন্দর করে আঁকুন 🔄',
        'ডানপাশে একটি সুন্দর উড়ানি বা ঝুঁটি জুড়ে দিন ↗️'
      ],
      directions: ['🔄', '↗️'],
      advice: 'ও-এর পাশে সুন্দর একটি উড়ানি দিলে হয়ে যায় ঔ!',
      funFact: '"ঔ" দিয়ে ঔষধ খেলে রোগ সারে!'
    },
    'ক': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'নিচে বাম দিকে নেমে কোণাকুণি ওপরে উঠুন 📐',
        'নিচে নামুন এবং ডানদিকে সুন্দর বক্ররেখা দিন 🔄',
        'ডান পাশে ওপর থেকে নিচে সোজা খাড়া দাগ দিন ⬇️'
      ],
      directions: ['➡️', '📐', '🔄', '⬇️'],
      advice: 'ব-এর মতো লিখে ডানপাশে একটি সুন্দর শুঁড় দিলে ক হয়ে যায়!',
      funFact: '"ক" দিয়ে কলম দিয়ে আমরা সুন্দর করে লিখি!'
    },
    'খ': {
      steps: [
        'অর্ধ-মাত্রা যুক্ত! প্রথমে বাম পাশে গোল বৃত্ত করে নিচে নামুন 🔄',
        'ডান পাশে ওপরে উঠে আবার নিচে নামুন ↗️',
        'ডানপাশে সোজা খাড়া দাগ দিন এবং ছোট অর্ধ-মাত্রা দিন ⬇️'
      ],
      directions: ['🔄', '↗️', '⬇️'],
      advice: 'খ-এর ওপরের মাত্রাটা শুধু খাড়া দাগের মাথায় হবে!',
      funFact: '"খ" দিয়ে খরগোশ চলে লাফিয়ে লাফিয়ে!'
    },
    'গ': {
      steps: [
        'অর্ধ-মাত্রা যুক্ত! প্রথমে বাম থেকে ঘুরিয়ে নিচে নামুন 🔄',
        'ডান পাশে সোজা খাড়া দাগ দিন ⬇️',
        'খাড়া দাগের মাথায় ছোট মাত্রা দিন ➡️'
      ],
      directions: ['🔄', '⬇️', '➡️'],
      advice: 'গ-এর বাম পাশের অংশটি দেখতে একটি সুন্দর চাঁদের মতো!',
      funFact: '"গ" দিয়ে গরু আমাদের দুধ দেয়!'
    },
    'ঘ': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'মাত্রা থেকে নিচে নেমে ওপরে উঠে আবার নিচে নামুন 🔄',
        'ডান পাশে সোজা ওপরে খাড়া দাগ দিন ⬆️'
      ],
      directions: ['➡️', '🔄', '⬆️'],
      advice: 'ঘড়ির কাঁটার মতো সুন্দর সোজা দাগ দিয়ে ঘ লেখো!',
      funFact: '"ঘ" দিয়ে ঘড়ি আমাদের সময় জানায়!'
    },
    'ঙ': {
      steps: [
        'কোনো মাত্রা নেই! প্রথমে বাম পাশের গোল অংশটি দিয়ে নিচে নামুন 🔄',
        'তারপর ডান পাশে সোজা ওপরে উঠে নিচে একটি লেজ দিন ⬇️'
      ],
      directions: ['🔄', '⬇️'],
      advice: 'ঙ-এর ওপরের অংশটি খুব সুন্দর বাঁকা করে আঁকবে!',
      funFact: '"ঙ" দিয়ে ব্যাং ডাকে কোলাহল করে!'
    },
    'চ': {
      steps: [
        'প্রথমে ওপরের সোজা মাত্রা দিন ➡️',
        'মাত্রা থেকে সোজা নিচে নেমে গোল করে ওপরে গিয়ে মাত্রা স্পর্শ করুন 🔄'
      ],
      directions: ['➡️', '🔄'],
      advice: 'চশমার মতো গোল নয়, এটি এক টানে সুন্দর করে আঁকো!',
      funFact: '"চ" দিয়ে চোখ আমাদের চারপাশ দেখতে সাহায্য করে!'
    },
    'ছ': {
      steps: [
        'প্রথমে ওপরের সোজা মাত্রা দিন ➡️',
        'চ-এর মতো একটি ছোট গোল বর্ণ এঁকে ফেলুন 🔄',
        'তার ঠিক নিচে একটি ছোট্ট লেজ যুক্ত করুন ⬇️'
      ],
      directions: ['➡️', '🔄', '⬇️'],
      advice: 'চ লিখে নিচে একটি চমৎকার ছোট লেজ ঝুলিয়ে দাও!',
      funFact: '"ছ" দিয়ে ছাতা আমাদের রোদ ও বৃষ্টি থেকে বাঁচায়!'
    },
    'জ': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'বাম দিক থেকে ঘুরিয়ে ওপরে উঠুন 🔄',
        'নিচের দিকে নেমে ডান পাশে সোজা ওপরে উঠিয়ে দিন ⬆️'
      ],
      directions: ['➡️', '🔄', '⬆️'],
      advice: 'জাহাজের মতো সুন্দর ভাসমান বাঁক দিয়ে জ লেখো!',
      funFact: '"জ" দিয়ে জাহাজ চলে গভীর সমুদ্রে!'
    },
    'ঝ': {
      steps: [
        'অর্ধ-মাত্রা যুক্ত! প্রথমে ওপর থেকে নিচে নেমে আবার ওপরে উঠুন 🔄',
        'ডান পাশে একটি খাড়া সোজা দাগ দিন এবং মাথার ওপরের অর্ধ-মাত্রা দিন ⬇️'
      ],
      directions: ['🔄', '⬇️'],
      advice: 'ঝ-এর বাম অংশটি বড় কিন্তু ডান অংশটি ছোট সোজা দাগ!',
      funFact: '"ঝ" দিয়ে ঝরনা বয়ে চলে পাহাড় বেয়ে!'
    },
    'ঞ': {
      steps: [
        'কোনো মাত্রা নেই! প্রথমে একটি ছোট্ট এ-এর মতো আঁকুন 🔄',
        'তার পিঠে একটি চমৎকার বোঝাসদৃশ কোণ যুক্ত করুন 📐'
      ],
      directions: ['🔄', '📐'],
      advice: 'ঞ-এর পিঠের বোঝাটি চমৎকার করে গোল করে বসাও!',
      funFact: '"ঞ" দিয়ে মিঞা সাহেব হাসেন খিলখিলিয়ে!'
    },
    'ট': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'মাত্রা থেকে কোণাকুণি নিচে নেমে গোল করে ওপরে উঠুন 🔄',
        'মাথার ওপরে সুন্দর উড়ানি দিন এবং নিচে ওপরে ঝুঁটি দিন ↗'
      ],
      directions: ['➡️', '🔄', '↗'],
      advice: 'ট-এর মাথার উড়ানিটি খুব সুন্দর বাতাসে ওড়ার মতো দাও!',
      funFact: '"ট" দিয়ে টিয়াপাখির ঠোঁটটি লাল!'
    },
    'ঠ': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'মাত্রা থেকে গোল লুপ করে নিচে নেমে আবার মাত্রা স্পর্শ করুন 🔄'
      ],
      directions: ['➡️', '🔄'],
      advice: 'ঠোঙার মতো সুন্দর গোল করে পুরো বর্ণটি এক টানে আঁকো!',
      funFact: '"ঠ" দিয়ে ঠাকুমা আমাদের মজার গল্প শোনায়!'
    },
    'ড': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'ডানদিক থেকে গোল করে নিচে নামুন, তারপর বামদিকে ওপরে উঠুন 🔄'
      ],
      directions: ['➡️', '🔄'],
      advice: 'ডমরুর মতো সুন্দর ড লিখে ফেলো কোনো কষ্ট ছাড়াই!',
      funFact: '"ড" দিয়ে ডাব খেতে ভারী মিষ্টি!'
    },
    'ঢ': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'মাত্রা থেকে নিচে নেমে ডানদিকে সোজা গোল গোল করুন 🔄'
      ],
      directions: ['➡️', '🔄'],
      advice: 'ট-এর মতো কিন্তু মাথার উড়ানি ছাড়া, এটিই হলো ঢ!',
      funFact: '"ঢ" দিয়ে ঢোল বাজে রিমঝিম রবে!'
    },
    'ণ': {
      steps: [
        'অর্ধ-মাত্রা যুক্ত! প্রথমে নিচের দিকে বৃত্ত করে ওপরে উঠুন 🔄',
        'ডান পাশে সোজা খাড়া দাগ দিন এবং অর্ধ-মাত্রা দিন ⬇️'
      ],
      directions: ['🔄', '⬇️'],
      advice: 'ণ-এর বামের বড় অংশটি একদম ওপরের মাত্রা স্পর্শ করবে না!',
      funFact: '"ণ" দিয়ে হরিণ থাকে সবুজ বনে!'
    },
    'ত': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'মাত্রা থেকে গোল গোল করে সুন্দর নিচে ঘুরে ওপরে তুলুন 🔄'
      ],
      directions: ['➡️', '🔄'],
      advice: 'অ-এর ভেতরের অংশটির মতো চমৎকার গোল গোল করো ত!',
      funFact: '"ত" দিয়ে তরমুজ খেতে খুব মিষ্টি ও রসালো!'
    },
    'থ': {
      steps: [
        'অর্ধ-মাত্রা যুক্ত! প্রথমে বাম পাশে গোল বৃত্ত করে নিচে নামুন 🔄',
        'ঘুরিয়ে সোজা ওপরে উঠে মাথার ওপরে অর্ধ-মাত্রা দিন ⬆️'
      ],
      directions: ['🔄', '⬆️'],
      advice: 'থালির মতো সুন্দর থ-এর গোল অংশটি দিয়ে শুরু করো!',
      funFact: '"থ" দিয়ে থালা ভরা আছে মজার ফল!'
    },
    'দ': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'মাত্রা থেকে বামে নেমে ডানে ও পুনরায় বামে নামুন 📐'
      ],
      directions: ['➡️', '📐'],
      advice: 'একটুখানি ঢেউ খেলিয়ে দ লিখে ফেলো ঝটপট!',
      funFact: '"দ" দিয়ে দাদামণি আমাদের ঘুরতে নিয়ে যান!'
    },
    'ধ': {
      steps: [
        'অর্ধ-মাত্রা যুক্ত! বাম দিক থেকে শুরু করে ত্রিভুজাকৃতি করুন 📐',
        'ডান পাশে সোজা খাড়া দাগ দিন ও অর্ধ-মাত্রা দিন ⬇️'
      ],
      directions: ['📐', '⬇️'],
      advice: 'ধ-এর আকৃতি ক-এর মতো কিন্তু বাম পাশে মাত্রা স্পর্শ করবে না!',
      funFact: '"ধ" দিয়ে ধান পাকে আমাদের মাঠে মাঠে!'
    },
    'ন': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'মাত্রা থেকে নিচে নেমে ছোট্ট বৃত্ত করে ডান পাশে ওপরে উঠুন 🔄'
      ],
      directions: ['➡️', '🔄'],
      advice: 'নদীর স্রোতের মতো সুন্দর করে নিচে গোল করে দাও!',
      funFact: '"ন" দিয়ে নদী বয়ে চলে এঁকেবেঁকে!'
    },
    'প': {
      steps: [
        'অর্ধ-মাত্রা যুক্ত! প্রথমে বাম পাশে সুন্দর হুক বা বাঁক দিন 🔄',
        'ডান পাশে সোজা খাড়া দাগ দিন ও ছোট অর্ধ-মাত্রা দিন ⬇️'
      ],
      directions: ['🔄', '⬇️'],
      advice: 'প-এর বাঁকটি পাখির ঠোঁটের মতো চমৎকার ও সূক্ষ্ম হবে!',
      funFact: '"প" দিয়ে পাখি ওড়ে ডানায় ভর করে!'
    },
    'ফ': {
      steps: [
        'প্রথমে ওপরের সোজা মাত্রা দিন ➡️',
        'মাত্রা থেকে নিচে নেমে আবার ওপরে গিয়ে পুনরায় নিচে নামুন 🔄',
        'ডান পাশে সোজা ওপরে উঠে মাত্রা স্পর্শ করুন ⬆️'
      ],
      directions: ['➡️', '🔄', '⬆️'],
      advice: 'ফুলের পাপড়ির মতো সুন্দর কয়েকটি বাঁক দিয়ে ফ লেখো!',
      funFact: '"ফ" দিয়ে ফুল ফোটে বাগানে বাগানে!'
    },
    'ব': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'বাম দিকে নেমে কোণাকুণি ওপরে উঠুন 📐',
        'ডান পাশে ওপর থেকে নিচে খাড়া দাগ দিন ⬇️'
      ],
      directions: ['➡️', '📐', '⬇️'],
      advice: 'ব হলো অনেক বর্ণের ভিত্তি! ব লিখতে পারলে অনেক বর্ণ সহজ হয়ে যাবে!',
      funFact: '"ব" দিয়ে বই পড়লে জ্ঞান বাড়ে!'
    },
    'ভ': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'মাত্রা থেকে নিচে বড় গোল বৃত্ত করে ওপরে স্পর্শ করুন 🔄'
      ],
      directions: ['➡️', '🔄'],
      advice: 'ত-এর মতো কিন্তু উল্টো করে নিচের দিকে বড় বেলুন করবে!',
      funFact: '"ভ" দিয়ে ভাল্লুক নাচে হেলেদুলে!'
    },
    'ম': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'মাত্রা থেকে নিচে নেমে গোল করে পুনরায় ওপরে উঠুন 🔄',
        'ডান পাশে সোজা নিচে খাড়া দাগ দিন ⬇️'
      ],
      directions: ['➡️', '🔄', '⬇️'],
      advice: 'মৌমাছির মতো সুন্দর একটি বৃত্ত দিয়ে ম শুরু করো সোনামণি!',
      funFact: '"ম" দিয়ে মা আমাদের সবচেয়ে প্রিয় ও আপন!'
    },
    'য': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'বাম পাশে সুন্দর গোল ভাঁজ করে সোজা নিচে নামুন 🔄',
        'ডান পাশে সোজা খাড়া দাগ দিন ⬇️'
      ],
      directions: ['➡️', '🔄', '⬇️'],
      advice: 'য-এর বাম দিকটি একটু ফোলা বেলুনের মতো হবে!',
      funFact: '"য" দিয়ে যাতা ঘোরে হাতের টানে!'
    },
    'র': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'ব-এর মতো সুন্দর করে আঁকুন 📐',
        'নিচে একটি সুন্দর গোল বিন্দু দিন 🔵'
      ],
      directions: ['➡️', '📐', '🔵'],
      advice: 'ব লিখে নিচে একটি সুন্দর বিন্দু দিলেই র হয়ে যাবে!',
      funFact: '"র" দিয়ে রাজহাঁসের গলাটি সুন্দর ও বাঁকা!'
    },
    'ল': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'মাত্রা থেকে পরপর দুটি গোল বাঁক দিয়ে নিচে নামুন 🔄',
        'ডান পাশে সোজা খাড়া দাগ দিন ⬇️'
      ],
      directions: ['➡️', '🔄', '⬇️'],
      advice: 'লাটিমের মতো দুটো সুন্দর ভাঁজ দাও মাত্রা থেকে!',
      funFact: '"ল" দিয়ে লাটিম ঘোরে বনবন করে!'
    },
    'শ': {
      steps: [
        'কোনো মাত্রা নেই! প্রথমে পরপর দুটি গোল গোল আঁকুন 🔄',
        'ডান পাশে ওপর থেকে নিচে সোজা খাড়া দাগ দিন ⬇️'
      ],
      directions: ['🔄', '⬇️'],
      advice: 'শ-এর কোনো মাত্রা নেই, এর বাঁকগুলো খুব সুন্দর করে মেলাবে!',
      funFact: '"শ" দিয়ে শাপলা আমাদের জাতীয় ফুল!'
    },
    'ষ': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'ব-এর মতো সুন্দর করে আঁকুন 📐',
        'পেটের মাঝখানে সোজা কোণাকুণি একটি কাটা দাগ দিন ✒️'
      ],
      directions: ['➡️', '📐', '✒️'],
      advice: 'ব লিখে তার পেটটি কোণাকুণি সুন্দর করে কেটে দিলেই ষ হয়ে যায়!',
      funFact: '"ষ" দিয়ে ষাঁড় চলে ক্ষেতের মাঝে!'
    },
    'স': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'বাম দিক থেকে নেমে ডাবল গোল করে নিচে নামুন 🔄',
        'ডান পাশে সোজা খাড়া দাগ দিন ⬇️'
      ],
      directions: ['➡️', '🔄', '⬇️'],
      advice: 'সিংহের মতো গর্জন করে সুন্দর সাড়াসারি সোজা দাগ দাও!',
      funFact: '"স" দিয়ে সিংহ হলো বনের রাজা!'
    },
    'হ': {
      steps: [
        'প্রথমে ওপরের মাত্রা দিন ➡️',
        'মাত্রা থেকে গোল করে নিচে নামুন, তারপর বামদিকে বেঁকে যান 🔄'
      ],
      directions: ['➡️', '🔄'],
      advice: 'হংসের মতো সুন্দর এক টানে হ লিখে ফেলো সোনামণি!',
      funFact: '"হ" দিয়ে হাতি চলে হেলেদুলে!'
    }
  };

  const defaultGuide: StrokeGuide = {
    steps: [
      'প্রথমে ওপরের মাত্রা থাকলে মাত্রা দিন ➡️',
      'তারপর বর্ণের কাঠামো বা গোল অংশটি সুন্দর করে আঁকুন 🔄',
      'ডান পাশে খাড়া দাগ থাকলে ওপর থেকে নিচে টানুন ⬇️',
      'ধীরে ধীরে সুন্দর করে বর্ণটি সম্পূর্ণ করুন ✨'
    ],
    directions: ['➡️', '🔄', '⬇️', '✨'],
    mascot: '🐱',
    advice: 'ধীরে ধীরে হাত ঘুরিয়ে সুন্দর করে বর্ণটি লিখে ফেলো!',
    strokeCount: 3,
    funFact: `আসুন আমরা "${letter}" বর্ণটি সুন্দর করে লিখতে শিখি!`
  };

  const selected = guides[letter] || {};
  return {
    steps: selected.steps || defaultGuide.steps,
    directions: selected.directions || defaultGuide.directions,
    mascot: selected.mascot || (letter.charCodeAt(0) % 2 === 0 ? '🦊' : '🐼'),
    advice: selected.advice || defaultGuide.advice,
    strokeCount: selected.steps ? selected.steps.length : defaultGuide.strokeCount,
    funFact: selected.funFact || defaultGuide.funFact
  };
}

export interface StrokeMarker {
  x: number;
  y: number;
  number: number;
  angle: number;
  label: string;
}

export function getLetterMarkers(letter: string): StrokeMarker[] {
  const markerMap: Record<string, StrokeMarker[]> = {
    'অ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 60, y: 80, number: 2, angle: 180, label: "🔄" },
      { x: 100, y: 145, number: 3, angle: -45, label: "⤴️" },
      { x: 155, y: 60, number: 4, angle: 90, label: "⬇️" }
    ],
    'আ': [
      { x: 40, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 60, y: 80, number: 2, angle: 180, label: "🔄" },
      { x: 135, y: 60, number: 3, angle: 90, label: "⬇️" },
      { x: 165, y: 60, number: 4, angle: 90, label: "⬇️" }
    ],
    'ই': [
      { x: 50, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 70, y: 85, number: 2, angle: 180, label: "🔄" },
      { x: 100, y: 25, number: 3, angle: 45, label: "↗️" }
    ],
    'ঈ': [
      { x: 50, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 80, y: 90, number: 2, angle: 90, label: "🔄" },
      { x: 145, y: 110, number: 3, angle: 90, label: "⬇️" },
      { x: 100, y: 25, number: 4, angle: 45, label: "↗️" }
    ],
    'উ': [
      { x: 50, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 75, y: 90, number: 2, angle: 180, label: "🔄" },
      { x: 100, y: 25, number: 3, angle: 45, label: "↗️" }
    ],
    'ঊ': [
      { x: 50, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 75, y: 90, number: 2, angle: 180, label: "🔄" },
      { x: 135, y: 140, number: 3, angle: 90, label: "⬇️" },
      { x: 105, y: 25, number: 4, angle: 45, label: "↗️" }
    ],
    'ঋ': [
      { x: 50, y: 95, number: 1, angle: 45, label: "📐" },
      { x: 100, y: 115, number: 2, angle: 45, label: "↗️" },
      { x: 155, y: 85, number: 3, angle: 90, label: "⬇️" }
    ],
    'এ': [
      { x: 55, y: 105, number: 1, angle: 180, label: "🔄" },
      { x: 95, y: 150, number: 2, angle: -135, label: "↙️" },
      { x: 145, y: 85, number: 3, angle: -90, label: "⬆️" }
    ],
    'ঐ': [
      { x: 55, y: 105, number: 1, angle: 180, label: "🔄" },
      { x: 95, y: 150, number: 2, angle: -135, label: "↙️" },
      { x: 145, y: 85, number: 3, angle: -90, label: "⬆️" },
      { x: 115, y: 35, number: 4, angle: 45, label: "↗️" }
    ],
    'ও': [
      { x: 80, y: 75, number: 1, angle: 180, label: "🔄" },
      { x: 115, y: 130, number: 2, angle: 0, label: "🔄" }
    ],
    'ঔ': [
      { x: 80, y: 75, number: 1, angle: 180, label: "🔄" },
      { x: 115, y: 130, number: 2, angle: 0, label: "🔄" },
      { x: 155, y: 65, number: 3, angle: 45, label: "↗️" }
    ],
    'ক': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 75, y: 100, number: 2, angle: 45, label: "📐" },
      { x: 125, y: 105, number: 3, angle: 0, label: "🔄" },
      { x: 155, y: 60, number: 4, angle: 90, label: "⬇️" }
    ],
    'খ': [
      { x: 55, y: 105, number: 1, angle: 180, label: "🔄" },
      { x: 110, y: 125, number: 2, angle: 45, label: "↗️" },
      { x: 155, y: 85, number: 3, angle: 90, label: "⬇️" }
    ],
    'গ': [
      { x: 65, y: 110, number: 1, angle: 180, label: "🔄" },
      { x: 155, y: 85, number: 2, angle: 90, label: "⬇️" },
      { x: 150, y: 40, number: 3, angle: 0, label: "➡️" }
    ],
    'ঘ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 80, y: 115, number: 2, angle: 180, label: "🔄" },
      { x: 155, y: 65, number: 3, angle: -90, label: "⬆️" }
    ],
    'ঙ': [
      { x: 70, y: 85, number: 1, angle: 180, label: "🔄" },
      { x: 135, y: 120, number: 2, angle: 90, label: "⬇️" }
    ],
    'চ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 85, y: 115, number: 2, angle: 180, label: "🔄" },
      { x: 155, y: 60, number: 3, angle: 90, label: "⬇️" }
    ],
    'ছ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 75, y: 95, number: 2, angle: 180, label: "🔄" },
      { x: 115, y: 145, number: 3, angle: 90, label: "⬇️" },
      { x: 155, y: 60, number: 4, angle: 90, label: "⬇️" }
    ],
    'জ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 65, y: 95, number: 2, angle: 180, label: "🔄" },
      { x: 125, y: 115, number: 3, angle: -45, label: "↗️" },
      { x: 155, y: 80, number: 4, angle: 90, label: "⬇️" }
    ],
    'ঝ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 75, y: 95, number: 2, angle: 180, label: "🔄" },
      { x: 155, y: 70, number: 3, angle: 90, label: "⬇️" }
    ],
    'ঞ': [
      { x: 60, y: 85, number: 1, angle: 180, label: "🔄" },
      { x: 140, y: 115, number: 2, angle: 0, label: "🔄" }
    ],
    'ট': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 90, y: 105, number: 2, angle: 180, label: "🔄" },
      { x: 100, y: 20, number: 3, angle: 45, label: "↗️" }
    ],
    'ঠ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 100, y: 105, number: 2, angle: 180, label: "🔄" }
    ],
    'ড': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 100, y: 100, number: 2, angle: 180, label: "🔄" }
    ],
    'ঢ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 100, y: 100, number: 2, angle: 180, label: "🔄" }
    ],
    'ণ': [
      { x: 75, y: 115, number: 1, angle: 180, label: "🔄" },
      { x: 155, y: 85, number: 2, angle: 90, label: "⬇️" }
    ],
    'ত': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 100, y: 100, number: 2, angle: 180, label: "🔄" }
    ],
    'থ': [
      { x: 65, y: 85, number: 1, angle: 180, label: "🔄" },
      { x: 115, y: 125, number: 2, angle: 0, label: "↗️" },
      { x: 155, y: 85, number: 3, angle: 90, label: "⬇️" }
    ],
    'দ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 95, y: 105, number: 2, angle: 180, label: "🔄" }
    ],
    'ধ': [
      { x: 65, y: 75, number: 1, angle: 180, label: "🔄" },
      { x: 105, y: 110, number: 2, angle: 0, label: "🔄" },
      { x: 155, y: 85, number: 3, angle: 90, label: "⬇️" }
    ],
    'ন': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 80, y: 110, number: 2, angle: 180, label: "🔄" },
      { x: 155, y: 60, number: 3, angle: 90, label: "⬇️" }
    ],
    'প': [
      { x: 65, y: 90, number: 1, angle: 180, label: "🔄" },
      { x: 110, y: 135, number: 2, angle: 0, label: "➡️" },
      { x: 155, y: 80, number: 3, angle: 90, label: "⬇️" }
    ],
    'ফ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 80, y: 105, number: 2, angle: 180, label: "🔄" },
      { x: 155, y: 60, number: 3, angle: 90, label: "⬇️" }
    ],
    'ব': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 90, y: 100, number: 2, angle: 180, label: "🔄" },
      { x: 155, y: 60, number: 3, angle: 90, label: "⬇️" }
    ],
    'ভ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 65, y: 85, number: 2, angle: 180, label: "🔄" },
      { x: 110, y: 130, number: 3, angle: 0, label: "➡️" },
      { x: 155, y: 60, number: 4, angle: 90, label: "⬇️" }
    ],
    'ম': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 75, y: 105, number: 2, angle: 180, label: "🔄" },
      { x: 155, y: 60, number: 3, angle: 90, label: "⬇️" }
    ],
    'য': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 85, y: 100, number: 2, angle: 180, label: "🔄" },
      { x: 155, y: 60, number: 3, angle: 90, label: "⬇️" }
    ],
    'র': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 90, y: 100, number: 2, angle: 180, label: "🔄" },
      { x: 155, y: 60, number: 3, angle: 90, label: "⬇️" },
      { x: 100, y: 160, number: 4, angle: 0, label: "🟢" }
    ],
    'ল': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 80, y: 105, number: 2, angle: 180, label: "🔄" },
      { x: 155, y: 60, number: 3, angle: 90, label: "⬇️" }
    ],
    'শ': [
      { x: 60, y: 80, number: 1, angle: 180, label: "🔄" },
      { x: 110, y: 105, number: 2, angle: 0, label: "➡️" },
      { x: 155, y: 70, number: 3, angle: 90, label: "⬇️" }
    ],
    'ষ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 90, y: 100, number: 2, angle: 180, label: "🔄" },
      { x: 95, y: 105, number: 3, angle: 45, label: "↘️" },
      { x: 155, y: 60, number: 4, angle: 90, label: "⬇️" }
    ],
    'স': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 90, y: 100, number: 2, angle: 180, label: "🔄" },
      { x: 155, y: 60, number: 3, angle: 90, label: "⬇️" }
    ],
    'হ': [
      { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
      { x: 90, y: 80, number: 2, angle: 180, label: "🔄" }
    ]
  };

  const defaultMarkers: StrokeMarker[] = [
    { x: 45, y: 40, number: 1, angle: 0, label: "➡️" },
    { x: 100, y: 100, number: 2, angle: 180, label: "🔄" },
    { x: 155, y: 80, number: 3, angle: 90, label: "⬇️" }
  ];

  return markerMap[letter] || defaultMarkers;
}

const CONSONANTS_LIST = [
  'ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ',
  'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন',
  'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ',
  'স', 'হ', 'ড়', 'ঢ়', 'য়'
];

const KAR_VOWELS_MAPPING = [
  { vowel: 'আ', kar: 'া', name: 'আ-কার', color: 'from-rose-500/10 via-red-500/5 to-transparent', textCol: 'text-red-400', borderCol: 'border-red-500/30', badgeBg: 'bg-red-500/10 text-red-400 border-red-500/20' },
  { vowel: 'ই', kar: 'ি', name: 'ই-কার', color: 'from-amber-500/10 via-orange-500/5 to-transparent', textCol: 'text-orange-400', borderCol: 'border-orange-500/30', badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  { vowel: 'ঈ', kar: 'ী', name: 'ঈ-কার', color: 'from-yellow-500/10 via-yellow-600/5 to-transparent', textCol: 'text-yellow-400', borderCol: 'border-yellow-500/30', badgeBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  { vowel: 'উ', kar: 'ু', name: 'উ-কার', color: 'from-green-500/10 via-emerald-500/5 to-transparent', textCol: 'text-emerald-400', borderCol: 'border-emerald-500/30', badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { vowel: 'ঊ', kar: 'ূ', name: 'ঊ-কার', color: 'from-teal-500/10 via-cyan-500/5 to-transparent', textCol: 'text-teal-400', borderCol: 'border-teal-500/30', badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
  { vowel: 'ঋ', kar: 'ৃ', name: 'ঋ-কার', color: 'from-cyan-500/10 via-blue-500/5 to-transparent', textCol: 'text-cyan-400', borderCol: 'border-cyan-500/30', badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  { vowel: 'এ', kar: 'ে', name: 'এ-কার', color: 'from-blue-500/10 via-indigo-500/5 to-transparent', textCol: 'text-blue-400', borderCol: 'border-blue-500/30', badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { vowel: 'ঐ', kar: 'ৈ', name: 'ঐ-কার', color: 'from-indigo-500/10 via-violet-500/5 to-transparent', textCol: 'text-indigo-400', borderCol: 'border-indigo-500/30', badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  { vowel: 'ও', kar: 'ো', name: 'ও-কার', color: 'from-purple-500/10 via-fuchsia-500/5 to-transparent', textCol: 'text-purple-400', borderCol: 'border-purple-500/30', badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  { vowel: 'ঔ', kar: 'ৌ', name: 'ঔ-কার', color: 'from-pink-500/10 via-rose-500/5 to-transparent', textCol: 'text-pink-400', borderCol: 'border-pink-500/30', badgeBg: 'bg-pink-500/10 text-pink-400 border-pink-500/20' }
];

export interface PracticeQuestion {
  type: string;
  questionText: string;
  content: string;
  correctAnswer: string;
  options: string[];
  extra: {
    soundText?: string;
    emoji?: string;
    img?: string;
  };
}

export function generatePracticeQuestion(): PracticeQuestion {
  const types = ['bengali_letter', 'bengali_word', 'kar_sign', 'antonym', 'sadhu_cholit', 'vowel_consonant'];
  const chosenType = types[Math.floor(Math.random() * types.length)];
  
  let questionText = '';
  let content = '';
  let correctAnswer = '';
  let options: string[] = [];
  let extra: any = {};

  if (chosenType === 'bengali_letter') {
    const item = BENGALI_ALPHABET[Math.floor(Math.random() * BENGALI_ALPHABET.length)];
    questionText = 'এই বাংলা বর্ণটি সনাক্ত করো:';
    content = item.letter;
    correctAnswer = item.letter;
    extra = { soundText: item.letter };
    
    const wrongs = BENGALI_ALPHABET.filter(i => i.letter !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(i => i.letter);
    options = [...wrongs, correctAnswer].sort(() => 0.5 - Math.random());

  } else if (chosenType === 'bengali_word') {
    const randLetter = BENGALI_ALPHABET[Math.floor(Math.random() * BENGALI_ALPHABET.length)];
    const randWord = randLetter.words[Math.floor(Math.random() * randLetter.words.length)];
    questionText = 'এই ছবি/ইমোজিটি কোন শব্দ প্রকাশ করে?';
    content = randWord.word;
    correctAnswer = randWord.word;
    extra = { emoji: randWord.emoji, img: randWord.img, soundText: randWord.word };

    const allWords: string[] = [];
    BENGALI_ALPHABET.forEach(l => {
      l.words.forEach(w => {
        if (w.word !== randWord.word) allWords.push(w.word);
      });
    });
    const wrongs = allWords.sort(() => 0.5 - Math.random()).slice(0, 3);
    options = [...wrongs, correctAnswer].sort(() => 0.5 - Math.random());

  } else if (chosenType === 'kar_sign') {
    const validSigns = KAR_SIGNS.filter(s => s.kar !== '');
    const sign = validSigns[Math.floor(Math.random() * validSigns.length)];
    questionText = `"${sign.kar}" কার চিহ্নটির নাম কী?`;
    content = sign.kar;
    correctAnswer = sign.meaning;
    extra = { soundText: sign.meaning };

    const wrongs = validSigns.filter(s => s.meaning !== sign.meaning)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(s => s.meaning);
    options = [...wrongs, correctAnswer].sort(() => 0.5 - Math.random());

  } else if (chosenType === 'antonym') {
    const level = BENGALI_ANTONYMS[Math.floor(Math.random() * BENGALI_ANTONYMS.length)];
    const item = level.words[Math.floor(Math.random() * level.words.length)];
    questionText = `"${item.word}" শব্দটির বিপরীত শব্দ কী?`;
    content = item.word;
    correctAnswer = item.antonym;
    extra = { soundText: item.word };

    const allWrongAntonyms: string[] = [];
    BENGALI_ANTONYMS.forEach(lvl => {
      lvl.words.forEach(w => {
        if (w.antonym !== item.antonym) allWrongAntonyms.push(w.antonym);
      });
    });
    const wrongs = allWrongAntonyms.sort(() => 0.5 - Math.random()).slice(0, 3);
    options = [...wrongs, correctAnswer].sort(() => 0.5 - Math.random());

  } else if (chosenType === 'sadhu_cholit') {
    const level = BENGALI_SADHU_CHOLIT[Math.floor(Math.random() * BENGALI_SADHU_CHOLIT.length)];
    const item = level.words[Math.floor(Math.random() * level.words.length)];
    questionText = `"${item.sadhu}" সাধু শব্দটির চলিত রূপ কী?`;
    content = item.sadhu;
    correctAnswer = item.cholit;
    extra = { soundText: item.sadhu };

    const allWrongCholit: string[] = [];
    BENGALI_SADHU_CHOLIT.forEach(lvl => {
      lvl.words.forEach(w => {
        if (w.cholit !== item.cholit) allWrongCholit.push(w.cholit);
      });
    });
    const wrongs = allWrongCholit.sort(() => 0.5 - Math.random()).slice(0, 3);
    options = [...wrongs, correctAnswer].sort(() => 0.5 - Math.random());

  } else {
    const item = BENGALI_ALPHABET[Math.floor(Math.random() * BENGALI_ALPHABET.length)];
    questionText = `"${item.letter}" বর্ণটি কী ধরনের বর্ণ?`;
    content = item.letter;
    correctAnswer = item.type === 'vowel' ? 'স্বরবর্ণ' : 'ব্যঞ্জনবর্ণ';
    extra = { soundText: item.letter };
    options = ['স্বরবর্ণ', 'ব্যঞ্জনবর্ণ'];
  }

  return {
    type: chosenType,
    questionText,
    content,
    correctAnswer,
    options,
    extra
  };
}

export function playSuccessSound() {
  if (typeof window !== 'undefined' && localStorage.getItem('isAudioMuted') === 'true') return;
  if (typeof window !== 'undefined' && localStorage.getItem('bangla_chimes_enabled') === 'false') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Joyful sparkling rising chime notes: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.08;
      
      // Dual oscillators for a richer chime and brass trumpet-like resonance
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, startTime);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, startTime); // Higher octave shimmer
      
      gain.gain.setValueAtTime(0, startTime);
      // Soft fast attack for a pleasing bell-like chime
      gain.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
      // Exponential decay to fade out nicely
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start(startTime);
      osc2.start(startTime);
      
      osc1.stop(startTime + 0.45);
      osc2.stop(startTime + 0.45);
    });
  } catch (e) {
    console.error("Failed to play success sound:", e);
  }
}

export function playStrokeSegmentSound(index: number, total: number) {
  if (typeof window !== 'undefined' && localStorage.getItem('isAudioMuted') === 'true') return;
  if (typeof window !== 'undefined' && localStorage.getItem('bangla_chimes_enabled') === 'false') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Ascending C major pentatonic scale for child-friendly sweet xylophone sounds
    // C5, D5, E5, G5, A5, C6
    const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    const freq = notes[index % notes.length];
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Soft triangle wave resembling a wooden mallet marimba/xylophone
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Add a tiny upper frequency slide-up for playful, bouncy acoustics
    osc.frequency.exponentialRampToValueAtTime(freq * 1.04, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.14);
  } catch (e) {
    console.error("Failed to play stroke sound:", e);
  }
}

export function playWhooshSound() {
  if (typeof window !== 'undefined' && localStorage.getItem('isAudioMuted') === 'true') return;
  if (typeof window !== 'undefined' && localStorage.getItem('bangla_chimes_enabled') === 'false') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'triangle';
    
    const startTime = ctx.currentTime;
    const duration = 0.3; // 300ms
    
    // Smooth frequency slide for a synthesized sweep
    osc.frequency.setValueAtTime(150, startTime);
    osc.frequency.exponentialRampToValueAtTime(450, startTime + 0.12);
    osc.frequency.exponentialRampToValueAtTime(100, startTime + duration);
    
    // Lowpass filter frequency sweep to shape the tone into a smooth whoosh/swell
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(4, startTime);
    filter.frequency.setValueAtTime(300, startTime);
    filter.frequency.exponentialRampToValueAtTime(1100, startTime + 0.12);
    filter.frequency.exponentialRampToValueAtTime(180, startTime + duration);
    
    // Soft volume envelope (fade-in and exponential decay) to prevent click pops
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.06, startTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  } catch (e) {
    console.error("Failed to play whoosh sound:", e);
  }
}

export const QUIZ_SUBSETS = [
  { id: 'all', name: 'সব বর্ণ', english: 'All Letters', letters: ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ', 'ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ', 'ড়', 'ঢ়', 'য়', 'ৎ', 'ং', 'ঃ', 'ঁ'] },
  { id: 'vowels', name: 'শুধু স্বরবর্ণ', english: 'Vowels Only', letters: ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'] },
  { id: 'consonants', name: 'শুধু ব্যঞ্জনবর্ণ', english: 'Consonants Only', letters: ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ', 'ড়', 'ঢ়', 'য়', 'ৎ', 'ং', 'ঃ', 'ঁ'] },
  { id: 'ka_barga', name: 'ক-বর্গ (ক - ঙ)', english: 'Velar (Ka-Ng)', letters: ['ক', 'খ', 'গ', 'ঘ', 'ঙ'] },
  { id: 'cha_barga', name: 'চ-বর্গ (চ - ঞ)', english: 'Palatal (Cha-Nyo)', letters: ['চ', 'ছ', 'জ', 'ঝ', 'ঞ'] },
  { id: 'ta_barga_retro', name: 'ট-বর্গ (ট - ণ)', english: 'Retroflex (Ta-Nha)', letters: ['ট', 'ঠ', 'ড', 'ঢ', 'ণ'] },
  { id: 'ta_barga_dental', name: 'ত-বর্গ (ত - ন)', english: 'Dental (Ta-Na)', letters: ['ত', 'থ', 'দ', 'ধ', 'ন'] },
  { id: 'pa_barga', name: 'প-বর্গ (প - ম)', english: 'Labial (Pa-Ma)', letters: ['প', 'ফ', 'ব', 'ভ', 'ম'] },
  { id: 'others', name: 'অন্যান্য ব্যঞ্জনবর্ণ', english: 'Other Consonants', letters: ['য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ', 'ড়', 'ঢ়', 'য়', 'ৎ', 'ং', 'ঃ', 'ঁ'] },
];

// Deep clones of pristine data structures to dynamically support premium custom image overrides
const PRISTINE_BENGALI_ALPHABET = JSON.parse(JSON.stringify(BENGALI_ALPHABET));
const PRISTINE_KAR_WORDS_DATA = JSON.parse(JSON.stringify(KAR_WORDS_DATA));
const PRISTINE_KAR_TEN_WORDS_DATA = JSON.parse(JSON.stringify(BENGALI_KAR_TEN_WORDS_DATA));
const PRISTINE_KAR_CONJUNCT_WORDS_DATA = JSON.parse(JSON.stringify(BENGALI_KAR_CONJUNCT_WORDS_DATA));
const PRISTINE_CONJUNCTS_USAGE_DATA = JSON.parse(JSON.stringify(BENGALI_CONJUNCTS_USAGE_DATA));
const PRISTINE_KAR_SENTENCES_DATA = JSON.parse(JSON.stringify(BENGALI_KAR_SENTENCES_DATA));
const PRISTINE_PROGRESSIVE_SENTENCES = JSON.parse(JSON.stringify(BENGALI_PROGRESSIVE_SENTENCES));
const PRISTINE_BANGLA_STORIES = JSON.parse(JSON.stringify(BANGLA_STORIES));

interface DailyChallenge {
  id: string;
  bnTitle: string;
  bnDescription: string;
  title: string;
  description: string;
  targetMode: 'learn' | 'words' | 'kar' | 'dotted' | 'write' | 'karWords' | 'karTenWords' | 'rearrange' | 'wordMatching' | 'jointLetters' | 'karConjunctWords' | 'conjunctUsage' | 'consonantKar' | 'consonantKarTable' | 'karSentences' | 'progSentences' | 'quiz' | 'antonyms' | 'sadhuCholit' | 'stories' | 'tongueTwister' | 'practice' | 'pronouncePractice' | 'vowelTest' | 'consonantTest' | 'beforeAfterLetter' | 'letterWordCircle' | 'worksheet';
  targetCount: number;
  icon: string;
  rewardPoints: number;
}

const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'vowels-trace',
    title: 'Trace 5 vowels',
    description: 'Write or trace 5 vowel letters to master Bengali vowels',
    bnTitle: '৫টি স্বরবর্ণ লিখন ✏️',
    bnDescription: 'পেন্সিল দিয়ে বা ডটেড মোডে ৫টি স্বরবর্ণ (অ-ঔ) সুন্দর করে লিখে শেষ করো!',
    targetMode: 'write',
    targetCount: 5,
    icon: '✏️',
    rewardPoints: 50
  },
  {
    id: 'quiz-o',
    title: 'Complete a quiz',
    description: 'Solve questions correctly in quiz mode',
    bnTitle: 'চমৎকার কুইজ খেলো ❓',
    bnDescription: 'কুইজ বা প্র্যাকটিস মোডে গিয়ে যেকোনো কুইজ প্রশ্নের সঠিক উত্তর দাও!',
    targetMode: 'quiz',
    targetCount: 1,
    icon: '❓',
    rewardPoints: 40
  },
  {
    id: 'words-learn',
    title: 'Learn 5 vocabulary words',
    description: 'Listen to the pronunciation and meaning of 5 words',
    bnTitle: '৫টি নতুন শব্দ শোনো 📖',
    bnDescription: 'শব্দ শিখো (📖) মোডে গিয়ে যেকোনো ৫টি চমৎকার বাংলা শব্দের উচ্চারণ শোনো!',
    targetMode: 'words',
    targetCount: 5,
    icon: '📖',
    rewardPoints: 30
  },
  {
    id: 'consonant-k',
    title: "Practice writing consonant 'ক'",
    description: "Draw and trace the letter 'ক' to perfect its shape",
    bnTitle: "'ক' বর্ণটি ৩ বার লিখো 🎨",
    bnDescription: "বর্ণ লিখন মোডে গিয়ে ব্যঞ্জনবর্ণের প্রথম বর্ণ 'ক' ৩ বার সুন্দর করে হাত ঘুরিয়ে লিখো!",
    targetMode: 'write',
    targetCount: 3,
    icon: '🎨',
    rewardPoints: 45
  },
  {
    id: 'rearrange-solve',
    title: 'Form 3 words from scrambled letters',
    description: 'Solve scrambled letters to form correct words',
    bnTitle: '৩টি এলোমেলো শব্দ সাজাও 🧩',
    bnDescription: 'বর্ণ দিয়ে শব্দ সাজানো (🧩) খেলায় ৩টি এলোমেলো বর্ণ দিয়ে সঠিক বাংলা শব্দ তৈরি করো!',
    targetMode: 'rearrange',
    targetCount: 3,
    icon: '🧩',
    rewardPoints: 50
  },
  {
    id: 'kar-signs',
    title: "Learn 3 'Kar' signs",
    description: 'Understand the usage of vowel signs in Bengali words',
    bnTitle: '৩টি কার চিহ্ন শেখো ✨',
    bnDescription: 'কার চিহ্ন (✨) মোডে গিয়ে ৩টি ভিন্ন স্বরচিহ্ন দিয়ে শব্দ তৈরি শেখো!',
    targetMode: 'kar',
    targetCount: 3,
    icon: '✨',
    rewardPoints: 35
  },
  {
    id: 'story-read',
    title: 'Read 1 beautiful Bengali story',
    description: 'Enjoy reading a classic Bengali fairy tale or moral story',
    bnTitle: '১টি চমৎকার বাংলা গল্প পড়ো 📚',
    bnDescription: 'বাংলা গল্প (📚) মোডে গিয়ে তোমার প্রিয় যেকোনো ১টি সুন্দর শিক্ষণীয় রূপকথার গল্প পড়ো!',
    targetMode: 'stories',
    targetCount: 1,
    icon: '📚',
    rewardPoints: 60
  },
  {
    id: 'sentences-practice',
    title: 'Practice 5 simple sentences',
    description: 'Read and hear simple Bengali sentences',
    bnTitle: '৫টি সহজ বাক্য শোনো 💬',
    bnDescription: 'কার চিহ্ন দিয়ে বাক্য (📖) মোডে গিয়ে অন্তত ৫টি আকর্ষণীয় বাক্য স্পর্শ করে উচ্চারণসহ শোনো!',
    targetMode: 'karSentences',
    targetCount: 5,
    icon: '💬',
    rewardPoints: 40
  },
  {
    id: 'antonyms-match',
    title: 'Match 3 opposite words',
    description: 'Learn antonyms and their vocabulary meanings',
    bnTitle: '৩টি বিপরীত শব্দ শেখো 🔄',
    bnDescription: 'বিপরীত শব্দ (✨) মোডে গিয়ে যেকোনো ৩টি বিপরীত শব্দ স্পর্শ করে তাদের উচ্চারণ শোনো!',
    targetMode: 'antonyms',
    targetCount: 3,
    icon: '🔄',
    rewardPoints: 45
  },
  {
    id: 'kar-words',
    title: "Practice 5 words with 'Aa' sound",
    description: "Explore words that use the 'Aa' vowel sign",
    bnTitle: 'আ-কার যুক্ত ৫টি শব্দ শোনো ✍️',
    bnDescription: "কার দিয়ে শব্দ শিখো (✍️) মোডে গিয়ে 'আ-কার (া)' যুক্ত ৫টি শব্দের উচ্চারণ স্পর্শ করে শোনো!",
    targetMode: 'karWords',
    targetCount: 5,
    icon: '✍️',
    rewardPoints: 35
  }
];

const getDailyChallengeTodayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getDailyChallengeForToday = () => {
  const dateStr = getDailyChallengeTodayStr();
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % DAILY_CHALLENGES.length;
  return {
    dateStr,
    challenge: DAILY_CHALLENGES[index]
  };
};

const KAR_TABLE_PAGE1_CONSONANTS = ['ক', 'খ', 'গ', 'ঘ', 'চ', 'ছ', 'জ', 'ঝ', 'ট', 'ঠ', 'ড', 'ঢ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ'];
const KAR_TABLE_PAGE2_CONSONANTS = ['ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ'];

export default function App() {
  const [audioReady, setAudioReady] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<AlphabetItem | null>(null);
  const [hoveredLetter, setHoveredLetter] = useState<AlphabetItem | null>(null);

  const dailyChallenge = useMemo(() => getDailyChallengeForToday().challenge, []);

  // Daily Challenge States
  const [dailyProgress, setDailyProgress] = useState<number>(() => {
    try {
      const todayStr = getDailyChallengeTodayStr();
      const stored = localStorage.getItem(`bangla_daily_progress_${todayStr}`);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [dailyCompleted, setDailyCompleted] = useState<boolean>(() => {
    try {
      const todayStr = getDailyChallengeTodayStr();
      return localStorage.getItem(`bangla_daily_completed_${todayStr}`) === 'true';
    } catch {
      return false;
    }
  });

  const [showChallengeCelebration, setShowChallengeCelebration] = useState(false);
  const [activeTab, setActiveTab] = useState<'vowel' | 'consonant'>('vowel');
  const [selectedQuizSubset, setSelectedQuizSubset] = useState<string>('all');
  const [activeMode, setActiveMode] = useState<'learn' | 'alphabetsong' | 'words' | 'kar' | 'dotted' | 'matra' | 'write' | 'karWords' | 'karTenWords' | 'rearrange' | 'wordMatching' | 'jointLetters' | 'karConjunctWords' | 'conjunctUsage' | 'consonantKar' | 'consonantKarTable' | 'karSentences' | 'progSentences' | 'quiz' | 'antonyms' | 'synonyms' | 'sadhuCholit' | 'stories' | 'oneWord' | 'tongueTwister' | 'practice' | 'pronouncePractice' | 'vowelTest' | 'consonantTest' | 'beforeAfterLetter' | 'letterWordCircle' | 'worksheet' | 'classOneBangla' | 'classWiseJointLetters' | 'classThreeAssessment' | 'progressDashboard' | 'codeEditor'>('learn');
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [jointPage, setJointPage] = useState<number>(1);
  const [jointSearch, setJointSearch] = useState<string>('');
  const [jointAutoplayCell, setJointAutoplayCell] = useState<{ table: 'left' | 'right'; rowIndex: number } | null>(null);
  const [karTablePage, setKarTablePage] = useState<number>(1);
  const [karTableSpellOut, setKarTableSpellOut] = useState<boolean>(true);
  const [karTableSearch, setKarTableSearch] = useState<string>('');
  const [autoplayCell, setAutoplayCell] = useState<{ row: string; colIndex: number } | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioMethod, setAudioMethod] = useState('');

  // Admin Authentication & Custom Image Editing States
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('bangla_admin_logged_in') === 'true';
    } catch {
      return false;
    }
  });
  const [adminPassword, setAdminPassword] = useState(() => {
    try {
      return localStorage.getItem('bangla_admin_password') || '2024';
    } catch {
      return '2024';
    }
  });

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginView, setLoginView] = useState<'login' | 'forgot' | 'otp' | 'reset'>('login');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Captcha States
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  // Password Reset / OTP States
  const [resetEmail, setResetEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [newPasswordConfirmInput, setNewPasswordConfirmInput] = useState('');
  
  // Simulated OTP Notification Popup
  const [simulatedEmail, setSimulatedEmail] = useState<{ to: string; subject: string; body: string; otp: string } | null>(null);

  // Admin Settings & Google Authenticator (2FA) States
  const [showAdminSettingsModal, setShowAdminSettingsModal] = useState(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newAdminPasswordInput, setNewAdminPasswordInput] = useState('');
  const [confirmAdminPasswordInput, setConfirmAdminPasswordInput] = useState('');
  const [adminSettingsError, setAdminSettingsError] = useState('');
  const [adminSettingsSuccess, setAdminSettingsSuccess] = useState('');
  
  const [is2faEnabled, setIs2faEnabled] = useState(() => {
    try {
      return localStorage.getItem('bangla_admin_2fa_enabled') === 'true';
    } catch {
      return false;
    }
  });
  const [isSettingUp2fa, setIsSettingUp2fa] = useState(false);
  const [temp2faSecret] = useState('ISMAILBANG2024'); // Custom secret key
  const [verification2faInput, setVerification2faInput] = useState('');
  const [login2faCode, setLogin2faCode] = useState('');
  const [is2faVerifyingForLogin, setIs2faVerifyingForLogin] = useState(false);

  // Subtle 'whoosh' sound effect when switching between different learning modes
  const isFirstModeRender = useRef(true);
  useEffect(() => {
    if (isFirstModeRender.current) {
      isFirstModeRender.current = false;
      return;
    }
    playWhooshSound();
  }, [activeMode]);

  // One-time user-interaction gesture to unlock Web Audio API in modern browsers
  useEffect(() => {
    const unlockAudio = () => {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(0);
          osc.stop(0.01);
          setTimeout(() => {
            ctx.close().catch(() => {});
          }, 50);
        }
      } catch (err) {
        console.warn('Silent Web Audio unlock failed:', err);
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);



  const generateCaptcha = useCallback(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput('');
  }, []);

  useEffect(() => {
    if (showLoginModal) {
      generateCaptcha();
      setLoginView('login');
      setLoginError('');
      setLoginPassword('');
      setCaptchaInput('');
      setSimulatedEmail(null);
    }
  }, [showLoginModal, generateCaptcha]);

  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('bangla_img_overrides');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [editingImageSrc, setEditingImageSrc] = useState<string | null>(null);
  const [newImageInput, setNewImageInput] = useState('');
  const [showImageEditModal, setShowImageEditModal] = useState(false);

  // Dynamic live in-memory override mapper
  useEffect(() => {
    const findOverride = (str: string): string | null => {
      if (!str) return null;
      if (imageOverrides[str]) return imageOverrides[str];
      for (const key of Object.keys(imageOverrides)) {
        if (str === key) return imageOverrides[key];
        if (str.startsWith('/') && key.endsWith(str)) return imageOverrides[key];
        if (key.startsWith('/') && str.endsWith(key)) return imageOverrides[key];
        try {
          const keyUrl = new URL(key, window.location.href).href;
          const strUrl = new URL(str, window.location.href).href;
          if (keyUrl === strUrl) return imageOverrides[key];
        } catch {}
      }
      return null;
    };

    const mutateObj = (obj: any) => {
      if (!obj) return;
      if (Array.isArray(obj)) {
        obj.forEach((item, idx) => {
          if (typeof item === 'string') {
            const override = findOverride(item);
            if (override) obj[idx] = override;
          } else {
            mutateObj(item);
          }
        });
      } else if (typeof obj === 'object') {
        for (const key of Object.keys(obj)) {
          const val = obj[key];
          if (typeof val === 'string') {
            const override = findOverride(val);
            if (override) obj[key] = override;
          } else {
            mutateObj(val);
          }
        }
      }
    };

    const restoreAndMutate = (dest: any, source: any) => {
      if (!dest || !source) return;
      if (Array.isArray(dest)) {
        dest.length = 0;
        source.forEach((item: any) => {
          dest.push(JSON.parse(JSON.stringify(item)));
        });
      } else if (typeof dest === 'object') {
        for (const key of Object.keys(dest)) {
          delete dest[key];
        }
        for (const key of Object.keys(source)) {
          dest[key] = JSON.parse(JSON.stringify(source[key]));
        }
      }
      mutateObj(dest);
    };

    try {
      restoreAndMutate(BENGALI_ALPHABET, PRISTINE_BENGALI_ALPHABET);
      restoreAndMutate(KAR_WORDS_DATA, PRISTINE_KAR_WORDS_DATA);
      restoreAndMutate(BENGALI_KAR_TEN_WORDS_DATA, PRISTINE_KAR_TEN_WORDS_DATA);
      restoreAndMutate(BENGALI_KAR_CONJUNCT_WORDS_DATA, PRISTINE_KAR_CONJUNCT_WORDS_DATA);
      restoreAndMutate(BENGALI_CONJUNCTS_USAGE_DATA, PRISTINE_CONJUNCTS_USAGE_DATA);
      restoreAndMutate(BENGALI_KAR_SENTENCES_DATA, PRISTINE_KAR_SENTENCES_DATA);
      restoreAndMutate(BENGALI_PROGRESSIVE_SENTENCES, PRISTINE_PROGRESSIVE_SENTENCES);
      restoreAndMutate(BANGLA_STORIES, PRISTINE_BANGLA_STORIES);
    } catch (e) {
      console.error("Error applying image overrides:", e);
    }
  }, [imageOverrides]);

  // Handle right clicks on images for customization
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (!isLoggedIn) return;
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'IMG') {
        e.preventDefault();
        const imgEl = target as HTMLImageElement;
        let originalSrc = imgEl.src;
        for (const key of Object.keys(imageOverrides)) {
          try {
            const keyUrl = new URL(key, window.location.href).href;
            const currentUrl = new URL(imgEl.src, window.location.href).href;
            if (keyUrl === currentUrl || imageOverrides[key] === imgEl.src) {
              originalSrc = key;
              break;
            }
          } catch {}
        }
        setEditingImageSrc(originalSrc);
        setNewImageInput(imageOverrides[originalSrc] || originalSrc);
        setShowImageEditModal(true);
        speak("ছবি পরিবর্তন করুন");
      }
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isLoggedIn, imageOverrides]);
  
  // Dotted Drawing Mode States
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dottedLetter, setDottedLetter] = useState('অ');
  const [dottedTab, setDottedTab] = useState<'vowel' | 'consonant'>('vowel');
  const [brushColor, setBrushColor] = useState('#ec4899'); // Default fuchsia/pink
  const [brushSize, setBrushSize] = useState(14);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSparkles, setCanvasSparkles] = useState<{ id: string; x: number; y: number; color: string; size: number; tx: number; ty: number }[]>([]);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const lastSparkleTimeRef = useRef(0);

  // Tracing progress tracking states
  const [dottedProgress, setDottedProgress] = useState(0);
  const templateGridRef = useRef<boolean[][]>([]);
  const userCoveredRef = useRef<boolean[][]>([]);
  const totalTargetPointsRef = useRef<number>(0);
  const [isPerfectTrace, setIsPerfectTrace] = useState(false);
  const currentStrokePerfectRef = useRef<boolean>(true);
  
  // Stroke Writing Mode States
  const [writeLetter, setWriteLetter] = useState('অ');
  const [writeTab, setWriteTab] = useState<'vowel' | 'consonant'>('vowel');
  const [writeAnimKey, setWriteAnimKey] = useState(0);
  const [writeSpeedLevel, setWriteSpeedLevel] = useState<number>(3);
  const [strokePlaybackSpeed, setStrokePlaybackSpeed] = useState<number>(1.0); // 1.0 (1x), 0.75 (0.75x), 0.5 (0.5x)
  const [segmentCompletedFlash, setSegmentCompletedFlash] = useState(false);
  const [writeColor, setWriteColor] = useState<string>('rainbow');
  const [isWriteMuted, setIsWriteMuted] = useState(false);
  const [isQuizMuted, setIsQuizMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('isQuizMuted') === 'true';
    } catch {
      return false;
    }
  });
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('isAudioMuted') === 'true';
    } catch {
      return false;
    }
  });

  const toggleAudioMuted = useCallback(() => {
    setIsAudioMuted((prev) => {
      const newVal = !prev;
      try {
        localStorage.setItem('isAudioMuted', String(newVal));
      } catch (e) {
        console.error('Failed to persist audio mute state:', e);
      }
      return newVal;
    });
  }, []);

  // User settings states for chimes, background music, and font size
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [globalFontSize, setGlobalFontSize] = useState<'small' | 'medium' | 'large'>(() => {
    try {
      const saved = localStorage.getItem('bangla_global_font_size');
      if (saved === 'small' || saved === 'medium' || saved === 'large') {
        return saved;
      }
      return 'medium';
    } catch {
      return 'medium';
    }
  });

  useEffect(() => {
    try {
      document.documentElement.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
      document.documentElement.classList.add(`font-size-${globalFontSize}`);
      localStorage.setItem('bangla_global_font_size', globalFontSize);
    } catch (e) {
      console.error('Failed to set or persist global font size:', e);
    }
  }, [globalFontSize]);

  const [isChimesEnabled, setIsChimesEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('bangla_chimes_enabled') !== 'false'; // default to true
    } catch {
      return true;
    }
  });
  const [isBgMusicEnabled, setIsBgMusicEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('bangla_bg_music_enabled') === 'true'; // default to false
    } catch {
      return false;
    }
  });

  const toggleChimes = useCallback(() => {
    setIsChimesEnabled((prev) => {
      const newVal = !prev;
      try {
        localStorage.setItem('bangla_chimes_enabled', String(newVal));
      } catch (e) {
        console.error('Failed to persist chimes state:', e);
      }
      return newVal;
    });
  }, []);

  const toggleBgMusic = useCallback(() => {
    setIsBgMusicEnabled((prev) => {
      const newVal = !prev;
      try {
        localStorage.setItem('bangla_bg_music_enabled', String(newVal));
      } catch (e) {
        console.error('Failed to persist bg music state:', e);
      }
      return newVal;
    });
  }, []);

  // Soft, ambient background music synthesizer loop using Web Audio API
  useEffect(() => {
    if (!isBgMusicEnabled || isAudioMuted) {
      return;
    }

    let audioCtx: AudioContext | null = null;
    let timerId: any = null;

    // Gentle arpeggio chord cycle (very slow, quiet & warm):
    // Cmaj7 (C4, E4, G4, B4), Fmaj7 (F4, A4, C5, E5), G6 (G4, B4, D5, E5), Cmaj (C4, E4, G4, C5)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [349.23, 440.00, 261.63, 329.63], // Fmaj7
      [392.00, 493.88, 293.66, 329.63], // G6
      [261.63, 329.63, 392.00, 523.25]  // Cmaj
    ];

    let chordIndex = 0;

    const playNextChord = () => {
      try {
        if (!audioCtx) {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (!AudioContextClass) return;
          audioCtx = new AudioContextClass();
        }

        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const chord = chords[chordIndex];
        chordIndex = (chordIndex + 1) % chords.length;

        // Play each note with a slight stagger (harp/arpeggiation effect)
        chord.forEach((freq, noteIdx) => {
          const noteTime = now + noteIdx * 0.2;
          
          const osc = audioCtx!.createOscillator();
          const gainNode = audioCtx!.createGain();
          
          osc.type = 'sine'; // pure sweet soothing sound
          osc.frequency.setValueAtTime(freq, noteTime);
          
          // Ultra soft gain envelope (keeps it as soft background harmony)
          gainNode.gain.setValueAtTime(0, noteTime);
          gainNode.gain.linearRampToValueAtTime(0.006, noteTime + 0.3); // max 0.6% volume
          gainNode.gain.exponentialRampToValueAtTime(0.0001, noteTime + 3.8);
          
          osc.connect(gainNode);
          gainNode.connect(audioCtx!.destination);
          
          osc.start(noteTime);
          osc.stop(noteTime + 4.2);
        });
      } catch (e) {
        console.error("BG music synthesizer error:", e);
      }
    };

    // Delay first playback slightly, then trigger chord sequence loop every 6 seconds
    const initialTimeout = setTimeout(() => {
      playNextChord();
      timerId = setInterval(playNextChord, 6000);
    }, 800);

    return () => {
      clearTimeout(initialTimeout);
      if (timerId) clearInterval(timerId);
      if (audioCtx) {
        try {
          audioCtx.close();
        } catch {}
      }
    };
  }, [isBgMusicEnabled, isAudioMuted]);

  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  // Daily Streak States
  const [streak, setStreak] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('bangla_learning_streak');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [lastStreakDate, setLastStreakDate] = useState<string>(() => {
    try {
      return localStorage.getItem('bangla_learning_streak_date') || '';
    } catch {
      return '';
    }
  });
  const [showStreakMilestone, setShowStreakMilestone] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  
  // Daily Missions States
  const [missionListenCount, setMissionListenCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('bangla_mission_listen_count');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [missionDrawCount, setMissionDrawCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('bangla_mission_draw_count');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [missionQuizCount, setMissionQuizCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('bangla_mission_quiz_count');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [showBadgeClaimedModal, setShowBadgeClaimedModal] = useState(false);
  const isBadgeEarned = missionListenCount >= 5 && missionDrawCount >= 3 && missionQuizCount >= 1;
  
  // Track listened words list per letter
  const [listenedWords, setListenedWords] = useState<Record<string, string[]>>(() => {
    try {
      const stored = localStorage.getItem('bangla_listened_words');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [showOnlyMastered, setShowOnlyMastered] = useState<boolean>(false);
  const [hideMastered, setHideMastered] = useState<boolean>(false);
  
  // Letter Derivation States
  const [selectedDerivationBase, setSelectedDerivationBase] = useState<string>('ব');
  const [selectedDerivationTarget, setSelectedDerivationTarget] = useState<string>('ক');
  const [isDerivationSuccess, setIsDerivationSuccess] = useState<boolean>(false);
  const [isTracingGuideCompleted, setIsTracingGuideCompleted] = useState<boolean>(false);
  const [derivationAnimTrigger, setDerivationAnimTrigger] = useState<number>(0);
  
  // Stories States
  const [selectedStory, setSelectedStory] = useState<BanglaStory | null>(null);
  const [storyLevelFilter, setStoryLevelFilter] = useState<'all' | 'easy' | 'medium' | 'difficult'>('all');

  const [selectedKar, setSelectedKar] = useState<KarWordsGroup | null>(null);
  const [activeKarWord, setActiveKarWord] = useState<any | null>(null);
  const [selectedKarTen, setSelectedKarTen] = useState<KarWordsGroup | null>(null);
  const [selectedKarConjunct, setSelectedKarConjunct] = useState<KarWordsGroup | null>(null);
  const [selectedConjunctItem, setSelectedConjunctItem] = useState<ConjunctUsageItem | null>(null);
  const [conjunctSearch, setConjunctSearch] = useState('');
  const [selectedKarSentenceGroup, setSelectedKarSentenceGroup] = useState<KarSentencesGroup | null>(null);

  useEffect(() => {
    if (selectedKar && selectedKar.words && selectedKar.words.length > 0) {
      setActiveKarWord(selectedKar.words[0]);
    } else {
      setActiveKarWord(null);
    }
  }, [selectedKar]);

  // Consonant Kar State
  const [selectedConsonant, setSelectedConsonant] = useState<string | null>('ক');
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  // Progressive Sentences State
  const [selectedProgGroup, setSelectedProgGroup] = useState<BanglaProgressiveGroup | null>(null);
  const [scrambleSentence, setScrambleSentence] = useState<BanglaProgressiveSentence | null>(null);
  const [scrambleOriginalWords, setScrambleOriginalWords] = useState<string[]>([]);
  const [scramblePool, setScramblePool] = useState<{ id: string; word: string }[]>([]);
  const [scrambleAnswer, setScrambleAnswer] = useState<{ id: string; word: string }[]>([]);
  const [scrambleAttempts, setScrambleAttempts] = useState(0);
  const [scrambleFeedback, setScrambleFeedback] = useState<'success' | 'fail' | 'wrong' | null>(null);

  // Antonyms State
  const [selectedAntonymLevel, setSelectedAntonymLevel] = useState<AntonymLevel | null>(null);

  // Synonyms State
  const [selectedSynonymLevel, setSelectedSynonymLevel] = useState<SynonymLevel | null>(null);

  // Sadhu Cholit State
  const [selectedSadhuCholitLevel, setSelectedSadhuCholitLevel] = useState<SadhuCholitLevel | null>(null);

  // Search States
  const [learnSearch, setLearnSearch] = useState('');
  const [wordsSearch, setWordsSearch] = useState('');

  // Practice Mode (Rapid-Fire Retention Review) States
  const [practiceActive, setPracticeActive] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceLives, setPracticeLives] = useState(3);
  const [practiceQuestionIndex, setPracticeQuestionIndex] = useState(0);
  const [practiceQuestion, setPracticeQuestion] = useState<any | null>(null);
  const [practiceAnswered, setPracticeAnswered] = useState(false);
  const [practiceSelectedIdx, setPracticeSelectedIdx] = useState<number | null>(null);
  const [practiceFeedback, setPracticeFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [practiceTimer, setPracticeTimer] = useState(10);
  const [isPracticeFinished, setIsPracticeFinished] = useState(false);
  const [practiceStreak, setPracticeStreak] = useState(0);

  // Playback Speed State (e.g. 0.5, 0.75, 1.0)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [speechEngine, setSpeechEngine] = useState<'google' | 'browser'>('browser');




  const [quizState, setQuizState] = useState<QuizState>({
    question: null,
    isReverse: false,
    options: [],
    score: 0,
    total: 0,
    feedback: null,
    selectedIndex: null,
  });

  const [quizModeType, setQuizModeType] = useState<'letter' | 'picToWord'>('letter');
  const [quizStreak, setQuizStreak] = useState<number>(0);
  const [isAdaptiveMode, setIsAdaptiveMode] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const quizTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ==================== SPEECH FUNCTIONS ====================

  const prepareSpeakText = useCallback((text: any): string => {
    if (text === null || text === undefined) {
      return '';
    }
    
    let cleaned = String(text).trim();
    
    // Normalize Unicode representation for Bengali letters (crucial for combining diacritics/kar signs)
    cleaned = cleaned.normalize('NFC');
    
    // Remove the dotted circle (◌) commonly used in vowel placeholder displays (e.g. ◌া -> া)
    cleaned = cleaned.replace(/\u25CC/g, '');
    
    // Replace brackets, parentheses, dashes, underbars, and slash with space to prevent TTS reading them literally
    cleaned = cleaned.replace(/[\[\]\(\)\{\}\-\_\*\/\\]/g, ' ');
    
    // If the text starts with or is solely a combining character (e.g. া, ি), map to its spoken phonetic description
    const isCombiningCharOnly = /^[\u09BE-\u09CC\u09D7\u0901-\u0903\u0981-\u0983]+$/.test(cleaned);
    if (isCombiningCharOnly) {
      const karNames: Record<string, string> = {
        'া': 'আ কার',
        'ি': 'ই কার',
        'ী': 'ঈ কার',
        'ু': 'উ কার',
        'ূ': 'ঊ কার',
        'ৃ': 'ঋ কার',
        'ে': 'এ কার',
        'ৈ': 'ঐ কার',
        'ো': 'ও কার',
        'ৌ': 'ঔ কার',
        'ঁ': 'চন্দ্রবিন্দু',
        'ং': 'অনুস্বার',
        'ঃ': 'বিসর্গ',
        'ৎ': 'খণ্ড ত'
      };
      if (karNames[cleaned]) {
        cleaned = karNames[cleaned];
      }
    }
    
    // Clean up multiple spaces
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    return cleaned;
  }, []);

  const stopPreviousSpeech = useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.src = "";
        audioRef.current = null;
      }
    } catch (e) {
      console.error('Error stopping Google TTS audio:', e);
    }
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch (e) {
      console.error('Error stopping WebSpeech:', e);
    }
    setIsSpeaking(false);
  }, []);

  const speakWithWebSpeech = useCallback((text: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      let timeoutId: any = null;

      try {
        setAudioMethod('🔊 Browser TTS');
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'bn-BD';
        // Web Speech synthesis of Bengali is generally very fast, 
        // so we scale standard 0.75 by our playbackSpeed factor
        utterance.rate = playbackSpeed * 0.75;
        utterance.pitch = 1;
        utterance.volume = 1;

        const voices = window.speechSynthesis.getVoices();
        const bnVoice = voices.find(v => v.lang.toLowerCase().includes('bn'));
        if (bnVoice) utterance.voice = bnVoice;

        // Set a dynamic safety timeout based on text length to prevent hanging, with a minimum of 5 seconds
        const calculatedTimeout = Math.max(5000, text.length * 300);
        timeoutId = setTimeout(() => {
          console.warn('WebSpeech timed out, falling back...');
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
          reject(new Error('WebSpeech timeout'));
        }, calculatedTimeout);

        utterance.onstart = () => {
          setIsSpeaking(true);
        };

        utterance.onend = () => {
          if (timeoutId) clearTimeout(timeoutId);
          setIsSpeaking(false);
          resolve(true);
        };

        utterance.onerror = (e) => {
          if (timeoutId) clearTimeout(timeoutId);
          setIsSpeaking(false);
          reject(new Error(`Speech error: ${e.error}`));
        };

        window.speechSynthesis.speak(utterance);
      } catch (error) {
        if (timeoutId) clearTimeout(timeoutId);
        setIsSpeaking(false);
        reject(error);
      }
    });
  }, [playbackSpeed]);

  const speakWithGoogleTTS = useCallback((text: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        setIsSpeaking(true);
        setAudioMethod('🌐 Google TTS');

        const encodedText = encodeURIComponent(text);
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=bn&client=tw-ob&q=${encodedText}`;

        // Create audio element with no-referrer policy to bypass Google Translate Referer check block
        const audio = document.createElement('audio');
        audio.setAttribute('referrerpolicy', 'no-referrer');
        try {
          (audio as any).referrerPolicy = 'no-referrer';
        } catch (e) {
          console.warn('Could not set referrerPolicy property', e);
        }
        audio.src = url;
        audioRef.current = audio;
        audio.defaultPlaybackRate = playbackSpeed;
        audio.playbackRate = playbackSpeed;

        audio.onended = () => {
          setIsSpeaking(false);
          resolve(true);
        };

        audio.onerror = (e) => {
          console.warn('Google TTS error playing sound:', e);
          setIsSpeaking(false);
          reject(new Error('Google TTS error'));
        };

        audio.play().catch(err => {
          console.warn('Google TTS play failed:', err);
          setIsSpeaking(false);
          reject(err);
        });
      } catch (error) {
        setIsSpeaking(false);
        reject(error);
      }
    });
  }, [playbackSpeed]);

  const speak = useCallback(async (text: string) => {
    if (isAudioMuted) {
      console.log('TTS Muted globally:', text);
      return;
    }
    if (activeMode === 'write' && isWriteMuted) {
      console.log('Muted sound:', text);
      return;
    }
    if (activeMode === 'quiz' && isQuizMuted) {
      console.log('Muted quiz sound:', text);
      return;
    }

    const cleanedText = prepareSpeakText(text);
    if (!cleanedText) {
      console.warn('speak was called with empty or invalid text:', text);
      return;
    }

    stopPreviousSpeech();

    if (speechEngine === 'browser') {
      try {
        await speakWithWebSpeech(cleanedText);
      } catch (err) {
        console.warn('Browser speech synthesis failed/timed out, falling back to Google TTS:', err);
        try {
          await speakWithGoogleTTS(cleanedText);
        } catch (err2) {
          console.warn('Both speech synthesis methods failed (graceful):', err2);
        }
      }
    } else {
      try {
        await speakWithGoogleTTS(cleanedText);
      } catch (err) {
        console.warn('Google TTS failed, falling back to Browser speech synthesis:', err);
        try {
          await speakWithWebSpeech(cleanedText);
        } catch (err2) {
          console.warn('Both speech synthesis methods failed (graceful):', err2);
        }
      }
    }
  }, [speechEngine, speakWithGoogleTTS, speakWithWebSpeech, stopPreviousSpeech, prepareSpeakText, activeMode, isWriteMuted, isQuizMuted, isAudioMuted]);

  // Unified Daily Challenge Progress Incrementor
  const incrementDailyChallengeProgress = useCallback((type: string, details?: any) => {
    try {
      const todayStr = getDailyChallengeTodayStr();
      const { challenge } = getDailyChallengeForToday();
      if (!challenge) return;

      // Avoid double completions
      const isAlreadyCompleted = localStorage.getItem(`bangla_daily_completed_${todayStr}`) === 'true';
      if (isAlreadyCompleted) return;

      let matched = false;
      if (challenge.id === 'vowels-trace' && type === 'trace') {
        const letter = details?.letter || '';
        const vowels = ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'];
        if (vowels.includes(letter)) {
          matched = true;
        }
      } else if (challenge.id === 'consonant-k' && type === 'trace') {
        const letter = details?.letter || '';
        if (letter === 'ক') {
          matched = true;
        }
      } else if (challenge.id === 'words-learn' && type === 'listen_word') {
        matched = true;
      } else if (challenge.id === 'quiz-o' && type === 'quiz_correct') {
        matched = true;
      } else if (challenge.id === 'rearrange-solve' && type === 'rearrange_solve') {
        matched = true;
      } else if (challenge.id === 'kar-signs' && type === 'kar_view') {
        matched = true;
      } else if (challenge.id === 'story-read' && type === 'story_open') {
        matched = true;
      } else if (challenge.id === 'sentences-practice' && type === 'sentence_listen') {
        matched = true;
      } else if (challenge.id === 'antonyms-match' && type === 'antonyms_match') {
        matched = true;
      } else if (challenge.id === 'kar-words' && type === 'kar_word_listen') {
        matched = true;
      }

      if (matched) {
        setDailyProgress((prev) => {
          if (prev >= challenge.targetCount) return prev;
          const next = prev + 1;
          localStorage.setItem(`bangla_daily_progress_${todayStr}`, next.toString());
          
          if (next === challenge.targetCount) {
            localStorage.setItem(`bangla_daily_completed_${todayStr}`, 'true');
            setDailyCompleted(true);
            speak(`চমৎকার! তুমি আজকের ডেইলি চ্যালেঞ্জটি সফলভাবে শেষ করেছ!`);
            setShowChallengeCelebration(true);
          } else {
            speak(`চ্যালেঞ্জের অগ্রগতি: ${next}`);
          }
          return next;
        });
      }
    } catch (e) {
      console.error('Error in daily challenge increment:', e);
    }
  }, [speak]);

  // ==================== UNIFIED AUDIO PLAYBACK WRAPPER ====================
  const verifyAndPlayText = useCallback((text: string) => {
    if (text === null || text === undefined) {
      console.warn('verifyAndPlayText: text is null or undefined');
      return;
    }

    let cleaned = String(text).trim();
    
    // Normalize Unicode representation for Bengali letters (crucial for combining diacritics/kar signs)
    cleaned = cleaned.normalize('NFC');
    
    // Remove the dotted circle (◌) commonly used in vowel placeholder displays (e.g. ◌া -> া)
    cleaned = cleaned.replace(/\u25CC/g, '');
    
    // Replace brackets, parentheses, dashes, underbars, and slash with space to prevent TTS reading them literally
    cleaned = cleaned.replace(/[\[\]\(\)\{\}\-\_\*\/\\]/g, ' ');

    // Verify it is not empty before invoking the speak method
    if (!cleaned) {
      console.warn('verifyAndPlayText: cleaned text is empty');
      return;
    }

    // Increment listening mission progress
    setMissionListenCount((prev) => {
      if (prev >= 5) return prev;
      const next = prev + 1;
      localStorage.setItem('bangla_mission_listen_count', next.toString());
      return next;
    });

    // Track daily challenge progress for listening
    if (activeMode === 'words') {
      incrementDailyChallengeProgress('listen_word');
    } else if (activeMode === 'karWords') {
      incrementDailyChallengeProgress('kar_word_listen');
    } else if (activeMode === 'karSentences') {
      incrementDailyChallengeProgress('sentence_listen');
    }

    speak(cleaned);
  }, [speak, activeMode, incrementDailyChallengeProgress]);

  // ==================== DOTTED TRACING CANVAS HANDLERS ====================
  const spawnSparkles = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pctX = ((clientX - rect.left) / rect.width) * 100;
    const pctY = ((clientY - rect.top) / rect.height) * 100;

    const sparkleColors = ['#ffd700', '#ff007f', '#39ff14', '#00ffff', '#ff5e00', '#bd00ff', brushColor];
    
    const newSparkles = Array.from({ length: 4 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 12 + Math.random() * 30; // random explosive distance
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const size = 12 + Math.random() * 14; // 12px to 26px
      return {
        id: Math.random().toString(36).substring(2, 9),
        x: pctX,
        y: pctY,
        tx,
        ty,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        size
      };
    });

    setCanvasSparkles(prev => {
      const combined = [...prev, ...newSparkles];
      // Keep a max of 20 sparkles on screen to prevent memory buildup
      if (combined.length > 20) {
        return combined.slice(combined.length - 20);
      }
      return combined;
    });
  }, [brushColor]);

  const initializeTemplateGrid = useCallback((letter: string) => {
    const size = 64;
    const userGrid = Array(size).fill(null).map(() => Array(size).fill(false));
    userCoveredRef.current = userGrid;
    setDottedProgress(0);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, size, size);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px "Hind Siliguri", "Inter", sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(letter, size / 2, size / 2 + 2);

      const imgData = ctx.getImageData(0, 0, size, size);
      const data = imgData.data;

      const templateGrid = Array(size).fill(null).map(() => Array(size).fill(false));
      let targetCount = 0;

      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const idx = (r * size + c) * 4;
          const rVal = data[idx];
          if (rVal > 40) {
            templateGrid[r][c] = true;
            targetCount++;
          }
        }
      }

      templateGridRef.current = templateGrid;
      totalTargetPointsRef.current = targetCount || 1;
    } catch (err) {
      console.error('Failed to generate template grid:', err);
    }
  }, []);

  const markGridLine = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = 64;
    const w = canvas.width;
    const h = canvas.height;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.max(Math.round(Math.sqrt(dx * dx + dy * dy) / 4), 1);

    const template = templateGridRef.current;
    const userCovered = userCoveredRef.current;
    if (!template || !userCovered) return;

    const scaleX = size / w;
    const scaleY = size / h;

    // Grid radius based on brush size
    const brushRadius = Math.max(1, Math.round(((brushSize * 2) / w) * size * 0.7));

    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const curX = x1 + dx * t;
      const curY = y1 + dy * t;

      const col = Math.floor(curX * scaleX);
      const row = Math.floor(curY * scaleY);

      for (let rOffset = -brushRadius; rOffset <= brushRadius; rOffset++) {
        for (let cOffset = -brushRadius; cOffset <= brushRadius; cOffset++) {
          if (rOffset * rOffset + cOffset * cOffset <= brushRadius * brushRadius) {
            const gridRow = row + rOffset;
            const gridCol = col + cOffset;

            if (gridRow >= 0 && gridRow < size && gridCol >= 0 && gridCol < size) {
              if (template[gridRow] && template[gridRow][gridCol]) {
                userCovered[gridRow][gridCol] = true;
              }
            }
          }
        }
      }
    }

    let covered = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (userCovered[r][c]) covered++;
      }
    }

    const totalTarget = totalTargetPointsRef.current || 1;
    const percent = Math.min(100, Math.round((covered / totalTarget) * 100));
    setDottedProgress(percent);
  }, [brushSize]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setDottedProgress(0);
    const size = 64;
    userCoveredRef.current = Array(size).fill(null).map(() => Array(size).fill(false));
    setIsPerfectTrace(false);
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let clientX, clientY;
    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      if (e.cancelable) e.preventDefault();
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    
    setIsDrawing(true);
    lastXRef.current = x;
    lastYRef.current = y;

    // Check if drawing starts inside stroke boundaries
    const size = 64;
    const template = templateGridRef.current;
    if (template && template.length > 0) {
      const w = canvas.width;
      const h = canvas.height;
      const scaleX = size / w;
      const scaleY = size / h;
      const col = Math.floor(x * scaleX);
      const row = Math.floor(y * scaleY);
      
      const isInsideStroke = (r: number, c: number) => {
        if (r >= 0 && r < size && c >= 0 && c < size) {
          // Check a small 1-pixel neighborhood to be forgiving
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
                if (template[nr] && template[nr][nc]) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      };

      if (!isInsideStroke(row, col)) {
        currentStrokePerfectRef.current = false;
      } else {
        currentStrokePerfectRef.current = true;
      }
    } else {
      currentStrokePerfectRef.current = false;
    }

    // Track starting point tracing progress
    markGridLine(x, y, x, y);

    // Increment drawing mission progress
    setMissionDrawCount((prev) => {
      if (prev >= 3) return prev;
      const next = prev + 1;
      localStorage.setItem('bangla_mission_draw_count', next.toString());
      return next;
    });

    // Track daily challenge progress for letter drawing
    incrementDailyChallengeProgress('trace', { letter: activeMode === 'dotted' ? dottedLetter : writeLetter });

    // Trigger instant sparkle on touch start
    spawnSparkles(clientX, clientY);
  }, [spawnSparkles, markGridLine, activeMode, dottedLetter, writeLetter, incrementDailyChallengeProgress]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let clientX, clientY;
    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      if (e.cancelable) e.preventDefault();
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    
    ctx.beginPath();
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(lastXRef.current, lastYRef.current);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Check if drawing point stays inside stroke boundaries
    if (currentStrokePerfectRef.current) {
      const size = 64;
      const template = templateGridRef.current;
      if (template && template.length > 0) {
        const w = canvas.width;
        const h = canvas.height;
        const scaleX = size / w;
        const scaleY = size / h;
        const col = Math.floor(x * scaleX);
        const row = Math.floor(y * scaleY);

        const isInsideStroke = (r: number, c: number) => {
          if (r >= 0 && r < size && c >= 0 && c < size) {
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
                  if (template[nr] && template[nr][nc]) {
                    return true;
                  }
                }
              }
            }
          }
          return false;
        };

        if (!isInsideStroke(row, col)) {
          currentStrokePerfectRef.current = false;
        }
      } else {
        currentStrokePerfectRef.current = false;
      }
    }
    
    // Trace progress check for the segment
    markGridLine(lastXRef.current, lastYRef.current, x, y);

    lastXRef.current = x;
    lastYRef.current = y;

    // Throttled sparkle burst during draw path
    const now = Date.now();
    if (now - lastSparkleTimeRef.current > 40) {
      spawnSparkles(clientX, clientY);
      lastSparkleTimeRef.current = now;
    }
  }, [isDrawing, brushColor, brushSize, spawnSparkles, markGridLine]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);

    // Calculate progress synchronously using refs to be 100% reliable
    let covered = 0;
    const size = 64;
    const userCovered = userCoveredRef.current;
    if (userCovered) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (userCovered[r][c]) covered++;
        }
      }
    }
    const totalTarget = totalTargetPointsRef.current || 1;
    const currentPercent = Math.min(100, Math.round((covered / totalTarget) * 100));

    if (currentStrokePerfectRef.current && currentPercent >= 90) {
      setIsPerfectTrace(true);
      speak("চমৎকার! তুমি একদম নিখুঁতভাবে বর্ণটি এঁকেছ!");
    }
  }, [speak]);

  const incrementDailyStreak = useCallback(() => {
    try {
      const today = new Date().toLocaleDateString('en-US');
      const lastDate = localStorage.getItem('bangla_learning_streak_date') || '';
      let currentStreak = parseInt(localStorage.getItem('bangla_learning_streak') || '0', 10);

      if (lastDate === today) {
        return;
      }

      const todayDateObj = new Date();
      const yesterdayDateObj = new Date();
      yesterdayDateObj.setDate(todayDateObj.getDate() - 1);
      const yesterdayStr = yesterdayDateObj.toLocaleDateString('en-US');

      if (lastDate === yesterdayStr || lastDate === '') {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }

      localStorage.setItem('bangla_learning_streak', currentStreak.toString());
      localStorage.setItem('bangla_learning_streak_date', today);
      setStreak(currentStreak);

      if (currentStreak === 5) {
        setShowStreakMilestone(true);
        speak("ওয়াও! তুমি টানা ৫ দিনের লার্নিং স্ট্রিক অর্জন করেছো! চমৎকার!");
      }
    } catch (e) {
      console.error(e);
    }
  }, [speak]);

  // Synchronize Daily Challenge State on Calendar Date Changes
  useEffect(() => {
    try {
      const todayStr = getDailyChallengeTodayStr();
      const lastCheck = localStorage.getItem('bangla_daily_challenge_checked_date') || '';
      if (lastCheck !== todayStr) {
        localStorage.setItem('bangla_daily_challenge_checked_date', todayStr);
        const currentProgress = localStorage.getItem(`bangla_daily_progress_${todayStr}`);
        const currentCompleted = localStorage.getItem(`bangla_daily_completed_${todayStr}`);
        setDailyProgress(currentProgress ? parseInt(currentProgress, 10) : 0);
        setDailyCompleted(currentCompleted === 'true');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Daily Missions Reset and Completion Handlers
  useEffect(() => {
    try {
      const today = new Date().toLocaleDateString('en-US');
      const savedDate = localStorage.getItem('bangla_mission_date') || '';
      if (savedDate !== today) {
        localStorage.setItem('bangla_mission_date', today);
        localStorage.setItem('bangla_mission_listen_count', '0');
        localStorage.setItem('bangla_mission_draw_count', '0');
        localStorage.setItem('bangla_mission_quiz_count', '0');
        setMissionListenCount(0);
        setMissionDrawCount(0);
        setMissionQuizCount(0);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const isCompletedAll = missionListenCount >= 5 && missionDrawCount >= 3 && missionQuizCount >= 1;
    if (isCompletedAll) {
      try {
        const today = new Date().toLocaleDateString('en-US');
        const lastAwarded = localStorage.getItem('bangla_badge_awarded_date') || '';
        if (lastAwarded !== today) {
          localStorage.setItem('bangla_badge_awarded_date', today);
          
          // Trigger streak logic
          incrementDailyStreak();
          
          // Open Badge celebration modal
          setShowBadgeClaimedModal(true);
          speak("দারুণ! তুমি আজকের সব ডেইলি মিশন শেষ করেছ এবং গোল্ডেন বাংলা ব্যাজ অর্জন করেছ! তোমার ডেইলি স্ট্রিক আপডেট করা হয়েছে।");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [missionListenCount, missionDrawCount, missionQuizCount, incrementDailyStreak, speak]);

  useEffect(() => {
    if (activeMode === 'dotted') {
      clearCanvas();
      initializeTemplateGrid(dottedLetter);
    }
  }, [dottedLetter, activeMode, clearCanvas, initializeTemplateGrid]);

  // Automatically trigger celebratory confetti when stroke animation finishes
  useEffect(() => {
    if (activeMode !== 'write') {
      setShowConfetti(false);
      return;
    }

    const baseDuration = 
      writeSpeedLevel === 1 ? 8.0 :
      writeSpeedLevel === 2 ? 6.0 :
      writeSpeedLevel === 3 ? 4.5 :
      writeSpeedLevel === 4 ? 3.0 :
      1.5;
    
    const duration = baseDuration / strokePlaybackSpeed;

    let intervalId: any = null;
    let hideTimeout: any = null;
    const scheduledStrokeTimeouts: any[] = [];

    const numStrokes = getLetterMarkers(writeLetter).length;
    let strokePercentages = [50];
    if (numStrokes === 2) strokePercentages = [35, 75];
    else if (numStrokes === 3) strokePercentages = [25, 55, 85];
    else if (numStrokes >= 4) strokePercentages = [25, 55, 85, 95];

    const scheduleStrokesForLoop = (loopStartTimeOffsetMs: number) => {
      strokePercentages.forEach((pct, index) => {
        const delay = loopStartTimeOffsetMs + (duration * 1000 * pct) / 100;
        const tid = setTimeout(() => {
          if (!isWriteMuted) {
            playStrokeSegmentSound(index, numStrokes);
          }
          setSegmentCompletedFlash(true);
          const flashTimeout = setTimeout(() => {
            setSegmentCompletedFlash(false);
          }, 600);
          scheduledStrokeTimeouts.push(flashTimeout);
        }, delay);
        scheduledStrokeTimeouts.push(tid);
      });
    };

    const triggerConfetti = () => {
      setShowConfetti(true);
      setConfettiKey(prev => prev + 1);
      
      // Increment daily learning streak when a sequence finishes successfully!
      incrementDailyStreak();
      
      if (!isWriteMuted) {
        const praises = ["খুব সুন্দর হয়েছে!", "অসাধারণ!", "দারুণ!", "সাবাশ!", "চমৎকার!"];
        const randomPraise = praises[Math.floor(Math.random() * praises.length)];
        speak(randomPraise);
      }
      
      if (hideTimeout) clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        setShowConfetti(false);
      }, 2500);
    };

    // Schedule strokes for the first loop
    scheduleStrokesForLoop(0);

    const initialDelay = duration * 1000 - 150;
    const timeoutId = setTimeout(() => {
      triggerConfetti();
      
      intervalId = setInterval(() => {
        triggerConfetti();
        // Schedule strokes for the upcoming loop
        scheduleStrokesForLoop(0);
      }, duration * 1000);
    }, Math.max(100, initialDelay));

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
      if (hideTimeout) clearTimeout(hideTimeout);
      scheduledStrokeTimeouts.forEach(tid => clearTimeout(tid));
    };
  }, [writeLetter, writeAnimKey, writeSpeedLevel, strokePlaybackSpeed, activeMode, isWriteMuted, speak]);

  // ==================== DOTTED TRACING A4 PDF GENERATOR ====================
  const downloadDottedPDF = useCallback((letters: string[], titleSuffix: string) => {
    let pagesHTML = '';
    
    letters.forEach((char) => {
      pagesHTML += `
        <div class="sheet-page">
          <div class="sheet-header">
            <div class="sh-left">🇧🇩 সোনার বাংলা এসো শিখি - হস্তলিপি ওয়ার্কশীট</div>
            <div class="sh-right">বর্ণ: <span class="sh-char">${char}</span></div>
          </div>
          
          <div class="sheet-body">
            <div class="main-tracing-area">
              <div class="mta-left">
                <div class="mta-label">১. বড় বর্ণটি আঙুল বা পেন্সিল দিয়ে হাত ঘুরিয়ে অনুশীলন করো:</div>
                <div class="huge-char-box">
                  <svg viewBox="0 0 200 200">
                    <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="140" fill="none" stroke="#94a3b8" stroke-width="3.5" stroke-dasharray="6 6">${char}</text>
                  </svg>
                </div>
              </div>
              <div class="mta-right">
                <div class="mta-label">নির্দেশনা:</div>
                <div class="guide-box">
                  <p>✏️ ডট লাইনের উপর সতর্কতার সাথে পেন্সিল চালাও।</p>
                  <p>✏️ উপর থেকে শুরু করে ধীরে ধীরে দাগের উপর দিয়ে আঁকো।</p>
                  <p>✏️ এরপর নিচের ছোট ঘরগুলোতে বারবার অনুশীলন করো।</p>
                  <div class="stars-row">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>
            
            <div class="sub-label">২. ডট চিহ্নিত বর্ণগুলোর উপর বারবার হাত ঘুরিয়ে লেখো (Tracing Row):</div>
            
            <div class="grid-rows-container">
              <div class="tracing-row">
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
              </div>
              
              <div class="tracing-row">
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
              </div>
              
              <div class="sub-label" style="margin-top: 6mm;">৩. এবার নিচের ঘরগুলোতে নিজে নিজে লেখার চেষ্টা করো (Free Handwriting Row):</div>
              
              <div class="tracing-row">
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
              </div>

              <div class="tracing-row">
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
              </div>
            </div>
          </div>
          
          <div class="sheet-footer">
            <div>বাংলা স্বরবর্ণ ও ব্যঞ্জনবর্ণ লিখন প্র্যাকটিস শিট</div>
            <div>হস্তলিপি বই • পৃষ্ঠা - ${char}</div>
          </div>
        </div>
      `;
    });
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>হস্তলিপি অনুশীলন - ${titleSuffix}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Noto+Serif+Bengali:wght@500;700&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4;
            margin: 15mm;
          }
          body {
            font-family: 'Hind Siliguri', sans-serif;
            color: #1e293b;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .screen-helper {
            max-width: 800px;
            margin: 20px auto;
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            padding: 20px;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          }
          .screen-helper h3 {
            margin: 0 0 8px 0;
            color: #166534;
            font-size: 18px;
            font-weight: 700;
          }
          .screen-helper p {
            margin: 0 0 15px 0;
            color: #374151;
            font-size: 14px;
          }
          .print-btn {
            background: #16a34a;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 15px;
            font-weight: 700;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 6px -1px rgb(22 163 74 / 0.2);
          }
          .print-btn:hover {
            background: #15803d;
            transform: translateY(-1px);
          }
          .print-container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            padding: 10mm;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            box-sizing: border-box;
          }
          .sheet-page {
            page-break-after: always;
            position: relative;
            min-height: 260mm;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            border: 1px solid #e2e8f0;
            padding: 8mm;
            background-color: white;
          }
          .sheet-page:last-child {
            page-break-after: avoid !important;
          }
          .sheet-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 3mm;
            margin-bottom: 6mm;
          }
          .sh-left {
            font-size: 11pt;
            font-weight: 700;
            color: #0f172a;
          }
          .sh-right {
            font-size: 11pt;
            font-weight: 700;
            color: #334155;
          }
          .sh-char {
            font-family: 'Noto Serif Bengali', serif;
            font-size: 16pt;
            color: #2563eb;
            font-weight: 700;
          }
          .sheet-body {
            flex: 1;
          }
          .main-tracing-area {
            display: flex;
            gap: 6mm;
            margin-bottom: 6mm;
          }
          .mta-left {
            flex: 1.2;
          }
          .mta-right {
            flex: 1;
          }
          .mta-label {
            font-size: 11pt;
            font-weight: 600;
            color: #475569;
            margin-bottom: 3mm;
          }
          .huge-char-box {
            border: 2px dashed #94a3b8;
            border-radius: 16px;
            aspect-ratio: 1.1;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f8fafc;
            padding: 4mm;
          }
          .huge-char-box svg {
            width: 100%;
            height: 100%;
          }
          .guide-box {
            border: 1.5px solid #e2e8f0;
            background-color: #f8fafc;
            border-radius: 16px;
            padding: 5mm;
            height: calc(100% - 8mm);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .guide-box p {
            font-size: 9.5pt;
            line-height: 1.6;
            margin: 0 0 3mm 0;
            color: #334155;
            font-weight: 500;
          }
          .guide-box p:last-child {
            margin-bottom: 0;
          }
          .stars-row {
            text-align: center;
            font-size: 16pt;
            margin-top: 2mm;
            color: #fbbf24;
          }
          .sub-label {
            font-size: 11pt;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 4mm;
            border-left: 3px solid #2563eb;
            padding-left: 2mm;
          }
          .grid-rows-container {
            display: flex;
            flex-direction: column;
            gap: 4mm;
          }
          .tracing-row {
            display: flex;
            justify-content: space-between;
            gap: 3mm;
          }
          .tracing-cell {
            flex: 1;
            aspect-ratio: 1;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ffffff;
          }
          .tracing-cell svg {
            width: 90%;
            height: 90%;
          }
          .empty-cell {
            border-color: #94a3b8;
            border-style: dashed;
            background-color: #fafafa;
            position: relative;
          }
          .tiny-dot {
            position: absolute;
            top: 1mm;
            left: 50%;
            transform: translateX(-50%);
            font-size: 14pt;
            color: #cbd5e1;
            line-height: 1;
          }
          .sheet-footer {
            border-top: 1.5px solid #cbd5e1;
            padding-top: 3mm;
            margin-top: 6mm;
            display: flex;
            justify-content: space-between;
            font-size: 9pt;
            color: #64748b;
            font-weight: 600;
          }
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              background-color: white;
            }
            .print-container {
              box-shadow: none;
              padding: 0;
              max-width: 100%;
            }
            .sheet-page {
              border: none;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="screen-helper no-print">
          <h3>✏️ ডটেড বর্ণ লিখন অনুশীলন (A4 PDF হস্তলিপি ওয়ার্কশীট)</h3>
          <p>আপনার হস্তলিপি ওয়ার্কশীট ডাউনলোড করার জন্য রেডি! এটিকে <strong>A4 Size PDF</strong> হিসেবে সেভ করতে নিচের সবুজ বাটনে ক্লিক করুন অথবা কীবোর্ড থেকে <strong>Ctrl + P</strong> চাপুন। তারপর Destination-এ <strong>"Save as PDF"</strong> সিলেক্ট করুন।</p>
          <button class="print-btn" onclick="window.print()">🖨️ প্রিন্ট করুন অথবা PDF হিসেবে সেভ করুন</button>
        </div>
        
        <div class="print-container">
          ${pagesHTML}
        </div>

        <script>
          window.onload = function() {
          };
        </script>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const fileName = `Dotted_Letter_Worksheet_${titleSuffix.replace(/\s+/g, '_')}.html`;
      
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  // ==================== STROKE WRITING A4 PDF GENERATOR ====================
  const downloadStrokePDF = useCallback((letters: string[], titleSuffix: string) => {
    let pagesHTML = '';
    
    letters.forEach((char) => {
      const guide = getStrokeGuide(char);
      
      // Let's create visual steps HTML
      let stepsHTML = '';
      guide.steps.forEach((step, index) => {
        stepsHTML += `
          <div class="pdf-step-item">
            <span class="pdf-step-number">${index + 1}</span>
            <span class="pdf-step-text">${step}</span>
          </div>
        `;
      });
      
      pagesHTML += `
        <div class="sheet-page">
          <div class="sheet-header">
            <div class="sh-left">🇧🇩 সোনার বাংলা এসো শিখি - বর্ণ লিখন (Stroke Worksheets)</div>
            <div class="sh-right">বর্ণ: <span class="sh-char">${char}</span></div>
          </div>
          
          <div class="sheet-body">
            <div class="main-tracing-area">
              <div class="mta-left">
                <div class="mta-label">১. বর্ণটি লেখার সঠিক প্রবাহ (Stroke Flow Guide) দেখে হাত ঘুরাও:</div>
                <div class="huge-char-box">
                  <svg viewBox="0 0 200 200">
                    <!-- Faint background character -->
                    <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="130" fill="none" stroke="#e2e8f0" stroke-width="4">${char}</text>
                    <!-- Dash line trace character -->
                    <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="130" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 4">${char}</text>
                  </svg>
                </div>
              </div>
              <div class="mta-right">
                <div class="mta-label">২. লেখার নির্দেশনা ও সঠিক ধাপসমূহ:</div>
                <div class="pdf-guide-box">
                  <div class="pdf-steps-list">
                    ${stepsHTML}
                  </div>
                  <div class="pdf-mascot-row">
                    <span style="font-size: 24pt;">${guide.mascot}</span>
                    <div style="font-size: 9.5pt; font-weight: 700; color: #475569; margin-left: 2mm; text-align: left;">
                      👉 ${guide.advice}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="sub-label">৩. ডট চিহ্নিত বর্ণগুলোর উপর বারবার হাত ঘুরিয়ে লেখো (Tracing Row):</div>
            
            <div class="grid-rows-container">
              <div class="tracing-row">
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
              </div>
              
              <div class="tracing-row">
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
                <div class="tracing-cell"><svg viewBox="0 0 100 100"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="'Hind Siliguri', 'Noto Serif Bengali', sans-serif" font-size="52" fill="none" stroke="#cbd5e1" stroke-width="1.8" stroke-dasharray="3 3">${char}</text></svg></div>
              </div>
              
              <div class="sub-label" style="margin-top: 6mm;">৪. এবার নিচের খালি ঘরগুলোতে নিজে নিজে নির্ভুলভাবে লেখার চেষ্টা করো:</div>
              
              <div class="tracing-row">
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
              </div>

              <div class="tracing-row">
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
                <div class="tracing-cell empty-cell"><div class="tiny-dot">.</div></div>
              </div>
            </div>
          </div>
          
          <div class="sheet-footer">
            <div>${char} বর্ণমালা লেখার অনুশীলন ওয়ার্কশীট • সোনার বাংলা এসো শিখি</div>
            <div>হস্তলিপি ও লেখার প্রবাহ প্র্যাকটিস • পৃষ্ঠা - ${char}</div>
          </div>
        </div>
      `;
    });
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>হস্তলিপি ও বর্ণ লিখন প্রবাহ - ${titleSuffix}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Noto+Serif+Bengali:wght@500;700&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4;
            margin: 15mm;
          }
          body {
            font-family: 'Hind Siliguri', sans-serif;
            color: #1e293b;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .screen-helper {
            max-width: 800px;
            margin: 20px auto;
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            padding: 20px;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          }
          .screen-helper h3 {
            margin: 0 0 8px 0;
            color: #166534;
            font-size: 18px;
            font-weight: 700;
          }
          .screen-helper p {
            margin: 0 0 15px 0;
            color: #374151;
            font-size: 14px;
          }
          .print-btn {
            background: #16a34a;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 15px;
            font-weight: 700;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 6px -1px rgb(22 163 74 / 0.2);
          }
          .print-btn:hover {
            background: #15803d;
            transform: translateY(-1px);
          }
          .print-container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            padding: 10mm;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            box-sizing: border-box;
          }
          .sheet-page {
            page-break-after: always;
            position: relative;
            min-height: 260mm;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            border: 1px solid #e2e8f0;
            padding: 8mm;
            background-color: white;
          }
          .sheet-page:last-child {
            page-break-after: avoid !important;
          }
          .sheet-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 3mm;
            margin-bottom: 6mm;
          }
          .sh-left {
            font-size: 11pt;
            font-weight: 700;
            color: #0f172a;
          }
          .sh-right {
            font-size: 11pt;
            font-weight: 700;
            color: #334155;
          }
          .sh-char {
            font-family: 'Noto Serif Bengali', serif;
            font-size: 18pt;
            color: #ea580c;
            font-weight: 700;
          }
          .sheet-body {
            flex: 1;
          }
          .main-tracing-area {
            display: flex;
            gap: 6mm;
            margin-bottom: 6mm;
          }
          .mta-left {
            flex: 1.1;
          }
          .mta-right {
            flex: 1.1;
          }
          .mta-label {
            font-size: 10.5pt;
            font-weight: 700;
            color: #475569;
            margin-bottom: 3mm;
          }
          .huge-char-box {
            border: 2px dashed #ea580c;
            border-radius: 16px;
            aspect-ratio: 1.1;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fdf8f6;
            padding: 4mm;
          }
          .huge-char-box svg {
            width: 100%;
            height: 100%;
          }
          .pdf-guide-box {
            border: 1.5px solid #fed7aa;
            background-color: #fffaf5;
            border-radius: 16px;
            padding: 5mm;
            height: calc(100% - 8mm);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .pdf-steps-list {
            display: flex;
            flex-direction: column;
            gap: 2.5mm;
          }
          .pdf-step-item {
            display: flex;
            align-items: center;
            gap: 2mm;
          }
          .pdf-step-number {
            width: 20px;
            height: 20px;
            background-color: #ea580c;
            color: white;
            border-radius: 50%;
            font-size: 9pt;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .pdf-step-text {
            font-size: 9.5pt;
            color: #1e293b;
            font-weight: 600;
          }
          .pdf-mascot-row {
            border-top: 1px dashed #fed7aa;
            padding-top: 3mm;
            display: flex;
            align-items: center;
          }
          .sub-label {
            font-size: 11pt;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 4mm;
            border-left: 3px solid #ea580c;
            padding-left: 2mm;
          }
          .grid-rows-container {
            display: flex;
            flex-direction: column;
            gap: 4mm;
          }
          .tracing-row {
            display: flex;
            justify-content: space-between;
            gap: 3mm;
          }
          .tracing-cell {
            flex: 1;
            aspect-ratio: 1;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ffffff;
          }
          .tracing-cell svg {
            width: 90%;
            height: 90%;
          }
          .empty-cell {
            border-color: #94a3b8;
            border-style: dashed;
            background-color: #fafafa;
            position: relative;
          }
          .tiny-dot {
            position: absolute;
            top: 1mm;
            left: 50%;
            transform: translateX(-50%);
            font-size: 14pt;
            color: #cbd5e1;
            line-height: 1;
          }
          .sheet-footer {
            border-top: 1.5px solid #cbd5e1;
            padding-top: 3mm;
            margin-top: 6mm;
            display: flex;
            justify-content: space-between;
            font-size: 9pt;
            color: #64748b;
            font-weight: 600;
          }
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              background-color: white;
            }
            .print-container {
              box-shadow: none;
              padding: 0;
              max-width: 100%;
            }
            .sheet-page {
              border: none;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="screen-helper no-print">
          <h3>🎨 বর্ণ লিখন ও লেখার সঠিক প্রবাহ ওয়ার্কশীট (A4 PDF)</h3>
          <p>আপনার বর্ণ লিখন ওয়ার্কশীটটি রেডি! এটিকে <strong>A4 Size PDF</strong> হিসেবে সেভ করতে নিচের সবুজ বাটনে ক্লিক করুন অথবা কীবোর্ড থেকে <strong>Ctrl + P</strong> চাপুন। তারপর Destination-এ <strong>"Save as PDF"</strong> সিলেক্ট করুন।</p>
          <button class="print-btn" onclick="window.print()">🖨️ প্রিন্ট করুন অথবা PDF হিসেবে সেভ করুন</button>
        </div>
        
        <div class="print-container">
          ${pagesHTML}
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const fileName = `Stroke_Letter_Worksheet_${titleSuffix.replace(/\s+/g, '_')}.html`;
      
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  // ==================== STORIES A4 PDF GENERATION WRAPPER ====================
  const downloadStoryPDF = useCallback((storiesToDownload: BanglaStory | BanglaStory[]) => {
    const isSingle = !Array.isArray(storiesToDownload);
    const list = isSingle ? [storiesToDownload as BanglaStory] : (storiesToDownload as BanglaStory[]);
    
    // Define level color styles for printable version
    const levelColors: Record<string, string> = {
      easy: 'linear-gradient(135deg, #10b981, #059669)', // green
      medium: 'linear-gradient(135deg, #f59e0b, #d97706)', // amber
      difficult: 'linear-gradient(135deg, #f43f5e, #e11d48)' // rose
    };
    
    const levelBorders: Record<string, string> = {
      easy: '#10b981',
      medium: '#f59e0b',
      difficult: '#f43f5e'
    };

    let pagesHTML = '';
    
    list.forEach((story) => {
      const bId = toBengaliNumber(story.id);
      const gradient = levelColors[story.level] || levelColors.easy;
      const borderCol = levelBorders[story.level] || levelBorders.easy;
      
      pagesHTML += `
        <div class="story-page">
          <div class="header">
            <div class="header-left">🇧🇩 শিশুদের বাংলা রিডিং গল্পমালা</div>
            <div class="header-right">গল্প নম্বর: ${bId}</div>
          </div>
          
          <div class="content">
            <div class="story-badge" style="background: ${gradient}">গল্প-${bId} • ${story.levelLabel} স্তর</div>
            <h1 class="title">${story.title}</h1>
            <p class="story-text">${story.text}</p>
            
            <div class="moral-box" style="border-color: ${borderCol}">
              <div class="moral-icon">💡</div>
              <div class="moral-content">
                <div class="moral-label" style="color: ${borderCol}">গল্পের শিক্ষণীয় বিষয় (শিক্ষা):</div>
                <h2 class="moral-text">${story.moral}</h2>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div>সহজ বাংলা রিডিং প্র্যাকটিস • ৪-১০ বছর বয়সী শিশুদের জন্য</div>
            <div>পৃষ্ঠা - ${bId}</div>
          </div>
        </div>
      `;
    });
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${isSingle ? list[0].title : 'ছোটদের বাংলা গল্পের বই'}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Noto+Serif+Bengali:wght@500;700&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4;
            margin: 18mm 15mm 18mm 15mm;
          }
          body {
            font-family: 'Hind Siliguri', 'Noto Serif Bengali', sans-serif;
            color: #1e293b;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
            line-height: 1.8;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .screen-helper {
            max-width: 800px;
            margin: 20px auto;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            padding: 20px;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          }
          .screen-helper h3 {
            margin: 0 0 8px 0;
            color: #1e40af;
            font-size: 18px;
            font-weight: 700;
          }
          .screen-helper p {
            margin: 0 0 15px 0;
            color: #334155;
            font-size: 14px;
          }
          .print-btn {
            background: #2563eb;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 15px;
            font-weight: 700;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 6px -1px rgb(37 99 235 / 0.2);
          }
          .print-btn:hover {
            background: #1d4ed8;
            transform: translateY(-1px);
          }
          .print-container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            padding: 20mm;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            box-sizing: border-box;
          }
          .story-page {
            page-break-after: always;
            position: relative;
            min-height: 240mm;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            padding-bottom: 5mm;
          }
          .story-page:last-child {
            page-break-after: avoid !important;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 4mm;
            margin-bottom: 8mm;
          }
          .header-left {
            font-size: 10pt;
            font-weight: 600;
            color: #64748b;
          }
          .header-right {
            font-size: 10pt;
            font-weight: 700;
            background: #f8fafc;
            color: #475569;
            padding: 1mm 3mm;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
          }
          .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .story-badge {
            display: inline-block;
            font-size: 11pt;
            font-weight: 700;
            color: #ffffff;
            padding: 1.5mm 4mm;
            border-radius: 20px;
            margin-bottom: 6mm;
            align-self: flex-start;
          }
          .title {
            font-family: 'Noto Serif Bengali', serif;
            font-size: 26pt;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 6mm 0;
            line-height: 1.3;
          }
          .story-text {
            font-size: 16pt;
            font-weight: 500;
            color: #334155;
            text-align: justify;
            margin-bottom: 10mm;
            white-space: pre-line;
            line-height: 2.1;
          }
          .moral-box {
            background-color: #fffbeb;
            border: 2px dashed #f59e0b;
            border-radius: 12px;
            padding: 5mm 6mm;
            margin-top: auto;
            display: flex;
            align-items: center;
            gap: 4mm;
          }
          .moral-icon {
            font-size: 20pt;
          }
          .moral-content {
            flex: 1;
          }
          .moral-label {
            font-size: 9pt;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 0.5mm;
          }
          .moral-text {
            font-size: 13pt;
            font-weight: 700;
            color: #78350f;
            margin: 0;
          }
          .footer {
            border-top: 2px solid #f1f5f9;
            padding-top: 4mm;
            margin-top: 8mm;
            display: flex;
            justify-content: space-between;
            font-size: 9pt;
            color: #94a3b8;
            font-weight: 500;
          }
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              background-color: white;
            }
            .print-container {
              box-shadow: none;
              padding: 0;
              max-width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="screen-helper no-print">
          <h3>📖 ছোটদের বাংলা রিডিং গল্পমালা (A4 PDF জেনারেটর)</h3>
          <p>আপনার গল্পটি ডাউনলোড করার জন্য রেডি! এটিকে <strong>A4 Size PDF</strong> হিসেবে সেভ করতে নিচের নীল বাটনে ক্লিক করুন অথবা কীবোর্ড থেকে <strong>Ctrl + P</strong> চাপুন। তারপর Destination-এ <strong>"Save as PDF"</strong> সিলেক্ট করুন।</p>
          <button class="print-btn" onclick="window.print()">🖨️ প্রিন্ট করুন অথবা PDF হিসেবে সেভ করুন</button>
        </div>
        
        <div class="print-container">
          ${pagesHTML}
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 800);
          };
        </script>
      </body>
      </html>
    `;
    
    // Create blob and download it directly
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const fileName = isSingle 
      ? `Bangla_Story_${list[0].id}_${list[0].title.replace(/\s+/g, '_')}.html`
      : 'Bangla_Stories_All_A4_Book.html';
      
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  // ==================== PROGRESSIVE SENTENCES HANDLERS ====================
  const startScrambleQuiz = useCallback((sentence: BanglaProgressiveSentence) => {
    // Strip trailing punctuation like । , ? !
    const cleanSentence = sentence.sentence.replace(/[।\?\!,]/g, '').trim();
    const words = cleanSentence.split(/\s+/).filter(Boolean);
    
    setScrambleSentence(sentence);
    setScrambleOriginalWords(words);
    
    // Create pool with unique IDs so duplicates can be tracked independently
    const poolItems = words.map((w, idx) => ({ id: `w_${idx}_${Date.now()}`, word: w }));
    
    // Shuffle the pool items (ensure it's actually shuffled and not identical to original)
    let shuffled = [...poolItems];
    let attempts = 0;
    while (attempts < 10) {
      shuffled.sort(() => Math.random() - 0.5);
      // Check if it's different from original order
      const isSame = shuffled.every((item, index) => item.word === words[index]);
      if (!isSame || words.length <= 1) break;
      attempts++;
    }
    
    setScramblePool(shuffled);
    setScrambleAnswer([]);
    setScrambleAttempts(0);
    setScrambleFeedback(null);
  }, []);

  const resetScrambleQuiz = useCallback(() => {
    if (scrambleSentence) {
      startScrambleQuiz(scrambleSentence);
    }
  }, [scrambleSentence, startScrambleQuiz]);

  const checkScrambleAnswer = useCallback(() => {
    const isCorrect = scrambleAnswer.map(item => item.word).join(' ') === scrambleOriginalWords.join(' ');
    if (isCorrect) {
      setScrambleFeedback('success');
      setMissionQuizCount((prev) => {
        if (prev >= 1) return prev;
        const next = prev + 1;
        localStorage.setItem('bangla_mission_quiz_count', next.toString());
        return next;
      });
      incrementDailyChallengeProgress('rearrange_solve');
    } else {
      const nextAttempts = scrambleAttempts + 1;
      setScrambleAttempts(nextAttempts);
      if (nextAttempts >= 3) {
        setScrambleFeedback('fail');
        // Auto-fill correct answer
        const correctAnswers = scrambleOriginalWords.map((w, idx) => ({ id: `correct_${idx}`, word: w }));
        setScrambleAnswer(correctAnswers);
        setScramblePool([]);
      } else {
        setScrambleFeedback('wrong');
      }
    }
  }, [scrambleAnswer, scrambleOriginalWords, scrambleAttempts, setMissionQuizCount, incrementDailyChallengeProgress]);

  const handleWordClickInPool = useCallback((item: { id: string; word: string }) => {
    if (scrambleFeedback === 'success' || scrambleFeedback === 'fail') return;
    setScramblePool(prev => prev.filter(x => x.id !== item.id));
    setScrambleAnswer(prev => [...prev, item]);
    if (scrambleFeedback === 'wrong') {
      setScrambleFeedback(null);
    }
  }, [scrambleFeedback]);

  const handleWordClickInAnswer = useCallback((item: { id: string; word: string }) => {
    if (scrambleFeedback === 'success' || scrambleFeedback === 'fail') return;
    setScrambleAnswer(prev => prev.filter(x => x.id !== item.id));
    setScramblePool(prev => [...prev, item]);
    if (scrambleFeedback === 'wrong') {
      setScrambleFeedback(null);
    }
  }, [scrambleFeedback]);



  // ==================== PRONUNCIATION LOGIC ====================

  const getSentence = useCallback((letterItem: AlphabetItem, specificWord?: any) => {
    if (!letterItem) return '';
    const wordToUse = specificWord || letterItem.words[0];
    const letter = letterItem.letter;
    const word = wordToUse?.word || '';
    return `${letter} তে ${word}`;
  }, []);

  const getKarSentence = useCallback((karItem: KarSignItem) => {
    if (!karItem) return '';
    if (!karItem.wordExample) return karItem.example || '';
    const vowel = karItem.vowel;
    const word = karItem.wordExample.word;
    return `${vowel} এর পরে ${vowel} তে ${word}`;
  }, []);

  // ==================== HANDLERS ====================

  const handleStart = useCallback(() => {
    speak("চলো শুরু করি").then(() => {
      setAudioReady(true);
    }).catch(() => {
      setAudioReady(true);
    });
  }, [speak]);

  const vowels = useMemo(() => BENGALI_ALPHABET.filter(i => i.type === 'vowel'), []);
  const consonants = useMemo(() => BENGALI_ALPHABET.filter(i => i.type === 'consonant'), []);

  const currentLetters = useMemo(() => {
    if (activeTab === 'vowel') return vowels;
    return consonants;
  }, [activeTab, vowels, consonants]);

  const filteredLearnLetters = useMemo(() => {
    if (!learnSearch.trim()) return currentLetters;
    const query = learnSearch.toLowerCase().trim();
    return currentLetters.filter(item => 
      item.letter.toLowerCase().includes(query) ||
      item.words.some(w => w.word.toLowerCase().includes(query))
    );
  }, [currentLetters, learnSearch]);

  const searchedWords = useMemo(() => {
    if (!wordsSearch.trim()) return [];
    const query = wordsSearch.toLowerCase().trim();
    const results: { letterItem: AlphabetItem; wordItem: any }[] = [];
    BENGALI_ALPHABET.forEach(letterItem => {
      const matchesLetter = letterItem.letter.toLowerCase().includes(query);
      letterItem.words.forEach(wordItem => {
        if (matchesLetter || wordItem.word.toLowerCase().includes(query)) {
          results.push({ letterItem, wordItem });
        }
      });
    });
    return results;
  }, [wordsSearch]);

  const confettiList = useMemo(() => {
    if (!showConfetti) return [];
    
    const emojis = ['⭐', '✨', '🎈', '❤️', '🌟', '🍀', '🎉', '🍎', '🌈', '💎'];
    const colors = [
      'bg-pink-500', 'bg-yellow-400', 'bg-cyan-400', 
      'bg-emerald-400', 'bg-purple-500', 'bg-orange-500', 
      'bg-blue-400', 'bg-red-500', 'bg-amber-400'
    ];
    
    return Array.from({ length: 45 }).map((_, i) => {
      const angle = (i / 45) * 360 + (Math.random() * 20 - 10);
      const speed = 1.5 + Math.random() * 2.5;
      const rad = (angle * Math.PI) / 180;
      
      return {
        id: i,
        emoji: Math.random() > 0.4 ? emojis[Math.floor(Math.random() * emojis.length)] : null,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() > 0.5 ? 'w-3.5 h-3.5' : 'w-2 h-2',
        shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm',
        startX: 50 + (Math.random() * 16 - 8),
        startY: 50 + (Math.random() * 16 - 8),
        targetX: Math.cos(rad) * (40 + Math.random() * 90),
        targetY: Math.sin(rad) * (40 + Math.random() * 90) - (30 + Math.random() * 50),
        rotate: Math.random() * 360 * 2,
        scale: 0.2 + Math.random() * 1.1,
        duration: 1.2 + Math.random() * 1.3,
        delay: Math.random() * 0.15,
      };
    });
  }, [showConfetti, confettiKey]);

  const trackSoundListened = () => {
    setMissionListenCount((prev) => {
      const next = prev < 5 ? prev + 1 : prev;
      try {
        localStorage.setItem('bangla_mission_listen_count', next.toString());
      } catch (e) {}
      return next;
    });
  };

  const handleLetterClick = (item: AlphabetItem) => {
    setSelectedLetter(item);
    speak(getSentence(item));
    trackSoundListened();
    
    // Auto-listen to primary word on letter click
    if (item.words && item.words[0]) {
      setListenedWords((prev) => {
        const letterWords = prev[item.id] || [];
        if (!letterWords.includes(item.words[0].word)) {
          const next = {
            ...prev,
            [item.id]: [...letterWords, item.words[0].word]
          };
          try {
            localStorage.setItem('bangla_listened_words', JSON.stringify(next));
          } catch {}
          return next;
        }
        return prev;
      });
    }
  };

  const handleWordClick = (item: AlphabetItem, word: any) => {
    speak(getSentence(item, word));
    trackSoundListened();

    setListenedWords((prev) => {
      const letterWords = prev[item.id] || [];
      if (!letterWords.includes(word.word)) {
        const next = {
          ...prev,
          [item.id]: [...letterWords, word.word]
        };
        try {
          localStorage.setItem('bangla_listened_words', JSON.stringify(next));
        } catch {}
        return next;
      }
      return prev;
    });
  };

  const handleKarClick = (kar: KarSignItem) => {
    speak(getKarSentence(kar));
    trackSoundListened();
  };

  const handleKarWordClick = (word: string) => {
    speak(word);
    trackSoundListened();
  };

  // Visually or phonetically similar letters for kids' adaptive smart distractors
  const SIMILAR_LETTERS_MAP: Record<string, string[]> = {
    'ক': ['ব', 'ফ', 'ভ', 'র', 'ত'],
    'খ': ['থ', 'গ', 'ত', 'য'],
    'গ': ['শ', 'থ', 'ম', 'ত'],
    'ঘ': ['ধ', 'ছ', 'হ', 'য'],
    'ঙ': ['উ', 'ত', 'ও', 'ড'],
    'চ': ['ছ', 'জ', 'ত', 'ড'],
    'ছ': ['চ', 'ঘ', 'ধ', 'হ'],
    'জ': ['ত', 'ভ', 'উ', 'চ'],
    'ঝ': ['ক', 'ফ', 'র', 'ঋ'],
    'ঞ': ['এ', 'ঐ', 'ও', 'ও'],
    'ট': ['ঠ', 'ড', 'ঢ', 'ত'],
    'ঠ': ['ট', 'ড', 'ঢ', 'প'],
    'ড': ['ঢ', 'ট', 'উ', 'ঊ'],
    'ঢ': ['ড', 'ট', 'চ', 'ঠ'],
    'ণ': ['ন', 'ল', 'প', 'শ'],
    'ত': ['ভ', 'অ', 'উ', 'ও'],
    'থ': ['খ', 'য', 'ফ', 'প'],
    'দ': ['ন', 'ল', 'প', 'ম'],
    'ধ': ['ঘ', 'ছ', 'হ', 'য'],
    'ন': ['ণ', 'ল', 'প', 'ম'],
    'প': ['ফ', 'ষ', 'য', 'থ'],
    'ফ': ['ক', 'ব', 'প', 'ভ'],
    'ব': ['ক', 'ফ', 'র', 'ভ'],
    'ভ': ['ত', 'অ', 'উ', 'ব'],
    'ম': ['য', 'ষ', 'ফ', 'প'],
    'য': ['ষ', 'ম', 'প', 'থ'],
    'র': ['ব', 'ক', 'ফ', 'ভ'],
    'ল': ['ন', 'ণ', 'প', 'শ'],
    'শ': ['ষ', 'স', 'গ', 'ণ'],
    'ষ': ['শ', 'স', 'প', 'ম'],
    'স': ['শ', 'ষ', 'হ', 'উ'],
    'হ': ['ই', 'ঈ', 'উ', 'ঊ'],
    'অ': ['আ', 'উ', 'ঊ', 'ও'],
    'আ': ['অ', 'উ', 'ঊ', 'ও'],
    'ই': ['ঈ', 'হ', 'উ', 'ঊ'],
    'ঈ': ['ই', 'হ', 'উ', 'ঊ'],
    'উ': ['ঊ', 'অ', 'আ', 'ও'],
    'ঊ': ['উ', 'অ', 'আ', 'ও'],
    'ঋ': ['ঝ', 'ক', 'ফ', 'র'],
    'এ': ['ঐ', 'ঞ', 'ও', 'ও'],
    'ঐ': ['এ', 'ঞ', 'ও', 'ও'],
    'ও': ['ঔ', 'অ', 'আ', 'উ'],
    'ঔ': ['ও', 'অ', 'আ', 'উ'],
  };

  // ==================== QUIZ LOGIC ====================
  
  const startNewQuizQuestion = useCallback(() => {
    // If adaptive difficulty is enabled, determine the mode and difficulty based on streak
    let activeMode: 'letter' | 'picToWord' = quizModeType;
    let isReverse = Math.random() > 0.5;

    if (isAdaptiveMode) {
      if (quizStreak < 3) {
        activeMode = 'letter';
        isReverse = false; // Level 1 (Easy): visual letter match
      } else if (quizStreak < 6) {
        activeMode = 'letter';
        isReverse = Math.random() > 0.5; // Level 2 (Medium): auditory/reverse letter match
      } else if (quizStreak < 9) {
        activeMode = 'picToWord';
        isReverse = false; // Level 3 (Hard): picture-to-word (visual spelling)
      } else {
        activeMode = 'picToWord';
        isReverse = Math.random() > 0.4; // Level 4 (Expert): picture-to-word with high complexity or listening
      }
      
      // Auto-sync tab selection state with current adaptive mode type
      if (quizModeType !== activeMode) {
        setQuizModeType(activeMode);
      }
    }

    // Filter alphabet by selected subset
    const subsetInfo = QUIZ_SUBSETS.find(s => s.id === selectedQuizSubset) || QUIZ_SUBSETS[0];
    const filteredAlphabet = BENGALI_ALPHABET.filter(item => subsetInfo.letters.includes(item.letter));
    const pool = filteredAlphabet.length > 0 ? filteredAlphabet : BENGALI_ALPHABET;
    
    const randomQuestion = pool[Math.floor(Math.random() * pool.length)];

    // Generate smart distractors based on difficulty level
    let options: AlphabetItem[] = [];
    
    if (isAdaptiveMode && quizStreak >= 3 && quizStreak < 6) {
      // Level 2 (Medium): Use visually or phonetically similar letters as distractors
      const similarLetters = SIMILAR_LETTERS_MAP[randomQuestion.letter] || [];
      const similarPool = pool.filter(item => similarLetters.includes(item.letter) && item.id !== randomQuestion.id);
      
      let selectedSimilar = similarPool.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      // If we don't have enough similar letters, fill with random letters from the active pool
      if (selectedSimilar.length < 3) {
        const remainingPool = pool.filter(item => item.id !== randomQuestion.id && !selectedSimilar.some(s => s.id === item.id));
        const extra = remainingPool.sort(() => 0.5 - Math.random()).slice(0, 3 - selectedSimilar.length);
        selectedSimilar = [...selectedSimilar, ...extra];
      }
      
      options = [...selectedSimilar, randomQuestion].sort(() => 0.5 - Math.random());
    } else if (isAdaptiveMode && quizStreak >= 9) {
      // Level 4 (Expert): Distractors should match vowel/consonant type to make word selection highly nuanced
      const sameTypePool = pool.filter(item => item.id !== randomQuestion.id && item.type === randomQuestion.type);
      let selectedExperts = sameTypePool.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      if (selectedExperts.length < 3) {
        const remainingPool = pool.filter(item => item.id !== randomQuestion.id && !selectedExperts.some(e => e.id === item.id));
        const extra = remainingPool.sort(() => 0.5 - Math.random()).slice(0, 3 - selectedExperts.length);
        selectedExperts = [...selectedExperts, ...extra];
      }
      options = [...selectedExperts, randomQuestion].sort(() => 0.5 - Math.random());
    } else {
      // Level 1 (Easy) or Standard Mode: simple random distractors
      const shuffledOptions = [...pool]
        .filter(i => i.id !== randomQuestion.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      options = [...shuffledOptions, randomQuestion].sort(() => 0.5 - Math.random());
    }

    setQuizState(prev => ({
      ...prev,
      question: randomQuestion,
      isReverse,
      options,
      feedback: null,
      selectedIndex: null,
    }));

    if (quizTimeoutRef.current) clearTimeout(quizTimeoutRef.current);
    quizTimeoutRef.current = setTimeout(() => {
      if (activeMode === 'picToWord') {
        if (isReverse) {
          speak(`সাউন্ড শোনো এবং কোন শব্দটি ঠিক তা খুঁজে নাও। শব্দটি হলো, ${randomQuestion.words[0]?.word}`);
        } else {
          speak("এটি কীসের ছবি? নিচে সঠিক শব্দটি বেছে নাও");
        }
      } else {
        if (isReverse) {
          speak(randomQuestion.letter);
        } else {
          speak(randomQuestion.words[0]?.word || '');
        }
      }
    }, 300);
  }, [speak, quizModeType, isAdaptiveMode, quizStreak, selectedQuizSubset]);

  const handleQuizAnswer = (index: number) => {
    if (quizState.feedback) return;
    const isCorrect = quizState.options[index].id === quizState.question?.id;

    let nextStreak = quizStreak;
    if (isCorrect) {
      nextStreak = quizStreak + 1;
      setQuizStreak(nextStreak);
      playSuccessSound();
      setMissionQuizCount((prev) => {
        if (prev >= 1) return prev;
        const next = prev + 1;
        localStorage.setItem('bangla_mission_quiz_count', next.toString());
        return next;
      });
      incrementDailyChallengeProgress('quiz_correct');
    } else {
      nextStreak = 0;
      setQuizStreak(0);
    }

    setQuizState(prev => ({
      ...prev,
      selectedIndex: index,
      feedback: isCorrect ? 'correct' : 'wrong',
      score: isCorrect ? prev.score + 1 : prev.score,
      total: prev.total + 1,
    }));

    if (isAdaptiveMode) {
      const targetMode = nextStreak < 6 ? 'letter' : 'picToWord';
      if (quizModeType !== targetMode) {
        setQuizModeType(targetMode);
      }
    }

    setTimeout(() => {
      if (isCorrect) {
        if (quizModeType === 'picToWord') {
          const selectedWord = quizState.question?.words[0]?.word || '';
          speak(`সাবাশ! ঠিক হয়েছে, এটি ${selectedWord}`);
        } else {
          speak("সাবাশ! ঠিক হয়েছে");
        }
      } else {
        if (quizModeType === 'picToWord') {
          const optionWord = quizState.options[index]?.words[0]?.word || '';
          speak(`ভুল হয়েছে। ওটি ছিল ${optionWord}। আবার চেষ্টা করো`);
        } else {
          speak("ভুল হয়েছে। আবার চেষ্টা করো");
        }
      }
    }, 300);

    if (quizTimeoutRef.current) clearTimeout(quizTimeoutRef.current);
    quizTimeoutRef.current = setTimeout(() => startNewQuizQuestion(), 2500);
  };

  useEffect(() => {
    if (isQuizMode && !quizState.question) {
      startNewQuizQuestion();
    }
  }, [isQuizMode, quizState.question, startNewQuizQuestion]);

  useEffect(() => {
    if (isQuizMode) {
      setQuizState(prev => ({ ...prev, question: null, feedback: null, selectedIndex: null }));
      startNewQuizQuestion();
    }
  }, [quizModeType, isQuizMode, selectedQuizSubset]);

  // ==================== PRACTICE MODE LOGIC ====================
  const startPracticeSession = useCallback(() => {
    setPracticeActive(true);
    setPracticeScore(0);
    setPracticeLives(3);
    setPracticeQuestionIndex(0);
    setPracticeAnswered(false);
    setPracticeSelectedIdx(null);
    setPracticeFeedback(null);
    setPracticeTimer(10);
    setIsPracticeFinished(false);
    setPracticeStreak(0);
    
    const firstQ = generatePracticeQuestion();
    setPracticeQuestion(firstQ);
    speak("র‍্যাপিড ফায়ার প্র্যাকটিস সেশন শুরু হচ্ছে! ১০ সেকেন্ডে সঠিক উত্তর দাও");
    if (firstQ.extra?.soundText) {
      setTimeout(() => {
        speak(firstQ.extra.soundText);
      }, 3000);
    }
  }, [speak]);

  const handleNextPracticeQuestion = useCallback(() => {
    setPracticeQuestionIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= 10) {
        setIsPracticeFinished(true);
        playSuccessSound();
        setTimeout(() => playSuccessSound(), 220);
        setTimeout(() => playSuccessSound(), 440);
        speak("অভিনন্দন! তুমি সফলভাবে ১০টি প্রশ্ন শেষ করেছো!");
        return prevIndex;
      }
      
      setPracticeAnswered(false);
      setPracticeSelectedIdx(null);
      setPracticeFeedback(null);
      setPracticeTimer(10);
      const nextQ = generatePracticeQuestion();
      setPracticeQuestion(nextQ);
      if (nextQ.extra?.soundText) {
        setTimeout(() => {
          speak(nextQ.extra.soundText);
        }, 500);
      }
      return nextIndex;
    });
  }, [speak]);

  const handlePracticeAnswer = (index: number) => {
    if (practiceAnswered || isPracticeFinished) return;
    
    const isCorrect = practiceQuestion.options[index] === practiceQuestion.correctAnswer;
    setPracticeSelectedIdx(index);
    setPracticeAnswered(true);
    
    if (isCorrect) {
      setPracticeFeedback('correct');
      setPracticeScore(s => s + 1);
      setPracticeStreak(st => st + 1);
      playSuccessSound();
      speak("সাবাশ! সঠিক হয়েছে");
    } else {
      setPracticeFeedback('wrong');
      setPracticeLives(l => {
        const nextL = l - 1;
        if (nextL <= 0) {
          setIsPracticeFinished(true);
          speak(`ভুল উত্তর। সঠিক উত্তর ছিল ${practiceQuestion.correctAnswer}। তোমার সব লাইফ শেষ হয়ে গেছে`);
        } else {
          speak(`ভুল উত্তর। সঠিক উত্তর ছিল ${practiceQuestion.correctAnswer}`);
        }
        return nextL;
      });
      setPracticeStreak(0);
    }

    // Auto transition to next question after 2.5s
    setTimeout(() => {
      setIsPracticeFinished(finished => {
        if (!finished) {
          handleNextPracticeQuestion();
        }
        return finished;
      });
    }, 2500);
  };

  // Practice Timer Effect
  useEffect(() => {
    if (activeMode !== 'practice' || !practiceActive || isPracticeFinished || practiceAnswered) return;

    const timerInterval = setInterval(() => {
      setPracticeTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          // Time's up! Treat as incorrect
          setPracticeAnswered(true);
          setPracticeFeedback('wrong');
          setPracticeLives(l => {
            const nextL = l - 1;
            if (nextL <= 0) {
              setIsPracticeFinished(true);
              speak("সময় শেষ হয়ে গেছে! তোমার সব লাইফ শেষ। আবার চেষ্টা করো!");
            } else {
              speak("সময় শেষ হয়ে গেছে! পরবর্তী প্রশ্ন আসছে");
            }
            return nextL;
          });
          setPracticeStreak(0);
          
          setTimeout(() => {
            setIsPracticeFinished(finished => {
              if (!finished) {
                handleNextPracticeQuestion();
              }
              return finished;
            });
          }, 2500);
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [activeMode, practiceActive, isPracticeFinished, practiceAnswered, handleNextPracticeQuestion, speak]);

  useEffect(() => {
    if (activeMode === 'practice') {
      setPracticeActive(false);
      setIsPracticeFinished(false);
      setPracticeQuestion(null);
    }
  }, [activeMode]);

  // Consonant Kar Auto-Play Effect
  useEffect(() => {
    if (!isPlayingAll || playingIndex === null || !selectedConsonant) {
      return;
    }

    let active = true;
    const currentItem = KAR_VOWELS_MAPPING[playingIndex];
    if (!currentItem) {
      setIsPlayingAll(false);
      setPlayingIndex(null);
      return;
    }

    const syllable = selectedConsonant + currentItem.kar;
    const textToSpeak = `${selectedConsonant} এ ${currentItem.name} ${syllable}`;

    speak(textToSpeak).then(() => {
      if (active && isPlayingAll) {
        // Pause briefly (e.g. 1000ms) before moving to next
        const timeout = setTimeout(() => {
          if (active && isPlayingAll) {
            if (playingIndex < KAR_VOWELS_MAPPING.length - 1) {
              setPlayingIndex(prev => (prev !== null ? prev + 1 : null));
            } else {
              setIsPlayingAll(false);
              setPlayingIndex(null);
              speak("সবগুলো উচ্চারণ সম্পন্ন হয়েছে");
            }
          }
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }).catch(() => {
      if (active) {
        setIsPlayingAll(false);
        setPlayingIndex(null);
      }
    });

    return () => {
      active = false;
    };
  }, [isPlayingAll, playingIndex, selectedConsonant, speak]);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      timeoutRefs.current.forEach(clearTimeout);
      if (quizTimeoutRef.current) clearTimeout(quizTimeoutRef.current);
    };
  }, []);

  const playLogoDingSound = () => {
    if (typeof window !== 'undefined' && localStorage.getItem('isAudioMuted') === 'true') return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
      osc.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.08); // E6
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(2637.02, ctx.currentTime); // E7
      subGain.gain.setValueAtTime(0, ctx.currentTime);
      subGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.01);
      subGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      
      osc.connect(gain);
      subOsc.connect(subGain);
      
      gain.connect(ctx.destination);
      subGain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      subOsc.start(ctx.currentTime);
      
      osc.stop(ctx.currentTime + 0.6);
      subOsc.stop(ctx.currentTime + 0.25);
    } catch (error) {
      console.error("Audio error:", error);
    }
  };

  // ==================== START SCREEN ====================
  if (!audioReady) {
    const floatingLetters = [
      { text: 'অ', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', size: 'text-4xl sm:text-5xl', x: '10%', y: '15%', delay: 0, scale: 1 },
      { text: 'আ', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', size: 'text-5xl sm:text-6xl', x: '82%', y: '12%', delay: 1.5, scale: 1.1 },
      { text: 'ই', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', size: 'text-4xl sm:text-5xl', x: '15%', y: '68%', delay: 0.8, scale: 0.95 },
      { text: 'ক', color: 'text-sky-400 bg-sky-500/10 border-sky-500/20', size: 'text-5xl sm:text-6xl', x: '78%', y: '74%', delay: 2.2, scale: 1.15 },
      { text: 'খ', color: 'text-violet-400 bg-violet-500/10 border-violet-500/20', size: 'text-6xl sm:text-7xl', x: '85%', y: '42%', delay: 1.2, scale: 1.2 },
      { text: 'গ', color: 'text-pink-400 bg-pink-500/10 border-pink-500/20', size: 'text-4xl sm:text-5xl', x: '5%', y: '38%', delay: 2.8, scale: 0.9 },
      { text: 'ঘ', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', size: 'text-5xl sm:text-6xl', x: '45%', y: '6%', delay: 0.5, scale: 1.05 },
      { text: 'চ', color: 'text-teal-400 bg-teal-500/10 border-teal-500/20', size: 'text-4xl sm:text-5xl', x: '42%', y: '86%', delay: 1.9, scale: 1 },
      { text: 'ট', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20', size: 'text-5xl sm:text-6xl', x: '25%', y: '28%', delay: 3.3, scale: 1.1 },
      { text: 'ম', color: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20', size: 'text-4xl sm:text-5xl', x: '68%', y: '52%', delay: 2.5, scale: 0.95 }
    ];

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#0b0f19] via-[#141b2d] to-[#090d16] p-6 z-[100] overflow-hidden select-none">
        {/* Top Left Logo Image on Start Screen - Direct child for #root > div:first-child > img selector */}
        <img
          src="https://i.imgur.com/akJtZZb.jpeg"
          alt="Logo"
          onClick={playLogoDingSound}
          className="absolute top-4 left-4 z-[110] w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-teal-500/30 object-cover shadow-lg cursor-pointer transition-all duration-300"
          referrerPolicy="no-referrer"
        />
        {/* Elegant Tooltip styled with a sleek border-glow arrow */}
        <div className="logo-tooltip absolute top-[72px] left-4 z-[120] bg-[#0d1527]/95 border border-teal-500/40 text-teal-300 text-xs font-extrabold tracking-wide px-3 py-1.5 rounded-lg shadow-2xl backdrop-blur-md whitespace-nowrap select-none pointer-events-none">
          <div className="absolute -top-1 left-5 w-2 h-2 rotate-45 bg-[#0d1527] border-t border-l border-teal-500/40"></div>
          বাংলার রঙে সাজি
        </div>
        {/* Text information companion next to the logo */}
        <div className="absolute top-4 left-16 sm:left-20 z-[110] hidden sm:flex flex-col text-left">
          <span className="text-xs sm:text-sm font-black text-[#f0f6fc] tracking-wider leading-none">
            বর্ণমালা মজা
          </span>
          <span className="text-[9px] text-teal-400 font-bold mt-0.5">
            সোনার বাংলা
          </span>
        </div>

        {/* Colorful Glowing Ambient Blobs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-[140px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] animate-pulse pointer-events-none"></div>
        <div className="absolute top-1/3 right-12 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-12 left-12 w-80 h-80 bg-violet-500/10 rounded-full blur-[130px] animate-pulse pointer-events-none"></div>

        {/* Floating Colorful Bengali Letters */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {floatingLetters.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0.6, 0.9, 0.6],
                y: [0, -30, 0],
                rotate: [0, 15, -15, 0],
                scale: [item.scale, item.scale * 1.08, item.scale]
              }}
              transition={{
                duration: 6 + (idx % 3) * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay
              }}
              style={{ position: 'absolute', left: item.x, top: item.y }}
              className={`flex items-center justify-center px-4 py-3 rounded-2xl border backdrop-blur-sm shadow-xl ${item.color} ${item.size} font-black font-sans`}
            >
              {item.text}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="bg-[#121824]/90 border border-[#30363d]/80 rounded-3xl p-8 sm:p-14 text-center shadow-[0_0_50px_rgba(20,184,166,0.18)] max-w-md w-full relative overflow-hidden z-10"
        >
          {/* Ambient Glow inside start screen */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <motion.div
            animate={{ scale: [1, 1.12, 1], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 bg-gradient-to-tr from-teal-500/20 to-cyan-500/20 border border-teal-500/40 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl relative"
          >
            <Icon name="Volume2" className="w-12 h-12 text-teal-400" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 mb-4 tracking-tight drop-shadow-sm">
            বর্ণমালা মজা
          </h1>
          <p className="text-slate-300 mb-10 font-bold text-xl leading-relaxed px-2 tracking-wide">
            বাংলা বর্ণমালা শিখো<br />
            <span className="text-teal-400 text-lg font-bold">সাউন্ড সহ!</span>
          </p>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 hover:from-teal-400 hover:via-cyan-400 hover:to-emerald-400 text-[#0d1117] font-black py-5 rounded-2xl text-2xl shadow-[0_0_25px_rgba(20,184,166,0.4)] transition-all mb-6 relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              🚀 চলো শুরু করি
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>

          <div className="space-y-2 text-sm text-[#8b949e]">
            <p className="flex items-center justify-center gap-1.5 font-medium"><span className="text-emerald-400">✔</span> Google TTS ব্যবহার করে</p>
            <p className="flex items-center justify-center gap-1.5 font-medium"><span className="text-emerald-400">✔</span> সব ব্রাউজারে কাজ করে</p>
            <p className="flex items-center justify-center gap-1.5 font-medium"><span className="text-emerald-400">✔</span> Internet লাগবে</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12 relative">
      <React.Suspense fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] text-teal-400 font-black text-lg gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-teal-500 border-t-transparent animate-spin"></div>
          <span>⏳ লোড হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন</span>
        </div>
      }>
      {/* Top Left Logo Image */}
      <div className="absolute top-4 left-4 z-40 flex items-center gap-2">
        <img
          src="https://i.imgur.com/akJtZZb.jpeg"
          alt="Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-teal-500/30 object-cover shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs sm:text-sm font-black text-[#f0f6fc] tracking-wider leading-none">
            বর্ণমালা মজা
          </span>
          <span className="text-[9px] text-teal-400 font-bold mt-0.5">
            সোনার বাংলা
          </span>
        </div>
      </div>

      {/* Simulated Email OTP Notification Push Alert */}
      <AnimatePresence>
        {simulatedEmail && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-4 left-4 right-4 sm:left-auto sm:right-6 z-[11000] max-w-sm bg-[#1c2128] border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden p-4 text-left"
          >
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📧</span>
                <div>
                  <h4 className="text-xs font-black text-amber-400">নতুন ইমেইল (New Email Receipt)</h4>
                  <p className="text-[10px] text-[#8b949e] font-mono select-all">To: {simulatedEmail.to}</p>
                </div>
              </div>
              <button
                onClick={() => setSimulatedEmail(null)}
                className="text-slate-400 hover:text-white bg-slate-800/50 p-1 rounded-full transition-all cursor-pointer border-none outline-none"
              >
                <Icon name="X" className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#f0f6fc]">
                <span className="text-[#8b949e]">Subject:</span> {simulatedEmail.subject}
              </div>
              <div className="p-3 bg-[#0d1117] rounded-xl border border-[#21262d] text-xs leading-relaxed text-[#c9d1d9] font-mono">
                {simulatedEmail.body}
                <div className="mt-2.5 text-center p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-lg font-black tracking-widest select-all">
                  {simulatedEmail.otp}
                </div>
              </div>
              <div className="flex justify-end gap-1.5 text-[10px] text-[#8b949e] pt-1">
                <span>Bangla Learn Secure Mailer 📧</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Login & Profile Controls + Persistent Global Audio Toggle */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2.5">
        {/* User Sound/Audio settings Button */}
        <button
          onClick={() => {
            setShowSettingsModal(true);
            speak("সেটিংস সেটিংস খোলা হয়েছে");
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-black shadow-lg border bg-slate-800/80 hover:bg-slate-800 border-[#30363d] hover:border-slate-500 text-slate-300 hover:text-white transition-all cursor-pointer select-none group"
          title="শব্দ ও সাউন্ড সেটিংস (Audio and Music Settings)"
        >
          <Icon name="Settings" className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300 text-slate-400 group-hover:text-teal-400" />
          <span>⚙️ সেটিংস</span>
        </button>

        {/* Global Persistent Audio Toggle Button */}
        <button
          onClick={toggleAudioMuted}
          className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-black shadow-lg border transition-all cursor-pointer select-none ${
            isAudioMuted
              ? 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/30 hover:border-rose-500/50 text-rose-400'
              : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400'
          }`}
          title={isAudioMuted ? "আওয়াজ চালু করুন (Enable Sound)" : "আওয়াজ বন্ধ করুন (Mute Sound)"}
        >
          <Icon name={isAudioMuted ? "VolumeX" : "Volume2"} className={`w-3.5 h-3.5 ${!isAudioMuted ? 'animate-pulse' : ''}`} />
          <span>{isAudioMuted ? "🔇 শব্দ বন্ধ" : "🔊 শব্দ চালু"}</span>
        </button>

        {isLoggedIn ? (
          <div className="flex items-center gap-2 bg-[#161b22]/95 backdrop-blur-md border border-[#30363d] pl-3 sm:pl-4 pr-1.5 py-1.5 rounded-full shadow-2xl transition-all duration-300">
            <button
              onClick={() => {
                setShowAdminSettingsModal(true);
                setAdminSettingsError('');
                setAdminSettingsSuccess('');
                setCurrentPasswordInput('');
                setNewAdminPasswordInput('');
                setConfirmAdminPasswordInput('');
                setIsSettingUp2fa(false);
                speak("অ্যাডমিন সেটিংস");
              }}
              className="flex items-center gap-1 hover:text-teal-400 group cursor-pointer"
              title="অ্যাডমিন নিরাপত্তা সেটিংস (Admin Settings)"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
              <span className="text-[10px] sm:text-xs font-black text-[#f0f6fc] group-hover:text-teal-400 tracking-wide transition-all">
                Bangladesh1971 👑
              </span>
              <Icon name="Settings" className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover:text-teal-400 group-hover:rotate-45 transition-all duration-300" />
            </button>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.setItem('bangla_admin_logged_in', 'false');
                speak("লগ আউট সফল হয়েছে");
              }}
              className="px-2.5 py-1 text-[10px] sm:text-xs font-black text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 rounded-full transition-all cursor-pointer select-none flex items-center gap-1"
              title="লগ আউট করুন (Logout)"
            >
              <span>লগআউট</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setShowLoginModal(true);
              setLoginUsername('');
              setLoginPassword('');
              setLoginError('');
              speak("অ্যাডমিন লগইন");
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 hover:from-teal-500/20 hover:to-indigo-500/20 border border-teal-500/30 hover:border-teal-400 px-3.5 py-2 rounded-full text-[11px] sm:text-xs font-black text-teal-400 shadow-md transition-all cursor-pointer select-none"
          >
            <span>🔒</span>
            <span>অ্যাডমিন লগইন</span>
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-4 sm:pt-12">
        {/* Header */}
        <header className="text-center mb-4 sm:mb-10">
          {/* Daily Learning Streak Widget */}
          <div className="flex flex-col items-center justify-center mb-6 px-4">
            <div className="relative bg-[#161b22]/90 backdrop-blur-md border border-[#30363d] px-4 py-2.5 rounded-2xl shadow-xl flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto">
              <div 
                className="flex items-center gap-2.5 bg-[#0d1117] px-3.5 py-2 rounded-xl cursor-pointer hover:bg-slate-900 border border-[#21262d] transition-all group relative overflow-hidden"
                onClick={() => {
                  // Direct increment for easy grading/testing
                  let currentStreak = streak + 1;
                  setStreak(currentStreak);
                  localStorage.setItem('bangla_learning_streak', currentStreak.toString());
                  if (currentStreak === 5) {
                    setShowStreakMilestone(true);
                    speak("ওয়াও! তুমি টানা ৫ দিনের লার্নিং স্ট্রিক অর্জন করেছো! চমৎকার!");
                  } else {
                    speak(`${currentStreak} দিনের স্ট্রিক`);
                  }
                }}
                title="স্ট্রিক বাড়ানোর জন্য ক্লিক করো (Click to test/increment!)"
              >
                <motion.div
                  animate={streak > 0 ? {
                    scale: [1, 1.25, 0.95, 1.2, 1],
                    rotate: [0, -8, 8, -4, 0],
                    filter: [
                      "drop-shadow(0 0 4px rgba(249,115,22,0.4))",
                      "drop-shadow(0 0 14px rgba(249,115,22,0.95))",
                      "drop-shadow(0 0 4px rgba(249,115,22,0.4))"
                    ]
                  } : {}}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`text-2xl transition-transform duration-300 group-hover:scale-125 ${streak > 0 ? 'inline-block' : 'opacity-60 inline-block'}`}
                >
                  🔥
                </motion.div>
                <div className="text-left">
                  <div className="text-[9px] font-black text-amber-400 uppercase tracking-wider">লার্নিং স্ট্রিক (Daily Streak)</div>
                  <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                    <span>{streak} দিন (Days)</span>
                    <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-mono animate-pulse">TEST CLICK</span>
                  </div>
                </div>
              </div>

              {/* Progress bar and milestone dots to 5-day milestone */}
              <div className="flex flex-col justify-center items-start min-w-[140px] sm:min-w-[185px]">
                <div className="flex justify-between w-full items-center mb-1">
                  <span className="text-[10px] text-[#8b949e] font-black">৫-দিনের লক্ষ্য (5-day Goal)</span>
                  <span className="text-[10px] text-amber-400 font-black">{Math.min(100, Math.round((streak / 5) * 100))}%</span>
                </div>
                
                {/* Visual milestone progress bar */}
                <div className="w-full bg-[#0d1117] h-1.5 rounded-full overflow-hidden border border-[#21262d] relative mb-1.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (streak / 5) * 100)}%` }}
                    transition={{ type: "spring", stiffness: 85, damping: 14 }}
                    className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]"
                  />
                </div>

                <div className="flex items-center gap-1.5 w-full justify-between">
                  {[1, 2, 3, 4, 5].map((dayNum) => {
                    const isCompleted = streak >= dayNum;
                    const isNextGoal = streak + 1 === dayNum && streak < 5;
                    return (
                      <motion.div 
                        key={dayNum}
                        initial={isCompleted ? { scale: 1.1 } : { scale: 1 }}
                        animate={isCompleted ? { 
                          scale: [1, 1.25, 1.1],
                          y: [0, -2, 0]
                        } : isNextGoal ? {
                          scale: [1, 1.08, 1],
                          borderColor: ["#30363d", "#f59e0b", "#30363d"]
                        } : {}}
                        transition={isCompleted ? {
                          duration: 0.45,
                          ease: "easeOut"
                        } : isNextGoal ? {
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border transition-all duration-300 relative ${
                          isCompleted 
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-transparent font-extrabold shadow-lg shadow-orange-500/30' 
                            : 'bg-[#0d1117] text-[#8b949e] border-[#30363d]'
                        }`}
                        title={`Day ${dayNum}`}
                      >
                        {dayNum === 5 ? (
                          <span className={isCompleted ? 'animate-bounce inline-block text-[11px]' : 'text-[11px]'}>🎁</span>
                        ) : dayNum}

                        {/* Interactive glow ring around the newly active streak dot */}
                        {isCompleted && streak === dayNum && (
                          <span className="absolute -inset-0.5 rounded-full border border-orange-400 animate-ping opacity-75 pointer-events-none" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Reset shortcut */}
              <button
                onClick={() => {
                  setStreak(0);
                  localStorage.setItem('bangla_learning_streak', '0');
                  localStorage.removeItem('bangla_learning_streak_date');
                  speak("স্ট্রিক রিসেট করা হয়েছে");
                }}
                className="text-[10px] text-rose-400 hover:text-rose-300 border border-rose-500/20 hover:border-rose-500/40 bg-rose-500/5 px-2 py-1.5 rounded-xl font-black transition-all cursor-pointer self-stretch flex items-center justify-center"
                title="রিসেট করুন (Reset Streak)"
              >
                রিসেট (Reset)
              </button>
            </div>
          </div>

          {/* Daily Missions System */}
          <div className="max-w-2xl mx-auto px-4 mb-8">
            <div className="bg-[#161b22]/95 backdrop-blur-md border border-[#30363d] p-5 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 border-b border-[#30363d]/70 pb-3">
                <div className="flex items-center gap-2.5 text-left">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white tracking-wide">আজকের ডেইলি মিশন (Daily Missions)</h3>
                    <p className="text-[10px] sm:text-xs text-[#8b949e] font-semibold">৩টি মিশন সম্পন্ন করে অর্জন করো স্পেশাল গোল্ডেন বাংলা ব্যাজ!</p>
                  </div>
                </div>
                
                {/* Badge Reward Section */}
                <div className="flex items-center gap-2.5 bg-[#0d1117] px-3.5 py-1.5 rounded-2xl border border-[#21262d]">
                  <div className="text-right">
                    <div className="text-[9px] font-black text-amber-400 uppercase">আজকের পুরস্কার (Reward)</div>
                    <div className="text-xs font-black text-white">{isBadgeEarned ? "অর্জিত! 🎉" : "গোল্ডেন ব্যাজ 🏅"}</div>
                  </div>
                  <motion.div 
                    animate={isBadgeEarned ? { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.15, 1] } : {}}
                    transition={{ repeat: Infinity, repeatDelay: 5, duration: 1 }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xl shadow-md cursor-pointer ${
                      isBadgeEarned 
                        ? 'bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white animate-pulse' 
                        : 'bg-slate-800 text-slate-500 border border-slate-700 opacity-60'
                    }`}
                    title={isBadgeEarned ? "অভিনন্দন! আপনি আজকে গোল্ডেন বাংলা ব্যাজ জিতেছেন।" : "মিশনগুলো সম্পন্ন করে ব্যাজটি অর্জন করুন।"}
                    onClick={() => {
                      if (isBadgeEarned) {
                        speak("অভিনন্দন! তুমি আজকের সব ডেইলি মিশন শেষ করে গোল্ডেন বাংলা ব্যাজ অর্জন করেছ! চমৎকার!");
                        setShowBadgeClaimedModal(true);
                      } else {
                        speak("সবগুলো ডেইলি মিশন সফলভাবে সম্পন্ন করলে এই গোল্ডেন বাংলা ব্যাজটি খুলে যাবে!");
                      }
                    }}
                  >
                    🏅
                  </motion.div>
                </div>
              </div>

              {/* 3 Unique Learning Missions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Mission 1: Listen to 5 sounds */}
                <div className={`relative p-3.5 rounded-2xl border transition-all duration-300 ${
                  missionListenCount >= 5 
                    ? 'bg-teal-500/5 border-teal-500/30' 
                    : 'bg-[#0d1117]/80 border-[#30363d] hover:border-slate-700'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                        missionListenCount >= 5 ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-300'
                      }`}>
                        <Icon name="Volume2" className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-black text-slate-200">শোনা মিশন</span>
                    </div>
                    {missionListenCount >= 5 ? (
                      <span className="text-xs text-teal-400 font-extrabold flex items-center gap-0.5">
                        ✓ সম্পন্ন
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono font-black text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        {missionListenCount}/5
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-400 text-left leading-snug mb-3">
                    ৫টি বর্ণ বা শব্দের উচ্চারণ স্পর্শ করে শোনো।
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-[#161b22] h-1.5 rounded-full overflow-hidden mb-2.5">
                    <div 
                      className="bg-teal-500 h-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, (missionListenCount / 5) * 100)}%` }}
                    ></div>
                  </div>

                  {/* Manual trigger for instant gratification / testing */}
                  <button
                    onClick={() => {
                      setMissionListenCount((prev) => {
                        const next = Math.min(5, prev + 1);
                        localStorage.setItem('bangla_mission_listen_count', next.toString());
                        speak(`মিশন অগ্রগতি: শোনা ${next}`);
                        return next;
                      });
                    }}
                    className="w-full py-1 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 rounded-lg text-[10px] font-black text-slate-400 hover:text-slate-300 transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>🔊 টেস্ট শুনুন (+1)</span>
                  </button>
                </div>

                {/* Mission 2: Practice drawing 3 letters */}
                <div className={`relative p-3.5 rounded-2xl border transition-all duration-300 ${
                  missionDrawCount >= 3 
                    ? 'bg-purple-500/5 border-purple-500/30' 
                    : 'bg-[#0d1117]/80 border-[#30363d] hover:border-slate-700'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                        missionDrawCount >= 3 ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-300'
                      }`}>
                        <Icon name="PenTool" className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-black text-slate-200">আঁকা মিশন</span>
                    </div>
                    {missionDrawCount >= 3 ? (
                      <span className="text-xs text-purple-400 font-extrabold flex items-center gap-0.5">
                        ✓ সম্পন্ন
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono font-black text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        {missionDrawCount}/3
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-400 text-left leading-snug mb-3">
                    লিখি বা ডটেড মোডে যেকোনো ৩টি বর্ণ আঁকার চেষ্টা করো।
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-[#161b22] h-1.5 rounded-full overflow-hidden mb-2.5">
                    <div 
                      className="bg-purple-500 h-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, (missionDrawCount / 3) * 100)}%` }}
                    ></div>
                  </div>

                  {/* Manual trigger */}
                  <button
                    onClick={() => {
                      setMissionDrawCount((prev) => {
                        const next = Math.min(3, prev + 1);
                        localStorage.setItem('bangla_mission_draw_count', next.toString());
                        speak(`মিশন অগ্রগতি: আঁকা ${next}`);
                        return next;
                      });
                    }}
                    className="w-full py-1 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 rounded-lg text-[10px] font-black text-slate-400 hover:text-slate-300 transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>✍️ টেস্ট আঁকুন (+1)</span>
                  </button>
                </div>

                {/* Mission 3: Complete 1 Quiz or Scramble Game */}
                <div className={`relative p-3.5 rounded-2xl border transition-all duration-300 ${
                  missionQuizCount >= 1 
                    ? 'bg-amber-500/5 border-amber-500/30' 
                    : 'bg-[#0d1117]/80 border-[#30363d] hover:border-slate-700'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                        missionQuizCount >= 1 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-300'
                      }`}>
                        <Icon name="Trophy" className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-black text-slate-200">কুইজ মিশন</span>
                    </div>
                    {missionQuizCount >= 1 ? (
                      <span className="text-xs text-amber-400 font-extrabold flex items-center gap-0.5">
                        ✓ সম্পন্ন
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono font-black text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        {missionQuizCount}/1
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-400 text-left leading-snug mb-3">
                    ১টি সঠিক কুইজ উত্তর বা স্ক্র্যাম্বল গেমের সমাধান করো।
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-[#161b22] h-1.5 rounded-full overflow-hidden mb-2.5">
                    <div 
                      className="bg-amber-500 h-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, (missionQuizCount / 1) * 100)}%` }}
                    ></div>
                  </div>

                  {/* Manual trigger */}
                  <button
                    onClick={() => {
                      setMissionQuizCount((prev) => {
                        const next = Math.min(1, prev + 1);
                        localStorage.setItem('bangla_mission_quiz_count', next.toString());
                        speak(`মিশন অগ্রগতি: কুইজ ${next}`);
                        return next;
                      });
                    }}
                    className="w-full py-1 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 rounded-lg text-[10px] font-black text-slate-400 hover:text-slate-300 transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>🏆 টেস্ট কুইজ (+1)</span>
                  </button>
                </div>
              </div>

              {/* Progress Reset / Info Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#30363d]/50 text-[11px] text-[#8b949e]">
                <span>⏰ প্রতিদিন মিশন পরিবর্তন হয়</span>
                <button
                  onClick={() => {
                    setMissionListenCount(0);
                    setMissionDrawCount(0);
                    setMissionQuizCount(0);
                    localStorage.setItem('bangla_mission_listen_count', '0');
                    localStorage.setItem('bangla_mission_draw_count', '0');
                    localStorage.setItem('bangla_mission_quiz_count', '0');
                    
                    // Let the user clear awarded date so they can earn again today for testing!
                    localStorage.removeItem('bangla_badge_awarded_date');
                    
                    speak("সব মিশন রিসেট করা হয়েছে");
                  }}
                  className="text-rose-400 hover:text-rose-300 transition-all cursor-pointer bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-xl font-black"
                >
                  মিশন রিসেট (Reset Missions)
                </button>
              </div>
            </div>
          </div>

          {/* Daily Challenge UI Section */}
          {(() => {
            const challenge = dailyChallenge;
            if (!challenge) return null;

            return (
              <div className="max-w-2xl mx-auto px-4 mb-8">
                <div className={`relative p-6 rounded-3xl border shadow-2xl transition-all overflow-hidden text-left ${
                  dailyCompleted 
                    ? 'bg-gradient-to-br from-emerald-950/40 to-[#161b22]/95 border-emerald-500/40' 
                    : 'bg-[#161b22]/95 border-[#30363d] hover:border-slate-700'
                }`}>
                  {/* Confetti or Ambient Glow for Completed Challenges */}
                  {dailyCompleted && (
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
                  )}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#30363d]/60 pb-4 mb-4">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-4xl animate-bounce">{challenge.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded-full">
                            ডেইলি চ্যালেঞ্জ (Daily Challenge)
                          </span>
                          {dailyCompleted && (
                            <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full animate-pulse">
                              সম্পন্ন!
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-black text-white mt-1 leading-snug">{challenge.bnTitle}</h3>
                        <p className="text-xs text-slate-400 font-semibold mt-1">{challenge.bnDescription}</p>
                      </div>
                    </div>

                    {/* Reward Badge */}
                    <div className="flex items-center gap-2 bg-[#0d1117] px-3.5 py-2 rounded-2xl border border-[#21262d]">
                      <div className="text-right">
                        <div className="text-[9px] font-black text-amber-400 uppercase">পুরস্কার (Reward)</div>
                        <div className="text-xs font-black text-white">+{challenge.rewardPoints} পয়েন্ট 🌟</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress and Action Section */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center text-xs font-black text-slate-300 mb-2">
                        <span>অগ্রগতি (Progress)</span>
                        <span className="font-mono text-indigo-400">
                          {dailyProgress} / {challenge.targetCount}
                        </span>
                      </div>
                      
                      {/* Progress Bar Container */}
                      <div className="w-full bg-[#0d1117] h-3 rounded-full overflow-hidden border border-[#21262d]">
                        <motion.div 
                          className={`h-full rounded-full ${
                            dailyCompleted 
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                              : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (dailyProgress / challenge.targetCount) * 100)}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                      {/* Navigate to game Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setActiveMode(challenge.targetMode);
                          setIsQuizMode(challenge.targetMode === 'quiz');
                          speak(`চলো আজকের চ্যালেঞ্জ ${challenge.bnTitle} শুরু করি!`);
                        }}
                        className={`flex-1 py-3 px-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          dailyCompleted
                            ? 'bg-[#1b2a22] text-emerald-400 border border-emerald-500/20 hover:bg-[#20352a]'
                            : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-950/40'
                        }`}
                      >
                        <Icon name="Gamepad2" className="w-4.5 h-4.5" />
                        <span>
                          {dailyCompleted ? 'চ্যালেঞ্জটি আবার খেলো' : 'চলো চ্যালেঞ্জটি শুরু করি! (Play Challenge)'}
                        </span>
                      </motion.button>

                      {/* Parent/Teacher Debug Tools */}
                      <div className="flex gap-2">
                        {/* Test progress button */}
                        <button
                          onClick={() => {
                            incrementDailyChallengeProgress(
                              challenge.id === 'vowels-trace' || challenge.id === 'consonant-k' ? 'trace' :
                              challenge.id === 'words-learn' ? 'listen_word' :
                              challenge.id === 'quiz-o' ? 'quiz_correct' :
                              challenge.id === 'rearrange-solve' ? 'rearrange_solve' :
                              challenge.id === 'kar-signs' ? 'kar_view' :
                              challenge.id === 'story-read' ? 'story_open' :
                              challenge.id === 'sentences-practice' ? 'sentence_listen' :
                              challenge.id === 'antonyms-match' ? 'antonyms_match' :
                              challenge.id === 'kar-words' ? 'kar_word_listen' : 'trace',
                              challenge.id === 'vowels-trace' ? { letter: 'অ' } :
                              challenge.id === 'consonant-k' ? { letter: 'ক' } : {}
                            );
                          }}
                          className="px-3.5 py-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-2xl text-xs font-black text-indigo-400 hover:text-indigo-300 transition-all cursor-pointer flex items-center gap-1"
                          title="অগ্রগতি বাড়ানোর জন্য টেস্ট বাটন"
                        >
                          <span>➕ টেস্ট (+1)</span>
                        </button>

                        {/* Reset button */}
                        <button
                          onClick={() => {
                            const todayStr = getDailyChallengeTodayStr();
                            localStorage.setItem(`bangla_daily_progress_${todayStr}`, '0');
                            localStorage.removeItem(`bangla_daily_completed_${todayStr}`);
                            setDailyProgress(0);
                            setDailyCompleted(false);
                            speak("ডেইলি চ্যালেঞ্জের অগ্রগতি রিসেট করা হয়েছে");
                          }}
                          className="p-3 bg-rose-500/5 hover:bg-rose-500/15 border border-rose-500/25 hover:border-rose-500/40 rounded-2xl text-xs font-black text-rose-400 hover:text-rose-300 transition-all cursor-pointer flex items-center justify-center"
                          title="চ্যালেঞ্জ রিসেট করুন"
                        >
                          <Icon name="RotateCcw" className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Mode Toggle Buttons */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 mb-4 sm:mb-6 px-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('learn'); setIsQuizMode(false); setSelectedLetter(null); speak("বর্ণ শিখি"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'learn' ? 'bg-teal-600 text-white border-transparent shadow-lg shadow-teal-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="BookOpen" className="w-4 h-4" />
              <span>বর্ণ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('alphabetsong');
                setIsQuizMode(false);
                setSelectedLetter(null);
                speak("বর্ণমালার গান");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'alphabetsong' ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-transparent shadow-lg shadow-teal-950/30 font-black scale-105' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Music" className="w-4 h-4 text-teal-300" />
              <span>বর্ণমালার গান 🎵</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('vowelTest');
                setIsQuizMode(false);
                setSelectedLetter(null);
                speak("স্বর বর্ণের পরীক্ষা");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'vowelTest' ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white border-transparent shadow-lg shadow-rose-950/30 font-black scale-105' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Sparkles" className="w-4 h-4 text-pink-300" />
              <span>স্বরবর্ণের পরীক্ষা 🍎</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('consonantTest');
                setIsQuizMode(false);
                setSelectedLetter(null);
                speak("ব্যঞ্জন বর্ণের পরীক্ষা");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'consonantTest' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-transparent shadow-lg shadow-teal-950/30 font-black scale-105' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Zap" className="w-4 h-4 text-emerald-300" />
              <span>ব্যঞ্জনবর্ণের পরীক্ষা 🥑</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('beforeAfterLetter');
                setIsQuizMode(false);
                setSelectedLetter(null);
                speak("আগের ও পরের বর্ণ");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'beforeAfterLetter' ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-transparent shadow-lg shadow-amber-950/30 font-black scale-105' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Gamepad2" className="w-4 h-4 text-amber-300" />
              <span>আগের ও পরের বর্ণ 🎈</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('worksheet');
                setIsQuizMode(false);
                setSelectedLetter(null);
                speak("ওয়ার্ক শীট");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'worksheet' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-transparent shadow-lg shadow-indigo-950/30 font-black scale-105' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="ClipboardList" className="w-4 h-4 text-purple-300" />
              <span>ওয়ার্ক শীট 📝</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('words'); setIsQuizMode(false); setSelectedLetter(null); speak("শব্দ শিখি"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'words' ? 'bg-orange-600 text-white border-transparent shadow-lg shadow-orange-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Library" className="w-4 h-4" />
              <span>শব্দ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('kar'); setIsQuizMode(false); setSelectedLetter(null); speak("কার চিহ্ন"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'kar' ? 'bg-purple-600 text-white border-transparent shadow-lg shadow-purple-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Type" className="w-4 h-4" />
              <span>কার</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('consonantKarTable'); setIsQuizMode(false); setSelectedLetter(null); speak("ব্যঞ্জন বর্ণের সাথে কার চিহ্ন"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'consonantKarTable' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-transparent shadow-lg shadow-pink-950/30 font-black' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Grid" className="w-4 h-4" />
              <span>ব্যঞ্জন বর্নের সাথে কার চিহ্ন</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('vocab'); setIsQuizMode(false); setSelectedLetter(null); speak("শব্দ ভান্ডার"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'vocab' ? 'bg-teal-600 text-white border-transparent shadow-lg shadow-teal-950/30 font-black' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="BookOpen" className="w-4 h-4" />
              <span>শব্দ ভান্ডার</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('letterWordCircle'); setIsQuizMode(false); setSelectedLetter(null); speak("বর্ণ দিয়ে শব্দ শিখি"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'letterWordCircle' ? 'bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white border-transparent shadow-lg shadow-fuchsia-950/30 font-black scale-105' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Compass" className="w-4 h-4 text-fuchsia-300" />
              <span>বর্ণ দিয়ে শব্দ শিখি 🎨</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('dotted'); setIsQuizMode(false); setSelectedLetter(null); speak("ডটেড বর্ণ আঁকা"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'dotted' ? 'bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Palette" className="w-4 h-4" />
              <span>ডটেড বর্ণ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('matra'); setIsQuizMode(false); setSelectedLetter(null); speak("বর্ণের মাত্রা শিখি"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'matra' ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-[#0d1117] border-transparent shadow-lg shadow-amber-950/30 font-black' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="BookOpen" className="w-4 h-4 text-amber-300" />
              <span>বর্ণের মাত্রা শিখি ✏️</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('write'); setIsQuizMode(false); setSelectedLetter(null); speak("বর্ণ লিখন"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'write' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-[#0d1117] border-transparent shadow-lg shadow-amber-950/30 font-black' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Sparkles" className="w-4 h-4 text-amber-400" />
              <span>বর্ণ লিখন</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { 
                setActiveMode('letterDerivation'); 
                setIsQuizMode(false); 
                setSelectedLetter(null); 
                setSelectedDerivationBase('ব');
                setSelectedDerivationTarget('ক');
                setIsDerivationSuccess(false);
                setIsTracingGuideCompleted(false);
                speak("বর্ণ তৈরির কৌশল"); 
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'letterDerivation' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0d1117] border-transparent shadow-lg shadow-emerald-950/30 font-black scale-105' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Wand2" className="w-4 h-4 text-emerald-400" />
              <span>বর্ণ তৈরির কৌশল</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('karWords'); setIsQuizMode(false); setSelectedLetter(null); setSelectedKar(null); speak("কার চিহ্ন দিয়ে শব্দ শিখি"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'karWords' ? 'bg-rose-600 text-white border-transparent shadow-lg shadow-rose-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="PenTool" className="w-4 h-4" />
              <span>কার-শব্দ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('karTenWords'); setIsQuizMode(false); setSelectedLetter(null); setSelectedKar(null); setSelectedKarTen(null); speak("কার চিহ্ন দিয়ে ১০টি সহজ শব্দ"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'karTenWords' ? 'bg-pink-600 text-white border-transparent shadow-lg shadow-pink-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Sparkles" className="w-4 h-4" />
              <span>সহজ ১০ শব্দ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('rearrange'); setIsQuizMode(false); setSelectedLetter(null); setSelectedKar(null); speak("বর্ণ দিয়ে শব্দ তৈরি"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'rearrange' ? 'bg-teal-600 text-white border-transparent shadow-lg shadow-teal-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Puzzle" className="w-4 h-4" />
              <span>বর্ণ দিয়ে শব্দ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('wordMatching'); setIsQuizMode(false); setSelectedLetter(null); setSelectedKar(null); speak("ছবি দেখে শব্দ মেলানো"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'wordMatching' ? 'bg-gradient-to-r from-teal-500 to-sky-500 text-white border-transparent shadow-lg shadow-teal-950/30 font-black' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Gamepad2" className="w-4 h-4" />
              <span>শব্দ মেলানো খেলা</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('jointLetters'); setIsQuizMode(false); setSelectedLetter(null); speak("যুক্তাক্ষর"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'jointLetters' ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white border-transparent shadow-lg shadow-fuchsia-950/30 font-black' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Grid" className="w-4 h-4" />
              <span>যুক্তাক্ষর</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('karConjunctWords'); setIsQuizMode(false); setSelectedLetter(null); setSelectedKar(null); setSelectedKarConjunct(null); speak("কার চিহ্ন দিয়ে ১০টি যুক্তবর্ণের শব্দ"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'karConjunctWords' ? 'bg-amber-600 text-white border-transparent shadow-lg shadow-amber-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Wand2" className="w-4 h-4" />
              <span>যুক্তবর্ণ ১০ শব্দ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('conjunctUsage'); setIsQuizMode(false); setSelectedLetter(null); setSelectedKar(null); setSelectedConjunctItem(null); speak("যুক্ত বর্ণের ব্যবহার"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'conjunctUsage' ? 'bg-violet-600 text-white border-transparent shadow-lg shadow-violet-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Sparkles" className="w-4 h-4" />
              <span>যুক্তবর্ণ ব্যবহার</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('consonantKar');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarTen(null);
                setSelectedKarConjunct(null);
                setSelectedConjunctItem(null);
                setSelectedConsonant('ক');
                speak("সকল ব্যঞ্জনবর্ণের সাথে কার চিহ্ন");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'consonantKar' ? 'bg-teal-600 text-white border-transparent shadow-lg shadow-teal-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Shuffle" className="w-4 h-4" />
              <span>ব্যঞ্জনবর্ণ ও কার</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('karSentences'); setIsQuizMode(false); setSelectedLetter(null); setSelectedKar(null); setSelectedKarSentenceGroup(null); speak("কার চিহ্ন দিয়ে বাক্য"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'karSentences' ? 'bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="BookOpen" className="w-4 h-4" />
              <span>কার-বাক্য</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('progSentences');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setScrambleSentence(null);
                speak("বাংলা বাক্য সহজ থেকে কঠিন");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'progSentences' ? 'bg-rose-600 text-white border-transparent shadow-lg shadow-rose-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Flame" className="w-4 h-4" />
              <span>সহজ থেকে কঠিন বাক্য</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('antonyms');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setScrambleSentence(null);
                speak("বাংলা বিপরীত শব্দ");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'antonyms' ? 'bg-violet-600 text-white border-transparent shadow-lg shadow-violet-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Shuffle" className="w-4 h-4" />
              <span>বিপরীত শব্দ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('synonyms');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setSelectedSynonymLevel(null);
                setScrambleSentence(null);
                speak("বাংলা সমার্থক শব্দ");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'synonyms' ? 'bg-emerald-600 text-white border-transparent shadow-lg shadow-emerald-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Library" className="w-4 h-4" />
              <span>সমার্থক শব্দ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('sadhuCholit');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setSelectedSadhuCholitLevel(null);
                setScrambleSentence(null);
                setSelectedStory(null);
                speak("সাধু ও চলিত ভাষা");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'sadhuCholit' ? 'bg-amber-600 text-white border-transparent shadow-lg shadow-amber-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="RefreshCw" className="w-4 h-4" />
              <span>সাধু ও চলিত</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('stories');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setSelectedSadhuCholitLevel(null);
                setScrambleSentence(null);
                setSelectedStory(null);
                speak("বাংলা গল্প");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'stories' ? 'bg-cyan-600 text-white border-transparent shadow-lg shadow-cyan-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="BookOpen" className="w-4 h-4" />
              <span>বাংলা গল্প</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('oneWord');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setSelectedSadhuCholitLevel(null);
                setScrambleSentence(null);
                setSelectedStory(null);
                speak("এক কথায় প্রকাশ");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'oneWord' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Target" className="w-4 h-4" />
              <span>এক কথায় প্রকাশ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('tongueTwister');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setSelectedSadhuCholitLevel(null);
                setScrambleSentence(null);
                setSelectedStory(null);
                speak("টাং টুইস্টার");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'tongueTwister' ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white border-transparent shadow-lg shadow-pink-950/30 font-black scale-105' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <span className="text-sm">👅</span>
              <span>টাং টুইস্টার</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveMode('quiz'); setIsQuizMode(true); setSelectedLetter(null); speak("কুইজ মোড"); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                isQuizMode ? 'bg-green-600 text-white border-transparent shadow-lg shadow-green-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Brain" className="w-4 h-4" />
              <span>কুইজ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('pronouncePractice');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setSelectedSadhuCholitLevel(null);
                setScrambleSentence(null);
                setSelectedStory(null);
                speak("উচ্চারণ অনুশীলন");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'pronouncePractice' ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white border-transparent shadow-lg shadow-fuchsia-950/30 font-black' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Mic" className="w-4 h-4" />
              <span>উচ্চারণ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('practice');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setSelectedSadhuCholitLevel(null);
                setScrambleSentence(null);
                setSelectedStory(null);
                speak("র‍্যাপিড ফায়ার প্র্যাকটিস");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'practice' ? 'bg-teal-600 text-white border-transparent shadow-lg shadow-teal-950/30' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Zap" className="w-4 h-4" />
              <span>প্র্যাকটিস</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('classOneBangla');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setSelectedSadhuCholitLevel(null);
                setScrambleSentence(null);
                setSelectedStory(null);
                speak("ক্লাস ওয়ান বাংলা");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'classOneBangla' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 border-transparent shadow-lg shadow-emerald-950/30 font-black' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="BookOpenCheck" className="w-4 h-4" />
              <span>Class One Bangla 🇧🇩</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('classWiseJointLetters');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setSelectedSadhuCholitLevel(null);
                setScrambleSentence(null);
                setSelectedStory(null);
                speak("শ্রেণি ভিত্তিক যুক্ত বর্ণ");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'classWiseJointLetters' ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-slate-950 border-transparent shadow-lg shadow-purple-950/30 font-black' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Library" className="w-4 h-4" />
              <span>শ্রেণি ভিত্তিক যুক্ত বর্ণ 🇧🇩</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('classThreeAssessment');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setSelectedSadhuCholitLevel(null);
                setScrambleSentence(null);
                setSelectedStory(null);
                speak("তৃতীয় বাংলা মূল্যায়ন টুলস");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'classThreeAssessment' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-transparent shadow-lg shadow-amber-950/30 font-black' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="BookOpen" className="w-4 h-4" />
              <span>তৃতীয় বাংলা মূল্যায়ন 🇧🇩</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('progressDashboard');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setSelectedSadhuCholitLevel(null);
                setScrambleSentence(null);
                setSelectedStory(null);
                speak("লার্নিং প্রোগ্রেস ও মেডেল ড্যাশবোর্ড");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'progressDashboard' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 border-transparent shadow-lg shadow-amber-950/30 font-black' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Trophy" className="w-4 h-4" />
              <span>অগ্রগতি ও মেডেল 🏆</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMode('codeEditor');
                setIsQuizMode(false);
                setSelectedLetter(null);
                setSelectedKar(null);
                setSelectedKarSentenceGroup(null);
                setSelectedProgGroup(null);
                setSelectedAntonymLevel(null);
                setSelectedSadhuCholitLevel(null);
                setScrambleSentence(null);
                setSelectedStory(null);
                speak("কোড এডিটর");
              }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border ${
                activeMode === 'codeEditor' ? 'bg-gradient-to-r from-indigo-500 to-teal-500 text-white border-transparent shadow-lg shadow-indigo-950/30 font-black' : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
              }`}
            >
              <Icon name="Terminal" className="w-4 h-4" />
              <span>কোড এডিটর 💻</span>
            </motion.button>
          </div>

          {/* Title */}
          <motion.h1
            key={activeMode + (isQuizMode ? '-quiz' : '')}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl sm:text-6xl md:text-7xl font-black mb-2 sm:mb-3 tracking-tight bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            {isQuizMode ? "🧠 কুইজ মোড" :
              activeMode === 'codeEditor' ? "💻 কোড এডিটর ও সিস্টেম অ্যানালাইজার" :
              activeMode === 'progressDashboard' ? "🏆 আমার লার্নিং মেডেল ও ড্যাশবোর্ড" :
              activeMode === 'classOneBangla' ? "📖 আমার বাংলা বই (Class 1)" :
              activeMode === 'classWiseJointLetters' ? "📖 শ্রেণি ভিত্তিক যুক্তবর্ণ শিক্ষণ বোর্ড" :
              activeMode === 'classThreeAssessment' ? "📖 তৃতীয় শ্রেণির বাংলা রিডিং দক্ষতা যাচাই মূল্যায়ন টুলস" :
              activeMode === 'learn' ? "📚 বর্ণমালা মজা" :
              activeMode === 'alphabetsong' ? "🎵 বর্ণমালার গান" :
              activeMode === 'vowelTest' ? "🍎 স্বরবর্ণ চেনার পরীক্ষা" :
              activeMode === 'consonantTest' ? "🥑 ব্যঞ্জনবর্ণ চেনার পরীক্ষা" :
              activeMode === 'beforeAfterLetter' ? "🎈 আগের ও পরের বর্ণ" :
              activeMode === 'worksheet' ? "📝 বাংলা ওয়ার্ক শীট" :
              activeMode === 'words' ? "📖 শব্দ শিখো" :
              activeMode === 'kar' ? "✨ কার চিহ্ন" :
              activeMode === 'consonantKarTable' ? "🔤 ব্যঞ্জনবর্ণ ও কার চিহ্নের ব্যবহার" :
              activeMode === 'vocab' ? "📖 শব্দ ভান্ডার" :
              activeMode === 'letterWordCircle' ? "🎨 বর্ণ দিয়ে শব্দ চক্র" :
              activeMode === 'dotted' ? "✏️ ডটেড বর্ণ লিখন" :
              activeMode === 'matra' ? "✏️ বর্ণের মাত্রা শিখি" :
              activeMode === 'write' ? "🎨 বর্ণ লিখন" :
              activeMode === 'letterDerivation' ? "🪄 বর্ণ তৈরির জাদুকরী কৌশল" :
              activeMode === 'karWords' ? "✍️ কার দিয়ে শব্দ শিখো" :
              activeMode === 'karTenWords' ? "✨ কার চিহ্ন দিয়ে ১০টি সহজ শব্দ" :
              activeMode === 'rearrange' ? "🧩 বর্ণ দিয়ে শব্দ সাজানো" :
              activeMode === 'wordMatching' ? "🎯 ছবি দেখে শব্দ মেলানোর খেলা" :
              activeMode === 'jointLetters' ? "🔠 রঙিন যুক্তবর্ণ বা যুক্তাক্ষর শিক্ষা" :
              activeMode === 'karConjunctWords' ? "💫 কার দিয়ে ১০টি যুক্তবর্ণের শব্দ" :
              activeMode === 'conjunctUsage' ? "🌟 যুক্তবর্ণের ব্যবহার ও শব্দ" :
              activeMode === 'consonantKar' ? "🔄 সকল ব্যঞ্জনবর্ণের সাথে কার চিহ্ন" :
              activeMode === 'karSentences' ? "📖 কার চিহ্ন দিয়ে বাক্য" :
              activeMode === 'progSentences' ? "🔥 বাংলা বাক্য সহজ থেকে কঠিন" :
              activeMode === 'antonyms' ? "✨ বাংলা বিপরীত শব্দ" :
              activeMode === 'synonyms' ? "✨ বাংলা সমার্থক শব্দ" :
              activeMode === 'sadhuCholit' ? "🔄 সাধু ও চলিত ভাষা" :
              activeMode === 'stories' ? "📚 বাংলা গল্প" :
              activeMode === 'tongueTwister' ? "👅 টাং টুইস্টার ও উচ্চারণ খেলা" :
              activeMode === 'pronouncePractice' ? "🗣️ বাংলা উচ্চারণ অনুশীলন" :
              "✨ কার চিহ্ন"}
          </motion.h1>

          {/* Status Badge & Playback Speed Controls */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-3 sm:mt-4">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-[#161b22] px-4 py-2 rounded-full shadow-md border border-[#30363d]">
              <div className={`w-2.5 h-2.5 rounded-full ${isSpeaking ? 'bg-green-400 speaking' : 'bg-slate-700'}`}></div>
              <span className="text-xs sm:text-sm font-semibold text-[#8b949e]">{isSpeaking ? `${audioMethod} বাজছে...` : 'প্রস্তুত'}</span>
            </div>

            {/* Playback Speed Controller */}
            <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-[#161b22] px-3 py-1.5 rounded-full shadow-md border border-[#30363d]">
              <span className="text-xs font-bold text-[#8b949e] mr-1 flex items-center gap-1 pl-1">
                <Icon name="Gauge" className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">গতি:</span>
              </span>
              {([0.5, 0.75, 1.0] as const).map((speed) => (
                <button
                  key={speed}
                  onClick={() => {
                    setPlaybackSpeed(speed);
                    speak(`${speed === 1.0 ? 'স্বাভাবিক' : toBengaliNumber(speed)} গতি`);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
                    playbackSpeed === speed
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black shadow-sm'
                      : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]'
                  }`}
                >
                  {speed === 1.0 ? '১.০x' : toBengaliNumber(speed) + 'x'}
                </button>
              ))}
            </div>

            {/* Voice Engine Selector */}
            <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-[#161b22] px-3 py-1.5 rounded-full shadow-md border border-[#30363d]">
              <span className="text-xs font-bold text-[#8b949e] mr-1 flex items-center gap-1 pl-1">
                <Icon name="Sparkles" className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">ভয়েস:</span>
              </span>
              <button
                onClick={() => {
                  setSpeechEngine('browser');
                  setTimeout(() => {
                    const u = new SpeechSynthesisUtterance("ব্রাউজার ভয়েস");
                    u.lang = 'bn-BD';
                    u.rate = playbackSpeed * 0.75;
                    window.speechSynthesis.speak(u);
                  }, 50);
                }}
                className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
                  speechEngine === 'browser'
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-black shadow-sm'
                    : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]'
                }`}
              >
                ব্রাউজার
              </button>
              <button
                onClick={() => {
                  setSpeechEngine('google');
                  setTimeout(() => speak("গুগল ভয়েস"), 50);
                }}
                className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
                  speechEngine === 'google'
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-black shadow-sm'
                    : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]'
                }`}
              >
                গুগল
              </button>
            </div>
          </div>
        </header>

        {/* ==================== MODE 1: LEARN LETTERS ==================== */}
        {activeMode === 'learn' && !isQuizMode && (
          <>
            {/* Tab Buttons */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setActiveTab('vowel'); speak("স্বরবর্ণ"); }}
                className={`flex items-center gap-1 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-2xl font-black text-sm sm:text-xl shadow-xl transition-all border ${
                  activeTab === 'vowel' 
                    ? 'bg-gradient-to-br from-rose-600 to-pink-600 text-white border-transparent -translate-y-0.5 shadow-rose-950/30' 
                    : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#21262d]'
                }`}
              >
                <span>স্বরবর্ণ</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setActiveTab('consonant'); speak("ব্যঞ্জনবর্ণ"); }}
                className={`flex items-center gap-1 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-2xl font-black text-sm sm:text-xl shadow-xl transition-all border ${
                  activeTab === 'consonant' 
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-transparent -translate-y-0.5 shadow-blue-950/30' 
                    : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#21262d]'
                }`}
              >
                <span>ব্যঞ্জনবর্ণ</span>
              </motion.button>
            </div>

            {/* 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start max-w-7xl mx-auto px-4 mt-4">
              {/* Left Column: Search & Letter Grid */}
              <div className="lg:col-span-8 space-y-6">
                {/* Search Input Field */}
                <div className="max-w-md mx-auto mb-2 px-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Icon name="Search" className="w-5 h-5 text-teal-500" />
                    </div>
                    <input
                      type="text"
                      value={learnSearch}
                      onChange={(e) => setLearnSearch(e.target.value)}
                      placeholder="বাংলায় বর্ণ বা শব্দ খুঁজুন... (উদা. অ, অজগর, আম)"
                      className="block w-full pl-11 pr-10 py-3 bg-[#161b22]/90 border border-[#30363d] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base shadow-lg transition-all"
                    />
                    {learnSearch && (
                      <button
                        onClick={() => setLearnSearch('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                      >
                        <Icon name="X" className="w-4 h-4 bg-[#30363d]/50 p-0.5 rounded-full" />
                      </button>
                    )}
                  </div>
                  {learnSearch && (
                    <p className="text-center text-xs text-slate-400 mt-2 font-black">
                      "{learnSearch}" এর জন্য {filteredLearnLetters.length}টি বর্ণ পাওয়া গেছে
                    </p>
                  )}
                </div>

                {/* Letter Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2 sm:gap-5 char-grid">
                  <AnimatePresence mode="popLayout">
                    {filteredLearnLetters.map((item, index) => {
                      const totalWordsCount = item.words ? item.words.length : 0;
                      const listenedCount = (listenedWords[item.id] || []).filter(w => 
                        item.words.some(itemWord => itemWord.word === w)
                      ).length;
                      const progressPercentage = totalWordsCount > 0 ? (listenedCount / totalWordsCount) * 100 : 0;

                      return (
                        <motion.button
                          key={item.id}
                          layout
                          initial={{ scale: 0, opacity: 0, rotate: -10 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          exit={{ scale: 0, opacity: 0, rotate: 10 }}
                          transition={{ delay: index * 0.005, type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.08, y: -5 }}
                          whileTap={{ scale: 0.92 }}
                          onMouseEnter={() => setHoveredLetter(item)}
                          onMouseLeave={() => setHoveredLetter(null)}
                          onClick={() => handleLetterClick(item)}
                          className={`relative aspect-square rounded-xl sm:rounded-3xl flex flex-col items-center justify-center shadow-lg sm:shadow-xl hover:shadow-2xl border border-[#30363d]/10 group ${item.color} z-10 hover:z-30 overflow-hidden`}
                        >
                          {/* Dynamic filling liquid wave from the bottom */}
                          {progressPercentage > 0 && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${progressPercentage}%` }}
                              transition={{ duration: 1.0, ease: "easeInOut" }}
                              className="absolute bottom-0 left-0 right-0 bg-white/15 backdrop-blur-[1px] pointer-events-none overflow-hidden"
                              style={{
                                clipPath: 'polygon(0% 12%, 18% 5%, 35% 8%, 52% 15%, 70% 10%, 85% 6%, 100% 10%, 100% 100%, 0% 100%)'
                              }}
                            >
                              <motion.div
                                animate={{ x: [-100, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-t from-white/10 to-white/5"
                                style={{ width: '200%' }}
                              />
                            </motion.div>
                          )}

                          {/* Progress fraction text at the top-right */}
                          {progressPercentage > 0 && (
                            <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-slate-950/70 border border-white/10 rounded-full px-1.5 py-0.5 flex items-center justify-center gap-0.5 z-20">
                              <span className="text-[7px] sm:text-[9px] font-black text-teal-300 leading-none">
                                {toBengaliNumber(listenedCount)}/{toBengaliNumber(totalWordsCount)}
                              </span>
                              <span className="text-[6px] sm:text-[8px] leading-none">🔊</span>
                            </div>
                          )}

                          <span className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-lg leading-none select-none relative z-10">
                            {item.letter}
                          </span>

                          {/* Mini progress bar at the bottom */}
                          {progressPercentage > 0 && (
                            <div className="absolute bottom-1.5 sm:bottom-3 left-3 sm:left-5 right-3 sm:right-5 h-1 sm:h-1.5 bg-black/20 rounded-full overflow-hidden z-20">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 1.0, ease: "easeOut" }}
                                className="h-full bg-teal-400 rounded-full shadow-md shadow-teal-500/50"
                              />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Magic Picture Display Box */}
              <div className="lg:col-span-4 lg:sticky lg:top-6 w-full">
                {(() => {
                  const activePreview = hoveredLetter || selectedLetter;
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-b from-[#1a1c2e] to-[#0f172a] border-4 border-teal-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center flex flex-col items-center justify-between min-h-[420px] group/preview"
                    >
                      {/* Decorative background glow */}
                      <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none group-hover/preview:bg-teal-500/20 transition-all duration-700" />
                      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none group-hover/preview:bg-pink-500/20 transition-all duration-700" />

                      {/* Header bar */}
                      <div className="w-full pb-3 border-b border-slate-800/60 mb-4 flex items-center justify-between">
                        <span className="text-sm font-black text-[#8b949e] flex items-center gap-1.5">
                          <Icon name="Image" className="w-4 h-4 text-pink-500 animate-pulse" />
                          <span>রঙিন ছবি প্রদর্শন</span>
                        </span>
                        <span className="text-[10px] bg-teal-500/10 text-teal-400 px-2.5 py-1 rounded-full font-black border border-teal-500/20 uppercase tracking-wider">
                          {hoveredLetter ? 'সরাসরি প্রিভিউ 🪄' : 'সিলেক্টেড 📌'}
                        </span>
                      </div>

                      {activePreview ? (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activePreview.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full flex flex-col items-center flex-1 justify-center py-2"
                          >
                            {/* Letter Indicator */}
                            <div className="mb-4">
                              <span className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${activePreview.color} text-white font-black text-4xl shadow-lg border-2 border-white/20 animate-bounce`}>
                                {activePreview.letter}
                              </span>
                            </div>

                            {/* Image Container */}
                            <div className="bg-[#161b22]/80 border border-[#30363d]/60 rounded-2xl p-4 w-full aspect-square max-w-[200px] flex items-center justify-center relative shadow-inner group-hover/preview:border-teal-500/40 transition-all">
                              {activePreview.words[0]?.img ? (
                                <img
                                  src={activePreview.words[0]?.img}
                                  alt={activePreview.words[0]?.word}
                                  className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    target.onerror = null;
                                    target.src = getEmojiImage(activePreview.words[0]?.emoji || '📚', 256);
                                  }}
                                />
                              ) : (
                                <img
                                  src={getEmojiImage(activePreview.words[0]?.emoji || '📚', 256)}
                                  alt={activePreview.words[0]?.word}
                                  className="w-full h-full object-contain drop-shadow-2xl"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `<div class="text-7xl sm:text-8xl select-none animate-pulse">${activePreview.words[0]?.emoji || '📚'}</div>`;
                                    }
                                  }}
                                />
                              )}
                            </div>

                            {/* Bengali Word Label */}
                            <h3 className="text-3xl font-black bg-gradient-to-r from-teal-400 via-pink-400 to-amber-400 bg-clip-text text-transparent mt-4 mb-1">
                              {activePreview.words[0]?.word || ''}
                            </h3>

                            {/* Description helper */}
                            <p className="text-sm font-bold text-slate-300 bg-slate-950/50 border border-slate-800/60 rounded-xl px-4 py-2 mt-2 w-full max-w-[240px]">
                              <span className="text-teal-400 font-extrabold text-base mr-1">{activePreview.letter}</span> তে হয় <span className="text-yellow-400 font-extrabold">{activePreview.words[0]?.word || ''}</span>
                            </p>

                            {/* Speech Trigger */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => speak(getSentence(activePreview))}
                              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-teal-950/50 border border-teal-400/30 cursor-pointer"
                            >
                              <Icon name="Volume2" className="w-4 h-4 text-white animate-bounce" />
                              <span>উচ্চারণ শুনুন 🔊</span>
                            </motion.button>
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <div className="w-full flex flex-col items-center justify-center flex-1 py-8">
                          {/* Animated mascot cartoon placeholder */}
                          <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="text-7xl sm:text-8xl select-none mb-6 filter drop-shadow-lg"
                          >
                            🦖
                          </motion.div>
                          <h4 className="text-xl font-black text-teal-400 mb-2">বর্ণের জাদুকরী ছবি ঘর! 🪄</h4>
                          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-[240px] leading-relaxed">
                            যেকোনো স্বরবর্ণের ওপর মাউস বা হাত আনো! বর্ণটি না ঢেকে তার রঙিন ছবি এখানে দেখতে পাবে।
                          </p>
                          <div className="mt-6 flex gap-2 items-center text-[10px] text-slate-500 bg-slate-900/40 px-3 py-1.5 rounded-full border border-slate-800/40">
                            <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                            <span>একটি বর্ণ স্পর্শ করো</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })()}
              </div>
            </div>

            {/* Consonants Pronunciation Note as requested */}
            {activeTab === 'consonant' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto mt-8 p-5 sm:p-6 bg-slate-900/60 border-2 border-dashed border-indigo-500/30 rounded-3xl shadow-2xl relative overflow-hidden text-left"
              >
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-xl opacity-20 pointer-events-none" />
                
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2 mb-3">
                  <span className="text-xl">💡</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
                    ব্যঞ্জনবর্ণের উচ্চারণ ও পরিচিতি নির্দেশিকা
                  </span>
                </h3>
                
                <div className="text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3">
                  <p className="font-semibold text-slate-300">
                    ছোট সোনামণিদের সহজে শেখার জন্য প্রতিটি ব্যঞ্জনবর্ণের প্রচলিত নাম ও উচ্চারণ নিচে দেওয়া হলো:
                  </p>
                  
                  {/* Visual interactive layout of each letter's pronounciation */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1 font-bold text-slate-200">
                    {[
                      { letter: 'ঙ', name: 'উয়ো' },
                      { letter: 'ঞ', name: 'ইয়ো' },
                      { letter: 'জ', name: 'বর্গীয়-জ' },
                      { letter: 'ণ', name: 'মূর্ধন্য-ণ' },
                      { letter: 'ন', name: 'দন্ত্য-ন' },
                      { letter: 'য', name: 'অন্তস্থ-য' },
                      { letter: 'য়', name: 'অন্তস্থ-অ' },
                      { letter: 'শ', name: 'তালব্য-শ' },
                      { letter: 'ষ', name: 'মূর্ধন্য-ষ' },
                      { letter: 'স', name: 'দন্ত্য-স' },
                      { letter: 'র', name: 'বয়ে বিন্দু-র' },
                      { letter: 'ড়', name: 'ডয়ে বিন্দু-র' },
                      { letter: 'ঢ়', name: 'ঢয়ে বিন্দু-র' },
                      { letter: 'ৎ', name: 'খন্ড-ত' },
                      { letter: 'ং', name: 'অনুস্বার' },
                      { letter: 'ঃ', name: 'বিসর-গো' },
                      { letter: 'ঁ', name: 'চন্দ্রবিন্দু' }
                    ].map((item, i) => (
                      <div key={i} className="bg-[#161b22]/90 border border-slate-700/40 px-3 py-2 rounded-xl flex items-center justify-between">
                        <span className="text-yellow-300 text-sm sm:text-base font-black">{item.letter}</span>
                        <span className="text-slate-500 font-normal text-xs">=</span>
                        <span className="text-indigo-300 text-xs sm:text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Original Exact text from the image */}
                  <div className="mt-4 p-4 bg-[#161b22]/70 border border-slate-700/50 rounded-2xl text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    <span className="text-red-500 font-extrabold text-sm sm:text-base mr-1.5">দ্রষ্টব্য :</span>
                    ঙ = উয়ো , ঞ = ইয়ো , জ = বর্গীয়-জ , ণ = মূর্ধন্য-ণ , ন = দন্ত্য-ন , য = অন্তস্থ-য , য় = অন্তস্থ-অ , শ = তালব্য-শ , ষ = মূর্ধন্য-ষ , স = দন্ত্য-স , র = বয়ে বিন্দু-র , ড় = ডয়ে বিন্দু-র , ঢ় = ঢয়ে বিন্দু-র , ৎ = খন্ড-ত , ং = অনুস্বার , ঃ = বিসর-গো , ঁ = চন্দ্রবিন্দু ।
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* ==================== MODE 2: WORDS ==================== */}
        {activeMode === 'words' && !isQuizMode && (
          <>
            {/* Search Input Field */}
            <div className="max-w-md mx-auto mb-6 sm:mb-8 px-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Icon name="Search" className="w-5 h-5 text-orange-500" />
                </div>
                <input
                  type="text"
                  value={wordsSearch}
                  onChange={(e) => setWordsSearch(e.target.value)}
                  placeholder="বাংলায় শব্দ খুঁজুন... (উদা. অজগর, আম, কলম)"
                  className="block w-full pl-11 pr-10 py-3 bg-[#161b22]/90 border border-[#30363d] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base shadow-lg transition-all"
                />
                {wordsSearch && (
                  <button
                    onClick={() => setWordsSearch('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                  >
                    <Icon name="X" className="w-4 h-4 bg-[#30363d]/50 p-0.5 rounded-full" />
                  </button>
                )}
              </div>
            </div>

            {wordsSearch.trim() ? (
              <div className="max-w-4xl mx-auto px-4 mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Sparkles" className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-xl font-bold text-slate-200">
                    🔍 অনুসন্ধান ফলাফল: {searchedWords.length}টি শব্দ পাওয়া গেছে
                  </h3>
                </div>

                {searchedWords.length > 0 ? (
                  <>
                    {/* Control Bar for Word Filtering in Search Results */}
                    {(() => {
                      const totalSearchWords = searchedWords.length;
                      const masteredSearchWords = searchedWords.filter(item => 
                        (listenedWords[item.letterItem.id] || []).includes(item.wordItem.word)
                      ).length;

                      return (
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-[#161b22]/50 border border-[#30363d]/40 rounded-2xl p-3 sm:p-4">
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2">
                              <Icon name="Filter" className="w-4 h-4 text-orange-400" />
                              <span className="text-xs sm:text-sm font-bold text-[#8b949e]">
                                শব্দ ফিল্টার (Word Filter):
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-[10px] sm:text-xs font-black text-emerald-400">
                                শিখেছো (Learned): {toBengaliNumber(masteredSearchWords)}/{toBengaliNumber(totalSearchWords)}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => {
                                setShowOnlyMastered(false);
                                setHideMastered(false);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                                !showOnlyMastered && !hideMastered
                                  ? 'bg-orange-600 text-white border-transparent shadow-md shadow-orange-950/20'
                                  : 'bg-[#21262d] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#30363d]'
                              }`}
                            >
                              সব শব্দ (All Words)
                            </button>
                            <button
                              onClick={() => {
                                setShowOnlyMastered(true);
                                setHideMastered(false);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                                showOnlyMastered
                                  ? 'bg-emerald-600 text-white border-transparent shadow-md shadow-emerald-950/20'
                                  : 'bg-[#21262d] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#30363d]'
                              }`}
                            >
                              Show only mastered words
                            </button>
                            <button
                              onClick={() => {
                                setShowOnlyMastered(false);
                                setHideMastered(true);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                                hideMastered
                                  ? 'bg-rose-600 text-white border-transparent shadow-md shadow-rose-950/20'
                                  : 'bg-[#21262d] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#30363d]'
                              }`}
                            >
                              Hide mastered words
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                    {(() => {
                      const filteredSearchedWords = searchedWords.filter(item => {
                        const isMastered = (listenedWords[item.letterItem.id] || []).includes(item.wordItem.word);
                        if (showOnlyMastered) return isMastered;
                        if (hideMastered) return !isMastered;
                        return true;
                      });

                      if (filteredSearchedWords.length === 0) {
                        return (
                          <div className="text-center py-12 bg-slate-900/30 rounded-3xl border border-slate-800/40">
                            <p className="text-slate-400 text-lg">
                              {showOnlyMastered 
                                ? 'আপনি এখনও কোনো শব্দ শিখেননি! শব্দে ক্লিক করে শোনা শুরু করুন। 🔊' 
                                : 'অভিনন্দন! আপনি সব শব্দ শিখে ফেলেছেন! 🎉'}
                            </p>
                          </div>
                        );
                      }

                      return (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 words-grid">
                          {filteredSearchedWords.map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                            >
                              <WordFlipCard
                                wordItem={item.wordItem}
                                letterItem={item.letterItem}
                                onClick={() => handleWordClick(item.letterItem, item.wordItem)}
                                isMastered={(listenedWords[item.letterItem.id] || []).includes(item.wordItem.word)}
                              />
                            </motion.div>
                          ))}
                        </div>
                      );
                    })()}
                  </>
                ) : (
                  <div className="text-center py-12 bg-slate-900/30 rounded-3xl border border-slate-800/40">
                    <p className="text-slate-400 text-lg">দুঃখিত, কোনো শব্দ পাওয়া যায়নি! 😢</p>
                    <button
                      onClick={() => setWordsSearch('')}
                      className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-500 transition-colors"
                    >
                      অনুসন্ধান মুছুন
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="mb-6 sm:mb-8">
                  <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <button
                      onClick={() => { setActiveTab('vowel'); setSelectedLetter(null); }}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-black text-sm sm:text-base shadow-md transition-all border ${
                        activeTab === 'vowel' 
                          ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white border-transparent shadow-lg shadow-rose-950/20' 
                          : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#21262d]'
                      }`}
                    >
                      স্বরবর্ণ
                    </button>
                    <button
                      onClick={() => { setActiveTab('consonant'); setSelectedLetter(null); }}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-black text-sm sm:text-base shadow-md transition-all border ${
                        activeTab === 'consonant' 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-950/20' 
                          : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#21262d]'
                      }`}
                    >
                      ব্যঞ্জনবর্ণ
                    </button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 max-w-4xl mx-auto px-2">
                    {currentLetters.map(item => {
                      const totalWordsCount = item.words ? item.words.length : 0;
                      const listenedCount = (listenedWords[item.id] || []).filter(w => 
                        item.words.some(itemWord => itemWord.word === w)
                      ).length;
                      const progressPercentage = totalWordsCount > 0 ? (listenedCount / totalWordsCount) * 100 : 0;

                      return (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { setSelectedLetter(item); speak(getSentence(item)); }}
                          className={`relative overflow-hidden w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-lg sm:text-2xl text-white shadow-lg ${item.color} ${selectedLetter?.id === item.id ? 'ring-2 sm:ring-4 ring-offset-2 ring-offset-[#0d1117] ring-teal-500' : ''}`}
                        >
                          <span className="relative z-10">{item.letter}</span>
                          {progressPercentage > 0 && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40 pointer-events-none">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 0.6 }}
                                className="h-full bg-teal-400"
                              />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

            {selectedLetter ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLetter.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className={`${selectedLetter.color} rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center text-white mb-6 sm:mb-8 shadow-2xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                    <h2 className="text-6xl sm:text-9xl font-black mb-2 sm:mb-4 drop-shadow-2xl relative z-10">{selectedLetter.letter}</h2>
                    <p className="text-lg sm:text-2xl font-black opacity-95 relative z-10">এই বর্ণ দিয়ে {selectedLetter.words.length}টি শব্দ</p>
                  </div>

                  {/* Control Bar for Word Filtering */}
                  {(() => {
                    const totalLetterWords = selectedLetter.words.length;
                    const masteredLetterWords = (listenedWords[selectedLetter.id] || []).filter(w => 
                      selectedLetter.words.some(itemWord => itemWord.word === w)
                    ).length;

                    return (
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-[#161b22]/50 border border-[#30363d]/40 rounded-2xl p-3 sm:p-4">
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-2">
                            <Icon name="Filter" className="w-4 h-4 text-orange-400" />
                            <span className="text-xs sm:text-sm font-bold text-[#8b949e]">
                              শব্দ ফিল্টার (Word Filter):
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] sm:text-xs font-black text-emerald-400">
                              শিখেছো (Learned): {toBengaliNumber(masteredLetterWords)}/{toBengaliNumber(totalLetterWords)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => {
                              setShowOnlyMastered(false);
                              setHideMastered(false);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                              !showOnlyMastered && !hideMastered
                                ? 'bg-orange-600 text-white border-transparent shadow-md shadow-orange-950/20'
                                : 'bg-[#21262d] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#30363d]'
                            }`}
                          >
                            সব শব্দ (All Words)
                          </button>
                          <button
                            onClick={() => {
                              setShowOnlyMastered(true);
                              setHideMastered(false);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                              showOnlyMastered
                                ? 'bg-emerald-600 text-white border-transparent shadow-md shadow-emerald-950/20'
                                : 'bg-[#21262d] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#30363d]'
                            }`}
                          >
                            Show only mastered words
                          </button>
                          <button
                            onClick={() => {
                              setShowOnlyMastered(false);
                              setHideMastered(true);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                              hideMastered
                                ? 'bg-rose-600 text-white border-transparent shadow-md shadow-rose-950/20'
                                : 'bg-[#21262d] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#30363d]'
                            }`}
                          >
                            Hide mastered words
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {(() => {
                    const filteredWords = selectedLetter.words.filter(wordItem => {
                      const isMastered = (listenedWords[selectedLetter.id] || []).includes(wordItem.word);
                      if (showOnlyMastered) return isMastered;
                      if (hideMastered) return !isMastered;
                      return true;
                    });

                    if (filteredWords.length === 0) {
                      return (
                        <div className="text-center py-12 bg-slate-900/30 rounded-3xl border border-slate-800/40">
                          <p className="text-slate-400 text-lg">
                            {showOnlyMastered 
                              ? 'আপনি এখনও কোনো শব্দ শিখেননি! শব্দে ক্লিক করে শোনা শুরু করুন। 🔊' 
                              : 'অভিনন্দন! আপনি এই বর্ণের সব শব্দ শিখে ফেলেছেন! 🎉'}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 words-grid">
                        {filteredWords.map((wordItem, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <WordFlipCard
                              wordItem={wordItem}
                              letterItem={selectedLetter}
                              onClick={() => handleWordClick(selectedLetter, wordItem)}
                              isMastered={(listenedWords[selectedLetter.id] || []).includes(wordItem.word)}
                            />
                          </motion.div>
                        ))}
                      </div>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="text-center py-10 sm:py-20 bg-orange-950/15 border border-orange-800/10 rounded-3xl max-w-2xl mx-auto px-4 shadow-xl">
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-orange-950/40 border border-orange-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="MousePointerClick" className="w-10 h-10 sm:w-14 sm:h-14 text-orange-400" />
                </div>
                <h3 className="text-xl sm:text-3xl font-black text-[#f0f6fc] mb-2">একটি বর্ণ বেছে নিন</h3>
                <p className="text-[#8b949e] text-sm sm:text-base">উপরের বর্ণগুলোর যেকোনো একটিতে ক্লিক করুন</p>
              </div>
            )}
              </>
            )}
          </>
        )}

        {/* ==================== MODE 3: KAR SIGNS (THEORY) ==================== */}
        {activeMode === 'kar' && !isQuizMode && (
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-10 text-[#c9d1d9] text-center mb-6 sm:mb-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <h2 className="text-3xl sm:text-5xl font-black mb-4 text-[#f0f6fc] relative z-10">✨ কার চিহ্ন কী?</h2>
              <p className="text-base sm:text-lg opacity-90 leading-relaxed max-w-3xl mx-auto relative z-10 text-[#c9d1d9]">
                বাংলা ভাষায় <strong className="text-yellow-400">স্বরবর্ণ</strong> যখন <strong className="text-yellow-400">ব্যঞ্জনবর্ণের</strong> সাথে যোগ হয়,
                তখন তাদের আকৃতি পরিবর্তিত হয়। এই পরিবর্তিত রূপকেই <strong>"কার চিহ্ন"</strong> বলা হয়।
              </p>

              <div className="mt-6 sm:mt-8 inline-flex items-center gap-3 sm:gap-4 bg-[#0d1117]/60 border border-[#30363d]/60 rounded-2xl px-6 sm:px-10 py-3 sm:py-4 relative z-10">
                <span className="text-2xl sm:text-3xl font-bold text-white">ক</span>
                <Icon name="Plus" className="w-5 h-5 sm:w-6 sm:h-6 text-[#8b949e]" />
                <span className="text-2xl sm:text-3xl font-bold text-white">আ</span>
                <Icon name="Equal" className="w-5 h-5 sm:w-6 sm:h-6 text-[#8b949e]" />
                <span className="text-3xl sm:text-4xl font-black text-yellow-400">কা</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {KAR_SIGNS.map((kar, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  onClick={() => handleKarClick(kar)}
                  className={`bg-gradient-to-br ${kar.color} rounded-3xl p-4 sm:p-6 text-white shadow-xl cursor-pointer hover:shadow-2xl transition-all relative overflow-hidden group`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>

                  <div className="relative z-10">
                    <div className="text-center mb-3 sm:mb-4">
                      <span className="block text-4xl sm:text-7xl font-black drop-shadow-lg mb-1 sm:mb-2">
                        {kar.vowel}
                      </span>
                      <span className="text-xs sm:text-sm font-bold opacity-80 uppercase tracking-wider">
                        {kar.meaning}
                      </span>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 sm:p-4 text-center mb-3 sm:mb-4">
                      <div className="flex items-center justify-center gap-1 sm:gap-3">
                        <span className="text-xl sm:text-3xl font-bold">ক</span>
                        {kar.kar && (
                          <>
                            <span className="text-lg sm:text-2xl text-yellow-300">+</span>
                            <span className="text-2xl sm:text-4xl font-black text-yellow-300">{kar.kar}</span>
                          </>
                        )}
                        {!kar.kar && (
                          <span className="text-xs sm:text-lg opacity-70">(কোনো কার নেই)</span>
                        )}
                      </div>
                    </div>

                    <div className="text-center mb-3 sm:mb-4">
                      <span className="text-xs sm:text-sm font-medium opacity-80 block mb-1">উদাহরণ:</span>
                      <span className="text-4xl sm:text-6xl font-black drop-shadow-lg">
                        {kar.example}
                      </span>
                    </div>

                    {kar.wordExample && (
                      <div className="bg-white/10 rounded-xl p-2 sm:p-3 flex items-center justify-center gap-2 sm:gap-3">
                        <img
                          src={getEmojiImage(kar.wordExample.emoji, 64)}
                          alt={kar.wordExample.word}
                          className="w-6 h-6 sm:w-10 sm:h-10 object-contain"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              const fallback = document.createElement('div');
                              fallback.className = "text-xl sm:text-2xl select-none";
                              fallback.textContent = kar.wordExample?.emoji || '📖';
                              parent.insertBefore(fallback, e.currentTarget);
                              e.currentTarget.style.display = 'none';
                            }
                          }}
                        />
                        <span className="text-base sm:text-xl font-bold">{kar.wordExample.word}</span>
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="Volume2" className="w-6 h-6 sm:w-8 sm:h-8 text-white/80" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== MODE 3A_VOCAB: VOCABULARY STORE (শব্দ ভান্ডার) ==================== */}
        {activeMode === 'vocab' && !isQuizMode && (
          <VocabularyStore 
            speak={speak} 
            isAudioMuted={isAudioMuted} 
            speechEngine={speechEngine}
            setSpeechEngine={setSpeechEngine}
          />
        )}

        {/* ==================== LETTER WORD CIRCLE: বর্ণ দিয়ে শব্দ শিখি ==================== */}
        {activeMode === 'letterWordCircle' && !isQuizMode && (
          <LetterWordCircle speak={speak} />
        )}

        {/* ==================== WORKSHEET: বাংলা ওয়ার্ক শীট ==================== */}
        {activeMode === 'worksheet' && !isQuizMode && (
          <Worksheet speak={speak} />
        )}

        {/* ==================== MODE 3B: DOTTED LETTERS TRACING ==================== */}
        {activeMode === 'dotted' && !isQuizMode && (
          <div className="max-w-6xl mx-auto">
            {/* Header / Intro Card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-8 text-[#c9d1d9] text-center mb-6 sm:mb-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <h2 className="text-3xl sm:text-5xl font-black mb-3 text-[#f0f6fc] relative z-10 flex items-center justify-center gap-2">
                ✍️ ডটেড বর্ণ লিখন ও হস্তলিপি
              </h2>
              <p className="text-sm sm:text-base opacity-90 leading-relaxed max-w-3xl mx-auto relative z-10 text-[#8b949e]">
                ভিন্ন কালার প্যালেট থেকে রঙ নির্বাচন করে মাউস বা হাতের স্পর্শে ডট চিহ্নের উপর বর্ণ এঁকে অনুশীলন করো।
                এছাড়া এগুলোকে <strong className="text-indigo-400">A4 সাইজের PDF</strong> শিট হিসেবে প্রিন্ট করে বাচ্চারা কাগজের উপরেও বর্ণ আঁকা শিখতে পারবে!
              </p>
            </motion.div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left Column: Letter Selector (5 cols on lg) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Tab buttons for Vowel / Consonant */}
                <div className="flex bg-[#161b22] p-1.5 rounded-2xl border border-[#30363d]">
                  <button
                    onClick={() => {
                      setDottedTab('vowel');
                      setDottedLetter('অ');
                      speak("স্বরবর্ণ");
                    }}
                    className={`flex-1 py-2.5 sm:py-3 text-sm font-black rounded-xl transition-all ${
                      dottedTab === 'vowel'
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                        : 'text-[#c9d1d9] hover:bg-[#21262d]'
                    }`}
                  >
                    🍎 স্বরবর্ণ ({BENGALI_ALPHABET.filter(i => i.type === 'vowel').length}টি)
                  </button>
                  <button
                    onClick={() => {
                      setDottedTab('consonant');
                      setDottedLetter('ক');
                      speak("ব্যঞ্জনবর্ণ");
                    }}
                    className={`flex-1 py-2.5 sm:py-3 text-sm font-black rounded-xl transition-all ${
                      dottedTab === 'consonant'
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                        : 'text-[#c9d1d9] hover:bg-[#21262d]'
                    }`}
                  >
                    🥑 ব্যঞ্জনবর্ণ ({BENGALI_ALPHABET.filter(i => i.type === 'consonant').length}টি)
                  </button>
                </div>

                {/* Letters Grid */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-4 sm:p-5 h-[350px] sm:h-[450px] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {BENGALI_ALPHABET.filter(i => i.type === (dottedTab === 'vowel' ? 'vowel' : 'consonant')).map((item) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.15, rotate: 2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setDottedLetter(item.letter);
                          speak(item.letter);
                        }}
                        className={`aspect-square flex items-center justify-center rounded-2xl text-3xl sm:text-4xl font-black transition-all border-4 cursor-pointer select-none ${
                          dottedLetter === item.letter
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-yellow-300 shadow-xl shadow-indigo-950/50 scale-105 ring-4 ring-indigo-500/30'
                            : 'bg-[#1a1f29] text-indigo-100 border-[#2e3748] hover:bg-[#252c3b] hover:border-indigo-400/50'
                        }`}
                      >
                        {item.letter}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Tracing Board & Controls (7 cols on lg) */}
              <div className="lg:col-span-7 flex flex-col gap-5 bg-[#161b22] border border-[#30363d] rounded-3xl p-4 sm:p-6 shadow-xl">
                {/* Canvas Toolbar */}
                <div className="flex justify-between items-center border-b border-[#30363d] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-[#8b949e]">অনুশীলন বর্ণ:</span>
                    <span className="text-3xl font-black text-indigo-400 bg-indigo-950/40 border border-indigo-800/50 px-3.5 py-1 rounded-2xl">
                      {dottedLetter}
                    </span>
                    <button
                      onClick={() => speak(dottedLetter)}
                      className="p-2.5 rounded-xl bg-[#21262d] border border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] transition-all cursor-pointer"
                      title="উচ্চারণ শুনুন"
                    >
                      <Icon name="Volume2" className="w-5 h-5 text-indigo-400" />
                    </button>
                  </div>

                  <button
                    onClick={clearCanvas}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-950/30 text-rose-400 border border-rose-900/40 hover:bg-rose-900/40 hover:text-rose-200 transition-all text-xs sm:text-sm font-black cursor-pointer"
                  >
                    <Icon name="Trash2" className="w-4 h-4" />
                    <span>মুছে ফেলুন 🧹</span>
                  </button>
                </div>

                {/* Canvas Drawing Container */}
                <div className="flex flex-col items-center py-2 gap-4">
                  <div className="relative w-full max-w-[420px] aspect-square bg-[#0d1117] border-4 border-dashed border-[#30363d] rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
                    {/* Background Dotted Letter SVG */}
                    <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                      <svg viewBox="0 0 400 400" className="w-4/5 h-4/5 opacity-40">
                        <text
                          x="50%"
                          y="55%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="font-sans font-black select-none fill-none stroke-slate-400"
                          style={{
                            fontSize: '250px',
                            strokeDasharray: '10 10',
                            strokeWidth: '4px'
                          }}
                        >
                          {dottedLetter}
                        </text>
                      </svg>
                    </div>
                    
                    {/* Drawing Canvas */}
                    <canvas
                      ref={canvasRef}
                      width={1000}
                      height={1000}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                    />

                    {/* Sparkle Burst Overlay for Tactile Feedback */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                      <AnimatePresence>
                        {canvasSparkles.map(sparkle => (
                          <motion.svg
                            key={sparkle.id}
                            initial={{ 
                              x: 0,
                              y: 0,
                              scale: 0.1, 
                              opacity: 1,
                              rotate: 0 
                            }}
                            animate={{ 
                              x: sparkle.tx, 
                              y: sparkle.ty, 
                              scale: [0.1, 1.3, 0], 
                              opacity: [1, 1, 0],
                              rotate: 360
                            }}
                            transition={{ 
                              duration: 0.6, 
                              ease: "easeOut" 
                            }}
                            onAnimationComplete={() => {
                              setCanvasSparkles(prev => prev.filter(s => s.id !== sparkle.id));
                            }}
                            style={{
                              position: 'absolute',
                              left: `${sparkle.x}%`,
                              top: `${sparkle.y}%`,
                              transform: 'translate(-50%, -50%)',
                              width: sparkle.size,
                              height: sparkle.size,
                              pointerEvents: 'none',
                            }}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z"
                              fill={sparkle.color}
                            />
                          </motion.svg>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Perfect Trace Badge in Top Corner */}
                    <AnimatePresence>
                      {isPerfectTrace && (
                        <motion.div
                          id="perfect-trace-badge"
                          initial={{ opacity: 0, scale: 0.3, y: -20, rotate: -15 }}
                          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.5, y: -10 }}
                          className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 rounded-2xl shadow-lg border-2 border-yellow-300"
                        >
                          <motion.span
                            animate={{ scale: [1, 1.25, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="text-base"
                          >
                            ⭐
                          </motion.span>
                          <span className="text-[10px] sm:text-xs font-black text-slate-950 uppercase tracking-wide select-none">
                            নিখুঁত আঁকা! 🎯
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full max-w-[420px] bg-[#0d1117] border border-[#30363d] rounded-2xl p-3 sm:p-4 flex flex-col gap-2 shadow-md">
                    <div className="flex justify-between items-center text-xs font-black">
                      <span className="text-[#8b949e] flex items-center gap-1.5">
                        <Icon name="PenTool" className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                        লিখন অগ্রগতি (Writing Progress):
                      </span>
                      <span className={`${dottedProgress >= 90 ? 'text-emerald-400 font-extrabold scale-105' : 'text-indigo-400'} font-mono transition-all duration-300`}>
                        {dottedProgress}% {dottedProgress >= 90 ? '🎉 চমৎকার!' : ''}
                      </span>
                    </div>
                    <div className="w-full h-3.5 bg-[#161b22] border border-[#30363d] rounded-full overflow-hidden p-[2px]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${dottedProgress}%` }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Canvas Controls: Colors & Brush Sizes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#30363d] pt-4">
                  {/* Color Selector */}
                  <div>
                    <h4 className="text-xs font-black text-[#8b949e] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Icon name="Palette" className="w-3.5 h-3.5 text-indigo-400" />
                      রঙ নির্বাচন করুন:
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { color: '#ec4899', bg: 'bg-[#ec4899]' }, // Pink
                        { color: '#ef4444', bg: 'bg-[#ef4444]' }, // Red
                        { color: '#3b82f6', bg: 'bg-[#3b82f6]' }, // Blue
                        { color: '#10b981', bg: 'bg-[#10b981]' }, // Green
                        { color: '#f59e0b', bg: 'bg-[#f59e0b]' }, // Yellow
                        { color: '#8b5cf6', bg: 'bg-[#8b5cf6]' }, // Purple
                        { color: '#ffffff', bg: 'bg-white border border-slate-300' } // Eraser/White
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setBrushColor(item.color)}
                          className={`w-8 h-8 rounded-full ${item.bg} transition-all relative ${
                            brushColor === item.color
                              ? 'ring-4 ring-indigo-500 scale-110 shadow-lg'
                              : 'hover:scale-105'
                          }`}
                          title={item.color === '#ffffff' ? 'ইরেজার / সাদা রঙ' : 'রঙ'}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Brush Size Selector */}
                  <div>
                    <h4 className="text-xs font-black text-[#8b949e] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Icon name="Eraser" className="w-3.5 h-3.5 text-indigo-400" />
                      তুলির সাইজ:
                    </h4>
                    <div className="flex gap-2 mb-3">
                      {[
                        { label: 'চিকন', size: 8 },
                        { label: 'মাঝারি', size: 14 },
                        { label: 'মোটা', size: 22 }
                      ].map((preset) => (
                        <button
                          key={preset.size}
                          onClick={() => setBrushSize(preset.size)}
                          className={`flex-1 py-1.5 text-xs font-black rounded-lg border transition-all ${
                            brushSize === preset.size
                              ? 'bg-[#21262d] text-indigo-400 border-indigo-500'
                              : 'bg-[#0d1117] text-[#8b949e] border-[#30363d] hover:bg-[#21262d]'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    {/* Real-time Brush Size Slider */}
                    <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-2.5">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-black text-[#8b949e] uppercase tracking-wider flex items-center gap-1">
                          🎛️ তুলির ঘনত্ব (Thickness):
                        </span>
                        <span className="text-xs font-mono font-black text-indigo-400 bg-[#161b22] px-1.5 py-0.5 rounded border border-[#30363d]">
                          {brushSize}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="40"
                        value={brushSize}
                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
                        className="w-full h-2 bg-[#161b22] rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none border border-[#30363d]"
                      />
                      <div className="flex justify-between text-[9px] text-[#8b949e] font-bold mt-1 px-0.5">
                        <span>খুব চিকন (4px)</span>
                        <span>খুব মোটা (40px)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PDF Worksheets Panel */}
                <div className="border-t border-[#30363d] pt-5 mt-1">
                  <h4 className="text-xs font-black text-[#8b949e] uppercase tracking-wider mb-3">
                    🖨️ A4 PDF ওয়ার্কশীট ডাউনলোড (কাগজে অনুশীলনের জন্য):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      onClick={() => {
                        downloadDottedPDF([dottedLetter], `वर्ण ${dottedLetter}`);
                        speak("এই বর্ণের ওয়ার্কশীট ডাউনলোড হচ্ছে");
                      }}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow transition-all cursor-pointer"
                    >
                      <Icon name="Download" className="w-3.5 h-3.5" />
                      <span>वर्ण: {dottedLetter} শিট</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        const vowelsList = BENGALI_ALPHABET.filter(i => i.type === 'vowel').map(i => i.letter);
                        downloadDottedPDF(vowelsList, "সকল স্বরবর্ণ বই");
                        speak("সব স্বরবর্ণের হস্তলিপি বই ডাউনলোড হচ্ছে");
                      }}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#21262d] border border-[#30363d] hover:border-indigo-500/40 text-indigo-400 font-bold text-xs shadow transition-all cursor-pointer"
                    >
                      <Icon name="FileDown" className="w-3.5 h-3.5" />
                      <span>সকল স্বরবর্ণ বই 📚</span>
                    </button>

                    <button
                      onClick={() => {
                        const consonantsList = BENGALI_ALPHABET.filter(i => i.type === 'consonant').map(i => i.letter);
                        downloadDottedPDF(consonantsList, "সকল ব্যঞ্জনবর্ণ বই");
                        speak("সব ব্যঞ্জনবর্ণের হস্তলিপি বই ডাউনলোড হচ্ছে");
                      }}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#21262d] border border-[#30363d] hover:border-indigo-500/40 text-indigo-400 font-bold text-xs shadow transition-all cursor-pointer"
                    >
                      <Icon name="FileDown" className="w-3.5 h-3.5" />
                      <span>সকল ব্যঞ্জনবর্ণ বই 📚</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== BENGALI LETTER MATRA: বর্ণের মাত্রা শিখি ==================== */}
        {activeMode === 'matra' && !isQuizMode && (
          <React.Suspense fallback={<div className="text-center py-12 font-black text-slate-400">বর্ণের মাত্রা লোড হচ্ছে...</div>}>
            <LetterMatra speak={speak} />
          </React.Suspense>
        )}

        {/* ==================== MODE 3B: BENGALI LETTER STROKE WRITING ==================== */}
        {activeMode === 'write' && !isQuizMode && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Inline CSS styling block for magical writing animation */}
            {(() => {
              const baseAnimDuration = 
                writeSpeedLevel === 1 ? 8.0 :
                writeSpeedLevel === 2 ? 6.0 :
                writeSpeedLevel === 3 ? 4.5 :
                writeSpeedLevel === 4 ? 3.0 :
                1.5;
              const animDuration = baseAnimDuration / strokePlaybackSpeed;
              return (
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes drawStrokeLine_${writeLetter}_${writeAnimKey} {
                    0% {
                      stroke-dashoffset: 1400;
                      opacity: 0.3;
                    }
                    15% {
                      opacity: 1;
                    }
                    80% {
                      stroke-dashoffset: 0;
                      fill-opacity: 0;
                    }
                    100% {
                      stroke-dashoffset: 0;
                      fill-opacity: 1;
                    }
                  }
                  @keyframes fadeLetterFill_${writeLetter}_${writeAnimKey} {
                    0%, 75% {
                      fill-opacity: 0;
                    }
                    100% {
                      fill-opacity: 1;
                    }
                  }
                  @keyframes movePencilCircle_${writeLetter}_${writeAnimKey} {
                    0% {
                      transform: translate(35px, 45px);
                      opacity: 0;
                    }
                    5% {
                      opacity: 1;
                    }
                    25% {
                      transform: translate(165px, 45px);
                    }
                    55% {
                      transform: translate(65px, 110px);
                    }
                    85% {
                      transform: translate(135px, 165px);
                    }
                    95% {
                      transform: translate(165px, 165px);
                    }
                    100% {
                      transform: translate(165px, 165px);
                      opacity: 0;
                    }
                  }
                  .animated-stroke-path-${writeLetter}-${writeAnimKey} {
                    stroke-dasharray: 1400;
                    stroke-dashoffset: 1400;
                    animation: drawStrokeLine_${writeLetter}_${writeAnimKey} ${animDuration}s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                  }
                  .animated-fill-text-${writeLetter}-${writeAnimKey} {
                    animation: fadeLetterFill_${writeLetter}_${writeAnimKey} ${animDuration}s ease-in-out infinite;
                  }
                  .pencil-guide-cursor-${writeLetter}-${writeAnimKey} {
                    animation: movePencilCircle_${writeLetter}_${writeAnimKey} ${animDuration}s ease-in-out infinite;
                  }
                `}} />
              );
            })()}

            {/* Bubbly Header Intro Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative overflow-hidden mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 border-4 border-yellow-300 text-white shadow-2xl text-center"
            >
              {/* Floating cute decorations */}
              <div className="absolute top-2 left-4 text-3xl animate-bounce">🎈</div>
              <div className="absolute top-3 right-6 text-3xl animate-pulse">🌟</div>
              <div className="absolute bottom-2 left-8 text-3xl animate-spin" style={{ animationDuration: '6s' }}>🌈</div>
              <div className="absolute bottom-3 right-10 text-3xl animate-bounce">🍭</div>

              <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-wide drop-shadow-md">
                🎨 যাদুর পেন্সিলে বর্ণ লিখন শিখি! ✨
              </h2>
              <p className="text-sm sm:text-base text-pink-100 font-bold max-w-2xl mx-auto drop-shadow-sm">
                ছোট্ট সোনামণিরা, তোমরা কি জানো প্রতিটি বাংলা বর্ণ কিভাবে সঠিক নিয়মে সুন্দর করে আঁকতে হয়? 
                নিচের যেকোনো বর্ণে ক্লিক করো আর যাদুর পেন্সিলের সুন্দর আঁকাআঁকি দেখো!
              </p>

              {/* Mute / Unmute Toggle Switch */}
              <div className="mt-5 flex justify-center items-center">
                <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-2 rounded-full border border-white/25 shadow-lg">
                  <span className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                    <Icon name={isWriteMuted ? "VolumeX" : "Volume2"} className="w-4 h-4 animate-pulse" />
                    <span>{isWriteMuted ? 'নিঃশব্দ অনুশীলন (Silent Practice)' : 'উচ্চারণ ও শব্দসহ অনুশীলন'}</span>
                  </span>
                  
                  {/* Switch toggle container button */}
                  <button
                    onClick={() => {
                      const newMute = !isWriteMuted;
                      setIsWriteMuted(newMute);
                      if (!newMute) {
                        speak("আওয়াজ চালু হয়েছে");
                      }
                    }}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none flex items-center p-0.5 cursor-pointer ${
                      isWriteMuted ? 'bg-slate-600/80 border border-slate-500/50' : 'bg-green-400 border border-green-300/50'
                    }`}
                    title={isWriteMuted ? 'আওয়াজ চালু করুন' : 'আওয়াজ বন্ধ করুন'}
                  >
                    {/* Sliding knob */}
                    <motion.div
                      layout
                      className={`w-5.5 h-5.5 rounded-full bg-white shadow-md flex items-center justify-center text-[10px] font-bold text-slate-800 transition-all ${
                        isWriteMuted ? 'translate-x-0' : 'translate-x-7'
                      }`}
                    >
                      {isWriteMuted ? '🔇' : '🔊'}
                    </motion.div>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Kids Theme Interactive Tab Switchers */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => { setWriteTab('vowel'); setWriteLetter('অ'); setWriteAnimKey(p => p + 1); speak("স্বরবর্ণ লিখন"); }}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-xl cursor-pointer ${
                  writeTab === 'vowel'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-4 border-yellow-300 scale-105'
                    : 'bg-[#161b22] text-pink-400 border-2 border-pink-500/20 hover:bg-pink-950/20'
                }`}
              >
                <span className="text-2xl">🍎</span>
                <span>স্বরবর্ণ লিখন</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => { setWriteTab('consonant'); setWriteLetter('ক'); setWriteAnimKey(p => p + 1); speak("ব্যঞ্জনবর্ণ লিখন"); }}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-xl cursor-pointer ${
                  writeTab === 'consonant'
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-4 border-yellow-300 scale-105'
                    : 'bg-[#161b22] text-cyan-400 border-2 border-cyan-500/20 hover:bg-cyan-950/20'
                }`}
              >
                <span className="text-2xl">🥑</span>
                <span>ব্যঞ্জনবর্ণ লিখন</span>
              </motion.button>
            </div>

            {/* Main Interactive Screen Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Huge Grid of Colorful Letters */}
              <div className="lg:col-span-7 bg-[#161b22] border-4 border-[#30363d] rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-extrabold mb-4 text-[#c9d1d9] flex items-center gap-2">
                  <span className="text-xl">👉</span> 
                  {writeTab === 'vowel' ? 'স্বরবর্ণ (১১টি বর্ণ)' : 'ব্যঞ্জনবর্ণ (৩৯টি বর্ণ)'}
                </h3>
                
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                  {BENGALI_ALPHABET.filter(i => i.type === (writeTab === 'vowel' ? 'vowel' : 'consonant')).map((item, idx) => {
                    const isSelected = writeLetter === item.letter;
                    // Define cute backgrounds for grid items dynamically
                    const colorGradients = [
                      'from-pink-400 to-rose-500',
                      'from-purple-400 to-indigo-500',
                      'from-cyan-400 to-teal-500',
                      'from-amber-400 to-orange-500',
                      'from-green-400 to-emerald-500',
                      'from-blue-400 to-indigo-500',
                      'from-violet-400 to-fuchsia-500'
                    ];
                    const bgGrad = colorGradients[idx % colorGradients.length];
                    
                    return (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.15, rotate: 3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setWriteLetter(item.letter);
                          setWriteAnimKey(prev => prev + 1);
                          speak(item.letter);
                        }}
                        className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                          isSelected 
                            ? 'ring-4 ring-yellow-400 scale-105 shadow-2xl' 
                            : 'hover:shadow-lg'
                        } bg-gradient-to-br ${bgGrad} text-white shadow`}
                      >
                        {/* Kid Theme Badge or Mascot */}
                        <div className="absolute top-1 right-1 text-xs opacity-75">✨</div>
                        
                        <span className="text-4xl sm:text-5xl font-black drop-shadow-md">
                          {item.letter}
                        </span>
                        
                        <span className="text-[10px] font-bold mt-1 bg-white/20 px-1.5 py-0.5 rounded-full">
                          {writeTab === 'vowel' ? 'স্বরবর্ণ' : 'ব্যঞ্জনবর্ণ'}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Magical Drawing Slate & Steps */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Magical Blackboard / Slate */}
                <div className="bg-slate-900 border-8 border-yellow-400 rounded-3xl p-6 relative shadow-2xl overflow-hidden text-center">
                  {/* Floating Slate Accents */}
                  <div className="absolute top-2 left-2 text-xs font-mono text-slate-500">BOARD NO: {writeLetter}</div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  </div>

                  <h3 className="text-lg font-black text-yellow-300 mb-2 flex items-center justify-center gap-1">
                    🎬 যাদুর পেন্সিল আঁকছে: "{writeLetter}"
                  </h3>

                  {/* SVG Canvas Board */}
                  <div className="w-full aspect-square max-w-[280px] sm:max-w-[320px] mx-auto bg-[#1e293b] rounded-2xl border-4 border-slate-700 p-4 relative shadow-inner">
                    {/* Celebratory confetti particles */}
                    {showConfetti && (
                      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                        {confettiList.map((p) => (
                          <motion.div
                            key={p.id}
                            initial={{ 
                              opacity: 1, 
                              scale: 0, 
                              x: 0, 
                              y: 0, 
                              rotate: 0,
                              left: `${p.startX}%`,
                              top: `${p.startY}%`
                            }}
                            animate={{ 
                              opacity: [1, 1, 0.8, 0],
                              scale: [0, p.scale, p.scale * 0.8, 0],
                              x: p.targetX,
                              y: p.targetY,
                              rotate: p.rotate,
                            }}
                            transition={{ 
                              duration: p.duration, 
                              ease: "easeOut",
                              delay: p.delay
                            }}
                            className="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                          >
                            {p.emoji ? (
                              <span className="text-xl filter drop-shadow-md select-none">{p.emoji}</span>
                            ) : (
                              <div className={`${p.size} ${p.shape} ${p.color} shadow-lg filter drop-shadow-sm`} />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Glowing Rainbow Gradient Grid Definition */}
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      <defs>
                        {/* Beautiful Kid Theme Rainbow Gradient */}
                        <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ff007f" />
                          <stop offset="35%" stopColor="#ffbe0b" />
                          <stop offset="70%" stopColor="#37dbda" />
                          <stop offset="100%" stopColor="#8338ec" />
                        </linearGradient>

                        <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ff4d94" />
                          <stop offset="100%" stopColor="#ff0055" />
                        </linearGradient>

                        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00f2fe" />
                          <stop offset="100%" stopColor="#4facfe" />
                        </linearGradient>

                        <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffb347" />
                          <stop offset="100%" stopColor="#ffcc33" />
                        </linearGradient>

                        <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#11998e" />
                          <stop offset="100%" stopColor="#38ef7d" />
                        </linearGradient>

                        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#b300af" />
                          <stop offset="100%" stopColor="#7400b8" />
                        </linearGradient>
                        
                        {/* Blackboard grid lines pattern */}
                        <pattern id="slateGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2e3e56" strokeWidth="0.8" />
                        </pattern>
                      </defs>

                      {/* Chalkboard square lines background */}
                      <rect width="100%" height="100%" fill="url(#slateGrid)" rx="12" />

                      {/* Educational guiding center crosshair lines */}
                      <line x1="100" y1="0" x2="100" y2="200" stroke="#334155" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="0" y1="100" x2="200" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="5,5" />

                      {/* Faint static outline helper */}
                      <text 
                        x="50%" 
                        y="55%" 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        fontFamily="sans-serif" 
                        fontSize="140" 
                        fontWeight="900" 
                        fill="none" 
                        stroke="#2a3a50" 
                        strokeWidth="3" 
                        strokeDasharray="6,6"
                      >
                        {writeLetter}
                      </text>

                      {/* Animated writing trace outline */}
                      <text 
                        className={`animated-stroke-path-${writeLetter}-${writeAnimKey}`} 
                        x="50%" 
                        y="55%" 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        fontFamily="sans-serif" 
                        fontSize="140" 
                        fontWeight="900" 
                        fill="none" 
                        stroke={`url(#${writeColor}Grad)`} 
                        strokeWidth="10" 
                        strokeLinecap="round"
                      >
                        {writeLetter}
                      </text>

                      {/* Animated letter fill that fades in slowly */}
                      <text 
                        className={`animated-fill-text-${writeLetter}-${writeAnimKey}`} 
                        x="50%" 
                        y="55%" 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        fontFamily="sans-serif" 
                        fontSize="140" 
                        fontWeight="900" 
                        fill={`url(#${writeColor}Grad)`}
                      >
                        {writeLetter}
                      </text>

                      {/* Visual sequence markers & directional arrows */}
                      {getLetterMarkers(writeLetter).map((marker, index) => {
                        const colors = [
                          { bg: '#ef4444', border: '#fee2e2' }, // Red
                          { bg: '#3b82f6', border: '#dbeafe' }, // Blue
                          { bg: '#10b981', border: '#d1fae5' }, // Emerald
                          { bg: '#f59e0b', border: '#fef3c7' }, // Amber
                          { bg: '#8b5cf6', border: '#ede9fe' }, // Purple
                        ];
                        const color = colors[index % colors.length];
                        return (
                          <g key={index} className="opacity-95 select-none pointer-events-none">
                            {/* Outer rotating/pulsing glow ring */}
                            <circle 
                              cx={marker.x} 
                              cy={marker.y} 
                              r="13" 
                              fill="none" 
                              stroke={color.bg} 
                              strokeWidth="1.5" 
                              strokeDasharray="3,3" 
                              className="animate-spin" 
                              style={{ transformOrigin: `${marker.x}px ${marker.y}px`, animationDuration: '10s' }} 
                            />
                            {/* Main colored circle bubble */}
                            <circle 
                              cx={marker.x} 
                              cy={marker.y} 
                              r="9" 
                              fill={color.bg} 
                              stroke={color.border} 
                              strokeWidth="2" 
                              className="drop-shadow-md" 
                            />
                            {/* Marker Number text */}
                            <text 
                              x={marker.x} 
                              y={marker.y + 0.5} 
                              textAnchor="middle" 
                              dominantBaseline="middle" 
                              fill="#ffffff" 
                              fontSize="9.5" 
                              fontWeight="900"
                            >
                              {marker.number}
                            </text>
                            {/* Directional Arrow offset in marker angle direction */}
                            <g transform={`translate(${marker.x}, ${marker.y}) rotate(${marker.angle}) translate(15, 0)`}>
                              <path 
                                d="M -5 -4 L 2 0 L -5 4" 
                                fill="none" 
                                stroke={color.bg} 
                                strokeWidth="2.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                              />
                              <circle cx="2" cy="0" r="2" fill={color.bg} />
                            </g>
                          </g>
                        );
                      })}

                      {/* Guided Magical Sparkle Pencil */}
                      <g className={`pencil-guide-cursor-${writeLetter}-${writeAnimKey}`}>
                        <text x="0" y="0" fontSize="30" textAnchor="middle" dominantBaseline="middle">✏️</text>
                        <circle 
                          cx="0" 
                          cy="0" 
                          r="12" 
                          fill={
                            writeColor === 'rainbow' ? 'rgba(251, 191, 36, 0.4)' :
                            writeColor === 'pink' ? 'rgba(255, 0, 85, 0.4)' :
                            writeColor === 'cyan' ? 'rgba(0, 242, 254, 0.4)' :
                            writeColor === 'amber' ? 'rgba(255, 179, 71, 0.4)' :
                            writeColor === 'emerald' ? 'rgba(56, 239, 125, 0.4)' :
                            'rgba(116, 0, 184, 0.4)'
                          } 
                          stroke={
                            writeColor === 'rainbow' ? '#fbbf24' :
                            writeColor === 'pink' ? '#ff0055' :
                            writeColor === 'cyan' ? '#00f2fe' :
                            writeColor === 'amber' ? '#ffb347' :
                            writeColor === 'emerald' ? '#38ef7d' :
                            '#7400b8'
                          } 
                          strokeWidth="2" 
                          className="animate-ping" 
                        />
                      </g>
                    </svg>
                  </div>

                  {/* Kids Speed Slider Control */}
                  <div className="mt-6 mb-2 px-4 py-3 bg-[#1e293b]/60 rounded-2xl border-2 border-slate-700/60 max-w-[320px] mx-auto text-left">
                    <label className="block text-xs sm:text-sm font-black text-yellow-300 mb-2 flex items-center gap-1">
                      <span>🏎️ যাদুর পেন্সিল ঘোরার গতি:</span>
                      <span className="text-white ml-auto font-mono text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700/50">
                        {writeSpeedLevel === 1 ? "🐢 খুব ধীর" :
                         writeSpeedLevel === 2 ? "🐇 ধীর" :
                         writeSpeedLevel === 3 ? "🚗 সাধারণ" :
                         writeSpeedLevel === 4 ? "⚡ দ্রুত" :
                         "🚀 রকেট গতি"}
                      </span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={writeSpeedLevel}
                      onChange={(e) => {
                        const newSpeed = parseInt(e.target.value);
                        setWriteSpeedLevel(newSpeed);
                        setWriteAnimKey(prev => prev + 1); // instantly restart animation with new speed
                      }}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                      <span>🐢 ধীর</span>
                      <span>🚗 সাধারণ</span>
                      <span>🚀 দ্রুত</span>
                    </div>
                  </div>

                  {/* Granular Playback Speed Slider (1x, 0.75x, 0.5x) */}
                  <div className="mt-4 mb-2 px-4 py-3 bg-[#1e293b]/60 rounded-2xl border-2 border-slate-700/60 max-w-[320px] mx-auto text-left">
                    <label className="block text-xs sm:text-sm font-black text-yellow-300 mb-2 flex items-center gap-1">
                      <span>🐌 আঁকার গতি ধীর করো (Playback Speed):</span>
                      <span className="text-white ml-auto font-mono text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700/50">
                        {strokePlaybackSpeed === 0.5 ? "0.5x (খুব ধীর)" :
                         strokePlaybackSpeed === 0.75 ? "0.75x (ধীর)" :
                         "1.0x (স্বাভাবিক)"}
                      </span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      value={strokePlaybackSpeed === 0.5 ? 1 : strokePlaybackSpeed === 0.75 ? 2 : 3}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        const speed = val === 1 ? 0.5 : val === 2 ? 0.75 : 1.0;
                        setStrokePlaybackSpeed(speed);
                        setWriteAnimKey(prev => prev + 1); // instantly restart animation with new speed
                        speak(`${speed === 0.5 ? 'অর্ধেক' : speed === 0.75 ? 'পনে এক' : 'স্বাভাবিক'} গতি`);
                      }}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                      <button 
                        onClick={() => {
                          setStrokePlaybackSpeed(0.5);
                          setWriteAnimKey(prev => prev + 1);
                          speak("অর্ধেক গতি");
                        }}
                        className={`hover:text-yellow-300 px-1 rounded transition-colors ${strokePlaybackSpeed === 0.5 ? 'text-yellow-300 font-black' : ''}`}
                      >
                        0.5x
                      </button>
                      <button 
                        onClick={() => {
                          setStrokePlaybackSpeed(0.75);
                          setWriteAnimKey(prev => prev + 1);
                          speak("পনে এক গতি");
                        }}
                        className={`hover:text-yellow-300 px-1 rounded transition-colors ${strokePlaybackSpeed === 0.75 ? 'text-yellow-300 font-black' : ''}`}
                      >
                        0.75x
                      </button>
                      <button 
                        onClick={() => {
                          setStrokePlaybackSpeed(1.0);
                          setWriteAnimKey(prev => prev + 1);
                          speak("স্বাভাবিক গতি");
                        }}
                        className={`hover:text-yellow-300 px-1 rounded transition-colors ${strokePlaybackSpeed === 1.0 ? 'text-yellow-300 font-black' : ''}`}
                      >
                        1x (স্বাভাবিক)
                      </button>
                    </div>
                  </div>

                  {/* Kids Color Palette Selector */}
                  <div className="mt-4 mb-2 px-4 py-3 bg-[#1e293b]/60 rounded-2xl border-2 border-slate-700/60 max-w-[320px] mx-auto text-left">
                    <label className="block text-xs sm:text-sm font-black text-yellow-300 mb-2 flex items-center gap-1">
                      <span>🎨 যাদুর পেন্সিলের রঙ:</span>
                    </label>
                    <div className="flex flex-wrap gap-2 justify-center mt-1">
                      {[
                        { id: 'rainbow', name: 'রংধনু', icon: '🌈', color: 'bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500' },
                        { id: 'pink', name: 'গোলাপি', icon: '🍓', color: 'bg-pink-500' },
                        { id: 'cyan', name: 'আকাশি', icon: '💎', color: 'bg-cyan-400' },
                        { id: 'amber', name: 'হলুদ', icon: '🍯', color: 'bg-amber-400' },
                        { id: 'emerald', name: 'সবুজ', icon: '🌳', color: 'bg-emerald-400' },
                        { id: 'purple', name: 'বেগুনি', icon: '🔮', color: 'bg-purple-500' },
                      ].map((pal) => {
                        const isColorSelected = writeColor === pal.id;
                        return (
                          <motion.button
                            key={pal.id}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setWriteColor(pal.id);
                              setWriteAnimKey(prev => prev + 1); // instantly restart animation with new color
                              speak(`${pal.name} রঙ`);
                            }}
                            className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all border-2 ${
                              isColorSelected 
                                ? 'border-yellow-300 ring-2 ring-yellow-400 scale-110 shadow-lg' 
                                : 'border-transparent hover:scale-105'
                            } ${pal.color}`}
                            title={pal.name}
                          >
                            <span className="text-sm">{pal.icon}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Playback Controls */}
                  <div className="mt-4 flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setWriteAnimKey(prev => prev + 1);
                        speak("আবার দেখুন");
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-sm shadow-lg cursor-pointer border-2 border-yellow-300"
                    >
                      <Icon name="Play" className="w-4 h-4 fill-white" />
                      <span>আবার দেখুন 🔄</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => speak(writeLetter)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-sm shadow-lg cursor-pointer border-2 border-yellow-300"
                    >
                      <Icon name="Volume2" className="w-4 h-4" />
                      <span>উচ্চারণ শুনুন 🔊</span>
                    </motion.button>
                  </div>
                </div>

                {/* Static Target Letter Preview Card with Sparkle & Flash Effect */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: segmentCompletedFlash ? 1.03 : 1.0,
                    borderColor: segmentCompletedFlash ? '#fbbf24' : '#34d399',
                    boxShadow: segmentCompletedFlash ? '0 10px 25px -5px rgba(251, 191, 36, 0.4)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  transition={{ duration: 0.2 }}
                  className={`bg-slate-800/90 border-4 rounded-3xl p-5 shadow-xl flex items-center justify-between gap-4 w-full transition-colors duration-300 ${
                    segmentCompletedFlash ? 'border-amber-400 bg-slate-800/95' : 'border-emerald-400'
                  }`}
                >
                  <div className="text-left flex-1">
                    <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                      <span>🎯 লক্ষ্য বর্ণ (Target Letter)</span>
                      {segmentCompletedFlash && (
                        <motion.span 
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                          className="text-amber-400 font-extrabold text-xs"
                        >
                          ✨ চমকপ্রদ!
                        </motion.span>
                      )}
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                      তোমার লক্ষ্য হলো <span className="text-yellow-300 font-extrabold">"{writeLetter}"</span> বর্ণটি শেখা!
                    </h4>
                    <p className="text-xs text-slate-300 font-medium mt-1">
                      পেন্সিলটি যেভাবে ঘুরছে, তা মনোযোগ দিয়ে দেখে খাতায় প্র্যাকটিস করো।
                    </p>
                  </div>
                  
                  {/* Letter preview with sparkle background & bounce */}
                  <div className="relative shrink-0">
                    {/* Sparkle Emojis bursting when segmentCompletedFlash is active */}
                    {segmentCompletedFlash && (
                      <>
                        <motion.span 
                          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                          animate={{ scale: 1.5, x: -35, y: -25, opacity: 0 }}
                          className="absolute text-xl pointer-events-none select-none z-10"
                        >
                          ✨
                        </motion.span>
                        <motion.span 
                          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                          animate={{ scale: 1.5, x: 35, y: -25, opacity: 0 }}
                          className="absolute text-xl pointer-events-none select-none z-10"
                        >
                          🌟
                        </motion.span>
                        <motion.span 
                          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                          animate={{ scale: 1.5, x: -30, y: 25, opacity: 0 }}
                          className="absolute text-lg pointer-events-none select-none z-10"
                        >
                          ✨
                        </motion.span>
                        <motion.span 
                          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                          animate={{ scale: 1.5, x: 30, y: 25, opacity: 0 }}
                          className="absolute text-lg pointer-events-none select-none z-10"
                        >
                          🎉
                        </motion.span>
                      </>
                    )}
                    
                    <motion.div 
                      animate={segmentCompletedFlash ? {
                        scale: [1, 1.25, 1],
                        backgroundColor: ['#020617', '#1e1b4b', '#020617'],
                        borderColor: ['#34d399', '#fbbf24', '#34d399']
                      } : {}}
                      transition={{ duration: 0.4 }}
                      className="bg-slate-950 border-2 border-emerald-400/50 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-emerald-500/5 animate-pulse pointer-events-none" />
                      {segmentCompletedFlash && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-yellow-400/10 to-purple-600/20 animate-spin pointer-events-none" />
                      )}
                      <span className={`text-5xl font-black transition-colors duration-300 select-none ${
                        segmentCompletedFlash ? 'text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]' : 'text-yellow-300 drop-shadow-md'
                      }`}>
                        {writeLetter}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Stroke Flow Step Cards & Mascot Instruction */}
                <div className="bg-[#161b22] border-4 border-[#30363d] rounded-3xl p-6 shadow-xl text-left">
                  {/* Step Guide title */}
                  <h4 className="text-lg font-black text-cyan-400 mb-4 flex items-center gap-2">
                    🎯 {writeLetter} লেখার সঠিক ধাপসমূহ (Stroke Steps)
                  </h4>

                  {/* Step list rendering */}
                  <div className="flex flex-col gap-3">
                    {getStrokeGuide(writeLetter).steps.map((step, idx) => {
                      // Custom attractive color for each step
                      const stepColors = [
                        'bg-sky-500/10 text-sky-400 border-sky-500/20',
                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                        'bg-amber-500/10 text-amber-400 border-amber-500/20',
                        'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      ];
                      const stepCol = stepColors[idx % stepColors.length];
                      
                      return (
                        <div 
                          key={idx} 
                          className={`flex items-start gap-3 p-3 rounded-2xl border-2 ${stepCol} shadow-sm`}
                        >
                          <span className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-white text-xs font-black shrink-0">
                            <span className="text-[#0d1117]">{idx + 1}</span>
                          </span>
                          <p className="text-sm font-bold text-[#c9d1d9] leading-relaxed">
                            {step}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mascot Speech Bubble Section */}
                  <div className="mt-6 pt-5 border-t border-[#30363d] flex items-start gap-4">
                    <span className="text-4xl animate-bounce shrink-0">
                      {getStrokeGuide(writeLetter).mascot}
                    </span>
                    <div className="bg-[#1e293b] border-2 border-amber-500/30 rounded-2xl p-4 relative text-sm font-bold text-amber-200 shadow-inner">
                      {/* Speech bubble pointer arrow */}
                      <div className="absolute top-4 -left-2 w-3 h-3 bg-[#1e293b] border-l-2 border-b-2 border-amber-500/30 rotate-45"></div>
                      <p className="leading-relaxed">
                        🐰 {getStrokeGuide(writeLetter).advice}
                      </p>
                      <div className="text-[10px] text-gray-500 font-mono mt-1 text-right">
                        💡 {getStrokeGuide(writeLetter).funFact}
                      </div>
                    </div>
                  </div>

                  {/* Printable Worksheet and Workbook Downloads */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        speak("এই বর্ণের সঠিক লিখন ওয়ার্কশীট ডাউনলোড হচ্ছে");
                        downloadStrokePDF([writeLetter], `সঠিক প্রবাহ - ${writeLetter}`);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 border-2 border-yellow-300 text-white font-extrabold text-xs shadow-xl hover:scale-105 cursor-pointer transition-all"
                    >
                      <Icon name="Printer" className="w-4 h-4" />
                      <span>একটি বর্ণ শিট প্রিন্ট করো 🖨️</span>
                    </button>

                    <button
                      onClick={() => {
                        const targetList = BENGALI_ALPHABET.filter(i => i.type === writeTab).map(i => i.letter);
                        speak(`সব ${writeTab === 'vowel' ? 'স্বরবর্ণ' : 'ব্যঞ্জনবর্ণ'} এর বই ডাউনলোড হচ্ছে`);
                        downloadStrokePDF(targetList, `সকল ${writeTab === 'vowel' ? 'স্বরবর্ণ' : 'ব্যঞ্জনবর্ণ'} বই`);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#21262d] border-2 border-[#30363d] hover:border-amber-500/40 text-amber-400 font-extrabold text-xs shadow-lg hover:scale-105 cursor-pointer transition-all"
                    >
                      <Icon name="BookOpen" className="w-4 h-4 text-amber-400" />
                      <span>সকল {writeTab === 'vowel' ? 'স্বরবর্ণ' : 'ব্যঞ্জনবর্ণ'} বই 📚</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Consonants Pronunciation Note as requested */}
            {writeTab === 'consonant' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto mt-8 p-5 sm:p-6 bg-slate-900/60 border-2 border-dashed border-indigo-500/30 rounded-3xl shadow-2xl relative overflow-hidden text-left text-white"
              >
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-xl opacity-20 pointer-events-none" />
                
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2 mb-3">
                  <span className="text-xl">💡</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
                    ব্যঞ্জনবর্ণের উচ্চারণ ও পরিচিতি নির্দেশিকা
                  </span>
                </h3>
                
                <div className="text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3">
                  <p className="font-semibold text-slate-300">
                    ছোট সোনামণিদের সহজে শেখার জন্য প্রতিটি ব্যঞ্জনবর্ণের প্রচলিত নাম ও উচ্চারণ নিচে দেওয়া হলো:
                  </p>
                  
                  {/* Visual interactive layout of each letter's pronunciation */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-1 font-bold text-slate-200">
                    {[
                      { letter: 'ঙ', name: 'উয়ো' },
                      { letter: 'ঞ', name: 'ইয়ো' },
                      { letter: 'জ', name: 'বর্গীয়-জ' },
                      { letter: 'ণ', name: 'মূর্ধন্য-ণ' },
                      { letter: 'ন', name: 'দন্ত্য-ন' },
                      { letter: 'য', name: 'অন্তস্থ-য' },
                      { letter: 'য়', name: 'অন্তস্থ-অ' },
                      { letter: 'শ', name: 'তালব্য-শ' },
                      { letter: 'ষ', name: 'মূর্ধন্য-ষ' },
                      { letter: 'স', name: 'দন্ত্য-স' },
                      { letter: 'র', name: 'বয়ে বিন্দু-র' },
                      { letter: 'ড়', name: 'ডয়ে বিন্দু-র' },
                      { letter: 'ঢ়', name: 'ঢয়ে বিন্দু-র' },
                      { letter: 'ৎ', name: 'খন্ড-ত' },
                      { letter: 'ং', name: 'অনুস্বার' },
                      { letter: 'ঃ', name: 'বিসর-গো' },
                      { letter: 'ঁ', name: 'চন্দ্রবিন্দু' }
                    ].map((item, i) => (
                      <div key={i} className="bg-[#161b22]/90 border border-slate-700/40 px-3 py-2 rounded-xl flex items-center justify-between">
                        <span className="text-yellow-300 text-sm sm:text-base font-black">{item.letter}</span>
                        <span className="text-slate-500 font-normal text-xs">=</span>
                        <span className="text-indigo-300 text-xs sm:text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Original Exact text from the image */}
                  <div className="mt-4 p-4 bg-[#161b22]/70 border border-slate-700/50 rounded-2xl text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    <span className="text-red-500 font-extrabold text-sm sm:text-base mr-1.5">দ্রষ্টব্য :</span>
                    ঙ = উয়ো , ঞ = ইয়ো , জ = বর্গীয়-জ , ণ = মূর্ধন্য-ণ , ন = দন্ত্য-ন , য = অন্তস্থ-য , য় = অন্তস্থ-অ , শ = তালব্য-শ , ষ = মূর্ধন্য-ষ , স = দন্ত্য-স , র = বয়ে বিন্দু-র , ড় = ডয়ে বিন্দু-র , ঢ় = ঢয়ে বিন্দু-র , ৎ = খন্ড-ত , ং = অনুস্বার , ঃ = বিসর-গো , ঁ = চন্দ্রবিন্দু ।
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ==================== MODE 3C: BENGALI LETTER DERIVATION (বর্ণ তৈরির কৌশল) ==================== */}
        {activeMode === 'letterDerivation' && !isQuizMode && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 text-[#f0f6fc]">
            {(() => {
              // Local static data inside the closure so we don't pollute the global namespace
              const DERIVATION_DATA: Record<string, {
                name: string;
                color: string;
                title: string;
                funFact: string;
                targets: {
                  id: string;
                  name: string;
                  instruction: string;
                  extraPath?: string;
                  isDot?: boolean;
                  dotX?: number;
                  dotY?: number;
                  speechRule: string;
                  hintText: string;
                }[];
                basePaths: string[];
              }> = {
                'ব': {
                  name: 'ব',
                  color: 'from-blue-500 via-indigo-500 to-indigo-700',
                  title: 'ব এর জাদুকরী পরিবার 🪄',
                  funFact: 'জানতে চাও? "ব" বর্ণটি লিখে কিন্তু আমরা আরও অনেকগুলো বর্ণ খুব সহজেই তৈরি করতে পারি!',
                  targets: [
                    {
                      id: 'ক',
                      name: 'ক',
                      instruction: 'ব-এর ডানপাশে একটি বাঁকা হাত বা ডানা যোগ করলে ক তৈরি হয়!',
                      extraPath: 'M 150,85 C 195,75 195,140 150,140',
                      speechRule: 'ব এর ডান পাশে একটি সুর উড়িয়ে দিলে তৈরি হয় ক!',
                      hintText: 'ডানপাশের বাঁকা হাতটি যোগ করো'
                    },
                    {
                      id: 'র',
                      name: 'র',
                      instruction: 'ব-এর নিচে একটি গোল টুসকি বা জাদুকরী বিন্দু দিলে র তৈরি হয়!',
                      isDot: true,
                      dotX: 100,
                      dotY: 175,
                      speechRule: 'ব এর নিচে একটি গোল ফুটকি বা বিন্দু দিলে তৈরি হয় র!',
                      hintText: 'নিচের গোল বিন্দুটি দাও'
                    },
                    {
                      id: 'ধ',
                      name: 'ধ',
                      instruction: 'ব-এর বামপাশে দুটি ঢেউ খেলানো বাঁক ও উপরে অর্ধ-মাত্রা দিলে ধ তৈরি হয়!',
                      extraPath: 'M 50,140 C 25,135 20,105 100,95 C 45,85 50,55 150,50',
                      speechRule: 'ব এর বামপাশে দুটি ঢেউ খেলানো বাঁক দিলে তৈরি হয় ধ!',
                      hintText: 'বামপাশের ঢেউগুলো যোগ করো'
                    },
                    {
                      id: 'ঋ',
                      name: 'ঋ',
                      instruction: 'ব-এর বামপাশে দুটি গোল কুন্ডলী এবং ডানপাশে ছোট উড়ানি দিলে ঋ তৈরি হয়!',
                      extraPath: 'M 50,140 C 25,135 20,105 100,95 C 45,85 50,55 150,50 M 150,50 C 165,30 145,15 135,30',
                      speechRule: 'ব এর বামপাশে দুটি গোল কুন্ডলী এবং ডানপাশে ছোট উড়ানি দিলে তৈরি হয় ঋ!',
                      hintText: 'বামপাশের কুণ্ডলী ও ডানপাশের উড়ানি আঁকো'
                    }
                  ],
                  basePaths: [
                    'M 30,50 L 170,50', // matra
                    'M 150,50 L 50,140', // left angled diagonal
                    'M 50,140 L 150,140 L 150,50' // bottom & right vertical
                  ]
                },
                'ত': {
                  name: 'ত',
                  color: 'from-purple-500 via-fuchsia-500 to-pink-600',
                  title: 'ত এর জাদুকরী পরিবার 🪄',
                  funFact: '"ত" এর বাঁকা গোল শরীরটি দিয়ে কিন্তু সুন্দর সুন্দর বর্ণ আঁকা যায়!',
                  targets: [
                    {
                      id: 'অ',
                      name: 'অ',
                      instruction: 'ত-এর নিচ থেকে ডানদিকে রেখা টেনে ডানে একটি খাড়া দাগ দিলেই অ তৈরি হয়!',
                      extraPath: 'M 100,160 C 100,190 135,190 145,115 M 145,50 L 145,165',
                      speechRule: 'ত এর নিচ থেকে ডানে দাগ টেনে একটি খাড়া দাগ দিলে তৈরি হয় অ!',
                      hintText: 'ডানপাশের সংযোগকারী রেখা ও খাড়া দাগ আঁকো'
                    },
                    {
                      id: 'আ',
                      name: 'আ',
                      instruction: 'অ লিখে ডানে একটি আকার (া) যোগ করলে আ তৈরি হয়!',
                      extraPath: 'M 100,160 C 100,190 135,190 145,115 M 145,50 L 145,165 M 145,50 L 175,50 M 175,50 L 175,165',
                      speechRule: 'অ লিখে ডানপাশে একটি আকার দিলে তৈরি হয় আ!',
                      hintText: 'ডানপাশের সংযোগকারী রেখা ও আকার আঁকো'
                    }
                  ],
                  basePaths: [
                    'M 40,50 L 160,50',
                    'M 140,50 C 140,25 90,25 90,55 C 90,100 150,105 150,145 C 150,170 120,180 100,160'
                  ]
                },
                'চ': {
                  name: 'চ',
                  color: 'from-amber-500 via-orange-500 to-red-600',
                  title: 'চ এর জাদুকরী পরিবার 🪄',
                  funFact: 'সোজা আর বাঁকা দাগের চমৎকার মিলনে "চ" থেকে খুব সহজে আরেকটি বর্ণ তৈরি হয়!',
                  targets: [
                    {
                      id: 'ছ',
                      name: 'ছ',
                      instruction: 'চ-এর নিচে একটি ছোট লেজ বা ঝুলন্ত কুণ্ডলী যোগ করলে ছ তৈরি হয়!',
                      extraPath: 'M 100,152 C 90,180 120,195 140,165 C 150,150 165,180 165,195',
                      speechRule: 'চ এর নিচে একটি ঝুলন্ত লেজ যোগ করলে তৈরি হয় ছ!',
                      hintText: 'নিচের ঝুলন্ত লেজটি আঁকো'
                    }
                  ],
                  basePaths: [
                    'M 30,50 L 170,50', // matra
                    'M 130,50 L 70,110 C 50,140 100,165 140,140 L 140,50' // body of চ
                  ]
                },
                'ড': {
                  name: 'ড',
                  color: 'from-teal-500 via-emerald-500 to-green-600',
                  title: 'ড এর জাদুকরী পরিবার 🪄',
                  funFact: '"ড" এর ঢেউ খেলানো শরীরটি ব্যবহার করে অন্য বর্ণগুলো সহজে চিনে নাও!',
                  targets: [
                    {
                      id: 'ড়',
                      name: 'ড়',
                      instruction: 'ড-এর নিচে একটি গোল জাদুকরী বিন্দু দিলেই হয়ে যায় ড়!',
                      isDot: true,
                      dotX: 105,
                      dotY: 192,
                      speechRule: 'ড এর নিচে একটি গোল ফুটকি বা বিন্দু দিলে তৈরি হয় র শূন্য র!',
                      hintText: 'নিচের গোল বিন্দুটি দাও'
                    },
                    {
                      id: 'উ',
                      name: 'উ',
                      instruction: 'ড-এর মাথায় একটি চমৎকার বাঁকা উড়ানি দিলে উ তৈরি হয়!',
                      extraPath: 'M 100,45 C 100,15 135,25 150,12',
                      speechRule: 'ড এর মাথায় একটি বাঁকা উড়ানি দিলে তৈরি হয় উ!',
                      hintText: 'মাথার উড়ানিটি আঁকো'
                    },
                    {
                      id: 'ঊ',
                      name: 'ঊ',
                      instruction: 'ড-এর ডানপাশে একটি বাঁকা ঝুলন্ত অংশ আর উপরে উড়ানি দিলে ঊ তৈরি হয়!',
                      extraPath: 'M 140,150 C 170,150 170,100 145,95 M 100,45 C 100,15 135,25 150,12',
                      speechRule: 'ড এর ডানপাশে ঝুলন্ত পিঠ ও মাথায় একটি উড়ানি দিলে তৈরি হয় ঊ!',
                      hintText: 'ডানপাশের বাঁক ও উপরের উড়ানি আঁকো'
                    }
                  ],
                  basePaths: [
                    'M 40,50 L 160,50',
                    'M 100,50 C 100,80 70,90 70,115 C 70,150 140,140 140,170 C 140,185 110,195 90,175'
                  ]
                },
                'এ': {
                  name: 'এ',
                  color: 'from-pink-500 via-rose-500 to-red-600',
                  title: 'এ এর জাদুকরী পরিবার 🪄',
                  funFact: '"এ" এর মাথায় একটি রঙিন ঝুঁটি বা ডানা বাড়িয়ে দিলেই নতুন বর্ণ পেয়ে যাবে!',
                  targets: [
                    {
                      id: 'ঐ',
                      name: 'ঐ',
                      instruction: 'এ-এর মাথায় একটি বাঁকা উড়ন্ত ঝুঁটি বা উড়ানি দিলে ঐ তৈরি হয়!',
                      extraPath: 'M 115,75 C 115,40 145,50 165,35',
                      speechRule: 'এ এর মাথায় একটি উড়ানি বা ঝুঁটি দিলে তৈরি হয় ঐ!',
                      hintText: 'মাথার উড়ানি বা ঝুঁটিটি আঁকো'
                    }
                  ],
                  basePaths: [
                    'M 80,80 C 65,70 55,90 70,110 C 85,130 130,165 150,165 L 125,90 C 120,80 110,80 95,80'
                  ]
                },
                'ঢ': {
                  name: 'ঢ',
                  color: 'from-cyan-500 via-sky-500 to-blue-600',
                  title: 'ঢ এর জাদুকরী পরিবার 🪄',
                  funFact: 'ঢাক বাজানোর সুন্দর "ঢ" এর নিচে একটি ছোট্ট গোল টিপ দিলেই চমৎকার রূপবদল হয়!',
                  targets: [
                    {
                      id: 'ঢ়',
                      name: 'ঢ়',
                      instruction: 'ঢ-এর নিচে একটি গোল জাদুকরী বিন্দু যোগ করলে ঢ় তৈরি হয়!',
                      isDot: true,
                      dotX: 110,
                      dotY: 175,
                      speechRule: 'ঢ এর নিচে একটি গোল ফুটকি বা বিন্দু দিলে তৈরি হয় ঢ শূন্য র!',
                      hintText: 'নিচের গোল বিন্দুটি দাও'
                    }
                  ],
                  basePaths: [
                    'M 35,50 L 165,50',
                    'M 110,50 L 75,110 C 60,140 100,165 135,145 C 155,125 155,95 125,95 L 90,95'
                  ]
                },
                'য': {
                  name: 'য',
                  color: 'from-violet-500 via-purple-500 to-fuchsia-600',
                  title: 'য এর জাদুকরী পরিবার 🪄',
                  funFact: '"য" এর পেটে টান দিয়ে বা নিচে বিন্দু বসিয়ে তৈরি করো চমৎকার সব নতুন বর্ণ!',
                  targets: [
                    {
                      id: 'য়',
                      name: 'য়',
                      instruction: 'য-এর নিচে একটি গোল জাদুকরী বিন্দু দিলেই হয়ে যায় অন্তস্থ-অ (য়)!',
                      isDot: true,
                      dotX: 110,
                      dotY: 172,
                      speechRule: 'য এর নিচে একটি গোল ফুটকি বা বিন্দু দিলে তৈরি হয় অন্তস্থ অ!',
                      hintText: 'নিচের গোল বিন্দুটি দাও'
                    },
                    {
                      id: 'ষ',
                      name: 'ষ',
                      instruction: 'য-এর পেট কেটে মাঝখান দিয়ে একটি বাঁকা রেখা টানলে মূর্ধন্য-ষ (ষ) তৈরি হয়!',
                      extraPath: 'M 80,95 L 145,130',
                      speechRule: 'য এর পেট কেটে মাঝখানে একটি সোজা টান দিলে তৈরি হয় পেটকাটা মূর্ধন্য ষ!',
                      hintText: 'পেটের মাঝের রেখাটি আঁকো'
                    }
                  ],
                  basePaths: [
                    'M 35,50 L 165,50', // matra
                    'M 70,50 C 50,70 50,95 70,105 C 50,115 50,145 75,145 L 145,145 L 145,50' // body of য
                  ]
                }
              };

              const currentBaseData = DERIVATION_DATA[selectedDerivationBase];
              // Ensure we have a valid target
              const currentTargetData = currentBaseData.targets.find(t => t.id === selectedDerivationTarget) || currentBaseData.targets[0];

              const handleBaseChange = (base: string) => {
                setSelectedDerivationBase(base);
                const nextTarget = DERIVATION_DATA[base].targets[0];
                setSelectedDerivationTarget(nextTarget.id);
                setIsDerivationSuccess(false);
                setIsTracingGuideCompleted(false);
                setDerivationAnimTrigger(p => p + 1);
                speak(DERIVATION_DATA[base].title);
              };

              const handleTargetChange = (targetId: string) => {
                setSelectedDerivationTarget(targetId);
                setIsDerivationSuccess(false);
                setIsTracingGuideCompleted(false);
                setDerivationAnimTrigger(p => p + 1);
                const targetObj = currentBaseData.targets.find(t => t.id === targetId);
                if (targetObj) {
                  speak(targetObj.speechRule);
                }
              };

              const triggerSuccessMagic = () => {
                setIsDerivationSuccess(true);
                setIsTracingGuideCompleted(true);
                setShowConfetti(true);
                setConfettiKey(p => p + 1);
                speak("অসাধারণ বন্ধু! তুমি জাদুকরী বর্ণটি তৈরি করে ফেলেছো!");
                setTimeout(() => {
                  setShowConfetti(false);
                }, 3000);
              };

              return (
                <div className="space-y-8">
                  {/* Inline CSS styling block for magical sequential writing animation of strokes */}
                  <style dangerouslySetInnerHTML={{ __html: (() => {
                    const numBaseStrokes = currentBaseData.basePaths.length;
                    const totalDuration = 5.0; // seconds for the complete synchronized loop
                    let dynamicCss = '';

                    // The total timeline budget for base strokes is 72%
                    const baseTotalBudget = 72;
                    const baseDuration = baseTotalBudget / numBaseStrokes;

                    // Generate keyframes and classes for each base stroke
                    for (let i = 0; i < numBaseStrokes; i++) {
                      const startPercent = Math.round(i * baseDuration);
                      const endPercent = Math.round((i + 1) * baseDuration);
                      dynamicCss += `
                        @keyframes drawBaseStroke_${i}_${derivationAnimTrigger} {
                          0% { stroke-dashoffset: 600; }
                          ${startPercent}% { stroke-dashoffset: 600; }
                          ${endPercent}% { stroke-dashoffset: 0; }
                          100% { stroke-dashoffset: 0; }
                        }
                        .anim-base-stroke-${i} {
                          stroke-dasharray: 600;
                          stroke-dashoffset: 600;
                          animation: drawBaseStroke_${i}_${derivationAnimTrigger} ${totalDuration}s ease-in-out infinite;
                        }
                      `;
                    }

                    // Generate keyframes and classes for target derivation stroke / dot
                    if (currentTargetData.isDot) {
                      dynamicCss += `
                        @keyframes drawExtraDot_${derivationAnimTrigger} {
                          0% { transform: scale(0); opacity: 0; }
                          72% { transform: scale(0); opacity: 0; }
                          73% { transform: scale(0); opacity: 1; }
                          82% { transform: scale(1.4); opacity: 1; }
                          88% { transform: scale(1); opacity: 1; }
                          100% { transform: scale(1); opacity: 1; }
                        }
                        .anim-derivation-dot {
                          transform-origin: ${currentTargetData.dotX}px ${currentTargetData.dotY}px;
                          animation: drawExtraDot_${derivationAnimTrigger} ${totalDuration}s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
                        }
                      `;
                    } else if (currentTargetData.extraPath) {
                      dynamicCss += `
                        @keyframes drawDerivationStroke_${derivationAnimTrigger} {
                          0% { stroke-dashoffset: 600; }
                          72% { stroke-dashoffset: 600; }
                          90% { stroke-dashoffset: 0; }
                          100% { stroke-dashoffset: 0; }
                        }
                        .anim-derivation-stroke {
                          stroke-dasharray: 600;
                          stroke-dashoffset: 600;
                          animation: drawDerivationStroke_${derivationAnimTrigger} ${totalDuration}s ease-in-out infinite;
                        }
                      `;
                    }
                    return dynamicCss;
                  })() }} />

                  {/* Top Welcome Card */}
                  <div className="text-center bg-gradient-to-r from-[#1a1c29] via-[#112233] to-[#122c3a] border-4 border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                    {/* Cute cartoon decorations */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />
                    
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 mb-4 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      মজার বর্ণ গবেষণাগার 🧪✨
                    </span>
                    
                    <h2 className="text-2xl sm:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-md">
                      একটি বর্ণ দিয়ে আরেকটি বর্ণ তৈরি করি! 🪄
                    </h2>
                    
                    <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                      ছোট্ট বন্ধুরা! তোমরা কি জানো, বাংলা বর্ণমালায় এমন কিছু যাদুর বর্ণ আছে যা দিয়ে খুব সহজে নতুন নতুন অন্য সব বর্ণ তৈরি করা যায়? চলো সেই জাদুকরী কৌশলগুলো শিখে নিই! 
                    </p>
                  </div>

                  {/* 1. Base Letter Selector Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {Object.keys(DERIVATION_DATA).map((baseKey) => {
                      const item = DERIVATION_DATA[baseKey];
                      const isSelected = selectedDerivationBase === baseKey;
                      return (
                        <motion.button
                          key={baseKey}
                          whileHover={{ scale: 1.05, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBaseChange(baseKey)}
                          className={`relative text-left p-5 sm:p-6 rounded-3xl cursor-pointer transition-all border-4 flex items-center justify-between overflow-hidden shadow-xl ${
                            isSelected 
                              ? `bg-gradient-to-br ${item.color} border-yellow-400 text-white shadow-yellow-950/20` 
                              : 'bg-[#161b22] border-[#30363d] text-slate-300 hover:bg-[#21262d] hover:border-slate-700'
                          }`}
                        >
                          <div className="space-y-2 relative z-10">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-yellow-300 block">
                              মূল বর্ণ (Base Letter)
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black">{item.name} এর পরিবার 🔮</h3>
                            <p className="text-xs opacity-90 font-medium line-clamp-2">
                              {item.funFact}
                            </p>
                          </div>
                          
                          {/* Large background letter representation */}
                          <div className={`text-6xl sm:text-7xl font-black opacity-30 select-none ${isSelected ? 'text-white scale-110' : 'text-slate-700'}`}>
                            {item.name}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* 2. Interactive Workspace Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* SVG CANVAS CONTAINER */}
                    <div className="lg:col-span-5 bg-slate-950 border-8 border-yellow-400 rounded-3xl p-6 relative shadow-2xl overflow-hidden text-center">
                      <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        LAB VIEW: {selectedDerivationBase} ➔ {selectedDerivationTarget}
                      </div>
                      
                      {/* Interactive visual formula header */}
                      <div className="flex items-center justify-center gap-3 mb-6 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800 inline-flex">
                        <span className="text-3xl font-black text-sky-400">{selectedDerivationBase}</span>
                        <span className="text-xl font-bold text-slate-400">+</span>
                        <span className="text-2xl text-yellow-400 animate-bounce">🪄</span>
                        <span className="text-xl font-bold text-slate-400">=</span>
                        <motion.span 
                          key={selectedDerivationTarget}
                          initial={{ scale: 0.5, rotate: -20 }}
                          animate={{ scale: 1.1, rotate: 0 }}
                          className="text-3xl font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                        >
                          {selectedDerivationTarget}
                        </motion.span>
                      </div>

                      {/* Main Blackboard Canvas */}
                      <div className="w-full aspect-square max-w-[280px] sm:max-w-[320px] mx-auto bg-[#1e293b] rounded-2xl border-4 border-slate-700 p-4 relative shadow-inner">
                        {/* Interactive floating particles or success confetti */}
                        {isDerivationSuccess && (
                          <div className="absolute inset-0 bg-emerald-500/10 rounded-xl flex items-center justify-center z-10 backdrop-blur-[1px] pointer-events-none animate-pulse">
                            <div className="text-center p-4 bg-slate-900/90 border-2 border-emerald-500 rounded-2xl shadow-2xl scale-105 transform">
                              <span className="text-3xl">🥳🏆🎉</span>
                              <p className="text-emerald-400 font-black text-sm sm:text-base mt-1">জাদুকরী বর্ণ তৈরি সফল!</p>
                              <p className="text-xs text-slate-300 font-bold">দারুণ করেছ ছোট্ট বন্ধু!</p>
                            </div>
                          </div>
                        )}

                        <svg className="w-full h-full" viewBox="0 0 200 200">
                          {/* Background Slate Grid Pattern */}
                          <defs>
                            <pattern id="magicGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2e3e56" strokeWidth="0.8" />
                            </pattern>
                          </defs>
                          
                          <rect width="100%" height="100%" fill="url(#magicGrid)" rx="16" />

                          {/* Base Letter Path shown in friendly thick dark violet lines */}
                          <g stroke="#3b4d66" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6">
                            {currentBaseData.basePaths.map((p, idx) => {
                              let pathD = p;
                              if (selectedDerivationBase === 'ব' && (selectedDerivationTarget === 'ধ' || selectedDerivationTarget === 'ঋ') && idx === 0) {
                                pathD = 'M 140,50 L 155,50'; // Perfect half-matra on top of the vertical bar
                              }
                              return <path key={idx} d={pathD} />;
                            })}
                          </g>

                          {/* Interactive Base Letter Path highlighted in sky blue (or success green) */}
                          <g stroke={isTracingGuideCompleted ? "#10b981" : "#0ea5e9"} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
                            {currentBaseData.basePaths.map((p, idx) => {
                              let pathD = p;
                              if (selectedDerivationBase === 'ব' && (selectedDerivationTarget === 'ধ' || selectedDerivationTarget === 'ঋ') && idx === 0) {
                                pathD = 'M 140,50 L 155,50'; // Perfect half-matra on top of the vertical bar
                              }
                              return (
                                <path 
                                  key={idx} 
                                  d={pathD} 
                                  className={isTracingGuideCompleted ? "" : `anim-base-stroke-${idx}`}
                                />
                              );
                            })}
                          </g>

                          {/* The magical transformation path (The extra stroke added) */}
                          {currentTargetData.isDot ? (
                            // Draw dot transformation
                            <g>
                              {/* Highlight zone or dashed tracing circle */}
                              {!isTracingGuideCompleted && (
                                <circle 
                                  cx={currentTargetData.dotX} 
                                  cy={currentTargetData.dotY} 
                                  r="24" 
                                  fill="rgba(251,191,36,0.15)" 
                                  stroke="#fbbf24" 
                                  strokeWidth="2" 
                                  strokeDasharray="4,4"
                                />
                              )}
                              
                              <circle 
                                cx={currentTargetData.dotX} 
                                cy={currentTargetData.dotY} 
                                r="12" 
                                fill={isTracingGuideCompleted ? "#fbbf24" : "rgba(251,191,36,0.35)"} 
                                stroke="#fbbf24" 
                                strokeWidth="4" 
                                className={isTracingGuideCompleted ? "" : "anim-derivation-dot cursor-pointer hover:scale-125 transition-transform"}
                                onClick={() => {
                                  if (!isTracingGuideCompleted) {
                                    triggerSuccessMagic();
                                  }
                                }}
                              />
                            </g>
                          ) : (
                            // Draw path transformation
                            currentTargetData.extraPath && (
                              <g>
                                {/* Highlight interactive background tracing guide */}
                                {!isTracingGuideCompleted && (
                                  <path 
                                    d={currentTargetData.extraPath} 
                                    stroke="rgba(251,191,36,0.25)" 
                                    strokeWidth="24" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    fill="none"
                                    className="cursor-pointer"
                                    onClick={() => triggerSuccessMagic()}
                                    title="এখানে স্পর্শ করো!"
                                  />
                                )}
                                
                                {/* Golden shining transforming stroke */}
                                <path 
                                  d={currentTargetData.extraPath} 
                                  stroke="#fbbf24" 
                                  strokeWidth={isTracingGuideCompleted ? "14" : "12"} 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  fill="none" 
                                  className={isTracingGuideCompleted ? "" : "anim-derivation-stroke cursor-pointer"}
                                  onClick={() => {
                                    if (!isTracingGuideCompleted) {
                                      triggerSuccessMagic();
                                    }
                                  }}
                                />
                              </g>
                            )
                          )}
                        </svg>

                        {/* Interactive Hand/Wand Indicator guiding the kids */}
                        {!isTracingGuideCompleted && (
                          <motion.div 
                            animate={{ 
                              x: currentTargetData.isDot ? [0, 5, -5, 0] : [0, 20, -10, 0], 
                              y: currentTargetData.isDot ? [0, -5, 5, 0] : [0, 15, -5, 0] 
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute pointer-events-none text-3xl"
                            style={{ 
                              left: currentTargetData.isDot ? `${(currentTargetData.dotX! / 200) * 80}%` : '75%', 
                              top: currentTargetData.isDot ? `${(currentTargetData.dotY! / 200) * 80}%` : '55%' 
                            }}
                          >
                            👉🪄
                          </motion.div>
                        )}
                      </div>

                      {/* Guide Text inside Blackboard */}
                      <div className="mt-4 bg-slate-900/60 rounded-2xl p-3 border border-slate-800">
                        <p className="text-yellow-300 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5">
                          <Icon name="Hand" className="w-4 h-4 text-amber-400" />
                          <span>আঙুল বা মাউস দিয়ে হলুদাভ অংশে ট্যাপ করো!</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          জাদুকরী বাঁক বা বিন্দুটি যুক্ত করলেই বর্ণটি রূপ বদলে ফেলবে!
                        </p>
                      </div>

                      {/* Playback Audio Controls for Slate */}
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setDerivationAnimTrigger(p => p + 1);
                            setIsDerivationSuccess(false);
                            setIsTracingGuideCompleted(false);
                            speak(currentTargetData.speechRule);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-xs shadow-lg cursor-pointer border-2 border-yellow-300"
                        >
                          <Icon name="RefreshCw" className="w-3.5 h-3.5" />
                          <span>আবার দেখাও 🔄</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => speak(currentTargetData.speechRule)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#161b22] border-2 border-[#30363d] text-slate-300 font-extrabold text-xs shadow cursor-pointer hover:bg-[#21262d] transition-colors"
                        >
                          <Icon name="Volume2" className="w-3.5 h-3.5 text-teal-400" />
                          <span>উচ্চারণ ও জাদুকরী নিয়ম 🔊</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* CONTROL PANEL & DESCRIPTION PLAYBOOK */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Sub-targets transformation selectors */}
                      <div className="bg-[#161b22] border-4 border-[#30363d] rounded-3xl p-5 sm:p-6 shadow-xl">
                        <h3 className="text-lg sm:text-xl font-black mb-4 text-[#c9d1d9] flex items-center gap-2">
                          <span className="text-xl">🪄</span> 
                          কোন বর্ণে রূপান্তর করবে? (Select Target Letter):
                        </h3>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {currentBaseData.targets.map((tgt) => {
                            const isTgtSelected = selectedDerivationTarget === tgt.id;
                            return (
                              <motion.button
                                key={tgt.id}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleTargetChange(tgt.id)}
                                className={`relative py-3.5 px-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-2 ${
                                  isTgtSelected 
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-yellow-300 text-[#0d1117] font-black shadow-xl ring-2 ring-yellow-400' 
                                    : 'bg-[#1c212c] border-[#30363d] text-slate-300 hover:bg-[#252c3a] hover:border-slate-700'
                                }`}
                              >
                                <span className="text-xs font-bold opacity-85 uppercase tracking-widest block mb-1">
                                  {selectedDerivationBase} ➔ {tgt.name}
                                </span>
                                <span className="text-4xl font-black mb-1 drop-shadow-md text-amber-300">
                                  {tgt.name}
                                </span>
                                <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded-full block text-slate-200">
                                  জাদুকরী বর্ণ
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Cute Mascot Explanation Playbook */}
                      <motion.div 
                        key={selectedDerivationTarget}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-4 border-teal-500/30 rounded-3xl p-6 shadow-xl relative"
                      >
                        {/* Decorative Mascot */}
                        <div className="absolute -top-6 -right-6 text-5xl animate-bounce">🐥</div>
                        
                        <h3 className="text-lg sm:text-2xl font-black text-teal-300 mb-3 flex items-center gap-2">
                          <Icon name="Sparkles" className="w-5 h-5 text-yellow-300 animate-spin" />
                          <span>জাদুকর টিটুর পাঠশালা:</span>
                        </h3>
                        
                        <div className="space-y-4 text-slate-300 font-medium text-sm sm:text-base leading-relaxed">
                          <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 flex items-start gap-3">
                            <span className="text-2xl mt-0.5">💡</span>
                            <div>
                              <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-0.5">জাদুকরী নিয়ম (Magic Rule)</p>
                              <p className="text-[#f0f6fc] font-bold text-base">
                                {currentTargetData.instruction}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-[#161b22]/70 rounded-2xl border border-[#30363d]/40 flex items-start gap-2.5">
                              <span className="text-xl">🎨</span>
                              <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-0.5">ধাপ ১ (Step 1)</p>
                                <p className="text-xs sm:text-sm text-slate-300 font-bold">
                                  প্রথমে সুন্দর করে একটি মূল বর্ণ <strong className="text-sky-400">"{selectedDerivationBase}"</strong> এঁকে নাও।
                                </p>
                              </div>
                            </div>

                            <div className="p-4 bg-[#161b22]/70 rounded-2xl border border-[#30363d]/40 flex items-start gap-2.5">
                              <span className="text-xl">🪄</span>
                              <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-0.5">ধাপ ২ (Step 2)</p>
                                <p className="text-xs sm:text-sm text-slate-300 font-bold">
                                  এবার জাদুর কাঠিটি দিয়ে <strong className="text-yellow-400">"{currentTargetData.hintText}"</strong>!
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Interactive Success Reward Box */}
                          <AnimatePresence>
                            {isDerivationSuccess && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-emerald-950/40 border-2 border-emerald-500/30 rounded-2xl p-4 text-center space-y-2 mt-4 shadow-lg shadow-emerald-950/20"
                              >
                                <span className="text-4xl animate-bounce inline-block">🌟🏆🌟</span>
                                <h4 className="text-emerald-400 font-black text-base sm:text-lg">দারুণ! তুমি জাদুকর হয়ে গেছো!</h4>
                                <p className="text-xs sm:text-sm text-slate-200">
                                  তুমি সফলভাবে <strong className="text-sky-400">"{selectedDerivationBase}"</strong> বর্ণটিকে রূপান্তর করে জাদুকরী নতুন বর্ণ <strong className="text-emerald-300">"{selectedDerivationTarget}"</strong> বানিয়ে ফেলেছো!
                                </p>
                                <div className="pt-2">
                                  <button 
                                    onClick={() => {
                                      setIsDerivationSuccess(false);
                                      setIsTracingGuideCompleted(false);
                                      setDerivationAnimTrigger(p => p + 1);
                                      speak("চলো আবার অনুশীলন করি!");
                                    }}
                                    className="px-4 py-1.5 bg-emerald-600 text-white font-black text-xs rounded-full border border-emerald-400 shadow cursor-pointer hover:bg-emerald-700 transition-colors"
                                  >
                                    আবার চেষ্টা করো 🔄
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>

                      {/* Informative educational benefits section */}
                      <div className="bg-[#161b22]/60 rounded-3xl p-5 border border-slate-800/80">
                        <h4 className="text-xs sm:text-sm font-black text-slate-400 uppercase tracking-widest mb-3">
                          💡 বর্ণ চেনার সহজ কৌশল কেন গুরুত্বপূর্ণ? (Why learn this?):
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-medium">
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>ভিজ্যুয়াল মেমোরি বৃদ্ধি করে:</strong> শিশুরা যখন দেখে একই মূল রূপ থেকে অন্য বর্ণ তৈরি হচ্ছে, তাদের মনে রাখা সহজ হয়।</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>হস্তলিপির সঠিক প্রবাহ:</strong> স্ট্রোক বা আঁকার সঠিক দিক জানতে সাহায্য করে যা তাদের সুন্দর করে লিখতে শেখায়।</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>ভীতি দূরীকরণ:</strong> অনেকগুলো আলাদা বর্ণ মনে রাখার কঠিন কাজটিকে একটি জাদুকরী খেলা হিসেবে উপস্থাপন করে।</span>
                          </li>
                        </ul>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ==================== MODE 4: KAR WORDS (LEARNING) ==================== */}
        {activeMode === 'karWords' && !isQuizMode && (
          <div className="max-w-6xl mx-auto">
            {/* Kar Selection */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 px-2">
              {KAR_WORDS_DATA.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedKar(item);
                    speak(`ক + ${item.kar || 'কোনো কার নেই'} = ক${item.kar}, ${item.name} এর শব্দ`);
                    incrementDailyChallengeProgress('kar_view');
                  }}
                  className={`px-4 sm:px-6 py-3 rounded-2xl shadow-lg transition-all border text-center min-w-[70px] sm:min-w-[90px] ${
                    selectedKar?.id === item.id 
                      ? `bg-gradient-to-br ${item.color} text-white border-transparent scale-105 ring-2 ring-offset-2 ring-offset-[#0d1117] ring-teal-500` 
                      : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#21262d]'
                  }`}
                >
                  <span className="flex flex-col items-center gap-0.5">
                    <span className="text-2xl sm:text-3xl font-black">
                      ক{item.kar}
                    </span>
                    <span className="text-[10px] sm:text-xs opacity-75 font-semibold">
                      ক + {item.kar || 'ø'}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Word Display */}
            <AnimatePresence mode="wait">
              {selectedKar ? (
                <motion.div
                  key={selectedKar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative"
                >
                  {/* Header Card */}
                  <motion.div
                    className={`bg-gradient-to-br ${selectedKar.color} rounded-3xl p-6 sm:p-10 text-white text-center mb-8 sm:mb-12 shadow-2xl relative overflow-hidden`}
                  >
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                      <h2 className="text-3xl sm:text-5xl font-black mb-4">{selectedKar.name} শব্দ</h2>
                      <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl">
                        <span className="text-3xl sm:text-5xl font-black">ক</span>
                        <span className="text-3xl sm:text-5xl font-black text-yellow-300">+</span>
                        <span className="text-3xl sm:text-5xl font-black text-yellow-300">{selectedKar.kar || '(কোনো চিহ্ন নেই)'}</span>
                        <span className="text-3xl sm:text-5xl font-black text-yellow-300">=</span>
                        <span className="text-4xl sm:text-6xl font-black text-emerald-300">ক{selectedKar.kar}</span>
                      </div>
                      <p className="mt-4 text-white/90 font-medium text-sm sm:text-base">এই কার চিহ্ন দিয়ে তৈরি ছবি সহ শব্দ</p>
                    </div>
                  </motion.div>

                  {/* Two-Column Layout for Spotlight & Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                    {/* Left: Active Word Detail Spotlight Card (5 cols) */}
                    <div className="md:col-span-5 bg-[#161b22] border border-[#30363d] rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-rose-500"></div>
                      
                      {activeKarWord ? (
                        <div className="w-full">
                          {/* Large Image Frame */}
                          <div className="relative w-full h-64 sm:h-80 bg-[#0d1117]/80 rounded-2xl p-4 flex items-center justify-center overflow-hidden border border-[#30363d]/60 mb-6 group">
                            {activeKarWord.img ? (
                              <img
                                src={activeKarWord.img}
                                alt={activeKarWord.word}
                                className="max-w-full max-h-full object-contain transition-all duration-700 group-hover:scale-105 drop-shadow-2xl"
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
                              src={getEmojiImage(activeKarWord.emoji, 256)}
                              alt={activeKarWord.word}
                              className={`w-32 h-32 sm:w-40 sm:h-40 object-contain ${activeKarWord.img ? 'hidden' : 'block'}`}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.currentTarget;
                                const parent = target.parentElement;
                                if (parent) {
                                  const fallback = document.createElement('div');
                                  fallback.className = "text-7xl sm:text-8xl select-none animate-pulse";
                                  fallback.textContent = activeKarWord.emoji;
                                  parent.appendChild(fallback);
                                  target.style.display = 'none';
                                }
                              }}
                            />
                            
                            {/* Floating Emoji Tag */}
                            <div className="absolute bottom-4 right-4 bg-[#161b22]/90 backdrop-blur-md border border-[#30363d] rounded-2xl px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                              <span className="text-2xl">{activeKarWord.emoji}</span>
                              <span className="text-xs text-[#8b949e] font-semibold">প্রতীক</span>
                            </div>
                          </div>

                          {/* Word Label and Audio Trigger */}
                          <h3 className="text-4xl sm:text-5xl font-black text-[#f0f6fc] mb-3 flex items-center justify-center gap-3">
                            <span>{activeKarWord.word}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => speak(activeKarWord.word)}
                              className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 p-2.5 rounded-full border border-teal-500/20 transition-all shadow"
                            >
                              <Icon name="Volume2" className="w-6 h-6" />
                            </motion.button>
                          </h3>

                          {/* Visual Syllable Breakdown */}
                          <div className="bg-[#0d1117]/85 rounded-2xl p-4 border border-[#30363d]/60 text-left">
                            <div className="text-xs text-[#8b949e] font-bold uppercase tracking-wider mb-2">শব্দ গঠন বিশ্লেষণ:</div>
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2">
                                <span className="bg-teal-500/10 border border-teal-500/20 text-teal-400 px-3 py-1 rounded-lg text-sm font-semibold">
                                  ক{selectedKar.kar}
                                </span>
                                <span className="text-[#8b949e] text-xs">দিয়ে তৈরি শব্দ</span>
                              </div>
                              <div className="w-full h-px bg-[#30363d]/40 my-1"></div>
                              <span className="text-[#f0f6fc] text-sm leading-relaxed">
                                এই শব্দে <strong className="text-rose-400 font-black">"{selectedKar.kar}" ({selectedKar.name})</strong> ব্যবহার করা হয়েছে।
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-12">
                          <Icon name="Image" className="w-16 h-16 text-[#30363d] mx-auto mb-4 animate-pulse" />
                          <p className="text-[#8b949e]">শব্দের ছবি দেখতে ডানপাশের তালিকা থেকে নির্বাচন করুন</p>
                        </div>
                      )}
                    </div>

                    {/* Right: Word Grid of 6 words (7 cols) */}
                    <div className="md:col-span-7 flex flex-col gap-4">
                      <div className="flex items-center justify-between px-1">
                        <h4 className="text-lg font-bold text-[#8b949e]">৬টি কার-চিহ্ন সংশিষ্ট শব্দ:</h4>
                        <span className="text-xs bg-teal-500/10 text-teal-400 px-2.5 py-1 rounded-full font-bold">শব্দসংখ্যা: ৬</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {selectedKar.words.map((w, idx) => {
                          const isSelected = activeKarWord?.word === w.word;
                          return (
                            <motion.button
                              key={idx}
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setActiveKarWord(w);
                                handleKarWordClick(w.word);
                              }}
                              className={`border rounded-2xl p-3 sm:p-4 text-left transition-all flex items-center gap-3 relative group overflow-hidden ${
                                isSelected 
                                  ? `bg-[#1f2937]/80 border-teal-500 ring-2 ring-teal-500/30 shadow-lg shadow-teal-950/20` 
                                  : 'bg-[#161b22] border-[#30363d] hover:bg-[#1f242c] hover:border-[#8b949e]/30'
                              }`}
                            >
                              {/* Small Thumbnail Frame */}
                              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#0d1117] flex-shrink-0 flex items-center justify-center overflow-hidden border border-[#30363d]/60">
                                {w.img ? (
                                  <img
                                    src={w.img}
                                    alt={w.word}
                                    className="w-full h-full object-contain"
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
                                  src={getEmojiImage(w.emoji, 64)}
                                  alt={w.word}
                                  className={`w-8 h-8 object-contain ${w.img ? 'hidden' : 'block'}`}
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    const parent = target.parentElement;
                                    if (parent) {
                                      const fallback = document.createElement('div');
                                      fallback.className = "text-xl select-none";
                                      fallback.textContent = w.emoji;
                                      parent.appendChild(fallback);
                                      target.style.display = 'none';
                                    }
                                  }}
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <span className={`text-lg sm:text-xl font-black block truncate ${isSelected ? 'text-teal-400' : 'text-[#f0f6fc]'}`}>
                                  {w.word}
                                </span>
                                <span className="text-xs text-[#8b949e] font-medium block truncate">ক{selectedKar.kar} দিয়ে শব্দ</span>
                              </div>

                              {/* Selected Tick Indicator */}
                              {isSelected && (
                                <div className="absolute right-3 top-3 w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
                                  <Icon name="Check" className="w-2.5 h-2.5 text-white stroke-[4]" />
                                </div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 sm:py-20 bg-rose-950/15 border border-rose-800/10 rounded-3xl max-w-2xl mx-auto px-4 shadow-xl"
                >
                  <div className="w-20 h-20 sm:w-28 sm:h-28 bg-rose-950/40 border border-rose-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="PenTool" className="w-10 h-10 sm:w-14 sm:h-14 text-rose-400" />
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black text-[#f0f6fc] mb-2">একটি কার চিহ্ন বেছে নিন</h3>
                  <p className="text-[#8b949e] text-sm sm:text-base">উপরের বাটনগুলো থেকে যেকোনো একটি কার সিলেক্ট করুন</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== MODE 5: KAR TEN WORDS (10 EASY WORDS) ==================== */}
        {activeMode === 'karTenWords' && !isQuizMode && (
          <div className="max-w-6xl mx-auto">
            {/* Kar Selection Grid */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 px-2">
              {BENGALI_KAR_TEN_WORDS_DATA.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setSelectedKarTen(item); speak(`${item.name} দিয়ে শব্দ`); incrementDailyChallengeProgress('kar_view'); }}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl shadow-lg transition-all border ${
                    selectedKarTen?.id === item.id 
                      ? `bg-gradient-to-br ${item.color} text-white border-transparent scale-105 ring-2 ring-offset-2 ring-offset-[#0d1117] ring-pink-500` 
                      : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#21262d]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl text-[#f0f6fc]">{item.name.split(' ')[0]}</span>
                    <span className="text-pink-400 font-black">{item.kar}</span>
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Word Display with Animation */}
            <AnimatePresence mode="wait">
              {selectedKarTen ? (
                <motion.div
                  key={selectedKarTen.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative"
                >
                  {/* Header Card with Gradient */}
                  <motion.div
                    className={`bg-gradient-to-br ${selectedKarTen.color} rounded-3xl p-6 sm:p-10 text-white text-center mb-8 sm:mb-12 shadow-2xl relative overflow-hidden`}
                  >
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                      <h2 className="text-3xl sm:text-5xl font-black mb-4">{selectedKarTen.name} দিয়ে ১০টি সহজ শব্দ</h2>
                      <p className="mt-2 text-white/90 font-bold text-lg">প্রতিটি শব্দের উচ্চারণ শুনতে শব্দটিতে অথবা স্পিকার বাটনে ক্লিক করুন</p>
                    </div>
                  </motion.div>

                  {/* Words Grid - 10 Words in a beautiful layout */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                    {selectedKarTen.words.map((w, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => speak(w.word)}
                        className="bg-[#161b22] border border-[#30363d] rounded-2xl shadow-xl transition-all hover:border-[#8b949e]/30 overflow-hidden flex flex-col group relative"
                      >
                        {/* Word index badge */}
                        <div className="absolute top-2 left-2 bg-[#0d1117]/80 backdrop-blur-sm text-pink-400 font-bold text-xs px-2 py-0.5 rounded-full border border-[#30363d]/55 z-10">
                          {idx + 1}
                        </div>

                        <div className="relative h-32 sm:h-44 bg-[#0d1117]/55 p-4 flex items-center justify-center overflow-hidden border-b border-[#30363d]">
                          {/* Twitter Emoji Rendering */}
                          <img
                            src={getEmojiImage(w.emoji, 128)}
                            alt={w.word}
                            className="w-16 h-16 sm:w-24 sm:h-24 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className = "text-5xl sm:text-6xl select-none animate-pulse";
                                fallback.textContent = w.emoji;
                                parent.appendChild(fallback);
                                target.style.display = 'none';
                              }
                            }}
                          />

                          {/* Sound Speaker Overlay */}
                          <div className="absolute top-2 right-2 bg-pink-600/90 hover:bg-pink-500 text-white p-1.5 sm:p-2 rounded-full shadow-lg transition-colors border border-pink-400/20">
                            <Icon name="Volume2" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                        </div>

                        {/* Word Box */}
                        <div className="p-3 sm:p-5 bg-gradient-to-t from-[#10141b] to-[#161b22] flex-1 flex flex-col justify-center">
                          <h3 className="text-xl sm:text-3xl font-black text-[#f0f6fc] text-center leading-tight group-hover:text-pink-400 transition-colors">
                            {w.word}
                          </h3>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 sm:py-20 bg-pink-950/15 border border-pink-800/10 rounded-3xl max-w-2xl mx-auto px-4 shadow-xl"
                >
                  <div className="w-20 h-20 sm:w-28 sm:h-28 bg-pink-950/40 border border-pink-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="Sparkles" className="w-10 h-10 sm:w-14 sm:h-14 text-pink-400" />
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black text-[#f0f6fc] mb-2">একটি কার চিহ্ন বেছে নিন</h3>
                  <p className="text-[#8b949e] text-sm sm:text-base">১০টি করে সহজ শব্দ দেখতে উপরের বাটনগুলো থেকে যেকোনো একটি কার সিলেক্ট করুন</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== BENGALI REARRANGE WORDS ==================== */}
        {activeMode === 'rearrange' && !isQuizMode && (
          <div className="max-w-6xl mx-auto px-4 pb-12">
            <WordRearrange speak={speak} playWhooshSound={playWhooshSound} />
          </div>
        )}

        {/* ==================== WORD MATCHING GAME ==================== */}
        {activeMode === 'wordMatching' && !isQuizMode && (
          <div className="max-w-6xl mx-auto px-4 pb-12">
            <WordMatchingGame speak={speak} playWhooshSound={playWhooshSound} />
          </div>
        )}

        {/* ==================== MODE: JOINT LETTERS (যুক্তাক্ষর) ==================== */}
        {activeMode === 'jointLetters' && !isQuizMode && (() => {
          const currentPageData = JOINT_LETTERS_PAGES[jointPage - 1] || JOINT_LETTERS_PAGES[0];
          
          const filterRows = (rows: any[]) => {
            if (!jointSearch.trim()) return rows;
            const term = jointSearch.toLowerCase().trim();
            return rows.filter(row => 
              row.letter.includes(term) || 
              row.breakdown.includes(term) || 
              row.words.some((w: string) => w.includes(term))
            );
          };

          const filteredLeft = filterRows(currentPageData.leftTable);
          const filteredRight = filterRows(currentPageData.rightTable);

          const readRow = (row: any) => {
            const firstChar = row.breakdown.split('+')[0]?.trim()?.replace('্', '') || '';
            const secondChar = row.breakdown.split('+')[1]?.trim()?.replace('্', '') || '';
            const breakdownVoice = `${firstChar} আর ${secondChar} যুক্ত হয়ে তৈরি হয় ${row.letter}।`;
            const wordsVoice = `যেমন: ${row.words.join(', ')}।`;
            speak(`${breakdownVoice} ${wordsVoice}`);
          };

          const runAutoplay = async (tableKey: 'left' | 'right') => {
            if (jointAutoplayCell) {
              setJointAutoplayCell(null);
              return;
            }
            speak("যুক্তবর্ণের উচ্চারণ ও শব্দ গঠন ক্রমান্বয়ে শোনো");
            await new Promise(r => setTimeout(r, 2200));

            const targetTable = tableKey === 'left' ? filteredLeft : filteredRight;
            for (let i = 0; i < targetTable.length; i++) {
              if (activeMode !== 'jointLetters') break;
              setJointAutoplayCell({ table: tableKey, rowIndex: i });
              const row = targetTable[i];
              readRow(row);
              await new Promise(r => setTimeout(r, 3800));
            }
            setJointAutoplayCell(null);
          };

          return (
            <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-black/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center">
                  <span className="bg-white/20 text-xs font-black uppercase px-4 py-1.5 rounded-full border border-white/30 backdrop-blur-md inline-block mb-3">
                    সহজ বাংলা ব্যাকরণ 📖
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black mb-3 text-shadow-md">যুক্তবর্ণ বা যুক্তাক্ষর চার্ট 🎨</h2>
                  <div className="max-w-3xl mx-auto bg-black/20 p-4 sm:p-5 rounded-2xl border border-white/15 mt-5 backdrop-blur-sm">
                    <p className="text-sm sm:text-base leading-relaxed font-bold">
                      <span className="text-yellow-300 font-black">যুক্তবর্ণ বা যুক্তাক্ষর কী?</span> দুই বা ততোধিক ব্যঞ্জনবর্ণ একসাথে যুক্ত হয়ে যে সংযুক্ত বর্ণ গঠন করে, তাকে যুক্তবর্ণ বা যুক্তাক্ষর বলে। নিচে চমৎকার রঙিন চার্ট থেকে সবগুলো যুক্তবর্ণ শিখে নাও!
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#11161d] border border-[#30363d] p-4 rounded-3xl shadow-lg flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm font-black text-[#8b949e] flex items-center gap-2 shrink-0">
                    <Icon name="BookOpen" className="w-5 h-5 text-fuchsia-400" />
                    পাতা উল্টাও:
                  </span>
                  <div className="flex bg-[#161b22] p-1 rounded-2xl border border-[#30363d] w-full justify-end">
                    <button
                      onClick={() => {
                        setJointPage(1);
                        setJointAutoplayCell(null);
                        speak("যুক্তবর্ণ প্রথম পাতা");
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        jointPage === 1
                          ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white shadow-lg'
                          : 'text-[#8b949e] hover:text-[#f0f6fc]'
                      }`}
                    >
                      📖 পৃষ্ঠা ১ (ক-হৃ)
                    </button>
                    <button
                      onClick={() => {
                        setJointPage(2);
                        setJointAutoplayCell(null);
                        speak("যুক্তবর্ণ দ্বিতীয় পাতা");
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        jointPage === 2
                          ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white shadow-lg'
                          : 'text-[#8b949e] hover:text-[#f0f6fc]'
                      }`}
                    >
                      📖 পৃষ্ঠা ২ (ক্য-ল্প)
                    </button>
                  </div>
                </div>

                <div className="bg-[#11161d] border border-[#30363d] p-4 rounded-3xl shadow-lg flex items-center gap-3 relative">
                  <Icon name="Search" className="w-5 h-5 text-[#8b949e]" />
                  <input
                    type="text"
                    placeholder="যুক্তবর্ণ বা শব্দ দিয়ে খুঁজুন (যেমন: ক্ক, পক্ক)..."
                    value={jointSearch}
                    onChange={(e) => setJointSearch(e.target.value)}
                    className="w-full bg-[#161b22] border border-[#30363d] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#f0f6fc] placeholder-[#8b949e] focus:outline-none focus:border-fuchsia-500 transition-all font-black"
                  />
                  {jointSearch && (
                    <button
                      onClick={() => setJointSearch('')}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-white"
                    >
                      <Icon name="X" className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="bg-[#11161d] border border-[#30363d] p-4 rounded-3xl shadow-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-black text-[#f0f6fc] flex items-center gap-1.5">
                      <Icon name="Volume2" className="w-4.5 h-4.5 text-purple-400" />
                      ইন্টারেক্টিভ লার্নিং
                    </span>
                    <span className="text-[10px] text-[#8b949e]">শব্দের ওপর ক্লিক করে উচ্চারণ শোনো</span>
                  </div>
                  <button
                    onClick={() => {
                      speak("যুক্তবর্ণের সকল নিয়ম ও শব্দ চমৎকারভাবে শিখতে যেকোনো ঘরে ক্লিক করো!");
                    }}
                    className="px-4 py-2 bg-purple-950/40 border border-purple-500/30 text-purple-400 rounded-xl text-xs font-black hover:bg-purple-900/40 cursor-pointer"
                  >
                    💡 গাইডলাইন
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#0d1117] border border-[#30363d] rounded-[2rem] shadow-2xl p-4 sm:p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#21262d]">
                    <h3 className="text-lg sm:text-xl font-black text-fuchsia-400 flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-500/30">
                        📚
                      </span>
                      সারণী ক (বাম পার্শ্ব)
                    </h3>
                    
                    <button
                      onClick={() => runAutoplay('left')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border font-black text-xs transition-all cursor-pointer ${
                        jointAutoplayCell?.table === 'left'
                          ? 'bg-emerald-600 border-transparent text-white animate-pulse'
                          : 'bg-[#161b22] border-[#30363d] text-emerald-400 hover:bg-[#21262d]'
                      }`}
                    >
                      <Icon name={jointAutoplayCell?.table === 'left' ? "Square" : "Play"} className="w-3.5 h-3.5" />
                      <span>{jointAutoplayCell?.table === 'left' ? "থামাও" : "অটো-প্লে"}</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-[#21262d] bg-[#11161d]/40">
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="bg-[#161b22] border-b border-[#30363d]">
                          <th className="p-3 text-xs sm:text-sm font-black text-[#f0f6fc] min-w-[90px]">যুক্তবর্ণ</th>
                          <th className="p-3 text-xs sm:text-sm font-black text-[#f0f6fc] min-w-[110px]">বিভাজন</th>
                          <th className="p-3 text-xs sm:text-sm font-black text-[#f0f6fc] text-left">শব্দ গঠন</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeft.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="py-8 text-[#8b949e] font-semibold text-center text-xs">
                              কোনো যুক্তবর্ণ পাওয়া যায়নি
                            </td>
                          </tr>
                        ) : (
                          filteredLeft.map((row, idx) => {
                            const isCellPlaying = jointAutoplayCell?.table === 'left' && jointAutoplayCell?.rowIndex === idx;
                            return (
                              <tr
                                key={idx}
                                className={`border-b border-[#21262d]/50 transition-all ${
                                  isCellPlaying 
                                    ? 'bg-fuchsia-950/20 shadow-inner' 
                                    : idx % 2 === 0 ? 'bg-[#0d1117]/10' : 'bg-[#11161d]/10'
                                } hover:bg-[#1f242c]/55`}
                              >
                                <td className="p-3">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => readRow(row)}
                                    className={`w-full py-2.5 rounded-xl font-sans text-xl sm:text-2xl font-black shadow-md border cursor-pointer ${
                                      isCellPlaying
                                        ? 'bg-fuchsia-600 border-transparent text-white shadow-fuchsia-600/30 animate-pulse'
                                        : 'bg-[#1c212b] border-[#30363d] text-fuchsia-400 hover:bg-fuchsia-600 hover:text-white'
                                    }`}
                                  >
                                    {row.letter}
                                  </motion.button>
                                </td>

                                <td className="p-3">
                                  <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-sm font-extrabold text-[#c9d1d9]">
                                    {row.breakdown.split('+').map((char: string, cIdx: number) => (
                                      <span key={cIdx} className={char.trim() === '+' ? 'text-rose-400' : 'text-[#f0f6fc]'}>
                                        {char.trim()}
                                      </span>
                                    ))}
                                  </div>
                                </td>

                                <td className="p-3 text-left">
                                  <div className="flex flex-wrap gap-2">
                                    {row.words.map((word: string, wIdx: number) => (
                                      <motion.button
                                        key={wIdx}
                                        whileHover={{ scale: 1.05, y: -1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => speak(word)}
                                        className="px-3 py-1.5 bg-[#1f242c] hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white border border-[#30363d] rounded-xl text-xs sm:text-sm font-black text-[#c9d1d9] shadow-sm cursor-pointer transition-all flex items-center gap-1"
                                      >
                                        <span>📢</span>
                                        <span>{word}</span>
                                      </motion.button>
                                    ))}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#0d1117] border border-[#30363d] rounded-[2rem] shadow-2xl p-4 sm:p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#21262d]">
                    <h3 className="text-lg sm:text-xl font-black text-purple-400 flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-purple-950/50 border border-purple-500/30">
                        📖
                      </span>
                      সারণী খ (ডান পার্শ্ব)
                    </h3>
                    
                    <button
                      onClick={() => runAutoplay('right')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border font-black text-xs transition-all cursor-pointer ${
                        jointAutoplayCell?.table === 'right'
                          ? 'bg-emerald-600 border-transparent text-white animate-pulse'
                          : 'bg-[#161b22] border-[#30363d] text-emerald-400 hover:bg-[#21262d]'
                      }`}
                    >
                      <Icon name={jointAutoplayCell?.table === 'right' ? "Square" : "Play"} className="w-3.5 h-3.5" />
                      <span>{jointAutoplayCell?.table === 'right' ? "থামাও" : "অটো-প্লে"}</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-[#21262d] bg-[#11161d]/40">
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="bg-[#161b22] border-b border-[#30363d]">
                          <th className="p-3 text-xs sm:text-sm font-black text-[#f0f6fc] min-w-[90px]">যুক্তবর্ণ</th>
                          <th className="p-3 text-xs sm:text-sm font-black text-[#f0f6fc] min-w-[110px]">বিভাজন</th>
                          <th className="p-3 text-xs sm:text-sm font-black text-[#f0f6fc] text-left">শব্দ গঠন</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRight.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="py-8 text-[#8b949e] font-semibold text-center text-xs">
                              কোনো যুক্তবর্ণ পাওয়া যায়নি
                            </td>
                          </tr>
                        ) : (
                          filteredRight.map((row, idx) => {
                            const isCellPlaying = jointAutoplayCell?.table === 'right' && jointAutoplayCell?.rowIndex === idx;
                            return (
                              <tr
                                key={idx}
                                className={`border-b border-[#21262d]/50 transition-all ${
                                  isCellPlaying 
                                    ? 'bg-purple-950/20 shadow-inner' 
                                    : idx % 2 === 0 ? 'bg-[#0d1117]/10' : 'bg-[#11161d]/10'
                                } hover:bg-[#1f242c]/55`}
                              >
                                <td className="p-3">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => readRow(row)}
                                    className={`w-full py-2.5 rounded-xl font-sans text-xl sm:text-2xl font-black shadow-md border cursor-pointer ${
                                      isCellPlaying
                                        ? 'bg-purple-600 border-transparent text-white shadow-purple-600/30 animate-pulse'
                                        : 'bg-[#1c212b] border-[#30363d] text-purple-400 hover:bg-purple-600 hover:text-white'
                                    }`}
                                  >
                                    {row.letter}
                                  </motion.button>
                                </td>

                                <td className="p-3">
                                  <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-sm font-extrabold text-[#c9d1d9]">
                                    {row.breakdown.split('+').map((char: string, cIdx: number) => (
                                      <span key={cIdx} className={char.trim() === '+' ? 'text-[#ff7b72]' : 'text-[#f0f6fc]'}>
                                        {char.trim()}
                                      </span>
                                    ))}
                                  </div>
                                </td>

                                <td className="p-3 text-left">
                                  <div className="flex flex-wrap gap-2">
                                    {row.words.map((word: string, wIdx: number) => (
                                      <motion.button
                                        key={wIdx}
                                        whileHover={{ scale: 1.05, y: -1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => speak(word)}
                                        className="px-3 py-1.5 bg-[#1f242c] hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white border border-[#30363d] rounded-xl text-xs sm:text-sm font-black text-[#c9d1d9] shadow-sm cursor-pointer transition-all flex items-center gap-1"
                                      >
                                        <span>📢</span>
                                        <span>{word}</span>
                                      </motion.button>
                                    ))}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-12 p-6 bg-gradient-to-br from-[#11161d] to-[#161b22] border border-[#30363d] rounded-[2rem] shadow-xl text-center"
              >
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-500/20">
                  <Icon name="Sparkles" className="w-6 h-6 animate-spin-slow" />
                </div>
                <h4 className="text-base sm:text-lg font-black text-[#f0f6fc] mb-1">পরীক্ষার প্রস্তুতি ও মজার শিক্ষা 🏆</h4>
                <p className="text-xs sm:text-sm text-[#8b949e] max-w-xl mx-auto leading-relaxed">
                  পরীক্ষায় যুক্তবর্ণ ভেঙে শব্দ লিখতে সাহায্য করতে এই চার্টটি বইয়ের হুবহু আদলে কিন্তু পুরোপুরি রঙিন করে সাজানো হয়েছে। প্রতিদিন যেকোনো ৫টি করে মুখস্থ করো!
                </p>
              </motion.div>
            </div>
          );
        })()}

        {/* ==================== MODE 5.5: KAR CONJUNCT WORDS (10 CONJUNCT WORDS) ==================== */}
        {activeMode === 'karConjunctWords' && !isQuizMode && (
          <div className="max-w-6xl mx-auto">
            {/* Kar Selection Grid */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 px-2">
              {BENGALI_KAR_CONJUNCT_WORDS_DATA.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setSelectedKarConjunct(item); speak(`${item.name} দিয়ে যুক্তবর্ণের শব্দ`); incrementDailyChallengeProgress('kar_view'); }}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl shadow-lg transition-all border ${
                    selectedKarConjunct?.id === item.id 
                      ? `bg-gradient-to-br ${item.color} text-white border-transparent scale-105 ring-2 ring-offset-2 ring-offset-[#0d1117] ring-amber-500` 
                      : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#21262d]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl text-[#f0f6fc]">{item.name.split(' ')[0]}</span>
                    <span className="text-amber-400 font-black">{item.kar}</span>
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Word Display with Animation */}
            <AnimatePresence mode="wait">
              {selectedKarConjunct ? (
                <motion.div
                  key={selectedKarConjunct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative"
                >
                  {/* Header Card with Gradient */}
                  <motion.div
                    className={`bg-gradient-to-br ${selectedKarConjunct.color} rounded-3xl p-6 sm:p-10 text-white text-center mb-8 sm:mb-12 shadow-2xl relative overflow-hidden`}
                  >
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                      <h2 className="text-3xl sm:text-5xl font-black mb-4">{selectedKarConjunct.name} যুক্তবর্ণের ১০টি শব্দ</h2>
                      <p className="mt-2 text-white/90 font-bold text-lg">প্রতিটি যুক্তবর্ণযুক্ত শব্দের সঠিক উচ্চারণ শুনতে ক্লিক করুন</p>
                    </div>
                  </motion.div>

                  {/* Words Grid - 10 Words in a beautiful layout */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                    {selectedKarConjunct.words.map((w, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => speak(w.word)}
                        className="bg-[#161b22] border border-[#30363d] rounded-2xl shadow-xl transition-all hover:border-[#8b949e]/30 overflow-hidden flex flex-col group relative"
                      >
                        {/* Word index badge */}
                        <div className="absolute top-2 left-2 bg-[#0d1117]/80 backdrop-blur-sm text-amber-400 font-bold text-xs px-2 py-0.5 rounded-full border border-[#30363d]/55 z-10">
                          {idx + 1}
                        </div>

                        <div className="relative h-32 sm:h-44 bg-[#0d1117]/55 p-4 flex items-center justify-center overflow-hidden border-b border-[#30363d]">
                          {/* Twitter Emoji Rendering */}
                          <img
                            src={getEmojiImage(w.emoji, 128)}
                            alt={w.word}
                            className="w-16 h-16 sm:w-24 sm:h-24 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className = "text-5xl sm:text-6xl select-none animate-pulse";
                                fallback.textContent = w.emoji;
                                parent.appendChild(fallback);
                                target.style.display = 'none';
                              }
                            }}
                          />

                          {/* Sound Speaker Overlay */}
                          <div className="absolute top-2 right-2 bg-amber-600/90 hover:bg-amber-500 text-white p-1.5 sm:p-2 rounded-full shadow-lg transition-colors border border-amber-400/20">
                            <Icon name="Volume2" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                        </div>

                        {/* Word Box */}
                        <div className="p-3 sm:p-5 bg-gradient-to-t from-[#10141b] to-[#161b22] flex-1 flex flex-col justify-center">
                          <h3 className="text-xl sm:text-3xl font-black text-[#f0f6fc] text-center leading-tight group-hover:text-amber-400 transition-colors">
                            {w.word}
                          </h3>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 sm:py-20 bg-amber-950/15 border border-amber-800/10 rounded-3xl max-w-2xl mx-auto px-4 shadow-xl"
                >
                  <div className="w-20 h-20 sm:w-28 sm:h-28 bg-amber-950/40 border border-amber-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="Wand2" className="w-10 h-10 sm:w-14 sm:h-14 text-amber-400" />
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black text-[#f0f6fc] mb-2">একটি কার চিহ্ন বেছে নিন</h3>
                  <p className="text-[#8b949e] text-sm sm:text-base">১০টি করে যুক্তবর্ণযুক্ত শব্দ দেখতে উপরের বাটনগুলো থেকে যেকোনো একটি কার সিলেক্ট করুন</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== MODE 5.7: CONJUNCT USAGE (44 CONJUNCTS) ==================== */}
        {activeMode === 'conjunctUsage' && !isQuizMode && (
          <div className="max-w-7xl mx-auto px-4">
            {/* Intro Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 rounded-3xl p-6 sm:p-10 text-white text-center mb-8 sm:mb-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-5xl font-black mb-3">যুক্তবর্ণের ব্যবহার ও শব্দ</h2>
                <p className="mt-2 text-white/90 font-bold text-base sm:text-lg">
                  বাংলা ভাষার ৪৪টি গুরুত্বপূর্ণ যুক্তবর্ণের গঠন বিশ্লেষণ ও ব্যবহার শিখে নিই!
                </p>
                <p className="mt-1 text-violet-200 text-xs sm:text-sm font-semibold">
                  উচ্চারণ শুনতে শব্দের বাটনটিতে ক্লিক করো।
                </p>
              </div>
            </motion.div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8 sm:mb-12 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="যুক্তবর্ণ বা শব্দ দিয়ে খুঁজুন (যেমন: ক্ত, রক্ত)..."
                  value={conjunctSearch}
                  onChange={(e) => setConjunctSearch(e.target.value)}
                  className="w-full bg-[#161b22] border border-[#30363d] focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-2xl py-3 px-12 text-[#f0f6fc] placeholder-[#8b949e] font-bold text-sm sm:text-base transition-all shadow-lg"
                />
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#8b949e]">
                  <Icon name="Search" className="w-5 h-5" />
                </div>
                {conjunctSearch && (
                  <button
                    onClick={() => setConjunctSearch('')}
                    className="absolute inset-y-0 right-4 flex items-center text-[#8b949e] hover:text-[#f0f6fc]"
                  >
                    <Icon name="X" className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Grid of Conjunct Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {BENGALI_CONJUNCTS_USAGE_DATA.filter(item => {
                if (!conjunctSearch) return true;
                const search = conjunctSearch.trim();
                return (
                  item.conjunct.includes(search) ||
                  item.breakdown.includes(search) ||
                  item.words.some(w => w.includes(search))
                );
              }).map((item, idx) => {
                // Select colorful background and border combinations dynamically
                const borderColors = [
                  'hover:border-rose-500/40 border-rose-500/20 text-rose-400 shadow-rose-950/20',
                  'hover:border-pink-500/40 border-pink-500/20 text-pink-400 shadow-pink-950/20',
                  'hover:border-purple-500/40 border-purple-500/20 text-purple-400 shadow-purple-950/20',
                  'hover:border-indigo-500/40 border-indigo-500/20 text-indigo-400 shadow-indigo-950/20',
                  'hover:border-blue-500/40 border-blue-500/20 text-blue-400 shadow-blue-950/20',
                  'hover:border-cyan-500/40 border-cyan-500/20 text-cyan-400 shadow-cyan-950/20',
                  'hover:border-teal-500/40 border-teal-500/20 text-teal-400 shadow-teal-950/20',
                  'hover:border-emerald-500/40 border-emerald-500/20 text-emerald-400 shadow-emerald-950/20',
                  'hover:border-green-500/40 border-green-500/20 text-green-400 shadow-green-950/20',
                  'hover:border-yellow-500/40 border-yellow-500/20 text-yellow-400 shadow-yellow-950/20',
                  'hover:border-amber-500/40 border-amber-500/20 text-amber-400 shadow-amber-950/20',
                  'hover:border-orange-500/40 border-orange-500/20 text-orange-400 shadow-orange-950/20'
                ];
                const colorClass = borderColors[idx % borderColors.length];

                const headerGradients = [
                  'from-rose-500/10 to-rose-600/5',
                  'from-pink-500/10 to-pink-600/5',
                  'from-purple-500/10 to-purple-600/5',
                  'from-indigo-500/10 to-indigo-600/5',
                  'from-blue-500/10 to-blue-600/5',
                  'from-cyan-500/10 to-cyan-600/5',
                  'from-teal-500/10 to-teal-600/5',
                  'from-emerald-500/10 to-emerald-600/5',
                  'from-green-500/10 to-green-600/5',
                  'from-yellow-500/10 to-yellow-600/5',
                  'from-amber-500/10 to-amber-600/5',
                  'from-orange-500/10 to-orange-600/5'
                ];
                const headerGradient = headerGradients[idx % headerGradients.length];

                const speakerColors = [
                  'bg-rose-600 hover:bg-rose-500',
                  'bg-pink-600 hover:bg-pink-500',
                  'bg-purple-600 hover:bg-purple-500',
                  'bg-indigo-600 hover:bg-indigo-500',
                  'bg-blue-600 hover:bg-blue-500',
                  'bg-cyan-600 hover:bg-cyan-500',
                  'bg-teal-600 hover:bg-teal-500',
                  'bg-emerald-600 hover:bg-emerald-500',
                  'bg-green-600 hover:bg-green-500',
                  'bg-yellow-600 hover:bg-yellow-500',
                  'bg-amber-600 hover:bg-amber-500',
                  'bg-orange-600 hover:bg-orange-500'
                ];
                const speakerColor = speakerColors[idx % speakerColors.length];

                return (
                  <motion.div
                    key={item.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: Math.min(idx * 0.015, 0.4) }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className={`bg-[#161b22] border rounded-3xl overflow-hidden flex flex-col shadow-xl transition-all ${colorClass}`}
                  >
                    {/* Card Header with giant letters and split */}
                    <div className={`p-5 border-b border-[#30363d]/60 bg-gradient-to-br ${headerGradient} flex flex-col items-center justify-center relative`}>
                      <div className="absolute top-2 right-3 text-xs font-black opacity-30">
                        #{idx + 1}
                      </div>
                      {/* Giant Conjunct letter with nice glowing shadow */}
                      <h3 className="text-4xl sm:text-5xl font-black mb-1 drop-shadow-md tracking-wide">
                        {item.conjunct}
                      </h3>
                      {/* Breakdown e.g. "ক্ + ত" */}
                      <span className="text-xs sm:text-sm font-bold text-[#8b949e]">
                        {item.breakdown}
                      </span>
                    </div>

                    {/* Card Body - Words list */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3 justify-center bg-[#0d1117]/40">
                      {item.words.map((word, wIdx) => (
                        <motion.button
                          key={wIdx}
                          whileHover={{ scale: 1.03, x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => speak(word)}
                          className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-[#f0f6fc] group transition-all"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#8b949e]">{wIdx + 1}.</span>
                            <span className="font-extrabold text-base sm:text-lg group-hover:text-white transition-colors">{word}</span>
                          </span>
                          <span className={`p-1.5 rounded-lg text-white shadow-md ${speakerColor} transition-colors`}>
                            <Icon name="Volume2" className="w-3.5 h-3.5" />
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* No results message */}
            {BENGALI_CONJUNCTS_USAGE_DATA.filter(item => {
              if (!conjunctSearch) return true;
              const search = conjunctSearch.trim();
              return (
                item.conjunct.includes(search) ||
                item.breakdown.includes(search) ||
                item.words.some(w => w.includes(search))
              );
            }).length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-[#161b22] border border-[#30363d] rounded-3xl max-w-lg mx-auto mt-10 px-6 shadow-xl"
              >
                <div className="w-16 h-16 bg-red-950/30 border border-red-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" className="w-8 h-8 text-red-400" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-[#f0f6fc] mb-1">কোনো মিল খুঁজে পাওয়া যায়নি</h4>
                <p className="text-[#8b949e] text-xs sm:text-sm">অন্য কোনো যুক্তবর্ণ বা শব্দ লিখে আবার চেষ্টা করুন।</p>
              </motion.div>
            )}
          </div>
        )}

        {/* ==================== MODE 5.75: CONSONANT WITH KAR SIGNS ==================== */}
        {activeMode === 'consonantKar' && !isQuizMode && (
          <div className="max-w-7xl mx-auto px-4">
            {/* Intro Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-br from-teal-600 via-cyan-600 to-emerald-600 rounded-3xl p-6 sm:p-10 text-white text-center mb-8 sm:mb-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-5xl font-black mb-3">ব্যঞ্জনবর্ণ ও কার চিহ্নের মিলন</h2>
                <p className="mt-2 text-white/90 font-bold text-base sm:text-lg">
                  যেকোনো ব্যঞ্জনবর্ণ সিলেক্ট করে দেখুন সেটি কীভাবে প্রতিটি কার চিহ্নের সাথে চমৎকারভাবে জুড়ে যায়!
                </p>
                <p className="mt-1 text-teal-200 text-xs sm:text-sm font-semibold">
                  কার চিহ্নগুলো নিচে ফিক্সড আছে। ব্যঞ্জনবর্ণটি অ্যানিমেটেড হয়ে কার চিহ্নের সাথে বসে যাবে।
                </p>
              </div>
            </motion.div>

            {/* Consonants Selection Grid */}
            <div className="bg-[#11161d] border border-[#21262d] rounded-3xl p-6 mb-8 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-[#f0f6fc] mb-4 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-teal-400"></span>
                👉 ব্যঞ্জনবর্ণ নির্বাচন করুন:
              </h3>
              <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 lg:grid-cols-12 gap-2 sm:gap-3">
                {CONSONANTS_LIST.map((consonant) => {
                  const isSelected = selectedConsonant === consonant;
                  return (
                    <motion.button
                      key={consonant}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedConsonant(consonant);
                        setIsPlayingAll(false);
                        setPlayingIndex(null);
                        speak(consonant);
                      }}
                      className={`h-12 sm:h-14 flex items-center justify-center rounded-2xl text-lg sm:text-xl font-extrabold transition-all border ${
                        isSelected
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white border-transparent shadow-lg shadow-teal-500/20'
                          : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc] hover:bg-[#21262d] hover:border-[#8b949e]/30'
                      }`}
                    >
                      {consonant}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Control Bar & Auto Play */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#161b22] border border-[#30363d] px-6 py-4 rounded-3xl shadow-md">
              <div className="flex items-center gap-3">
                <span className="text-[#8b949e] font-bold text-sm sm:text-base">নির্বাচিত ব্যঞ্জনবর্ণ:</span>
                {selectedConsonant ? (
                  <motion.span
                    key={selectedConsonant}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-4 py-1.5 rounded-full bg-teal-500/20 text-teal-400 font-extrabold text-lg border border-teal-500/30"
                  >
                    {selectedConsonant}
                  </motion.span>
                ) : (
                  <span className="text-amber-500 font-semibold text-sm animate-pulse">ব্যঞ্জনবর্ণ সিলেক্ট করুন</span>
                )}
              </div>

              {selectedConsonant && (
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (isPlayingAll) {
                        setIsPlayingAll(false);
                        setPlayingIndex(null);
                      } else {
                        setIsPlayingAll(true);
                        setPlayingIndex(0);
                      }
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm border transition-all ${
                      isPlayingAll
                        ? 'bg-red-600 border-transparent text-white shadow-lg shadow-red-950/40 animate-pulse'
                        : 'bg-emerald-600 border-transparent text-white shadow-lg shadow-emerald-950/40'
                    }`}
                  >
                    <Icon name={isPlayingAll ? 'Square' : 'Play'} className="w-4 h-4" />
                    <span>{isPlayingAll ? 'অটো-প্লে বন্ধ করুন' : 'সবগুলো একসাথে শুনুন'}</span>
                  </motion.button>
                </div>
              )}
            </div>

            {/* 10 Fixed Kar Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
              {KAR_VOWELS_MAPPING.map((item, idx) => {
                const combinedSyllable = selectedConsonant ? selectedConsonant + item.kar : '';
                const isCurrentlyPlaying = isPlayingAll && playingIndex === idx;

                return (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`relative rounded-3xl p-6 bg-[#161b22] border-2 transition-all flex flex-col justify-between items-center shadow-xl overflow-hidden ${
                      isCurrentlyPlaying
                        ? 'border-emerald-500 ring-4 ring-emerald-500/20 shadow-emerald-500/20 scale-[1.03]'
                        : 'border-[#30363d] hover:border-[#8b949e]/30'
                    }`}
                  >
                    {/* Background Soft Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${item.color} opacity-40`}></div>

                    {/* Top Header Badge */}
                    <div className="w-full flex items-center justify-between mb-2 relative z-10">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${item.badgeBg}`}>
                        স্বরাংশ: {item.vowel}
                      </span>
                      <span className="text-[10px] font-bold text-[#8b949e]">
                        ধাপ: {toBengaliNumber(idx + 1)}
                      </span>
                    </div>

                    {/* Large Fixed Kar Indicator */}
                    <div className="w-full text-center mt-2 mb-1 relative z-10">
                      <span className="text-[9px] font-bold text-[#8b949e]/60 block uppercase tracking-wider mb-0.5">স্থির কার চিহ্ন</span>
                      <div className="inline-flex items-center justify-center bg-[#11161d] text-[#f0f6fc] text-lg font-extrabold px-3 py-1 rounded-xl border border-[#30363d]/60 shadow-sm">
                        <span className="text-amber-400 mr-1.5 text-xs font-black">{item.vowel}</span>
                        <span className="text-teal-400 font-black font-serif">({item.kar})</span>
                      </div>
                    </div>

                    {/* Central Interactive Animation Stage */}
                    <div 
                      className="h-32 flex items-center justify-center relative w-full my-3 z-10 cursor-pointer"
                      onClick={() => {
                        if (combinedSyllable && !isPlayingAll) {
                          speak(combinedSyllable);
                        }
                      }}
                      title="উচ্চারণ শুনতে ক্লিক করুন"
                    >
                      <div className="flex items-center justify-center relative">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={selectedConsonant}
                            initial={{ scale: 0.3, opacity: 0, y: -20, rotate: -15 }}
                            animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
                            exit={{ scale: 0.5, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            className="text-6xl sm:text-7xl font-black select-none tracking-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] text-center"
                          >
                            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                              {combinedSyllable}
                            </span>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Vowel Sign Name Label */}
                    <div className="text-center mb-5 relative z-10">
                      <h4 className={`text-sm sm:text-base font-black ${item.textCol}`}>
                        {item.name}
                      </h4>
                      <p className="text-[#8b949e] text-[10px] mt-0.5 font-bold">
                        উচ্চারণ: {combinedSyllable}
                      </p>
                    </div>

                    {/* Action Bar for Playback */}
                    <div className="w-full flex gap-2 pt-2 border-t border-[#30363d]/50 relative z-10">
                      <button
                        disabled={!selectedConsonant || isPlayingAll}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (combinedSyllable) {
                            speak(`${selectedConsonant} এ ${item.name} ${combinedSyllable}`);
                          }
                        }}
                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black transition-all border ${
                          selectedConsonant && !isPlayingAll
                            ? 'bg-[#21262d] text-[#f0f6fc] border-[#30363d] hover:bg-[#30363d] active:scale-95'
                            : 'bg-[#161b22]/50 text-[#8b949e]/40 border-transparent cursor-not-allowed'
                        }`}
                      >
                        <Icon name="Volume2" className="w-3.5 h-3.5 text-teal-400" />
                        <span>বানান</span>
                      </button>

                      <button
                        disabled={!selectedConsonant || isPlayingAll}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (combinedSyllable) {
                            speak(combinedSyllable);
                          }
                        }}
                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black transition-all border ${
                          selectedConsonant && !isPlayingAll
                            ? 'bg-[#21262d] text-[#f0f6fc] border-[#30363d] hover:bg-[#30363d] active:scale-95'
                            : 'bg-[#161b22]/50 text-[#8b949e]/40 border-transparent cursor-not-allowed'
                        }`}
                      >
                        <Icon name="Volume2" className="w-3.5 h-3.5 text-emerald-400" />
                        <span>শুনুন</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== MODE 5.76: CONSONANT WITH KAR SIGNS - INTERACTIVE TABLE ==================== */}
        {activeMode === 'consonantKarTable' && !isQuizMode && (() => {
          const activeConsonants = karTablePage === 1 ? KAR_TABLE_PAGE1_CONSONANTS : KAR_TABLE_PAGE2_CONSONANTS;
          
          // Filter consonants by search input
          const filteredConsonants = activeConsonants.filter(consonant => 
            consonant.includes(karTableSearch) || 
            (consonant + 'া').includes(karTableSearch)
          );

          const handleAutoplayRow = async (rowLetter: string) => {
            if (autoplayCell) {
              setAutoplayCell(null);
              return;
            }
            speak(`${rowLetter} বর্ণের সকল কার চিহ্ন উচ্চারণ শুনো`);
            await new Promise(resolve => setTimeout(resolve, 2200));
            
            for (let colIndex = 0; colIndex < KAR_VOWELS_MAPPING.length; colIndex++) {
              if (activeMode !== 'consonantKarTable') break;
              setAutoplayCell({ row: rowLetter, colIndex });
              const item = KAR_VOWELS_MAPPING[colIndex];
              const syllable = rowLetter + item.kar;
              const textToSpeak = karTableSpellOut ? `${rowLetter} এ ${item.name} ${syllable}` : syllable;
              
              speak(textToSpeak);
              await new Promise(resolve => setTimeout(resolve, 1500));
            }
            setAutoplayCell(null);
          };

          const handleAutoplayColumn = async (colIndex: number) => {
            if (autoplayCell) {
              setAutoplayCell(null);
              return;
            }
            const item = KAR_VOWELS_MAPPING[colIndex];
            speak(`${item.name} এর সকল বর্ণের উচ্চারণ শুনো`);
            await new Promise(resolve => setTimeout(resolve, 2200));
            
            for (let r = 0; r < filteredConsonants.length; r++) {
              if (activeMode !== 'consonantKarTable') break;
              const rowLetter = filteredConsonants[r];
              setAutoplayCell({ row: rowLetter, colIndex });
              const syllable = rowLetter + item.kar;
              const textToSpeak = karTableSpellOut ? `${rowLetter} এ ${item.name} ${syllable}` : syllable;
              
              speak(textToSpeak);
              await new Promise(resolve => setTimeout(resolve, 1500));
            }
            setAutoplayCell(null);
          };

          return (
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
              {/* Intro Header Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gradient-to-br from-pink-600 via-rose-600 to-amber-500 rounded-3xl p-6 sm:p-8 text-white text-center mb-6 sm:mb-8 shadow-2xl relative overflow-hidden"
              >
                {/* Visual decorations matching primary school charts */}
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-black/15 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <span className="bg-white/20 text-white text-xs font-black uppercase px-4 py-1.5 rounded-full border border-white/30 backdrop-blur-sm shadow-sm inline-block mb-3 tracking-widest">
                    ব্যঞ্জনবর্ণের সহিত কার চিহ্নের ব্যবহার
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black mb-3 text-shadow-md">সবগুলো কার চিহ্নের রঙিন চার্ট 🎨</h2>
                  <p className="mt-2 text-white/95 font-bold text-sm sm:text-base max-w-2xl mx-auto">
                    বইয়ের পাতার মতো দুটি পেজে সকল ব্যঞ্জনবর্ণ ও ১০টি কার চিহ্নের মিলন দেওয়া হলো। যেকোনো ঘরে ক্লিক করে চমৎকার উচ্চারণ শোনো!
                  </p>
                </div>
              </motion.div>

              {/* Advanced Controls & Search Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Book Page Selector */}
                <div className="bg-[#11161d] border border-[#30363d] p-3 sm:p-4 rounded-3xl shadow-lg flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm font-black text-[#8b949e] flex items-center gap-1">
                    <Icon name="BookOpen" className="w-4 h-4 text-pink-400" />
                    পৃষ্ঠা নির্বাচন:
                  </span>
                  <div className="flex bg-[#161b22] p-1 rounded-2xl border border-[#30363d] w-fit">
                    <button
                      onClick={() => {
                        setKarTablePage(1);
                        speak("প্রথম পৃষ্ঠা ক থেকে ফ");
                        setAutoplayCell(null);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        karTablePage === 1
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                          : 'text-[#8b949e] hover:text-[#f0f6fc]'
                      }`}
                    >
                      পৃষ্ঠা ১ (ক-ফ)
                    </button>
                    <button
                      onClick={() => {
                        setKarTablePage(2);
                        speak("দ্বিতীয় পৃষ্ঠা ব থেকে হ");
                        setAutoplayCell(null);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        karTablePage === 2
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                          : 'text-[#8b949e] hover:text-[#f0f6fc]'
                      }`}
                    >
                      পৃষ্ঠা ২ (ব-হ)
                    </button>
                  </div>
                </div>

                {/* Spell-Out Mode Toggle */}
                <div className="bg-[#11161d] border border-[#30363d] p-3 sm:p-4 rounded-3xl shadow-lg flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-black text-[#f0f6fc] flex items-center gap-1.5">
                      <Icon name="Volume2" className="w-4 h-4 text-rose-400" />
                      উচ্চারণ ধরণ
                    </span>
                    <span className="text-[10px] text-[#8b949e]">সহজ শব্দ বনাম বানানসহ শিক্ষা</span>
                  </div>
                  <button
                    onClick={() => {
                      const newVal = !karTableSpellOut;
                      setKarTableSpellOut(newVal);
                      speak(newVal ? "বানানসহ উচ্চারণ করা হবে" : "শুধুমাত্র উচ্চারণ করা হবে");
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                      karTableSpellOut 
                        ? 'bg-rose-950/35 border-rose-500/50 text-rose-400 shadow-md shadow-rose-950/10' 
                        : 'bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-white'
                    }`}
                  >
                    {karTableSpellOut ? "📖 বানানসহ (ক এ া কা)" : "🔊 শুধু উচ্চারণ (কা)"}
                  </button>
                </div>

                {/* Search / Filter Bar */}
                <div className="bg-[#11161d] border border-[#30363d] p-3 sm:p-4 rounded-3xl shadow-lg flex items-center gap-2.5 relative">
                  <Icon name="Search" className="w-4.5 h-4.5 text-[#8b949e] shrink-0" />
                  <input
                    type="text"
                    placeholder="নির্দিষ্ট বর্ণ দিয়ে খুঁজুন (যেমন: ক, চ)..."
                    value={karTableSearch}
                    onChange={(e) => setKarTableSearch(e.target.value)}
                    className="w-full bg-[#161b22] border border-[#30363d] rounded-xl px-3 py-1.5 text-xs text-[#f0f6fc] placeholder-[#8b949e] focus:outline-none focus:border-pink-500 transition-all font-black"
                  />
                  {karTableSearch && (
                    <button
                      onClick={() => setKarTableSearch('')}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-white"
                    >
                      <Icon name="X" className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Playback Autoplay Helper Instructions */}
              <div className="mb-4 text-center py-2 px-4 bg-[#161b22]/50 border border-dashed border-[#30363d] rounded-2xl text-xs text-[#8b949e] flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5">
                <span className="flex items-center gap-1 font-semibold text-[#c9d1d9]">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                  টিপস:
                </span>
                <span>ঘরের উপরে ক্লিক করলে উচ্চারণ শোনা যাবে।</span>
                <span>লাইন শেষে <span className="text-emerald-400 font-extrabold">▶️</span> চাপলে পুরো লাইনের অটো-প্লে হবে!</span>
                <span>কলামের উপরে <span className="text-pink-400 font-extrabold">▶️</span> চাপলে পুরো কলাম শুনবে!</span>
              </div>

              {/* Main Table Container with Custom Styling */}
              <div className="bg-[#0d1117] border border-[#30363d] rounded-[2rem] shadow-2xl p-3 sm:p-5 mb-8 relative overflow-hidden">
                
                {/* Horizontal scroll support container */}
                <div className="overflow-x-auto rounded-2xl border border-[#21262d] relative bg-[#11161d]/60">
                  <table className="w-full border-collapse min-w-[900px] text-center select-none">
                    <thead>
                      <tr className="bg-[#161b22] border-b border-[#30363d]">
                        {/* Empty/Consonant Header */}
                        <th className="sticky left-0 z-20 bg-[#161b22] p-3 border-r border-[#30363d] min-w-[90px] text-[#f0f6fc] font-black text-xs sm:text-sm shadow-[4px_0_10px_rgba(0,0,0,0.5)]">
                          ব্যঞ্জনবর্ণ
                        </th>
                        
                        {/* 10 Kar Sign headers */}
                        {KAR_VOWELS_MAPPING.map((item, idx) => {
                          const isColumnAutoplayActive = autoplayCell && autoplayCell.colIndex === idx && autoplayCell.row !== '';
                          return (
                            <th 
                              key={idx} 
                              className={`p-3 border-r border-[#30363d] text-center relative group transition-all duration-300 ${
                                isColumnAutoplayActive ? 'bg-pink-950/20' : 'hover:bg-[#1f242c]'
                              }`}
                            >
                              <div className="flex flex-col items-center justify-center gap-1.5">
                                {/* Vowel in red */}
                                <span className="text-base sm:text-lg font-black text-rose-500 font-sans tracking-wide">
                                  {item.vowel}
                                </span>
                                
                                {/* Kar sign combined with dashed placeholder */}
                                <span className="text-xl sm:text-2xl font-black text-cyan-400 font-serif filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                                  {item.kar}
                                </span>

                                {/* Column title */}
                                <span className="text-[9px] text-[#8b949e] font-black uppercase tracking-tight">
                                  {item.name}
                                </span>

                                {/* Cute play column button */}
                                <button
                                  onClick={() => handleAutoplayColumn(idx)}
                                  title={`${item.name} কলাম অটো-প্লে`}
                                  className="mt-1 p-1 rounded-lg bg-[#21262d] border border-[#30363d] hover:bg-pink-500 hover:text-white text-[#8b949e] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm flex items-center justify-center"
                                >
                                  <Icon name={autoplayCell && autoplayCell.colIndex === idx ? "Square" : "Play"} className="w-3 h-3" />
                                </button>
                              </div>
                            </th>
                          );
                        })}

                        {/* Actions column */}
                        <th className="p-3 text-xs font-black text-[#8b949e]">অটো-প্লে</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredConsonants.length === 0 ? (
                        <tr>
                          <td colSpan={12} className="py-12 text-[#8b949e] font-bold text-center">
                            কোনো ব্যঞ্জনবর্ণ খুঁজে পাওয়া যায়নি। দয়া করে সঠিক বর্ণ লিখুন!
                          </td>
                        </tr>
                      ) : (
                        filteredConsonants.map((rowLetter, rIdx) => {
                          return (
                            <tr 
                              key={rowLetter} 
                              className={`border-b border-[#30363d]/50 transition-colors ${
                                rIdx % 2 === 0 ? 'bg-[#0d1117]/40' : 'bg-[#11161d]/40'
                              } hover:bg-[#1c212b]/40`}
                            >
                              {/* Sticky Consonant Name cell */}
                              <td className="sticky left-0 z-10 bg-[#161b22] border-r border-[#30363d] p-2.5 shadow-[4px_0_10px_rgba(0,0,0,0.5)]">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => speak(rowLetter)}
                                  className="w-full flex items-center justify-between gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#21262d] to-[#161b22] hover:from-rose-600 hover:to-rose-500 hover:text-white border border-[#30363d] transition-all text-[#f0f6fc] cursor-pointer group"
                                >
                                  <span className="text-xl sm:text-2xl font-black font-sans">{rowLetter}</span>
                                  <Icon name="Volume2" className="w-3.5 h-3.5 text-pink-400 group-hover:text-white animate-pulse" />
                                </motion.button>
                              </td>

                              {/* 10 cells of combination */}
                              {KAR_VOWELS_MAPPING.map((item, colIdx) => {
                                const syllable = rowLetter + item.kar;
                                const isCellPlaying = autoplayCell && autoplayCell.row === rowLetter && autoplayCell.colIndex === colIdx;
                                const textToSpeak = karTableSpellOut ? `${rowLetter} এ ${item.name} ${syllable}` : syllable;

                                return (
                                  <td 
                                    key={colIdx} 
                                    className="p-1 sm:p-1.5 border-r border-[#30363d]/40"
                                  >
                                    <motion.button
                                      whileHover={{ scale: 1.05, y: -1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => {
                                        speak(textToSpeak);
                                      }}
                                      className={`w-full min-h-[58px] sm:min-h-[64px] flex flex-col items-center justify-center rounded-xl p-1 sm:p-2 border transition-all relative overflow-hidden cursor-pointer ${
                                        isCellPlaying
                                          ? 'bg-rose-500 border-transparent text-white ring-4 ring-rose-500/30 scale-105 shadow-xl animate-bounce'
                                          : `bg-[#161b22]/70 text-[#f0f6fc] border-[#30363d] hover:${item.borderCol} hover:bg-gradient-to-br hover:${item.color} hover:text-white hover:shadow-md`
                                      }`}
                                    >
                                      {/* Combined Syllable label */}
                                      <span className="text-lg sm:text-xl font-extrabold tracking-tight drop-shadow-sm">
                                        {syllable}
                                      </span>

                                      {/* Tiny subtitle guides */}
                                      <span className={`text-[8px] sm:text-[9px] block opacity-80 ${isCellPlaying ? 'text-white' : item.textCol} font-semibold mt-0.5`}>
                                        {rowLetter} + {item.kar}
                                      </span>
                                    </motion.button>
                                  </td>
                                );
                              })}

                              {/* Autoplay Row button */}
                              <td className="p-2 text-center">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleAutoplayRow(rowLetter)}
                                  title={`${rowLetter} বর্ণের সকল কার চিহ্ন ক্রমান্বয়ে শুনুন`}
                                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                                    autoplayCell && autoplayCell.row === rowLetter
                                      ? 'bg-emerald-600 border-transparent text-white animate-pulse'
                                      : 'bg-[#21262d] border-[#30363d] text-emerald-400 hover:bg-emerald-600 hover:text-white'
                                  }`}
                                >
                                  <Icon name={autoplayCell && autoplayCell.row === rowLetter ? "Square" : "Play"} className="w-4 h-4" />
                                </motion.button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Left/Right swipe helper for touch screens */}
                <div className="flex items-center justify-between text-[11px] text-[#8b949e] font-semibold mt-4">
                  <span className="flex items-center gap-1.5">
                    <Icon name="ArrowLeft" className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                    ডানে বামে স্ক্রোল করুন (Scroll)
                  </span>
                  <span className="flex items-center gap-1">
                    মোট ব্যঞ্জনবর্ণ: <span className="font-black text-rose-400">{toBengaliNumber(filteredConsonants.length)}</span>টি
                  </span>
                  <span className="flex items-center gap-1.5">
                    স্ক্রোল করুন (Scroll)
                    <Icon name="ArrowRight" className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                  </span>
                </div>
              </div>

              {/* Vowel & Kar Sign reference cheat sheet */}
              <div className="bg-[#11161d] border border-[#30363d] rounded-3xl p-5 mb-8 shadow-xl">
                <h3 className="text-sm sm:text-base font-black text-[#f0f6fc] mb-3.5 flex items-center gap-2">
                  <Icon name="Sparkles" className="w-4 h-4 text-amber-400" />
                  কার চিহ্নের শিক্ষণীয় নির্দেশিকা (Learning Guide)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                  {KAR_VOWELS_MAPPING.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-[#161b22] border border-[#30363d]/60 rounded-2xl flex flex-col items-center text-center transition-all hover:bg-[#1f242c]"
                    >
                      <span className="text-xs text-[#8b949e] font-bold">{item.name}</span>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-sm font-black text-rose-400">{item.vowel}</span>
                        <span className="text-xs text-gray-500">➜</span>
                        <span className="text-lg font-black text-cyan-400 font-serif">{item.kar}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold mt-1">
                        যেমন: ক{item.kar} = {`ক${item.kar}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ==================== MODE 5.8: SENTENCES WITH KAR SIGNS ==================== */}
        {activeMode === 'karSentences' && !isQuizMode && (
          <div className="max-w-7xl mx-auto px-4">
            {/* Intro Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 sm:p-10 text-white text-center mb-8 sm:mb-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-5xl font-black mb-3">কার চিহ্ন দিয়ে বাক্য</h2>
                <p className="mt-2 text-white/90 font-bold text-base sm:text-lg">
                  প্রতিটি কার চিহ্ন ব্যবহার করে তৈরি ১০টি করে আকর্ষণীয় বাক্য পড়ুন ও উচ্চারণ শুনুন!
                </p>
                <p className="mt-1 text-indigo-200 text-xs sm:text-sm font-semibold">
                  বাক্যটিতে ক্লিক করে অথবা উচ্চারণ বাটনে চাপ দিয়ে সঠিক কণ্ঠস্বর শুনুন।
                </p>
              </div>
            </motion.div>

            {/* Kar Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 max-w-5xl mx-auto">
              {BENGALI_KAR_SENTENCES_DATA.map((group) => {
                const isActive = (selectedKarSentenceGroup?.id || BENGALI_KAR_SENTENCES_DATA[0].id) === group.id;
                return (
                  <motion.button
                    key={group.id}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedKarSentenceGroup(group);
                      speak(group.name);
                    }}
                    className={`relative px-4 sm:px-6 py-3 rounded-2xl font-black text-sm sm:text-base border transition-all flex items-center gap-3 ${
                      isActive 
                        ? `bg-gradient-to-r ${group.color} text-white border-transparent shadow-lg shadow-indigo-950/40 scale-105`
                        : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:border-[#8b949e]'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl font-black">{group.kar}</span>
                    <span className="text-xs sm:text-sm font-bold">{group.name}</span>
                    {isActive && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Current Active Group Sentences Panel */}
            <AnimatePresence mode="wait">
              {(() => {
                const activeGroup = selectedKarSentenceGroup || BENGALI_KAR_SENTENCES_DATA[0];
                return (
                  <motion.div
                    key={activeGroup.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-4xl mx-auto"
                  >
                    {/* Header showing active selected kar details */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#161b22] border border-[#30363d] p-5 rounded-3xl mb-6 shadow-xl">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeGroup.color} flex items-center justify-center text-white text-3xl font-black shadow-md`}>
                          {activeGroup.kar}
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-white">{activeGroup.name} দিয়ে সহজ বাক্য</h3>
                          <p className="text-xs sm:text-sm text-[#8b949e] font-bold mt-0.5">সবগুলো বাক্য সুন্দর করে পড়ার চর্চা করো</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => speak(`${activeGroup.name} দিয়ে ১০টি চমৎকার বাক্য নিচে দেওয়া হলো`)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-extrabold text-sm bg-gradient-to-r ${activeGroup.color} shadow-md`}
                      >
                        <Icon name="Volume2" className="w-4 h-4" />
                        <span>সব শুনুন</span>
                      </motion.button>
                    </div>

                    {/* Sentences List */}
                    <div className="space-y-4 sm:space-y-5">
                      {activeGroup.sentences.map((item, index) => {
                        return (
                          <motion.div
                            key={index}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.015, x: 4 }}
                            onClick={() => speak(item.sentence)}
                            className="group flex items-center justify-between p-4 sm:p-6 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#8b949e]/30 rounded-3xl cursor-pointer shadow-md transition-all relative overflow-hidden"
                          >
                            <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0 pr-4">
                              {/* Index Badge */}
                              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-indigo-400 font-black text-sm sm:text-base group-hover:bg-indigo-950/40 group-hover:border-indigo-800/40 transition-all">
                                {index + 1}
                              </div>

                              {/* Bengali Sentence text */}
                              <p className="text-base sm:text-2xl font-extrabold text-[#f0f6fc] group-hover:text-white leading-relaxed select-all">
                                {item.sentence}
                              </p>
                            </div>

                            {/* Emoji and Sound Button */}
                            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                              <span className="text-2xl sm:text-4xl drop-shadow-md select-none group-hover:scale-125 transition-transform duration-300">
                                {item.emoji}
                              </span>
                              
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${activeGroup.color} text-white flex items-center justify-center shadow-md transition-shadow group-hover:shadow-lg`}
                              >
                                <Icon name="Volume2" className="w-5 h-5" />
                              </motion.div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== MODE 5.9: BANGLA SENTENCES PROGRESSIVE ==================== */}
        {activeMode === 'progSentences' && !isQuizMode && (
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            {/* Intro Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-r from-rose-950/40 via-pink-950/20 to-purple-950/40 border border-rose-500/20 rounded-3xl p-6 sm:p-8 mb-8 text-center backdrop-blur-sm"
            >
              <h2 className="text-xl sm:text-3xl font-black text-rose-300 mb-2 sm:mb-4">
                🔥 বাংলা বাক্য: সহজ থেকে কঠিন
              </h2>
              <p className="text-sm sm:text-lg text-[#8b949e] max-w-3xl mx-auto leading-relaxed">
                ধাপ–১ এর অতি সহজ ১-২ শব্দের ছোট বাক্য থেকে শুরু করে ধাপ–৬ এর সাহিত্যিক ও ভাবসম্প্রসারণমূলক দীর্ঘ বাক্য পর্যন্ত ধাপে ধাপে শিখুন। প্রতিটি বাক্যের উচ্চারণ শুনুন এবং শব্দ সাজানো কুইজের মাধ্যমে আপনার দক্ষতা যাচাই করুন!
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {selectedProgGroup === null ? (
                // Group List View
                <motion.div
                  key="group-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BENGALI_PROGRESSIVE_SENTENCES.map((group, idx) => {
                      return (
                        <motion.div
                          key={group.id}
                          whileHover={{ y: -8, scale: 1.02 }}
                          onClick={() => {
                            setSelectedProgGroup(group);
                            speak(group.title);
                          }}
                          className={`cursor-pointer rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] ${group.borderColor} p-6 flex flex-col justify-between h-56 transition-all duration-300 relative overflow-hidden group shadow-lg`}
                        >
                          {/* Ambient glow in background on hover */}
                          <div className={`absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br ${group.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity duration-500 rounded-full`} />
                          
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <span className={`text-xs px-3 py-1.5 rounded-full font-bold bg-gradient-to-r ${group.color} text-white shadow-md`}>
                                বাক্য {group.rangeText}
                              </span>
                              <span className="text-2xl font-black text-[#30363d] group-hover:text-[#8b949e]/30 transition-colors">
                                ০{idx + 1}
                              </span>
                            </div>
                            
                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-rose-300 transition-colors mb-2 leading-snug">
                              {group.title}
                            </h3>
                            <p className="text-xs text-[#8b949e]">
                              মোট {group.sentences.length}টি বাক্য রয়েছে। ধাপে ধাপে বাক্য গঠন শিখুন।
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#30363d]/50">
                            <span className="text-xs font-semibold text-[#8b949e] group-hover:text-white transition-colors flex items-center gap-1.5">
                              পাঠ শুরু করুন <Icon name="ArrowRight" className="w-3.5 h-3.5" />
                            </span>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                speak(group.title);
                              }}
                              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${group.color} text-white flex items-center justify-center shadow-md`}
                            >
                              <Icon name="Volume2" className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                // Sentences List Inside Selected Group
                <motion.div
                  key="sentence-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Back button and group title */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161b22] border border-[#30363d] p-4 sm:p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedProgGroup(null);
                          setScrambleSentence(null);
                        }}
                        className="px-4 py-2 text-xs sm:text-sm font-bold bg-[#30363d] hover:bg-[#21262d] text-white rounded-xl flex items-center gap-2 border border-[#444c56]"
                      >
                        <Icon name="ArrowLeft" className="w-4 h-4" />
                        <span>ফিরে যাও</span>
                      </motion.button>
                      <h3 className="text-base sm:text-xl font-bold text-white">
                        {selectedProgGroup.title}
                      </h3>
                    </div>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-bold bg-gradient-to-r ${selectedProgGroup.color} text-white self-start sm:self-auto`}>
                      বাক্য সংখ্যা: {selectedProgGroup.rangeText}
                    </span>
                  </div>

                  {/* Scramble Game Card overlay if active */}
                  <AnimatePresence>
                    {scrambleSentence && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="bg-gradient-to-br from-[#161b22] to-[#0d1117] border-2 border-rose-500/30 p-6 rounded-2xl shadow-2xl relative"
                      >
                        {/* Close button */}
                        <button
                          onClick={() => setScrambleSentence(null)}
                          className="absolute right-4 top-4 text-[#8b949e] hover:text-white"
                        >
                          <Icon name="X" className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedProgGroup.color} text-white flex items-center justify-center`}>
                            <Icon name="Flame" className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                            <h4 className="font-black text-rose-300 text-lg">শব্দ সাজানো খেলা (বাক্য নং - {toBengaliNumber(scrambleSentence.number)})</h4>
                            <p className="text-xs text-[#8b949e]">এলোমেলো শব্দগুলো সাজিয়ে সঠিক বাক্য তৈরি করুন।</p>
                          </div>
                        </div>

                        {/* Hearts Attempt indicators */}
                        <div className="flex items-center gap-1 mb-6 bg-[#0d1117] py-2 px-4 rounded-xl w-fit border border-[#30363d]">
                          <span className="text-xs text-[#8b949e] mr-2">চেষ্টা বাকি:</span>
                          {[1, 2, 3].map((heart) => {
                            const isSpent = scrambleAttempts >= heart;
                            return (
                              <motion.span
                                key={heart}
                                animate={isSpent ? { scale: [1, 1.3, 1], opacity: 0.3 } : { scale: 1 }}
                                className="text-base"
                              >
                                {isSpent ? "🖤" : "❤️"}
                              </motion.span>
                            );
                          })}
                        </div>

                        {/* Current Sentence Build Workspace */}
                        <div className="mb-6">
                          <label className="block text-xs font-bold text-[#8b949e] uppercase tracking-wider mb-2">আপনার তৈরি বাক্য:</label>
                          <div className="min-h-16 w-full bg-[#0d1117] border-2 border-dashed border-[#30363d] rounded-xl p-4 flex flex-wrap gap-2.5 items-center justify-center">
                            {scrambleAnswer.length === 0 ? (
                              <span className="text-xs sm:text-sm text-[#484f58] italic select-none">
                                নিচের শব্দগুলোতে ক্লিক করে বাক্যটি সাজান...
                              </span>
                            ) : (
                              scrambleAnswer.map((item) => (
                                <motion.button
                                  key={item.id}
                                  layout
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleWordClickInAnswer(item)}
                                  className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-[#21262d] to-[#161b22] border border-[#30363d] hover:border-red-500/40 text-sm text-white font-medium flex items-center gap-1"
                                >
                                  {item.word} <span className="text-[9px] text-red-500">×</span>
                                </motion.button>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Scrambled Word Pool */}
                        <div className="mb-6">
                          <label className="block text-xs font-bold text-[#8b949e] uppercase tracking-wider mb-2">শব্দ ভাণ্ডার (ক্লিক করে নির্বাচন করুন):</label>
                          <div className="bg-[#0d1117]/60 border border-[#30363d] rounded-xl p-4 flex flex-wrap gap-2.5 justify-center">
                            {scramblePool.length === 0 && scrambleAnswer.length > 0 && scrambleFeedback !== 'success' && scrambleFeedback !== 'fail' ? (
                              <span className="text-xs text-green-400 italic font-semibold">সবগুলো শব্দ সাজানো হয়েছে! উত্তর যাচাই করুন।</span>
                            ) : scramblePool.length === 0 && scrambleAnswer.length === 0 ? (
                              <span className="text-xs text-[#8b949e] italic">কোনো শব্দ নেই</span>
                            ) : (
                              scramblePool.map((item) => (
                                <motion.button
                                  key={item.id}
                                  layout
                                  whileHover={{ scale: 1.1, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleWordClickInPool(item)}
                                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-purple-500/10 border border-rose-500/20 hover:border-rose-500/50 text-sm text-rose-200 font-bold shadow-md"
                                >
                                  {item.word}
                                </motion.button>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Feedback Banner */}
                        <AnimatePresence>
                          {scrambleFeedback && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className={`mb-6 p-4 rounded-xl border text-center ${
                                scrambleFeedback === 'success' 
                                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
                                  : scrambleFeedback === 'fail'
                                  ? 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                                  : 'bg-amber-950/30 border-amber-500/30 text-amber-300'
                              }`}
                            >
                              {scrambleFeedback === 'success' && (
                                <div className="space-y-1">
                                  <p className="text-base font-black">🎉 চমৎকার! সঠিক উত্তর হয়েছে!</p>
                                  <p className="text-xs text-[#8b949e]">আপনি সঠিক বাক্যটি সম্পূর্ণ সাজাতে পেরেছেন।</p>
                                </div>
                              )}
                              {scrambleFeedback === 'fail' && (
                                <div className="space-y-2">
                                  <p className="text-base font-black">❌ ৩টি প্রচেষ্টাই শেষ হয়েছে!</p>
                                  <p className="text-sm">সঠিক বাক্য: <span className="font-bold text-white underline">{scrambleSentence.sentence}</span></p>
                                </div>
                              )}
                              {scrambleFeedback === 'wrong' && (
                                <div className="space-y-1">
                                  <p className="text-base font-black">⚠️ ভুল উত্তর! আবার চেষ্টা করো।</p>
                                  <p className="text-xs text-[#8b949e]">শব্দের ক্রমটি সঠিক নয়। প্রয়োজনে "আবার শুরু করো" চাপুন।</p>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Bottom Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#30363d]/50">
                          <div className="flex gap-2">
                            {scrambleAnswer.length > 0 && scrambleFeedback !== 'success' && scrambleFeedback !== 'fail' && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={checkScrambleAnswer}
                                className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-950/30"
                              >
                                উত্তর যাচাই করো
                              </motion.button>
                            )}

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={resetScrambleQuiz}
                              className="px-4 py-2.5 bg-[#30363d] hover:bg-[#21262d] text-white font-bold text-xs sm:text-sm rounded-xl border border-[#444c56]"
                            >
                              আবার শুরু করো
                            </motion.button>
                          </div>

                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                speak(scrambleSentence.sentence);
                              }}
                              className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white flex items-center justify-center shadow-md"
                              title="উচ্চারণ শুনুন"
                            >
                              <Icon name="Volume2" className="w-5 h-5" />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setScrambleSentence(null)}
                              className="px-4 py-2.5 bg-[#161b22] hover:bg-[#21262d] text-[#8b949e] hover:text-white font-bold text-xs sm:text-sm rounded-xl border border-[#30363d]"
                            >
                              খেলা বন্ধ করো
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sentences List Grid */}
                  <div className="grid grid-cols-1 gap-4">
                    {selectedProgGroup.sentences.map((item) => {
                      const isCurrentlyPlaying = scrambleSentence?.id === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ scale: 0.98, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-[#161b22] to-[#0d1117] border ${
                            isCurrentlyPlaying ? 'border-rose-500/50 shadow-rose-950/10' : 'border-[#30363d] hover:border-[#444c56]'
                          } flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 relative group`}
                        >
                          <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedProgGroup.color} text-white font-black text-sm flex items-center justify-center shadow-md flex-shrink-0`}>
                              {toBengaliNumber(item.number)}
                            </div>
                            <div className="text-left">
                              <p className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                                {item.sentence}
                              </p>
                              <p className="text-[10px] text-[#8b949e] mt-1 select-none font-medium">
                                শব্দ সংখ্যা: {item.sentence.split(/\s+/).filter(Boolean).length}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 border-[#30363d]/50 pt-3 md:pt-0">
                            {/* Play audio button */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => speak(item.sentence)}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-white text-xs font-bold border border-[#30363d] transition-colors"
                            >
                              <Icon name="Volume2" className="w-4 h-4 text-rose-400" />
                              <span>উচ্চারণ শুনুন</span>
                            </motion.button>

                            {/* Scramble Game Trigger button */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                startScrambleQuiz(item);
                                speak("শব্দ সাজিয়ে বাক্য গঠন করো");
                              }}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r ${selectedProgGroup.color} text-white text-xs font-black shadow-md transition-all`}
                            >
                              <Icon name="Puzzle" className="w-4 h-4 animate-bounce" />
                              <span>শব্দ সাজাও খেলা</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== MODE 5.10: BANGLA ANTONYMS ==================== */}
        {activeMode === 'antonyms' && !isQuizMode && (
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            {/* Intro Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-r from-violet-950/40 via-purple-950/20 to-fuchsia-950/40 border border-violet-500/20 rounded-3xl p-6 sm:p-8 mb-8 text-center backdrop-blur-sm"
            >
              <h2 className="text-xl sm:text-3xl font-black text-violet-300 mb-2 sm:mb-4">
                ✨ বাংলা বিপরীত শব্দ (Antonyms)
              </h2>
              <p className="text-sm sm:text-lg text-[#8b949e] max-w-3xl mx-auto leading-relaxed">
                লেভেল ১ থেকে লেভেল ২০ পর্যন্ত ২০০টি বিপরীত শব্দ শিখুন। প্রতিটি স্তরে ১০টি করে শব্দ রয়েছে। প্রতিটি শব্দের সঠিক উচ্চারণ এবং সম্পূর্ণ বিপরীত জোড়ের ব্যাখ্যা শুনতে স্পিকার বাটনে চাপুন!
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {selectedAntonymLevel === null ? (
                // Level List View
                <motion.div
                  key="antonym-level-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {BENGALI_ANTONYMS.map((level, idx) => {
                      return (
                        <motion.div
                          key={level.id}
                          whileHover={{ y: -8, scale: 1.02 }}
                          onClick={() => {
                            setSelectedAntonymLevel(level);
                            speak(level.title);
                          }}
                          className={`cursor-pointer rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] ${level.borderColor} p-6 flex flex-col justify-between h-48 transition-all duration-300 relative overflow-hidden group shadow-lg`}
                        >
                          {/* Ambient glow in background on hover */}
                          <div className={`absolute -right-10 -bottom-10 w-28 h-28 bg-gradient-to-br ${level.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity duration-500 rounded-full`} />
                          
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <span className={`text-xs px-3 py-1.5 rounded-full font-bold bg-gradient-to-r ${level.color} text-white shadow-md`}>
                                শব্দ {toBengaliNumber((idx * 10) + 1)} - {toBengaliNumber((idx * 10) + 10)}
                              </span>
                              <span className="text-xl font-black text-[#30363d] group-hover:text-[#8b949e]/30 transition-colors">
                                {toBengaliNumber(idx + 1)}
                              </span>
                            </div>
                            
                            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-violet-300 transition-colors mb-2 leading-snug">
                              {level.title}
                            </h3>
                            <p className="text-xs text-[#8b949e]">
                              ১০টি সহজ ও গুরুত্বপূর্ণ বিপরীত শব্দ।
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#30363d]/50">
                            <span className="text-xs font-semibold text-[#8b949e] group-hover:text-white transition-colors flex items-center gap-1.5">
                              শিখুন <Icon name="ArrowRight" className="w-3.5 h-3.5" />
                            </span>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                speak(level.title);
                              }}
                              className={`w-8 h-8 rounded-xl bg-gradient-to-br ${level.color} text-white flex items-center justify-center shadow-md`}
                            >
                              <Icon name="Volume2" className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                // Words Detail View Inside Level
                <motion.div
                  key="antonym-word-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Back button and level header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161b22] border border-[#30363d] p-4 sm:p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedAntonymLevel(null);
                        }}
                        className="px-4 py-2 text-xs sm:text-sm font-bold bg-[#30363d] hover:bg-[#21262d] text-white rounded-xl flex items-center gap-2 border border-[#444c56]"
                      >
                        <Icon name="ArrowLeft" className="w-4 h-4" />
                        <span>ফিরে যাও</span>
                      </motion.button>
                      <h3 className="text-base sm:text-xl font-bold text-white">
                        {selectedAntonymLevel.title}
                      </h3>
                    </div>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-bold bg-gradient-to-r ${selectedAntonymLevel.color} text-white self-start sm:self-auto`}>
                      ১০টি বিপরীত শব্দ
                    </span>
                  </div>

                  {/* Word Pairs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedAntonymLevel.words.map((item, index) => {
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ scale: 0.98, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] hover:border-violet-500/40 shadow-xl transition-all duration-300 relative overflow-hidden group`}
                        >
                          {/* Side indicator strip */}
                          <div className={`absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b ${selectedAntonymLevel.color}`} />
                          
                          {/* Left / Right Words presentation */}
                          <div className="flex items-center justify-between gap-4 mb-6">
                            {/* Source Word */}
                            <div className="flex-1 text-center bg-[#0d1117]/60 py-4 px-3 rounded-xl border border-[#30363d]/50">
                              <span className="block text-[11px] text-[#8b949e] mb-1 font-bold uppercase tracking-wider">মূল শব্দ</span>
                              <span className="text-xl sm:text-2xl font-black text-white leading-tight">
                                {item.word}
                              </span>
                            </div>

                            {/* Arrow Indicator */}
                            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-violet-950/20 border border-violet-500/20 text-violet-400 shadow-md group-hover:rotate-180 transition-transform duration-500">
                              <Icon name="Shuffle" className="w-4 h-4" />
                            </div>

                            {/* Antonym Word */}
                            <div className="flex-1 text-center bg-violet-950/10 py-4 px-3 rounded-xl border border-violet-500/20">
                              <span className="block text-[11px] text-violet-400 mb-1 font-bold uppercase tracking-wider">বিপরীত শব্দ</span>
                              <span className="text-xl sm:text-2xl font-black text-violet-300 leading-tight">
                                {item.antonym}
                              </span>
                            </div>
                          </div>

                          {/* Sound Action Controls */}
                          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#30363d]/50">
                            {/* Speak main word */}
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => speak(item.word)}
                              className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-[10px] font-bold transition-all"
                            >
                              <Icon name="Volume2" className="w-4 h-4 mb-1 text-gray-400" />
                              <span>শব্দ শুনুন</span>
                            </motion.button>

                            {/* Speak full pairing sentence */}
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => { speak(`${item.word} এর বিপরীত শব্দ ${item.antonym}`); incrementDailyChallengeProgress('antonyms_match'); }}
                              className={`flex flex-col items-center justify-center py-2.5 rounded-xl bg-gradient-to-r ${selectedAntonymLevel.color} text-white text-[10px] font-black shadow-lg transition-all`}
                            >
                              <Icon name="Volume2" className="w-4 h-4 mb-1 text-white animate-pulse" />
                              <span>সম্পূর্ণ শুনুন</span>
                            </motion.button>

                            {/* Speak antonym word */}
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => { speak(item.antonym); incrementDailyChallengeProgress('antonyms_match'); }}
                              className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-violet-950/30 hover:bg-violet-900/30 text-violet-300 border border-violet-500/20 text-[10px] font-bold transition-all"
                            >
                              <Icon name="Volume2" className="w-4 h-4 mb-1 text-violet-400" />
                              <span>বিপরীত শুনুন</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== MODE 5.10.2: BANGLA SYNONYMS ==================== */}
        {activeMode === 'synonyms' && !isQuizMode && (
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            {/* Intro Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-cyan-950/40 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 mb-8 text-center backdrop-blur-sm"
            >
              <h2 className="text-xl sm:text-3xl font-black text-emerald-300 mb-2 sm:mb-4">
                ✨ বাংলা সমার্থক শব্দ (Synonyms)
              </h2>
              <p className="text-sm sm:text-lg text-[#8b949e] max-w-3xl mx-auto leading-relaxed">
                সহজ থেকে কঠিন ১০টি লেভেলে সাজানো ২০০টি চমৎকার সমার্থক শব্দ শিখুন। প্রতিটি স্তরে ২০টি করে শব্দ রয়েছে। জোড়গুলোর সঠিক উচ্চারণ এবং অর্থ শুনতে স্পিকার বাটনে চাপুন!
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {selectedSynonymLevel === null ? (
                // Level List View
                <motion.div
                  key="synonym-level-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {BENGALI_SYNONYMS.map((level, idx) => {
                      return (
                        <motion.div
                          key={level.id}
                          whileHover={{ y: -8, scale: 1.02 }}
                          onClick={() => {
                            setSelectedSynonymLevel(level);
                            speak(level.title);
                          }}
                          className={`cursor-pointer rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] ${level.borderColor} p-6 flex flex-col justify-between h-48 transition-all duration-300 relative overflow-hidden group shadow-lg`}
                        >
                          {/* Ambient glow in background on hover */}
                          <div className={`absolute -right-10 -bottom-10 w-28 h-28 bg-gradient-to-br ${level.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity duration-500 rounded-full`} />
                          
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <span className={`text-xs px-3 py-1.5 rounded-full font-bold bg-gradient-to-r ${level.color} text-white shadow-md`}>
                                শব্দ {toBengaliNumber((idx * 20) + 1)} - {toBengaliNumber((idx * 20) + 20)}
                              </span>
                              <span className="text-xl font-black text-[#30363d] group-hover:text-[#8b949e]/30 transition-colors">
                                {toBengaliNumber(idx + 1)}
                              </span>
                            </div>
                            
                            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-300 transition-colors mb-2 leading-snug">
                              {level.title}
                            </h3>
                            <p className="text-xs text-[#8b949e]">
                              ২০টি অত্যন্ত প্রয়োজনীয় ও আকর্ষণীয় সমার্থক শব্দ।
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#30363d]/50">
                            <span className="text-xs font-semibold text-[#8b949e] group-hover:text-white transition-colors flex items-center gap-1.5">
                              শিখুন <Icon name="ArrowRight" className="w-3.5 h-3.5" />
                            </span>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                speak(level.title);
                              }}
                              className={`w-8 h-8 rounded-xl bg-gradient-to-br ${level.color} text-white flex items-center justify-center shadow-md`}
                            >
                              <Icon name="Volume2" className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                // Words Detail View Inside Level
                <motion.div
                  key="synonym-word-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Back button and level header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161b22] border border-[#30363d] p-4 sm:p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedSynonymLevel(null);
                        }}
                        className="px-4 py-2 text-xs sm:text-sm font-bold bg-[#30363d] hover:bg-[#21262d] text-white rounded-xl flex items-center gap-2 border border-[#444c56]"
                      >
                        <Icon name="ArrowLeft" className="w-4 h-4" />
                        <span>ফিরে যাও</span>
                      </motion.button>
                      <h3 className="text-base sm:text-xl font-bold text-white">
                        {selectedSynonymLevel.title}
                      </h3>
                    </div>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-bold bg-gradient-to-r ${selectedSynonymLevel.color} text-white self-start sm:self-auto`}>
                      ২০টি সমার্থক শব্দ
                    </span>
                  </div>

                  {/* Word Pairs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedSynonymLevel.words.map((item, index) => {
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ scale: 0.98, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.03 }}
                          className={`rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] hover:border-emerald-500/40 shadow-xl transition-all duration-300 relative overflow-hidden group`}
                        >
                          {/* Side indicator strip */}
                          <div className={`absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b ${selectedSynonymLevel.color}`} />
                          
                          {/* Left / Right Words presentation */}
                          <div className="flex items-center justify-between gap-4 mb-6">
                            {/* Source Word */}
                            <div className="flex-1 text-center bg-[#0d1117]/60 py-4 px-3 rounded-xl border border-[#30363d]/50">
                              <span className="block text-[11px] text-[#8b949e] mb-1 font-bold uppercase tracking-wider">শব্দ</span>
                              <span className="text-xl sm:text-2xl font-black text-white leading-tight">
                                {item.word}
                              </span>
                            </div>

                            {/* Equal/Link Indicator */}
                            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 shadow-md group-hover:rotate-180 transition-transform duration-500">
                              <Icon name="Equal" className="w-4 h-4" />
                            </div>

                            {/* Synonym Word */}
                            <div className="flex-1 text-center bg-emerald-950/10 py-4 px-3 rounded-xl border border-emerald-500/20">
                              <span className="block text-[11px] text-emerald-400 mb-1 font-bold uppercase tracking-wider">সমার্থক শব্দ / সহজ অর্থ</span>
                              <span className="text-xl sm:text-2xl font-black text-emerald-300 leading-tight">
                                {item.synonym}
                              </span>
                            </div>
                          </div>

                          {/* Sound Action Controls */}
                          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#30363d]/50">
                            {/* Speak main word */}
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => speak(item.word)}
                              className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-[10px] font-bold transition-all"
                            >
                              <Icon name="Volume2" className="w-4 h-4 mb-1 text-gray-400" />
                              <span>শব্দ শুনুন</span>
                            </motion.button>

                            {/* Speak full pairing sentence */}
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => { speak(`${item.word} এর সমার্থক শব্দ হলো ${item.synonym}`); incrementDailyChallengeProgress('antonyms_match'); }}
                              className={`flex flex-col items-center justify-center py-2.5 rounded-xl bg-gradient-to-r ${selectedSynonymLevel.color} text-white text-[10px] font-black shadow-lg transition-all`}
                            >
                              <Icon name="Volume2" className="w-4 h-4 mb-1 text-white animate-pulse" />
                              <span>সম্পূর্ণ শুনুন</span>
                            </motion.button>

                            {/* Speak synonym word */}
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => { speak(item.synonym); incrementDailyChallengeProgress('antonyms_match'); }}
                              className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-emerald-950/30 hover:bg-emerald-900/30 text-emerald-300 border border-emerald-500/20 text-[10px] font-bold transition-all"
                            >
                              <Icon name="Volume2" className="w-4 h-4 mb-1 text-emerald-400" />
                              <span>সমার্থক শুনুন</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== MODE 5.11: BANGLA SADHU CHOLIT ==================== */}
        {activeMode === 'sadhuCholit' && !isQuizMode && (
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            {/* Intro Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-r from-amber-950/40 via-orange-950/20 to-yellow-950/40 border border-amber-500/20 rounded-3xl p-6 sm:p-8 mb-8 text-center backdrop-blur-sm"
            >
              <h2 className="text-xl sm:text-3xl font-black text-amber-300 mb-2 sm:mb-4">
                🔄 সাধু ও চলিত ভাষার রূপান্তর (Sadhu & Cholit)
              </h2>
              <p className="text-sm sm:text-lg text-[#8b949e] max-w-3xl mx-auto leading-relaxed">
                সহজ, মাঝারি ও কঠিন স্তরের ১৫০টি শব্দ এবং ১০টি গুরুত্বপূর্ণ সাধু ও চলিত বাক্যের রূপান্তর শিখুন। প্রতিটি শব্দ ও বাক্যের সঠিক উচ্চারণ ও রূপান্তর শুনতে স্পিকার বোতামে আলতো চাপুন!
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {selectedSadhuCholitLevel === null ? (
                // Level List View
                <motion.div
                  key="sadhu-cholit-level-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Difficulty Filters / Quick overview */}
                  <div className="flex flex-wrap justify-center gap-3 bg-[#161b22] border border-[#30363d] p-3 sm:p-4 rounded-2xl">
                    <span className="text-xs font-bold text-[#8b949e] px-2 py-1.5 flex items-center gap-1.5 self-center">
                      দ্রুত দেখুন:
                    </span>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      🟢 সহজ স্তর (১–৫০ শব্দ)
                    </span>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-1">
                      🟡 মাঝারি স্তর (৫১–১০০ শব্দ)
                    </span>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                      🔴 কঠিন স্তর (১০১–১৫০ শব্দ)
                    </span>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center gap-1">
                      🔵 সাধু ও চলিত বাক্য (১০টি বাক্য)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {BENGALI_SADHU_CHOLIT.map((level, idx) => {
                      const badgeBg = 
                        level.difficulty === 'সহজ' ? 'bg-gradient-to-r from-emerald-500 to-green-600' :
                        level.difficulty === 'মাঝারি' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                        level.difficulty === 'কঠিন' ? 'bg-gradient-to-r from-rose-500 to-pink-600' :
                        'bg-gradient-to-r from-violet-600 to-indigo-700';

                      return (
                        <motion.div
                          key={level.id}
                          whileHover={{ y: -8, scale: 1.02 }}
                          onClick={() => {
                            setSelectedSadhuCholitLevel(level);
                            speak(level.title);
                          }}
                          className={`cursor-pointer rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] ${level.borderColor} p-6 flex flex-col justify-between h-48 transition-all duration-300 relative overflow-hidden group shadow-lg`}
                        >
                          {/* Glow effect */}
                          <div className={`absolute -right-10 -bottom-10 w-28 h-28 bg-gradient-to-br ${level.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity duration-500 rounded-full`} />
                          
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <span className={`text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-black text-white shadow-md ${badgeBg}`}>
                                {level.difficulty === 'বাক্য' ? 'বাক্য রূপান্তর' : `শব্দ ${toBengaliNumber((idx * 10) + 1)} - ${toBengaliNumber((idx * 10) + 10)}`}
                              </span>
                              <span className="text-xl font-black text-[#30363d] group-hover:text-[#8b949e]/30 transition-colors">
                                {toBengaliNumber(idx + 1)}
                              </span>
                            </div>
                            
                            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors mb-2 leading-snug">
                              {level.title}
                            </h3>
                            <p className="text-xs text-[#8b949e]">
                              {level.difficulty === 'বাক্য' ? '১০টি সাধারণ বাক্য ও চলিত রূপ।' : '১০টি গুরুত্বপূর্ণ শব্দ জোড় শিখুন।'}
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#30363d]/50">
                            <span className="text-xs font-semibold text-[#8b949e] group-hover:text-white transition-colors flex items-center gap-1.5">
                              শিখুন <Icon name="ArrowRight" className="w-3.5 h-3.5" />
                            </span>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                speak(level.title);
                              }}
                              className={`w-8 h-8 rounded-xl bg-gradient-to-br ${level.color} text-white flex items-center justify-center shadow-md`}
                            >
                              <Icon name="Volume2" className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                // Words Detail View Inside Level
                <motion.div
                  key="sadhu-cholit-word-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Back button and level header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161b22] border border-[#30363d] p-4 sm:p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedSadhuCholitLevel(null);
                        }}
                        className="px-4 py-2 text-xs sm:text-sm font-bold bg-[#30363d] hover:bg-[#21262d] text-white rounded-xl flex items-center gap-2 border border-[#444c56]"
                      >
                        <Icon name="ArrowLeft" className="w-4 h-4" />
                        <span>ফিরে যাও</span>
                      </motion.button>
                      <h3 className="text-base sm:text-xl font-bold text-white">
                        {selectedSadhuCholitLevel.title}
                      </h3>
                    </div>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-bold bg-gradient-to-r ${selectedSadhuCholitLevel.color} text-white self-start sm:self-auto`}>
                      {selectedSadhuCholitLevel.difficulty === 'বাক্য' ? '১০টি বাক্য রূপান্তর' : '১০টি সাধু ও চলিত রূপ'}
                    </span>
                  </div>

                  {/* Word Pairs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedSadhuCholitLevel.words.map((item, index) => {
                      const explanation = selectedSadhuCholitLevel.difficulty === 'বাক্য'
                        ? `সাধু বাক্য: ${item.sadhu} এর চলিত রূপ হলো: ${item.cholit}`
                        : `সাধু ভাষা ${item.sadhu} এর চলিত রূপ হলো ${item.cholit}`;

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ scale: 0.98, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] hover:border-amber-500/40 shadow-xl transition-all duration-300 relative overflow-hidden group`}
                        >
                          {/* Side indicator strip */}
                          <div className={`absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b ${selectedSadhuCholitLevel.color}`} />
                          
                          {/* Left / Right Words presentation */}
                          <div className="flex items-center justify-between gap-4 mb-6">
                            {/* Sadhu Word */}
                            <div className="flex-1 text-center bg-[#0d1117]/60 py-4 px-3 rounded-xl border border-[#30363d]/50">
                              <span className="block text-[11px] text-[#8b949e] mb-1 font-bold uppercase tracking-wider">সাধু রূপ</span>
                              <span className={`${selectedSadhuCholitLevel.difficulty === 'বাক্য' ? 'text-sm sm:text-base' : 'text-lg sm:text-xl'} font-black text-white leading-tight block`}>
                                {item.sadhu}
                              </span>
                            </div>

                            {/* Arrow Indicator */}
                            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-amber-950/20 border border-amber-500/20 text-amber-400 shadow-md group-hover:rotate-180 transition-transform duration-500">
                              <Icon name="RefreshCw" className="w-4 h-4" />
                            </div>

                            {/* Cholit Word */}
                            <div className="flex-1 text-center bg-amber-950/10 py-4 px-3 rounded-xl border border-amber-500/20">
                              <span className="block text-[11px] text-amber-400 mb-1 font-bold uppercase tracking-wider">চলিত রূপ</span>
                              <span className={`${selectedSadhuCholitLevel.difficulty === 'বাক্য' ? 'text-sm sm:text-base font-extrabold' : 'text-lg sm:text-xl font-black'} text-amber-300 leading-tight block`}>
                                {item.cholit}
                              </span>
                            </div>
                          </div>

                          {/* Sound Action Controls */}
                          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#30363d]/50">
                            {/* Speak Sadhu */}
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => speak(item.sadhu)}
                              className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-[10px] font-bold transition-all"
                            >
                              <Icon name="Volume2" className="w-4 h-4 mb-1 text-gray-400" />
                              <span>সাধু শুনুন</span>
                            </motion.button>

                            {/* Speak Explanation */}
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => speak(explanation)}
                              className={`flex flex-col items-center justify-center py-2.5 rounded-xl bg-gradient-to-r ${selectedSadhuCholitLevel.color} text-white text-[10px] font-black shadow-lg transition-all`}
                            >
                              <Icon name="Volume2" className="w-4 h-4 mb-1 text-white animate-pulse" />
                              <span>রূপান্তর শুনুন</span>
                            </motion.button>

                            {/* Speak Cholit */}
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => speak(item.cholit)}
                              className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-amber-950/30 hover:bg-amber-900/30 text-amber-300 border border-amber-500/20 text-[10px] font-bold transition-all"
                            >
                              <Icon name="Volume2" className="w-4 h-4 mb-1 text-amber-400" />
                              <span>চলিত শুনুন</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}



        {/* ==================== BANGLA STORIES MODE ==================== */}
        {activeMode === 'stories' && !isQuizMode && (
          <div className="max-w-6xl mx-auto px-2 sm:px-4">
            <AnimatePresence mode="wait">
              {!selectedStory ? (
                // Stories Grid Selection View
                <motion.div
                  key="stories-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Colorful Header Intro */}
                  <div className="bg-gradient-to-br from-cyan-600 via-sky-600 to-indigo-600 rounded-3xl p-6 sm:p-10 text-white text-center mb-6 sm:mb-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/15 rounded-full blur-2xl"></div>
                    <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-black/15 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                      <span className="text-5xl sm:text-6xl block mb-3">📖</span>
                      <h2 className="text-3xl sm:text-4xl font-black mb-3">ছোটদের সুন্দর বাংলা গল্প</h2>
                      <p className="text-sm sm:text-base opacity-90 leading-relaxed max-w-2xl mx-auto mb-6">
                        সহজ থেকে কঠিন স্তরে সাজানো গল্পগুলো পড়ো এবং প্রতিটি শব্দের উচ্চারণ শুনতে শব্দের ওপরে ক্লিক করো!
                      </p>

                      {/* Download All Stories PDF Book */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          downloadStoryPDF(BANGLA_STORIES);
                          speak("গল্পের পিডিএফ বই ডাউনলোড হচ্ছে");
                        }}
                        className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-cyan-950 hover:bg-cyan-50 rounded-2xl font-black text-xs sm:text-sm shadow-xl transition-all cursor-pointer border border-transparent hover:border-white"
                      >
                        <Icon name="FileDown" className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span>সব গল্প একত্রে ডাউনলোড করুন (A4 PDF বই) 📚</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Level Filtering Tabs */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
                    {([
                      { level: 'all', label: 'সব গল্প', color: 'bg-cyan-600/25 border-cyan-500/30 text-cyan-400' },
                      { level: 'easy', label: 'সহজ গল্প (৪-৬ বছর)', color: 'bg-green-600/25 border-green-500/30 text-green-400' },
                      { level: 'medium', label: 'মধ্যম গল্প (৬-৮ বছর)', color: 'bg-amber-600/25 border-amber-500/30 text-amber-400' },
                      { level: 'difficult', label: 'কঠিন গল্প (৯-১০ বছর)', color: 'bg-rose-600/25 border-rose-500/30 text-rose-400' }
                    ] as const).map((tab) => (
                      <button
                        key={tab.level}
                        onClick={() => {
                          setStoryLevelFilter(tab.level);
                          speak(tab.label);
                        }}
                        className={`px-4 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm border transition-all ${
                          storyLevelFilter === tab.level
                            ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white border-transparent shadow-lg shadow-cyan-950/40'
                            : 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:bg-[#21262d]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Stories Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {BANGLA_STORIES.filter(s => storyLevelFilter === 'all' || s.level === storyLevelFilter).map((story) => (
                      <motion.div
                        key={story.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                        className="bg-[#161b22] border border-[#30363d] rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-xl group overflow-hidden relative"
                      >
                        {/* Decorative Background Glow */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${story.color} opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.08] transition-opacity`}></div>

                        <div>
                          {/* Story Number Badge & Level */}
                          <div className="flex justify-between items-center mb-4">
                            <span className={`text-xs font-black px-3 py-1 rounded-full bg-gradient-to-r ${story.color} text-white shadow`}>
                              গল্প-{toBengaliNumber(story.id)}
                            </span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                              story.level === 'easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                              story.level === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                              'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}>
                              {story.levelLabel}
                            </span>
                          </div>

                          {/* Story Title */}
                          <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-400 transition-colors mb-3">
                            {story.title}
                          </h3>

                          {/* Story Text Preview */}
                          <p className="text-xs sm:text-sm text-[#8b949e] line-clamp-3 mb-4 leading-relaxed">
                            {story.text}
                          </p>

                          {/* Moral Preview */}
                          <div className="bg-[#0d1117] border border-[#30363d]/50 rounded-2xl p-3 mb-4 flex items-start gap-2">
                            <span className="text-xs">💡</span>
                            <p className="text-[11px] sm:text-xs font-semibold text-amber-400 italic leading-snug">
                              <span className="text-white not-italic mr-1">শিক্ষা:</span> {story.moral}
                            </p>
                          </div>
                        </div>

                        {/* Action Read Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedStory(story);
                            verifyAndPlayText(story.title);
                            incrementDailyChallengeProgress('story_open');
                          }}
                          className={`w-full py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 bg-gradient-to-r ${story.color} hover:brightness-110 text-white shadow-md transition-all`}
                        >
                          <Icon name="BookOpen" className="w-4 h-4" />
                          <span>গল্পটি পড়ুন</span>
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                // Selected Story Interactive Reader View
                <motion.div
                  key="story-reader"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#161b22] border border-[#30363d] rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
                >
                  {/* Decorative Glow */}
                  <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${selectedStory.color} opacity-[0.03] rounded-full blur-3xl`}></div>

                  {/* Back button */}
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#30363d]/60 relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.05, x: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedStory(null);
                        speak("গল্প তালিকা");
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#21262d] text-white hover:bg-[#2c313c] font-bold text-xs sm:text-sm rounded-xl border border-[#30363d] transition-all"
                    >
                      <Icon name="ArrowLeft" className="w-4 h-4 text-cyan-400" />
                      <span>তালিকায় ফিরুন</span>
                    </motion.button>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black px-3 py-1 rounded-full bg-gradient-to-r ${selectedStory.color} text-white shadow`}>
                        গল্প-{toBengaliNumber(selectedStory.id)}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded border ${
                        selectedStory.level === 'easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        selectedStory.level === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {selectedStory.levelLabel}
                      </span>
                    </div>
                  </div>

                  {/* Story Reader Content Card */}
                  <div className="relative z-10 max-w-4xl mx-auto">
                    {/* Top title and voice play button */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 sm:mb-8">
                      <h2 className="text-2xl sm:text-4xl font-black text-white bg-gradient-to-r from-white via-slate-100 to-[#8b949e] bg-clip-text text-transparent">
                        {selectedStory.title}
                      </h2>

                      {/* Controls Row */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        {/* Play Entire Story */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => verifyAndPlayText(selectedStory.text)}
                          className={`flex items-center gap-2 px-4 py-2.5 sm:px-6 rounded-2xl bg-gradient-to-r ${selectedStory.color} text-white font-bold text-xs sm:text-sm shadow-lg hover:brightness-110 transition-all cursor-pointer`}
                        >
                          <Icon name="Volume2" className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                          <span>পুরো গল্প শুনুন</span>
                        </motion.button>

                        {/* Download Selected Story as A4 PDF */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            downloadStoryPDF(selectedStory);
                            speak("পিডিএফ ডাউনলোড হচ্ছে");
                          }}
                          className="flex items-center gap-2 px-4 py-2.5 sm:px-5 rounded-2xl bg-[#21262d] text-white font-bold text-xs sm:text-sm shadow-lg hover:bg-[#2c313c] border border-[#30363d] hover:border-cyan-500/40 transition-all cursor-pointer"
                        >
                          <Icon name="Download" className="w-4 h-4 text-cyan-400" />
                          <span>গল্পটি ডাউনলোড করুন (A4 PDF)</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Cute Tip Banner */}
                    <div className="bg-cyan-950/20 border border-cyan-800/25 rounded-2xl p-3 sm:p-4 mb-6 text-center text-xs text-cyan-400 flex items-center justify-center gap-2 leading-relaxed">
                      <Icon name="Sparkles" className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span><strong>ছোট বন্ধুদের জন্য ম্যাজিক:</strong> যে শব্দটির উচ্চারণ শুনতে চাও, তার ওপরে আঙুল বা মাউস দিয়ে ক্লিক করো! ✨</span>
                    </div>

                    {/* Word-by-Word Reading Interface */}
                    <div className="bg-[#0d1117] border border-[#30363d]/80 rounded-3xl p-6 sm:p-10 mb-8 shadow-inner relative">
                      <div className="absolute top-3 right-3 text-[10px] text-slate-500 font-bold select-none uppercase tracking-widest bg-[#161b22] px-2 py-0.5 rounded border border-[#30363d]/50">
                        ইন্টারেক্টিভ রিডার
                      </div>

                      {/* Split text into lines, then words */}
                      <div className="flex flex-wrap gap-x-2 gap-y-3 sm:gap-x-2.5 sm:gap-y-4 text-xl sm:text-3xl font-bold leading-loose text-slate-100 justify-start select-none">
                        {selectedStory.text.split(' ').map((wordToken, wordIndex) => {
                          const cleaned = wordToken.replace(/[।,\?!\(\)\-\[\]\{\}\s;:\"]/g, '').trim();
                          return (
                            <motion.button
                              key={wordIndex}
                              whileHover={{ scale: 1.15, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                if (cleaned) {
                                  verifyAndPlayText(cleaned);
                                }
                              }}
                              className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-xl transition-all cursor-pointer hover:bg-cyan-500/10 hover:text-cyan-400 border border-transparent hover:border-cyan-500/20 active:bg-cyan-600/25"
                              title="উচ্চারণ শুনতে ক্লিক করুন"
                            >
                              {wordToken}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Moral Banner */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-[#1b1f27] to-[#141820] border border-[#30363d]/60 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl shadow-lg shadow-orange-950/40">
                        💡
                      </div>
                      <div className="text-center sm:text-left flex-1">
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-500 block mb-1">গল্পের শিক্ষণীয় বিষয় (শিক্ষা)</span>
                        <p className="text-sm sm:text-lg font-bold text-white leading-relaxed">
                          {selectedStory.moral}
                        </p>
                      </div>

                      {/* Sound button for moral */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => verifyAndPlayText(`শিক্ষণীয় বিষয়। ${selectedStory.moral}`)}
                        className="px-4 py-2 rounded-xl bg-[#21262d] text-amber-400 hover:bg-[#2c313c] border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 transition-colors self-stretch sm:self-center justify-center"
                      >
                        <Icon name="Volume2" className="w-3.5 h-3.5" />
                        <span>শিক্ষা শুনুন</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== ONE WORD CONTRACTION MODE ==================== */}
        {activeMode === 'oneWord' && !isQuizMode && (
          <React.Suspense fallback={<div className="text-center py-10 font-bold text-slate-400">লোড হচ্ছে...</div>}>
            <OneWordContraction speak={speak} />
          </React.Suspense>
        )}

        {/* ==================== TONGUE TWISTER MODE ==================== */}
        {activeMode === 'tongueTwister' && !isQuizMode && (
          <TongueTwister speak={speak} />
        )}

        {/* ==================== ALPHABET SONG MODE ==================== */}
        {activeMode === 'alphabetsong' && !isQuizMode && (
          <AlphabetSongSubTab speak={speak} />
        )}

        {/* ==================== VOWEL TEST MODE ==================== */}
        {activeMode === 'vowelTest' && !isQuizMode && (
          <LetterTest type="vowel" speak={speak} />
        )}

        {/* ==================== CONSONANT TEST MODE ==================== */}
        {activeMode === 'consonantTest' && !isQuizMode && (
          <LetterTest type="consonant" speak={speak} />
        )}

        {/* ==================== BEFORE AND AFTER LETTER GAME MODE ==================== */}
        {activeMode === 'beforeAfterLetter' && !isQuizMode && (
          <BeforeAfterLetter
            alphabetData={BENGALI_ALPHABET}
            speak={speak}
            onSuccess={() => {
              setShowConfetti(true);
              setConfettiKey((prev) => prev + 1);
              setTimeout(() => setShowConfetti(false), 5000);
            }}
          />
        )}

        {/* ==================== PRONUNCIATION PRACTICE MODE ==================== */}
        {activeMode === 'pronouncePractice' && !isQuizMode && (
          <PronunciationPractice speak={speak} />
        )}

        {/* ==================== PRACTICE MODE (RAPID FIRE) ==================== */}
        {activeMode === 'practice' && !isQuizMode && (
          <div className="max-w-3xl mx-auto px-4">
            {!practiceActive ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#161b22] border border-[#30363d] rounded-[2rem] p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden"
              >
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-950/30">
                  <Icon name="Zap" className="w-10 h-10 sm:w-14 sm:h-14 text-white animate-pulse" />
                </div>

                <h2 className="text-3xl sm:text-5xl font-black mb-4 text-[#f0f6fc]">⚡ র‍্যাপিড ফায়ার প্র্যাকটিস</h2>
                <p className="text-[#8b949e] text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                  বাংলা বর্ণ, শব্দ, কার চিহ্ন, বিপরীত শব্দ এবং সাধু-চলিত শব্দ থেকে প্রশ্ন করা হবে। প্রতিটি প্রশ্নের উত্তর দেওয়ার জন্য মাত্র <span className="text-yellow-400 font-bold">১০ সেকেন্ড</span> সময় থাকবে। ৩টি ভুল উত্তরে গেম ওভার!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto mb-8">
                  <div className="flex items-center gap-3 bg-[#0d1117] p-3.5 rounded-xl border border-[#30363d]">
                    <span className="text-xl">⏱️</span>
                    <div>
                      <h4 className="text-white text-xs font-black">১০ সেকেন্ড সময়</h4>
                      <p className="text-slate-400 text-[10px]">প্রতিটি প্রশ্নের জন্য দ্রুত সিদ্ধান্ত নিন</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#0d1117] p-3.5 rounded-xl border border-[#30363d]">
                    <span className="text-xl">❤️</span>
                    <div>
                      <h4 className="text-white text-xs font-black">৩টি লাইফ</h4>
                      <p className="text-slate-400 text-[10px]">ভুল উত্তরের জন্য লাইফ হারাবেন</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#0d1117] p-3.5 rounded-xl border border-[#30363d]">
                    <span className="text-xl">🔥</span>
                    <div>
                      <h4 className="text-white text-xs font-black">ধারাবাহিক স্ট্রাইক</h4>
                      <p className="text-slate-400 text-[10px]">সঠিক উত্তরের মাধ্যমে স্কোর বাড়িয়ে নাও</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#0d1117] p-3.5 rounded-xl border border-[#30363d]">
                    <span className="text-xl">🌟</span>
                    <div>
                      <h4 className="text-white text-xs font-black">১০টি প্রশ্ন</h4>
                      <p className="text-slate-400 text-[10px]">মোট ১০টি প্রশ্ন শেষ করার লক্ষ্য রাখুন</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startPracticeSession}
                  className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-black rounded-2xl text-base sm:text-xl shadow-xl transition-all cursor-pointer"
                >
                  খেলা শুরু করুন 🎮
                </motion.button>
              </motion.div>
            ) : (
              <div className="relative">
                {/* Stats Header bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-[#161b22] border border-[#30363d] p-4 rounded-2xl shadow-xl">
                  {/* Quest Counter */}
                  <div className="text-slate-300 font-bold text-sm sm:text-base">
                    প্রশ্ন: <span className="text-white font-black text-lg">{practiceQuestionIndex + 1}</span> / ১০
                  </div>

                  {/* Timer */}
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
                    practiceTimer <= 3 
                      ? 'bg-rose-950/40 border-rose-800/60 text-rose-400 animate-pulse' 
                      : 'bg-slate-950/40 border-slate-800 text-slate-300'
                  }`}>
                    <span>⏱️</span>
                    <span className="font-black font-mono text-sm sm:text-base">{practiceTimer}s</span>
                  </div>

                  {/* Score & Streak */}
                  <div className="flex items-center gap-2">
                    <span className="bg-[#0d1117] px-3 py-1 rounded-lg border border-[#30363d] text-teal-400 font-black text-sm">
                      🏆 {practiceScore}
                    </span>
                    {practiceStreak > 0 && (
                      <span className="bg-orange-950/30 text-orange-400 px-2 py-1 rounded-lg border border-orange-800/30 text-xs font-black flex items-center gap-1">
                        🔥 {practiceStreak}
                      </span>
                    )}
                  </div>

                  {/* Lives representation */}
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <span key={idx} className="text-lg sm:text-xl transition-all">
                        {idx < practiceLives ? '❤️' : '🖤'}
                      </span>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isPracticeFinished ? (
                    <motion.div
                      key="finished"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-[#161b22] border border-[#30363d] rounded-[2rem] p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

                      <div className="text-6xl sm:text-7xl block mb-6">🏆</div>
                      <h2 className="text-3xl sm:text-5xl font-black mb-2 text-[#f0f6fc]">প্র্যাকটিস সম্পন্ন!</h2>
                      
                      <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-6 max-w-md mx-auto mb-8">
                        <p className="text-slate-400 text-sm mb-1 font-bold">মোট স্কোর</p>
                        <p className="text-4xl sm:text-5xl font-black text-teal-400 mb-4">{practiceScore} / ১০</p>
                        
                        {practiceScore >= 8 ? (
                          <div className="bg-emerald-950/20 text-emerald-400 p-3 rounded-xl border border-emerald-800/30 text-xs font-bold leading-relaxed">
                            🌟 অসাধারণ খেলেছো! বাংলা শিখায় তোমার চমৎকার দখল রয়েছে!
                          </div>
                        ) : practiceScore >= 5 ? (
                          <div className="bg-blue-950/20 text-blue-400 p-3 rounded-xl border border-blue-800/30 text-xs font-bold leading-relaxed">
                            👍 বেশ ভালো চেষ্টা! আরও প্র্যাকটিসের মাধ্যমে নিজের দক্ষতা বৃদ্ধি করো।
                          </div>
                        ) : (
                          <div className="bg-rose-950/20 text-rose-400 p-3 rounded-xl border border-rose-800/30 text-xs font-bold leading-relaxed">
                            💪 কোনো সমস্যা নেই! বাংলা অক্ষরের মজার সেশনগুলো আবার খেলে নিজের স্কোর বাড়িয়ে নাও।
                          </div>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startPracticeSession}
                        className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-black rounded-2xl text-sm sm:text-base shadow-lg transition-all"
                      >
                        আবার খেলুন 🎮
                      </motion.button>
                    </motion.div>
                  ) : (
                    practiceQuestion && (
                      <motion.div
                        key={practiceQuestionIndex}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-8 shadow-2xl relative"
                      >
                        {/* Question Text */}
                        <div className="text-center mb-6">
                          <h3 className="text-lg sm:text-2xl font-black text-slate-200 leading-snug">
                            {practiceQuestion.questionText}
                          </h3>
                        </div>

                        {/* Central Question Block */}
                        <div className="bg-[#0d1117] border border-[#30363d]/70 rounded-2xl p-6 mb-8 text-center shadow-inner relative flex flex-col items-center justify-center min-h-[160px] sm:min-h-[220px]">
                          {/* Volume speak button */}
                          {practiceQuestion.extra?.soundText && (
                            <button
                              onClick={() => speak(practiceQuestion.extra.soundText)}
                              className="absolute top-3 right-3 p-2 bg-[#161b22]/90 hover:bg-[#21262d] rounded-xl border border-[#30363d] shadow-md transition-colors text-slate-400 hover:text-teal-400"
                            >
                              <Icon name="Volume2" className="w-5 h-5" />
                            </button>
                          )}

                          {practiceQuestion.type === 'bengali_word' ? (
                            <div className="relative w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center bg-[#161b22] rounded-3xl border border-[#30363d] shadow p-4 overflow-hidden">
                              {practiceQuestion.extra.img ? (
                                <img
                                  src={practiceQuestion.extra.img}
                                  alt="word target"
                                  className="w-full h-full object-contain drop-shadow-md"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    target.onerror = null;
                                    target.src = getEmojiImage(practiceQuestion.extra.emoji, 128);
                                  }}
                                />
                              ) : (
                                <img
                                  src={getEmojiImage(practiceQuestion.extra.emoji, 128)}
                                  alt="word emoji target"
                                  className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    const parent = target.parentElement;
                                    if (parent) {
                                      const fallback = document.createElement('div');
                                      fallback.className = "text-5xl sm:text-6xl select-none animate-pulse";
                                      fallback.textContent = practiceQuestion.extra?.emoji || '📚';
                                      parent.appendChild(fallback);
                                      target.style.display = 'none';
                                    }
                                  }}
                                />
                              )}
                            </div>
                          ) : (
                            <span className="text-6xl sm:text-8xl font-black text-white drop-shadow-lg select-none">
                              {practiceQuestion.content}
                            </span>
                          )}
                        </div>

                        {/* Options Bento Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {practiceQuestion.options.map((opt: string, idx: number) => {
                            const isSelected = practiceSelectedIdx === idx;
                            const isCorrect = opt === practiceQuestion.correctAnswer;
                            const showSuccess = practiceAnswered && isCorrect;
                            const showFail = practiceAnswered && isSelected && !isCorrect;

                            return (
                              <motion.button
                                key={idx}
                                whileHover={!practiceAnswered ? { scale: 1.02, y: -2 } : {}}
                                whileTap={!practiceAnswered ? { scale: 0.98 } : {}}
                                onClick={() => handlePracticeAnswer(idx)}
                                disabled={practiceAnswered}
                                className={`w-full py-4 px-5 rounded-2xl text-left font-black transition-all border text-sm sm:text-lg flex items-center justify-between shadow ${
                                  showSuccess
                                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500 shadow-emerald-950/20'
                                    : showFail
                                    ? 'bg-rose-950/40 text-rose-400 border-rose-500 shadow-rose-950/20'
                                    : practiceAnswered
                                    ? 'bg-[#161b22] text-[#8b949e] border-transparent opacity-50 cursor-default'
                                    : 'bg-[#161b22] hover:bg-[#21262d] text-white border-[#30363d] cursor-pointer'
                                }`}
                              >
                                <span>{opt}</span>
                                {showSuccess && (
                                  <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg text-xs flex items-center gap-1">
                                    ✓ সঠিক
                                  </span>
                                )}
                                {showFail && (
                                  <span className="text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-lg text-xs flex items-center gap-1">
                                    ✗ ভুল
                                  </span>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

        {/* ==================== CLASS ONE BANGLA MODE ==================== */}
        {activeMode === 'classOneBangla' && !isQuizMode && (
          <ClassOneBangla speak={speak} />
        )}

        {/* ==================== CLASS WISE JOINT LETTERS MODE ==================== */}
        {activeMode === 'classWiseJointLetters' && !isQuizMode && (
          <React.Suspense fallback={<div className="text-center py-10 font-bold text-slate-400">লোড হচ্ছে...</div>}>
            <ClassWiseJointLetters speak={speak} />
          </React.Suspense>
        )}

        {/* ==================== CLASS THREE ASSESSMENT MODE ==================== */}
        {activeMode === 'classThreeAssessment' && !isQuizMode && (
          <ClassThreeAssessment speak={speak} />
        )}

        {/* ==================== LEARNING PROGRESS DASHBOARD MODE ==================== */}
        {activeMode === 'progressDashboard' && !isQuizMode && (
          <LearningProgressDashboard 
            speak={speak} 
            onNavigateToMode={(mode) => {
              setActiveMode(mode as any);
              setIsQuizMode(mode === 'quiz');
              speak(mode === 'quiz' ? "কুইজ" : "নেভিগেট করা হয়েছে");
            }} 
          />
        )}

        {/* ==================== CODE EDITOR & SYSTEM HEALTH MODE ==================== */}
        {activeMode === 'codeEditor' && !isQuizMode && (
          <CodeEditor speak={speak} />
        )}

        {/* ==================== MODE 5: QUIZ ==================== */}
        {isQuizMode && (
          <div className="max-w-3xl mx-auto w-full px-2">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-[#161b22] border border-[#30363d] rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-full blur-3xl opacity-50 -translate-y-32 translate-x-32"></div>

              <div className="relative flex justify-between items-center mb-6 sm:mb-10">
                <div className="bg-green-950/35 border border-green-800/40 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 shadow-lg">
                  <Icon name="Trophy" className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  <span className="text-green-400 font-black text-xl sm:text-2xl">{quizState.score}/{quizState.total}</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Silent Practice TTS Toggle */}
                  <button
                    onClick={() => {
                      const newVal = !isQuizMuted;
                      setIsQuizMuted(newVal);
                      try {
                        localStorage.setItem('isQuizMuted', String(newVal));
                      } catch (e) {
                        console.error('Failed to save isQuizMuted state:', e);
                      }
                      if (!newVal) {
                        speak("কুইজ উচ্চারণ শব্দ চালু করা হয়েছে");
                      }
                    }}
                    title={isQuizMuted ? "উচ্চারণ শব্দ চালু করুন (Enable TTS)" : "উচ্চারণ শব্দ বন্ধ করুন (Mute TTS)"}
                    className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                      isQuizMuted 
                        ? 'bg-rose-950/25 border-rose-800/40 text-rose-400 hover:bg-rose-900/30' 
                        : 'bg-[#21262d] border-[#30363d] text-[#8b949e] hover:bg-[#2c313c] hover:text-[#f0f6fc]'
                    }`}
                  >
                    <Icon name={isQuizMuted ? "VolumeX" : "Volume2"} className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-[10px] sm:text-xs font-black">
                      {isQuizMuted ? "নিঃশব্দ অনুশীলন" : "উচ্চারণসহ অনুশীলন"}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setQuizState(prev => ({ ...prev, score: 0, total: 0, question: null }));
                      setQuizStreak(0);
                      if (isAdaptiveMode) {
                        setQuizModeType('letter');
                      }
                    }}
                    title="পুনরায় শুরু করুন (Reset)"
                    className="p-2.5 sm:p-3 bg-[#21262d] rounded-xl sm:rounded-2xl hover:bg-[#2c313c] transition-colors border border-[#30363d] flex items-center justify-center cursor-pointer"
                  >
                    <Icon name="RotateCcw" className="w-4 h-4 sm:w-5 sm:h-5 text-[#8b949e]" />
                  </button>
                </div>
              </div>

              {/* Adaptive Difficulty Dashboard & Streak Control */}
              <div className="bg-[#0d1117]/50 rounded-[1.25rem] sm:rounded-[1.75rem] border border-[#30363d] p-4 sm:p-5 mb-6 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                      <Icon name="Zap" className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-[#f0f6fc]">অ্যাডাপ্টিভ ডিফিকাল্টি (Adaptive Difficulty)</h3>
                      <p className="text-[11px] sm:text-xs text-[#8b949e]">সঠিক উত্তরের সাথে সাথে প্রশ্নের জটিলতা বাড়বে</p>
                    </div>
                  </div>
                  
                  {/* Toggle Button */}
                  <button
                    onClick={() => {
                      const nextMode = !isAdaptiveMode;
                      setIsAdaptiveMode(nextMode);
                      speak(nextMode ? "স্বয়ংক্রিয় জটিলতা সক্রিয় করা হয়েছে" : "স্বয়ংক্রিয় জটিলতা নিষ্ক্রিয় করা হয়েছে");
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isAdaptiveMode 
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400 shadow-lg shadow-emerald-950/25' 
                        : 'bg-[#21262d] border-[#30363d] text-[#8b949e] hover:text-white'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isAdaptiveMode ? 'bg-emerald-400 animate-ping' : 'bg-gray-500'}`} />
                    {isAdaptiveMode ? 'সক্রিয় (ON)' : 'নিষ্ক্রিয় (OFF)'}
                  </button>
                </div>

                {isAdaptiveMode ? (
                  <div className="space-y-3.5">
                    {/* Visual Difficulty Tiers Progress Bar */}
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] sm:text-xs font-black text-[#8b949e]">
                      <div className={`p-1.5 rounded-lg border transition-all ${
                        quizStreak < 3 
                          ? 'bg-green-500/15 border-green-500 text-green-400 font-extrabold shadow' 
                          : 'bg-[#161b22]/40 border-transparent text-gray-500'
                      }`}>
                        সহজ (Easy)<br/>Streak 0-2
                      </div>
                      <div className={`p-1.5 rounded-lg border transition-all ${
                        quizStreak >= 3 && quizStreak < 6 
                          ? 'bg-blue-500/15 border-blue-500 text-blue-400 font-extrabold shadow' 
                          : 'bg-[#161b22]/40 border-transparent text-gray-500'
                      }`}>
                        মাঝারি (Medium)<br/>Streak 3-5
                      </div>
                      <div className={`p-1.5 rounded-lg border transition-all ${
                        quizStreak >= 6 && quizStreak < 9 
                          ? 'bg-purple-500/15 border-purple-500 text-purple-400 font-extrabold shadow' 
                          : 'bg-[#161b22]/40 border-transparent text-gray-500'
                      }`}>
                        কঠিন (Hard)<br/>Streak 6-8
                      </div>
                      <div className={`p-1.5 rounded-lg border transition-all ${
                        quizStreak >= 9 
                          ? 'bg-amber-500/15 border-amber-500 text-amber-400 font-extrabold shadow animate-pulse' 
                          : 'bg-[#161b22]/40 border-transparent text-gray-500'
                      }`}>
                        মাস্টার (Expert)<br/>Streak 9+
                      </div>
                    </div>

                    {/* Stats & Current Level Description */}
                    <div className="flex justify-between items-center bg-[#161b22]/60 px-4 py-2.5 rounded-xl border border-[#30363d]/50 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400 text-base sm:text-lg animate-bounce">🔥</span>
                        <span className="text-[#8b949e]">চলতি ধারাবাহিকতা (Streak):</span>
                        <span className="font-black text-[#f0f6fc] text-sm sm:text-base">{toBengaliNumber(quizStreak)}টি</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#8b949e]">বর্তমান স্তর:</span>
                        <span className={`font-black px-2.5 py-0.5 rounded-lg border ${
                          quizStreak < 3 ? 'text-green-400 bg-green-950/20 border-green-500/30' :
                          quizStreak < 6 ? 'text-blue-400 bg-blue-950/20 border-blue-500/30' :
                          quizStreak < 9 ? 'text-purple-400 bg-purple-950/20 border-purple-500/30' :
                          'text-amber-400 bg-amber-950/20 border-amber-500/30'
                        }`}>
                          {quizStreak < 3 ? 'স্তর ১ (সহজ)' :
                           quizStreak < 6 ? 'স্তর ২ (মাঝারি)' :
                           quizStreak < 9 ? 'স্তর ৩ (কঠিন)' :
                           'স্তর ৪ (মাস্টার)'}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2 px-3 bg-[#161b22]/40 border border-dashed border-[#30363d] rounded-xl text-xs text-[#8b949e]">
                    ডিফিকাল্টি সাধারণ মোডে আছে। নিচে ম্যানুয়ালি কুইজের ধরন নির্বাচন করুন।
                  </div>
                )}
              </div>

              {/* Quiz Mode Type Selector */}
              <div className="flex bg-[#0d1117]/80 p-1.5 rounded-2xl border border-[#30363d] gap-1.5 mb-6 sm:mb-8 relative z-10">
                <button
                  onClick={() => {
                    setIsAdaptiveMode(false);
                    setQuizModeType('letter');
                    setQuizStreak(0);
                    speak("বর্ণ সনাক্তকরণ ম্যানুয়াল কুইজ শুরু হয়েছে");
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    quizModeType === 'letter' && !isAdaptiveMode
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-950/20'
                      : 'text-[#8b949e] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>🔤 বর্ণ সনাক্তকরণ</span>
                  <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded font-normal hidden sm:inline">Letter Match</span>
                </button>
                <button
                  onClick={() => {
                    setIsAdaptiveMode(false);
                    setQuizModeType('picToWord');
                    setQuizStreak(0);
                    speak("ছবি ও শব্দ মেলানো ম্যানুয়াল কুইজ শুরু হয়েছে");
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    quizModeType === 'picToWord' && !isAdaptiveMode
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-950/20'
                      : 'text-[#8b949e] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>🖼️ ছবি ও শব্দ মেলানো</span>
                  <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded font-normal hidden sm:inline">Picture-to-Word</span>
                </button>
              </div>

              {/* Custom Quiz Filter/Subset Selector for Kids & Parents */}
              <div className="mb-6 sm:mb-8 relative z-10">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <Icon name="Filter" className="w-4 h-4 text-green-400" />
                  <span className="text-xs sm:text-sm font-black text-[#c9d1d9] tracking-wide">বর্ণের গ্রুপ নির্বাচন করুন (Select Practice Range):</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2 sm:p-3.5 bg-[#0d1117]/60 rounded-2xl border border-[#30363d]">
                  {QUIZ_SUBSETS.map((subset) => {
                    const isSelected = selectedQuizSubset === subset.id;
                    return (
                      <button
                        key={subset.id}
                        onClick={() => {
                          setSelectedQuizSubset(subset.id);
                          speak(subset.name);
                        }}
                        className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex flex-col items-center justify-center text-center border select-none ${
                          isSelected
                            ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-400 border-green-500/40 shadow-inner'
                            : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-white hover:border-[#8b949e]/30'
                        }`}
                      >
                        <span className="leading-tight text-xs sm:text-sm">{subset.name}</span>
                        <span className="text-[9px] opacity-70 font-bold mt-0.5">{subset.english}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Area */}
              <div className="text-center mb-8 sm:mb-12 relative">
                {quizState.question ? (
                  <>
                    <p className="text-[#8b949e] font-bold uppercase text-[10px] sm:text-xs tracking-widest mb-4 sm:mb-8">
                      {quizModeType === 'picToWord' ? (
                        "🖼️ ছবি দেখো → সঠিক শব্দটি নির্বাচন করো"
                      ) : (
                        quizState.isReverse ? "🔊 সাউন্ড শোনো → বর্ণ মেলাও" : "🖼️ ছবি দেখো → বর্ণ মেলাও"
                      )}
                    </p>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={quizState.question.id + quizModeType + (quizState.isReverse ? '-rev' : '-fwd')}
                        initial={{ x: 80, opacity: 0, scale: 0.95 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: -80, opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 190, damping: 21 }}
                        className="bg-[#0d1117]/60 py-8 sm:py-16 rounded-[1.5rem] sm:rounded-[2.5rem] border border-dashed border-[#30363d] shadow-inner"
                      >
                        {quizModeType === 'picToWord' ? (
                          <div className="flex flex-col items-center">
                            {quizState.question.words[0]?.img ? (
                              <img
                                src={quizState.question.words[0]?.img}
                                alt="Quiz"
                                className="w-32 h-32 sm:w-48 sm:h-48 mb-4 sm:mb-6 rounded-2xl border border-slate-700 p-2 bg-[#1a2130] shadow-xl object-contain"
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
                              src={getEmojiImage(quizState.question.words[0]?.emoji || '📚', 128)}
                              alt="Quiz Backup"
                              className={`w-32 h-32 sm:w-48 sm:h-48 mb-4 sm:mb-6 rounded-2xl border border-slate-700 p-2 bg-[#1a2130] shadow-xl object-contain ${quizState.question.words[0]?.img ? 'hidden' : 'block'}`}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.currentTarget;
                                const parent = target.parentElement;
                                if (parent) {
                                  const fallback = document.createElement('div');
                                  fallback.className = "text-6xl sm:text-7xl select-none mb-4 sm:mb-6 animate-pulse";
                                  fallback.textContent = quizState.question.words[0]?.emoji || '📚';
                                  parent.appendChild(fallback);
                                  target.style.display = 'none';
                                }
                              }}
                            />
                            <p className="text-[#8b949e] font-black text-xs sm:text-sm">
                              এই ছবির সঠিক বাংলা শব্দটি কোনটি?
                            </p>
                          </div>
                        ) : (
                          quizState.isReverse ? (
                            <div className="flex flex-col items-center">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => speak(quizState.question?.letter || '')}
                                className={`w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative animate-none ${isSpeaking ? 'speaking' : ''}`}
                              >
                                <Icon name="Volume2" className="w-8 h-8 sm:w-14 sm:h-14 text-white" />
                              </motion.button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              {quizState.question.words[0]?.img ? (
                                <img
                                  src={quizState.question.words[0]?.img}
                                  alt="Quiz"
                                  className="w-20 h-20 sm:w-32 sm:h-32 mb-2 sm:mb-6 drop-shadow-lg object-contain"
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
                                src={getEmojiImage(quizState.question.words[0]?.emoji || '📚', 128)}
                                alt="Quiz Backup"
                                className={`w-20 h-20 sm:w-32 sm:h-32 mb-2 sm:mb-6 drop-shadow-lg object-contain ${quizState.question.words[0]?.img ? 'hidden' : 'block'}`}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  const parent = target.parentElement;
                                  if (parent) {
                                    const fallback = document.createElement('div');
                                    fallback.className = "text-5xl sm:text-6xl select-none mb-2 sm:mb-6 animate-pulse";
                                    fallback.textContent = quizState.question.words[0]?.emoji || '📚';
                                    parent.appendChild(fallback);
                                    target.style.display = 'none';
                                  }
                                }}
                              />
                              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#f0f6fc] tracking-tight">
                                {quizState.question.words[0]?.word || ''}
                              </h2>
                            </div>
                          )
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </>
                ) : (
                  <div className="py-20">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#8b949e] font-bold">কুইজ তৈরি হচ্ছে...</p>
                  </div>
                )}
              </div>

              {/* Dynamic Animated Feedback Display Banner */}
              <AnimatePresence>
                {quizState.feedback && (
                  <motion.div
                    key="quiz-feedback-banner"
                    initial={{ opacity: 0, y: -25, scale: 0.85 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { type: 'spring', stiffness: 350, damping: 16 }
                    }}
                    exit={{ opacity: 0, y: 25, scale: 0.85 }}
                    className={`mb-6 p-4 sm:p-5 rounded-2xl flex items-center justify-center gap-3 border text-center font-black relative overflow-hidden shadow-lg ${
                      quizState.feedback === 'correct'
                        ? 'bg-emerald-950/45 border-emerald-500/50 text-emerald-400 shadow-emerald-950/40'
                        : 'bg-rose-950/45 border-rose-500/50 text-rose-400 shadow-rose-950/40'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2.5s_infinite]" />
                    <span className="text-2xl sm:text-3xl animate-bounce">
                      {quizState.feedback === 'correct' ? '🎉' : '😢'}
                    </span>
                    <span className="text-sm sm:text-lg">
                      {quizState.feedback === 'correct' 
                        ? 'সাবাশ! তোমার উত্তরটি সঠিক হয়েছে! 🌟' 
                        : 'উফ! উত্তরটি ভুল হয়েছে। আবার চেষ্টা করো! 💪'}
                    </span>
                    {quizState.feedback === 'correct' && (
                      <span className="text-xl sm:text-2xl animate-pulse">✨</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Options Grid */}
              {quizState.question && (
                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  {quizState.options.map((option, index) => {
                    const isSelected = quizState.selectedIndex === index;
                    const isCorrect = option.id === quizState.question?.id;

                    let btnStyles = "bg-[#161b22] border border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] hover:border-green-800/40 hover:shadow-lg";
                    if (quizState.feedback) {
                      if (isSelected && isCorrect) {
                        btnStyles = "bg-gradient-to-br from-green-600 to-emerald-700 border-green-500 text-white shadow-lg shadow-green-950/20";
                      } else if (isSelected && !isCorrect) {
                        btnStyles = "bg-gradient-to-br from-red-600 to-rose-700 border-red-500 text-white shadow-lg shadow-red-950/20";
                      } else if (isCorrect) {
                        btnStyles = "bg-gradient-to-br from-green-600 to-emerald-700 border-green-500 text-white shadow-lg shadow-green-950/10";
                      }
                    }

                    const animateState = quizState.feedback
                      ? isSelected
                        ? isCorrect
                          ? { scale: [1, 1.08, 0.95, 1], rotate: [0, 1.5, -1.5, 0] }
                          : { x: [0, -8, 8, -8, 8, 0] }
                        : isCorrect
                          ? { scale: [1, 1.04, 1] }
                          : { opacity: 0.4, scale: 0.95 }
                      : { scale: 1, x: 0, opacity: 1 };

                    const btnKey = `${quizState.question?.id || 'q'}-${option.id}-${index}-${quizModeType}`;

                    return (
                      <motion.button
                        key={btnKey}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={quizState.feedback 
                          ? animateState 
                          : { opacity: 1, y: 0, scale: 1 }
                        }
                        transition={quizState.feedback 
                          ? { duration: isSelected && !isCorrect ? 0.35 : 0.45, type: 'spring', stiffness: 220 }
                          : { delay: index * 0.05, duration: 0.35, ease: 'easeOut' }
                        }
                        whileHover={!quizState.feedback ? { scale: 1.03, y: -3 } : {}}
                        whileTap={!quizState.feedback ? { scale: 0.97 } : {}}
                        onClick={() => handleQuizAnswer(index)}
                        className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl font-black shadow-md transition-all flex flex-col items-center justify-center min-h-[100px] sm:min-h-[160px] relative border ${btnStyles}`}
                      >
                        {quizModeType === 'picToWord' ? (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-xl sm:text-3xl filter drop-shadow-md">
                              {option.words[0]?.emoji || '📚'}
                            </span>
                            <span className="text-lg sm:text-2xl md:text-3xl text-center select-none font-black tracking-tight">
                              {option.words[0]?.word}
                            </span>
                          </div>
                        ) : (
                          <span className="text-5xl sm:text-7xl md:text-8xl leading-none select-none">
                            {option.letter}
                          </span>
                        )}

                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white"
                          >
                            <Icon
                              name={isCorrect ? "CheckCircle2" : "XCircle"}
                              className="w-5 h-5 sm:w-9 sm:h-9"
                            />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* ==================== DETAIL MODALS ==================== */}
        <AnimatePresence mode="wait">
          {selectedLetter && activeMode === 'learn' && !isQuizMode && (
            <LetterDetailModal
              selectedLetter={selectedLetter}
              isSpeaking={isSpeaking}
              getSentence={getSentence}
              speak={verifyAndPlayText}
              onClose={() => setSelectedLetter(null)}
              getLetterMarkers={getLetterMarkers}
              onWordClick={handleWordClick}
              listenedWords={listenedWords}
            />
          )}
        </AnimatePresence>



        {/* 5-Day Streak Milestone Celebratory Overlay */}
        <AnimatePresence>
          {showStreakMilestone && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
            >
              {/* Confetti explosion inside modal */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => {
                  const x = Math.random() * 100;
                  const y = Math.random() * 100;
                  const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];
                  const color = colors[Math.floor(Math.random() * colors.length)];
                  const delay = Math.random() * 0.5;
                  const duration = 1.5 + Math.random() * 2;
                  return (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 1, 
                        scale: 0,
                        x: "50vw",
                        y: "50vh",
                        backgroundColor: color,
                        borderRadius: Math.random() > 0.5 ? "50%" : "0%"
                      }}
                      animate={{ 
                        opacity: [1, 1, 0],
                        scale: [0, 1.2, 0.8, 0],
                        x: `${x}vw`,
                        y: `${y}vh`,
                        rotate: Math.random() * 720
                      }}
                      transition={{ 
                        duration, 
                        ease: "easeOut",
                        delay
                      }}
                      className="absolute w-3 h-3 pointer-events-none"
                    />
                  );
                })}
              </div>

              <motion.div
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                className="bg-gradient-to-b from-[#1a2130] to-[#101520] border-4 border-amber-500/50 p-6 sm:p-10 rounded-3xl max-w-md w-full text-center shadow-2xl relative overflow-hidden"
              >
                {/* Golden radiating aura */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="w-28 h-28 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30 border-4 border-white/20"
                >
                  <span className="text-5xl filter drop-shadow-md">🏆</span>
                </motion.div>

                <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-3 tracking-tight">
                  দারুণ মাইলফলক!
                </h2>
                <h3 className="text-xl font-bold text-white mb-4">
                  টানা ৫ দিনের লার্নিং স্ট্রিক! 🔥
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                  তুমি প্রতিদিন মনোযোগ দিয়ে বাংলা ও আরবি वर्णমালা অনুশীলন করছো। এই চমৎকার অভ্যাসটি বজায় রাখো এবং নিয়মিত নতুন নতুন বর্ণ শেখো!
                </p>

                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      const shareTitle = "৫ দিনের লার্নিং স্ট্রিক! 🏆";
                      const shareText = "আমি সোনার বাংলা ও আরবি বর্ণমালা অ্যাপে টানা ৫ দিনের লার্নিং স্ট্রিক অর্জন করেছি! 🏆🔥 আপনিও শিখুন:";
                      const shareUrl = window.location.href;
                      
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title: shareTitle,
                            text: `${shareText}\n`,
                            url: shareUrl
                          });
                          speak("শেয়ার করার জন্য ধন্যবাদ!");
                        } catch (err) {
                          console.log("Web Share failed, attempting fallback:", err);
                        }
                      } else {
                        try {
                          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
                          setShareCopied(true);
                          speak("লিঙ্ক কপি করা হয়েছে!");
                          setTimeout(() => setShareCopied(false), 3000);
                        } catch (err) {
                          console.error("Clipboard copy failed:", err);
                        }
                      }
                    }}
                    className="w-full bg-slate-800/80 border border-slate-700 text-amber-400 hover:text-amber-300 hover:bg-slate-700/80 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Icon name={shareCopied ? "Check" : "Share2"} className="w-5 h-5 text-amber-400" />
                    <span>{shareCopied ? "লিঙ্ক কপি করা হয়েছে! 📋" : "বন্ধুদের সাথে শেয়ার করো 🚀"}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowStreakMilestone(false);
                      speak("অনুশীলন চালিয়ে যাও");
                    }}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 py-4 sm:py-4.5 rounded-2xl font-black text-lg shadow-lg shadow-orange-500/20 transition-all cursor-pointer border-t border-white/20"
                  >
                    ধন্যবাদ, অনুশীলন করব! 🚀
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Daily Mission Golden Badge Celebration Modal */}
        <AnimatePresence>
          {showBadgeClaimedModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
            >
              {/* Gold particle explosion inside modal */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 40 }).map((_, i) => {
                  const x = Math.random() * 100;
                  const y = Math.random() * 100;
                  const colors = ['#fbbf24', '#f59e0b', '#d97706', '#fef08a', '#fb7185'];
                  const color = colors[Math.floor(Math.random() * colors.length)];
                  const delay = Math.random() * 0.5;
                  const duration = 2.0 + Math.random() * 2;
                  return (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 1, 
                        scale: 0,
                        x: "50vw",
                        y: "50vh",
                        backgroundColor: color,
                        borderRadius: "50%"
                      }}
                      animate={{ 
                        opacity: [1, 1, 0],
                        scale: [0, 1.5, 1.0, 0],
                        x: [`50vw`, `${x}vw`],
                        y: [`50vh`, `${y}vh`],
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration,
                        delay,
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                      className="absolute w-2 h-2"
                    />
                  );
                })}
              </div>

              <motion.div
                initial={{ scale: 0.85, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.85, y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-[#161b22] border-4 border-amber-500/60 p-6 sm:p-10 rounded-3xl max-w-md w-full shadow-2xl relative text-center z-10 overflow-hidden"
              >
                {/* Decorative background lights */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => {
                      setShowBadgeClaimedModal(false);
                      speak("বন্ধ করা হয়েছে");
                    }}
                    className="text-slate-400 hover:text-white bg-slate-800/50 p-2 rounded-full transition-all cursor-pointer border-none outline-none"
                  >
                    <Icon name="X" className="w-5 h-5" />
                  </button>
                </div>

                {/* Animated Golden Badge */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-28 h-28 mx-auto bg-gradient-to-tr from-yellow-400 via-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-amber-200/40 text-5xl mb-6 relative"
                >
                  🏅
                  <span className="absolute -bottom-2 bg-slate-950 text-amber-400 text-[10px] font-black px-3 py-1 rounded-full border border-amber-500/30 tracking-widest uppercase shadow-md font-mono">
                    GOLDEN
                  </span>
                </motion.div>

                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 leading-tight">
                    গোল্ডেন বাংলা ব্যাজ!
                  </h2>
                  <p className="text-[#8b949e] text-xs sm:text-sm font-black uppercase tracking-widest mt-1.5 font-mono">
                    Daily Missions Complete
                  </p>
                </div>

                <p className="text-slate-200 text-sm sm:text-base font-bold leading-relaxed mb-6">
                  অসাধারণ কাজ! তুমি আজকের সবগুলো লার্নিং মিশন সফলভাবে সম্পন্ন করেছ। এই অর্জনের জন্য তোমাকে <span className="text-amber-400 font-extrabold">গোল্ডেন বাংলা ব্যাজ (Golden Bangla Badge)</span> দেওয়া হলো! তোমার লার্নিং স্ট্রিকও বাড়িয়ে দেওয়া হয়েছে।
                </p>

                {/* Accomplished Missions Checklist */}
                <div className="bg-[#0d1117] border border-[#30363d] p-4 rounded-2xl text-left mb-6 space-y-2">
                  <h4 className="text-xs font-black text-[#8b949e] uppercase mb-1">অর্জিত সফল মিশনসমূহ (Achievements):</h4>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <span className="text-teal-400">✓</span>
                    <span>৫টি বর্ণ বা শব্দের উচ্চারণ শুনেছ</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <span className="text-purple-400">✓</span>
                    <span>৩টি বর্ণ লেখার বা আঁকার অনুশীলন করেছ</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <span className="text-amber-400">✓</span>
                    <span>১টি কুইজ বা স্ক্র্যাম্বল গেমের সঠিক উত্তর দিয়েছ</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      const shareTitle = "আজকের গোল্ডেন বাংলা ব্যাজ অর্জিত! 🏅";
                      const shareText = "আমি আজকের সবগুলো ডেইলি মিশন শেষ করে স্পেশাল 'গোল্ডেন বাংলা ব্যাজ' অর্জন করেছি! 🏅 আপনিও আমার সাথে বাংলা শিখুন:";
                      const shareUrl = window.location.href;
                      
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title: shareTitle,
                            text: `${shareText}\n`,
                            url: shareUrl
                          });
                          speak("শেয়ার করার জন্য ধন্যবাদ!");
                        } catch (err) {
                          console.log("Web Share failed, attempting fallback:", err);
                        }
                      } else {
                        try {
                          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
                          setShareCopied(true);
                          speak("লিঙ্ক কপি করা হয়েছে!");
                          setTimeout(() => setShareCopied(false), 3000);
                        } catch (err) {
                          console.error("Clipboard copy failed:", err);
                        }
                      }
                    }}
                    className="w-full bg-slate-800/80 border border-slate-700 text-amber-400 hover:text-amber-300 hover:bg-slate-700/80 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Icon name={shareCopied ? "Check" : "Share2"} className="w-5 h-5 text-amber-400" />
                    <span>{shareCopied ? "লিঙ্ক কপি করা হয়েছে! 📋" : "বন্ধুদের সাথে শেয়ার করো 🚀"}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowBadgeClaimedModal(false);
                      speak("চমৎকার, খেলা চালিয়ে যাও!");
                    }}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 py-4 rounded-2xl font-black text-lg shadow-lg shadow-orange-500/20 transition-all cursor-pointer border-t border-white/20"
                  >
                    ব্যাজটি গ্রহণ করলাম! 🏅
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Daily Challenge Celebration Modal */}
        <AnimatePresence>
          {showChallengeCelebration && (() => {
            const challenge = dailyChallenge;
            if (!challenge) return null;

            return (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-950/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
              >
                {/* Rainbow star confetti inside modal */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 45 }).map((_, i) => {
                    const x = Math.random() * 100;
                    const y = Math.random() * 100;
                    const colors = ['#818cf8', '#a78bfa', '#f472b6', '#fb7185', '#34d399', '#fbbf24'];
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    const delay = Math.random() * 0.4;
                    const duration = 1.6 + Math.random() * 1.8;
                    return (
                      <motion.div
                        key={i}
                        initial={{ 
                          opacity: 1, 
                          scale: 0,
                          x: "50vw",
                          y: "50vh",
                          backgroundColor: color,
                          borderRadius: Math.random() > 0.4 ? "50%" : "20%"
                        }}
                        animate={{ 
                          opacity: [1, 1, 0],
                          scale: [0, 1.4, 0.9, 0],
                          x: `${x}vw`,
                          y: `${y}vh`,
                          rotate: Math.random() * 360
                        }}
                        transition={{ 
                          duration, 
                          ease: "easeOut",
                          delay
                        }}
                        className="absolute w-3.5 h-3.5 pointer-events-none"
                      />
                    );
                  })}
                </div>

                <motion.div 
                  initial={{ scale: 0.8, y: 50, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.8, y: 50, opacity: 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 100 }}
                  className="bg-[#161b22] border border-indigo-500/30 p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl relative text-center overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                  {/* Confetti graphics background */}
                  <div className="text-6xl sm:text-7xl mb-4 animate-bounce mt-2">{challenge.icon}</div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                    অভিনন্দন! (Congratulations!) 🎉
                  </h3>
                  
                  <p className="text-xs sm:text-sm font-bold text-slate-300 leading-relaxed mb-6">
                    তুমি আজকের স্পেশাল ডেইলি চ্যালেঞ্জ <span className="text-indigo-400 font-extrabold">"{challenge.bnTitle}"</span> সফলভাবে সম্পন্ন করেছ! 
                    তুমি পুরস্কার হিসেবে <span className="text-amber-400 font-extrabold">+{challenge.rewardPoints} পয়েন্ট 🌟</span> লাভ করেছ।
                  </p>

                  <div className="bg-[#0d1117] border border-[#30363d] p-4 rounded-2xl text-left mb-6 space-y-2">
                    <h4 className="text-xs font-black text-indigo-400 uppercase mb-1">চ্যালেঞ্জের বিবরণী (Challenge Log):</h4>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                      <span className="text-emerald-400">✓</span>
                      <span>চ্যালেঞ্জ: {challenge.title} ({challenge.bnTitle})</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                      <span className="text-emerald-400">✓</span>
                      <span>লক্ষ্যপূরণ: {challenge.targetCount} / {challenge.targetCount} বার সম্পন্ন হয়েছে</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowChallengeCelebration(false);
                        speak("দারুণ হয়েছে! খেলা চালিয়ে যাও!");
                      }}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white py-3.5 rounded-2xl font-black text-base shadow-lg shadow-indigo-500/20 transition-all cursor-pointer border-t border-white/10"
                    >
                      অসাধারণ, ধন্যবাদ! 🌟
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
 
        {/* Dedicated Sound & Music Settings Modal */}
        <AnimatePresence>
          {showSettingsModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/85 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-[#161b22] border border-slate-700/80 p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl relative text-left overflow-hidden"
              >
                {/* Visual accent top line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500"></div>

                {/* Close Button X */}
                <button
                  onClick={() => {
                    setShowSettingsModal(false);
                    speak("সেটিংস বন্ধ করা হয়েছে");
                  }}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 hover:bg-slate-800/80 rounded-full transition-all cursor-pointer"
                >
                  <Icon name="X" className="w-5 h-5" />
                </button>

                <div className="mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
                      <Icon name="Sliders" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                        শব্দ ও সুর সেটিংস ⚙️
                      </h3>
                      <p className="text-[11px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wider">
                        Audio & Music Settings
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 font-bold mt-3 leading-relaxed">
                    এখানে তুমি ব্যাকগ্রাউন্ড মিউজিক এবং গেমের সাউন্ড কন্ট্রোল করতে পারবে (Customize sound and ambient music preferences individually).
                  </p>
                </div>

                {/* Option Toggles */}
                <div className="space-y-4 mb-6">
                  {/* Option 1: Main Speech Voice */}
                  <div className="p-4 bg-[#0d1117] border border-[#21262d] rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isAudioMuted ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                        <Icon name={isAudioMuted ? "VolumeX" : "Volume2"} className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-white">উচ্চারণ ও প্রধান ভয়েস</h4>
                        <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5">Main Speech & TTS Pronunciation</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleAudioMuted}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isAudioMuted ? 'bg-slate-700' : 'bg-emerald-500'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isAudioMuted ? 'translate-x-0' : 'translate-x-5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Option 2: Success Chimes & SFX */}
                  <div className="p-4 bg-[#0d1117] border border-[#21262d] rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${!isChimesEnabled ? 'bg-slate-800 text-slate-500' : 'bg-amber-500/10 text-amber-400 animate-pulse'}`}>
                        <Icon name="Sparkles" className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-white">সাফল্যের ঘণ্টা ও শব্দ</h4>
                        <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5">Success Chimes & Game Sound Effects</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleChimes}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        !isChimesEnabled ? 'bg-slate-700' : 'bg-amber-500'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          !isChimesEnabled ? 'translate-x-0' : 'translate-x-5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Option 3: Ambient Background Music */}
                  <div className="p-4 bg-[#0d1117] border border-[#21262d] rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${!isBgMusicEnabled ? 'bg-slate-800 text-slate-500' : 'bg-indigo-500/10 text-indigo-400'}`}>
                        <Icon name="Music" className="w-5 h-5 animate-bounce" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-white">শান্ত আবহ ব্যাকগ্রাউন্ড মিউজিক</h4>
                        <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5">Relaxing Ambient Background Tune</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleBgMusic}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        !isBgMusicEnabled ? 'bg-slate-700' : 'bg-indigo-500'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          !isBgMusicEnabled ? 'translate-x-0' : 'translate-x-5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Option 4: Global Font Size */}
                  <div className="p-4 bg-[#0d1117] border border-[#21262d] rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
                        <Icon name="Type" className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-white">লেখা বা অক্ষরের আকার (Font Size)</h4>
                        <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5">Global Font Size & Readability</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {(['small', 'medium', 'large'] as const).map((size) => {
                        const labels = {
                          small: { bn: 'ছোট', en: 'Small' },
                          medium: { bn: 'মাঝারি', en: 'Medium' },
                          large: { bn: 'বড় ✨', en: 'Large' },
                        };
                        const isActive = globalFontSize === size;
                        return (
                          <button
                            key={size}
                            onClick={() => {
                              setGlobalFontSize(size);
                              if (size === 'small') {
                                speak("অক্ষরের আকার ছোট করা হয়েছে");
                              } else if (size === 'medium') {
                                speak("অক্ষরের আকার মাঝারি করা হয়েছে");
                              } else {
                                speak("অক্ষরের আকার বড় করা হয়েছে");
                              }
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-black transition-all border select-none cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                              isActive
                                ? 'bg-gradient-to-r from-teal-500/20 to-indigo-500/20 border-teal-400 text-teal-300 shadow-sm shadow-teal-500/10'
                                : 'bg-[#161b22]/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                            }`}
                          >
                            <span className="text-sm font-black">{labels[size].bn}</span>
                            <span className="text-[9px] opacity-75 font-semibold tracking-wider uppercase">{labels[size].en}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowSettingsModal(false);
                      speak("মনোযোগ দিয়ে পড়াশোনা করো সোনামণি!");
                    }}
                    className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white py-3 rounded-2xl font-black text-base shadow-lg transition-all cursor-pointer border-t border-white/15"
                  >
                    সেটিংস সংরক্ষণ করুন (Save Settings) 👍
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Login Modal */}
        <AnimatePresence>
          {showLoginModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-[#161b22] border-2 border-teal-500/40 p-6 sm:p-8 rounded-3xl max-w-sm w-full shadow-2xl relative text-left"
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => {
                      setShowLoginModal(false);
                      speak("বাতিল করা হয়েছে");
                    }}
                    className="text-slate-400 hover:text-white bg-slate-800/50 p-1.5 rounded-full transition-all cursor-pointer border-none outline-none"
                  >
                    <Icon name="X" className="w-4 h-4" />
                  </button>
                </div>

                {loginView === 'login' && (
                  <>
                    <div className="text-center mb-6">
                      <span className="text-4xl">🔐</span>
                      <h2 className="text-2xl font-black text-[#f0f6fc] mt-2">অ্যাডমিন লগইন</h2>
                      <p className="text-xs text-teal-400 font-bold mt-1 uppercase tracking-wider">Admin Control Panel</p>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (captchaInput.trim().toUpperCase() !== captchaCode) {
                        setLoginError('ভুল ক্যাপচা কোড! আবার চেষ্টা করুন।');
                        speak("ভুল ক্যাপচা");
                        generateCaptcha();
                        return;
                      }
                      if (loginUsername === 'Bangladesh1971' && loginPassword === adminPassword) {
                        if (is2faEnabled) {
                          setLoginView('2fa' as any);
                          setLogin2faCode('');
                          setLoginError('');
                          speak("দয়া করে গুগল অথেনটিকেটর থেকে ওটিপি কোডটি প্রবেশ করান।");
                        } else {
                          setIsLoggedIn(true);
                          localStorage.setItem('bangla_admin_logged_in', 'true');
                          setShowLoginModal(false);
                          setLoginError('');
                          speak("লগইন সফল হয়েছে! এখন যেকোনো ছবির উপর ডান ক্লিক করে ছবি পরিবর্তন করতে পারবেন।");
                        }
                      } else {
                        setLoginError('ভুল ইউজারনেম বা পাসওয়ার্ড! আবার চেষ্টা করুন।');
                        speak("ভুল হয়েছে");
                        generateCaptcha();
                      }
                    }} className="space-y-4">
                      <div>
                        <label className="block text-xs font-black text-slate-300 mb-1.5">ইউজারনেম (Username):</label>
                        <input
                          type="text"
                          required
                          value={loginUsername}
                          onChange={(e) => setLoginUsername(e.target.value)}
                          placeholder="ইউজারনেম লিখুন..."
                          className="block w-full px-4 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-black"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-300 mb-1.5">পাসওয়ার্ড (Password):</label>
                        <input
                          type="password"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••"
                          className="block w-full px-4 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-black"
                        />
                      </div>

                      {/* Captcha Block */}
                      <div>
                        <label className="block text-xs font-black text-slate-300 mb-1.5">নিরাপত্তা ক্যাপচা (Security Captcha):</label>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-1 bg-gradient-to-r from-teal-900/30 to-indigo-900/30 border border-[#30363d] rounded-xl h-11 flex items-center justify-center relative overflow-hidden select-none">
                            {/* Decorative noisy stripes for captcha security */}
                            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_50%,#ccc_50%,#ccc_75%,transparent_75%,transparent)] bg-[size:10px_10px]"></div>
                            <span className="font-mono text-xl font-black tracking-widest text-teal-400 select-none italic line-through decoration-indigo-500 decoration-2">
                              {captchaCode}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              generateCaptcha();
                              speak("নতুন ক্যাপচা");
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-700 transition-all cursor-pointer flex items-center justify-center"
                            title="নতুন কোড জেনারেট করুন"
                          >
                            <Icon name="RotateCcw" className="w-5 h-5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          required
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          placeholder="উপরের ৪টি অক্ষর টাইপ করুন..."
                          className="block w-full px-4 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-black uppercase tracking-widest text-center"
                        />
                      </div>

                      {loginError && (
                        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-xs font-black text-center leading-relaxed">
                          {loginError}
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setLoginView('forgot');
                            setResetEmail('');
                            setLoginError('');
                            speak("পাসওয়ার্ড ভুলে গেছেন");
                          }}
                          className="text-xs text-teal-400 hover:text-teal-300 font-bold transition-all underline decoration-dotted cursor-pointer"
                        >
                          পাসওয়ার্ড ভুলে গেছেন? (Forgot Password)
                        </button>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowLoginModal(false);
                            speak("বাতিল করা হয়েছে");
                          }}
                          className="flex-1 py-2.5 bg-slate-800 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer"
                        >
                          বাতিল
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-teal-950/30 transition-all cursor-pointer"
                        >
                          লগইন করুন
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {loginView as any === '2fa' && (
                  <>
                    <div className="text-center mb-6">
                      <span className="text-4xl">🔐</span>
                      <h2 className="text-2xl font-black text-[#f0f6fc] mt-2">২FA যাচাইকরণ</h2>
                      <p className="text-xs text-teal-400 font-bold mt-1 uppercase tracking-wider">Two-Factor Authentication</p>
                    </div>

                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      setIs2faVerifyingForLogin(true);
                      const isOtpValid = await verifyTOTP(temp2faSecret, login2faCode);
                      setIs2faVerifyingForLogin(false);
                      if (isOtpValid) {
                        setIsLoggedIn(true);
                        localStorage.setItem('bangla_admin_logged_in', 'true');
                        setShowLoginModal(false);
                        setLoginError('');
                        setLogin2faCode('');
                        speak("লগইন সফল হয়েছে! অ্যাডমিন প্যানেলে স্বাগতম।");
                      } else {
                        setLoginError('ভুল ২FA ভেরিফিকেশন কোড! দয়া করে আপনার গুগল অথেনটিকেটর অ্যাপ দেখে সঠিক কোডটি দিন।');
                        speak("ভুল কোড");
                      }
                    }} className="space-y-4">
                      <div className="p-3 bg-teal-500/5 rounded-2xl border border-teal-500/20 text-xs text-slate-300 leading-relaxed font-semibold text-center">
                        আপনার অ্যাকাউন্টটি সুরক্ষার জন্য ২FA সক্রিয় করা রয়েছে। আপনার Google Authenticator অ্যাপে প্রদর্শিত ৬ ডিজিটের কোডটি দিন।
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-300 mb-1.5 text-center">৬-ডিজিটের ২FA কোড (6-Digit 2FA Code):</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={login2faCode}
                          onChange={(e) => setLogin2faCode(e.target.value.replace(/\D/g, ''))}
                          placeholder="••••••"
                          className="block w-full text-center tracking-widest text-lg font-mono px-4 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-xl text-teal-400 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                        />
                      </div>

                      {loginError && (
                        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-xs font-black text-center leading-relaxed">
                          {loginError}
                        </div>
                      )}

                      <div className="pt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setLoginView('login');
                            setLoginError('');
                            speak("লগইনে ফিরে যান");
                          }}
                          className="flex-1 py-2.5 bg-slate-800 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer"
                        >
                          ফিরে যান
                        </button>
                        <button
                          type="submit"
                          disabled={is2faVerifyingForLogin}
                          className="flex-1 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-teal-950/30 transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                        >
                          {is2faVerifyingForLogin ? 'যাচাই করা হচ্ছে...' : 'প্রবেশ করুন'}
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {loginView === 'forgot' && (
                  <>
                    <div className="text-center mb-6">
                      <span className="text-4xl">🔑</span>
                      <h2 className="text-2xl font-black text-[#f0f6fc] mt-2">পাসওয়ার্ড পুনরুদ্ধার</h2>
                      <p className="text-xs text-teal-400 font-bold mt-1 uppercase tracking-wider">Forgot Password Reset</p>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      // Normalise strings to support various typing styles
                      const normalEmail = resetEmail.trim().toLowerCase().replace('@', '');
                      const targetEmail1 = 'ismailbetagibarguna777gmail.com';
                      const targetEmail2 = 'ismailbetagibarguna777@gmail.com'.toLowerCase().replace('@', '');
                      
                      if (normalEmail === targetEmail1 || normalEmail === targetEmail2) {
                        const otp = Math.floor(100000 + Math.random() * 900000).toString();
                        setGeneratedOtp(otp);
                        setOtpInput('');
                        setLoginError('');
                        
                        // Set simulated email notification
                        setSimulatedEmail({
                          to: resetEmail,
                          subject: "🔒 Bangla Learn Admin OTP Verification",
                          body: "Hi Admin, you requested to reset your password. Please use the verification code below to authorize your request:",
                          otp: otp
                        });
                        
                        setLoginView('otp');
                        speak("সফল হয়েছে! ইমেইলে একটি ওটিপি পাঠানো হয়েছে। অনুগ্রহ করে চেক করুন।");
                      } else {
                        setLoginError('ভুল ইমেইল ঠিকানা! দয়া করে সঠিক ইমেইলটি প্রবেশ করান।');
                        speak("ভুল ইমেইল");
                      }
                    }} className="space-y-4">
                      <div className="p-3 bg-teal-500/5 rounded-2xl border border-teal-500/20 text-xs text-slate-300 leading-relaxed font-semibold">
                        পাসওয়ার্ড রিসেটের জন্য আপনার রেজিস্টার্ড ইমেইল এড্রেস প্রবেশ করান। একটি ওটিপি ভেরিফিকেশন কোড পাঠানো হবে।
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-300 mb-1.5">ইমেইল এড্রেস (Registered Email):</label>
                        <input
                          type="text"
                          required
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="আপনার ইমেইল লিখুন..."
                          className="block w-full px-4 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-semibold"
                        />
                      </div>

                      {loginError && (
                        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-xs font-black text-center leading-relaxed">
                          {loginError}
                        </div>
                      )}

                      <div className="pt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setLoginView('login');
                            setLoginError('');
                            speak("লগইনে ফিরে যান");
                          }}
                          className="flex-1 py-2.5 bg-slate-800 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer"
                        >
                          ফিরে যান
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-teal-950/30 transition-all cursor-pointer"
                        >
                          ওটিপি পাঠান
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {loginView === 'otp' && (
                  <>
                    <div className="text-center mb-6">
                      <span className="text-4xl">📨</span>
                      <h2 className="text-2xl font-black text-[#f0f6fc] mt-2">ওটিপি যাচাই করুন</h2>
                      <p className="text-xs text-amber-400 font-bold mt-1 uppercase tracking-wider">Enter OTP Code</p>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (otpInput.trim() === generatedOtp) {
                        setLoginError('');
                        setNewPasswordInput('');
                        setNewPasswordConfirmInput('');
                        setLoginView('reset');
                        speak("ওটিপি সঠিক হয়েছে! এখন নতুন পাসওয়ার্ড সেট করুন।");
                      } else {
                        setLoginError('ভুল ওটিপি কোড! আবার চেষ্টা করুন বা নতুন ওটিপি পাঠান।');
                        speak("ভুল ওটিপি");
                      }
                    }} className="space-y-4">
                      <div className="p-3 bg-amber-500/5 rounded-2xl border border-amber-500/20 text-xs text-slate-300 leading-relaxed font-semibold">
                        আমরা <span className="text-amber-400 font-bold">{resetEmail}</span> ঠিকানায় একটি ওটিপি পাঠিয়েছি। কোডটি নিচে প্রবেশ করান।
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-300 mb-1.5">৬-ডিজিটের ওটিপি কোড (6-digit OTP):</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                          placeholder="••••••"
                          className="block w-full text-center tracking-widest text-lg font-mono px-4 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-xl text-amber-400 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      {loginError && (
                        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-xs font-black text-center leading-relaxed">
                          {loginError}
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            const otp = Math.floor(100000 + Math.random() * 900000).toString();
                            setGeneratedOtp(otp);
                            setOtpInput('');
                            setLoginError('');
                            setSimulatedEmail({
                              to: resetEmail,
                              subject: "🔒 Bangla Learn Admin OTP Verification",
                              body: "Hi Admin, you requested to reset your password. Please use the verification code below to authorize your request:",
                              otp: otp
                            });
                            speak("নতুন ওটিপি কোড পাঠানো হয়েছে");
                          }}
                          className="text-xs text-amber-400 hover:text-amber-300 font-bold transition-all underline decoration-dotted cursor-pointer"
                        >
                          আবার কোড পাঠান (Resend OTP Code)
                        </button>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setLoginView('forgot');
                            setLoginError('');
                            speak("ফিরে যান");
                          }}
                          className="flex-1 py-2.5 bg-slate-800 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer"
                        >
                          ফিরে যান
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-orange-950/30 transition-all cursor-pointer"
                        >
                          কোড যাচাই করুন
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {loginView === 'reset' && (
                  <>
                    <div className="text-center mb-6">
                      <span className="text-4xl">🛠️</span>
                      <h2 className="text-2xl font-black text-[#f0f6fc] mt-2">নতুন পাসওয়ার্ড</h2>
                      <p className="text-xs text-emerald-400 font-bold mt-1 uppercase tracking-wider">Set New Password</p>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (newPasswordInput.length < 4) {
                        setLoginError('পাসওয়ার্ডটি অন্তত ৪ সংখ্যার হতে হবে!');
                        speak("খুব ছোট পাসওয়ার্ড");
                        return;
                      }
                      if (newPasswordInput !== newPasswordConfirmInput) {
                        setLoginError('পাসওয়ার্ড দুটি মেলেনি! আবার টাইপ করুন।');
                        speak("পাসওয়ার্ড মেলেনি");
                        return;
                      }

                      setAdminPassword(newPasswordInput);
                      localStorage.setItem('bangla_admin_password', newPasswordInput);
                      setLoginError('');
                      setLoginView('login');
                      setLoginPassword('');
                      setCaptchaInput('');
                      generateCaptcha();
                      setSimulatedEmail(null);
                      speak("অভিনন্দন! আপনার পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে। এখন নতুন পাসওয়ার্ড দিয়ে লগইন করুন।");
                    }} className="space-y-4">
                      <div className="p-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 text-xs text-slate-300 leading-relaxed font-semibold">
                        আপনার অ্যাডমিন প্যানেলের জন্য একটি শক্তিশালী নতুন পাসওয়ার্ড টাইপ করুন।
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-300 mb-1.5">নতুন পাসওয়ার্ড (New Password):</label>
                        <input
                          type="password"
                          required
                          value={newPasswordInput}
                          onChange={(e) => setNewPasswordInput(e.target.value)}
                          placeholder="••••"
                          className="block w-full px-4 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-black"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-300 mb-1.5">পাসওয়ার্ড নিশ্চিত করুন (Confirm Password):</label>
                        <input
                          type="password"
                          required
                          value={newPasswordConfirmInput}
                          onChange={(e) => setNewPasswordConfirmInput(e.target.value)}
                          placeholder="••••"
                          className="block w-full px-4 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-black"
                        />
                      </div>

                      {loginError && (
                        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-xs font-black text-center leading-relaxed">
                          {loginError}
                        </div>
                      )}

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-emerald-950/30 transition-all cursor-pointer"
                        >
                          পাসওয়ার্ড পরিবর্তন সম্পন্ন করুন
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Settings & Google Authenticator Modal */}
        <AnimatePresence>
          {showAdminSettingsModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-[#161b22] border-2 border-teal-500/30 p-5 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative text-left"
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => {
                      setShowAdminSettingsModal(false);
                      speak("বন্ধ করা হয়েছে");
                    }}
                    className="text-slate-400 hover:text-white bg-slate-800/50 p-1.5 rounded-full transition-all cursor-pointer border-none outline-none"
                  >
                    <Icon name="X" className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center mb-6">
                  <span className="text-4xl">👑</span>
                  <h2 className="text-2xl font-black text-[#f0f6fc] mt-2">অ্যাডমিন নিরাপত্তা সেটিংস</h2>
                  <p className="text-xs text-teal-400 font-bold mt-1 uppercase tracking-wider">Admin Security Settings</p>
                </div>

                {/* Info Messages */}
                {adminSettingsError && (
                  <div className="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-2xl text-xs font-black text-center">
                    {adminSettingsError}
                  </div>
                )}
                {adminSettingsSuccess && (
                  <div className="mb-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-2xl text-xs font-black text-center">
                    {adminSettingsSuccess}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Tab 1: Password Reset Option */}
                  <div className="p-4 bg-[#0d1117] rounded-2xl border border-[#30363d]">
                    <h3 className="text-sm font-black text-slate-200 mb-3 flex items-center gap-1.5 border-b border-[#30363d] pb-2">
                      <span>🔑</span> পাসওয়ার্ড পরিবর্তন করুন (Reset Password)
                    </h3>
                    
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setAdminSettingsError('');
                      setAdminSettingsSuccess('');

                      if (currentPasswordInput !== adminPassword) {
                        setAdminSettingsError('বর্তমান পাসওয়ার্ডটি সঠিক নয়!');
                        speak("ভুল পাসওয়ার্ড");
                        return;
                      }
                      if (newAdminPasswordInput.length < 4) {
                        setAdminSettingsError('পাসওয়ার্ডটি অন্তত ৪ সংখ্যার হতে হবে!');
                        speak("খুব ছোট পাসওয়ার্ড");
                        return;
                      }
                      if (newAdminPasswordInput !== confirmAdminPasswordInput) {
                        setAdminSettingsError('নতুন পাসওয়ার্ড দুটি মেলেনি!');
                        speak("পাসওয়ার্ড মেলেনি");
                        return;
                      }

                      setAdminPassword(newAdminPasswordInput);
                      localStorage.setItem('bangla_admin_password', newAdminPasswordInput);
                      setAdminSettingsSuccess('আপনার পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!');
                      setCurrentPasswordInput('');
                      setNewAdminPasswordInput('');
                      setConfirmAdminPasswordInput('');
                      speak("পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে");
                    }} className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 mb-1">বর্তমান পাসওয়ার্ড:</label>
                        <input
                          type="password"
                          required
                          value={currentPasswordInput}
                          onChange={(e) => setCurrentPasswordInput(e.target.value)}
                          placeholder="••••"
                          className="block w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-xl text-white placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs font-semibold"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 mb-1">নতুন পাসওয়ার্ড:</label>
                          <input
                            type="password"
                            required
                            value={newAdminPasswordInput}
                            onChange={(e) => setNewAdminPasswordInput(e.target.value)}
                            placeholder="••••"
                            className="block w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-xl text-white placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 mb-1">নিশ্চিত করুন:</label>
                          <input
                            type="password"
                            required
                            value={confirmAdminPasswordInput}
                            onChange={(e) => setConfirmAdminPasswordInput(e.target.value)}
                            placeholder="••••"
                            className="block w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-xl text-white placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs font-semibold"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full mt-1.5 py-2 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-all"
                      >
                        পাসওয়ার্ড আপডেট করুন
                      </button>
                    </form>
                  </div>

                  {/* Tab 2: Google Authenticator 2FA */}
                  <div className="p-4 bg-[#0d1117] rounded-2xl border border-[#30363d]">
                    <h3 className="text-sm font-black text-slate-200 mb-3 flex items-center gap-1.5 border-b border-[#30363d] pb-2">
                      <span>🛡️</span> গুগল অথেনটিকেটর ২FA (Google Authenticator)
                    </h3>

                    {is2faEnabled ? (
                      <div className="space-y-4">
                        <div className="flex items-start gap-2.5 p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <span className="text-xl">✅</span>
                          <div>
                            <p className="text-xs font-black text-emerald-400">২-ধাপ ভেরিফিকেশন (2FA) সক্রিয় রয়েছে</p>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                              অ্যাকাউন্টের সর্বোচ্চ নিরাপত্তা নিশ্চিত করা হয়েছে। নতুন ব্রাউজার থেকে লগইন করার সময় গুগল অথেনটিকেটর কোডের প্রয়োজন হবে।
                            </p>
                          </div>
                        </div>

                        {/* Disable Flow */}
                        <div className="pt-2 border-t border-[#30363d] space-y-3">
                          <p className="text-[10px] font-bold text-slate-400">নিষ্ক্রিয় করতে আপনার Google Authenticator অ্যাপ থেকে ওটিপি লিখুন:</p>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              maxLength={6}
                              value={verification2faInput}
                              onChange={(e) => setVerification2faInput(e.target.value.replace(/\D/g, ''))}
                              placeholder="৬-সংখ্যার কোড"
                              className="flex-1 px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-xl text-white placeholder-slate-700 text-xs font-mono text-center tracking-widest focus:outline-none"
                            />
                            <button
                              onClick={async () => {
                                setAdminSettingsError('');
                                setAdminSettingsSuccess('');
                                if (verification2faInput.length !== 6) {
                                  setAdminSettingsError('দয়া করে ৬ ডিজিটের সম্পূর্ণ কোডটি দিন!');
                                  speak("কোড মেলেনি");
                                  return;
                                }
                                const isOtpValid = await verifyTOTP(temp2faSecret, verification2faInput);
                                if (isOtpValid) {
                                  setIs2faEnabled(false);
                                  localStorage.setItem('bangla_admin_2fa_enabled', 'false');
                                  setVerification2faInput('');
                                  setAdminSettingsSuccess('গুগল অথেনটিকেটর ২-ধাপ ভেরিফিকেশন সফলভাবে নিষ্ক্রিয় করা হয়েছে।');
                                  speak("নিষ্ক্রিয় সম্পন্ন হয়েছে");
                                } else {
                                  setAdminSettingsError('ভুল ২FA ভেরিফিকেশন কোড! দয়া করে সঠিক কোডটি দিন।');
                                  speak("ভুল কোড");
                                }
                              }}
                              className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-4 py-1.5 border border-rose-500/20 hover:border-rose-500/30 rounded-xl text-xs font-black cursor-pointer transition-all"
                            >
                              ২FA নিষ্ক্রিয় করুন
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : isSettingUp2fa ? (
                      <div className="space-y-4">
                        <div className="space-y-3 text-xs text-slate-300">
                          <p className="font-bold text-amber-400">⚙️ সেটিংস নির্দেশনাবলী:</p>
                          <ol className="list-decimal pl-4 space-y-1.5 text-[11px] leading-relaxed">
                            <li>আপনার মোবাইলে <span className="text-teal-400 font-semibold">Google Authenticator</span> অ্যাপটি ডাউনলোড করুন।</li>
                            <li>নিচের কিউআর কোডটি অ্যাপ দিয়ে স্ক্যান করুন অথবা সিক্রেট কী-টি ম্যানুয়ালি যুক্ত করুন।</li>
                          </ol>
                        </div>

                        {/* QR Code and Secret */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2 border-y border-[#30363d]">
                          <div className="bg-white p-2 rounded-xl flex items-center justify-center">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=otpauth://totp/BanglaLearn:ismailbetagibarguna777@gmail.com?secret=${temp2faSecret}&issuer=BanglaLearn&color=0-128-128`}
                              alt="2FA QR Code"
                              className="w-[120px] h-[120px] select-none"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="text-center sm:text-left space-y-1.5 flex-1">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">ম্যানুয়াল সিক্রেট কী:</span>
                            <code className="bg-[#161b22] px-3 py-1.5 rounded-lg border border-[#30363d] text-teal-400 font-mono text-xs tracking-wider block select-all text-center">
                              {temp2faSecret}
                            </code>
                            <span className="text-[9px] text-slate-500 leading-relaxed block">
                              ইমেইল: ismailbetagibarguna777@gmail.com
                            </span>
                          </div>
                        </div>

                        {/* Verification Form */}
                        <div className="space-y-3">
                          <label className="block text-[11px] font-black text-slate-300">
                            ৩. অ্যাপ থেকে প্রাপ্ত ৬-ডিজিটের কোডটি দিন:
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              maxLength={6}
                              value={verification2faInput}
                              onChange={(e) => setVerification2faInput(e.target.value.replace(/\D/g, ''))}
                              placeholder="••••••"
                              className="flex-1 px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-xl text-white placeholder-slate-700 text-xs font-mono text-center tracking-widest focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                            <button
                              onClick={async () => {
                                setAdminSettingsError('');
                                setAdminSettingsSuccess('');
                                if (verification2faInput.length !== 6) {
                                  setAdminSettingsError('দয়া করে ৬ ডিজিটের সম্পূর্ণ কোডটি দিন!');
                                  speak("কোড মেলেনি");
                                  return;
                                }
                                const isOtpValid = await verifyTOTP(temp2faSecret, verification2faInput);
                                if (isOtpValid) {
                                  setIs2faEnabled(true);
                                  localStorage.setItem('bangla_admin_2fa_enabled', 'true');
                                  setIsSettingUp2fa(false);
                                  setVerification2faInput('');
                                  setAdminSettingsSuccess('গুগল অথেনটিকেটর ২-ধাপ ভেরিফিকেশন সফলভাবে চালু হয়েছে!');
                                  speak("২-এফএ চালু হয়েছে");
                                } else {
                                  setAdminSettingsError('ভুল ২FA ভেরিফিকেশন কোড! দয়া করে সঠিক কোডটি দিন।');
                                  speak("ভুল কোড");
                                }
                              }}
                              className="bg-teal-500 text-slate-950 hover:bg-teal-400 px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all"
                            >
                              ভেরিফাই ও অ্যাক্টিভেট
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              setIsSettingUp2fa(false);
                              speak("বাতিল করা হয়েছে");
                            }}
                            className="text-slate-400 hover:text-white text-[10px] font-bold block transition-all"
                          >
                            সেটআপ বাতিল করুন
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 text-center py-2">
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          গুগল অথেনটিকেটর অ্যাপ ব্যবহার করে আপনার অ্যাডমিন লগইনে অতিরিক্ত ভেরিফিকেশন স্তর (2FA) যুক্ত করুন।
                        </p>
                        <button
                          onClick={() => {
                            setIsSettingUp2fa(true);
                            setVerification2faInput('');
                            setAdminSettingsError('');
                            setAdminSettingsSuccess('');
                            speak("গুগল অথেনটিকেটর সেটআপ");
                          }}
                          className="bg-gradient-to-r from-teal-500/20 to-indigo-500/20 border border-teal-500/30 hover:border-teal-400 px-4 py-2 rounded-xl text-xs font-black text-teal-400 cursor-pointer transition-all inline-flex items-center gap-1.5"
                        >
                          <span>🔒</span> গুগল অথেনটিকেটর ২FA সেটআপ করুন
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-[#30363d] flex justify-end">
                  <button
                    onClick={() => {
                      setShowAdminSettingsModal(false);
                      speak("বন্ধ করা হয়েছে");
                    }}
                    className="px-5 py-2.5 bg-slate-800 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs font-black transition-all cursor-pointer"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Edit/Override Modal */}
        <AnimatePresence>
          {showImageEditModal && editingImageSrc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-[#161b22] border-2 border-emerald-500/40 p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl relative text-left"
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => {
                      setShowImageEditModal(false);
                      setEditingImageSrc(null);
                      speak("বাতিল করা হয়েছে");
                    }}
                    className="text-slate-400 hover:text-white bg-slate-800/50 p-1.5 rounded-full transition-all cursor-pointer border-none outline-none"
                  >
                    <Icon name="X" className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center mb-6">
                  <span className="text-4xl">🖼️</span>
                  <h2 className="text-2xl font-black text-[#f0f6fc] mt-2">ছবি পরিবর্তন করুন</h2>
                  <p className="text-xs text-emerald-400 font-bold mt-1 uppercase tracking-wider">Customize Picture Card</p>
                </div>

                {/* Previews */}
                <div className="mb-6 flex flex-col items-center justify-center p-4 bg-[#0d1117]/80 rounded-2xl border border-[#30363d]">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2.5">বর্তমান ছবি (Current Preview)</span>
                  <div className="w-24 h-24 bg-slate-900 rounded-xl border border-slate-700/50 p-2 flex items-center justify-center overflow-hidden">
                    <img
                      src={imageOverrides[editingImageSrc] || editingImageSrc}
                      alt="Current"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128";
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-300 mb-1.5">ছবির নতুন লিংক (New Image URL):</label>
                    <textarea
                      rows={2}
                      value={newImageInput}
                      onChange={(e) => setNewImageInput(e.target.value)}
                      placeholder="এখানে নতুন কোনো ছবির লিঙ্ক বা URL পেস্ট করুন..."
                      className="block w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm font-mono leading-relaxed resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-2.5">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowImageEditModal(false);
                          setEditingImageSrc(null);
                          speak("বাতিল করা হয়েছে");
                        }}
                        className="flex-1 py-2.5 bg-slate-800 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer"
                      >
                        বাতিল
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingImageSrc) return;
                          const newOverrides = { ...imageOverrides, [editingImageSrc]: newImageInput };
                          setImageOverrides(newOverrides);
                          localStorage.setItem('bangla_img_overrides', JSON.stringify(newOverrides));
                          setShowImageEditModal(false);
                          setEditingImageSrc(null);
                          speak("ছবি পরিবর্তন সফল হয়েছে");
                        }}
                        className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-emerald-950/30 transition-all cursor-pointer"
                      >
                        সংরক্ষণ করুন (Save)
                      </button>
                    </div>

                    {imageOverrides[editingImageSrc] && (
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingImageSrc) return;
                          const newOverrides = { ...imageOverrides };
                          delete newOverrides[editingImageSrc];
                          setImageOverrides(newOverrides);
                          localStorage.setItem('bangla_img_overrides', JSON.stringify(newOverrides));
                          setShowImageEditModal(false);
                          setEditingImageSrc(null);
                          speak("ছবি আগের মত করা হয়েছে");
                        }}
                        className="w-full py-2 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-black transition-all cursor-pointer"
                      >
                        আগের ছবিতে ফিরে যান (Reset to Default)
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==================== FOOTER ==================== */}
      <Footer />
      </React.Suspense>
    </div>
  );
}
