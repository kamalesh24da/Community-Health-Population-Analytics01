import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { UserDashboard } from './components/UserDashboard';
import { DiseaseExplorerView } from './components/DiseaseExplorerView';
import { BloodAvailabilityView } from './components/BloodAvailabilityView';
import { MLRiskPredictorView } from './components/MLRiskPredictorView';
import { AreaMapView } from './components/AreaMapView';
import { DocumentationView } from './components/DocumentationView';

// Dedicated Full-Page Authentication Components
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { VerifyOtpPage } from './components/auth/VerifyOtpPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';

import { 
  DEMO_USERS, 
  INITIAL_DISEASES, 
  INITIAL_BLOOD_INVENTORY, 
  INITIAL_BLOOD_DONORS, 
  INITIAL_POPULATION_DATA, 
  INITIAL_HEALTH_RECORDS, 
  INITIAL_DISTRICTS 
} from './data/initialData';
import { 
  User, 
  UserRole, 
  BloodDonor, 
  BloodInventoryItem, 
  Disease, 
  DistrictSummary,
  OTPRecord 
} from './types';
import { ShieldCheck, LogIn, ArrowRight } from 'lucide-react';

export default function App() {
  // Read initial route from URL Hash if present
  const getInitialTab = (): string => {
    const hash = window.location.hash.replace('#', '').trim();
    const validTabs = [
      'home', 'dashboard', 'diseases', 'blood', 'ml', 'map', 'docs',
      'login', 'register', 'verify-otp', 'forgot-password'
    ];
    return validTabs.includes(hash) ? hash : 'home';
  };

  // App routing state
  const [activeTab, setActiveTab] = useState<string>(getInitialTab);

  // Authenticated User Session (persisted in localStorage)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('chp_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_USERS[0];
      }
    }
    return DEMO_USERS[0]; // Default logged-in demo citizen
  });

  // Pending OTP / Registration State
  const [pendingOtpRecord, setPendingOtpRecord] = useState<OTPRecord | null>(null);
  const [pendingRegistrationData, setPendingRegistrationData] = useState<{
    fullName: string;
    email: string;
    district: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
  } | null>(null);

  const [authSuccessNotice, setAuthSuccessNotice] = useState<string>('');
  const [selectedDashboardDistrict, setSelectedDashboardDistrict] = useState<string>('All');

  // Dynamic entity states
  const [diseases, setDiseases] = useState<Disease[]>(INITIAL_DISEASES);
  const [bloodInventory, setBloodInventory] = useState<BloodInventoryItem[]>(INITIAL_BLOOD_INVENTORY);
  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>(INITIAL_BLOOD_DONORS);
  const [districts, setDistricts] = useState<DistrictSummary[]>(INITIAL_DISTRICTS);

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Keep URL hash synchronized with activeTab
  const navigateTo = (tab: string, notice?: string) => {
    if (notice) {
      setAuthSuccessNotice(notice);
    }
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash && hash !== activeTab) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab]);

  // Persist user in localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('chp_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('chp_current_user');
    }
  }, [currentUser]);

  // Handle open auth from Navbar or Landing CTA (navigates to separate page)
  const handleOpenAuth = (mode: 'login' | 'register') => {
    navigateTo(mode);
  };

  const handleRoleChange = (role: UserRole) => {
    if (!currentUser) return;
    const updatedUser: User = {
      ...currentUser,
      role
    };
    setCurrentUser(updatedUser);
    showToast(`Active role switched to: ${role}`);
  };

  const handleUpdateUserDistrict = (newDistrict: string) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      district: newDistrict
    };
    setCurrentUser(updated);
    showToast(`Profile district updated to: ${newDistrict}`);
  };

  const handleRegisterDonor = (newDonor: BloodDonor) => {
    setBloodDonors(prev => [newDonor, ...prev]);
    
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        isDonor: true
      });
    }

    setDistricts(prev => prev.map(d => {
      if (d.name === newDonor.district) {
        return { ...d, registeredDonors: d.registeredDonors + 1 };
      }
      return d;
    }));

    showToast(`Enrolled as Voluntary Donor with code: ${newDonor.donorCode}`);
  };

  // Initiate OTP from Register Page
  const handleInitiateOtp = (
    otpRecord: OTPRecord, 
    registrationData: {
      fullName: string;
      email: string;
      district: string;
      age: number;
      gender: 'Male' | 'Female' | 'Other';
    }
  ) => {
    setPendingOtpRecord(otpRecord);
    setPendingRegistrationData(registrationData);
    navigateTo('verify-otp');
    showToast(`Verification OTP dispatched to ${registrationData.email}`);
  };

  // Successful Login handler
  const handleSuccessLogin = (user: User) => {
    setCurrentUser(user);
    navigateTo('dashboard');
    showToast(`Welcome back, ${user.fullName}!`);
  };

  // Successful Registration Verification handler
  const handleCompleteRegistration = (newUser: User) => {
    // Also save in local state
    setAuthSuccessNotice(`Account verified successfully for ${newUser.fullName}! Please sign in.`);
  };

  const districtsList = districts.map(d => d.name);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col font-sans selection:bg-cyan-900 selection:text-cyan-200">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0d0d0d] text-white px-4 py-3 rounded-xl shadow-2xl border border-cyan-800/50 flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200 font-mono">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateTo}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Signed out successfully.');
          navigateTo('login');
        }}
        onSwitchRole={handleRoleChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Public Views */}
        {activeTab === 'home' && (
          <LandingPage
            onNavigate={navigateTo}
            onOpenAuth={handleOpenAuth}
            diseases={diseases}
            bloodInventory={bloodInventory}
            districts={districts}
          />
        )}

        {activeTab === 'dashboard' && (
          currentUser ? (
            <UserDashboard
              currentUser={currentUser}
              populationData={INITIAL_POPULATION_DATA}
              healthRecords={INITIAL_HEALTH_RECORDS}
              diseases={diseases}
              bloodInventory={bloodInventory}
              bloodDonors={bloodDonors}
              districts={districts}
              onNavigate={navigateTo}
              onUpdateUserDistrict={handleUpdateUserDistrict}
              initialDistrictFilter={selectedDashboardDistrict}
            />
          ) : (
            /* Protected Route Redirect Guard */
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-[#1a1a1a] max-w-md w-full text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 flex items-center justify-center mx-auto">
                  <LogIn className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white">Authentication Required</h2>
                  <p className="text-xs text-gray-400 font-sans">
                    Please sign in with your registered credentials to access your personalized health portal and municipal records.
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => navigateTo('login')}
                    className="w-full py-2.5 bg-cyan-700 hover:bg-cyan-600 text-white font-mono text-xs font-bold rounded-lg transition uppercase tracking-wider"
                  >
                    Go to Sign In Page
                  </button>
                  <button
                    onClick={() => navigateTo('register')}
                    className="w-full py-2.5 bg-[#111] hover:bg-[#181818] border border-[#222] text-gray-300 font-mono text-xs rounded-lg transition"
                  >
                    Create New Account
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {activeTab === 'diseases' && (
          <DiseaseExplorerView diseases={diseases} />
        )}

        {activeTab === 'blood' && (
          <BloodAvailabilityView
            currentUser={currentUser}
            bloodInventory={bloodInventory}
            bloodDonors={bloodDonors}
            onRegisterDonor={handleRegisterDonor}
            onOpenAuth={handleOpenAuth}
            districtsList={districtsList}
          />
        )}

        {activeTab === 'ml' && (
          <MLRiskPredictorView />
        )}

        {/* Interactive Tamil Nadu Vector Map View */}
        {activeTab === 'map' && (
          <AreaMapView
            districts={districts}
            bloodInventory={bloodInventory}
            bloodDonors={bloodDonors}
            onNavigate={navigateTo}
            onSelectDistrictForDashboard={(districtName) => {
              setSelectedDashboardDistrict(districtName);
            }}
          />
        )}

        {activeTab === 'docs' && (
          <DocumentationView />
        )}

        {/* Dedicated Separate Authentication Pages */}
        {activeTab === 'login' && (
          <LoginPage
            onSuccessLogin={handleSuccessLogin}
            onNavigate={navigateTo}
            initialSuccessMsg={authSuccessNotice}
          />
        )}

        {activeTab === 'register' && (
          <RegisterPage
            onNavigate={navigateTo}
            onInitiateOtp={handleInitiateOtp}
            districtsList={districtsList}
          />
        )}

        {activeTab === 'verify-otp' && (
          <VerifyOtpPage
            otpRecord={pendingOtpRecord}
            registrationData={pendingRegistrationData}
            onNavigate={navigateTo}
            onCompleteRegistration={handleCompleteRegistration}
          />
        )}

        {activeTab === 'forgot-password' && (
          <ForgotPasswordPage
            onNavigate={navigateTo}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#1a1a1a] bg-[#070707] py-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-bold text-gray-300">
              Community Health & Population Analytics (CHP Analytics)
            </p>
            <p className="text-gray-500">
              B.Sc Computer Science Final Year Project Portfolio • Oracle Database 19c & FastAPI Capstone
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <button onClick={() => navigateTo('map')} className="text-emerald-400/90 hover:text-emerald-300 hover:underline">
              Tamil Nadu Map (38 Districts)
            </button>
            <span className="text-[#262626]">•</span>
            <button onClick={() => navigateTo('docs')} className="text-amber-400/90 hover:text-amber-300 hover:underline">
              Oracle SQL Scripts & Viva Voce
            </button>
            <span className="text-[#262626]">•</span>
            <button onClick={() => navigateTo('ml')} className="text-cyan-400/90 hover:text-cyan-300 hover:underline">
              ML Risk Engine
            </button>
            <span className="text-[#262626]">•</span>
            <button onClick={() => navigateTo('diseases')} className="text-indigo-400/90 hover:text-indigo-300 hover:underline">
              Disease Directory
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
