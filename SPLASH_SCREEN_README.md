# AATRAL Splash Screen

A premium, animated splash screen component for the AATRAL Energy Dashboard with full theme support.

## Features

✨ **Premium Animations**
- Animated gradient logo with pulsing effect
- Orbiting icons around the main logo
- Floating background circles
- Letter-by-letter brand name animation
- Shimmer progress bar
- Smooth fade transitions

🎨 **Theme Support**
- Automatically adapts to light/dark theme
- Uses AATRAL brand colors (blue/gold palette)
- Consistent with dashboard design system

📱 **Responsive Design**
- Optimized for all screen sizes
- Mobile-friendly animations
- Adaptive icon sizes

## Components

### 1. SplashScreen
The main splash screen component with all animations.

**Props:**
- `onComplete?: () => void` - Callback when splash animation completes
- `duration?: number` - Duration in milliseconds (default: 3000)

**Usage:**
```tsx
import SplashScreen from '@/components/SplashScreen';

<SplashScreen 
  onComplete={() => console.log('Splash complete!')} 
  duration={3000} 
/>
```

### 2. AppWrapper
A wrapper component that shows the splash screen once per session.

**Props:**
- `children: React.ReactNode` - Your app content
- `showSplash?: boolean` - Whether to show splash (default: true)
- `splashDuration?: number` - Duration in milliseconds (default: 3000)

**Usage:**
```tsx
import AppWrapper from '@/components/AppWrapper';

<AppWrapper showSplash={true} splashDuration={3000}>
  <YourApp />
</AppWrapper>
```

## Integration Examples

### Option 1: Demo Page (Current)
Visit `/splash-demo` to see the splash screen with a replay button.

### Option 2: Add to Root Layout
Show splash screen on every app load:

```tsx
// src/app/layout.tsx
import AppWrapper from '@/components/AppWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AppWrapper showSplash={true} splashDuration={3000}>
            {children}
          </AppWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Option 3: Add to Specific Page
Show splash screen on a specific page only:

```tsx
'use client';
import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <SplashScreen 
          onComplete={() => setShowSplash(false)} 
          duration={3000} 
        />
      )}
      <YourPageContent />
    </>
  );
}
```

## Customization

### Adjust Duration
Change how long the splash screen displays:
```tsx
<SplashScreen duration={2000} /> // 2 seconds
<SplashScreen duration={5000} /> // 5 seconds
```

### Modify Colors
Edit `SplashScreen.module.css` to customize colors:
- Logo gradient: `.logoCircle` background
- Brand letters: `.brandLetter` gradient
- Progress bar: `.progressFill` gradient
- Orbiting icons: `.orbitIcon` background

### Change Animations
Adjust animation speeds in `SplashScreen.module.css`:
- Logo pulse: `@keyframes pulse` (currently 2s)
- Logo rotation: `@keyframes rotate` (currently 20s)
- Orbiting icons: `@keyframes orbit` (currently 4s)
- Letter pop: `@keyframes letterPop` (currently 0.6s)

## Animation Details

1. **Logo Animation**: Pulsing glow effect with continuous rotation
2. **Orbiting Icons**: Two icons (TrendingUp, BarChart3) orbit around the logo
3. **Brand Name**: Each letter animates in sequence with gradient shift
4. **Progress Bar**: Fills from 0-100% with shimmer effect
5. **Background**: Three floating circles with gradient colors
6. **Grid**: Animated decorative grid pattern

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance

- Uses CSS animations for optimal performance
- No heavy JavaScript calculations
- GPU-accelerated transforms
- Minimal re-renders

## Files

- `src/components/SplashScreen.tsx` - Main component
- `src/components/SplashScreen.module.css` - Styles and animations
- `src/components/AppWrapper.tsx` - Session-based wrapper
- `src/app/splash-demo/page.tsx` - Demo page

## Demo

Visit `http://localhost:3000/splash-demo` to see the splash screen in action!
