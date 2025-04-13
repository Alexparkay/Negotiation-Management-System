import React, { useState, useEffect } from 'react';
import { 
  MdOutlineAnalytics, 
  MdOutlineInsights, 
  MdOutlineSchedule,
  MdOutlineWarning,
  MdCheckCircleOutline,
  MdOutlineSort,
  MdFilterList
} from 'react-icons/md';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import ChatPopup from '../components/ChatPopup';

// Mock data for the performance metrics
const performanceData = [
  { name: 'Acme Corp', qualityScore: 85, deliveryScore: 90, costScore: 78, responseScore: 92, overallScore: 86 },
  { name: 'TechSolutions', qualityScore: 92, deliveryScore: 88, costScore: 85, responseScore: 89, overallScore: 89 },
  { name: 'Global Supplies', qualityScore: 78, deliveryScore: 82, costScore: 90, responseScore: 75, overallScore: 81 },
  { name: 'InnovateMfg', qualityScore: 88, deliveryScore: 79, costScore: 87, responseScore: 84, overallScore: 85 },
  { name: 'PrecisionParts', qualityScore: 94, deliveryScore: 95, costScore: 81, responseScore: 88, overallScore: 90 },
  { name: 'EcoFriendly', qualityScore: 89, deliveryScore: 84, costScore: 76, responseScore: 91, overallScore: 85 },
];

const trendData = [
  { month: 'Jan', avgScore: 80 },
  { month: 'Feb', avgScore: 82 },
  { month: 'Mar', avgScore: 81 },
  { month: 'Apr', avgScore: 84 },
  { month: 'May', avgScore: 86 },
  { month: 'Jun', avgScore: 88 },
  { month: 'Jul', avgScore: 85 },
  { month: 'Aug', avgScore: 87 },
  { month: 'Sep', avgScore: 89 },
];

const categoryBreakdown = [
  { name: 'Quality', value: 35 },
  { name: 'On-time Delivery', value: 25 },
  { name: 'Cost Efficiency', value: 20 },
  { name: 'Response Time', value: 15 },
  { name: 'Innovation', value: 5 },
];

const radarData = [
  { category: 'Quality', PrecisionParts: 94, IndustrialAvg: 82 },
  { category: 'Delivery', PrecisionParts: 95, IndustrialAvg: 78 },
  { category: 'Cost', PrecisionParts: 81, IndustrialAvg: 85 },
  { category: 'Response', PrecisionParts: 88, IndustrialAvg: 80 },
  { category: 'Innovation', PrecisionParts: 92, IndustrialAvg: 75 },
];

const issuesData = [
  { id: 1, vendor: 'Global Supplies', issue: 'Delayed shipment', severity: 'Medium', status: 'Open', date: '2023-10-15' },
  { id: 2, vendor: 'InnovateMfg', issue: 'Quality control failure', severity: 'High', status: 'In Progress', date: '2023-10-12' },
  { id: 3, vendor: 'EcoFriendly', issue: 'Incorrect documentation', severity: 'Low', status: 'Resolved', date: '2023-10-08' },
  { id: 4, vendor: 'Acme Corp', issue: 'Packaging issues', severity: 'Low', status: 'Open', date: '2023-10-18' },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

const VendorPerformance: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState('All Vendors');
  const [selectedPeriod, setSelectedPeriod] = useState('Last 90 Days');
  const [filteredIssues, setFilteredIssues] = useState(issuesData);

  useEffect(() => {
    // Simulate filtering data based on selections
    // In a real app, this would fetch from an API
    setFilteredIssues(
      selectedVendor === 'All Vendors' 
        ? issuesData 
        : issuesData.filter(issue => issue.vendor === selectedVendor)
    );
  }, [selectedVendor]);

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Vendor Performance</h1>
          <p className="text-text-secondary mt-1">Track and analyze vendor performance metrics</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-outline btn-sm flex items-center gap-2">
            <MdOutlineInsights className="text-lg" /> Generate Report
          </button>
          <button className="btn btn-primary btn-sm flex items-center gap-2">
            <MdOutlineSchedule className="text-lg" /> Schedule Review
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center">
          <MdFilterList className="text-accent-primary mr-2 text-xl" />
          <h2 className="text-md font-semibold text-text-primary">Filters</h2>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select 
            className="select select-sm bg-background-secondary border-white/10"
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
          >
            <option>All Vendors</option>
            {performanceData.map(vendor => (
              <option key={vendor.name}>{vendor.name}</option>
            ))}
          </select>
          
          <select 
            className="select select-sm bg-background-secondary border-white/10"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last 6 Months</option>
            <option>Year to Date</option>
          </select>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="glass-panel p-6 rounded-xl mb-6">
        <div className="flex items-center mb-4">
          <MdOutlineAnalytics className="text-accent-primary mr-2 text-xl" />
          <h2 className="text-lg font-semibold text-text-primary">
            Performance Overview
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Trend Chart */}
          <div className="glass-panel bg-background-secondary/50 p-4 rounded-xl col-span-3 lg:col-span-2">
            <h3 className="text-md font-semibold text-text-primary mb-3">Performance Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#B3B3B3" />
                <YAxis stroke="#B3B3B3" domain={[70, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF'
                  }} 
                />
                <Line type="monotone" dataKey="avgScore" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown */}
          <div className="glass-panel bg-background-secondary/50 p-4 rounded-xl">
            <h3 className="text-md font-semibold text-text-primary mb-3">Category Weighting</h3>
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(26, 26, 26, 0.9)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Vendor Comparison */}
        <div className="glass-panel bg-background-secondary/50 p-4 rounded-xl mb-6">
          <h3 className="text-md font-semibold text-text-primary mb-3">Vendor Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#B3B3B3" />
              <YAxis stroke="#B3B3B3" domain={[50, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 26, 0.9)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF'
                }} 
              />
              <Legend />
              <Bar dataKey="qualityScore" name="Quality" fill="#3B82F6" />
              <Bar dataKey="deliveryScore" name="Delivery" fill="#10B981" />
              <Bar dataKey="costScore" name="Cost" fill="#F59E0B" />
              <Bar dataKey="responseScore" name="Response" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performer Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel bg-background-secondary/50 p-4 rounded-xl">
            <h3 className="text-md font-semibold text-text-primary mb-3">Top Performer: PrecisionParts</h3>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="bg-background-accent/30 p-4 rounded-lg text-center flex-1">
                <div className="text-3xl font-bold text-accent-primary">90</div>
                <div className="text-text-secondary text-sm">Overall Score</div>
              </div>
              <div className="flex-[2]">
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="category" stroke="#B3B3B3" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#B3B3B3" />
                    <Radar name="PrecisionParts" dataKey="PrecisionParts" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Radar name="Industry Avg" dataKey="IndustrialAvg" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(26, 26, 26, 0.9)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF'
                      }} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Issues Tracking */}
          <div className="glass-panel bg-background-secondary/50 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-md font-semibold text-text-primary">Recent Issues</h3>
              <button className="btn btn-xs btn-outline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-sm w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-text-secondary">Vendor</th>
                    <th className="text-text-secondary">Issue</th>
                    <th className="text-text-secondary">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.map(issue => (
                    <tr key={issue.id} className="border-b border-white/5 hover:bg-background-accent/20">
                      <td>{issue.vendor}</td>
                      <td>
                        <div className="flex items-center">
                          {issue.severity === 'High' && <MdOutlineWarning className="text-accent-warning mr-1" />}
                          {issue.issue}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${
                          issue.status === 'Resolved' 
                            ? 'bg-accent-secondary/20 text-accent-secondary' 
                            : issue.status === 'In Progress' 
                            ? 'bg-accent-primary/20 text-accent-primary' 
                            : 'bg-accent-warning/20 text-accent-warning'
                        } badge-sm`}>
                          {issue.status}
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

      {/* Performance Improvement Suggestions */}
      <div className="glass-panel p-6 rounded-xl mb-6">
        <div className="flex items-center mb-4">
          <MdCheckCircleOutline className="text-accent-secondary mr-2 text-xl" />
          <h2 className="text-lg font-semibold text-text-primary">
            Improvement Suggestions
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="glass-panel bg-background-secondary/50 p-4 rounded-xl border-l-4 border-accent-primary">
            <h3 className="text-md font-semibold text-text-primary">Quality Assurance</h3>
            <p className="text-text-secondary mt-1">Implement regular quality audits with Global Supplies to address the 8% decrease in quality scores over the last quarter.</p>
          </div>
          
          <div className="glass-panel bg-background-secondary/50 p-4 rounded-xl border-l-4 border-accent-secondary">
            <h3 className="text-md font-semibold text-text-primary">Delivery Performance</h3>
            <p className="text-text-secondary mt-1">Schedule a review meeting with InnovateMfg to discuss strategies for improving their on-time delivery rate from 79% to the target 90%.</p>
          </div>
          
          <div className="glass-panel bg-background-secondary/50 p-4 rounded-xl border-l-4 border-accent-warning">
            <h3 className="text-md font-semibold text-text-primary">Cost Management</h3>
            <p className="text-text-secondary mt-1">Negotiate updated pricing terms with EcoFriendly to align with market benchmarks, targeting a 5-7% reduction in material costs.</p>
          </div>
        </div>
      </div>
      
      <ChatPopup />
    </div>
  );
};

export default VendorPerformance; 