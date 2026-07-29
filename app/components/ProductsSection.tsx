'use client';

import { useEffect, useRef } from 'react';
import SakhaCta from './SakhaCta';
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

const CHAT = [
  { who: 'user', d: '0s', text: "Lately I feel restless, like I'm chasing something I can't name." },
  {
    who: 'sakha',
    d: '0.9s',
    text: 'That restlessness is worth listening to. When did you last feel truly at ease?',
  },
  { who: 'user', d: '1.9s', text: "Honestly, I'm not sure I remember." },
  {
    who: 'sakha',
    d: '2.8s',
    text: "Then let's not rush to fix it. What would ease even feel like for you?",
  },
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/sakha-orb.png" alt="Sakha" className="sakha-editorial-img" />
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
                <span className="sakha-phone-time">9:41</span>
                <span className="sakha-phone-sysicons">
                  <svg viewBox="0 0 18 12" width="17" height="11">
                    <rect x="0" y="7.5" width="3" height="4.5" rx="0.8" />
                    <rect x="4.5" y="5" width="3" height="7" rx="0.8" />
                    <rect x="9" y="2.5" width="3" height="9.5" rx="0.8" />
                    <rect x="13.5" y="0" width="3" height="12" rx="0.8" />
                  </svg>
                  <svg viewBox="0 0 16 12" width="16" height="11">
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
              <div className="sakha-phone-head">
                <span className="sakha-phone-avatar" />
                <div>
                  <div className="sakha-phone-name">Sakha</div>
                  <div className="sakha-phone-status">
                    <i />
                    thinking with you
                  </div>
                </div>
              </div>
              <div className="sakha-phone-body">
                <div className="chat-day">Today</div>
                {CHAT.map((c, i) => (
                  <div
                    key={i}
                    className={`chat-b chat-${c.who}`}
                    style={{ '--d': c.d } as React.CSSProperties}
                  >
                    {c.text}
                  </div>
                ))}
                <div className="chat-typing" style={{ '--d': '3.7s' } as React.CSSProperties}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="sakha-phone-inputbar">
                <div className="sakha-phone-input">
                  <span>Message Sakha…</span>
                </div>
                <span className="sakha-phone-send">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M4 12h13M11 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
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
          <article className="reflect-card reflect-card--seed">
            <span className="reflect-label">GROWTH</span>
            <p className="reflect-q reflect-q--sm">
              Every conversation is a small step toward understanding yourself.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/sakha-orb.png" alt="" className="reflect-seed" aria-hidden="true" />
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
