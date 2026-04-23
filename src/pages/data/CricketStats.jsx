import { useState } from 'react';
import { Trophy } from 'lucide-react';

const PLAYERS = [
  { name: 'Virat Kohli', role: 'Batsman', tests: { avg: 47.2, runs: 8848, tons: 30 }, odi: { avg: 58.1, runs: 13906, tons: 50 }, t20: { avg: 52.7, runs: 4188, tons: 1 } },
  { name: 'Rohit Sharma', role: 'Batsman', tests: { avg: 40.8, runs: 4301, tons: 12 }, odi: { avg: 48.7, runs: 10709, tons: 31 }, t20: { avg: 32.0, runs: 4231, tons: 5 } },
  { name: 'MS Dhoni', role: 'WK-Batsman', tests: { avg: 38.1, runs: 4876, tons: 6 }, odi: { avg: 50.6, runs: 10773, tons: 10 }, t20: { avg: 37.6, runs: 1617, tons: 0 } },
  { name: 'Sachin Tendulkar', role: 'Batsman', tests: { avg: 53.8, runs: 15921, tons: 51 }, odi: { avg: 44.8, runs: 18426, tons: 49 }, t20: { avg: 14.3, runs: 10, tons: 0 } },
  { name: 'Jasprit Bumrah', role: 'Bowler', tests: { avg: 20.1, wickets: 195, econ: 2.97 }, odi: { avg: 24.5, wickets: 149, econ: 4.63 }, t20: { avg: 18.4, wickets: 89, econ: 6.23 } },
];

const FORMATS = ['tests', 'odi', 't20'];
const FORMAT_LABELS = { tests: 'Tests', odi: 'ODI', t20: 'T20I' };

function StatBar({ val, max, color }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-[#0f0f1a] rounded-full h-2">
        <div style={{ width: `${Math.min(100, (val / max) * 100)}%`, background: color }} className="h-2 rounded-full transition-all"/>
      </div>
      <span className="text-xs text-gray-400 w-10 text-right">{val}</span>
    </div>
  );
}

export default function CricketStats() {
  const [compare, setCompare] = useState([0, 1]);
  const [format, setFormat] = useState('odi');

  const togglePlayer = (i) => {
    if (compare.includes(i)) {
      if (compare.length > 1) setCompare(c => c.filter(x => x !== i));
    } else {
      setCompare(c => c.length < 3 ? [...c, i] : [c[1], i]);
    }
  };

  const selected = compare.map(i => PLAYERS[i]);
  const isBatter = selected[0]?.role !== 'Bowler';
  const statKey = isBatter ? 'runs' : 'wickets';
  const maxStat = Math.max(...selected.map(p => p[format]?.[statKey] || 0));
  const COLORS = ['#8b5cf6', '#22c55e', '#f59e0b'];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-lg"><Trophy size={22} className="text-green-400"/></div>
        <h1 className="text-2xl font-bold text-white">Cricket Stats Dashboard</h1>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {FORMATS.map(f => (
          <button key={f} onClick={() => setFormat(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${format === f ? 'bg-green-700 text-white' : 'bg-[#1a1a2e] text-gray-400 hover:text-white border border-white/5'}`}>
            {FORMAT_LABELS[f]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {PLAYERS.map((p, i) => (
          <button key={p.name} onClick={() => togglePlayer(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${compare.includes(i) ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-white/5 bg-[#1a1a2e] text-gray-400 hover:text-white'}`}>
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {selected.map((p, idx) => (
          <div key={p.name} className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
                style={{ background: COLORS[idx] + '40', border: `2px solid ${COLORS[idx]}` }}>
                {p.name[0]}
              </div>
              <div>
                <h3 className="text-white font-bold">{p.name}</h3>
                <span className="text-xs text-gray-500">{p.role}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{isBatter ? 'Runs' : 'Wickets'}</span>
                  <span>{p[format]?.[statKey] ?? 'N/A'}</span>
                </div>
                <StatBar val={p[format]?.[statKey] || 0} max={maxStat || 1} color={COLORS[idx]}/>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mt-3">
                {isBatter ? (
                  <>
                    <div className="bg-[#0f0f1a] rounded-lg p-2"><div className="text-white font-bold text-sm">{p[format]?.avg}</div><div className="text-xs text-gray-600">Average</div></div>
                    <div className="bg-[#0f0f1a] rounded-lg p-2"><div className="text-white font-bold text-sm">{p[format]?.runs?.toLocaleString()}</div><div className="text-xs text-gray-600">Runs</div></div>
                    <div className="bg-[#0f0f1a] rounded-lg p-2"><div className="text-white font-bold text-sm">{p[format]?.tons}</div><div className="text-xs text-gray-600">100s</div></div>
                  </>
                ) : (
                  <>
                    <div className="bg-[#0f0f1a] rounded-lg p-2"><div className="text-white font-bold text-sm">{p[format]?.avg}</div><div className="text-xs text-gray-600">Average</div></div>
                    <div className="bg-[#0f0f1a] rounded-lg p-2"><div className="text-white font-bold text-sm">{p[format]?.wickets}</div><div className="text-xs text-gray-600">Wickets</div></div>
                    <div className="bg-[#0f0f1a] rounded-lg p-2"><div className="text-white font-bold text-sm">{p[format]?.econ}</div><div className="text-xs text-gray-600">Economy</div></div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
