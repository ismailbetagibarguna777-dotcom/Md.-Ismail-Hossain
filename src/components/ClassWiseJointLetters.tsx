import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Printer, 
  Volume2, 
  Search, 
  PenTool, 
  Trash2, 
  RefreshCw, 
  Trophy, 
  CheckCircle, 
  HelpCircle,
  FileDown,
  X,
  Play
} from 'lucide-react';

// Interfaces
interface JointLetter {
  id: string;
  combined: string;
  components: string;
  word: string;
  page?: string;
  notes?: string;
}

interface ClassData {
  grade: number;
  gradeLabel: string;
  gradeTitle: string;
  emoji: string;
  themeColor: string;
  bgGradient: string;
  textColor: string;
  borderCol: string;
  mascot: string;
  letters: JointLetter[];
}

const CLASS_JOINT_LETTERS_DATA: ClassData[] = [
  {
    grade: 1,
    gradeLabel: "১ম শ্রেণি",
    gradeTitle: "প্রথম শ্রেণির যুক্তবর্ণ তালিকা",
    emoji: "🐰",
    themeColor: "from-rose-500 to-red-600",
    bgGradient: "bg-gradient-to-br from-rose-950/20 via-red-950/10 to-transparent",
    textColor: "text-rose-400",
    borderCol: "border-rose-500/30",
    mascot: "মিষ্টি খরগোশ",
    letters: [
      { id: "1-1", combined: "প্ত", components: "প + ত", word: "সপ্তাহ", page: "৬৭" },
      { id: "1-2", combined: "ট্র", components: "ট + র", word: "ট্রেন", page: "৬৭" },
      { id: "1-3", combined: "ঙ্গ", components: "ঙ + গ", word: "মঙ্গলবার", page: "৬৭" },
      { id: "1-4", combined: "স্প", components: "স + প", word: "বৃহস্পতিবার", page: "৬৭" },
      { id: "1-5", combined: "ক্র", components: "ক + র", word: "শুক্রবার", page: "৬৭" },
      { id: "1-6", combined: "ন্দ", components: "ন + দ", word: "আনন্দ", page: "৭৪" },
      { id: "1-7", combined: "দ্দ", components: "দ + দ", word: "চৌদ্দ", page: "৭৮" },
      { id: "1-8", combined: "স্ত", components: "স + ত", word: "পাকিস্তানি", page: "৮০" },
      { id: "1-9", combined: "ক্ত", components: "ক + ত", word: "মুক্তি", page: "৮০" },
      { id: "1-10", combined: "দ্ধ", components: "দ + ধ", word: "যুদ্ধ", page: "৮০" },
      { id: "1-11", combined: "ম্ব", components: "ম + ব", word: "ডিসেম্বর", page: "৮০" },
      { id: "1-12", combined: "ষ্ট", components: "ষ + ট", word: "কষ্ট", page: "৮০" },
      // Other textbook occurrences
      { id: "1-13", combined: "প্র", components: "প + র", word: "প্রথম", page: "১, ১০", notes: "পাঠ্যবইয়ের শিরোনাম" },
      { id: "1-14", combined: "শ্র", components: "শ + র", word: "শ্রেণি", page: "১, ১০", notes: "পাঠ্যবইয়ের শিরোনাম" },
      { id: "1-15", combined: "দ্য", components: "দ + য (য-ফলা)", word: "বিদ্যালয়", page: "১০, ১২" },
      { id: "1-16", combined: "স্থ", components: "স + থ", word: "স্থাপিত", page: "২" },
      { id: "1-17", combined: "ন্ত্র", components: "ন + ত + র", word: "গণপ্রজাতন্ত্রী", page: "২" },
      { id: "1-18", combined: "ন্দ্র", components: "ন + দ + র", word: "কেন্দ্রবিন্দু", page: "২" },
      { id: "1-19", combined: "ঘ্র", components: "ঘ + র", word: "অঘ্রান", page: "৩" },
      { id: "1-20", combined: "স্ন", components: "স + ন", word: "স্নেহ", page: "৩" },
      { id: "1-21", combined: "ব্য", components: "ব + য (য-ফলা)", word: "ব্যাঙ", page: "৩১, ৩৪" },
      { id: "1-22", combined: "ত্র", components: "ত + র", word: "মিত্রা", page: "৩৬" },
      { id: "1-23", combined: "ত্স", components: "ত + স", word: "উৎসব", page: "৫২", notes: "খণ্ড-ত ও স এর সংযোগ" },
      { id: "1-24", combined: "স্ক", components: "স + ক", word: "স্কুল", page: "৬৪" },
      { id: "1-25", combined: "স্ব", components: "স + ব", word: "স্বাধীনতা", page: "৭৯, ৮০" }
    ]
  },
  {
    grade: 2,
    gradeLabel: "২য় শ্রেণি",
    gradeTitle: "দ্বিতীয় শ্রেণির যুক্তবর্ণ তালিকা",
    emoji: "🐻",
    themeColor: "from-amber-500 to-orange-600",
    bgGradient: "bg-gradient-to-br from-amber-950/20 via-orange-950/10 to-transparent",
    textColor: "text-amber-400",
    borderCol: "border-amber-500/30",
    mascot: "হাসিখুশি ভাল্লুক",
    letters: [
      { id: "2-1", combined: "ল্গ", components: "ল + গ", word: "ফাল্গুন", page: "২১", notes: "যুক্তবর্ণ শিখি পাঠ" },
      { id: "2-2", combined: "স্ক", components: "স + ক", word: "স্কুল", page: "২১" },
      { id: "2-3", combined: "ন্ধ", components: "ন + ধ", word: "বন্ধু", page: "২১" },
      { id: "2-4", combined: "ন্দ", components: "ন + দ", word: "পছন্দ", page: "২১" },
      { id: "2-5", combined: "ণ্ট", components: "ণ + ট", word: "ঘণ্টা", page: "২১" },
      { id: "2-6", combined: "স্ত", components: "স + ত", word: "রাস্তা", page: "২১" },
      { id: "2-7", combined: "ন্ন", components: "ন + ন", word: "রান্না", page: "২১" },
      { id: "2-8", combined: "ষ্ক", components: "ষ + ক", word: "পরিষ্কার", page: "২১" },
      // Fala Signs
      { id: "2-9", combined: "স্ব", components: "স + ব (ব-ফলা)", word: "স্বাধীন", page: "২৩-২৬" },
      { id: "2-10", combined: "দ্ব", components: "দ + ব (ব-ফলা)", word: "দ্বিতীয়", page: "২৩-২৬" },
      { id: "2-11", combined: "ত্ত্ব", components: "ত + ত + ব", word: "বন্ধুত্ব", page: "২৩-২৬" },
      { id: "2-12", combined: "স্ম", components: "স + ম (ম-ফলা)", word: "স্মরণ", page: "২৩-২৬" },
      { id: "2-13", combined: "দ্ম", components: "দ + ম (ম-ফলা)", word: "পদ্মা", page: "২৩-২৬" },
      { id: "2-14", combined: "ত্ম", components: "ত + ম (ম-ফলা)", word: "আত্মীয়", page: "২৩-২৬" },
      { id: "2-15", combined: "ব্য", components: "ব + য (য-ফলা)", word: "ব্যয়", page: "২৩-২৬" },
      { id: "2-16", combined: "ন্য", components: "ন + য (য-ফলা)", word: "ধন্যবাদ", page: "২৩-২৬" },
      { id: "2-17", combined: "ত্য", components: "ত + য (য-ফলা)", word: "সত্য", page: "২৩-২৬" },
      { id: "2-18", combined: "শ্র", components: "শ + র (র-ফলা)", word: "শ্রম", page: "২৩-২৬" },
      { id: "2-19", combined: "ম্র", components: "ম + র (র-ফলা)", word: "নম্র", page: "২৩-২৬" },
      { id: "2-20", combined: "দ্র", components: "দ + র (র-ফলা)", word: "ভদ্র", page: "২৩-২৬" },
      // Reph
      { id: "2-21", combined: "র্চ", components: "র + চ (রেফ)", word: "মার্চ", page: "২৭" },
      { id: "2-22", combined: "র্ণ", components: "র + ণ (রেফ)", word: "বর্ণ", page: "২৭" },
      { id: "2-23", combined: "র্য", components: "র + য (রেফ)", word: "সূর্য", page: "২৭" },
      // Others
      { id: "2-24", combined: "ষ্ট", components: "ষ + ট", word: "সৃষ্টি", page: "৭" },
      { id: "2-25", combined: "ক্ত", components: "ক + ত", word: "রক্তবর্ণ", page: "২" },
      { id: "2-26", combined: "ত্ত", components: "ত + ত", word: "বৃত্ত", page: "২" },
      { id: "2-27", combined: "ক্ষ", components: "ক + ষ", word: "পক্ষীরাজ", page: "১২" },
      { id: "2-28", combined: "ন্ত", components: "ন + ত", word: "ক্লান্ত", page: "১২" },
      { id: "2-29", combined: "ঙ্ক", components: "ঙ + ক", word: "পালঙ্ক", page: "১৪" },
      { id: "2-30", combined: "ম্প", components: "ম + প", word: "কম্পিউটার", page: "৩১" },
      { id: "2-31", combined: "ঞ্চ", components: "ঞ + চ", word: "সঞ্চয়", page: "৩৩" },
      { id: "2-32", combined: "ষ্ম", components: "ষ + ম", word: "গ্রীষ্ম", page: "৪৪" },
      { id: "2-33", combined: "ষ্ঠ", components: "ষ + ঠ", word: "জ্যৈষ্ঠ", page: "৪৪" },
      { id: "2-34", combined: "ন্ম", components: "ন + ম", word: "জন্ম", page: "৫৮" },
      { id: "2-35", combined: "ন্স", components: "ন + স", word: "ময়মনসিংহ", page: "৫৮" },
      { id: "2-36", combined: "র্ঘ", components: "র + ঘ (রেফ)", word: "দীর্ঘ", page: "৫৯" }
    ]
  },
  {
    grade: 3,
    gradeLabel: "৩য় শ্রেণি",
    gradeTitle: "তৃতীয় শ্রেণির যুক্তবর্ণ তালিকা",
    emoji: "🦊",
    themeColor: "from-emerald-500 to-green-600",
    bgGradient: "bg-gradient-to-br from-emerald-950/20 via-green-950/10 to-transparent",
    textColor: "text-emerald-400",
    borderCol: "border-emerald-500/30",
    mascot: "চালাক শিয়াল",
    letters: [
      { id: "3-1", combined: "জ্ঞ", components: "জ + ঞ", word: "জিজ্ঞাসা, বিজ্ঞান, জ্ঞান", page: "৩০, ৭৩" },
      { id: "3-2", combined: "ক্ষ", components: "ক + ষ", word: "ক্ষুধা, শিক্ষক, লক্ষ্য", page: "৩০, ৯১" },
      { id: "3-3", combined: "ঞ্চ", components: "ঞ + চ", word: "সঞ্চয়, অঞ্চল, চঞ্চল", page: "৩০, ৭৩" },
      { id: "3-4", combined: "ষ্ট", components: "ষ + ট", word: "কষ্ট, স্টেশন, আগস্ট", page: "৩০, ৬৬" },
      { id: "3-5", combined: "ল্ল", components: "ল + ল", word: "কেল্লা, পাল্লা", page: "৪৩" },
      { id: "3-6", combined: "ণ্ট", components: "ণ + ট", word: "ঘণ্টা", page: "৪৩" },
      { id: "3-7", combined: "ম্ব", components: "ম + ব", word: "গম্বুজ", page: "৪৩" },
      { id: "3-8", combined: "ন্দ", components: "ন + দ", word: "আনন্দ, সুন্দর, অন্ধকার", page: "৪৩, ৬৮" },
      { id: "3-9", combined: "ক্ল", components: "ক + ল", word: "ক্লাস", page: "৪৩" },
      { id: "3-10", combined: "ত্ব", components: "ত + ব", word: "দায়িত্ব, বীরত্ব", page: "৪৩, ৯৫" },
      { id: "3-11", combined: "দ্র", components: "দ + র", word: "মুদ্রা, দ্রুত, রুদ্র", page: "৪৩, ৪৬" },
      { id: "3-12", combined: "চ্ছ", components: "চ + ছ", word: "স্বচ্ছ, ইচ্ছা, কচ্ছপ", page: "৭৩, ৮৭" },
      { id: "3-13", combined: "ক্ষ্ম", components: "ক + ষ + ম", word: "সূক্ষ্ম, লক্ষ্মী", page: "৭৩" },
      { id: "3-14", combined: "ক্ষ্য", components: "ক + ষ + য", word: "শীতলক্ষ্যা, লক্ষ্য", page: "৭৩" },
      { id: "3-15", combined: "ন্ত", components: "ন + ত", word: "প্রান্তর, অন্তর, পাকিস্তান", page: "৭৬, ৬৬" },
      { id: "3-16", combined: "ক্ত", components: "ক + ত", word: "মুক্ত, রক্ত, অক্টোবর", page: "৭৬, ৭" },
      { id: "3-17", combined: "ক্ক", components: "ক + ক", word: "মক্কা", page: "৭৬" },
      { id: "3-18", combined: "স্ক", components: "স + ক", word: "স্কুল, বিস্কুট, তুরস্ক", page: "৮৪, ৪০" },
      { id: "3-19", combined: "ন্ম", components: "ন + ম", word: "জন্ম", page: "৮৪" },
      { id: "3-20", combined: "ম্প", components: "ম + প", word: "সম্পত্তি, কম্প", page: "৮৪" },
      { id: "3-21", combined: "ন্ধ", components: "ন + ধ", word: "সন্ধান, সন্ধ্যা, অন্ধকার", page: "৮৪, ৯১" },
      { id: "3-22", combined: "ত্ত", components: "ত + ত", word: "পত্তর, উত্তর", page: "৮৭" },
      { id: "3-23", combined: "স্ত", components: "স + ত", word: "কুস্তি, বস্তি, ওস্তাদ", page: "৯১, ৮৯" },
      { id: "3-24", combined: "ল্প", components: "ল + প", word: "গল্প, অল্প, পরিকল্পনা", page: "৯১, ৬৬" },
      { id: "3-25", combined: "স্য", components: "স + য", word: "সদস্য", page: "৯৬" },
      { id: "3-26", combined: "স্ম", components: "স + ম", word: "স্মৃতি, স্মরণ, ক্রিসমাস", page: "৯৫, ২৪" }
    ]
  },
  {
    grade: 4,
    gradeLabel: "৪র্থ শ্রেণি",
    gradeTitle: "চতুর্থ শ্রেণির যুক্তবর্ণ তালিকা",
    emoji: "🦉",
    themeColor: "from-cyan-500 to-teal-600",
    bgGradient: "bg-gradient-to-br from-cyan-950/20 via-teal-950/10 to-transparent",
    textColor: "text-cyan-400",
    borderCol: "border-cyan-500/30",
    mascot: "জ্ঞানী প্যাঁচা",
    letters: [
      { id: "4-1", combined: "প্র", components: "প + র (র-ফলা)", word: "প্রথম, প্রান্তর, প্রাণ, প্রদীপ, প্রাথমিক", page: "১০, ৭৫" },
      { id: "4-2", combined: "ধ্যা", components: "ধ + য + া", word: "অধ্যাপক", page: "৭" },
      { id: "4-3", combined: "ট্ট", components: "ট + ট", word: "অক্টোবর", page: "৭" },
      { id: "4-4", combined: "প্ত", components: "প + ত", word: "সেপ্টেম্বর, তপ্ত, উত্তপ্ত, ব্রহ্মপুত্র", page: "৭, ৭৫" },
      { id: "4-5", combined: "ত্থ", components: "ত + থ", word: "ভিত্তিভূমি", page: "৮" },
      { id: "4-6", combined: "ল্প", components: "ল + প", word: "পরিকল্পিত, অল্প, গল্প", page: "৮, ৬৬" },
      { id: "4-7", combined: "ষ্ণ", components: "ষ + ণ", word: "কৃষ্ণ, বৈশাখ", page: "২১" },
      { id: "4-8", combined: "ত্ম", components: "ত + ম", word: "আত্মীয়, আত্মত্যাগ", page: "২৪, ৯৬" },
      { id: "4-9", combined: "ব্য", components: "ব + য (য-ফলা)", word: "ব্যয়, ব্যবহার, ব্যবহৃত", page: "২৫, ২৭" },
      { id: "4-10", combined: "ধ্য", components: "ধ + য", word: "ধন্যবাদ, মাধ্যম, মধ্য", page: "২৫, ৮" },
      { id: "4-11", combined: "গ্র", components: "গ + র", word: "গ্রহ, গ্রহণ, অগ্র", page: "২৬, ৭৫" },
      { id: "4-12", combined: "ব্র", components: "ব + র", word: "তীব্র, ব্রহ্মপুত্র", page: "২৬, ৫৩" },
      { id: "4-13", combined: "স্ল", components: "স + ল", word: "স্লোগান, ইসলাম", page: "৬৬, ৩১" },
      { id: "4-14", combined: "দ্ধ", components: "দ + ধ", word: "বুদ্ধ, মুষ্টিবদ্ধ, বৃদ্ধ", page: "৬৩, ৬৭" },
      { id: "4-15", combined: "র্ণ", components: "র + ণ (রেফ)", word: "পূর্ণিমা, বর্ণনা, ধর্ম-বর্ণ", page: "৬৩, ৮" },
      { id: "4-16", combined: "শ্র", components: "শ + র", word: "খ্রিস্টান, শ্রাবণ, বিশ্রাম", page: "৬৩, ৯০" },
      { id: "4-17", combined: "ঙ্গ", components: "ঙ + গ", word: "বঙ্গোপসাগর, সংগতি", page: "৫৩, ৮" },
      { id: "4-18", combined: "ভ্র", components: "ভ + র", word: "ব্রহ্মপুত্র", page: "৫৩" },
      { id: "4-19", combined: "ষ্ম", components: "ষ + ম", word: "গ্রীষ্ম", page: "৪৫" },
      { id: "4-20", combined: "ষ্প", components: "ষ + প", word: "বাষ্প", page: "৯০" },
      { id: "4-21", combined: "শ্ব", components: "শ + ব (ব-ফলা)", word: "বিশ্ব", page: "২৩" },
      { id: "4-22", combined: "দ্ব", components: "দ + b", word: "দ্বিতীয়", page: "২৩" },
      { id: "4-23", combined: "স্ব", components: "স + b", word: "স্বাধীন", page: "২৩" },
      { id: "4-24", combined: "র্ক", components: "র + ক", word: "তর্কালঙ্কার", page: "৭৯" },
      { id: "4-25", combined: "ঙ্ক", components: "ঙ + ক", word: "তর্কালঙ্কার, সংস্করণ", page: "৭৯" },
      { id: "4-26", combined: "ল্ট", components: "ল + ট", word: "মিলিটারি", page: "৯৫" }
    ]
  },
  {
    grade: 5,
    gradeLabel: "৫ম শ্রেণি",
    gradeTitle: "পঞ্চম শ্রেণির যুক্তবর্ণ তালিকা",
    emoji: "🦁",
    themeColor: "from-purple-500 to-indigo-600",
    bgGradient: "bg-gradient-to-br from-purple-950/20 via-indigo-950/10 to-transparent",
    textColor: "text-purple-400",
    borderCol: "border-purple-500/30",
    mascot: "সাহসী সিংহ",
    letters: [
      { id: "5-1", combined: "প্র", components: "প + র", word: "প্রকৃতি, প্রান্তর", notes: "রূপময় বাংলাদেশ" },
      { id: "5-2", combined: "গ্র", components: "গ + র", word: "গ্রীষ্মে, গ্রহণ", notes: "রূপময় বাংলাদেশ" },
      { id: "5-3", combined: "ষ্ম", components: "ষ + ম", word: "গ্রীষ্মে", notes: "রূপময় বাংলাদেশ" },
      { id: "5-4", combined: "ঙ্খ", components: "ঙ + খ", word: "অসংখ্য", notes: "রূপময় বাংলাদেশ" },
      { id: "5-5", combined: "খ্যা", components: "খ + য", word: "বিখ্যাত", notes: "রূপময় বাংলাদেশ" },
      { id: "5-6", combined: "ষ্ণ", components: "ষ + ণ", word: "কৃষ্ণচূড়া", notes: "রূপময় বাংলাদেশ" },
      { id: "5-7", combined: "ঞ্চ", components: "ঞ + চ", word: "অঞ্চল", notes: "রূপময় বাংলাদেশ" },
      { id: "5-8", combined: "ত্র", components: "ত + র", word: "শত্রু", notes: "ভাষার খেলা" },
      { id: "5-9", combined: "ক্র", components: "ক + র", word: "ক্রয়", notes: "ভাষার খেলা" },
      { id: "5-10", combined: "ন্দ", components: "ন + দ", word: "মন্দ", notes: "ভাষার খেলা" },
      { id: "5-11", combined: "গ্ধ", components: "গ + ধ", word: "মুগ্ধ", notes: "ভাষার খেলা" },
      { id: "5-12", combined: "জ্র", components: "জ + র", word: "বজ্র", notes: "ভাষার খেলা" },
      { id: "5-13", combined: "র্ব", components: "র + ব", word: "গর্বিত", notes: "ভাষার খেলা" },
      { id: "5-14", combined: "ঙ্গ", components: "ঙ + গ", word: "পতঙ্গ", notes: "ভাষার খেলা" },
      { id: "5-15", combined: "ষ্টি", components: "ষ + ট", word: "মিষ্টি", notes: "ভাষার খেলা" },
      { id: "5-16", combined: "শ্র", components: "শ + র", word: "শ্রমিকেরা", notes: "ময়নামতি" },
      { id: "5-17", combined: "ভ্য", components: "ভ + য", word: "সভ্যতা", notes: "ময়নামতি" },
      { id: "5-18", combined: "ত্ব", components: "ত + ব", word: "গুরুত্বপূর্ণ", notes: "ময়নামতি" },
      { id: "5-19", combined: "ন্স", components: "ন + স", word: "অনুসন্ধান", notes: "ময়নামতি" },
      { id: "5-20", combined: "ন্ধ", components: "ন + ধ", word: "অনুসন্ধান, বন্ধ", notes: "ময়নামতি, লাল জামা" },
      { id: "5-21", combined: "দ্ধ", components: "দ + ধ", word: "বৌদ্ধ, মুক্তিযুদ্ধ", notes: "ময়নামতি, লাল জামা" },
      { id: "5-22", combined: "ক্ষ", components: "ক + ষ", word: "ভিক্ষু, রাক্ষস", notes: "ময়নামতি, বাঘখেকো শিয়াল" },
      { id: "5-23", combined: "দ্র", components: "দ + র", word: "মুদ্রা", notes: "ময়নামতি" },
      { id: "5-24", combined: "র্ত", components: "র + ত", word: "গর্ত", notes: "বাঘখেকো শিয়ালের ছানা" },
      { id: "5-25", combined: "জ্ঞ", components: "জ + ঞ", word: "জিজ্ঞেস, জ্ঞান, বিজ্ঞাপন", notes: "বাঘখেকো শিয়াল, মহীয়সী নারী" },
      { id: "5-26", combined: "শ্রী", components: "শ + র", word: "বিশ্রী", notes: "বাঘখেকো শিয়ালের ছানা" },
      { id: "5-27", combined: "শ্চ", components: "শ + চ", word: "নিশ্চয়, আশ্চর্য", notes: "বাঘখেকো শিয়ালের ছানা" },
      { id: "5-28", combined: "র্য", components: "র + য", word: "আশ্চর্য", notes: "বাঘখেকো শিয়ালের ছানা" },
      { id: "5-29", combined: "শ্ব", components: "শ + ব", word: "বিশ্বাস", notes: "বাঘখেকো শিয়ালের ছানা" },
      { id: "5-30", combined: "ন্ন", components: "ন + ন", word: "উন্নতি", notes: "মহীয়সী নারী" },
      { id: "5-31", combined: "প্ন", components: "প + ন", word: "স্বপ্ন", notes: "লাল জামা" },
      { id: "5-32", combined: "ক্ত", components: "ক + ত", word: "মুক্তিযুদ্ধ", notes: "লাল জামা" },
      { id: "5-33", combined: "দ্ব", components: "দ + ব", word: "উদ্বিগ্ন", notes: "লাল জামা" },
      { id: "5-34", combined: "গ্ন", components: "গ + ন", word: "উদ্বিগ্ন", notes: "লাল জামা" },
      { id: "5-35", combined: "ণ্ঠ", components: "ণ + ঠ", word: "উৎকণ্ঠিত", notes: "লাল জামা" },
      { id: "5-36", combined: "ণ্ড", components: "ণ + ড", word: "প্রচণ্ড", notes: "লাল জামা" }
    ]
  }
];

interface ClassWiseJointLettersProps {
  speak: (text: string) => void;
}

export default function ClassWiseJointLetters({ speak }: ClassWiseJointLettersProps) {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSubTab, setActiveSubTab] = useState<'learn' | 'matching' | 'quiz'>('learn');

  // Handwriting canvas state
  const [activeWriteLetter, setActiveWriteLetter] = useState<JointLetter | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [penColor, setPenColor] = useState<string>("#22c55e");
  const [penWidth, setPenWidth] = useState<number>(10);

  // Matching Game state
  const [matchLeft, setMatchLeft] = useState<{ id: string; val: string }[]>([]);
  const [matchRight, setMatchRight] = useState<{ id: string; val: string }[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameMessage, setGameMessage] = useState<string>("");

  // Quiz state
  const [quizQuestion, setQuizQuestion] = useState<{
    word: string;
    correct: string;
    options: string[];
    grade: number;
  } | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizTotal, setQuizTotal] = useState<number>(0);

  // Fetch the selected class metadata
  const currentClassData = CLASS_JOINT_LETTERS_DATA.find(c => c.grade === selectedGrade) || CLASS_JOINT_LETTERS_DATA[0];

  // Filtering letters based on search query
  const filteredLetters = currentClassData.letters.filter(item => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      item.combined.includes(query) ||
      item.components.toLowerCase().includes(query) ||
      item.word.toLowerCase().includes(query) ||
      (item.notes && item.notes.toLowerCase().includes(query))
    );
  });

  // TTS Read aloud handler
  const handleListen = (letter: JointLetter) => {
    const textToSpeak = `${letter.combined}। এটি গঠিত হয়েছে ${letter.components} দিয়ে। শব্দ: ${letter.word}।`;
    speak(textToSpeak);
  };

  // Tracing Whiteboard Methods
  useEffect(() => {
    if (activeWriteLetter && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw standard script lines for children writing practice
        ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
        ctx.lineWidth = 2;
        // Top line
        ctx.beginPath();
        ctx.moveTo(0, 80);
        ctx.lineTo(canvas.width, 80);
        ctx.stroke();
        // Mid line
        ctx.beginPath();
        ctx.moveTo(0, 200);
        ctx.lineTo(canvas.width, 200);
        ctx.stroke();
        // Bottom line
        ctx.beginPath();
        ctx.moveTo(0, 320);
        ctx.lineTo(canvas.width, 320);
        ctx.stroke();

        // Draw translucent background guide letter for kids to trace over
        ctx.font = "bold 150px Inter, 'Space Grotesk', sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(activeWriteLetter.combined, canvas.width / 2, canvas.height / 2);
      }
    }
  }, [activeWriteLetter]);

  // Highlight joint letters inside words beautifully and make them large and colorful
  const renderHighlightedWord = (word: string, joint: string) => {
    if (!word) return null;
    
    // Split on commas, semicolons, or spaces to handle multiple words
    const words = word.split(/[,，、\s]+/);
    
    return (
      <div className="flex flex-wrap gap-4 items-center mt-1.5">
        {words.map((w, idx) => {
          const isTarget = !joint || w.includes(joint);
          return (
            <motion.span 
              key={idx}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[1.25rem] text-3xl sm:text-4xl font-black transition-all shadow-xl ${
                isTarget
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white border-2 border-white/25 shadow-purple-950/50'
                  : 'bg-gradient-to-r from-slate-800 to-slate-900 text-slate-200 border border-[#30363d] shadow-slate-950/30'
              }`}
            >
              <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] tracking-wide">
                {w}
              </span>
            </motion.span>
          );
        })}
      </div>
    );
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Re-draw grid lines & background letter
    ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 80); ctx.lineTo(canvas.width, 80); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 200); ctx.lineTo(canvas.width, 200); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 320); ctx.lineTo(canvas.width, 320); ctx.stroke();

    if (activeWriteLetter) {
      ctx.font = "bold 150px Inter, 'Space Grotesk', sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(activeWriteLetter.combined, canvas.width / 2, canvas.height / 2);
    }
  };

  // Setup Matching Game
  const setupMatchingGame = () => {
    const allLetters = currentClassData.letters;
    // Pick 5 random items
    const shuffled = [...allLetters].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const left = selected.map((item, idx) => ({ id: `L-${idx}`, val: item.components }));
    const right = selected.map((item, idx) => ({ id: `R-${idx}`, val: item.combined }));

    // Shuffle left and right independently
    setMatchLeft(left.sort(() => 0.5 - Math.random()));
    setMatchRight(right.sort(() => 0.5 - Math.random()));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedPairs([]);
    setGameMessage("");
    speak("যুক্তবর্ণ মেলানোর খেলা শুরু করো সোনামণি!");
  };

  // Setup Quiz
  const setupQuiz = () => {
    const allLetters = currentClassData.letters;
    if (allLetters.length === 0) return;
    const randomIndex = Math.floor(Math.random() * allLetters.length);
    const correctLetter = allLetters[randomIndex];

    // Options generator
    const otherOptions = allLetters
      .filter(item => item.combined !== correctLetter.combined)
      .map(item => item.combined);

    // Unique options
    const uniqueOthers = Array.from(new Set(otherOptions)).sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [correctLetter.combined, ...uniqueOthers].sort(() => 0.5 - Math.random());

    setQuizQuestion({
      word: correctLetter.word.split(',')[0].trim(), // first word
      correct: correctLetter.combined,
      options,
      grade: selectedGrade
    });
    setQuizAnswered(false);
    setQuizSelected(null);
  };

  useEffect(() => {
    if (activeSubTab === 'matching') {
      setupMatchingGame();
    } else if (activeSubTab === 'quiz') {
      setupQuiz();
    }
  }, [activeSubTab, selectedGrade]);

  // Handle Matching Selection
  const handleLeftSelect = (id: string, val: string) => {
    if (matchedPairs.includes(id)) return;
    setSelectedLeft(id);
    speak(val);
    checkMatch(id, selectedRight);
  };

  const handleRightSelect = (id: string, val: string) => {
    const rightIdx = id.split('-')[1];
    const leftId = `L-${rightIdx}`;
    if (matchedPairs.includes(leftId)) return;
    setSelectedRight(id);
    speak(val);
    checkMatch(selectedLeft, id);
  };

  const checkMatch = (lId: string | null, rId: string | null) => {
    if (!lId || !rId) return;

    const leftIdx = lId.split('-')[1];
    const rightIdx = rId.split('-')[1];

    if (leftIdx === rightIdx) {
      // Correct Match!
      setMatchedPairs(prev => [...prev, lId]);
      setGameScore(prev => prev + 10);
      setGameMessage("🎉 বাহ! চমৎকার হয়েছে!");
      speak("দারুণ! সঠিক হয়েছে!");
      setSelectedLeft(null);
      setSelectedRight(null);

      if (matchedPairs.length + 1 === 5) {
        setGameMessage("🏆 অভিনন্দন! তুমি সবকটি জোড়া সঠিকভাবে মেলাতে পেরেছ!");
        speak("অভিনন্দন! তুমি সবকটি জোড়া সঠিকভাবে মিলিয়েছ।");
      }
    } else {
      // Wrong Match
      setGameMessage("✗ আবার চেষ্টা করো সোনামণি!");
      speak("ভুল হয়েছে, আবার চেষ্টা করো!");
      // Reset selections after a short delay
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 1000);
    }
  };

  // Handle Quiz Selection
  const handleQuizAnswer = (option: string) => {
    if (quizAnswered) return;
    setQuizSelected(option);
    setQuizAnswered(true);
    setQuizTotal(prev => prev + 1);

    if (option === quizQuestion?.correct) {
      setQuizScore(prev => prev + 10);
      speak("চমৎকার! সঠিক উত্তর হয়েছে।");
    } else {
      speak(`ভুল হয়েছে সোনামণি। সঠিক উত্তর ছিল ${quizQuestion?.correct}`);
    }
  };

  // Global Printer helper
  const handlePrint = (printAll: boolean) => {
    speak("প্রিন্ট লেআউট তৈরি করা হচ্ছে...");
    
    // Create print container
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("পপ-আপ লকার নিষ্ক্রিয় করুন!");
      return;
    }

    const title = printAll ? "১ম - ৫ম শ্রেণির সকল যুক্তবর্ণ তালিকা" : `${currentClassData.gradeLabel} এর যুক্তবর্ণ তালিকা`;
    
    let contentHtml = `
      <html>
      <head>
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #000;
            background-color: #fff;
            padding: 40px;
            line-height: 1.6;
          }
          h1 {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
            font-size: 24px;
            margin-bottom: 30px;
          }
          .grade-section {
            margin-bottom: 40px;
            page-break-after: auto;
          }
          .grade-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #000;
            padding: 10px 12px;
            text-align: left;
            font-size: 14px;
          }
          th {
            background-color: #f2f2f2 !important;
            font-weight: bold;
          }
          .combined {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            font-family: 'Times New Roman', Times, serif;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            margin-top: 50px;
            border-top: 1px solid #eee;
            padding-top: 10px;
            color: #555;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>📚 ${title}</h1>
    `;

    const gradesToPrint = printAll ? CLASS_JOINT_LETTERS_DATA : [currentClassData];

    gradesToPrint.forEach(gradeData => {
      contentHtml += `
        <div class="grade-section">
          <div class="grade-title">${gradeData.gradeTitle} (${gradeData.gradeLabel} - ${gradeData.emoji})</div>
          <table>
            <thead>
              <tr>
                <th style="width: 15%; text-align: center;">যুক্তবর্ণ</th>
                <th style="width: 25%;">বিশ্লেষণ</th>
                <th style="width: 40%;">পাঠ্যবইয়ের শব্দ</th>
                <th style="width: 20%;">পৃষ্ঠা / উৎস</th>
              </tr>
            </thead>
            <tbody>
      `;

      gradeData.letters.forEach(item => {
        contentHtml += `
          <tr>
            <td class="combined">${item.combined}</td>
            <td>${item.components}</td>
            <td><strong>${item.word}</strong></td>
            <td>${item.page ? `পৃষ্ঠা: ${item.page}` : item.notes || 'সাধারণ পাঠ'}</td>
          </tr>
        `;
      });

      contentHtml += `
            </tbody>
          </table>
        </div>
      `;
    });

    contentHtml += `
        <div class="footer">
          আমার বাংলা বর্ণমালা শিক্ষণ বোর্ড - গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত পাঠ্যক্রমের অনুসরণে প্রণীত।
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(contentHtml);
    printWindow.document.close();
  };

  return (
    <div id="class-wise-joint-letters-panel" className="space-y-8 select-none">
      
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-[#161b22] border border-[#30363d] rounded-[2rem] p-6 sm:p-10 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 rounded-3xl flex items-center justify-center text-white text-3xl sm:text-4xl shadow-xl shadow-purple-950/40">
              ✍️
            </div>
            <div>
              <span className="bg-purple-950/60 border border-purple-800/60 text-purple-300 font-extrabold text-[10px] sm:text-xs px-3.5 py-1 rounded-full uppercase tracking-widest">
                CLASS WISE BANGLA CONJUNCT LETTERS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 mt-2">
                শ্রেণি ভিত্তিক যুক্তবর্ণ শিক্ষণ বোর্ড 🇧🇩
              </h2>
              <p className="text-[#8b949e] text-xs sm:text-sm mt-2 font-medium">
                ১ম থেকে ৫track শ্রেণির সকল গল্প, কবিতা ও পাঠভিত্তিক যুক্তবর্ণ শিখুন রঙিন ও আনন্দের মাধ্যমে!
              </p>
            </div>
          </div>

          {/* Quick Print Suite */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => handlePrint(false)}
              className="px-4 py-2.5 bg-slate-900 hover:bg-[#21262d] text-gray-200 hover:text-white border border-[#30363d] hover:border-slate-400 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Printer className="w-4 h-4 text-purple-400" />
              <span>শ্রেণি প্রিন্ট</span>
            </button>
            <button
              onClick={() => handlePrint(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white rounded-2xl text-xs font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-950/30 border-t border-white/20 cursor-pointer flex items-center gap-2"
            >
              <FileDown className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>১ম-৫ম অল প্রিন্ট (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* GRADE CAROUSEL TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        {CLASS_JOINT_LETTERS_DATA.map(gradeItem => {
          const isSelected = selectedGrade === gradeItem.grade;
          return (
            <button
              key={gradeItem.grade}
              onClick={() => {
                setSelectedGrade(gradeItem.grade);
                speak(`${gradeItem.gradeLabel} এর যুক্তবর্ণ তালিকা`);
              }}
              className={`relative overflow-hidden rounded-[1.5rem] p-4 text-left transition-all border cursor-pointer ${
                isSelected 
                  ? `bg-[#1c2128] ${gradeItem.borderCol} border-2 shadow-xl shadow-slate-950/50 scale-102` 
                  : 'bg-[#161b22] border-[#30363d] opacity-80 hover:opacity-100 hover:scale-[1.02]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl sm:text-3xl">{gradeItem.emoji}</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  GRADE {gradeItem.grade}
                </span>
              </div>
              <h3 className={`text-sm sm:text-base font-black ${
                isSelected ? 'text-transparent bg-clip-text bg-gradient-to-r ' + gradeItem.themeColor : 'text-slate-200'
              }`}>
                {gradeItem.gradeLabel}
              </h3>
              <p className="text-[10px] text-slate-400 font-medium mt-1">
                {gradeItem.letters.length} টি যুক্তবর্ণ
              </p>
              
              {/* Highlight bar inside card */}
              {isSelected && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradeItem.themeColor}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* SUB-TABS (LEARN, MATCHING GAME, QUIZ) */}
      <div className="flex border-b border-[#30363d] no-print">
        {[
          { id: 'learn', label: '📖 যুক্তবর্ণ শিখুন', icon: 'BookOpen' },
          { id: 'matching', label: '🎮 মেলানোর খেলা', icon: 'Gamepad2' },
          { id: 'quiz', label: '🧠 বুদ্ধির কুইজ', icon: 'Brain' }
        ].map(sub => {
          const isActive = activeSubTab === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => {
                setActiveSubTab(sub.id as any);
                speak(sub.label);
              }}
              className={`px-5 py-4 font-black text-xs sm:text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                isActive 
                  ? 'border-purple-500 text-purple-400 bg-purple-950/10' 
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <span>{sub.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==================== TABS CONTENT ==================== */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: LEARN & TRACING PANEL */}
        {activeSubTab === 'learn' && (
          <motion.div
            key="learn"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* SEARCH AND FILTERS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#161b22] border border-[#30363d] rounded-2xl p-4 no-print">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="যুক্তবর্ণ বা শব্দ খুঁজুন... (যেমন: প্ত, স্কুল)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-purple-500 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-200 outline-none transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>ম্যাসকট: {currentClassData.mascot} ({currentClassData.emoji})</span>
              </div>
            </div>

            {/* MAIN LETTER DISPLAY GRID */}
            {filteredLetters.length === 0 ? (
              <div className="text-center py-16 bg-[#161b22] border border-[#30363d] rounded-2xl">
                <span className="text-5xl">🔍</span>
                <h3 className="text-lg font-black text-slate-300 mt-4">কোনো যুক্তবর্ণ পাওয়া যায়নি!</h3>
                <p className="text-xs text-slate-500 mt-1">দয়া করে অন্য কোনো বর্ণ টাইপ করে খুঁজুন।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredLetters.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className="relative overflow-hidden bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] hover:border-purple-500/40 rounded-3xl p-5 transition-all shadow-lg flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Top Banner inside card */}
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-extrabold bg-[#0d1117] border border-[#21262d] px-2.5 py-1 rounded-full uppercase tracking-wider">
                          INDEX {index + 1}
                        </span>
                        {item.page && (
                          <span className="text-[10px] text-purple-400 font-extrabold bg-purple-950/30 border border-purple-900/30 px-2.5 py-1 rounded-full">
                            পৃষ্ঠা {item.page}
                          </span>
                        )}
                      </div>

                      {/* Giant Conjunct letter Display */}
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 bg-gradient-to-tr from-slate-800 to-slate-900/50 border border-slate-700/50 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-black text-white shadow-inner">
                          {item.combined}
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-extrabold">বিশ্লেষণ:</p>
                          <h4 className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mt-0.5">
                            {item.components}
                          </h4>
                        </div>
                      </div>

                      {/* Sample Words bento section */}
                      <div className="p-4 bg-[#0d1117] border-2 border-purple-500/20 hover:border-purple-500/40 rounded-2xl space-y-2.5 transition-colors shadow-inner">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                          <span className="text-[10px] text-purple-400 font-extrabold uppercase tracking-wider">উদাহরণ শব্দ (Highlighted Word):</span>
                        </div>
                        <div className="pt-0.5">
                          {renderHighlightedWord(item.word, item.combined)}
                        </div>
                      </div>

                      {item.notes && (
                        <p className="text-[11px] text-slate-400 italic">
                          💡 {item.notes}
                        </p>
                      )}
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex gap-2.5 mt-5 border-t border-[#21262d] pt-4">
                      <button
                        onClick={() => handleListen(item)}
                        className="flex-1 py-2.5 bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] rounded-xl text-[11px] font-black text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Volume2 className="w-4 h-4 text-emerald-400" />
                        <span>উচ্চারণ শুনুন</span>
                      </button>

                      <button
                        onClick={() => setActiveWriteLetter(item)}
                        className="py-2.5 px-3 bg-purple-950/30 hover:bg-purple-950/50 border border-purple-500/30 hover:border-purple-500/80 text-purple-300 hover:text-white rounded-xl text-[11px] font-black transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <PenTool className="w-4 h-4 text-purple-400" />
                        <span>অনুশীলন</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: MATCHING GAME TAB */}
        {activeSubTab === 'matching' && (
          <motion.div
            key="matching"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 space-y-6"
          >
            <div className="flex justify-between items-center border-b border-[#30363d] pb-4">
              <div>
                <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  🎮 যুক্তবর্ণ মেলানোর খেলা
                </h3>
                <p className="text-xs text-slate-400 mt-1">বাম পাশের যুক্তবর্ণ গঠনের উপাদানের সাথে ডান পাশের মূল যুক্তবর্ণটি মেলাও!</p>
              </div>

              <div className="bg-purple-950/50 border border-purple-800/40 px-4 py-2 rounded-xl flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-black text-white">স্কোর: {gameScore}</span>
              </div>
            </div>

            {gameMessage && (
              <div className={`p-4 rounded-xl text-center font-black text-xs sm:text-sm ${
                gameMessage.includes('অভিনন্দন') ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300' : 'bg-purple-950/20 border border-purple-800/20 text-purple-300'
              }`}>
                {gameMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              {/* Left Side: Components */}
              <div className="space-y-3">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest block text-center">উপাদান (Components)</label>
                {matchLeft.map(item => {
                  const isSelect = selectedLeft === item.id;
                  const isMatched = matchedPairs.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleLeftSelect(item.id, item.val)}
                      disabled={isMatched}
                      className={`w-full p-4 rounded-2xl font-black text-sm sm:text-base border transition-all flex items-center justify-between cursor-pointer ${
                        isMatched
                          ? 'bg-emerald-950/10 border-emerald-500/20 text-emerald-500/50 line-through cursor-not-allowed'
                          : isSelect
                          ? 'bg-purple-950/40 border-purple-500 text-purple-300 shadow-lg scale-102'
                          : 'bg-[#0d1117] border-[#30363d] text-white hover:border-purple-500/30 hover:bg-[#161b22]'
                      }`}
                    >
                      <span>{item.val}</span>
                      {isMatched && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Right Side: Joint letters */}
              <div className="space-y-3">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest block text-center">যুক্তবর্ণ (Conjuncts)</label>
                {matchRight.map(item => {
                  const rightIdx = item.id.split('-')[1];
                  const correspondingLeftId = `L-${rightIdx}`;
                  const isMatched = matchedPairs.includes(correspondingLeftId);
                  const isSelect = selectedRight === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleRightSelect(item.id, item.val)}
                      disabled={isMatched}
                      className={`w-full p-4 rounded-2xl font-black text-sm sm:text-base border transition-all flex items-center justify-between cursor-pointer ${
                        isMatched
                          ? 'bg-emerald-950/10 border-emerald-500/20 text-emerald-500/50 line-through cursor-not-allowed'
                          : isSelect
                          ? 'bg-purple-950/40 border-purple-500 text-purple-300 shadow-lg scale-102'
                          : 'bg-[#0d1117] border-[#30363d] text-white hover:border-purple-500/30 hover:bg-[#161b22]'
                      }`}
                    >
                      <span>{item.val}</span>
                      {isMatched && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={setupMatchingGame}
                className="px-6 py-3 bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] rounded-2xl text-xs font-black text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-purple-400" />
                <span>নতুন গেম শুরু করুন</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 3: QUIZ TAB */}
        {activeSubTab === 'quiz' && quizQuestion && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-xl mx-auto bg-[#161b22] border border-[#30363d] rounded-3xl p-6 sm:p-8 space-y-6 text-center"
          >
            <div className="flex justify-between items-center border-b border-[#30363d] pb-4 text-left">
              <div>
                <h3 className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  🧠 যুক্তবর্ণ বুদ্ধির কুইজ
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-400">শব্দটি দেখে কোন যুক্তবর্ণটি ব্যবহার হয়েছে তা সনাক্ত কর!</p>
              </div>

              <div className="bg-purple-950/50 border border-purple-800/40 px-3 py-1.5 rounded-xl text-xs font-black text-white">
                {quizScore}/{quizTotal * 10} pt
              </div>
            </div>

            {/* Giant Question Area */}
            <div className="space-y-3 py-4 flex flex-col items-center">
              <span className="text-[11px] text-purple-400 font-extrabold uppercase bg-purple-950/50 border border-purple-900/35 px-3 py-1 rounded-full">
                {currentClassData.gradeLabel} কুইজ
              </span>
              <div className="mt-2.5 min-h-[4.5rem] flex items-center justify-center">
                {quizAnswered ? (
                  renderHighlightedWord(quizQuestion.word, quizQuestion.correct)
                ) : (
                  <h2 className="text-4xl sm:text-6xl font-black text-white tracking-wide">
                    "{quizQuestion.word}"
                  </h2>
                )}
              </div>
              <p className="text-xs text-slate-400 font-bold mt-1">
                এই শব্দটিতে কোন যুক্তবর্ণটি ব্যবহৃত হয়েছে?
              </p>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-2 gap-3.5">
              {quizQuestion.options.map(opt => {
                const isSelected = quizSelected === opt;
                const isCorrect = opt === quizQuestion.correct;
                const showSuccess = quizAnswered && isCorrect;
                const showFail = quizAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={opt}
                    onClick={() => handleQuizAnswer(opt)}
                    disabled={quizAnswered}
                    className={`p-5 rounded-2xl text-lg sm:text-2xl font-black border transition-all cursor-pointer ${
                      showSuccess 
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-950/30'
                        : showFail
                        ? 'bg-rose-950/40 border-rose-500 text-rose-400 shadow-md shadow-rose-950/30'
                        : quizAnswered
                        ? 'bg-[#0d1117] border-transparent text-slate-600 opacity-50 cursor-default'
                        : 'bg-[#0d1117] border-[#30363d] text-white hover:border-purple-500/50 hover:bg-[#161b22]'
                    }`}
                  >
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Response Banner */}
            {quizAnswered && (
              <div className={`p-4 rounded-xl text-center text-xs sm:text-sm font-black ${
                quizSelected === quizQuestion.correct ? 'bg-emerald-950/20 text-emerald-400' : 'bg-rose-950/20 text-rose-400'
              }`}>
                {quizSelected === quizQuestion.correct 
                  ? "🎉 অভিনন্দন! সঠিক উত্তর হয়েছে সোনামণি!" 
                  : `✗ ভুল হয়েছে। সঠিক উত্তরটি হলো: ${quizQuestion.correct}`
                }
              </div>
            )}

            {/* Next Button */}
            {quizAnswered && (
              <button
                onClick={setupQuiz}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-black text-xs sm:text-sm rounded-2xl hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-lg shadow-purple-950/30"
              >
                পরবর্তী কুইজ প্রশ্ন ➡️
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* ================= DRAWING MODAL BOARD ================= */}
      <AnimatePresence>
        {activeWriteLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm no-print"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#161b22] border-2 border-purple-500/30 p-6 rounded-3xl max-w-lg w-full shadow-2xl relative flex flex-col gap-5 text-white"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start border-b border-[#30363d] pb-4">
                <div>
                  <span className="bg-purple-950/50 border border-purple-900/30 text-purple-400 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full">
                    WRITING TRACER BOARD
                  </span>
                  <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-300 mt-1">
                    "{activeWriteLetter.combined}" লিখন ও ট্রেসিং ক্যানভাস
                  </h3>
                </div>
                <button
                  onClick={() => setActiveWriteLetter(null)}
                  className="bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white p-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Whiteboard Drawing Canvas container */}
              <div className="relative border-2 border-[#30363d] rounded-2xl overflow-hidden bg-[#0d1117] h-96">
                <canvas
                  ref={canvasRef}
                  width={460}
                  height={380}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                />
              </div>

              {/* Canvas controls */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                
                {/* Pen color selector */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400">রঙ:</span>
                  {[
                    { color: "#22c55e", label: "সবুজ" },
                    { color: "#f59e0b", label: "হলুদ" },
                    { color: "#ec4899", label: "গোলাপি" },
                    { color: "#3b82f6", label: "নীল" },
                    { color: "#ffffff", label: "সাদা" }
                  ].map(item => (
                    <button
                      key={item.color}
                      onClick={() => setPenColor(item.color)}
                      className={`w-6 h-6 rounded-full transition-transform cursor-pointer border-t border-white/20 ${
                        penColor === item.color ? 'scale-125 ring-2 ring-purple-500' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: item.color }}
                      title={item.label}
                    />
                  ))}
                </div>

                {/* Control tools */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearCanvas}
                    className="px-3.5 py-1.5 bg-[#0d1117] hover:bg-slate-800 border border-[#30363d] text-slate-300 hover:text-white rounded-xl text-xs font-black transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>মুছুন</span>
                  </button>
                  <button
                    onClick={() => speak(activeWriteLetter.combined)}
                    className="px-3.5 py-1.5 bg-[#0d1117] hover:bg-slate-800 border border-[#30363d] text-slate-300 hover:text-white rounded-xl text-xs font-black transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>শুনুন</span>
                  </button>
                  <button
                    onClick={() => setActiveWriteLetter(null)}
                    className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black transition-colors cursor-pointer border-t border-white/10"
                  >
                    সম্পন্ন
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
