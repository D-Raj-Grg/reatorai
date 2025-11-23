# Troubleshooting Guide

Common issues and solutions for ReatorAI users.

---

## Table of Contents
1. [Account & Authentication](#account--authentication)
2. [Channel Management](#channel-management)
3. [Video Sync & Analysis](#video-sync--analysis)
4. [Script Generation](#script-generation)
5. [Performance Issues](#performance-issues)
6. [Billing & Subscriptions](#billing--subscriptions)
7. [Getting More Help](#getting-more-help)

---

## Account & Authentication

### Can't Sign Up / Email Not Received

**Problem**: Not receiving confirmation email after signup

**Solutions:**
1. **Check spam/junk folder** - Our emails sometimes get filtered
2. **Whitelist our email** - Add noreply@reatorai.com to contacts
3. **Check email spelling** - Verify you entered correct email
4. **Wait 5 minutes** - Emails can be delayed
5. **Try resending** - Click "Resend confirmation" on login page

**Still not working?**
- Use a different email provider (Gmail, Outlook work best)
- Contact support@reatorai.com with the email you tried

---

### Can't Log In

**Problem**: "Invalid email or password" error

**Solutions:**
1. **Verify credentials** - Check email and password spelling
2. **Caps lock** - Ensure caps lock is off
3. **Password manager** - If using one, verify saved credentials
4. **Reset password** - Click "Forgot password?" link
5. **Try different browser** - Clear cache or use incognito mode

**If account was just created:**
- Verify email first (check inbox for confirmation link)
- Can't log in until email is verified

---

### Forgot Password

**Steps:**
1. Go to login page
2. Click "Forgot password?"
3. Enter your email address
4. Check email for reset link (arrives within 5 minutes)
5. Click link to create new password
6. New password must be at least 8 characters

**Email not arriving?**
- Check spam folder
- Wait up to 10 minutes
- Try again with correct email
- Contact support if still not receiving

---

### Account Locked / Suspended

**Reasons accounts get locked:**
- Multiple failed login attempts (wait 30 minutes)
- Suspicious activity detected (contact support)
- Payment issue (update billing info)
- Terms of Service violation (contact support)

**Solution:**
Email support@reatorai.com with:
- Your account email
- Description of issue
- Any error messages received

---

## Channel Management

### Can't Add Channel

**Problem**: "Unable to add channel" or error message

**Common causes & solutions:**

**1. Invalid URL**
- ✅ Use: `https://youtube.com/@CreatorName`
- ❌ Avoid: Video URLs, search URLs, playlist URLs

**2. Channel Limit Reached**
- Check your plan limits (Settings > Subscription)
- Remove unused channels or upgrade plan

**3. Private/Deleted Channel**
- Verify channel exists and is public
- Try accessing on YouTube first

**4. Duplicate Channel**
- Channel already added to your account
- Check Channels page or search

**5. API Rate Limit**
- Too many requests in short time
- Wait 5 minutes and try again

**6. Network Issue**
- Check your internet connection
- Try refreshing the page
- Use different browser/device

---

### Channel Won't Sync / No Videos Appearing

**Problem**: Added channel but no videos showing

**Step-by-step troubleshooting:**

**1. Wait for Initial Sync (5-10 minutes)**
- Initial sync takes time for large channels
- Check back in 10 minutes
- Notification will appear when complete

**2. Manual Refresh**
- Click refresh icon on channel card
- Wait for "Sync complete" toast
- Check videos page

**3. Verify Channel Has Videos**
- Go to channel on YouTube
- Confirm videos exist and are public
- Some channels have only private videos

**4. Check Sync Status**
- Click on channel to see details
- Look for "Last synced" timestamp
- Error messages will show here

**5. API Quota Reached**
- Rare, but possible on free plans
- Resets daily at midnight PT
- Upgrade for higher quotas

**Still not working?**
- Try removing and re-adding channel
- Contact support with channel URL

---

### Stats Not Updating

**Problem**: View counts, subscriber counts seem outdated

**Expected behavior:**
- Stats update once per day (automatic)
- Manual sync updates immediately
- May take 5-10 minutes to reflect

**Solutions:**
1. **Manual refresh** - Click sync icon on channel
2. **Clear cache** - Refresh page (Cmd+Shift+R / Ctrl+Shift+F5)
3. **Wait 24 hours** - Stats are cached for performance
4. **Verify on YouTube** - Ensure YouTube shows different numbers

**Note**: Some stats update slower on YouTube's end, not an app issue.

---

### Outliers Not Being Detected

**Problem**: Videos clearly performing well but not marked as outliers

**Why this happens:**

**1. Not Enough Data**
- Need at least 10 videos to calculate baseline
- New channels may take 24 hours
- Solution: Wait for more videos to sync

**2. Consistent Performance**
- Channel's videos all perform similarly
- Outlier threshold (2x average) not reached
- Solution: This is expected - channel is consistently good!

**3. Recent Videos**
- Very new videos (< 48 hours old) weighted differently
- May not have enough views yet
- Solution: Check back in 2-3 days

**4. Threshold Calculation**
- Outliers are relative to channel average
- 100k views may not be outlier if average is 200k
- Solution: Understand it's relative, not absolute

**Custom thresholds**: Available on Enterprise plans

---

## Video Sync & Analysis

### Video Has No Transcript

**Problem**: "Transcript unavailable" error when analyzing

**Why this happens:**
- Creator didn't enable captions/subtitles
- Video is in a language without auto-captions
- Very new video (transcripts process slower)

**Solutions:**
1. **Try another video** - Find similar content with transcript
2. **Wait 24 hours** - New videos may not have transcript yet
3. **Request creator add captions** - Comment on their video
4. **Manual analysis** - Watch video yourself and note patterns

**Which videos have transcripts?**
- Most English videos (auto-generated)
- Videos with manual captions
- Videos in major languages
- Older videos more likely

---

### Analysis Failed / Timed Out

**Problem**: "Analysis failed" or loading indefinitely

**Common causes:**

**1. API Timeout**
- Analysis takes too long (>60 seconds)
- Solution: Try again, usually works second time

**2. Transcript Too Long**
- Very long videos (>30 min) may fail
- Solution: Choose shorter videos (<15 min ideal)

**3. Network Interruption**
- Connection lost during analysis
- Solution: Refresh page and retry

**4. API Rate Limit**
- Reached analysis limit for the day
- Solution: Wait for daily reset or upgrade

**5. OpenAI API Issue**
- Rare, but OpenAI can have outages
- Solution: Check [status.openai.com](https://status.openai.com), try later

**Best practices:**
- Analyze videos 5-20 minutes long
- Stable internet connection
- Don't navigate away during analysis

---

### Analysis Results Seem Generic

**Problem**: AI analysis doesn't provide specific insights

**How to improve:**

**1. Choose Better Source Videos**
- Videos with detailed transcripts
- Clear structure and pacing
- Specific tactics (not just personality-driven)

**2. Re-run Analysis**
- AI generates fresh insights each time
- Try 2-3 times if first result is generic

**3. Analyze Multiple Outliers**
- Compare across 5-10 videos
- Look for patterns yourself
- AI helps, but human analysis matters too

**4. Use Longer Videos**
- More content = better analysis
- 10-20 minute videos ideal
- Very short videos (<3 min) limited data

**5. Supplement with Manual Review**
- Watch the video yourself
- Note specific tactics used
- Combine AI insights with your observations

---

## Script Generation

### Script Generation Failed

**Problem**: "Failed to generate script" error

**Common causes & solutions:**

**1. No Source Video Selected**
- Must select a video first
- Solution: Choose video from dropdown

**2. Video Has No Transcript**
- Can't generate without transcript
- Solution: Select different video with transcript

**3. Monthly Limit Reached**
- Used all script generations for the month
- Solution: Wait for reset or upgrade plan

**4. API Timeout**
- Generation took too long
- Solution: Try again (usually works)

**5. Network Issue**
- Connection lost during generation
- Solution: Refresh and retry

**Check limits:**
- Settings > Usage
- See remaining generations
- Resets monthly on billing date

---

### Script Doesn't Match Expected Style

**Problem**: Generated script tone/style not what you wanted

**Solutions:**

**1. Adjust Style Settings**
- Choose different tone (Casual, Professional, Enthusiastic, Educational)
- Adjust length (30s, 60s, 90s)
- Select different platform

**2. Try Different Framework**
- Each framework has different structure
- AIDA = persuasive
- PAS = problem-focused
- BAB = transformation-focused
- Test multiple to find fit

**3. Choose Different Hook Format**
- Hook sets tone for entire script
- Question hook = educational feel
- Bold statement = energetic feel
- Personal story = authentic feel

**4. Regenerate**
- AI creates unique content each time
- Try 2-3 generations with same settings
- Pick the best one

**5. Edit Manually**
- Scripts are starting points
- Customize to match your exact voice
- Add personal examples and stories

**Remember**: Scripts are meant to be edited and personalized!

---

### Script Is Too Long/Short

**Problem**: Script doesn't fit desired video length

**Solutions:**

**1. Adjust Length Setting**
- Before generation: Choose 30s, 60s, or 90s
- Re-generate with different length

**2. Edit Manually**
- Cut unnecessary sections
- Expand key points
- Add or remove examples

**3. Choose Different Framework**
- Some frameworks are naturally longer:
  - PASTOR = longest (60-90s)
  - HSO = medium (45-60s)
  - PAS = shorter (30-45s)

**4. Adjust Content Density**
- Remove tangents (make shorter)
- Add more detail (make longer)
- Balance speed vs. depth

**Timing notes:**
- Average speaking rate: 150 words per minute
- 30-second video: ~75 words
- 60-second video: ~150 words
- 90-second video: ~225 words

---

### Can't Copy or Download Script

**Problem**: Copy/download buttons not working

**Troubleshooting:**

**1. Browser Permissions**
- Allow clipboard access when prompted
- Check browser settings

**2. Browser Extension Conflict**
- Disable ad blockers temporarily
- Disable clipboard managers
- Try incognito/private mode

**3. Network Issue**
- Ensure script fully loaded
- Refresh page if partially loaded

**4. Alternative Methods**
- Select text manually and copy
- Try different download format
- Use different browser

**Supported browsers:**
- Chrome (recommended)
- Safari
- Firefox
- Edge

---

## Performance Issues

### Page Loading Slowly

**Problem**: App takes long to load or feels sluggish

**Quick fixes:**

**1. Clear Browser Cache**
- Chrome: Cmd+Shift+Del (Mac) / Ctrl+Shift+Del (Windows)
- Safari: Preferences > Privacy > Manage Website Data > Remove All
- Firefox: Preferences > Privacy & Security > Clear Data

**2. Disable Browser Extensions**
- Ad blockers can interfere
- Disable temporarily to test
- Re-enable one by one to identify culprit

**3. Close Unnecessary Tabs**
- Many open tabs = slower performance
- Close other apps using bandwidth
- Restart browser

**4. Check Internet Speed**
- Test at [fast.com](https://fast.com)
- Minimum 5 Mbps recommended
- Use wired connection if possible

**5. Update Browser**
- Use latest browser version
- Outdated browsers have issues
- Consider switching browsers

---

### Videos/Images Not Loading

**Problem**: Thumbnails or video previews not displaying

**Solutions:**

**1. Network Issue**
- Check internet connection
- Disable VPN temporarily
- Switch to different network

**2. YouTube API Issue**
- Thumbnail URLs come from YouTube
- If YouTube is slow, thumbnails load slowly
- Wait and refresh

**3. Browser Cache**
- Clear cache and reload
- Hard refresh: Cmd+Shift+R / Ctrl+Shift+F5

**4. Ad Blocker**
- May block YouTube content
- Whitelist reatorai.vercel.app
- Disable temporarily

---

### Infinite Loading / Stuck

**Problem**: Page stuck loading indefinitely

**Steps:**

**1. Refresh Page**
- Hard refresh: Cmd+Shift+R / Ctrl+Shift+F5
- Clears cached data

**2. Check Network Tab**
- Open browser DevTools (F12)
- Go to Network tab
- Look for failed requests (red)
- Screenshot and send to support

**3. Clear Storage**
- DevTools > Application > Clear Storage
- Or use incognito mode

**4. Different Browser/Device**
- Try mobile if on desktop
- Try desktop if on mobile
- Try different browser

**5. Check Service Status**
- [status.reatorai.com](https://status.reatorai.com) (coming soon)
- Our social media for announcements

---

## Billing & Subscriptions

### Payment Declined

**Problem**: Credit card declined during upgrade

**Common reasons:**

**1. Insufficient Funds**
- Check bank account balance
- Try different payment method

**2. Card Restrictions**
- Bank may block international payments
- Contact bank to approve transaction
- Use card that allows recurring billing

**3. Incorrect Details**
- Verify card number, CVV, expiry
- Check billing address matches card

**4. Card Not Supported**
- We accept Visa, Mastercard, Amex, Discover
- Prepaid cards may not work
- Try different card

**5. 3D Secure Required**
- Bank needs additional verification
- Check for SMS/email from bank
- Complete verification

**Still having issues?**
- Try PayPal (Pro/Enterprise)
- Contact support for manual invoice

---

### Charged Wrong Amount

**Problem**: Unexpected charge or incorrect amount

**Check:**
1. **Plan details** - Settings > Subscription
2. **Billing cycle** - Monthly vs. annual
3. **Recent changes** - Upgrades/downgrades
4. **Prorated charges** - Mid-cycle changes adjusted
5. **Tax** - Local taxes may be added

**Looks incorrect?**
Email support@reatorai.com with:
- Your account email
- Invoice number
- Expected vs. actual charge
- Screenshots of billing page

We'll investigate and refund if error.

---

### Can't Upgrade/Downgrade

**Problem**: Upgrade/downgrade button not working

**Solutions:**

**1. Payment Method Required**
- Add credit card before upgrading
- Go to Settings > Billing

**2. Already on Target Plan**
- Check current plan in Settings
- May already be upgraded

**3. Browser Issue**
- Clear cache and try again
- Try different browser
- Use incognito mode

**4. Active Subscription**
- Can't upgrade during trial
- Wait for trial to end
- Or contact support to convert early

---

### Want to Cancel Subscription

**To cancel:**
1. Go to Settings > Subscription
2. Click "Cancel Subscription"
3. Confirm cancellation
4. Access continues until end of period

**What happens:**
- No further charges
- Access until billing period ends
- Data retained for 30 days
- Can reactivate within 30 days

**Canceling by accident?**
Reactivate anytime before period ends:
- Settings > Subscription > Reactivate

---

## Getting More Help

### How to Contact Support

**Email Support:**
- support@reatorai.com
- Response within 24-48 hours
- Include as much detail as possible

**What to include:**
1. **Your account email**
2. **Description of issue**
3. **Steps to reproduce**
4. **Screenshots** (if applicable)
5. **Browser and device info**
6. **Error messages** (exact wording)

**Live Chat** (Pro/Enterprise):
- Click chat widget (bottom right)
- Available Mon-Fri, 9am-6pm PT

---

### Reporting a Bug

**To report bugs:**

**Email**: support@reatorai.com

**Include:**
1. **Detailed description** - What's happening vs. expected
2. **Steps to reproduce** - How we can see the issue
3. **Frequency** - Every time? Sometimes? Once?
4. **Environment**:
   - Browser (Chrome, Safari, etc.) and version
   - Operating system (Mac, Windows, iOS, Android)
   - Screen size
5. **Screenshots/video** - Show the issue
6. **Console errors**:
   - Open DevTools (F12)
   - Go to Console tab
   - Screenshot any red errors
7. **Your account email**

**Bug priority:**
- **Critical**: Can't use core features → Fixed within 24 hours
- **High**: Workaround exists → Fixed within 1 week
- **Medium**: Minor inconvenience → Fixed within 2 weeks
- **Low**: Cosmetic issues → Scheduled for future release

---

### Feature Requests

**Have an idea?**

**Submit to**: feedback@reatorai.com

**Include:**
1. **Feature description** - What you want
2. **Use case** - Why you need it
3. **Current workaround** - How you handle it now
4. **Expected benefit** - How it would help

**We review all requests!**
Popular requests get prioritized.

---

### Community Support

**Coming soon:**
- Discord community
- User forums
- Video tutorials
- Webinars

Join waitlist: community@reatorai.com

---

## Still Stuck?

If this guide didn't solve your issue:

1. **Email**: support@reatorai.com
2. **Include**: Account email, detailed description, screenshots
3. **Response**: Within 24-48 hours (faster for paid plans)

We're here to help! 🚀

---

*Last Updated: November 23, 2025*
*Have a troubleshooting tip to add? Email feedback@reatorai.com*
