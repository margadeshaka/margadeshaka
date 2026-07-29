export type BlogAccent = 'gold' | 'purple' | 'aurora';

export type BlogBlock = { type: 'p' | 'h2' | 'quote'; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  featured: boolean;
  accent: BlogAccent;
  body: BlogBlock[];
};

export const posts: BlogPost[] = [
  {
    slug: 'why-margadeshaka',
    title: "Why we're building AI that shows the path, not walks it for you",
    excerpt:
      'Margadeshaka means "the one who shows the path." That word is a design constraint. Here\'s what it rules out — and what it demands of every product we ship.',
    category: 'Vision',
    date: 'May 2, 2026',
    readTime: '6 min read',
    author: 'Hitesh Gupta',
    featured: true,
    accent: 'gold',
    body: [
      {
        type: 'p',
        text: 'When we registered the company, we spent longer choosing the name than choosing the tech stack. Margadeshaka — मार्गदेशक — means "the one who shows the path." Not the one who carries you down it. That distinction is the whole thesis.',
      },
      { type: 'h2', text: 'AI that thinks with you, not for you' },
      {
        type: 'p',
        text: "The easiest AI product to build is one that produces an answer and hides the reasoning. It feels magical for a week and hollow forever after. We're deliberately building the harder thing: companions that make their reasoning legible, so you leave an interaction sharper than you arrived.",
      },
      {
        type: 'quote',
        text: "The goal isn't to make decisions for people. It's to help people make better decisions — and understand why.",
      },
      { type: 'h2', text: 'Ancient questions, modern tools' },
      {
        type: 'p',
        text: 'Sakha draws on the idea of a trusted friend — someone who knows your context and reflects it back with care. Dronacharya draws on the guru–shishya tradition of active, project-based learning. Neither is nostalgia. Both are structures humans already trust for guidance — and both map surprisingly well onto what multi-agent AI is good at.',
      },
      {
        type: 'p',
        text: 'This blog is where we\'ll show our work: the engineering, the ethics, and the occasional wrong turn.',
      },
    ],
  },
  {
    slug: 'sakha-emotional-context',
    title: 'How Sakha remembers you: building an AI companion with real emotional context',
    excerpt:
      "A look under the hood at how Sakha turns scattered conversations into a coherent understanding of who you are — and then into guidance that actually sounds like it knows you.",
    category: 'Engineering',
    date: 'April 18, 2026',
    readTime: '9 min read',
    author: 'Hitesh Gupta',
    featured: false,
    accent: 'purple',
    body: [
      {
        type: 'p',
        text: "A good friend doesn't make you re-explain yourself every time you talk. They remember what you told them last week, notice when your mood shifts, and meet you where you are. Building that into an AI companion is harder than it sounds.",
      },
      { type: 'h2', text: 'Context is the whole product' },
      {
        type: 'p',
        text: 'Most chatbots are amnesiacs — every conversation starts from zero. Sakha is built the opposite way. We maintain a private, evolving profile of what matters to you: recurring themes, relationships you\'ve mentioned, the things that weigh on you. That context is what turns a generic answer into guidance that feels personal.',
      },
      { type: 'h2', text: 'Where the AI comes in' },
      {
        type: 'p',
        text: 'We feed that context into a large language model with carefully constrained prompts, so the model responds as a companion who knows your history — not a stranger guessing. Just as important, we built crisis-aware detection so that when a conversation signals real distress, Sakha surfaces support resources instead of platitudes.',
      },
      {
        type: 'quote',
        text: 'Memory where it matters, warmth where it helps. The context is yours; the conversation adapts to you.',
      },
    ],
  },
  {
    slug: 'dronacharya-active-learning',
    title: 'Passive video is broken. Dronacharya bets on active learning.',
    excerpt:
      "Watching someone else solve a problem feels like learning. It usually isn't. Here's the pedagogy behind our upcoming AI tutor.",
    category: 'Product',
    date: 'April 3, 2026',
    readTime: '7 min read',
    author: 'Hitesh Gupta',
    featured: false,
    accent: 'aurora',
    body: [
      {
        type: 'p',
        text: 'The dominant model of online education is a person talking at a camera while you nod along. Completion rates tell the real story: most people never finish, and those who do often can\'t apply what they watched.',
      },
      { type: 'h2', text: 'The guru–shishya loop' },
      {
        type: 'p',
        text: 'Dronacharya is named after the legendary teacher of the Mahabharata for a reason. Real teaching is a loop: the student attempts, the teacher observes where they struggle, and the next challenge is tuned to exactly that gap. We\'re rebuilding that loop with multi-agent AI.',
      },
      { type: 'h2', text: 'Bronze, Silver, Gold' },
      {
        type: 'p',
        text: 'Instead of a completion certificate for watching, Dronacharya awards project-based certifications at three tiers. You earn Gold by building something real, defended against an AI examiner — not by reaching the end of a playlist.',
      },
    ],
  },
  {
    slug: 'privacy-first-ai',
    title: 'What "privacy first" actually means when your AI knows how you feel',
    excerpt:
      'What you share with Sakha is among the most personal data you can share. We treat it that way. A plain-language walk through our data commitments.',
    category: 'Trust',
    date: 'March 21, 2026',
    readTime: '5 min read',
    author: 'Hitesh Gupta',
    featured: false,
    accent: 'gold',
    body: [
      {
        type: 'p',
        text: 'To be a real companion, Sakha needs to know what\'s going on with you — your moods, your relationships, what\'s weighing on you. That\'s sensitive data by any definition. "Privacy first" can\'t be a marketing line when the stakes are this personal — it has to be an architecture.',
      },
      { type: 'h2', text: "We don't sell. We don't rent. We don't train public models on you." },
      {
        type: 'p',
        text: 'Conversations are processed by enterprise AI providers under contractual commitments that your prompts and responses are never used to train their public models. You can export or delete your data at any time, and deletion is honoured within 30 days.',
      },
      {
        type: 'quote',
        text: "The test of a privacy policy is what happens when it's inconvenient for us. Ours is built to hold under that pressure.",
      },
      {
        type: 'p',
        text: 'Read the full details on our Privacy page — written in plain language, not legalese wherever we could manage it.',
      },
    ],
  },
];

export const ACCENTS: Record<BlogAccent, { color: string; bg: string; border: string; glow: string }> = {
  gold: {
    color: 'var(--brand-gold)',
    bg: 'rgba(255, 200, 100, 0.10)',
    border: 'rgba(255, 200, 100, 0.28)',
    glow: 'rgba(255,200,100,0.20)',
  },
  purple: {
    color: '#B89EF0',
    bg: 'rgba(126, 77, 212, 0.12)',
    border: 'rgba(126, 77, 212, 0.30)',
    glow: 'rgba(126,77,212,0.22)',
  },
  aurora: {
    color: '#4FE9C0',
    bg: 'rgba(0, 230, 170, 0.10)',
    border: 'rgba(0, 230, 170, 0.28)',
    glow: 'rgba(0,230,170,0.18)',
  },
};

export const allSlugs = posts.map((p) => p.slug);

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
