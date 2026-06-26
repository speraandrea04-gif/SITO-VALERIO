"use client";
import { useEffect, useRef, useState } from "react";
import { Shield, Award, Users, Clock } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Qualità Certificata",
    desc: "Ogni intervento segue standard tecnici elevati con componenti di prima scelta.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: Award,
    title: "Esperienza Comprovata",
    desc: "Oltre 15 anni nel settore elettromeccanico a Roma e dintorni.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    icon: Users,
    title: "Clienti Soddisfatti",
    desc: "Privati, aziende e industrie scelgono Mazzelli per affidabilità e competenza.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Clock,
    title: "Intervento Rapido",
    desc: "Diagnosi veloce e tempi di riparazione ridotti per minimizzare i fermi.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3 block">
            Chi Siamo
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Passione per l&apos;
            <span className="gradient-text">Elettromeccanica</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Valerio Mazzelli è un tecnico specializzato con sede a Roma, dedicato alla riparazione
            e manutenzione di impianti idraulici ed elettromeccanici. Con anni di esperienza sul
            campo, garantisce interventi precisi, rapidi e duraturi per privati e aziende.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`glass rounded-2xl p-6 card-hover transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${v.bg} flex items-center justify-center mb-4`}>
                <v.icon size={22} className={v.color} />
              </div>
              <h3 className="font-bold text-white mb-2">{v.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Banner strip */}
        <div
          className={`mt-16 rounded-3xl overflow-hidden transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 p-px rounded-3xl">
            <div className="bg-slate-950 rounded-3xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-black text-white mb-1">
                  Hai un&apos;emergenza tecnica?
                </h3>
                <p className="text-slate-400">
                  Contattaci subito — siamo disponibili per interventi urgenti su Roma.
                </p>
              </div>
              <a
                href="tel:+393465935633"
                className="shrink-0 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold hover:from-orange-400 hover:to-amber-300 transition-all shadow-lg shadow-orange-500/30 whitespace-nowrap"
              >
                📞 Chiama Ora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
