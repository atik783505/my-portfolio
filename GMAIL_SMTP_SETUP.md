# Gmail SMTP Setup Guide

To securely send email messages from your Next.js contact form directly to your Gmail account, you must configure a Gmail App Password. Regular passwords will be blocked by Google's SMTP auth security.

Follow these step-by-step instructions:

---

## 🔐 Step 1: Enable 2-Step Verification
Gmail App Passwords require 2-Step Verification to be active on your Google account.
1. Go to your [Google Account Console](https://myaccount.google.com/).
2. Select **Security** from the left navigation panel.
3. Under *How you sign in to Google*, make sure **2-Step Verification** is turned **ON**. 
   * (If it's off, click on it, follow the prompts to enable it, and then return to the Security tab).

---

## 🔑 Step 2: Generate an App Password
1. Once 2-Step Verification is active, click on **2-Step Verification** again.
2. Scroll to the very bottom of the page and select **App passwords**.
3. Enter a name for the app (e.g., `Developer Portfolio Website`).
4. Click **Create**.
5. Google will display a popup containing a **16-character code** (typically formatted as 4 groups of 4 letters, e.g., `abcd efgh ijkl mnop`).
6. Copy this 16-character code immediately. *(You won't be able to view it again once you close the popup).*

---

## ⚙️ Step 3: Configure Environment Variables
1. Open the `.env.local` file in the root of your Next.js project.
2. Paste your 16-character app password (without spaces) and your Gmail address:

```env
# Gmail account credentials
GMAIL_USER=your-actual-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop

# Optional: The address that will receive the messages (can be the same as GMAIL_USER)
CONTACT_RECEIVER_EMAIL=your-recipient-email@gmail.com
```

3. Save the `.env.local` file.

---

## 🛠️ Step 4: Test Your Implementation
Restart your development server to load the new environment variables:
```bash
# Restart Next.js dev server
npm run dev
```

Try submitting the form. You should receive the formatted HTML message directly in your recipient inbox within seconds!
