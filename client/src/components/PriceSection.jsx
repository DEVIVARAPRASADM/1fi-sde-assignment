import React from 'react';
import { Tag, Sparkles } from 'lucide-react';

export default function PriceSection({ mrp, price }) {
  const discountAmount = mrp && price ? mrp - price : 0;
  const discountPercent = mrp && price ? Math.round((discountAmount / mrp) * 100) : 0;

  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val || 0);

  return (
    <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80">
      <div className="flex flex-wrap items-baseline gap-3">
        {/* Current Selling Price */}
        <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {formatCurrency(price)}
        </span>

        {/* MRP with Strikethrough */}
        {mrp > price && (
          <span className="text-base sm:text-lg text-slate-400 line-through font-medium">
            MRP: {formatCurrency(mrp)}
          </span>
        )}

        {/* Discount Percentage Pill */}
        {discountPercent > 0 && (
          <span className="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Sparkles className="w-3 h-3 text-emerald-700" />
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Savings and Tax Callout */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 text-xs text-slate-500">
        {discountAmount > 0 && (
          <span className="font-semibold text-emerald-700 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            Total Instant Savings: {formatCurrency(discountAmount)}
          </span>
        )}
        <span>Inclusive of all taxes & duties</span>
      </div>
    </div>
  );
}
