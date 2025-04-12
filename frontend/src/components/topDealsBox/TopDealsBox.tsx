// import React from 'react'
import toast from 'react-hot-toast';
// import { topDealUsers } from './data';
import { useQuery } from '@tanstack/react-query';
import { fetchTopDeals } from '../../api/ApiCollection';
import { MdOutlineAssignment, MdOutlinePriorityHigh, MdOutlineSchedule, MdOutlineStorefront, MdOutlineWarning, MdWifi, MdComputer, MdSecurity, MdStorage, MdCable, MdOutlineError, MdOutlineWifiOff, MdOutlineSignalWifiConnectedNoInternet4, MdOutlineDevicesOther, MdOutlineMemory } from 'react-icons/md';

interface StoreTask {
  id: number;
  title: string;
  storeName: string;
  storeId: number;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'overdue';
  category: string;
  region?: string;
  impact?: string;
  assignedTo?: string;
}

interface TopDealsBoxProps {
  title?: string;
}

const TopDealsBox: React.FC<TopDealsBoxProps> = ({ title = "High Priority Tasks" }) => {
  const tempTotalEntries = [1, 2, 3, 4, 5, 6, 7];

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['topdeals'],
    queryFn: fetchTopDeals,
  });

  // Function to get priority color
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-info';
    }
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'overdue': return 'text-error';
      case 'in-progress': return 'text-warning';
      case 'pending': return 'text-info';
      default: return 'text-info';
    }
  };

  // Function to get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Network': return <MdWifi className="text-xl" />;
      case 'Network Outage': return <MdOutlineWifiOff className="text-xl" />;
      case 'Connectivity': return <MdOutlineSignalWifiConnectedNoInternet4 className="text-xl" />;
      case 'Hardware': return <MdComputer className="text-xl" />;
      case 'Hardware Failure': return <MdOutlineDevicesOther className="text-xl" />;
      case 'Software': return <MdStorage className="text-xl" />;
      case 'Software Failure': return <MdOutlineMemory className="text-xl" />;
      case 'Security': return <MdSecurity className="text-xl" />;
      case 'Cabling': return <MdCable className="text-xl" />;
      case 'Critical': return <MdOutlineError className="text-xl" />;
      default: return <MdOutlineAssignment className="text-xl" />;
    }
  };

  // Mock data for critical IT issues in a global retail company
  const criticalITIssues: StoreTask[] = [
    {
      id: 1,
      title: 'Network outage affecting POS systems',
      storeName: 'Shanghai Central Mall',
      storeId: 127,
      dueDate: '2024-05-12',
      priority: 'high',
      status: 'in-progress',
      category: 'Network Outage',
      region: 'Asia Pacific',
      impact: 'Sales operations halted',
      assignedTo: 'Wei Zhang'
    },
    {
      id: 2,
      title: 'Main router hardware failure',
      storeName: 'Madrid Gran Via',
      storeId: 89,
      dueDate: '2024-05-11',
      priority: 'high',
      status: 'in-progress',
      category: 'Hardware Failure',
      region: 'Europe',
      impact: 'Limited connectivity',
      assignedTo: 'Carlos Rodriguez'
    },
    {
      id: 3,
      title: 'Payment processing system down',
      storeName: 'Chicago Michigan Avenue',
      storeId: 42,
      dueDate: '2024-05-10',
      priority: 'high',
      status: 'overdue',
      category: 'Software Failure',
      region: 'North America',
      impact: 'Cash-only transactions',
      assignedTo: 'Jessica Williams'
    },
    {
      id: 4,
      title: 'Security breach detected',
      storeName: 'Sydney Harbour',
      storeId: 156,
      dueDate: '2024-05-09',
      priority: 'high',
      status: 'in-progress',
      category: 'Security',
      region: 'Asia Pacific',
      impact: 'Customer data at risk',
      assignedTo: 'James Wilson'
    },
    {
      id: 5,
      title: 'Inventory system synchronization failure',
      storeName: 'Toronto Eaton Centre',
      storeId: 78,
      dueDate: '2024-05-08',
      priority: 'high',
      status: 'overdue',
      category: 'Software Failure',
      region: 'North America',
      impact: 'Inaccurate stock levels',
      assignedTo: 'Michael Brown'
    },
    {
      id: 6,
      title: 'Fiber optic cable damage',
      storeName: 'Berlin Alexanderplatz',
      storeId: 112,
      dueDate: '2024-05-13',
      priority: 'high',
      status: 'pending',
      category: 'Cabling',
      region: 'Europe',
      impact: 'Slow network performance',
      assignedTo: 'Hans Mueller'
    },
    {
      id: 7,
      title: 'Backup power system failure',
      storeName: 'Dubai Mall',
      storeId: 203,
      dueDate: '2024-05-11',
      priority: 'high',
      status: 'in-progress',
      category: 'Hardware Failure',
      region: 'Middle East & Africa',
      impact: 'Risk during power outages',
      assignedTo: 'Ahmed Al-Farsi'
    },
    {
      id: 8,
      title: 'WiFi coverage gaps in store',
      storeName: 'Paris Champs-Élysées',
      storeId: 67,
      dueDate: '2024-05-14',
      priority: 'medium',
      status: 'in-progress',
      category: 'Connectivity',
      region: 'Europe',
      impact: 'Mobile POS limitations',
      assignedTo: 'Sophie Dubois'
    },
    {
      id: 9,
      title: 'POS terminal hardware recall',
      storeName: 'Multiple Locations',
      storeId: 0,
      dueDate: '2024-05-20',
      priority: 'high',
      status: 'pending',
      category: 'Hardware',
      region: 'Global',
      impact: 'Affects 120 stores',
      assignedTo: 'Global IT Team'
    },
    {
      id: 10,
      title: 'Critical security patch deployment',
      storeName: 'All Locations',
      storeId: 0,
      dueDate: '2024-05-15',
      priority: 'high',
      status: 'in-progress',
      category: 'Security',
      region: 'Global',
      impact: 'Vulnerability remediation',
      assignedTo: 'Security Operations Team'
    }
  ];

  // Calculate days remaining or overdue
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="w-full p-0 m-0 flex flex-col items-stretch gap-6 xl:gap-4 2xl:gap-9">
      <div className="flex items-center justify-between">
        <span className="text-2xl xl:text-2xl 2xl:text-4xl font-bold">
          {title}
        </span>
        <span className="badge badge-error">{criticalITIssues.length}</span>
      </div>
      <div className="w-full flex flex-col items-stretch gap-3">
        {isLoading &&
          tempTotalEntries.map((_item, index) => (
            <div
              key={index}
              className="w-full flex justify-between items-center h-auto px-1 py-2"
            >
              <div className="flex gap-3 2xl:gap-4 items-center">
                <div className="skeleton w-10 h-10 xl:w-8 xl:h-8 2xl:w-16 2xl:h-16 rounded-full"></div>
                <div className="flex flex-col items-start gap-1">
                  <div className="skeleton h-4 w-24"></div>
                  <div className="skeleton h-4 w-20"></div>
                </div>
              </div>
              <div className="skeleton h-7 w-14"></div>
            </div>
          ))}
        {!isLoading &&
          criticalITIssues.map((issue, index) => (
            <button
              onClick={() => toast(`Issue details: ${issue.impact}`, { icon: '⚠️' })}
              key={index}
              className="w-full flex justify-between items-center h-auto btn btn-ghost px-1 py-2 hover:bg-base-200"
            >
              <div className="flex gap-3 2xl:gap-4 items-center">
                <div className="avatar">
                  <div className={`w-11 xl:w-8 2xl:w-16 3xl:w-20 rounded-full bg-base-200 flex items-center justify-center ${getStatusColor(issue.status)}`}>
                    {getCategoryIcon(issue.category)}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm xl:text-[13px] 2xl:text-lg 3xl:text-xl m-0 p-0 font-medium">
                    {issue.title}
                  </span>
                  <div className="flex items-center gap-1">
                    <MdOutlineStorefront className="text-xs text-primary" />
                    <span className="text-xs xl:text-[10px] 2xl:text-sm 3xl:text-base">
                      {issue.storeName} {issue.region && `(${issue.region})`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlinePriorityHigh className={`text-lg ${getPriorityColor(issue.priority)}`} />
                <div className="flex flex-col items-end">
                  <div className="flex items-center">
                    <MdOutlineSchedule className="text-sm mr-1" />
                    <span className="text-xs font-medium">
                      {issue.dueDate}
                    </span>
                  </div>
                  {getDaysRemaining(issue.dueDate) < 0 ? (
                    <span className="text-xs text-error font-medium">
                      {Math.abs(getDaysRemaining(issue.dueDate))} days overdue
                    </span>
                  ) : (
                    <span className={`text-xs ${getDaysRemaining(issue.dueDate) <= 7 ? 'text-warning' : 'text-success'} font-medium`}>
                      {getDaysRemaining(issue.dueDate)} days left
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default TopDealsBox;
