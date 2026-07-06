export interface JointLetterRow {
  letter: string;
  breakdown: string;
  words: string[];
}

export interface JointPageData {
  title: string;
  leftTable: JointLetterRow[];
  rightTable: JointLetterRow[];
}

export const JOINT_LETTERS_PAGES: JointPageData[] = [
  {
    title: "যুক্তবর্ণ বা যুক্তাক্ষর (প্রথম খণ্ড)",
    leftTable: [
      { letter: "ক্ক", breakdown: "ক্ + ক", words: ["অক্কা", "মক্কা", "পক্ক"] },
      { letter: "চ্চ", breakdown: "ચ્ + চ", words: ["উচ্চ", "বাচ্চা", "উচ্চতা"] },
      { letter: "জ্জ", breakdown: "জ্ + জ", words: ["সজ্জা", "বিপদজ্জনক"] },
      { letter: "ট্ট", breakdown: "ট্ + ট", words: ["ভুট্টা", "চট্টগ্রাম", "ছোট্ট"] },
      { letter: "ড্ড", breakdown: "ড্ + ড", words: ["আড্ডা", "বাড্ডা"] },
      { letter: "ণ্ণ", breakdown: "ণ্ + ণ", words: ["বিষণ্ণ", "বিষণ্ণতা"] },
      { letter: "ত্ত", breakdown: "ত্ + ত", words: ["উত্তর", "উত্তাল", "উত্তম"] },
      { letter: "দ্দ", breakdown: "দ্ + দ", words: ["চৌদ্দ", "খদ্দর"] },
      { letter: "ন্ন", breakdown: "ন্ + ন", words: ["কান্না", "রান্না", "পান্না"] },
      { letter: "প্প", breakdown: "প্ + প", words: ["ধাপ্পা", "থাপ্পড়", "চপ্পল"] },
      { letter: "ব্ব", breakdown: "ব্ + ব", words: ["আব্বা", "ডাব্বা", "নব্বই"] },
      { letter: "ম্ম", breakdown: "ম্ + ম", words: ["আম্মা", "সম্মান", "সম্মত"] },
      { letter: "ল্ল", breakdown: "ল্ + ল", words: ["কেল্লা", "আল্লাহ", "মহল্লা"] },
      { letter: "ঙ্ক", breakdown: "ঙ্ + ক", words: ["অঙ্ক", "কলঙ্ক", "পালঙ্ক"] },
      { letter: "ঙ্গ", breakdown: "ঙ্ + গ", words: ["অঙ্গ", "সঙ্গ", "গঙ্গা", "তরঙ্গ"] },
      { letter: "ঙ্ঘ", breakdown: "ঙ্ + ঘ", words: ["সঙ্ঘ", "লঙ্ঘন", "দুর্লঙ্ঘ্য"] },
      { letter: "স্ক", breakdown: "স্ + ক", words: ["স্কুল", "তুরুস্ক", "ভাস্কর"] },
      { letter: "স্ট", breakdown: "স্ + ট", words: ["স্টেশন", "আগস্ট", "বেস্ট"] },
      { letter: "স্ত", breakdown: "স্ + ত", words: ["সস্তা", "ব্যস্ত", "রাস্তা"] },
      { letter: "স্থ", breakdown: "স্ + থ", words: ["স্থান", "মুখস্থ", "অবস্থা"] },
      { letter: "স্প", breakdown: "স্ + প", words: ["স্পষ্ট", "স্পন্দন", "স্পিড"] },
      { letter: "স্ম", breakdown: "স্ + ম", words: ["স্মৃতি", "স্মরণ", "বিস্ময়"] },
      { letter: "ত্থ", breakdown: "ত্ + থ", words: ["উত্থান", "উত্থিত", "অশ্বত্থ"] }
    ],
    rightTable: [
      { letter: "ষ্ক", breakdown: "ষ্ + ক", words: ["আবিষ্কার", "পরিষ্কার"] },
      { letter: "ষ্ট", breakdown: "ষ্ + ট", words: ["কষ্ট", "অষ্টম", "সৃষ্টি"] },
      { letter: "ষ্ঠ", breakdown: "ষ্ + ঠ", words: ["পৃষ্ঠা", "জ্যৈষ্ঠ", "নিষ্ঠা"] },
      { letter: "ষ্প", breakdown: "ষ্ + প", words: ["পুষ্প", "নিষ্পাপ"] },
      { letter: "ষ্ম", breakdown: "ষ্ + ম", words: ["গ্রীষ্ম", "উষ্মা", "ভস্ম"] },
      { letter: "ক্ট", breakdown: "ক্ + ট", words: ["ডক্টর", "অক্টোবর"] },
      { letter: "ক্স", breakdown: "ক্ + স", words: ["রিক্সা", "বাক্স", "ট্যাক্স"] },
      { letter: "ত্ম", breakdown: "ত্ + ম", words: ["আত্মা", "আত্মীয়"] },
      { letter: "ন্ম", breakdown: "ন্ + ম", words: ["জন্ম", "চিন্ময়"] },
      { letter: "দ্ম", breakdown: "দ্ + ম", words: ["ছদ্ম", "পদ্ম", "পদ্মিনী"] },
      { letter: "হ্ম", breakdown: "হ্ + ম", words: ["ব্রাহ্মণ", "ব্রহ্মপুত্র"] },
      { letter: "ক্ষ", breakdown: "ক্ + ষ্", words: ["লক্ষ", "পক্ষ", "শিক্ষা"] },
      { letter: "ক্ষ্ম", breakdown: "ক্ + ষ্ + ম", words: ["সূক্ষ্ম", "যক্ষ্মা", "লক্ষ্মী"] },
      { letter: "ক্র", breakdown: "ক্ + র", words: ["চক্র", "বক্র", "বিক্রয়"] },
      { letter: "গ্র", breakdown: "গ্ + র", words: ["গ্রাম", "অগ্রিম", "গ্রহ"] },
      { letter: "ট্র", breakdown: "ট্ + র", words: ["ট্রেন", "ট্রাক", "ট্রাক্টর"] },
      { letter: "দ্র", breakdown: "দ্ + র", words: ["নিদ্রা", "ভদ্র", "দ্রব্য"] },
      { letter: "ভ্র", breakdown: "ভ্ + র", words: ["অভ্র", "শুভ্র", "ভ্রমণ"] },
      { letter: "ত্র", breakdown: "ত্ + র", words: ["মিত্র", "পাত্র", "ত্রাণ"] },
      { letter: "ত্রু", breakdown: "ত্ + র + উ", words: ["শত্রু", "ত্রুটি"] },
      { letter: "ন্ত্র", breakdown: "ন্ + ত্ + র", words: ["যন্ত্র", "যন্ত্রণা", "মন্ত্র"] },
      { letter: "স্ত্র", breakdown: "স্ + ত্ + র", words: ["অস্ত্র", "স্ত্রী", "নিরস্ত্র"] },
      { letter: "হৃ", breakdown: "হ্ + ঋ", words: ["হৃদয়", "হৃদযন্ত্র"] }
    ]
  },
  {
    title: "যুক্তবর্ণ বা যুক্তাক্ষর (দ্বিতীয় খণ্ড)",
    leftTable: [
      { letter: "ক্য", breakdown: "ক্ + য", words: ["বাক্য", "মাণিক্য"] },
      { letter: "খ্য", breakdown: "খ্ + য", words: ["মুখ্য", "খ্যাতি"] },
      { letter: "গ্য", breakdown: "ഗ് + য", words: ["যোগ্য", "আরোগ্য"] },
      { letter: "র্ক", breakdown: "র্ + ক", words: ["বিতর্ক", "কর্কশ"] },
      { letter: "র্খ", breakdown: "র্ + খ", words: ["মূর্খ", "মূর্খতা"] },
      { letter: "র্গ", breakdown: "র্ + গ", words: ["বিসর্গ", "দুর্গম"] },
      { letter: "ক্ত", breakdown: "ক্ + ত", words: ["শক্ত", "রক্ত", "মুক্তি"] },
      { letter: "প্ত", breakdown: "প্ + ত", words: ["রপ্ত", "সপ্ত", "প্রাপ্ত"] },
      { letter: "চ্ছ", breakdown: "ক্ + ছ", words: ["ইচ্ছা", "বিсмотря", "বিচ্ছিন্ন"] },
      { letter: "চ্ছ্ব", breakdown: "চ্ + ছ + ব", words: ["উচ্ছ্বাস", "জলোচ্ছ্বাস"] },
      { letter: "জ্জ্ব", breakdown: "জ্ + জ + ব", words: ["উজ্জ্বল", "উজ্জ্বলতা"] },
      { letter: "জ্ঝ", breakdown: "জ্ + ঝ", words: ["কুজ্ঝটিকা"] },
      { letter: "ঞ্চ", breakdown: "ঞ + চ", words: ["পঞ্চম", "সঞ্চয়"] },
      { letter: "ঞ্ছ", breakdown: "ঞ + ছ", words: ["লাঞ্ছনা", "বাঞ্ছিত"] },
      { letter: "ঞ্জ", breakdown: "ঞ + জ", words: ["গঞ্জ", "কুঞ্জ", "রঞ্জন"] },
      { letter: "ঞ্ঝ", breakdown: "ঞ + ঝ", words: ["ঝঞ্ঝা", "ঝঞ্ঝাট"] },
      { letter: "জ্ঞ", breakdown: "জ্ + ঞ", words: ["জ্ঞান", "অজ্ঞ", "বিজ্ঞান"] },
      { letter: "শ্চ", breakdown: "শ্ + চ", words: ["নিশ্চয়", "পশ্চাৎ", "দুশ্চিন্তা"] },
      { letter: "শ্ছ", breakdown: "শ্ + ছ", words: ["শিরশ্ছেদ"] },
      { letter: "ন্দ", breakdown: "ন্ + দ", words: ["आनন্দ", "সুন্দর"] },
      { letter: "ন্ধ", breakdown: "ন্ + ধ", words: ["বন্ধ", "বন্ধু", "সন্ধ্যা"] },
      { letter: "ন্ট", breakdown: "ন্ + ট", words: ["প্যান্ট", "ক্যান্টিন"] },
      { letter: "ন্ত", breakdown: "ন্ + ত", words: ["অন্তর", "বসন্ত", "শান্ত"] },
      { letter: "ন্থ", breakdown: "ন্ + থ", words: ["গ্রন্থ", "পান্থপথ"] },
      { letter: "ন্ড", breakdown: "ন্ + ড", words: ["পাউন্ড", "সাউন্ড"] },
      { letter: "ণ্ট", breakdown: "ণ্ + ট", words: ["ঘণ্টা", "বণ্টন", "কণ্টক"] },
      { letter: "ণ্ঠ", breakdown: "ণ্ + ঠ", words: ["কণ্ঠ", "লুণ্ঠন", "আকণ্ঠ"] },
      { letter: "ণ্ড", breakdown: "ণ্ + ড", words: ["কাণ্ড", "গণ্ডার", "পণ্ডিত"] },
      { letter: "ন্দ্ব", breakdown: "ন্ + দ + ব", words: ["দ্বন্দ্ব", "সন্দীপ"] },
      { letter: "গ্ন", breakdown: "ഗ് + ন", words: ["ভগ্ন", "মগ্ন", "অগ্নি"] }
    ],
    rightTable: [
      { letter: "ঘ্ন", breakdown: "ঘ্ + ন", words: ["বিঘ্ন", "কৃতঘ্ন"] },
      { letter: "ত্ন", breakdown: "ত্ + ন", words: ["যত্ন", "রত্ন", "পত্নী"] },
      { letter: "স্ন", breakdown: "স্ + ন", words: ["স্নান", "স্নায়ু", "স্নাতক"] },
      { letter: "ম্ন", breakdown: "ম্ + ন", words: ["निम्न", "নিম্নচাপ"] },
      { letter: "হ্ন", breakdown: "হ্ + ন", words: ["চিহ্ন", "বহ্নি", "মধ্যাহ্ন"] },
      { letter: "হ্ণ", breakdown: "হ্ + ণ", words: ["পূর্বাহ্ণ", "অপরাহ্ণ"] },
      { letter: "ষ্ণ", breakdown: "ষ্ + ণ", words: ["উষ্ণ", "কৃষ্ণ", "তৃষ্ণা"] },
      { letter: "ব্দ", breakdown: "ব্ + দ", words: ["শব্দ", "জব্দ", "অব্দ"] },
      { letter: "দ্ব", breakdown: "দ্ + ব", words: ["দ্বিতীয়", "বিদ্বান", "দ্বার"] },
      { letter: "ব্ধ", breakdown: "ব্ + ধ", words: ["লব্ধ", "স্তব্ধ", "প্রলুব্ধ"] },
      { letter: "ধ্ব", breakdown: "ধ্ + ব", words: ["ধ্বনি", "ধ্বংস", "ধ্বস্ত"] },
      { letter: "দ্ধ", breakdown: "দ্ + ধ", words: ["যুদ্ধ", "শুদ্ধ", "বুদ্ধ"] },
      { letter: "গ্ধ", breakdown: "ഗ് + ধ", words: ["মুগ্ধ", "দুগ্ধ", "স্নিগ্ধ"] },
      { letter: "ন্ধ", breakdown: "ন্ + ধ", words: ["অন্ধ", "বন্ধ", "সন্ধ্যা"] },
      { letter: "ক্ব", breakdown: "ক্ + ব", words: ["পক্ব", "পক্বতা"] },
      { letter: "ত্ব", breakdown: "ত্ + ব", words: ["গুরুত্ব", "রাজত্ব"] },
      { letter: "ম্ব", breakdown: "ম্ + b", words: ["লম্ব", "চুম্বক", "গম্বুজ"] },
      { letter: "স্ব", breakdown: "স্ + ব", words: ["স্বচ্ছ", "স্বর্গ", "স্বর্ণ"] },
      { letter: "শ্ব", breakdown: "শ্ + ব", words: ["বিশ্ব", "অশ্ব", "আশ্বিন"] },
      { letter: "ত্ত্ব", breakdown: "ত্ + ত্ + ব", words: ["সত্ত্ব", "সত্ত্বহীন"] },
      { letter: "দ্ভ", breakdown: "দ্ + ভ", words: ["উদ্ভব", "উদ্ভাবন"] },
      { letter: "ম্ভ", breakdown: "ম্ + ভ", words: ["গম্ভীর", "সম্ভব"] },
      { letter: "ম্প", breakdown: "ম্ + প", words: ["সম্পর্ক", "কম্পিত"] },
      { letter: "ম্ফ", breakdown: "ম্ + ফ", words: ["লম্ফ", "ঝম্প", "গুস্ফিত"] },
      { letter: "ক্ল", breakdown: "ক্ + ল", words: ["ক্লাস", "ক্লান্তি", "ক্লিপ"] },
      { letter: "ল্ক", breakdown: "ল্ + ক", words: ["শুল্ক", "উল্কা", "সিল্ক"] },
      { letter: "ল্গ", breakdown: "ল্ + গ", words: ["বল্গা", "ফাল্গুন"] },
      { letter: "ল্ট", breakdown: "ল্ + ট", words: ["বেল্ট", "ভোল্ট", "মেল্ট"] },
      { letter: "ল্প", breakdown: "ল্ + প", words: ["অল্প", "গল্প", "সংকল্প"] }
    ]
  }
];
