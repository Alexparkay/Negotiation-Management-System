import { useState } from 'react';
import {
  MdOutlineWarning,
  MdOutlineError,
  MdOutlineCheck,
  MdOutlineSchedule,
  MdOutlineAssignment,
  MdOutlineCategory,
  MdOutlinePriorityHigh,
  MdOutlineTimer,
  MdOutlineEdit,
  MdOutlineDelete,
} from 'react-icons/md';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface Incident {
  id: string;
  title: string;
  supplier: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  reportedDate: string;
  resolvedDate?: string;
  description: string;
  assignee: string;
  impact: string;
}

interface IncidentMetrics {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  mttr: number; // Mean Time To Resolve (hours)
  criticalCount: number;
}

const IncidentManagement = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock incident metrics
  const metrics: IncidentMetrics = {
    total: 125,
    open: 15,
    inProgress: 8,
    resolved: 102,
    mttr: 24,
    criticalCount: 3,
  };

  // Mock incidents data
  const incidents: Incident[] = [
    {
      id: 'INC-2024-001',
      title: 'Late Delivery - Critical Components',
      supplier: 'Acme Electronics',
      category: 'Delivery',
      priority: 'high',
      status: 'in_progress',
      reportedDate: '2024-03-01',
      description: 'Delayed shipment of critical electronic components affecting production schedule',
      assignee: 'John Smith',
      impact: 'Production delay risk',
    },
    {
      id: 'INC-2024-002',
      title: 'Quality Control Failure',
      supplier: 'Global Materials Inc',
      category: 'Quality',
      priority: 'critical',
      status: 'open',
      reportedDate: '2024-03-02',
      description: 'Batch of raw materials failed quality inspection',
      assignee: 'Sarah Johnson',
      impact: 'Production halt',
    },
    {
      id: 'INC-2024-003',
      title: 'Invoice Discrepancy',
      supplier: 'FastShip Logistics',
      category: 'Financial',
      priority: 'medium',
      status: 'resolved',
      reportedDate: '2024-02-28',
      resolvedDate: '2024-03-01',
      description: 'Billing amount mismatch with purchase order',
      assignee: 'Mike Wilson',
      impact: 'Payment delay',
    },
  ];

  // Mock incident trend data
  const incidentTrendData = [
    { month: 'Jan', count: 18 },
    { month: 'Feb', count: 15 },
    { month: 'Mar', count: 12 },
    { month: 'Apr', count: 20 },
    { month: 'May', count: 16 },
    { month: 'Jun', count: 14 },
  ];

  // Mock incident distribution data
  const incidentDistributionData = [
    { name: 'Delivery', value: 35 },
    { name: 'Quality', value: 25 },
    { name: 'Financial', value: 20 },
    { name: 'Communication', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getStatusBadge = (status: Incident['status']) => {
    const statusConfig = {
      open: { color: 'bg-error text-error-content', icon: MdOutlineError },
      in_progress: { color: 'bg-warning text-warning-content', icon: MdOutlineSchedule },
      resolved: { color: 'bg-success text-success-content', icon: MdOutlineCheck },
      closed: { color: 'bg-neutral text-neutral-content', icon: MdOutlineCheck },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${config.color}`}>
        <Icon className="w-4 h-4" />
        {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority: Incident['priority']) => {
    const priorityConfig = {
      low: 'bg-info text-info-content',
      medium: 'bg-warning text-warning-content',
      high: 'bg-error text-error-content',
      critical: 'bg-error text-error-content font-bold',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${priorityConfig[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || incident.priority === filterPriority;
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Incident Management</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search incidents..."
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
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            className="select select-bordered select-sm"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Incident Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Open Incidents</p>
              <h3 className="text-2xl font-bold">{metrics.open + metrics.inProgress}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {metrics.criticalCount} Critical
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
              <p className="text-sm text-gray-500 dark:text-gray-400">Resolution Time</p>
              <h3 className="text-2xl font-bold">{metrics.mttr}h</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Average MTTR
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MdOutlineTimer className="text-primary text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Resolution Rate</p>
              <h3 className="text-2xl font-bold">
                {((metrics.resolved / metrics.total) * 100).toFixed(1)}%
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last 30 Days
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <MdOutlineCheck className="text-success text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Incident Trend Chart */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Incident Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incidentTrendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incident Distribution Chart */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Incident Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {incidentDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recent Incidents</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-base-300 dark:border-slate-700">
                <th className="text-left p-2">Incident</th>
                <th className="text-left p-2">Supplier</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Priority</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Assignee</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((incident) => (
                <tr key={incident.id} className="border-b border-base-300 dark:border-slate-700">
                  <td className="p-2">
                    <div>
                      <p className="font-medium">{incident.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{incident.id}</p>
                    </div>
                  </td>
                  <td className="p-2">{incident.supplier}</td>
                  <td className="p-2">{incident.category}</td>
                  <td className="p-2">{getPriorityBadge(incident.priority)}</td>
                  <td className="p-2">{getStatusBadge(incident.status)}</td>
                  <td className="p-2">{incident.assignee}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-xs">
                        <MdOutlineEdit className="text-lg" />
                      </button>
                      <button className="btn btn-ghost btn-xs text-error">
                        <MdOutlineDelete className="text-lg" />
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

export default IncidentManagement; 