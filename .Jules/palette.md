## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-22 - Contact Form Accessibility
**Learning:** Dynamic status messages (success/error) in forms were not announced by screen readers, leaving blind users unsure of submission status.
**Action:** Always wrap dynamic form feedback in containers with `role="status"` (for success) or `role="alert"` (for errors) and appropriate `aria-live` attributes.
