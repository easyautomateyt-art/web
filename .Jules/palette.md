## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-22 - Form Validation UX
**Learning:** Disabling submit buttons until all custom validation passes (e.g., checkboxes) prevents users from understanding *why* they cannot submit. It also creates accessibility barriers.
**Action:** Keep submit buttons enabled and use `onClick` or `onSubmit` to validate custom logic. Display error messages with `role="alert"` and programmatic focus management (focusing the invalid input) to ensure immediate feedback for all users.
