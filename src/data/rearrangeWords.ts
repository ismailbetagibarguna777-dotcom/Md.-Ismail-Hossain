export interface RearrangeWordItem {
  id: number;
  word: string;
  parts: string[];
  emoji: string;
  phase: number;
  phaseTitle: string;
  english: string;
}

export const BENGALI_REARRANGE_WORDS_DATA: RearrangeWordItem[] = [
  // ধাপ ১: একদম প্রাথমিক জিনিস
  { id: 1, word: "কলম", parts: ["ক", "ল", "ম"], emoji: "🖊️", phase: 1, phaseTitle: "ধাপ ১: একদম প্রাথমিক জিনিস", english: "Pen" },
  { id: 2, word: "চশমা", parts: ["চ", "শ", "মা"], emoji: "👓", phase: 1, phaseTitle: "ধাপ ১: একদম প্রাথমিক জিনিস", english: "Glasses" },
  { id: 3, word: "হরিণ", parts: ["হ", "রি", "ণ"], emoji: "🦌", phase: 1, phaseTitle: "ধাপ ১: একদম প্রাথমিক জিনিস", english: "Deer" },
  { id: 4, word: "শাপলা", parts: ["শা", "প", "লা"], emoji: "🪷", phase: 1, phaseTitle: "ধাপ ১: একদম প্রাথমিক জিনিস", english: "Water Lily" },
  { id: 5, word: "পুতুল", parts: ["পু", "তু", "ল"], emoji: "🪆", phase: 1, phaseTitle: "ধাপ ১: একদম প্রাথমিক জিনিস", english: "Doll" },
  { id: 6, word: "আপেল", parts: ["আ", "পে", "ল"], emoji: "🍎", phase: 1, phaseTitle: "ধাপ ১: একদম প্রাথমিক জিনিস", english: "Apple" },
  { id: 7, word: "গাজর", parts: ["গা", "জ", "র"], emoji: "🥕", phase: 1, phaseTitle: "ধাপ ১: একদম প্রাথমিক জিনিস", english: "Carrot" },
  { id: 8, word: "বাদাম", parts: ["বা", "দা", "ম"], emoji: "🥜", phase: 1, phaseTitle: "ধাপ ১: একদম প্রাথমিক জিনিস", english: "Nut" },
  { id: 9, word: "পালক", parts: ["পা", "ল", "ক"], emoji: "🪶", phase: 1, phaseTitle: "ধাপ ১: একদম প্রাথমিক জিনিস", english: "Feather" },
  { id: 10, word: "ডালিম", parts: ["ডা", "লি", "ম"], emoji: "🍎", phase: 1, phaseTitle: "ধাপ ১: একদম প্রাথমিক জিনিস", english: "Pomegranate" },

  // ধাপ ২: ফল ও সবজি
  { id: 11, word: "কাঁঠাল", parts: ["কাঁ", "ঠা", "ল"], emoji: "🍈", phase: 2, phaseTitle: "ধাপ ২: ফল ও সবজি", english: "Jackfruit" },
  { id: 12, word: "পেয়ারা", parts: ["পে", "য়া", "রা"], emoji: "🍐", phase: 2, phaseTitle: "ধাপ ২: ফল ও সবজি", english: "Guava" },
  { id: 13, word: "আনারস", parts: ["আ", "না", "র", "স"], emoji: "🍍", phase: 2, phaseTitle: "ধাপ ২: ফল ও সবজি", english: "Pineapple" },
  { id: 14, word: "তরমুজ", parts: ["ত", "র", "মু", "জ"], emoji: "🍉", phase: 2, phaseTitle: "ধাপ ২: ফল ও সবজি", english: "Watermelon" },
  { id: 15, word: "টমেটো", parts: ["ট", "মে", "টো"], emoji: "🍅", phase: 2, phaseTitle: "ধাপ ২: ফল ও সবজি", english: "Tomato" },
  { id: 16, word: "বেগুন", parts: ["বে", "গু", "ন"], emoji: "🍆", phase: 2, phaseTitle: "ধাপ ২: ফল ও সবজি", english: "Eggplant" },
  { id: 17, word: "করলা", parts: ["ক", "র", "লা"], emoji: "🥒", phase: 2, phaseTitle: "ধাপ ২: ফল ও সবজি", english: "Bitter Melon" },
  { id: 18, word: "রসুন", parts: ["র", "সু", "ন"], emoji: "🧄", phase: 2, phaseTitle: "ধাপ ২: ফল ও সবজি", english: "Garlic" },
  { id: 19, word: "নারকেল", parts: ["না", "র", "কে", "ল"], emoji: "🥥", phase: 2, phaseTitle: "ধাপ ২: ফল ও সবজি", english: "Coconut" },
  { id: 20, word: "জলপাই", parts: ["জ", "ল", "পা", "ই"], emoji: "🫒", phase: 2, phaseTitle: "ধাপ ২: ফল ও সবজি", english: "Olive" },

  // ধাপ ৩: পরিচিত প্রাণী ও পাখি
  { id: 21, word: "কুকুর", parts: ["কু", "কু", "র"], emoji: "🐶", phase: 3, phaseTitle: "ধাপ ৩: পরিচিত প্রাণী ও পাখি", english: "Dog" },
  { id: 22, word: "বিড়াল", parts: ["বি", "ড়া", "ল"], emoji: "🐱", phase: 3, phaseTitle: "ধাপ ৩: পরিচিত প্রাণী ও পাখি", english: "Cat" },
  { id: 23, word: "শিয়াল", parts: ["শি", "য়া", "ল"], emoji: "🦊", phase: 3, phaseTitle: "ধাপ ৩: পরিচিত প্রাণী ও পাখি", english: "Fox" },
  { id: 24, word: "খরগোশ", parts: ["খ", "র", "গো", "শ"], emoji: "🐰", phase: 3, phaseTitle: "ধাপ ৩: পরিচিত প্রাণী ও পাখি", english: "Rabbit" },
  { id: 25, word: "বানর", parts: ["বা", "ন", "র"], emoji: "🐒", phase: 3, phaseTitle: "ধাপ ৩: পরিচিত প্রাণী ও পাখি", english: "Monkey" },
  { id: 26, word: "কবুতর", parts: ["ক", "বু", "ত", "র"], emoji: "🕊️", phase: 3, phaseTitle: "ধাপ ৩: পরিচিত প্রাণী ও পাখি", english: "Pigeon" },
  { id: 27, word: "কাকাতুয়া", parts: ["কা", "কা", "তু", "য়া"], emoji: "🦜", phase: 3, phaseTitle: "ধাপ ৩: পরিচিত প্রাণী ও পাখি", english: "Cockatoo" },
  { id: 28, word: "মোরগ", parts: ["মো", "র", "গ"], emoji: "🐓", phase: 3, phaseTitle: "ধাপ ৩: পরিচিত প্রাণী ও পাখি", english: "Rooster" },
  { id: 29, word: "চড়ুই", parts: ["চ", "ড়ু", "ই"], emoji: "🐦", phase: 3, phaseTitle: "ধাপ ৩: পরিচিত প্রাণী ও পাখি", english: "Sparrow" },
  { id: 30, word: "দোয়েল", parts: ["দো", "য়ে", "ল"], emoji: "🐦", phase: 3, phaseTitle: "ধাপ ৩: পরিচিত প্রাণী ও পাখি", english: "Magpie Robin" },

  // ধাপ ৪: ঘরের সাধারণ জিনিসপত্র
  { id: 31, word: "টেবিল", parts: ["টে", "বি", "ল"], emoji: "🪑", phase: 4, phaseTitle: "ধাপ ৪: ঘরের সাধারণ জিনিসপত্র", english: "Table" },
  { id: 32, word: "চেয়ার", parts: ["চে", "য়া", "র"], emoji: "🪑", phase: 4, phaseTitle: "ধাপ ৪: ঘরের সাধারণ জিনিসপত্র", english: "Chair" },
  { id: 33, word: "জানালা", parts: ["জা", "না", "লা"], emoji: "🪟", phase: 4, phaseTitle: "ধাপ ৪: ঘরের সাধারণ জিনিসপত্র", english: "Window" },
  { id: 34, word: "দরজা", parts: ["দ", "র", "জা"], emoji: "🚪", phase: 4, phaseTitle: "ধাপ ৪: ঘরের সাধারণ জিনিসপত্র", english: "Door" },
  { id: 35, word: "গ্লাস", parts: ["গ্লা", "স"], emoji: "🥛", phase: 4, phaseTitle: "ধাপ ৪: ঘরের সাধারণ জিনিসপত্র", english: "Glass" },
  { id: 36, word: "চামচ", parts: ["চা", "ম", "চ"], emoji: "🥄", phase: 4, phaseTitle: "ধাপ ৪: ঘরের সাধারণ জিনিসপত্র", english: "Spoon" },
  { id: 37, word: "চিরুনি", parts: ["চি", "রু", "নি"], emoji: "🪮", phase: 4, phaseTitle: "ধাপ ৪: ঘরের সাধারণ জিনিসপত্র", english: "Comb" },
  { id: 38, word: "আয়না", parts: ["আ", "য়", "না"], emoji: "🪞", phase: 4, phaseTitle: "ধাপ ৪: ঘরের সাধারণ জিনিসপত্র", english: "Mirror" },
  { id: 39, word: "বালতি", parts: ["বা", "ল", "তি"], emoji: "🪣", phase: 4, phaseTitle: "ধাপ ৪: ঘরের সাধারণ জিনিসপত্র", english: "Bucket" },
  { id: 40, word: "তোয়ালে", parts: ["তো", "য়া", "লে"], emoji: "🧼", phase: 4, phaseTitle: "ধাপ ৪: ঘরের সাধারণ জিনিসপত্র", english: "Towel" },

  // ধাপ ৫: পরিধানের জিনিস ও পোশাক
  { id: 41, word: "প্যান্ট", parts: ["প্যা", "ন্ট"], emoji: "👖", phase: 5, phaseTitle: "ধাপ ৫: পরিধানের জিনিস ও পোশাক", english: "Pants" },
  { id: 42, word: "কামিজ", parts: ["কা", "মি", "জ"], emoji: "👗", phase: 5, phaseTitle: "ধাপ ৫: পরিধানের জিনিস ও পোশাক", english: "Dress" },
  { id: 43, word: "বেল্ট", parts: ["বে", "ল্ট"], emoji: "👖", phase: 5, phaseTitle: "ধাপ ৫: পরিধানের জিনিস ও পোশাক", english: "Belt" },
  { id: 44, word: "স্যান্ডেল", parts: ["স্যা", "ন্ডে", "ল"], emoji: "🩴", phase: 5, phaseTitle: "ধাপ ৫: পরিধানের জিনিস ও পোশাক", english: "Sandals" },
  { id: 45, word: "মাফলার", parts: ["মা", "ফ", "লা", "র"], emoji: "🧣", phase: 5, phaseTitle: "ধাপ ৫: পরিধানের জিনিস ও পোশাক", english: "Muffler" },
  { id: 46, word: "চাদর", parts: ["চা", "দ", "র"], emoji: "🛌", phase: 5, phaseTitle: "ধাপ ৫: পরিধানের জিনিস ও পোশাক", english: "Shawl" },
  { id: 47, word: "রুমাল", parts: ["রু", "মা", "ল"], emoji: "🧼", phase: 5, phaseTitle: "ধাপ ৫: পরিধানের জিনিস ও পোশাক", english: "Handkerchief" },
  { id: 48, word: "বোতাম", parts: ["বো", "তা", "ম"], emoji: "🔘", phase: 5, phaseTitle: "ধাপ ৫: পরিধানের জিনিস ও পোশাক", english: "Button" },
  { id: 49, word: "হাতঘড়ি", parts: ["হা", "ত", "ঘ", "ড়ি"], emoji: "⌚", phase: 5, phaseTitle: "ধাপ ৫: পরিধানের জিনিস ও পোশাক", english: "Wristwatch" },
  { id: 50, word: "পাগড়ি", parts: ["পা", "গ", "ড়ি"], emoji: "👳", phase: 5, phaseTitle: "ধাপ ৫: পরিধানের জিনিস ও পোশাক", english: "Turban" },

  // ধাপ ৬: বিভিন্ন যানবাহন
  { id: 51, word: "সাইকেল", parts: ["সাই", "কে", "ল"], emoji: "🚲", phase: 6, phaseTitle: "ধাপ ৬: বিভিন্ন যানবাহন", english: "Bicycle" },
  { id: 52, word: "রিকশা", parts: ["রি", "ক", "শা"], emoji: "🛺", phase: 6, phaseTitle: "ধাপ ৬: বিভিন্ন যানবাহন", english: "Rickshaw" },
  { id: 53, word: "জাহাজ", parts: ["জা", "হা", "জ"], emoji: "🚢", phase: 6, phaseTitle: "ধাপ ৬: বিভিন্ন যানবাহন", english: "Ship" },
  { id: 54, word: "বিমান", parts: ["বি", "মা", "ন"], emoji: "✈️", phase: 6, phaseTitle: "ধাপ ৬: বিভিন্ন যানবাহন", english: "Airplane" },
  { id: 55, word: "মোটর", parts: ["মো", "ট", "র"], emoji: "⚙️", phase: 6, phaseTitle: "ধাপ ৬: বিভিন্ন যানবাহন", english: "Motor" },
  { id: 56, word: "ট্রাক", parts: ["ট্রা", "ক"], emoji: "🚚", phase: 6, phaseTitle: "ধাপ ৬: বিভিন্ন যানবাহন", english: "Truck" },
  { id: 57, word: "ট্রেন", parts: ["ট্রে", "ন"], emoji: "🚆", phase: 6, phaseTitle: "ধাপ ৬: বিভিন্ন যানবাহন", english: "Train" },
  { id: 58, word: "ভ্যান", parts: ["ভ্যা", "ন"], emoji: "🚐", phase: 6, phaseTitle: "ধাপ ৬: বিভিন্ন যানবাহন", english: "Van" },
  { id: 59, word: "পালকি", parts: ["পা", "ল", "কি"], emoji: "🛕", phase: 6, phaseTitle: "ধাপ ৬: বিভিন্ন যানবাহন", english: "Palanquin" },
  { id: 60, word: "স্টিমার", parts: ["স্টি", "মা", "র"], emoji: "⛴️", phase: 6, phaseTitle: "ধাপ ৬: বিভিন্ন যানবাহন", english: "Steamer" },

  // ধাপ ৭: প্রকৃতির সাধারণ রূপ
  { id: 61, word: "পাহাড়", parts: ["পা", "হা", "ড়"], emoji: "⛰️", phase: 7, phaseTitle: "ধাপ ৭: প্রকৃতির সাধারণ রূপ", english: "Mountain" },
  { id: 62, word: "সাগর", parts: ["সা", "গ", "র"], emoji: "🌊", phase: 7, phaseTitle: "ধাপ ৭: প্রকৃতির সাধারণ রূপ", english: "Ocean" },
  { id: 63, word: "ঝরনা", parts: ["ঝ", "র", "না"], emoji: "⛲", phase: 7, phaseTitle: "ধাপ ৭: প্রকৃতির সাধারণ রূপ", english: "Waterfall" },
  { id: 64, word: "তুফান", parts: ["তু", "ফা", "ন"], emoji: "🌪️", phase: 7, phaseTitle: "ধাপ ৭: প্রকৃতির সাধারণ রূপ", english: "Storm" },
  { id: 65, word: "কুয়াশা", parts: ["কু", "য়া", "শা"], emoji: "🌫️", phase: 7, phaseTitle: "ধাপ ৭: প্রকৃতির সাধারণ রূপ", english: "Fog" },
  { id: 66, word: "বাদল", parts: ["বা", "দ", "ল"], emoji: "🌧️", phase: 7, phaseTitle: "ধাপ ৭: প্রকৃতির সাধারণ রূপ", english: "Rain" },
  { id: 67, word: "বিদ্যুৎ", parts: ["বি", "দ্যু", "ৎ"], emoji: "⚡", phase: 7, phaseTitle: "ধাপ ৭: প্রকৃতির সাধারণ রূপ", english: "Lightning" },
  { id: 68, word: "জঙ্গল", parts: ["জ", "ঙ্গ", "ল"], emoji: "🌳", phase: 7, phaseTitle: "ধাপ ৭: প্রকৃতির সাধারণ রূপ", english: "Jungle" },
  { id: 69, word: "পাথর", parts: ["পা", "থ", "র"], emoji: "🪨", phase: 7, phaseTitle: "ধাপ ৭: প্রকৃতির সাধারণ রূপ", english: "Stone" },
  { id: 70, word: "পুকুর", parts: ["পু", "কু", "র"], emoji: "🏞️", phase: 7, phaseTitle: "ধাপ ৭: প্রকৃতির সাধারণ রূপ", english: "Pond" },

  // ধাপ ৮: রান্নাঘর ও খাবারের জিনিস
  { id: 71, word: "কড়াই", parts: ["ক", "ড়া", "ই"], emoji: "🍳", phase: 8, phaseTitle: "ধাপ ৮: রান্নাঘর ও খাবারের জিনিস", english: "Pan" },
  { id: 72, word: "কেটলি", parts: ["কে", "ট", "লি"], emoji: "🫖", phase: 8, phaseTitle: "ধাপ ৮: রান্নাঘর ও খাবারের জিনিস", english: "Kettle" },
  { id: 73, word: "বেলন", parts: ["বে", "ল", "ন"], emoji: "🥖", phase: 8, phaseTitle: "ধাপ ৮: রান্নাঘর ও খাবারের জিনিস", english: "Rolling Pin" },
  { id: 74, word: "পিরিচ", parts: ["পি", "রি", "চ"], emoji: "🍽️", phase: 8, phaseTitle: "ধাপ ৮: রান্নাঘর ও খাবারের জিনিস", english: "Saucer" },
  { id: 75, word: "গামলা", parts: ["গা", "ম", "লা"], emoji: "🥣", phase: 8, phaseTitle: "ধাপ ৮: রান্নাঘর ও খাবারের জিনিস", english: "Bowl" },
  { id: 76, word: "চালুনি", parts: ["চা", "লু", "নি"], emoji: "🕸️", phase: 8, phaseTitle: "ধাপ ৮: রান্নাঘর ও খাবারের জিনিস", english: "Sieve" },
  { id: 77, word: "ঢাকনা", parts: ["ঢা", "ক", "না"], emoji: "🕳️", phase: 8, phaseTitle: "ধাপ ৮: রান্নাঘর ও খাবারের জিনিস", english: "Lid" },
  { id: 78, word: "ছাঁকনি", parts: ["ছাঁ", "ক", "নি"], emoji: "☕", phase: 8, phaseTitle: "ধাপ ৮: রান্নাঘর ও খাবারের জিনিস", english: "Strainer" },
  { id: 79, word: "উনুন", parts: ["উ", "নু", "ন"], emoji: "🔥", phase: 8, phaseTitle: "ধাপ ৮: রান্নাঘর ও খাবারের জিনিস", english: "Stove" },
  { id: 80, word: "শীলপাটা", parts: ["শী", "ল", "পা", "টা"], emoji: "🪨", phase: 8, phaseTitle: "ধাপ ৮: রান্নাঘর ও খাবারের জিনিস", english: "Grindstone" },

  // ধাপ ৯: ক্লাসরুম ও পড়াশোনা
  { id: 81, word: "স্লেট", parts: ["স্লে", "ট"], emoji: "📋", phase: 9, phaseTitle: "ধাপ ৯: ক্লাসরুম ও পড়াশোনা", english: "Slate" },
  { id: 82, word: "পেন্সিল", parts: ["পে", "ন্সি", "ল"], emoji: "✏️", phase: 9, phaseTitle: "ধাপ ৯: ক্লাসরুম ও পড়াশোনা", english: "Pencil" },
  { id: 83, word: "রাবার", parts: ["রা", "বা", "র"], emoji: "🧼", phase: 9, phaseTitle: "ধাপ ৯: ক্লাসরুম ও পড়াশোনা", english: "Eraser" },
  { id: 84, word: "স্কেল", parts: ["স্কে", "ল"], emoji: "📏", phase: 9, phaseTitle: "ধাপ ৯: ক্লাসরুম ও পড়াশোনা", english: "Ruler" },
  { id: 85, word: "ডায়েরি", parts: ["ডা", "য়ে", "রি"], emoji: "📔", phase: 9, phaseTitle: "ধাপ ৯: ক্লাসরুম ও পড়াশোনা", english: "Diary" },
  { id: 86, word: "ব্ল্যাকবোর্ড", parts: ["ব্ল্যা", "ক", "বো", "র্ড"], emoji: "🏫", phase: 9, phaseTitle: "ধাপ ৯: ক্লাসরুম ও পড়াশোনা", english: "Blackboard" },
  { id: 87, word: "ডাস্টার", parts: ["ডা", "স্টা", "র"], emoji: "🧽", phase: 9, phaseTitle: "ধাপ ৯: ক্লাসরুম ও পড়াশোনা", english: "Duster" },
  { id: 88, word: "টিফিন", parts: ["টি", "ফি", "ন"], emoji: "🍱", phase: 9, phaseTitle: "ধাপ ৯: ক্লাসরুম ও পড়াশোনা", english: "Lunchbox" },
  { id: 89, word: "দোয়াত", parts: ["দো", "য়া", "ত"], emoji: "🫙", phase: 9, phaseTitle: "ধাপ ৯: ক্লাসরুম ও পড়াশোনা", english: "Inkwell" },
  { id: 90, word: "মানচিত্র", parts: ["মা", "ন", "চি", "ত্র"], emoji: "🗺️", phase: 9, phaseTitle: "ধাপ ৯: ক্লাসরুম ও পড়াশোনা", english: "Map" },

  // ধাপ ১০: মানবদেহের অঙ্গপ্রত্যঙ্গ
  { id: 91, word: "কপাল", parts: ["ক", "পা", "ল"], emoji: "🧠", phase: 10, phaseTitle: "ধাপ ১০: মানবদেহের অঙ্গপ্রত্যঙ্গ", english: "Forehead" },
  { id: 92, word: "পলক", parts: ["প", "ল", "ক"], emoji: "👁️", phase: 10, phaseTitle: "ধাপ ১০: মানবদেহের অঙ্গপ্রত্যঙ্গ", english: "Eyelash" },
  { id: 93, word: "আঙুল", parts: ["আ", "ঙু", "ল"], emoji: "🖕", phase: 10, phaseTitle: "ধাপ ১০: মানবদেহের অঙ্গপ্রত্যঙ্গ", english: "Finger" },
  { id: 94, word: "গোড়ালি", parts: ["গো", "ড়া", "লি"], emoji: "👣", phase: 10, phaseTitle: "ধাপ ১০: মানবদেহের অঙ্গপ্রত্যঙ্গ", english: "Heel" },
  { id: 95, word: "কনুই", parts: ["ক", "নু", "ই"], emoji: "💪", phase: 10, phaseTitle: "ধাপ ১০: মানবদেহের অঙ্গপ্রত্যঙ্গ", english: "Elbow" },
  { id: 96, word: "পাঁজর", parts: ["পাঁ", "জ", "র"], emoji: "🩻", phase: 10, phaseTitle: "ধাপ ১০: মানবদেহের অঙ্গপ্রত্যঙ্গ", english: "Ribs" },
  { id: 97, word: "কঙ্কাল", parts: ["ক", "ঙ্কা", "ল"], emoji: "💀", phase: 10, phaseTitle: "ধাপ ১০: মানবদেহের অঙ্গপ্রত্যঙ্গ", english: "Skeleton" },
  { id: 98, word: "জিহ্বা", parts: ["জি", "হ্বা"], emoji: "👅", phase: 10, phaseTitle: "ধাপ ১০: মানবদেহের অঙ্গপ্রত্যঙ্গ", english: "Tongue" },
  { id: 99, word: "চামড়া", parts: ["চা", "ম", "ড়া"], emoji: "👋", phase: 10, phaseTitle: "ধাপ ১০: মানবদেহের অঙ্গপ্রত্যঙ্গ", english: "Skin" },
  { id: 100, word: "مস্তিস্ক", parts: ["ম", "স্তি", "ষ্ক"], emoji: "🧠", phase: 10, phaseTitle: "ধাপ ১০: মানবদেহের অঙ্গপ্রত্যঙ্গ", english: "Brain" },

  // ধাপ ১১: কীটপতঙ্গ ও ছোট প্রাণী
  { id: 101, word: "প্রজাপতি", parts: ["প্র", "জা", "প", "তি"], emoji: "🦋", phase: 11, phaseTitle: "ধাপ ১১: কীটপতঙ্গ ও ছোট প্রাণী", english: "Butterfly" },
  { id: 102, word: "ফড়িং", parts: ["ফ", "ড়ি", "ং"], emoji: "🦗", phase: 11, phaseTitle: "ধাপ ১১: কীটপতঙ্গ ও ছোট প্রাণী", english: "Grasshopper" },
  { id: 103, word: "পিঁপড়া", parts: ["পিঁ", "প", "ড়া"], emoji: "🐜", phase: 11, phaseTitle: "ধাপ ১১: কীটপতঙ্গ ও ছোট প্রাণী", english: "Ant" },
  { id: 104, word: "মাকড়সা", parts: ["মা", "ক", "ড়", "সা"], emoji: "🕷️", phase: 11, phaseTitle: "ধাপ ১১: কীটপতঙ্গ ও ছোট প্রাণী", english: "Spider" },
  { id: 105, word: "উইপোকা", parts: ["উ", "ই", "পো", "কা"], emoji: "🐜", phase: 11, phaseTitle: "ধাপ ১১: কীটপতঙ্গ ও ছোট প্রাণী", english: "Termite" },
  { id: 106, word: "জোনাকি", parts: ["জো", "না", "কি"], emoji: "🪰", phase: 11, phaseTitle: "ধাপ ১১: কীটপতঙ্গ ও ছোট প্রাণী", english: "Firefly" },
  { id: 107, word: "তেলাপোকা", parts: ["ते", "ला", "পো", "কা"], emoji: "🪳", phase: 11, phaseTitle: "ধাপ ১১: কীটপতঙ্গ ও ছোট প্রাণী", english: "Cockroach" },
  { id: 108, word: "ছারপোকা", parts: ["ছা", "র", "পো", "কা"], emoji: "🪳", phase: 11, phaseTitle: "ধাপ ১১: কীটপতঙ্গ ও ছোট প্রাণী", english: "Bedbug" },
  { id: 109, word: "শামুক", parts: ["শা", "মু", "ক"], emoji: "🐌", phase: 11, phaseTitle: "ধাপ ১১: কীটপতঙ্গ ও ছোট প্রাণী", english: "Snail" },
  { id: 110, word: "কাঁকড়া", parts: ["কাঁ", "ক", "ড়া"], emoji: "🦀", phase: 11, phaseTitle: "ধাপ ১১: কীটপতঙ্গ ও ছোট প্রাণী", english: "Crab" },

  // ধাপ ১২: জলজ প্রাণী
  { id: 111, word: "ডলফিন", parts: ["ড", "ল", "ফি", "ন"], emoji: "🐬", phase: 12, phaseTitle: "ধাপ ১২: জলজ প্রাণী", english: "Dolphin" },
  { id: 112, word: "হাঙ্গর", parts: ["হা", "ঙ্গ", "র"], emoji: "🦈", phase: 12, phaseTitle: "ধাপ ১২: জলজ প্রাণী", english: "Shark" },
  { id: 113, word: "কচ্ছপ", parts: ["ক", "চ্ছ", "প"], emoji: "🐢", phase: 12, phaseTitle: "ধাপ ১২: জলজ প্রাণী", english: "Turtle" },
  { id: 114, word: "কুমির", parts: ["কু", "মি", "র"], emoji: "🐊", phase: 12, phaseTitle: "ধাপ ১২: জলজ প্রাণী", english: "Crocodile" },
  { id: 115, word: "ইলিশ", parts: ["ই", "লি", "শ"], emoji: "🐟", phase: 12, phaseTitle: "ধাপ ১২: জলজ প্রাণী", english: "Hilsa Fish" },
  { id: 116, word: "কাতলা", parts: ["কা", "ত", "লা"], emoji: "🐠", phase: 12, phaseTitle: "ধাপ ১২: জলজ প্রাণী", english: "Katla Fish" },
  { id: 117, word: "বোয়াল", parts: ["বো", "য়া", "ল"], emoji: "🐡", phase: 12, phaseTitle: "ধাপ ১২: জলজ প্রাণী", english: "Boal Fish" },
  { id: 118, word: "চিংড়ি", parts: ["চি", "ঙ্গ", "ড়ি"], emoji: "🦐", phase: 12, phaseTitle: "ধাপ ১২: জলজ প্রাণী", english: "Shrimp" },
  { id: 119, word: "শিংমাছ", parts: ["শি", "ং", "মা", "ছ"], emoji: "🐟", phase: 12, phaseTitle: "ধাপ ১২: জলজ প্রাণী", english: "Catfish" },
  { id: 120, word: "অক্টোপাস", parts: ["অ", "ক্টো", "পা", "স"], emoji: "🐙", phase: 12, phaseTitle: "ধাপ ১২: জলজ প্রাণী", english: "Octopus" },

  // ধাপ ১৩: বিভিন্ন পেশার মানুষ
  { id: 121, word: "ডাক্তার", parts: ["ডা", "ক্তা", "র"], emoji: "👨‍⚕️", phase: 13, phaseTitle: "ধাপ ১৩: বিভিন্ন পেশার মানুষ", english: "Doctor" },
  { id: 122, word: "পুলিশ", parts: ["পু", "লি", "শ"], emoji: "👮", phase: 13, phaseTitle: "ধাপ ১৩: বিভিন্ন পেশার মানুষ", english: "Police" },
  { id: 123, word: "শিক্ষক", parts: ["শি", "ক্ষ", "ক"], emoji: "🧑‍🏫", phase: 13, phaseTitle: "ধাপ ১৩: বিভিন্ন পেশার মানুষ", english: "Teacher" },
  { id: 124, word: "কৃषक", parts: ["কৃ", "ষ", "ক"], emoji: "👨‍🌾", phase: 13, phaseTitle: "ধাপ ১৩: বিভিন্ন পেশার মানুষ", english: "Farmer" },
  { id: 125, word: "ধীবর", parts: ["ধী", "ব", "র"], emoji: "🎣", phase: 13, phaseTitle: "ধাপ ১৩: বিভিন্ন পেশার মানুষ", english: "Fisherman" },
  { id: 126, word: "চর্মকার", parts: ["চ", "ರ್্ম", "কা", "র"], emoji: "👞", phase: 13, phaseTitle: "ধাপ ১৩: বিভিন্ন পেশার মানুষ", english: "Cobbler" },
  { id: 127, word: "কুমার", parts: ["কু", "মা", "র"], emoji: "🏺", phase: 13, phaseTitle: "ধাপ ১৩: বিভিন্ন পেশার মানুষ", english: "Potter" },
  { id: 128, word: "দর্জি", parts: ["দ", "র্জি"], emoji: "🪡", phase: 13, phaseTitle: "ধাপ ১৩: বিভিন্ন পেশার মানুষ", english: "Tailor" },
  { id: 129, word: "চালক", parts: ["চা", "ল", "ক"], emoji: "🧑‍✈️", phase: 13, phaseTitle: "ধাপ ১৩: বিভিন্ন পেশার মানুষ", english: "Driver" },
  { id: 130, word: "নাপিত", parts: ["না", "পি", "ত"], emoji: "💈", phase: 13, phaseTitle: "ধাপ ১৩: বিভিন্ন পেশার মানুষ", english: "Barber" },

  // ধাপ ১৪: বাদ্যযন্ত্র ও খেলাধুলা
  { id: 131, word: "তবলা", parts: ["ত", "ব", "লা"], emoji: "🥁", phase: 14, phaseTitle: "ধাপ ১৪: বাদ্যযন্ত্র ও খেলাধুলা", english: "Tabla" },
  { id: 132, word: "গিটার", parts: ["গি", "টা", "র"], emoji: "🎸", phase: 14, phaseTitle: "ধাপ ১৪: বাদ্যযন্ত্র ও খেলাধুলা", english: "Guitar" },
  { id: 133, word: "বেহালা", parts: ["বে", "হা", "লা"], emoji: "🎻", phase: 14, phaseTitle: "ধাপ ১৪: বাদ্যযন্ত্র ও খেলাধুলা", english: "Violin" },
  { id: 134, word: "একতারা", parts: ["এ", "ক", "তা", "রা"], emoji: "🪕", phase: 14, phaseTitle: "ধাপ ১৪: বাদ্যযন্ত্র ও খেলাধুলা", english: "Ektara" },
  { id: 135, word: "হারমোনিয়াম", parts: ["হা", "র", "মো", "নি", "য়া", "ম"], emoji: "🎹", phase: 14, phaseTitle: "ধাপ ১৪: বাদ্যযন্ত্র ও খেলাধুলা", english: "Harmonium" },
  { id: 136, word: "ফুটবল", parts: ["ফু", "ট", "ব", "ল"], emoji: "⚽", phase: 14, phaseTitle: "ধাপ ১৪: বাদ্যযন্ত্র ও খেলাধুলা", english: "Football" },
  { id: 137, word: "ক্রিকেট", parts: ["ক্রি", "কে", "ট"], emoji: "🏏", phase: 14, phaseTitle: "ধাপ ১৪: বাদ্যযন্ত্র ও খেলাধুলা", english: "Cricket" },
  { id: 138, word: "ব্যাডমিন্টন", parts: ["ব্যা", "ড", "মি", "ন্ট", "ন"], emoji: "🏸", phase: 14, phaseTitle: "ধাপ ১৪: বাদ্যযন্ত্র ও খেলাধুলা", english: "Badminton" },
  { id: 139, word: "ক্যারাম", parts: ["ক্যা", "রা", "ম"], emoji: "🎯", phase: 14, phaseTitle: "ধাপ ১৪: বাদ্যযন্ত্র ও খেলাধুলা", english: "Carrom" },
  { id: 140, word: "ঢোলক", parts: ["ঢো", "ল", "ক"], emoji: "🥁", phase: 14, phaseTitle: "ধাপ ১৪: বাদ্যযন্ত্র ও খেলাধুলা", english: "Dholak" },

  // ধাপ ১৫: গুরুত্বপূর্ণ স্থাপনা ও স্থান
  { id: 141, word: "বিদ্যালয়", parts: ["বি", "দ্যা", "ল", "য়"], emoji: "🏫", phase: 15, phaseTitle: "ধাপ ১৫: গুরুত্বপূর্ণ স্থাপনা ও স্থান", english: "School" },
  { id: 142, word: "হাসপাতাল", parts: ["হা", "স", "পা", "তা", "ল"], emoji: "🏥", phase: 15, phaseTitle: "ধাপ ১৫: গুরুত্বপূর্ণ স্থাপনা ও স্থান", english: "Hospital" },
  { id: 143, word: "মসজিদ", parts: ["ম", "স", "জি", "দ"], emoji: "🕌", phase: 15, phaseTitle: "ধাপ ১৫: গুরুত্বপূর্ণ স্থাপনা ও স্থান", english: "Mosque" },
  { id: 144, word: "মন্দির", parts: ["ম", "ন্দি", "র"], emoji: "🛕", phase: 15, phaseTitle: "ধাপ ১৫: গুরুত্বপূর্ণ স্থাপনা ও স্থান", english: "Temple" },
  { id: 145, word: "গির্জা", parts: ["গি", "র্জা"], emoji: "⛪", phase: 15, phaseTitle: "ধাপ ১৫: গুরুত্বপূর্ণ স্থাপনা ও স্থান", english: "Church" },
  { id: 146, word: "জাদুঘর", parts: ["জা", "দু", "ঘ", "র"], emoji: "🏛️", phase: 15, phaseTitle: "ধাপ ১৫: গুরুত্বপূর্ণ স্থাপনা ও স্থান", english: "Museum" },
  { id: 147, word: "পাঠাগার", parts: ["পা", "ঠা", "গা", "র"], emoji: "📚", phase: 15, phaseTitle: "ধাপ ১৫: গুরুত্বপূর্ণ স্থাপনা ও স্থান", english: "Library" },
  { id: 148, word: "রেলস্টেশন", parts: ["রে", "ল", "স্টে", "শ", "ন"], emoji: "🚉", phase: 15, phaseTitle: "ধাপ ১৫: গুরুত্বপূর্ণ স্থাপনা ও স্থান", english: "Railway Station" },
  { id: 149, word: "বিমানবন্দর", parts: ["বি", "মা", "ন", "ব", "ন্দ", "র"], emoji: "🛫", phase: 15, phaseTitle: "ধাপ ১৫: গুরুত্বপূর্ণ স্থাপনা ও স্থান", english: "Airport" },
  { id: 150, word: "চিড়িয়াখানা", parts: ["চি", "ড়ি", "য়া", "খা", "না"], emoji: "🦁", phase: 15, phaseTitle: "ধাপ ১৫: গুরুত্বপূর্ণ স্থাপনা ও স্থান", english: "Zoo" },

  // ধাপ ১৬: মহাকাশ ও প্রাথমিক বিজ্ঞান
  { id: 151, word: "পৃথিবী", parts: ["পৃ", "থি", "বী"], emoji: "🌍", phase: 16, phaseTitle: "ধাপ ১৬: মহাকাশ ও প্রাথমিক বিজ্ঞান", english: "Earth" },
  { id: 152, word: "সূর্য", parts: ["সূ", "র্য"], emoji: "☀️", phase: 16, phaseTitle: "ধাপ ১৬: মহাকাশ ও প্রাথমিক বিজ্ঞান", english: "Sun" },
  { id: 153, word: "নক্ষত্র", parts: ["ন", "ক্ষ", "ত্র"], emoji: "⭐", phase: 16, phaseTitle: "ধাপ ১৬: মহাকাশ ও প্রাথমিক বিজ্ঞান", english: "Star" },
  { id: 154, word: "রকেট", parts: ["র", "কে", "ট"], emoji: "🚀", phase: 16, phaseTitle: "ধাপ ১৬: মহাকাশ ও প্রাথমিক বিজ্ঞান", english: "Rocket" },
  { id: 155, word: "দূরবীন", parts: ["দূ", "র", "বী", "ন"], emoji: "🔭", phase: 16, phaseTitle: "ধাপ ১৬: মহাকাশ ও প্রাথমিক বিজ্ঞান", english: "Telescope" },
  { id: 156, word: "অণুবীক্ষণ", parts: ["অ", "ণু", "বী", "ক্ষ", "ণ"], emoji: "🔬", phase: 16, phaseTitle: "ধাপ ১৬: মহাকাশ ও প্রাথমিক বিজ্ঞান", english: "Microscope" },
  { id: 157, word: "স্যাটেলাইট", parts: ["স্যা", "টে", "লা", "ই", "ট"], emoji: "🛰️", phase: 16, phaseTitle: "ধাপ ১৬: মহাকাশ ও প্রাথমিক বিজ্ঞান", english: "Satellite" },
  { id: 158, word: "রোবট", parts: ["রো", "ব", "ট"], emoji: "🤖", phase: 16, phaseTitle: "ধাপ ১৬: মহাকাশ ও প্রাথমিক বিজ্ঞান", english: "Robot" },
  { id: 159, word: "চুম্বক", parts: ["চু", "ম্ব", "ক"], emoji: "🧲", phase: 16, phaseTitle: "ধাপ ১৬: মহাকাশ ও প্রাথমিক বিজ্ঞান", english: "Magnet" },
  { id: 160, word: "থার্মোমিটার", parts: ["থা", "র্মো", "মি", "টা", "র"], emoji: "🌡️", phase: 16, phaseTitle: "ধাপ ১৬: মহাকাশ ও প্রাথমিক বিজ্ঞান", english: "Thermometer" },

  // ধাপ ১৭: জাতীয় ও ঐতিহাসিক প্রতীক
  { id: 161, word: "স্মৃতিসৌধ", parts: ["স্মৃ", "তি", "সৌ", "ধ"], emoji: "🛕", phase: 17, phaseTitle: "ধাপ ১৭: জাতীয় ও ঐতিহাসিক প্রতীক", english: "National Monument" },
  { id: 162, word: "রাজপ্রাসাদ", parts: ["রা", "জ", "প্র", "সা", "দ"], emoji: "🏰", phase: 17, phaseTitle: "ধাপ ১৭: জাতীয় ও ঐতিহাসিক প্রতীক", english: "Palace" },
  { id: 163, word: "দুর্গ", parts: ["দু", "র্গ"], emoji: "🏰", phase: 17, phaseTitle: "ধাপ ১৭: জাতীয় ও ঐতিহাসিক প্রতীক", english: "Fort" },
  { id: 164, word: "মিনার", parts: ["মি", "na", "র"], emoji: "🛕", phase: 17, phaseTitle: "ধাপ ১৭: জাতীয় ও ঐতিহাসিক প্রতীক", english: "Monument" },
  { id: 165, word: "ভাস্কর্য", parts: ["ভা", "স্ক", "র্য"], emoji: "🗽", phase: 17, phaseTitle: "ধাপ ১৭: জাতীয় ও ঐতিহাসিক প্রতীক", english: "Sculpture" },
  { id: 166, word: "পিরামিড", parts: ["পি", "রা", "মি", "ড"], emoji: "🔺", phase: 17, phaseTitle: "ধাপ ১৭: জাতীয় ও ঐতিহাসিক প্রতীক", english: "Pyramid" },
  { id: 167, word: "পতাকা", parts: ["প", "তা", "কা"], emoji: "🇧🇩", phase: 17, phaseTitle: "ধাপ ১৭: জাতীয় ও ঐতিহাসিক প্রতীক", english: "Flag" },
  { id: 168, word: "সংসদ", parts: ["সং", "স", "দ"], emoji: "🏛️", phase: 17, phaseTitle: "ধাপ ১৭: জাতীয় ও ঐতিহাসিক প্রতীক", english: "Parliament" },
  { id: 169, word: "স্মৃতিস্তম্ভ", parts: ["স্মৃ", "তি", "স্ত", "ম্ভ"], emoji: "🪦", phase: 17, phaseTitle: "ধাপ ১৭: জাতীয় ও ঐতিহাসিক প্রতীক", english: "Memorial column" },
  { id: 170, word: "কুঁড়েঘর", parts: ["কুঁ", "ড়ে", "ঘ", "র"], emoji: "🛖", phase: 17, phaseTitle: "ধাপ ১৭: জাতীয় ও ঐতিহাসিক প্রতীক", english: "Cottage" },

  // ধাপ ১৮: প্রাকৃতিক দুর্যোগ ও আবহাওয়া
  { id: 171, word: "ভূমিকম্প", parts: ["ভূ", "মি", "ক", "ম্প"], emoji: "🫨", phase: 18, phaseTitle: "ধাপ ১৮: প্রাকৃতিক দুর্যোগ ও আবহাওয়া", english: "Earthquake" },
  { id: 172, word: "ঘূর্ণিঝড়", parts: ["ঘূ", "র্ণি", "ঝ", "ড়"], emoji: "🌪️", phase: 18, phaseTitle: "ধাপ ১৮: প্রাকৃতিক দুর্যোগ ও আবহাওয়া", english: "Cyclone" },
  { id: 173, word: "জলোচ্ছ্বাস", parts: ["জ", "লো", "চ্ছ্বা", "স"], emoji: "🌊", phase: 18, phaseTitle: "ধাপ ১৮: প্রাকৃতিক দুর্যোগ ও আবহাওয়া", english: "Tidal Bore" },
  { id: 174, word: "বজ্রপাত", parts: ["ব", "জ্র", "পা", "ত"], emoji: "⚡", phase: 18, phaseTitle: "ধাপ ১৮: প্রাকৃতিক দুর্যোগ ও আবহাওয়া", english: "Thunderbolt" },
  { id: 175, word: "অনাবৃষ্টি", parts: ["অ", "না", "বৃ", "ষ্টি"], emoji: "☀️", phase: 18, phaseTitle: "ধাপ ১৮: প্রাকৃতিক দুর্যোগ ও আবহাওয়া", english: "Drought" },
  { id: 176, word: "তুষারপাত", parts: ["তু", "ষা", "র", "পা", "ত"], emoji: "❄️", phase: 18, phaseTitle: "ধাপ ১৮: প্রাকৃতিক দুর্যোগ ও আবহাওয়া", english: "Snowfall" },
  { id: 177, word: "রামধনু", parts: ["রা", "ম", "ধ", "নু"], emoji: "🌈", phase: 18, phaseTitle: "ধাপ ১৮: প্রাকৃতিক দুর্যোগ ও আবহাওয়া", english: "Rainbow" },
  { id: 178, word: "জলপ্রপাত", parts: ["জ", "ল", "প্র", "পা", "ত"], emoji: "🏞️", phase: 18, phaseTitle: "ধাপ ১৮: প্রাকৃতিক দুর্যোগ ও আবহাওয়া", english: "Waterfall" },
  { id: 179, word: "আগ্নেয়গিরি", parts: ["আ", "গ্নে", "য়", "গি", "রি"], emoji: "🌋", phase: 18, phaseTitle: "ধাপ ১৮: প্রাকৃতিক দুর্যোগ ও আবহাওয়া", english: "Volcano" },
  { id: 180, word: "মরুভূমি", parts: ["ম", "রু", "ভূ", "মি"], emoji: "🏜️", phase: 18, phaseTitle: "ধাপ ১৮: প্রাকৃতিক দুর্যোগ ও আবহাওয়া", english: "Desert" },

  // ধাপ ১৯: আধুনিক প্রযুক্তি ও ইলেকট্রনিক্স
  { id: 181, word: "কম্পিউটার", parts: ["কম", "পিউ", "টা", "র"], emoji: "💻", phase: 19, phaseTitle: "ধাপ ১৯: আধুনিক প্রযুক্তি ও ইলেকট্রনিক্স", english: "Computer" },
  { id: 182, word: "টেলিভিশন", parts: ["টে", "লি", "ভি", "শ", "ন"], emoji: "📺", phase: 19, phaseTitle: "ধাপ ১৯: আধুনিক প্রযুক্তি ও ইলেকট্রনিক্স", english: "Television" },
  { id: 183, word: "মোবাইল", parts: ["মো", "বা", "ই", "ল"], emoji: "📱", phase: 19, phaseTitle: "ধাপ ১৯: আধুনিক প্রযুক্তি ও ইলেকট্রনিক্স", english: "Mobile" },
  { id: 184, word: "কীবোর্ড", parts: ["কী", "বো", "র্ড"], emoji: "⌨️", phase: 19, phaseTitle: "ধাপ ১৯: আধুনিক প্রযুক্তি ও ইলেকট্রনিক্স", english: "Keyboard" },
  { id: 185, word: "ক্যামেরা", parts: ["ক্যা", "মে", "রা"], emoji: "📷", phase: 19, phaseTitle: "ধাপ ১৯: আধুনিক প্রযুক্তি ও ইলেকট্রনিক্স", english: "Camera" },
  { id: 186, word: "জেনারেটর", parts: ["জে", "না", "ре", "ট", "র"], emoji: "⚡", phase: 19, phaseTitle: "ধাপ ১৯: আধুনিক প্রযুক্তি ও ইলেকট্রনিক্স", english: "Generator" },
  { id: 187, word: "লিফট", parts: ["লি", "ফট"], emoji: "🛗", phase: 19, phaseTitle: "ধাপ ১৯: আধুনিক প্রযুক্তি ও ইলেকট্রনিক্স", english: "Elevator" },
  { id: 188, word: "রেফ্রিজারেটর", parts: ["রে", "ফ্রি", "জা", "রে", "ট", "র"], emoji: "❄️", phase: 19, phaseTitle: "ধাপ ১৯: আধুনিক প্রযুক্তি ও ইলেকট্রনিক্স", english: "Refrigerator" },
  { id: 189, word: "প্রজেক্টর", parts: ["প্র", "জে", "ক্ট", "র"], emoji: "📽️", phase: 19, phaseTitle: "ধাপ ১৯: আধুনিক প্রযুক্তি ও ইলেকট্রনিক্স", english: "Projector" },
  { id: 190, word: "হেডফোন", parts: ["হে", "ড", "ফো", "ন"], emoji: "🎧", phase: 19, phaseTitle: "ধাপ ১৯: আধুনিক প্রযুক্তি ও ইলেকট্রনিক্স", english: "Headphones" },

  // ধাপ ২০: উচ্চতর বৈজ্ঞানিক ও পরিবেশগত শব্দ
  { id: 191, word: "মহাকাশচারী", parts: ["ম", "হা", "কা", "শ", "চা", "রী"], emoji: "🧑‍🚀", phase: 20, phaseTitle: "ধাপ ২০: উচ্চতর বৈজ্ঞানিক ও পরিবেশগত শব্দ", english: "Astronaut" },
  { id: 192, word: "পর্বতারোহী", parts: ["প", "র্ব", "তা", "রো", "হী"], emoji: "🧗", phase: 20, phaseTitle: "ধাপ ২০: উচ্চতর বৈজ্ঞানিক ও পরিবেশগত শব্দ", english: "Mountaineer" },
  { id: 193, word: "প্রত্নতাত্ত্বিক", parts: ["প্র", "ত্ন", "তা", "ত্তি", "ক"], emoji: "🕵️", phase: 20, phaseTitle: "ধাপ ২০: উচ্চতর বৈজ্ঞানিক ও পরিবেশগত শব্দ", english: "Archaeologist" },
  { id: 194, word: "হিমবাহ", parts: ["হি", "ম", "বা", "h"], emoji: "🏔️", phase: 20, phaseTitle: "ধাপ ২০: উচ্চতর বৈজ্ঞানিক ও পরিবেশগত শব্দ", english: "Glacier" },
  { id: 195, word: "জলহস্তী", parts: ["জ", "ল", "হ", "স্তী"], emoji: "🦛", phase: 20, phaseTitle: "ধাপ ২০: উচ্চতর বৈজ্ঞানিক ও পরিবেশগত শব্দ", english: "Hippopotamus" },
  { id: 196, word: "গন্ডার", parts: ["গ", "ন্ডা", "র"], emoji: "🦏", phase: 20, phaseTitle: "ধাপ ২০: উচ্চতর বৈজ্ঞানিক ও পরিবেশগত শব্দ", english: "Rhinoceros" },
  { id: 197, word: "সালোকসংশ্লেষণ", parts: ["সা", "লো", "ক", "সং", "শ্লে", "ষ", "ণ"], emoji: "🌱", phase: 20, phaseTitle: "ধাপ ২০: উচ্চতর বৈজ্ঞানিক ও পরিবেশগত শব্দ", english: "Photosynthesis" },
  { id: 198, word: "জলবায়ু", parts: ["জ", "ল", "বা", "য়ু"], emoji: "🌏", phase: 20, phaseTitle: "ধাপ ২০: উচ্চতর বৈজ্ঞানিক ও পরিবেশগত শব্দ", english: "Climate" },
  { id: 199, word: "অভয়ারণ্য", parts: ["অ", "ভ", "য়া", "র", "ণ্য"], emoji: "🏞️", phase: 20, phaseTitle: "ধাপ ২০: উচ্চতর বৈজ্ঞানিক ও পরিবেশগত শব্দ", english: "Sanctuary" },
  { id: 200, word: "বাস্তুতন্ত্র", parts: ["বা", "স্তু", "ত", "ন্ত্র"], emoji: "🌿", phase: 20, phaseTitle: "ধাপ ২০: উচ্চতর বৈজ্ঞানিক ও পরিবেশগত শব্দ", english: "Ecosystem" }
];
