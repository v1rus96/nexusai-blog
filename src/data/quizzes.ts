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

  "defi-ai-machine-learning": [
    {
      question: "What is the primary advantage of using ML in DeFi yield optimization?",
      options: [
        "It eliminates all financial risk",
        "It can predict optimal yield strategies across protocols in real-time",
        "It makes transactions faster on-chain",
        "It reduces gas fees automatically",
      ],
      correct: 1,
    },
    {
      question: "Which technology helps detect fraud in DeFi protocols?",
      options: [
        "Simple rule-based filters",
        "Manual transaction review",
        "Anomaly detection using machine learning models",
        "Static code analysis only",
      ],
      correct: 2,
    },
    {
      question: "What does an AI-powered AMM optimize?",
      options: [
        "Block confirmation times",
        "Smart contract deployment costs",
        "Liquidity distribution across price ranges",
        "Wallet address generation",
      ],
      correct: 2,
    },
  ],

  "building-first-ai-agent-guide": [
    {
      question: "What are the three core components of an AI agent?",
      options: [
        "Input, processing, output",
        "Perception, reasoning, action",
        "Training, inference, deployment",
        "Frontend, backend, database",
      ],
      correct: 1,
    },
    {
      question: "What is the purpose of a tool in an AI agent?",
      options: [
        "It replaces the language model entirely",
        "It extends the agent's capabilities beyond text generation",
        "It stores the agent's training data",
        "It provides the user interface",
      ],
      correct: 1,
    },
    {
      question: "Why is memory important for AI agents?",
      options: [
        "It makes the agent run faster",
        "It reduces API costs",
        "It maintains context across interactions for coherent behavior",
        "It is required for the agent to start",
      ],
      correct: 2,
    },
  ],

  "zero-knowledge-proofs-ai-privacy": [
    {
      question: "What does a zero-knowledge proof verify?",
      options: [
        "The identity of the prover",
        "The truth of a statement without revealing the underlying data",
        "The speed of a blockchain transaction",
        "The size of the encrypted payload",
      ],
      correct: 1,
    },
    {
      question: "What is zkML?",
      options: [
        "A new programming language for ML",
        "Zero-knowledge machine learning — verifiable ML inference without exposing data or models",
        "A blockchain consensus mechanism",
        "A compression algorithm for neural networks",
      ],
      correct: 1,
    },
    {
      question: "What is the main challenge of zkML?",
      options: [
        "Lack of developer interest",
        "Incompatibility with existing blockchains",
        "Significant computational overhead for generating proofs",
        "It only works with small datasets",
      ],
      correct: 2,
    },
  ],

  "multi-agent-systems-collaboration": [
    {
      question: "What distinguishes multi-agent from single-agent systems?",
      options: [
        "Multi-agent systems use more GPU memory",
        "Multiple specialized agents collaborate to solve complex tasks",
        "They require a blockchain to coordinate",
        "Single-agent systems cannot use tools",
      ],
      correct: 1,
    },
    {
      question: "What is the blackboard communication pattern?",
      options: [
        "A visual debugging tool for agents",
        "A shared memory space where agents read and write information",
        "A type of neural network architecture",
        "A protocol for agent-to-user communication",
      ],
      correct: 1,
    },
    {
      question: "Which framework uses role-based agent collaboration?",
      options: [
        "TensorFlow",
        "LangChain",
        "CrewAI",
        "PyTorch",
      ],
      correct: 2,
    },
  ],
};
