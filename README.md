# Date Tracker

A Progressive Web App (PWA) to track time elapsed since important moments in your life. Built with Vite, React, and TypeScript.

🔗 **Live Demo**: [https://rohilsurana.github.io/dates/](https://rohilsurana.github.io/dates/)

## Features

- Track multiple dates with custom labels and tags
- Real-time countdown/countup for past and future dates
- Calendar picker with year/month dropdowns (1900-2100)
- Celebration icons for birthdays and anniversaries
- Filter by tags (birthday, anniversary, work, personal, other)
- Dark mode with OKLCH color system
- PWA support - install on mobile and desktop
- Responsive design

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Date Utilities**: date-fns
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5174/dates/](http://localhost:5174/dates/) in your browser.

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment

The app automatically deploys to GitHub Pages via GitHub Actions on every push to the `main` branch.

The workflow:
1. Builds the app with Vite
2. Uploads the `dist` folder as a GitHub Pages artifact
3. Deploys to GitHub Pages

## PWA Installation

The app can be installed as a PWA on mobile and desktop devices:

1. Visit the live demo
2. Look for the "Install" prompt in your browser
3. Click "Install" to add to your home screen

## Project Structure

```
src/
├── components/
│   ├── ui/           # Radix UI component wrappers
│   ├── date-card.tsx # Individual date entry card
│   ├── date-form.tsx # Date picker form
│   └── filter-bar.tsx # Tag filter
├── lib/
│   ├── calculations.ts # Time elapsed calculations
│   └── utils.ts        # Utility functions
├── App.tsx
└── index.css         # Global styles with OKLCH colors

public/
├── icon.svg          # Favicon
├── icon-with-bg.svg  # PWA icon
└── .nojekyll         # GitHub Pages config
```

## License

MIT
