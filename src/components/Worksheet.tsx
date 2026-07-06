import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './Icon';

// Emojis mapping for rich high-contrast graphics
const EMOJI_MAP: Record<string, string> = {
  lotus: '🪷',
  parrot: '🦜',
  ball: '⚽',
  deer: '🦌',
  mango: '🥭',
  house: '🏡',
  pigeon: '🕊️',
  plant: '🪴',
  kite: '🪁',
  bell: '🔔',
  tree: '🌳',
  fish: '🐟',
  owl: '🦉',
  airplane: '✈️',
  duck: '🦆',
  star: '⭐',
  pomegranate: '🍎',
  carrot: '🥕',
  book: '📖',
  charka: '🔄',
  umbrella: '☂️',
  ship: '🚢',
  storm: '⛈️',
  lion: '🦁',
  tiger: '🐅',
  elephant: '🐘',
  pen: '🖊️',
  cloud: '☁️',
  rain: '🌧️',
  sun: '☀️',
  river: '🏞️',
  boat: '⛵',
  car: '🚗',
  rickshaw: '🛺',
  watermelon: '🍉',
  coconut: '🥥',
  flower: '🌸',
  cat: '🐱',
  dog: '🐶',
  horse: '🐎',
  clock: '⏰',
  banana: '🍌',
  jackfruit: '🍈',
};

interface WorksheetData {
  id: number;
  title: string;
  bnTitle: string;
  subtitle: string;
  description: string;
  colorTheme: string; // Tailwind gradient classes
  challenges: Challenge[];
}

type ChallengeType = 'firstLetter' | 'matchPic' | 'scrambled' | 'fillBlank' | 'circleStart' | 'twoWords';

interface Challenge {
  id: string;
  type: ChallengeType;
  question: string;
  // For firstLetter & fillBlank
  items?: {
    id: string;
    imageKey: string;
    wordWithBlank: string; // e.g. "_বুতর" or "_ালিম"
    correctLetter: string;
    options: string[];
    wordMeaning?: string;
  }[];
  // For matchPic
  matchItems?: {
    id: string;
    letter: string;
    imageKey: string;
    itemName: string;
  }[];
  // For scrambled
  scrambledItems?: {
    id: string;
    imageKey: string;
    letters: string[]; // e.g. ['ম', 'া', 'ল', 'া']
    correctWord: string;
  }[];
  // For circleStart
  circleItems?: {
    id: string;
    imageKey: string;
    correctLetter: string;
    options: string[];
  }[];
  // For twoWords
  twoWordsItems?: {
    id: string;
    imageKey: string;
    letter: string;
    options: string[]; // 4 choices, user picks 2 correct ones that start with that letter
    correctPair: string[]; // e.g. ['আম', 'আতা']
  }[];
}

// Complete 20 Worksheets rich data
const WORKSHEETS_DATA: WorksheetData[] = [
  {
    id: 1,
    title: 'Worksheet 1',
    bnTitle: 'ওয়ার্ক শীট ১',
    subtitle: 'স্বরবর্ণ চেনা ও মেলানো',
    description: 'ছবি দেখে সঠিক স্বরবর্ণ সিলেক্ট করো এবং মিলাও।',
    colorTheme: 'from-pink-500 to-rose-600',
    challenges: [
      {
        id: 'w1_c1',
        type: 'firstLetter',
        question: '১. ছবি দেখে সঠিক প্রথম স্বরবর্ণটি বেছে নাওঃ',
        items: [
          { id: 'w1_i1', imageKey: 'mango', wordWithBlank: '_ম', correctLetter: 'আ', options: ['অ', 'আ', 'ই', 'উ'], wordMeaning: 'আম' },
          { id: 'w1_i2', imageKey: 'umbrella', wordWithBlank: '_াতা', correctLetter: 'ছ', options: ['চ', 'ছ', 'জ', 'ঝ'], wordMeaning: 'ছাতা' },
          { id: 'w1_i3', imageKey: 'book', wordWithBlank: '_ই', correctLetter: 'ব', options: ['প', 'ফ', 'ব', 'ভ'], wordMeaning: 'বই' },
        ]
      },
      {
        id: 'w1_c2',
        type: 'scrambled',
        question: '২. এলোমেলো বর্ণগুলো সাজিয়ে সঠিক শব্দ তৈরি করোঃ',
        scrambledItems: [
          { id: 'w1_s1', imageKey: 'mango', letters: ['ম', 'আ'], correctWord: 'আম' },
          { id: 'w1_s2', imageKey: 'book', letters: ['ই', 'ব'], correctWord: 'বই' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Worksheet 2',
    bnTitle: 'ওয়ার্ক শীট ২',
    subtitle: 'ব্যঞ্জনবর্ণ ক-ঙ এবং ছবি মেলানো',
    description: 'ব্যঞ্জনবর্ণের প্রথম ৫টি বর্ণ (ক, খ, গ, ঘ, ঙ) এবং ছবির খেলা।',
    colorTheme: 'from-amber-400 to-orange-600',
    challenges: [
      {
        id: 'w2_c1',
        type: 'matchPic',
        question: '১. বর্ণের পাশে সঠিক ছবিটিতে ক্লিক করে জোড় মেলাওঃ',
        matchItems: [
          { id: 'w2_m1', letter: 'ক', imageKey: 'pigeon', itemName: 'কবুতর' },
          { id: 'w2_m2', letter: 'গ', imageKey: 'plant', itemName: 'গাছ' },
          { id: 'w2_m3', letter: 'ঘ', imageKey: 'house', itemName: 'ঘর' },
          { id: 'w2_m4', letter: 'খ', imageKey: 'kite', itemName: 'ঘুড়ি' }
        ]
      },
      {
        id: 'w2_c2',
        type: 'fillBlank',
        question: '২. শূন্যস্থানে সঠিক অক্ষর বসাওঃ',
        items: [
          { id: 'w2_fb1', imageKey: 'pigeon', wordWithBlank: '_বুতর', correctLetter: 'ক', options: ['ক', 'খ', 'গ', 'ঘ'] },
          { id: 'w2_fb2', imageKey: 'house', wordWithBlank: '_র', correctLetter: 'ঘ', options: ['গ', 'ঘ', 'ঙ', 'চ'] }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Worksheet 3',
    bnTitle: 'ওয়ার্ক শীট ৩',
    subtitle: 'বর্ণ সাজিয়ে শব্দ গঠন',
    description: 'এলোমেলো বর্ণগুলোকে সাজিয়ে সচিত্র শব্দ গঠন করতে শেখো।',
    colorTheme: 'from-green-400 to-emerald-600',
    challenges: [
      {
        id: 'w3_c1',
        type: 'scrambled',
        question: '১. বর্ণগুলো সাজিয়ে সঠিক শব্দ তৈরি করোঃ',
        scrambledItems: [
          { id: 'w3_s1', imageKey: 'lotus', letters: ['ম', 'া', 'ল', 'া'], correctWord: 'মালা' },
          { id: 'w3_s2', imageKey: 'tree', letters: ['া', 'গ', 'ছ'], correctWord: 'গাছ' },
          { id: 'w3_s3', imageKey: 'fish', letters: ['া', 'ম', 'ছ'], correctWord: 'মাছ' }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Worksheet 4',
    bnTitle: 'ওয়ার্ক শীট ৪',
    subtitle: 'ছবি দেখে শূন্যস্থান পূরণ',
    description: 'ছবি দেখে তার বানানের প্রথম অক্ষরটি শূন্যস্থানে বসাও।',
    colorTheme: 'from-teal-400 to-cyan-600',
    challenges: [
      {
        id: 'w4_c1',
        type: 'fillBlank',
        question: '১. শূন্যস্থানে সঠিক অক্ষরটি বসিয়ে শব্দ সম্পন্ন করোঃ',
        items: [
          { id: 'w4_i1', imageKey: 'pomegranate', wordWithBlank: '_ালিম', correctLetter: 'ড', options: ['ড', 'ত', 'থ', 'দ'] },
          { id: 'w4_i2', imageKey: 'carrot', wordWithBlank: '_াজর', correctLetter: 'গ', options: ['ক', 'খ', 'গ', 'ঘ'] },
          { id: 'w4_i3', imageKey: 'lotus', wordWithBlank: '_দ্ম', correctLetter: 'প', options: ['প', 'ফ', 'ব', 'ভ'] }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Worksheet 5',
    bnTitle: 'ওয়ার্ক শীট ৫',
    subtitle: 'ছবি দেখে প্রথম অক্ষর গোল করো',
    description: 'ছবির নামের প্রথম বর্ণটি খুঁজে বের করে গোল চিহ্নে ক্লিক করো।',
    colorTheme: 'from-blue-400 to-indigo-600',
    challenges: [
      {
        id: 'w5_c1',
        type: 'circleStart',
        question: '১. যে অক্ষর দিয়ে ছবি শুরু হয় সেটি গোল (সিলেক্ট) করোঃ',
        circleItems: [
          { id: 'w5_ci1', imageKey: 'tree', correctLetter: 'গ', options: ['গ', 'ঘ', 'চ', 'ছ'] },
          { id: 'w5_ci2', imageKey: 'fish', correctLetter: 'ম', options: ['ব', 'ভ', 'ম', 'য'] },
          { id: 'w5_ci3', imageKey: 'bell', correctLetter: 'ঘ', options: ['গ', 'ঘ', 'ত', 'থ'] }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Worksheet 6',
    bnTitle: 'ওয়ার্ক শীট ৬',
    subtitle: 'ব্যঞ্জনবর্ণ চ-ঞ এবং শব্দচক্র',
    description: 'ব্যঞ্জনবর্ণের দ্বিতীয় ৫টি বর্ণ (চ, ছ, জ, ঝ, ঞ) এবং শব্দ গঠন।',
    colorTheme: 'from-purple-500 to-fuchsia-600',
    challenges: [
      {
        id: 'w6_c1',
        type: 'firstLetter',
        question: '১. ছবি দেখে সঠিক প্রথম ব্যঞ্জনবর্ণটি খুঁজে নাওঃ',
        items: [
          { id: 'w6_i1', imageKey: 'charka', wordWithBlank: '_রকা', correctLetter: 'চ', options: ['চ', 'ছ', 'জ', 'ঝ'] },
          { id: 'w6_i2', imageKey: 'ship', wordWithBlank: '_াহাজ', correctLetter: 'জ', options: ['চ', 'ছ', 'জ', 'ঝ'] },
          { id: 'w6_i3', imageKey: 'umbrella', wordWithBlank: '_াতা', correctLetter: 'ছ', options: ['চ', 'ছ', 'জ', 'ঝ'] }
        ]
      }
    ]
  },
  {
    id: 7,
    title: 'Worksheet 7',
    bnTitle: 'ওয়ার্ক শীট ৭',
    subtitle: 'কার চিহ্ন দিয়ে শব্দ তৈরি',
    description: 'আ-কার, ই-কার এবং উ-কার চিহ্ন দিয়ে সঠিক বানান তৈরি করো।',
    colorTheme: 'from-red-400 to-rose-600',
    challenges: [
      {
        id: 'w7_c1',
        type: 'scrambled',
        question: '১. কার চিহ্ন ও বর্ণ সাজিয়ে অর্থপূর্ণ শব্দ তৈরি করোঃ',
        scrambledItems: [
          { id: 'w7_s1', imageKey: 'mango', letters: ['ম', 'আ'], correctWord: 'আম' },
          { id: 'w7_s2', imageKey: 'kite', letters: ['ড়', 'ি', 'ঘ', 'ু'], correctWord: 'ঘুড়ি' },
          { id: 'w7_s3', imageKey: 'house', letters: ['র', 'ঘ'], correctWord: 'ঘর' }
        ]
      }
    ]
  },
  {
    id: 8,
    title: 'Worksheet 8',
    bnTitle: 'ওয়ার্ক শীট ৮',
    subtitle: 'ফল ও ফুলের নাম মেলানো',
    description: 'আমাদের পরিচিত অত্যন্ত সুস্বাদু ফল ও সুন্দর ফুলের নাম মেলানোর খেলা।',
    colorTheme: 'from-amber-500 to-yellow-600',
    challenges: [
      {
        id: 'w8_c1',
        type: 'matchPic',
        question: '১. ফল ও ফুলের নামের সাথে ছবির মেলবন্ধন করোঃ',
        matchItems: [
          { id: 'w8_m1', letter: 'আম', imageKey: 'mango', itemName: 'আম' },
          { id: 'w8_m2', letter: 'পদ্ম', imageKey: 'lotus', itemName: 'পদ্ম ফুল' },
          { id: 'w8_m3', letter: 'ডালিম', imageKey: 'pomegranate', itemName: 'ডালিম ফল' },
          { id: 'w8_m4', letter: 'তরমুজ', imageKey: 'watermelon', itemName: 'তরমুজ' }
        ]
      }
    ]
  },
  {
    id: 9,
    title: 'Worksheet 9',
    bnTitle: 'ওয়ার্ক শীট ৯',
    subtitle: 'পশু ও পাখির প্রথম অক্ষর লিখন',
    description: 'সুন্দর বনের পশুপাখির ছবি দেখে নামের প্রথম বর্ণটি খুঁজে বের করো।',
    colorTheme: 'from-emerald-500 to-teal-700',
    challenges: [
      {
        id: 'w9_c1',
        type: 'circleStart',
        question: '১. পশুপাখির নামের প্রথম অক্ষরটি গোল চিহ্নে সিলেক্ট করোঃ',
        circleItems: [
          { id: 'w9_ci1', imageKey: 'lion', correctLetter: 'সি', options: ['সি', 'বা', 'হ', 'হরি'] }, // simplified labels
          { id: 'w9_ci2', imageKey: 'deer', correctLetter: 'হ', options: ['হ', 'বা', 'সি', 'পা'] },
          { id: 'w9_ci3', imageKey: 'pigeon', correctLetter: 'ক', options: ['ক', 'খ', 'প', 'টি'] }
        ]
      }
    ]
  },
  {
    id: 10,
    title: 'Worksheet 10',
    bnTitle: 'ওয়ার্ক শীট ১০',
    subtitle: '২ অক্ষরের সহজ শব্দ গঠন',
    description: 'সহজ দুই বর্ণের সংযোগ ঘটিয়ে বাংলা রিডিং পড়া শুরু করার ওয়ার্কশীট।',
    colorTheme: 'from-violet-500 to-purple-700',
    challenges: [
      {
        id: 'w10_c1',
        type: 'scrambled',
        question: '১. এলোমেলো বর্ণ সাজিয়ে ২ অক্ষরের শব্দ তৈরি করোঃ',
        scrambledItems: [
          { id: 'w10_s1', imageKey: 'book', letters: ['ই', 'ব'], correctWord: 'বই' },
          { id: 'w10_s2', imageKey: 'bell', letters: ['ণ', 'ঘ', '্', 'ট', 'া'], correctWord: 'ঘণ্টা' },
          { id: 'w10_s3', imageKey: 'plant', letters: ['ছ', 'া', 'গ'], correctWord: 'গাছ' }
        ]
      }
    ]
  },
  {
    id: 11,
    title: 'Worksheet 11',
    bnTitle: 'ওয়ার্ক শীট ১১',
    subtitle: '৩ অক্ষরের শব্দ সাজানো',
    description: '৩টি বর্ণ দিয়ে গঠিত চমৎকার সব শব্দ গঠন করার খেলা।',
    colorTheme: 'from-pink-400 to-fuchsia-700',
    challenges: [
      {
        id: 'w11_c1',
        type: 'scrambled',
        question: '১. ৩টি এলোমেলো বর্ণ সাজিয়ে সঠিক শব্দ গঠন করোঃ',
        scrambledItems: [
          { id: 'w11_s1', imageKey: 'airplane', letters: ['হ', 'া', 'জ', 'া', 'উ', 'ড়', 'ো'], correctWord: 'উড়োজাহাজ' },
          { id: 'w11_s2', imageKey: 'carrot', letters: ['র', 'গ', 'া', 'জ'], correctWord: 'গাজর' },
          { id: 'w11_s3', imageKey: 'pomegranate', letters: ['ম', 'ি', 'ল', 'া', 'ড'], correctWord: 'ডালিম' }
        ]
      }
    ]
  },
  {
    id: 12,
    title: 'Worksheet 12',
    bnTitle: 'ওয়ার্ক শীট ১২',
    subtitle: 'ছড়া ও কবিতার ছান্দিক শব্দ মেলানো',
    description: 'ছড়ার শেষে থাকা একই রকম শুনতে চমৎকার শব্দগুলোর ছান্দিক মিলন ঘটাও।',
    colorTheme: 'from-indigo-500 to-blue-700',
    challenges: [
      {
        id: 'w12_c1',
        type: 'matchPic',
        question: '১. ছড়ার মিল সম্পন্নকারী সঠিক শব্দজোড় মেলাওঃ',
        matchItems: [
          { id: 'w12_m1', letter: 'আতা', imageKey: 'plant', itemName: 'পাতা' },
          { id: 'w12_m2', letter: 'জল', imageKey: 'fish', itemName: 'ফল' },
          { id: 'w12_m3', letter: 'ডালিম', imageKey: 'pomegranate', itemName: 'শালিম' },
          { id: 'w12_m4', letter: 'পাখি', imageKey: 'parrot', itemName: 'রাখি' }
        ]
      }
    ]
  },
  {
    id: 13,
    title: 'Worksheet 13',
    bnTitle: 'ওয়ার্ক শীট ১৩',
    subtitle: 'বিপরীত শব্দ চেনার খেলা',
    description: 'শব্দের সঠিক বিপরীত অর্থবোধক শব্দটি খুঁজে বের করার আকর্ষণীয় ওয়ার্কশীট।',
    colorTheme: 'from-orange-400 to-rose-600',
    challenges: [
      {
        id: 'w13_c1',
        type: 'matchPic',
        question: '১. শব্দের সাথে সঠিক বিপরীত শব্দটি জোড় মেলাওঃ',
        matchItems: [
          { id: 'w13_m1', letter: 'বড়', imageKey: 'ant', itemName: 'ছোট' },
          { id: 'w13_m2', letter: 'দিন', imageKey: 'star', itemName: 'রাত' },
          { id: 'w13_m3', letter: 'ভালো', imageKey: 'smile', itemName: 'মন্দ' },
          { id: 'w13_m4', letter: 'আলো', imageKey: 'cloud', itemName: 'অন্ধকার' }
        ]
      }
    ]
  },
  {
    id: 14,
    title: 'Worksheet 14',
    bnTitle: 'ওয়ার্ক শীট ১৪',
    subtitle: 'যুক্তবর্ণ সহজ উপায়ে ভাঙা',
    description: 'জটিল যুক্তবর্ণগুলো খুব সহজ পদ্ধতিতে চিনে ভেঙে আলাদা করো।',
    colorTheme: 'from-teal-500 to-emerald-600',
    challenges: [
      {
        id: 'w14_c1',
        type: 'circleStart',
        question: '১. যুক্তবর্ণ ভাঙলে কোন দুটি মূল বর্ণ পাওয়া যায় তা সিলেক্ট করোঃ',
        circleItems: [
          { id: 'w14_ci1', imageKey: 'star', correctLetter: 'ক + ষ', options: ['ক + ষ', 'ক + স', 'খ + ষ', 'হ + ম'] }, // ক্ষ
          { id: 'w14_ci2', imageKey: 'plant', correctLetter: 'ত + ত', options: ['ত + থ', 'ত + ত', 'ন + ত', 'ম + প'] }, // ত্ত
          { id: 'w14_ci3', imageKey: 'umbrella', correctLetter: 'চ + ছ', options: ['চ + ছ', 'জ + জ', 'শ + চ', 'ত + র'] } // চ্ছ
        ]
      }
    ]
  },
  {
    id: 15,
    title: 'Worksheet 15',
    bnTitle: 'ওয়ার্ক শীট ১৫',
    subtitle: 'ঋতু ও প্রকৃতির নাম মেলানো',
    description: 'আমাদের চারপাশের মনোরম প্রকৃতি ও ঋতুচক্রের ছবির সাথে মিলবন্ধন করো।',
    colorTheme: 'from-emerald-400 to-teal-600',
    challenges: [
      {
        id: 'w15_c1',
        type: 'matchPic',
        question: '১. প্রকৃতির অপরূপ উপাদানের ছবির সাথে সঠিক শব্দ জোড় মেলাওঃ',
        matchItems: [
          { id: 'w15_m1', letter: 'মেঘ', imageKey: 'cloud', itemName: 'মেঘ' },
          { id: 'w15_m2', letter: 'বৃষ্টি', imageKey: 'rain', itemName: 'বৃষ্টি' },
          { id: 'w15_m3', letter: 'সূর্য', imageKey: 'sun', itemName: 'সূর্য' },
          { id: 'w15_m4', letter: 'নদী', imageKey: 'river', itemName: 'নদী' }
        ]
      }
    ]
  },
  {
    id: 16,
    title: 'Worksheet 16',
    bnTitle: 'ওয়ার্ক শীট ১৬',
    subtitle: 'যানবাহন ও বাস্তব জীবনের শব্দ',
    description: 'রাস্তায় চলা বিভিন্ন গাড়ি, রিকশা বা ট্রেনের চমৎকার ছবির খেলা।',
    colorTheme: 'from-sky-500 to-indigo-600',
    challenges: [
      {
        id: 'w16_c1',
        type: 'firstLetter',
        question: '১. ছবি দেখে সঠিক প্রথম ব্যঞ্জনবর্ণটি বেছে নাওঃ',
        items: [
          { id: 'w16_i1', imageKey: 'rickshaw', wordWithBlank: '_িকশা', correctLetter: 'র', options: ['র', 'ল', 'ব', 'ত'], wordMeaning: 'রিকশা' },
          { id: 'w16_i2', imageKey: 'boat', wordWithBlank: '_ৌকা', correctLetter: 'ন', options: ['ন', 'ম', 'প', 'ত'], wordMeaning: 'নৌকা' },
          { id: 'w16_i3', imageKey: 'car', wordWithBlank: '_াড়ি', correctLetter: 'গ', options: ['ক', 'খ', 'গ', 'ঘ'], wordMeaning: 'গাড়ি' }
        ]
      }
    ]
  },
  {
    id: 17,
    title: 'Worksheet 17',
    bnTitle: 'ওয়ার্ক শীট ১৭',
    subtitle: 'দৈনন্দিন ব্যবহার্য জিনিসপত্র',
    description: 'আমাদের চারপাশের পরিচিত নানা জিনিসের চমৎকার বানান মেলানোর খেলা।',
    colorTheme: 'from-indigo-400 to-purple-600',
    challenges: [
      {
        id: 'w17_c1',
        type: 'scrambled',
        question: '১. এলোমেলো বর্ণ সাজিয়ে সঠিক জিনিসটির নাম তৈরি করোঃ',
        scrambledItems: [
          { id: 'w17_s1', imageKey: 'pen', letters: ['ম', 'ল', 'ক'], correctWord: 'কলম' },
          { id: 'w17_s2', imageKey: 'book', letters: ['ই', 'ব'], correctWord: 'বই' },
          { id: 'w17_s3', imageKey: 'clock', letters: ['ড়', 'ি', 'ঘ'], correctWord: 'ঘড়ি' }
        ]
      }
    ]
  },
  {
    id: 18,
    title: 'Worksheet 18',
    bnTitle: 'ওয়ার্ক শীট ১৮',
    subtitle: 'ফল ও সবজি চেনা',
    description: 'রঙিন ও পুষ্টিকর ফল ও সবজি চেনার দারুণ ও মজার ওয়ার্কশীট।',
    colorTheme: 'from-orange-400 to-amber-600',
    challenges: [
      {
        id: 'w18_c1',
        type: 'circleStart',
        question: '১. পুষ্টিকর ফল ও সবজির নামের প্রথম অক্ষরটি গোল চিহ্নে সিলেক্ট করোঃ',
        circleItems: [
          { id: 'w18_ci1', imageKey: 'banana', correctLetter: 'ক', options: ['ক', 'খ', 'গ', 'ঘ'] },
          { id: 'w18_ci2', imageKey: 'carrot', correctLetter: 'গ', options: ['গ', 'ঘ', 'চ', 'ছ'] },
          { id: 'w18_ci3', imageKey: 'watermelon', correctLetter: 'ত', options: ['ত', 'থ', 'দ', 'ধ'] }
        ]
      }
    ]
  },
  {
    id: 19,
    title: 'Worksheet 19',
    bnTitle: 'ওয়ার্ক শীট ১৯',
    subtitle: 'কার চিহ্নের যাদু',
    description: 'স্বরবর্ণের চমৎকার সংক্ষিপ্ত কার চিহ্নগুলোর মজার প্রয়োগ।',
    colorTheme: 'from-purple-500 to-pink-600',
    challenges: [
      {
        id: 'w19_c1',
        type: 'fillBlank',
        question: '১. সঠিক কার চিহ্ন অথবা বর্ণ দিয়ে ফাঁকা ঘর পূরণ করোঃ',
        items: [
          { id: 'w19_i1', imageKey: 'lotus', wordWithBlank: 'প_্ম', correctLetter: 'দ', options: ['ত', 'দ', 'ধ', 'ন'], wordMeaning: 'পদ্ম' },
          { id: 'w19_i2', imageKey: 'plant', wordWithBlank: 'গ_ছ', correctLetter: 'া', options: ['া', 'ি', 'ু', 'ে'], wordMeaning: 'গাছ' },
          { id: 'w19_i3', imageKey: 'star', wordWithBlank: 'ত_রা', correctLetter: 'া', options: ['া', 'ি', 'ু', 'ে'], wordMeaning: 'তারা' }
        ]
      }
    ]
  },
  {
    id: 20,
    title: 'Worksheet 20',
    bnTitle: 'ওয়ার্ক শীট ২০',
    subtitle: 'চূড়ান্ত মেধা যাচাই',
    description: 'এতক্ষণ যা শিখেছো তার চমৎকার একটি চূড়ান্ত পরীক্ষা ও মেডেল জয়ের সুযোগ!',
    colorTheme: 'from-yellow-400 to-amber-600',
    challenges: [
      {
        id: 'w20_c1',
        type: 'twoWords',
        question: '১. নিচের বর্ণগুলো দিয়ে শুরু হওয়া ঠিক ২টি করে সঠিক শব্দ নির্বাচন করোঃ',
        twoWordsItems: [
          { id: 'w20_tw1', imageKey: 'mango', letter: 'আ', options: ['আম', 'আতা', 'খাতা', 'ঘড়ি'], correctPair: ['আম', 'আতা'] },
          { id: 'w20_tw2', imageKey: 'tree', letter: 'গ', options: ['গাছ', 'গাজর', 'বই', 'মাছ'], correctPair: ['গাছ', 'গাজর'] }
        ]
      }
    ]
  }
];

interface WorksheetProps {
  speak: (text: string) => void;
}

// Educational Category Mapper for Bangladeshi Primary Kids
const getWorksheetCategory = (id: number): { name: string; color: string; icon: string } => {
  if (id === 1) return { name: "স্বরবর্ণ পরিচিতি", color: "bg-pink-500/25 text-pink-300 border border-pink-500/30", icon: "🍎" };
  if (id === 2 || id === 6) return { name: "ব্যঞ্জনবর্ণ চর্চা", color: "bg-amber-500/25 text-amber-300 border border-amber-500/30", icon: "🦜" };
  if (id === 3 || id === 10 || id === 11) return { name: "শব্দ গঠন", color: "bg-emerald-500/25 text-emerald-300 border border-emerald-500/30", icon: "🏡" };
  if (id === 4 || id === 5 || id === 9 || id === 18) return { name: "অক্ষর মেলানো", color: "bg-sky-500/25 text-sky-300 border border-sky-500/30", icon: "🪁" };
  if (id === 7 || id === 19) return { name: "কার চিহ্ন ব্যবহার", color: "bg-purple-500/25 text-purple-300 border border-purple-500/30", icon: "✨" };
  if (id === 8 || id === 15) return { name: "প্রকৃতি ও পরিবেশ", color: "bg-teal-500/25 text-teal-300 border border-teal-500/30", icon: "🌳" };
  if (id === 12 || id === 13) return { name: "মিল ও বিপরীত শব্দ", color: "bg-orange-500/25 text-orange-300 border border-orange-500/30", icon: "🔄" };
  if (id === 14) return { name: "যুক্তবর্ণ শিক্ষা", color: "bg-red-500/25 text-red-300 border border-red-500/30", icon: "📖" };
  if (id === 16 || id === 17) return { name: "বাস্তব শব্দমালা", color: "bg-indigo-500/25 text-indigo-300 border border-indigo-500/30", icon: "🚗" };
  return { name: "মেধা মূল্যায়ন", color: "bg-yellow-500/25 text-yellow-300 border border-yellow-500/30", icon: "🏆" };
};

// Teacher guide data for each worksheet to make it informative & educative
interface EducationalGuide {
  focus: string;
  tip: string;
  fact: string;
  tagline: string;
}

const getEducationalGuide = (id: number): EducationalGuide => {
  const guides: Record<number, EducationalGuide> = {
    1: {
      focus: "স্বরবর্ণ পরিচিতি ও উচ্চারণ দক্ষতা",
      tip: "বাচ্চাদের বলুন 'আ'-তে আম এবং 'ছ'-তে ছাতা জোরে উচ্চারণ করতে। এটি তাদের বর্ণ ও শব্দের সম্পর্ক সহজে মনে রাখতে সাহায্য করবে।",
      fact: "বাংলা বর্ণমালায় মোট ১১টি স্বরবর্ণ রয়েছে, যার মধ্যে 'অ' হলো প্রথম স্বরবর্ণ!",
      tagline: "চলো সোনামণিরা, মনের আনন্দে প্রথম স্বরবর্ণের রাজ্যে ঘুরে আসি!"
    },
    2: {
      focus: "ব্যঞ্জনবর্ণের প্রাথমিক জ্ঞান (ক-ঙ)",
      tip: "কণ্ঠ্য বর্ণ যেমন ক, খ, গ, ঘ, ঙ উচ্চারণ করার সময় আমাদের জিহ্বার পেছনের অংশ নরম তালু স্পর্শ করে। শিশুদের খেলতে খেলতে এটি শেখান।",
      fact: "'ক' দিয়ে শুরু হওয়া 'কবুতর' আমাদের দেশে শান্তির প্রতীক হিসেবে অত্যন্ত প্রিয়!",
      tagline: "ক, খ, গ, ঘ দিয়ে আমরা মেলাবো আনন্দের মেলা!"
    },
    3: {
      focus: "বর্ণবিন্যাস ও শব্দ গঠন প্রক্রিয়া",
      tip: "এলোমেলো বর্ণ সাজিয়ে শব্দ তৈরি করার মাধ্যমে শিশুদের চিন্তাশক্তি ও অক্ষরের প্রতিচ্ছবি মনের ভেতর স্থায়ী হয়।",
      fact: "আমাদের জাতীয় ফুল 'শাপলা' হলেও 'পদ্ম' (Lotus) কাদা থেকে উৎপন্ন অত্যন্ত শুভ্র একটি পবিত্র ফুল!",
      tagline: "বর্ণ জুড়ে শব্দ গড়ার খুদে জাদুকর হয়ে ওঠো সোনামণি!"
    },
    4: {
      focus: "শব্দের শূন্যস্থান পূরণ ও সঠিক বানান শিক্ষণ",
      tip: "ছবি দেখে প্রথম অক্ষরটি আন্দাজ করতে বলুন। এটি শিশুদের শব্দভাণ্ডার বাড়াতে ও সঠিক বানান মনে রাখতে অনেক সাহায্য করে।",
      fact: "ডালিম অত্যন্ত পুষ্টিকর একটি ফল, যা রক্তে লোহিত কণিকা ও ইমিউনিটি বাড়াতে সাহায্য করে!",
      tagline: "শূন্যস্থান পূরণ করো আর বিজয়ের মুকুট পরো!"
    },
    5: {
      focus: "ছবির সাথে আদ্যক্ষর চিহ্নিতকরণ",
      tip: "শিশুকে ছবির নাম মুখে বলতে বলুন এবং প্রথম শব্দটির ওপর জোর দিন। যেমন: গাছ... 'গ'!",
      fact: "গাছ আমাদের পরম বন্ধু, যা আমাদের ক্ষতিকর কার্বন ডাই অক্সাইড দূর করে মূল্যবান অক্সিজেন সরবরাহ করে।",
      tagline: "সঠিক বর্ণটি গোল করে তোমার মেধার চমৎকার পরিচয় দাও!"
    },
    6: {
      focus: "তালব্য ব্যঞ্জনবর্ণ পরিচিতি (চ-ঞ)",
      tip: "চ, ছ, ஜ, ঝ উচ্চারণের সময় জিহ্বা আমাদের শক্ত তালুতে স্পর্শ করে। বাচ্চাদের এটি ছড়া গেয়ে ছন্দে ছন্দে উচ্চারণ করতে বলুন।",
      fact: "আকাশে ওড়ার চমৎকার বাহন হলো উড়োজাহাজ, যা দূরপাল্লার যাত্রাকে মুহূর্তেই সহজ করে দেয়!",
      tagline: "চলো চাকার মত ঘুরি আর নতুন নতুন শব্দ শিখে এগিয়ে চলি!"
    },
    7: {
      focus: "কার চিহ্নের সঠিক গঠন ও প্রয়োগ",
      tip: "কার চিহ্ন হলো স্বরবর্ণের সংক্ষিপ্ত রূপ যা ব্যঞ্জনবর্ণের সাথে বসে নতুন শব্দ গঠন করে (যেমন: আ-কার া)।",
      fact: "বাংলায় কার চিহ্ন মোট ১০টি। শুধুমাত্র প্রথম স্বরবর্ণ 'অ'-এর কোনো কার চিহ্ন নেই, একে 'বিলীন স্বর' বলা হয়!",
      tagline: "কার চিহ্ন লাগিয়ে শব্দ সাজানোর মিষ্টি খেলা খেলি!"
    },
    8: {
      focus: "ফুল, ফল ও দেশীয় শব্দভাণ্ডার বৃদ্ধি",
      tip: "বাচ্চাদের আমাদের দেশীয় ফলগুলির রঙ এবং ফুলের সুবাস সম্পর্কে জিজ্ঞেস করুন এবং ছবির সাথে মেলাতে বলুন।",
      fact: "বাংলাদেশ ফলের দেশ। আমাদের জাতীয় ফল হলো কাঁঠাল এবং জাতীয় ফুল সুন্দর শাপলা!",
      tagline: "আমাদের সবুজ বাংলার অপরূপ রূপ দেখে মনের আনন্দে মিলিয়ে দাও!"
    },
    9: {
      focus: "পশুপাখি চেনা ও শব্দের প্রথম বর্ণ নির্ধারণ",
      tip: "বাচ্চাদের বাঘ, সিংহ এবং হরিণের ডাক বা আচরণ নকল করতে বলুন। এতে তারা অত্যন্ত আনন্দের সাথে শব্দের রূপ শিখবে।",
      fact: "সুন্দরবনের রয়েল বেঙ্গল টাইগার আমাদের গর্ব ও জাতীয় পশু এবং মিষ্টি সুরেলা দোয়েল আমাদের জাতীয় পাখি!",
      tagline: "পশুপাখির দেশে চলো, বর্ণ চিনে নতুন উত্তর বলো!"
    },
    10: {
      focus: "দ্বি-অক্ষরের সহজ শব্দ পঠন ও লিখন",
      tip: "ছোট ছোট ২ অক্ষরের শব্দ পড়া হলো রিডিং পড়ার প্রথম ধাপ। শিশুদের বানান করে জোরে জোরে পড়তে উৎসাহিত করুন।",
      fact: "বই পড়ার মাধ্যমে আমরা সারা পৃথিবীর অজানা সব জ্ঞান ঘরে বসেই খুব সহজে জানতে পারি!",
      tagline: "অক্ষর জুড়ে শব্দ বানাই, মনের মত সুর মেলাই!"
    },
    11: {
      focus: "তিন ও ততোধিক অক্ষরের জটিল শব্দ গঠন",
      tip: "তিন অক্ষরের শব্দগুলো একটু বড় হয়, তাই বর্ণগুলো মুখে উচ্চারণ করে করে ধাপে ধাপে সাজাতে সাহায্য করুন।",
      fact: "গাজর মাটির নিচে জন্মে এবং এটি আমাদের চোখের জ্যোতি বাড়াতে ও দৃষ্টিশক্তি উন্নত করতে অত্যন্ত উপকারী!",
      tagline: "বড় বড় সুন্দর শব্দ সাজিয়ে হয়ে যাও বানানের রাজপুত্র বা রাজকন্যা!"
    },
    12: {
      focus: "ছন্দ ও মিলকরণ শব্দ দক্ষতা",
      tip: "ছড়া বা কবিতার ছন্দ শিশুদের শ্রুতিমধুর শব্দ চেনার কান উন্নত করে এবং স্বরভঙ্গি সুন্দর করে তোলে।",
      fact: "কবিগুরু রবীন্দ্রনাথ ঠাকুর আমাদের জাতীয় সঙ্গীত 'আমার সোনার বাংলা' সুর ও কথা রচনা করেছেন!",
      tagline: "ছন্দে ছন্দে মিলিয়ে দাও, হাসিমুখে মন নাচাও!"
    },
    13: {
      focus: "বিপরীত শব্দের ধারণা ও যুক্তি গঠন",
      tip: "বিপরীত শব্দের মাধ্যমে শিশুরা দ্বান্দ্বিকতা বা তুলনা করতে শেখে (যেমন: দিন এর উল্টো রাত, আলো এর উল্টো অন্ধকার)।",
      fact: "দিন এবং রাতের পরিবর্তন মূলত আমাদের পৃথিবী নিজের অক্ষের উপর অনবরত ঘোরার (আহ্নিক গতি) কারণে হয়ে থাকে!",
      tagline: "উল্টো শব্দের চমৎকার ধাঁধা সমাধান করে জিতে নাও দারুণ পুরস্কার!"
    },
    14: {
      focus: "যুক্তবর্ণের বিশ্লেষণ ও সহজ উপস্থাপন",
      tip: "যুক্তবর্ণ হলো দুই বা তার চেয়ে বেশি ব্যঞ্জনবর্ণের মিলন। এদের আলাদা করে চিনলে কঠিন বানান অনেক সহজ হয়ে যায়।",
      fact: "যেমন: ক্ষ = ক + ষ (যেমন: শিক্ষক, ক্ষমা)। এটি বাংলায় বহুল ব্যবহৃত একটি যুক্তবর্ণ!",
      tagline: "যুক্তবর্ণের রহস্য উদ্ঘাটন করে ফেলো খুব সহজে!"
    },
    15: {
      focus: "ঋতুচক্র ও ঋতুভিত্তিক প্রাকৃতিক নাম",
      tip: "আমাদের দেশের ৬টি ঋতু নিয়ে আলোচনা করুন। বর্ষাকালে মেঘ ও বৃষ্টি এবং শরৎকালে শুভ্র কাশবনের কথা মনে করিয়ে দিন।",
      fact: "বাংলাদেশকে ছয় ঋতুর দেশ বলা হয়। প্রতি দুই মাস পর পর আমাদের প্রকৃতি নতুন নতুন রঙিন সাজে সজ্জিত হয়!",
      tagline: "ঋতুরাজের অপরূপ দেশে চলো, প্রকৃতির নাম মিলিয়ে বলো!"
    },
    16: {
      focus: "যানবাহন ও বাস্তব জীবনের শব্দ পরিচিতি",
      tip: "রাস্তাঘাটে চলার সময় গাড়ি, রিকশা বা ট্রেন দেখলে শিশুদের তাদের নামের প্রথম অক্ষর মনে করিয়ে দিন।",
      fact: "রিকশা বাংলাদেশের একটি অত্যন্ত ঐতিহ্যবাহী ও জনপ্রিয় তিন চাকার পরিবেশবান্ধব বাহন!",
      tagline: "চলন্ত বাহনের সাথে বর্ণ চেনার চাকা ঘুরাও!"
    },
    17: {
      focus: "দৈনন্দিন ব্যবহার্য জিনিসপত্রের বানান",
      tip: "শিশুদের তাদের পড়ার টেবিল, কলম, খাতা ও ঘড়ি দেখিয়ে বর্ণগুলো মুখে উচ্চারণ করে মেলাতে বলুন।",
      fact: "কলম দিয়ে আমরা মনের সব সুন্দর চিন্তা খাতায় লিখে চমৎকার রূপ দিতে পারি!",
      tagline: "রোজকার চেনা জিনিসের সঠিক বানান শিখে নিজেকে সমৃদ্ধ করো!"
    },
    18: {
      focus: "বর্ণ ও ছবির নিখুঁত সামঞ্জস্য",
      tip: "সবজি ও ফলের প্রথম বর্ণটি চেনার মাধ্যমে শিশুরা ছবির ভিজ্যুয়াল ইমেজ ও বর্ণের সংযোগ বুঝতে পারে।",
      fact: "কলা একটি অত্যন্ত সুস্বাদু বারোমাসি ফল যা আমাদের শরীরে প্রচুর ক্যালসিয়াম ও শক্তি জোগায়!",
      tagline: "সবুজ-হলুদ ফল ও সবজির মেলা মেলাও, খুশিতে হাততালি দাও!"
    },
    19: {
      focus: "স্বরবর্ণ ও কার চিহ্নের পারস্পরিক মিলন",
      tip: "কোন স্বরবর্ণের জন্য কোন সংক্ষিপ্ত চিহ্ন ব্যবহৃত হয় তা বারবার অনুশীলন করালে শিশুদের বাংলা রিডিং পড়ার গতি চমৎকার বৃদ্ধি পায়।",
      fact: "কার চিহ্নগুলো সাধারণত ব্যঞ্জনবর্ণের আগে, পরে, ওপরে বা নিচে বসে শব্দকে সম্পূর্ণ অর্থবহ করে তোলে!",
      tagline: "স্বরবর্ণ ও কার চিহ্নের মিষ্টি মিলন ঘটিয়ে দাও!"
    },
    20: {
      focus: "চূড়ান্ত মূল্যায়ন ও মেধা যাচাই পরীক্ষা",
      tip: "এই চ্যালেঞ্জটি পূর্বের সকল শিক্ষার সমন্বিত পরীক্ষা। শিশুকে স্বাধীনভাবে উত্তর দিতে দিন এবং মেডেল অর্জনে উৎসাহিত করুন।",
      fact: "পড়াশোনায় আনন্দ ও গভীর মনোযোগ ধরে রাখার মাধ্যমেই শিশুরা হয়ে ওঠে আগামী দিনের দেশ গড়ার প্রধান কারিগর!",
      tagline: "চূড়ান্ত পরীক্ষা দিয়ে জয় করে নাও সোনার মেডেল ও বিজয়ী ট্রফি!"
    }
  };

  return guides[id] || {
    focus: "বাংলা বর্ণ ও শব্দ গঠন চর্চা",
    tip: "বাচ্চাদের উৎসাহিত করুন এবং খেলার ছলে প্রতিটি বর্ণ জোরে জোরে উচ্চারণ করতে বলুন।",
    fact: "বাংলা ভাষা বিশ্বের অন্যতম মিষ্টি এবং সমৃদ্ধ একটি ভাষা, যা আমাদের পরম আবেগের মাতৃভাষা!",
    tagline: "এসো আনন্দে বাংলা শিখি!"
  };
};

export function Worksheet({ speak }: WorksheetProps) {
  const [selectedWorksheetId, setSelectedWorksheetId] = useState<number | null>(null);
  const [completedWorksheets, setCompletedWorksheets] = useState<number[]>([]);
  
  // Interactive student state per worksheet
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [scores, setScores] = useState<Record<string, boolean>>({}); // challengeId -> isCorrect
  const [scrambledAnswers, setScrambledAnswers] = useState<Record<string, string[]>>({}); // scrambledItemId -> user letter sequence
  const [fillBlankAnswers, setFillBlankAnswers] = useState<Record<string, string>>({}); // item_id -> chosen letter
  const [matchPicSelections, setMatchPicSelections] = useState<{ letter: string; imageKey: string } | null>(null);
  const [matchSuccesses, setMatchSuccesses] = useState<string[]>([]); // list of successfully matched ids
  const [circleSelections, setCircleSelections] = useState<Record<string, string>>({}); // itemId -> chosen option
  const [twoWordsSelections, setTwoWordsSelections] = useState<Record<string, string[]>>({}); // itemId -> array of chosen words
  const [showCelebration, setShowCelebration] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeWorksheet = WORKSHEETS_DATA.find(w => w.id === selectedWorksheetId);
  const activeGuide = activeWorksheet ? getEducationalGuide(activeWorksheet.id) : null;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const speakText = (text: string) => {
    speak(text);
  };

  const handleSelectWorksheet = (id: number) => {
    const ws = WORKSHEETS_DATA.find(w => w.id === id);
    if (ws) {
      speakText(`${ws.bnTitle}: ${ws.subtitle}. ${ws.description}`);
    }
    setSelectedWorksheetId(id);
    setCurrentChallengeIndex(0);
    setScores({});
    setScrambledAnswers({});
    setFillBlankAnswers({});
    setMatchPicSelections(null);
    setMatchSuccesses([]);
    setCircleSelections({});
    setTwoWordsSelections({});
    setShowCelebration(false);
  };

  const handleBackToList = () => {
    setSelectedWorksheetId(null);
  };

  const handleNextChallenge = () => {
    if (!activeWorksheet) return;
    if (currentChallengeIndex < activeWorksheet.challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      // Finished all challenges in this worksheet!
      if (!completedWorksheets.includes(activeWorksheet.id)) {
        setCompletedWorksheets(prev => [...prev, activeWorksheet.id]);
      }
      setShowCelebration(true);
      speakText(`অভিনন্দন! আপনি ${activeWorksheet.bnTitle} সফলভাবে সম্পন্ন করেছেন! আপনি একটি গোল্ডেন মেডেল এবং ৩০০ তারকা পেয়েছেন!`);
    }
  };

  // Challenge evaluation logic
  const checkChallengeAnswer = (challenge: Challenge) => {
    if (challenge.type === 'firstLetter') {
      const items = challenge.items || [];
      const allCorrect = items.every(item => fillBlankAnswers[item.id] === item.correctLetter);
      if (allCorrect) {
        setScores(prev => ({ ...prev, [challenge.id]: true }));
        speakText('অসাধারণ সোনামণি! একদম সঠিক হয়েছে!');
        triggerToast('🎉 চমৎকার! সব সঠিক হয়েছে!');
        setTimeout(handleNextChallenge, 1500);
      } else {
        speakText('আবার চেষ্টা করো সোনামণি, সঠিক হয়নি!');
        triggerToast('❌ কিছু উত্তর ভুল হয়েছে, আবার চেষ্টা করো!');
      }
    } else if (challenge.type === 'fillBlank') {
      const items = challenge.items || [];
      const allCorrect = items.every(item => fillBlankAnswers[item.id] === item.correctLetter);
      if (allCorrect) {
        setScores(prev => ({ ...prev, [challenge.id]: true }));
        speakText('খুব সুন্দর! একদম সঠিক হয়েছে!');
        triggerToast('🌟 চমৎকার! দারুণ পারছো!');
        setTimeout(handleNextChallenge, 1500);
      } else {
        speakText('ভুল হয়েছে, আবার চিন্তা করো!');
        triggerToast('⚠️ কিছু ফাঁকা ঘর ভুল হয়েছে, আবার চেষ্টা করো!');
      }
    } else if (challenge.type === 'circleStart') {
      const items = challenge.circleItems || [];
      const allCorrect = items.every(item => circleSelections[item.id] === item.correctLetter);
      if (allCorrect) {
        setScores(prev => ({ ...prev, [challenge.id]: true }));
        speakText('দারুণ! সঠিক উত্তর হয়েছে!');
        triggerToast('🍭 অসাধারণ! সব কটি গোল সঠিক হয়েছে!');
        setTimeout(handleNextChallenge, 1500);
      } else {
        speakText('ভুল হয়েছে সোনামণি, আবার চেষ্টা করো!');
        triggerToast('❌ ভুল হয়েছে! আবার অক্ষরগুলো দেখে সিলেক্ট করো!');
      }
    } else if (challenge.type === 'scrambled') {
      const items = challenge.scrambledItems || [];
      const allCorrect = items.every(item => {
        const userSeq = scrambledAnswers[item.id] || [];
        return userSeq.join('') === item.correctWord;
      });
      if (allCorrect) {
        setScores(prev => ({ ...prev, [challenge.id]: true }));
        speakText('বানান একদম সঠিক হয়েছে!');
        triggerToast('🎨 অসাধারণ বানান দক্ষতা! সঠিক হয়েছে!');
        setTimeout(handleNextChallenge, 1500);
      } else {
        speakText('বানান সঠিক হয়নি, অক্ষরগুলো সাজাও!');
        triggerToast('🧐 বানানটি সঠিক হয়নি, বর্ণগুলো নতুন করে সাজাও!');
      }
    } else if (challenge.type === 'twoWords') {
      const items = challenge.twoWordsItems || [];
      const allCorrect = items.every(item => {
        const selected = twoWordsSelections[item.id] || [];
        return selected.length === 2 && selected.every(val => item.correctPair.includes(val));
      });
      if (allCorrect) {
        setScores(prev => ({ ...prev, [challenge.id]: true }));
        speakText('অসাধারণ মেধা! চূড়ান্ত ওয়ার্কশীট জয় করেছো!');
        triggerToast('🏆 অভিনন্দন! তুমি মেডেল জিতেছো!');
        setTimeout(handleNextChallenge, 2000);
      } else {
        speakText('ভুল হয়েছে, দুটি সঠিক শব্দ বেছে নাও!');
        triggerToast('⚠️ প্রতিটি ছবির জন্য ঠিক ২টি সঠিক শব্দ বেছে নাও!');
      }
    }
  };

  const handleScrambledLetterClick = (itemId: string, letter: string, maxLength: number) => {
    const current = scrambledAnswers[itemId] || [];
    if (current.includes(letter)) {
      // Remove it
      setScrambledAnswers(prev => ({
        ...prev,
        [itemId]: prev[itemId].filter(l => l !== letter)
      }));
    } else {
      if (current.length < maxLength) {
        setScrambledAnswers(prev => ({
          ...prev,
          [itemId]: [...(prev[itemId] || []), letter]
        }));
      }
    }
  };

  const handleMatchPicClick = (letter: string, imageKey: string, matchId: string, challengeId: string, totalItemsCount: number) => {
    speakText(`মিল করো ${letter}`);
    if (!matchPicSelections) {
      setMatchPicSelections({ letter, imageKey });
    } else {
      // Check if this matches a real item in the challenge
      if (matchPicSelections.letter === letter && matchPicSelections.imageKey === imageKey) {
        // user clicked the same
        setMatchPicSelections(null);
        return;
      }

      // Check if matching pair is correct
      const isCorrectPair = letter === matchPicSelections.letter || imageKey === matchPicSelections.imageKey;
      if (isCorrectPair) {
        const updatedSuccesses = [...matchSuccesses, matchId];
        setMatchSuccesses(updatedSuccesses);
        speakText('সঠীক মিল হয়েছে! দারুণ!');
        triggerToast('🌸 দারুণ জোড় মিলেছে!');
        setMatchPicSelections(null);

        if (updatedSuccesses.length >= totalItemsCount) {
          setScores(prev => ({ ...prev, [challengeId]: true }));
          speakText('সবগুলো মিলকরণ সফলভাবে সম্পন্ন হয়েছে!');
          setTimeout(handleNextChallenge, 1500);
        }
      } else {
        speakText('ভুল মিল, আবার চেষ্টা করো!');
        triggerToast('❌ জোড়াটি মেলেনি, আবার ট্রাই করো!');
        setMatchPicSelections(null);
      }
    }
  };

  const toggleTwoWordSelection = (itemId: string, word: string) => {
    const current = twoWordsSelections[itemId] || [];
    if (current.includes(word)) {
      setTwoWordsSelections(prev => ({
        ...prev,
        [itemId]: prev[itemId].filter(w => w !== word)
      }));
    } else {
      if (current.length < 2) {
        setTwoWordsSelections(prev => ({
          ...prev,
          [itemId]: [...current, word]
        }));
      } else {
        triggerToast('সর্বোচ্চ ২টি শব্দ নির্বাচন করা যাবে!');
      }
    }
  };

  return (
    <div id="bangla-worksheet-section" className="w-full max-w-6xl mx-auto px-4 py-8 relative">
      
      {/* Toast notification wrapper */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1a2333] border-2 border-yellow-400 text-yellow-300 font-black px-6 py-3 rounded-full shadow-2xl flex items-center gap-2"
          >
            <Icon name="Sparkles" className="w-5 h-5 text-yellow-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedWorksheetId ? (
        // DASHBOARD INDEX OF 20 WORKSHEETS
        <div>
          <div className="text-center mb-10 bg-gradient-to-r from-indigo-950/40 via-[#161b22] to-purple-950/40 border border-[#30363d] rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 flex items-center justify-center gap-2">
              <span className="text-3xl sm:text-4xl animate-bounce">🎡</span> আমাদের সোনামণিদের মজার বাংলা স্কুল!
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed font-semibold">
              বাচ্চাদের বাংলা বর্ণমালা চেনা, প্রথম অক্ষরের সাথে ছবির মিল করা ও বর্ণ সাজিয়ে নতুন নতুন শব্দ তৈরি করার রঙিন ও আকর্ষণীয় ২০টি ইন্টারেক্টিভ ওয়ার্ক শীট!
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <span className="bg-yellow-400/10 text-yellow-300 border border-yellow-500/30 px-5 py-2 rounded-full text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md">
                🏆 সম্পন্ন ওয়ার্কশীটঃ {completedWorksheets.length} / ২০
              </span>
              <span className="bg-amber-400/10 text-amber-300 border border-amber-500/30 px-5 py-2 rounded-full text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md">
                ⭐ অর্জিত মোট তারকাঃ {completedWorksheets.length * 3} 🌟
              </span>
              {completedWorksheets.length > 0 && (
                <button
                  onClick={() => {
                    setCompletedWorksheets([]);
                    speakText('সকল ওয়ার্কশীট রিসেট করা হয়েছে!');
                  }}
                  className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 px-4 py-2 rounded-full text-xs font-black transition-all shadow-md active:scale-95"
                >
                  সব রিসেট করো 🔄
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {WORKSHEETS_DATA.map((ws) => {
              const isCompleted = completedWorksheets.includes(ws.id);
              const cat = getWorksheetCategory(ws.id);
              return (
                <motion.div
                  key={ws.id}
                  whileHover={{ scale: 1.04, y: -6, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectWorksheet(ws.id)}
                  className={`cursor-pointer bg-[#161b22] border-2 ${isCompleted ? 'border-emerald-500/40' : 'border-[#30363d] hover:border-amber-400/50'} rounded-3xl p-5 shadow-lg relative overflow-hidden group flex flex-col justify-between h-[210px] transition-all`}
                >
                  {/* Colorful Background Corner Accent */}
                  <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${ws.colorTheme} opacity-15 rounded-full blur-xl group-hover:opacity-30 transition-opacity`} />
                  
                  <div>
                    <div className="flex justify-between items-center mb-2 gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${cat.color}`}>
                        <span>{cat.icon}</span> {cat.name}
                      </span>
                      {isCompleted ? (
                        <span className="text-[10px] font-black text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          🌟 সম্পন্ন
                        </span>
                      ) : (
                        <span className="text-[9px] text-gray-500 uppercase font-black tracking-wider bg-[#0d1117] px-2 py-0.5 rounded-full border border-gray-800">
                          অসম্পূর্ণ
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                      <span className="text-sm bg-gradient-to-r from-yellow-400 to-amber-500 text-black w-6 h-6 rounded-full flex items-center justify-center font-bold">
                        {ws.id}
                      </span>
                      {ws.bnTitle}
                    </h3>
                    <p className="text-sm font-bold text-gray-200 mt-1.5 line-clamp-1">
                      {ws.subtitle}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8">
                      {ws.description}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-800/60">
                      <span className="text-[11px] font-bold text-amber-400/80 group-hover:text-amber-400 flex items-center gap-1 transition-colors">
                        🌈 শুরু করো
                      </span>
                      <span className={`w-7 h-7 rounded-full bg-gradient-to-br ${ws.colorTheme} flex items-center justify-center text-white shadow-md transform group-hover:translate-x-1.5 transition-transform`}>
                        <Icon name="ArrowRight" className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        // ACTIVE WORKSHEET INTERACTIVE AREA
        <div className="max-w-4xl mx-auto">
          
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-[#161b22] p-4 rounded-2xl border border-[#30363d] shadow-lg">
            <button
              onClick={handleBackToList}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0d1117] border border-[#30363d] hover:bg-[#21262d] text-gray-300 hover:text-white transition-all font-bold text-sm active:scale-95 shrink-0"
            >
              <Icon name="ArrowLeft" className="w-4 h-4" />
              <span>🔙 তালিকায় ফিরে যাও</span>
            </button>

            <div className="flex items-center gap-3 bg-[#0d1117] px-4 py-2 rounded-full border border-amber-500/20 shadow-inner">
              <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${activeWorksheet.colorTheme} animate-pulse`} />
              <span className="text-sm font-black text-white flex items-center gap-1.5">
                <span>📚</span> {activeWorksheet.bnTitle} : <span className="text-amber-300">{activeWorksheet.subtitle}</span>
              </span>
            </div>

            {/* Speaking voice support */}
            <button
              onClick={() => speakText(`আমরা করছি ${activeWorksheet.bnTitle}. ${activeWorksheet.subtitle}. ${activeWorksheet.description}`)}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-all font-black text-xs active:scale-95"
              title="পুরো নির্দেশিকা শুনুন"
            >
              <Icon name="Volume2" className="w-4 h-4 shrink-0 animate-bounce" />
              <span>🔊 পুরো নির্দেশ শোনো</span>
            </button>
          </div>

          {/* Elegant Mascot-driven Progress Bar */}
          {!showCelebration && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 mb-6 shadow-md">
              <div className="flex justify-between items-center text-xs font-black text-gray-400 mb-2">
                <span>🚌 আমাদের পড়ার গাড়ি চলছে...</span>
                <span className="text-amber-400">ধাপঃ {currentChallengeIndex + 1} / {activeWorksheet.challenges.length}</span>
              </div>
              <div className="w-full bg-[#0d1117] h-6 rounded-full relative overflow-hidden border border-[#30363d] p-0.5 flex items-center">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${activeWorksheet.colorTheme} flex items-center justify-end pr-2`}
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentChallengeIndex + 1) / activeWorksheet.challenges.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute text-xl select-none filter drop-shadow-md"
                  animate={{ left: `calc(${Math.max(2, Math.min(94, ((currentChallengeIndex + 1) / activeWorksheet.challenges.length) * 100))}% - 12px)` }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  🚌
                </motion.div>
                <span className="absolute right-3 text-[11px] font-black text-white/90">🏫 স্কুল</span>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!showCelebration ? (
              <motion.div
                key={currentChallengeIndex}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                className="bg-[#161b22] border-2 border-[#30363d] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Header Banner Accent */}
                <div className={`absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r ${activeWorksheet.colorTheme}`} />
                
                {/* Challenge Title & Questions */}
                {(() => {
                  const challenge = activeWorksheet.challenges[currentChallengeIndex];
                  if (!challenge) return null;

                  return (
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-6">
                        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 leading-relaxed">
                          <span className="text-2xl sm:text-3xl animate-bounce">📝</span> {challenge.question}
                        </h3>
                        <button
                          onClick={() => speakText(challenge.question)}
                          className="bg-gray-800/80 hover:bg-gray-700 text-amber-400 p-2 rounded-full border border-gray-700 active:scale-95 shrink-0 transition-transform"
                          title="প্রশ্নটি শোনো"
                        >
                          <Icon name="Volume2" className="w-4 h-4" />
                        </button>
                      </div>

                      {/* RENDERING CHALLENGE BY TYPE */}
                      {challenge.type === 'firstLetter' && challenge.items && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6">
                          {challenge.items.map((item) => {
                            const selected = fillBlankAnswers[item.id] || '';
                            return (
                              <div key={item.id} className="bg-[#0d1117] border-2 border-[#21262d] hover:border-amber-400/30 rounded-3xl p-5 flex flex-col items-center text-center transition-all">
                                <motion.div 
                                  whileHover={{ scale: 1.15, rotate: 3 }}
                                  className="text-7xl mb-4 select-none filter drop-shadow-md cursor-pointer"
                                  onClick={() => speakText(item.wordMeaning || '')}
                                >
                                  {EMOJI_MAP[item.imageKey] || '✨'}
                                </motion.div>
                                
                                <div className="text-2xl font-black text-white tracking-widest mb-4 flex items-center gap-1.5 justify-center">
                                  {item.wordWithBlank.replace('_', selected || '❓')}
                                </div>

                                {/* Options Selection */}
                                <div className="grid grid-cols-4 gap-2 w-full mt-2">
                                  {item.options.map((opt) => (
                                    <button
                                      key={opt}
                                      onClick={() => {
                                        setFillBlankAnswers(prev => ({ ...prev, [item.id]: opt }));
                                        speakText(opt);
                                      }}
                                      className={`py-2 px-1 rounded-xl text-lg font-black transition-all transform active:scale-90 ${
                                        selected === opt
                                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-500/20 font-extrabold'
                                          : 'bg-[#161b22] border border-[#30363d] hover:border-amber-400 text-gray-200 hover:bg-gray-800/50'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                                <div className="mt-3 text-[11px] text-gray-400 font-bold">
                                  ছবিতে ক্লিক করে নাম শোনো 🔊
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {challenge.type === 'fillBlank' && challenge.items && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6">
                          {challenge.items.map((item) => {
                            const selected = fillBlankAnswers[item.id] || '';
                            return (
                              <div key={item.id} className="bg-[#0d1117] border-2 border-[#21262d] hover:border-green-500/30 rounded-3xl p-5 flex flex-col items-center text-center transition-all">
                                <motion.div 
                                  whileHover={{ scale: 1.15, rotate: -3 }}
                                  className="text-7xl mb-4 select-none filter drop-shadow-md cursor-pointer"
                                  onClick={() => speakText(item.wordMeaning || '')}
                                >
                                  {EMOJI_MAP[item.imageKey] || '🍎'}
                                </motion.div>

                                <div className="text-3xl font-black text-amber-300 mb-5 tracking-widest">
                                  {item.wordWithBlank.replace('_', selected || '___')}
                                </div>

                                <div className="grid grid-cols-4 gap-2 w-full">
                                  {item.options.map((opt) => (
                                    <button
                                      key={opt}
                                      onClick={() => {
                                        setFillBlankAnswers(prev => ({ ...prev, [item.id]: opt }));
                                        speakText(opt);
                                      }}
                                      className={`py-2.5 rounded-xl text-lg font-black transition-all transform active:scale-90 ${
                                        selected === opt
                                          ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-black shadow-lg shadow-green-500/20'
                                          : 'bg-[#161b22] border border-[#30363d] hover:border-green-400 text-gray-200 hover:bg-gray-800/50'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {challenge.type === 'circleStart' && challenge.circleItems && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6">
                          {challenge.circleItems.map((item) => {
                            const selected = circleSelections[item.id] || '';
                            return (
                              <div key={item.id} className="bg-[#0d1117] border-2 border-[#21262d] hover:border-indigo-500/30 rounded-3xl p-6 flex flex-col items-center transition-all">
                                <motion.div 
                                  whileHover={{ scale: 1.15, rotate: 4 }}
                                  className="text-7xl mb-5 select-none filter drop-shadow-md cursor-pointer"
                                  onClick={() => speakText('গোল করো প্রথম অক্ষর')}
                                >
                                  {EMOJI_MAP[item.imageKey] || '🌳'}
                                </motion.div>

                                <div className="grid grid-cols-2 gap-3 w-full">
                                  {item.options.map((opt) => (
                                    <button
                                      key={opt}
                                      onClick={() => {
                                        setCircleSelections(prev => ({ ...prev, [item.id]: opt }));
                                        speakText(opt);
                                      }}
                                      className={`py-3 rounded-full text-xl font-black transition-all border transform active:scale-95 ${
                                        selected === opt
                                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-transparent ring-4 ring-indigo-500/20 shadow-lg'
                                          : 'bg-[#161b22] border-[#30363d] hover:border-indigo-400 text-gray-200'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {challenge.type === 'scrambled' && challenge.scrambledItems && (
                        <div className="flex flex-col gap-8 my-6">
                          {challenge.scrambledItems.map((item) => {
                            const currentSeq = scrambledAnswers[item.id] || [];
                            return (
                              <div key={item.id} className="bg-[#0d1117] border-2 border-[#21262d] hover:border-yellow-400/20 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6">
                                <motion.div 
                                  whileHover={{ scale: 1.1, rotate: -4 }}
                                  onClick={() => speakText(item.correctWord)}
                                  className="text-7xl select-none shrink-0 bg-[#161b22] p-4 rounded-3xl border border-[#30363d] shadow-inner cursor-pointer"
                                >
                                  {EMOJI_MAP[item.imageKey] || '🧩'}
                                </motion.div>

                                <div className="flex-1 w-full flex flex-col items-center sm:items-start">
                                  <span className="text-xs text-amber-400 mb-2 font-black uppercase tracking-wider flex items-center gap-1">
                                    <span>💡</span> বর্ণগুলো সাজিয়ে মিষ্টি বানানটি তৈরি করোঃ
                                  </span>
                                  
                                  {/* Answer Slot Display */}
                                  <div className="flex gap-2 min-h-[55px] items-center mb-5 bg-[#161b22] p-2.5 rounded-2xl border border-[#30363d] w-full justify-center sm:justify-start shadow-inner">
                                    {currentSeq.length === 0 ? (
                                      <span className="text-xs sm:text-sm font-black text-gray-400 italic px-3 animate-pulse">
                                        নিচের অক্ষরগুলোতে টাচ করে সঠিক ক্রমানুসারে বানান করো...
                                      </span>
                                    ) : (
                                      currentSeq.map((char, index) => (
                                        <motion.span 
                                          key={index}
                                          initial={{ scale: 0.7, y: 10 }}
                                          animate={{ scale: 1, y: 0 }}
                                          className="text-2xl font-black text-amber-300 bg-[#0d1117] border-2 border-amber-400/40 px-4 py-2 rounded-xl"
                                        >
                                          {char}
                                        </motion.span>
                                      ))
                                    )}
                                  </div>

                                  {/* Scattered Clickable Letters */}
                                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                    {item.letters.map((letter, idx) => {
                                      const isSelected = currentSeq.includes(letter);
                                      return (
                                        <button
                                          key={idx}
                                          onClick={() => {
                                            handleScrambledLetterClick(item.id, letter, item.correctWord.length);
                                            speakText(letter);
                                          }}
                                          className={`py-2 px-5 rounded-xl text-xl font-black transition-all transform active:scale-90 ${
                                            isSelected
                                              ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-transparent opacity-40'
                                              : 'bg-gradient-to-br from-[#1f2937] to-[#111827] border-2 border-gray-700 text-white hover:border-amber-400 shadow-md'
                                          }`}
                                        >
                                          {letter}
                                        </button>
                                      );
                                    })}
                                    {currentSeq.length > 0 && (
                                      <button
                                        onClick={() => {
                                          setScrambledAnswers(prev => ({ ...prev, [item.id]: [] }));
                                          speakText('সব মুছে ফেলা হয়েছে');
                                        }}
                                        className="py-2 px-4 rounded-xl bg-red-950/80 border border-red-800 text-red-300 font-bold text-sm hover:bg-red-900 transition-colors shadow-sm active:scale-90"
                                      >
                                        মুছে দাও ❌
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {challenge.type === 'matchPic' && challenge.matchItems && (
                        <div className="my-6">
                          <p className="text-xs sm:text-sm text-yellow-300 mb-4 font-black italic bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 flex items-center gap-1.5">
                            <span>💡</span> বাম পাশ থেকে একটি বর্ণ বা শব্দ সিলেক্ট করো এবং তারপর ডানপাশের সঠিক ছবিটিতে ক্লিক করে জোড়া মিলিয়ে দাও!
                          </p>

                          <div className="grid grid-cols-2 gap-8">
                            {/* Left Column: Letters/Names */}
                            <div className="flex flex-col gap-3">
                              <span className="text-xs font-black uppercase text-[#8b949e] tracking-wider mb-1 flex items-center gap-1">
                                <span>🅰️</span> বর্ণ বা শব্দ তালিকা
                              </span>
                              {challenge.matchItems.map((item) => {
                                const isMatched = matchSuccesses.includes(item.id);
                                const isSelected = matchPicSelections?.letter === item.letter;
                                return (
                                  <button
                                    key={item.id}
                                    disabled={isMatched}
                                    onClick={() => handleMatchPicClick(item.letter, item.imageKey, item.id, challenge.id, challenge.matchItems!.length)}
                                    className={`py-4 px-3 rounded-2xl font-black text-xl text-center border-2 transition-all transform active:scale-95 ${
                                      isMatched
                                        ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400 line-through cursor-not-allowed opacity-50 flex items-center justify-center gap-2'
                                        : isSelected
                                        ? 'bg-amber-400 text-black border-transparent shadow-lg scale-102 ring-4 ring-amber-400/20'
                                        : 'bg-[#0d1117] border-[#30363d] text-white hover:border-amber-400'
                                    }`}
                                  >
                                    <span>{item.letter}</span>
                                    {isMatched && <span className="text-sm">✅ matched</span>}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Right Column: Pictures */}
                            <div className="flex flex-col gap-3">
                              <span className="text-xs font-black uppercase text-[#8b949e] tracking-wider mb-1 flex items-center gap-1">
                                <span>🖼️</span> ছবি মেলবন্ধন
                              </span>
                              {challenge.matchItems.map((item) => {
                                const isMatched = matchSuccesses.includes(item.id);
                                const isSelected = matchPicSelections?.imageKey === item.imageKey;
                                return (
                                  <button
                                    key={item.id}
                                    disabled={isMatched}
                                    onClick={() => handleMatchPicClick(item.letter, item.imageKey, item.id, challenge.id, challenge.matchItems!.length)}
                                    className={`py-3 px-3 rounded-2xl flex items-center justify-center gap-3 border-2 transition-all h-[62px] transform active:scale-95 ${
                                      isMatched
                                        ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400 cursor-not-allowed opacity-50'
                                        : isSelected
                                        ? 'bg-amber-400 text-black border-transparent shadow-lg scale-102 ring-4 ring-amber-400/20'
                                        : 'bg-[#0d1117] border-[#30363d] text-white hover:border-amber-400'
                                    }`}
                                  >
                                    <span className="text-3xl select-none">{EMOJI_MAP[item.imageKey] || '🍎'}</span>
                                    <span className="text-xs sm:text-sm font-black text-gray-200">{item.itemName}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {challenge.type === 'twoWords' && challenge.twoWordsItems && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-6">
                          {challenge.twoWordsItems.map((item) => {
                            const selected = twoWordsSelections[item.id] || [];
                            return (
                              <div key={item.id} className="bg-[#0d1117] border-2 border-[#21262d] hover:border-purple-500/20 rounded-3xl p-6 flex flex-col items-center transition-all">
                                <motion.div 
                                  whileHover={{ scale: 1.12, rotate: 5 }}
                                  className="text-7xl mb-4 select-none filter drop-shadow-md bg-[#161b22] p-4 rounded-full border border-[#30363d]"
                                  onClick={() => speakText(item.letter)}
                                >
                                  {EMOJI_MAP[item.imageKey]}
                                </motion.div>
                                <div className="text-base sm:text-lg font-black text-gray-300 mb-4 text-center">
                                  "{item.letter}" দিয়ে শুরু হওয়া ঠিক <span className="text-amber-400 font-extrabold underline decoration-amber-500">২টি শব্দ</span> বেছে নাওঃ
                                </div>
                                <div className="grid grid-cols-2 gap-3 w-full">
                                  {item.options.map((opt) => {
                                    const isChosen = selected.includes(opt);
                                    return (
                                      <button
                                        key={opt}
                                        onClick={() => {
                                          toggleTwoWordSelection(item.id, opt);
                                          speakText(opt);
                                        }}
                                        className={`py-3.5 rounded-xl font-black text-lg transition-all transform active:scale-95 ${
                                          isChosen
                                            ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg border-transparent ring-4 ring-indigo-500/25'
                                            : 'bg-[#161b22] border-2 border-gray-800 text-gray-200 hover:border-purple-400 hover:bg-gray-850'
                                        }`}
                                      >
                                        {opt}
                                      </button>
                                    );
                                  })}
                                </div>
                                <div className="mt-4 text-xs font-black text-[#8b949e]">
                                  নির্বাচিতঃ {selected.length} / ২
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Submit / Verification Controls */}
                      <div className="mt-8 pt-6 border-t border-[#30363d] flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400">
                          🎯 মেধা অর্জন লক্ষ্যঃ নিখুঁত সমাধান করো!
                        </span>
                        {challenge.type !== 'matchPic' && (
                          <button
                            onClick={() => checkChallengeAnswer(challenge)}
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black px-8 py-4 rounded-full shadow-lg text-sm sm:text-base transition-all transform active:scale-95 flex items-center gap-1.5 hover:shadow-emerald-500/25"
                          >
                            <Icon name="CheckCircle2" className="w-5 h-5 text-emerald-200 animate-pulse" />
                            <span>উত্তর যাচাই করো 📝</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            ) : (
              // CELEBRATION COMPLETED VIEW
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#161b22] border-4 border-yellow-400 rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden"
              >
                {/* Sparkles background effect */}
                <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-400/10 rounded-full blur-3xl animate-pulse" />

                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 flex items-center justify-center text-6xl mx-auto mb-6 shadow-xl shadow-yellow-950/50 animate-bounce">
                  👑
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                  অসাধারণ কাজ সোনামণি! 🎉
                </h2>
                <h3 className="text-xl sm:text-2xl font-black text-yellow-300 mb-4">
                  🏆 {activeWorksheet.bnTitle} : {activeWorksheet.subtitle} সম্পন্ন হয়েছে!
                </h3>
                
                {/* Visual Certificate Details */}
                <div className="max-w-md mx-auto bg-[#0d1117] border border-[#30363d] p-5 rounded-2xl mb-8 text-left shadow-inner">
                  <div className="text-center text-xs font-black text-gray-400 border-b border-gray-800 pb-2 mb-3 tracking-widest uppercase">
                    খুদে বিজয়ী সার্টিফিকেট কার্ড
                  </div>
                  <div className="flex justify-between py-1 text-sm">
                    <span className="text-gray-400 font-bold">পাঠের লক্ষ্যঃ</span>
                    <span className="text-white font-black">{getWorksheetCategory(activeWorksheet.id).name}</span>
                  </div>
                  <div className="flex justify-between py-1 text-sm">
                    <span className="text-gray-400 font-bold">অর্জিত মেডেলঃ</span>
                    <span className="text-yellow-400 font-black">🥇 গোল্ডেন কিডজ মেডেল</span>
                  </div>
                  <div className="flex justify-between py-1 text-sm">
                    <span className="text-gray-400 font-bold">উপহার পয়েন্টঃ</span>
                    <span className="text-amber-300 font-black">⭐ +৩০০ তারকা পয়েন্ট</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={handleBackToList}
                    className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 text-black font-black px-8 py-3.5 rounded-full shadow-lg text-sm sm:text-base transition-transform hover:scale-105 active:scale-95"
                  >
                    পরবর্তী ওয়ার্ক শীট খেলো 🚀
                  </button>
                  <button
                    onClick={() => handleSelectWorksheet(activeWorksheet.id)}
                    className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white font-black px-8 py-3.5 rounded-full text-sm sm:text-base transition-colors"
                  >
                    আবার খেলো 🔄
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Educative Teacher Tips Box at the bottom */}
          {activeGuide && !showCelebration && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gradient-to-r from-indigo-950/40 via-[#161b22] to-indigo-950/40 border border-indigo-500/25 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-2 text-indigo-300 font-black text-lg mb-3 border-b border-indigo-500/20 pb-2">
                <span>👩‍🏫</span>
                <h4>শিক্ষকের পরামর্শ ও মজার তথ্য গাইড (Teacher's Guide)</h4>
              </div>
              <div className="space-y-3.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                <div>
                  <span className="bg-indigo-400/10 text-indigo-300 px-2.5 py-0.5 rounded-full text-xs font-black mr-2">
                    🎯 শিক্ষণীয় লক্ষ্য
                  </span>
                  <span className="font-semibold text-white">{activeGuide.focus}</span>
                </div>
                <div>
                  <span className="bg-yellow-400/10 text-yellow-300 px-2.5 py-0.5 rounded-full text-xs font-black mr-2">
                    💡 শিক্ষকের টিপস
                  </span>
                  <span>{activeGuide.tip}</span>
                </div>
                <div>
                  <span className="bg-emerald-400/10 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-black mr-2">
                    🧠 তুমি কি জানো?
                  </span>
                  <span className="text-gray-200">{activeGuide.fact}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-indigo-500/10 text-center">
                <span className="text-xs font-black text-indigo-300/90 animate-pulse block">
                  {activeGuide.tagline}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
