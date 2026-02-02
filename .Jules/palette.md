## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-23 - Form Validation UX & Checkbox Styling
**Learning:** Disabled submit buttons prevent users from discovering validation errors (like unchecked privacy policy). Checkboxes default to small sizes and lack focus rings.
**Action:** Keep submit buttons enabled to allow click-validation. Style checkboxes with `h-5 w-5`, `cursor-pointer`, `accent-[#00E8E5]`, and `focus:ring-[#00E8E5]`.
