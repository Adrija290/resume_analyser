import { useState } from 'react';
import { PenTool, Loader2, AlertCircle, Printer } from 'lucide-react';
import { askClaude } from '../../lib/ai';
import ReactMarkdown from 'react-markdown';

const FIELDS = [
  { key: 'name', label: 'Full Name', placeholder: 'Priya Sharma' },
  { key: 'email', label: 'Email', placeholder: 'priya@email.com' },
  { key: 'phone', label: 'Phone', placeholder: '+91 9876543210' },
  { key: 'location', label: 'Location', placeholder: 'Kolkata, India' },
  { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'linkedin.com/in/priya' },
  { key: 'summary', label: 'Professional Summary', placeholder: 'Brief 2-3 line intro...', multi: true },
  { key: 'experience', label: 'Work Experience', placeholder: 'Company, Role, Dates, Responsibilities...', multi: true },
  { key: 'education', label: 'Education', placeholder: 'Degree, College, Year, CGPA...', multi: true },
  { key: 'skills', label: 'Skills', placeholder: 'Python, React, SQL, Git...' },
  { key: 'projects', label: 'Projects', placeholder: 'Project name, tech stack, impact...', multi: true },
  { key: 'achievements', label: 'Achievements / Certifications', placeholder: 'Awards, certs, hackathons...', multi: true },
];

export default function ResumeBuilder() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const build = async () => {
    setLoading(true); setError(''); setResult('');
    const details = FIELDS.map(f => `${f.label}: ${form[f.key] || 'Not provided'}`).join('\n');
    try {
      const res = await askClaude(
        'You are a professional resume writer. Create a clean, ATS-friendly resume in Markdown format based on the provided details. Use proper sections with headers (##). Be professional and concise. Quantify achievements where possible.',
        details
      );
      setResult(res);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const print = () => {
    const win = window.open('', '_blank');
    win.document.write(`<html><head><title>Resume</title><style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px;line-height:1.5}h1,h2{color:#1a1a1a}h2{border-bottom:1px solid #ccc;padding-bottom:4px}ul{padding-left:20px}</style></head><body>${document.querySelector('.resume-output')?.innerHTML||''}</body></html>`);
    win.document.close(); win.print();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg"><PenTool size={22} className="text-purple-400"/></div>
        <h1 className="text-2xl font-bold text-white">Resume Builder</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {FIELDS.map(f => (
          <div key={f.key} className={f.multi ? 'md:col-span-2' : ''}>
            <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
            {f.multi ? (
              <textarea
                rows={3}
                value={form[f.key] || ''}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-[#1a1a2e] border border-purple-900/40 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 resize-none outline-none focus:border-purple-500"
              />
            ) : (
              <input
                value={form[f.key] || ''}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-[#1a1a2e] border border-purple-900/40 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500"
              />
            )}
          </div>
        ))}
      </div>

      <button onClick={build} disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2">
        {loading ? <><Loader2 size={16} className="animate-spin"/> Generating...</> : '✨ Generate Resume'}
      </button>

      {error && <div className="mt-4 p-4 bg-red-900/20 border border-red-700/40 rounded-xl flex gap-2 text-red-400 text-sm"><AlertCircle size={16}/>{error}</div>}

      {result && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Generated Resume</span>
            <button onClick={print} className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 border border-purple-800/40 px-3 py-1.5 rounded-lg transition">
              <Printer size={13}/> Print / Save PDF
            </button>
          </div>
          <div className="resume-output bg-white text-gray-900 rounded-xl p-6 prose prose-sm max-w-none">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
