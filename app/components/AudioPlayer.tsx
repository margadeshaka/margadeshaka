'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useChakra } from '../context/ChakraContext';
import { useLanguage } from '../context/LanguageContext';
import { useLogging } from '../context/LoggingContext';
import ErrorBoundary from './ErrorBoundary';

/**
 * AudioPlayer component handles background mantra audio playback
 * It displays a play/pause button and manages the audio element
 */
export default function AudioPlayer() {
  const { isAudioPlaying, toggleAudio } = useChakra();
  const { t } = useLanguage();
  const logging = useLogging();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle toggle audio with logging
  const handleToggleAudio = useCallback(() => {
    logging.info(`Audio ${isAudioPlaying ? 'paused' : 'played'} by user`);
    toggleAudio();
  }, [isAudioPlaying, toggleAudio, logging]);

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      logging.debug('Creating audio element');
      audioRef.current = new Audio('/audio/om-mantra.mp3');
      audioRef.current.loop = true;
    }

    // Play or pause based on state
    if (isAudioPlaying) {
      logging.debug('Playing audio');
      audioRef.current.play().catch(error => {
        logging.error('Error playing audio', { 
          error: error.message,
          audioSrc: audioRef.current?.src 
        });
      });
    } else if (audioRef.current) {
      logging.debug('Pausing audio');
      audioRef.current.pause();
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        logging.debug('Cleaning up audio element');
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isAudioPlaying, logging]);

  return (
    <ErrorBoundary fallback={
      <button className="fixed bottom-8 right-8 z-10 bg-red-900/70 text-white p-3 rounded-full shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    }>
      <button
        onClick={handleToggleAudio}
        className="fixed bottom-8 right-8 z-10 bg-indigo-900/70 hover:bg-indigo-800/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label={isAudioPlaying ? t('audio.pause', 'Pause Mantra') : t('audio.play', 'Play Mantra')}
      >
        {isAudioPlaying ? (
          // Pause icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          // Play icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </ErrorBoundary>
  );
}
