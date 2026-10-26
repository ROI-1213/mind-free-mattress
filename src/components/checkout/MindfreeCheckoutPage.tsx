import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Truck,
  CheckCircle2,
  CreditCard,
  QrCode,
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  Clock,
  Sparkles,
  ShoppingBag,
  Info,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import {
  createOrder,
  lookupPincode,
} from '../../services/orderService';
import type {
  PaymentMethodType,
  CustomerDeliveryInfo,
} from '../../services/orderService';
import { MATTRESS_PRODUCTS } from '../../data/pdpData';

export const MindfreeCheckoutPage: React.FC = () => {
  const { items, subtotal, totalSavings, clearCart, addToCart } = useCart();
  const { navigateToCart, navigateToOrderConfirmation, navigateToHome } = useNavigation();
  const { user } = useAuth();
  const defaultAddr = user?.savedAddresses?.find((a) => a.isDefault) || user?.savedAddresses?.[0];

  // Contact & Delivery State
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    addressLine: defaultAddr?.addressLine || '',
    locality: defaultAddr?.locality || '',
    pincode: defaultAddr?.pincode || '',
    city: defaultAddr?.city || '',
    state: defaultAddr?.state || '',
    landmark: defaultAddr?.landmark || '',
    billingSameAsShipping: true,
    billingFullName: '',
    billingAddressLine: '',
    billingCity: '',
    billingState: '',
    billingPincode: '',
  });

  // Delivery estimation state
  const [pincodeLookup, setPincodeLookup] = useState<{
    city: string;
    state: string;
    days: number;
  } | null>(null);

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('upi');
  const [upiId, setUpiId] = useState('');
  const [upiVerified, setUpiVerified] = useState(false);

  // Card details state
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });

  // Selected bank for Net Banking
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Submission & Validation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Pincode lookup on change
  const handlePincodeChange = (pin: string) => {
    const cleaned = pin.replace(/\D/g, '').slice(0, 6);
    setFormData((prev) => ({ ...prev, pincode: cleaned }));

    if (cleaned.length === 6) {
      const result = lookupPincode(cleaned);
      if (result) {
        setPincodeLookup(result);
        setFormData((prev) => ({
          ...prev,
          pincode: cleaned,
          city: prev.city || result.city,
          state: prev.state || result.state,
        }));
        if (formErrors.pincode) {
          setFormErrors((prev) => ({ ...prev, pincode: '' }));
        }
      } else {
        setPincodeLookup(null);
      }
    } else {
      setPincodeLookup(null);
    }
  };

  // Card formatting
  const handleCardNumberChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    setCardData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      setCardData((prev) => ({
        ...prev,
        expiry: `${digits.slice(0, 2)}/${digits.slice(2)}`,
      }));
    } else {
      setCardData((prev) => ({ ...prev, expiry: digits }));
    }
  };

  // Card brand detection
  const getCardBrand = () => {
    const clean = cardData.cardNumber.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(clean)) return 'Mastercard';
    if (/^(60|65|81|82)/.test(clean)) return 'RuPay';
    if (/^3[47]/.test(clean)) return 'American Express';
    return null;
  };

  // Quick fallback if user directly opens checkout with 0 items
  const handleLoadDemoMattress = () => {
    const demo = MATTRESS_PRODUCTS['orthopedic'];
    if (demo) {
      addToCart(
        {
          id: demo.id,
          sku: `${demo.sizes[1].sku}-10`,
          name: demo.name,
          size: 'Queen (78" × 60")',
          thickness: '10 Inch (25 cm)',
          price: demo.sizes[1].price + 4500,
          originalPrice: demo.sizes[1].originalPrice + 6000,
          image: demo.gallery[0].url,
        },
        1
      );
    }
  };

  // Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = 'Please enter a valid email address for invoice';
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10)
      errors.phone = 'Please enter a valid 10-digit mobile number';
    if (!formData.addressLine.trim())
      errors.addressLine = 'Please enter house/flat no. and street name';
    if (!formData.locality.trim()) errors.locality = 'Please enter your locality / area';
    if (!formData.pincode.trim() || formData.pincode.length !== 6)
      errors.pincode = 'Please enter a valid 6-digit Indian PIN code';
    if (!formData.city.trim()) errors.city = 'Please enter your city';
    if (!formData.state.trim()) errors.state = 'Please enter your state';

    // Payment validation
    if (paymentMethod === 'upi' && !upiId.trim()) {
      errors.payment = 'Please enter your UPI ID (e.g. yourname@okhdfcbank)';
    } else if (paymentMethod === 'card') {
      if (cardData.cardNumber.replace(/\s/g, '').length < 16) {
        errors.payment = 'Please enter a complete 16-digit card number';
      } else if (!cardData.cardHolder.trim()) {
        errors.payment = 'Please enter the cardholder name';
      } else if (!cardData.expiry || cardData.expiry.length < 5) {
        errors.payment = 'Please enter card expiry (MM/YY)';
      } else if (cardData.cvv.length < 3) {
        errors.payment = 'Please enter 3-digit CVV';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Place order
  const handlePlaceOrder = () => {
    if (!validateForm()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const customerInfo: CustomerDeliveryInfo = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      addressLine: formData.addressLine,
      locality: formData.locality,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      landmark: formData.landmark || undefined,
      billingSameAsShipping: formData.billingSameAsShipping,
      billingAddress: formData.billingSameAsShipping
        ? undefined
        : {
            fullName: formData.billingFullName || formData.fullName,
            addressLine: formData.billingAddressLine,
            city: formData.billingCity,
            state: formData.billingState,
            pincode: formData.billingPincode,
          },
    };

    const orderSnapshots = items.map((i) => ({
      id: i.id,
      sku: i.sku,
      name: i.name,
      size: i.size,
      thickness: i.thickness,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
    }));

    setTimeout(() => {
      const newOrder = createOrder(
        customerInfo,
        orderSnapshots,
        paymentMethod,
        paymentMethod === 'cod' ? 'Pay on Delivery' : 'Paid'
      );

      clearCart();
      setIsSubmitting(false);
      navigateToOrderConfirmation(newOrder.orderId);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#F8FAFC] min-h-[90vh] py-8 sm:py-12 select-none font-sans text-[#071F52]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0] mb-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={navigateToCart}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2E73] hover:text-[#E3262E] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Bag</span>
            </button>
            <span className="text-[#E3262E]">•</span>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#94A3B8]">
              Mindfree Atelier Checkout
            </span>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium">
            <button
              type="button"
              onClick={navigateToCart}
              className="flex items-center gap-1.5 text-[#0A2E73] cursor-pointer hover:underline"
            >
              <span className="w-5 h-5 rounded-full bg-[#0A2E73]/10 text-[#0A2E73] text-[10px] font-bold flex items-center justify-center">
                ✓
              </span>
              <span>1. Bag</span>
            </button>
            <span className="text-[#D1C9BE]">———</span>
            <div className="flex items-center gap-1.5 text-[#0A2E73] font-bold">
              <span className="w-5 h-5 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-[10px] font-bold flex items-center justify-center">
                2
              </span>
              <span>Address & Concierge</span>
            </div>
            <span className="text-[#D1C9BE]">———</span>
            <div className="flex items-center gap-1.5 text-[#94A3B8]">
              <span className="w-5 h-5 rounded-full bg-[#E2E8F0] text-[#64748B] text-[10px] font-bold flex items-center justify-center">
                3
              </span>
              <span>Payment</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-[#55645D]">
            <Lock className="w-3.5 h-3.5 text-[#E3262E]" />
            <span>256-Bit SSL Encrypted Atelier Protocol</span>
          </div>
        </div>

        {/* Empty Cart Handling */}
        {items.length === 0 ? (
          <div className="max-w-xl mx-auto my-12 text-center p-8 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm">
            <ShoppingBag className="w-12 h-12 text-[#E3262E] mx-auto mb-4 stroke-1" />
            <h2 className="text-2xl font-serif text-[#071F52] mb-2">Your Bag is Empty</h2>
            <p className="text-xs sm:text-sm text-[#64748B] mb-6">
              You haven't added a mattress to your order yet. Add your preferred model to experience our white-glove delivery checkout.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleLoadDemoMattress}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#E3262E]" />
                <span>Load Featured Ortho-Spine Mattress</span>
              </button>
              <button
                type="button"
                onClick={navigateToHome}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-transparent hover:bg-[#F8FAFC] text-[#0A2E73] text-xs font-semibold border border-[#E2E8F0] transition-all cursor-pointer"
              >
                Explore Catalogue
              </button>
            </div>
          </div>
        ) : (
          /* Main 2-Column Checkout Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Form Details (7 Columns) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Section 1: Customer Contact */}
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0] mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#0A2E73]/10 text-[#0A2E73] flex items-center justify-center font-serif font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#071F52]">
                      Customer Contact
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      Order tracking and digital tax invoice will be sent here
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#071F52] mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                      <input
                        type="text"
                        placeholder="e.g. Aarav Singhania"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className={`w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-[#F8FAFC] border ${
                          formErrors.fullName ? 'border-red-500' : 'border-[#E2E8F0]'
                        } focus:border-[#0A2E73] focus:bg-white outline-none transition-all`}
                      />
                    </div>
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#071F52] mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                      <input
                        type="email"
                        placeholder="aarav@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-[#F8FAFC] border ${
                          formErrors.email ? 'border-red-500' : 'border-[#E2E8F0]'
                        } focus:border-[#0A2E73] focus:bg-white outline-none transition-all`}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#071F52] mb-1.5">
                      Mobile Number (for Concierge) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                      <input
                        type="tel"
                        placeholder="98201 45678"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                          })
                        }
                        className={`w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-[#F8FAFC] border ${
                          formErrors.phone ? 'border-red-500' : 'border-[#E2E8F0]'
                        } focus:border-[#0A2E73] focus:bg-white outline-none transition-all`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: White-Glove Delivery Address */}
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0] mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#0A2E73]/10 text-[#0A2E73] flex items-center justify-center font-serif font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#071F52]">
                      White-Glove Delivery Destination
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      Our team unboxes and installs your mattress directly in your bedroom
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* PIN code with Auto-Lookup */}
                  <div>
                    <label className="block text-xs font-semibold text-[#071F52] mb-1.5">
                      Delivery PIN Code * (Try 560001, 400001, 110001)
                    </label>
                    <div className="relative max-w-xs">
                      <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="e.g. 560001"
                        value={formData.pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 text-xs sm:text-sm font-mono tracking-wider rounded-xl bg-[#F8FAFC] border ${
                          formErrors.pincode ? 'border-red-500' : 'border-[#E2E8F0]'
                        } focus:border-[#0A2E73] focus:bg-white outline-none transition-all`}
                      />
                    </div>

                    {/* Pincode Auto-Resolution Banner */}
                    {pincodeLookup && (
                      <div className="mt-2.5 p-3 rounded-xl bg-[#DBEAFE] border border-[#CCD8CA] flex items-center gap-3 text-xs text-[#0A2E73]">
                        <Truck className="w-4 h-4 text-[#0A2E73] shrink-0" />
                        <div>
                          <span className="font-semibold">
                            Eligible for Complimentary White-Glove Setup in{' '}
                            {pincodeLookup.city} ({pincodeLookup.state}).
                          </span>{' '}
                          Estimated delivery within {pincodeLookup.days} business days.
                        </div>
                      </div>
                    )}
                    {formErrors.pincode && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.pincode}</p>
                    )}
                  </div>

                  {/* House / Flat & Street */}
                  <div>
                    <label className="block text-xs font-semibold text-[#071F52] mb-1.5">
                      Apartment, Flat, Floor, Building Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flat 14B, Regency Crest, Lavelle Road"
                      value={formData.addressLine}
                      onChange={(e) =>
                        setFormData({ ...formData, addressLine: e.target.value })
                      }
                      className={`w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#F8FAFC] border ${
                        formErrors.addressLine ? 'border-red-500' : 'border-[#E2E8F0]'
                      } focus:border-[#0A2E73] focus:bg-white outline-none transition-all`}
                    />
                    {formErrors.addressLine && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.addressLine}</p>
                    )}
                  </div>

                  {/* Locality & Landmark */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#071F52] mb-1.5">
                        Area / Locality *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Shanthala Nagar / Indiranagar"
                        value={formData.locality}
                        onChange={(e) =>
                          setFormData({ ...formData, locality: e.target.value })
                        }
                        className={`w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#F8FAFC] border ${
                          formErrors.locality ? 'border-red-500' : 'border-[#E2E8F0]'
                        } focus:border-[#0A2E73] focus:bg-white outline-none transition-all`}
                      />
                      {formErrors.locality && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.locality}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#071F52] mb-1.5">
                        Prominent Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Near UB City / Opposite Park"
                        value={formData.landmark}
                        onChange={(e) =>
                          setFormData({ ...formData, landmark: e.target.value })
                        }
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0A2E73] focus:bg-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* City & State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#071F52] mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bengaluru"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className={`w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#F8FAFC] border ${
                          formErrors.city ? 'border-red-500' : 'border-[#E2E8F0]'
                        } focus:border-[#0A2E73] focus:bg-white outline-none transition-all`}
                      />
                      {formErrors.city && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#071F52] mb-1.5">
                        State *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Karnataka"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        className={`w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#F8FAFC] border ${
                          formErrors.state ? 'border-red-500' : 'border-[#E2E8F0]'
                        } focus:border-[#0A2E73] focus:bg-white outline-none transition-all`}
                      />
                      {formErrors.state && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.state}</p>
                      )}
                    </div>
                  </div>

                  {/* Billing address toggle */}
                  <div className="pt-2">
                    <label className="flex items-center gap-2.5 text-xs text-[#071F52] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.billingSameAsShipping}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billingSameAsShipping: e.target.checked,
                          })
                        }
                        className="rounded border-[#E2E8F0] text-[#0A2E73] focus:ring-[#0A2E73] w-4 h-4 cursor-pointer"
                      />
                      <span className="font-medium">
                        Billing address is the same as White-Glove delivery address
                      </span>
                    </label>

                    {!formData.billingSameAsShipping && (
                      <div className="mt-4 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                        <h4 className="text-xs font-bold text-[#071F52] uppercase tracking-wider">
                          Separate Billing Address
                        </h4>
                        <div>
                          <input
                            type="text"
                            placeholder="Billing Name or Company Entity"
                            value={formData.billingFullName}
                            onChange={(e) =>
                              setFormData({ ...formData, billingFullName: e.target.value })
                            }
                            className="w-full px-4 py-2.5 text-xs rounded-xl bg-white border border-[#E2E8F0] outline-none"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Billing Address Line"
                            value={formData.billingAddressLine}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                billingAddressLine: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2.5 text-xs rounded-xl bg-white border border-[#E2E8F0] outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="City"
                            value={formData.billingCity}
                            onChange={(e) =>
                              setFormData({ ...formData, billingCity: e.target.value })
                            }
                            className="px-3 py-2 text-xs rounded-xl bg-white border border-[#E2E8F0] outline-none"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={formData.billingState}
                            onChange={(e) =>
                              setFormData({ ...formData, billingState: e.target.value })
                            }
                            className="px-3 py-2 text-xs rounded-xl bg-white border border-[#E2E8F0] outline-none"
                          />
                          <input
                            type="text"
                            placeholder="PIN Code"
                            value={formData.billingPincode}
                            onChange={(e) =>
                              setFormData({ ...formData, billingPincode: e.target.value })
                            }
                            className="px-3 py-2 text-xs rounded-xl bg-white border border-[#E2E8F0] outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method Selection */}
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0] mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#0A2E73]/10 text-[#0A2E73] flex items-center justify-center font-serif font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#071F52]">
                      Payment & Guarantee
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      Encrypted payments with 100-night trial refund guarantee
                    </p>
                  </div>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'upi'
                        ? 'border-[#0A2E73] bg-[#0A2E73]/5 text-[#0A2E73] font-bold shadow-xs'
                        : 'border-[#E2E8F0] hover:border-[#CCD8CA] text-[#64748B]'
                    }`}
                  >
                    <QrCode className="w-5 h-5" />
                    <span className="text-xs">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-[#0A2E73] bg-[#0A2E73]/5 text-[#0A2E73] font-bold shadow-xs'
                        : 'border-[#E2E8F0] hover:border-[#CCD8CA] text-[#64748B]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs">Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#0A2E73] bg-[#0A2E73]/5 text-[#0A2E73] font-bold shadow-xs'
                        : 'border-[#E2E8F0] hover:border-[#CCD8CA] text-[#64748B]'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span className="text-xs">Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'cod'
                        ? 'border-[#0A2E73] bg-[#0A2E73]/5 text-[#0A2E73] font-bold shadow-xs'
                        : 'border-[#E2E8F0] hover:border-[#CCD8CA] text-[#64748B]'
                    }`}
                  >
                    <Truck className="w-5 h-5" />
                    <span className="text-xs">On Delivery</span>
                  </button>
                </div>

                {/* Tab 1: UPI Content */}
                {paymentMethod === 'upi' && (
                  <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      {/* Stylized QR Code */}
                      <div className="w-36 h-36 bg-white p-3 rounded-2xl border border-[#CCD8CA] shadow-sm flex flex-col items-center justify-center text-center shrink-0">
                        <div className="grid grid-cols-5 gap-1 w-24 h-24 p-2 bg-[#071F52] rounded-lg">
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-[#071F52]"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-[#071F52]"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-[#071F52]"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-[#071F52]"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-[#071F52]"></div>
                          <div className="bg-[#E3262E] rounded-xs"></div>
                          <div className="bg-[#071F52]"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-[#071F52]"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-[#071F52]"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-[#071F52]"></div>
                          <div className="bg-white rounded-xs"></div>
                          <div className="bg-white rounded-xs"></div>
                        </div>
                        <span className="text-[9px] font-mono text-[#94A3B8] mt-1.5 uppercase tracking-wider">
                          Scan with Any UPI App
                        </span>
                      </div>

                      <div className="flex-1 w-full space-y-3">
                        <p className="text-xs text-[#55645D]">
                          Scan the QR code with <strong>Google Pay, PhonePe, Paytm, or BHIM</strong>, or enter your UPI Virtual Private Address (VPA) below.
                        </p>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#071F52] mb-1">
                            UPI ID / VPA
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="e.g. mobile@okhdfcbank or user@paytm"
                              value={upiId}
                              onChange={(e) => {
                                setUpiId(e.target.value);
                                setUpiVerified(false);
                              }}
                              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#E2E8F0] focus:border-[#0A2E73] outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (upiId.includes('@')) {
                                  setUpiVerified(true);
                                }
                              }}
                              className="px-4 py-2.5 rounded-xl bg-[#0A2E73] text-[#F8FAFC] text-xs font-semibold hover:bg-[#071F52] cursor-pointer"
                            >
                              Verify
                            </button>
                          </div>

                          {upiVerified && (
                            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>VPA Verified: Mindfree Sleep Escrow Account</span>
                            </div>
                          )}
                        </div>

                        {/* Quick UPI Handles */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {['@okaxis', '@okhdfcbank', '@paytm', '@ybl'].map((handle) => (
                            <button
                              key={handle}
                              type="button"
                              onClick={() => {
                                const base = upiId.split('@')[0] || 'yourname';
                                setUpiId(`${base}${handle}`);
                                setUpiVerified(true);
                              }}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#CCD8CA] text-[#0A2E73] hover:bg-[#0A2E73] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                            >
                              {handle}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Cards Content */}
                {paymentMethod === 'card' && (
                  <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-[#071F52]">
                          Card Number
                        </label>
                        {getCardBrand() && (
                          <span className="text-[11px] font-bold text-[#0A2E73] bg-[#DBEAFE] px-2 py-0.5 rounded">
                            {getCardBrand()}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        <input
                          type="text"
                          placeholder="4111 2222 3333 4444"
                          value={cardData.cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono rounded-xl bg-white border border-[#E2E8F0] focus:border-[#0A2E73] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#071F52] mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        placeholder="AARAV SINGHANIA"
                        value={cardData.cardHolder}
                        onChange={(e) =>
                          setCardData({ ...cardData, cardHolder: e.target.value.toUpperCase() })
                        }
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#E2E8F0] focus:border-[#0A2E73] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#071F52] mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm font-mono rounded-xl bg-white border border-[#E2E8F0] focus:border-[#0A2E73] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#071F52] mb-1">
                          CVV / CVC
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardData.cvv}
                            onChange={(e) =>
                              setCardData({
                                ...cardData,
                                cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                              })
                            }
                            className="w-full px-4 py-2.5 text-xs sm:text-sm font-mono rounded-xl bg-white border border-[#E2E8F0] focus:border-[#0A2E73] outline-none"
                          />
                          <Lock className="w-3.5 h-3.5 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#64748B] pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#E3262E]" />
                      <span>3D-Secure OTP verification initiated upon submission.</span>
                    </div>
                  </div>
                )}

                {/* Tab 3: Net Banking Content */}
                {paymentMethod === 'netbanking' && (
                  <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
                    <label className="block text-xs font-semibold text-[#071F52]">
                      Select Your Preferred Indian Bank
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'HDFC Bank',
                        'ICICI Bank',
                        'State Bank of India',
                        'Axis Bank',
                        'Kotak Mahindra',
                        'Punjab National Bank',
                      ].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-3 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                            selectedBank === bank
                              ? 'border-[#0A2E73] bg-[#0A2E73] text-[#F8FAFC] font-bold shadow-xs'
                              : 'border-[#E2E8F0] bg-white text-[#071F52] hover:border-[#CCD8CA]'
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
                        Or choose from all other banks
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-[#E2E8F0] focus:border-[#0A2E73] outline-none cursor-pointer"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="State Bank of India">State Bank of India</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra">Kotak Mahindra Bank</option>
                        <option value="Bank of Baroda">Bank of Baroda</option>
                        <option value="IndusInd Bank">IndusInd Bank</option>
                        <option value="Yes Bank">Yes Bank</option>
                        <option value="Union Bank of India">Union Bank of India</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Tab 4: Pay on Delivery Content */}
                {paymentMethod === 'cod' && (
                  <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0A2E73]/10 text-[#0A2E73] flex items-center justify-center shrink-0 mt-0.5">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#071F52]">
                          White-Glove In-Bedroom Inspection & Payment
                        </h4>
                        <p className="text-xs text-[#55645D] mt-1 leading-relaxed">
                          Our trained Mindfree concierges deliver, unbox, and place your mattress directly on your bed frame. Only after you physically inspect the stitching, feel the comfort, and are completely delighted do you complete payment via <strong>UPI, Credit/Debit Card terminal, or Cash</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#DBEAFE] border border-[#CCD8CA] text-[11px] text-[#0A2E73] flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      <span>Zero advance payment required. 100-night trial begins immediately upon setup.</span>
                    </div>
                  </div>
                )}

                {formErrors.payment && (
                  <p className="text-xs text-red-600 mt-3 font-semibold">
                    {formErrors.payment}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary & Placement (5 Columns) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-7 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-5">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#071F52]">
                    Order Atelier Summary
                  </h3>
                  <span className="text-xs font-semibold text-[#94A3B8]">
                    {items.reduce((acc, i) => acc + i.quantity, 0)} {items.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'Mattress' : 'Mattresses'}
                  </span>
                </div>

                {/* Itemized List */}
                <div className="space-y-4 max-h-80 overflow-y-auto pr-1 divide-y divide-[#E2E8F0]">
                  {items.map((item) => (
                    <div key={item.sku} className="pt-3 first:pt-0 flex gap-3.5 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#E2E8F0] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-serif font-bold text-[#071F52] truncate">
                          {item.name}
                        </h4>
                        <div className="text-[11px] text-[#64748B] mt-0.5">
                          {item.size} • {item.thickness}
                        </div>
                        <div className="text-[10px] text-[#94A3B8] font-mono">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs sm:text-sm font-bold text-[#071F52]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="pt-5 mt-5 border-t border-[#E2E8F0] space-y-2.5 text-xs text-[#55645D]">
                  <div className="flex justify-between">
                    <span>Atelier Handcrafted Subtotal</span>
                    <span className="font-semibold text-[#071F52]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-800">
                      <span>Promotional Atelier Savings</span>
                      <span className="font-semibold">
                        -₹{totalSavings.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>White-Glove Delivery & Room Setup</span>
                    <span className="text-emerald-800 font-semibold uppercase tracking-wider text-[11px]">
                      FREE (₹2,499 Value)
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Eco Packaging Recycling & Removal</span>
                    <span className="text-emerald-800 font-semibold uppercase tracking-wider text-[11px]">
                      Complimentary
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px] text-[#94A3B8]">
                    <span>GST (18%) & All Taxes</span>
                    <span>Included</span>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] flex items-baseline justify-between font-serif">
                    <span className="text-sm sm:text-base font-bold text-[#071F52]">
                      Final Payable Amount
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-[#0A2E73]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Authorize & Place Order Button */}
                <div className="mt-6">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handlePlaceOrder}
                    className="w-full py-4 px-6 rounded-2xl bg-[#0A2E73] hover:bg-[#071F52] active:scale-[0.99] text-[#F8FAFC] font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#0A2E73]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 animate-spin text-[#E3262E]" />
                        <span>Commissioning Sleep Sanctuary...</span>
                      </span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-[#E3262E]" />
                        <span>
                          {paymentMethod === 'cod'
                            ? 'Confirm White-Glove Order'
                            : `Pay ₹${subtotal.toLocaleString('en-IN')} & Confirm Order`}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-[#94A3B8] mt-3">
                    By confirming, you initiate our master crafting atelier schedule.
                  </p>
                </div>
              </div>

              {/* Luxury Reassurance Badges */}
              <div className="p-5 rounded-2xl bg-white/70 border border-[#E2E8F0] space-y-3 text-xs text-[#55645D]">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#E3262E] shrink-0" />
                  <span>
                    <strong>100-Night Sleep Trial</strong> — Full refund if not enchanted
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#E3262E] shrink-0" />
                  <span>
                    <strong>10-Year Craftsmanship Warranty</strong> — Structural integrity guaranteed
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#E3262E] shrink-0" />
                  <span>
                    <strong>White-Glove Placement</strong> — Carried to your bedroom & set up
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
