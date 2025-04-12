import React, { useState } from 'react';
import { 
  MdComputer, 
  MdStorage, 
  MdDevices, 
  MdWifi, 
  MdPrint, 
  MdOutlineWarning, 
  MdOutlineDevices, 
  MdOutlineRouter, 
  MdOutlineComputer,
  MdOutlineFilterAlt,
  MdOutlineRefresh,
  MdOutlineMonitor,
  MdOutlinePhoneIphone,
  MdOutlineTablet,
  MdOutlineMemory,
  MdOutlineUpdate,
  MdOutlineInventory2,
  MdOutlineShoppingCart
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
import ChartBox from '../components/charts/ChartBox';
import { useNavigate } from 'react-router-dom';

const ITHardware = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [filterRegion, setFilterRegion] = useState('all');
  const navigate = useNavigate();

  // Hardware data
  const hardwareData = {
    totalDevices: 12400,
    deployedDevices: 7440,
    pendingDeployment: 4960,
    categories: [
      { name: 'POS Systems', value: 4960, completion: 65 },
      { name: 'Workstations', value: 3720, completion: 58 },
      { name: 'Security Systems', value: 3720, completion: 57 }
    ],
    avgDeploymentTime: 10, // days
    defectiveRate: 2.3, // percentage
    maintenanceScheduled: 128,
    endOfLifeDevices: 342
  };

  // POS trend data
  const posTrendData = [
    { name: 'Jan', pos: 40 },
    { name: 'Feb', pos: 45 },
    { name: 'Mar', pos: 50 },
    { name: 'Apr', pos: 55 },
    { name: 'May', pos: 60 },
    { name: 'Jun', pos: 65 },
  ];

  // Workstation trend data
  const workstationTrendData = [
    { name: 'Jan', workstation: 35 },
    { name: 'Feb', workstation: 40 },
    { name: 'Mar', workstation: 45 },
    { name: 'Apr', workstation: 50 },
    { name: 'May', workstation: 55 },
    { name: 'Jun', workstation: 58 },
  ];

  // Hardware by region data
  const regionPieData = [
    { name: 'North America', value: 45, color: '#36d399' },
    { name: 'Europe', value: 30, color: '#3abff8' },
    { name: 'Asia Pacific', value: 15, color: '#f87272' },
    { name: 'Latin America', value: 7, color: '#fbbd23' },
    { name: 'Middle East & Africa', value: 3, color: '#a991f7' }
  ];

  // Hardware issues data
  const issuesData = [
    { device: 'POS Terminal', location: 'Chicago Store', issue: 'Display Failure', priority: 'High', status: 'In Progress' },
    { device: 'Router', location: 'New York Store', issue: 'Connectivity Issues', priority: 'High', status: 'Open' },
    { device: 'Security Camera', location: 'Los Angeles Store', issue: 'Power Supply', priority: 'Medium', status: 'In Progress' },
    { device: 'Workstation', location: 'Miami Store', issue: 'Software Crash', priority: 'Medium', status: 'Open' },
    { device: 'Printer', location: 'Dallas Store', issue: 'Paper Jam', priority: 'Low', status: 'Resolved' },
  ];

  // Hardware by type data
  const hardwareTypeData = [
    { name: 'POS Terminals', value: 40, color: '#36d399' },
    { name: 'Workstations', value: 30, color: '#3abff8' },
    { name: 'Mobile Devices', value: 15, color: '#fbbd23' },
    { name: 'Printers', value: 8, color: '#f87272' },
    { name: 'Networking', value: 5, color: '#a991f7' },
    { name: 'Other', value: 2, color: '#6c757d' }
  ];

  // Hardware age distribution
  const hardwareAgeData = [
    { age: '< 1 year', count: 2500 },
    { age: '1-2 years', count: 3800 },
    { age: '2-3 years', count: 2900 },
    { age: '3-4 years', count: 1800 },
    { age: '4-5 years', count: 1100 },
    { age: '> 5 years', count: 300 },
  ];

  // Hardware procurement forecast
  const procurementForecastData = [
    { month: 'Jul', amount: 125000 },
    { month: 'Aug', amount: 180000 },
    { month: 'Sep', amount: 210000 },
    { month: 'Oct', amount: 150000 },
    { month: 'Nov', amount: 120000 },
    { month: 'Dec', amount: 90000 },
  ];

  // Hardware inventory by store
  const inventoryByStoreData = [
    { 
      store: 'Chicago Downtown', 
      posTerminals: 24, 
      workstations: 18, 
      printers: 12, 
      mobileDevices: 15, 
      networkEquipment: 8 
    },
    { 
      store: 'New York Flagship', 
      posTerminals: 32, 
      workstations: 25, 
      printers: 18, 
      mobileDevices: 22, 
      networkEquipment: 12 
    },
    { 
      store: 'Los Angeles Mall', 
      posTerminals: 20, 
      workstations: 15, 
      printers: 10, 
      mobileDevices: 12, 
      networkEquipment: 6 
    },
    { 
      store: 'Miami Beach', 
      posTerminals: 16, 
      workstations: 12, 
      printers: 8, 
      mobileDevices: 10, 
      networkEquipment: 5 
    },
    { 
      store: 'Dallas Outlet', 
      posTerminals: 18, 
      workstations: 14, 
      printers: 9, 
      mobileDevices: 11, 
      networkEquipment: 6 
    },
  ];

  // Hardware maintenance schedule
  const maintenanceScheduleData = [
    { 
      store: 'Chicago Downtown', 
      deviceType: 'POS Terminals', 
      scheduledDate: '2023-06-20', 
      deviceCount: 24, 
      estimatedDuration: '4 hours', 
      technician: 'John Smith' 
    },
    { 
      store: 'New York Flagship', 
      deviceType: 'Workstations', 
      scheduledDate: '2023-06-22', 
      deviceCount: 25, 
      estimatedDuration: '6 hours', 
      technician: 'Sarah Johnson' 
    },
    { 
      store: 'Los Angeles Mall', 
      deviceType: 'Network Equipment', 
      scheduledDate: '2023-06-25', 
      deviceCount: 6, 
      estimatedDuration: '3 hours', 
      technician: 'Mike Williams' 
    },
    { 
      store: 'Miami Beach', 
      deviceType: 'Printers', 
      scheduledDate: '2023-06-28', 
      deviceCount: 8, 
      estimatedDuration: '2 hours', 
      technician: 'Lisa Brown' 
    },
    { 
      store: 'Dallas Outlet', 
      deviceType: 'Security Systems', 
      scheduledDate: '2023-07-02', 
      deviceCount: 12, 
      estimatedDuration: '5 hours', 
      technician: 'David Garcia' 
    },
  ];

  // End of life devices by quarter
  const eolDevicesData = [
    { quarter: 'Q3 2023', count: 120 },
    { quarter: 'Q4 2023', count: 85 },
    { quarter: 'Q1 2024', count: 210 },
    { quarter: 'Q2 2024', count: 180 },
    { quarter: 'Q3 2024', count: 150 },
    { quarter: 'Q4 2024', count: 95 },
  ];

  // Navigation functions
  const navigateToHardwareType = (type: string) => {
    // In a real app, this would navigate to a filtered view of hardware by type
    navigate('/it-hardware', { state: { filterType: type } });
  };

  const navigateToRegion = (region: string) => {
    // In a real app, this would navigate to a filtered view of hardware by region
    navigate('/it-hardware', { state: { filterRegion: region } });
  };

  const navigateToIssue = (issue: string) => {
    // In a real app, this would navigate to the specific issue details
    navigate('/logs', { state: { issueId: issue } });
  };

  const navigateToStore = (store: string) => {
    // In a real app, this would navigate to the specific store
    navigate('/stores', { state: { storeFilter: store } });
  };

  const navigateToProcurement = () => {
    navigate('/procurement');
  };

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">IT Hardware</h1>
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
          <button className="btn btn-primary" onClick={() => navigateToProcurement()}>
            <MdOutlineComputer className="text-xl" />
            Add Device
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/logs')}>
            <MdOutlineWarning className="text-xl" />
            Report Issue
          </button>
        </div>
      </div>

      {/* Hardware Stats */}
      <div className="stats shadow mb-6 w-full bg-gradient-to-r from-base-200 to-base-100">
        <div className="stat cursor-pointer hover:bg-base-200 transition-all" onClick={() => navigateToHardwareType('all')}>
          <div className="stat-figure text-primary">
            <MdOutlineDevices className="text-3xl" />
          </div>
          <div className="stat-title">Total Devices</div>
          <div className="stat-value text-primary">{hardwareData.totalDevices}</div>
          <div className="stat-desc">{hardwareData.deployedDevices} deployed</div>
        </div>
        
        <div className="stat cursor-pointer hover:bg-base-200 transition-all" onClick={() => navigateToHardwareType('pos')}>
          <div className="stat-figure text-success">
            <MdOutlineComputer className="text-3xl" />
          </div>
          <div className="stat-title">POS Systems</div>
          <div className="stat-value text-success">{hardwareData.categories[0].completion}%</div>
          <div className="stat-desc">Deployment complete</div>
        </div>
        
        <div className="stat cursor-pointer hover:bg-base-200 transition-all" onClick={() => navigate('/it-hardware?filter=maintenance')}>
          <div className="stat-figure text-warning">
            <MdOutlineUpdate className="text-xl" />
          </div>
          <div className="stat-title">Maintenance</div>
          <div className="stat-value text-warning">{hardwareData.maintenanceScheduled}</div>
          <div className="stat-desc">Devices scheduled</div>
        </div>
        
        <div className="stat cursor-pointer hover:bg-base-200 transition-all" onClick={() => navigate('/procurement')}>
          <div className="stat-figure text-error">
            <MdOutlineWarning className="text-3xl" />
          </div>
          <div className="stat-title">End of Life</div>
          <div className="stat-value text-error">{hardwareData.endOfLifeDevices}</div>
          <div className="stat-desc">Devices to replace</div>
        </div>
      </div>

      {/* Hardware Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="card bg-base-100 shadow-xl col-span-2 cursor-pointer hover:shadow-2xl transition-all" onClick={() => navigate('/pos-systems')}>
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineComputer className="text-xl" />
              POS Systems Deployment
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={posTrendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorPOS" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#36d399" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#36d399" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Deployment']} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="pos" 
                    name="POS Systems" 
                    stroke="#36d399" 
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorPOS)"
                    activeDot={{ r: 8, fill: '#36d399' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <div className="stat-value text-success text-2xl">{hardwareData.categories[0].completion}%</div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">Target: 100%</span>
                <span className="text-xs">by December 2023</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl col-span-2 cursor-pointer hover:shadow-2xl transition-all" onClick={() => navigateToHardwareType('workstation')}>
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineDevices className="text-xl" />
              Workstations Deployment
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={workstationTrendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorWorkstation" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3abff8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3abff8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Deployment']} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="workstation" 
                    name="Workstations" 
                    stroke="#3abff8" 
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorWorkstation)"
                    activeDot={{ r: 8, fill: '#3abff8' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <div className="stat-value text-info text-2xl">{hardwareData.categories[1].completion}%</div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">Target: 100%</span>
                <span className="text-xs">by December 2023</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl col-span-2 cursor-pointer hover:shadow-2xl transition-all" onClick={() => navigate('/stores')}>
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineDevices className="text-xl" />
              Hardware by Region
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    innerRadius={30}
                    paddingAngle={2}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    onClick={(data) => navigateToRegion(data.name)}
                  >
                    {regionPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} devices`, 'Quantity']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl col-span-2 cursor-pointer hover:shadow-2xl transition-all" onClick={() => navigateToHardwareType('all')}>
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineInventory2 className="text-xl" />
              Hardware by Type
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hardwareTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    innerRadius={30}
                    paddingAngle={2}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    onClick={(data) => navigateToHardwareType(data.name)}
                  >
                    {hardwareTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Age and Procurement */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Hardware Age Distribution */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineMemory className="text-xl" />
              Hardware Age Distribution
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hardwareAgeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    name="Device Count" 
                    fill="#3abff8" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2">
              <p className="text-sm">
                <span className="font-semibold">Average Device Age:</span> 2.3 years
              </p>
              <p className="text-sm">
                <span className="font-semibold">Devices &gt; 4 years:</span> {hardwareAgeData[4].count + hardwareAgeData[5].count} ({Math.round((hardwareAgeData[4].count + hardwareAgeData[5].count) / hardwareData.totalDevices * 100)}% of total)
              </p>
            </div>
          </div>
        </div>

        {/* Procurement Forecast */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineShoppingCart className="text-xl" />
              Hardware Procurement Forecast
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={procurementForecastData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    name="Procurement Budget ($)" 
                    stroke="#36d399" 
                    fill="#36d39944" 
                    activeDot={{ r: 8 }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2">
              <p className="text-sm">
                <span className="font-semibold">Total H2 2023 Budget:</span> $875,000
              </p>
              <p className="text-sm">
                <span className="font-semibold">Primary Focus:</span> POS Terminal Upgrades
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* End of Life Devices */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineUpdate className="text-xl" />
            End of Life Devices by Quarter
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={eolDevicesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Devices Reaching EOL" 
                  fill="#f87272" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2">
            <p className="text-sm">
              <span className="font-semibold">Total EOL Next 12 Months:</span> {eolDevicesData.reduce((sum, item) => sum + item.count, 0)} devices
            </p>
            <p className="text-sm">
              <span className="font-semibold">Estimated Replacement Cost:</span> ${(eolDevicesData.reduce((sum, item) => sum + item.count, 0) * 1200).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Hardware Issues */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineWarning className="text-xl" />
            Hardware Issues
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Location</th>
                  <th>Issue</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {issuesData.map((issue, index) => (
                  <tr key={index} className="hover:bg-base-200 cursor-pointer" onClick={() => navigateToIssue(issue.device)}>
                    <td>{issue.device}</td>
                    <td className="cursor-pointer hover:underline" onClick={(e) => { e.stopPropagation(); navigateToStore(issue.location); }}>{issue.location}</td>
                    <td>{issue.issue}</td>
                    <td>
                      <span className={`badge ${
                        issue.priority === 'High' ? 'badge-error' : 
                        issue.priority === 'Medium' ? 'badge-warning' : 
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
                    <td>
                      <button className="btn btn-xs btn-outline" onClick={(e) => { e.stopPropagation(); navigate('/logs'); }}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Hardware Inventory by Store */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineInventory2 className="text-xl" />
            Hardware Inventory by Store
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>POS Terminals</th>
                  <th>Workstations</th>
                  <th>Printers</th>
                  <th>Mobile Devices</th>
                  <th>Network Equipment</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {inventoryByStoreData.map((inventory, index) => {
                  const total = inventory.posTerminals + inventory.workstations + 
                                inventory.printers + inventory.mobileDevices + 
                                inventory.networkEquipment;
                  return (
                    <tr key={index}>
                      <td>{inventory.store}</td>
                      <td>{inventory.posTerminals}</td>
                      <td>{inventory.workstations}</td>
                      <td>{inventory.printers}</td>
                      <td>{inventory.mobileDevices}</td>
                      <td>{inventory.networkEquipment}</td>
                      <td><strong>{total}</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineUpdate className="text-xl" />
            Upcoming Maintenance Schedule
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Device Type</th>
                  <th>Device Count</th>
                  <th>Scheduled Date</th>
                  <th>Duration</th>
                  <th>Technician</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceScheduleData.map((maintenance, index) => (
                  <tr key={index}>
                    <td>{maintenance.store}</td>
                    <td>{maintenance.deviceType}</td>
                    <td>{maintenance.deviceCount}</td>
                    <td>{maintenance.scheduledDate}</td>
                    <td>{maintenance.estimatedDuration}</td>
                    <td>{maintenance.technician}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Deployment Schedule */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineComputer className="text-xl" />
            Upcoming Hardware Deployments
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Hardware Type</th>
                  <th>Quantity</th>
                  <th>Scheduled Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Boston Downtown</td>
                  <td>POS Terminals</td>
                  <td>12</td>
                  <td>2023-06-20</td>
                  <td><span className="badge badge-info">Scheduled</span></td>
                </tr>
                <tr>
                  <td>Denver Outlet</td>
                  <td>Workstations</td>
                  <td>8</td>
                  <td>2023-06-22</td>
                  <td><span className="badge badge-info">Scheduled</span></td>
                </tr>
                <tr>
                  <td>Phoenix Mall</td>
                  <td>Security Cameras</td>
                  <td>15</td>
                  <td>2023-06-25</td>
                  <td><span className="badge badge-info">Scheduled</span></td>
                </tr>
                <tr>
                  <td>Portland Center</td>
                  <td>Network Switches</td>
                  <td>10</td>
                  <td>2023-06-28</td>
                  <td><span className="badge badge-warning">Pending Approval</span></td>
                </tr>
                <tr>
                  <td>San Diego Beach</td>
                  <td>Mobile Tablets</td>
                  <td>6</td>
                  <td>2023-07-02</td>
                  <td><span className="badge badge-warning">Pending Approval</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITHardware; 