import { useState, useEffect, useRef } from 'react';
import { Keyboard, RotateCcw } from 'lucide-react';

const SNIPPETS = [
  `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
  `const fetchData = async (url) => {\n  const res = await fetch(url);\n  return res.json();\n};`,
  `class Stack {\n  constructor() { this.items = []; }\n  push(item) { this.items.push(item); }\n  pop() { return this.items.pop(); }\n}`,
  `const mergeSort = (arr) => {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));\n};`,
  `SELECT name, COUNT(*) as total\nFROM orders\nJOIN users ON orders.user_id = users.id\nGROUP BY name\nHAVING total > 10\nORDER BY total DESC;`,
  `def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: lo = mid + 1\n        else: hi = mid - 1\n    return -1`,
];

export default function TypingTest() {
  const [snippet] = useState(() => SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]);
  const [typed, setTyped] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (started && !done) {
      timerRef.current = setInterval(() => setElapsed(Date.now() - startTime), 100);
    }
    return () => clearInterval(timerRef.current);
  }, [started, done, startTime]);

  const handleInput = (e) => {
    const val = e.target.value;
    if (!started && val.length > 0) { setStarted(true); setStartTime(Date.now()); }
    setTyped(val);
    const correct = val.split('').filter((c, i) => c === snippet[i]).length;
    setAccuracy(val.length ? Math.round((correct / val.length) * 100) : 100);
    if (val === snippet) {
      const mins = (Date.now() - startTime) / 60000;
      setWpm(Math.round(snippet.split(' ').length / mins));
      setDone(true); clearInterval(timerRef.current);
    }
  };

  const reset = () => { setTyped(''); setStarted(false); setDone(false); setElapsed(0); setWpm(0); setAccuracy(100); inputRef.current?.focus(); };

  const chars = snippet.split('');

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg"><Keyboard size={22} className="text-orange-400"/></div>
        <h1 className="text-2xl font-bold text-white">Typing Speed Test</h1>
        <span className="text-sm text-gray-500">Coding Snippets Edition</span>
      </div>

      <div className="flex gap-4 mb-4 text-center">
        {[
          { label: 'WPM', val: done ? wpm : started ? Math.round((typed.split(' ').length / ((elapsed || 1) / 60000))) : '--' },
          { label: 'Accuracy', val: `${accuracy}%` },
          { label: 'Time', val: `${(elapsed / 1000).toFixed(1)}s` },
        ].map(s => (
          <div key={s.label} className="flex-1 bg-[#1a1a2e] border border-orange-900/30 rounded-xl py-3">
            <div className="text-xl font-bold text-white">{s.val}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1a2e] border border-orange-900/30 rounded-2xl p-5 mb-4 font-mono text-sm leading-8 whitespace-pre">
        {chars.map((c, i) => {
          let cls = 'text-gray-600';
          if (i < typed.length) cls = typed[i] === c ? 'text-green-400' : 'bg-red-800/50 text-red-400';
          else if (i === typed.length) cls = 'bg-orange-500/40 text-white';
          return <span key={i} className={cls}>{c}</span>;
        })}
      </div>

      {done ? (
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">🎉 {wpm} WPM — {accuracy}% Accuracy</div>
          <button onClick={reset} className="mt-3 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-xl font-semibold transition">
            Try Again
          </button>
        </div>
      ) : (
        <textarea
          ref={inputRef}
          value={typed}
          onChange={handleInput}
          placeholder="Start typing..."
          rows={5}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          className="w-full bg-[#1a1a2e] border border-orange-900/40 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder-gray-600 resize-none outline-none focus:border-orange-500"
        />
      )}

      <button onClick={reset} className="mt-3 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition">
        <RotateCcw size={13}/> New snippet
      </button>
    </div>
  );
}
