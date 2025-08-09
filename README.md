# Frontend (No-build) — Purchase Request Form

This is a mobile-friendly static frontend that submits purchase requests directly into Firestore using the Firebase JavaScript SDK (no build step required).

## What to change
1. Open `app.js` and replace the `firebaseConfig` object with your project's Web app config from Firebase Console → Project settings → Your apps.

## Deploy to GitHub Pages (mobile-friendly)
1. Create a new GitHub repository.
2. Upload these files (`index.html`, `app.js`, `README.md`) using GitHub web UI (Add file → Upload files) or GitHub mobile app.
3. Commit to `main` branch.
4. In repo Settings → Pages set Source to `main` branch root and save. GitHub Pages will provide the public URL.

Note: The approval emails won't be sent until you deploy the Firebase Cloud Functions backend.
