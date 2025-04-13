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
} from 'react-icons/md';
// import { IoSettingsOutline } from 'react-icons/io5';

export const menu = [
  {
    catalog: 'main',
    listItems: [
      {
        isLink: true,
        url: '/',
        icon: MdOutlineDashboard,
        label: 'dashboard',
      },
    ],
  },
  {
    catalog: 'negotiations',
    listItems: [
      {
        isLink: true,
        url: '/active-negotiations',
        icon: MdOutlineHandshake,
        label: 'active negotiations',
      },
      {
        isLink: true,
        url: '/vendor-comparison',
        icon: MdOutlineCompare,
        label: 'vendor comparison',
      },
      {
        isLink: true,
        url: '/communication-hub',
        icon: MdOutlineEmail,
        label: 'communication hub',
      },
      {
        isLink: true,
        url: '/negotiation-history',
        icon: MdOutlineHistory,
        label: 'negotiation history',
      },
      {
        isLink: true,
        url: '/negotiation-calendar',
        icon: HiOutlineCalendarDays,
        label: 'negotiation calendar',
      },
    ],
  },
  {
    catalog: 'market analytics',
    listItems: [
      {
        isLink: true,
        url: '/price-tracker',
        icon: MdOutlinePriceChange,
        label: 'price tracker',
      },
      {
        isLink: true,
        url: '/market-trends',
        icon: MdOutlineTrendingUp,
        label: 'market trends',
      },
      {
        isLink: true,
        url: '/product-categories',
        icon: MdOutlineCategory,
        label: 'product categories',
      },
      {
        isLink: true,
        url: '/price-forecasting',
        icon: MdOutlineInsights,
        label: 'price forecasting',
      },
    ],
  },
  {
    catalog: 'vendor management',
    listItems: [
      {
        isLink: true,
        url: '/vendors',
        icon: HiOutlineUsers,
        label: 'vendor directory',
      },
      {
        isLink: true,
        url: '/vendor-performance',
        icon: MdOutlineAnalytics,
        label: 'performance ratings',
      },
      {
        isLink: true,
        url: '/contracts',
        icon: HiOutlineDocumentText,
        label: 'contracts',
      },
    ],
  },
  {
    catalog: 'tools',
    listItems: [
      {
        isLink: true,
        url: '/notes',
        icon: HiOutlinePencilSquare,
        label: 'notes',
      },
      {
        isLink: true,
        url: '/document-repository',
        icon: HiOutlineArchiveBox,
        label: 'document repository',
      },
      {
        isLink: true,
        url: '/admin',
        icon: MdOutlineAdminPanelSettings,
        label: 'settings',
      },
    ],
  },
];
