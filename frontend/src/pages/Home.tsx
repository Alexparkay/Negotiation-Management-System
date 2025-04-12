import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineAnalytics,
  MdOutlineAttachMoney,
  MdOutlineWarning,
  MdOutlineShoppingCart,
  MdOutlineDescription,
  MdOutlineBusinessCenter,
  MdOutlineSchedule,
  MdOutlineCheck,
  MdOutlineError,
  MdOutlineInsights,
  MdOutlineInventory,
  MdOutlineArrowForward,
  MdOutlineSearch,
  MdSend,
} from 'react-icons/md';
import { HiOutlineUsers, HiOutlineClipboardDocumentList, HiOutlineShieldCheck } from 'react-icons/hi2';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface ChatMessage {
  type: 'user' | 'assistant';
  content: string;
}

// Mock supplier data for chat responses
const mockSupplierData = {
  'acme-corp': {
    name: 'Acme Corporation',
    lastOrder: {
      id: 'PO-2024-1234',
      status: 'In Transit',
      expectedDelivery: '2024-03-15',
      items: [
        { name: 'Widget A', quantity: 1000 },
        { name: 'Widget B', quantity: 500 }
      ]
    },
    performance: {
      onTimeDelivery: 95,
      qualityScore: 92,
      responseTime: '24h',
      lastAudit: '2024-02-01'
    },
    compliance: {
      certifications: ['ISO 9001', 'ISO 14001'],
      status: 'Valid',
      nextAuditDue: '2024-08-01'
    }
  },
  'globex-inc': {
    name: 'Globex Inc',
    lastOrder: {
      id: 'PO-2024-1235',
      status: 'Processing',
      expectedDelivery: '2024-03-20',
      items: [
        { name: 'Component X', quantity: 2000 },
        { name: 'Component Y', quantity: 1500 }
      ]
    },
    performance: {
      onTimeDelivery: 88,
      qualityScore: 95,
      responseTime: '48h',
      lastAudit: '2024-01-15'
    },
    compliance: {
      certifications: ['ISO 9001'],
      status: 'Expiring Soon',
      nextAuditDue: '2024-04-15'
    }
  }
};

const Home = () => {
  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle chat submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message
    const newMessages = [...chatMessages, { type: 'user' as const, content: chatInput }];
    
    // Process query and add assistant response
      const query = chatInput.toLowerCase();
    let response: ChatMessage = { type: 'assistant', content: "I couldn't find specific information about that. How else can I help you?" };

    if (query.includes('order') && query.includes('acme')) {
      const orderInfo = mockSupplierData['acme-corp'].lastOrder;
      response.content = `The latest order from Acme Corporation (${orderInfo.id}) is ${orderInfo.status}. Expected delivery date is ${orderInfo.expectedDelivery}. The order includes ${orderInfo.items.map(item => `${item.quantity} units of ${item.name}`).join(' and ')}.`;
    } else if (query.includes('performance') && query.includes('globex')) {
      const perfInfo = mockSupplierData['globex-inc'].performance;
      response.content = `Globex Inc's current performance metrics: On-time delivery rate is ${perfInfo.onTimeDelivery}%, quality score is ${perfInfo.qualityScore}%, and average response time is ${perfInfo.responseTime}. Their last audit was conducted on ${perfInfo.lastAudit}.`;
    } else if (query.includes('compliance') || query.includes('certification')) {
      const complianceInfo = mockSupplierData['acme-corp'].compliance;
      response.content = `Acme Corporation's compliance status is ${complianceInfo.status}. They hold ${complianceInfo.certifications.join(' and ')} certifications. Next audit is due on ${complianceInfo.nextAuditDue}.`;
    } else if (query.includes('help') || query.includes('what')) {
      response.content = "I can help you with:\n- Checking order status (e.g., 'What's the status of Acme's latest order?')\n- Supplier performance (e.g., 'How is Globex performing?')\n- Compliance information (e.g., 'Show me Acme's compliance status')\n- General supplier queries";
    }

    setChatMessages([...newMessages, response]);
    setChatInput('');
  };

  // Mock data for supplier overview
  const supplierMetrics = {
    totalSuppliers: 248,
    activeSuppliers: 215,
    pendingOnboarding: 18,
    highRiskSuppliers: 15,
    totalSpend: 5670000,
    averagePerformance: 87,
  };

  // Mock data for performance trend
  const performanceTrendData = [
    { month: 'Jan', score: 84 },
    { month: 'Feb', score: 86 },
    { month: 'Mar', score: 85 },
    { month: 'Apr', score: 88 },
    { month: 'May', score: 87 },
    { month: 'Jun', score: 89 },
  ];

  // Mock data for spend trend
  const spendTrendData = [
    { month: 'Jan', amount: 420000 },
    { month: 'Feb', amount: 380000 },
    { month: 'Mar', amount: 450000 },
    { month: 'Apr', amount: 410000 },
    { month: 'May', amount: 390000 },
    { month: 'Jun', amount: 460000 },
  ];

  // Mock data for compliance status
  const complianceData = [
    { name: 'Valid', value: 180, color: '#10B981' },
    { name: 'Expiring', value: 35, color: '#F59E0B' },
    { name: 'Expired', value: 20, color: '#EF4444' },
    { name: 'Missing', value: 13, color: '#6B7280' },
  ];

  // Mock data for risk distribution
  const riskDistributionData = [
    { name: 'Low Risk', value: 145, color: '#10B981' },
    { name: 'Medium Risk', value: 68, color: '#F59E0B' },
    { name: 'High Risk', value: 25, color: '#EF4444' },
    { name: 'Critical', value: 10, color: '#991B1B' },
  ];

  return (
    <div className="w-full">
      {/* Chat Assistant */}
      <div className="mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="chat-container h-[400px] overflow-y-auto mb-4 p-2">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-base-content/60">
                  <MdOutlineSearch className="text-4xl mb-2" />
                  <p className="text-center">Ask about supplier orders, performance, or compliance.</p>
                  <p className="text-center text-sm mt-2">Try: "What's the status of Acme's latest order?"</p>
                </div>
              ) : (
                chatMessages.map((msg, index) => (
                  <div key={index} className={`chat ${msg.type === 'user' ? 'chat-end' : 'chat-start'} mb-4`}>
                    <div className={`chat-bubble ${msg.type === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                      {msg.content}
              </div>
                </div>
                ))
              )}
              <div ref={chatEndRef} />
        </div>
        
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about suppliers (e.g., 'What's the status of Acme's latest order?')"
                className="input input-bordered flex-grow"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <MdSend />
                </button>
            </form>
              </div>
            </div>
          </div>
          
      <h1 className="text-2xl font-bold mb-6">Supplier Management Dashboard</h1>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        <Link to="/suppliers" className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Suppliers</p>
              <h3 className="text-2xl font-bold">{supplierMetrics.totalSuppliers}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {supplierMetrics.activeSuppliers} Active
              </p>
              </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <HiOutlineUsers className="text-primary text-xl" />
              </div>
              </div>
        </Link>

        <Link to="/supplier-performance" className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Performance</p>
              <h3 className="text-2xl font-bold">{supplierMetrics.averagePerformance}%</h3>
              <p className="text-sm text-success">↑ 2.3% vs last month</p>
              </div>
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <MdOutlineAnalytics className="text-success text-xl" />
              </div>
              </div>
        </Link>

        <Link to="/spend-analysis" className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Spend YTD</p>
              <h3 className="text-2xl font-bold">${(supplierMetrics.totalSpend / 1000000).toFixed(2)}M</h3>
              <p className="text-sm text-error">↑ 8.5% vs budget</p>
              </div>
            <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
              <MdOutlineAttachMoney className="text-info text-xl" />
              </div>
              </div>
        </Link>

        <Link to="/supplier-risk" className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">High Risk Suppliers</p>
              <h3 className="text-2xl font-bold">{supplierMetrics.highRiskSuppliers}</h3>
              <p className="text-sm text-error">Requires attention</p>
        </div>
            <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center">
              <MdOutlineWarning className="text-error text-xl" />
      </div>
            </div>
        </Link>
          </div>
          
      {/* Key Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Link to="/supplier-onboarding" className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <MdOutlineBusinessCenter className="text-primary text-xl" />
            <h3 className="font-semibold">Supplier Onboarding</h3>
            </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">{supplierMetrics.pendingOnboarding}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Approval</p>
          </div>
            <MdOutlineArrowForward className="text-gray-400" />
            </div>
        </Link>

        <Link to="/procurement" className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <MdOutlineShoppingCart className="text-primary text-xl" />
            <h3 className="font-semibold">Purchase Orders</h3>
            </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">127</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Open Orders</p>
          </div>
            <MdOutlineArrowForward className="text-gray-400" />
        </div>
        </Link>

        <Link to="/invoices" className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <MdOutlineDescription className="text-primary text-xl" />
            <h3 className="font-semibold">Invoices & Payments</h3>
            </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">43</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Approval</p>
                </div>
            <MdOutlineArrowForward className="text-gray-400" />
                </div>
        </Link>
              </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Performance Trend */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Performance Trend</h3>
            <Link to="/supplier-performance" className="text-primary hover:underline text-sm flex items-center gap-1">
              View Details <MdOutlineArrowForward />
            </Link>
                </div>
          <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrendData}>
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
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

        {/* Spend Analysis */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Monthly Spend</h3>
            <Link to="/spend-analysis" className="text-primary hover:underline text-sm flex items-center gap-1">
              View Details <MdOutlineArrowForward />
            </Link>
              </div>
          <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendTrendData}>
                <XAxis dataKey="month" />
                <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                  dataKey="amount"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
              </div>
              </div>

      {/* Risk & Compliance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Status */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Compliance Status</h3>
            <Link to="/supplier-compliance" className="text-primary hover:underline text-sm flex items-center gap-1">
              View Details <MdOutlineArrowForward />
            </Link>
            </div>
          <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complianceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                  <Tooltip />
              </PieChart>
              </ResponsiveContainer>
            </div>
              </div>

        {/* Risk Distribution */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Risk Distribution</h3>
            <Link to="/supplier-risk" className="text-primary hover:underline text-sm flex items-center gap-1">
              View Details <MdOutlineArrowForward />
            </Link>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {riskDistributionData.map((entry, index) => (
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
  );
};

export default Home;
