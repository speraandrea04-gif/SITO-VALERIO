"use client";
import { useEffect, useState, useCallback } from "react";
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

  const goTo = useCallback((index: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setPrev(current);
    setCurrent(index);
    setTimeout(() => {
      setPrev(null);
      setTransitioning(false);
    }, 1000);
  }, [current, transitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const back = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden cursor-pointer" onClick={next}>
      {/* Image layers */}
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
              className="w-full h-full object-cover"
              style={{
                transform: isActive ? "scale(1.08)" : "scale(1)",
                transition: "transform 7s ease-out",
              }}
            />
          </div>
        );
      })}

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6">
        <div key={current} className="animate-fadeInUp">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-4">
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

        <div className="flex flex-wrap gap-4 justify-center" onClick={e => e.stopPropagation()}>
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

      {/* Arrow controls */}
      <button
        onClick={e => { e.stopPropagation(); back(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={e => { e.stopPropagation(); next(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2" onClick={e => e.stopPropagation()}>
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

      {/* Scroll cue */}
      <a
        href="#about"
        onClick={e => e.stopPropagation()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/60 hover:text-orange-400 animate-float transition-colors"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
