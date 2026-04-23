import { GraduationCap } from 'lucide-react';
import { AiTool } from '../../components/AiTool';

const SYSTEM = `You are an expert essay grader. Evaluate the essay and provide:

## Grade: X/100 (Letter Grade)

## Rubric Breakdown
| Criteria | Score | Comments |
|----------|-------|----------|
| Thesis / Argument | /20 | |
| Evidence & Examples | /20 | |
| Structure & Flow | /20 | |
| Language & Style | /20 | |
| Originality | /20 | |

## Strengths (3 points)

## Areas for Improvement (3 points)

## Specific Suggestions
- Line-level feedback on what to change

## Overall Comments
1-2 sentences summary.`;

export default function EssayGrader() {
  return (
    <AiTool
      title="Essay Grader"
      icon={GraduationCap}
      systemPrompt={SYSTEM}
      placeholder="Paste your essay here..."
      inputLabel="Essay Text"
      buttonLabel="Grade Essay"
    />
  );
}
