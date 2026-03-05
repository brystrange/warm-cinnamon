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
function Reveal({ children, delay = 0, y = 16 }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>{children}</div>
  );
}

/* ── SVG Icons ── */
const IcCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const IcTimer = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IcCard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const IcTruck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const IcBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);
const IcPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const IcClipboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>
  </svg>
);
const IcFile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IcBarChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IcSettings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);
const IcBox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IcEye = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IcArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const IcCopy = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);
const IcCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const STORE_FEATURES = [
  { Icon: IcCart,  title: "Curated Collections",     desc: "Products organized into beautiful, browsable collections with cover images and descriptions." },
  { Icon: IcTimer, title: "Live Reservation Timers",  desc: "Items held exclusively for each customer with a visible countdown — no more lost carts." },
  { Icon: IcCard,  title: "Flexible Payments",        desc: "GCash, Maya, bank transfer, or Cash on Delivery. Every shopper is covered." },
  { Icon: IcTruck, title: "Order Tracking",           desc: "Step-by-step status updates from order placed to delivered — visible to every customer." },
  { Icon: IcBell,  title: "Real-Time Notifications",  desc: "Instant in-app alerts for payment confirmations, shipping updates, and order changes." },
  { Icon: IcPhone, title: "Mobile-First Design",      desc: "Every screen — store, cart, checkout — feels native on phones and tablets." },
];

const ADMIN_FEATURES = [
  { Icon: IcClipboard, title: "Order Management",      desc: "A full dashboard to review, verify payments, and track every order from one place." },
  { Icon: IcFile,      title: "Auto Invoice PDF",       desc: "Professional invoices with your branding generated instantly — no extra tools." },
  { Icon: IcBarChart,  title: "Sales Reports",          desc: "Visual revenue reports, order volume, and top products to guide business decisions." },
  { Icon: IcSettings,  title: "Store Settings",         desc: "Configure payments, reservation timers, shipping fees, and business info." },
  { Icon: IcBox,       title: "Product Control",        desc: "Add, edit, bulk-delete products, and organize them into collections with ease." },
  { Icon: IcEye,       title: "Live Reservation View",  desc: "See all active customer carts in real time — who's shopping, what's reserved." },
];

/* ── Mockup Components (re-styled B&W) ── */
function StoreMockup() {
  const products = [
    { name: "Linen Tote Bag",  price: "₱480",   tag: "New" },
    { name: "Ceramic Mug Set", price: "₱1,200", tag: "4 left" },
    { name: "Woven Placemats", price: "₱650",   tag: "" },
    { name: "Soy Candle",      price: "₱390",   tag: "Sale" },
  ];
  return (
    <div className="mw">
      <div className="mw-bar"><div className="mw-dots"><span/><span/><span/></div><div className="mw-url">vanilla-bean.vercel.app/store</div></div>
      <div className="mw-body">
        <div className="sm-nav"><span className="sm-logo">Vanilla Bean</span><div style={{display:"flex",gap:8}}><span className="sm-chip">🔍</span><span className="sm-chip sm-chip-dk">Cart 2</span></div></div>
        <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
          {["All","Home","Kitchen","Lifestyle"].map((c,i)=><span key={c} className={`sm-col${i===1?" sm-col-a":""}`}>{c}</span>)}
        </div>
        <div className="sm-grid">
          {products.map(p=>(
            <div className="sm-card" key={p.name}>
              <div className="sm-img">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.4"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              </div>
              <div className="sm-body">
                {p.tag && <span className="sm-tag">{p.tag}</span>}
                <p className="sm-name">{p.name}</p>
                <div className="sm-row"><span className="sm-price">{p.price}</span><button className="sm-add">+</button></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function CartMockup() {
  return (
    <div className="mw">
      <div className="mw-bar"><div className="mw-dots"><span/><span/><span/></div><div className="mw-url">vanilla-bean.vercel.app/cart</div></div>
      <div className="mw-body">
        <p className="cm-title">Shopping Cart <span className="cm-badge">2 items</span></p>
        <div className="cm-alert">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Items reserved for a limited time
        </div>
        {[{name:"Linen Tote Bag",qty:1,price:"₱480",timer:"14:32"},{name:"Ceramic Mug Set",qty:2,price:"₱2,400",timer:"09:11"}].map(item=>(
          <div className="cm-item" key={item.name}>
            <div className="cm-ii"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></div>
            <div className="cm-info">
              <p className="cm-name">{item.name}</p>
              <p className="cm-qty">Qty: {item.qty}</p>
              <div className="cm-timer"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> {item.timer} remaining</div>
            </div>
            <p className="cm-price">{item.price}</p>
          </div>
        ))}
        <div className="cm-total"><span>Total</span><span className="cm-tv">₱2,880</span></div>
        <button className="cm-btn">Proceed to Checkout →</button>
      </div>
    </div>
  );
}
function AdminMockup() {
  const orders = [
    { num:"ORD-0041", customer:"Maria S.", total:"₱2,880", status:"pending" },
    { num:"ORD-0040", customer:"Juan D.",  total:"₱1,200", status:"verified" },
    { num:"ORD-0039", customer:"Ana L.",   total:"₱650",   status:"shipped" },
  ];
  return (
    <div className="mw">
      <div className="mw-bar"><div className="mw-dots"><span/><span/><span/></div><div className="mw-url">vanilla-bean.vercel.app/admin</div></div>
      <div className="mw-body" style={{padding:0,display:"flex"}}>
        <div className="am-side">
          {[{label:"Orders",active:true},{label:"Products"},{label:"Reports"},{label:"Settings"}].map(i=>(
            <div key={i.label} className={`am-ni${i.active?" am-ni-a":""}`}>{i.label}</div>
          ))}
        </div>
        <div className="am-main">
          <p className="am-title">Order Management</p>
          <div className="am-stats">
            {[{v:"12",l:"Today"},{v:"3",l:"Pending"},{v:"₱18k",l:"Revenue"}].map(s=>(
              <div key={s.l} className="am-stat"><span className="am-sv">{s.v}</span><span className="am-sl">{s.l}</span></div>
            ))}
          </div>
          <div className="am-table">
            <div className="am-th"><span>Order</span><span>Customer</span><span>Total</span><span>Status</span></div>
            {orders.map(o=>(
              <div className="am-row" key={o.num}>
                <span className="am-on">{o.num}</span>
                <span>{o.customer}</span>
                <span>{o.total}</span>
                <span className={`am-badge am-badge-${o.status}`}>{o.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function InvoiceMockup() {
  return (
    <div className="mw">
      <div className="mw-bar"><div className="mw-dots"><span/><span/><span/></div><div className="mw-url">Invoice_ORD-0041.pdf</div></div>
      <div className="mw-body inv-m">
        <div className="inv-head"><div><p className="inv-biz">MY SHOP</p><p className="inv-sub">Handcrafted with love</p></div><p className="inv-label">INVOICE</p></div>
        <div className="inv-div"/>
        <div className="inv-meta">
          <div><p className="inv-k">Invoice To</p><p className="inv-v">Maria Santos</p><p className="inv-s">123 Quezon City, PH</p></div>
          <div className="inv-right"><p><b>No:</b> ORD-0041</p><p><b>Date:</b> Mar 3, 2026</p><p><b>Status:</b> <span className="inv-verified">Verified</span></p></div>
        </div>
        <div className="inv-table">
          <div className="inv-th"><span>Item</span><span>Qty</span><span>Amount</span></div>
          <div className="inv-row"><span>Linen Tote Bag</span><span>1</span><span>₱480.00</span></div>
          <div className="inv-row"><span>Ceramic Mug Set</span><span>2</span><span>₱2,400.00</span></div>
          <div className="inv-tot"><span>Total</span><span/><span>₱2,880.00</span></div>
        </div>
        <p className="inv-terms">Payment Terms: Full payment required before shipping.</p>
      </div>
    </div>
  );
}
function MockupTabs() {
  const [tab, setTab] = useState(0);
  const tabs = ["Store View","Cart & Timers","Admin Panel","Invoice PDF"];
  const mockups = [<StoreMockup/>,<CartMockup/>,<AdminMockup/>,<InvoiceMockup/>];
  return (
    <div>
      <div className="m-tabs">{tabs.map((t,i)=><button key={t} className={`m-tab${tab===i?" m-tab-a":""}`} onClick={()=>setTab(i)}>{t}</button>)}</div>
      <div key={tab} style={{animation:"ms-fadein 0.3s ease"}}>{mockups[tab]}</div>
    </div>
  );
}

export default function MineShop() {
  const [vis, setVis] = useState(false);
  const [copied, setCopied] = useState("");
  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);
  const copy = (text, key) => { navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(""), 2200); };
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700;800&display=swap');

        @keyframes ms-fadein { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ms-pulse  { 0%,100%{opacity:1} 50%{opacity:0.35} }

        /* ── Self-contained design tokens ── */
        .ms-page {
          --bg:     #FFFFFF;
          --bg2:    #F5F5F2;
          --bg3:    #EDEDE9;
          --ink:    #0D0D0B;
          --ink2:   #3A3A36;
          --ink3:   #6B6B5E;
          --ink4:   #A8A89C;
          --bdr:    #E4E0D8;
          --bdr2:   #CCCCC4;
          --cream:  #F4F2EE;
          --fs:     'Cormorant Garamond', Georgia, serif;
          --f:      'Inter', system-ui, sans-serif;
          font-family: var(--f);
          background: var(--bg);
          color: var(--ink);
        }

        /* ═══════════════════════════
           HERO — dark split layout
        ═══════════════════════════ */
        .ms-hero {
          position: relative;
          min-height: calc(100vh - 62px);
          background: #0D0D0B;
          overflow: hidden;
        }
        .ms-hero-img-col {
          position: absolute; inset: 0;
        }
        .ms-hero-img {
          position: absolute; inset: 0;
          background-image: url('https://64.media.tumblr.com/277e65664b82dd6a00ee9c96e539879a/2817a393c8af4809-04/s2048x3072/723fccdb63b5f9262fecf7d13276f363a4a785b8.jpg');
          background-size: cover; background-position: center;
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 1s ease, transform 1.8s ease;
        }
        .ms-hero-img.ms-vis { opacity: 1; transform: scale(1); }
        .ms-hero-img-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to right,
            transparent 20%,
            #111110 50%,
            #111110 90%,
            #111110 100%
          );
          pointer-events: none;
        }
        .ms-hero-img-caption {
          position: absolute; bottom: 36px; left: 36px; z-index: 2;
        }
        .ms-hero-img-caption p {
          font-family: var(--fs);
          font-size: clamp(1.6rem, 2.8vw, 2.2rem);
          font-weight: 400; font-style: italic;
          color: rgba(255,255,255,0.88);
          line-height: 1.18;
          text-shadow: 0 2px 20px rgba(0,0,0,0.45);
        }

        .ms-hero-right {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; justify-content: center;
          padding: 80px 52px 80px 44px;
          min-height: calc(100vh - 62px);
          margin-left: auto;
          width: 48%;
        }
        .ms-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--f); font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255, 255, 255, 0.84);
          margin-bottom: 24px;
        }
        .ms-hero-dot { width: 6px; height: 6px; border-radius: 50%; background: #7aeb1e; animation: ms-pulse 2s infinite; }
        .ms-hero-h1 {
          font-family: var(--fs);
          font-size: clamp(2.8rem, 5vw, 4.8rem);
          font-weight: 400; line-height: 1.05;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 20px;
        }
        .ms-hero-h1 em { font-style: italic; font-weight: 300; color: rgba(255,255,255,0.7); }
        .ms-hero-p {
          font-family: var(--f); font-size: 0.88rem; font-weight: 300;
          color: rgba(255, 255, 255, 0.72); line-height: 1.75;
          max-width: 320px; margin-bottom: 40px;
        }
        .ms-hero-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .ms-btn-white {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: #0D0D0B;
          border: none; cursor: pointer; font-family: var(--f);
          font-weight: 600; font-size: 0.82rem;
          padding: 12px 22px; border-radius: 99px; transition: all 0.22s;
        }
        .ms-btn-white:hover { background: #E8E8E4; gap: 12px; }
        .ms-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: none; color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer; font-family: var(--f);
          font-weight: 500; font-size: 0.82rem;
          padding: 12px 22px; border-radius: 99px; transition: all 0.22s;
        }
        .ms-btn-ghost:hover { border-color: rgba(255,255,255,0.35); color: #fff; }

        /* ═══════════════════════════
           STATS BAR
        ═══════════════════════════ */
        .ms-stats {
          background: #0D0D0B; padding: 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .ms-stats-inner {
          display: grid; grid-template-columns: repeat(4,1fr);
          max-width: 1260px; margin: 0 auto;
        }
        .ms-stat {
          padding: 36px 32px; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .ms-stat:last-child { border-right: none; }
        .ms-stat-v {
          display: block; font-family: Inter;
          font-size: 1.5rem; font-weight: 600;
          color: #fff; letter-spacing: -0.02em; margin-bottom: 5px;
        }
        .ms-stat-l { font-size: 0.72rem; color: rgba(255,255,255,0.35); letter-spacing: 0.04em; }

        /* ═══════════════════════════
           SECTION COMMONS
        ═══════════════════════════ */
        .ms-sec { padding: 96px 52px; }
        .ms-sec-in { max-width: 1260px; margin: 0 auto; }
        .ms-eyebrow {
          font-family: var(--f); font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink3); margin-bottom: 14px;
          display: flex; align-items: center; gap: 8px;
        }
        .ms-eyebrow::before { content:''; display:block; width:18px; height:1.5px; background:var(--ink3); }
        .ms-h2 {
          font-family: var(--fs); font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 400; line-height: 1.1; letter-spacing: -0.02em;
          color: var(--ink); margin-bottom: 14px;
        }
        .ms-h2 em { font-style: italic; }
        .ms-sub { font-family: var(--f); font-size: 0.9rem; color: var(--ink3); line-height: 1.75; max-width: 400px; font-weight: 300; }

        /* ═══════════════════════════
           FEATURE GRID
        ═══════════════════════════ */
        .ms-feat-layout {
          display: grid; grid-template-columns: 300px 1fr;
          gap: 80px; align-items: start;
        }
        .ms-feat-sticky { position: sticky; top: 88px; }
        .ms-feat-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--bdr);
          border-left: 1px solid var(--bdr);
        }
        .ms-feat-cell {
          padding: 28px 26px;
          border-bottom: 1px solid var(--bdr);
          border-right: 1px solid var(--bdr);
          transition: background 0.18s;
        }
        .ms-feat-cell:hover { background: var(--bg2); }
        .ms-feat-icon {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--ink); color: #fff;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
        }
        .ms-feat-icon svg { width:16px; height:16px; }
        .ms-feat-title { font-family: var(--f); font-size: 0.88rem; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
        .ms-feat-desc  { font-family: var(--f); font-size: 0.78rem; color: var(--ink3); line-height: 1.65; }

        /* ═══════════════════════════
           MOCKUP SECTION
        ═══════════════════════════ */
        .ms-mockup-sec {
          background: var(--bg2);
          border-top: 1px solid var(--bdr);
          border-bottom: 1px solid var(--bdr);
          padding: 96px 52px;
        }
        .ms-mockup-in { max-width: 1000px; margin: 0 auto; }

        /* Tab bar */
        .m-tabs { display: flex; gap: 6px; margin-bottom: 32px; flex-wrap: wrap; }
        .m-tab {
          padding: 7px 18px; border-radius: 99px;
          border: 1px solid var(--bdr); background: var(--bg);
          font-family: var(--f); font-size: 0.77rem; font-weight: 500;
          color: var(--ink3); cursor: pointer; transition: all 0.18s;
        }
        .m-tab:hover:not(.m-tab-a) { border-color: var(--bdr2); color: var(--ink); }
        .m-tab-a { border-color: var(--ink); background: var(--ink); color: #fff; }

        /* Browser window */
        .mw {
          border-radius: 12px; overflow: hidden;
          border: 1px solid var(--bdr2);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.08);
          background: var(--bg);
        }
        .mw-bar {
          background: var(--bg3); padding: 10px 16px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid var(--bdr);
        }
        .mw-dots { display: flex; gap: 6px; }
        .mw-dots span { width: 10px; height: 10px; border-radius: 50%; background: var(--bdr2); }
        .mw-dots span:nth-child(1){background:#FC615D}
        .mw-dots span:nth-child(2){background:#FDBC40}
        .mw-dots span:nth-child(3){background:#34C749}
        .mw-url {
          flex:1; background: var(--bg); border: 1px solid var(--bdr);
          padding: 4px 12px; border-radius: 6px;
          font-size: 0.68rem; color: var(--ink3); font-family: monospace; max-width: 320px;
        }
        .mw-body { padding: 20px; background: var(--bg); font-family: var(--f); }

        /* Store mock */
        .sm-nav { display:flex; align-items:center; justify-content:space-between; padding-bottom:10px; border-bottom:1px solid var(--bdr); margin-bottom:10px; }
        .sm-logo { font-family:var(--fs); font-size:0.85rem; font-weight:600; }
        .sm-chip { font-size:0.66rem; padding:3px 10px; border-radius:99px; border:1px solid var(--bdr); color:var(--ink3); }
        .sm-chip-dk { background:var(--ink); color:#fff; border-color:var(--ink); }
        .sm-col { font-size:0.66rem; padding:4px 11px; border-radius:99px; border:1px solid var(--bdr); color:var(--ink3); }
        .sm-col-a { background:var(--ink); color:#fff; border-color:var(--ink); }
        .sm-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
        .sm-card { border:1px solid var(--bdr); border-radius:8px; overflow:hidden; }
        .sm-img { height:56px; display:flex; align-items:center; justify-content:center; background:var(--bg2); }
        .sm-body { padding:7px; }
        .sm-tag { font-size:0.54rem; font-weight:700; background:var(--bg3); color:var(--ink3); padding:1px 5px; border-radius:3px; }
        .sm-name { font-size:0.66rem; font-weight:600; color:var(--ink); margin:3px 0 4px; }
        .sm-row { display:flex; align-items:center; justify-content:space-between; }
        .sm-price { font-size:0.68rem; font-weight:700; }
        .sm-add { width:17px; height:17px; background:var(--ink); color:#fff; border:none; border-radius:4px; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; }

        /* Cart mock */
        .cm-title { font-size:0.86rem; font-weight:700; color:var(--ink); margin-bottom:9px; display:flex; align-items:center; gap:7px; }
        .cm-badge { font-size:0.63rem; background:var(--bg2); border:1px solid var(--bdr); color:var(--ink3); padding:1px 7px; border-radius:99px; font-weight:400; }
        .cm-alert { display:flex; align-items:center; gap:6px; font-size:0.7rem; background:#FFFBEB; color:#92400E; padding:7px 11px; border-radius:7px; margin-bottom:10px; border:1px solid #FDE68A; font-weight:500; }
        .cm-item { display:flex; gap:9px; align-items:flex-start; padding:9px 0; border-bottom:1px solid var(--bdr); }
        .cm-ii { width:36px; height:36px; background:var(--bg2); border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .cm-info { flex:1; }
        .cm-name { font-size:0.74rem; font-weight:600; color:var(--ink); margin-bottom:2px; }
        .cm-qty { font-size:0.63rem; color:var(--ink3); margin-bottom:3px; }
        .cm-timer { display:inline-flex; align-items:center; gap:4px; font-size:0.61rem; background:#FFF7ED; color:#C2410C; padding:2px 6px; border-radius:5px; border:1px solid #FED7AA; font-weight:500; }
        .cm-price { font-size:0.78rem; font-weight:700; color:var(--ink); white-space:nowrap; }
        .cm-total { display:flex; justify-content:space-between; padding:10px 0 8px; font-size:0.8rem; font-weight:600; color:var(--ink); }
        .cm-tv { font-family:var(--fs); font-size:0.92rem; }
        .cm-btn { width:100%; padding:10px; background:var(--ink); color:#fff; border:none; border-radius:8px; font-size:0.76rem; font-weight:600; cursor:pointer; font-family:var(--f); }

        /* Admin mock */
        .am-side { width:110px; flex-shrink:0; background:var(--bg2); border-right:1px solid var(--bdr); padding:12px 0; }
        .am-ni { padding:7px 12px; font-size:0.68rem; font-weight:500; color:var(--ink3); cursor:pointer; }
        .am-ni-a { background:var(--bg); color:var(--ink); font-weight:600; border-right:2px solid var(--ink); }
        .am-main { flex:1; padding:14px; }
        .am-title { font-size:0.86rem; font-weight:700; color:var(--ink); margin-bottom:10px; }
        .am-stats { display:flex; gap:7px; margin-bottom:12px; }
        .am-stat { flex:1; background:var(--bg); border:1px solid var(--bdr); border-radius:7px; padding:7px; text-align:center; }
        .am-sv { display:block; font-size:0.9rem; font-weight:700; color:var(--ink); font-family:var(--fs); }
        .am-sl { font-size:0.57rem; color:var(--ink3); }
        .am-table { background:var(--bg); border:1px solid var(--bdr); border-radius:7px; overflow:hidden; }
        .am-th { display:grid; grid-template-columns:1fr 1fr 0.7fr 0.7fr; padding:6px 10px; background:var(--bg3); border-bottom:1px solid var(--bdr); font-size:0.56rem; font-weight:700; color:var(--ink3); text-transform:uppercase; letter-spacing:0.06em; }
        .am-row { display:grid; grid-template-columns:1fr 1fr 0.7fr 0.7fr; padding:7px 10px; border-bottom:1px solid var(--bdr); font-size:0.65rem; color:var(--ink2); align-items:center; }
        .am-row:last-child { border-bottom:none; }
        .am-on { font-weight:600; font-size:0.63rem; }
        .am-badge { font-size:0.56rem; font-weight:700; padding:2px 7px; border-radius:99px; text-transform:capitalize; }
        .am-badge-pending  { background:#FFFBEB; color:#92400E; }
        .am-badge-verified { background:#F0FDF4; color:#166534; }
        .am-badge-shipped  { background:#EFF6FF; color:#1E40AF; }

        /* Invoice mock */
        .inv-m { font-family:var(--f); background:white; }
        .inv-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; }
        .inv-biz { font-size:0.88rem; font-weight:800; color:var(--ink); letter-spacing:0.04em; }
        .inv-sub { font-size:0.62rem; color:var(--ink3); margin-top:1px; }
        .inv-label { font-size:1.1rem; font-weight:800; color:var(--ink3); letter-spacing:0.1em; }
        .inv-div { height:1.5px; background:var(--ink); margin-bottom:10px; }
        .inv-meta { display:flex; justify-content:space-between; margin-bottom:12px; }
        .inv-k { font-size:0.57rem; color:var(--ink3); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:2px; font-weight:700; }
        .inv-v { font-size:0.78rem; font-weight:600; color:var(--ink); }
        .inv-s { font-size:0.63rem; color:var(--ink3); }
        .inv-right { text-align:right; font-size:0.66rem; color:var(--ink2); line-height:1.85; }
        .inv-right b { color:var(--ink); }
        .inv-verified { color:#166534; font-weight:700; }
        .inv-table { border:1px solid var(--bdr); border-radius:7px; overflow:hidden; margin-bottom:9px; }
        .inv-th { display:grid; grid-template-columns:1fr 0.35fr 0.55fr; padding:5px 10px; background:var(--ink); color:white; font-size:0.6rem; font-weight:700; letter-spacing:0.05em; text-transform:uppercase; }
        .inv-row { display:grid; grid-template-columns:1fr 0.35fr 0.55fr; padding:5px 10px; border-bottom:1px solid var(--bdr); font-size:0.66rem; color:var(--ink2); }
        .inv-tot { display:grid; grid-template-columns:1fr 0.35fr 0.55fr; padding:6px 10px; background:var(--bg2); font-size:0.72rem; font-weight:700; color:var(--ink); }
        .inv-terms { font-size:0.6rem; color:var(--ink3); border-top:1px dashed var(--bdr); padding-top:7px; }

        /* ═══════════════════════════
           SANDBOX
        ═══════════════════════════ */
        .ms-sandbox-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 18px; margin-top: 44px;
        }
        .ms-cred-card {
          border: 1px solid var(--bdr); border-radius: 14px; padding: 28px;
          background: var(--bg);
        }
        .ms-cred-lbl { font-size:0.64rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--ink3); margin-bottom:16px; }
        .ms-cred-row { display:flex; align-items:center; justify-content:space-between; background:var(--bg2); border:1px solid var(--bdr); border-radius:8px; padding:10px 14px; margin-bottom:9px; }
        .ms-cred-k { font-size:0.67rem; color:var(--ink3); font-weight:500; margin-bottom:2px; }
        .ms-cred-v { font-size:0.8rem; font-weight:600; color:var(--ink); font-family:monospace; }
        .ms-copy-btn {
          display:inline-flex; align-items:center; gap:5px;
          background:none; border:1px solid var(--bdr); cursor:pointer;
          font-size:0.67rem; font-weight:500; color:var(--ink3);
          padding:5px 11px; border-radius:6px; font-family:var(--f); transition:all 0.2s;
          white-space:nowrap;
        }
        .ms-copy-btn.ok { background:#F0FDF4; color:#166534; border-color:#BBF7D0; }
        .ms-copy-btn:hover:not(.ok) { border-color:var(--ink3); color:var(--ink); }
        .ms-cred-note { margin-top:14px; background:var(--bg2); border:1px solid var(--bdr); border-radius:9px; padding:12px 15px; font-size:0.75rem; color:var(--ink3); line-height:1.65; }
        .ms-cred-note strong { color:var(--ink2); }
        /* Dark link card */
        .ms-link-card {
          background: var(--ink); border-radius: 14px; padding: 28px;
          display: flex; flex-direction: column; justify-content: space-between; gap: 24px;
        }
        .ms-link-t { font-family:var(--fs); font-size:1.7rem; font-style:italic; font-weight:400; color:rgba(255,255,255,0.9); line-height:1.45; }
        .ms-link-sub { font-size:0.73rem; color:rgba(255,255,255,0.35); margin-top:8px; font-weight:300; }
        .ms-link-btn {
          display:inline-flex; align-items:center; gap:8px;
          background:#fff; color:var(--ink); border:none; cursor:pointer;
          border-radius:99px; font-family:var(--f); font-weight:700;
          font-size:0.8rem; padding:12px 22px; transition:all 0.2s;
          text-decoration:none; width:fit-content;
        }
        .ms-link-btn:hover { background:#E8E8E4; gap:12px; }

        /* ═══════════════════════════
           BOTTOM CTA
        ═══════════════════════════ */
        .ms-cta {
          background: var(--ink);
          padding: 100px 52px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .ms-cta-glow {
          position:absolute; top:-120px; left:50%; transform:translateX(-50%);
          width:600px; height:400px; border-radius:50%;
          background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%);
          pointer-events:none;
        }
        .ms-cta-in { max-width: 540px; margin: 0 auto; position:relative; z-index:1; }
        .ms-cta-eyebrow {
          font-family:var(--f); font-size:0.68rem; font-weight:600;
          letter-spacing:0.14em; text-transform:uppercase;
          color:rgba(255,255,255,0.3); margin-bottom:20px;
        }
        .ms-cta-h {
          font-family: var(--fs); font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 400; line-height: 1.12; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 18px;
        }
        .ms-cta-h em { font-style: italic; color: rgba(255,255,255,0.6); }
        .ms-cta-p { font-family:var(--f); font-size:0.88rem; color:rgba(255,255,255,0.38); line-height:1.75; font-weight:300; margin-bottom:36px; }
        .ms-cta-btns { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }

        /* ═══════════════════════════
           RESPONSIVE
        ═══════════════════════════ */
        @media (max-width: 900px) {
          .ms-hero { min-height: 100vw; }
          .ms-hero-right { width: 100%; min-height: 100vw; padding: 48px 28px 56px; }
          .ms-hero-img-fade { background: linear-gradient(to bottom, rgba(13,13,11,0.15) 0%, rgba(13,13,11,0.82) 55%, rgba(13,13,11,0.97) 100%); }
          .ms-sec { padding: 64px 24px; }
          .ms-mockup-sec { padding: 64px 24px; }
          .ms-cta { padding: 72px 24px; }
          .ms-stats-inner { grid-template-columns: repeat(2,1fr); }
          .ms-feat-layout { grid-template-columns: 1fr; gap: 36px; }
          .ms-feat-sticky { position: static; }
          .ms-sandbox-grid { grid-template-columns: 1fr; }
          .sm-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 600px) {
          .ms-feat-grid { grid-template-columns: 1fr; }
          .ms-stats-inner { grid-template-columns: 1fr 1fr; }
          .ms-hero-btns { margin-bottom: 80px; }
        }
      `}</style>

      <div className="ms-page">

        {/* ── HERO ── */}
        <section className="ms-hero">
          <div className="ms-hero-img-col">
            <div className={`ms-hero-img${vis ? " ms-vis" : ""}`} />
            <div className="ms-hero-img-fade" />
            <div className="ms-hero-img-caption">
              <p>Vanilla Bean,<br />Yout partner in selling.</p>
            </div>
          </div>
          <div className="ms-hero-right" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(18px)", transition: "all 0.85s ease 0.15s" }}>
            <div className="ms-hero-eyebrow"><span className="ms-hero-dot" />E-Commerce · Live Now</div>
            <h1 className="ms-hero-h1">
              Your store.<br /><em>Ready for anything.</em>
            </h1>
            <p className="ms-hero-p">
              Vanilla Bean is a complete e-commerce platform for Filipino sellers — real-time cart timers, local payments, auto invoicing, and a powerful admin suite.
            </p>
            <div className="ms-hero-btns">
              <button className="ms-btn-white" onClick={() => scrollTo("ms-mockup")}>
                See it in action <IcArrow />
              </button>
              <button className="ms-btn-ghost" onClick={() => scrollTo("ms-sandbox")}>
                Try the sandbox
              </button>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="ms-stats">
          <div className="ms-stats-inner">
            {[
              { v: "3+",   l: "Payment methods" },
              { v: "100%", l: "Mobile responsive" },
              { v: "Live", l: "Reservation timers" },
              { v: "Auto", l: "Invoice generation" },
            ].map((s, i) => (
              <Reveal key={s.v} delay={i * 70}>
                <div className="ms-stat">
                  <span className="ms-stat-v">{s.v}</span>
                  <span className="ms-stat-l">{s.l}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── STORE FEATURES ── */}
        <section className="ms-sec" style={{ background: "var(--bg)" }}>
          <div className="ms-sec-in">
            <div className="ms-feat-layout">
              <div className="ms-feat-sticky">
                <Reveal>
                  <div className="ms-eyebrow">For Shoppers</div>
                  <h2 className="ms-h2">A store worth<br /><em>coming back to.</em></h2>
                  <p className="ms-sub">Smooth browsing, secure cart holds, and flexible payments — designed to give customers confidence at every step.</p>
                </Reveal>
              </div>
              <div className="ms-feat-grid">
                {STORE_FEATURES.map((f, i) => (
                  <Reveal key={f.title} delay={i * 55}>
                    <div className="ms-feat-cell">
                      <div className="ms-feat-icon"><f.Icon /></div>
                      <p className="ms-feat-title">{f.title}</p>
                      <p className="ms-feat-desc">{f.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MOCKUP TABS ── */}
        <section className="ms-mockup-sec" id="ms-mockup">
          <div className="ms-mockup-in">
            <Reveal>
              <div className="ms-eyebrow">Feature Preview</div>
              <h2 className="ms-h2">See every screen,<br /><em>before you commit.</em></h2>
              <p className="ms-sub" style={{ marginBottom: 36 }}>Explore live UI previews of the store, cart, admin panel, and invoice — exactly as your customers will experience them.</p>
            </Reveal>
            <Reveal delay={100}><MockupTabs /></Reveal>
          </div>
        </section>

        {/* ── ADMIN FEATURES ── */}
        <section className="ms-sec" style={{ background: "var(--bg2)", borderTop: "1px solid var(--bdr)" }}>
          <div className="ms-sec-in">
            <div className="ms-feat-layout">
              <div className="ms-feat-sticky">
                <Reveal>
                  <div className="ms-eyebrow">For Admins</div>
                  <h2 className="ms-h2">Every order,<br /><em>under control.</em></h2>
                  <p className="ms-sub">Verify payments, generate invoices, and read your business at a glance — all from one dashboard.</p>
                </Reveal>
              </div>
              <div className="ms-feat-grid">
                {ADMIN_FEATURES.map((f, i) => (
                  <Reveal key={f.title} delay={i * 55}>
                    <div className="ms-feat-cell">
                      <div className="ms-feat-icon"><f.Icon /></div>
                      <p className="ms-feat-title">{f.title}</p>
                      <p className="ms-feat-desc">{f.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SANDBOX ── */}
        <section className="ms-sec" id="ms-sandbox" style={{ background: "var(--bg)" }}>
          <div className="ms-sec-in" style={{ maxWidth: 860 }}>
            <Reveal>
              <div className="ms-eyebrow">Live Demo</div>
              <h2 className="ms-h2">Try it yourself —<br /><em>right now.</em></h2>
              <p className="ms-sub">Explore the full Vanilla Bean experience in our live sandbox. Shop as a customer, then log in as admin to see the other side.</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="ms-sandbox-grid">
                <div className="ms-cred-card">
                  <p className="ms-cred-lbl">Admin Credentials</p>
                  {[
                    { label: "Email",    val: "sandbox@mineshop.com", key: "email" },
                    { label: "Password", val: "sandbox1",             key: "pass" },
                  ].map(c => (
                    <div className="ms-cred-row" key={c.key}>
                      <div>
                        <p className="ms-cred-k">{c.label}</p>
                        <p className="ms-cred-v">{c.val}</p>
                      </div>
                      <button className={`ms-copy-btn${copied === c.key ? " ok" : ""}`} onClick={() => copy(c.val, c.key)}>
                        {copied === c.key ? <><IcCheck /> Copied</> : <><IcCopy /> Copy</>}
                      </button>
                    </div>
                  ))}
                  <div className="ms-cred-note">
                    <strong>How to explore:</strong> Browse and add items to cart as a shopper. Then log in with admin credentials to review orders, verify payments, and download invoices.
                  </div>
                </div>
                <div className="ms-link-card">
                  <div>
                    <p className="ms-link-t">Open the live sandbox and explore Vanilla Bean firsthand.</p>
                    <p className="ms-link-sub">No account needed to browse. Admin login required for the dashboard.</p>
                  </div>
                  <a href="https://sandbox-mine-shop.vercel.app" target="_blank" rel="noreferrer" className="ms-link-btn">
                    Open Sandbox <IcArrow />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ms-cta">
          <div className="ms-cta-glow" />
          <Reveal>
            <div className="ms-cta-in">
              <p className="ms-cta-eyebrow">Get Started</p>
              <h2 className="ms-cta-h">Open your shop.<br /><em>Own your sales.</em></h2>
              <p className="ms-cta-p">Vanilla Bean brings together everything a Filipino seller needs — beautiful storefront, smart admin tools, and flexible payments — all in one place.</p>
              <div className="ms-cta-btns">
                <button className="ms-btn-white" onClick={() => scrollTo("ms-sandbox")}>Try the Sandbox <IcArrow /></button>
                <button className="ms-btn-ghost" onClick={() => scrollTo("ms-mockup")}>Explore Features</button>
              </div>
            </div>
          </Reveal>
        </section>

      </div>
    </>
  );
}
