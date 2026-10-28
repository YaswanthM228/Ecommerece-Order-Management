// =============================================================================
// SHOPSPHERE COMPLETE CATALOG SEED DATA
// 11 Categories, 25 Products per Category = 275 Products Total
// Realistic Indian Rupee (INR) Pricing, Real Brands, Real Product Photography
// =============================================================================

const categoriesData = [
  {
    id: 1,
    name: 'Mobiles & Tablets',
    slug: 'mobiles-tablets',
    description: 'Flagship smartphones, pro tablets, cellular devices, and mobile technology accessories.',
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
    display_order: 1,
  },
  {
    id: 2,
    name: 'Laptops & Accessories',
    slug: 'laptops-accessories',
    description: 'High-performance laptops, ultrabooks, mechanical keyboards, precision mice, and tech docks.',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    display_order: 2,
  },
  {
    id: 3,
    name: "Men's Fashion",
    slug: 'mens-fashion',
    description: 'Modern men’s apparel, tailored suits, casual denim, sneakers, leather footwear, and accessories.',
    image_url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80',
    display_order: 3,
  },
  {
    id: 4,
    name: "Women's Fashion",
    slug: 'womens-fashion',
    description: 'Contemporary ethnic wear, designer sarees, western dresses, footwear, and luxury handbags.',
    image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    display_order: 4,
  },
  {
    id: 5,
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Ergonomic furnishings, designer lighting, Egyptian cotton linens, kitchenware, and home decor.',
    image_url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
    display_order: 5,
  },
  {
    id: 6,
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    description: 'Ayurvedic formulations, dermatological skincare, French fragrances, and haircare essentials.',
    image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    display_order: 6,
  },
  {
    id: 7,
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    description: 'Strength training equipment, badminton gear, yoga essentials, running shoes, and sports hydration.',
    image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    display_order: 7,
  },
  {
    id: 8,
    name: 'Books & Stationery',
    slug: 'books-stationery',
    description: 'Bestselling paperbacks, self-development masterclasses, fountain pens, and archival notebooks.',
    image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    display_order: 8,
  },
  {
    id: 9,
    name: 'Toys & Games',
    slug: 'toys-games',
    description: 'Collectible model sets, mechanical LEGO building kits, strategy board games, and console controllers.',
    image_url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80',
    display_order: 9,
  },
  {
    id: 10,
    name: 'Grocery & Essentials',
    slug: 'grocery-essentials',
    description: 'Artisanal coffee beans, organic royal basmati, cold-pressed oils, premium tea leaves, and confectionery.',
    image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    display_order: 10,
  },
  {
    id: 11,
    name: 'Automotive',
    slug: 'automotive',
    description: 'High-res dashcams, digital tyre inflators, car pressure washers, synthetic oils, and detailing kits.',
    image_url: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=600&q=80',
    display_order: 11,
  },
];

module.exports = {
  categoriesData,
};
