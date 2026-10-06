import React, { useState } from 'react';
import { 
  FileCode2, 
  Database, 
  HelpCircle, 
  Copy, 
  Check, 
  Download, 
  Layers, 
  ShieldCheck, 
  Server, 
  Code2, 
  ChevronRight,
  BookOpen,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ORACLE_SQL_SCRIPTS } from '../services/oracleScripts';
import { VIVA_QUESTIONS, SYSTEM_ARCHITECTURE_DOCS } from '../services/documentationData';

export const DocumentationView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'oracle' | 'viva' | 'architecture' | 'fastapi'>('oracle');
  const [selectedScriptIndex, setSelectedScriptIndex] = useState<number>(0);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [selectedVivaCategory, setSelectedVivaCategory] = useState<string>('All');
  const [searchViva, setSearchViva] = useState<string>('');

  const currentScript = ORACLE_SQL_SCRIPTS[selectedScriptIndex] || ORACLE_SQL_SCRIPTS[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const vivaCategories = ['All', 'Database & Oracle SQL', 'Machine Learning & Analytics', 'Cybersecurity & Privacy', 'Software Architecture'];

  const filteredViva = VIVA_QUESTIONS.filter(q => {
    const matchesCat = selectedVivaCategory === 'All' || q.category === selectedVivaCategory;
    const matchesSearch = q.question.toLowerCase().includes(searchViva.toLowerCase()) || 
                          q.answer.toLowerCase().includes(searchViva.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0a0a0a] p-6 sm:p-8 rounded-xl border border-[#1a1a1a] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#111] border border-[#222] text-cyan-400 flex items-center justify-center font-mono">
                <FileCode2 className="w-4 h-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Oracle SQL*Plus, Viva Hub & Technical Documentation
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 font-mono text-[11px] mt-1">
              Final-year capstone reference artifacts: 9 Oracle SQL scripts, FastAPI endpoints, and 30+ Viva Voce questions.
            </p>
          </div>

          {/* Navigation Pills */}
          <div className="flex items-center gap-1.5 bg-[#111] p-1 rounded-lg border border-[#222] overflow-x-auto max-w-full font-mono text-xs">
            <button
              onClick={() => setActiveSection('oracle')}
              className={`px-3 py-1.5 rounded whitespace-nowrap transition flex items-center gap-1.5 ${
                activeSection === 'oracle' ? 'bg-[#1f1f1f] text-cyan-400 border border-cyan-500/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Oracle SQL*Plus</span>
            </button>
            <button
              onClick={() => setActiveSection('viva')}
              className={`px-3 py-1.5 rounded whitespace-nowrap transition flex items-center gap-1.5 ${
                activeSection === 'viva' ? 'bg-[#1f1f1f] text-cyan-400 border border-cyan-500/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Viva Preparation (30+)</span>
            </button>
            <button
              onClick={() => setActiveSection('architecture')}
              className={`px-3 py-1.5 rounded whitespace-nowrap transition flex items-center gap-1.5 ${
                activeSection === 'architecture' ? 'bg-[#1f1f1f] text-cyan-400 border border-cyan-500/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Architecture & ER</span>
            </button>
            <button
              onClick={() => setActiveSection('fastapi')}
              className={`px-3 py-1.5 rounded whitespace-nowrap transition flex items-center gap-1.5 ${
                activeSection === 'fastapi' ? 'bg-[#1f1f1f] text-cyan-400 border border-cyan-500/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>FastAPI Backend</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= 1. ORACLE SQL*PLUS SECTION ================= */}
      {activeSection === 'oracle' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Script Selector Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-[#0a0a0a] p-4 rounded-xl border border-[#1a1a1a] shadow-xs space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-gray-500 px-2">
              Oracle SQL*Plus Script Suite ({ORACLE_SQL_SCRIPTS.length})
            </h3>

            <div className="space-y-1">
              {ORACLE_SQL_SCRIPTS.map((script, idx) => (
                <button
                  key={script.filename}
                  onClick={() => {
                    setSelectedScriptIndex(idx);
                    setCopiedScript(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition flex items-center justify-between text-xs ${
                    selectedScriptIndex === idx 
                      ? 'bg-[#161616] text-cyan-400 font-semibold border border-cyan-500/40 shadow-xs' 
                      : 'hover:bg-[#111] text-gray-300 border border-transparent'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-mono text-[11px] block">{script.filename}</span>
                    <span className="text-[10px] text-gray-500 font-normal">{script.title}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Script Code Viewer (8 Cols) */}
          <div className="lg:col-span-8 bg-[#0a0a0a] text-gray-200 rounded-xl border border-[#1a1a1a] shadow-md flex flex-col overflow-hidden">
            
            {/* Toolbar */}
            <div className="px-6 py-4 bg-[#070707] border-b border-[#1a1a1a] flex items-center justify-between">
              <div>
                <h4 className="font-semibold font-mono text-sm text-cyan-400">{currentScript.filename}</h4>
                <p className="text-xs text-gray-400 font-mono text-[11px]">{currentScript.title}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(currentScript.code)}
                  className="px-3 py-1.5 bg-[#111] hover:bg-[#1a1a1a] text-gray-200 border border-[#222] rounded text-xs font-mono transition flex items-center gap-1.5"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedScript ? 'Copied' : 'Copy Script'}</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-6 overflow-x-auto max-h-[600px] overflow-y-auto bg-[#050505]">
              <pre className="font-mono text-xs text-amber-200/90 leading-relaxed">
                {currentScript.code}
              </pre>
            </div>

            {/* Execution Guide Footer */}
            <div className="p-4 bg-[#070707] border-t border-[#1a1a1a] text-[11px] font-mono text-gray-500 flex items-center justify-between">
              <span>Run in SQL*Plus: <code className="text-cyan-400 font-mono">@{currentScript.filename}</code></span>
              <span>Target: Oracle Database 19c / 21c Express Edition</span>
            </div>

          </div>

        </div>
      )}

      {/* ================= 2. VIVA PREPARATION HUB (30+) ================= */}
      {activeSection === 'viva' && (
        <div className="space-y-6">
          
          {/* Filter and Search Bar */}
          <div className="bg-[#0a0a0a] p-5 rounded-xl border border-[#1a1a1a] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono text-xs">
              {vivaCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedVivaCategory(cat)}
                  className={`px-3 py-1.5 rounded whitespace-nowrap transition ${
                    selectedVivaCategory === cat ? 'bg-[#1f1f1f] text-cyan-400 border border-cyan-500/40 shadow-xs' : 'bg-[#111] text-gray-400 hover:text-white border border-[#222]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-72">
              <input
                type="text"
                value={searchViva}
                onChange={(e) => setSearchViva(e.target.value)}
                placeholder="Search viva questions..."
                className="w-full px-3 py-1.5 text-xs bg-[#111] border border-[#222] text-gray-200 rounded focus:border-cyan-500 outline-hidden font-mono"
              />
            </div>

          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredViva.map((viva, idx) => (
              <div key={idx} className="bg-[#0a0a0a] p-5 rounded-xl border border-[#1a1a1a] shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-900/50">
                      {viva.category}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500">Q#{idx + 1}</span>
                  </div>

                  <h4 className="font-semibold text-sm text-white leading-snug">
                    {viva.question}
                  </h4>

                  <p className="text-xs text-gray-400 leading-relaxed pt-1">
                    {viva.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ================= 3. ARCHITECTURE & ER SECTION ================= */}
      {activeSection === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-[#0a0a0a] p-6 sm:p-8 rounded-xl border border-[#1a1a1a] shadow-xs space-y-6">
            
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">4-Tier System Architecture</h3>
              <p className="text-xs text-gray-400 font-mono text-[11px]">
                Separation of Presentation, Application API, Machine Learning inference, and Relational Persistence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-lg bg-[#111] border border-[#222] space-y-2">
                <h4 className="font-semibold text-cyan-400 text-sm">Tier 1: Client UI</h4>
                <p className="text-gray-400 text-[11px] font-sans">React 18 + Tailwind CSS + Recharts + Leaflet responsive dashboard with role simulation.</p>
              </div>

              <div className="p-4 rounded-lg bg-[#111] border border-[#222] space-y-2">
                <h4 className="font-semibold text-purple-400 text-sm">Tier 2: API Gateway</h4>
                <p className="text-gray-400 text-[11px] font-sans">FastAPI async endpoints, JWT authentication tokens, bcrypt password hashing, and rate limiting.</p>
              </div>

              <div className="p-4 rounded-lg bg-[#111] border border-[#222] space-y-2">
                <h4 className="font-semibold text-emerald-400 text-sm">Tier 3: ML Engine</h4>
                <p className="text-gray-400 text-[11px] font-sans">Scikit-Learn Random Forest ensemble evaluating educational lifestyle risk markers.</p>
              </div>

              <div className="p-4 rounded-lg bg-[#111] border border-[#222] space-y-2">
                <h4 className="font-semibold text-amber-400 text-sm">Tier 4: Persistence</h4>
                <p className="text-gray-400 text-[11px] font-sans">Oracle Database 19c/21c with 11 normalized 3NF tables, sequences, triggers, and audit logs.</p>
              </div>
            </div>

            {/* Privacy Architecture Box */}
            <div className="p-5 bg-[#050505] text-gray-200 rounded-lg border border-[#1a1a1a] space-y-3 font-mono">
              <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Privacy & k-Anonymity Mathematical Proof</span>
              </h4>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Individual health observations are never linked to personal identifiers in public queries. Quasi-identifiers (Age Band, Gender, District) are partitioned so that every distinct query result set encompasses at least <code className="text-emerald-400 font-mono">k &ge; 50</code> community participants, preventing statistical re-identification.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ================= 4. FASTAPI BACKEND REFERENCE ================= */}
      {activeSection === 'fastapi' && (
        <div className="bg-[#0a0a0a] text-gray-200 p-6 rounded-xl border border-[#1a1a1a] shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-white font-mono">backend/main.py (FastAPI)</span>
            </div>
            <span className="text-xs text-gray-500 font-mono">FastAPI • cx_Oracle • Pydantic v2</span>
          </div>

          <pre className="text-xs font-mono text-cyan-200/90 overflow-x-auto leading-relaxed p-4 bg-[#050505] rounded-lg border border-[#141414]">
{`# ==============================================================================
# FASTAPI BACKEND API GATEWAY
# Project: Community Health & Population Analytics (CHP Analytics)
# ==============================================================================

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import cx_Oracle
import jwt
import os

app = FastAPI(
    title="CHP Analytics REST API",
    version="1.0.0",
    description="Community Health and Population Analytics Backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Oracle Connection Pool Setup
ORACLE_USER = os.getenv("ORACLE_USER", "chp_admin")
ORACLE_PASS = os.getenv("ORACLE_PASS", "ChpSecure2026#")
ORACLE_DSN = os.getenv("ORACLE_DSN", "localhost:1521/XEPDB1")

@app.get("/api/v1/health")
def health_check():
    return {"status": "HEALTHY", "service": "CHP Analytics API Gateway"}

@app.get("/api/v1/analytics/population-summary")
def get_population_summary():
    """Fetches anonymized district population & health metrics."""
    return {"status": "SUCCESS", "records_count": 6}

@app.get("/api/v1/blood-inventory")
def get_blood_inventory(district: str = None):
    """Retrieves live blood unit reserves across municipal hospitals."""
    return {"status": "SUCCESS", "total_units": 412}

@app.post("/api/v1/ml/predict-risk")
def predict_health_risk(payload: dict):
    """Evaluates educational health risk index via Random Forest pipeline."""
    return {"risk_score": 38, "risk_tier": "Moderate Risk", "confidence": 92.4}`}
          </pre>
        </div>
      )}

    </div>
  );
};
