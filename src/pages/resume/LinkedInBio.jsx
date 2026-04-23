import { Link2 as Linkedin } from 'lucide-react';
import { AiTool } from '../../components/AiTool';

const SYSTEM = `You are a LinkedIn profile optimization expert. Write an engaging LinkedIn summary (About section) that:
- Starts with a compelling hook (not "I am a...")
- Highlights key skills and achievements with numbers
- Shows personality and passion
- Includes relevant keywords for ATS/LinkedIn search
- Ends with what you're looking for / open to
- Length: 200-300 words
- Use emojis sparingly for visual appeal`;

export default function LinkedInBio() {
  return (
    <AiTool
      title="LinkedIn Bio Writer"
      icon={Linkedin}
      systemPrompt={SYSTEM}
      placeholder="Your skills, experience, achievements, target role, and anything unique about you..."
      inputLabel="Tell me about yourself"
      buttonLabel="Write LinkedIn Bio"
    />
  );
}
