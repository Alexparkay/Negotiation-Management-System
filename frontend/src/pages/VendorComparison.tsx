import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Checkbox,
  Rating,
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip as RechartsTooltip,
  TooltipProps
} from 'recharts';
import {
  FiDownload,
  FiShare2,
  FiFilter,
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiTrash2,
  FiArrowUp,
  FiArrowDown,
  FiSearch,
  FiX,
  FiCheck
} from 'react-icons/fi';
import { 
  MdOutlineCompare, 
  MdOutlineCheck, 
  MdOutlineClose,
  MdOutlineAttachMoney, 
  MdOutlineSchedule,
  MdOutlineVerified,
  MdOutlineLocalShipping,
  MdOutlineAssessment
} from 'react-icons/md';

interface Vendor {
  id: string;
  name: string;
  category: string;
  foundedYear: number;
  annualRevenue: number;
  employeeCount: number;
  keyProducts: string[];
  ratings: {
    qualityScore: number;
    reliabilityScore: number;
    pricingScore: number;
    deliveryScore: number;
    communicationScore: number;
  };
  performance: {
    defectRate: number;
    responseTime: string;
    costSavingsHistory: number;
  };
}

// Mock data for vendors
const mockVendors: Vendor[] = [
  {
    id: 'V001',
    name: 'Acme Industrial Supplies',
    category: 'Electronics',
    foundedYear: 1995,
    annualRevenue: 50000000,
    employeeCount: 250,
    keyProducts: ['Circuit Boards', 'Electronic Components', 'Power Supplies'],
    ratings: {
      qualityScore: 92,
      reliabilityScore: 88,
      pricingScore: 85,
      deliveryScore: 90,
      communicationScore: 87
    },
    performance: {
      defectRate: 0.5,
      responseTime: '2',
      costSavingsHistory: 12
    }
  },
  {
    id: 'V002',
    name: 'Global Electronics Inc.',
    category: 'Electronics',
    foundedYear: 2000,
    annualRevenue: 75000000,
    employeeCount: 350,
    keyProducts: ['Semiconductors', 'Microcontrollers', 'Sensors'],
    ratings: {
      qualityScore: 88,
      reliabilityScore: 90,
      pricingScore: 82,
      deliveryScore: 85,
      communicationScore: 89
    },
    performance: {
      defectRate: 0.7,
      responseTime: '3',
      costSavingsHistory: 10
    }
  },
  {
    id: 'V003',
    name: 'Precision Components Ltd',
    category: 'Electronics',
    foundedYear: 1998,
    annualRevenue: 60000000,
    employeeCount: 300,
    keyProducts: ['Connectors', 'Switches', 'Relays'],
    ratings: {
      qualityScore: 90,
      reliabilityScore: 85,
      pricingScore: 88,
      deliveryScore: 87,
      communicationScore: 86
    },
    performance: {
      defectRate: 0.6,
      responseTime: '2.5',
      costSavingsHistory: 11
    }
  }
];

interface CustomPayload {
  name: string;
  value: number;
  payload: {
    highIsGood?: boolean;
  };
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  
  const data = payload[0] as unknown as CustomPayload;
  const value = data.value;
  const isHighGood = data.payload?.highIsGood ?? false;

  return (
    <div className="glass-panel p-3 rounded-lg shadow-lg">
      <p className="text-white font-medium">{data.name}</p>
      <p className="text-white">
        Value: {value}
        {isHighGood && value > 80 && ' (Excellent)'}
        {isHighGood && value <= 80 && value > 60 && ' (Good)'}
        {isHighGood && value <= 60 && ' (Needs Improvement)'}
      </p>
    </div>
  );
};

const VendorComparison: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expandedSection, setExpandedSection] = useState<string>('');

  // Filter vendors based on category and search term
  const filteredVendors = vendors.filter(vendor => {
    const matchesCategory = filterCategory === 'all' || vendor.category === filterCategory;
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         vendor.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort vendors based on selected field
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (sortField.startsWith('ratings.')) {
      const field = sortField.split('.')[1] as keyof typeof a.ratings;
      return sortDirection === 'asc' 
        ? a.ratings[field] - b.ratings[field]
        : b.ratings[field] - a.ratings[field];
    } else if (sortField.startsWith('performance.')) {
      const field = sortField.split('.')[1] as keyof typeof a.performance;
      return sortDirection === 'asc'
        ? Number(a.performance[field]) - Number(b.performance[field])
        : Number(b.performance[field]) - Number(a.performance[field]);
    } else {
      const field = sortField as keyof Vendor;
      return sortDirection === 'asc'
        ? String(a[field]).localeCompare(String(b[field]))
        : String(b[field]).localeCompare(String(a[field]));
    }
  });

  const handleVendorToggle = (vendorId: string) => {
    setSelectedVendors(prev => {
      if (prev.includes(vendorId)) {
        return prev.filter(id => id !== vendorId);
      } else {
        if (prev.length >= 5) {
          alert("You can compare up to 5 vendors at once");
          return prev;
        }
        return [...prev, vendorId];
      }
    });
  };
  
  const getComparisonData = () => {
    return selectedVendors.map(vendorId => {
      const vendor = vendors.find(v => v.id === vendorId);
      if (!vendor) return null;
      
      return {
        id: vendor.id,
        name: vendor.name,
        category: vendor.category,
        ratings: vendor.ratings,
        performance: vendor.performance,
        keyProducts: vendor.keyProducts,
        foundedYear: vendor.foundedYear,
        annualRevenue: vendor.annualRevenue,
        employeeCount: vendor.employeeCount
      };
    }).filter(Boolean);
  };
  
  const getMetricComparisonData = () => {
    return [
      {
        name: "Product Quality",
        ...selectedVendors.reduce((acc, vendorId) => {
          const vendor = vendors.find(v => v.id === vendorId);
          if (vendor) acc[vendor.name] = vendor.ratings.qualityScore;
          return acc;
        }, {} as Record<string, number>)
      },
      {
        name: "Pricing",
        ...selectedVendors.reduce((acc, vendorId) => {
          const vendor = vendors.find(v => v.id === vendorId);
          if (vendor) acc[vendor.name] = vendor.ratings.pricingScore;
          return acc;
        }, {} as Record<string, number>)
      },
      {
        name: "Delivery",
        ...selectedVendors.reduce((acc, vendorId) => {
          const vendor = vendors.find(v => v.id === vendorId);
          if (vendor) acc[vendor.name] = vendor.ratings.deliveryScore;
          return acc;
        }, {} as Record<string, number>)
      },
      {
        name: "Service",
        ...selectedVendors.reduce((acc, vendorId) => {
          const vendor = vendors.find(v => v.id === vendorId);
          if (vendor) acc[vendor.name] = vendor.ratings.communicationScore;
          return acc;
        }, {} as Record<string, number>)
      },
      {
        name: "Technical",
        ...selectedVendors.reduce((acc, vendorId) => {
          const vendor = vendors.find(v => v.id === vendorId);
          if (vendor) acc[vendor.name] = vendor.ratings.reliabilityScore;
          return acc;
        }, {} as Record<string, number>)
      }
    ];
  };
  
  const getBarColors = () => {
    return [
      '#3B82F6', // Blue
      '#10B981', // Green
      '#F59E0B', // Orange
      '#EF4444', // Red
      '#8B5CF6'  // Purple
    ];
  };
  
  const selectedVendorsData = vendors.filter(vendor => selectedVendors.includes(vendor.id));
  
  const renderMetricValue = (value: number, isHigherBetter = true) => {
    const color = isHigherBetter
      ? value >= 4.5 ? 'text-green-500' :
        value >= 3.5 ? 'text-blue-500' :
        value >= 2.5 ? 'text-yellow-500' : 'text-red-500'
      : value <= 1.0 ? 'text-green-500' :
        value <= 2.0 ? 'text-blue-500' :
        value <= 3.0 ? 'text-yellow-500' : 'text-red-500';
    
    return <span className={`font-semibold ${color}`}>{value.toFixed(1)}</span>;
  };
  
  const metrics = [
    { key: 'ratings.qualityScore', label: 'Quality Score', highIsGood: true },
    { key: 'ratings.reliabilityScore', label: 'Reliability Score', highIsGood: true },
    { key: 'ratings.pricingScore', label: 'Price Competitiveness', highIsGood: true },
    { key: 'ratings.deliveryScore', label: 'Delivery Score', highIsGood: true },
    { key: 'ratings.communicationScore', label: 'Communication Score', highIsGood: true },
    { key: 'performance.defectRate', label: 'Defect Rate (%)', highIsGood: false }
  ];

  // Prepare chart data
  const radarChartData = [
    { subject: 'Quality', fullMark: 100 },
    { subject: 'Price', fullMark: 100 },
    { subject: 'Delivery', fullMark: 100 },
    { subject: 'Communication', fullMark: 100 },
    { subject: 'Reliability', fullMark: 100 },
  ].map(item => {
    const result: any = { ...item };
    selectedVendorsData.forEach(vendor => {
      switch(item.subject) {
        case 'Quality':
          result[vendor.name] = vendor.ratings.qualityScore;
          break;
        case 'Price':
          result[vendor.name] = vendor.ratings.pricingScore;
          break;
        case 'Delivery':
          result[vendor.name] = vendor.ratings.deliveryScore;
          break;
        case 'Communication':
          result[vendor.name] = vendor.ratings.communicationScore;
          break;
        case 'Reliability':
          result[vendor.name] = vendor.ratings.reliabilityScore;
          break;
      }
    });
    return result;
  });
  
  const barChartData = [
    { name: 'Defect Rate (%)', fullMark: 3 },
    { name: 'Response Time (hrs)', fullMark: 24 },
    { name: 'Cost Savings (%)', fullMark: 15 },
  ].map(item => {
    const result: any = { ...item };
    selectedVendorsData.forEach(vendor => {
      switch(item.name) {
        case 'Defect Rate (%)':
          result[vendor.name] = vendor.performance.defectRate;
          break;
        case 'Response Time (hrs)':
          result[vendor.name] = parseInt(vendor.performance.responseTime);
          break;
        case 'Cost Savings (%)':
          result[vendor.name] = vendor.performance.costSavingsHistory;
          break;
      }
    });
    return result;
  });

  // Get vendors selected for comparison
  const vendorsToCompare = vendors.filter(vendor => selectedVendors.includes(vendor.id));
  const comparisonBarData = getMetricComparisonData();

  const prepareRadarData = (vendors: Vendor[]) => {
    return vendors.map(vendor => ({
      name: vendor.name,
      quality: vendor.ratings.qualityScore,
      reliability: vendor.ratings.reliabilityScore,
      price: vendor.ratings.pricingScore,
      delivery: vendor.ratings.deliveryScore,
      communication: vendor.ratings.communicationScore
    }));
  };

  const calculateRiskLevel = (defectRate: number) => {
    if (defectRate < 0.5) return { level: 'Low Risk', color: 'bg-green-500/20 text-green-400' };
    if (defectRate < 1.0) return { level: 'Medium Risk', color: 'bg-yellow-500/20 text-yellow-400' };
    return { level: 'High Risk', color: 'bg-red-500/20 text-red-400' };
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-semibold text-white">Vendor Comparison</h1>
        
        <button className="mt-4 md:mt-0 px-4 py-2 bg-accent-primary rounded-lg text-white flex items-center hover:bg-accent-primary/80 transition-colors">
          <FiDownload className="mr-2" /> Export Comparison
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="glass-panel rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <FiFilter className="text-accent-primary mr-2" />
            <h3 className="text-lg text-white">Filter Vendors</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <select
                className="select select-bordered w-full max-w-xs"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {Array.from(new Set(vendors.map(v => v.category))).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search vendors..."
                className="bg-background-accent text-white pl-10 pr-3 py-2 rounded-lg border border-white/10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-text-muted" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Selected Vendors for Comparison */}
      {selectedVendors.length > 0 && (
        <div className="glass-panel rounded-xl p-6 mb-8">
          <h3 className="text-xl text-white mb-4">Selected Vendors for Comparison</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {vendorsToCompare.map((vendor, index) => (
              <div key={vendor.id} className="flex justify-between items-center p-4 rounded-lg bg-background-accent border border-white/10">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3" 
                    style={{ backgroundColor: getBarColors()[index % getBarColors().length] }}
                  ></div>
                  <div>
                    <div className="text-white font-medium">{vendor.name}</div>
                    <div className="text-text-secondary text-sm">{vendor.category}</div>
                  </div>
                </div>
                <button 
                  onClick={() => handleVendorToggle(vendor.id)}
                  className="p-1 rounded-full bg-background-secondary hover:bg-red-900/30 text-red-400 transition-colors"
                >
                  <FiX />
                </button>
              </div>
            ))}
            
            {Array.from({ length: 3 - selectedVendors.length }).map((_, i) => (
              <div key={`empty-${i}`} className="flex justify-center items-center p-4 rounded-lg bg-background-accent border border-dashed border-white/10 text-text-muted">
                Select a vendor to compare
              </div>
            ))}
          </div>
          
          {/* Comparison Charts */}
          {selectedVendors.length > 1 && (
            <div className="space-y-8">
              {/* Bar Chart Comparison */}
              <div className="h-80 w-full">
                <h4 className="text-lg text-white mb-4">Key Metrics Comparison</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparisonBarData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" tick={{ fill: '#B3B3B3' }} />
                    <YAxis tick={{ fill: '#B3B3B3' }} />
                    <RechartsTooltip
                      content={CustomTooltip}
                    />
                    <Legend wrapperStyle={{ color: '#B3B3B3' }} />
                    {vendorsToCompare.map((vendor, index) => (
                      <Bar 
                        key={vendor.id} 
                        dataKey={vendor.name} 
                        fill={getBarColors()[index % getBarColors().length]} 
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Individual Radar Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendorsToCompare.map((vendor, index) => (
                  <div key={vendor.id} className="bg-background-accent p-4 rounded-xl">
                    <h4 className="text-white text-center mb-2">{vendor.name}</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={prepareRadarData([vendor])}>
                          <PolarGrid stroke="rgba(255,255,255,0.1)" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#B3B3B3', fontSize: 10 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar
                            name={vendor.name}
                            dataKey="value"
                            stroke={getBarColors()[index % getBarColors().length]}
                            fill={getBarColors()[index % getBarColors().length]}
                            fillOpacity={0.6}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Vendors Table */}
      <div className="glass-panel rounded-xl p-6 overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left text-text-secondary font-medium">
                <div className="flex items-center">
                  <span>Vendor</span>
                  <button 
                    onClick={() => setSortField('name')}
                    className="ml-1"
                  >
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <FiArrowUp className="text-accent-primary" /> : <FiArrowDown className="text-accent-primary" />
                    )}
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-text-secondary font-medium">
                <div className="flex items-center">
                  <span>Category</span>
                  <button 
                    onClick={() => setSortField('category')}
                    className="ml-1"
                  >
                    {sortField === 'category' && (
                      sortDirection === 'asc' ? <FiArrowUp className="text-accent-primary" /> : <FiArrowDown className="text-accent-primary" />
                    )}
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-center text-text-secondary font-medium">
                <div className="flex items-center justify-center">
                  <span>Quality</span>
                  <button 
                    onClick={() => setSortField('ratings.qualityScore')}
                    className="ml-1"
                  >
                    {sortField === 'ratings.qualityScore' && (
                      sortDirection === 'asc' ? <FiArrowUp className="text-accent-primary" /> : <FiArrowDown className="text-accent-primary" />
                    )}
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-center text-text-secondary font-medium">
                <div className="flex items-center justify-center">
                  <span>Reliability</span>
                  <button 
                    onClick={() => setSortField('ratings.reliabilityScore')}
                    className="ml-1"
                  >
                    {sortField === 'ratings.reliabilityScore' && (
                      sortDirection === 'asc' ? <FiArrowUp className="text-accent-primary" /> : <FiArrowDown className="text-accent-primary" />
                    )}
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-center text-text-secondary font-medium">
                <div className="flex items-center justify-center">
                  <span>Price</span>
                  <button 
                    onClick={() => setSortField('ratings.pricingScore')}
                    className="ml-1"
                  >
                    {sortField === 'ratings.pricingScore' && (
                      sortDirection === 'asc' ? <FiArrowUp className="text-accent-primary" /> : <FiArrowDown className="text-accent-primary" />
                    )}
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-center text-text-secondary font-medium">Risk</th>
              <th className="px-4 py-3 text-center text-text-secondary font-medium">Compare</th>
            </tr>
          </thead>
          <tbody>
            {sortedVendors.map(vendor => (
              <tr key={vendor.id} className="border-b border-white/5 hover:bg-background-accent transition-colors">
                <td className="px-4 py-4">
                  <div className="text-white font-medium">{vendor.name}</div>
                  <div className="text-text-secondary text-sm">{vendor.id}</div>
                </td>
                <td className="px-4 py-4 text-white">{vendor.category}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-col items-center">
                    <div className="text-white font-medium">{vendor.ratings.qualityScore}</div>
                    <div className="w-full bg-background-secondary rounded-full h-2 mt-1">
                      <div 
                        className="bg-accent-primary h-2 rounded-full" 
                        style={{ width: `${vendor.ratings.qualityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col items-center">
                    <div className="text-white font-medium">{vendor.ratings.reliabilityScore}</div>
                    <div className="w-full bg-background-secondary rounded-full h-2 mt-1">
                      <div 
                        className="bg-accent-secondary h-2 rounded-full" 
                        style={{ width: `${vendor.ratings.reliabilityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col items-center">
                    <div className="text-white font-medium">{vendor.ratings.pricingScore}</div>
                    <div className="w-full bg-background-secondary rounded-full h-2 mt-1">
                      <div 
                        className="bg-accent-warning h-2 rounded-full" 
                        style={{ width: `${vendor.ratings.pricingScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className={`text-center px-2 py-1 rounded-lg text-sm mx-auto w-24
                    ${calculateRiskLevel(vendor.performance.defectRate).color}`}
                  >
                    {calculateRiskLevel(vendor.performance.defectRate).level}
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <button 
                    onClick={() => handleVendorToggle(vendor.id)}
                    className={`p-2 rounded-lg transition-colors
                      ${selectedVendors.includes(vendor.id) 
                        ? 'bg-accent-primary/20 text-accent-primary' 
                        : 'bg-background-accent text-text-secondary hover:bg-background-accent/70'}`}
                    disabled={selectedVendors.length >= 3 && !selectedVendors.includes(vendor.id)}
                  >
                    {selectedVendors.includes(vendor.id) ? <FiCheck /> : <FiPlus />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass-panel p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-4">Vendor Risk Assessment</h3>
        <div className="space-y-4">
          {selectedVendors.map((vendorId) => {
            const vendor = vendors.find(v => v.id === vendorId);
            if (!vendor) return null;
            
            const risk = calculateRiskLevel(vendor.performance.defectRate);
            
            return (
              <div key={vendorId} className="flex items-center justify-between">
                <span className="text-white">{vendor.name}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${risk.color}`}>
                  {risk.level}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VendorComparison; 