import Navbar from './components/Navbar';
import CosmicLayer from './components/CosmicLayer';
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
      <CosmicLayer />
      <Navbar />

      <main id="main-content" className="relative z-[1]">
        <HeroBanner />
        <ProductsSection />
        <AboutSection />
        <FounderSection />
        <ContactSection />
      </main>

      <SiteFooter />
      <SEOStructuredData />
    </>
  );
}
