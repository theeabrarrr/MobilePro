
export enum UserRole {
  SUPER_ADMIN = 'Super Admin',
  STORE_MANAGER = 'Store Manager',
  SALES_ASSOCIATE = 'Sales Associate',
  REPAIR_TECHNICIAN = 'Repair Technician',
}

export enum ProductType {
  SERIALIZED = 'Serialized',
  NON_SERIALIZED = 'Non-Serialized',
  REPAIR_PART = 'Repair Part',
}

export enum UsedDeviceGrade {
  A = 'A (Excellent)',
  B = 'B (Good)',
  C = 'C (Fair)',
}

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  sku?: string; // For non-serialized and parts
  partNumber?: string; // For parts
  purchasePrice: number;
  salePrice: number;
  quantity: number; // Only for non-serialized/parts
  lowStockThreshold: number;
}

export interface SerializedItem extends Product {
  imei: string;
  isUsed: boolean;
  grade?: UsedDeviceGrade;
}

export type InventoryItem = Product | SerializedItem;

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  loyaltyPoints: number;
}

export enum RepairStatus {
  AWAITING_DIAGNOSIS = 'Awaiting Diagnosis',
  IN_PROGRESS = 'In Progress',
  AWAITING_PARTS = 'Awaiting Parts',
  READY_FOR_COLLECTION = 'Ready for Collection',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface RepairJob {
  id: string;
  customerId: string;
  deviceImei: string;
  deviceModel: string;
  problemDescription: string;
  status: RepairStatus;
  technicianId?: string;
  createdAt: string;
  updatedAt: string;
  partsUsed: { partId: string; quantity: number }[];
  notes: string;
  estimatedCost: number;
  finalCost?: number;
}

export interface SaleTransaction {
  id: string;
  items: { productId: string; quantity: number; unitPrice: number }[];
  customerId?: string;
  totalAmount: number;
  paymentMethod: string;
  salesAssociateId: string;
  date: string;
  tradeInId?: string;
}

export interface TradeIn {
  id: string;
  customerId: string;
  deviceImei: string;
  deviceModel: string;
  grade: UsedDeviceGrade;
  buybackPrice: number;
  date: string;
}
