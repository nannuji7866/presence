
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ShieldAlert, Smartphone, LogIn, CheckCircle2, KeyRound, BellRing, Info, Zap, MessageSquare, Mail, X } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [authMethod, setAuthMethod] = useState<'selection' | 'email' | 'phone'>('selection');
  const [verifyState, setVerifyState] = useState<'input' | 'otp'>('input');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const generateAndSendCode = (target: string, type: 'Email' | 'WhatsApp') => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newCode);
    setVerifyState('otp');
    setIsLoading(false);
    
    if (type === 'WhatsApp') {
      const waNumber = "91" + target;
      const text = `*ODDBALL SECURITY SIGNAL*%0A%0AYour verification code is: *${newCode}*%0A%0AEnter this in the portal to establish connection.`;
      const waUrl = `https://wa.me/${waNumber}?text=${text}`;
      window.open(waUrl, '_blank');
    } else {
      // Simulate Email arrival via Intercept Notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 10000);
    }
  };

  const handleGoogleLoginTrigger = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setAuthMethod('email');
      setEmailAddress('user@gmail.com');
      generateAndSendCode('user@gmail.com', 'Email');
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (verifyState === 'input') {
      if (authMethod === 'phone' && phoneNumber.length < 10) {
        setError("Enter a valid 10-digit number");
        return;
      }
      if (authMethod === 'email' && !emailAddress.includes('@')) {
        setError("Enter a valid email address");
        return;
      }
      
      setIsLoading(true);
      setTimeout(() => {
        generateAndSendCode(authMethod === 'phone' ? phoneNumber : emailAddress, authMethod === 'phone' ? 'WhatsApp' : 'Email');
      }, 1200);
    } else {
      const enteredOtp = otp.join('');
      if (enteredOtp.length < 6) {
        setError("Please enter the full 6-digit code");
        return;
      }
      
      if (enteredOtp !== generatedOtp) {
        setError(`Invalid code. Check your ${authMethod === 'phone' ? 'WhatsApp' : 'Email Inbox'}.`);
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        onLogin({ 
          id: (authMethod === 'phone' ? 'p-' : 'e-') + (authMethod === 'phone' ? phoneNumber : emailAddress), 
          name: authMethod === 'phone' ? 'Agent ' + phoneNumber.slice(-4) : emailAddress.split('@')[0], 
          email: emailAddress || `${phoneNumber}@oddball.io`, 
          phone: phoneNumber,
          role: isAdminMode ? 'admin' : 'user' 
        });
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-start md:items-center overflow-y-auto bg-black/90 backdrop-blur-2xl p-4 md:p-6">
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Mock Email/SMS Notification Intercept */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-top-10 duration-500">
           <div className="neo-card bg-black text-white p-4 shadow-[8px_8px_0px_#8B5CF6] border-[#8B5CF6] flex items-start gap-4">
              <div className="bg-[#8B5CF6] p-2 rounded-lg text-white animate-pulse shrink-0">
                <Mail size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#8B5CF6] mb-1">Incoming Signal: Email</p>
                <p className="text-xs font-bold leading-tight">Code: <span className="text-xl font-black block tracking-[0.2em]">{generatedOtp}</span></p>
                <p className="text-[8px] font-black uppercase opacity-40 mt-1 italic truncate">Agent: {emailAddress}</p>
              </div>
              <button onClick={() => setShowNotification(false)} className="text-white/40 hover:text-white shrink-0">
                <X size={16} />
              </button>
           </div>
        </div>
      )}
      
      <div className="relative w-full max-w-[460px] neo-card bg-white p-6 md:p-10 flex flex-col animate-in fade-in zoom-in duration-300 shadow-[20px_20px_0px_#000] border-[8px] md:border-[10px] border-black my-4 md:my-0">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

        <div className={`absolute -top-6 -left-6 md:-top-10 md:-left-10 w-16 h-16 md:w-24 h-24 border-6 md:border-8 border-black rounded-full z-20 flex items-center justify-center rotate-[-15deg] shadow-[6px_6px_0px_#000] ${isAdminMode ? 'bg-[#FF00D6]' : 'bg-[#FFCF25]'} animate-bounce`}>
          <span className="text-2xl md:text-4xl">{isAdminMode ? '🕵️‍♂️' : '🤫'}</span>
        </div>

        <div className="relative z-10">
          <div className="mb-6 md:mb-10 text-center">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              {authMethod !== 'selection' && (
                <button 
                  onClick={() => { setAuthMethod('selection'); setVerifyState('input'); setError(null); setOtp(['','','','','','']); }}
                  className="flex items-center gap-2 text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl border-4 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  <ChevronLeft size={14} strokeWidth={3} /> Back
                </button>
              )}
              <button 
                onClick={() => { setIsAdminMode(!isAdminMode); setError(null); }}
                className={`ml-auto flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase px-3 md:px-4 py-1.5 md:py-2 border-4 border-black rounded-xl shadow-[4px_4px_0px_#000] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none ${isAdminMode ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}`}
              >
                <ShieldAlert size={12} /> {isAdminMode ? 'Admin Portal' : 'User Portal'}
              </button>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-black mb-1 md:mb-2 uppercase italic leading-none tracking-tighter">
              {isAdminMode ? 'SECURITY CHECK' : (authMethod === 'selection' ? 'THE PORTAL' : (authMethod === 'email' ? 'EMAIL AUTH' : 'MOBILE AUTH'))}
            </h2>
            <p className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest italic">
              {isAdminMode ? 'Verifying access credentials...' : 'Multi-factor verification active.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border-4 border-red-500 text-red-600 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
               <ShieldAlert size={18} />
               <p className="text-[10px] md:text-xs font-black uppercase tracking-tight">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="py-12 md:py-20 flex flex-col items-center justify-center gap-6 md:gap-8">
              <div className="relative w-16 h-16 md:w-24 h-24">
                <div className="absolute inset-0 border-[8px] md:border-[12px] border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-[8px] md:border-[12px] border-t-[#8B5CF6] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-2 md:inset-4 bg-black rounded-full flex items-center justify-center text-white">
                  <Zap size={20} className="animate-pulse text-[#FFCF25]" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-black uppercase text-xs md:text-sm tracking-[0.3em] animate-pulse mb-1">Establishing Signal...</p>
                <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Generating encrypted code</p>
              </div>
            </div>
          ) : authMethod === 'selection' ? (
            <div className="space-y-4 md:space-y-6">
              <button 
                onClick={handleGoogleLoginTrigger}
                className="w-full neo-btn bg-white !text-black flex items-center justify-center gap-4 py-5 md:py-7 border-[4px] md:border-[6px] border-black shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all group"
              >
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-8 h-8 md:w-10 h-10 group-hover:rotate-12 transition-transform" alt="Google" />
                <span className="text-xl md:text-2xl font-black italic">GMAIL VERIFY</span>
              </button>

              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-1 bg-black/10"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">OR DIRECT PORTAL</span>
                <div className="flex-1 h-1 bg-black/10"></div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <button 
                  onClick={() => setAuthMethod('email')}
                  className="neo-btn bg-white !text-black flex flex-col items-center justify-center gap-2 md:gap-3 py-4 md:py-6 border-[4px] md:border-[6px] border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <Mail size={20} />
                  <span className="text-[10px] font-black italic">EMAIL</span>
                </button>
                <button 
                  onClick={() => setAuthMethod('phone')}
                  className="neo-btn bg-[#FFCF25] !text-black flex flex-col items-center justify-center gap-2 md:gap-3 py-4 md:py-6 border-[4px] md:border-[6px] border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <Smartphone size={20} />
                  <span className="text-[10px] font-black italic">PHONE</span>
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
              {verifyState === 'input' ? (
                <div>
                  <label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-3 md:mb-4 ml-1 md:ml-2 flex items-center gap-2">
                    {authMethod === 'email' ? <Mail size={14} className="text-[#8B5CF6]" /> : <Smartphone size={14} className="text-[#FFCF25]" />} 
                    {authMethod === 'email' ? 'Email Address' : 'Mobile Number'}
                  </label>
                  <div className="relative group">
                    {authMethod === 'phone' && (
                      <span className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 font-black text-black text-lg md:text-xl border-r-3 md:border-r-4 border-black pr-3 md:pr-4">+91</span>
                    )}
                    <input 
                      type={authMethod === 'email' ? 'email' : 'tel'}
                      placeholder={authMethod === 'email' ? 'your@email.com' : '98765-43210'} 
                      className={`neo-input ${authMethod === 'phone' ? 'pl-20 md:pl-24' : 'pl-6 md:pl-8'} py-4 md:py-6 text-lg md:text-xl tracking-[0.05em] font-black border-[4px] md:border-[6px] border-black shadow-[6px_6px_0px_#000] focus:shadow-none transition-all outline-none`} 
                      required 
                      autoFocus
                      value={authMethod === 'email' ? emailAddress : phoneNumber}
                      onChange={(e) => authMethod === 'email' ? setEmailAddress(e.target.value) : setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    />
                  </div>
                  <div className={`mt-4 md:mt-6 p-4 md:p-5 rounded-2xl border-2 md:border-4 flex gap-3 md:gap-4 italic animate-pulse ${authMethod === 'email' ? 'bg-[#8B5CF6]/10 border-[#8B5CF6]' : 'bg-[#25D366]/10 border-[#25D366]'}`}>
                    {authMethod === 'email' ? <Mail size={16} className="text-[#8B5CF6]" /> : <MessageSquare size={16} className="text-[#25D366]" />}
                    <p className="text-[9px] md:text-[10px] font-black text-black uppercase leading-relaxed tracking-tight">
                      Security code sent to your <span className="underline decoration-2">{authMethod === 'email' ? 'Inbox' : 'WhatsApp'}</span>.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="animate-in slide-in-from-right-10 duration-300">
                  <div className="text-center mb-6 md:mb-8">
                    <div className="inline-block bg-black text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-2 border-4 border-[#FFCF25] shadow-[4px_4px_0px_#000]">Signal Dispatched!</div>
                    <p className="text-[10px] font-black text-gray-400 italic truncate">For {authMethod === 'email' ? emailAddress : '+91 ' + phoneNumber}</p>
                  </div>

                  <label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-4 md:mb-5 ml-1 md:ml-2 flex items-center gap-2">
                    <KeyRound size={14} className="text-[#76C24F]" /> Enter 6-Digit Code
                  </label>
                  <div className="flex justify-between gap-2 md:gap-3">
                    {otp.map((digit, i) => (
                      <input 
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="w-full h-14 md:h-20 neo-input text-center text-2xl md:text-3xl font-black border-[3px] md:border-[4px] border-black shadow-[4px_4px_0px_#000] p-0 focus:shadow-none transition-all outline-none"
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                      />
                    ))}
                  </div>
                  <button 
                    type="button"
                    onClick={() => { setVerifyState('input'); setOtp(['','','','','','']); }}
                    className="mt-6 md:mt-8 text-[10px] md:text-[11px] font-black uppercase underline text-gray-400 hover:text-black transition-colors w-full text-center"
                  >
                    Resend Code or Change Method
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                className={`w-full neo-btn bg-black text-white text-xl md:text-2xl py-5 md:py-7 flex items-center justify-center gap-4 mt-6 md:mt-8 border-[4px] md:border-[6px] border-white shadow-[8px_8px_0px_#FF00D6] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all ${verifyState === 'otp' && otp.join('').length === 6 ? 'bg-[#76C24F] !shadow-[#FFCF25]' : ''}`}
              >
                <span className="font-black italic uppercase tracking-tighter">
                  {verifyState === 'input' ? 'GET ACCESS CODE' : 'VERIFY & ENTER'}
                </span> 
                <ArrowRight size={28} md:size={32} strokeWidth={3} />
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 md:mt-14 pt-6 md:pt-8 border-t-4 border-black/5 text-center relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-[8px] font-black text-gray-300 uppercase tracking-[0.4em]">ENCRYPTED</div>
          <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-300 tracking-[0.2em] flex items-center justify-center gap-2">
            <CheckCircle2 size={10} className="text-[#76C24F]" /> MISSION CONTROL VERIFIED
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
