## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-22 - Form Submit Button Accessibility
**Learning:** Disabled submit buttons prevent users from discovering *why* a form is invalid, especially with non-obvious requirements like privacy checkboxes. Screen readers also often skip disabled elements.
**Action:** Keep submit buttons enabled (except during loading) and use `onClick` or `onSubmit` to validate and display explicit error messages with `role="alert"` for immediate feedback.
