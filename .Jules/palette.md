## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-23 - Submit Button UX
**Learning:** Disabling submit buttons based on form validity prevents users from discovering *why* the form is invalid, as they cannot trigger validation feedback.
**Action:** Keep submit buttons enabled. Validate on click, and programmatically focus the first invalid field (e.g., using `ref.focus()`) to guide the user to the error.
