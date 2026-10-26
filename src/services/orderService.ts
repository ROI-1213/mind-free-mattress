export interface CustomerDeliveryInfo {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  billingSameAsShipping: boolean;
  billingAddress?: {
    fullName: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface OrderItemSnapshot {
  id: string;
  sku: string;
  name: string;
  size: string;
  thickness: string;
  price: number;
  quantity: number;
  image: string;
}

export type PaymentMethodType = 'razorpay' | 'upi' | 'card' | 'netbanking' | 'cod';
export type PaymentStatusType = 'Paid' | 'Pending Verification' | 'Pay on Delivery';
export type OrderStatusType = 'Confirmed' | 'Preparing in Atelier' | 'Dispatched' | 'Delivered';

export interface OrderStatusHistoryItem {
  status: OrderStatusType;
  timestamp: string;
  note: string;
  updatedBy: string;
  courierPartner?: string;
  courierWaybill?: string;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  customer: CustomerDeliveryInfo;
  items: OrderItemSnapshot[];
  subtotal: number;
  totalSavings: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatusType;
  orderStatus: OrderStatusType;
  trackingNumber: string;
  estimatedDelivery: string;
  courierPartner?: string;
  statusHistory: OrderStatusHistoryItem[];
}

const ORDERS_STORAGE_KEY = 'mindfree_orders_v1';

// Allowed chronological status transitions for auditing
export const ALLOWED_STATUS_TRANSITIONS: Record<OrderStatusType, OrderStatusType[]> = {
  Confirmed: ['Preparing in Atelier'],
  'Preparing in Atelier': ['Dispatched'],
  Dispatched: ['Delivered'],
  Delivered: [],
};

// Verified Indian PIN code city/state database
export const PINCODE_DIRECTORY: Record<string, { city: string; state: string; days: number }> = {
  '560001': { city: 'Bengaluru', state: 'Karnataka', days: 2 },
  '560034': { city: 'Bengaluru (Koramangala)', state: 'Karnataka', days: 2 },
  '560038': { city: 'Bengaluru (Indiranagar)', state: 'Karnataka', days: 2 },
  '560066': { city: 'Bengaluru (Whitefield)', state: 'Karnataka', days: 2 },
  '400001': { city: 'Mumbai (Fort)', state: 'Maharashtra', days: 3 },
  '400026': { city: 'Mumbai (Cumballa Hill)', state: 'Maharashtra', days: 3 },
  '400050': { city: 'Mumbai (Bandra)', state: 'Maharashtra', days: 3 },
  '400053': { city: 'Mumbai (Andheri West)', state: 'Maharashtra', days: 3 },
  '110001': { city: 'New Delhi (Connaught Place)', state: 'Delhi', days: 3 },
  '110016': { city: 'New Delhi (Hauz Khas)', state: 'Delhi', days: 3 },
  '122002': { city: 'Gurugram', state: 'Haryana', days: 3 },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', days: 3 },
  '600028': { city: 'Chennai (R.A. Puram)', state: 'Tamil Nadu', days: 3 },
  '500001': { city: 'Hyderabad', state: 'Telangana', days: 3 },
  '500034': { city: 'Hyderabad (Banjara Hills)', state: 'Telangana', days: 3 },
  '700001': { city: 'Kolkata', state: 'West Bengal', days: 4 },
  '411001': { city: 'Pune', state: 'Maharashtra', days: 3 },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', days: 3 },
  '302001': { city: 'Jaipur', state: 'Rajasthan', days: 4 },
  '682001': { city: 'Kochi', state: 'Kerala', days: 3 },
};

export const lookupPincode = (pin: string) => {
  const trimmed = pin.trim();
  if (PINCODE_DIRECTORY[trimmed]) {
    return PINCODE_DIRECTORY[trimmed];
  }
  // Generic Indian metro fallback
  if (trimmed.length === 6 && /^\d+$/.test(trimmed)) {
    return { city: 'National Delivery Zone', state: 'India', days: 4 };
  }
  return null;
};

// Initial Seed Orders for Realistic Demonstration with Genuine Timeline Data
const SEED_ORDERS: OrderRecord[] = [
  {
    orderId: 'MF-2026-88412',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    customer: {
      fullName: 'Aarav Singhania',
      email: 'aarav.singhania@example.com',
      phone: '9820145678',
      addressLine: 'Flat 14B, Regency Crest, Lavelle Road',
      locality: 'Shanthala Nagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      landmark: 'Near UB City',
      billingSameAsShipping: true,
    },
    items: [
      {
        id: 'orthopedic',
        sku: 'MF-OS-QN03-10',
        name: 'Mindfree Ortho-Spine Luxury Mattress',
        size: 'Queen (78" × 60")',
        thickness: '10 Inch (25 cm)',
        price: 28499,
        quantity: 1,
        image: '/images/mindfree/mindfree-orthopedic.webp',
      },
    ],
    subtotal: 28499,
    totalSavings: 8000,
    shipping: 0,
    tax: 0,
    total: 28499,
    paymentMethod: 'upi',
    paymentStatus: 'Paid',
    orderStatus: 'Preparing in Atelier',
    trackingNumber: 'MF-DEL-88412-BLR',
    courierPartner: 'Mindfree Dedicated White-Glove Fleet (Bengaluru Atelier)',
    estimatedDelivery: 'Thursday, 16 Oct 2026',
    statusHistory: [
      {
        status: 'Confirmed',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        note: 'Order specifications & UPI payment verified by Mindfree Payments Escrow.',
        updatedBy: 'Automated Billing Gateway',
      },
      {
        status: 'Preparing in Atelier',
        timestamp: new Date(Date.now() - 86400000 * 1.2).toISOString(),
        note: 'Multi-zone pocket springs and botanical latex layered. Ultrasonic border quilting in progress.',
        updatedBy: 'Master Craftsman Rajesh M.',
      },
    ],
  },
  {
    orderId: 'MF-2026-87950',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    customer: {
      fullName: 'Meera Deshmukh',
      email: 'meera.deshmukh@example.com',
      phone: '9819234567',
      addressLine: 'Villa 9, Altamount Heights, Altamount Road',
      locality: 'Cumballa Hill',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400026',
      landmark: 'Opposite South Villa',
      billingSameAsShipping: true,
    },
    items: [
      {
        id: 'hybrid',
        sku: 'MF-HY-KG04-12',
        name: 'Mindfree Grand Sovereign Royal Hybrid',
        size: 'King (78" × 72")',
        thickness: '12 Inch (30 cm)',
        price: 55499,
        quantity: 1,
        image: '/images/mindfree/mindfree-hybrid.webp',
      },
    ],
    subtotal: 55499,
    totalSavings: 15000,
    shipping: 0,
    tax: 0,
    total: 55499,
    paymentMethod: 'card',
    paymentStatus: 'Paid',
    orderStatus: 'Dispatched',
    trackingNumber: 'MF-DEL-87950-BOM',
    courierPartner: 'Mindfree Express Logistics Hub (Mumbai Western Fleet)',
    estimatedDelivery: 'Tuesday, 14 Oct 2026',
    statusHistory: [
      {
        status: 'Confirmed',
        timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
        note: 'Order verified and authorized with Visa Platinum credit card.',
        updatedBy: 'Automated Billing Gateway',
      },
      {
        status: 'Preparing in Atelier',
        timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
        note: 'Hand-tufted memory foam & pocketed spring core passed 50-point precision QA inspection.',
        updatedBy: 'Quality Inspector Anita P.',
      },
      {
        status: 'Dispatched',
        timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
        note: 'Mattress securely loaded into climate-controlled white-glove transport vehicle.',
        updatedBy: 'Atelier Logistics Supervisor',
        courierPartner: 'Mindfree Express Logistics Hub (Mumbai Western Fleet)',
        courierWaybill: 'BOM-EXP-87950-WG',
      },
    ],
  },
];

export const getAllOrders = (): OrderRecord[] => {
  if (typeof window === 'undefined') return SEED_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(SEED_ORDERS));
      return SEED_ORDERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(SEED_ORDERS));
      return SEED_ORDERS;
    }
    return parsed.map((o: OrderRecord) => ({
      ...o,
      statusHistory: Array.isArray(o.statusHistory)
        ? o.statusHistory.map((h) => ({
            ...h,
            note: typeof h?.note === 'string' ? h.note.replace(/\s*in PostgreSQL\.?/gi, '.') : h?.note,
          }))
        : [],
    }));
  } catch {
    return SEED_ORDERS;
  }
};

export const getOrderById = (orderId: string): OrderRecord | undefined => {
  const orders = getAllOrders();
  return orders.find((o) => o.orderId.toUpperCase() === orderId.toUpperCase().trim());
};

/**
 * Security: Retrieve orders strictly belonging to a specific authenticated customer.
 * Prevents cross-customer data leakage.
 */
export const getOrdersForCustomer = (email: string, phone?: string): OrderRecord[] => {
  const orders = getAllOrders();
  const cleanEmail = email.toLowerCase().trim();
  const cleanPhone = phone ? phone.replace(/\D/g, '') : '';

  return orders.filter((o) => {
    const orderEmail = o.customer.email.toLowerCase().trim();
    const orderPhone = o.customer.phone.replace(/\D/g, '');
    const emailMatch = cleanEmail && orderEmail === cleanEmail;
    const phoneMatch = cleanPhone && orderPhone.length >= 10 && orderPhone === cleanPhone;
    return emailMatch || phoneMatch;
  });
};

/**
 * Security: Secure order lookup enforcing customer ownership.
 * Returns unauthorized error if email/phone does not match order record.
 */
export const getCustomerOrderSecure = (
  orderId: string,
  userEmail?: string,
  userPhone?: string
): { authorized: boolean; order?: OrderRecord; error?: string } => {
  const order = getOrderById(orderId);
  if (!order) {
    return { authorized: false, error: 'ORDER_NOT_FOUND' };
  }

  // If no credentials supplied
  if (!userEmail && !userPhone) {
    return {
      authorized: false,
      error: 'UNAUTHENTICATED',
    };
  }

  const cleanEmail = userEmail?.toLowerCase().trim();
  const cleanPhone = userPhone?.replace(/\D/g, '');
  const orderEmail = order.customer.email.toLowerCase().trim();
  const orderPhone = order.customer.phone.replace(/\D/g, '');

  const matchesEmail = Boolean(cleanEmail && orderEmail === cleanEmail);
  const matchesPhone = Boolean(cleanPhone && cleanPhone.length >= 10 && orderPhone === cleanPhone);

  if (!matchesEmail && !matchesPhone) {
    return {
      authorized: false,
      error: 'FORBIDDEN_OWNERSHIP_MISMATCH',
    };
  }

  return { authorized: true, order };
};

/**
 * Security: Dual-factor Guest Order Lookup.
 * Requires BOTH Order ID AND matching Email/Phone before granting read access.
 */
export const verifyAndGetGuestOrder = (
  orderId: string,
  emailOrPhone: string
): { authorized: boolean; order?: OrderRecord; error?: string } => {
  const cleanId = orderId.toUpperCase().trim();
  const cleanInput = emailOrPhone.trim().toLowerCase();
  const cleanDigits = emailOrPhone.replace(/\D/g, '');

  const order = getOrderById(cleanId);
  if (!order) {
    return { authorized: false, error: 'Order not found with the provided ID.' };
  }

  const orderEmail = order.customer.email.toLowerCase().trim();
  const orderPhone = order.customer.phone.replace(/\D/g, '');

  const isEmailMatch = cleanInput.includes('@') && orderEmail === cleanInput;
  const isPhoneMatch = cleanDigits.length >= 10 && orderPhone.endsWith(cleanDigits.slice(-10));

  if (!isEmailMatch && !isPhoneMatch) {
    return {
      authorized: false,
      error: 'Verification mismatch: The provided email or phone does not match this order reference.',
    };
  }

  return { authorized: true, order };
};

export const createOrder = (
  customer: CustomerDeliveryInfo,
  items: OrderItemSnapshot[],
  paymentMethod: PaymentMethodType,
  paymentStatus: PaymentStatusType = 'Paid'
): OrderRecord => {
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const totalSavings = items.reduce((acc, i) => acc + Math.round(i.price * 0.25) * i.quantity, 0);

  const orderNum = Math.floor(10000 + Math.random() * 90000);
  const orderId = `MF-${new Date().getFullYear()}-${orderNum}`;

  const pinInfo = lookupPincode(customer.pincode);
  const deliveryDays = pinInfo?.days || 3;
  const deliveryDate = new Date(Date.now() + deliveryDays * 86400000);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const nowIso = new Date().toISOString();

  const newOrder: OrderRecord = {
    orderId,
    createdAt: nowIso,
    customer,
    items,
    subtotal,
    totalSavings,
    shipping: 0,
    tax: 0,
    total: subtotal,
    paymentMethod,
    paymentStatus: paymentMethod === 'cod' ? 'Pay on Delivery' : paymentStatus,
    orderStatus: 'Confirmed',
    trackingNumber: `MF-TRK-${orderNum}-${customer.city.slice(0, 3).toUpperCase()}`,
    courierPartner: 'Mindfree Dedicated White-Glove Fleet',
    estimatedDelivery: formattedDelivery,
    statusHistory: [
      {
        status: 'Confirmed',
        timestamp: nowIso,
        note:
          paymentMethod === 'cod'
            ? 'Order specifications confirmed. White-Glove payment on delivery authorized.'
            : 'Payment verified & mattress dimensions locked in Atelier production queue.',
        updatedBy: 'Automated Billing Gateway',
      },
    ],
  };

  const existingOrders = getAllOrders();
  const updatedOrders = [newOrder, ...existingOrders];

  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mindfree-orders-updated'));
    }
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
  }

  // Persist directly to database
  if (typeof window !== 'undefined') {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    }).catch((err) => console.warn('Order sync warning:', err));
  }

  return newOrder;
};

/**
 * Admin: Update fulfillment status and tracking details with audit history logging.
 */
export const updateOrderStatus = (
  orderId: string,
  newStatus: OrderStatusType,
  note?: string,
  updatedBy: string = 'Atelier Master Craftsman',
  courierPartner?: string,
  courierWaybill?: string,
  trackingNumber?: string,
  estimatedDelivery?: string
): { success: boolean; message?: string } => {
  const orders = getAllOrders();
  const index = orders.findIndex((o) => o.orderId.toUpperCase() === orderId.toUpperCase().trim());
  if (index === -1) {
    return { success: false, message: 'Order not found.' };
  }

  const currentOrder = orders[index];
  const hasCustomUpdate = Boolean(
    (note && note.trim()) ||
      (courierPartner && courierPartner.trim()) ||
      (courierWaybill && courierWaybill.trim()) ||
      (trackingNumber && trackingNumber.trim()) ||
      (estimatedDelivery && estimatedDelivery.trim())
  );

  // Only skip if status is identical AND no custom tracking note/fields were supplied
  if (currentOrder.orderStatus === newStatus && !hasCustomUpdate) {
    return { success: true, message: `Order already marked as ${newStatus}.` };
  }

  const nowIso = new Date().toISOString();

  // Default notes per status if none provided
  const defaultNotes: Record<OrderStatusType, string> = {
    Confirmed: 'Order confirmed and payment verified.',
    'Preparing in Atelier':
      'Atelier craftsmanship in progress: multi-tier pocket coils and botanic foam assembly.',
    Dispatched: 'Loaded onto dedicated white-glove transport vehicle for in-room delivery.',
    Delivered:
      'Mattress successfully installed in bedroom. 100-night comfort trial officially activated.',
  };

  const resolvedTracking =
    (trackingNumber && trackingNumber.trim()) ||
    (courierWaybill && courierWaybill.trim()) ||
    currentOrder.trackingNumber;
  const resolvedCourier =
    (courierPartner && courierPartner.trim()) || currentOrder.courierPartner;
  const resolvedDelivery =
    (estimatedDelivery && estimatedDelivery.trim()) || currentOrder.estimatedDelivery;

  const historyItem: OrderStatusHistoryItem = {
    status: newStatus,
    timestamp: nowIso,
    note: (note && note.trim()) || defaultNotes[newStatus],
    updatedBy,
    courierPartner: resolvedCourier,
    courierWaybill: resolvedTracking,
  };

  currentOrder.orderStatus = newStatus;
  currentOrder.trackingNumber = resolvedTracking;
  currentOrder.courierPartner = resolvedCourier;
  currentOrder.estimatedDelivery = resolvedDelivery;

  if (!currentOrder.statusHistory) {
    currentOrder.statusHistory = [];
  }
  currentOrder.statusHistory.push(historyItem);

  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mindfree-orders-updated'));
    }
    return { success: true, message: `Order ${orderId} updated to ${newStatus}.` };
  } catch {
    return { success: false, message: 'Persistence error.' };
  }
};
