
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import POS from './components/POS';
import Repairs from './components/Repairs';
import Customers from './components/Customers';
import Reports from './components/Reports';
import Settings from './components/Settings';
import { UserRole } from './types';
import { User, Smartphone, Warehouse, Wrench, BarChart2, Users, Settings as SettingsIcon } from 'lucide-react';

const views: { [key: string]: React.ComponentType } = {
  dashboard: Dashboard,
  inventory: Inventory,
  pos: POS,
  repairs: Repairs,
  customers: Customers,
  reports: Reports,
  settings: Settings,
};

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart2, roles: [UserRole.SUPER_ADMIN, UserRole.STORE_MANAGER] },
  { id: 'pos', label: 'POS', icon: Smartphone, roles: [UserRole.SUPER_ADMIN, UserRole.STORE_MANAGER, UserRole.SALES_ASSOCIATE] },
  { id: 'inventory', label: 'Inventory', icon: Warehouse, roles: [UserRole.SUPER_ADMIN, UserRole.STORE_MANAGER] },
  { id: 'repairs', label: 'Repairs', icon: Wrench, roles: [UserRole.SUPER_ADMIN, UserRole.STORE_MANAGER, UserRole.REPAIR_TECHNICIAN] },
  { id: 'customers', label: 'Customers', icon: Users, roles: [UserRole.SUPER_ADMIN, UserRole.STORE_MANAGER, UserRole.SALES_ASSOCIATE] },
  { id: 'reports', label: 'Reports', icon: BarChart2, roles: [UserRole.SUPER_ADMIN, UserRole.STORE_MANAGER] },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, roles: [UserRole.SUPER_ADMIN] },
];

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.SUPER_ADMIN);

  const CurrentView = views[activeView] || Dashboard;

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserRole(event.target.value as UserRole);
    // Reset to a view the new role can access
    const firstAllowedView = navItems.find(item => item.roles.includes(event.target.value as UserRole));
    setActiveView(firstAllowedView ? firstAllowedView.id : 'dashboard');
  };

  const roleSwitcher = (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg">
      <User className="h-5 w-5 text-gray-600" />
      <select
        value={currentUserRole}
        onChange={handleRoleChange}
        className="bg-transparent font-semibold text-gray-700 focus:outline-none"
      >
        <option value={UserRole.SUPER_ADMIN}>Super Admin</option>
        <option value={UserRole.STORE_MANAGER}>Store Manager</option>
        <option value={UserRole.SALES_ASSOCIATE}>Sales Associate</option>
        <option value={UserRole.REPAIR_TECHNICIAN}>Repair Technician</option>
      </select>
    </div>
  );

  return (
    <Layout
      activeView={activeView}
      setActiveView={setActiveView}
      currentUserRole={currentUserRole}
      navItems={navItems}
      headerContent={roleSwitcher}
    >
      <CurrentView />
    </Layout>
  );
}
