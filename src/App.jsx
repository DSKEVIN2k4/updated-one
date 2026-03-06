import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from "framer-motion";

/* ── ICONS ─────────────────────────────────────────────────────── */
const Ico = ({ d, size = 16, sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p}/>) : <path d={d}/>}
  </svg>
);
const IcMail     = p => <Ico {...p} d={["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"]}/>;
const IcGithub   = p => <Ico {...p} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>;
const IcLinkedin = p => <Ico {...p} d={["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z","M2 9h4v12H2z","M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"]}/>;
const IcArrow    = p => <Ico {...p} d={["M5 12h14","M12 5l7 7-7 7"]}/>;
const IcUpRight  = p => <Ico {...p} d={["M7 17L17 7","M7 7h10v10"]}/>;
const IcMoon     = p => <Ico {...p} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>;
const IcSun      = p => <Ico {...p} d={["M12 2v2","M12 20v2","M4.93 4.93l1.41 1.41","M17.66 17.66l1.41 1.41","M2 12h2","M20 12h2","M6.34 17.66l-1.41 1.41","M19.07 4.93l-1.41 1.41","M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"]}/>;

/* ── STYLES ─────────────────────────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Space+Grotesk:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');
    :root {
      --bg:#08070a; --s1:#0f0e14; --s2:#161520; --s3:#1e1c2a;
      --ink:#f0ece0; --ink2:#c8bea0; --mut:#6a6258;
      --a:#e8c84a; --a2:#f59e0b; --a3:#d4a017; --red:#e05030; --gold:#e8c84a;
      --r:rgba(232,200,74,0.06); --r2:rgba(232,200,74,0.14);
    }
    [data-light] {
      --bg:#f5f0e8; --s1:#ede5d8; --s2:#e5dccf; --s3:#d8cdc0;
      --ink:#1a1610; --ink2:#3a3020; --mut:#7a6e5a;
      --a:#c89010; --a2:#d97706; --a3:#a16207; --red:#dc2626; --gold:#d97706;
      --r:rgba(200,144,16,0.06); --r2:rgba(200,144,16,0.14);
    }
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
    ::selection{background:var(--a);color:#fff}
    :root ::selection{background:#e8c84a;color:#fff}
    [data-light] ::selection{background:#c89010;color:#fff}
    html{scroll-behavior:smooth}
    body{background:var(--bg);color:var(--ink);font-family:'Space Grotesk',Arial,sans-serif;overflow-x:hidden;transition:background .5s,color .5s;cursor:none}
    ::-webkit-scrollbar{width:2px}
    ::-webkit-scrollbar-track{background:var(--bg)}
    ::-webkit-scrollbar-thumb{background:var(--a)}
    a{color:inherit;text-decoration:none}
    button{font-family:inherit;cursor:none}
    .cg{font-family:'Cormorant Garamond',Georgia,serif}
    .mono{font-family:'DM Mono','Courier New',monospace}
    @keyframes roll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
    @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(3deg)}}
    @keyframes glitch1{0%,84%,100%{clip-path:inset(0 0 100% 0);transform:translateX(0);opacity:0}85%{clip-path:inset(15% 0 70% 0);transform:translateX(-3px);opacity:.55}87%{clip-path:inset(55% 0 25% 0);transform:translateX(3px);opacity:.55}89%{clip-path:inset(75% 0 8% 0);transform:translateX(-1px);opacity:.4}91%{clip-path:inset(0 0 100% 0);opacity:0}}
    @keyframes glitch2{0%,86%,100%{clip-path:inset(0 0 100% 0);transform:translateX(0);opacity:0}87%{clip-path:inset(65% 0 15% 0);transform:translateX(3px);opacity:.45}89%{clip-path:inset(25% 0 55% 0);transform:translateX(-3px);opacity:.45}91%{clip-path:inset(8% 0 75% 0);transform:translateX(1px);opacity:.3}93%{clip-path:inset(0 0 100% 0);opacity:0}}
    @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
    @keyframes borderGlow{0%,100%{border-color:var(--r2)}50%{border-color:var(--a)}}
    .glitch-wrap{position:relative;display:inline-block}
    .glitch-wrap::before,.glitch-wrap::after{content:attr(data-text);position:absolute;inset:0;font:inherit;color:inherit}
    .glitch-wrap::before{color:var(--a);animation:glitch1 6s infinite;opacity:.8}
    .glitch-wrap::after{color:var(--a2);animation:glitch2 6s infinite 1s;opacity:.8}
    .shimmer-text{background:linear-gradient(90deg,var(--ink) 0%,var(--a) 30%,var(--a2) 50%,var(--a) 70%,var(--ink) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
    .noise::before{content:'';position:fixed;inset:0;z-index:9997;pointer-events:none;opacity:.018;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:150px}
    @media(max-width:768px){
      body{cursor:auto}
      .hide-mobile{display:none!important}
      .mobile-bar{display:none!important}
      .nav-grid{display:flex!important;justify-content:space-between!important;align-items:center!important;padding:.8rem 1.2rem!important}
      .nav-logo{font-size:1.5rem!important;text-align:left!important}
      .nav-left,.nav-right{display:none!important}
      .nav-grid .nav-right-mobile{display:flex!important;justify-content:flex-end!important}
      .hero-grid{grid-template-columns:1fr!important;gap:1.5rem!important}
      .hero-right{border-left:none!important;padding-left:0!important}
      .stats-grid{grid-template-columns:1fr 1fr!important}
      .about-grid{grid-template-columns:1fr!important;gap:2rem!important}
      .skills-grid{grid-template-columns:1fr!important;gap:2rem!important}
      .skills-bars{width:100%!important}
      .skills-tabs{overflow-x:auto!important;flex-wrap:nowrap!important}
      .skills-tabs button{flex-shrink:0!important;font-size:.55rem!important;padding:.6rem .9rem!important}
      .radar-wrap{display:none!important}
      .certs-grid{grid-template-columns:1fr!important}
      .contact-grid{grid-template-columns:1fr!important;gap:2rem!important}
      .contact-border{border-left:none!important;padding-left:0!important;border-top:1px solid var(--r2);padding-top:2rem!important}
      .footer-grid{grid-template-columns:1fr!important;gap:1rem!important;text-align:center;justify-items:center}
      .footer-links{display:none!important}
      .badge-wrap{display:none!important}
      .hero-inner{padding:0 1rem!important}
      section{padding:3.5rem 1.2rem!important;max-width:100%!important}
      .awards-row{grid-template-columns:2rem 2rem 1fr!important}
      .fact-grid{grid-template-columns:1fr 1fr!important}
    }
  `}</style>
);

/* ── CURSOR ─────────────────────────────────────────────────────── */
const Cursor = () => {
  const mx = useMotionValue(-100), my = useMotionValue(-100);
  const sx = useSpring(mx, {stiffness:500,damping:40});
  const sy = useSpring(my, {stiffness:500,damping:40});
  const tx = useSpring(mx, {stiffness:150,damping:20});
  const ty = useSpring(my, {stiffness:150,damping:20});
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const m = e => { mx.set(e.clientX); my.set(e.clientY); };
    const o = e => setHov(!!e.target.closest('[data-h]'));
    window.addEventListener('mousemove', m);
    window.addEventListener('mouseover', o);
    return () => { window.removeEventListener('mousemove',m); window.removeEventListener('mouseover',o); };
  }, []);
  return (
    <>
      <motion.div style={{position:'fixed',zIndex:99999,pointerEvents:'none',x:sx,y:sy,translateX:'-50%',translateY:'-50%'}}>
        <motion.div animate={{width:hov?32:8,height:hov?32:8,background:hov?'transparent':'var(--a)',border:hov?'1px solid var(--a)':'none',borderRadius:'50%'}} transition={{type:'spring',stiffness:400,damping:25}} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          {hov && <span style={{fontSize:'6px',color:'var(--a)',fontFamily:"'DM Mono'",letterSpacing:'0.1em'}}>✦</span>}
        </motion.div>
      </motion.div>
      <motion.div style={{position:'fixed',zIndex:99998,pointerEvents:'none',x:tx,y:ty,translateX:'-50%',translateY:'-50%',width:2,height:2,borderRadius:'50%',background:'var(--a2)',opacity:0.5}}/>
    </>
  );
};

/* ── THEME ──────────────────────────────────────────────────────── */
const useTheme = () => {
  const [light, setLight] = useState(false);
  useEffect(() => {
    if (light) document.documentElement.setAttribute('data-light','');
    else document.documentElement.removeAttribute('data-light');
  }, [light]);
  return [light, setLight];
};

/* ── FLOATING PARTICLES ─────────────────────────────────────────── */
const Particles = () => {
  const pts = useRef([...Array(22)].map((_, i) => ({
    id: i, x: Math.random()*100, y: Math.random()*100,
    size: Math.random()*2+0.5, dur: Math.random()*20+15,
    delay: Math.random()*10, opacity: Math.random()*0.4+0.1,
  }))).current;
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}}>
      {pts.map(p => (
        <div key={p.id} style={{
          position:'absolute', left:`${p.x}%`, top:`${p.y}%`,
          width:p.size, height:p.size, borderRadius:'50%',
          background:'var(--a)', opacity:p.opacity,
          animation:`float ${p.dur}s ease-in-out infinite ${p.delay}s`,
        }}/>
      ))}
    </div>
  );
};

/* ── TICKER ─────────────────────────────────────────────────────── */
const Ticker = ({ items, speed=30, reverse=false, gold=false }) => {
  const all = [...items,...items,...items,...items];
  return (
    <div style={{overflow:'hidden',borderTop:'1px solid var(--r2)',borderBottom:'1px solid var(--r2)',padding:gold?'0.6rem 0':'0.55rem 0',background:gold?'var(--a)':'transparent'}}>
      <div style={{display:'flex',width:'max-content',animation:`roll ${speed}s linear infinite ${reverse?'reverse':''}`}}>
        {all.map((item,i) => (
          <span key={i} className="mono" style={{fontSize:'0.58rem',letterSpacing:'0.2em',textTransform:'uppercase',color:gold?'#000':'var(--mut)',padding:'0 2rem',whiteSpace:'nowrap'}}>
            {item} <span style={{opacity:.4}}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── NAV ────────────────────────────────────────────────────────── */
const Nav = ({ light, setLight }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const go = id => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
    }, 300);
  };
  const links = ['work','about','skills','awards','contact'];
  return (
    <motion.nav initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.1,duration:.7,ease:[.22,1,.36,1]}}
      style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,background:scrolled||menuOpen?'var(--bg)':'transparent',backdropFilter:scrolled||menuOpen?'blur(20px)':'none',borderBottom:scrolled?'1px solid var(--r2)':'1px solid transparent',transition:'all .4s'}}>
      <div className="hide-mobile" style={{borderBottom:'1px solid var(--r)',padding:'.35rem 2.5rem',display:'flex',justifyContent:'space-between',maxWidth:1280,margin:'0 auto'}}>
        <span className="mono" style={{fontSize:'.55rem',letterSpacing:'.2em',color:'var(--ink2)',textTransform:'uppercase'}}>Issue No. 01 · AI & DS Engineer · UI/UX Designer</span>
        <div style={{display:'flex',gap:'1.5rem',alignItems:'center'}}>
          <span className="mono" style={{fontSize:'.55rem',letterSpacing:'.14em',color:'var(--ink2)',textTransform:'uppercase'}}>Chennai · Open to Freelancing</span>
          <motion.button data-h whileTap={{scale:.9}} onClick={()=>setLight(l=>!l)}
            style={{background:'none',border:'1px solid var(--r2)',borderRadius:3,padding:'.18rem .5rem',color:'var(--ink)',display:'flex',alignItems:'center',gap:'.3rem'}}>
            {light?<IcMoon size={11}/>:<IcSun size={11}/>}
            <span className="mono" style={{fontSize:'.52rem',letterSpacing:'.15em',textTransform:'uppercase'}}>{light?'Dark':'Light'}</span>
          </motion.button>
        </div>
      </div>
      <div className="nav-grid" style={{padding:'.8rem 2.5rem',display:'grid',gridTemplateColumns:'1fr auto 1fr',alignItems:'center',maxWidth:1280,margin:'0 auto',position:'relative'}}>
        <div className="nav-left" style={{display:'flex',gap:'2.5rem'}}>
          {['work','about','skills'].map(n=>(
            <motion.span key={n} data-h onClick={()=>go(n)} whileHover={{color:'var(--a)'}}
              style={{fontSize:'.88rem',fontWeight:500,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--mut)',transition:'color .2s',cursor:'pointer'}}>{n}</motion.span>
          ))}
        </div>
        <motion.span className="nav-logo" onClick={()=>go('home')} whileHover={{letterSpacing:'0.18em'}} data-h
          style={{cursor:'pointer',fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'2.4rem',fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',color:'#e8c84a',transition:'letter-spacing 0.3s ease'}}>
          K<span style={{fontStyle:'italic'}}>D</span>S
        </motion.span>
        <div className="nav-right" style={{display:'flex',gap:'2.5rem',justifyContent:'flex-end'}}>
          {['awards','contact'].map(n=>(
            <motion.span key={n} data-h onClick={()=>go(n)} whileHover={{color:'var(--a)'}}
              style={{fontSize:'.88rem',fontWeight:500,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--mut)',transition:'color .2s',cursor:'pointer'}}>{n}</motion.span>
          ))}
          <motion.a href="https://github.com/DSKEVIN2k4" target="_blank" rel="noopener noreferrer" data-h whileHover={{color:'var(--a)'}}
            style={{fontSize:'.88rem',fontWeight:500,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--mut)',transition:'color .2s'}}>GitHub ↗</motion.a>
        </div>
        {/* Mobile hamburger */}
        <motion.button className="nav-right-mobile" onClick={()=>setMenuOpen(o=>!o)}
          style={{display:'none',background:'none',border:'none',color:'var(--ink)',cursor:'pointer',padding:'.2rem',justifyContent:'flex-end',flexDirection:'column',gap:'5px',alignItems:'flex-end'}}>
          <motion.span animate={{width:menuOpen?'20px':'20px',rotate:menuOpen?45:0,y:menuOpen?7:0}} style={{display:'block',height:'2px',background:'var(--a)',width:'20px',transformOrigin:'center'}}/>
          <motion.span animate={{opacity:menuOpen?0:1}} style={{display:'block',height:'2px',background:'var(--a)',width:'14px'}}/>
          <motion.span animate={{width:'20px',rotate:menuOpen?-45:0,y:menuOpen?-7:0}} style={{display:'block',height:'2px',background:'var(--a)',width:'20px',transformOrigin:'center'}}/>
        </motion.button>
      </div>
      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
            style={{overflow:'hidden',borderTop:'1px solid var(--r2)',background:'var(--bg)',backdropFilter:'blur(20px)'}}>
            {links.map((n,i)=>(
              <motion.div key={n} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*.05}}
                onClick={()=>go(n)}
                style={{padding:'1rem 1.5rem',borderBottom:'1px solid var(--r)',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span className="mono" style={{fontSize:'.75rem',letterSpacing:'.14em',textTransform:'uppercase',color:'var(--ink)'}}>{n}</span>
                <span style={{color:'var(--a)'}}>→</span>
              </motion.div>
            ))}
            <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:links.length*.05}}
              onClick={()=>{window.open('https://github.com/DSKEVIN2k4','_blank');setMenuOpen(false);}}
              style={{padding:'1rem 1.5rem',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span className="mono" style={{fontSize:'.75rem',letterSpacing:'.14em',textTransform:'uppercase',color:'var(--ink)'}}>GitHub</span>
              <span style={{color:'var(--a)'}}>↗</span>
            </motion.div>
            <div style={{padding:'1rem 1.5rem',borderTop:'1px solid var(--r)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span className="mono" style={{fontSize:'.65rem',letterSpacing:'.1em',color:'var(--mut)',textTransform:'uppercase'}}>Theme</span>
              <motion.button whileTap={{scale:.9}} onClick={()=>setLight(l=>!l)}
                style={{background:'none',border:'1px solid var(--r2)',borderRadius:3,padding:'.18rem .5rem',color:'var(--ink)',display:'flex',alignItems:'center',gap:'.3rem'}}>
                {light?<IcMoon size={11}/>:<IcSun size={11}/>}
                <span className="mono" style={{fontSize:'.5rem',letterSpacing:'.12em',textTransform:'uppercase'}}>{light?'Dark':'Light'}</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

/* ── HERO ───────────────────────────────────────────────────────── */
const ROLES = ['AI & Data Science','UI/UX Design','Machine Learning','IoT Systems','Cloud Engineering'];
const TOOLS = ['Figma','Framer','Anima','Adobe Illustrator','Adobe Photoshop','Antigravity','Wix Studio','HTML5','CSS3','JavaScript (Velo)','WordPress','Bolt.ai','Vercel'];

const Hero = () => {
  const ref = useRef(null);
  const mx = useMotionValue(.5), my = useMotionValue(.5);
  const rotX = useTransform(my,[0,1],[5,-5]);
  const rotY = useTransform(mx,[0,1],[-6,6]);
  const [roleIdx, setRoleIdx] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 600);
      setRoleIdx(i => (i+1) % ROLES.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX-r.left)/r.width);
    my.set((e.clientY-r.top)/r.height);
  };

  return (
    <section id="home" ref={ref} onMouseMove={onMove}
      style={{minHeight:'100vh',paddingTop:'9rem',paddingBottom:'4rem',position:'relative'}}>

      {/* Animated gradient orbs */}
      <motion.div style={{rotateX:rotX,rotateY:rotY,transformStyle:'preserve-3d',position:'absolute',inset:0,pointerEvents:'none'}}>
        <div style={{position:'absolute',top:'10%',right:'5%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(232,200,74,.12) 0%,transparent 65%)',animation:'float 8s ease-in-out infinite'}}/>
        <div style={{position:'absolute',bottom:'20%',left:'3%',width:350,height:350,borderRadius:'50%',background:'radial-gradient(circle,rgba(245,158,11,.09) 0%,transparent 65%)',animation:'float 11s ease-in-out infinite 3s'}}/>
        <div style={{position:'absolute',top:'50%',left:'40%',width:250,height:250,borderRadius:'50%',background:'radial-gradient(circle,rgba(212,160,23,.06) 0%,transparent 65%)',animation:'float 9s ease-in-out infinite 1s'}}/>
      </motion.div>

      {/* Grid lines */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'linear-gradient(var(--r) 1px,transparent 1px),linear-gradient(90deg,var(--r) 1px,transparent 1px)',backgroundSize:'70px 70px',maskImage:'radial-gradient(ellipse 70% 50% at 50% 50%,black,transparent)'}}/>

      <div className="hero-inner" style={{maxWidth:1280,margin:'0 auto',padding:'0 2.5rem',position:'relative',zIndex:1}}>

        {/* Kicker */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.2,duration:.7}}
          style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'2rem',borderTop:'2px solid var(--r2)',paddingTop:'1rem',flexWrap:'nowrap',overflow:'hidden'}}>
          <span style={{background:'var(--a)',color:'#000',fontFamily:"'DM Mono'",fontSize:'.56rem',letterSpacing:'.2em',padding:'.2rem .7rem',textTransform:'uppercase',fontWeight:600,flexShrink:0}}>✦ Featured</span>
          <span className="mono" style={{fontSize:'.56rem',letterSpacing:'.12em',color:'var(--mut)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',display:'flex',alignItems:'center',gap:'.3rem',flex:1}}>
            Specialising in —{' '}
            <AnimatePresence mode="wait">
              <motion.span key={roleIdx} initial={{y:12,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-12,opacity:0}} transition={{duration:.35}}
                style={{color:'var(--a)',textTransform:'uppercase',letterSpacing:'.14em',whiteSpace:'nowrap'}}>{ROLES[roleIdx]}</motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        {/* Giant headline with glitch */}
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:.3,duration:.8,ease:[.22,1,.36,1]}}
          style={{marginBottom:'2.5rem'}}>
          <div style={{position:'relative',display:'inline-block'}}>
            <h1 className="cg glitch-wrap" data-text="THE HYBRID"
              style={{fontSize:'clamp(4.5rem,13vw,11rem)',fontWeight:700,letterSpacing:'-.03em',lineHeight:.88,color:'var(--ink)',display:'block'}}>
              THE HYBRID
            </h1>
            <h1 className="cg shimmer-text"
              style={{fontSize:'clamp(4.5rem,13vw,11rem)',fontWeight:300,fontStyle:'italic',letterSpacing:'-.03em',lineHeight:.88,display:'block',marginTop:'.1em'}}>
              ENGINEER
            </h1>
          </div>

          {/* Rotating badge */}
          <motion.div className="badge-wrap" initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{delay:.9,type:'spring',stiffness:120}}
            style={{position:'absolute',top:'8rem',right:'3rem',width:130,height:130,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="130" height="130" viewBox="0 0 130 130" style={{animation:'spin 20s linear infinite',position:'absolute'}}>
              <defs><path id="cp" d="M 65,65 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"/></defs>
              <circle cx="65" cy="65" r="54" fill="none" stroke="var(--r2)" strokeWidth=".8"/>
              <circle cx="65" cy="65" r="44" fill="none" stroke="var(--a)" strokeWidth=".8" opacity=".6"/>
              <text fill="var(--a)" fontFamily="'DM Mono'" fontSize="8" letterSpacing="4.5">
                <textPath href="#cp">AVAILABLE FOR FREELANCING  •  AVAILABLE FOR FREELANCING  •</textPath>
              </text>
            </svg>
            <span style={{fontSize:'1.4rem',color:'var(--a)',animation:'spin 20s linear infinite reverse',filter:'drop-shadow(0 0 8px var(--a))'}}>✦</span>
          </motion.div>
        </motion.div>

        {/* Body grid */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.5,duration:.7}}
          className="hero-grid"
          style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',borderTop:'1px solid var(--r2)',paddingTop:'2rem',marginBottom:'3rem'}}>
          <p className="cg" style={{fontSize:'clamp(.95rem,1.5vw,1.25rem)',fontStyle:'italic',lineHeight:1.75,color:'var(--ink2)'}}>
            Kevin DS is a Chennai-based AI & Data Science engineer who believes the sharpest technical mind must also hold a designer's eye.
          </p>
          <div className="hero-right" style={{borderLeft:'1px solid var(--r2)',paddingLeft:'3rem'}}>
            <p style={{fontSize:'.86rem',lineHeight:1.9,color:'var(--mut)',marginBottom:'1.4rem'}}>
              Final year B.E. student at Panimalar Engineering College. Building at the intersection of machine intelligence, data systems, and interaction design.
            </p>
            <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
              <motion.button data-h whileTap={{scale:.96}} whileHover={{scale:1.02}}
                onClick={() => document.getElementById('work')?.scrollIntoView({behavior:'smooth'})}
                style={{background:'linear-gradient(135deg,var(--a),var(--a2))',color:'#fff',border:'none',padding:'.72rem 1.8rem',fontFamily:"'Space Grotesk'",fontWeight:700,fontSize:'.75rem',letterSpacing:'.08em',textTransform:'uppercase',display:'flex',alignItems:'center',gap:'.5rem',cursor:'pointer'}}>
                View Work <IcArrow size={13}/>
              </motion.button>
              <motion.a href="https://linkedin.com/in/kends2k4" target="_blank" rel="noopener noreferrer" data-h whileHover={{borderColor:'var(--a)',color:'var(--a)'}}
                style={{border:'1px solid var(--r2)',color:'var(--ink2)',padding:'.72rem 1.4rem',fontFamily:"'Space Grotesk'",fontWeight:500,fontSize:'.75rem',letterSpacing:'.08em',textTransform:'uppercase',display:'flex',alignItems:'center',gap:'.45rem',transition:'all .25s',cursor:'pointer'}}>
                LinkedIn <IcUpRight size={12}/>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.6,duration:.7}}
          className="stats-grid"
          style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:'1px solid var(--r2)',borderBottom:'1px solid var(--r2)'}}>
          {[['4+','Projects Shipped'],['8','Certifications'],['5+','Awards'],['2026','Graduating']].map(([n,l],i)=>(
            <motion.div key={i} whileHover={{background:'var(--s2)'}}
              style={{padding:'1.5rem 1rem',textAlign:'center',borderRight:i<3?'1px solid var(--r)':'none',transition:'background .2s'}}>
              <div className="cg shimmer-text" style={{fontSize:'2.4rem',fontWeight:700,letterSpacing:'-1px'}}>{n}</div>
              <span className="mono" style={{fontSize:'.55rem',letterSpacing:'.18em',textTransform:'uppercase',color:'var(--mut)'}}>{l}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div style={{marginTop:'3rem'}}>
        <Ticker gold items={TOOLS}/>
        <Ticker reverse items={TOOLS} speed={22}/>
      </div>
    </section>
  );
};

/* ── PROJECTS ───────────────────────────────────────────────────── */
const PROJECTS = [
  {num:'01',title:'Song Suggesting AI',cat:'Computer Vision',year:'2023',accent:'#e8c84a',desc:'Emotion-aware music recommendation using facial recognition to detect real-time emotional expressions and suggest matching tracks. Presented at PECTEAM 2023.',tech:['Python','OpenCV','TensorFlow','Neural Networks'],url:'https://github.com/DSKEVIN2k4'},
  {num:'02',title:'Exchange Ease',cat:'NLP · Web',year:'2024',accent:'#d4a017',desc:'Trust-based digital book exchange platform leveraging NLP-driven recommendations for sustainable resource sharing. Research paper at IConIC 2025.',tech:['Python','NLP','Web Dev','Data Science'],url:'https://github.com/DSKEVIN2k4/Exchange-Ease---Book-Swap-Platform'},
  {num:'03',title:'CLV Prediction',cat:'Data Science',year:'2024',accent:'#e05030',desc:'E-commerce predictive analytics using BG/NBD and Gamma-Gamma models to forecast customer lifetime value and optimise retention strategies.',tech:['Machine Learning','Statistical Modeling','BG/NBD','Data Analysis'],url:'https://github.com/DSKEVIN2k4/Customer-Lifetime-Value-Prediction-in-E-Commerce-Website'},
  {num:'04',title:'Aquasense IoT',cat:'IoT · Hardware',year:'2023',accent:'#f59e0b',desc:'Arduino-based IoT environmental monitoring system for real-time water quality tracking using integrated sensor arrays, developed over a 16-week AICTE internship.',tech:['Arduino','IoT','Sensor Networks','Embedded Systems'],url:'https://github.com/DSKEVIN2k4'},
];
const UI_PROJECTS = [
  {num:'05',title:'KENHED PROSER',cat:'Brand System',accent:'#e05030',concept:'Industrial Nostalgia',desc:'Brutalist high-impact brand environment. Structural typography + retro interfaces with grain-textured backgrounds.',details:['Chromatic Logic — five identities dictate the entire UI palette','Identities: LATTE · THE BARBIE · MS. FERRARI · QUEEN BEE · LIMONADE']},
  {num:'06',title:'Portfolio v2.0',cat:'Interaction Design',accent:'#d4a017',concept:'Story-First Design',desc:'Desktop-style immersive experience. Fully connected animated flows with every wire in Figma connected with specific intent.',details:['Desktop-style UI with seamless transitions','Story-First — journey over pixels']},
  {num:'07',title:'Exchange Ease UI',cat:'UX Redesign',accent:'#e8c84a',concept:'Trust-Based UX',desc:'Redesigning a developer-built barter marketplace into a trust-based user experience powered by NLP-driven recommendations.',details:['Raw data management → intuitive secure book bartering','NLP recommendations + trust architecture at core']},
  {num:'08',title:'KENNIE SKATES',cat:'E-Commerce',accent:'#e8c84a',concept:'Gritty enough to endure.',desc:'Multi-page checkout flow blending high-end fashion with raw street culture and skateboard DNA for a Chennai entrepreneur.',details:['Auto Layout component architecture for scale','Framer interactive Stacks — beyond static mockups']},
];

const PCard = ({ p, i }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div onHoverStart={()=>setHov(true)} onHoverEnd={()=>setHov(false)} data-h
      initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-40px'}}
      transition={{delay:i*.06,duration:.6,ease:[.22,1,.36,1]}}
      style={{borderBottom:'1px solid var(--r2)',padding:'2rem 0',position:'relative',cursor:'none'}}>
      <motion.div animate={{scaleX:hov?1:0,opacity:hov?1:0}} initial={{scaleX:0}}
        transition={{duration:.4,ease:[.22,1,.36,1]}}
        style={{position:'absolute',inset:0,background:`linear-gradient(90deg,${p.accent}18,transparent)`,transformOrigin:'left',pointerEvents:'none'}}/>
      {/* Left border accent */}
      <motion.div animate={{scaleY:hov?1:0,opacity:hov?1:0}} initial={{scaleY:0}}
        transition={{duration:.3}} style={{position:'absolute',left:0,top:0,bottom:0,width:2,background:p.accent,transformOrigin:'top'}}/>
      <div style={{display:'grid',gridTemplateColumns:'3.5rem 1fr auto',gap:'2rem',alignItems:'start',position:'relative',zIndex:1,paddingLeft:'1rem'}}>
        <motion.div animate={{x:hov?4:0}} className="cg" style={{fontSize:'1.8rem',fontStyle:'italic',color:'var(--mut)',lineHeight:1,paddingTop:'.2rem'}}>{p.num}</motion.div>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'.7rem',marginBottom:'.5rem',flexWrap:'wrap'}}>
            <motion.span animate={{borderColor:hov?p.accent:'var(--r2)',color:hov?p.accent:'var(--mut)'}}
              className="mono" style={{fontSize:'.54rem',letterSpacing:'.15em',textTransform:'uppercase',border:'1px solid var(--r2)',padding:'.12rem .5rem',transition:'all .3s'}}>{p.cat}</motion.span>
            {p.year && <span className="mono" style={{fontSize:'.54rem',letterSpacing:'.15em',color:'var(--mut)',textTransform:'uppercase'}}>{p.year}</span>}
            {p.concept && <span className="cg" style={{fontSize:'.85rem',color:'var(--mut)',fontStyle:'italic'}}>"{p.concept}"</span>}
          </div>
          <motion.h3 animate={{x:hov?5:0}} className="cg"
            style={{fontSize:'1.65rem',fontWeight:700,letterSpacing:'-.5px',color:'var(--ink)',marginBottom:'.55rem'}}>{p.title}</motion.h3>
          <p style={{fontSize:'.83rem',lineHeight:1.78,color:'var(--mut)',maxWidth:'52ch'}}>{p.desc}</p>
          {p.tech && (
            <div style={{display:'flex',gap:'.4rem',flexWrap:'wrap',marginTop:'.8rem'}}>
              {p.tech.map(t=>(
                <span key={t} className="mono" style={{fontSize:'.54rem',letterSpacing:'.06em',color:'var(--ink2)',background:'var(--s2)',padding:'.18rem .55rem'}}>{t}</span>
              ))}
            </div>
          )}
          {p.details && (
            <div style={{marginTop:'.7rem',display:'flex',flexDirection:'column',gap:'.25rem'}}>
              {p.details.map((d,j)=>(
                <div key={j} style={{display:'flex',gap:'.5rem',fontSize:'.77rem',color:'var(--mut)'}}>
                  <span style={{color:p.accent,flexShrink:0}}>→</span>{d}
                </div>
              ))}
            </div>
          )}
        </div>
        {p.url && (
          <motion.a href={p.url} target="_blank" rel="noopener noreferrer" data-h
            whileHover={{borderColor:p.accent,color:p.accent}}
            style={{width:40,height:40,border:'1px solid var(--r2)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--mut)',flexShrink:0,transition:'all .2s'}}>
            <IcUpRight size={14}/>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

const SH = ({ title, italic, meta }) => (
  <div style={{borderTop:'3px solid var(--r2)',paddingTop:'1rem',marginBottom:'3rem',display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap',gap:'.5rem'}}>
    <h2 className="cg" style={{fontSize:'clamp(1.8rem,3.5vw,3rem)',fontWeight:700,letterSpacing:'-1px',lineHeight:1.1,color:'var(--ink)'}}>
      {title}{italic && <span style={{fontStyle:'italic',color:'var(--a)'}}> {italic}</span>}
    </h2>
    {meta && <span className="mono" style={{fontSize:'.55rem',letterSpacing:'.18em',textTransform:'uppercase',color:'var(--mut)'}}>{meta}</span>}
  </div>
);

const Projects = () => (
  <section id="work" style={{padding:'7rem 2.5rem',maxWidth:1280,margin:'0 auto'}}>
    <SH title="Selected" italic="Work" meta={`Engineering — ${PROJECTS.length} Projects`}/>
    {PROJECTS.map((p,i) => <PCard key={p.num} p={p} i={i}/>)}
    <div style={{marginTop:'6rem'}}>
      <SH title="Design" italic="Portfolio" meta={`UI/UX — ${UI_PROJECTS.length} Projects`}/>
      {UI_PROJECTS.map((p,i) => <PCard key={p.num} p={p} i={i}/>)}
    </div>
  </section>
);

/* ── ABOUT ──────────────────────────────────────────────────────── */
const About = () => {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({target:ref,offset:['start end','end start']});
  const bgY = useTransform(scrollYProgress,[0,1],['-6%','6%']);
  return (
    <section id="about" ref={ref} style={{background:'var(--s1)',borderTop:'1px solid var(--r2)',borderBottom:'1px solid var(--r2)',position:'relative',overflow:'hidden'}}>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'7rem 2.5rem',position:'relative',zIndex:1}}>
        <SH title="The Hybrid" italic="Engineer."/>
        <div className="about-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6rem',alignItems:'start'}}>
          <div>
            <p className="cg" style={{fontSize:'clamp(1rem,1.6vw,1.3rem)',fontStyle:'italic',lineHeight:1.75,color:'var(--ink2)',marginBottom:'1.4rem'}}>
              Kevin approaches technology with a hybrid mindset — combining analytical problem solving with a strong aesthetic philosophy.
            </p>
            <p style={{fontSize:'.87rem',lineHeight:1.9,color:'var(--mut)',marginBottom:'2.2rem'}}>
              His work explores how <span style={{color:'var(--ink)'}}>interface design, data intelligence, and human behaviour</span> intersect to create meaningful digital environments.
            </p>
            {[['🧠','AI & Data Science','#e8c84a'],['🎨','UI/UX & Interaction Design','#e8c84a'],['💻','Full Stack Development','#d4a017'],['☁️','Cloud & Data Engineering','#f59e0b']].map(([e,l,c])=>(
              <motion.div key={l} whileHover={{x:6,background:'var(--s2)'}}
                style={{display:'flex',alignItems:'center',gap:'.9rem',padding:'.85rem .7rem',borderBottom:'1px solid var(--r)',transition:'all .2s'}}>
                <span style={{fontSize:'1rem'}}>{e}</span>
                <span style={{fontSize:'.86rem',color:'var(--ink2)'}}>{l}</span>
                <motion.div whileHover={{scaleX:1}} style={{marginLeft:'auto',width:30,height:1,background:c,transformOrigin:'left'}}/>
              </motion.div>
            ))}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'1.2rem'}}>
            <motion.div whileHover={{y:-3,borderColor:'var(--a)'}} style={{border:'1px solid var(--r2)',padding:'1.8rem',background:'var(--s2)',transition:'all .3s',animation:'borderGlow 4s ease-in-out infinite'}}>
              <span className="mono" style={{fontSize:'.54rem',letterSpacing:'.18em',textTransform:'uppercase',color:'var(--a)'}}>Education</span>
              <div style={{marginTop:'.7rem'}}>
                <div className="cg" style={{fontSize:'1.1rem',fontWeight:700,marginBottom:'.25rem',color:'var(--ink)'}}>B.E. Artificial Intelligence & Data Science</div>
                <div style={{fontSize:'.8rem',color:'var(--mut)',marginBottom:'.7rem'}}>Panimalar Engineering College, Chennai</div>
                <span className="mono" style={{fontSize:'.56rem',letterSpacing:'.1em',color:'var(--a)',background:'rgba(232,200,74,.1)',border:'1px solid rgba(232,200,74,.25)',padding:'.2rem .6rem'}}>2022 – 2026 · Final Year</span>
              </div>
            </motion.div>
            <div className="certs-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'var(--r2)'}}>
              {[['🏆','IConIC 2025','Paper Presentation'],['🎨','INTELLICONZ\'24','Design Award'],['☁️','Oracle Certified','Cloud & AI'],['📍','Remote-Friendly','Open to Offers']].map(([e,t,s],i)=>(
                <motion.div key={i} whileHover={{background:'var(--s3)'}}
                  style={{background:'var(--s2)',padding:'1.2rem',transition:'background .2s',border:'1px solid var(--r2)',animation:`borderGlow ${4+i}s ease-in-out infinite ${i*.6}s`}}>
                  <div style={{fontSize:'1.1rem',marginBottom:'.35rem'}}>{e}</div>
                  <div style={{fontSize:'.81rem',fontWeight:600,color:'var(--ink)',marginBottom:'.15rem'}}>{t}</div>
                  <span className="mono" style={{fontSize:'.52rem',letterSpacing:'.12em',textTransform:'uppercase',color:'var(--mut)'}}>{s}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── SKILLS ─────────────────────────────────────────────────────── */
const SKILLS = [
  {cat:'Design & UI/UX',icon:'🎨',color:'#e8c84a',skills:[{name:'Figma',l:100},{name:'Framer',l:85},{name:'Adobe Illustrator',l:82},{name:'Photoshop',l:80},{name:'Typography',l:88},{name:'User Research',l:80},{name:'Wireframing',l:85},{name:'Responsive Design',l:85}]},
  {cat:'Technical & Data',icon:'⚙️',color:'#f59e0b',skills:[{name:'Python',l:82},{name:'TensorFlow',l:76},{name:'SQL / MySQL',l:78},{name:'Java',l:74},{name:'Tableau',l:74},{name:'NLP',l:78}]},
  {cat:'Web & Platforms',icon:'🌐',color:'#d4a017',skills:[{name:'HTML5 / CSS3',l:84},{name:'JavaScript',l:75},{name:'Wix Studio',l:88},{name:'WordPress',l:80},{name:'Vercel',l:78},{name:'React',l:70}]},
];

const AnimBar = ({s,color,i}) => {
  const [go,setGo] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting)setGo(true)},{threshold:.1});
    if(ref.current)obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <div ref={ref} style={{marginBottom:'1rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'.35rem'}}>
        <span style={{fontSize:'.8rem',color:'var(--ink2)',fontWeight:500}}>{s.name}</span>
        <span className="mono" style={{fontSize:'.55rem',color:'var(--mut)'}}>{s.l}%</span>
      </div>
      <div style={{height:2,background:'var(--s3)',overflow:'hidden',position:'relative'}}>
        <motion.div initial={{width:0}} animate={{width:go?`${s.l}%`:0}}
          transition={{duration:1.1,delay:i*.07,ease:[.22,1,.36,1]}}
          style={{height:'100%',background:`linear-gradient(90deg,${color},${color}88)`}}/>
      </div>
    </div>
  );
};

const Radar = ({skills,color}) => {
  const n=skills.length,cx=130,cy=130,r=95;
  const ang=i=>Math.PI*2*i/n-Math.PI/2;
  const pt=(i,pct)=>{const a=ang(i),d=r*pct/100;return[cx+d*Math.cos(a),cy+d*Math.sin(a)];};
  const polygon=skills.map((s,i)=>pt(i,s.l)).map(([x,y])=>`${x},${y}`).join(' ');
  return (
    <svg width={260} height={260} viewBox="0 0 260 260">
      {[25,50,75,100].map(lvl=>{
        const pts=skills.map((_,i)=>pt(i,lvl)).map(([x,y])=>`${x},${y}`).join(' ');
        return <polygon key={lvl} points={pts} fill="none" stroke="var(--r2)" strokeWidth={1}/>;
      })}
      {skills.map((_,i)=>{const[x,y]=pt(i,100);return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--r)" strokeWidth={1}/>;} )}
      <motion.polygon points={polygon} fill={`${color}14`} stroke={color} strokeWidth={1.8}
        initial={{scale:0,opacity:0}} whileInView={{scale:1,opacity:1}} viewport={{once:true}}
        transition={{duration:.9,ease:[.22,1,.36,1]}} style={{transformOrigin:`${cx}px ${cy}px`}}/>
      {skills.map((s,i)=>{
        const[x,y]=pt(i,118);
        return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
          style={{fontFamily:"'DM Mono'",fontSize:'6.5px',fill:'var(--mut)'}}>{s.name.length>11?s.name.slice(0,11)+'…':s.name}</text>;
      })}
    </svg>
  );
};

const Skills = () => {
  const [tab,setTab] = useState(0);
  const cur = SKILLS[tab];
  return (
    <section id="skills" style={{padding:'7rem 2.5rem',maxWidth:1280,margin:'0 auto'}}>
      <SH title="Skills &" italic="Expertise" meta={`Toolkit — ${SKILLS.reduce((a,s)=>a+s.skills.length,0)} Skills`}/>
      <div className="skills-tabs" style={{display:'flex',borderBottom:'1px solid var(--r2)',marginBottom:'3rem'}}>
        {SKILLS.map((s,i)=>(
          <motion.button key={i} onClick={()=>setTab(i)} whileTap={{scale:.97}} data-h
            style={{fontFamily:"'DM Mono'",fontSize:'.6rem',letterSpacing:'.12em',textTransform:'uppercase',padding:'.7rem 1.4rem',cursor:'pointer',background:'none',border:'none',borderBottom:tab===i?`2px solid ${s.color}`:'2px solid transparent',color:tab===i?s.color:'var(--mut)',transition:'all .2s',marginBottom:'-1px'}}>
            {s.icon} {s.cat}
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.28}}
          className="skills-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'5rem',alignItems:'start'}}>
          <div>
            <div className="mono" style={{fontSize:'.54rem',letterSpacing:'.16em',textTransform:'uppercase',color:'var(--mut)',borderBottom:'1px solid var(--r)',paddingBottom:'.5rem',marginBottom:'1.4rem'}}>Proficiency Levels</div>
            {cur.skills.map((s,i)=><AnimBar key={s.name} s={s} color={cur.color} i={i}/>)}
          </div>
          <div className="radar-wrap">
            <div className="mono" style={{fontSize:'.54rem',letterSpacing:'.16em',textTransform:'uppercase',color:'var(--mut)',borderBottom:'1px solid var(--r)',paddingBottom:'.5rem',marginBottom:'1.4rem'}}>Skill Radar</div>
            <div style={{display:'flex',justifyContent:'center',padding:'.5rem 0 1rem'}}>
              <Radar skills={cur.skills} color={cur.color}/>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

/* ── CERTS ──────────────────────────────────────────────────────── */
const CERTS = [
  {icon:'☁️',color:'#e8c84a',year:'2024',issuer:'Oracle',title:'OCI Generative AI Certified Professional',desc:'Advanced certification in cloud-based generative AI systems and production deployment.',url:'https://catalog-education.oracle.com/ords/certview/sharebadge?id=40B19056AF799F6ED09B637969E2E1157A9F889694A821E7E99F0A24B09D4DE8'},
  {icon:'🗄️',color:'#f59e0b',year:'2025',issuer:'Oracle',title:'Oracle Data Platform 2025 Certified Foundations Associate',desc:'Data platform design, integration and analytics services in Oracle Cloud.',url:'https://catalog-education.oracle.com/ords/certview/sharebadge?id=CB12B4AB79BE2D49FD2F15BEED5EB47B65F6F98068D4EA2971D5BF18032C8658'},
  {icon:'🤖',color:'#d4a017',year:'2025',issuer:'Oracle',title:'OCI 2025 Certified AI Foundations Associate',desc:'Foundational certification covering AI/ML principles on Oracle Cloud Infrastructure.',url:'https://catalog-education.oracle.com/ords/certview/sharebadge?id=0ABBA5EA31946A87FEC118E743323210EC432B455B38525597A7088D0328CD74'},
  {icon:'☁️',color:'#e8c84a',year:'2025',issuer:'Oracle',title:'OCI 2025 Certified Foundations Associate',desc:'Core Oracle Cloud Infrastructure architecture and services fundamentals.',url:'https://catalog-education.oracle.com/ords/certview/sharebadge?id=0CD927AD1D6F660868C26F6ED1E128483C5777EA5179DD1D3AA3596F8C934F8F'},
  {icon:'🎨',color:'#e8c84a',year:'2024',issuer:'LinkedIn Learning',title:'Figma for UX Design',desc:'Comprehensive UX design workflows in Figma by Eric Nordquist.',url:'https://lnkd.in/e48gh88C'},
  {icon:'🖱️',color:'#e05030',year:'2024',issuer:'LinkedIn Learning',title:'UX Foundations: Prototyping',desc:'Prototyping principles and best practices for UX design by Diane Cronenwett.',url:'https://lnkd.in/gbVMm__a'},
  {icon:'⚙️',color:'#f59e0b',year:'2024',issuer:'LinkedIn Learning',title:'Figma: Designing with Variables and Conditionals',desc:'Advanced Figma techniques using variables and conditional logic by Joseph Labrecque.',url:'https://lnkd.in/gSsbhiXD'},
  {icon:'📡',color:'#d4a017',year:'2023',issuer:'Innovate Intern · AICTE',title:'Internet of Things — Internship Completion',desc:'16-week AICTE-approved IoT internship. Built Aquasense: real-time water quality monitoring using Arduino sensor arrays.',url:'https://www.linkedin.com/posts/kends2k4_internship-iot-aicte-activity-7412876693620813824-6pQS'},
];

const Certs = () => (
  <section id="certifications" style={{padding:'7rem 2.5rem',background:'var(--s1)',borderTop:'1px solid var(--r2)'}}>
    <div style={{maxWidth:1280,margin:'0 auto'}}>
      <SH title="Certifications &" italic="Credentials" meta={`${CERTS.length} Verified`}/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'var(--r2)'}}>
        {CERTS.map((c,i)=>(
          <motion.div key={i}
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-30px'}}
            transition={{delay:(i%2)*.1,duration:.6}}
            whileHover={{y:-2,boxShadow:'0 20px 60px rgba(0,0,0,.5)'}}
            style={{background:'var(--s2)',padding:'2rem',position:'relative',overflow:'hidden',transition:'box-shadow .3s'}}>
            <motion.div initial={{scaleX:0}} whileHover={{scaleX:1}}
              style={{position:'absolute',top:0,left:0,right:0,height:2,background:c.color,transformOrigin:'left'}}/>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1rem'}}>
              <span style={{fontSize:'1.7rem'}}>{c.icon}</span>
              <span className="mono" style={{fontSize:'.52rem',letterSpacing:'.1em',color:c.color,border:`1px solid ${c.color}40`,padding:'.12rem .45rem'}}>{c.issuer} · {c.year}</span>
            </div>
            <h3 className="cg" style={{fontSize:'1.05rem',fontWeight:700,lineHeight:1.35,color:'var(--ink)',marginBottom:'.55rem'}}>{c.title}</h3>
            <p style={{fontSize:'.77rem',lineHeight:1.72,color:'var(--mut)',marginBottom:'.9rem'}}>{c.desc}</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:'.75rem',borderTop:'1px solid var(--r)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'.35rem'}}>
                <div style={{width:5,height:5,borderRadius:'50%',background:'#d4a017',animation:'pulse 2s infinite'}}/>
                <span className="mono" style={{fontSize:'.52rem',letterSpacing:'.12em',textTransform:'uppercase',color:'var(--mut)'}}>Verified</span>
              </div>
              <motion.a href={c.url} target="_blank" rel="noopener noreferrer" data-h
                whileHover={{color:c.color,borderColor:c.color}}
                style={{fontFamily:"'DM Mono'",fontSize:'.52rem',letterSpacing:'.12em',textTransform:'uppercase',color:'var(--mut)',border:'1px solid var(--r2)',padding:'.18rem .6rem',transition:'all .2s'}}>
                VIEW BADGE ↗
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── AWARDS ─────────────────────────────────────────────────────── */
const AWARDS = [
  {rank:'01',icon:'🏆',color:'#e8c84a',title:'IConIC 2025',cat:'Research & Innovation',org:'International Conference on Innovative Computing',year:'2025'},
  {rank:'02',icon:'🎨',color:'#d4a017',title:'INTELLICONZ\'24',cat:'Design Excellence',org:'National Technical Symposium',year:'2024'},
  {rank:'03',icon:'❤️',color:'#e05030',title:'Leo Club District 324L',cat:'Community Service',org:'Leo Club International',year:'2023'},
  {rank:'04',icon:'🎓',color:'#f59e0b',title:'PECTEAM 7th Conference',cat:'Leadership',org:'Panimalar Engineering College',year:'2023'},
  {rank:'05',icon:'🛡️',color:'#e8c84a',title:'Cyber Bullying Awareness',cat:'Social Impact',org:'Youth Red Cross PEC',year:'2024'},
];

const Awards = () => {
  const [hov,setHov] = useState(null);
  return (
    <section id="awards" style={{padding:'7rem 2.5rem',maxWidth:1280,margin:'0 auto'}}>
      <SH title="Awards &" italic="Honours" meta={`${AWARDS.length} Recognitions`}/>
      <div style={{border:'1px solid var(--r2)',overflow:'hidden'}}>
        {AWARDS.map((a,i)=>(
          <motion.div key={i} onHoverStart={()=>setHov(i)} onHoverEnd={()=>setHov(null)}
            animate={{background:hov===i?'var(--s2)':'transparent'}}
            style={{display:'grid',gridTemplateColumns:'2.5rem 2.5rem 1fr auto',gap:'1rem',alignItems:'center',padding:'1.4rem 1rem',borderBottom:i<AWARDS.length-1?'1px solid var(--r)':'none'}}>
            <motion.span animate={{color:hov===i?a.color:'var(--mut)'}} className="cg" style={{fontSize:'1rem',fontStyle:'italic'}}>{a.rank}</motion.span>
            <span style={{fontSize:'1.3rem'}}>{a.icon}</span>
            <div>
              <div className="cg" style={{fontSize:'1rem',fontWeight:700,color:'var(--ink)',marginBottom:'.18rem'}}>{a.title}</div>
              <div style={{display:'flex',gap:'.8rem',alignItems:'center',flexWrap:'wrap'}}>
                <div style={{fontSize:'.72rem',color:'var(--mut)'}}>{a.org}</div>
                <motion.span animate={{color:hov===i?a.color:'var(--mut)'}} className="mono" style={{fontSize:'.52rem',letterSpacing:'.1em',textTransform:'uppercase'}}>{a.cat} · {a.year}</motion.span>
              </div>
            </div>
            <span className="mono" style={{fontSize:'.6rem',color:'var(--mut)',textAlign:'right'}}>{a.year}</span>
          </motion.div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:'var(--r2)',marginTop:'1.5rem'}}>
        {[['🏆','5+','Total Awards'],['🎨','6×','Design Wins'],['📄','2','Research Papers'],['🌍','2','National Events']].map(([e,n,l],i)=>(
          <motion.div key={i} whileHover={{background:'var(--s2)'}}
            style={{background:'var(--s1)',padding:'1.2rem',textAlign:'center',transition:'background .2s'}}>
            <div style={{fontSize:'1.2rem',marginBottom:'.25rem'}}>{e}</div>
            <div className="cg shimmer-text" style={{fontSize:'1.7rem',fontWeight:700,letterSpacing:'-.5px'}}>{n}</div>
            <span className="mono" style={{fontSize:'.52rem',letterSpacing:'.14em',textTransform:'uppercase',color:'var(--mut)'}}>{l}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ── CONTACT ────────────────────────────────────────────────────── */
const Contact = () => {
  const [msg,setMsg] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [sent,setSent] = useState(false);
  const [loading,setLoading] = useState(false);

  const [remind, setRemind] = useState(false);

  const handleSend = async () => {
    if (!name.trim() || !email.trim()) {
      setRemind(true);
      return;
    }
    if (!msg.trim()) {
      alert('Please write a message!');
      return;
    }
    setRemind(false);
    setLoading(true);
    try {
      await fetch('https://formspree.io/f/xeerqzjy', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, message: msg }),
      });
      setSent(true);
      setMsg(''); setName(''); setEmail('');
    } catch(e) {
      alert('Something went wrong, please try again.');
    }
    setLoading(false);
  };
  return (
    <section id="contact" style={{background:'var(--s1)',padding:'7rem 2.5rem',borderTop:'1px solid var(--r2)',position:'relative',overflow:'hidden'}}>
      <div className="cg" style={{position:'absolute',bottom:'-2rem',right:'-1rem',fontSize:'clamp(5rem,16vw,13rem)',fontWeight:700,fontStyle:'italic',color:'var(--r)',userSelect:'none',pointerEvents:'none',letterSpacing:'-.04em'}}>HELLO</div>
      <div style={{maxWidth:1280,margin:'0 auto',position:'relative',zIndex:1}}>
        <SH title="The Contact" italic="Desk." meta="Pull up a chair."/>
        <div className="contact-grid" style={{display:'grid',gridTemplateColumns:'1.3fr 1fr',gap:'6rem'}}>
          <div>
            <div className="mono" style={{fontSize:'.54rem',letterSpacing:'.16em',textTransform:'uppercase',color:'var(--mut)',marginBottom:'.8rem',borderBottom:'1px solid var(--r)',paddingBottom:'.5rem'}}>Drop a Note</div>
            <input value={name} onChange={e=>setName(e.target.value)}
              placeholder="Your name"
              data-h
              style={{width:'100%',background:'var(--s2)',border:'1px solid var(--r2)',padding:'.8rem 1rem',marginBottom:'.8rem',fontFamily:"'Space Grotesk'",fontSize:'.88rem',color:'var(--ink)',outline:'none',transition:'border-color .25s'}}
              onFocus={e=>e.target.style.borderColor='var(--a)'}
              onBlur={e=>e.target.style.borderColor='var(--r2)'}/>
            <input value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="Your email"
              type="email"
              data-h
              style={{width:'100%',background:'var(--s2)',border:'1px solid var(--r2)',padding:'.8rem 1rem',marginBottom:'.8rem',fontFamily:"'Space Grotesk'",fontSize:'.88rem',color:'var(--ink)',outline:'none',transition:'border-color .25s'}}
              onFocus={e=>e.target.style.borderColor='var(--a)'}
              onBlur={e=>e.target.style.borderColor='var(--r2)'}/>
            <textarea value={msg} onChange={e=>setMsg(e.target.value)}
              placeholder="Hey Kevin, I'd love to work with you on..."
              data-h
              style={{width:'100%',height:140,background:'var(--s2)',border:'1px solid var(--r2)',padding:'1rem',resize:'none',fontFamily:"'Space Grotesk'",fontSize:'.88rem',lineHeight:1.8,color:'var(--ink)',outline:'none',transition:'border-color .25s'}}
              onFocus={e=>e.target.style.borderColor='var(--a)'}
              onBlur={e=>e.target.style.borderColor='var(--r2)'}/>
            <AnimatePresence>
              {remind && (
                <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
                  style={{background:'rgba(232,200,74,0.1)',border:'1px solid var(--a)',padding:'.8rem 1rem',marginBottom:'.8rem',display:'flex',alignItems:'center',gap:'.7rem'}}>
                  <span style={{fontSize:'1rem'}}>👋</span>
                  <span style={{fontSize:'.8rem',color:'var(--ink)',lineHeight:1.5}}>
                    Please fill in your <strong>name</strong> and <strong>email</strong> above so Kevin can get back to you!
                  </span>
                  <motion.button onClick={()=>setRemind(false)} whileHover={{color:'var(--a)'}}
                    style={{marginLeft:'auto',background:'none',border:'none',color:'var(--mut)',fontSize:'1rem',cursor:'pointer',flexShrink:0}}>✕</motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button data-h whileTap={{scale:.96}} onClick={handleSend} disabled={loading}
              style={{marginTop:'1rem',background:sent?'#4ab870':'linear-gradient(135deg,var(--a),var(--a2))',color:'#000',border:'none',padding:'.75rem 1.8rem',fontFamily:"'Space Grotesk'",fontWeight:700,fontSize:'.75rem',letterSpacing:'.08em',textTransform:'uppercase',display:'inline-flex',alignItems:'center',gap:'.5rem',cursor:'pointer',transition:'background .3s',opacity:loading?.7:1}}>
              {sent?'✓ Message Sent!':loading?'Sending...':<><IcMail size={13}/> Send Note</>}
            </motion.button>
          </div>
          <div style={{borderLeft:'1px solid var(--r2)',paddingLeft:'3rem'}}>
            {[{Icon:IcLinkedin,label:'linkedin.com/in/kends2k4',href:'https://linkedin.com/in/kends2k4'},{Icon:IcGithub,label:'github.com/DSKEVIN2k4',href:'https://github.com/DSKEVIN2k4'},{Icon:IcMail,label:'kevinds2k4@gmail.com',href:'mailto:kevinds2k4@gmail.com'}].map(({Icon,label,href})=>(
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" data-h
                whileHover={{x:6,color:'var(--ink)'}}
                style={{display:'flex',alignItems:'center',gap:'.8rem',padding:'1.1rem 0',borderBottom:'1px solid var(--r)',color:'var(--mut)',transition:'color .2s'}}>
                <Icon size={14}/>
                <span style={{fontSize:'.82rem'}}>{label}</span>
                <IcUpRight size={11} style={{marginLeft:'auto',opacity:.5}}/>
              </motion.a>
            ))}
            <div style={{padding:'1.1rem 0',display:'flex',alignItems:'center',gap:'.6rem'}}>
              <div style={{width:7,height:7,borderRadius:'50%',background:'#d4a017',boxShadow:'0 0 8px #d4a017',flexShrink:0,animation:'pulse 2s infinite'}}/>
              <span className="mono" style={{fontSize:'.54rem',letterSpacing:'.14em',textTransform:'uppercase',color:'#d4a017'}}>Open to Freelancing & Projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── FOOTER ─────────────────────────────────────────────────────── */
const Footer = () => (
  <footer style={{borderTop:'3px solid var(--r2)',background:'var(--bg)'}}>
    <Ticker reverse items={TOOLS} speed={28}/>
    <div className="footer-grid" style={{maxWidth:1280,margin:'0 auto',padding:'1.6rem 2.5rem',display:'grid',gridTemplateColumns:'1fr auto 1fr',alignItems:'center'}}>
      <span className="mono" style={{fontSize:'.52rem',letterSpacing:'.12em',textTransform:'uppercase',color:'var(--mut)'}}>© 2025 Kevin DS · Built with React & Framer Motion</span>
      <motion.span onClick={()=>document.getElementById('home')?.scrollIntoView({behavior:'smooth'})} whileHover={{letterSpacing:'0.18em'}} data-h
        style={{cursor:'pointer',fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'1.8rem',fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',color:'#e8c84a',textAlign:'center',transition:'letter-spacing 0.3s ease'}}>
        K<span style={{fontStyle:'italic'}}>D</span>S
      </motion.span>
      <div style={{display:'flex',gap:'1rem',justifyContent:'flex-end'}}>
        {[['github.com/DSKEVIN2k4','https://github.com/DSKEVIN2k4'],['linkedin.com/in/kends2k4','https://linkedin.com/in/kends2k4']].map(([l,h])=>(
          <motion.a key={l} href={h} target="_blank" rel="noopener noreferrer" data-h whileHover={{color:'var(--a)'}}
            className="mono" style={{fontSize:'.52rem',letterSpacing:'.1em',textTransform:'uppercase',color:'var(--mut)',transition:'color .2s'}}>{l} ↗</motion.a>
        ))}
      </div>
    </div>
  </footer>
);

/* ── APP ────────────────────────────────────────────────────────── */
export default function App() {
  const [light, setLight] = useTheme();
  return (
    <div className="noise">
      
      <G/>
      <Cursor/>
      <Particles/>
      <Nav light={light} setLight={setLight}/>
      <Hero/>
      <Projects/>
      <About/>
      <Skills/>
      <Certs/>
      <Awards/>
      <Contact/>
      <Footer/>
    </div>
  );
}
