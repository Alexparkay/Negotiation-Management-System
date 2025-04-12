import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { MdStore, MdOutlineSearch, MdOutlineNotifications, MdOutlineSettings, MdOutlineLogout, MdOutlineHelp, MdOutlinePerson, MdOutlineEdit } from 'react-icons/md';
import { RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';
import ChangeThemes from './ChangesThemes';
import toast from 'react-hot-toast';
import { menu } from './menu/data';
import MenuItem from './menu/MenuItem';

const Navbar = () => {
  const [isFullScreen, setIsFullScreen] = React.useState(true);
  const element = document.getElementById('root');

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    try {
      if (isFullScreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(err => {
            console.error('Error exiting fullscreen:', err);
          });
        }
      } else {
        if (element && !document.fullscreenElement) {
          element.requestFullscreen({ navigationUI: 'auto' }).catch(err => {
            console.error('Error requesting fullscreen:', err);
          });
        }
      }
    } catch (error) {
      console.error('Fullscreen API error:', error);
    }
  }, [element, isFullScreen]);

  return (
    // navbar screen
    <div className="fixed z-[3] top-0 left-0 right-0 bg-base-100 w-full flex justify-between px-3 xl:px-4 py-3 xl:py-5 gap-4 xl:gap-0">
      {/* container */}
      <div className="flex gap-3 items-center">
        {/* for mobile */}
        <div className="drawer w-auto p-0 mr-1 xl:hidden">
          <input
            id="drawer-navbar-mobile"
            type="checkbox"
            className="drawer-toggle"
            checked={isDrawerOpen}
            onChange={toggleDrawer}
          />
          <div className="p-0 w-auto drawer-content">
            <label
              htmlFor="drawer-navbar-mobile"
              className="p-0 btn btn-ghost drawer-button"
            >
              <HiBars3CenterLeft className="text-2xl" />
            </label>
          </div>
          <div className="drawer-side z-[99]">
            <label
              htmlFor="drawer-navbar-mobile"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu p-4 w-auto min-h-full bg-base-200 text-base-content">
              <Link
                to={'/'}
                className="flex items-center gap-1 xl:gap-2 mt-1 mb-5"
              >
                <MdStore className="text-3xl sm:text-4xl xl:text-4xl 2xl:text-6xl text-primary" />
                <div>
                  <span className="text-[16px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-semibold text-base-content dark:text-neutral-200 block">
                    Marx Technology - Supplier Portal
                  </span>
                  <span className="text-xs sm:text-sm text-base-content/70 dark:text-neutral-400">
                    Supplier Relationship Management
                  </span>
                </div>
              </Link>
              {menu.map((item, index) => (
                <MenuItem
                  onClick={toggleDrawer}
                  key={index}
                  catalog={item.catalog}
                  listItems={item.listItems}
                />
              ))}
            </div>
          </div>
        </div>

        {/* navbar logo */}
        <Link to={'/'} className="flex items-center gap-1 xl:gap-2">
          <MdStore className="text-3xl sm:text-4xl xl:text-4xl 2xl:text-6xl text-primary" />
          <div>
            <span className="text-[16px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-semibold text-base-content dark:text-neutral-200 block">
              Marx Technology - Supplier Portal
            </span>
            <span className="text-xs sm:text-sm text-base-content/70 dark:text-neutral-400 hidden sm:block">
              Supplier Relationship Management
            </span>
          </div>
        </Link>
      </div>

      {/* navbar items to right */}
      <div className="flex items-center gap-0 xl:gap-1 2xl:gap-2 3xl:gap-5">
        {/* search */}
        <button
          onClick={() =>
            toast('Global search coming soon!', {
              icon: '🔍',
            })
          }
          className="hidden sm:inline-flex btn btn-circle btn-ghost"
        >
          <MdOutlineSearch className="text-xl 2xl:text-2xl 3xl:text-3xl" />
        </button>

        {/* fullscreen */}
        <button
          onClick={toggleFullScreen}
          className="hidden xl:inline-flex btn btn-circle btn-ghost"
        >
          {isFullScreen ? (
            <RxEnterFullScreen className="xl:text-xl 2xl:text-2xl 3xl:text-3xl" />
          ) : (
            <RxExitFullScreen className="xl:text-xl 2xl:text-2xl 3xl:text-3xl" />
          )}
        </button>

        {/* notification */}
        <div className="dropdown dropdown-end">
          <button
            className="px-0 xl:px-auto btn btn-circle btn-ghost indicator"
          >
            <MdOutlineNotifications className="text-xl 2xl:text-2xl 3xl:text-3xl" />
            <span className="indicator-item badge badge-error badge-xs">3</span>
          </button>
          <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80 mt-4">
            <div className="p-2 font-semibold border-b border-base-300">Notifications</div>
            <div className="p-2 hover:bg-base-200 rounded-lg mt-1">
              <div className="font-medium">New store task assigned</div>
              <div className="text-xs opacity-70">Downtown Flagship Store - 10 minutes ago</div>
            </div>
            <div className="p-2 hover:bg-base-200 rounded-lg mt-1">
              <div className="font-medium">Contract expiring soon</div>
              <div className="text-xs opacity-70">Security Systems Maintenance - 1 hour ago</div>
            </div>
            <div className="p-2 hover:bg-base-200 rounded-lg mt-1">
              <div className="font-medium">Store opening date updated</div>
              <div className="text-xs opacity-70">Chicago Riverside Mall - 3 hours ago</div>
            </div>
            <div className="p-2 text-center text-primary text-sm mt-1 border-t border-base-300">
              View all notifications
            </div>
          </div>
        </div>

        {/* theme */}
        <div className="px-0 xl:px-auto btn btn-circle btn-ghost xl:mr-1">
          <ChangeThemes />
        </div>

        {/* avatar dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-9 rounded-full">
              <img
                src="https://avatars.githubusercontent.com/u/74099030?v=4"
                alt="user-avatar"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-48"
          >
            <li>
              <Link to="/profile" className="justify-between">
                <div className="flex items-center">
                  <MdOutlinePerson className="mr-2" />
                  My Profile
                </div>
              </Link>
            </li>
            <li>
              <Link to="/profile/edit" className="justify-between">
                <div className="flex items-center">
                  <MdOutlineEdit className="mr-2" />
                  Edit Profile
                </div>
              </Link>
            </li>
            <li>
              <a className="justify-between">
                <div className="flex items-center">
                  <MdOutlineSettings className="mr-2" />
                  Settings
                </div>
              </a>
            </li>
            <li>
              <a className="justify-between">
                <div className="flex items-center">
                  <MdOutlineHelp className="mr-2" />
                  Help & Support
                </div>
              </a>
            </li>
            <li onClick={() => navigate('/login')}>
              <a>
                <div className="flex items-center">
                  <MdOutlineLogout className="mr-2" />
                  Log Out
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
