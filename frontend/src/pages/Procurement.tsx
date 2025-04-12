import React, { useState } from 'react';
import { MdOutlineAddCircle, MdOutlineEdit, MdOutlineDelete, MdOutlineVisibility, MdOutlineShoppingCart, MdOutlineLocalShipping, MdOutlineReceiptLong } from 'react-icons/md';

interface ProcurementOrder {
  id: number;
  orderNumber: string;
  storeName: string;
  storeId: number;
  vendorName: string;
  vendorId: number;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  status: 'pending' | 'approved' | 'ordered' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

const Procurement = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  // Mock data for procurement orders
  const orders: ProcurementOrder[] = [
    {
      id: 1,
      orderNumber: 'PO-2024-001',
      storeName: 'Downtown Flagship Store',
      storeId: 1,
      vendorName: 'Elite Fixtures & Fittings',
      vendorId: 2,
      orderDate: '2024-03-10',
      deliveryDate: '2024-04-15',
      totalAmount: 125000,
      status: 'approved',
      items: 24,
      category: 'Fixtures',
      priority: 'high'
    },
    {
      id: 2,
      orderNumber: 'PO-2024-002',
      storeName: 'Oxford Street Branch',
      storeId: 2,
      vendorName: 'TechPoint Systems',
      vendorId: 3,
      orderDate: '2024-03-12',
      deliveryDate: '2024-05-01',
      totalAmount: 85000,
      status: 'pending',
      items: 15,
      category: 'IT Equipment',
      priority: 'medium'
    },
    {
      id: 3,
      orderNumber: 'PO-2024-003',
      storeName: 'Yorkdale Mall Kiosk',
      storeId: 3,
      vendorName: 'Retail Display Solutions',
      vendorId: 9,
      orderDate: '2024-02-28',
      deliveryDate: '2024-03-25',
      totalAmount: 35000,
      status: 'shipped',
      items: 8,
      category: 'Displays',
      priority: 'high'
    },
    {
      id: 4,
      orderNumber: 'PO-2024-004',
      storeName: 'Sydney Harbour Store',
      storeId: 4,
      vendorName: 'Secure Solutions Inc',
      vendorId: 4,
      orderDate: '2024-03-05',
      deliveryDate: '2024-04-10',
      totalAmount: 42000,
      status: 'ordered',
      items: 12,
      category: 'Security',
      priority: 'medium'
    },
    {
      id: 5,
      orderNumber: 'PO-2024-005',
      storeName: 'Berlin Central Store',
      storeId: 5,
      vendorName: 'Global Signage Co',
      vendorId: 10,
      orderDate: '2024-02-15',
      deliveryDate: '2024-03-15',
      totalAmount: 28000,
      status: 'delivered',
      items: 6,
      category: 'Signage',
      priority: 'medium'
    },
    {
      id: 6,
      orderNumber: 'PO-2024-006',
      storeName: 'Chicago Riverside Mall',
      storeId: 6,
      vendorName: 'Precision Logistics',
      vendorId: 6,
      orderDate: '2024-03-18',
      deliveryDate: '2024-04-20',
      totalAmount: 15000,
      status: 'pending',
      items: 10,
      category: 'Shipping',
      priority: 'low'
    },
    {
      id: 7,
      orderNumber: 'PO-2024-007',
      storeName: 'Downtown Flagship Store',
      storeId: 1,
      vendorName: 'Office Essentials Inc',
      vendorId: 11,
      orderDate: '2024-01-20',
      deliveryDate: '2024-02-10',
      totalAmount: 8500,
      status: 'cancelled',
      items: 18,
      category: 'Office Supplies',
      priority: 'low'
    }
  ];

  // Filter orders based on selected status and priority
  const filteredOrders = orders.filter(order => 
    (selectedStatus === 'all' || order.status === selectedStatus) &&
    (selectedPriority === 'all' || order.priority === selectedPriority)
  );

  // Status options and priority options for filters
  const statusOptions = ['all', 'pending', 'approved', 'ordered', 'shipped', 'delivered', 'cancelled'];
  const priorityOptions = ['all', 'high', 'medium', 'low'];

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'pending': return 'badge-warning';
      case 'approved': return 'badge-info';
      case 'ordered': return 'badge-primary';
      case 'shipped': return 'badge-secondary';
      case 'delivered': return 'badge-success';
      case 'cancelled': return 'badge-error';
      default: return 'badge-ghost';
    }
  };

  // Function to get priority badge color
  const getPriorityBadgeColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'badge-error';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-success';
      default: return 'badge-ghost';
    }
  };

  // Function to toggle order details
  const toggleOrderDetails = (orderId: number) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate total procurement value
  const totalProcurementValue = orders.reduce((sum, order) => {
    if (order.status !== 'cancelled') {
      return sum + order.totalAmount;
    }
    return sum;
  }, 0);

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Procurement Management</h1>
          <button className="btn btn-primary flex items-center gap-2">
            <MdOutlineAddCircle className="text-xl" />
            Create New Order
          </button>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <MdOutlineShoppingCart className="text-3xl" />
            </div>
            <div className="stat-title">Total Orders</div>
            <div className="stat-value">{orders.length}</div>
            <div className="stat-desc">All procurement orders</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <MdOutlineLocalShipping className="text-3xl" />
            </div>
            <div className="stat-title">In Transit</div>
            <div className="stat-value">{orders.filter(o => o.status === 'shipped').length}</div>
            <div className="stat-desc">Currently shipping</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-accent">
              <MdOutlineReceiptLong className="text-3xl" />
            </div>
            <div className="stat-title">Total Value</div>
            <div className="stat-value">{formatCurrency(totalProcurementValue)}</div>
            <div className="stat-desc">Active orders</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select 
              className="select select-bordered" 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Priority</span>
            </label>
            <select 
              className="select select-bordered" 
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              {priorityOptions.map(priority => (
                <option key={priority} value={priority}>
                  {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Order #</th>
                <th>Store</th>
                <th>Vendor</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <React.Fragment key={order.id}>
                  <tr className="hover cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                    <td>
                      {expandedOrder === order.id ? 
                        <span className="font-bold">-</span> : 
                        <span className="font-bold">+</span>
                      }
                    </td>
                    <td className="font-medium">{order.orderNumber}</td>
                    <td>{order.storeName}</td>
                    <td>{order.vendorName}</td>
                    <td>{order.category}</td>
                    <td>{formatCurrency(order.totalAmount)}</td>
                    <td>{order.deliveryDate}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getPriorityBadgeColor(order.priority)}`}>
                        {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-ghost">
                          <MdOutlineVisibility className="text-lg" />
                        </button>
                        <button className="btn btn-sm btn-ghost">
                          <MdOutlineEdit className="text-lg" />
                        </button>
                        <button className="btn btn-sm btn-ghost text-error">
                          <MdOutlineDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr>
                      <td colSpan={10}>
                        <div className="p-4 bg-base-200 rounded-lg">
                          <h3 className="font-semibold text-lg mb-3">Order Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="stat bg-base-100 rounded-lg">
                              <div className="stat-title">Order Information</div>
                              <div className="text-sm mt-2">
                                <p><span className="font-semibold">Order Date:</span> {order.orderDate}</p>
                                <p><span className="font-semibold">Expected Delivery:</span> {order.deliveryDate}</p>
                                <p><span className="font-semibold">Items:</span> {order.items} products</p>
                              </div>
                            </div>
                            <div className="stat bg-base-100 rounded-lg">
                              <div className="stat-title">Financial Details</div>
                              <div className="text-sm mt-2">
                                <p><span className="font-semibold">Total Amount:</span> {formatCurrency(order.totalAmount)}</p>
                                <p><span className="font-semibold">Average Item Cost:</span> {formatCurrency(order.totalAmount / order.items)}</p>
                                <p><span className="font-semibold">Payment Terms:</span> Net 30</p>
                              </div>
                            </div>
                            <div className="stat bg-base-100 rounded-lg">
                              <div className="stat-title">Shipping Details</div>
                              <div className="text-sm mt-2">
                                <p><span className="font-semibold">Shipping Method:</span> Standard Freight</p>
                                <p><span className="font-semibold">Tracking Number:</span> {order.status === 'shipped' ? 'TRK-' + Math.floor(Math.random() * 1000000) : 'Not available'}</p>
                                <p><span className="font-semibold">Shipping Address:</span> Store Location</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4 gap-2">
                            <button className="btn btn-sm">View Items</button>
                            <button className="btn btn-sm btn-primary">Track Order</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Procurement; 