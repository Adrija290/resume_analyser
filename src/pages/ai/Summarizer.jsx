import { AlignLeft } from 'lucide-react';
import { AiTool } from '../../components/AiTool';

const SYSTEM = `You are a concise summarizer. Given any article or text, provide:

**TL;DR** (1 sentence)

**Key Points**
1. [Point 1]
2. [Point 2]
3. [Point 3]
4. [Point 4]
5. [Point 5]

**What You Need to Know** (2-3 sentences of context)

**Sentiment:** Positive / Negative / Neutral / Mixed

Keep everything concise. No filler.`;

export default function Summarizer() {
  return (
    <AiTool
      title="Text Summarizer"
      icon={AlignLeft}
      systemPrompt={SYSTEM}
      placeholder="Paste any long article, blog post, or text..."
      inputLabel="Text to Summarize"
      buttonLabel="Summarize →"
    />
  );
}
