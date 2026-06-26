"use client";
import { useEffect, useRef, useState } from "react";
import { Droplets, Gauge, Zap, Settings } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Riparazione Elettropompe",
    subtitle: "Componenti Idrauliche",
    desc: "Diagnosi e riparazione professionale di elettropompe e componenti idrauliche di ogni marca e tipologia. Interveniamo su pompe sommerse, centrifughe, autoadescanti e multistadio, ripristinando le prestazioni originali con ricambi certificati.",
    features: ["Pompe sommerse e centrifughe", "Componenti idrauliche", "Ricambi certificati", "Test di funzionalità post-riparazione"],
    image: "https://i.postimg.cc/JnghFNXj/elettropompa-riparazione-02.jpg",
    color: "from-sky-500 to-blue-600",
    glow: "shadow-sky-500/20",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    num: "01",
  },
  {
    icon: Gauge,
    title: "Gruppi di Pressione",
    subtitle: "Riparazione e Revisione",
    desc: "Revisione completa e riparazione di gruppi di pressione per impianti civili e industriali. Effettuiamo smontaggio, ispezione, sostituzione delle parti usurate e rimontaggio con calibrazione ottimale della pressione di esercizio.",
    features: ["Revisione completa", "Calibrazione pressione", "Impianti civili e industriali", "Sostituzione parti usurate"],
    image: "https://i.postimg.cc/pT74hHpK/ALICANTE-1.jpg",
    color: "from-orange-500 to-red-500",
    glow: "shadow-orange-500/20",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
    num: "02",
  },
  {
    icon: Zap,
    title: "Collaudi Elettrici",
    subtitle: "e Idraulici",
    desc: "Collaudi tecnici completi su impianti elettrici e idraulici per verificarne la conformità e sicurezza. Rilasciamo documentazione tecnica al termine di ogni collaudo, utile per certificazioni e pratiche burocratiche.",
    features: ["Verifica conformità impianti", "Collaudi di pressione", "Documentazione tecnica", "Certificazioni di sicurezza"],
    image: "https://i.postimg.cc/15ThnDVB/collaudo-impianto-elettrico.jpg",
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    num: "03",
  },
  {
    icon: Settings,
    title: "Gestione Inverter",
    subtitle: "Programmazione & Configurazione",
    desc: "Configurazione, programmazione e riparazione di inverter per il controllo di pompe e gruppi di pressione. Ottimizziamo i parametri di funzionamento per massimizzare l'efficienza energetica e la durata delle apparecchiature.",
    features: ["Programmazione parametri", "Ottimizzazione energetica", "Riparazione guasti elettronici", "Compatibilità multi-marca"],
    image: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?w=800&q=80",
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    num: "04",
  },
];

function ServiceCard({ s, i, visible }: { s: typeof services[0]; i: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`glass rounded-3xl overflow-hidden card-hover transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${hovered ? `shadow-2xl ${s.glow}` : ""}`}
      style={{ transitionDelay: `${i * 150}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image header */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={s.image}
          alt={s.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-20 mix-blend-overlay`} />
        {/* Number */}
        <span className="absolute top-4 right-5 text-6xl font-black text-white/20">
          {s.num}
        </span>
        {/* Icon badge */}
        <div className={`absolute bottom-4 left-5 w-14 h-14 rounded-2xl ${s.iconBg} backdrop-blur-md border border-white/10 flex items-center justify-center`}>
          <s.icon size={26} className={s.iconColor} />
        </div>
      </div>

      {/* Top gradient bar */}
      <div className={`h-1.5 bg-gradient-to-r ${s.color}`} />

      <div className="p-7">
        {/* Text */}
        <p className={`text-xs font-bold uppercase tracking-widest ${s.iconColor} mb-1`}>
          {s.subtitle}
        </p>
        <h3 className="text-xl font-black text-white mb-3">{s.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{s.desc}</p>

        {/* Features */}
        <ul className="space-y-2">
          {s.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${s.color}`} />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="servizi" className="py-28 bg-slate-950 relative">
      {/* Decorative line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3 block">
            I Nostri Servizi
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Tutto ciò di cui hai{" "}
            <span className="gradient-text">bisogno</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Offriamo soluzioni complete per la tua impiantistica — dalla riparazione rapida
            alla revisione completa, con garanzia su ogni lavoro eseguito.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.num} s={s} i={i} visible={visible} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-slate-400 mb-5">
            Non trovi il servizio che cerchi?{" "}
            <span className="text-white font-semibold">Contattaci</span>, troveremo la soluzione.
          </p>
          <a
            href="#contatti"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:from-orange-400 hover:to-orange-500 transition-all shadow-lg shadow-orange-500/30"
          >
            Parla con un Tecnico
          </a>
        </div>
      </div>
    </section>
  );
}
