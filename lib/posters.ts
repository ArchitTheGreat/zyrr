export interface Poster {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  previewImage: string;
  panelImages: {
    left: string;
    center: string;
    right: string;
  };
  price: number;
  dimensions?: {
    width: number;
    height: number;
    unit: string;
  };
  medium?: string;
  year?: number;
  edition?: string;
  availability: 'available' | 'limited' | 'sold';
  variants?: {
    size: string;
    price: number;
    dimensions: string;
  }[];
  metadata?: {
    aspectRatio: string;
    colorPalette: string[];
    mood: string;
    technique: string;
  };
}

export const posters: Poster[] = [
  {
    id: "1",
    slug: "sunset-panorama",
    title: "Sunset Panorama",
    subtitle: "Golden Hour Series",
    description: "A breathtaking triptych capturing the transition from day to night across three distinct perspectives.",
    previewImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    panelImages: {
      left: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=690&auto=format&fit=crop",
      center: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=690&auto=format&fit=crop",
      right: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=690&auto=format&fit=crop"
    },
    price: 45,
    dimensions: { width: 36, height: 48, unit: "inches" },
    medium: "Digital Art",
    year: 2024,
    edition: "Open Edition",
    availability: "available",
    variants: [
      { size: "Small", price: 35, dimensions: "24\" × 32\"" },
      { size: "Medium", price: 45, dimensions: "36\" × 48\"" },
      { size: "Large", price: 65, dimensions: "48\" × 64\"" }
    ],
    metadata: {
      aspectRatio: "3:4",
      colorPalette: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
      mood: "Calm, Contemplative, Warm",
      technique: "Layered Digital Composition"
    }
  },
  {
    id: "2",
    slug: "urban-geometry",
    title: "Urban Geometry",
    subtitle: "City Lines Series",
    description: "Abstract interpretation of city architecture through geometric forms and structured composition.",
    previewImage: "https://images.unsplash.com/photo-1516110833967-1d84e62659ee?q=80&w=2070&auto=format&fit=crop",
    panelImages: {
      left: "https://images.unsplash.com/photo-1516110833967-1d84e62659ee?q=80&w=690&auto=format&fit=crop",
      center: "https://images.unsplash.com/photo-1516110833967-1d84e62659ee?q=80&w=690&auto=format&fit=crop",
      right: "https://images.unsplash.com/photo-1516110833967-1d84e62659ee?q=80&w=690&auto=format&fit=crop"
    },
    price: 55,
    dimensions: { width: 36, height: 48, unit: "inches" },
    medium: "Digital Art",
    year: 2024,
    edition: "Limited Edition",
    availability: "limited",
    variants: [
      { size: "Medium", price: 55, dimensions: "36\" × 48\"" },
      { size: "Large", price: 75, dimensions: "48\" × 64\"" }
    ],
    metadata: {
      aspectRatio: "3:4",
      colorPalette: ["#2C3E50", "#34495E", "#95A5A6", "#BDC3C7"],
      mood: "Structured, Modern, Minimal",
      technique: "Vector-based Composition"
    }
  },
  {
    id: "3",
    slug: "mountain-serenity",
    title: "Mountain Serenity",
    subtitle: "Alpine Series",
    description: "Tranquil mountain landscape captured in three moments of stillness and reflection.",
    previewImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    panelImages: {
      left: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=690&auto=format&fit=crop",
      center: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=690&auto=format&fit=crop",
      right: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=690&auto=format&fit=crop"
    },
    price: 65,
    dimensions: { width: 36, height: 48, unit: "inches" },
    medium: "Digital Art",
    year: 2024,
    edition: "Open Edition",
    availability: "available",
    variants: [
      { size: "Small", price: 45, dimensions: "24\" × 32\"" },
      { size: "Medium", price: 65, dimensions: "36\" × 48\"" },
      { size: "Large", price: 85, dimensions: "48\" × 64\"" }
    ],
    metadata: {
      aspectRatio: "3:4",
      colorPalette: ["#34495E", "#2C3E50", "#95A5A6", "#BDC3C7"],
      mood: "Peaceful, Meditative, Grounded",
      technique: "Layered Digital Painting"
    }
  },
  {
    id: "4",
    slug: "ocean-horizon",
    title: "Ocean Horizon",
    subtitle: "Coastal Series",
    description: "Endless ocean meeting sky in a harmonious blend of blues and whites.",
    previewImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    panelImages: {
      left: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=690&auto=format&fit=crop",
      center: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=690&auto=format&fit=crop",
      right: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=690&auto=format&fit=crop"
    },
    price: 48,
    dimensions: { width: 36, height: 48, unit: "inches" },
    medium: "Digital Art",
    year: 2024,
    edition: "Open Edition",
    availability: "available",
    variants: [
      { size: "Small", price: 38, dimensions: "24\" × 32\"" },
      { size: "Medium", price: 48, dimensions: "36\" × 48\"" },
      { size: "Large", price: 68, dimensions: "48\" × 64\"" }
    ],
    metadata: {
      aspectRatio: "3:4",
      colorPalette: ["#3498DB", "#2980B9", "#85C1E9", "#D6EAF8"],
      mood: "Calm, Expansive, Refreshing",
      technique: "Digital Watercolor Style"
    }
  },
  {
    id: "5",
    slug: "forest-mystique",
    title: "Forest Mystique",
    subtitle: "Woodland Series",
    description: "Enchanted forest scene with dappled light and mysterious shadows.",
    previewImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    panelImages: {
      left: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=690&auto=format&fit=crop",
      center: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=690&auto=format&fit=crop",
      right: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=690&auto=format&fit=crop"
    },
    price: 52,
    dimensions: { width: 36, height: 48, unit: "inches" },
    medium: "Digital Art",
    year: 2024,
    edition: "Limited Edition",
    availability: "limited",
    variants: [
      { size: "Medium", price: 52, dimensions: "36\" × 48\"" },
      { size: "Large", price: 72, dimensions: "48\" × 64\"" }
    ],
    metadata: {
      aspectRatio: "3:4",
      colorPalette: ["#27AE60", "#2ECC71", "#8E44AD", "#9B59B6"],
      mood: "Mystical, Lush, Enchanting",
      technique: "Layered Digital Art"
    }
  }
];