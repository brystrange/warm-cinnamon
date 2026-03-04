# Warm Cinnamon

## Push code changes to GitHub

```bash
cd c:\Users\ASUS\.gemini\antigravity\scratch\warm-cinnamon
git add -A
git commit -m "your commit message"
git push
```

Since the Vercel project is **connected to your GitHub repo**, pushing to `master` will **automatically trigger a new Vercel deployment** — no extra steps needed.

## Manual Vercel deploy (if needed)

If you ever want to deploy without pushing to GitHub:

```bash
cd c:\Users\ASUS\.gemini\antigravity\scratch\warm-cinnamon
npx vercel --prod
```

---

## Quick reference

| What | Command |
|---|---|
| Run locally | `npm run dev` |
| Push + auto-deploy | `git add -A && git commit -m "msg" && git push` |
| Manual deploy | `npx vercel --prod` |
| GitHub repo | brystrange/warm-cinnamon |
| Live site | warmcinnamon.vercel.app |
| Vercel dashboard | vercel.com/dashboard |

The simplest workflow: **make changes** → `git push` → **Vercel auto-deploys**. That's it! 🎉
