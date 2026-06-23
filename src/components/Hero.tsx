"use client";
import { useEffect, useState } from "react";
import { ChevronDown, MapPin, Phone } from "lucide-react";

const slides = [
  {
    title: "Precisione",
    subtitle: "nell'Elettromeccanica",
    desc: "Riparazione professionale di pompe, inverter e impianti idraulici.",
    accent: "from-orange-500 to-amber-400",
    bg: "from-orange-900/20 via-slate-950 to-slate-950",
  },
  {
    title: "Esperienza",
    subtitle: "e Affidabilità",
    desc: "Anni di competenze al servizio di privati e aziende su tutta Roma.",
    accent: "from-sky-500 to-blue-400",
    bg: "from-sky-900/20 via-slate-950 to-slate-950",
  },
  {
    title: "Soluzioni",
    subtitle: "su Misura",
    desc: "Collaudi, revisioni e gestione inverter: ogni intervento è personalizzato.",
    accent: "from-violet-500 to-purple-400",
    bg: "from-violet-900/20 via-slate-950 to-slate-950",
  },
];

const stats = [
  { value: "15+", label: "Anni di Esperienza" },
  { value: "500+", label: "Interventi Completati" },
  { value: "100%", label: "Soddisfazione Clienti" },
  { value: "Roma", label: "Operativi su tutta la città" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setAnimating(false);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      id="home"
      className={`relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br ${slide.bg} transition-all duration-1000`}
    >
      {/* Decorative background rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/3 animate-counter-spin" />
        <div className={`absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br ${slide.accent} opacity-10 blur-3xl transition-all duration-1000`} />
        <div className={`absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-gradient-to-br ${slide.accent} opacity-10 blur-3xl transition-all duration-1000`} />
      </div>

      {/* Gear decorations */}
      <div className="absolute top-20 right-16 opacity-10 text-orange-400 animate-spin-slow text-8xl select-none">⚙</div>
      <div className="absolute bottom-32 left-10 opacity-10 text-sky-400 animate-counter-spin text-6xl select-none">⚙</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-slate-300 mb-6">
              <MapPin size={14} className="text-orange-400" />
              Operativi su tutta Roma
            </div>

            <div
              className={`transition-all duration-400 ${
                animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-4">
                <span className={`gradient-text bg-gradient-to-r ${slide.accent}`}>
                  {slide.title}
                </span>
                <br />
                <span className="text-white">{slide.subtitle}</span>
              </h1>
              <p className="text-slate-300 text-xl leading-relaxed mb-8 max-w-lg">
                {slide.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#contatti"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg hover:from-orange-400 hover:to-orange-500 transition-all shadow-xl shadow-orange-500/30 animate-pulse-glow"
              >
                Richiedi un Preventivo
              </a>
              <a
                href="#servizi"
                className="px-8 py-4 rounded-full glass text-white font-bold text-lg hover:bg-white/10 transition-all border border-white/20"
              >
                I Nostri Servizi
              </a>
            </div>

            {/* Phone quick contact */}
            <a
              href="tel:+393465935633"
              className="inline-flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/40 transition-colors">
                <Phone size={16} className="text-orange-400" />
              </div>
              <span className="font-semibold">+39 346 593 5633</span>
            </a>
          </div>

          {/* Right: Stats card */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl p-6 card-hover text-center"
              >
                <div className="text-3xl font-black gradient-text mb-1">{s.value}</div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-orange-500" : "w-3 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-orange-400 animate-float transition-colors"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
