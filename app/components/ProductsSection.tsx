'use client';

import { useEffect, useRef } from 'react';
import SakhaCta from './SakhaCta';
import SakhaSprout from './SakhaSprout';
import { ArrowRight } from './icons';

/**
 * Products section, ported from the handoff (home.jsx: ProductsSection).
 *
 * Four movements:
 *   1. Sakha editorial — orb + copy; the orb scales up once scrolled into view.
 *   2. Phone showcase — a device mock replaying a conversation, ringed by
 *      floating snippets of other conversations.
 *   3. Reflection deck — the in-app card surfaces.
 *   4. Closing line + the primary Sakha call to action.
 *
 * Client-side because the orb's grow-in is driven by IntersectionObserver. The
 * chat bubbles and particles animate purely in CSS, staggered off `--d` / `--i`.
 */

const CONVOS = [
  {
    side: 'l1',
    user: "I feel like I'm falling behind everyone.",
    sakha: 'Whose timeline are you comparing yourself to?',
  },
  {
    side: 'l2',
    user: 'Why do I keep feeling stuck?',
    sakha: "Sometimes clarity begins by understanding what's holding you back.",
  },
  {
    side: 'r1',
    user: "I've been overthinking this decision.",
    sakha: "Let's explore what feels uncertain instead of rushing to an answer.",
  },
  { side: 'r2', user: 'I just need someone to listen.', sakha: "I'm here. Take your time." },
];

/**
 * The conversation shown on the phone. `time` mirrors the real app, which
 * captions every bubble with a short locale time (ChatBubble.formattedTime).
 */
const CHAT = [
  {
    who: 'user',
    d: '0s',
    time: '12:08 PM',
    text: "Lately I feel restless, like I'm chasing something I can't name.",
  },
  {
    who: 'sakha',
    d: '0.9s',
    time: '12:08 PM',
    text: 'That restlessness is worth listening to. When did you last feel truly at ease?',
  },
  { who: 'user', d: '1.9s', time: '12:09 PM', text: "Honestly, I'm not sure I remember." },
  {
    who: 'sakha',
    d: '2.8s',
    time: '12:09 PM',
    text: "Then let's not rush to fix it. What would ease even feel like for you?",
  },
];

/** Suggested actions above the composer, as the app offers them. */
const SUGGESTIONS = ["I want to talk about how I'm feeling", 'Tell me something a'];

/**
 * Starfield inside the phone screen. Fixed literals rather than Math.random()
 * so server and client markup match — this page is a static export.
 */
const PHONE_STARS = [
  { x: 12, y: 14, r: 1.4, o: 0.5 }, { x: 78, y: 9, r: 1.1, o: 0.4 },
  { x: 44, y: 22, r: 1.2, o: 0.55 }, { x: 88, y: 27, r: 1.5, o: 0.45 },
  { x: 22, y: 34, r: 1.1, o: 0.35 }, { x: 63, y: 41, r: 1.3, o: 0.5 },
  { x: 8, y: 48, r: 1.2, o: 0.4 }, { x: 92, y: 54, r: 1.1, o: 0.35 },
  { x: 34, y: 58, r: 1.5, o: 0.55 }, { x: 71, y: 65, r: 1.2, o: 0.4 },
  { x: 18, y: 71, r: 1.3, o: 0.45 }, { x: 55, y: 77, r: 1.1, o: 0.5 },
  { x: 84, y: 82, r: 1.4, o: 0.4 }, { x: 28, y: 88, r: 1.2, o: 0.35 },
  { x: 66, y: 92, r: 1.1, o: 0.45 }, { x: 47, y: 5, r: 1.2, o: 0.4 },
];

const MOODS = ['Calm', 'Hopeful', 'Overwhelmed', 'Curious', 'Lost'];

export default function ProductsSection() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('grown');
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="products" className="section">
      <div className="container sakha-editorial">
        <div className="sakha-editorial-visual" ref={visualRef}>
          <span className="sakha-editorial-glow" aria-hidden="true" />
          {/* Inline SVG, not the PNG: the parts grow in sequence (stem → left
              leaf → right leaf → orb), which a single raster can't do. */}
          <SakhaSprout />
        </div>
        <div className="sakha-editorial-copy">
          <span className="sakha-editorial-label fade-up">MEET SAKHA</span>
          <h2 className="sakha-editorial-heading fade-up delay-100">Clarity begins here.</h2>
          <p className="sakha-editorial-lead fade-up delay-200">
            Sakha is your thoughtful AI companion for reflection, self-discovery, and meaningful
            conversations. Instead of rushing to give answers, it helps you understand yourself,
            think clearly, and move forward with confidence.
          </p>
        </div>
      </div>

      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(30px, 4.2vw, 46px)',
              fontWeight: 500,
              color: '#fff',
              marginTop: 12,
              lineHeight: 1.14,
              letterSpacing: '-0.008em',
            }}
          >
            See how Sakha <span className="gold-text">thinks with you.</span>
          </h2>
        </div>

        <div className="sakha-showcase">
          <div className="sakha-phone-glow" aria-hidden="true" />
          <div className="sakha-phone-particles" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} style={{ '--i': i } as React.CSSProperties} />
            ))}
          </div>

          <div className="sakha-phone" aria-hidden="true">
            <span className="sakha-phone-btn sakha-phone-btn--mute" />
            <span className="sakha-phone-btn sakha-phone-btn--vup" />
            <span className="sakha-phone-btn sakha-phone-btn--vdn" />
            <span className="sakha-phone-btn sakha-phone-btn--power" />
            <div className="sakha-phone-screen">
              <div className="sakha-phone-island" />
              <div className="sakha-phone-statusbar">
                <span className="sakha-phone-time">12:08</span>
                <span className="sakha-phone-sysicons">
                  {/* 17 × 11pt signal, 15 × 11pt wifi — scaled by 0.7277 like
                      everything else on this screen. */}
                  <svg viewBox="0 0 18 12" width="12" height="8">
                    <rect x="0" y="7.5" width="3" height="4.5" rx="0.8" />
                    <rect x="4.5" y="5" width="3" height="7" rx="0.8" />
                    <rect x="9" y="2.5" width="3" height="9.5" rx="0.8" />
                    <rect x="13.5" y="0" width="3" height="12" rx="0.8" />
                  </svg>
                  <svg viewBox="0 0 16 12" width="11" height="8">
                    <path
                      d="M8 11.2 1.2 4.6a9.6 9.6 0 0 1 13.6 0L8 11.2Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      opacity="0.35"
                    />
                    <path d="M8 11.2 4 7.3a5.6 5.6 0 0 1 8 0L8 11.2Z" />
                  </svg>
                  <span className="sakha-phone-batt">
                    <i />
                  </span>
                </span>
              </div>
              {/* Nav bar — ChatView's toolbar with a conversation open:
                  "‹ Back" leading and a compose glyph (SF `square.and.pencil`)
                  trailing, both in sakhaAccent, with "Sakha" as the inline
                  principal title over a navy900 → indigo950 gradient. */}
              <div className="sakha-phone-nav">
                <span className="sakha-phone-nav-back">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 5l-7 7 7 7" />
                  </svg>
                  Back
                </span>
                <span className="sakha-phone-nav-title">Sakha</span>
                <span className="sakha-phone-nav-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                  </svg>
                </span>
              </div>

              <div className="sakha-phone-body">
                {/* The chat sits on the same starfield as the rest of the app —
                    the screen is not a flat panel. */}
                <div className="chat-stars" aria-hidden="true">
                  {PHONE_STARS.map((s, i) => (
                    <span
                      key={i}
                      style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r, height: s.r, opacity: s.o }}
                    />
                  ))}
                </div>

                {/* Conversation header: the mark, then the name and day as
                    chips, exactly as the app opens a session. */}
                <div className="chat-intro">
                  <SakhaSprout className="chat-intro-mark" />
                  <span className="chat-chip chat-chip--name">Sakha</span>
                  <span className="chat-chip">Today</span>
                </div>

                {CHAT.map((c, i) => (
                  <div
                    key={i}
                    className={`chat-row chat-row--${c.who}`}
                    style={{ '--d': c.d } as React.CSSProperties}
                  >
                    <div className={`chat-b chat-${c.who}`}>{c.text}</div>
                    <span className="chat-time">{c.time}</span>
                  </div>
                ))}
              </div>

              {/* Suggested actions — a horizontally scrolling row of prompts
                  sitting directly above the composer. */}
              <div className="chat-suggestions" aria-hidden="true">
                {SUGGESTIONS.map((s) => (
                  <span key={s} className="chat-suggestion">
                    {s}
                  </span>
                ))}
              </div>

              <div className="sakha-phone-inputbar">
                <div className="sakha-phone-input">
                  <span>Message</span>
                </div>
              </div>
              <div className="sakha-phone-home" />
            </div>
          </div>

          {CONVOS.map((c) => (
            <div key={c.side} className={`convo-card convo-${c.side}`}>
              <p className="convo-user">
                <span>You</span>
                {c.user}
              </p>
              <p className="convo-sakha">
                <span>Sakha</span>
                {c.sakha}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="reflect-deck-wrap">
        <div className="reflect-deck">
          <article className="reflect-card">
            <span className="reflect-label">TODAY&rsquo;S REFLECTION</span>
            <p className="reflect-q">
              What have you been carrying that you haven&rsquo;t said out loud?
            </p>
          </article>
          <article className="reflect-card">
            <span className="reflect-label">INSIGHT</span>
            <p className="reflect-q reflect-q--sm">
              Sometimes clarity doesn&rsquo;t come from finding the answer. It comes from asking a
              better question.
            </p>
          </article>
          <article className="reflect-card">
            <span className="reflect-label">CHECK-IN</span>
            <p className="reflect-q reflect-q--sm">How are you feeling right now?</p>
            <div className="reflect-chips">
              {MOODS.map((m) => (
                <span key={m} className="reflect-chip">
                  {m}
                </span>
              ))}
            </div>
          </article>
          {/* SUPPORT and PRIVACY carry two claims forward that the redesign
              would otherwise drop. 'Crisis-aware support' is the product's only
              duty-of-care claim and Develop kept it deliberately while
              replacing the two astrology bullets beside it. The privacy promise
              is the last unhedged "we don't sell your data" statement on any
              rendered page — it came from the AboutSection this redesign
              deletes, and it matters more now that the product invites people
              to talk about feeling heavy or unclear. */}
          <article className="reflect-card">
            <span className="reflect-label">SUPPORT</span>
            <p className="reflect-q reflect-q--sm">
              Crisis-aware support, for when the conversation gets heavy.
            </p>
          </article>
          <article className="reflect-card">
            <span className="reflect-label">PRIVACY</span>
            <p className="reflect-q reflect-q--sm">
              Personal data stays personal. We do not sell, rent, or share your information.
            </p>
          </article>
          <article className="reflect-card">
            <span className="reflect-label">GROWTH</span>
            <p className="reflect-q reflect-q--sm">
              Every conversation is a small step toward understanding yourself.
            </p>
          </article>
        </div>
      </div>

      <div className="container-narrow" style={{ textAlign: 'center' }}>
        <p
          className="fade-up"
          style={{
            marginTop: 20,
            fontSize: 20,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.82)',
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
          }}
        >
          Every meaningful change begins with a single conversation.
        </p>
        <div
          className="fade-up"
          style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}
        >
          <SakhaCta className="btn btn-primary">
            Start Your Journey with Sakha <ArrowRight />
          </SakhaCta>
        </div>
      </div>
    </section>
  );
}
