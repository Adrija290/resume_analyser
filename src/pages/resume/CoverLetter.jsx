import { Mail } from 'lucide-react';
import { AiTool } from '../../components/AiTool';

const SYSTEM = `You are an expert career coach. Write a compelling, personalized cover letter based on the job description and candidate background provided.
- Keep it to 3 paragraphs: hook, match, close
- Mirror keywords from the JD
- Sound human, not robotic
- Include specific achievements from the candidate's background
- End with a clear call to action
Format in plain text (no markdown headers).`;

export default function CoverLetter() {
  return (
    <AiTool
      title="Cover Letter Generator"
      icon={Mail}
      systemPrompt={SYSTEM}
      placeholder="Paste the job description here..."
      inputLabel="Job Description"
      buttonLabel="Generate Cover Letter"
      multiInput={{
        label: 'Your Background (skills, experience, achievements)',
        placeholder: 'e.g. 2 years React dev, built e-commerce app with 10k users, Python, Node.js...',
      }}
    />
  );
}
