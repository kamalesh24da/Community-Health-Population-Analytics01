import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  Droplets, 
  HeartPulse, 
  ShieldAlert, 
  Filter, 
  Navigation,
  Layers,
  Sparkles,
  Info,
  Search,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  Hospital,
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { DistrictSummary, BloodInventoryItem, BloodDonor } from '../types';
import { TamilNaduInteractiveMap } from './TamilNaduInteractiveMap';
import { TAMIL_NADU_SVG_DISTRICTS } from '../data/tamilNaduMapPaths';

interface AreaMapViewProps {
  districts: DistrictSummary[];
  bloodInventory: BloodInventoryItem[];
  bloodDonors: BloodDonor[];
  onNavigate: (tab: string) => void;
  onSelectDistrictForDashboard?: (districtName: string) => void;
}

export const AreaMapView: React.FC<AreaMapViewProps> = ({
  districts,
  bloodInventory,
  bloodDonors,
  onNavigate,
  onSelectDistrictForDashboard
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictSummary | null>(districts[2] || districts[0]); // Default to CHENNAI or first
  const [mapLayer, setMapLayer] = useState<'vulnerability' | 'blood' | 'density'>('vulnerability');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate State-Wide Tamil Nadu Totals
  const totalStatePopulation = districts.reduce((acc, d) => acc + d.population, 0);
  const totalStateBloodUnits = bloodInventory.reduce((acc, b) => acc + b.availableUnits, 0);
  const totalRegisteredDonors = bloodDonors.length;
  const highRiskDistrictsCount = districts.filter(d => d.vulnerabilityIndex === 'High').length;
  const moderateRiskDistrictsCount = districts.filter(d => d.vulnerabilityIndex === 'Moderate').length;
  const lowRiskDistrictsCount = districts.filter(d => d.vulnerabilityIndex === 'Low').length;

  // Selected district metrics
  const districtBlood = selectedDistrict 
    ? bloodInventory.filter(b => b.district === selectedDistrict.name)
    : [];
  const districtDonors = selectedDistrict 
    ? bloodDonors.filter(d => d.district === selectedDistrict.name)
    : [];

  const districtSvgMeta = selectedDistrict 
    ? TAMIL_NADU_SVG_DISTRICTS.find(d => d.id === selectedDistrict.name.toUpperCase())
    : null;

  // Filtered districts for search
  const filteredDistricts = districts.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.topCondition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & Spatial Layer Selector */}
      <div className="bg-[#0a0a0a] p-5 sm:p-6 rounded-xl border border-[#1a1a1a] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Tamil Nadu State Geographic Health & Resource Map
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">
                  Interactive vector GIS visualization of all 38 districts with real-time public health metrics & hospital reserves.
                </p>
              </div>
            </div>
          </div>

          {/* Layer Controls */}
          <div className="flex items-center gap-1.5 bg-[#111] p-1.5 rounded-lg border border-[#222] font-mono text-xs">
            <span className="text-gray-500 text-[10px] uppercase px-2 hidden sm:inline">Active Layer:</span>
            <button
              id="layer-vulnerability-btn"
              onClick={() => setMapLayer('vulnerability')}
              className={`px-3 py-1 uppercase tracking-wider rounded transition font-semibold ${
                mapLayer === 'vulnerability' 
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Vulnerability
            </button>
            <button
              id="layer-blood-btn"
              onClick={() => setMapLayer('blood')}
              className={`px-3 py-1 uppercase tracking-wider rounded transition font-semibold ${
                mapLayer === 'blood' 
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Blood Reserves
            </button>
            <button
              id="layer-density-btn"
              onClick={() => setMapLayer('density')}
              className={`px-3 py-1 uppercase tracking-wider rounded transition font-semibold ${
                mapLayer === 'density' 
                  ? 'bg-purple-950/80 text-purple-300 border border-purple-800/60' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Population Density
            </button>
          </div>
        </div>

        {/* State Overview Stat Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#141414] font-mono">
          <div className="bg-[#111] p-3 rounded-lg border border-[#1c1c1c] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-gray-500 block">Total State Population</span>
              <span className="text-base font-bold text-white">{(totalStatePopulation / 1000000).toFixed(1)}M</span>
            </div>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="bg-[#111] p-3 rounded-lg border border-[#1c1c1c] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-gray-500 block">Blood Bank Stock</span>
              <span className="text-base font-bold text-rose-400">{totalStateBloodUnits.toLocaleString()} Units</span>
            </div>
            <Droplets className="w-4 h-4 text-rose-500" />
          </div>

          <div className="bg-[#111] p-3 rounded-lg border border-[#1c1c1c] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-gray-500 block">Voluntary Donors</span>
              <span className="text-base font-bold text-emerald-400">{totalRegisteredDonors} Citizens</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="bg-[#111] p-3 rounded-lg border border-[#1c1c1c] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-gray-500 block">High Risk Zones</span>
              <span className="text-base font-bold text-red-400">{highRiskDistrictsCount} of 38</span>
            </div>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map (Left) & District Telemetry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Vector Tamil Nadu Map (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <TamilNaduInteractiveMap
            districts={districts}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            mapLayer={mapLayer}
            bloodInventory={bloodInventory}
            bloodDonors={bloodDonors}
          />

          {/* Quick District Selector & Search Bar */}
          <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#1a1a1a] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-mono uppercase text-gray-300 font-semibold">
                  Quick District Navigator (38 Districts)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedDistrict(null)}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded transition ${
                    !selectedDistrict 
                      ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-700/60' 
                      : 'bg-[#141414] text-gray-400 hover:text-white border border-[#222]'
                  }`}
                >
                  View All Tamil Nadu
                </button>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search district or disease..."
                    className="w-44 sm:w-52 px-3 py-1 bg-[#111] border border-[#222] text-xs text-gray-200 rounded font-mono outline-hidden focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Quick District Chips */}
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
              {filteredDistricts.map((d) => {
                const isSelected = selectedDistrict?.id === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDistrict(d)}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-900 text-white font-bold border border-cyan-400 ring-1 ring-cyan-500 shadow-xs'
                        : 'bg-[#111] text-gray-300 hover:text-white hover:bg-[#181818] border border-[#222]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      d.vulnerabilityIndex === 'High' ? 'bg-rose-500' :
                      d.vulnerabilityIndex === 'Moderate' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}></span>
                    <span>{d.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Deep District Information & Telemetry Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {selectedDistrict ? (
            <div className="bg-[#0a0a0a] p-5 sm:p-6 rounded-xl border border-[#1a1a1a] space-y-5 animate-in fade-in duration-200">
              
              {/* District Title & Header */}
              <div className="space-y-1.5 border-b border-[#1a1a1a] pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                      {districtSvgMeta?.region || 'Tamil Nadu'} Region
                    </span>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      {selectedDistrict.name}
                    </h2>
                  </div>

                  <span className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider font-bold rounded ${
                    selectedDistrict.vulnerabilityIndex === 'Low' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60' :
                    selectedDistrict.vulnerabilityIndex === 'Moderate' ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60' :
                    'bg-rose-950/60 text-rose-400 border border-rose-800/60'
                  }`}>
                    {selectedDistrict.vulnerabilityIndex} Vulnerability
                  </span>
                </div>

                <p className="text-xs font-mono text-gray-400 flex items-center gap-2">
                  <span>Geo: {selectedDistrict.coordinates[0].toFixed(2)}° N, {selectedDistrict.coordinates[1].toFixed(2)}° E</span>
                  <span>•</span>
                  <span>Area: {districtSvgMeta?.areaKm2.toLocaleString() || 'N/A'} km²</span>
                </p>
              </div>

              {/* District Key Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#111] p-3.5 rounded-lg border border-[#1a1a1a] space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">Total Population</span>
                  <p className="text-lg font-bold text-white">{selectedDistrict.population.toLocaleString()}</p>
                  <div className="text-[10px] text-gray-400 flex justify-between pt-1 border-t border-[#1c1c1c]">
                    <span>M: {(selectedDistrict.malePopulation / 1000).toFixed(0)}k</span>
                    <span>F: {(selectedDistrict.femalePopulation / 1000).toFixed(0)}k</span>
                  </div>
                </div>

                <div className="bg-[#111] p-3.5 rounded-lg border border-[#1a1a1a] space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">Prevalence Rate</span>
                  <p className="text-lg font-bold text-rose-400">{selectedDistrict.prevalenceRate} <span className="text-xs text-gray-400 font-normal">/1k</span></p>
                  <div className="text-[10px] text-cyan-400 font-sans truncate pt-1 border-t border-[#1c1c1c]">
                    Top: {selectedDistrict.topCondition}
                  </div>
                </div>
              </div>

              {/* Population Demographic Bar */}
              <div className="bg-[#111] p-3.5 rounded-lg border border-[#1a1a1a] space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">Gender Distribution:</span>
                  <span className="text-gray-200">
                    {((selectedDistrict.malePopulation / selectedDistrict.population) * 100).toFixed(1)}% M / {((selectedDistrict.femalePopulation / selectedDistrict.population) * 100).toFixed(1)}% F
                  </span>
                </div>
                <div className="w-full bg-[#1c1c1c] h-2.5 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-cyan-500 h-full" 
                    style={{ width: `${(selectedDistrict.malePopulation / selectedDistrict.population) * 100}%` }}
                    title="Male Population"
                  ></div>
                  <div 
                    className="bg-purple-500 h-full" 
                    style={{ width: `${(selectedDistrict.femalePopulation / selectedDistrict.population) * 100}%` }}
                    title="Female Population"
                  ></div>
                </div>
              </div>

              {/* District Hospital Blood Inventory */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-rose-400" />
                    <span>Hospital Blood Reserves ({selectedDistrict.totalBloodUnits} Units)</span>
                  </h3>
                  <button
                    onClick={() => onNavigate('blood')}
                    className="text-[11px] font-mono text-rose-400 hover:underline"
                  >
                    Inventory &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {['A+', 'B+', 'O+', 'AB+'].map(group => {
                    const item = districtBlood.find(b => b.bloodGroup === group);
                    const count = item ? item.availableUnits : Math.floor(selectedDistrict.totalBloodUnits / 4);
                    const isCritical = selectedDistrict.criticalBloodGroups.includes(group as any);

                    return (
                      <div 
                        key={group} 
                        className={`p-2.5 rounded-lg border font-mono ${
                          isCritical 
                            ? 'bg-rose-950/40 border-rose-800/60' 
                            : 'bg-[#111] border-[#1c1c1c]'
                        }`}
                      >
                        <span className="font-bold text-rose-400 text-sm block">{group}</span>
                        <p className="text-gray-200 font-bold mt-0.5">{count} u</p>
                        <span className={`text-[9px] uppercase block mt-0.5 ${
                          isCritical ? 'text-red-400 font-bold' : 'text-emerald-400'
                        }`}>
                          {isCritical ? 'Critical' : 'Ready'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Registered Voluntary Donors in District */}
              <div className="space-y-2.5 pt-2 border-t border-[#141414]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Active Donors ({selectedDistrict.registeredDonors} Enrolled)</span>
                  </h3>
                  <button
                    onClick={() => onNavigate('blood')}
                    className="text-[11px] font-mono text-emerald-400 hover:underline"
                  >
                    Enroll &rarr;
                  </button>
                </div>

                {districtDonors.length > 0 ? (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 font-mono text-xs">
                    {districtDonors.map(d => (
                      <div key={d.id} className="flex items-center justify-between p-2 rounded bg-[#111] border border-[#1c1c1c]">
                        <span className="font-bold text-gray-200">{d.donorCode}</span>
                        <span className="font-bold text-rose-400">{d.bloodGroup}</span>
                        <span className="text-gray-400">{d.area}</span>
                        <span className="px-1.5 py-0.5 text-[9px] uppercase bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 rounded">
                          {d.availabilityStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-mono text-gray-500 bg-[#111] p-2.5 rounded border border-[#1c1c1c] text-center">
                    {selectedDistrict.registeredDonors} voluntary citizen donors registered in this district bank.
                  </p>
                )}
              </div>

              {/* Deep Action Buttons */}
              <div className="pt-3 border-t border-[#141414] flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    if (onSelectDistrictForDashboard) {
                      onSelectDistrictForDashboard(selectedDistrict.name);
                    }
                    onNavigate('dashboard');
                  }}
                  className="flex-1 px-4 py-2.5 bg-cyan-700 hover:bg-cyan-600 text-white font-mono text-xs font-semibold rounded-lg transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Open {selectedDistrict.name} in Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('ml')}
                  className="px-3.5 py-2.5 bg-[#141414] hover:bg-[#1a1a1a] text-purple-300 border border-purple-900/40 font-mono text-xs rounded-lg transition flex items-center justify-center gap-1.5"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                  <span>ML Risk Check</span>
                </button>
              </div>

            </div>
          ) : (
            /* State Summary when no single district is selected */
            <div className="bg-[#0a0a0a] p-5 sm:p-6 rounded-xl border border-[#1a1a1a] space-y-5">
              <div className="space-y-1 border-b border-[#1a1a1a] pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  State-Wide Aggregate
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Tamil Nadu Overview
                </h2>
                <p className="text-xs font-mono text-gray-400">
                  Select any of the 38 interactive district sectors on the map to view district-specific records.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="bg-[#111] p-3.5 rounded-lg border border-[#1c1c1c] space-y-1">
                  <span className="text-gray-500 uppercase text-[10px]">District Vulnerability Distribution</span>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex-1 bg-emerald-950/60 border border-emerald-800/60 p-2 rounded text-center">
                      <span className="text-emerald-400 font-bold text-sm">{lowRiskDistrictsCount}</span>
                      <span className="text-[9px] text-gray-400 block">Low Risk</span>
                    </div>
                    <div className="flex-1 bg-amber-950/60 border border-amber-800/60 p-2 rounded text-center">
                      <span className="text-amber-400 font-bold text-sm">{moderateRiskDistrictsCount}</span>
                      <span className="text-[9px] text-gray-400 block">Moderate</span>
                    </div>
                    <div className="flex-1 bg-rose-950/60 border border-rose-800/60 p-2 rounded text-center">
                      <span className="text-rose-400 font-bold text-sm">{highRiskDistrictsCount}</span>
                      <span className="text-[9px] text-gray-400 block">High Priority</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111] p-3.5 rounded-lg border border-[#1c1c1c] space-y-2">
                  <span className="text-gray-500 uppercase text-[10px]">Most Frequent Chronic Conditions</span>
                  <div className="space-y-1.5 pt-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Type 2 Diabetes Mellitus</span>
                      <span className="text-cyan-400 font-bold">12 Districts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Essential Hypertension</span>
                      <span className="text-cyan-400 font-bold">9 Districts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Iron Deficiency Anaemia</span>
                      <span className="text-cyan-400 font-bold">8 Districts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Bronchial Asthma</span>
                      <span className="text-cyan-400 font-bold">5 Districts</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedDistrict(districts[2] || districts[0])}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs font-semibold rounded-lg transition"
                >
                  Inspect Capital District (Chennai)
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
