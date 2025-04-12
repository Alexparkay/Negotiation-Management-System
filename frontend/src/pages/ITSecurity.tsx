import React, { useState } from 'react';
import { 
  MdOutlineSecurity, 
  MdOutlineWarning, 
  MdOutlineShield, 
  MdOutlineLock, 
  MdOutlineVpnKey, 
  MdOutlineRouter, 
  MdOutlineBackup, 
  MdOutlineVerified,
  MdOutlineFilterAlt,
  MdOutlineRefresh,
  MdOutlinePrivacyTip,
  MdOutlinePhishing,
  MdOutlineAdminPanelSettings,
  MdOutlineDevices,
  MdOutlineFireplace
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
import ChartBox from '../components/charts/ChartBox';

const ITSecurity = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [filterRegion, setFilterRegion] = useState('all');

  // Security data
  const securityData = {
    totalMeasures: 2540,
    implementedMeasures: 1397,
    pendingMeasures: 1143,
    categories: [
      { name: 'Firewalls', value: 847, completion: 63 },
      { name: 'Payment Security', value: 847, completion: 58 },
      { name: 'Backup Solutions', value: 846, completion: 43 }
    ],
    securityIncidents: 5,
    complianceRate: 94, // percentage
    vulnerabilities: {
      critical: 3,
      high: 12,
      medium: 28,
      low: 45
    }
  };

  // Security trend data
  const securityTrendData = [
    { name: 'Jan', security: 42 },
    { name: 'Feb', security: 48 },
    { name: 'Mar', security: 55 },
    { name: 'Apr', security: 62 },
    { name: 'May', security: 68 },
    { name: 'Jun', security: 72 },
  ];

  // Backup trend data
  const backupTrendData = [
    { name: 'Jan', backup: 35 },
    { name: 'Feb', backup: 40 },
    { name: 'Mar', backup: 45 },
    { name: 'Apr', backup: 50 },
    { name: 'May', backup: 55 },
    { name: 'Jun', backup: 60 },
  ];

  // Compliance data
  const compliancePieData = [
    { name: 'Compliant', value: 94, color: '#36d399' },
    { name: 'Non-Compliant', value: 6, color: '#f87272' },
  ];

  // Security incidents data
  const incidentsData = [
    { month: 'January', count: 2, severity: 'Medium', resolved: true },
    { month: 'February', count: 0, severity: 'None', resolved: true },
    { month: 'March', count: 1, severity: 'Low', resolved: true },
    { month: 'April', count: 0, severity: 'None', resolved: true },
    { month: 'May', count: 1, severity: 'High', resolved: false },
    { month: 'June', count: 1, severity: 'Medium', resolved: false },
  ];

  // Vulnerability by type data
  const vulnerabilityTypeData = [
    { name: 'Outdated Software', value: 35, color: '#36d399' },
    { name: 'Misconfiguration', value: 25, color: '#3abff8' },
    { name: 'Weak Authentication', value: 20, color: '#fbbd23' },
    { name: 'Unpatched Systems', value: 15, color: '#f87272' },
    { name: 'Other', value: 5, color: '#a991f7' },
  ];

  // Security incidents by type
  const incidentTypeData = [
    { name: 'Phishing Attempts', value: 45, color: '#f87272' },
    { name: 'Unauthorized Access', value: 25, color: '#fbbd23' },
    { name: 'Malware', value: 15, color: '#3abff8' },
    { name: 'Data Breach', value: 10, color: '#a991f7' },
    { name: 'DDoS', value: 5, color: '#36d399' },
  ];

  // Detailed vulnerabilities data
  const vulnerabilitiesData = [
    { 
      id: 'CVE-2023-1234', 
      system: 'POS Terminal Software', 
      severity: 'Critical', 
      description: 'Remote code execution vulnerability', 
      status: 'Open', 
      discoveredDate: '2023-06-01' 
    },
    { 
      id: 'CVE-2023-5678', 
      system: 'Windows Server 2019', 
      severity: 'High', 
      description: 'Privilege escalation vulnerability', 
      status: 'In Progress', 
      discoveredDate: '2023-05-15' 
    },
    { 
      id: 'CVE-2023-9012', 
      system: 'Network Firewall', 
      severity: 'Medium', 
      description: 'Denial of service vulnerability', 
      status: 'In Progress', 
      discoveredDate: '2023-05-20' 
    },
    { 
      id: 'CVE-2023-3456', 
      system: 'Database Server', 
      severity: 'High', 
      description: 'SQL injection vulnerability', 
      status: 'Open', 
      discoveredDate: '2023-06-05' 
    },
    { 
      id: 'CVE-2023-7890', 
      system: 'Web Application', 
      severity: 'Medium', 
      description: 'Cross-site scripting vulnerability', 
      status: 'Resolved', 
      discoveredDate: '2023-04-10' 
    },
  ];

  // Compliance by standard data
  const complianceByStandardData = [
    { standard: 'PCI DSS', compliance: 96, status: 'Compliant' },
    { standard: 'GDPR', compliance: 92, status: 'Compliant' },
    { standard: 'ISO 27001', compliance: 88, status: 'Compliant' },
    { standard: 'NIST CSF', compliance: 85, status: 'Compliant' },
    { standard: 'SOC 2', compliance: 90, status: 'Compliant' },
  ];

  // Security audit history
  const securityAuditData = [
    { 
      date: '2023-06-01', 
      type: 'Internal', 
      scope: 'Network Infrastructure', 
      findings: 3, 
      status: 'Completed', 
      nextAudit: '2023-09-01' 
    },
    { 
      date: '2023-05-15', 
      type: 'External', 
      scope: 'PCI Compliance', 
      findings: 2, 
      status: 'Completed', 
      nextAudit: '2023-11-15' 
    },
    { 
      date: '2023-04-10', 
      type: 'Internal', 
      scope: 'Application Security', 
      findings: 5, 
      status: 'Completed', 
      nextAudit: '2023-07-10' 
    },
    { 
      date: '2023-03-20', 
      type: 'External', 
      scope: 'Penetration Testing', 
      findings: 7, 
      status: 'Completed', 
      nextAudit: '2023-09-20' 
    },
    { 
      date: '2023-02-05', 
      type: 'Internal', 
      scope: 'Physical Security', 
      findings: 2, 
      status: 'Completed', 
      nextAudit: '2023-08-05' 
    },
  ];

  // Phishing simulation data
  const phishingSimulationData = [
    { month: 'January', clickRate: 12 },
    { month: 'February', clickRate: 10 },
    { month: 'March', clickRate: 8 },
    { month: 'April', clickRate: 7 },
    { month: 'May', clickRate: 6 },
    { month: 'June', clickRate: 5 },
  ];

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">IT Security</h1>
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
            <MdOutlineSecurity className="text-xl" />
            Security Audit
          </button>
          <button className="btn btn-outline">
            <MdOutlineBackup className="text-xl" />
            Backup Status
          </button>
        </div>
      </div>

      {/* Security Stats */}
      <div className="stats shadow mb-6 w-full bg-gradient-to-r from-base-200 to-base-100">
        <div className="stat">
          <div className="stat-figure text-primary">
            <MdOutlineSecurity className="text-3xl" />
          </div>
          <div className="stat-title">Security Measures</div>
          <div className="stat-value text-primary">{securityData.totalMeasures}</div>
          <div className="stat-desc">{securityData.implementedMeasures} implemented</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-success">
            <MdOutlineVerified className="text-3xl" />
          </div>
          <div className="stat-title">Compliance Rate</div>
          <div className="stat-value text-success">{securityData.complianceRate}%</div>
          <div className="stat-desc">Industry standard: 90%</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-warning">
            <MdOutlineWarning className="text-3xl" />
          </div>
          <div className="stat-title">Security Incidents</div>
          <div className="stat-value text-warning">{securityData.securityIncidents}</div>
          <div className="stat-desc">Last 6 months</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-error">
            <MdOutlinePrivacyTip className="text-3xl" />
          </div>
          <div className="stat-title">Critical Vulnerabilities</div>
          <div className="stat-value text-error">{securityData.vulnerabilities.critical}</div>
          <div className="stat-desc">Require immediate action</div>
        </div>
      </div>

      {/* Security Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="card bg-base-100 shadow-xl col-span-2">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineFireplace className="text-xl" />
              Firewall Status
            </h2>
            <div className="h-64">
              <ChartBox
                chartType={'line'}
                IconBox={MdOutlineRouter}
                title="Firewall"
                color="#36d399"
                number={`${securityData.categories[0].completion}%`}
                dataKey="security"
                chartData={securityTrendData}
                percentage={5}
                isLoading={false}
                isSuccess={true}
              />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl col-span-2">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineBackup className="text-xl" />
              Backup Solutions
            </h2>
            <div className="h-64">
              <ChartBox
                chartType={'line'}
                IconBox={MdOutlineBackup}
                title="Backup"
                color="#3abff8"
                number={`${securityData.categories[2].completion}%`}
                dataKey="backup"
                chartData={backupTrendData}
                percentage={8}
                isLoading={false}
                isSuccess={true}
              />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl col-span-2">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineVerified className="text-xl" />
              Compliance Status
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={compliancePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    innerRadius={40}
                    paddingAngle={2}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {compliancePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Compliance']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <div className="stat-value text-success text-2xl">{securityData.complianceRate}%</div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">Target: 95%</span>
                <span className="text-xs">Industry avg: 90%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl col-span-2">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlinePhishing className="text-xl" />
              Phishing Simulation Results
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={phishingSimulationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="clickRate" 
                    name="Click Rate (%)" 
                    fill="#f87272" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2">
              <p className="text-sm">
                <span className="font-semibold">Current Click Rate:</span> 5% (Industry avg: 7.5%)
              </p>
              <p className="text-sm">
                <span className="font-semibold">Improvement:</span> 58% reduction in 6 months
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vulnerability Distribution */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Vulnerability by Type */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlineWarning className="text-xl" />
              Vulnerabilities by Type
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vulnerabilityTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {vulnerabilityTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Security Incidents by Type */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <MdOutlinePrivacyTip className="text-xl" />
              Security Incidents by Type
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incidentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {incidentTypeData.map((entry, index) => (
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

      {/* Security Incidents */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineWarning className="text-xl" />
            Security Incidents
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Count</th>
                  <th>Severity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {incidentsData.map((incident, index) => (
                  <tr key={index}>
                    <td>{incident.month}</td>
                    <td>{incident.count}</td>
                    <td>
                      <span className={`badge ${
                        incident.severity === 'High' ? 'badge-error' : 
                        incident.severity === 'Medium' ? 'badge-warning' : 
                        incident.severity === 'Low' ? 'badge-info' : 'badge-ghost'
                      }`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td>
                      {incident.resolved ? 
                        <span className="badge badge-success">Resolved</span> : 
                        <span className="badge badge-error">Open</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Active Vulnerabilities */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlinePrivacyTip className="text-xl" />
            Active Vulnerabilities
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>System</th>
                  <th>Severity</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Discovered</th>
                </tr>
              </thead>
              <tbody>
                {vulnerabilitiesData.map((vulnerability, index) => (
                  <tr key={index}>
                    <td>{vulnerability.id}</td>
                    <td>{vulnerability.system}</td>
                    <td>
                      <span className={`badge ${
                        vulnerability.severity === 'Critical' ? 'badge-error' : 
                        vulnerability.severity === 'High' ? 'badge-warning' : 
                        vulnerability.severity === 'Medium' ? 'badge-info' : 'badge-ghost'
                      }`}>
                        {vulnerability.severity}
                      </span>
                    </td>
                    <td>{vulnerability.description}</td>
                    <td>
                      <span className={`badge ${
                        vulnerability.status === 'Open' ? 'badge-error' : 
                        vulnerability.status === 'In Progress' ? 'badge-warning' : 
                        'badge-success'
                      }`}>
                        {vulnerability.status}
                      </span>
                    </td>
                    <td>{vulnerability.discoveredDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Compliance by Standard */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineVerified className="text-xl" />
            Compliance by Standard
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Standard</th>
                  <th>Compliance Rate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complianceByStandardData.map((compliance, index) => (
                  <tr key={index}>
                    <td>{compliance.standard}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <progress 
                          className={`progress ${
                            compliance.compliance >= 90 ? 'progress-success' : 
                            compliance.compliance >= 80 ? 'progress-warning' : 
                            'progress-error'
                          } w-40`} 
                          value={compliance.compliance} 
                          max="100"
                        ></progress>
                        <span>{compliance.compliance}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        compliance.status === 'Compliant' ? 'badge-success' : 
                        compliance.status === 'Partially Compliant' ? 'badge-warning' : 
                        'badge-error'
                      }`}>
                        {compliance.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Security Audit History */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineAdminPanelSettings className="text-xl" />
            Security Audit History
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Scope</th>
                  <th>Findings</th>
                  <th>Status</th>
                  <th>Next Audit</th>
                </tr>
              </thead>
              <tbody>
                {securityAuditData.map((audit, index) => (
                  <tr key={index}>
                    <td>{audit.date}</td>
                    <td>{audit.type}</td>
                    <td>{audit.scope}</td>
                    <td>{audit.findings}</td>
                    <td>
                      <span className={`badge ${
                        audit.status === 'Completed' ? 'badge-success' : 
                        audit.status === 'In Progress' ? 'badge-warning' : 
                        'badge-info'
                      }`}>
                        {audit.status}
                      </span>
                    </td>
                    <td>{audit.nextAudit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <MdOutlineShield className="text-xl" />
            Security Recommendations
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Recommendation</th>
                  <th>Impact</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="badge badge-error">High</span></td>
                  <td>Update firewall rules for Chicago store</td>
                  <td>Prevents unauthorized access</td>
                  <td><span className="badge badge-warning">In Progress</span></td>
                </tr>
                <tr>
                  <td><span className="badge badge-warning">Medium</span></td>
                  <td>Implement multi-factor authentication for all admin accounts</td>
                  <td>Enhances account security</td>
                  <td><span className="badge badge-warning">In Progress</span></td>
                </tr>
                <tr>
                  <td><span className="badge badge-error">High</span></td>
                  <td>Patch critical vulnerability in POS system</td>
                  <td>Prevents potential data breach</td>
                  <td><span className="badge badge-error">Open</span></td>
                </tr>
                <tr>
                  <td><span className="badge badge-info">Low</span></td>
                  <td>Update password policy</td>
                  <td>Improves password strength</td>
                  <td><span className="badge badge-success">Completed</span></td>
                </tr>
                <tr>
                  <td><span className="badge badge-warning">Medium</span></td>
                  <td>Encrypt backup data</td>
                  <td>Protects sensitive information</td>
                  <td><span className="badge badge-warning">In Progress</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITSecurity; 