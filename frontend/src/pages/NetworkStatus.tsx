import React, { useState } from 'react';
import { 
  MdOutlineNetworkCheck, 
  MdOutlineRouter, 
  MdOutlineWifi, 
  MdOutlineWarning, 
  MdOutlineSpeed, 
  MdOutlineSignalWifiStatusbar4Bar,
  MdOutlineSignalWifiStatusbarConnectedNoInternet4,
  MdOutlineSignalWifiStatusbarNull,
  MdOutlineRefresh,
  MdOutlineFilterAlt,
  MdOutlineDns,
  MdOutlineSettingsEthernet,
  MdOutlineCloud,
  MdOutlineVpnLock
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
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const NetworkStatus = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [filterRegion, setFilterRegion] = useState('all');

  // Network status data
  const networkStatusData = {
    totalNetworks: 400,
    activeNetworks: 372,
    warningNetworks: 18,
    criticalNetworks: 10,
    avgUptime: 99.7,
    avgLatency: 24, // ms
    avgBandwidthUsage: 68, // percent
    regions: [
      { name: 'North America', active: 142, warning: 8, critical: 3 },
      { name: 'Europe', active: 115, warning: 4, critical: 1 },
      { name: 'Asia Pacific', active: 75, warning: 5, critical: 5 },
      { name: 'Latin America', active: 25, warning: 1, critical: 1 },
      { name: 'Middle East & Africa', active: 15, warning: 0, critical: 0 }
    ]
  };

  // Network performance data
  const networkPerformanceData = [
    { time: '00:00', latency: 22, bandwidth: 55, errors: 2 },
    { time: '04:00', latency: 20, bandwidth: 45, errors: 1 },
    { time: '08:00', latency: 25, bandwidth: 65, errors: 3 },
    { time: '12:00', latency: 30, bandwidth: 80, errors: 5 },
    { time: '16:00', latency: 28, bandwidth: 75, errors: 4 },
    { time: '20:00', latency: 24, bandwidth: 60, errors: 2 },
    { time: '23:59', latency: 22, bandwidth: 50, errors: 1 },
  ];

  // Network uptime data
  const networkUptimeData = [
    { date: 'Mon', uptime: 99.8 },
    { date: 'Tue', uptime: 99.9 },
    { date: 'Wed', uptime: 99.7 },
    { date: 'Thu', uptime: 99.5 },
    { date: 'Fri', uptime: 99.6 },
    { date: 'Sat', uptime: 99.9 },
    { date: 'Sun', uptime: 99.8 },
  ];

  // Network issues data
  const networkIssuesData = [
    { 
      store: 'Chicago Downtown', 
      status: 'Critical', 
      issue: 'Connection Lost', 
      downtime: '2h 15m', 
      impact: 'High', 
      lastChecked: '5 minutes ago' 
    },
    { 
      store: 'New York Flagship', 
      status: 'Warning', 
      issue: 'High Latency', 
      downtime: '0', 
      impact: 'Medium', 
      lastChecked: '3 minutes ago' 
    },
    { 
      store: 'Los Angeles Mall', 
      status: 'Warning', 
      issue: 'Packet Loss', 
      downtime: '0', 
      impact: 'Medium', 
      lastChecked: '7 minutes ago' 
    },
    { 
      store: 'Miami Beach', 
      status: 'Critical', 
      issue: 'Bandwidth Throttling', 
      downtime: '1h 30m', 
      impact: 'High', 
      lastChecked: '2 minutes ago' 
    },
    { 
      store: 'Seattle Center', 
      status: 'Warning', 
      issue: 'Intermittent Connection', 
      downtime: '0', 
      impact: 'Low', 
      lastChecked: '10 minutes ago' 
    },
  ];

  // WiFi status by store data
  const wifiStatusData = [
    { store: 'Chicago Downtown', signalStrength: 65, connectedDevices: 42, bandwidth: 75, status: 'Warning' },
    { store: 'New York Flagship', signalStrength: 85, connectedDevices: 78, bandwidth: 90, status: 'Active' },
    { store: 'Los Angeles Mall', signalStrength: 75, connectedDevices: 56, bandwidth: 80, status: 'Active' },
    { store: 'Miami Beach', signalStrength: 45, connectedDevices: 38, bandwidth: 60, status: 'Critical' },
    { store: 'Seattle Center', signalStrength: 70, connectedDevices: 45, bandwidth: 75, status: 'Active' },
    { store: 'Dallas Outlet', signalStrength: 80, connectedDevices: 52, bandwidth: 85, status: 'Active' },
    { store: 'Boston Downtown', signalStrength: 60, connectedDevices: 40, bandwidth: 70, status: 'Warning' },
    { store: 'Atlanta Mall', signalStrength: 90, connectedDevices: 65, bandwidth: 95, status: 'Active' },
  ];

  // Network traffic by region
  const networkTrafficByRegion = [
    { name: 'North America', value: 45, color: '#36d399' },
    { name: 'Europe', value: 30, color: '#3abff8' },
    { name: 'Asia Pacific', value: 15, color: '#f87272' },
    { name: 'Latin America', value: 7, color: '#fbbd23' },
    { name: 'Middle East & Africa', value: 3, color: '#a991f7' }
  ];

  // WAN connection types
  const wanConnectionTypes = [
    { name: 'Fiber', value: 65, color: '#36d399' },
    { name: 'Cable', value: 20, color: '#3abff8' },
    { name: 'DSL', value: 10, color: '#f87272' },
    { name: 'Satellite', value: 3, color: '#fbbd23' },
    { name: 'Cellular', value: 2, color: '#a991f7' }
  ];

  // VPN connection data
  const vpnConnectionData = [
    { time: '00:00', connections: 120 },
    { time: '04:00', connections: 85 },
    { time: '08:00', connections: 210 },
    { time: '12:00', connections: 310 },
    { time: '16:00', connections: 290 },
    { time: '20:00', connections: 180 },
    { time: '23:59', connections: 120 },
  ];

  // Network equipment status
  const networkEquipmentData = [
    { type: 'Routers', total: 85, operational: 82, warning: 2, critical: 1 },
    { type: 'Switches', total: 210, operational: 205, warning: 3, critical: 2 },
    { type: 'Firewalls', total: 45, operational: 44, warning: 1, critical: 0 },
    { type: 'Access Points', total: 320, operational: 310, warning: 7, critical: 3 },
    { type: 'Load Balancers', total: 12, operational: 12, warning: 0, critical: 0 },
  ];

  // Get status icon based on status
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Active':
        return <MdOutlineSignalWifiStatusbar4Bar className="text-success text-xl" />;
      case 'Warning':
        return <MdOutlineSignalWifiStatusbarConnectedNoInternet4 className="text-warning text-xl" />;
      case 'Critical':
        return <MdOutlineSignalWifiStatusbarNull className="text-error text-xl" />;
      default:
        return <MdOutlineWifi className="text-xl" />;
    }
  };

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Network Status</h1>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline">
              <MdOutlineFilterAlt className="text-xl" />
              {timeRange === 'all' ? 'All Time' : `Last ${timeRange}`}
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li onClick={() => setTimeRange('24h')}><a>Last 24 Hours</a></li>
              <li onClick={() => setTimeRange('7d')}><a>Last 7 Days</a></li>
              <li onClick={() => setTimeRange('30d')}><a>Last 30 Days</a></li>
              <li onClick={() => setTimeRange('all')}><a>All Time</a></li>
            </ul>
          </div>
          <button className="btn btn-primary">
            <MdOutlineRefresh className="text-xl" />
            Refresh Status
          </button>
        </div>
      </div>

      {/* Network Status Overview */}
      <div className="stats shadow mb-6 w-full bg-gradient-to-r from-base-200 to-base-100">
        <div className="stat">
          <div className="stat-figure text-success">
            <MdOutlineNetworkCheck className="text-3xl" />
          </div>
          <div className="stat-title">Active Networks</div>
          <div className="stat-value text-success">{networkStatusData.activeNetworks}</div>
          <div className="stat-desc">{Math.round(networkStatusData.activeNetworks / networkStatusData.totalNetworks * 100)}% of total</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-warning">
            <MdOutlineWifi className="text-3xl" />
          </div>
          <div className="stat-title">Warning Status</div>
          <div className="stat-value text-warning">{networkStatusData.warningNetworks}</div>
          <div className="stat-desc">Require attention</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-error">
            <MdOutlineWarning className="text-3xl" />
          </div>
          <div className="stat-title">Critical Status</div>
          <div className="stat-value text-error">{networkStatusData.criticalNetworks}</div>
          <div className="stat-desc">Immediate action needed</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-info">
            <MdOutlineSpeed className="text-3xl" />
          </div>
          <div className="stat-title">Avg. Uptime</div>
          <div className="stat-value text-info">{networkStatusData.avgUptime}%</div>
          <div className="stat-desc">Last 30 days</div>
        </div>
      </div>

      {/* Network Performance Charts */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Network Latency & Bandwidth */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineSpeed className="text-xl" />
              Network Performance
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={networkPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="latency" 
                    name="Latency (ms)" 
                    stroke="#3abff8" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="bandwidth" 
                    name="Bandwidth Usage (%)" 
                    stroke="#36d399" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Average Latency:</span> {networkStatusData.avgLatency}ms
              </p>
              <p className="text-sm">
                <span className="font-semibold">Average Bandwidth Usage:</span> {networkStatusData.avgBandwidthUsage}%
              </p>
              <p className="text-sm">
                <span className="font-semibold">Peak Bandwidth Usage:</span> 80%
              </p>
            </div>
          </div>
        </div>

        {/* Network Uptime */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineNetworkCheck className="text-xl" />
              Network Uptime
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={networkUptimeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[99, 100]} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="uptime" 
                    name="Uptime (%)" 
                    stroke="#36d399" 
                    fill="#36d39944" 
                    activeDot={{ r: 8 }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Weekly Average:</span> {networkStatusData.avgUptime}%
              </p>
              <p className="text-sm">
                <span className="font-semibold">SLA Target:</span> 99.9%
              </p>
              <p className="text-sm">
                <span className="font-semibold">Last Outage:</span> 3 days ago (15 minutes)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Network Distribution */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Traffic by Region */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineSettingsEthernet className="text-xl" />
              Network Traffic by Region
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={networkTrafficByRegion}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {networkTrafficByRegion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* WAN Connection Types */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineRouter className="text-xl" />
              WAN Connection Types
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wanConnectionTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {wanConnectionTypes.map((entry, index) => (
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

      {/* VPN Connections */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineVpnLock className="text-xl" />
            VPN Connections
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={vpnConnectionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="connections" 
                  name="Active VPN Connections" 
                  stroke="#3abff8" 
                  fill="#3abff844" 
                  activeDot={{ r: 8 }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <p className="text-sm">
              <span className="font-semibold">Peak Connections:</span> 310
            </p>
            <p className="text-sm">
              <span className="font-semibold">Current Connections:</span> 185
            </p>
            <p className="text-sm">
              <span className="font-semibold">VPN Capacity:</span> 500 concurrent connections
            </p>
          </div>
        </div>
      </div>

      {/* Network Equipment Status */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineRouter className="text-xl" />
            Network Equipment Status
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Equipment Type</th>
                  <th>Total</th>
                  <th>Operational</th>
                  <th>Warning</th>
                  <th>Critical</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {networkEquipmentData.map((equipment, index) => (
                  <tr key={index}>
                    <td>{equipment.type}</td>
                    <td>{equipment.total}</td>
                    <td>{equipment.operational}</td>
                    <td>{equipment.warning}</td>
                    <td>{equipment.critical}</td>
                    <td>
                      <progress 
                        className={`progress ${
                          (equipment.operational / equipment.total) > 0.95 ? 'progress-success' : 
                          (equipment.operational / equipment.total) > 0.9 ? 'progress-warning' : 
                          'progress-error'
                        } w-20`} 
                        value={equipment.operational} 
                        max={equipment.total}
                      ></progress>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Network Issues */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineWarning className="text-xl" />
            Active Network Issues
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Status</th>
                  <th>Issue</th>
                  <th>Downtime</th>
                  <th>Impact</th>
                  <th>Last Checked</th>
                </tr>
              </thead>
              <tbody>
                {networkIssuesData.map((issue, index) => (
                  <tr key={index}>
                    <td>{issue.store}</td>
                    <td>
                      <span className={`badge ${
                        issue.status === 'Critical' ? 'badge-error' : 
                        issue.status === 'Warning' ? 'badge-warning' : 
                        'badge-success'
                      }`}>
                        {issue.status}
                      </span>
                    </td>
                    <td>{issue.issue}</td>
                    <td>{issue.downtime}</td>
                    <td>
                      <span className={`badge ${
                        issue.impact === 'High' ? 'badge-error' : 
                        issue.impact === 'Medium' ? 'badge-warning' : 
                        'badge-info'
                      }`}>
                        {issue.impact}
                      </span>
                    </td>
                    <td>{issue.lastChecked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* WiFi Status by Store */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineWifi className="text-xl" />
            WiFi Status by Store
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Status</th>
                  <th>Signal Strength</th>
                  <th>Connected Devices</th>
                  <th>Bandwidth Usage</th>
                </tr>
              </thead>
              <tbody>
                {wifiStatusData.map((wifi, index) => (
                  <tr key={index}>
                    <td>{wifi.store}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(wifi.status)}
                        <span>{wifi.status}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <progress 
                          className={`progress ${
                            wifi.signalStrength > 70 ? 'progress-success' : 
                            wifi.signalStrength > 50 ? 'progress-warning' : 
                            'progress-error'
                          } w-20`} 
                          value={wifi.signalStrength} 
                          max="100"
                        ></progress>
                        <span>{wifi.signalStrength}%</span>
                      </div>
                    </td>
                    <td>{wifi.connectedDevices}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <progress 
                          className={`progress ${
                            wifi.bandwidth < 70 ? 'progress-success' : 
                            wifi.bandwidth < 90 ? 'progress-warning' : 
                            'progress-error'
                          } w-20`} 
                          value={wifi.bandwidth} 
                          max="100"
                        ></progress>
                        <span>{wifi.bandwidth}%</span>
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

export default NetworkStatus; 