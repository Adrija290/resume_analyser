import { useState } from 'react';
import { BookOpen, Loader2, AlertCircle, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { askClaude } from '../../lib/ai';

export default function Flashcards() {
  const [topic, setTopic] = useState('');
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true); setError(''); setCards([]);
    try {
      const res = await askClaude(
        'Generate exactly 10 flashcards for the given topic. Return ONLY a JSON array with objects having "front" (question/term) and "back" (answer/definition) keys. No markdown, no explanation, just the JSON array.',
        `Topic: ${topic}`
      );
      const parsed = JSON.parse(res.replace(/```json|```/g, '').trim());
      setCards(parsed); setCurrent(0); setFlipped(false);
    } catch (e) {
      setError(e.message.includes('JSON') ? 'Failed to parse cards. Try again.' : e.message);
    } finally { setLoading(false); }
  };

  const next = () => { setCurrent(c => Math.min(c + 1, cards.length - 1)); setFlipped(false); };
  const prev = () => { setCurrent(c => Math.max(c - 1, 0)); setFlipped(false); };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg"><BookOpen size={22} className="text-blue-400"/></div>
        <h1 className="text-2xl font-bold text-white">Flashcard Generator</h1>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          value={topic}
          onChange={e => setTopic(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && generate()}
          placeholder="Topic: e.g. React Hooks, OS Concepts, DBMS..."
          className="flex-1 bg-[#1a1a2e] border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500"
        />
        <button onClick={generate} disabled={loading || !topic.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 rounded-xl font-semibold transition flex items-center gap-2">
          {loading ? <Loader2 size={16} className="animate-spin"/> : '⚡ Generate'}
        </button>
      </div>

      {error && <div className="p-4 bg-red-900/20 border border-red-700/40 rounded-xl flex gap-2 text-red-400 text-sm mb-4"><AlertCircle size={16}/>{error}</div>}

      {cards.length > 0 && (
        <div>
          <div className="text-center text-xs text-gray-500 mb-3">{current + 1} / {cards.length} • Click card to flip</div>
          <div
            onClick={() => setFlipped(f => !f)}
            className="cursor-pointer select-none bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-700/30 rounded-2xl p-8 min-h-48 flex items-center justify-center text-center transition-all hover:border-blue-500/50 mb-4"
          >
            <div>
              <div className="text-xs text-gray-500 mb-3">{flipped ? 'ANSWER' : 'QUESTION'}</div>
              <p className="text-white text-lg font-medium">{flipped ? cards[current].back : cards[current].front}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={prev} disabled={current === 0}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white disabled:opacity-30 transition">
              <ChevronLeft size={16}/> Prev
            </button>
            <button onClick={() => { setCurrent(0); setFlipped(false); }}
              className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition">
              <RotateCcw size={12}/> Restart
            </button>
            <button onClick={next} disabled={current === cards.length - 1}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white disabled:opacity-30 transition">
              Next <ChevronRight size={16}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
