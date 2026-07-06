export interface WordItem {
  word: string;
  emoji: string;
  img: string;
}

export interface AlphabetItem {
  id: string;
  letter: string;
  type: 'vowel' | 'consonant';
  color: string;
  words: WordItem[];
}

export interface KarSignItem {
  vowel: string;
  kar: string;
  example: string;
  meaning: string;
  color: string;
  wordExample?: {
    word: string;
    emoji: string;
  };
}

export interface KarWordsGroup {
  id: string;
  kar: string;
  name: string;
  color: string;
  words: WordItem[];
}



export interface QuizState {
  question: AlphabetItem | null;
  isReverse: boolean;
  options: AlphabetItem[];
  score: number;
  total: number;
  feedback: 'correct' | 'wrong' | null;
  selectedIndex: number | null;
}

export interface ConjunctUsageItem {
  id: string;
  conjunct: string;
  breakdown: string;
  words: string[];
}

export interface KarSentenceItem {
  sentence: string;
  emoji: string;
}

export interface KarSentencesGroup {
  id: string;
  kar: string;
  name: string;
  color: string;
  sentences: KarSentenceItem[];
}

export interface BanglaProgressiveSentence {
  id: string;
  number: number;
  sentence: string;
}

export interface BanglaProgressiveGroup {
  id: string;
  title: string;
  rangeText: string;
  color: string;
  borderColor: string;
  sentences: BanglaProgressiveSentence[];
}

export interface AntonymItem {
  id: string;
  word: string;
  antonym: string;
}

export interface AntonymLevel {
  id: string;
  level: number;
  title: string;
  color: string;
  borderColor: string;
  words: AntonymItem[];
}

export interface SadhuCholitItem {
  id: string;
  sadhu: string;
  cholit: string;
}

export interface SadhuCholitLevel {
  id: string;
  level: number;
  title: string;
  difficulty: 'সহজ' | 'মাঝারি' | 'কঠিন' | 'বাক্য';
  color: string;
  borderColor: string;
  words: SadhuCholitItem[];
}

export interface SynonymItem {
  id: string;
  word: string;
  synonym: string;
}

export interface SynonymLevel {
  id: string;
  level: number;
  title: string;
  color: string;
  borderColor: string;
  words: SynonymItem[];
}



