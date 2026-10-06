import React from 'react';
import { 
  Activity, 
  BarChart3, 
  Droplets, 
  BookOpen, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  HeartPulse, 
  Users, 
  Database, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  Sparkles,
  FileCode2,
  ExternalLink
} from 'lucide-react';
import { Disease, BloodInventoryItem, DistrictSummary } from '../types';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  diseases: Disease[];
  bloodInventory: BloodInventoryItem[];
  districts: DistrictSummary[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenAuth,
  diseases,
  bloodInventory,
  districts
}) => {
  const criticalBloodItems = bloodInventory.filter(b => b.status === 'Critical');
  const totalPopulation = districts.reduce((acc, d) => acc + d.population, 0);
  const totalBloodUnits = bloodInventory.reduce((acc, b) => acc + b.availableUnits, 0);

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-[#1a1a1a] bg-[#070707] rounded-2xl p-6 sm:p-10">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          
          {/* Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#111] border border-cyan-900/40 text-cyan-400 text-xs font-mono uppercase tracking-widest shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>B.Sc Computer Science Capstone Project • Oracle 19c & ML</span>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-500 font-mono font-bold">
              Integrated Population Informatics
            </p>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight font-sans">
              Community Health & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                Population Analytics
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-normal max-w-3xl mx-auto">
            A high-assurance population health platform delivering privacy-preserving demographic insights, disease surveillance, real-time blood stock coordination, and non-diagnostic ML risk stratification.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="hero-explore-btn"
              onClick={() => onNavigate('dashboard')}
              className="px-5 py-2.5 bg-cyan-700 hover:bg-cyan-600 text-white text-xs uppercase tracking-wider font-bold rounded transition-all flex items-center gap-2 shadow-lg shadow-cyan-950/50"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Explore Analytics</span>
            </button>

            <button
              id="hero-ml-btn"
              onClick={() => onNavigate('ml')}
              className="px-5 py-2.5 bg-[#141414] hover:bg-[#1f1f1f] text-purple-300 border border-purple-900/40 text-xs uppercase tracking-wider font-bold rounded transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>ML Risk Estimator</span>
            </button>

            <button
              id="hero-docs-btn"
              onClick={() => onNavigate('docs')}
              className="px-5 py-2.5 bg-[#111] hover:bg-[#1a1a1a] text-amber-300 border border-[#222] text-xs uppercase tracking-wider font-bold rounded transition-all flex items-center gap-2"
            >
              <FileCode2 className="w-4 h-4 text-amber-400" />
              <span>Oracle SQL & Viva</span>
            </button>
          </div>

          {/* Mandatory Non-Diagnostic Disclaimer Banner */}
          <div className="p-3 bg-amber-950/30 border border-amber-900/40 rounded text-amber-300 text-xs flex items-start sm:items-center gap-2.5 text-left max-w-2xl mx-auto">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <span className="text-[11px] leading-relaxed">
              <strong className="text-amber-200">Educational Notice:</strong> This system computes aggregate demographic statistics and educational lifestyle risk factors. It is strictly <span className="underline font-bold">non-diagnostic</span>.
            </span>
          </div>

        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 max-w-5xl mx-auto">
          <div className="bg-[#0a0a0a] p-5 border border-[#1a1a1a] flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-[#111] border border-cyan-900/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Sample Population</p>
              <p className="text-xl font-semibold text-white font-mono">
                {totalPopulation.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] p-5 border border-[#1a1a1a] flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-[#111] border border-red-900/30 text-red-400 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Blood Reserves</p>
              <p className="text-xl font-semibold text-white font-mono">
                {totalBloodUnits.toLocaleString()} <span className="text-xs text-gray-500 font-sans">Units</span>
              </p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] p-5 border border-[#1a1a1a] flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-[#111] border border-emerald-900/30 text-emerald-400 flex items-center justify-center shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Disease Factsheets</p>
              <p className="text-xl font-semibold text-white font-mono">
                {diseases.length} <span className="text-xs text-gray-500 font-sans">Canonical</span>
              </p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] p-5 border border-[#1a1a1a] flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-[#111] border border-indigo-900/30 text-indigo-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Privacy Protocol</p>
              <p className="text-base font-semibold text-cyan-400 font-mono">
                k-Anonymity (k≥50)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Blood Shortage Alert Banner */}
      {criticalBloodItems.length > 0 && (
        <div className="bg-[#140808] border border-red-900/50 text-red-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-red-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-red-950/60 border border-red-800 text-red-400 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-red-900/40 text-red-400 text-[10px] font-mono font-bold uppercase rounded border border-red-800">
                  CRITICAL SHORTAGE
                </span>
                <h4 className="font-semibold text-sm text-white">
                  Blood Reserve Depletion Detected in {criticalBloodItems.length} Group(s)
                </h4>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Urgent replenishment needed for: {criticalBloodItems.map(b => `${b.bloodGroup} (${b.district})`).join(', ')}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('blood')}
              className="px-3.5 py-1.5 bg-[#111] hover:bg-[#1a1a1a] text-red-400 border border-red-800/60 font-mono text-xs uppercase tracking-wider font-bold rounded transition"
            >
              Inventory Status
            </button>
            <button
              onClick={() => onNavigate('blood')}
              className="px-3.5 py-1.5 bg-red-800 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-wider font-bold rounded transition"
            >
              Register Donor
            </button>
          </div>
        </div>
      )}

      {/* 2. Core Pillars / Feature Matrix */}
      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-[#1a1a1a] pb-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-500 font-mono font-bold mb-1">Architecture</p>
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              System Modules & Decision Capabilities
            </h2>
          </div>
          <span className="text-xs font-mono text-gray-500 hidden sm:inline">6 Core Microservices</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Pillar 1: Population Analytics */}
          <div className="bg-[#0a0a0a] p-6 border border-[#1a1a1a] hover:border-cyan-900/50 transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#111] border border-cyan-900/30 text-cyan-400 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                Population Health Analytics
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Filter demographic micro-data across districts, age bands, and gender. Track family size distributions, occupation patterns, and disease correlations without exposing individual PII.
              </p>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 pt-2 border-t border-[#141414]"
            >
              <span>Explore Demographics</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Pillar 2: Disease Awareness */}
          <div className="bg-[#0a0a0a] p-6 border border-[#1a1a1a] hover:border-indigo-900/50 transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#111] border border-indigo-900/30 text-indigo-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                Authoritative Disease Factsheets
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Comprehensive directory containing symptoms, etiology, risk factors, prevention steps, and clinical consultation triggers verified by WHO, ICMR, and MoHFW guidelines.
              </p>
            </div>
            <button
              onClick={() => onNavigate('diseases')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-indigo-400 hover:text-indigo-300 pt-2 border-t border-[#141414]"
            >
              <span>Browse Diseases</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Pillar 3: Blood Availability & Donors */}
          <div className="bg-[#0a0a0a] p-6 border border-[#1a1a1a] hover:border-red-900/50 transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#111] border border-red-900/30 text-red-400 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-red-300 transition-colors">
                Blood Bank & Volunteer Registry
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Real-time multi-hospital inventory status (Available, Low, Critical) for all 8 blood groups (A+, B+, O+, AB+ and negatives). Volunteer donor registration with privacy shield.
              </p>
            </div>
            <button
              onClick={() => onNavigate('blood')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-red-400 hover:text-red-300 pt-2 border-t border-[#141414]"
            >
              <span>Check Blood Stock</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Pillar 4: ML Health Risk Engine */}
          <div className="bg-[#0a0a0a] p-6 border border-[#1a1a1a] hover:border-purple-900/50 transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#111] border border-purple-900/30 text-purple-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-purple-300 transition-colors">
                Educational ML Risk Estimator
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Scikit-Learn ensemble model (Random Forest / Logistic Regression) analyzing Age, BMI, BP, Glucose, and Activity to output educational risk tiers and transparent feature impacts.
              </p>
            </div>
            <button
              onClick={() => onNavigate('ml')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-400 hover:text-purple-300 pt-2 border-t border-[#141414]"
            >
              <span>Test ML Model</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Pillar 5: Area Geographic Map */}
          <div className="bg-[#0a0a0a] p-6 border border-[#1a1a1a] hover:border-emerald-900/50 transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#111] border border-emerald-900/30 text-emerald-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                District-Level Spatial Grid
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Spatial choropleth visualization showing regional vulnerability indices, population densities, and active donor clusters without displaying exact patient geolocations.
              </p>
            </div>
            <button
              onClick={() => onNavigate('map')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-emerald-300 pt-2 border-t border-[#141414]"
            >
              <span>Open Map View</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Pillar 6: Security & Oracle Database */}
          <div className="bg-[#0a0a0a] p-6 border border-[#1a1a1a] hover:border-amber-900/50 transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#111] border border-amber-900/30 text-amber-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                Oracle SQL*Plus & Viva Hub
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                9 complete, production-grade Oracle SQL*Plus scripts (DDL, constraints, views, stored procedures, test queries), FastAPI backend code, and 30+ Viva Voce questions with answers.
              </p>
            </div>
            <button
              onClick={() => onNavigate('docs')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 pt-2 border-t border-[#141414]"
            >
              <span>Review SQL & Viva</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </section>

      {/* 3. Disease Spotlight Preview */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-[#1a1a1a] pb-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-500 font-mono font-bold">Factsheet Preview</p>
            <h3 className="text-lg font-semibold text-white">
              Public Health Knowledge Base
            </h3>
          </div>
          <button
            onClick={() => onNavigate('diseases')}
            className="text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>All Factsheets ({diseases.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {diseases.slice(0, 4).map((d) => (
            <div 
              key={d.id}
              onClick={() => onNavigate('diseases')}
              className="bg-[#0a0a0a] p-4 border border-[#1a1a1a] hover:border-cyan-900/50 transition cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded bg-[#111] text-cyan-400 border border-cyan-900/40">
                  {d.category}
                </span>
                <h4 className="font-semibold text-sm text-white">{d.name}</h4>
                <p className="text-xs text-gray-400 line-clamp-2">{d.description}</p>
              </div>
              <div className="pt-3 border-t border-[#141414] mt-3 text-[10px] font-mono text-gray-500">
                Source: {d.reliableSource.split('&')[0]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Privacy by Design Trust Banner */}
      <section className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 sm:p-10 relative overflow-hidden">
        <div className="max-w-3xl space-y-5">
          
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-950/40 text-emerald-400 text-xs font-mono uppercase tracking-wider border border-emerald-900/50">
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy-By-Design Architecture</span>
          </div>

          <h3 className="text-2xl font-semibold text-white leading-tight">
            Cryptographic Tokenization & Strict k-Anonymity
          </h3>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
            CHP Analytics enforces rigorous de-identification and pseudonymous tokenization (`CITIZEN-XXXX`). Individual health observations are never linked to personal identifiers in public registries, ensuring total compliance with ethical health informatics standards.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-start gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Zero Public Exposure of Citizen PII</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Single-Use 300s Expiring Email OTP</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Bcrypt Work-Factor 12 Password Hashing</span>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenAuth('register')}
              className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white font-mono text-xs uppercase tracking-wider font-bold rounded transition shadow-md shadow-cyan-950/50"
            >
              Register Citizen Account
            </button>
            <button
              onClick={() => onNavigate('docs')}
              className="px-4 py-2 bg-[#111] hover:bg-[#1a1a1a] text-gray-300 font-mono text-xs uppercase tracking-wider font-semibold rounded transition border border-[#262626]"
            >
              Review Architecture Specs
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

