import React, { useState } from 'react';
import {
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  Truck,
  Moon,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useHomePageContent } from '../../context/HomePageContentContext';

// Precision Social Media SVG Icons
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const PinterestIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="8" x2="12" y2="16" />
    <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0" />
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface FooterLinkItem {
  name: string;
  action: string;
  badge?: string;
}

interface FooterNavGroup {
  id: string;
  title: string;
  links: FooterLinkItem[];
}

const FOOTER_NAV_GROUPS: FooterNavGroup[] = [
  {
    id: 'shop',
    title: 'MATTRESSES & SLEEP',
    links: [
      { name: 'All 14 Mattresses', action: 'mattresses:all' },
      { name: 'Orthopedic & Back Support', action: 'mattresses:orthopedic', badge: 'Popular' },
      { name: 'Foam Mattresses', action: 'mattresses:foam' },
      { name: 'Spring Mattresses', action: 'mattresses:spring' },
      { name: 'Latex & Hybrid Mattresses', action: 'mattresses:latex' },
      { name: 'Cooling Technology', action: 'mattresses:cooling', badge: 'New' },
      { name: 'Ergonomic Pillows', action: 'pillows' },
    ],
  },
  {
    id: 'discover',
    title: 'EXPLORE MINDFREE',
    links: [
      { name: 'Home Sanctuary', action: 'home' },
      { name: 'Why Mindfree (Our Story)', action: 'our-story' },
      { name: 'Shop By Room', action: 'scroll:shop-by-room' },
      { name: 'Mattress Finder Quiz', action: 'mattress-finder' },
      { name: 'Customer Reviews (4.9★)', action: 'scroll:why-choose-mindfree' },
      { name: 'Store Locator', action: 'store-locator' },
    ],
  },
  {
    id: 'customer-care',
    title: 'CUSTOMER CARE',
    links: [
      { name: 'My Account & Orders', action: 'account:orders' },
      { name: 'Track Order Status', action: 'account:tracking' },
      { name: 'My Wishlist', action: 'wishlist' },
      { name: '100-Night Risk-Free Trial', action: 'contact' },
      { name: '10-Year Warranty Claim', action: 'contact' },
      { name: 'Contact Sleep Concierge', action: 'contact' },
      { name: 'Atelier Dispatch Center', action: 'admin' },
    ],
  },
];

export const MindfreeFooter: React.FC = () => {
  const {
    navigateToHome,
    navigateToMattresses,
    navigateToPillows,
    navigateToOurStory,
    navigateToContact,
    navigateToStoreLocator,
    navigateToMattressFinder,
    navigateToWishlist,
    navigateToAdmin,
    navigateToAccount,
  } = useNavigation();
  const { footerData } = useHomePageContent();

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    shop: false,
    discover: false,
    'customer-care': false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const cleanEmail = email.trim();
    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, source: 'footer' }),
    }).catch((err) => console.warn('PostgreSQL newsletter save warning:', err));
    setSubscribed(true);
    setEmail('');
  };

  const handleFooterAction = (e: React.MouseEvent, action: string) => {
    e.preventDefault();
    if (action === 'home') {
      navigateToHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action.startsWith('mattresses:')) {
      const cat = action.split(':')[1];
      navigateToMattresses(cat);
    } else if (action === 'pillows') {
      navigateToPillows();
    } else if (action === 'our-story') {
      navigateToOurStory();
    } else if (action === 'contact') {
      navigateToContact();
    } else if (action === 'store-locator') {
      navigateToStoreLocator();
    } else if (action === 'mattress-finder') {
      navigateToMattressFinder();
    } else if (action === 'wishlist') {
      navigateToWishlist();
    } else if (action === 'admin') {
      navigateToAdmin();
    } else if (action === 'account:orders') {
      navigateToAccount(undefined, 'orders');
    } else if (action === 'account:tracking') {
      navigateToAccount(undefined, 'tracking');
    } else if (action.startsWith('scroll:')) {
      const targetId = action.split(':')[1];
      navigateToHome();
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  };

  return (
    <footer
      id="mindfree-footer"
      className="w-full bg-gradient-to-b from-[#071F52] via-[#05163B] to-[#030D24] text-[#F8FAFC] relative overflow-hidden select-none border-t border-white/10 pb-[calc(5.25rem+env(safe-area-inset-bottom))] lg:pb-0"
      aria-labelledby="footer-main-heading"
    >
      <h2 id="footer-main-heading" className="sr-only">
        Mindfree Premium Sleep Systems Footer
      </h2>

      {/* Top Crimson-to-Navy Accent Hairline */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#0A2E73] via-[#E3262E] to-[#0A2E73]" />

      {/* Ambient Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-[480px] h-[480px] bg-[#1244A8]/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-[#E3262E]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. TOP TRUST PROMISE & NEWSLETTER BANNER STRIP */}
        <div className="py-8 sm:py-10 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: 4 Brand Promise Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 flex-1">
            {(footerData.promiseBadges?.length ? footerData.promiseBadges : [
              { title: '100 Nights Trial', sub: 'Risk-free home sleep test' },
              { title: '10 Years Warranty', sub: 'Direct factory protection' },
              { title: 'Free Pan-India Ship', sub: 'Safe doorstep delivery' },
              { title: '100% Certified Safe', sub: 'Zero toxic chemicals' },
            ]).map((item, idx) => {
              const promiseIcons = [Moon, ShieldCheck, Truck, Sparkles];
              const Icon = promiseIcons[idx % promiseIcons.length];
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#E3262E]/15 border border-[#E3262E]/30 flex items-center justify-center text-[#E3262E] shrink-0">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-[12.5px] font-bold text-white leading-tight">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#94A3B8] mt-0.5 leading-tight">
                      {item.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Compact Newsletter Subscription */}
          <div className="w-full lg:w-[420px] shrink-0 bg-white/[0.04] border border-white/10 rounded-2xl p-4">
            <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-white mb-1">
              {footerData.newsletter.heading}
            </div>
            <p className="text-[11.5px] text-[#94A3B8] mb-3">
              {footerData.newsletter.subtext}
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 py-2.5 px-3.5 min-h-[48px] rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{footerData.newsletter.successMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={footerData.newsletter.placeholder}
                  className="flex-1 min-w-0 h-12 min-h-[48px] px-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#E3262E] transition-colors"
                />
                <button
                  type="submit"
                  className="h-12 min-h-[48px] px-4 rounded-xl bg-[#E3262E] hover:bg-[#C81E24] active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shrink-0 shadow-[0_4px_14px_rgba(227,38,46,0.35)]"
                >
                  <span>{footerData.newsletter.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 2. MAIN 5-COLUMN FOOTER DIRECTORY */}
        <div className="py-10 sm:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-7 border-b border-white/10">
          {/* Column 1: Brand Identity, Logo, Certifications & Socials (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Crisp White Logo Pill so the Navy & Red Logo Pops */}
            <a
              href="/"
              onClick={(e) => handleFooterAction(e, 'home')}
              className="inline-flex items-center bg-white px-4 py-2 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <img
                src={footerData.brand.logoUrl || '/images/mindfree_logo_transparent.png?v=2'}
                alt="MIND FREE MATTRESS"
                className="h-10 w-auto object-contain"
              />
            </a>

            <p className="text-[13px] text-[#CBD5E1] leading-relaxed">
              {footerData.brand.description}
            </p>

            {/* Certification Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              {footerData.brand.certifications.map((cert, idx) => (
                <span
                  key={`${cert}-${idx}`}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-[10.5px] font-semibold text-[#E2E8F0]"
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* Social Media Row */}
            <div className="pt-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8] block mb-2.5">
                {footerData.brand.socialHeading}
              </span>
              <div className="flex items-center gap-2.5">
                {footerData.brand.socials.map((soc, idx) => {
                  const socialIconMap: Record<string, React.FC<{ className?: string }>> = {
                    instagram: InstagramIcon,
                    facebook: FacebookIcon,
                    pinterest: PinterestIcon,
                    youtube: YoutubeIcon,
                    linkedin: LinkedinIcon,
                  };
                  const Icon =
                    socialIconMap[soc.label.toLowerCase()] ||
                    [InstagramIcon, FacebookIcon, PinterestIcon, YoutubeIcon, LinkedinIcon][
                      idx % 5
                    ];
                  return (
                    <a
                      key={`${soc.label}-${idx}`}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Mindfree on ${soc.label}`}
                      className="w-12 h-12 sm:w-10 sm:h-10 min-w-[48px] min-h-[48px] sm:min-w-0 sm:min-h-0 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-[#E3262E] hover:border-[#E3262E] active:scale-95 flex items-center justify-center text-white transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columns 2-4: Navigation Links (6 Cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {(footerData.navGroups?.length ? footerData.navGroups : FOOTER_NAV_GROUPS).map((group) => {
              const isOpen = openSections[group.id];

              return (
                <div key={group.id} className="border-b sm:border-b-0 border-white/10 pb-2 sm:pb-0">
                  <button
                    type="button"
                    onClick={() => toggleSection(group.id)}
                    className="w-full sm:w-auto min-h-[48px] sm:min-h-0 flex items-center justify-between text-left sm:cursor-default py-2 sm:py-0 focus:outline-none active:opacity-80"
                    aria-expanded={isOpen}
                  >
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.14em] text-white flex items-center gap-2 sm:mb-4">
                      <span className="w-1.5 h-3.5 rounded-full bg-[#E3262E] inline-block" />
                      <span>{group.title}</span>
                    </h4>
                    <ChevronDown
                      className={`w-4 h-4 text-[#E3262E] sm:hidden transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <ul
                    className={`space-y-2.5 text-[13px] text-[#CBD5E1] pt-2 sm:pt-0 ${
                      isOpen ? 'block' : 'hidden sm:block'
                    }`}
                  >
                    {group.links.map((link, lIdx) => (
                      <li key={`${link.name}-${lIdx}`}>
                        <a
                          href={`#${link.action}`}
                          onClick={(e) => handleFooterAction(e, link.action)}
                          className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 py-0.5 cursor-pointer"
                        >
                          <span>{link.name}</span>
                          {link.badge && (
                            <span className="px-1.5 py-0.2 rounded-full bg-[#E3262E] text-white text-[9.5px] font-bold uppercase">
                              {link.badge}
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Column 5: Concierge & Showrooms Card (3 Cols) */}
          <div className="lg:col-span-3 lg:pl-5 lg:border-l border-white/10 space-y-4">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.14em] text-white flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#E3262E] inline-block" />
              <span>{footerData.concierge.heading}</span>
            </h4>

            <div className="space-y-3 text-[13px]">
              <a
                href={`tel:${footerData.concierge.phoneHref}`}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#E3262E]/50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#E3262E]/15 border border-[#E3262E]/30 flex items-center justify-center text-[#E3262E] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white font-semibold block">
                    {footerData.concierge.phoneDisplay}
                  </span>
                  <span className="text-[11px] text-[#94A3B8]">
                    {footerData.concierge.phoneHours}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${footerData.concierge.emailDisplay}`}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#E3262E]/50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#E3262E]/15 border border-[#E3262E]/30 flex items-center justify-center text-[#E3262E] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white font-semibold block">
                    {footerData.concierge.emailDisplay}
                  </span>
                  <span className="text-[11px] text-[#94A3B8]">
                    {footerData.concierge.emailSubtext}
                  </span>
                </div>
              </a>

              <div
                onClick={(e) => handleFooterAction(e, 'store-locator')}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#E3262E]/50 transition-colors cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#E3262E]/15 border border-[#E3262E]/30 flex items-center justify-center text-[#E3262E] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white font-semibold flex items-center gap-1 group-hover:text-[#E3262E] transition-colors">
                    <span>{footerData.concierge.showroomsTitle}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-[#94A3B8] block mt-0.5">
                    {footerData.concierge.showroomsLocations}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM COPYRIGHT, PAYMENT BADGES & LEGAL BAR */}
        <div className="py-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-[12px] text-[#94A3B8]">
          <div>
            © {new Date().getFullYear()}{' '}
            <span className="text-white font-semibold">
              {footerData.bottomBar.copyrightBrand}
            </span>{' '}
            {footerData.bottomBar.copyrightSuffix}
          </div>

          {/* Accepted Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] text-[#94A3B8] mr-1">
              {footerData.bottomBar.paymentLabel}
            </span>
            {footerData.bottomBar.paymentMethods.map((pay, idx) => (
              <span
                key={`${pay}-${idx}`}
                className="px-2.5 py-0.5 rounded-md bg-white/[0.07] border border-white/10 text-[10.5px] font-semibold text-[#E2E8F0]"
              >
                {pay}
              </span>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[12px]">
            {footerData.bottomBar.legalLinks.map((lnk, idx) => (
              <React.Fragment key={`${lnk.label}-${idx}`}>
                {idx > 0 && <span className="w-1 h-1 rounded-full bg-white/25" />}
                <a
                  href={`#${lnk.action}`}
                  onClick={(e) => handleFooterAction(e, lnk.action)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lnk.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
