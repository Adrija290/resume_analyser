import { useState } from 'react';
import { Users, Plus, X, Star, IndianRupee } from 'lucide-react';

const SEED = [
  { id: 1, name: 'Ananya Das', subjects: ['Mathematics', 'Physics'], area: 'Salt Lake', fee: 800, rating: 4.8, mode: 'Both', exp: 3 },
  { id: 2, name: 'Rahul Mehta', subjects: ['Chemistry', 'Biology'], area: 'Park Street', fee: 700, rating: 4.5, mode: 'Online', exp: 2 },
  { id: 3, name: 'Priya Singh', subjects: ['Python', 'Data Science'], area: 'New Town', fee: 1200, rating: 4.9, mode: 'Both', exp: 5 },
  { id: 4, name: 'Arun Kumar', subjects: ['English', 'History'], area: 'Jadavpur', fee: 500, rating: 4.3, mode: 'Offline', exp: 7 },
  { id: 5, name: 'Sneha Roy', subjects: ['Mathematics', 'Competitive Math'], area: 'Behala', fee: 900, rating: 4.7, mode: 'Both', exp: 4 },
];

export default function TutorFinder() {
  const [tutors, setTutors] = useState(SEED);
  const [search, setSearch] = useState('');
  const [modeFilter, setModeFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', subjects: '', area: '', fee: '', mode: 'Both', exp: '' });

  const filtered = tutors.filter(t =>
    (!search || t.subjects.some(s => s.toLowerCase().includes(search.toLowerCase())) || t.area.toLowerCase().includes(search.toLowerCase())) &&
    (modeFilter === 'All' || t.mode === modeFilter || t.mode === 'Both')
  );

  const add = () => {
    if (!form.name || !form.subjects || !form.fee) return;
    setTutors(ts => [...ts, { ...form, id: Date.now(), subjects: form.subjects.split(',').map(s => s.trim()), fee: Number(form.fee), exp: Number(form.exp), rating: 5.0 }]);
    setForm({ name: '', subjects: '', area: '', fee: '', mode: 'Both', exp: '' });
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-500/20 rounded-lg"><Users size={22} className="text-pink-400"/></div>
          <h1 className="text-2xl font-bold text-white">Local Tutor Finder</h1>
        </div>
        <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-1 text-sm bg-pink-700 hover:bg-pink-600 text-white px-3 py-2 rounded-lg transition">
          <Plus size={14}/> Register as Tutor
        </button>
      </div>

      <div className="flex gap-2 mb-5">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by subject or area..."
          className="flex-1 bg-[#1a1a2e] border border-pink-900/30 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-pink-500 placeholder-gray-600"/>
        {['All', 'Online', 'Offline', 'Both'].map(m => (
          <button key={m} onClick={() => setModeFilter(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${modeFilter === m ? 'bg-pink-700 text-white' : 'bg-[#1a1a2e] text-gray-400 border border-white/5 hover:text-white'}`}>
            {m}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="bg-[#1a1a2e] border border-pink-900/30 rounded-2xl p-5 mb-5">
          <div className="flex justify-between mb-3"><h3 className="text-sm font-semibold text-gray-300">Register as Tutor</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-gray-500"/></button></div>
          <div className="grid grid-cols-2 gap-2">
            {[['name','Full Name'],['area','Area/Locality'],['exp','Experience (years)']].map(([k,p]) => (
              <input key={k} value={form[k]} onChange={e => setForm(f=>({...f,[k]:e.target.value}))} placeholder={p}
                className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-pink-500 placeholder-gray-600"/>
            ))}
            <input type="number" value={form.fee} onChange={e => setForm(f=>({...f,fee:e.target.value}))} placeholder="Fee ₹/hour"
              className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-pink-500 placeholder-gray-600"/>
            <input value={form.subjects} onChange={e => setForm(f=>({...f,subjects:e.target.value}))} placeholder="Subjects (comma-separated)"
              className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-pink-500 placeholder-gray-600 col-span-1"/>
            <select value={form.mode} onChange={e => setForm(f=>({...f,mode:e.target.value}))}
              className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none col-span-1">
              {['Online','Offline','Both'].map(m=><option key={m}>{m}</option>)}
            </select>
          </div>
          <button onClick={add} className="mt-3 bg-pink-700 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition w-full">Add Profile</button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map(t => (
          <div key={t.id} className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-pink-900/40 border border-pink-700/40 flex items-center justify-center font-bold text-pink-300">{t.name[0]}</div>
              <div>
                <div className="text-white font-semibold">{t.name}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1"><Star size={11} className="text-yellow-400 fill-yellow-400"/>{t.rating} • {t.exp}yr exp</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {t.subjects.map(s => <span key={s} className="text-xs bg-pink-900/30 text-pink-300 px-2 py-0.5 rounded-full">{s}</span>)}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">📍 {t.area}</span>
              <span className="text-gray-500">{t.mode}</span>
              <span className="text-pink-400 font-semibold flex items-center gap-0.5"><IndianRupee size={12}/>{t.fee}/hr</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center text-gray-600 py-8 col-span-2">No tutors found. Try different filters.</div>}
      </div>
    </div>
  );
}
