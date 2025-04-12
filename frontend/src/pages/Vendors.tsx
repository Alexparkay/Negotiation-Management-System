import React, { useState } from 'react';
import { MdOutlineAddCircle, MdOutlineEdit, MdOutlineDelete, MdOutlineVisibility, MdOutlineCategory, MdOutlineAttachMoney, MdOutlineBusinessCenter } from 'react-icons/md';

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
}

const Vendors = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedVendor, setExpandedVendor] = useState<number | null>(null);

  // Mock data for vendors
  const vendors: Vendor[] = [
    {
      id: 1,
      name: 'Global Construction Ltd',
      category: 'Construction',
      contactPerson: 'John Builder',
      email: 'john@globalconstruction.com',
      phone: '+1-555-123-4567',
      country: 'USA',
      status: 'active',
      contractCount: 12,
      totalSpend: 1250000
    },
    {
      id: 2,
      name: 'Elite Fixtures & Fittings',
      category: 'Fixtures',
      contactPerson: 'Sarah Designer',
      email: 'sarah@elitefixtures.com',
      phone: '+44-20-1234-5678',
      country: 'UK',
      status: 'active',
      contractCount: 8,
      totalSpend: 780000
    },
    {
      id: 3,
      name: 'TechPoint Systems',
      category: 'IT',
      contactPerson: 'Mike Tech',
      email: 'mike@techpoint.com',
      phone: '+1-555-987-6543',
      country: 'USA',
      status: 'active',
      contractCount: 15,
      totalSpend: 950000
    },
    {
      id: 4,
      name: 'Secure Solutions Inc',
      category: 'Security',
      contactPerson: 'Robert Guard',
      email: 'robert@securesolutions.com',
      phone: '+61-2-9876-5432',
      country: 'Australia',
      status: 'inactive',
      contractCount: 5,
      totalSpend: 320000
    },
    {
      id: 5,
      name: 'EcoClean Services',
      category: 'Cleaning',
      contactPerson: 'Lisa Green',
      email: 'lisa@ecoclean.com',
      phone: '+1-555-789-0123',
      country: 'Canada',
      status: 'pending',
      contractCount: 3,
      totalSpend: 150000
    },
    {
      id: 6,
      name: 'Precision Logistics',
      category: 'Logistics',
      contactPerson: 'David Shipper',
      email: 'david@precisionlogistics.com',
      phone: '+49-30-1234-5678',
      country: 'Germany',
      status: 'active',
      contractCount: 7,
      totalSpend: 680000
    },
    {
      id: 7,
      name: 'Faulty Supplies Co',
      category: 'Supplies',
      contactPerson: 'Mark Problem',
      email: 'mark@faultysupplies.com',
      phone: '+1-555-456-7890',
      country: 'USA',
      status: 'blacklisted',
      contractCount: 2,
      totalSpend: 75000
    }
  ];

  // Filter vendors based on selected status and category
  const filteredVendors = vendors.filter(vendor => 
    (selectedStatus === 'all' || vendor.status === selectedStatus) &&
    (selectedCategory === 'all' || vendor.category === selectedCategory)
  );

  // Status options and categories for filters
  const statusOptions = ['all', 'active', 'inactive', 'pending', 'blacklisted'];
  const categories = ['all', 'Construction', 'Fixtures', 'IT', 'Security', 'Cleaning', 'Logistics', 'Supplies'];

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

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Vendor Management</h1>
          <button className="btn btn-primary flex items-center gap-2">
            <MdOutlineAddCircle className="text-xl" />
            Add New Vendor
          </button>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <MdOutlineBusinessCenter className="text-3xl" />
            </div>
            <div className="stat-title">Total Vendors</div>
            <div className="stat-value">{vendors.length}</div>
            <div className="stat-desc">Across all categories</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <MdOutlineCategory className="text-3xl" />
            </div>
            <div className="stat-title">Active Vendors</div>
            <div className="stat-value">{vendors.filter(v => v.status === 'active').length}</div>
            <div className="stat-desc">Ready for collaboration</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-accent">
              <MdOutlineAttachMoney className="text-3xl" />
            </div>
            <div className="stat-title">Total Spend</div>
            <div className="stat-value">{formatCurrency(vendors.reduce((sum, v) => sum + v.totalSpend, 0))}</div>
            <div className="stat-desc">Across all vendors</div>
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
              <span className="label-text">Category</span>
            </label>
            <select 
              className="select select-bordered" 
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
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Vendor Name</th>
                <th>Category</th>
                <th>Contact Person</th>
                <th>Country</th>
                <th>Status</th>
                <th>Contracts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map(vendor => (
                <React.Fragment key={vendor.id}>
                  <tr className="hover cursor-pointer" onClick={() => toggleVendorDetails(vendor.id)}>
                    <td>
                      {expandedVendor === vendor.id ? 
                        <span className="font-bold">-</span> : 
                        <span className="font-bold">+</span>
                      }
                    </td>
                    <td className="font-medium">{vendor.name}</td>
                    <td>{vendor.category}</td>
                    <td>{vendor.contactPerson}</td>
                    <td>{vendor.country}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeColor(vendor.status)}`}>
                        {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                      </span>
                    </td>
                    <td>{vendor.contractCount}</td>
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
                  {expandedVendor === vendor.id && (
                    <tr>
                      <td colSpan={8}>
                        <div className="p-4 bg-base-200 rounded-lg">
                          <h3 className="font-semibold text-lg mb-3">Vendor Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="stat bg-base-100 rounded-lg">
                              <div className="stat-title">Contact Information</div>
                              <div className="text-sm mt-2">
                                <p><span className="font-semibold">Email:</span> {vendor.email}</p>
                                <p><span className="font-semibold">Phone:</span> {vendor.phone}</p>
                              </div>
                            </div>
                            <div className="stat bg-base-100 rounded-lg">
                              <div className="stat-title">Financial Summary</div>
                              <div className="text-sm mt-2">
                                <p><span className="font-semibold">Total Spend:</span> {formatCurrency(vendor.totalSpend)}</p>
                                <p><span className="font-semibold">Avg. per Contract:</span> {formatCurrency(vendor.totalSpend / (vendor.contractCount || 1))}</p>
                              </div>
                            </div>
                            <div className="stat bg-base-100 rounded-lg">
                              <div className="stat-title">Contract Summary</div>
                              <div className="text-sm mt-2">
                                <p><span className="font-semibold">Active Contracts:</span> {vendor.contractCount}</p>
                                <p><span className="font-semibold">Last Renewal:</span> 2024-03-15</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <button className="btn btn-sm btn-primary">View All Contracts</button>
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

export default Vendors; 