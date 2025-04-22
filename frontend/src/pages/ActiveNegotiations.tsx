import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Chip,
  Menu,
  MenuItem
} from '@mui/material';
import {
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiDollarSign,
  FiAlertTriangle,
  FiCheckCircle,
  FiArrowUp,
  FiArrowDown,
  FiCalendar,
  FiMoreVertical,
  FiMessageSquare,
  FiFileText,
  FiTrendingUp,
  FiPackage,
  FiSliders,
  FiX,
  FiExternalLink
} from 'react-icons/fi';

interface Negotiation {
  id: string;
  title: string;
  vendor: {
    id: number;
    name: string;
    logo: string;
  };
  category: string;
  status: 'active' | 'pending' | 'at_risk' | 'completed';
  priority: 'high' | 'medium' | 'low';
  startDate: string;
  deadline: string;
  currentValue: number;
  targetValue: number;
  progress: number;
  riskFactors: string[];
  productCategories: string[];
  lastUpdate: string;
  negotiator: string;
  documents: number;
  messages: number;
}

// Get today's date
const today = new Date();

// Helper to add days to a date
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Format date to YYYY-MM-DD
const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Mock active negotiations based on Aldi tender data
const mockNegotiations: Negotiation[] = [
  {
    id: 'T2025-230',
    title: 'Organic Frozen Chips Supply Tender',
    vendor: {
      id: 1,
      name: 'Slovakia Food Suppliers',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/sk.svg'
    },
    category: 'Freezer',
    status: 'active',
    priority: 'high',
    startDate: formatDate(addDays(today, -4)),
    deadline: formatDate(addDays(today, 7)),
    currentValue: 580000,
    targetValue: 510000,
    progress: 65,
    riskFactors: ['Organic certification compliance', 'Storage temperature requirements', 'Packaging sustainability'],
    productCategories: ['Frozen Chips'],
    lastUpdate: formatDate(addDays(today, -1)),
    negotiator: 'Sarah Chen',
    documents: 7,
    messages: 18
  },
  {
    id: 'T2025-229',
    title: 'Imported Lettuce - Fresh Produce',
    vendor: {
      id: 2,
      name: 'Djibouti Fresh Foods',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/dj.svg'
    },
    category: 'Fruits & Vegetables',
    status: 'at_risk',
    priority: 'high',
    startDate: formatDate(addDays(today, -6)),
    deadline: formatDate(addDays(today, 3)),
    currentValue: 420000,
    targetValue: 375000,
    progress: 40,
    riskFactors: ['Transit time sensitivity', 'Cold chain integrity', 'Seasonal price volatility'],
    productCategories: ['Lettuce'],
    lastUpdate: formatDate(addDays(today, -2)),
    negotiator: 'Michael Rodriguez',
    documents: 9,
    messages: 24
  },
  {
    id: 'T2025-228',
    title: 'Pantry Staples - Rice Contract',
    vendor: {
      id: 3,
      name: 'Sierra Leone Grains',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/sl.svg'
    },
    category: 'Pantry',
    status: 'pending',
    priority: 'medium',
    startDate: formatDate(addDays(today, -11)),
    deadline: formatDate(addDays(today, 4)),
    currentValue: 320000,
    targetValue: 285000,
    progress: 25,
    riskFactors: ['Quality consistency', 'International shipping logistics'],
    productCategories: ['Rice'],
    lastUpdate: formatDate(addDays(today, -3)),
    negotiator: 'Emma Thompson',
    documents: 5,
    messages: 12
  },
  {
    id: 'T2025-227',
    title: 'Dairy Products - Premium Cream',
    vendor: {
      id: 4,
      name: 'Mozambique Dairy Co.',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/mz.svg'
    },
    category: 'Dairy, Eggs & Fridge',
    status: 'active',
    priority: 'medium',
    startDate: formatDate(addDays(today, -7)),
    deadline: formatDate(addDays(today, 8)),
    currentValue: 230000,
    targetValue: 205000,
    progress: 52,
    riskFactors: ['Cold chain requirements', 'Product shelf life'],
    productCategories: ['Cream'],
    lastUpdate: formatDate(addDays(today, -1)),
    negotiator: 'David Wilson',
    documents: 6,
    messages: 15
  },
  {
    id: 'T2025-226',
    title: 'Imported Frozen Pies Supply',
    vendor: {
      id: 5,
      name: 'Montenegro Bakery Products',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/me.svg'
    },
    category: 'Freezer',
    status: 'at_risk',
    priority: 'high',
    startDate: formatDate(addDays(today, -14)),
    deadline: formatDate(addDays(today, 2)),
    currentValue: 390000,
    targetValue: 340000,
    progress: 35,
    riskFactors: ['Production capacity limitations', 'Delivery timeline', 'Ingredient quality standards'],
    productCategories: ['Frozen Pies'],
    lastUpdate: formatDate(addDays(today, -2)),
    negotiator: 'Jennifer Park',
    documents: 8,
    messages: 22
  },
  {
    id: 'T2025-225',
    title: 'Organic Yogurt Product Line',
    vendor: {
      id: 6,
      name: 'Iceland Dairy Association',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/is.svg'
    },
    category: 'Dairy, Eggs & Fridge',
    status: 'active',
    priority: 'medium',
    startDate: formatDate(addDays(today, -8)),
    deadline: formatDate(addDays(today, 11)),
    currentValue: 275000,
    targetValue: 245000,
    progress: 60,
    riskFactors: ['Organic certification', 'Temperature-controlled logistics'],
    productCategories: ['Yogurt'],
    lastUpdate: formatDate(addDays(today, -1)),
    negotiator: 'Lisa Johnson',
    documents: 5,
    messages: 14
  },
  {
    id: 'T2025-224',
    title: 'Premium Chocolate Assortment',
    vendor: {
      id: 7,
      name: 'Swiss Chocolatiers',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ch.svg'
    },
    category: 'Confectionery',
    status: 'active',
    priority: 'medium',
    startDate: formatDate(addDays(today, -10)),
    deadline: formatDate(addDays(today, 9)),
    currentValue: 410000,
    targetValue: 375000,
    progress: 75,
    riskFactors: ['Cocoa price volatility', 'Artisanal production capacity'],
    productCategories: ['Chocolate'],
    lastUpdate: formatDate(addDays(today, -2)),
    negotiator: 'Robert Smith',
    documents: 6,
    messages: 16
  },
  {
    id: 'T2025-223',
    title: 'Bottled Drinking Water Supply',
    vendor: {
      id: 8,
      name: 'Armenia Springs',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/am.svg'
    },
    category: 'Drinks',
    status: 'pending',
    priority: 'low',
    startDate: formatDate(addDays(today, -9)),
    deadline: formatDate(addDays(today, 5)),
    currentValue: 185000,
    targetValue: 170000,
    progress: 30,
    riskFactors: ['Plastic reduction requirements', 'Transportation costs'],
    productCategories: ['Bottled Water'],
    lastUpdate: formatDate(addDays(today, -3)),
    negotiator: 'Jessica Taylor',
    documents: 4,
    messages: 10
  },
  {
    id: 'T2025-222',
    title: 'Premium Olive Oil Selection',
    vendor: {
      id: 9,
      name: 'Greek Olive Estates',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/gr.svg'
    },
    category: 'Pantry',
    status: 'active',
    priority: 'high',
    startDate: formatDate(addDays(today, -15)),
    deadline: formatDate(addDays(today, 12)),
    currentValue: 295000,
    targetValue: 260000,
    progress: 70,
    riskFactors: ['Harvest quality variations', 'Premium certification'],
    productCategories: ['Oils & Vinegars'],
    lastUpdate: formatDate(addDays(today, -1)),
    negotiator: 'Maria Garcia',
    documents: 7,
    messages: 19
  },
  {
    id: 'T2025-221',
    title: 'Exotic Spices Collection',
    vendor: {
      id: 10,
      name: 'India Spice Traders',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/in.svg'
    },
    category: 'Pantry',
    status: 'active',
    priority: 'medium',
    startDate: formatDate(addDays(today, -5)),
    deadline: formatDate(addDays(today, 15)),
    currentValue: 210000,
    targetValue: 185000,
    progress: 45,
    riskFactors: ['Seasonal availability', 'Quality testing'],
    productCategories: ['Spices'],
    lastUpdate: formatDate(addDays(today, -2)),
    negotiator: 'Thomas Brown',
    documents: 5,
    messages: 13
  },
  {
    id: 'T2025-220',
    title: 'Premium Beef Products',
    vendor: {
      id: 11,
      name: 'Argentina Meats',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ar.svg'
    },
    category: 'Meat & Poultry',
    status: 'at_risk',
    priority: 'high',
    startDate: formatDate(addDays(today, -12)),
    deadline: formatDate(addDays(today, 4)),
    currentValue: 520000,
    targetValue: 470000,
    progress: 38,
    riskFactors: ['Export regulations', 'Cold chain integrity'],
    productCategories: ['Beef'],
    lastUpdate: formatDate(addDays(today, -1)),
    negotiator: 'John Williams',
    documents: 9,
    messages: 25
  },
  {
    id: 'T2025-219',
    title: 'Gluten-Free Bakery Range',
    vendor: {
      id: 12,
      name: 'Finland Health Foods',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/fi.svg'
    },
    category: 'Bakery',
    status: 'active',
    priority: 'medium',
    startDate: formatDate(addDays(today, -7)),
    deadline: formatDate(addDays(today, 14)),
    currentValue: 240000,
    targetValue: 220000,
    progress: 55,
    riskFactors: ['Allergen control', 'Shelf-life optimization'],
    productCategories: ['Gluten-Free Products'],
    lastUpdate: formatDate(addDays(today, -2)),
    negotiator: 'Elizabeth Wong',
    documents: 6,
    messages: 17
  },
  {
    id: 'T2025-218',
    title: 'Premium Coffee Beans',
    vendor: {
      id: 13,
      name: 'Colombia Coffee Co.',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/co.svg'
    },
    category: 'Drinks',
    status: 'active',
    priority: 'high',
    startDate: formatDate(addDays(today, -9)),
    deadline: formatDate(addDays(today, 10)),
    currentValue: 380000,
    targetValue: 340000,
    progress: 68,
    riskFactors: ['Fair trade certification', 'Harvest quality'],
    productCategories: ['Coffee'],
    lastUpdate: formatDate(addDays(today, -1)),
    negotiator: 'Daniel Martinez',
    documents: 7,
    messages: 20
  },
  {
    id: 'T2025-217',
    title: 'Sustainable Fish Products',
    vendor: {
      id: 14,
      name: 'Norway Seafood AS',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/no.svg'
    },
    category: 'Seafood',
    status: 'active',
    priority: 'medium',
    startDate: formatDate(addDays(today, -8)),
    deadline: formatDate(addDays(today, 16)),
    currentValue: 450000,
    targetValue: 410000,
    progress: 60,
    riskFactors: ['Sustainability certification', 'Cold chain logistics'],
    productCategories: ['Fish', 'Seafood'],
    lastUpdate: formatDate(addDays(today, -2)),
    negotiator: 'Christine Lee',
    documents: 8,
    messages: 22
  },
  {
    id: 'T2025-216',
    title: 'Tropical Fruit Selection',
    vendor: {
      id: 15,
      name: 'Brazil Fruit Exports',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/br.svg'
    },
    category: 'Fruits & Vegetables',
    status: 'pending',
    priority: 'medium',
    startDate: formatDate(addDays(today, -10)),
    deadline: formatDate(addDays(today, 6)),
    currentValue: 265000,
    targetValue: 240000,
    progress: 32,
    riskFactors: ['Seasonal availability', 'Ripening control', 'Transport damage'],
    productCategories: ['Tropical Fruits'],
    lastUpdate: formatDate(addDays(today, -3)),
    negotiator: 'Alex Rivera',
    documents: 5,
    messages: 14
  },
  {
    id: 'T2025-215',
    title: 'Organic Baby Food Range',
    vendor: {
      id: 16,
      name: 'Denmark Organics',
      logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/dk.svg'
    },
    category: 'Baby Products',
    status: 'active',
    priority: 'high',
    startDate: formatDate(addDays(today, -6)),
    deadline: formatDate(addDays(today, 13)),
    currentValue: 310000,
    targetValue: 280000,
    progress: 72,
    riskFactors: ['Organic certification', 'Allergen controls', 'Packaging safety'],
    productCategories: ['Baby Food'],
    lastUpdate: formatDate(addDays(today, -1)),
    negotiator: 'Sarah Chen',
    documents: 8,
    messages: 19
  }
];

const ActiveNegotiations: React.FC = () => {
  const [negotiations, setNegotiations] = useState<Negotiation[]>(mockNegotiations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterDeadline, setFilterDeadline] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Negotiation>('deadline');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNegotiation, setSelectedNegotiation] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-600 border border-blue-200';
      case 'at_risk':
        return 'bg-red-100 text-red-600 border border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600 border border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-600 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600 border border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600 border border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-600 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };

  const calculateDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateSavings = (current: number, target: number) => {
    return ((current - target) / current) * 100;
  };

  const filteredNegotiations = negotiations
    .filter(neg => {
      const matchesSearch = 
        neg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        neg.vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || neg.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || neg.priority === filterPriority;
      
      // Add deadline filtering
      let matchesDeadline = true;
      const daysRemaining = calculateDaysRemaining(neg.deadline);
      
      if (filterDeadline === 'urgent') {
        matchesDeadline = daysRemaining <= 3;
      } else if (filterDeadline === 'this_week') {
        matchesDeadline = daysRemaining > 3 && daysRemaining <= 7;
      } else if (filterDeadline === 'next_week') {
        matchesDeadline = daysRemaining > 7 && daysRemaining <= 14;
      } else if (filterDeadline === 'later') {
        matchesDeadline = daysRemaining > 14;
      }
      
      return matchesSearch && matchesStatus && matchesPriority && matchesDeadline;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, negotiationId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedNegotiation(negotiationId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNegotiation(null);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterPriority('all');
    setFilterDeadline('all');
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Active Tenders</h1>
            <p className="text-gray-600">Track and manage ongoing Aldi supplier negotiations</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="px-4 py-2 bg-white rounded-lg text-gray-700 flex items-center hover:bg-gray-50 transition-colors border border-gray-300 shadow-sm">
              <FiFileText className="mr-2" /> Export Report
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded-lg text-white flex items-center hover:bg-blue-700 transition-colors shadow-sm">
              <FiCalendar className="mr-2" /> New Tender
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Tenders</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{negotiations.filter(n => n.status === 'active').length}</h3>
                <p className="text-sm text-blue-600 mt-1">+3 this month</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <FiClock className="text-xl text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">At Risk Tenders</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{negotiations.filter(n => n.status === 'at_risk').length}</h3>
                <p className="text-sm text-red-600 mt-1">Requires attention</p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <FiAlertTriangle className="text-xl text-red-600" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Potential Savings</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  ${(negotiations.reduce((acc, neg) => acc + (neg.currentValue - neg.targetValue), 0) / 1000).toFixed(1)}k
                </h3>
                <p className="text-sm text-green-600 mt-1">11.3% average reduction</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <FiTrendingUp className="text-xl text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Contract Value</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  ${(negotiations.reduce((acc, neg) => acc + neg.currentValue, 0) / 1000000).toFixed(1)}M
                </h3>
                <p className="text-sm text-purple-600 mt-1">Across {negotiations.length} tenders</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <FiPackage className="text-xl text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 text-gray-700 pl-3 pr-8 py-2 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="at_risk">At Risk</option>
                  <option value="pending">Pending</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 text-gray-700 pl-3 pr-8 py-2 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 text-gray-700 pl-3 pr-8 py-2 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterDeadline}
                  onChange={(e) => setFilterDeadline(e.target.value)}
                >
                  <option value="all">All Deadlines</option>
                  <option value="urgent">Urgent (≤ 3 days)</option>
                  <option value="this_week">This Week (4-7 days)</option>
                  <option value="next_week">Next Week (8-14 days)</option>
                  <option value="later">Later ({'>'}14 days)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>
              
              {(filterStatus !== 'all' || filterPriority !== 'all' || filterDeadline !== 'all' || searchTerm) && (
                <button 
                  onClick={resetFilters}
                  className="text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm"
                >
                  <FiX /> Reset Filters
                </button>
              )}
            </div>
            
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search tenders..."
                className="w-full bg-gray-50 text-gray-700 pl-10 pr-3 py-2 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Negotiations Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 rounded-t-xl">
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Tender Details</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Vendor & Category</th>
                <th className="px-4 py-3 text-center text-gray-700 font-medium">Status</th>
                <th className="px-4 py-3 text-center text-gray-700 font-medium">Priority</th>
                <th className="px-4 py-3 text-center text-gray-700 font-medium">
                  <div className="flex items-center justify-center">
                    <span>Deadline</span>
                    <button 
                      onClick={() => {
                        if (sortField === 'deadline') {
                          setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortField('deadline');
                          setSortDirection('asc');
                        }
                      }}
                      className="ml-1"
                    >
                      {sortField === 'deadline' && (
                        sortDirection === 'asc' ? <FiArrowUp className="text-blue-600" /> : <FiArrowDown className="text-blue-600" />
                      )}
                    </button>
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-gray-700 font-medium">Progress</th>
                <th className="px-4 py-3 text-center text-gray-700 font-medium">Value & Savings</th>
                <th className="px-4 py-3 text-center text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNegotiations.map(negotiation => {
                const daysRemaining = calculateDaysRemaining(negotiation.deadline);
                const savingsPercentage = calculateSavings(negotiation.currentValue, negotiation.targetValue);
                
                return (
                  <tr key={negotiation.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-start space-x-3">
                        <div>
                          <div className="text-gray-800 font-medium">{negotiation.title}</div>
                          <div className="text-gray-500 text-sm mt-1">
                            Lead: {negotiation.negotiator}
                          </div>
                          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FiFileText className="mr-1" /> {negotiation.documents} docs
                            </span>
                            <span className="flex items-center">
                              <FiMessageSquare className="mr-1" /> {negotiation.messages} messages
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden mr-3 bg-white flex items-center justify-center">
                          <img src={negotiation.vendor.logo} alt={negotiation.vendor.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <Link to={`/vendors/${negotiation.vendor.id}`} className="text-blue-600 hover:underline font-medium flex items-center">
                            {negotiation.vendor.name}
                            <FiExternalLink className="ml-1 text-xs" />
                          </Link>
                          <div className="text-gray-500 text-sm mt-1">
                            {negotiation.category}
                          </div>
                          <div className="text-gray-500 text-xs mt-1">
                            {negotiation.productCategories.join(', ')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className={`text-center px-3 py-1 rounded-full text-sm font-medium mx-auto w-24 ${getStatusColor(negotiation.status)}`}>
                        {negotiation.status === 'at_risk' ? 'At Risk' : 
                         negotiation.status.charAt(0).toUpperCase() + negotiation.status.slice(1)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className={`text-center px-3 py-1 rounded-full text-sm font-medium mx-auto w-24 ${getPriorityColor(negotiation.priority)}`}>
                        {negotiation.priority.charAt(0).toUpperCase() + negotiation.priority.slice(1)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-center">
                        <div className="text-gray-800 font-medium">{new Date(negotiation.deadline).toLocaleDateString()}</div>
                        <div className={`text-sm font-medium ${
                          daysRemaining <= 3 ? 'text-red-600' :
                          daysRemaining <= 7 ? 'text-orange-500' :
                          'text-green-600'
                        }`}>
                          {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-center">
                        <div className="text-gray-800 font-medium">{negotiation.progress}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              negotiation.progress < 25 ? 'bg-red-500' :
                              negotiation.progress < 50 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${negotiation.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          Last updated: {new Date(negotiation.lastUpdate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-center">
                        <div className="text-gray-800 font-medium">
                          ${(negotiation.currentValue / 1000).toFixed(0)}k
                        </div>
                        <div className="text-green-600 text-sm font-medium">
                          -${((negotiation.currentValue - negotiation.targetValue) / 1000).toFixed(1)}k ({savingsPercentage.toFixed(1)}%)
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        onClick={(e) => handleMenuClick(e as any, negotiation.id)}
                      >
                        <FiMoreVertical className="text-gray-600" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              
              {filteredNegotiations.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No tenders match your filters. Try adjusting your criteria or <button onClick={resetFilters} className="text-blue-600 hover:underline">reset filters</button>.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className="mt-2"
          PaperProps={{
            className: 'rounded-lg shadow-lg'
          }}
        >
          <MenuItem onClick={handleMenuClose} className="hover:bg-gray-50">
            <FiFileText className="mr-2 text-gray-600" /> View Details
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className="hover:bg-gray-50">
            <FiMessageSquare className="mr-2 text-gray-600" /> Send Message
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className="hover:bg-gray-50">
            <FiCalendar className="mr-2 text-gray-600" /> Schedule Meeting
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default ActiveNegotiations; 