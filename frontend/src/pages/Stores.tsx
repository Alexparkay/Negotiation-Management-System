import React, { useState } from 'react';
import { MdOutlineAddCircle, MdOutlineEdit, MdOutlineDelete, MdOutlineVisibility, MdOutlineLocationOn, MdOutlineCalendarToday, MdOutlineAssignment, MdOutlineStorefront, MdOutlineTask, MdOutlinePeopleAlt, MdOutlineSave, MdOutlineCancel, MdOutlineAttachMoney, MdOutlineCategory, MdOutlinePerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface Store {
  id: number;
  name: string;
  location: string;
  country: string;
  openingDate: string;
  status: 'planning' | 'in-progress' | 'completed' | 'delayed';
  completionPercentage: number;
  size: number;
  budget: number;
  manager: string;
  staffCount: number;
  tasksTotal: number;
  tasksCompleted: number;
}

const Stores = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [expandedStore, setExpandedStore] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    country: 'USA',
    openingDate: '',
    size: '',
    budget: '',
    manager: '',
    storeType: 'retail',
    description: ''
  });

  // Mock data for stores
  const stores: Store[] = [
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

  // Filter stores based on selected status and country
  const filteredStores = stores.filter(store => 
    (selectedStatus === 'all' || store.status === selectedStatus) &&
    (selectedCountry === 'all' || store.country === selectedCountry)
  );

  // Status options and countries for filters
  const statusOptions = ['all', 'planning', 'in-progress', 'completed', 'delayed'];
  const countries = ['all', 'USA', 'UK', 'Canada', 'Australia', 'Germany'];

  // Countries and store types for the form
  const formCountries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'China', 'India'];
  const storeTypes = ['retail', 'flagship', 'popup', 'kiosk', 'outlet'];

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'planning': return 'badge-info';
      case 'in-progress': return 'badge-warning';
      case 'completed': return 'badge-success';
      case 'delayed': return 'badge-error';
      default: return 'badge-ghost';
    }
  };

  // Function to toggle store details
  const toggleStoreDetails = (storeId: number) => {
    if (expandedStore === storeId) {
      setExpandedStore(null);
    } else {
      setExpandedStore(storeId);
    }
  };

  const navigateToStoreIT = (storeId: number) => {
    // In a real app, this would navigate to a filtered view of IT systems for this store
    navigate('/infrastructure', { state: { storeId } });
  };

  const navigateToStoreTasks = (storeId: number) => {
    // In a real app, this would navigate to a filtered view of tasks for this store
    navigate('/tasks', { state: { storeId } });
  };

  const navigateToStoreChecklists = (storeId: number) => {
    // In a real app, this would navigate to a filtered view of checklists for this store
    navigate('/checklists', { state: { storeId } });
  };

  const navigateToStoreStaff = (storeId: number) => {
    // In a real app, this would navigate to a filtered view of staff for this store
    navigate('/users', { state: { storeId } });
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

  // Function to format area
  const formatArea = (sqft: number) => {
    return new Intl.NumberFormat('en-US').format(sqft) + ' sq ft';
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Store created successfully!');
    
    // Close the modal and reset form
    setIsModalOpen(false);
    setFormData({
      name: '',
      location: '',
      country: 'USA',
      openingDate: '',
      size: '',
      budget: '',
      manager: '',
      storeType: 'retail',
      description: ''
    });
  };

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Store Management</h1>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={() => navigate('/new-store')}>
            <MdOutlineAddCircle className="text-xl" />
            New Store
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select 
            className="select select-bordered w-full max-w-xs" 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Country</span>
          </label>
          <select 
            className="select select-bordered w-full max-w-xs" 
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="all">All Countries</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
            <option value="China">China</option>
          </select>
        </div>
      </div>

      {/* Stores List */}
      <div className="grid grid-cols-1 gap-6">
        {stores
          .filter(store => selectedStatus === 'all' || store.status === selectedStatus)
          .filter(store => selectedCountry === 'all' || store.country === selectedCountry)
          .map(store => (
            <div key={store.id} className="card bg-base-100 shadow-xl">
              <div className="card-body p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <MdOutlineStorefront className="text-3xl text-primary" />
                    <div>
                      <h2 className="card-title text-xl">{store.name}</h2>
                      <div className="flex items-center text-sm text-gray-500">
                        <MdOutlineLocationOn className="mr-1" />
                        {store.location}, {store.country}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${getStatusBadgeColor(store.status)}`}>
                      {store.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="radial-progress text-primary" style={{ "--value": store.completionPercentage, "--size": "2.5rem" } as React.CSSProperties}>
                        <span className="text-xs">{store.completionPercentage}%</span>
                      </div>
                    </div>
                    <button 
                      className="btn btn-sm btn-ghost"
                      onClick={() => toggleStoreDetails(store.id)}
                    >
                      <MdOutlineVisibility className="text-xl" />
                      {expandedStore === store.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                </div>

                {expandedStore === store.id && (
                  <div className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="stat bg-base-200 rounded-box p-4 cursor-pointer hover:bg-base-300 transition-all" onClick={() => navigateToStoreIT(store.id)}>
                        <div className="stat-title">IT Systems</div>
                        <div className="stat-value text-primary text-2xl">{store.completionPercentage}%</div>
                        <div className="stat-desc">Implementation progress</div>
                        <div className="mt-2 text-xs text-primary">Click to view IT systems</div>
                      </div>
                      <div className="stat bg-base-200 rounded-box p-4 cursor-pointer hover:bg-base-300 transition-all" onClick={() => navigateToStoreTasks(store.id)}>
                        <div className="stat-title">Tasks</div>
                        <div className="stat-value text-secondary text-2xl">{store.tasksCompleted}/{store.tasksTotal}</div>
                        <div className="stat-desc">{Math.round((store.tasksCompleted / store.tasksTotal) * 100)}% completed</div>
                        <div className="mt-2 text-xs text-secondary">Click to view tasks</div>
                      </div>
                      <div className="stat bg-base-200 rounded-box p-4 cursor-pointer hover:bg-base-300 transition-all" onClick={() => navigateToStoreChecklists(store.id)}>
                        <div className="stat-title">Checklists</div>
                        <div className="stat-value text-accent text-2xl">4/7</div>
                        <div className="stat-desc">57% completed</div>
                        <div className="mt-2 text-xs text-accent">Click to view checklists</div>
                      </div>
                      <div className="stat bg-base-200 rounded-box p-4 cursor-pointer hover:bg-base-300 transition-all" onClick={() => navigateToStoreStaff(store.id)}>
                        <div className="stat-title">Staff</div>
                        <div className="stat-value text-info text-2xl">{store.staffCount}</div>
                        <div className="stat-desc">Team members</div>
                        <div className="mt-2 text-xs text-info">Click to view staff</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex flex-col p-4 bg-base-200 rounded-box">
                        <span className="text-sm font-semibold">Opening Date</span>
                        <div className="flex items-center mt-1">
                          <MdOutlineCalendarToday className="mr-2 text-primary" />
                          <span>{new Date(store.openingDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col p-4 bg-base-200 rounded-box">
                        <span className="text-sm font-semibold">Store Size</span>
                        <div className="flex items-center mt-1">
                          <MdOutlineCategory className="mr-2 text-primary" />
                          <span>{formatArea(store.size)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col p-4 bg-base-200 rounded-box">
                        <span className="text-sm font-semibold">Budget</span>
                        <div className="flex items-center mt-1">
                          <MdOutlineAttachMoney className="mr-2 text-primary" />
                          <span>{formatCurrency(store.budget)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col p-4 bg-base-200 rounded-box mb-4">
                      <span className="text-sm font-semibold">Store Manager</span>
                      <div className="flex items-center mt-1">
                        <MdOutlinePerson className="mr-2 text-primary" />
                        <span>{store.manager}</span>
                      </div>
                    </div>

                    <div className="card-actions justify-end">
                      <button className="btn btn-sm btn-outline" onClick={() => navigate(`/tasks?store=${store.id}`)}>
                        <MdOutlineTask className="text-lg" />
                        View Tasks
                      </button>
                      <button className="btn btn-sm btn-outline" onClick={() => navigate(`/checklists?store=${store.id}`)}>
                        <MdOutlineAssignment className="text-lg" />
                        View Checklists
                      </button>
                      <button className="btn btn-sm btn-primary" onClick={() => navigate(`/infrastructure?store=${store.id}`)}>
                        <MdOutlineStorefront className="text-lg" />
                        View IT Systems
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* New Store Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add New Store</h2>
                <button 
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Store Name */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Store Name*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <MdOutlineCategory className="text-gray-500" />
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter store name"
                        className="input input-bordered w-full pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Location*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <MdOutlineLocationOn className="text-gray-500" />
                      </span>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, State"
                        className="input input-bordered w-full pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Country*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                      required
                    >
                      {formCountries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  {/* Opening Date */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Opening Date*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <MdOutlineCalendarToday className="text-gray-500" />
                      </span>
                      <input
                        type="date"
                        name="openingDate"
                        value={formData.openingDate}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Store Size */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Store Size (sq ft)*</span>
                    </label>
                    <input
                      type="number"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      placeholder="Enter store size"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  {/* Budget */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Budget (USD)*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <MdOutlineAttachMoney className="text-gray-500" />
                      </span>
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="Enter budget"
                        className="input input-bordered w-full pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Store Manager */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Store Manager*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <MdOutlinePerson className="text-gray-500" />
                      </span>
                      <input
                        type="text"
                        name="manager"
                        value={formData.manager}
                        onChange={handleChange}
                        placeholder="Enter manager name"
                        className="input input-bordered w-full pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Store Type */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Store Type*</span>
                    </label>
                    <select
                      name="storeType"
                      value={formData.storeType}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                      required
                    >
                      {storeTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter store description"
                    className="textarea textarea-bordered w-full h-32"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    className="btn btn-ghost flex items-center gap-2"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <MdOutlineCancel className="text-xl" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex items-center gap-2"
                  >
                    <MdOutlineSave className="text-xl" />
                    Save Store
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stores; 