import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ReceiptPrint } from './ReceiptPrint';

import { BoxBodyColumn, BoxHeader, BoxMedium } from '@components/Box';
import {
  FormButtonsContainer,
  FormContainer,
  FormSectionContainer,
} from '@components/Container';
import { CancelLinkButton, Input } from '@components/Forms';
import { routes } from '@config/routes';
import { ReceiptViewModel, defaultReceiptViewModel } from '@models/Receipt';
import { ReceiptService } from '@services/Receipt';
import { numberFormat } from '@utils/numberFormat';

export const ReceiptDetails: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ReceiptViewModel>(defaultReceiptViewModel);

  const loadData = () => {
    ReceiptService.getById(Number(id)).then((result) => {
      if (result) {
        setData(result);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <BoxMedium>
          <BoxHeader title="Receipt Details" />
          <BoxBodyColumn>
            <FormContainer>
              <FormSectionContainer>
                <Input label="Name" value={data.payee} />

                <Input
                  label="Date"
                  value={data.paymentDate.toString().substring(0, 10)}
                />

                <Input label="Payment Method" value={data.paymentMethod} />

                <hr />
                {data.items.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row mt-1">
                    <Input placeholder="Particular" value={item.particular} />
                    <Input
                      title="Input Quantity"
                      value={item.quantity}
                      textalign="right"
                    />
                    <Input
                      title="Input Unit Price"
                      placeholder="Unit Price"
                      value={item.unitPrice}
                      textalign="right"
                    />
                    <Input
                      title="Total"
                      placeholder="Total"
                      value={item.total}
                      textalign="right"
                    />
                  </div>
                ))}
                <div className="flex flex-col md:flex-row justify-between">
                  <div>&nbsp;</div>

                  <div>
                    <label className="text-gray-700 text-xl p-4">Total</label>
                    <span className="mr-2 text-2xl">₱</span>
                    <span className="text-2xl p-2">
                      {numberFormat.format(
                        Number(
                          data.items.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.total,
                            0
                          )
                        )
                      )}
                    </span>
                  </div>
                </div>
              </FormSectionContainer>
              <FormButtonsContainer>
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    window.print();
                  }}
                >
                  Print
                </button>
                <CancelLinkButton to={`${routes.RECEIPTS}`} />
              </FormButtonsContainer>
            </FormContainer>
          </BoxBodyColumn>
        </BoxMedium>
        <ReceiptPrint receipt={data} />
      </>
    );
  }
};
