'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as THREE from 'three';
import chakraPointsData from '../data/chakraPoints.json';
import { useLogging } from './LoggingContext';

// Function to convert description strings to React nodes
const parseDescription = (description: string): React.ReactNode => {
  // Split the description by newline characters and create an array of React elements
  return description.split('\n').map((line, index) => 
    line === '' ? <br key={index} /> : <React.Fragment key={index}>{line}<br /></React.Fragment>
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
  const [activePointId, setActivePointId] = useState<string | null>(null);
  const [unlockedPoints, setUnlockedPoints] = useState<string[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Use chakra points data from JSON file and convert descriptions to React nodes
  const chakraPoints: ChakraPoint[] = chakraPointsData.points.map(point => ({
    ...point,
    description: parseDescription(point.description as string)
  })) as ChakraPoint[];

  // Load unlocked points from localStorage on mount
  useEffect(() => {
    const savedUnlockedPoints = localStorage.getItem('unlockedPoints');
    if (savedUnlockedPoints) {
      try {
        setUnlockedPoints(JSON.parse(savedUnlockedPoints));
        logging.info('Loaded unlocked points from localStorage', { count: JSON.parse(savedUnlockedPoints).length });
      } catch (e) {
        logging.error('Error parsing unlocked points from localStorage', e);
      }
    }
  }, [logging]);

  // Save unlocked points to localStorage when they change
  useEffect(() => {
    localStorage.setItem('unlockedPoints', JSON.stringify(unlockedPoints));
    logging.debug('Saved unlocked points to localStorage', { unlockedPoints });
  }, [unlockedPoints, logging]);

  // Unlock a point
  const unlockPoint = (id: string) => {
    if (!unlockedPoints.includes(id)) {
      setUnlockedPoints([...unlockedPoints, id]);
      logging.info('Unlocked new chakra point', { id });
    }
  };

  // Toggle audio playback
  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
    logging.debug('Toggled audio playback', { isPlaying: !isAudioPlaying });
  };

  return (
    <ChakraContext.Provider value={{ 
      activePointId, 
      setActivePointId, 
      chakraPoints,
      unlockedPoints,
      unlockPoint,
      isAudioPlaying,
      toggleAudio
    }}>
      {children}
    </ChakraContext.Provider>
  );
}
