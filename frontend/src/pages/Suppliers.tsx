import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineSearch,
  MdOutlineFilterList,
  MdOutlineAdd,
  MdOutlineMoreVert,
  MdOutlineCheckCircle,
  MdOutlinePending,
  MdOutlineWarning,
  MdOutlineArrowForward,
  MdOutlineSort,
  MdOutlineRefresh,
  MdOutlineFileDownload,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineVisibility,
  MdOutlineBusinessCenter,
  MdOutlineLocationOn,
  MdOutlineCategory,
  MdOutlineCheck,
  MdOutlineSchedule,
} from 'react-icons/md';
import { HiOutlineUsers, HiOutlineShieldExclamation } from 'react-icons/hi2';

// Define types
type SupplierStatus = 'active' | 'pending' | 'high-risk';
type RiskLevel = 'low' | 'medium' | 'high';
type OnboardingStage = 'application' | 'vetting' | 'approval' | 'completed';

interface Supplier {
  id: number;
  name: string;
  category: string;
  status: SupplierStatus;
  performance: number;
  spend: number;
  location: string;
  contact: string;
  onboardingStage: OnboardingStage;
  riskLevel: RiskLevel;
}

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Mock data for suppliers
  const suppliers: Supplier[] = [
    {
      id: 1,
      name: 'Acme Electronics',
      category: 'Electronics',
      status: 'active',
      performance: 92,
      spend: 1250000,
      location: 'San Francisco, CA',
      contact: 'john.doe@acme.com',
      onboardingStage: 'completed',
      riskLevel: 'low',
    },
    {
      id: 2,
      name: 'Global Materials Inc',
      category: 'Raw Materials',
      status: 'active',
      performance: 87,
      spend: 980000,
      location: 'Chicago, IL',
      contact: 'sarah.smith@globalmaterials.com',
      onboardingStage: 'completed',
      riskLevel: 'medium',
    },
    {
      id: 3,
      name: 'PackRight Solutions',
      category: 'Packaging',
      status: 'active',
      performance: 95,
      spend: 750000,
      location: 'Atlanta, GA',
      contact: 'mike.johnson@packright.com',
      onboardingStage: 'completed',
      riskLevel: 'low',
    },
    {
      id: 4,
      name: 'Tech Innovations LLC',
      category: 'Electronics',
      status: 'pending',
      performance: 0,
      spend: 0,
      location: 'Austin, TX',
      contact: 'lisa.wong@techinnovations.com',
      onboardingStage: 'vetting',
      riskLevel: 'medium',
    },
    {
      id: 5,
      name: 'Quality Parts Co',
      category: 'Manufacturing',
      status: 'active',
      performance: 78,
      spend: 620000,
      location: 'Detroit, MI',
      contact: 'robert.chen@qualityparts.com',
      onboardingStage: 'completed',
      riskLevel: 'high',
    },
    {
      id: 6,
      name: 'Eco Packaging Ltd',
      category: 'Packaging',
      status: 'active',
      performance: 91,
      spend: 450000,
      location: 'Portland, OR',
      contact: 'emma.green@ecopackaging.com',
      onboardingStage: 'completed',
      riskLevel: 'low',
    },
    {
      id: 7,
      name: 'Precision Tools Inc',
      category: 'Tools',
      status: 'high-risk',
      performance: 65,
      spend: 380000,
      location: 'Cleveland, OH',
      contact: 'david.miller@precisiontools.com',
      onboardingStage: 'completed',
      riskLevel: 'high',
    },
    {
      id: 8,
      name: 'FastShip Logistics',
      category: 'Logistics',
      status: 'active',
      performance: 88,
      spend: 920000,
      location: 'Miami, FL',
      contact: 'carlos.rodriguez@fastship.com',
      onboardingStage: 'completed',
      riskLevel: 'medium',
    },
    {
      id: 9,
      name: 'Innovative Solutions Group',
      category: 'Services',
      status: 'pending',
      performance: 0,
      spend: 0,
      location: 'Seattle, WA',
      contact: 'alex.patel@innovativesolutions.com',
      onboardingStage: 'application',
      riskLevel: 'low',
    },
    {
      id: 10,
      name: 'Office Supplies Direct',
      category: 'Office Supplies',
      status: 'active',
      performance: 84,
      spend: 320000,
      location: 'Denver, CO',
      contact: 'jennifer.lee@officesupplies.com',
      onboardingStage: 'completed',
      riskLevel: 'low',
    },
  ];

  const getStatusBadge = (status: SupplierStatus) => {
    const statusConfig = {
      active: 'bg-success text-success-content',
      pending: 'bg-warning text-warning-content',
      'high-risk': 'bg-error text-error-content',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusConfig[status]}`}>
        {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </span>
    );
  };

  const getRiskBadge = (risk: RiskLevel) => {
    const riskConfig = {
      low: 'bg-success text-success-content',
      medium: 'bg-warning text-warning-content',
      high: 'bg-error text-error-content',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${riskConfig[risk]}`}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)}
      </span>
    );
  };

  const getOnboardingBadge = (stage: OnboardingStage) => {
    const stageConfig = {
      application: 'bg-info text-info-content',
      vetting: 'bg-warning text-warning-content',
      approval: 'bg-warning text-warning-content',
      completed: 'bg-success text-success-content',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${stageConfig[stage]}`}>
        {stage.charAt(0).toUpperCase() + stage.slice(1)}
      </span>
    );
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesStatus = filterStatus === 'all' || supplier.status === filterStatus;
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  }).sort((a, b) => {
    const aValue = a[sortBy as keyof Supplier];
    const bValue = b[sortBy as keyof Supplier];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });

  // Count suppliers by status
  const activeCount = suppliers.filter(s => s.status === 'active').length;
  const pendingCount = suppliers.filter(s => s.status === 'pending').length;
  const highRiskCount = suppliers.filter(s => s.status === 'high-risk').length;

  // Count suppliers by onboarding stage
  const onboardingStages = {
    application: suppliers.filter(s => s.onboardingStage === 'application').length,
    vetting: suppliers.filter(s => s.onboardingStage === 'vetting').length,
    approval: suppliers.filter(s => s.onboardingStage === 'approval').length,
    completed: suppliers.filter(s => s.onboardingStage === 'completed').length,
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <HiOutlineUsers className="text-primary" />
            Supplier Management
          </h1>
          <Link
            to="/supplier-onboarding"
            className="btn btn-primary btn-sm flex items-center gap-1"
          >
            <MdOutlineAdd /> Add New Supplier
          </Link>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Suppliers</p>
                <h3 className="text-2xl font-bold">{suppliers.length}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <HiOutlineUsers className="text-primary text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Suppliers</p>
                <h3 className="text-2xl font-bold">{activeCount}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <MdOutlineCheckCircle className="text-green-500 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Approval</p>
                <h3 className="text-2xl font-bold">{pendingCount}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <MdOutlinePending className="text-yellow-500 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">High-Risk Suppliers</p>
                <h3 className="text-2xl font-bold">{highRiskCount}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <HiOutlineShieldExclamation className="text-red-500 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Onboarding Progress */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Supplier Onboarding</h2>
            <Link
              to="/supplier-onboarding"
              className="text-primary hover:underline flex items-center gap-1"
            >
              View All <MdOutlineArrowForward size={16} />
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 flex flex-col items-center p-4 bg-base-200 dark:bg-slate-700 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                <span className="text-blue-500 font-bold">{onboardingStages.application}</span>
              </div>
              <p className="text-sm font-medium">Application</p>
            </div>
            
            <div className="hidden md:block w-8 self-center">
              <MdOutlineArrowForward className="text-gray-400 dark:text-gray-500" size={24} />
            </div>
            
            <div className="flex-1 flex flex-col items-center p-4 bg-base-200 dark:bg-slate-700 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
                <span className="text-yellow-500 font-bold">{onboardingStages.vetting}</span>
              </div>
              <p className="text-sm font-medium">Vetting</p>
            </div>
            
            <div className="hidden md:block w-8 self-center">
              <MdOutlineArrowForward className="text-gray-400 dark:text-gray-500" size={24} />
            </div>
            
            <div className="flex-1 flex flex-col items-center p-4 bg-base-200 dark:bg-slate-700 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                <span className="text-purple-500 font-bold">{onboardingStages.approval}</span>
              </div>
              <p className="text-sm font-medium">Approval</p>
            </div>
            
            <div className="hidden md:block w-8 self-center">
              <MdOutlineArrowForward className="text-gray-400 dark:text-gray-500" size={24} />
            </div>
            
            <div className="flex-1 flex flex-col items-center p-4 bg-base-200 dark:bg-slate-700 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                <span className="text-green-500 font-bold">{onboardingStages.completed}</span>
              </div>
              <p className="text-sm font-medium">Completed</p>
            </div>
          </div>
        </div>

        {/* Supplier Directory */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Supplier Directory</h2>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  className="w-full p-2 pl-10 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-800"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="high-risk">High Risk</option>
              </select>
              
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-outline btn-sm">
                  <MdOutlineSort /> Sort
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 dark:bg-slate-800 rounded-box w-52">
                  <li onClick={() => { setSortBy('name'); setSortOrder('asc'); }}>
                    <a className={sortBy === 'name' && sortOrder === 'asc' ? 'active' : ''}>Name (A-Z)</a>
                  </li>
                  <li onClick={() => { setSortBy('name'); setSortOrder('desc'); }}>
                    <a className={sortBy === 'name' && sortOrder === 'desc' ? 'active' : ''}>Name (Z-A)</a>
                  </li>
                  <li onClick={() => { setSortBy('performance'); setSortOrder('desc'); }}>
                    <a className={sortBy === 'performance' && sortOrder === 'desc' ? 'active' : ''}>Performance (High-Low)</a>
                  </li>
                  <li onClick={() => { setSortBy('performance'); setSortOrder('asc'); }}>
                    <a className={sortBy === 'performance' && sortOrder === 'asc' ? 'active' : ''}>Performance (Low-High)</a>
                  </li>
                  <li onClick={() => { setSortBy('spend'); setSortOrder('desc'); }}>
                    <a className={sortBy === 'spend' && sortOrder === 'desc' ? 'active' : ''}>Spend (High-Low)</a>
                  </li>
                  <li onClick={() => { setSortBy('risk'); setSortOrder('desc'); }}>
                    <a className={sortBy === 'risk' && sortOrder === 'desc' ? 'active' : ''}>Risk (High-Low)</a>
                  </li>
                </ul>
              </div>
              
              <button className="btn btn-outline btn-sm">
                <MdOutlineFileDownload /> Export
              </button>
            </div>
          </div>
          
          {/* Suppliers Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-base-200 dark:bg-slate-700">
                  <th className="p-3 text-left">Supplier</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-right">Performance</th>
                  <th className="p-3 text-right">Annual Spend</th>
                  <th className="p-3 text-left">Risk Level</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b border-base-300 dark:border-slate-700 hover:bg-base-100 dark:hover:bg-slate-700/50">
                    <td className="p-3">
                      <Link to={`/suppliers/${supplier.id}`} className="font-medium text-primary hover:underline">
                        {supplier.name}
                      </Link>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{supplier.location}</div>
                    </td>
                    <td className="p-3">{supplier.category}</td>
                    <td className="p-3">{getStatusBadge(supplier.status)}</td>
                    <td className="p-3 text-right">
                      {supplier.status === 'pending' ? (
                        <span className="text-gray-500 dark:text-gray-400">N/A</span>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <span className={`font-medium ${
                            supplier.performance >= 90 ? 'text-green-600 dark:text-green-400' :
                            supplier.performance >= 70 ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {supplier.performance}%
                          </span>
                          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                supplier.performance >= 90 ? 'bg-green-500' :
                                supplier.performance >= 70 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${supplier.performance}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      {supplier.status === 'pending' ? (
                        <span className="text-gray-500 dark:text-gray-400">N/A</span>
                      ) : (
                        <span>${supplier.spend.toLocaleString()}</span>
                      )}
                    </td>
                    <td className="p-3">{getRiskBadge(supplier.riskLevel)}</td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <Link to={`/suppliers/${supplier.id}`} className="btn btn-ghost btn-xs">
                          <MdOutlineVisibility />
                        </Link>
                        <button className="btn btn-ghost btn-xs">
                          <MdOutlineEdit />
                        </button>
                        <div className="dropdown dropdown-end">
                          <label tabIndex={0} className="btn btn-ghost btn-xs">
                            <MdOutlineMoreVert />
                          </label>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 dark:bg-slate-800 rounded-box w-52">
                            <li><a>Send Message</a></li>
                            <li><a>Download Documents</a></li>
                            <li><a className="text-red-500 dark:text-red-400">Deactivate</a></li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredSuppliers.length} of {suppliers.length} suppliers
            </div>
            <div className="flex gap-2">
              <button className="btn btn-sm btn-outline">Previous</button>
              <button className="btn btn-sm btn-outline btn-active">1</button>
              <button className="btn btn-sm btn-outline">2</button>
              <button className="btn btn-sm btn-outline">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suppliers; 