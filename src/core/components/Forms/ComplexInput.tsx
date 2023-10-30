import { FieldHookConfig, useField } from 'formik';
import tw from 'tailwind-styled-components';

interface BaseInputProps {
  hasError: boolean;
}

const BaseInput = tw.input<BaseInputProps>`
  block w-full border-hidden rounded-none rounded-l-md sm:text-sm
  ${(props) =>
    !props.hasError &&
    'border-gray-300 focus:border-primary-500 focus:ring-primary-500'} 
  ${(props) =>
    props.hasError && 'border-red-300 focus:border-red-500 focus:ring-red-500'} 
  `;

type Props = {
  readonly?: boolean;
  checkIfUpdated?: (newValue: string) => void;
} & FieldHookConfig<string>;

export const ComplexInput: React.FC<Props> = ({
  readonly,
  checkIfUpdated,
  ...props
}) => {
  const [field, meta, helper] = useField(props);

  return (
    <>
      <BaseInput
        {...field}
        placeholder={props.placeholder}
        readOnly={readonly}
        type="text"
        hasError={!!meta.error}
        onBlur={() =>
          checkIfUpdated ? checkIfUpdated(field.value) : undefined
        }
        onChange={(e) => {
          helper.setValue(e.target.value);
          checkIfUpdated ? checkIfUpdated(e.target.value) : undefined;
        }}
      />
    </>
  );
};
