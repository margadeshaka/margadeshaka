# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev                 # Start development server
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run ESLint
npm run build:static       # Build and export static files

# Note: npm run export is deprecated - use build:static instead
```

## Project Architecture

**ChakraVision** is a Next.js 14 application that creates an interactive 3D spiritual experience centered around the Sudarshan Chakra concept. The project combines modern web technologies with spiritual content to deliver an immersive scroll-based journey.

### Core Technology Stack
- **Next.js 14** with App Router and TypeScript
- **Three.js** via `@react-three/fiber` and `@react-three/drei` for 3D rendering
- **GSAP** for scroll-triggered animations
- **Tailwind CSS** with custom cosmic theme
- **Microsoft Application Insights** for analytics

### Key Architectural Patterns

**Context-Based State Management**: The app uses multiple React contexts for different concerns:
- `ChakraContext` - Manages chakra-specific state and interactions
- `AuthContext` - Handles authentication state 
- `LanguageContext` - Multi-language support
- `LoggingContext` - Application logging

**Scroll-Driven Experience**: The core interaction is scroll-based camera movement through 3D space using GSAP ScrollTrigger, revealing different chakra points with associated content.

**Data Structure**: Chakra points are defined in `app/data/chakraPoints.json` with camera positions, content, and unlock states.

## Component Architecture

**Main Components**:
- `Chakra2DAnimation.tsx` - Core 2D chakra visualization (currently 2D, not 3D as originally planned)
- `ScrollManager.tsx` - Handles scroll-based interactions
- `DialogBox.tsx` - Displays spiritual content at each chakra point
- `CosmicBackground.tsx` - Animated background effects
- `AudioPlayer.tsx` - Om mantra audio integration
- `WelcomeOverlay.tsx` - Entry experience

## Styling System

Uses Tailwind with custom cosmic theme:
```css
colors: {
  cosmic: {
    dark: '#0a0a1a',
    blue: '#1e1e3f', 
    purple: '#483d8b',
    gold: '#ffd700'
  }
}
```

Custom animations: `spin-slow` (20s) and `pulse-slow` (4s) for spiritual ambiance.

## Static Assets

- `/public/audio/` - Om mantra audio file
- `/public/images/` - Chakra PNG assets 
- `/public/textures/` - 3D material textures (if needed)

## Deployment Configuration

- **Vercel**: Configured via `vercel.json`
- **Azure Static Web Apps**: GitHub Actions workflow available
- **Static Export**: Uses `next export` for static hosting

## Important Development Notes

- **No Testing Framework**: Currently no Jest/Vitest setup
- **3D Models**: Webpack configured to handle `.glb` and `.gltf` files
- **Image Optimization**: Disabled for static export compatibility
- **TypeScript**: Strict mode enabled with path aliases (`@/*`)

## Content Management

Chakra points are defined in `app/data/chakraPoints.json` with this structure:
```json
{
  "id": "1",
  "title": "Point Title", 
  "description": "Content with \n line breaks",
  "position": "left|right",
  "cameraPosition": [x, y, z],
  "unlocked": false
}
```

## Environment Variables

Application Insights integration expects:
- Analytics configuration in environment variables (see `Analytics.tsx`)