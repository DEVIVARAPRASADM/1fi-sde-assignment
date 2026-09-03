import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Sparkles, ArrowRight, Gift, Calendar } from 'lucide-react';

export default function ProceedModal({
  isOpen,
  onClose,
  product,
  selectedVariant,
  selectedPlan,
}) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [referenceId] = useState(() => '1FI-' + Math.floor(100000 + Math.random() * 900000));

  if (!isOpen || !product || !selectedPlan) return null;

  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val || 0);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 transform transition-all duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pre-Approved EMI Offer</span>
              </span>
            </div>

            <h3 id="modal-title" className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Selected EMI Plan Summary
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Review your purchase details before proceeding to digital verification.
            </p>

            {/* Product & Variant Quick Recap */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mt-5">
              <div className="w-16 h-16 rounded-xl bg-white p-2 border border-slate-200/60 flex items-center justify-center shrink-0">
                <img
                  src={selectedVariant?.image || product.variants?.[0]?.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{product.name}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
                  <span>Color: {selectedVariant?.color}</span>
                  <span>•</span>
                  <span>Storage: {selectedVariant?.storage}</span>
                </div>
                <div className="text-xs font-bold text-indigo-600 mt-1">
                  Device Price: {formatCurrency(product.price)}
                </div>
              </div>
            </div>

            {/* EMI Breakdown Table */}
            <div className="mt-5 space-y-3 p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 font-medium">Monthly EMI</span>
                <span className="text-base font-extrabold text-slate-900">
                  {formatCurrency(selectedPlan.monthlyPayment)} / month
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 font-medium">Loan Tenure</span>
                <span className="font-bold text-slate-800">{selectedPlan.tenureMonths} Months</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 font-medium">Interest Rate</span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-xs">
                  {selectedPlan.interestRate === 0 ? '0% Interest (No-Cost EMI)' : `${selectedPlan.interestRate}% p.a.`}
                </span>
              </div>

              {selectedPlan.cashback > 0 && (
                <div className="flex items-center justify-between text-sm pt-2 border-t border-indigo-100/80">
                  <span className="text-slate-600 font-medium flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-emerald-600" />
                    Instant Cashback
                  </span>
                  <span className="font-extrabold text-emerald-700">
                    +{formatCurrency(selectedPlan.cashback)}
                  </span>
                </div>
              )}
            </div>

            {/* Mutual Fund Backing Notice */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 mt-4 text-xs text-slate-600">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <p>
                <strong className="text-slate-800">Mutual Fund Advantage:</strong> Your mutual fund folio continues to compound. No redemption required to fund your smartphone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-1/3 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all"
              >
                Change Plan
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full sm:w-2/3 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm font-bold shadow-md shadow-indigo-200 inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Confirm & Proceed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Application Pre-Approved!
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Your mutual-fund backed EMI application has been initiated successfully.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Application Reference:</span>
                <span className="font-mono font-bold text-slate-900">{referenceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Product:</span>
                <span className="font-bold text-slate-900">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Plan:</span>
                <span className="font-bold text-slate-900">
                  {formatCurrency(selectedPlan.monthlyPayment)} x {selectedPlan.tenureMonths} Months
                </span>
              </div>
              {selectedPlan.cashback > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Cashback Applicable:</span>
                  <span>{formatCurrency(selectedPlan.cashback)}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow transition-all cursor-pointer"
            >
              Done & Return to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
