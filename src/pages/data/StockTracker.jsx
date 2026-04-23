import { useState } from 'react';
import { TrendingUp, ExternalLink } from 'lucide-react';

const POPULAR = [
  { sym: 'RELIANCE', name: 'Reliance Industries' },
  { sym: 'TCS', name: 'Tata Consultancy Services' },
  { sym: 'INFY', name: 'Infosys' },
  { sym: 'HDFCBANK', name: 'HDFC Bank' },
  { sym: 'WIPRO', name: 'Wipro' },
  { sym: 'TATAMOTORS', name: 'Tata Motors' },
  { sym: 'ITC', name: 'ITC Ltd' },
  { sym: 'SBIN', name: 'State Bank of India' },
];

export default function StockTracker() {
  const [selected, setSelected] = useState('RELIANCE');

  const tvUrl = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=NSE%3A${selected}&interval=D&hidesidetoolbar=0&hidetoptoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=dark&style=1&timezone=Asia%2FKolkata&withdateranges=1&width=100%25&height=400`;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-lg"><TrendingUp size={22} className="text-green-400"/></div>
        <h1 className="text-2xl font-bold text-white">Stock Price Tracker</h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {POPULAR.map(s => (
          <button key={s.sym} onClick={() => setSelected(s.sym)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${selected === s.sym ? 'bg-green-700 text-white' : 'bg-[#1a1a2e] text-gray-400 hover:text-white border border-white/5 hover:border-white/15'}`}>
            {s.sym}
          </button>
        ))}
      </div>

      <div className="bg-[#1a1a2e] border border-green-900/30 rounded-2xl overflow-hidden mb-4">
        <iframe
          src={tvUrl}
          width="100%"
          height="400"
          style={{ border: 'none' }}
          title="TradingView Chart"
        />
      </div>

      <div className="text-center">
        <a href={`https://www.nseindia.com/get-quotes/equity?symbol=${selected}`}
          target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition">
          <ExternalLink size={14}/> View on NSE India
        </a>
      </div>

      <p className="text-xs text-center text-gray-600 mt-3">Data via TradingView. For informational purposes only, not financial advice.</p>
    </div>
  );
}
