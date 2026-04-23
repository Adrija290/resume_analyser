import { useState, useEffect } from 'react';
import { Target, Plus, Trash2, CheckCircle2 } from 'lucide-react';

const STORAGE = 'leet_tracker';
const TODAY = new Date().toDateString();

export default function LeetcodeTracker() {
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE) || '{}'); } catch { return {}; }
  });
  const [problem, setProblem] = useState('');
  const [diff, setDiff] = useState('Medium');
  const [note, setNote] = useState('');

  const save = (d) => { setData(d); localStorage.setItem(STORAGE, JSON.stringify(d)); };

  const addProblem = () => {
    if (!problem.trim()) return;
    const entry = { name: problem.trim(), diff, note, date: TODAY, id: Date.now() };
    save({ ...data, [TODAY]: [...(data[TODAY] || []), entry] });
    setProblem(''); setNote('');
  };

  const remove = (date, id) => {
    save({ ...data, [date]: data[date].filter(p => p.id !== id) });
  };

  const allDates = Object.keys(data).sort((a, b) => new Date(b) - new Date(a));
  const streak = (() => {
    let s = 0, d = new Date();
    while (true) {
      const k = d.toDateString();
      if (!data[k] || data[k].length === 0) break;
      s++; d.setDate(d.getDate() - 1);
    }
    return s;
  })();
  const total = Object.values(data).flat().length;
  const byDiff = { Easy: 0, Medium: 0, Hard: 0 };
  Object.values(data).flat().forEach(p => byDiff[p.diff]++);

  const DIFF_COLOR = { Easy: 'text-green-400', Medium: 'text-yellow-400', Hard: 'text-red-400' };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg"><Target size={22} className="text-orange-400"/></div>
        <h1 className="text-2xl font-bold text-white">LeetCode Streak Tracker</h1>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-[#1a1a2e] border border-orange-900/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">🔥 {streak}</div>
          <div className="text-xs text-gray-500">Day Streak</div>
        </div>
        <div className="bg-[#1a1a2e] border border-orange-900/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{total}</div>
          <div className="text-xs text-gray-500">Total Solved</div>
        </div>
        <div className="bg-[#1a1a2e] border border-orange-900/30 rounded-xl p-4 text-center">
          <div className="text-sm font-bold">
            <span className="text-green-400">{byDiff.Easy}</span>
            <span className="text-gray-600 mx-1">/</span>
            <span className="text-yellow-400">{byDiff.Medium}</span>
            <span className="text-gray-600 mx-1">/</span>
            <span className="text-red-400">{byDiff.Hard}</span>
          </div>
          <div className="text-xs text-gray-500">E / M / H</div>
        </div>
      </div>

      <div className="bg-[#1a1a2e] border border-orange-900/30 rounded-2xl p-5 mb-5">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Log Today's Problem</h3>
        <div className="flex gap-2 mb-2">
          <input value={problem} onChange={e => setProblem(e.target.value)} onKeyDown={e => e.key === 'Enter' && addProblem()}
            placeholder="Problem name or number..."
            className="flex-1 bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-orange-500"/>
          <select value={diff} onChange={e => setDiff(e.target.value)}
            className="bg-[#0f0f1a] border border-white/10 rounded-lg px-2 py-2 text-sm text-white outline-none focus:border-orange-500">
            {['Easy', 'Medium', 'Hard'].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <input value={note} onChange={e => setNote(e.target.value)} placeholder="Notes (optional)..."
            className="flex-1 bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-orange-500"/>
          <button onClick={addProblem} className="bg-orange-600 hover:bg-orange-700 text-white px-4 rounded-lg transition flex items-center gap-1 text-sm font-semibold">
            <Plus size={14}/> Add
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {allDates.map(date => (
          <div key={date} className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{date}</span>
              <span className="text-xs text-gray-600">{data[date].length} problem{data[date].length !== 1 ? 's' : ''}</span>
            </div>
            <div className="space-y-1.5">
              {data[date].map(p => (
                <div key={p.id} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-green-500 shrink-0"/>
                  <span className="text-white flex-1">{p.name}</span>
                  <span className={`text-xs ${DIFF_COLOR[p.diff]}`}>{p.diff}</span>
                  {p.note && <span className="text-xs text-gray-600 truncate max-w-24">{p.note}</span>}
                  <button onClick={() => remove(date, p.id)} className="text-gray-700 hover:text-red-400 transition ml-1">
                    <Trash2 size={13}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        {allDates.length === 0 && (
          <div className="text-center text-gray-600 py-8">No problems logged yet. Start your streak today! 💪</div>
        )}
      </div>
    </div>
  );
}
