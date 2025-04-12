import { useState } from 'react';
import {
  MdOutlineAdminPanelSettings,
  MdOutlineSecurity,
  MdOutlineGroup,
  MdOutlineSettings,
  MdOutlineHistory,
  MdOutlineKey,
  MdOutlineEdit,
  MdOutlineDelete,
  MdOutlineAdd,
  MdOutlineCheck,
  MdOutlineClose,
} from 'react-icons/md';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  twoFactorEnabled: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');

  // Mock users data
  const users: User[] = [
    {
      id: 'USR-001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-03-05 14:30:00',
      twoFactorEnabled: true,
    },
    {
      id: 'USR-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'Manager',
      status: 'active',
      lastLogin: '2024-03-05 13:15:00',
      twoFactorEnabled: true,
    },
    {
      id: 'USR-003',
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      role: 'User',
      status: 'inactive',
      lastLogin: '2024-03-04 09:45:00',
      twoFactorEnabled: false,
    },
  ];

  // Mock roles data
  const roles: Role[] = [
    {
      id: 'ROLE-001',
      name: 'Admin',
      description: 'Full system access and management',
      permissions: [
        'user_management',
        'role_management',
        'system_settings',
        'audit_logs',
        'security_settings',
      ],
      userCount: 3,
    },
    {
      id: 'ROLE-002',
      name: 'Manager',
      description: 'Department management and reporting',
      permissions: [
        'view_reports',
        'manage_suppliers',
        'manage_orders',
        'view_analytics',
      ],
      userCount: 8,
    },
    {
      id: 'ROLE-003',
      name: 'User',
      description: 'Basic system access',
      permissions: [
        'view_suppliers',
        'view_orders',
        'create_reports',
      ],
      userCount: 25,
    },
  ];

  // Security settings
  const securitySettings = {
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: 90,
    },
    sessionSettings: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      lockoutDuration: 15,
    },
    twoFactorAuth: {
      required: true,
      methods: ['authenticator', 'email'],
    },
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Security & Administration</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <button
          className={`tab ${activeTab === 'users' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <MdOutlineGroup className="mr-2" /> Users
        </button>
        <button
          className={`tab ${activeTab === 'roles' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          <MdOutlineKey className="mr-2" /> Roles & Permissions
        </button>
        <button
          className={`tab ${activeTab === 'security' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <MdOutlineSecurity className="mr-2" /> Security Settings
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">User Management</h2>
            <button className="btn btn-primary btn-sm">
              <MdOutlineAdd className="mr-1" /> Add User
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-base-300 dark:border-slate-700">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Role</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">2FA</th>
                  <th className="text-left p-2">Last Login</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-base-300 dark:border-slate-700">
                    <td className="p-2 font-medium">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'active'
                          ? 'bg-success text-success-content'
                          : 'bg-error text-error-content'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-2">
                      {user.twoFactorEnabled ? (
                        <MdOutlineCheck className="text-success text-xl" />
                      ) : (
                        <MdOutlineClose className="text-error text-xl" />
                      )}
                    </td>
                    <td className="p-2">{new Date(user.lastLogin).toLocaleString()}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button className="btn btn-ghost btn-xs">
                          <MdOutlineEdit className="text-lg" />
                        </button>
                        <button className="btn btn-ghost btn-xs text-error">
                          <MdOutlineDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Roles & Permissions</h2>
            <button className="btn btn-primary btn-sm">
              <MdOutlineAdd className="mr-1" /> Add Role
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {roles.map((role) => (
              <div key={role.id} className="border border-base-300 dark:border-slate-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{role.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{role.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-ghost btn-xs">
                      <MdOutlineEdit className="text-lg" />
                    </button>
                    <button className="btn btn-ghost btn-xs text-error">
                      <MdOutlineDelete className="text-lg" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {role.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-base-200 dark:bg-slate-700 rounded-full text-xs"
                    >
                      {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {role.userCount} users assigned
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Settings Tab */}
      {activeTab === 'security' && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Security Settings</h2>
            <button className="btn btn-primary btn-sm">
              <MdOutlineEdit className="mr-1" /> Edit Settings
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Password Policy */}
            <div className="border border-base-300 dark:border-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Password Policy</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Minimum Length</span>
                  <span>{securitySettings.passwordPolicy.minLength} characters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Require Uppercase</span>
                  {securitySettings.passwordPolicy.requireUppercase ? (
                    <MdOutlineCheck className="text-success" />
                  ) : (
                    <MdOutlineClose className="text-error" />
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Require Numbers</span>
                  {securitySettings.passwordPolicy.requireNumbers ? (
                    <MdOutlineCheck className="text-success" />
                  ) : (
                    <MdOutlineClose className="text-error" />
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Require Special Characters</span>
                  {securitySettings.passwordPolicy.requireSpecialChars ? (
                    <MdOutlineCheck className="text-success" />
                  ) : (
                    <MdOutlineClose className="text-error" />
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Password Expiry</span>
                  <span>{securitySettings.passwordPolicy.expiryDays} days</span>
                </div>
              </div>
            </div>

            {/* Session Settings */}
            <div className="border border-base-300 dark:border-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Session Settings</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Session Timeout</span>
                  <span>{securitySettings.sessionSettings.sessionTimeout} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Max Login Attempts</span>
                  <span>{securitySettings.sessionSettings.maxLoginAttempts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Lockout Duration</span>
                  <span>{securitySettings.sessionSettings.lockoutDuration} minutes</span>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="border border-base-300 dark:border-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Two-Factor Authentication</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Required for All Users</span>
                  {securitySettings.twoFactorAuth.required ? (
                    <MdOutlineCheck className="text-success" />
                  ) : (
                    <MdOutlineClose className="text-error" />
                  )}
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Available Methods</span>
                  <div className="flex flex-wrap gap-2">
                    {securitySettings.twoFactorAuth.methods.map((method, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-base-200 dark:bg-slate-700 rounded-full text-xs"
                      >
                        {method.charAt(0).toUpperCase() + method.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 