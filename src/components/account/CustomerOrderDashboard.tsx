import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Package,
  Clock,
  Truck,
  MapPin,
  Phone,
  Mail,
  Printer,
  Search,
  SlidersHorizontal,
  Lock,
  ShieldCheck,
  AlertTriangle,
  User,
  Plus,
  Trash2,
  Sparkles,
  ShoppingBag,
  Info,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import {
  getOrderById,
  getOrdersForCustomer,
  getCustomerOrderSecure,
  verifyAndGetGuestOrder,
} from '../../services/orderService';
import type {
  OrderRecord,
  OrderStatusType,
} from '../../services/orderService';
import { fetchOrdersFromPg } from '../../services/postgresApi';
import type { CustomerAddress } from '../../services/authService';

export const CustomerOrderDashboard: React.FC = () => {
  const { user, loginWithOtp, logout, updateProfile, addAddress, removeAddress } = useAuth();
  const { lastOrderId, accountTab, navigateToHome } = useNavigation();

  // Active sub-tab: 'orders' | 'tracking' | 'profile' | 'guest'
  const [activeTab, setActiveTab] = useState<'orders' | 'tracking' | 'profile' | 'guest'>(
    accountTab || 'orders'
  );

  // Login Form State (Phone Number + Email ID + Dummy Email OTP)
  const [loginFullName, setLoginFullName] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [dummyOtpCode, setDummyOtpCode] = useState('482910');
  const [otpDispatched, setOtpDispatched] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSendEmailOtp = () => {
    setLoginError(null);
    const digits = loginPhone.replace(/\D/g, '');
    const cleanMail = loginEmail.trim();
    if (digits.length < 10) {
      setLoginError('Please enter a valid 10-digit Phone Number first.');
      return;
    }
    if (!cleanMail || !cleanMail.includes('@')) {
      setLoginError('Please enter a valid Email ID first.');
      return;
    }
    const generated = String(Math.floor(100000 + Math.random() * 900000));
    setDummyOtpCode(generated);
    setLoginOtp(generated);
    setOtpDispatched(true);
  };

  const handleAccountLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const digits = loginPhone.replace(/\D/g, '');
    const cleanMail = loginEmail.trim().toLowerCase();
    const enteredOtp = loginOtp.trim();

    if (digits.length < 10) {
      setLoginError('Please enter a valid 10-digit Phone Number.');
      return;
    }
    if (!cleanMail || !cleanMail.includes('@')) {
      setLoginError('Please enter a valid Email ID.');
      return;
    }
    if (!enteredOtp) {
      setLoginError(`Please enter the Email OTP (Dummy OTP: ${dummyOtpCode} or 123456).`);
      return;
    }
    if (enteredOtp !== dummyOtpCode && enteredOtp !== '123456' && enteredOtp !== '482910') {
      setLoginError(`Invalid Email OTP. Please use Dummy OTP "${dummyOtpCode}" or "123456".`);
      return;
    }

    const res = loginWithOtp({
      phone: digits.slice(-10),
      email: cleanMail,
      fullName: loginFullName.trim() || undefined,
    });

    if (!res.success) {
      setLoginError(res.message || 'Login failed. Please check your details.');
      return;
    }

    setOtpDispatched(false);
    setLoginError(null);
    setActiveTab('orders');
  };

  const handleLogoutClick = () => {
    logout();
    setGuestVerifiedOrder(null);
    setSelectedOrderId(null);
    setLoginOtp('');
    setOtpDispatched(false);
    setLoginError(null);
  };

  // Sync with navigation context tab changes
  useEffect(() => {
    if (accountTab) {
      setActiveTab(accountTab);
    }
  }, [accountTab]);

  // Selected order for detailed view & tracking
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(lastOrderId);

  // Reactive version counter so any Admin tracking update immediately updates the customer front-end
  const [ordersVersion, setOrdersVersion] = useState(0);
  const [isRefreshingOrders, setIsRefreshingOrders] = useState(false);

  const syncOrdersFromServer = useCallback(async () => {
    setIsRefreshingOrders(true);
    try {
      await fetchOrdersFromPg();
      setOrdersVersion((v) => v + 1);
    } finally {
      setIsRefreshingOrders(false);
    }
  }, []);

  useEffect(() => {
    syncOrdersFromServer();

    const handleStorageOrCustomUpdate = () => {
      setOrdersVersion((v) => v + 1);
    };
    const handleFocus = () => {
      syncOrdersFromServer();
    };

    window.addEventListener('storage', handleStorageOrCustomUpdate);
    window.addEventListener('mindfree-orders-updated', handleStorageOrCustomUpdate);
    window.addEventListener('focus', handleFocus);

    const intervalId = window.setInterval(() => {
      syncOrdersFromServer();
    }, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageOrCustomUpdate);
      window.removeEventListener('mindfree-orders-updated', handleStorageOrCustomUpdate);
      window.removeEventListener('focus', handleFocus);
      window.clearInterval(intervalId);
    };
  }, [syncOrdersFromServer]);

  // Filter state for My Orders list
  const [orderFilter, setOrderFilter] = useState<'all' | 'active' | 'delivered'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Guest order lookup state
  const [guestLookupId, setGuestLookupId] = useState('');
  const [guestLookupContact, setGuestLookupContact] = useState('');
  const [guestLookupError, setGuestLookupError] = useState<string | null>(null);
  const [guestVerifiedOrder, setGuestVerifiedOrder] = useState<OrderRecord | null>(null);

  // New Address Modal state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState<Omit<CustomerAddress, 'id'>>({
    label: 'Home',
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    addressLine: '',
    locality: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  // Fetch real customer orders strictly filtered by authenticated user's email/phone
  const customerOrders = useMemo(() => {
    void ordersVersion;
    if (!user) return [];
    return getOrdersForCustomer(user.email, user.phone);
  }, [user, ordersVersion]);

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    return customerOrders.filter((order) => {
      const matchesFilter =
        orderFilter === 'all'
          ? true
          : orderFilter === 'active'
          ? order.orderStatus !== 'Delivered'
          : order.orderStatus === 'Delivered';

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        order.orderId.toLowerCase().includes(q) ||
        order.items.some((i) => i.name.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [customerOrders, orderFilter, searchQuery]);

  // Currently active tracked order (enforcing ownership verification + live updates)
  const trackedOrderResult = useMemo(() => {
    void ordersVersion;
    // If viewing guest lookup result, always read the latest version of that order
    if (guestVerifiedOrder) {
      const latestGuestOrder = getOrderById(guestVerifiedOrder.orderId) || guestVerifiedOrder;
      return { authorized: true, order: latestGuestOrder };
    }

    const orderIdToLookup = selectedOrderId || (customerOrders.length > 0 ? customerOrders[0].orderId : null);
    if (!orderIdToLookup) return null;

    if (!user) {
      return { authorized: false, error: 'Please sign in or use Guest Order Lookup to view order tracking.' };
    }

    const result = getCustomerOrderSecure(orderIdToLookup, user.email, user.phone);
    if (!result.authorized && customerOrders.length > 0) {
      return getCustomerOrderSecure(customerOrders[0].orderId, user.email, user.phone);
    }
    return result;
  }, [selectedOrderId, customerOrders, user, guestVerifiedOrder, ordersVersion]);

  const handleSelectOrderForTracking = (orderId: string) => {
    setSelectedOrderId(orderId);
    setGuestVerifiedOrder(null);
    setActiveTab('tracking');
  };

  // Perform Guest Order Lookup with dual-factor verification
  const handleGuestLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setGuestLookupError(null);

    if (!guestLookupId.trim() || !guestLookupContact.trim()) {
      setGuestLookupError('Please enter both your Order ID and registered Email or Phone number.');
      return;
    }

    const res = verifyAndGetGuestOrder(guestLookupId, guestLookupContact);
    if (!res.authorized || !res.order) {
      setGuestLookupError(res.error || 'Verification failed. Please check your credentials.');
      setGuestVerifiedOrder(null);
      return;
    }

    setGuestVerifiedOrder(res.order);
    setSelectedOrderId(res.order.orderId);
    setActiveTab('tracking');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressForm.addressLine || !newAddressForm.city || !newAddressForm.pincode) return;

    addAddress(newAddressForm);
    setIsAddingAddress(false);
    setNewAddressForm({
      label: 'Home',
      fullName: user?.fullName || '',
      phone: user?.phone || '',
      addressLine: '',
      locality: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
  };

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: OrderStatusType) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Preparing in Atelier':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Dispatched':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  // If not logged in (or after Logout), ONLY display the Login Page (never show client details)
  if (!user) {
    return (
      <div className="w-full bg-[#F8FAFC] min-h-[88vh] py-10 sm:py-16 select-none font-sans text-[#071F52]">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-6">
            <button
              type="button"
              onClick={navigateToHome}
              className="hover:text-[#0A2E73] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#071F52] font-semibold">Account Login</span>
          </div>

          {/* Account Login Card */}
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-9 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#0A2E73] text-white flex items-center justify-center mx-auto shadow-md">
                <User className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0A2E73] font-bold block pt-1">
                Mindfree Client Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#071F52]">
                Sign In to Your Account
              </h1>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Enter your Phone Number, Email ID, and Email OTP to access your orders, live tracking, and saved profile. Your login stays saved until you log out.
              </p>
            </div>

            {/* Dummy Email OTP Box (Always visible for instant testing) */}
            <div className="p-4 rounded-2xl bg-[#DBEAFE]/60 border border-[#0A2E73]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#0A2E73] font-bold block">
                  {otpDispatched ? 'Email OTP Dispatched' : 'Dummy Email OTP for Login'}
                </span>
                <div className="text-[#071F52] mt-0.5">
                  Use Dummy OTP:{' '}
                  <strong className="font-mono text-sm text-[#0A2E73] bg-white px-2 py-0.5 rounded border border-[#0A2E73]/30">
                    {dummyOtpCode}
                  </strong>{' '}
                  <span className="text-[11px] text-[#64748B]">(or 123456)</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLoginOtp(dummyOtpCode)}
                className="px-3.5 py-2 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-white text-xs font-semibold cursor-pointer shrink-0 transition-all"
              >
                Auto-Fill OTP ({dummyOtpCode})
              </button>
            </div>

            <form onSubmit={handleAccountLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#071F52] mb-1.5">
                  Full Name <span className="text-[#94A3B8] font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter your name (e.g. Aarav Singhania)"
                    value={loginFullName}
                    onChange={(e) => setLoginFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0A2E73] focus:bg-white outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#071F52] mb-1.5">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number (e.g. 9820145678)"
                    value={loginPhone}
                    onChange={(e) =>
                      setLoginPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0A2E73] focus:bg-white outline-none text-xs sm:text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#071F52] mb-1.5">
                  Email ID *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0A2E73] focus:bg-white outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-semibold text-[#071F52]">
                    Email OTP *
                  </label>
                  <button
                    type="button"
                    onClick={handleSendEmailOtp}
                    className="text-[11px] font-bold text-[#0A2E73] hover:underline cursor-pointer"
                  >
                    {otpDispatched ? 'Resend Dummy Email OTP' : 'Send Dummy Email OTP'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder={`Enter 6-digit OTP (e.g. ${dummyOtpCode})`}
                      value={loginOtp}
                      onChange={(e) =>
                        setLoginOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0A2E73] focus:bg-white outline-none font-mono tracking-widest text-xs sm:text-sm font-bold"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendEmailOtp}
                    className="px-4 py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#DBEAFE] border border-[#CCD8CA] text-[#0A2E73] font-semibold text-xs cursor-pointer shrink-0 transition-colors"
                  >
                    Get OTP
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#0A2E73] hover:bg-[#071F52] text-white text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify OTP &amp; Login</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F8FAFC] min-h-[90vh] py-8 sm:py-12 select-none font-sans text-[#071F52]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0] mb-8">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <button
              type="button"
              onClick={navigateToHome}
              className="hover:text-[#0A2E73] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#071F52] font-semibold">My Account</span>
            <span>/</span>
            <span className="text-[#0A2E73] font-mono uppercase tracking-wider font-bold">
              {activeTab === 'orders'
                ? 'My Orders'
                : activeTab === 'tracking'
                ? 'Live Tracking'
                : 'Account Profile'}
            </span>
          </div>
        </div>

        {/* Customer Header Banner (Only rendered when user is logged in) */}
        <div className="bg-gradient-to-br from-[#0A2E73] to-[#071F52] text-[#F8FAFC] rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#E3262E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-serif text-2xl font-light text-[#F8FAFC] shadow-inner shrink-0">
                {user.fullName.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/25 text-[10px] font-bold tracking-wider text-white uppercase">
                    <Sparkles className="w-3 h-3" />
                    {user.clientTier}
                  </span>
                  <span className="text-[11px] text-[#A3B5AA]">
                    Client since {user.memberSinceYear}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                  Welcome back, {user.fullName}
                </h1>
                <div className="flex flex-wrap gap-4 text-xs text-[#CCD8CA] mt-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-white" />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-white" />
                    +91 {user.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleLogoutClick}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-xs text-white font-semibold transition-all cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs Navigation */}
        <div className="flex border-b border-[#E2E8F0] mb-8 overflow-x-auto gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`pb-3.5 px-4 text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#0A2E73] text-[#0A2E73]'
                : 'border-transparent text-[#64748B] hover:text-[#071F52]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders & Commissions</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-[#DBEAFE] text-[#0A2E73] text-[10px] font-bold">
              {customerOrders.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tracking')}
            className={`pb-3.5 px-4 text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'tracking'
                ? 'border-[#0A2E73] text-[#0A2E73]'
                : 'border-transparent text-[#64748B] hover:text-[#071F52]'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Live Order Tracking</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-3.5 px-4 text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-[#0A2E73] text-[#0A2E73]'
                : 'border-transparent text-[#64748B] hover:text-[#071F52]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Saved Addresses</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guest')}
            className={`pb-3.5 px-4 text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'guest'
                ? 'border-[#0A2E73] text-[#0A2E73]'
                : 'border-transparent text-[#64748B] hover:text-[#071F52]'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Order Verification Lookup</span>
          </button>
        </div>

        {/* TAB 1: MY ORDERS & COMMISSIONS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search orders by Order ID or mattress name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0A2E73] outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span className="text-xs font-medium text-[#64748B]">Filter:</span>
                {(['all', 'active', 'delivered'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setOrderFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                      orderFilter === filter
                        ? 'bg-[#0A2E73] text-[#F8FAFC]'
                        : 'bg-[#F8FAFC] hover:bg-[#DBEAFE] text-[#55645D]'
                    }`}
                  >
                    {filter === 'all' ? 'All Orders' : filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Empty State when customer has 0 orders */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs max-w-2xl mx-auto">
                <ShoppingBag className="w-12 h-12 text-[#0A2E73] mx-auto mb-4 stroke-1" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#071F52] mb-2">
                  No Orders Found Yet
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto mb-6">
                  {user.fullName} currently has no active or past mattress orders linked to {user.email} or +91 {user.phone}.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={navigateToHome}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] text-xs font-semibold cursor-pointer shadow-md transition-all"
                  >
                    Explore Handcrafted Mattresses
                  </button>
                </div>
              </div>
            ) : (
              /* Order Cards List */
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const latestHistory =
                    order.statusHistory && order.statusHistory.length > 0
                      ? order.statusHistory[order.statusHistory.length - 1]
                      : null;
                  const stageOrder: OrderStatusType[] = [
                    'Confirmed',
                    'Preparing in Atelier',
                    'Dispatched',
                    'Delivered',
                  ];
                  const currentStageIdx = Math.max(0, stageOrder.indexOf(order.orderStatus));

                  return (
                    <div
                      key={order.orderId}
                      className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs hover:border-[#CCD8CA] transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-4 mb-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-mono text-sm sm:text-base font-bold text-[#0A2E73]">
                              {order.orderId}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                                order.orderStatus
                              )}`}
                            >
                              {order.orderStatus}
                            </span>
                            <span className="text-[11px] font-mono text-[#64748B]">
                              Waybill:{' '}
                              <strong className="text-[#071F52]">{order.trackingNumber}</strong>
                            </span>
                          </div>
                          <div className="text-[11px] text-[#94A3B8] mt-0.5">
                            Commissioned on {formatDateTime(order.createdAt)} • Fleet:{' '}
                            {order.courierPartner || 'Mindfree Dedicated White-Glove Fleet'}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs">
                          <div className="text-right">
                            <span className="text-[10px] uppercase text-[#94A3B8] block">
                              Total Value
                            </span>
                            <span className="font-serif font-bold text-sm text-[#0A2E73]">
                              ₹{order.total.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSelectOrderForTracking(order.orderId)}
                            className="px-4 py-2 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] text-xs font-semibold cursor-pointer shadow-xs transition-all flex items-center gap-1.5"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Live Order Status</span>
                          </button>
                        </div>
                      </div>

                      {/* 4-Stage Visual Order Status Bar on Customer Order Card */}
                      <div className="mb-4 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {stageOrder.map((st, idx) => {
                            const isCompleted = idx <= currentStageIdx;
                            const isCurrent = idx === currentStageIdx;
                            return (
                              <div
                                key={st}
                                className={`px-3 py-2 rounded-xl border text-[11px] flex items-center gap-2 ${
                                  isCurrent
                                    ? 'bg-[#0A2E73] text-white border-[#0A2E73] font-bold shadow-2xs'
                                    : isCompleted
                                    ? 'bg-[#DBEAFE] text-[#0A2E73] border-[#CCD8CA] font-semibold'
                                    : 'bg-white text-[#94A3B8] border-[#E2E8F0]'
                                }`}
                              >
                                <span
                                  className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                                    isCurrent
                                      ? 'bg-white text-[#0A2E73]'
                                      : isCompleted
                                      ? 'bg-[#0A2E73] text-white'
                                      : 'bg-[#E2E8F0] text-[#64748B]'
                                  }`}
                                >
                                  {isCompleted ? '✓' : idx + 1}
                                </span>
                                <span className="truncate">{st}</span>
                              </div>
                            );
                          })}
                        </div>

                        {latestHistory && (
                          <div className="pt-2 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <div className="flex items-start gap-2 text-[#071F52]">
                              <span className="px-2 py-0.5 rounded bg-[#DBEAFE] text-[#0A2E73] text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5">
                                Latest Tracking Update
                              </span>
                              <span>
                                <strong>{latestHistory.status}:</strong> {latestHistory.note}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-[#64748B] shrink-0">
                              {formatDateTime(latestHistory.timestamp)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Mattresses in this order */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.items.map((item) => (
                          <div
                            key={item.sku}
                            className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 rounded-xl object-cover border border-[#CCD8CA] shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-serif font-bold text-[#071F52] truncate">
                                {item.name}
                              </h4>
                              <div className="text-[11px] text-[#64748B]">
                                {item.size} • {item.thickness}
                              </div>
                              <div className="text-[10px] font-mono text-[#94A3B8]">
                                Qty: {item.quantity} | ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Timeline Sneak-Peek & Destination */}
                      <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#55645D]">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#E3262E] shrink-0" />
                          <span>
                            Delivering to: {order.customer.addressLine}, {order.customer.city} ({order.customer.pincode})
                          </span>
                        </div>
                        <div className="text-emerald-800 font-medium">
                          Estimated Delivery: {order.estimatedDelivery}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIVE ORDER TRACKING & TIMELINE */}
        {activeTab === 'tracking' && (
          <div>
            {!trackedOrderResult || !trackedOrderResult.authorized || !trackedOrderResult.order ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-red-200 max-w-2xl mx-auto shadow-xs">
                <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-[#071F52] mb-1">
                  Access Authorization Notice
                </h3>
                <p className="text-xs text-[#64748B] mb-6">
                  {trackedOrderResult?.error ||
                    'Please select an order from your commissions list, or verify order ownership through guest lookup.'}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('guest')}
                  className="px-6 py-2.5 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-xs font-semibold cursor-pointer"
                >
                  Verify Guest Order
                </button>
              </div>
            ) : (
              /* Real Authorized Order Tracking Timeline */
              <div className="space-y-8">
                {/* Order Switcher when customer has multiple orders */}
                {customerOrders.length > 1 && (
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-[#071F52]">
                      Select Order to Track ({customerOrders.length} Orders):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {customerOrders.map((co) => (
                        <button
                          key={co.orderId}
                          type="button"
                          onClick={() => handleSelectOrderForTracking(co.orderId)}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                            trackedOrderResult.order?.orderId === co.orderId
                              ? 'bg-[#0A2E73] text-white shadow-2xs'
                              : 'bg-[#F8FAFC] text-[#071F52] border border-[#E2E8F0] hover:border-[#0A2E73]'
                          }`}
                        >
                          <span>{co.orderId}</span>
                          <span className="text-[10px] font-sans font-semibold opacity-85">
                            ({co.orderStatus})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tracking Hero Card */}
                <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E2E8F0] gap-4 mb-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-base sm:text-xl font-bold text-[#0A2E73]">
                          {trackedOrderResult.order.orderId}
                        </span>
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${getStatusBadge(
                            trackedOrderResult.order.orderStatus
                          )}`}
                        >
                          {trackedOrderResult.order.orderStatus}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          LIVE TRACKING
                        </span>
                      </div>
                      <div className="text-xs text-[#64748B] mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span>
                          Tracking Waybill:{' '}
                          <strong className="text-[#0A2E73] font-mono">
                            {trackedOrderResult.order.trackingNumber}
                          </strong>
                        </span>
                        <span>
                          Courier Partner:{' '}
                          <strong className="text-[#071F52]">
                            {trackedOrderResult.order.courierPartner ||
                              'Mindfree Dedicated White-Glove Fleet'}
                          </strong>
                        </span>
                        <span>
                          Estimated Delivery:{' '}
                          <strong className="text-emerald-800">
                            {trackedOrderResult.order.estimatedDelivery}
                          </strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={syncOrdersFromServer}
                        className="px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0A2E73] hover:bg-[#DBEAFE] cursor-pointer flex items-center gap-1.5"
                      >
                        <RefreshCw
                          className={`w-3.5 h-3.5 text-[#0A2E73] ${
                            isRefreshingOrders ? 'animate-spin' : ''
                          }`}
                        />
                        <span>Refresh Status</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-[#0A2E73] hover:bg-[#F8FAFC] cursor-pointer flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#E3262E]" />
                        <span>Print Invoice</span>
                      </button>

                      <a
                        href="tel:+918047189900"
                        className="px-4 py-2 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] text-xs font-semibold cursor-pointer flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-white" />
                        <span>Call Concierge</span>
                      </a>
                    </div>
                  </div>

                  {/* Latest Tracking Update Banner for this Customer */}
                  {trackedOrderResult.order.statusHistory &&
                    trackedOrderResult.order.statusHistory.length > 0 && (
                      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#DBEAFE]/50 border border-[#0A2E73]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#0A2E73] text-white text-[10px] font-bold uppercase tracking-wider">
                              Latest Tracking Update
                            </span>
                            <span className="text-xs font-bold text-[#071F52]">
                              {
                                trackedOrderResult.order.statusHistory[
                                  trackedOrderResult.order.statusHistory.length - 1
                                ].status
                              }
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#071F52] font-medium leading-relaxed">
                            {
                              trackedOrderResult.order.statusHistory[
                                trackedOrderResult.order.statusHistory.length - 1
                              ].note
                            }
                          </p>
                        </div>
                        <div className="text-left sm:text-right text-[11px] font-mono text-[#0A2E73] shrink-0">
                          <div>
                            {formatDateTime(
                              trackedOrderResult.order.statusHistory[
                                trackedOrderResult.order.statusHistory.length - 1
                              ].timestamp
                            )}
                          </div>
                          <div className="text-[10px] text-[#64748B]">
                            Updated by:{' '}
                            {
                              trackedOrderResult.order.statusHistory[
                                trackedOrderResult.order.statusHistory.length - 1
                              ].updatedBy
                            }
                          </div>
                        </div>
                      </div>
                    )}

                  {/* 4-Stage Progressive Timeline */}
                  <div className="mb-8">
                    <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-[0.2em] mb-6">
                      Atelier Fulfillment Journey
                    </h3>

                    {/* Progress Track */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Step 1: Confirmed */}
                      <div className="p-4 rounded-2xl bg-[#DBEAFE] border border-[#CCD8CA] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="w-6 h-6 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-xs font-bold flex items-center justify-center">
                            ✓
                          </span>
                          <span className="text-[10px] font-mono text-[#0A2E73] font-bold uppercase">
                            Stage 1
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#071F52] pt-1">Order Confirmed</h4>
                        <p className="text-[11px] text-[#55645D]">
                          {formatDateTime(
                            trackedOrderResult.order.statusHistory.find((h) => h.status === 'Confirmed')
                              ?.timestamp
                          ) || 'Completed'}
                        </p>
                      </div>

                      {/* Step 2: Preparing in Atelier */}
                      <div
                        className={`p-4 rounded-2xl border space-y-1 ${
                          trackedOrderResult.order.orderStatus === 'Preparing in Atelier'
                            ? 'bg-[#F8FAFC] border-[#0A2E73] shadow-xs'
                            : ['Dispatched', 'Delivered'].includes(trackedOrderResult.order.orderStatus)
                            ? 'bg-[#DBEAFE] border-[#CCD8CA]'
                            : 'bg-white border-[#E2E8F0] opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                              ['Dispatched', 'Delivered'].includes(trackedOrderResult.order.orderStatus)
                                ? 'bg-[#0A2E73] text-[#F8FAFC]'
                                : 'bg-[#0A2E73] text-white'
                            }`}
                          >
                            {['Dispatched', 'Delivered'].includes(trackedOrderResult.order.orderStatus) ? '✓' : '2'}
                          </span>
                          <span className="text-[10px] font-mono text-[#0A2E73] font-bold uppercase">
                            Stage 2
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#071F52] pt-1">Preparing in Atelier</h4>
                        <p className="text-[11px] text-[#55645D]">
                          {formatDateTime(
                            trackedOrderResult.order.statusHistory.find((h) => h.status === 'Preparing in Atelier')
                              ?.timestamp
                          ) || (trackedOrderResult.order.orderStatus === 'Confirmed' ? 'In Queue' : 'Crafted')}
                        </p>
                      </div>

                      {/* Step 3: Dispatched */}
                      <div
                        className={`p-4 rounded-2xl border space-y-1 ${
                          trackedOrderResult.order.orderStatus === 'Dispatched'
                            ? 'bg-[#F8FAFC] border-[#0A2E73] shadow-xs'
                            : trackedOrderResult.order.orderStatus === 'Delivered'
                            ? 'bg-[#DBEAFE] border-[#CCD8CA]'
                            : 'bg-white border-[#E2E8F0] opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                              trackedOrderResult.order.orderStatus === 'Delivered'
                                ? 'bg-[#0A2E73] text-[#F8FAFC]'
                                : trackedOrderResult.order.orderStatus === 'Dispatched'
                                ? 'bg-[#0A2E73] text-white'
                                : 'bg-[#E2E8F0] text-[#64748B]'
                            }`}
                          >
                            {trackedOrderResult.order.orderStatus === 'Delivered' ? '✓' : '3'}
                          </span>
                          <span className="text-[10px] font-mono text-[#94A3B8] uppercase">
                            Stage 3
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#071F52] pt-1">White-Glove Fleet Transit</h4>
                        <p className="text-[11px] text-[#55645D]">
                          {formatDateTime(
                            trackedOrderResult.order.statusHistory.find((h) => h.status === 'Dispatched')
                              ?.timestamp
                          ) || 'Pending Atelier Release'}
                        </p>
                      </div>

                      {/* Step 4: Delivered */}
                      <div
                        className={`p-4 rounded-2xl border space-y-1 ${
                          trackedOrderResult.order.orderStatus === 'Delivered'
                            ? 'bg-[#DBEAFE] border-[#CCD8CA]'
                            : 'bg-white border-[#E2E8F0] opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                              trackedOrderResult.order.orderStatus === 'Delivered'
                                ? 'bg-[#0A2E73] text-[#F8FAFC]'
                                : 'bg-[#E2E8F0] text-[#64748B]'
                            }`}
                          >
                            {trackedOrderResult.order.orderStatus === 'Delivered' ? '✓' : '4'}
                          </span>
                          <span className="text-[10px] font-mono text-[#94A3B8] uppercase">
                            Stage 4
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#071F52] pt-1">In-Bedroom Setup</h4>
                        <p className="text-[11px] text-[#55645D]">
                          {formatDateTime(
                            trackedOrderResult.order.statusHistory.find((h) => h.status === 'Delivered')
                              ?.timestamp
                          ) || `Target: ${trackedOrderResult.order.estimatedDelivery}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Audit Log from Atelier Master (Newest First) */}
                  <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#0A2E73]" />
                        <h4 className="text-xs font-bold text-[#071F52] uppercase tracking-wider">
                          Order Tracking History &amp; Atelier Updates ({trackedOrderResult.order.statusHistory.length})
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-[#94A3B8]">
                        Fleet: {trackedOrderResult.order.courierPartner || 'Mindfree White-Glove In-House'}
                      </span>
                    </div>

                    <div className="divide-y divide-[#E2E8F0] text-xs">
                      {trackedOrderResult.order.statusHistory
                        .slice()
                        .reverse()
                        .map((item, idx) => (
                          <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <div className="flex items-start gap-2">
                              <span
                                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                  idx === 0 ? 'bg-emerald-500' : 'bg-[#0A2E73]'
                                }`}
                              />
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-semibold text-[#071F52]">{item.status}:</span>
                                  {idx === 0 && (
                                    <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold uppercase">
                                      Latest
                                    </span>
                                  )}
                                  {item.courierWaybill && (
                                    <span className="font-mono text-[10px] text-[#0A2E73]">
                                      [{item.courierWaybill}]
                                    </span>
                                  )}
                                </div>
                                <span className="text-[#55645D] block mt-0.5">{item.note}</span>
                                <span className="text-[10px] text-[#94A3B8] block mt-0.5">
                                  Verified by: {item.updatedBy}
                                  {item.courierPartner ? ` • ${item.courierPartner}` : ''}
                                </span>
                              </div>
                            </div>
                            <span className="text-[11px] font-mono text-[#94A3B8] shrink-0 sm:pl-4">
                              {formatDateTime(item.timestamp)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Details Grid: Items, Destination & Financials */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Mattress Specs */}
                  <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
                    <h3 className="text-sm font-serif font-bold text-[#071F52] pb-3 border-b border-[#E2E8F0]">
                      Commissioned Mattresses ({trackedOrderResult.order.items.reduce((acc, i) => acc + i.quantity, 0)})
                    </h3>
                    <div className="divide-y divide-[#E2E8F0]">
                      {trackedOrderResult.order.items.map((item) => (
                        <div key={item.sku} className="py-3.5 first:pt-0 flex gap-4 items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover border border-[#E2E8F0] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-serif font-bold text-[#071F52] truncate">
                              {item.name}
                            </h4>
                            <div className="text-[11px] text-[#64748B] mt-0.5">
                              {item.size} • {item.thickness}
                            </div>
                            <div className="text-[10px] font-mono text-[#94A3B8]">
                              SKU: {item.sku} | Qty: {item.quantity}
                            </div>
                          </div>
                          <div className="font-serif font-bold text-xs text-[#0A2E73]">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery & Billing Destination */}
                  <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
                    <h3 className="text-sm font-serif font-bold text-[#071F52] pb-3 border-b border-[#E2E8F0]">
                      White-Glove In-Bedroom Destination
                    </h3>
                    <div className="space-y-2 text-xs text-[#55645D]">
                      <div className="font-semibold text-sm text-[#071F52]">
                        {trackedOrderResult.order.customer.fullName}
                      </div>
                      <div>{trackedOrderResult.order.customer.addressLine}</div>
                      <div>
                        {trackedOrderResult.order.customer.locality},{' '}
                        {trackedOrderResult.order.customer.city},{' '}
                        {trackedOrderResult.order.customer.state} —{' '}
                        {trackedOrderResult.order.customer.pincode}
                      </div>
                      {trackedOrderResult.order.customer.landmark && (
                        <div className="text-[11px] text-[#94A3B8]">
                          Landmark: {trackedOrderResult.order.customer.landmark}
                        </div>
                      )}
                      <div className="pt-2 border-t border-[#E2E8F0] flex flex-col gap-1">
                        <span>Contact: +91 {trackedOrderResult.order.customer.phone}</span>
                        <span>Email: {trackedOrderResult.order.customer.email}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E2E8F0] flex items-baseline justify-between text-xs">
                      <span className="text-[#94A3B8]">Total Paid ({trackedOrderResult.order.paymentMethod.toUpperCase()})</span>
                      <span className="font-serif font-bold text-base text-[#0A2E73]">
                        ₹{trackedOrderResult.order.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notifications Advisory Notice */}
                <div className="p-4 rounded-2xl bg-[#DBEAFE] border border-[#CCD8CA] text-xs text-[#0A2E73] flex items-start gap-3">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">
                      Production Notification Integration Notice:
                    </span>
                    <p className="text-[11px] leading-relaxed text-[#55645D]">
                      Real-time status changes triggered by Atelier Managers are broadcast live through the shared storage bus. For commercial SMS delivery (via Twilio / MSG91) and email tax invoices (via SendGrid / AWS SES), configure API credentials in your production environment settings.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROFILE & SAVED ADDRESSES */}
        {activeTab === 'profile' && user && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Client Profile Details (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0]">
                <User className="w-5 h-5 text-[#0A2E73]" />
                <h3 className="font-serif text-base font-bold text-[#071F52]">
                  Client Profile Credentials
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#94A3B8] mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={user.fullName}
                    onChange={(e) => updateProfile({ fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#071F52] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#94A3B8] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => updateProfile({ email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#071F52] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#94A3B8] mb-1">Mobile Contact</label>
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => updateProfile({ phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#071F52] outline-none"
                  />
                </div>

                <div className="pt-2 text-[11px] text-[#94A3B8]">
                  Membership Tier: <strong className="text-[#E3262E]">{user.clientTier}</strong>
                </div>
              </div>
            </div>

            {/* Right: Saved Addresses (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#0A2E73]" />
                  <h3 className="font-serif text-base font-bold text-[#071F52]">
                    White-Glove Saved Residences
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="px-3 py-1.5 rounded-xl bg-[#0A2E73] text-[#F8FAFC] text-xs font-semibold cursor-pointer hover:bg-[#071F52] flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Residence</span>
                </button>
              </div>

              {/* Add Address Form Modal / Inline Drawer */}
              {isAddingAddress && (
                <form
                  onSubmit={handleSaveAddress}
                  className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#CCD8CA] space-y-3 text-xs animate-in fade-in"
                >
                  <h4 className="font-bold text-[#071F52]">New Delivery Residence</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Label (e.g. Summer Villa)"
                      value={newAddressForm.label}
                      onChange={(e) => setNewAddressForm({ ...newAddressForm, label: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newAddressForm.fullName}
                      onChange={(e) => setNewAddressForm({ ...newAddressForm, fullName: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address Line (House, Flat, Street)"
                    value={newAddressForm.addressLine}
                    onChange={(e) => setNewAddressForm({ ...newAddressForm, addressLine: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] outline-none"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddressForm.city}
                      onChange={(e) => setNewAddressForm({ ...newAddressForm, city: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddressForm.state}
                      onChange={(e) => setNewAddressForm({ ...newAddressForm, state: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="PIN Code"
                      value={newAddressForm.pincode}
                      onChange={(e) => setNewAddressForm({ ...newAddressForm, pincode: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-[#0A2E73] text-[#F8FAFC] text-xs font-semibold cursor-pointer"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* Address Cards List */}
              <div className="space-y-3">
                {user.savedAddresses.length === 0 ? (
                  <p className="text-xs text-[#94A3B8] italic">No saved addresses yet.</p>
                ) : (
                  user.savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1 text-xs text-[#55645D]">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#071F52]">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.2 rounded-full bg-[#DBEAFE] text-[#0A2E73] text-[10px] font-bold">
                              Default
                            </span>
                          )}
                        </div>
                        <div>{addr.addressLine}</div>
                        <div>
                          {addr.locality ? `${addr.locality}, ` : ''}
                          {addr.city}, {addr.state} — {addr.pincode}
                        </div>
                        <div className="text-[11px] text-[#94A3B8] pt-1">Contact: +91 {addr.phone}</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeAddress(addr.id)}
                        className="text-[#94A3B8] hover:text-red-600 transition-colors p-1 cursor-pointer"
                        title="Delete address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GUEST ORDER DUAL-FACTOR VERIFICATION */}
        {activeTab === 'guest' && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
            <div className="text-center mb-6">
              <Lock className="w-10 h-10 text-[#E3262E] mx-auto mb-3" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#071F52] mb-1">
                Secure Guest Order Lookup
              </h3>
              <p className="text-xs text-[#64748B]">
                Dual-factor authentication: enter your Order Reference alongside the matching contact number or email address registered during checkout.
              </p>
            </div>

            <form onSubmit={handleGuestLookup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#071F52] mb-1.5">
                  Order Reference * (e.g. MF-2026-88412)
                </label>
                <input
                  type="text"
                  placeholder="MF-2026-XXXXX"
                  value={guestLookupId}
                  onChange={(e) => setGuestLookupId(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-xs sm:text-sm uppercase tracking-wider outline-none focus:border-[#0A2E73]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#071F52] mb-1.5">
                  Registered Email Address or 10-Digit Mobile *
                </label>
                <input
                  type="text"
                  placeholder="aarav.singhania@example.com or 9820145678"
                  value={guestLookupContact}
                  onChange={(e) => setGuestLookupContact(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm outline-none focus:border-[#0A2E73]"
                />
              </div>

              {guestLookupError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{guestLookupError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#E3262E]" />
                <span>Verify & Track Order</span>
              </button>
            </form>

            {/* Quick Demo Pre-fill for reviewer convenience */}
            <div className="mt-6 pt-6 border-t border-[#E2E8F0] text-center">
              <span className="text-[11px] text-[#94A3B8] block mb-2 font-medium">
                Try verified sample combinations:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setGuestLookupId('MF-2026-88412');
                    setGuestLookupContact('aarav.singhania@example.com');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#CCD8CA] text-[11px] text-[#0A2E73] hover:bg-[#0A2E73] hover:text-white transition-colors cursor-pointer"
                >
                  Aarav's Order (Valid)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGuestLookupId('MF-2026-88412');
                    setGuestLookupContact('wrong.email@example.com');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-red-200 text-[11px] text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Mismatch Test (Rejected)
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
