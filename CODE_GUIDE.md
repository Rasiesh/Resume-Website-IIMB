# Understanding the Rasiesh Agarwal portfolio

This guide explains how the website is put together and where to make changes. The site uses plain HTML, CSS and JavaScript. There is no framework, build tool or package installation.

## 1. Project map

```text
rasiesh_portfolio_refined/
│
├── index.html                 Homepage
├── about.html                 Personal story
├── journey.html               Timeline
├── work.html                  Project overview
├── community.html             CDC community page
│
├── chapters/
│   ├── ageside.html           Ageside.ai case study
│   ├── hoptics.html           Hoptic's case study
│   ├── flowcom.html           FlowCom overview
│   ├── robees.html            RoBee's case study
│   ├── dental-oral-care.html  Dental and oral care
│   └── youtube.html           YouTube chapter
│
├── assets/                    Photographs and favicon
├── style.css                  All visual styling
├── script.js                  Menu, scroll progress and reveals
├── README.md                  Quick start and publishing notes
└── CODE_GUIDE.md              This guide
```

The HTML files contain the words and page structure. `style.css` controls how those elements look. `script.js` adds a few interactions.

## 2. How an HTML page works

Every page follows the same basic structure:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About · Rasiesh Agarwal</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>...navigation...</header>
  <main id="main">
    ...page content...
  </main>
  <footer>...social links and copyright...</footer>
  <script src="script.js" defer></script>
</body>
</html>
```

- `<!doctype html>` tells the browser to use modern HTML.
- `<head>` contains the page title, mobile settings, description and links to the stylesheet and favicon.
- `<body>` contains everything visitors see.
- `<header>` holds the navigation shared by every page.
- `<main>` holds the page's main content. The `id="main"` gives the skip link a destination.
- `<section>` groups related content, such as About, the timeline or selected work.
- `<footer>` holds social links and the copyright line.
- The `defer` attribute loads JavaScript without stopping the HTML from being read first.

### Classes and IDs

A class can be used by many elements. For example, every project card uses `class="work-card"`, so one CSS rule can style all of them.

An ID identifies one particular element. For example, `id="contact"` gives the contact section a unique address, so a link can jump to `index.html#contact`.

A link such as `chapters/ageside.html` opens another page. A link such as `#laundry` moves to a section on the current page.

## 3. The pages and their content

- `index.html` is the entry point. It contains the cinematic hero, short introduction, life-map idea, timeline preview, selected projects and contact links.
- `about.html` tells the longer version of your story.
- `journey.html` presents the timeline in one place. Dates appear only where you supplied them.
- `work.html` is the directory of projects. Each card links to a deeper page.
- `community.html` explains CDC and links to the Canva presentation.
- `chapters/ageside.html` covers international agency work and the UAE laundry system.
- `chapters/hoptics.html` covers the AI-enabled eyewear experiment and its Canva presentation.
- `chapters/flowcom.html` describes the POS, customer records and WhatsApp product direction.
- `chapters/robees.html` covers the natural D2C brand and its DLF Cyberpark pop-up photograph.
- `chapters/dental-oral-care.html` introduces the dental and oral-care venture.
- `chapters/youtube.html` links to your YouTube channel and describes the creator chapter.

When you change a paragraph, edit the relevant HTML file. The same text is not generated from a database; each page is simple, static HTML.

## 4. How the colour system works

At the top of `style.css` is the `:root` block. It stores the shared colours and fonts as CSS variables:

```css
:root {
  --forest: #183f35;
  --forest-deep: #102f28;
  --sand: #e9dfcd;
  --sand-light: #f4efe5;
  --coral: #e98270;
  --serif: 'Bodoni Moda', Georgia, serif;
  --sans: 'DM Sans', Arial, sans-serif;
}
```

The palette follows your 60 / 30 / 10 direction:

- Forest green is the main canvas, navigation and footer.
- Sand beige gives the reading sections, project cards and lighter areas room to breathe.
- Coral is used sparingly for details such as links, markers, the name underline and hover states.

To change a colour across the site, change its variable here. For example, changing `--coral` updates the accents that use that variable. Avoid creating a new shade for every individual section; repeated colours are what make the site feel like one brand.

## 5. How the stylesheet is organised

`style.css` is grouped by purpose, from general rules to page-specific rules:

1. **Colours and shared settings** — brand colours, fonts, page width and transition curve.
2. **Base** — box sizing, body font, image defaults, links and text selection.
3. **Keyboard access** — the skip link and visible keyboard focus.
4. **Navigation** — desktop header, links, contact link, mobile-menu button and reading-progress line.
5. **Homepage opening** — hero photograph, dark green overlay, name, tagline and scroll cue.
6. **Main sections** — section spacing, headings, About grid, facts and the four-part life map.
7. **Timeline and project cards** — timeline rows, card grid and the abstract project artwork.
8. **Inner pages** — page headings, article text, side navigation, statistics, callouts and presentation links.
9. **Images and footer** — figures, captions, social links and copyright.
10. **Movement and smaller screens** — reveals, keyframes, tablet/mobile layouts and reduced-motion support.

### The layout rules

- `.wrap` keeps content aligned to one maximum width.
- `.section` gives homepage sections consistent vertical spacing.
- `.about-grid`, `.dataset`, `.work-grid` and `.contact-panel` use CSS Grid for columns.
- `.nav`, `.nav-right`, `.footer-inner` and `.footer-social` use Flexbox for rows and alignment.
- The `@media` blocks change those layouts for smaller screens.

For example, the desktop project cards use two columns. At phone width, the mobile media query changes the grid to one column.

## 6. How the animation works

The site uses CSS for movement and JavaScript only to decide *when* some elements should appear.

### The name on the homepage

The two words have their own spans:

```html
<h1 aria-label="Rasiesh Agarwal">
  <span class="name-word name-first" aria-hidden="true">RASIESH</span>
  <span class="name-word name-last" aria-hidden="true">AGARWAL</span>
</h1>
```

The `.name-word` rule animates the first word. `.name-last` adds a short delay, so the second word follows. The thin line under the name is drawn by `.hero-title-block::after`.

The animation is made from three CSS properties:

- `opacity` fades the word in.
- `transform: translateY(...)` moves it gently into place.
- `filter: blur(...)` starts it slightly soft and brings it into focus.

The keyframes named `name-in` describe the start and end states. Change the `.name-word` animation duration to make the name appear faster or slower.

### The hero photograph

`.hero-landing-image` fills the opening section. `object-fit: cover` fills the area without stretching the photo. The `filter` slightly lowers saturation and adjusts contrast. `.hero-landing-shade` adds a forest-green gradient over the image so the photo, text and site palette feel connected. `hero-drift` slowly scales the image for a quiet cinematic movement.

### Scroll reveals

Elements with `class="reveal"` start in their normal visible state. When JavaScript is available, the page receives the `js-ready` class. CSS then lets unrevealed items begin slightly lower and transparent. JavaScript watches them with `IntersectionObserver`. When an item enters the screen, it gets the `visible` class and CSS fades it into place.

This approach keeps the animation in CSS and uses JavaScript only to detect when an item enters the screen.

### Reduced motion

The final media query checks `prefers-reduced-motion`. If a visitor has asked their device to reduce animation, the site removes the long transitions and shows the content without the movement effects.

## 7. What `script.js` does

The JavaScript has four small jobs. It does not create the page or write the page content.

### A. Wait until the page is ready

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Page interactions go here.
});
```

This waits until the browser has built the HTML before looking for buttons and sections.

### B. Open and close the mobile menu

The script finds `.menu-toggle` and `.nav-links`. When the button is clicked, it adds or removes the `open` class. CSS uses that class to show or hide the menu.

It also updates `aria-expanded` and the button label. Those attributes help screen readers understand whether the menu is open. Pressing Escape or choosing a menu link closes it.

### C. Update reading progress

The `.progress` element is a thin line at the top of the page. The script compares how far the visitor has scrolled with the total scrollable page height, then changes the line's width. `requestAnimationFrame` groups visual updates with the browser's next paint, which keeps scrolling smooth.

### D. Reveal content as it enters view

`IntersectionObserver` watches elements with `.reveal`. When an element enters the viewport, JavaScript adds `.visible` and stops watching that element. CSS handles the fade and upward movement.

If the browser does not support `IntersectionObserver`, or the visitor prefers reduced motion, the script simply makes all reveal elements visible.

## 8. How to make common edits

### Change the introduction

Open `index.html` and find:

```html
<p>I turn curiosity into things that work.</p>
```

Replace only the words between the `<p>` and `</p>` tags.

### Change the name size

Open `style.css` and search for `.hero-title-block h1`. Change its `font-size` value. The `clamp()` function sets a minimum, a flexible size and a maximum, which helps the name scale between phones and desktop screens.

### Change the colour palette

Edit the variables in `:root` at the top of `style.css`. Start with `--forest`, `--sand` and `--coral`.

### Replace a photograph

Put the new image in `assets/`. Either keep the original filename or update the `src` in the HTML. The homepage uses `assets/rasiesh-hero-cinematic.jpg`. A page inside `chapters/` uses `../assets/filename.jpg` because it is one folder deeper.

### Add another project card

In `work.html`, copy one `<a class="work-card ...">` block. Change its number, category, artwork class, title, description and `href`. Then create the new case-study HTML file in `chapters/` and link back to `../work.html` from it.

### Change animation speed

Search in `style.css` for the animation name. For example, `hero-drift` is attached to `.hero-landing-image`. Change the duration from `25s` to a larger number for slower movement. For the name, change the `.name-word` duration.

## 9. Preview and publish

To preview locally:

1. Extract the ZIP file.
2. Open the `rasiesh_portfolio_refined` folder.
3. Double-click `index.html` to open it in a browser.
4. Test the navigation, every project card, the social links and the site on a narrow mobile window.

To publish with GitHub Pages:

1. Upload the *contents* of `rasiesh_portfolio_refined` to the root of your GitHub repository.
2. Keep `index.html`, `style.css`, `script.js`, `assets/` and `chapters/` together in the same structure.
3. In the repository, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Open the URL GitHub Pages provides.

The fonts are loaded from Google Fonts, so the first load needs an internet connection. The rest of the website is static and does not need a server-side database.

## 10. Copyright and publishing

The footer displays:

`© 2026 Rasiesh Agarwal. All rights reserved.`

This is a standard copyright notice, not a copyright registration. Before publishing, make sure you have permission to use photographs showing other people and any third-party material. Company names and trademarks remain the property of their respective owners.
