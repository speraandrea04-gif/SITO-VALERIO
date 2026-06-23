import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valerio Mazzelli | Riparazioni Elettromeccaniche Roma",
  description: "Specialisti in riparazione di elettropompe, gruppi di pressione, collaudi elettrici e idraulici e gestione inverter. Operativi su tutta Roma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full">
      <body className="min-h-full bg-[#0a0a0a] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
