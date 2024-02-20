import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { Select } from '@components/Forms/Select';
import { routes } from '@config/routes';
import { ReceiptItemViewModel, defaultReceiptViewModel } from '@models/Receipt';
import { ReceiptService } from '@services/Receipt';
import { numberFormat } from '@utils/numberFormat';

interface SelectOptions {
  selected?: boolean;
  value: string;
  text: string;
}

export const ReceiptCreate: React.FC = () => {
  const [items, setItems] = useState<ReceiptItemViewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [particultarOptions, setParticularOptions] = useState<SelectOptions[]>(
    []
  );

  const navigate = useNavigate();

  const loadSettings = () => {
    ReceiptService.getSettings().then((result) => {
      if (result) {
        const options: SelectOptions[] = [];

        try {
          JSON.parse(result).forEach((element: any) => {
            options.push({ value: element, text: element });
          });
          setParticularOptions(options);
        } catch {}
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

    setItems([{ particular: '', quantity: '', unitPrice: '', total: 0 }]);
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
                <BoxMedium>
                  <BoxHeader title="Create a new record" />
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
                                <Select
                                  label="Particular"
                                  placeholder="Particular"
                                  defaultValue={item.particular}
                                  selection={particultarOptions}
                                  changeHandler={(event) => {
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
                                  value={numberFormat.format(
                                    Number(item.total)
                                  )}
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
                              <span className="mr-2 text-2xl">₱</span>
                              <span className="text-2xl p-2">
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
