import { Formik } from 'formik';
import { useEffect, useState } from 'react';

import { BoxBodyColumn, BoxHeader, BoxMedium } from '@components/Box';
import {
  FormButtonsContainer,
  FormContainer,
  FormSectionContainer,
} from '@components/Container';
import { CancelLinkButton, SubmitButton } from '@components/Forms';
import { MultiInput } from '@components/Forms/MultiInput';
import { ReceiptSettings, defaultReceiptSettings } from '@models/Receipt';
import { ReceiptService } from '@services/Receipt';

export const SettingsList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ReceiptSettings>(defaultReceiptSettings);

  const loadData = () => {
    ReceiptService.getSettings().then((result) => {
      if (result) {
        setData({ settings: result });
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
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={(values, actions) => {
            values;
            ReceiptService.updateSettings(values.settings ?? '');

            alert('Successfully updated settings');
            actions.setSubmitting(false);
            actions.resetForm();
          }}
        >
          {(formikProps) => {
            return (
              <>
                <BoxMedium>
                  <BoxHeader title="Settings" />
                  <BoxBodyColumn>
                    <form method="POST" onSubmit={formikProps.handleSubmit}>
                      <FormContainer>
                        <FormSectionContainer>
                          <MultiInput label="Settings" name="settings" />
                        </FormSectionContainer>

                        <FormButtonsContainer>
                          <CancelLinkButton to={`/`} />

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
