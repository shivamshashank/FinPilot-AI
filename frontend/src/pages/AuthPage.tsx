import React, { useState, useEffect } from 'react';
import { useApp } from '../components/AppContext';
import { Sparkles, Phone, ArrowLeft, ArrowRight, CheckCircle2, Shield, Lock, Eye } from 'lucide-react';

export default function AuthPage() {
  const { authStep, setAuthStep, loginWithGoogle, loginWithPhone, verifyOTP } = useApp();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(59);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (authStep === 'otp' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [authStep, countdown]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsSubmitting(true);
    setTimeout(() => {
      loginWithPhone(phoneNumber);
      setIsSubmitting(false);
      setCountdown(59);
    }, 1200);
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      setOtpError('OTP code must be exactly 6 digits');
      return;
    }
    setIsSubmitting(true);
    setOtpError('');

    setTimeout(async () => {
      const ok = await verifyOTP(otpCode);
      setIsSubmitting(false);
      if (!ok) {
        setOtpError('Invalid OTP code. Please enter any 6-digit code like 123456.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-4 md:p-6" id="auth-page">
      <div className="max-w-5xl w-full bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200/50 dark:border-zinc-800/80 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]" id="auth-box">
        
        {/* Onboarding / Visual Illustration Side Panel (Desktop only) */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-950 p-10 flex-col justify-between text-white relative overflow-hidden" id="auth-side-panel">
          {/* Subtle glowing spheres */}
          <div className="absolute top-[-10%] right-[-10%] w-60 h-60 rounded-full bg-pink-500/10 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-sans font-bold tracking-tight text-white text-base">FinPilot AI</span>
          </div>

          {/* Core Benefit Pitch Card */}
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-mono uppercase tracking-widest font-semibold">
              TRUSTED WEALTH INFRASTRUCTURE
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight leading-snug">
              Secure, AI-assisted asset monitoring.
            </h2>
            <p className="text-sm text-indigo-100/95 leading-relaxed font-sans">
              Connect multi-institutional balances under bank-grade AES-256 shields. Monitor spending, and chat with your co-pilot to recover savings.
            </p>

            <div className="space-y-3.5 pt-4">
              {[
                "Plaid secure API integrations",
                "Conversational Wealth Intelligence",
                "Instant receipt OCR ingestion"
              ].map((val, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-indigo-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer labels */}
          <div className="flex items-center gap-2 text-xs text-indigo-250/70">
            <Lock className="h-3.5 w-3.5" />
            <span className="font-mono">AES-256 Encryption Secured</span>
          </div>
        </div>

        {/* Auth Forms Side (60% on desktop) */}
        <div className="col-span-1 md:col-span-7 p-8 md:p-12 flex flex-col justify-between" id="auth-form-panel">
          {/* Back to landing */}
          <div>
            <button
              id="auth-back-to-landing"
              onClick={() => setAuthStep('landing')}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-zinc-900 dark:hover:text-white transition-colors group cursor-pointer mb-8"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to marketing site</span>
            </button>
          </div>

          {/* Authentication Screen Router */}
          <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto py-4">
            
            {/* STEP 1: INITIAL SIGN IN (GOOGLE / PHONE CHOICE) */}
            {authStep === 'signin' && (
              <div id="signin-view" className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-sans">Get Started with FinPilot</h1>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 font-sans">Securely log in to access your AI-powered financial workspace.</p>
                </div>

                {/* Google Sign In Option */}
                <button
                  id="auth-google-signin"
                  onClick={loginWithGoogle}
                  className="w-full h-12 flex items-center justify-center gap-3 border border-gray-250 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-850 bg-white dark:bg-zinc-900 rounded-xl font-semibold text-gray-700 dark:text-zinc-200 text-sm transition-all shadow-sm cursor-pointer"
                >
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M23.52 12.2727C23.52 11.4182 23.4436 10.5955 23.3018 9.81818H12V14.5091H18.4636C18.18 16.0364 17.3236 17.3273 16.0309 18.1864V21.2364H19.9527C22.2491 19.1227 23.52 16.0136 23.52 12.2727Z" fill="#4285F4"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 24C15.24 24 17.9564 22.9273 19.9582 21.2364L16.0364 18.1864C14.9455 18.9182 13.5927 19.3636 12 19.3636C8.86909 19.3636 6.21273 17.2409 5.26364 14.3818H1.21636V17.5182C3.20182 21.4636 7.28182 24 12 24Z" fill="#34A853"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.26364 14.3818C5.01818 13.65 4.88182 12.8727 4.88182 12C4.88182 11.1273 5.01818 10.35 5.26364 9.61818V6.48182H1.21636C0.387273 8.12727 0 9.96364 0 12C0 14.0364 0.387273 15.8727 1.21636 17.5182L5.26364 14.3818Z" fill="#FBBC05"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 4.63636C13.7618 4.63636 15.3436 5.24091 16.5873 6.42727L20.0455 2.96909C17.9509 1.01818 15.2345 0 12 0C7.28182 0 3.20182 2.53636 1.21636 6.48182L5.26364 9.61818C6.21273 6.75909 8.86909 4.63636 12 4.63636Z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Separator */}
                <div className="flex items-center gap-3">
                  <div className="h-[1px] bg-gray-200 dark:bg-zinc-800 flex-1" />
                  <span className="text-xs text-gray-400 font-mono font-bold">OR PHONE SIGN-IN</span>
                  <div className="h-[1px] bg-gray-200 dark:bg-zinc-800 flex-1" />
                </div>

                {/* Phone Sign In Option */}
                <form id="phone-auth-form" onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 dark:text-zinc-300 font-sans" htmlFor="auth-phone-input">
                      Mobile Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                      <input
                        id="auth-phone-input"
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full h-12 bg-gray-50 dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-xl pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-950 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <button
                    id="phone-submit-btn"
                    type="submit"
                    disabled={isSubmitting || !phoneNumber}
                    className="w-full h-12 bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 text-white font-semibold rounded-xl text-sm transition-all hover:bg-zinc-900 dark:hover:bg-white cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 border-2 border-white dark:border-zinc-900 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Verification Code</span>
                        <ArrowRight className="h-4.5 w-4.5" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-[11px] text-gray-400 dark:text-zinc-500 font-sans text-center leading-relaxed">
                  We will transmit a single-use verification code via SMS. standard carrier fees apply. Continued usage establishes acknowledgement of our{' '}
                  <button onClick={() => alert("Terms of Service details...")} className="underline hover:text-indigo-500 cursor-pointer">Terms of Service</button>{' '}
                  and{' '}
                  <button onClick={() => alert("Privacy policy details...")} className="underline hover:text-indigo-500 cursor-pointer">Privacy Policy</button>.
                </p>
              </div>
            )}

            {/* STEP 2: PHONE OTP VERIFICATION */}
            {authStep === 'otp' && (
              <div id="otp-view" className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-sans">Verify your number</h1>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 font-sans">
                    We sent a 6-digit confirmation code to <span className="font-semibold text-zinc-900 dark:text-white">{phoneNumber}</span>.
                  </p>
                </div>

                <form id="otp-verify-form" onSubmit={handleOtpVerify} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 dark:text-zinc-300 font-sans" htmlFor="auth-otp-input">
                      6-Digit Security Code
                    </label>
                    <input
                      id="auth-otp-input"
                      type="text"
                      maxLength={6}
                      required
                      pattern="\d{6}"
                      placeholder="123456"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full h-14 bg-gray-50 dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-xl text-center text-2xl font-mono tracking-[0.4em] font-bold text-gray-950 dark:text-white placeholder-gray-300 outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-950 transition-all"
                    />
                    {otpError && (
                      <p className="text-xs font-medium text-red-500 mt-1 font-sans">{otpError}</p>
                    )}
                  </div>

                  <button
                    id="otp-verify-btn"
                    type="submit"
                    disabled={isSubmitting || otpCode.length !== 6}
                    className="w-full h-12 bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 text-white font-semibold rounded-xl text-sm transition-all hover:bg-zinc-900 dark:hover:bg-white cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 border-2 border-white dark:border-zinc-900 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Verify & Continue</span>
                        <ArrowRight className="h-4.5 w-4.5" />
                      </>
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-between text-xs font-mono">
                  <button
                    id="otp-back-btn"
                    type="button"
                    onClick={() => setAuthStep('signin')}
                    className="text-gray-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Change Phone Number
                  </button>
                  
                  {countdown > 0 ? (
                    <span className="text-gray-400">Resend code in {countdown}s</span>
                  ) : (
                    <button
                      id="otp-resend-btn"
                      type="button"
                      onClick={() => setCountdown(59)}
                      className="text-indigo-500 hover:text-indigo-400 transition-colors font-bold cursor-pointer"
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: AUTHENTICATION SUCCESS & ONBOARDING */}
            {authStep === 'success' && (
              <div id="success-view" className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-sans">Verification Successful</h1>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 font-sans max-w-sm mx-auto">
                    Welcome to the private beta of FinPilot AI. Your secure container vault has been provisioned.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-zinc-950/60 p-5 rounded-2xl border border-gray-200/50 dark:border-zinc-800/60 text-left space-y-3.5 max-w-sm mx-auto">
                  <div className="flex gap-3 items-start">
                    <Shield className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white font-sans">Strict Security Verified</p>
                      <p className="text-[11px] text-gray-400 leading-normal font-sans">End-to-end read-only TLS data pipeline connected.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Sparkles className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white font-sans">Personalized Analytics Primed</p>
                      <p className="text-[11px] text-gray-400 leading-normal font-sans">Predictive cash flow indexes loaded based on Sarah's template.</p>
                    </div>
                  </div>
                </div>

                <button
                  id="auth-enter-app"
                  onClick={() => setAuthStep('authenticated')}
                  className="w-full max-w-sm h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 cursor-pointer flex items-center justify-center gap-2 mx-auto"
                >
                  <span>Enter Application</span>
                  <ArrowRight className="h-4.5 w-4.5 animate-bounce-right" />
                </button>
              </div>
            )}

          </div>

          {/* Footer branding */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100 dark:border-zinc-900/50 pt-6">
            <span>© 2026 FinPilot AI</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white">Terms</a>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white">Privacy</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
