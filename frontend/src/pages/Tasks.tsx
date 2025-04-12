import React, { useState } from 'react';
import { MdAdd, MdFilterList, MdOutlineAssignment, MdOutlineCheck, MdOutlineClose, MdOutlineDelete, MdOutlineEdit, MdOutlineInfo, MdOutlineMoreVert, MdOutlineSearch, MdOutlineWarning, MdWifi, MdComputer, MdSecurity, MdStorage, MdCable, MdPeople, MdBackup, MdOutlineWifiOff, MdOutlineSignalWifiConnectedNoInternet4, MdOutlineDevicesOther, MdOutlineMemory, MdOutlineTimer, MdOutlineLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  storeName: string;
  storeId: number;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  category: string;
  assignedTo: string;
  region?: string;
  estimatedHours?: number;
  dependencies?: number[];
}

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  // Global retail company data - regions and store counts
  const regions = [
    { name: 'North America', storeCount: 145 },
    { name: 'Europe', storeCount: 120 },
    { name: 'Asia Pacific', storeCount: 85 },
    { name: 'Latin America', storeCount: 30 },
    { name: 'Middle East & Africa', storeCount: 20 }
  ];

  // Mock data for IT setup tasks for a global retail company
  const itTasks: Task[] = [
    // NORTH AMERICA REGION
    // Network Setup Tasks - New York Flagship
    {
      id: 1,
      title: 'Site survey for network infrastructure',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-05-15',
      priority: 'high',
      status: 'completed',
      category: 'Network',
      assignedTo: 'Robert Johnson',
      region: 'North America',
      estimatedHours: 8
    },
    {
      id: 2,
      title: 'Install primary network cabling',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-05-20',
      priority: 'high',
      status: 'in-progress',
      category: 'Network',
      assignedTo: 'Robert Johnson',
      region: 'North America',
      estimatedHours: 24,
      dependencies: [1]
    },
    {
      id: 3,
      title: 'Set up network server room',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-05-25',
      priority: 'high',
      status: 'pending',
      category: 'Network',
      assignedTo: 'Robert Johnson',
      region: 'North America',
      estimatedHours: 16,
      dependencies: [2]
    },
    {
      id: 4,
      title: 'Configure main router and switches',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-05-28',
      priority: 'high',
      status: 'pending',
      category: 'Network',
      assignedTo: 'Sarah Williams',
      region: 'North America',
      estimatedHours: 8,
      dependencies: [3]
    },
    {
      id: 5,
      title: 'Install and configure WiFi access points',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-06-02',
      priority: 'medium',
      status: 'pending',
      category: 'Network',
      assignedTo: 'Sarah Williams',
      region: 'North America',
      estimatedHours: 16,
      dependencies: [4]
    },
    
    // Hardware Deployment Tasks - New York Flagship
    {
      id: 6,
      title: 'Install main POS terminals',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-06-05',
      priority: 'high',
      status: 'pending',
      category: 'Hardware',
      assignedTo: 'Michael Brown',
      region: 'North America',
      estimatedHours: 16,
      dependencies: [4]
    },
    {
      id: 7,
      title: 'Set up staff workstations',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-06-08',
      priority: 'medium',
      status: 'pending',
      category: 'Hardware',
      assignedTo: 'Michael Brown',
      region: 'North America',
      estimatedHours: 12,
      dependencies: [4]
    },
    {
      id: 8,
      title: 'Install security cameras and systems',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-06-10',
      priority: 'high',
      status: 'pending',
      category: 'Security',
      assignedTo: 'David Wilson',
      region: 'North America',
      estimatedHours: 24,
      dependencies: [2]
    },
    
    // Software and Systems Tasks - New York Flagship
    {
      id: 9,
      title: 'Install and configure POS software',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-06-12',
      priority: 'high',
      status: 'pending',
      category: 'Software',
      assignedTo: 'Emily Davis',
      region: 'North America',
      estimatedHours: 16,
      dependencies: [6]
    },
    {
      id: 10,
      title: 'Set up inventory management system',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-06-15',
      priority: 'high',
      status: 'pending',
      category: 'Software',
      assignedTo: 'Emily Davis',
      region: 'North America',
      estimatedHours: 24,
      dependencies: [9]
    },
    
    // EUROPE REGION
    // Network Setup Tasks - London Oxford Street
    {
      id: 11,
      title: 'Site survey for network infrastructure',
      storeName: 'London Oxford Street',
      storeId: 2001,
      dueDate: '2024-05-10',
      priority: 'high',
      status: 'completed',
      category: 'Network',
      assignedTo: 'James Wilson',
      region: 'Europe',
      estimatedHours: 8
    },
    {
      id: 12,
      title: 'Install primary network cabling',
      storeName: 'London Oxford Street',
      storeId: 2001,
      dueDate: '2024-05-18',
      priority: 'high',
      status: 'completed',
      category: 'Network',
      assignedTo: 'James Wilson',
      region: 'Europe',
      estimatedHours: 24,
      dependencies: [11]
    },
    {
      id: 13,
      title: 'Set up network server room',
      storeName: 'London Oxford Street',
      storeId: 2001,
      dueDate: '2024-05-22',
      priority: 'high',
      status: 'in-progress',
      category: 'Network',
      assignedTo: 'James Wilson',
      region: 'Europe',
      estimatedHours: 16,
      dependencies: [12]
    },
    
    // ASIA PACIFIC REGION
    // Network Setup Tasks - Shanghai Central
    {
      id: 14,
      title: 'Site survey for network infrastructure',
      storeName: 'Shanghai Central Mall',
      storeId: 3001,
      dueDate: '2024-05-05',
      priority: 'high',
      status: 'completed',
      category: 'Network',
      assignedTo: 'Wei Zhang',
      region: 'Asia Pacific',
      estimatedHours: 8
    },
    {
      id: 15,
      title: 'Install primary network cabling',
      storeName: 'Shanghai Central Mall',
      storeId: 3001,
      dueDate: '2024-05-12',
      priority: 'high',
      status: 'completed',
      category: 'Network',
      assignedTo: 'Wei Zhang',
      region: 'Asia Pacific',
      estimatedHours: 24,
      dependencies: [14]
    },
    {
      id: 16,
      title: 'Set up network server room',
      storeName: 'Shanghai Central Mall',
      storeId: 3001,
      dueDate: '2024-05-18',
      priority: 'high',
      status: 'completed',
      category: 'Network',
      assignedTo: 'Wei Zhang',
      region: 'Asia Pacific',
      estimatedHours: 16,
      dependencies: [15]
    },
    {
      id: 17,
      title: 'Configure main router and switches',
      storeName: 'Shanghai Central Mall',
      storeId: 3001,
      dueDate: '2024-05-20',
      priority: 'high',
      status: 'completed',
      category: 'Network',
      assignedTo: 'Li Chen',
      region: 'Asia Pacific',
      estimatedHours: 8,
      dependencies: [16]
    },
    {
      id: 18,
      title: 'Install and configure WiFi access points',
      storeName: 'Shanghai Central Mall',
      storeId: 3001,
      dueDate: '2024-05-25',
      priority: 'medium',
      status: 'in-progress',
      category: 'Network',
      assignedTo: 'Li Chen',
      region: 'Asia Pacific',
      estimatedHours: 16,
      dependencies: [17]
    },
    
    // Hardware Deployment Tasks - Shanghai Central
    {
      id: 19,
      title: 'Install main POS terminals',
      storeName: 'Shanghai Central Mall',
      storeId: 3001,
      dueDate: '2024-05-28',
      priority: 'high',
      status: 'in-progress',
      category: 'Hardware',
      assignedTo: 'Jing Wang',
      region: 'Asia Pacific',
      estimatedHours: 16,
      dependencies: [17]
    },
    
    // CRITICAL ISSUES - Various Locations
    {
      id: 20,
      title: 'Resolve network outage affecting POS',
      storeName: 'Shanghai Central Mall',
      storeId: 3001,
      dueDate: '2024-05-12',
      priority: 'high',
      status: 'in-progress',
      category: 'Network Outage',
      assignedTo: 'Wei Zhang',
      region: 'Asia Pacific',
      estimatedHours: 4
    },
    {
      id: 21,
      title: 'Replace faulty main router',
      storeName: 'Madrid Gran Via',
      storeId: 2005,
      dueDate: '2024-05-11',
      priority: 'high',
      status: 'in-progress',
      category: 'Hardware Failure',
      assignedTo: 'Carlos Rodriguez',
      region: 'Europe',
      estimatedHours: 6
    },
    {
      id: 22,
      title: 'Fix payment processing system',
      storeName: 'Chicago Michigan Avenue',
      storeId: 1005,
      dueDate: '2024-05-10',
      priority: 'high',
      status: 'overdue',
      category: 'Software Failure',
      assignedTo: 'Jessica Williams',
      region: 'North America',
      estimatedHours: 8
    },
    
    // GLOBAL TASKS
    {
      id: 23,
      title: 'Deploy critical security patch',
      storeName: 'All Locations',
      storeId: 0,
      dueDate: '2024-05-15',
      priority: 'high',
      status: 'in-progress',
      category: 'Security',
      assignedTo: 'Global Security Team',
      region: 'Global',
      estimatedHours: 40
    },
    {
      id: 24,
      title: 'POS terminal hardware recall',
      storeName: 'Multiple Locations',
      storeId: 0,
      dueDate: '2024-05-20',
      priority: 'high',
      status: 'pending',
      category: 'Hardware',
      assignedTo: 'Global IT Team',
      region: 'Global',
      estimatedHours: 120
    },
    
    // TRAINING TASKS
    {
      id: 25,
      title: 'Train staff on new POS system',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-06-18',
      priority: 'medium',
      status: 'pending',
      category: 'Training',
      assignedTo: 'Training Team',
      region: 'North America',
      estimatedHours: 16,
      dependencies: [9, 10]
    },
    {
      id: 26,
      title: 'Conduct system integration testing',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-06-16',
      priority: 'high',
      status: 'pending',
      category: 'Testing',
      assignedTo: 'QA Team',
      region: 'North America',
      estimatedHours: 24,
      dependencies: [5, 8, 10]
    },
    {
      id: 27,
      title: 'Final IT systems check before opening',
      storeName: 'New York 5th Avenue Flagship',
      storeId: 1001,
      dueDate: '2024-06-25',
      priority: 'high',
      status: 'pending',
      category: 'Go-Live',
      assignedTo: 'Robert Johnson',
      region: 'North America',
      estimatedHours: 8,
      dependencies: [25, 26]
    }
  ];

  // Function to get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Network': return <MdWifi className="text-primary" />;
      case 'Network Outage': return <MdOutlineWifiOff className="text-error" />;
      case 'Connectivity': return <MdOutlineSignalWifiConnectedNoInternet4 className="text-warning" />;
      case 'Hardware': return <MdComputer className="text-secondary" />;
      case 'Hardware Failure': return <MdOutlineDevicesOther className="text-error" />;
      case 'Software': return <MdStorage className="text-accent" />;
      case 'Software Failure': return <MdOutlineMemory className="text-error" />;
      case 'Security': return <MdSecurity className="text-error" />;
      case 'Cabling': return <MdCable className="text-primary" />;
      case 'Training': return <MdPeople className="text-warning" />;
      case 'Testing': return <MdOutlineCheck className="text-success" />;
      case 'Go-Live': return <MdOutlineInfo className="text-info" />;
      case 'Support': return <MdOutlineInfo className="text-secondary" />;
      default: return <MdOutlineAssignment className="text-primary" />;
    }
  };

  // Function to get priority badge color
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high': return 'badge-error';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-success';
      default: return 'badge-info';
    }
  };

  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return 'badge-success';
      case 'in-progress': return 'badge-warning';
      case 'pending': return 'badge-info';
      case 'overdue': return 'badge-error';
      default: return 'badge-ghost';
    }
  };

  // Function to get region badge color
  const getRegionBadge = (region: string) => {
    switch(region) {
      case 'North America': return 'badge-primary';
      case 'Europe': return 'badge-secondary';
      case 'Asia Pacific': return 'badge-accent';
      case 'Latin America': return 'badge-info';
      case 'Middle East & Africa': return 'badge-warning';
      case 'Global': return 'badge-neutral';
      default: return 'badge-ghost';
    }
  };

  // Filter tasks based on search term and filters
  const filteredTasks = itTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    const matchesRegion = regionFilter === 'all' || task.region === regionFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesRegion;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(itTasks.map(task => task.category)));

  // Calculate task statistics
  const taskStats = {
    total: itTasks.length,
    completed: itTasks.filter(t => t.status === 'completed').length,
    inProgress: itTasks.filter(t => t.status === 'in-progress').length,
    pending: itTasks.filter(t => t.status === 'pending').length,
    overdue: itTasks.filter(t => t.status === 'overdue').length,
    highPriority: itTasks.filter(t => t.priority === 'high').length,
    totalEstimatedHours: itTasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0),
    completedEstimatedHours: itTasks.filter(t => t.status === 'completed').reduce((sum, task) => sum + (task.estimatedHours || 0), 0)
  };

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">IT Setup Tasks</h1>
        <div className="flex gap-2">
          <button className="btn btn-primary">
            <MdAdd className="text-xl" />
            Add New Task
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline">
              <MdFilterList className="text-xl" />
              View
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>All Tasks</a></li>
              <li><a>Critical Issues</a></li>
              <li><a>My Assigned Tasks</a></li>
              <li><a>Upcoming Deadlines</a></li>
              <li><a>Completed Tasks</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Task Stats */}
      <div className="stats shadow mb-6 w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <MdOutlineAssignment className="text-3xl" />
          </div>
          <div className="stat-title">Total Tasks</div>
          <div className="stat-value">{taskStats.total}</div>
          <div className="stat-desc">{Math.round(taskStats.completedEstimatedHours / taskStats.totalEstimatedHours * 100)}% hours completed</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-success">
            <MdOutlineCheck className="text-3xl" />
          </div>
          <div className="stat-title">Completed</div>
          <div className="stat-value">{taskStats.completed}</div>
          <div className="stat-desc">{Math.round(taskStats.completed / taskStats.total * 100)}% of all tasks</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-warning">
            <MdOutlineWarning className="text-3xl" />
          </div>
          <div className="stat-title">In Progress</div>
          <div className="stat-value">{taskStats.inProgress}</div>
          <div className="stat-desc">{taskStats.highPriority} high priority tasks</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-error">
            <MdOutlineClose className="text-3xl" />
          </div>
          <div className="stat-title">Overdue</div>
          <div className="stat-value">{taskStats.overdue}</div>
          <div className="stat-desc">Requiring immediate attention</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search tasks..."
            className="input input-bordered w-full pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MdOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-base-content/50" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select 
            className="select select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          
          <select 
            className="select select-bordered"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <select 
            className="select select-bordered"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select 
            className="select select-bordered"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="all">All Regions</option>
            <option value="Global">Global</option>
            {regions.map(region => (
              <option key={region.name} value={region.name}>{region.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Task</th>
              <th>Store</th>
              <th>Category</th>
              <th>Region</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Est. Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id}>
                <td>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(task.category)}
                    <span>{task.title}</span>
                  </div>
                </td>
                <td>{task.storeName}</td>
                <td>{task.category}</td>
                <td>
                  {task.region && (
                    <div className={`badge ${getRegionBadge(task.region)}`}>
                      {task.region}
                    </div>
                  )}
                </td>
                <td>{task.dueDate}</td>
                <td>
                  <div className={`badge ${getPriorityBadge(task.priority)}`}>
                    {task.priority}
                  </div>
                </td>
                <td>
                  <div className={`badge ${getStatusBadge(task.status)}`}>
                    {task.status}
                  </div>
                </td>
                <td>{task.assignedTo}</td>
                <td>{task.estimatedHours || '-'}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-ghost btn-xs">
                      <MdOutlineEdit className="text-base" />
                    </button>
                    <button className="btn btn-ghost btn-xs">
                      <MdOutlineDelete className="text-base" />
                    </button>
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-ghost btn-xs">
                        <MdOutlineMoreVert className="text-base" />
                      </label>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Mark as Completed</a></li>
                        <li><a>Reassign Task</a></li>
                        <li><a>View Dependencies</a></li>
                        <li><a>View Details</a></li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Regional Progress */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Regional IT Setup Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {regions.map(region => {
            const regionTasks = itTasks.filter(t => t.region === region.name);
            const completedTasks = regionTasks.filter(t => t.status === 'completed').length;
            const progressPercentage = regionTasks.length > 0 
              ? Math.round((completedTasks / regionTasks.length) * 100) 
              : 0;
            
            return (
              <div key={region.name} className="card bg-base-100 shadow-xl">
                <div className="card-body p-4">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <MdOutlineLocationOn className={`text-xl ${getRegionBadge(region.name).replace('badge-', 'text-')}`} />
                    {region.name}
                  </h3>
                  <div className="text-sm">
                    <p>{region.storeCount} stores</p>
                    <p>{regionTasks.length} IT tasks</p>
                    <p>{completedTasks} completed</p>
                  </div>
                  <progress 
                    className={`progress ${progressPercentage > 75 ? 'progress-success' : progressPercentage > 50 ? 'progress-primary' : progressPercentage > 25 ? 'progress-warning' : 'progress-error'}`} 
                    value={progressPercentage} 
                    max="100"
                  ></progress>
                  <p className="text-right text-sm font-medium">{progressPercentage}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks; 