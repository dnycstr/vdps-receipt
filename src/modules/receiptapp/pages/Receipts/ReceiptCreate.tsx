import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  BoxBodyColumn,
  BoxBodyMainColumn,
  BoxBodySecondaryColumn,
  BoxHeader,
  BoxRowColumn,
} from '@components/Box';
import {
  CancelLinkButton,
  DateInput,
  FormikInput,
  SubmitButton,
} from '@components/Forms';
import { KeyValuePair } from '@components/Forms/MultiPairInput';
import { routes } from '@config/routes';
import { ReceiptItemViewModel, defaultReceiptViewModel } from '@models/Receipt';
import { ReceiptService } from '@services/Receipt';
import { numberFormat } from '@utils/numberFormat';

export const ReceiptCreate: React.FC = () => {
  const [items, setItems] = useState<ReceiptItemViewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [particulars, setParticulars] = useState<KeyValuePair[]>([]);

  const [currentParticular, setCurrentParticular] = useState<KeyValuePair>({
    key: '',
    value: '',
  });
  const [currentQuantity, setCurrentQuantity] = useState<number>(0);

  const navigate = useNavigate();

  const loadSettings = () => {
    ReceiptService.getSettings().then((result) => {
      if (result) {
        setParticulars(result);
      }
      setIsSettingsLoading(false);
    });
  };

  useEffect(() => {
    if (!isSettingsLoading) setIsLoading(false);
  }, [isSettingsLoading]);

  useEffect(() => {
    document.title = 'Create Receipt';

    loadSettings();

    setItems([]);
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Formik
          initialValues={defaultReceiptViewModel}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={(values, actions) => {
            values.items = items;
            ReceiptService.create(values);

            alert('Successfully created a new record');
            actions.setSubmitting(false);
            actions.resetForm();

            navigate(`${routes.RECEIPTS}`);
          }}
        >
          {(formikProps) => {
            return (
              <>
                <form method="POST" onSubmit={formikProps.handleSubmit}>
                  <Box>
                    <BoxHeader title="Create a new record" />
                    <BoxRowColumn>
                      <BoxBodyMainColumn>
                        <BoxBodyColumn>
                          <div className="m-6 flex content-between">
                            {particulars.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="border-2 p-4 w-60 hover:bg-green-50 hover: cursor-pointer"
                                  onClick={() => {
                                    setCurrentParticular({
                                      key: item.key,
                                      value: item.value,
                                    });
                                  }}
                                >
                                  <span>{item.key}</span>
                                </div>
                              );
                            })}
                          </div>
                          <hr />
                          <div className="p-6">
                            {!!currentParticular.key &&
                              !!currentParticular.value && (
                                <>
                                  <div>
                                    <span>{currentParticular.key} : </span>
                                    <span className="mr-2">₱</span>
                                    <span>
                                      {numberFormat.format(
                                        Number(currentParticular.value)
                                      )}
                                    </span>
                                  </div>
                                  <br></br>
                                  <input
                                    className="w-full text-right px-10 rounded-md"
                                    type="text"
                                    value={currentQuantity}
                                    onChange={(e) => {
                                      setCurrentQuantity(
                                        Number(e.target.value)
                                      );
                                    }}
                                  />
                                  <div className="w-full text-right py-6">
                                    <span>Total : </span>
                                    <span className="mr-2">₱</span>
                                    <span>
                                      {' '}
                                      {numberFormat.format(
                                        currentQuantity *
                                          Number(currentParticular.value)
                                      )}{' '}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    className="mt-1 p-2 text-white w-full rounded-md bg-green-700 flex flex-row"
                                    onClick={() => {
                                      setItems([
                                        ...items,
                                        {
                                          particular: currentParticular.key,
                                          quantity: currentQuantity.toString(),
                                          unitPrice: currentParticular.value,
                                          total:
                                            currentQuantity *
                                            Number(currentParticular.value),
                                        },
                                      ]);

                                      setCurrentParticular({
                                        key: '',
                                        value: '',
                                      });
                                      setCurrentQuantity(0);
                                    }}
                                  >
                                    <PlusCircleIcon className="h-6 w-6" /> Item
                                  </button>
                                </>
                              )}
                          </div>
                        </BoxBodyColumn>
                      </BoxBodyMainColumn>
                      <BoxBodySecondaryColumn>
                        <BoxBodyColumn>
                          <div className="p-6 bg-yellow-50">
                            <FormikInput label="Name" name="payee" />

                            <DateInput label="Date" name="paymentDate" />

                            <FormikInput
                              label="Payment Method"
                              name="paymentMethod"
                            />

                            <hr />

                            <div className="w-full mt-6"></div>

                            <hr></hr>

                            {items.map((item, index) => (
                              <>
                                <div
                                  key={index}
                                  className="w-full flex flex-col md:flex-row mt-1"
                                >
                                  <div className="w-full flex flex-row justify-between">
                                    <div className="flex flex-col">
                                      <span> {item.particular}</span>

                                      {!!item.quantity && !!item.unitPrice && (
                                        <span>
                                          {item.quantity} x{' '}
                                          {numberFormat.format(
                                            Number(item.unitPrice)
                                          )}
                                        </span>
                                      )}
                                    </div>
                                    <div>
                                      <span>
                                        {numberFormat.format(
                                          Number(item.total)
                                        )}
                                      </span>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    className="p-2 rounded-sm bg-red-50 hover:bg-red-400"
                                    onClick={() => {
                                      const newItems = [...items];
                                      newItems.splice(index, 1);
                                      setItems(newItems);
                                    }}
                                  >
                                    <TrashIcon className=" rounded-sm h-4 w-4" />
                                  </button>
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
                                    items.reduce(
                                      (accumulator, currentValue) =>
                                        accumulator + currentValue.total,
                                      0
                                    )
                                  )
                                )}
                              </span>
                            </div>

                            <hr></hr>
                            <div className="w-full mt-6 flex flex-row justify-between">
                              <CancelLinkButton to={`${routes.RECEIPTS}`} />

                              <SubmitButton
                                label="Save"
                                disabled={
                                  formikProps.isSubmitting ||
                                  !formikProps.isValid
                                }
                              />
                            </div>
                          </div>
                        </BoxBodyColumn>
                      </BoxBodySecondaryColumn>
                    </BoxRowColumn>
                  </Box>
                </form>
              </>
            );
          }}
        </Formik>
      </>
    );
  }
};
