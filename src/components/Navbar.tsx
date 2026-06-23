"use client";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Chi Siamo", href: "#about" },
  { label: "Servizi", href: "#servizi" },
  { label: "Recensioni", href: "#recensioni" },
  { label: "Contatti", href: "#contatti" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-black/40 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-sky-500 flex items-center justify-center animate-pulse-glow">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="text-white">Mazzelli</span>
            <span className="gradient-text"> Elettromeccanica</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contatti"
            className="ml-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold hover:from-orange-400 hover:to-orange-500 transition-all shadow-lg shadow-orange-500/30"
          >
            Contattaci
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-white/10 mt-1 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-slate-200 hover:text-orange-400 font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
