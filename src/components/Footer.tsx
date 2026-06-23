import { Zap, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-sky-500 flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-white">Mazzelli</span>
                <span className="gradient-text"> Elettromeccanica</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Specialisti in riparazione di elettropompe, gruppi di pressione, collaudi e gestione
              inverter. Al tuo servizio su tutta Roma.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Navigazione</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "Chi Siamo", "Servizi", "Recensioni", "Contatti"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(" ", "")}`}
                    className="text-slate-500 hover:text-orange-400 transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contatti</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-500">
                <Phone size={14} className="text-orange-400 shrink-0" />
                <a href="tel:+393465935633" className="hover:text-orange-400 transition-colors">
                  +39 346 593 5633
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <Mail size={14} className="text-sky-400 shrink-0" />
                <a href="mailto:mazzelliv@gmail.com" className="hover:text-sky-400 transition-colors">
                  mazzelliv@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <MapPin size={14} className="text-violet-400 shrink-0" />
                Roma e Provincia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Valerio Mazzelli Elettromeccanica. Tutti i diritti riservati.</p>
          <p>P.IVA: IT18446191001 · Roma, Italia</p>
        </div>
      </div>
    </footer>
  );
}
