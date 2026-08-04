/**
 * Blog content — "Notes from the path".
 *
 * Single source of truth for the Margadeshaka blog. Ported from the
 * claude.ai/design bundle (Margadeshaka.html → blog.jsx). Posts render on
 * /blog (listing) and /blog/[slug] (article). Order matters: it drives the
 * "Latest articles" grid and the prev/next links at the end of an article.
 */

export type BlogAccent = 'gold' | 'purple' | 'aurora';

export type BlogCategory = 'Vision' | 'Engineering' | 'Product' | 'Trust';

/**
 * `p` and `h2` text may carry inline markdown links — `[label](/href)` —
 * which BlogArticle splits out at render time; a leading `/` routes through
 * next/link, anything else opens in a new tab. In an `h2` the link renders in
 * the heading but is flattened back to its label for the "On this page" rail,
 * which reuses the same string as plain text.
 *
 * Link sparingly. Repeating one anchor down a whole post reads as keyword
 * stuffing to a crawler and dilutes the signal each link carries.
 */
export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** Human-readable date shown in the UI. */
  date: string;
  /** ISO 8601 date used for <time> and BlogPosting JSON-LD. */
  isoDate: string;
  readTime: string;
  author: string;
  featured: boolean;
  accent: BlogAccent;
  body: BlogBlock[];
}

export const posts: BlogPost[] = [
  {
    slug: 'why-margadeshaka',
    title: 'Why We Feel Lost Despite Having More Information Than Ever',
    excerpt:
      `Why do we have answers at our fingertips and yet many of us are not confident in life? We are in the most connected era of mankind's history today.`,
    category: 'Vision',
    date: 'August 4, 2026',
    isoDate: '2026-08-04',
    readTime: '7 min read',
    author: 'Hitesh Gupta',
    featured: true,
    accent: 'gold',
    body: [
      { type: 'p', text: `Why do we have answers at our fingertips and yet many of us are not confident in life? We are in the most connected era of mankind's history today. Information is readily available in seconds, whether it be deciding on a career, health, money or relationships. Today knowledge is more accessible than ever with the assistance of search engines, social media, podcasts, AI tools, and online courses.` },
      { type: 'p', text: `But, even with all of the information, millions of people feel lost.Have difficulty making decisions. They are always asking themselves "why?". They make comparisons about their lives and ask themselves if they are going in the right direction.` },
      { type: 'p', text: `An important question is thus raised:` },
      { type: 'p', text: `Social media is all around, so is clarity!` },
      { type: 'p', text: `The key to the answer is information versus guidance. That's the place where Margadeshaka's philosophy fits.` },
      { type: 'h2', text: `If all the information is out there, why does it seem so difficult to hold onto?` },
      { type: 'p', text: `It is the difference between information and guidance that makes the difference. Here's where the concept of Margadeshaka is applicable.` },
      { type: 'h2', text: `Today, man lives in an information age.` },
      { type: 'p', text: `The starting point of every day is information. Before we have even gotten out of bed we've already seen notifications, watched videos, read news, scrolled through social media, and read opinions from all over the world. Continued absorption is done throughout the day.` },
      { type: 'p', text: `● Productivity tips` },
      { type: 'p', text: `● Career advice` },
      { type: 'p', text: `● Financial strategies` },
      { type: 'p', text: `● Fitness routines` },
      { type: 'p', text: `● Relationship guidance` },
      { type: 'p', text: `● Self-help content` },
      { type: 'p', text: `● Motivational quotes` },
      { type: 'p', text: `On the exterior, it appears nice. Learning, after all, has become easy. It's just one issue, though. We have never evolved to deal with an endless stream of information every day of our lives. With all the information available, sometimes, there's too much to know and too much to be confident about.` },
      { type: 'h2', text: `There is no clarity from information.` },
      { type: 'p', text: `People believe that they can obtain all the information that they are looking for, and after they have done it, they understand what they should be doing. Unfortunately, life is not like that.` },
      { type: 'p', text: `What would you look up about career advice on the right career that you would do if you were searching online?There will be thousands of articles within seconds from you.` },
      { type: 'p', text: `Some will tell you "Do what you love. Others will suggest well-paying careers. Some will say that they should be an entrepreneur. Some will recommend that you take the safer route. There's a little room for argument on both sides.` },
      { type: 'p', text: `You don't make it simpler, you make it even more confusing!But what is lacking is clarity. You might have a lot, but not know which of the pieces of advice are effective for you and which ones aren't.` },
      { type: 'h2', text: `With more options comes more expense.` },
      { type: 'p', text: `In a modern life there are even greater choices than you can think of! There are hundreds of careers to choose from; thousands of online courses to take; countless investment opportunities; remote work opportunities around the globe; and a limitless number of ways to create a lifestyle.` },
      { type: 'p', text: `The sound of choice is empowering, but can be a pressure. Once it all seems possible, it's quite a decision to make one. People do research, but they don't go ahead with the decision as they are afraid they would make the wrong one. This can be referred to as "analysis paralysis," which is a condition where you think too much and end up doing nothing.` },
      { type: 'p', text: `Strangely, the gain in freedom due to a "choice" can be less than the loss of freedom due to a "restriction.Paradoxically the more options that we have, the less free we feel.` },
      { type: 'h2', text: `But what is not knowledge is self-awareness.` },
      { type: 'p', text: `Many people know a great deal about the world but very little about themselves.They are aware of the Market trends. They know technology. An understanding of current affairs around the world. They are aware of ways to enhance productivity.` },
      { type: 'p', text: `However, they have no understanding of their real motivation. They have no idea of the meaning of their lives. They aren't aware of what happens in their lives that makes them feel good.` },
      { type: 'p', text: `It's here that most people fall out of contact with. They don't have to look on the web for everything they need to know. There are answers which can only be gained by reflection, and only by experience.` },
      { type: 'h2', text: `The social media media is remarking to the other people, where to go.` },
      { type: 'p', text: `People nowadays are lost because they observe all the trips of others. There is a new character in each scroll that appears to be doing something.` },
      { type: 'p', text: `Someone starts a new business.There is a person who begins a business out. There is someone who's traveling through the world. A new house is purchased. Someone gets promoted. A person is introducing their 'morning routine for success'.` },
      { type: 'p', text: `There were lots of these stories to view and naturally comparisons began. Questions start to arise within us.` },
      { type: 'p', text: `"What's going on, why am I so confused?" Why don't I know what I want? "All the others appear to be ahead of me."` },
      { type: 'p', text: `So it's not like that. What you see in social media is highlighting, not struggles. All of the success stories have experienced some level of doubt, failure and uncertainty and these stories are not always publicized online. Comparing takes away clarity because it takes us on another route than where we need to go.` },
      { type: 'h2', text: `Not yet discovered. As long as we're not there yet.` },
      { type: 'p', text: `Learning is extremely simple thanks to the Internet. It's also turned them into a way of life of constant preparation.` },
      { type: 'p', text: `We view videos about Productivity. We read books on how to be successful. Articles are archived for future use. We bookmark courses. We collect ideas.` },
      { type: 'p', text: `However little changes. Why? Knowing what to eat is good, even when we don't eat it. Learning without learning cannot grow. Experience is the beginning of real growth, from information to experience.` },
      { type: 'h2', text: `The first missing component is guidance.` },
      { type: 'p', text: `Suppose you were at the doorstep of a vast forest.` },
      { type: 'p', text: `You have a map of the area available.` },
      { type: 'p', text: `Weather information is provided.` },
      { type: 'p', text: `Food and equipment are present.` },
      { type: 'p', text: `You have GPS.` },
      { type: 'p', text: `Even then you aren't sure what direction to go.` },
      { type: 'p', text: `Suppose you have someone who has walked through this woods a number of times.` },
      { type: 'p', text: `These guys aren't as smart as you.` },
      { type: 'p', text: `They only have one direction in which to travel.` },
      { type: 'p', text: `That individual is your "guide"!` },
      { type: 'p', text: `The following is a basic scenario to illustkrate the distinction between information and guidance.` },
      { type: 'p', text: `Information gives information about "that which is.` },
      { type: 'p', text: `Guidance is a means of revealing to us what is best.` },
      { type: 'p', text: `This is what Margadeshaka is all about.` },
      { type: 'h2', text: `What Does [Margadeshaka](/) Mean?` },
      { type: 'p', text: `Margadeshaka is a Sanskrit word.` },
      { type: 'p', text: `It refers to one who shows the path, a guide who helps others move in right direction.` },
      { type: 'p', text: `A Margadeshaka does not provide endless answers, but rather assists in finding clarity.` },
      { type: 'p', text: `The objective is NOT to think for someone else.` },
      { type: 'p', text: `The aim of this is not to prepare people for thinking for others, but for them to think better for themselves.` },
      { type: 'p', text: `This sort of direction is more valuable in today's world than information is.` },
      { type: 'h2', text: `The challenge is to overcome the abundance of information in this world` },
      { type: 'p', text: `It's not a lack of strength being lost. Maybe a sign you need less stimulation, more clarity. Let's think about some ways to "catch up.` },
      { type: 'p', text: `1. Not every  information is right.` },
      { type: 'p', text: `Not all articles have to be read! Not ALL opinions are worth reading.` },
      { type: 'p', text: `2. Prioritize quality over quantity.` },
      { type: 'p', text: `It is better to reflect on nutrition than to eat it. Identify those who you should follow. Investigate interests, strengths and values.` },
      { type: 'p', text: `3. Develop self awareness.` },
      { type: 'p', text: `Wait for sure, and take small steps. It is not required to have an ideal plan. Need only the subsequent step. Easier is action than long research of clarity.` },
      { type: 'p', text: `4. Stop Comparing your journey.` },
      { type: 'p', text: `Individuals are at their own pace. Others' time is not your time. Emphasize living a life in accord with your purpose.` },
      { type: 'p', text: `5. Seek Guidance,  Not Just Information.` },
      { type: 'p', text: `Information answers questions. Guidance helps you to ask the right ones. This small distinction can make the difference between right and wrong.` },
      { type: 'h2', text: `Philosophy of Margadeshaka` },
      { type: 'p', text: `The philosophy of Margadeshaka rests on a basic premise. It is not always necessary for people to know more. What they require is guidance. Rather than overwhelm people with volumes of information, Margadeshaka advocates the development of clear judgment and conscious growth. It provides us with an understanding of how clarity of mind comes out of self-knowledge instead of opinions.` },
      { type: 'h2', text: `Conclusion` },
      { type: 'p', text: `Never before has humanity had such an amount of information at their fingertips. Confusion, stress, and uncertainty only keep rising. Not because of the failure of information. Because information alone never was enough. Clarity lies in knowing oneself, sifting through the important things, and choosing a path that fits our principles. This is the reason behind why Margadeshaka is more than just a word. Margadeshaka stands for a timeless concept which states that every individual needs to be guided through the uncertainties of life. In a world full of countless solutions, the best gift that can be given to anyone is the right direction. And on some occasions, the right direction comes not by seeking another solution, but through our own Margadeshaka.` },
    ],
  },
  {
    slug: 'sakha-emotional-context',
    title: 'How Sakha remembers you: building an AI companion with real emotional context',
    excerpt:
      'A look under the hood at how Sakha turns scattered conversations into a coherent understanding of who you are — and then into guidance that actually sounds like it knows you.',
    category: 'Engineering',
    date: 'April 18, 2026',
    isoDate: '2026-04-18',
    readTime: '9 min read',
    author: 'Hitesh Gupta',
    featured: false,
    accent: 'purple',
    body: [
      {
        type: 'p',
        text: `A good friend doesn't make you re-explain yourself every time you talk. They remember what you told them last week, notice when your mood shifts, and meet you where you are. Building that into an AI companion is harder than it sounds.`,
      },
      { type: 'h2', text: 'Context is the whole product' },
      {
        type: 'p',
        text: `Most chatbots are amnesiacs — every conversation starts from zero. Sakha is built the opposite way. We maintain a private, evolving profile of what matters to you: recurring themes, relationships you've mentioned, the things that weigh on you. That context is what turns a generic answer into guidance that feels personal.`,
      },
      { type: 'h2', text: 'Where the AI comes in' },
      {
        type: 'p',
        text: `We feed that context into a large language model with carefully constrained prompts, so the model responds as a companion who knows your history — not a stranger guessing. Just as important, we built crisis-aware detection so that when a conversation signals real distress, Sakha surfaces support resources instead of platitudes.`,
      },
      {
        type: 'quote',
        text: `Memory where it matters, warmth where it helps. The context is yours; the conversation adapts to you.`,
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
    isoDate: '2026-04-03',
    readTime: '7 min read',
    author: 'Hitesh Gupta',
    featured: false,
    accent: 'aurora',
    body: [
      {
        type: 'p',
        text: `The dominant model of online education is a person talking at a camera while you nod along. Completion rates tell the real story: most people never finish, and those who do often can't apply what they watched.`,
      },
      { type: 'h2', text: 'The guru–shishya loop' },
      {
        type: 'p',
        text: `Dronacharya is named after the legendary teacher of the Mahabharata for a reason. Real teaching is a loop: the student attempts, the teacher observes where they struggle, and the next challenge is tuned to exactly that gap. We're rebuilding that loop with multi-agent AI.`,
      },
      { type: 'h2', text: 'Bronze, Silver, Gold' },
      {
        type: 'p',
        text: `Instead of a completion certificate for watching, Dronacharya awards project-based certifications at three tiers. You earn Gold by building something real, defended against an AI examiner — not by reaching the end of a playlist.`,
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
    isoDate: '2026-03-21',
    readTime: '5 min read',
    author: 'Hitesh Gupta',
    featured: false,
    accent: 'gold',
    body: [
      {
        type: 'p',
        text: `To be a real companion, Sakha needs to know what's going on with you — your moods, your relationships, what's weighing on you. That's sensitive data by any definition. "Privacy first" can't be a marketing line when the stakes are this personal — it has to be an architecture.`,
      },
      { type: 'h2', text: "We don't sell. We don't rent. We don't train public models on you." },
      {
        type: 'p',
        text: `Conversations are processed by enterprise AI providers under contractual commitments that your prompts and responses are never used to train their public models. You can export or delete your data at any time, and deletion is honoured within 30 days.`,
      },
      {
        type: 'quote',
        text: `The test of a privacy policy is what happens when it's inconvenient for us. Ours is built to hold under that pressure.`,
      },
      {
        type: 'p',
        text: `Read the full details on our Privacy page — written in plain language, not legalese wherever we could manage it.`,
      },
    ],
  },
];

/** Ordered list of every publishable slug — drives generateStaticParams + sitemap. */
export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return posts.find((p) => p.featured) ?? posts[0];
}

export function getCategories(): Array<'All' | BlogCategory> {
  return ['All', ...Array.from(new Set(posts.map((p) => p.category)))];
}

/** Previous/next articles, wrapping around the list (matches the design). */
export function getAdjacentPosts(slug: string): { prev: BlogPost; next: BlogPost } {
  const idx = Math.max(0, posts.findIndex((p) => p.slug === slug));
  const next = posts[(idx + 1) % posts.length];
  const prev = posts[(idx - 1 + posts.length) % posts.length];
  return { prev, next };
}
