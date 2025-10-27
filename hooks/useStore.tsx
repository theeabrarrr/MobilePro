
import React, { createContext, useContext, useState } from 'react';
import { InventoryItem, Customer, RepairJob, SaleTransaction, TradeIn } from '../types';
import { generateMockData } from '../lib/mockData';

interface StoreState {
  inventory: InventoryItem[];
  customers: Customer[];
  repairs: RepairJob[];
  sales: SaleTransaction[];
  tradeIns: TradeIn[];
}

interface StoreContextType {
  state: StoreState;
  setState: React.Dispatch<React.SetStateAction<StoreState>>;
  addRepair: (repair: RepairJob) => void;
  updateRepairStatus: (repairId: string, status: RepairJob['status']) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const mockData = generateMockData();

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<StoreState>(mockData);

  const addRepair = (repair: Omit<RepairJob, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRepair: RepairJob = {
      ...repair,
      id: `RJ-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setState(prevState => ({
      ...prevState,
      repairs: [newRepair, ...prevState.repairs],
    }));
  };

  const updateRepairStatus = (repairId: string, status: RepairJob['status']) => {
    setState(prevState => ({
      ...prevState,
      repairs: prevState.repairs.map(r =>
        r.id === repairId ? { ...r, status, updatedAt: new Date().toISOString() } : r
      ),
    }));
  };
  
  const value = { state, setState, addRepair, updateRepairStatus };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
