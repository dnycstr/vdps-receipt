import { PlusCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BoxBodyColumn, BoxHeader, BoxMedium } from '@components/Box';
import {
  FormButtonsContainer,
  FormContainer,
  FormSectionContainer,
} from '@components/Container';
import {
  CancelLinkButton,
  DateInput,
  FormikInput,
  Input,
  SubmitButton,
} from '@components/Forms';
import { routes } from '@config/routes';
import {
  ReceiptItemViewModel,
  ReceiptViewModel,
  defaultReceiptViewModel,
} from '@models/Receipt';
import { ReceiptService } from '@services/Receipt';

export const ReceiptEdit: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ReceiptViewModel>(defaultReceiptViewModel);
  const [items, setItems] = useState<ReceiptItemViewModel[]>([]);

  const loadData = () => {
    ReceiptService.getById(Number(id)).then((result) => {
      if (result) {
        setData(result);
        if (result.items) {
          setItems(result.items);
        } else {
          setItems([
            { particular: '', quantity: '1', unitPrice: '0', total: 0 },
          ]);
        }
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    document.title = 'Edit Receipt';

    loadData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Formik
          initialValues={data}
          //validationSchema={ReceiptValidation}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={(values, actions) => {
            values.items = items;
            ReceiptService.update(Number(id), values);

            alert('Successfully updated a new record');
            actions.setSubmitting(false);
            actions.resetForm();
          }}
        >
          {(formikProps) => {
            return (
              <>
                <BoxMedium>
                  <BoxHeader title="Edit record" />
                  <BoxBodyColumn>
                    <form method="POST" onSubmit={formikProps.handleSubmit}>
                      <FormContainer>
                        <FormSectionContainer>
                          <FormikInput label="Name" name="payee" />

                          <DateInput label="Date" name="paymentDate" />

                          <FormikInput
                            label="Payment Method"
                            name="paymentMethod"
                          />

                          <hr />
                          {items.map((item, index) => (
                            <>
                              <div
                                key={index}
                                className="flex flex-col md:flex-row mt-1"
                              >
                                <Input
                                  label="Particular"
                                  title="Particular"
                                  placeholder="Particular"
                                  value={item.particular}
                                  onChange={(event) => {
                                    const newItems = [...items];
                                    newItems[index].particular =
                                      event.target.value;
                                    setItems(newItems);
                                  }}
                                />
                                <Input
                                  label="Quantity"
                                  title="Input Quantity"
                                  placeholder="Quantity"
                                  value={item.quantity}
                                  textalign="right"
                                  onChange={(event) => {
                                    const newItems = [...items];
                                    newItems[index].quantity =
                                      event.target.value;
                                    newItems[index].total =
                                      Number(event.target.value) *
                                      Number(newItems[index].unitPrice);
                                    setItems(newItems);
                                  }}
                                />
                                <Input
                                  label="Unit Price"
                                  title="Input Unit Price"
                                  placeholder="Unit Price"
                                  value={item.unitPrice}
                                  textalign="right"
                                  onChange={(event) => {
                                    const newItems = [...items];
                                    newItems[index].unitPrice =
                                      event.target.value;

                                    newItems[index].total =
                                      Number(event.target.value) *
                                      Number(newItems[index].quantity);
                                    setItems(newItems);
                                  }}
                                />
                                <Input
                                  label="Total"
                                  title="Total"
                                  placeholder="Total"
                                  value={item.total}
                                  textalign="right"
                                />
                                <button
                                  type="button"
                                  className="mt-6 p-2 bg-red-400"
                                  onClick={() => {
                                    const newItems = [...items];
                                    newItems.splice(index, 1);
                                    setItems(newItems);
                                  }}
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
                              <hr />
                            </>
                          ))}
                          <div className="flex flex-col md:flex-row justify-between">
                            <button
                              type="button"
                              className="mt-1 p-2 text-white bg-green-400 flex flex-row"
                              onClick={() => {
                                setItems([
                                  ...items,
                                  {
                                    particular: '',
                                    quantity: '',
                                    unitPrice: '',
                                    total: 0,
                                  },
                                ]);
                              }}
                            >
                              <PlusCircleIcon className="h-6 w-6" /> Item
                            </button>

                            <div>
                              <label className="text-gray-700 text-xl p-4">
                                Total
                              </label>
                              <span className="text-2xl p-2">
                                {items.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator + currentValue.total,
                                  0
                                )}
                              </span>
                            </div>
                          </div>
                        </FormSectionContainer>

                        <FormButtonsContainer>
                          <CancelLinkButton to={`${routes.RECEIPTS}`} />

                          <SubmitButton
                            label="Save"
                            disabled={
                              formikProps.isSubmitting || !formikProps.isValid
                            }
                          />
                        </FormButtonsContainer>
                      </FormContainer>
                    </form>
                  </BoxBodyColumn>
                </BoxMedium>
              </>
            );
          }}
        </Formik>
      </>
    );
  }
};
