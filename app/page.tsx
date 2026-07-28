import Hero from './components/Hero';
import ProductsSection from './components/ProductsSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import SEOStructuredData from './components/SEOStructuredData';
import HomeSectionScroll from './components/HomeSectionScroll';

/**
 * Home page — section order comes from the handoff (home.jsx: HomePage):
 * Hero → Products → Team → Contact.
 *
 * The navbar, footer and download modal live in the root layout so every route
 * shares them, matching the handoff's app shell (app.jsx).
 *
 * Note: the handoff also defines an AboutSection but does not render it, so the
 * mission copy that used to sit between Products and Team is intentionally
 * absent here.
 */
export default function Home() {
  return (
    <>
      <HomeSectionScroll />
      {/* page-enter gives the fade-up entrance the handoff wraps every page in
          (home.jsx:6). Without it the home page appeared instantly while the
          blog pages animated in. */}
      <div className="page-enter">
        <Hero />
        <ProductsSection />
        <TeamSection />
        <ContactSection />
      </div>
      <SEOStructuredData />
    </>
  );
}
