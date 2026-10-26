import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  Send,
  MessageSquare,
  ShieldCheck,
  RotateCcw,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useHomePageContent } from '../../context/HomePageContentContext';

export const MindfreeContactPage: React.FC = () => {
  const { navigateToAccount } = useNavigation();
  const { contactData } = useHomePageContent();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: contactData.formConfig.subjectOptions[0] || 'Product Consultation & Sizing',
    message: '',
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `CNQ-${Math.floor(100000 + Math.random() * 900000)}`;
      const enquiry = {
        id: ticketId,
        ...form,
        submittedAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem('mindfree_contact_enquiries_v1') || '[]');
        localStorage.setItem('mindfree_contact_enquiries_v1', JSON.stringify([enquiry, ...existing]));
      } catch {}

      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      }).catch((err) => console.warn('PostgreSQL inquiry save warning:', err));

      setIsSubmitting(false);
      setSubmittedId(ticketId);
    }, 600);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* 1. HERO BANNER */}
      <section className="relative bg-[#0A2E73] text-[#F8FAFC] pt-14 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#1244A8] via-[#0A2E73] to-[#071F52] opacity-90 pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-[#E3262E]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1520px] mx-auto max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold tracking-wider uppercase text-white">
            <Phone className="w-3.5 h-3.5 text-white" />
            <span>{contactData.hero.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {contactData.hero.headlineMain}{' '}
            <span className="font-bold text-white">{contactData.hero.headlineHighlight}</span>
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans">
            {contactData.hero.description}
          </p>
        </div>
      </section>

      {/* 2. REASSURANCE STRIP */}
      <section className="bg-white border-b border-[#E2E8F0] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1520px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#0F2952]">
            <Clock className="w-4 h-4 text-[#E3262E] shrink-0" />
            <span>{contactData.reassuranceItems[0]}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#0F2952]">
            <ShieldCheck className="w-4 h-4 text-[#E3262E] shrink-0" />
            <span>{contactData.reassuranceItems[1]}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#0F2952]">
            <RotateCcw className="w-4 h-4 text-[#E3262E] shrink-0" />
            <span>{contactData.reassuranceItems[2]}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#0F2952]">
            <Truck className="w-4 h-4 text-[#E3262E] shrink-0" />
            <span>{contactData.reassuranceItems[3]}</span>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM & DIRECT CHANNELS */}
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Concierge Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#E3262E] font-bold">
                {contactData.channelsHeader.eyebrow}
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#071F52] mt-1">
                {contactData.channelsHeader.title}
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                {contactData.channelsHeader.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {/* Phone Card */}
              <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] flex items-start gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-[#DBEAFE] text-[#0A2E73] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#071F52]">{contactData.phoneCard.title}</h4>
                  <a
                    href={`tel:${contactData.phoneCard.phoneHref.replace(/^tel:/i, '')}`}
                    className="font-mono text-sm font-bold text-[#0A2E73] hover:underline block mt-0.5"
                  >
                    {contactData.phoneCard.phoneDisplay}
                  </a>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    {contactData.phoneCard.hoursText}
                  </p>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] flex items-start gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#071F52]">{contactData.whatsappCard.title}</h4>
                  <a
                    href={contactData.whatsappCard.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm font-bold text-emerald-700 hover:underline block mt-0.5"
                  >
                    {contactData.whatsappCard.numberDisplay}
                  </a>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    {contactData.whatsappCard.subtitle}
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] flex items-start gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-[#F8FAFC] text-[#E3262E] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#071F52]">{contactData.emailCard.title}</h4>
                  <a
                    href={`mailto:${contactData.emailCard.emailDisplay}`}
                    className="font-mono text-xs font-semibold text-[#0A2E73] hover:underline block mt-0.5"
                  >
                    {contactData.emailCard.emailDisplay}
                  </a>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    {contactData.emailCard.subtitle}
                  </p>
                </div>
              </div>

              {/* Headquarters */}
              <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] flex items-start gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-[#DBEAFE] text-[#0A2E73] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#071F52]">{contactData.headquartersCard.title}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                    {contactData.headquartersCard.address}
                  </p>
                </div>
              </div>

              {/* Order Tracking Shortcut */}
              <div className="bg-[#0A2E73] text-white p-5 rounded-3xl shadow-sm space-y-2">
                <h4 className="font-serif text-sm font-bold">{contactData.orderTrackingCard.title}</h4>
                <p className="text-xs text-white/75 leading-relaxed">
                  {contactData.orderTrackingCard.description}
                </p>
                <button
                  type="button"
                  onClick={() => navigateToAccount(undefined, 'tracking')}
                  className="mt-2 py-2 px-4 rounded-xl bg-[#E3262E] hover:bg-[#C81E25] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>{contactData.orderTrackingCard.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
            {submittedId ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#071F52]">
                  {contactData.formConfig.confirmationTitle}
                </h3>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-[#071F52]">{form.name}</span>. A senior
                  sleep consultant has received your message and will respond via{' '}
                  <span className="font-bold text-[#0A2E73]">{form.email}</span> shortly.
                </p>
                <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0] font-mono text-xs text-[#E3262E] font-bold inline-block">
                  Enquiry Reference: {submittedId}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedId(null);
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        subject: contactData.formConfig.subjectOptions[0] || 'Product Consultation & Sizing',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#0A2E73] text-white text-xs font-semibold cursor-pointer"
                  >
                    Submit Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E3262E] font-bold">
                    {contactData.formConfig.eyebrow}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#071F52] mt-1">
                    {contactData.formConfig.title}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    {contactData.formConfig.subtitle}
                  </p>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-medium text-[#0F2952] mb-1">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Siddharth Nair"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2E73]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-medium text-[#0F2952] mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="siddharth@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2E73]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#0F2952] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2E73]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-[#0F2952] mb-1">Inquiry Purpose</label>
                    <select
                      aria-label="Inquiry purpose"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2E73] cursor-pointer"
                    >
                      {contactData.formConfig.subjectOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#0F2952] mb-1">
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please describe your mattress requirements, dimensions, or questions..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2E73]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] disabled:opacity-60 text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Transmitting Message...' : contactData.formConfig.submitButtonText}</span>
                  </button>
                  <p className="text-[10.5px] text-center text-[#64748B] mt-2">
                    {contactData.formConfig.privacyNote}
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};
