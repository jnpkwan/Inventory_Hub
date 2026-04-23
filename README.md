# Acacia HBC — Replenishment System
## Setup Guide: GitHub Pages + Google Apps Script

---

## What you're setting up

```
Your Browser (PWA)
      ↕  HTTPS fetch
Google Apps Script Web App   ←  deployed from Code.gs
      ↕  Sheets API
Google Spreadsheet           ←  ID: 10O3zMBVPdexSu8cbHf46aYyY9Rka5OeDZEr9MCBsn0E
```

---

## Step 1 — Google Apps Script (do this first)

1. Open your Google Sheet
   → **Extensions → Apps Script**

2. Delete everything in the editor.
   Paste the entire contents of **Code.gs** from this folder.

3. In the editor, click the **function selector dropdown** (top center),
   choose `bootstrapSheets`, then click ▶ **Run**.
   - Accept any permission prompts (this is your own script on your own sheet)
   - You should see: *"Bootstrap complete! All sheets ready."*
   - Check your Google Sheet — 4 new tabs should appear:
     `CDF_Deliveries` · `Stores` · `Users` · `ActivityLog`

4. **Deploy as a Web App:**
   - Click **Deploy → New Deployment**
   - Click the ⚙ gear icon next to "Type" → select **Web App**
   - Set:
     - **Description:** `Acacia CDF Tracker v1`
     - **Execute as:** `Me`
     - **Who has access:** `Anyone`
   - Click **Deploy**
   - Copy the **Web App URL** — it looks like:
     `https://script.google.com/macros/s/AKfyc.../exec`
   - **Save this URL** — you'll paste it into the app

> ⚠️ Every time you edit Code.gs, you must create a **New Deployment**
> (not "Manage existing") to push the changes live.

---

## Step 2 — GitHub Repository

1. Go to https://github.com and sign in

2. Click **+** (top right) → **New repository**
   - Repository name: `acacia-hbc`
   - Description: `Acacia Home Builders Corporation — Replenishment System`
   - Visibility: **Private** ✓ (recommended — this is internal ops)
   - ✅ Add a README file → uncheck (we have our own)
   - Click **Create repository**

3. Upload your files:
   - Click **uploading an existing file** (or drag & drop)
   - Upload these 4 files:
     ```
     index.html
     manifest.json
     sw.js
     README.md   ← this file
     ```
   - Commit message: `Initial deploy — CDF Delivery Tracker`
   - Click **Commit changes**

---

## Step 3 — Enable GitHub Pages

1. In your repo, go to **Settings → Pages** (left sidebar)

2. Under **Source**, select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
   - Click **Save**

3. Wait ~60 seconds, then your app is live at:
   ```
   https://[your-github-username].github.io/acacia-hbc/
   ```

4. Open that URL in your browser.
   You should see the CDF Delivery Tracker.

---

## Step 4 — Connect the App to Google Sheets

1. Open your live app at the GitHub Pages URL

2. You'll see a blue banner at the top: **"Connect to Google Sheets"**

3. Fill in:
   - **Your username** — e.g. `admin` (matches the Users sheet)
   - **Web App URL** — paste the URL from Step 1

4. Click **Connect**
   - The app will pull live data from your sheet
   - The banner disappears once connected
   - A green "Connected" dot appears in the header

---

## Step 5 — Updating the App Later

When you make changes to `index.html`:
1. In GitHub, click `index.html` → click the ✏️ pencil edit icon
2. Paste your updated code
3. Click **Commit changes**
4. GitHub Pages auto-redeploys in ~30–60 seconds

When you make changes to `Code.gs`:
1. Edit in Apps Script editor
2. Go to **Deploy → New Deployment** (always new, not manage existing)
3. Paste the new Web App URL into the app's settings

---

## Sheet Reference

| Sheet | Purpose |
|---|---|
| `CDF_Deliveries` | Every CDF record — the live tracker data |
| `Stores` | Store master list (used by future replenishment module) |
| `Users` | Who can access and what username they log in with |
| `ActivityLog` | Audit trail — every create/update/delete is logged |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "API error" on connect | Make sure you deployed as **Web App** with access = **Anyone** |
| Bootstrap fails | Check you have edit access to the spreadsheet |
| App shows demo data | Web App URL not saved — paste it in the Connect banner |
| Changes not showing | After editing Code.gs, always create a **New Deployment** |
| 404 on GitHub Pages | Wait 60s after enabling Pages, then hard-refresh |

---

*Acacia Home Builders Corporation — Internal System Documentation*
