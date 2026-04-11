import { useState, useEffect, useRef } from "react";

function useInView(t = 0.08) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, delay = 0, y = 16, className }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>{children}</div>
  );
}

/* ── SVG Icons ── */
const IcCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IcClick = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 15l-2 5L9 9l11 4-5 2z"/><path d="M22 22l-5-5"/>
  </svg>
);
const IcLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);
const IcQR = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="4" height="4"/><line x1="22" y1="14" x2="22" y2="22"/><line x1="14" y1="22" x2="22" y2="22"/>
  </svg>
);
const IcUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IcDashboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>
  </svg>
);
const IcBlock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
  </svg>
);
const IcPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const IcArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const PLAYER_FEATURES = [
  { Icon: IcCalendar, title: "Interactive Scheduling",    desc: "View real-time, color-coded availability at a glance." },
  { Icon: IcClick,    title: "One-Click Booking",         desc: "Tap to select your court and secure your slot instantly." },
  { Icon: IcLock,     title: "Smart Slot Locking",        desc: "15-minute protection during checkout to prevent double-bookings." },
  { Icon: IcQR,       title: "Integrated QRPH Payment",   desc: "Real-time payment via GCash, Maya, GoTyme, or Card using a QR code." },
  { Icon: IcUser,     title: "Easy Access",               desc: "One-tap Google Sign-In and self-service cancellations." },
];

const ADMIN_FEATURES = [
  { Icon: IcDashboard, title: "Dedicated Admin Dashboard", desc: "Full control over per-slot pricing and operating hours." },
  { Icon: IcBlock,     title: "Schedule Blocking",         desc: "Reserve courts for tournaments, maintenance, or any admin reasons." },
  { Icon: IcPhone,     title: "Mobile-Optimized Experience", desc: "Enjoy a native app-like feel on any device with our fully responsive design and touch-friendly UI." },
];

/* ── Mockup Components ── */
function ScheduleMockup() {
  const hours = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM"];
  const courts = ["Court 1", "Court 2", "Court 3"];
  const statuses = [
    ["open","open","booked"],
    ["booked","open","open"],
    ["open","locked","open"],
    ["open","open","booked"],
    ["booked","open","open"],
  ];
  return (
    <div className="hc-mw">
      <div className="hc-mw-bar"><div className="hc-mw-dots"><span/><span/><span/></div><div className="hc-mw-url">honeycomb-rsvn.vercel.app/schedule</div></div>
      <div className="hc-mw-body">
        <div className="hc-sc-head">
          <span className="hc-sc-title">Court Schedule — Today</span>
          <span className="hc-sc-date">Apr 10, 2026</span>
        </div>
        <div className="hc-sc-grid">
          <div className="hc-sc-corner"/>
          {courts.map(c => <div className="hc-sc-ch" key={c}>{c}</div>)}
          {hours.map((h,hi) => (
            <div className="hc-sc-row" key={h}>
              <div className="hc-sc-time">{h}</div>
              {courts.map((c,ci) => {
                const s = statuses[hi][ci];
                return <div className={`hc-sc-cell hc-sc-${s}`} key={c+h}>{s === "open" ? "Open" : s === "booked" ? "Booked" : "🔒"}</div>;
              })}
            </div>
          ))}
        </div>
        <div className="hc-sc-legend">
          <span className="hc-sc-lg"><span className="hc-lg-dot hc-lg-open"/>Available</span>
          <span className="hc-sc-lg"><span className="hc-lg-dot hc-lg-booked"/>Booked</span>
          <span className="hc-sc-lg"><span className="hc-lg-dot hc-lg-locked"/>Locked</span>
        </div>
      </div>
    </div>
  );
}

function CheckoutMockup() {
  return (
    <div className="hc-mw">
      <div className="hc-mw-bar"><div className="hc-mw-dots"><span/><span/><span/></div><div className="hc-mw-url">honeycomb-rsvn.vercel.app/checkout</div></div>
      <div className="hc-mw-body">
        <p className="hc-ck-title">Confirm Your Reservation</p>
        <div className="hc-ck-card">
          <div className="hc-ck-row"><span className="hc-ck-k">Court</span><span className="hc-ck-v">Court 2</span></div>
          <div className="hc-ck-row"><span className="hc-ck-k">Date</span><span className="hc-ck-v">Apr 10, 2026</span></div>
          <div className="hc-ck-row"><span className="hc-ck-k">Time</span><span className="hc-ck-v">7:00 AM – 8:00 AM</span></div>
          <div className="hc-ck-row hc-ck-row-total"><span className="hc-ck-k">Total</span><span className="hc-ck-v hc-ck-price">₱350.00</span></div>
        </div>
        <div className="hc-ck-lock">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          Slot locked for <strong>14:28</strong> during checkout
        </div>
        <div className="hc-ck-qr-wrap">
          <p className="hc-ck-qr-label">Scan to Pay via QRPH</p>
          <div className="hc-ck-qr">
            {/* Simplified QR code visual */}
            <svg viewBox="0 0 100 100" width="90" height="90">
              <rect x="5" y="5" width="25" height="25" rx="3" fill="#1a1a18"/>
              <rect x="70" y="5" width="25" height="25" rx="3" fill="#1a1a18"/>
              <rect x="5" y="70" width="25" height="25" rx="3" fill="#1a1a18"/>
              <rect x="10" y="10" width="15" height="15" rx="2" fill="none" stroke="#1a1a18" strokeWidth="2.5"/>
              <rect x="75" y="10" width="15" height="15" rx="2" fill="none" stroke="#1a1a18" strokeWidth="2.5"/>
              <rect x="10" y="75" width="15" height="15" rx="2" fill="none" stroke="#1a1a18" strokeWidth="2.5"/>
              <rect x="38" y="8" width="5" height="5" fill="#1a1a18"/><rect x="48" y="8" width="5" height="5" fill="#1a1a18"/>
              <rect x="38" y="18" width="5" height="5" fill="#1a1a18"/><rect x="53" y="18" width="5" height="5" fill="#1a1a18"/>
              <rect x="38" y="38" width="5" height="5" fill="#1a1a18"/><rect x="48" y="43" width="5" height="5" fill="#1a1a18"/>
              <rect x="58" y="38" width="5" height="5" fill="#1a1a18"/><rect x="43" y="53" width="5" height="5" fill="#1a1a18"/>
              <rect x="8" y="38" width="5" height="5" fill="#1a1a18"/><rect x="18" y="48" width="5" height="5" fill="#1a1a18"/>
              <rect x="8" y="53" width="5" height="5" fill="#1a1a18"/>
              <rect x="70" y="42" width="5" height="5" fill="#1a1a18"/><rect x="80" y="48" width="5" height="5" fill="#1a1a18"/>
              <rect x="38" y="70" width="5" height="5" fill="#1a1a18"/><rect x="48" y="78" width="5" height="5" fill="#1a1a18"/>
              <rect x="60" y="70" width="5" height="5" fill="#1a1a18"/><rect x="70" y="60" width="5" height="5" fill="#1a1a18"/>
              <rect x="80" y="70" width="5" height="5" fill="#1a1a18"/><rect x="88" y="80" width="5" height="5" fill="#1a1a18"/>
            </svg>
          </div>
          <div className="hc-ck-methods">GCash · Maya · GoTyme · Card</div>
        </div>
      </div>
    </div>
  );
}

function AdminMockup() {
  const slots = [
    { court: "Court 1", time: "6:00 AM", price: "₱300", status: "open" },
    { court: "Court 1", time: "7:00 AM", price: "₱350", status: "booked" },
    { court: "Court 2", time: "6:00 AM", price: "₱300", status: "blocked" },
    { court: "Court 2", time: "8:00 AM", price: "₱400", status: "open" },
  ];
  return (
    <div className="hc-mw">
      <div className="hc-mw-bar"><div className="hc-mw-dots"><span/><span/><span/></div><div className="hc-mw-url">honeycomb-rsvn.vercel.app/admin</div></div>
      <div className="hc-mw-body" style={{ padding: 0, display: "flex" }}>
        <div className="hc-am-side">
          {[{ label: "Dashboard", active: true }, { label: "Pricing" }, { label: "Blocked" }, { label: "Settings" }].map(i => (
            <div key={i.label} className={`hc-am-ni${i.active ? " hc-am-ni-a" : ""}`}>{i.label}</div>
          ))}
        </div>
        <div className="hc-am-main">
          <p className="hc-am-title">Slot Management</p>
          <div className="hc-am-stats">
            {[{ v: "8", l: "Open" }, { v: "3", l: "Booked" }, { v: "1", l: "Blocked" }, { v: "₱4.2k", l: "Today" }].map(s => (
              <div key={s.l} className="hc-am-stat"><span className="hc-am-sv">{s.v}</span><span className="hc-am-sl">{s.l}</span></div>
            ))}
          </div>
          <div className="hc-am-table">
            <div className="hc-am-th"><span>Court</span><span>Time</span><span>Price</span><span>Status</span></div>
            {slots.map((o, i) => (
              <div className="hc-am-row" key={i}>
                <span className="hc-am-on">{o.court}</span>
                <span>{o.time}</span>
                <span>{o.price}</span>
                <span className={`hc-am-badge hc-am-badge-${o.status}`}>{o.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupTabs() {
  const [tab, setTab] = useState(0);
  const tabs = ["Schedule View", "Checkout & Pay", "Admin Panel"];
  const mockups = [<ScheduleMockup />, <CheckoutMockup />, <AdminMockup />];
  return (
    <div>
      <div className="hc-m-tabs">{tabs.map((t, i) => <button key={t} className={`hc-m-tab${tab === i ? " hc-m-tab-a" : ""}`} onClick={() => setTab(i)}>{t}</button>)}</div>
      <div key={tab} style={{ animation: "hc-fadein 0.3s ease" }}>{mockups[tab]}</div>
    </div>
  );
}

export default function Honeycomb() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700;800&display=swap');

        @keyframes hc-fadein { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes hc-pulse  { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes hc-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* ── Self-contained design tokens ── */
        .hc-page {
          --bg:      #FFFFFF;
          --bg2:     #FBF9F4;
          --bg3:     #F3EFE6;
          --ink:     #1A1A18;
          --ink2:    #3A3A36;
          --ink3:    #7A7568;
          --ink4:    #A8A49C;
          --bdr:     #E8E2D4;
          --bdr2:    #D4CFC2;
          --amber:   #D97706;
          --amber-l: #FBBF24;
          --amber-bg:#FFFBEB;
          --amber-dk:#92400E;
          --honey:   #F59E0B;
          --fs:      'Cormorant Garamond', Georgia, serif;
          --f:       'Inter', system-ui, sans-serif;
          font-family: var(--f);
          background: var(--bg);
          color: var(--ink);
        }

        /* ═══════════════════════════
           HERO — warm dark split
        ═══════════════════════════ */
        .hc-hero {
          position: relative;
          min-height: calc(100vh - 62px);
          background: #1A1A18;
          overflow: hidden;
        }
        .hc-hero-img-col {
          position: absolute; inset: 0;
        }
        .hc-hero-img {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600&q=80');
          background-size: cover; background-position: center 30%;
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 1s ease, transform 1.8s ease;
        }
        .hc-hero-img.hc-vis { opacity: 0.55; transform: scale(1); }
        .hc-hero-img-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to right,
            transparent 15%,
            rgba(26,26,24,0.7) 40%,
            rgba(26,26,24,0.95) 60%,
            rgba(26,26,24,1) 100%
          );
          pointer-events: none;
        }
        .hc-hero-img-caption {
          position: absolute; bottom: 36px; left: 36px; z-index: 2;
        }
        .hc-hero-img-caption p {
          font-family: var(--fs);
          font-size: clamp(1.6rem, 2.8vw, 2.2rem);
          font-weight: 400; font-style: italic;
          color: rgba(255,255,255,0.85);
          line-height: 1.18;
          text-shadow: 0 2px 20px rgba(0,0,0,0.45);
        }

        .hc-hero-right {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; justify-content: center;
          padding: 80px 52px 80px 44px;
          min-height: calc(100vh - 62px);
          margin-left: auto;
          width: 48%;
        }
        .hc-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--f); font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--amber-l);
          margin-bottom: 24px;
        }
        .hc-hero-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--amber-l);
          animation: hc-pulse 2s infinite;
        }
        .hc-hero-h1 {
          font-family: var(--fs);
          font-size: clamp(2.8rem, 5vw, 4.8rem);
          font-weight: 400; line-height: 1.05;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 20px;
        }
        .hc-hero-h1 em {
          font-style: italic; font-weight: 300;
          background: linear-gradient(135deg, var(--amber-l), #F97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hc-hero-p {
          font-family: var(--f); font-size: 0.88rem; font-weight: 300;
          color: rgba(255,255,255,0.6); line-height: 1.75;
          max-width: 340px; margin-bottom: 40px;
        }
        .hc-hero-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .hc-btn-amber {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, var(--amber), var(--honey));
          color: #fff;
          border: none; cursor: pointer; font-family: var(--f);
          font-weight: 600; font-size: 0.82rem;
          padding: 12px 22px; border-radius: 99px; transition: all 0.22s;
          box-shadow: 0 2px 12px rgba(217,119,6,0.3);
        }
        .hc-btn-amber:hover { gap: 12px; box-shadow: 0 4px 20px rgba(217,119,6,0.45); transform: translateY(-1px); }
        .hc-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: none; color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.12);
          cursor: pointer; font-family: var(--f);
          font-weight: 500; font-size: 0.82rem;
          padding: 12px 22px; border-radius: 99px; transition: all 0.22s;
        }
        .hc-btn-ghost:hover { border-color: rgba(255,255,255,0.3); color: #fff; }

        /* ═══════════════════════════
           STATS BAR
        ═══════════════════════════ */
        .hc-stats {
          background: #1A1A18; padding: 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .hc-stats-inner {
          display: grid; grid-template-columns: repeat(4,1fr);
          max-width: 1260px; margin: 0 auto;
        }
        .hc-stat {
          padding: 36px 32px; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .hc-stat:last-child { border-right: none; }
        .hc-stat-v {
          display: block; font-family: var(--f);
          font-size: 1.5rem; font-weight: 600;
          color: var(--amber-l); letter-spacing: -0.02em; margin-bottom: 5px;
        }
        .hc-stat-l { font-size: 0.72rem; color: rgba(255,255,255,0.35); letter-spacing: 0.04em; }

        /* ═══════════════════════════
           SECTION COMMONS
        ═══════════════════════════ */
        .hc-sec { padding: 96px 52px; }
        .hc-sec-in { max-width: 1260px; margin: 0 auto; }
        .hc-eyebrow {
          font-family: var(--f); font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--amber); margin-bottom: 14px;
          display: flex; align-items: center; gap: 8px;
        }
        .hc-eyebrow::before { content:''; display:block; width:18px; height:1.5px; background: var(--amber); }
        .hc-h2 {
          font-family: var(--fs); font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 400; line-height: 1.1; letter-spacing: -0.02em;
          color: var(--ink); margin-bottom: 14px;
        }
        .hc-h2 em { font-style: italic; }
        .hc-sub { font-family: var(--f); font-size: 0.9rem; color: var(--ink3); line-height: 1.75; max-width: 400px; font-weight: 300; }

        /* ═══════════════════════════
           FEATURE GRID
        ═══════════════════════════ */
        .hc-feat-layout {
          display: grid; grid-template-columns: 300px 1fr;
          gap: 80px; align-items: start;
        }
        .hc-feat-sticky { position: sticky; top: 88px; }
        .hc-feat-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--bdr);
          border-left: 1px solid var(--bdr);
        }
        /* Override for admin features — single column for 3 items */
        .hc-feat-grid.hc-feat-grid-admin {
          grid-template-columns: 1fr 1fr 1fr;
        }
        .hc-feat-reveal {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .hc-feat-cell {
          flex: 1;
          padding: 28px 26px;
          border-bottom: 1px solid var(--bdr);
          border-right: 1px solid var(--bdr);
          transition: background 0.18s;
        }
        .hc-feat-cell:hover { background: var(--bg2); }
        .hc-feat-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, var(--amber), var(--honey));
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
          box-shadow: 0 2px 8px rgba(217,119,6,0.18);
        }
        .hc-feat-icon svg { width: 16px; height: 16px; }
        .hc-feat-title { font-family: var(--f); font-size: 0.88rem; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
        .hc-feat-desc  { font-family: var(--f); font-size: 0.78rem; color: var(--ink3); line-height: 1.65; }

        /* ═══════════════════════════
           MOCKUP SECTION
        ═══════════════════════════ */
        .hc-mockup-sec {
          background: var(--bg2);
          border-top: 1px solid var(--bdr);
          border-bottom: 1px solid var(--bdr);
          padding: 96px 52px;
        }
        .hc-mockup-in { max-width: 1000px; margin: 0 auto; }

        /* Tab bar */
        .hc-m-tabs { display: flex; gap: 6px; margin-bottom: 32px; flex-wrap: wrap; }
        .hc-m-tab {
          padding: 7px 18px; border-radius: 99px;
          border: 1px solid var(--bdr); background: var(--bg);
          font-family: var(--f); font-size: 0.77rem; font-weight: 500;
          color: var(--ink3); cursor: pointer; transition: all 0.18s;
        }
        .hc-m-tab:hover:not(.hc-m-tab-a) { border-color: var(--bdr2); color: var(--ink); }
        .hc-m-tab-a {
          border-color: var(--amber);
          background: linear-gradient(135deg, var(--amber), var(--honey));
          color: #fff;
        }

        /* Browser window */
        .hc-mw {
          border-radius: 12px; overflow: hidden;
          border: 1px solid var(--bdr2);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.08);
          background: var(--bg);
        }
        .hc-mw-bar {
          background: var(--bg3); padding: 10px 16px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid var(--bdr);
        }
        .hc-mw-dots { display: flex; gap: 6px; }
        .hc-mw-dots span { width: 10px; height: 10px; border-radius: 50%; background: var(--bdr2); }
        .hc-mw-dots span:nth-child(1){background:#FC615D}
        .hc-mw-dots span:nth-child(2){background:#FDBC40}
        .hc-mw-dots span:nth-child(3){background:#34C749}
        .hc-mw-url {
          flex:1; background: var(--bg); border: 1px solid var(--bdr);
          padding: 4px 12px; border-radius: 6px;
          font-size: 0.68rem; color: var(--ink3); font-family: monospace; max-width: 360px;
        }
        .hc-mw-body { padding: 20px; background: var(--bg); font-family: var(--f); }

        /* ── SCHEDULE MOCKUP ── */
        .hc-sc-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .hc-sc-title { font-size: 0.86rem; font-weight: 700; color: var(--ink); }
        .hc-sc-date { font-size: 0.68rem; color: var(--ink3); background: var(--bg2); border: 1px solid var(--bdr); padding: 3px 10px; border-radius: 6px; }
        .hc-sc-grid { border: 1px solid var(--bdr); border-radius: 8px; overflow: hidden; }
        .hc-sc-corner { background: var(--bg3); border-bottom: 1px solid var(--bdr); border-right: 1px solid var(--bdr); }
        .hc-sc-ch {
          background: var(--bg3); border-bottom: 1px solid var(--bdr); border-right: 1px solid var(--bdr);
          font-size: 0.64rem; font-weight: 700; color: var(--ink3); text-align: center;
          text-transform: uppercase; letter-spacing: 0.06em; padding: 7px 4px;
        }
        .hc-sc-ch:last-child { border-right: none; }
        .hc-sc-row { display: contents; }
        .hc-sc-row:last-child .hc-sc-time,
        .hc-sc-row:last-child .hc-sc-cell { border-bottom: none; }
        .hc-sc-grid { display: grid; grid-template-columns: 80px repeat(3, 1fr); }
        .hc-sc-time {
          font-size: 0.63rem; color: var(--ink3); font-weight: 500;
          padding: 10px 8px; border-bottom: 1px solid var(--bdr);
          border-right: 1px solid var(--bdr); display: flex; align-items: center;
          background: var(--bg);
        }
        .hc-sc-cell {
          font-size: 0.63rem; font-weight: 600; text-align: center;
          padding: 10px 4px; border-bottom: 1px solid var(--bdr);
          border-right: 1px solid var(--bdr); display: flex; align-items: center; justify-content: center;
        }
        .hc-sc-cell:last-child { border-right: none; }
        .hc-sc-open   { background: #F0FDF4; color: #166534; }
        .hc-sc-booked { background: #FEF2F2; color: #991B1B; }
        .hc-sc-locked { background: var(--amber-bg); color: var(--amber-dk); }
        .hc-sc-legend { display: flex; gap: 16px; margin-top: 10px; padding: 0 4px; }
        .hc-sc-lg { display: flex; align-items: center; gap: 5px; font-size: 0.62rem; color: var(--ink3); }
        .hc-lg-dot { width: 8px; height: 8px; border-radius: 2px; }
        .hc-lg-open   { background: #22C55E; }
        .hc-lg-booked { background: #EF4444; }
        .hc-lg-locked { background: var(--amber); }

        /* ── CHECKOUT MOCKUP ── */
        .hc-ck-title { font-size: 0.86rem; font-weight: 700; color: var(--ink); margin-bottom: 12px; }
        .hc-ck-card {
          border: 1px solid var(--bdr); border-radius: 10px; overflow: hidden; margin-bottom: 12px;
        }
        .hc-ck-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 14px; border-bottom: 1px solid var(--bdr);
          font-size: 0.72rem;
        }
        .hc-ck-row:last-child { border-bottom: none; }
        .hc-ck-row-total { background: var(--bg2); }
        .hc-ck-k { color: var(--ink3); font-weight: 500; }
        .hc-ck-v { color: var(--ink); font-weight: 600; }
        .hc-ck-price { font-size: 0.88rem; font-family: var(--fs); font-weight: 600; color: var(--amber); }
        .hc-ck-lock {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.68rem; font-weight: 500;
          background: var(--amber-bg); color: var(--amber-dk);
          padding: 8px 12px; border-radius: 8px; margin-bottom: 16px;
          border: 1px solid #FDE68A;
        }
        .hc-ck-lock strong { color: var(--amber); }
        .hc-ck-qr-wrap { text-align: center; }
        .hc-ck-qr-label { font-size: 0.7rem; font-weight: 600; color: var(--ink3); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.06em; }
        .hc-ck-qr {
          display: inline-flex; padding: 12px;
          border: 2px solid var(--bdr); border-radius: 10px;
          background: #fff; margin-bottom: 8px;
        }
        .hc-ck-methods { font-size: 0.62rem; color: var(--ink4); font-weight: 400; }

        /* ── ADMIN MOCKUP ── */
        .hc-am-side { width: 100px; flex-shrink: 0; background: var(--bg2); border-right: 1px solid var(--bdr); padding: 12px 0; }
        .hc-am-ni { padding: 7px 12px; font-size: 0.68rem; font-weight: 500; color: var(--ink3); cursor: pointer; }
        .hc-am-ni-a { background: var(--bg); color: var(--amber); font-weight: 600; border-right: 2px solid var(--amber); }
        .hc-am-main { flex: 1; padding: 14px; }
        .hc-am-title { font-size: 0.86rem; font-weight: 700; color: var(--ink); margin-bottom: 10px; }
        .hc-am-stats { display: flex; gap: 7px; margin-bottom: 12px; }
        .hc-am-stat { flex: 1; background: var(--bg); border: 1px solid var(--bdr); border-radius: 7px; padding: 7px; text-align: center; }
        .hc-am-sv { display: block; font-size: 0.9rem; font-weight: 700; color: var(--amber); font-family: var(--f); }
        .hc-am-sl { font-size: 0.57rem; color: var(--ink3); }
        .hc-am-table { background: var(--bg); border: 1px solid var(--bdr); border-radius: 7px; overflow: hidden; }
        .hc-am-th {
          display: grid; grid-template-columns: 1fr 1fr 0.7fr 0.7fr;
          padding: 6px 10px; background: var(--bg3);
          border-bottom: 1px solid var(--bdr);
          font-size: 0.56rem; font-weight: 700; color: var(--ink3);
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .hc-am-row {
          display: grid; grid-template-columns: 1fr 1fr 0.7fr 0.7fr;
          padding: 7px 10px; border-bottom: 1px solid var(--bdr);
          font-size: 0.65rem; color: var(--ink2); align-items: center;
        }
        .hc-am-row:last-child { border-bottom: none; }
        .hc-am-on { font-weight: 600; font-size: 0.63rem; }
        .hc-am-badge { font-size: 0.56rem; font-weight: 700; padding: 2px 7px; border-radius: 99px; text-transform: capitalize; }
        .hc-am-badge-open    { background: #F0FDF4; color: #166534; }
        .hc-am-badge-booked  { background: #EFF6FF; color: #1E40AF; }
        .hc-am-badge-blocked { background: var(--amber-bg); color: var(--amber-dk); }

        /* ═══════════════════════════
           PRICING SECTION
        ═══════════════════════════ */
        .hc-pricing-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 24px; margin-top: 44px;
        }
        .hc-pricing-card {
          border: 1px solid var(--bdr); border-radius: 12px;
          padding: 32px 28px; background: var(--bg);
          text-align: center; display: flex; flex-direction: column;
          justify-content: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hc-pricing-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.06); }
        
        /* Tier 2: Amber */
        .hc-tier-2 {
          border-color: var(--amber); background: var(--amber-bg);
          box-shadow: 0 4px 24px rgba(217,119,6,0.1);
        }
        .hc-tier-2 .hc-pc-name { color: var(--amber-dk); }
        .hc-tier-2 .hc-pc-price { color: var(--amber); }

        /* Tier 3: Rust/Terracotta */
        .hc-tier-3 {
          border-color: #EA580C; background: #FFF7ED;
          box-shadow: 0 4px 24px rgba(234,88,12,0.1);
        }
        .hc-tier-3 .hc-pc-name { color: #9A3412; }
        .hc-tier-3 .hc-pc-price { color: #EA580C; }

        /* Tier 4: Dark Premium */
        .hc-tier-4 {
          border-color: var(--ink); background: var(--ink);
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        }
        .hc-tier-4 .hc-pc-name { color: var(--amber-l); }
        .hc-tier-4 .hc-pc-price { color: #fff; }
        .hc-tier-4 .hc-pc-mo { color: rgba(255,255,255,0.6); }

        .hc-pc-name { font-size: 0.8rem; font-weight: 700; color: var(--ink2); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
        .hc-pc-price { font-family: var(--fs); font-size: 2.6rem; font-weight: 600; color: var(--ink); line-height: 1; margin-bottom: 6px; }
        .hc-pc-mo { font-size: 0.75rem; color: var(--ink3); font-weight: 500; }
        .hc-pricing-fine {
          margin-top: 36px; font-size: 0.72rem; color: var(--ink4);
          text-align: center; line-height: 1.65; max-width: 660px; margin-inline: auto;
        }

        /* ═══════════════════════════
           LIVE LINK SECTION
        ═══════════════════════════ */
        .hc-live-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 18px; margin-top: 44px;
        }
        .hc-info-card {
          border: 1px solid var(--bdr); border-radius: 14px; padding: 28px;
          background: var(--bg);
        }
        .hc-info-lbl { font-size: 0.64rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--amber); margin-bottom: 16px; }
        .hc-info-item {
          display: flex; align-items: center; gap: 10px;
          background: var(--bg2); border: 1px solid var(--bdr);
          border-radius: 8px; padding: 10px 14px; margin-bottom: 9px;
        }
        .hc-info-icon {
          width: 28px; height: 28px; border-radius: 6px;
          background: var(--amber-bg); color: var(--amber);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .hc-info-icon svg { width: 14px; height: 14px; }
        .hc-info-text { flex: 1; }
        .hc-info-k { font-size: 0.67rem; color: var(--ink3); font-weight: 500; margin-bottom: 1px; }
        .hc-info-v { font-size: 0.8rem; font-weight: 600; color: var(--ink); }
        .hc-info-note {
          margin-top: 14px; background: var(--amber-bg);
          border: 1px solid #FDE68A; border-radius: 9px;
          padding: 12px 15px; font-size: 0.75rem; color: var(--amber-dk); line-height: 1.65;
        }
        .hc-info-note strong { color: var(--ink2); }
        /* Dark link card */
        .hc-link-card {
          background: var(--ink); border-radius: 14px; padding: 28px;
          display: flex; flex-direction: column; justify-content: space-between; gap: 24px;
          position: relative; overflow: hidden;
        }
        .hc-link-card::before {
          content: '';
          position: absolute; top: -40px; right: -40px;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .hc-link-t {
          font-family: var(--fs); font-size: 1.7rem; font-style: italic;
          font-weight: 400; color: rgba(255,255,255,0.9); line-height: 1.45;
          position: relative;
        }
        .hc-link-sub { font-size: 0.73rem; color: rgba(255,255,255,0.35); margin-top: 8px; font-weight: 300; }
        .hc-link-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, var(--amber), var(--honey));
          color: #fff; border: none; cursor: pointer;
          border-radius: 99px; font-family: var(--f); font-weight: 700;
          font-size: 0.8rem; padding: 12px 22px; transition: all 0.2s;
          text-decoration: none; width: fit-content;
          box-shadow: 0 2px 12px rgba(217,119,6,0.25);
        }
        .hc-link-btn:hover { gap: 12px; box-shadow: 0 4px 20px rgba(217,119,6,0.4); transform: translateY(-1px); }

        /* ═══════════════════════════
           BOTTOM CTA
        ═══════════════════════════ */
        .hc-cta {
          background: var(--ink);
          padding: 100px 52px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .hc-cta-glow {
          position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .hc-cta-in { max-width: 540px; margin: 0 auto; position: relative; z-index: 1; }
        .hc-cta-eyebrow {
          font-family: var(--f); font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--amber); margin-bottom: 20px;
        }
        .hc-cta-h {
          font-family: var(--fs); font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 400; line-height: 1.12; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 18px;
        }
        .hc-cta-h em { font-style: italic; color: var(--amber-l); }
        .hc-cta-p {
          font-family: var(--f); font-size: 0.88rem;
          color: rgba(255,255,255,0.38); line-height: 1.75;
          font-weight: 300; margin-bottom: 36px;
        }
        .hc-cta-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

        /* ═══════════════════════════
           RESPONSIVE
        ═══════════════════════════ */
        @media (max-width: 900px) {
          .hc-hero { min-height: 100vw; }
          .hc-hero-right { width: 100%; min-height: 100vw; padding: 48px 28px 56px; }
          .hc-hero-img-fade { background: linear-gradient(to bottom, rgba(26,26,24,0.15) 0%, rgba(26,26,24,0.82) 55%, rgba(26,26,24,0.97) 100%); }
          .hc-sec { padding: 64px 24px; }
          .hc-mockup-sec { padding: 64px 24px; }
          .hc-cta { padding: 72px 24px; }
          .hc-stats-inner { grid-template-columns: repeat(2,1fr); }
          .hc-feat-layout { grid-template-columns: 1fr; gap: 36px; }
          .hc-feat-sticky { position: static; }
          .hc-feat-grid.hc-feat-grid-admin { grid-template-columns: 1fr; }
          .hc-live-grid { grid-template-columns: 1fr; }
          .hc-pricing-grid { grid-template-columns: 1fr; }
          .hc-sc-grid { grid-template-columns: 60px repeat(3, 1fr); }
        }
        @media (max-width: 600px) {
          .hc-feat-grid { grid-template-columns: 1fr; }
          .hc-stats-inner { grid-template-columns: 1fr 1fr; }
          .hc-hero-btns { margin-bottom: 80px; }
        }
      `}</style>

      <div className="hc-page">

        {/* ── HERO ── */}
        <section className="hc-hero">
          <div className="hc-hero-img-col">
            <div className={`hc-hero-img${vis ? " hc-vis" : ""}`} />
            <div className="hc-hero-img-fade" />
            <div className="hc-hero-img-caption">
              <p>Honeycomb,<br />Book your court.</p>
            </div>
          </div>
          <div className="hc-hero-right" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(18px)", transition: "all 0.85s ease 0.15s" }}>
            <div className="hc-hero-eyebrow"><span className="hc-hero-dot" />Online Reservation · Live Now</div>
            <h1 className="hc-hero-h1">
              Your game.<br /><em>Your time.</em>
            </h1>
            <p className="hc-hero-p">
              Honeycomb is a real-time court reservation system — color-coded schedules, instant QRPH payments, and smart slot locking for sports complexes.
            </p>
            <div className="hc-hero-btns">
              <button className="hc-btn-amber" onClick={() => scrollTo("hc-mockup")}>
                See it in action <IcArrow />
              </button>
              <button className="hc-btn-ghost" onClick={() => scrollTo("hc-live")}>
                Visit Live Site
              </button>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="hc-stats">
          <div className="hc-stats-inner">
            {[
              { v: "QRPH",   l: "Instant payments" },
              { v: "100%",   l: "Mobile responsive" },
              { v: "15 min", l: "Slot lock guarantee" },
              { v: "Live",   l: "Real-time schedule" },
            ].map((s, i) => (
              <Reveal key={s.v} delay={i * 70}>
                <div className="hc-stat">
                  <span className="hc-stat-v">{s.v}</span>
                  <span className="hc-stat-l">{s.l}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── PLAYER FEATURES ── */}
        <section className="hc-sec" id="hc-sec" style={{ background: "var(--bg)" }}>
          <div className="hc-sec-in">
            <div className="hc-feat-layout">
              <div className="hc-feat-sticky">
                <Reveal>
                  <div className="hc-eyebrow">For Players</div>
                  <h2 className="hc-h2">Book your court.<br /><em>Skip the hassle.</em></h2>
                  <p className="hc-sub">Real-time availability, instant locking, and seamless payments — from schedule to confirmation in under a minute.</p>
                </Reveal>
              </div>
              <div className="hc-feat-grid">
                {PLAYER_FEATURES.map((f, i) => (
                  <Reveal className="hc-feat-reveal" key={f.title} delay={i * 55}>
                    <div className="hc-feat-cell">
                      <div className="hc-feat-icon"><f.Icon /></div>
                      <p className="hc-feat-title">{f.title}</p>
                      <p className="hc-feat-desc">{f.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MOCKUP TABS ── */}
        <section className="hc-mockup-sec" id="hc-mockup">
          <div className="hc-mockup-in">
            <Reveal>
              <div className="hc-eyebrow">Feature Preview</div>
              <h2 className="hc-h2">See every screen,<br /><em>before you play.</em></h2>
              <p className="hc-sub" style={{ marginBottom: 36 }}>Explore live UI previews of the schedule, checkout, and admin panel — exactly as your players and admins will experience them.</p>
            </Reveal>
            <Reveal delay={100}><MockupTabs /></Reveal>
          </div>
        </section>

        {/* ── ADMIN FEATURES ── */}
        <section className="hc-sec" style={{ background: "var(--bg2)", borderTop: "1px solid var(--bdr)" }}>
          <div className="hc-sec-in">
            <div className="hc-feat-layout">
              <div className="hc-feat-sticky">
                <Reveal>
                  <div className="hc-eyebrow">For Admins</div>
                  <h2 className="hc-h2">Every court,<br /><em>under control.</em></h2>
                  <p className="hc-sub">Set pricing, block schedules, and manage your entire complex from one powerful dashboard.</p>
                </Reveal>
              </div>
              <div className="hc-feat-grid hc-feat-grid-admin">
                {ADMIN_FEATURES.map((f, i) => (
                  <Reveal className="hc-feat-reveal" key={f.title} delay={i * 55}>
                    <div className="hc-feat-cell">
                      <div className="hc-feat-icon"><f.Icon /></div>
                      <p className="hc-feat-title">{f.title}</p>
                      <p className="hc-feat-desc">{f.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className="hc-sec" id="hc-pricing" style={{ background: "var(--bg)", borderTop: "1px solid var(--bdr)" }}>
          <div className="hc-sec-in" style={{ maxWidth: 1080 }}>
            <Reveal>
              <div className="hc-eyebrow">Pricing Plans</div>
              <h2 className="hc-h2">Simple, transparent<br /><em>pricing.</em></h2>
              <p className="hc-sub">All pricing tiers are inclusive of 1 admin access and a custom domain.</p>
            </Reveal>
            <div className="hc-pricing-grid">
              <Reveal delay={100}>
                <div className="hc-pricing-card">
                  <p className="hc-pc-name">1 to 3 Courts</p>
                  <p className="hc-pc-price">₱1,500</p>
                  <p className="hc-pc-mo">per month</p>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <div className="hc-pricing-card hc-tier-2">
                  <p className="hc-pc-name">4 to 5 Courts</p>
                  <p className="hc-pc-price">₱2,500</p>
                  <p className="hc-pc-mo">per month</p>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="hc-pricing-card hc-tier-3">
                  <p className="hc-pc-name">6 to 10 Courts</p>
                  <p className="hc-pc-price">₱3,000</p>
                  <p className="hc-pc-mo">per month</p>
                </div>
              </Reveal>
              <Reveal delay={250}>
                <div className="hc-pricing-card hc-tier-4">
                  <p className="hc-pc-name">10+ Courts</p>
                  <p className="hc-pc-price">₱4,000</p>
                  <p className="hc-pc-mo">per month</p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={300}>
              <p className="hc-pricing-fine">
                We use PayMongo® to make your booking experience fast and secure.<br/>Please note a 1.34% processing fee is applied by the payment provider for all QRPH transactions.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── LIVE SITE LINK ── */}
        <section className="hc-sec" id="hc-live" style={{ background: "var(--bg2)", borderTop: "1px solid var(--bdr)" }}>
          <div className="hc-sec-in" style={{ maxWidth: 860 }}>
            <Reveal>
              <div className="hc-eyebrow">Live Now</div>
              <h2 className="hc-h2">Try it yourself —<br /><em>in real time.</em></h2>
              <p className="hc-sub">Explore Honeycomb's live reservation system. Browse the schedule, pick a court, and see the booking flow firsthand.</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="hc-live-grid">
                <div className="hc-info-card">
                  <p className="hc-info-lbl">How It Works</p>
                  {[
                    { icon: <IcUser />,     step: "Step 1", desc: "Sign in with Google" },
                    { icon: <IcCalendar />, step: "Step 2", desc: "Browse court schedule" },
                    { icon: <IcClick />,    step: "Step 3", desc: "Select a time slot" },
                    { icon: <IcQR />,       step: "Step 4", desc: "Pay via QRPH & confirm" },
                  ].map(item => (
                    <div className="hc-info-item" key={item.step}>
                      <div className="hc-info-icon">{item.icon}</div>
                      <div className="hc-info-text">
                        <p className="hc-info-k">{item.step}</p>
                        <p className="hc-info-v">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                  <div className="hc-info-note">
                    <strong>Quick & secure:</strong> Your slot is locked for 15 minutes during checkout. Complete your QRPH payment to confirm the reservation.
                  </div>
                </div>
                <div className="hc-link-card">
                  <div>
                    <p className="hc-link-t">Open the live reservation system and book your court today.</p>
                    <p className="hc-link-sub">Sign in with Google to browse schedules and reserve courts.</p>
                  </div>
                  <a href="https://honeycomb-rsvn.vercel.app" target="_blank" rel="noreferrer" className="hc-link-btn">
                    Open Honeycomb <IcArrow />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="hc-cta">
          <div className="hc-cta-glow" />
          <Reveal>
            <div className="hc-cta-in">
              <p className="hc-cta-eyebrow">Get Started</p>
              <h2 className="hc-cta-h">Book smarter.<br /><em>Play sooner.</em></h2>
              <p className="hc-cta-p">Honeycomb brings together real-time scheduling, instant payments, and smart admin tools — all in one beautifully designed platform for sports complexes.</p>
              <div className="hc-cta-btns">
                <a href="https://honeycomb-rsvn.vercel.app" target="_blank" rel="noreferrer" className="hc-btn-amber" style={{ textDecoration: "none" }}>Visit Honeycomb <IcArrow /></a>
                <button className="hc-btn-ghost" onClick={() => scrollTo("hc-mockup")}>Explore Features</button>
              </div>
            </div>
          </Reveal>
        </section>

      </div>
    </>
  );
}
