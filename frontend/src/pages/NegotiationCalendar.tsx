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
import { FiCalendar, FiClock, FiFilter, FiUsers, FiMapPin, FiInfo, FiX, FiCheck, FiEdit, FiPlus, FiTrash2, FiTag, FiMessageSquare, FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { format, addDays, subDays } from 'date-fns';

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
  const [activeFilters, setActiveFilters] = useState<string[]>(['meeting', 'deadline', 'followup', 'preparation']);
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

  // Mock data for events
  const mockEvents: NegotiationEvent[] = [
    {
      id: '1',
      title: 'Initial Negotiation - Acme Industrial',
      start: '2023-08-10T10:00:00',
      end: '2023-08-10T12:00:00',
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
      start: '2023-08-12T14:00:00',
      end: '2023-08-12T15:30:00',
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
      status: 'active'
    },
    {
      id: '3',
      title: 'Price Adjustment - EastWest Chemicals',
      start: '2023-08-15T09:00:00',
      end: '2023-08-15T13:00:00',
      allDay: false,
      vendorId: 'V003',
      vendorName: 'EastWest Chemicals',
      category: 'Electronics',
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
      start: '2023-08-18',
      end: '2023-08-19',
      allDay: true,
      vendorId: 'V004',
      vendorName: 'Precision Tooling Co.',
      category: 'Electronics',
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
      start: '2023-08-21T13:00:00',
      end: '2023-08-21T14:30:00',
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
      start: '2023-08-24T11:00:00',
      end: '2023-08-24T12:00:00',
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
    }
  ];

  // Filter events based on current filters
  const filteredEvents = events.filter(event => {
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    const matchesVendor = selectedVendor === 'all' || event.vendorName === selectedVendor;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesActiveFilters = activeFilters.includes(event.category);
    
    return matchesCategory && matchesStatus && matchesVendor && matchesType && matchesActiveFilters;
  });

  // Get calendar events
  const getFormattedCalendarEvents = () => {
    return filteredEvents.map(event => ({
      id: event.id,
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
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
      case 'scheduled': return 'badge-primary';
      case 'confirmed': return 'badge-success';
      case 'completed': return 'badge-success';
      case 'cancelled': return 'badge-error';
      case 'pending': return 'badge-warning';
      default: return 'badge-ghost';
    }
  };

  // Get priority badge color
  const getPriorityBadgeColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'badge-error';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-info';
      default: return 'badge-ghost';
    }
  };

  // Get event type badge color and icon
  const getEventTypeBadge = (type: string) => {
    switch(type) {
      case 'meeting':
        return {
          color: 'bg-blue-500 text-white',
          icon: <MdOutlineGroup className="mr-1" />
        };
      case 'deadline':
        return {
          color: 'bg-red-500 text-white',
          icon: <MdOutlineAccessTime className="mr-1" />
        };
      case 'followup':
        return {
          color: 'bg-green-500 text-white',
          icon: <MdOutlineMessage className="mr-1" />
        };
      case 'preparation':
        return {
          color: 'bg-yellow-500 text-white',
          icon: <MdOutlineInfo className="mr-1" />
        };
      default:
        return {
          color: 'bg-gray-500 text-white',
          icon: <MdOutlineCalendarToday className="mr-1" />
        };
    }
  };

  // Generate mock data when component mounts
  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  // Filter events based on active filters
  useEffect(() => {
    const filtered = events.filter(event => activeFilters.includes(event.category));
    setEvents(filtered);
  }, [activeFilters]);

  return (
    <div className="container mx-auto p-6">
      {/* ... rest of the component JSX ... */}
    </div>
  );
};

export default NegotiationCalendar; 