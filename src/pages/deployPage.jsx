import { useState } from 'react';

// ─────────────────────────────────────────────────────────────
//  SYSTEMS REGISTRY
//
//  To add a new system in the future:
//  1. Add a new entry to the SYSTEMS array below
//  2. Fill in its `phases` (setup checklist) and `deploy` (deploy guide)
//  3. That's it — the UI picks it up automatically
//
//  System shape:
//  {
//    id:      string          — unique key, also used as localStorage namespace
//    name:    string          — short product name  e.g. "Vanilla Bean"
//    label:   string          — category label      e.g. "E-Commerce Platform"
//    status:  string          — 'live' | 'soon' | 'planned'
//    color:   string          — accent hex used for this system's progress/badges
//    phases:  Phase[]         — setup wizard steps
//    deploy:  DeploySection[] — deployment guide sections
//  }
//
//  Phase shape:
//  { id, phase, title, hint?, items: [{id, label, hint?}], codeBlocks?: [{label, code}] }
//
//  DeploySection shape:
//  { id, title, accentColor, steps?: [{label, description?, code}], checkItems?: string[] }
// ─────────────────────────────────────────────────────────────

const SYSTEMS = [

  // ── VANILLA BEAN — E-Commerce ────────────────────────────
  {
    id: 'vanillabean',
    name: 'Vanilla Bean',
    label: 'E-Commerce Platform',
    status: 'live',
    color: '#3b82f6',

    phases: [
      {
        id: 'p1',
        phase: 'Phase 1',
        title: 'Create Your Firebase Project',
        hint: 'Firebase is the cloud backend (database + file storage) that powers the store. Go to console.firebase.google.com and sign in with a Google account.',
        items: [
          { id: 'firebase_project',   label: 'Create a new Firebase project',                  hint: 'Go to console.firebase.google.com → "Add project" → give it a name → disable Google Analytics (optional) → Create project.' },
          { id: 'firebase_auth',      label: 'Turn on Email/Password and Google login',         hint: 'Build → Authentication → Get started → Sign-in method → enable "Email/Password" and "Google".' },
          { id: 'firebase_firestore', label: 'Create the Firestore database (production mode)', hint: 'Build → Firestore Database → Create database → "Start in production mode" → pick a server location closest to your clients.' },
          { id: 'firebase_storage',   label: 'Enable Cloud Storage for file uploads',           hint: 'Build → Storage → Get started → accept the default rules for now (you will replace them in Phase 3).' },
          { id: 'firebase_hosting',   label: 'Enable Firebase Hosting for the website',         hint: 'Build → Hosting → Get started → follow the on-screen prompts. You can skip the Firebase CLI steps for now.' },
        ],
      },
      {
        id: 'p2',
        phase: 'Phase 2',
        title: 'Apply Database Security Rules',
        hint: 'Security rules control who can read or write data. Copy the exact rules below and paste them into Firebase → Firestore → Rules, then click Publish.',
        items: [
          { id: 'firestore_rules_copy',   label: 'Copy the Firestore rules shown in the code block below',              hint: 'Find the "Firestore Security Rules" section below and copy the entire block.' },
          { id: 'firestore_rules_deploy', label: 'Paste and publish the rules in Firebase Console → Firestore → Rules', hint: 'Firestore Database → Rules tab → select all existing text → paste the copied rules → click "Publish".' },
        ],
        codeBlocks: [
          {
            label: 'Firestore Security Rules',
            code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAuth() { return request.auth != null; }
    function isAdmin() {
      return isAuth() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    function isOwner(userId) { return isAuth() && request.auth.uid == userId; }

    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow create: if isAuth() && request.auth.uid == userId;
      allow update: if isOwner(userId);
      allow delete: if isAdmin();
    }
    match /collections/{collectionId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /products/{productId} {
      allow read: if true;
      allow create, delete: if isAdmin();
      allow update: if isAuth();
    }
    match /reservations/{reservationId} {
      allow read: if isAuth() && (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if isAuth();
      allow update, delete: if isAuth() && (resource.data.userId == request.auth.uid || isAdmin());
    }
    match /orders/{orderId} {
      allow read: if isAuth() && (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if isAuth();
      allow update: if isAuth() && (resource.data.userId == request.auth.uid || isAdmin());
      allow delete: if isAdmin();
    }
    match /notifications/{notificationId} {
      allow read, update, delete: if isAuth() && resource.data.userId == request.auth.uid;
      allow create: if isAuth();
    }
    match /settings/{settingId} {
      // consolePlan, onboarding, and invoiceSettings need public write for onboarding flow
      allow read: if true;
      allow write: if settingId == 'consolePlan'
                || settingId == 'onboarding'
                || settingId == 'invoiceSettings';
      allow write: if isAdmin();
    }
  }
}`,
          },
        ],
      },
      {
        id: 'p3',
        phase: 'Phase 3',
        title: 'Apply Storage Security Rules',
        hint: 'Storage rules control who can upload or download files (like payment proof photos and the store logo). Same process as Phase 2 but for Storage.',
        items: [
          { id: 'storage_rules_copy',   label: 'Copy the Storage rules shown in the code block below',                hint: 'Find the "Storage Security Rules" section below and copy the entire block.' },
          { id: 'storage_rules_deploy', label: 'Paste and publish the rules in Firebase Console → Storage → Rules', hint: 'Storage → Rules tab → select all existing text → paste the copied rules → click "Publish".' },
        ],
        codeBlocks: [
          {
            label: 'Storage Security Rules',
            code: `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    match /{allPaths=**} { allow read, write: if false; }

    match /business-assets/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /payment-assets/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /payment-proofs/{orderId}/{fileName} {
      allow create: if request.auth != null
        && request.resource.size < 5 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
      allow read: if request.auth != null;
      allow update, delete: if false;
    }
  }
}`,
          },
        ],
      },
      {
        id: 'p4',
        phase: 'Phase 4',
        title: 'Create Database Indexes',
        hint: 'Create indexes by visiting /setup-indexes. However, you can also create them manually here as a fallback. Create them in Firebase Console → Firestore → Indexes → Composite, or deploy via CLI using the JSON below.',
        items: [
          { id: 'index_reservations', label: 'Create index for Reservations: userId Ascending + reservedAt Descending', hint: 'Firestore → Indexes → Composite → Add index → Collection: reservations → Fields: userId (Asc), reservedAt (Desc).' },
          { id: 'index_orders',       label: 'Create index for Orders (by customer): userId Ascending + createdAt Descending', hint: 'Collection: orders → Fields: userId (Asc), createdAt (Desc).' },
          { id: 'index_notifications',label: 'Create index for Notifications: userId Ascending + createdAt Descending',        hint: 'Collection: notifications → Fields: userId (Asc), createdAt (Desc).' },
          { id: 'index_orders_admin', label: 'Create index for Orders (admin): status Ascending + createdAt Descending',       hint: 'Collection: orders → Fields: status (Asc), createdAt (Desc).' },
        ],
        codeBlocks: [
          {
            label: 'firestore.indexes.json',
            code: `{
  "indexes": [
    { "collectionGroup": "reservations", "fields": [
        {"fieldPath":"userId","order":"ASCENDING"},
        {"fieldPath":"reservedAt","order":"DESCENDING"}
    ]},
    { "collectionGroup": "orders", "fields": [
        {"fieldPath":"userId","order":"ASCENDING"},
        {"fieldPath":"createdAt","order":"DESCENDING"}
    ]},
    { "collectionGroup": "orders", "fields": [
        {"fieldPath":"status","order":"ASCENDING"},
        {"fieldPath":"createdAt","order":"DESCENDING"}
    ]},
    { "collectionGroup": "notifications", "fields": [
        {"fieldPath":"userId","order":"ASCENDING"},
        {"fieldPath":"createdAt","order":"DESCENDING"}
    ]}
  ]
}`,
          },
          { label: 'Deploy via CLI', code: `firebase deploy --only firestore:indexes` },
        ],
      },
      {
        id: 'p5',
        phase: 'Phase 5',
        title: 'Connect the App to Firebase',
        hint: 'Paste your Firebase project credentials into the app code so it knows which database to use.',
        items: [
          { id: 'app_config',  label: 'Paste Firebase SDK config into src/config/firebase.js',              hint: 'Firebase → Project Settings (⚙) → General → "Your apps" → Web app → copy the firebaseConfig object → paste into /src/config/firebase.js.' },
          { id: 'passphrase',  label: 'Change the console passphrase in ConsolePage.jsx (do NOT leave as default)', hint: 'Open src/components/ConsolePage.jsx → find CONSOLE_PASSPHRASE near the top → change to a strong, unique passphrase.' },
          { id: 'npm_install', label: 'Install app dependencies: npm install',                              hint: 'Open a terminal in the project folder and run: npm install. Wait for it to finish before proceeding.' },
        ],
      },
      {
        id: 'p6',
        phase: 'Phase 6',
        title: 'Push to GitHub',
        hint: 'Push your project to a private GitHub repository before deploying. This gives you version history, a safe backup, and lets Vercel auto-deploy on every push.',
        items: [
          { id: 'github_account',   label: 'Make sure you have a GitHub account',                      hint: 'Go to github.com and sign in (or create a free account if you do not have one yet).' },
          { id: 'github_repo',      label: 'Create a new private repository on GitHub',                hint: 'GitHub → "+" icon → New repository → set to Private → do NOT initialize with README → Create repository.' },
          { id: 'github_gitignore', label: 'Confirm .gitignore includes node_modules and .env',        hint: 'Open (or create) .gitignore in the project root. It must contain: node_modules/ and .env' },
          { id: 'github_init',      label: 'Initialize git and make your first commit',                hint: 'In your terminal: "git init", then "git add .", then "git commit -m first commit".' },
          { id: 'github_remote',    label: 'Link your local project to the GitHub repository',         hint: 'Copy the remote URL from GitHub and run: git remote add origin YOUR_REPO_URL' },
          { id: 'github_push',      label: 'Push the project: git push -u origin main',               hint: 'Run: git push -u origin main. Refresh GitHub and confirm your files are there.' },
        ],
        codeBlocks: [
          {
            label: 'First-time setup',
            code: `git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main`,
          },
          { label: 'Every future update', code: `git add .\ngit commit -m "describe your changes here"\ngit push` },
        ],
      },
      {
        id: 'p7',
        phase: 'Phase 7',
        title: 'Build, Deploy & Verify',
        hint: 'Build the final website files and deploy. If using Vercel, connect it to your GitHub repo so every future push auto-deploys.',
        items: [
          { id: 'npm_build',        label: 'Build the production website: npm run build',                         hint: 'In your terminal: npm run build. This compiles the app into a /dist folder.' },
          { id: 'deploy_hosting',   label: 'Deploy to Vercel or Firebase Hosting (see Deploy tab for commands)',  hint: 'Vercel: connect your GitHub repo at vercel.com. Firebase: run "firebase deploy --only hosting".' },
          { id: 'smoke_store',      label: 'Open the live site and confirm it redirects to /onboarding',          hint: 'Visit your hosting URL — a fresh deployment should automatically redirect to /onboarding.' },
          { id: 'share_onboarding', label: 'Send the client the live URL — they complete onboarding themselves',  hint: 'The onboarding flow handles plan selection, business details, contract signing, and admin account creation. No developer action needed.' },
          { id: 'smoke_console',    label: 'After onboarding, verify /console works with the new passphrase',     hint: 'Visit /console and confirm the passphrase you set works. The console is blocked until client onboarding is complete.' },
        ],
      },
    ],

    deploy: [
      {
        id: 'github',
        title: 'Step 1 — Push to GitHub',
        accentColor: '#8b5cf6',
        steps: [
          { label: 'First-time setup', description: 'Run these once inside your project folder.', code: `git init\ngit add .\ngit commit -m "first commit"\ngit remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git\ngit push -u origin main` },
          { label: 'Every future update', description: 'After making any code changes:', code: `git add .\ngit commit -m "describe your changes"\ngit push` },
        ],
      },
      {
        id: 'vercel',
        title: 'Step 2A — Deploy to Vercel (Recommended)',
        accentColor: '#10b981',
        steps: [
          {
            label: 'Option A — Connect GitHub (auto-deploy on every push)',
            description: 'Recommended. Every git push will automatically deploy to Vercel.',
            code: `# 1. Go to vercel.com → Add New Project\n# 2. Import your GitHub repository\n# 3. Set build settings:\n#    Framework:      Vite\n#    Build command:  npm run build\n#    Output dir:     dist\n# 4. Click Deploy — from now on, every "git push" auto-deploys.`,
          },
          { label: 'Option B — Manual CLI deploy', description: 'Use this if you prefer deploying from the terminal directly.', code: `npm install -g vercel\nvercel login\nnpm run build\nvercel --prod` },
        ],
      },
      {
        id: 'firebase',
        title: 'Step 2B — Deploy to Firebase Hosting (Alternative)',
        accentColor: '#f59e0b',
        steps: [
          { label: 'Firebase CLI deployment', description: 'Install the Firebase CLI, initialize hosting, then deploy.', code: `npm install -g firebase-tools\nfirebase login\nfirebase init hosting\n# When prompted:\n#   Public directory:  dist\n#   Single-page app:   YES\nnpm run build\nfirebase deploy --only hosting` },
        ],
      },
      {
        id: 'postchecklist',
        title: 'Post-Deploy Checklist',
        accentColor: '#0ea5e9',
        checkItems: [
          'Firestore security rules are deployed and active (Firebase → Firestore → Rules)',
          'Storage security rules are deployed and active (Firebase → Storage → Rules)',
          '/console passphrase changed from the default — do NOT skip this',
          'Live site redirects to /onboarding on first visit (before client onboarding)',
          'Client has completed onboarding — plan selected, contract signed, admin account created',
          'After onboarding: /store loads correctly and /admin is accessible',
          'Contract PDF generated during onboarding and stored safely by both parties',
        ],
      },
    ],
  },

  // ── PAYROLL SYSTEM ───────────────────────────────────────
  // Fill in `phases` and `deploy` when the system is ready.
  {
    id: 'payroll',
    name: 'Payroll System',
    label: 'HR & Payroll',
    status: 'soon',
    color: '#6366f1',
    phases: [],
    deploy: [],
  },

  // ────────────────────────────────────────────────────────
  // ADD NEW SYSTEMS HERE — copy the shape above and fill it in.
  // ────────────────────────────────────────────────────────
];

// ─── STORAGE ──────────────────────────────────────────────────
// Each system has its own localStorage key so progress is tracked independently.

function storageKey(id) { return `deploydocs_${id}`; }

function loadChecklist(id) {
  try { const r = localStorage.getItem(storageKey(id)); return r ? JSON.parse(r) : {}; }
  catch { return {}; }
}

function saveChecklist(id, data) {
  try { localStorage.setItem(storageKey(id), JSON.stringify(data)); } catch { }
}

// ─── STYLES ───────────────────────────────────────────────────

const S = {
  page:        { minHeight: '100vh', background: '#010409', color: '#e6edf3', fontFamily: "'Inter', system-ui, sans-serif" },
  topbar:      { position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: '#0d1117', borderBottom: '1px solid #21262d' },
  internalBadge: { fontSize: '0.7rem', fontFamily: 'monospace', padding: '2px 8px', borderRadius: 4, background: '#161b22', color: '#7d8590', border: '1px solid #30363d' },
  topbarTitle: { fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: 600, color: '#e6edf3' },

  // System switcher row
  switcher:    { display: 'flex', alignItems: 'stretch', padding: '0 24px', background: '#0d1117', borderBottom: '1px solid #21262d', overflowX: 'auto', gap: 2 },
  sysBtn:      (active, color) => ({ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', border: 'none', borderBottom: `2px solid ${active ? color : 'transparent'}`, background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'monospace', fontSize: '0.8rem', color: active ? '#e6edf3' : '#7d8590', transition: 'color 0.15s', marginBottom: -1 }),
  sysDot:      (color) => ({ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }),
  sysName:     { fontWeight: 600 },
  sysLabel:    { fontSize: '0.72rem', color: '#475569' },
  soonPill:    { fontSize: '0.58rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.06em', padding: '1px 6px', borderRadius: 3, background: '#1e293b', color: '#475569', border: '1px solid #30363d', textTransform: 'uppercase' },

  // Tab bar
  tabBar:      { display: 'flex', alignItems: 'stretch', padding: '0 24px', background: '#0a0e14', borderBottom: '1px solid #21262d' },
  tab:         (active, color) => ({ background: 'transparent', border: 'none', borderBottom: `2px solid ${active ? color : 'transparent'}`, padding: '11px 20px', fontSize: '0.8rem', fontFamily: 'monospace', color: active ? '#e6edf3' : '#7d8590', cursor: 'pointer', marginBottom: -1, transition: 'color 0.15s' }),
  progressArea:{ marginLeft: 'auto', display: 'flex', alignItems: 'center', padding: '0 0 0 16px' },
  progressPill:(done) => ({ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 99, background: '#161b22', border: '1px solid #30363d', fontSize: '0.72rem', fontFamily: 'monospace', color: done ? '#22c55e' : '#94a3b8' }),
  progressMini:{ width: 56, height: 3, borderRadius: 99, background: '#21262d', overflow: 'hidden' },

  // Content area
  content:     { maxWidth: 760, margin: '0 auto', padding: '32px 24px 64px' },

  // Coming soon
  soonBanner:  { textAlign: 'center', padding: '80px 24px' },
  soonIcon:    { fontSize: '2.5rem', marginBottom: 16 },
  soonTitle:   { fontSize: '1.1rem', fontWeight: 600, color: '#e6edf3', marginBottom: 8 },
  soonSub:     { fontSize: '0.82rem', fontFamily: 'monospace', color: '#7d8590', lineHeight: 1.7 },

  // Typography
  h2:          { fontSize: '1.15rem', fontWeight: 600, color: '#e6edf3', marginBottom: 4 },
  h3:          { fontSize: '0.9rem', fontWeight: 600, color: '#e2e8f0' },
  subtext:     { fontSize: '0.8rem', fontFamily: 'monospace', color: '#7d8590' },
  label:       { fontSize: '0.75rem', fontFamily: 'monospace', color: '#94a3b8' },
  hint:        { fontSize: '0.75rem', fontFamily: 'monospace', color: '#94a3b8', marginTop: 4, lineHeight: 1.6 },

  // Phase card
  phaseWrap:   { marginBottom: 36 },
  phaseHead:   { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 },
  phaseBadge:  (done, color) => ({ fontSize: '0.68rem', fontFamily: 'monospace', fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: done ? '#14532d' : '#1e293b', color: done ? '#86efac' : color, border: `1px solid ${done ? '#166534' : '#30363d'}`, whiteSpace: 'nowrap' }),
  phaseTitle:  { fontSize: '0.95rem', fontWeight: 600, color: '#e2e8f0' },
  progressTrack:{ height: 3, borderRadius: 99, background: '#1e293b', overflow: 'hidden', marginBottom: 12 },
  progressFill:(pct, done, color) => ({ height: '100%', borderRadius: 99, width: `${pct}%`, background: done ? '#22c55e' : color, transition: 'width 0.3s' }),
  hintBox:     { fontSize: '0.78rem', fontFamily: 'monospace', color: '#64748b', background: '#0d1117', borderLeft: '2px solid #1e3a5f', padding: '8px 12px', borderRadius: '0 4px 4px 0', marginBottom: 12, lineHeight: 1.65 },

  // Check items
  checkItem:   (checked) => ({ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px', borderRadius: 6, background: checked ? '#0d2818' : '#0d1117', border: `1px solid ${checked ? '#1a4731' : '#21262d'}`, borderLeft: `3px solid ${checked ? '#22c55e' : '#30363d'}`, marginBottom: 8, cursor: 'pointer', userSelect: 'none', transition: 'background 0.15s' }),
  checkBox:    (checked) => ({ fontSize: '1rem', flexShrink: 0, marginTop: 1, color: checked ? '#22c55e' : '#4d5562' }),
  checkLabel:  (checked) => ({ fontSize: '0.82rem', fontFamily: 'monospace', color: checked ? '#86efac' : '#94a3b8', textDecoration: checked ? 'line-through' : 'none', display: 'block' }),

  // Code blocks
  codeWrap:    { borderRadius: 8, overflow: 'hidden', border: '1px solid #21262d', marginTop: 12 },
  codeHead:    { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: '#161b22', borderBottom: '1px solid #21262d' },
  codeLbl:     { fontSize: '0.72rem', fontFamily: 'monospace', color: '#8b949e' },
  codePre:     { margin: 0, padding: '16px', background: '#0d1117', overflowX: 'auto', fontSize: '0.82rem', fontFamily: "'Consolas', 'Courier New', monospace", lineHeight: 1.7, color: '#e6edf3' },
  copyBtn:     (copied) => ({ fontSize: '0.7rem', fontFamily: 'monospace', padding: '3px 10px', borderRadius: 4, background: copied ? '#166534' : '#1e293b', color: copied ? '#86efac' : '#64748b', border: `1px solid ${copied ? '#166534' : '#334155'}`, cursor: 'pointer', transition: 'all 0.15s' }),

  // Deploy sections
  sectionWrap: { marginBottom: 40 },
  sectionHead: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 },
  sectionAccent:(color) => ({ width: 3, height: 18, borderRadius: 99, background: color, flexShrink: 0 }),

  // Misc
  resetBtn:    { fontSize: '0.72rem', fontFamily: 'monospace', padding: '5px 12px', borderRadius: 4, background: 'transparent', border: '1px solid #30363d', color: '#7d8590', cursor: 'pointer' },
  doneBanner:  { borderRadius: 8, padding: '14px 20px', fontSize: '0.82rem', fontFamily: 'monospace', background: '#0d2818', border: '1px solid #166534', color: '#86efac', marginTop: 16 },
};

// ─── COPY BUTTON ──────────────────────────────────────────────

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }); };
  return <button style={S.copyBtn(copied)} onClick={handle}>{copied ? '✓ copied' : 'copy'}</button>;
}

// ─── CODE BLOCK ───────────────────────────────────────────────

function CodeBlock({ code, label }) {
  return (
    <div style={S.codeWrap}>
      {label && (
        <div style={S.codeHead}>
          <span style={S.codeLbl}>{label}</span>
          <CopyButton text={code} />
        </div>
      )}
      <pre style={S.codePre}>
        {code.split('\n').map((line, i) => (
          <div key={i} style={{ color: line.trim().startsWith('#') ? '#6e7681' : '#e6edf3' }}>
            {line || '\u00a0'}
          </div>
        ))}
      </pre>
    </div>
  );
}

// ─── CHECK ITEM ───────────────────────────────────────────────

function CheckItem({ id, label, hint, checked, onToggle }) {
  const [open, setOpen] = useState(false);
  const long = hint && hint.length > 90;
  return (
    <div style={S.checkItem(checked)} onClick={() => onToggle(id)}>
      <span style={S.checkBox(checked)}>{checked ? '☑' : '☐'}</span>
      <div style={{ flex: 1 }}>
        <span style={S.checkLabel(checked)}>{label}</span>
        {hint && !checked && (
          <span style={S.hint} onClick={e => { if (long) { e.stopPropagation(); setOpen(o => !o); } }}>
            <span style={{ color: '#22d3ee' }}>↳ </span>
            {long && !open ? hint.slice(0, 90) + '… ' : hint}
            {long && <span style={{ color: '#22d3ee', cursor: 'pointer' }}>{open ? ' show less' : 'more'}</span>}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── PHASE CARD ───────────────────────────────────────────────

function PhaseCard({ phase, checklist, onToggle, color }) {
  const doneCnt = phase.items.filter(i => checklist[i.id]).length;
  const allDone = doneCnt === phase.items.length;
  const pct = Math.round((doneCnt / phase.items.length) * 100);
  return (
    <div style={S.phaseWrap}>
      <div style={S.phaseHead}>
        <span style={S.phaseBadge(allDone, color)}>{phase.phase}</span>
        <span style={S.phaseTitle}>{phase.title}</span>
        <span style={{ marginLeft: 'auto', fontSize: '0.72rem', fontFamily: 'monospace', color: allDone ? '#22c55e' : '#475569' }}>
          {doneCnt}/{phase.items.length}
        </span>
      </div>
      <div style={S.progressTrack}><div style={S.progressFill(pct, allDone, color)} /></div>
      {phase.hint && <div style={S.hintBox}>{phase.hint}</div>}
      {phase.items.map(item => (
        <CheckItem key={item.id} id={item.id} label={item.label} hint={item.hint} checked={!!checklist[item.id]} onToggle={onToggle} />
      ))}
      {phase.codeBlocks?.map((cb, i) => <CodeBlock key={i} code={cb.code} label={cb.label} />)}
    </div>
  );
}

// ─── POST-DEPLOY CHECK ────────────────────────────────────────

function PostDeployCheck({ items }) {
  const [checked, setChecked] = useState({});
  const toggle = i => setChecked(p => ({ ...p, [i]: !p[i] }));
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={S.checkItem(!!checked[i])} onClick={() => toggle(i)}>
          <span style={S.checkBox(!!checked[i])}>{checked[i] ? '☑' : '☐'}</span>
          <span style={S.checkLabel(!!checked[i])}>{item}</span>
        </div>
      ))}
    </div>
  );
}

// ─── COMING SOON ──────────────────────────────────────────────

function ComingSoon({ system }) {
  return (
    <div style={S.soonBanner}>
      <div style={S.soonIcon}>🚧</div>
      <p style={S.soonTitle}>{system.name} — Instructions Coming Soon</p>
      <p style={S.soonSub}>
        The {system.label} is currently in development.<br />
        Setup and deploy instructions will appear here once the system is ready.
      </p>
    </div>
  );
}

// ─── SYSTEM VIEW ─────────────────────────────────────────────

function SystemView({ system }) {
  const [activeTab, setActiveTab] = useState('setup');
  const [checklist, setChecklist] = useState(() => loadChecklist(system.id));

  const isSoon = system.status !== 'live';
  const totalItems = system.phases.reduce((s, g) => s + g.items.length, 0);
  const checkedItems = Object.values(checklist).filter(Boolean).length;
  const overallPct = totalItems ? Math.round((checkedItems / totalItems) * 100) : 0;
  const allDone = totalItems > 0 && checkedItems === totalItems;

  const toggleCheck = id => {
    setChecklist(prev => {
      const next = { ...prev, [id]: !prev[id] };
      saveChecklist(system.id, next);
      return next;
    });
  };

  const resetChecklist = () => {
    if (window.confirm(`Reset all checklist progress for ${system.name}?`)) {
      setChecklist({});
      saveChecklist(system.id, {});
    }
  };

  return (
    <>
      {/* Tab bar — only rendered when system is live */}
      {!isSoon && (
        <div style={S.tabBar}>
          {[{ id: 'setup', label: 'Setup' }, { id: 'deploy', label: 'Deploy' }].map(t => (
            <button key={t.id} style={S.tab(activeTab === t.id, system.color)} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
          {totalItems > 0 && (
            <div style={S.progressArea}>
              <div style={S.progressPill(allDone)}>
                <span>{checkedItems}/{totalItems}</span>
                <div style={S.progressMini}>
                  <div style={{ height: '100%', borderRadius: 99, width: `${overallPct}%`, background: allDone ? '#22c55e' : system.color, transition: 'width 0.3s' }} />
                </div>
                <span>{overallPct}%</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={S.content}>

        {/* Coming soon state */}
        {isSoon && <ComingSoon system={system} />}

        {/* Setup tab */}
        {!isSoon && activeTab === 'setup' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
              <div>
                <h2 style={S.h2}>{system.name} — Setup Wizard</h2>
                <p style={S.subtext}>{system.phases.length} phases · {totalItems} steps · progress saved in your browser</p>
              </div>
              <button style={S.resetBtn} onClick={resetChecklist}>reset</button>
            </div>
            {system.phases.map(phase => (
              <PhaseCard key={phase.id} phase={phase} checklist={checklist} onToggle={toggleCheck} color={system.color} />
            ))}
            {allDone && <div style={S.doneBanner}>✓ All phases complete. Proceed to the Deploy tab for deployment commands.</div>}
          </div>
        )}

        {/* Deploy tab */}
        {!isSoon && activeTab === 'deploy' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <h2 style={S.h2}>{system.name} — Deployment Guide</h2>
              <p style={S.subtext}>Always push to GitHub first, then deploy to Vercel or Firebase Hosting.</p>
            </div>
            {system.deploy.map(section => (
              <div key={section.id} style={S.sectionWrap}>
                <div style={S.sectionHead}>
                  <div style={S.sectionAccent(section.accentColor)} />
                  <h3 style={S.h3}>{section.title}</h3>
                </div>
                {section.steps?.map((step, i) => (
                  <div key={i} style={{ marginBottom: 24 }}>
                    <p style={{ ...S.label, marginBottom: 2 }}>{step.label}</p>
                    {step.description && <p style={{ ...S.hint, marginBottom: 6, marginTop: 0 }}>{step.description}</p>}
                    <CodeBlock code={step.code} label={null} />
                  </div>
                ))}
                {section.checkItems && <PostDeployCheck items={section.checkItems} />}
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}

// ─── ROOT PAGE ────────────────────────────────────────────────

export default function DeployPage() {
  const [activeSystem, setActiveSystem] = useState(SYSTEMS[0].id);
  const system = SYSTEMS.find(s => s.id === activeSystem) ?? SYSTEMS[0];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');`}</style>
      <div style={S.page}>

        {/* Top bar */}
        <div style={S.topbar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={S.internalBadge}>INTERNAL</span>
            <span style={S.topbarTitle}>Warm Cinnamon — Deploy Docs</span>
          </div>
          <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#30363d' }}>
            {SYSTEMS.filter(s => s.status === 'live').length}/{SYSTEMS.length} systems live
          </span>
        </div>

        {/* System switcher */}
        <div style={S.switcher}>
          {SYSTEMS.map(s => (
            <button
              key={s.id}
              style={S.sysBtn(activeSystem === s.id, s.color)}
              onClick={() => setActiveSystem(s.id)}
            >
              <span style={S.sysDot(s.status === 'live' ? s.color : '#374151')} />
              <span style={S.sysName}>{s.name}</span>
              <span style={S.sysLabel}>{s.label}</span>
              {s.status !== 'live' && <span style={S.soonPill}>soon</span>}
            </button>
          ))}
        </div>

        {/* System content — key forces fresh state on system switch */}
        <SystemView key={system.id} system={system} />

      </div>
    </>
  );
}