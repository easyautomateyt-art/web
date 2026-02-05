## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-23 - Contact Form Accessibility & UX
**Learning:** Disabling submit buttons prevents users from understanding validation errors, especially for checkboxes. Also, mismatched visual and ARIA states can confuse screen reader users.
**Action:** Keep submit buttons enabled to trigger validation on click. Ensure `aria-invalid` logic matches the visual error display logic exactly. Use `role="alert"` for validation messages.
