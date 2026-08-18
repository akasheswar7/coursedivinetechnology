import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Lock, 
  User, 
  AlertCircle, 
  ArrowRight, 
  Eye, 
  EyeOff,
  ChevronLeft
} from 'lucide-react';

export const AdminLogin = () => {
  const { loginAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Always require fresh manual login when visiting the login endpoint
  useEffect(() => {
    logout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      await loginAdmin(username, password);
      navigate('/adminportal/dashboard');
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Login failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#071328] flex flex-col justify-between text-slate-100 relative overflow-hidden">
      {/* Full-Screen Animated Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img 
          src="/logo.png" 
          alt="Course Divine Background" 
          className="w-full h-full object-cover object-center opacity-25 select-none filter brightness-110 contrast-110 saturate-125 animate-pulse-glow"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/60 to-slate-950/85"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[500px] bg-amber-500/15 rounded-full blur-[110px] animate-float-slow"></div>
      </div>

      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-slate-950/60 backdrop-blur-xl px-6 py-4 relative z-10 animate-slide-up">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portal Selection</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
              Administrative Endpoint
            </span>
          </div>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10 animate-slide-up">
        <div className="w-full max-w-md bg-slate-900/85 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl p-8 sm:p-9 hover:border-amber-400/40 transition-colors duration-300">
          {/* Header with Animated Official Logo */}
          <div className="text-center mb-8">
            <div className="inline-block mb-3.5 group">
              <img 
                src="/logo.png" 
                alt="Course Divine Logo" 
                className="w-16 h-16 rounded-2xl object-cover shadow-lg border border-white/20 mx-auto ring-4 ring-white/10 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              COURSE DIVINE TECHNOLOGY
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mt-1">
              Admin & Owner Management Portal
            </p>
            <p className="text-xs text-slate-300 mt-1.5 font-medium">
              Sign in to manage CRM leads and employee assignments
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3.5 bg-rose-950/70 border border-rose-800 rounded-2xl text-xs text-rose-300 flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-200">Authentication Failed</p>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator username"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Secure Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-200 shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.02] btn-shimmer"
            >
              {isLoading ? (
                <span>Authenticating Admin...</span>
              ) : (
                <>
                  <span>Sign In as Company Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 text-center">
            🔒 Protected Single Admin Account. Employee logins are restricted.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/60 backdrop-blur-md px-6 py-3 text-center text-xs text-slate-400 relative z-10">
        Course Divine Technology Pvt. Ltd. • Admin Security Module
      </footer>
    </div>
  );
};
