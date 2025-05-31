'use client';

import { Suspense } from 'react';
import ChakraScene from './components/ChakraScene';
import ScrollManager from './components/ScrollManager';
import CosmicBackground from './components/CosmicBackground';
import AudioPlayer from './components/AudioPlayer';
import LanguageSelector from './components/LanguageSelector';
import LoginButton from './components/LoginButton';
import WelcomeOverlay from './components/WelcomeOverlay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { ChakraProvider } from './context/ChakraContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { LoggingProvider, LogLevel } from './context/LoggingContext';

export default function Home() {
  return (
    <ErrorBoundary>
      <LoggingProvider minLevel={LogLevel.INFO} enableConsole={true}>
        <LanguageProvider>
          <AuthProvider>
            <ChakraProvider>
              <main className="relative w-full h-screen overflow-y-auto">
                {/* Cosmic Background with subtle animation */}
                <CosmicBackground />

                {/* 3D Canvas Container */}
                <div className="fixed inset-0 pointer-events-none">
                  <ErrorBoundary
                    fallback={
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center p-4 bg-red-900/50 rounded-lg max-w-md">
                          <h2 className="text-xl cosmic-text mb-2">3D Scene Error</h2>
                          <p className="text-white/80 mb-4">
                            We encountered an issue loading the 3D scene. Please try refreshing the page.
                          </p>
                          <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white pointer-events-auto"
                          >
                            Refresh
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <Suspense fallback={<LoadingSpinner message="Loading 3D Scene..." size="lg" />}>
                      <ChakraScene />
                    </Suspense>
                  </ErrorBoundary>
                </div>

                {/* Scroll Manager */}
                <ScrollManager />

                {/* Welcome Overlay */}
                <WelcomeOverlay />

                {/* UI Controls Container - Responsive positioning */}
                <div className="fixed bottom-4 sm:top-4 sm:bottom-auto right-4 flex flex-row sm:flex-col gap-2 z-20">
                  <LoginButton />
                  <LanguageSelector />
                  <AudioPlayer />
                </div>

                {/* Mobile scroll indicator - only visible on small screens */}
                <div className="sm:hidden fixed bottom-16 left-1/2 -translate-x-1/2 text-center animate-bounce text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span className="text-xs">Scroll to explore</span>
                </div>
              </main>
            </ChakraProvider>
          </AuthProvider>
        </LanguageProvider>
      </LoggingProvider>
    </ErrorBoundary>
  );
}
