import { useState } from 'react';
import { MessageCircle, Send, Heart } from 'lucide-react';

const SEED = [
  { id: 1, text: "I've been copying assignment solutions from GitHub for 2 years and somehow got placed in a top company. Now I actually have to write code and I'm terrified.", college: 'Engineering College', likes: 142, time: '2h ago' },
  { id: 2, text: "I skip 90% of my offline lectures but the professor still thinks I'm the most attentive student because I always sit front row when I do attend.", college: 'IIT Bombay', likes: 89, time: '3h ago' },
  { id: 3, text: "My parents think I'm in college studying. I'm actually at a 48-hour hackathon without telling them. The worst part? We're winning.", college: 'NIT Trichy', likes: 234, time: '5h ago' },
  { id: 4, text: "Failed Data Structures twice. Cleared it in the third attempt. Now I'm a DSA tutor on Chegg. Life is strange.", college: 'VIT Vellore', likes: 67, time: '8h ago' },
  { id: 5, text: "Our project was literally a slideshow. We presented it with such confidence that the evaluator gave us a 9/10.", college: 'Jadavpur University', likes: 178, time: '1d ago' },
];

const generateId = () => Date.now() + Math.random();

export default function Confessions() {
  const [posts, setPosts] = useState(SEED);
  const [text, setText] = useState('');
  const [college, setCollege] = useState('');
  const [liked, setLiked] = useState(new Set());

  const post = () => {
    if (!text.trim()) return;
    setPosts(p => [{ id: generateId(), text: text.trim(), college: college.trim() || 'Anonymous', likes: 0, time: 'Just now' }, ...p]);
    setText(''); setCollege('');
  };

  const like = (id) => {
    if (liked.has(id)) return;
    setLiked(l => new Set([...l, id]));
    setPosts(p => p.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-teal-500/20 rounded-lg"><MessageCircle size={22} className="text-teal-400"/></div>
        <div>
          <h1 className="text-2xl font-bold text-white">Anonymous Confession Board</h1>
          <span className="text-xs text-gray-500">College-specific • No accounts needed</span>
        </div>
      </div>

      <div className="bg-[#1a1a2e] border border-teal-900/30 rounded-2xl p-5 mb-6">
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Share your confession anonymously..."
          rows={3} maxLength={500}
          className="w-full bg-[#0f0f1a] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 resize-none outline-none focus:border-teal-500 mb-2"/>
        <div className="flex gap-2 items-center">
          <input value={college} onChange={e => setCollege(e.target.value)} placeholder="Your college (optional)"
            className="flex-1 bg-[#0f0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-teal-500"/>
          <span className="text-xs text-gray-600">{text.length}/500</span>
          <button onClick={post} disabled={!text.trim()}
            className="bg-teal-700 hover:bg-teal-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition flex items-center gap-1 text-sm font-semibold">
            <Send size={14}/> Post
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map(p => (
          <div key={p.id} className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4">
            <p className="text-gray-200 text-sm leading-relaxed mb-3">{p.text}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span>{p.college}</span>
                <span>•</span>
                <span>{p.time}</span>
              </div>
              <button onClick={() => like(p.id)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full transition ${liked.has(p.id) ? 'text-red-400 bg-red-900/20' : 'text-gray-500 hover:text-red-400 bg-white/5 hover:bg-red-900/10'}`}>
                <Heart size={12} className={liked.has(p.id) ? 'fill-red-400' : ''}/>{p.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
