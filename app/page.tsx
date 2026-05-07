import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import FounderSection from './components/FounderSection';
import ContactSection from './components/ContactSection';
import SiteFooter from './components/SiteFooter';
import SEOStructuredData from './components/SEOStructuredData';

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="relative">
        <HeroBanner />
        <AboutSection />
        <ProductsSection />
        <FounderSection />
        <ContactSection />
      </main>

      <SiteFooter />

      <SEOStructuredData />
    </>
  );
}
