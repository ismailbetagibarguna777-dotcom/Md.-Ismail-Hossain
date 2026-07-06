export interface WordItem {
  word: string;
  meaning?: string;
  breakdown?: string;
}

export interface SubLevel {
  name: string;
  color: string;
  words: WordItem[];
}

export interface VocabLevel {
  level: number;
  title: string;
  description: string;
  theme: string;
  subLevels: SubLevel[];
}

export const vocabLevels: VocabLevel[] = [
  {
    level: 1,
    title: "লেভেল ১",
    description: "সহজ ২ অক্ষরের শব্দ দিয়ে শুরু করি!",
    theme: "from-teal-500 to-cyan-500",
    subLevels: [
      {
        name: "অংশ ১: প্রথম কদম",
        color: "bg-teal-500/10 border-teal-500/30 text-teal-300",
        words: [
          { word: "কল", meaning: "পানির কল (Tap)" },
          { word: "ফল", meaning: "গাছের ফল (Fruit)" },
          { word: "জল", meaning: "পানি (Water)" },
          { word: "বন", meaning: "অরণ্য (Forest)" },
          { word: "মন", meaning: "হৃদয় (Mind)" },
          { word: "জন", meaning: "মানুষ (People)" },
          { word: "পথ", meaning: "রাস্তা (Road)" },
          { word: "ঘর", meaning: "বাসা (Home)" },
          { word: "হাত", meaning: "আমাদের হাত (Hand)" },
          { word: "নখ", meaning: "আঙুলের নখ (Nail)" }
        ]
      },
      {
        name: "অংশ ২: আমাদের চারপাশ",
        color: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
        words: [
          { word: "মুখ", meaning: "চেহারা (Face)" },
          { word: "দল", meaning: "দল গঠন (Group)" },
          { word: "বল", meaning: "খেলার বল (Ball)" },
          { word: "ধন", meaning: "সম্পদ (Wealth)" },
          { word: "রথ", meaning: "রথ গাড়ি (Chariot)" },
          { word: "শপথ", meaning: "প্রতিজ্ঞা (Oath)" },
          { word: "ঘট", meaning: "কলসি (Pot)" },
          { word: "ছল", meaning: "মিথ্যে বা চাতুরি (Trick)" },
          { word: "পদ", meaning: "পা (Feet/Step)" },
          { word: "রস", meaning: "মিষ্টি রস (Juice)" }
        ]
      },
      {
        name: "অংশ ৩: সহজ পরিচয়",
        color: "bg-blue-500/10 border-blue-500/30 text-blue-300",
        words: [
          { word: "দশ", meaning: "সংখ্যা ১০ (Ten)" },
          { word: "নব", meaning: "নতুন (New)" },
          { word: "রব", meaning: "আওয়াজ বা ডাক (Sound)" },
          { word: "হল", meaning: "লাঙল (Plough)" },
          { word: "মত", meaning: "অভিমত (Opinion)" },
          { word: "যত", meaning: "যতটুকু (As much)" },
          { word: "সব", meaning: "সকলে (All)" },
          { word: "নদ", meaning: "নদী (River)" },
          { word: "কলস", meaning: "পানির পাত্র (Pitcher)" },
          { word: "শর", meaning: "তীর (Arrow)" }
        ]
      }
    ]
  },
  {
    level: 2,
    title: "লেভেল ২",
    description: "৩ অক্ষরের মিষ্টি শব্দমালা",
    theme: "from-emerald-500 to-green-500",
    subLevels: [
      {
        name: "অংশ ১: প্রকৃতির উপহার",
        color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
        words: [
          { word: "কমল", meaning: "পদ্মফুল (Lotus)" },
          { word: "কদম", meaning: "কদম ফুল (Flower name)" },
          { word: "গগন", meaning: "আকাশ (Sky)" },
          { word: "নগদ", meaning: "নগদ টাকা (Cash)" },
          { word: "সরল", meaning: "সোজা (Simple)" },
          { word: "সফল", meaning: "কামিয়াব (Successful)" },
          { word: "মগজ", meaning: "বুদ্ধি/মস্তিষ্ক (Brain)" },
          { word: "ফসল", meaning: "খেতের শস্য (Crop)" },
          { word: "কপট", meaning: "ছলনাময় (Deceitful)" },
          { word: "কলম", meaning: "লেখার কলম (Pen)" }
        ]
      },
      {
        name: "অংশ ২: চমৎকার অনুভূতি",
        color: "bg-green-500/10 border-green-500/30 text-green-300",
        words: [
          { word: "জলদ", meaning: "মেঘ (Cloud)" },
          { word: "গঠন", meaning: "তৈরি করা (Structure)" },
          { word: "পতন", meaning: "নিচে পড়া (Fall)" },
          { word: "বদল", meaning: "পরিবর্তন (Change)" },
          { word: "মরণ", meaning: "মৃত্যু (Death)" },
          { word: "ভজন", meaning: "প্রার্থনা সঙ্গীত (Prayer)" },
          { word: "লগন", meaning: "শুভ সময় (Auspicious time)" },
          { word: "সদন", meaning: "ভবন বা বাড়ি (House)" },
          { word: "ধরন", meaning: "উপায় বা ধরন (Type)" },
          { word: "দহন", meaning: "জ্বলন (Burning)" }
        ]
      },
      {
        name: "অংশ ৩: নিত্যদিনের শব্দ",
        color: "bg-lime-500/10 border-lime-500/30 text-lime-300",
        words: [
          { word: "নরম", meaning: "কোমল (Soft)" },
          { word: "পবন", meaning: "বাতাস (Wind)" },
          { word: "গমন", meaning: "যাওয়া (Going)" },
          { word: "মনন", meaning: "চিন্তাভাবনা (Thinking)" },
          { word: "গরম", meaning: "উষ্ণ (Hot)" },
          { word: "লবণ", meaning: "নুন (Salt)" },
          { word: "সড়ক", meaning: "রাস্তা (Road)" },
          { word: "করণ", meaning: "কাজ করা (Action)" },
          { word: "তরল", meaning: "পানির মতো (Liquid)" },
          { word: "চপল", meaning: "চঞ্চল (Playful)" }
        ]
      }
    ]
  },
  {
    level: 3,
    title: "লেভেল ৩",
    description: "মজার মজার ৪ অক্ষরের অনুকার শব্দ",
    theme: "from-orange-500 to-amber-500",
    subLevels: [
      {
        name: "অংশ ১: মজার আওয়াজ",
        color: "bg-orange-500/10 border-orange-500/30 text-orange-300",
        words: [
          { word: "কলকল", meaning: "পানির শব্দ (Murmur)" },
          { word: "ঝমঝম", meaning: "বৃষ্টির শব্দ (Pattering rain)" },
          { word: "টপটপ", meaning: "পানির ফোঁটার শব্দ (Dripping)" },
          { word: "ধপধপ", meaning: "উজ্জ্বলতার বা দ্রুত হাঁটার শব্দ (Thumping)" },
          { word: "থপথপ", meaning: "ভারী পায়ের শব্দ (Flapping)" },
          { word: "বনজল", meaning: "বনের পানি (Forest water)" },
          { word: "দশম", meaning: "দশ নম্বরের স্থান (Tenth)" },
          { word: "জনপদ", meaning: "মানুষের এলাকা (Settlement)" },
          { word: "মনোবল", meaning: "মনের শক্তি (Mental strength)" },
          { word: "ফলদ", meaning: "ফল দেওয়া গাছ (Fruit-bearing)" }
        ]
      },
      {
        name: "অংশ ২: প্রকৃতি ও পরিবেশ",
        color: "bg-amber-500/10 border-amber-500/30 text-amber-300",
        words: [
          { word: "জলধর", meaning: "মেঘ ধারণকারী (Cloud)" },
          { word: "বনপথ", meaning: "বনের মধ্য দিয়ে পথ (Forest path)" },
          { word: "পথঘাট", meaning: "রাস্তাঘাট (Roads)" },
          { word: "মননশীল", meaning: "চিন্তাশীল (Thoughtful)" },
          { word: "ধনবল", meaning: "টাকার শক্তি (Money power)" },
          { word: "কলঘর", meaning: "স্নানঘর বা মেশিন ঘর (Bathroom/Machine room)" },
          { word: "বনঘর", meaning: "বনের কুটির (Forest cottage)" },
          { word: "ফলবন", meaning: "ফলের বাগান (Orchard)" },
          { word: "ঘরদোর", meaning: "বাড়িঘর (Household)" },
          { word: "জলপথ", meaning: "নদী বা সমুদ্রের পথ (Waterway)" }
        ]
      },
      {
        name: "অংশ ৩: গুণের কথা",
        color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
        words: [
          { word: "পদচারণা", meaning: "হাঁটাহাঁটি (Walking)" },
          { word: "বনধন", meaning: "বনের সম্পদ (Forest wealth)" },
          { word: "সদ্গুণ", meaning: "ভালো গুণ (Virtue)" },
          { word: "জনমন", meaning: "মানুষের মন (Public mind)" },
          { word: "বনফল", meaning: "বনের ফল (Wild fruit)" },
          { word: "বনলতা", meaning: "বনের লতা (Forest creeper)" },
          { word: "ধনজন", meaning: "সম্পদ ও লোকবল (Wealth and people)" },
          { word: "ফলঘর", meaning: "ফল রাখার ঘর (Fruit room)" },
          { word: "জলকল", meaning: "পানির কল (Water tap)" },
          { word: "মনপ্রাণ", meaning: "মন ও জীবন (Heart and soul)" }
        ]
      }
    ]
  },
  {
    level: 4,
    title: "লেভেল ৪",
    description: "আ-কার (া) যুক্ত মিষ্টি ও সহজ শব্দমালা",
    theme: "from-pink-500 to-rose-500",
    subLevels: [
      {
        name: "অংশ ১: আমাদের শরীর ও জীবন",
        color: "bg-pink-500/10 border-pink-500/30 text-pink-300",
        words: [
          { word: "কাল", meaning: "সময় (Time)" },
          { word: "গান", meaning: "সুর বা গান (Song)" },
          { word: "গাছ", meaning: "তরুলতা (Tree)" },
          { word: "হাত", meaning: "আমাদের হাত (Hand)" },
          { word: "নাম", meaning: "কারো নাম (Name)" },
          { word: "নাক", meaning: "ঘে্রাণ নেওয়ার অঙ্গ (Nose)" },
          { word: "দাগ", meaning: "চিহ্ন (Spot)" },
          { word: "দাম", meaning: "মূল্য (Price)" },
          { word: "দান", meaning: "উপহার দেওয়া (Gift)" },
          { word: "চাল", meaning: "ভাত রান্নার চাল (Rice)" }
        ]
      },
      {
        name: "অংশ ২: খাবার ও খেলনা",
        color: "bg-rose-500/10 border-rose-500/30 text-rose-300",
        words: [
          { word: "জাম", meaning: "মিষ্টি ফল (Blackberry)" },
          { word: "জাল", meaning: "মাছ ধরার জাল (Net)" },
          { word: "ভাত", meaning: "প্রধান খাদ্য ভাত (Cooked rice)" },
          { word: "ভাগ", meaning: "অংশ করা (Share)" },
          { word: "রাত", meaning: "রাত্রিকাল (Night)" },
          { word: "আম", meaning: "ফলের রাজা আম (Mango)" },
          { word: "রাখ", meaning: "জমা রাখা (Keep)" },
          { word: "মাছ", meaning: "জলচর প্রাণী (Fish)" },
          { word: "মাঠ", meaning: "খেলার মাঠ (Field)" },
          { word: "মালা", meaning: "ফুলের মালা (Garland)" }
        ]
      },
      {
        name: "অংশ ৩: চারপাশের চেনা জীব",
        color: "bg-red-500/10 border-red-500/30 text-red-300",
        words: [
          { word: "মাতা", meaning: "মা (Mother)" },
          { word: "শাক", meaning: "সবুজ শাকসবজি (Spinach)" },
          { word: "সাত", meaning: "সংখ্যা ৭ (Seven)" },
          { word: "সাপ", meaning: "সরীসৃপ প্রাণী (Snake)" },
          { word: "লাল", meaning: "লাল রং (Red color)" },
          { word: "কাজ", meaning: "কর্ম (Work)" },
          { word: "দাঁত", meaning: "মুখের দাঁত (Tooth)" },
          { word: "ডাল", meaning: "গাছের ডাল (Branch)" },
          { word: "কান", meaning: "শোনার অঙ্গ (Ear)" },
          { word: "ঘাট", meaning: "নদীর ঘাট (Wharf)" }
        ]
      }
    ]
  },
  {
    level: 5,
    title: "লেভেল ৫",
    description: "দ্বিত্ব আ-কার (া) যুক্ত মিষ্টি সম্পর্ক ও শব্দ",
    theme: "from-purple-500 to-indigo-500",
    subLevels: [
      {
        name: "অংশ ১: আমাদের প্রিয়জনেরা",
        color: "bg-purple-500/10 border-purple-500/30 text-purple-300",
        words: [
          { word: "কাকা", meaning: "বাবার ভাই (Uncle)" },
          { word: "বাবা", meaning: "আমাদের জনক (Father)" },
          { word: "মামা", meaning: "মায়ের ভাই (Uncle)" },
          { word: "দাদা", meaning: "বড় ভাই বা বাবার বাবা (Grandfather/Brother)" },
          { word: "নানা", meaning: "মায়ের বাবা (Grandfather)" },
          { word: "দিদা", meaning: "দাদী বা নানী (Grandmother)" },
          { word: "পাপা", meaning: "বাবা (Papa)" },
          { word: "চাচা", meaning: "বাবার ভাই (Uncle)" },
          { word: "কাকী", meaning: "কাকার স্ত্রী (Aunt)" },
          { word: "দাদী", meaning: "বাবার মা (Grandmother)" }
        ]
      },
      {
        name: "অংশ ২: চারপাশের জিনিসপত্র",
        color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
        words: [
          { word: "খালা", meaning: "মায়ের বোন (Aunt)" },
          { word: "রাঙা", meaning: "রঙিন বা লাল (Colorful/Red)" },
          { word: "নালা", meaning: "ছোট খাল (Canal)" },
          { word: "তালা", meaning: "দরজার তালা (Lock)" },
          { word: "জানা", meaning: "পরিচিত বা জ্ঞান থাকা (Known)" },
          { word: "বাঁধা", meaning: "বেঁধে রাখা (Tied)" },
          { word: "বাধা", meaning: "প্রতিবন্ধকতা (Obstacle)" },
          { word: "জামা", meaning: "পোশাক (Shirt/Dress)" },
          { word: "ধারা", meaning: "প্রবাহ (Stream)" },
          { word: "তারা", meaning: "আকাশের নক্ষত্র (Star)" }
        ]
      },
      {
        name: "অংশ ৩: রোদ আর প্রকৃতির মেলা",
        color: "bg-violet-500/10 border-violet-500/30 text-violet-300",
        words: [
          { word: "সাদা", meaning: "শুভ্র রং (White color)" },
          { word: "কালো", meaning: "অন্ধকার রং (Black color)" },
          { word: "পাতা", meaning: "গাছের পাতা (Leaf)" },
          { word: "চাকা", meaning: "গাড়ির চাকা (Wheel)" },
          { word: "বাঘা", meaning: "বাঘের মতো সাহসী (Tiger-like)" },
          { word: "কাটা", meaning: "কর্তন করা (Cut)" },
          { word: "গাঁথা", meaning: "গেঁথে ফেলা (Threaded)" },
          { word: "ডালা", meaning: "ঝুড়ি বা ডালা (Basket)" },
          { word: "দাওয়া", meaning: "ঘরের বারান্দা (Verandah)" },
          { word: "ছাতা", meaning: "বৃষ্টির ছাতা (Umbrella)" }
        ]
      }
    ]
  },
  {
    level: 6,
    title: "লেভেল ৬",
    description: "৩ অক্ষরের আ-কার (া) যুক্ত সুন্দর শব্দমালা",
    theme: "from-blue-500 to-indigo-500",
    subLevels: [
      {
        name: "অংশ ১: সকাল ও চারপাশ",
        color: "bg-blue-500/10 border-blue-500/30 text-blue-300",
        words: [
          { word: "কাকাতুয়া", meaning: "একটি সুন্দর পাখি (Cockatoo)" },
          { word: "কাগজ", meaning: "লেখার কাগজ (Paper)" },
          { word: "বালক", meaning: "ছেলে শিশু (Boy)" },
          { word: "বাগান", meaning: "ফুল-ফলের বাগান (Garden)" },
          { word: "বাতাস", meaning: "বায়ু (Wind/Air)" },
          { word: "সকাল", meaning: "ভোরবেলা (Morning)" },
          { word: "জামা", meaning: "পোশাক (Shirt)" },
          { word: "তালা", meaning: "তালা (Lock)" },
          { word: "চাকা", meaning: "চাকা (Wheel)" },
          { word: "খাবার", meaning: "খাদ্য (Food)" }
        ]
      },
      {
        name: "অংশ ২: পশুপাখি ও গল্প",
        color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
        words: [
          { word: "বাজার", meaning: "হাটা-বাজার (Market)" },
          { word: "পাহাড়", meaning: "গিরি পর্বত (Mountain)" },
          { word: "কাহিনী", meaning: "গল্প (Story)" },
          { word: "বাদল", meaning: "বৃষ্টির দিন (Rainy day)" },
          { word: "বানর", meaning: "গাছে থাকা প্রাণী (Monkey)" },
          { word: "বাঘ", meaning: "বনের রাজা বাঘ (Tiger)" },
          { word: "মাছধরা", meaning: "মাছ শিকার (Fishing)" },
          { word: "নাগর", meaning: "শহুরে ব্যক্তি (Citizen)" },
          { word: "গাভী", meaning: "দুধ দেওয়া গরু (Cow)" },
          { word: "বালিশ", meaning: "ঘুমানোর বালিশ (Pillow)" }
        ]
      },
      {
        name: "অংশ ৩: কর্ম ও আনন্দ",
        color: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
        words: [
          { word: "দাওয়াত", meaning: "নিমন্ত্রণ (Invitation)" },
          { word: "সাধন", meaning: "সাধনা বা চেষ্টা (Practice)" },
          { word: "আদালত", meaning: "কোর্ট (Court)" },
          { word: "গাছপালা", meaning: "উদ্ভিদজগৎ (Trees and plants)" },
          { word: "কালো", meaning: "কৃষ্ণবর্ণ (Black)" },
          { word: "সাবান", meaning: "গা ধোয়ার সাবান (Soap)" },
          { word: "কারখানা", meaning: "শিল্প কারখানা (Factory)" },
          { word: "দারুণ", meaning: "চমৎকার (Awesome)" },
          { word: "চাবি", meaning: "তালা খোলার চাবি (Key)" },
          { word: "রাস্তা", meaning: "পথ (Road)" }
        ]
      }
    ]
  },
  {
    level: 7,
    title: "লেভেল ৭",
    description: "শব্দ ভাঙ্গন ও গঠন খেলা! (বাগানটি = বা + গা + ন + টি)",
    theme: "from-amber-500 to-orange-500",
    subLevels: [
      {
        name: "অংশ ১: 'টা/টি' যুক্ত শব্দ ভাঙ্গন",
        color: "bg-amber-500/10 border-amber-500/30 text-amber-300",
        words: [
          { word: "বাগানটি", breakdown: "বা + গা + ন + টি", meaning: "নির্দিষ্ট বাগান (The garden)" },
          { word: "জামাটা", breakdown: "জা + মা + টা", meaning: "নির্দিষ্ট পোশাক (The dress)" },
          { word: "পাতাটা", breakdown: "পা + তা + টা", meaning: "নির্দিষ্ট পাতা (The leaf)" },
          { word: "ছাতাটা", breakdown: "ছা + তা + টা", meaning: "নির্দিষ্ট ছাতা (The umbrella)" },
          { word: "খাতাটা", breakdown: "খা + তা + টা", meaning: "নির্দিষ্ট খাতা (The notebook)" },
          { word: "তালাটা", breakdown: "তা + লা + টা", meaning: "নির্দিষ্ট তালা (The lock)" },
          { word: "চাবিটা", breakdown: "চা + বি + টা", meaning: "নির্দিষ্ট চাবি (The key)" },
          { word: "বালিশটা", breakdown: "বা + লি + শ + টা", meaning: "নির্দিষ্ট বালিশ (The pillow)" },
          { word: "বানরটা", breakdown: "বা + ন + র + টা", meaning: "নির্দিষ্ট বানর (The monkey)" },
          { word: "बाबाটা", breakdown: "বা + বা + টা", meaning: "নির্দিষ্ট বাবা (The father)" }
        ]
      },
      {
        name: "অংশ ২: সাধারণ শব্দ ভাঙ্গন",
        color: "bg-orange-500/10 border-orange-500/30 text-orange-300",
        words: [
          { word: "মাটিটা", breakdown: "মা + টি + টা", meaning: "নির্দিষ্ট মাটি (The soil)" },
          { word: "গাছটা", breakdown: "গা + ছ + টা", meaning: "নির্দিষ্ট গাছ (The tree)" },
          { word: "মাছটা", breakdown: "মা + ছ + টা", meaning: "নির্দিষ্ট মাছ (The fish)" },
          { word: "হাঁসটা", breakdown: "হাঁ + স + টা", meaning: "নির্দিষ্ট হাঁস (The duck)" },
          { word: "ছাগল", breakdown: "ছা + গ + ল", meaning: "গৃহপালিত পশু ছাগল (Goat)" },
          { word: "বাগান", breakdown: "বা + গা + ন", meaning: "ফুলবাগান (Garden)" },
          { word: "বাদাম", breakdown: "বা + দা + ম", meaning: "পুষ্টিকর খাবার বাদাম (Nut)" },
          { word: "বাতাস", breakdown: "বা + তা + স", meaning: "হাওয়া (Wind)" },
          { word: "সাবান", breakdown: "সা + বা + ন", meaning: "গা ধোয়ার সাবান (Soap)" },
          { word: "বালক", breakdown: "বা + ল + ক", meaning: "ছেলে শিশু (Boy)" }
        ]
      },
      {
        name: "অংশ ৩: বড় ও যৌগিক শব্দ ভাঙ্গন",
        color: "bg-rose-500/10 border-rose-500/30 text-rose-300",
        words: [
          { word: "বানর", breakdown: "বা + ন + র", meaning: "গাছের বানর (Monkey)" },
          { word: "চালাক", breakdown: "চা + লা + ক", meaning: "বুদ্ধিমান (Clever)" },
          { word: "সাহস", breakdown: "সা + হ + স", meaning: "বীরত্ব (Courage)" },
          { word: "পাহাড়", breakdown: "পা + হা + ড়", meaning: "গিরি পর্বত (Mountain)" },
          { word: "আদালত", breakdown: "আ + দা + ল + ত", meaning: "বিচারালয় (Court)" },
          { word: "কারখানা", breakdown: "কা + র + খা + না", meaning: "ফ্যাক্টরি (Factory)" },
          { word: "গায়ক", breakdown: "গা + য় + ক", meaning: "যিনি গান গান (Singer)" },
          { word: "মালা", breakdown: "মা + লা", meaning: "ফুলের মালা (Garland)" },
          { word: "দাদাভাই", breakdown: "দা + দা + ভাই", meaning: "দাদা ও ভাই (Grandpa/Brother)" },
          { word: "রান্নাঘর", breakdown: "রা + ন্না + ঘর", meaning: "যেখানে রান্না করা হয় (Kitchen)" }
        ]
      }
    ]
  },
  {
    level: 8,
    title: "লেভেল ৮",
    description: "২ অক্ষরের ই-কার (ি) যুক্ত সহজ শব্দমালা",
    theme: "from-rose-500 to-pink-500",
    subLevels: [
      {
        name: "অংশ ১: সহজ শব্দ",
        color: "bg-rose-500/10 border-rose-500/30 text-rose-300",
        words: [
          { word: "দিন", meaning: "দিবস (Day)" },
          { word: "দিক", meaning: "চারদিকের দিক (Direction)" },
          { word: "বিল", meaning: "ছোট জলাশয় (Marsh/Lake)" },
          { word: "ছবি", meaning: "চিত্র (Picture)" },
          { word: "চিঠি", meaning: "পত্র (Letter)" },
          { word: "শিশু", meaning: "ছোট বাচ্চা (Baby)" },
          { word: "শিখ", meaning: "শিক্ষা লাভ করো (Learn)" },
          { word: "মিছি", meaning: "মিছিল বা মিষ্টি কথা (Procession/Sweet talk)" },
          { word: "লিখ", meaning: "লেখো (Write)" },
          { word: "কিন", meaning: "ক্রয় করো (Buy)" }
        ]
      },
      {
        name: "অংশ ২: আমাদের চারপাশ",
        color: "bg-pink-500/10 border-pink-500/30 text-pink-300",
        words: [
          { word: "নিট", meaning: "খাঁটি বা পরিষ্কার (Net/Clean)" },
          { word: "মিষ্টি", meaning: "মিষ্টি স্বাদ (Sweet)" },
          { word: "বিছানা", meaning: "বিছানা (Bed)" },
          { word: "পিঠ", meaning: "শরীরের পিঠ (Back)" },
          { word: "বিড়াল", meaning: "বিড়াল (Cat)" },
          { word: "ঝিল", meaning: "লেক বা খাল (Lake)" },
          { word: "মিল", meaning: "একতা বা সাদৃশ্য (Harmony)" },
          { word: "চিন", meaning: "চেনা (Recognize)" },
          { word: "জিন", meaning: "প্রাণীর জিন বা আরোহণের জিন (Saddle/Gene)" },
          { word: "তিল", meaning: "তিল বীজ (Sesame)" }
        ]
      },
      {
        name: "অংশ ৩: খেলা ও আনন্দ",
        color: "bg-violet-500/10 border-violet-500/30 text-violet-300",
        words: [
          { word: "দিশা", meaning: "দিক বা লক্ষ্য (Direction)" },
          { word: "নিদ্রা", meaning: "ঘুম (Sleep)" },
          { word: "শির", meaning: "মাথা (Head)" },
          { word: "বীণ", meaning: "বাদ্যযন্ত্র (Lute)" },
          { word: "নিশি", meaning: "রাত (Night)" },
          { word: "পিন", meaning: "কাগজের আলপিন (Pin)" },
          { word: "হিসাব", meaning: "অঙ্ক করা (Calculation)" },
          { word: "ভিটে", meaning: "বাড়ি (Homestead)" },
          { word: "লিপি", meaning: "অক্ষর বা লেখা (Script)" },
          { word: "মণি", meaning: "রত্ন (Gem)" }
        ]
      }
    ]
  },
  {
    level: 9,
    title: "লেভেল ৯",
    description: "৩ অক্ষরের ই-কার (ি) যুক্ত সুন্দর শব্দমালা",
    theme: "from-cyan-500 to-blue-500",
    subLevels: [
      {
        name: "অংশ ১: জীবজন্তু ও মানুষ",
        color: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
        words: [
          { word: "পিঁপড়ে", meaning: "ছোট পিঁপড়া (Ant)" },
          { word: "চিলতা", meaning: "টুকরো (Slice)" },
          { word: "শিক্ষক", meaning: "যিনি পড়ান (Teacher)" },
          { word: "শিশুটি", meaning: "ছোট বাচ্চাটি (The baby)" },
          { word: "বিলাত", meaning: "বিদেশ (Abroad)" },
          { word: "বিলাস", meaning: "আনন্দ বা আমোদ (Luxury)" },
          { word: "চিকিৎসা", meaning: "ডাক্তারি করা (Treatment)" },
          { word: "লিখন", meaning: "লেখার প্রক্রিয়া (Writing)" },
          { word: "লিখিত", meaning: "লেখা হয়েছে যা (Written)" },
          { word: "দিকনির্দেশ", meaning: "দিক বলে দেওয়া (Guidance)" }
        ]
      },
      {
        name: "অংশ ২: সম্পর্ক ও ভ্রমণ",
        color: "bg-blue-500/10 border-blue-500/30 text-blue-300",
        words: [
          { word: "মিলন", meaning: "একত্রিত হওয়া (Union)" },
          { word: "বিমান", meaning: "উড়োজাহাজ (Airplane)" },
          { word: "বিকেল", meaning: "অপরাহ্ন (Afternoon)" },
          { word: "বিধান", meaning: "আইন বা নিয়ম (Rule)" },
          { word: "নিশান", meaning: "পতাকা (Flag)" },
          { word: "শিকার", meaning: "বন্যপ্রাণী ধরা (Hunt)" },
          { word: "চিঠিখানা", meaning: "কাগজের চিঠি (The letter)" },
          { word: "বিছানা", meaning: "ঘুমানোর বিছানা (Bed)" },
          { word: "বিজ্ঞান", meaning: "নতুন আবিষ্কার (Science)" },
          { word: "বিদায়", meaning: "বিদায় জানানো (Farewell)" }
        ]
      },
      {
        name: "অংশ ৩: মনের ভাব",
        color: "bg-teal-500/10 border-teal-500/30 text-teal-300",
        words: [
          { word: "বিচার", meaning: "ন্যায়বিচার (Justice)" },
          { word: "বিকাশ", meaning: "ফুটে ওঠা বা বড় হওয়া (Development)" },
          { word: "বিনয়", meaning: "নম্রতা (Modesty)" },
          { word: "পিতা", meaning: "বাবা (Father)" },
          { word: "শিশির", meaning: "শীতের ভোরের জল (Dew)" },
          { word: "বিপদ", meaning: "কষ্ট বা দুর্যোগ (Danger)" },
          { word: "লেখক", meaning: "যিনি লেখেন (Author)" },
          { word: "দিগন্ত", meaning: "আকাশ ও মাটির সংযোগস্থল (Horizon)" },
          { word: "নীরব", meaning: "চুপচাপ (Silent)" },
          { word: "বিহান", meaning: "ভোরবেলা (Dawn)" }
        ]
      }
    ]
  },
  {
    level: 10,
    title: "লেভেল ১০",
    description: "৪ অক্ষরের ই-কার (ি) যুক্ত আকর্ষণীয় শব্দ",
    theme: "from-teal-600 to-teal-400",
    subLevels: [
      {
        name: "অংশ ১: প্রকৃতি ও বিদ্যাপীঠ",
        color: "bg-teal-500/10 border-teal-500/30 text-teal-300",
        words: [
          { word: "শিশিরবিন্দু", meaning: "ঘাসের ডগার জলবিন্দু (Dewdrop)" },
          { word: "বিদ্যালয়", meaning: "স্কুল (School)" },
          { word: "বিজ্ঞানী", meaning: "যিনি বিজ্ঞান নিয়ে গবেষণা করেন (Scientist)" },
          { word: "বিকেলবেলা", meaning: "বিকালের মিষ্টি সময় (Afternoon)" },
          { word: "শিক্ষকতা", meaning: "শিক্ষকের কাজ (Teaching)" },
          { word: "বিশৃঙ্খলা", meaning: "এলোমেলো অবস্থা (Chaos)" },
          { word: "বিমানবন্দর", meaning: "যেখানে উড়োজাহাজ থামে (Airport)" },
          { word: "লেখাপড়া", meaning: "শিক্ষা অর্জন (Study)" },
          { word: "চিকিৎসালয়", meaning: "হাসপাতাল (Hospital)" },
          { word: "বিপদসংকেত", meaning: "সতর্কবার্তা (Warning signal)" }
        ]
      },
      {
        name: "অংশ ২: পরিবার ও সমাজ",
        color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
        words: [
          { word: "পিতামাতা", meaning: "বাবা ও মা (Parents)" },
          { word: "বিচারক", meaning: "যিনি রায় দেন (Judge)" },
          { word: "দিগন্তরেখা", meaning: "দিগন্তের সীমানা (Horizon line)" },
          { word: "বিনোদন", meaning: "আমোদ-প্রমোদ (Entertainment)" },
          { word: "বিকাশমান", meaning: "যা বড় হচ্ছে (Developing)" },
          { word: "বিধানসভা", meaning: "আইনসভা (Parliament)" },
          { word: "নিশিপাখি", meaning: "রাতের পাখি (Night bird)" },
          { word: "শিশুসাহিত্য", meaning: "শিশুদের বইপত্র (Children literature)" },
          { word: "বিদ্যাপীঠ", meaning: "স্কুল বা কলেজ (Academy)" },
          { word: "বিজ্ঞানমেলা", meaning: "বিজ্ঞানের প্রদর্শনী (Science fair)" }
        ]
      },
      {
        name: "অংশ ৩: আমাদের চেনা জগত",
        color: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
        words: [
          { word: "বিছানাপত্র", meaning: "বিছানার কাপড়চোপড় (Bedding)" },
          { word: "মিলনমেলা", meaning: "একত্রিত হওয়ার মেলা (Gathering)" },
          { word: "লিখনখাতা", meaning: "লেখার খাতা (Notebook)" },
          { word: "শিশুপার্ক", meaning: "বাচ্চাদের খেলার পার্ক (Children park)" },
          { word: "বিমানচালক", meaning: "যিনি প্লেন চালান (Pilot)" },
          { word: "পৈতৃকভূমি", meaning: "বাবার দেশ (Ancestral land)" },
          { word: "দিকনির্দেশ", meaning: "দিক বলে দেওয়া (Guidance)" },
          { word: "বিদ্যার্থী", meaning: "ছাত্র (Student)" },
          { word: "বিজ্ঞানাগার", meaning: "গবেষণাগার (Lab)" },
          { word: "শিক্ষালয়", meaning: "বিদ্যালয় (School)" }
        ]
      }
    ]
  },
  {
    level: 11,
    title: "লেভেল ১১",
    description: "২ অক্ষরের ঈ-কার (ী) যুক্ত ছোট শব্দমালা",
    theme: "from-sky-500 to-sky-300",
    subLevels: [
      {
        name: "অংশ ১: রঙ ও রূপ",
        color: "bg-sky-500/10 border-sky-500/30 text-sky-300",
        words: [
          { word: "নীল", meaning: "নীল রং (Blue)" },
          { word: "দীপ", meaning: "প্রদীপ (Lamp)" },
          { word: "জীব", meaning: "প্রাণ আছে যার (Living organism)" },
          { word: "বীজ", meaning: "গাছের বীজ (Seed)" },
          { word: "দীন", meaning: "দরিদ্র (Poor)" },
          { word: "শীল", meaning: "চরিত্র বা ভদ্রতা (Character)" },
          { word: "ধীর", meaning: "আস্তে আস্তে (Slow)" },
          { word: "তীর", meaning: "নদীর পাড় বা ধুনকের তীর (Bank/Arrow)" },
          { word: "নীচ", meaning: "নিম্নস্থান (Low)" },
          { word: "ভীষণ", meaning: "খুব বেশি (Very much)" }
        ]
      },
      {
        name: "অংশ ২: প্রকৃতি ও প্রাণী",
        color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
        words: [
          { word: "চীন", meaning: "আমাদের প্রতিবেশী দেশ (China)" },
          { word: "গীত", meaning: "গান (Song)" },
          { word: "মীন", meaning: "মাছ (Fish)" },
          { word: "হীরা", meaning: "মূল্যবান রত্ন (Diamond)" },
          { word: "শীর্ণ", meaning: "রোগা বা রোগাটে (Thin)" }
        ]
      }
    ]
  },
  {
    level: 12,
    title: "লেভেল ১২",
    description: "৩ অক্ষরের ঈ-কার (ী) যুক্ত আকর্ষণীয় শব্দমালা",
    theme: "from-indigo-600 to-indigo-400",
    subLevels: [
      {
        name: "অংশ ১: প্রকৃতি ও সৌন্দর্য",
        color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
        words: [
          { word: "নীলিমা", meaning: "আকাশের নীল রং (Blueness)" },
          { word: "দীপক", meaning: "যিনি আলো ছড়ান (Lamp/Light source)" },
          { word: "জীবন", meaning: "প্রাণ (Life)" },
          { word: "বীজতলা", meaning: "চারা গাছ তৈরির মাটি (Seedbed)" },
          { word: "গীতি", meaning: "গীতি কবিতা বা গান (Song/Lyrics)" },
          { word: "দীনতা", meaning: "গরীব দশা (Poverty)" },
          { word: "নীতি", meaning: "সততার নিয়ম (Ethics/Morals)" },
          { word: "শরীর", meaning: "আমাদের দেহ (Body)" }
        ]
      },
      {
        name: "অংশ ২: সঙ্গীত ও নদী",
        color: "bg-pink-500/10 border-pink-500/30 text-pink-300",
        words: [
          { word: "সঙ্গীত", meaning: "গান-বাজনা (Music)" },
          { word: "রীতি", meaning: "প্রথা বা নিয়ম (Tradition)" },
          { word: "पृथ्वीবী", meaning: "আমাদের এই গ্রহ (Earth)" },
          { word: "নদীটি", meaning: "নির্দিষ্ট নদী (The river)" },
          { word: "দীঘল", meaning: "লম্বা (Long)" },
          { word: "নীলকণ্ঠ", meaning: "নীল রঙের গলা যার (Blue-throated)" },
          { word: "সীমা", meaning: "সীমানা (Boundary)" }
        ]
      }
    ]
  },
  {
    level: 13,
    title: "লেভেল ১৩",
    description: "৪ অক্ষরের ঈ-কার (ী) যুক্ত বড় বড় শব্দমালা",
    theme: "from-purple-600 to-purple-400",
    subLevels: [
      {
        name: "অংশ ১: সুন্দর আকাশ ও প্রকৃতি",
        color: "bg-purple-500/10 border-purple-500/30 text-purple-300",
        words: [
          { word: "জীবনধারা", meaning: "বেঁচে থাকার উপায় (Lifestyle)" },
          { word: "নীলাকাশ", meaning: "নীল আকাশ (Blue sky)" },
          { word: "পৃথিবীটা", meaning: "সমগ্র দুনিয়া (The earth)" },
          { word: "শরীরচর্চা", meaning: "ব্যায়াম (Physical exercise)" },
          { word: "সঙ্গীতশিল্পী", meaning: "যিনি গান করেন (Singer/Musician)" },
          { word: "নীতিকথা", meaning: "সততার বাণী (Moral story/Moral teaching)" },
          { word: "দীপাবলি", meaning: "আলোর উৎসব (Festival of lights)" },
          { word: "সীমারেখা", meaning: "সীমান্তের লাইন (Boundary line)" }
        ]
      },
      {
        name: "অংশ ২: নদী ও রূপকথা",
        color: "bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-300",
        words: [
          { word: "নদীতীর", meaning: "নদীর পাড় (Riverbank)" },
          { word: "নীলপাখি", meaning: "নীল রঙের পাখি (Blue bird)" },
          { word: "জীবনগাথা", meaning: "জীবনের গল্প (Life story)" },
          { word: "নীলপরী", meaning: "রূপকথার পরী (Blue fairy)" },
          { word: "বীজতলা", meaning: "চারা বানানোর জায়গা (Seedbed)" },
          { word: "তীরধনুক", meaning: "ধনুক ও তীর (Bow and arrow)" },
          { word: "গীতাঞ্জলি", meaning: "রবীন্দ্রনাথের বিখ্যাত বই (Gitanjali)" }
        ]
      }
    ]
  },
  {
    level: 14,
    title: "লেভেল ১৪",
    description: "২ অক্ষরের উ-কার (ু) যুক্ত অতি মিষ্টি সহজ শব্দ",
    theme: "from-rose-500 to-orange-500",
    subLevels: [
      {
        name: "অংশ ১: ছোট ফুল ও ফল",
        color: "bg-rose-500/10 border-rose-500/30 text-rose-300",
        words: [
          { word: "ফুল", meaning: "বাগানের ফুল (Flower)" },
          { word: "দুল", meaning: "কানের দুল (Earring)" },
          { word: "কুল", meaning: "নদীর কুল বা বরই (Bank / Plum)" },
          { word: "ভুল", meaning: "ভুলভ্রান্তি (Mistake)" },
          { word: "ধুলা", meaning: "মাটি বা বালি (Dust)" },
          { word: "চুল", meaning: "আমাদের মাথার চুল (Hair)" },
          { word: "সুখ", meaning: "আনন্দ (Happiness)" },
          { word: "বুক", meaning: "বক্ষ (Chest)" },
          { word: "খুদ", meaning: "ভাঙা চাল (Broken rice)" },
          { word: "সুর", meaning: "মিষ্টি আওয়াজ (Melody)" }
        ]
      },
      {
        name: "অংশ ২: মজার কথা",
        color: "bg-orange-500/10 border-orange-500/30 text-orange-300",
        words: [
          { word: "কুসুম", meaning: "ফুল (Flower)" },
          { word: "নুন", meaning: "লবণ (Salt)" },
          { word: "ঝুল", meaning: "ঝুলে থাকা বা ঝুল (Swing/Soot)" },
          { word: "গুণ", meaning: "সততা বা ভালো গুণ (Virtue/Multiplication)" },
          { word: "মুখ", meaning: "চেহারা (Face)" }
        ]
      }
    ]
  },
  {
    level: 15,
    title: "লেভেল ১৫",
    description: "৩ অক্ষরের উ-কার (ু) যুক্ত সুন্দর সুন্দর শব্দ",
    theme: "from-orange-600 to-yellow-500",
    subLevels: [
      {
        name: "অংশ ১: বনের কুমির ও পুতুল",
        color: "bg-orange-500/10 border-orange-500/30 text-orange-300",
        words: [
          { word: "কুমির", meaning: "জলের বড় প্রাণী (Crocodile)" },
          { word: "পুতুল", meaning: "খেলনা পুতুল (Doll)" },
          { word: "মুকুট", meaning: "রাজার মাথার মুকুট (Crown)" },
          { word: "দুপুর", meaning: "দিনের মধ্যভাগ (Noon)" },
          { word: "ফুলদানি", meaning: "ফুল রাখার পাত্র (Flower vase)" },
          { word: "কুয়াশা", meaning: "শীতের সকালে সাদা কুয়াশা (Fog/Mist)" },
          { word: "যুবক", meaning: "তরুণ ব্যক্তি (Youth/Young man)" },
          { word: "পুরনো", meaning: "প্রাচীন (Old)" }
        ]
      },
      {
        name: "অংশ ২: মিষ্টি মুখগুলো",
        color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
        words: [
          { word: "সুমন", meaning: "সুন্দর মন যার (Good minded)" },
          { word: "সুভাষ", meaning: "মিষ্টি কথাবার্তা (Sweet speech)" },
          { word: "গুণন", meaning: "অঙ্কের গুণ করা (Multiplication)" },
          { word: "কুশল", meaning: "ভাল থাকা বা মঙ্গল (Welfare/Well-being)" },
          { word: "সুরেলা", meaning: "মিষ্টি কণ্ঠস্বর (Melodious)" },
          { word: "ভুবন", meaning: "পৃথিবী (World)" },
          { word: "মুনিয়া", meaning: "ছোট মিষ্টি পাখি (Munia bird)" }
        ]
      }
    ]
  },
  {
    level: 16,
    title: "লেভেল ১৬",
    description: "৪ অক্ষরের উ-কার (ু) যুক্ত চমৎকার শব্দমালা",
    theme: "from-pink-600 to-amber-500",
    subLevels: [
      {
        name: "অংশ ১: বাচ্চাদের খেলাধুলো",
        color: "bg-pink-500/10 border-pink-500/30 text-pink-300",
        words: [
          { word: "পুতুলখেলা", meaning: "পুতুল নিয়ে খেলা (Playing with dolls)" },
          { word: "কুমিরছানা", meaning: "কুমিরের বাচ্চা (Crocodile baby)" },
          { word: "মুকুটধারী", meaning: "যিনি মুকুট পরেছেন (Crowned)" },
          { word: "দুপুরবেলা", meaning: "দুপুরের রোদ সময় (Noontime)" },
          { word: "কুশলতা", meaning: "দক্ষতা বা মঙ্গল (Skill/Welfare)" },
          { word: "সুরধ্বনি", meaning: "মিষ্টি সুরের আওয়াজ (Melodious sound)" },
          { word: "ভুবনজোড়া", meaning: "সারা পৃথিবী জুড়ে (World-wide)" },
          { word: "মুনিয়াপাখি", meaning: "সুন্দর মুনিয়া পাখি (Munia bird)" }
        ]
      },
      {
        name: "অংশ ২: নাগরিকের গুণ",
        color: "bg-amber-500/10 border-amber-500/30 text-amber-300",
        words: [
          { word: "পুরস্কার", meaning: "পুরস্কৃত করা (Reward/Prize)" },
          { word: "সুনাগরিক", meaning: "ভালো নাগরিক (Good citizen)" },
          { word: "কুসুমফুল", meaning: "বাগানের ফুল (Flower)" },
          { word: "সুরকার", meaning: "যিনি সুর তৈরি করেন (Music composer)" },
          { word: "যুবসমাজ", meaning: "তরুণ সমাজ (Youth generation)" },
          { word: "কুটিরঘর", meaning: "ছোট কুঁড়েঘর (Cottage)" },
          { word: "গুণবতী", meaning: "গুণী নারী (Virtuous woman)" }
        ]
      }
    ]
  },
  {
    level: 17,
    title: "লেভেল ১৭",
    description: "৩ অক্ষরের ঊ-কার (ূ) যুক্ত সুন্দর শব্দ",
    theme: "from-purple-500 to-pink-500",
    subLevels: [
      {
        name: "অংশ ১: দূরে দেখার যন্ত্র",
        color: "bg-purple-500/10 border-purple-500/30 text-purple-300",
        words: [
          { word: "দূরবীন", meaning: "দূরের জিনিস দেখার নল (Telescope/Binoculars)" },
          { word: "দূরত্ব", meaning: "ফাঁকা জায়গা (Distance)" },
          { word: "ভূমিকা", meaning: "সূচনা বা ভূমিকা (Introduction)" },
          { word: "ভূগোল", meaning: "পৃথিবীর বিবরণ (Geography)" },
          { word: "সূর্য", meaning: "আকাশের রবি (Sun)" },
          { word: "সূচনা", meaning: "শুরু (Beginning)" },
          { word: "সূর্যমুখী", meaning: "হলুদ ফুল (Sunflower)" },
          { word: "কুপন", meaning: "উপহারের টিকিট (Coupon)" }
        ]
      },
      {
        name: "অংশ ২: প্রকৃতির রূপ",
        color: "bg-pink-500/10 border-pink-500/30 text-pink-300",
        words: [
          { word: "ধূমপান", meaning: "ক্ষতিকর অভ্যাস (Smoking)" },
          { word: "ধূমকেতু", meaning: "আকাশের ঝাড়ু নক্ষত্র (Comet)" },
          { word: "নূপুর", meaning: "পায়ের বাদ্যযন্ত্র (Anklet)" },
          { word: "চূড়ান্ত", meaning: "শেষ সিদ্ধান্ত (Final)" },
          { word: "চূড়ামণি", meaning: "শ্রেষ্ঠ রত্ন (Crown jewel)" },
          { word: "ঊষাকাল", meaning: "ভোরবেলা (Dawn)" },
          { word: "উনিশ", meaning: "সংখ্যা ১৯ (Nineteen)" }
        ]
      }
    ]
  },
  {
    level: 18,
    title: "লেভেল ১৮",
    description: "৪ অক্ষরের ঊ-কার (ূ) যুক্ত আকর্ষণীয় শব্দ",
    theme: "from-rose-500 to-indigo-500",
    subLevels: [
      {
        name: "অংশ ১: মহাকাশ ও পৃথিবী",
        color: "bg-rose-500/10 border-rose-500/30 text-rose-300",
        words: [
          { word: "দূরবীক্ষণ", meaning: "দূরবীন দিয়ে দেখা (Observation via telescope)" },
          { word: "দূরদর্শন", meaning: "টেলিভিশন (Television)" },
          { word: "ভূমিকম্প", meaning: "মাটি কেঁপে ওঠা (Earthquake)" },
          { word: "ভূগোলবই", meaning: "ভূগোলের পাঠ্যবই (Geography book)" },
          { word: "সূর্যমুখী", meaning: "হলুদ সূর্যমুখী ফুল (Sunflower)" },
          { word: "সূর্যোদয়", meaning: "সকালে সূর্য ওঠা (Sunrise)" },
          { word: "সূর্যাস্ত", meaning: "বিকালে সূর্য ডোবা (Sunset)" },
          { word: "ধূমকেতু", meaning: "মহাকাশের ধূমকেতু (Comet)" }
        ]
      },
      {
        name: "অংশ ২: ভোরের আনন্দ",
        color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
        words: [
          { word: "ধূমপায়ী", meaning: "যিনি ধূমপান করেন (Smoker)" },
          { word: "নূপুরধ্বনি", meaning: "নূপুরের ছমছম আওয়াজ (Anklet sound)" },
          { word: "চূড়ামণি", meaning: "মুকুটের রত্ন (Crown gem)" },
          { word: "ঊষাকাল", meaning: "ভোরবেলা (Dawn)" },
          { word: "উনিশজন", meaning: "১৯ জন মানুষ (Nineteen people)" },
          { word: "কূপমণ্ডূক", meaning: "সীমাবদ্ধ জ্ঞানের কুয়োর ব্যাঙ (Narrow-minded)" },
          { word: "দূরবার্তা", meaning: "দূরের খবর (Telegram/News)" }
        ]
      }
    ]
  },
  {
    level: 19,
    title: "লেভেল ১৯",
    description: "২ অক্ষরের ঋ-কার (ৃ) যুক্ত চমৎকার ও ছোট শব্দ",
    theme: "from-emerald-500 to-teal-500",
    subLevels: [
      {
        name: "অংশ ১: গাছপালা ও সবুজ মাঠ",
        color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
        words: [
          { word: "কৃষি", meaning: "চাষাবাদ করা (Agriculture)" },
          { word: "কৃশ", meaning: "পাতলা বা রোগা (Thin)" },
          { word: "কৃপা", meaning: "দয়া বা করুণা (Mercy/Grace)" },
          { word: "কৃত", meaning: "করা হয়েছে যা (Done)" },
          { word: "তৃষ্ণা", meaning: "পিপাসা (Thirst)" },
          { word: "দৃঢ়", meaning: "শক্ত বা মজবুত (Firm/Strong)" },
          { word: "বৃথা", meaning: "অযথা (Vain)" },
          { word: "বৃক্ষ", meaning: "গাছ (Tree)" },
          { word: "গৃহ", meaning: "বাসা বা ঘর (Home)" },
          { word: "মৃগ", meaning: "হরিণ (Deer)" }
        ]
      }
    ]
  },
  {
    level: 20,
    title: "লেভেল ২০",
    description: "৩ অক্ষরের ঋ-কার (ৃ) যুক্ত শিক্ষণীয় শব্দ",
    theme: "from-teal-500 to-green-500",
    subLevels: [
      {
        name: "অংশ ১: চাষী ও সবুজ পৃথিবী",
        color: "bg-teal-500/10 border-teal-500/30 text-teal-300",
        words: [
          { word: "কৃষক", meaning: "যিনি চাষ করেন (Farmer)" },
          { word: "কৃষাণ", meaning: "চাষী বা খেতমজুর (Peasant)" },
          { word: "কৃপণ", meaning: "কিপটে লোক (Miser)" },
          { word: "কৃতজ্ঞ", meaning: "উপকার স্বীকার করে যে (Grateful)" },
          { word: "তৃণভূমি", meaning: "ঘাসবন (Grassland)" },
          { word: "মৃগয়া", meaning: "হরিণ শিকার (Hunting)" },
          { word: "গৃহিণী", meaning: "ঘরের কর্ত্রী বা মা (Housewife)" },
          { word: "গৃহস্থ", meaning: "সংসারী ব্যক্তি (Householder)" },
          { word: "বৃক্ষরোপণ", meaning: "গাছ লাগানো (Tree plantation)" },
          { word: "মৃতদেহ", meaning: "লাশ (Corpse/Dead body)" }
        ]
      }
    ]
  },
  {
    level: 21,
    title: "লেভেল ২১",
    description: "৪ অক্ষরের ঋ-কার (ৃ) যুক্ত সমৃদ্ধ শব্দমালা",
    theme: "from-green-600 to-teal-500",
    subLevels: [
      {
        name: "অংশ ১: মাঠের কাজ ও মৃৎশিল্প",
        color: "bg-green-500/10 border-green-500/30 text-green-300",
        words: [
          { word: "কৃষিকাজ", meaning: "খেতে কাজ করা (Farming)" },
          { word: "কৃষিজমি", meaning: "চাষের খেত (Agricultural land)" },
          { word: "কৃষকদল", meaning: "কৃষকদের দল (Group of farmers)" },
          { word: "গৃহপালিত", meaning: "বাসায় পোষা প্রাণী (Domesticated)" },
          { word: "গৃহশিক্ষক", meaning: "যিনি বাসায় পড়ান (Tutor)" },
          { word: "বৃক্ষরোপণ", meaning: "গাছ লাগানো (Tree planting)" },
          { word: "কৃতজ্ঞতা", meaning: "উপকার স্বীকার করার গুণ (Gratitude)" },
          { word: "মৃৎশিল্প", meaning: "মাটির তৈরি শিল্প (Pottery)" },
          { word: "তৃণভোজী", meaning: "ঘাস খেকো পশু (Herbivore)" },
          { word: "কৃষিবিদ", meaning: "কৃষি বিশেষজ্ঞ (Agriculturist)" }
        ]
      }
    ]
  },
  {
    level: 22,
    title: "লেভেল ২২",
    description: "২ অক্ষরের এ-কার (ে) যুক্ত মজাদার শব্দমালা",
    theme: "from-indigo-500 to-pink-500",
    subLevels: [
      {
        name: "অংশ ১: আমাদের চেনা দেশ ও মেঘ",
        color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
        words: [
          { word: "দেশ", meaning: "মাতৃভূমি (Country)" },
          { word: "মেঘ", meaning: "আকাশের কালো মেঘ (Cloud)" },
          { word: "বেল", meaning: "সুস্বাদু ফল বেল (Woodapple)" },
          { word: "ঢেউ", meaning: "নদীর জলতরঙ্গ (Wave)" },
          { word: "কেক", meaning: "মিষ্টি কেক (Cake)" },
          { word: "জেল", meaning: "কারাগার (Prison)" },
          { word: "লেজ", meaning: "পশুর লেজ (Tail)" },
          { word: "পেট", meaning: "উদর (Belly/Stomach)" },
          { word: "খেলা", meaning: "ক্রীড়া বা খেলাধুলা (Play/Game)" },
          { word: "লেখা", meaning: "হস্তলিপি করা (Writing)" }
        ]
      },
      {
        name: "অংশ ২: মজার মেলা",
        color: "bg-pink-500/10 border-pink-500/30 text-pink-300",
        words: [
          { word: "দেখা", meaning: "চোখে দেখা (See/Look)" },
          { word: "বেলা", meaning: "সময় বা নদীর বেলাভূমি (Time/Shore)" },
          { word: "মেলা", meaning: "আনন্দের উৎসব (Fair)" },
          { word: "শেখা", meaning: "জ্ঞান অর্জন করা (Learn)" },
          { word: "বেচা", meaning: "বিক্রি করা (Sell)" }
        ]
      }
    ]
  },
  {
    level: 23,
    title: "লেভেল ২৩",
    description: "৩ অক্ষরের এ-কার (ে) যুক্ত চমৎকার শব্দসমূহ",
    theme: "from-indigo-600 to-rose-500",
    subLevels: [
      {
        name: "অংশ ১: মজার খেলনা ও বেলুন",
        color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
        words: [
          { word: "খেলনা", meaning: "খেলার জিনিস (Toy)" },
          { word: "লেখক", meaning: "যিনি বই লেখেন (Writer)" },
          { word: "বেলুন", meaning: "বাতাস ভরা বেলুন (Balloon)" },
          { word: "বেগুন", meaning: "বেগুনী রঙের সবজি (Eggplant)" },
          { word: "বেড়াল", meaning: "পোষা মিউ বিড়াল (Cat)" },
          { word: "মেঝেতে", meaning: "ঘরের মেঝেতে (On the floor)" },
          { word: "খেজুর", meaning: "মিষ্টি খেজুর ফল (Date fruit)" },
          { word: "দেবতা", meaning: "সুর বা ভগবান (Deity/God)" }
        ]
      },
      {
        name: "অংশ ২: সেবকের সেবা",
        color: "bg-rose-500/10 border-rose-500/30 text-rose-300",
        words: [
          { word: "সেবক", meaning: "যিনি সেবা করেন (Servant/Helper)" },
          { word: "বেতন", meaning: "কাজের মাইনে (Salary)" },
          { word: "ফেরত", meaning: "ফিরিয়ে দেওয়া (Return)" },
          { word: "দেশি", meaning: "নিজের দেশের (Local/Native)" },
          { word: "মেহেদি", meaning: "হাতে লাগানোর মেহেদি পাতা (Henna)" },
          { word: "রেশম", meaning: "নরম সিল্ক সুতো (Silk)" },
          { word: "মেঘলা", meaning: "মেঘে ঢাকা আকাশ (Cloudy)" }
        ]
      }
    ]
  },
  {
    level: 24,
    title: "লেভেল ২৪",
    description: "৪ অক্ষরের এ-কার (ে) যুক্ত দীর্ঘ মিষ্টি শব্দমালা",
    theme: "from-rose-500 to-orange-500",
    subLevels: [
      {
        name: "অংশ ১: বনের খেলাঘর ও মাঠ",
        color: "bg-rose-500/10 border-rose-500/30 text-rose-300",
        words: [
          { word: "খেলাঘর", meaning: "খেলার ছোট ঘর (Playhouse)" },
          { word: "খেলারমাঠ", meaning: "খেলার বড় মাঠ (Playground)" },
          { word: "লেখাপড়া", meaning: "শিক্ষা লাভ করা (Study)" },
          { word: "দেশলাই", meaning: "আগুন জ্বালানোর কাঠি (Matchbox)" },
          { word: "বেলগাছ", meaning: "বেলের গাছ (Woodapple tree)" },
          { word: "খেজুরগাছ", meaning: "খেজুরের গাছ (Date tree)" },
          { word: "মেহেদিপাতা", meaning: "মেহেদির সবুজ পাতা (Henna leaf)" },
          { word: "বেগুনভাজা", meaning: "বেগুনের চমৎকার ভাজি (Fried eggplant)" }
        ]
      },
      {
        name: "অংশ ২: দেশের সীমানা পেরিয়ে",
        color: "bg-orange-500/10 border-orange-500/30 text-orange-300",
        words: [
          { word: "দেশভ্রমণ", meaning: "দেশ ঘুরে দেখা (Country tour)" },
          { word: "মেঘবৃষ্টি", meaning: "মেঘ ও বৃষ্টি (Rainy weather)" },
          { word: "লেখনীখাতা", meaning: "লেখার সুন্দর খাতা (Writing notebook)" },
          { word: "খেলনাবাক্স", meaning: "খেলনা রাখার বাক্স (Toy box)" },
          { word: "দেশবাসী", meaning: "দেশের মানুষ (Countrymen)" },
          { word: "বেলপাতা", meaning: "বেলের পাতা (Bael leaf)" },
          { word: "সেবাকেন্দ্র", meaning: "সেবা দেওয়ার বুথ (Service center)" }
        ]
      }
    ]
  },
  {
    level: 25,
    title: "লেভেল ২৫",
    description: "২ অক্ষরের ঐ-কার (ৈ) যুক্ত চমৎকার শব্দাবলী",
    theme: "from-amber-600 to-amber-400",
    subLevels: [
      {
        name: "অংশ ১: দৈব ও তৈল",
        color: "bg-amber-500/10 border-amber-500/30 text-amber-300",
        words: [
          { word: "দৈন্য", meaning: "গরীব দশা (Poverty)" },
          { word: "দৈব", meaning: "ভাগ্য বা স্বর্গীয় (Divine/Fate)" },
          { word: "দৈহিক", meaning: "শরীর সংক্রান্ত (Physical)" },
          { word: "কৈ", meaning: "কৈ মাছ (Climbing perch)" },
          { word: "কৈলাস", meaning: "পর্বতের নাম (Mount Kailash)" },
          { word: "তৈল", meaning: "তেল (Oil)" },
          { word: "বৈদ্য", meaning: "কবিরাজ বা ডাক্তার (Physician)" },
          { word: "বৈর", meaning: "শত্রুতা (Enmity)" },
          { word: "সৈকত", meaning: "সমুদ্রের বালুকাময় পাড় (Beach)" },
          { word: "নৈবদ্য", meaning: "পুজোর খাবার ভোগ (Offering)" }
        ]
      }
    ]
  },
  {
    level: 26,
    title: "লেভেল ২৬",
    description: "৩ অক্ষরের ঐ-কার (ৈ) যুক্ত মিষ্টি শব্দসমূহ",
    theme: "from-yellow-600 to-yellow-400",
    subLevels: [
      {
        name: "অংশ ১: বনের সৈনিক ও বৈকাল",
        color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
        words: [
          { word: "কৈশোর", meaning: "১০-১৮ বছর বয়স (Adolescence)" },
          { word: "তৈলাক্ত", meaning: "তেলযুক্ত (Oily)" },
          { word: "সৈনিক", meaning: "দেশ রক্ষাকারী যোদ্ধা (Soldier)" },
          { word: "বৈকাল", meaning: "বিকালবেলা (Afternoon)" },
          { word: "বৈচিত্র্য", meaning: "নানা রকমের সৌন্দর্য (Diversity)" },
          { word: "বৈঠক", meaning: "সভা বা মিটিং (Meeting)" },
          { word: "বৈজ্ঞানিক", meaning: "বিজ্ঞান সংক্রান্ত (Scientific)" },
          { word: "নৈবেদ্য", meaning: "দেবতার উদ্দেশ্যে নিবেদিত খাবার (Offering)" },
          { word: "দৈনিক", meaning: "প্রতিদিনের (Daily)" },
          { word: "বৈধতা", meaning: "আইনসম্মত হওয়া (Validity)" }
        ]
      }
    ]
  },
  {
    level: 27,
    title: "লেভেল ২৭",
    description: "৪ অক্ষরের ঐ-কার (ৈ) যুক্ত বড় বড় শব্দমালা",
    theme: "from-teal-500 to-teal-300",
    subLevels: [
      {
        name: "অংশ ১: বিজ্ঞানী ও বৈঠকখানা",
        color: "bg-teal-500/10 border-teal-500/30 text-teal-300",
        words: [
          { word: "বৈজ্ঞানিক", meaning: "গবেষক (Scientist)" },
          { word: "বৈঠকখানা", meaning: "ড্রয়িং রুম (Drawing room)" },
          { word: "দৈনন্দিন", meaning: "প্রতিদিনের কাজ (Daily routine)" },
          { word: "সৈনিকদল", meaning: "সেনাদের সৈন্যদল (Army unit)" },
          { word: "বৈদেশিক", meaning: "বিদেশের (Foreign)" },
          { word: "তৈলবীজ", meaning: "তেলের বীজ (Oilseed)" },
          { word: "নৈবেদ্যপাত্র", meaning: "ভোগ রাখার থালা (Offering plate)" },
          { word: "কৈশোরকাল", meaning: "ছোটবেলার মিষ্টি বয়স (Teenage years)" },
          { word: "বৈদ্যখানা", meaning: "ডাক্তারখানা (Dispensary)" },
          { word: "বৈচিত্র্যময়", meaning: "নানা রঙের চমৎকার (Diverse/Colorful)" }
        ]
      }
    ]
  },
  {
    level: 28,
    title: "লেভেল ২৮",
    description: "২ অক্ষরের ও-কার (ো) যুক্ত সহজ ও সুন্দর শব্দমালা",
    theme: "from-cyan-500 to-cyan-300",
    subLevels: [
      {
        name: "অংশ ১: গোল বোল ও দোল",
        color: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
        words: [
          { word: "বোল", meaning: "কথা বা সুর (Speech)" },
          { word: "গোল", meaning: "বৃত্তাকার বা গোল করা (Round/Goal)" },
          { word: "দোল", meaning: "দোল খাওয়া (Swing)" },
          { word: "ঘোড়া", meaning: "দ্রুত দৌড়ানো পশু (Horse)" },
          { word: "বোঝা", meaning: "মাথার ওপর ভার (Burden)" },
          { word: "খোঁজ", meaning: "সন্ধান করা (Search)" },
          { word: "রোদ", meaning: "সূর্যের আলো (Sunlight)" },
          { word: "রোগ", meaning: "অসুখ (Sickness)" },
          { word: "লোভ", meaning: "লালসা (Greed)" },
          { word: "মোট", meaning: "সব মিলিয়ে (Total)" }
        ]
      }
    ]
  },
  {
    level: 29,
    title: "লেভেল ২৯",
    description: "৩ অক্ষরের ও-কার (ো) যুক্ত মিষ্টি মিষ্টি শব্দসমূহ",
    theme: "from-blue-600 to-blue-400",
    subLevels: [
      {
        name: "অংশ ১: দোকানে সুন্দর গোলাপ ও বোতল",
        color: "bg-blue-500/10 border-blue-500/30 text-blue-300",
        words: [
          { word: "বোতল", meaning: "জল রাখার পাত্র (Bottle)" },
          { word: "দোকান", meaning: "কেনাবেচার দোকান (Shop)" },
          { word: "গোলাপ", meaning: "ফুলের রানী গোলাপ (Rose)" },
          { word: "দোলনা", meaning: "বাচ্চাদের দোলনা (Swing)" },
          { word: "মোরগ", meaning: "ডাক দেওয়া মোরগ পাখি (Rooster)" },
          { word: "খোকা", meaning: "ছোট ছেলে খোকা (Baby boy)" },
          { word: "বোকা", meaning: "সহজ সরল বোকা (Silly)" },
          { word: "মোজা", meaning: "পায়ের মোজা (Socks)" },
          { word: "ছোট", meaning: "ক্ষুদ্র (Small)" },
          { word: "খোলা", meaning: "মুক্ত বা উন্মুক্ত (Open)" }
        ]
      }
    ]
  },
  {
    level: 30,
    title: "লেভেল ৩০",
    description: "৪ অক্ষরের ও-কার (ো) যুক্ত বড় বড় সুন্দর শব্দমালা",
    theme: "from-purple-500 to-purple-300",
    subLevels: [
      {
        name: "অংশ ১: লাল গোলাপ ফুল ও খেলনা",
        color: "bg-purple-500/10 border-purple-500/30 text-purple-300",
        words: [
          { word: "গোলাপফুল", meaning: "সুগন্ধি গোলাপ ফুল (Rose flower)" },
          { word: "দোলনাচেয়ার", meaning: "দোল খাওয়া আরাম চেয়ার (Rocking chair)" },
          { word: "দোকানঘর", meaning: "কেনাবেচার ঘর (Store)" },
          { word: "বোতলভর্তি", meaning: "বোতলে ভরা জল (Full bottle)" },
          { word: "মোরগছানা", meaning: "মোরগের বাচ্চা (Chic)" },
          { word: "খোকাবাবু", meaning: "মিষ্টি ছোট খোকা (Little master)" },
          { word: "ছোটবেলা", meaning: "শৈশবকাল (Childhood)" },
          { word: "মোটরগাড়ি", meaning: "গাড়ি (Car)" },
          { word: "গোলঘর", meaning: "গোল আকৃতির ঘর (Round room)" },
          { word: "বোকামি", meaning: "বোকার মতো কাজ (Foolishness)" }
        ]
      }
    ]
  },
  {
    level: 31,
    title: "লেভেল ৩১",
    description: "২ অক্ষরের ঔ-কার (ৌ) যুক্ত চমৎকার ছোট শব্দাবলী",
    theme: "from-rose-500 to-rose-300",
    subLevels: [
      {
        name: "অংশ ১: বনের মৌচাক ও মিষ্টি বৌমা",
        color: "bg-rose-500/10 border-rose-500/30 text-rose-300",
        words: [
          { word: "বউ", meaning: "বধূ (Bride/Wife)" },
          { word: "বৌমা", meaning: "পুত্রবধূ (Daughter-in-law)" },
          { word: "বৌদি", meaning: "বড় ভাইয়ের স্ত্রী (Sister-in-law)" },
          { word: "মৌ", meaning: "মধু (Honey)" },
          { word: "মৌচাক", meaning: "মৌমাছির বাসা (Beehive)" },
          { word: "মৌল", meaning: "মৌলিক বা গোড়া (Element/Root)" },
          { word: "কৌতুক", meaning: "মজার গল্প বা জোড়া (Joke/Fun)" },
          { word: "কৌণিক", meaning: "কোণ সংক্রান্ত (Angular)" },
          { word: "সৌর", meaning: "সূর্য সংক্রান্ত (Solar)" },
          { word: "গৌর", meaning: "ফর্সা রং বা সুন্দর (Fair/White)" }
        ]
      }
    ]
  },
  {
    level: 32,
    title: "লেভেল ৩২",
    description: "৩ অক্ষরের ঔ-কার (ৌ) যুক্ত চমৎকার শব্দসমূহ",
    theme: "from-pink-500 to-pink-300",
    subLevels: [
      {
        name: "অংশ ১: মৌমাছির মধু ও গৌরব",
        color: "bg-pink-500/10 border-pink-500/30 text-pink-300",
        words: [
          { word: "মৌমাছি", meaning: "মধু সংগ্রহকারী পোকা (Honeybee)" },
          { word: "মৌচাক", meaning: "মৌমাছির বাড়ি (Beehive)" },
          { word: "বৌমা", meaning: "বৌমা (Daughter-in-law)" },
          { word: "বৌদি", meaning: "বৌদি (Sister-in-law)" },
          { word: "কৌতুক", meaning: "মজার হাসির কথা (Joke)" },
          { word: "কৌশল", meaning: "উপায় বা বুদ্ধি (Technique/Tactic)" },
          { word: "সৌজন্য", meaning: "ভদ্রতা (Courtesy)" },
          { word: "সৌন্দর্য", meaning: "রূপ বা চমৎকার দৃশ্য (Beauty)" },
          { word: "গৌরব", meaning: "সম্মান বা অহংকার (Glory/Pride)" },
          { word: "দৌড়", meaning: "দ্রুত দৌড়ানো (Run)" }
        ]
      }
    ]
  },
  {
    level: 33,
    title: "লেভেল ৩৩",
    description: "৪ অক্ষরের ঔ-কার (ৌ) যুক্ত সমৃদ্ধ ও আকর্ষনীয় শব্দ",
    theme: "from-fuchsia-500 to-fuchsia-300",
    subLevels: [
      {
        name: "অংশ ১: সৌরজগৎ ও চমৎকার দৃশ্য",
        color: "bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-300",
        words: [
          { word: "মৌমাছির", meaning: "মৌমাছিদের (Of bees)" },
          { word: "মৌচাষি", meaning: "মধু চাষি (Apiculturist)" },
          { word: "কৌতূহল", meaning: "জানার তীব্র ইচ্ছে (Curiosity)" },
          { word: "কৌশলী", meaning: "যিনি বুদ্ধিমান (Tactful)" },
          { word: "সৌরজগৎ", meaning: "আমাদের সূর্যের পরিবার (Solar system)" },
          { word: "সৌন্দর্য", meaning: "চমৎকার রূপ (Beauty)" },
          { word: "গৌরবান্বিত", meaning: "সম্মানিত (Glorified)" },
          { word: "দৌড়ঝাঁপ", meaning: "ছুটাছুটি (Running and jumping)" },
          { word: "মৌসুমী", meaning: "ঋতু ভিত্তিক বা মিষ্টি নাম (Seasonal)" },
          { word: "কৌতুকপূর্ণ", meaning: "হাস্যরসাত্মক (Humorous)" }
        ]
      }
    ]
  },
  {
    level: 34,
    title: "লেভেল ৩৪",
    description: "ফলা চিহ্নযুক্ত চমৎকার শব্দমালা (য, র, ল, ব, ম-ফলা)",
    theme: "from-amber-500 to-emerald-500",
    subLevels: [
      {
        name: "ধাপ ১: য-ফলা (্য)",
        color: "bg-amber-500/10 border-amber-500/30 text-amber-300",
        words: [
          { word: "ব্যয়", meaning: "খরচ করা (Expense)" },
          { word: "ব্যথা", meaning: "কষ্ট (Pain)" },
          { word: "ব্যাঙ", meaning: "লাফানো জলচর প্রাণী (Frog)" },
          { word: "ব্যাগ", meaning: "ঝুড়ি বা থলে (Bag)" },
          { word: "ধ্যান", meaning: "একাগ্র চিন্তা (Meditation)" },
          { word: "বিদ্যালয়", meaning: "স্কুল (School)" },
          { word: "ব্যস্ততা", meaning: "কাজের চাপ (Busyness)" },
          { word: "ব্যায়াম", meaning: "শরীরচর্চা (Exercise)" },
          { word: "ব্যবহার", meaning: "আচরণ (Behavior)" },
          { word: "ব্যঞ্জন", meaning: "ব্যঞ্জনবর্ণ বা তরকারি (Consonant/Curry)" },
          { word: "ব্যালেন্স", meaning: "ভারসাম্য (Balance)" },
          { word: "ব্যায়ামঘর", meaning: "জিমখানা (Gym)" },
          { word: "ব্যবহারিক", meaning: "হাতে কলমে শেখা (Practical)" },
          { word: "ব্যতিক্রম", meaning: "ভিন্ন নিয়ম (Exception)" },
          { word: "ব্যাঙাচি", meaning: "ব্যাঙের বাচ্চা (Tadpole)" }
        ]
      },
      {
        name: "ধাপ ২: র-ফলা (্র)",
        color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
        words: [
          { word: "ক্রম", meaning: "ধারাবাহিক ধাপ (Order/Sequence)" },
          { word: "গ্রাম", meaning: "পল্লী এলাকা (Village)" },
          { word: "ব্রত", meaning: "সাধনা বা নিয়ম (Vow)" },
          { word: "ত্রয়", meaning: "তিনটি (Trio)" },
          { word: "প্রভা", meaning: "ভোরের আলো (Glow/Light)" },
          { word: "প্রকৃতি", meaning: "চারপাশের নৈসর্গিক রূপ (Nature)" },
          { word: "প্রজাপতি", meaning: "রঙিন ডানাওয়ালা পতঙ্গ (Butterfly)" },
          { word: "গ্রন্থ", meaning: "বই (Book)" },
          { word: "শ্রমিক", meaning: "যিনি খাটেন বা কাজ করেন (Worker)" },
          { word: "ক্রিয়া", meaning: "কাজ (Verb/Action)" },
          { word: "প্রাথমিক", meaning: "শুরুর বা প্রাইমারি (Primary)" },
          { word: "গ্রামবাংলা", meaning: "সোনার বাংলার রূপ (Rural Bengal)" },
          { word: "প্রকৌশল", meaning: "ইঞ্জিনিয়ারিং (Engineering)" },
          { word: "শ্রমজীবী", meaning: "যিনি পরিশ্রম করে বাঁচেন (Working class)" },
          { word: "ক্রিয়াকলাপ", meaning: "কর্মকাণ্ড (Activities)" }
        ]
      },
      {
        name: "ধাপ ৩: ল-ফলা (্ল)",
        color: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
        words: [
          { word: "ক্লাব", meaning: "সমিতি বা দল (Club)" },
          { word: "ক্লান্ত", meaning: "পরিশ্রান্ত (Tired)" },
          { word: "প্লাব", meaning: "ভাসানো (Inundate)" },
          { word: "ব্লক", meaning: "পাকা চারকোনা টুকরো (Block)" },
          { word: "গ্লাস", meaning: "জল খাওয়ার কাঁচের পাত্র (Glass)" },
          { word: "গ্লানি", meaning: "মনের দুঃখ বা ময়লা (Regret/Stain)" },
          { word: "প্লাবন", meaning: "বন্যা (Flood)" },
          { word: "ক্লাসরুম", meaning: "শ্রেণীকক্ষ (Classroom)" },
          { word: "ব্লাউজ", meaning: "নারীদের পোশাক বিশেষ (Blouse)" },
          { word: "ক্লোরিন", meaning: "রাসায়নিক মৌল (Chlorine)" },
          { word: "গ্লোবাল", meaning: "বিশ্বব্যাপী (Global)" },
          { word: "ক্লাসঘর", meaning: "পড়ার ঘর (Classroom)" },
          { word: "প্লাস্টিক", meaning: "সহজ খেলনার প্লাস্টিক (Plastic)" },
          { word: "ব্ল্যাকবোর্ড", meaning: "কালো লেখার বোর্ড (Blackboard)" },
          { word: "ক্লাবঘর", meaning: "ক্লাবের কুঠির (Clubhouse)" }
        ]
      },
      {
        name: "ধাপ ৪: ব-ফলা (্ব)",
        color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
        words: [
          { word: "স্বর", meaning: "কণ্ঠের আওয়াজ (Voice)" },
          { word: "স্বপ্ন", meaning: "ঘুমে যা দেখি (Dream)" },
          { word: "দ্বীপ", meaning: "জলে ঘেরা ডাঙা (Island)" },
          { word: "জ্বাল", meaning: "আগুন দেওয়া (Ignite)" },
          { word: "ত্বক", meaning: "আমাদের চামড়া (Skin)" },
          { word: "স্বদেশ", meaning: "আপন মাতৃভূমি (Motherland)" },
          { word: "স্বভাব", meaning: "চরিত্র (Nature/Behavior)" },
          { word: "দ্বীপপুঞ্জ", meaning: "অনেকগুলি দ্বীপের দল (Archipelago)" },
          { word: "জ্বালানি", meaning: "আগুনের কাঠ-কয়লা (Fuel)" },
          { word: "ত্বরণ", meaning: "দ্রুতি বৃদ্ধি (Acceleration)" },
          { word: "স্বাধীনতা", meaning: "মুক্ত বা স্বাধীন দশা (Freedom)" },
          { word: "স্বপ্নভঙ্গ", meaning: "স্বপ্ন টুটে যাওয়া (Broken dream)" },
          { word: "জ্বালামুখ", meaning: "আগ্নেয়গিরির মুখ (Crater)" },
          { word: "স্বরবর্ণ", meaning: "অ-ঔ বর্ণসমূহ (Vowels)" },
          { word: "দ্বিমাত্রিক", meaning: "২ মাত্রার ছবি (2D)" }
        ]
      },
      {
        name: "ধাপ ৫: ম-ফলা (্ম)",
        color: "bg-purple-500/10 border-purple-500/30 text-purple-300",
        words: [
          { word: "পদ্ম", meaning: "পদ্মফুল (Lotus)" },
          { word: "লক্ষ্মী", meaning: "শান্ত ও মিষ্টি মেয়ে (Good/Fortunate)" },
          { word: "যুগ্ম", meaning: "জোড়া (Pair)" },
          { word: "আত্মা", meaning: "প্রাণ বা হৃদয় (Soul)" },
          { word: "গ্রীষ্ম", meaning: "গরম কাল (Summer)" },
          { word: "পদ্মফুল", meaning: "সুন্দর পদ্ম ফুল (Lotus flower)" },
          { word: "আত্মীয়", meaning: "কুটুম্ব বা আপনজন (Relative)" },
          { word: "লক্ষ্মীপূজা", meaning: "এক ধরণের ধর্মীয় উৎসব (Festival)" },
          { word: "যুগ্মধ্বনি", meaning: "জোড়া আওয়াজ (Combined sound)" },
          { word: "উষ্মতা", meaning: "উষ্ণ ভাব (Warmth)" },
          { word: "পদ্মপাতা", meaning: "পদ্মের চমৎকার গোল পাতা (Lotus leaf)" },
          { word: "আত্মবিশ্বাস", meaning: "নিজের ওপর ভরসা (Self-confidence)" },
          { word: "লক্ষ্মীছাড়া", meaning: "এলোমেলো স্বভাব (Wretched)" },
          { word: "যুগ্মব্যঞ্জন", meaning: "যুক্তবর্ণ (Double consonant)" },
          { word: "উষ্ণমণ্ডল", meaning: "গরম আবহাওয়া এলাকা (Torrid zone)" }
        ]
      }
    ]
  },
  {
    level: 35,
    title: "লেভেল ৩৫",
    description: "যুক্তবর্ণের মহাসমুদ্র! ২০টি আকর্ষণীয় যুক্তবর্ণের ধাপ",
    theme: "from-violet-600 to-pink-500",
    subLevels: [
      {
        name: "ধাপ ১: ঙ্ক (ঙ + ক)",
        color: "bg-teal-500/10 border-teal-500/30 text-teal-300",
        words: [
          { word: "অঙ্ক", meaning: "গণিত বা হিসাব (Math)" },
          { word: "অঙ্কন", meaning: "ছবি আঁকা (Drawing)" },
          { word: "অঙ্কুর", meaning: "বীজ থেকে চারা গাছ গজানো (Sprout)" },
          { word: "শঙ্খ", meaning: "সাদা সুন্দর শাঁখ (Conch shell)" },
          { word: "কঙ্কাল", meaning: "শরীরের হাড়ের খাঁচা (Skeleton)" }
        ]
      },
      {
        name: "ধাপ ২: ঙ্গ (ঙ + গ)",
        color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
        words: [
          { word: "বাংলা", meaning: "আমাদের সোনার ভাষা (Bengali)" },
          { word: "সঙ্গ", meaning: "সাথে থাকা (Company)" },
          { word: "সঙ্গী", meaning: "বন্ধু বা সাথী (Companion)" },
          { word: "মঙ্গল", meaning: "ভাল হওয়া বা ভালো দশা (Welfare)" },
          { word: "গঙ্গা", meaning: "পবিত্র নদীর নাম (Ganges)" }
        ]
      },
      {
        name: "ধাপ ৩: ঞ্চ (ঞ + চ)",
        color: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
        words: [
          { word: "পঞ্চ", meaning: "পাঁচ (Five)" },
          { word: "পঞ্চম", meaning: "পাঁচ নম্বর স্থান (Fifth)" },
          { word: "চঞ্চল", meaning: "অস্থির বা দুরন্ত (Restless)" },
          { word: "অঞ্চল", meaning: "এলাকা বা শাড়ির পাড় (Region)" },
          { word: "বঞ্চনা", meaning: "প্রতারণা করা (Deprivation)" }
        ]
      },
      {
        name: "ধাপ ৪: ঞ্জ (ঞ + জ)",
        color: "bg-blue-500/10 border-blue-500/30 text-blue-300",
        words: [
          { word: "অঞ্জলি", meaning: "হাতে নিবেদিত ফুল বা শ্রদ্ধা (Offering)" },
          { word: "রঞ্জন", meaning: "রঙিন করা (Coloring)" },
          { word: "গঞ্জ", meaning: "বাজার বা বাণিজ্যিক এলাকা (Market town)" },
          { word: "সঞ্জয়", meaning: "সুন্দর একটি নাম (Sanjay)" },
          { word: "নিরঞ্জন", meaning: "নির্মল বা সুন্দর (Pure)" }
        ]
      },
      {
        name: "ধাপ ৫: ন্দ (ন + দ)",
        color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
        words: [
          { word: "आनন্দ", meaning: "খুশি (Joy/Happiness)" },
          { word: "সুন্দর", meaning: "চমৎকার দৃশ্য (Beautiful)" },
          { word: "চন্দন", meaning: "সুগন্ধি চন্দন কাঠ (Sandalwood)" },
          { word: "কেন্দ্র", meaning: "মাঝের বিন্দু (Center)" },
          { word: "বন্ধ", meaning: "বন্ধ করা (Closed)" }
        ]
      },
      {
        name: "ধাপ ৬: ন্ধ (ন + ধ)",
        color: "bg-purple-500/10 border-purple-500/30 text-purple-300",
        words: [
          { word: "বন্ধু", meaning: "সাথী বা দোস্ত (Friend)" },
          { word: "বন্ধন", meaning: "বাঁধুনী বা গিঁট (Bond)" },
          { word: "সন্ধ্যা", meaning: "বিকালে সূর্য ডোবার পর (Evening)" },
          { word: "সন্ধান", meaning: "খোঁজ করা (Search)" },
          { word: "গন্ধ", meaning: "সুবাস (Smell/Aroma)" }
        ]
      },
      {
        name: "ধাপ ৭: ত্র (ত + র-ফলা)",
        color: "bg-pink-500/10 border-pink-500/30 text-pink-300",
        words: [
          { word: "ত্রাণ", meaning: "সাহায্য বিতরণ (Relief)" },
          { word: "ত্রিভুজ", meaning: "৩ কোণ বিশিষ্ট চিত্র (Triangle)" },
          { word: "ত্রিশ", meaning: "সংখ্যা ৩০ (Thirty)" },
          { word: "মিত্র", meaning: "বন্ধু (Friend)" },
          { word: "চিত্র", meaning: "ছবি বা আঁকা দৃশ্য (Picture)" }
        ]
      },
      {
        name: "ধাপ ৮: ক্ত (ক + ত)",
        color: "bg-rose-500/10 border-rose-500/30 text-rose-300",
        words: [
          { word: "শক্তি", meaning: "বল বা ক্ষমতা (Power)" },
          { word: "ভক্ত", meaning: "অনুগামী লোক (Devotee)" },
          { word: "রক্ত", meaning: "লাল রক্ত (Blood)" },
          { word: "যুক্ত", meaning: "একত্রে জড়ানো (Connected)" },
          { word: "ব্যক্তি", meaning: "মানুষ (Person)" }
        ]
      },
      {
        name: "ধাপ ৯: স্ত (স + ত)",
        color: "bg-amber-500/10 border-amber-500/30 text-amber-300",
        words: [
          { word: "রাস্তা", meaning: "পথ (Road)" },
          { word: "সস্তা", meaning: "কম দামী (Cheap)" },
          { word: "ব্যবস্থা", meaning: "আয়োজন (Arrangement)" },
          { word: "উপস্থিত", meaning: "হাজির থাকা (Present)" },
          { word: "প্রতিষ্ঠান", meaning: "অফিস বা স্কুল (Institution)" }
        ]
      },
      {
        name: "ধাপ ১০: স্থ (স + থ)",
        color: "bg-orange-500/10 border-orange-500/30 text-orange-300",
        words: [
          { word: "স্থান", meaning: "জায়গা (Place)" },
          { word: "স্থল", meaning: "ডাঙ্গা বা মাটি (Land)" },
          { word: "স্থির", meaning: "চুপচাপ শান্ত থাকা (Calm/Steady)" },
          { word: "স্বাস্থ্য", meaning: "সুস্থ শরীর (Health)" }
        ]
      },
      {
        name: "ধাপ ১১: স্ক (স + ক)",
        color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
        words: [
          { word: "স্কুল", meaning: "বিদ্যালয় (School)" },
          { word: "স্কেল", meaning: "মাপার কাঠি (Ruler)" },
          { word: "স্কাউট", meaning: "দল বিশেষ (Scouts)" },
          { word: "স্ক্রিন", meaning: "পর্দা বা ডিসপ্লে (Screen)" },
          { word: "স্কেচ", meaning: "খসড়া ছবি আঁকা (Sketch)" }
        ]
      },
      {
        name: "ধাপ ১২: স্প (স + প)",
        color: "bg-lime-500/10 border-lime-500/30 text-lime-300",
        words: [
          { word: "স্পর্শ", meaning: "ছুঁয়ে ফেলা (Touch)" },
          { word: "স্পষ্ট", meaning: "পরিষ্কার (Clear)" },
          { word: "স্পঞ্জ", meaning: "নরম প্লাস্টিক বা রসগোল্লা (Sponge)" },
          { word: "স্পর্ধা", meaning: "সাহস বা দম্ভ (Audacity)" },
          { word: "হাসপাতাল", meaning: "যেখানে চিকিৎসা হয় (Hospital)" }
        ]
      },
      {
        name: "ধাপ ১৩: স্ম (স + ম)",
        color: "bg-green-500/10 border-green-500/30 text-green-300",
        words: [
          { word: "স্মৃতি", meaning: "মনে রাখা বা সুখের স্মৃতি (Memory)" },
          { word: "স্মরণ", meaning: "মনে করা (Remember)" },
          { word: "স্মারক", meaning: "স্মৃতিচিহ্ন (Memento)" },
          { word: "স্মিত", meaning: "মিষ্টি হাসি (Smile)" },
          { word: "স্মরণীয়", meaning: "মনে রাখার মতো (Memorable)" }
        ]
      },
      {
        name: "ধাপ ১৪: স্ন (স + ন)",
        color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
        words: [
          { word: "স্নান", meaning: "গোসল করা (Bath)" },
          { word: "স্নেহ", meaning: "ভালোবাসা বা মায়া (Affection)" },
          { word: "স্নিগ্ধ", meaning: "কোমল ও ঠান্ডা (Gentle/Serene)" },
          { word: "স্নায়ু", meaning: "রগ বা নার্ভ (Nerve)" },
          { word: "স্নাতক", meaning: "গ্র্যাজুয়েট (Graduate)" }
        ]
      },
      {
        name: "ধাপ ১৫: স্ব (স + ব)",
        color: "bg-teal-500/10 border-teal-500/30 text-teal-300",
        words: [
          { word: "স্বর", meaning: "কণ্ঠস্বর (Voice)" },
          { word: "স্বপ্ন", meaning: "ঘুমে দেখা রূপালী স্বপ্ন (Dream)" },
          { word: "স্বাধীন", meaning: "মুক্ত বা স্বাধীন (Free)" },
          { word: "স্বভাব", meaning: "আচরণ (Nature)" },
          { word: "স্বাস্থ্য", meaning: "সুস্থ দেহতন্ত্র (Health)" }
        ]
      },
      {
        name: "ধাপ ১৬: জ্ঞ (জ + ঞ)",
        color: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
        words: [
          { word: "জ্ঞান", meaning: "বিদ্যা ও শিক্ষা (Knowledge)" },
          { word: "বিজ্ঞান", meaning: "গবেষণা ও আবিষ্কার (Science)" },
          { word: "বিজ্ঞ", meaning: "পণ্ডিত বা জ্ঞানী (Wise)" },
          { word: "প্রজ্ঞা", meaning: "উচ্চ বুদ্ধি (Wisdom)" },
          { word: "অজ্ঞ", meaning: "মূর্খ বা কিছু জানে না যে (Ignorant)" }
        ]
      },
      {
        name: "ধাপ ১৭: ক্ষ (ক + ষ)",
        color: "bg-blue-500/10 border-blue-500/30 text-blue-300",
        words: [
          { word: "ক্ষতি", meaning: "লোকসান (Loss)" },
          { word: "ক্ষমা", meaning: "ক্ষমা করে দেওয়া (Forgiveness)" },
          { word: "ক্ষেত", meaning: "ধান বা সবজি চাষের জমি (Field)" },
          { word: "শিক্ষক", meaning: "যিনি জ্ঞান দান করেন (Teacher)" },
          { word: "লক্ষ্য", meaning: "উদ্দেশ্য (Goal)" }
        ]
      },
      {
        name: "ধাপ ১৮: চ্ছ (চ + ছ)",
        color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
        words: [
          { word: "ইচ্ছা", meaning: "মনের বাসনা (Wish)" },
          { word: "পরিচ্ছন্ন", meaning: "সাফ-সুথরা (Clean)" },
          { word: "বিচ্ছিন্ন", meaning: "আলাদা হওয়া (Separated)" },
          { word: "গুচ্ছ", meaning: "দল বা তোড়া (Bunch)" },
          { word: "আচ্ছাদন", meaning: "ছাদ বা ঢাকনা (Covering)" }
        ]
      },
      {
        name: "ধাপ ১৯: জ্জ (জ + জ)",
        color: "bg-purple-500/10 border-purple-500/30 text-purple-300",
        words: [
          { word: "উজ্জ্বল", meaning: "চকচকে বা আলোকিত (Bright)" },
          { word: "সজ্জা", meaning: "সাজানো (Decoration)" },
          { word: "লজ্জা", meaning: "লাজুক ভাব (Shame/Modesty)" },
          { word: "সজ্জিত", meaning: "সাজানো হয়েছে যা (Decorated)" },
          { word: "উজ্জীবন", meaning: "নতুন প্রাণ দেওয়া (Revival)" }
        ]
      },
      {
        name: "ধাপ ২০: দ্ম (দ + ম)",
        color: "bg-pink-500/10 border-pink-500/30 text-pink-300",
        words: [
          { word: "পদ্ম", meaning: "মিষ্টি পদ্মফুল (Lotus)" },
          { word: "পদ্মফুল", meaning: "বাগানের সুস্বাদু সুবাসিত পদ্ম ফুল (Lotus flower)" },
          { word: "পদ্মপাতা", meaning: "পদ্মের চমৎকার গোল পাতা (Lotus leaf)" },
          { word: "পদ্মবন", meaning: "পদ্মফুলের দিঘি (Lotus forest)" },
          { word: "পদ্মবীজ", meaning: "পদ্মের বীজ (Lotus seed)" }
        ]
      }
    ]
  }
];
