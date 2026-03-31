## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-22 - Contact Form Accessibility
**Learning:** Disabling submit buttons until validity is met creates poor UX and accessibility barriers, as users receive no feedback on what is missing.
**Action:** Keep submit buttons enabled and use `onClick` / `onSubmit` to trigger validation, show specific error messages with `role="alert"`, and programmatically focus the invalid field.
