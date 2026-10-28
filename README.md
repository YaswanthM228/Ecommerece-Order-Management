# ShopSphere — Premium E-Commerce Frontend

> **"YOUR WORLD. YOUR CHOICE."**  
> A high-conversion, futuristic violet-indigo shopping interface inspired by the reference design. Featuring desktop-first responsive architecture, an orbital glowing brand identity, deep-navy sidebar, comprehensive customer storefront, and a dedicated admin portal.

---

## 🚀 Key Features

### 1. 🪐 Brand Identity & Design System
- **Orbital Planet Logo**: Custom SVG vector icon with cosmic glow, celestial rings, and gradient typography.
- **Color Palette**: Violet (`#7C3AED`), Deep Violet (`#5B21B6`), Indigo (`#4338CA`), Dark Navy (`#090D26`), and Light Surface (`#F7F8FC`).
- **Complete Dark / Light Mode**: Unified theme toggle affecting sidebars, toolbars, product grids, modals, invoice sheets, and charts.

### 2. 🛍️ Customer Storefront Experience
- **Pixel-Accurate Homepage**:
  - Cosmic hero banner with active carousel slides, brand strip (Apple, Samsung, OnePlus, boAt, JBL), and "Up to 50% Off" badge.
  - 3 Stacked promotional cards: *Fashion Trends*, *Home Essentials*, *Beauty & Care*.
  - Horizontal Service Benefits Strip (Free Shipping, Easy Returns, Secure Payment, 24/7 Support, Best Offers).
  - 11 Visual Category tiles with smooth hover transitions.
  - **Today's Deals** with live countdown timer and 6-column product grid matching reference products:
    - *Dell Inspiron 15 Laptop*
    - *Nike Air Max Sneakers*
    - *boAt Wave Pro Smartwatch*
    - *OnePlus Nord Buds 2*
    - *Versace Dylan Blue*
    - *Green Soul Office Chair*
  - Dedicated **ShopSphere VIP Membership** banner with interactive sign-up.
  - New Arrivals, Best Sellers, and Recommended sections.
  - Floating Utilities: **Claim Offer** voucher modal & **AI Shopping Assistant** live chat guide.
  - Comprehensive footer with simulated newsletter subscription.

### 3. 🔎 Product Discovery & Details
- **Product Listing Page**:
  - Filter by Category, Price Range Slider, Brand, Rating (4★, 3★+), and In-Stock availability.
  - Multi-criteria sorting (Featured, Price: Low/High, Rating, Newest).
  - Grid vs. List layout toggle.
- **Product Detail Page**:
  - Image gallery with interactive thumbnails and zoom preview.
  - Live Indian Pincode delivery estimator with delivery date calculation.
  - Quantity controls, stock status badges, technical specifications table, and customer reviews.
  - Related product recommendations.

### 4. 🛒 Cart, Checkout & Itemized Invoice
- **Shopping Cart**:
  - Quantity management, line item removal, move-to-wishlist.
  - Coupon system (Test code: `SPHERE10` for 10% instant off).
  - Accurate calculations in INR with 18% GST and free shipping thresholds.
- **3-Step Checkout Flow**:
  - 1-Click "Pre-fill Demo Data" button for rapid testing.
  - Address verification, delivery option selection (Standard vs. Express), and simulated payment methods (UPI, Card, NetBanking, COD).
- **Tax Invoice & Order Confirmation**:
  - Real-time generated order ID (e.g. `#ORD-89421`).
  - Itemized printable invoice matching Indian tax receipt norms (`window.print()`).
  - Interactive delivery progress tracker.

### 5. 📊 Separate Admin Management Portal (`/admin`)
- Accessible via the Account menu or direct URL `/admin/dashboard`.
- **KPI Metrics**: Total Gross Sales, Orders Count, Catalog Size, Customer Count.
- **Recharts Visualizations**:
  - 6-month Revenue vs Target Area Chart.
  - Order Fulfillment Status Pie/Donut Chart.
  - Department Sales Volume Bar Chart.
- **Working CRUD Management**:
  - **Products**: Add new product modal, edit details, and delete items.
  - **Inventory**: Real-time warehouse stock tracking with `+` / `-` stock adjustments.
  - **Orders**: Live fulfillment status dropdown (Processing, Shipped, Delivered, Cancelled).
  - **Customers**: Directory with lifetime spend and status toggle (Active / Inactive).
  - **Reports & Settings**: Date range filters, CSV export simulation, tax rates, and free shipping thresholds.

---

## 🛠️ Technology Stack

- **React 18** with **Vite 6**
- **Tailwind CSS 3.4**
- **React Router v6**
- **Lucide React** (icons)
- **Recharts** (dashboard and report charts)
- **React Context API** (global cart, wishlist, theme, user state, orders, and products)
- **localStorage** (persists cart, wishlist, theme, orders, and product modifications)

---

## 💻 Commands to Run on Windows PowerShell

### 1. Install Dependencies
```powershell
npm install
```

### 2. Start Development Server
```powershell
npm run dev
```
> The application will open automatically at: `http://localhost:3000`

### 3. Production Build
```powershell
npm run build
```

### 4. Preview Production Build
```powershell
npm run preview
```

---

## 📁 Project Structure

```
d:\Shop Sphere\
├── public/
│   └── favicon.svg               # Orbital Planet SVG Favicon
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminSidebar.jsx
│   │   │   └── AdminToolbar.jsx
│   │   ├── common/
│   │   │   ├── AIAssistantModal.jsx
│   │   │   ├── ClaimOfferModal.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── Toast.jsx
│   │   ├── layout/
│   │   │   ├── CustomerCategoryBar.jsx
│   │   │   ├── CustomerSidebar.jsx
│   │   │   ├── CustomerToolbar.jsx
│   │   │   └── Footer.jsx
│   │   └── products/
│   │       ├── CategoryTile.jsx
│   │       ├── CountdownTimer.jsx
│   │       └── ProductCard.jsx
│   ├── context/
│   │   └── ShopContext.jsx       # Global State (Cart, Orders, Auth, Theme, Products)
│   ├── data/
│   │   ├── mockCategories.js     # 11 department categories
│   │   ├── mockCustomers.js      # Customer records with tiers
│   │   ├── mockOrders.js         # Order history & timeline tracking
│   │   ├── mockProducts.js       # Curated reference products with specs & INR pricing
│   │   └── mockReports.js        # Analytics data for Recharts
│   ├── layouts/
│   │   ├── AdminLayout.jsx       # Dedicated admin shell
│   │   └── CustomerLayout.jsx    # Storefront shell (Sidebar + Toolbar + Category bar)
│   ├── pages/
│   │   ├── account/
│   │   │   ├── NotificationsPage.jsx
│   │   │   ├── OrdersHistoryPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── SettingsPage.jsx
│   │   ├── admin/
│   │   │   ├── AdminCategoriesPage.jsx
│   │   │   ├── AdminCustomersPage.jsx
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── AdminInventoryPage.jsx
│   │   │   ├── AdminLoginPage.jsx
│   │   │   ├── AdminOrdersPage.jsx
│   │   │   ├── AdminProductsPage.jsx
│   │   │   ├── AdminReportsPage.jsx
│   │   │   └── AdminSettingsPage.jsx
│   │   ├── auth/
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── cart/
│   │   │   └── CartPage.jsx
│   │   ├── checkout/
│   │   │   ├── CheckoutPage.jsx
│   │   │   └── OrderConfirmationPage.jsx
│   │   ├── customer/
│   │   │   ├── BrandsPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── SupportPage.jsx
│   │   │   ├── TrackOrderPage.jsx
│   │   │   ├── VIPMembershipPage.jsx
│   │   │   └── WishlistPage.jsx
│   │   └── products/
│   │       ├── ProductDetailPage.jsx
│   │       └── ProductListingPage.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx         # Complete client routing
│   ├── App.jsx
│   ├── index.css                 # Tailwind directives and custom scrollbars
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## ⚠️ Notes & Known Limitations

1. **Frontend-Only Architecture**: All data operations (products CRUD, cart modifications, order placements, status toggles) run locally in-browser via React state and `localStorage`.
2. **Demo Payment Gateways**: The UPI, Card, NetBanking, and COD payment options simulate realistic order placements; no actual monetary transactions or bank APIs are connected.
3. **Admin Route Authorization**: Route guards for the Admin Portal are implemented client-side for demonstration and showcase purposes.
"# Ecommerece-Order-Management" 
