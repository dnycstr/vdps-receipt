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
  const [printMode, setPrintMode] = useState<'AR' | 'OR' | 'NA'>('NA');

  const loadData = () => {
    ReceiptService.getById(Number(id)).then((result) => {
      if (result) {
        setData(result);
      }
      setIsLoading(false);
    });
  };

  const printCallback = () => {
    setPrintMode('NA');
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
                <Input label="Name" value={data.payee} readonly={true} />

                <div className="w-full flex flex-row space-x-4">
                  <Input
                    label="Year Level"
                    value={data.yearLevel}
                    readonly={true}
                  />
                  <Input
                    label="Academic Year"
                    value={data.academicYear}
                    readonly={true}
                  />
                </div>

                <div className="w-full flex flex-row space-x-4">
                  <Input
                    label="Payment Method"
                    value={data.paymentMethod}
                    readonly={true}
                  />
                  <Input
                    label="Date"
                    value={data.paymentDate.toString().substring(0, 10)}
                    readonly={true}
                  />
                </div>

                <hr />
                <div className="p-6 bg-yellow-50">
                  <div className="w-full mt-6"></div>

                  <hr></hr>

                  {data.items.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className="w-full flex flex-col md:flex-row mt-1"
                      >
                        <div className="w-full flex flex-row justify-between">
                          <div className="flex flex-col">
                            <span> {item.particular}</span>

                            {!!item.quantity && !!item.unitPrice && (
                              <span className="text-xs italic">
                                {item.quantity} x{' '}
                                {numberFormat.format(Number(item.unitPrice))}
                              </span>
                            )}
                          </div>
                          <div>
                            <span>
                              {numberFormat.format(Number(item.total))}
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </>
                  ))}

                  <div className="flex flex-row justify-between">
                    <label className="text-gray-700 text-xl p-4">
                      Total : <span className="mr-2 text-2xl">₱</span>
                    </label>

                    <span className="text-2xl mt-2 p-2">
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
                <div className="w-full justify-between flex flex-row">
                  <CancelLinkButton to={`${routes.RECEIPTS}`} />
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      setPrintMode('AR');
                    }}
                  >
                    Print AR
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      setPrintMode('OR');
                    }}
                  >
                    Print OR
                  </button>
                </div>
              </FormButtonsContainer>
            </FormContainer>
          </BoxBodyColumn>
        </BoxMedium>
        {printMode == 'AR' && (
          <ReceiptPrint
            receipt={data}
            printMode="AR"
            printCallback={printCallback}
          />
        )}
        {printMode == 'OR' && (
          <ReceiptPrint
            receipt={data}
            printMode="OR"
            printCallback={printCallback}
          />
        )}
      </>
    );
  }
};
