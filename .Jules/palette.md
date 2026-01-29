## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-23 - Form Validation UX
**Learning:** Disabled submit buttons prevent users from understanding validation errors, especially for non-text inputs like checkboxes. HTML5 validation intercepts submission before custom handlers, requiring all `required` fields to be filled to test custom validation logic.
**Action:** Keep submit buttons enabled and use `onClick` or `onSubmit` to validate and show specific error messages. Ensure automated tests fill `required` fields before asserting custom validation.
