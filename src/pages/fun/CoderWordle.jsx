import { useState } from 'react';
import { HelpCircle, RotateCcw } from 'lucide-react';

const WORDS = ['ARRAY','CLASS','STACK','QUEUE','REACT','CACHE','QUERY','FETCH','PROXY','TOKEN','MUTEX','YIELD','ASYNC','AWAIT','DEBUG','PARSE','REGEX','SCOPE','CONST','TYPES'];

function pickWord() { return WORDS[Math.floor(Math.random() * WORDS.length)]; }

const COLS = { correct: 'bg-green-700 border-green-600 text-white', present: 'bg-yellow-700 border-yellow-600 text-white', absent: 'bg-gray-700 border-gray-600 text-white', empty: 'bg-transparent border-gray-700 text-white', tbd: 'bg-[#1a1a2e] border-gray-600 text-white' };

function evaluate(guess, target) {
  const res = Array(5).fill('absent');
  const tally = {};
  target.split('').forEach(c => tally[c] = (tally[c] || 0) + 1);
  guess.split('').forEach((c, i) => { if (c === target[i]) { res[i] = 'correct'; tally[c]--; } });
  guess.split('').forEach((c, i) => { if (res[i] !== 'correct' && tally[c] > 0) { res[i] = 'present'; tally[c]--; } });
  return res;
}

export default function CoderWordle() {
  const [target, setTarget] = useState(pickWord);
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = () => {
    if (current.length !== 5 || gameOver) return;
    const g = current.toUpperCase();
    const colors = evaluate(g, target);
    const newGuesses = [...guesses, { word: g, colors }];
    setGuesses(newGuesses);
    setCurrent('');
    if (g === target) { setWon(true); setGameOver(true); }
    else if (newGuesses.length >= 6) { setGameOver(true); }
  };

  const handleKey = (k) => {
    if (gameOver) return;
    if (k === 'ENTER') { if (current.length === 5) submit(); else { setShake(true); setTimeout(() => setShake(false), 500); } }
    else if (k === 'BACKSPACE') setCurrent(c => c.slice(0, -1));
    else if (/^[A-Z]$/.test(k) && current.length < 5) setCurrent(c => c + k);
  };

  const reset = () => { setTarget(pickWord()); setGuesses([]); setCurrent(''); setGameOver(false); setWon(false); };

  const rows = [...guesses, ...(gameOver ? [] : [{ word: current.padEnd(5), colors: Array(5).fill('tbd'), current: true }]), ...Array(Math.max(0, 6 - guesses.length - (gameOver ? 0 : 1))).fill(null)];

  const KEYS = [['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['ENTER','Z','X','C','V','B','N','M','BACKSPACE']];
  const keyStatus = {};
  guesses.forEach(g => g.word.split('').forEach((c, i) => {
    const cur = keyStatus[c];
    if (cur !== 'correct') keyStatus[c] = g.colors[i];
  }));

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-lg"><HelpCircle size={22} className="text-orange-400"/></div>
          <h1 className="text-2xl font-bold text-white">Coder Wordle</h1>
        </div>
        <button onClick={reset} className="text-gray-500 hover:text-gray-300 transition"><RotateCcw size={18}/></button>
      </div>

      <div className="grid gap-1.5 mb-6">
        {rows.map((row, ri) => (
          <div key={ri} className={`grid grid-cols-5 gap-1.5 ${row?.current && shake ? 'animate-pulse' : ''}`}>
            {(row ? row.word.split('') : Array(5).fill('')).map((c, ci) => (
              <div key={ci} className={`h-14 border-2 flex items-center justify-center font-bold text-xl rounded transition-all ${COLS[row ? row.colors[ci] : 'empty']}`}>
                {c}
              </div>
            ))}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="text-center mb-4">
          <p className={`text-lg font-bold ${won ? 'text-green-400' : 'text-red-400'}`}>
            {won ? '🎉 Correct!' : `Answer: ${target}`}
          </p>
          <button onClick={reset} className="mt-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition">Play Again</button>
        </div>
      )}

      <div className="space-y-1.5">
        {KEYS.map((row, ri) => (
          <div key={ri} className="flex gap-1 justify-center">
            {row.map(k => {
              const s = keyStatus[k];
              return (
                <button key={k} onClick={() => handleKey(k)}
                  className={`${k.length > 1 ? 'px-2 text-xs' : 'w-9'} h-12 rounded font-bold text-sm transition ${s === 'correct' ? 'bg-green-700 text-white' : s === 'present' ? 'bg-yellow-700 text-white' : s === 'absent' ? 'bg-gray-700 text-gray-400' : 'bg-[#2a2a3e] text-white hover:bg-[#3a3a4e]'}`}>
                  {k === 'BACKSPACE' ? '⌫' : k}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
