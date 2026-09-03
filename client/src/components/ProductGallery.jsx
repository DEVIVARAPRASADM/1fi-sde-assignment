import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';

export default function ProductGallery({ product, selectedVariant, onSelectVariant }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentImage = selectedVariant?.image || product.variants?.[0]?.image || '/images/products/iphone-17-pro-silver.jpg';

  return (
    <div className="flex flex-col">
      {/* Main Image Showcase Card */}
      <div className="relative bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm flex items-center justify-center aspect-square overflow-hidden group">
        {/* Subtle background glow circle */}
        <div
          className="absolute inset-0 m-auto w-72 h-72 rounded-full opacity-20 filter blur-3xl transition-colors duration-700 pointer-events-none"
          style={{ backgroundColor: selectedVariant?.colorHex || '#6366f1' }}
        />

        {/* Brand Tag */}
        <div className="absolute top-5 left-5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 backdrop-blur-sm text-slate-800 text-xs font-bold border border-slate-200">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span>{product.brand || 'Official'}</span>
          </span>
        </div>

        {/* Selected Finish Pill */}
        {selectedVariant?.finish && (
          <div className="absolute top-5 right-5 z-10">
            <span className="text-[11px] font-semibold text-slate-500 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm">
              {selectedVariant.finish}
            </span>
          </div>
        )}

        {/* Main Product Image */}
        <img
          key={currentImage}
          src={currentImage}
          alt={`${product.name} in ${selectedVariant?.color || 'default color'}`}
          className={`max-h-[85%] max-w-[85%] object-contain filter drop-shadow-2xl transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-90 scale-98'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Variant Image Thumbnails */}
      {product.variants?.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4">
          {product.variants.map((variant) => {
            const isSelected = selectedVariant?.id === variant.id;
            return (
              <button
                type="button"
                key={variant.id}
                onClick={() => onSelectVariant(variant)}
                className={`relative w-16 h-16 rounded-2xl p-1.5 bg-white border-2 transition-all flex items-center justify-center overflow-hidden ${
                  isSelected
                    ? 'border-indigo-600 shadow-md ring-2 ring-indigo-100 scale-105'
                    : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                }`}
                aria-label={`Select ${variant.color} variant`}
              >
                <img
                  src={variant.image}
                  alt={variant.color}
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
                <span
                  className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-white shadow-xs"
                  style={{ backgroundColor: variant.colorHex || '#94a3b8' }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Trust & Guarantee Highlights below image */}
      <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-200/80 text-center">
        <div className="flex flex-col items-center gap-1 p-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="text-[11px] font-bold text-slate-800">100% Genuine</span>
          <span className="text-[10px] text-slate-500">Official Brand Warranty</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 border-x border-slate-200/60">
          <Truck className="w-5 h-5 text-indigo-600" />
          <span className="text-[11px] font-bold text-slate-800">Free Express Delivery</span>
          <span className="text-[10px] text-slate-500">Ships within 24 Hours</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2">
          <RotateCcw className="w-5 h-5 text-teal-600" />
          <span className="text-[11px] font-bold text-slate-800">7-Day Replacement</span>
          <span className="text-[10px] text-slate-500">Hassle-free return policy</span>
        </div>
      </div>
    </div>
  );
}
