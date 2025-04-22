import React, { useState } from 'react';
import { MdOutlineAddCircle, MdOutlineEdit, MdOutlineDelete, MdOutlineVisibility, MdOutlineDescription, MdOutlineCalendarToday, MdOutlineWarning } from 'react-icons/md';

interface Contract {
  id: number;
  title: string;
  vendorName: string;
  vendorId: number;
  startDate: string;
  endDate: string;
  value: number;
  status: 'active' | 'expired' | 'pending' | 'terminated';
  type: 'service' | 'product' | 'lease' | 'maintenance';
  renewalOption: boolean;
  documents: number;
}

const Contracts = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [expandedContract, setExpandedContract] = useState<number | null>(null);

  // Mock data for contracts based on Aldi tenders
  const contracts: Contract[] = [
    {
      id: 1,
      title: 'Coffee Supply Agreement',
      vendorName: 'Angola Coffee Exports',
      vendorId: 1,
      startDate: '2024-04-15',
      endDate: '2025-04-14',
      value: 420000,
      status: 'active',
      type: 'product',
      renewalOption: true,
      documents: 6
    },
    {
      id: 2,
      title: 'Health & Beauty Products - Conditioner',
      vendorName: 'Greece Beauty Products',
      vendorId: 2,
      startDate: '2024-05-01',
      endDate: '2025-04-30',
      value: 290000,
      status: 'active',
      type: 'product',
      renewalOption: true,
      documents: 4
    },
    {
      id: 3,
      title: 'Fresh Produce Supply - Oranges',
      vendorName: 'Burkina Faso Fresh Produce',
      vendorId: 3,
      startDate: '2024-04-25',
      endDate: '2025-04-24',
      value: 320000,
      status: 'active',
      type: 'product',
      renewalOption: true,
      documents: 5
    },
    {
      id: 4,
      title: 'Organic Deodorant Supply',
      vendorName: 'EstoniaPrime',
      vendorId: 4,
      startDate: '2024-04-12',
      endDate: '2025-04-11',
      value: 185000,
      status: 'active',
      type: 'product',
      renewalOption: false,
      documents: 3
    },
    {
      id: 5,
      title: 'Premium Moisturizer Contract',
      vendorName: 'Costa Rica Cosmetics',
      vendorId: 5,
      startDate: '2023-04-19',
      endDate: '2024-04-18',
      value: 270000,
      status: 'expired',
      type: 'product',
      renewalOption: false,
      documents: 4
    },
    {
      id: 6,
      title: 'Deli Meats - Pepperoni',
      vendorName: 'Bosnia Meats International',
      vendorId: 6,
      startDate: '2024-04-29',
      endDate: '2025-04-28',
      value: 280000,
      status: 'active',
      type: 'product',
      renewalOption: true,
      documents: 5
    },
    {
      id: 7,
      title: 'Imported Frozen Pies Supply',
      vendorName: 'Montenegro Bakery Products',
      vendorId: 7,
      startDate: '2024-04-15',
      endDate: '2025-04-14',
      value: 240000,
      status: 'active',
      type: 'product',
      renewalOption: true,
      documents: 4
    },
    {
      id: 8,
      title: 'Health & Beauty - Shampoo Supply',
      vendorName: 'Cambodia Essential Supplies',
      vendorId: 8,
      startDate: '2023-10-03',
      endDate: '2024-04-02',
      value: 180000,
      status: 'terminated',
      type: 'product',
      renewalOption: false,
      documents: 3
    }
  ];

  // Filter contracts based on selected status and type
  const filteredContracts = contracts.filter(contract => 
    (selectedStatus === 'all' || contract.status === selectedStatus) &&
    (selectedType === 'all' || contract.type === selectedType)
  );

  // Status options and types for filters
  const statusOptions = ['all', 'active', 'expired', 'pending', 'terminated'];
  const typeOptions = ['all', 'service', 'product', 'lease', 'maintenance'];

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'active': return 'badge-success';
      case 'expired': return 'badge-warning';
      case 'pending': return 'badge-info';
      case 'terminated': return 'badge-error';
      default: return 'badge-ghost';
    }
  };

  // Function to toggle contract details
  const toggleContractDetails = (contractId: number) => {
    if (expandedContract === contractId) {
      setExpandedContract(null);
    } else {
      setExpandedContract(contractId);
    }
  };

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Function to calculate days until expiration
  const getDaysUntilExpiration = (endDate: string) => {
    const today = new Date();
    const expirationDate = new Date(endDate);
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Function to get expiration warning
  const getExpirationWarning = (endDate: string) => {
    const daysLeft = getDaysUntilExpiration(endDate);
    if (daysLeft < 0) return null;
    if (daysLeft <= 30) return 'text-error';
    if (daysLeft <= 90) return 'text-warning';
    return null;
  };

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Contract Management</h1>
          <button className="btn btn-primary flex items-center gap-2">
            <MdOutlineAddCircle className="text-xl" />
            Create New Contract
          </button>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <MdOutlineDescription className="text-3xl" />
            </div>
            <div className="stat-title">Total Contracts</div>
            <div className="stat-value">{contracts.length}</div>
            <div className="stat-desc">Across all vendors</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-success">
              <MdOutlineCalendarToday className="text-3xl" />
            </div>
            <div className="stat-title">Active Contracts</div>
            <div className="stat-value">{contracts.filter(c => c.status === 'active').length}</div>
            <div className="stat-desc">Currently in force</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-warning">
              <MdOutlineWarning className="text-3xl" />
            </div>
            <div className="stat-title">Expiring Soon</div>
            <div className="stat-value">
              {contracts.filter(c => c.status === 'active' && getDaysUntilExpiration(c.endDate) <= 90 && getDaysUntilExpiration(c.endDate) > 0).length}
            </div>
            <div className="stat-desc">Within 90 days</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select 
              className="select select-bordered" 
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
          
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Contract Type</span>
            </label>
            <select 
              className="select select-bordered" 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {typeOptions.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Contract Title</th>
                <th>Vendor</th>
                <th>Type</th>
                <th>Value</th>
                <th>Expiration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map(contract => (
                <React.Fragment key={contract.id}>
                  <tr className="hover cursor-pointer" onClick={() => toggleContractDetails(contract.id)}>
                    <td>
                      {expandedContract === contract.id ? 
                        <span className="font-bold">-</span> : 
                        <span className="font-bold">+</span>
                      }
                    </td>
                    <td className="font-medium">{contract.title}</td>
                    <td>{contract.vendorName}</td>
                    <td>
                      <span className="capitalize">{contract.type}</span>
                    </td>
                    <td>{formatCurrency(contract.value)}</td>
                    <td>
                      <div className={`flex items-center gap-1 ${getExpirationWarning(contract.endDate)}`}>
                        {contract.endDate}
                        {getExpirationWarning(contract.endDate) && 
                          <MdOutlineWarning className={`${getExpirationWarning(contract.endDate)}`} />
                        }
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeColor(contract.status)}`}>
                        {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-ghost">
                          <MdOutlineVisibility className="text-lg" />
                        </button>
                        <button className="btn btn-sm btn-ghost">
                          <MdOutlineEdit className="text-lg" />
                        </button>
                        <button className="btn btn-sm btn-ghost text-error">
                          <MdOutlineDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedContract === contract.id && (
                    <tr>
                      <td colSpan={8}>
                        <div className="p-4 bg-base-200 rounded-lg">
                          <h3 className="font-semibold text-lg mb-3">Contract Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="stat bg-base-100 rounded-lg">
                              <div className="stat-title">Contract Period</div>
                              <div className="text-sm mt-2">
                                <p><span className="font-semibold">Start Date:</span> {contract.startDate}</p>
                                <p><span className="font-semibold">End Date:</span> {contract.endDate}</p>
                                <p><span className="font-semibold">Duration:</span> {Math.round((new Date(contract.endDate).getTime() - new Date(contract.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months</p>
                              </div>
                            </div>
                            <div className="stat bg-base-100 rounded-lg">
                              <div className="stat-title">Financial Details</div>
                              <div className="text-sm mt-2">
                                <p><span className="font-semibold">Total Value:</span> {formatCurrency(contract.value)}</p>
                                <p><span className="font-semibold">Monthly Value:</span> {formatCurrency(contract.value / Math.max(1, Math.round((new Date(contract.endDate).getTime() - new Date(contract.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))))}</p>
                                <p><span className="font-semibold">Renewal Option:</span> {contract.renewalOption ? 'Yes' : 'No'}</p>
                              </div>
                            </div>
                            <div className="stat bg-base-100 rounded-lg">
                              <div className="stat-title">Documentation</div>
                              <div className="text-sm mt-2">
                                <p><span className="font-semibold">Documents:</span> {contract.documents} files</p>
                                <p><span className="font-semibold">Last Updated:</span> 2024-03-10</p>
                                <p><span className="font-semibold">Contract Owner:</span> Legal Department</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4 gap-2">
                            <button className="btn btn-sm">View Documents</button>
                            <button className="btn btn-sm btn-primary">Manage Contract</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contracts; 