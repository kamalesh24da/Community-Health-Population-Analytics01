import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { User } from '../../types';
import { DEMO_USERS } from '../../data/initialData';
import { AuthLayout } from './AuthLayout';

interface LoginPageProps {
  onSuccessLogin: (user: User) => void;
  onNavigate: (route: string) => void;
  registeredEmail?: string;
  initialSuccessMsg?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onSuccessLogin,
  onNavigate,
  registeredEmail = '',
  initialSuccessMsg = ''
}) => {
  const [email, setEmail] = useState(registeredEmail || 'kamaleshda24@gmail.com');
  const [password, setPassword] = useState('Kamalesh@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(initialSuccessMsg);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Password is required.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Check demo credentials or fallback
      const foundUser = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (foundUser) {
        onSuccessLogin(foundUser);
      } else {
        // Create authenticated user profile session
        const newUser: User = {
          id: `usr-${Date.now().toString().slice(-4)}`,
          fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
          email: email.toLowerCase(),
          role: email.includes('admin') ? 'ADMIN' : 'USER',
          district: 'CHENNAI',
          isEmailVerified: true,
          registeredAt: new Date().toISOString()
        };
        onSuccessLogin(newUser);
      }
    }, 450);
  };

  const handleQuickFill = (type: 'citizen' | 'admin') => {
    setErrorMsg('');
    if (type === 'citizen') {
      setEmail('kamaleshda24@gmail.com');
      setPassword('Kamalesh@2026');
    } else {
      setEmail('admin@chpanalytics.org');
      setPassword('Admin@CHP2026');
    }
  };

  return (
    <AuthLayout
      pageTitle="Sign In to Your Health Portal"
      subtitle="Access localized health analytics, blood bank stock, disease directories, and voluntary donor registries."
    >
      <div className="space-y-6">
        
        {/* Header Title */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-gray-400">
            Enter your authenticated credentials to manage your medical records.
          </p>
        </div>

        {/* Success / Info Alert */}
        {successMsg && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-emerald-300 text-xs flex items-center gap-2 font-mono animate-in fade-in duration-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
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

        {/* Quick Demo Selector */}
        <div className="bg-[#111] p-3 rounded-lg border border-[#1c1c1c] space-y-2">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
            Quick Auto-Fill (Demonstration Portals):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('citizen')}
              className="px-2.5 py-1.5 bg-[#161616] hover:bg-[#1f1f1f] border border-[#262626] rounded text-[11px] font-mono text-cyan-300 transition flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-3 h-3 text-cyan-400" />
              <span>Citizen Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="px-2.5 py-1.5 bg-[#161616] hover:bg-[#1f1f1f] border border-[#262626] rounded text-[11px] font-mono text-purple-300 transition flex items-center justify-center gap-1.5"
            >
              <KeyRound className="w-3 h-3 text-purple-400" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Main Sign In Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-gray-300 block">
              Registered Email Address <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="login-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-[#111] border border-[#222] focus:border-cyan-500 text-sm text-white rounded-lg outline-hidden font-mono transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-gray-300 block">
                Password <span className="text-rose-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-xs font-mono text-cyan-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="login-password-input"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-[#111] border border-[#222] focus:border-cyan-500 text-sm text-white rounded-lg outline-hidden font-mono transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-gray-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-[#111] border-[#333] text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span>Remember session on this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-900 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 cursor-pointer mt-2"
          >
            {isLoading ? (
              <span className="animate-pulse">Authenticating Identity...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation Link to Register */}
        <div className="pt-4 border-t border-[#141414] text-center font-mono text-xs text-gray-400">
          <span>Don&apos;t have an account yet? </span>
          <button
            id="go-to-register-link"
            type="button"
            onClick={() => onNavigate('register')}
            className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Register Here</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </AuthLayout>
  );
};
