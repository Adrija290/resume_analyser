import { FileText } from 'lucide-react';
import { AiTool } from '../../components/AiTool';

const SYSTEM = `You are an expert resume reviewer. Analyze the resume text and provide:
1. **Overall Score** (out of 100) with a brief rating label
2. **Strengths** (3-5 bullet points)
3. **Weaknesses / Gaps** (3-5 bullet points)
4. **ATS Optimization Tips** (keywords, formatting)
5. **Suggested Improvements** (specific, actionable)
6. **Section-by-Section Feedback** (Summary, Experience, Skills, Education)
Be concise but thorough. Format with markdown.`;

export default function ResumeAnalyzer() {
  return (
    <AiTool
      title="Resume Analyzer"
      icon={FileText}
      systemPrompt={SYSTEM}
      placeholder="Paste your resume text here..."
      inputLabel="Paste your resume text"
      buttonLabel="Analyze Resume"
    />
  );
}
