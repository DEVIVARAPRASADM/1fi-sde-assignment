import React from 'react';

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col"
        >
          <div className="w-full aspect-[4/3] bg-slate-200 rounded-xl mb-4" />
          <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
          <div className="h-4 bg-slate-100 rounded w-1/2 mb-4" />
          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="h-6 bg-slate-200 rounded w-24 mb-1" />
              <div className="h-3 bg-slate-100 rounded w-16" />
            </div>
            <div className="h-9 bg-slate-200 rounded-xl w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-48 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Image skeleton */}
        <div className="lg:col-span-6">
          <div className="w-full aspect-square bg-slate-200 rounded-3xl" />
          <div className="flex gap-3 mt-4 justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-14 h-14 bg-slate-200 rounded-xl" />
            ))}
          </div>
        </div>
        {/* Info skeleton */}
        <div className="lg:col-span-6 space-y-5">
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-100 rounded w-1/4" />
          <div className="h-10 bg-slate-200 rounded w-1/2" />
          <div className="h-20 bg-slate-100 rounded-2xl" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-10 bg-slate-200 rounded-xl" />
              ))}
            </div>
          </div>
          <div className="space-y-3 pt-4">
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-slate-200 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
