## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-22 - Form Validation UX
**Learning:** Disabling submit buttons until validity criteria are met prevents users from understanding why they cannot proceed. It is better to keep the button enabled and provide specific error feedback on click.
**Action:** Remove `disabled` attributes linked to validation state. Instead, validate on submit and focus/announce the error using `role="alert"` and `aria-invalid`.
