import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineVideoCall,
  MdOutlineChat,
  MdOutlineSearch,
  MdOutlineFilterList,
  MdOutlineSort,
  MdOutlineAdd,
  MdOutlineArrowForward,
  MdOutlineCalendarToday,
  MdOutlineAttachFile,
  MdOutlineInsertDriveFile,
  MdOutlineImage,
  MdOutlinePerson,
  MdOutlineKeyboardArrowDown,
  MdOutlineSchedule,
  MdOutlineHandshake,
  MdOutlineMoreHoriz,
  MdOutlineCheck,
  MdOutlineSave,
  MdOutlineWarning,
  MdOutlineDelete,
  MdOutlineLocationOn,
  MdOutlineSend
} from 'react-icons/md';
import { HiOutlineChatBubbleLeftRight, HiOutlineDocumentText } from 'react-icons/hi2';
import ChatPopup from '../components/ChatPopup';

// Types
interface Communication {
  id: number;
  type: 'email' | 'call' | 'meeting' | 'note';
  subject: string;
  content: string;
  date: string;
  vendor: {
    id: number;
    name: string;
    logo: string;
  };
  participants: string[];
  attachments: {
    name: string;
    type: string;
    size: string;
  }[];
  tags: string[];
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  relatedNegotiation?: number;
}

interface Draft {
  id: number;
  type: 'email' | 'call' | 'meeting' | 'note';
  subject: string;
  content: string;
  to: string[];
  attachments: {
    name: string;
    type: string;
    size: string;
  }[];
}

interface UpcomingMeeting {
  id: number;
  title: string;
  date: string;
  time: string;
  vendor: {
    id: number;
    name: string;
    logo: string;
  };
  participants: string[];
  location: string;
  type: 'negotiation' | 'review' | 'onboarding' | 'general';
}

const CommunicationHub = () => {
  // State
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'drafts' | 'scheduled' | 'archived'>('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [composeType, setComposeType] = useState<'email' | 'call' | 'meeting' | 'note'>('email');
  
  // Mock data using real vendor info from Aldi tenders
  const communications: Communication[] = [
    {
      id: 1,
      type: 'email',
      subject: 'Coffee Supply Agreement - Price Adjustment',
      content: 'Hello Carlos, Following our recent market analysis, we would like to discuss potential adjustments to our pricing for Coffee in Q2. Our data shows a 5% reduction in raw material costs that we believe should be reflected in our contract. Could we schedule a call to discuss this further?',
      date: '2025-04-12 10:23',
      vendor: {
        id: 1,
        name: 'Angola Coffee Exports',
        logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ao.svg'
      },
      participants: ['c.machado@angolacoffee.com', 'procurement@aldi.com'],
      attachments: [
        { name: 'Coffee_Market_Analysis_Q2.pdf', type: 'pdf', size: '2.4 MB' },
        { name: 'Price_Comparison.xlsx', type: 'excel', size: '1.8 MB' }
      ],
      tags: ['negotiation', 'pricing', 'coffee'],
      isRead: true,
      isStarred: true,
      isArchived: false,
      relatedNegotiation: 201
    },
    {
      id: 2,
      type: 'call',
      subject: 'Call Summary: Conditioner Quality Issues',
      content: 'Call with Elena from Greece Beauty Products regarding recent quality issues with Conditioner products. They acknowledged the problem and committed to replacing the affected batch. They will also implement additional quality checks moving forward.',
      date: '2025-04-15 14:30',
      vendor: {
        id: 2,
        name: 'Greece Beauty Products',
        logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/gr.svg'
      },
      participants: ['elena@greecebeauty.com', 'quality@aldi.com', 'procurement@aldi.com'],
      attachments: [
        { name: 'Quality_Report.pdf', type: 'pdf', size: '3.1 MB' }
      ],
      tags: ['quality', 'issue resolution', 'health & beauty'],
      isRead: true,
      isStarred: false,
      isArchived: false
    },
    {
      id: 3,
      type: 'meeting',
      subject: 'Q2 Performance Review Meeting',
      content: 'Quarterly performance review with Burkina Faso Fresh Produce. Discussion points: delivery performance (87%, below target of 90%), quality metrics (meeting expectations), responsiveness (good). Action items: improvement plan for delivery performance to be submitted within 2 weeks.',
      date: '2025-04-02 09:00',
      vendor: {
        id: 3,
        name: 'Burkina Faso Fresh Produce',
        logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/bf.svg'
      },
      participants: ['i.ouedraogo@bffresh.com', 'performance@aldi.com', 'procurement@aldi.com'],
      attachments: [
        { name: 'Q2_Performance_Report.pptx', type: 'powerpoint', size: '4.2 MB' },
        { name: 'Meeting_Minutes.docx', type: 'word', size: '0.8 MB' }
      ],
      tags: ['performance review', 'quarterly', 'fruits & vegetables'],
      isRead: true,
      isStarred: true,
      isArchived: false
    },
    {
      id: 4,
      type: 'email',
      subject: 'New Price List for Organic Deodorant',
      content: 'Dear Aldi Procurement Team, Please find attached our updated price list for Organic Deodorant products. We\'ve been able to maintain most prices, with a slight reduction due to improved manufacturing processes. Our organic certification has been renewed for another year. We look forward to your feedback.',
      date: '2025-04-06 16:45',
      vendor: {
        id: 4,
        name: 'EstoniaPrime',
        logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ee.svg'
      },
      participants: ['k.tamm@estoniaprime.ee', 'procurement@aldi.com'],
      attachments: [
        { name: 'Estonia_PriceList_2025.xlsx', type: 'excel', size: '1.2 MB' }
      ],
      tags: ['pricing', 'organic', 'health & beauty'],
      isRead: false,
      isStarred: false,
      isArchived: false
    },
    {
      id: 5,
      type: 'note',
      subject: 'Notes from Supplier Fair',
      content: 'Met representatives from Costa Rica Cosmetics at the Annual Health & Beauty Suppliers Fair. Discussed potential for expanding our premium moisturizer range. They seemed particularly interested in establishing a long-term relationship and mentioned potential for volume discounts and exclusive product formulations.',
      date: '2025-04-08 11:20',
      vendor: {
        id: 5,
        name: 'Costa Rica Cosmetics',
        logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/cr.svg'
      },
      participants: ['procurement@aldi.com'],
      attachments: [
        { name: 'Product_Catalog.pdf', type: 'pdf', size: '5.6 MB' }
      ],
      tags: ['premium', 'health & beauty', 'expansion'],
      isRead: true,
      isStarred: false,
      isArchived: false
    },
    {
      id: 6,
      type: 'email',
      subject: 'Pepperoni Supply Contract Renewal',
      content: `Dear Aldi Team, As our current supply contract approaches its renewal date, we would like to propose a continuation of our partnership with some adjustments to volume and delivery terms. We believe we can offer even better value with a multi-year agreement. Please find our proposal attached. We're open to discussion on all terms.`,
      date: '2025-04-18 13:15',
      vendor: {
        id: 6,
        name: 'Bosnia Meats International',
        logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ba.svg'
      },
      participants: ['a.begic@bosniameats.ba', 'procurement@aldi.com'],
      attachments: [
        { name: 'Contract_Renewal_Proposal.pdf', type: 'pdf', size: '3.8 MB' },
        { name: 'Price_Schedule_2025.xlsx', type: 'excel', size: '1.5 MB' }
      ],
      tags: ['contract renewal', 'meat products', 'negotiation'],
      isRead: false,
      isStarred: true,
      isArchived: false
    }
  ];

  const drafts: Draft[] = [
    {
      id: 1,
      type: 'email',
      subject: 'Coffee Agreement Follow-up',
      content: 'Draft follow-up to our discussion about pricing adjustments for imported coffee products...',
      to: ['c.machado@angolacoffee.com'],
      attachments: []
    },
    {
      id: 2,
      type: 'note',
      subject: 'Meeting Preparation: EstoniaPrime',
      content: 'Key points to discuss in upcoming meeting about organic deodorant line expansion...',
      to: [],
      attachments: [
        { name: 'Discussion_Points.docx', type: 'word', size: '0.5 MB' }
      ]
    }
  ];

  const upcomingMeetings: UpcomingMeeting[] = [
    {
      id: 1,
      title: 'Coffee Supply Negotiation',
      date: '2025-04-22',
      time: '10:00 - 11:30',
      vendor: {
        id: 1,
        name: 'Angola Coffee Exports',
        logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ao.svg'
      },
      participants: ['Carlos Machado', 'Procurement Team', 'Category Manager'],
      location: 'Virtual - Zoom',
      type: 'negotiation'
    },
    {
      id: 2,
      title: 'Quarterly Vendor Review',
      date: '2025-04-25',
      time: '14:00 - 16:00',
      vendor: {
        id: 3,
        name: 'Burkina Faso Fresh Produce',
        logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/bf.svg'
      },
      participants: ['Ibrahim Ouédraogo', 'Procurement Team', 'Quality Assurance'],
      location: 'Conference Room A',
      type: 'review'
    },
    {
      id: 3,
      title: 'Organic Certification Review',
      date: '2025-04-28',
      time: '09:30 - 11:00',
      vendor: {
        id: 4,
        name: 'EstoniaPrime',
        logo: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ee.svg'
      },
      participants: ['Kristiina Tamm', 'Sustainability Team', 'Procurement'],
      location: 'Virtual - Teams',
      type: 'review'
    }
  ];

  // Function to filter communications
  const getFilteredCommunications = () => {
    let filtered = communications.filter(comm => {
      // Filter by tab
      if (activeTab === 'inbox' && comm.isArchived) return false;
      if (activeTab === 'archived' && !comm.isArchived) return false;
      
      // Filter by search query
      if (searchQuery && !comm.subject.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !comm.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !comm.vendor.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by vendor
      if (selectedVendor !== null && comm.vendor.id !== selectedVendor) return false;
      
      // Filter by type
      if (selectedType !== null && comm.type !== selectedType) return false;
      
      return true;
    });
    
    return filtered;
  };

  // Get the selected communication
  const getSelectedCommunication = () => {
    return communications.find(comm => comm.id === selectedItem);
  };

  // Render the compose form
  const renderComposeForm = () => {
    return (
      <div className="glass-panel rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {composeType === 'email' && 'Compose Email'}
            {composeType === 'call' && 'Log Call'}
            {composeType === 'meeting' && 'Schedule Meeting'}
            {composeType === 'note' && 'Create Note'}
          </h3>
          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-sm btn-ghost">
                Change Type <MdOutlineKeyboardArrowDown />
              </button>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><button onClick={() => setComposeType('email')}>Email</button></li>
                <li><button onClick={() => setComposeType('call')}>Call Log</button></li>
                <li><button onClick={() => setComposeType('meeting')}>Meeting</button></li>
                <li><button onClick={() => setComposeType('note')}>Note</button></li>
              </ul>
            </div>
            <button className="btn btn-sm btn-ghost" onClick={() => setShowComposeForm(false)}>Cancel</button>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          {/* Recipient/Vendor Selector */}
          {(composeType === 'email' || composeType === 'call' || composeType === 'meeting') && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">To:</span>
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>Select vendor or contact</option>
                <option>Angola Coffee Exports (Carlos Machado)</option>
                <option>Greece Beauty Products (Elena Papadopoulos)</option>
                <option>Burkina Faso Fresh Produce (Ibrahim Ouédraogo)</option>
                <option>EstoniaPrime (Kristiina Tamm)</option>
                <option>Costa Rica Cosmetics (Maria Hernandez)</option>
                <option>Bosnia Meats International (Adnan Begić)</option>
              </select>
            </div>
          )}
          
          {/* Subject */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Subject:</span>
            </label>
            <input type="text" placeholder="Enter subject" className="input input-bordered w-full" />
          </div>
          
          {/* Date/Time for meetings */}
          {composeType === 'meeting' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date:</span>
                </label>
                <input type="date" className="input input-bordered w-full" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Time:</span>
                </label>
                <input type="time" className="input input-bordered w-full" />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Location:</span>
                </label>
                <input type="text" placeholder="Enter location or meeting link" className="input input-bordered w-full" />
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                {composeType === 'email' && 'Message:'}
                {composeType === 'call' && 'Call Notes:'}
                {composeType === 'meeting' && 'Agenda:'}
                {composeType === 'note' && 'Note:'}
              </span>
            </label>
            <textarea className="textarea textarea-bordered h-40" placeholder="Enter content..."></textarea>
          </div>
          
          {/* Related Negotiation */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Related Negotiation (Optional):</span>
            </label>
            <select className="select select-bordered w-full">
              <option disabled selected>Select related negotiation</option>
              <option>Coffee Supply Agreement - Angola Coffee Exports</option>
              <option>Health & Beauty Products - Greece Beauty Products</option>
              <option>Fresh Produce Supply - Burkina Faso Fresh Produce</option>
              <option>Organic Deodorant - EstoniaPrime</option>
            </select>
          </div>
          
          {/* Attachments - Only for emails and notes */}
          {(composeType === 'email' || composeType === 'note') && (
            <div className="flex gap-2 items-center">
              <span className="label-text">Attachments:</span>
              <button className="btn btn-sm btn-ghost">
                <MdOutlineAttachFile className="mr-1" /> Add File
              </button>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <button className="btn btn-outline">Save as Draft</button>
            {composeType === 'email' && (
              <button className="btn btn-primary">
                <MdOutlineSend className="mr-1" /> Send Email
              </button>
            )}
            {composeType === 'call' && (
              <button className="btn btn-primary">
                <MdOutlineCheck className="mr-1" /> Save Call Log
              </button>
            )}
            {composeType === 'meeting' && (
              <button className="btn btn-primary">
                <MdOutlineCalendarToday className="mr-1" /> Schedule Meeting
              </button>
            )}
            {composeType === 'note' && (
              <button className="btn btn-primary">
                <MdOutlineSave className="mr-1" /> Save Note
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render the selected communication detail
  const renderCommunicationDetail = () => {
    const comm = getSelectedCommunication();
    if (!comm) return null;
    
    return (
      <div className="glass-panel rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img src={comm.vendor.logo} alt={comm.vendor.name} className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="text-lg font-semibold text-text-primary">{comm.subject}</h3>
              <p className="text-sm text-text-muted">
                {comm.type === 'email' && 'Email from '}
                {comm.type === 'call' && 'Call with '}
                {comm.type === 'meeting' && 'Meeting with '}
                {comm.type === 'note' && 'Note about '}
                <Link to={`/vendors/${comm.vendor.id}`} className="text-accent-primary hover:underline">
                  {comm.vendor.name}
                </Link> 
                {` • ${comm.date}`}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {comm.relatedNegotiation && (
              <Link to={`/active-negotiations/${comm.relatedNegotiation}`} className="btn btn-sm btn-outline">
                <MdOutlineHandshake className="mr-1" /> View Negotiation
              </Link>
            )}
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-sm btn-ghost">
                <MdOutlineMoreHoriz />
              </button>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
                <li><a><MdOutlineEmail className="text-lg" /> Reply</a></li>
                <li><a><MdOutlinePhone className="text-lg" /> Schedule Call</a></li>
                <li><a><MdOutlineWarning className="text-lg" /> Mark as Important</a></li>
                <li><a><MdOutlineArrowForward className="text-lg" /> Forward</a></li>
                <li><a className="text-error"><MdOutlineDelete className="text-lg" /> Delete</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="divider my-2"></div>
        
        {/* Communication Body */}
        <div className="my-6 whitespace-pre-line">
          <p className="text-text-primary">{comm.content}</p>
        </div>
        
        {/* Attachments if any */}
        {comm.attachments.length > 0 && (
          <div className="my-6">
            <h4 className="text-sm font-semibold mb-2">Attachments ({comm.attachments.length})</h4>
            <div className="flex flex-wrap gap-3">
              {comm.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center glass-panel p-3 rounded-lg">
                  {attachment.type === 'pdf' && <MdOutlineInsertDriveFile className="text-red-500 mr-2 text-lg" />}
                  {attachment.type === 'excel' && <MdOutlineInsertDriveFile className="text-green-500 mr-2 text-lg" />}
                  {attachment.type === 'word' && <MdOutlineInsertDriveFile className="text-blue-500 mr-2 text-lg" />}
                  {attachment.type === 'powerpoint' && <MdOutlineInsertDriveFile className="text-orange-500 mr-2 text-lg" />}
                  {attachment.type === 'image' && <MdOutlineImage className="text-purple-500 mr-2 text-lg" />}
                  <div>
                    <p className="text-sm font-medium">{attachment.name}</p>
                    <p className="text-xs text-text-muted">{attachment.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Tags */}
        {comm.tags.length > 0 && (
          <div className="my-6">
            <h4 className="text-sm font-semibold mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {comm.tags.map((tag, index) => (
                <div key={index} className="badge badge-outline">{tag}</div>
              ))}
            </div>
          </div>
        )}
        
        {/* Participants */}
        <div className="my-6">
          <h4 className="text-sm font-semibold mb-2">Participants</h4>
          <div className="flex flex-wrap gap-2">
            {comm.participants.map((participant, index) => (
              <div key={index} className="flex items-center glass-panel px-3 py-1 rounded-lg">
                <MdOutlinePerson className="mr-1 text-text-muted" />
                <span className="text-sm">{participant}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Reply for emails */}
        {comm.type === 'email' && (
          <div className="mt-8">
            <textarea className="textarea textarea-bordered w-full" placeholder="Type your reply..."></textarea>
            <div className="flex justify-between mt-2">
              <button className="btn btn-sm btn-ghost">
                <MdOutlineAttachFile /> Attach File
              </button>
              <button className="btn btn-sm btn-primary">
                <MdOutlineSend className="mr-1" /> Send Reply
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-text-primary">Communication Hub</h1>
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-primary flex items-center gap-2">
            <MdOutlineAdd className="text-lg" /> New Communication
          </button>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
            <li><button onClick={() => { setComposeType('email'); setShowComposeForm(true); }}>
              <MdOutlineEmail className="text-lg" /> Email
            </button></li>
            <li><button onClick={() => { setComposeType('call'); setShowComposeForm(true); }}>
              <MdOutlinePhone className="text-lg" /> Log Call
            </button></li>
            <li><button onClick={() => { setComposeType('meeting'); setShowComposeForm(true); }}>
              <MdOutlineCalendarToday className="text-lg" /> Schedule Meeting
            </button></li>
            <li><button onClick={() => { setComposeType('note'); setShowComposeForm(true); }}>
              <HiOutlineDocumentText className="text-lg" /> Create Note
            </button></li>
          </ul>
        </div>
      </div>

      {/* Compose Form */}
      {showComposeForm && renderComposeForm()}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Communication List */}
        <div className="lg:col-span-1">
          {/* Tabs & Filters */}
          <div className="glass-panel rounded-xl p-4 mb-6">
            <div className="tabs tabs-boxed bg-base-200/50 p-1 rounded-lg mb-4 w-full flex">
              <button 
                className={`tab flex-1 ${activeTab === 'inbox' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('inbox')}
              >
                Inbox
              </button>
              <button 
                className={`tab flex-1 ${activeTab === 'sent' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('sent')}
              >
                Sent
              </button>
              <button 
                className={`tab flex-1 ${activeTab === 'drafts' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('drafts')}
              >
                Drafts
              </button>
              <button 
                className={`tab flex-1 ${activeTab === 'scheduled' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('scheduled')}
              >
                Scheduled
              </button>
              <button 
                className={`tab flex-1 ${activeTab === 'archived' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('archived')}
              >
                Archived
              </button>
            </div>
            
            <div className="relative mb-4">
              <MdOutlineSearch className="absolute left-3 top-3 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search communications..." 
                className="input input-bordered w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="dropdown dropdown-hover">
                <button tabIndex={0} className="btn btn-sm btn-outline flex items-center gap-1">
                  <MdOutlineFilterList /> Vendor <MdOutlineKeyboardArrowDown />
                </button>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><button onClick={() => setSelectedVendor(null)}>All Vendors</button></li>
                  <li><button onClick={() => setSelectedVendor(1)}>TechVision Inc.</button></li>
                  <li><button onClick={() => setSelectedVendor(2)}>NetWare Solutions</button></li>
                  <li><button onClick={() => setSelectedVendor(3)}>DataSphere Systems</button></li>
                  <li><button onClick={() => setSelectedVendor(4)}>GlobalConnect Ltd</button></li>
                </ul>
              </div>
              
              <div className="dropdown dropdown-hover">
                <button tabIndex={0} className="btn btn-sm btn-outline flex items-center gap-1">
                  <MdOutlineFilterList /> Type <MdOutlineKeyboardArrowDown />
                </button>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><button onClick={() => setSelectedType(null)}>All Types</button></li>
                  <li><button onClick={() => setSelectedType('email')}>Emails</button></li>
                  <li><button onClick={() => setSelectedType('call')}>Calls</button></li>
                  <li><button onClick={() => setSelectedType('meeting')}>Meetings</button></li>
                  <li><button onClick={() => setSelectedType('note')}>Notes</button></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Communication List */}
          <div className="glass-panel rounded-xl overflow-hidden">
            <div className="divide-y divide-base-300">
              {getFilteredCommunications().map(comm => (
                <button 
                  key={comm.id}
                  className={`p-4 w-full text-left transition-colors hover:bg-base-200/50 ${selectedItem === comm.id ? 'bg-base-200/70' : ''} ${!comm.isRead && 'border-l-4 border-accent-primary'}`}
                  onClick={() => setSelectedItem(comm.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {comm.type === 'email' && <MdOutlineEmail className="text-[#24bce7] text-lg" />}
                    {comm.type === 'call' && <MdOutlinePhone className="text-[#00005e] text-lg" />}
                    {comm.type === 'meeting' && <MdOutlineVideoCall className="text-[#f4c200] text-lg" />}
                    {comm.type === 'note' && <MdOutlineChat className="text-[#f87304] text-lg" />}
                    <div className="flex-1 truncate font-medium">{comm.subject}</div>
                    {comm.isStarred && <span className="text-warning">★</span>}
                  </div>
                  <div className="flex justify-between text-sm text-text-muted mb-1">
                    <span>{comm.vendor.name}</span>
                    <span>{comm.date.split(' ')[0]}</span>
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-2">{comm.content}</p>
                  {comm.attachments.length > 0 && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-text-muted">
                      <MdOutlineAttachFile />
                      <span>{comm.attachments.length} attachment{comm.attachments.length > 1 ? 's' : ''}</span>
                    </div>
                  )}
                </button>
              ))}
              
              {getFilteredCommunications().length === 0 && (
                <div className="p-8 text-center text-text-muted">
                  <HiOutlineChatBubbleLeftRight className="mx-auto text-4xl mb-2" />
                  <p>No communications found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column - Communication Detail or Upcoming Meetings */}
        <div className="lg:col-span-2">
          {selectedItem ? (
            renderCommunicationDetail()
          ) : (
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Upcoming Meetings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {upcomingMeetings.map(meeting => (
                  <div key={meeting.id} className="glass-panel rounded-lg p-4 hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${
                          meeting.type === 'negotiation' ? 'bg-blue-500/20' : 
                          meeting.type === 'review' ? 'bg-green-500/20' : 
                          meeting.type === 'onboarding' ? 'bg-purple-500/20' : 
                          'bg-gray-500/20'
                        }`}>
                          <MdOutlineSchedule className={`text-xl ${
                            meeting.type === 'negotiation' ? 'text-blue-500' : 
                            meeting.type === 'review' ? 'text-green-500' : 
                            meeting.type === 'onboarding' ? 'text-purple-500' : 
                            'text-gray-500'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{meeting.title}</h3>
                          <p className="text-sm text-text-muted">{meeting.vendor.name}</p>
                        </div>
                      </div>
                      <span className="badge badge-sm">
                        {meeting.type.charAt(0).toUpperCase() + meeting.type.slice(1)}
                      </span>
                    </div>
                    
                    <div className="pl-12">
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <MdOutlineCalendarToday className="text-text-muted" />
                        <span>{meeting.date} • {meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <MdOutlineLocationOn className="text-text-muted" />
                        <span>{meeting.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MdOutlinePerson className="text-text-muted" />
                        <span>{meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}</span>
                      </div>
                      
                      <div className="flex justify-end mt-3">
                        <button className="btn btn-sm btn-outline">View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="divider my-6">Recent Activity</div>
              
              <div className="space-y-4">
                {getFilteredCommunications().slice(0, 3).map(comm => (
                  <div key={comm.id} className="glass-panel p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full 
                        ${comm.type === 'email' ? 'bg-[#24bce7]/20' : 
                          comm.type === 'call' ? 'bg-[#00005e]/20' : 
                          comm.type === 'meeting' ? 'bg-[#f4c200]/20' : 
                          'bg-[#f87304]/20'}`
                      }>
                        {comm.type === 'email' && <MdOutlineEmail className={`text-[#24bce7] text-lg`} />}
                        {comm.type === 'call' && <MdOutlinePhone className={`text-[#00005e] text-lg`} />}
                        {comm.type === 'meeting' && <MdOutlineVideoCall className={`text-[#f4c200] text-lg`} />}
                        {comm.type === 'note' && <MdOutlineChat className={`text-[#f87304] text-lg`} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-text-primary mb-1">
                            {comm.subject}
                          </h3>
                          <span className="text-xs text-text-muted">{comm.date.split(' ')[0]}</span>
                        </div>
                        <p className="text-sm text-text-secondary line-clamp-2">{comm.content}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <img src={comm.vendor.logo} alt={comm.vendor.name} className="w-6 h-6 rounded-full" />
                          <span className="text-xs">{comm.vendor.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button 
                        className="btn btn-sm btn-ghost text-accent-primary"
                        onClick={() => setSelectedItem(comm.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <ChatPopup />
    </div>
  );
};

export default CommunicationHub;
