import { useState } from 'react';
import { BookMarked, Plus, X, Users } from 'lucide-react';

const SEED = [
  { id: 1, name: 'DSA Grind Squad', subject: 'Data Structures & Algorithms', members: 8, max: 10, mode: 'Online', contact: 'discord.gg/dsagrind', desc: 'Daily LeetCode + weekly contests' },
  { id: 2, name: 'GATE CSE 2026', subject: 'GATE Computer Science', members: 15, max: 20, mode: 'Both', contact: 'WhatsApp group', desc: 'Serious study group, sharing materials and tests' },
  { id: 3, name: 'React & Next.js Builders', subject: 'Web Development', members: 6, max: 8, mode: 'Online', contact: 't.me/reactnextgroup', desc: 'Build projects together, code reviews, discussions' },
  { id: 4, name: 'ML Paper Reading', subject: 'Machine Learning', members: 5, max: 8, mode: 'Online', contact: 'discord.gg/mlread', desc: 'Weekly paper readings and discussions' },
  { id: 5, name: 'JEE Advanced 2026', subject: 'Physics / Chemistry / Math', members: 12, max: 15, mode: 'Offline', contact: 'Salt Lake, Kolkata', desc: 'Evening sessions, problem solving' },
];

export default function StudyGroups() {
  const [groups, setGroups] = useState(SEED);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', subject: '', max: '', mode: 'Online', contact: '', desc: '' });

  const filtered = groups.filter(g =>
    !search || g.subject.toLowerCase().includes(search.toLowerCase()) || g.name.toLowerCase().includes(search.toLowerCase())
  );

  const add = () => {
    if (!form.name || !form.subject) return;
    setGroups(gs => [...gs, { ...form, id: Date.now(), members: 1, max: Number(form.max) || 10 }]);
    setForm({ name: '', subject: '', max: '', mode: 'Online', contact: '', desc: '' });
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-500/20 rounded-lg"><BookMarked size={22} className="text-teal-400"/></div>
          <h1 className="text-2xl font-bold text-white">Study Group Finder</h1>
        </div>
        <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-1 text-sm bg-teal-700 hover:bg-teal-600 text-white px-3 py-2 rounded-lg transition">
          <Plus size={14}/> Create Group
        </button>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by subject or group name..."
        className="w-full bg-[#1a1a2e] border border-teal-900/30 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-teal-500 mb-5"/>

      {showForm && (
        <div className="bg-[#1a1a2e] border border-teal-900/30 rounded-2xl p-5 mb-5">
          <div className="flex justify-between mb-3"><h3 className="text-sm font-semibold text-gray-300">Create a Study Group</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-gray-500"/></button></div>
          <div className="grid grid-cols-2 gap-2">
            {[['name','Group Name'],['subject','Subject'],['contact','Contact (link/WhatsApp/etc)'],['max','Max Members']].map(([k,p]) => (
              <input key={k} value={form[k]} onChange={e => setForm(f=>({...f,[k]:e.target.value}))} placeholder={p}
                className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-teal-500 placeholder-gray-600"/>
            ))}
            <select value={form.mode} onChange={e => setForm(f=>({...f,mode:e.target.value}))}
              className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
              {['Online','Offline','Both'].map(m=><option key={m}>{m}</option>)}
            </select>
            <input value={form.desc} onChange={e => setForm(f=>({...f,desc:e.target.value}))} placeholder="Brief description"
              className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-teal-500 placeholder-gray-600"/>
          </div>
          <button onClick={add} className="mt-3 bg-teal-700 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition w-full">Create Group</button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map(g => (
          <div key={g.id} className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-white font-semibold">{g.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ml-2 ${g.mode === 'Online' ? 'bg-blue-900/40 text-blue-300' : g.mode === 'Offline' ? 'bg-green-900/40 text-green-300' : 'bg-purple-900/40 text-purple-300'}`}>{g.mode}</span>
            </div>
            <p className="text-teal-400 text-xs mb-1">{g.subject}</p>
            {g.desc && <p className="text-gray-500 text-xs mb-2">{g.desc}</p>}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-gray-500"><Users size={12}/>{g.members}/{g.max} members</span>
              <span className="text-xs text-gray-600 truncate max-w-32">{g.contact}</span>
            </div>
            <div className="mt-3">
              <div className="w-full bg-[#0f0f1a] rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-teal-600 transition-all" style={{ width: `${(g.members/g.max)*100}%` }}/>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center text-gray-600 py-8 col-span-2">No groups found. Create one!</div>}
      </div>
    </div>
  );
}
