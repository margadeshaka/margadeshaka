'use client';

import React, { createContext, useContext, ReactNode, useCallback } from 'react';

// Define log levels
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

// Define log entry structure
interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  data?: any;
}

// Define the context type
interface LoggingContextType {
  debug: (message: string, data?: any) => void;
  info: (message: string, data?: any) => void;
  warn: (message: string, data?: any) => void;
  error: (message: string, data?: any) => void;
  log: (level: LogLevel, message: string, data?: any) => void;
}

// Create the context with default values
const LoggingContext = createContext<LoggingContextType>({
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
  log: () => {},
});

// Custom hook to use the context
export const useLogging = () => useContext(LoggingContext);

// Provider component
export function LoggingProvider({ 
  children,
  minLevel = LogLevel.DEBUG,
  enableConsole = true,
  enableRemote = false,
  remoteUrl = ''
}: { 
  children: ReactNode;
  minLevel?: LogLevel;
  enableConsole?: boolean;
  enableRemote?: boolean;
  remoteUrl?: string;
}) {
  // Log levels priority
  const logLevelPriority: Record<LogLevel, number> = {
    [LogLevel.DEBUG]: 0,
    [LogLevel.INFO]: 1,
    [LogLevel.WARN]: 2,
    [LogLevel.ERROR]: 3
  };

  // Main logging function
  const log = useCallback((level: LogLevel, message: string, data?: any) => {
    // Check if we should log this level
    if (logLevelPriority[level] < logLevelPriority[minLevel]) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      data
    };

    // Console logging
    if (enableConsole) {
      const consoleMethod = {
        [LogLevel.DEBUG]: console.debug,
        [LogLevel.INFO]: console.info,
        [LogLevel.WARN]: console.warn,
        [LogLevel.ERROR]: console.error
      }[level];

      consoleMethod(`[${entry.timestamp.toISOString()}] [${level}] ${message}`, data || '');
    }

    // Remote logging (e.g., to a server)
    if (enableRemote && remoteUrl) {
      try {
        fetch(remoteUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(entry)
        }).catch(err => {
          console.error('Failed to send log to remote server', err);
        });
      } catch (error) {
        console.error('Error sending log to remote server', error);
      }
    }

    return entry;
  }, [minLevel, enableConsole, enableRemote, remoteUrl]);

  // Convenience methods for different log levels
  const debug = useCallback((message: string, data?: any) => log(LogLevel.DEBUG, message, data), [log]);
  const info = useCallback((message: string, data?: any) => log(LogLevel.INFO, message, data), [log]);
  const warn = useCallback((message: string, data?: any) => log(LogLevel.WARN, message, data), [log]);
  const error = useCallback((message: string, data?: any) => log(LogLevel.ERROR, message, data), [log]);

  return (
    <LoggingContext.Provider value={{ debug, info, warn, error, log }}>
      {children}
    </LoggingContext.Provider>
  );
}