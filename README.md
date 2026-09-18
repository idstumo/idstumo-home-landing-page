# IDSTUMO landing page

A zero-build, monochrome static landing page intended for GitHub Pages + the Namecheap domain `idstumo.com`.

## Files

- `index.html` — page structure.
- `style.css` — all styling; only black, white, and grayscale values are used.
- `script.js` — Enter error + Wave email behavior.
- `assets/idstumo-logo.png` — cleaned transparent version of the logo from the supplied hat photo.
- `CNAME` — tells GitHub Pages the custom domain is `idstumo.com`.

## Typography

The page uses **Rye**, a free Google Font under the SIL Open Font License. It was chosen because the supplied flyer has a vintage Western/wood-type character. The logo itself is the supplied hat mark, not a font recreation.

The site loads Rye from Google Fonts, so an internet connection is needed for the exact display typeface. If you want the site to have no external font request, download Rye from Google Fonts and put the font files in `assets/fonts/`, then change the CSS to `@font-face`.

## Email behavior

The Wave button posts the message to FormSubmit's free form endpoint for `contact@idstumo.com`, so no server or paid hosting is required.

**One-time activation:** FormSubmit says the first submission triggers an email asking you to confirm/activate the form. After you confirm it, future Waves can be delivered without leaving the page.

The JavaScript also falls back to a normal `mailto:` link if FormSubmit is unavailable.

## 1. Create the GitHub repository

1. Sign in to GitHub.
2. Click **New repository**.
3. Give it a name such as `idstumo-site`.
4. For GitHub Free, make the repository **Public**.
5. Create the repository.
6. Upload everything from this folder, preserving the `assets` folder.
7. Commit the files to the `main` branch.

## 2. Turn on GitHub Pages

In the repository:

1. Open **Settings**.
2. Open **Pages** under **Code and automation**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`.
5. Click **Save**.
6. Under **Custom domain**, enter:

   `idstumo.com`

7. Save it. The included `CNAME` file already contains the same domain.
8. After DNS is working and GitHub offers it, turn on **Enforce HTTPS**.

GitHub Pages on GitHub Free supports public repositories.

## 3. Point Namecheap at GitHub Pages

In Namecheap:

1. Go to **Domain List**.
2. Click **Manage** next to `idstumo.com`.
3. Open **Advanced DNS**.
4. In **Host Records**, remove conflicting URL Redirect, A, or CNAME records for `@`/`www`.
5. Add these four A records:

   | Type | Host | Value |
   |---|---|---|
   | A Record | @ | 185.199.108.153 |
   | A Record | @ | 185.199.109.153 |
   | A Record | @ | 185.199.110.153 |
   | A Record | @ | 185.199.111.153 |

6. Add this CNAME:

   | Type | Host | Value |
   |---|---|---|
   | CNAME Record | www | YOUR-GITHUB-USERNAME.github.io |

   Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username.

7. Save the DNS changes.

Namecheap says new records normally take around 30 minutes to take effect, while GitHub notes DNS propagation can take up to 24 hours.

## 4. Verify

After DNS has propagated:

- Visit `https://idstumo.com`.
- Visit `https://www.idstumo.com`.
- Confirm the GitHub Pages **HTTPS** certificate is active.
- Type anything into the box and click **Enter**. You should see exactly:

  `It's not your time`

- Type anything and click **Wave**. The first time, check `contact@idstumo.com` for FormSubmit's activation email and confirm the form.

## 5. Editing the page

The three things you will most likely edit are:

- Text/HTML: `index.html`
- Appearance: `style.css`
- Button behavior/email: `script.js`

If you replace the logo, use another transparent PNG at:

`assets/idstumo-logo.png`

Keep the filename the same and you do not need to change the HTML.

## Important email note

Because GitHub Pages is static hosting, it does not run server-side code that can directly send email. The included free FormSubmit integration is what makes the Wave button actually submit an email without buying hosting or running a server. FormSubmit is a third-party service; review its current terms/privacy information before collecting sensitive information.

## If you want a completely third-party-free version

Change the Wave behavior to a `mailto:` link. That is simpler, but it opens the visitor's email application instead of sending the message automatically. The current JavaScript already uses this as a fallback.
