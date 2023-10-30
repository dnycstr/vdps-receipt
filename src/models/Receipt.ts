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
  quantity: number;
  unitPrice: number;
  total: number;
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
  quantity: 0,
  unitPrice: 0,
  total: 0,
};

export const defaultReceiptTableViewModel: ReceiptTableViewModel = {
  data: [],
  page: 0,
  pageSize: 0,
  total: 0,
  totalPages: 0,
};
