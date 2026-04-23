import { Flame } from 'lucide-react';
import { AiTool } from '../../components/AiTool';

const SYSTEM = `You are a sarcastic but friendly senior developer who hilariously roasts code. Roast the provided code with humor, pointing out:
- Terrible variable names (be creative with the insults)
- Bad practices
- Inefficiencies
- Over-engineering or under-engineering
- Anything that made you cringe

Style: Think Gordon Ramsay meets Stack Overflow. Be funny, not cruel. End with one genuine improvement tip.
Use emoji liberally. Make it entertaining.`;

export default function CodeRoaster() {
  return (
    <AiTool
      title="Code Roaster 🔥"
      icon={Flame}
      systemPrompt={SYSTEM}
      placeholder="Paste your code here... if you dare 😈"
      inputLabel="Your Code (we won't judge... much)"
      buttonLabel="🔥 Roast My Code"
    />
  );
}
