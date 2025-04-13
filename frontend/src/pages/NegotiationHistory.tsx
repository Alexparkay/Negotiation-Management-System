import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineHistory,
  MdOutlineSearch,
  MdOutlineFilterList,
  MdOutlineCalendarToday,
  MdOutlineSort,
  MdOutlineAttachMoney,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
  MdOutlineInsights,
  MdOutlineReceipt,
  MdOutlineCheckCircle,
  MdOutlineAccessTime,
  MdOutlineCancel,
  MdOutlineMessage,
  MdOutlineDescription,
  MdOutlineInventory,
  MdOutlineArrowForward,
  MdOutlineFileDownload,
  MdOutlineInfo
} from 'react-icons/md';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { format, parseISO } from 'date-fns';
import ChatPopup from '../components/ChatPopup';

interface Negotiation {
  id: string;
  title: string;
  vendor: string;
  vendorId: string;
  status: 'completed' | 'rejected' | 'expired';
  category: string;
  startDate: string;
  endDate: string;
  initialPrice: number;
  finalPrice: number;
  savings: number;
  savingsPercent: number;
  items: number;
  messages: number;
  documents: number;
  notes: string;
}

const NegotiationHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date_desc');
  const [selectedNegotiation, setSelectedNegotiation] = useState<string | null>(null);
  
  // Mock negotiation history data
  const negotiations: Negotiation[] = [
    {
      id: 'neg-001',
      title: 'Q2 Electronics Components Order',
      vendor: 'TechSupply Inc.',
      vendorId: 'vendor-001',
      status: 'completed',
      category: 'Electronics',
      startDate: '2024-04-02T10:00:00Z',
      endDate: '2024-04-15T16:30:00Z',
      initialPrice: 145000,
      finalPrice: 128500,
      savings: 16500,
      savingsPercent: 11.4,
      items: 28,
      messages: 42,
      documents: 5,
      notes: 'Successfully negotiated bulk discount and favorable payment terms. Vendor agreed to expedited shipping.'
    },
    {
      id: 'neg-002',
      title: 'Manufacturing Equipment Lease',
      vendor: 'Industrial Machines Co.',
      vendorId: 'vendor-008',
      status: 'completed',
      category: 'Machinery',
      startDate: '2024-03-15T09:15:00Z',
      endDate: '2024-03-28T14:45:00Z',
      initialPrice: 875000,
      finalPrice: 792000,
      savings: 83000,
      savingsPercent: 9.5,
      items: 5,
      messages: 36,
      documents: 12,
      notes: 'Multi-year lease agreement with annual maintenance included. Option to purchase at end of term.'
    },
    {
      id: 'neg-003',
      title: 'Raw Materials Supply (Steel)',
      vendor: 'Global Materials Corp',
      vendorId: 'vendor-015',
      status: 'rejected',
      category: 'Raw Materials',
      startDate: '2024-03-10T08:00:00Z',
      endDate: '2024-03-18T11:30:00Z',
      initialPrice: 245000,
      finalPrice: 228000,
      savings: 17000,
      savingsPercent: 6.9,
      items: 6,
      messages: 24,
      documents: 3,
      notes: 'Could not reach agreement on delivery schedule. Vendor unwilling to meet our timeline requirements.'
    },
    {
      id: 'neg-004',
      title: 'Office Furniture Package',
      vendor: 'Corporate Interiors Ltd.',
      vendorId: 'vendor-023',
      status: 'completed',
      category: 'Office Supplies',
      startDate: '2024-02-28T13:20:00Z',
      endDate: '2024-03-08T17:15:00Z',
      initialPrice: 68500,
      finalPrice: 58200,
      savings: 10300,
      savingsPercent: 15.0,
      items: 85,
      messages: 28,
      documents: 4,
      notes: 'Excellent deal with free installation and 5-year warranty. Vendor offered additional accessories at no cost.'
    },
    {
      id: 'neg-005',
      title: 'Logistics Services Contract',
      vendor: 'FastTrack Shipping',
      vendorId: 'vendor-034',
      status: 'expired',
      category: 'Logistics',
      startDate: '2024-02-15T10:30:00Z',
      endDate: '2024-03-01T10:30:00Z',
      initialPrice: 125000,
      finalPrice: 125000,
      savings: 0,
      savingsPercent: 0,
      items: 12,
      messages: 18,
      documents: 6,
      notes: 'Negotiation time limit expired before reaching agreement. Vendor was slow to respond to our counter-offers.'
    },
    {
      id: 'neg-006',
      title: 'Product Packaging Materials',
      vendor: 'BoxCraft Supplies',
      vendorId: 'vendor-041',
      status: 'completed',
      category: 'Packaging',
      startDate: '2024-02-05T09:00:00Z',
      endDate: '2024-02-12T15:45:00Z',
      initialPrice: 42500,
      finalPrice: 36800,
      savings: 5700,
      savingsPercent: 13.4,
      items: 35,
      messages: 22,
      documents: 3,
      notes: 'Negotiated better terms for eco-friendly packaging materials. Volume discount applied to future orders.'
    },
    {
      id: 'neg-007',
      title: 'Circuit Board Components',
      vendor: 'ElectroTech Systems',
      vendorId: 'vendor-003',
      status: 'rejected',
      category: 'Electronics',
      startDate: '2024-01-20T11:15:00Z',
      endDate: '2024-01-25T16:20:00Z',
      initialPrice: 96000,
      finalPrice: 92500,
      savings: 3500,
      savingsPercent: 3.6,
      items: 64,
      messages: 15,
      documents: 2,
      notes: 'Quality standards could not be guaranteed by vendor. Decided to pursue alternative suppliers.'
    },
    {
      id: 'neg-008',
      title: 'Software Licensing Agreement',
      vendor: 'Enterprise Solutions Inc.',
      vendorId: 'vendor-056',
      status: 'completed',
      category: 'Software',
      startDate: '2024-01-10T13:00:00Z',
      endDate: '2024-01-30T17:30:00Z',
      initialPrice: 185000,
      finalPrice: 148000,
      savings: 37000,
      savingsPercent: 20.0,
      items: 8,
      messages: 45,
      documents: 9,
      notes: 'Excellent savings on enterprise license. Negotiated additional user seats and premium support.'
    },
  ];

  // Filter negotiations
  const filteredNegotiations = negotiations.filter(negotiation => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      negotiation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      negotiation.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      negotiation.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = filterStatus === 'all' || negotiation.status === filterStatus;
    
    // Filter by category
    const matchesCategory = filterCategory === 'all' || negotiation.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Sort negotiations
  const sortedNegotiations = [...filteredNegotiations].sort((a, b) => {
    switch (sortBy) {
      case 'date_desc':
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      case 'date_asc':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      case 'savings_desc':
        return b.savings - a.savings;
      case 'savings_percent':
        return b.savingsPercent - a.savingsPercent;
      case 'initial_price':
        return b.initialPrice - a.initialPrice;
      default:
        return 0;
    }
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(negotiations.map(n => n.category))];
  
  // Get selected negotiation details
  const selectedNegotiationData = selectedNegotiation ? 
    negotiations.find(n => n.id === selectedNegotiation) : null;
  
  // Statistics data
  const totalNegotiations = negotiations.length;
  const completedNegotiations = negotiations.filter(n => n.status === 'completed').length;
  const totalSavings = negotiations.reduce((sum, n) => sum + n.savings, 0);
  const averageSavingsPercent = negotiations
    .filter(n => n.status === 'completed')
    .reduce((sum, n) => sum + n.savingsPercent, 0) / completedNegotiations;
  
  // Monthly savings data for chart
  const monthlySavingsData = [
    { month: 'Jan', savings: 40500 },
    { month: 'Feb', savings: 16000 },
    { month: 'Mar', savings: 100000 },
    { month: 'Apr', savings: 16500 },
    { month: 'May', savings: 0 },
    { month: 'Jun', savings: 0 },
    { month: 'Jul', savings: 0 },
    { month: 'Aug', savings: 0 },
    { month: 'Sep', savings: 0 },
    { month: 'Oct', savings: 0 },
    { month: 'Nov', savings: 0 },
    { month: 'Dec', savings: 0 },
  ];
  
  // Categories performance data
  const categorySavingsData = [
    { name: 'Electronics', savings: 20000 },
    { name: 'Machinery', savings: 83000 },
    { name: 'Raw Materials', savings: 17000 },
    { name: 'Office Supplies', savings: 10300 },
    { name: 'Logistics', savings: 0 },
    { name: 'Packaging', savings: 5700 },
    { name: 'Software', savings: 37000 },
  ];
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString: string): string => {
    return format(parseISO(dateString), 'MMM d, yyyy');
  };
  
  // Get status badge style
  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'badge-success';
      case 'rejected':
        return 'badge-error';
      case 'expired':
        return 'badge-warning';
      default:
        return 'badge-ghost';
    }
  };
  
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Negotiation History</h1>
          <p className="text-text-secondary mt-1">View and analyze past negotiations and outcomes</p>
        </div>
        <div className="flex gap-2">
          <Link to="/active-negotiations" className="btn btn-outline btn-sm flex items-center gap-2">
            <MdOutlineAccessTime className="text-lg" /> Active Negotiations
          </Link>
          <Link to="/negotiation-calendar" className="btn btn-primary btn-sm flex items-center gap-2">
            <MdOutlineCalendarToday className="text-lg" /> Calendar
          </Link>
        </div>
      </div>
      
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="glass-panel p-4 rounded-xl flex items-center">
          <div className="w-12 h-12 rounded-full bg-background-accent flex items-center justify-center text-accent-primary text-xl mr-4">
            <MdOutlineHistory />
          </div>
          <div>
            <p className="text-text-muted text-sm">Total Negotiations</p>
            <p className="text-2xl font-semibold text-text-primary">{totalNegotiations}</p>
          </div>
        </div>
        
        <div className="glass-panel p-4 rounded-xl flex items-center">
          <div className="w-12 h-12 rounded-full bg-background-accent flex items-center justify-center text-accent-secondary text-xl mr-4">
            <MdOutlineCheckCircle />
          </div>
          <div>
            <p className="text-text-muted text-sm">Completed</p>
            <p className="text-2xl font-semibold text-text-primary">{completedNegotiations}</p>
            <p className="text-text-secondary text-xs">
              {Math.round((completedNegotiations / totalNegotiations) * 100)}% success rate
            </p>
          </div>
        </div>
        
        <div className="glass-panel p-4 rounded-xl flex items-center">
          <div className="w-12 h-12 rounded-full bg-background-accent flex items-center justify-center text-accent-warning text-xl mr-4">
            <MdOutlineAttachMoney />
          </div>
          <div>
            <p className="text-text-muted text-sm">Total Savings</p>
            <p className="text-2xl font-semibold text-text-primary">{formatCurrency(totalSavings)}</p>
          </div>
        </div>
        
        <div className="glass-panel p-4 rounded-xl flex items-center">
          <div className="w-12 h-12 rounded-full bg-background-accent flex items-center justify-center text-accent-warning text-xl mr-4">
            <MdOutlineTrendingDown />
          </div>
          <div>
            <p className="text-text-muted text-sm">Avg. Savings</p>
            <p className="text-2xl font-semibold text-text-primary">{averageSavingsPercent.toFixed(1)}%</p>
          </div>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="glass-panel p-4 rounded-xl mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdOutlineSearch className="text-text-muted text-lg" />
            </div>
            <input
              type="text"
              className="input input-bordered w-full pl-10"
              placeholder="Search negotiations..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline btn-sm flex items-center gap-2">
              <MdOutlineFilterList className="text-lg" /> Status: {filterStatus === 'all' ? 'All' : filterStatus}
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow glass-panel rounded-box w-52">
              <li><button onClick={() => setFilterStatus('all')}>All</button></li>
              <li><button onClick={() => setFilterStatus('completed')}>Completed</button></li>
              <li><button onClick={() => setFilterStatus('rejected')}>Rejected</button></li>
              <li><button onClick={() => setFilterStatus('expired')}>Expired</button></li>
            </ul>
          </div>
          
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline btn-sm flex items-center gap-2">
              <MdOutlineFilterList className="text-lg" /> Category: {filterCategory === 'all' ? 'All' : filterCategory}
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow glass-panel rounded-box w-52">
              {categories.map((category, index) => (
                <li key={index}>
                  <button onClick={() => setFilterCategory(category)}>
                    {category === 'all' ? 'All' : category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline btn-sm flex items-center gap-2">
              <MdOutlineSort className="text-lg" /> Sort by
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow glass-panel rounded-box w-52">
              <li><button onClick={() => setSortBy('date_desc')}>Date (newest)</button></li>
              <li><button onClick={() => setSortBy('date_asc')}>Date (oldest)</button></li>
              <li><button onClick={() => setSortBy('savings_desc')}>Savings (highest)</button></li>
              <li><button onClick={() => setSortBy('savings_percent')}>Savings % (highest)</button></li>
              <li><button onClick={() => setSortBy('initial_price')}>Initial Price (highest)</button></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Monthly Savings</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlySavingsData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" tick={{ fill: '#B3B3B3' }} />
                <YAxis tick={{ fill: '#B3B3B3' }} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), 'Savings']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px' 
                  }}
                />
                <Legend wrapperStyle={{ color: '#B3B3B3' }} />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                  name="Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Category Savings</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categorySavingsData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" tick={{ fill: '#B3B3B3' }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fill: '#B3B3B3' }} 
                  width={100}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), 'Savings']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px' 
                  }}
                />
                <Bar 
                  dataKey="savings" 
                  fill="#3B82F6" 
                  radius={[0, 4, 4, 0]}
                  name="Savings"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Negotiations List */}
      <div className="glass-panel rounded-xl mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-background-accent">
              <tr>
                <th className="text-text-primary">Negotiation</th>
                <th className="text-text-primary">Vendor</th>
                <th className="text-text-primary">Date</th>
                <th className="text-text-primary">Status</th>
                <th className="text-text-primary">Initial Price</th>
                <th className="text-text-primary">Final Price</th>
                <th className="text-text-primary">Savings</th>
                <th className="text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedNegotiations.map(negotiation => (
                <tr 
                  key={negotiation.id}
                  className={`hover:bg-background-accent/30 transition-colors cursor-pointer ${
                    selectedNegotiation === negotiation.id ? 'bg-background-accent/40' : ''
                  }`}
                  onClick={() => setSelectedNegotiation(negotiation.id)}
                >
                  <td>
                    <div className="font-medium text-text-primary">{negotiation.title}</div>
                    <div className="text-text-muted text-xs">{negotiation.category}</div>
                  </td>
                  <td>
                    <Link 
                      to={`/vendor-directory/${negotiation.vendorId}`} 
                      className="font-medium text-accent-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {negotiation.vendor}
                    </Link>
                  </td>
                  <td>
                    <div className="text-text-secondary">{formatDate(negotiation.endDate)}</div>
                    <div className="text-text-muted text-xs">{format(parseISO(negotiation.endDate), 'h:mm a')}</div>
                  </td>
                  <td>
                    <div className={`badge ${getStatusBadgeClass(negotiation.status)}`}>
                      {negotiation.status}
                    </div>
                  </td>
                  <td className="text-text-secondary">{formatCurrency(negotiation.initialPrice)}</td>
                  <td className="text-text-secondary">{formatCurrency(negotiation.finalPrice)}</td>
                  <td>
                    <div className={`font-semibold ${
                      negotiation.savings > 0 ? 'text-accent-secondary' : 'text-text-secondary'
                    }`}>
                      {negotiation.savings > 0 ? formatCurrency(negotiation.savings) : '-'}
                    </div>
                    {negotiation.savings > 0 && (
                      <div className="text-accent-secondary text-xs">
                        {negotiation.savingsPercent.toFixed(1)}%
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button 
                        className="btn btn-ghost btn-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNegotiation(negotiation.id);
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Selected Negotiation Details */}
      {selectedNegotiationData && (
        <div className="glass-panel p-6 rounded-xl mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-text-primary">{selectedNegotiationData.title}</h2>
                <div className={`badge ${getStatusBadgeClass(selectedNegotiationData.status)}`}>
                  {selectedNegotiationData.status}
                </div>
              </div>
              <p className="text-text-secondary">
                <Link to={`/vendor-directory/${selectedNegotiationData.vendorId}`} className="text-accent-primary hover:underline">
                  {selectedNegotiationData.vendor}
                </Link> · {selectedNegotiationData.category}
              </p>
            </div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setSelectedNegotiation(null)}
            >
              Close
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-sm font-medium text-text-muted mb-2">Timeframe</h3>
              <div className="flex justify-between items-center mb-1">
                <span className="text-text-muted">Started:</span>
                <span className="text-text-primary">{formatDate(selectedNegotiationData.startDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Completed:</span>
                <span className="text-text-primary">{formatDate(selectedNegotiationData.endDate)}</span>
              </div>
              <div className="text-text-muted text-xs mt-2">
                Duration: {Math.ceil((new Date(selectedNegotiationData.endDate).getTime() - new Date(selectedNegotiationData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-sm font-medium text-text-muted mb-2">Financial Details</h3>
              <div className="flex justify-between items-center mb-1">
                <span className="text-text-muted">Initial Price:</span>
                <span className="text-text-primary">{formatCurrency(selectedNegotiationData.initialPrice)}</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-text-muted">Final Price:</span>
                <span className="text-text-primary">{formatCurrency(selectedNegotiationData.finalPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Savings:</span>
                <span className="text-accent-secondary font-semibold">
                  {formatCurrency(selectedNegotiationData.savings)} ({selectedNegotiationData.savingsPercent.toFixed(1)}%)
                </span>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-sm font-medium text-text-muted mb-2">Activity Summary</h3>
              <div className="flex justify-between items-center mb-1">
                <span className="flex items-center gap-1 text-text-muted">
                  <MdOutlineInventory className="text-sm" /> Items:
                </span>
                <span className="text-text-primary">{selectedNegotiationData.items}</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="flex items-center gap-1 text-text-muted">
                  <MdOutlineMessage className="text-sm" /> Messages:
                </span>
                <span className="text-text-primary">{selectedNegotiationData.messages}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1 text-text-muted">
                  <MdOutlineDescription className="text-sm" /> Documents:
                </span>
                <span className="text-text-primary">{selectedNegotiationData.documents}</span>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-sm font-medium text-text-muted mb-2">Actions</h3>
              <div className="flex flex-col gap-2">
                <Link to={`/vendor-directory/${selectedNegotiationData.vendorId}`} className="btn btn-outline btn-xs flex items-center justify-start">
                  <MdOutlineInfo className="mr-1" /> View Vendor Profile
                </Link>
                <Link to={`/communication-hub?negotiation=${selectedNegotiationData.id}`} className="btn btn-outline btn-xs flex items-center justify-start">
                  <MdOutlineMessage className="mr-1" /> View Messages
                </Link>
                <Link to={`/document-repository?negotiation=${selectedNegotiationData.id}`} className="btn btn-outline btn-xs flex items-center justify-start">
                  <MdOutlineFileDownload className="mr-1" /> Download Documents
                </Link>
                {selectedNegotiationData.status === 'completed' && (
                  <Link to={`/active-negotiations/new?template=${selectedNegotiationData.id}`} className="btn btn-primary btn-xs flex items-center justify-start">
                    <MdOutlineReceipt className="mr-1" /> Use as Template
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-4 rounded-lg mb-4">
            <h3 className="text-lg font-medium text-text-primary mb-2">Notes</h3>
            <p className="text-text-secondary">{selectedNegotiationData.notes}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-lg font-medium text-text-primary mb-4">Price History</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { date: 'Initial', price: selectedNegotiationData.initialPrice },
                      { date: 'Offer 1', price: Math.round(selectedNegotiationData.initialPrice * 0.95) },
                      { date: 'Counter 1', price: Math.round(selectedNegotiationData.initialPrice * 0.97) },
                      { date: 'Offer 2', price: Math.round(selectedNegotiationData.initialPrice * 0.92) },
                      { date: 'Counter 2', price: Math.round(selectedNegotiationData.initialPrice * 0.94) },
                      { date: 'Final', price: selectedNegotiationData.finalPrice },
                    ]}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" tick={{ fill: '#B3B3B3' }} />
                    <YAxis 
                      domain={[
                        Math.floor(selectedNegotiationData.finalPrice * 0.9), 
                        Math.ceil(selectedNegotiationData.initialPrice * 1.05)
                      ]} 
                      tick={{ fill: '#B3B3B3' }}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number), 'Price']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '8px' 
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-lg font-medium text-text-primary mb-2">Key Timeline</h3>
              <div className="relative pl-8 space-y-6 mt-4">
                {[
                  { date: format(parseISO(selectedNegotiationData.startDate), 'MMM d'), event: 'Negotiation Started', desc: 'Initial quote received' },
                  { date: format(parseISO(selectedNegotiationData.startDate), 'MMM d'), event: 'First Counteroffer', desc: 'Requested 10% volume discount' },
                  { date: format(addDays(parseISO(selectedNegotiationData.startDate), 3), 'MMM d'), event: 'Vendor Response', desc: 'Offered 3% discount' },
                  { date: format(addDays(parseISO(selectedNegotiationData.startDate), 4), 'MMM d'), event: 'Second Counteroffer', desc: 'Requested expedited shipping and 7% discount' },
                  { date: format(addDays(parseISO(selectedNegotiationData.startDate), 7), 'MMM d'), event: 'Final Offer', desc: 'Vendor agreed to expedited shipping and 5.5% discount' },
                  { date: format(parseISO(selectedNegotiationData.endDate), 'MMM d'), event: 'Agreement Reached', desc: `Final price: ${formatCurrency(selectedNegotiationData.finalPrice)}` },
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-8 mt-1.5 w-4 h-4 rounded-full bg-accent-primary"></div>
                    {index < 5 && <div className="absolute -left-6 mt-5 h-14 w-0.5 bg-accent-primary/30"></div>}
                    <div>
                      <span className="text-text-muted text-xs">{item.date}</span>
                      <h4 className="text-text-primary font-medium">{item.event}</h4>
                      <p className="text-text-secondary text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <ChatPopup />
    </div>
  );
};

// Helper function for the timeline
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default NegotiationHistory; 