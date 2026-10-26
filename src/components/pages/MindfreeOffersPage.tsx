import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Gift,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  Percent,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { MATTRESS_PRODUCTS } from '../../data/pdpData';

interface PromoCode {
  code: string;
  discount: string;
  description: string;
  minSpend: string;
  badge: string;
}

const ACTIVE_PROMOS: PromoCode[] = [
  {
    code: 'MINDFREE10',
    discount: '10% OFF',
    description: 'Complimentary savings applied to all bespoke mattress orders above ₹25,000.',
    minSpend: 'Min. order ₹25,000',
    badge: 'Atelier Privilege',
  },
  {
    code: 'SANCTUARY',
    discount: 'FREE PILLOW SET',
    description: 'Receive two Bespoke Ergonomic Pillows (valued at ₹4,998) with any King or Queen mattress.',
    minSpend: 'King or Queen Mattress',
    badge: 'Complimentary Gift',
  },
  {
    code: 'SUITE6500',
    discount: '₹6,500 OFF BUNDLE',
    description: 'Complete Bedroom Suite discount when bundling a Signature Mattress + Bamboo Protector + Pillow Set.',
    minSpend: 'Bedroom Suite Bundle',
    badge: 'Suite Savings',
  },
];

export const MindfreeOffersPage: React.FC = () => {
  const { navigateToMattresses } = useNavigation();
  const { addToCart } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleClaimSuiteBundle = () => {
    // Add Ortho mattress + Bamboo protector + Pillow pair with bundle savings
    const ortho = MATTRESS_PRODUCTS['orthopedic'];
    const queenSize = ortho.sizes[2];

    addToCart(
      {
        id: ortho.id,
        sku: `${queenSize.sku}-SUITE`,
        name: `${ortho.name} (Queen - Bedroom Suite Bundle)`,
        size: 'Queen (78" × 60")',
        thickness: '8-inch Standard',
        price: 25499, // discounted bundle price (orig ~32,000)
        originalPrice: 31999,
        image: ortho.gallery[0]?.url || '/images/type_ortho.png',
      },
      1
    );
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* 1. HERO BANNER */}
      <section className="relative bg-[#0A2E73] text-[#F8FAFC] pt-14 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#1244A8] via-[#0A2E73] to-[#071F52] opacity-90 pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#E3262E]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1520px] mx-auto max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono tracking-widest uppercase text-[#E3262E]">
            <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
            <span>Transparent Atelier Privileges</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            Atelier Privileges,{' '}
            <span className="italic font-light text-[#E3262E]">Bespoke Bedroom Bundles.</span>
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans">
            We do not engage in fabricated countdowns or inflated false markups. Instead, we offer
            genuine direct-to-consumer commissioning privileges, complimentary white-glove setup,
            and exclusive bedroom suite savings.
          </p>
        </div>
      </section>

      {/* 2. REASSURANCE STRIP */}
      <section className="bg-white border-b border-[#E2E8F0] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1520px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#0F2952]">
            <Percent className="w-4 h-4 text-[#E3262E] shrink-0" />
            <span>Zero-Cost EMI on All Major Banks</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#0F2952]">
            <Truck className="w-4 h-4 text-[#E3262E] shrink-0" />
            <span>Free White-Glove In-Bedroom Assembly</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#0F2952]">
            <Gift className="w-4 h-4 text-[#E3262E] shrink-0" />
            <span>Complimentary Welcome Sleep Kit</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#0F2952]">
            <ShieldCheck className="w-4 h-4 text-[#E3262E] shrink-0" />
            <span>100-Night In-Bedroom Sleep Guarantee</span>
          </div>
        </div>
      </section>

      {/* 3. ACTIVE PROMO CODES */}
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E3262E] font-bold">
              Verified Atelier Vouchers
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#071F52] mt-1">
              Current Client Privileges
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Apply these authentic codes during checkout for instant verification.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateToMattresses()}
            className="self-start sm:self-auto px-4 py-2 rounded-xl border border-[#0A2E73] text-[#0A2E73] hover:bg-[#0A2E73] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Browse Eligible Mattresses →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACTIVE_PROMOS.map((promo) => {
            const isCopied = copiedCode === promo.code;

            return (
              <div
                key={promo.code}
                className="bg-white rounded-3xl border border-[#E2E8F0] hover:border-[#E3262E]/60 p-6 flex flex-col justify-between space-y-4 shadow-xs transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DBEAFE] text-[#0A2E73] text-[10px] font-bold uppercase tracking-wider">
                      {promo.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B]">{promo.minSpend}</span>
                  </div>

                  <div>
                    <span className="text-2xl font-serif font-bold text-[#0A2E73] block">
                      {promo.discount}
                    </span>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                      {promo.description}
                    </p>
                  </div>
                </div>

                {/* Copy Voucher Button */}
                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                  <div className="font-mono text-xs font-bold text-[#071F52] bg-[#F8FAFC] px-3 py-1.5 rounded-xl border border-[#E2E8F0] tracking-widest">
                    {promo.code}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(promo.code)}
                    className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC]'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CURATED BEDROOM SUITE BUNDLE */}
      <section className="bg-white border-t border-[#E2E8F0] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1520px] mx-auto">
          <div className="bg-[#F8FAFC] rounded-3xl border border-[#E3262E]/40 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
            <div className="space-y-4 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-[10px] font-bold uppercase tracking-wider">
                Featured Flagship Bundle
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#071F52] leading-tight">
                The Complete Sanctuary Bedroom Suite
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Upgrade your entire master bedroom in a single commission. Includes:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#0F2952]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E3262E]" />
                  <span>Mindfree Ortho-Spine Luxury Mattress (Queen)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E3262E]" />
                  <span>Waterproof Bamboo Breathable Protector</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E3262E]" />
                  <span>2× Ergonomic Cervical Memory Foam Pillows</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E3262E]" />
                  <span>Complimentary White-Glove In-Bedroom Setup</span>
                </li>
              </ul>

              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-3xl font-serif font-bold text-[#0A2E73]">₹25,499</span>
                <span className="text-sm text-[#64748B] line-through">₹31,999</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Save ₹6,500 Instant Bundle Privilege
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleClaimSuiteBundle}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0A2E73] hover:bg-[#071F52] text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add Complete Suite to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-[#64748B]">
                Includes 100-Night Trial & 10-Year Warranty
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINANCING PRIVILEGES */}
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <CreditCard className="w-6 h-6 text-[#E3262E] mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#071F52]">
            0% Interest Atelier Financing
          </h3>
          <p className="text-xs text-[#64748B]">
            Sleep now and spread your commission over 3, 6, 9, or 12 months with no interest or hidden processing charges.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-center text-xs font-medium text-[#0F2952]">
          {['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'State Bank of India', 'Kotak Mahindra', 'Bajaj Finserv'].map((bank) => (
            <div key={bank} className="bg-white p-3.5 rounded-2xl border border-[#E2E8F0] shadow-2xs">
              <span className="font-semibold text-[#0A2E73]">{bank}</span>
              <span className="block text-[10.5px] text-[#64748B] mt-0.5">Up to 12 mo. No-Cost EMI</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
