export interface ProjectSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export interface PortfolioProject {
  slug: string
  title: string
  status: string
  category: string
  description: string
  hook: string
  cover: string
  coverSmall: string
  coverAlt: string
  stack: string[]
  github: string
  sourceLabel: string
  live?: string
  liveLabel?: string
  companion?: { url: string; label: string }
  sections: ProjectSection[]
}

export const projects: PortfolioProject[] = [
  {
    slug: 'airgapped-os',
    title: 'Faraday Web Demo',
    status: 'Interactive demo',
    category: 'Private AI · Browser simulation',
    description: 'A browser-based walkthrough of Faraday, a workstation concept for confidential AI work. The public demo simulates the desktop and uses hosted models, while the companion Faraday project is designed for local inference.',
    hook: 'A convincing privacy demo should show the boundary between the simulation and the real deployment.',
    cover: '/images/projects/airgapped-os.webp',
    coverSmall: '/images/projects/airgapped-os-small.webp',
    coverAlt: 'FARADAY WEB DEMO arcade cover: a simulated browser workstation inside a protective frame, with cloud traffic beyond it.',
    stack: ['React', 'TypeScript', 'Vercel Functions', 'DeepSeek Harness'],
    github: 'https://github.com/RudraO2/AirgappedOS',
    sourceLabel: 'Faraday Web demo README',
    live: 'https://faraday-five.vercel.app',
    liveLabel: 'Open the browser demo',
    companion: { url: 'https://github.com/RudraO2/Faraday', label: 'See the local Faraday workbench' },
    sections: [
      {
        title: 'The demo is deliberately honest about its boundary',
        paragraphs: [
          'A public browser link cannot demonstrate a machine that has been physically disconnected from the internet. Faraday Web makes that distinction explicit. Its Windows-style desktop and workbench are interactive, but the deployed version uses hosted open-weight models through external APIs so visitors can try the flow without installing a local model runtime.',
          'That distinction matters because a polished interface can make a security claim feel stronger than the architecture behind it. The project labels the hosted path as a simulation and points people to the companion Faraday repository for the on-device version. A demo becomes more useful when it describes what it can and cannot prove.'
        ]
      },
      {
        title: 'A workstation metaphor makes the workflow legible',
        paragraphs: [
          'The interface is built as a simulated operating-system desktop with a window manager, taskbar, start menu, virtual file system, file explorer, notepad, terminal, browser and settings. Faraday appears inside that environment as an application rather than as a disconnected chat box.',
          'The public version also exposes interaction paths for model routing, image attachments, code work and document delivery. Tool calls can be shown in the simulated terminal or browser. That gives a visitor a way to inspect the sequence of work, not only the final answer.'
        ],
        bullets: [
          'The real local product is in the Faraday repository and uses local open-weight models on the operator’s hardware.',
          'The browser deployment is a hosted demo. It is not an air-gap and should not receive confidential files.'
        ]
      },
      {
        title: 'What this demo proves, and what it does not',
        paragraphs: [
          'The shared router, egress controls and document-generation paths make this a useful interface and workflow demonstration. The browser version can help people understand how the product is supposed to feel and where evidence or control appears in the workflow.',
          'It cannot prove that the visitor’s data stays on their own computer, because requests made by the hosted version leave the browser and reach the model providers. For a real privacy assessment, the local deployment, network boundary, model configuration and audit trail all need to be checked on the target machine.'
        ]
      }
    ]
  },
  {
    slug: 'faraday',
    title: 'Faraday',
    status: 'SIH 2026 prototype',
    category: 'Local AI · Industrial workbench',
    description: 'A local-first AI workbench for confidential industrial tasks, built around open-weight models, explicit network controls and an egress record that makes the privacy boundary inspectable.',
    hook: 'Privacy is easier to evaluate when the system can show what it refused to send.',
    cover: '/images/projects/faraday.webp',
    coverSmall: '/images/projects/faraday-small.webp',
    coverAlt: 'FARADAY arcade cover: a local AI workstation protected by a shield inside a refinery control room.',
    stack: ['Node.js', 'TypeScript', 'DeepSeek Harness', 'Local models', 'Vulkan'],
    github: 'https://github.com/RudraO2/Faraday',
    sourceLabel: 'Faraday source and implementation notes',
    sections: [
      {
        title: 'The problem is ordinary work with an unusually strict boundary',
        paragraphs: [
          'Industrial teams handle approval notes, engineering calculations, scanned inspection reports and internal tools. These tasks are often repetitive enough to benefit from AI, but the source material may not be appropriate for a public cloud assistant. Faraday explores a third workflow: use local open-weight models on the operator’s own machine, with network access treated as a decision the system must expose.',
          'The Smart India Hackathon prototype was built for the MRPL problem statement SIH26117. It is a workbench and integration project, not a claim that a local model can replace every specialist or every existing process.'
        ]
      },
      {
        title: 'The egress seal turns a policy into observable behavior',
        paragraphs: [
          'A privacy setting is hard to trust if it only changes a label in the interface. Faraday’s egress seal sits in the outbound-call refusal path. The implementation includes a canary request that can be allowed deliberately so the system can demonstrate the difference between a denied request and a real request that reaches the network. The opened state is an explicit calibration, not the default privacy guarantee.',
          'The workbench records the decision and the operator-facing interface shows the network state. This makes the boundary testable: a reviewer can ask what happens when an outbound call is attempted, observe the refusal, and inspect the record rather than relying on a static “private” badge.'
        ]
      },
      {
        title: 'Models, tools and deliverables are separate parts of the design',
        paragraphs: [
          'The repository extends DeepSeek Harness through a pluggable model plane. Providers can include local, injected and replay implementations. A task router selects a lane, dispatch connects that selection to inference, and tools can produce artifacts such as signed Word documents and audit trails. This separation makes it possible to change the model provider without rewriting the whole workbench.',
          'The project also carries deployment notes for running local models with llama.cpp and llama-swap, plus smoke checks, evaluation notes, licensing decisions and a component-level license audit. Those files are part of the engineering story because an offline AI application still has operational, hardware and dependency constraints.'
        ],
        bullets: [
          'The documented local target is Windows 10 or 11 with a supported NVIDIA GPU and roughly 4 GB of VRAM.',
          'The repository describes a prototype. Teams should validate model quality, hardware compatibility, permissions and network behavior in their own environment before relying on it.'
        ]
      },
      {
        title: 'Why the project is interesting',
        paragraphs: [
          'The useful engineering question is not whether an AI system can generate a plausible answer. It is whether an operator can see which model handled a task, which tools ran, what left the machine and what evidence supports the resulting document. Faraday makes those questions part of the product surface.',
          'That approach does not eliminate risk. Local inference still requires secure host configuration, model provenance, access controls and human review. It does, however, turn a vague privacy promise into specific system behavior that can be inspected and tested.'
        ]
      }
    ]
  },
  {
    slug: 'visual-tutor',
    title: 'Visual Tutor',
    status: 'Live on Vercel',
    category: 'AI learning · Interactive visualization',
    description: 'An AI study workspace that turns a topic into a concept map, structured interactive visualizations and a tutor that follows the learner’s current focus.',
    hook: 'Instead of asking a model to invent a whole lesson page, ask it to choose a teachable visual and fill a checked schema.',
    cover: '/images/projects/visual-tutor.webp',
    coverSmall: '/images/projects/visual-tutor-small.webp',
    coverAlt: 'VISUAL TUTOR arcade cover: a learner opens a book surrounded by geometry, diagrams and a branching concept map.',
    stack: ['React', 'Gemini API', 'Groq API', 'Zod', 'React Flow'],
    github: 'https://github.com/RudraO2/visual-tutor',
    sourceLabel: 'Visual Tutor source and widget schemas',
    live: 'https://visual-tutor-eight.vercel.app',
    liveLabel: 'Try Visual Tutor',
    sections: [
      {
        title: 'The product follows the learner’s current question',
        paragraphs: [
          'Visual Tutor starts with a topic and builds an interactive concept map. Each concept can open a purpose-built visualization, while Tanya, the AI tutor, can respond with the learner’s current node in context. This lets someone move between an overview, a concrete visual and a follow-up question without losing the thread.',
          'The important design choice is that the model does not have to generate a complete web page for every topic. Free-form HTML can be slow, inconsistent and risky to render. The project instead gives the model a set of visual tools with known behavior.'
        ]
      },
      {
        title: 'A widget library constrains the output',
        paragraphs: [
          'The model chooses from widgets such as function graphs, number lines, process flows, comparison tables, labeled diagrams, data charts and flash-concept stacks. It returns structured parameters, and Zod schemas validate the shape before the renderer uses it. A sandboxed custom HTML widget remains a fallback for cases the library does not cover.',
          'This is a practical example of constraining generative output. The model contributes topic selection and content, while hand-built React components own layout, interaction and rendering behavior. That division makes the output more predictable and easier to test than arbitrary generated markup.'
        ]
      },
      {
        title: 'Learning progress is stored as small local signals',
        paragraphs: [
          'Many visualizations include a micro-check that asks a learner to apply the idea. The app records node-level states such as not started, explored and checked in localStorage, scoped to the topic and level. A learner can return to a topic on the same browser and pick up where they left off without creating an account.',
          'That signal is deliberately narrow. It indicates that a learner opened or answered a check, not that the person has mastered a subject. Better learning support depends on asking useful questions and letting people revisit the concept, rather than turning one interaction into a sweeping score.'
        ]
      },
      {
        title: 'A small AI application still needs a real security boundary',
        paragraphs: [
          'The frontend sends requests to serverless API routes, which proxy calls to Groq or Gemini. API keys stay on the server rather than being shipped in browser JavaScript. The routes validate generated data before it reaches the visualization layer.',
          'This architecture does not make model output correct by itself. It gives the app a place to validate shape, handle provider errors and keep secrets out of the public bundle. The next quality question is whether each visual helps the learner reason, not just whether it renders.'
        ]
      }
    ]
  },
  {
    slug: 'office-drama',
    title: 'Office Drama',
    status: 'Playable web game',
    category: 'Game AI · Persistent characters',
    description: 'A 2D office mystery where characters follow routines and exchange persistent gossip, turning conversations into clues that can travel through the simulated workplace.',
    hook: 'What if an NPC remembered a conversation after you left the room?',
    cover: '/images/projects/office-drama.webp',
    coverSmall: '/images/projects/office-drama-small.webp',
    coverAlt: 'OFFICE DRAMA arcade cover: three coworkers study a mysterious folder in a late-night office.',
    stack: ['Next.js', 'Phaser 3', 'Three.js', 'VRM', 'Supabase'],
    github: 'https://github.com/RudraO2/office-drama',
    sourceLabel: 'Office Drama game and NPC routes',
    live: 'https://officedrama1.netlify.app/game',
    liveLabel: 'Play Office Drama',
    sections: [
      {
        title: 'A mystery becomes more interesting when information moves',
        paragraphs: [
          'Office Drama is a small open-world detective game. The player is trying to find the CEO’s missing golden pen drive. The office is populated with characters who can be approached, questioned and encountered while they move through the space.',
          'The central idea is to make the office feel like a social system rather than a row of dialog triggers. Characters can meet and exchange gossip. A conversation may become a clue because information can persist and reach another character later.'
        ]
      },
      {
        title: 'The game connects a 2D world to a persistent memory layer',
        paragraphs: [
          'The game scene is built with Phaser, while the broader Next.js application supplies API routes for NPC chat, gossip, history and world events. A gossip request checks which NPCs are positioned to talk, ensures the character backstory data is ready, and then runs an exchange for that pair and game time. The repository also includes a memory web and conversation views that expose parts of this state to the player.',
          'The project includes Three.js and VRM character rendering alongside a 2D office map. That blend lets movement stay readable while conversations can have a more expressive character presentation.'
        ]
      },
      {
        title: 'The design challenge is keeping the world coherent',
        paragraphs: [
          'Persistent character memory is only compelling when it changes what the player can discover. If every NPC simply repeats generated dialog, the technical novelty does not become a game mechanic. The useful loop is: move through the office, choose a conversation, let a rumor travel, then use the changing information to decide whom to question next.',
          'This is a prototype game, so its fictional social world should be read as designed gameplay. It is not a claim that language models have independent beliefs or human-like memory. The code and narrative rules create a simulation of those behaviors.'
        ]
      }
    ]
  },
  {
    slug: 'tokenbrawl',
    title: 'Tokenbrawl',
    status: 'AI evaluation harness',
    category: 'Model evaluation · Deterministic game',
    description: 'A controlled fighting-game harness that treats token budget as an in-match resource, with replayable decisions and mechanics designed to keep response latency out of the winner calculation.',
    hook: 'What changes when an AI agent has to conserve its inference budget while the match is still in progress?',
    cover: '/images/projects/tokenbrawl.webp',
    coverSmall: '/images/projects/tokenbrawl-small.webp',
    coverAlt: 'TOKENBRAWL arcade cover: two fighters face off in an arena with separate limited token meters.',
    stack: ['TypeScript', 'Node.js', 'Vitest', 'Deterministic simulation', 'AI evaluation'],
    github: 'https://github.com/RudraO2/tokenbrawl',
    sourceLabel: 'Tokenbrawl harness and replay details',
    sections: [
      {
        title: 'The benchmark asks agents to spend a fixed budget well',
        paragraphs: [
          'Tokenbrawl places two agents in a deterministic one-on-one fighting game. At each decision point, both agents receive an observation and return one legal action. Each response spends from a finite Token Bank. If an agent runs out, it enters Reflex Mode, where its next decision is capped at eight tokens.',
          'This turns inference budget into part of the game state. A model can spend more on a complex decision, but doing so leaves less capacity for later turns. The benchmark is designed around a strategic tradeoff rather than a single prompt-response score.'
        ]
      },
      {
        title: 'Latency is separated from the outcome',
        paragraphs: [
          'The match runner waits for both agents at each decision point before advancing the simulation. The simulation advances in ticks rather than wall-clock time, and the replay player advances by frame count. The command log does not need response latency to determine the result.',
          'These controls reduce one source of unfairness: a faster deployment should not win solely because it answered sooner. The deterministic environment and replay log make it possible to inspect what happened and reproduce the match under the same configuration.'
        ]
      },
      {
        title: 'The demo is not evidence of a completed tournament',
        paragraphs: [
          'The repository is explicit that its showcased animation is a real engine replay between a scripted stand-in and a baseline bot. It is not a live model match, and a tournament has not been run yet. That boundary is important because an attractive replay can otherwise look like a benchmark result.',
          'The harness is most valuable when an evaluation includes enough controls to interpret the result: a fixed environment, legal action constraints, deterministic replay, model and prompt versions, and a clear account of what was actually run. Until a model tournament is executed and reported, Tokenbrawl is an evaluation system in development, not a model leaderboard.'
        ]
      }
    ]
  },
  {
    slug: 'nse-screener',
    title: 'NSE Screener',
    status: 'Live on Streamlit',
    category: 'Market data · Rule-based screening',
    description: 'A research dashboard that scores market and sector conditions, then ranks Indian stocks using documented price, trend and volume criteria.',
    hook: 'A stock screen can put market context before the list of individual tickers.',
    cover: '/images/projects/nse-screener.webp',
    coverSmall: '/images/projects/nse-screener-small.webp',
    coverAlt: 'NSE SCREENER arcade cover: an analyst reviews market sectors, relative-strength bars and price charts.',
    stack: ['Python', 'Streamlit', 'pandas', 'yfinance', 'pytest'],
    github: 'https://github.com/RudraO2/nse-screener',
    sourceLabel: 'NSE Screener scoring and ranking code',
    live: 'https://nse-screener1.streamlit.app',
    liveLabel: 'Open the screener',
    sections: [
      {
        title: 'Screen the environment before ranking the stocks',
        paragraphs: [
          'Many stock screens start with a single company. NSE Screener starts with broader context: it labels the market cycle, tracks relative strength across sectors and industry groups, then ranks candidates within the stronger groups. The goal is to make the path from market conditions to a ranked list visible in one Streamlit dashboard.',
          'The repository describes a five-level cycle score and a Minervini-style trend template. These are explicit heuristics, not an investment recommendation and not a claim that the score predicts future returns.'
        ]
      },
      {
        title: 'The scoring logic is inspectable',
        paragraphs: [
          'The cycle scorer uses OHLCV-derived signals including RSI, price relative to the 200-day simple moving average, position in the 52-week range and volume relative to a 50-day average. Its documented weights are 0.35 for the moving-average signal, 0.25 each for RSI and 52-week position, and 0.15 for volume.',
          'After scoring, the ranker orders stocks by cycle score, Minervini criteria met, optional personal-filter criteria, 52-week position and market-cap tie-breaker. This makes the output reproducible from the input data and the defined sort order, rather than hiding the screen inside an opaque model.'
        ]
      },
      {
        title: 'The limits are part of using the tool responsibly',
        paragraphs: [
          'A rule-based screen can help someone explore historical prices and compare candidates. It can also inherit data gaps, stale mappings and the assumptions baked into its indicator windows. A high ranking means that a row satisfied the configured rules; it is not a forecast, valuation, or personalized financial advice.',
          'The project has tests for the cycle scorer, data fetching, Minervini rules, personal filters, ranking and integration. The next useful validation is to test freshness and quality of the live data feed and document how the screener behaves when sector mappings or price history are incomplete.'
        ]
      }
    ]
  },
  {
    slug: 'ghostpad',
    title: 'Ghostpad',
    status: 'Android & web prototype',
    category: 'Android · Visual privacy experiment',
    description: 'A notes-style messaging prototype that encrypts a message into a code-shaped text envelope and hands it to WhatsApp, exploring how interface appearance affects casual on-screen privacy.',
    hook: 'Encryption hides message content. A notes-like interface changes what a casual glance at the screen suggests.',
    cover: '/images/projects/ghostpad.webp',
    coverSmall: '/images/projects/ghostpad-small.webp',
    coverAlt: 'GHOSTPAD arcade cover: a notebook and phone exchange a sealed message in a moonlit city.',
    stack: ['React Native', 'Expo', 'CryptoJS', 'AsyncStorage', 'Android'],
    github: 'https://github.com/RudraO2/ghostpad',
    sourceLabel: 'Ghostpad encryption implementation',
    sections: [
      {
        title: 'Ghostpad explores a different layer of privacy',
        paragraphs: [
          'Ghostpad looks like a simple notes app, but it can encrypt a message into a code-shaped text block and pass that block to WhatsApp. The receiver extracts the ciphertext and decrypts it with the shared password. The product idea focuses on casual visual privacy: a person glancing at the screen sees something formatted like a code note rather than a normal conversation.',
          'That is distinct from transport security. WhatsApp still receives and sends the ciphertext, and the surrounding messaging metadata is not hidden by a code-shaped message. The disguise is a user-interface experiment, not invisibility.'
        ]
      },
      {
        title: 'The implementation combines local notes and an encrypted envelope',
        paragraphs: [
          'The code uses CryptoJS AES encryption to produce a ciphertext string and wraps it in a comment and a small JavaScript-like snippet. On Android, the React Native app stores notes and configuration through AsyncStorage, and it opens WhatsApp through a platform link so the user can review and send the prepared message.',
          'The web version keeps the encryption and extraction helpers in a small module with tests. Keeping the envelope format in one place makes the encode and decode paths easier to reason about than duplicating string parsing inside the interface.'
        ]
      },
      {
        title: 'A prototype should be clear about its security limits',
        paragraphs: [
          'Ghostpad has not been presented as a security-audited messenger. A shared password must be distributed safely, a password can be exposed on a device, and a code-looking envelope may still draw attention or be recognized. The project does not hide the fact that WhatsApp is the transport layer.',
          'The responsible use case is to understand the difference between encrypting content and disguising its presentation. Do not use this prototype to bypass monitoring where doing so could put someone at risk, and do not treat its interface as a guarantee of secrecy.'
        ]
      }
    ]
  },
  {
    slug: 'trueg',
    title: 'TrueG',
    status: 'Android APK',
    category: 'Android · Cellular network diagnostics',
    description: 'An Android utility that reads native telephony state to distinguish 4G LTE from 5G NR, including standalone and non-standalone 5G where the device exposes that information.',
    hook: 'The status-bar icon is a hint from the carrier UI. The radio state is the diagnostic signal.',
    cover: '/images/projects/trueg.webp',
    coverSmall: '/images/projects/trueg-small.webp',
    coverAlt: 'TRUEG arcade cover: a phone compares 4G and 5G radio signals around a cellular tower.',
    stack: ['React Native', 'Kotlin', 'Android TelephonyManager', 'Foreground service'],
    github: 'https://github.com/RudraO2/TrueG',
    sourceLabel: 'TrueG native telephony module and detector',
    sections: [
      {
        title: 'The icon and the connection are different kinds of evidence',
        paragraphs: [
          'A phone can show a 5G badge while using a 4G anchor connection, depending on the carrier, handset and network mode. TrueG was built to make the underlying radio state easier to inspect without requiring root access or a user account.',
          'The app has a native Kotlin module that reads Android telephony information and reports a small set of states to its React Native interface: 4G, 5G non-standalone, 5G standalone, 3G and unknown. A persistent notification makes the current result glanceable.'
        ]
      },
      {
        title: 'A native module bridges platform APIs into the app',
        paragraphs: [
          'The JavaScript detector calls a React Native native module rather than guessing from the status-bar icon. The Android implementation uses TelephonyManager listeners and callbacks, including display-information overrides, and maintains the latest values used for network-mode classification.',
          'The repository separates the platform detector from the React Native screen and includes tests for the detector, permission handling, storage, app behavior and network-status hook. The mobile interface can present the result while the platform service listens for changes.'
        ]
      },
      {
        title: 'Device and carrier behavior still matters',
        paragraphs: [
          'Android exposes different telephony signals across API levels and handset vendors. Permissions may be required, some fields may be unavailable, and a carrier can use a network configuration that complicates the distinction. TrueG should be treated as a device diagnostic, not a universal guarantee that every carrier’s icon is wrong.',
          'The useful engineering lesson is to query the source that best represents the system state, preserve an unknown result when evidence is missing, and explain the limits of the data. A good diagnostic tool is allowed to say “unknown.”'
        ]
      }
    ]
  },
  {
    slug: 'stratum',
    title: 'Stratum',
    status: 'SIH 2026 prototype',
    category: 'Document AI · Verifiable answers',
    description: 'An offline document-intelligence workbench that turns reports, spreadsheets and scanned pages into cited facts, reviewable answers and parliamentary reply drafts.',
    hook: 'A number in an AI-generated report should lead back to the cell that supports it.',
    cover: '/images/projects/stratum.webp',
    coverSmall: '/images/projects/stratum-small.webp',
    coverAlt: 'STRATUM arcade cover: a report page connects a highlighted evidence passage to a cited answer.',
    stack: ['Python', 'FastAPI', 'DeepSeek Harness', 'Qwen', 'SQLite'],
    github: 'https://github.com/RudraO2/Stratum',
    sourceLabel: 'Stratum source, evaluation and design notes',
    companion: { url: 'https://github.com/RudraO2/StratumOS', label: 'See the browser demo repository' },
    sections: [
      {
        title: 'Document answers need more than a plausible paragraph',
        paragraphs: [
          'Annual reports, production statistics, spreadsheets, scanned directories and past parliamentary replies mix prose with exact values. A general chat answer can sound right while losing the unit, period or source cell behind a figure. Stratum is built around a stricter rule: a generated number should be traceable to evidence that a person can inspect.',
          'The project was built for the Smart India Hackathon 2026 problem from CMPDI and Coal India. It runs as a local workbench with open-weight models on the operator’s machine. A related StratumOS repository offers a browser-based demonstration using a fixed sample library and hosted models, so that public demo should not be confused with the local deployment.'
        ]
      },
      {
        title: 'The ingestion pipeline separates evidence from facts',
        paragraphs: [
          'Stratum turns PDFs, spreadsheets and scanned pages into evidence records such as pages, tables, cells and bounding boxes. It can then extract facts with a value, unit, period and a pointer back to where the value came from. OCR and local vision support image-only pages and difficult scans.',
          'That separation makes an answer easier to audit. A reader can click a number and return to the source page or cell, see which checks it passed, and review a flagged fact before it is used in an answer.'
        ]
      },
      {
        title: 'Models classify the request, while code protects the values',
        paragraphs: [
          'One of the strongest architecture choices is that the model maps a question to a structured query intent instead of writing SQL or returning numeric values from its own memory. The backend turns that intent into a parameterized lookup. For tables, the model can identify the relevant column or period, while code copies the actual digits from source cells.',
          'A number guard checks generated text against the evidence. Validation covers units, plausible ranges, totals, stated growth, year-on-year changes and provisional versus final values. A failed check goes to a review queue with a reason, rather than quietly passing into the final answer.'
        ],
        bullets: [
          'The reply builder drafts structured answers for parts of a Lok Sabha or Rajya Sabha question and can produce annexure tables in a Word document.',
          'Reports can include charts and source citations. Topic views summarize themes across the document library.'
        ]
      },
      {
        title: 'Measure correctness with denominators, not a green badge',
        paragraphs: [
          'The project includes a hand-checked gold set and tracks extraction exact match, routing accuracy, numeric correctness, citation correctness, unsupported-number rate and automation percentage. Each metric is paired with a denominator so a small test set does not look like a universal guarantee.',
          'Stratum is still a prototype. Its checks reduce particular failure modes, but they do not establish that every extracted fact is correct or that every generated parliamentary reply is ready to submit. A domain expert still needs to review evidence, calculations and the final document.'
        ]
      }
    ]
  },
  {
    slug: 'genai-roadmap',
    title: 'The Gen AI Roadmap',
    status: 'Interactive learning tool',
    category: 'AI education · Adaptive roadmap',
    description: 'A graph-shaped generative AI learning roadmap with four distinct tracks, prerequisite-aware quests, concrete completion checks and portable local progress.',
    hook: 'A learning plan should tell you what to do next, why it comes next and how you will know you finished.',
    cover: '/images/projects/genai-roadmap.webp',
    coverSmall: '/images/projects/genai-roadmap-small.webp',
    coverAlt: 'GEN AI ROADMAP arcade cover: a learner follows a branching quest map through AI specializations.',
    stack: ['React', 'TypeScript', 'Vite', 'Node test runner', 'localStorage'],
    github: 'https://github.com/RudraO2/genai-roadmap',
    sourceLabel: 'Roadmap data and implementation',
    live: 'https://rudrao2.github.io/genai-roadmap/',
    liveLabel: 'Explore the Gen AI Roadmap',
    sections: [
      {
        title: 'A list of courses does not explain how learning fits together',
        paragraphs: [
          'The Gen AI Roadmap turns learning into a visual prerequisite graph. It has four paths with different finish lines: AI Explorer, AI Engineer, Model Builder and Creative Studio. Someone learning to evaluate AI in everyday work should not be forced through the same sequence as someone who wants to build a transformer from scratch.',
          'The roadmap describes 94 quests across 17 stages. A quest includes a mission, a short reason for its place in the sequence, concrete steps, an observable definition of done and learning links or search queries. The intention is to make each card an action rather than another bookmark to forget.'
        ]
      },
      {
        title: 'Prerequisites create branching paths, not a single ladder',
        paragraphs: [
          'Quests are connected by dependencies. A quest becomes ready when its prerequisites are complete; otherwise it stays visible and names what is blocking it. This keeps the map legible while preserving the learner’s ability to inspect what lies ahead.',
          'The time-budget planner adds another practical constraint. A learner can choose a half-hour, evening, day or weekend and receive a run of quests that fit. The planner respects prerequisites as each step unlocks the next, instead of recommending a capstone that cannot yet be started.'
        ]
      },
      {
        title: 'Local progress is portable and privacy-conscious',
        paragraphs: [
          'The project is a static React, TypeScript and Vite site. It has no backend, account or database. Progress is stored in localStorage and can be exported as JSON, so a learner can keep a copy without sending a learning history to a service.',
          'The app also supports direct URLs to a path and quest, print-specific output, and a phone layout that changes the roadmap graph into a stage list. The source README reports 58 tests for core roadmap behavior, alongside its build pipeline.'
        ]
      },
      {
        title: 'The roadmap is a starting map, not a universal curriculum',
        paragraphs: [
          'AI tooling changes quickly, so static links and dated recommendations need maintenance. The roadmap addresses that by using live search queries where a resource URL could not be checked, but learners should still evaluate the material for their goals and current versions.',
          'The useful principle is that a roadmap should expose its assumptions. A visible prerequisite, a concrete completion check and an exportable progress file are more honest than a single percentage that pretends every learner is at the same starting point.'
        ]
      }
    ]
  },
  {
    slug: 'anywherecode',
    title: 'AnywhereCode',
    status: 'Open-source developer tool',
    category: 'AI coding agent · Phone-first development',
    description: 'A phone-first coding agent designed for Termux that plans a project, generates files, runs development commands and helps people build software from an Android device.',
    hook: 'The next AI coding environment should work on the device many people already have in their pocket.',
    cover: '/images/projects/anywherecode.webp',
    coverSmall: '/images/projects/anywherecode-small.webp',
    coverAlt: 'ANYWHERECODE arcade cover: a phone-based code editor, project plan and small build terminal on a desk.',
    stack: ['Python', 'Termux', 'LLM providers', 'MCP', 'Git'],
    github: 'https://github.com/RudraO2/AnywhereCode',
    sourceLabel: 'AnywhereCode agent pipeline and guardrails',
    sections: [
      {
        title: 'The hardware assumption is the first design decision',
        paragraphs: [
          'Most coding-agent interfaces assume a wide terminal, a keyboard and an existing development toolchain. AnywhereCode starts from a different constraint: the user may have only an Android phone, Termux and a project idea. It adapts command output and paths for a phone-sized terminal and aims to set up the build tools that a beginner might not know to install.',
          'The tool is a Python command-line application that can also run on Linux and desktop environments. Its Android path is designed around Termux, where a phone becomes the development machine rather than a thin remote-control screen for a laptop.'
        ]
      },
      {
        title: 'A plan gate separates intention from execution',
        paragraphs: [
          'The interactive flow asks for a project description, selects a template and produces a plan before it generates files. The user can approve or retry that plan. After approval, the tool can generate code, install dependencies, run a build, prepare CI or Docker files and start the appropriate development server.',
          'That plan boundary matters because shell execution gives an agent real side effects. The README describes per-command safety checks and a human-accept mode as the default, with an automatic mode available separately. This makes the tradeoff visible: convenience increases when a user removes confirmation, but so does the importance of inspecting the plan and environment.'
        ]
      },
      {
        title: 'Providers and project templates are swappable parts',
        paragraphs: [
          'AnywhereCode supports Claude, Gemini, OpenRouter and OpenAI-compatible endpoints through direct HTTP requests. It offers starter templates for React with Vite, Expo, Node APIs, Next.js and FastAPI. The template provides a runnable skeleton; the person using it still owns the product design and code review.',
          'The repository also describes generators for CI, Docker, environment files and deployment, plus learning guides and an MCP surface. Those features turn the tool into a guided workflow around coding rather than a single code-completion command.'
        ]
      },
      {
        title: 'Phone-first does not make software work effortless',
        paragraphs: [
          'Termux has storage, package and terminal constraints that differ from a laptop. Long build logs are harder to inspect on a narrow screen, and a generated project still needs tests, version control and careful handling of secrets. AnywhereCode reduces setup friction; it does not remove the need to understand what the agent changed.',
          'The project README reports nine passing tests for its initial tool flow. The next useful question is how reliably the safety checks behave across project templates and shell environments, especially before using automatic execution on a real project.'
        ]
      }
    ]
  },
  {
    slug: 'six-months-left',
    title: '6 Months Left',
    status: 'Native Android app',
    category: 'Android · Attention and focus',
    description: 'A deadline-based focus app for Android that puts a countdown in the way of chosen time-sink apps and adds deliberate friction before changing its rules.',
    hook: 'A reminder is easy to dismiss. A small pause at the moment of distraction can change the choice.',
    cover: '/images/projects/six-months-left.webp',
    coverSmall: '/images/projects/six-months-left-small.webp',
    coverAlt: '6 MONTHS LEFT arcade cover: a creator focuses at a desk beside an hourglass, calendar and focus shield.',
    stack: ['Kotlin', 'Android Accessibility Service', 'Foreground Service', 'Device Admin'],
    github: 'https://github.com/RudraO2/six-months-left',
    sourceLabel: 'Android services and permission flow',
    sections: [
      {
        title: 'Put a chosen deadline next to the habit that consumes the time',
        paragraphs: [
          '6 Months Left turns one important deadline into a persistent countdown. When someone opens a selected app, the interceptor appears before the distraction and asks them to remember the time remaining. They can continue, but the moment requires an intentional choice rather than an automatic swipe into another video.',
          'The app specifically supports the Shorts and Reels screens described in its README, and can be configured for other apps. It is a focus tool that adds friction, not a productivity score that claims to know whether a person used their time well.'
        ]
      },
      {
        title: 'The Android permissions are part of the product contract',
        paragraphs: [
          'The implementation uses a foreground service for the countdown, an accessibility service to observe the active screen, a display-over-other-apps permission for the interceptor, boot handling to resume after a restart, and device-admin behavior to discourage a casual uninstall before the chosen date.',
          'That power comes with responsibility. Onboarding explains the permissions, but a user should still read what each permission allows, understand how to change or remove it, and install the app only on their own device. The system APIs can also behave differently across Android versions and manufacturers.'
        ]
      },
      {
        title: 'Friction should support agency, not take it away',
        paragraphs: [
          'The interceptor allows a person to proceed, preserving a way to reach something genuinely necessary. The hidden settings gesture makes changing a commitment less impulsive, but friction should not become an excuse to trap someone in software they no longer want.',
          'This is an experiment in designing around the moment a habit begins. Its success should be judged by whether users feel more able to follow their own goal, not by how many permissions the app can hold or how difficult it is to uninstall.'
        ]
      }
    ]
  },

  {
    slug: 'whatsapp-automation',
    title: 'WhatsApp Automation',
    status: 'Personal assistant prototype',
    category: 'Messaging · Local AI assistant',
    description: 'A TypeScript WhatsApp assistant prototype that batches incoming messages, uses Gemini to draft replies with per-chat history and exposes pause and setup controls.',
    hook: 'A useful auto-reply should wait for the whole thought, keep context scoped to a chat and make it possible to pause.',
    cover: '/images/projects/whatsapp-automation.webp',
    coverSmall: '/images/projects/whatsapp-automation-small.webp',
    coverAlt: 'WHATSAPP AUTOMATION arcade cover: messages pause for human approval before an assistant prepares a reply.',
    stack: ['TypeScript', 'Baileys', 'Gemini API', 'Node.js'],
    github: 'https://github.com/RudraO2/Whatsapp-automation',
    sourceLabel: 'WhatsApp message handling and local memory code',
    sections: [
      {
        title: 'Wait for a message to finish before forming a reply',
        paragraphs: [
          'This TypeScript prototype connects to a WhatsApp account through Baileys and uses Gemini to draft responses. The message handler collects direct-message arrivals for a short silence window before replying. It also tracks typing presence so it can keep waiting while the other person is still composing, instead of treating every split line as a separate question.',
          'The handler keeps pending message buffers per chat and includes separate logic for groups, message echoes and reconnect backlogs. That turns a quick API integration into a small event-processing problem with state, timing and duplicate handling.'
        ]
      },
      {
        title: 'Memory is scoped to a chat, but stored on the host',
        paragraphs: [
          'The code stores up to 100 messages per chat in JSON files under a local memory directory, and can seed that history from an imported chat export. Authentication state is also saved locally so the client can reconnect. This is simple to inspect and easy to run, but local files are not automatically protected by the operating system or encrypted by this application.',
          'A person using the prototype should secure the machine, protect the session credentials, review what message content is retained and get clear consent before connecting it to anyone else’s account or automating conversations with other people.'
        ]
      },
      {
        title: 'Generated replies need human control',
        paragraphs: [
          'A model can misread tone, invent a detail or send a message at the wrong time. The project includes pause state, setup and help flows, but generated messages still deserve a careful test boundary before any real conversation is automated.',
          'This repository is best understood as a personal automation experiment. It is not a privacy-audited messaging product, and it should not be connected to sensitive chats without a review of the data flow, retention and account risks.'
        ]
      }
    ]
  }
]

export const projectPath = (project: PortfolioProject) => `/projects/${project.slug}`
