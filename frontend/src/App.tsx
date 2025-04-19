// import React from 'react';
import { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Products from './pages/Products';
import Navbar from './components/Navbar';
import Menu from './components/menu/Menu';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Posts from './pages/Posts';
import Notes from './pages/Notes';
import Calendar from './pages/Calendar';
import Infrastructure from './pages/Infrastructure';
import NetworkStatus from './pages/NetworkStatus';
import ToasterProvider from './components/ToasterProvider';
import EditProfile from './pages/EditProfile';
import User from './pages/User';
import Product from './pages/Product';
import Login from './pages/Login';
import Stores from './pages/Stores';
import StoreDetail from './pages/StoreDetail';
import Checklists from './pages/Checklists';
import Tasks from './pages/Tasks';
import Vendors from './pages/Vendors';
import Contracts from './pages/Contracts';
import Procurement from './pages/Procurement';
import NewStore from './pages/NewStore';
import ITSecurity from './pages/ITSecurity';
import ITHardware from './pages/ITHardware';
import POSSystems from './pages/POSSystems';
import Charts from './pages/Charts';
import Logs from './pages/Logs';
import VendorDetail from './pages/VendorDetail';
import ChatPopup from './components/ChatPopup';

// Supplier Management Pages
import Suppliers from './pages/Suppliers';
import SupplierDetail from './pages/SupplierDetail';
import SupplierPerformance from './pages/SupplierPerformance';
import SupplierOnboarding from './pages/SupplierOnboarding';
import SupplierCompliance from './pages/SupplierCompliance';
import SupplierRisk from './pages/SupplierRisk';
import Invoices from './pages/Invoices';
import SpendAnalysis from './pages/SpendAnalysis';
import DemandForecasting from './pages/DemandForecasting';
import IncidentManagement from './pages/IncidentManagement';
import Integrations from './pages/Integrations';
import Admin from './pages/Admin';

// Marx Supplier Portal Pages
import PriceForecasting from './pages/PriceForecasting';
import ActiveNegotiations from './pages/ActiveNegotiations';
import VendorComparison from './pages/VendorComparison';
import CommunicationHub from './pages/CommunicationHub';
import NegotiationHistory from './pages/NegotiationHistory';
import NegotiationCalendar from './pages/NegotiationCalendar';
import PriceTracker from './pages/PriceTracker';
import MarketTrends from './pages/MarketTrends';
import ProductCategories from './pages/ProductCategories';
import VendorPerformance from './pages/VendorPerformance';
import DocumentRepository from './pages/DocumentRepository';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';

function App() {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
  
  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const Layout = () => {
    return (
      <div
        id="rootContainer"
        className="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between bg-background-primary"
      >
        <ToasterProvider />
        <ScrollRestoration />
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="w-full flex gap-0 pt-[60px] flex-grow">
            <div className={`hidden xl:block transition-all duration-300 ease-in-out overflow-hidden ${isMenuCollapsed ? 'w-[80px]' : 'w-[280px]'} border-r border-black/5 sticky top-[64px] h-[calc(100vh-64px)] z-10`}>
              <Menu isCollapsed={isMenuCollapsed} onToggleCollapse={toggleMenu} />
            </div>
            <div className="w-full px-4 py-4 h-[calc(100vh-60px)] overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
        {/* AI Chat Popup - available on all pages */}
        <ChatPopup />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },
        {
          path: '/chat',
          element: <Chat />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/profile/edit',
          element: <EditProfile />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/users/:id',
          element: <User />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/products/:id',
          element: <Product />,
        },
        {
          path: '/orders',
          element: <Orders />,
        },
        {
          path: '/posts',
          element: <Posts />,
        },
        {
          path: '/notes',
          element: <Notes />,
        },
        {
          path: '/calendar',
          element: <Calendar />,
        },
        {
          path: '/charts',
          element: <Charts />,
        },
        {
          path: '/logs',
          element: <Logs />,
        },
        {
          path: '/infrastructure',
          element: <Infrastructure />,
        },
        {
          path: '/it-security',
          element: <ITSecurity />,
        },
        {
          path: '/it-hardware',
          element: <ITHardware />,
        },
        {
          path: '/pos-systems',
          element: <POSSystems />,
        },
        {
          path: '/stores',
          element: <Stores />,
        },
        {
          path: '/stores/:storeId',
          element: <StoreDetail />,
        },
        {
          path: '/new-store',
          element: <NewStore />,
        },
        {
          path: '/checklists',
          element: <Checklists />,
        },
        {
          path: '/tasks',
          element: <Tasks />,
        },
        {
          path: '/vendors',
          element: <Vendors />,
        },
        {
          path: '/vendors/:vendorId',
          element: <VendorDetail />,
        },
        {
          path: '/contracts',
          element: <Contracts />,
        },
        {
          path: '/procurement',
          element: <Procurement />,
        },
        {
          path: '/suppliers',
          element: <Suppliers />,
        },
        {
          path: '/suppliers/:supplierId',
          element: <SupplierDetail />,
        },
        {
          path: '/supplier-performance',
          element: <SupplierPerformance />,
        },
        {
          path: '/supplier-onboarding',
          element: <SupplierOnboarding />,
        },
        {
          path: '/supplier-compliance',
          element: <SupplierCompliance />,
        },
        {
          path: '/supplier-risk',
          element: <SupplierRisk />,
        },
        {
          path: '/invoices',
          element: <Invoices />,
        },
        {
          path: '/spend-analysis',
          element: <SpendAnalysis />,
        },
        {
          path: '/demand-forecasting',
          element: <DemandForecasting />,
        },
        {
          path: '/incident-management',
          element: <IncidentManagement />,
        },
        {
          path: '/integrations',
          element: <Integrations />,
        },
        {
          path: '/admin',
          element: <Admin />,
        },
        {
          path: '/price-forecasting',
          element: <PriceForecasting />,
        },
        {
          path: '/active-negotiations',
          element: <ActiveNegotiations />,
        },
        {
          path: '/vendor-comparison',
          element: <VendorComparison />,
        },
        {
          path: '/communication-hub',
          element: <CommunicationHub />,
        },
        {
          path: '/negotiation-history',
          element: <NegotiationHistory />,
        },
        {
          path: '/negotiation-calendar',
          element: <NegotiationCalendar />,
        },
        {
          path: '/price-tracker',
          element: <PriceTracker />,
        },
        {
          path: '/market-trends',
          element: <MarketTrends />,
        },
        {
          path: '/product-categories',
          element: <ProductCategories />,
        },
        {
          path: '/vendor-performance',
          element: <VendorPerformance />,
        },
        {
          path: '/document-repository',
          element: <DocumentRepository />,
        },
      ],
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
