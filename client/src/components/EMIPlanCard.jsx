import React from 'react';
import { CheckCircle2, Gift, Sparkles, Circle } from 'lucide-react';

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val || 0);

  const isZeroPercent = plan.interestRate === 0;

  return (
    <button
      type="button"
      onClick={() => onSelect(plan)}
      className={`relative w-full text-left rounded-2xl p-4 sm:p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'border-indigo-600 bg-indigo-50/40 shadow-highlight ring-1 ring-indigo-600'
          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50 shadow-soft'
      }`}
      aria-pressed={isSelected}
    >
      {/* Recommended Tag */}
      {plan.isRecommended && (
        <div className="absolute -top-3 right-4 z-10">
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
            <Sparkles className="w-2.5 h-2.5" />
            Most Popular
          </span>
        </div>
      )}

      {/* Top row: Monthly payment calculation + Radio indicator */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-baseline gap-1.5">
            <span>{formatCurrency(plan.monthlyPayment)}</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-500">
              x {plan.tenureMonths} months
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5 font-medium">
            Total tenure: {plan.tenureMonths} Months
          </div>
        </div>

        {/* Radio indicator */}
        <div className="pt-0.5">
          {isSelected ? (
            <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-indigo-100" />
          ) : (
            <Circle className="w-5 h-5 text-slate-300 group-hover:text-slate-400" />
          )}
        </div>
      </div>

      {/* Bottom row: Interest badge and Cashback callout */}
      <div className="mt-3.5 pt-3 border-t border-slate-100/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Interest Rate Badge */}
        <span
          className={`font-bold px-2.5 py-1 rounded-lg text-[11px] inline-flex items-center gap-1 ${
            isZeroPercent
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          {isZeroPercent ? '0% Interest' : `${plan.interestRate}% Interest`}
        </span>

        {/* Cashback Banner if applicable */}
        {plan.cashback > 0 ? (
          <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-200/60 text-[11px]">
            <Gift className="w-3 h-3 text-emerald-600" />
            Cashback {formatCurrency(plan.cashback)}
          </span>
        ) : (
          <span className="text-slate-400 text-[11px] font-medium">Standard EMI</span>
        )}
      </div>
    </button>
  );
}
