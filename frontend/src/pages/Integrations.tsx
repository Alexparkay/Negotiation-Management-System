import { useState } from 'react';
import {
  MdOutlineIntegrationInstructions,
  MdOutlineCheck,
  MdOutlineWarning,
  MdOutlineError,
  MdOutlineSync,
  MdOutlineSettings,
  MdOutlineAdd,
  MdOutlineDelete,
  MdOutlinePause,
  MdOutlinePlayArrow,
  MdOutlineSchedule,
} from 'react-icons/md';

interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
  nextSync: string;
  description: string;
  connectedTo: string;
  dataFlow: 'inbound' | 'outbound' | 'bidirectional';
}

const Integrations = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock integrations data
  const integrations: Integration[] = [
    {
      id: 'INT-001',
      name: 'ERP System',
      type: 'Enterprise',
      status: 'active',
      lastSync: '2024-03-05 14:30:00',
      nextSync: '2024-03-05 15:30:00',
      description: 'Main ERP system integration for order and inventory management',
      connectedTo: 'SAP ERP',
      dataFlow: 'bidirectional',
    },
    {
      id: 'INT-002',
      name: 'Payment Gateway',
      type: 'Financial',
      status: 'active',
      lastSync: '2024-03-05 14:25:00',
      nextSync: '2024-03-05 14:55:00',
      description: 'Payment processing and transaction management',
      connectedTo: 'Stripe',
      dataFlow: 'bidirectional',
    },
    {
      id: 'INT-003',
      name: 'Warehouse Management',
      type: 'Logistics',
      status: 'error',
      lastSync: '2024-03-05 13:00:00',
      nextSync: '2024-03-05 14:00:00',
      description: 'Warehouse inventory and logistics management',
      connectedTo: 'Manhattan WMS',
      dataFlow: 'inbound',
    },
    {
      id: 'INT-004',
      name: 'CRM System',
      type: 'Customer',
      status: 'inactive',
      lastSync: '2024-03-04 23:00:00',
      nextSync: '2024-03-05 23:00:00',
      description: 'Customer relationship management integration',
      connectedTo: 'Salesforce',
      dataFlow: 'outbound',
    },
  ];

  const getStatusBadge = (status: Integration['status']) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-content', icon: MdOutlineCheck },
      inactive: { color: 'bg-warning text-warning-content', icon: MdOutlinePause },
      error: { color: 'bg-error text-error-content', icon: MdOutlineError },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${config.color}`}>
        <Icon className="w-4 h-4" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getDataFlowBadge = (dataFlow: Integration['dataFlow']) => {
    const flowConfig = {
      inbound: 'bg-info text-info-content',
      outbound: 'bg-warning text-warning-content',
      bidirectional: 'bg-primary text-primary-content',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${flowConfig[dataFlow]}`}>
        {dataFlow.charAt(0).toUpperCase() + dataFlow.slice(1)}
      </span>
    );
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesStatus = filterStatus === 'all' || integration.status === filterStatus;
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Integrations</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search integrations..."
            className="input input-bordered input-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select select-bordered select-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="error">Error</option>
          </select>
          <button className="btn btn-primary btn-sm">
            <MdOutlineAdd className="text-lg" /> Add Integration
          </button>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{integration.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{integration.type}</p>
              </div>
              <div className="flex gap-2">
                {integration.status === 'active' ? (
                  <button className="btn btn-ghost btn-xs">
                    <MdOutlinePause className="text-lg" />
                  </button>
                ) : (
                  <button className="btn btn-ghost btn-xs">
                    <MdOutlinePlayArrow className="text-lg" />
                  </button>
                )}
                <button className="btn btn-ghost btn-xs">
                  <MdOutlineSettings className="text-lg" />
                </button>
                <button className="btn btn-ghost btn-xs text-error">
                  <MdOutlineDelete className="text-lg" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                {getStatusBadge(integration.status)}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Connected To</span>
                <span className="text-sm font-medium">{integration.connectedTo}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Data Flow</span>
                {getDataFlowBadge(integration.dataFlow)}
              </div>

              <div className="border-t border-base-300 dark:border-slate-700 pt-3">
                <div className="flex items-center gap-2 text-sm">
                  <MdOutlineSync className="text-gray-500" />
                  <span className="text-gray-500 dark:text-gray-400">Last Sync:</span>
                  <span>{new Date(integration.lastSync).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <MdOutlineSchedule className="text-gray-500" />
                  <span className="text-gray-500 dark:text-gray-400">Next Sync:</span>
                  <span>{new Date(integration.nextSync).toLocaleString()}</span>
                </div>
              </div>

              {integration.status === 'error' && (
                <div className="bg-error/10 text-error rounded p-2 text-sm mt-2">
                  <div className="flex items-center gap-2">
                    <MdOutlineWarning />
                    <span>Connection error. Check configuration.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrations; 