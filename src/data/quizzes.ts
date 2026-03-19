export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export const quizzes: Record<string, QuizQuestion[]> = {
  "ai-agents-automation-2026": [
    {
      question: "What is the primary characteristic that distinguishes AI agents from traditional automation?",
      options: [
        "They run faster than regular scripts",
        "They can autonomously make decisions and adapt to new situations",
        "They require less computing power",
        "They only work in cloud environments",
      ],
      correct: 1,
    },
    {
      question: "Which technology is fundamental to modern AI agent architectures?",
      options: [
        "SQL databases",
        "Large Language Models (LLMs)",
        "Blockchain consensus",
        "CSS frameworks",
      ],
      correct: 1,
    },
    {
      question: "What is a key benefit of multi-agent systems in automation?",
      options: [
        "They eliminate the need for any human oversight",
        "They reduce internet bandwidth usage",
        "They enable specialized agents to collaborate on complex tasks",
        "They replace all existing software",
      ],
      correct: 2,
    },
  ],

  "blockchain-ai-integration": [
    {
      question: "How can blockchain enhance AI systems?",
      options: [
        "By making AI models run faster",
        "By providing transparent and immutable data provenance",
        "By reducing the size of neural networks",
        "By eliminating the need for training data",
      ],
      correct: 1,
    },
    {
      question: "What role do smart contracts play in AI-blockchain integration?",
      options: [
        "They store AI model weights on-chain",
        "They automate trustless execution of AI-driven decisions",
        "They replace machine learning algorithms",
        "They mine cryptocurrency for AI training",
      ],
      correct: 1,
    },
    {
      question: "What is a challenge of combining AI with blockchain?",
      options: [
        "AI cannot read blockchain data",
        "Blockchain networks are too fast for AI",
        "On-chain computation is expensive and limited for complex AI tasks",
        "There are no programming languages that support both",
      ],
      correct: 2,
    },
  ],

  // Placeholder entries for upcoming posts (CMO will provide content)
  "defi-ai-machine-learning": [],
  "building-first-ai-agent-guide": [],
  "zero-knowledge-proofs-ai-privacy": [],
  "multi-agent-systems-collaboration": [],
};
