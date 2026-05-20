# Portfolio Admin CMS

This project includes a private admin panel for managing portfolio content.

## Access

- Local admin route: `http://localhost:5173/admin`
- Production admin route: `/admin`
- Authentication is handled through Firebase Email/Password auth.

Do not commit real admin emails, passwords, API secrets, service account keys, or private setup values to this repository.

## Features

- Edit Dipak and Sagar profile content.
- Edit skills and percentage values.
- Add, remove, and update projects.
- Upload images through the configured image workflow.
- Save content to Firestore.
- Falls back to bundled default content if Firebase is slow or blocked.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Firebase Notes

Create admin users directly in Firebase Console. Keep credentials private.

Recommended Firestore rule shape:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

For stronger security, restrict writes using custom claims or a private allowlist managed outside this public repo.

## Troubleshooting

- If `/admin` shows a Vercel 404, confirm `vercel.json` rewrites all routes to `index.html`.
- If the dashboard shows default content, check Firebase Auth, Firestore rules, and browser console errors.
- If image uploads fail, check the image provider configuration and rate limits.
