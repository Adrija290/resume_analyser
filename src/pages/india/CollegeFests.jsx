import { useState } from 'react';
import { Calendar, Plus, X, ExternalLink } from 'lucide-react';

const SEED = [
  { id: 1, name: 'Techno India Fest', college: 'Techno India University', city: 'Kolkata', date: '2025-02-14', type: 'Tech', desc: 'Hackathon, paper presentation, coding contests', link: '' },
  { id: 2, name: 'Jadavpur University Tech Fest', college: 'Jadavpur University', city: 'Kolkata', date: '2025-03-08', type: 'Tech', desc: 'Robotics, circuit design, software expo', link: '' },
  { id: 3, name: 'IIEST Cultural Week', college: 'IIEST Shibpur', city: 'Howrah', date: '2025-02-28', type: 'Cultural', desc: 'Music, dance, drama, art competition', link: '' },
  { id: 4, name: 'Kshitij IIT KGP', college: 'IIT Kharagpur', city: 'Kharagpur', date: '2025-01-25', type: 'Tech', desc: "Asia's largest student-run tech fest", link: 'https://www.ktj.in' },
  { id: 5, name: 'Springfest IIT KGP', college: 'IIT Kharagpur', city: 'Kharagpur', date: '2025-03-15', type: 'Cultural', desc: 'Premier cultural festival of Eastern India', link: '' },
  { id: 6, name: 'Aarohan', college: 'NIT Durgapur', city: 'Durgapur', date: '2025-04-05', type: 'Both', desc: 'Tech and cultural activities, workshops', link: '' },
];

const TYPES = ['All', 'Tech', 'Cultural', 'Both'];

export default function CollegeFests() {
  const [fests, setFests] = useState(SEED);
  const [filter, setFilter] = useState({ type: 'All', city: '' });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', college: '', city: '', date: '', type: 'Tech', desc: '', link: '' });

  const filtered = fests.filter(f =>
    (filter.type === 'All' || f.type === filter.type || f.type === 'Both') &&
    (!filter.city || f.city.toLowerCase().includes(filter.city.toLowerCase()))
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  const add = () => {
    if (!form.name || !form.college) return;
    setFests(fs => [...fs, { ...form, id: Date.now() }]);
    setForm({ name: '', college: '', city: '', date: '', type: 'Tech', desc: '', link: '' });
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-500/20 rounded-lg"><Calendar size={22} className="text-pink-400"/></div>
          <h1 className="text-2xl font-bold text-white">College Fest Aggregator</h1>
        </div>
        <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-1 text-sm bg-pink-700 hover:bg-pink-600 text-white px-3 py-2 rounded-lg transition">
          <Plus size={14}/> Add Fest
        </button>
      </div>

      <div className="flex gap-2 flex-wrap mb-5">
        <input value={filter.city} onChange={e => setFilter(f => ({ ...f, city: e.target.value }))} placeholder="Filter by city..."
          className="flex-1 min-w-32 bg-[#1a1a2e] border border-pink-900/30 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-pink-500 placeholder-gray-600"/>
        {TYPES.map(t => (
          <button key={t} onClick={() => setFilter(f => ({ ...f, type: t }))}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter.type === t ? 'bg-pink-700 text-white' : 'bg-[#1a1a2e] text-gray-400 border border-white/5 hover:text-white'}`}>
            {t}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="bg-[#1a1a2e] border border-pink-900/30 rounded-2xl p-5 mb-5">
          <div className="flex justify-between mb-3"><h3 className="text-sm font-semibold text-gray-300">Add a Fest</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-gray-500"/></button></div>
          <div className="grid grid-cols-2 gap-2">
            {[['name','Fest Name'],['college','College Name'],['city','City'],['link','Website (optional)']].map(([k,p]) => (
              <input key={k} value={form[k]} onChange={e => setForm(f=>({...f,[k]:e.target.value}))} placeholder={p}
                className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-pink-500 placeholder-gray-600"/>
            ))}
            <input type="date" value={form.date} onChange={e => setForm(f=>({...f,date:e.target.value}))}
              className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"/>
            <select value={form.type} onChange={e => setForm(f=>({...f,type:e.target.value}))}
              className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
              {['Tech','Cultural','Both'].map(t=><option key={t}>{t}</option>)}
            </select>
            <textarea value={form.desc} onChange={e => setForm(f=>({...f,desc:e.target.value}))} placeholder="Description..."
              rows={2} className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none col-span-2 resize-none"/>
          </div>
          <button onClick={add} className="mt-3 bg-pink-700 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition w-full">Add Fest</button>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map(f => (
          <div key={f.id} className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold">{f.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${f.type === 'Tech' ? 'bg-blue-900/40 text-blue-300' : f.type === 'Cultural' ? 'bg-pink-900/40 text-pink-300' : 'bg-purple-900/40 text-purple-300'}`}>{f.type}</span>
                </div>
                <p className="text-gray-500 text-sm">{f.college} • {f.city}</p>
                {f.desc && <p className="text-gray-400 text-xs mt-1">{f.desc}</p>}
              </div>
              <div className="text-right shrink-0">
                {f.date && <div className="text-pink-400 text-sm font-medium">{new Date(f.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>}
                {f.link && <a href={f.link} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 justify-end mt-1"><ExternalLink size={11}/>Website</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
