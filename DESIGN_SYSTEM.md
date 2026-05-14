# Design System & Modernization Analysis

## 1. DESIGN TOKENS
### Color Palette
* **Background:** `hsl(220, 20%, 2%)` (Dark Slate) overlaid on `#111625`.
* **Foreground:** `hsl(0, 0%, 95%)` (Near White)
* **Primary:** `hsl(190, 100%, 50%)` (Cyan/Neon Blue) – Used for interactions and accents.
* **Secondary:** `hsl(220, 15%, 12%)`
* **Muted:** `hsl(220, 15%, 10%)`
* **Accent:** `hsl(190, 80%, 40%)`
* **Destructive:** `hsl(0, 84%, 60%)` (Red)
* **Neuron/Custom Tokens:** 
    * `neuron-core`: `hsl(0, 0%, 100%)`
    * `neuron-glow`: `hsl(190, 100%, 50%)`
    * `glass-bg`: `rgba(255, 255, 255, 0.06)`

### Typography
* **Sans-serif:** `Inter`, sans-serif (Weights: 300, 400, 500, 600, 700, 800)
* **Monospace:** `IBM Plex Mono`, monospace (Weights: 400, 500, 600, 700)
* **Hierarchies:**
    * **Display Text:** `clamp(2rem, 6vw, 8rem)`, Weight: 200, Line Height: 1.1, Tracking: `-0.02em`
    * **Neural Text:** `0.75rem`, Uppercase, Tracking: `0.15em`

### Spacing & Borders
* **Global Radius:** Base radius is `0.5rem` (`8px`), scaled down to `md` (`6px`) and `sm` (`4px`).
* **Container:** Center-aligned, `2rem` padding, expanding up to `1400px` (`2xl`).

### Shadows & Elevation
* **Glass Panel:** `1px solid var(--glass-border)`, Drop Shadow: `0 0 30px hsla(190, 100%, 50%, 0.15)`
* **Text Glow:** `0 0 40px var(--neuron-glow-alpha), 0 0 80px var(--neuron-glow-alpha)`
* Layering uses z-indexes dictated dynamically by tailwind layers.

---

## 2. COMPONENT LIBRARY
The repository utilizes **shadcn/ui** extensively.

### Standardized Components Found
1. **Buttons:** Supports `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`.
2. **Forms/Inputs:** Contains `input`, `textarea`, `checkbox`, `radio-group`, `switch`, `slider`, `select`.
3. **Data Display:** `table`, `card`, `badge`, `accordion`, `carousel`, `avatar`.
4. **Navigation:** `menubar`, `navigation-menu`, `pagination`, `breadcrumbs`, `tabs`.
5. **Feedback:** `alert`, `alert-dialog`, `toast`, `sonner`, `tooltip`, `progress`, `skeleton`.
6. **Layout/Overlay:** `dialog`, `drawer`, `sheet`, `popover`, `hover-card`, `resizable`, `scroll-area`.

### Usage Guidelines
* **Glass Panels (`.glass-panel`):** Use for wrapping modular cards in the Neural universe UI.
* **Buttons:** Accentuate interactive boundaries with the `neon-glow` effect on hover.
* **Responsive Behavior:** Rely on the `container` class and Tailwind's `sm`, `md`, `lg`, `xl` breakpoints to reflow grids.

---

## 3. LAYOUT SYSTEM
* **Max Width:** Root constrained to `1280px` (`src/App.css`) while the Tailwind container goes up to `1400px`. *(See Inconsistencies)*
* **Grid:** Tailwind CSS responsive arbitrary columns for lists (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
* **Pages Layout:** Wrapped in `ProjectPageShell.tsx` and main app routers. A top-level Navigation overlay provides routing context.
* **Custom Scroll:** The app overrides default scrollbars entirely on specific frames, implementing a custom immersive layout via `ScrollOverlay.tsx` and `.scrollbar-hide`.

---

## 4. DESIGN INCONSISTENCIES
1. **Max Width Conflict:** `index.css` has `container` settings, but `App.css` defines `#root { max-width: 1280px; }`.
2. **Background Colors:** `App.tsx` forces `bg-[#111625]`, while `index.css` uses `--background: 220 20% 2%`.
3. **Typography Scope:** Body defaults to `font-mono` (`IBM Plex Mono`) overriding `font-sans` (`Inter`) globally, making reading large paragraphs harder unless manually set to `.font-sans`.
4. **Redundant CSS:** `logo-spin` and base Vite artifacts (`#root` styling) in `App.css` are not integrated into the Tailwind utility scope.

**Standardized Replacements:**
* Remove legacy base Vite styling inside `App.css`.
* Bind the `#111625` color correctly into `tailwind.config.ts` as the sole `--background` variable to prevent hydration mismatch flashes.

---

## 5. FRONTEND ARCHITECTURE
* **Structure:** Follows a standard React/Vite feature-based structure: `src/components`, `src/hooks`, `src/pages`, `src/sections`.
* **State Management:** React Context (`MindStateContext.tsx`) controls the primary theme/mode toggle. Server-state relies on `react-query`.
* **Styling Strategy:** Utility-first CSS (Tailwind) augmented directly by shadcn components, alongside raw CSS files for animations (`App.css`, `index.css`).

---

## 6. MODERNIZATION RECOMMENDATIONS
Inspired by Linear and Vercel standards:
1. **Centralize the Container:** Use a singular `<Layout width="screen-xl" />` wrapper component instead of raw `#root` modifications.
2. **Design Tokens:** Move all custom `.neural-text`, `.glow-text`, and `.glass-panel` utilities into the `components` layer of `tailwind.config.ts` via the plugin API.
3. **Accessibility (WCAG):** Ensure the `hsl(190, 100%, 50%)` text against `#111625` maintains a minimum `4.5:1` contrast ratio. Currently, neon cyan on dark blue provides good contrast, but `muted-foreground` (`220 10% 50%`) against `#111625` risks being too low-contrast (around `3:1` — needs validation).

---

## 7. ACCESSIBILITY
* Update all custom UI components lacking ARIA to match the `shadcn/ui` `Radix` primitive implementations.
* Disable `pointer-events` strictly on decorative elements (`#hero-loop`).
* Enhance `prefers-reduced-motion` media queries globally. The setup correctly sets animations to `0.01ms`, but complex `framer-motion` timelines in the JS contexts also need to read this query natively.