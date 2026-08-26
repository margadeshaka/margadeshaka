/**
 * Blog content — "Notes from the path".
 *
 * Single source of truth for the Margadeshaka blog. Ported from the
 * claude.ai/design bundle (Margadeshaka.html → blog.jsx). Posts render on
 * /blog (listing) and /blog/[slug] (article). Order matters: it drives the
 * "Latest articles" grid and the prev/next links at the end of an article.
 */

export type BlogAccent = 'gold' | 'purple' | 'aurora';

export type BlogCategory = 'Vision' | 'Engineering' | 'Product' | 'Trust' | 'Wellness';

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
  /**
   * Optional cover image, served from /public. Posts without one simply render
   * no cover rather than falling back to a placeholder — a generic stock image
   * would say less than nothing.
   */
  cover?: { src: string; alt: string; width: number; height: number };
  body: BlogBlock[];
}

export const posts: BlogPost[] = [
  {
    slug: 'how-to-stop-overthinking',
    title: 'How to Stop Overthinking and Feel More in Control of Your Thoughts',
    excerpt:
      `Overthinking has been normalised, but analysing every word and every action is exhausting. What overthinking really is, why it happens, and six things you can do to break the loop.`,
    category: 'Wellness',
    date: 'August 26, 2026',
    isoDate: '2026-08-26',
    readTime: '6 min read',
    author: 'Vanshika',
    featured: true,
    accent: 'gold',
    cover: {
      src: '/images/blog/how-to-stop-overthinking-cover.webp',
      alt: 'A young man sits back on a sofa holding a phone against his chin, looking away in thought, while behind him a woman rests her forehead against her hand.',
      width: 1536,
      height: 863,
    },
    body: [
      { type: 'p', text: `Overthinking has become so common that people have normalised it, but there is real exhaustion in overanalysing every word and every action until it becomes a loop you get stuck in. You never arrive at a conclusion. It slowly turns into a habit without you realising it, and many people mistake it for a personality trait. So how do you stop overthinking and break the loop? That is exactly what we are going to talk about here.` },
      { type: 'h2', text: `What overthinking actually is` },
      { type: 'p', text: `When one thought becomes repetitive, that is overthinking. A normal thinker addresses a thought and lets it go. An overthinker cannot simply let go. They analyse everything, but that analysis comes from worry and fear, and analysis rooted in fear is never healthy and never productive.` },
      { type: 'p', text: `The cycle runs like this. A thought arrives rooted in fear or worry, you grow anxious over it, you analyse it, more uncertainty appears, and that brings more constant thoughts. The questions never stop. What if I made the wrong decision? What if they judge me? What if this does not work out? The answers never come when you are thinking from fear.` },
      { type: 'h2', text: `Why do we overthink?` },
      { type: 'p', text: `Overthinking often comes from the fear of losing control and the fear of uncertainty. Everyone wants to be in control, but some things are simply out of our hands, and sometimes the kindest thing you can do is accept that. These are the most common reasons behind it.` },
      { type: 'p', text: `● Past trauma` },
      { type: 'p', text: `● Fear of failure` },
      { type: 'p', text: `● Fear of judgement` },
      { type: 'p', text: `● Always imagining the worst case scenario` },
      { type: 'p', text: `● Worrying about every decision you have to make` },
      { type: 'p', text: `● Focusing too much on the past or the future` },
      { type: 'p', text: `● Feeling emotionally overwhelmed` },
      { type: 'p', text: `● Low self esteem` },
      { type: 'h2', text: `Signs that you are overthinking` },
      { type: 'p', text: `● You become impulsive when making decisions` },
      { type: 'p', text: `● You feel mentally tired or [exhausted](https://dictionary.cambridge.org/dictionary/english/exhausted)` },
      { type: 'p', text: `● You always imagine the worst possible outcome` },
      { type: 'p', text: `● You cannot sleep properly because your thoughts keep running` },
      { type: 'p', text: `● You second guess yourself constantly` },
      { type: 'p', text: `● You keep asking for reassurance` },
      { type: 'p', text: `● You are afraid to make mistakes` },
      { type: 'p', text: `● You cannot bring yourself to take the first step` },
      { type: 'h2', text: `Overthinking is not problem solving` },
      { type: 'p', text: `A lot of people believe their ability to overanalyse is a problem solving skill, but that is not the case. A problem solving mind asks: I have a problem, so what can I actually do about it? An overthinking mind gets stuck in a loop of: I have a problem, and what if it all goes wrong? It only considers the negative outcomes, while a problem solving mind stays neutral.` },
      { type: 'p', text: `When you are overthinking a problem you feel fear and anxiety. When you are actually solving one you feel calm, and you stop worrying over it.` },
      { type: 'quote', text: `A problem solving mind leads to action. An overthinking mind holds back out of fear.` },
      { type: 'h2', text: `How to stop overthinking` },
      { type: 'h2', text: `1. Stop believing every thought` },
      { type: 'p', text: `A thought being constant in your mind does not make it true. It has power over you only when you give it power. If you let the thought come and go like a passing train and simply observe it, it holds nothing. So the next time a negative thought crosses your mind, tell yourself that it is just a thought, and it is not true.` },
      { type: 'h2', text: `2. Separate facts from assumptions` },
      { type: 'p', text: `Many of us start making assumptions when we are anxious, and those assumptions are what make the loop so hard to break. The next time it happens, ask yourself which of these statements are actually true, and which of them are only assumptions. It is a simple exercise, and it gives your mind clarity in that moment.` },
      { type: 'h2', text: `3. Set a time to overthink` },
      { type: 'p', text: `You might wonder how setting aside time to overthink could possibly be healthy. But instead of overthinking all day, give yourself a fixed window to overthink as much as you want, and then stop when the time is up. Slowly this builds a habit of overthinking for a small part of the day, and then hardly at all.` },
      { type: 'h2', text: `4. List what you can and cannot control` },
      { type: 'p', text: `This will sound silly to some, but the difference shows up only when you actually make the list. Once it is on paper, remind yourself that the things within your control are already being handled, so there is nothing to worry about, and the things outside your control are ones you can do nothing about, so worrying changes none of them.` },
      { type: 'h2', text: `5. Talk it all out` },
      { type: 'p', text: `Some people break the loop by talking it all out. Negative thoughts blind us and we stop seeing things clearly, so it always helps to say what is on your mind to people you trust. Putting your feelings into words brings real relief. And if you feel you [have no one to talk to](/blog/i-need-someone-to-talk-to/), there are apps where you can talk to a companion instead.` },
      { type: 'h2', text: `6. Write your thoughts down` },
      { type: 'p', text: `This one works like magic. When you freely put your feelings down on paper, it genuinely feels like you told an actual person, and you can look at them again later with a clearer head.` },
      { type: 'h2', text: `When you need help understanding yourself` },
      { type: 'p', text: `Sometimes being self aware is not enough. You can know all your patterns and still be unable to break the loop. We are human, we need help, and it is okay to need it.` },
      { type: 'p', text: `That is where a space to reflect makes the difference. [Sakha](/#products) is a companion designed for exactly those moments. It helps you explore your thoughts and emotions and find clarity. Instead of telling you to stop overthinking, it helps you take a breath and slow down in the present. It is a private and judgement free space. When you are stuck in a loop, Sakha helps you see things from another perspective, and helps you feel understood.` },
    ],
  },
  {
    slug: 'feeling-lost-and-empty',
    title: 'Feeling Lost and Empty? Understanding Why You Feel This Way and What to Do Next',
    excerpt:
      `Everything in life looks fine, yet you feel hollow inside. Why the feeling of being lost and empty builds, what it is trying to tell you, and small steps to reconnect with yourself.`,
    category: 'Wellness',
    date: 'August 19, 2026',
    isoDate: '2026-08-19',
    readTime: '5 min read',
    author: 'Vanshika',
    featured: false,
    accent: 'gold',
    cover: {
      src: '/images/blog/feeling-lost-and-empty-cover.webp',
      alt: 'A person sits on a windowsill in a dark room, hugging their knees and looking out through a large window over a wide, calm lake.',
      width: 1536,
      height: 1152,
    },
    body: [
      { type: 'p', text: `Feeling lost and empty usually comes from feeling disconnected from yourself and your own life. What makes it worse is when everything else in life seems fine and you still cannot figure out why you feel so hollow inside. The question never leaves your mind, and you keep searching for an answer.` },
      { type: 'p', text: `The answer is within you. That sounds simple, and hearing it like this does not hand you anything to act on. But the only real way to remove this feeling of being lost and empty is to reconnect with your core, and that is something you can start doing today.` },
      { type: 'h2', text: `What does feeling lost and empty actually mean?` },
      { type: 'p', text: `There are days when we no longer know what we want from life, when something feels missing but we have no clue what, when life seems to run in a loop. If that is where you are, this is not happening to you, it is happening for you. It is your nervous system's way of reminding you to have a life of your own. We feel lost and empty in our own lives because we are too present in everyone else's.` },
      { type: 'quote', text: `It is not happening to you. It is happening for you.` },
      { type: 'h2', text: `Why do you feel lost and empty?` },
      { type: 'p', text: `To feel this way is to carry a constant void inside you, and it rarely appears out of nowhere. Here are the most common reasons behind it.` },
      { type: 'h2', text: `You are no longer connected to yourself` },
      { type: 'p', text: `This is the most common reason. We spend so much energy meeting the expectations and needs of others, at the expense of our own, that we slowly detach from our values and the things that matter to us. Keep losing what matters most to you for long enough and you start to feel disconnected from your own life, until one day you have become someone you thought you would never be, or someone you don't even recognise.` },
      { type: 'h2', text: `You are analysing your feelings instead of feeling them` },
      { type: 'p', text: `When you reflect on your thoughts and behaviour all the time, you slip into an analytical mode, and once you are there it is hard to stop interrogating yourself. Why am I feeling this way? Why is this happening? What is this trying to teach me? You get stuck on the why and the what, and you forget that you are a human who needs to actually feel those emotions too, not just explain them.` },
      { type: 'h2', text: `You compare your life with others` },
      { type: 'p', text: `Success is never measured by comparing yourself to others; it is measured by comparing your past with your present. Everyone has their own timing in life, and you never know how many times the person you envy has felt lost on their way here. The comparison cycle is one of the fastest routes to feeling empty in your own life, and it is the same trap that leaves us [feeling lost despite having more information than ever](/blog/why-margadeshaka/).` },
      { type: 'h2', text: `You are exhausted, and not just physically` },
      { type: 'p', text: `Exhaustion can hollow a person out, and this is not about the physical kind but the kind that drains you mentally and emotionally. It is real enough that the [World Health Organization recognises burnout](https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases) in its International Classification of Diseases. When you have been holding everything together for too long out of fear of it coming apart, sometimes the simplest and kindest thing to do is to accept that, and let some things come apart.` },
      { type: 'h2', text: `What to do when you feel lost and empty` },
      { type: 'p', text: `You do not need a grand reinvention. These are small, repeatable steps, and they add up.` },
      { type: 'h2', text: `Ask yourself what is missing` },
      { type: 'p', text: `The feeling of emptiness usually points at something specific that has gone missing from your life. Ask yourself what you need to fill that gap. It can be direction, rest, purpose, connection, or something only you can name. Naming it is half the work.` },
      { type: 'h2', text: `Stop comparing and start living` },
      { type: 'p', text: `Take the energy you spend comparing your life with others and put it into growing your own, and you will notice the change. Growth happens where the focus is. When you shift that focus from others back to yourself, the growth starts happening inside you.` },
      { type: 'h2', text: `Start with small steps` },
      { type: 'p', text: `The day you feel ready to get your life together is the day to remind yourself that you don't have to solve everything at once. Just ask what you can do to feel a little better today, and do that.` },
      { type: 'h2', text: `Reconnect with what brings you joy` },
      { type: 'p', text: `We quietly stop doing the things that make us happy, and it is okay to take a break. But returning to the things that bring you joy is often the shortest way back to yourself.` },
      { type: 'h2', text: `Talk to someone` },
      { type: 'p', text: `Try talking to someone you trust. Sometimes you don't need advice, just a place to let it all out. Start with a low-effort conversation with a loved one today. And if it feels like you have no one to talk to, that feeling is far more common than you think, and there are ways through it.` },
      { type: 'h2', text: `How Sakha can help` },
      { type: 'p', text: `Sometimes you simply need a place to let everything out, and that is exactly what Sakha is for. Sakha is an AI companion for the days when you feel lost and empty and don't know where to go or what to do. These feelings often arrive at unusual hours, when everyone you know is asleep, and in those moments Sakha is there. There is no judgement, no timetable, and what you share stays yours. You don't need to figure everything out at once, and it is completely human to feel this way.` },
      { type: 'h2', text: `Conclusion` },
      { type: 'p', text: `Feeling lost and empty is not a flaw in you; it is a signal calling you back to yourself. Ask what is missing, take one small step, return to what brings you joy, and let someone in, whether that is a friend, a professional, or Sakha. You don't have to have all the answers today. Coming back to yourself is a journey, and it begins with a single honest step.` },
    ],
  },
  {
    slug: 'i-need-someone-to-talk-to',
    title: 'I Need Someone to Talk To But Have No One: What You Can Do Today',
    excerpt:
      `Everything looks fine, yet you're carrying it all alone. Why the feeling of having no one to talk to builds up, the signs it leaves, and small steps you can take today.`,
    category: 'Wellness',
    date: 'August 13, 2026',
    isoDate: '2026-08-13',
    readTime: '6 min read',
    author: 'Vanshika',
    featured: false,
    accent: 'gold',
    cover: {
      src: '/images/blog/i-need-someone-to-talk-to-cover.webp',
      alt: 'A person sits at a desk by a window at dusk, chin resting on one hand, a mug and an open journal in front of them, alongside four gentle reminders: write it out, breathe and ground yourself, reach out, and be kind to yourself.',
      width: 1536,
      height: 1024,
    },
    body: [
      { type: 'p', text: `At some point in our everyday lives, there comes a moment when we all feel "I need someone to talk to, but I have no one." This feeling often arrives unannounced. Everything in life seems fine, but your heart craves a connection, or simply someone to tell the small details of your day, or how long you have been holding on alone.` },
      { type: 'p', text: `Loneliness is becoming increasingly common. The [World Health Organization](https://www.who.int/groups/commission-on-social-connection) now recognises it as a major global health concern affecting roughly one in six people, with real risks to both physical and mental health.` },
      { type: 'h2', text: `Why do you feel like you have no one to talk to?` },
      { type: 'p', text: `In the era of social media we constantly compare our lives with others, forgetting that they are also just humans who, like everyone else, share only the good moments from their life. Let's accept the fact: we humans fear judgement and fear being alone, and because of that we fear showing our authentic lives. We share only the parts we know will be accepted, because nobody wants to come across as the black sheep.` },
      { type: 'p', text: `Another reason is that we lose touch with our loved ones as we grow up. Slowly those school friends, that college group, parents, siblings all start to drift away in the race of life. Everyone gets busy building a stable future, without realising it is costing us our present. And before sharing your feelings you suddenly start to think: what if I am bothering them? Slowly this becomes a cycle. You keep things within you, it all bottles up, and one day your body can't take it anymore. In that moment it doesn't even make sense why you are feeling this way.` },
      { type: 'h2', text: `How keeping everything inside affects you` },
      { type: 'p', text: `It might look like you can handle everything alone and you are doing fine, but your body and mind give you signs that seem like no big deal in the moment, until one day they aren't. If you notice these signs, it's time to talk about your emotions more:` },
      { type: 'p', text: `● You start to isolate yourself` },
      { type: 'p', text: `● You wake up feeling tired` },
      { type: 'p', text: `● You find it difficult to sleep` },
      { type: 'p', text: `● You react strongly to small things but feel numb when big problems arrive` },
      { type: 'p', text: `● Everything in life seems fine, but you still don't feel good inside and can't figure out why` },
      { type: 'p', text: `● You either cry a lot or you don't cry at all` },
      { type: 'p', text: `● You don't feel motivated` },
      { type: 'h2', text: `What you can do today` },
      { type: 'p', text: `The fact that you are still reading this is itself a positive sign. It takes a lot of courage to work on yourself without anyone pushing you. Here are some ways to cope with feelings of isolation and loneliness.` },
      { type: 'h2', text: `Journal your thoughts every night before sleep` },
      { type: 'p', text: `You don't need a fancy journal for this, just a pen and paper to dump everything on your mind every night. It might feel weird or like too much at the start, but done consistently it provides real clarity, and you feel as if you actually told someone your thoughts.` },
      { type: 'h2', text: `Take a short walk outside to calm your mind` },
      { type: 'p', text: `Regular walking is scientifically shown to support mental health: it boosts your mood, reduces stress, and helps regulate a calm nervous system. It also leads to better sleep quality.` },
      { type: 'h2', text: `Talk to someone you trust, even if it's been a while` },
      { type: 'p', text: `Take the first step and call or meet someone you trust. You never know how much the other person is also looking forward to an honest conversation.` },
      { type: 'h2', text: `Try an AI companion` },
      { type: 'p', text: `In this digital era, many people also talk through their feelings with AI companions when they don't have someone to talk to. As long as you feel comfortable and safe, there is nothing wrong with it. An AI companion is affordable and available every time, even late at night when you cannot disturb your close ones.` },
      { type: 'quote', text: `Asking for help is a strength, not a weakness.` },
      { type: 'p', text: `Today people have normalised keeping things to themselves, thinking they are strong enough to endure it all, but holding onto things for long periods eventually backfires. We humans strive for connection, and it takes real courage to share your feelings.` },
      { type: 'h2', text: `How Sakha can support you` },
      { type: 'p', text: `Some days you don't need guidance or advice, and hearing more of it can exhaust you even further. You simply need a place to vent and feel understood. There are days when your friends are busy, and things you don't feel comfortable sharing with family because you don't want to stress them. You feel desperate for a safe place where you can just let it all out, and in those moments it is completely fine to look for another way to feel a sense of calm. That is exactly why we built [Sakha](/#products).` },
      { type: 'p', text: `Sakha is an AI companion built for days like this. Instead of rushing to give you answers, it helps you understand yourself, think clearly and move forward. Your conversations are encrypted, there is no fear of being judged, and [what you share stays private](/privacy/).` },
      { type: 'h2', text: `Conclusion` },
      { type: 'p', text: `You don't have to make isolation and loneliness your comfort place just because they feel familiar. Whether you open up to a close friend, seek professional help, or try Sakha, know that it takes strength to open up in the first place. Take one step today. You deserve to be heard, understood, and to feel enough. The first step towards a conversation can lead to a better tomorrow. And if what you carry feels less like loneliness and more like [feeling lost and empty](/blog/feeling-lost-and-empty/), that has its own way back too.` },
    ],
  },
  {
    slug: 'why-margadeshaka',
    title: 'Why We Feel Lost Despite Having More Information Than Ever',
    excerpt:
      `Why do we have answers at our fingertips and yet many of us are not confident in life? We are in the most connected era of mankind's history today.`,
    category: 'Vision',
    date: 'August 4, 2026',
    isoDate: '2026-08-04',
    readTime: '7 min read',
    author: 'Vanshika',
    featured: false,
    accent: 'gold',
    cover: {
      src: '/images/blog/why-margadeshaka-cover.webp',
      // Describes what the image SHOWS. The title is baked into the artwork,
      // so repeating it here would just make a screen reader read the headline
      // twice — the alt carries what a sighted reader gets from the picture.
      alt: 'A person sits at a laptop with their head in their hands, surrounded by floating notifications — news alerts, unread mail, follower counts, to-do lists and market charts — crowding in from every side.',
      width: 1536,
      height: 1024,
    },
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
      { type: 'p', text: `It's here that most people fall out of contact with. They don't have to look on the web for everything they need to know. There are answers which can only be gained by reflection, and only by experience. Losing that contact with yourself is exactly what leaves so many of us [feeling lost and empty](/blog/feeling-lost-and-empty/) even when life looks fine from the outside.` },
      { type: 'h2', text: `The social media media is remarking to the other people, where to go.` },
      { type: 'p', text: `People nowadays are lost because they observe all the trips of others. There is a new character in each scroll that appears to be doing something.` },
      { type: 'p', text: `Someone starts a new business.There is a person who begins a business out. There is someone who's traveling through the world. A new house is purchased. Someone gets promoted. A person is introducing their 'morning routine for success'.` },
      { type: 'p', text: `There were lots of these stories to view and naturally comparisons began. Questions start to arise within us.` },
      { type: 'p', text: `"What's going on, why am I so confused?" Why don't I know what I want? "All the others appear to be ahead of me."` },
      { type: 'p', text: `So it's not like that. What you see in social media is highlighting, not struggles. All of the success stories have experienced some level of doubt, failure and uncertainty and these stories are not always publicized online. Comparing takes away clarity because it takes us on another route than where we need to go. That same quiet comparison loop is one reason [so many of us feel we have no one to talk to](/blog/i-need-someone-to-talk-to/).` },
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
      { type: 'p', text: `[Guidance](https://en.wikipedia.org/wiki/Guidance) is a means of revealing to us what is best.` },
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
