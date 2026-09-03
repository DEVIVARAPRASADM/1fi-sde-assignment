import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductBySlug } from '../services/api';
import Breadcrumb from '../components/Breadcrumb';
import ProductGallery from '../components/ProductGallery';
import PriceSection from '../components/PriceSection';
import VariantSelector from '../components/VariantSelector';
import EMIPlanCard from '../components/EMIPlanCard';
import ProceedModal from '../components/ProceedModal';
import { ProductDetailSkeleton } from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';
import {
  Star,
  Cpu,
  TrendingUp,
  CreditCard,
  ArrowRight,
} from 'lucide-react';

export default function ProductDetailPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductBySlug(slug);
      setProduct(data);

      // Default to first variant
      if (data.variants && data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);
      }

      // Default to recommended EMI plan, or first plan
      if (data.emiPlans && data.emiPlans.length > 0) {
        const recommended = data.emiPlans.find((p) => p.isRecommended) || data.emiPlans[0];
        setSelectedPlan(recommended);
      }
    } catch (err) {
      console.error('Failed to load product:', err);
      setError(err.response?.status === 404 ? 'not_found' : err.message || 'Error loading product');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadProduct();
    window.scrollTo(0, 0);
  }, [loadProduct]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ErrorState
          notFound={error === 'not_found'}
          message={error === 'not_found' ? undefined : error}
          onRetry={loadProduct}
        />
      </div>
    );
  }

  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val || 0);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 lg:pb-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: product.name }]} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Product Gallery & Features (cols 12 -> 5) */}
          <div className="lg:col-span-5 space-y-8">
            <ProductGallery
              product={product}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />

            {/* Specifications Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-600" />
                Technical Highlights
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500 font-medium">Brand</span>
                  <span className="font-bold text-slate-800">{product.brand}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500 font-medium">Display</span>
                  <span className="font-bold text-slate-800">Super Retina XDR OLED, 120Hz</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500 font-medium">Financing Type</span>
                  <span className="font-bold text-emerald-600">Mutual Fund Collateral EMI</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500 font-medium">Packaging</span>
                  <span className="font-bold text-slate-800">Original Sealed Box + Warranty Card</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Pricing, Variants, EMI Selection (cols 12 -> 7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Title & Brand Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating || 4.9}</span>
                  <span className="text-slate-400 font-normal ml-0.5">
                    ({product.reviewCount || 1200})
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Presentation Component */}
            <PriceSection mrp={product.mrp} price={product.price} />

            {/* Variant Selector Component */}
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />

            {/* EMI Plans Section */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    Select an EMI Plan
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Choose tenure and cashback preferences backed by your mutual funds
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  No Cost Available
                </span>
              </div>

              {/* EMI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {product.emiPlans?.map((plan) => (
                  <EMIPlanCard
                    key={plan.id}
                    plan={plan}
                    isSelected={selectedPlan?.id === plan.id}
                    onSelect={setSelectedPlan}
                  />
                ))}
              </div>
            </div>

            {/* Mutual Fund Guarantee Note */}
            <div className="bg-gradient-to-r from-indigo-50/70 via-slate-50 to-emerald-50/60 rounded-2xl p-4 border border-indigo-100 flex items-start gap-3 text-xs text-slate-700">
              <div className="p-2 rounded-xl bg-white shadow-xs text-indigo-600 shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900">Why choose 1Fi Mutual Fund EMIs?</h4>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  Your mutual funds remain invested and continue to generate wealth. 1Fi leverages your existing portfolio to offer instant approval with lowest interest and zero paperwork.
                </p>
              </div>
            </div>

            {/* Desktop Proceed CTA Button */}
            <div className="hidden lg:block pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                disabled={!selectedPlan}
                className={`w-full py-4 px-6 rounded-2xl font-extrabold text-base transition-all duration-300 shadow-md flex items-center justify-center gap-3 cursor-pointer ${
                  selectedPlan
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-indigo-200 hover:shadow-lg hover:scale-[1.01]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <span>
                  Proceed with Selected Plan{' '}
                  {selectedPlan && `(${formatCurrency(selectedPlan.monthlyPayment)}/mo)`}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:p-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium">Selected EMI</span>
            <span className="text-base font-extrabold text-slate-900">
              {selectedPlan ? formatCurrency(selectedPlan.monthlyPayment) : 'Select a plan'}
              {selectedPlan && <span className="text-xs font-normal text-slate-500">/mo</span>}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            disabled={!selectedPlan}
            className={`py-3 px-5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              selectedPlan
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Proceed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ProceedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        selectedVariant={selectedVariant}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
