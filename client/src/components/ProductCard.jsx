import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const primaryVariant = product.variants?.[0] || {};
  const lowestEmi = product.emiPlans?.length
    ? Math.min(...product.emiPlans.map((p) => p.monthlyPayment))
    : null;

  const discountPercent =
    product.mrp && product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  // Format currency in Indian standard
  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-200 hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top badges */}
      <div className="p-4 pb-0 flex items-center justify-between z-10">
        <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
          {product.brand || 'Flagship'}
        </span>
        {discountPercent > 0 && (
          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Image Frame */}
      <Link
        to={`/products/${product.slug}`}
        className="relative block w-full aspect-[4/3] p-6 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
      >
        <img
          src={primaryVariant.image || '/images/products/iphone-17-pro-silver.jpg'}
          alt={`${product.name} preview`}
          className="max-h-full max-w-full object-contain filter drop-shadow-md"
          loading="lazy"
        />
      </Link>

      {/* Product Information */}
      <div className="p-5 pt-2 flex flex-col flex-1">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-xs font-bold border border-amber-200/60">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating || 4.9}</span>
          </div>
          <span className="text-xs text-slate-500">
            ({product.reviewCount || 1200} reviews)
          </span>
        </div>

        {/* Product Title */}
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Variant color pills indicator */}
        <div className="flex items-center gap-1.5 mt-2 mb-4">
          <span className="text-xs text-slate-500 font-medium">Colors:</span>
          <div className="flex items-center gap-1">
            {product.variants?.slice(0, 4).map((v) => (
              <span
                key={v.id}
                title={v.color}
                className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner"
                style={{ backgroundColor: v.colorHex || '#94a3b8' }}
              />
            ))}
            {product.variants?.length > 4 && (
              <span className="text-[10px] text-slate-400 font-medium">
                +{product.variants.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="text-xs text-slate-400 line-through font-medium">
              {formatCurrency(product.mrp)}
            </div>
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">
              {formatCurrency(product.price)}
            </div>
            {lowestEmi && (
              <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>From {formatCurrency(lowestEmi)}/mo</span>
              </div>
            )}
          </div>

          <Link
            to={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold shadow-sm transition-all group/btn"
          >
            <span>View</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
