import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  UserPlus,
  Info
} from 'lucide-react';
import { TAMIL_NADU_DISTRICTS, OTPRecord, User } from '../../types';
import { AuthLayout } from './AuthLayout';

interface RegisterPageProps {
  onNavigate: (route: string) => void;
  onInitiateOtp: (otpRecord: OTPRecord, registrationData: {
    fullName: string;
    email: string;
    district: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
  }) => void;
  districtsList: string[];
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onNavigate,
  onInitiateOtp,
  districtsList
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('kamaleshda24@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState<number | ''>(22);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [district, setDistrict] = useState('Select District');
  const [consentAgreed, setConsentAgreed] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculator
  const calculatePasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const passwordStrength = calculatePasswordStrength(password);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

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
    if (!district || district === 'Select District' || (!TAMIL_NADU_DISTRICTS.includes(district as any) && !districtsList.includes(district))) {
      setErrorMsg('Please select a valid Tamil Nadu district from the 38 options.');
      return;
    }
    if (!consentAgreed) {
      setErrorMsg('You must agree to the data privacy and public health consent terms.');
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

        onInitiateOtp(newOtpRecord, {
          fullName,
          email,
          district,
          age: typeof age === 'number' ? age : 25,
          gender
        });
      } else {
        setErrorMsg(data.message || 'Failed to dispatch verification code. Please retry.');
      }
    } catch (err) {
      // Fallback for offline/preview
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const newOtpRecord: OTPRecord = {
        email,
        otp: generatedOtp,
        expiresAt: Date.now() + 300 * 1000,
        attempts: 0,
        resendCount: 0,
        createdAt: Date.now()
      };

      onInitiateOtp(newOtpRecord, {
        fullName,
        email,
        district,
        age: typeof age === 'number' ? age : 25,
        gender
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      pageTitle="Citizen Portal Registration"
      subtitle="Join the Tamil Nadu localized epidemiological registry. Your data is protected by strict k-anonymity protocols."
    >
      <div className="space-y-5">
        
        {/* Header Title */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs text-gray-400">
            Fill in your demographic details to receive localized health risk insights.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg text-rose-300 text-xs flex items-center gap-2 font-mono animate-in shake duration-200">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
          
          {/* Full Name & Email (2 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-300 block">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="reg-fullname-input"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Kamalesh D."
                  className="w-full pl-9 pr-3 py-2 bg-[#111] border border-[#222] focus:border-cyan-500 text-xs text-white rounded-lg outline-hidden font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-300 block">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="reg-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full pl-9 pr-3 py-2 bg-[#111] border border-[#222] focus:border-cyan-500 text-xs text-white rounded-lg outline-hidden font-mono"
                />
              </div>
            </div>
          </div>

          {/* Password & Confirm Password (2 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-300 block">
                Password <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="reg-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full pl-9 pr-9 py-2 bg-[#111] border border-[#222] focus:border-cyan-500 text-xs text-white rounded-lg outline-hidden font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-300 block">
                Confirm Password <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="reg-confirm-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type password"
                  className="w-full pl-9 pr-3 py-2 bg-[#111] border border-[#222] focus:border-cyan-500 text-xs text-white rounded-lg outline-hidden font-mono"
                />
              </div>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="space-y-1">
              <div className="flex gap-1 h-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 rounded-full transition-all ${
                      passwordStrength >= step
                        ? passwordStrength <= 2 ? 'bg-amber-500' : 'bg-emerald-500'
                        : 'bg-[#222]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-gray-500 block">
                {passwordStrength <= 2 ? 'Weak password (add uppercase, numbers, symbols)' : 'Strong password'}
              </span>
            </div>
          )}

          {/* District, Age, Gender (3 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Tamil Nadu District Dropdown */}
            <div className="space-y-1 sm:col-span-1">
              <label className="text-xs font-mono text-gray-300 block">
                District (TN) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <select
                  id="reg-district-select"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full pl-8 pr-2 py-2 bg-[#111] border border-[#222] focus:border-cyan-500 text-xs text-white rounded-lg outline-hidden font-mono"
                >
                  <option value="Select District" disabled>Select District</option>
                  {TAMIL_NADU_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-300 block">
                Age
              </label>
              <input
                id="reg-age-input"
                type="number"
                min={1}
                max={120}
                value={age}
                onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="22"
                className="w-full px-3 py-2 bg-[#111] border border-[#222] focus:border-cyan-500 text-xs text-white rounded-lg outline-hidden font-mono"
              />
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-300 block">
                Gender
              </label>
              <select
                id="reg-gender-select"
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#111] border border-[#222] focus:border-cyan-500 text-xs text-white rounded-lg outline-hidden font-mono"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Privacy Consent Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer text-xs font-mono text-gray-400">
              <input
                id="reg-consent-checkbox"
                type="checkbox"
                checked={consentAgreed}
                onChange={(e) => setConsentAgreed(e.target.checked)}
                className="w-4 h-4 rounded bg-[#111] border-[#333] text-cyan-500 focus:ring-0 cursor-pointer mt-0.5"
              />
              <span className="text-[11px] leading-tight">
                I consent to localized demographic aggregation under Tamil Nadu public health protocols. Personal identities are never published.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            id="reg-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-900 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 cursor-pointer mt-2"
          >
            {isLoading ? (
              <span className="animate-pulse">Generating OTP Verification Code...</span>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Verify Email & Create Account</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation Link to Login */}
        <div className="pt-3 border-t border-[#141414] text-center font-mono text-xs text-gray-400">
          <span>Already have an account? </span>
          <button
            id="go-to-login-link"
            type="button"
            onClick={() => onNavigate('login')}
            className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </AuthLayout>
  );
};
