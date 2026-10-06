import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Database, 
  Lock, 
  Droplets, 
  HeartPulse, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  pageTitle,
  subtitle
}) => {
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-[#090909] border border-[#1c1c1c] rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Left Side: Project Identity & Visual Features */}
        <div className="lg:col-span-5 bg-[#060606] p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#1a1a1a] flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-900/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-6 relative z-10">
            {/* Logo Badge */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-900/40">
                <span className="font-mono text-lg">C</span>
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white uppercase block">
                  CHP <span className="text-cyan-400 font-light">Analytics</span>
                </span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  Tamil Nadu Health Gateway
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {pageTitle}
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                {subtitle}
              </p>
            </div>

            {/* Platform Trust Highlights */}
            <div className="space-y-3 pt-4 border-t border-[#141414] font-mono text-xs">
              <div className="flex items-start gap-2.5 text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">k-Anonymity (k≥50)</span>
                  <span className="text-[11px] text-gray-500 font-sans">Strict aggregation prevents reverse identification of medical records.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-gray-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">38 Tamil Nadu Districts</span>
                  <span className="text-[11px] text-gray-500 font-sans">Full municipal healthcare tracking from Chennai to Kanniyakumari.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-gray-300">
                <Database className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Oracle 19c Enterprise DB</span>
                  <span className="text-[11px] text-gray-500 font-sans">ACID compliance, referential constraints, and audit logging.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Security Footer */}
          <div className="pt-8 border-t border-[#141414] text-[10px] font-mono text-gray-500 flex items-center justify-between relative z-10">
            <span>B.Sc CS Capstone Project</span>
            <span className="text-cyan-400">TLS 1.3 Encrypted</span>
          </div>

        </div>

        {/* Right Side: Authentication Form Content */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-[#090909]">
          {children}
        </div>

      </div>
    </div>
  );
};
