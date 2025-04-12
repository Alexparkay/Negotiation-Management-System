// import React from 'react';
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
import Footer from './components/Footer';
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

function App() {
  const Layout = () => {
    return (
      <div
        id="rootContainer"
        className="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
      >
        <ToasterProvider />
        <ScrollRestoration />
        <div>
          <Navbar />
          <div className="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
            <div className="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1">
              <Menu />
            </div>
            <div className="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
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
          element: <Home />,
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
          path: '/contracts',
          element: <Contracts />,
        },
        {
          path: '/procurement',
          element: <Procurement />,
        },
        // New Supplier Management Routes
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
          path: '/supplier-compliance',
          element: <SupplierCompliance />,
        },
        {
          path: '/supplier-risk',
          element: <SupplierRisk />,
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
