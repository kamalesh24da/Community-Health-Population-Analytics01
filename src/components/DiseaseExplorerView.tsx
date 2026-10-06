import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  AlertTriangle, 
  ExternalLink, 
  ShieldAlert, 
  HeartHandshake, 
  CheckCircle2, 
  Stethoscope,
  X,
  Sparkles
} from 'lucide-react';
import { Disease } from '../types';

interface DiseaseExplorerViewProps {
  diseases: Disease[];
}

export const DiseaseExplorerView: React.FC<DiseaseExplorerViewProps> = ({ diseases }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalDisease, setActiveModalDisease] = useState<Disease | null>(null);

  const categories = ['All', 'Non-Communicable', 'Communicable', 'Vector-Borne', 'Nutritional', 'Chronic'];

  const filteredDiseases = diseases.filter(d => {
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      d.name.toLowerCase().includes(term) ||
      d.description.toLowerCase().includes(term) ||
      d.commonSymptoms.some(s => s.toLowerCase().includes(term)) ||
      d.commonRiskFactors.some(r => r.toLowerCase().includes(term)) ||
      d.preventivePractices.some(p => p.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-[#0a0a0a] p-5 sm:p-6 border border-[#1a1a1a] rounded-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#111] border border-cyan-900/40 text-cyan-400 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Disease Information & Prevention Directory
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Evidence-based health knowledge synthesized from the World Health Organization (WHO), ICMR, and MoHFW.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded bg-[#111] text-gray-300 border border-[#222]">
              {filteredDiseases.length} Factsheets
            </span>
          </div>
        </div>

        {/* Mandatory Non-Diagnostic Disclaimer */}
        <div className="p-3 bg-amber-950/20 border border-amber-900/40 rounded text-amber-300 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-amber-200 text-[11px] uppercase tracking-wider font-mono">Important Medical Notice</p>
            <p className="text-[11px] text-amber-300/90 leading-relaxed font-sans">
              This information is for educational and community awareness purposes only and does not replace professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified physician with any questions.
            </p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
            <input
              id="disease-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search diseases, symptoms, or risks..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#111] text-gray-200 border border-[#222] rounded focus:border-cyan-500 outline-hidden transition font-mono placeholder:text-gray-600"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0 scrollbar-none font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs uppercase tracking-wider rounded whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#1f1f1f] text-cyan-300 font-bold border border-cyan-800/60'
                    : 'bg-[#111] text-gray-400 hover:text-white border border-[#222]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDiseases.map((disease) => (
          <div
            key={disease.id}
            className="bg-[#0a0a0a] border border-[#1a1a1a] hover:border-cyan-900/50 transition flex flex-col justify-between"
          >
            <div className="p-5 space-y-3">
              
              <div className="flex items-start justify-between gap-2">
                <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider font-bold rounded ${
                  disease.category === 'Non-Communicable' ? 'bg-blue-950/40 text-blue-400 border border-blue-900/50' :
                  disease.category === 'Communicable' ? 'bg-red-950/40 text-red-400 border border-red-900/50' :
                  disease.category === 'Vector-Borne' ? 'bg-amber-950/40 text-amber-400 border border-amber-900/50' :
                  disease.category === 'Nutritional' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/50' :
                  'bg-purple-950/40 text-purple-400 border border-purple-900/50'
                }`}>
                  {disease.category}
                </span>

                <span className="text-[10px] font-mono text-gray-500">
                  Idx: {disease.prevalenceIndex}/100
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white">{disease.name}</h3>
                <p className="text-xs text-gray-400 line-clamp-3 mt-1 leading-relaxed">
                  {disease.description}
                </p>
              </div>

              {/* Symptoms Preview */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[9px] font-mono uppercase tracking-wider text-amber-400/90 flex items-center gap-1">
                  <Stethoscope className="w-3 h-3 text-amber-400" />
                  Recognized Symptoms:
                </p>
                <div className="flex flex-wrap gap-1">
                  {disease.commonSymptoms.slice(0, 3).map((sym, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 bg-[#111] border border-[#222] text-gray-300 text-[10px] font-mono rounded">
                      {sym}
                    </span>
                  ))}
                  {disease.commonSymptoms.length > 3 && (
                    <span className="px-1.5 py-0.5 bg-[#111] text-gray-500 text-[10px] font-mono rounded">
                      +{disease.commonSymptoms.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Risk Factors Snippet */}
              <div className="space-y-1 pt-0.5">
                <p className="text-[9px] font-mono uppercase tracking-wider text-rose-400/90 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-rose-400" />
                  Key Risk Factors:
                </p>
                <p className="text-[11px] text-gray-400 line-clamp-1 italic">
                  {disease.commonRiskFactors.slice(0, 2).join(' • ')}
                </p>
              </div>

              {/* Prevention Snippet */}
              <div className="space-y-1 pt-0.5">
                <p className="text-[9px] font-mono uppercase tracking-wider text-emerald-400/90 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Evidence-Based Prevention:
                </p>
                <p className="text-[11px] text-gray-400 line-clamp-1">
                  {disease.preventivePractices[0]}
                </p>
              </div>

            </div>

            {/* Bottom Footer */}
            <div className="px-5 py-3 bg-[#070707] border-t border-[#141414] flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-500 truncate max-w-[170px]" title={disease.reliableSource}>
                {disease.reliableSource.split('&')[0]}
              </span>

              <button
                onClick={() => setActiveModalDisease(disease)}
                className="text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Factsheet</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="text-center py-16 bg-[#0a0a0a] border border-[#1a1a1a] p-8 space-y-2">
          <BookOpen className="w-8 h-8 text-gray-600 mx-auto" />
          <h4 className="text-sm font-semibold text-white">No diseases matching your query</h4>
          <p className="text-xs text-gray-500">
            Try adjusting your search terms or selecting a different category filter.
          </p>
        </div>
      )}

      {/* Full Disease Factsheet Modal */}
      {activeModalDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-xl border border-[#222] overflow-hidden max-h-[88vh] flex flex-col shadow-2xl">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#1a1a1a] bg-[#070707] flex items-center justify-between">
              <div className="space-y-1">
                <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded bg-[#111] text-cyan-400 border border-cyan-900/40">
                  {activeModalDisease.category}
                </span>
                <h3 className="text-lg font-semibold text-white">{activeModalDisease.name}</h3>
              </div>
              <button
                onClick={() => setActiveModalDisease(null)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1f1f1f] rounded transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-gray-300 leading-relaxed">
              
              {/* Overview */}
              <div className="space-y-1.5">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Clinical Overview</h4>
                <p className="text-gray-200 text-sm leading-relaxed">{activeModalDisease.description}</p>
              </div>

              {/* Risk Factors & Symptoms 2-Col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#0e0a0a] border border-rose-950/60 p-4 rounded space-y-2">
                  <h5 className="font-semibold text-rose-300 text-xs flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    Common Risk Factors
                  </h5>
                  <ul className="space-y-1 text-gray-300 list-disc list-inside">
                    {activeModalDisease.commonRiskFactors.map((rf, i) => (
                      <li key={i}>{rf}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0e0c08] border border-amber-950/60 p-4 rounded space-y-2">
                  <h5 className="font-semibold text-amber-300 text-xs flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-amber-400" />
                    Recognized Symptoms
                  </h5>
                  <ul className="space-y-1 text-gray-300 list-disc list-inside">
                    {activeModalDisease.commonSymptoms.map((sym, i) => (
                      <li key={i}>{sym}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Prevention & Healthy Practices */}
              <div className="bg-[#080e0a] border border-emerald-950/60 p-4 rounded space-y-2">
                <h5 className="font-semibold text-emerald-300 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Evidence-Based Prevention & Healthy Practices
                </h5>
                <ul className="space-y-1 text-gray-300 list-disc list-inside">
                  {activeModalDisease.preventivePractices.map((prev, i) => (
                    <li key={i}>{prev}</li>
                  ))}
                </ul>
              </div>

              {/* When to Seek Medical Care */}
              <div className="bg-[#080b0e] border border-cyan-950/60 p-4 rounded space-y-1.5">
                <h5 className="font-semibold text-cyan-300 text-xs flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-cyan-400" />
                  When Professional Medical Care May Be Appropriate
                </h5>
                <p className="text-gray-300">{activeModalDisease.whenToSeekCare}</p>
              </div>

              {/* Source Reference */}
              <div className="pt-2 border-t border-[#1a1a1a] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-gray-500">
                <span>Reliable Source: <strong className="text-gray-300">{activeModalDisease.reliableSource}</strong></span>
                <a
                  href={activeModalDisease.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-semibold"
                >
                  <span>Official Health Guideline</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-[#070707] border-t border-[#1a1a1a] flex justify-end">
              <button
                onClick={() => setActiveModalDisease(null)}
                className="px-4 py-1.5 bg-[#111] hover:bg-[#1a1a1a] border border-[#262626] text-gray-300 text-xs font-mono uppercase tracking-wider rounded transition"
              >
                Close Factsheet
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
