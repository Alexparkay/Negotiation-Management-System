import { useState } from 'react';
import {
  MdOutlineWarning,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
  MdOutlineAssessment,
  MdOutlineLocationOn,
  MdOutlineCategory,
  MdOutlineAttachMoney,
  MdOutlineBusinessCenter,
} from 'react-icons/md';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

interface RiskAssessment {
  id: string;
  supplier: string;
  category: string;
  location: string;
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  financialRisk: number;
  operationalRisk: number;
  complianceRisk: number;
  reputationalRisk: number;
  lastAssessment: string;
  nextReview: string;
  mitigationPlan: string;
}

interface RiskMetrics {
  totalAssessments: number;
  highRiskSuppliers: number;
  pendingReviews: number;
  averageRiskScore: number;
  riskTrend: number;
  mitigationPlans: number;
}

const SupplierRisk = () => {
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock risk metrics
  const metrics: RiskMetrics = {
    totalAssessments: 120,
    highRiskSuppliers: 15,
    pendingReviews: 8,
    averageRiskScore: 2.4,
    riskTrend: -5,
    mitigationPlans: 12,
  };

  // Mock risk assessments
  const riskAssessments: RiskAssessment[] = [
    {
      id: '1',
      supplier: 'Acme Electronics',
      category: 'Electronics',
      location: 'Asia Pacific',
      overallRisk: 'medium',
      financialRisk: 2.5,
      operationalRisk: 2.0,
      complianceRisk: 1.8,
      reputationalRisk: 1.5,
      lastAssessment: '2024-01-15',
      nextReview: '2024-07-15',
      mitigationPlan: 'Regular financial monitoring, quarterly reviews',
    },
    {
      id: '2',
      supplier: 'Global Materials Inc',
      category: 'Raw Materials',
      location: 'North America',
      overallRisk: 'high',
      financialRisk: 3.8,
      operationalRisk: 3.2,
      complianceRisk: 2.9,
      reputationalRisk: 2.7,
      lastAssessment: '2024-02-01',
      nextReview: '2024-05-01',
      mitigationPlan: 'Weekly monitoring, monthly reviews, contingency planning',
    },
    {
      id: '3',
      supplier: 'FastShip Logistics',
      category: 'Logistics',
      location: 'Europe',
      overallRisk: 'low',
      financialRisk: 1.5,
      operationalRisk: 1.8,
      complianceRisk: 1.2,
      reputationalRisk: 1.4,
      lastAssessment: '2024-01-30',
      nextReview: '2024-07-30',
      mitigationPlan: 'Standard monitoring procedures',
    },
  ];

  // Mock risk trend data
  const riskTrendData = [
    { month: 'Sep', score: 2.8 },
    { month: 'Oct', score: 2.6 },
    { month: 'Nov', score: 2.5 },
    { month: 'Dec', score: 2.4 },
    { month: 'Jan', score: 2.3 },
    { month: 'Feb', score: 2.4 },
  ];

  // Risk distribution by category
  const riskDistributionData = [
    { category: 'Electronics', low: 8, medium: 5, high: 2, critical: 1 },
    { category: 'Raw Materials', low: 6, medium: 7, high: 4, critical: 2 },
    { category: 'Logistics', low: 10, medium: 4, high: 1, critical: 0 },
    { category: 'Services', low: 12, medium: 3, high: 1, critical: 0 },
  ];

  const getRiskBadge = (risk: RiskAssessment['overallRisk']) => {
    const riskConfig = {
      low: 'bg-success text-success-content',
      medium: 'bg-warning text-warning-content',
      high: 'bg-error text-error-content',
      critical: 'bg-error text-error-content font-bold',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${riskConfig[risk]}`}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)}
      </span>
    );
  };

  const getRiskColor = (score: number) => {
    if (score <= 1.5) return '#10B981';
    if (score <= 2.5) return '#F59E0B';
    if (score <= 3.5) return '#EF4444';
    return '#991B1B';
  };

  const filteredAssessments = riskAssessments.filter(assessment => {
    const matchesRisk = filterRisk === 'all' || assessment.overallRisk === filterRisk;
    const matchesSearch = assessment.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supplier Risk Management</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search suppliers..."
            className="input input-bordered input-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select select-bordered select-sm"
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
            <option value="critical">Critical Risk</option>
          </select>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">High Risk Suppliers</p>
              <h3 className="text-2xl font-bold">{metrics.highRiskSuppliers}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {((metrics.highRiskSuppliers / metrics.totalAssessments) * 100).toFixed(1)}% of total
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
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Risk Score</p>
              <h3 className="text-2xl font-bold">{metrics.averageRiskScore.toFixed(1)}</h3>
              <div className="flex items-center gap-1 text-sm">
                {metrics.riskTrend < 0 ? (
                  <>
                    <MdOutlineTrendingDown className="text-success" />
                    <span className="text-success">{Math.abs(metrics.riskTrend)}% decrease</span>
                  </>
                ) : (
                  <>
                    <MdOutlineTrendingUp className="text-error" />
                    <span className="text-error">{metrics.riskTrend}% increase</span>
                  </>
                )}
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MdOutlineAssessment className="text-primary text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Reviews</p>
              <h3 className="text-2xl font-bold">{metrics.pendingReviews}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Next 30 days
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
              <MdOutlineBusinessCenter className="text-warning text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Risk Trend Chart */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Risk Score Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Chart */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Risk Distribution by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="low" stackId="a" fill="#10B981" name="Low Risk" />
                <Bar dataKey="medium" stackId="a" fill="#F59E0B" name="Medium Risk" />
                <Bar dataKey="high" stackId="a" fill="#EF4444" name="High Risk" />
                <Bar dataKey="critical" stackId="a" fill="#991B1B" name="Critical Risk" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk Assessments Table */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Risk Assessments</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-base-300 dark:border-slate-700">
                <th className="text-left p-2">Supplier</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Location</th>
                <th className="text-left p-2">Risk Level</th>
                <th className="text-left p-2">Risk Scores</th>
                <th className="text-left p-2">Next Review</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssessments.map((assessment) => (
                <tr key={assessment.id} className="border-b border-base-300 dark:border-slate-700">
                  <td className="p-2 font-medium">{assessment.supplier}</td>
                  <td className="p-2">{assessment.category}</td>
                  <td className="p-2">{assessment.location}</td>
                  <td className="p-2">{getRiskBadge(assessment.overallRisk)}</td>
                  <td className="p-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Financial:</span>
                        <span className="text-sm font-medium" style={{ color: getRiskColor(assessment.financialRisk) }}>
                          {assessment.financialRisk.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Operational:</span>
                        <span className="text-sm font-medium" style={{ color: getRiskColor(assessment.operationalRisk) }}>
                          {assessment.operationalRisk.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div>
                      <p>{new Date(assessment.nextReview).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last: {new Date(assessment.lastAssessment).toLocaleDateString()}
                      </p>
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

export default SupplierRisk; 