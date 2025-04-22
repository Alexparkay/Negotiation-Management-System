import React, { useState } from 'react';
import { 
  MdOutlineStorage, 
  MdOutlineCloud, 
  MdOutlineRouter, 
  MdOutlineWarning, 
  MdOutlineSpeed, 
  MdOutlineMemory,
  MdOutlineRefresh,
  MdOutlineFilterAlt,
  MdCheckCircleOutline,
  MdOutlineErrorOutline,
  MdOutlineUpdate,
  MdOutlineDns,
  MdOutlineSettingsEthernet,
  MdOutlineMonitor,
  MdOutlineDataUsage
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
import { useNavigate, useLocation } from 'react-router-dom';
import ChartBox from '../components/charts/ChartBox';

const Infrastructure = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [filterRegion, setFilterRegion] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we have a store filter from navigation
  const storeId = location.state?.storeId;

  // Infrastructure overview data
  const infrastructureData = {
    totalServers: 248,
    activeServers: 236,
    warningServers: 8,
    criticalServers: 4,
    avgCpuUsage: 42, // percentage
    avgMemoryUsage: 58, // percentage
    avgStorageUsage: 67, // percentage
    avgUptime: 99.95, // percentage
    regions: [
      { name: 'North America', servers: 120, active: 115, warning: 3, critical: 2 },
      { name: 'Europe', servers: 80, active: 77, warning: 2, critical: 1 },
      { name: 'Asia Pacific', servers: 35, active: 32, warning: 2, critical: 1 },
      { name: 'Latin America', servers: 8, active: 7, warning: 1, critical: 0 },
      { name: 'Middle East & Africa', servers: 5, active: 5, warning: 0, critical: 0 }
    ]
  };

  // Server resource usage data
  const serverResourceData = [
    { time: '00:00', cpu: 35, memory: 50, storage: 65 },
    { time: '04:00', cpu: 28, memory: 45, storage: 65 },
    { time: '08:00', cpu: 45, memory: 55, storage: 66 },
    { time: '12:00', cpu: 52, memory: 65, storage: 67 },
    { time: '16:00', cpu: 48, memory: 62, storage: 67 },
    { time: '20:00', cpu: 40, memory: 58, storage: 68 },
    { time: '23:59', cpu: 35, memory: 52, storage: 68 },
  ];

  // Server distribution by type
  const serverTypeData = [
    { name: 'Web Servers', value: 35, color: '#36d399' },
    { name: 'Database Servers', value: 25, color: '#3abff8' },
    { name: 'Application Servers', value: 20, color: '#fbbd23' },
    { name: 'Storage Servers', value: 15, color: '#f87272' },
    { name: 'Backup Servers', value: 5, color: '#a991f7' },
  ];

  // Data center distribution
  const dataCenterData = [
    { name: 'Primary (US-East)', value: 40, color: '#36d399' },
    { name: 'Secondary (US-West)', value: 25, color: '#3abff8' },
    { name: 'Europe (Frankfurt)', value: 20, color: '#fbbd23' },
    { name: 'Asia (Singapore)', value: 10, color: '#f87272' },
    { name: 'Cloud Services', value: 5, color: '#a991f7' },
  ];

  // Server issues data
  const serverIssuesData = [
    { 
      server: 'web-srv-01', 
      location: 'US-East', 
      issue: 'High CPU Usage', 
      priority: 'Medium', 
      status: 'In Progress', 
      lastChecked: '5 minutes ago' 
    },
    { 
      server: 'db-srv-03', 
      location: 'US-East', 
      issue: 'Disk Space Warning', 
      priority: 'High', 
      status: 'Open', 
      lastChecked: '3 minutes ago' 
    },
    { 
      server: 'app-srv-05', 
      location: 'Europe', 
      issue: 'Memory Leak', 
      priority: 'Critical', 
      status: 'In Progress', 
      lastChecked: '2 minutes ago' 
    },
    { 
      server: 'storage-srv-02', 
      location: 'US-West', 
      issue: 'RAID Degraded', 
      priority: 'High', 
      status: 'Open', 
      lastChecked: '7 minutes ago' 
    },
    { 
      server: 'backup-srv-01', 
      location: 'Asia', 
      issue: 'Backup Job Failed', 
      priority: 'Medium', 
      status: 'Open', 
      lastChecked: '15 minutes ago' 
    },
  ];

  // Upcoming maintenance data
  const maintenanceData = [
    { 
      system: 'Database Cluster', 
      location: 'US-East', 
      type: 'Software Update', 
      scheduledDate: '2023-06-18 02:00 AM', 
      duration: '2 hours', 
      impact: 'Minimal' 
    },
    { 
      system: 'Storage Array', 
      location: 'US-West', 
      type: 'Firmware Upgrade', 
      scheduledDate: '2023-06-20 01:00 AM', 
      duration: '3 hours', 
      impact: 'Moderate' 
    },
    { 
      system: 'Network Core', 
      location: 'Europe', 
      type: 'Hardware Replacement', 
      scheduledDate: '2023-06-22 03:00 AM', 
      duration: '4 hours', 
      impact: 'Significant' 
    },
    { 
      system: 'Backup System', 
      location: 'All Regions', 
      type: 'Configuration Change', 
      scheduledDate: '2023-06-25 02:00 AM', 
      duration: '1 hour', 
      impact: 'Minimal' 
    },
    { 
      system: 'Web Server Farm', 
      location: 'Asia', 
      type: 'Capacity Expansion', 
      scheduledDate: '2023-06-27 01:00 AM', 
      duration: '2 hours', 
      impact: 'Minimal' 
    },
  ];

  // Network traffic data
  const networkTrafficData = [
    { time: '00:00', inbound: 25, outbound: 18 },
    { time: '04:00', inbound: 15, outbound: 12 },
    { time: '08:00', inbound: 35, outbound: 25 },
    { time: '12:00', inbound: 45, outbound: 35 },
    { time: '16:00', inbound: 40, outbound: 30 },
    { time: '20:00', inbound: 30, outbound: 22 },
    { time: '23:59', inbound: 25, outbound: 18 },
  ];

  // Navigation functions
  const navigateToServerDetails = (server: string) => {
    // In a real app, this would navigate to details for a specific server
    navigate('/infrastructure', { state: { serverId: server } });
  };

  const navigateToRegion = (region: string) => {
    // In a real app, this would filter infrastructure by region
    navigate('/infrastructure', { state: { region } });
  };

  const navigateToIssue = (issue: string) => {
    // In a real app, this would navigate to a specific issue
    navigate('/logs', { state: { issueId: issue } });
  };

  const navigateToMaintenance = (maintenance: any) => {
    // In a real app, this would navigate to maintenance details
    navigate('/infrastructure', { state: { maintenanceId: maintenance.system } });
  };

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">
          Infrastructure
          {storeId && <span className="ml-2 text-lg font-normal">- Store #{storeId}</span>}
        </h1>
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

      {/* Infrastructure Overview */}
      <div className="stats shadow mb-6 w-full bg-gradient-to-r from-base-200 to-base-100">
        <div className="stat cursor-pointer hover:bg-base-200 transition-all" onClick={() => navigate('/infrastructure')}>
          <div className="stat-figure text-primary">
            <MdOutlineStorage className="text-3xl" />
          </div>
          <div className="stat-title">Active Servers</div>
          <div className="stat-value text-primary">{infrastructureData.activeServers}</div>
          <div className="stat-desc">{Math.round(infrastructureData.activeServers / infrastructureData.totalServers * 100)}% of total</div>
        </div>
        
        <div className="stat cursor-pointer hover:bg-base-200 transition-all" onClick={() => navigate('/logs')}>
          <div className="stat-figure text-warning">
            <MdOutlineWarning className="text-3xl" />
          </div>
          <div className="stat-title">Warning Status</div>
          <div className="stat-value text-warning">{infrastructureData.warningServers}</div>
          <div className="stat-desc">Require attention</div>
        </div>
        
        <div className="stat cursor-pointer hover:bg-base-200 transition-all" onClick={() => navigate('/logs')}>
          <div className="stat-figure text-error">
            <MdOutlineErrorOutline className="text-3xl" />
          </div>
          <div className="stat-title">Critical Status</div>
          <div className="stat-value text-error">{infrastructureData.criticalServers}</div>
          <div className="stat-desc">Immediate action needed</div>
        </div>
        
        <div className="stat cursor-pointer hover:bg-base-200 transition-all" onClick={() => navigate('/infrastructure')}>
          <div className="stat-figure text-success">
            <MdCheckCircleOutline className="text-3xl" />
          </div>
          <div className="stat-title">Avg. Uptime</div>
          <div className="stat-value text-success">{infrastructureData.avgUptime}%</div>
          <div className="stat-desc">Last 30 days</div>
        </div>
      </div>

      {/* Resource Usage Charts */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Server Resource Usage */}
        <div className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-all" onClick={() => navigate('/infrastructure')}>
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineMemory className="text-xl" />
              Server Resource Usage
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={serverResourceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="cpu" 
                    name="CPU Usage (%)" 
                    stroke="#36d399" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="memory" 
                    name="Memory Usage (%)" 
                    stroke="#3abff8" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="storage" 
                    name="Storage Usage (%)" 
                    stroke="#f87272" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Average CPU Usage:</span> {infrastructureData.avgCpuUsage}%
              </p>
              <p className="text-sm">
                <span className="font-semibold">Average Memory Usage:</span> {infrastructureData.avgMemoryUsage}%
              </p>
              <p className="text-sm">
                <span className="font-semibold">Average Storage Usage:</span> {infrastructureData.avgStorageUsage}%
              </p>
            </div>
          </div>
        </div>

        {/* Network Traffic */}
        <div className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-all" onClick={() => navigate('/logs')}>
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineSettingsEthernet className="text-xl" />
              Network Traffic
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={networkTrafficData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#36d399" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#36d399" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3abff8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3abff8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="inbound" 
                    name="Inbound Traffic (Gbps)" 
                    stroke="#36d399" 
                    fill="url(#colorInbound)" 
                    activeDot={{ r: 8, fill: '#36d399', onClick: () => navigate('/logs') }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="outbound" 
                    name="Outbound Traffic (Gbps)" 
                    stroke="#3abff8" 
                    fill="url(#colorOutbound)" 
                    activeDot={{ r: 8, fill: '#3abff8', onClick: () => navigate('/logs') }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Peak Inbound:</span> 45 Gbps
              </p>
              <p className="text-sm">
                <span className="font-semibold">Peak Outbound:</span> 35 Gbps
              </p>
              <p className="text-sm">
                <span className="font-semibold">Available Bandwidth:</span> 100 Gbps
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Server Distribution */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Server Types */}
        <div className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-all" onClick={() => navigate('/it-hardware')}>
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineStorage className="text-xl" />
              Server Distribution by Type
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serverTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    innerRadius={30}
                    paddingAngle={2}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    onClick={(data) => navigate('/it-hardware', { state: { serverType: data.name } })}
                  >
                    {serverTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Servers']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm font-medium">Total Servers: {infrastructureData.totalServers}</span>
            </div>
          </div>
        </div>

        {/* Data Center Distribution */}
        <div className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-all" onClick={() => navigate('/stores')}>
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineCloud className="text-xl" />
              Data Center Distribution
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataCenterData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    innerRadius={30}
                    paddingAngle={2}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    onClick={(data) => navigateToRegion(data.name)}
                  >
                    {dataCenterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Capacity']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm font-medium">5 Data Centers Worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Server Issues */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineWarning className="text-xl" />
            Active Server Issues
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Server</th>
                  <th>Location</th>
                  <th>Issue</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Last Checked</th>
                </tr>
              </thead>
              <tbody>
                {serverIssuesData.map((issue, index) => (
                  <tr key={index}>
                    <td>{issue.server}</td>
                    <td>{issue.location}</td>
                    <td>{issue.issue}</td>
                    <td>
                      <span className={`badge ${
                        issue.priority === 'Critical' ? 'badge-error' : 
                        issue.priority === 'High' ? 'badge-warning' : 
                        'badge-info'
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
                    <td>{issue.lastChecked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upcoming Maintenance */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineUpdate className="text-xl" />
            Upcoming Maintenance
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>System</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Scheduled Date</th>
                  <th>Duration</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceData.map((maintenance, index) => (
                  <tr key={index}>
                    <td>{maintenance.system}</td>
                    <td>{maintenance.location}</td>
                    <td>{maintenance.type}</td>
                    <td>{maintenance.scheduledDate}</td>
                    <td>{maintenance.duration}</td>
                    <td>
                      <span className={`badge ${
                        maintenance.impact === 'Significant' ? 'badge-error' : 
                        maintenance.impact === 'Moderate' ? 'badge-warning' : 
                        'badge-info'
                      }`}>
                        {maintenance.impact}
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

export default Infrastructure; 