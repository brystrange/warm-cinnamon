import { useState, useEffect } from "react";
import Home from "./pages/home.jsx";
import MineShop from "./pages/mineshop.jsx";
import Payroll from "./pages/payroll.jsx";

const TABS = [
  { id: "home", label: "Home" },
  { id: "mineshop", label: "mine-shop" },
  { id: "payroll", label: "Payroll", soon: true },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [fading, setFading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    if (id === page || (TABS.find(t => t.id === id)?.soon)) return;
    setFading(true);
    setMenuOpen(false);
    setTimeout(() => { setPage(id); setFading(false); window.scrollTo({ top: 0 }); }, 180);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --bg:      #fdfcfa;
          --bg2:     #f7f5f2;
          --bg3:     #eeeae4;
          --bdr:     #e8e4de;
          --bdr2:    #d0cbc3;
          --ink:     #1a1714;
          --ink2:    #4a4540;
          --ink3:    #8a857d;
          --ink4:    #b8b3ac;
          --cin:     #b45309;
          --cin2:    #d97706;
          --cin-l:   #f59e0b;
          --cin-bg:  #fef3c7;
          --cin-bg2: #fffbeb;
          --nav-h:   64px;
          --r:       10px;
          --sh:      0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05);
          --fd: 'Lora', Georgia, serif;
          --fb: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: var(--bg);
          color: var(--ink);
          font-family: var(--fb);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: var(--nav-h);
          display: flex; align-items: center;
          padding: 0 40px;
          transition: all 0.3s;
        }
        .nav.scrolled {
          background: rgba(253,252,250,0.92);
          backdrop-filter: blur(16px) saturate(150%);
          border-bottom: 1px solid var(--bdr);
          box-shadow: 0 1px 10px rgba(0,0,0,0.04);
        }
        .nav-inner {
          width: 100%; max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--fd); font-size: 1.15rem; font-weight: 600;
          color: var(--ink); cursor: pointer; user-select: none;
          transition: opacity 0.2s;
        }
        .nav-logo:hover { opacity: 0.7; }
        .nav-logo-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: linear-gradient(135deg, #d97706, #b45309);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.95rem; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(180,83,9,0.25);
        }

        .nav-tabs {
          display: flex; align-items: center;
          gap: 2px;
          background: var(--bg2);
          border: 1px solid var(--bdr);
          border-radius: 12px;
          padding: 4px;
        }
        .nav-tab {
          background: none; border: none; cursor: pointer;
          font-family: var(--fb); font-size: 0.82rem; font-weight: 500;
          color: var(--ink3); padding: 7px 18px; border-radius: 8px;
          transition: all 0.2s; display: flex; align-items: center; gap: 7px;
          white-space: nowrap;
        }
        .nav-tab:hover:not([disabled]) { color: var(--ink); background: rgba(0,0,0,0.03); }
        .nav-tab.active { background: var(--bg); color: var(--cin); font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .nav-tab[disabled] { cursor: default; opacity: 0.5; }
        .soon-pill {
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.08em;
          background: var(--cin-bg); color: var(--cin);
          padding: 2px 6px; border-radius: 99px; text-transform: uppercase;
        }

        .nav-right {
          display: flex; align-items: center; gap: 12px;
        }
        .nav-cta {
          background: var(--ink); color: var(--bg);
          border: none; cursor: pointer; font-family: var(--fb);
          font-weight: 600; font-size: 0.8rem; letter-spacing: 0.03em;
          padding: 9px 20px; border-radius: 8px;
          transition: all 0.2s;
        }
        .nav-cta:hover { background: var(--cin); transform: translateY(-1px); }

        .ham {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .ham span { display: block; width: 20px; height: 1.5px; background: var(--ink); border-radius: 2px; }
        .mob-menu {
          display: none; position: fixed; inset: 0; z-index: 190;
          background: var(--bg);
          flex-direction: column; align-items: center; justify-content: center; gap: 10px;
        }
        .mob-menu.open { display: flex; }
        .mob-close { position: absolute; top: 22px; right: 26px; background: none; border: none; cursor: pointer; font-size: 1.6rem; color: var(--ink3); }
        .mob-tab {
          background: none; border: none; cursor: pointer;
          font-family: var(--fd); font-size: 1.8rem; font-weight: 600;
          color: var(--ink); padding: 10px 24px; transition: color 0.2s;
          display: flex; align-items: center; gap: 12px;
        }
        .mob-tab.active { color: var(--cin); }
        .mob-tab:hover { color: var(--cin); }

        /* ── PAGE WRAP ── */
        .page-wrap {
          padding-top: var(--nav-h);
          transition: opacity 0.18s ease;
        }
        .page-wrap.fading { opacity: 0; }

        /* ── FOOTER ── */
        .wc-footer {
          background: var(--ink);
          color: rgba(255,255,255,0.5);
          padding: 28px 48px;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 16px;
        }
        .wc-footer-logo {
          display: flex; align-items: center; gap: 9px;
          font-family: var(--fd); font-size: 1rem; font-weight: 600;
          color: #fff;
        }
        .wc-footer-icon {
          width: 22px; height: 22px; border-radius: 6px;
          background: linear-gradient(135deg, #d97706, #b45309);
          display: flex; align-items: center; justify-content: center; font-size: 0.7rem;
        }
        .wc-footer-links { display: flex; gap: 20px; }
        .wc-footer-links button {
          background: none; border: none; cursor: pointer;
          font-family: var(--fb); font-size: 0.78rem; color: rgba(255,255,255,0.4); transition: color 0.2s;
        }
        .wc-footer-links button:hover { color: #fff; }
        .wc-footer-copy { font-size: 0.72rem; color: rgba(255,255,255,0.25); }

        @media (max-width: 820px) {
          .nav { padding: 0 20px; }
          .nav-tabs, .nav-cta, .nav-right { display: none; }
          .ham { display: flex; }
          .wc-footer { padding: 24px 20px; flex-direction: column; align-items: flex-start; gap: 14px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => go("home")}>
            <div className="nav-logo-icon">☕</div>
            Warm Cinnamon
          </div>
          <div className="nav-tabs">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`nav-tab${page === t.id ? " active" : ""}`}
                disabled={!!t.soon}
                onClick={() => go(t.id)}
              >
                {t.label}
                {t.soon && <span className="soon-pill">Soon</span>}
              </button>
            ))}
          </div>
          <div className="nav-right">
            <button className="nav-cta" onClick={() => go("mineshop")}>Try mine-shop →</button>
          </div>
          <button className="ham" onClick={() => setMenuOpen(true)}><span /><span /><span /></button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mob-menu${menuOpen ? " open" : ""}`}>
        <button className="mob-close" onClick={() => setMenuOpen(false)}>×</button>
        {TABS.map(t => (
          <button key={t.id} className={`mob-tab${page === t.id ? " active" : ""}`} onClick={() => go(t.id)}>
            {t.label} {t.soon && <span className="soon-pill">Soon</span>}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className={`page-wrap${fading ? " fading" : ""}`}>
        {page === "home" && <Home navigate={go} />}
        {page === "mineshop" && <MineShop />}
        {page === "payroll" && <Payroll />}

        <footer className="wc-footer">
          <div className="wc-footer-logo">
            <div className="wc-footer-icon">☕</div>
            Warm Cinnamon
          </div>
          <div className="wc-footer-links">
            {TABS.map(t => (
              <button key={t.id} onClick={() => go(t.id)}>{t.label}</button>
            ))}
          </div>
          <p className="wc-footer-copy">© {new Date().getFullYear()} Warm Cinnamon. Business IT Solutions.</p>
        </footer>
      </div>
    </>
  );
}