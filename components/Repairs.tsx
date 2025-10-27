
import React, { useMemo } from 'react';
import { useStore } from '../hooks/useStore';
import { RepairJob, RepairStatus, Customer } from '../types';
import { PlusCircle } from 'lucide-react';

const RepairCard: React.FC<{ repair: RepairJob; customer?: Customer }> = ({ repair, customer }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-3 cursor-pointer hover:shadow-lg transition">
            <p className="font-bold text-sm text-gray-800">{repair.deviceModel}</p>
            <p className="text-xs text-gray-500">Job ID: {repair.id}</p>
            <p className="text-xs text-gray-500">Customer: {customer?.name || 'N/A'}</p>
            <p className="text-sm mt-2 text-gray-700">{repair.problemDescription}</p>
            <div className="text-right text-xs text-gray-400 mt-2">
                {new Date(repair.updatedAt).toLocaleDateString()}
            </div>
        </div>
    );
};

const Repairs: React.FC = () => {
    const { state } = useStore();
    const { repairs, customers } = state;

    const columns = useMemo(() => {
        const groupedRepairs = Object.values(RepairStatus).reduce((acc, status) => {
            acc[status] = [];
            return acc;
        }, {} as Record<RepairStatus, RepairJob[]>);

        repairs.forEach(repair => {
            if (groupedRepairs[repair.status]) {
                groupedRepairs[repair.status].push(repair);
            }
        });
        return groupedRepairs;
    }, [repairs]);

    const customerMap = useMemo(() => {
        return new Map(customers.map(c => [c.id, c]));
    }, [customers]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Repair Service Management</h2>
                <button className="flex items-center bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    New Repair Job
                </button>
            </div>
            
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {(Object.keys(columns) as Array<keyof typeof columns>).map(status => {
                    const repairList = columns[status];
                    return (
                        <div key={status} className="bg-gray-100 rounded-lg p-3 w-72 flex-shrink-0">
                            <h3 className="font-semibold text-gray-700 mb-3 px-1">{status} ({repairList.length})</h3>
                            <div className="h-[calc(100vh-20rem)] overflow-y-auto">
                                {repairList.map(repair => (
                                    <RepairCard key={repair.id} repair={repair} customer={customerMap.get(repair.customerId)} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Repairs;