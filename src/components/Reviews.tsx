"use client";
import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Marco Ferretti",
    role: "Amministratore di Condominio",
    text: "Ho contattato Valerio per la riparazione del gruppo di pressione del nostro condominio. Intervento rapido, professionale e a un prezzo onesto. Il sistema ora funziona meglio di prima. Lo consiglio vivamente!",
    rating: 5,
    service: "Gruppi di Pressione",
    initials: "MF",
    color: "from-orange-500 to-amber-400",
  },
  {
    name: "Giulia Santoro",
    role: "Titolare di B&B",
    text: "Avevamo un problema urgente con l'elettropompa della struttura. Valerio è intervenuto in meno di due ore, ha diagnosticato il guasto e riparato tutto in giornata. Servizio impeccabile, torneremo sicuramente.",
    rating: 5,
    service: "Riparazione Elettropompe",
    initials: "GS",
    color: "from-sky-500 to-blue-400",
  },
  {
    name: "Roberto Conti",
    role: "Responsabile Tecnico",
    text: "Collaboriamo con Valerio Mazzelli da anni per la manutenzione degli impianti della nostra azienda. Competenza tecnica elevata, sempre puntuale e disponibile. La gestione degli inverter che ha eseguito ha ridotto i nostri consumi energetici significativamente.",
    rating: 5,
    service: "Gestione Inverter",
    initials: "RC",
    color: "from-violet-500 to-purple-400",
  },
  {
    name: "Anna Lombardi",
    role: "Privata",
    text: "Avevo bisogno di un collaudo idraulico per la vendita del mio immobile. Valerio ha eseguito tutto in modo professionale e fornito la documentazione necessaria in tempi brevi. Persona seria e qualificata.",
    rating: 5,
    service: "Collaudi Idraulici",
    initials: "AL",
    color: "from-emerald-500 to-teal-400",
  },
  {
    name: "Luca Marino",
    role: "Gestore Impianto Sportivo",
    text: "Le pompe della nostra piscina avevano ceduto proprio prima di un evento importante. Valerio ha risolto il problema in tempi record, lavorando anche il sabato. Professionalità e dedizione al cliente al top!",
    rating: 5,
    service: "Riparazione Elettropompe",
    initials: "LM",
    color: "from-rose-500 to-orange-400",
  },
  {
    name: "Carla Bianchi",
    role: "Proprietaria Abitazione",
    text: "Revisione completa del gruppo di pressione di casa mia. Valerio ha spiegato chiaramente ogni fase del lavoro e ha dato ottimi consigli per la manutenzione futura. Lavoro fatto a regola d'arte, nessun problema da oltre un anno.",
    rating: 5,
    service: "Revisione Gruppi di Pressione",
    initials: "CB",
    color: "from-amber-500 to-yellow-400",
  },
];

export default function Reviews() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="recensioni" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3 block">
            Recensioni
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Cosa Dicono i{" "}
            <span className="gradient-text">Nostri Clienti</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
            ))}
            <span className="ml-2 text-slate-400 font-medium">5.0 su 5 — Google Reviews</span>
          </div>
        </div>

        {/* Featured review (large) */}
        <div
          className={`mb-8 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative glass rounded-3xl p-8 md:p-10 overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${reviews[active].color}`} />
            <Quote size={48} className="text-white/5 absolute top-6 right-8" />

            <div className="flex items-start gap-5">
              <div className={`w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br ${reviews[active].color} flex items-center justify-center text-white font-black text-lg`}>
                {reviews[active].initials}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-bold text-white text-lg">{reviews[active].name}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 text-sm">{reviews[active].role}</span>
                  <span className="ml-auto glass px-3 py-1 rounded-full text-xs text-slate-300">
                    {reviews[active].service}
                  </span>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(reviews[active].rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed text-lg">&ldquo;{reviews[active].text}&rdquo;</p>
              </div>
            </div>
          </div>
        </div>

        {/* All reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              onClick={() => setActive(i)}
              className={`text-left glass rounded-2xl p-5 card-hover transition-all duration-700 border-2 ${
                active === i ? "border-orange-500/50" : "border-transparent"
              } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80 + 300}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white font-bold text-xs`}>
                  {r.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.role}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} size={11} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{r.text}</p>
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-orange-500" : "w-3 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
