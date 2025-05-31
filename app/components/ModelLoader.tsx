'use client';

import React, { Suspense, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import ErrorBoundary from './ErrorBoundary';
import { useLogging } from '../context/LoggingContext';
import LoadingSpinner from './LoadingSpinner';

/**
 * Textures & materials are placeholders—you can add gold PBR, glowing emission,
 * or engraved normal maps to match the concept art. Let me know if you’d like
 * extra embellishments (beads, filigree, deeper extrusions) or a different
 * file format!
 */

interface ModelLoaderProps {
  modelPath: string;
  fallbackComponent?: React.ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * ModelComponent loads a 3D model using useGLTF from drei
 */
function ModelComponent({
                          modelPath,
                          onLoad,
                        }: {
  modelPath: string;
  onLoad?: () => void;
}) {
  const logging = useLogging();
  const { scene } = useGLTF(modelPath);

  // Call onLoad callback when model is loaded
  React.useEffect(() => {
    logging.info('3D model loaded successfully', { modelPath });
    if (onLoad) onLoad();
  }, [modelPath, onLoad, logging]);

  return <primitive object={scene} />;
}

/**
 * ModelLoader component handles loading 3D models with proper error handling and fallbacks.
 * It uses Suspense for loading states and ErrorBoundary for error handling.
 */
export default function ModelLoader({
                                      modelPath,
                                      fallbackComponent,
                                      onLoad,
                                      onError,
                                    }: ModelLoaderProps): JSX.Element {
  const logging = useLogging();
  const [hasError, setHasError] = useState(false);

  // Default fallback component if none provided
  const defaultFallback = (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
  );

  // Handle errors
  const handleError = (error: Error) => {
    setHasError(true);
    logging.error('Error loading 3D model', { modelPath, error: error.message });
    if (onError) onError(error);
  };

  return (
      <ErrorBoundary
          fallback={fallbackComponent || defaultFallback}
          onError={handleError}
      >
        <Suspense fallback={<LoadingSpinner message="Loading 3D Model..." size="lg" />}>
          {!hasError && <ModelComponent modelPath={modelPath} onLoad={onLoad} />}
        </Suspense>
      </ErrorBoundary>
  );
}

// Preload the model to avoid waterfall loading
useGLTF.preload('/models/sudarshan-chakra.glb');