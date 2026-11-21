# Suriyaprakash Sudarvelraja — Personal Scientific Portfolio

A responsive, static personal portfolio website built with plain HTML, CSS and JavaScript. It is designed to deploy free on GitHub Pages.

## Files
- `index.html` — all page content and sections
- `styles.css` — responsive scientific visual design
- `script.js` — mobile navigation and current-year footer
- `assets/Suriyaprakash_Sudarvelraja_CV.pdf` — CV download/view file

## Preview locally on Windows
1. Extract the ZIP file.
2. Open the folder.
3. Double-click `index.html` to preview in a browser.
4. For a more realistic local web server, open PowerShell in the folder and run:
   ```powershell
   py -m http.server 8000
   ```
5. Visit `http://localhost:8000`.

No Node.js, build process or paid software is required.

## Deploy free with GitHub Pages
1. Sign in to GitHub or create an account at https://github.com.
2. Create a **public** repository named exactly `suriyaprakash-sudarvelraja.github.io` (or use your own GitHub username in place of `suriyaprakash-sudarvelraja`).
3. Upload the contents of this folder to the repository root. Make sure `index.html` is at the root, not inside another nested folder.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main`, folder `/ (root)`, then Save.
7. Wait for GitHub Pages to publish. The URL will be:
   `https://YOUR-GITHUB-USERNAME.github.io/`
8. If using a different repository name, the URL will usually be:
   `https://YOUR-GITHUB-USERNAME.github.io/REPOSITORY-NAME/`.

## Important before publishing
- This site intentionally uses the contact email and phone number shown in the supplied CV. They will be publicly visible. Remove the phone link from `index.html` if you prefer email/LinkedIn only.
- The CV is downloadable and publicly accessible once the site is published. Replace the PDF in `assets/` whenever you update your CV.
- The openFDA drug-safety dashboard and clinical eCRF are explicitly marked **planned / in development**. Do not present them as completed projects until you have built and documented them.
- The site does not claim advanced proficiency in Python, R, SQL, Power BI or clinical systems. Update the skills section as you gain demonstrable experience.
- Certificate entries are based on the supplied CV and LinkedIn export. Add certificate scans or credential verification links only after checking that each document/link is correct and safe to publish.
- The site is a static portfolio; it does not collect or store contact-form submissions. Visitors can email you directly.

## Editing
Edit `index.html` to update text, dates, links and projects. Edit `styles.css` to adjust layout and colours. The site uses Google Fonts when online and falls back to system fonts when offline.
