## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-23 - Form Validation & Accessibility
**Learning:** Disabling submit buttons until validation passes prevents users from understanding *why* they can't submit (missing requirements). Also, default checkboxes (`h-4`) are too small for touch targets.
**Action:** Keep submit buttons enabled and show inline errors on click. Use `h-5 w-5` and `accent-[#00E8E5]` for accessible checkboxes with clear focus states. Use `role="alert"` for error messages.
