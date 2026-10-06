import React, { useState } from 'react';
import { 
  TAMIL_NADU_SVG_DISTRICTS, 
  DistrictSvgData 
} from '../data/tamilNaduMapPaths';
import { DistrictSummary, BloodInventoryItem, BloodDonor } from '../types';
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  Layers, 
  MapPin, 
  Droplets, 
  HeartPulse, 
  Users, 
  Sparkles,
  Info
} from 'lucide-react';

interface TamilNaduInteractiveMapProps {
  districts: DistrictSummary[];
  selectedDistrict: DistrictSummary | null;
  onSelectDistrict: (district: DistrictSummary | null) => void;
  mapLayer: 'vulnerability' | 'blood' | 'density';
  bloodInventory: BloodInventoryItem[];
  bloodDonors: BloodDonor[];
}

export const TamilNaduInteractiveMap: React.FC<TamilNaduInteractiveMapProps> = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
  mapLayer,
  bloodInventory,
  bloodDonors
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictSummary | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  // Match district data
  const getDistrictData = (id: string): DistrictSummary | undefined => {
    const norm = id.toUpperCase().trim();
    return districts.find(d => d.name.toUpperCase() === norm);
  };

  // Get color for district based on active layer
  const getDistrictColor = (district: DistrictSummary | undefined, isSelected: boolean, isHovered: boolean) => {
    if (!district) return '#1a1a1a';

    if (mapLayer === 'vulnerability') {
      if (district.vulnerabilityIndex === 'High') {
        if (isSelected) return '#f43f5e'; // rose-500
        if (isHovered) return '#e11d48';  // rose-600
        return '#881337'; // rose-900
      }
      if (district.vulnerabilityIndex === 'Moderate') {
        if (isSelected) return '#f59e0b'; // amber-500
        if (isHovered) return '#d97706';  // amber-600
        return '#78350f'; // amber-900
      }
      // Low
      if (isSelected) return '#10b981'; // emerald-500
      if (isHovered) return '#059669';  // emerald-600
      return '#064e3b'; // emerald-900
    }

    if (mapLayer === 'blood') {
      if (district.totalBloodUnits < 200) {
        if (isSelected) return '#f43f5e';
        if (isHovered) return '#e11d48';
        return '#881337';
      }
      if (district.totalBloodUnits < 400) {
        if (isSelected) return '#38bdf8'; // sky-400
        if (isHovered) return '#0284c7';  // sky-600
        return '#0c4a6e'; // sky-900
      }
      // High
      if (isSelected) return '#06b6d4'; // cyan-500
      if (isHovered) return '#0891b2';  // cyan-600
      return '#164e63'; // cyan-900
    }

    if (mapLayer === 'density') {
      // Population density
      if (district.population > 3000000) {
        if (isSelected) return '#a855f7'; // purple-500
        if (isHovered) return '#9333ea';
        return '#581c87';
      }
      if (district.population > 1500000) {
        if (isSelected) return '#6366f1'; // indigo-500
        if (isHovered) return '#4f46e5';
        return '#312e81';
      }
      // Smaller population
      if (isSelected) return '#3b82f6'; // blue-500
      if (isHovered) return '#2563eb';
      return '#1e3a8a';
    }

    return '#262626';
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement>, district: DistrictSummary) => {
    const rect = e.currentTarget.closest('svg')?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    setHoveredDistrict(district);
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    onSelectDistrict(null);
    setSelectedRegion('All');
  };

  const regions = ['All', 'Northern', 'Western', 'Central', 'Southern', 'Coastal / Delta'];

  return (
    <div className="relative bg-[#070707] border border-[#1a1a1a] rounded-xl p-4 sm:p-5 flex flex-col items-center select-none overflow-hidden">
      
      {/* Top Map Toolbar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#141414] z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="font-mono text-xs font-bold text-gray-200 uppercase tracking-wider">
            Interactive Vector Map
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
            38 Districts Loaded
          </span>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
          <span className="text-gray-500 text-[10px] uppercase mr-1 hidden sm:inline">Region:</span>
          {regions.map(reg => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-2 py-0.5 rounded transition ${
                selectedRegion === reg
                  ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-700/50'
                  : 'bg-[#111] text-gray-400 hover:text-gray-200 border border-[#222]'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Map View Controls */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2.2))}
            className="p-1.5 bg-[#111] hover:bg-[#1a1a1a] border border-[#222] text-gray-300 rounded"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            className="p-1.5 bg-[#111] hover:bg-[#1a1a1a] border border-[#222] text-gray-300 rounded"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1 bg-[#111] hover:bg-[#1a1a1a] border border-[#222] text-gray-300 rounded text-[11px]"
            title="Reset Map State"
          >
            <RotateCcw className="w-3 h-3 text-cyan-400" />
            <span>Reset Map</span>
          </button>
        </div>
      </div>

      {/* Main Vector SVG Stage */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[6/7] max-w-[650px] mx-auto my-2 flex items-center justify-center">
        <svg
          viewBox="0 0 700 860"
          className="w-full h-full cursor-pointer transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`
          }}
        >
          <defs>
            {/* Filter Glow Effects */}
            <filter id="glow-selected" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22d3ee" floodOpacity="0.8" />
            </filter>
            <filter id="glow-hover" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.4" />
            </filter>

            {/* Subtle Grid Background */}
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#121212" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect width="700" height="860" fill="url(#grid-pattern)" />

          {/* Bay of Bengal & Arabian Sea decorative labels */}
          <text x="610" y="550" fill="#222" fontSize="13" fontFamily="monospace" letterSpacing="4" transform="rotate(75, 610, 550)">
            BAY OF BENGAL
          </text>
          <text x="50" y="600" fill="#222" fontSize="12" fontFamily="monospace" letterSpacing="3" transform="rotate(-65, 50, 600)">
            ARABIAN SEA
          </text>
          <text x="180" y="850" fill="#222" fontSize="12" fontFamily="monospace" letterSpacing="3">
            INDIAN OCEAN
          </text>

          {/* District Vector Paths */}
          <g id="tamil-nadu-districts-group">
            {TAMIL_NADU_SVG_DISTRICTS.map((districtSvg) => {
              const districtData = getDistrictData(districtSvg.id);
              const isSelected = selectedDistrict?.name.toUpperCase() === districtSvg.id;
              const isHovered = hoveredDistrict?.name.toUpperCase() === districtSvg.id;
              const isRegionFiltered = selectedRegion !== 'All' && districtSvg.region !== selectedRegion;

              const fillColor = getDistrictColor(districtData, isSelected, isHovered);

              return (
                <g
                  key={districtSvg.id}
                  onClick={() => {
                    if (districtData) {
                      onSelectDistrict(isSelected ? null : districtData);
                    }
                  }}
                  onMouseEnter={(e) => districtData && handleMouseMove(e, districtData)}
                  onMouseMove={(e) => districtData && handleMouseMove(e, districtData)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    opacity: isRegionFiltered ? 0.25 : 1
                  }}
                >
                  {/* District Boundary Path */}
                  <path
                    d={districtSvg.path}
                    fill={fillColor}
                    stroke={isSelected ? '#22d3ee' : isHovered ? '#ffffff' : '#050505'}
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 1.2}
                    filter={isSelected ? 'url(#glow-selected)' : isHovered ? 'url(#glow-hover)' : undefined}
                    className="transition-colors duration-150"
                  />

                  {/* Centroid Pin Point */}
                  <circle
                    cx={districtSvg.center[0]}
                    cy={districtSvg.center[1]}
                    r={isSelected ? 4.5 : isHovered ? 3.5 : 2}
                    fill={isSelected ? '#ffffff' : '#94a3b8'}
                    stroke="#000000"
                    strokeWidth="1"
                  />

                  {/* District Text Label */}
                  <text
                    x={districtSvg.center[0]}
                    y={districtSvg.center[1] + 12}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : isHovered ? '#e2e8f0' : '#cbd5e1'}
                    fontSize={isSelected ? '11px' : '9px'}
                    fontWeight={isSelected ? 'bold' : '500'}
                    fontFamily="monospace"
                    className="pointer-events-none drop-shadow-md select-none"
                  >
                    {districtSvg.name}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Scale Indicator */}
          <g transform="translate(40, 800)">
            <line x1="0" y1="0" x2="60" y2="0" stroke="#555" strokeWidth="2" />
            <line x1="0" y1="-4" x2="0" y2="4" stroke="#555" strokeWidth="2" />
            <line x1="60" y1="-4" x2="60" y2="4" stroke="#555" strokeWidth="2" />
            <text x="30" y="14" textAnchor="middle" fill="#666" fontSize="9" fontFamily="monospace">
              ~ 100 KM
            </text>
          </g>
        </svg>

        {/* Floating Tooltip */}
        {hoveredDistrict && (
          <div
            className="absolute pointer-events-none z-30 bg-[#0d0d0d]/95 backdrop-blur-md border border-cyan-800/60 rounded-lg p-3 text-xs shadow-2xl text-white font-mono space-y-1 animate-in fade-in zoom-in-95 duration-100 min-w-[200px]"
            style={{
              left: `${Math.min(Math.max(tooltipPos.x + 12, 10), 380)}px`,
              top: `${Math.min(Math.max(tooltipPos.y + 12, 10), 520)}px`
            }}
          >
            <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
              <span className="font-bold text-cyan-300 text-sm">{hoveredDistrict.name}</span>
              <span className={`px-1.5 py-0.5 text-[9px] rounded uppercase font-bold ${
                hoveredDistrict.vulnerabilityIndex === 'High' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                hoveredDistrict.vulnerabilityIndex === 'Moderate' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {hoveredDistrict.vulnerabilityIndex}
              </span>
            </div>
            
            <div className="text-[11px] text-gray-300 space-y-1 pt-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Population:</span>
                <span className="font-bold text-white">{(hoveredDistrict.population / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Top Issue:</span>
                <span className="text-cyan-400 font-sans truncate max-w-[120px]">{hoveredDistrict.topCondition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Blood Units:</span>
                <span className="text-rose-400 font-bold">{hoveredDistrict.totalBloodUnits} u</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Donors:</span>
                <span className="text-emerald-400 font-bold">{hoveredDistrict.registeredDonors}</span>
              </div>
            </div>

            <p className="text-[9px] text-gray-500 pt-1 text-center border-t border-[#1a1a1a]">
              Click to inspect detailed telemetry
            </p>
          </div>
        )}
      </div>

      {/* Interactive Map Legend Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#141414] text-xs font-mono text-gray-400 z-10">
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase text-gray-500">Legend ({mapLayer}):</span>
          {mapLayer === 'vulnerability' && (
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-[#064e3b] border border-emerald-500"></span> Low Risk
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-[#78350f] border border-amber-500"></span> Moderate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-[#881337] border border-rose-500"></span> High Priority
              </span>
            </div>
          )}

          {mapLayer === 'blood' && (
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-[#881337] border border-rose-500"></span> Critical (&lt;200u)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-[#0c4a6e] border border-sky-500"></span> Moderate (200-400u)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-[#164e63] border border-cyan-500"></span> High Stock (&gt;400u)
              </span>
            </div>
          )}

          {mapLayer === 'density' && (
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-[#1e3a8a]"></span> &lt; 1.5M
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-[#312e81]"></span> 1.5M - 3M
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-[#581c87]"></span> &gt; 3M Metro
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-[10px] text-gray-500">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Touch or click any district to reveal analytics & hospital blood reserves</span>
        </div>
      </div>

    </div>
  );
};
