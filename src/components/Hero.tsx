"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Phone } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=85",
    title: "Precisione",
    subtitle: "nell'Elettromeccanica",
    desc: "Riparazione professionale di pompe, inverter e impianti idraulici.",
  },
  {
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=85",
    title: "Esperienza",
    subtitle: "e Affidabilità",
    desc: "Anni di competenze al servizio di privati e aziende su tutta Roma.",
  },
  {
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=85",
    title: "Soluzioni",
    subtitle: "su Misura",
    desc: "Collaudi, revisioni e gestione inverter: ogni intervento è personalizzato.",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85",
    title: "Interventi",
    subtitle: "Rapidi e Sicuri",
    desc: "Pronti a intervenire su tutta Roma e Provincia in tempi brevi.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const tiltRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setPrev(current);
    setCurrent(index);
    setTimeout(() => {
      setPrev(null);
      setTransitioning(false);
    }, 1200);
  }, [current, transitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const back = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next]);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      tiltRef.current = {
        x: (e.clientY - cy) / cy,
        y: (e.clientX - cx) / cx,
      };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setTilt({ ...tiltRef.current });
          rafRef.current = null;
        });
      }
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    function onScroll() { setScrollY(window.scrollY); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const imgStyle = {
    transform: `perspective(800px) scale(1.2) translateY(${scrollY * 0.5}px) rotateX(${-tilt.x * 12}deg) rotateY(${tilt.y * 12}deg)`,
    transition: "transform 0.2s ease-out",
  };

  const contentStyle = {
    transform: `perspective(800px) translateX(${tilt.y * -25}px) translateY(${tilt.x * -18}px) translateZ(60px)`,
    transition: "transform 0.4s ease-out",
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, i) => {
        const isActive = i === current;
        const isPrev = i === prev;
        if (!isActive && !isPrev) return null;
        return (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: isActive ? 1 : 0, zIndex: isPrev ? 1 : 2 }}
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover will-change-transform"
              style={isActive ? imgStyle : { transform: "scale(1.2)" }}
            />
          </div>
        );
      })}

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />

      <div
        className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6"
        style={contentStyle}
      >
        <div key={current} className="animate-fadeInUp">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-4 drop-shadow-lg">
            Mazzelli Elettromeccanica · Roma
          </p>
          <h1 className="text-5xl md:text-8xl font-black leading-tight mb-4 text-white drop-shadow-2xl">
            <span className="gradient-text">{slides[current].title}</span>
            <br />
            {slides[current].subtitle}
          </h1>
          <p className="text-slate-200 text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl mx-auto drop-shadow-lg">
            {slides[current].desc}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#contatti"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg hover:from-orange-400 hover:to-orange-500 transition-all shadow-xl shadow-orange-500/40"
          >
            Richiedi un Preventivo
          </a>
          <a
            href="tel:+393465935633"
            className="px-8 py-4 rounded-full glass text-white font-bold text-lg hover:bg-white/10 transition-all border border-white/30 flex items-center gap-2"
          >
            <Phone size={18} />
            Chiama Ora
          </a>
          <a
            href="https://wa.me/393465935633"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg hover:bg-[#1ebe5b] transition-all shadow-xl shadow-[#25D366]/40 flex items-center gap-2"
          >
            <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.55 4.18 1.6 6L4 29l8.13-1.55a12 12 0 0 0 3.9.65h.01C22.68 28.1 28 22.7 28 16.06 28 8.4 22.68 3 16.04 3Zm0 21.9c-1.2 0-2.38-.2-3.5-.6l-.25-.1-4.83.92.93-4.7-.16-.26a9.9 9.9 0 0 1-1.5-5.06c0-5.5 4.48-9.97 10-9.97 2.66 0 5.16 1.04 7.04 2.92a9.9 9.9 0 0 1 2.92 7.05c0 5.5-4.48 9.97-10 9.97Zm5.5-7.47c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51l-.58-.01c-.2 0-.53.07-.8.37-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.13 4.54.72.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.08 1.78-.72 2.03-1.42.25-.7.25-1.3.18-1.42-.07-.13-.27-.2-.57-.35Z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      <button
        onClick={back}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-500 ${
              i === current ? "w-8 h-2 bg-orange-500" : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/60 hover:text-orange-400 animate-float transition-colors"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
