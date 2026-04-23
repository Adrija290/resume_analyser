import { useState } from 'react';
import { MapPin, Plus, X, Phone, IndianRupee } from 'lucide-react';

const SEED = [
  { id: 1, name: 'Shanti PG for Girls', area: 'Salt Lake, Kolkata', rent: 6000, type: 'Girls', amenities: ['WiFi', 'Meals', 'AC'], contact: '9800012345' },
  { id: 2, name: 'Boys Hostel Sector V', area: 'Sector V, Kolkata', rent: 5000, type: 'Boys', amenities: ['WiFi', 'Laundry'], contact: '9800023456' },
  { id: 3, name: 'New Town Shared Flat', area: 'New Town, Kolkata', rent: 7500, type: 'Co-ed', amenities: ['WiFi', 'AC', 'Parking'], contact: '9800034567' },
  { id: 4, name: 'Park Street PG', area: 'Park Street, Kolkata', rent: 9000, type: 'Girls', amenities: ['WiFi', 'Meals', 'AC', 'Gym'], contact: '9800045678' },
];

export default function PgFinder() {
  const [listings, setListings] = useState(SEED);
  const [filter, setFilter] = useState({ type: 'All', maxRent: 15000, area: '' });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', area: '', rent: '', type: 'Boys', amenities: '', contact: '' });

  const filtered = listings.filter(l =>
    (filter.type === 'All' || l.type === filter.type) &&
    l.rent <= filter.maxRent &&
    (!filter.area || l.area.toLowerCase().includes(filter.area.toLowerCase()))
  );

  const add = () => {
    if (!form.name || !form.area || !form.rent) return;
    setListings(l => [...l, { ...form, id: Date.now(), rent: Number(form.rent), amenities: form.amenities.split(',').map(s => s.trim()).filter(Boolean) }]);
    setForm({ name: '', area: '', rent: '', type: 'Boys', amenities: '', contact: '' });
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-500/20 rounded-lg"><MapPin size={22} className="text-pink-400"/></div>
          <h1 className="text-2xl font-bold text-white">PG / Hostel Finder</h1>
        </div>
        <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-1 text-sm bg-pink-700 hover:bg-pink-600 text-white px-3 py-2 rounded-lg transition">
          <Plus size={14}/> List your PG
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <input value={filter.area} onChange={e => setFilter(f => ({ ...f, area: e.target.value }))} placeholder="Search area..."
          className="bg-[#1a1a2e] border border-pink-900/30 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-pink-500 placeholder-gray-600"/>
        <select value={filter.type} onChange={e => setFilter(f => ({ ...f, type: e.target.value }))}
          className="bg-[#1a1a2e] border border-pink-900/30 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-pink-500">
          {['All', 'Boys', 'Girls', 'Co-ed'].map(t => <option key={t}>{t}</option>)}
        </select>
        <div>
          <input type="range" min={2000} max={20000} step={500} value={filter.maxRent} onChange={e => setFilter(f => ({ ...f, maxRent: Number(e.target.value) }))} className="w-full accent-pink-500"/>
          <div className="text-xs text-gray-500 text-center">Max ₹{filter.maxRent.toLocaleString()}/mo</div>
        </div>
      </div>

      {showForm && (
        <div className="bg-[#1a1a2e] border border-pink-900/30 rounded-2xl p-5 mb-5">
          <div className="flex justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-300">List a PG/Hostel</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-gray-500"/></button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[['name', 'PG Name'], ['area', 'Area/Locality'], ['contact', 'Contact Number']].map(([k, p]) => (
              <input key={k} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={p}
                className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-pink-500 placeholder-gray-600 col-span-1"/>
            ))}
            <input type="number" value={form.rent} onChange={e => setForm(f => ({ ...f, rent: e.target.value }))} placeholder="Rent (₹/month)"
              className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-pink-500 placeholder-gray-600"/>
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
              className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none col-span-1">
              {['Boys', 'Girls', 'Co-ed'].map(t => <option key={t}>{t}</option>)}
            </select>
            <input value={form.amenities} onChange={e => setForm(f => ({ ...f, amenities: e.target.value }))} placeholder="Amenities (WiFi, Meals, AC...)"
              className="bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-pink-500 placeholder-gray-600 col-span-2"/>
          </div>
          <button onClick={add} className="mt-3 bg-pink-700 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition w-full">Add Listing</button>
        </div>
      )}

      <div className="space-y-3">
        {filtered.length === 0 && <div className="text-center text-gray-600 py-8">No listings match your filters.</div>}
        {filtered.map(l => (
          <div key={l.id} className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4 flex items-start justify-between">
            <div>
              <h3 className="text-white font-semibold">{l.name}</h3>
              <p className="text-gray-500 text-sm flex items-center gap-1"><MapPin size={12}/>{l.area}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${l.type === 'Girls' ? 'bg-pink-900/40 text-pink-300' : l.type === 'Boys' ? 'bg-blue-900/40 text-blue-300' : 'bg-purple-900/40 text-purple-300'}`}>{l.type}</span>
                {l.amenities.map(a => <span key={a} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{a}</span>)}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-pink-400 font-bold flex items-center gap-0.5"><IndianRupee size={14}/>{l.rent.toLocaleString()}/mo</div>
              {l.contact && <a href={`tel:${l.contact}`} className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 justify-end mt-1"><Phone size={11}/>{l.contact}</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
