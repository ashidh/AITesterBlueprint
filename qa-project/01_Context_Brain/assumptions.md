# Assumptions & Project Parameters

* **Authentication Storage:** User credentials are securely validated over encrypted SSL/TLS channels.
* **Cookies Integration:** The 'Remember Me' feature is dependent on local browser cookies configured with a default lifetime (assumed 14 days).
* **MFA Trigger:** If 2FA is active on an account, redirect user to code prompt screen immediately post-credentials check.
* **SMTP Delivery:** Email reset links are dispatched via dedicated transactional email systems with a delivery target of < 1 minute.
