import { useState, useEffect } from "react";
import Home from "./pages/home.jsx";
import MineShop from "./pages/mineshop.jsx";
import Payroll from "./pages/payroll.jsx";

const TABS = [
  { id: "home", label: "Home" },
  { id: "mineshop", label: "E-Commerce" },
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap');

        :root {
          --black:  #0D0D0B;
          --white:  #FFFFFF;
          --cream:  #F4F2EE;
          --gray1:  #F0EEE9;
          --gray2:  #E0DDD6;
          --gray3:  #A8A49C;
          --gray4:  #6B6860;
          --nav-h:  62px;
          --fs:     'Cormorant Garamond', Georgia, serif;
          --f:      'Inter', system-ui, sans-serif;
        }

        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: var(--cream);
          color: var(--black);
          font-family: var(--f);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── NAV (hidden on home, shown on other pages) ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: var(--nav-h);
          display: flex; align-items: center;
          padding: 0 48px;
          transition: opacity 0.3s, pointer-events 0.3s;
        }
        .nav.nav-hidden {
          opacity: 0;
          pointer-events: none;
        }
        .nav.nav-visible {
          opacity: 1;
          pointer-events: all;
          background: rgba(244,242,238,0.95);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--gray2);
          box-shadow: 0 1px 8px rgba(13,13,11,0.04);
        }
        .nav-inner {
          width: 100%; max-width: 1260px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between; gap: 32px;
        }

        /* Logo */
        .nav-logo {
          display: flex; align-items: center; gap: 9px;
          font-family: var(--f); font-size: 0.9rem; font-weight: 700;
          letter-spacing: -0.025em; color: var(--black);
          cursor: pointer; user-select: none; transition: opacity 0.2s; flex-shrink: 0;
        }
        .nav-logo:hover { opacity: 0.65; }
        .nav-logo-icon {
          width: 26px; height: 26px; border-radius: 50%;
          border: 1.5px solid var(--black);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden; flex-shrink: 0;
        }
        .nav-logo-icon::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 50%; background: var(--black);
        }

        /* Tabs */
        .nav-tabs { display: flex; align-items: center; gap: 2px; }
        .nav-tab {
          background: none; border: none; cursor: pointer;
          font-family: var(--f); font-size: 0.82rem; font-weight: 500;
          color: var(--gray4); padding: 7px 16px; border-radius: 6px;
          transition: color 0.15s; white-space: nowrap;
          display: flex; align-items: center; gap: 6px;
        }
        .nav-tab:hover:not([disabled]) { color: var(--black); }
        .nav-tab.active { color: var(--black); font-weight: 600; }
        .nav-tab[disabled] { cursor: default; opacity: 0.38; }
        .soon-pill {
          font-size: 0.5rem; font-weight: 700; letter-spacing: 0.08em;
          background: var(--gray1); color: var(--gray3);
          padding: 2px 6px; border-radius: 4px; text-transform: uppercase;
          border: 1px solid var(--gray2); font-family: var(--f);
        }

        .nav-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .nav-cta {
          background: var(--black); color: var(--white);
          border: none; cursor: pointer; font-family: var(--f);
          font-weight: 600; font-size: 0.76rem;
          padding: 9px 18px; border-radius: 99px; transition: background 0.2s;
          white-space: nowrap;
        }
        .nav-cta:hover { background: #2a2a28; }

        .ham {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .ham span { display: block; width: 22px; height: 1.5px; background: var(--black); border-radius: 2px; }

        .mob-menu {
          display: none; position: fixed; inset: 0; z-index: 190;
          background: var(--cream);
          flex-direction: column; align-items: center; justify-content: center; gap: 4px;
          border-top: 1px solid var(--gray2);
        }
        .mob-menu.open { display: flex; }
        .mob-close {
          position: absolute; top: 20px; right: 24px;
          background: none; border: none; cursor: pointer;
          font-size: 1.5rem; color: var(--gray3); font-family: var(--f);
        }
        .mob-tab {
          background: none; border: none; cursor: pointer;
          font-family: var(--f); font-size: 1.9rem; font-weight: 800;
          color: var(--gray3); padding: 10px 24px; transition: color 0.15s;
          display: flex; align-items: center; gap: 12px; letter-spacing: -0.04em;
        }
        .mob-tab.active { color: var(--black); }
        .mob-tab:hover { color: var(--black); }

        /* ── PAGE WRAP ── */
        .page-wrap { transition: opacity 0.18s ease; }
        .page-wrap.fading { opacity: 0; }
        /* Home: fullscreen, no padding */
        .page-wrap.is-home {
          padding-top: 0;
          height: 100vh;
          overflow: hidden;
        }
        /* Other pages: normal padding for fixed nav */
        .page-wrap.not-home { padding-top: var(--nav-h); }

        /* ── FOOTER (hidden on home) ── */
        .wc-footer {
          background: var(--black);
          color: rgba(255,255,255,0.4);
          padding: 28px 52px;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 16px;
          font-family: var(--f);
        }
        .wc-footer.footer-hidden { display: none; }
        .wc-footer-logo {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--f); font-size: 0.88rem; font-weight: 700;
          color: var(--white); letter-spacing: -0.025em;
        }
        .wc-footer-icon {
          width: 22px; height: 22px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .wc-footer-icon::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 50%; background: rgba(255,255,255,0.2);
          border-right: 1px solid rgba(255,255,255,0.3);
        }
        .wc-footer-links { display: flex; gap: 20px; }
        .wc-footer-links button {
          background: none; border: none; cursor: pointer;
          font-family: var(--f); font-size: 0.76rem; font-weight: 400;
          color: rgba(255,255,255,0.35); transition: color 0.2s;
        }
        .wc-footer-links button:hover { color: var(--white); }
        .wc-footer-copy { font-size: 0.68rem; color: rgba(255,255,255,0.18); }

        @media (max-width: 820px) {
          .nav { padding: 0 20px; }
          .nav-tabs, .nav-right { display: none; }
          .ham { display: flex; }
          .wc-footer { padding: 24px 20px; flex-direction: column; align-items: flex-start; gap: 12px; }
          .page-wrap.is-home { height: auto; overflow: visible; }
        }
      `}</style>

      {/* NAV — hidden on home page */}
      <nav className={`nav${page === "home" ? " nav-hidden" : " nav-visible"}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => go("home")}>
            <div className="nav-logo-icon" />
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
            <button className="nav-cta" onClick={() => go("mineshop")}>Try Vanilla Bean</button>
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
      <div className={`page-wrap${fading ? " fading" : ""}${page === "home" ? " is-home" : " not-home"}`}>
        {page === "home" && <Home navigate={go} />}
        {page === "mineshop" && <MineShop />}
        {page === "payroll" && <Payroll />}

        <footer className={`wc-footer${page === "home" ? " footer-hidden" : ""}`}>
          <div className="wc-footer-logo">
            <div className="wc-footer-icon" />
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