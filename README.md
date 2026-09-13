# Bunyala Agri-Climate Industrial Park Limited Website

A modern, professional, multilingual website for Bunyala Agri-Climate Industrial Park Limited, built with React, Vite, and Tailwind CSS.

## 🌟 Features

- **React + Vite + Tailwind CSS** — Fast, modern build system
- **Multilingual** — English, Luhya, Swahili support
- **Dark Mode** — Toggle between light and dark themes
- **Responsive** — Mobile-first, works on all devices
- **SEO Optimized** — Meta tags, OG tags, structured data, sitemap
- **WCAG 2.1 AA** — Accessible to all users
- **Animated Counters** — Impact statistics with scroll animations
- **WhatsApp Integration** — Floating chat button
- **Newsletter Signup** — Mailchimp-ready form
- **CMS Ready** — Sanity CMS integration for News section

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to the website directory
cd "Bunyala Agriclimate/website"

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## 📁 Project Structure

```
website/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Header, Footer, etc.
│   │   ├── ui/          # Hero, Cards, Forms, etc.
│   │   └── sections/    # Page sections
│   ├── pages/           # Page components
│   ├── i18n/            # Translations (EN, Luhya, Swahili)
│   ├── hooks/           # Custom React hooks
│   ├── data/            # Static data files
│   └── lib/             # Utilities (Sanity client, etc.)
├── sanity/              # Sanity CMS schemas
├── public/              # Static assets (favicon, robots.txt, sitemap)
└── dist/                # Production build
```

## 🌐 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, solutions preview, video, CTA |
| About | `/about` | Company info, BACIS, Vision/Mission, SDGs |
| Partners | `/about/partners` | Partnership categories, existing partners |
| Solutions | `/solutions` | Card grid of all solutions |
| Solution Detail | `/solutions/:slug` | Individual solution pages (6 total) |
| Impact | `/impact` | Stats, circular impact model, business model |
| Team | `/team` | Founder profile, team capabilities |
| News | `/news` | CMS-driven news articles |
| Contact | `/contact` | Contact info, social links, newsletter |

## 🎨 Customization

### Colors

Edit `src/index.css` to change the color palette:

```css
@theme {
  --color-primary: #1E6B3C;      /* Primary green */
  --color-primary-dark: #14472A; /* Dark green */
  --color-accent: #B8862B;       /* Gold/bronze accent */
  --color-neutral: #F7F7F5;      /* Background */
}
```

### Content

- **Translations:** Edit files in `src/i18n/`
- **Solutions:** Edit `src/data/solutions.js`
- **Team:** Edit `src/data/team.js`
- **Impact Stats:** Edit `src/data/impact-stats.js`
- **SDGs:** Edit `src/data/sdgs.js`

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:
- `VITE_SANITY_PROJECT_ID` — Sanity project ID
- `VITE_SANITY_DATASET` — Sanity dataset name
- `VITE_MAILCHIMP_API_KEY` — Mailchimp API key
- `VITE_GA_MEASUREMENT_ID` — Google Analytics ID

## 📰 Sanity CMS Setup

1. Create a Sanity account at https://sanity.io
2. Initialize Sanity in the project:
   ```bash
   npx sanity@latest init
   ```
3. Use the schemas in `sanity/schemas/`
4. Add your project ID to `.env`
5. Start Sanity Studio:
   ```bash
   npx sanity@latest dev
   ```

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings > Pages
3. Select "GitHub Actions" as source
4. The site will auto-deploy on push to main

### Vercel/Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables

## 📱 Social Links

- Facebook: [BunyalaAgriClimatePark](https://facebook.com/profile.php?id=61563433792168)
- LinkedIn: [BunyalaAgriAction](https://linkedin.com/in/bunyala-agri-climate-action-impact-industrial-park-company-limited-4b4278272)
- WhatsApp: [+254 720 060 431](https://wa.me/254720060431)

## 📞 Contact

- **Email:** bunyalaagrclimate@gmail.com
- **Phone:** 0720 060 431 / 0721 137 003
- **Location:** Busia County, Western Kenya

## 📄 License

© 2026 Bunyala Agri-Climate Industrial Park Limited. All rights reserved.
