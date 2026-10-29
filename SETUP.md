# CA Office 360 — install & setup guide

App address (after step 1): **https://capk541.github.io/ca-office-360/**

## 1. Put the app online (once, on a computer — about 5 minutes)
1. Unzip **CA_Office_360_App.zip** on your computer.
2. Open **github.com/CAPK541/ca-office-360** → click **uploading an existing file** (or *Add file → Upload files*).
3. Select everything inside the unzipped folder (all files **and** the `icons` folder) and drag it onto the page. Click **Commit changes**.
4. Open the repo's **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
5. After 1–2 minutes the app opens at the address above.

Updating later: upload the new files the same way (GitHub replaces the old ones). Open apps pick up the new version the next time they are reopened.

## 2. Install on each device (no Claude account needed)
- **iPhone / iPad:** open the address in **Safari** → **Share** → **Add to Home Screen** → **Add**.
- **Windows laptop:** open the address in **Edge** or **Chrome** → click the **Install** icon in the address bar (or menu → *Apps → Install this site as an app*).
- **Android:** open in **Chrome** → **Install app**.

## 3. Choose storage (first launch)
| Option | Who it suits | Where data lives |
|---|---|---|
| **Google Drive** | An office with staff | A `CA Office 360` folder in the owner's Google Drive (`CA_Office_360_data.json` + `Documents`). Each device keeps a working copy, works offline and syncs about every 45 seconds. |
| **This device only** | One person on one phone/computer | The browser's storage on that device. Download backups regularly. |
| **A folder on this computer** | Windows/Mac with Edge or Chrome | Any folder you pick (put it inside OneDrive or Google Drive for desktop for an automatic cloud copy). Daily copy in `Backups`. |

You can move later: Administration → Storage & backup → *Move data to another storage*.

## 4. Google Drive option — one-time Google setup (about 10 minutes)
Needed only for the Google Drive option. Use the office Google account.
1. Go to **console.cloud.google.com** → create a project named **CA Office 360**.
2. **APIs & Services → Library**: enable **Google Drive API** and **Google Picker API**.
3. **Google Auth Platform (OAuth consent screen)**: app name *CA Office 360*, your support email, audience **External**. Add scopes `drive.file`, `userinfo.email`, `userinfo.profile`. While the app is in *Testing*, add yourself and every staff Gmail under **Test users** (up to 100). These scopes are non-sensitive, so you can also choose **Publish app**; Google may show staff a one-time “unverified app” notice — they click *Continue*.
4. **Clients → Create client → Web application**
   - Authorized JavaScript origins: `https://capk541.github.io`
   - Authorized redirect URIs: `https://capk541.github.io/ca-office-360/` (used for iPhone sign-in)
   - Copy the **Client ID**.
5. **Credentials → Create credentials → API key** → *Edit*: Application restriction **Websites** `https://capk541.github.io/*`; API restriction **Google Picker API** and **Google Drive API**. Copy the **key**.
6. **Project number**: Cloud console home → *Project info* (or IAM & Admin → Settings).
7. Put the three values into **config.js** in the GitHub repo (pencil icon → edit → *Commit*), or send them to Claude to do it. They are public identifiers, not passwords.

## 5. Add staff (Google Drive option)
1. Owner: Administration → **Users & roles** → enter the staff member's Google email and role → **Invite and share**. Google emails them the link.
2. Staff: install the app → **Google Drive** → sign in → **Open office data shared with me** → tick `CA_Office_360_data.json` (and the `Documents` folder) → *Select*.
3. Roles decide what each person sees in the app (for example, staff don't see billing). Anyone the Drive file is shared with can also open it in Google Drive, so share only with your team. Remove someone with **Remove access**.

## 6. Security on devices
- Set a **device PIN** (Administration → Notifications & security). The app locks after inactivity.
- Passwords, OTPs and recovery codes are never stored — the portal register keeps only *where* each password is kept.
- Download a **full backup** regularly and keep it in an encrypted location.

## 7. Assistant
The free **CA Assistant** answers common questions from your records (receivables, overdue invoices, pending GST/TDS/ROC work, missing documents, workload, weekly priorities, data checks, reminders) and explains common tax terms. It uses built-in rules, not an AI model. Inside claude.ai the same app uses Claude (Ask CA AI) instead.

## 8. Known limits
- Not an App Store app; it installs from the browser and behaves like an app (own icon, full screen, offline).
- On iPhone, use **Add to Home Screen**: iOS may clear website data of sites that are not added and not used for weeks.
- Google sign-in lasts about an hour; when it expires the app keeps working offline and shows **Connect** to resync.
- Email/WhatsApp messages open in your own email app or WhatsApp; nothing is sent automatically.
- If two people change the *same* record at nearly the same time, the later change is kept (different records never overwrite each other). Google Drive also keeps earlier versions of the data file.
