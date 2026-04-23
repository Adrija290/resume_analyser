import { useState } from 'react';
import { GitBranch as Github, Loader2, AlertCircle, Star, GitFork, Code2, Users } from 'lucide-react';

const LANGS_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', 'C++': '#f34b7d', Go: '#00ADD8', Rust: '#dea584',
  HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', default: '#8b5cf6',
};

export default function GithubAnalyzer() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyze = async () => {
    if (!username.trim()) return;
    setLoading(true); setError(''); setData(null);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
      ]);
      if (!userRes.ok) throw new Error('User not found');
      const user = await userRes.json();
      const repoList = await reposRes.json();

      const langCount = {};
      repoList.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
      const topLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 6);
      const totalStars = repoList.reduce((s, r) => s + r.stargazers_count, 0);
      const topRepos = [...repoList].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);

      setData({ user, topLangs, totalStars, totalRepos: repoList.length });
      setRepos(topRepos);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-lg"><Github size={22} className="text-green-400"/></div>
        <h1 className="text-2xl font-bold text-white">GitHub Profile Analyzer</h1>
      </div>

      <div className="flex gap-2 mb-6">
        <input value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === 'Enter' && analyze()}
          placeholder="GitHub username..."
          className="flex-1 bg-[#1a1a2e] border border-green-900/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-green-500"/>
        <button onClick={analyze} disabled={loading || !username.trim()}
          className="bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white px-5 rounded-xl font-semibold transition flex items-center gap-2">
          {loading ? <Loader2 size={16} className="animate-spin"/> : <Github size={16}/>} Analyze
        </button>
      </div>

      {error && <div className="p-4 bg-red-900/20 border border-red-700/40 rounded-xl flex gap-2 text-red-400 text-sm mb-4"><AlertCircle size={16}/>{error}</div>}

      {data && (
        <div className="space-y-4">
          <div className="bg-[#1a1a2e] border border-green-900/30 rounded-2xl p-5 flex gap-5 items-start">
            <img src={data.user.avatar_url} alt="" className="w-20 h-20 rounded-full border-2 border-green-700/40"/>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{data.user.name || data.user.login}</h2>
              <p className="text-gray-400 text-sm">@{data.user.login}</p>
              {data.user.bio && <p className="text-gray-300 text-sm mt-1">{data.user.bio}</p>}
              {data.user.location && <p className="text-gray-500 text-xs mt-1">📍 {data.user.location}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Code2, label: 'Repositories', val: data.totalRepos },
              { icon: Star, label: 'Total Stars', val: data.totalStars },
              { icon: Users, label: 'Followers', val: data.user.followers },
              { icon: GitFork, label: 'Following', val: data.user.following },
            ].map(s => (
              <div key={s.label} className="bg-[#1a1a2e] border border-green-900/30 rounded-xl p-4 text-center">
                <s.icon size={18} className="text-green-400 mx-auto mb-1"/>
                <div className="text-xl font-bold text-white">{s.val.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>

          {data.topLangs.length > 0 && (
            <div className="bg-[#1a1a2e] border border-green-900/30 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Top Languages</h3>
              <div className="flex flex-wrap gap-2">
                {data.topLangs.map(([lang, count]) => (
                  <div key={lang} className="flex items-center gap-1.5 bg-[#0f0f1a] border border-white/5 rounded-full px-3 py-1 text-xs text-gray-300">
                    <span style={{ background: LANGS_COLORS[lang] || LANGS_COLORS.default }} className="w-2.5 h-2.5 rounded-full"/>
                    {lang} <span className="text-gray-600">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[#1a1a2e] border border-green-900/30 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Top Repositories</h3>
            <div className="space-y-2">
              {repos.map(r => (
                <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-[#0f0f1a] rounded-lg hover:bg-white/5 transition">
                  <div>
                    <span className="text-sm text-green-400 font-medium">{r.name}</span>
                    {r.description && <p className="text-xs text-gray-500 truncate max-w-xs">{r.description}</p>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 shrink-0">
                    {r.language && <span style={{ color: LANGS_COLORS[r.language] || '#8b5cf6' }}>{r.language}</span>}
                    <span className="flex items-center gap-1"><Star size={11}/>{r.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork size={11}/>{r.forks_count}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
