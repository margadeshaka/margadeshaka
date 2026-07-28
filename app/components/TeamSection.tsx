'use client';

import { useState } from 'react';
import { company } from '../lib/company';

/**
 * Team section, ported from the handoff (home.jsx: TeamSection). Replaces the
 * previous single FounderSection.
 *
 * The four members sit on a flowing thread: fixed node positions joined by a
 * Catmull-Rom spline converted to cubic béziers, so the curve passes exactly
 * through each node instead of being eyeballed. Hovering a node lights the
 * segments either side of it and reveals a bio tooltip.
 *
 * The handoff used <image-slot> placeholders for avatars — an authoring-tool
 * element for images the designer hadn't filled in. No photographs shipped in
 * the bundle, so we render each member's initials, which is what the
 * placeholder was displaying anyway.
 */

// Node coordinates in the 1000 x 560 viewBox the SVG uses.
const TEAM_POS = [
  { x: 205, y: 356 },
  { x: 415, y: 166 },
  { x: 648, y: 360 },
  { x: 852, y: 172 },
];

type Pt = { x: number; y: number };

/** Control points for the Catmull-Rom segment p1→p2, given neighbours p0/p3. */
function crSegment(p0: Pt, p1: Pt, p2: Pt, p3: Pt) {
  return {
    c1: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
    c2: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 },
  };
}

const TEAM_SEGS = TEAM_POS.slice(0, -1).map((_, i) => {
  const p0 = TEAM_POS[i - 1] || TEAM_POS[i];
  const p1 = TEAM_POS[i];
  const p2 = TEAM_POS[i + 1];
  const p3 = TEAM_POS[i + 2] || TEAM_POS[i + 1];
  const { c1, c2 } = crSegment(p0, p1, p2, p3);
  return { d: `M${p1.x},${p1.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`, c1, c2, p2 };
});

const TEAM_FULL_D =
  `M${TEAM_POS[0].x},${TEAM_POS[0].y}` +
  TEAM_SEGS.map((s) => ` C${s.c1.x},${s.c1.y} ${s.c2.x},${s.c2.y} ${s.p2.x},${s.p2.y}`).join('');

export default function TeamSection() {
  const [active, setActive] = useState<number | null>(null);
  const team = company.team;

  return (
    <section id="team" className="section team-section">
      <div className="container">
        <div className="team-head">
          <span className="eyebrow">Our Team</span>
          <h2 className="team-title">
            The People Behind <span className="gold-text">Sakha</span>
          </h2>
          <p className="team-sub">
            A small team building technology that feels more human. Every conversation, every
            feature, and every experience is shaped by people who believe guidance should be
            accessible, compassionate, and personal.
          </p>
        </div>

        <div className="team-stage">
          <svg
            className="team-lines"
            viewBox="0 0 1000 560"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="team-thread-base" d={TEAM_FULL_D} />
            {TEAM_SEGS.map((s, i) => (
              <path
                key={i}
                className={
                  'team-thread-seg' +
                  (active === i || active === i + 1 ? ' team-thread-seg--on' : '')
                }
                d={s.d}
              />
            ))}
            <path className="team-thread-pulse" d={TEAM_FULL_D} />
          </svg>

          {team.map((m, i) => (
            <div
              key={m.name}
              className={'team-node' + (active === i ? ' team-node--active' : '')}
              style={
                {
                  left: `${TEAM_POS[i].x / 10}%`,
                  top: `${TEAM_POS[i].y / 5.6}%`,
                  '--fd': `${i * -1.9}s`,
                } as React.CSSProperties
              }
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              tabIndex={0}
            >
              <div className="team-node-inner">
                <span className="team-node-glow" aria-hidden="true" />
                <span className="team-avatar">{m.initials}</span>
              </div>
              <div className="team-label">
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
              </div>
              <div className="team-tooltip" role="tooltip">
                <div className="team-tooltip-name">{m.name}</div>
                <div className="team-tooltip-role">{m.role}</div>
                <p className="team-tooltip-bio">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
