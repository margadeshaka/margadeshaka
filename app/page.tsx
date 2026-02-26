'use client';

import dynamic from 'next/dynamic';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { ChakraSkeleton, DialogSkeleton } from './components/Skeleton';
import SEOStructuredData from './components/SEOStructuredData';
import { ChakraProvider } from './context/ChakraContext';
import { LoggingProvider, LogLevel } from './context/LoggingContext';

// Lazy load components for better performance with skeleton loaders
const ScrollManager = dynamic(() => import('./components/ScrollManager'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 w-full h-screen flex items-center justify-center">
      <DialogSkeleton position="right" />
    </div>
  )
});

const CosmicBackground = dynamic(() => import('./components/CosmicBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-black" />
});

const AudioPlayer = dynamic(() => import('./components/AudioPlayer'), {
  ssr: false
});

const WelcomeOverlay = dynamic(() => import('./components/WelcomeOverlay'), {
  ssr: false
});

const Chakra2DAnimation = dynamic(() => import('./components/Chakra2DAnimation'), {
  ssr: false,
  loading: () => <ChakraSkeleton />
});

const ScrollIndicator = dynamic(() => import('./components/ScrollIndicator'), {
  ssr: false
});

export default function Home() {
  return (
    <ErrorBoundary>
      <LoggingProvider minLevel={LogLevel.INFO} enableConsole={true}>
        <ChakraProvider>
          {/* SEO-optimized semantic HTML structure */}
          <article className="relative w-full h-screen overflow-hidden" style={{ contain: 'layout style paint' }} itemScope itemType="https://schema.org/WebApplication">
            {/* Hidden SEO content for screen readers and search engines */}
            <div className="sr-only">
              <h1 itemProp="name">Margadeshaka — AI for Guidance & Learning</h1>
              <p itemProp="description">
                Margadeshaka builds AI products that help you navigate life and master new skills.
                Home of Sakha, an AI-powered Vedic astrology companion, and Dronacharya, an interactive AI learning platform that teaches through thinking, not watching.
              </p>
              <div itemProp="keywords">Sakha, Dronacharya, AI astrology, Vedic astrology AI, AI tutoring, AI learning platform, personalized learning, birth chart AI, AI guidance</div>
            </div>

            {/* Main interactive content */}
            <main id="main-content" role="main" aria-label="Interactive Margadeshaka AI Experience">
              {/* Cosmic Background with subtle animation */}
              <CosmicBackground />

              {/* 2D Chakra Animation */}
              <Chakra2DAnimation 
                className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full" 
                aria-label="Interactive Chakra Animation representing spiritual journey"
              />

              {/* Scroll Manager - Contains the main content sections */}
              <ScrollManager />

              {/* Welcome Overlay */}
              <WelcomeOverlay />

              {/* UI Controls Container - Responsive positioning */}
              <aside className="fixed bottom-4 sm:top-4 sm:bottom-auto right-4 flex flex-row sm:flex-col gap-2 z-20" role="complementary" aria-label="Audio controls">
                <AudioPlayer />
              </aside>

              {/* Scroll indicator - shows when there's more content to scroll */}
              <ScrollIndicator />
            </main>

            {/* SEO Structured Data */}
            <SEOStructuredData />

            {/* Hidden content sections for SEO with semantic structure */}
            <section className="sr-only" id="features" aria-label="Features">
              <h2>Our Products</h2>
              <ul>
                <li>Sakha — AI-powered Vedic astrology companion with birth chart analysis and emotional coaching</li>
                <li>Dronacharya — Interactive AI tutoring platform that teaches through thinking, not watching</li>
                <li>Personalized guidance through Vedic birth charts and Dasha predictions</li>
                <li>Relationship compatibility analysis using Ashtakoot Guna matching</li>
                <li>Adaptive AI tutoring with Bronze, Silver, and Gold certifications</li>
                <li>Available on Web, iOS, and Android</li>
              </ul>
            </section>

            <section className="sr-only" id="mission" aria-label="Our Mission">
              <h2>Our Mission</h2>
              <p>
                To create AI that guides and educates with depth and care. Not scripted Q&A tools,
                but thoughtful companions that help you make better decisions and build real expertise.
                We believe AI should amplify human potential, not replace human connection.
              </p>
            </section>

            <section className="sr-only" id="benefits" aria-label="Benefits">
              <h2>What You Can Expect</h2>
              <ul>
                <li>Vedic wisdom combined with advanced AI for personalized life guidance</li>
                <li>Interactive learning that adapts to your understanding and pace</li>
                <li>Real project-based portfolios through AI-guided tutoring</li>
                <li>Privacy-first design across all products</li>
              </ul>
            </section>

            <section className="sr-only" id="audience" aria-label="Who It's For">
              <h2>Who Margadeshaka Is For</h2>
              <ul>
                <li>Anyone seeking clarity in life decisions through Vedic astrology and AI guidance</li>
                <li>Learners who want to build real skills through active thinking, not passive watching</li>
                <li>Professionals looking for personalized career and relationship insights</li>
                <li>Organizations seeking AI-powered team learning and development</li>
              </ul>
            </section>
          </article>
        </ChakraProvider>
      </LoggingProvider>
    </ErrorBoundary>
  );
}
