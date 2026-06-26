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
  const sectionRef = useRef<HTMLElement>(null);
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
    transform: `scale(1.15) translateY(${scrollY * 0.4}px) rotateX(${-tilt.x * 4}deg) rotateY(${tilt.y * 4}deg)`,
    transition: "transform 0.15s ease-out",
  };

  const contentStyle = {
    transform: `translateX(${tilt.y * -12}px) translateY(${tilt.x * -8}px)`,
    transition: "transform 0.3s ease-out",
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen w-full overflow-hidden"
      style={{ perspective: "1200px" }}
    >
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
              style={isActive ? imgStyle : { transform: "scale(1.15)" }}
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
            +39 346 593 5633
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
