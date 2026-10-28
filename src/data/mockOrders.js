export const initialOrders = [
  {
    id: 'ORD-89421',
    date: '2026-10-24',
    customer: {
      name: 'Yash Sharma',
      email: 'yash.sharma@example.com',
      phone: '+91 98765 43210',
      address: 'Flat 402, Skyline Towers, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    items: [
      {
        id: 'prod-4',
        name: 'OnePlus Nord Buds 2',
        price: 2999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 2999,
    discount: 500,
    shipping: 0,
    tax: 449,
    total: 2948,
    status: 'Delivered',
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid',
    deliveryTimeline: [
      { status: 'Order Placed', time: 'Oct 24, 10:30 AM', done: true },
      { status: 'Packed & Dispatched', time: 'Oct 24, 04:15 PM', done: true },
      { status: 'Out for Delivery', time: 'Oct 26, 09:00 AM', done: true },
      { status: 'Delivered', time: 'Oct 26, 02:45 PM', done: true }
    ]
  },
  {
    id: 'ORD-87103',
    date: '2026-10-20',
    customer: {
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 98220 12345',
      address: 'Plot 12, Gulmohar Enclave',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    items: [
      {
        id: 'prod-2',
        name: 'Nike Air Max Sneakers',
        price: 7999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'prod-5',
        name: 'Versace Dylan Blue',
        price: 6499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 14498,
    discount: 1450,
    shipping: 0,
    tax: 2348,
    total: 15396,
    status: 'Shipped',
    paymentMethod: 'Credit Card (HDFC)',
    paymentStatus: 'Paid',
    deliveryTimeline: [
      { status: 'Order Placed', time: 'Oct 20, 02:10 PM', done: true },
      { status: 'Packed & Dispatched', time: 'Oct 21, 11:30 AM', done: true },
      { status: 'In Transit', time: 'Oct 22, 06:00 PM', done: true },
      { status: 'Out for Delivery', time: 'Oct 28, Expected', done: false }
    ]
  },
  {
    id: 'ORD-86519',
    date: '2026-10-18',
    customer: {
      name: 'Rohan Verma',
      email: 'rohan.verma@example.com',
      phone: '+91 97110 56789',
      address: 'House 88, Sector 15',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001'
    },
    items: [
      {
        id: 'prod-1',
        name: 'Dell Inspiron 15 Laptop',
        price: 49999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 49999,
    discount: 3000,
    shipping: 0,
    tax: 8460,
    total: 55459,
    status: 'Processing',
    paymentMethod: 'NetBanking (ICICI)',
    paymentStatus: 'Paid',
    deliveryTimeline: [
      { status: 'Order Placed', time: 'Oct 18, 08:45 AM', done: true },
      { status: 'Processing at Warehouse', time: 'Oct 19, 10:00 AM', done: true },
      { status: 'Out for Delivery', time: 'Pending', done: false },
      { status: 'Delivered', time: 'Pending', done: false }
    ]
  },
  {
    id: 'ORD-85190',
    date: '2026-10-12',
    customer: {
      name: 'Ananya Roy',
      email: 'ananya.roy@example.com',
      phone: '+91 94330 98765',
      address: '74 Park Street, Flat 2B',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700016'
    },
    items: [
      {
        id: 'prod-3',
        name: 'boAt Wave Pro Smartwatch',
        price: 2499,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 4998,
    discount: 400,
    shipping: 0,
    tax: 827,
    total: 5425,
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid',
    deliveryTimeline: [
      { status: 'Order Placed', time: 'Oct 12, 11:15 AM', done: true },
      { status: 'Dispatched', time: 'Oct 13, 03:00 PM', done: true },
      { status: 'Out for Delivery', time: 'Oct 15, 08:30 AM', done: true },
      { status: 'Delivered', time: 'Oct 15, 01:20 PM', done: true }
    ]
  }
];
