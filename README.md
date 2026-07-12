# AfriBridge AgroTrade

Production website for AfriBridge AgroTrade, an independent agro-commodity trade facilitator connecting credible Russian and international agro-commodity suppliers with qualified buyers across Africa.

## Local Development

Use Node.js `>=20.19.0`; Node 22 LTS is recommended.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` for local production-like testing and add these values in your deployment provider, such as Netlify or Vercel.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes for email delivery | Server-only API key for Resend email delivery. |
| `AFRIBRIDGE_FORM_FROM` | Yes for email delivery | Verified sender, for example `AfriBridge AgroTrade <forms@afribridgeagro.trade>`. |
| `AFRIBRIDGE_FORM_RECIPIENTS` | Recommended | Comma-separated recipients. Default intended recipients are `udo@afribridgeagro.trade,sulley@afribridgeagro.trade`. |
| `AFRIBRIDGE_ALLOWED_ORIGINS` | Yes in production | Comma-separated allowed form origins: `https://afribridgeagro.trade,https://www.afribridgeagro.trade`. |
| `AFRIBRIDGE_RATE_LIMIT_WINDOW_MS` | Optional | Rate-limit window. Default: `600000`. |
| `AFRIBRIDGE_RATE_LIMIT_MAX` | Optional | Max submissions per IP hash per window. Default: `5`. |
| `AFRIBRIDGE_RATE_LIMIT_SALT` | Recommended | Secret salt used when hashing IPs for rate limiting. |
| `AFRIBRIDGE_FORM_WEBHOOK_URL` | Optional | HTTPS fallback delivery endpoint. |
| `AFRIBRIDGE_FORM_WEBHOOK_TOKEN` | Optional | Bearer token for the fallback webhook. |

The Resend API key is never exposed to the browser. Form submissions are validated server-side before delivery. Do not enter placeholder text such as `your_resend_api_key`; Netlify must contain a real Resend key with permission to send from the verified sender domain.

## Vercel Deployment

1. Push this repository to GitHub.
2. In Vercel, create a new project from the repository.
3. Set the framework preset to `Next.js`.
4. Use the default commands:
   - Install: `npm install`
   - Build: `npm run build`
   - Output: `.next`
5. Set Node.js to version 22, or any version `>=20.19.0`.
6. Add the environment variables listed above in Vercel Project Settings.
7. Deploy a preview build and test both forms before assigning the production domain.

References:
- Vercel Next.js deployment docs: https://vercel.com/docs/frameworks/full-stack/nextjs
- Vercel environment variable docs: https://vercel.com/docs/environment-variables

## Custom Domain: afribridgeagro.trade

1. In Vercel, open Project Settings, then Domains.
2. Add `afribridgeagro.trade`.
3. Add `www.afribridgeagro.trade` and configure it to redirect to the apex domain, or choose the opposite canonical preference.
4. At the domain registrar, set the DNS records Vercel provides. Typical records are:
   - Apex `A` record to Vercel's provided IP.
   - `www` `CNAME` record to Vercel's provided CNAME target.
5. Wait for DNS propagation and Vercel SSL certificate provisioning.
6. Confirm both `https://afribridgeagro.trade` and `https://www.afribridgeagro.trade` resolve over HTTPS.
7. Ensure `AFRIBRIDGE_ALLOWED_ORIGINS` includes the final production origins.

Reference:
- Vercel domains docs: https://vercel.com/docs/domains

## Netlify Deployment

Use [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) for the full step-by-step Netlify launch guide, including build settings, environment variables, form email delivery, custom domain setup, DNS options, and launch checks.

This repository includes [netlify.toml](./netlify.toml) with the production build command, `.next` publish directory, Node 22, and Netlify Next.js skew protection enabled.

## Production Verification

Run before launch:

```bash
npm audit
npm run typecheck
npm run lint
npm run build
npm start
```

Then verify:

- Homepage returns HTTP 200.
- Legal pages return HTTP 200.
- Buyer form validates required fields.
- Supplier form validates required fields.
- Successful submissions arrive at `udo@afribridgeagro.trade` and `sulley@afribridgeagro.trade`.
- Failed delivery shows a clear failure state.
- Rate limiting blocks repeated rapid submissions.
- Copy describes AfriBridge AgroTrade only as an independent trade facilitator.
- No page claims commodity ownership, guaranteed allocation, producer status, direct seller status, exporter status, or supplier mandate status.

## Launch Checklist

- Confirm company name: AfriBridge AgroTrade.
- Confirm primary email: `udo@afribridgeagro.trade`.
- Confirm trade contact: `sulley@afribridgeagro.trade`.
- Confirm call phone: `+7 916 947 5366`.
- Confirm WhatsApp: `+7 993 339 2055`.
- Confirm location: Moscow, Russian Federation.
- Verify Resend sender domain for `afribridgeagro.trade`.
- Add SPF, DKIM, and DMARC DNS records required by the email provider.
- Configure production environment variables in the deployment provider.
- Submit one real buyer test and one supplier test.
- Review the deployed desktop, tablet, and mobile pages.
- Confirm Netlify SSL is active for the custom domain.
