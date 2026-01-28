## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-22 - Form Validation UX
**Learning:** Disabled submit buttons prevent users from understanding validation errors. Keeping them enabled and showing inline errors on click provides better feedback.
**Action:** Avoid disabling submit buttons for validation; use `triedSubmit` states to show errors instead.
