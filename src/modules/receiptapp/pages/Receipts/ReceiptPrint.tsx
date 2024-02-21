import React, { useEffect } from 'react';

import { ReceiptViewModel } from '@models/Receipt';
import { numberFormat } from '@utils/numberFormat';

interface ReceiptPrintProps {
  receipt: ReceiptViewModel;
  printMode: 'AR' | 'OR';
  printCallback: () => void;
}

export const ReceiptPrint: React.FC<ReceiptPrintProps> = ({
  receipt,
  printMode,
  printCallback,
}) => {
  useEffect(() => {
    window.print();
    printCallback();
  }, []);

  return (
    <div className="receipt-print">
      <div className="mx-auto flex items-center justify-center">
        {/* <div>
          <img className="h-20 w-20 md:h-32 md:w-32 mx-auto" src={vdps} />
        </div> */}
        <div className="text-center py-4 md:py-10">
          <div className="text-[10px]">VIRGEN DEL PILAR SCHOOL</div>
          <div className="text-[8px]">Ilo-Ilo St., Metro Montana, Phase 2,</div>
          <div className="text-[8px]">Burgos, 1860 Rodriguez </div>
          <div className="text-[8px]">(Montalban) Rizal </div>
        </div>
        {/* <div>
          <img className="h-20 w-20 md:h-32 md:w-32 mx-auto" src={pillarians} />
        </div> */}
      </div>
      <div className="w-full text-center text-[8px]">
        {printMode == 'OR' ? (
          <span>OFFICIAL RECEIPT</span>
        ) : (
          <span>ACKNOWLEDGEMENT RECEIPT</span>
        )}
      </div>
      <hr />
      <div className="flex flex-col justify-between text-[8px] mt-2">
        <div>
          {printMode === 'OR' && (
            <>
              <label>O.R. #:</label>
              <span>{receipt.id}</span>
            </>
          )}
        </div>
        <div>
          <label>Payment Date:</label>
          <span>{receipt.paymentDate.toString().substring(0, 10)}</span>
        </div>
        <div>
          <label>Name:</label>
          <span>{receipt.payee}</span>
        </div>
        <div>
          <label>Year Level:</label>
          <span>{receipt.yearLevel}</span>
        </div>
        <div>
          <label>Academic Year:</label>
          <span>{receipt.academicYear}</span>
        </div>
        <div>
          <label>Payment Mode:</label>
          <span>{receipt.paymentMethod}</span>
        </div>
      </div>

      <div className="flex flex-row justify-between text-[8px] mb-2"></div>

      <hr />
      {receipt.items.map((item, index) => (
        <>
          <div key={index} className="w-full flex flex-col md:flex-row mt-1">
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-col">
                <span className="text-[8px]"> {item.particular}</span>

                {!!item.quantity && !!item.unitPrice && (
                  <span className="text-[8px] italic">
                    {item.quantity} x{' '}
                    {numberFormat.format(Number(item.unitPrice))}
                  </span>
                )}
              </div>
              <div>
                <span className="text-[8px]">
                  {numberFormat.format(Number(item.total))}
                </span>
              </div>
            </div>
          </div>
          <hr />
        </>
      ))}
      <hr />
      <div className="flex flex-row justify-between mt-6  text-xs">
        <label>Total:</label>

        <span>
          <span className="mr-2">₱</span>
          {numberFormat.format(
            Number(
              receipt.items.reduce(
                (accumulator, currentValue) => accumulator + currentValue.total,
                0
              )
            )
          )}
        </span>
      </div>
      <div className="w-full text-center text-[10px] mt-6">
        Thank you and God bless!
      </div>
    </div>
  );
};
