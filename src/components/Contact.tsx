"use client";
import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefono",
    value: "+39 346 593 5633",
    href: "tel:+393465935633",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    desc: "Disponibile tutti i giorni",
  },
  {
    icon: Mail,
    label: "Email",
    value: "mazzelliv@gmail.com",
    href: "mailto:mazzelliv@gmail.com",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    desc: "Risposta entro 24h",
  },
  {
    icon: MapPin,
    label: "Zona di Intervento",
    value: "Tutta Roma e Provincia",
    href: null,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    desc: "Interveniamo ovunque a Roma",
  },
  {
    icon: Clock,
    label: "Orari",
    value: "Lun–Sab 8:00–19:00",
    href: null,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    desc: "Urgenze anche oltre orario",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `Nuova richiesta da ${form.name} - Mazzelli Elettromeccanica`,
          from_name: form.name,
          email: form.email,
          phone: form.phone || "non fornito",
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setError("Errore nell'invio. Riprova o chiamaci direttamente.");
      }
    } catch {
      setError("Errore di connessione. Riprova o chiamaci direttamente.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contatti" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.06)_0%,transparent_70%)]" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3 block">
            Contatti
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Parliamo del{" "}
            <span className="gradient-text">Tuo Impianto</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Descrivi il problema o il servizio di cui hai bisogno — ti risponderemo subito.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-4 mb-10">
              {contactInfo.map((c) => (
                <div key={c.label} className="glass rounded-2xl p-5 flex items-center gap-4 card-hover">
                  <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                    <c.icon size={20} className={c.color} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className={`font-bold text-white hover:${c.color} transition-colors`}>
                        {c.value}
                      </a>
                    ) : (
                      <div className="font-bold text-white">{c.value}</div>
                    )}
                    <div className="text-xs text-slate-500 mt-0.5">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl overflow-hidden relative">
              <iframe
                title="Zona di intervento — Roma e Provincia"
                src="https://www.google.com/maps?q=Roma,Italia&z=10&output=embed"
                className="w-full h-56 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="absolute top-3 left-3 glass px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-none">
                <MapPin size={14} className="text-orange-400" />
                <span className="text-xs font-semibold text-white">Roma e Provincia</span>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="glass rounded-3xl p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Messaggio Inviato!</h3>
                  <p className="text-slate-400">Ti risponderemo al più presto. Grazie per averci contattato.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-white mb-6">Inviaci un Messaggio</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 uppercase tracking-wide mb-1 block">Nome *</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                        placeholder="Mario Rossi"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 uppercase tracking-wide mb-1 block">Telefono</label>
                      <input
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                        placeholder="+39 XXX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wide mb-1 block">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                      placeholder="mario@esempio.it"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wide mb-1 block">Descrivi il Problema *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                      placeholder="Descrivi il tipo di impianto, il problema riscontrato e la tua zona a Roma..."
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg hover:from-orange-400 hover:to-orange-500 transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                    {sending ? "Invio in corso..." : "Invia Richiesta"}
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    Oppure chiamaci direttamente:{" "}
                    <a href="tel:+393465935633" className="text-orange-400 hover:text-orange-300 font-semibold">
                      +39 346 593 5633
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
