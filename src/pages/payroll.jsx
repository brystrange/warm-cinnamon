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
function Reveal({ children, delay = 0 }) {
    const [ref, v] = useInView();
    return (
        <div ref={ref} style={{
            opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)",
            transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        }}>{children}</div>
    );
}

const UPCOMING = [
    { icon: "🧮", title: "Auto Payroll Computation", desc: "Compute net pay, deductions, and benefits automatically based on employee records." },
    { icon: "📄", title: "Payslip Generator", desc: "Generate clean, professional payslips for every employee in one click." },
    { icon: "📅", title: "Leave & Attendance Tracking", desc: "Monitor absences, tardiness, and leave credits — integrated directly into payroll." },
    { icon: "🏛️", title: "Tax & Compliance Ready", desc: "BIR-compliant tax computations with SSS, PhilHealth, and Pag-IBIG deductions built in." },
];

const ROADMAP = [
    { label: "Completed", title: "mine-shop — E-Commerce Platform", desc: "Live and available for Filipino sellers.", dot: "done", mark: "✓" },
    { label: "In Progress", title: "Payroll System", desc: "Core computation engine in active development.", dot: "active", mark: "⟳" },
    { label: "Planned", title: "Inventory Management", desc: "Stock tracking, supplier management, and reorder alerts.", dot: "pending", mark: "○" },
    { label: "Planned", title: "CRM & Customer Tracking", desc: "Manage customer relationships, purchase history, and follow-ups.", dot: "pending", mark: "○" },
];

export default function Payroll() {
    const [vis, setVis] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);
    const handleNotify = () => { if (email.trim()) setSubmitted(true); };

    return (
        <>
            <style>{`
        @keyframes pr-blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.4)} }

        .pr-page { background: var(--bg); }

        /* HERO */
        .pr-hero {
          min-height: calc(90vh - 64px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 80px 32px 80px; text-align: center;
          position: relative; overflow: hidden;
        }
        .pr-hero-dots {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, var(--bdr) 1.2px, transparent 1.2px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 80%);
        }
        /* Soft indigo blobs */
        .pr-blob {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .pr-blob-1 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(224,231,255,0.6) 0%, transparent 70%);
          top: -80px; right: -80px;
        }
        .pr-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(199,210,254,0.3) 0%, transparent 70%);
          bottom: -80px; left: -80px;
        }

        .pr-hero-c { position: relative; z-index: 2; max-width: 680px; }
        .pr-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: #eef2ff; border: 1px solid #c7d2fe;
          color: #4338ca; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 7px 16px; border-radius: 99px; margin-bottom: 28px;
        }
        .pr-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: #6366f1; animation: pr-blink 2s infinite; }
        .pr-h1 {
          font-family: var(--fd); font-size: clamp(2.6rem, 5.5vw, 4.4rem);
          font-weight: 600; line-height: 1.08; letter-spacing: -0.02em;
          color: var(--ink); margin-bottom: 10px;
        }
        .pr-h1 em { font-style: italic; color: #4f46e5; }
        .pr-hero-p {
          font-size: 1rem; color: var(--ink2); line-height: 1.75;
          max-width: 500px; margin: 0 auto 40px; font-weight: 300;
        }

        /* form */
        .pr-form { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 12px; }
        .pr-input {
          background: var(--bg); border: 1.5px solid var(--bdr2);
          border-radius: var(--r); padding: 13px 18px;
          font-family: var(--fb); font-size: 0.88rem; color: var(--ink);
          width: 280px; outline: none; transition: border-color 0.2s;
        }
        .pr-input:focus { border-color: #818cf8; }
        .pr-input::placeholder { color: var(--ink4); }
        .pr-nbtn {
          background: #4f46e5; color: #fff;
          border: none; cursor: pointer; font-family: var(--fb);
          font-weight: 600; font-size: 0.88rem;
          padding: 13px 26px; border-radius: var(--r);
          transition: all 0.2s; white-space: nowrap;
        }
        .pr-nbtn:hover { background: #4338ca; transform: translateY(-1px); }
        .pr-note { font-size: 0.77rem; color: var(--ink3); }
        .pr-success {
          display: inline-flex; align-items: center; gap: 8px;
          background: #d8f3dc; color: #2d6a4f;
          border: 1px solid #b7e4c7;
          padding: 11px 22px; border-radius: var(--r);
          font-size: 0.875rem; font-weight: 600;
        }

        /* FEATURES */
        .pr-feats { padding: 100px 48px; border-top: 1px solid var(--bdr); background: var(--bg2); }
        .pr-feats-in { max-width: 940px; margin: 0 auto; }
        .pr-slbl { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #4f46e5; margin-bottom: 14px; }
        .pr-stitle { font-family: var(--fd); font-size: clamp(1.7rem, 3vw, 2.5rem); line-height: 1.18; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 10px; font-weight: 600; }
        .pr-stitle em { font-style: italic; }
        .pr-sdiv { width: 32px; height: 1.5px; background: #6366f1; margin: 16px 0 44px; }
        .pr-feat-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
        .pr-feat-card {
          background: var(--bg); border: 1px solid var(--bdr);
          border-radius: 14px; padding: 24px;
          display: flex; gap: 16px; align-items: flex-start;
          transition: all 0.25s;
        }
        .pr-feat-card:hover { border-color: #c7d2fe; box-shadow: var(--sh); }
        .pr-feat-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: #eef2ff; border: 1px solid #c7d2fe;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.15rem; flex-shrink: 0;
        }
        .pr-feat-title { font-size: 0.9rem; font-weight: 600; color: var(--ink); margin-bottom: 5px; }
        .pr-feat-desc { font-size: 0.82rem; color: var(--ink2); line-height: 1.65; font-weight: 300; }

        /* ROADMAP */
        .pr-road { padding: 100px 48px; border-top: 1px solid var(--bdr); background: var(--bg); }
        .pr-road-in { max-width: 640px; margin: 0 auto; }
        .pr-tl { margin-top: 40px; display: flex; flex-direction: column; gap: 0; position: relative; }
        .pr-tl::before { content: ''; position: absolute; left: 16px; top: 8px; bottom: 8px; width: 1px; background: var(--bdr); }
        .pr-tl-item { display: flex; gap: 20px; align-items: flex-start; padding: 0 0 28px; position: relative; }
        .pr-tl-item:last-child { padding-bottom: 0; }
        .pr-tl-dot {
          width: 33px; height: 33px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700; position: relative; z-index: 1;
          border: 1px solid var(--bdr);
        }
        .pr-tl-dot.done { background: linear-gradient(135deg, #d97706, #b45309); color: #fff; border-color: transparent; box-shadow: 0 2px 8px rgba(180,83,9,0.25); }
        .pr-tl-dot.active { background: #eef2ff; color: #4f46e5; border-color: #c7d2fe; }
        .pr-tl-dot.pending { background: var(--bg2); color: var(--ink4); }
        .pr-tl-lbl { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink3); margin-bottom: 3px; }
        .pr-tl-title { font-size: 0.95rem; font-weight: 600; color: var(--ink); margin-bottom: 3px; }
        .pr-tl-desc { font-size: 0.82rem; color: var(--ink2); font-weight: 300; line-height: 1.6; }

        @media(max-width:820px){
          .pr-hero, .pr-feats, .pr-road { padding: 64px 24px; }
          .pr-blob-1, .pr-blob-2 { width: 250px; height: 250px; }
          .pr-feat-grid { grid-template-columns: 1fr; }
          .pr-input { width: 100%; }
          .pr-form { flex-direction: column; align-items: center; }
        }
      `}</style>

            <div className="pr-page">
                {/* HERO */}
                <section className="pr-hero">
                    <div className="pr-hero-dots" />
                    <div className="pr-blob pr-blob-1" />
                    <div className="pr-blob pr-blob-2" />
                    <div className="pr-hero-c" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(22px)", transition: "all 0.85s ease" }}>
                        <div className="pr-pill"><span className="pr-pill-dot" />In Development · Warm Cinnamon</div>
                        <h1 className="pr-h1">Payroll,<br /><em>finally simple.</em></h1>
                        <p className="pr-hero-p">Automate payroll computations, generate professional payslips, and stay BIR-compliant — without the spreadsheet headache. Coming soon.</p>
                        {!submitted ? (
                            <>
                                <div className="pr-form">
                                    <input className="pr-input" type="email" placeholder="Enter your email for early access" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleNotify()} />
                                    <button className="pr-nbtn" onClick={handleNotify}>Notify Me</button>
                                </div>
                                <p className="pr-note">No spam — just a heads-up when it launches.</p>
                            </>
                        ) : (
                            <div className="pr-success">✓ You're on the list — we'll reach out when it's ready!</div>
                        )}
                    </div>
                </section>

                {/* FEATURES */}
                <section className="pr-feats">
                    <div className="pr-feats-in">
                        <span className="pr-slbl">What's Coming</span>
                        <div className="pr-sdiv" />
                        <h2 className="pr-stitle">Built for Filipino<br /><em>payroll realities.</em></h2>
                        <div className="pr-feat-grid">
                            {UPCOMING.map((f, i) => (
                                <Reveal key={f.title} delay={i * 80}>
                                    <div className="pr-feat-card">
                                        <div className="pr-feat-icon">{f.icon}</div>
                                        <div><p className="pr-feat-title">{f.title}</p><p className="pr-feat-desc">{f.desc}</p></div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ROADMAP */}
                <section className="pr-road">
                    <div className="pr-road-in">
                        <span className="pr-slbl">Roadmap</span>
                        <div className="pr-sdiv" />
                        <h2 className="pr-stitle">Where we're headed.</h2>
                        <div className="pr-tl">
                            {ROADMAP.map(item => (
                                <div className="pr-tl-item" key={item.title}>
                                    <div className={`pr-tl-dot ${item.dot}`}>{item.mark}</div>
                                    <div>
                                        <p className="pr-tl-lbl">{item.label}</p>
                                        <p className="pr-tl-title">{item.title}</p>
                                        <p className="pr-tl-desc">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}