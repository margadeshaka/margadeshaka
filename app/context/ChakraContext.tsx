'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import chakraPointsData from '../data/chakraPoints.json';
import { useLogging } from './LoggingContext';

// Helper function to parse line and make URLs clickable
const parseLineWithLinks = (line: string, lineIndex: number): React.ReactNode => {
  // Pattern to match URLs like sakha.app, learnflow.ai, etc.
  const urlPattern = /\b((?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?:\/[^\s]*)?)\b/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = urlPattern.exec(line)) !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }

    // Add the URL as a clickable link
    const url = match[1];
    const href = url.startsWith('http') ? url : `https://${url}`;
    parts.push(
      <a
        key={`link-${lineIndex}-${match.index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="content-link"
      >
        {url}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  return parts.length > 0 ? parts : line;
};

// Optimized function to convert description strings to React nodes with clickable links
const parseDescription = (description: string): React.ReactNode => {
  const lines = description.split('\n');
  return lines.map((line, index) =>
    line === '' ? (
      <br key={`br-${index}`} />
    ) : (
      <React.Fragment key={`text-${index}`}>
        {parseLineWithLinks(line, index)}
        <br />
      </React.Fragment>
    )
  );
};

// Define the types for our chakra points
export interface ChakraPoint {
  id: string;
  title: string;
  description: React.ReactNode;
  position: 'left' | 'right';
  cameraPosition: [number, number, number]; // x, y, z coordinates for the camera
  unlocked: boolean;
}

// Define the context type
interface ChakraContextType {
  activePointId: string | null;
  setActivePointId: (id: string | null) => void;
  chakraPoints: ChakraPoint[];
  unlockedPoints: string[];
  unlockPoint: (id: string) => void;
  isAudioPlaying: boolean;
  toggleAudio: () => void;
}

// Create the context with a default value
const ChakraContext = createContext<ChakraContextType>({
  activePointId: null,
  setActivePointId: () => {},
  chakraPoints: [],
  unlockedPoints: [],
  unlockPoint: () => {},
  isAudioPlaying: false,
  toggleAudio: () => {},
});

// Custom hook to use the context
export const useChakra = () => useContext(ChakraContext);

// Provider component
export function ChakraProvider({ children }: { children: ReactNode }) {
  const logging = useLogging();
  // Initialize with first chakra point
  const [activePointId, setActivePointId] = useState<string | null>(() => 
    chakraPointsData.points.length > 0 ? chakraPointsData.points[0].id : null
  );
  const [unlockedPoints, setUnlockedPoints] = useState<string[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Memoize chakra points to prevent unnecessary re-parsing
  const chakraPoints: ChakraPoint[] = useMemo(() => 
    chakraPointsData.points.map(point => ({
      ...point,
      description: parseDescription(point.description as string)
    })) as ChakraPoint[],
    []
  );

  // Optimized localStorage loading with error handling
  useEffect(() => {
    try {
      const savedUnlockedPoints = localStorage.getItem('unlockedPoints');
      if (savedUnlockedPoints) {
        const parsed = JSON.parse(savedUnlockedPoints);
        setUnlockedPoints(Array.isArray(parsed) ? parsed : []);
        logging.info('Loaded unlocked points from localStorage', { count: parsed.length });
      }
    } catch (e) {
      logging.error('Error parsing unlocked points from localStorage', e);
      // Clear corrupted data
      localStorage.removeItem('unlockedPoints');
    }
  }, [logging]);

  // Debounced localStorage saving for better performance
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem('unlockedPoints', JSON.stringify(unlockedPoints));
        logging.debug('Saved unlocked points to localStorage', { count: unlockedPoints.length });
      } catch (e) {
        logging.error('Error saving unlocked points to localStorage', e);
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [unlockedPoints, logging]);

  // Memoized functions for better performance
  const unlockPoint = useCallback((id: string) => {
    if (!unlockedPoints.includes(id)) {
      setUnlockedPoints(prev => [...prev, id]);
      logging.info('Unlocked new chakra point', { id });
    }
  }, [unlockedPoints, logging]);

  const toggleAudio = useCallback(() => {
    setIsAudioPlaying(prev => {
      const newState = !prev;
      logging.debug('Toggled audio playback', { isPlaying: newState });
      return newState;
    });
  }, [logging]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    activePointId,
    setActivePointId,
    chakraPoints,
    unlockedPoints,
    unlockPoint,
    isAudioPlaying,
    toggleAudio
  }), [activePointId, chakraPoints, unlockedPoints, unlockPoint, isAudioPlaying, toggleAudio]);

  return (
    <ChakraContext.Provider value={contextValue}>
      {children}
    </ChakraContext.Provider>
  );
}
