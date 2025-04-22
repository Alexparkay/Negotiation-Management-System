export interface Vendor {
  id: number;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  status: 'active' | 'pending' | 'inactive' | 'at_risk' | 'blacklisted';
  contractCount: number;
  totalSpend: number;
  logoUrl: string;
  products: string[];
  savingsRate: number;
  onTimeDelivery: number;
  qualityScore: number;
  responseTime: string;
  lastNegotiation: string;
  yearlySpendData: { year: string; spend: number }[];
  tags: string[];
}

export const realVendors: Vendor[] = [
  {
    id: 1,
    name: 'Angola Coffee Exports',
    category: 'Drinks',
    contactPerson: 'Carlos Machado',
    email: 'c.machado@angolacoffee.com',
    phone: '+244-923-555-7890',
    country: 'Angola',
    status: 'active',
    contractCount: 3,
    totalSpend: 450000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ao.svg',
    products: ['Coffee', 'Tea'],
    savingsRate: 11.1,
    onTimeDelivery: 94,
    qualityScore: 92,
    responseTime: '36h',
    lastNegotiation: '2025-04-20',
    yearlySpendData: [
      {year: '2022', spend: 320000},
      {year: '2023', spend: 380000},
      {year: '2024', spend: 420000},
      {year: '2025', spend: 450000}
    ],
    tags: ['Imported', 'Fair Trade', 'Reliable']
  },
  {
    id: 2,
    name: 'Greece Beauty Products',
    category: 'Health & Beauty',
    contactPerson: 'Elena Papadopoulos',
    email: 'elena@greecebeauty.com',
    phone: '+30-21-0555-6789',
    country: 'Greece',
    status: 'active',
    contractCount: 4,
    totalSpend: 580000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/gr.svg',
    products: ['Conditioner', 'Shampoo', 'Moisturizer'],
    savingsRate: 8.3,
    onTimeDelivery: 96,
    qualityScore: 90,
    responseTime: '24h',
    lastNegotiation: '2025-04-23',
    yearlySpendData: [
      {year: '2022', spend: 410000},
      {year: '2023', spend: 465000},
      {year: '2024', spend: 520000},
      {year: '2025', spend: 580000}
    ],
    tags: ['Value', 'Premium Quality']
  },
  {
    id: 3,
    name: 'Burkina Faso Fresh Produce',
    category: 'Fruits & Vegetables',
    contactPerson: 'Ibrahim Ouédraogo',
    email: 'i.ouedraogo@bffresh.com',
    phone: '+226-70-123-4567',
    country: 'Burkina Faso',
    status: 'active',
    contractCount: 2,
    totalSpend: 320000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/bf.svg',
    products: ['Oranges', 'Bananas', 'Mangoes'],
    savingsRate: 12.5,
    onTimeDelivery: 87,
    qualityScore: 85,
    responseTime: '48h',
    lastNegotiation: '2025-04-04',
    yearlySpendData: [
      {year: '2022', spend: 0},
      {year: '2023', spend: 180000},
      {year: '2024', spend: 260000},
      {year: '2025', spend: 320000}
    ],
    tags: ['Value', 'Seasonal', 'Organic']
  }
]; 