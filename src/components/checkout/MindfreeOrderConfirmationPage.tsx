import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  Truck,
  Printer,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  PackageCheck,
  ChevronRight,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { getOrderById, getAllOrders } from '../../services/orderService';
import type { OrderStatusType } from '../../services/orderService';
import { fetchOrdersFromPg } from '../../services/postgresApi';

export const MindfreeOrderConfirmationPage: React.FC = () => {
  const { lastOrderId, navigateToHome, navigateToAdmin, navigateToAccount } = useNavigation();
  const [ordersVersion, setOrdersVersion] = useState(0);

  const syncOrderStatus = useCallback(async () => {
    await fetchOrdersFromPg();
    setOrdersVersion((v) => v + 1);
  }, []);

  useEffect(() => {
    syncOrderStatus();
    const handleUpdate = () => setOrdersVersion((v) => v + 1);
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('mindfree-orders-updated', handleUpdate);
    window.addEventListener('focus', syncOrderStatus);
    const id = window.setInterval(syncOrderStatus, 5000);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('mindfree-orders-updated', handleUpdate);
      window.removeEventListener('focus', syncOrderStatus);
      window.clearInterval(id);
    };
  }, [syncOrderStatus]);

  // Retrieve current order or fallback to the latest order in storage
  const order = useMemo(() => {
    void ordersVersion;
    if (lastOrderId) {
      const found = getOrderById(lastOrderId);
      if (found) return found;
    }
    const all = getAllOrders();
    return all.length > 0 ? all[0] : null;
  }, [lastOrderId, ordersVersion]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="w-full bg-[#F8FAFC] min-h-[80vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md text-center bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
          <Clock className="w-12 h-12 text-[#E3262E] mx-auto mb-4" />
          <h2 className="text-xl font-serif text-[#071F52] mb-2">No Active Order Found</h2>
          <p className="text-xs text-[#64748B] mb-6">
            We couldn't locate your recent order record. You can explore our signature collection or review your account.
          </p>
          <button
            type="button"
            onClick={navigateToHome}
            className="px-6 py-3 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-xs font-semibold cursor-pointer hover:bg-[#071F52]"
          >
            Explore Mattresses
          </button>
        </div>
      </div>
    );
  }

  const { customer, items, total, subtotal, totalSavings, paymentMethod, paymentStatus, orderId, trackingNumber, estimatedDelivery } = order;

  return (
    <div className="w-full bg-[#F8FAFC] min-h-[90vh] py-10 sm:py-14 font-sans text-[#071F52] print:bg-white print:py-0">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb Navigation (Hidden on Print) */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0] mb-8 print:hidden">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <button
              type="button"
              onClick={navigateToHome}
              className="hover:text-[#0A2E73] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#071F52] font-semibold">Order Confirmation</span>
            <span>/</span>
            <span className="font-mono text-[#E3262E]">{orderId}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0A2E73] text-xs font-semibold text-[#0A2E73] transition-all cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#E3262E]" />
              <span>Print Official Invoice</span>
            </button>

            <button
              type="button"
              onClick={() => navigateToAccount(order.orderId, 'tracking')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A2E73] text-white hover:bg-[#071F52] text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <Truck className="w-3.5 h-3.5 text-[#E3262E]" />
              <span>Track in Client Portal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hero Celebration Banner */}
        <div className="bg-gradient-to-br from-[#0A2E73] to-[#071F52] text-[#F8FAFC] rounded-3xl p-6 sm:p-10 shadow-xl mb-8 relative overflow-hidden">
          {/* Subtle gold decorative ring */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute right-10 -top-10 w-40 h-40 rounded-full bg-[#E3262E]/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium tracking-wider text-[#F8FAFC]">
                <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
                <span>ATELIER COMMISSION CONFIRMED</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif font-light text-[#F8FAFC] leading-tight">
                Thank you, <span className="font-semibold text-white">{customer.fullName}</span>.
                <br />Your sleep sanctuary has entered creation.
              </h1>

              <p className="text-xs sm:text-sm text-[#CCD8CA] leading-relaxed">
                We have reserved your mattress components in our Bengaluru atelier. A formal confirmation SMS and tax invoice have been dispatched to <strong>{customer.email}</strong> and <strong>+91 {customer.phone}</strong>.
              </p>
            </div>

            {/* Order Identifiers Badge */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-xs space-y-2.5 min-w-[240px] shrink-0">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A3B5AA] block">
                  Official Order ID
                </span>
                <span className="font-mono text-base font-bold text-white tracking-wider">
                  {orderId}
                </span>
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-[#A3B5AA] block">
                  Atelier Logistics Track
                </span>
                <span className="font-mono text-xs font-semibold text-[#E3262E]">
                  {trackingNumber}
                </span>
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-[#A3B5AA] block">
                  Estimated White-Glove Setup
                </span>
                <span className="font-semibold text-white flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E3262E]" />
                  <span>{estimatedDelivery}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stage Atelier Production & Fulfillment Stepper */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-[0.2em]">
              Live Atelier Commission Progress
            </h3>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DBEAFE] text-[#0A2E73] text-xs font-bold">
              Current Status: {order.orderStatus}
            </span>
          </div>

          {(() => {
            const stages: {
              id: OrderStatusType;
              title: string;
              desc: string;
              icon: typeof CheckCircle2;
            }[] = [
              {
                id: 'Confirmed',
                title: 'Order Confirmed',
                desc: 'Payment verified & specifications locked.',
                icon: CheckCircle2,
              },
              {
                id: 'Preparing in Atelier',
                title: 'Preparing in Atelier',
                desc: 'Spring coil tempering & foam layering.',
                icon: Clock,
              },
              {
                id: 'Dispatched',
                title: 'Dispatched',
                desc: 'White-glove fleet in transit to your city.',
                icon: PackageCheck,
              },
              {
                id: 'Delivered',
                title: 'Delivered',
                desc: 'Unpacked & installed in your bedroom.',
                icon: Truck,
              },
            ];
            const currentIdx = Math.max(
              0,
              stages.findIndex((s) => s.id === order.orderStatus)
            );
            const latestUpdate =
              order.statusHistory && order.statusHistory.length > 0
                ? order.statusHistory[order.statusHistory.length - 1]
                : null;

            return (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                  {stages.map((st, idx) => {
                    const Icon = st.icon;
                    const isCompleted = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;
                    return (
                      <div
                        key={st.id}
                        className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                          isCurrent
                            ? 'bg-[#F8FAFC] border-[#0A2E73] shadow-xs'
                            : isCompleted
                            ? 'bg-[#DBEAFE] border-[#CCD8CA]'
                            : 'bg-white border-[#E2E8F0] opacity-60'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            isCompleted
                              ? 'bg-[#0A2E73] text-[#F8FAFC]'
                              : 'bg-[#F8FAFC] border border-[#D1C9BE] text-[#94A3B8]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider font-bold block ${
                              isCompleted ? 'text-[#0A2E73]' : 'text-[#94A3B8]'
                            }`}
                          >
                            Stage {idx + 1} •{' '}
                            {isCurrent ? 'Current Stage' : isCompleted ? 'Completed' : 'Upcoming'}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-[#071F52]">
                            {st.title}
                          </h4>
                          <p className="text-[11px] text-[#55645D] mt-0.5">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {latestUpdate && (
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#CCD8CA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="text-[#071F52]">
                      <span className="font-bold text-[#0A2E73] uppercase tracking-wider mr-2">
                        Latest Tracking Update:
                      </span>
                      <strong>{latestUpdate.status}</strong> — {latestUpdate.note}
                    </div>
                    <span className="font-mono text-[11px] text-[#64748B] shrink-0">
                      {new Date(latestUpdate.timestamp).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Main Details Grid: Items & Shipping */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Itemized Order List & White-Glove Instructions (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <h3 className="text-base font-serif font-bold text-[#071F52] pb-4 border-b border-[#E2E8F0] mb-4">
                Commissioned Mattresses ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>

              <div className="divide-y divide-[#E2E8F0]">
                {items.map((item) => (
                  <div key={item.sku} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-[#E2E8F0] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-serif font-bold text-[#071F52] truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs sm:text-sm font-bold text-[#071F52]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-1 flex flex-wrap gap-2">
                        <span className="bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0]">
                          Size: {item.size}
                        </span>
                        <span className="bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0]">
                          Height: {item.thickness}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#94A3B8] font-mono mt-1.5">
                        <span>SKU: {item.sku}</span>
                        <span>Quantity: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* White-Glove Concierge Briefing */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-5 h-5 text-[#0A2E73]" />
                <h3 className="text-sm sm:text-base font-serif font-bold text-[#071F52]">
                  White-Glove Concierge Delivery Experience
                </h3>
              </div>

              <div className="space-y-3 text-xs text-[#55645D] leading-relaxed">
                <p>
                  • <strong>Pre-Delivery Coordination:</strong> Our dedicated logistics officer will call you 24 hours prior to {estimatedDelivery} to lock in a 2-hour delivery window convenient for your schedule.
                </p>
                <p>
                  • <strong>Direct In-Bedroom Setup:</strong> Two trained Mindfree specialists will carefully carry the mattress to your master bedroom, unpack it from its protective seal, and position it directly onto your bed base.
                </p>
                <p>
                  • <strong>Complimentary Old Mattress Removal:</strong> If you requested removal of your previous mattress, our team will responsibly transport it to our textile recycling facility at no added cost.
                </p>
                <p>
                  • <strong>100-Night Sleep Trial:</strong> Your 100-night trial period officially begins on the date of in-bedroom installation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Info & Financial Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Delivery Address & Contact Card */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-7 shadow-xs">
              <h3 className="text-sm font-serif font-bold text-[#071F52] pb-3 border-b border-[#E2E8F0] mb-4">
                Delivery & Contact Details
              </h3>

              <div className="space-y-3.5 text-xs text-[#55645D]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#E3262E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#071F52] block">
                      {customer.fullName}
                    </span>
                    <span>{customer.addressLine}</span>
                    <span className="block">{customer.locality}</span>
                    <span className="block font-medium text-[#071F52]">
                      {customer.city}, {customer.state} — {customer.pincode}
                    </span>
                    {customer.landmark && (
                      <span className="text-[11px] text-[#94A3B8] block mt-0.5">
                        Landmark: {customer.landmark}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2 border-t border-[#E2E8F0]">
                  <Phone className="w-4 h-4 text-[#E3262E] shrink-0" />
                  <span>+91 {customer.phone}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#E3262E] shrink-0" />
                  <span>{customer.email}</span>
                </div>
              </div>
            </div>

            {/* Financial Invoice Breakdown */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
                <h3 className="text-sm font-serif font-bold text-[#071F52]">
                  Payment & Invoice Summary
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#DBEAFE] text-[#0A2E73]">
                  {paymentStatus}
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-[#55645D]">
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="font-semibold text-[#071F52] uppercase tracking-wider text-[11px]">
                    {paymentMethod === 'cod' ? 'Pay on Delivery' : paymentMethod.toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Atelier Subtotal</span>
                  <span className="text-[#071F52]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Promotional Savings</span>
                    <span className="font-semibold">-₹{totalSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>White-Glove In-Bedroom Setup</span>
                  <span className="text-emerald-800 font-semibold uppercase text-[10px]">
                    Complimentary
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-[#94A3B8]">
                  <span>GST (18%) & Luxury Surcharge</span>
                  <span>Included</span>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] flex items-baseline justify-between font-serif">
                  <span className="text-sm font-bold text-[#071F52]">Total Amount</span>
                  <span className="text-xl font-bold text-[#0A2E73]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Concierge Contact */}
            <div className="p-5 rounded-2xl bg-white/70 border border-[#E2E8F0] text-xs text-[#55645D] space-y-2">
              <div className="flex items-center gap-2 text-[#071F52] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#E3262E]" />
                <span>Mindfree Private Client Concierge</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Need to amend delivery timing, coordinate building elevator access, or request special mattress placement instructions?
              </p>
              <div className="flex flex-wrap gap-4 pt-1 font-semibold text-[#0A2E73]">
                <a href="tel:+918047189900" className="hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#E3262E]" /> +91 80 4718 9900
                </a>
                <a href="mailto:concierge@mindfree.in" className="hover:underline flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#E3262E]" /> concierge@mindfree.in
                </a>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="pt-2 flex flex-col gap-2.5 print:hidden">
              <button
                type="button"
                onClick={() => navigateToAccount(order.orderId, 'tracking')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] font-semibold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Truck className="w-4 h-4 text-[#E3262E]" />
                <span>Track in Customer Sanctuary</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={navigateToAdmin}
                className="w-full py-2.5 px-6 rounded-2xl bg-white hover:bg-[#F8FAFC] text-[#0A2E73] font-semibold text-xs border border-[#CCD8CA] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>View Atelier Dispatch Center</span>
              </button>

              <button
                type="button"
                onClick={navigateToHome}
                className="w-full py-2 px-6 rounded-2xl bg-transparent hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#071F52] font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Return to Mindfree Collection</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
