// Dummy data untuk products - nanti bisa diganti dengan API/Database
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  featured: boolean;
  description: string;
  features: string[];
  deliveryTime: string;
  designer: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    verified: boolean;
  };
  reviews: Review[];
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Logo Design Package",
    category: "Branding",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviewCount: 127,
    image: "🎨",
    images: ["🎨", "🖌️", "✨", "🎯"],
    featured: true,
    description:
      "Professional logo design service with unlimited revisions. Perfect for startups and businesses looking to establish their brand identity. Get a modern, memorable logo that represents your brand perfectly.",
    features: [
      "3 Initial Concepts",
      "Unlimited Revisions",
      "Vector Files (AI, EPS, SVG)",
      "PNG & JPG formats",
      "Brand Guidelines",
      "24/7 Support",
    ],
    deliveryTime: "5-7 days",
    designer: {
      id: "designer-1",
      name: "Sarah Anderson",
      avatar: "SA",
      rating: 4.9,
      reviews: 127,
      verified: true,
    },
    reviews: [
      {
        id: 1,
        author: "John Doe",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Excellent work! The designer understood my vision perfectly and delivered beyond expectations.",
        avatar: "JD",
      },
      {
        id: 2,
        author: "Jane Smith",
        rating: 5,
        date: "1 month ago",
        comment:
          "Very professional and responsive. Would definitely work with again!",
        avatar: "JS",
      },
      {
        id: 3,
        author: "Mike Johnson",
        rating: 4,
        date: "1 month ago",
        comment:
          "Great quality work. Communication was clear throughout the project.",
        avatar: "MJ",
      },
    ],
  },
  {
    id: "2",
    name: "Modern Website UI/UX Design",
    category: "UI/UX Design",
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviewCount: 89,
    image: "💻",
    images: ["💻", "🎨", "📱", "⚡"],
    featured: true,
    description:
      "Complete website design with modern UI/UX principles. Includes responsive design for all devices, user flow optimization, and interactive prototypes.",
    features: [
      "5-10 Pages Design",
      "Responsive Design",
      "Interactive Prototype",
      "Figma Source Files",
      "Style Guide",
      "Free Consultation",
    ],
    deliveryTime: "10-14 days",
    designer: {
      id: "designer-2",
      name: "Alex Martinez",
      avatar: "AM",
      rating: 4.8,
      reviews: 89,
      verified: true,
    },
    reviews: [
      {
        id: 1,
        author: "Emily Brown",
        rating: 5,
        date: "1 week ago",
        comment:
          "Amazing designer! Created exactly what I needed for my business website.",
        avatar: "EB",
      },
      {
        id: 2,
        author: "David Lee",
        rating: 5,
        date: "3 weeks ago",
        comment: "Very talented and professional. Highly recommended!",
        avatar: "DL",
      },
    ],
  },
  {
    id: "3",
    name: "Social Media Content Pack",
    category: "Motion Graphics",
    price: 199,
    originalPrice: 279,
    rating: 4.7,
    reviewCount: 156,
    image: "📱",
    images: ["📱", "🎬", "✨", "🎨"],
    featured: false,
    description:
      "Professional social media content package including animated posts, stories, and reels. Perfect for boosting your social media presence.",
    features: [
      "30 Post Templates",
      "15 Story Templates",
      "10 Animated Reels",
      "Editable Files (AE, PSD)",
      "Custom Branding",
      "Quick Delivery",
    ],
    deliveryTime: "3-5 days",
    designer: {
      id: "designer-3",
      name: "Jessica Wang",
      avatar: "JW",
      rating: 4.7,
      reviews: 156,
      verified: true,
    },
    reviews: [
      {
        id: 1,
        author: "Chris Taylor",
        rating: 5,
        date: "2 days ago",
        comment: "Perfect for my Instagram! Love the animations.",
        avatar: "CT",
      },
      {
        id: 2,
        author: "Laura White",
        rating: 4,
        date: "1 week ago",
        comment: "Good quality content. Easy to customize.",
        avatar: "LW",
      },
    ],
  },
  {
    id: "4",
    name: "Brand Identity Package",
    category: "Branding",
    price: 599,
    originalPrice: 799,
    rating: 5.0,
    reviewCount: 67,
    image: "🏆",
    images: ["🏆", "🎨", "📊", "✨"],
    featured: true,
    description:
      "Complete brand identity package including logo, color palette, typography, business cards, and brand guidelines. Everything you need to launch your brand.",
    features: [
      "Logo Design (3 concepts)",
      "Brand Guidelines",
      "Business Card Design",
      "Letterhead Design",
      "Social Media Kit",
      "All Source Files",
    ],
    deliveryTime: "14-21 days",
    designer: {
      id: "designer-4",
      name: "Michael Chen",
      avatar: "MC",
      rating: 5.0,
      reviews: 67,
      verified: true,
    },
    reviews: [
      {
        id: 1,
        author: "Rachel Green",
        rating: 5,
        date: "3 days ago",
        comment:
          "Absolutely amazing work! Michael captured our brand essence perfectly.",
        avatar: "RG",
      },
      {
        id: 2,
        author: "Tom Anderson",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Best investment for our startup. Professional and creative!",
        avatar: "TA",
      },
    ],
  },
  {
    id: "5",
    name: "Mobile App UI Design",
    category: "UI/UX Design",
    price: 399,
    originalPrice: 549,
    rating: 4.9,
    reviewCount: 112,
    image: "📲",
    images: ["📲", "🎨", "⚡", "🌟"],
    featured: false,
    description:
      "Professional mobile app UI design for iOS and Android. Includes onboarding screens, main features, and micro-interactions.",
    features: [
      "10-15 Screens",
      "iOS & Android Design",
      "Interactive Prototype",
      "Design System",
      "Icon Set",
      "Developer Handoff",
    ],
    deliveryTime: "7-10 days",
    designer: {
      id: "designer-5",
      name: "Sophie Martin",
      avatar: "SM",
      rating: 4.9,
      reviews: 112,
      verified: true,
    },
    reviews: [
      {
        id: 1,
        author: "Kevin Park",
        rating: 5,
        date: "1 week ago",
        comment: "Sophie is incredible! The app design exceeded expectations.",
        avatar: "KP",
      },
      {
        id: 2,
        author: "Maria Garcia",
        rating: 5,
        date: "2 weeks ago",
        comment: "Beautiful designs and great communication throughout.",
        avatar: "MG",
      },
    ],
  },
  {
    id: "6",
    name: "Animated Explainer Video",
    category: "Motion Graphics",
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviewCount: 43,
    image: "🎬",
    images: ["🎬", "🎨", "⚡", "🎯"],
    featured: false,
    description:
      "Professional 60-90 second animated explainer video. Perfect for product launches, tutorials, or promotional content.",
    features: [
      "Custom Animation",
      "Voiceover Available",
      "Background Music",
      "Multiple Revisions",
      "HD & 4K Export",
      "Commercial License",
    ],
    deliveryTime: "14-21 days",
    designer: {
      id: "designer-6",
      name: "Daniel Kim",
      avatar: "DK",
      rating: 4.8,
      reviews: 43,
      verified: true,
    },
    reviews: [
      {
        id: 1,
        author: "Sarah Johnson",
        rating: 5,
        date: "5 days ago",
        comment:
          "The animation quality is outstanding! Perfect for our product launch.",
        avatar: "SJ",
      },
      {
        id: 2,
        author: "Robert Miller",
        rating: 4,
        date: "3 weeks ago",
        comment: "Professional work. Minor revisions needed but overall great!",
        avatar: "RM",
      },
    ],
  },
  {
    id: "7",
    name: "E-commerce Website Design",
    category: "UI/UX Design",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 78,
    image: "🛒",
    images: ["🛒", "💳", "📱", "✨"],
    featured: true,
    description:
      "Complete e-commerce website design with shopping cart, checkout flow, and product pages. Optimized for conversions.",
    features: [
      "15-20 Pages",
      "Shopping Cart Design",
      "Payment Integration UI",
      "Product Pages",
      "Admin Dashboard",
      "Mobile Responsive",
    ],
    deliveryTime: "21-30 days",
    designer: {
      id: "designer-7",
      name: "Emma Thompson",
      avatar: "ET",
      rating: 4.9,
      reviews: 78,
      verified: true,
    },
    reviews: [
      {
        id: 1,
        author: "James Wilson",
        rating: 5,
        date: "1 day ago",
        comment:
          "Emma is a genius! Our online store looks amazing and sales are up!",
        avatar: "JW",
      },
      {
        id: 2,
        author: "Lisa Brown",
        rating: 5,
        date: "1 week ago",
        comment: "Best e-commerce design we've seen. Worth every penny!",
        avatar: "LB",
      },
    ],
  },
  {
    id: "8",
    name: "Instagram Content Creator Pack",
    category: "Motion Graphics",
    price: 149,
    originalPrice: 199,
    rating: 4.6,
    reviewCount: 201,
    image: "📸",
    images: ["📸", "🎨", "✨", "🌈"],
    featured: false,
    description:
      "Complete Instagram content pack with templates, filters, and story highlights. Perfect for influencers and businesses.",
    features: [
      "50 Post Templates",
      "20 Story Templates",
      "10 Highlight Covers",
      "Custom Filters",
      "Easy to Edit",
      "Instant Download",
    ],
    deliveryTime: "1-2 days",
    designer: {
      id: "designer-8",
      name: "Olivia Davis",
      avatar: "OD",
      rating: 4.6,
      reviews: 201,
      verified: true,
    },
    reviews: [
      {
        id: 1,
        author: "Amanda Scott",
        rating: 5,
        date: "Today",
        comment: "Love this pack! My Instagram looks so professional now.",
        avatar: "AS",
      },
      {
        id: 2,
        author: "Brian Cooper",
        rating: 4,
        date: "3 days ago",
        comment: "Good variety of templates. Easy to customize.",
        avatar: "BC",
      },
    ],
  },
];

// Helper function untuk get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

// Helper function untuk get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

// Helper function untuk get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};
