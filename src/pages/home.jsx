import { useState, useEffect } from "react";

export default function Home({ navigate }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap');

        /* ── FULL SCREEN RESET ── */
        html, body, #root {
          height: 100%; width: 100%; overflow: hidden;
          background: #111110;
        }

        .hm-root {
          --bg:      #111110;
          --bgr:     #161614;
          --cream:   #E8E3D8;
          --cream2:  #B8B3A8;
          --cream3:  #787368;
          --bdr:     rgba(255,255,255,0.1);
          --fs:      'Cormorant Garamond', Georgia, serif;
          --fb:      'Inter', system-ui, sans-serif;

          width: 100vw; height: 100vh;
          display: flex; flex-direction: column;
          background: var(--bg);
          overflow: hidden;
          position: relative;
          opacity: ${vis ? 1 : 0};
          transition: opacity 0.9s ease;
        }

        /* ══════════════════════════════
           TOP LOGO BAR
        ══════════════════════════════ */
        .hm-topbar {
          position: absolute; top: 0; left: 0; right: 0; z-index: 20;
          display: flex; align-items: center; justify-content: center;
          padding: 28px 40px;
          pointer-events: none;
        }
        .hm-logo {
          display: flex; align-items: center; justify-content: center;
          pointer-events: all; cursor: pointer;
          opacity: 0.9; transition: opacity 0.2s;
        }
        .hm-logo:hover { opacity: 1; }
        /* Circle icon — half-divided, like Sukoya */
        .hm-logo-icon {
          width: 36px; height: 36px;
          border: 1.5px solid rgba(255,255,255,0.5);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .hm-logo-icon::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 50%;
          background: rgba(255,255,255,0.15);
          border-right: 1.5px solid rgba(255,255,255,0.4);
        }

        /* ══════════════════════════════
           MAIN SPLIT LAYOUT
        ══════════════════════════════ */
        .hm-split {
          display: grid;
          grid-template-columns: 56% 44%;
          flex: 1;
          min-height: 0;
        }

        /* ── LEFT: IMAGE PANEL ── */
        .hm-left {
          position: relative;
          overflow: hidden;
        }
        .hm-left-img {
          position: absolute; inset: 0;
          background-image: url('/public/forest2.jpg');
          background-size: cover;
          background-position: center;
          transform: scale(${vis ? 1.0 : 1.04});
          transition: transform 1.8s ease;
        }
        /* Dark vignette on right edge — blends into dark right panel */
        .hm-left-fade-r {
          position: absolute; inset: 0;
          background: linear-gradient(to right,
            transparent 45%,
            rgba(17,17,16,0.5) 70%,
            rgba(17,17,16,0.92) 88%,
            rgba(17,17,16,1) 100%
          );
          pointer-events: none;
        }
        /* Bottom caption on image */
        .hm-left-caption {
          position: absolute;
          bottom: 32px; left: 36px;
          z-index: 10;
        }
        .hm-left-caption-text {
          font-family: var(--fs);
          font-size: clamp(1.7rem, 3vw, 2.6rem);
          font-weight: 400;
          font-style: italic;
          color: rgba(255,255,255,0.92);
          line-height: 1.15;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 24px rgba(0,0,0,0.5);
        }

        /* ── RIGHT: DARK PANEL ── */
        .hm-right {
          background: var(--bg);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 52px 80px 40px;
          position: relative;
        }

        .hm-right-content {
          max-width: 380px;
        }

        .hm-right-h1 {
          font-family: var(--fs);
          font-size: clamp(2.4rem, 4.2vw, 3.6rem);
          font-weight: 400;
          line-height: 1.12;
          color: var(--cream);
          letter-spacing: -0.015em;
          margin-bottom: 18px;
        }
        .hm-right-h1 em {
          font-style: italic;
          font-weight: 300;
        }

        .hm-right-p {
          font-family: var(--fb);
          font-size: 0.83rem;
          font-weight: 300;
          color: var(--cream3);
          line-height: 1.75;
          margin-bottom: 40px;
          letter-spacing: 0.01em;
        }

        /* Product navigation buttons */
        .hm-btns {
          display: flex; flex-direction: column; gap: 10px;
        }
        .hm-btn {
          display: flex; align-items: center; justify-content: space-between;
          background: none;
          border: 1px solid var(--bdr);
          border-radius: 99px;
          padding: 13px 20px 13px 24px;
          cursor: pointer; font-family: var(--fb);
          color: var(--cream); transition: all 0.25s;
          text-align: left;
        }
        .hm-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.22);
        }
        .hm-btn-left {
          display: flex; flex-direction: column; gap: 1px;
        }
        .hm-btn-label {
          font-size: 0.72rem; font-weight: 500;
          color: var(--cream3); letter-spacing: 0.06em; text-transform: uppercase;
        }
        .hm-btn-title {
          font-size: 0.9rem; font-weight: 400; color: var(--cream);
        }
        .hm-btn-arr {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--cream2); flex-shrink: 0;
          transition: all 0.2s;
        }
        .hm-btn:hover .hm-btn-arr {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.3);
        }

        /* Soon badge */
        .hm-btn-soon {
          font-size: 0.55rem; font-weight: 600;
          color: var(--cream3); letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.12);
          padding: 2px 8px; border-radius: 99px;
          white-space: nowrap;
        }

        /* ══════════════════════════════
           BOTTOM INFO BAR
        ══════════════════════════════ */
        .hm-bottombar {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 20;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 36px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .hm-bottombar-left {
          font-family: var(--fb); font-size: 0.72rem; font-weight: 300;
          color: var(--cream3); letter-spacing: 0.04em;
        }
        .hm-bottombar-center {
          font-family: var(--fb); font-size: 0.72rem; font-weight: 300;
          color: var(--cream3); letter-spacing: 0.06em;
          display: flex; align-items: center; gap: 10px;
        }
        .hm-bottombar-sep {
          color: rgba(255,255,255,0.25); font-size: 0.6rem;
        }
        .hm-bottombar-right {
          font-family: var(--fb); font-size: 0.72rem; font-weight: 300;
          color: var(--cream3); letter-spacing: 0.04em;
        }

        /* ══════════════════════════════
           MOBILE ADAPTATION
        ══════════════════════════════ */
        @media (max-width: 768px) {
          html, body, #root { overflow: auto; }
          .hm-root { height: auto; min-height: 100vh; }
          .hm-split { grid-template-columns: 1fr; grid-template-rows: 50vh auto; }
          .hm-left-caption { bottom: 24px; left: 24px; }
          .hm-right { padding: 48px 28px 100px; }
          .hm-right-content { max-width: 100%; }
          .hm-bottombar { padding: 16px 24px; }
          .hm-bottombar-right { display: none; }
        }
      `}</style>

      <div className="hm-root" style={{ opacity: vis ? 1 : 0 }}>

        {/* TOP LOGO */}
        <div className="hm-topbar">
          <div className="hm-logo" onClick={() => {}}>
            <div className="hm-logo-icon" />
          </div>
        </div>

        {/* MAIN SPLIT */}
        <div className="hm-split">

          {/* LEFT — Image */}
          <div className="hm-left">
            <div className="hm-left-img" />
            <div className="hm-left-fade-r" />
            <div className="hm-left-caption">
              <p className="hm-left-caption-text">
                Work smart.<br />Automate your process.
              </p>
            </div>
          </div>

          {/* RIGHT — Dark panel */}
          <div className="hm-right">
            <div className="hm-right-content">
              <h1 className="hm-right-h1">
                Run your business.<br /><em>Finally right.</em>
              </h1>
              <p className="hm-right-p">
                Practical software for Filipino businesses — built to replace the spreadsheets and workarounds for good.
              </p>

              <div className="hm-btns">

                {/* Vanilla Bean — E-Commerce */}
                <button className="hm-btn" onClick={() => navigate("mineshop")}>
                  <div className="hm-btn-left">
                    <span className="hm-btn-label">E-Commerce · Live Now</span>
                    <span className="hm-btn-title">Vanilla Bean</span>
                  </div>
                  <div className="hm-btn-arr">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </button>

                {/* Payroll — Coming Soon */}
                <button className="hm-btn" onClick={() => navigate("payroll")}>
                  <div className="hm-btn-left">
                    <span className="hm-btn-label">HR & Payroll</span>
                    <span className="hm-btn-title">Payroll System</span>
                  </div>
                  <span className="hm-btn-soon">Coming Soon</span>
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="hm-bottombar">
          <span className="hm-bottombar-left">warmcinnamon.ph</span>
          <div className="hm-bottombar-center">
            <span>e-commerce</span>
            <span className="hm-bottombar-sep">+</span>
            <span>payroll</span>
            <span className="hm-bottombar-sep">+</span>
            <span>more coming</span>
          </div>
          <span className="hm-bottombar-right">Business IT Solutions</span>
        </div>

      </div>
    </>
  );
}