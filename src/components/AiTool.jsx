import { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { askClaude } from '../lib/ai';
import ReactMarkdown from 'react-markdown';

export function AiTool({ title, icon: Icon, systemPrompt, placeholder, inputLabel = 'Input', buttonLabel = 'Analyze', multiInput }) {
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const run = async () => {
    if (!input.trim()) return;
    setLoading(true); setError(''); setResult('');
    try {
      const userMsg = multiInput ? `${input}\n\n---\n\n${input2}` : input;
      const res = await askClaude(systemPrompt, userMsg);
      setResult(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        {Icon && <div className="p-2 bg-purple-500/20 rounded-lg"><Icon size={22} className="text-purple-400"/></div>}
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>

      <div className="space-y-3">
        <label className="text-sm text-gray-400">{inputLabel}</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder}
          rows={multiInput ? 5 : 8}
          className="w-full bg-[#1a1a2e] border border-purple-900/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 resize-none outline-none focus:border-purple-500 transition"
        />
        {multiInput && (
          <>
            <label className="text-sm text-gray-400">{multiInput.label}</label>
            <textarea
              value={input2}
              onChange={e => setInput2(e.target.value)}
              placeholder={multiInput.placeholder}
              rows={5}
              className="w-full bg-[#1a1a2e] border border-purple-900/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 resize-none outline-none focus:border-purple-500 transition"
            />
          </>
        )}
        <button
          onClick={run}
          disabled={loading || !input.trim()}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 size={16} className="animate-spin"/> Processing...</> : buttonLabel}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-700/40 rounded-xl flex gap-2 text-red-400 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5"/>{error}
        </div>
      )}

      {result && (
        <div className="mt-6 bg-[#1a1a2e] border border-purple-900/30 rounded-xl p-5 prose prose-invert prose-sm max-w-none">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
