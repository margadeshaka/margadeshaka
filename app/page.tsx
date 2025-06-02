'use client';

import ScrollManager from './components/ScrollManager';
import CosmicBackground from './components/CosmicBackground';
import AudioPlayer from './components/AudioPlayer';
import WelcomeOverlay from './components/WelcomeOverlay';
import ErrorBoundary from './components/ErrorBoundary';
import Chakra2DAnimation from './components/Chakra2DAnimation';
import ScrollIndicator from './components/ScrollIndicator';
import { ChakraProvider } from './context/ChakraContext';
import { LoggingProvider, LogLevel } from './context/LoggingContext';

export default function Home() {
  return (
    <ErrorBoundary>
      <LoggingProvider minLevel={LogLevel.INFO} enableConsole={true}>
        <ChakraProvider>
          <main className="relative w-full h-screen overflow-y-auto">
            {/* Cosmic Background with subtle animation */}
            <CosmicBackground />

            {/* 2D Chakra Animation */}
            <Chakra2DAnimation className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full" />

            {/* Scroll Manager */}
            <ScrollManager />

            {/* Welcome Overlay */}
            <WelcomeOverlay />

            {/* UI Controls Container - Responsive positioning */}
            <div className="fixed bottom-4 sm:top-4 sm:bottom-auto right-4 flex flex-row sm:flex-col gap-2 z-20">
              <AudioPlayer />
            </div>

            {/* Scroll indicator - shows when there's more content to scroll */}
            <ScrollIndicator />
          </main>
        </ChakraProvider>
      </LoggingProvider>
    </ErrorBoundary>
  );
}
