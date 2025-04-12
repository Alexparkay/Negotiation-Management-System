import { useState } from 'react';
import {
  MdOutlineAttachMoney,
  MdOutlineReceipt,
  MdOutlinePayments,
  MdOutlineWarning,
  MdOutlineSchedule,
  MdOutlineCheck,
  MdOutlineClose,
  MdOutlineEdit,
  MdOutlineFileDownload,
} from 'react-icons/md';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

interface Invoice {
  id: string;
  supplier: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  dueDate: string;
  issueDate: string;
  poNumber: string;
  paymentTerms: string;
  paymentMethod: string;
}

const Invoices = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock invoice metrics
  const metrics = {
    totalInvoices: 156,
    totalAmount: 785000,
    pendingAmount: 245000,
    overdueAmount: 32000,
    averageProcessingTime: 3.5,
  };

  // Mock invoices data
  const invoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      supplier: 'Acme Electronics',
      amount: 45000,
      status: 'paid',
      dueDate: '2024-03-15',
      issueDate: '2024-02-15',
      poNumber: 'PO-2024-123',
      paymentTerms: 'Net 30',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'INV-2024-002',
      supplier: 'Global Materials Inc',
      amount: 32000,
      status: 'pending',
      dueDate: '2024-03-20',
      issueDate: '2024-02-20',
      poNumber: 'PO-2024-124',
      paymentTerms: 'Net 30',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'INV-2024-003',
      supplier: 'FastShip Logistics',
      amount: 28000,
      status: 'overdue',
      dueDate: '2024-02-28',
      issueDate: '2024-01-28',
      poNumber: 'PO-2024-125',
      paymentTerms: 'Net 30',
      paymentMethod: 'Bank Transfer',
    },
  ];

  // Mock payment trend data
  const paymentTrendData = [
    { month: 'Jan', amount: 120000 },
    { month: 'Feb', amount: 145000 },
    { month: 'Mar', amount: 135000 },
    { month: 'Apr', amount: 150000 },
    { month: 'May', amount: 125000 },
    { month: 'Jun', amount: 140000 },
  ];

  // Mock aging data
  const agingData = [
    { range: 'Current', amount: 245000 },
    { range: '1-30 days', amount: 180000 },
    { range: '31-60 days', amount: 85000 },
    { range: '61-90 days', amount: 25000 },
    { range: '90+ days', amount: 7000 },
  ];

  const getStatusBadge = (status: Invoice['status']) => {
    const statusConfig = {
      paid: { color: 'bg-success text-success-content', icon: MdOutlineCheck },
      pending: { color: 'bg-warning text-warning-content', icon: MdOutlineSchedule },
      overdue: { color: 'bg-error text-error-content', icon: MdOutlineWarning },
      draft: { color: 'bg-neutral text-neutral-content', icon: MdOutlineEdit },
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

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    const matchesSearch = invoice.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices & Payments</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search invoices..."
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
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Invoice Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Outstanding</p>
              <h3 className="text-2xl font-bold">${(metrics.pendingAmount / 1000).toFixed(1)}K</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {metrics.totalInvoices} Active Invoices
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MdOutlineReceipt className="text-primary text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Overdue Amount</p>
              <h3 className="text-2xl font-bold">${(metrics.overdueAmount / 1000).toFixed(1)}K</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Requires Immediate Action
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center">
              <MdOutlineWarning className="text-error text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Processing Time</p>
              <h3 className="text-2xl font-bold">{metrics.averageProcessingTime} days</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Average Processing Time
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
              <MdOutlineSchedule className="text-info text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Payment Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={paymentTrendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Aging Analysis</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agingData}>
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recent Invoices</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-base-300 dark:border-slate-700">
                <th className="text-left p-2">Invoice #</th>
                <th className="text-left p-2">Supplier</th>
                <th className="text-right p-2">Amount</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Due Date</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-base-300 dark:border-slate-700">
                  <td className="p-2">
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">PO: {invoice.poNumber}</p>
                    </div>
                  </td>
                  <td className="p-2">{invoice.supplier}</td>
                  <td className="text-right p-2">${invoice.amount.toLocaleString()}</td>
                  <td className="p-2">{getStatusBadge(invoice.status)}</td>
                  <td className="p-2">
                    <div>
                      <p>{new Date(invoice.dueDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {invoice.paymentTerms}
                      </p>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-xs">
                        <MdOutlineFileDownload className="text-lg" />
                      </button>
                      <button className="btn btn-ghost btn-xs">
                        <MdOutlineEdit className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoices; 