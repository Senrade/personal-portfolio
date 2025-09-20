# Pre-Launch Checklist

## Manual Checks

-   [ ] **Content Proofreading:** Read through all text content on the site. Check for typos and grammatical errors.
-   [ ] **Cross-Browser Testing:**
    -   [ ] Chrome (Latest)
    -   [ ] Firefox (Latest)
    -   [ ] Safari (Latest)
    -   [ ] Edge (Latest)
-   [ ] **Device Testing:**
    -   [ ] Desktop (Large screen)
    -   [ ] Laptop (Medium screen)
    -   [ ] Tablet (e.g., iPad)
    -   [ ] Mobile (e.g., iPhone, Android)
-   [ ] **Accessibility Manual Checks:**
    -   [ ] Navigate the entire site using only the keyboard. Is every interactive element reachable and usable?
    -   [ ] Check that all images have meaningful `alt` text.
    -   [ ] Verify color contrast using a browser extension (like WAVE or Axe).
-   [ ] **Form Submission:** Send a test message through the contact form and confirm it is received.
-   [ ] **Link Checking:** Click every link (internal and external) to ensure it works.

## Automated Checks & Configuration

-   [ ] **CI/CD Pipeline:** Ensure the GitHub Actions workflow passes for the `main` branch.
-   [ ] **Lighthouse Scores:**
    -   [ ] Run a final Lighthouse report. Performance, Accessibility, Best Practices, and SEO should all be >= 90.
-   [ ] **DNS Configuration:**
    -   [ ] Point your domain's A record or CNAME to the hosting provider (Netlify/Vercel).
-   [ ] **HTTPS/TLS:** Confirm that the hosting provider has issued an SSL certificate and the site is served over `https://`.
-   [ ] **Environment Variables:**
    -   [ ] Ensure `SENDGRID_API_KEY` (or equivalent) is set in the production environment variables, NOT committed to the repo.

## Post-Launch Monitoring

-   [ ] **Analytics:** If using analytics, confirm that visits are being tracked correctly.
-   [ ] **Error Tracking:** If using a tool like Sentry, confirm it's configured and ready to catch errors.
-   [ ] **Uptime Monitoring:** Set up a free uptime monitor (like UptimeRobot) to get alerted if the site goes down.