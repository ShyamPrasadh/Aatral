# AATRAL Energy Dashboard

A sleek, modern energy monitoring dashboard built with Next.js and Chart.js, designed specifically for UAE/Arab countries.

## 🌟 Features

- **Expandable Sidebar**: Smooth, animated sidebar that expands/collapses on click
- **Interactive Gauges**: Chart.js-powered gauge charts with dynamic color coding
- **Forecast Analytics**: Line charts comparing actual vs forecast energy consumption
- **Real-time Filtering**: Filter by buildings, meters, and sub-meters
- **Premium UAE Design**: Gold accents, dark theme, and glassmorphism effects
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## 🎨 Design Features

- **Color Palette**: UAE-inspired with deep blues, gold accents, and emerald highlights
- **Animations**: Smooth transitions and micro-animations throughout
- **Glassmorphism**: Modern frosted glass effects on key components
- **Dark Theme**: Professional dark theme optimized for energy dashboards
- **Custom Scrollbars**: Styled scrollbars matching the overall design

## 📁 Project Structure

```
AATRAL/
├── public/
│   └── assets/
│       ├── images/     # Place your PNG, JPEG images here
│       └── icons/      # Place your SVG icons here
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Sidebar.module.css
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   ├── GaugeChart.tsx
│   │   ├── GaugeChart.module.css
│   │   ├── ForecastChart.tsx
│   │   ├── ForecastChart.module.css
│   │   ├── FilterDropdown.tsx
│   │   └── FilterDropdown.module.css
│   └── styles/
│       └── globals.css
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📦 Assets Folder

The `public/assets` folder is organized as follows:

- **`public/assets/images/`**: Store all PNG and JPEG images here
- **`public/assets/icons/`**: Store all SVG icons here

To use assets in your components:

```tsx
// For images
<img src="/assets/images/your-image.png" alt="Description" />

// For icons (if using as img)
<img src="/assets/icons/your-icon.svg" alt="Icon" />
```

## 🎯 Key Components

### Sidebar
- Expandable/collapsible with smooth animations
- Active state indicators
- Icon-based navigation
- Responsive design

### GaugeChart
- Semi-circular gauge using Chart.js
- Dynamic color coding (green/yellow/red)
- Displays current value and meter ID
- Hover effects

### ForecastChart
- Line chart with actual vs forecast data
- Gradient fills
- Interactive tooltips
- Responsive legend

### FilterDropdown
- Custom-styled select dropdowns
- Icon support
- Smooth transitions
- Accessible design

## 🎨 Customization

### Colors
Edit the CSS variables in `src/styles/globals.css`:

```css
:root {
  --color-primary: #1a4d7a;
  --color-accent-gold: #d4af37;
  --color-bg-primary: #0a1628;
  /* ... more variables */
}
```

### Sidebar Width
Adjust in `src/styles/globals.css`:

```css
:root {
  --sidebar-width-collapsed: 80px;
  --sidebar-width-expanded: 240px;
}
```

## 📊 Chart Configuration

Both gauge and forecast charts are built with Chart.js. Customize them in:
- `src/components/GaugeChart.tsx`
- `src/components/ForecastChart.tsx`

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is proprietary and confidential.

## 🤝 Support

For support, please contact the AATRAL Engineering team.
