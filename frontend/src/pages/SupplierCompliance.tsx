import { useState } from 'react';
import {
  MdOutlineVerified,
  MdOutlineWarning,
  MdOutlineError,
  MdOutlineSchedule,
  MdOutlineDescription,
  MdOutlineFilePresent,
  MdOutlineCalendarToday,
  MdOutlineBusinessCenter,
} from 'react-icons/md';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface ComplianceItem {
  id: string;
  name: string;
  type: string;
  status: 'valid' | 'expiring' | 'expired' | 'missing';
  expiryDate: string;
  lastUpdated: string;
  supplier: string;
  documents: string[];
  notes: string;
}

interface ComplianceMetrics {
  total: number;
  valid: number;
  expiring: number;
  expired: number;
  missing: number;
  upcomingRenewals: number;
}

const SupplierCompliance = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock compliance metrics
  const metrics: ComplianceMetrics = {
    total: 150,
    valid: 95,
    expiring: 25,
    expired: 20,
    missing: 10,
    upcomingRenewals: 15,
  };

  // Mock compliance items
  const complianceItems: ComplianceItem[] = [
    {
      id: '1',
      name: 'ISO 9001:2015',
      type: 'Quality Management',
      status: 'valid',
      expiryDate: '2024-12-31',
      lastUpdated: '2023-12-15',
      supplier: 'Acme Electronics',
      documents: ['ISO_9001_Certificate.pdf'],
      notes: 'Annual audit completed successfully',
    },
    {
      id: '2',
      name: 'Environmental Compliance',
      type: 'Environmental',
      status: 'expiring',
      expiryDate: '2024-03-15',
      lastUpdated: '2023-03-15',
      supplier: 'Global Materials Inc',
      documents: ['Environmental_Cert.pdf', 'Audit_Report.pdf'],
      notes: 'Renewal process initiated',
    },
    {
      id: '3',
      name: 'Safety Certification',
      type: 'Safety',
      status: 'expired',
      expiryDate: '2024-01-01',
      lastUpdated: '2023-01-01',
      supplier: 'FastShip Logistics',
      documents: ['Safety_Cert_2023.pdf'],
      notes: 'Renewal documentation pending',
    },
    // Add more mock items as needed
  ];

  // Prepare data for the pie chart
  const complianceStatusData = [
    { name: 'Valid', value: metrics.valid, color: '#10B981' },
    { name: 'Expiring', value: metrics.expiring, color: '#F59E0B' },
    { name: 'Expired', value: metrics.expired, color: '#EF4444' },
    { name: 'Missing', value: metrics.missing, color: '#6B7280' },
  ];

  const getStatusBadge = (status: ComplianceItem['status']) => {
    const statusConfig = {
      valid: { color: 'bg-success text-success-content', icon: MdOutlineVerified },
      expiring: { color: 'bg-warning text-warning-content', icon: MdOutlineWarning },
      expired: { color: 'bg-error text-error-content', icon: MdOutlineError },
      missing: { color: 'bg-neutral text-neutral-content', icon: MdOutlineSchedule },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${config.color}`}>
        <Icon className="w-4 h-4" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredItems = complianceItems.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supplier Compliance</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered input-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select select-bordered select-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="valid">Valid</option>
            <option value="expiring">Expiring</option>
            <option value="expired">Expired</option>
            <option value="missing">Missing</option>
          </select>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Requirements</p>
              <h3 className="text-2xl font-bold">{metrics.total}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {((metrics.valid / metrics.total) * 100).toFixed(1)}% Compliant
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MdOutlineDescription className="text-primary text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Expiring Soon</p>
              <h3 className="text-2xl font-bold">{metrics.expiring}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Next 30 days
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
              <MdOutlineCalendarToday className="text-warning text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Action Required</p>
              <h3 className="text-2xl font-bold">{metrics.expired + metrics.missing}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Expired or Missing
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center">
              <MdOutlineWarning className="text-error text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Status Chart */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Compliance Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complianceStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {complianceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance Items List */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Compliance Requirements</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-base-300 dark:border-slate-700">
                  <th className="text-left p-2">Requirement</th>
                  <th className="text-left p-2">Supplier</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Expiry Date</th>
                  <th className="text-left p-2">Documents</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-base-300 dark:border-slate-700">
                    <td className="p-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.type}</p>
                      </div>
                    </td>
                    <td className="p-2">{item.supplier}</td>
                    <td className="p-2">{getStatusBadge(item.status)}</td>
                    <td className="p-2">
                      <div>
                        <p>{new Date(item.expiryDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        {item.documents.map((doc, index) => (
                          <span
                            key={index}
                            className="text-primary hover:text-primary-focus cursor-pointer flex items-center gap-1"
                          >
                            <MdOutlineFilePresent />
                            <span className="text-sm">Doc {index + 1}</span>
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierCompliance; 