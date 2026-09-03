import React from 'react';
import { Shield, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800">
      {/* 4 Feature Value Pillars */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/50">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">Mutual Fund Backed EMIs</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Keep your capital invested earning returns while enjoying smart EMIs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">0% Interest & Cashback</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Exclusive no-cost plans with cashback up to ₹7,500 credited directly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/50">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">100% Genuine Devices</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct brand warranty with official manufacturer seals and invoice.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-950/80 text-blue-400 border border-blue-800/50">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">Instant Digital Approval</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  100% paperless onboarding with zero physical documentation required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white tracking-wide">1Fi Fintech</span>
          <span>— Full-Stack SDE1 Implementation</span>
        </div>
        <p className="text-slate-500 text-center sm:text-right">
          PostgreSQL • Prisma ORM • Express REST API • React • Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
