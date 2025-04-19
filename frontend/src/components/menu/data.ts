// import toast from 'react-hot-toast';
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineClipboardDocumentList,
  HiOutlinePencilSquare,
  HiOutlineCalendarDays,
  HiOutlinePresentationChartBar,
  HiOutlineDocumentText,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineScale,
  HiOutlineArchiveBox,
} from 'react-icons/hi2';
import { 
  MdOutlineStorefront, 
  MdOutlineAddBusiness, 
  MdOutlineAssignment,
  MdOutlineShoppingCart,
  MdOutlineDescription,
  MdOutlineDashboard,
  MdOutlineComputer,
  MdOutlineWifi,
  MdOutlineNetworkCheck,
  MdOutlineSecurity,
  MdOutlineMonitor,
  MdOutlineStorage,
  MdOutlinePointOfSale,
  MdOutlineCloud,
  MdOutlineAnalytics,
  MdOutlineAttachMoney,
  MdOutlineInventory,
  MdOutlineWarning,
  MdOutlineInsights,
  MdOutlineIntegrationInstructions,
  MdOutlineAdminPanelSettings,
  MdOutlineCompare,
  MdOutlineTrendingUp,
  MdOutlineHistory,
  MdOutlineCategory,
  MdOutlineEmail,
  MdOutlineTimeline,
  MdOutlineAutoGraph,
  MdOutlineHandshake,
  MdOutlineViewTimeline,
  MdOutlinePriceChange,
  MdOutlineChat,
} from 'react-icons/md';
// import { IoSettingsOutline } from 'react-icons/io5';

export const menu = [
  {
    catalog: 'Main',
    listItems: [
      {
        isLink: true,
        url: '/',
        icon: MdOutlineDashboard,
        label: 'Dashboard',
      },
      {
        isLink: true,
        url: '/chat',
        icon: MdOutlineChat,
        label: 'AI Chat',
      },
    ],
  },
  
  {
    catalog: 'Negotiations',
    listItems: [
      {
        isLink: true,
        url: '/active-negotiations',
        icon: MdOutlineHandshake,
        label: 'Active Negotiations',
      },
      {
        isLink: true,
        url: '/communication-hub',
        icon: MdOutlineEmail,
        label: 'Communication Hub',
      },
      {
        isLink: true,
        url: '/negotiation-history',
        icon: MdOutlineHistory,
        label: 'Negotiation History',
      },
      {
        isLink: true,
        url: '/negotiation-calendar',
        icon: HiOutlineCalendarDays,
        label: 'Negotiation Calendar',
      },
    ],
  },
  
  {
    catalog: 'Vendor Management',
    listItems: [
      {
        isLink: true,
        url: '/vendors',
        icon: HiOutlineUsers,
        label: 'Vendor Directory',
      },
      {
        isLink: true,
        url: '/vendor-comparison',
        icon: MdOutlineCompare,
        label: 'Vendor Comparison',
      },
      {
        isLink: true,
        url: '/vendor-performance',
        icon: MdOutlineAnalytics,
        label: 'Performance Ratings',
      },
      {
        isLink: true,
        url: '/contracts',
        icon: HiOutlineDocumentText,
        label: 'Contracts',
      },
    ],
  },
  
  {
    catalog: 'Market Analytics',
    listItems: [
      {
        isLink: true,
        url: '/price-tracker',
        icon: MdOutlinePriceChange,
        label: 'Price Tracker',
      },
      {
        isLink: true,
        url: '/market-trends',
        icon: MdOutlineTrendingUp,
        label: 'Market Trends',
      },
      {
        isLink: true,
        url: '/product-categories',
        icon: MdOutlineCategory,
        label: 'Product Categories',
      },
      {
        isLink: true,
        url: '/price-forecasting',
        icon: MdOutlineInsights,
        label: 'Price Forecasting',
      },
    ],
  },
  
  {
    catalog: 'Tools',
    listItems: [
      {
        isLink: true,
        url: '/notes',
        icon: HiOutlinePencilSquare,
        label: 'Notes',
      },
      {
        isLink: true,
        url: '/document-repository',
        icon: HiOutlineArchiveBox,
        label: 'Document Repository',
      },
      {
        isLink: true,
        url: '/admin',
        icon: MdOutlineAdminPanelSettings,
        label: 'Settings',
      },
    ],
  },
];
