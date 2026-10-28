// High-quality mock products for ShopSphere
export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Dell Inspiron 15 Laptop',
    subtitle: 'Intel i5 | 16GB | 512GB SSD',
    category: 'Laptops & Accessories',
    categorySlug: 'laptops-accessories',
    brand: 'Dell',
    price: 49999,
    originalPrice: 62999,
    discount: 21,
    rating: 4.8,
    reviewsCount: 1240,
    badge: 'Best Seller',
    stock: 24,
    isDeal: true,
    isNew: false,
    isBestSeller: true,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Experience responsive yet quiet performance featuring 13th Gen Intel Core processors combined with PCIe SSD options. Enjoy expansive keycaps and a spacious touchpad that makes navigation effortless.',
    specs: {
      Processor: 'Intel Core i5-1335U (Up to 4.6 GHz)',
      RAM: '16 GB DDR4 3200MHz',
      Storage: '512 GB M.2 NVMe SSD',
      Display: '15.6" FHD (1920 x 1080) 120Hz Anti-Glare WVA',
      Battery: '3-Cell Battery, 41WHr',
      Warranty: '1 Year Onsite Hardware Service'
    }
  },
  {
    id: 'prod-2',
    name: 'Nike Air Max Sneakers',
    subtitle: "Men's Running Shoes",
    category: "Men's Fashion",
    categorySlug: 'mens-fashion',
    brand: 'Nike',
    price: 7999,
    originalPrice: 9999,
    discount: 20,
    rating: 4.6,
    reviewsCount: 892,
    badge: 'Limited Deal',
    stock: 18,
    isDeal: true,
    isNew: false,
    isBestSeller: true,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Nothing as fly, nothing as proven. The Nike Air Max stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU accents.',
    specs: {
      Material: 'Breathable Mesh & Synthetic Leather',
      Sole: 'Air Cushioning Rubber Outsole',
      Closure: 'Lace-Up',
      Fit: 'True to Size',
      Origin: 'Vietnam'
    }
  },
  {
    id: 'prod-3',
    name: 'boAt Wave Pro Smartwatch',
    subtitle: '1.85" Display | Bluetooth Calling',
    category: 'Mobiles & Tablets',
    categorySlug: 'mobiles-tablets',
    brand: 'boAt',
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    rating: 4.5,
    reviewsCount: 1104,
    badge: 'New',
    stock: 50,
    isDeal: true,
    isNew: true,
    isBestSeller: false,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Make every move count with 1.85" High Definition Display, seamless Bluetooth calling, 100+ cloud watch faces and 700+ active fitness modes.',
    specs: {
      Display: '1.85 inch TFT HD 500 nits',
      BatteryLife: 'Up to 7 Days (2 Days with Calling)',
      WaterResistance: 'IP68 Sweat & Splash Proof',
      Sensors: 'SpO2, 24/7 Heart Rate, Sleep Tracker'
    }
  },
  {
    id: 'prod-4',
    name: 'OnePlus Nord Buds 2',
    subtitle: 'Active Noise Cancellation',
    category: 'Electronics',
    categorySlug: 'electronics',
    brand: 'OnePlus',
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    rating: 4.4,
    reviewsCount: 956,
    badge: 'Trending',
    stock: 35,
    isDeal: true,
    isNew: false,
    isBestSeller: true,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tuned with Dolby Atmos and BassWave algorithm for punchy sound quality. Dual mics with AI noise reduction ensure crystal clear calls anywhere.',
    specs: {
      Drivers: '12.4mm Dynamic Titanium Drivers',
      ANC: 'Up to 25dB Active Noise Cancellation',
      Battery: '36 Hours playback with case',
      Charging: '10 min flash charge for 5 hours'
    }
  },
  {
    id: 'prod-5',
    name: 'Versace Dylan Blue',
    subtitle: "Men's Eau de Toilette | 100ml",
    category: 'Beauty & Personal Care',
    categorySlug: 'beauty-personal-care',
    brand: 'Versace',
    price: 6499,
    originalPrice: 8999,
    discount: 28,
    rating: 4.7,
    reviewsCount: 670,
    badge: 'Premium',
    stock: 12,
    isDeal: true,
    isNew: false,
    isBestSeller: false,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An aromatic, woody-fougere composition with fresh aquatic notes, Calabrian bergamot, grapefruit and fig leaves. A bold Mediterranean signature fragrance.',
    specs: {
      Volume: '100 ml / 3.4 oz',
      FragranceFamily: 'Aromatic Fougere Woody',
      TopNotes: 'Calabrian Bergamot, Grapefruit, Fig Leaves',
      HeartNotes: 'Violet Leaf, Papyrus Wood, Organic Patchouli',
      BaseNotes: 'Mineral Musk, Tonka Bean, Saffron'
    }
  },
  {
    id: 'prod-6',
    name: 'Green Soul Office Chair',
    subtitle: 'Ergonomic | Adjustable',
    category: 'Home & Living',
    categorySlug: 'home-living',
    brand: 'Green Soul',
    price: 9499,
    originalPrice: 12999,
    discount: 27,
    rating: 4.5,
    reviewsCount: 805,
    badge: 'Popular',
    stock: 16,
    isDeal: true,
    isNew: false,
    isBestSeller: true,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for comfort and long working hours. Breathable mesh backrest, 2D adjustable armrests, pneumatic seat-height adjustment, and heavy-duty nylon base.',
    specs: {
      Mechanism: 'Synchro-Tilt with Multi-Lock',
      Armrest: '2D Padded Adjustable',
      WeightCapacity: 'Up to 135 kg',
      Warranty: '3 Years Manufacturer Warranty'
    }
  },
  {
    id: 'prod-7',
    name: 'Apple iPhone 15 Pro',
    subtitle: '128GB | Natural Titanium | A17 Pro',
    category: 'Mobiles & Tablets',
    categorySlug: 'mobiles-tablets',
    brand: 'Apple',
    price: 129900,
    originalPrice: 134900,
    discount: 4,
    rating: 4.9,
    reviewsCount: 2450,
    badge: 'Trending',
    stock: 20,
    isDeal: false,
    isNew: true,
    isBestSeller: true,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system with 48MP main sensor.',
    specs: {
      Display: '6.1-inch Super Retina XDR with ProMotion',
      Chip: 'A17 Pro chip with 6-core GPU',
      Camera: '48MP Main | Ultra Wide | 3x Telephoto',
      Connector: 'USB-C with USB 3 speeds'
    }
  },
  {
    id: 'prod-8',
    name: 'Sony WH-1000XM5 Headphones',
    subtitle: 'Industry Leading Noise Canceling',
    category: 'Electronics',
    categorySlug: 'electronics',
    brand: 'Sony',
    price: 29990,
    originalPrice: 34990,
    discount: 14,
    rating: 4.8,
    reviewsCount: 1820,
    badge: 'Best Seller',
    stock: 22,
    isDeal: true,
    isNew: false,
    isBestSeller: true,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Two processors and 8 microphones for unprecedented noise cancellation and magnificent sound quality.',
    specs: {
      BatteryLife: 'Up to 30 Hours with ANC On',
      Codecs: 'LDAC, AAC, SBC'
    }
  }
];
