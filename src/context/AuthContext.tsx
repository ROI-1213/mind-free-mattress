import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CustomerUser, CustomerAddress } from '../services/authService';
import {
  getCurrentAuthUser,
  loginWithEmailOrPhone,
  loginWithPhoneAndEmailOtp,
  loginAsCustomer,
  logoutCustomer,
  updateCustomerProfile,
  addCustomerAddress,
  removeCustomerAddress,
  DEMO_CUSTOMERS,
} from '../services/authService';

interface AuthContextType {
  user: CustomerUser | null;
  isAuthenticated: boolean;
  demoUsers: CustomerUser[];
  login: (credential: string) => { success: boolean; message?: string };
  loginWithOtp: (params: {
    phone: string;
    email: string;
    fullName?: string;
  }) => { success: boolean; message?: string };
  switchCustomer: (email: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<CustomerUser>) => void;
  addAddress: (address: Omit<CustomerAddress, 'id'>) => void;
  removeAddress: (addressId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomerUser | null>(getCurrentAuthUser);

  useEffect(() => {
    setUser(getCurrentAuthUser());
    const handleStorageChange = () => {
      setUser(getCurrentAuthUser());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (credential: string) => {
    const res = loginWithEmailOrPhone(credential);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, message: res.error || 'Authentication failed.' };
  };

  const loginWithOtp = (params: { phone: string; email: string; fullName?: string }) => {
    const res = loginWithPhoneAndEmailOtp(params);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, message: res.error || 'Authentication failed.' };
  };

  const switchCustomer = (email: string) => {
    const updated = loginAsCustomer(email);
    if (updated) {
      setUser(updated);
    }
  };

  const logout = () => {
    logoutCustomer();
    setUser(null);
  };

  const updateProfile = (updates: Partial<CustomerUser>) => {
    const updated = updateCustomerProfile(updates);
    if (updated) setUser(updated);
  };

  const addAddress = (address: Omit<CustomerAddress, 'id'>) => {
    const updated = addCustomerAddress(address);
    if (updated) setUser(updated);
  };

  const removeAddress = (addressId: string) => {
    const updated = removeCustomerAddress(addressId);
    if (updated) setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        demoUsers: DEMO_CUSTOMERS,
        login,
        loginWithOtp,
        switchCustomer,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
