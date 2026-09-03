import React from 'react';
import { Check } from 'lucide-react';

export default function VariantSelector({
  variants = [],
  selectedVariant,
  onSelectVariant,
}) {
  if (!variants || variants.length === 0) return null;

  // Extract distinct colors and storages
  const uniqueColors = Array.from(new Set(variants.map((v) => v.color)));
  const uniqueStorages = Array.from(new Set(variants.map((v) => v.storage)));

  // Handle color change: find matching variant with same storage if possible, else first matching color
  const handleColorChange = (color) => {
    const matchingVariant =
      variants.find((v) => v.color === color && v.storage === selectedVariant?.storage) ||
      variants.find((v) => v.color === color);
    if (matchingVariant) {
      onSelectVariant(matchingVariant);
    }
  };

  // Handle storage change: find matching variant with same color if possible, else first matching storage
  const handleStorageChange = (storage) => {
    const matchingVariant =
      variants.find((v) => v.storage === storage && v.color === selectedVariant?.color) ||
      variants.find((v) => v.storage === storage);
    if (matchingVariant) {
      onSelectVariant(matchingVariant);
    }
  };

  return (
    <div className="space-y-5 py-4 border-y border-slate-200/80">
      {/* Color Selection Section */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Color: <span className="text-slate-900 font-extrabold normal-case ml-1">{selectedVariant?.color}</span>
          </label>
          {selectedVariant?.finish && (
            <span className="text-xs text-slate-500 font-medium">
              {selectedVariant.finish}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {uniqueColors.map((color) => {
            const variantForColor = variants.find((v) => v.color === color);
            const isSelected = selectedVariant?.color === color;

            return (
              <button
                type="button"
                key={color}
                onClick={() => handleColorChange(color)}
                className={`group flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 ring-2 ring-indigo-200 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                }`}
                aria-pressed={isSelected}
              >
                <span
                  className="w-4 h-4 rounded-full border border-slate-300 shadow-inner flex items-center justify-center"
                  style={{ backgroundColor: variantForColor?.colorHex || '#94a3b8' }}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 text-white filter drop-shadow" />}
                </span>
                <span>{color}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage Selection Section */}
      {uniqueStorages.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Storage: <span className="text-slate-900 font-extrabold normal-case ml-1">{selectedVariant?.storage}</span>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {uniqueStorages.map((storage) => {
              const isSelected = selectedVariant?.storage === storage;
              const isAvailable = variants.some((v) => v.storage === storage);

              return (
                <button
                  type="button"
                  key={storage}
                  onClick={() => handleStorageChange(storage)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-200'
                      : isAvailable
                      ? 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                      : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed line-through'
                  }`}
                  aria-pressed={isSelected}
                >
                  {storage}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
