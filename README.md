# Modern Portfolio Website

A clean, accessible, and performant personal portfolio built with vanilla HTML, CSS, and JavaScript. No build tools required - just modern web standards.

## ✨ Features

- **Modern Design**: Clean, minimalist aesthetic with subtle micro-interactions
- **Fully Responsive**: Mobile-first design that scales beautifully to large screens
- **Accessible**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **High Performance**: <50KB CSS, minimal JavaScript, optimized for Lighthouse 95+ scores
- **Theme Support**: Automatic system preference detection with manual toggle
- **Buildless**: Pure HTML/CSS/JS for easy GitHub Pages hosting

## 🚀 Performance

- CSS: ~50KB (compressed across 5 modular files)
- JavaScript: ~12KB (single file with modern ES6+ features)
- Images: Lazy-loaded with proper responsive attributes
- Fonts: System font stack for zero network requests

## 🎨 Customization

### Colors & Themes

Edit `style/design-tokens.css` to customize the color palette:

```css
:root {
  --color-primary: #2563eb;        /* Primary brand color */
  --color-accent: #0891b2;         /* Accent color for highlights */
  --color-background: #ffffff;     /* Main background */
  /* ... more color tokens */
}
```

### Typography

Adjust the fluid type scale in `design-tokens.css`:

```css
:root {
  --text-base: clamp(1.6rem, 1.2rem + 0.8vw, 1.8rem);
  --text-lg: clamp(1.8rem, 1.4rem + 1vw, 2.4rem);
  /* ... more typography scales */
}
```

### Spacing

Modify the spacing scale for consistent layouts:

```css
:root {
  --space-xs: 0.4rem;   /* 4px */
  --space-sm: 0.8rem;   /* 8px */
  --space-md: 1.6rem;   /* 16px */
  /* ... more spacing values */
}
```

### Content

1. **Hero Section**: Update name, title, and description in `index.html`
2. **Projects**: Add/remove project cards in the projects section
3. **Images**: Replace images in `/resources/` folder
4. **Contact Form**: Update the Formspree endpoint in the form action

### Adding New Sections

1. Add the HTML structure following the existing pattern
2. Use existing CSS classes or create new ones in `style/components.css`
3. Ensure proper semantic HTML (headings, landmarks, etc.)

## 📁 File Structure

```
├── style/
│   ├── design-tokens.css    # Color, spacing, typography tokens
│   ├── reset.css           # Modern CSS reset and base styles
│   ├── layout.css          # Grid, container, and layout components
│   ├── components.css      # Buttons, cards, forms, and UI components
│   └── main.css           # Main stylesheet with imports and utilities
├── js/
│   └── main.js            # All JavaScript functionality
├── resources/             # Images, resume, and assets
└── index.html            # Single-page application
```

## 🔧 Development

### Local Development

```bash
# Start a local server
python3 -m http.server 8000
# or
npx serve .
```

### GitHub Pages Deployment

1. Push to your repository
2. Enable GitHub Pages in repository settings
3. Select source: Deploy from a branch (main)

### Performance Testing

Test your site with:
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

## 🌐 Browser Support

- Modern browsers (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)
- Progressive enhancement for older browsers
- Graceful degradation of animations and advanced features

## ♿ Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Reduced motion preferences respected
- Focus management for interactive elements
- Skip-to-content link

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Large screens: 1200px+

## 🎯 Lighthouse Targets

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

Built with ❤️ using modern web standards. No frameworks, no build tools, just clean code.