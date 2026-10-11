'use client';

import React, { useState } from 'react';
import { Search, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!password) {
      alert("Please enter a password.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setPassword('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 selection:bg-[#00ff88] selection:text-[#0b0f14]">
      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-2 text-[#00ff88]">
          <Lock className="w-8 h-8" />
          PASSWORD SECURITY ANALYZER
        </h1>
        <p className="text-[#8b949e] text-sm">Cybersecurity Project • Developed by Sriram</p>
      </div>

      {/* MAIN CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#111820] rounded-xl p-8 shadow-2xl border border-[#252f38]/50"
      >
        {/* PASSWORD LABEL */}
        <label className="block text-sm font-bold text-[#e6edf3] mb-4">
          ENTER PASSWORD
        </label>

        {/* PASSWORD INPUT & SHOW BUTTON */}
        <div className="flex flex-col items-center mb-8 gap-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#080c10] text-[#e6edf3] text-xl px-6 py-4 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00ff88] border border-transparent transition-all"
            placeholder="Type your password here..."
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="bg-[#18232e] text-[#e6edf3] text-xs font-bold px-6 py-2 rounded transition-colors hover:bg-[#252f38] uppercase"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* ANALYZE BUTTON */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-2 bg-[#00ff88] text-[#0b0f14] text-lg font-bold px-12 py-3 rounded hover:bg-[#00cc6a] transition-colors active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Search className="w-5 h-5" />
            {isAnalyzing ? 'ANALYZING...' : 'ANALYZE PASSWORD'}
          </button>
        </div>

        {/* STRENGTH SECTION */}
        <div className="flex flex-col items-center mb-8">
          <h2 className={`text-2xl font-bold mb-4 transition-colors ${result ? (result.all_ok ? 'text-[#00ff88]' : 'text-[#ff4d4d]') : 'text-[#ffd43b]'}`}>
            ● {result ? (result.all_ok ? 'STRONG' : 'WEAK') : 'WAITING'}
          </h2>
          
          <div className="w-full max-w-sm h-2 bg-[#252f38] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: result ? (result.all_ok ? '100%' : '50%') : '0%' }}
              className={`h-full ${result ? (result.all_ok ? 'bg-[#00ff88]' : 'bg-[#ff4d4d]') : 'bg-[#00ff88]'}`}
            />
          </div>
        </div>

        {/* SECURITY CHECKS */}
        <div className="mb-8 text-center">
          <h3 className="text-xs font-bold text-[#8b949e] mb-4 uppercase">
            Security Requirements
          </h3>
          
          <div className="min-h-[120px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.p 
                  key="waiting"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-sm text-[#8b949e]"
                >
                  Security checks will appear here.
                </motion.p>
              ) : (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2 text-sm items-start inline-flex text-left"
                >
                  <CheckItem ok={result.checks.length} text="Minimum 8 characters" />
                  <CheckItem ok={result.checks.upper} text="Uppercase letter" />
                  <CheckItem ok={result.checks.lower} text="Lowercase letter" />
                  <CheckItem ok={result.checks.number} text="Number" />
                  <CheckItem ok={result.checks.special} text="Special character" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {result && result.all_ok && (
             <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-[#00ff88] font-bold text-sm mt-4"
             >
               ✓ Password meets all security requirements.
             </motion.p>
          )}
        </div>

        {/* HASH SECTION */}
        <div className="mb-8 text-center">
           <h3 className="text-xs font-bold text-[#8b949e] mb-3 uppercase">
            SHA-256 Cryptographic Hash
          </h3>
          <div className="w-full bg-[#080c10] rounded-md min-h-[80px] p-4 flex items-center justify-center break-all">
             <span className="text-[#00ff88] font-mono text-sm leading-relaxed">
               {result?.hash || ''}
             </span>
          </div>
        </div>

        {/* CLEAR BUTTON */}
        <div className="flex justify-center">
          <button
            onClick={handleClear}
            className="bg-[#18232e] text-[#e6edf3] text-sm font-bold px-8 py-2 rounded transition-colors hover:bg-[#ff4d4d] hover:text-white"
          >
            CLEAR
          </button>
        </div>

      </motion.div>

      {/* FOOTER */}
      <div className="mt-8 text-xs text-[#58636e]">
        Password Security Analyzer | SHA-256 | Cybersecurity
      </div>
    </div>
  );
}

function CheckItem({ ok, text }: { ok: boolean, text: string }) {
  return (
    <div className={`flex items-center gap-2 ${ok ? 'text-[#00ff88]' : 'text-[#ff4d4d]'}`}>
      <span className="font-bold">{ok ? '✓' : '✗'}</span>
      <span>{text}</span>
    </div>
  );
}
