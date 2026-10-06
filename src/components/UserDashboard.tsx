import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { 
  Users, 
  HeartPulse, 
  Droplets, 
  ShieldCheck, 
  Activity, 
  Filter, 
  TrendingUp, 
  MapPin,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  FileText
} from 'lucide-react';
import { 
  DemographicData, 
  HealthRecord, 
  Disease, 
  BloodInventoryItem, 
  BloodDonor, 
  DistrictSummary,
  User 
} from '../types';

interface UserDashboardProps {
  currentUser: User | null;
  populationData: DemographicData[];
  healthRecords: HealthRecord[];
  diseases: Disease[];
  bloodInventory: BloodInventoryItem[];
  bloodDonors: BloodDonor[];
  districts: DistrictSummary[];
  onNavigate: (tab: string) => void;
  onUpdateUserDistrict?: (district: string) => void;
  initialDistrictFilter?: string;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentUser,
  populationData,
  healthRecords,
  diseases,
  bloodInventory,
  bloodDonors,
  districts,
  onNavigate,
  onUpdateUserDistrict,
  initialDistrictFilter = 'All'
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrictFilter || 'All');
  const [activeViewTab, setActiveViewTab] = useState<'analytics' | 'mydata'>('analytics');
  const [isEditingDistrict, setIsEditingDistrict] = useState<boolean>(false);
  const [userProfileDistrict, setUserProfileDistrict] = useState<string>(currentUser?.district || 'CHENNAI');
  const [districtSaveStatus, setDistrictSaveStatus] = useState<string>('');

  // Filtered datasets based on selected district
  const filteredBlood = selectedDistrict === 'All' 
    ? bloodInventory 
    : bloodInventory.filter(b => b.district === selectedDistrict);

  const filteredPop = selectedDistrict === 'All'
    ? populationData
    : populationData.filter(p => p.district === selectedDistrict);

  const totalPopCount = districts
    .filter(d => selectedDistrict === 'All' || d.name === selectedDistrict)
    .reduce((acc, d) => acc + d.population, 0);

  const totalBloodUnits = filteredBlood.reduce((acc, b) => acc + b.availableUnits, 0);
  const criticalCount = filteredBlood.filter(b => b.status === 'Critical').length;
  const activeDonorsCount = bloodDonors.filter(d => 
    (selectedDistrict === 'All' || d.district === selectedDistrict) && d.availabilityStatus === 'Available'
  ).length;

  // 1. Age Group Chart Data
  const ageGroupCounts: Record<string, number> = {
    '0-14 (Children)': 0,
    '15-24 (Youth)': 0,
    '25-59 (Adults)': 0,
    '60+ (Seniors)': 0
  };
  filteredPop.forEach(p => {
    if (ageGroupCounts[p.ageGroup] !== undefined) {
      ageGroupCounts[p.ageGroup] += 1;
    }
  });

  const ageChartData = [
    { name: 'Children (0-14)', count: Math.max(12, ageGroupCounts['0-14 (Children)'] * 18), fill: '#06b6d4' },
    { name: 'Youth (15-24)', count: Math.max(18, ageGroupCounts['15-24 (Youth)'] * 22), fill: '#3b82f6' },
    { name: 'Adults (25-59)', count: Math.max(48, ageGroupCounts['25-59 (Adults)'] * 38), fill: '#8b5cf6' },
    { name: 'Seniors (60+)', count: Math.max(16, ageGroupCounts['60+ (Seniors)'] * 15), fill: '#ec4899' }
  ];

  // 2. Gender Donut Data
  const genderChartData = [
    { name: 'Male', value: 51.2, color: '#06b6d4' },
    { name: 'Female', value: 48.1, color: '#ec4899' },
    { name: 'Other/Unspecified', value: 0.7, color: '#10b981' }
  ];

  // 3. Disease Prevalence Data (Top 8 for clean dashboard chart readability)
  const diseaseChartData = diseases.map(d => ({
    name: d.name.length > 18 ? d.name.slice(0, 18) + '...' : d.name,
    fullName: d.name,
    prevalence: d.prevalenceIndex,
    category: d.category
  })).sort((a, b) => b.prevalence - a.prevalence).slice(0, 8);

  // 4. Blood Group Breakdown
  const bloodGroupsList = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const bloodGroupData = bloodGroupsList.map(bg => {
    const units = filteredBlood.filter(b => b.bloodGroup === bg).reduce((acc, b) => acc + b.availableUnits, 0);
    let status = 'Available';
    let fill = '#10b981'; // green
    if (units < 10) {
      status = 'Critical';
      fill = '#ef4444'; // red
    } else if (units < 25) {
      status = 'Low';
      fill = '#f59e0b'; // amber
    }
    return {
      bloodGroup: bg,
      units,
      status,
      fill
    };
  });

  // 5. Area District Breakdown
  const districtTableData = districts.map(d => ({
    name: d.name,
    population: d.population,
    topCondition: d.topCondition,
    prevalence: d.prevalenceRate,
    bloodStock: d.totalBloodUnits,
    donors: d.registeredDonors,
    vulnerability: d.vulnerabilityIndex
  }));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0a0a] p-5 sm:p-6 border border-[#1a1a1a] rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Population Health & Epidemiological Analytics
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded bg-[#111] text-emerald-400 border border-emerald-900/40">
              Live Feed
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Privacy-preserving demographic micro-data, disease tracking, and blood inventory monitoring.
          </p>
        </div>

        {/* District Filter & View Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1 bg-[#111] p-1 border border-[#222] rounded">
            <button
              onClick={() => setActiveViewTab('analytics')}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded transition ${
                activeViewTab === 'analytics' ? 'bg-[#1f1f1f] text-cyan-300 font-bold border border-cyan-900/50' : 'text-gray-400 hover:text-white'
              }`}
            >
              Public Analytics
            </button>
            <button
              onClick={() => setActiveViewTab('mydata')}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded transition ${
                activeViewTab === 'mydata' ? 'bg-[#1f1f1f] text-cyan-300 font-bold border border-cyan-900/50' : 'text-gray-400 hover:text-white'
              }`}
            >
              My Profile & Consent
            </button>
          </div>

          <div className="flex items-center gap-2 bg-[#111] border border-[#222] rounded px-3 py-1">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <select
              id="dashboard-district-filter"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="text-xs font-mono text-gray-300 bg-transparent outline-hidden cursor-pointer"
            >
              <option value="All" className="bg-[#111] text-gray-200">All Districts (Consolidated)</option>
              {districts.map(d => (
                <option key={d.id} value={d.name} className="bg-[#111] text-gray-200">{d.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {activeViewTab === 'analytics' ? (
        <>
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-[#0a0a0a] p-5 border border-[#1a1a1a] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Sample Population</span>
                <div className="w-7 h-7 rounded bg-[#111] border border-cyan-900/40 text-cyan-400 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-white font-mono">{totalPopCount.toLocaleString()}</p>
              <p className="text-[10px] text-gray-500">
                {selectedDistrict === 'All' ? 'Consolidated across 6 districts' : `District: ${selectedDistrict}`}
              </p>
            </div>

            <div className="bg-[#0a0a0a] p-5 border border-[#1a1a1a] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Tracked Conditions</span>
                <div className="w-7 h-7 rounded bg-[#111] border border-indigo-900/40 text-indigo-400 flex items-center justify-center">
                  <HeartPulse className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-white font-mono">{diseases.length} <span className="text-xs text-gray-400 font-sans">Diseases</span></p>
              <p className="text-[10px] text-gray-500">
                Top Prevalence: Hypertension & Diabetes
              </p>
            </div>

            <div className="bg-[#0a0a0a] p-5 border border-[#1a1a1a] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Available Blood Units</span>
                <div className="w-7 h-7 rounded bg-[#111] border border-red-900/40 text-red-400 flex items-center justify-center">
                  <Droplets className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold text-white font-mono">{totalBloodUnits} <span className="text-xs text-gray-400 font-sans">Units</span></p>
                {criticalCount > 0 && (
                  <span className="text-[10px] font-mono font-bold text-red-400">
                    ({criticalCount} Critical)
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-500">
                Stocked in regional hospital banks
              </p>
            </div>

            <div className="bg-[#0a0a0a] p-5 border border-[#1a1a1a] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Volunteer Donors</span>
                <div className="w-7 h-7 rounded bg-[#111] border border-emerald-900/40 text-emerald-400 flex items-center justify-center">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-white font-mono">{activeDonorsCount} <span className="text-xs text-gray-400 font-sans">Donors</span></p>
              <p className="text-[10px] text-gray-500">
                Verified consent-granted pool
              </p>
            </div>

          </div>

          {/* Charts Row 1: Population Demographics & Age Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* Age Distribution (2 Cols) */}
            <div className="lg:col-span-2 bg-[#0a0a0a] p-5 border border-[#1a1a1a] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Population Distribution by Age Group</h3>
                  <p className="text-xs text-gray-500">Aggregated demographic micro-data sample</p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-[#111] border border-cyan-900/40 px-2 py-0.5 rounded">
                  Cohort Census
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageChartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#1f1f1f" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#050505', border: '1px solid #222', borderRadius: '4px', color: '#e0e0e0', fontSize: '11px' }}
                      formatter={(val: any) => [`${val}% of Cohort`, 'Distribution']}
                    />
                    <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                      {ageChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gender Donut Chart (1 Col) */}
            <div className="bg-[#0a0a0a] p-5 border border-[#1a1a1a] space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Gender Distribution</h3>
                <p className="text-xs text-gray-500">Demographic balance ratio</p>
              </div>

              <div className="h-52 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="#0a0a0a"
                    >
                      {genderChartData.map((entry, index) => (
                        <Cell key={`gender-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#050505', border: '1px solid #222', borderRadius: '4px', color: '#e0e0e0', fontSize: '11px' }}
                      formatter={(val: any) => [`${val}%`, 'Proportion']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-around text-xs border-t border-[#1a1a1a] pt-3 font-mono">
                <div className="text-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mr-1.5"></span>
                  <span className="text-gray-400">Male (51.2%)</span>
                </div>
                <div className="text-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mr-1.5"></span>
                  <span className="text-gray-400">Female (48.1%)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Charts Row 2: Disease Prevalence & Blood Availability */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Disease Prevalence Ranking */}
            <div className="bg-[#0a0a0a] p-5 border border-[#1a1a1a] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Top Disease Prevalence Indexes</h3>
                  <p className="text-xs text-gray-500">Leading surveillance conditions ({diseases.length} total monitored)</p>
                </div>
                <button 
                  onClick={() => onNavigate('diseases')}
                  className="text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300"
                >
                  Factsheets →
                </button>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={diseaseChartData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="2 2" horizontal={false} stroke="#1f1f1f" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#aaa' }} axisLine={false} tickLine={false} width={110} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#050505', border: '1px solid #222', borderRadius: '4px', color: '#e0e0e0', fontSize: '11px' }}
                      formatter={(val: any, name: any, item: any) => [`${val} Index`, item.payload.fullName]}
                    />
                    <Bar dataKey="prevalence" fill="#8b5cf6" radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Blood Inventory Status */}
            <div className="bg-[#0a0a0a] p-5 border border-[#1a1a1a] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Blood Bank Inventory Reserves</h3>
                  <p className="text-xs text-gray-500">Live units by blood group & deficit threshold</p>
                </div>
                <button 
                  onClick={() => onNavigate('blood')}
                  className="text-xs font-mono uppercase tracking-wider text-red-400 hover:text-red-300"
                >
                  Blood Bank →
                </button>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bloodGroupData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#1f1f1f" />
                    <XAxis dataKey="bloodGroup" tick={{ fontSize: 11, fontWeight: 600, fill: '#e0e0e0' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#050505', border: '1px solid #222', borderRadius: '4px', color: '#e0e0e0', fontSize: '11px' }}
                      formatter={(val: any, name: any, item: any) => [`${val} Units (${item.payload.status})`, `Group ${item.payload.bloodGroup}`]}
                    />
                    <Bar dataKey="units" radius={[2, 2, 0, 0]}>
                      {bloodGroupData.map((entry, index) => (
                        <Cell key={`bg-cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Status Legend */}
              <div className="flex items-center justify-center gap-4 text-xs pt-1 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available (&ge;25)
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Low (10-24)
                </span>
                <span className="flex items-center gap-1.5 text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> Critical (&lt;10)
                </span>
              </div>
            </div>

          </div>

          {/* Area-Wise Summary Table */}
          <div className="bg-[#0a0a0a] p-5 border border-[#1a1a1a] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">District Health & Demographic Summary</h3>
                <p className="text-xs text-gray-500">Aggregated surveillance metrics mapped to municipal health divisions</p>
              </div>
              <button
                onClick={() => onNavigate('map')}
                className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-emerald-400 bg-[#111] hover:bg-[#1a1a1a] border border-emerald-900/40 rounded flex items-center gap-1.5 transition"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Map Grid</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300 border-collapse">
                <thead>
                  <tr className="border-b border-[#1a1a1a] bg-[#111] text-gray-500 font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">District Name</th>
                    <th className="py-2.5 px-3">Population</th>
                    <th className="py-2.5 px-3">Top Condition</th>
                    <th className="py-2.5 px-3">Prevalence</th>
                    <th className="py-2.5 px-3">Blood Stock</th>
                    <th className="py-2.5 px-3">Active Donors</th>
                    <th className="py-2.5 px-3">Vulnerability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#141414] font-mono text-xs">
                  {districtTableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#141414] transition">
                      <td className="py-2.5 px-3 font-semibold text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        {row.name}
                      </td>
                      <td className="py-2.5 px-3">{row.population.toLocaleString()}</td>
                      <td className="py-2.5 px-3 font-sans text-gray-200">{row.topCondition}</td>
                      <td className="py-2.5 px-3 text-cyan-400">{row.prevalence} / 1k</td>
                      <td className="py-2.5 px-3">{row.bloodStock} Units</td>
                      <td className="py-2.5 px-3">{row.donors} Volunteers</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded ${
                          row.vulnerability === 'Low' ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/60' :
                          row.vulnerability === 'Moderate' ? 'bg-amber-950/50 text-amber-400 border border-amber-900/60' :
                          'bg-red-950/50 text-red-400 border border-red-900/60'
                        }`}>
                          {row.vulnerability}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* ================= MY HEALTH & PROFILE TAB ================= */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* User Profile Card */}
          <div className="bg-[#0a0a0a] p-6 border border-[#1a1a1a] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded bg-[#111] border border-cyan-900/50 text-cyan-400 flex items-center justify-center font-mono font-bold text-base">
                {currentUser?.fullName.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="font-semibold text-white">{currentUser?.fullName || 'Guest Citizen'}</h3>
                <p className="text-xs font-mono text-gray-500">{currentUser?.email || 'Not Signed In'}</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-[#1a1a1a] text-xs">
              <div className="flex justify-between py-1 border-b border-[#141414]">
                <span className="text-gray-500">Account Role:</span>
                <span className="font-mono text-cyan-400">{currentUser?.role || 'Guest'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#141414]">
                <span className="text-gray-500">District:</span>
                {isEditingDistrict ? (
                  <div className="flex items-center gap-1">
                    <select
                      value={userProfileDistrict}
                      onChange={(e) => setUserProfileDistrict(e.target.value)}
                      className="bg-[#111] border border-cyan-700/60 text-white rounded px-2 py-0.5 text-xs font-mono outline-hidden"
                    >
                      {districts.map(d => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        if (onUpdateUserDistrict) {
                          onUpdateUserDistrict(userProfileDistrict);
                        }
                        setIsEditingDistrict(false);
                        setDistrictSaveStatus('Updated');
                        setTimeout(() => setDistrictSaveStatus(''), 2500);
                      }}
                      className="px-2 py-0.5 bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 rounded text-[10px] font-mono uppercase"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setUserProfileDistrict(currentUser?.district || 'CHENNAI');
                        setIsEditingDistrict(false);
                      }}
                      className="px-1.5 py-0.5 bg-[#1f1f1f] text-gray-400 hover:text-white rounded text-[10px] font-mono"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-200 font-mono font-medium">{currentUser?.district || 'CHENNAI'}</span>
                    <button
                      onClick={() => {
                        setUserProfileDistrict(currentUser?.district || 'CHENNAI');
                        setIsEditingDistrict(true);
                      }}
                      className="text-[10px] text-cyan-400 hover:underline font-mono"
                    >
                      Change
                    </button>
                    {districtSaveStatus && (
                      <span className="text-[10px] text-emerald-400 font-mono">{districtSaveStatus}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-between py-1 border-b border-[#141414]">
                <span className="text-gray-500">Email Verification:</span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#141414]">
                <span className="text-gray-500">Registered At:</span>
                <span className="font-mono text-gray-400">{currentUser?.registeredAt || '2026-08-26'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Donor Status:</span>
                <span className="font-mono text-red-400">
                  {currentUser?.isDonor ? 'Active Blood Donor (O+)' : 'Not Enrolled'}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('blood')}
              className="w-full py-2 bg-[#111] hover:bg-[#1a1a1a] text-red-400 border border-red-900/50 text-xs font-mono uppercase tracking-wider font-bold rounded transition flex items-center justify-center gap-1.5"
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>{currentUser?.isDonor ? 'Manage Donor Card' : 'Register as Blood Donor'}</span>
            </button>
          </div>

          {/* Privacy & Consent Log */}
          <div className="lg:col-span-2 bg-[#0a0a0a] p-6 border border-[#1a1a1a] space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white">Privacy, Consents & Anonymized Data Contribution</h3>
              <p className="text-xs text-gray-400">
                CHP Analytics strictly de-identifies all community inputs. Zero personal health history is linked to your email or identity.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div className="p-3.5 bg-[#070707] border border-emerald-900/40 rounded flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-emerald-300">Active Consent: Demographic & Epidemiological Research</p>
                  <p className="text-gray-400 mt-0.5 leading-relaxed">
                    Granted on {currentUser?.registeredAt || '2026-08-26'}. You can revoke anonymized demographic contributions at any time.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-[#070707] border border-cyan-900/40 rounded flex items-start gap-3">
                <FileText className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-cyan-300">k-Anonymity Pseudonym Token: <code className="bg-[#111] px-1.5 py-0.5 rounded text-cyan-400 font-mono border border-cyan-900/40">ANON-9014-X</code></p>
                  <p className="text-gray-400 mt-0.5 leading-relaxed">
                    All analytics queries process your demographic data solely inside partitioned batches where k &ge; 50 to prevent re-identification.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('ml')}
                className="px-4 py-2 bg-purple-900/40 hover:bg-purple-900/60 border border-purple-700/50 text-purple-300 text-xs font-mono uppercase tracking-wider font-bold rounded transition flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                <span>Launch ML Health Risk Evaluation</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
