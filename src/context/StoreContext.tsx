import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductColor, Order, CheckoutForm, ActiveView, CategoryId } from '../types';
import { PRODUCTS } from '../data/products';
import confetti from 'canvas-confetti';

interface StoreContextType {
  // Navigation & Filtering
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  appliedCoupon: string | null;
  discountAmount: number;
  grandTotal: number;
  addToCart: (product: Product, quantity?: number, color?: ProductColor) => void;
  removeFromCart: (productId: string, colorHex: string) => void;
  updateQuantity: (productId: string, colorHex: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeProductModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  buyNow: (product: Product, quantity?: number, color?: ProductColor) => void;

  // Orders
  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (form: CheckoutForm) => Promise<Order>;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Currency & Formatting
  currency: 'USD' | 'KHR';
  setCurrency: (currency: 'USD' | 'KHR') => void;
  formatPrice: (usdAmount: number) => string;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEYS = {
  CART: 'nexusgear_cart_v1',
  WISHLIST: 'nexusgear_wishlist_v1',
  ORDERS: 'nexusgear_orders_v1',
  CURRENCY: 'nexusgear_currency_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [
        // Nice initial default demo items so cart is immediately demonstrable if visited
        {
          product: PRODUCTS[0],
          quantity: 1,
          selectedColor: PRODUCTS[0].colors[0],
        },
        {
          product: PRODUCTS[10],
          quantity: 1,
          selectedColor: PRODUCTS[10].colors[0],
        }
      ];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Currency
  const [currency, setCurrency] = useState<'USD' | 'KHR'>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEYS.CURRENCY) as 'USD' | 'KHR') || 'USD';
    } catch {
      return 'USD';
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-2'];
    } catch {
      return [];
    }
  });

  // Orders history
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Persist currency
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
    } catch {
      // ignore
    }
  }, [currency]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const formatPrice = (usdAmount: number): string => {
    if (currency === 'KHR') {
      const khrRate = 4100;
      const khrAmount = Math.round(usdAmount * khrRate);
      return `${khrAmount.toLocaleString()} ៛`;
    }
    return `$${usdAmount.toFixed(2)}`;
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from wishlist' : 'Saved to wishlist ❤️');
      return updated;
    });
  };

  const addToCart = (product: Product, quantity = 1, color?: ProductColor) => {
    const chosenColor = color || product.colors[0];
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.hex === chosenColor.hex
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, quantity, selectedColor: chosenColor }];
    });
    showToast(`Added ${quantity}x ${product.name} to cart`);
  };

  const buyNow = (product: Product, quantity = 1, color?: ProductColor) => {
    const chosenColor = color || product.colors[0];
    addToCart(product, quantity, chosenColor);
    if (activeProductModal) {
      setActiveProductModal(null);
    }
    setIsCheckoutOpen(true);
  };

  const removeFromCart = (productId: string, colorHex: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedColor.hex === colorHex)));
    showToast('Item removed from cart');
  };

  const updateQuantity = (productId: string, colorHex: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorHex);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor.hex === colorHex) {
          return { ...item, quantity: Math.min(quantity, 99) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Free shipping on orders over $50, otherwise $2.00 flat rate
  const shippingFee = subtotal === 0 ? 0 : subtotal >= 50 ? 0 : 2.0;

  // Coupon calculations
  let discountAmount = 0;
  if (appliedCoupon === 'TECH10') {
    discountAmount = Number((subtotal * 0.1).toFixed(2));
  } else if (appliedCoupon === 'BAKONG' || appliedCoupon === 'NEXUS5') {
    discountAmount = Math.min(5, subtotal);
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'TECH10') {
      setAppliedCoupon('TECH10');
      showToast('🎉 Coupon TECH10 applied: 10% discount!');
      return { success: true, message: '10% discount applied successfully!' };
    }
    if (clean === 'BAKONG' || clean === 'NEXUS5') {
      setAppliedCoupon(clean);
      showToast('🎉 Coupon applied: $5.00 off your order!');
      return { success: true, message: '$5.00 off applied successfully!' };
    }
    return { success: false, message: 'Invalid promo code. Try "TECH10" or "BAKONG"' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon code removed');
  };

  const openProductModal = (product: Product) => {
    setActiveProductModal(product);
  };

  const closeProductModal = () => {
    setActiveProductModal(null);
  };

  const placeOrder = async (form: CheckoutForm): Promise<Order> => {
    // Generate order ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `NXG-${randomNum}`;
    const now = new Date();

    // Delivery estimate: 2-4 hours for Phnom Penh, 1-2 days for provinces
    const isPhnomPenh = form.cityProvince.toLowerCase().includes('phnom penh');
    const estimatedDelivery = isPhnomPenh
      ? 'Today within 2-4 hours (Express Phnom Penh Dispatch)'
      : 'Tomorrow or next day (1-2 business days via Virak Buntham/J&T)';

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: now.toISOString(),
      items: [...cart],
      customer: form,
      subtotal,
      shippingFee,
      discountAmount,
      total: grandTotal,
      paymentMethod: form.paymentMethod,
      paymentStatus: form.paymentMethod === 'cod' ? 'pay_on_delivery' : 'paid',
      deliveryStatus: 'processing',
      estimatedDelivery,
    };

    // Save order
    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#3B82F6', '#60A5FA', '#F59E0B'],
      });
    } catch {
      // ignore
    }

    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cart,
        cartCount,
        subtotal,
        shippingFee,
        appliedCoupon,
        discountAmount,
        grandTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeProductModal,
        openProductModal,
        closeProductModal,
        buyNow,
        orders,
        lastPlacedOrder,
        placeOrder,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        wishlist,
        toggleWishlist,
        currency,
        setCurrency,
        formatPrice,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
