import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

import ResumeAnalyzer from './pages/resume/ResumeAnalyzer';
import ResumeBuilder from './pages/resume/ResumeBuilder';
import CoverLetter from './pages/resume/CoverLetter';
import LinkedInBio from './pages/resume/LinkedInBio';
import JdDecoder from './pages/resume/JdDecoder';

import MockInterview from './pages/ai/MockInterview';
import Flashcards from './pages/ai/Flashcards';
import EssayGrader from './pages/ai/EssayGrader';
import Summarizer from './pages/ai/Summarizer';
import FakeNews from './pages/ai/FakeNews';

import GithubAnalyzer from './pages/data/GithubAnalyzer';
import DsaVisualizer from './pages/data/DsaVisualizer';
import StockTracker from './pages/data/StockTracker';
import CricketStats from './pages/data/CricketStats';

import TypingTest from './pages/fun/TypingTest';
import CoderWordle from './pages/fun/CoderWordle';
import CodeRoaster from './pages/fun/CodeRoaster';
import LeetcodeTracker from './pages/fun/LeetcodeTracker';

import PgFinder from './pages/india/PgFinder';
import TutorFinder from './pages/india/TutorFinder';
import BusRoutes from './pages/india/BusRoutes';
import CollegeFests from './pages/india/CollegeFests';

import Confessions from './pages/community/Confessions';
import StudyGroups from './pages/community/StudyGroups';
import SkillSwap from './pages/community/SkillSwap';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route path="/linkedin-bio" element={<LinkedInBio />} />
          <Route path="/jd-decoder" element={<JdDecoder />} />

          <Route path="/mock-interview" element={<MockInterview />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/essay-grader" element={<EssayGrader />} />
          <Route path="/summarizer" element={<Summarizer />} />
          <Route path="/fake-news" element={<FakeNews />} />

          <Route path="/github-analyzer" element={<GithubAnalyzer />} />
          <Route path="/dsa-visualizer" element={<DsaVisualizer />} />
          <Route path="/stock-tracker" element={<StockTracker />} />
          <Route path="/cricket-stats" element={<CricketStats />} />

          <Route path="/typing-test" element={<TypingTest />} />
          <Route path="/coder-wordle" element={<CoderWordle />} />
          <Route path="/code-roaster" element={<CodeRoaster />} />
          <Route path="/leetcode-tracker" element={<LeetcodeTracker />} />

          <Route path="/pg-finder" element={<PgFinder />} />
          <Route path="/tutor-finder" element={<TutorFinder />} />
          <Route path="/bus-routes" element={<BusRoutes />} />
          <Route path="/college-fests" element={<CollegeFests />} />

          <Route path="/confessions" element={<Confessions />} />
          <Route path="/study-groups" element={<StudyGroups />} />
          <Route path="/skill-swap" element={<SkillSwap />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
