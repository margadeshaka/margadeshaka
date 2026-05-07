export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-6 max-w-5xl mx-auto" aria-labelledby="about-heading">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Our Mission</span>
        <h2 id="about-heading" className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          AI that guides and educates with depth and care
        </h2>
      </div>

      <div className="space-y-6 text-lg text-white/75 leading-relaxed max-w-3xl mx-auto">
        <p>
          Margadeshaka (Sanskrit for &quot;guide&quot;) is a young India-based AI company building products
          that combine ancient wisdom with modern multi-agent AI. We are not building scripted
          Q&amp;A tools — we build thoughtful companions that help people make better decisions and
          build real expertise.
        </p>
        <p>
          We believe AI should amplify human potential, not replace human connection. Our products
          are designed to be private, considered, and to respect the depth of the traditions they
          draw from.
        </p>
      </div>

      <ul className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {[
          {
            title: 'Vedic + Modern AI',
            body: 'Combining sidereal astrology with Azure OpenAI for emotionally aware guidance.',
          },
          {
            title: 'Active learning',
            body: 'Interactive tutoring that adapts to the learner instead of passive video watching.',
          },
          {
            title: 'Privacy first',
            body: 'Personal data stays personal. We do not sell or share user information.',
          },
        ].map((item) => (
          <li key={item.title} className="glass-card p-6">
            <h3 className="font-display text-base font-semibold text-brand-gold mb-2">{item.title}</h3>
            <p className="text-white/70 leading-relaxed">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
