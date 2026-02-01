## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-23 - Form Submission & Validation UX
**Learning:** Disabling submit buttons based on form state creates a barrier where users may not understand why they cannot proceed. This is often an anti-pattern for accessibility and usability.
**Action:** Keep submit buttons enabled (except during loading). On click, trigger validation, display clear error messages with `role="alert"`, and programmatically shift focus to the first invalid field to guide the user.
