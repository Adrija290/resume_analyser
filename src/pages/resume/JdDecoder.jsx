import { Search } from 'lucide-react';
import { AiTool } from '../../components/AiTool';

const SYSTEM = `You are a job description analyst. Decode the job description and provide:

## Must-Have Skills
- List technical skills that are explicitly required (keywords: "required", "must have", "essential")

## Nice-to-Have Skills
- List preferred/bonus skills ("preferred", "plus", "bonus", "nice to have")

## Hidden Requirements
- Soft skills, cultural fit hints, unstated expectations

## Key Responsibilities (Top 5)
- Most important things you'll actually do

## Red Flags (if any)
- Unclear scope, overloaded role, unrealistic expectations

## Application Tips
- Keywords to use in your resume/cover letter
- What to emphasize

Be specific and actionable.`;

export default function JdDecoder() {
  return (
    <AiTool
      title="Job Description Decoder"
      icon={Search}
      systemPrompt={SYSTEM}
      placeholder="Paste the full job description here..."
      inputLabel="Job Description"
      buttonLabel="Decode JD"
    />
  );
}
