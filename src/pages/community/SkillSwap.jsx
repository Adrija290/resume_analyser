import { useState } from 'react';
import { RefreshCw, Plus, X } from 'lucide-react';

const SEED = [
  { id: 1, name: 'Arjun K.', offering: 'Guitar lessons (intermediate)', wanting: 'Python / ML basics', city: 'Kolkata', mode: 'Both' },
  { id: 2, name: 'Priya M.', offering: 'Frontend (React, CSS)', wanting: 'Carnatic music / vocals', city: 'Bangalore', mode: 'Online' },
  { id: 3, name: 'Rohan S.', offering: 'Chess coaching', wanting: 'Video editing / After Effects', city: 'Mumbai', mode: 'Both' },
  { id: 4, name: 'Sneha D.', offering: 'Content writing / copywriting', wanting: 'Data Science, SQL', city: 'Delhi', mode: 'Online' },
  { id: 5, name: 'Vikram P.', offering: 'Graphic design (Figma, AI)', wanting: 'Backend dev (Node/Django)', city: 'Pune', mode: 'Online' },
  { id: 6, name: 'Amrita B.', offering: 'Hindi / Bengali tutoring', wanting: 'React Native development', city: 'Kolkata', mode: 'Both' },
];

export default function SkillSwap() {
  const [swaps, setSwaps] = useState(SEED);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', offering: '', wanting: '', city: '', mode: 'Online' });

  const filtered = swaps.filter(s =>
    !search || s.offering.toLowerCase().includes(search.toLowerCase()) || s.wanting.toLowerCase().includes(search.toLowerCase())
  );

  const add = () => {
    if (!form.name || !form.offering || !form.wanting) return;
    setSwaps(ss => [...ss, { ...form, id: Date.now() }]);
    setForm({ name: '', offering: '', wanting: '', city: '', mode: 'Online' });
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-500/20 rounded-lg"><RefreshCw size={22} className="text-teal-400"/></div>
          <div>
            <h1 className="text-2xl font-bold text-white">Skill Swap</h1>
            <span className="text-xs text-gray-500">Teach guitar, learn coding. No money, just skills.</span>
          </div>
        </div>
        <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-1 text-sm bg-teal-700 hover:bg-teal-600 text-white px-3 py-2 rounded-lg transition">
          <Plus size={14}/> Offer Swap
        </button>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search skill to learn or teach..."
        className="w-full bg-[#1a1a2e] border border-teal-900/30 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-teal-500 mb-5"/>

      {showForm && (
        <div className="bg-[#1a1a2e] border border-teal-900/30 rounded-2xl p-5 mb-5">
          <div className="flex justify-between mb-3"><h3 className="text-sm font-semibold text-gray-300">Offer a Skill Swap</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-gray-500"/></button></div>
          <div className="grid grid-cols-2 gap-2">
            {[['name','Your Name (or alias)'],['city','Your City'],['offering','Skill you can TEACH'],['wanting','Skill you want to LEARN']].map(([k,p]) => (
              <input key={k} value={form[k]} onChange={e => setForm(f=>({...f,[k]:e.target.value}))} placeholder={p}
                className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-teal-500 placeholder-gray-600"/>
            ))}
            <select value={form.mode} onChange={e => setForm(f=>({...f,mode:e.target.value}))}
              className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none col-span-2">
              {['Online','Offline','Both'].map(m=><option key={m}>{m}</option>)}
            </select>
          </div>
          <button onClick={add} className="mt-3 bg-teal-700 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition w-full">Post Swap</button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map(s => (
          <div key={s.id} className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-teal-900/40 border border-teal-700/40 flex items-center justify-center text-sm font-bold text-teal-300">{s.name[0]}</div>
              <div>
                <div className="text-white text-sm font-medium">{s.name}</div>
                <div className="text-xs text-gray-600">{s.city} • {s.mode}</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xs bg-green-900/40 text-green-300 px-2 py-0.5 rounded-full shrink-0 mt-0.5">Offers</span>
                <span className="text-sm text-gray-300">{s.offering}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded-full shrink-0 mt-0.5">Wants</span>
                <span className="text-sm text-gray-300">{s.wanting}</span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center text-gray-600 py-8 col-span-2">No swaps found. Be the first to offer!</div>}
      </div>
    </div>
  );
}
