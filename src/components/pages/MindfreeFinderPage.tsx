import React, { useState, useMemo } from 'react';
import {
  Compass,
  ArrowRight,
  RotateCcw,
  Check,
  ChevronRight,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { MATTRESS_PRODUCTS, type MattressProductDetail } from '../../data/pdpData';

interface QuizAnswers {
  position: 'back' | 'side' | 'stomach' | 'combo';
  firmness: 'plush' | 'medium' | 'firm';
  priority: 'back-pain' | 'cooling' | 'motion' | 'organic';
  size: 'single' | 'double' | 'queen' | 'king';
}

export const MindfreeFinderPage: React.FC = () => {
  const { navigateToProduct } = useNavigation();
  const { addToCart } = useCart();

  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    position: 'back',
    firmness: 'medium',
    priority: 'back-pain',
    size: 'queen',
  });

  const handleSelectAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({
      position: 'back',
      firmness: 'medium',
      priority: 'back-pain',
      size: 'queen',
    });
  };

  // Real matching algorithm based on answers
  const recommendations = useMemo(() => {
    const scores: Record<string, { product: MattressProductDetail; score: number; reasons: string[] }> = {
      orthopedic: {
        product: MATTRESS_PRODUCTS['orthopedic'],
        score: 75,
        reasons: ['7-Zone orthopedic contouring gently aligns lumbar curve'],
      },
      'memory-foam': {
        product: MATTRESS_PRODUCTS['memory-foam'],
        score: 70,
        reasons: ['Slow-rebound open cells eliminate pressure points'],
      },
      latex: {
        product: MATTRESS_PRODUCTS['latex'],
        score: 70,
        reasons: ['100% Organic pin-core latex provides buoyant cooling airflow'],
      },
      spring: {
        product: MATTRESS_PRODUCTS['spring'],
        score: 70,
        reasons: ['Individually encased pocket coils provide active dynamic support'],
      },
      coir: {
        product: MATTRESS_PRODUCTS['coir'],
        score: 65,
        reasons: ['High-density natural rubberized coir foundation provides firm posture'],
      },
      hybrid: {
        product: MATTRESS_PRODUCTS['hybrid'],
        score: 72,
        reasons: ['Masterwork pairing pocket springs with natural latex and micro-foam'],
      },
    };

    // Position weighting
    if (answers.position === 'back') {
      scores['orthopedic'].score += 15;
      scores['coir'].score += 10;
      scores['orthopedic'].reasons.push('Ideal medium-firm pushback for horizontal back posture');
    } else if (answers.position === 'side') {
      scores['memory-foam'].score += 18;
      scores['latex'].score += 15;
      scores['hybrid'].score += 12;
      scores['memory-foam'].reasons.push('Allows shoulder and pelvic sinkage to preserve horizontal spine');
    } else if (answers.position === 'stomach') {
      scores['coir'].score += 20;
      scores['orthopedic'].score += 12;
      scores['coir'].reasons.push('Prevents torso sagging that strains lower back');
    } else {
      scores['hybrid'].score += 18;
      scores['spring'].score += 15;
      scores['hybrid'].reasons.push('Seamless transition between resting postures with zero partner transfer');
    }

    // Firmness weighting
    if (answers.firmness === 'plush') {
      scores['memory-foam'].score += 12;
      scores['latex'].score += 8;
    } else if (answers.firmness === 'medium') {
      scores['orthopedic'].score += 10;
      scores['spring'].score += 10;
      scores['hybrid'].score += 10;
    } else {
      scores['coir'].score += 15;
      scores['orthopedic'].score += 10;
    }

    // Priority weighting
    if (answers.priority === 'back-pain') {
      scores['orthopedic'].score += 18;
      scores['orthopedic'].reasons.push('Doctor-recommended 7-zone active spinal decompression');
    } else if (answers.priority === 'cooling') {
      scores['latex'].score += 18;
      scores['spring'].score += 12;
      scores['latex'].reasons.push('Pin-core vertical aeration channels ensure continuous airflow');
    } else if (answers.priority === 'motion') {
      scores['memory-foam'].score += 18;
      scores['spring'].score += 12;
      scores['memory-foam'].reasons.push('Zero partner motion disturbance guaranteed');
    } else {
      scores['latex'].score += 18;
      scores['coir'].score += 12;
      scores['latex'].reasons.push('Eco-certified organic latex harvested from sustainable rubber plantations');
    }

    // Normalize and sort
    return Object.values(scores)
      .map((item) => ({
        ...item,
        score: Math.min(Math.round(item.score), 99),
      }))
      .sort((a, b) => b.score - a.score);
  }, [answers]);

  const topMatch = recommendations[0];
  const runnersUp = recommendations.slice(1, 3);

  const handleAddTopMatch = () => {
    const sizeObj =
      topMatch.product.sizes.find((s) => s.id === answers.size) || topMatch.product.sizes[2];

    addToCart(
      {
        id: topMatch.product.id,
        sku: sizeObj.sku,
        name: topMatch.product.name,
        size: sizeObj.label,
        thickness: '8-inch Standard',
        price: sizeObj.price,
        originalPrice: sizeObj.originalPrice,
        image: topMatch.product.gallery[0]?.url || '/images/type_ortho.png',
      },
      1
    );
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* 1. HERO BANNER */}
      <section className="relative bg-[#0A2E73] text-[#F8FAFC] pt-12 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#1244A8] via-[#0A2E73] to-[#071F52] opacity-90 pointer-events-none" />
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-[#E3262E]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1520px] mx-auto max-w-2xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono tracking-widest uppercase text-[#E3262E]">
            <Compass className="w-3.5 h-3.5 text-[#E3262E]" />
            <span>Interactive Sleep Profiler</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            Find Your Ideal Sleep Match in{' '}
            <span className="italic font-light text-[#E3262E]">60 Seconds.</span>
          </h1>
          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
            Answer 4 targeted questions regarding your posture, weight distribution, and comfort
            sensitivities. Our algorithmic profiler calculates an exact match from our certified
            catalogue.
          </p>
        </div>
      </section>

      {/* 2. MAIN WIZARD CONTAINER */}
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Wizard Steps (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#E3262E]">
                  Step {step} of 4
                </span>
                <span className="text-xs text-[#64748B]">
                  {step === 1 && '— Sleeping Posture'}
                  {step === 2 && '— Firmness Preference'}
                  {step === 3 && '— Primary Health Sensitivity'}
                  {step === 4 && '— Bedroom Mattress Size'}
                </span>
              </div>

              {step > 1 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-[#64748B] hover:text-[#0A2E73] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart</span>
                </button>
              )}
            </div>

            {/* Step 1: Sleeping Posture */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-serif text-xl font-bold text-[#071F52]">
                  How do you typically sleep at night?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'back', label: 'Back Sleeper', desc: 'Lumbar spine needs uplift to avoid flattening' },
                    { id: 'side', label: 'Side Sleeper', desc: 'Shoulders & hips need pressure-relieving sinkage' },
                    { id: 'stomach', label: 'Stomach Sleeper', desc: 'Needs firm surface to prevent lower back hyperextension' },
                    { id: 'combo', label: 'Toss & Turn / Combo', desc: 'Needs responsive zero-motion recovery as you turn' },
                  ].map((pos) => (
                    <button
                      key={pos.id}
                      type="button"
                      onClick={() => handleSelectAnswer('position', pos.id as any)}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                        answers.position === pos.id
                          ? 'border-[#0A2E73] bg-[#DBEAFE]/50 ring-1 ring-[#0A2E73]'
                          : 'border-[#E2E8F0] hover:border-[#0A2E73]/40 bg-[#F8FAFC]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-[#071F52]">{pos.label}</span>
                        {answers.position === pos.id && <Check className="w-4 h-4 text-[#0A2E73]" />}
                      </div>
                      <p className="text-xs text-[#64748B] mt-1">{pos.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Desired Firmness */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-serif text-xl font-bold text-[#071F52]">
                  What feel do you prefer on your sleep surface?
                </h3>
                <div className="space-y-3">
                  {[
                    { id: 'plush', label: 'Medium-Plush Cloud (5.5 - 6.5 / 10)', desc: 'Cradling contouring that yields under prominent joints' },
                    { id: 'medium', label: 'Medium-Firm Balance (7.0 - 7.5 / 10)', desc: 'Doctor-recommended universal orthopedic posture support' },
                    { id: 'firm', label: 'Firm Structural Alignment (8.5 - 9.0 / 10)', desc: 'Solid, resilient foundation with zero sagging or sinkhole' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleSelectAnswer('firmness', f.id as any)}
                      className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                        answers.firmness === f.id
                          ? 'border-[#0A2E73] bg-[#DBEAFE]/50 ring-1 ring-[#0A2E73]'
                          : 'border-[#E2E8F0] hover:border-[#0A2E73]/40 bg-[#F8FAFC]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-[#071F52]">{f.label}</span>
                        {answers.firmness === f.id && <Check className="w-4 h-4 text-[#0A2E73]" />}
                      </div>
                      <p className="text-xs text-[#64748B] mt-1">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Priority Need */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-serif text-xl font-bold text-[#071F52]">
                  What is your primary sleep wellness goal?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'back-pain', label: 'Relieve Back Stiffness', desc: '7-Zone ergonomic spinal decompression' },
                    { id: 'cooling', label: 'Sleep Cooler & Breathable', desc: 'Pin-core airflow and zero synthetic sweat' },
                    { id: 'motion', label: 'Zero Partner Disturbance', desc: 'Isolate tosses and turns completely' },
                    { id: 'organic', label: '100% Eco-Botanical Purity', desc: 'GOLS-certified chemical-free organic latex' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectAnswer('priority', p.id as any)}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                        answers.priority === p.id
                          ? 'border-[#0A2E73] bg-[#DBEAFE]/50 ring-1 ring-[#0A2E73]'
                          : 'border-[#E2E8F0] hover:border-[#0A2E73]/40 bg-[#F8FAFC]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-[#071F52]">{p.label}</span>
                        {answers.priority === p.id && <Check className="w-4 h-4 text-[#0A2E73]" />}
                      </div>
                      <p className="text-xs text-[#64748B] mt-1">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Size */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-serif text-xl font-bold text-[#071F52]">
                  Which bed size do you require?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'single', label: 'Single', dim: '75" × 36"', desc: 'Solo sleeper or guest room' },
                    { id: 'double', label: 'Double', dim: '75" × 48"', desc: 'Compact master or teen room' },
                    { id: 'queen', label: 'Queen', dim: '78" × 60"', desc: 'Most popular for couples' },
                    { id: 'king', label: 'King', dim: '78" × 72"', desc: 'Expansive master luxury' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSelectAnswer('size', s.id as any)}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                        answers.size === s.id
                          ? 'border-[#0A2E73] bg-[#DBEAFE]/50 ring-1 ring-[#0A2E73]'
                          : 'border-[#E2E8F0] hover:border-[#0A2E73]/40 bg-[#F8FAFC]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-[#071F52]">{s.label}</span>
                        {answers.size === s.id && <Check className="w-4 h-4 text-[#0A2E73]" />}
                      </div>
                      <span className="text-xs font-mono text-[#E3262E] block mt-0.5">{s.dim}</span>
                      <p className="text-[11px] text-[#64748B] mt-1">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wizard Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#0F2952] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-white text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  Profile Complete — Review Match Below
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Live Match Results (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Top Recommended Card */}
            <div className="bg-white rounded-3xl border-2 border-[#E3262E] p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#E3262E] text-white px-4 py-1 rounded-bl-2xl font-mono text-xs font-bold tracking-wider">
                {topMatch.score}% MATCH
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E3262E] font-bold block mb-1">
                Your Primary Posture Formulation
              </span>
              <h4 className="font-serif text-xl font-bold text-[#071F52]">
                {topMatch.product.name}
              </h4>
              <p className="text-xs text-[#64748B] mt-1">{topMatch.product.tagline}</p>

              {/* Photo preview */}
              <div className="relative h-44 rounded-2xl overflow-hidden my-4 bg-[#F8FAFC]">
                <img
                  src={topMatch.product.gallery[0]?.url || '/images/type_ortho.png'}
                  alt={topMatch.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Why it matches */}
              <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0] mb-4 space-y-1.5">
                <span className="text-[11px] font-bold text-[#0A2E73] block">
                  Why our algorithm recommends this:
                </span>
                {topMatch.reasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#0F2952]">
                    <Check className="w-3.5 h-3.5 text-[#E3262E] shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              {/* Pricing for chosen size */}
              {(() => {
                const sz =
                  topMatch.product.sizes.find((s) => s.id === answers.size) ||
                  topMatch.product.sizes[2];
                return (
                  <div className="flex items-center justify-between pb-4">
                    <div>
                      <span className="text-[11px] text-[#64748B] block">{sz.label} Size</span>
                      <span className="text-xl font-serif font-bold text-[#0A2E73]">
                        ₹{sz.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      100-Night Free Trial
                    </span>
                  </div>
                );
              })()}

              {/* CTAs */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => navigateToProduct(topMatch.product.slug)}
                  className="py-2.5 px-3 rounded-xl border border-[#0A2E73] text-[#0A2E73] hover:bg-[#DBEAFE] text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={handleAddTopMatch}
                  className="py-2.5 px-3 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs text-center"
                >
                  Order Match
                </button>
              </div>
            </div>

            {/* Runners-up alternatives */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-bold block">
                Close Alternative Matches
              </span>

              {runnersUp.map((alt) => (
                <div
                  key={alt.product.id}
                  onClick={() => navigateToProduct(alt.product.slug)}
                  className="p-3 rounded-2xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={alt.product.gallery[0]?.url}
                      alt={alt.product.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#E2E8F0]"
                    />
                    <div>
                      <h5 className="font-serif text-xs font-bold text-[#071F52] group-hover:text-[#0A2E73]">
                        {alt.product.name}
                      </h5>
                      <span className="text-[10px] text-[#64748B]">{alt.product.firmnessLabel}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-[#E3262E]">
                      {alt.score}% Match
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#64748B] ml-auto group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
