'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reflection cards — a hand of cards, fanned, face-up.
 *
 * The four cards overlap in an arc like a hand you're holding. Each card's
 * label sits top-left, which is the part left visible by the overlap, so the
 * fan reads like the ranks on a real hand. Clicking a card lifts it clear of
 * the fan and straightens it to be read; clicking again returns it.
 *
 * Only one card is out at a time — that is what makes it read as picking a
 * card out of a hand.
 *
 * The card face, gold label, display type and mood chips come from the design
 * (home.jsx: ReflectDeck in the "Copy of Margadeshaka Company website"
 * project). The fan is not in that design.
 */
type Card = {
  label: string;
  q: string;
  chips?: string[];
};

const REFLECT_CARDS: Card[] = [
  {
    label: "TODAY'S REFLECTION",
    q: "What have you been carrying that you haven't said out loud?",
  },
  {
    label: 'INSIGHT',
    q: "Sometimes clarity doesn't come from finding the answer. It comes from asking a better question.",
  },
  {
    label: 'CHECK-IN',
    q: 'How are you feeling right now?',
    chips: ['Calm', 'Hopeful', 'Overwhelmed', 'Curious', 'Lost'],
  },
  {
    label: 'GROWTH',
    q: 'Every conversation is a small step toward understanding yourself.',
  },
];

/** Degrees between neighbouring cards in the fan. */
const SPREAD = 15;

/**
 * How long the pointer must rest on a card before it comes out.
 *
 * Driven by a timer rather than CSS `transition-delay`, which proved
 * unreliable here: the delay applies to the property transition, so any rule
 * that re-declares the `transition` shorthand resets it, and it gives no way
 * to cancel a pending reveal. An explicit timer is observable and cancellable.
 */
const HOVER_DELAY_MS = 300;

export default function ReflectDeck() {
  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  // A pending reveal must not fire after the component is gone.
  useEffect(() => clearTimer, []);

  const onEnter = (i: number) => {
    // Touch devices fire mouseenter on tap and never fire mouseleave, which
    // would strand a card out; there, tapping to pin is the interaction.
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) return;
    clearTimer();
    timer.current = setTimeout(() => setHovered(i), HOVER_DELAY_MS);
  };

  const onLeave = () => {
    // Cancels a reveal that has not fired yet, so sweeping across the fan
    // never pops a card behind the pointer.
    clearTimer();
    setHovered(null);
  };

  return (
    <div className="reflect-deck-wrap">
      <div className="reflect-deck">
        {REFLECT_CARDS.map((c, i) => {
          const isUp = active === i;
          // Centre the arc on the middle of the hand: with 4 cards the offsets
          // are -1.5, -0.5, 0.5, 1.5 — so the fan is symmetrical for any count.
          const rot = (i - (REFLECT_CARDS.length - 1) / 2) * SPREAD;
          return (
            <button
              key={i}
              type="button"
              className={
                'reflect-card' +
                (isUp ? ' is-active' : '') +
                (hovered === i && !isUp ? ' is-hovered' : '')
              }
              onMouseEnter={() => onEnter(i)}
              onMouseLeave={onLeave}
              // --z, not a plain zIndex: an inline style would beat the
              // stylesheet, and then :hover could never lift a card above the
              // ones stacked on top of it. The base rule reads this variable so
              // the hover and active rules can still override it.
              // The value climbs with DOM order, so each card overlaps the one
              // before it exactly like a hand.
              style={{ '--rot': `${rot}deg`, '--z': i + 1 } as React.CSSProperties}
              aria-pressed={isUp}
              aria-label={isUp ? `Put back ${c.label}` : `Pick ${c.label}`}
              onClick={() => {
                // A click is deliberate — it should not wait out the dwell.
                clearTimer();
                setActive(isUp ? null : i);
              }}
            >
              <span className="reflect-label">{c.label}</span>
              <span className="reflect-q">{c.q}</span>
              {c.chips && (
                <span className="reflect-chips">
                  {c.chips.map((m) => (
                    <span
                      key={m}
                      role="button"
                      tabIndex={isUp ? 0 : -1}
                      className={'reflect-chip' + (mood === m ? ' is-on' : '')}
                      aria-pressed={mood === m}
                      // Without this the tap bubbles to the card and puts it
                      // straight back in the hand.
                      onClick={(e) => {
                        e.stopPropagation();
                        setMood(mood === m ? null : m);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          setMood(mood === m ? null : m);
                        }
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="reflect-deck-hint">
        {active === null ? 'Hover a card to read it — tap to keep it out' : 'Tap the card to put it back'}
      </p>
    </div>
  );
}
