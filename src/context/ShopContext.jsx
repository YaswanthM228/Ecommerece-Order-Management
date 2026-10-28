import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/mockProducts';
import { initialOrders } from '../data/mockOrders';
import { initialCustomers } from '../data/mockCustomers';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount || 0);
};

export const ShopProvider = ({ children }) => {
  // 1. Theme State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('shopsphere_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('shopsphere_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = (val) => {
    if (val) {
      setTheme(val);
    } else {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }
  };

  // 2. Toast System
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // 3. Products State (persisted so admin CRUD changes reflect immediately)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  useEffect(() => {
    localStorage.setItem('shopsphere_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    const id = `prod-${Date.now()}`;
    const productWithDefaults = {
      id,
      rating: 4.5,
      reviewsCount: 1,
      gallery: [newProduct.image],
      isDeal: false,
      isNew: true,
      isBestSeller: false,
      isRecommended: false,
      specs: {},
      ...newProduct
    };
    setProducts(prev => [productWithDefaults, ...prev]);
    showToast(`Product "${newProduct.name}" added successfully!`);
    return productWithDefaults;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted from inventory', 'info');
  };

  // 4. Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'prod-3',
          name: 'boAt Wave Pro Smartwatch',
          subtitle: '1.85" HD Display | Bluetooth Calling',
          category: 'Mobiles & Tablets',
          brand: 'boAt',
          price: 2499,
          originalPrice: 3999,
          discount: 38,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added ${product.name} to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const [coupon, setCoupon] = useState({ code: 'SPHERE10', discountPercent: 10, applied: false });

  const applyCoupon = (code) => {
    if (code.trim().toUpperCase() === 'SPHERE10' || code.trim().toUpperCase() === 'VIPPERK') {
      setCoupon({ code: code.toUpperCase(), discountPercent: 10, applied: true });
      showToast('Coupon applied! 10% discount added.');
      return true;
    } else {
      showToast('Invalid coupon code. Try SPHERE10', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(prev => ({ ...prev, applied: false }));
    showToast('Coupon removed', 'info');
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartDiscount = coupon.applied ? Math.round(cartSubtotal * (coupon.discountPercent / 100)) : 0;
  const cartShipping = (cartSubtotal > 999 || cartSubtotal === 0) ? 0 : 99;
  const cartTax = Math.round((cartSubtotal - cartDiscount) * 0.18);
  const cartTotal = cartSubtotal - cartDiscount + cartShipping + cartTax;

  // 5. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-7'];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('shopsphere_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to wishlist!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // 6. Orders State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  useEffect(() => {
    localStorage.setItem('shopsphere_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      paymentStatus: 'Paid',
      deliveryTimeline: [
        { status: 'Order Placed', time: 'Just now', done: true },
        { status: 'Processing at Warehouse', time: 'Pending', done: true },
        { status: 'Out for Delivery', time: 'In 2-3 business days', done: false },
        { status: 'Delivered', time: 'Estimated Friday', done: false }
      ],
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${newOrder.id} confirmed!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order status updated to ${newStatus}`);
  };

  // 7. Customers State
  const [customers, setCustomers] = useState(initialCustomers);
  const toggleCustomerStatus = (id) => {
    setCustomers(prev => prev.map(c =>
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
    ));
    showToast('Customer status updated');
  };

  // 8. User / Auth State
  const [user, setUser] = useState({
    name: 'Yash Sharma',
    email: 'yash.sharma@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    isVip: true,
    vipTier: 'Gold Member',
    joinedDate: 'Jan 2026'
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const loginUser = (userData) => {
    setUser({
      name: userData.name || 'Yash Sharma',
      email: userData.email,
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      isVip: true,
      vipTier: 'Gold Member',
      joinedDate: 'Jan 2026'
    });
    showToast(`Welcome back, ${userData.name || 'Yash'}!`);
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const loginAdmin = () => {
    setIsAdminLoggedIn(true);
    showToast('Admin access authorized. Welcome back, Administrator.');
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    showToast('Admin signed out', 'info');
  };

  // 9. Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Order Dispatched', message: 'Your boAt Wave Pro has been dispatched!', time: '10m ago', unread: true },
    { id: 2, title: 'VIP Exclusive Deal', message: 'Extra 10% off unlocked on Electronics!', time: '1h ago', unread: true },
    { id: 3, title: 'Price Drop Alert', message: 'Dell Inspiron 15 price dropped by 21% today.', time: '3h ago', unread: true }
  ]);

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('All notifications marked as read');
  };

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  // 10. Global Search & Category Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 11. Modals for floating utilities
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isClaimOfferOpen, setIsClaimOfferOpen] = useState(false);

  return (
    <ShopContext.Provider value={{
      theme,
      toggleTheme,
      toast,
      showToast,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartSubtotal,
      cartItemCount,
      cartDiscount,
      cartShipping,
      cartTax,
      cartTotal,
      coupon,
      applyCoupon,
      removeCoupon,
      wishlist,
      toggleWishlist,
      isInWishlist,
      orders,
      addOrder,
      updateOrderStatus,
      customers,
      toggleCustomerStatus,
      user,
      loginUser,
      logoutUser,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      notifications,
      unreadNotificationsCount,
      markAllNotificationsRead,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      isAIAssistantOpen,
      setIsAIAssistantOpen,
      isClaimOfferOpen,
      setIsClaimOfferOpen
    }}>
      {children}
    </ShopContext.Provider>
  );
};
