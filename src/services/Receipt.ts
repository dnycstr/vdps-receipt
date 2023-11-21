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
    pageSize?: number
  ): Promise<ReceiptTableViewModel> {
    return new Promise((resolve) => {
      const data = localStorage.getItem('receipt');
      let jsonData: ReceiptTableStorageModel = { data: [], lastId: 1 };

      if (data) {
        jsonData = JSON.parse(data) as ReceiptTableStorageModel;
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
  getSettings: async function (): Promise<string> {
    return new Promise((resolve) => {
      const data = localStorage.getItem('receiptSettings');
      let jsonData = '';

      if (data) {
        try {
          jsonData = data;
        } catch {
          jsonData = '';
        }
      }

      resolve(jsonData);
    });
  },
  updateSettings: async function (settings: string) {
    localStorage.setItem('receiptSettings', settings);
    return;
  },
};
