import FeedbackPortal from "@/components/FeedbackPortal";
import { Info, Signal, Shield, ShieldAlert, Cpu } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080b11] text-slate-100 font-sans flex flex-col md:flex-row justify-center items-center p-4 md:p-8 lg:p-12 gap-8 lg:gap-16 relative overflow-hidden">

      {/* Modern Motion AI Gradient Background (Gemini-style) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#8ab4f8]/10 blur-[130px] animate-blob-1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#ecb2ff]/8 blur-[140px] animate-blob-2" />
        <div className="absolute top-[30%] right-[15%] w-[45vw] h-[45vw] rounded-full bg-[#ffb1bd]/8 blur-[120px] animate-blob-3" />
        <div className="absolute bottom-[20%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#2dd4bf]/8 blur-[130px] animate-blob-1" />
      </div>

      {/* Left Column: Product Dashboard & Technical Context (Desktop Only) */}
      <div className="hidden lg:flex flex-col max-w-lg space-y-6 animate-fade-in py-8 z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#8ab4f8] text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            Official BRO Digital Initiative
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
            Border Roads Organisation
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#8ab4f8] via-[#ecb2ff] to-[#ffb1bd]">
              SETU System
            </span>
          </h1>
          <p className="text-[#a8c7fa] text-xs font-bold uppercase tracking-widest leading-none mt-1.5">
            Seamless Engagement & Transit Utility
          </p>

          <p className="text-slate-400 text-sm leading-relaxed pt-1.5">
            A production-ready, mobile-first interface built for citizens to express gratitude, report feedback, and share transit conditions directly with the formations securing and building India's border infrastructure.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
            <div className="text-amber-400 flex items-center gap-1.5 font-bold text-xs">
              <Signal className="w-4 h-4" /> LOW BANDWIDTH
            </div>
            <p className="text-xs text-slate-400">
              Self-contained React component with lightweight SVGs. Optimized for 3G/4G mountain networks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
            <div className="text-emerald-400 flex items-center gap-1.5 font-bold text-xs">
              <Cpu className="w-4 h-4" /> ACCESSIBLE
            </div>
            <p className="text-xs text-slate-400">
              Equipped with Outdoor High-Contrast Mode and Voice Guidance options to assist under high glare.
            </p>
          </div>
        </div>

        {/* GOI Compliance Box */}
        <div className="p-4.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex gap-3">
          <div className="text-blue-400 flex-shrink-0">
            <Info className="w-5 h-5 mt-0.5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
              GOVERNMENT COMPLIANCE NOTE
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              Designed in compliance with the Government of India Digital Guidelines. Implements Ashoka Chakra and Border Roads Organization crests with high contrast typography for optimal field accessibility.
            </p>
          </div>
        </div>

        {/* Footer Brand */}
        <div className="flex flex-col gap-2 pt-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>© 2026 Border Roads Organisation</span>
            <span>•</span>
            <a href="https://bro.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 underline">
              bro.gov.in
            </a>
          </div>
          <div className="text-[10px] text-slate-500 tracking-wide font-medium">
            Designed in collaboration with <span className="text-slate-300 font-semibold">Polardot</span> & <span className="text-slate-300 font-semibold">S+UM Architects</span>
          </div>
        </div>
      </div>

      {/* Right Column: Simulated Smartphone Device Frame */}
      <div className="relative flex-shrink-0 animate-scale-up">
        {/* Smartphone Shell Frame (only visible on md screens and up) */}
        <div className="hidden sm:block absolute inset-0 -m-3 bg-slate-950 rounded-[40px] border-4 border-slate-800 shadow-2xl pointer-events-none z-0" />

        {/* Screen Notch */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-20 pointer-events-none" />

        {/* Dynamic Mobile Screen Container */}
        <div className="relative rounded-[32px] sm:border-8 sm:border-slate-950 overflow-hidden bg-slate-900 z-10">
          <FeedbackPortal />
        </div>
      </div>

    </main>
  );
}
