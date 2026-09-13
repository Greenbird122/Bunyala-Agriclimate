# Bunyala Agri-Climate Industrial Park Limited — Website Specification

## Document Overview

**Project:** Bunyala Agri-Climate Industrial Park Limited Website  
**Prepared by:** AI Agent (Buffy/Codebuff)  
**Date:** September 1, 2026  
**Source Material:** `Bunyala_Website_Content_Brief.docx` (content brief) + `Bunyala Agriclimate/images/` (24 supplied images)

---

## 1. Project Summary

Build a modern, professional, multilingual website for **Bunyala Agri-Climate Industrial Park Limited**, a Kenyan social enterprise pioneering Blue Circular Economy and ClimateTech solutions in the Lake Victoria Basin. The site replaces the placeholder at `rickyokumu.github.io/bu/` and represents the company's brand, solutions, impact, and community initiatives.

---

## 2. Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React (Vite) |
| **Styling** | Tailwind CSS |
| **CMS** | Sanity (headless CMS for News/Stories section) |
| **Email/Newsletter** | Mailchimp (newsletter signup integration) |
| **Analytics** | Google Analytics |
| **Deployment** | GitHub (static deployment via GitHub Pages or similar) |
| **Domain** | `bunyala-agriclimate.org` (typo confirmed — original brief said `bunyalaagrinduclimate.org` but client confirmed it's likely a spelling error) |

---

## 3. Design & Brand

### 3.1 Design Style
**Corporate / Professional** — content-heavy sections with text + images side by side, professional feel.

### 3.2 Typography
- **Primary font:** Times New Roman (serif)
- This is the client's explicit preference — use it for headings and body text

### 3.3 Colour Palette (from brief, to be confirmed)
| Colour | Usage | Approximate Hex |
|--------|-------|-----------------|
| Primary Green | Headings, nav, CTAs | `#1E6B3C` |
| Dark Green | Footer, contrast text | `#14472A` |
| Gold/Bronze | Dividers, highlights | `#B8862B` |
| Neutral Background | Page background | `#F7F7F5` (light grey/white) |

### 3.4 Logo
- Primary logo mark: fish/eye motif with leaf, green on white
- Use compressed raster copy provided; request vector (.ai/.eps/.svg) from client for production

### 3.5 Dark Mode
- **Yes, dark mode toggle** — user can switch between light and dark themes
- Must maintain readability and brand consistency in both modes

---

## 4. Responsive Design

- **Fully responsive** — mobile-first approach
- Must look great on phones, tablets, and desktops
- Tailwind CSS responsive utilities for breakpoints

---

## 5. Accessibility

- **WCAG 2.1 AA compliance** required
- Proper ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Semantic HTML throughout
- Proper alt text on all images
- Sufficient colour contrast ratios

---

## 6. SEO

**Full SEO implementation:**
- Meta titles and descriptions on every page
- Open Graph (OG) tags for social sharing
- Twitter Card meta tags
- JSON-LD structured data (Organization, WebSite, BreadcrumbList)
- Auto-generated sitemap.xml
- robots.txt
- Canonical URLs
- Clean, semantic URL structure (e.g., `/about`, `/solutions`, `/solutions/bsf-bioconversion`)

---

## 7. Sitemap & Navigation

### 7.1 Primary Navigation
```
Home
About Us
  └── Partners (sub-page of About)
Our Solutions (card grid landing page)
  ├── BSF Bioconversion
  ├── Sustainable Fish Feed
  ├── Organic Fertilizer
  ├── Waste Management
  ├── Renewable Energy
  └── Climate-Smart Agriculture
Our Impact
Our Team
News & Stories (CMS-driven)
Contact Us
```

### 7.2 URL Structure
Redesigned for SEO and clean paths:
- `/` — Home
- `/about` — About Us
- `/about/partners` — Partnerships
- `/solutions` — Solutions landing (card grid)
- `/solutions/bsf-bioconversion` — BSF Bioconversion
- `/solutions/sustainable-fish-feed` — Sustainable Fish Feed
- `/solutions/organic-fertilizer` — Organic Fertilizer
- `/solutions/waste-management` — Waste Management
- `/solutions/renewable-energy` — Renewable Energy
- `/solutions/climate-smart-agriculture` — Climate-Smart Agriculture
- `/impact` — Our Impact
- `/team` — Our Team
- `/news` — News & Stories (CMS-driven)
- `/contact` — Contact Us

---

## 8. Page-by-Page Specification

### 8.1 Home Page (`/`)
- **Hero Section:** Context-specific image relevant to the mission, with text overlay:
  - Headline: "Turning Waste into Wealth for a Resilient Blue-Green Economy"
  - Subtitle: Description of Bunyala Agri-Climate Industrial Park Limited
  - CTAs: "Explore Our Solutions" | "Partner With Us"
- **Stats Bar (below hero):** Animated counters on scroll:
  - 15+ tonnes — organic waste recycled
  - 400 Green Jobs — targeted for women and youth
  - 500+ Farmers — benefiting from climate-smart inputs
  - 10,000 People — long-term target
  - 30–40% — targeted reduction in feed costs
- **Featured Solutions:** Card grid preview linking to `/solutions`
- **Vision statement**
- **Call to action:** "Be Part of the Circular Future"
- **Embedded videos:** From supplied YouTube links (primary: `https://youtu.be/waCHqaHLxWQ`)

### 8.2 About Us (`/about`)
- **Who We Are:** Full company description
- **Mission & Vision**
- **BACIS Section:** Dedicated section (not separate page) for Bunyala Agri Climate Impact Solutions — the affiliated community-based program
- **Context-specific images** matching the content
- **SDG Contribution section** with official SDG icons (SDG 2, 8, 12, 13, 14)

### 8.3 Partners (`/about/partners`)
- Sub-page of About
- Partner logos and descriptions
- Mentions of FIPS Africa, county-level community forums, school-based tree-planting
- CTA: "Partner with us to build a cleaner, more resilient and inclusive Lake Victoria Basin"

### 8.4 Solutions Landing (`/solutions`)
- **Card grid layout** — each card links to an individual solution page
- Cards should have: icon/image, title, brief description, "Learn More" link
- 6 solution cards:
  1. BSF Bioconversion
  2. Sustainable Fish Feed
  3. Organic Fertilizer
  4. Waste Management
  5. Renewable Energy
  6. Climate-Smart Agriculture

### 8.5 Individual Solution Pages (`/solutions/[slug]`)
Each solution page should include:
- Hero with context-specific image
- Headline and description
- Key bullet points from the brief
- Relevant images from the supplied set
- CTA to contact/partner

**Solution content sourced from the brief (sections 3–9):**

1. **BSF Bioconversion** — Black Soldier Fly bioconversion & Lysis Technology
2. **Sustainable Fish Feed** — Aquaculture feed solutions using BSF-derived protein
3. **Organic Fertilizer** — BSF frass and circular organic soil amendments
4. **Waste Management** — Organic waste recovery, collection, sorting, biological conversion
5. **Renewable Energy** — Solar-powered irrigation, drying, fish feeders, clean energy for agriculture
6. **Climate-Smart Agriculture** — Regenerative agriculture, organic fertilizer, farmer training

### 8.6 Our Impact (`/impact`)
- Animated stat counters (same stats as homepage, expanded)
- Circular impact model: Environmental, Economic, Social breakdown
- Women & Youth section — 400 green jobs ambition
- SDG badges with official icons

### 8.7 Our Team (`/team`)
- **Team member cards** with photos, roles, and bios
- Featured profile: **John Wabwire Shikuku** — Founder & Managing Director
- Team description: multidisciplinary team with capabilities in Blue Circular Economy, Agriculture, Climate Change, etc.

### 8.8 News & Stories (`/news`)
- **CMS-driven** via Sanity
- Client can add/edit news articles through Sanity Studio
- Article cards with featured image, title, excerpt, date
- Individual article pages with full content
- Placeholder for initial launch (3-5 sample articles)

### 8.9 Contact Us (`/contact`)
- Contact information display (no form):
  - Location: Busia County, Western Kenya
  - Region: Lake Victoria Basin, East Africa
  - Email: bunyalaagrclimate@gmail.com
  - Phone: 0720060431 / 0721137003
- Social media links: Facebook, LinkedIn, WhatsApp, Email
- Partnership areas: Invest, Distribute, Supply, Partner, Research, Support, Buy
- Context-specific image (e.g., community gathering or field work)

---

## 9. Multilingual Support

### 9.1 Languages
- **English** (primary)
- **Luhya (Oluluyia)** — specific phrases and short impactful sentences translated
- **Swahili** — full translation

### 9.2 Translation Approach
- Manual translations stored in JSON language files
- For Luhya: only specific phrases and short impactful sentences are translated (not full paragraphs)
- Language switcher in the header/navigation
- Translations to be reviewed and corrected by the client

### 9.3 Implementation
- i18n library (e.g., `react-i18next` or similar)
- Language files: `en.json`, `luhya.json`, `sw.json`
- Language preference persisted in localStorage

---

## 10. Key Features & Components

### 10.1 Navigation
- Sticky header with logo, navigation links, language switcher, dark mode toggle
- Mobile hamburger menu
- Active page highlighting

### 10.2 Footer
- Full footer with:
  - Company contact info
  - Quick navigation links
  - Social media icons (Facebook, LinkedIn, WhatsApp, Email)
  - Newsletter signup form (Mailchimp integration)
  - Copyright notice
  - SDG badges (optional)

### 10.3 Dark Mode
- Toggle button in header (sun/moon icon)
- Persists preference in localStorage
- Proper colour scheme for dark mode (maintain brand greens, adjust backgrounds)

### 10.4 Animations
- **Subtle scroll animations:** fade-ins, parallax, scroll-triggered reveals
- **Animated counters** on stats sections
- No heavy animations or loading screens

### 10.5 WhatsApp Floating Button
- Fixed-position WhatsApp icon (bottom-right corner)
- Links to WhatsApp chat with the business phone number

### 10.6 Back to Top Button
- Floating button that appears when user scrolls down
- Smooth scroll to top on click

### 10.7 Newsletter Signup
- Form in footer (and optionally on Contact page)
- Mailchimp integration
- Email validation
- Success/error feedback

### 10.8 Cookie Consent Banner
- GDPR/privacy-compliant cookie consent banner
- Appears on first visit
- Accept/decline options
- Persists preference in localStorage

### 10.9 SDG Display
- Official SDG icons displayed on Impact and About pages
- SDG 2, 8, 12, 13, 14
- Use official UN SDG icon assets

---

## 11. Image Handling

### 11.1 Image Assets
24 images provided in `Bunyala Agriclimate/images/`. Key images and their placement:

| Image | Content | Placement |
|-------|---------|-----------|
| `1788293112383_image.png` | Print roll-up banner | Brand reference / About |
| `WhatsApp...10_16_57_PM.jpeg` | Students watering tree | Women & Youth; Climate-Smart Agriculture |
| `WhatsApp...10_18_02_PM.jpeg` | Primary logo | Header / footer / brand assets |
| `WhatsApp...10_18_03_PM (3).jpeg` | Organic waste feedstock | Circular Economy; Waste Management |
| `WhatsApp...10_18_03_PM.jpeg` | Founder headshot bio card | Team page |
| `WhatsApp...10_48_59_PM.jpeg` | Tree seedlings nursery | Climate-Smart Agriculture; About |
| `WhatsApp...10_49_01_PM.jpeg` | Planning meeting (FIPS Africa) | Partnerships; Team |
| `WhatsApp...10_49_05_PM.jpeg` | Workshop with flip chart | Team / About |
| `WhatsApp...10_49_06_PM.jpeg` | Strategy workshop with laptops | About; Team |
| `WhatsApp...10_49_07_PM.jpeg` | Banner: Lysis Technology | Technology; Products |
| `WhatsApp...10_51_15_PM.jpeg` | Community elders | Community Empowerment; Who We Serve |
| `WhatsApp...10_51_18_PM.jpeg` | Outdoor community meeting | Community Empowerment; Partnerships |
| `WhatsApp...10_51_19_PM.jpeg` | Individual planting sapling | Climate-Smart Agriculture; Home hero |

**Note:** Image `WhatsApp...10_18_03_PM (2).jpeg` (sugar beet field) appears to be generic/stock — hold from publishing until confirmed.

### 11.2 Image Optimization
- **WebP conversion** for all images
- Responsive images with `srcset` and `sizes`
- Lazy loading for below-fold images
- Proper alt text for accessibility

---

## 12. Video Integration

### 12.1 Video Links
- Primary: `https://youtu.be/waCHqaHLxWQ` (likely the main feature video)
- Secondary: `https://youtu.be/Ttu9zkmtlts`
- Tertiary: `https://www.youtube.com/watch?v=E7gue1J1SwU`

### 12.2 Placement
- Embed on relevant pages (Home hero area, About, Technology sections)
- Lazy-load embedded videos for performance
- Use YouTube embed with `loading="lazy"`

---

## 13. Content Structure

### 13.1 BACIS (Bunyala Agri Climate Impact Solutions)
- Presented as a **section within the About page** (not a separate page)
- Content: affiliated community-based program, youth and women's skilling, entrepreneurship training, community empowerment

### 13.2 Partners
- **Sub-page of About** (`/about/partners`)
- Partner logos and descriptions
- CTA for partnership

### 13.3 Business Model
- Included on a relevant page (Impact or About)
- Revenue model: Feed Products, BSF Products, Organic Fertilizer, Waste Management, Renewable Energy, Training & Advisory, Value Chain Partnerships

### 13.4 Market & Distribution
- Included on Impact or About page
- Market: Western Kenya → East Africa expansion pathway
- Distribution channels: Direct sales, agro-dealers, cooperatives, BMUs, etc.

---

## 14. Open Items (From Content Brief)

These items need client confirmation before final launch:

| Item | Status |
|------|--------|
| Domain spelling | Confirmed typo — use `bunyala-agriclimate.org` |
| Two-brand structure (Ltd + BACIS) | Assumed one company site with BACIS on About page |
| Video links placement | Embed on relevant pages (Home, About, Technology) |
| Sugar-beet field photo | Hold — appears to be stock, not client's own |
| Image set completeness | 20 of ~23 images processed; 3 still pending |
| Logo vector file | Only raster copy provided — request vector for production |

---

## 15. Performance Requirements

- Lighthouse score target: 90+ on all metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3s
- All images optimized (WebP, lazy loading, proper sizing)
- Code splitting for route-based loading

---

## 16. Build & Deployment

### 16.1 Development
- React + Vite + Tailwind CSS
- Sanity Studio for CMS content management
- Local development with `npm run dev`

### 16.2 Deployment
- GitHub repository
- Deployed to GitHub Pages (or similar static hosting)
- Custom domain: `bunyala-agriclimate.org`
- Automatic deployment on push to main branch

### 16.3 Environment Variables
```
VITE_SANITY_PROJECT_ID=
VITE_SANITY_DATASET=
VITE_MAILCHIMP_API_KEY=
VITE_MAILCHIMP_LIST_ID=
VITE_GA_MEASUREMENT_ID=
VITE_WHATSAPP_PHONE_NUMBER=
```

---

## 17. Phased Delivery (Minimum Viable Site First)

**Phase 1 — Core Pages (MVP):**
- Home
- About (with BACIS section, SDGs, Vision/Mission)
- Solutions landing page (card grid)
- Contact
- Navigation, Footer, Dark Mode, WhatsApp button, Cookie banner

**Phase 2 — Expanded Pages:**
- Individual Solution pages (6 pages)
- Impact page
- Team page
- Partners sub-page

**Phase 3 — CMS & Features:**
- Sanity CMS integration for News/Stories
- Newsletter signup (Mailchimp)
- Google Analytics integration
- Full SEO (sitemap, structured data)

**Phase 4 — Polish:**
- Animations and scroll effects
- Animated counters
- Image optimization (WebP conversion)
- Performance optimization
- WCAG audit

---

## 18. Component Library / Reusable Components

The following reusable components should be built:

1. **Header** — Sticky nav with logo, links, language switcher, dark mode toggle
2. **Footer** — Full footer with newsletter, social links, contact info
3. **Hero** — Context-specific image with text overlay and CTAs
4. **CardGrid** — Reusable card grid for Solutions landing, News, etc.
5. **SolutionCard** — Individual solution card with icon, title, description
6. **TeamCard** — Team member card with photo, role, bio
7. **StatsCounter** — Animated counter component
8. **SDGBadge** — Official SDG icon badge
9. **LanguageSwitcher** — Dropdown or toggle for language selection
10. **DarkModeToggle** — Sun/moon toggle button
11. **WhatsAppButton** — Floating WhatsApp chat button
12. **BackToTop** — Floating back-to-top button
13. **CookieBanner** — GDPR cookie consent banner
14. **NewsletterForm** — Mailchimp newsletter signup form
15. **VideoEmbed** — Lazy-loaded YouTube embed component
16. **Image** — Optimized image component with WebP, lazy loading, alt text

---

## 19. File Structure (Proposed)

```
bunyala-agriclimate/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CookieBanner.jsx
│   │   │   └── WhatsAppButton.jsx
│   │   ├── ui/
│   │   │   ├── Hero.jsx
│   │   │   ├── CardGrid.jsx
│   │   │   ├── SolutionCard.jsx
│   │   │   ├── TeamCard.jsx
│   │   │   ├── StatsCounter.jsx
│   │   │   ├── SDGBadge.jsx
│   │   │   ├── LanguageSwitcher.jsx
│   │   │   ├── DarkModeToggle.jsx
│   │   │   ├── BackToTop.jsx
│   │   │   ├── NewsletterForm.jsx
│   │   │   ├── VideoEmbed.jsx
│   │   │   └── OptimizedImage.jsx
│   │   └── sections/
│   │       ├── HeroSection.jsx
│   │       ├── StatsBar.jsx
│   │       ├── SolutionsPreview.jsx
│   │       ├── VisionSection.jsx
│   │       ├── BACISSection.jsx
│   │       ├── TeamSection.jsx
│   │       ├── PartnersSection.jsx
│   │       ├── SDGSection.jsx
│   │       └── CTASection.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Partners.jsx
│   │   ├── Solutions.jsx
│   │   ├── SolutionDetail.jsx
│   │   ├── Impact.jsx
│   │   ├── Team.jsx
│   │   ├── News.jsx
│   │   ├── NewsArticle.jsx
│   │   └── Contact.jsx
│   ├── i18n/
│   │   ├── index.js
│   │   ├── en.json
│   │   ├── luhya.json
│   │   └── sw.json
│   ├── data/
│   │   ├── solutions.js
│   │   ├── team.js
│   │   ├── partners.js
│   │   ├── sdgs.js
│   │   └── impact-stats.js
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo/
│   │   │   ├── hero/
│   │   │   ├── about/
│   │   │   ├── solutions/
│   │   │   ├── team/
│   │   │   └── shared/
│   │   └── icons/
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── seo.js
│   │   └── analytics.js
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx
├── sanity/
│   └── (Sanity project config)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

---

## 20. Success Criteria

- [ ] All pages from sitemap are built and functional
- [ ] Fully responsive on mobile, tablet, and desktop
- [ ] Dark mode toggle works correctly
- [ ] Language switcher works for English, Luhya, and Swahili
- [ ] WCAG 2.1 AA compliance
- [ ] Full SEO implementation (meta tags, OG, structured data, sitemap)
- [ ] Sanity CMS integration for News/Stories
- [ ] Mailchimp newsletter signup functional
- [ ] Google Analytics tracking active
- [ ] WhatsApp floating button functional
- [ ] Cookie consent banner appears on first visit
- [ ] All images optimized (WebP, lazy loading)
- [ ] Animated counters work on scroll
- [ ] Lighthouse score 90+ on all metrics
- [ ] Deployed to GitHub with custom domain
- [ ] Client can update News/Stories via Sanity Studio

---

## Appendix: Source Material References

- **Content Brief:** `Bunyala_Website_Content_Brief.docx` (Downloads folder)
- **Image Assets:** `Bunyala Agriclimate/images/` (24 files)
- **Current Placeholder Site:** `rickyokumu.github.io/bu/`
- **YouTube Videos:**
  - https://youtu.be/waCHqaHLxWQ (primary)
  - https://youtu.be/Ttu9zkmtlts
  - https://www.youtube.com/watch?v=E7gue1J1SwU
