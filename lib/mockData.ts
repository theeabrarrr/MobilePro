
import { InventoryItem, Customer, RepairJob, SaleTransaction, TradeIn, ProductType, UsedDeviceGrade, RepairStatus } from '../types';

export const generateMockData = () => {
  const inventory: InventoryItem[] = [
    { id: '1', name: 'iPhone 15 Pro', type: ProductType.SERIALIZED, imei: '123456789012345', isUsed: false, purchasePrice: 900, salePrice: 1199, quantity: 1, lowStockThreshold: 2 },
    { id: '2', name: 'Samsung S24 Ultra', type: ProductType.SERIALIZED, imei: '987654321098765', isUsed: false, purchasePrice: 850, salePrice: 1150, quantity: 1, lowStockThreshold: 2 },
    { id: '3', name: 'iPhone 13 (Used)', type: ProductType.SERIALIZED, imei: '555555555555555', isUsed: true, grade: UsedDeviceGrade.B, purchasePrice: 350, salePrice: 550, quantity: 1, lowStockThreshold: 1 },
    { id: '4', name: 'USB-C Cable', type: ProductType.NON_SERIALIZED, sku: 'ACC-001', purchasePrice: 5, salePrice: 15, quantity: 50, lowStockThreshold: 10 },
    { id: '5', name: 'iPhone 15 Screen', type: ProductType.REPAIR_PART, partNumber: 'RP-IP15-SCR', purchasePrice: 150, salePrice: 250, quantity: 10, lowStockThreshold: 3 },
    { id: '6', name: 'Galaxy S24 Battery', type: ProductType.REPAIR_PART, partNumber: 'RP-S24-BAT', purchasePrice: 40, salePrice: 80, quantity: 8, lowStockThreshold: 3 },
     { id: '7', name: 'Pixel 8 Pro', type: ProductType.SERIALIZED, imei: '112233445566778', isUsed: false, purchasePrice: 700, salePrice: 999, quantity: 1, lowStockThreshold: 2 },
    { id: '8', name: 'Fast Charger Brick', type: ProductType.NON_SERIALIZED, sku: 'ACC-002', purchasePrice: 10, salePrice: 25, quantity: 2, lowStockThreshold: 5 },
  ];

  const customers: Customer[] = [
    { id: 'C1', name: 'Alice Johnson', phone: '555-0101', email: 'alice@example.com', address: '123 Maple St', loyaltyPoints: 120 },
    { id: 'C2', name: 'Bob Smith', phone: '555-0102', email: 'bob@example.com', address: '456 Oak Ave', loyaltyPoints: 450 },
  ];

  const repairs: RepairJob[] = [
    { id: 'R1', customerId: 'C1', deviceImei: '111222333444555', deviceModel: 'iPhone 14', problemDescription: 'Cracked screen', status: RepairStatus.READY_FOR_COLLECTION, technicianId: 'T1', createdAt: '2023-10-26T10:00:00Z', updatedAt: '2023-10-28T14:00:00Z', partsUsed: [{ partId: '5', quantity: 1 }], notes: 'Screen replaced and tested.', estimatedCost: 260, finalCost: 265 },
    { id: 'R2', customerId: 'C2', deviceImei: '666777888999000', deviceModel: 'Samsung S22', problemDescription: 'Battery draining fast', status: RepairStatus.IN_PROGRESS, technicianId: 'T2', createdAt: '2023-10-27T11:00:00Z', updatedAt: '2023-10-28T15:00:00Z', partsUsed: [], notes: 'Diagnosing battery health.', estimatedCost: 90 },
    { id: 'R3', customerId: 'C1', deviceImei: 'ABCDEF123456789', deviceModel: 'Google Pixel 7', problemDescription: 'Won\'t turn on', status: RepairStatus.AWAITING_DIAGNOSIS, createdAt: '2023-10-28T09:00:00Z', updatedAt: '2023-10-28T09:00:00Z', partsUsed: [], notes: '', estimatedCost: 0 },
  ];

  const sales: SaleTransaction[] = [
    { id: 'S1', items: [{ productId: '1', quantity: 1, unitPrice: 1199 }], customerId: 'C2', totalAmount: 1199, paymentMethod: 'Card', salesAssociateId: 'SA1', date: '2023-10-25T14:30:00Z' },
  ];
  
  const tradeIns: TradeIn[] = [
      { id: 'T1', customerId: 'C2', deviceImei: '555555555555555', deviceModel: 'iPhone 13', grade: UsedDeviceGrade.B, buybackPrice: 350, date: '2023-10-25T14:30:00Z' }
  ];

  return { inventory, customers, repairs, sales, tradeIns };
};
