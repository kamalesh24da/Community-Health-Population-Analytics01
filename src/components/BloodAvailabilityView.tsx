import React, { useState } from 'react';
import { 
  Droplets, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Heart, 
  UserCheck, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  PlusCircle, 
  Sparkles,
  Info,
  Clock
} from 'lucide-react';
import { BloodInventoryItem, BloodDonor, BloodGroup, BloodStockStatus, User } from '../types';

interface BloodAvailabilityViewProps {
  currentUser: User | null;
  bloodInventory: BloodInventoryItem[];
  bloodDonors: BloodDonor[];
  onRegisterDonor: (newDonor: BloodDonor) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  districtsList: string[];
}

export const BloodAvailabilityView: React.FC<BloodAvailabilityViewProps> = ({
  currentUser,
  bloodInventory,
  bloodDonors,
  onRegisterDonor,
  onOpenAuth,
  districtsList
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'donors' | 'register'>('inventory');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Donor Registration Form State
  const [regGroup, setRegGroup] = useState<BloodGroup>('O+');
  const [regDistrict, setRegDistrict] = useState(districtsList[0] || 'CHENNAI');
  const [regArea, setRegArea] = useState('Gandhi Nagar');
  const [regLastDonation, setRegLastDonation] = useState('2026-05-15');
  const [regEligibility, setRegEligibility] = useState({
    weightAbove50: true,
    noRecentTattoo: true,
    noChronicMeds: true,
    consentAgreed: true
  });
  const [regSuccessMsg, setRegSuccessMsg] = useState('');

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Filtered inventory
  const filteredInventory = bloodInventory.filter(item => {
    const matchesGroup = selectedGroup === 'All' || item.bloodGroup === selectedGroup;
    const matchesDistrict = selectedDistrict === 'All' || item.district === selectedDistrict;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesGroup && matchesDistrict && matchesStatus;
  });

  const criticalItems = bloodInventory.filter(b => b.status === 'Critical');

  const handleDonorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEligibility.weightAbove50 || !regEligibility.noRecentTattoo || !regEligibility.noChronicMeds || !regEligibility.consentAgreed) {
      alert('Please confirm all health eligibility criteria and consent to register.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newDonor: BloodDonor = {
      id: `bd-${Date.now().toString().slice(-4)}`,
      userId: currentUser?.id || 'usr-temp',
      donorCode: `DONOR-${randomNum}`,
      bloodGroup: regGroup,
      district: regDistrict,
      area: regArea,
      availabilityStatus: 'Available',
      lastDonationDate: regLastDonation,
      consentGiven: true,
      totalDonationsCount: 1
    };

    onRegisterDonor(newDonor);
    setRegSuccessMsg(`Congratulations! Registered successfully as voluntary donor (${newDonor.donorCode}).`);
    setTimeout(() => {
      setActiveTab('donors');
      setRegSuccessMsg('');
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-[#0a0a0a] p-5 sm:p-6 rounded-xl border border-[#1a1a1a] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#111] border border-rose-900/50 text-rose-400 flex items-center justify-center">
                <Droplets className="w-4 h-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Blood Bank Inventory & Volunteer Donor Network
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Surveillance of real-time blood reserves across district hospital banks and anonymous volunteer coordination.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 bg-[#111] p-1 rounded border border-[#222] font-mono text-xs">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3 py-1 uppercase tracking-wider rounded transition ${
                activeTab === 'inventory' ? 'bg-[#1f1f1f] text-white border border-[#333]' : 'text-gray-400 hover:text-white'
              }`}
            >
              Inventory
            </button>
            <button
              onClick={() => setActiveTab('donors')}
              className={`px-3 py-1 uppercase tracking-wider rounded transition ${
                activeTab === 'donors' ? 'bg-[#1f1f1f] text-white border border-[#333]' : 'text-gray-400 hover:text-white'
              }`}
            >
              Donors Pool
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-3 py-1 uppercase tracking-wider rounded transition flex items-center gap-1 ${
                activeTab === 'register' ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60' : 'text-rose-400 hover:bg-rose-950/30'
              }`}
            >
              <PlusCircle className="w-3 h-3" />
              <span>Enroll</span>
            </button>
          </div>
        </div>

        {/* Critical Shortage Warning Banner */}
        {criticalItems.length > 0 && (
          <div className="p-3 bg-red-950/20 border border-red-900/40 rounded text-red-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-[11px]">
                <strong className="text-red-200 font-mono uppercase">Critical Shortage:</strong> Stock levels (&lt;10 units) in {criticalItems.length} blood groups across districts.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('register')}
              className="px-3 py-1 bg-red-950 border border-red-800 text-red-200 hover:bg-red-900 font-mono uppercase text-[11px] rounded transition shrink-0"
            >
              Donate Now
            </button>
          </div>
        )}
      </div>

      {/* ================= 1. INVENTORY TAB ================= */}
      {activeTab === 'inventory' && (
        <div className="space-y-5">
          
          {/* Filter Bar */}
          <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#1a1a1a] flex flex-wrap items-center justify-between gap-3">
            
            {/* Blood Group Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 mr-1">Group:</span>
              <button
                onClick={() => setSelectedGroup('All')}
                className={`px-2.5 py-1 text-xs uppercase tracking-wider rounded ${
                  selectedGroup === 'All' ? 'bg-[#1f1f1f] text-cyan-300 border border-cyan-800/60 font-bold' : 'bg-[#111] text-gray-400 hover:text-white border border-[#222]'
                }`}
              >
                All
              </button>
              {bloodGroups.map(bg => (
                <button
                  key={bg}
                  onClick={() => setSelectedGroup(bg)}
                  className={`px-2.5 py-1 text-xs uppercase tracking-wider rounded ${
                    selectedGroup === bg ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60 font-bold' : 'bg-[#111] text-gray-400 hover:text-white border border-[#222]'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>

            {/* District & Status Dropdowns */}
            <div className="flex items-center gap-2 font-mono">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="text-xs text-gray-300 bg-[#111] border border-[#222] rounded px-2.5 py-1 outline-hidden"
              >
                <option value="All">All Districts</option>
                {districtsList.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs text-gray-300 bg-[#111] border border-[#222] rounded px-2.5 py-1 outline-hidden"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available (&ge;25)</option>
                <option value="Low">Low (10-24)</option>
                <option value="Critical">Critical (&lt;10)</option>
              </select>
            </div>
          </div>

          {/* Blood Inventory Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredInventory.map((item) => (
              <div 
                key={item.id}
                className="bg-[#0a0a0a] p-4 rounded-xl border border-[#1a1a1a] hover:border-[#2a2a2a] transition space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded bg-[#111] text-rose-400 border border-rose-900/40 flex items-center justify-center font-mono font-bold text-base">
                    {item.bloodGroup}
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider font-bold rounded ${
                    item.status === 'Available' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/50' :
                    item.status === 'Low' ? 'bg-amber-950/40 text-amber-400 border border-amber-900/50' :
                    'bg-red-950/40 text-red-400 border border-red-900/50 animate-pulse'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-1.5 font-mono">
                    <span className="text-xl font-bold text-white">{item.availableUnits}</span>
                    <span className="text-[10px] text-gray-500 uppercase">Units Stock</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-200 mt-1">{item.hospitalOrBank}</p>
                  <p className="text-[10px] font-mono text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    {item.district}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#141414] flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.lastUpdated.split(' ')[1] || 'Live'}
                  </span>
                  <span className="text-emerald-500 font-medium">Verified</span>
                </div>
              </div>
            ))}
          </div>

          {/* Blood Compatibility Guide */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-white">
                Blood Group Compatibility Quick Guide
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#111] p-3 rounded border border-[#222] space-y-1">
                <span className="text-rose-400 font-mono text-[11px] font-bold">O Negative (O-)</span>
                <p className="text-gray-400 text-[11px] leading-relaxed">Universal Red Cell Donor. Can donate to all 8 blood groups in emergencies.</p>
              </div>
              <div className="bg-[#111] p-3 rounded border border-[#222] space-y-1">
                <span className="text-cyan-400 font-mono text-[11px] font-bold">AB Positive (AB+)</span>
                <p className="text-gray-400 text-[11px] leading-relaxed">Universal Red Cell Recipient. Can receive blood from any group safely.</p>
              </div>
              <div className="bg-[#111] p-3 rounded border border-[#222] space-y-1">
                <span className="text-amber-400 font-mono text-[11px] font-bold">A+ and B+</span>
                <p className="text-gray-400 text-[11px] leading-relaxed">Most frequent community demands. Essential for ongoing surgeries.</p>
              </div>
              <div className="bg-[#111] p-3 rounded border border-[#222] space-y-1">
                <span className="text-emerald-400 font-mono text-[11px] font-bold">Safe Interval</span>
                <p className="text-gray-400 text-[11px] leading-relaxed">Every 90 days for healthy adult males, 120 days for adult females.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ================= 2. VOLUNTEER DONORS TAB ================= */}
      {activeTab === 'donors' && (
        <div className="space-y-5">
          
          <div className="bg-[#0a0a0a] p-5 rounded-xl border border-[#1a1a1a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-white">Registered Volunteer Donor Pool</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                To protect citizen safety, individual phone numbers and emails are hidden. Hospital blood banks initiate automated matching.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('register')}
              className="px-3.5 py-1.5 bg-rose-950 border border-rose-800 hover:bg-rose-900 text-rose-200 text-xs font-mono uppercase tracking-wider rounded transition flex items-center gap-1.5 shrink-0"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Enroll Donor</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bloodDonors.map((donor) => (
              <div key={donor.id} className="bg-[#0a0a0a] p-4 rounded-xl border border-[#1a1a1a] space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded bg-[#111] border border-rose-900/40 text-rose-400 font-mono font-bold flex items-center justify-center">
                    {donor.bloodGroup}
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider font-bold rounded ${
                    donor.availabilityStatus === 'Available' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/50' :
                    'bg-[#111] text-gray-500 border border-[#222]'
                  }`}>
                    {donor.availabilityStatus}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-mono font-bold text-gray-200">{donor.donorCode}</p>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    {donor.area}, {donor.district}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#141414] text-[10px] font-mono space-y-1 text-gray-500">
                  <div className="flex justify-between">
                    <span>Donations:</span>
                    <span className="font-semibold text-gray-300">{donor.totalDonationsCount} times</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Active:</span>
                    <span className="font-semibold text-gray-300">{donor.lastDonationDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ================= 3. REGISTER AS DONOR TAB ================= */}
      {activeTab === 'register' && (
        <div className="max-w-2xl mx-auto bg-[#0a0a0a] p-6 sm:p-8 rounded-xl border border-[#1a1a1a] space-y-6">
          
          <div className="space-y-1 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#111] border border-rose-900/40 text-rose-400 flex items-center justify-center mx-auto">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mt-2">Voluntary Blood Donor Registration</h3>
            <p className="text-xs text-gray-400">
              Join the community lifeline. Your contact details remain securely protected by CHP Privacy Protocol.
            </p>
          </div>

          {regSuccessMsg && (
            <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{regSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleDonorSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Blood Group</label>
                <select
                  value={regGroup}
                  onChange={(e) => setRegGroup(e.target.value as BloodGroup)}
                  className="w-full px-3 py-2 text-xs bg-[#111] border border-[#222] text-white rounded focus:border-rose-500 outline-hidden font-mono font-bold"
                >
                  {bloodGroups.map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">District</label>
                <select
                  value={regDistrict}
                  onChange={(e) => setRegDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#111] border border-[#222] text-white rounded focus:border-rose-500 outline-hidden font-mono"
                >
                  {districtsList.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Locality / Area</label>
                <input
                  type="text"
                  required
                  value={regArea}
                  onChange={(e) => setRegArea(e.target.value)}
                  placeholder="e.g. Gandhi Nagar, Sector 4"
                  className="w-full px-3 py-2 text-xs bg-[#111] border border-[#222] text-white rounded focus:border-rose-500 outline-hidden placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Last Donation Date</label>
                <input
                  type="date"
                  required
                  value={regLastDonation}
                  onChange={(e) => setRegLastDonation(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#111] border border-[#222] text-white rounded focus:border-rose-500 outline-hidden font-mono"
                />
              </div>
            </div>

            {/* Health & Eligibility Checklist */}
            <div className="bg-[#111] p-4 rounded border border-[#222] space-y-2.5 text-xs text-gray-300">
              <p className="font-mono text-[11px] uppercase tracking-wider text-gray-400 font-bold">Mandatory Eligibility Checklist:</p>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={regEligibility.weightAbove50}
                  onChange={(e) => setRegEligibility(prev => ({ ...prev, weightAbove50: e.target.checked }))}
                  className="rounded border-[#333] bg-[#1a1a1a] text-rose-500 focus:ring-rose-500"
                />
                <span>I weigh at least 45 - 50 kg and feel healthy today.</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={regEligibility.noRecentTattoo}
                  onChange={(e) => setRegEligibility(prev => ({ ...prev, noRecentTattoo: e.target.checked }))}
                  className="rounded border-[#333] bg-[#1a1a1a] text-rose-500 focus:ring-rose-500"
                />
                <span>No major surgery, piercing, or tattoo in the past 6 months.</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={regEligibility.noChronicMeds}
                  onChange={(e) => setRegEligibility(prev => ({ ...prev, noChronicMeds: e.target.checked }))}
                  className="rounded border-[#333] bg-[#1a1a1a] text-rose-500 focus:ring-rose-500"
                />
                <span>Not taking immunosuppressants or blood thinner medications.</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer pt-1 border-t border-[#222]">
                <input
                  type="checkbox"
                  checked={regEligibility.consentAgreed}
                  onChange={(e) => setRegEligibility(prev => ({ ...prev, consentAgreed: e.target.checked }))}
                  className="rounded border-[#333] bg-[#1a1a1a] text-rose-500 focus:ring-rose-500"
                />
                <span className="font-semibold text-gray-200">
                  I give explicit voluntary consent for anonymized blood matching under CHP Privacy Terms.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-rose-950 border border-rose-800 hover:bg-rose-900 text-rose-200 font-mono uppercase tracking-wider text-xs rounded transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Submit Voluntary Donor Enrollment</span>
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
