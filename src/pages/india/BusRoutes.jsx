import { useState } from 'react';
import { Bus } from 'lucide-react';

const ROUTES = [
  { no: 'S-12', from: 'Howrah Station', to: 'Salt Lake Sector V', via: ['Esplanade', 'Ultadanga', 'Kankurgachi'], freq: '10 min', time: '45 min' },
  { no: '230', from: 'Tollygunge', to: 'Esplanade', via: ['Gariahat', 'Hazra', 'Park Street'], freq: '8 min', time: '35 min' },
  { no: 'S-8', from: 'Howrah Station', to: 'New Town (Eco Park)', via: ['Sealdah', 'Phoolbagan', 'VIP Road'], freq: '15 min', time: '60 min' },
  { no: '45A', from: 'Jadavpur', to: 'Dalhousie', via: ['Gariahat', 'Theatre Road', 'Chowringhee'], freq: '12 min', time: '40 min' },
  { no: 'AC-38', from: 'Karunamoyee', to: 'Howrah', via: ['Sector V', 'Ultadanga', 'Sealdah'], freq: '20 min', time: '55 min' },
  { no: '54', from: 'Behala', to: 'Esplanade', via: ['Taratala', 'Majherhat', 'Kidderpore'], freq: '10 min', time: '50 min' },
  { no: 'S-15', from: 'Barasat', to: 'Sealdah', via: ['Dum Dum', 'Lake Town', 'Ultadanga'], freq: '18 min', time: '65 min' },
  { no: '78', from: 'New Alipore', to: 'Karunamoyee', via: ['Ballygunge', 'Park Circus', 'EM Bypass'], freq: '15 min', time: '50 min' },
];

export default function BusRoutes() {
  const [query, setQuery] = useState('');

  const filtered = ROUTES.filter(r =>
    !query || [r.from, r.to, r.no, ...r.via].some(s => s.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-pink-500/20 rounded-lg"><Bus size={22} className="text-pink-400"/></div>
        <div>
          <h1 className="text-2xl font-bold text-white">Bus Route Planner</h1>
          <span className="text-xs text-gray-500">Kolkata WBTC / Private Routes</span>
        </div>
      </div>

      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search route no, stop name, area..."
        className="w-full bg-[#1a1a2e] border border-pink-900/30 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-pink-500 mb-5"/>

      <div className="space-y-3">
        {filtered.map(r => (
          <div key={r.no} className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-pink-700 text-white text-sm font-bold px-3 py-1 rounded-lg shrink-0">{r.no}</span>
              <div className="text-sm text-white font-medium">{r.from} → {r.to}</div>
            </div>
            <div className="flex items-start gap-2 mb-2 text-xs text-gray-500">
              <span className="shrink-0">Via:</span>
              <span>{r.via.join(' → ')}</span>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="text-green-400">🕐 Freq: {r.freq}</span>
              <span className="text-yellow-400">⏱ Duration: {r.time}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center text-gray-600 py-8">No routes found. Try "Howrah" or "Esplanade".</div>}
      </div>
      <p className="text-xs text-center text-gray-700 mt-4">Sample data for demo. Real-time integration via WBTC API coming soon.</p>
    </div>
  );
}
