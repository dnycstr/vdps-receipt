import { TableViewModel } from './common/TableViewModel';

export interface ReceiptViewModel {
  id?: number;
  transactionDate: Date;
  receiptNumber: string;
  payee: string;
  paymentDate: Date;
  paymentMethod: string;
  items: ReceiptItemViewModel[];
}

export interface ReceiptItemViewModel {
  id?: number;
  particular: string;
  quantity: string;
  unitPrice: string;
  total: number;
}

export interface ReceiptSettings {
  settings?: string;
}

export const defaultReceiptSettings: ReceiptSettings = {
  settings: JSON.stringify([{ key: '', value: '0' }]),
};

export interface ParticularViewModel {
  name: string;
  unitPrice: number;
}

export interface ParticularTableViewModel extends TableViewModel {
  data: ParticularViewModel[];
}

export interface ParticularTableStorageModel {
  data: ParticularTableViewModel[];
  lastId: number;
}

export interface ReceiptTableViewModel extends TableViewModel {
  data: ReceiptViewModel[];
}

export interface ReceiptTableStorageModel {
  data: ReceiptViewModel[];
  lastId: number;
}

export const defaultReceiptViewModel: ReceiptViewModel = {
  transactionDate: new Date(),
  receiptNumber: '',
  payee: '',
  paymentDate: new Date(),
  paymentMethod: '',
  items: [],
};

export const defaultReceiptItemViewModel: ReceiptItemViewModel = {
  particular: '',
  quantity: '0',
  unitPrice: '0',
  total: 0,
};

export const defaultReceiptTableViewModel: ReceiptTableViewModel = {
  data: [],
  page: 0,
  pageSize: 0,
  total: 0,
  totalPages: 0,
};
