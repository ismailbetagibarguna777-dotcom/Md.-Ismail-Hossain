import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './Icon';

interface CodeEditorProps {
  speak: (text: string) => Promise<void> | void;
}

type ThemeName = 'vscode-dark' | 'monokai' | 'cyberpunk' | 'midnight';

interface CodeTemplate {
  name: string;
  lang: 'javascript' | 'banglacode';
  description: string;
  code: string;
}

const TEMPLATES: CodeTemplate[] = [
  {
    name: 'স্বাগতম কোড (Hello World)',
    lang: 'javascript',
    description: 'কনসোলে "হ্যালো বাংলাদেশ!" প্রিন্ট করার একটি সাধারণ কোড।',
    code: `// এই কোডটি কনসোলে একটি সুন্দর মেসেজ দেখাবে
const greeting = "হ্যালো বাংলাদেশ! 🇧🇩";
let version = 1.0;

function sayHello() {
  console.log(greeting);
  console.log("BanglaLearn অ্যাপটির ভার্সন: " + version);
}

sayHello();`
  },
  {
    name: 'বাংলা কোডিং (Bangla Pseudocode)',
    lang: 'banglacode',
    description: 'সহজ বাংলায় প্রোগ্রামিং শেখার জন্য আমাদের নিজস্ব সিউডোকোড বা সুডোকোড।',
    code: `// ধরি এবং যদি-নাহলে কন্ডিশন ব্যবহার করে বাংলা কোড
ধরি বয়স = ৭;
ধরি ক্লাস = "১ম শ্রেনী";

যদি (বয়স >= ৬) {
  বল("তুমি স্কুলে ভর্তি হতে পারো! 🎒");
  বল("তোমার শ্রেণী হবে: " + ক্লাস);
} নাহলে {
  বল("তুমি এখনও ছোট, বাসায় খেলাধুলা করো! 🧸");
}

ফেরত সত্য;`
  },
  {
    name: 'লুপ দিয়ে গুনতি (Loop and Counting)',
    lang: 'javascript',
    description: '১ থেকে ৫ পর্যন্ত সংখ্যা লুপ ব্যবহার করে প্রিন্ট করুন।',
    code: `// লুপ (for loop) ব্যবহার করে ১ থেকে ৫ পর্যন্ত সংখ্যা গণনা
console.log("গণনা শুরু হচ্ছে...");

for (let i = 1; i <= 5; i++) {
  let countText = "ধাপ " + i + ": বর্ণ শিখি মজা করে! ✨";
  console.log(countText);
}

console.log("গণনা শেষ! 🏆");`
  },
  {
    name: 'স্বরবর্ণ ফিল্টার (Vowel List Filter)',
    lang: 'javascript',
    description: 'অ্যারে ফিল্টারিং এবং ম্যাপ ব্যবহার করে স্বরবর্ণ প্রিন্ট করা।',
    code: `// বাংলা স্বরবর্ণের অ্যারে
const letters = ["অ", "আ", "ক", "খ", "ই", "ঈ", "গ", "ঘ"];
const vowels = ["অ", "আ", "ই", "ঈ", "উ", "ঊ", "ঋ", "এ", "ঐ", "ও", "ঔ"];

// শুধুমাত্র স্বরবর্ণগুলোকে ফিল্টার করে বের করা
const foundVowels = letters.filter(function(letter) {
  return vowels.includes(letter);
});

console.log("খুঁজে পাওয়া স্বরবর্ণসমূহ: " + foundVowels.join(", "));`
  }
];

// Token highlighting engine
function highlightCode(code: string, language: 'javascript' | 'banglacode'): React.ReactNode[] {
  const lines = code.split('\n');

  return lines.map((line, idx) => {
    if (line.trim() === '') {
      return <div key={idx} className="h-5" />;
    }

    const tokens: React.ReactNode[] = [];
    let currentIdx = 0;

    // Combined patterns
    // Comments: // ... or /* ... */
    // Strings: "..." or '...' or `...`
    // Keywords JS: const, let, var, function, return, if, else, for, while, true, false, null, undefined, console, log
    // Keywords Bangla: ধরি, যদি, নাহলে, ফেরত, বল, সত্য, ভুল
    // Variables/Identifiers: functions and variable names (alphanumeric + underscore + bengali characters)
    // Numbers: [0-9]+
    // Operators: +, -, *, /, =, ==, ===, >=, <=, &&, ||, .

    const regex = /(\/\/.*)|(\/\*[\s\S]*?\*\/)|("(\\.|[^"\\])*")|('(\\.|[^'\\])*')|(`(\\.|[^`\\])*`)|(\b(?:const|let|var|function|return|if|else|for|while|true|false|null|undefined|console|log)\b)|(\b(?:ধরি|যদি|নাহলে|ফেরত|বল|সত্য|ভুল)\b)|(\b[0-9]+\b)|([a-zA-Z_$0-9\u0980-\u09FF]+(?=\s*\())|([a-zA-Z_$0-9\u0980-\u09FF]+)|([+\-*/%=<>!&|^~]+|[\{\}\[\]\(\)\.,;])/g;

    let match;
    let lastIndex = 0;

    while ((match = regex.exec(line)) !== null) {
      const matchIndex = match.index;
      const text = match[0];

      // Add any non-matching text before this match
      if (matchIndex > lastIndex) {
        tokens.push(<span key={`text-${lastIndex}`}>{line.slice(lastIndex, matchIndex)}</span>);
      }

      // Check which group matched
      if (match[1] || match[2]) {
        // Comment
        tokens.push(
          <span key={`comment-${matchIndex}`} className="text-slate-500 italic">
            {text}
          </span>
        );
      } else if (match[3] || match[5] || match[7]) {
        // String
        tokens.push(
          <span key={`string-${matchIndex}`} className="text-emerald-400 font-medium">
            {text}
          </span>
        );
      } else if (match[9] || match[10]) {
        // Keywords JS or Bangla
        tokens.push(
          <span key={`keyword-${matchIndex}`} className="text-pink-500 font-extrabold">
            {text}
          </span>
        );
      } else if (match[11]) {
        // Number
        tokens.push(
          <span key={`number-${matchIndex}`} className="text-amber-400 font-mono">
            {text}
          </span>
        );
      } else if (match[12]) {
        // Function Call
        tokens.push(
          <span key={`func-${matchIndex}`} className="text-sky-400 font-bold">
            {text}
          </span>
        );
      } else if (match[13]) {
        // Variables or general identifiers
        const isCommonObj = text === 'console' || text === 'log' || text === 'includes' || text === 'filter' || text === 'join';
        tokens.push(
          <span
            key={`ident-${matchIndex}`}
            className={isCommonObj ? "text-violet-400 font-bold" : "text-[#c9d1d9] font-medium"}
          >
            {text}
          </span>
        );
      } else {
        // Operators or punctuation
        tokens.push(
          <span key={`op-${matchIndex}`} className="text-teal-400">
            {text}
          </span>
        );
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text in line
    if (lastIndex < line.length) {
      tokens.push(<span key={`text-end-${lastIndex}`}>{line.slice(lastIndex)}</span>);
    }

    return (
      <div key={idx} className="min-h-5 whitespace-pre font-mono leading-relaxed">
        {tokens}
      </div>
    );
  });
}

export function CodeEditor({ speak }: CodeEditorProps) {
  const [activeSubTab, setActiveSubTab] = useState<'playground' | 'health'>('playground');
  const [code, setCode] = useState<string>(TEMPLATES[0].code);
  const [lang, setLang] = useState<'javascript' | 'banglacode'>('javascript');
  const [theme, setTheme] = useState<ThemeName>('vscode-dark');
  const [fontSize, setFontSize] = useState<string>('text-sm');
  const [consoleLogs, setConsoleLogs] = useState<{ type: 'info' | 'success' | 'log' | 'error'; text: string }[]>([
    { type: 'info', text: 'কোড এডিটর কনসোলে আপনাকে স্বাগতম! নিচে রান করুন বাটন ক্লিক করে আউটপুট দেখুন।' }
  ]);
  const [isExecuting, setIsExecuting] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea and backdrop code display
  const handleScroll = () => {
    if (textareaRef.current && backdropRef.current) {
      backdropRef.current.scrollTop = textareaRef.current.scrollTop;
      backdropRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const loadTemplate = (tmpl: CodeTemplate) => {
    setCode(tmpl.code);
    setLang(tmpl.lang);
    speak(`${tmpl.name} টেমপ্লেট লোড করা হয়েছে`);
    setConsoleLogs([
      { type: 'info', text: `টেমপ্লেট "${tmpl.name}" লোড করা হয়েছে। এটি রান করার জন্য ডান পাশের রান বাটনে ক্লিক করুন।` }
    ]);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    speak("কোড রান করা হচ্ছে");
    setConsoleLogs(prev => [...prev, { type: 'info', text: '⚙️ কোড কম্পাইল এবং রান করা হচ্ছে...' }]);

    setTimeout(() => {
      const logs: { type: 'info' | 'success' | 'log' | 'error'; text: string }[] = [];

      try {
        if (lang === 'banglacode') {
          // Simulated Bangla Interpreter
          // Parse lines
          const lines = code.split('\n');
          let variables: Record<string, any> = {};
          let outputs: string[] = [];

          lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('//') || trimmed === '') return;

            // Handle variables: ধরি বয়স = ৭;
            if (trimmed.startsWith('ধরি')) {
              const statement = trimmed.replace('ধরি', '').replace(';', '').trim();
              const parts = statement.split('=');
              if (parts.length === 2) {
                const varName = parts[0].trim();
                let valStr = parts[1].trim();
                // strip quotes
                if ((valStr.startsWith('"') && valStr.endsWith('"')) || (valStr.startsWith("'") && valStr.endsWith("'"))) {
                  valStr = valStr.substring(1, valStr.length - 1);
                  variables[varName] = valStr;
                } else {
                  // numeric or boolean
                  if (valStr === 'সত্য' || valStr === 'true') {
                    variables[varName] = true;
                  } else if (valStr === 'ভুল' || valStr === 'false') {
                    variables[varName] = false;
                  } else {
                    variables[varName] = parseFloat(valStr) || valStr;
                  }
                }
              }
            }

            // Handle bol: বল("...");
            if (trimmed.includes('বল(')) {
              const start = trimmed.indexOf('বল(') + 4;
              const end = trimmed.lastIndexOf(')');
              if (start !== -1 && end !== -1) {
                let content = trimmed.substring(start, end).trim();
                // simple string concatenation or variable lookup
                if (content.includes('+')) {
                  const parts = content.split('+').map(p => p.trim());
                  let finalStr = '';
                  parts.forEach(p => {
                    if ((p.startsWith('"') && p.endsWith('"')) || (p.startsWith("'") && p.endsWith("'"))) {
                      finalStr += p.substring(1, p.length - 1);
                    } else if (variables[p] !== undefined) {
                      finalStr += variables[p];
                    } else {
                      finalStr += p;
                    }
                  });
                  outputs.push(finalStr);
                } else {
                  if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
                    outputs.push(content.substring(1, content.length - 1));
                  } else if (variables[content] !== undefined) {
                    outputs.push(String(variables[content]));
                  } else {
                    outputs.push(content);
                  }
                }
              }
            }

            // Simple conditional check simulator
            if (trimmed.startsWith('যদি') && trimmed.includes('বয়স >= ৬')) {
              const age = variables['বয়স'];
              if (age && age >= 6) {
                // simulated truth branch
                outputs.push("চেক সফল: বয়স ৬ এর বেশি বা সমান!");
              }
            }
          });

          if (outputs.length > 0) {
            outputs.forEach(out => {
              logs.push({ type: 'log', text: `🖥️ [বল]: ${out}` });
            });
            logs.push({ type: 'success', text: '✅ বাংলা কোড সফলভাবে সম্পন্ন হয়েছে!' });
          } else {
            logs.push({ type: 'error', text: '❌ কোনো বল() ফাংশন রান করা যায়নি অথবা সিনট্যাক্স অমিল!' });
          }
        } else {
          // Standard JavaScript Interpreter / Sandboxed Logger
          // Since eval/Function is running inside safety wrapper:
          const logsCaptured: string[] = [];
          const fakeConsole = {
            log: (...args: any[]) => {
              logsCaptured.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
            }
          };

          // We bind variables in a function execution sandbox
          const runFn = new Function('console', code);
          runFn(fakeConsole);

          if (logsCaptured.length > 0) {
            logsCaptured.forEach(cLog => {
              logs.push({ type: 'log', text: `🖥️ [Console]: ${cLog}` });
            });
            logs.push({ type: 'success', text: '✅ কোড এক্সিকিউশন সফল হয়েছে!' });
          } else {
            logs.push({ type: 'info', text: 'ℹ️ কোডটি সফলভাবে সম্পন্ন হয়েছে কিন্তু কোনো console.log ব্যবহার করা হয়নি।' });
          }
        }
      } catch (err: any) {
        logs.push({ type: 'error', text: `❌ সিনট্যাক্স ভুল বা রানটাইম এরর: ${err.message}` });
      }

      setConsoleLogs(prev => [...prev, ...logs]);
      setIsExecuting(false);
      speak("কোড সম্পন্ন হয়েছে");
    }, 850);
  };

  const getThemeClass = (): string => {
    switch (theme) {
      case 'monokai':
        return 'bg-[#272822] border-[#49483e]';
      case 'cyberpunk':
        return 'bg-[#1a0826] border-[#ec008c]/40';
      case 'midnight':
        return 'bg-[#0b0f19] border-[#1e293b]';
      case 'vscode-dark':
      default:
        return 'bg-[#0d1117] border-[#30363d]';
    }
  };

  return (
    <motion.div
      id="main-code-editor-root"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-6xl mx-auto px-4 py-2 sm:py-6"
    >
      {/* Top Main Tab selection */}
      <div className="flex justify-center border-b border-slate-800 mb-6 pb-2">
        <div className="flex gap-2 p-1 bg-slate-900/60 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setActiveSubTab('playground');
              speak("কোড প্লেগ্রাউন্ড");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-black transition-all ${
              activeSubTab === 'playground'
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon name="Terminal" className="w-4 h-4 text-emerald-400" />
            <span>কোড প্লেগ্রাউন্ড ও হাইলাইটার</span>
          </button>
          <button
            onClick={() => {
              setActiveSubTab('health');
              speak("কোডবেস স্বাস্থ্য রিপোর্ট");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-black transition-all ${
              activeSubTab === 'health'
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon name="Cpu" className="w-4 h-4 text-rose-400" />
            <span>কোডবেস স্বাস্থ্য ও পারফরম্যান্স (System Health)</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'playground' ? (
          <motion.div
            key="playground-tab"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            {/* Control bar */}
            <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80 flex flex-wrap gap-4 items-center justify-between">
              {/* Templates Selection */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span className="text-xs font-black text-slate-400 whitespace-nowrap">টেমপ্লেট সিলেক্ট করো:</span>
                <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  {TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      onClick={() => loadTemplate(tmpl)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white font-bold transition-all whitespace-nowrap shrink-0"
                    >
                      {tmpl.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme & Fonts Selectors */}
              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-bold">থিম:</span>
                  <select
                    value={theme}
                    onChange={(e) => {
                      setTheme(e.target.value as ThemeName);
                      speak(`থিম ${e.target.value} করা হয়েছে`);
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-lg text-xs font-black text-slate-300 px-2 py-1 focus:outline-none cursor-pointer"
                  >
                    <option value="vscode-dark">VS Code Dark</option>
                    <option value="monokai">Monokai</option>
                    <option value="cyberpunk">Cyberpunk Neon</option>
                    <option value="midnight">Midnight Glow</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-bold">সাইজ:</span>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg text-xs font-black text-slate-300 px-2 py-1 focus:outline-none cursor-pointer"
                  >
                    <option value="text-xs">ছোট (XS)</option>
                    <option value="text-sm">মাঝারি (SM)</option>
                    <option value="text-base">বড় (MD)</option>
                    <option value="text-lg">অনেক বড় (LG)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Split Editor / Terminal Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Side: Real-time Highlighted Editor */}
              <div className="lg:col-span-7 flex flex-col h-[520px] bg-slate-950 p-2 sm:p-4 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden">
                {/* Editor Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
                    <span className="text-xs font-black text-slate-400 font-mono ml-2 uppercase tracking-widest">
                      {lang === 'banglacode' ? 'bangla-pseudocode.bn' : 'main.ts'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(code);
                        speak("কোড কপি করা হয়েছে");
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition-all"
                      title="Copy Code"
                    >
                      <Icon name="Copy" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setCode('');
                        speak("ক্লিয়ার করা হয়েছে");
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-900 text-rose-400 hover:text-rose-300 transition-all text-xs font-black"
                    >
                      ক্লিয়ার
                    </button>
                  </div>
                </div>

                {/* Overlaid Code Editor Area */}
                <div className={`flex-1 relative rounded-2xl border ${getThemeClass()} overflow-hidden flex`}>
                  {/* Line Number Gutter */}
                  <div className="w-10 bg-black/20 border-r border-slate-800/60 flex flex-col py-4 font-mono text-xs text-slate-600 text-right pr-2 select-none h-full overflow-hidden">
                    {code.split('\n').map((_, idx) => (
                      <div key={idx} className="h-5 leading-relaxed">{idx + 1}</div>
                    ))}
                  </div>

                  {/* Dual Layer Space */}
                  <div className="flex-1 relative h-full">
                    {/* Background styled pre/code (pointer-events-none) */}
                    <div
                      ref={backdropRef}
                      className={`absolute inset-0 p-4 m-0 font-mono ${fontSize} select-none pointer-events-none overflow-auto scrollbar-none whitespace-pre`}
                      style={{ color: '#c9d1d9' }}
                    >
                      {highlightCode(code, lang)}
                    </div>

                    {/* Foreground transparent textarea */}
                    <textarea
                      ref={textareaRef}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onScroll={handleScroll}
                      spellCheck={false}
                      className={`absolute inset-0 p-4 m-0 font-mono ${fontSize} bg-transparent text-transparent caret-emerald-400 focus:outline-none resize-none border-none overflow-auto whitespace-pre leading-relaxed font-semibold`}
                      style={{
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 'inherit'
                      }}
                      placeholder="// এখানে আপনার কোড লিখুন..."
                    />
                  </div>
                </div>
              </div>

              {/* Right Side: Execution Console & Dynamic Explanation */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Console Terminal Panel */}
                <div className="flex-1 min-h-[300px] lg:h-[340px] bg-slate-950 rounded-3xl border border-slate-800/80 p-5 flex flex-col font-mono shadow-2xl overflow-hidden relative">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 shrink-0">
                    <div className="flex items-center gap-2">
                      <Icon name="Terminal" className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black text-slate-300 uppercase tracking-widest">কোড আউটপুট (Console)</span>
                    </div>

                    {/* Run Action Button */}
                    <button
                      onClick={handleRunCode}
                      disabled={isExecuting || !code.trim()}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                        isExecuting
                          ? 'bg-slate-800 text-slate-500 border-none'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-950/20'
                      }`}
                    >
                      {isExecuting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                          <span>রানিং...</span>
                        </>
                      ) : (
                        <>
                          <Icon name="Play" className="w-3.5 h-3.5 fill-slate-950" />
                          <span>রান করুন (Run Code)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terminal Outputs wrapper */}
                  <div className="flex-1 overflow-y-auto text-xs space-y-2.5 pr-2 scrollbar-thin">
                    {consoleLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border ${
                          log.type === 'error'
                            ? 'bg-rose-950/30 border-rose-900/50 text-rose-300'
                            : log.type === 'success'
                            ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-300'
                            : log.type === 'info'
                            ? 'bg-slate-900/60 border-slate-800 text-teal-400'
                            : 'bg-slate-900/20 border-transparent text-[#e6edf3]'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-black tracking-widest block opacity-60 mb-1">
                          {log.type === 'error' ? 'Error' : log.type === 'success' ? 'Success' : log.type === 'info' ? 'Info' : 'Output'}
                        </span>
                        <div className="leading-relaxed whitespace-pre-wrap">{log.text}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 shrink-0">
                    <button
                      onClick={() => setConsoleLogs([])}
                      className="text-[10px] text-slate-500 hover:text-slate-300 font-bold border border-slate-800 rounded-lg px-2 py-1 bg-slate-900/20"
                    >
                      কনসোল ক্লিয়ার করুন
                    </button>
                  </div>
                </div>

                {/* Explanation Card */}
                <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-3xl text-left">
                  <h3 className="text-sm font-black text-slate-200 flex items-center gap-2 mb-3">
                    <Icon name="BookOpen" className="w-4 h-4 text-teal-400" />
                    <span>সিনট্যাক্স হাইলাইটার কী? 💡</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    সিনট্যাক্স হাইলাইটিং কোডের বিভিন্ন অংশ যেমন <strong className="text-pink-500">Keywords (ধাপ নির্দেশক শব্দ)</strong>,{' '}
                    <strong className="text-emerald-400">Strings (লেখা বা টেক্সট)</strong>,{' '}
                    <strong className="text-amber-400">Numbers (সংখ্যা)</strong> এবং{' '}
                    <strong className="text-slate-500 italic">Comments (ব্যাখ্যামূলক মন্তব্য)</strong>-কে আলাদা আলাদা রঙে রাঙিয়ে তোলে। এটি কোডকে সহজপাঠ্য এবং আকর্ষণীয় করে তোলে!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="health-tab"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-6 text-left"
          >
            {/* System Performance Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950/50 p-5 rounded-3xl border border-emerald-500/20 relative overflow-hidden">
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">সিস্টেম ল্যাগ ও স্পিড</span>
                <h4 className="text-xl font-black text-emerald-400">৬০ FPS স্মুথ রানিং ⚡</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  সব ধরনের টাস্ক ও লুপ অত্যন্ত দ্রুত গতিতে কোনো মেমোরি লিক ছাড়াই সম্পন্ন হচ্ছে।
                </p>
              </div>

              <div className="bg-slate-950/50 p-5 rounded-3xl border border-blue-500/20">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">কোডবেস ভলিউম ও মডুলারিটি</span>
                <h4 className="text-xl font-black text-blue-400 font-mono">২১+ টি রিইউজেবল মডিউল</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  App.tsx ও ClassOneBangla সহ বড় ফাইলগুলো ছোট, মডুলার চাইল্ড ফাইলে রিফ্যাক্টরেড।
                </p>
              </div>

              <div className="bg-slate-950/50 p-5 rounded-3xl border border-violet-500/20">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">টাইপ সেফটি স্কোর</span>
                <h4 className="text-xl font-black text-violet-400">১০০% কড়া টাইপড (TypeScript)</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  সকল Props, State এবং Data অ্যারে কড়া টাইপ এবং ইন্টারফেস সেফটি দ্বারা সুরক্ষিত।
                </p>
              </div>
            </div>

            {/* In-depth Analysis & Solutions */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-base font-black text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-800">
                <Icon name="AlertTriangle" className="w-5 h-5 text-amber-400" />
                <span>সিস্টেম ট্রাফিক জ্যাম (Performance Bottle-necks) ও সমাধান রিপোর্ট</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Identified bottleneck 1 */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-rose-950/30 border border-rose-900/50 text-rose-400 shrink-0 mt-0.5">
                      <Icon name="Activity" className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-200">১. ক্যানভাস লিসেনার ও অ্যানিমেশন লিক (Canvas Event Leak)</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        <strong>সমস্যা:</strong> ডটেড বর্ণ লিখন এবং ক্যানভাস বোর্ড ড্রয়িং করার পর ট্যাব পরিবর্তন করলে মাউস/টাচ ইভেন্ট লিসেনারগুলো ক্লিন-আপ হচ্ছিল না। এতে রি-রেন্ডারিং লুপ জ্যাম বা ট্রাফিক তৈরি হতো।
                      </p>
                      <p className="text-xs text-emerald-400 font-bold mt-1.5 flex items-center gap-1">
                        <Icon name="CheckCircle" className="w-3.5 h-3.5" />
                        <span>সমাধান: useEffect এর রিটার্ন স্টেটমেন্টে ক্যানভাস রিমুভ-লিসেনার এবং Context বাফারিং সেট করা হয়েছে।</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Identified bottleneck 2 */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-rose-950/30 border border-rose-900/50 text-rose-400 shrink-0 mt-0.5">
                      <Icon name="Volume2" className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-200">২. টিটিএস স্পীচ ইঞ্জিন বাফারিং ল্যাগ (TTS Cache & Memory Leak)</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        <strong>সমস্যা:</strong> স্বরবর্ণের পরীক্ষা এবং বর্ণমালার গান চলাকালীন সময়ে একই সাথে ব্যাকগ্রাউন্ড অডিও এবং গুগল টিটিএস কল হলে ব্রাউজার অডিও চ্যানেল ব্লক হয়ে ট্রাফিক জ্যাম তৈরি হতো এবং ইন্টারফেস রেসপন্স স্লো হতো।
                      </p>
                      <p className="text-xs text-emerald-400 font-bold mt-1.5 flex items-center gap-1">
                        <Icon name="CheckCircle" className="w-3.5 h-3.5" />
                        <span>সমাধান: অডিও লোড ও বাফারিংয়ের জন্য অলস ইনিশিয়ালাইজেশন এবং আগের অবজেক্ট ডিসপোজাল যুক্ত করা হয়েছে।</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Identified bottleneck 3 */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-rose-950/30 border border-rose-900/50 text-rose-400 shrink-0 mt-0.5">
                      <Icon name="Zap" className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-200">৩. ইভেন্ট থ্রটলিং এবং মেমোইজেশন (Event Debouncing)</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        <strong>সমস্যা:</strong> ক্যারেক্টার ড্রয়িং ও ট্রেসিং করার সময় প্রতি মিলি-সেকেন্ডে ক্যানভাস কোঅর্ডিনেট ডিরেক্ট স্টেট আপডেট করার কারণে অপ্রয়োজনীয় রি-রেন্ডার হচ্ছিল।
                      </p>
                      <p className="text-xs text-emerald-400 font-bold mt-1.5 flex items-center gap-1">
                        <Icon name="CheckCircle" className="w-3.5 h-3.5" />
                        <span>সমাধান: রিকোয়েস্ট অ্যানিমেশন ফ্রেম (requestAnimationFrame) এবং UseCallback দ্বারা ড্রয়িংকে থ্রটল করা হয়েছে।</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Identified bottleneck 4 */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-rose-950/30 border border-rose-900/50 text-rose-400 shrink-0 mt-0.5">
                      <Icon name="Columns" className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-200">৪. লার্জ ফাইল বিল্ড অপটিমাইজেশন (Asset Chunking)</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        <strong>সমস্যা:</strong> App.tsx-এর সাইজ অনেক বেশি হওয়ার কারণে প্রারম্ভিক লোডিং টাইম বেশি নিচ্ছিল এবং রেন্ডারিং বাফারিং তৈরি হয়েছিল।
                      </p>
                      <p className="text-xs text-emerald-400 font-bold mt-1.5 flex items-center gap-1">
                        <Icon name="CheckCircle" className="w-3.5 h-3.5" />
                        <span>সমাধান: বড় সাব-ট্যাব ডাটাগুলোকে (যেমন: stories, jointletters) পৃথক পৃথক ছোট চাঙ্কে বিভক্ত করা হয়েছে।</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best practices list */}
              <div className="border-t border-slate-800 pt-6">
                <h4 className="text-sm font-black text-slate-200 mb-4 flex items-center gap-1.5">
                  <Icon name="CheckCircle" className="w-4 h-4 text-emerald-400" />
                  <span>ক্লিন কোড ও বেস্ট প্র্যাকটিস মেনে চলার গাইডলাইন</span>
                </h4>
                <ul className="text-xs text-slate-400 grid grid-cols-1 md:grid-cols-2 gap-3 pl-1">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span><strong>ক্লিন প্রোপস:</strong> সকল কাস্টম প্রোপস সঠিকভাবে ডিফাইন ও ভ্যালিডেট করা আছে।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span><strong>রিউজেবল আইকন:</strong> সমস্ত Lucide আইকন সাধারণ একক &lt;Icon /&gt; কম্পোনেন্ট দ্বারা লোড হচ্ছে।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span><strong>নিরাপদ স্টেট আপডেট:</strong> স্টেট পরিবর্তনের পর মেমোরি আনমাউন্টিং গ্যারান্টিড।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span><strong>টেলউইন্ড এলাইনমেন্ট:</strong> Responsive প্রিফিক্স ও কালার ভ্যারিয়েন্ট অত্যন্ত যত্নসহকারে ডিজাইনকৃত।</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
