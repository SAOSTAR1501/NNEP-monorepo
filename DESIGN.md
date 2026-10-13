# NNEP Design System & UI/UX Standards (DESIGN.md)

This repository adheres to the **Untitled UI** design system principles with **Chakra UI v3** component primitives.

## 1. Brand Tokens & Color Palette
- **Primary / Brand Navy**: `#001e8c` (Buttons, active navigation borders)
- **Accent / Cyan**: `#00aae7` (Tech accents, badges, active focus rings)
- **Background Tint**: `#eef7ff` (Card active backgrounds, table hover states)
- **Warm / Attention**: `#f89714` (Pending approvals, warning chips)

## 2. Component Primitive Policy
Never render raw HTML primitives (`<button>`, `<input>`) directly inside feature modules. All UI must be wrapped via `@/shared/ui` primitives for consistent focus rings, dark mode tokens, and accessibility.
