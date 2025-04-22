import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer,
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  MdOutlineCompare as MdCompareArrows,
  MdOutlineVisibility,
  MdFilterList,
  MdOutlineSearch,
  MdOutlineCategory,
  MdOutlineBusinessCenter,
  MdOutlineAttachMoney,
  MdOutlineVerified,
  MdOutlineShoppingCart,
  MdOutlineAccessTime,
  MdOutlineWarning,
  MdArrowForward,
  MdClose,
  MdCheck,
  MdOutlineTrendingUp,
  MdOutlineLocationOn,
  MdAdd,
  MdDownload
} from 'react-icons/md';
import { HiOutlineChartBar } from 'react-icons/hi2';
import ChatPopup from '../components/ChatPopup';
import { Button, IconButton, Chip } from '@/components/ui';

// Function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Define vendor interface based on the actual data structure in Vendors.tsx
interface Vendor {
  id: number;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  status: 'active' | 'inactive' | 'pending' | 'blacklisted' | 'at_risk';
  contractCount: number;
  totalSpend: number;
  logoUrl: string;
  products: string[];
  savingsRate: number;
  onTimeDelivery: number;
  qualityScore: number;
  responseTime: string;
  lastNegotiation: string;
  yearlySpendData: Array<{year: string, spend: number}>;
  tags: string[];
}

// Real vendor data from Vendors.tsx and ALDI tenders CSV
const realVendors: Vendor[] = [
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
  },
  {
    id: 4,
    name: 'EstoniaPrime',
    category: 'Health & Beauty',
    contactPerson: 'Kristiina Tamm',
    email: 'k.tamm@estoniaprime.ee',
    phone: '+372-5555-7890',
    country: 'Estonia',
    status: 'active',
    contractCount: 5,
    totalSpend: 740000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ee.svg',
    products: ['Deodorant', 'Shampoo', 'Prosciutto'],
    savingsRate: 12.1,
    onTimeDelivery: 94,
    qualityScore: 93,
    responseTime: '24h',
    lastNegotiation: '2025-04-07',
    yearlySpendData: [
      {year: '2022', spend: 550000},
      {year: '2023', spend: 620000},
      {year: '2024', spend: 680000},
      {year: '2025', spend: 740000}
    ],
    tags: ['Organic', 'Premium', 'Reliable']
  },
  {
    id: 5,
    name: 'Costa Rica Cosmetics',
    category: 'Health & Beauty',
    contactPerson: 'Maria Hernandez',
    email: 'mhernandez@crcosmetics.co.cr',
    phone: '+506-2555-7890',
    country: 'Costa Rica',
    status: 'pending',
    contractCount: 2,
    totalSpend: 290000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/cr.svg',
    products: ['Moisturizer', 'Face Masks'],
    savingsRate: 0,
    onTimeDelivery: 88,
    qualityScore: 91,
    responseTime: '48h',
    lastNegotiation: '2025-04-14',
    yearlySpendData: [
      {year: '2022', spend: 0},
      {year: '2023', spend: 150000},
      {year: '2024', spend: 250000},
      {year: '2025', spend: 290000}
    ],
    tags: ['Premium', 'Natural Ingredients', 'New Partner']
  },
  {
    id: 6,
    name: 'Bosnia Meats International',
    category: 'Deli & Chilled Meats',
    contactPerson: 'Adnan Begić',
    email: 'a.begic@bosniameats.ba',
    phone: '+387-33-555-123',
    country: 'Bosnia and Herzegovina',
    status: 'active',
    contractCount: 3,
    totalSpend: 520000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ba.svg',
    products: ['Pepperoni', 'Salami', 'Smoked Meats'],
    savingsRate: 10.0,
    onTimeDelivery: 91,
    qualityScore: 89,
    responseTime: '36h',
    lastNegotiation: '2025-04-24',
    yearlySpendData: [
      {year: '2022', spend: 360000},
      {year: '2023', spend: 420000},
      {year: '2024', spend: 480000},
      {year: '2025', spend: 520000}
    ],
    tags: ['Value', 'Quality Control', 'Traditional']
  },
  {
    id: 7,
    name: 'Cambodia Essential Supplies',
    category: 'Health & Beauty',
    contactPerson: 'Sokha Prak',
    email: 'sokha@cambodiaessentials.com.kh',
    phone: '+855-23-123-4567',
    country: 'Cambodia',
    status: 'blacklisted',
    contractCount: 1,
    totalSpend: 180000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/kh.svg',
    products: ['Shampoo'],
    savingsRate: 5.1,
    onTimeDelivery: 65,
    qualityScore: 58,
    responseTime: '96h',
    lastNegotiation: '2025-03-29',
    yearlySpendData: [
      {year: '2022', spend: 0},
      {year: '2023', spend: 0},
      {year: '2024', spend: 120000},
      {year: '2025', spend: 180000}
    ],
    tags: ['Imported', 'Quality Issues', 'Late Deliveries']
  },
  {
    id: 8,
    name: 'Somalia Fresh Produce',
    category: 'Fruits & Vegetables',
    contactPerson: 'Zahra Hassan',
    email: 'zhassan@somaliafresh.so',
    phone: '+252-61-555-7890',
    country: 'Somalia',
    status: 'active',
    contractCount: 2,
    totalSpend: 280000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/so.svg',
    products: ['Tomatoes', 'Peppers', 'Onions'],
    savingsRate: 12.2,
    onTimeDelivery: 89,
    qualityScore: 84,
    responseTime: '48h',
    lastNegotiation: '2025-04-06',
    yearlySpendData: [
      {year: '2022', spend: 0},
      {year: '2023', spend: 160000},
      {year: '2024', spend: 230000},
      {year: '2025', spend: 280000}
    ],
    tags: ['Value', 'Seasonal', 'Direct Farm']
  },
  {
    id: 9,
    name: 'Micronesia Dairy Products',
    category: 'Dairy, Eggs & Fridge',
    contactPerson: 'David Nakamura',
    email: 'd.nakamura@micronesiadairy.fm',
    phone: '+691-320-1234',
    country: 'Micronesia',
    status: 'active',
    contractCount: 3,
    totalSpend: 310000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/fm.svg',
    products: ['Yogurt', 'Cheese', 'Butter'],
    savingsRate: 9.8,
    onTimeDelivery: 92,
    qualityScore: 90,
    responseTime: '36h',
    lastNegotiation: '2025-04-23',
    yearlySpendData: [
      {year: '2022', spend: 210000},
      {year: '2023', spend: 250000},
      {year: '2024', spend: 290000},
      {year: '2025', spend: 310000}
    ],
    tags: ['Premium', 'Organic', 'Cold Chain Certified']
  },
  {
    id: 10,
    name: 'Equatorial Guinea Foods',
    category: 'Freezer',
    contactPerson: 'Elena Mba',
    email: 'e.mba@eqguineafoods.gq',
    phone: '+240-222-123-456',
    country: 'Equatorial Guinea',
    status: 'active',
    contractCount: 2,
    totalSpend: 260000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/gq.svg',
    products: ['Frozen Pies', 'Ice Cream', 'Frozen Vegetables'],
    savingsRate: 7.5,
    onTimeDelivery: 86,
    qualityScore: 88,
    responseTime: '48h',
    lastNegotiation: '2025-03-31',
    yearlySpendData: [
      {year: '2022', spend: 0},
      {year: '2023', spend: 180000},
      {year: '2024', spend: 230000},
      {year: '2025', spend: 260000}
    ],
    tags: ['Premium', 'Commercial Scale', 'Imported']
  },
  {
    id: 11,
    name: 'Togo Fruit Exporters',
    category: 'Fruits & Vegetables',
    contactPerson: 'Kofi Mensah',
    email: 'k.mensah@togoexport.tg',
    phone: '+228-90-123-456',
    country: 'Togo',
    status: 'active',
    contractCount: 3,
    totalSpend: 215000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/tg.svg',
    products: ['Bananas', 'Plantains', 'Tropical Fruits'],
    savingsRate: 11.3,
    onTimeDelivery: 90,
    qualityScore: 87,
    responseTime: '24h',
    lastNegotiation: '2025-04-07',
    yearlySpendData: [
      {year: '2022', spend: 0},
      {year: '2023', spend: 120000},
      {year: '2024', spend: 180000},
      {year: '2025', spend: 215000}
    ],
    tags: ['Imported', 'Organic', 'Fair Trade']
  },
  {
    id: 12,
    name: 'Armenia Pharmaceuticals',
    category: 'Health & Beauty',
    contactPerson: 'Anna Hakobyan',
    email: 'a.hakobyan@armeniapharma.am',
    phone: '+374-10-555-789',
    country: 'Armenia',
    status: 'pending',
    contractCount: 1,
    totalSpend: 195000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/am.svg',
    products: ['Pain Relievers', 'First Aid Kits', 'Vitamins'],
    savingsRate: 6.8,
    onTimeDelivery: 82,
    qualityScore: 92,
    responseTime: '36h',
    lastNegotiation: '2025-04-20',
    yearlySpendData: [
      {year: '2022', spend: 0},
      {year: '2023', spend: 0},
      {year: '2024', spend: 150000},
      {year: '2025', spend: 195000}
    ],
    tags: ['Imported', 'FDA Approved', 'New Partner']
  },
  {
    id: 13,
    name: 'Egypt Beauty Supplies',
    category: 'Health & Beauty',
    contactPerson: 'Amira Mahmoud',
    email: 'a.mahmoud@egyptbeauty.eg',
    phone: '+20-2-1234-5678',
    country: 'Egypt',
    status: 'inactive',
    contractCount: 2,
    totalSpend: 145000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/eg.svg',
    products: ['Conditioner', 'Hair Care', 'Skin Care'],
    savingsRate: 5.5,
    onTimeDelivery: 78,
    qualityScore: 83,
    responseTime: '72h',
    lastNegotiation: '2025-04-05',
    yearlySpendData: [
      {year: '2022', spend: 120000},
      {year: '2023', spend: 135000},
      {year: '2024', spend: 145000},
      {year: '2025', spend: 0}
    ],
    tags: ['Premium', 'Natural Ingredients', 'Contract Ended']
  },
  {
    id: 14,
    name: 'France Gourmet Foods',
    category: 'Deli & Chilled Meats',
    contactPerson: 'Pierre Dubois',
    email: 'p.dubois@francegourmet.fr',
    phone: '+33-1-2345-6789',
    country: 'France',
    status: 'active',
    contractCount: 4,
    totalSpend: 480000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/fr.svg',
    products: ['Roast Chicken', 'Pâté', 'Charcuterie'],
    savingsRate: 7.2,
    onTimeDelivery: 95,
    qualityScore: 94,
    responseTime: '24h',
    lastNegotiation: '2025-04-20',
    yearlySpendData: [
      {year: '2022', spend: 360000},
      {year: '2023', spend: 410000},
      {year: '2024', spend: 450000},
      {year: '2025', spend: 480000}
    ],
    tags: ['Premium', 'Imported', 'Award-Winning']
  },
  {
    id: 15,
    name: 'Benin Frozen Foods',
    category: 'Freezer',
    contactPerson: 'Amina Khoury',
    email: 'a.khoury@beninfrozen.bj',
    phone: '+229-21-123-456',
    country: 'Benin',
    status: 'active',
    contractCount: 3,
    totalSpend: 320000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/bj.svg',
    products: ['Pizza', 'Frozen Meals', 'Ice Cream'],
    savingsRate: 8.9,
    onTimeDelivery: 90,
    qualityScore: 87,
    responseTime: '36h',
    lastNegotiation: '2025-04-22',
    yearlySpendData: [
      {year: '2022', spend: 220000},
      {year: '2023', spend: 260000},
      {year: '2024', spend: 300000},
      {year: '2025', spend: 320000}
    ],
    tags: ['Imported', 'Volume Discount', 'Cold Chain Certified']
  },
  {
    id: 16,
    name: 'Algeria Medical Supplies',
    category: 'Health & Beauty',
    contactPerson: 'Mohammed Benali',
    email: 'm.benali@algeriamedical.dz',
    phone: '+213-21-123-456',
    country: 'Algeria',
    status: 'active',
    contractCount: 2,
    totalSpend: 210000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/dz.svg',
    products: ['First Aid Kits', 'Bandages', 'Health Supplements'],
    savingsRate: 7.5,
    onTimeDelivery: 93,
    qualityScore: 90,
    responseTime: '24h',
    lastNegotiation: '2025-03-30',
    yearlySpendData: [
      {year: '2022', spend: 160000},
      {year: '2023', spend: 180000},
      {year: '2024', spend: 200000},
      {year: '2025', spend: 210000}
    ],
    tags: ['Organic', 'Medical Grade', 'Certified']
  },
  {
    id: 17,
    name: 'Slovak Republic Food Corp',
    category: 'Freezer',
    contactPerson: 'Jana Novak',
    email: 'j.novak@slovakfood.sk',
    phone: '+421-2-123-4567',
    country: 'Slovakia',
    status: 'active',
    contractCount: 3,
    totalSpend: 380000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/sk.svg',
    products: ['Frozen Chips', 'Frozen Vegetables', 'Ready Meals'],
    savingsRate: 9.8,
    onTimeDelivery: 92,
    qualityScore: 89,
    responseTime: '36h',
    lastNegotiation: '2025-04-27',
    yearlySpendData: [
      {year: '2022', spend: 290000},
      {year: '2023', spend: 320000},
      {year: '2024', spend: 360000},
      {year: '2025', spend: 380000}
    ],
    tags: ['Organic', 'Sustainable', 'High Volume']
  },
  {
    id: 18,
    name: 'Virgin Islands Beverages',
    category: 'Drinks',
    contactPerson: 'Richard Miller',
    email: 'r.miller@vibeverages.vi',
    phone: '+1-340-123-4567',
    country: 'United States Virgin Islands',
    status: 'pending',
    contractCount: 1,
    totalSpend: 175000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/vi.svg',
    products: ['Iced Tea', 'Fruit Juices', 'Sparkling Water'],
    savingsRate: 6.2,
    onTimeDelivery: 85,
    qualityScore: 86,
    responseTime: '48h',
    lastNegotiation: '2025-04-26',
    yearlySpendData: [
      {year: '2022', spend: 0},
      {year: '2023', spend: 0},
      {year: '2024', spend: 140000},
      {year: '2025', spend: 175000}
    ],
    tags: ['Premium', 'Imported', 'New Partner']
  },
  {
    id: 19,
    name: 'Seychelles Poultry Ltd.',
    category: 'Deli & Chilled Meats',
    contactPerson: 'Marie Dubois',
    email: 'm.dubois@seychellespoultry.sc',
    phone: '+248-4-123-456',
    country: 'Seychelles',
    status: 'active',
    contractCount: 2,
    totalSpend: 230000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/sc.svg',
    products: ['Turkey Breast', 'Chicken Products', 'Specialty Meats'],
    savingsRate: 8.3,
    onTimeDelivery: 88,
    qualityScore: 87,
    responseTime: '36h',
    lastNegotiation: '2025-04-04',
    yearlySpendData: [
      {year: '2022', spend: 180000},
      {year: '2023', spend: 200000},
      {year: '2024', spend: 220000},
      {year: '2025', spend: 230000}
    ],
    tags: ['Imported', 'Premium Quality', 'Free Range']
  },
  {
    id: 20,
    name: 'Montenegro Bakery Supplies',
    category: 'Freezer',
    contactPerson: 'Stefan Petrovic',
    email: 's.petrovic@montenegrobakery.me',
    phone: '+382-20-123-456',
    country: 'Montenegro',
    status: 'at_risk',
    contractCount: 2,
    totalSpend: 195000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/me.svg',
    products: ['Frozen Pies', 'Pastries', 'Bakery Items'],
    savingsRate: 5.8,
    onTimeDelivery: 76,
    qualityScore: 82,
    responseTime: '60h',
    lastNegotiation: '2025-04-10',
    yearlySpendData: [
      {year: '2022', spend: 0},
      {year: '2023', spend: 150000},
      {year: '2024', spend: 180000},
      {year: '2025', spend: 195000}
    ],
    tags: ['Imported', 'Traditional Recipes', 'Quality Concerns']
  }
];

// ALDI color palette
const aldiColors = {
  darkBlue: '#00005e',
  lightBlue: '#24bce7',
  red: '#d20002',
  orange: '#f87304',
  yellow: '#f4c200'
};

// Create an array of colors for consistent use across charts
const vendorColors = [
  aldiColors.darkBlue,
  aldiColors.lightBlue,
  aldiColors.red,
  aldiColors.orange,
  aldiColors.yellow,
  '#8B5CF6', // Additional colors for more than 5 vendors
  '#10B981',
  '#F59E0B',
  '#3B82F6',
  '#EC4899',
  '#6366F1',
  '#14B8A6',
  '#F97316',
  '#8B5CF6',
  '#EF4444',
  '#22D3EE',
  '#A3E635',
  '#FB923C',
  '#C084FC',
  '#F472B6'
];

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="glass-panel p-3 rounded-lg text-white">
      <p className="font-medium">{payload[0].name}</p>
      <p>{payload[0].value}</p>
    </div>
  );
};

// Function to handle downloading report
const handleDownloadReport = () => {
  console.log('Downloading vendor comparison report...');
  // In a real application, this would generate and download a PDF or Excel report
  alert('Report download functionality would be implemented here');
};

const VendorComparison: React.FC = () => {
  const navigate = useNavigate();
  const [vendors] = useState<Vendor[]>(realVendors);
  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState<boolean>(false);

  // Calculate unique categories and statuses for filters
  const categories = ['all', ...Array.from(new Set(vendors.map(v => v.category)))];
  const statuses = ['all', 'active', 'inactive', 'pending', 'blacklisted'];

  // Filter vendors based on criteria
  const filteredVendors = vendors.filter(vendor => {
    const matchesCategory = filterCategory === 'all' || vendor.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || vendor.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      vendor.products.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Sort vendors based on selected field
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    const aValue = sortField === 'totalSpend' ? a.totalSpend :
                   sortField === 'qualityScore' ? a.qualityScore :
                   sortField === 'onTimeDelivery' ? a.onTimeDelivery :
                   sortField === 'savingsRate' ? a.savingsRate : a.name;
    
    const bValue = sortField === 'totalSpend' ? b.totalSpend :
                   sortField === 'qualityScore' ? b.qualityScore :
                   sortField === 'onTimeDelivery' ? b.onTimeDelivery :
                   sortField === 'savingsRate' ? b.savingsRate : b.name;
    
    return sortDirection === 'asc' 
      ? (typeof aValue === 'string' 
          ? aValue.localeCompare(bValue as string) 
          : (aValue as number) - (bValue as number))
      : (typeof bValue === 'string' 
          ? bValue.localeCompare(aValue as string) 
          : (bValue as number) - (aValue as number));
  });

  // Toggle vendor selection for comparison
  const toggleVendorSelection = (vendor: Vendor) => {
    setSelectedVendors(prev => {
      // If already selected, remove it
      if (prev.includes(vendor)) {
        return prev.filter(v => v.id !== vendor.id);
      }
      
      // If selecting more than 2 vendors, replace the oldest selection
      if (prev.length >= 2) {
        return [prev[1], vendor];
      }
      
      // Otherwise add to selection
      return [...prev, vendor];
    });
  };

  // Get the selected vendors' data
  const selectedVendorsData = vendors.filter(v => selectedVendors.includes(v));

  // Radar chart data preparation
  const getRadarChartData = () => {
    return [
      { metric: 'Quality', fullMark: 100 },
      { metric: 'Delivery', fullMark: 100 },
      { metric: 'Response', fullMark: 100 },
      { metric: 'Savings', fullMark: 20 }
    ].map(item => {
      const result: any = { ...item };
      selectedVendorsData.forEach(vendor => {
        switch(item.metric) {
          case 'Quality':
            result[vendor.name] = vendor.qualityScore;
            break;
          case 'Delivery':
            result[vendor.name] = vendor.onTimeDelivery;
            break;
          case 'Response':
            result[vendor.name] = vendor.responseTime === '24h' ? 95 :
                                  vendor.responseTime === '36h' ? 85 :
                                  vendor.responseTime === '48h' ? 75 :
                                  vendor.responseTime === '72h' ? 65 : 50;
            break;
          case 'Savings':
            result[vendor.name] = vendor.savingsRate;
            break;
        }
      });
      return result;
    });
  };

  // Bar chart data for yearly spend
  const getYearlySpendData = () => {
    // Get all years from all vendors
    const allYears = Array.from(new Set(
      selectedVendorsData.flatMap(v => v.yearlySpendData.map(d => d.year))
    )).sort();
    
    return allYears.map(year => {
      const result: any = { year };
      selectedVendorsData.forEach(vendor => {
        const yearData = vendor.yearlySpendData.find(d => d.year === year);
        result[vendor.name] = yearData ? yearData.spend : 0;
      });
      return result;
    });
  };

  // Delivery data for charts
  const deliveryData = selectedVendorsData.map(vendor => ({
    name: vendor.name,
    onTimeDelivery: vendor.onTimeDelivery,
    savingsRate: vendor.savingsRate
  }));

  // Format response time for display
  const formatResponseTime = (time: string) => {
    return time.replace('h', ' hours');
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'active': return 'badge-success';
      case 'inactive': return 'badge-warning';
      case 'pending': return 'badge-info';
      case 'blacklisted': return 'badge-error';
      default: return 'badge-ghost';
    }
  };

  // Calculate recommendation for each metric
  const getRecommendation = (metric: string) => {
    if (selectedVendorsData.length !== 2) return null;
    
    const vendor1 = selectedVendorsData[0];
    const vendor2 = selectedVendorsData[1];
    
    switch(metric) {
      case 'Quality':
        return vendor1.qualityScore > vendor2.qualityScore ? vendor1.name : vendor2.name;
      case 'Delivery':
        return vendor1.onTimeDelivery > vendor2.onTimeDelivery ? vendor1.name : vendor2.name;
      case 'Response':
        const v1ResponseHours = parseInt(vendor1.responseTime);
        const v2ResponseHours = parseInt(vendor2.responseTime);
        return v1ResponseHours < v2ResponseHours ? vendor1.name : vendor2.name;
      case 'Savings':
        return vendor1.savingsRate > vendor2.savingsRate ? vendor1.name : vendor2.name;
      case 'Cost':
        // For cost, lower is better
        return vendor1.totalSpend < vendor2.totalSpend ? vendor1.name : vendor2.name;
      default:
        return null;
    }
  };

  // Render vendor card for comparison
  const renderVendorComparisonCard = (vendor: Vendor) => (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-start mb-4">
        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden shadow-md p-2 mr-4">
          <img src={vendor.logoUrl} alt={vendor.name} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-white">{vendor.name}</h3>
              <p className="text-text-muted">{vendor.category}</p>
            </div>
            <span className={`badge ${getStatusBadgeColor(vendor.status)}`}>
              {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
            </span>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {vendor.tags.map((tag, idx) => (
              <span key={idx} className="badge badge-sm badge-outline">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass-panel bg-background-secondary/30 p-3 rounded-lg">
          <p className="text-xs text-text-muted mb-1">Quality Score</p>
          <p className="text-xl font-semibold text-white">{vendor.qualityScore}/100</p>
        </div>
        <div className="glass-panel bg-background-secondary/30 p-3 rounded-lg">
          <p className="text-xs text-text-muted mb-1">On-Time Delivery</p>
          <p className="text-xl font-semibold text-white">{vendor.onTimeDelivery}%</p>
        </div>
        <div className="glass-panel bg-background-secondary/30 p-3 rounded-lg">
          <p className="text-xs text-text-muted mb-1">Response Time</p>
          <p className="text-xl font-semibold text-white">{formatResponseTime(vendor.responseTime)}</p>
        </div>
        <div className="glass-panel bg-background-secondary/30 p-3 rounded-lg">
          <p className="text-xs text-text-muted mb-1">Savings Rate</p>
          <p className="text-xl font-semibold text-accent-secondary">{vendor.savingsRate}%</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-text-muted mb-2">Annual Spend ({vendor.yearlySpendData[vendor.yearlySpendData.length-1].year})</p>
        <p className="text-2xl font-bold text-white">{formatCurrency(vendor.totalSpend)}</p>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-text-muted mb-2">Products ({vendor.products.length})</p>
        <div className="flex flex-wrap gap-2">
          {vendor.products.map((product, idx) => (
            <span key={idx} className="badge badge-sm">{product}</span>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center text-text-secondary">
          <MdOutlineLocationOn className="mr-1" /> {vendor.country}
        </div>
        <button 
          onClick={() => navigate(`/vendors/${vendor.id}`)}
          className="btn btn-sm btn-outline"
        >
          View Details <MdArrowForward className="ml-1" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-semibold text-white mb-4 md:mb-0">Vendor Comparison</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="contained" 
            startIcon={<MdAdd />}
            className="bg-gradient-to-r from-[#00005e] to-[#24bce7] hover:brightness-110 transition-all duration-300"
            onClick={() => setIsSelectModalOpen(true)}
          >
            Add Vendor
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<MdDownload />}
            className="border border-white/10 hover:bg-white/5 transition-all duration-300"
            onClick={handleDownloadReport}
          >
            Download Report
          </Button>
        </div>
      </div>

      {selectedVendors.length === 0 ? (
        <div className="glass-panel rounded-xl border border-white/10 shadow-lg shadow-black/20 p-12 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <MdCompareArrows className="text-7xl text-gray-400" />
            <h2 className="text-2xl font-semibold text-white">Select Vendors to Compare</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Choose vendors from our directory to analyze and compare their performance metrics, spending history, and more.
            </p>
            <Button 
              variant="contained" 
              startIcon={<MdAdd />}
              className="mt-4 bg-gradient-to-r from-[#00005e] to-[#24bce7] hover:brightness-110 transition-all duration-300"
              onClick={() => setIsSelectModalOpen(true)}
            >
              Add Vendors
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {selectedVendors.map((vendor, index) => (
              <div key={vendor.id} className="glass-panel rounded-xl border border-white/10 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                        <img src={vendor.logoUrl} alt={vendor.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{vendor.name}</h3>
                        <p className="text-gray-400">{vendor.category}</p>
                      </div>
                    </div>
                    <IconButton 
                      size="small" 
                      onClick={() => toggleVendorSelection(vendor)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                    >
                      <MdClose />
                    </IconButton>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Total Spend</p>
                      <p className="text-white text-lg font-semibold">{formatCurrency(vendor.totalSpend)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Contracts</p>
                      <p className="text-white text-lg font-semibold">{vendor.contractCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Savings Rate</p>
                      <p className="text-white text-lg font-semibold">{vendor.savingsRate}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Quality Score</p>
                      <p className="text-white text-lg font-semibold">{vendor.qualityScore}/100</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-400">
                        {vendor.products.length} Products
                      </p>
                      <div className="flex gap-1">
                        {vendor.tags.slice(0, 2).map((tag, i) => (
                          <Chip 
                            key={i} 
                            label={tag} 
                            size="small" 
                            className="bg-[#2A2A2A] text-xs"
                          />
                        ))}
                        {vendor.tags.length > 2 && (
                          <Chip 
                            label={`+${vendor.tags.length - 2}`} 
                            size="small" 
                            className="bg-[#2A2A2A] text-xs"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="glass-panel p-6 rounded-xl border border-white/10 shadow-lg shadow-black/20">
              <h3 className="text-xl font-semibold mb-4">Performance Comparison</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={getRadarChartData()}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#B3B3B3' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#B3B3B3" />
                  {selectedVendorsData.map((vendor, idx) => (
                    <Radar
                      key={vendor.id}
                      name={vendor.name}
                      dataKey={vendor.name}
                      stroke={vendorColors[idx % vendorColors.length]}
                      fill={vendorColors[idx % vendorColors.length]}
                      fillOpacity={0.6}
                    />
                  ))}
                  <Legend />
                  <RechartsTooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/10 shadow-lg shadow-black/20">
              <h3 className="text-xl font-semibold mb-4">Annual Spend History</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={getYearlySpendData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="year" tick={{ fill: '#B3B3B3' }} />
                  <YAxis tick={{ fill: '#B3B3B3' }} tickFormatter={(value) => `$${value/1000}k`} />
                  <RechartsTooltip 
                    content={<CustomTooltip />}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spend']}
                  />
                  <Legend />
                  {selectedVendorsData.map((vendor, idx) => (
                    <Bar 
                      key={vendor.id} 
                      dataKey={vendor.name} 
                      fill={vendorColors[idx % vendorColors.length]} 
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-xl border border-white/10 shadow-lg shadow-black/20">
              <h3 className="text-xl font-semibold mb-4">Savings Rate</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={deliveryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" tick={{ fill: '#B3B3B3' }} />
                  <YAxis tick={{ fill: '#B3B3B3' }} />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(26, 26, 26, 0.9)', 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="savingsRate" name="Savings Rate %" radius={[4, 4, 0, 0]}>
                    {deliveryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={vendorColors[index % vendorColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/10 shadow-lg shadow-black/20">
              <h3 className="text-xl font-semibold mb-4">On-Time Delivery</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={deliveryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" tick={{ fill: '#B3B3B3' }} />
                  <YAxis tick={{ fill: '#B3B3B3' }} />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(26, 26, 26, 0.9)', 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="onTimeDelivery" name="On-Time Delivery %" radius={[4, 4, 0, 0]}>
                    {deliveryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={vendorColors[index % vendorColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Vendor selection modal (simplified for this example) */}
      {isSelectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glass-panel p-6 rounded-xl border border-white/10 shadow-xl w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Select Vendors to Compare</h2>
              <IconButton onClick={() => setIsSelectModalOpen(false)}>
                <MdClose />
              </IconButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {sortedVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className={`glass-panel p-4 rounded-lg cursor-pointer border ${
                    selectedVendors.includes(vendor) 
                      ? 'border-accent-primary' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => toggleVendorSelection(vendor)}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center mr-3">
                      <img src={vendor.logoUrl} alt={vendor.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{vendor.name}</h3>
                      <p className="text-sm text-gray-400">{vendor.category}</p>
                    </div>
                    {selectedVendors.includes(vendor) && (
                      <div className="ml-auto w-6 h-6 bg-accent-primary rounded-full flex items-center justify-center">
                        <MdCheck className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-6 gap-4">
              <Button
                variant="outlined"
                onClick={() => setIsSelectModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={selectedVendors.length === 0}
                onClick={() => setIsSelectModalOpen(false)}
              >
                Compare {selectedVendors.length > 0 ? `(${selectedVendors.length})` : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <ChatPopup />
    </div>
  );
};

export default VendorComparison; 