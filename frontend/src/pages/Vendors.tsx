import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MdOutlineAddCircle, 
  MdOutlineEdit, 
  MdOutlineDelete, 
  MdOutlineVisibility, 
  MdOutlineCategory, 
  MdOutlineAttachMoney, 
  MdOutlineBusinessCenter,
  MdOutlineSearch,
  MdOutlineFilterList,
  MdOutlineSort,
  MdOutlineVerified,
  MdOutlineWarning,
  MdOutlineMoreHoriz,
  MdOutlineAssessment,
  MdOutlineShoppingCart,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
  MdOutlineArrowForward
} from 'react-icons/md';
import { 
  HiOutlineDocumentText, 
  HiOutlineShieldCheck, 
  HiOutlineScale,
  HiOutlineChartBar
} from 'react-icons/hi2';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell 
} from 'recharts';
import ChatPopup from '../components/ChatPopup';

interface Vendor {
  id: number;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
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

// Function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const Vendors = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedVendor, setExpandedVendor] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for vendors with enhanced fields
  const vendors: Vendor[] = [
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
      name: 'Cambodia Poultry Farms',
      category: 'Dairy, Eggs & Fridge',
      contactPerson: 'Sopheap Kim',
      email: 's.kim@cambodiapoultry.kh',
      phone: '+855-23-987-6543',
      country: 'Cambodia',
      status: 'active',
      contractCount: 2,
      totalSpend: 240000,
      logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/kh.svg',
      products: ['Eggs', 'Poultry', 'Duck Products'],
      savingsRate: 9.5,
      onTimeDelivery: 88,
      qualityScore: 85,
      responseTime: '48h',
      lastNegotiation: '2025-04-10',
      yearlySpendData: [
        {year: '2022', spend: 0},
        {year: '2023', spend: 180000},
        {year: '2024', spend: 220000},
        {year: '2025', spend: 240000}
      ],
      tags: ['Value', 'Free Range', 'Sustainable']
    },
    {
      id: 16,
      name: 'Sao Tome Health Products',
      category: 'Health & Beauty',
      contactPerson: 'Miguel Santos',
      email: 'm.santos@saotomehealth.st',
      phone: '+239-222-1234',
      country: 'Sao Tome and Principe',
      status: 'pending',
      contractCount: 1,
      totalSpend: 120000,
      logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/st.svg',
      products: ['Pain Relievers', 'Supplements', 'Natural Remedies'],
      savingsRate: 4.8,
      onTimeDelivery: 75,
      qualityScore: 80,
      responseTime: '72h',
      lastNegotiation: '2025-04-21',
      yearlySpendData: [
        {year: '2022', spend: 0},
        {year: '2023', spend: 0},
        {year: '2024', spend: 90000},
        {year: '2025', spend: 120000}
      ],
      tags: ['Imported', 'Natural', 'New Partner']
    },
    {
      id: 17,
      name: 'Belize Organic Farms',
      category: 'Fruits & Vegetables',
      contactPerson: 'Juan Hernandez',
      email: 'j.hernandez@belizeorganic.bz',
      phone: '+501-223-4567',
      country: 'Belize',
      status: 'active',
      contractCount: 2,
      totalSpend: 190000,
      logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/bz.svg',
      products: ['Spinach', 'Kale', 'Exotic Greens'],
      savingsRate: 10.3,
      onTimeDelivery: 91,
      qualityScore: 89,
      responseTime: '36h',
      lastNegotiation: '2025-04-08',
      yearlySpendData: [
        {year: '2022', spend: 0},
        {year: '2023', spend: 130000},
        {year: '2024', spend: 170000},
        {year: '2025', spend: 190000}
      ],
      tags: ['Premium', 'Organic Certified', 'Sustainable']
    },
    {
      id: 18,
      name: 'Belgium Gourmet Meats',
      category: 'Deli & Chilled Meats',
      contactPerson: 'Luc Vandenberg',
      email: 'l.vandenberg@belgiumgourmet.be',
      phone: '+32-2-123-4567',
      country: 'Belgium',
      status: 'active',
      contractCount: 3,
      totalSpend: 360000,
      logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/be.svg',
      products: ['Pepperoni', 'Prosciutto', 'Specialty Meats'],
      savingsRate: 8.7,
      onTimeDelivery: 93,
      qualityScore: 92,
      responseTime: '24h',
      lastNegotiation: '2025-04-10',
      yearlySpendData: [
        {year: '2022', spend: 270000},
        {year: '2023', spend: 310000},
        {year: '2024', spend: 340000},
        {year: '2025', spend: 360000}
      ],
      tags: ['Value', 'Traditional', 'Award-Winning']
    },
    {
      id: 19,
      name: 'Martinique Pasta Co.',
      category: 'Pantry',
      contactPerson: 'Sophie Martin',
      email: 's.martin@martiniquepasta.mq',
      phone: '+596-596-123-456',
      country: 'Martinique',
      status: 'active',
      contractCount: 2,
      totalSpend: 210000,
      logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/fr.svg',
      products: ['Pasta', 'Noodles', 'Specialty Grains'],
      savingsRate: 7.9,
      onTimeDelivery: 90,
      qualityScore: 88,
      responseTime: '36h',
      lastNegotiation: '2025-04-19',
      yearlySpendData: [
        {year: '2022', spend: 0},
        {year: '2023', spend: 150000},
        {year: '2024', spend: 190000},
        {year: '2025', spend: 210000}
      ],
      tags: ['Premium', 'Artisanal', 'Imported']
    },
    {
      id: 20,
      name: 'Estonia Cured Meats',
      category: 'Deli & Chilled Meats',
      contactPerson: 'Mati Kask',
      email: 'm.kask@estoniacured.ee',
      phone: '+372-6-123-4567',
      country: 'Estonia',
      status: 'active',
      contractCount: 3,
      totalSpend: 290000,
      logoUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ee.svg',
      products: ['Prosciutto', 'Salami', 'Smoked Meats'],
      savingsRate: 9.3,
      onTimeDelivery: 94,
      qualityScore: 91,
      responseTime: '24h',
      lastNegotiation: '2025-04-23',
      yearlySpendData: [
        {year: '2022', spend: 210000},
        {year: '2023', spend: 240000},
        {year: '2024', spend: 270000},
        {year: '2025', spend: 290000}
      ],
      tags: ['Imported', 'Traditional', 'Award-Winning']
    }
  ];

  // Calculate summary data
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.status === 'active').length;
  const totalSpend = vendors.reduce((sum, v) => sum + v.totalSpend, 0);
  const avgSavingsRate = vendors.filter(v => v.status === 'active')
    .reduce((sum, v) => sum + v.savingsRate, 0) / activeVendors;

  // Category distribution for chart
  const categoryData = vendors.reduce((acc, vendor) => {
    acc[vendor.category] = (acc[vendor.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name, value
  }));

  const categoryColors = [
    '#00005e', // dark blue
    '#24bce7', // light blue
    '#d20002', // red
    '#f87304', // orange
    '#f4c200', // yellow
  ];

  // Status distribution for chart
  const statusData = vendors.reduce((acc, vendor) => {
    acc[vendor.status] = (acc[vendor.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = Object.entries(statusData).map(([name, value]) => ({
    name, value
  }));

  const statusColors = {
    active: '#10B981',    // green
    inactive: '#f87304',  // orange
    pending: '#24bce7',   // light blue
    blacklisted: '#d20002' // red
  };

  // Filter vendors based on selected status, category, and search query
  const filteredVendors = vendors.filter(vendor => 
    (selectedStatus === 'all' || vendor.status === selectedStatus) &&
    (selectedCategory === 'all' || vendor.category === selectedCategory) &&
    (searchQuery === '' || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      vendor.products.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Status options and categories for filters
  const statusOptions = ['all', 'active', 'inactive', 'pending', 'blacklisted'];
  const categories = [...new Set(vendors.map(v => v.category))];
  categories.unshift('all');

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'active': return 'badge-success';
      case 'inactive': return 'badge-warning';
      case 'pending': return 'badge-info';
      case 'blacklisted': return 'badge-error';
      default: return 'badge-ghost';
    }
  };

  // Function to toggle vendor details
  const toggleVendorDetails = (vendorId: number) => {
    if (expandedVendor === vendorId) {
      setExpandedVendor(null);
    } else {
      setExpandedVendor(vendorId);
    }
  };

  // Function to render vendor grid item
  const renderVendorGridItem = (vendor: Vendor) => (
    <Link to={`/vendors/${vendor.id}`} key={vendor.id} className="glass-panel p-0 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden shadow-md p-2">
            <img src={vendor.logoUrl} alt={vendor.name} className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{vendor.name}</h3>
            <p className="text-sm text-text-muted">{vendor.category}</p>
          </div>
          <span className={`badge ${getStatusBadgeColor(vendor.status)} ml-auto`}>
            {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-text-muted mb-1">Savings Rate</p>
            <p className="text-xl font-semibold text-accent-secondary flex items-center">
              {vendor.savingsRate}% 
              <MdOutlineTrendingUp className="ml-1 text-accent-secondary" />
            </p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Quality Score</p>
            <p className="text-xl font-semibold text-text-primary">{vendor.qualityScore}/100</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">On-Time Delivery</p>
            <p className="text-xl font-semibold text-text-primary">{vendor.onTimeDelivery}%</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Response Time</p>
            <p className="text-xl font-semibold text-text-primary">{vendor.responseTime}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-xs text-text-muted mb-1">Products</p>
          <div className="flex flex-wrap gap-2">
            {vendor.products.map((product, index) => (
              <span key={index} className="badge badge-outline badge-sm">{product}</span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-text-muted">
            <span className="flex items-center"><MdOutlineShoppingCart className="mr-1" /> {vendor.contractCount} contracts</span>
          </div>
          <button className="btn btn-sm btn-ghost text-accent-primary">
            View Details <MdOutlineArrowForward />
          </button>
        </div>
      </div>
      
      <div className="h-20 bg-base-300/30 p-4">
        <div className="flex justify-between items-center h-full">
          <div>
            <p className="text-xs text-text-muted">Total Spend (2023)</p>
            <p className="text-lg font-semibold text-text-primary">{formatCurrency(vendor.totalSpend)}</p>
          </div>
          <div className="h-full">
            <ResponsiveContainer width={120} height="100%">
              <BarChart data={vendor.yearlySpendData}>
                <Bar dataKey="spend" fill="#00005e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-text-primary">Vendor Directory</h1>
          <button className="btn btn-primary flex items-center gap-2">
            <MdOutlineAddCircle className="text-xl" />
            Add New Vendor
          </button>
        </div>

        {/* Vendor Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Total Vendors</p>
                <h3 className="text-3xl font-bold text-text-primary">{totalVendors}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
                <MdOutlineBusinessCenter className="text-accent-primary text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-accent-secondary"><MdOutlineTrendingUp /> +5</span>
              <span className="text-text-muted ml-2">vs last quarter</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Active Vendors</p>
                <h3 className="text-3xl font-bold text-accent-secondary">{activeVendors}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                <MdOutlineVerified className="text-accent-secondary text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-accent-secondary"><MdOutlineTrendingUp /> +2</span>
              <span className="text-text-muted ml-2">new this month</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Avg. Savings Rate</p>
                <h3 className="text-3xl font-bold text-text-primary">{avgSavingsRate.toFixed(1)}%</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
                <MdOutlineAttachMoney className="text-accent-primary text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-accent-secondary"><MdOutlineTrendingUp /> +1.2%</span>
              <span className="text-text-muted ml-2">vs last year</span>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Total Annual Spend</p>
                <h3 className="text-3xl font-bold text-text-primary">{formatCurrency(totalSpend)}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <HiOutlineChartBar className="text-blue-500 text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-accent-secondary"><MdOutlineTrendingUp /> +8.5%</span>
              <span className="text-text-muted ml-2">YoY increase</span>
            </div>
          </div>
        </div>

        {/* Chart Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Vendors by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({name}) => name}
                    labelLine={true}
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value, 'Vendors']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)', 
                      borderRadius: '8px' 
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Vendors by Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={true}
                  >
                    {statusChartData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={statusColors[entry.name as keyof typeof statusColors]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value, 'Vendors']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)', 
                      borderRadius: '8px' 
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="glass-panel p-6 rounded-xl">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="relative flex-grow max-w-xl">
              <MdOutlineSearch className="absolute left-4 top-3 text-xl text-text-muted" />
              <input 
                type="text" 
                placeholder="Search vendors or products..." 
                className="input input-bordered pl-12 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <div className="flex gap-2 items-center bg-base-300/30 px-3 py-2 rounded-lg">
                <MdOutlineFilterList className="text-xl text-text-muted" />
            <select 
                  className="select select-ghost w-full max-w-xs focus:outline-none focus:bg-transparent text-sm" 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
              <div className="flex gap-2 items-center bg-base-300/30 px-3 py-2 rounded-lg">
                <MdOutlineCategory className="text-xl text-text-muted" />
            <select 
                  className="select select-ghost w-full max-w-xs focus:outline-none focus:bg-transparent text-sm" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid View
                </button>
                <button 
                  className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setViewMode('list')}
                >
                  List View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Grid/List Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {filteredVendors.map(vendor => renderVendorGridItem(vendor))}
          </div>
        ) : (
          <div className="overflow-x-auto mb-6">
            <table className="table w-full glass-panel rounded-xl">
            <thead>
              <tr>
                  <th>Vendor</th>
                <th>Category</th>
                  <th>Contact</th>
                <th>Status</th>
                  <th>Performance</th>
                  <th>Spend (2023)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map(vendor => (
                  <tr key={vendor.id} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden shadow-md p-2">
                          <img src={vendor.logoUrl} alt={vendor.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <div className="font-semibold">{vendor.name}</div>
                          <div className="text-xs opacity-60">{vendor.products.length} products</div>
                        </div>
                      </div>
                    </td>
                    <td>{vendor.category}</td>
                    <td>
                      <div className="flex flex-col">
                        <span>{vendor.contactPerson}</span>
                        <span className="text-xs opacity-60">{vendor.email}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeColor(vendor.status)}`}>
                        {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <div className="badge badge-sm" style={{backgroundColor: vendor.qualityScore > 90 ? '#10B981' : vendor.qualityScore > 80 ? '#F59E0B' : '#EF4444'}}>
                          {vendor.qualityScore}%
                        </div>
                        <span className="text-xs opacity-60">quality</span>
                      </div>
                    </td>
                    <td>{formatCurrency(vendor.totalSpend)}</td>
                    <td>
                      <div className="flex gap-1">
                        <Link to={`/vendors/${vendor.id}`} className="btn btn-sm btn-ghost">
                          <MdOutlineVisibility className="text-lg" />
                        </Link>
                        <button className="btn btn-sm btn-ghost">
                          <MdOutlineEdit className="text-lg" />
                        </button>
                        <button className="btn btn-sm btn-ghost text-error">
                          <MdOutlineDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
      <ChatPopup />
    </div>
  );
};

export default Vendors; 