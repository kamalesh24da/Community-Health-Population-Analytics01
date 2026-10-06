import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Sparkles,
  Server,
  Mail
} from 'lucide-react';
import { OTPRecord, User } from '../../types';
import { AuthLayout } from './AuthLayout';

interface VerifyOtpPageProps {
  otpRecord: OTPRecord | null;
  registrationData: {
    fullName: string;
    email: string;
    district: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
  } | null;
  onNavigate: (route: string, successMsg?: string) => void;
  onCompleteRegistration: (newUser: User) => void;
}

export const VerifyOtpPage: React.FC<VerifyOtpPageProps> = ({
  otpRecord,
  registrationData,
  onNavigate,
  onCompleteRegistration
}) => {
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [resendCooldown, setResendCooldown] = useState<number>(30);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [activeRecord, setActiveRecord] = useState<OTPRecord | null>(otpRecord);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = registrationData?.email || activeRecord?.email || 'user@example.com';
  const fullName = registrationData?.fullName || 'Citizen';

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    let cooldownTimer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      cooldownTimer = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(cooldownTimer);
  }, [resendCooldown]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleDigitChange = (index: number, val: string) => {
    const cleanVal = val.replace(/[^0-9]/g, '');
    const newDigits = [...otpDigits];

    if (cleanVal.length > 1) {
      // Pasted multi-digit
      const pasted = cleanVal.slice(0, 6).split('');
      pasted.forEach((d, i) => {
        if (i < 6) newDigits[i] = d;
      });
      setOtpDigits(newDigits);
      if (pasted.length === 6) {
        inputRefs.current[5]?.focus();
      }
      return;
    }

    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);

    // Auto-advance to next input
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCopyOtp = () => {
    if (!activeRecord?.otp) return;
    navigator.clipboard.writeText(activeRecord.otp);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAutoFill = () => {
    if (!activeRecord?.otp) return;
    const digits = activeRecord.otp.split('');
    setOtpDigits(digits);
    inputRefs.current[5]?.focus();
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length !== 6) {
      setErrorMsg('Please enter all 6 digits of your verification code.');
      return;
    }

    if (timeLeft <= 0) {
      setErrorMsg('Verification code has expired. Please click "Resend Code".');
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: enteredOtp })
      });

      const data = await response.json();

      if (data.success || (activeRecord && activeRecord.otp === enteredOtp)) {
        // Success
        const newUser: User = {
          id: `usr-${Date.now().toString().slice(-4)}`,
          fullName: registrationData?.fullName || 'Kamalesh D.',
          email: email.toLowerCase(),
          role: 'USER',
          age: registrationData?.age || 22,
          gender: registrationData?.gender || 'Male',
          district: registrationData?.district || 'CHENNAI',
          isEmailVerified: true,
          registeredAt: new Date().toISOString()
        };

        onCompleteRegistration(newUser);
        onNavigate('login', `Account verified successfully! Welcome ${newUser.fullName}. Please sign in to continue.`);
      } else {
        setErrorMsg(data.message || 'Invalid verification code. Please check and retry.');
      }
    } catch (err) {
      // Local fallback verification
      if (activeRecord && activeRecord.otp === enteredOtp) {
        const newUser: User = {
          id: `usr-${Date.now().toString().slice(-4)}`,
          fullName: registrationData?.fullName || 'Kamalesh D.',
          email: email.toLowerCase(),
          role: 'USER',
          age: registrationData?.age || 22,
          gender: registrationData?.gender || 'Male',
          district: registrationData?.district || 'CHENNAI',
          isEmailVerified: true,
          registeredAt: new Date().toISOString()
        };

        onCompleteRegistration(newUser);
        onNavigate('login', `Account verified successfully! Welcome ${newUser.fullName}. Please sign in to continue.`);
      } else {
        setErrorMsg('Invalid verification code entered.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setErrorMsg('');
    setSuccessMsg('Generating fresh verification code...');

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName, purpose: 'CHP Citizen Account Verification' })
      });
      const data = await response.json();
      
      const newOtp = data.otpToken || Math.floor(100000 + Math.random() * 900000).toString();
      setActiveRecord({
        email,
        otp: newOtp,
        expiresAt: Date.now() + 300 * 1000,
        attempts: 0,
        resendCount: (activeRecord?.resendCount || 0) + 1,
        createdAt: Date.now()
      });
      setTimeLeft(300);
      setResendCooldown(45);
      setOtpDigits(['', '', '', '', '', '']);
      setSuccessMsg(`Fresh verification code dispatched to ${email}!`);
    } catch (err) {
      const fallbackOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setActiveRecord({
        email,
        otp: fallbackOtp,
        expiresAt: Date.now() + 300 * 1000,
        attempts: 0,
        resendCount: (activeRecord?.resendCount || 0) + 1,
        createdAt: Date.now()
      });
      setTimeLeft(300);
      setResendCooldown(45);
      setOtpDigits(['', '', '', '', '', '']);
      setSuccessMsg('Fresh verification code generated.');
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <AuthLayout
      pageTitle="Email OTP Verification"
      subtitle="Enter the 6-digit cryptographic security code dispatched to your registered email."
    >
      <div className="space-y-6">
        
        {/* Header Title */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-xs text-gray-400">
            A 6-digit one-time password has been generated for{' '}
            <span className="text-cyan-400 font-mono font-semibold">{email}</span>.
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-emerald-300 text-xs flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg text-rose-300 text-xs flex items-center gap-2 font-mono animate-in shake duration-200">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Single-Use OTP Banner for Sandbox / Preview Demonstration */}
        {activeRecord?.otp && (
          <div className="bg-[#111] p-4 rounded-xl border border-cyan-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Security Token Generated</span>
              </span>
              <span className="text-[10px] font-mono text-gray-500">
                Single-Use Token
              </span>
            </div>

            <div className="flex items-center justify-between bg-[#080808] p-2.5 rounded-lg border border-[#1a1a1a]">
              <span className="font-mono text-xl sm:text-2xl font-extrabold tracking-widest text-cyan-300">
                {activeRecord.otp}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 rounded text-[11px] font-mono transition"
                >
                  Auto-Fill
                </button>
                <button
                  type="button"
                  onClick={handleCopyOtp}
                  className="p-1.5 bg-[#161616] hover:bg-[#222] border border-[#333] text-gray-300 rounded transition"
                  title="Copy OTP"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {isCopied && (
              <p className="text-[10px] font-mono text-emerald-400 text-right">
                ✓ Copied to clipboard
              </p>
            )}
          </div>
        )}

        {/* 6-Digit OTP Form */}
        <form onSubmit={handleVerifySubmit} className="space-y-5">
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-300 block text-center sm:text-left">
              Enter 6-Digit Code:
            </label>
            <div className="flex justify-between gap-2 max-w-sm mx-auto sm:mx-0">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-mono font-bold bg-[#111] border border-[#222] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white rounded-lg outline-hidden transition"
                />
              ))}
            </div>
          </div>

          {/* Countdown & Resend Option */}
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Expires in: </span>
              <span className={`font-bold ${timeLeft < 60 ? 'text-rose-400' : 'text-white'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <button
              type="button"
              disabled={resendCooldown > 0}
              onClick={handleResendOtp}
              className="text-cyan-400 hover:underline disabled:text-gray-600 disabled:no-underline flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3 h-3 ${resendCooldown > 0 ? '' : 'text-cyan-400'}`} />
              <span>{resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}</span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            id="verify-otp-submit-btn"
            type="submit"
            disabled={isVerifying}
            className="w-full py-3 bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-900 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 cursor-pointer"
          >
            {isVerifying ? (
              <span className="animate-pulse">Validating Cryptographic Token...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Complete Registration</span>
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="pt-3 border-t border-[#141414] text-center font-mono text-xs text-gray-400">
          <span>Wrong email address? </span>
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="text-cyan-400 font-bold hover:underline"
          >
            Go back to Register
          </button>
        </div>

      </div>
    </AuthLayout>
  );
};
