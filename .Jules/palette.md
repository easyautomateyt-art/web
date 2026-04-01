## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-23 - Submit Button Accessibility
**Learning:** Disabling submit buttons prevents users from receiving validation feedback, leaving them confused about why the form is incomplete. Screen readers also often skip disabled elements.
**Action:** Keep submit buttons enabled and use `aria-disabled` if needed, but rely on clicking the button to trigger validation and announce errors via `role="alert"`.
