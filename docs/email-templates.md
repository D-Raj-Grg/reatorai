# Email Templates

Email templates for Supabase Auth and transactional emails.

---

## Supabase Auth Email Templates

These templates are configured in **Supabase Dashboard → Authentication → Email Templates**.

### How to Update Templates

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your ReatorAI project
3. Navigate to **Authentication** in the sidebar
4. Click **Email Templates**
5. Select the template to edit
6. Paste the HTML below
7. Click **Save**

---

## 1. Confirmation / Welcome Email

**When sent**: New user signs up and needs to verify email

**Subject**: `Welcome to ReatorAI - Confirm Your Email`

**Template**:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ReatorAI</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Welcome to ReatorAI</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">Hi there,</p>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                Thanks for signing up for ReatorAI! We're excited to help you discover viral content and generate winning scripts.
              </p>

              <p style="margin: 0 0 30px; font-size: 16px; line-height: 24px; color: #374151;">
                Click the button below to confirm your email address and start your journey to viral content:
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 0 auto;">
                <tr>
                  <td style="border-radius: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <a href="{{ .ConfirmationURL }}"
                       style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                      Confirm Your Email
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 20px; font-size: 14px; line-height: 20px; color: #6b7280;">
                Or copy and paste this link into your browser:
              </p>

              <p style="margin: 0 0 30px; font-size: 14px; line-height: 20px; color: #3b82f6; word-break: break-all;">
                {{ .ConfirmationURL }}
              </p>

              <p style="margin: 0 0 10px; font-size: 16px; line-height: 24px; color: #374151;">
                Once confirmed, you can:
              </p>

              <ul style="margin: 0 0 30px; padding-left: 20px; font-size: 16px; line-height: 24px; color: #374151;">
                <li style="margin-bottom: 8px;">Track up to 5 YouTube channels</li>
                <li style="margin-bottom: 8px;">Discover outlier videos automatically</li>
                <li style="margin-bottom: 8px;">Analyze what makes content viral</li>
                <li style="margin-bottom: 8px;">Generate 20 custom scripts per month</li>
              </ul>

              <p style="margin: 0 0 10px; font-size: 16px; line-height: 24px; color: #374151;">
                Happy creating!
              </p>

              <p style="margin: 0; font-size: 16px; line-height: 24px; color: #374151; font-weight: 600;">
                The ReatorAI Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; font-size: 14px; line-height: 20px; color: #6b7280;">
                This email was sent to {{ .Email }}
              </p>
              <p style="margin: 0 0 10px; font-size: 14px; line-height: 20px; color: #6b7280;">
                ReatorAI • AI-Powered Viral Content Research
              </p>
              <p style="margin: 0; font-size: 14px; line-height: 20px;">
                <a href="https://reatorai.vercel.app" style="color: #667eea; text-decoration: none;">Visit Website</a> •
                <a href="https://reatorai.vercel.app/docs" style="color: #667eea; text-decoration: none;">Help Center</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 2. Password Reset Email

**When sent**: User requests password reset

**Subject**: `Reset Your ReatorAI Password`

**Template**:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Reset Your Password</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">Hi there,</p>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                You recently requested to reset your password for your ReatorAI account.
              </p>

              <p style="margin: 0 0 30px; font-size: 16px; line-height: 24px; color: #374151;">
                Click the button below to create a new password:
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 0 auto;">
                <tr>
                  <td style="border-radius: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <a href="{{ .ConfirmationURL }}"
                       style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 20px; font-size: 14px; line-height: 20px; color: #6b7280;">
                Or copy and paste this link into your browser:
              </p>

              <p style="margin: 0 0 30px; font-size: 14px; line-height: 20px; color: #3b82f6; word-break: break-all;">
                {{ .ConfirmationURL }}
              </p>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                <strong>Important:</strong> This link will expire in 1 hour for security reasons.
              </p>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.
              </p>

              <p style="margin: 0 0 10px; font-size: 16px; line-height: 24px; color: #374151;">
                Best regards,
              </p>

              <p style="margin: 0; font-size: 16px; line-height: 24px; color: #374151; font-weight: 600;">
                The ReatorAI Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; font-size: 14px; line-height: 20px; color: #6b7280;">
                This email was sent to {{ .Email }}
              </p>
              <p style="margin: 0 0 10px; font-size: 14px; line-height: 20px; color: #6b7280;">
                ReatorAI • AI-Powered Viral Content Research
              </p>
              <p style="margin: 0; font-size: 14px; line-height: 20px;">
                <a href="https://reatorai.vercel.app" style="color: #667eea; text-decoration: none;">Visit Website</a> •
                <a href="https://reatorai.vercel.app/docs" style="color: #667eea; text-decoration: none;">Help Center</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 3. Email Change Confirmation

**When sent**: User changes their email address

**Subject**: `Confirm Your New Email Address`

**Template**:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm New Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Confirm Your New Email</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">Hi there,</p>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                You recently requested to change the email address associated with your ReatorAI account.
              </p>

              <p style="margin: 0 0 30px; font-size: 16px; line-height: 24px; color: #374151;">
                Click the button below to confirm this new email address:
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 0 auto;">
                <tr>
                  <td style="border-radius: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <a href="{{ .ConfirmationURL }}"
                       style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                      Confirm New Email
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 20px; font-size: 14px; line-height: 20px; color: #6b7280;">
                Or copy and paste this link into your browser:
              </p>

              <p style="margin: 0 0 30px; font-size: 14px; line-height: 20px; color: #3b82f6; word-break: break-all;">
                {{ .ConfirmationURL }}
              </p>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                If you didn't request this email change, please contact our support team immediately at support@reatorai.com.
              </p>

              <p style="margin: 0 0 10px; font-size: 16px; line-height: 24px; color: #374151;">
                Best regards,
              </p>

              <p style="margin: 0; font-size: 16px; line-height: 24px; color: #374151; font-weight: 600;">
                The ReatorAI Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; font-size: 14px; line-height: 20px; color: #6b7280;">
                This email was sent to {{ .Email }}
              </p>
              <p style="margin: 0 0 10px; font-size: 14px; line-height: 20px; color: #6b7280;">
                ReatorAI • AI-Powered Viral Content Research
              </p>
              <p style="margin: 0; font-size: 14px; line-height: 20px;">
                <a href="https://reatorai.vercel.app" style="color: #667eea; text-decoration: none;">Visit Website</a> •
                <a href="https://reatorai.vercel.app/docs" style="color: #667eea; text-decoration: none;">Help Center</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 4. Magic Link Email (Passwordless Login)

**When sent**: User requests magic link for passwordless sign-in

**Subject**: `Your ReatorAI Magic Link`

**Template**:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Magic Link</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Your Magic Link</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">Hi there,</p>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                Click the button below to sign in to your ReatorAI account:
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 0 auto;">
                <tr>
                  <td style="border-radius: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <a href="{{ .ConfirmationURL }}"
                       style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                      Sign In to ReatorAI
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 20px; font-size: 14px; line-height: 20px; color: #6b7280;">
                Or copy and paste this link into your browser:
              </p>

              <p style="margin: 0 0 30px; font-size: 14px; line-height: 20px; color: #3b82f6; word-break: break-all;">
                {{ .ConfirmationURL }}
              </p>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                <strong>Important:</strong> This link will expire in 1 hour and can only be used once.
              </p>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                If you didn't request this link, you can safely ignore this email.
              </p>

              <p style="margin: 0; font-size: 16px; line-height: 24px; color: #374151; font-weight: 600;">
                The ReatorAI Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; font-size: 14px; line-height: 20px; color: #6b7280;">
                This email was sent to {{ .Email }}
              </p>
              <p style="margin: 0 0 10px; font-size: 14px; line-height: 20px; color: #6b7280;">
                ReatorAI • AI-Powered Viral Content Research
              </p>
              <p style="margin: 0; font-size: 14px; line-height: 20px;">
                <a href="https://reatorai.vercel.app" style="color: #667eea; text-decoration: none;">Visit Website</a> •
                <a href="https://reatorai.vercel.app/docs" style="color: #667eea; text-decoration: none;">Help Center</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## Styling Guidelines

### Brand Colors

Primary gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

**Alternative colors:**
- Primary: `#667eea`
- Secondary: `#764ba2`
- Text: `#374151`
- Muted: `#6b7280`
- Background: `#f9fafb`
- Link: `#3b82f6`

### Typography

- **Headers**: 28px, bold (700), white on gradient
- **Body**: 16px, regular (400), #374151
- **Small text**: 14px, regular (400), #6b7280
- **Font**: System fonts for best compatibility

### Layout

- **Max width**: 600px
- **Padding**: 40px sides, responsive
- **Border radius**: 8px
- **Shadow**: Subtle (0 2px 4px rgba(0,0,0,0.1))

### Mobile Responsiveness

All templates are mobile-responsive using:
- Fluid layouts
- Responsive padding
- Readable font sizes (minimum 14px)
- Touch-friendly buttons (minimum 44px height)

---

## Testing Email Templates

### Before Going Live

1. **Test all scenarios:**
   - Send test emails from Supabase dashboard
   - Verify all links work
   - Check formatting in multiple email clients

2. **Email clients to test:**
   - Gmail (desktop and mobile)
   - Apple Mail (Mac and iOS)
   - Outlook
   - Yahoo Mail
   - Mobile apps

3. **Check for:**
   - Broken images
   - Formatting issues
   - Link functionality
   - Mobile rendering
   - Spam score ([Mail Tester](https://www.mail-tester.com))

### Variables Available

Supabase provides these template variables:
- `{{ .Email }}` - User's email address
- `{{ .ConfirmationURL }}` - Action URL (confirm, reset, etc.)
- `{{ .Token }}` - Raw token (use ConfirmationURL instead)
- `{{ .SiteURL }}` - Your app's URL

---

## Support Contact

For questions about email setup:
- Email: support@reatorai.com
- Include: Template name, issue description, screenshots

---

*Last Updated: November 23, 2025*
