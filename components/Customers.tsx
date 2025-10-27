
import React, { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { Customer } from '../types';
import { UserPlus, Search, Phone, Mail, MapPin } from 'lucide-react';

const CustomerDetails: React.FC<{ customer: Customer | null }> = ({ customer }) => {
  if (!customer) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a customer to view details
      </div>
    );
  }
  return (
    <div className="flex-1 p-6">
      <div className="flex items-center space-x-4 pb-4 border-b">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold">
          {customer.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{customer.name}</h2>
          <p className="text-primary-500 font-semibold">{customer.loyaltyPoints} Loyalty Points</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center text-gray-600">
          <Phone className="w-5 h-5 mr-3" />
          <span>{customer.phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Mail className="w-5 h-5 mr-3" />
          <span>{customer.email}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-3" />
          <span>{customer.address}</span>
        </div>
      </div>
       <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">History</h3>
            <div className="space-y-2 text-sm">
                <p><strong>Last Purchase:</strong> iPhone 15 Pro (10/25/2023)</p>
                <p><strong>Last Repair:</strong> iPhone 14 Screen (10/28/2023)</p>
            </div>
        </div>
    </div>
  );
};

const Customers: React.FC = () => {
  const { state } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(state.customers[0] || null);
  
  const filteredCustomers = state.customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-xl shadow-md flex h-[calc(100vh-6rem)] overflow-hidden">
      {/* Customer List */}
      <div className="w-1/3 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-bold text-gray-800">Customers</h2>
             <button className="p-2 text-primary-500 hover:bg-primary-50 rounded-full"><UserPlus size={20}/></button>
          </div>
          <div className="flex items-center border rounded-lg">
            <div className="pl-3">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-2 bg-transparent focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredCustomers.map(customer => (
            <div
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              className={`flex items-center p-4 cursor-pointer border-l-4 ${
                selectedCustomer?.id === customer.id
                  ? 'bg-primary-50 border-primary-500'
                  : 'border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 mr-3">
                {customer.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{customer.name}</p>
                <p className="text-sm text-gray-500">{customer.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Details */}
      <CustomerDetails customer={selectedCustomer} />
    </div>
  );
};

export default Customers;
