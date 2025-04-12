import { ChatMessage } from './openaiService';

// This service provides mock responses when the backend API is not available
// The responses are tailored to match the data in the application

// Store data from the application
const storeData = [
  {
    id: 1,
    name: 'Downtown Flagship Store',
    location: 'New York City',
    country: 'USA',
    openingDate: '2024-06-15',
    status: 'in-progress',
    completionPercentage: 65,
    size: 12500,
    budget: 2500000,
    manager: 'John Smith',
    staffCount: 45,
    tasksTotal: 78,
    tasksCompleted: 51
  },
  {
    id: 2,
    name: 'Oxford Street Branch',
    location: 'London',
    country: 'UK',
    openingDate: '2024-07-22',
    status: 'planning',
    completionPercentage: 30,
    size: 8200,
    budget: 1800000,
    manager: 'Emma Johnson',
    staffCount: 32,
    tasksTotal: 65,
    tasksCompleted: 19
  },
  {
    id: 3,
    name: 'Yorkdale Mall Kiosk',
    location: 'Toronto',
    country: 'Canada',
    openingDate: '2024-05-10',
    status: 'in-progress',
    completionPercentage: 80,
    size: 450,
    budget: 350000,
    manager: 'Michael Brown',
    staffCount: 8,
    tasksTotal: 42,
    tasksCompleted: 34
  },
  {
    id: 4,
    name: 'Sydney Harbour Store',
    location: 'Sydney',
    country: 'Australia',
    openingDate: '2024-08-05',
    status: 'planning',
    completionPercentage: 15,
    size: 6800,
    budget: 1200000,
    manager: 'Sarah Wilson',
    staffCount: 25,
    tasksTotal: 58,
    tasksCompleted: 9
  },
  {
    id: 5,
    name: 'Berlin Central Store',
    location: 'Berlin',
    country: 'Germany',
    openingDate: '2024-04-30',
    status: 'completed',
    completionPercentage: 100,
    size: 7500,
    budget: 1500000,
    manager: 'David Miller',
    staffCount: 30,
    tasksTotal: 72,
    tasksCompleted: 72
  },
  {
    id: 6,
    name: 'Chicago Riverside Mall',
    location: 'Chicago',
    country: 'USA',
    openingDate: '2024-05-28',
    status: 'delayed',
    completionPercentage: 45,
    size: 5200,
    budget: 950000,
    manager: 'Jennifer Lee',
    staffCount: 22,
    tasksTotal: 60,
    tasksCompleted: 27
  }
];

// Vendor data from the application
const vendorData = [
  {
    id: 1,
    name: 'Global Construction Ltd',
    category: 'Construction',
    contactPerson: 'John Builder',
    email: 'john@globalconstruction.com',
    phone: '+1-555-123-4567',
    country: 'USA',
    status: 'active',
    contractCount: 12,
    totalSpend: 1250000
  },
  {
    id: 2,
    name: 'Elite Fixtures & Fittings',
    category: 'Fixtures',
    contactPerson: 'Sarah Designer',
    email: 'sarah@elitefixtures.com',
    phone: '+44-20-1234-5678',
    country: 'UK',
    status: 'active',
    contractCount: 8,
    totalSpend: 780000
  },
  {
    id: 3,
    name: 'TechPoint Systems',
    category: 'IT',
    contactPerson: 'Mike Tech',
    email: 'mike@techpoint.com',
    phone: '+1-555-987-6543',
    country: 'USA',
    status: 'active',
    contractCount: 15,
    totalSpend: 950000
  },
  {
    id: 4,
    name: 'Secure Solutions Inc',
    category: 'Security',
    contactPerson: 'Robert Guard',
    email: 'robert@securesolutions.com',
    phone: '+61-2-9876-5432',
    country: 'Australia',
    status: 'inactive',
    contractCount: 5,
    totalSpend: 320000
  },
  {
    id: 5,
    name: 'EcoClean Services',
    category: 'Cleaning',
    contactPerson: 'Lisa Green',
    email: 'lisa@ecoclean.com',
    phone: '+1-555-789-0123',
    country: 'Canada',
    status: 'pending',
    contractCount: 3,
    totalSpend: 150000
  },
  {
    id: 6,
    name: 'Precision Logistics',
    category: 'Logistics',
    contactPerson: 'David Shipper',
    email: 'david@precisionlogistics.com',
    phone: '+49-30-1234-5678',
    country: 'Germany',
    status: 'active',
    contractCount: 7,
    totalSpend: 680000
  },
  {
    id: 7,
    name: 'Faulty Supplies Co',
    category: 'Supplies',
    contactPerson: 'Mark Problem',
    email: 'mark@faultysupplies.com',
    phone: '+1-555-456-7890',
    country: 'USA',
    status: 'blacklisted',
    contractCount: 2,
    totalSpend: 75000
  }
];

// Task data from the application
const highPriorityTasks = [
  {
    id: 1,
    title: 'Complete lease agreement',
    storeName: 'Downtown Flagship Store',
    storeId: 1,
    dueDate: '2024-05-20',
    priority: 'high',
    status: 'in-progress',
    assignedTo: 'John Smith',
    category: 'Legal'
  },
  {
    id: 2,
    title: 'Finalize store layout design',
    storeName: 'Oxford Street Branch',
    storeId: 2,
    dueDate: '2024-06-10',
    priority: 'high',
    status: 'pending',
    assignedTo: 'Emma Johnson',
    category: 'Design'
  },
  {
    id: 3,
    title: 'Hire store manager',
    storeName: 'Sydney Harbour Store',
    storeId: 4,
    dueDate: '2024-05-15',
    priority: 'high',
    status: 'in-progress',
    assignedTo: 'Sarah Wilson',
    category: 'HR'
  },
  {
    id: 4,
    title: 'Obtain business permits',
    storeName: 'Downtown Flagship Store',
    storeId: 1,
    dueDate: '2024-04-30',
    priority: 'high',
    status: 'overdue',
    assignedTo: 'Robert Taylor',
    category: 'Legal'
  },
  {
    id: 5,
    title: 'Install POS system',
    storeName: 'Berlin Central Store',
    storeId: 5,
    dueDate: '2024-04-10',
    priority: 'high',
    status: 'completed',
    assignedTo: 'David Miller',
    category: 'IT'
  }
];

// Contract data from the application
const contractData = [
  {
    id: 1,
    title: 'Store Construction Agreement',
    vendorName: 'Global Construction Ltd',
    vendorId: 1,
    startDate: '2023-06-15',
    endDate: '2024-12-31',
    value: 850000,
    status: 'active',
    type: 'service',
    renewalOption: true
  },
  {
    id: 2,
    title: 'Retail Fixtures Supply',
    vendorName: 'Elite Fixtures & Fittings',
    vendorId: 2,
    startDate: '2023-08-01',
    endDate: '2024-08-01',
    value: 320000,
    status: 'active',
    type: 'product',
    renewalOption: true
  },
  {
    id: 3,
    title: 'IT Systems Implementation',
    vendorName: 'TechPoint Systems',
    vendorId: 3,
    startDate: '2023-09-15',
    endDate: '2024-09-15',
    value: 450000,
    status: 'active',
    type: 'service',
    renewalOption: true
  },
  {
    id: 4,
    title: 'Security Systems Maintenance',
    vendorName: 'Secure Solutions Inc',
    vendorId: 4,
    startDate: '2023-05-01',
    endDate: '2024-04-30',
    value: 120000,
    status: 'expired',
    type: 'maintenance',
    renewalOption: true
  }
];

// Helper function to find a store by name or location
const findStore = (query: string): any => {
  const lowerQuery = query.toLowerCase();
  return storeData.find(store => 
    store.name.toLowerCase().includes(lowerQuery) || 
    store.location.toLowerCase().includes(lowerQuery) ||
    store.country.toLowerCase().includes(lowerQuery)
  );
};

// Helper function to find a vendor by name or category
const findVendor = (query: string): any => {
  const lowerQuery = query.toLowerCase();
  return vendorData.find(vendor => 
    vendor.name.toLowerCase().includes(lowerQuery) || 
    vendor.category.toLowerCase().includes(lowerQuery)
  );
};

// Helper function to find tasks by store or priority
const findTasks = (query: string): any[] => {
  const lowerQuery = query.toLowerCase();
  return highPriorityTasks.filter(task => 
    task.storeName.toLowerCase().includes(lowerQuery) || 
    task.priority.toLowerCase().includes(lowerQuery) ||
    task.category.toLowerCase().includes(lowerQuery)
  );
};

// Mock responses based on query content
export function getMockResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // Specific store queries
  if (lowerQuery.includes('new york') || lowerQuery.includes('downtown flagship')) {
    const store = storeData.find(s => s.name === 'Downtown Flagship Store');
    if (store) {
      return `The Downtown Flagship Store in New York City is scheduled to open on June 15, 2024. It is currently at ${store.completionPercentage}% completion with a budget of $${(store.budget/1000000).toFixed(1)} million. The store will be ${store.size} sq ft and will employ approximately ${store.staffCount} staff members. The store manager is ${store.manager}. There are ${store.tasksTotal} tasks associated with this store opening, with ${store.tasksCompleted} completed so far.`;
    }
  } else if (lowerQuery.includes('london') || lowerQuery.includes('oxford street')) {
    const store = storeData.find(s => s.name === 'Oxford Street Branch');
    if (store) {
      return `The Oxford Street Branch in London, UK is scheduled to open on July 22, 2024. It is currently in the planning phase at ${store.completionPercentage}% completion with a budget of $${(store.budget/1000000).toFixed(1)} million. The store will be ${store.size} sq ft and will employ approximately ${store.staffCount} staff members. The store manager is ${store.manager}. There are ${store.tasksTotal} tasks associated with this store opening, with ${store.tasksCompleted} completed so far.`;
    }
  } else if (lowerQuery.includes('toronto') || lowerQuery.includes('yorkdale')) {
    const store = storeData.find(s => s.name === 'Yorkdale Mall Kiosk');
    if (store) {
      return `The Yorkdale Mall Kiosk in Toronto, Canada is scheduled to open on May 10, 2024. It is currently at ${store.completionPercentage}% completion with a budget of $${(store.budget/1000).toFixed(0)}K. The kiosk will be ${store.size} sq ft and will employ approximately ${store.staffCount} staff members. The store manager is ${store.manager}. There are ${store.tasksTotal} tasks associated with this store opening, with ${store.tasksCompleted} completed so far.`;
    }
  }
  
  // General store queries
  else if (lowerQuery.includes('store') && lowerQuery.includes('opening')) {
    const upcomingStores = storeData.filter(s => s.status !== 'completed');
    const nextOpening = [...upcomingStores].sort((a, b) => new Date(a.openingDate).getTime() - new Date(b.openingDate).getTime())[0];
    
    return `We have ${upcomingStores.length} stores scheduled to open in the coming months. The next opening is ${nextOpening.name} in ${nextOpening.location} on ${nextOpening.openingDate}. Overall, our store openings are progressing well with an average completion rate of ${Math.round(upcomingStores.reduce((sum, s) => sum + s.completionPercentage, 0) / upcomingStores.length)}%.`;
  } else if (lowerQuery.includes('location') || lowerQuery.includes('where')) {
    return `Our upcoming store locations include ${storeData.map(s => s.location).join(', ')}. The most advanced project is in ${storeData.filter(s => s.status !== 'completed').sort((a, b) => b.completionPercentage - a.completionPercentage)[0].location} with ${storeData.filter(s => s.status !== 'completed').sort((a, b) => b.completionPercentage - a.completionPercentage)[0].completionPercentage}% completion.`;
  } else if (lowerQuery.includes('budget') || lowerQuery.includes('cost')) {
    const totalBudget = storeData.reduce((sum, s) => sum + s.budget, 0);
    const avgBudget = totalBudget / storeData.length;
    const maxBudget = Math.max(...storeData.map(s => s.budget));
    const minBudget = Math.min(...storeData.map(s => s.budget));
    
    return `The total budget for all store openings is $${(totalBudget/1000000).toFixed(1)} million. The average budget per store is $${(avgBudget/1000000).toFixed(1)} million. Our flagship stores have budgets up to $${(maxBudget/1000000).toFixed(1)} million, while smaller formats like kiosks average around $${(minBudget/1000).toFixed(0)}K.`;
  }
  
  // Task-related queries
  else if (lowerQuery.includes('task') || lowerQuery.includes('checklist')) {
    const totalTasks = storeData.reduce((sum, s) => sum + s.tasksTotal, 0);
    const completedTasks = storeData.reduce((sum, s) => sum + s.tasksCompleted, 0);
    const pendingTasks = totalTasks - completedTasks;
    
    return `There are ${pendingTasks} pending tasks across all stores out of a total of ${totalTasks} tasks. ${highPriorityTasks.filter(t => t.status !== 'completed').length} of these are high priority tasks that require immediate attention. The most urgent tasks are: ${highPriorityTasks.filter(t => t.status === 'overdue').map(t => t.title).join(', ')}.`;
  } else if (lowerQuery.includes('priority') || lowerQuery.includes('urgent')) {
    const highPriorityPendingTasks = highPriorityTasks.filter(t => t.status !== 'completed');
    
    return `High priority tasks include: ${highPriorityPendingTasks.map(t => `${t.title} for ${t.storeName} (due ${t.dueDate})`).join(', ')}. ${highPriorityTasks.filter(t => t.status === 'overdue').length} tasks are currently overdue and require immediate attention.`;
  } else if (lowerQuery.includes('complete') || lowerQuery.includes('finished')) {
    const completedTasks = storeData.reduce((sum, s) => sum + s.tasksCompleted, 0);
    const totalTasks = storeData.reduce((sum, s) => sum + s.tasksTotal, 0);
    const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
    
    return `${completedTasks} tasks have been completed across all store openings, representing ${completionPercentage}% of all tasks. ${storeData.find(s => s.status === 'completed')?.name} has completed all ${storeData.find(s => s.status === 'completed')?.tasksTotal} of its tasks.`;
  }
  
  // Vendor-related queries
  else if (lowerQuery.includes('vendor') || lowerQuery.includes('supplier')) {
    const activeVendors = vendorData.filter(v => v.status === 'active');
    
    return `We have ${activeVendors.length} active vendors across different categories: ${activeVendors.map(v => `${v.name} (${v.category})`).join(', ')}. The total spend with these vendors is $${(activeVendors.reduce((sum, v) => sum + v.totalSpend, 0)/1000000).toFixed(1)} million.`;
  } else if (lowerQuery.includes('contract') || lowerQuery.includes('agreement')) {
    const activeContracts = contractData.filter(c => c.status === 'active');
    const expiringContracts = activeContracts.filter(c => {
      const endDate = new Date(c.endDate);
      const now = new Date();
      const diffDays = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 90 && diffDays > 0;
    });
    
    return `We have ${activeContracts.length} active contracts with vendors. ${expiringContracts.length} contracts are expiring within the next 90 days: ${expiringContracts.map(c => `${c.title} with ${c.vendorName} (expires ${c.endDate})`).join(', ')}.`;
  }
  
  // Status-related queries
  else if (lowerQuery.includes('progress') || lowerQuery.includes('status')) {
    const avgCompletion = Math.round(storeData.reduce((sum, s) => sum + s.completionPercentage, 0) / storeData.length);
    const mostAdvanced = storeData.filter(s => s.status !== 'completed').sort((a, b) => b.completionPercentage - a.completionPercentage)[0];
    
    return `Overall store opening progress is at ${avgCompletion}%. The most advanced project is ${mostAdvanced.name} at ${mostAdvanced.completionPercentage}% completion, followed by ${storeData.filter(s => s.id !== mostAdvanced.id && s.status !== 'completed').sort((a, b) => b.completionPercentage - a.completionPercentage)[0].name} at ${storeData.filter(s => s.id !== mostAdvanced.id && s.status !== 'completed').sort((a, b) => b.completionPercentage - a.completionPercentage)[0].completionPercentage}%. ${storeData.find(s => s.status === 'completed')?.name} is already completed.`;
  } else if (lowerQuery.includes('delay') || lowerQuery.includes('behind')) {
    const delayedStore = storeData.find(s => s.status === 'delayed');
    
    if (delayedStore) {
      return `${delayedStore.name} opening is currently delayed. The main issues are permit delays and vendor coordination problems. The store is currently at ${delayedStore.completionPercentage}% completion. The new projected opening date is ${delayedStore.openingDate}.`;
    }
  }
  
  // General queries
  else {
    return "I can help you with information about our global store openings, tasks, vendors, or project status. You can ask about specific stores like the Downtown Flagship Store in New York, or about general progress across all locations. What would you like to know?";
  }
  
  // Fallback response if no specific match is found
  return "I can help you with information about our global store openings, tasks, vendors, or project status. You can ask about specific stores like the Downtown Flagship Store in New York, or about general progress across all locations. What would you like to know?";
}

// Mock implementation of the OpenAI service functions
export async function mockChatResponse(messages: ChatMessage[]): Promise<string> {
  // Extract the last user message
  const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
  
  if (lastUserMessage) {
    return getMockResponse(lastUserMessage.content);
  }
  
  return "I'm here to help with information about store openings. What would you like to know?";
}

export async function mockStoreInfo(query: string): Promise<string> {
  return getMockResponse(query);
}

export async function mockVendorInfo(query: string): Promise<string> {
  return getMockResponse(query);
}

export async function mockTaskInfo(query: string): Promise<string> {
  return getMockResponse(query);
}

export async function mockAssistantResponse(query: string): Promise<string> {
  return getMockResponse(query);
} 