import React from 'react';

import vdps from './vdps.png';

import { ReceiptViewModel } from '@models/Receipt';

interface ReceiptPrintProps {
  receipt: ReceiptViewModel;
}

export const ReceiptPrint: React.FC<ReceiptPrintProps> = ({ receipt }) => {
  return (
    <div className="receipt-print">
      <div className="mx-auto flex items-center justify-center">
        <div>
          <img className="h-20 w-20 md:h-32 md:w-32 mx-auto" src={vdps} />
        </div>
        <div className="text-center py-4 md:py-10">
          <div className="text-lg md:text-3xl">VIRGEN DEL PILAR SCHOOL</div>
          <div className="text-xs md:text-base">
            Ilo-Ilo St., Metro Montana, Phase 2,
          </div>
          <div className="text-xs md:text-base">Burgos, 1860 Rodriguez </div>
          <div className="text-xs md:text-base">(Montalban) Rizal </div>
        </div>
      </div>
      <hr />
      <div>
        <label>Receipt Number:</label>
        <span>{receipt.id}</span>
      </div>
      <div>
        <label>Date:</label>
        <span>{receipt.paymentDate.toString().substring(0, 10)}</span>
      </div>
      <div>
        <label>Name:</label>
        <span>{receipt.payee}</span>
      </div>

      <hr />
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Particular</th>
            <th className="text-right">QTY</th>
            <th className="text-right">U.Price</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {receipt.items.map((item, index) => (
            <tr key={index}>
              <td className="p-1">{item.particular}</td>
              <td className="pl-2 text-right">{item.quantity}</td>
              <td className="pl-2 text-right">{item.unitPrice}</td>
              <td className="pl-2 text-right">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="text-right">
        <label>Total:</label>
        <span>
          {receipt.items.reduce(
            (accumulator, currentValue) => accumulator + currentValue.total,
            0
          )}
        </span>
      </div>
    </div>
  );
};
