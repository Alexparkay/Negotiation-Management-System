import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Login from './pages/Login';
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
import Charts from './pages/Charts';
import Logs from './pages/Logs';
import ToasterProvider from './components/ToasterProvider';
import Settings from './pages/Settings';

function App() {
  const Layout = () => {
    return (
      <div
        id="rootContainer"
        className="w-full p-0 m-0 overflow-visible 2xl:min-h-screen 2xl:flex flex-col justify-between"
      >
        <ToasterProvider />
        <div>
          <Navbar />
          <div className="w-full flex gap-0 pt-20 xl:pt-[86px] 2xl:pt-[112px] mb-auto">
            <div className="xl:w-[250px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:py-1">
              <Menu />
            </div>
            <div className="w-full px-3 xl:py-2">
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
          path: '/users',
          element: <Users />,
        },
        {
          path: '/products',
          element: <Products />,
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
          path: '/settings',
          element: <Settings />,
        },
      ],
      errorElement: <Error />,
    },
    {
      path: 'login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
