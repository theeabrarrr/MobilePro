import React, { useState, useMemo } from 'react';
import { useStore } from '../hooks/useStore';
import { InventoryItem, ProductType, SerializedItem } from '../types';
import { PlusCircle, Search, Download } from 'lucide-react';
import Papa from 'papaparse';

const Inventory: React.FC = () => {
  const { state } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<ProductType | 'All'>('All');

  const filteredInventory = useMemo(() => {
    return state.inventory.filter(item => {
      const matchesTab = activeTab === 'All' || item.type === activeTab;
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ('sku' in item && item.sku?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        ('partNumber' in item && item.partNumber?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        ('imei' in item && item.imei?.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [state.inventory, searchTerm, activeTab]);

  const handleExport = () => {
    const csv = Papa.unparse(filteredInventory.map(item => {
      const base = { Name: item.name, Type: item.type, "Purchase Price": item.purchasePrice, "Sale Price": item.salePrice };
      if (item.type === ProductType.SERIALIZED) {
          const sItem = item as SerializedItem;
          return { ...base, IMEI: sItem.imei, Used: sItem.isUsed, Grade: sItem.grade || 'N/A', Quantity: 1 };
      }
      return { ...base, SKU: ('sku' in item ? item.sku : item.partNumber), Quantity: item.quantity };
    }));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'inventory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderTabs = () => (
    <div className="flex border-b">
      {(['All', ...Object.values(ProductType)] as const).map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === tab
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Inventory Management</h2>
        <div className="flex items-center space-x-2">
          <button className="flex items-center bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Item
          </button>
          <button onClick={handleExport} className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="flex items-center border rounded-lg mb-4">
        <div className="pl-3">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name, SKU, IMEI..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-transparent focus:outline-none"
        />
      </div>

      {renderTabs()}
      
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Identifier (SKU/IMEI)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.type === ProductType.SERIALIZED ? (item as SerializedItem).imei : (item.sku || item.partNumber)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.salePrice.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.type !== ProductType.SERIALIZED && item.quantity <= item.lowStockThreshold ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Low Stock</span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">In Stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;