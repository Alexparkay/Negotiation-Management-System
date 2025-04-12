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
    catalog: 'supplier management',
    listItems: [
      {
        isLink: true,
        url: '/suppliers',
        icon: HiOutlineUsers,
        label: 'suppliers',
      },
      {
        isLink: true,
        url: '/supplier-performance',
        icon: MdOutlineAnalytics,
        label: 'performance analytics',
      },
      {
        isLink: true,
        url: '/supplier-onboarding',
        icon: MdOutlineAddBusiness,
        label: 'onboarding',
      },
      {
        isLink: true,
        url: '/supplier-compliance',
        icon: HiOutlineClipboardDocumentList,
        label: 'compliance',
      },
      {
        isLink: true,
        url: '/supplier-risk',
        icon: MdOutlineWarning,
        label: 'risk management',
      },
    ],
  },
  {
    catalog: 'procurement',
    listItems: [
      {
        isLink: true,
        url: '/procurement',
        icon: MdOutlineShoppingCart,
        label: 'purchase orders',
      },
      {
        isLink: true,
        url: '/invoices',
        icon: MdOutlineAttachMoney,
        label: 'invoices & payments',
      },
      {
        isLink: true,
        url: '/spend-analysis',
        icon: HiOutlineChartBar,
        label: 'spend analysis',
      },
      {
        isLink: true,
        url: '/demand-forecasting',
        icon: MdOutlineInsights,
        label: 'demand forecasting',
      },
    ],
  },
  {
    catalog: 'system',
    listItems: [
      {
        isLink: true,
        url: '/incident-management',
        icon: MdOutlineWarning,
        label: 'incident management',
      },
      {
        isLink: true,
        url: '/integrations',
        icon: MdOutlineIntegrationInstructions,
        label: 'integrations',
      },
      {
        isLink: true,
        url: '/admin',
        icon: MdOutlineAdminPanelSettings,
        label: 'security & admin',
      },
      {
        isLink: true,
        url: '/calendar',
        icon: HiOutlineCalendarDays,
        label: 'calendar',
      },
      {
        isLink: true,
        url: '/notes',
        icon: HiOutlinePencilSquare,
        label: 'notes',
      },
    ],
  },
];
