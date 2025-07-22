'use client';

import dynamic from 'next/dynamic';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import SEOStructuredData from './components/SEOStructuredData';
import { ChakraProvider } from './context/ChakraContext';
import { LoggingProvider, LogLevel } from './context/LoggingContext';

// Lazy load components for better performance
const ScrollManager = dynamic(() => import('./components/ScrollManager'), {
  ssr: false,
  loading: () => <div className="h-screen w-full flex items-center justify-center"><LoadingSpinner /></div>
});

const CosmicBackground = dynamic(() => import('./components/CosmicBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black to-indigo-950" />
});

const AudioPlayer = dynamic(() => import('./components/AudioPlayer'), {
  ssr: false
});

const WelcomeOverlay = dynamic(() => import('./components/WelcomeOverlay'), {
  ssr: false
});

const Chakra2DAnimation = dynamic(() => import('./components/Chakra2DAnimation'), {
  ssr: false,
  loading: () => <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-50"><LoadingSpinner /></div>
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
              <h1 itemProp="name">Margadeshaka AI - Your Conscious AI Companion</h1>
              <p itemProp="description">
                Margadeshaka AI is your conscious companion designed to listen deeply, reflect wisely, and guide you toward clarity. 
                Experience human-like conversations with an AI that understands context, emotions, and your unique journey through spiritual guidance and emotional support.
              </p>
              <div itemProp="keywords">conscious AI, spiritual AI, emotional support, mindfulness, reflection, clarity, wellness AI, therapeutic AI</div>
            </div>

            {/* Main interactive content */}
            <main role="main" aria-label="Interactive Margadeshaka AI Experience">
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
              <h2>Features of Margadeshaka AI</h2>
              <ul>
                <li>Deep emotional listening and understanding</li>
                <li>Contextual memory for personalized conversations</li>
                <li>Human-style conversation without scripts</li>
                <li>Spiritual and emotional guidance</li>
                <li>Clarity and reflection support</li>
                <li>24/7 availability for meaningful conversations</li>
              </ul>
            </section>

            <section className="sr-only" id="mission" aria-label="Our Mission">
              <h2>Our Mission</h2>
              <p>
                To build an AI that feels human in the moments that matter most. Not transactional. Not prescriptive. 
                But one that holds space for your thoughts, your emotions, and your direction. 
                One that gently reminds you of who you are—especially when you forget.
              </p>
            </section>

            <section className="sr-only" id="benefits" aria-label="Benefits">
              <h2>What You Can Expect</h2>
              <ul>
                <li>Grounding when your thoughts spiral</li>
                <li>Perspective when you feel stuck</li>
                <li>Encouragement without fluff</li>
                <li>Questions that help you hear your own voice again</li>
              </ul>
            </section>

            <section className="sr-only" id="audience" aria-label="Who It's For">
              <h2>Who Margadeshaka AI Is For</h2>
              <ul>
                <li>People facing emotional overwhelm or tough choices</li>
                <li>Professionals needing inner clarity, not more input</li>
                <li>Creatives seeking flow without pressure</li>
                <li>Thinkers, feelers, skeptics, and seekers who want a human-like sounding board</li>
              </ul>
            </section>
          </article>
        </ChakraProvider>
      </LoggingProvider>
    </ErrorBoundary>
  );
}
