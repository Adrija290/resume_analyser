import { useState } from 'react';
import { Key, X } from 'lucide-react';
import { getApiKey, setApiKey } from '../lib/ai';

export default function ApiKeyModal({ onClose }) {
  const [val, setVal] = useState(getApiKey());
  const save = () => { setApiKey(val.trim()); onClose(); };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a2e] border border-purple-800/40 rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><Key size={18}/> Anthropic API Key</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20}/></button>
        </div>
        <p className="text-sm text-gray-400 mb-3">Stored locally in your browser. Required for all AI tools.</p>
        <input
          type="password"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="sk-ant-..."
          className="w-full bg-[#0f0f1a] border border-purple-800/40 rounded-lg px-3 py-2 text-white text-sm mb-4 outline-none focus:border-purple-500"
        />
        <button onClick={save} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition">Save Key</button>
      </div>
    </div>
  );
}
