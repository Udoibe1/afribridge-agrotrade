# Netlify Deployment Guide

This guide explains how to deploy AfriBridge AgroTrade to Netlify step by step.

The project is a Next.js App Router site with an API route at `/api/inquiries`. Netlify supports modern Next.js applications with zero configuration through its OpenNext adapter, including App Router and route handlers. Do not add or pin `@netlify/plugin-nextjs` unless Netlify support specifically asks you to.

## 1. Confirm The Project Is Ready

From the project folder, run:

```bash
npm install
npm audit
npm run typecheck
npm run lint
npm run build
```

All commands should pass before deployment.

This project requires Node.js `>=20.19.0`. Node 22 LTS is recommended.

## 2. Push The Project To GitHub

Netlify deploys most cleanly from a Git provider.

1. Create a GitHub repository for `afribridge-agrotrade`.
2. Push this project to that repository.
3. Confirm GitHub contains:
   - `package.json`
   - `package-lock.json`
   - `src/`
   - `.env.example`
   - `README.md`
   - `NETLIFY_DEPLOYMENT.md`
4. Confirm GitHub does not contain:
   - `.env`
   - `.env.local`
   - real API keys
   - `node_modules`
   - `.next`

## 3. Create A New Netlify Project

1. Sign in to Netlify.
2. Select **Add new project**.
3. Select **Import an existing project**.
4. Choose GitHub as the Git provider.
5. Authorize Netlify to access the repository if prompted.
6. Select the `afribridge-agrotrade` repository.

## 4. Configure Build Settings

Netlify should auto-detect the project as Next.js.

Use these settings:

| Setting | Value |
| --- | --- |
| Framework preset | `Next.js` |
| Base directory | leave empty |
| Build command | `npm run build` |
| Publish directory | use Netlify's auto-detected Next.js value; if Netlify asks explicitly, use `.next` |
| Node version | `22` |

Do not use `next export` or an `out` publish directory. This site uses a server API route for secure form delivery, so it must deploy as a Next.js site, not as a static export.

## 5. Set Environment Variables

In Netlify:

1. Open the project.
2. Go to **Project configuration**.
3. Go to **Environment variables**.
4. Add the variables below.
5. Mark secret values as sensitive where Netlify provides that option.
6. Apply them to Production and Deploy Previews unless you intentionally want different values.

Required for email delivery:

```bash
RESEND_API_KEY=your_resend_api_key
AFRIBRIDGE_FORM_FROM=AfriBridge AgroTrade <forms@afribridgeagro.trade>
AFRIBRIDGE_FORM_RECIPIENTS=udo@afribridgeagro.trade,sulley@afribridgeagro.trade
AFRIBRIDGE_ALLOWED_ORIGINS=https://afribridgeagro.trade,https://www.afribridgeagro.trade,https://YOUR-NETLIFY-SITE.netlify.app
AFRIBRIDGE_RATE_LIMIT_SALT=use-a-long-random-secret
```

Optional:

```bash
AFRIBRIDGE_RATE_LIMIT_WINDOW_MS=600000
AFRIBRIDGE_RATE_LIMIT_MAX=5
AFRIBRIDGE_FORM_WEBHOOK_URL=
AFRIBRIDGE_FORM_WEBHOOK_TOKEN=
NETLIFY_NEXT_SKEW_PROTECTION=true
```

Important notes:

- `RESEND_API_KEY` must stay secret.
- `AFRIBRIDGE_FORM_FROM` must use a sender address verified in Resend.
- `AFRIBRIDGE_ALLOWED_ORIGINS` must include the temporary Netlify URL during testing, then the final custom domain after launch.
- After changing environment variables, trigger a new deploy.

## 6. Verify Email Sending Before Custom Domain Launch

Before pointing `afribridgeagro.trade` to Netlify, test the form on the temporary Netlify URL.

1. Open the temporary Netlify URL, for example `https://YOUR-NETLIFY-SITE.netlify.app`.
2. Submit a buyer inquiry with test data.
3. Confirm the form shows a success message.
4. Confirm the email arrives at:
   - `udo@afribridgeagro.trade`
   - `sulley@afribridgeagro.trade`
5. Submit a supplier partnership form with test data.
6. Confirm the second email arrives.
7. Submit an empty form.
8. Confirm validation errors are shown and no email is sent.

If a valid submission says delivery is not configured, check:

- `RESEND_API_KEY`
- `AFRIBRIDGE_FORM_FROM`
- `AFRIBRIDGE_FORM_RECIPIENTS`
- Resend domain verification
- Netlify deploy logs
- Netlify function logs for `/api/inquiries`

## 7. Add The Custom Domain

In Netlify:

1. Open the project.
2. Go to **Domain management**.
3. Select **Add a domain**.
4. Add `afribridgeagro.trade`.
5. Add `www.afribridgeagro.trade`.
6. Choose the primary domain.

Recommended setup:

- Primary domain: `https://www.afribridgeagro.trade`
- Redirect apex domain: `https://afribridgeagro.trade` to `https://www.afribridgeagro.trade`

Netlify recommends using the `www` subdomain as primary when using an external DNS provider because it can perform better with standard CNAME records. If you move DNS management to Netlify DNS, either apex or `www` can work well.

## 8. Configure DNS

You have two options.

### Option A: Use Netlify DNS

Use this if you want Netlify to manage the domain's DNS records.

1. In Netlify domain settings, choose Netlify DNS setup.
2. Netlify will provide nameservers.
3. Go to the domain registrar where `afribridgeagro.trade` was purchased.
4. Replace the current nameservers with Netlify's nameservers.
5. Wait for DNS propagation.
6. In Netlify, confirm the domain shows as configured.
7. Confirm Netlify issued the SSL certificate.

Before changing nameservers, copy any existing DNS records that must keep working, especially email records such as MX, SPF, DKIM, and DMARC.

### Option B: Keep External DNS

Use this if the registrar or another DNS provider will keep managing DNS.

At the DNS provider:

1. For `www.afribridgeagro.trade`, create a `CNAME` record pointing to your Netlify site URL:

```text
Name: www
Type: CNAME
Value: YOUR-NETLIFY-SITE.netlify.app
```

2. For `afribridgeagro.trade`, use one of these:

If the DNS provider supports ALIAS, ANAME, or CNAME flattening:

```text
Name: @
Type: ALIAS / ANAME / flattened CNAME
Value: apex-loadbalancer.netlify.com
```

If the DNS provider does not support ALIAS, ANAME, or CNAME flattening:

```text
Name: @
Type: A
Value: 75.2.60.5
```

3. Wait for DNS propagation.
4. In Netlify, check the domain status.
5. Confirm SSL is active.

DNS can take minutes to several hours. Netlify notes that propagation may take up to 48 hours.

## 9. Update Allowed Origins After Domain Setup

After the custom domain works, update:

```bash
AFRIBRIDGE_ALLOWED_ORIGINS=https://afribridgeagro.trade,https://www.afribridgeagro.trade,https://YOUR-NETLIFY-SITE.netlify.app
```

If you want to block direct submissions from the temporary Netlify URL after launch, remove:

```bash
https://YOUR-NETLIFY-SITE.netlify.app
```

Then redeploy.

## 10. Final Launch Checks

Open the production domain and verify:

1. `https://www.afribridgeagro.trade` loads.
2. `https://afribridgeagro.trade` redirects correctly or loads correctly, depending on the chosen primary domain.
3. SSL is active.
4. Navigation works on desktop and mobile.
5. The buyer form submits successfully.
6. The supplier form submits successfully.
7. Empty forms show validation errors.
8. Form emails reach both company contacts.
9. Privacy Policy, Terms of Use, Trade Facilitation Disclaimer, and Cookie Notice pages load.
10. The website still describes AfriBridge AgroTrade only as an independent trade facilitator.

## 11. If Deployment Fails

Check these items first:

1. Netlify build log: confirm `npm install` and `npm run build` completed.
2. Node version: confirm Netlify uses Node 22 or at least `20.19.0`.
3. Environment variables: confirm required variables exist in Netlify.
4. Form delivery: confirm Resend sender domain is verified.
5. API route: check Netlify function logs for `/api/inquiries`.
6. Domain: confirm DNS records match the selected setup.

## References

- Netlify Next.js docs: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- Netlify environment variables docs: https://docs.netlify.com/build/environment-variables/overview/
- Netlify domain setup docs: https://docs.netlify.com/manage/domains/get-started-with-domains/
