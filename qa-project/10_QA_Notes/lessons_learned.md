# QA Retro & Lessons Learned

## Defect Patterns Identified
* Lockout logic counters are prone to state leakage across sessions if a successful login doesn't explicitly wipe the failure registers in redis cache. This was identified and logged in **BUG_LOG_002**.
* Dark Mode color styling overrides often overlook input validation label tags. Ensure design tokens support automatic system theme detection.

## Recommendations
* Automate the brute force lockout checks on pull requests.
* Run visual comparison automated runs for login themes using Applitools.
