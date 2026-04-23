import { Link } from 'react-router-dom';
import {
  FileText, PenTool, Mail, Link2, Search,
  MessageSquare, BookOpen, GraduationCap, AlignLeft, AlertTriangle,
  GitBranch, BarChart2, TrendingUp, Trophy,
  Keyboard, HelpCircle, Flame, Target,
  MapPin, Users, Bus, Calendar,
  MessageCircle, BookMarked, RefreshCw, Zap
} from 'lucide-react';

const CATEGORIES = [
  {
    title: '📄 Resume / Career',
    color: 'from-purple-900/40 to-purple-800/20',
    border: 'border-purple-700/30',
    badge: 'bg-purple-500/20 text-purple-300',
    tools: [
      { icon: FileText, label: 'Resume Analyzer', path: '/resume-analyzer', desc: 'AI score + feedback' },
      { icon: PenTool, label: 'Resume Builder', path: '/resume-builder', desc: 'Generate clean PDF' },
      { icon: Mail, label: 'Cover Letter', path: '/cover-letter', desc: 'Paste JD, get letter' },
      { icon: Link2, label: 'LinkedIn Bio', path: '/linkedin-bio', desc: 'Optimized summary' },
      { icon: Search, label: 'JD Decoder', path: '/jd-decoder', desc: 'Must-have vs nice-to-have' },
    ],
  },
  {
    title: '🧠 AI-Powered Tools',
    color: 'from-blue-900/40 to-blue-800/20',
    border: 'border-blue-700/30',
    badge: 'bg-blue-500/20 text-blue-300',
    tools: [
      { icon: MessageSquare, label: 'Mock Interview', path: '/mock-interview', desc: 'AI evaluates answers' },
      { icon: BookOpen, label: 'Flashcard Generator', path: '/flashcards', desc: 'Topic → study cards' },
      { icon: GraduationCap, label: 'Essay Grader', path: '/essay-grader', desc: 'AI marks + feedback' },
      { icon: AlignLeft, label: 'Text Summarizer', path: '/summarizer', desc: '5 bullet summary' },
      { icon: AlertTriangle, label: 'Fake News Detector', path: '/fake-news', desc: 'Check credibility' },
    ],
  },
  {
    title: '📊 Data & Visualization',
    color: 'from-green-900/40 to-green-800/20',
    border: 'border-green-700/30',
    badge: 'bg-green-500/20 text-green-300',
    tools: [
      { icon: GitBranch, label: 'GitHub Analyzer', path: '/github-analyzer', desc: 'Stats + graphs' },
      { icon: BarChart2, label: 'DSA Visualizer', path: '/dsa-visualizer', desc: 'Animate algorithms' },
      { icon: TrendingUp, label: 'Stock Tracker', path: '/stock-tracker', desc: 'NSE/BSE charts' },
      { icon: Trophy, label: 'Cricket Stats', path: '/cricket-stats', desc: 'Player comparisons' },
    ],
  },
  {
    title: '🎮 Fun But Technical',
    color: 'from-orange-900/40 to-orange-800/20',
    border: 'border-orange-700/30',
    badge: 'bg-orange-500/20 text-orange-300',
    tools: [
      { icon: Keyboard, label: 'Typing Speed Test', path: '/typing-test', desc: 'Coding snippets' },
      { icon: HelpCircle, label: 'Coder Wordle', path: '/coder-wordle', desc: 'Guess the keyword' },
      { icon: Flame, label: 'Code Roaster', path: '/code-roaster', desc: 'AI humorously roasts' },
      { icon: Target, label: 'LeetCode Tracker', path: '/leetcode-tracker', desc: 'Daily streak' },
    ],
  },
  {
    title: '🏙️ Hyperlocal India',
    color: 'from-pink-900/40 to-pink-800/20',
    border: 'border-pink-700/30',
    badge: 'bg-pink-500/20 text-pink-300',
    tools: [
      { icon: MapPin, label: 'PG/Hostel Finder', path: '/pg-finder', desc: 'Student accommodation' },
      { icon: Users, label: 'Tutor Finder', path: '/tutor-finder', desc: 'Subject + area' },
      { icon: Bus, label: 'Bus Route Planner', path: '/bus-routes', desc: 'Kolkata & more' },
      { icon: Calendar, label: 'College Fest Hub', path: '/college-fests', desc: 'All fests, one place' },
    ],
  },
  {
    title: '💬 Community Tools',
    color: 'from-teal-900/40 to-teal-800/20',
    border: 'border-teal-700/30',
    badge: 'bg-teal-500/20 text-teal-300',
    tools: [
      { icon: MessageCircle, label: 'Confession Board', path: '/confessions', desc: 'Anonymous posts' },
      { icon: BookMarked, label: 'Study Group Finder', path: '/study-groups', desc: 'Same subject match' },
      { icon: RefreshCw, label: 'Skill Swap', path: '/skill-swap', desc: 'Teach guitar, learn code' },
    ],
  },
];

function ToolCard({ icon: Icon, label, path, desc, badge }) {
  return (
    <Link
      to={path}
      className="group flex items-start gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/8 border border-white/5 hover:border-white/15 transition-all"
    >
      <div className={`mt-0.5 p-2 rounded-lg ${badge} shrink-0`}>
        <Icon size={16}/>
      </div>
      <div className="text-left min-w-0">
        <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition truncate">{label}</div>
        <div className="text-xs text-gray-500 truncate">{desc}</div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-4">
          <Zap size={14}/> 25+ Tools • AI-Powered • Free
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          Dev<span className="text-purple-400">Tools</span> Hub
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Career tools, AI assistants, data viz, games & hyperlocal India tools — all in one place.
        </p>
      </div>

      <div className="grid gap-6">
        {CATEGORIES.map(cat => (
          <div key={cat.title} className={`rounded-2xl bg-gradient-to-br ${cat.color} border ${cat.border} p-5`}>
            <h2 className="text-base font-bold text-white mb-4">{cat.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {cat.tools.map(t => (
                <ToolCard key={t.path} {...t} badge={cat.badge}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
