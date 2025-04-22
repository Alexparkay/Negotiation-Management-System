import React, { useState, useEffect, useRef } from 'react';
import { 
  MdOutlineCalendarToday,
  MdOutlineAdd, 
  MdOutlineFilterList,
  MdOutlineCategory,
  MdOutlineSearch,
  MdOutlineGroup,
  MdOutlineSchedule,
  MdOutlineVideoCall,
  MdOutlineMessage,
  MdOutlineEdit,
  MdOutlineDelete,
  MdOutlineLocationOn,
  MdOutlineAccessTime,
  MdOutlineKeyboardArrowDown,
  MdOutlineDescription,
  MdOutlineRemoveRedEye
} from 'react-icons/md';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import ChatPopup from '../components/ChatPopup';
import { FiCalendar, FiClock, FiFilter, FiUsers, FiMapPin, FiInfo, FiX, FiCheck, FiEdit, FiPlus, FiTrash2, FiTag, FiMessageSquare, FiChevronDown, FiChevronLeft, FiChevronRight, FiFileText } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { format, addDays, subDays } from 'date-fns';
import { Link } from 'react-router-dom';

// Types for calendar events
interface NegotiationEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  vendorId: string;
  vendorName: string;
  category: string;
  location: string;
  type: 'in-person' | 'virtual' | 'phone';
  participants: string[];
  agenda: string[];
  documents: { name: string; url: string }[];
  color: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
}

type EventStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
type EventCategory = 'Electronics' | 'Services' | 'Raw Materials' | 'Packaging';

interface FormData {
  title: string;
  start: string;
  end: string;
  description: string;
  location: string;
  supplier: string;
  status: EventStatus;
  category: EventCategory;
  attendees: string;
  notes: string;
}

const NegotiationCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<NegotiationEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<string>('dayGridMonth');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);
  const [events, setEvents] = useState<NegotiationEvent[]>([]);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [newEventDate, setNewEventDate] = useState<Date | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>(['Electronics', 'Services', 'Raw Materials', 'Packaging']);
  const [selectedCalendarView, setSelectedCalendarView] = useState<string>('dayGridMonth');
  const [filters, setFilters] = useState({
    meeting: true,
    deadline: true,
    followUp: true,
    preparation: true,
    high: true,
    medium: true,
    low: true
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    start: '',
    end: '',
    description: '',
    location: '',
    supplier: '',
    status: 'scheduled',
    category: 'Electronics',
    attendees: '',
    notes: ''
  });
  const [filterStatus, setFilterStatus] = useState<EventStatus | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<EventCategory | 'all'>('all');
  
  const calendarRef = useRef<FullCalendar>(null);

  // Generate today and next 30 days for more relevant mock events
  const today = new Date();
  
  // Mock data for events - using dynamic dates relative to today
  const mockEvents: NegotiationEvent[] = [
    {
      id: '1',
      title: 'Initial Negotiation - Acme Industrial',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 0).toISOString(),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 12, 0).toISOString(),
      allDay: false,
      vendorId: 'V001',
      vendorName: 'Acme Industrial Supplies',
      category: 'Electronics',
      location: 'Virtual Meeting - Zoom',
      type: 'virtual',
      participants: ['Sarah Johnson', 'Mark Williams', 'David Chen'],
      agenda: [
        'Discuss price adjustments for Q3 supply contract',
        'Supplier indicated flexibility on payment terms but firm on pricing'
      ],
      documents: [
        { name: 'Current Contract.pdf', url: '/documents/contract-v1.pdf' },
        { name: 'Price Proposal.xlsx', url: '/documents/price-proposal.xlsx' }
      ],
      color: '#3B82F6',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Contract Review - Global Electronics',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 14, 0).toISOString(),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 15, 30).toISOString(),
      allDay: false,
      vendorId: 'V002',
      vendorName: 'Global Electronics Inc.',
      category: 'Electronics',
      location: 'Conference Room B',
      type: 'in-person',
      participants: ['Sarah Johnson', 'Alex Rodriguez', 'Michael Smith'],
      agenda: [
        'Review contract terms and negotiate payment schedule'
      ],
      documents: [
        { name: 'Supplier Information.pdf', url: '/documents/supplier-info.pdf' },
        { name: 'Requirements Doc.docx', url: '/documents/requirements.docx' }
      ],
      color: '#10B981',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Price Adjustment - EastWest Chemicals',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0).toISOString(),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 13, 0).toISOString(),
      allDay: false,
      vendorId: 'V003',
      vendorName: 'EastWest Chemicals',
      category: 'Raw Materials',
      location: 'Virtual Meeting - Teams',
      type: 'virtual',
      participants: ['Sarah Johnson', 'Jennifer Lee'],
      agenda: [
        'Negotiate bulk pricing and volume discounts',
        'Prepare market research data to support our position'
      ],
      documents: [
        { name: 'Current SLA.pdf', url: '/documents/current-sla.pdf' },
        { name: 'Rate Card.xlsx', url: '/documents/rate-card.xlsx' }
      ],
      color: '#F59E0B',
      status: 'scheduled'
    },
    {
      id: '4',
      title: 'Quarterly Review - Precision Tooling',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toISOString(),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8).toISOString(),
      allDay: true,
      vendorId: 'V004',
      vendorName: 'Precision Tooling Co.',
      category: 'Services',
      location: 'Main Conference Room',
      type: 'in-person',
      participants: ['Sarah Johnson', 'Robert Taylor', 'Amanda Garcia', 'Thomas Wilson'],
      agenda: [
        'Review supplier performance and discuss improvement areas',
        'Focus on quality issues from last shipment'
      ],
      documents: [
        { name: 'Quarterly Report.pdf', url: '/documents/quarterly-report.pdf' },
        { name: 'Quality Metrics.xlsx', url: '/documents/quality-metrics.xlsx' }
      ],
      color: '#EF4444',
      status: 'scheduled'
    },
    {
      id: '5',
      title: 'Shipping Terms - FastTrack Logistics',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 13, 0).toISOString(),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 14, 30).toISOString(),
      allDay: false,
      vendorId: 'V005',
      vendorName: 'FastTrack Logistics',
      category: 'Services',
      location: 'Phone Call',
      type: 'phone',
      participants: ['Sarah Johnson', 'Patricia Moore'],
      agenda: [
        'Renegotiate shipping terms and expedited delivery options',
        'Need to address recent delays and associated costs'
      ],
      documents: [
        { name: 'Current SLA.pdf', url: '/documents/current-sla.pdf' },
        { name: 'Rate Card.xlsx', url: '/documents/rate-card.xlsx' }
      ],
      color: '#8B5CF6',
      status: 'scheduled'
    },
    {
      id: '6',
      title: 'Final Terms - Tech Innovations',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10, 11, 0).toISOString(),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10, 12, 0).toISOString(),
      allDay: false,
      vendorId: 'V006',
      vendorName: 'Tech Innovations',
      category: 'Electronics',
      location: 'Executive Boardroom',
      type: 'in-person',
      participants: ['Sarah Johnson', 'CEO James Wilson', 'Legal Counsel Lisa Brown'],
      agenda: [
        'Finalize contract terms and sign agreement',
        'All major points agreed, need to review final contract language'
      ],
      documents: [
        { name: 'Contract Draft.pdf', url: '/documents/contract-draft.pdf' },
        { name: 'Terms Sheet.pdf', url: '/documents/terms-sheet.pdf' },
        { name: 'Legal Notes.docx', url: '/documents/legal-notes.docx' }
      ],
      color: '#EC4899',
      status: 'scheduled'
    },
    {
      id: '7',
      title: 'Material Supply Agreement - SteelPro Inc.',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0).toISOString(),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 30).toISOString(),
      allDay: false,
      vendorId: 'V007',
      vendorName: 'SteelPro Inc.',
      category: 'Raw Materials',
      location: 'Conference Room A',
      type: 'in-person',
      participants: ['Sarah Johnson', 'John Davis', 'Maria Rodriguez'],
      agenda: [
        'Discuss Q2 pricing adjustments',
        'Review delivery schedule'
      ],
      documents: [
        { name: 'Current Agreement.pdf', url: '/documents/current-agreement.pdf' },
        { name: 'Pricing Sheet.xlsx', url: '/documents/pricing-sheet.xlsx' }
      ],
      color: '#3B82F6',
      status: 'confirmed'
    },
    {
      id: '8',
      title: 'Packaging Redesign - BoxCraft Solutions',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4, 10, 0).toISOString(),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4, 11, 30).toISOString(),
      allDay: false,
      vendorId: 'V008',
      vendorName: 'BoxCraft Solutions',
      category: 'Packaging',
      location: 'Design Studio',
      type: 'in-person',
      participants: ['Sarah Johnson', 'Design Team', 'Marketing Representative'],
      agenda: [
        'Review new packaging designs',
        'Discuss cost implications and timelines'
      ],
      documents: [
        { name: 'Design Concepts.pdf', url: '/documents/design-concepts.pdf' }
      ],
      color: '#6366F1',
      status: 'scheduled'
    }
  ];

  // Filter events based on current filters
  const filteredEvents = events.filter(event => {
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    const matchesVendor = selectedVendor === 'all' || event.vendorName === selectedVendor;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesCategory && matchesStatus && matchesVendor && matchesType;
  });

  // Get calendar events
  const getFormattedCalendarEvents = () => {
    return filteredEvents.map(event => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      backgroundColor: event.color,
      borderColor: event.color,
      allDay: event.allDay,
      extendedProps: event
    }));
  };

  // Handle event click
  const handleEventClick = (info: any) => {
    const clickedEvent = events.find(event => event.id === info.event.id);
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setIsModalOpen(true);
    }
  };

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format time
  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get upcoming events (within the next 7 days)
  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return events
      .filter(event => {
        const eventStart = new Date(event.start);
        return eventStart >= today && eventStart <= nextWeek;
      })
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border border-green-200';
      case 'completed': return 'bg-green-100 text-green-800 border border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Get event type badge color and icon
  const getEventTypeBadge = (type: string) => {
    switch(type) {
      case 'in-person':
        return {
          color: 'bg-blue-100 text-blue-800 border border-blue-200',
          icon: <FiUsers className="mr-1" />
        };
      case 'virtual':
        return {
          color: 'bg-purple-100 text-purple-800 border border-purple-200',
          icon: <MdOutlineVideoCall className="mr-1" />
        };
      case 'phone':
        return {
          color: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
          icon: <MdOutlineMessage className="mr-1" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border border-gray-200',
          icon: <MdOutlineCalendarToday className="mr-1" />
        };
    }
  };

  // Handle date click for adding new event
  const handleDateClick = (info: any) => {
    setNewEventDate(info.date);
    setShowAddEventModal(true);
  };

  // Handle view change
  const handleViewChange = (viewName: string) => {
    setSelectedCalendarView(viewName);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(viewName);
    }
  };

  // Toggle filter
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterCategory('all');
    setFilterStatus('all');
    setSelectedVendor('all');
    setSelectedType('all');
    setActiveFilters(['Electronics', 'Services', 'Raw Materials', 'Packaging']);
  };

  // Generate mock data when component mounts
  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Negotiation Calendar</h1>
            <p className="text-gray-600 mt-1">Track all upcoming negotiation events and deadlines</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setShowAddEventModal(true)}
              className="btn px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <FiPlus className="mr-2" /> Add Negotiation Event
            </button>
            <div className="dropdown dropdown-end">
              <button className="btn px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                <FiCalendar className="mr-2" /> 
                {selectedCalendarView === 'dayGridMonth' ? 'Month' : 
                 selectedCalendarView === 'timeGridWeek' ? 'Week' : 
                 selectedCalendarView === 'timeGridDay' ? 'Day' : 
                 selectedCalendarView === 'listWeek' ? 'List' : 'View'}
                <FiChevronDown className="ml-2" />
              </button>
              <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10 mt-2 border border-gray-200 bg-white">
                <li>
                  <button onClick={() => handleViewChange('dayGridMonth')} className="p-2 hover:bg-gray-100 rounded">Month</button>
                </li>
                <li>
                  <button onClick={() => handleViewChange('timeGridWeek')} className="p-2 hover:bg-gray-100 rounded">Week</button>
                </li>
                <li>
                  <button onClick={() => handleViewChange('timeGridDay')} className="p-2 hover:bg-gray-100 rounded">Day</button>
                </li>
                <li>
                  <button onClick={() => handleViewChange('listWeek')} className="p-2 hover:bg-gray-100 rounded">List</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 text-gray-700 pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as EventCategory | 'all')}
                >
                  <option value="all">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Services">Services</option>
                  <option value="Raw Materials">Raw Materials</option>
                  <option value="Packaging">Packaging</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>

              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 text-gray-700 pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as EventStatus | 'all')}
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>

              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 text-gray-700 pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="in-person">In Person</option>
                  <option value="virtual">Virtual</option>
                  <option value="phone">Phone</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>
              
              {(filterCategory !== 'all' || filterStatus !== 'all' || selectedType !== 'all' || selectedVendor !== 'all') && (
                <button 
                  onClick={resetFilters}
                  className="text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm bg-gray-50 px-3 py-2 rounded-lg border border-gray-300"
                >
                  <FiX /> Reset Filters
                </button>
              )}
            </div>
            
            <div className="relative w-full lg:w-64">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full bg-gray-50 text-gray-700 pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Calendar and Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-6">
              {/* Upcoming Events Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {getUpcomingEvents().slice(0, 5).map(event => (
                    <div 
                      key={event.id} 
                      className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-800">{event.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(event.status)}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-600">
                        <p className="flex items-center">
                          <FiCalendar className="mr-2" /> {formatDate(event.start)}
                        </p>
                        {!event.allDay && (
                          <p className="flex items-center mt-1">
                            <FiClock className="mr-2" /> {formatTime(event.start)} - {formatTime(event.end)}
                          </p>
                        )}
                        <p className="flex items-center mt-1">
                          <FiMapPin className="mr-2" /> {event.location}
                        </p>
                      </div>
                      
                      <div className="mt-2 flex items-center text-sm">
                        <Link 
                          to={`/vendors/${event.vendorId}`} 
                          className="text-blue-600 hover:underline flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {event.vendorName}
                        </Link>
                      </div>
                    </div>
                  ))}
                  
                  {getUpcomingEvents().length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No upcoming events in the next 7 days.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Category Filters */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={activeFilters.includes('Electronics')} 
                      onChange={() => toggleFilter('Electronics')}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Electronics</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={activeFilters.includes('Services')} 
                      onChange={() => toggleFilter('Services')}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Services</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={activeFilters.includes('Raw Materials')} 
                      onChange={() => toggleFilter('Raw Materials')}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Raw Materials</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={activeFilters.includes('Packaging')} 
                      onChange={() => toggleFilter('Packaging')}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Packaging</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Calendar */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }}
              events={getFormattedCalendarEvents()}
              eventClick={handleEventClick}
              dateClick={handleDateClick}
              height="auto"
              aspectRatio={1.8}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={3}
              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short'
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Event Detail Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedEvent.title}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="flex items-center text-gray-700">
                      <FiCalendar className="mr-2" /> {formatDate(selectedEvent.start)}
                    </p>
                    <p className="flex items-center text-gray-700 mt-2">
                      <FiClock className="mr-2" /> 
                      {selectedEvent.allDay 
                        ? 'All day' 
                        : `${formatTime(selectedEvent.start)} - ${formatTime(selectedEvent.end)}`}
                    </p>
                    <p className="flex items-center text-gray-700 mt-2">
                      <FiMapPin className="mr-2" /> {selectedEvent.location}
                    </p>
                    
                    <div className="mt-3 flex items-center">
                      <span className={`px-3 py-1 rounded-full text-sm flex items-center ${getStatusBadgeColor(selectedEvent.status)}`}>
                        {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                      </span>
                      
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm flex items-center ${getEventTypeBadge(selectedEvent.type).color}`}>
                        {getEventTypeBadge(selectedEvent.type).icon}
                        {selectedEvent.type.replace('-', ' ').charAt(0).toUpperCase() + selectedEvent.type.replace('-', ' ').slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="flex items-center text-gray-700">
                      <FiUsers className="mr-2" /> <span className="font-medium">Vendor:</span>
                    </p>
                    <p className="ml-6 mt-1">
                      <Link to={`/vendors/${selectedEvent.vendorId}`} className="text-blue-600 hover:underline">
                        {selectedEvent.vendorName}
                      </Link>
                    </p>
                    
                    <p className="flex items-center text-gray-700 mt-3">
                      <FiTag className="mr-2" /> <span className="font-medium">Category:</span>
                    </p>
                    <p className="ml-6 mt-1">
                      {selectedEvent.category}
                    </p>
                  </div>
                </div>
                
                {/* Participants */}
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Participants</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.participants.map((participant, index) => (
                      <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                        {participant}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Agenda */}
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Agenda</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedEvent.agenda.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Documents */}
                {selectedEvent.documents.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Documents</h4>
                    <div className="space-y-2">
                      {selectedEvent.documents.map((doc, index) => (
                        <div key={index} className="flex items-center p-2 border border-gray-200 rounded-lg">
                          <FiFileText className="text-gray-500 mr-3" />
                          <span className="text-gray-700">{doc.name}</span>
                          <a href={doc.url} className="ml-auto text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <FiEdit className="inline mr-2" /> Edit
                  </button>
                  <button className="px-4 py-2 text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50">
                    <FiTrash2 className="inline mr-2" /> Delete
                  </button>
                  <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    <FiMessageSquare className="inline mr-2" /> Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Add Negotiation Event</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
              }} className="space-y-4">
                {/* Form fields */}
                <div>
                  <label htmlFor="title" className="label">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label htmlFor="start" className="label">Start Date</label>
                  <input
                    type="datetime-local"
                    id="start"
                    name="start"
                    value={formData.start}
                    onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label htmlFor="end" className="label">End Date</label>
                  <input
                    type="datetime-local"
                    id="end"
                    name="end"
                    value={formData.end}
                    onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="textarea textarea-primary w-full"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="label">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label htmlFor="supplier" className="label">Supplier</label>
                  <input
                    type="text"
                    id="supplier"
                    name="supplier"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label htmlFor="status" className="label">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as EventStatus })}
                    className="select select-primary w-full"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="label">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                    className="select select-primary w-full"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Services">Services</option>
                    <option value="Raw Materials">Raw Materials</option>
                    <option value="Packaging">Packaging</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="attendees" className="label">Attendees</label>
                  <input
                    type="text"
                    id="attendees"
                    name="attendees"
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="label">Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="textarea textarea-primary w-full"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button type="submit" className="btn btn-primary">Add Event</button>
                  <button type="reset" className="btn btn-ghost">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      <ChatPopup />
    </div>
  );
};

export default NegotiationCalendar; 