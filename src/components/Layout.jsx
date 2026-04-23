import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Key, Zap, Menu, X } from 'lucide-react';
import ApiKeyModal from './ApiKeyModal';

export default function Layout({ children }) {
  const [showKey, setShowKey] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const loc = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      <header className="border-b border-purple-900/30 bg-[#0f0f1a]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-white">
            <Zap size={20} className="text-purple-400"/>
            <span className="text-purple-400">Dev</span><span>Tools Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKey(true)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-purple-400 border border-purple-900/40 px-3 py-1.5 rounded-lg transition"
            >
              <Key size={13}/> API Key
            </button>
            <button onClick={() => setMenuOpen(v => !v)} className="md:hidden text-gray-400 hover:text-white ml-1">
              {menuOpen ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>
      </header>
      {showKey && <ApiKeyModal onClose={() => setShowKey(false)}/>}
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
