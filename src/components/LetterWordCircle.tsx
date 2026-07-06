import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BENGALI_ALPHABET } from '../data';
import { AlphabetItem } from '../types';
import { Icon } from './Icon';

interface WordAssociation {
  word: string;
  emoji: string;
  meaning: string;
}

// Comprehensive dictionary matching all vowels and consonants with 8 words each like the images!
const WORD_CIRCLES_DATA: Record<string, WordAssociation[]> = {
  // Vowels
  'অ': [
    { word: 'অজগর', emoji: '🐍', meaning: 'Python snake' },
    { word: 'অলংকার', emoji: '👑', meaning: 'Ornaments' },
    { word: 'অর্ধেক', emoji: '🌓', meaning: 'Half' },
    { word: 'অন্ধকার', emoji: '🌑', meaning: 'Darkness' },
    { word: 'অগ্নি', emoji: '🔥', meaning: 'Fire' },
    { word: 'অপূর্ব', emoji: '🌟', meaning: 'Wonderful' },
    { word: 'অমর', emoji: '♾️', meaning: 'Immortal' },
    { word: 'অন্ন', emoji: '🍚', meaning: 'Food/Rice' }
  ],
  'আ': [
    { word: 'আম', emoji: '🥭', meaning: 'Mango' },
    { word: 'আকাশ', emoji: '☁️', meaning: 'Sky' },
    { word: 'আলো', emoji: '💡', meaning: 'Light' },
    { word: 'আসা', emoji: '🚶', meaning: 'To come' },
    { word: 'আওয়াজ', emoji: '🔊', meaning: 'Sound' },
    { word: 'আরাম', emoji: '🛋️', meaning: 'Comfort' },
    { word: 'আঠা', emoji: '🧪', meaning: 'Glue' },
    { word: 'আদর', emoji: '🤗', meaning: 'Affection' }
  ],
  'ই': [
    { word: 'ইলিশ', emoji: '🐟', meaning: 'Hilsa fish' },
    { word: 'ইট', emoji: '🧱', meaning: 'Brick' },
    { word: 'ইঁদুর', emoji: '🐭', meaning: 'Mouse' },
    { word: 'ইশারা', emoji: '👉', meaning: 'Gesture' },
    { word: 'ইচ্ছা', emoji: '💭', meaning: 'Wish' },
    { word: 'ইতিহাস', emoji: '📜', meaning: 'History' },
    { word: 'ইঞ্জিন', emoji: '🚂', meaning: 'Engine' },
    { word: 'ইস্ত্রি', emoji: '🔌', meaning: 'Iron' }
  ],
  'ঈ': [
    { word: 'ঈগল', emoji: '🦅', meaning: 'Eagle' },
    { word: 'ঈশান', emoji: '🧭', meaning: 'Northeast' },
    { word: 'ঈর্ষা', emoji: '😒', meaning: 'Jealousy' },
    { word: 'ঈশ্বর', emoji: '🌌', meaning: 'God' },
    { word: 'ঈদ', emoji: '🌙', meaning: 'Eid festival' },
    { word: 'ঈমান', emoji: '🙏', meaning: 'Faith' },
    { word: 'ঈষৎ', emoji: '🤏', meaning: 'Slightly' },
    { word: 'ঈপ্সিত', emoji: '🎯', meaning: 'Desired' }
  ],
  'উ': [
    { word: 'উট', emoji: '🐪', meaning: 'Camel' },
    { word: 'উঠান', emoji: '🏡', meaning: 'Courtyard' },
    { word: 'উড়োজাহাজ', emoji: '✈️', meaning: 'Airplane' },
    { word: 'উপহার', emoji: '🎁', meaning: 'Gift' },
    { word: 'উষ্ণ', emoji: '☀️', meaning: 'Warm' },
    { word: 'উদয়', emoji: '🌅', meaning: 'Sunrise' },
    { word: 'উত্তর', emoji: '🗺️', meaning: 'North / Answer' },
    { word: 'উপকার', emoji: '🤝', meaning: 'Help' }
  ],
  'ঊ': [
    { word: 'ঊনবিংশ', emoji: '🔢', meaning: 'Nineteenth' },
    { word: 'ঊর্ধ্ব', emoji: '⬆️', meaning: 'Upward' },
    { word: 'ঊষর', emoji: '🌵', meaning: 'Barren' },
    { word: 'ঊষা', emoji: '🌄', meaning: 'Dawn' },
    { word: 'ঊর্মী', emoji: '🌊', meaning: 'Wave' },
    { word: 'ঊরু', emoji: '🦵', meaning: 'Thigh' },
    { word: 'ঊনষাটি', emoji: '5️⃣9️⃣', meaning: 'Fifty-nine' },
    { word: 'ঊনত্রিশ', emoji: '2️⃣9️⃣', meaning: 'Twenty-nine' }
  ],
  'ঋ': [
    { word: 'ঋষি', emoji: '🧘', meaning: 'Sage/Saint' },
    { word: 'ঋতু', emoji: '🍂', meaning: 'Season' },
    { word: 'ঋণ', emoji: '💳', meaning: 'Debt' },
    { word: 'ঋজু', emoji: '📏', meaning: 'Straight' },
    { word: 'ঋকবেদ', emoji: '📖', meaning: 'Rigveda' },
    { word: 'ঋষভ', emoji: '🐂', meaning: 'Bull' },
    { word: 'ঋদ্ধি', emoji: '💰', meaning: 'Prosperity' },
    { word: 'ঋত্বিক', emoji: '🎭', meaning: 'Priest/Director' }
  ],
  'এ': [
    { word: 'এলাচি', emoji: '🌱', meaning: 'Cardamom' },
    { word: 'একতারা', emoji: '🪕', meaning: 'One-stringed instrument' },
    { word: 'এক', emoji: '1️⃣', meaning: 'One' },
    { word: 'একা', emoji: '🧍', meaning: 'Alone' },
    { word: 'একতা', emoji: '✊', meaning: 'Unity' },
    { word: 'এলোমেলো', emoji: '🌪️', meaning: 'Scrambled/Messy' },
    { word: 'এপ্রিল', emoji: '📅', meaning: 'April' },
    { word: 'এলাকা', emoji: '🗺️', meaning: 'Area' }
  ],
  'ঐ': [
    { word: 'ঐক্য', emoji: '🤝', meaning: 'Unity' },
    { word: 'ঐতিহাসিক', emoji: '🏰', meaning: 'Historical' },
    { word: 'ঐরাবত', emoji: '🐘', meaning: 'Royal Elephant' },
    { word: 'ঐশ্বর্য', emoji: '💎', meaning: 'Wealth' },
    { word: 'ঐচ্ছিক', emoji: '🎯', meaning: 'Optional' },
    { word: 'ঐকতান', emoji: '🎻', meaning: 'Harmony' },
    { word: 'ঐতিহ্য', emoji: '🏺', meaning: 'Heritage' },
    { word: 'ঐন্দ্রজালিক', emoji: '🧙', meaning: 'Magical' }
  ],
  'ও': [
    { word: 'ওলকপি', emoji: '🥬', meaning: 'Kohlrabi' },
    { word: 'ওজন', emoji: '⚖️', meaning: 'Weight' },
    { word: 'ওড়না', emoji: '🧣', meaning: 'Scarf' },
    { word: 'ওষুধ', emoji: '💊', meaning: 'Medicine' },
    { word: 'ওঠো', emoji: '🛌', meaning: 'Get up' },
    { word: 'ওপার', emoji: '🌅', meaning: 'Other side' },
    { word: 'ওরা', emoji: '👥', meaning: 'They' },
    { word: 'ওজনদার', emoji: '🏋️', meaning: 'Heavy' }
  ],
  'ঔ': [
    { word: 'ঔষধ', emoji: '🧪', meaning: 'Medicine' },
    { word: 'ঔদার্য', emoji: '❤️', meaning: 'Generosity' },
    { word: 'ঔদাসিন্য', emoji: '🤷', meaning: 'Indifference' },
    { word: 'ঔপন্যাসিক', emoji: '✍️', meaning: 'Novelist' },
    { word: 'ঔজ্জ্বল্য', emoji: '✨', meaning: 'Brightness' },
    { word: 'ঔৎসুক্য', emoji: '🧐', meaning: 'Curiosity' },
    { word: 'ঔচিত্য', emoji: '⚖️', meaning: 'Propriety' },
    { word: 'ঔপনিবেশিক', emoji: '🏛️', meaning: 'Colonial' }
  ],

  // Consonants
  'ক': [
    { word: 'কম', emoji: '🤏', meaning: 'Less' },
    { word: 'কাল', emoji: '🕰️', meaning: 'Time / Tomorrow' },
    { word: 'কাজ', emoji: '🔨', meaning: 'Work' },
    { word: 'কল', emoji: '🚰', meaning: 'Tap / Machine' },
    { word: 'কান', emoji: '👂', meaning: 'Ear' },
    { word: 'কাপ', emoji: '☕', meaning: 'Cup' },
    { word: 'কাক', emoji: '🐦', meaning: 'Crow' },
    { word: 'কর', emoji: '🤝', meaning: 'Do / Tax' }
  ],
  'খ': [
    { word: 'খরচ', emoji: '💸', meaning: 'Expense' },
    { word: 'খাত', emoji: '🪵', meaning: 'Ditch / Account' },
    { word: 'খবর', emoji: '📰', meaning: 'News' },
    { word: 'খাব', emoji: '😋', meaning: 'Will eat' },
    { word: 'খারাপ', emoji: '👎', meaning: 'Bad' },
    { word: 'খেলা', emoji: '⚽', meaning: 'Play / Game' },
    { word: 'খাবার', emoji: '🍲', meaning: 'Food' },
    { word: 'খাঁচা', emoji: '🕸️', meaning: 'Cage' }
  ],
  'গ': [
    { word: 'গগন', emoji: '☁️', meaning: 'Sky' },
    { word: 'গম', emoji: '🌾', meaning: 'Wheat' },
    { word: 'গাছ', emoji: '🌳', meaning: 'Tree' },
    { word: 'গজ', emoji: '🐘', meaning: 'Yard / Elephant' },
    { word: 'গাধা', emoji: '🐴', meaning: 'Donkey' },
    { word: 'গলা', emoji: '🧣', meaning: 'Throat' },
    { word: 'গাল', emoji: '😊', meaning: 'Cheek' },
    { word: 'গত', emoji: '📅', meaning: 'Past / Last' }
  ],
  'ঘ': [
    { word: 'ঘর', emoji: '🏠', meaning: 'Home' },
    { word: 'ঘড়ি', emoji: '⌚', meaning: 'Clock' },
    { word: 'ঘাস', emoji: '🌱', meaning: 'Grass' },
    { word: 'ঘোড়া', emoji: '🐎', meaning: 'Horse' },
    { word: 'ঘাম', emoji: '💦', meaning: 'Sweat' },
    { word: 'ঘি', emoji: '🥣', meaning: 'Clarified butter' },
    { word: 'ঘণ্টা', emoji: '🔔', meaning: 'Bell' },
    { word: 'ঘূর্ণি', emoji: '🌪️', meaning: 'Cyclone' }
  ],
  'ঙ': [
    { word: 'রঙ', emoji: '🎨', meaning: 'Color' },
    { word: 'ভাঙা', emoji: '💔', meaning: 'Broken' },
    { word: 'বাঙালী', emoji: '🐯', meaning: 'Bengali' },
    { word: 'অঙ্ক', emoji: '➕', meaning: 'Math' },
    { word: 'শঙ্খ', emoji: '🐚', meaning: 'Conch shell' },
    { word: 'জঙ্গল', emoji: '🌳', meaning: 'Jungle' },
    { word: 'ডিঙি', emoji: '🛶', meaning: 'Small boat' },
    { word: 'রঙিন', emoji: '🌈', meaning: 'Colorful' }
  ],
  'চ': [
    { word: 'চশমা', emoji: '👓', meaning: 'Spectacles' },
    { word: 'চামচ', emoji: '🥄', meaning: 'Spoon' },
    { word: 'চাঁদ', emoji: '🌙', meaning: 'Moon' },
    { word: 'চাকা', emoji: '🎡', meaning: 'Wheel' },
    { word: 'চা', emoji: '🍵', meaning: 'Tea' },
    { word: 'চাবুক', emoji: '🐎', meaning: 'Whip' },
    { word: 'ছবি', emoji: '🖼️', meaning: 'Picture' },
    { word: 'চড়ুই', emoji: '🐦', meaning: 'Sparrow' }
  ],
  'ছ': [
    { word: 'ছবি', emoji: '📷', meaning: 'Photo' },
    { word: 'ছাতা', emoji: '🌂', meaning: 'Umbrella' },
    { word: 'ছাগল', emoji: '🐐', meaning: 'Goat' },
    { word: 'ছাদ', emoji: '🏢', meaning: 'Roof' },
    { word: 'ছুরি', emoji: '🔪', meaning: 'Knife' },
    { word: 'ছাত্র', emoji: '🎒', meaning: 'Student' },
    { word: 'ছায়া', emoji: '👥', meaning: 'Shadow' },
    { word: 'ছোট', emoji: '🐜', meaning: 'Small' }
  ],
  'জ': [
    { word: 'জাহাজ', emoji: '🛳️', meaning: 'Ship' },
    { word: 'জল', emoji: '💧', meaning: 'Water' },
    { word: 'জুতো', emoji: '👞', meaning: 'Shoe' },
    { word: 'জবা', emoji: '🌺', meaning: 'Hibiscus' },
    { word: 'জাম', emoji: '🍇', meaning: 'Berry' },
    { word: 'জন্তু', emoji: '🦁', meaning: 'Animal' },
    { word: 'জীবন', emoji: '🌱', meaning: 'Life' },
    { word: 'জাদুকর', emoji: '🧙', meaning: 'Wizard' }
  ],
  'ঝ': [
    { word: 'ঝুড়ি', emoji: '🧺', meaning: 'Basket' },
    { word: 'ঝড়', emoji: '⛈️', meaning: 'Storm' },
    { word: 'ঝরনা', emoji: '🏞️', meaning: 'Waterfall' },
    { word: 'ঝাঁটা', emoji: '🧹', meaning: 'Broom' },
    { word: 'ঝগড়া', emoji: '🤬', meaning: 'Quarrel' },
    { word: 'ঝাল', emoji: '🌶️', meaning: 'Spicy' },
    { word: 'ঝুলন', emoji: '🎠', meaning: 'Swing' },
    { word: 'ঝিনুক', emoji: '🐚', meaning: 'Oyster' }
  ],
  'ঞ': [
    { word: 'মিঞা', emoji: '🧔', meaning: 'Gentleman' },
    { word: 'অঞ্চল', emoji: '🗺️', meaning: 'Region' },
    { word: 'পঞ্চাশ', emoji: '5️⃣0️⃣', meaning: 'Fifty' },
    { word: 'ব্যঞ্জন', emoji: '🍲', meaning: 'Curry/Consonant' },
    { word: 'চঞ্চল', emoji: '🏃', meaning: 'Restless' },
    { word: 'লাঞ্ছনা', emoji: '🥺', meaning: 'Humiliation' },
    { word: 'মিঞাবাড়ী', emoji: '🏡', meaning: 'Miah Mansion' },
    { word: 'পিঞ্জর', emoji: '🕸️', meaning: 'Cage' }
  ],
  'ট': [
    { word: 'টাকা', emoji: '💵', meaning: 'Money' },
    { word: 'টিয়া', emoji: '🦜', meaning: 'Parrot' },
    { word: 'টমেটো', emoji: '🍅', meaning: 'Tomato' },
    { word: 'টুপি', emoji: '🧢', meaning: 'Cap' },
    { word: 'টব', emoji: '🏺', meaning: 'Tub' },
    { word: 'টক', emoji: '🍋', meaning: 'Sour' },
    { word: 'ট্যাক্সি', emoji: '🚕', meaning: 'Taxi' },
    { word: 'টান', emoji: '🪢', meaning: 'Pull' }
  ],
  'ঠ': [
    { word: 'ঠাকুমা', emoji: '👵', meaning: 'Grandmother' },
    { word: 'ঠোঁট', emoji: '👄', meaning: 'Lips' },
    { word: 'ঠাণ্ডা', emoji: '❄️', meaning: 'Cold' },
    { word: 'ঠাট্টা', emoji: '😂', meaning: 'Joke' },
    { word: 'ঠিক', emoji: '✅', meaning: 'Correct' },
    { word: 'ঠাঁই', emoji: '📍', meaning: 'Place' },
    { word: 'ঠাসা', emoji: '🍱', meaning: 'Packed' },
    { word: 'ঠেলাগাড়ি', emoji: '🛒', meaning: 'Cart' }
  ],
  'ড': [
    { word: 'ডালিম', emoji: '🍎', meaning: 'Pomegranate' },
    { word: 'ডাব', emoji: '🥥', meaning: 'Green Coconut' },
    { word: 'ডানা', emoji: '🪶', meaning: 'Wing' },
    { word: 'ডাক্তার', emoji: '👨‍⚕️', meaning: 'Doctor' },
    { word: 'ডাল', emoji: '🥣', meaning: 'Pulses' },
    { word: 'ডালপালা', emoji: '🌿', meaning: 'Branches' },
    { word: 'ডিনামাইট', emoji: '🧨', meaning: 'Dynamite' },
    { word: 'ডুবুরি', emoji: '🤿', meaning: 'Diver' }
  ],
  'ঢ': [
    { word: 'ঢোল', emoji: '🥁', meaning: 'Drum' },
    { word: 'ঢাল', emoji: '🛡️', meaning: 'Shield' },
    { word: 'ঢাকনা', emoji: '🪞', meaning: 'Lid' },
    { word: 'ঢেউ', emoji: '🌊', meaning: 'Wave' },
    { word: 'ঢেঁকি', emoji: '🌾', meaning: 'Husking pedal' },
    { word: 'ঢিলা', emoji: '👕', meaning: 'Loose' },
    { word: 'ঢিপি', emoji: '🏔️', meaning: 'Mound' },
    { word: 'ঢুকা', emoji: '🚪', meaning: 'To enter' }
  ],
  'ণ': [
    { word: 'বীণা', emoji: '🪕', meaning: 'Veena' },
    { word: 'তৃণ', emoji: '🌾', meaning: 'Grass' },
    { word: 'হরিণ', emoji: '🦌', meaning: 'Deer' },
    { word: 'লবণ', emoji: '🧂', meaning: 'Salt' },
    { word: 'গণিত', emoji: '➕', meaning: 'Math' },
    { word: 'ফণা', emoji: '🐍', meaning: 'Hood of snake' },
    { word: 'পাণি', emoji: '🙌', meaning: 'Hand' },
    { word: 'বীণাবাদন', emoji: '🎵', meaning: 'Playing Veena' }
  ],
  'ত': [
    { word: 'তবলা', emoji: '🥁', meaning: 'Tabla' },
    { word: 'তরমুজ', emoji: '🍉', meaning: 'Watermelon' },
    { word: 'তারা', emoji: '⭐', meaning: 'Star' },
    { word: 'তিমি', emoji: '🐋', meaning: 'Whale' },
    { word: 'তালা', emoji: '🔒', meaning: 'Lock' },
    { word: 'তলোয়ার', emoji: '⚔️', meaning: 'Sword' },
    { word: 'তীর', emoji: '🏹', meaning: 'Arrow' },
    { word: 'তুষার', emoji: '❄️', meaning: 'Snow' }
  ],
  'থ': [
    { word: 'থালা', emoji: '🍽️', meaning: 'Plate' },
    { word: 'থলে', emoji: '🛍️', meaning: 'Bag' },
    { word: 'থুতনি', emoji: '🧔', meaning: 'Chin' },
    { word: 'থাম', emoji: '🏛️', meaning: 'Pillar' },
    { word: 'থুথু', emoji: '💦', meaning: 'Spit' },
    { word: 'থেমে', emoji: '🛑', meaning: 'Stopped' },
    { word: 'থিয়েটার', emoji: '🎭', meaning: 'Theater' },
    { word: 'থার্মোমিটার', emoji: '🌡️', meaning: 'Thermometer' }
  ],
  'দ': [
    { word: 'দাঁত', emoji: '🦷', meaning: 'Tooth' },
    { word: 'দই', emoji: '🥣', meaning: 'Yogurt' },
    { word: 'দরজা', emoji: '🚪', meaning: 'Door' },
    { word: 'দড়ি', emoji: '🪢', meaning: 'Rope' },
    { word: 'দেশ', emoji: '🇧🇩', meaning: 'Country' },
    { word: 'দিন', emoji: '☀️', meaning: 'Day' },
    { word: 'দান', emoji: '🤲', meaning: 'Donation' },
    { word: 'দেওয়াল', emoji: '🧱', meaning: 'Wall' }
  ],
  'ধ': [
    { word: 'ধান', emoji: '🌾', meaning: 'Paddy' },
    { word: 'ধনু', emoji: '🏹', meaning: 'Bow' },
    { word: 'ধূপ', emoji: '🕯️', meaning: 'Incense' },
    { word: 'ধুলো', emoji: '🌪️', meaning: 'Dust' },
    { word: 'ধন্যবাদ', emoji: '🙏', meaning: 'Thank you' },
    { word: 'ধীর', emoji: '🐢', meaning: 'Slow' },
    { word: 'ধনী', emoji: '💰', meaning: 'Rich' },
    { word: 'ধাতু', emoji: '🔩', meaning: 'Metal' }
  ],
  'ন': [
    { word: 'নৌকা', emoji: '⛵', meaning: 'Boat' },
    { word: 'নদী', emoji: '🌊', meaning: 'River' },
    { word: 'নখ', emoji: '💅', meaning: 'Nail' },
    { word: 'নারকেল', emoji: '🥥', meaning: 'Coconut' },
    { word: 'নাম', emoji: '📝', meaning: 'Name' },
    { word: 'নতুন', emoji: '🆕', meaning: 'New' },
    { word: 'নীল', emoji: '💙', meaning: 'Blue' },
    { word: 'নরম', emoji: '🧸', meaning: 'Soft' }
  ],
  'প': [
    { word: 'পাতা', emoji: '🍃', meaning: 'Leaf' },
    { word: 'পাখি', emoji: '🐦', meaning: 'Bird' },
    { word: 'পাহাড়', emoji: '⛰️', meaning: 'Mountain' },
    { word: 'পাখা', emoji: '🪭', meaning: 'Fan' },
    { word: 'পানি', emoji: '🥛', meaning: 'Water' },
    { word: 'পাথর', emoji: '🪨', meaning: 'Stone' },
    { word: 'পড়াশোনা', emoji: '📚', meaning: 'Studies' },
    { word: 'পেন্সিল', emoji: '✏️', meaning: 'Pencil' }
  ],
  'ফ': [
    { word: 'ফুল', emoji: '🌸', meaning: 'Flower' },
    { word: 'ফল', emoji: '🍎', meaning: 'Fruit' },
    { word: 'ফড়িং', emoji: '🦟', meaning: 'Grasshopper' },
    { word: 'ফিতা', emoji: '🎗️', meaning: 'Ribbon' },
    { word: 'ফানুস', emoji: '🏮', meaning: 'Sky lantern' },
    { word: 'ফেনিল', emoji: '🧼', meaning: 'Foamy' },
    { word: 'ফেসবুক', emoji: '📱', meaning: 'Facebook' },
    { word: 'ফুটবল', emoji: '⚽', meaning: 'Football' }
  ],
  'ব': [
    { word: 'বই', emoji: '📘', meaning: 'Book' },
    { word: 'বাক্স', emoji: '📦', meaning: 'Box' },
    { word: 'বানর', emoji: '🐒', meaning: 'Monkey' },
    { word: 'বিড়াল', emoji: '🐱', meaning: 'Cat' },
    { word: 'বাতাস', emoji: '💨', meaning: 'Wind' },
    { word: 'বাঘ', emoji: '🐯', meaning: 'Tiger' },
    { word: 'বৃষ্টি', emoji: '🌧️', meaning: 'Rain' },
    { word: 'বন্ধু', emoji: '🧑‍🤝‍🧑', meaning: 'Friend' }
  ],
  'ভ': [
    { word: 'ভাত', emoji: '🍚', meaning: 'Cooked Rice' },
    { word: 'ভাল্লুক', emoji: '🐻', meaning: 'Bear' },
    { word: 'ভেড়া', emoji: '🐑', meaning: 'Sheep' },
    { word: 'ভুট্টা', emoji: '🌽', meaning: 'Corn' },
    { word: 'ভোর', emoji: '🌅', meaning: 'Dawn' },
    { word: 'ভিতর', emoji: '📥', meaning: 'Inside' },
    { word: 'ভীতি', emoji: '😨', meaning: 'Fear' },
    { word: 'ভেষজ', emoji: '🌿', meaning: 'Herbal' }
  ],
  'ম': [
    { word: 'মাছ', emoji: '🐟', meaning: 'Fish' },
    { word: 'মা', emoji: '👩', meaning: 'Mother' },
    { word: 'মেঘ', emoji: '☁️', meaning: 'Cloud' },
    { word: 'মৌমাছি', emoji: '🐝', meaning: 'Honeybee' },
    { word: 'মাকড়সা', emoji: '🕷️', meaning: 'Spider' },
    { word: 'মুখ', emoji: '😊', meaning: 'Face' },
    { word: 'মণি', emoji: '💎', meaning: 'Jewel' },
    { word: 'মন্দির', emoji: '🛕', meaning: 'Temple' }
  ],
  'য': [
    { word: 'যাতা', emoji: '🪨', meaning: 'Grinding mill' },
    { word: 'যাদু', emoji: '🪄', meaning: 'Magic' },
    { word: 'যানবাহন', emoji: '🚌', meaning: 'Vehicles' },
    { word: 'যমজ', emoji: '🧑‍🤝‍🧑', meaning: 'Twins' },
    { word: 'যশ', emoji: '⭐', meaning: 'Fame' },
    { word: 'যত্রতত্র', emoji: '🚯', meaning: 'Everywhere' },
    { word: 'যুদ্ধ', emoji: '⚔️', meaning: 'War' },
    { word: 'যমুনো', emoji: '🌊', meaning: 'Jamuna River' }
  ],
  'র': [
    { word: 'রথ', emoji: '🛒', meaning: 'Chariot' },
    { word: 'রং', emoji: '🎨', meaning: 'Paint / Color' },
    { word: 'রাত', emoji: '🌃', meaning: 'Night' },
    { word: 'রাজা', emoji: '👑', meaning: 'King' },
    { word: 'রাস্তা', emoji: '🛣️', meaning: 'Road' },
    { word: 'রুই', emoji: '🐟', meaning: 'Rui fish' },
    { word: 'রোদ', emoji: '☀️', meaning: 'Sunlight' },
    { word: 'রূপালী', emoji: '🥈', meaning: 'Silver' }
  ],
  'ল': [
    { word: 'লাটিম', emoji: '🪀', meaning: 'Spinning top' },
    { word: 'লাউ', emoji: '🥒', meaning: 'Bottle gourd' },
    { word: 'লেবু', emoji: '🍋', meaning: 'Lemon' },
    { word: 'লাল', emoji: '❤️', meaning: 'Red' },
    { word: 'লতা', emoji: '🌿', meaning: 'Creeper plant' },
    { word: 'লাঠি', emoji: '🦯', meaning: 'Stick' },
    { word: 'লোহা', emoji: '🔩', meaning: 'Iron' },
    { word: 'লবণ', emoji: '🧂', meaning: 'Salt' }
  ],
  'শ': [
    { word: 'শসা', emoji: '🥒', meaning: 'Cucumber' },
    { word: 'শাপলা', emoji: '🪷', meaning: 'Water Lily' },
    { word: 'শহর', emoji: '🏙️', meaning: 'City' },
    { word: 'শঙ্খ', emoji: '🐚', meaning: 'Conch' },
    { word: 'শীত', emoji: '🥶', meaning: 'Winter' },
    { word: 'শশাঙ্ক', emoji: '🌙', meaning: 'Moon' },
    { word: 'শাবক', emoji: '🐯', meaning: 'Cub' },
    { word: 'শৃঙ্গ', emoji: '⛰️', meaning: 'Horn/Peak' }
  ],
  'ষ': [
    { word: 'ষাঁড়', emoji: '🐂', meaning: 'Bull' },
    { word: 'ষাট', emoji: '6️⃣0️⃣', meaning: 'Sixty' },
    { word: 'ষষ্ঠ', emoji: '🏅', meaning: 'Sixth' },
    { word: 'ষড়ঋতু', emoji: '🍂', meaning: 'Six Seasons' },
    { word: 'ষোলো', emoji: '1️⃣6️⃣', meaning: 'Sixteen' },
    { word: 'ষড়ভুজ', emoji: '⬡', meaning: 'Hexagon' },
    { word: 'ষণ্ড', emoji: '💪', meaning: 'Strong / Robust' },
    { word: 'ষড়যন্ত্র', emoji: '🕵️', meaning: 'Conspiracy' }
  ],
  'স': [
    { word: 'সিংহ', emoji: '🦁', meaning: 'Lion' },
    { word: 'সবুজ', emoji: '💚', meaning: 'Green' },
    { word: 'সূর্য', emoji: '☀️', meaning: 'Sun' },
    { word: 'সাপ', emoji: '🐍', meaning: 'Snake' },
    { word: 'সকাল', emoji: '🌅', meaning: 'Morning' },
    { word: 'সাগর', emoji: '🌊', meaning: 'Sea / Ocean' },
    { word: 'সফেদা', emoji: '🥔', meaning: 'Sapodilla' },
    { word: 'সিনেমা', emoji: '🎬', meaning: 'Movie' }
  ],
  'হ': [
    { word: 'হাতি', emoji: '🐘', meaning: 'Elephant' },
    { word: 'হাঁস', emoji: '🦆', meaning: 'Duck' },
    { word: 'হলুদ', emoji: '💛', meaning: 'Yellow' },
    { word: 'হরিণ', emoji: '🦌', meaning: 'Deer' },
    { word: 'হাত', emoji: '✋', meaning: 'Hand' },
    { word: 'হাসি', emoji: '😊', meaning: 'Smile / Laugh' },
    { word: 'হিমবাহ', emoji: '🏔️', meaning: 'Glacier' },
    { word: 'হৃদয়', emoji: '❤️', meaning: 'Heart' }
  ],
  'ড়': [
    { word: 'পাহাড়', emoji: '⛰️', meaning: 'Mountain' },
    { word: 'ঘড়ি', emoji: '⌚', meaning: 'Clock' },
    { word: 'বিড়াল', emoji: '🐱', meaning: 'Cat' },
    { word: 'ঝড়', emoji: '⛈️', meaning: 'Storm' },
    { word: 'বাড়ি', emoji: '🏡', meaning: 'House' },
    { word: 'ঘোড়া', emoji: '🐎', meaning: 'Horse' },
    { word: 'গাড়ি', emoji: '🚗', meaning: 'Car' },
    { word: 'পড়াশোনা', emoji: '📚', meaning: 'Study' }
  ],
  'ড়': [
    { word: 'পাহাড়', emoji: '⛰️', meaning: 'Mountain' },
    { word: 'ঘড়ি', emoji: '⌚', meaning: 'Clock' },
    { word: 'বিড়াল', emoji: '🐱', meaning: 'Cat' },
    { word: 'ঝড়', emoji: '⛈️', meaning: 'Storm' },
    { word: 'বাড়ি', emoji: '🏡', meaning: 'House' },
    { word: 'ঘোড়া', emoji: '🐎', meaning: 'Horse' },
    { word: 'গাড়ি', emoji: '🚗', meaning: 'Car' },
    { word: 'পড়াশোনা', emoji: '📚', meaning: 'Study' }
  ],
  'ঢ়': [
    { word: 'আষাঢ়', emoji: '🌧️', meaning: 'Monsoon season' },
    { word: 'দৃঢ়', emoji: '✊', meaning: 'Firm / Strong' },
    { word: 'গাঢ়', emoji: '🎨', meaning: 'Deep / Dense' },
    { word: 'মূঢ়', emoji: '🤪', meaning: 'Foolish' },
    { word: 'প্রৌঢ়', emoji: '👴', meaning: 'Middle-aged' },
    { word: 'ঢ়ক্কা', emoji: '🥁', meaning: 'Large Drum' },
    { word: 'বেঢ়া', emoji: '🏗️', meaning: 'Fenced' },
    { word: 'গূঢ়', emoji: '🔐', meaning: 'Mysterious' }
  ],
  'ঢ়': [
    { word: 'আষাঢ়', emoji: '🌧️', meaning: 'Monsoon season' },
    { word: 'দৃঢ়', emoji: '✊', meaning: 'Firm / Strong' },
    { word: 'গাঢ়', emoji: '🎨', meaning: 'Deep / Dense' },
    { word: 'মূঢ়', emoji: '🤪', meaning: 'Foolish' },
    { word: 'প্রৌঢ়', emoji: '👴', meaning: 'Middle-aged' },
    { word: 'ঢ়ক্কা', emoji: '🥁', meaning: 'Large Drum' },
    { word: 'বেঢ়া', emoji: '🏗️', meaning: 'Fenced' },
    { word: 'গূঢ়', emoji: '🔐', meaning: 'Mysterious' }
  ],
  'য়': [
    { word: 'ময়ূর', emoji: '🦚', meaning: 'Peacock' },
    { word: 'আয়না', emoji: '🪞', meaning: 'Mirror' },
    { word: 'সময়', emoji: '🕰️', meaning: 'Time' },
    { word: 'গয়না', emoji: '💍', meaning: 'Jewelry' },
    { word: 'পায়রা', emoji: '🕊️', meaning: 'Pigeon' },
    { word: 'ছায়া', emoji: '👥', meaning: 'Shadow' },
    { word: 'ভয়', emoji: '😨', meaning: 'Fear' },
    { word: 'জয়', emoji: '🏆', meaning: 'Victory' }
  ],
  'য়': [
    { word: 'ময়ূর', emoji: '🦚', meaning: 'Peacock' },
    { word: 'আয়না', emoji: '🪞', meaning: 'Mirror' },
    { word: 'সময়', emoji: '🕰️', meaning: 'Time' },
    { word: 'গয়না', emoji: '💍', meaning: 'Jewelry' },
    { word: 'পায়রা', emoji: '🕊️', meaning: 'Pigeon' },
    { word: 'ছায়া', emoji: '👥', meaning: 'Shadow' },
    { word: 'ভয়', emoji: '😨', meaning: 'Fear' },
    { word: 'জয়', emoji: '🏆', meaning: 'Victory' }
  ],
  'ৎ': [
    { word: 'হঠাৎ', emoji: '⚡', meaning: 'Suddenly' },
    { word: 'উৎসব', emoji: '🎉', meaning: 'Festival' },
    { word: 'শরৎ', emoji: '🍁', meaning: 'Autumn' },
    { word: 'সৎ', emoji: '🤝', meaning: 'Honest' },
    { word: 'মৎস্য', emoji: '🐟', meaning: 'Fish' },
    { word: 'বিদ্যুৎ', emoji: '⚡', meaning: 'Electricity' },
    { word: 'উৎস', emoji: '⛲', meaning: 'Source' },
    { word: 'চিৎকার', emoji: '🗣️', meaning: 'Shout' }
  ],
  'ং': [
    { word: 'রঙ', emoji: '🎨', meaning: 'Color' },
    { word: 'সিংহ', emoji: '🦁', meaning: 'Lion' },
    { word: 'ফড়িং', emoji: '🦗', meaning: 'Grasshopper' },
    { word: 'অংশ', emoji: '🍰', meaning: 'Part / Share' },
    { word: 'হংস', emoji: '🦆', meaning: 'Swan' },
    { word: 'মাংস', emoji: '🥩', meaning: 'Meat' },
    { word: 'বাংলা', emoji: '🇧🇩', meaning: 'Bengali' },
    { word: 'সংবাদ', emoji: '📰', meaning: 'News' }
  ],
  'ঃ': [
    { word: 'দুঃখ', emoji: '😢', meaning: 'Sadness' },
    { word: 'দুঃখিত', emoji: '🤐', meaning: 'Sorry' },
    { word: 'দুঃসাহস', emoji: '🧗', meaning: 'Boldness' },
    { word: 'পুনঃপুন', emoji: '🔄', meaning: 'Repeatedly' },
    { word: 'নিঃশব্দ', emoji: '🤫', meaning: 'Silent' },
    { word: 'দুঃসময়', emoji: '⛈️', meaning: 'Bad Times' },
    { word: 'নিঃশ্বাস', emoji: '🌬️', meaning: 'Breath' },
    { word: 'অন্তঃকরণ', emoji: '❤️', meaning: 'Heart/Soul' }
  ],
  'ঁ': [
    { word: 'চাঁদ', emoji: '🌙', meaning: 'Moon' },
    { word: 'কাঁচ', emoji: '🥛', meaning: 'Glass' },
    { word: 'হাঁস', emoji: '🦆', meaning: 'Duck' },
    { word: 'পাঁচ', emoji: '5️⃣', meaning: 'Five' },
    { word: 'বাঁশ', emoji: '🎋', meaning: 'Bamboo' },
    { word: 'ইঁদুর', emoji: '🐭', meaning: 'Mouse' },
    { word: 'কাঁধ', emoji: '🤷', meaning: 'Shoulder' },
    { word: 'ফাঁদ', emoji: '🪤', meaning: 'Trap' }
  ]
};

const DEFAULT_WORDS_FOR_FALLBACK = [
  { word: 'শব্দ ১', emoji: '⭐', meaning: 'Word 1' },
  { word: 'শব্দ ২', emoji: '🌟', meaning: 'Word 2' },
  { word: 'শব্দ ৩', emoji: '✨', meaning: 'Word 3' },
  { word: 'শব্দ ৪', emoji: '💫', meaning: 'Word 4' },
  { word: 'শব্দ ৫', emoji: '🔮', meaning: 'Word 5' },
  { word: 'শব্দ ৬', emoji: '🎨', meaning: 'Word 6' },
  { word: 'শব্দ ৭', emoji: '🌈', meaning: 'Word 7' },
  { word: 'শব্দ ৮', emoji: '🏆', meaning: 'Word 8' }
];

// Sound feedback helper
const playVisualClickSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(330, ctx.currentTime); // E4
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.15); // E5
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (err) {}
};

interface LetterWordCircleProps {
  speak: (text: string) => Promise<void>;
}

export const LetterWordCircle: React.FC<LetterWordCircleProps> = ({ speak }) => {
  const [selectedType, setSelectedType] = useState<'vowel' | 'consonant'>('vowel');
  const [selectedLetter, setSelectedLetter] = useState<AlphabetItem | null>(null);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  // Grouped alphabet
  const filteredAlphabet = useMemo(() => {
    return BENGALI_ALPHABET.filter(item => item.type === selectedType);
  }, [selectedType]);

  // Set default letter when switching tab or on mount
  useEffect(() => {
    if (filteredAlphabet.length > 0) {
      setSelectedLetter(filteredAlphabet[0]);
      setActiveWordIndex(null);
    }
  }, [selectedType]);

  // Handle letter choice
  const handleLetterSelect = (item: AlphabetItem) => {
    setSelectedLetter(item);
    setActiveWordIndex(null);
    speak(item.letter);
  };

  // Words associated with current letter
  const associatedWords = useMemo(() => {
    if (!selectedLetter) return DEFAULT_WORDS_FOR_FALLBACK;
    return WORD_CIRCLES_DATA[selectedLetter.letter] || DEFAULT_WORDS_FOR_FALLBACK;
  }, [selectedLetter]);

  const handleWordClick = (wordObj: WordAssociation, index: number) => {
    playVisualClickSound();
    setActiveWordIndex(index);
    speak(wordObj.word);
    
    // Speak custom full sentence e.g. "ক-তে কম"
    if (selectedLetter) {
      setTimeout(() => {
        speak(`${selectedLetter.letter}-তে ${wordObj.word}`);
      }, 950);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      {/* Informational Hero Card */}
      <div className="bg-[#11161d] border border-[#30363d] rounded-[2.5rem] p-6 sm:p-8 mb-8 shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white shadow-md inline-block uppercase tracking-wider">
            বর্ণভিত্তিক শব্দ মানচিত্র 🗺️
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#f0f6fc] tracking-tight leading-normal">
            রঙিন বর্ণ দিয়ে চমৎকার শব্দচক্র 🎨
          </h2>
          <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
            যেকোনো বর্ণ নির্বাচন করুন এবং তার চারপাশের ৮টি জাদুকরী শব্দচক্রের উপরে স্পর্শ করে নতুন নতুন বাংলা শব্দ ও উচ্চারণ শিখুন!
          </p>
        </div>
      </div>

      {/* Tabs Vowel vs Consonant */}
      <div className="flex justify-center bg-[#161b22] border border-[#30363d] p-1.5 rounded-2xl w-full sm:w-auto max-w-md mx-auto mb-8">
        <button
          onClick={() => setSelectedType('vowel')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            selectedType === 'vowel'
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
              : 'text-[#8b949e] hover:text-[#f0f6fc]'
          }`}
        >
          <span className="text-base">🍎</span>
          <span>স্বরবর্ণ শব্দচক্র</span>
        </button>
        <button
          onClick={() => setSelectedType('consonant')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            selectedType === 'consonant'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
              : 'text-[#8b949e] hover:text-[#f0f6fc]'
          }`}
        >
          <span className="text-base">🥑</span>
          <span>ব্যঞ্জনবর্ণ শব্দচক্র</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Horizontal Letter Picker Sidebar */}
        <div className="lg:col-span-3 bg-[#11161d] border border-[#30363d] rounded-[2rem] p-5 shadow-xl">
          <h3 className="text-xs sm:text-sm font-black text-[#f0f6fc] mb-4 flex items-center gap-2">
            <Icon name="List" className="w-4 h-4 text-fuchsia-400" />
            বর্ণ নির্বাচন ({filteredAlphabet.length}টি)
          </h3>

          {/* Quick interactive search/filter grid */}
          <div className="grid grid-cols-4 gap-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredAlphabet.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLetterSelect(item)}
                className={`aspect-square rounded-2xl text-lg sm:text-xl font-black font-sans flex items-center justify-center border transition-all cursor-pointer ${
                  selectedLetter?.id === item.id
                    ? 'bg-gradient-to-br from-indigo-600 to-fuchsia-600 border-white text-white shadow-md transform scale-105'
                    : 'bg-[#161b22] border-[#21262d] text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                {item.letter}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Mind-Map / Radial Word Wheel Display (Center) */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-[#11161d] border border-[#30363d] rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
            {/* Ambient Background decoration */}
            <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 to-transparent pointer-events-none"></div>

            {/* RADIAL WHEEL CONTAINER */}
            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
              
              {/* Radial Connected Lines/Tracks behind bubbles */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {associatedWords.map((_, index) => {
                  const angle = (index * 360) / 8;
                  const rad = (angle * Math.PI) / 180;
                  
                  // Position relative to center
                  const cx = 200; // SVG viewBox center (assuming 400x400 coordinate system)
                  const cy = 200;
                  const distance = 135; // line distance
                  const tx = cx + Math.cos(rad) * distance;
                  const ty = cy + Math.sin(rad) * distance;

                  const isActive = activeWordIndex === index;

                  return (
                    <g key={index}>
                      {/* Line tracks */}
                      <motion.line
                        x1={cx}
                        y1={cy}
                        x2={tx}
                        y2={ty}
                        stroke={isActive ? '#d946ef' : '#30363d'}
                        strokeWidth={isActive ? '4' : '2'}
                        strokeDasharray={isActive ? 'none' : '5,5'}
                        animate={isActive ? { strokeDashoffset: [0, -10] } : {}}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="transition-all"
                      />
                      {/* Arrow marker heads pointing outward */}
                      <circle
                        cx={tx}
                        cy={ty}
                        r="3"
                        fill={isActive ? '#22c55e' : '#8b949e'}
                        className="transition-all"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* CENTRAL LETTER BUBBLE */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (selectedLetter) {
                    speak(selectedLetter.letter);
                    setActiveWordIndex(null);
                  }
                }}
                className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-4xl sm:text-5xl font-black text-white shadow-2xl relative z-10 cursor-pointer border-4 border-white animate-pulse-slow ${
                  selectedType === 'vowel' 
                    ? 'bg-gradient-to-br from-rose-500 via-pink-600 to-fuchsia-600 shadow-rose-950/40 ring-8 ring-rose-500/25' 
                    : 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 shadow-teal-950/40 ring-8 ring-teal-500/25'
                }`}
              >
                {/* Bubble inner shiny element */}
                <div className="absolute top-1.5 left-2.5 w-full h-1/2 bg-white/10 rounded-full pointer-events-none" />
                <span>{selectedLetter?.letter || 'ক'}</span>
              </motion.button>

              {/* SURROUNDING WORD BUBBLES */}
              {associatedWords.map((item, index) => {
                const angle = (index * 360) / 8;
                const rad = (angle * Math.PI) / 180;
                
                // Radius distance for positioning bubbles
                const r = 135; 
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;

                const isActive = activeWordIndex === index;

                return (
                  <motion.div
                    key={index}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      x: `calc(${x}px - 50%)`,
                      y: `calc(${y}px - 50%)`,
                    }}
                    className="z-10"
                  >
                    <motion.button
                      whileHover={{ scale: 1.15, zIndex: 30 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleWordClick(item, index)}
                      className={`px-3 sm:px-4.5 py-2 sm:py-2.5 rounded-2xl flex items-center gap-1.5 font-bold shadow-lg border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-br from-fuchsia-600 to-rose-600 border-white text-white scale-110 shadow-fuchsia-950/50'
                          : 'bg-[#161b22] border-[#30363d] text-[#c9d1d9] hover:border-indigo-400 hover:text-white'
                      }`}
                    >
                      <span className="text-base sm:text-lg">{item.emoji}</span>
                      <span className="text-xs sm:text-sm font-extrabold">{item.word}</span>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>

            {/* DETAIL DRAWER / HIGHLIGHT PANEL (BELOW WHEEL) */}
            <div className="w-full max-w-lg mt-8">
              <AnimatePresence mode="wait">
                {activeWordIndex !== null ? (
                  <motion.div
                    key={activeWordIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-[#161b22] border border-[#30363d] rounded-3xl p-5 text-center space-y-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-fuchsia-500 to-rose-500"></div>

                    <div className="flex justify-between items-center px-2">
                      <span className="text-[10px] text-fuchsia-400 font-black bg-fuchsia-950/40 border border-fuchsia-500/30 px-3 py-0.5 rounded-full uppercase tracking-wider">
                        শব্দ বিশ্লেষণ
                      </span>
                      <button
                        onClick={() => setActiveWordIndex(null)}
                        className="text-[#8b949e] hover:text-[#f0f6fc]"
                      >
                        <Icon name="X" className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-1">
                      <span className="text-5xl bg-slate-800 p-4 rounded-3xl animate-bounce">
                        {associatedWords[activeWordIndex].emoji}
                      </span>
                      <div className="text-center sm:text-left">
                        <h3 className="text-2xl sm:text-3xl font-black text-[#f0f6fc] font-sans">
                          {associatedWords[activeWordIndex].word}
                        </h3>
                        <p className="text-sm text-slate-400 font-semibold font-mono">
                          Meaning: {associatedWords[activeWordIndex].meaning}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-center pt-2">
                      <button
                        onClick={() => speak(associatedWords[activeWordIndex].word)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
                      >
                        <Icon name="Volume2" className="w-4 h-4 text-indigo-400" />
                        <span>শব্দ শুনুন</span>
                      </button>
                      <button
                        onClick={() => speak(`${selectedLetter?.letter}-তে ${associatedWords[activeWordIndex].word}`)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
                      >
                        <Icon name="VolumeX" className="w-4 h-4 text-emerald-400" />
                        <span>সম্পূর্ণ বাক্য শুনুন</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-5 border border-[#30363d] border-dashed rounded-3xl text-center text-xs sm:text-sm text-[#8b949e]"
                  >
                    💡 যেকোনো শব্দ বুদবুদের উপরে চাপ দিয়ে তার বিবরণ, ইংরেজি অর্থ এবং মজাদার বাক্য আবৃত্তি শুনুন।
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
