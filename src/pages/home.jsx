import { useState, useEffect, useRef } from "react";

function useInView(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, delay = 0, y = 20 }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0, transform: v ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>{children}</div>
  );
}

const PRODUCTS = [
  {
    id: "mineshop", emoji: "🛍️", name: "Vanilla Bean",
    cat: "E-Commerce Platform", status: "live",
    desc: "Run your online store with real-time cart reservations, multi-payment support, order tracking, and a full admin suite.",
    tags: ["GCash & Maya", "Live Timers", "Invoice PDF", "Order Management"],
  },
  {
    id: "payroll", emoji: "📊", name: "Payroll System",
    cat: "HR & Finance", status: "soon",
    desc: "Automate payroll computations, generate payslips, manage deductions, and stay BIR-compliant without the spreadsheet chaos.",
    tags: ["Auto Computation", "Payslip Generator", "BIR Compliant", "Leave Tracking"],
  },
  {
    id: "future", emoji: "✦", name: "More Solutions",
    cat: "In Development", status: "future",
    desc: "We're building more practical IT tools for growing businesses. The Warm Cinnamon suite keeps expanding.",
    tags: [],
  },
];

const VALUES = [
  { icon: "🎯", title: "Practical first", desc: "Every feature earns its place. We build what businesses actually need, not what looks good in a pitch deck." },
  { icon: "🌿", title: "Thoughtfully made", desc: "Design and function work together. Our tools are clean, intuitive, and built to reduce friction — not add to it." },
  { icon: "🤝", title: "Built for growth", desc: "From solo sellers to growing teams, our software scales with your business — affordable to start, powerful as you grow." },
];

export default function Home({ navigate }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{`
        /* ── HOME ── */
        .hm-hero {
          position: relative; overflow: hidden;
          min-height: calc(100vh - 64px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 80px 32px 80px; text-align: center;
        }

        /* Dot pattern background */
        .hm-dots {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, var(--bdr) 1.2px, transparent 1.2px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 80%);
        }

        /* Warm gradient blobs */
        .hm-blob {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .hm-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(254,243,199,0.7) 0%, transparent 70%);
          top: -100px; left: -100px;
        }
        .hm-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(217,119,6,0.12) 0%, transparent 70%);
          bottom: -80px; right: -80px;
        }
        .hm-blob-3 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(180,83,9,0.08) 0%, transparent 70%);
          top: 50%; left: 60%;
        }

        .hm-hero-content { position: relative; z-index: 2; max-width: 780px; }
        .hm-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--cin-bg2); border: 1px solid #fde68a;
          color: var(--cin); font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 7px 16px; border-radius: 99px; margin-bottom: 28px;
        }
        .hm-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cin-l); animation: hm-blink 2s infinite; }
        @keyframes hm-blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.4)} }

        .hm-h1 {
          font-family: var(--fb); font-size: clamp(2.6rem, 5.5vw, 4.6rem);
          font-weight: 600; line-height: 1.08; letter-spacing: -0.02em;
          color: var(--ink); margin-bottom: 10px;
        }
        .hm-h1 em {
          font-style: italic; color: var(--cin2);
        }
        .hm-h2 {
          font-family: var(--fb); font-size: clamp(1rem, 2.2vw, 1.4rem);
          font-weight: 400; font-style: italic; color: var(--ink3);
          margin-bottom: 22px;
        }
        .hm-p {
          font-size: 1rem; color: var(--ink2); line-height: 1.75;
          max-width: 520px; margin: 0 auto 40px; font-weight: 300;
        }
        .hm-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .hm-btn-dk {
          background: var(--ink); color: var(--bg);
          border: none; cursor: pointer; font-family: var(--fb);
          font-weight: 600; font-size: 0.9rem;
          padding: 13px 28px; border-radius: var(--r); transition: all 0.2s;
        }
        .hm-btn-dk:hover { background: var(--cin); transform: translateY(-2px); }
        .hm-btn-ol {
          background: transparent; color: var(--ink);
          border: 1.5px solid var(--bdr2); cursor: pointer;
          font-family: var(--fb); font-weight: 500; font-size: 0.9rem;
          padding: 13px 28px; border-radius: var(--r); transition: all 0.2s;
        }
        .hm-btn-ol:hover { border-color: var(--ink); }

        /* ── PRODUCTS ── */
        .hm-products {
          padding: 100px 48px;
          background: var(--bg);
          position: relative;
        }
        .hm-products::before {
          content: '';
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 1px; height: 80px; background: linear-gradient(to bottom, transparent, var(--bdr));
        }
        .hm-prod-inner { max-width: 1100px; margin: 0 auto; }
        .hm-sec-header { text-align: center; margin-bottom: 64px; }
        .hm-sec-tag {
          display: inline-block; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--cin); margin-bottom: 14px;
        }
        .hm-sec-h {
          font-family: var(--fb); font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 600; letter-spacing: -0.02em; color: var(--ink);
          margin-bottom: 14px; line-height: 1.18;
        }
        .hm-sec-h em { font-style: italic; }
        .hm-sec-p { font-size: 0.95rem; color: var(--ink2); line-height: 1.75; max-width: 480px; margin: 0 auto; font-weight: 300; }
        .hm-sec-div { width: 32px; height: 1.5px; background: var(--cin2); margin: 16px auto; }

        .hm-prod-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .hm-prod-card {
          background: var(--bg);
          border: 1px solid var(--bdr);
          border-radius: 14px; padding: 28px;
          transition: all 0.3s; position: relative; overflow: hidden;
          display: flex; flex-direction: column;
        }
        .hm-prod-card:hover { border-color: var(--bdr2); box-shadow: var(--sh); transform: translateY(-4px); }
        .hm-prod-card.dim { opacity: 0.5; }
        .hm-prod-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; }
        .hm-prod-icon {
          width: 50px; height: 50px; border-radius: 12px;
          background: var(--cin-bg); border: 1px solid #fde68a;
          display: flex; align-items: center; justify-content: center; font-size: 1.4rem;
        }
        .hm-prod-badge {
          font-size: 0.6rem; font-weight: 700; padding: 4px 10px;
          border-radius: 99px; text-transform: uppercase; letter-spacing: 0.06em;
        }
        .hm-prod-badge.live { background: #d8f3dc; color: #2d6a4f; border: 1px solid #b7e4c7; }
        .hm-prod-badge.soon { background: var(--cin-bg); color: var(--cin); border: 1px solid #fde68a; }
        .hm-prod-badge.future { background: var(--bg2); color: var(--ink4); border: 1px solid var(--bdr); }
        .hm-prod-cat { font-size: 0.68rem; font-weight: 600; color: var(--cin); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; }
        .hm-prod-name { font-family: var(--fb); font-size: 1.35rem; font-weight: 600; color: var(--ink); margin-bottom: 10px; }
        .hm-prod-desc { font-size: 0.85rem; color: var(--ink2); line-height: 1.65; font-weight: 300; margin-bottom: 20px; flex: 1; }
        .hm-prod-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 22px; }
        .hm-prod-tag {
          font-size: 0.67rem; background: var(--bg2);
          color: var(--ink3); border: 1px solid var(--bdr);
          padding: 3px 10px; border-radius: 99px;
        }
        .hm-prod-btn {
          width: 100%; padding: 11px; border-radius: 8px; border: none;
          cursor: pointer; font-family: var(--fb); font-weight: 600; font-size: 0.82rem;
          transition: all 0.2s; margin-top: auto;
        }
        .hm-prod-btn.live-btn { background: var(--ink); color: var(--bg); }
        .hm-prod-btn.live-btn:hover { background: var(--cin); }
        .hm-prod-btn.off-btn { background: var(--bg2); color: var(--ink4); cursor: default; border: 1px solid var(--bdr); }

        /* ── VALUES ── */
        .hm-values {
          padding: 100px 48px;
          border-top: 1px solid var(--bdr);
          background: var(--bg2);
        }
        .hm-values-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 2fr; gap: 80px; align-items: start; }
        .hm-val-left { position: sticky; top: 90px; }
        .hm-val-left-tag { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--cin); margin-bottom: 14px; display: block; }
        .hm-val-left-h { font-family: var(--fb); font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: 600; color: var(--ink); line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 14px; }
        .hm-val-left-p { font-size: 0.9rem; color: var(--ink2); line-height: 1.7; font-weight: 300; }
        .hm-val-cards { display: flex; flex-direction: column; gap: 14px; }
        .hm-val-card {
          background: var(--bg); border: 1px solid var(--bdr);
          border-radius: 14px; padding: 24px;
          display: flex; gap: 18px; align-items: flex-start;
          transition: all 0.25s;
        }
        .hm-val-card:hover { border-color: var(--bdr2); box-shadow: var(--sh); }
        .hm-val-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: var(--cin-bg); border: 1px solid #fde68a;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.15rem; flex-shrink: 0;
        }
        .hm-val-title { font-size: 0.9rem; font-weight: 600; color: var(--ink); margin-bottom: 5px; }
        .hm-val-desc { font-size: 0.82rem; color: var(--ink2); line-height: 1.65; font-weight: 300; }

        /* ── ABOUT ── */
        .hm-about {
          padding: 100px 48px; text-align: center;
          border-top: 1px solid var(--bdr);
          position: relative; overflow: hidden;
          background: var(--bg);
        }
        .hm-about-blob {
          position: absolute; width: 500px; height: 300px;
          background: radial-gradient(ellipse, rgba(254,243,199,0.4) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%,-50%);
          pointer-events: none;
        }
        .hm-about-inner { max-width: 620px; margin: 0 auto; position: relative; z-index: 1; }
        .hm-about-q {
          font-family: var(--fb); font-size: clamp(1.5rem,3vw,2.4rem);
          font-style: italic; font-weight: 400; color: var(--ink);
          line-height: 1.5; margin-bottom: 20px;
        }
        .hm-about-p { font-size: 0.93rem; color: var(--ink2); line-height: 1.75; font-weight: 300; margin-bottom: 36px; }

        @media (max-width: 820px) {
          .hm-hero { padding: 60px 24px; }
          .hm-blob-1,.hm-blob-2,.hm-blob-3 { width:250px;height:250px; }
          .hm-products, .hm-values, .hm-about { padding: 72px 24px; }
          .hm-prod-grid { grid-template-columns: 1fr; }
          .hm-values-inner { grid-template-columns: 1fr; gap: 36px; }
          .hm-val-left { position: static; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hm-hero">
        <div className="hm-dots" />
        <div className="hm-blob hm-blob-1" />
        <div className="hm-blob hm-blob-2" />
        <div className="hm-blob hm-blob-3" />

        <div className="hm-hero-content" style={{
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)",
          transition: "all 0.8s ease",
        }}>
          <div className="hm-pill"><span className="hm-pill-dot" />Business IT Solutions for Filipino Companies</div>
          <h1 className="hm-h1">
            Software that works<br />
            <em>as hard as you do.</em>
          </h1>
          <p className="hm-h2">Everything your business needs, nothing it doesn't.</p>
          <p className="hm-p">
            Warm Cinnamon builds clean, reliable business software for growing Filipino businesses — from e-commerce to HR, designed to reduce friction and get out of your way.
          </p>
          <div className="hm-btns">
            <button className="hm-btn-dk" onClick={() => navigate("mineshop")}>Explore Vanilla Bean →</button>
            <button className="hm-btn-ol" onClick={() => document.getElementById("hm-prods")?.scrollIntoView({ behavior: "smooth" })}>See all solutions</button>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="hm-products" id="hm-prods">
        <div className="hm-prod-inner">
          <Reveal>
            <div className="hm-sec-header">
              <span className="hm-sec-tag">Our Solutions</span>
              <div className="hm-sec-div" />
              <h2 className="hm-sec-h">Tools built for the way<br /><em>real businesses work.</em></h2>
              <p className="hm-sec-p">Each product in the Warm Cinnamon suite is built for Filipino businesses — practical, affordable, and designed to grow with you.</p>
            </div>
          </Reveal>
          <div className="hm-prod-grid">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <div className={`hm-prod-card${p.status === "future" ? " dim" : ""}`}>
                  <div className="hm-prod-top">
                    <div className="hm-prod-icon">{p.emoji}</div>
                    <span className={`hm-prod-badge ${p.status}`}>
                      {p.status === "live" ? "Live" : p.status === "soon" ? "Coming Soon" : "Planned"}
                    </span>
                  </div>
                  <p className="hm-prod-cat">{p.cat}</p>
                  <p className="hm-prod-name">{p.name}</p>
                  <p className="hm-prod-desc">{p.desc}</p>
                  {p.tags?.length > 0 && (
                    <div className="hm-prod-tags">{p.tags.map(t => <span key={t} className="hm-prod-tag">{t}</span>)}</div>
                  )}
                  {p.status === "live" && (
                    <button className="hm-prod-btn live-btn" onClick={() => navigate(p.id)}>
                      Explore {p.name} →
                    </button>
                  )}
                  {p.status === "soon" && (
                    <button className="hm-prod-btn off-btn">Coming Soon</button>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="hm-values">
        <div className="hm-values-inner">
          <div className="hm-val-left">
            <Reveal>
              <span className="hm-val-left-tag">Our Approach</span>
              <h2 className="hm-val-left-h">Why Warm Cinnamon?</h2>
              <p className="hm-val-left-p">We named ourselves after something familiar, comforting, and dependable — and that's exactly how we build software.</p>
            </Reveal>
          </div>
          <div className="hm-val-cards">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="hm-val-card">
                  <div className="hm-val-icon">{v.icon}</div>
                  <div><p className="hm-val-title">{v.title}</p><p className="hm-val-desc">{v.desc}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="hm-about">
        <div className="hm-about-blob" />
        <div className="hm-about-inner">
          <Reveal>
            <span className="hm-sec-tag">About Us</span>
            <div className="hm-sec-div" />
            <p className="hm-about-q">"We build the tools your business actually needs — nothing more, nothing less."</p>
            <p className="hm-about-p">Warm Cinnamon is a focused software studio building practical IT solutions for Filipino businesses. We believe good software should feel effortless — like it was always there.</p>
            <button className="hm-btn-dk" onClick={() => navigate("mineshop")}>Start with Vanilla Bean E-Commerce →</button>
          </Reveal>
        </div>
      </section>
    </>
  );
}