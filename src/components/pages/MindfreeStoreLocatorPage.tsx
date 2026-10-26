import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Compass,
  Calendar,
  Check,
  X,
} from 'lucide-react';

interface AtelierStore {
  id: string;
  city: string;
  name: string;
  address: string;
  locality: string;
  phone: string;
  hours: string;
  features: string[];
  mapsUrl: string;
  image: string;
}

const STORES: AtelierStore[] = [
  {
    id: 'bengaluru',
    city: 'Bengaluru',
    name: 'Mindfree Flagship Atelier — Indiranagar',
    locality: '100 Feet Road, Indiranagar',
    address: 'No. 742, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    phone: '+91 80 4719 3201',
    hours: 'Monday – Sunday: 10:00 AM – 9:00 PM',
    features: ['Private Sleep Test Pods', 'Complete Material Cutaway Bar', 'Cervical Ergonomics Lab', 'Artisan Espresso Lounge'],
    mapsUrl: 'https://maps.google.com/?q=Indiranagar+Bengaluru',
    image: '/images/mindfree/showroom/showroom-gallery.webp',
  },
  {
    id: 'mumbai',
    city: 'Mumbai',
    name: 'Mindfree Design Sanctuary — Bandra West',
    locality: 'Waterfield Road, Bandra',
    address: 'Ground Floor, Signature Enclave, Waterfield Road, Bandra West, Mumbai, Maharashtra 400050',
    phone: '+91 22 6902 4410',
    hours: 'Monday – Sunday: 10:30 AM – 9:00 PM',
    features: ['Bespoke Custom Bedding Suite', 'Organic Latex Material Bar', 'Acoustic Silent Sleep Chamber', 'Valet Parking Available'],
    mapsUrl: 'https://maps.google.com/?q=Bandra+West+Mumbai',
    image: '/images/mindfree/showroom/latex-display.webp',
  },
  {
    id: 'delhi',
    city: 'New Delhi',
    name: 'Mindfree Sleep Gallery — Mehrauli Design District',
    locality: 'MG Road / Sultanpur',
    address: 'Khasra 348, Sultanpur, MG Road, Design District, New Delhi 110030',
    phone: '+91 11 4983 2100',
    hours: 'Monday – Sunday: 10:00 AM – 8:00 PM',
    features: ['Architectural Showroom Floor', 'Thermal Cooling Comparison Unit', 'White-Glove Delivery Concierge', 'Complimentary Parking'],
    mapsUrl: 'https://maps.google.com/?q=MG+Road+Delhi',
    image: '/images/mindfree/showroom/memory-foam-display.webp',
  },
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    name: 'Mindfree Atelier Lounge — Jubilee Hills',
    locality: 'Road No. 36, Jubilee Hills',
    address: 'Plot 481, Road No. 36, CBI Colony, Jubilee Hills, Hyderabad, Telangana 500033',
    phone: '+91 40 6821 5500',
    hours: 'Monday – Sunday: 10:00 AM – 9:00 PM',
    features: ['7-Zone Spine Alignment Clinic', 'Pocket Spring Acoustic Lab', 'Organic Fiber Tactile Bar', 'Private VIP Suite'],
    mapsUrl: 'https://maps.google.com/?q=Jubilee+Hills+Hyderabad',
    image: '/images/mindfree/showroom/spring-display.webp',
  },
];

export const MindfreeStoreLocatorPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [bookingStore, setBookingStore] = useState<AtelierStore | null>(null);

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '11:00 AM',
    postureInterest: 'Orthopedic Spine Alignment',
  });
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);

  const filteredStores = STORES.filter((s) => {
    if (selectedCity === 'all') return true;
    return s.city.toLowerCase() === selectedCity.toLowerCase();
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.date) return;

    const appointmentId = `APT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newAppointment = {
      id: appointmentId,
      store: bookingStore?.name,
      ...bookingForm,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('mindfree_store_appointments_v1') || '[]');
      localStorage.setItem('mindfree_store_appointments_v1', JSON.stringify([newAppointment, ...existing]));
    } catch {}

    setBookingConfirmed(appointmentId);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* 1. HERO BANNER */}
      <section className="relative bg-[#0A2E73] text-[#F8FAFC] pt-14 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#1244A8] via-[#0A2E73] to-[#071F52] opacity-90 pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#E3262E]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1520px] mx-auto max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono tracking-widest uppercase text-[#E3262E]">
            <MapPin className="w-3.5 h-3.5 text-[#E3262E]" />
            <span>Atelier Showroom & Sanctuary Network</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            Experience Mindfree in Person,{' '}
            <span className="italic font-light text-[#E3262E]">In Pure Tranquility.</span>
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans">
            Our atelier galleries are designed as private sanctuaries—not bustling retail floors.
            Step into quiet test pods, touch certified organic raw fibers, and receive personalized
            posture consultations from our ergonomics team.
          </p>
        </div>
      </section>

      {/* 2. CITY FILTER PILLS */}
      <section className="sticky top-[66px] sm:top-[72px] z-20 bg-[#F8FAFC]/95 backdrop-blur-md border-b border-[#E2E8F0] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1520px] mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
          {['all', 'Bengaluru', 'Mumbai', 'New Delhi', 'Hyderabad'].map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCity === city
                  ? 'bg-[#0A2E73] text-[#F8FAFC] shadow-xs'
                  : 'bg-white text-[#64748B] hover:text-[#0A2E73] border border-[#E2E8F0]'
              }`}
            >
              {city === 'all' ? 'All Ateliers' : city}
            </button>
          ))}
        </div>
      </section>

      {/* 3. ATELIER STORES LIST */}
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-3xl border border-[#E2E8F0] hover:border-[#E3262E]/50 overflow-hidden shadow-xs hover:shadow-[0_16px_40px_rgba(10,46,115,0.08)] transition-all flex flex-col group"
            >
              {/* Showroom Photo */}
              <div className="relative h-64 bg-[#F8FAFC] overflow-hidden">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-[10px] font-bold uppercase tracking-wider">
                    {store.city} Atelier
                  </span>
                </div>
              </div>

              {/* Showroom Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#071F52]">{store.name}</h3>
                    <p className="text-xs text-[#E3262E] font-medium mt-0.5">{store.locality}</p>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed">{store.address}</p>

                  <div className="space-y-1.5 pt-1 text-xs text-[#0F2952]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#E3262E] shrink-0" />
                      <span>{store.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#E3262E] shrink-0" />
                      <span>{store.phone}</span>
                    </div>
                  </div>

                  {/* Amenities Badges */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {store.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[10.5px] text-[#0F2952]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#E2E8F0] grid grid-cols-2 gap-2">
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl border border-[#0A2E73] text-[#0A2E73] hover:bg-[#F8FAFC] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setBookingStore(store);
                      setBookingConfirmed(null);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Private Visit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BOOKING MODAL */}
      {bookingStore && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setBookingStore(null)}
              className="absolute top-5 right-5 p-1 rounded-xl text-[#64748B] hover:text-[#0A2E73] hover:bg-[#F8FAFC] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#071F52]">
                  Atelier Consultation Confirmed
                </h3>
                <p className="text-xs text-[#64748B] max-w-xs mx-auto leading-relaxed">
                  Your private sleep consultation at{' '}
                  <span className="font-bold text-[#0A2E73]">{bookingStore.name}</span> has been
                  scheduled for{' '}
                  <span className="font-bold text-[#071F52]">
                    {bookingForm.date} at {bookingForm.time}
                  </span>
                  .
                </p>
                <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0] font-mono text-xs text-[#E3262E] font-bold">
                  Reference: {bookingConfirmed}
                </div>
                <button
                  type="button"
                  onClick={() => setBookingStore(null)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#0A2E73] text-white text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E3262E] font-bold">
                    Private Appointment
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#071F52]">
                    Reserve Sleep Consultation
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">{bookingStore.name}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-[#0F2952] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2E73]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-[#0F2952] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2E73]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#0F2952] mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="radhika@example.com"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2E73]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-[#0F2952] mb-1">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2E73]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#0F2952] mb-1">Preferred Time</label>
                      <select
                        aria-label="Select appointment time slot"
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:border-[#0A2E73]"
                      >
                        <option>11:00 AM</option>
                        <option>01:00 PM</option>
                        <option>03:30 PM</option>
                        <option>05:00 PM</option>
                        <option>07:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-md"
                  >
                    Confirm Private Appointment
                  </button>
                  <p className="text-[10.5px] text-center text-[#64748B] mt-2">
                    Complimentary valet parking & artisan espresso included.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
