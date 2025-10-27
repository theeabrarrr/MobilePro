
import React, { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ReportType = 'sales' | 'inventory' | 'profitability' | 'repairs';

const Reports: React.FC = () => {
    const { state } = useStore();
    const [activeReport, setActiveReport] = useState<ReportType>('sales');

    const renderReport = () => {
        switch (activeReport) {
            case 'sales':
                return <SalesReports/>;
            case 'inventory':
                return <InventoryReports/>;
            case 'profitability':
                return <ProfitabilityReports/>;
            case 'repairs':
                 return <RepairsReports/>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
                <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
                    {(['sales', 'inventory', 'profitability', 'repairs'] as ReportType[]).map(type => (
                        <button 
                            key={type} 
                            onClick={() => setActiveReport(type)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                activeReport === type ? 'bg-white text-primary-600 shadow' : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
                {renderReport()}
            </div>
        </div>
    );
};

const SalesReports: React.FC = () => {
    const data = [{name: 'Jan', Sales: 4000}, {name: 'Feb', Sales: 3000}, {name: 'Mar', Sales: 5000}];
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Bar dataKey="Sales" fill="#2563eb" /></BarChart>
            </ResponsiveContainer>
        </div>
    );
}

const InventoryReports: React.FC = () => {
    const { state } = useStore();
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Stock Levels</h3>
            <ul>{state.inventory.slice(0,5).map(i => <li key={i.id}>{i.name}: {i.quantity} units</li>)}</ul>
        </div>
    );
}
const ProfitabilityReports: React.FC = () => (<div><h3 className="text-lg font-semibold mb-4">Profit by Category</h3><p>Detailed profitability report coming soon.</p></div>);
const RepairsReports: React.FC = () => (<div><h3 className="text-lg font-semibold mb-4">Repair Turnaround Time</h3><p>Average repair time: 2.3 days.</p></div>);

export default Reports;
