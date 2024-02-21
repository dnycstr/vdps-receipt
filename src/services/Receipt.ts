import { KeyValuePair } from '@components/Forms/MultiPairInput';
import {
  ReceiptTableStorageModel,
  ReceiptTableViewModel,
  ReceiptViewModel,
} from '@models/Receipt';

export const ReceiptService = {
  create: async function (receipt: ReceiptViewModel) {
    const data = localStorage.getItem('receipt');
    let jsonData: ReceiptTableStorageModel = { data: [], lastId: 1 };

    if (data) {
      jsonData = JSON.parse(data) as ReceiptTableStorageModel;
    }

    receipt.id = jsonData.lastId;
    jsonData.data.push(receipt);
    jsonData.lastId = jsonData.lastId + 1;

    localStorage.setItem('receipt', JSON.stringify(jsonData));

    return;
  },
  getById: async function (id: number): Promise<ReceiptViewModel | undefined> {
    return new Promise((resolve) => {
      const data = localStorage.getItem('receipt');
      let jsonData: ReceiptTableStorageModel = { data: [], lastId: 1 };

      if (data) {
        jsonData = JSON.parse(data) as ReceiptTableStorageModel;
      }

      const receipt = jsonData.data.find((x) => x.id === id);

      resolve(receipt);
    });
  },
  getList: async function (
    page?: number,
    pageSize?: number,
    searchString?: string,
    yearLevelFilter?: string,
    academicYearFilter?: string,
    paymentDateFilter?: string
  ): Promise<ReceiptTableViewModel> {
    return new Promise((resolve) => {
      const data = localStorage.getItem('receipt');
      let jsonData: ReceiptTableStorageModel = { data: [], lastId: 1 };

      if (data) {
        jsonData = JSON.parse(data) as ReceiptTableStorageModel;
      }

      if (searchString) {
        jsonData.data = jsonData.data.filter((x) =>
          x.payee.toLowerCase().includes(searchString.toLowerCase())
        );
      }

      if (academicYearFilter) {
        jsonData.data = jsonData.data.filter(
          (x) => x.academicYear === academicYearFilter
        );
      }

      if (paymentDateFilter) {
        console.log(paymentDateFilter);
        console.log(jsonData.data[0].paymentDate.toString().substring(0, 10));
        jsonData.data = jsonData.data.filter(
          (x) => x.paymentDate.toString().substring(0, 10) === paymentDateFilter
        );
      }

      if (yearLevelFilter) {
        jsonData.data = jsonData.data.filter(
          (x) => x.yearLevel === yearLevelFilter
        );
      }

      const totalRecords = jsonData.data.length;

      let totalPages = 1;
      if (page && pageSize) {
        totalPages = Math.ceil(totalRecords / pageSize);
      }

      if (page && pageSize) {
        jsonData.data = jsonData.data.slice(
          (page - 1) * pageSize,
          (page - 1) * pageSize + pageSize
        );
      }

      const tableData: ReceiptTableViewModel = {
        data: jsonData.data,
        page: Number(page),
        pageSize: Number(pageSize),
        total: totalRecords,
        totalPages: totalPages,
      };

      resolve(tableData);
    });
  },
  update: async function (id: number, Receipt: ReceiptViewModel) {
    const data = localStorage.getItem('receipt');
    let jsonData: ReceiptTableStorageModel = { data: [], lastId: 1 };

    if (data) {
      jsonData = JSON.parse(data) as ReceiptTableStorageModel;
    }

    const index = jsonData.data.findIndex((x) => x.id === id);
    jsonData.data[index] = Receipt;

    localStorage.setItem('receipt', JSON.stringify(jsonData));

    return;
  },
  delete: async function (id: number): Promise<boolean> {
    return new Promise((resolve) => {
      const data = localStorage.getItem('receipt');
      let jsonData: ReceiptTableStorageModel = { data: [], lastId: 1 };

      if (data) {
        jsonData = JSON.parse(data) as ReceiptTableStorageModel;
      }

      jsonData.data = jsonData.data.filter((x) => x.id !== id);

      localStorage.setItem('receipt', JSON.stringify(jsonData));

      resolve(true);
    });
  },
  getSettings: async function (): Promise<KeyValuePair[]> {
    return new Promise((resolve) => {
      const data = localStorage.getItem('receiptSettings');
      let jsonData: KeyValuePair[] = [{ key: '', value: '0' }];
      if (data) {
        jsonData = JSON.parse(JSON.parse(data)) as KeyValuePair[];
      }

      resolve(jsonData);
    });
  },
  updateSettings: async function (settings: string) {
    localStorage.setItem('receiptSettings', settings);
    return;
  },
};
