
import React, { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { InventoryItem, SerializedItem, ProductType } from '../types';
import { Search, Plus, Minus, X, Repeat, UserPlus, CreditCard, DollarSign } from 'lucide-react';

interface CartItem {
  item: InventoryItem;
  quantity: number;
}

const POS: React.FC = () => {
  const { state } = useStore();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (item: InventoryItem) => {
    const existingItem = cart.find(cartItem => cartItem.item.id === item.id);
    if (existingItem) {
      if (item.type !== ProductType.SERIALIZED) {
        updateQuantity(item.id, existingItem.quantity + 1);
      }
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(cartItem => cartItem.item.id === itemId ? { ...cartItem, quantity } : cartItem));
    }
  };
  
  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(cartItem => cartItem.item.id !== itemId));
  };
  
  const total = cart.reduce((acc, cartItem) => acc + cartItem.item.salePrice * cartItem.quantity, 0);

  const searchResults = state.inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) && (item.type === ProductType.SERIALIZED ? (item as SerializedItem).isUsed === false : true)
  ).slice(0, 20);

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6">
      {/* Product Selection */}
      <div className="w-3/5 bg-white p-4 rounded-xl shadow-md flex flex-col">
        <div className="flex items-center border rounded-lg mb-4">
          <div className="pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products or scan barcode..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-1">
          {searchResults.map(item => (
            <div key={item.id} onClick={() => addToCart(item)} className="border rounded-lg p-2 text-center cursor-pointer hover:shadow-lg hover:border-primary-500 transition">
              <img src={`https://picsum.photos/seed/${item.id}/200`} alt={item.name} className="w-full h-24 object-cover rounded-md mb-2" />
              <p className="text-sm font-semibold text-gray-700 truncate">{item.name}</p>
              <p className="text-xs text-gray-500">${item.salePrice.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Billing */}
      <div className="w-2/5 bg-white p-4 rounded-xl shadow-md flex flex-col">
        <h3 className="text-lg font-bold border-b pb-2 mb-2">Current Sale</h3>
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Cart is empty</p>
          ) : (
            cart.map(({item, quantity}) => (
              <div key={item.id} className="flex items-center py-2 border-b">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">${item.salePrice.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                   <button onClick={() => updateQuantity(item.id, quantity-1)} disabled={item.type === ProductType.SERIALIZED} className="p-1 rounded-full bg-gray-200 disabled:opacity-50"><Minus size={12}/></button>
                   <span>{quantity}</span>
                   <button onClick={() => updateQuantity(item.id, quantity+1)} disabled={item.type === ProductType.SERIALIZED} className="p-1 rounded-full bg-gray-200 disabled:opacity-50"><Plus size={12}/></button>
                </div>
                 <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500"><X size={16}/></button>
              </div>
            ))
          )}
        </div>
        <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
                <button className="flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200"><UserPlus className="w-5 h-5 mr-2" />Add Customer</button>
                <button className="flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200"><Repeat className="w-5 h-5 mr-2" />Trade-In</button>
            </div>
            <button className="w-full bg-primary-500 text-white font-bold py-3 rounded-lg hover:bg-primary-600 transition flex items-center justify-center text-lg">
                <CreditCard className="w-6 h-6 mr-3" />
                Checkout
            </button>
        </div>
      </div>
    </div>
  );
};

export default POS;
