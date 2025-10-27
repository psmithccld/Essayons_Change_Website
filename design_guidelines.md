# Essayons Public Website — Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based, drawing inspiration from **Notion** (clean content presentation), **Linear** (modern typography and spacing), and **Stripe** (trust and clarity).

**Rationale:** As a public marketing site with tutorials, blog, and educational content, the design must balance professional credibility with engaging visual presentation. The site needs to feel trustworthy (for pricing/service information) while remaining approachable (for learning content).

**Core Principles:**
1. **Clarity First**: Information hierarchy guides users naturally through content
2. **Breathing Space**: Generous whitespace creates focus and sophistication
3. **Progressive Disclosure**: Each section reveals value deliberately
4. **Professional Authority**: Design conveys expertise and reliability

---

## Typography System

**Font Families** (via Google Fonts CDN):
- **Display/Headings**: Inter (weights: 600, 700, 800)
- **Body/UI**: Inter (weights: 400, 500, 600)
- **Code/Technical**: JetBrains Mono (weight: 400) for tutorial code snippets

**Hierarchy:**
- **Hero Headline**: text-6xl md:text-7xl lg:text-8xl, font-bold (Inter 700)
- **Section Headers**: text-4xl md:text-5xl, font-semibold (Inter 600)
- **Subsection Headers**: text-2xl md:text-3xl, font-semibold
- **Card Titles**: text-xl md:text-2xl, font-semibold
- **Body Large**: text-lg md:text-xl, font-normal (Inter 400)
- **Body Standard**: text-base md:text-lg, font-normal
- **Labels/Meta**: text-sm, font-medium (Inter 500)
- **Code Snippets**: text-sm, font-mono (JetBrains Mono)

---

## Layout System

**Spacing Primitives** (Tailwind units): 2, 4, 6, 8, 12, 16, 20, 24, 32

**Common Patterns:**
- Component internal spacing: p-6, p-8
- Section padding vertical: py-16 md:py-24 lg:py-32
- Card gaps in grids: gap-6 md:gap-8
- Text block spacing: space-y-4 for paragraphs, space-y-6 for sections
- Button padding: px-6 py-3 for primary, px-4 py-2 for secondary

**Container Strategy:**
- Full-width sections with inner constraints: `w-full` wrapper → `max-w-7xl mx-auto px-6 md:px-8`
- Content blocks: `max-w-4xl mx-auto` for text-heavy sections (blog posts, tutorials)
- Narrow content: `max-w-2xl mx-auto` for forms and focused CTAs

**Grid Patterns:**
- Features: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- Blog/Tutorials: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Pricing: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- Team/About: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`

---

## Component Library

### Navigation
- **Header**: Sticky navigation (sticky top-0 z-50) with backdrop blur (backdrop-blur-md)
- Logo on left, primary nav centered or right-aligned, CTA button prominent
- Mobile: Hamburger menu with slide-in panel (transform translate-x)
- Height: h-16 md:h-20
- Include subtle bottom border for definition

### Hero Section (Home Page)
- **Layout**: Split layout with 60/40 text-to-visual ratio
- **Left**: Headline + subheadline + dual CTA buttons (primary + secondary)
- **Right**: Feature image or abstract illustration
- **Height**: min-h-[600px] md:min-h-[700px], not full viewport
- **Spacing**: py-20 md:py-32
- **Social Proof Strip**: Below hero, showing "Trusted by..." with logos or stats (h-16, subtle background)

### Features Section
- **Layout**: 3-column grid (stack to 1-col on mobile)
- **Cards**: Elevated cards with subtle shadow (shadow-sm hover:shadow-md transition)
- Icon at top (w-12 h-12), title (text-xl), description (text-base), optional "Learn more" link
- **Padding**: p-8, rounded-lg, border (border-gray-200 equivalent)

### Pricing Section
- **Layout**: 3-column grid for tier comparison
- **Cards**: Highlighted middle tier with border accent and larger scale (scale-105)
- Include: Plan name, price (large text-5xl), billing period, feature list with checkmarks (using Heroicons), CTA button
- **Comparison Table**: Optional below cards for detailed feature breakdown

### Blog/Tutorials Listing
- **Layout**: 3-column grid with featured post at top (spans 2 columns)
- **Card Structure**: Thumbnail image (aspect-video), category tag, title, excerpt, author avatar + name, read time, publish date
- **Hover State**: Lift effect with shadow transition
- **Pagination**: Centered below grid with prev/next + numbered pages

### Tutorial Detail Page
- **Layout**: Single column, max-w-4xl, generous line-height (leading-relaxed)
- **Table of Contents**: Sticky sidebar on desktop (lg:sticky lg:top-24)
- **Code Blocks**: Syntax highlighted with copy button, rounded-lg, p-4
- **Step Numbers**: Large, prominent indicators for sequential content
- **Images/Diagrams**: Full-width within content column with captions

### Games/Quiz Placeholder
- **Layout**: Card-based grid showcasing upcoming interactive content
- **Cards**: Playful design with icon, title, "Coming Soon" badge, brief description
- Maintain brand consistency but allow slightly more visual freedom

### About Page
- **Hero**: Team photo or mission statement visual
- **Team Grid**: 4-column grid with photos (rounded-full for headshots), name, role, brief bio
- **Mission/Values**: 2-column layout alternating text and supporting imagery
- **Timeline**: Vertical timeline for company history/milestones

### Contact/Footer
- **Footer**: 4-column layout (Company info, Product links, Resources, Legal)
- Newsletter signup: Single-line email input + submit button
- Social media icons (Heroicons social set, w-6 h-6)
- Copyright and secondary navigation at bottom
- **Contact Form** (if separate page): 2-column split (form left, contact info/map right)

### Interactive Elements
- **Buttons**: 
  - Primary: px-6 py-3, rounded-lg, font-semibold, transition for all states
  - Secondary: Same size, variant styling (outline or ghost)
  - On images: backdrop-blur-sm bg-white/20 for glass morphism effect, no custom hover states (inherent)
- **Input Fields**: h-12, px-4, rounded-lg, border, focus:ring treatment
- **Cards**: rounded-xl, consistent padding (p-6 or p-8), hover transitions
- **Links**: Underline offset for body text, no underline for nav (hover state shows)

### Icons
**Library**: Heroicons (via CDN)
- Feature icons: w-8 h-8 md:w-10 md:h-10
- UI icons: w-5 h-5 (buttons, form inputs)
- Social icons: w-6 h-6
- Decorative accents: w-12 h-12 or larger

---

## Images

**Hero Section**: Large feature image showing professional/educational context - people collaborating, digital interface visualization, or abstract representation of learning/growth. Image should convey trust and forward momentum.

**Feature Cards**: Icon-based (no images), use Heroicons for clean, consistent presentation

**Blog/Tutorial Cards**: Thumbnail images (16:9 aspect ratio) - screenshots of tutorials, conceptual imagery, or topic-related visuals

**About Page**: Team photos (professional headshots), mission-aligned lifestyle/workspace photography

**Pricing Section**: No images, focus on clarity of information

**Tutorial Detail**: Inline screenshots, diagrams, and instructional images at natural width within content column

---

## Animation & Interaction

**Minimize animations** - use sparingly:
- Subtle hover lifts on cards (translateY(-2px))
- Smooth transitions on interactive elements (transition-all duration-200)
- Fade-in on scroll for section headers (optional, only if enhances experience)
- NO complex scroll-triggered animations, parallax effects, or auto-playing carousels

---

## Page Structure

**Home Page** (6-7 sections):
1. Hero with dual CTA and feature image
2. Social proof strip (logos/testimonials)
3. Key features (3-column grid)
4. Secondary benefits or use cases
5. Pricing preview (simplified, links to full pricing page)
6. Final CTA section
7. Footer

**About Page**: Hero → Mission statement → Team grid → Values/Timeline → Footer

**Pricing Page**: Hero → Pricing tiers (3-column) → Feature comparison table → FAQ accordion → CTA → Footer

**Blog Listing**: Hero/Header → Featured post → Grid of recent posts → Pagination → Footer

**Tutorial Detail**: Breadcrumb → Hero with title/meta → TOC + Content → Related tutorials → Footer

All pages maintain consistent header/footer, spacing rhythm (py-16 to py-32 for sections), and max-width constraints.