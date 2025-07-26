# ChakraVision Standard Color Palette

## Primary Cosmic Colors

### Core Theme Colors
- **Cosmic Dark**: `#0a0a1a` - Primary dark background
- **Cosmic Blue**: `#1e1e3f` - Secondary background and accents
- **Cosmic Purple**: `#483d8b` - Tertiary accent color (DarkSlateBlue)
- **Cosmic Gold**: `#ffd700` - Primary accent and highlight color
- **Pure Black**: `#000000` - Deep backgrounds and overlays

## Background Gradients

### Primary Background
- **Cosmic Gradient**: `linear-gradient(to bottom, #000000, #0a0a1a, #1e1e3f)`
- **Canvas Background**: `linear-gradient(to bottom, #000000, #191932)`
- **Tailwind Gradient**: `from-black to-indigo-950`

## Text Colors

### Primary Text
- **Foreground**: `rgb(255, 255, 255)` - Primary white text
- **Gray Text**: Tailwind `text-gray-400` - Secondary text
- **Error Text**: Tailwind `text-red-400` - Error states

## Interactive Elements

### Glows and Effects
- **Blue Glow**: `rgba(100, 100, 255, 0.3)` - Subtle glow
- **Bright Blue Glow**: `rgba(120, 120, 255, 0.5)` - Prominent glow
- **Indigo Glow**: `rgba(99, 102, 241, 0.6)` - Interactive element glow

### Overlays and Dialogs
- **Dialog Background**: `rgba(30, 30, 60, 0.7)` - Semi-transparent blue
- **Glass Overlay**: `bg-black/80` - Semi-transparent black
- **Border**: `rgba(255, 255, 255, 0.2)` - Subtle white borders

## Celestial Elements

### Stars
- **White Stars**: `rgba(255, 255, 255, 0.8)`
- **Light Blue Stars**: `rgba(173, 216, 230, 0.8)`
- **Peach Stars**: `rgba(255, 223, 186, 0.8)`
- **Blue-White Stars**: `rgba(186, 218, 255, 0.8)`

### Nebula Effects
- **Indigo Nebula**: `rgba(75, 0, 130, 0.15)` to `rgba(75, 0, 130, 0)`
- **BlueViolet Nebula**: `rgba(138, 43, 226, 0.1)` to `rgba(138, 43, 226, 0)`

## CSS Variables

### Global Custom Properties
```css
--foreground-rgb: 255, 255, 255;
--background-start-rgb: 0, 0, 0;
--background-end-rgb: 25, 25, 50;
```

## Usage Guidelines

### Primary Use Cases
- Use **Cosmic Dark** (`#0a0a1a`) for main backgrounds
- Use **Cosmic Gold** (`#ffd700`) for important highlights and CTAs
- Use **Cosmic Blue** (`#1e1e3f`) for secondary backgrounds and cards
- Use **Cosmic Purple** (`#483d8b`) for accent elements

### Glass Morphism
- Combine semi-transparent backgrounds with subtle white borders
- Use backdrop blur effects with `rgba()` colors for depth

### Accessibility
- Maintain high contrast ratios with white text on dark backgrounds
- Use gold color sparingly to maintain its impact as an accent
- Ensure interactive elements have sufficient glow/hover states

## Browser Integration
- **Theme Color**: `#000000` (black) for browser chrome
- **Tile Color**: `#000000` (black) for Windows tiles