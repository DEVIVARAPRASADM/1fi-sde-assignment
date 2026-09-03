import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, TrendingUp, Sparkles, Smartphone, ShoppingBag } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top micro-announcement banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>Special 1Fi Offer: 0% Interest EMIs + Up to ₹7,500 Instant Cashback backed by Mutual Funds</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link to="/products" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                1Fi
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  1Fi <span className="text-indigo-600">Store</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
                  Mutual Fund Backed EMIs
                </span>
              </div>
            </Link>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/products"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  location.pathname.startsWith('/products')
                    ? 'text-indigo-600 bg-indigo-50/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                Smartphones
              </Link>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Zero Cost Available
              </span>
            </nav>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Genuine Brand Warranty</span>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Browse Phones
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
