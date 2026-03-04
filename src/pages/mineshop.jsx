import { useState, useEffect, useRef } from "react";

/* ─── Scroll-reveal hook ─── */
function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVis(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, vis];
}

function Reveal({ children, delay = 0, y = 20 }) {
    const [ref, vis] = useInView();
    return (
        <div ref={ref} style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : `translateY(${y}px)`,
            transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        }}>
            {children}
        </div>
    );
}

/* ─── Data ─── */
const STORE_FEATURES = [
    { icon: "🗂️", title: "Curated Collections", desc: "Products organized into beautiful, browsable collections with cover images and descriptions." },
    { icon: "⏱️", title: "Live Reservation Timers", desc: "Items held exclusively for each customer with a visible countdown — no more lost carts." },
    { icon: "💳", title: "Flexible Payments", desc: "GCash, Maya, bank transfer, or Cash on Delivery. Every shopper is covered." },
    { icon: "🚚", title: "Order Tracking", desc: "Step-by-step status updates from order placed to delivered — visible to every customer." },
    { icon: "🔔", title: "Real-Time Notifications", desc: "Instant in-app alerts for payment confirmations, shipping updates, and order changes." },
    { icon: "📱", title: "Mobile-First Design", desc: "Every screen — store, cart, checkout — feels native on phones and tablets." },
];

const ADMIN_FEATURES = [
    { icon: "📋", title: "Order Management", desc: "A full dashboard to review, verify payments, and track every order from one place." },
    { icon: "🧾", title: "Auto Invoice PDF", desc: "Professional invoices with your branding, terms, and payment details — generated instantly." },
    { icon: "📊", title: "Sales Reports", desc: "Visual revenue reports, order volume, and top products to guide business decisions." },
    { icon: "⚙️", title: "Store Settings", desc: "Configure payment accounts, reservation timers, shipping fees, and business info." },
    { icon: "🗃️", title: "Product Control", desc: "Add, edit, bulk-delete products, and organize them into collections with ease." },
    { icon: "👁️", title: "Live Reservation View", desc: "See all active customer carts in real time — who's shopping, what's reserved, when it expires." },
];

/* ─── UI Mockup Components ─── */
function StoreMockup() {
    const products = [
        { name: "Linen Tote Bag", price: "₱480", tag: "New", img: "🛍️" },
        { name: "Ceramic Mug Set", price: "₱1,200", tag: "4 left", img: "☕" },
        { name: "Woven Placemats", price: "₱650", tag: "", img: "🪡" },
        { name: "Soy Candle", price: "₱390", tag: "Sale", img: "🕯️" },
    ];
    return (
        <div className="mw">
            <div className="mw-bar">
                <div className="mw-dots"><span /><span /><span /></div>
                <div className="mw-url">sandbox-mine-shop.vercel.app/store</div>
            </div>
            <div className="mw-body store-m">
                <div className="sm-nav">
                    <span className="sm-logo">Vanilla Bean</span>
                    <div className="sm-nav-r">
                        <span className="sm-search">🔍 Search</span>
                        <span className="sm-cart">🛒 2</span>
                    </div>
                </div>
                <div className="sm-cols">
                    {["All", "Home", "Kitchen", "Lifestyle"].map((c, i) => (
                        <span key={c} className={`sm-chip${i === 1 ? " active" : ""}`}>{c}</span>
                    ))}
                </div>
                <div className="sm-grid">
                    {products.map(p => (
                        <div className="sm-card" key={p.name}>
                            <div className="sm-img">{p.img}</div>
                            <div className="sm-cb">
                                {p.tag && <span className="sm-tag">{p.tag}</span>}
                                <p className="sm-name">{p.name}</p>
                                <div className="sm-cf">
                                    <span className="sm-price">{p.price}</span>
                                    <button className="sm-add">+</button>
                                </div>
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
            <div className="mw-bar">
                <div className="mw-dots"><span /><span /><span /></div>
                <div className="mw-url">sandbox-mine-shop.vercel.app/cart</div>
            </div>
            <div className="mw-body cart-m">
                <p className="cm-title">Shopping Cart <span className="cm-badge">2 items</span></p>
                <div className="cm-alert">⚠️ Items reserved for a limited time</div>
                {[
                    { name: "Linen Tote Bag", qty: 1, price: "₱480", timer: "14:32" },
                    { name: "Ceramic Mug Set", qty: 2, price: "₱2,400", timer: "09:11" },
                ].map(item => (
                    <div className="cm-item" key={item.name}>
                        <div className="cm-ii">📦</div>
                        <div className="cm-info">
                            <p className="cm-iname">{item.name}</p>
                            <p className="cm-qty">Qty: {item.qty}</p>
                            <div className="cm-timer">⏱ {item.timer} remaining</div>
                        </div>
                        <p className="cm-iprice">{item.price}</p>
                    </div>
                ))}
                <div className="cm-total"><span>Total</span><span className="cm-tv">₱2,880</span></div>
                <button className="cm-checkout">Proceed to Checkout →</button>
            </div>
        </div>
    );
}

function AdminMockup() {
    const orders = [
        { num: "ORD-0041", customer: "Maria S.", total: "₱2,880", status: "pending", badge: "Pending" },
        { num: "ORD-0040", customer: "Juan D.", total: "₱1,200", status: "verified", badge: "Verified" },
        { num: "ORD-0039", customer: "Ana L.", total: "₱650", status: "shipped", badge: "Shipped" },
    ];
    return (
        <div className="mw">
            <div className="mw-bar">
                <div className="mw-dots"><span /><span /><span /></div>
                <div className="mw-url">sandbox-mine-shop.vercel.app/admin</div>
            </div>
            <div className="mw-body admin-m">
                <div className="am-side">
                    {["📋 Orders", "🗃️ Products", "📊 Reports", "⚙️ Settings"].map((t, i) => (
                        <div key={t} className={`am-ni${i === 0 ? " active" : ""}`}>{t}</div>
                    ))}
                </div>
                <div className="am-main">
                    <p className="am-h">Order Management</p>
                    <div className="am-stats">
                        <div className="am-s"><span className="am-sv">12</span><span className="am-sl">Today</span></div>
                        <div className="am-s"><span className="am-sv">3</span><span className="am-sl">Pending</span></div>
                        <div className="am-s"><span className="am-sv">₱18k</span><span className="am-sl">Revenue</span></div>
                    </div>
                    <div className="am-table">
                        <div className="am-th"><span>Order</span><span>Customer</span><span>Total</span><span>Status</span></div>
                        {orders.map(o => (
                            <div className="am-row" key={o.num}>
                                <span className="am-on">{o.num}</span>
                                <span>{o.customer}</span>
                                <span>{o.total}</span>
                                <span className={`am-b am-b-${o.status}`}>{o.badge}</span>
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
            <div className="mw-bar">
                <div className="mw-dots"><span /><span /><span /></div>
                <div className="mw-url">Invoice_ORD-0041.pdf</div>
            </div>
            <div className="mw-body inv-m">
                <div className="inv-h">
                    <div><p className="inv-biz">MY SHOP</p><p className="inv-tag">Handcrafted with love</p></div>
                    <p className="inv-t">INVOICE</p>
                </div>
                <div className="inv-div" />
                <div className="inv-meta">
                    <div>
                        <p className="inv-lbl">Invoice To</p>
                        <p className="inv-val">Maria Santos</p>
                        <p className="inv-sub">123 Quezon City, PH</p>
                    </div>
                    <div className="inv-mr">
                        <p><span className="inv-k">No:</span> ORD-0041</p>
                        <p><span className="inv-k">Date:</span> Mar 3, 2026</p>
                        <p><span className="inv-k">Status:</span> <span className="inv-st">Verified</span></p>
                    </div>
                </div>
                <div className="inv-table">
                    <div className="inv-th"><span>Item</span><span>Qty</span><span>Amount</span></div>
                    <div className="inv-row"><span>Linen Tote Bag</span><span>1</span><span>₱480.00</span></div>
                    <div className="inv-row"><span>Ceramic Mug Set</span><span>2</span><span>₱2,400.00</span></div>
                    <div className="inv-tot"><span>Total</span><span /><span>₱2,880.00</span></div>
                </div>
                <p className="inv-terms">Payment Terms: Full payment required before shipping.</p>
            </div>
        </div>
    );
}

function MockupTabs() {
    const [tab, setTab] = useState(0);
    const tabs = ["Store View", "Cart & Timers", "Admin Panel", "Invoice PDF"];
    const mockups = [<StoreMockup />, <CartMockup />, <AdminMockup />, <InvoiceMockup />];
    return (
        <div>
            <div className="m-tabs">
                {tabs.map((t, i) => (
                    <button key={t} className={`m-tab${tab === i ? " active" : ""}`} onClick={() => setTab(i)}>{t}</button>
                ))}
            </div>
            <div style={{ animation: "fadein 0.3s ease" }} key={tab}>
                {mockups[tab]}
            </div>
        </div>
    );
}

/* ─── Main Page Component ─── */
export default function MineShop() {
    const [heroVis, setHeroVis] = useState(false);
    const [copied, setCopied] = useState("");

    useEffect(() => {
        const t = setTimeout(() => setHeroVis(true), 80);
        return () => clearTimeout(t);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const copy = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(""), 2000);
    };

    return (
        <>
            <style>{`
        /* ── mine-shop page styles ── */
        /* Local vars for green accent */
        .ms-page {
          --grn: #2d6a4f; --grnl: #40916c; --grnbg: #d8f3dc; --grnbg2: #f0faf3;
          --amb: #b45309; --ambbg: #fef3c7;
          --blu: #1d4ed8; --blubg: #eff6ff;
        }

        @keyframes fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ms-blink{0%,100%{opacity:1}50%{opacity:0.3}}

        /* HERO */
        .ms-hero {
          min-height: calc(100vh - 64px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 120px 48px 80px; text-align: center; position: relative;
        }
        .ms-hero-dots {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, var(--bdr) 1.2px, transparent 1.2px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 80%);
        }
        .ms-pill {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--grnbg2); border: 1px solid #b7e4c7;
          padding: 6px 14px; border-radius: 999px;
          font-size: 0.72rem; font-weight: 600; color: var(--grn);
          letter-spacing: 0.06em; text-transform: uppercase;
          margin-bottom: 28px; position: relative; z-index: 1;
        }
        .ms-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--grnl); animation: ms-blink 2s infinite; }
        .ms-h1 {
          font-family: var(--fd); font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 600; line-height: 1.08; letter-spacing: -0.02em;
          color: var(--ink); margin-bottom: 10px; position: relative; z-index: 1;
        }
        .ms-h1 em { font-style: italic; color: var(--grnl); }
        .ms-h2 {
          font-family: var(--fd); font-size: clamp(1rem, 2.2vw, 1.45rem);
          font-weight: 400; font-style: italic; color: var(--ink3);
          margin-bottom: 22px; position: relative; z-index: 1;
        }
        .ms-hero-p {
          font-size: 1rem; color: var(--ink2); line-height: 1.75;
          max-width: 500px; font-weight: 300; margin-bottom: 40px; position: relative; z-index: 1;
        }
        .ms-hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }
        .ms-btn-dk {
          background: var(--ink); color: var(--bg); border: none; cursor: pointer;
          font-family: var(--fb); font-weight: 600; font-size: 0.9rem;
          padding: 13px 28px; border-radius: var(--r); transition: all 0.2s;
        }
        .ms-btn-dk:hover { background: var(--grn); transform: translateY(-2px); }
        .ms-btn-ol {
          background: transparent; color: var(--ink); border: 1.5px solid var(--bdr2);
          cursor: pointer; font-family: var(--fb); font-weight: 500; font-size: 0.9rem;
          padding: 13px 28px; border-radius: var(--r); transition: all 0.2s;
        }
        .ms-btn-ol:hover { border-color: var(--ink); }

        /* STATS */
        .ms-stats { background: var(--ink); padding: 48px; }
        .ms-stats-g { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(4,1fr); }
        .ms-stat { text-align: center; padding: 16px; border-right: 1px solid rgba(255,255,255,0.08); }
        .ms-stat:last-child { border-right: none; }
        .ms-sv { font-family: var(--fd); font-size: 2.2rem; font-weight: 600; color: #fff; display: block; margin-bottom: 6px; letter-spacing: -0.02em; }
        .ms-sl { font-size: 0.75rem; color: rgba(255,255,255,0.45); }

        /* SECTION */
        .ms-section { padding: 96px 48px; }
        .ms-slbl { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--grn); margin-bottom: 14px; }
        .ms-stitle { font-family: var(--fd); font-size: clamp(1.8rem, 3.5vw, 2.6rem); line-height: 1.18; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 12px; }
        .ms-stitle em { font-style: italic; }
        .ms-sp { font-size: 0.95rem; color: var(--ink2); line-height: 1.75; max-width: 440px; font-weight: 300; }
        .ms-sdiv { width: 32px; height: 1.5px; background: var(--grnl); margin: 16px 0; }

        /* FEATURE LAYOUT */
        .ms-fl { max-width: 1120px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.7fr; gap: 80px; align-items: start; }
        .ms-fsticky { position: sticky; top: 110px; }
        .ms-fgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .ms-fcard { background: var(--bg); border: 1px solid var(--bdr); border-radius: var(--r); padding: 22px; transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
        .ms-fcard:hover { border-color: var(--bdr2); box-shadow: var(--sh); transform: translateY(-2px); }
        .ms-ficon { font-size: 1.2rem; display: block; margin-bottom: 10px; }
        .ms-ftitle { font-size: 0.875rem; font-weight: 600; color: var(--ink); margin-bottom: 5px; }
        .ms-fdesc { font-size: 0.8rem; color: var(--ink3); line-height: 1.6; }

        /* MOCKUP SECTION */
        .ms-msec { background: var(--bg2); border-top: 1px solid var(--bdr); border-bottom: 1px solid var(--bdr); padding: 96px 48px; }
        .ms-msec-in { max-width: 1000px; margin: 0 auto; }
        .m-tabs { display: flex; gap: 8px; margin-bottom: 36px; flex-wrap: wrap; }
        .m-tab { padding: 8px 18px; border-radius: 999px; border: 1.5px solid var(--bdr); background: var(--bg); font-family: var(--fb); font-size: 0.78rem; font-weight: 500; color: var(--ink2); cursor: pointer; transition: all 0.2s; }
        .m-tab.active { border-color: var(--ink); background: var(--ink); color: var(--bg); }
        .m-tab:hover:not(.active) { border-color: var(--bdr2); color: var(--ink); }

        /* BROWSER WINDOW */
        .mw { border-radius: 12px; overflow: hidden; border: 1px solid var(--bdr2); box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.1); background: var(--bg); }
        .mw-bar { background: var(--bg3); padding: 10px 16px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid var(--bdr); }
        .mw-dots { display: flex; gap: 6px; }
        .mw-dots span { width: 10px; height: 10px; border-radius: 50%; background: var(--bdr2); }
        .mw-dots span:nth-child(1){background:#fc615d;}
        .mw-dots span:nth-child(2){background:#fdbc40;}
        .mw-dots span:nth-child(3){background:#34c749;}
        .mw-url { flex: 1; background: var(--bg); border: 1px solid var(--bdr); padding: 5px 12px; border-radius: 6px; font-size: 0.7rem; color: var(--ink3); font-family: monospace; max-width: 300px; }
        .mw-body { padding: 20px; background: var(--bg); }

        /* STORE MOCK */
        .store-m { font-family: var(--fb); }
        .sm-nav { display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid var(--bdr); margin-bottom: 12px; }
        .sm-logo { font-family: var(--fd); font-size: 0.85rem; font-weight: 600; }
        .sm-nav-r { display: flex; gap: 10px; align-items: center; }
        .sm-search { font-size: 0.68rem; color: var(--ink3); background: var(--bg2); padding: 4px 10px; border-radius: 6px; border: 1px solid var(--bdr); }
        .sm-cart { font-size: 0.68rem; font-weight: 600; background: var(--ink); color: var(--bg); padding: 4px 10px; border-radius: 6px; }
        .sm-cols { display: flex; gap: 7px; margin-bottom: 12px; flex-wrap: wrap; }
        .sm-chip { font-size: 0.67rem; padding: 4px 11px; border-radius: 999px; border: 1px solid var(--bdr); color: var(--ink3); cursor: pointer; }
        .sm-chip.active { background: var(--ink); color: var(--bg); border-color: var(--ink); }
        .sm-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
        .sm-card { border: 1px solid var(--bdr); border-radius: 8px; overflow: hidden; }
        .sm-img { height: 60px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; background: var(--bg2); }
        .sm-cb { padding: 8px; }
        .sm-tag { font-size: 0.56rem; font-weight: 700; background: var(--grnbg); color: var(--grn); padding: 1px 6px; border-radius: 4px; letter-spacing: 0.04em; }
        .sm-name { font-size: 0.68rem; font-weight: 600; color: var(--ink); margin: 4px 0 5px; line-height: 1.3; }
        .sm-cf { display: flex; align-items: center; justify-content: space-between; }
        .sm-price { font-size: 0.7rem; font-weight: 700; color: var(--ink); }
        .sm-add { width: 18px; height: 18px; background: var(--ink); color: var(--bg); border: none; border-radius: 4px; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1; }

        /* CART MOCK */
        .cart-m { font-family: var(--fb); }
        .cm-title { font-size: 0.88rem; font-weight: 700; color: var(--ink); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .cm-badge { font-size: 0.65rem; background: var(--bg2); border: 1px solid var(--bdr); color: var(--ink3); padding: 2px 8px; border-radius: 999px; font-weight: 400; }
        .cm-alert { font-size: 0.7rem; background: var(--ambbg); color: var(--amb); padding: 7px 12px; border-radius: 7px; margin-bottom: 12px; font-weight: 500; }
        .cm-item { display: flex; gap: 10px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid var(--bdr); }
        .cm-item:last-of-type { border-bottom: none; }
        .cm-ii { width: 40px; height: 40px; background: var(--bg2); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
        .cm-info { flex: 1; }
        .cm-iname { font-size: 0.76rem; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
        .cm-qty { font-size: 0.66rem; color: var(--ink3); margin-bottom: 4px; }
        .cm-timer { font-size: 0.63rem; background: #fff7ed; color: #c2410c; padding: 2px 7px; border-radius: 5px; display: inline-block; font-weight: 500; border: 1px solid #fed7aa; }
        .cm-iprice { font-size: 0.8rem; font-weight: 700; color: var(--ink); white-space: nowrap; }
        .cm-total { display: flex; justify-content: space-between; padding: 12px 0 10px; font-size: 0.82rem; font-weight: 600; color: var(--ink); }
        .cm-tv { font-size: 0.95rem; font-family: var(--fd); }
        .cm-checkout { width: 100%; padding: 11px; background: var(--ink); color: var(--bg); border: none; border-radius: 8px; font-size: 0.78rem; font-weight: 600; cursor: pointer; }

        /* ADMIN MOCK */
        .admin-m { display: flex; padding: 0; background: var(--bg2); }
        .am-side { width: 120px; flex-shrink: 0; background: var(--bg); border-right: 1px solid var(--bdr); padding: 14px 0; }
        .am-ni { padding: 8px 12px; font-size: 0.68rem; font-weight: 500; color: var(--ink3); cursor: pointer; }
        .am-ni.active { background: var(--bg2); color: var(--ink); font-weight: 600; border-right: 2px solid var(--grn); }
        .am-main { flex: 1; padding: 16px; }
        .am-h { font-size: 0.88rem; font-weight: 700; color: var(--ink); margin-bottom: 12px; }
        .am-stats { display: flex; gap: 8px; margin-bottom: 14px; }
        .am-s { flex: 1; background: var(--bg); border: 1px solid var(--bdr); border-radius: 7px; padding: 8px; text-align: center; }
        .am-sv { display: block; font-size: 0.95rem; font-weight: 700; color: var(--ink); font-family: var(--fd); }
        .am-sl { font-size: 0.58rem; color: var(--ink3); }
        .am-table { background: var(--bg); border: 1px solid var(--bdr); border-radius: 7px; overflow: hidden; }
        .am-th { display: grid; grid-template-columns: 1fr 1fr 0.7fr 0.7fr; padding: 6px 10px; background: var(--bg3); border-bottom: 1px solid var(--bdr); font-size: 0.58rem; font-weight: 700; color: var(--ink3); text-transform: uppercase; letter-spacing: 0.06em; }
        .am-row { display: grid; grid-template-columns: 1fr 1fr 0.7fr 0.7fr; padding: 7px 10px; border-bottom: 1px solid var(--bdr); font-size: 0.67rem; color: var(--ink2); align-items: center; }
        .am-row:last-child { border-bottom: none; }
        .am-on { font-weight: 600; color: var(--ink); font-size: 0.65rem; }
        .am-b { font-size: 0.58rem; font-weight: 700; padding: 2px 7px; border-radius: 999px; }
        .am-b-pending { background: var(--ambbg); color: var(--amb); }
        .am-b-verified { background: var(--grnbg); color: var(--grn); }
        .am-b-shipped { background: var(--blubg); color: var(--blu); }

        /* INVOICE MOCK */
        .inv-m { font-family: var(--fb); background: white; }
        .inv-h { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
        .inv-biz { font-size: 0.9rem; font-weight: 800; color: var(--ink); letter-spacing: 0.04em; }
        .inv-tag { font-size: 0.65rem; color: var(--ink3); margin-top: 2px; }
        .inv-t { font-size: 1.2rem; font-weight: 800; color: var(--ink3); letter-spacing: 0.1em; }
        .inv-div { height: 1.5px; background: var(--ink); margin-bottom: 12px; }
        .inv-meta { display: flex; justify-content: space-between; margin-bottom: 14px; }
        .inv-lbl { font-size: 0.58rem; color: var(--ink3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 3px; }
        .inv-val { font-size: 0.8rem; font-weight: 600; color: var(--ink); }
        .inv-sub { font-size: 0.66rem; color: var(--ink3); }
        .inv-mr { text-align: right; font-size: 0.68rem; color: var(--ink2); line-height: 1.9; }
        .inv-k { font-weight: 700; color: var(--ink); margin-right: 4px; }
        .inv-st { color: var(--grn); font-weight: 700; }
        .inv-table { border: 1px solid var(--bdr); border-radius: 7px; overflow: hidden; margin-bottom: 10px; }
        .inv-th { display: grid; grid-template-columns: 1fr 0.4fr 0.6fr; padding: 6px 10px; background: var(--ink); color: white; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
        .inv-row { display: grid; grid-template-columns: 1fr 0.4fr 0.6fr; padding: 6px 10px; border-bottom: 1px solid var(--bdr); font-size: 0.68rem; color: var(--ink2); }
        .inv-tot { display: grid; grid-template-columns: 1fr 0.4fr 0.6fr; padding: 7px 10px; background: var(--bg2); font-size: 0.75rem; font-weight: 700; color: var(--ink); }
        .inv-terms { font-size: 0.62rem; color: var(--ink3); border-top: 1px dashed var(--bdr); padding-top: 8px; }

        /* SANDBOX */
        .ms-sbox { background: var(--bg); padding: 96px 48px; }
        .ms-sbox-in { max-width: 860px; margin: 0 auto; }
        .ms-sbox-g { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 48px; }
        .ms-scard { border: 1.5px solid var(--bdr); border-radius: 14px; padding: 28px; background: var(--bg); box-shadow: var(--sh); }
        .ms-scard-lbl { font-size: 0.67rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink3); margin-bottom: 18px; }
        .ms-cred { display: flex; align-items: center; justify-content: space-between; background: var(--bg2); border: 1px solid var(--bdr); border-radius: 8px; padding: 10px 14px; margin-bottom: 10px; }
        .ms-cl { font-size: 0.68rem; color: var(--ink3); font-weight: 500; margin-bottom: 2px; }
        .ms-cv { font-size: 0.82rem; font-weight: 600; color: var(--ink); font-family: monospace; }
        .ms-copy { background: none; border: 1px solid var(--bdr); cursor: pointer; font-size: 0.68rem; font-weight: 500; color: var(--ink3); padding: 5px 10px; border-radius: 6px; font-family: var(--fb); transition: all 0.2s; white-space: nowrap; }
        .ms-copy.done { background: var(--grnbg); color: var(--grn); border-color: #b7e4c7; }
        .ms-copy:hover:not(.done) { border-color: var(--ink3); color: var(--ink); }
        .ms-snote { margin-top: 16px; background: var(--bg2); border: 1px solid var(--bdr); border-radius: 9px; padding: 13px 16px; font-size: 0.77rem; color: var(--ink3); line-height: 1.65; }
        .ms-snote strong { color: var(--ink2); }
        .ms-slink { background: var(--ink); border-radius: 14px; padding: 28px; display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 24px; }
        .ms-slink-t { font-family: var(--fd); font-size: 1.25rem; font-style: italic; color: white; line-height: 1.45; }
        .ms-slink-n { font-size: 0.75rem; color: rgba(255,255,255,0.45); margin-top: 8px; font-weight: 300; }
        .ms-slink-btn { background: white; color: var(--ink); border: none; cursor: pointer; border-radius: 8px; font-family: var(--fb); font-weight: 700; font-size: 0.83rem; padding: 12px 22px; transition: all 0.2s; text-decoration: none; display: inline-block; }
        .ms-slink-btn:hover { background: var(--grnbg); color: var(--grn); transform: translateY(-1px); }

        /* CTA */
        .ms-cta { background: var(--bg2); border-top: 1px solid var(--bdr); padding: 96px 48px; text-align: center; }
        .ms-cta-in { max-width: 560px; margin: 0 auto; }
        .ms-cta-t { font-family: var(--fd); font-size: clamp(1.9rem,4vw,2.8rem); line-height: 1.15; color: var(--ink); margin-bottom: 14px; letter-spacing: -0.02em; }
        .ms-cta-t em { font-style: italic; color: var(--grnl); }
        .ms-cta-p { font-size: 0.93rem; color: var(--ink2); line-height: 1.75; font-weight: 300; margin-bottom: 36px; }
        .ms-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        /* RESPONSIVE */
        @media(max-width:860px){
          .ms-hero { padding: 80px 24px 60px; }
          .ms-section, .ms-msec, .ms-sbox, .ms-cta { padding: 64px 24px; }
          .ms-stats { padding: 36px 24px; }
          .ms-stats-g { grid-template-columns: repeat(2,1fr); }
          .ms-stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .ms-fl { grid-template-columns: 1fr; gap: 36px; }
          .ms-fsticky { position: static; }
          .ms-fgrid { grid-template-columns: 1fr; }
          .ms-sbox-g { grid-template-columns: 1fr; }
          .sm-grid { grid-template-columns: repeat(2,1fr); }
        }
      `}</style>

            <div className="ms-page">
                {/* HERO */}
                <section className="ms-hero">
                    <div className="ms-hero-dots" />
                    <div style={{
                        opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)",
                        transition: "all 0.8s ease",
                        display: "flex", flexDirection: "column", alignItems: "center",
                        position: "relative", zIndex: 1,
                    }}>
                        <div className="ms-pill"><span className="ms-pill-dot" />Live Sandbox Available</div>
                        <h1 className="ms-h1">Sell smarter.<br /><em>Serve better.</em></h1>
                        <p className="ms-h2">Everything your shop needs, nothing it doesn't.</p>
                        <p className="ms-hero-p">
                            mine-shop is a complete e-commerce platform for Filipino sellers — with real-time cart reservations, seamless payments, and a powerful admin suite.
                        </p>
                        <div className="ms-hero-btns">
                            <button className="ms-btn-dk" onClick={() => scrollTo("ms-mockup")}>See it in action</button>
                            <button className="ms-btn-ol" onClick={() => scrollTo("ms-sandbox")}>Try the sandbox</button>
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <div className="ms-stats">
                    <div className="ms-stats-g">
                        {[
                            { n: "3+", l: "Payment methods" },
                            { n: "100%", l: "Mobile responsive" },
                            { n: "Live", l: "Reservation timers" },
                            { n: "Auto", l: "Invoice generation" },
                        ].map((s, i) => (
                            <Reveal key={s.n} delay={i * 80}>
                                <div className="ms-stat">
                                    <span className="ms-sv">{s.n}</span>
                                    <span className="ms-sl">{s.l}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* MOCKUP SECTION */}
                <section className="ms-msec" id="ms-mockup">
                    <div className="ms-msec-in">
                        <Reveal>
                            <span className="ms-slbl">Feature Preview</span>
                            <h2 className="ms-stitle">See every screen,<br /><em>before you commit.</em></h2>
                            <p className="ms-sp" style={{ marginBottom: 40 }}>
                                Explore live UI previews of the store, cart, admin panel, and invoice — exactly as your team and customers will experience them.
                            </p>
                        </Reveal>
                        <Reveal delay={100}>
                            <MockupTabs />
                        </Reveal>
                    </div>
                </section>

                {/* STORE FEATURES */}
                <section className="ms-section" id="ms-store" style={{ background: "var(--bg)" }}>
                    <div className="ms-fl">
                        <div className="ms-fsticky">
                            <Reveal>
                                <span className="ms-slbl">For Shoppers</span>
                                <div className="ms-sdiv" />
                                <h2 className="ms-stitle">A store worth<br /><em>coming back to.</em></h2>
                                <p className="ms-sp">Smooth browsing, secure cart holds, and flexible payments — designed to give customers confidence at every step.</p>
                            </Reveal>
                        </div>
                        <div className="ms-fgrid">
                            {STORE_FEATURES.map((f, i) => (
                                <Reveal key={f.title} delay={i * 60}>
                                    <div className="ms-fcard">
                                        <span className="ms-ficon">{f.icon}</span>
                                        <p className="ms-ftitle">{f.title}</p>
                                        <p className="ms-fdesc">{f.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ADMIN FEATURES */}
                <section className="ms-section" id="ms-admin" style={{ background: "var(--bg2)", borderTop: "1px solid var(--bdr)", borderBottom: "1px solid var(--bdr)" }}>
                    <div className="ms-fl">
                        <div className="ms-fsticky">
                            <Reveal>
                                <span className="ms-slbl" style={{ color: "#0d9488" }}>For Admins</span>
                                <div className="ms-sdiv" style={{ background: "#0d9488" }} />
                                <h2 className="ms-stitle">Every order,<br /><em>under control.</em></h2>
                                <p className="ms-sp">Verify payments, generate invoices, and read your business at a glance — all from one dashboard.</p>
                            </Reveal>
                        </div>
                        <div className="ms-fgrid">
                            {ADMIN_FEATURES.map((f, i) => (
                                <Reveal key={f.title} delay={i * 60}>
                                    <div className="ms-fcard">
                                        <span className="ms-ficon">{f.icon}</span>
                                        <p className="ms-ftitle">{f.title}</p>
                                        <p className="ms-fdesc">{f.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SANDBOX */}
                <section className="ms-sbox" id="ms-sandbox">
                    <div className="ms-sbox-in">
                        <Reveal>
                            <span className="ms-slbl">Live Demo</span>
                            <h2 className="ms-stitle">Try it yourself —<br /><em>right now.</em></h2>
                            <p className="ms-sp">Explore the full mine-shop experience in our live sandbox. Shop as a customer, then log in as admin to see the other side.</p>
                        </Reveal>
                        <Reveal delay={100}>
                            <div className="ms-sbox-g">
                                <div className="ms-scard">
                                    <p className="ms-scard-lbl">Admin Credentials</p>
                                    {[
                                        { label: "Email", val: "sandbox@mineshop.com", key: "email" },
                                        { label: "Password", val: "sandbox1", key: "pass" },
                                    ].map(c => (
                                        <div className="ms-cred" key={c.key}>
                                            <div>
                                                <p className="ms-cl">{c.label}</p>
                                                <p className="ms-cv">{c.val}</p>
                                            </div>
                                            <button className={`ms-copy${copied === c.key ? " done" : ""}`} onClick={() => copy(c.val, c.key)}>
                                                {copied === c.key ? "✓ Copied" : "Copy"}
                                            </button>
                                        </div>
                                    ))}
                                    <div className="ms-snote">
                                        <strong>How to explore:</strong> Browse and add items to cart as a shopper. Then log in with admin credentials to review orders, verify payments, and download invoices.
                                    </div>
                                </div>
                                <div className="ms-slink">
                                    <div>
                                        <p className="ms-slink-t">Open the live sandbox and explore mine-shop firsthand.</p>
                                        <p className="ms-slink-n">No account needed to browse the store. Admin login required for the dashboard.</p>
                                    </div>
                                    <a href="https://sandbox-mine-shop.vercel.app" target="_blank" rel="noreferrer" className="ms-slink-btn">
                                        Open Sandbox →
                                    </a>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* CTA */}
                <section className="ms-cta">
                    <div className="ms-cta-in">
                        <Reveal>
                            <span className="ms-slbl">Get Started</span>
                            <h2 className="ms-cta-t">Open your shop.<br /><em>Own your sales.</em></h2>
                            <p className="ms-cta-p">mine-shop brings together everything a Filipino seller needs — beautiful storefront, smart admin tools, and flexible payments — all in one place.</p>
                            <div className="ms-cta-btns">
                                <button className="ms-btn-dk" onClick={() => scrollTo("ms-sandbox")}>Try the Sandbox</button>
                                <button className="ms-btn-ol" onClick={() => scrollTo("ms-store")}>Explore Features</button>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </div>
        </>
    );
}