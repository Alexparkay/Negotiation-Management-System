import React from 'react';
import { 
  MdOutlineNetworkCheck, 
  MdOutlineRouter, 
  MdCable, 
  MdOutlineComputer, 
  MdOutlineStorage, 
  MdOutlineWarning,
  MdOutlineTimer,
  MdOutlineDevices
} from 'react-icons/md';
import ChartBox from '../components/charts/ChartBox';
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

const Infrastructure = () => {
  // IT infrastructure data
  const networkSetupData = {
    totalTasks: 2540,
    completedTasks: 1428,
    inProgressTasks: 876,
    notStartedTasks: 236,
    criticalIssues: 47,
    categories: [
      { name: 'Cabling', value: 635, completion: 68 },
      { name: 'Network Server', value: 635, completion: 59 },
      { name: 'Routers & APs', value: 635, completion: 52 },
      { name: 'Internet & WiFi', value: 635, completion: 48 }
    ],
    avgCompletionTime: 14, // days
    delayedStores: 23
  };

  // Network infrastructure trend data
  const networkTrendData = [
    { name: 'Jan', network: 42 },
    { name: 'Feb', network: 48 },
    { name: 'Mar', network: 55 },
    { name: 'Apr', network: 62 },
    { name: 'May', network: 68 },
    { name: 'Jun', network: 72 },
  ];

  // WiFi trend data
  const wifiTrendData = [
    { name: 'Jan', wifi: 30 },
    { name: 'Feb', wifi: 35 },
    { name: 'Mar', wifi: 40 },
    { name: 'Apr', wifi: 43 },
    { name: 'May', wifi: 48 },
    { name: 'Jun', wifi: 52 },
  ];

  // Implementation timeline data
  const implementationTimelineData = [
    { name: 'Week 1', cabling: 20, servers: 10, network: 5 },
    { name: 'Week 2', cabling: 40, servers: 25, network: 15 },
    { name: 'Week 3', cabling: 55, servers: 40, network: 30 },
    { name: 'Week 4', cabling: 68, servers: 59, network: 52 },
  ];

  // Issues by region data
  const regionPieData = [
    { name: 'North America', value: 45, color: '#36d399' },
    { name: 'Europe', value: 30, color: '#3abff8' },
    { name: 'Asia Pacific', value: 15, color: '#f87272' },
    { name: 'Latin America', value: 7, color: '#fbbd23' },
    { name: 'Middle East & Africa', value: 3, color: '#a991f7' }
  ];

  // Critical issues data
  const criticalIssuesData = [
    { store: 'Chicago Downtown', issue: 'Network Server Failure', priority: 'Critical', status: 'In Progress', assignee: 'John Smith' },
    { store: 'New York Flagship', issue: 'Fiber Connection Down', priority: 'Critical', status: 'Open', assignee: 'Sarah Johnson' },
    { store: 'Los Angeles Mall', issue: 'Router Configuration', priority: 'High', status: 'In Progress', assignee: 'Mike Chen' },
    { store: 'Miami Beach', issue: 'WiFi Coverage Gaps', priority: 'Medium', status: 'Open', assignee: 'Lisa Wong' },
    { store: 'Dallas Outlet', issue: 'Cabling Damage', priority: 'High', status: 'In Progress', assignee: 'Robert Davis' },
  ];

  // Calculate overall IT readiness percentage
  const calculateOverallReadiness = () => {
    return Math.round(networkSetupData.completedTasks / networkSetupData.totalTasks * 100);
  };

  // Custom colors for charts
  const COLORS = ['#36d399', '#3abff8', '#f87272', '#fbbd23', '#a991f7'];

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">IT Infrastructure</h1>
        <div className="flex gap-2">
          <button className="btn btn-primary">
            <MdOutlineNetworkCheck className="text-xl" />
            Network Scan
          </button>
          <button className="btn btn-outline">
            <MdOutlineWarning className="text-xl" />
            Report Issue
          </button>
        </div>
      </div>

      {/* Infrastructure Overview */}
      <div className="stats shadow mb-6 w-full bg-gradient-to-r from-base-200 to-base-100">
        <div className="stat">
          <div className="stat-figure text-primary">
            <MdOutlineNetworkCheck className="text-3xl" />
          </div>
          <div className="stat-title">Overall Readiness</div>
          <div className="stat-value text-primary">{calculateOverallReadiness()}%</div>
          <div className="stat-desc">{networkSetupData.completedTasks} of {networkSetupData.totalTasks} tasks</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-success">
            <MdCable className="text-3xl" />
          </div>
          <div className="stat-title">Cabling</div>
          <div className="stat-value text-success">{networkSetupData.categories[0].completion}%</div>
          <div className="stat-desc">Installation complete</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-warning">
            <MdOutlineRouter className="text-3xl" />
          </div>
          <div className="stat-title">Network Devices</div>
          <div className="stat-value text-warning">{networkSetupData.categories[2].completion}%</div>
          <div className="stat-desc">Configuration complete</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-error">
            <MdOutlineWarning className="text-3xl" />
          </div>
          <div className="stat-title">Critical Issues</div>
          <div className="stat-value text-error">{networkSetupData.criticalIssues}</div>
          <div className="stat-desc">Across {networkSetupData.delayedStores} stores</div>
        </div>
      </div>

      {/* Infrastructure Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Network Cabling Status */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdCable className="text-xl" />
              Network Cabling Status
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={networkTrendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="network" 
                    name="Cabling Completion (%)" 
                    stroke="#36d399" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Current Status:</span> {networkSetupData.categories[0].completion}% complete
              </p>
              <p className="text-sm">
                <span className="font-semibold">Target Completion:</span> End of Q2 2023
              </p>
              <p className="text-sm">
                <span className="font-semibold">Responsible Team:</span> Network Infrastructure
              </p>
            </div>
          </div>
        </div>

        {/* WiFi Coverage */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineRouter className="text-xl" />
              WiFi Coverage
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={wifiTrendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="wifi" 
                    name="WiFi Coverage (%)" 
                    stroke="#3abff8" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Current Status:</span> {networkSetupData.categories[3].completion}% complete
              </p>
              <p className="text-sm">
                <span className="font-semibold">Target Completion:</span> End of Q3 2023
              </p>
              <p className="text-sm">
                <span className="font-semibold">Responsible Team:</span> Wireless Networks
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Timeline */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineTimer className="text-xl" />
              Implementation Timeline
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={implementationTimelineData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="cabling" 
                    name="Cabling" 
                    stackId="1" 
                    stroke="#36d399" 
                    fill="#36d399" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="servers" 
                    name="Servers" 
                    stackId="1" 
                    stroke="#3abff8" 
                    fill="#3abff8" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="network" 
                    name="Network Devices" 
                    stackId="1" 
                    stroke="#f87272" 
                    fill="#f87272" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Average Completion Time:</span> {networkSetupData.avgCompletionTime} days per store
              </p>
              <p className="text-sm">
                <span className="font-semibold">Delayed Stores:</span> {networkSetupData.delayedStores} stores behind schedule
              </p>
            </div>
          </div>
        </div>

        {/* Issues by Region */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineWarning className="text-xl" />
              Issues by Region
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {regionPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} issues`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Total Issues:</span> {networkSetupData.criticalIssues} across all regions
              </p>
              <p className="text-sm">
                <span className="font-semibold">Most Affected:</span> North America (45% of all issues)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Issues Table */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineWarning className="text-xl" />
            Critical Infrastructure Issues
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Issue</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assignee</th>
                </tr>
              </thead>
              <tbody>
                {criticalIssuesData.map((issue, index) => (
                  <tr key={index}>
                    <td>{issue.store}</td>
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
                    <td>{issue.assignee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Infrastructure Components */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineDevices className="text-xl" />
            Infrastructure Components
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Completion</th>
                  <th>Stores Deployed</th>
                  <th>Pending Stores</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cabling</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <progress className="progress progress-success" value={networkSetupData.categories[0].completion} max="100"></progress>
                      <span>{networkSetupData.categories[0].completion}%</span>
                    </div>
                  </td>
                  <td>272</td>
                  <td>128</td>
                  <td><span className="badge badge-success">On Track</span></td>
                </tr>
                <tr>
                  <td>Network Servers</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <progress className="progress progress-warning" value={networkSetupData.categories[1].completion} max="100"></progress>
                      <span>{networkSetupData.categories[1].completion}%</span>
                    </div>
                  </td>
                  <td>236</td>
                  <td>164</td>
                  <td><span className="badge badge-warning">Delayed</span></td>
                </tr>
                <tr>
                  <td>Routers & Access Points</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <progress className="progress progress-warning" value={networkSetupData.categories[2].completion} max="100"></progress>
                      <span>{networkSetupData.categories[2].completion}%</span>
                    </div>
                  </td>
                  <td>208</td>
                  <td>192</td>
                  <td><span className="badge badge-warning">Delayed</span></td>
                </tr>
                <tr>
                  <td>Internet & WiFi</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <progress className="progress progress-error" value={networkSetupData.categories[3].completion} max="100"></progress>
                      <span>{networkSetupData.categories[3].completion}%</span>
                    </div>
                  </td>
                  <td>192</td>
                  <td>208</td>
                  <td><span className="badge badge-error">At Risk</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;
