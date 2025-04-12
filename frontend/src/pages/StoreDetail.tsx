import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MdLocationOn,
  MdOutlineArrowBack,
  MdOutlineStorefront,
  MdPeople,
  MdOutlineTimer,
  MdOutlineWarning,
  MdOutlineTask,
  MdOutlineDescription,
} from 'react-icons/md';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface StoreData {
  id: string;
  name: string;
  location: string;
  targetDate: string;
  progress: number;
  status: string;
  staffCount: number;
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
  };
  issues: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

const mockStoreData: Record<string, StoreData> = {
  'chicago-downtown': {
    id: 'chicago-downtown',
    name: 'Chicago Downtown',
    location: 'Chicago, IL',
    targetDate: 'Apr 15, 2025',
    progress: 78,
    status: 'On Track',
    staffCount: 45,
    tasks: {
      total: 150,
      completed: 117,
      inProgress: 23,
      notStarted: 10,
    },
    issues: {
      critical: 1,
      high: 2,
      medium: 4,
      low: 3,
    },
  },
  'new-york-5th': {
    id: 'new-york-5th',
    name: 'New York 5th Avenue',
    location: 'New York, NY',
    targetDate: 'May 1, 2025',
    progress: 45,
    status: 'Delayed',
    staffCount: 60,
    tasks: {
      total: 180,
      completed: 81,
      inProgress: 54,
      notStarted: 45,
    },
    issues: {
      critical: 2,
      high: 3,
      medium: 5,
      low: 4,
    },
  },
  'london-oxford': {
    id: 'london-oxford',
    name: 'London Oxford Street',
    location: 'London, UK',
    targetDate: 'Apr 30, 2025',
    progress: 65,
    status: 'On Track',
    staffCount: 50,
    tasks: {
      total: 160,
      completed: 104,
      inProgress: 40,
      notStarted: 16,
    },
    issues: {
      critical: 0,
      high: 2,
      medium: 3,
      low: 5,
    },
  },
  'tokyo-shibuya': {
    id: 'tokyo-shibuya',
    name: 'Tokyo Shibuya',
    location: 'Tokyo, Japan',
    targetDate: 'Jun 15, 2025',
    progress: 32,
    status: 'Early Phase',
    staffCount: 55,
    tasks: {
      total: 170,
      completed: 54,
      inProgress: 68,
      notStarted: 48,
    },
    issues: {
      critical: 1,
      high: 1,
      medium: 6,
      low: 4,
    },
  },
};

// Progress data for the chart
const progressData = [
  { month: 'Jan', progress: 15 },
  { month: 'Feb', progress: 28 },
  { month: 'Mar', progress: 45 },
  { month: 'Apr', progress: 62 },
  { month: 'May', progress: 78 },
  { month: 'Jun', progress: 85 },
];

const StoreDetail: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const store = storeId ? mockStoreData[storeId] : null;

  if (!store) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Store not found</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/stores')}
        >
          Back to Stores
        </button>
      </div>
    );
  }

  const taskStatusData = [
    { name: 'Completed', value: store.tasks.completed, color: '#36d399' },
    { name: 'In Progress', value: store.tasks.inProgress, color: '#3abff8' },
    { name: 'Not Started', value: store.tasks.notStarted, color: '#f87272' },
  ];

  const issuesPieData = [
    { name: 'Critical', value: store.issues.critical, color: '#f87272' },
    { name: 'High', value: store.issues.high, color: '#fbbd23' },
    { name: 'Medium', value: store.issues.medium, color: '#3abff8' },
    { name: 'Low', value: store.issues.low, color: '#36d399' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => navigate('/stores')}
        >
          <MdOutlineArrowBack className="text-2xl" />
        </button>
        <div>
          <h1 className="text-3xl font-bold">{store.name}</h1>
          <div className="flex items-center gap-2 text-base-content/70">
            <MdLocationOn />
            <span>{store.location}</span>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="stats shadow w-full bg-base-100 mb-6">
        <div className="stat">
          <div className="stat-figure text-primary">
            <MdOutlineTimer className="text-3xl" />
          </div>
          <div className="stat-title">Target Opening</div>
          <div className="stat-value text-primary">{store.targetDate}</div>
          <div className="stat-desc">{store.status}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <MdOutlineTask className="text-3xl" />
          </div>
          <div className="stat-title">Tasks</div>
          <div className="stat-value text-secondary">{store.tasks.completed}/{store.tasks.total}</div>
          <div className="stat-desc">{Math.round((store.tasks.completed / store.tasks.total) * 100)}% Complete</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <MdPeople className="text-3xl" />
          </div>
          <div className="stat-title">Staff</div>
          <div className="stat-value text-accent">{store.staffCount}</div>
          <div className="stat-desc">Assigned Personnel</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-error">
            <MdOutlineWarning className="text-3xl" />
          </div>
          <div className="stat-title">Issues</div>
          <div className="stat-value text-error">{store.issues.critical + store.issues.high}</div>
          <div className="stat-desc">Critical & High Priority</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Opening Progress</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#36d399" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#36d399" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="progress"
                    stroke="#36d399"
                    fillOpacity={1}
                    fill="url(#colorProgress)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Task Status */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Task Status</h2>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {taskStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Issues Overview */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Issues Overview</h2>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issuesPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {issuesPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {issuesPieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recent Tasks</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Network Infrastructure Setup</td>
                    <td><span className="badge badge-success">Completed</span></td>
                    <td>Mar 15, 2025</td>
                  </tr>
                  <tr>
                    <td>POS System Installation</td>
                    <td><span className="badge badge-warning">In Progress</span></td>
                    <td>Mar 20, 2025</td>
                  </tr>
                  <tr>
                    <td>Staff Training Program</td>
                    <td><span className="badge badge-error">Not Started</span></td>
                    <td>Mar 25, 2025</td>
                  </tr>
                  <tr>
                    <td>Security System Setup</td>
                    <td><span className="badge badge-warning">In Progress</span></td>
                    <td>Mar 30, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail; 