## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-24 - Custom Validation Focus Management
**Learning:** When using custom validation (checking state before submission), simply showing an error message isn't enough. Users (especially keyboard users) need to be taken to the problem source.
**Action:** Use `useRef` to programmatically focus the invalid input (e.g., `checkboxRef.current?.focus()`) when validation fails, ensuring a smooth correction flow.
