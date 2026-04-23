import { useState } from 'react';
import { MessageSquare, Loader2, AlertCircle, Send } from 'lucide-react';
import { askClaude } from '../../lib/ai';
import ReactMarkdown from 'react-markdown';

const ROLES = ['Software Engineer', 'Data Scientist', 'Product Manager', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'ML Engineer'];

export default function MockInterview() {
  const [role, setRole] = useState('Software Engineer');
  const [phase, setPhase] = useState('setup'); // setup | interview | done
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [qNum, setQNum] = useState(0);

  const startInterview = async () => {
    setLoading(true); setError('');
    try {
      const q = await askClaude(
        `You are a tough but fair technical interviewer for ${role} positions. Ask one focused interview question. Just the question, nothing else. Start with question number 1.`,
        `Start a mock interview for a ${role} role. Ask question 1.`
      );
      setQuestion(q); setQNum(1); setPhase('interview');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;
    setLoading(true); setError('');
    try {
      const fb = await askClaude(
        `You are an experienced interviewer for ${role} roles. Evaluate the candidate's answer honestly.
Provide:
**Score:** X/10
**What was good:**
**What was missing:**
**Model Answer (brief):**
**Next Question:** Ask question ${qNum + 1} (or "Interview complete" if this was question 5)`,
        `Question: ${question}\n\nCandidate's answer: ${answer}`
      );
      const newHistory = [...history, { q: question, a: answer, fb }];
      setHistory(newHistory);
      setFeedback(fb);
      setAnswer('');

      if (qNum >= 5 || fb.toLowerCase().includes('interview complete')) {
        setPhase('done');
      } else {
        const nextQ = fb.split('Next Question:')[1]?.trim() || '';
        setQuestion(nextQ || 'Tell me about a challenging project you worked on.');
        setQNum(n => n + 1);
        setFeedback('');
      }
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  if (phase === 'setup') return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg"><MessageSquare size={22} className="text-blue-400"/></div>
        <h1 className="text-2xl font-bold text-white">Mock Interview Bot</h1>
      </div>
      <div className="bg-[#1a1a2e] border border-blue-900/30 rounded-2xl p-6">
        <label className="block text-sm text-gray-400 mb-2">Select Role</label>
        <select value={role} onChange={e => setRole(e.target.value)}
          className="w-full bg-[#0f0f1a] border border-blue-900/40 rounded-lg px-3 py-2 text-white mb-4 outline-none focus:border-blue-500">
          {ROLES.map(r => <option key={r}>{r}</option>)}
        </select>
        <div className="text-sm text-gray-500 mb-4">5 questions • AI evaluates each answer • Get model answers</div>
        {error && <div className="text-red-400 text-sm mb-3 flex gap-2"><AlertCircle size={14}/>{error}</div>}
        <button onClick={startInterview} disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2">
          {loading ? <><Loader2 size={16} className="animate-spin"/> Starting...</> : '🎤 Start Interview'}
        </button>
      </div>
    </div>
  );

  if (phase === 'done') return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg"><MessageSquare size={22} className="text-blue-400"/></div>
        <h1 className="text-2xl font-bold text-white">Interview Complete!</h1>
      </div>
      <div className="space-y-4">
        {history.map((h, i) => (
          <div key={i} className="bg-[#1a1a2e] border border-blue-900/30 rounded-xl p-5">
            <div className="text-xs text-blue-400 mb-1">Q{i+1}</div>
            <div className="text-sm text-white font-medium mb-2">{h.q}</div>
            <div className="text-sm text-gray-400 bg-[#0f0f1a] rounded-lg p-3 mb-3"><strong className="text-gray-300">Your answer:</strong> {h.a}</div>
            <div className="prose prose-invert prose-sm max-w-none"><ReactMarkdown>{h.fb}</ReactMarkdown></div>
          </div>
        ))}
      </div>
      <button onClick={() => { setPhase('setup'); setHistory([]); setQNum(0); }}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition">
        Try Again
      </button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/20 rounded-lg"><MessageSquare size={22} className="text-blue-400"/></div>
        <div>
          <h1 className="text-2xl font-bold text-white">Mock Interview</h1>
          <span className="text-xs text-gray-500">{role} • Question {qNum}/5</span>
        </div>
      </div>

      <div className="bg-[#1a1a2e] border border-blue-900/30 rounded-2xl p-5 mb-4">
        <div className="text-xs text-blue-400 mb-2">Question {qNum}</div>
        <p className="text-white font-medium">{question}</p>
      </div>

      {feedback && (
        <div className="bg-[#1a1a2e] border border-green-900/30 rounded-2xl p-5 mb-4 prose prose-invert prose-sm max-w-none">
          <div className="text-xs text-green-400 mb-2">Feedback</div>
          <ReactMarkdown>{feedback}</ReactMarkdown>
        </div>
      )}

      {error && <div className="text-red-400 text-sm mb-3 flex gap-2 p-3 bg-red-900/10 rounded-lg"><AlertCircle size={14}/>{error}</div>}

      <div className="flex gap-2">
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          rows={4}
          className="flex-1 bg-[#1a1a2e] border border-blue-900/40 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 resize-none outline-none focus:border-blue-500"
        />
        <button onClick={submitAnswer} disabled={loading || !answer.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 rounded-xl transition flex items-center justify-center">
          {loading ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
        </button>
      </div>
    </div>
  );
}
