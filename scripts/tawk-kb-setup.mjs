import puppeteer from '/home/ubuntu/.npm-global/lib/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const PROPERTY_ID = '69bb5403bb7f0b1c337b2f70';
const EMAIL = 'firuz.akhmadov@gmail.com';
const PASSWORD = 'Firik1996Virus!@';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const articles = [
  {
    title: "What Are AI Agents?",
    body: `<h2>Understanding AI Agents: The Future of Autonomous Software</h2>
<p>Artificial Intelligence agents represent a paradigm shift in how software interacts with the world. Unlike traditional programs that follow rigid, pre-defined instructions, AI agents are autonomous software entities capable of perceiving their environment, reasoning about information, and taking independent action to achieve specific goals.</p>
<h3>What Defines an AI Agent?</h3>
<p>At its core, an AI agent possesses four fundamental capabilities. First, <strong>perception</strong>: the ability to gather information from its environment through APIs, sensors, databases, or user inputs. Second, <strong>reasoning</strong>: the capacity to process and analyze perceived information using machine learning models, rule engines, or large language models. Third, <strong>decision-making</strong>: the ability to choose optimal actions based on its analysis. Fourth, <strong>action</strong>: the capability to execute decisions by interacting with external systems, generating outputs, or modifying its environment.</p>
<h3>Types of AI Agents</h3>
<p><strong>Reactive agents</strong> respond directly to stimuli without maintaining internal state. They operate on simple stimulus-response rules, making them fast but limited in handling complex scenarios. Think of a spam filter that classifies emails based on patterns — it reacts to each email independently.</p>
<p><strong>Deliberative agents</strong> maintain an internal model of the world and use planning algorithms to determine courses of action. These agents can reason about future states, evaluate multiple strategies, and select the most promising path. An example would be an autonomous trading agent that models market conditions before executing trades.</p>
<p><strong>Hybrid agents</strong> combine reactive and deliberative approaches, using reactive behaviors for time-critical responses while employing deliberative reasoning for complex, longer-term planning. Most modern AI agents fall into this category, leveraging the speed of reactive systems with the intelligence of deliberative ones.</p>
<h3>AI Agents vs. Chatbots</h3>
<p>A common misconception is that AI agents and chatbots are the same thing. Traditional chatbots follow scripted conversation flows — they match user inputs to predefined responses. AI agents, by contrast, can break down complex requests into sub-tasks, use external tools, maintain context across interactions, and adapt their strategies based on outcomes. While a chatbot might tell you the weather, an AI agent could monitor weather patterns, reschedule your outdoor meetings, and book an indoor venue — all autonomously.</p>
<h3>Real-World Use Cases</h3>
<p>AI agents are transforming industries across the board. In <strong>customer service</strong>, they resolve complex multi-step issues without human intervention. In <strong>software development</strong>, coding agents write, test, and deploy code. In <strong>research</strong>, they autonomously gather, synthesize, and summarize information from hundreds of sources. In <strong>business operations</strong>, they automate workflows spanning multiple departments and systems.</p>
<p>The era of AI agents is just beginning, and their potential to augment human capabilities is virtually limitless. As language models become more powerful and tool integration more seamless, AI agents will become indispensable partners in both personal and professional contexts.</p>`
  },
  {
    title: "Agentic AI Explained",
    body: `<h2>Agentic AI: When Artificial Intelligence Takes the Wheel</h2>
<p>Agentic AI represents the cutting edge of artificial intelligence — systems that don't just respond to prompts but actively plan, reason, and execute multi-step tasks with minimal human oversight. This evolution from passive AI assistants to proactive AI agents is reshaping how we think about automation and intelligence.</p>
<h3>The Core Pillars of Agentic AI</h3>
<p><strong>Multi-step reasoning</strong> is the foundation. Unlike simple question-answer systems, agentic AI breaks complex objectives into manageable sub-tasks, creates execution plans, and iterates through steps while adapting to new information. When asked to "research competitors and create a market analysis," an agentic system will independently identify competitors, gather data from multiple sources, analyze findings, and compile a structured report.</p>
<p><strong>Tool use</strong> dramatically expands an agent's capabilities beyond text generation. Modern agentic systems can browse the web, execute code, query databases, call APIs, manage files, and interact with virtually any software tool. This transforms them from knowledge systems into action systems — they don't just know things, they do things.</p>
<p><strong>Planning and decomposition</strong> allow agents to tackle problems that require strategic thinking. Advanced agents use techniques like chain-of-thought reasoning, tree-of-thought exploration, and ReAct (Reasoning + Acting) patterns to navigate complex problem spaces systematically.</p>
<p><strong>Memory</strong> gives agents continuity across interactions. Short-term memory (conversation context) and long-term memory (persistent knowledge stores) enable agents to learn from past interactions, remember user preferences, and build on previous work rather than starting from scratch each time.</p>
<h3>Leading Frameworks</h3>
<p><strong>LangChain</strong> provides a comprehensive toolkit for building LLM-powered applications. Its agent framework supports tool integration, chain composition, and memory management, making it one of the most popular choices for developers building agentic systems.</p>
<p><strong>CrewAI</strong> focuses on multi-agent orchestration, enabling teams of specialized AI agents to collaborate on complex tasks. Each agent has defined roles, goals, and tools, mimicking how human teams operate. A "research crew" might include a data gatherer, analyst, and writer working together.</p>
<p><strong>AutoGen</strong> by Microsoft enables multi-agent conversations where agents can collaborate, debate, and refine solutions through structured dialogue. Its conversational approach to agent interaction makes complex workflows feel natural and debuggable.</p>
<h3>The Agentic Future</h3>
<p>The trajectory of agentic AI points toward increasingly autonomous systems that can manage entire workflows end-to-end. From autonomous software engineers that build and deploy applications to research agents that conduct scientific investigations, the line between human and AI capabilities continues to blur. The key challenge remains ensuring these systems operate safely, transparently, and in alignment with human values.</p>`
  },
  {
    title: "AI Automation for Business",
    body: `<h2>AI Automation for Business: Beyond Simple Task Automation</h2>
<p>Business automation is undergoing a fundamental transformation. While traditional automation excels at repetitive, rule-based tasks, AI-powered automation brings intelligence, adaptability, and decision-making capabilities that are revolutionizing how organizations operate.</p>
<h3>RPA vs. AI Automation: Understanding the Difference</h3>
<p><strong>Robotic Process Automation (RPA)</strong> automates structured, repetitive tasks by mimicking human interactions with software interfaces. It follows predetermined rules — clicking buttons, copying data between systems, filling forms. RPA excels when processes are stable, well-documented, and don't require judgment calls.</p>
<p><strong>AI automation</strong> goes several steps further. It handles unstructured data, makes decisions based on context, learns from outcomes, and adapts to changing conditions. Where RPA might extract data from a standardized invoice, AI automation can process invoices in any format, flag anomalies, negotiate with vendors, and optimize payment timing — all without explicit programming for each scenario.</p>
<p>The most powerful approach combines both: RPA handles the mechanical execution while AI provides the intelligence layer that decides what to execute and how.</p>
<h3>Workflow Orchestration</h3>
<p>Modern AI automation platforms orchestrate entire business workflows that span multiple departments, systems, and decision points. Consider an employee onboarding workflow: AI automation can process the offer letter, provision IT accounts, schedule orientation sessions, assign training modules based on role, set up payroll, notify relevant team members, and track completion — adapting the process based on department, seniority level, and location.</p>
<p>Key platforms enabling this include tools like Zapier with AI integration, Microsoft Power Automate with Copilot, and custom solutions built on agent frameworks. These platforms provide visual workflow builders combined with AI-powered decision nodes that bring intelligence to every step.</p>
<h3>Decision Automation</h3>
<p>Perhaps the most impactful application of AI automation is in decision-making. Examples include: <strong>Credit approval</strong> — AI analyzes applicant data, market conditions, and risk factors to make lending decisions in seconds. <strong>Supply chain optimization</strong> — AI agents monitor inventory levels, predict demand, evaluate supplier performance, and automatically adjust orders. <strong>Customer routing</strong> — intelligent systems analyze customer issues and route them to the optimal resolution path, whether that's self-service, a chatbot, or a specialized human agent.</p>
<h3>Getting Started</h3>
<p>Businesses looking to adopt AI automation should start by identifying high-volume, decision-heavy processes where current manual handling creates bottlenecks. Begin with a pilot project that demonstrates clear ROI, then scale systematically. The goal isn't to replace humans but to augment them — freeing people to focus on creative, strategic, and relationship-driven work while AI handles the routine and analytical heavy lifting.</p>`
  },
  {
    title: "Blockchain + AI Integration",
    body: `<h2>Blockchain and AI: A Convergence of Transformative Technologies</h2>
<p>The intersection of blockchain and artificial intelligence represents one of the most promising technological convergences of our time. While AI provides intelligence and decision-making capabilities, blockchain offers trust, transparency, and decentralization — together, they address each other's fundamental limitations.</p>
<h3>Why Blockchain Needs AI</h3>
<p>Blockchain networks generate vast amounts of transactional data that can be difficult to analyze and act upon. AI brings pattern recognition, anomaly detection, and predictive capabilities to blockchain ecosystems. Smart contract auditing powered by AI can identify vulnerabilities before deployment. Fraud detection algorithms can monitor on-chain activity in real-time, flagging suspicious transactions that human reviewers would miss. AI can also optimize consensus mechanisms, predict network congestion, and improve gas fee estimation.</p>
<h3>Why AI Needs Blockchain</h3>
<p>AI systems face significant challenges around trust, accountability, and data integrity that blockchain can address. <strong>Provenance tracking</strong> ensures that AI training data can be traced to its source, verifying its authenticity and licensing status. <strong>Model transparency</strong> — by recording model versions, training parameters, and performance metrics on-chain, organizations create an immutable audit trail for AI decision-making. <strong>Decentralized governance</strong> allows stakeholders to collectively manage AI systems through DAOs, preventing any single entity from controlling powerful AI capabilities.</p>
<h3>Data Marketplaces</h3>
<p>Blockchain-powered data marketplaces are emerging as a solution to AI's insatiable need for quality training data. Platforms like Ocean Protocol enable data owners to monetize their datasets while maintaining control over how they're used. Smart contracts enforce usage terms automatically — a healthcare provider can sell anonymized patient data for medical AI training while ensuring it's never used for insurance pricing. This creates economic incentives for data sharing while preserving privacy and ownership rights.</p>
<h3>Verifiable Inference</h3>
<p>One of the most exciting developments is verifiable AI inference on blockchain. Zero-knowledge proofs and optimistic verification schemes allow AI computations to be verified without revealing the underlying model or data. This means you can prove that an AI made a specific prediction using a specific model without exposing proprietary information — critical for regulatory compliance and building trust in AI-driven decisions.</p>
<h3>On-Chain Agents</h3>
<p>AI agents operating on blockchain networks represent a new paradigm in autonomous systems. These on-chain agents can manage DeFi portfolios, execute governance votes based on proposal analysis, arbitrage across decentralized exchanges, and even create and manage their own smart contracts. The blockchain provides a trustless execution environment where agent actions are transparent and auditable, while AI provides the intelligence to make sophisticated decisions in complex, dynamic markets.</p>`
  },
  {
    title: "Decentralized AI",
    body: `<h2>Decentralized AI: Distributing Intelligence Across the Network</h2>
<p>The current AI landscape is dominated by a handful of tech giants who control the compute infrastructure, training data, and model weights that power modern artificial intelligence. Decentralized AI challenges this concentration of power by distributing every aspect of the AI pipeline across networks of independent participants.</p>
<h3>Federated Learning: Training Without Centralizing Data</h3>
<p>Federated learning enables AI models to be trained across multiple devices or organizations without ever centralizing the underlying data. Instead of sending raw data to a central server, each participant trains a local model on their data and shares only the model updates (gradients) with the network. These updates are aggregated to improve the global model while keeping individual data private.</p>
<p>This approach is particularly valuable in healthcare, where hospitals can collaboratively train diagnostic AI models without sharing patient records, and in finance, where institutions can build fraud detection systems without exposing transaction data. Google has pioneered federated learning in consumer products — your phone's keyboard predictions improve from your typing patterns without your messages ever leaving your device.</p>
<h3>Decentralized Compute Networks</h3>
<p>Training large AI models requires enormous computational resources that few organizations can afford. Decentralized compute networks are democratizing access to this infrastructure. <strong>Akash Network</strong> provides a decentralized cloud marketplace where anyone can lease spare computing capacity at a fraction of the cost of traditional cloud providers. <strong>Render Network</strong> connects GPU owners with those who need rendering and AI compute power, creating a distributed supercomputer. <strong>io.net</strong> aggregates GPU resources from data centers, crypto miners, and individual contributors into a unified compute network optimized for AI workloads.</p>
<p>These networks reduce costs by 50-90% compared to centralized providers while providing censorship resistance — no single entity can decide which AI models get trained.</p>
<h3>Token-Incentivized Training</h3>
<p>Blockchain tokens create powerful incentive mechanisms for decentralized AI development. Contributors who provide compute resources, training data, or model improvements earn tokens proportional to their contributions. <strong>Bittensor</strong> has pioneered this approach with a network where AI models compete and collaborate, with token rewards flowing to those producing the most valuable intelligence. This creates a market-driven approach to AI development where quality emerges from competition rather than corporate direction.</p>
<h3>Data Sovereignty</h3>
<p>Decentralized AI puts data ownership back in the hands of individuals and organizations. Through cryptographic techniques like homomorphic encryption and secure multi-party computation, data can be used for AI training without ever being exposed in its raw form. Users maintain control over their information while still contributing to and benefiting from collective AI intelligence. This aligns with growing regulatory requirements around data protection and represents a fundamental shift in the relationship between AI systems and the data they consume.</p>`
  },
  {
    title: "Smart Contracts & AI",
    body: `<h2>Smart Contracts and AI: Intelligent Automation on the Blockchain</h2>
<p>Smart contracts — self-executing programs stored on blockchain networks — are becoming increasingly powerful as they integrate with artificial intelligence. This convergence is creating a new category of intelligent, autonomous, and trustless systems that can make sophisticated decisions while maintaining the transparency and immutability that blockchain guarantees.</p>
<h3>AI-Powered Contract Auditing</h3>
<p>Smart contract vulnerabilities have led to billions of dollars in losses across the DeFi ecosystem. AI is transforming how these contracts are audited and secured. Machine learning models trained on thousands of known vulnerabilities can scan smart contract code and identify potential exploits in seconds — a process that previously required days of expert human review.</p>
<p>Tools like Slither, Mythril, and newer AI-native auditing platforms use a combination of static analysis, symbolic execution, and large language models to detect reentrancy attacks, integer overflows, access control issues, and logic errors. Some platforms go further by continuously monitoring deployed contracts for anomalous behavior patterns, providing real-time threat detection that can trigger automatic protective measures like pausing contracts or moving funds to safety.</p>
<h3>Autonomous On-Chain Agents</h3>
<p>AI agents operating through smart contracts represent a fascinating frontier in autonomous systems. These agents can manage DeFi strategies — rebalancing liquidity positions across multiple protocols, optimizing yield farming strategies, and executing complex arbitrage operations that span multiple blockchains. Unlike centralized trading bots, on-chain agents operate transparently: their strategies, performance, and decision logic are visible to anyone who inspects the blockchain.</p>
<p>Autonomous DAOs (Decentralized Autonomous Organizations) powered by AI can manage treasuries, evaluate and vote on proposals, hire contributors, and allocate resources — all without human management. While fully autonomous DAOs remain largely experimental, hybrid models where AI provides analysis and recommendations while humans retain final approval are already operational.</p>
<h3>Oracle-Fed Decisions</h3>
<p>Smart contracts are inherently limited to on-chain data, but AI-enhanced oracles bridge the gap between blockchain and the real world. Traditional oracles like Chainlink provide price feeds and external data to smart contracts. AI-enhanced oracles go further by processing and analyzing real-world information before delivering it on-chain.</p>
<p>For example, an AI oracle could analyze satellite imagery to verify crop yields for agricultural insurance contracts, process natural language news feeds to trigger event-based contracts, or evaluate social media sentiment to inform prediction market resolutions. The combination of AI's analytical capabilities with oracle infrastructure creates smart contracts that can respond intelligently to complex real-world conditions.</p>
<h3>Looking Ahead</h3>
<p>The integration of AI and smart contracts is still in its early stages, but the trajectory is clear: increasingly intelligent contracts that can handle complex, real-world scenarios while maintaining the trustless, transparent properties that make blockchain valuable. As AI models become smaller and more efficient, we may even see lightweight AI inference running directly within smart contract execution environments.</p>`
  },
  {
    title: "About NexusAI Blog",
    body: `<h2>About NexusAI Blog: Your Guide to AI, Blockchain, and the Decentralized Future</h2>
<p>Welcome to NexusAI Blog — a publication dedicated to exploring the intersection of artificial intelligence, blockchain technology, and decentralized systems. We believe that the convergence of these technologies will fundamentally reshape how the world works, and we're here to help you understand and navigate this transformation.</p>
<h3>Our Mission</h3>
<p>NexusAI Blog exists to make complex technology accessible. We bridge the gap between cutting-edge research and practical understanding, providing clear, informative content that serves both technical professionals and curious newcomers. Our goal is to be the resource we wish existed when we first started exploring these fields — comprehensive enough for experts, clear enough for beginners.</p>
<h3>What We Cover</h3>
<p>Our content spans several interconnected domains:</p>
<p><strong>AI Agents and Agentic Systems</strong> — We explore the rapidly evolving world of autonomous AI, from foundational concepts to practical implementation guides. Learn about agent architectures, multi-agent collaboration, tool use, and the frameworks powering the next generation of intelligent software.</p>
<p><strong>AI Automation</strong> — Discover how artificial intelligence is transforming business operations, from workflow automation and decision intelligence to customer experience optimization. We cover both strategy and tactics, helping organizations understand where AI automation delivers the most value.</p>
<p><strong>Blockchain and Crypto</strong> — From smart contract development to DeFi protocols, we provide in-depth coverage of blockchain technology and its applications. Our focus is on practical utility rather than speculation — how blockchain solves real problems in trust, transparency, and coordination.</p>
<p><strong>Decentralized AI</strong> — At the intersection of our core topics, decentralized AI represents perhaps the most transformative opportunity. We cover federated learning, decentralized compute networks, token-incentivized AI development, and the emerging infrastructure for trustless machine intelligence.</p>
<h3>Stay Connected</h3>
<p>There are several ways to stay up to date with NexusAI Blog. Visit our website regularly for new articles, tutorials, and analysis pieces. Follow us on social media for quick insights and links to our latest content. We publish new content weekly, covering timely developments alongside evergreen educational material.</p>
<h3>Who We Are</h3>
<p>NexusAI Blog is run by a team of technologists, researchers, and writers who are passionate about the future of intelligent, decentralized systems. We combine hands-on technical experience with a commitment to clear communication, ensuring that our content is both accurate and accessible.</p>
<p>Whether you're a developer building AI agents, a business leader exploring automation, an investor evaluating blockchain projects, or simply someone curious about where technology is headed — NexusAI Blog is your guide to the future being built at the nexus of AI and blockchain.</p>
<p>Thank you for reading. The future is decentralized, intelligent, and just getting started.</p>`
  }
];

async function screenshot(page, name) {
  await page.screenshot({ path: `/tmp/tawk-kb-${name}.png` });
  console.log(`  📸 Screenshot: /tmp/tawk-kb-${name}.png`);
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: '/home/ubuntu/.cache/puppeteer/chrome/linux-146.0.7680.76/chrome-linux64/chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1400,900'],
    defaultViewport: { width: 1400, height: 900 }
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(30000);

  try {
    // ==================== LOGIN ====================
    console.log('=== STEP 1: LOGIN ===');
    await page.goto('https://dashboard.tawk.to/login', { waitUntil: 'networkidle2', timeout: 60000 });
    await sleep(3000);
    await screenshot(page, '01-login');

    // Fill email
    await page.waitForSelector('input[type="email"]', { timeout: 15000 });
    await page.click('input[type="email"]');
    await page.type('input[type="email"]', EMAIL, { delay: 30 });
    await sleep(500);

    // Fill password
    await page.click('input[type="password"]');
    await page.type('input[type="password"]', PASSWORD, { delay: 30 });
    await sleep(500);
    await screenshot(page, '02-creds-filled');

    // Click "Sign In" button - using evaluate for reliability
    console.log('Clicking Sign In...');
    await page.evaluate(() => {
      // Find button containing "Sign In" text
      const buttons = [...document.querySelectorAll('button')];
      for (const btn of buttons) {
        if (btn.textContent.trim().toLowerCase().includes('sign in')) {
          btn.click();
          return;
        }
      }
      // Fallback: submit the form
      const form = document.querySelector('form');
      if (form) form.submit();
    });

    // Wait for navigation away from login page
    console.log('Waiting for login to complete...');
    await sleep(5000);
    
    // Check if we're still on login page
    let currentUrl = page.url();
    console.log('URL after first wait:', currentUrl);
    
    if (currentUrl.includes('login')) {
      // Maybe need to wait longer or try again
      await sleep(5000);
      currentUrl = page.url();
      console.log('URL after second wait:', currentUrl);
    }
    
    if (currentUrl.includes('login')) {
      // Try pressing Enter on the form
      console.log('Trying Enter key...');
      await page.focus('input[type="password"]');
      await page.keyboard.press('Enter');
      await sleep(8000);
      currentUrl = page.url();
      console.log('URL after Enter:', currentUrl);
    }

    await screenshot(page, '03-after-login');
    console.log('Final URL after login:', page.url());

    // Check if login succeeded
    if (page.url().includes('login') && !page.url().includes('dashboard')) {
      // Check for error messages
      const errorMsg = await page.evaluate(() => {
        const errors = document.querySelectorAll('[class*="error"], [class*="alert"], .text-danger, .text-red');
        return [...errors].map(e => e.textContent.trim()).filter(t => t).join('; ');
      });
      if (errorMsg) {
        console.log('Login errors:', errorMsg);
      }
      
      // One more attempt - wait for redirect
      try {
        await page.waitForNavigation({ timeout: 15000, waitUntil: 'networkidle2' });
      } catch(e) {
        // ignore
      }
      console.log('URL after final wait:', page.url());
      await screenshot(page, '03b-final-login-check');
    }

    // ==================== NAVIGATE TO KB ====================
    console.log('\n=== STEP 2: NAVIGATE TO KNOWLEDGE BASE ===');
    await sleep(3000);
    
    // First let's see what's on the page
    const dashInfo = await page.evaluate(() => {
      return {
        url: window.location.href,
        title: document.title,
        hasNav: !!document.querySelector('nav, [class*="sidebar"], [class*="nav"]'),
        allLinks: [...document.querySelectorAll('a')].slice(0, 30).map(a => ({
          text: a.textContent.trim().substring(0, 60),
          href: (a.href || '').substring(0, 100),
          visible: a.offsetParent !== null
        }))
      };
    });
    console.log('Dashboard info:', JSON.stringify(dashInfo, null, 2));
    await screenshot(page, '04-dashboard');

    // Look for KB link in the sidebar/navigation
    const kbClicked = await page.evaluate(() => {
      const allLinks = [...document.querySelectorAll('a')];
      // Priority 1: direct KB link
      for (const a of allLinks) {
        if (a.href && a.href.includes('knowledgebase') && a.offsetParent !== null) {
          a.click();
          return 'found-kb-link: ' + a.href;
        }
      }
      // Priority 2: text match
      for (const a of allLinks) {
        const text = a.textContent.trim().toLowerCase();
        if ((text.includes('knowledge') || text.includes('kb')) && a.offsetParent !== null) {
          a.click();
          return 'found-kb-text: ' + a.textContent.trim();
        }
      }
      // Priority 3: button with setup
      const buttons = [...document.querySelectorAll('button')];
      for (const btn of buttons) {
        if (btn.textContent.toLowerCase().includes('knowledge') && btn.offsetParent !== null) {
          btn.click();
          return 'found-kb-button: ' + btn.textContent.trim();
        }
      }
      return null;
    });
    
    console.log('KB click result:', kbClicked);
    await sleep(5000);
    await screenshot(page, '05-after-kb-nav');
    console.log('URL after KB nav:', page.url());

    // If KB link not found in sidebar, try navigating through the admin menu
    if (!kbClicked && !page.url().includes('knowledgebase')) {
      console.log('Trying to find KB through menu/admin...');
      
      // Look for admin/gear icon or settings
      await page.evaluate(() => {
        // Look for sidebar icons - tawk uses icon-based sidebar
        const sidebarEls = document.querySelectorAll('[class*="sidebar"] *, nav *, [class*="menu"] *');
        for (const el of sidebarEls) {
          const title = el.getAttribute('title') || '';
          const ariaLabel = el.getAttribute('aria-label') || '';
          if (title.toLowerCase().includes('knowledge') || ariaLabel.toLowerCase().includes('knowledge')) {
            el.click();
            return;
          }
        }
      });
      await sleep(3000);
      
      // Try direct page navigation with hash change + reload
      console.log('Attempting direct URL navigation...');
      await page.evaluate((propId) => {
        window.location.hash = `#/knowledgebase/${propId}`;
      }, PROPERTY_ID);
      await sleep(3000);
      
      // Force a hashchange event
      await page.evaluate(() => {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      });
      await sleep(5000);
      await screenshot(page, '06-hash-nav');
      console.log('URL after hash nav:', page.url());
    }

    // If still not on KB, try full page navigation
    if (!page.url().includes('knowledgebase')) {
      console.log('Full page goto KB URL...');
      await page.goto(`https://dashboard.tawk.to/#/knowledgebase/${PROPERTY_ID}`, { waitUntil: 'networkidle2', timeout: 30000 });
      await sleep(8000);
      await screenshot(page, '07-full-goto');
      console.log('URL after full goto:', page.url());
    }

    // Final check - dump what we see
    await sleep(3000);
    const kbPageInfo = await page.evaluate(() => {
      return {
        url: window.location.href,
        title: document.title,
        bodyText: document.body?.innerText?.substring(0, 2000),
        buttons: [...document.querySelectorAll('button')].filter(b => b.offsetParent !== null).map(b => b.textContent.trim().substring(0, 60)).slice(0, 20),
        inputs: [...document.querySelectorAll('input, textarea, [contenteditable="true"]')].map(i => ({
          tag: i.tagName,
          type: i.type || 'none',
          placeholder: i.placeholder || '',
          visible: i.offsetParent !== null
        })).slice(0, 10)
      };
    });
    console.log('KB page info:', JSON.stringify(kbPageInfo, null, 2));
    await screenshot(page, '08-kb-ready');

    // ==================== CREATE ARTICLES ====================
    console.log('\n=== STEP 3: CREATE ARTICLES ===');

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      console.log(`\n--- Article ${i + 1}/7: "${article.title}" ---`);

      // Click "Add Article" button
      await sleep(2000);
      const addResult = await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button, a, [role="button"]')].filter(b => b.offsetParent !== null);
        for (const btn of btns) {
          const text = btn.textContent.trim().toLowerCase();
          if (text.includes('add article') || text.includes('new article') || text.includes('create article') || text.includes('add new') || text === 'add') {
            btn.click();
            return 'clicked: ' + btn.textContent.trim();
          }
        }
        // Look for + or add icon
        for (const btn of btns) {
          const text = btn.textContent.trim();
          if (text === '+' || text === 'Add') {
            btn.click();
            return 'clicked-plus: ' + text;
          }
        }
        return null;
      });
      console.log('Add article result:', addResult);
      await sleep(3000);
      await screenshot(page, `art${i+1}-01-add`);

      // Fill title
      const titleResult = await page.evaluate((title) => {
        // Look for title input
        const inputs = [...document.querySelectorAll('input[type="text"], input:not([type]), input[placeholder]')].filter(i => i.offsetParent !== null);
        for (const inp of inputs) {
          const ph = (inp.placeholder || '').toLowerCase();
          const name = (inp.name || '').toLowerCase();
          if (ph.includes('title') || ph.includes('name') || name.includes('title') || ph.includes('article')) {
            inp.focus();
            inp.value = title;
            inp.dispatchEvent(new Event('input', { bubbles: true }));
            inp.dispatchEvent(new Event('change', { bubbles: true }));
            return 'filled-title-input';
          }
        }
        // Try first visible input
        if (inputs.length > 0) {
          inputs[0].focus();
          inputs[0].value = title;
          inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
          inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
          return 'filled-first-input';
        }
        return null;
      }, article.title);
      console.log('Title result:', titleResult);
      await sleep(1000);

      // Fill body content
      const bodyResult = await page.evaluate((html) => {
        // Look for contenteditable div (rich text editor)
        const editables = [...document.querySelectorAll('[contenteditable="true"]')].filter(e => e.offsetParent !== null);
        if (editables.length > 0) {
          // Pick the largest visible one
          const editor = editables.reduce((a, b) => {
            const aRect = a.getBoundingClientRect();
            const bRect = b.getBoundingClientRect();
            return (aRect.width * aRect.height) > (bRect.width * bRect.height) ? a : b;
          });
          editor.focus();
          editor.innerHTML = html;
          editor.dispatchEvent(new Event('input', { bubbles: true }));
          editor.dispatchEvent(new Event('change', { bubbles: true }));
          return 'contenteditable';
        }
        
        // Look for textarea
        const textareas = [...document.querySelectorAll('textarea')].filter(t => t.offsetParent !== null);
        if (textareas.length > 0) {
          const ta = textareas[textareas.length - 1];
          ta.focus();
          ta.value = html;
          ta.dispatchEvent(new Event('input', { bubbles: true }));
          return 'textarea';
        }

        // Look for tiptap/prosemirror/quill editor
        const prosemirror = document.querySelector('.ProseMirror, .ql-editor, .tiptap, .editor-content');
        if (prosemirror) {
          prosemirror.innerHTML = html;
          prosemirror.dispatchEvent(new Event('input', { bubbles: true }));
          return 'prosemirror/quill';
        }
        
        return null;
      }, article.body);
      console.log('Body result:', bodyResult);
      await sleep(1000);
      await screenshot(page, `art${i+1}-02-content`);

      // Save/Publish
      const saveResult = await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')].filter(b => b.offsetParent !== null);
        // Try publish first
        for (const btn of btns) {
          const text = btn.textContent.trim().toLowerCase();
          if (text.includes('publish')) {
            btn.click();
            return 'publish: ' + btn.textContent.trim();
          }
        }
        // Then save
        for (const btn of btns) {
          const text = btn.textContent.trim().toLowerCase();
          if (text.includes('save')) {
            btn.click();
            return 'save: ' + btn.textContent.trim();
          }
        }
        // Then create
        for (const btn of btns) {
          const text = btn.textContent.trim().toLowerCase();
          if (text.includes('create') || text.includes('submit')) {
            btn.click();
            return 'create: ' + btn.textContent.trim();
          }
        }
        return null;
      });
      console.log('Save result:', saveResult);
      await sleep(3000);

      // Handle any confirmation dialogs
      await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')].filter(b => b.offsetParent !== null);
        for (const btn of btns) {
          const text = btn.textContent.trim().toLowerCase();
          if (text === 'ok' || text === 'confirm' || text === 'yes' || text === 'publish') {
            btn.click();
            return;
          }
        }
      });
      await sleep(2000);
      await screenshot(page, `art${i+1}-03-saved`);

      // Go back to article list for next article
      if (i < articles.length - 1) {
        await page.evaluate(() => {
          const links = [...document.querySelectorAll('a, button, [role="button"]')].filter(l => l.offsetParent !== null);
          for (const link of links) {
            const text = link.textContent.trim().toLowerCase();
            const href = (link.href || '').toLowerCase();
            if (text.includes('back') || text.includes('all articles') || text.includes('article list') || href.includes('knowledgebase')) {
              link.click();
              return;
            }
          }
          // Try browser back
          window.history.back();
        });
        await sleep(3000);
      }

      console.log(`✅ Article ${i + 1} done`);
    }

    await screenshot(page, '09-final');
    console.log('\n🎉 All 7 articles processed!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    await screenshot(page, 'error');
    throw error;
  } finally {
    await browser.close();
  }
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
