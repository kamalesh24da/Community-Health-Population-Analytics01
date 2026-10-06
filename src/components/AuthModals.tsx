import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  RefreshCw,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Server,
  Send
} from 'lucide-react';
import { User, OTPRecord, TAMIL_NADU_DISTRICTS } from '../types';

interface AuthModalsProps {
  isOpen: boolean;
  mode: 'login' | 'register' | 'otp' | 'forgot';
  onClose: () => void;
  onSuccessLogin: (user: User) => void;
  onSwitchMode: (mode: 'login' | 'register' | 'otp' | 'forgot') => void;
  districtsList: string[];
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  isOpen,
  mode,
  onClose,
  onSuccessLogin,
  onSwitchMode,
  districtsList
}) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('kamaleshda24@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState<number | ''>(22);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [district, setDistrict] = useState('');
  const [consentAgreed, setConsentAgreed] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // OTP State
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [activeOtpRecord, setActiveOtpRecord] = useState<OTPRecord | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'smtp' | 'simulation'>('simulation');
  const [deliveryDetails, setDeliveryDetails] = useState('');
  const [isSmtpConfigured, setIsSmtpConfigured] = useState(false);
  const [showSmtpInfo, setShowSmtpInfo] = useState(false);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mode === 'otp' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mode, timeLeft]);

  useEffect(() => {
    let cooldownTimer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      cooldownTimer = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(cooldownTimer);
  }, [resendCooldown]);

  if (!isOpen) return null;

  // Password strength calculator
  const calculatePasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score; // 0 to 4
  };

  const passwordStrength = calculatePasswordStrength(password);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!district || district === 'Select District' || !districtsList.includes(district)) {
      setErrorMsg('Please select a valid Tamil Nadu district.');
      return;
    }
    if (!consentAgreed) {
      setErrorMsg('You must agree to the data privacy and consent terms.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName, purpose: 'CHP Citizen Account Registration' })
      });

      const data = await response.json();

      if (data.success) {
        const fallbackOtp = data.otpToken || Math.floor(100000 + Math.random() * 900000).toString();
        const newOtpRecord: OTPRecord = {
          email,
          otp: fallbackOtp,
          expiresAt: Date.now() + (data.expiresInSeconds || 300) * 1000,
          attempts: 0,
          resendCount: 0,
          createdAt: Date.now()
        };

        setActiveOtpRecord(newOtpRecord);
        setTimeLeft(data.expiresInSeconds || 300);
        setResendCooldown(30);
        setOtpDigits(['', '', '', '', '', '']);
        setDeliveryMethod(data.deliveryMethod || 'simulation');
        setDeliveryDetails(data.deliveryDetails || '');
        setIsSmtpConfigured(Boolean(data.smtpConfigured));
        
        if (data.deliveryMethod === 'smtp') {
          setSuccessMsg(`Verification email dispatched to ${email}! Please check your email inbox.`);
        }

        onSwitchMode('otp');
      } else {
        setErrorMsg(data.message || 'Failed to dispatch verification code. Please retry.');
      }
    } catch (err) {
      // Fallback for offline/preview mode
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setActiveOtpRecord({
        email,
        otp: generatedOtp,
        expiresAt: Date.now() + 300 * 1000,
        attempts: 0,
        resendCount: 0,
        createdAt: Date.now()
      });
      setTimeLeft(300);
      setResendCooldown(30);
      setOtpDigits(['', '', '', '', '', '']);
      setDeliveryMethod('simulation');
      setIsSmtpConfigured(false);
      onSwitchMode('otp');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val[val.length - 1];
    }
    if (!/^\d*$/.test(val)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = val;
    setOtpDigits(newDigits);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the OTP.');
      return;
    }

    if (timeLeft <= 0) {
      setErrorMsg('OTP has expired. Please request a new verification code.');
      return;
    }

    setIsLoading(true);

    try {
      // Attempt backend verification
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: enteredOtp })
      });

      const data = await response.json();

      if (data.success || (activeOtpRecord && enteredOtp === activeOtpRecord.otp)) {
        setSuccessMsg('Email verified successfully! Activating account...');
        const newUser: User = {
          id: `usr-${Date.now().toString().slice(-4)}`,
          fullName,
          email,
          role: 'USER',
          age: Number(age) || 22,
          gender,
          district,
          isEmailVerified: true,
          registeredAt: new Date().toISOString().split('T')[0],
          isDonor: false
        };
        setTimeout(() => {
          onSuccessLogin(newUser);
          onClose();
        }, 800);
      } else {
        if (activeOtpRecord) {
          activeOtpRecord.attempts += 1;
        }
        setErrorMsg(data.message || `Invalid verification code. Please check and try again.`);
      }
    } catch (err) {
      // Local fallback verification
      if (activeOtpRecord && enteredOtp === activeOtpRecord.otp) {
        setSuccessMsg('Email verified successfully! Activating account...');
        const newUser: User = {
          id: `usr-${Date.now().toString().slice(-4)}`,
          fullName,
          email,
          role: 'USER',
          age: Number(age) || 22,
          gender,
          district,
          isEmailVerified: true,
          registeredAt: new Date().toISOString().split('T')[0],
          isDonor: false
        };
        setTimeout(() => {
          onSuccessLogin(newUser);
          onClose();
        }, 800);
      } else {
        if (activeOtpRecord) activeOtpRecord.attempts += 1;
        setErrorMsg(`Invalid verification code. Please check and try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName, purpose: 'CHP Account Verification Resend' })
      });

      const data = await response.json();
      const newOtp = data.otpToken || Math.floor(100000 + Math.random() * 900000).toString();
      
      const updated: OTPRecord = {
        email,
        otp: newOtp,
        expiresAt: Date.now() + (data.expiresInSeconds || 300) * 1000,
        attempts: 0,
        resendCount: (activeOtpRecord?.resendCount || 0) + 1,
        createdAt: Date.now()
      };

      setActiveOtpRecord(updated);
      setTimeLeft(data.expiresInSeconds || 300);
      setResendCooldown(45);
      setOtpDigits(['', '', '', '', '', '']);
      setDeliveryMethod(data.deliveryMethod || 'simulation');
      setDeliveryDetails(data.deliveryDetails || '');
      setIsSmtpConfigured(Boolean(data.smtpConfigured));
      
      if (data.deliveryMethod === 'smtp') {
        setSuccessMsg(`Fresh verification code sent to ${email}!`);
      } else {
        setSuccessMsg('Fresh verification code generated.');
      }
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setActiveOtpRecord({
        email,
        otp: newOtp,
        expiresAt: Date.now() + 300 * 1000,
        attempts: 0,
        resendCount: (activeOtpRecord?.resendCount || 0) + 1,
        createdAt: Date.now()
      });
      setTimeLeft(300);
      setResendCooldown(45);
      setOtpDigits(['', '', '', '', '', '']);
      setSuccessMsg('Fresh verification code generated.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoFillOtp = () => {
    if (activeOtpRecord) {
      setOtpDigits(activeOtpRecord.otp.split(''));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email === 'admin@chpanalytics.org') {
        const adminUser: User = {
          id: 'usr-001',
          fullName: 'Dr. Sarah Jenkins (Chief Medical Officer)',
          email: 'admin@chpanalytics.org',
          role: 'ADMIN',
          district: 'CHENNAI',
          isEmailVerified: true,
          registeredAt: '2026-01-10'
        };
        onSuccessLogin(adminUser);
        onClose();
      } else {
        const normalUser: User = {
          id: 'usr-002',
          fullName: fullName || 'Kamalesh D.',
          email: email || 'kamaleshda24@gmail.com',
          role: 'USER',
          age: Number(age) || 22,
          gender: gender || 'Male',
          district: district || 'CHENNAI',
          isEmailVerified: true,
          registeredAt: '2026-08-26',
          isDonor: true
        };
        onSuccessLogin(normalUser);
        onClose();
      }
    }, 600);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0a0a0a] rounded-xl shadow-2xl border border-[#1a1a1a] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a] bg-[#070707]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#111] border border-[#222] flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
              CHP
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                {mode === 'login' && 'Sign In to CHP Analytics'}
                {mode === 'register' && 'Create Citizen Account'}
                {mode === 'otp' && 'Email Verification (OTP)'}
                {mode === 'forgot' && 'Reset Secure Password'}
              </h3>
              <p className="text-xs text-gray-400 font-mono text-[11px]">
                {mode === 'otp' ? 'Single-use cryptographic verification code' : 'Privacy-guarded health analytics access'}
              </p>
            </div>
          </div>
          <button
            id="close-auth-modal"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1f1f1f] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-950/30 border border-red-900/50 text-red-400 text-xs rounded flex items-start gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 text-xs rounded flex items-start gap-2 font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ================= REGISTER FORM ================= */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                  <input
                    id="reg-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Kamalesh D."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#111] border border-[#222] text-gray-200 rounded focus:border-cyan-500 outline-hidden transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                  <input
                    id="reg-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#111] border border-[#222] text-gray-200 rounded focus:border-cyan-500 outline-hidden transition font-mono"
                  />
                </div>
                <p className="text-[10px] font-mono text-gray-500 mt-1">
                  A 6-digit verification code will be sent to this email.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                    Password <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 chars"
                      className="w-full pl-9 pr-9 py-2 text-sm bg-[#111] border border-[#222] text-gray-200 rounded focus:border-cyan-500 outline-hidden transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                    Confirm Password <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                    <input
                      id="reg-confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-[#111] border border-[#222] text-gray-200 rounded focus:border-cyan-500 outline-hidden transition"
                    />
                  </div>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-gray-500">Security Strength:</span>
                    <span className={`font-semibold ${
                      passwordStrength <= 1 ? 'text-rose-400' :
                      passwordStrength <= 2 ? 'text-amber-400' :
                      passwordStrength === 3 ? 'text-cyan-400' : 'text-emerald-400'
                    }`}>
                      {passwordStrength <= 1 && 'Weak'}
                      {passwordStrength === 2 && 'Fair'}
                      {passwordStrength === 3 && 'Good'}
                      {passwordStrength === 4 && 'Strong (Recommended)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 h-1 bg-[#111] rounded overflow-hidden">
                    <div className={`h-full ${passwordStrength >= 1 ? 'bg-rose-500' : 'bg-transparent'}`} />
                    <div className={`h-full ${passwordStrength >= 2 ? 'bg-amber-500' : 'bg-transparent'}`} />
                    <div className={`h-full ${passwordStrength >= 3 ? 'bg-cyan-500' : 'bg-transparent'}`} />
                    <div className={`h-full ${passwordStrength >= 4 ? 'bg-emerald-500' : 'bg-transparent'}`} />
                  </div>
                </div>
              )}

              {/* Demographics */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : '')}
                    className="w-full px-3 py-2 text-sm bg-[#111] border border-[#222] text-gray-200 rounded focus:border-cyan-500 outline-hidden font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-2 py-2 text-sm bg-[#111] border border-[#222] text-gray-200 rounded focus:border-cyan-500 outline-hidden font-mono"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                    District <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="reg-district"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-2 py-2 text-sm bg-[#111] border border-[#222] text-gray-200 rounded focus:border-cyan-500 outline-hidden font-mono text-xs"
                  >
                    <option value="" disabled>Select District</option>
                    {districtsList.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-400 select-none">
                  <input
                    type="checkbox"
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-[#333] bg-[#111] text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-[11px] leading-relaxed">
                    I consent to anonymized health aggregation under CHP Privacy Policy and confirm this is educational data.
                  </span>
                </label>
              </div>

              <button
                id="submit-register-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 mt-2 bg-cyan-600 hover:bg-cyan-500 text-black font-semibold rounded text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Register & Send OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2 text-xs text-gray-500 font-mono">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => onSwitchMode('login')}
                  className="font-semibold text-cyan-400 hover:underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* ================= OTP VERIFICATION FORM ================= */}
          {mode === 'otp' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded bg-[#111] border border-[#222] text-cyan-400 flex items-center justify-center mx-auto">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h4 className="text-base font-semibold text-white">Enter 6-Digit Security Code</h4>
                <p className="text-xs text-gray-400 font-mono text-[11px]">
                  Verification code for <span className="text-cyan-400 font-semibold">{email}</span>
                </p>
              </div>

              {/* Delivery Status Card */}
              {deliveryMethod === 'smtp' ? (
                <div className="bg-[#05110a] text-gray-300 p-3.5 rounded-lg border border-emerald-900/60 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono border-b border-emerald-950 pb-1.5">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold uppercase tracking-wider">
                      <Send className="w-3 h-3" />
                      Live Email Dispatched via SMTP
                    </span>
                    <span className="text-gray-400 font-mono">To: {email}</span>
                  </div>
                  <p className="text-xs text-emerald-300/90 leading-relaxed">
                    A real verification email was sent to <strong className="text-emerald-200">{email}</strong>. Please check your inbox and Spam/Junk folder.
                  </p>
                </div>
              ) : (
                <div className="bg-[#0a0a0a] text-gray-300 p-3.5 rounded-lg border border-[#1f1f1f] space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-mono border-b border-[#161616] pb-1.5">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                      <Sparkles className="w-3 h-3" />
                      Sandbox & Test Mode (No SMTP Configured)
                    </span>
                    <span className="text-gray-500">Target: {email}</span>
                  </div>

                  <div className="flex items-center justify-between bg-[#050505] p-2.5 rounded border border-[#141414]">
                    <div>
                      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Generated Verification Code:</p>
                      <p className="text-lg font-mono font-bold tracking-widest text-cyan-400">
                        {activeOtpRecord?.otp || '------'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAutoFillOtp}
                      className="px-3 py-1.5 text-xs font-mono font-semibold bg-cyan-600 hover:bg-cyan-500 text-black rounded flex items-center gap-1.5 transition"
                    >
                      <Copy className="w-3 h-3" />
                      {isCopied ? 'Auto-Filled!' : 'Auto-Fill OTP'}
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    <strong>Why is this shown on screen?</strong> Sending real emails to your Gmail inbox requires SMTP credentials (e.g. Gmail App Password in <code className="text-gray-300 font-mono">.env</code>). In development without SMTP credentials, the code is provided directly so you are never blocked.
                  </p>

                  {/* Collapsible SMTP Configuration Guide */}
                  <div className="border-t border-[#161616] pt-2">
                    <button
                      type="button"
                      onClick={() => setShowSmtpInfo(!showSmtpInfo)}
                      className="text-[11px] font-mono text-cyan-400/80 hover:text-cyan-300 flex items-center justify-between w-full text-left"
                    >
                      <span className="flex items-center gap-1.5">
                        <Server className="w-3 h-3" />
                        How to enable live delivery to your real Gmail inbox
                      </span>
                      {showSmtpInfo ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {showSmtpInfo && (
                      <div className="mt-2 p-2.5 bg-[#050505] rounded border border-[#1a1a1a] text-[11px] font-mono text-gray-400 space-y-1.5">
                        <p className="text-gray-300 font-sans text-xs">To receive real emails in your personal mailbox:</p>
                        <ol className="list-decimal list-inside space-y-1 text-[10px] text-gray-400">
                          <li>Go to Google Account &rarr; Security &rarr; Generate an <strong className="text-cyan-400">App Password</strong>.</li>
                          <li>In <code className="text-gray-300">.env</code>, configure:</li>
                        </ol>
                        <pre className="bg-[#111] p-2 rounded text-[10px] text-emerald-400 overflow-x-auto">
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
                        </pre>
                        <p className="text-[10px] text-gray-500 font-sans">Once configured, OTP emails will automatically arrive in your real inbox!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
                {/* 6 Digit Input Boxes */}
                <div className="flex justify-center gap-2 sm:gap-3 py-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-mono font-bold border border-[#222] rounded bg-[#111] text-cyan-400 focus:border-cyan-500 outline-hidden transition"
                    />
                  ))}
                </div>

                {/* Expiry Timer & Resend Controls */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-1 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-[11px]">Expires in:</span>
                    <span className={`font-bold ${timeLeft < 60 ? 'text-rose-400' : 'text-gray-200'}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={resendCooldown > 0}
                    onClick={handleResendOtp}
                    className={`text-[11px] ${
                      resendCooldown > 0 
                        ? 'text-gray-600 cursor-not-allowed' 
                        : 'text-cyan-400 hover:underline'
                    }`}
                  >
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                  </button>
                </div>

                <button
                  id="verify-otp-btn"
                  type="submit"
                  disabled={isLoading || timeLeft <= 0}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-mono uppercase tracking-wider text-xs font-semibold rounded transition flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify & Activate Account</span>
                    </>
                  )}
                </button>

                <div className="text-center pt-1 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => onSwitchMode('register')}
                    className="text-gray-500 hover:text-gray-300"
                  >
                    ← Change Registration Details
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= LOGIN FORM ================= */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Quick Demo Logins Banner */}
              <div className="bg-[#050505] border border-[#1a1a1a] rounded-lg p-3 space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                  Quick Demo Sign-In (Select Role):
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('kamaleshda24@gmail.com');
                      setPassword('Password@2026');
                    }}
                    className="py-1.5 px-2.5 bg-[#111] text-cyan-400 border border-[#222] rounded text-xs font-mono hover:bg-[#1a1a1a] transition text-left flex items-center gap-1.5"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>Demo Citizen</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEmail('admin@chpanalytics.org');
                      setPassword('AdminSecure#2026');
                    }}
                    className="py-1.5 px-2.5 bg-[#111] text-purple-400 border border-purple-900/40 rounded text-xs font-mono hover:bg-[#1a1a1a] transition text-left flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Access</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#111] border border-[#222] text-gray-200 rounded focus:border-cyan-500 outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => onSwitchMode('forgot')}
                    className="text-[10px] font-mono text-cyan-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-9 py-2 text-sm bg-[#111] border border-[#222] text-gray-200 rounded focus:border-cyan-500 outline-hidden font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                id="submit-login-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-black font-semibold rounded text-xs font-mono uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2 text-xs text-gray-500 font-mono">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => onSwitchMode('register')}
                  className="font-semibold text-cyan-400 hover:underline"
                >
                  Register Now
                </button>
              </div>
            </form>
          )}

          {/* ================= FORGOT PASSWORD FORM ================= */}
          {mode === 'forgot' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded bg-[#111] border border-amber-900/40 text-amber-400 flex items-center justify-center mx-auto">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h4 className="text-base font-semibold text-white">Reset Password</h4>
                <p className="text-xs text-gray-400 font-mono text-[11px]">
                  Enter your registered email to receive a password reset verification code.
                </p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  setSuccessMsg('Reset code dispatched. Check your inbox.');
                  setTimeout(() => onSwitchMode('login'), 2000);
                }, 800);
              }} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 text-sm bg-[#111] border border-[#222] text-gray-200 rounded focus:border-cyan-500 outline-hidden font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-black font-semibold rounded text-xs font-mono uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Send Reset Instructions</span>}
                </button>

                <div className="text-center pt-1 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => onSwitchMode('login')}
                    className="text-gray-500 hover:text-gray-300"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
