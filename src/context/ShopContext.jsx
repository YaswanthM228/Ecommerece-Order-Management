import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialProducts } from '../data/mockProducts';
import { categories as initialCategories } from '../data/mockCategories';
import { initialOrders } from '../data/mockOrders';
import { initialCustomers } from '../data/mockCustomers';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { orderService } from '../services/orderService';
import { authService } from '../services/authService';

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

// Map backend product record to frontend format
const formatBackendProduct = (p) => ({
  id: p.id ? String(p.id) : p.sku,
  dbId: p.id,
  name: p.name,
  subtitle: p.short_description || p.brand,
  category: p.category_name,
  categorySlug: p.category_slug,
  brand: p.brand,
  sku: p.sku,
  price: Number(p.price),
  originalPrice: Number(p.original_price),
  discount: Number(p.discount_percent || 0),
  rating: Number(p.rating || 4.5),
  reviewsCount: Number(p.review_count || 0),
  badge: p.is_deal_of_day ? 'Deal of the Day' : (p.is_featured ? 'Featured' : (p.is_trending ? 'Trending' : 'Bestseller')),
  stock: Number(p.stock_quantity),
  isDeal: Boolean(p.is_deal_of_day),
  isTrending: Boolean(p.is_trending),
  isFeatured: Boolean(p.is_featured),
  isNew: Boolean(p.is_featured),
  isBestSeller: Number(p.review_count) > 300,
  isRecommended: Boolean(p.is_trending),
  image: p.primary_image || p.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  gallery: [p.primary_image || p.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
  description: p.description,
  specs: {
    Brand: p.brand,
    SKU: p.sku,
    Stock: `${p.stock_quantity} units available`,
    Warranty: '1 Year Brand Manufacturer Warranty'
  }
});

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
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  }, []);

  // 3. API Connection State
  const [isApiOnline, setIsApiOnline] = useState(false);

  // 4. Categories State (Loaded from API or Mock)
  const [categories, setCategories] = useState(initialCategories);

  // 5. Products State (Loaded from API with local fallback)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Sync products and categories from backend
  const loadBackendData = useCallback(async () => {
    try {
      // Fetch categories
      const catRes = await categoryService.getCategories();
      if (catRes?.success && Array.isArray(catRes.data) && catRes.data.length > 0) {
        const mappedCategories = catRes.data.map(c => {
          const matched = initialCategories.find(ic => ic.slug === c.slug) || {};
          return {
            id: `cat-${c.id}`,
            dbId: c.id,
            name: c.name,
            slug: c.slug,
            count: c.product_count,
            image: c.image_url || matched.image,
            icon: matched.icon || 'Sparkles',
            bgGradient: matched.bgGradient || 'from-violet-500/10 to-indigo-500/10'
          };
        });
        setCategories(mappedCategories);
      }

      // Fetch all products (275 products)
      const prodRes = await productService.getProducts({ limit: 300 });
      if (prodRes?.success && Array.isArray(prodRes.data) && prodRes.data.length > 0) {
        const formatted = prodRes.data.map(formatBackendProduct);
        setProducts(formatted);
        localStorage.setItem('shopsphere_products', JSON.stringify(formatted));
        setIsApiOnline(true);
      }
    } catch (err) {
      // Gracefully fall back to local mock data
      setIsApiOnline(false);
    }
  }, []);

  useEffect(() => {
    loadBackendData();
  }, [loadBackendData]);

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

  // 6. Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: '1',
          name: 'Apple iPhone 15 Pro (128GB, Natural Titanium)',
          subtitle: 'Aerospace-grade titanium design with A17 Pro chip',
          category: 'Mobiles & Tablets',
          brand: 'Apple',
          price: 124999,
          originalPrice: 134900,
          discount: 7,
          image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
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
    const clean = code.trim().toUpperCase();
    if (clean === 'SPHERE10' || clean === 'WELCOME20' || clean === 'FESTIVE15') {
      const discount = clean === 'WELCOME20' ? 20 : (clean === 'FESTIVE15' ? 15 : 10);
      setCoupon({ code: clean, discountPercent: discount, applied: true });
      showToast(`Coupon ${clean} applied! ${discount}% discount added.`);
      return true;
    } else {
      showToast('Invalid coupon code. Try SPHERE10 or WELCOME20', 'error');
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

  // 7. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_wishlist');
      return saved ? JSON.parse(saved) : ['1', '2'];
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

  // 8. Orders State
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

  const addOrder = async (orderData) => {
    let orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    
    // Attempt backend transactional checkout if API is reachable
    if (isApiOnline && authService.getToken()) {
      try {
        const payload = {
          items: (orderData.items || cart).map(item => ({
            product_id: Number(item.dbId || item.id) || 1,
            quantity: item.quantity || 1
          })),
          shipping_address: {
            full_name: orderData.shippingAddress?.fullName || 'Demo Shopper',
            phone: orderData.shippingAddress?.phone || '+91 98765 12345',
            address_line1: orderData.shippingAddress?.addressLine1 || 'Flat 402, Prestige Palms',
            city: orderData.shippingAddress?.city || 'Bengaluru',
            state: orderData.shippingAddress?.state || 'Karnataka',
            postal_code: orderData.shippingAddress?.postalCode || '560103',
            country: 'India'
          },
          payment_method: orderData.paymentMethod || 'cod',
          coupon_code: coupon.applied ? coupon.code : null
        };
        const res = await orderService.checkout(payload);
        if (res?.data?.order?.order_number) {
          orderNumber = res.data.order.order_number;
        }
      } catch (err) {
        console.warn('Backend order sync fallback to local store:', err.message);
      }
    }

    const newOrder = {
      id: orderNumber,
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

  // 9. Customers State
  const [customers, setCustomers] = useState(initialCustomers);
  const toggleCustomerStatus = (id) => {
    setCustomers(prev => prev.map(c =>
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
    ));
    showToast('Customer status updated');
  };

  // 10. User / Auth State
  const [user, setUser] = useState(() => {
    const authUser = authService.getCurrentUser();
    if (authUser) {
      return {
        name: authUser.name,
        email: authUser.email,
        phone: authUser.phone || '+91 98765 43210',
        avatar: authUser.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        isVip: true,
        vipTier: 'Gold Member',
        joinedDate: 'Jan 2026'
      };
    }
    return {
      name: 'Demo Shopper',
      email: 'customer@shopsphere.io',
      phone: '+91 98765 12345',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      isVip: true,
      vipTier: 'Gold Member',
      joinedDate: 'Jan 2026'
    };
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem('shopsphere_admin_token'));
  });

  const loginUser = (userData) => {
    setUser({
      name: userData.name || 'Demo Shopper',
      email: userData.email,
      phone: userData.phone || '+91 98765 12345',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      isVip: true,
      vipTier: 'Gold Member',
      joinedDate: 'Jan 2026'
    });
    showToast(`Welcome back, ${userData.name || 'Shopper'}!`);
  };

  const logoutUser = () => {
    authService.logout();
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const loginAdmin = () => {
    setIsAdminLoggedIn(true);
    showToast('Admin access authorized. Welcome back, Administrator.');
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('shopsphere_admin_token');
    showToast('Admin signed out', 'info');
  };

  // 11. Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Order Dispatched', message: 'Your boAt Wave Pro has been dispatched!', time: '10m ago', unread: true },
    { id: 2, title: 'VIP Exclusive Deal', message: 'Extra 10% off unlocked on Electronics!', time: '1h ago', unread: true },
    { id: 3, title: 'Price Drop Alert', message: 'Apple iPhone 15 Pro price dropped today.', time: '3h ago', unread: true }
  ]);

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('All notifications marked as read');
  };

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  // 12. Global Search & Category Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 13. Modals for floating utilities
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isClaimOfferOpen, setIsClaimOfferOpen] = useState(false);

  return (
    <ShopContext.Provider value={{
      theme,
      toggleTheme,
      toast,
      showToast,
      isApiOnline,
      categories,
      products,
      loadBackendData,
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
