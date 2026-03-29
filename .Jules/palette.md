## 2025-05-22 - Mobile Navigation Accessibility
**Learning:** The custom hamburger menu implementation lacked ARIA labels and state indicators (`aria-expanded`), making it inaccessible to screen readers. It also lacked visible focus states for keyboard navigation.
**Action:** Always add `aria-label` (localized), `aria-expanded`, and visible focus rings (`focus:ring-[#00E8E5]`) to custom toggle buttons, especially in navigation headers.

## 2025-05-23 - Status Message Accessibility
**Learning:** Dynamic status messages (success/error feedback) were implemented as static `<div>` elements, preventing screen readers from announcing them.
**Action:** Use `role="status"` for success/info messages (implicit polite announcement) and `role="alert"` for error/critical messages (implicit assertive announcement) to ensure accessible feedback.
