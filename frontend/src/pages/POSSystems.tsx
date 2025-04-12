import React, { useState } from 'react';
import { 
  MdOutlinePointOfSale, 
  MdOutlineComputer, 
  MdOutlineWarning, 
  MdOutlineSpeed, 
  MdOutlineDevices,
  MdOutlineRefresh,
  MdOutlineFilterAlt,
  MdOutlineCheckCircle,
  MdOutlineErrorOutline,
  MdOutlineUpdate,
  MdOutlineShoppingCart,
  MdOutlineInventory2,
  MdOutlineReceiptLong,
  MdOutlinePayments,
  MdOutlineSettings,
  MdOutlineAnalytics,
  MdOutlineSupportAgent,
  MdOutlineMemory
} from 'react-icons/md';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const POSSystems = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [filterRegion, setFilterRegion] = useState('all');

  // POS systems data
  const posSystemsData = {
    totalSystems: 4960,
    deployedSystems: 3224,
    pendingDeployment: 1736,
    needingMaintenance: 128,
    avgTransactionTime: 3.2, // seconds
    avgUptimePercentage: 99.8,
    softwareVersion: 'v4.2.1',
    regions: [
      { name: 'North America', deployed: 1450, pending: 550, maintenance: 58 },
      { name: 'Europe', deployed: 1100, pending: 400, maintenance: 32 },
      { name: 'Asia Pacific', deployed: 450, pending: 550, maintenance: 25 },
      { name: 'Latin America', deployed: 150, pending: 150, maintenance: 8 },
      { name: 'Middle East & Africa', deployed: 74, pending: 86, maintenance: 5 }
    ]
  };

  // POS deployment trend data
  const posDeploymentTrendData = [
    { month: 'Jan', deployed: 2400 },
    { month: 'Feb', deployed: 2600 },
    { month: 'Mar', deployed: 2750 },
    { month: 'Apr', deployed: 2900 },
    { month: 'May', deployed: 3050 },
    { month: 'Jun', deployed: 3224 },
  ];

  // Transaction volume data
  const transactionVolumeData = [
    { day: 'Mon', volume: 12500 },
    { day: 'Tue', volume: 11800 },
    { day: 'Wed', volume: 13200 },
    { day: 'Thu', volume: 14500 },
    { day: 'Fri', volume: 18900 },
    { day: 'Sat', volume: 21500 },
    { day: 'Sun', volume: 16800 },
  ];

  // POS system types data
  const posSystemTypesData = [
    { name: 'Touchscreen Terminals', value: 65, color: '#36d399' },
    { name: 'Mobile POS', value: 20, color: '#3abff8' },
    { name: 'Self-Checkout Kiosks', value: 10, color: '#f87272' },
    { name: 'Smart Tablets', value: 5, color: '#fbbd23' },
  ];

  // POS issues data
  const posIssuesData = [
    { 
      store: 'Chicago Downtown', 
      deviceId: 'POS-CHI-001', 
      issue: 'Software Crash', 
      priority: 'High', 
      status: 'In Progress', 
      reportedAt: '2023-06-15 09:23' 
    },
    { 
      store: 'New York Flagship', 
      deviceId: 'POS-NYC-012', 
      issue: 'Payment Processing Error', 
      priority: 'Critical', 
      status: 'Open', 
      reportedAt: '2023-06-15 10:45' 
    },
    { 
      store: 'Los Angeles Mall', 
      deviceId: 'POS-LA-008', 
      issue: 'Printer Connection', 
      priority: 'Medium', 
      status: 'In Progress', 
      reportedAt: '2023-06-14 16:30' 
    },
    { 
      store: 'Miami Beach', 
      deviceId: 'POS-MIA-003', 
      issue: 'Touchscreen Calibration', 
      priority: 'Low', 
      status: 'Open', 
      reportedAt: '2023-06-14 14:15' 
    },
    { 
      store: 'Seattle Center', 
      deviceId: 'POS-SEA-007', 
      issue: 'Barcode Scanner Failure', 
      priority: 'Medium', 
      status: 'Resolved', 
      reportedAt: '2023-06-13 11:20' 
    },
  ];

  // POS deployment schedule data
  const posDeploymentScheduleData = [
    { store: 'Boston Downtown', quantity: 12, scheduledDate: '2023-06-20', status: 'Scheduled' },
    { store: 'Denver Outlet', quantity: 8, scheduledDate: '2023-06-22', status: 'Scheduled' },
    { store: 'Phoenix Mall', quantity: 15, scheduledDate: '2023-06-25', status: 'Scheduled' },
    { store: 'Portland Center', quantity: 10, scheduledDate: '2023-06-28', status: 'Pending Approval' },
    { store: 'San Diego Beach', quantity: 6, scheduledDate: '2023-07-02', status: 'Pending Approval' },
  ];

  // Payment methods data
  const paymentMethodsData = [
    { name: 'Credit/Debit Card', value: 65, color: '#36d399' },
    { name: 'Mobile Payments', value: 20, color: '#3abff8' },
    { name: 'Cash', value: 10, color: '#f87272' },
    { name: 'Gift Cards', value: 5, color: '#fbbd23' },
  ];

  // Transaction speed by store
  const transactionSpeedData = [
    { store: 'Chicago Downtown', avgTime: 3.1 },
    { store: 'New York Flagship', avgTime: 2.8 },
    { store: 'Los Angeles Mall', avgTime: 3.4 },
    { store: 'Miami Beach', avgTime: 3.6 },
    { store: 'Seattle Center', avgTime: 3.0 },
    { store: 'Dallas Outlet', avgTime: 3.2 },
    { store: 'Boston Downtown', avgTime: 3.3 },
  ];

  // Software version distribution
  const softwareVersionData = [
    { version: 'v4.2.1 (Latest)', count: 1850, color: '#36d399' },
    { version: 'v4.1.5', count: 950, color: '#3abff8' },
    { version: 'v4.0.8', count: 320, color: '#fbbd23' },
    { version: 'v3.9.2', count: 104, color: '#f87272' },
  ];

  // POS hardware specifications
  const posHardwareSpecsData = [
    { 
      model: 'RetailPro X500', 
      processor: 'Intel Core i5', 
      memory: '8GB', 
      storage: '256GB SSD', 
      display: '15" Touchscreen', 
      count: 1250 
    },
    { 
      model: 'RetailPro X300', 
      processor: 'Intel Core i3', 
      memory: '4GB', 
      storage: '128GB SSD', 
      display: '12" Touchscreen', 
      count: 980 
    },
    { 
      model: 'MobilePOS M100', 
      processor: 'ARM Cortex A72', 
      memory: '4GB', 
      storage: '64GB eMMC', 
      display: '10" Tablet', 
      count: 645 
    },
    { 
      model: 'SelfCheckout S200', 
      processor: 'Intel Core i7', 
      memory: '16GB', 
      storage: '512GB SSD', 
      display: '19" Touchscreen', 
      count: 349 
    },
  ];

  // POS maintenance history
  const maintenanceHistoryData = [
    { month: 'Jan', preventive: 45, corrective: 28 },
    { month: 'Feb', preventive: 50, corrective: 25 },
    { month: 'Mar', preventive: 55, corrective: 22 },
    { month: 'Apr', preventive: 60, corrective: 20 },
    { month: 'May', preventive: 65, corrective: 18 },
    { month: 'Jun', preventive: 70, corrective: 15 },
  ];

  // Calculate deployment percentage
  const deploymentPercentage = Math.round((posSystemsData.deployedSystems / posSystemsData.totalSystems) * 100);

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">POS Systems</h1>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline">
              <MdOutlineFilterAlt className="text-xl" />
              {timeRange === 'all' ? 'All Time' : `Last ${timeRange}`}
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li onClick={() => setTimeRange('7d')}><a>Last 7 Days</a></li>
              <li onClick={() => setTimeRange('30d')}><a>Last 30 Days</a></li>
              <li onClick={() => setTimeRange('90d')}><a>Last 90 Days</a></li>
              <li onClick={() => setTimeRange('all')}><a>All Time</a></li>
            </ul>
          </div>
          <button className="btn btn-primary">
            <MdOutlineRefresh className="text-xl" />
            Refresh Status
          </button>
        </div>
      </div>

      {/* POS Systems Overview */}
      <div className="stats shadow mb-6 w-full bg-gradient-to-r from-base-200 to-base-100">
        <div className="stat">
          <div className="stat-figure text-primary">
            <MdOutlinePointOfSale className="text-3xl" />
          </div>
          <div className="stat-title">Deployment Status</div>
          <div className="stat-value text-primary">{deploymentPercentage}%</div>
          <div className="stat-desc">{posSystemsData.deployedSystems} of {posSystemsData.totalSystems} deployed</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-success">
            <MdOutlineCheckCircle className="text-3xl" />
          </div>
          <div className="stat-title">Uptime</div>
          <div className="stat-value text-success">{posSystemsData.avgUptimePercentage}%</div>
          <div className="stat-desc">Last 30 days</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-warning">
            <MdOutlineWarning className="text-3xl" />
          </div>
          <div className="stat-title">Maintenance Needed</div>
          <div className="stat-value text-warning">{posSystemsData.needingMaintenance}</div>
          <div className="stat-desc">{Math.round((posSystemsData.needingMaintenance / posSystemsData.deployedSystems) * 100)}% of deployed systems</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-info">
            <MdOutlineSpeed className="text-3xl" />
          </div>
          <div className="stat-title">Avg. Transaction Time</div>
          <div className="stat-value text-info">{posSystemsData.avgTransactionTime}s</div>
          <div className="stat-desc">Target: &lt; 3.5s</div>
        </div>
      </div>

      {/* POS Systems Charts */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* POS Deployment Trend */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineDevices className="text-xl" />
              POS Deployment Trend
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={posDeploymentTrendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[2000, 'dataMax + 500']} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="deployed" 
                    name="Deployed POS Systems" 
                    stroke="#36d399" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Current Deployment:</span> {posSystemsData.deployedSystems} systems
              </p>
              <p className="text-sm">
                <span className="font-semibold">Pending Deployment:</span> {posSystemsData.pendingDeployment} systems
              </p>
              <p className="text-sm">
                <span className="font-semibold">Target Completion:</span> December 2023
              </p>
            </div>
          </div>
        </div>

        {/* Transaction Volume */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineShoppingCart className="text-xl" />
              Transaction Volume
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transactionVolumeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Legend />
                  <Bar 
                    dataKey="volume" 
                    name="Transactions" 
                    fill="#3abff8" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Weekly Total:</span> {transactionVolumeData.reduce((sum, item) => sum + item.volume, 0).toLocaleString()} transactions
              </p>
              <p className="text-sm">
                <span className="font-semibold">Peak Day:</span> Saturday ({transactionVolumeData[5].volume.toLocaleString()} transactions)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* POS System Types and Payment Methods */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* POS System Types */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineDevices className="text-xl" />
              POS System Types
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={posSystemTypesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {posSystemTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlinePayments className="text-xl" />
              Payment Methods
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentMethodsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Software Version Distribution */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineSettings className="text-xl" />
            Software Version Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={softwareVersionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="version" type="category" width={150} />
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Devices" 
                  fill="#36d399" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <p className="text-sm">
              <span className="font-semibold">Latest Version Adoption:</span> {Math.round((softwareVersionData[0].count / posSystemsData.deployedSystems) * 100)}% of deployed systems
            </p>
            <p className="text-sm">
              <span className="font-semibold">Pending Updates:</span> {posSystemsData.deployedSystems - softwareVersionData[0].count} systems
            </p>
          </div>
        </div>
      </div>

      {/* Maintenance History */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineUpdate className="text-xl" />
            Maintenance History
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={maintenanceHistoryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="preventive" 
                  name="Preventive Maintenance" 
                  fill="#36d399" 
                  stackId="a"
                />
                <Bar 
                  dataKey="corrective" 
                  name="Corrective Maintenance" 
                  fill="#f87272" 
                  stackId="a"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <p className="text-sm">
              <span className="font-semibold">Maintenance Trend:</span> 46% reduction in corrective maintenance over 6 months
            </p>
            <p className="text-sm">
              <span className="font-semibold">Preventive Maintenance Increase:</span> 56% increase in preventive maintenance
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Speed by Store */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineSpeed className="text-xl" />
            Transaction Speed by Store
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Avg. Transaction Time</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {transactionSpeedData.map((store, index) => (
                  <tr key={index}>
                    <td>{store.store}</td>
                    <td>{store.avgTime}s</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <progress 
                          className={`progress ${
                            store.avgTime < 3.0 ? 'progress-success' : 
                            store.avgTime < 3.5 ? 'progress-info' : 
                            'progress-warning'
                          } w-40`} 
                          value={Math.max(0, 5 - store.avgTime)} 
                          max="2"
                        ></progress>
                        <span className={
                          store.avgTime < 3.0 ? 'text-success' : 
                          store.avgTime < 3.5 ? 'text-info' : 
                          'text-warning'
                        }>
                          {store.avgTime < 3.0 ? 'Excellent' : 
                           store.avgTime < 3.5 ? 'Good' : 
                           'Needs Improvement'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* POS Hardware Specifications */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineMemory className="text-xl" />
            POS Hardware Specifications
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Processor</th>
                  <th>Memory</th>
                  <th>Storage</th>
                  <th>Display</th>
                  <th>Deployed Units</th>
                </tr>
              </thead>
              <tbody>
                {posHardwareSpecsData.map((hardware, index) => (
                  <tr key={index}>
                    <td><strong>{hardware.model}</strong></td>
                    <td>{hardware.processor}</td>
                    <td>{hardware.memory}</td>
                    <td>{hardware.storage}</td>
                    <td>{hardware.display}</td>
                    <td>{hardware.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* POS Issues */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineWarning className="text-xl" />
            Active POS Issues
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Device ID</th>
                  <th>Issue</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Reported At</th>
                </tr>
              </thead>
              <tbody>
                {posIssuesData.map((issue, index) => (
                  <tr key={index}>
                    <td>{issue.store}</td>
                    <td>{issue.deviceId}</td>
                    <td>{issue.issue}</td>
                    <td>
                      <span className={`badge ${
                        issue.priority === 'Critical' ? 'badge-error' : 
                        issue.priority === 'High' ? 'badge-warning' : 
                        issue.priority === 'Medium' ? 'badge-info' : 
                        'badge-ghost'
                      }`}>
                        {issue.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        issue.status === 'Open' ? 'badge-error' : 
                        issue.status === 'In Progress' ? 'badge-warning' : 
                        'badge-success'
                      }`}>
                        {issue.status}
                      </span>
                    </td>
                    <td>{issue.reportedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* POS Deployment Schedule */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineInventory2 className="text-xl" />
            POS Deployment Schedule
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Quantity</th>
                  <th>Scheduled Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {posDeploymentScheduleData.map((deployment, index) => (
                  <tr key={index}>
                    <td>{deployment.store}</td>
                    <td>{deployment.quantity}</td>
                    <td>{deployment.scheduledDate}</td>
                    <td>
                      <span className={`badge ${
                        deployment.status === 'Scheduled' ? 'badge-info' : 
                        deployment.status === 'Pending Approval' ? 'badge-warning' : 
                        deployment.status === 'Completed' ? 'badge-success' : 
                        'badge-ghost'
                      }`}>
                        {deployment.status}
                      </span>
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

export default POSSystems; 