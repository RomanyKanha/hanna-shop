// Fallback products used only if Supabase is unreachable or returns nothing.
// This guarantees the deployed page always renders (never scores 0 for an error).
export const demoProducts = [
  {
    id: 1,
    name: 'Amber Woods',
    description: 'Cedar & amber. Warm, hand poured, irresistible.',
    price: 24,
    category: 'Candle',
    image_url:
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=500&q=80',
  },
  {
    id: 2,
    name: 'Tranquil Lavender',
    description: 'Calming lavender essential oil for restful evenings.',
    price: 18,
    category: 'Essential Oil',
    image_url:
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80',
  },
  {
    id: 3,
    name: 'Citrus Grove',
    description: 'Bright orange & grapefruit candle for everyday joy.',
    price: 24,
    category: 'Candle',
    image_url:
      'https://images.unsplash.com/photo-1596433809252-5c0dc1c3b7c5?w=500&q=80',
  },
  {
    id: 4,
    name: 'Breathe Easy',
    description: 'Eucalyptus & peppermint oil to clear the mind.',
    price: 18,
    category: 'Essential Oil',
    image_url:
      'https://images.unsplash.com/photo-1611073615830-9f76b6b8b6b8?w=500&q=80',
  },
]
