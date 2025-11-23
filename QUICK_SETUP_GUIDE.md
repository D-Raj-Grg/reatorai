# Quick Setup Guide - Launch Infrastructure

Fast-track guide to get analytics and email templates live in production.

---

## 30-Minute Setup Checklist

### Step 1: PostHog Analytics (10 minutes)

**1.1 Create PostHog Account**
1. Go to [posthog.com](https://posthog.com)
2. Sign up (use your work email)
3. Create project: "ReatorAI Production"
4. Copy Project API Key (starts with `phc_`)

**1.2 Add Environment Variables**

Local (.env.local):
```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_KEY_HERE
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

Vercel (Production):
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select ReatorAI project
3. Settings → Environment Variables
4. Add:
   - `NEXT_PUBLIC_POSTHOG_KEY` = `phc_YOUR_KEY_HERE`
   - `NEXT_PUBLIC_POSTHOG_HOST` = `https://app.posthog.com`
5. Apply to: Production, Preview, Development
6. Click "Save"

**1.3 Deploy**
```bash
git add .
git commit -m "feat: add PostHog analytics"
git push origin main
```

**1.4 Verify**
1. Visit your production URL
2. Open DevTools → Network tab
3. Filter by "posthog"
4. Click around the app
5. See requests to `app.posthog.com`
6. Check PostHog dashboard → Live Events

✅ Analytics tracking now active!

---

### Step 2: Email Templates (15 minutes)

**2.1 Access Supabase**
1. Go to [app.supabase.com](https://app.supabase.com)
2. Select ReatorAI project
3. Click "Authentication" in sidebar
4. Click "Email Templates"

**2.2 Update Confirmation Email**
1. Select "Confirm signup"
2. Copy template from `/docs/email-templates.md` (Section 1)
3. Paste into Supabase editor
4. Update subject line if desired
5. Click "Save"

**2.3 Update Password Reset Email**
1. Select "Reset password"
2. Copy template from `/docs/email-templates.md` (Section 2)
3. Paste into Supabase editor
4. Click "Save"

**2.4 Update Email Change Email**
1. Select "Change email address"
2. Copy template from `/docs/email-templates.md` (Section 3)
3. Paste into Supabase editor
4. Click "Save"

**2.5 Update Magic Link Email** (Optional)
1. Select "Magic Link"
2. Copy template from `/docs/email-templates.md` (Section 4)
3. Paste into Supabase editor
4. Click "Save"

**2.6 Test Emails**
1. Use Supabase "Send Test Email" button
2. Check your inbox
3. Verify formatting looks good
4. Click links to verify they work

✅ Professional email templates live!

---

### Step 3: Vercel Analytics (5 minutes)

**3.1 Enable Web Analytics**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select ReatorAI project
3. Click "Analytics" tab
4. Click "Enable Analytics"
5. Choose plan (Free: 100k events/month)

**3.2 Enable Speed Insights**
1. In same project
2. Click "Speed Insights" tab
3. Click "Enable Speed Insights"
4. Free on all plans!

**3.3 Verify**
1. Visit production URL
2. Navigate between pages
3. Wait 5-10 minutes
4. Check Vercel Dashboard → Analytics
5. See page views appearing

✅ Web analytics tracking!

---

## Next: Integrate Analytics Events (Optional but Recommended)

### Quick Wins (Add These First)

**1. Track Sign Ups** (src/app/auth/callback/route.ts)
```typescript
import { analytics } from '@/lib/analytics/posthog'

// After successful signup
analytics.userSignedUp(user.id, user.email)
```

**2. Track Channel Adds** (src/hooks/use-channels.ts)
```typescript
import { analytics } from '@/lib/analytics/posthog'

// In onSuccess callback
analytics.channelAdded(channel.id, channel.title)
```

**3. Track Script Generation** (src/hooks/use-scripts.ts)
```typescript
import { analytics } from '@/lib/analytics/posthog'

// After script generates
analytics.scriptGenerated(script.id, hookFormat, framework, duration)
```

See `/docs/analytics-integration-examples.md` for complete guide.

---

## Documentation Access

All user-facing documentation is ready:
- `/docs/getting-started.md` - User onboarding
- `/docs/faq.md` - 50+ common questions
- `/docs/troubleshooting.md` - Problem resolution
- `/docs/features/` - Detailed feature guides

**Host Options:**

**Option A: Notion (Recommended for MVP)**
1. Create public Notion workspace
2. Import markdown files
3. Share public links
4. Add links to app footer

**Option B: GitHub Pages (Free)**
1. Enable GitHub Pages in repo settings
2. Point to `/docs` folder
3. Accessible at `yourusername.github.io/reatorai`

**Option C: Vercel (Same Host as App)**
1. Create `/docs` route in Next.js
2. Use markdown parser library
3. Fully integrated with app

---

## Pre-Launch Testing

Before going live, complete these critical checks:

### 1. Test Sign-Up Flow
- [ ] Can create new account
- [ ] Confirmation email arrives (<5 min)
- [ ] Email looks professional
- [ ] Confirmation link works
- [ ] Redirected to dashboard

### 2. Test Core Features
- [ ] Can add YouTube channel
- [ ] Channel syncs successfully
- [ ] Can view outlier videos
- [ ] Can analyze a video
- [ ] Can generate a script
- [ ] Can copy/download script

### 3. Test Analytics
- [ ] PostHog shows live events
- [ ] Vercel shows page views
- [ ] No console errors
- [ ] Network requests succeed

### 4. Test on Mobile
- [ ] Sign up works on mobile
- [ ] Navigation works
- [ ] Forms are usable
- [ ] No horizontal scrolling

### 5. Run Lighthouse
```bash
# In browser
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Mobile" and "Desktop"
4. Click "Analyze page load"
5. Aim for >90 in all categories
```

---

## Launch Day Checklist (1 Hour Before)

- [ ] All environment variables set
- [ ] Analytics tracking working
- [ ] Email templates updated
- [ ] No console errors in production
- [ ] Mobile experience tested
- [ ] Support email (support@reatorai.com) monitored
- [ ] PostHog dashboard open
- [ ] Vercel dashboard open
- [ ] Ready to respond to users

---

## Monitoring During Launch

**Keep These Open:**
1. **PostHog Dashboard** → Live Events
   - Watch for sign-ups
   - Track feature usage
   - Identify issues (low completion rates)

2. **Vercel Dashboard** → Analytics
   - Monitor page views
   - Track traffic sources
   - Watch error rates

3. **Vercel Dashboard** → Logs
   - Monitor for errors
   - Check API response times
   - Watch for failures

4. **Email Inbox** (support@reatorai.com)
   - Respond to questions quickly
   - Note common issues
   - Collect feedback

---

## Common Issues & Quick Fixes

### Analytics Not Tracking

**Check:**
1. Environment variables set in Vercel
2. Variables start with `NEXT_PUBLIC_`
3. Deployment successful after adding variables
4. Browser not blocking PostHog (try incognito)

**Fix:**
```bash
# Verify variables in Vercel
vercel env ls

# Redeploy
git commit --allow-empty -m "redeploy"
git push origin main
```

### Emails Not Sending

**Check:**
1. Templates saved in Supabase
2. `{{ .ConfirmationURL }}` variable present
3. SMTP settings configured (Supabase handles this)
4. User email valid

**Fix:**
- Test with "Send Test Email" in Supabase
- Check spam folder
- Try different email address

### High Error Rate

**Check:**
1. Vercel Logs for specific errors
2. Browser console for client errors
3. Supabase logs for database errors

**Fix:**
- Roll back to previous deployment if critical
- Fix and redeploy quickly
- Communicate with users

---

## Success Metrics to Track

**First 24 Hours:**
- [ ] 50+ sign-ups
- [ ] <5% error rate
- [ ] All core features working
- [ ] Positive user feedback

**First Week:**
- [ ] 500+ sign-ups
- [ ] 100+ active users
- [ ] 10+ scripts generated per day
- [ ] No critical bugs

---

## Support Resources

**Documentation:**
- [Full Analytics Setup](/docs/analytics-setup.md)
- [Email Templates](/docs/email-templates.md)
- [Integration Examples](/docs/analytics-integration-examples.md)
- [Pre-Launch Checklist](/PRE_LAUNCH_CHECKLIST.md)

**Dashboards:**
- [PostHog](https://app.posthog.com)
- [Vercel](https://vercel.com/dashboard)
- [Supabase](https://app.supabase.com)

**Help:**
- PostHog Docs: [posthog.com/docs](https://posthog.com/docs)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)

---

## What's Already Done

✅ PostHog integration code
✅ Analytics tracking functions (20+ events)
✅ Email templates (4 professional designs)
✅ User documentation (getting started, FAQs, troubleshooting)
✅ Feature guides (channels, videos, scripts, watchlists)
✅ Pre-launch checklist (300+ items)
✅ Integration examples for all events

**You just need to:**
1. Add API keys (PostHog)
2. Configure email templates (Supabase)
3. Enable Vercel analytics
4. Test everything
5. Launch!

---

## Need Help?

**Before Launch:**
- Review `/PRE_LAUNCH_CHECKLIST.md`
- Test on staging first
- Have rollback plan ready

**After Launch:**
- Monitor dashboards closely
- Respond to users quickly
- Fix bugs immediately
- Collect feedback

**Remember:**
- MVP doesn't need to be perfect
- Launch, learn, iterate
- User feedback is gold
- You can always improve

---

**Ready to launch? You've got this! 🚀**

---

*Created: November 23, 2025*
*Est. Setup Time: 30 minutes*
*Status: Production Ready*
