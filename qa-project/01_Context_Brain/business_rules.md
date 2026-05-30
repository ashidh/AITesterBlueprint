# Business Rules: app.vwo.com Login

## Authentication Logic
1. **Valid Login:**
   * User provides valid registered email and password.
   * Clicks 'Sign In'.
   * Redirected immediately to Core Platform Dashboard (`/dashboard`).
2. **Invalid Login:**
   * User provides incorrect email format, wrong password, or leaves fields empty.
   * Clicks 'Sign In'.
   * Denied access. User remains on login screen.
   * Displays appropriate validation text or account warning banners.

## Security Constraints
* **Brute Force Lockout:** Five consecutive incorrect attempts results in temporary 15-minute account lock.
* **Password Field Masking:** Password text must be hidden by default with toggling option.
