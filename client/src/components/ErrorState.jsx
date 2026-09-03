import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function ErrorState({
  title = 'Unable to Load Products',
  message = 'We encountered an issue fetching details from the database. Please verify your connection or try again.',
  onRetry,
  notFound = false,
}) {
  return (
    <div className="min-h-[55vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-5 shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {notFound ? 'Product Not Found' : title}
        </h3>

        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          {notFound
            ? 'The requested product could not be found in our database. It may have been relocated or updated.'
            : message}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}

          <Link
            to="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
