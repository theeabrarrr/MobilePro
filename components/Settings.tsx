
import React from 'react';
import { Zap, ShoppingCart, Book, CreditCard } from 'lucide-react';

const IntegrationCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border flex">
        <div className="pr-4">{icon}</div>
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
            </div>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
    </div>
);

const Settings: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings & Integrations</h2>
            <div className="space-y-6">
                <IntegrationCard
                    title="E-commerce Integration"
                    description="Sync inventory in real-time with Shopify or WooCommerce."
                    icon={<ShoppingCart className="w-8 h-8 text-primary-500" />}
                />
                <IntegrationCard
                    title="Accounting Integration"
                    description="Automatically sync sales and purchase data to QuickBooks or Xero."
                    icon={<Book className="w-8 h-8 text-primary-500" />}
                />
                <IntegrationCard
                    title="Payment Gateway Integration"
                    description="Enable secure online and in-store payments with Stripe or Square."
                    icon={<CreditCard className="w-8 h-8 text-primary-500" />}
                />
                 <IntegrationCard
                    title="SMS Notifications"
                    description="Connect with Twilio to send automated SMS alerts to customers."
                    icon={<Zap className="w-8 h-8 text-primary-500" />}
                />
            </div>
        </div>
    );
};

export default Settings;
