import SectionHeading from './SectionHeading';

const valueCards = [
  {
    title: 'Vedic + modern AI',
    body: 'Sidereal astrology computed via Swiss Ephemeris, paired with Azure OpenAI for emotionally aware guidance.',
  },
  {
    title: 'Active learning',
    body: 'Project-based tutoring that adapts to the learner instead of passive video watching.',
  },
  {
    title: 'Privacy first',
    body: 'Personal data stays personal. We do not sell, rent, or share user information.',
  },
];

const milestones = [
  {
    date: 'March 2025',
    title: 'Incorporated',
    body: 'Margadeshaka AI Private Limited registered with the Ministry of Corporate Affairs (CIN U85499PB2025PTC063772).',
  },
  {
    date: 'August 2025',
    title: 'DPIIT recognition',
    body: 'Recognised as a Startup by the Department for Promotion of Industry and Internal Trade (DIPP215241).',
  },
  {
    date: 'Late 2025',
    title: 'Sakha enters beta',
    body: 'AI Vedic astrology companion ships on iOS, Android, and Web.',
  },
  {
    date: '2026 →',
    title: 'Dronacharya',
    body: 'Multi-agent AI tutor with project-based certifications enters development.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section relative">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Our Mission"
          title={
            <>
              AI that guides and educates <span className="gold-text">with depth and care</span>
            </>
          }
        />

        <div
          className="mt-12 mx-auto flex flex-col gap-5 text-white/[0.78]"
          style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 720 }}
        >
          <p>
            <strong className="text-white">Margadeshaka</strong>{' '}
            <span className="font-devanagari text-brand-gold">(मार्गदेशक</span>
            <span className="text-white/55"> — &quot;the one who shows the path&quot;)</span> is an
            India-based AI company building products that combine ancient wisdom with modern multi-agent AI.
            We&apos;re not building scripted Q&amp;A tools — we build thoughtful companions that help people make
            better decisions and build real expertise.
          </p>
          <p>
            We believe AI should amplify human potential, not replace human connection. Our products
            are designed to be private, considered, and to respect the depth of the traditions they
            draw from.
          </p>
        </div>

        {/* Value cards */}
        <ul
          className="mt-16 grid gap-5 list-none p-0"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
        >
          {valueCards.map((item) => (
            <li key={item.title} className="glass" style={{ padding: 28 }}>
              <h3 className="font-display text-[16px] text-brand-gold font-semibold mb-2.5">{item.title}</h3>
              <p className="text-white/70 text-[15px]" style={{ lineHeight: 1.65 }}>
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        {/* Milestones timeline */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="eyebrow">The first chapter</span>
            <h3
              className="font-display text-white mt-3 font-bold"
              style={{ fontSize: 28, letterSpacing: '-0.015em' }}
            >
              Milestones so far
            </h3>
          </div>

          <ol className="list-none p-0 m-0 relative grid gap-0">
            <div
              className="absolute"
              style={{
                left: 11,
                top: 8,
                bottom: 8,
                width: 1,
                background: 'linear-gradient(180deg, transparent, rgba(255,200,100,0.4), transparent)',
              }}
              aria-hidden="true"
            />
            {milestones.map((m, i) => (
              <li
                key={m.title}
                className="relative pl-10"
                style={{ paddingBottom: i === milestones.length - 1 ? 0 : 28 }}
              >
                <span
                  className="absolute"
                  style={{
                    left: 4,
                    top: 4,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: 'var(--brand-gold)',
                    boxShadow: '0 0 12px rgba(255,200,100,0.5)',
                    border: '3px solid #06050F',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="text-xs uppercase text-brand-gold font-semibold mb-1"
                  style={{ letterSpacing: '0.16em' }}
                >
                  {m.date}
                </div>
                <div className="text-[18px] text-white font-semibold mb-1.5">{m.title}</div>
                <div className="text-[14px] text-white/65" style={{ lineHeight: 1.6 }}>
                  {m.body}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
