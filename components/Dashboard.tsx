
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useStore } from '../hooks/useStore';
import { DollarSign, Smartphone, Wrench, PackageX } from 'lucide-react';
import { ProductType } from '../types';

const Card: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
    <div className="bg-primary-100 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { state } = useStore();
  const { sales, repairs, inventory } = state;

  const totalSales = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
  const activeRepairs = repairs.filter(r => r.status !== 'Completed' && r.status !== 'Cancelled').length;
  const lowStockItems = inventory.filter(item => {
    if (item.type === ProductType.SERIALIZED) return false;
    return item.quantity <= item.lowStockThreshold;
  }).length;

  const salesData = [
    { name: 'Mon', Sales: 4000 },
    { name: 'Tue', Sales: 3000 },
    { name: 'Wed', Sales: 2000 },
    { name: 'Thu', Sales: 2780 },
    { name: 'Fri', Sales: 1890 },
    { name: 'Sat', Sales: 2390 },
    { name: 'Sun', Sales: 3490 },
  ];

  const topProductsData = [
    { name: 'New Phones', value: 400 },
    { name: 'Used Phones', value: 300 },
    { name: 'Accessories', value: 300 },
    { name: 'Repairs', value: 200 },
  ];
  const COLORS = ['#1d4ed8', '#2563eb', '#60a5fa', '#93c5fd'];


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Today's Sales" value={`$${totalSales.toLocaleString()}`} icon={<DollarSign className="h-6 w-6 text-primary-600" />} />
        <Card title="Active Repairs" value={activeRepairs.toString()} icon={<Wrench className="h-6 w-6 text-primary-600" />} />
        <Card title="New Devices Sold" value="12" icon={<Smartphone className="h-6 w-6 text-primary-600" />} />
        <Card title="Low Stock Items" value={lowStockItems.toString()} icon={<PackageX className="h-6 w-6 text-primary-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Sales" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Categories</h3>
           <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={topProductsData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {topProductsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
