## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-10-26 - Form Feedback Accessibility
**Learning:** Status messages (like form success/error) that appear dynamically are often missed by screen readers unless they are marked as live regions.
**Action:** Add `role="alert"` (or `aria-live="polite"`) to any container that conditionally renders status messages.

## 2025-10-26 - Checkbox Focus States
**Learning:** Default browser focus rings on checkboxes often clash with custom design systems or become invisible against certain backgrounds.
**Action:** Explicitly add `focus:ring` classes to checkboxes to match the text input focus styles (e.g., `focus:ring-[#00E8E5]`).
