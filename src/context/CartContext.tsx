'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products } from '@/data/products';

interface CartItem extends Product {
    quantity: number;
}

interface User {
    name: string;
    email: string;
    tier: string;
}

interface AvailabilityFilter {
    inStock: boolean;
    backorder: boolean;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
    totalWeight: number;
    palletUtilization: number;
    bulkDiscount: number;
    isAuthenticated: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isApplicationSubmitted: boolean;
    applicationData: any;
    submitApplication: (data: any) => void;
    taxExemptStatus: 'none' | 'pending' | 'verified';
    setTaxExemptStatus: (status: 'none' | 'pending' | 'verified') => void;
    // New Filter State
    availabilityFilter: AvailabilityFilter;
    setAvailabilityFilter: (filter: AvailabilityFilter) => void;
    brandFilters: string[];
    setBrandFilters: (brands: string[]) => void;
    packagingFilter: 'All' | 'Pallet' | 'Case';
    setPackagingFilter: (type: 'All' | 'Pallet' | 'Case') => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    addBySKU: (sku: string, qty: number) => { success: boolean; message: string };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);
    const [applicationData, setApplicationData] = useState<any>(null);
    const [taxExemptStatus, setInternalTaxExemptStatus] = useState<'none' | 'pending' | 'verified'>('none');

    // Filter State
    const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>({ inStock: true, backorder: true });
    const [brandFilters, setBrandFilters] = useState<string[]>([]);
    const [packagingFilter, setPackagingFilter] = useState<'All' | 'Pallet' | 'Case'>('All');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

    // Load auth state from localStorage
    useEffect(() => {
        const storedAuth = localStorage.getItem('heidi_auth');
        if (storedAuth) {
            const authData = JSON.parse(storedAuth);
            setIsAuthenticated(authData.isAuthenticated);
            setUser(authData.user);
        }

        const storedAppData = localStorage.getItem('heidi_app_data');
        if (storedAppData) {
            setIsApplicationSubmitted(true);
            setApplicationData(JSON.parse(storedAppData));
        }

        const storedTaxStatus = localStorage.getItem('heidi_tax_status');
        if (storedTaxStatus) {
            setInternalTaxExemptStatus(storedTaxStatus as any);
        }
    }, []);

    const addToCart = (product: Product, quantity: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    const addBySKU = (sku: string, qty: number) => {
        const product = products.find(p => p.sku.toUpperCase() === sku.toUpperCase());
        if (product) {
            addToCart(product, qty);
            return { success: true, message: `SKU ${sku.toUpperCase()} added to order.` };
        }
        return { success: false, message: `Protocol Error: SKU ${sku.toUpperCase()} not found in inventory.` };
    };

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.casePrice * item.quantity), 0);
    const totalWeight = cart.reduce((sum, item) => sum + (item.weightPerCase * item.quantity), 0);
    const palletUtilization = Math.min((totalWeight / 2000) * 100, 100);
    const bulkDiscount = subtotal > 2000 ? subtotal * 0.05 : 0;

    const login = (userData: User) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('heidi_auth', JSON.stringify({ isAuthenticated: true, user: userData }));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('heidi_auth');
    };

    const submitApplication = (data: any) => {
        setApplicationData(data);
        setIsApplicationSubmitted(true);
        localStorage.setItem('heidi_app_data', JSON.stringify(data));
    };

    const setTaxExemptStatus = (status: 'none' | 'pending' | 'verified') => {
        setInternalTaxExemptStatus(status);
        localStorage.setItem('heidi_tax_status', status);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            itemCount,
            subtotal,
            totalWeight,
            palletUtilization,
            bulkDiscount,
            isAuthenticated,
            user,
            login,
            logout,
            searchQuery,
            setSearchQuery,
            isApplicationSubmitted,
            applicationData,
            submitApplication,
            taxExemptStatus,
            setTaxExemptStatus,
            availabilityFilter,
            setAvailabilityFilter,
            brandFilters,
            setBrandFilters,
            packagingFilter,
            setPackagingFilter,
            priceRange,
            setPriceRange,
            addBySKU
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
