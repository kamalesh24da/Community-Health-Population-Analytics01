import React from 'react';
import { 
  Activity, 
  BarChart3, 
  Droplets, 
  BookOpen, 
  Cpu, 
  MapPin, 
  ShieldCheck, 
  FileCode2, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  UserPlus
} from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: User | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  onSwitchRole: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onSwitchRole
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a] shadow-lg">
      {/* Top Utility Bar */}
      <div className="bg-[#070707] text-gray-400 px-4 py-1.5 text-xs border-b border-[#141414]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              System Integrity: <span className="text-white">ACTIVE</span>
            </span>
            <span className="hidden sm:inline text-[#262626]">|</span>
            <span className="hidden sm:inline text-cyan-500 font-medium">
              Privacy Protocol: <span className="text-cyan-400">k-Anonymity (k≥50)</span>
            </span>
            <span className="hidden md:inline text-[#262626]">|</span>
            <span className="hidden md:inline text-gray-500">
              Oracle 19c & FastAPI
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Role Switcher Demo Tool */}
            <div className="flex items-center gap-1.5 bg-[#111] px-2 py-0.5 rounded border border-[#222]">
              <span className="text-gray-500 text-[10px] uppercase tracking-wider">Simulate Role:</span>
              <button
                id="role-user-btn"
                onClick={() => onSwitchRole('USER')}
                className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded transition-colors ${
                  currentUser?.role === 'USER' 
                    ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700/50' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Citizen
              </button>
              <button
                id="role-admin-btn"
                onClick={() => onSwitchRole('ADMIN')}
                className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded transition-colors ${
                  currentUser?.role === 'ADMIN' 
                    ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Admin
              </button>
            </div>

            {currentUser && (
              <span className="hidden md:flex items-center gap-1.5 text-gray-300 text-xs font-mono">
                <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-white">{currentUser.fullName}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-sm bg-cyan-600 flex items-center justify-center font-bold text-white shadow-md shadow-cyan-900/30 group-hover:bg-cyan-500 transition-all">
              <span className="font-mono text-base">C</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold tracking-tight text-white uppercase">
                  CHP <span className="text-cyan-400 font-light">Analytics</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest bg-cyan-950 text-cyan-400 rounded border border-cyan-800/60">
                  v2.0
                </span>
              </div>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase hidden sm:block">
                Population Health & Decision Support
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              id="nav-landing"
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded text-xs font-medium uppercase tracking-wider transition-colors ${
                activeTab === 'home'
                  ? 'bg-[#141414] text-cyan-400 border border-cyan-900/40 shadow-xs'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#111]'
              }`}
            >
              Home
            </button>

            <button
              id="nav-dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium uppercase tracking-wider transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-[#141414] text-cyan-400 border border-cyan-900/40 shadow-xs'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#111]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Dashboard
            </button>

            <button
              id="nav-diseases"
              onClick={() => setActiveTab('diseases')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium uppercase tracking-wider transition-colors ${
                activeTab === 'diseases'
                  ? 'bg-[#141414] text-cyan-400 border border-cyan-900/40 shadow-xs'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#111]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Disease Directory
            </button>

            <button
              id="nav-blood"
              onClick={() => setActiveTab('blood')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium uppercase tracking-wider transition-colors relative ${
                activeTab === 'blood'
                  ? 'bg-[#141414] text-red-400 border border-red-900/40 shadow-xs'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#111]'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-red-500" />
              Blood & Donors
            </button>

            <button
              id="nav-ml"
              onClick={() => setActiveTab('ml')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium uppercase tracking-wider transition-colors ${
                activeTab === 'ml'
                  ? 'bg-[#141414] text-purple-400 border border-purple-900/40 shadow-xs'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#111]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              ML Risk Tool
            </button>

            <button
              id="nav-map"
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium uppercase tracking-wider transition-colors ${
                activeTab === 'map'
                  ? 'bg-[#141414] text-emerald-400 border border-emerald-900/40 shadow-xs'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#111]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Area Map
            </button>

            <button
              id="nav-docs"
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium uppercase tracking-wider transition-colors ${
                activeTab === 'docs'
                  ? 'bg-[#141414] text-amber-400 border border-amber-900/40 shadow-xs'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#111]'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
              Oracle & Viva Hub
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  id="user-profile-btn"
                  onClick={() => setActiveTab('dashboard')}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-300 bg-[#111] hover:bg-[#1a1a1a] border border-[#222] rounded transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{currentUser.role === 'ADMIN' ? 'Admin Portal' : 'My Records'}</span>
                </button>
                <button
                  id="logout-btn"
                  onClick={onLogout}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-950/30 rounded border border-transparent hover:border-red-900/30 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="login-btn"
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-semibold text-gray-300 hover:text-white bg-[#111] hover:bg-[#1a1a1a] border border-[#262626] rounded transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                  Sign In
                </button>
                <button
                  id="register-btn"
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs uppercase tracking-wider font-bold text-white bg-cyan-700 hover:bg-cyan-600 rounded transition-colors shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Register
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-[#1a1a1a] text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-2.5 py-1 rounded text-xs uppercase tracking-wider whitespace-nowrap ${activeTab === 'home' ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700/50' : 'text-gray-400'}`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2.5 py-1 rounded text-xs uppercase tracking-wider whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700/50' : 'text-gray-400'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('diseases')}
            className={`px-2.5 py-1 rounded text-xs uppercase tracking-wider whitespace-nowrap ${activeTab === 'diseases' ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700/50' : 'text-gray-400'}`}
          >
            Diseases
          </button>
          <button
            onClick={() => setActiveTab('blood')}
            className={`px-2.5 py-1 rounded text-xs uppercase tracking-wider whitespace-nowrap ${activeTab === 'blood' ? 'bg-red-900/60 text-red-300 border border-red-700/50' : 'text-gray-400'}`}
          >
            Blood Bank
          </button>
          <button
            onClick={() => setActiveTab('ml')}
            className={`px-2.5 py-1 rounded text-xs uppercase tracking-wider whitespace-nowrap ${activeTab === 'ml' ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50' : 'text-gray-400'}`}
          >
            ML Risk
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-2.5 py-1 rounded text-xs uppercase tracking-wider whitespace-nowrap ${activeTab === 'map' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50' : 'text-gray-400'}`}
          >
            Area Map
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-2.5 py-1 rounded text-xs uppercase tracking-wider whitespace-nowrap ${activeTab === 'docs' ? 'bg-amber-900/60 text-amber-300 border border-amber-700/50' : 'text-gray-400'}`}
          >
            Oracle & Viva
          </button>
        </div>
      </div>
    </header>
  );
};

