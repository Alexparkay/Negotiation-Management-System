import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  FiPackage
} from 'react-icons/fi';

interface Negotiation {
  id: string;
  title: string;
  vendor: string;
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

const mockNegotiations: Negotiation[] = [
  {
    id: 'NEG001',
    title: 'Raw Materials Supply Agreement - Q2 2024',
    vendor: 'Global Steel Solutions',
    category: 'Raw Materials',
    status: 'active',
    priority: 'high',
    startDate: '2024-01-15',
    deadline: '2024-03-30',
    currentValue: 1250000,
    targetValue: 1100000,
    progress: 65,
    riskFactors: ['Market volatility', 'Supply chain constraints', 'Geopolitical factors'],
    productCategories: ['Steel', 'Aluminum', 'Copper'],
    lastUpdate: '2024-02-20',
    negotiator: 'Sarah Chen',
    documents: 8,
    messages: 24
  },
  {
    id: 'NEG002',
    title: 'Semiconductor Components - Annual Contract',
    vendor: 'TechCore Electronics',
    category: 'Electronics',
    status: 'at_risk',
    priority: 'high',
    startDate: '2024-02-01',
    deadline: '2024-04-15',
    currentValue: 2800000,
    targetValue: 2400000,
    progress: 40,
    riskFactors: ['Global chip shortage', 'Competitor pressure', 'Price volatility'],
    productCategories: ['Microprocessors', 'Memory Units', 'Control Systems'],
    lastUpdate: '2024-02-19',
    negotiator: 'Michael Rodriguez',
    documents: 12,
    messages: 45
  },
  {
    id: 'NEG003',
    title: 'Industrial Equipment Maintenance Services',
    vendor: 'MaintenancePro Solutions',
    category: 'Services',
    status: 'pending',
    priority: 'medium',
    startDate: '2024-02-15',
    deadline: '2024-05-01',
    currentValue: 750000,
    targetValue: 680000,
    progress: 25,
    riskFactors: ['Service level requirements', 'Technical specifications'],
    productCategories: ['Preventive Maintenance', 'Emergency Services', 'Parts Replacement'],
    lastUpdate: '2024-02-18',
    negotiator: 'Emma Thompson',
    documents: 6,
    messages: 15
  },
  {
    id: 'NEG004',
    title: 'Logistics and Transportation Contract',
    vendor: 'FastTrack Logistics',
    category: 'Logistics',
    status: 'active',
    priority: 'medium',
    startDate: '2024-02-10',
    deadline: '2024-04-20',
    currentValue: 980000,
    targetValue: 890000,
    progress: 55,
    riskFactors: ['Fuel cost fluctuations', 'Route optimization'],
    productCategories: ['Ground Transport', 'Warehousing', 'Last-mile Delivery'],
    lastUpdate: '2024-02-21',
    negotiator: 'David Wilson',
    documents: 9,
    messages: 28
  },
  {
    id: 'NEG005',
    title: 'Quality Control Equipment Supply',
    vendor: 'PrecisionTech Industries',
    category: 'Equipment',
    status: 'at_risk',
    priority: 'high',
    startDate: '2024-01-20',
    deadline: '2024-03-25',
    currentValue: 1850000,
    targetValue: 1650000,
    progress: 35,
    riskFactors: ['Technical compliance', 'Delivery timeline', 'Integration requirements'],
    productCategories: ['Testing Equipment', 'Measurement Tools', 'Calibration Systems'],
    lastUpdate: '2024-02-17',
    negotiator: 'Jennifer Park',
    documents: 15,
    messages: 52
  }
];

const ActiveNegotiations: React.FC = () => {
  const [negotiations, setNegotiations] = useState<Negotiation[]>(mockNegotiations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Negotiation>('deadline');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNegotiation, setSelectedNegotiation] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-500/20 text-blue-400';
      case 'at_risk':
        return 'bg-red-500/20 text-red-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'low':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
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
        neg.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || neg.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || neg.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
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

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-semibold text-white mb-2">Active Negotiations</h1>
          <p className="text-text-secondary">Track and manage ongoing supplier negotiations</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="px-4 py-2 bg-background-accent rounded-lg text-white flex items-center hover:bg-background-accent/80 transition-colors">
            <FiFileText className="mr-2" /> Export Report
          </button>
          <button className="px-4 py-2 bg-accent-primary rounded-lg text-white flex items-center hover:bg-accent-primary/80 transition-colors">
            <FiCalendar className="mr-2" /> New Negotiation
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary">Active Negotiations</p>
              <h3 className="text-3xl font-semibold text-white">{negotiations.filter(n => n.status === 'active').length}</h3>
              <p className="text-sm text-accent-primary mt-1">+2 this month</p>
            </div>
            <div className="p-3 rounded-full bg-blue-500/20">
              <FiClock className="text-2xl text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary">At Risk Negotiations</p>
              <h3 className="text-3xl font-semibold text-white">{negotiations.filter(n => n.status === 'at_risk').length}</h3>
              <p className="text-sm text-red-400 mt-1">Requires attention</p>
            </div>
            <div className="p-3 rounded-full bg-red-500/20">
              <FiAlertTriangle className="text-2xl text-red-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary">Potential Savings</p>
              <h3 className="text-3xl font-semibold text-white">
                ${(negotiations.reduce((acc, neg) => acc + (neg.currentValue - neg.targetValue), 0) / 1000).toFixed(1)}k
              </h3>
              <p className="text-sm text-green-400 mt-1">12.5% average reduction</p>
            </div>
            <div className="p-3 rounded-full bg-green-500/20">
              <FiTrendingUp className="text-2xl text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary">Total Contract Value</p>
              <h3 className="text-3xl font-semibold text-white">
                ${(negotiations.reduce((acc, neg) => acc + neg.currentValue, 0) / 1000000).toFixed(1)}M
              </h3>
              <p className="text-sm text-blue-400 mt-1">Across {negotiations.length} contracts</p>
            </div>
            <div className="p-3 rounded-full bg-purple-500/20">
              <FiPackage className="text-2xl text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="glass-panel p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <select
                className="bg-background-accent text-white pl-3 pr-8 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="at_risk">At Risk</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="relative">
              <select
                className="bg-background-accent text-white pl-3 pr-8 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search negotiations..."
              className="w-full bg-background-accent text-white pl-10 pr-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-text-muted" />
          </div>
        </div>
      </div>

      {/* Negotiations Table */}
      <div className="glass-panel rounded-xl p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left text-text-secondary font-medium">Negotiation Details</th>
              <th className="px-4 py-3 text-left text-text-secondary font-medium">Category</th>
              <th className="px-4 py-3 text-center text-text-secondary font-medium">Status</th>
              <th className="px-4 py-3 text-center text-text-secondary font-medium">Priority</th>
              <th className="px-4 py-3 text-center text-text-secondary font-medium">
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
                      sortDirection === 'asc' ? <FiArrowUp className="text-accent-primary" /> : <FiArrowDown className="text-accent-primary" />
                    )}
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-center text-text-secondary font-medium">Progress</th>
              <th className="px-4 py-3 text-center text-text-secondary font-medium">Value & Savings</th>
              <th className="px-4 py-3 text-center text-text-secondary font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNegotiations.map(negotiation => {
              const daysRemaining = calculateDaysRemaining(negotiation.deadline);
              const savingsPercentage = calculateSavings(negotiation.currentValue, negotiation.targetValue);
              
              return (
                <tr key={negotiation.id} className="border-b border-white/5 hover:bg-background-accent transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-start space-x-3">
                      <div>
                        <div className="text-white font-medium">{negotiation.title}</div>
                        <div className="text-text-secondary text-sm mt-1">
                          {negotiation.vendor} · Lead: {negotiation.negotiator}
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-sm text-text-muted">
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
                    <div className="text-white">{negotiation.category}</div>
                    <div className="text-text-secondary text-sm mt-1">
                      {negotiation.productCategories.join(', ')}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className={`text-center px-3 py-1 rounded-full text-sm mx-auto w-24 ${getStatusColor(negotiation.status)}`}>
                      {negotiation.status.replace('_', ' ').charAt(0).toUpperCase() + negotiation.status.slice(1)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className={`text-center px-3 py-1 rounded-full text-sm mx-auto w-24 ${getPriorityColor(negotiation.priority)}`}>
                      {negotiation.priority.charAt(0).toUpperCase() + negotiation.priority.slice(1)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-center">
                      <div className="text-white">{new Date(negotiation.deadline).toLocaleDateString()}</div>
                      <div className={`text-sm ${
                        daysRemaining < 7 ? 'text-red-400' :
                        daysRemaining < 14 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {daysRemaining} days left
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col items-center">
                      <div className="text-white font-medium">{negotiation.progress}%</div>
                      <div className="w-full bg-background-secondary rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            negotiation.progress < 25 ? 'bg-red-500' :
                            negotiation.progress < 50 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${negotiation.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-text-secondary text-xs mt-1">
                        Last updated: {new Date(negotiation.lastUpdate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-center">
                      <div className="text-white font-medium">
                        ${(negotiation.currentValue / 1000).toFixed(0)}k
                      </div>
                      <div className="text-green-400 text-sm">
                        -${((negotiation.currentValue - negotiation.targetValue) / 1000).toFixed(1)}k ({savingsPercentage.toFixed(1)}%)
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <IconButton 
                      className="text-text-secondary hover:text-white transition-colors"
                      onClick={(e) => handleMenuClick(e, negotiation.id)}
                    >
                      <FiMoreVertical />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        className="mt-2"
        PaperProps={{
          className: 'bg-background-accent border border-white/10 rounded-lg shadow-xl'
        }}
      >
        <MenuItem onClick={handleMenuClose} className="text-white hover:bg-white/5">
          <FiFileText className="mr-2" /> View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose} className="text-white hover:bg-white/5">
          <FiMessageSquare className="mr-2" /> Send Message
        </MenuItem>
        <MenuItem onClick={handleMenuClose} className="text-white hover:bg-white/5">
          <FiCalendar className="mr-2" /> Schedule Meeting
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ActiveNegotiations; 