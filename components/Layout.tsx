
import React from 'react';
import { UserRole } from '../types';
import { LucideIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
  currentUserRole: UserRole;
  navItems: { id: string; label: string; icon: LucideIcon; roles: UserRole[] }[];
  headerContent?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, currentUserRole, navItems, headerContent }) => {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center justify-center px-4 border-b">
          <h1 className="text-2xl font-bold text-primary-600">MobilePro</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.filter(item => item.roles.includes(currentUserRole)).map(item => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveView(item.id); }}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeView === item.id
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-700 capitalize">{activeView.replace('-', ' ')}</h2>
          <div>{headerContent}</div>
        </header>
        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
