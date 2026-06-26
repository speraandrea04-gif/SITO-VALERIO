"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { ChevronDown, Phone } from "lucide-react";
import dynamic from "next/dynamic";

const PumpScene = dynamic(() => import("./PumpScene"), { ssr: false });

const texts = [
  { title: "Precisione", subtitle: "nell'Elettromeccanica", desc: "Riparazione professionale di pompe, inverter e impianti idraulici." },
  { title: "Esperienza", subtitle: "e Affidabilità", desc: "Anni di competenze al servizio di privati e aziende su tutta Roma." },
  { title: "Soluzioni", subtitle: "su Misura", desc: "Collaudi, revisioni e gestione inverter: ogni intervento è personalizzato." },
];

export default function Hero() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [textIdx, setTextIdx] = useState(0);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMouseX(mouseRef.current.x);
          setMouseY(mouseRef.current.y);
          rafRef.current = null;
        });
      }
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTextIdx(i => (i + 1) % texts.length), 5000);
    return () => clearInterval(t);
  }, []);

  // mouseY da -1 a 1 → explode da 0 a 1.2
  const explode = Math.max(0, (mouseY + 1) / 2) * 1.2;
  // mouseX → rotation
  const rotation = mouseX * Math.PI * 0.8;

  const text = texts[textIdx];

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-slate-950">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 1.5, 7], fov: 45 }}
          gl={{ antialias: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-5, 2, -5]} intensity={0.5} color="#38bdf8" />
          <pointLight position={[0, 0, 4]} intensity={1.0} color="#f97316" />

          <Suspense fallback={null}>
            <PumpScene explode={explode} rotation={rotation} />
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* Text content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 pointer-events-none">
        <div key={textIdx} className="animate-fadeInUp max-w-xl">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Mazzelli Elettromeccanica · Roma
          </p>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-4 text-white drop-shadow-2xl">
            <span className="gradient-text">{text.title}</span>
            <br />
            {text.subtitle}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8 drop-shadow-lg">
            {text.desc}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pointer-events-auto">
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

      {/* Mouse hint */}
      <div className="absolute bottom-24 right-8 z-20 text-slate-500 text-xs text-right pointer-events-none">
        <p>↕ muovi il mouse per smontare la pompa</p>
        <p>↔ ruota per esplorarla</p>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/60 hover:text-orange-400 animate-float transition-colors"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
