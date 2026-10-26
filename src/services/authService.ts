export interface CustomerAddress {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  addressLine: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  clientTier: 'Mindfree Atelier Patron' | 'Private Sanctuary Member';
  memberSinceYear: number;
  savedAddresses: CustomerAddress[];
}

const AUTH_STORAGE_KEY = 'mindfree_auth_session_v2';
const CUSTOMERS_REGISTRY_KEY = 'mindfree_customers_registry_v1';

// Seed authorized customers corresponding to verified orders & empty state testing
export const DEMO_CUSTOMERS: CustomerUser[] = [
  {
    id: 'usr-aarav-01',
    fullName: 'Aarav Singhania',
    email: 'aarav.singhania@example.com',
    phone: '9820145678',
    clientTier: 'Mindfree Atelier Patron',
    memberSinceYear: 2024,
    savedAddresses: [
      {
        id: 'addr-aarav-01',
        label: 'Primary Residence',
        fullName: 'Aarav Singhania',
        phone: '9820145678',
        addressLine: 'Flat 14B, Regency Crest, Lavelle Road',
        locality: 'Shanthala Nagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        landmark: 'Near UB City',
        isDefault: true,
      },
    ],
  },
  {
    id: 'usr-meera-02',
    fullName: 'Meera Deshmukh',
    email: 'meera.deshmukh@example.com',
    phone: '9819234567',
    clientTier: 'Mindfree Atelier Patron',
    memberSinceYear: 2025,
    savedAddresses: [
      {
        id: 'addr-meera-01',
        label: 'Altamount Residence',
        fullName: 'Meera Deshmukh',
        phone: '9819234567',
        addressLine: 'Villa 9, Altamount Heights, Altamount Road',
        locality: 'Cumballa Hill',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400026',
        landmark: 'Opposite South Villa',
        isDefault: true,
      },
    ],
  },
  {
    id: 'usr-rohan-03',
    fullName: 'Rohan Kapoor',
    email: 'rohan.kapoor@example.com',
    phone: '9876543210',
    clientTier: 'Private Sanctuary Member',
    memberSinceYear: 2026,
    savedAddresses: [
      {
        id: 'addr-rohan-01',
        label: 'Defence Colony Home',
        fullName: 'Rohan Kapoor',
        phone: '9876543210',
        addressLine: 'C-42, Defence Colony, Ground Floor',
        locality: 'Defence Colony',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110024',
        landmark: 'Near Main Market',
        isDefault: true,
      },
    ],
  },
];

const getCustomerRegistry = (): CustomerUser[] => {
  if (typeof window === 'undefined') return DEMO_CUSTOMERS;
  try {
    const raw = localStorage.getItem(CUSTOMERS_REGISTRY_KEY);
    if (!raw) {
      localStorage.setItem(CUSTOMERS_REGISTRY_KEY, JSON.stringify(DEMO_CUSTOMERS));
      return DEMO_CUSTOMERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEMO_CUSTOMERS;
  } catch {
    return DEMO_CUSTOMERS;
  }
};

const saveToCustomerRegistry = (user: CustomerUser): void => {
  if (typeof window === 'undefined') return;
  try {
    const registry = getCustomerRegistry();
    const cleanEmail = user.email.toLowerCase().trim();
    const cleanPhone = user.phone.replace(/\D/g, '').slice(-10);
    const idx = registry.findIndex(
      (c) =>
        c.id === user.id ||
        c.email.toLowerCase().trim() === cleanEmail ||
        (cleanPhone.length === 10 && c.phone.replace(/\D/g, '').endsWith(cleanPhone))
    );
    if (idx >= 0) {
      registry[idx] = user;
    } else {
      registry.unshift(user);
    }
    localStorage.setItem(CUSTOMERS_REGISTRY_KEY, JSON.stringify(registry));
  } catch {
    // ignore storage errors
  }
};

/**
 * Retrieve the currently logged-in customer session.
 * Returns null if the user has not logged in or has logged out.
 * Once logged in, the session persists across refreshes and browser restarts until logout.
 */
export const getCurrentAuthUser = (): CustomerUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    // Clean up legacy v1 auto-seeded key so logged-out state is respected
    localStorage.removeItem('mindfree_auth_session_v1');
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.email) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const loginWithPhoneAndEmailOtp = (params: {
  phone: string;
  email: string;
  fullName?: string;
}): { success: boolean; user?: CustomerUser; error?: string } => {
  const cleanEmail = params.email.trim().toLowerCase();
  const cleanDigits = params.phone.replace(/\D/g, '');
  const phone10 = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : cleanDigits;

  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Please enter a valid Email ID.' };
  }
  if (phone10.length < 10) {
    return { success: false, error: 'Please enter a valid 10-digit Phone Number.' };
  }

  const registry = getCustomerRegistry();
  const existing = registry.find(
    (c) =>
      c.email.toLowerCase().trim() === cleanEmail ||
      c.phone.replace(/\D/g, '').endsWith(phone10)
  );

  const derivedName =
    params.fullName && params.fullName.trim()
      ? params.fullName.trim()
      : existing?.fullName ||
        cleanEmail
          .split('@')[0]
          .replace(/[._-]+/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());

  const authenticatedUser: CustomerUser = existing
    ? {
        ...existing,
        fullName: derivedName,
        email: cleanEmail,
        phone: phone10,
      }
    : {
        id: `usr-client-${Date.now()}`,
        fullName: derivedName,
        email: cleanEmail,
        phone: phone10,
        clientTier: 'Mindfree Atelier Patron',
        memberSinceYear: new Date().getFullYear(),
        savedAddresses: [],
      };

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
    saveToCustomerRegistry(authenticatedUser);
  } catch (e) {
    console.error('Session write error', e);
  }

  return { success: true, user: authenticatedUser };
};

export const loginWithEmailOrPhone = (credential: string): { success: boolean; user?: CustomerUser; error?: string } => {
  const clean = credential.trim().toLowerCase();
  const digits = credential.replace(/\D/g, '');
  const registry = getCustomerRegistry();

  const match = registry.find((c) => {
    return c.email.toLowerCase() === clean || (digits.length >= 10 && c.phone.endsWith(digits.slice(-10)));
  });

  if (match) {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(match));
      saveToCustomerRegistry(match);
    } catch (e) {
      console.error('Session write error', e);
    }
    return { success: true, user: match };
  }

  // Create a profile if not in registry
  const guestUser: CustomerUser = {
    id: `usr-client-${Date.now()}`,
    fullName: clean.includes('@') ? clean.split('@')[0].replace('.', ' ').toUpperCase() : 'Mindfree Client',
    email: clean.includes('@') ? clean : `${digits}@mindfree.client`,
    phone: digits.length >= 10 ? digits.slice(-10) : '9800000000',
    clientTier: 'Private Sanctuary Member',
    memberSinceYear: new Date().getFullYear(),
    savedAddresses: [],
  };

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(guestUser));
    saveToCustomerRegistry(guestUser);
  } catch {
    // Ignore storage issues
  }

  return { success: true, user: guestUser };
};

export const loginAsCustomer = (email: string): CustomerUser | null => {
  const registry = getCustomerRegistry();
  const match = registry.find((c) => c.email.toLowerCase() === email.toLowerCase().trim());
  if (match) {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(match));
    } catch {
      // Ignore
    }
    return match;
  }
  return null;
};

export const logoutCustomer = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem('mindfree_auth_session_v1');
  } catch {
    // Ignore
  }
};

export const updateCustomerProfile = (updates: Partial<CustomerUser>): CustomerUser | null => {
  const current = getCurrentAuthUser();
  if (!current) return null;

  const updated = { ...current, ...updates };
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    saveToCustomerRegistry(updated);
  } catch {
    // Ignore
  }
  return updated;
};

export const addCustomerAddress = (address: Omit<CustomerAddress, 'id'>): CustomerUser | null => {
  const current = getCurrentAuthUser();
  if (!current) return null;

  const newAddress: CustomerAddress = {
    ...address,
    id: `addr-${Date.now()}`,
  };

  const updatedAddresses = address.isDefault
    ? current.savedAddresses.map((a) => ({ ...a, isDefault: false })).concat(newAddress)
    : [...current.savedAddresses, newAddress];

  return updateCustomerProfile({ savedAddresses: updatedAddresses });
};

export const removeCustomerAddress = (addressId: string): CustomerUser | null => {
  const current = getCurrentAuthUser();
  if (!current) return null;

  const updatedAddresses = current.savedAddresses.filter((a) => a.id !== addressId);
  return updateCustomerProfile({ savedAddresses: updatedAddresses });
};
